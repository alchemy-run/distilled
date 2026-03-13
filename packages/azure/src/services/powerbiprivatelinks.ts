/**
 * Azure Powerbiprivatelinks API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const PowerBIResourcesCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PowerBI/privateLinkServicesForPowerBI/{azureResourceName}",
    }),
  );
export type PowerBIResourcesCreateInput =
  typeof PowerBIResourcesCreateInput.Type;

// Output Schema
export const PowerBIResourcesCreateOutput =
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
    location: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        tenantId: Schema.optional(Schema.String),
        privateEndpointConnections: Schema.optional(
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
              properties: Schema.optional(
                Schema.Struct({
                  privateEndpoint: Schema.optional(
                    Schema.Struct({
                      id: Schema.optional(Schema.String),
                    }),
                  ),
                  privateLinkServiceConnectionState: Schema.optional(
                    Schema.Struct({
                      status: Schema.optional(
                        Schema.Literals([
                          "Pending",
                          "Approved",
                          "Rejected",
                          "Disconnected",
                        ]),
                      ),
                      description: Schema.optional(Schema.String),
                      actionsRequired: Schema.optional(Schema.String),
                    }),
                  ),
                  provisioningState: Schema.optional(
                    Schema.Literals([
                      "Creating",
                      "Updating",
                      "Deleting",
                      "Succeeded",
                      "Canceled",
                      "Failed",
                    ]),
                  ),
                }),
              ),
            }),
          ),
        ),
      }),
    ),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type PowerBIResourcesCreateOutput =
  typeof PowerBIResourcesCreateOutput.Type;

// The operation
/**
 * Creates or updates a Private Link Service Resource for Power BI.
 */
export const PowerBIResourcesCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PowerBIResourcesCreateInput,
    outputSchema: PowerBIResourcesCreateOutput,
  }),
);
// Input Schema
export const PowerBIResourcesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PowerBI/privateLinkServicesForPowerBI/{azureResourceName}",
    }),
  );
export type PowerBIResourcesDeleteInput =
  typeof PowerBIResourcesDeleteInput.Type;

// Output Schema
export const PowerBIResourcesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PowerBIResourcesDeleteOutput =
  typeof PowerBIResourcesDeleteOutput.Type;

// The operation
/**
 * Deletes a Private Link Service Resource for Power BI.
 */
export const PowerBIResourcesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PowerBIResourcesDeleteInput,
    outputSchema: PowerBIResourcesDeleteOutput,
  }),
);
// Input Schema
export const PowerBIResourcesListByResourceNameInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PowerBI/privateLinkServicesForPowerBI/{azureResourceName}",
    }),
  );
export type PowerBIResourcesListByResourceNameInput =
  typeof PowerBIResourcesListByResourceNameInput.Type;

// Output Schema
export const PowerBIResourcesListByResourceNameOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
    Schema.Struct({
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
      location: Schema.optional(Schema.String),
      properties: Schema.optional(
        Schema.Struct({
          tenantId: Schema.optional(Schema.String),
          privateEndpointConnections: Schema.optional(
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
                properties: Schema.optional(
                  Schema.Struct({
                    privateEndpoint: Schema.optional(
                      Schema.Struct({
                        id: Schema.optional(Schema.String),
                      }),
                    ),
                    privateLinkServiceConnectionState: Schema.optional(
                      Schema.Struct({
                        status: Schema.optional(
                          Schema.Literals([
                            "Pending",
                            "Approved",
                            "Rejected",
                            "Disconnected",
                          ]),
                        ),
                        description: Schema.optional(Schema.String),
                        actionsRequired: Schema.optional(Schema.String),
                      }),
                    ),
                    provisioningState: Schema.optional(
                      Schema.Literals([
                        "Creating",
                        "Updating",
                        "Deleting",
                        "Succeeded",
                        "Canceled",
                        "Failed",
                      ]),
                    ),
                  }),
                ),
              }),
            ),
          ),
        }),
      ),
      tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    }),
  );
export type PowerBIResourcesListByResourceNameOutput =
  typeof PowerBIResourcesListByResourceNameOutput.Type;

// The operation
/**
 * Gets all the private link resources for the given Azure resource.
 */
export const PowerBIResourcesListByResourceName =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PowerBIResourcesListByResourceNameInput,
    outputSchema: PowerBIResourcesListByResourceNameOutput,
  }));
// Input Schema
export const PowerBIResourcesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PowerBI/privateLinkServicesForPowerBI/{azureResourceName}",
    }),
  );
export type PowerBIResourcesUpdateInput =
  typeof PowerBIResourcesUpdateInput.Type;

// Output Schema
export const PowerBIResourcesUpdateOutput =
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
    location: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        tenantId: Schema.optional(Schema.String),
        privateEndpointConnections: Schema.optional(
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
              properties: Schema.optional(
                Schema.Struct({
                  privateEndpoint: Schema.optional(
                    Schema.Struct({
                      id: Schema.optional(Schema.String),
                    }),
                  ),
                  privateLinkServiceConnectionState: Schema.optional(
                    Schema.Struct({
                      status: Schema.optional(
                        Schema.Literals([
                          "Pending",
                          "Approved",
                          "Rejected",
                          "Disconnected",
                        ]),
                      ),
                      description: Schema.optional(Schema.String),
                      actionsRequired: Schema.optional(Schema.String),
                    }),
                  ),
                  provisioningState: Schema.optional(
                    Schema.Literals([
                      "Creating",
                      "Updating",
                      "Deleting",
                      "Succeeded",
                      "Canceled",
                      "Failed",
                    ]),
                  ),
                }),
              ),
            }),
          ),
        ),
      }),
    ),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type PowerBIResourcesUpdateOutput =
  typeof PowerBIResourcesUpdateOutput.Type;

// The operation
/**
 * Creates or updates a Private Link Service Resource for Power BI.
 */
export const PowerBIResourcesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PowerBIResourcesUpdateInput,
    outputSchema: PowerBIResourcesUpdateOutput,
  }),
);
// Input Schema
export const PrivateEndpointConnectionsCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PowerBI/privateLinkServicesForPowerBI/{azureResourceName}/privateEndpointConnections/{privateEndpointName}",
    }),
  );
export type PrivateEndpointConnectionsCreateInput =
  typeof PrivateEndpointConnectionsCreateInput.Type;

// Output Schema
export const PrivateEndpointConnectionsCreateOutput =
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
    properties: Schema.optional(
      Schema.Struct({
        privateEndpoint: Schema.optional(
          Schema.Struct({
            id: Schema.optional(Schema.String),
          }),
        ),
        privateLinkServiceConnectionState: Schema.optional(
          Schema.Struct({
            status: Schema.optional(
              Schema.Literals([
                "Pending",
                "Approved",
                "Rejected",
                "Disconnected",
              ]),
            ),
            description: Schema.optional(Schema.String),
            actionsRequired: Schema.optional(Schema.String),
          }),
        ),
        provisioningState: Schema.optional(
          Schema.Literals([
            "Creating",
            "Updating",
            "Deleting",
            "Succeeded",
            "Canceled",
            "Failed",
          ]),
        ),
      }),
    ),
  });
export type PrivateEndpointConnectionsCreateOutput =
  typeof PrivateEndpointConnectionsCreateOutput.Type;

// The operation
/**
 * Update a specific private endpoint connection.
 *
 * Updates the status of Private Endpoint Connection object. Used to approve or reject a connection.
 */
export const PrivateEndpointConnectionsCreate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsCreateInput,
    outputSchema: PrivateEndpointConnectionsCreateOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PowerBI/privateLinkServicesForPowerBI/{azureResourceName}/privateEndpointConnections/{privateEndpointName}",
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
 * Asynchronous API to delete a private endpoint connection for Power BI by private endpoint name.
 *
 * Deletes a private endpoint connection for Power BI by private endpoint name.
 */
export const PrivateEndpointConnectionsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsDeleteInput,
    outputSchema: PrivateEndpointConnectionsDeleteOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PowerBI/privateLinkServicesForPowerBI/{azureResourceName}/privateEndpointConnections/{privateEndpointName}",
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
        privateLinkServiceConnectionState: Schema.optional(
          Schema.Struct({
            status: Schema.optional(
              Schema.Literals([
                "Pending",
                "Approved",
                "Rejected",
                "Disconnected",
              ]),
            ),
            description: Schema.optional(Schema.String),
            actionsRequired: Schema.optional(Schema.String),
          }),
        ),
        provisioningState: Schema.optional(
          Schema.Literals([
            "Creating",
            "Updating",
            "Deleting",
            "Succeeded",
            "Canceled",
            "Failed",
          ]),
        ),
      }),
    ),
  });
export type PrivateEndpointConnectionsGetOutput =
  typeof PrivateEndpointConnectionsGetOutput.Type;

// The operation
/**
 * Get a specific private endpoint connection.
 *
 * Get a specific private endpoint connection for Power BI by private endpoint name.
 */
export const PrivateEndpointConnectionsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsGetInput,
    outputSchema: PrivateEndpointConnectionsGetOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsListByResourceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    azureResourceName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PowerBI/privateLinkServicesForPowerBI/{azureResourceName}/privateEndpointConnections",
    }),
  );
export type PrivateEndpointConnectionsListByResourceInput =
  typeof PrivateEndpointConnectionsListByResourceInput.Type;

// Output Schema
export const PrivateEndpointConnectionsListByResourceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
          properties: Schema.optional(
            Schema.Struct({
              privateEndpoint: Schema.optional(
                Schema.Struct({
                  id: Schema.optional(Schema.String),
                }),
              ),
              privateLinkServiceConnectionState: Schema.optional(
                Schema.Struct({
                  status: Schema.optional(
                    Schema.Literals([
                      "Pending",
                      "Approved",
                      "Rejected",
                      "Disconnected",
                    ]),
                  ),
                  description: Schema.optional(Schema.String),
                  actionsRequired: Schema.optional(Schema.String),
                }),
              ),
              provisioningState: Schema.optional(
                Schema.Literals([
                  "Creating",
                  "Updating",
                  "Deleting",
                  "Succeeded",
                  "Canceled",
                  "Failed",
                ]),
              ),
            }),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type PrivateEndpointConnectionsListByResourceOutput =
  typeof PrivateEndpointConnectionsListByResourceOutput.Type;

// The operation
/**
 * Lists all private endpoint connections under a resource.
 *
 * Gets private endpoint connection for Power BI.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param azureResourceName - The name of the powerbi resource.
 */
export const PrivateEndpointConnectionsListByResource =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsListByResourceInput,
    outputSchema: PrivateEndpointConnectionsListByResourceOutput,
  }));
// Input Schema
export const PrivateLinkResourcesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    privateLinkResourceName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PowerBI/privateLinkServicesForPowerBI/{azureResourceName}/privateLinkResources/{privateLinkResourceName}",
    }),
  );
export type PrivateLinkResourcesGetInput =
  typeof PrivateLinkResourcesGetInput.Type;

// Output Schema
export const PrivateLinkResourcesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    properties: Schema.optional(
      Schema.Struct({
        groupId: Schema.optional(Schema.String),
        requiredMembers: Schema.optional(Schema.Array(Schema.String)),
        requiredZoneNames: Schema.optional(Schema.Array(Schema.String)),
      }),
    ),
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type PrivateLinkResourcesGetOutput =
  typeof PrivateLinkResourcesGetOutput.Type;

// The operation
/**
 * Get a private link resource.
 *
 * Get properties of a private link resource.
 *
 * @param privateLinkResourceName - The name of private link resource.
 */
export const PrivateLinkResourcesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PrivateLinkResourcesGetInput,
    outputSchema: PrivateLinkResourcesGetOutput,
  }),
);
// Input Schema
export const PrivateLinkResourcesListByResourceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PowerBI/privateLinkServicesForPowerBI/{azureResourceName}/privateLinkResources",
    }),
  );
export type PrivateLinkResourcesListByResourceInput =
  typeof PrivateLinkResourcesListByResourceInput.Type;

// Output Schema
export const PrivateLinkResourcesListByResourceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          properties: Schema.optional(
            Schema.Struct({
              groupId: Schema.optional(Schema.String),
              requiredMembers: Schema.optional(Schema.Array(Schema.String)),
              requiredZoneNames: Schema.optional(Schema.Array(Schema.String)),
            }),
          ),
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type PrivateLinkResourcesListByResourceOutput =
  typeof PrivateLinkResourcesListByResourceOutput.Type;

// The operation
/**
 * List private link Power BI resource.
 *
 * List private link resources under a specific Power BI resource.
 */
export const PrivateLinkResourcesListByResource =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinkResourcesListByResourceInput,
    outputSchema: PrivateLinkResourcesListByResourceOutput,
  }));
// Input Schema
export const PrivateLinkServicesForPowerBIListBySubscriptionIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.PowerBI/privateLinkServicesForPowerBI",
    }),
  );
export type PrivateLinkServicesForPowerBIListBySubscriptionIdInput =
  typeof PrivateLinkServicesForPowerBIListBySubscriptionIdInput.Type;

// Output Schema
export const PrivateLinkServicesForPowerBIListBySubscriptionIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
    Schema.Struct({
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
      location: Schema.optional(Schema.String),
      properties: Schema.optional(
        Schema.Struct({
          tenantId: Schema.optional(Schema.String),
          privateEndpointConnections: Schema.optional(
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
                properties: Schema.optional(
                  Schema.Struct({
                    privateEndpoint: Schema.optional(
                      Schema.Struct({
                        id: Schema.optional(Schema.String),
                      }),
                    ),
                    privateLinkServiceConnectionState: Schema.optional(
                      Schema.Struct({
                        status: Schema.optional(
                          Schema.Literals([
                            "Pending",
                            "Approved",
                            "Rejected",
                            "Disconnected",
                          ]),
                        ),
                        description: Schema.optional(Schema.String),
                        actionsRequired: Schema.optional(Schema.String),
                      }),
                    ),
                    provisioningState: Schema.optional(
                      Schema.Literals([
                        "Creating",
                        "Updating",
                        "Deleting",
                        "Succeeded",
                        "Canceled",
                        "Failed",
                      ]),
                    ),
                  }),
                ),
              }),
            ),
          ),
        }),
      ),
      tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    }),
  );
export type PrivateLinkServicesForPowerBIListBySubscriptionIdOutput =
  typeof PrivateLinkServicesForPowerBIListBySubscriptionIdOutput.Type;

// The operation
/**
 * Gets all the private link resources for the given subscription id.
 */
export const privateLinkServicesForPowerBIListBySubscriptionId =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinkServicesForPowerBIListBySubscriptionIdInput,
    outputSchema: PrivateLinkServicesForPowerBIListBySubscriptionIdOutput,
  }));
// Input Schema
export const PrivateLinkServicesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PowerBI/privateLinkServicesForPowerBI",
    }),
  );
export type PrivateLinkServicesListByResourceGroupInput =
  typeof PrivateLinkServicesListByResourceGroupInput.Type;

// Output Schema
export const PrivateLinkServicesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
    Schema.Struct({
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
      location: Schema.optional(Schema.String),
      properties: Schema.optional(
        Schema.Struct({
          tenantId: Schema.optional(Schema.String),
          privateEndpointConnections: Schema.optional(
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
                properties: Schema.optional(
                  Schema.Struct({
                    privateEndpoint: Schema.optional(
                      Schema.Struct({
                        id: Schema.optional(Schema.String),
                      }),
                    ),
                    privateLinkServiceConnectionState: Schema.optional(
                      Schema.Struct({
                        status: Schema.optional(
                          Schema.Literals([
                            "Pending",
                            "Approved",
                            "Rejected",
                            "Disconnected",
                          ]),
                        ),
                        description: Schema.optional(Schema.String),
                        actionsRequired: Schema.optional(Schema.String),
                      }),
                    ),
                    provisioningState: Schema.optional(
                      Schema.Literals([
                        "Creating",
                        "Updating",
                        "Deleting",
                        "Succeeded",
                        "Canceled",
                        "Failed",
                      ]),
                    ),
                  }),
                ),
              }),
            ),
          ),
        }),
      ),
      tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    }),
  );
export type PrivateLinkServicesListByResourceGroupOutput =
  typeof PrivateLinkServicesListByResourceGroupOutput.Type;

// The operation
/**
 * Gets all the private link resources for the given resource group.
 */
export const PrivateLinkServicesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinkServicesListByResourceGroupInput,
    outputSchema: PrivateLinkServicesListByResourceGroupOutput,
  }));
