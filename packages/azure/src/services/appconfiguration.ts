/**
 * Azure Appconfiguration API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";
import { SensitiveString } from "../sensitive.ts";

// Input Schema
export const ConfigurationStoresCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AppConfiguration/configurationStores/{configStoreName}",
    }),
  );
export type ConfigurationStoresCreateInput =
  typeof ConfigurationStoresCreateInput.Type;

// Output Schema
export const ConfigurationStoresCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ConfigurationStoresCreateOutput =
  typeof ConfigurationStoresCreateOutput.Type;

// The operation
/**
 * Creates a configuration store with the specified parameters.
 */
export const ConfigurationStoresCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ConfigurationStoresCreateInput,
    outputSchema: ConfigurationStoresCreateOutput,
  }),
);
// Input Schema
export const ConfigurationStoresDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AppConfiguration/configurationStores/{configStoreName}",
    }),
  );
export type ConfigurationStoresDeleteInput =
  typeof ConfigurationStoresDeleteInput.Type;

// Output Schema
export const ConfigurationStoresDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ConfigurationStoresDeleteOutput =
  typeof ConfigurationStoresDeleteOutput.Type;

// The operation
/**
 * Deletes a configuration store.
 */
export const ConfigurationStoresDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ConfigurationStoresDeleteInput,
    outputSchema: ConfigurationStoresDeleteOutput,
  }),
);
// Input Schema
export const ConfigurationStoresGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AppConfiguration/configurationStores/{configStoreName}",
    }),
  );
export type ConfigurationStoresGetInput =
  typeof ConfigurationStoresGetInput.Type;

// Output Schema
export const ConfigurationStoresGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ConfigurationStoresGetOutput =
  typeof ConfigurationStoresGetOutput.Type;

// The operation
/**
 * Gets the properties of the specified configuration store.
 */
export const ConfigurationStoresGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ConfigurationStoresGetInput,
    outputSchema: ConfigurationStoresGetOutput,
  }),
);
// Input Schema
export const ConfigurationStoresGetDeletedInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AppConfiguration/locations/{location}/deletedConfigurationStores/{configStoreName}",
    }),
  );
export type ConfigurationStoresGetDeletedInput =
  typeof ConfigurationStoresGetDeletedInput.Type;

// Output Schema
export const ConfigurationStoresGetDeletedOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        configurationStoreId: Schema.optional(Schema.String),
        location: Schema.optional(Schema.String),
        deletionDate: Schema.optional(Schema.String),
        scheduledPurgeDate: Schema.optional(Schema.String),
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        purgeProtectionEnabled: Schema.optional(Schema.Boolean),
      }),
    ),
  });
export type ConfigurationStoresGetDeletedOutput =
  typeof ConfigurationStoresGetDeletedOutput.Type;

// The operation
/**
 * Gets a deleted Azure app configuration store.
 */
export const ConfigurationStoresGetDeleted =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigurationStoresGetDeletedInput,
    outputSchema: ConfigurationStoresGetDeletedOutput,
  }));
// Input Schema
export const ConfigurationStoresListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    $skipToken: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AppConfiguration/configurationStores",
    }),
  );
export type ConfigurationStoresListInput =
  typeof ConfigurationStoresListInput.Type;

// Output Schema
export const ConfigurationStoresListOutput =
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
export type ConfigurationStoresListOutput =
  typeof ConfigurationStoresListOutput.Type;

// The operation
/**
 * Lists the configuration stores for a given subscription.
 *
 * @param $skipToken - A skip token is used to continue retrieving items after an operation returns a partial result. If a previous response contains a nextLink element, the value of the nextLink element will include a skipToken parameter that specifies a starting point to use for subsequent calls.
 */
export const ConfigurationStoresList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ConfigurationStoresListInput,
    outputSchema: ConfigurationStoresListOutput,
  }),
);
// Input Schema
export const ConfigurationStoresListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    $skipToken: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AppConfiguration/configurationStores",
    }),
  );
export type ConfigurationStoresListByResourceGroupInput =
  typeof ConfigurationStoresListByResourceGroupInput.Type;

// Output Schema
export const ConfigurationStoresListByResourceGroupOutput =
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
export type ConfigurationStoresListByResourceGroupOutput =
  typeof ConfigurationStoresListByResourceGroupOutput.Type;

// The operation
/**
 * Lists the configuration stores for a given resource group.
 *
 * @param $skipToken - A skip token is used to continue retrieving items after an operation returns a partial result. If a previous response contains a nextLink element, the value of the nextLink element will include a skipToken parameter that specifies a starting point to use for subsequent calls.
 */
export const ConfigurationStoresListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigurationStoresListByResourceGroupInput,
    outputSchema: ConfigurationStoresListByResourceGroupOutput,
  }));
// Input Schema
export const ConfigurationStoresListDeletedInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AppConfiguration/deletedConfigurationStores",
    }),
  );
export type ConfigurationStoresListDeletedInput =
  typeof ConfigurationStoresListDeletedInput.Type;

// Output Schema
export const ConfigurationStoresListDeletedOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Struct({
              configurationStoreId: Schema.optional(Schema.String),
              location: Schema.optional(Schema.String),
              deletionDate: Schema.optional(Schema.String),
              scheduledPurgeDate: Schema.optional(Schema.String),
              tags: Schema.optional(
                Schema.Record(Schema.String, Schema.String),
              ),
              purgeProtectionEnabled: Schema.optional(Schema.Boolean),
            }),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ConfigurationStoresListDeletedOutput =
  typeof ConfigurationStoresListDeletedOutput.Type;

// The operation
/**
 * Gets information about the deleted configuration stores in a subscription.
 */
export const ConfigurationStoresListDeleted =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigurationStoresListDeletedInput,
    outputSchema: ConfigurationStoresListDeletedOutput,
  }));
// Input Schema
export const ConfigurationStoresListKeysInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    $skipToken: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AppConfiguration/configurationStores/{configStoreName}/listKeys",
    }),
  );
export type ConfigurationStoresListKeysInput =
  typeof ConfigurationStoresListKeysInput.Type;

// Output Schema
export const ConfigurationStoresListKeysOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          value: Schema.optional(Schema.String),
          connectionString: Schema.optional(SensitiveString),
          lastModified: Schema.optional(Schema.String),
          readOnly: Schema.optional(Schema.Boolean),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ConfigurationStoresListKeysOutput =
  typeof ConfigurationStoresListKeysOutput.Type;

// The operation
/**
 * Lists the access key for the specified configuration store.
 *
 * @param $skipToken - A skip token is used to continue retrieving items after an operation returns a partial result. If a previous response contains a nextLink element, the value of the nextLink element will include a skipToken parameter that specifies a starting point to use for subsequent calls.
 */
export const ConfigurationStoresListKeys = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ConfigurationStoresListKeysInput,
    outputSchema: ConfigurationStoresListKeysOutput,
  }),
);
// Input Schema
export const ConfigurationStoresPurgeDeletedInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AppConfiguration/locations/{location}/deletedConfigurationStores/{configStoreName}/purge",
    }),
  );
export type ConfigurationStoresPurgeDeletedInput =
  typeof ConfigurationStoresPurgeDeletedInput.Type;

// Output Schema
export const ConfigurationStoresPurgeDeletedOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ConfigurationStoresPurgeDeletedOutput =
  typeof ConfigurationStoresPurgeDeletedOutput.Type;

// The operation
/**
 * Permanently deletes the specified configuration store.
 */
export const ConfigurationStoresPurgeDeleted =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigurationStoresPurgeDeletedInput,
    outputSchema: ConfigurationStoresPurgeDeletedOutput,
  }));
// Input Schema
export const ConfigurationStoresRegenerateKeyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AppConfiguration/configurationStores/{configStoreName}/regenerateKey",
    }),
  );
export type ConfigurationStoresRegenerateKeyInput =
  typeof ConfigurationStoresRegenerateKeyInput.Type;

// Output Schema
export const ConfigurationStoresRegenerateKeyOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    value: Schema.optional(Schema.String),
    connectionString: Schema.optional(SensitiveString),
    lastModified: Schema.optional(Schema.String),
    readOnly: Schema.optional(Schema.Boolean),
  });
export type ConfigurationStoresRegenerateKeyOutput =
  typeof ConfigurationStoresRegenerateKeyOutput.Type;

// The operation
/**
 * Regenerates an access key for the specified configuration store.
 */
export const ConfigurationStoresRegenerateKey =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigurationStoresRegenerateKeyInput,
    outputSchema: ConfigurationStoresRegenerateKeyOutput,
  }));
// Input Schema
export const ConfigurationStoresUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AppConfiguration/configurationStores/{configStoreName}",
    }),
  );
export type ConfigurationStoresUpdateInput =
  typeof ConfigurationStoresUpdateInput.Type;

// Output Schema
export const ConfigurationStoresUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ConfigurationStoresUpdateOutput =
  typeof ConfigurationStoresUpdateOutput.Type;

// The operation
/**
 * Updates a configuration store with the specified parameters.
 */
export const ConfigurationStoresUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ConfigurationStoresUpdateInput,
    outputSchema: ConfigurationStoresUpdateOutput,
  }),
);
// Input Schema
export const KeyValuesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    keyValueName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AppConfiguration/configurationStores/{configStoreName}/keyValues/{keyValueName}",
    }),
  );
export type KeyValuesCreateOrUpdateInput =
  typeof KeyValuesCreateOrUpdateInput.Type;

// Output Schema
export const KeyValuesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        key: Schema.optional(Schema.String),
        label: Schema.optional(Schema.String),
        value: Schema.optional(Schema.String),
        contentType: Schema.optional(Schema.String),
        eTag: Schema.optional(Schema.String),
        lastModified: Schema.optional(Schema.String),
        locked: Schema.optional(Schema.Boolean),
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      }),
    ),
  });
export type KeyValuesCreateOrUpdateOutput =
  typeof KeyValuesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates a key-value. NOTE: This operation is intended for use in ARM Template deployments. For all other scenarios involving App Configuration key-values the data plane API should be used instead.
 *
 * @param keyValueName - Identifier of key and label combination. Key and label are joined by $ character. Label is optional.
 */
export const KeyValuesCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: KeyValuesCreateOrUpdateInput,
    outputSchema: KeyValuesCreateOrUpdateOutput,
  }),
);
// Input Schema
export const KeyValuesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  keyValueName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AppConfiguration/configurationStores/{configStoreName}/keyValues/{keyValueName}",
  }),
);
export type KeyValuesDeleteInput = typeof KeyValuesDeleteInput.Type;

// Output Schema
export const KeyValuesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type KeyValuesDeleteOutput = typeof KeyValuesDeleteOutput.Type;

// The operation
/**
 * Deletes a key-value. NOTE: This operation is intended for use in ARM Template deployments. For all other scenarios involving App Configuration key-values the data plane API should be used instead.
 *
 * @param keyValueName - Identifier of key and label combination. Key and label are joined by $ character. Label is optional.
 */
export const KeyValuesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: KeyValuesDeleteInput,
  outputSchema: KeyValuesDeleteOutput,
}));
// Input Schema
export const KeyValuesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  keyValueName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AppConfiguration/configurationStores/{configStoreName}/keyValues/{keyValueName}",
  }),
);
export type KeyValuesGetInput = typeof KeyValuesGetInput.Type;

// Output Schema
export const KeyValuesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  properties: Schema.optional(
    Schema.Struct({
      key: Schema.optional(Schema.String),
      label: Schema.optional(Schema.String),
      value: Schema.optional(Schema.String),
      contentType: Schema.optional(Schema.String),
      eTag: Schema.optional(Schema.String),
      lastModified: Schema.optional(Schema.String),
      locked: Schema.optional(Schema.Boolean),
      tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    }),
  ),
});
export type KeyValuesGetOutput = typeof KeyValuesGetOutput.Type;

// The operation
/**
 * Gets the properties of the specified key-value. NOTE: This operation is intended for use in ARM Template deployments. For all other scenarios involving App Configuration key-values the data plane API should be used instead.
 *
 * @param keyValueName - Identifier of key and label combination. Key and label are joined by $ character. Label is optional.
 */
export const KeyValuesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: KeyValuesGetInput,
  outputSchema: KeyValuesGetOutput,
}));
// Input Schema
export const OperationsCheckNameAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AppConfiguration/checkNameAvailability",
    }),
  );
export type OperationsCheckNameAvailabilityInput =
  typeof OperationsCheckNameAvailabilityInput.Type;

// Output Schema
export const OperationsCheckNameAvailabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nameAvailable: Schema.optional(Schema.Boolean),
    message: Schema.optional(Schema.String),
    reason: Schema.optional(Schema.String),
  });
export type OperationsCheckNameAvailabilityOutput =
  typeof OperationsCheckNameAvailabilityOutput.Type;

// The operation
/**
 * Checks whether the configuration store name is available for use.
 */
export const OperationsCheckNameAvailability =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: OperationsCheckNameAvailabilityInput,
    outputSchema: OperationsCheckNameAvailabilityOutput,
  }));
// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  $skipToken: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.AppConfiguration/operations",
  }),
);
export type OperationsListInput = typeof OperationsListInput.Type;

// Output Schema
export const OperationsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        name: Schema.optional(Schema.String),
        isDataAction: Schema.optional(Schema.Boolean),
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
                metricSpecifications: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      name: Schema.optional(Schema.String),
                      displayName: Schema.optional(Schema.String),
                      displayDescription: Schema.optional(Schema.String),
                      unit: Schema.optional(Schema.String),
                      aggregationType: Schema.optional(Schema.String),
                      internalMetricName: Schema.optional(Schema.String),
                      dimensions: Schema.optional(
                        Schema.Array(
                          Schema.Struct({
                            name: Schema.optional(Schema.String),
                            displayName: Schema.optional(Schema.String),
                            internalName: Schema.optional(Schema.String),
                          }),
                        ),
                      ),
                      fillGapWithZero: Schema.optional(Schema.Boolean),
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
 * Lists the operations available from this provider.
 *
 * @param $skipToken - A skip token is used to continue retrieving items after an operation returns a partial result. If a previous response contains a nextLink element, the value of the nextLink element will include a skipToken parameter that specifies a starting point to use for subsequent calls.
 */
export const OperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationsListInput,
  outputSchema: OperationsListOutput,
}));
// Input Schema
export const OperationsRegionalCheckNameAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AppConfiguration/locations/{location}/checkNameAvailability",
    }),
  );
export type OperationsRegionalCheckNameAvailabilityInput =
  typeof OperationsRegionalCheckNameAvailabilityInput.Type;

// Output Schema
export const OperationsRegionalCheckNameAvailabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nameAvailable: Schema.optional(Schema.Boolean),
    message: Schema.optional(Schema.String),
    reason: Schema.optional(Schema.String),
  });
export type OperationsRegionalCheckNameAvailabilityOutput =
  typeof OperationsRegionalCheckNameAvailabilityOutput.Type;

// The operation
/**
 * Checks whether the configuration store name is available for use.
 */
export const OperationsRegionalCheckNameAvailability =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: OperationsRegionalCheckNameAvailabilityInput,
    outputSchema: OperationsRegionalCheckNameAvailabilityOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AppConfiguration/configurationStores/{configStoreName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type PrivateEndpointConnectionsCreateOrUpdateInput =
  typeof PrivateEndpointConnectionsCreateOrUpdateInput.Type;

// Output Schema
export const PrivateEndpointConnectionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        provisioningState: Schema.optional(
          Schema.Literals([
            "Creating",
            "Updating",
            "Deleting",
            "Succeeded",
            "Failed",
            "Canceled",
          ]),
        ),
        privateEndpoint: Schema.optional(
          Schema.Struct({
            id: Schema.optional(Schema.String),
          }),
        ),
        privateLinkServiceConnectionState: Schema.Struct({
          status: Schema.optional(
            Schema.Literals([
              "Pending",
              "Approved",
              "Rejected",
              "Disconnected",
            ]),
          ),
          description: Schema.optional(Schema.String),
          actionsRequired: Schema.optional(
            Schema.Literals(["None", "Recreate"]),
          ),
        }),
      }),
    ),
  });
export type PrivateEndpointConnectionsCreateOrUpdateOutput =
  typeof PrivateEndpointConnectionsCreateOrUpdateOutput.Type;

// The operation
/**
 * Update the state of the specified private endpoint connection associated with the configuration store. This operation cannot be used to create a private endpoint connection. Private endpoint connections must be created with the Network resource provider.
 *
 * @param privateEndpointConnectionName - Private endpoint connection name
 */
export const PrivateEndpointConnectionsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsCreateOrUpdateInput,
    outputSchema: PrivateEndpointConnectionsCreateOrUpdateOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AppConfiguration/configurationStores/{configStoreName}/privateEndpointConnections/{privateEndpointConnectionName}",
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
 * @param privateEndpointConnectionName - Private endpoint connection name
 */
export const PrivateEndpointConnectionsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsDeleteInput,
    outputSchema: PrivateEndpointConnectionsDeleteOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AppConfiguration/configurationStores/{configStoreName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type PrivateEndpointConnectionsGetInput =
  typeof PrivateEndpointConnectionsGetInput.Type;

// Output Schema
export const PrivateEndpointConnectionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        provisioningState: Schema.optional(
          Schema.Literals([
            "Creating",
            "Updating",
            "Deleting",
            "Succeeded",
            "Failed",
            "Canceled",
          ]),
        ),
        privateEndpoint: Schema.optional(
          Schema.Struct({
            id: Schema.optional(Schema.String),
          }),
        ),
        privateLinkServiceConnectionState: Schema.Struct({
          status: Schema.optional(
            Schema.Literals([
              "Pending",
              "Approved",
              "Rejected",
              "Disconnected",
            ]),
          ),
          description: Schema.optional(Schema.String),
          actionsRequired: Schema.optional(
            Schema.Literals(["None", "Recreate"]),
          ),
        }),
      }),
    ),
  });
export type PrivateEndpointConnectionsGetOutput =
  typeof PrivateEndpointConnectionsGetOutput.Type;

// The operation
/**
 * Gets the specified private endpoint connection associated with the configuration store.
 *
 * @param privateEndpointConnectionName - Private endpoint connection name
 */
export const PrivateEndpointConnectionsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsGetInput,
    outputSchema: PrivateEndpointConnectionsGetOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsListByConfigurationStoreInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AppConfiguration/configurationStores/{configStoreName}/privateEndpointConnections",
    }),
  );
export type PrivateEndpointConnectionsListByConfigurationStoreInput =
  typeof PrivateEndpointConnectionsListByConfigurationStoreInput.Type;

// Output Schema
export const PrivateEndpointConnectionsListByConfigurationStoreOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Struct({
              provisioningState: Schema.optional(
                Schema.Literals([
                  "Creating",
                  "Updating",
                  "Deleting",
                  "Succeeded",
                  "Failed",
                  "Canceled",
                ]),
              ),
              privateEndpoint: Schema.optional(
                Schema.Struct({
                  id: Schema.optional(Schema.String),
                }),
              ),
              privateLinkServiceConnectionState: Schema.Struct({
                status: Schema.optional(
                  Schema.Literals([
                    "Pending",
                    "Approved",
                    "Rejected",
                    "Disconnected",
                  ]),
                ),
                description: Schema.optional(Schema.String),
                actionsRequired: Schema.optional(
                  Schema.Literals(["None", "Recreate"]),
                ),
              }),
            }),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type PrivateEndpointConnectionsListByConfigurationStoreOutput =
  typeof PrivateEndpointConnectionsListByConfigurationStoreOutput.Type;

// The operation
/**
 * Lists all private endpoint connections for a configuration store.
 */
export const PrivateEndpointConnectionsListByConfigurationStore =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsListByConfigurationStoreInput,
    outputSchema: PrivateEndpointConnectionsListByConfigurationStoreOutput,
  }));
// Input Schema
export const PrivateLinkResourcesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AppConfiguration/configurationStores/{configStoreName}/privateLinkResources/{groupName}",
    }),
  );
export type PrivateLinkResourcesGetInput =
  typeof PrivateLinkResourcesGetInput.Type;

// Output Schema
export const PrivateLinkResourcesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        groupId: Schema.optional(Schema.String),
        requiredMembers: Schema.optional(Schema.Array(Schema.String)),
        requiredZoneNames: Schema.optional(Schema.Array(Schema.String)),
      }),
    ),
  });
export type PrivateLinkResourcesGetOutput =
  typeof PrivateLinkResourcesGetOutput.Type;

// The operation
/**
 * Gets a private link resource that need to be created for a configuration store.
 *
 * @param groupName - The name of the private link resource group.
 */
export const PrivateLinkResourcesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PrivateLinkResourcesGetInput,
    outputSchema: PrivateLinkResourcesGetOutput,
  }),
);
// Input Schema
export const PrivateLinkResourcesListByConfigurationStoreInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AppConfiguration/configurationStores/{configStoreName}/privateLinkResources",
    }),
  );
export type PrivateLinkResourcesListByConfigurationStoreInput =
  typeof PrivateLinkResourcesListByConfigurationStoreInput.Type;

// Output Schema
export const PrivateLinkResourcesListByConfigurationStoreOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Struct({
              groupId: Schema.optional(Schema.String),
              requiredMembers: Schema.optional(Schema.Array(Schema.String)),
              requiredZoneNames: Schema.optional(Schema.Array(Schema.String)),
            }),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type PrivateLinkResourcesListByConfigurationStoreOutput =
  typeof PrivateLinkResourcesListByConfigurationStoreOutput.Type;

// The operation
/**
 * Gets the private link resources that need to be created for a configuration store.
 */
export const PrivateLinkResourcesListByConfigurationStore =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinkResourcesListByConfigurationStoreInput,
    outputSchema: PrivateLinkResourcesListByConfigurationStoreOutput,
  }));
// Input Schema
export const ReplicasCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  replicaName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AppConfiguration/configurationStores/{configStoreName}/replicas/{replicaName}",
  }),
);
export type ReplicasCreateInput = typeof ReplicasCreateInput.Type;

// Output Schema
export const ReplicasCreateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
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
  properties: Schema.optional(
    Schema.Struct({
      endpoint: Schema.optional(Schema.String),
      provisioningState: Schema.optional(
        Schema.Literals([
          "Creating",
          "Succeeded",
          "Deleting",
          "Failed",
          "Canceled",
        ]),
      ),
    }),
  ),
});
export type ReplicasCreateOutput = typeof ReplicasCreateOutput.Type;

// The operation
/**
 * Creates a replica with the specified parameters.
 *
 * @param replicaName - The name of the replica.
 */
export const ReplicasCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ReplicasCreateInput,
  outputSchema: ReplicasCreateOutput,
}));
// Input Schema
export const ReplicasDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  replicaName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AppConfiguration/configurationStores/{configStoreName}/replicas/{replicaName}",
  }),
);
export type ReplicasDeleteInput = typeof ReplicasDeleteInput.Type;

// Output Schema
export const ReplicasDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ReplicasDeleteOutput = typeof ReplicasDeleteOutput.Type;

// The operation
/**
 * Deletes a replica.
 *
 * @param replicaName - The name of the replica.
 */
export const ReplicasDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ReplicasDeleteInput,
  outputSchema: ReplicasDeleteOutput,
}));
// Input Schema
export const ReplicasGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  replicaName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AppConfiguration/configurationStores/{configStoreName}/replicas/{replicaName}",
  }),
);
export type ReplicasGetInput = typeof ReplicasGetInput.Type;

// Output Schema
export const ReplicasGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
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
  properties: Schema.optional(
    Schema.Struct({
      endpoint: Schema.optional(Schema.String),
      provisioningState: Schema.optional(
        Schema.Literals([
          "Creating",
          "Succeeded",
          "Deleting",
          "Failed",
          "Canceled",
        ]),
      ),
    }),
  ),
});
export type ReplicasGetOutput = typeof ReplicasGetOutput.Type;

// The operation
/**
 * Gets the properties of the specified replica.
 *
 * @param replicaName - The name of the replica.
 */
export const ReplicasGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ReplicasGetInput,
  outputSchema: ReplicasGetOutput,
}));
// Input Schema
export const ReplicasListByConfigurationStoreInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    $skipToken: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AppConfiguration/configurationStores/{configStoreName}/replicas",
    }),
  );
export type ReplicasListByConfigurationStoreInput =
  typeof ReplicasListByConfigurationStoreInput.Type;

// Output Schema
export const ReplicasListByConfigurationStoreOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
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
          properties: Schema.optional(
            Schema.Struct({
              endpoint: Schema.optional(Schema.String),
              provisioningState: Schema.optional(
                Schema.Literals([
                  "Creating",
                  "Succeeded",
                  "Deleting",
                  "Failed",
                  "Canceled",
                ]),
              ),
            }),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ReplicasListByConfigurationStoreOutput =
  typeof ReplicasListByConfigurationStoreOutput.Type;

// The operation
/**
 * Lists the replicas for a given configuration store.
 *
 * @param $skipToken - A skip token is used to continue retrieving items after an operation returns a partial result. If a previous response contains a nextLink element, the value of the nextLink element will include a skipToken parameter that specifies a starting point to use for subsequent calls.
 */
export const ReplicasListByConfigurationStore =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReplicasListByConfigurationStoreInput,
    outputSchema: ReplicasListByConfigurationStoreOutput,
  }));
// Input Schema
export const SnapshotsCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AppConfiguration/configurationStores/{configStoreName}/snapshots/{snapshotName}",
  }),
);
export type SnapshotsCreateInput = typeof SnapshotsCreateInput.Type;

// Output Schema
export const SnapshotsCreateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  properties: Schema.optional(
    Schema.Struct({
      provisioningState: Schema.optional(
        Schema.Literals([
          "Creating",
          "Updating",
          "Deleting",
          "Succeeded",
          "Failed",
          "Canceled",
        ]),
      ),
      status: Schema.optional(
        Schema.Literals(["Provisioning", "Ready", "Archived", "Failed"]),
      ),
      filters: Schema.Array(
        Schema.Struct({
          key: Schema.String,
          label: Schema.optional(Schema.String),
        }),
      ),
      compositionType: Schema.optional(Schema.Literals(["Key", "Key_Label"])),
      created: Schema.optional(Schema.String),
      expires: Schema.optional(Schema.String),
      retentionPeriod: Schema.optional(Schema.Number),
      size: Schema.optional(Schema.Number),
      itemsCount: Schema.optional(Schema.Number),
      tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      etag: Schema.optional(Schema.String),
    }),
  ),
});
export type SnapshotsCreateOutput = typeof SnapshotsCreateOutput.Type;

// The operation
/**
 * Creates a snapshot. NOTE: This operation is intended for use in Azure Resource Manager (ARM) Template deployments. For all other scenarios involving App Configuration snapshots the data plane API should be used instead.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SnapshotsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SnapshotsCreateInput,
  outputSchema: SnapshotsCreateOutput,
}));
// Input Schema
export const SnapshotsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AppConfiguration/configurationStores/{configStoreName}/snapshots/{snapshotName}",
  }),
);
export type SnapshotsGetInput = typeof SnapshotsGetInput.Type;

// Output Schema
export const SnapshotsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  properties: Schema.optional(
    Schema.Struct({
      provisioningState: Schema.optional(
        Schema.Literals([
          "Creating",
          "Updating",
          "Deleting",
          "Succeeded",
          "Failed",
          "Canceled",
        ]),
      ),
      status: Schema.optional(
        Schema.Literals(["Provisioning", "Ready", "Archived", "Failed"]),
      ),
      filters: Schema.Array(
        Schema.Struct({
          key: Schema.String,
          label: Schema.optional(Schema.String),
        }),
      ),
      compositionType: Schema.optional(Schema.Literals(["Key", "Key_Label"])),
      created: Schema.optional(Schema.String),
      expires: Schema.optional(Schema.String),
      retentionPeriod: Schema.optional(Schema.Number),
      size: Schema.optional(Schema.Number),
      itemsCount: Schema.optional(Schema.Number),
      tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      etag: Schema.optional(Schema.String),
    }),
  ),
});
export type SnapshotsGetOutput = typeof SnapshotsGetOutput.Type;

// The operation
/**
 * Gets the properties of the specified snapshot. NOTE: This operation is intended for use in Azure Resource Manager (ARM) Template deployments. For all other scenarios involving App Configuration snapshots the data plane API should be used instead.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SnapshotsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SnapshotsGetInput,
  outputSchema: SnapshotsGetOutput,
}));
