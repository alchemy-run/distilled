/**
 * Azure Digitaltwins API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const DigitalTwinsCheckNameAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DigitalTwins/locations/{location}/checkNameAvailability",
    }),
  );
export type DigitalTwinsCheckNameAvailabilityInput =
  typeof DigitalTwinsCheckNameAvailabilityInput.Type;

// Output Schema
export const DigitalTwinsCheckNameAvailabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nameAvailable: Schema.optional(Schema.Boolean),
    message: Schema.optional(Schema.NullOr(Schema.String)),
    reason: Schema.optional(
      Schema.NullOr(Schema.Literals(["Invalid", "AlreadyExists"])),
    ),
  });
export type DigitalTwinsCheckNameAvailabilityOutput =
  typeof DigitalTwinsCheckNameAvailabilityOutput.Type;

// The operation
/**
 * Check if a DigitalTwinsInstance name is available.
 */
export const DigitalTwinsCheckNameAvailability =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DigitalTwinsCheckNameAvailabilityInput,
    outputSchema: DigitalTwinsCheckNameAvailabilityOutput,
  }));
// Input Schema
export const DigitalTwinsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DigitalTwins/digitalTwinsInstances/{resourceName}",
    }),
  );
export type DigitalTwinsCreateOrUpdateInput =
  typeof DigitalTwinsCreateOrUpdateInput.Type;

// Output Schema
export const DigitalTwinsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.String,
    tags: Schema.optional(
      Schema.NullOr(Schema.Record(Schema.String, Schema.String)),
    ),
    identity: Schema.optional(
      Schema.Struct({
        type: Schema.optional(
          Schema.Literals([
            "None",
            "SystemAssigned",
            "UserAssigned",
            "SystemAssigned,UserAssigned",
          ]),
        ),
        principalId: Schema.optional(Schema.NullOr(Schema.String)),
        tenantId: Schema.optional(Schema.NullOr(Schema.String)),
        userAssignedIdentities: Schema.optional(
          Schema.NullOr(
            Schema.Record(
              Schema.String,
              Schema.Struct({
                clientId: Schema.optional(Schema.String),
                principalId: Schema.optional(Schema.String),
              }),
            ),
          ),
        ),
      }),
    ),
    systemData: Schema.optional(
      Schema.Struct({
        createdBy: Schema.optional(Schema.NullOr(Schema.String)),
        createdByType: Schema.optional(
          Schema.NullOr(
            Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
          ),
        ),
        createdAt: Schema.optional(Schema.NullOr(Schema.String)),
        lastModifiedBy: Schema.optional(Schema.NullOr(Schema.String)),
        lastModifiedByType: Schema.optional(
          Schema.NullOr(
            Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
          ),
        ),
        lastModifiedAt: Schema.optional(Schema.NullOr(Schema.String)),
      }),
    ),
  });
export type DigitalTwinsCreateOrUpdateOutput =
  typeof DigitalTwinsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update the metadata of a DigitalTwinsInstance. The usual pattern to modify a property is to retrieve the DigitalTwinsInstance and security metadata, and then combine them with the modified values in a new body to update the DigitalTwinsInstance.
 */
export const DigitalTwinsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DigitalTwinsCreateOrUpdateInput,
    outputSchema: DigitalTwinsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const DigitalTwinsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DigitalTwins/digitalTwinsInstances/{resourceName}",
    }),
  );
export type DigitalTwinsDeleteInput = typeof DigitalTwinsDeleteInput.Type;

// Output Schema
export const DigitalTwinsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.String,
    tags: Schema.optional(
      Schema.NullOr(Schema.Record(Schema.String, Schema.String)),
    ),
    identity: Schema.optional(
      Schema.Struct({
        type: Schema.optional(
          Schema.Literals([
            "None",
            "SystemAssigned",
            "UserAssigned",
            "SystemAssigned,UserAssigned",
          ]),
        ),
        principalId: Schema.optional(Schema.NullOr(Schema.String)),
        tenantId: Schema.optional(Schema.NullOr(Schema.String)),
        userAssignedIdentities: Schema.optional(
          Schema.NullOr(
            Schema.Record(
              Schema.String,
              Schema.Struct({
                clientId: Schema.optional(Schema.String),
                principalId: Schema.optional(Schema.String),
              }),
            ),
          ),
        ),
      }),
    ),
    systemData: Schema.optional(
      Schema.Struct({
        createdBy: Schema.optional(Schema.NullOr(Schema.String)),
        createdByType: Schema.optional(
          Schema.NullOr(
            Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
          ),
        ),
        createdAt: Schema.optional(Schema.NullOr(Schema.String)),
        lastModifiedBy: Schema.optional(Schema.NullOr(Schema.String)),
        lastModifiedByType: Schema.optional(
          Schema.NullOr(
            Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
          ),
        ),
        lastModifiedAt: Schema.optional(Schema.NullOr(Schema.String)),
      }),
    ),
  });
export type DigitalTwinsDeleteOutput = typeof DigitalTwinsDeleteOutput.Type;

// The operation
/**
 * Delete a DigitalTwinsInstance.
 */
export const DigitalTwinsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DigitalTwinsDeleteInput,
  outputSchema: DigitalTwinsDeleteOutput,
}));
// Input Schema
export const DigitalTwinsEndpointCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DigitalTwins/digitalTwinsInstances/{resourceName}/endpoints/{endpointName}",
    }),
  );
export type DigitalTwinsEndpointCreateOrUpdateInput =
  typeof DigitalTwinsEndpointCreateOrUpdateInput.Type;

// Output Schema
export const DigitalTwinsEndpointCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    systemData: Schema.optional(
      Schema.Struct({
        createdBy: Schema.optional(Schema.NullOr(Schema.String)),
        createdByType: Schema.optional(
          Schema.NullOr(
            Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
          ),
        ),
        createdAt: Schema.optional(Schema.NullOr(Schema.String)),
        lastModifiedBy: Schema.optional(Schema.NullOr(Schema.String)),
        lastModifiedByType: Schema.optional(
          Schema.NullOr(
            Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
          ),
        ),
        lastModifiedAt: Schema.optional(Schema.NullOr(Schema.String)),
      }),
    ),
  });
export type DigitalTwinsEndpointCreateOrUpdateOutput =
  typeof DigitalTwinsEndpointCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update DigitalTwinsInstance endpoint.
 */
export const DigitalTwinsEndpointCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DigitalTwinsEndpointCreateOrUpdateInput,
    outputSchema: DigitalTwinsEndpointCreateOrUpdateOutput,
  }));
// Input Schema
export const DigitalTwinsEndpointDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DigitalTwins/digitalTwinsInstances/{resourceName}/endpoints/{endpointName}",
    }),
  );
export type DigitalTwinsEndpointDeleteInput =
  typeof DigitalTwinsEndpointDeleteInput.Type;

// Output Schema
export const DigitalTwinsEndpointDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    systemData: Schema.optional(
      Schema.Struct({
        createdBy: Schema.optional(Schema.NullOr(Schema.String)),
        createdByType: Schema.optional(
          Schema.NullOr(
            Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
          ),
        ),
        createdAt: Schema.optional(Schema.NullOr(Schema.String)),
        lastModifiedBy: Schema.optional(Schema.NullOr(Schema.String)),
        lastModifiedByType: Schema.optional(
          Schema.NullOr(
            Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
          ),
        ),
        lastModifiedAt: Schema.optional(Schema.NullOr(Schema.String)),
      }),
    ),
  });
export type DigitalTwinsEndpointDeleteOutput =
  typeof DigitalTwinsEndpointDeleteOutput.Type;

// The operation
/**
 * Delete a DigitalTwinsInstance endpoint.
 */
export const DigitalTwinsEndpointDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DigitalTwinsEndpointDeleteInput,
    outputSchema: DigitalTwinsEndpointDeleteOutput,
  }),
);
// Input Schema
export const DigitalTwinsEndpointGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DigitalTwins/digitalTwinsInstances/{resourceName}/endpoints/{endpointName}",
    }),
  );
export type DigitalTwinsEndpointGetInput =
  typeof DigitalTwinsEndpointGetInput.Type;

// Output Schema
export const DigitalTwinsEndpointGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    systemData: Schema.optional(
      Schema.Struct({
        createdBy: Schema.optional(Schema.NullOr(Schema.String)),
        createdByType: Schema.optional(
          Schema.NullOr(
            Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
          ),
        ),
        createdAt: Schema.optional(Schema.NullOr(Schema.String)),
        lastModifiedBy: Schema.optional(Schema.NullOr(Schema.String)),
        lastModifiedByType: Schema.optional(
          Schema.NullOr(
            Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
          ),
        ),
        lastModifiedAt: Schema.optional(Schema.NullOr(Schema.String)),
      }),
    ),
  });
export type DigitalTwinsEndpointGetOutput =
  typeof DigitalTwinsEndpointGetOutput.Type;

// The operation
/**
 * Get DigitalTwinsInstances Endpoint.
 */
export const DigitalTwinsEndpointGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DigitalTwinsEndpointGetInput,
    outputSchema: DigitalTwinsEndpointGetOutput,
  }),
);
// Input Schema
export const DigitalTwinsEndpointListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DigitalTwins/digitalTwinsInstances/{resourceName}/endpoints",
    }),
  );
export type DigitalTwinsEndpointListInput =
  typeof DigitalTwinsEndpointListInput.Type;

// Output Schema
export const DigitalTwinsEndpointListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.NullOr(Schema.String)),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          systemData: Schema.optional(
            Schema.Struct({
              createdBy: Schema.optional(Schema.NullOr(Schema.String)),
              createdByType: Schema.optional(
                Schema.NullOr(
                  Schema.Literals([
                    "User",
                    "Application",
                    "ManagedIdentity",
                    "Key",
                  ]),
                ),
              ),
              createdAt: Schema.optional(Schema.NullOr(Schema.String)),
              lastModifiedBy: Schema.optional(Schema.NullOr(Schema.String)),
              lastModifiedByType: Schema.optional(
                Schema.NullOr(
                  Schema.Literals([
                    "User",
                    "Application",
                    "ManagedIdentity",
                    "Key",
                  ]),
                ),
              ),
              lastModifiedAt: Schema.optional(Schema.NullOr(Schema.String)),
            }),
          ),
        }),
      ),
    ),
  });
export type DigitalTwinsEndpointListOutput =
  typeof DigitalTwinsEndpointListOutput.Type;

// The operation
/**
 * Get DigitalTwinsInstance Endpoints.
 */
export const DigitalTwinsEndpointList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DigitalTwinsEndpointListInput,
    outputSchema: DigitalTwinsEndpointListOutput,
  }),
);
// Input Schema
export const DigitalTwinsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DigitalTwins/digitalTwinsInstances/{resourceName}",
  }),
);
export type DigitalTwinsGetInput = typeof DigitalTwinsGetInput.Type;

// Output Schema
export const DigitalTwinsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  location: Schema.String,
  tags: Schema.optional(
    Schema.NullOr(Schema.Record(Schema.String, Schema.String)),
  ),
  identity: Schema.optional(
    Schema.Struct({
      type: Schema.optional(
        Schema.Literals([
          "None",
          "SystemAssigned",
          "UserAssigned",
          "SystemAssigned,UserAssigned",
        ]),
      ),
      principalId: Schema.optional(Schema.NullOr(Schema.String)),
      tenantId: Schema.optional(Schema.NullOr(Schema.String)),
      userAssignedIdentities: Schema.optional(
        Schema.NullOr(
          Schema.Record(
            Schema.String,
            Schema.Struct({
              clientId: Schema.optional(Schema.String),
              principalId: Schema.optional(Schema.String),
            }),
          ),
        ),
      ),
    }),
  ),
  systemData: Schema.optional(
    Schema.Struct({
      createdBy: Schema.optional(Schema.NullOr(Schema.String)),
      createdByType: Schema.optional(
        Schema.NullOr(
          Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
        ),
      ),
      createdAt: Schema.optional(Schema.NullOr(Schema.String)),
      lastModifiedBy: Schema.optional(Schema.NullOr(Schema.String)),
      lastModifiedByType: Schema.optional(
        Schema.NullOr(
          Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
        ),
      ),
      lastModifiedAt: Schema.optional(Schema.NullOr(Schema.String)),
    }),
  ),
});
export type DigitalTwinsGetOutput = typeof DigitalTwinsGetOutput.Type;

// The operation
/**
 * Get DigitalTwinsInstances resource.
 */
export const DigitalTwinsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DigitalTwinsGetInput,
  outputSchema: DigitalTwinsGetOutput,
}));
// Input Schema
export const DigitalTwinsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.DigitalTwins/digitalTwinsInstances",
  }),
);
export type DigitalTwinsListInput = typeof DigitalTwinsListInput.Type;

// Output Schema
export const DigitalTwinsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    nextLink: Schema.optional(Schema.NullOr(Schema.String)),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.String,
          tags: Schema.optional(
            Schema.NullOr(Schema.Record(Schema.String, Schema.String)),
          ),
          identity: Schema.optional(
            Schema.Struct({
              type: Schema.optional(
                Schema.Literals([
                  "None",
                  "SystemAssigned",
                  "UserAssigned",
                  "SystemAssigned,UserAssigned",
                ]),
              ),
              principalId: Schema.optional(Schema.NullOr(Schema.String)),
              tenantId: Schema.optional(Schema.NullOr(Schema.String)),
              userAssignedIdentities: Schema.optional(
                Schema.NullOr(
                  Schema.Record(
                    Schema.String,
                    Schema.Struct({
                      clientId: Schema.optional(Schema.String),
                      principalId: Schema.optional(Schema.String),
                    }),
                  ),
                ),
              ),
            }),
          ),
          systemData: Schema.optional(
            Schema.Struct({
              createdBy: Schema.optional(Schema.NullOr(Schema.String)),
              createdByType: Schema.optional(
                Schema.NullOr(
                  Schema.Literals([
                    "User",
                    "Application",
                    "ManagedIdentity",
                    "Key",
                  ]),
                ),
              ),
              createdAt: Schema.optional(Schema.NullOr(Schema.String)),
              lastModifiedBy: Schema.optional(Schema.NullOr(Schema.String)),
              lastModifiedByType: Schema.optional(
                Schema.NullOr(
                  Schema.Literals([
                    "User",
                    "Application",
                    "ManagedIdentity",
                    "Key",
                  ]),
                ),
              ),
              lastModifiedAt: Schema.optional(Schema.NullOr(Schema.String)),
            }),
          ),
        }),
      ),
    ),
  },
);
export type DigitalTwinsListOutput = typeof DigitalTwinsListOutput.Type;

// The operation
/**
 * Get all the DigitalTwinsInstances in a subscription.
 */
export const DigitalTwinsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DigitalTwinsListInput,
  outputSchema: DigitalTwinsListOutput,
}));
// Input Schema
export const DigitalTwinsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DigitalTwins/digitalTwinsInstances",
    }),
  );
export type DigitalTwinsListByResourceGroupInput =
  typeof DigitalTwinsListByResourceGroupInput.Type;

// Output Schema
export const DigitalTwinsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.NullOr(Schema.String)),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.String,
          tags: Schema.optional(
            Schema.NullOr(Schema.Record(Schema.String, Schema.String)),
          ),
          identity: Schema.optional(
            Schema.Struct({
              type: Schema.optional(
                Schema.Literals([
                  "None",
                  "SystemAssigned",
                  "UserAssigned",
                  "SystemAssigned,UserAssigned",
                ]),
              ),
              principalId: Schema.optional(Schema.NullOr(Schema.String)),
              tenantId: Schema.optional(Schema.NullOr(Schema.String)),
              userAssignedIdentities: Schema.optional(
                Schema.NullOr(
                  Schema.Record(
                    Schema.String,
                    Schema.Struct({
                      clientId: Schema.optional(Schema.String),
                      principalId: Schema.optional(Schema.String),
                    }),
                  ),
                ),
              ),
            }),
          ),
          systemData: Schema.optional(
            Schema.Struct({
              createdBy: Schema.optional(Schema.NullOr(Schema.String)),
              createdByType: Schema.optional(
                Schema.NullOr(
                  Schema.Literals([
                    "User",
                    "Application",
                    "ManagedIdentity",
                    "Key",
                  ]),
                ),
              ),
              createdAt: Schema.optional(Schema.NullOr(Schema.String)),
              lastModifiedBy: Schema.optional(Schema.NullOr(Schema.String)),
              lastModifiedByType: Schema.optional(
                Schema.NullOr(
                  Schema.Literals([
                    "User",
                    "Application",
                    "ManagedIdentity",
                    "Key",
                  ]),
                ),
              ),
              lastModifiedAt: Schema.optional(Schema.NullOr(Schema.String)),
            }),
          ),
        }),
      ),
    ),
  });
export type DigitalTwinsListByResourceGroupOutput =
  typeof DigitalTwinsListByResourceGroupOutput.Type;

// The operation
/**
 * Get all the DigitalTwinsInstances in a resource group.
 */
export const DigitalTwinsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DigitalTwinsListByResourceGroupInput,
    outputSchema: DigitalTwinsListByResourceGroupOutput,
  }));
// Input Schema
export const DigitalTwinsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DigitalTwins/digitalTwinsInstances/{resourceName}",
    }),
  );
export type DigitalTwinsUpdateInput = typeof DigitalTwinsUpdateInput.Type;

// Output Schema
export const DigitalTwinsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.String,
    tags: Schema.optional(
      Schema.NullOr(Schema.Record(Schema.String, Schema.String)),
    ),
    identity: Schema.optional(
      Schema.Struct({
        type: Schema.optional(
          Schema.Literals([
            "None",
            "SystemAssigned",
            "UserAssigned",
            "SystemAssigned,UserAssigned",
          ]),
        ),
        principalId: Schema.optional(Schema.NullOr(Schema.String)),
        tenantId: Schema.optional(Schema.NullOr(Schema.String)),
        userAssignedIdentities: Schema.optional(
          Schema.NullOr(
            Schema.Record(
              Schema.String,
              Schema.Struct({
                clientId: Schema.optional(Schema.String),
                principalId: Schema.optional(Schema.String),
              }),
            ),
          ),
        ),
      }),
    ),
    systemData: Schema.optional(
      Schema.Struct({
        createdBy: Schema.optional(Schema.NullOr(Schema.String)),
        createdByType: Schema.optional(
          Schema.NullOr(
            Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
          ),
        ),
        createdAt: Schema.optional(Schema.NullOr(Schema.String)),
        lastModifiedBy: Schema.optional(Schema.NullOr(Schema.String)),
        lastModifiedByType: Schema.optional(
          Schema.NullOr(
            Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
          ),
        ),
        lastModifiedAt: Schema.optional(Schema.NullOr(Schema.String)),
      }),
    ),
  });
export type DigitalTwinsUpdateOutput = typeof DigitalTwinsUpdateOutput.Type;

// The operation
/**
 * Update metadata of DigitalTwinsInstance.
 */
export const DigitalTwinsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DigitalTwinsUpdateInput,
  outputSchema: DigitalTwinsUpdateOutput,
}));
// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.DigitalTwins/operations",
  }),
);
export type OperationsListInput = typeof OperationsListInput.Type;

// Output Schema
export const OperationsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  nextLink: Schema.optional(Schema.NullOr(Schema.String)),
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
        origin: Schema.optional(Schema.NullOr(Schema.String)),
        isDataAction: Schema.optional(Schema.Boolean),
        properties: Schema.optional(
          Schema.NullOr(Schema.Record(Schema.String, Schema.Unknown)),
        ),
      }),
    ),
  ),
});
export type OperationsListOutput = typeof OperationsListOutput.Type;

// The operation
/**
 * Lists all of the available DigitalTwins service REST API operations.
 */
export const OperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationsListInput,
  outputSchema: OperationsListOutput,
}));
// Input Schema
export const PrivateEndpointConnectionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DigitalTwins/digitalTwinsInstances/{resourceName}/privateEndpointConnections/{privateEndpointConnectionName}",
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
    properties: Schema.Struct({
      provisioningState: Schema.optional(
        Schema.NullOr(
          Schema.Literals(["Pending", "Approved", "Rejected", "Disconnected"]),
        ),
      ),
      privateEndpoint: Schema.optional(
        Schema.Struct({
          id: Schema.optional(Schema.String),
        }),
      ),
      groupIds: Schema.optional(Schema.Array(Schema.String)),
      privateLinkServiceConnectionState: Schema.optional(
        Schema.Struct({
          status: Schema.Literals([
            "Pending",
            "Approved",
            "Rejected",
            "Disconnected",
          ]),
          description: Schema.String,
          actionsRequired: Schema.optional(Schema.String),
        }),
      ),
    }),
    systemData: Schema.optional(
      Schema.Struct({
        createdBy: Schema.optional(Schema.NullOr(Schema.String)),
        createdByType: Schema.optional(
          Schema.NullOr(
            Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
          ),
        ),
        createdAt: Schema.optional(Schema.NullOr(Schema.String)),
        lastModifiedBy: Schema.optional(Schema.NullOr(Schema.String)),
        lastModifiedByType: Schema.optional(
          Schema.NullOr(
            Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
          ),
        ),
        lastModifiedAt: Schema.optional(Schema.NullOr(Schema.String)),
      }),
    ),
  });
export type PrivateEndpointConnectionsCreateOrUpdateOutput =
  typeof PrivateEndpointConnectionsCreateOrUpdateOutput.Type;

// The operation
/**
 * Update the status of a private endpoint connection with the given name.
 */
export const PrivateEndpointConnectionsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsCreateOrUpdateInput,
    outputSchema: PrivateEndpointConnectionsCreateOrUpdateOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DigitalTwins/digitalTwinsInstances/{resourceName}/privateEndpointConnections/{privateEndpointConnectionName}",
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
 * Delete private endpoint connection with the specified name.
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
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DigitalTwins/digitalTwinsInstances/{resourceName}/privateEndpointConnections/{privateEndpointConnectionName}",
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
    properties: Schema.Struct({
      provisioningState: Schema.optional(
        Schema.NullOr(
          Schema.Literals(["Pending", "Approved", "Rejected", "Disconnected"]),
        ),
      ),
      privateEndpoint: Schema.optional(
        Schema.Struct({
          id: Schema.optional(Schema.String),
        }),
      ),
      groupIds: Schema.optional(Schema.Array(Schema.String)),
      privateLinkServiceConnectionState: Schema.optional(
        Schema.Struct({
          status: Schema.Literals([
            "Pending",
            "Approved",
            "Rejected",
            "Disconnected",
          ]),
          description: Schema.String,
          actionsRequired: Schema.optional(Schema.String),
        }),
      ),
    }),
    systemData: Schema.optional(
      Schema.Struct({
        createdBy: Schema.optional(Schema.NullOr(Schema.String)),
        createdByType: Schema.optional(
          Schema.NullOr(
            Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
          ),
        ),
        createdAt: Schema.optional(Schema.NullOr(Schema.String)),
        lastModifiedBy: Schema.optional(Schema.NullOr(Schema.String)),
        lastModifiedByType: Schema.optional(
          Schema.NullOr(
            Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
          ),
        ),
        lastModifiedAt: Schema.optional(Schema.NullOr(Schema.String)),
      }),
    ),
  });
export type PrivateEndpointConnectionsGetOutput =
  typeof PrivateEndpointConnectionsGetOutput.Type;

// The operation
/**
 * Get private endpoint connection properties for the given private endpoint.
 */
export const PrivateEndpointConnectionsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsGetInput,
    outputSchema: PrivateEndpointConnectionsGetOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DigitalTwins/digitalTwinsInstances/{resourceName}/privateEndpointConnections",
    }),
  );
export type PrivateEndpointConnectionsListInput =
  typeof PrivateEndpointConnectionsListInput.Type;

// Output Schema
export const PrivateEndpointConnectionsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          properties: Schema.Struct({
            provisioningState: Schema.optional(
              Schema.NullOr(
                Schema.Literals([
                  "Pending",
                  "Approved",
                  "Rejected",
                  "Disconnected",
                ]),
              ),
            ),
            privateEndpoint: Schema.optional(
              Schema.Struct({
                id: Schema.optional(Schema.String),
              }),
            ),
            groupIds: Schema.optional(Schema.Array(Schema.String)),
            privateLinkServiceConnectionState: Schema.optional(
              Schema.Struct({
                status: Schema.Literals([
                  "Pending",
                  "Approved",
                  "Rejected",
                  "Disconnected",
                ]),
                description: Schema.String,
                actionsRequired: Schema.optional(Schema.String),
              }),
            ),
          }),
          systemData: Schema.optional(
            Schema.Struct({
              createdBy: Schema.optional(Schema.NullOr(Schema.String)),
              createdByType: Schema.optional(
                Schema.NullOr(
                  Schema.Literals([
                    "User",
                    "Application",
                    "ManagedIdentity",
                    "Key",
                  ]),
                ),
              ),
              createdAt: Schema.optional(Schema.NullOr(Schema.String)),
              lastModifiedBy: Schema.optional(Schema.NullOr(Schema.String)),
              lastModifiedByType: Schema.optional(
                Schema.NullOr(
                  Schema.Literals([
                    "User",
                    "Application",
                    "ManagedIdentity",
                    "Key",
                  ]),
                ),
              ),
              lastModifiedAt: Schema.optional(Schema.NullOr(Schema.String)),
            }),
          ),
        }),
      ),
    ),
  });
export type PrivateEndpointConnectionsListOutput =
  typeof PrivateEndpointConnectionsListOutput.Type;

// The operation
/**
 * List private endpoint connection properties.
 */
export const PrivateEndpointConnectionsList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsListInput,
    outputSchema: PrivateEndpointConnectionsListOutput,
  }));
// Input Schema
export const PrivateLinkResourcesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DigitalTwins/digitalTwinsInstances/{resourceName}/privateLinkResources/{resourceId}",
    }),
  );
export type PrivateLinkResourcesGetInput =
  typeof PrivateLinkResourcesGetInput.Type;

// Output Schema
export const PrivateLinkResourcesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    properties: Schema.Struct({
      groupId: Schema.optional(Schema.String),
      requiredMembers: Schema.optional(Schema.Array(Schema.String)),
      requiredZoneNames: Schema.optional(Schema.Array(Schema.String)),
    }),
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type PrivateLinkResourcesGetOutput =
  typeof PrivateLinkResourcesGetOutput.Type;

// The operation
/**
 * Get the specified private link resource for the given Digital Twin.
 */
export const PrivateLinkResourcesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PrivateLinkResourcesGetInput,
    outputSchema: PrivateLinkResourcesGetOutput,
  }),
);
// Input Schema
export const PrivateLinkResourcesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DigitalTwins/digitalTwinsInstances/{resourceName}/privateLinkResources",
    }),
  );
export type PrivateLinkResourcesListInput =
  typeof PrivateLinkResourcesListInput.Type;

// Output Schema
export const PrivateLinkResourcesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          properties: Schema.Struct({
            groupId: Schema.optional(Schema.String),
            requiredMembers: Schema.optional(Schema.Array(Schema.String)),
            requiredZoneNames: Schema.optional(Schema.Array(Schema.String)),
          }),
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type PrivateLinkResourcesListOutput =
  typeof PrivateLinkResourcesListOutput.Type;

// The operation
/**
 * List private link resources for given Digital Twin.
 */
export const PrivateLinkResourcesList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PrivateLinkResourcesListInput,
    outputSchema: PrivateLinkResourcesListOutput,
  }),
);
// Input Schema
export const TimeSeriesDatabaseConnectionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DigitalTwins/digitalTwinsInstances/{resourceName}/timeSeriesDatabaseConnections/{timeSeriesDatabaseConnectionName}",
    }),
  );
export type TimeSeriesDatabaseConnectionsCreateOrUpdateInput =
  typeof TimeSeriesDatabaseConnectionsCreateOrUpdateInput.Type;

// Output Schema
export const TimeSeriesDatabaseConnectionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    systemData: Schema.optional(
      Schema.Struct({
        createdBy: Schema.optional(Schema.NullOr(Schema.String)),
        createdByType: Schema.optional(
          Schema.NullOr(
            Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
          ),
        ),
        createdAt: Schema.optional(Schema.NullOr(Schema.String)),
        lastModifiedBy: Schema.optional(Schema.NullOr(Schema.String)),
        lastModifiedByType: Schema.optional(
          Schema.NullOr(
            Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
          ),
        ),
        lastModifiedAt: Schema.optional(Schema.NullOr(Schema.String)),
      }),
    ),
  });
export type TimeSeriesDatabaseConnectionsCreateOrUpdateOutput =
  typeof TimeSeriesDatabaseConnectionsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a time series database connection.
 */
export const TimeSeriesDatabaseConnectionsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: TimeSeriesDatabaseConnectionsCreateOrUpdateInput,
    outputSchema: TimeSeriesDatabaseConnectionsCreateOrUpdateOutput,
  }));
// Input Schema
export const TimeSeriesDatabaseConnectionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DigitalTwins/digitalTwinsInstances/{resourceName}/timeSeriesDatabaseConnections/{timeSeriesDatabaseConnectionName}",
    }),
  );
export type TimeSeriesDatabaseConnectionsDeleteInput =
  typeof TimeSeriesDatabaseConnectionsDeleteInput.Type;

// Output Schema
export const TimeSeriesDatabaseConnectionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    systemData: Schema.optional(
      Schema.Struct({
        createdBy: Schema.optional(Schema.NullOr(Schema.String)),
        createdByType: Schema.optional(
          Schema.NullOr(
            Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
          ),
        ),
        createdAt: Schema.optional(Schema.NullOr(Schema.String)),
        lastModifiedBy: Schema.optional(Schema.NullOr(Schema.String)),
        lastModifiedByType: Schema.optional(
          Schema.NullOr(
            Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
          ),
        ),
        lastModifiedAt: Schema.optional(Schema.NullOr(Schema.String)),
      }),
    ),
  });
export type TimeSeriesDatabaseConnectionsDeleteOutput =
  typeof TimeSeriesDatabaseConnectionsDeleteOutput.Type;

// The operation
/**
 * Delete a time series database connection.
 */
export const TimeSeriesDatabaseConnectionsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: TimeSeriesDatabaseConnectionsDeleteInput,
    outputSchema: TimeSeriesDatabaseConnectionsDeleteOutput,
  }));
// Input Schema
export const TimeSeriesDatabaseConnectionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DigitalTwins/digitalTwinsInstances/{resourceName}/timeSeriesDatabaseConnections/{timeSeriesDatabaseConnectionName}",
    }),
  );
export type TimeSeriesDatabaseConnectionsGetInput =
  typeof TimeSeriesDatabaseConnectionsGetInput.Type;

// Output Schema
export const TimeSeriesDatabaseConnectionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    systemData: Schema.optional(
      Schema.Struct({
        createdBy: Schema.optional(Schema.NullOr(Schema.String)),
        createdByType: Schema.optional(
          Schema.NullOr(
            Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
          ),
        ),
        createdAt: Schema.optional(Schema.NullOr(Schema.String)),
        lastModifiedBy: Schema.optional(Schema.NullOr(Schema.String)),
        lastModifiedByType: Schema.optional(
          Schema.NullOr(
            Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
          ),
        ),
        lastModifiedAt: Schema.optional(Schema.NullOr(Schema.String)),
      }),
    ),
  });
export type TimeSeriesDatabaseConnectionsGetOutput =
  typeof TimeSeriesDatabaseConnectionsGetOutput.Type;

// The operation
/**
 * Get the description of an existing time series database connection.
 */
export const TimeSeriesDatabaseConnectionsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: TimeSeriesDatabaseConnectionsGetInput,
    outputSchema: TimeSeriesDatabaseConnectionsGetOutput,
  }));
// Input Schema
export const TimeSeriesDatabaseConnectionsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DigitalTwins/digitalTwinsInstances/{resourceName}/timeSeriesDatabaseConnections",
    }),
  );
export type TimeSeriesDatabaseConnectionsListInput =
  typeof TimeSeriesDatabaseConnectionsListInput.Type;

// Output Schema
export const TimeSeriesDatabaseConnectionsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.NullOr(Schema.String)),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          systemData: Schema.optional(
            Schema.Struct({
              createdBy: Schema.optional(Schema.NullOr(Schema.String)),
              createdByType: Schema.optional(
                Schema.NullOr(
                  Schema.Literals([
                    "User",
                    "Application",
                    "ManagedIdentity",
                    "Key",
                  ]),
                ),
              ),
              createdAt: Schema.optional(Schema.NullOr(Schema.String)),
              lastModifiedBy: Schema.optional(Schema.NullOr(Schema.String)),
              lastModifiedByType: Schema.optional(
                Schema.NullOr(
                  Schema.Literals([
                    "User",
                    "Application",
                    "ManagedIdentity",
                    "Key",
                  ]),
                ),
              ),
              lastModifiedAt: Schema.optional(Schema.NullOr(Schema.String)),
            }),
          ),
        }),
      ),
    ),
  });
export type TimeSeriesDatabaseConnectionsListOutput =
  typeof TimeSeriesDatabaseConnectionsListOutput.Type;

// The operation
/**
 * Get all existing time series database connections for this DigitalTwins instance.
 */
export const TimeSeriesDatabaseConnectionsList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: TimeSeriesDatabaseConnectionsListInput,
    outputSchema: TimeSeriesDatabaseConnectionsListOutput,
  }));
