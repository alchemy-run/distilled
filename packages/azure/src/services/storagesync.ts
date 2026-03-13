/**
 * Azure Storagesync API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const CloudEndpointsAfsShareMetadataCertificatePublicKeysInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    storageSyncServiceName: Schema.String.pipe(T.PathParam()),
    syncGroupName: Schema.String.pipe(T.PathParam()),
    cloudEndpointName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageSync/storageSyncServices/{storageSyncServiceName}/syncGroups/{syncGroupName}/cloudEndpoints/{cloudEndpointName}/afsShareMetadataCertificatePublicKeys",
    }),
  );
export type CloudEndpointsAfsShareMetadataCertificatePublicKeysInput =
  typeof CloudEndpointsAfsShareMetadataCertificatePublicKeysInput.Type;

// Output Schema
export const CloudEndpointsAfsShareMetadataCertificatePublicKeysOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    firstKey: Schema.optional(Schema.String),
    secondKey: Schema.optional(Schema.String),
  });
export type CloudEndpointsAfsShareMetadataCertificatePublicKeysOutput =
  typeof CloudEndpointsAfsShareMetadataCertificatePublicKeysOutput.Type;

// The operation
/**
 * Get the AFS file share metadata signing certificate public keys.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageSyncServiceName - Name of Storage Sync Service resource.
 * @param syncGroupName - Name of Sync Group resource.
 * @param cloudEndpointName - Name of Cloud Endpoint object.
 */
export const CloudEndpointsAfsShareMetadataCertificatePublicKeys =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CloudEndpointsAfsShareMetadataCertificatePublicKeysInput,
    outputSchema: CloudEndpointsAfsShareMetadataCertificatePublicKeysOutput,
  }));
// Input Schema
export const CloudEndpointsCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    storageSyncServiceName: Schema.String.pipe(T.PathParam()),
    syncGroupName: Schema.String.pipe(T.PathParam()),
    cloudEndpointName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageSync/storageSyncServices/{storageSyncServiceName}/syncGroups/{syncGroupName}/cloudEndpoints/{cloudEndpointName}",
    }),
  );
export type CloudEndpointsCreateInput = typeof CloudEndpointsCreateInput.Type;

// Output Schema
export const CloudEndpointsCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type CloudEndpointsCreateOutput = typeof CloudEndpointsCreateOutput.Type;

// The operation
/**
 * Create a new CloudEndpoint.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageSyncServiceName - Name of Storage Sync Service resource.
 * @param syncGroupName - Name of Sync Group resource.
 * @param cloudEndpointName - Name of Cloud Endpoint object.
 */
export const CloudEndpointsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CloudEndpointsCreateInput,
    outputSchema: CloudEndpointsCreateOutput,
  }),
);
// Input Schema
export const CloudEndpointsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    storageSyncServiceName: Schema.String.pipe(T.PathParam()),
    syncGroupName: Schema.String.pipe(T.PathParam()),
    cloudEndpointName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageSync/storageSyncServices/{storageSyncServiceName}/syncGroups/{syncGroupName}/cloudEndpoints/{cloudEndpointName}",
    }),
  );
export type CloudEndpointsDeleteInput = typeof CloudEndpointsDeleteInput.Type;

// Output Schema
export const CloudEndpointsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CloudEndpointsDeleteOutput = typeof CloudEndpointsDeleteOutput.Type;

// The operation
/**
 * Delete a given CloudEndpoint.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageSyncServiceName - Name of Storage Sync Service resource.
 * @param syncGroupName - Name of Sync Group resource.
 * @param cloudEndpointName - Name of Cloud Endpoint object.
 */
export const CloudEndpointsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CloudEndpointsDeleteInput,
    outputSchema: CloudEndpointsDeleteOutput,
  }),
);
// Input Schema
export const CloudEndpointsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    storageSyncServiceName: Schema.String.pipe(T.PathParam()),
    syncGroupName: Schema.String.pipe(T.PathParam()),
    cloudEndpointName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageSync/storageSyncServices/{storageSyncServiceName}/syncGroups/{syncGroupName}/cloudEndpoints/{cloudEndpointName}",
  }),
);
export type CloudEndpointsGetInput = typeof CloudEndpointsGetInput.Type;

// Output Schema
export const CloudEndpointsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type CloudEndpointsGetOutput = typeof CloudEndpointsGetOutput.Type;

// The operation
/**
 * Get a given CloudEndpoint.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageSyncServiceName - Name of Storage Sync Service resource.
 * @param syncGroupName - Name of Sync Group resource.
 * @param cloudEndpointName - Name of Cloud Endpoint object.
 */
export const CloudEndpointsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CloudEndpointsGetInput,
  outputSchema: CloudEndpointsGetOutput,
}));
// Input Schema
export const CloudEndpointsListBySyncGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    storageSyncServiceName: Schema.String.pipe(T.PathParam()),
    syncGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageSync/storageSyncServices/{storageSyncServiceName}/syncGroups/{syncGroupName}/cloudEndpoints",
    }),
  );
export type CloudEndpointsListBySyncGroupInput =
  typeof CloudEndpointsListBySyncGroupInput.Type;

// Output Schema
export const CloudEndpointsListBySyncGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type CloudEndpointsListBySyncGroupOutput =
  typeof CloudEndpointsListBySyncGroupOutput.Type;

// The operation
/**
 * Get a CloudEndpoint List.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageSyncServiceName - Name of Storage Sync Service resource.
 * @param syncGroupName - Name of Sync Group resource.
 */
export const CloudEndpointsListBySyncGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CloudEndpointsListBySyncGroupInput,
    outputSchema: CloudEndpointsListBySyncGroupOutput,
  }));
// Input Schema
export const CloudEndpointsPostBackupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    storageSyncServiceName: Schema.String.pipe(T.PathParam()),
    syncGroupName: Schema.String.pipe(T.PathParam()),
    cloudEndpointName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageSync/storageSyncServices/{storageSyncServiceName}/syncGroups/{syncGroupName}/cloudEndpoints/{cloudEndpointName}/postbackup",
    }),
  );
export type CloudEndpointsPostBackupInput =
  typeof CloudEndpointsPostBackupInput.Type;

// Output Schema
export const CloudEndpointsPostBackupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    backupMetadata: Schema.optional(
      Schema.Struct({
        cloudEndpointName: Schema.optional(Schema.String),
      }),
    ),
  });
export type CloudEndpointsPostBackupOutput =
  typeof CloudEndpointsPostBackupOutput.Type;

// The operation
/**
 * Post Backup a given CloudEndpoint.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageSyncServiceName - Name of Storage Sync Service resource.
 * @param syncGroupName - Name of Sync Group resource.
 * @param cloudEndpointName - Name of Cloud Endpoint object.
 */
export const CloudEndpointsPostBackup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CloudEndpointsPostBackupInput,
    outputSchema: CloudEndpointsPostBackupOutput,
  }),
);
// Input Schema
export const CloudEndpointsPostRestoreInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    storageSyncServiceName: Schema.String.pipe(T.PathParam()),
    syncGroupName: Schema.String.pipe(T.PathParam()),
    cloudEndpointName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageSync/storageSyncServices/{storageSyncServiceName}/syncGroups/{syncGroupName}/cloudEndpoints/{cloudEndpointName}/postrestore",
    }),
  );
export type CloudEndpointsPostRestoreInput =
  typeof CloudEndpointsPostRestoreInput.Type;

// Output Schema
export const CloudEndpointsPostRestoreOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CloudEndpointsPostRestoreOutput =
  typeof CloudEndpointsPostRestoreOutput.Type;

// The operation
/**
 * Post Restore a given CloudEndpoint.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageSyncServiceName - Name of Storage Sync Service resource.
 * @param syncGroupName - Name of Sync Group resource.
 * @param cloudEndpointName - Name of Cloud Endpoint object.
 */
export const CloudEndpointsPostRestore = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CloudEndpointsPostRestoreInput,
    outputSchema: CloudEndpointsPostRestoreOutput,
  }),
);
// Input Schema
export const CloudEndpointsPreBackupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    storageSyncServiceName: Schema.String.pipe(T.PathParam()),
    syncGroupName: Schema.String.pipe(T.PathParam()),
    cloudEndpointName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageSync/storageSyncServices/{storageSyncServiceName}/syncGroups/{syncGroupName}/cloudEndpoints/{cloudEndpointName}/prebackup",
    }),
  );
export type CloudEndpointsPreBackupInput =
  typeof CloudEndpointsPreBackupInput.Type;

// Output Schema
export const CloudEndpointsPreBackupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CloudEndpointsPreBackupOutput =
  typeof CloudEndpointsPreBackupOutput.Type;

// The operation
/**
 * Pre Backup a given CloudEndpoint.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageSyncServiceName - Name of Storage Sync Service resource.
 * @param syncGroupName - Name of Sync Group resource.
 * @param cloudEndpointName - Name of Cloud Endpoint object.
 */
export const CloudEndpointsPreBackup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CloudEndpointsPreBackupInput,
    outputSchema: CloudEndpointsPreBackupOutput,
  }),
);
// Input Schema
export const CloudEndpointsPreRestoreInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    storageSyncServiceName: Schema.String.pipe(T.PathParam()),
    syncGroupName: Schema.String.pipe(T.PathParam()),
    cloudEndpointName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageSync/storageSyncServices/{storageSyncServiceName}/syncGroups/{syncGroupName}/cloudEndpoints/{cloudEndpointName}/prerestore",
    }),
  );
export type CloudEndpointsPreRestoreInput =
  typeof CloudEndpointsPreRestoreInput.Type;

// Output Schema
export const CloudEndpointsPreRestoreOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CloudEndpointsPreRestoreOutput =
  typeof CloudEndpointsPreRestoreOutput.Type;

// The operation
/**
 * Pre Restore a given CloudEndpoint.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageSyncServiceName - Name of Storage Sync Service resource.
 * @param syncGroupName - Name of Sync Group resource.
 * @param cloudEndpointName - Name of Cloud Endpoint object.
 */
export const CloudEndpointsPreRestore = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CloudEndpointsPreRestoreInput,
    outputSchema: CloudEndpointsPreRestoreOutput,
  }),
);
// Input Schema
export const CloudEndpointsRestoreheartbeatInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    storageSyncServiceName: Schema.String.pipe(T.PathParam()),
    syncGroupName: Schema.String.pipe(T.PathParam()),
    cloudEndpointName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageSync/storageSyncServices/{storageSyncServiceName}/syncGroups/{syncGroupName}/cloudEndpoints/{cloudEndpointName}/restoreheartbeat",
    }),
  );
export type CloudEndpointsRestoreheartbeatInput =
  typeof CloudEndpointsRestoreheartbeatInput.Type;

// Output Schema
export const CloudEndpointsRestoreheartbeatOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CloudEndpointsRestoreheartbeatOutput =
  typeof CloudEndpointsRestoreheartbeatOutput.Type;

// The operation
/**
 * Restore Heartbeat a given CloudEndpoint.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageSyncServiceName - Name of Storage Sync Service resource.
 * @param syncGroupName - Name of Sync Group resource.
 * @param cloudEndpointName - Name of Cloud Endpoint object.
 */
export const CloudEndpointsRestoreheartbeat =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CloudEndpointsRestoreheartbeatInput,
    outputSchema: CloudEndpointsRestoreheartbeatOutput,
  }));
// Input Schema
export const CloudEndpointsTriggerChangeDetectionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    storageSyncServiceName: Schema.String.pipe(T.PathParam()),
    syncGroupName: Schema.String.pipe(T.PathParam()),
    cloudEndpointName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageSync/storageSyncServices/{storageSyncServiceName}/syncGroups/{syncGroupName}/cloudEndpoints/{cloudEndpointName}/triggerChangeDetection",
    }),
  );
export type CloudEndpointsTriggerChangeDetectionInput =
  typeof CloudEndpointsTriggerChangeDetectionInput.Type;

// Output Schema
export const CloudEndpointsTriggerChangeDetectionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CloudEndpointsTriggerChangeDetectionOutput =
  typeof CloudEndpointsTriggerChangeDetectionOutput.Type;

// The operation
/**
 * Triggers detection of changes performed on Azure File share connected to the specified Azure File Sync Cloud Endpoint.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageSyncServiceName - Name of Storage Sync Service resource.
 * @param syncGroupName - Name of Sync Group resource.
 * @param cloudEndpointName - Name of Cloud Endpoint object.
 */
export const CloudEndpointsTriggerChangeDetection =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CloudEndpointsTriggerChangeDetectionInput,
    outputSchema: CloudEndpointsTriggerChangeDetectionOutput,
  }));
// Input Schema
export const LocationOperationStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    locationName: Schema.String.pipe(T.PathParam()),
    operationId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.StorageSync/locations/{locationName}/operations/{operationId}",
    }),
  );
export type LocationOperationStatusInput =
  typeof LocationOperationStatusInput.Type;

// Output Schema
export const LocationOperationStatusOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    status: Schema.optional(Schema.String),
    startTime: Schema.optional(Schema.String),
    endTime: Schema.optional(Schema.String),
    error: Schema.optional(
      Schema.Struct({
        code: Schema.optional(Schema.String),
        message: Schema.optional(Schema.String),
        target: Schema.optional(Schema.String),
        details: Schema.optional(
          Schema.Struct({
            code: Schema.optional(Schema.String),
            message: Schema.optional(Schema.String),
            target: Schema.optional(Schema.String),
            requestUri: Schema.optional(Schema.String),
            exceptionType: Schema.optional(Schema.String),
            httpMethod: Schema.optional(Schema.String),
            hashedMessage: Schema.optional(Schema.String),
            httpErrorCode: Schema.optional(Schema.String),
          }),
        ),
        innererror: Schema.optional(
          Schema.Struct({
            callStack: Schema.optional(Schema.String),
            message: Schema.optional(Schema.String),
            innerException: Schema.optional(Schema.String),
            innerExceptionCallStack: Schema.optional(Schema.String),
          }),
        ),
      }),
    ),
    percentComplete: Schema.optional(Schema.Number),
  });
export type LocationOperationStatusOutput =
  typeof LocationOperationStatusOutput.Type;

// The operation
/**
 * Get Operation status
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param locationName - The desired region to obtain information from.
 * @param operationId - operation Id
 */
export const LocationOperationStatus = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: LocationOperationStatusInput,
    outputSchema: LocationOperationStatusOutput,
  }),
);
// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.StorageSync/operations",
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
          description: Schema.optional(Schema.String),
          operation: Schema.optional(Schema.String),
          provider: Schema.optional(Schema.String),
          resource: Schema.optional(Schema.String),
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
                    aggregationType: Schema.optional(Schema.String),
                    supportedAggregationTypes: Schema.optional(
                      Schema.Array(Schema.String),
                    ),
                    fillGapWithZero: Schema.optional(Schema.Boolean),
                    lockAggregationType: Schema.optional(Schema.String),
                    dimensions: Schema.optional(
                      Schema.Array(
                        Schema.Struct({
                          name: Schema.optional(Schema.String),
                          displayName: Schema.optional(Schema.String),
                          toBeExportedForShoebox: Schema.optional(
                            Schema.Boolean,
                          ),
                        }),
                      ),
                    ),
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
export const OperationStatusGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    locationName: Schema.String.pipe(T.PathParam()),
    workflowId: Schema.String.pipe(T.PathParam()),
    operationId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageSync/locations/{locationName}/workflows/{workflowId}/operations/{operationId}",
    }),
  );
export type OperationStatusGetInput = typeof OperationStatusGetInput.Type;

// Output Schema
export const OperationStatusGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.optional(Schema.String),
    status: Schema.optional(Schema.String),
    startTime: Schema.optional(Schema.String),
    endTime: Schema.optional(Schema.String),
    error: Schema.optional(
      Schema.Struct({
        code: Schema.optional(Schema.String),
        message: Schema.optional(Schema.String),
        target: Schema.optional(Schema.String),
        details: Schema.optional(
          Schema.Struct({
            code: Schema.optional(Schema.String),
            message: Schema.optional(Schema.String),
            target: Schema.optional(Schema.String),
            requestUri: Schema.optional(Schema.String),
            exceptionType: Schema.optional(Schema.String),
            httpMethod: Schema.optional(Schema.String),
            hashedMessage: Schema.optional(Schema.String),
            httpErrorCode: Schema.optional(Schema.String),
          }),
        ),
        innererror: Schema.optional(
          Schema.Struct({
            callStack: Schema.optional(Schema.String),
            message: Schema.optional(Schema.String),
            innerException: Schema.optional(Schema.String),
            innerExceptionCallStack: Schema.optional(Schema.String),
          }),
        ),
      }),
    ),
  });
export type OperationStatusGetOutput = typeof OperationStatusGetOutput.Type;

// The operation
/**
 * Get Operation status
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param locationName - The desired region to obtain information from.
 * @param workflowId - workflow Id
 * @param operationId - operation Id
 */
export const OperationStatusGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationStatusGetInput,
  outputSchema: OperationStatusGetOutput,
}));
// Input Schema
export const PrivateEndpointConnectionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    storageSyncServiceName: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageSync/storageSyncServices/{storageSyncServiceName}/privateEndpointConnections/{privateEndpointConnectionName}",
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
 * Deletes the specified private endpoint connection associated with the storage sync service.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageSyncServiceName - Name of Storage Sync Service resource.
 * @param privateEndpointConnectionName - The name of the private endpoint connection associated with the Azure resource.
 */
export const PrivateEndpointConnectionsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsDeleteInput,
    outputSchema: PrivateEndpointConnectionsDeleteOutput,
  }));
// Input Schema
export const RegisteredServersCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    storageSyncServiceName: Schema.String.pipe(T.PathParam()),
    serverId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageSync/storageSyncServices/{storageSyncServiceName}/registeredServers/{serverId}",
    }),
  );
export type RegisteredServersCreateInput =
  typeof RegisteredServersCreateInput.Type;

// Output Schema
export const RegisteredServersCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type RegisteredServersCreateOutput =
  typeof RegisteredServersCreateOutput.Type;

// The operation
/**
 * Add a new registered server.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageSyncServiceName - Name of Storage Sync Service resource.
 * @param serverId - GUID identifying the on-premises server.
 */
export const RegisteredServersCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RegisteredServersCreateInput,
    outputSchema: RegisteredServersCreateOutput,
  }),
);
// Input Schema
export const RegisteredServersDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    storageSyncServiceName: Schema.String.pipe(T.PathParam()),
    serverId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageSync/storageSyncServices/{storageSyncServiceName}/registeredServers/{serverId}",
    }),
  );
export type RegisteredServersDeleteInput =
  typeof RegisteredServersDeleteInput.Type;

// Output Schema
export const RegisteredServersDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type RegisteredServersDeleteOutput =
  typeof RegisteredServersDeleteOutput.Type;

// The operation
/**
 * Delete the given registered server.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageSyncServiceName - Name of Storage Sync Service resource.
 * @param serverId - GUID identifying the on-premises server.
 */
export const RegisteredServersDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RegisteredServersDeleteInput,
    outputSchema: RegisteredServersDeleteOutput,
  }),
);
// Input Schema
export const RegisteredServersGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    storageSyncServiceName: Schema.String.pipe(T.PathParam()),
    serverId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageSync/storageSyncServices/{storageSyncServiceName}/registeredServers/{serverId}",
    }),
  );
export type RegisteredServersGetInput = typeof RegisteredServersGetInput.Type;

// Output Schema
export const RegisteredServersGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type RegisteredServersGetOutput = typeof RegisteredServersGetOutput.Type;

// The operation
/**
 * Get a given registered server.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageSyncServiceName - Name of Storage Sync Service resource.
 * @param serverId - GUID identifying the on-premises server.
 */
export const RegisteredServersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RegisteredServersGetInput,
    outputSchema: RegisteredServersGetOutput,
  }),
);
// Input Schema
export const RegisteredServersListByStorageSyncServiceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    storageSyncServiceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageSync/storageSyncServices/{storageSyncServiceName}/registeredServers",
    }),
  );
export type RegisteredServersListByStorageSyncServiceInput =
  typeof RegisteredServersListByStorageSyncServiceInput.Type;

// Output Schema
export const RegisteredServersListByStorageSyncServiceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type RegisteredServersListByStorageSyncServiceOutput =
  typeof RegisteredServersListByStorageSyncServiceOutput.Type;

// The operation
/**
 * Get a given registered server list.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageSyncServiceName - Name of Storage Sync Service resource.
 */
export const RegisteredServersListByStorageSyncService =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RegisteredServersListByStorageSyncServiceInput,
    outputSchema: RegisteredServersListByStorageSyncServiceOutput,
  }));
// Input Schema
export const RegisteredServersTriggerRolloverInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    storageSyncServiceName: Schema.String.pipe(T.PathParam()),
    serverId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageSync/storageSyncServices/{storageSyncServiceName}/registeredServers/{serverId}/triggerRollover",
    }),
  );
export type RegisteredServersTriggerRolloverInput =
  typeof RegisteredServersTriggerRolloverInput.Type;

// Output Schema
export const RegisteredServersTriggerRolloverOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type RegisteredServersTriggerRolloverOutput =
  typeof RegisteredServersTriggerRolloverOutput.Type;

// The operation
/**
 * Triggers Server certificate rollover.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageSyncServiceName - Name of Storage Sync Service resource.
 * @param serverId - GUID identifying the on-premises server.
 */
export const RegisteredServersTriggerRollover =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RegisteredServersTriggerRolloverInput,
    outputSchema: RegisteredServersTriggerRolloverOutput,
  }));
// Input Schema
export const RegisteredServersUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    storageSyncServiceName: Schema.String.pipe(T.PathParam()),
    serverId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageSync/storageSyncServices/{storageSyncServiceName}/registeredServers/{serverId}",
    }),
  );
export type RegisteredServersUpdateInput =
  typeof RegisteredServersUpdateInput.Type;

// Output Schema
export const RegisteredServersUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type RegisteredServersUpdateOutput =
  typeof RegisteredServersUpdateOutput.Type;

// The operation
/**
 * Update registered server.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageSyncServiceName - Name of Storage Sync Service resource.
 * @param serverId - GUID identifying the on-premises server.
 */
export const RegisteredServersUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RegisteredServersUpdateInput,
    outputSchema: RegisteredServersUpdateOutput,
  }),
);
// Input Schema
export const ServerEndpointsCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    storageSyncServiceName: Schema.String.pipe(T.PathParam()),
    syncGroupName: Schema.String.pipe(T.PathParam()),
    serverEndpointName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageSync/storageSyncServices/{storageSyncServiceName}/syncGroups/{syncGroupName}/serverEndpoints/{serverEndpointName}",
    }),
  );
export type ServerEndpointsCreateInput = typeof ServerEndpointsCreateInput.Type;

// Output Schema
export const ServerEndpointsCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ServerEndpointsCreateOutput =
  typeof ServerEndpointsCreateOutput.Type;

// The operation
/**
 * Create a new ServerEndpoint.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageSyncServiceName - Name of Storage Sync Service resource.
 * @param syncGroupName - Name of Sync Group resource.
 * @param serverEndpointName - Name of Server Endpoint object.
 */
export const ServerEndpointsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ServerEndpointsCreateInput,
    outputSchema: ServerEndpointsCreateOutput,
  }),
);
// Input Schema
export const ServerEndpointsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    storageSyncServiceName: Schema.String.pipe(T.PathParam()),
    syncGroupName: Schema.String.pipe(T.PathParam()),
    serverEndpointName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageSync/storageSyncServices/{storageSyncServiceName}/syncGroups/{syncGroupName}/serverEndpoints/{serverEndpointName}",
    }),
  );
export type ServerEndpointsDeleteInput = typeof ServerEndpointsDeleteInput.Type;

// Output Schema
export const ServerEndpointsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ServerEndpointsDeleteOutput =
  typeof ServerEndpointsDeleteOutput.Type;

// The operation
/**
 * Delete a given ServerEndpoint.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageSyncServiceName - Name of Storage Sync Service resource.
 * @param syncGroupName - Name of Sync Group resource.
 * @param serverEndpointName - Name of Server Endpoint object.
 */
export const ServerEndpointsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ServerEndpointsDeleteInput,
    outputSchema: ServerEndpointsDeleteOutput,
  }),
);
// Input Schema
export const ServerEndpointsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    storageSyncServiceName: Schema.String.pipe(T.PathParam()),
    syncGroupName: Schema.String.pipe(T.PathParam()),
    serverEndpointName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageSync/storageSyncServices/{storageSyncServiceName}/syncGroups/{syncGroupName}/serverEndpoints/{serverEndpointName}",
    }),
  );
export type ServerEndpointsGetInput = typeof ServerEndpointsGetInput.Type;

// Output Schema
export const ServerEndpointsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ServerEndpointsGetOutput = typeof ServerEndpointsGetOutput.Type;

// The operation
/**
 * Get a ServerEndpoint.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageSyncServiceName - Name of Storage Sync Service resource.
 * @param syncGroupName - Name of Sync Group resource.
 * @param serverEndpointName - Name of Server Endpoint object.
 */
export const ServerEndpointsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServerEndpointsGetInput,
  outputSchema: ServerEndpointsGetOutput,
}));
// Input Schema
export const ServerEndpointsListBySyncGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    storageSyncServiceName: Schema.String.pipe(T.PathParam()),
    syncGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageSync/storageSyncServices/{storageSyncServiceName}/syncGroups/{syncGroupName}/serverEndpoints",
    }),
  );
export type ServerEndpointsListBySyncGroupInput =
  typeof ServerEndpointsListBySyncGroupInput.Type;

// Output Schema
export const ServerEndpointsListBySyncGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ServerEndpointsListBySyncGroupOutput =
  typeof ServerEndpointsListBySyncGroupOutput.Type;

// The operation
/**
 * Get a ServerEndpoint list.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageSyncServiceName - Name of Storage Sync Service resource.
 * @param syncGroupName - Name of Sync Group resource.
 */
export const ServerEndpointsListBySyncGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServerEndpointsListBySyncGroupInput,
    outputSchema: ServerEndpointsListBySyncGroupOutput,
  }));
// Input Schema
export const ServerEndpointsRecallActionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    storageSyncServiceName: Schema.String.pipe(T.PathParam()),
    syncGroupName: Schema.String.pipe(T.PathParam()),
    serverEndpointName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageSync/storageSyncServices/{storageSyncServiceName}/syncGroups/{syncGroupName}/serverEndpoints/{serverEndpointName}/recallAction",
    }),
  );
export type ServerEndpointsRecallActionInput =
  typeof ServerEndpointsRecallActionInput.Type;

// Output Schema
export const ServerEndpointsRecallActionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ServerEndpointsRecallActionOutput =
  typeof ServerEndpointsRecallActionOutput.Type;

// The operation
/**
 * Recall a server endpoint.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageSyncServiceName - Name of Storage Sync Service resource.
 * @param syncGroupName - Name of Sync Group resource.
 * @param serverEndpointName - Name of Server Endpoint object.
 */
export const ServerEndpointsRecallAction = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ServerEndpointsRecallActionInput,
    outputSchema: ServerEndpointsRecallActionOutput,
  }),
);
// Input Schema
export const ServerEndpointsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    storageSyncServiceName: Schema.String.pipe(T.PathParam()),
    syncGroupName: Schema.String.pipe(T.PathParam()),
    serverEndpointName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageSync/storageSyncServices/{storageSyncServiceName}/syncGroups/{syncGroupName}/serverEndpoints/{serverEndpointName}",
    }),
  );
export type ServerEndpointsUpdateInput = typeof ServerEndpointsUpdateInput.Type;

// Output Schema
export const ServerEndpointsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ServerEndpointsUpdateOutput =
  typeof ServerEndpointsUpdateOutput.Type;

// The operation
/**
 * Patch a given ServerEndpoint.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageSyncServiceName - Name of Storage Sync Service resource.
 * @param syncGroupName - Name of Sync Group resource.
 * @param serverEndpointName - Name of Server Endpoint object.
 */
export const ServerEndpointsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ServerEndpointsUpdateInput,
    outputSchema: ServerEndpointsUpdateOutput,
  }),
);
// Input Schema
export const StorageSyncServicesCheckNameAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    locationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.StorageSync/locations/{locationName}/checkNameAvailability",
    }),
  );
export type StorageSyncServicesCheckNameAvailabilityInput =
  typeof StorageSyncServicesCheckNameAvailabilityInput.Type;

// Output Schema
export const StorageSyncServicesCheckNameAvailabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nameAvailable: Schema.optional(Schema.Boolean),
    reason: Schema.optional(Schema.Literals(["Invalid", "AlreadyExists"])),
    message: Schema.optional(Schema.String),
  });
export type StorageSyncServicesCheckNameAvailabilityOutput =
  typeof StorageSyncServicesCheckNameAvailabilityOutput.Type;

// The operation
/**
 * Check the give namespace name availability.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param locationName - The desired region for the name check.
 */
export const StorageSyncServicesCheckNameAvailability =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: StorageSyncServicesCheckNameAvailabilityInput,
    outputSchema: StorageSyncServicesCheckNameAvailabilityOutput,
  }));
// Input Schema
export const StorageSyncServicesCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    storageSyncServiceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageSync/storageSyncServices/{storageSyncServiceName}",
    }),
  );
export type StorageSyncServicesCreateInput =
  typeof StorageSyncServicesCreateInput.Type;

// Output Schema
export const StorageSyncServicesCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type StorageSyncServicesCreateOutput =
  typeof StorageSyncServicesCreateOutput.Type;

// The operation
/**
 * Create a new StorageSyncService.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageSyncServiceName - Name of Storage Sync Service resource.
 */
export const StorageSyncServicesCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: StorageSyncServicesCreateInput,
    outputSchema: StorageSyncServicesCreateOutput,
  }),
);
// Input Schema
export const StorageSyncServicesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    storageSyncServiceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageSync/storageSyncServices/{storageSyncServiceName}",
    }),
  );
export type StorageSyncServicesDeleteInput =
  typeof StorageSyncServicesDeleteInput.Type;

// Output Schema
export const StorageSyncServicesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type StorageSyncServicesDeleteOutput =
  typeof StorageSyncServicesDeleteOutput.Type;

// The operation
/**
 * Delete a given StorageSyncService.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageSyncServiceName - Name of Storage Sync Service resource.
 */
export const StorageSyncServicesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: StorageSyncServicesDeleteInput,
    outputSchema: StorageSyncServicesDeleteOutput,
  }),
);
// Input Schema
export const StorageSyncServicesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    storageSyncServiceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageSync/storageSyncServices/{storageSyncServiceName}",
    }),
  );
export type StorageSyncServicesGetInput =
  typeof StorageSyncServicesGetInput.Type;

// Output Schema
export const StorageSyncServicesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type StorageSyncServicesGetOutput =
  typeof StorageSyncServicesGetOutput.Type;

// The operation
/**
 * Get a given StorageSyncService.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageSyncServiceName - Name of Storage Sync Service resource.
 */
export const StorageSyncServicesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: StorageSyncServicesGetInput,
    outputSchema: StorageSyncServicesGetOutput,
  }),
);
// Input Schema
export const StorageSyncServicesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageSync/storageSyncServices",
    }),
  );
export type StorageSyncServicesListByResourceGroupInput =
  typeof StorageSyncServicesListByResourceGroupInput.Type;

// Output Schema
export const StorageSyncServicesListByResourceGroupOutput =
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
export type StorageSyncServicesListByResourceGroupOutput =
  typeof StorageSyncServicesListByResourceGroupOutput.Type;

// The operation
/**
 * Get a StorageSyncService list by Resource group name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const StorageSyncServicesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: StorageSyncServicesListByResourceGroupInput,
    outputSchema: StorageSyncServicesListByResourceGroupOutput,
  }));
// Input Schema
export const StorageSyncServicesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.StorageSync/storageSyncServices",
    }),
  );
export type StorageSyncServicesListBySubscriptionInput =
  typeof StorageSyncServicesListBySubscriptionInput.Type;

// Output Schema
export const StorageSyncServicesListBySubscriptionOutput =
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
export type StorageSyncServicesListBySubscriptionOutput =
  typeof StorageSyncServicesListBySubscriptionOutput.Type;

// The operation
/**
 * Get a StorageSyncService list by subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const StorageSyncServicesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: StorageSyncServicesListBySubscriptionInput,
    outputSchema: StorageSyncServicesListBySubscriptionOutput,
  }));
// Input Schema
export const StorageSyncServicesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    storageSyncServiceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageSync/storageSyncServices/{storageSyncServiceName}",
    }),
  );
export type StorageSyncServicesUpdateInput =
  typeof StorageSyncServicesUpdateInput.Type;

// Output Schema
export const StorageSyncServicesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type StorageSyncServicesUpdateOutput =
  typeof StorageSyncServicesUpdateOutput.Type;

// The operation
/**
 * Patch a given StorageSyncService.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageSyncServiceName - Name of Storage Sync Service resource.
 */
export const StorageSyncServicesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: StorageSyncServicesUpdateInput,
    outputSchema: StorageSyncServicesUpdateOutput,
  }),
);
// Input Schema
export const SyncGroupsCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  storageSyncServiceName: Schema.String.pipe(T.PathParam()),
  syncGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageSync/storageSyncServices/{storageSyncServiceName}/syncGroups/{syncGroupName}",
  }),
);
export type SyncGroupsCreateInput = typeof SyncGroupsCreateInput.Type;

// Output Schema
export const SyncGroupsCreateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type SyncGroupsCreateOutput = typeof SyncGroupsCreateOutput.Type;

// The operation
/**
 * Create a new SyncGroup.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageSyncServiceName - Name of Storage Sync Service resource.
 * @param syncGroupName - Name of Sync Group resource.
 */
export const SyncGroupsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SyncGroupsCreateInput,
  outputSchema: SyncGroupsCreateOutput,
}));
// Input Schema
export const SyncGroupsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  storageSyncServiceName: Schema.String.pipe(T.PathParam()),
  syncGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageSync/storageSyncServices/{storageSyncServiceName}/syncGroups/{syncGroupName}",
  }),
);
export type SyncGroupsDeleteInput = typeof SyncGroupsDeleteInput.Type;

// Output Schema
export const SyncGroupsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SyncGroupsDeleteOutput = typeof SyncGroupsDeleteOutput.Type;

// The operation
/**
 * Delete a given SyncGroup.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageSyncServiceName - Name of Storage Sync Service resource.
 * @param syncGroupName - Name of Sync Group resource.
 */
export const SyncGroupsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SyncGroupsDeleteInput,
  outputSchema: SyncGroupsDeleteOutput,
}));
// Input Schema
export const SyncGroupsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  storageSyncServiceName: Schema.String.pipe(T.PathParam()),
  syncGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageSync/storageSyncServices/{storageSyncServiceName}/syncGroups/{syncGroupName}",
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
 * Get a given SyncGroup.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageSyncServiceName - Name of Storage Sync Service resource.
 * @param syncGroupName - Name of Sync Group resource.
 */
export const SyncGroupsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SyncGroupsGetInput,
  outputSchema: SyncGroupsGetOutput,
}));
// Input Schema
export const SyncGroupsListByStorageSyncServiceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    storageSyncServiceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageSync/storageSyncServices/{storageSyncServiceName}/syncGroups",
    }),
  );
export type SyncGroupsListByStorageSyncServiceInput =
  typeof SyncGroupsListByStorageSyncServiceInput.Type;

// Output Schema
export const SyncGroupsListByStorageSyncServiceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type SyncGroupsListByStorageSyncServiceOutput =
  typeof SyncGroupsListByStorageSyncServiceOutput.Type;

// The operation
/**
 * Get a SyncGroup List.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageSyncServiceName - Name of Storage Sync Service resource.
 */
export const SyncGroupsListByStorageSyncService =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SyncGroupsListByStorageSyncServiceInput,
    outputSchema: SyncGroupsListByStorageSyncServiceOutput,
  }));
// Input Schema
export const WorkflowsAbortInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  storageSyncServiceName: Schema.String.pipe(T.PathParam()),
  workflowId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageSync/storageSyncServices/{storageSyncServiceName}/workflows/{workflowId}/abort",
  }),
);
export type WorkflowsAbortInput = typeof WorkflowsAbortInput.Type;

// Output Schema
export const WorkflowsAbortOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type WorkflowsAbortOutput = typeof WorkflowsAbortOutput.Type;

// The operation
/**
 * Abort the given workflow.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageSyncServiceName - Name of Storage Sync Service resource.
 * @param workflowId - workflow Id
 */
export const WorkflowsAbort = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WorkflowsAbortInput,
  outputSchema: WorkflowsAbortOutput,
}));
// Input Schema
export const WorkflowsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  storageSyncServiceName: Schema.String.pipe(T.PathParam()),
  workflowId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageSync/storageSyncServices/{storageSyncServiceName}/workflows/{workflowId}",
  }),
);
export type WorkflowsGetInput = typeof WorkflowsGetInput.Type;

// Output Schema
export const WorkflowsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WorkflowsGetOutput = typeof WorkflowsGetOutput.Type;

// The operation
/**
 * Get Workflows resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageSyncServiceName - Name of Storage Sync Service resource.
 * @param workflowId - workflow Id
 */
export const WorkflowsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WorkflowsGetInput,
  outputSchema: WorkflowsGetOutput,
}));
// Input Schema
export const WorkflowsListByStorageSyncServiceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    storageSyncServiceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageSync/storageSyncServices/{storageSyncServiceName}/workflows",
    }),
  );
export type WorkflowsListByStorageSyncServiceInput =
  typeof WorkflowsListByStorageSyncServiceInput.Type;

// Output Schema
export const WorkflowsListByStorageSyncServiceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type WorkflowsListByStorageSyncServiceOutput =
  typeof WorkflowsListByStorageSyncServiceOutput.Type;

// The operation
/**
 * Get a Workflow List
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageSyncServiceName - Name of Storage Sync Service resource.
 */
export const WorkflowsListByStorageSyncService =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkflowsListByStorageSyncServiceInput,
    outputSchema: WorkflowsListByStorageSyncServiceOutput,
  }));
