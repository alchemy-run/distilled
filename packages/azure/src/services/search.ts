/**
 * Azure Search API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const AdminKeysGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  searchServiceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Search/searchServices/{searchServiceName}/listAdminKeys",
  }),
);
export type AdminKeysGetInput = typeof AdminKeysGetInput.Type;

// Output Schema
export const AdminKeysGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  primaryKey: Schema.optional(Schema.String),
  secondaryKey: Schema.optional(Schema.String),
});
export type AdminKeysGetOutput = typeof AdminKeysGetOutput.Type;

// The operation
/**
 * Gets the primary and secondary admin API keys for the specified Azure AI Search service.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param searchServiceName - The name of the Azure AI Search service associated with the specified resource group.
 * @param x-ms-client-request-id - A client-generated GUID value that identifies this request. If specified, this will be included in response information as a way to track the request.
 */
export const AdminKeysGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AdminKeysGetInput,
  outputSchema: AdminKeysGetOutput,
}));
// Input Schema
export const AdminKeysRegenerateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    searchServiceName: Schema.String.pipe(T.PathParam()),
    keyKind: Schema.Literals(["primary", "secondary"]).pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Search/searchServices/{searchServiceName}/regenerateAdminKey/{keyKind}",
    }),
  );
export type AdminKeysRegenerateInput = typeof AdminKeysRegenerateInput.Type;

// Output Schema
export const AdminKeysRegenerateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    primaryKey: Schema.optional(Schema.String),
    secondaryKey: Schema.optional(Schema.String),
  });
export type AdminKeysRegenerateOutput = typeof AdminKeysRegenerateOutput.Type;

// The operation
/**
 * Regenerates either the primary or secondary admin API key. You can only regenerate one key at a time.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param searchServiceName - The name of the Azure AI Search service associated with the specified resource group.
 * @param keyKind - Specifies which key to regenerate. Valid values include 'primary' and 'secondary'.
 * @param x-ms-client-request-id - A client-generated GUID value that identifies this request. If specified, this will be included in response information as a way to track the request.
 */
export const AdminKeysRegenerate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AdminKeysRegenerateInput,
  outputSchema: AdminKeysRegenerateOutput,
}));
// Input Schema
export const NetworkSecurityPerimeterConfigurationsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    searchServiceName: Schema.String.pipe(T.PathParam()),
    nspConfigName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Search/searchServices/{searchServiceName}/networkSecurityPerimeterConfigurations/{nspConfigName}",
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
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param searchServiceName - The name of the Azure AI Search service associated with the specified resource group.
 * @param nspConfigName - The network security perimeter configuration name.
 */
export const NetworkSecurityPerimeterConfigurationsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkSecurityPerimeterConfigurationsGetInput,
    outputSchema: NetworkSecurityPerimeterConfigurationsGetOutput,
  }));
// Input Schema
export const NetworkSecurityPerimeterConfigurationsListByServiceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    searchServiceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Search/searchServices/{searchServiceName}/networkSecurityPerimeterConfigurations",
    }),
  );
export type NetworkSecurityPerimeterConfigurationsListByServiceInput =
  typeof NetworkSecurityPerimeterConfigurationsListByServiceInput.Type;

// Output Schema
export const NetworkSecurityPerimeterConfigurationsListByServiceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type NetworkSecurityPerimeterConfigurationsListByServiceOutput =
  typeof NetworkSecurityPerimeterConfigurationsListByServiceOutput.Type;

// The operation
/**
 * Gets a list of network security perimeter configurations for a search service.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param searchServiceName - The name of the Azure AI Search service associated with the specified resource group.
 */
export const NetworkSecurityPerimeterConfigurationsListByService =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkSecurityPerimeterConfigurationsListByServiceInput,
    outputSchema: NetworkSecurityPerimeterConfigurationsListByServiceOutput,
  }));
// Input Schema
export const NetworkSecurityPerimeterConfigurationsReconcileInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    searchServiceName: Schema.String.pipe(T.PathParam()),
    nspConfigName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Search/searchServices/{searchServiceName}/networkSecurityPerimeterConfigurations/{nspConfigName}/reconcile",
    }),
  );
export type NetworkSecurityPerimeterConfigurationsReconcileInput =
  typeof NetworkSecurityPerimeterConfigurationsReconcileInput.Type;

// Output Schema
export const NetworkSecurityPerimeterConfigurationsReconcileOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type NetworkSecurityPerimeterConfigurationsReconcileOutput =
  typeof NetworkSecurityPerimeterConfigurationsReconcileOutput.Type;

// The operation
/**
 * Reconcile network security perimeter configuration for the Azure AI Search resource provider. This triggers a manual resync with network security perimeter configurations by ensuring the search service carries the latest configuration.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param searchServiceName - The name of the Azure AI Search service associated with the specified resource group.
 * @param nspConfigName - The network security perimeter configuration name.
 */
export const NetworkSecurityPerimeterConfigurationsReconcile =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkSecurityPerimeterConfigurationsReconcileInput,
    outputSchema: NetworkSecurityPerimeterConfigurationsReconcileOutput,
  }));
// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  "api-version": Schema.String,
}).pipe(
  T.Http({ method: "GET", path: "/providers/Microsoft.Search/operations" }),
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
        origin: Schema.optional(
          Schema.Literals(["user", "system", "user,system"]),
        ),
        actionType: Schema.optional(Schema.Literals(["Internal"])),
      }),
    ),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type OperationsListOutput = typeof OperationsListOutput.Type;

// The operation
/**
 * Lists all of the available REST API operations of the Microsoft.Search provider.
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
    searchServiceName: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Search/searchServices/{searchServiceName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type PrivateEndpointConnectionsDeleteInput =
  typeof PrivateEndpointConnectionsDeleteInput.Type;

// Output Schema
export const PrivateEndpointConnectionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PrivateEndpointConnectionsDeleteOutput =
  typeof PrivateEndpointConnectionsDeleteOutput.Type;

// The operation
/**
 * Disconnects the private endpoint connection and deletes it from the search service.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param searchServiceName - The name of the Azure AI Search service associated with the specified resource group.
 * @param privateEndpointConnectionName - The name of the private endpoint connection to the Azure AI Search service with the specified resource group.
 * @param x-ms-client-request-id - A client-generated GUID value that identifies this request. If specified, this will be included in response information as a way to track the request.
 */
export const PrivateEndpointConnectionsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsDeleteInput,
    outputSchema: PrivateEndpointConnectionsDeleteOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    searchServiceName: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Search/searchServices/{searchServiceName}/privateEndpointConnections/{privateEndpointConnectionName}",
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
 * Gets the details of the private endpoint connection to the search service in the given resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param searchServiceName - The name of the Azure AI Search service associated with the specified resource group.
 * @param privateEndpointConnectionName - The name of the private endpoint connection to the Azure AI Search service with the specified resource group.
 * @param x-ms-client-request-id - A client-generated GUID value that identifies this request. If specified, this will be included in response information as a way to track the request.
 */
export const PrivateEndpointConnectionsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsGetInput,
    outputSchema: PrivateEndpointConnectionsGetOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsListByServiceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    searchServiceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Search/searchServices/{searchServiceName}/privateEndpointConnections",
    }),
  );
export type PrivateEndpointConnectionsListByServiceInput =
  typeof PrivateEndpointConnectionsListByServiceInput.Type;

// Output Schema
export const PrivateEndpointConnectionsListByServiceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type PrivateEndpointConnectionsListByServiceOutput =
  typeof PrivateEndpointConnectionsListByServiceOutput.Type;

// The operation
/**
 * Gets a list of all private endpoint connections in the given service.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param searchServiceName - The name of the Azure AI Search service associated with the specified resource group.
 * @param x-ms-client-request-id - A client-generated GUID value that identifies this request. If specified, this will be included in response information as a way to track the request.
 */
export const PrivateEndpointConnectionsListByService =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsListByServiceInput,
    outputSchema: PrivateEndpointConnectionsListByServiceOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    searchServiceName: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Search/searchServices/{searchServiceName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type PrivateEndpointConnectionsUpdateInput =
  typeof PrivateEndpointConnectionsUpdateInput.Type;

// Output Schema
export const PrivateEndpointConnectionsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PrivateEndpointConnectionsUpdateOutput =
  typeof PrivateEndpointConnectionsUpdateOutput.Type;

// The operation
/**
 * Updates a private endpoint connection to the search service in the given resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param searchServiceName - The name of the Azure AI Search service associated with the specified resource group.
 * @param privateEndpointConnectionName - The name of the private endpoint connection to the Azure AI Search service with the specified resource group.
 * @param x-ms-client-request-id - A client-generated GUID value that identifies this request. If specified, this will be included in response information as a way to track the request.
 */
export const PrivateEndpointConnectionsUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsUpdateInput,
    outputSchema: PrivateEndpointConnectionsUpdateOutput,
  }));
// Input Schema
export const QueryKeysCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  searchServiceName: Schema.String.pipe(T.PathParam()),
  name: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Search/searchServices/{searchServiceName}/createQueryKey/{name}",
  }),
);
export type QueryKeysCreateInput = typeof QueryKeysCreateInput.Type;

// Output Schema
export const QueryKeysCreateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  name: Schema.optional(Schema.String),
  key: Schema.optional(Schema.String),
});
export type QueryKeysCreateOutput = typeof QueryKeysCreateOutput.Type;

// The operation
/**
 * Generates a new query key for the specified search service. You can create up to 50 query keys per service.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param searchServiceName - The name of the Azure AI Search service associated with the specified resource group.
 * @param name - The name of the new query API key.
 * @param x-ms-client-request-id - A client-generated GUID value that identifies this request. If specified, this will be included in response information as a way to track the request.
 */
export const QueryKeysCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: QueryKeysCreateInput,
  outputSchema: QueryKeysCreateOutput,
}));
// Input Schema
export const QueryKeysDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  searchServiceName: Schema.String.pipe(T.PathParam()),
  key: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Search/searchServices/{searchServiceName}/deleteQueryKey/{key}",
  }),
);
export type QueryKeysDeleteInput = typeof QueryKeysDeleteInput.Type;

// Output Schema
export const QueryKeysDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type QueryKeysDeleteOutput = typeof QueryKeysDeleteOutput.Type;

// The operation
/**
 * Deletes the specified query key. Unlike admin keys, query keys are not regenerated. The process for regenerating a query key is to delete and then recreate it.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param searchServiceName - The name of the Azure AI Search service associated with the specified resource group.
 * @param key - The query key to be deleted. Query keys are identified by value, not by name.
 * @param x-ms-client-request-id - A client-generated GUID value that identifies this request. If specified, this will be included in response information as a way to track the request.
 */
export const QueryKeysDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: QueryKeysDeleteInput,
  outputSchema: QueryKeysDeleteOutput,
}));
// Input Schema
export const QueryKeysListBySearchServiceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    searchServiceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Search/searchServices/{searchServiceName}/listQueryKeys",
    }),
  );
export type QueryKeysListBySearchServiceInput =
  typeof QueryKeysListBySearchServiceInput.Type;

// Output Schema
export const QueryKeysListBySearchServiceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          name: Schema.optional(Schema.String),
          key: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type QueryKeysListBySearchServiceOutput =
  typeof QueryKeysListBySearchServiceOutput.Type;

// The operation
/**
 * Returns the list of query API keys for the given Azure AI Search service.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param searchServiceName - The name of the Azure AI Search service associated with the specified resource group.
 * @param x-ms-client-request-id - A client-generated GUID value that identifies this request. If specified, this will be included in response information as a way to track the request.
 */
export const QueryKeysListBySearchService =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: QueryKeysListBySearchServiceInput,
    outputSchema: QueryKeysListBySearchServiceOutput,
  }));
// Input Schema
export const ServicesCheckNameAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Search/checkNameAvailability",
    }),
  );
export type ServicesCheckNameAvailabilityInput =
  typeof ServicesCheckNameAvailabilityInput.Type;

// Output Schema
export const ServicesCheckNameAvailabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nameAvailable: Schema.optional(Schema.Boolean),
    reason: Schema.optional(Schema.Literals(["Invalid", "AlreadyExists"])),
    message: Schema.optional(Schema.String),
  });
export type ServicesCheckNameAvailabilityOutput =
  typeof ServicesCheckNameAvailabilityOutput.Type;

// The operation
/**
 * Checks whether or not the given search service name is available for use. Search service names must be globally unique since they are part of the service URI (https://<name>.search.windows.net).
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param x-ms-client-request-id - A client-generated GUID value that identifies this request. If specified, this will be included in response information as a way to track the request.
 */
export const ServicesCheckNameAvailability =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServicesCheckNameAvailabilityInput,
    outputSchema: ServicesCheckNameAvailabilityOutput,
  }));
// Input Schema
export const ServicesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    searchServiceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Search/searchServices/{searchServiceName}",
    }),
  );
export type ServicesCreateOrUpdateInput =
  typeof ServicesCreateOrUpdateInput.Type;

// Output Schema
export const ServicesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ServicesCreateOrUpdateOutput =
  typeof ServicesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a search service in the given resource group. If the search service already exists, all properties will be updated with the given values.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param searchServiceName - The name of the Azure AI Search service associated with the specified resource group.
 * @param x-ms-client-request-id - A client-generated GUID value that identifies this request. If specified, this will be included in response information as a way to track the request.
 */
export const ServicesCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ServicesCreateOrUpdateInput,
    outputSchema: ServicesCreateOrUpdateOutput,
  }),
);
// Input Schema
export const ServicesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  searchServiceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Search/searchServices/{searchServiceName}",
  }),
);
export type ServicesDeleteInput = typeof ServicesDeleteInput.Type;

// Output Schema
export const ServicesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ServicesDeleteOutput = typeof ServicesDeleteOutput.Type;

// The operation
/**
 * Deletes a search service in the given resource group, along with its associated resources.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param searchServiceName - The name of the Azure AI Search service associated with the specified resource group.
 * @param x-ms-client-request-id - A client-generated GUID value that identifies this request. If specified, this will be included in response information as a way to track the request.
 */
export const ServicesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServicesDeleteInput,
  outputSchema: ServicesDeleteOutput,
}));
// Input Schema
export const ServicesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  searchServiceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Search/searchServices/{searchServiceName}",
  }),
);
export type ServicesGetInput = typeof ServicesGetInput.Type;

// Output Schema
export const ServicesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type ServicesGetOutput = typeof ServicesGetOutput.Type;

// The operation
/**
 * Gets the search service with the given name in the given resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param searchServiceName - The name of the Azure AI Search service associated with the specified resource group.
 * @param x-ms-client-request-id - A client-generated GUID value that identifies this request. If specified, this will be included in response information as a way to track the request.
 */
export const ServicesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServicesGetInput,
  outputSchema: ServicesGetOutput,
}));
// Input Schema
export const ServicesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Search/searchServices",
    }),
  );
export type ServicesListByResourceGroupInput =
  typeof ServicesListByResourceGroupInput.Type;

// Output Schema
export const ServicesListByResourceGroupOutput =
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
export type ServicesListByResourceGroupOutput =
  typeof ServicesListByResourceGroupOutput.Type;

// The operation
/**
 * Gets a list of all Search services in the given resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param x-ms-client-request-id - A client-generated GUID value that identifies this request. If specified, this will be included in response information as a way to track the request.
 */
export const ServicesListByResourceGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ServicesListByResourceGroupInput,
    outputSchema: ServicesListByResourceGroupOutput,
  }),
);
// Input Schema
export const ServicesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Search/searchServices",
    }),
  );
export type ServicesListBySubscriptionInput =
  typeof ServicesListBySubscriptionInput.Type;

// Output Schema
export const ServicesListBySubscriptionOutput =
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
export type ServicesListBySubscriptionOutput =
  typeof ServicesListBySubscriptionOutput.Type;

// The operation
/**
 * Gets a list of all Search services in the given subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param x-ms-client-request-id - A client-generated GUID value that identifies this request. If specified, this will be included in response information as a way to track the request.
 */
export const ServicesListBySubscription = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ServicesListBySubscriptionInput,
    outputSchema: ServicesListBySubscriptionOutput,
  }),
);
// Input Schema
export const ServicesUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  searchServiceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Search/searchServices/{searchServiceName}",
  }),
);
export type ServicesUpdateInput = typeof ServicesUpdateInput.Type;

// Output Schema
export const ServicesUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type ServicesUpdateOutput = typeof ServicesUpdateOutput.Type;

// The operation
/**
 * Updates an existing search service in the given resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param searchServiceName - The name of the Azure AI Search service associated with the specified resource group.
 * @param x-ms-client-request-id - A client-generated GUID value that identifies this request. If specified, this will be included in response information as a way to track the request.
 */
export const ServicesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServicesUpdateInput,
  outputSchema: ServicesUpdateOutput,
}));
// Input Schema
export const ServicesUpgradeInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  searchServiceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Search/searchServices/{searchServiceName}/upgrade",
  }),
);
export type ServicesUpgradeInput = typeof ServicesUpgradeInput.Type;

// Output Schema
export const ServicesUpgradeOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type ServicesUpgradeOutput = typeof ServicesUpgradeOutput.Type;

// The operation
/**
 * Upgrades the Azure AI Search service to the latest version available.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param searchServiceName - The name of the Azure AI Search service associated with the specified resource group.
 */
export const ServicesUpgrade = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServicesUpgradeInput,
  outputSchema: ServicesUpgradeOutput,
}));
// Input Schema
export const SharedPrivateLinkResourcesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    searchServiceName: Schema.String.pipe(T.PathParam()),
    sharedPrivateLinkResourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Search/searchServices/{searchServiceName}/sharedPrivateLinkResources/{sharedPrivateLinkResourceName}",
    }),
  );
export type SharedPrivateLinkResourcesCreateOrUpdateInput =
  typeof SharedPrivateLinkResourcesCreateOrUpdateInput.Type;

// Output Schema
export const SharedPrivateLinkResourcesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SharedPrivateLinkResourcesCreateOrUpdateOutput =
  typeof SharedPrivateLinkResourcesCreateOrUpdateOutput.Type;

// The operation
/**
 * Initiates the creation or update of a shared private link resource managed by the search service in the given resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param searchServiceName - The name of the Azure AI Search service associated with the specified resource group.
 * @param sharedPrivateLinkResourceName - The name of the shared private link resource managed by the Azure AI Search service within the specified resource group.
 * @param x-ms-client-request-id - A client-generated GUID value that identifies this request. If specified, this will be included in response information as a way to track the request.
 */
export const SharedPrivateLinkResourcesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SharedPrivateLinkResourcesCreateOrUpdateInput,
    outputSchema: SharedPrivateLinkResourcesCreateOrUpdateOutput,
  }));
// Input Schema
export const SharedPrivateLinkResourcesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    searchServiceName: Schema.String.pipe(T.PathParam()),
    sharedPrivateLinkResourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Search/searchServices/{searchServiceName}/sharedPrivateLinkResources/{sharedPrivateLinkResourceName}",
    }),
  );
export type SharedPrivateLinkResourcesDeleteInput =
  typeof SharedPrivateLinkResourcesDeleteInput.Type;

// Output Schema
export const SharedPrivateLinkResourcesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SharedPrivateLinkResourcesDeleteOutput =
  typeof SharedPrivateLinkResourcesDeleteOutput.Type;

// The operation
/**
 * Initiates the deletion of the shared private link resource from the search service.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param searchServiceName - The name of the Azure AI Search service associated with the specified resource group.
 * @param sharedPrivateLinkResourceName - The name of the shared private link resource managed by the Azure AI Search service within the specified resource group.
 * @param x-ms-client-request-id - A client-generated GUID value that identifies this request. If specified, this will be included in response information as a way to track the request.
 */
export const SharedPrivateLinkResourcesDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SharedPrivateLinkResourcesDeleteInput,
    outputSchema: SharedPrivateLinkResourcesDeleteOutput,
  }));
// Input Schema
export const SharedPrivateLinkResourcesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    searchServiceName: Schema.String.pipe(T.PathParam()),
    sharedPrivateLinkResourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Search/searchServices/{searchServiceName}/sharedPrivateLinkResources/{sharedPrivateLinkResourceName}",
    }),
  );
export type SharedPrivateLinkResourcesGetInput =
  typeof SharedPrivateLinkResourcesGetInput.Type;

// Output Schema
export const SharedPrivateLinkResourcesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SharedPrivateLinkResourcesGetOutput =
  typeof SharedPrivateLinkResourcesGetOutput.Type;

// The operation
/**
 * Gets the details of the shared private link resource managed by the search service in the given resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param searchServiceName - The name of the Azure AI Search service associated with the specified resource group.
 * @param sharedPrivateLinkResourceName - The name of the shared private link resource managed by the Azure AI Search service within the specified resource group.
 * @param x-ms-client-request-id - A client-generated GUID value that identifies this request. If specified, this will be included in response information as a way to track the request.
 */
export const SharedPrivateLinkResourcesGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SharedPrivateLinkResourcesGetInput,
    outputSchema: SharedPrivateLinkResourcesGetOutput,
  }));
// Input Schema
export const SharedPrivateLinkResourcesListByServiceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    searchServiceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Search/searchServices/{searchServiceName}/sharedPrivateLinkResources",
    }),
  );
export type SharedPrivateLinkResourcesListByServiceInput =
  typeof SharedPrivateLinkResourcesListByServiceInput.Type;

// Output Schema
export const SharedPrivateLinkResourcesListByServiceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type SharedPrivateLinkResourcesListByServiceOutput =
  typeof SharedPrivateLinkResourcesListByServiceOutput.Type;

// The operation
/**
 * Gets a list of all shared private link resources managed by the given service.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param searchServiceName - The name of the Azure AI Search service associated with the specified resource group.
 * @param x-ms-client-request-id - A client-generated GUID value that identifies this request. If specified, this will be included in response information as a way to track the request.
 */
export const SharedPrivateLinkResourcesListByService =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SharedPrivateLinkResourcesListByServiceInput,
    outputSchema: SharedPrivateLinkResourcesListByServiceOutput,
  }));
// Input Schema
export const UsageBySubscriptionSkuInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    location: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    skuName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Search/locations/{location}/usages/{skuName}",
    }),
  );
export type UsageBySubscriptionSkuInput =
  typeof UsageBySubscriptionSkuInput.Type;

// Output Schema
export const UsageBySubscriptionSkuOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    unit: Schema.optional(Schema.String),
    currentValue: Schema.optional(Schema.Number),
    limit: Schema.optional(Schema.Number),
    name: Schema.optional(
      Schema.Struct({
        value: Schema.optional(Schema.String),
        localizedValue: Schema.optional(Schema.String),
      }),
    ),
  });
export type UsageBySubscriptionSkuOutput =
  typeof UsageBySubscriptionSkuOutput.Type;

// The operation
/**
 * Gets the quota usage for a search SKU in the given subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param x-ms-client-request-id - A client-generated GUID value that identifies this request. If specified, this will be included in response information as a way to track the request.
 * @param location - The name of the Azure region.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param skuName - The unique SKU name that identifies a billable tier.
 */
export const UsageBySubscriptionSku = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: UsageBySubscriptionSkuInput,
    outputSchema: UsageBySubscriptionSkuOutput,
  }),
);
// Input Schema
export const UsagesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Search/locations/{location}/usages",
    }),
  );
export type UsagesListBySubscriptionInput =
  typeof UsagesListBySubscriptionInput.Type;

// Output Schema
export const UsagesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          unit: Schema.optional(Schema.String),
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
export type UsagesListBySubscriptionOutput =
  typeof UsagesListBySubscriptionOutput.Type;

// The operation
/**
 * Get a list of all Azure AI Search quota usages across the subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param x-ms-client-request-id - A client-generated GUID value that identifies this request. If specified, this will be included in response information as a way to track the request.
 * @param location - The name of the Azure region.
 */
export const UsagesListBySubscription = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: UsagesListBySubscriptionInput,
    outputSchema: UsagesListBySubscriptionOutput,
  }),
);
