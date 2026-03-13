/**
 * Azure Storageimportexport API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const BitLockerKeysListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    jobName: Schema.String.pipe(T.PathParam()),
  },
).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ImportExport/jobs/{jobName}/listBitLockerKeys",
  }),
);
export type BitLockerKeysListInput = typeof BitLockerKeysListInput.Type;

// Output Schema
export const BitLockerKeysListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          bitLockerKey: Schema.optional(Schema.String),
          driveId: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type BitLockerKeysListOutput = typeof BitLockerKeysListOutput.Type;

// The operation
/**
 * Returns the BitLocker Keys for all drives in the specified job.
 *
 * @param jobName - The name of the import/export job.
 */
export const BitLockerKeysList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: BitLockerKeysListInput,
  outputSchema: BitLockerKeysListOutput,
}));
// Input Schema
export const JobsCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  jobName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ImportExport/jobs/{jobName}",
  }),
);
export type JobsCreateInput = typeof JobsCreateInput.Type;

// Output Schema
export const JobsCreateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  tags: Schema.optional(Schema.Unknown),
  properties: Schema.optional(
    Schema.Struct({
      storageAccountId: Schema.optional(Schema.String),
      jobType: Schema.optional(Schema.String),
      returnAddress: Schema.optional(
        Schema.Struct({
          recipientName: Schema.String,
          streetAddress1: Schema.String,
          streetAddress2: Schema.optional(Schema.String),
          city: Schema.String,
          stateOrProvince: Schema.optional(Schema.String),
          postalCode: Schema.String,
          countryOrRegion: Schema.String,
          phone: Schema.String,
          email: Schema.String,
        }),
      ),
      returnShipping: Schema.optional(
        Schema.Struct({
          carrierName: Schema.String,
          carrierAccountNumber: Schema.String,
        }),
      ),
      shippingInformation: Schema.optional(
        Schema.Struct({
          recipientName: Schema.optional(Schema.String),
          streetAddress1: Schema.optional(Schema.String),
          streetAddress2: Schema.optional(Schema.String),
          city: Schema.optional(Schema.String),
          stateOrProvince: Schema.optional(Schema.String),
          postalCode: Schema.optional(Schema.String),
          countryOrRegion: Schema.optional(Schema.String),
          phone: Schema.optional(Schema.String),
          additionalInformation: Schema.optional(Schema.String),
        }),
      ),
      deliveryPackage: Schema.optional(
        Schema.Struct({
          carrierName: Schema.String,
          trackingNumber: Schema.String,
          driveCount: Schema.optional(Schema.Number),
          shipDate: Schema.optional(Schema.String),
        }),
      ),
      returnPackage: Schema.optional(
        Schema.Struct({
          carrierName: Schema.String,
          trackingNumber: Schema.String,
          driveCount: Schema.Number,
          shipDate: Schema.String,
        }),
      ),
      diagnosticsPath: Schema.optional(Schema.String),
      logLevel: Schema.optional(Schema.String),
      backupDriveManifest: Schema.optional(Schema.Boolean),
      state: Schema.optional(Schema.String),
      cancelRequested: Schema.optional(Schema.Boolean),
      percentComplete: Schema.optional(Schema.Number),
      incompleteBlobListUri: Schema.optional(Schema.String),
      driveList: Schema.optional(
        Schema.Array(
          Schema.Struct({
            driveId: Schema.optional(Schema.String),
            bitLockerKey: Schema.optional(Schema.String),
            manifestFile: Schema.optional(Schema.String),
            manifestHash: Schema.optional(Schema.String),
            driveHeaderHash: Schema.optional(Schema.String),
            state: Schema.optional(
              Schema.Literals([
                "Specified",
                "Received",
                "NeverReceived",
                "Transferring",
                "Completed",
                "CompletedMoreInfo",
                "ShippedBack",
              ]),
            ),
            copyStatus: Schema.optional(Schema.String),
            percentComplete: Schema.optional(Schema.Number),
            verboseLogUri: Schema.optional(Schema.String),
            errorLogUri: Schema.optional(Schema.String),
            manifestUri: Schema.optional(Schema.String),
            bytesSucceeded: Schema.optional(Schema.Number),
          }),
        ),
      ),
      export: Schema.optional(
        Schema.Struct({
          blobList: Schema.optional(
            Schema.Struct({
              blobPath: Schema.optional(Schema.Array(Schema.String)),
              blobPathPrefix: Schema.optional(Schema.Array(Schema.String)),
            }),
          ),
          blobListBlobPath: Schema.optional(Schema.String),
        }),
      ),
      provisioningState: Schema.optional(Schema.String),
      encryptionKey: Schema.optional(
        Schema.Struct({
          kekType: Schema.optional(
            Schema.Literals(["MicrosoftManaged", "CustomerManaged"]),
          ),
          kekUrl: Schema.optional(Schema.String),
          kekVaultResourceID: Schema.optional(Schema.String),
        }),
      ),
    }),
  ),
  identity: Schema.optional(
    Schema.Struct({
      type: Schema.optional(
        Schema.Literals(["None", "SystemAssigned", "UserAssigned"]),
      ),
      principalId: Schema.optional(Schema.String),
      tenantId: Schema.optional(Schema.String),
    }),
  ),
});
export type JobsCreateOutput = typeof JobsCreateOutput.Type;

// The operation
/**
 * Creates a new job or updates an existing job in the specified subscription.
 *
 * @param jobName - The name of the import/export job.
 */
export const JobsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JobsCreateInput,
  outputSchema: JobsCreateOutput,
}));
// Input Schema
export const JobsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  jobName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ImportExport/jobs/{jobName}",
  }),
);
export type JobsDeleteInput = typeof JobsDeleteInput.Type;

// Output Schema
export const JobsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type JobsDeleteOutput = typeof JobsDeleteOutput.Type;

// The operation
/**
 * Deletes an existing job. Only jobs in the Creating or Completed states can be deleted.
 *
 * @param jobName - The name of the import/export job.
 */
export const JobsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JobsDeleteInput,
  outputSchema: JobsDeleteOutput,
}));
// Input Schema
export const JobsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  jobName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ImportExport/jobs/{jobName}",
  }),
);
export type JobsGetInput = typeof JobsGetInput.Type;

// Output Schema
export const JobsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  tags: Schema.optional(Schema.Unknown),
  properties: Schema.optional(
    Schema.Struct({
      storageAccountId: Schema.optional(Schema.String),
      jobType: Schema.optional(Schema.String),
      returnAddress: Schema.optional(
        Schema.Struct({
          recipientName: Schema.String,
          streetAddress1: Schema.String,
          streetAddress2: Schema.optional(Schema.String),
          city: Schema.String,
          stateOrProvince: Schema.optional(Schema.String),
          postalCode: Schema.String,
          countryOrRegion: Schema.String,
          phone: Schema.String,
          email: Schema.String,
        }),
      ),
      returnShipping: Schema.optional(
        Schema.Struct({
          carrierName: Schema.String,
          carrierAccountNumber: Schema.String,
        }),
      ),
      shippingInformation: Schema.optional(
        Schema.Struct({
          recipientName: Schema.optional(Schema.String),
          streetAddress1: Schema.optional(Schema.String),
          streetAddress2: Schema.optional(Schema.String),
          city: Schema.optional(Schema.String),
          stateOrProvince: Schema.optional(Schema.String),
          postalCode: Schema.optional(Schema.String),
          countryOrRegion: Schema.optional(Schema.String),
          phone: Schema.optional(Schema.String),
          additionalInformation: Schema.optional(Schema.String),
        }),
      ),
      deliveryPackage: Schema.optional(
        Schema.Struct({
          carrierName: Schema.String,
          trackingNumber: Schema.String,
          driveCount: Schema.optional(Schema.Number),
          shipDate: Schema.optional(Schema.String),
        }),
      ),
      returnPackage: Schema.optional(
        Schema.Struct({
          carrierName: Schema.String,
          trackingNumber: Schema.String,
          driveCount: Schema.Number,
          shipDate: Schema.String,
        }),
      ),
      diagnosticsPath: Schema.optional(Schema.String),
      logLevel: Schema.optional(Schema.String),
      backupDriveManifest: Schema.optional(Schema.Boolean),
      state: Schema.optional(Schema.String),
      cancelRequested: Schema.optional(Schema.Boolean),
      percentComplete: Schema.optional(Schema.Number),
      incompleteBlobListUri: Schema.optional(Schema.String),
      driveList: Schema.optional(
        Schema.Array(
          Schema.Struct({
            driveId: Schema.optional(Schema.String),
            bitLockerKey: Schema.optional(Schema.String),
            manifestFile: Schema.optional(Schema.String),
            manifestHash: Schema.optional(Schema.String),
            driveHeaderHash: Schema.optional(Schema.String),
            state: Schema.optional(
              Schema.Literals([
                "Specified",
                "Received",
                "NeverReceived",
                "Transferring",
                "Completed",
                "CompletedMoreInfo",
                "ShippedBack",
              ]),
            ),
            copyStatus: Schema.optional(Schema.String),
            percentComplete: Schema.optional(Schema.Number),
            verboseLogUri: Schema.optional(Schema.String),
            errorLogUri: Schema.optional(Schema.String),
            manifestUri: Schema.optional(Schema.String),
            bytesSucceeded: Schema.optional(Schema.Number),
          }),
        ),
      ),
      export: Schema.optional(
        Schema.Struct({
          blobList: Schema.optional(
            Schema.Struct({
              blobPath: Schema.optional(Schema.Array(Schema.String)),
              blobPathPrefix: Schema.optional(Schema.Array(Schema.String)),
            }),
          ),
          blobListBlobPath: Schema.optional(Schema.String),
        }),
      ),
      provisioningState: Schema.optional(Schema.String),
      encryptionKey: Schema.optional(
        Schema.Struct({
          kekType: Schema.optional(
            Schema.Literals(["MicrosoftManaged", "CustomerManaged"]),
          ),
          kekUrl: Schema.optional(Schema.String),
          kekVaultResourceID: Schema.optional(Schema.String),
        }),
      ),
    }),
  ),
  identity: Schema.optional(
    Schema.Struct({
      type: Schema.optional(
        Schema.Literals(["None", "SystemAssigned", "UserAssigned"]),
      ),
      principalId: Schema.optional(Schema.String),
      tenantId: Schema.optional(Schema.String),
    }),
  ),
});
export type JobsGetOutput = typeof JobsGetOutput.Type;

// The operation
/**
 * Gets information about an existing job.
 *
 * @param jobName - The name of the import/export job.
 */
export const JobsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JobsGetInput,
  outputSchema: JobsGetOutput,
}));
// Input Schema
export const JobsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    $top: Schema.optional(Schema.Number),
    $filter: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ImportExport/jobs",
    }),
  );
export type JobsListByResourceGroupInput =
  typeof JobsListByResourceGroupInput.Type;

// Output Schema
export const JobsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          systemData: Schema.optional(
            Schema.Struct({
              createdBy: Schema.optional(Schema.String),
              createdByType: Schema.optional(
                Schema.Literals([
                  "User",
                  "Application",
                  "ManagedIdentity",
                  "Key",
                ]),
              ),
              createdAt: Schema.optional(Schema.String),
              lastModifiedBy: Schema.optional(Schema.String),
              lastModifiedByType: Schema.optional(
                Schema.Literals([
                  "User",
                  "Application",
                  "ManagedIdentity",
                  "Key",
                ]),
              ),
              lastModifiedAt: Schema.optional(Schema.String),
            }),
          ),
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
          tags: Schema.optional(Schema.Unknown),
          properties: Schema.optional(
            Schema.Struct({
              storageAccountId: Schema.optional(Schema.String),
              jobType: Schema.optional(Schema.String),
              returnAddress: Schema.optional(
                Schema.Struct({
                  recipientName: Schema.String,
                  streetAddress1: Schema.String,
                  streetAddress2: Schema.optional(Schema.String),
                  city: Schema.String,
                  stateOrProvince: Schema.optional(Schema.String),
                  postalCode: Schema.String,
                  countryOrRegion: Schema.String,
                  phone: Schema.String,
                  email: Schema.String,
                }),
              ),
              returnShipping: Schema.optional(
                Schema.Struct({
                  carrierName: Schema.String,
                  carrierAccountNumber: Schema.String,
                }),
              ),
              shippingInformation: Schema.optional(
                Schema.Struct({
                  recipientName: Schema.optional(Schema.String),
                  streetAddress1: Schema.optional(Schema.String),
                  streetAddress2: Schema.optional(Schema.String),
                  city: Schema.optional(Schema.String),
                  stateOrProvince: Schema.optional(Schema.String),
                  postalCode: Schema.optional(Schema.String),
                  countryOrRegion: Schema.optional(Schema.String),
                  phone: Schema.optional(Schema.String),
                  additionalInformation: Schema.optional(Schema.String),
                }),
              ),
              deliveryPackage: Schema.optional(
                Schema.Struct({
                  carrierName: Schema.String,
                  trackingNumber: Schema.String,
                  driveCount: Schema.optional(Schema.Number),
                  shipDate: Schema.optional(Schema.String),
                }),
              ),
              returnPackage: Schema.optional(
                Schema.Struct({
                  carrierName: Schema.String,
                  trackingNumber: Schema.String,
                  driveCount: Schema.Number,
                  shipDate: Schema.String,
                }),
              ),
              diagnosticsPath: Schema.optional(Schema.String),
              logLevel: Schema.optional(Schema.String),
              backupDriveManifest: Schema.optional(Schema.Boolean),
              state: Schema.optional(Schema.String),
              cancelRequested: Schema.optional(Schema.Boolean),
              percentComplete: Schema.optional(Schema.Number),
              incompleteBlobListUri: Schema.optional(Schema.String),
              driveList: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    driveId: Schema.optional(Schema.String),
                    bitLockerKey: Schema.optional(Schema.String),
                    manifestFile: Schema.optional(Schema.String),
                    manifestHash: Schema.optional(Schema.String),
                    driveHeaderHash: Schema.optional(Schema.String),
                    state: Schema.optional(
                      Schema.Literals([
                        "Specified",
                        "Received",
                        "NeverReceived",
                        "Transferring",
                        "Completed",
                        "CompletedMoreInfo",
                        "ShippedBack",
                      ]),
                    ),
                    copyStatus: Schema.optional(Schema.String),
                    percentComplete: Schema.optional(Schema.Number),
                    verboseLogUri: Schema.optional(Schema.String),
                    errorLogUri: Schema.optional(Schema.String),
                    manifestUri: Schema.optional(Schema.String),
                    bytesSucceeded: Schema.optional(Schema.Number),
                  }),
                ),
              ),
              export: Schema.optional(
                Schema.Struct({
                  blobList: Schema.optional(
                    Schema.Struct({
                      blobPath: Schema.optional(Schema.Array(Schema.String)),
                      blobPathPrefix: Schema.optional(
                        Schema.Array(Schema.String),
                      ),
                    }),
                  ),
                  blobListBlobPath: Schema.optional(Schema.String),
                }),
              ),
              provisioningState: Schema.optional(Schema.String),
              encryptionKey: Schema.optional(
                Schema.Struct({
                  kekType: Schema.optional(
                    Schema.Literals(["MicrosoftManaged", "CustomerManaged"]),
                  ),
                  kekUrl: Schema.optional(Schema.String),
                  kekVaultResourceID: Schema.optional(Schema.String),
                }),
              ),
            }),
          ),
          identity: Schema.optional(
            Schema.Struct({
              type: Schema.optional(
                Schema.Literals(["None", "SystemAssigned", "UserAssigned"]),
              ),
              principalId: Schema.optional(Schema.String),
              tenantId: Schema.optional(Schema.String),
            }),
          ),
        }),
      ),
    ),
  });
export type JobsListByResourceGroupOutput =
  typeof JobsListByResourceGroupOutput.Type;

// The operation
/**
 * Returns all active and completed jobs in a resource group.
 *
 * @param $top - An integer value that specifies how many jobs at most should be returned. The value cannot exceed 100.
 * @param $filter - Can be used to restrict the results to certain conditions.
 */
export const JobsListByResourceGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: JobsListByResourceGroupInput,
    outputSchema: JobsListByResourceGroupOutput,
  }),
);
// Input Schema
export const JobsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    $top: Schema.optional(Schema.Number),
    $filter: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ImportExport/jobs",
    }),
  );
export type JobsListBySubscriptionInput =
  typeof JobsListBySubscriptionInput.Type;

// Output Schema
export const JobsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          systemData: Schema.optional(
            Schema.Struct({
              createdBy: Schema.optional(Schema.String),
              createdByType: Schema.optional(
                Schema.Literals([
                  "User",
                  "Application",
                  "ManagedIdentity",
                  "Key",
                ]),
              ),
              createdAt: Schema.optional(Schema.String),
              lastModifiedBy: Schema.optional(Schema.String),
              lastModifiedByType: Schema.optional(
                Schema.Literals([
                  "User",
                  "Application",
                  "ManagedIdentity",
                  "Key",
                ]),
              ),
              lastModifiedAt: Schema.optional(Schema.String),
            }),
          ),
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
          tags: Schema.optional(Schema.Unknown),
          properties: Schema.optional(
            Schema.Struct({
              storageAccountId: Schema.optional(Schema.String),
              jobType: Schema.optional(Schema.String),
              returnAddress: Schema.optional(
                Schema.Struct({
                  recipientName: Schema.String,
                  streetAddress1: Schema.String,
                  streetAddress2: Schema.optional(Schema.String),
                  city: Schema.String,
                  stateOrProvince: Schema.optional(Schema.String),
                  postalCode: Schema.String,
                  countryOrRegion: Schema.String,
                  phone: Schema.String,
                  email: Schema.String,
                }),
              ),
              returnShipping: Schema.optional(
                Schema.Struct({
                  carrierName: Schema.String,
                  carrierAccountNumber: Schema.String,
                }),
              ),
              shippingInformation: Schema.optional(
                Schema.Struct({
                  recipientName: Schema.optional(Schema.String),
                  streetAddress1: Schema.optional(Schema.String),
                  streetAddress2: Schema.optional(Schema.String),
                  city: Schema.optional(Schema.String),
                  stateOrProvince: Schema.optional(Schema.String),
                  postalCode: Schema.optional(Schema.String),
                  countryOrRegion: Schema.optional(Schema.String),
                  phone: Schema.optional(Schema.String),
                  additionalInformation: Schema.optional(Schema.String),
                }),
              ),
              deliveryPackage: Schema.optional(
                Schema.Struct({
                  carrierName: Schema.String,
                  trackingNumber: Schema.String,
                  driveCount: Schema.optional(Schema.Number),
                  shipDate: Schema.optional(Schema.String),
                }),
              ),
              returnPackage: Schema.optional(
                Schema.Struct({
                  carrierName: Schema.String,
                  trackingNumber: Schema.String,
                  driveCount: Schema.Number,
                  shipDate: Schema.String,
                }),
              ),
              diagnosticsPath: Schema.optional(Schema.String),
              logLevel: Schema.optional(Schema.String),
              backupDriveManifest: Schema.optional(Schema.Boolean),
              state: Schema.optional(Schema.String),
              cancelRequested: Schema.optional(Schema.Boolean),
              percentComplete: Schema.optional(Schema.Number),
              incompleteBlobListUri: Schema.optional(Schema.String),
              driveList: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    driveId: Schema.optional(Schema.String),
                    bitLockerKey: Schema.optional(Schema.String),
                    manifestFile: Schema.optional(Schema.String),
                    manifestHash: Schema.optional(Schema.String),
                    driveHeaderHash: Schema.optional(Schema.String),
                    state: Schema.optional(
                      Schema.Literals([
                        "Specified",
                        "Received",
                        "NeverReceived",
                        "Transferring",
                        "Completed",
                        "CompletedMoreInfo",
                        "ShippedBack",
                      ]),
                    ),
                    copyStatus: Schema.optional(Schema.String),
                    percentComplete: Schema.optional(Schema.Number),
                    verboseLogUri: Schema.optional(Schema.String),
                    errorLogUri: Schema.optional(Schema.String),
                    manifestUri: Schema.optional(Schema.String),
                    bytesSucceeded: Schema.optional(Schema.Number),
                  }),
                ),
              ),
              export: Schema.optional(
                Schema.Struct({
                  blobList: Schema.optional(
                    Schema.Struct({
                      blobPath: Schema.optional(Schema.Array(Schema.String)),
                      blobPathPrefix: Schema.optional(
                        Schema.Array(Schema.String),
                      ),
                    }),
                  ),
                  blobListBlobPath: Schema.optional(Schema.String),
                }),
              ),
              provisioningState: Schema.optional(Schema.String),
              encryptionKey: Schema.optional(
                Schema.Struct({
                  kekType: Schema.optional(
                    Schema.Literals(["MicrosoftManaged", "CustomerManaged"]),
                  ),
                  kekUrl: Schema.optional(Schema.String),
                  kekVaultResourceID: Schema.optional(Schema.String),
                }),
              ),
            }),
          ),
          identity: Schema.optional(
            Schema.Struct({
              type: Schema.optional(
                Schema.Literals(["None", "SystemAssigned", "UserAssigned"]),
              ),
              principalId: Schema.optional(Schema.String),
              tenantId: Schema.optional(Schema.String),
            }),
          ),
        }),
      ),
    ),
  });
export type JobsListBySubscriptionOutput =
  typeof JobsListBySubscriptionOutput.Type;

// The operation
/**
 * Returns all active and completed jobs in a subscription.
 *
 * @param $top - An integer value that specifies how many jobs at most should be returned. The value cannot exceed 100.
 * @param $filter - Can be used to restrict the results to certain conditions.
 */
export const JobsListBySubscription = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: JobsListBySubscriptionInput,
    outputSchema: JobsListBySubscriptionOutput,
  }),
);
// Input Schema
export const JobsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  jobName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ImportExport/jobs/{jobName}",
  }),
);
export type JobsUpdateInput = typeof JobsUpdateInput.Type;

// Output Schema
export const JobsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  tags: Schema.optional(Schema.Unknown),
  properties: Schema.optional(
    Schema.Struct({
      storageAccountId: Schema.optional(Schema.String),
      jobType: Schema.optional(Schema.String),
      returnAddress: Schema.optional(
        Schema.Struct({
          recipientName: Schema.String,
          streetAddress1: Schema.String,
          streetAddress2: Schema.optional(Schema.String),
          city: Schema.String,
          stateOrProvince: Schema.optional(Schema.String),
          postalCode: Schema.String,
          countryOrRegion: Schema.String,
          phone: Schema.String,
          email: Schema.String,
        }),
      ),
      returnShipping: Schema.optional(
        Schema.Struct({
          carrierName: Schema.String,
          carrierAccountNumber: Schema.String,
        }),
      ),
      shippingInformation: Schema.optional(
        Schema.Struct({
          recipientName: Schema.optional(Schema.String),
          streetAddress1: Schema.optional(Schema.String),
          streetAddress2: Schema.optional(Schema.String),
          city: Schema.optional(Schema.String),
          stateOrProvince: Schema.optional(Schema.String),
          postalCode: Schema.optional(Schema.String),
          countryOrRegion: Schema.optional(Schema.String),
          phone: Schema.optional(Schema.String),
          additionalInformation: Schema.optional(Schema.String),
        }),
      ),
      deliveryPackage: Schema.optional(
        Schema.Struct({
          carrierName: Schema.String,
          trackingNumber: Schema.String,
          driveCount: Schema.optional(Schema.Number),
          shipDate: Schema.optional(Schema.String),
        }),
      ),
      returnPackage: Schema.optional(
        Schema.Struct({
          carrierName: Schema.String,
          trackingNumber: Schema.String,
          driveCount: Schema.Number,
          shipDate: Schema.String,
        }),
      ),
      diagnosticsPath: Schema.optional(Schema.String),
      logLevel: Schema.optional(Schema.String),
      backupDriveManifest: Schema.optional(Schema.Boolean),
      state: Schema.optional(Schema.String),
      cancelRequested: Schema.optional(Schema.Boolean),
      percentComplete: Schema.optional(Schema.Number),
      incompleteBlobListUri: Schema.optional(Schema.String),
      driveList: Schema.optional(
        Schema.Array(
          Schema.Struct({
            driveId: Schema.optional(Schema.String),
            bitLockerKey: Schema.optional(Schema.String),
            manifestFile: Schema.optional(Schema.String),
            manifestHash: Schema.optional(Schema.String),
            driveHeaderHash: Schema.optional(Schema.String),
            state: Schema.optional(
              Schema.Literals([
                "Specified",
                "Received",
                "NeverReceived",
                "Transferring",
                "Completed",
                "CompletedMoreInfo",
                "ShippedBack",
              ]),
            ),
            copyStatus: Schema.optional(Schema.String),
            percentComplete: Schema.optional(Schema.Number),
            verboseLogUri: Schema.optional(Schema.String),
            errorLogUri: Schema.optional(Schema.String),
            manifestUri: Schema.optional(Schema.String),
            bytesSucceeded: Schema.optional(Schema.Number),
          }),
        ),
      ),
      export: Schema.optional(
        Schema.Struct({
          blobList: Schema.optional(
            Schema.Struct({
              blobPath: Schema.optional(Schema.Array(Schema.String)),
              blobPathPrefix: Schema.optional(Schema.Array(Schema.String)),
            }),
          ),
          blobListBlobPath: Schema.optional(Schema.String),
        }),
      ),
      provisioningState: Schema.optional(Schema.String),
      encryptionKey: Schema.optional(
        Schema.Struct({
          kekType: Schema.optional(
            Schema.Literals(["MicrosoftManaged", "CustomerManaged"]),
          ),
          kekUrl: Schema.optional(Schema.String),
          kekVaultResourceID: Schema.optional(Schema.String),
        }),
      ),
    }),
  ),
  identity: Schema.optional(
    Schema.Struct({
      type: Schema.optional(
        Schema.Literals(["None", "SystemAssigned", "UserAssigned"]),
      ),
      principalId: Schema.optional(Schema.String),
      tenantId: Schema.optional(Schema.String),
    }),
  ),
});
export type JobsUpdateOutput = typeof JobsUpdateOutput.Type;

// The operation
/**
 * Updates specific properties of a job. You can call this operation to notify the Import/Export service that the hard drives comprising the import or export job have been shipped to the Microsoft data center. It can also be used to cancel an existing job.
 *
 * @param jobName - The name of the import/export job.
 */
export const JobsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JobsUpdateInput,
  outputSchema: JobsUpdateOutput,
}));
// Input Schema
export const LocationsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  locationName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.ImportExport/locations/{locationName}",
  }),
);
export type LocationsGetInput = typeof LocationsGetInput.Type;

// Output Schema
export const LocationsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  properties: Schema.optional(
    Schema.Struct({
      recipientName: Schema.optional(Schema.String),
      streetAddress1: Schema.optional(Schema.String),
      streetAddress2: Schema.optional(Schema.String),
      city: Schema.optional(Schema.String),
      stateOrProvince: Schema.optional(Schema.String),
      postalCode: Schema.optional(Schema.String),
      countryOrRegion: Schema.optional(Schema.String),
      phone: Schema.optional(Schema.String),
      additionalShippingInformation: Schema.optional(Schema.String),
      supportedCarriers: Schema.optional(Schema.Array(Schema.String)),
      alternateLocations: Schema.optional(Schema.Array(Schema.String)),
    }),
  ),
});
export type LocationsGetOutput = typeof LocationsGetOutput.Type;

// The operation
/**
 * Returns the details about a location to which you can ship the disks associated with an import or export job. A location is an Azure region.
 *
 * @param locationName - The name of the location. For example, West US or westus.
 */
export const LocationsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: LocationsGetInput,
  outputSchema: LocationsGetOutput,
}));
// Input Schema
export const LocationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.ImportExport/locations",
  }),
);
export type LocationsListInput = typeof LocationsListInput.Type;

// Output Schema
export const LocationsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        type: Schema.optional(Schema.String),
        properties: Schema.optional(
          Schema.Struct({
            recipientName: Schema.optional(Schema.String),
            streetAddress1: Schema.optional(Schema.String),
            streetAddress2: Schema.optional(Schema.String),
            city: Schema.optional(Schema.String),
            stateOrProvince: Schema.optional(Schema.String),
            postalCode: Schema.optional(Schema.String),
            countryOrRegion: Schema.optional(Schema.String),
            phone: Schema.optional(Schema.String),
            additionalShippingInformation: Schema.optional(Schema.String),
            supportedCarriers: Schema.optional(Schema.Array(Schema.String)),
            alternateLocations: Schema.optional(Schema.Array(Schema.String)),
          }),
        ),
      }),
    ),
  ),
});
export type LocationsListOutput = typeof LocationsListOutput.Type;

// The operation
/**
 * Returns a list of locations to which you can ship the disks associated with an import or export job. A location is a Microsoft data center region.
 */
export const LocationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: LocationsListInput,
  outputSchema: LocationsListOutput,
}));
// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.ImportExport/operations",
  }),
);
export type OperationsListInput = typeof OperationsListInput.Type;

// Output Schema
export const OperationsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        name: Schema.String,
        display: Schema.Struct({
          provider: Schema.optional(Schema.String),
          resource: Schema.optional(Schema.String),
          operation: Schema.optional(Schema.String),
          description: Schema.optional(Schema.String),
        }),
      }),
    ),
  ),
});
export type OperationsListOutput = typeof OperationsListOutput.Type;

// The operation
/**
 * Returns the list of operations supported by the import/export resource provider.
 */
export const OperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationsListInput,
  outputSchema: OperationsListOutput,
}));
