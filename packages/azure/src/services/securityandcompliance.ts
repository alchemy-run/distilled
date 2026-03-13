/**
 * Azure Securityandcompliance API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const OperationResultsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.SecurityAndCompliance/locations/{locationName}/operationresults/{operationResultId}",
    }),
  );
export type OperationResultsGetInput = typeof OperationResultsGetInput.Type;

// Output Schema
export const OperationResultsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    status: Schema.optional(
      Schema.Literals([
        "Canceled",
        "Succeeded",
        "Failed",
        "Requested",
        "Running",
      ]),
    ),
    startTime: Schema.optional(Schema.String),
    properties: Schema.optional(Schema.Unknown),
  });
export type OperationResultsGetOutput = typeof OperationResultsGetOutput.Type;

// The operation
/**
 * Get the operation result for a long running operation.
 */
export const OperationResultsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationResultsGetInput,
  outputSchema: OperationResultsGetOutput,
}));
// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.SecurityAndCompliance/operations",
  }),
);
export type OperationsListInput = typeof OperationsListInput.Type;

// Output Schema
export const OperationsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  nextLink: Schema.optional(Schema.String),
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        name: Schema.optional(Schema.String),
        isDataAction: Schema.optional(Schema.Boolean),
        origin: Schema.optional(Schema.String),
        display: Schema.optional(
          Schema.Struct({
            provider: Schema.optional(Schema.String),
            resource: Schema.optional(Schema.String),
            operation: Schema.optional(Schema.String),
            description: Schema.optional(Schema.String),
          }),
        ),
      }),
    ),
  ),
});
export type OperationsListOutput = typeof OperationsListOutput.Type;

// The operation
/**
 * Lists all of the available SecurityAndCompliance REST API operations.
 */
export const OperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationsListInput,
  outputSchema: OperationsListOutput,
}));
// Input Schema
export const PrivateEndpointConnectionsAdtAPICreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
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
        privateEndpoint: Schema.optional(
          Schema.Struct({
            id: Schema.optional(Schema.String),
          }),
        ),
        privateLinkServiceConnectionState: Schema.Struct({
          status: Schema.optional(
            Schema.Literals(["Pending", "Approved", "Rejected"]),
          ),
          description: Schema.optional(Schema.String),
          actionsRequired: Schema.optional(Schema.String),
        }),
        provisioningState: Schema.optional(
          Schema.Literals(["Succeeded", "Creating", "Deleting", "Failed"]),
        ),
      }),
    ),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SecurityAndCompliance/privateLinkServicesForO365ManagementActivityAPI/{resourceName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type PrivateEndpointConnectionsAdtAPICreateOrUpdateInput =
  typeof PrivateEndpointConnectionsAdtAPICreateOrUpdateInput.Type;

// Output Schema
export const PrivateEndpointConnectionsAdtAPICreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type PrivateEndpointConnectionsAdtAPICreateOrUpdateOutput =
  typeof PrivateEndpointConnectionsAdtAPICreateOrUpdateOutput.Type;

// The operation
/**
 * Update the state of the specified private endpoint connection associated with the service.
 *
 * @param subscriptionId - The subscription identifier.
 * @param resourceGroupName - The name of the resource group that contains the service instance.
 * @param resourceName - The name of the service instance.
 * @param api-version - Client Api Version.
 * @param privateEndpointConnectionName - The name of the private endpoint connection associated with the Azure resource
 * @param systemData - Metadata pertaining to creation and last modification of the resource.
 * @param properties - Resource properties.
 */
export const PrivateEndpointConnectionsAdtAPICreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsAdtAPICreateOrUpdateInput,
    outputSchema: PrivateEndpointConnectionsAdtAPICreateOrUpdateOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsAdtAPIDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SecurityAndCompliance/privateLinkServicesForO365ManagementActivityAPI/{resourceName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type PrivateEndpointConnectionsAdtAPIDeleteInput =
  typeof PrivateEndpointConnectionsAdtAPIDeleteInput.Type;

// Output Schema
export const PrivateEndpointConnectionsAdtAPIDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PrivateEndpointConnectionsAdtAPIDeleteOutput =
  typeof PrivateEndpointConnectionsAdtAPIDeleteOutput.Type;

// The operation
/**
 * Deletes a private endpoint connection.
 *
 * @param subscriptionId - The subscription identifier.
 * @param resourceGroupName - The name of the resource group that contains the service instance.
 * @param resourceName - The name of the service instance.
 * @param api-version - Client Api Version.
 * @param privateEndpointConnectionName - The name of the private endpoint connection associated with the Azure resource
 */
export const PrivateEndpointConnectionsAdtAPIDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsAdtAPIDeleteInput,
    outputSchema: PrivateEndpointConnectionsAdtAPIDeleteOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsAdtAPIGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SecurityAndCompliance/privateLinkServicesForO365ManagementActivityAPI/{resourceName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type PrivateEndpointConnectionsAdtAPIGetInput =
  typeof PrivateEndpointConnectionsAdtAPIGetInput.Type;

// Output Schema
export const PrivateEndpointConnectionsAdtAPIGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type PrivateEndpointConnectionsAdtAPIGetOutput =
  typeof PrivateEndpointConnectionsAdtAPIGetOutput.Type;

// The operation
/**
 * Gets the specified private endpoint connection associated with the service.
 *
 * @param subscriptionId - The subscription identifier.
 * @param resourceGroupName - The name of the resource group that contains the service instance.
 * @param resourceName - The name of the service instance.
 * @param api-version - Client Api Version.
 * @param privateEndpointConnectionName - The name of the private endpoint connection associated with the Azure resource
 */
export const PrivateEndpointConnectionsAdtAPIGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsAdtAPIGetInput,
    outputSchema: PrivateEndpointConnectionsAdtAPIGetOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsAdtAPIListByServiceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SecurityAndCompliance/privateLinkServicesForO365ManagementActivityAPI/{resourceName}/privateEndpointConnections",
    }),
  );
export type PrivateEndpointConnectionsAdtAPIListByServiceInput =
  typeof PrivateEndpointConnectionsAdtAPIListByServiceInput.Type;

// Output Schema
export const PrivateEndpointConnectionsAdtAPIListByServiceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type PrivateEndpointConnectionsAdtAPIListByServiceOutput =
  typeof PrivateEndpointConnectionsAdtAPIListByServiceOutput.Type;

// The operation
/**
 * Lists all private endpoint connections for a service.
 *
 * @param subscriptionId - The subscription identifier.
 * @param resourceGroupName - The name of the resource group that contains the service instance.
 * @param resourceName - The name of the service instance.
 * @param api-version - Client Api Version.
 */
export const PrivateEndpointConnectionsAdtAPIListByService =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsAdtAPIListByServiceInput,
    outputSchema: PrivateEndpointConnectionsAdtAPIListByServiceOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsCompCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
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
        privateEndpoint: Schema.optional(
          Schema.Struct({
            id: Schema.optional(Schema.String),
          }),
        ),
        privateLinkServiceConnectionState: Schema.Struct({
          status: Schema.optional(
            Schema.Literals(["Pending", "Approved", "Rejected"]),
          ),
          description: Schema.optional(Schema.String),
          actionsRequired: Schema.optional(Schema.String),
        }),
        provisioningState: Schema.optional(
          Schema.Literals(["Succeeded", "Creating", "Deleting", "Failed"]),
        ),
      }),
    ),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SecurityAndCompliance/privateLinkServicesForM365ComplianceCenter/{resourceName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type PrivateEndpointConnectionsCompCreateOrUpdateInput =
  typeof PrivateEndpointConnectionsCompCreateOrUpdateInput.Type;

// Output Schema
export const PrivateEndpointConnectionsCompCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type PrivateEndpointConnectionsCompCreateOrUpdateOutput =
  typeof PrivateEndpointConnectionsCompCreateOrUpdateOutput.Type;

// The operation
/**
 * Update the state of the specified private endpoint connection associated with the service.
 *
 * @param subscriptionId - The subscription identifier.
 * @param resourceGroupName - The name of the resource group that contains the service instance.
 * @param resourceName - The name of the service instance.
 * @param api-version - Client Api Version.
 * @param privateEndpointConnectionName - The name of the private endpoint connection associated with the Azure resource
 * @param systemData - Metadata pertaining to creation and last modification of the resource.
 * @param properties - Resource properties.
 */
export const PrivateEndpointConnectionsCompCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsCompCreateOrUpdateInput,
    outputSchema: PrivateEndpointConnectionsCompCreateOrUpdateOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsCompDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SecurityAndCompliance/privateLinkServicesForM365ComplianceCenter/{resourceName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type PrivateEndpointConnectionsCompDeleteInput =
  typeof PrivateEndpointConnectionsCompDeleteInput.Type;

// Output Schema
export const PrivateEndpointConnectionsCompDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PrivateEndpointConnectionsCompDeleteOutput =
  typeof PrivateEndpointConnectionsCompDeleteOutput.Type;

// The operation
/**
 * Deletes a private endpoint connection.
 *
 * @param subscriptionId - The subscription identifier.
 * @param resourceGroupName - The name of the resource group that contains the service instance.
 * @param resourceName - The name of the service instance.
 * @param api-version - Client Api Version.
 * @param privateEndpointConnectionName - The name of the private endpoint connection associated with the Azure resource
 */
export const PrivateEndpointConnectionsCompDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsCompDeleteInput,
    outputSchema: PrivateEndpointConnectionsCompDeleteOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsCompGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SecurityAndCompliance/privateLinkServicesForM365ComplianceCenter/{resourceName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type PrivateEndpointConnectionsCompGetInput =
  typeof PrivateEndpointConnectionsCompGetInput.Type;

// Output Schema
export const PrivateEndpointConnectionsCompGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type PrivateEndpointConnectionsCompGetOutput =
  typeof PrivateEndpointConnectionsCompGetOutput.Type;

// The operation
/**
 * Gets the specified private endpoint connection associated with the service.
 *
 * @param subscriptionId - The subscription identifier.
 * @param resourceGroupName - The name of the resource group that contains the service instance.
 * @param resourceName - The name of the service instance.
 * @param api-version - Client Api Version.
 * @param privateEndpointConnectionName - The name of the private endpoint connection associated with the Azure resource
 */
export const PrivateEndpointConnectionsCompGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsCompGetInput,
    outputSchema: PrivateEndpointConnectionsCompGetOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsCompListByServiceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SecurityAndCompliance/privateLinkServicesForM365ComplianceCenter/{resourceName}/privateEndpointConnections",
    }),
  );
export type PrivateEndpointConnectionsCompListByServiceInput =
  typeof PrivateEndpointConnectionsCompListByServiceInput.Type;

// Output Schema
export const PrivateEndpointConnectionsCompListByServiceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type PrivateEndpointConnectionsCompListByServiceOutput =
  typeof PrivateEndpointConnectionsCompListByServiceOutput.Type;

// The operation
/**
 * Lists all private endpoint connections for a service.
 *
 * @param subscriptionId - The subscription identifier.
 * @param resourceGroupName - The name of the resource group that contains the service instance.
 * @param resourceName - The name of the service instance.
 * @param api-version - Client Api Version.
 */
export const PrivateEndpointConnectionsCompListByService =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsCompListByServiceInput,
    outputSchema: PrivateEndpointConnectionsCompListByServiceOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsForEDMCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
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
        privateEndpoint: Schema.optional(
          Schema.Struct({
            id: Schema.optional(Schema.String),
          }),
        ),
        privateLinkServiceConnectionState: Schema.Struct({
          status: Schema.optional(
            Schema.Literals(["Pending", "Approved", "Rejected"]),
          ),
          description: Schema.optional(Schema.String),
          actionsRequired: Schema.optional(Schema.String),
        }),
        provisioningState: Schema.optional(
          Schema.Literals(["Succeeded", "Creating", "Deleting", "Failed"]),
        ),
      }),
    ),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SecurityAndCompliance/privateLinkServicesForEDMUpload/{resourceName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type PrivateEndpointConnectionsForEDMCreateOrUpdateInput =
  typeof PrivateEndpointConnectionsForEDMCreateOrUpdateInput.Type;

// Output Schema
export const PrivateEndpointConnectionsForEDMCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type PrivateEndpointConnectionsForEDMCreateOrUpdateOutput =
  typeof PrivateEndpointConnectionsForEDMCreateOrUpdateOutput.Type;

// The operation
/**
 * Update the state of the specified private endpoint connection associated with the service.
 *
 * @param subscriptionId - The subscription identifier.
 * @param resourceGroupName - The name of the resource group that contains the service instance.
 * @param resourceName - The name of the service instance.
 * @param api-version - Client Api Version.
 * @param privateEndpointConnectionName - The name of the private endpoint connection associated with the Azure resource
 * @param systemData - Metadata pertaining to creation and last modification of the resource.
 * @param properties - Resource properties.
 */
export const PrivateEndpointConnectionsForEDMCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsForEDMCreateOrUpdateInput,
    outputSchema: PrivateEndpointConnectionsForEDMCreateOrUpdateOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsForEDMDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SecurityAndCompliance/privateLinkServicesForEDMUpload/{resourceName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type PrivateEndpointConnectionsForEDMDeleteInput =
  typeof PrivateEndpointConnectionsForEDMDeleteInput.Type;

// Output Schema
export const PrivateEndpointConnectionsForEDMDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PrivateEndpointConnectionsForEDMDeleteOutput =
  typeof PrivateEndpointConnectionsForEDMDeleteOutput.Type;

// The operation
/**
 * Deletes a private endpoint connection.
 *
 * @param subscriptionId - The subscription identifier.
 * @param resourceGroupName - The name of the resource group that contains the service instance.
 * @param resourceName - The name of the service instance.
 * @param api-version - Client Api Version.
 * @param privateEndpointConnectionName - The name of the private endpoint connection associated with the Azure resource
 */
export const PrivateEndpointConnectionsForEDMDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsForEDMDeleteInput,
    outputSchema: PrivateEndpointConnectionsForEDMDeleteOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsForEDMGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SecurityAndCompliance/privateLinkServicesForEDMUpload/{resourceName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type PrivateEndpointConnectionsForEDMGetInput =
  typeof PrivateEndpointConnectionsForEDMGetInput.Type;

// Output Schema
export const PrivateEndpointConnectionsForEDMGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type PrivateEndpointConnectionsForEDMGetOutput =
  typeof PrivateEndpointConnectionsForEDMGetOutput.Type;

// The operation
/**
 * Gets the specified private endpoint connection associated with the service.
 *
 * @param subscriptionId - The subscription identifier.
 * @param resourceGroupName - The name of the resource group that contains the service instance.
 * @param resourceName - The name of the service instance.
 * @param api-version - Client Api Version.
 * @param privateEndpointConnectionName - The name of the private endpoint connection associated with the Azure resource
 */
export const PrivateEndpointConnectionsForEDMGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsForEDMGetInput,
    outputSchema: PrivateEndpointConnectionsForEDMGetOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsForEDMListByServiceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SecurityAndCompliance/privateLinkServicesForEDMUpload/{resourceName}/privateEndpointConnections",
    }),
  );
export type PrivateEndpointConnectionsForEDMListByServiceInput =
  typeof PrivateEndpointConnectionsForEDMListByServiceInput.Type;

// Output Schema
export const PrivateEndpointConnectionsForEDMListByServiceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type PrivateEndpointConnectionsForEDMListByServiceOutput =
  typeof PrivateEndpointConnectionsForEDMListByServiceOutput.Type;

// The operation
/**
 * Lists all private endpoint connections for a service.
 *
 * @param subscriptionId - The subscription identifier.
 * @param resourceGroupName - The name of the resource group that contains the service instance.
 * @param resourceName - The name of the service instance.
 * @param api-version - Client Api Version.
 */
export const PrivateEndpointConnectionsForEDMListByService =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsForEDMListByServiceInput,
    outputSchema: PrivateEndpointConnectionsForEDMListByServiceOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsForMIPPolicySyncCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
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
        privateEndpoint: Schema.optional(
          Schema.Struct({
            id: Schema.optional(Schema.String),
          }),
        ),
        privateLinkServiceConnectionState: Schema.Struct({
          status: Schema.optional(
            Schema.Literals(["Pending", "Approved", "Rejected"]),
          ),
          description: Schema.optional(Schema.String),
          actionsRequired: Schema.optional(Schema.String),
        }),
        provisioningState: Schema.optional(
          Schema.Literals(["Succeeded", "Creating", "Deleting", "Failed"]),
        ),
      }),
    ),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SecurityAndCompliance/privateLinkServicesForMIPPolicySync/{resourceName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type PrivateEndpointConnectionsForMIPPolicySyncCreateOrUpdateInput =
  typeof PrivateEndpointConnectionsForMIPPolicySyncCreateOrUpdateInput.Type;

// Output Schema
export const PrivateEndpointConnectionsForMIPPolicySyncCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type PrivateEndpointConnectionsForMIPPolicySyncCreateOrUpdateOutput =
  typeof PrivateEndpointConnectionsForMIPPolicySyncCreateOrUpdateOutput.Type;

// The operation
/**
 * Update the state of the specified private endpoint connection associated with the service.
 *
 * @param subscriptionId - The subscription identifier.
 * @param resourceGroupName - The name of the resource group that contains the service instance.
 * @param resourceName - The name of the service instance.
 * @param api-version - Client Api Version.
 * @param privateEndpointConnectionName - The name of the private endpoint connection associated with the Azure resource
 * @param systemData - Metadata pertaining to creation and last modification of the resource.
 * @param properties - Resource properties.
 */
export const PrivateEndpointConnectionsForMIPPolicySyncCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsForMIPPolicySyncCreateOrUpdateInput,
    outputSchema:
      PrivateEndpointConnectionsForMIPPolicySyncCreateOrUpdateOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsForMIPPolicySyncDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SecurityAndCompliance/privateLinkServicesForMIPPolicySync/{resourceName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type PrivateEndpointConnectionsForMIPPolicySyncDeleteInput =
  typeof PrivateEndpointConnectionsForMIPPolicySyncDeleteInput.Type;

// Output Schema
export const PrivateEndpointConnectionsForMIPPolicySyncDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PrivateEndpointConnectionsForMIPPolicySyncDeleteOutput =
  typeof PrivateEndpointConnectionsForMIPPolicySyncDeleteOutput.Type;

// The operation
/**
 * Deletes a private endpoint connection.
 *
 * @param subscriptionId - The subscription identifier.
 * @param resourceGroupName - The name of the resource group that contains the service instance.
 * @param resourceName - The name of the service instance.
 * @param api-version - Client Api Version.
 * @param privateEndpointConnectionName - The name of the private endpoint connection associated with the Azure resource
 */
export const PrivateEndpointConnectionsForMIPPolicySyncDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsForMIPPolicySyncDeleteInput,
    outputSchema: PrivateEndpointConnectionsForMIPPolicySyncDeleteOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsForMIPPolicySyncGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SecurityAndCompliance/privateLinkServicesForMIPPolicySync/{resourceName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type PrivateEndpointConnectionsForMIPPolicySyncGetInput =
  typeof PrivateEndpointConnectionsForMIPPolicySyncGetInput.Type;

// Output Schema
export const PrivateEndpointConnectionsForMIPPolicySyncGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type PrivateEndpointConnectionsForMIPPolicySyncGetOutput =
  typeof PrivateEndpointConnectionsForMIPPolicySyncGetOutput.Type;

// The operation
/**
 * Gets the specified private endpoint connection associated with the service.
 *
 * @param subscriptionId - The subscription identifier.
 * @param resourceGroupName - The name of the resource group that contains the service instance.
 * @param resourceName - The name of the service instance.
 * @param api-version - Client Api Version.
 * @param privateEndpointConnectionName - The name of the private endpoint connection associated with the Azure resource
 */
export const PrivateEndpointConnectionsForMIPPolicySyncGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsForMIPPolicySyncGetInput,
    outputSchema: PrivateEndpointConnectionsForMIPPolicySyncGetOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsForMIPPolicySyncListByServiceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SecurityAndCompliance/privateLinkServicesForMIPPolicySync/{resourceName}/privateEndpointConnections",
    }),
  );
export type PrivateEndpointConnectionsForMIPPolicySyncListByServiceInput =
  typeof PrivateEndpointConnectionsForMIPPolicySyncListByServiceInput.Type;

// Output Schema
export const PrivateEndpointConnectionsForMIPPolicySyncListByServiceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type PrivateEndpointConnectionsForMIPPolicySyncListByServiceOutput =
  typeof PrivateEndpointConnectionsForMIPPolicySyncListByServiceOutput.Type;

// The operation
/**
 * Lists all private endpoint connections for a service.
 *
 * @param subscriptionId - The subscription identifier.
 * @param resourceGroupName - The name of the resource group that contains the service instance.
 * @param resourceName - The name of the service instance.
 * @param api-version - Client Api Version.
 */
export const PrivateEndpointConnectionsForMIPPolicySyncListByService =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsForMIPPolicySyncListByServiceInput,
    outputSchema: PrivateEndpointConnectionsForMIPPolicySyncListByServiceOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsForSCCPowershellCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
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
        privateEndpoint: Schema.optional(
          Schema.Struct({
            id: Schema.optional(Schema.String),
          }),
        ),
        privateLinkServiceConnectionState: Schema.Struct({
          status: Schema.optional(
            Schema.Literals(["Pending", "Approved", "Rejected"]),
          ),
          description: Schema.optional(Schema.String),
          actionsRequired: Schema.optional(Schema.String),
        }),
        provisioningState: Schema.optional(
          Schema.Literals(["Succeeded", "Creating", "Deleting", "Failed"]),
        ),
      }),
    ),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SecurityAndCompliance/privateLinkServicesForSCCPowershell/{resourceName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type PrivateEndpointConnectionsForSCCPowershellCreateOrUpdateInput =
  typeof PrivateEndpointConnectionsForSCCPowershellCreateOrUpdateInput.Type;

// Output Schema
export const PrivateEndpointConnectionsForSCCPowershellCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type PrivateEndpointConnectionsForSCCPowershellCreateOrUpdateOutput =
  typeof PrivateEndpointConnectionsForSCCPowershellCreateOrUpdateOutput.Type;

// The operation
/**
 * Update the state of the specified private endpoint connection associated with the service.
 *
 * @param subscriptionId - The subscription identifier.
 * @param resourceGroupName - The name of the resource group that contains the service instance.
 * @param resourceName - The name of the service instance.
 * @param api-version - Client Api Version.
 * @param privateEndpointConnectionName - The name of the private endpoint connection associated with the Azure resource
 * @param systemData - Metadata pertaining to creation and last modification of the resource.
 * @param properties - Resource properties.
 */
export const PrivateEndpointConnectionsForSCCPowershellCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsForSCCPowershellCreateOrUpdateInput,
    outputSchema:
      PrivateEndpointConnectionsForSCCPowershellCreateOrUpdateOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsForSCCPowershellDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SecurityAndCompliance/privateLinkServicesForSCCPowershell/{resourceName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type PrivateEndpointConnectionsForSCCPowershellDeleteInput =
  typeof PrivateEndpointConnectionsForSCCPowershellDeleteInput.Type;

// Output Schema
export const PrivateEndpointConnectionsForSCCPowershellDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PrivateEndpointConnectionsForSCCPowershellDeleteOutput =
  typeof PrivateEndpointConnectionsForSCCPowershellDeleteOutput.Type;

// The operation
/**
 * Deletes a private endpoint connection.
 *
 * @param subscriptionId - The subscription identifier.
 * @param resourceGroupName - The name of the resource group that contains the service instance.
 * @param resourceName - The name of the service instance.
 * @param api-version - Client Api Version.
 * @param privateEndpointConnectionName - The name of the private endpoint connection associated with the Azure resource
 */
export const PrivateEndpointConnectionsForSCCPowershellDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsForSCCPowershellDeleteInput,
    outputSchema: PrivateEndpointConnectionsForSCCPowershellDeleteOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsForSCCPowershellGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SecurityAndCompliance/privateLinkServicesForSCCPowershell/{resourceName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type PrivateEndpointConnectionsForSCCPowershellGetInput =
  typeof PrivateEndpointConnectionsForSCCPowershellGetInput.Type;

// Output Schema
export const PrivateEndpointConnectionsForSCCPowershellGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type PrivateEndpointConnectionsForSCCPowershellGetOutput =
  typeof PrivateEndpointConnectionsForSCCPowershellGetOutput.Type;

// The operation
/**
 * Gets the specified private endpoint connection associated with the service.
 *
 * @param subscriptionId - The subscription identifier.
 * @param resourceGroupName - The name of the resource group that contains the service instance.
 * @param resourceName - The name of the service instance.
 * @param api-version - Client Api Version.
 * @param privateEndpointConnectionName - The name of the private endpoint connection associated with the Azure resource
 */
export const PrivateEndpointConnectionsForSCCPowershellGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsForSCCPowershellGetInput,
    outputSchema: PrivateEndpointConnectionsForSCCPowershellGetOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsForSCCPowershellListByServiceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SecurityAndCompliance/privateLinkServicesForSCCPowershell/{resourceName}/privateEndpointConnections",
    }),
  );
export type PrivateEndpointConnectionsForSCCPowershellListByServiceInput =
  typeof PrivateEndpointConnectionsForSCCPowershellListByServiceInput.Type;

// Output Schema
export const PrivateEndpointConnectionsForSCCPowershellListByServiceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type PrivateEndpointConnectionsForSCCPowershellListByServiceOutput =
  typeof PrivateEndpointConnectionsForSCCPowershellListByServiceOutput.Type;

// The operation
/**
 * Lists all private endpoint connections for a service.
 *
 * @param subscriptionId - The subscription identifier.
 * @param resourceGroupName - The name of the resource group that contains the service instance.
 * @param resourceName - The name of the service instance.
 * @param api-version - Client Api Version.
 */
export const PrivateEndpointConnectionsForSCCPowershellListByService =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsForSCCPowershellListByServiceInput,
    outputSchema: PrivateEndpointConnectionsForSCCPowershellListByServiceOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsSecCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
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
        privateEndpoint: Schema.optional(
          Schema.Struct({
            id: Schema.optional(Schema.String),
          }),
        ),
        privateLinkServiceConnectionState: Schema.Struct({
          status: Schema.optional(
            Schema.Literals(["Pending", "Approved", "Rejected"]),
          ),
          description: Schema.optional(Schema.String),
          actionsRequired: Schema.optional(Schema.String),
        }),
        provisioningState: Schema.optional(
          Schema.Literals(["Succeeded", "Creating", "Deleting", "Failed"]),
        ),
      }),
    ),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SecurityAndCompliance/privateLinkServicesForM365SecurityCenter/{resourceName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type PrivateEndpointConnectionsSecCreateOrUpdateInput =
  typeof PrivateEndpointConnectionsSecCreateOrUpdateInput.Type;

// Output Schema
export const PrivateEndpointConnectionsSecCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type PrivateEndpointConnectionsSecCreateOrUpdateOutput =
  typeof PrivateEndpointConnectionsSecCreateOrUpdateOutput.Type;

// The operation
/**
 * Update the state of the specified private endpoint connection associated with the service.
 *
 * @param subscriptionId - The subscription identifier.
 * @param resourceGroupName - The name of the resource group that contains the service instance.
 * @param resourceName - The name of the service instance.
 * @param api-version - Client Api Version.
 * @param privateEndpointConnectionName - The name of the private endpoint connection associated with the Azure resource
 * @param systemData - Metadata pertaining to creation and last modification of the resource.
 * @param properties - Resource properties.
 */
export const PrivateEndpointConnectionsSecCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsSecCreateOrUpdateInput,
    outputSchema: PrivateEndpointConnectionsSecCreateOrUpdateOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsSecDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SecurityAndCompliance/privateLinkServicesForM365SecurityCenter/{resourceName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type PrivateEndpointConnectionsSecDeleteInput =
  typeof PrivateEndpointConnectionsSecDeleteInput.Type;

// Output Schema
export const PrivateEndpointConnectionsSecDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PrivateEndpointConnectionsSecDeleteOutput =
  typeof PrivateEndpointConnectionsSecDeleteOutput.Type;

// The operation
/**
 * Deletes a private endpoint connection.
 *
 * @param subscriptionId - The subscription identifier.
 * @param resourceGroupName - The name of the resource group that contains the service instance.
 * @param resourceName - The name of the service instance.
 * @param api-version - Client Api Version.
 * @param privateEndpointConnectionName - The name of the private endpoint connection associated with the Azure resource
 */
export const PrivateEndpointConnectionsSecDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsSecDeleteInput,
    outputSchema: PrivateEndpointConnectionsSecDeleteOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsSecGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SecurityAndCompliance/privateLinkServicesForM365SecurityCenter/{resourceName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type PrivateEndpointConnectionsSecGetInput =
  typeof PrivateEndpointConnectionsSecGetInput.Type;

// Output Schema
export const PrivateEndpointConnectionsSecGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type PrivateEndpointConnectionsSecGetOutput =
  typeof PrivateEndpointConnectionsSecGetOutput.Type;

// The operation
/**
 * Gets the specified private endpoint connection associated with the service.
 *
 * @param subscriptionId - The subscription identifier.
 * @param resourceGroupName - The name of the resource group that contains the service instance.
 * @param resourceName - The name of the service instance.
 * @param api-version - Client Api Version.
 * @param privateEndpointConnectionName - The name of the private endpoint connection associated with the Azure resource
 */
export const PrivateEndpointConnectionsSecGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsSecGetInput,
    outputSchema: PrivateEndpointConnectionsSecGetOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsSecListByServiceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SecurityAndCompliance/privateLinkServicesForM365SecurityCenter/{resourceName}/privateEndpointConnections",
    }),
  );
export type PrivateEndpointConnectionsSecListByServiceInput =
  typeof PrivateEndpointConnectionsSecListByServiceInput.Type;

// Output Schema
export const PrivateEndpointConnectionsSecListByServiceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type PrivateEndpointConnectionsSecListByServiceOutput =
  typeof PrivateEndpointConnectionsSecListByServiceOutput.Type;

// The operation
/**
 * Lists all private endpoint connections for a service.
 *
 * @param subscriptionId - The subscription identifier.
 * @param resourceGroupName - The name of the resource group that contains the service instance.
 * @param resourceName - The name of the service instance.
 * @param api-version - Client Api Version.
 */
export const PrivateEndpointConnectionsSecListByService =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsSecListByServiceInput,
    outputSchema: PrivateEndpointConnectionsSecListByServiceOutput,
  }));
// Input Schema
export const PrivateLinkResourcesAdtAPIGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    groupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SecurityAndCompliance/privateLinkServicesForO365ManagementActivityAPI/{resourceName}/privateLinkResources/{groupName}",
    }),
  );
export type PrivateLinkResourcesAdtAPIGetInput =
  typeof PrivateLinkResourcesAdtAPIGetInput.Type;

// Output Schema
export const PrivateLinkResourcesAdtAPIGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type PrivateLinkResourcesAdtAPIGetOutput =
  typeof PrivateLinkResourcesAdtAPIGetOutput.Type;

// The operation
/**
 * Gets a private link resource that need to be created for a service.
 *
 * @param subscriptionId - The subscription identifier.
 * @param resourceGroupName - The name of the resource group that contains the service instance.
 * @param resourceName - The name of the service instance.
 * @param api-version - Client Api Version.
 * @param groupName - The name of the private link resource group.
 */
export const PrivateLinkResourcesAdtAPIGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinkResourcesAdtAPIGetInput,
    outputSchema: PrivateLinkResourcesAdtAPIGetOutput,
  }));
// Input Schema
export const PrivateLinkResourcesAdtAPIListByServiceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SecurityAndCompliance/privateLinkServicesForO365ManagementActivityAPI/{resourceName}/privateLinkResources",
    }),
  );
export type PrivateLinkResourcesAdtAPIListByServiceInput =
  typeof PrivateLinkResourcesAdtAPIListByServiceInput.Type;

// Output Schema
export const PrivateLinkResourcesAdtAPIListByServiceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type PrivateLinkResourcesAdtAPIListByServiceOutput =
  typeof PrivateLinkResourcesAdtAPIListByServiceOutput.Type;

// The operation
/**
 * Gets the private link resources that need to be created for a service.
 *
 * @param subscriptionId - The subscription identifier.
 * @param resourceGroupName - The name of the resource group that contains the service instance.
 * @param resourceName - The name of the service instance.
 * @param api-version - Client Api Version.
 */
export const PrivateLinkResourcesAdtAPIListByService =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinkResourcesAdtAPIListByServiceInput,
    outputSchema: PrivateLinkResourcesAdtAPIListByServiceOutput,
  }));
// Input Schema
export const PrivateLinkResourcesCompGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    groupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SecurityAndCompliance/privateLinkServicesForM365ComplianceCenter/{resourceName}/privateLinkResources/{groupName}",
    }),
  );
export type PrivateLinkResourcesCompGetInput =
  typeof PrivateLinkResourcesCompGetInput.Type;

// Output Schema
export const PrivateLinkResourcesCompGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type PrivateLinkResourcesCompGetOutput =
  typeof PrivateLinkResourcesCompGetOutput.Type;

// The operation
/**
 * Gets a private link resource that need to be created for a service.
 *
 * @param subscriptionId - The subscription identifier.
 * @param resourceGroupName - The name of the resource group that contains the service instance.
 * @param resourceName - The name of the service instance.
 * @param api-version - Client Api Version.
 * @param groupName - The name of the private link resource group.
 */
export const PrivateLinkResourcesCompGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PrivateLinkResourcesCompGetInput,
    outputSchema: PrivateLinkResourcesCompGetOutput,
  }),
);
// Input Schema
export const PrivateLinkResourcesCompListByServiceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SecurityAndCompliance/privateLinkServicesForM365ComplianceCenter/{resourceName}/privateLinkResources",
    }),
  );
export type PrivateLinkResourcesCompListByServiceInput =
  typeof PrivateLinkResourcesCompListByServiceInput.Type;

// Output Schema
export const PrivateLinkResourcesCompListByServiceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type PrivateLinkResourcesCompListByServiceOutput =
  typeof PrivateLinkResourcesCompListByServiceOutput.Type;

// The operation
/**
 * Gets the private link resources that need to be created for a service.
 *
 * @param subscriptionId - The subscription identifier.
 * @param resourceGroupName - The name of the resource group that contains the service instance.
 * @param resourceName - The name of the service instance.
 * @param api-version - Client Api Version.
 */
export const PrivateLinkResourcesCompListByService =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinkResourcesCompListByServiceInput,
    outputSchema: PrivateLinkResourcesCompListByServiceOutput,
  }));
// Input Schema
export const PrivateLinkResourcesForMIPPolicySyncGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    groupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SecurityAndCompliance/privateLinkServicesForMIPPolicySync/{resourceName}/privateLinkResources/{groupName}",
    }),
  );
export type PrivateLinkResourcesForMIPPolicySyncGetInput =
  typeof PrivateLinkResourcesForMIPPolicySyncGetInput.Type;

// Output Schema
export const PrivateLinkResourcesForMIPPolicySyncGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type PrivateLinkResourcesForMIPPolicySyncGetOutput =
  typeof PrivateLinkResourcesForMIPPolicySyncGetOutput.Type;

// The operation
/**
 * Gets a private link resource that need to be created for a service.
 *
 * @param subscriptionId - The subscription identifier.
 * @param resourceGroupName - The name of the resource group that contains the service instance.
 * @param resourceName - The name of the service instance.
 * @param api-version - Client Api Version.
 * @param groupName - The name of the private link resource group.
 */
export const PrivateLinkResourcesForMIPPolicySyncGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinkResourcesForMIPPolicySyncGetInput,
    outputSchema: PrivateLinkResourcesForMIPPolicySyncGetOutput,
  }));
// Input Schema
export const PrivateLinkResourcesForMIPPolicySyncListByServiceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SecurityAndCompliance/privateLinkServicesForMIPPolicySync/{resourceName}/privateLinkResources",
    }),
  );
export type PrivateLinkResourcesForMIPPolicySyncListByServiceInput =
  typeof PrivateLinkResourcesForMIPPolicySyncListByServiceInput.Type;

// Output Schema
export const PrivateLinkResourcesForMIPPolicySyncListByServiceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type PrivateLinkResourcesForMIPPolicySyncListByServiceOutput =
  typeof PrivateLinkResourcesForMIPPolicySyncListByServiceOutput.Type;

// The operation
/**
 * Gets the private link resources that need to be created for a service.
 *
 * @param subscriptionId - The subscription identifier.
 * @param resourceGroupName - The name of the resource group that contains the service instance.
 * @param resourceName - The name of the service instance.
 * @param api-version - Client Api Version.
 */
export const PrivateLinkResourcesForMIPPolicySyncListByService =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinkResourcesForMIPPolicySyncListByServiceInput,
    outputSchema: PrivateLinkResourcesForMIPPolicySyncListByServiceOutput,
  }));
// Input Schema
export const PrivateLinkResourcesForSCCPowershellGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    groupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SecurityAndCompliance/privateLinkServicesForSCCPowershell/{resourceName}/privateLinkResources/{groupName}",
    }),
  );
export type PrivateLinkResourcesForSCCPowershellGetInput =
  typeof PrivateLinkResourcesForSCCPowershellGetInput.Type;

// Output Schema
export const PrivateLinkResourcesForSCCPowershellGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type PrivateLinkResourcesForSCCPowershellGetOutput =
  typeof PrivateLinkResourcesForSCCPowershellGetOutput.Type;

// The operation
/**
 * Gets a private link resource that need to be created for a service.
 *
 * @param subscriptionId - The subscription identifier.
 * @param resourceGroupName - The name of the resource group that contains the service instance.
 * @param resourceName - The name of the service instance.
 * @param api-version - Client Api Version.
 * @param groupName - The name of the private link resource group.
 */
export const PrivateLinkResourcesForSCCPowershellGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinkResourcesForSCCPowershellGetInput,
    outputSchema: PrivateLinkResourcesForSCCPowershellGetOutput,
  }));
// Input Schema
export const PrivateLinkResourcesForSCCPowershellListByServiceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SecurityAndCompliance/privateLinkServicesForSCCPowershell/{resourceName}/privateLinkResources",
    }),
  );
export type PrivateLinkResourcesForSCCPowershellListByServiceInput =
  typeof PrivateLinkResourcesForSCCPowershellListByServiceInput.Type;

// Output Schema
export const PrivateLinkResourcesForSCCPowershellListByServiceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type PrivateLinkResourcesForSCCPowershellListByServiceOutput =
  typeof PrivateLinkResourcesForSCCPowershellListByServiceOutput.Type;

// The operation
/**
 * Gets the private link resources that need to be created for a service.
 *
 * @param subscriptionId - The subscription identifier.
 * @param resourceGroupName - The name of the resource group that contains the service instance.
 * @param resourceName - The name of the service instance.
 * @param api-version - Client Api Version.
 */
export const PrivateLinkResourcesForSCCPowershellListByService =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinkResourcesForSCCPowershellListByServiceInput,
    outputSchema: PrivateLinkResourcesForSCCPowershellListByServiceOutput,
  }));
// Input Schema
export const PrivateLinkResourcesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    groupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SecurityAndCompliance/privateLinkServicesForEDMUpload/{resourceName}/privateLinkResources/{groupName}",
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
  });
export type PrivateLinkResourcesGetOutput =
  typeof PrivateLinkResourcesGetOutput.Type;

// The operation
/**
 * Gets a private link resource that need to be created for a service.
 *
 * @param subscriptionId - The subscription identifier.
 * @param resourceGroupName - The name of the resource group that contains the service instance.
 * @param resourceName - The name of the service instance.
 * @param api-version - Client Api Version.
 * @param groupName - The name of the private link resource group.
 */
export const PrivateLinkResourcesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PrivateLinkResourcesGetInput,
    outputSchema: PrivateLinkResourcesGetOutput,
  }),
);
// Input Schema
export const PrivateLinkResourcesListByServiceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SecurityAndCompliance/privateLinkServicesForEDMUpload/{resourceName}/privateLinkResources",
    }),
  );
export type PrivateLinkResourcesListByServiceInput =
  typeof PrivateLinkResourcesListByServiceInput.Type;

// Output Schema
export const PrivateLinkResourcesListByServiceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type PrivateLinkResourcesListByServiceOutput =
  typeof PrivateLinkResourcesListByServiceOutput.Type;

// The operation
/**
 * Gets the private link resources that need to be created for a service.
 *
 * @param subscriptionId - The subscription identifier.
 * @param resourceGroupName - The name of the resource group that contains the service instance.
 * @param resourceName - The name of the service instance.
 * @param api-version - Client Api Version.
 */
export const PrivateLinkResourcesListByService =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinkResourcesListByServiceInput,
    outputSchema: PrivateLinkResourcesListByServiceOutput,
  }));
// Input Schema
export const PrivateLinkResourcesSecGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    groupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SecurityAndCompliance/privateLinkServicesForM365SecurityCenter/{resourceName}/privateLinkResources/{groupName}",
    }),
  );
export type PrivateLinkResourcesSecGetInput =
  typeof PrivateLinkResourcesSecGetInput.Type;

// Output Schema
export const PrivateLinkResourcesSecGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type PrivateLinkResourcesSecGetOutput =
  typeof PrivateLinkResourcesSecGetOutput.Type;

// The operation
/**
 * Gets a private link resource that need to be created for a service.
 *
 * @param subscriptionId - The subscription identifier.
 * @param resourceGroupName - The name of the resource group that contains the service instance.
 * @param resourceName - The name of the service instance.
 * @param api-version - Client Api Version.
 * @param groupName - The name of the private link resource group.
 */
export const PrivateLinkResourcesSecGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PrivateLinkResourcesSecGetInput,
    outputSchema: PrivateLinkResourcesSecGetOutput,
  }),
);
// Input Schema
export const PrivateLinkResourcesSecListByServiceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SecurityAndCompliance/privateLinkServicesForM365SecurityCenter/{resourceName}/privateLinkResources",
    }),
  );
export type PrivateLinkResourcesSecListByServiceInput =
  typeof PrivateLinkResourcesSecListByServiceInput.Type;

// Output Schema
export const PrivateLinkResourcesSecListByServiceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type PrivateLinkResourcesSecListByServiceOutput =
  typeof PrivateLinkResourcesSecListByServiceOutput.Type;

// The operation
/**
 * Gets the private link resources that need to be created for a service.
 *
 * @param subscriptionId - The subscription identifier.
 * @param resourceGroupName - The name of the resource group that contains the service instance.
 * @param resourceName - The name of the service instance.
 * @param api-version - Client Api Version.
 */
export const PrivateLinkResourcesSecListByService =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinkResourcesSecListByServiceInput,
    outputSchema: PrivateLinkResourcesSecListByServiceOutput,
  }));
// Input Schema
export const PrivateLinkServicesForEDMUploadCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SecurityAndCompliance/privateLinkServicesForEDMUpload/{resourceName}",
    }),
  );
export type PrivateLinkServicesForEDMUploadCreateOrUpdateInput =
  typeof PrivateLinkServicesForEDMUploadCreateOrUpdateInput.Type;

// Output Schema
export const PrivateLinkServicesForEDMUploadCreateOrUpdateOutput =
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
    kind: Schema.Literals(["fhir", "fhir-Stu3", "fhir-R4"]),
    location: Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    etag: Schema.optional(Schema.String),
    identity: Schema.optional(
      Schema.Struct({
        principalId: Schema.optional(Schema.String),
        tenantId: Schema.optional(Schema.String),
        type: Schema.optional(Schema.Literals(["SystemAssigned", "None"])),
      }),
    ),
  });
export type PrivateLinkServicesForEDMUploadCreateOrUpdateOutput =
  typeof PrivateLinkServicesForEDMUploadCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update the metadata of a privateLinkServicesForEDMUpload instance.
 *
 * @param api-version - Client Api Version.
 * @param subscriptionId - The subscription identifier.
 * @param resourceGroupName - The name of the resource group that contains the service instance.
 * @param resourceName - The name of the service instance.
 */
export const privateLinkServicesForEDMUploadCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinkServicesForEDMUploadCreateOrUpdateInput,
    outputSchema: PrivateLinkServicesForEDMUploadCreateOrUpdateOutput,
  }));
// Input Schema
export const PrivateLinkServicesForEDMUploadGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SecurityAndCompliance/privateLinkServicesForEDMUpload/{resourceName}",
    }),
  );
export type PrivateLinkServicesForEDMUploadGetInput =
  typeof PrivateLinkServicesForEDMUploadGetInput.Type;

// Output Schema
export const PrivateLinkServicesForEDMUploadGetOutput =
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
    kind: Schema.Literals(["fhir", "fhir-Stu3", "fhir-R4"]),
    location: Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    etag: Schema.optional(Schema.String),
    identity: Schema.optional(
      Schema.Struct({
        principalId: Schema.optional(Schema.String),
        tenantId: Schema.optional(Schema.String),
        type: Schema.optional(Schema.Literals(["SystemAssigned", "None"])),
      }),
    ),
  });
export type PrivateLinkServicesForEDMUploadGetOutput =
  typeof PrivateLinkServicesForEDMUploadGetOutput.Type;

// The operation
/**
 * Get the metadata of a privateLinkServicesForEDMUpload resource.
 *
 * @param api-version - Client Api Version.
 * @param subscriptionId - The subscription identifier.
 * @param resourceGroupName - The name of the resource group that contains the service instance.
 * @param resourceName - The name of the service instance.
 */
export const privateLinkServicesForEDMUploadGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinkServicesForEDMUploadGetInput,
    outputSchema: PrivateLinkServicesForEDMUploadGetOutput,
  }));
// Input Schema
export const PrivateLinkServicesForEDMUploadListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.SecurityAndCompliance/privateLinkServicesForEDMUpload",
    }),
  );
export type PrivateLinkServicesForEDMUploadListInput =
  typeof PrivateLinkServicesForEDMUploadListInput.Type;

// Output Schema
export const PrivateLinkServicesForEDMUploadListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
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
          kind: Schema.Literals(["fhir", "fhir-Stu3", "fhir-R4"]),
          location: Schema.String,
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          etag: Schema.optional(Schema.String),
          identity: Schema.optional(
            Schema.Struct({
              principalId: Schema.optional(Schema.String),
              tenantId: Schema.optional(Schema.String),
              type: Schema.optional(
                Schema.Literals(["SystemAssigned", "None"]),
              ),
            }),
          ),
        }),
      ),
    ),
  });
export type PrivateLinkServicesForEDMUploadListOutput =
  typeof PrivateLinkServicesForEDMUploadListOutput.Type;

// The operation
/**
 * Get all the privateLinkServicesForEDMUpload instances in a subscription.
 *
 * @param api-version - Client Api Version.
 * @param subscriptionId - The subscription identifier.
 */
export const privateLinkServicesForEDMUploadList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinkServicesForEDMUploadListInput,
    outputSchema: PrivateLinkServicesForEDMUploadListOutput,
  }));
// Input Schema
export const PrivateLinkServicesForEDMUploadListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SecurityAndCompliance/privateLinkServicesForEDMUpload",
    }),
  );
export type PrivateLinkServicesForEDMUploadListByResourceGroupInput =
  typeof PrivateLinkServicesForEDMUploadListByResourceGroupInput.Type;

// Output Schema
export const PrivateLinkServicesForEDMUploadListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
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
          kind: Schema.Literals(["fhir", "fhir-Stu3", "fhir-R4"]),
          location: Schema.String,
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          etag: Schema.optional(Schema.String),
          identity: Schema.optional(
            Schema.Struct({
              principalId: Schema.optional(Schema.String),
              tenantId: Schema.optional(Schema.String),
              type: Schema.optional(
                Schema.Literals(["SystemAssigned", "None"]),
              ),
            }),
          ),
        }),
      ),
    ),
  });
export type PrivateLinkServicesForEDMUploadListByResourceGroupOutput =
  typeof PrivateLinkServicesForEDMUploadListByResourceGroupOutput.Type;

// The operation
/**
 * Get all the service instances in a resource group.
 *
 * @param api-version - Client Api Version.
 * @param subscriptionId - The subscription identifier.
 * @param resourceGroupName - The name of the resource group that contains the service instance.
 */
export const privateLinkServicesForEDMUploadListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinkServicesForEDMUploadListByResourceGroupInput,
    outputSchema: PrivateLinkServicesForEDMUploadListByResourceGroupOutput,
  }));
// Input Schema
export const PrivateLinkServicesForEDMUploadUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    properties: Schema.optional(
      Schema.Struct({
        publicNetworkAccess: Schema.optional(
          Schema.Literals(["Enabled", "Disabled"]),
        ),
      }),
    ),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SecurityAndCompliance/privateLinkServicesForEDMUpload/{resourceName}",
    }),
  );
export type PrivateLinkServicesForEDMUploadUpdateInput =
  typeof PrivateLinkServicesForEDMUploadUpdateInput.Type;

// Output Schema
export const PrivateLinkServicesForEDMUploadUpdateOutput =
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
    kind: Schema.Literals(["fhir", "fhir-Stu3", "fhir-R4"]),
    location: Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    etag: Schema.optional(Schema.String),
    identity: Schema.optional(
      Schema.Struct({
        principalId: Schema.optional(Schema.String),
        tenantId: Schema.optional(Schema.String),
        type: Schema.optional(Schema.Literals(["SystemAssigned", "None"])),
      }),
    ),
  });
export type PrivateLinkServicesForEDMUploadUpdateOutput =
  typeof PrivateLinkServicesForEDMUploadUpdateOutput.Type;

// The operation
/**
 * Update the metadata of a privateLinkServicesForEDMUpload instance.
 *
 * @param api-version - Client Api Version.
 * @param subscriptionId - The subscription identifier.
 * @param resourceGroupName - The name of the resource group that contains the service instance.
 * @param resourceName - The name of the service instance.
 * @param tags - Instance tags
 * @param properties - The properties for updating a service instance.
 */
export const privateLinkServicesForEDMUploadUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinkServicesForEDMUploadUpdateInput,
    outputSchema: PrivateLinkServicesForEDMUploadUpdateOutput,
  }));
// Input Schema
export const PrivateLinkServicesForM365ComplianceCenterCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SecurityAndCompliance/privateLinkServicesForM365ComplianceCenter/{resourceName}",
    }),
  );
export type PrivateLinkServicesForM365ComplianceCenterCreateOrUpdateInput =
  typeof PrivateLinkServicesForM365ComplianceCenterCreateOrUpdateInput.Type;

// Output Schema
export const PrivateLinkServicesForM365ComplianceCenterCreateOrUpdateOutput =
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
    kind: Schema.Literals(["fhir", "fhir-Stu3", "fhir-R4"]),
    location: Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    etag: Schema.optional(Schema.String),
    identity: Schema.optional(
      Schema.Struct({
        principalId: Schema.optional(Schema.String),
        tenantId: Schema.optional(Schema.String),
        type: Schema.optional(Schema.Literals(["SystemAssigned", "None"])),
      }),
    ),
  });
export type PrivateLinkServicesForM365ComplianceCenterCreateOrUpdateOutput =
  typeof PrivateLinkServicesForM365ComplianceCenterCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update the metadata of a privateLinkServicesForM365ComplianceCenter instance.
 *
 * @param api-version - Client Api Version.
 * @param subscriptionId - The subscription identifier.
 * @param resourceGroupName - The name of the resource group that contains the service instance.
 * @param resourceName - The name of the service instance.
 */
export const privateLinkServicesForM365ComplianceCenterCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinkServicesForM365ComplianceCenterCreateOrUpdateInput,
    outputSchema:
      PrivateLinkServicesForM365ComplianceCenterCreateOrUpdateOutput,
  }));
// Input Schema
export const PrivateLinkServicesForM365ComplianceCenterDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SecurityAndCompliance/privateLinkServicesForM365ComplianceCenter/{resourceName}",
    }),
  );
export type PrivateLinkServicesForM365ComplianceCenterDeleteInput =
  typeof PrivateLinkServicesForM365ComplianceCenterDeleteInput.Type;

// Output Schema
export const PrivateLinkServicesForM365ComplianceCenterDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PrivateLinkServicesForM365ComplianceCenterDeleteOutput =
  typeof PrivateLinkServicesForM365ComplianceCenterDeleteOutput.Type;

// The operation
/**
 * Delete a service instance.
 *
 * @param api-version - Client Api Version.
 * @param subscriptionId - The subscription identifier.
 * @param resourceGroupName - The name of the resource group that contains the service instance.
 * @param resourceName - The name of the service instance.
 */
export const privateLinkServicesForM365ComplianceCenterDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinkServicesForM365ComplianceCenterDeleteInput,
    outputSchema: PrivateLinkServicesForM365ComplianceCenterDeleteOutput,
  }));
// Input Schema
export const PrivateLinkServicesForM365ComplianceCenterGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SecurityAndCompliance/privateLinkServicesForM365ComplianceCenter/{resourceName}",
    }),
  );
export type PrivateLinkServicesForM365ComplianceCenterGetInput =
  typeof PrivateLinkServicesForM365ComplianceCenterGetInput.Type;

// Output Schema
export const PrivateLinkServicesForM365ComplianceCenterGetOutput =
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
    kind: Schema.Literals(["fhir", "fhir-Stu3", "fhir-R4"]),
    location: Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    etag: Schema.optional(Schema.String),
    identity: Schema.optional(
      Schema.Struct({
        principalId: Schema.optional(Schema.String),
        tenantId: Schema.optional(Schema.String),
        type: Schema.optional(Schema.Literals(["SystemAssigned", "None"])),
      }),
    ),
  });
export type PrivateLinkServicesForM365ComplianceCenterGetOutput =
  typeof PrivateLinkServicesForM365ComplianceCenterGetOutput.Type;

// The operation
/**
 * Get the metadata of a privateLinkServicesForM365ComplianceCenter resource.
 *
 * @param api-version - Client Api Version.
 * @param subscriptionId - The subscription identifier.
 * @param resourceGroupName - The name of the resource group that contains the service instance.
 * @param resourceName - The name of the service instance.
 */
export const privateLinkServicesForM365ComplianceCenterGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinkServicesForM365ComplianceCenterGetInput,
    outputSchema: PrivateLinkServicesForM365ComplianceCenterGetOutput,
  }));
// Input Schema
export const PrivateLinkServicesForM365ComplianceCenterListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.SecurityAndCompliance/privateLinkServicesForM365ComplianceCenter",
    }),
  );
export type PrivateLinkServicesForM365ComplianceCenterListInput =
  typeof PrivateLinkServicesForM365ComplianceCenterListInput.Type;

// Output Schema
export const PrivateLinkServicesForM365ComplianceCenterListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
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
          kind: Schema.Literals(["fhir", "fhir-Stu3", "fhir-R4"]),
          location: Schema.String,
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          etag: Schema.optional(Schema.String),
          identity: Schema.optional(
            Schema.Struct({
              principalId: Schema.optional(Schema.String),
              tenantId: Schema.optional(Schema.String),
              type: Schema.optional(
                Schema.Literals(["SystemAssigned", "None"]),
              ),
            }),
          ),
        }),
      ),
    ),
  });
export type PrivateLinkServicesForM365ComplianceCenterListOutput =
  typeof PrivateLinkServicesForM365ComplianceCenterListOutput.Type;

// The operation
/**
 * Get all the privateLinkServicesForM365ComplianceCenter instances in a subscription.
 *
 * @param api-version - Client Api Version.
 * @param subscriptionId - The subscription identifier.
 */
export const privateLinkServicesForM365ComplianceCenterList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinkServicesForM365ComplianceCenterListInput,
    outputSchema: PrivateLinkServicesForM365ComplianceCenterListOutput,
  }));
// Input Schema
export const PrivateLinkServicesForM365ComplianceCenterListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SecurityAndCompliance/privateLinkServicesForM365ComplianceCenter",
    }),
  );
export type PrivateLinkServicesForM365ComplianceCenterListByResourceGroupInput =
  typeof PrivateLinkServicesForM365ComplianceCenterListByResourceGroupInput.Type;

// Output Schema
export const PrivateLinkServicesForM365ComplianceCenterListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
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
          kind: Schema.Literals(["fhir", "fhir-Stu3", "fhir-R4"]),
          location: Schema.String,
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          etag: Schema.optional(Schema.String),
          identity: Schema.optional(
            Schema.Struct({
              principalId: Schema.optional(Schema.String),
              tenantId: Schema.optional(Schema.String),
              type: Schema.optional(
                Schema.Literals(["SystemAssigned", "None"]),
              ),
            }),
          ),
        }),
      ),
    ),
  });
export type PrivateLinkServicesForM365ComplianceCenterListByResourceGroupOutput =
  typeof PrivateLinkServicesForM365ComplianceCenterListByResourceGroupOutput.Type;

// The operation
/**
 * Get all the service instances in a resource group.
 *
 * @param api-version - Client Api Version.
 * @param subscriptionId - The subscription identifier.
 * @param resourceGroupName - The name of the resource group that contains the service instance.
 */
export const privateLinkServicesForM365ComplianceCenterListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      PrivateLinkServicesForM365ComplianceCenterListByResourceGroupInput,
    outputSchema:
      PrivateLinkServicesForM365ComplianceCenterListByResourceGroupOutput,
  }));
// Input Schema
export const PrivateLinkServicesForM365ComplianceCenterUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    properties: Schema.optional(
      Schema.Struct({
        publicNetworkAccess: Schema.optional(
          Schema.Literals(["Enabled", "Disabled"]),
        ),
      }),
    ),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SecurityAndCompliance/privateLinkServicesForM365ComplianceCenter/{resourceName}",
    }),
  );
export type PrivateLinkServicesForM365ComplianceCenterUpdateInput =
  typeof PrivateLinkServicesForM365ComplianceCenterUpdateInput.Type;

// Output Schema
export const PrivateLinkServicesForM365ComplianceCenterUpdateOutput =
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
    kind: Schema.Literals(["fhir", "fhir-Stu3", "fhir-R4"]),
    location: Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    etag: Schema.optional(Schema.String),
    identity: Schema.optional(
      Schema.Struct({
        principalId: Schema.optional(Schema.String),
        tenantId: Schema.optional(Schema.String),
        type: Schema.optional(Schema.Literals(["SystemAssigned", "None"])),
      }),
    ),
  });
export type PrivateLinkServicesForM365ComplianceCenterUpdateOutput =
  typeof PrivateLinkServicesForM365ComplianceCenterUpdateOutput.Type;

// The operation
/**
 * Update the metadata of a privateLinkServicesForM365ComplianceCenter instance.
 *
 * @param api-version - Client Api Version.
 * @param subscriptionId - The subscription identifier.
 * @param resourceGroupName - The name of the resource group that contains the service instance.
 * @param resourceName - The name of the service instance.
 * @param tags - Instance tags
 * @param properties - The properties for updating a service instance.
 */
export const privateLinkServicesForM365ComplianceCenterUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinkServicesForM365ComplianceCenterUpdateInput,
    outputSchema: PrivateLinkServicesForM365ComplianceCenterUpdateOutput,
  }));
// Input Schema
export const PrivateLinkServicesForM365SecurityCenterCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SecurityAndCompliance/privateLinkServicesForM365SecurityCenter/{resourceName}",
    }),
  );
export type PrivateLinkServicesForM365SecurityCenterCreateOrUpdateInput =
  typeof PrivateLinkServicesForM365SecurityCenterCreateOrUpdateInput.Type;

// Output Schema
export const PrivateLinkServicesForM365SecurityCenterCreateOrUpdateOutput =
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
    kind: Schema.Literals(["fhir", "fhir-Stu3", "fhir-R4"]),
    location: Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    etag: Schema.optional(Schema.String),
    identity: Schema.optional(
      Schema.Struct({
        principalId: Schema.optional(Schema.String),
        tenantId: Schema.optional(Schema.String),
        type: Schema.optional(Schema.Literals(["SystemAssigned", "None"])),
      }),
    ),
  });
export type PrivateLinkServicesForM365SecurityCenterCreateOrUpdateOutput =
  typeof PrivateLinkServicesForM365SecurityCenterCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update the metadata of a privateLinkServicesForM365SecurityCenter instance.
 *
 * @param api-version - Client Api Version.
 * @param subscriptionId - The subscription identifier.
 * @param resourceGroupName - The name of the resource group that contains the service instance.
 * @param resourceName - The name of the service instance.
 */
export const privateLinkServicesForM365SecurityCenterCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinkServicesForM365SecurityCenterCreateOrUpdateInput,
    outputSchema: PrivateLinkServicesForM365SecurityCenterCreateOrUpdateOutput,
  }));
// Input Schema
export const PrivateLinkServicesForM365SecurityCenterDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SecurityAndCompliance/privateLinkServicesForM365SecurityCenter/{resourceName}",
    }),
  );
export type PrivateLinkServicesForM365SecurityCenterDeleteInput =
  typeof PrivateLinkServicesForM365SecurityCenterDeleteInput.Type;

// Output Schema
export const PrivateLinkServicesForM365SecurityCenterDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PrivateLinkServicesForM365SecurityCenterDeleteOutput =
  typeof PrivateLinkServicesForM365SecurityCenterDeleteOutput.Type;

// The operation
/**
 * Delete a service instance.
 *
 * @param api-version - Client Api Version.
 * @param subscriptionId - The subscription identifier.
 * @param resourceGroupName - The name of the resource group that contains the service instance.
 * @param resourceName - The name of the service instance.
 */
export const privateLinkServicesForM365SecurityCenterDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinkServicesForM365SecurityCenterDeleteInput,
    outputSchema: PrivateLinkServicesForM365SecurityCenterDeleteOutput,
  }));
// Input Schema
export const PrivateLinkServicesForM365SecurityCenterGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SecurityAndCompliance/privateLinkServicesForM365SecurityCenter/{resourceName}",
    }),
  );
export type PrivateLinkServicesForM365SecurityCenterGetInput =
  typeof PrivateLinkServicesForM365SecurityCenterGetInput.Type;

// Output Schema
export const PrivateLinkServicesForM365SecurityCenterGetOutput =
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
    kind: Schema.Literals(["fhir", "fhir-Stu3", "fhir-R4"]),
    location: Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    etag: Schema.optional(Schema.String),
    identity: Schema.optional(
      Schema.Struct({
        principalId: Schema.optional(Schema.String),
        tenantId: Schema.optional(Schema.String),
        type: Schema.optional(Schema.Literals(["SystemAssigned", "None"])),
      }),
    ),
  });
export type PrivateLinkServicesForM365SecurityCenterGetOutput =
  typeof PrivateLinkServicesForM365SecurityCenterGetOutput.Type;

// The operation
/**
 * Get the metadata of a privateLinkServicesForM365SecurityCenter resource.
 *
 * @param api-version - Client Api Version.
 * @param subscriptionId - The subscription identifier.
 * @param resourceGroupName - The name of the resource group that contains the service instance.
 * @param resourceName - The name of the service instance.
 */
export const privateLinkServicesForM365SecurityCenterGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinkServicesForM365SecurityCenterGetInput,
    outputSchema: PrivateLinkServicesForM365SecurityCenterGetOutput,
  }));
// Input Schema
export const PrivateLinkServicesForM365SecurityCenterListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.SecurityAndCompliance/privateLinkServicesForM365SecurityCenter",
    }),
  );
export type PrivateLinkServicesForM365SecurityCenterListInput =
  typeof PrivateLinkServicesForM365SecurityCenterListInput.Type;

// Output Schema
export const PrivateLinkServicesForM365SecurityCenterListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
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
          kind: Schema.Literals(["fhir", "fhir-Stu3", "fhir-R4"]),
          location: Schema.String,
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          etag: Schema.optional(Schema.String),
          identity: Schema.optional(
            Schema.Struct({
              principalId: Schema.optional(Schema.String),
              tenantId: Schema.optional(Schema.String),
              type: Schema.optional(
                Schema.Literals(["SystemAssigned", "None"]),
              ),
            }),
          ),
        }),
      ),
    ),
  });
export type PrivateLinkServicesForM365SecurityCenterListOutput =
  typeof PrivateLinkServicesForM365SecurityCenterListOutput.Type;

// The operation
/**
 * Get all the privateLinkServicesForM365SecurityCenter instances in a subscription.
 *
 * @param api-version - Client Api Version.
 * @param subscriptionId - The subscription identifier.
 */
export const privateLinkServicesForM365SecurityCenterList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinkServicesForM365SecurityCenterListInput,
    outputSchema: PrivateLinkServicesForM365SecurityCenterListOutput,
  }));
// Input Schema
export const PrivateLinkServicesForM365SecurityCenterListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SecurityAndCompliance/privateLinkServicesForM365SecurityCenter",
    }),
  );
export type PrivateLinkServicesForM365SecurityCenterListByResourceGroupInput =
  typeof PrivateLinkServicesForM365SecurityCenterListByResourceGroupInput.Type;

// Output Schema
export const PrivateLinkServicesForM365SecurityCenterListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
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
          kind: Schema.Literals(["fhir", "fhir-Stu3", "fhir-R4"]),
          location: Schema.String,
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          etag: Schema.optional(Schema.String),
          identity: Schema.optional(
            Schema.Struct({
              principalId: Schema.optional(Schema.String),
              tenantId: Schema.optional(Schema.String),
              type: Schema.optional(
                Schema.Literals(["SystemAssigned", "None"]),
              ),
            }),
          ),
        }),
      ),
    ),
  });
export type PrivateLinkServicesForM365SecurityCenterListByResourceGroupOutput =
  typeof PrivateLinkServicesForM365SecurityCenterListByResourceGroupOutput.Type;

// The operation
/**
 * Get all the service instances in a resource group.
 *
 * @param api-version - Client Api Version.
 * @param subscriptionId - The subscription identifier.
 * @param resourceGroupName - The name of the resource group that contains the service instance.
 */
export const privateLinkServicesForM365SecurityCenterListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      PrivateLinkServicesForM365SecurityCenterListByResourceGroupInput,
    outputSchema:
      PrivateLinkServicesForM365SecurityCenterListByResourceGroupOutput,
  }));
// Input Schema
export const PrivateLinkServicesForM365SecurityCenterUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    properties: Schema.optional(
      Schema.Struct({
        publicNetworkAccess: Schema.optional(
          Schema.Literals(["Enabled", "Disabled"]),
        ),
      }),
    ),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SecurityAndCompliance/privateLinkServicesForM365SecurityCenter/{resourceName}",
    }),
  );
export type PrivateLinkServicesForM365SecurityCenterUpdateInput =
  typeof PrivateLinkServicesForM365SecurityCenterUpdateInput.Type;

// Output Schema
export const PrivateLinkServicesForM365SecurityCenterUpdateOutput =
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
    kind: Schema.Literals(["fhir", "fhir-Stu3", "fhir-R4"]),
    location: Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    etag: Schema.optional(Schema.String),
    identity: Schema.optional(
      Schema.Struct({
        principalId: Schema.optional(Schema.String),
        tenantId: Schema.optional(Schema.String),
        type: Schema.optional(Schema.Literals(["SystemAssigned", "None"])),
      }),
    ),
  });
export type PrivateLinkServicesForM365SecurityCenterUpdateOutput =
  typeof PrivateLinkServicesForM365SecurityCenterUpdateOutput.Type;

// The operation
/**
 * Update the metadata of a privateLinkServicesForM365SecurityCenter instance.
 *
 * @param api-version - Client Api Version.
 * @param subscriptionId - The subscription identifier.
 * @param resourceGroupName - The name of the resource group that contains the service instance.
 * @param resourceName - The name of the service instance.
 * @param tags - Instance tags
 * @param properties - The properties for updating a service instance.
 */
export const privateLinkServicesForM365SecurityCenterUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinkServicesForM365SecurityCenterUpdateInput,
    outputSchema: PrivateLinkServicesForM365SecurityCenterUpdateOutput,
  }));
// Input Schema
export const PrivateLinkServicesForMIPPolicySyncCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SecurityAndCompliance/privateLinkServicesForMIPPolicySync/{resourceName}",
    }),
  );
export type PrivateLinkServicesForMIPPolicySyncCreateOrUpdateInput =
  typeof PrivateLinkServicesForMIPPolicySyncCreateOrUpdateInput.Type;

// Output Schema
export const PrivateLinkServicesForMIPPolicySyncCreateOrUpdateOutput =
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
    kind: Schema.Literals(["fhir", "fhir-Stu3", "fhir-R4"]),
    location: Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    etag: Schema.optional(Schema.String),
    identity: Schema.optional(
      Schema.Struct({
        principalId: Schema.optional(Schema.String),
        tenantId: Schema.optional(Schema.String),
        type: Schema.optional(Schema.Literals(["SystemAssigned", "None"])),
      }),
    ),
  });
export type PrivateLinkServicesForMIPPolicySyncCreateOrUpdateOutput =
  typeof PrivateLinkServicesForMIPPolicySyncCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update the metadata of a privateLinkServicesForMIPPolicySync instance.
 *
 * @param api-version - Client Api Version.
 * @param subscriptionId - The subscription identifier.
 * @param resourceGroupName - The name of the resource group that contains the service instance.
 * @param resourceName - The name of the service instance.
 */
export const privateLinkServicesForMIPPolicySyncCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinkServicesForMIPPolicySyncCreateOrUpdateInput,
    outputSchema: PrivateLinkServicesForMIPPolicySyncCreateOrUpdateOutput,
  }));
// Input Schema
export const PrivateLinkServicesForMIPPolicySyncDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SecurityAndCompliance/privateLinkServicesForMIPPolicySync/{resourceName}",
    }),
  );
export type PrivateLinkServicesForMIPPolicySyncDeleteInput =
  typeof PrivateLinkServicesForMIPPolicySyncDeleteInput.Type;

// Output Schema
export const PrivateLinkServicesForMIPPolicySyncDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PrivateLinkServicesForMIPPolicySyncDeleteOutput =
  typeof PrivateLinkServicesForMIPPolicySyncDeleteOutput.Type;

// The operation
/**
 * Delete a service instance.
 *
 * @param api-version - Client Api Version.
 * @param subscriptionId - The subscription identifier.
 * @param resourceGroupName - The name of the resource group that contains the service instance.
 * @param resourceName - The name of the service instance.
 */
export const privateLinkServicesForMIPPolicySyncDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinkServicesForMIPPolicySyncDeleteInput,
    outputSchema: PrivateLinkServicesForMIPPolicySyncDeleteOutput,
  }));
// Input Schema
export const PrivateLinkServicesForMIPPolicySyncGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SecurityAndCompliance/privateLinkServicesForMIPPolicySync/{resourceName}",
    }),
  );
export type PrivateLinkServicesForMIPPolicySyncGetInput =
  typeof PrivateLinkServicesForMIPPolicySyncGetInput.Type;

// Output Schema
export const PrivateLinkServicesForMIPPolicySyncGetOutput =
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
    kind: Schema.Literals(["fhir", "fhir-Stu3", "fhir-R4"]),
    location: Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    etag: Schema.optional(Schema.String),
    identity: Schema.optional(
      Schema.Struct({
        principalId: Schema.optional(Schema.String),
        tenantId: Schema.optional(Schema.String),
        type: Schema.optional(Schema.Literals(["SystemAssigned", "None"])),
      }),
    ),
  });
export type PrivateLinkServicesForMIPPolicySyncGetOutput =
  typeof PrivateLinkServicesForMIPPolicySyncGetOutput.Type;

// The operation
/**
 * Get the metadata of a privateLinkServicesForMIPPolicySync resource.
 *
 * @param api-version - Client Api Version.
 * @param subscriptionId - The subscription identifier.
 * @param resourceGroupName - The name of the resource group that contains the service instance.
 * @param resourceName - The name of the service instance.
 */
export const privateLinkServicesForMIPPolicySyncGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinkServicesForMIPPolicySyncGetInput,
    outputSchema: PrivateLinkServicesForMIPPolicySyncGetOutput,
  }));
// Input Schema
export const PrivateLinkServicesForMIPPolicySyncListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.SecurityAndCompliance/privateLinkServicesForMIPPolicySync",
    }),
  );
export type PrivateLinkServicesForMIPPolicySyncListInput =
  typeof PrivateLinkServicesForMIPPolicySyncListInput.Type;

// Output Schema
export const PrivateLinkServicesForMIPPolicySyncListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
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
          kind: Schema.Literals(["fhir", "fhir-Stu3", "fhir-R4"]),
          location: Schema.String,
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          etag: Schema.optional(Schema.String),
          identity: Schema.optional(
            Schema.Struct({
              principalId: Schema.optional(Schema.String),
              tenantId: Schema.optional(Schema.String),
              type: Schema.optional(
                Schema.Literals(["SystemAssigned", "None"]),
              ),
            }),
          ),
        }),
      ),
    ),
  });
export type PrivateLinkServicesForMIPPolicySyncListOutput =
  typeof PrivateLinkServicesForMIPPolicySyncListOutput.Type;

// The operation
/**
 * Get all the privateLinkServicesForMIPPolicySync instances in a subscription.
 *
 * @param api-version - Client Api Version.
 * @param subscriptionId - The subscription identifier.
 */
export const privateLinkServicesForMIPPolicySyncList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinkServicesForMIPPolicySyncListInput,
    outputSchema: PrivateLinkServicesForMIPPolicySyncListOutput,
  }));
// Input Schema
export const PrivateLinkServicesForMIPPolicySyncListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SecurityAndCompliance/privateLinkServicesForMIPPolicySync",
    }),
  );
export type PrivateLinkServicesForMIPPolicySyncListByResourceGroupInput =
  typeof PrivateLinkServicesForMIPPolicySyncListByResourceGroupInput.Type;

// Output Schema
export const PrivateLinkServicesForMIPPolicySyncListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
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
          kind: Schema.Literals(["fhir", "fhir-Stu3", "fhir-R4"]),
          location: Schema.String,
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          etag: Schema.optional(Schema.String),
          identity: Schema.optional(
            Schema.Struct({
              principalId: Schema.optional(Schema.String),
              tenantId: Schema.optional(Schema.String),
              type: Schema.optional(
                Schema.Literals(["SystemAssigned", "None"]),
              ),
            }),
          ),
        }),
      ),
    ),
  });
export type PrivateLinkServicesForMIPPolicySyncListByResourceGroupOutput =
  typeof PrivateLinkServicesForMIPPolicySyncListByResourceGroupOutput.Type;

// The operation
/**
 * Get all the service instances in a resource group.
 *
 * @param api-version - Client Api Version.
 * @param subscriptionId - The subscription identifier.
 * @param resourceGroupName - The name of the resource group that contains the service instance.
 */
export const privateLinkServicesForMIPPolicySyncListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinkServicesForMIPPolicySyncListByResourceGroupInput,
    outputSchema: PrivateLinkServicesForMIPPolicySyncListByResourceGroupOutput,
  }));
// Input Schema
export const PrivateLinkServicesForMIPPolicySyncUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    properties: Schema.optional(
      Schema.Struct({
        publicNetworkAccess: Schema.optional(
          Schema.Literals(["Enabled", "Disabled"]),
        ),
      }),
    ),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SecurityAndCompliance/privateLinkServicesForMIPPolicySync/{resourceName}",
    }),
  );
export type PrivateLinkServicesForMIPPolicySyncUpdateInput =
  typeof PrivateLinkServicesForMIPPolicySyncUpdateInput.Type;

// Output Schema
export const PrivateLinkServicesForMIPPolicySyncUpdateOutput =
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
    kind: Schema.Literals(["fhir", "fhir-Stu3", "fhir-R4"]),
    location: Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    etag: Schema.optional(Schema.String),
    identity: Schema.optional(
      Schema.Struct({
        principalId: Schema.optional(Schema.String),
        tenantId: Schema.optional(Schema.String),
        type: Schema.optional(Schema.Literals(["SystemAssigned", "None"])),
      }),
    ),
  });
export type PrivateLinkServicesForMIPPolicySyncUpdateOutput =
  typeof PrivateLinkServicesForMIPPolicySyncUpdateOutput.Type;

// The operation
/**
 * Update the metadata of a privateLinkServicesForMIPPolicySync instance.
 *
 * @param api-version - Client Api Version.
 * @param subscriptionId - The subscription identifier.
 * @param resourceGroupName - The name of the resource group that contains the service instance.
 * @param resourceName - The name of the service instance.
 * @param tags - Instance tags
 * @param properties - The properties for updating a service instance.
 */
export const privateLinkServicesForMIPPolicySyncUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinkServicesForMIPPolicySyncUpdateInput,
    outputSchema: PrivateLinkServicesForMIPPolicySyncUpdateOutput,
  }));
// Input Schema
export const PrivateLinkServicesForO365ManagementActivityAPICreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SecurityAndCompliance/privateLinkServicesForO365ManagementActivityAPI/{resourceName}",
    }),
  );
export type PrivateLinkServicesForO365ManagementActivityAPICreateOrUpdateInput =
  typeof PrivateLinkServicesForO365ManagementActivityAPICreateOrUpdateInput.Type;

// Output Schema
export const PrivateLinkServicesForO365ManagementActivityAPICreateOrUpdateOutput =
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
    kind: Schema.Literals(["fhir", "fhir-Stu3", "fhir-R4"]),
    location: Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    etag: Schema.optional(Schema.String),
    identity: Schema.optional(
      Schema.Struct({
        principalId: Schema.optional(Schema.String),
        tenantId: Schema.optional(Schema.String),
        type: Schema.optional(Schema.Literals(["SystemAssigned", "None"])),
      }),
    ),
  });
export type PrivateLinkServicesForO365ManagementActivityAPICreateOrUpdateOutput =
  typeof PrivateLinkServicesForO365ManagementActivityAPICreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update the metadata of a privateLinkServicesForO365ManagementActivityAPI instance.
 *
 * @param api-version - Client Api Version.
 * @param subscriptionId - The subscription identifier.
 * @param resourceGroupName - The name of the resource group that contains the service instance.
 * @param resourceName - The name of the service instance.
 */
export const privateLinkServicesForO365ManagementActivityAPICreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      PrivateLinkServicesForO365ManagementActivityAPICreateOrUpdateInput,
    outputSchema:
      PrivateLinkServicesForO365ManagementActivityAPICreateOrUpdateOutput,
  }));
// Input Schema
export const PrivateLinkServicesForO365ManagementActivityAPIDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SecurityAndCompliance/privateLinkServicesForO365ManagementActivityAPI/{resourceName}",
    }),
  );
export type PrivateLinkServicesForO365ManagementActivityAPIDeleteInput =
  typeof PrivateLinkServicesForO365ManagementActivityAPIDeleteInput.Type;

// Output Schema
export const PrivateLinkServicesForO365ManagementActivityAPIDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PrivateLinkServicesForO365ManagementActivityAPIDeleteOutput =
  typeof PrivateLinkServicesForO365ManagementActivityAPIDeleteOutput.Type;

// The operation
/**
 * Delete a service instance.
 *
 * @param api-version - Client Api Version.
 * @param subscriptionId - The subscription identifier.
 * @param resourceGroupName - The name of the resource group that contains the service instance.
 * @param resourceName - The name of the service instance.
 */
export const privateLinkServicesForO365ManagementActivityAPIDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinkServicesForO365ManagementActivityAPIDeleteInput,
    outputSchema: PrivateLinkServicesForO365ManagementActivityAPIDeleteOutput,
  }));
// Input Schema
export const PrivateLinkServicesForO365ManagementActivityAPIGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SecurityAndCompliance/privateLinkServicesForO365ManagementActivityAPI/{resourceName}",
    }),
  );
export type PrivateLinkServicesForO365ManagementActivityAPIGetInput =
  typeof PrivateLinkServicesForO365ManagementActivityAPIGetInput.Type;

// Output Schema
export const PrivateLinkServicesForO365ManagementActivityAPIGetOutput =
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
    kind: Schema.Literals(["fhir", "fhir-Stu3", "fhir-R4"]),
    location: Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    etag: Schema.optional(Schema.String),
    identity: Schema.optional(
      Schema.Struct({
        principalId: Schema.optional(Schema.String),
        tenantId: Schema.optional(Schema.String),
        type: Schema.optional(Schema.Literals(["SystemAssigned", "None"])),
      }),
    ),
  });
export type PrivateLinkServicesForO365ManagementActivityAPIGetOutput =
  typeof PrivateLinkServicesForO365ManagementActivityAPIGetOutput.Type;

// The operation
/**
 * Get the metadata of a privateLinkServicesForO365ManagementActivityAPI resource.
 *
 * @param api-version - Client Api Version.
 * @param subscriptionId - The subscription identifier.
 * @param resourceGroupName - The name of the resource group that contains the service instance.
 * @param resourceName - The name of the service instance.
 */
export const privateLinkServicesForO365ManagementActivityAPIGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinkServicesForO365ManagementActivityAPIGetInput,
    outputSchema: PrivateLinkServicesForO365ManagementActivityAPIGetOutput,
  }));
// Input Schema
export const PrivateLinkServicesForO365ManagementActivityAPIListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.SecurityAndCompliance/privateLinkServicesForO365ManagementActivityAPI",
    }),
  );
export type PrivateLinkServicesForO365ManagementActivityAPIListInput =
  typeof PrivateLinkServicesForO365ManagementActivityAPIListInput.Type;

// Output Schema
export const PrivateLinkServicesForO365ManagementActivityAPIListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
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
          kind: Schema.Literals(["fhir", "fhir-Stu3", "fhir-R4"]),
          location: Schema.String,
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          etag: Schema.optional(Schema.String),
          identity: Schema.optional(
            Schema.Struct({
              principalId: Schema.optional(Schema.String),
              tenantId: Schema.optional(Schema.String),
              type: Schema.optional(
                Schema.Literals(["SystemAssigned", "None"]),
              ),
            }),
          ),
        }),
      ),
    ),
  });
export type PrivateLinkServicesForO365ManagementActivityAPIListOutput =
  typeof PrivateLinkServicesForO365ManagementActivityAPIListOutput.Type;

// The operation
/**
 * Get all the privateLinkServicesForO365ManagementActivityAPI instances in a subscription.
 *
 * @param api-version - Client Api Version.
 * @param subscriptionId - The subscription identifier.
 */
export const privateLinkServicesForO365ManagementActivityAPIList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinkServicesForO365ManagementActivityAPIListInput,
    outputSchema: PrivateLinkServicesForO365ManagementActivityAPIListOutput,
  }));
// Input Schema
export const PrivateLinkServicesForO365ManagementActivityAPIListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SecurityAndCompliance/privateLinkServicesForO365ManagementActivityAPI",
    }),
  );
export type PrivateLinkServicesForO365ManagementActivityAPIListByResourceGroupInput =
  typeof PrivateLinkServicesForO365ManagementActivityAPIListByResourceGroupInput.Type;

// Output Schema
export const PrivateLinkServicesForO365ManagementActivityAPIListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
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
          kind: Schema.Literals(["fhir", "fhir-Stu3", "fhir-R4"]),
          location: Schema.String,
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          etag: Schema.optional(Schema.String),
          identity: Schema.optional(
            Schema.Struct({
              principalId: Schema.optional(Schema.String),
              tenantId: Schema.optional(Schema.String),
              type: Schema.optional(
                Schema.Literals(["SystemAssigned", "None"]),
              ),
            }),
          ),
        }),
      ),
    ),
  });
export type PrivateLinkServicesForO365ManagementActivityAPIListByResourceGroupOutput =
  typeof PrivateLinkServicesForO365ManagementActivityAPIListByResourceGroupOutput.Type;

// The operation
/**
 * Get all the service instances in a resource group.
 *
 * @param api-version - Client Api Version.
 * @param subscriptionId - The subscription identifier.
 * @param resourceGroupName - The name of the resource group that contains the service instance.
 */
export const privateLinkServicesForO365ManagementActivityAPIListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      PrivateLinkServicesForO365ManagementActivityAPIListByResourceGroupInput,
    outputSchema:
      PrivateLinkServicesForO365ManagementActivityAPIListByResourceGroupOutput,
  }));
// Input Schema
export const PrivateLinkServicesForO365ManagementActivityAPIUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    properties: Schema.optional(
      Schema.Struct({
        publicNetworkAccess: Schema.optional(
          Schema.Literals(["Enabled", "Disabled"]),
        ),
      }),
    ),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SecurityAndCompliance/privateLinkServicesForO365ManagementActivityAPI/{resourceName}",
    }),
  );
export type PrivateLinkServicesForO365ManagementActivityAPIUpdateInput =
  typeof PrivateLinkServicesForO365ManagementActivityAPIUpdateInput.Type;

// Output Schema
export const PrivateLinkServicesForO365ManagementActivityAPIUpdateOutput =
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
    kind: Schema.Literals(["fhir", "fhir-Stu3", "fhir-R4"]),
    location: Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    etag: Schema.optional(Schema.String),
    identity: Schema.optional(
      Schema.Struct({
        principalId: Schema.optional(Schema.String),
        tenantId: Schema.optional(Schema.String),
        type: Schema.optional(Schema.Literals(["SystemAssigned", "None"])),
      }),
    ),
  });
export type PrivateLinkServicesForO365ManagementActivityAPIUpdateOutput =
  typeof PrivateLinkServicesForO365ManagementActivityAPIUpdateOutput.Type;

// The operation
/**
 * Update the metadata of a privateLinkServicesForO365ManagementActivityAPI instance.
 *
 * @param api-version - Client Api Version.
 * @param subscriptionId - The subscription identifier.
 * @param resourceGroupName - The name of the resource group that contains the service instance.
 * @param resourceName - The name of the service instance.
 * @param tags - Instance tags
 * @param properties - The properties for updating a service instance.
 */
export const privateLinkServicesForO365ManagementActivityAPIUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinkServicesForO365ManagementActivityAPIUpdateInput,
    outputSchema: PrivateLinkServicesForO365ManagementActivityAPIUpdateOutput,
  }));
// Input Schema
export const PrivateLinkServicesForSCCPowershellCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SecurityAndCompliance/privateLinkServicesForSCCPowershell/{resourceName}",
    }),
  );
export type PrivateLinkServicesForSCCPowershellCreateOrUpdateInput =
  typeof PrivateLinkServicesForSCCPowershellCreateOrUpdateInput.Type;

// Output Schema
export const PrivateLinkServicesForSCCPowershellCreateOrUpdateOutput =
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
    kind: Schema.Literals(["fhir", "fhir-Stu3", "fhir-R4"]),
    location: Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    etag: Schema.optional(Schema.String),
    identity: Schema.optional(
      Schema.Struct({
        principalId: Schema.optional(Schema.String),
        tenantId: Schema.optional(Schema.String),
        type: Schema.optional(Schema.Literals(["SystemAssigned", "None"])),
      }),
    ),
  });
export type PrivateLinkServicesForSCCPowershellCreateOrUpdateOutput =
  typeof PrivateLinkServicesForSCCPowershellCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update the metadata of a privateLinkServicesForSCCPowershell instance.
 *
 * @param api-version - Client Api Version.
 * @param subscriptionId - The subscription identifier.
 * @param resourceGroupName - The name of the resource group that contains the service instance.
 * @param resourceName - The name of the service instance.
 */
export const privateLinkServicesForSCCPowershellCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinkServicesForSCCPowershellCreateOrUpdateInput,
    outputSchema: PrivateLinkServicesForSCCPowershellCreateOrUpdateOutput,
  }));
// Input Schema
export const PrivateLinkServicesForSCCPowershellDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SecurityAndCompliance/privateLinkServicesForSCCPowershell/{resourceName}",
    }),
  );
export type PrivateLinkServicesForSCCPowershellDeleteInput =
  typeof PrivateLinkServicesForSCCPowershellDeleteInput.Type;

// Output Schema
export const PrivateLinkServicesForSCCPowershellDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PrivateLinkServicesForSCCPowershellDeleteOutput =
  typeof PrivateLinkServicesForSCCPowershellDeleteOutput.Type;

// The operation
/**
 * Delete a service instance.
 *
 * @param api-version - Client Api Version.
 * @param subscriptionId - The subscription identifier.
 * @param resourceGroupName - The name of the resource group that contains the service instance.
 * @param resourceName - The name of the service instance.
 */
export const privateLinkServicesForSCCPowershellDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinkServicesForSCCPowershellDeleteInput,
    outputSchema: PrivateLinkServicesForSCCPowershellDeleteOutput,
  }));
// Input Schema
export const PrivateLinkServicesForSCCPowershellGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SecurityAndCompliance/privateLinkServicesForSCCPowershell/{resourceName}",
    }),
  );
export type PrivateLinkServicesForSCCPowershellGetInput =
  typeof PrivateLinkServicesForSCCPowershellGetInput.Type;

// Output Schema
export const PrivateLinkServicesForSCCPowershellGetOutput =
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
    kind: Schema.Literals(["fhir", "fhir-Stu3", "fhir-R4"]),
    location: Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    etag: Schema.optional(Schema.String),
    identity: Schema.optional(
      Schema.Struct({
        principalId: Schema.optional(Schema.String),
        tenantId: Schema.optional(Schema.String),
        type: Schema.optional(Schema.Literals(["SystemAssigned", "None"])),
      }),
    ),
  });
export type PrivateLinkServicesForSCCPowershellGetOutput =
  typeof PrivateLinkServicesForSCCPowershellGetOutput.Type;

// The operation
/**
 * Get the metadata of a privateLinkServicesForSCCPowershell resource.
 *
 * @param api-version - Client Api Version.
 * @param subscriptionId - The subscription identifier.
 * @param resourceGroupName - The name of the resource group that contains the service instance.
 * @param resourceName - The name of the service instance.
 */
export const privateLinkServicesForSCCPowershellGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinkServicesForSCCPowershellGetInput,
    outputSchema: PrivateLinkServicesForSCCPowershellGetOutput,
  }));
// Input Schema
export const PrivateLinkServicesForSCCPowershellListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.SecurityAndCompliance/privateLinkServicesForSCCPowershell",
    }),
  );
export type PrivateLinkServicesForSCCPowershellListInput =
  typeof PrivateLinkServicesForSCCPowershellListInput.Type;

// Output Schema
export const PrivateLinkServicesForSCCPowershellListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
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
          kind: Schema.Literals(["fhir", "fhir-Stu3", "fhir-R4"]),
          location: Schema.String,
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          etag: Schema.optional(Schema.String),
          identity: Schema.optional(
            Schema.Struct({
              principalId: Schema.optional(Schema.String),
              tenantId: Schema.optional(Schema.String),
              type: Schema.optional(
                Schema.Literals(["SystemAssigned", "None"]),
              ),
            }),
          ),
        }),
      ),
    ),
  });
export type PrivateLinkServicesForSCCPowershellListOutput =
  typeof PrivateLinkServicesForSCCPowershellListOutput.Type;

// The operation
/**
 * Get all the privateLinkServicesForSCCPowershell instances in a subscription.
 *
 * @param api-version - Client Api Version.
 * @param subscriptionId - The subscription identifier.
 */
export const privateLinkServicesForSCCPowershellList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinkServicesForSCCPowershellListInput,
    outputSchema: PrivateLinkServicesForSCCPowershellListOutput,
  }));
// Input Schema
export const PrivateLinkServicesForSCCPowershellListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SecurityAndCompliance/privateLinkServicesForSCCPowershell",
    }),
  );
export type PrivateLinkServicesForSCCPowershellListByResourceGroupInput =
  typeof PrivateLinkServicesForSCCPowershellListByResourceGroupInput.Type;

// Output Schema
export const PrivateLinkServicesForSCCPowershellListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
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
          kind: Schema.Literals(["fhir", "fhir-Stu3", "fhir-R4"]),
          location: Schema.String,
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          etag: Schema.optional(Schema.String),
          identity: Schema.optional(
            Schema.Struct({
              principalId: Schema.optional(Schema.String),
              tenantId: Schema.optional(Schema.String),
              type: Schema.optional(
                Schema.Literals(["SystemAssigned", "None"]),
              ),
            }),
          ),
        }),
      ),
    ),
  });
export type PrivateLinkServicesForSCCPowershellListByResourceGroupOutput =
  typeof PrivateLinkServicesForSCCPowershellListByResourceGroupOutput.Type;

// The operation
/**
 * Get all the service instances in a resource group.
 *
 * @param api-version - Client Api Version.
 * @param subscriptionId - The subscription identifier.
 * @param resourceGroupName - The name of the resource group that contains the service instance.
 */
export const privateLinkServicesForSCCPowershellListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinkServicesForSCCPowershellListByResourceGroupInput,
    outputSchema: PrivateLinkServicesForSCCPowershellListByResourceGroupOutput,
  }));
// Input Schema
export const PrivateLinkServicesForSCCPowershellUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    properties: Schema.optional(
      Schema.Struct({
        publicNetworkAccess: Schema.optional(
          Schema.Literals(["Enabled", "Disabled"]),
        ),
      }),
    ),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SecurityAndCompliance/privateLinkServicesForSCCPowershell/{resourceName}",
    }),
  );
export type PrivateLinkServicesForSCCPowershellUpdateInput =
  typeof PrivateLinkServicesForSCCPowershellUpdateInput.Type;

// Output Schema
export const PrivateLinkServicesForSCCPowershellUpdateOutput =
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
    kind: Schema.Literals(["fhir", "fhir-Stu3", "fhir-R4"]),
    location: Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    etag: Schema.optional(Schema.String),
    identity: Schema.optional(
      Schema.Struct({
        principalId: Schema.optional(Schema.String),
        tenantId: Schema.optional(Schema.String),
        type: Schema.optional(Schema.Literals(["SystemAssigned", "None"])),
      }),
    ),
  });
export type PrivateLinkServicesForSCCPowershellUpdateOutput =
  typeof PrivateLinkServicesForSCCPowershellUpdateOutput.Type;

// The operation
/**
 * Update the metadata of a privateLinkServicesForSCCPowershell instance.
 *
 * @param api-version - Client Api Version.
 * @param subscriptionId - The subscription identifier.
 * @param resourceGroupName - The name of the resource group that contains the service instance.
 * @param resourceName - The name of the service instance.
 * @param tags - Instance tags
 * @param properties - The properties for updating a service instance.
 */
export const privateLinkServicesForSCCPowershellUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinkServicesForSCCPowershellUpdateInput,
    outputSchema: PrivateLinkServicesForSCCPowershellUpdateOutput,
  }));
// Input Schema
export const ServicesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  resourceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SecurityAndCompliance/privateLinkServicesForEDMUpload/{resourceName}",
  }),
);
export type ServicesDeleteInput = typeof ServicesDeleteInput.Type;

// Output Schema
export const ServicesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ServicesDeleteOutput = typeof ServicesDeleteOutput.Type;

// The operation
/**
 * Delete a service instance.
 *
 * @param api-version - Client Api Version.
 * @param subscriptionId - The subscription identifier.
 * @param resourceGroupName - The name of the resource group that contains the service instance.
 * @param resourceName - The name of the service instance.
 */
export const ServicesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServicesDeleteInput,
  outputSchema: ServicesDeleteOutput,
}));
