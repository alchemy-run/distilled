/**
 * Azure Domainservices API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const DomainServiceOperationsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({ method: "GET", path: "/providers/Microsoft.AAD/operations" }),
  );
export type DomainServiceOperationsListInput =
  typeof DomainServiceOperationsListInput.Type;

// Output Schema
export const DomainServiceOperationsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
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
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type DomainServiceOperationsListOutput =
  typeof DomainServiceOperationsListOutput.Type;

// The operation
/**
 * Lists all the available Domain Services operations.
 */
export const DomainServiceOperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DomainServiceOperationsListInput,
    outputSchema: DomainServiceOperationsListOutput,
  }),
);
// Input Schema
export const DomainServicesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AAD/domainServices/{domainServiceName}",
    }),
  );
export type DomainServicesCreateOrUpdateInput =
  typeof DomainServicesCreateOrUpdateInput.Type;

// Output Schema
export const DomainServicesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    etag: Schema.optional(Schema.String),
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
  });
export type DomainServicesCreateOrUpdateOutput =
  typeof DomainServicesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or Update Domain Service (PUT Resource)
 *
 * The Create Domain Service operation creates a new domain service with the specified parameters. If the specific service already exists, then any patchable properties will be updated and any immutable properties will remain unchanged.
 */
export const DomainServicesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DomainServicesCreateOrUpdateInput,
    outputSchema: DomainServicesCreateOrUpdateOutput,
  }));
// Input Schema
export const DomainServicesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AAD/domainServices/{domainServiceName}",
    }),
  );
export type DomainServicesDeleteInput = typeof DomainServicesDeleteInput.Type;

// Output Schema
export const DomainServicesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DomainServicesDeleteOutput = typeof DomainServicesDeleteOutput.Type;

// The operation
/**
 * Delete Domain Service (DELETE Resource)
 *
 * The Delete Domain Service operation deletes an existing Domain Service.
 */
export const DomainServicesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DomainServicesDeleteInput,
    outputSchema: DomainServicesDeleteOutput,
  }),
);
// Input Schema
export const DomainServicesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AAD/domainServices/{domainServiceName}",
  }),
);
export type DomainServicesGetInput = typeof DomainServicesGetInput.Type;

// Output Schema
export const DomainServicesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    etag: Schema.optional(Schema.String),
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
  });
export type DomainServicesGetOutput = typeof DomainServicesGetOutput.Type;

// The operation
/**
 * Get Domain Service
 *
 * The Get Domain Service operation retrieves a json representation of the Domain Service.
 */
export const DomainServicesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DomainServicesGetInput,
  outputSchema: DomainServicesGetOutput,
}));
// Input Schema
export const DomainServicesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AAD/domainServices",
    }),
  );
export type DomainServicesListInput = typeof DomainServicesListInput.Type;

// Output Schema
export const DomainServicesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          etag: Schema.optional(Schema.String),
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
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type DomainServicesListOutput = typeof DomainServicesListOutput.Type;

// The operation
/**
 * List Domain Services in Subscription
 *
 * The List Domain Services in Subscription operation lists all the domain services available under the given subscription (and across all resource groups within that subscription).
 */
export const DomainServicesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DomainServicesListInput,
  outputSchema: DomainServicesListOutput,
}));
// Input Schema
export const DomainServicesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AAD/domainServices",
    }),
  );
export type DomainServicesListByResourceGroupInput =
  typeof DomainServicesListByResourceGroupInput.Type;

// Output Schema
export const DomainServicesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          etag: Schema.optional(Schema.String),
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
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type DomainServicesListByResourceGroupOutput =
  typeof DomainServicesListByResourceGroupOutput.Type;

// The operation
/**
 * List Domain Services in Resource Group
 *
 * The List Domain Services in Resource Group operation lists all the domain services available under the given resource group.
 */
export const DomainServicesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DomainServicesListByResourceGroupInput,
    outputSchema: DomainServicesListByResourceGroupOutput,
  }));
// Input Schema
export const DomainServicesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AAD/domainServices/{domainServiceName}",
    }),
  );
export type DomainServicesUpdateInput = typeof DomainServicesUpdateInput.Type;

// Output Schema
export const DomainServicesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    etag: Schema.optional(Schema.String),
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
  });
export type DomainServicesUpdateOutput = typeof DomainServicesUpdateOutput.Type;

// The operation
/**
 * Update Domain Service (PATCH Resource)
 *
 * The Update Domain Service operation can be used to update the existing deployment. The update call only supports the properties listed in the PATCH body.
 */
export const DomainServicesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DomainServicesUpdateInput,
    outputSchema: DomainServicesUpdateOutput,
  }),
);
// Input Schema
export const OuContainerCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Aad/domainServices/{domainServiceName}/ouContainer/{ouContainerName}",
  }),
);
export type OuContainerCreateInput = typeof OuContainerCreateInput.Type;

// Output Schema
export const OuContainerCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    etag: Schema.optional(Schema.String),
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
  });
export type OuContainerCreateOutput = typeof OuContainerCreateOutput.Type;

// The operation
/**
 * Create OuContainer
 *
 * The Create OuContainer operation creates a new OuContainer under the specified Domain Service instance.
 */
export const OuContainerCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OuContainerCreateInput,
  outputSchema: OuContainerCreateOutput,
}));
// Input Schema
export const OuContainerDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Aad/domainServices/{domainServiceName}/ouContainer/{ouContainerName}",
  }),
);
export type OuContainerDeleteInput = typeof OuContainerDeleteInput.Type;

// Output Schema
export const OuContainerDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type OuContainerDeleteOutput = typeof OuContainerDeleteOutput.Type;

// The operation
/**
 * Delete OuContainer
 *
 * The Delete OuContainer operation deletes specified OuContainer.
 */
export const OuContainerDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OuContainerDeleteInput,
  outputSchema: OuContainerDeleteOutput,
}));
// Input Schema
export const OuContainerGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Aad/domainServices/{domainServiceName}/ouContainer/{ouContainerName}",
  }),
);
export type OuContainerGetInput = typeof OuContainerGetInput.Type;

// Output Schema
export const OuContainerGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  etag: Schema.optional(Schema.String),
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
});
export type OuContainerGetOutput = typeof OuContainerGetOutput.Type;

// The operation
/**
 * Get particular OuContainer in DomainService instance
 *
 * Get OuContainer in DomainService instance.
 */
export const OuContainerGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OuContainerGetInput,
  outputSchema: OuContainerGetOutput,
}));
// Input Schema
export const OuContainerListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Aad/domainServices/{domainServiceName}/ouContainer",
  }),
);
export type OuContainerListInput = typeof OuContainerListInput.Type;

// Output Schema
export const OuContainerListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        type: Schema.optional(Schema.String),
        location: Schema.optional(Schema.String),
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        etag: Schema.optional(Schema.String),
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
      }),
    ),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type OuContainerListOutput = typeof OuContainerListOutput.Type;

// The operation
/**
 * List of OuContainers in DomainService instance
 *
 * The List of OuContainers in DomainService instance.
 */
export const OuContainerList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OuContainerListInput,
  outputSchema: OuContainerListOutput,
}));
// Input Schema
export const OuContainerOperationsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({ method: "GET", path: "/providers/Microsoft.Aad/operations" }),
  );
export type OuContainerOperationsListInput =
  typeof OuContainerOperationsListInput.Type;

// Output Schema
export const OuContainerOperationsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
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
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type OuContainerOperationsListOutput =
  typeof OuContainerOperationsListOutput.Type;

// The operation
/**
 * Lists all the available OuContainer operations.
 */
export const OuContainerOperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: OuContainerOperationsListInput,
    outputSchema: OuContainerOperationsListOutput,
  }),
);
// Input Schema
export const OuContainerUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Aad/domainServices/{domainServiceName}/ouContainer/{ouContainerName}",
  }),
);
export type OuContainerUpdateInput = typeof OuContainerUpdateInput.Type;

// Output Schema
export const OuContainerUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    etag: Schema.optional(Schema.String),
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
  });
export type OuContainerUpdateOutput = typeof OuContainerUpdateOutput.Type;

// The operation
/**
 * Update OuContainer (PATCH Resource)
 *
 * The Update OuContainer operation can be used to update the existing OuContainers.
 */
export const OuContainerUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OuContainerUpdateInput,
  outputSchema: OuContainerUpdateOutput,
}));
