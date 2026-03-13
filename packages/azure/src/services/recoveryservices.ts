/**
 * Azure Recoveryservices API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const DeletedVaultsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  location: Schema.String.pipe(T.PathParam()),
  deletedVaultName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.RecoveryServices/locations/{location}/deletedVaults/{deletedVaultName}",
  }),
);
export type DeletedVaultsGetInput = typeof DeletedVaultsGetInput.Type;

// Output Schema
export const DeletedVaultsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type DeletedVaultsGetOutput = typeof DeletedVaultsGetOutput.Type;

// The operation
/**
 * Get a specific deleted vault.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param location - The name of Azure region.
 * @param deletedVaultName - The name of the DeletedVault
 */
export const DeletedVaultsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DeletedVaultsGetInput,
  outputSchema: DeletedVaultsGetOutput,
}));
// Input Schema
export const DeletedVaultsGetOperationStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    deletedVaultName: Schema.String.pipe(T.PathParam()),
    operationId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.RecoveryServices/locations/{location}/deletedVaults/{deletedVaultName}/operations/{operationId}",
    }),
  );
export type DeletedVaultsGetOperationStatusInput =
  typeof DeletedVaultsGetOperationStatusInput.Type;

// Output Schema
export const DeletedVaultsGetOperationStatusOutput =
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
    status: Schema.optional(Schema.String),
    startTime: Schema.optional(Schema.String),
  });
export type DeletedVaultsGetOperationStatusOutput =
  typeof DeletedVaultsGetOperationStatusOutput.Type;

// The operation
/**
 * Get the operation status of a deleted vault.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param location - The name of Azure region.
 * @param deletedVaultName - The name of deleted vault.
 */
export const DeletedVaultsGetOperationStatus =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeletedVaultsGetOperationStatusInput,
    outputSchema: DeletedVaultsGetOperationStatusOutput,
  }));
// Input Schema
export const DeletedVaultsListBySubscriptionIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.RecoveryServices/locations/{location}/deletedVaults",
    }),
  );
export type DeletedVaultsListBySubscriptionIdInput =
  typeof DeletedVaultsListBySubscriptionIdInput.Type;

// Output Schema
export const DeletedVaultsListBySubscriptionIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type DeletedVaultsListBySubscriptionIdOutput =
  typeof DeletedVaultsListBySubscriptionIdOutput.Type;

// The operation
/**
 * List deleted vaults in a subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param location - The name of Azure region.
 */
export const DeletedVaultsListBySubscriptionId =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeletedVaultsListBySubscriptionIdInput,
    outputSchema: DeletedVaultsListBySubscriptionIdOutput,
  }));
// Input Schema
export const DeletedVaultsUndeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    deletedVaultName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.RecoveryServices/locations/{location}/deletedVaults/{deletedVaultName}/undelete",
    }),
  );
export type DeletedVaultsUndeleteInput = typeof DeletedVaultsUndeleteInput.Type;

// Output Schema
export const DeletedVaultsUndeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DeletedVaultsUndeleteOutput =
  typeof DeletedVaultsUndeleteOutput.Type;

// The operation
/**
 * Start undelete of a deleted vault.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param location - The name of Azure region.
 * @param deletedVaultName - The name of the DeletedVault
 */
export const DeletedVaultsUndelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DeletedVaultsUndeleteInput,
    outputSchema: DeletedVaultsUndeleteOutput,
  }),
);
// Input Schema
export const GetOperationResultInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    operationId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/operationResults/{operationId}",
    }),
  );
export type GetOperationResultInput = typeof GetOperationResultInput.Type;

// Output Schema
export const GetOperationResultOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type GetOperationResultOutput = typeof GetOperationResultOutput.Type;

// The operation
/**
 * Gets the operation result for a resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the Vault
 * @param operationId - The name of the Vault
 */
export const GetOperationResult = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetOperationResultInput,
  outputSchema: GetOperationResultOutput,
}));
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
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/operationStatus/{operationId}",
    }),
  );
export type GetOperationStatusInput = typeof GetOperationStatusInput.Type;

// Output Schema
export const GetOperationStatusOutput =
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
    status: Schema.optional(Schema.String),
    startTime: Schema.optional(Schema.String),
  });
export type GetOperationStatusOutput = typeof GetOperationStatusOutput.Type;

// The operation
/**
 * Gets the operation status for a resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the recovery services vault.
 */
export const GetOperationStatus = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetOperationStatusInput,
  outputSchema: GetOperationStatusOutput,
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
 * List the operations for the provider
 *
 * @param api-version - The API version to use for this operation.
 */
export const OperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationsListInput,
  outputSchema: OperationsListOutput,
}));
// Input Schema
export const PrivateLinkResourcesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    privateLinkResourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/privateLinkResources/{privateLinkResourceName}",
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
 * Returns a specified private link resource that need to be created for Backup and SiteRecovery
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the recovery services vault.
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
    vaultName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/privateLinkResources",
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
 * Returns the list of private link resources that need to be created for Backup and SiteRecovery
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the recovery services vault.
 */
export const PrivateLinkResourcesList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PrivateLinkResourcesListInput,
    outputSchema: PrivateLinkResourcesListOutput,
  }),
);
// Input Schema
export const RecoveryServicesCapabilitiesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.RecoveryServices/locations/{location}/capabilities",
    }),
  );
export type RecoveryServicesCapabilitiesInput =
  typeof RecoveryServicesCapabilitiesInput.Type;

// Output Schema
export const RecoveryServicesCapabilitiesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    type: Schema.String,
  });
export type RecoveryServicesCapabilitiesOutput =
  typeof RecoveryServicesCapabilitiesOutput.Type;

// The operation
/**
 * API to get details about capabilities provided by Microsoft.RecoveryServices RP
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param location - The location of the resource.
 */
export const RecoveryServicesCapabilities =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RecoveryServicesCapabilitiesInput,
    outputSchema: RecoveryServicesCapabilitiesOutput,
  }));
// Input Schema
export const RecoveryServicesCheckNameAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/locations/{location}/checkNameAvailability",
    }),
  );
export type RecoveryServicesCheckNameAvailabilityInput =
  typeof RecoveryServicesCheckNameAvailabilityInput.Type;

// Output Schema
export const RecoveryServicesCheckNameAvailabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nameAvailable: Schema.optional(Schema.Boolean),
    reason: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
  });
export type RecoveryServicesCheckNameAvailabilityOutput =
  typeof RecoveryServicesCheckNameAvailabilityOutput.Type;

// The operation
/**
 * API to check for resource name availability.
A name is available if no other resource exists that has the same SubscriptionId, Resource Name and Type
or if one or more such resources exist, each of these must be GC'd and their time of deletion be more than 24 Hours Ago
 *
 * API to check for resource name availability.
 * A name is available if no other resource exists that has the same SubscriptionId, Resource Name and Type
 * or if one or more such resources exist, each of these must be GC'd and their time of deletion be more than 24 Hours Ago
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param location - The name of Azure region.
 */
export const RecoveryServicesCheckNameAvailability =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RecoveryServicesCheckNameAvailabilityInput,
    outputSchema: RecoveryServicesCheckNameAvailabilityOutput,
  }));
// Input Schema
export const RegisteredIdentitiesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    identityName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/registeredIdentities/{identityName}",
    }),
  );
export type RegisteredIdentitiesDeleteInput =
  typeof RegisteredIdentitiesDeleteInput.Type;

// Output Schema
export const RegisteredIdentitiesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type RegisteredIdentitiesDeleteOutput =
  typeof RegisteredIdentitiesDeleteOutput.Type;

// The operation
/**
 * Unregisters the given container from your Recovery Services vault.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the recovery services vault.
 * @param identityName - Name of the protection container to unregister.
 */
export const RegisteredIdentitiesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RegisteredIdentitiesDeleteInput,
    outputSchema: RegisteredIdentitiesDeleteOutput,
  }),
);
// Input Schema
export const ReplicationUsagesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/replicationUsages",
    }),
  );
export type ReplicationUsagesListInput = typeof ReplicationUsagesListInput.Type;

// Output Schema
export const ReplicationUsagesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          monitoringSummary: Schema.optional(
            Schema.Struct({
              unHealthyVmCount: Schema.optional(Schema.Number),
              unHealthyProviderCount: Schema.optional(Schema.Number),
              eventsCount: Schema.optional(Schema.Number),
              deprecatedProviderCount: Schema.optional(Schema.Number),
              supportedProviderCount: Schema.optional(Schema.Number),
              unsupportedProviderCount: Schema.optional(Schema.Number),
            }),
          ),
          jobsSummary: Schema.optional(
            Schema.Struct({
              failedJobs: Schema.optional(Schema.Number),
              suspendedJobs: Schema.optional(Schema.Number),
              inProgressJobs: Schema.optional(Schema.Number),
            }),
          ),
          protectedItemCount: Schema.optional(Schema.Number),
          recoveryPlanCount: Schema.optional(Schema.Number),
          registeredServersCount: Schema.optional(Schema.Number),
          recoveryServicesProviderAuthType: Schema.optional(Schema.Number),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ReplicationUsagesListOutput =
  typeof ReplicationUsagesListOutput.Type;

// The operation
/**
 * Fetches the replication usages of the vault.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the Vault
 */
export const ReplicationUsagesList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ReplicationUsagesListInput,
    outputSchema: ReplicationUsagesListOutput,
  }),
);
// Input Schema
export const UsagesListByVaultsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/usages",
    }),
  );
export type UsagesListByVaultsInput = typeof UsagesListByVaultsInput.Type;

// Output Schema
export const UsagesListByVaultsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          unit: Schema.optional(
            Schema.Literals([
              "Count",
              "Bytes",
              "Seconds",
              "Percent",
              "CountPerSecond",
              "BytesPerSecond",
            ]),
          ),
          quotaPeriod: Schema.optional(Schema.String),
          nextResetTime: Schema.optional(Schema.String),
          currentValue: Schema.optional(Schema.Number),
          limit: Schema.optional(Schema.Number),
          name: Schema.optional(
            Schema.Struct({
              value: Schema.optional(Schema.String),
              localizedValue: Schema.optional(Schema.String),
            }),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type UsagesListByVaultsOutput = typeof UsagesListByVaultsOutput.Type;

// The operation
/**
 * Fetches the usages of the vault.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the Vault
 */
export const UsagesListByVaults = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: UsagesListByVaultsInput,
  outputSchema: UsagesListByVaultsOutput,
}));
// Input Schema
export const VaultCertificatesCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    certificateName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/certificates/{certificateName}",
    }),
  );
export type VaultCertificatesCreateInput =
  typeof VaultCertificatesCreateInput.Type;

// Output Schema
export const VaultCertificatesCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    id: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        authType: Schema.String,
        certificate: Schema.optional(Schema.String),
        friendlyName: Schema.optional(Schema.String),
        issuer: Schema.optional(Schema.String),
        resourceId: Schema.optional(Schema.Number),
        subject: Schema.optional(Schema.String),
        thumbprint: Schema.optional(Schema.String),
        validFrom: Schema.optional(Schema.String),
        validTo: Schema.optional(Schema.String),
      }),
    ),
  });
export type VaultCertificatesCreateOutput =
  typeof VaultCertificatesCreateOutput.Type;

// The operation
/**
 * Uploads a certificate for a resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the recovery services vault.
 * @param certificateName - Certificate friendly name.
 */
export const VaultCertificatesCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VaultCertificatesCreateInput,
    outputSchema: VaultCertificatesCreateOutput,
  }),
);
// Input Schema
export const VaultExtendedInfoCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/extendedInformation/vaultExtendedInfo",
    }),
  );
export type VaultExtendedInfoCreateOrUpdateInput =
  typeof VaultExtendedInfoCreateOrUpdateInput.Type;

// Output Schema
export const VaultExtendedInfoCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type VaultExtendedInfoCreateOrUpdateOutput =
  typeof VaultExtendedInfoCreateOrUpdateOutput.Type;

// The operation
/**
 * Create vault extended info.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the recovery services vault.
 */
export const VaultExtendedInfoCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: VaultExtendedInfoCreateOrUpdateInput,
    outputSchema: VaultExtendedInfoCreateOrUpdateOutput,
  }));
// Input Schema
export const VaultExtendedInfoGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/extendedInformation/vaultExtendedInfo",
    }),
  );
export type VaultExtendedInfoGetInput = typeof VaultExtendedInfoGetInput.Type;

// Output Schema
export const VaultExtendedInfoGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type VaultExtendedInfoGetOutput = typeof VaultExtendedInfoGetOutput.Type;

// The operation
/**
 * Get the vault extended info.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the recovery services vault.
 */
export const VaultExtendedInfoGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VaultExtendedInfoGetInput,
    outputSchema: VaultExtendedInfoGetOutput,
  }),
);
// Input Schema
export const VaultExtendedInfoUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/extendedInformation/vaultExtendedInfo",
    }),
  );
export type VaultExtendedInfoUpdateInput =
  typeof VaultExtendedInfoUpdateInput.Type;

// Output Schema
export const VaultExtendedInfoUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type VaultExtendedInfoUpdateOutput =
  typeof VaultExtendedInfoUpdateOutput.Type;

// The operation
/**
 * Update vault extended info.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the recovery services vault.
 */
export const VaultExtendedInfoUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VaultExtendedInfoUpdateInput,
    outputSchema: VaultExtendedInfoUpdateOutput,
  }),
);
// Input Schema
export const VaultsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}",
    }),
  );
export type VaultsCreateOrUpdateInput = typeof VaultsCreateOrUpdateInput.Type;

// Output Schema
export const VaultsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type VaultsCreateOrUpdateOutput = typeof VaultsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a Recovery Services vault.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the Vault
 */
export const VaultsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VaultsCreateOrUpdateInput,
    outputSchema: VaultsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const VaultsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  vaultName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}",
  }),
);
export type VaultsDeleteInput = typeof VaultsDeleteInput.Type;

// Output Schema
export const VaultsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type VaultsDeleteOutput = typeof VaultsDeleteOutput.Type;

// The operation
/**
 * Deletes a vault.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the Vault
 */
export const VaultsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: VaultsDeleteInput,
  outputSchema: VaultsDeleteOutput,
}));
// Input Schema
export const VaultsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  vaultName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}",
  }),
);
export type VaultsGetInput = typeof VaultsGetInput.Type;

// Output Schema
export const VaultsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type VaultsGetOutput = typeof VaultsGetOutput.Type;

// The operation
/**
 * Get the Vault details.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the Vault
 */
export const VaultsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: VaultsGetInput,
  outputSchema: VaultsGetOutput,
}));
// Input Schema
export const VaultsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults",
    }),
  );
export type VaultsListByResourceGroupInput =
  typeof VaultsListByResourceGroupInput.Type;

// Output Schema
export const VaultsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type VaultsListByResourceGroupOutput =
  typeof VaultsListByResourceGroupOutput.Type;

// The operation
/**
 * Retrieve a list of Vaults.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const VaultsListByResourceGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VaultsListByResourceGroupInput,
    outputSchema: VaultsListByResourceGroupOutput,
  }),
);
// Input Schema
export const VaultsListBySubscriptionIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.RecoveryServices/vaults",
    }),
  );
export type VaultsListBySubscriptionIdInput =
  typeof VaultsListBySubscriptionIdInput.Type;

// Output Schema
export const VaultsListBySubscriptionIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type VaultsListBySubscriptionIdOutput =
  typeof VaultsListBySubscriptionIdOutput.Type;

// The operation
/**
 * Fetches all the resources of the specified type in the subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const VaultsListBySubscriptionId = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VaultsListBySubscriptionIdInput,
    outputSchema: VaultsListBySubscriptionIdOutput,
  }),
);
// Input Schema
export const VaultsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  vaultName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}",
  }),
);
export type VaultsUpdateInput = typeof VaultsUpdateInput.Type;

// Output Schema
export const VaultsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type VaultsUpdateOutput = typeof VaultsUpdateOutput.Type;

// The operation
/**
 * Updates the vault.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the Vault
 */
export const VaultsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: VaultsUpdateInput,
  outputSchema: VaultsUpdateOutput,
}));
