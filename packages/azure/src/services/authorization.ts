/**
 * Azure Authorization API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const DenyAssignmentsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scope: Schema.String.pipe(T.PathParam()),
    denyAssignmentId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/{scope}/providers/Microsoft.Authorization/denyAssignments/{denyAssignmentId}",
    }),
  );
export type DenyAssignmentsGetInput = typeof DenyAssignmentsGetInput.Type;

// Output Schema
export const DenyAssignmentsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        denyAssignmentName: Schema.optional(Schema.String),
        description: Schema.optional(Schema.String),
        permissions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              actions: Schema.optional(Schema.Array(Schema.String)),
              notActions: Schema.optional(Schema.Array(Schema.String)),
              dataActions: Schema.optional(Schema.Array(Schema.String)),
              notDataActions: Schema.optional(Schema.Array(Schema.String)),
              condition: Schema.optional(Schema.String),
              conditionVersion: Schema.optional(Schema.String),
            }),
          ),
        ),
        scope: Schema.optional(Schema.String),
        doNotApplyToChildScopes: Schema.optional(Schema.Boolean),
        principals: Schema.optional(
          Schema.Array(
            Schema.Struct({
              id: Schema.optional(Schema.String),
              displayName: Schema.optional(Schema.String),
              type: Schema.optional(Schema.String),
              email: Schema.optional(Schema.String),
            }),
          ),
        ),
        excludePrincipals: Schema.optional(
          Schema.Array(
            Schema.Struct({
              id: Schema.optional(Schema.String),
              displayName: Schema.optional(Schema.String),
              type: Schema.optional(Schema.String),
              email: Schema.optional(Schema.String),
            }),
          ),
        ),
        isSystemProtected: Schema.optional(Schema.Boolean),
        condition: Schema.optional(Schema.String),
        conditionVersion: Schema.optional(Schema.String),
        createdOn: Schema.optional(Schema.String),
        updatedOn: Schema.optional(Schema.String),
        createdBy: Schema.optional(Schema.String),
        updatedBy: Schema.optional(Schema.String),
      }),
    ),
  });
export type DenyAssignmentsGetOutput = typeof DenyAssignmentsGetOutput.Type;

// The operation
/**
 * Get the specified deny assignment.
 *
 * @param scope - The scope of the deny assignment.
 * @param denyAssignmentId - The ID of the deny assignment to get.
 * @param api-version - The API version to use for this operation.
 */
export const DenyAssignmentsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DenyAssignmentsGetInput,
  outputSchema: DenyAssignmentsGetOutput,
}));
// Input Schema
export const DenyAssignmentsGetByIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    denyAssignmentId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(T.Http({ method: "GET", path: "/{denyAssignmentId}" }));
export type DenyAssignmentsGetByIdInput =
  typeof DenyAssignmentsGetByIdInput.Type;

// Output Schema
export const DenyAssignmentsGetByIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        denyAssignmentName: Schema.optional(Schema.String),
        description: Schema.optional(Schema.String),
        permissions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              actions: Schema.optional(Schema.Array(Schema.String)),
              notActions: Schema.optional(Schema.Array(Schema.String)),
              dataActions: Schema.optional(Schema.Array(Schema.String)),
              notDataActions: Schema.optional(Schema.Array(Schema.String)),
              condition: Schema.optional(Schema.String),
              conditionVersion: Schema.optional(Schema.String),
            }),
          ),
        ),
        scope: Schema.optional(Schema.String),
        doNotApplyToChildScopes: Schema.optional(Schema.Boolean),
        principals: Schema.optional(
          Schema.Array(
            Schema.Struct({
              id: Schema.optional(Schema.String),
              displayName: Schema.optional(Schema.String),
              type: Schema.optional(Schema.String),
              email: Schema.optional(Schema.String),
            }),
          ),
        ),
        excludePrincipals: Schema.optional(
          Schema.Array(
            Schema.Struct({
              id: Schema.optional(Schema.String),
              displayName: Schema.optional(Schema.String),
              type: Schema.optional(Schema.String),
              email: Schema.optional(Schema.String),
            }),
          ),
        ),
        isSystemProtected: Schema.optional(Schema.Boolean),
        condition: Schema.optional(Schema.String),
        conditionVersion: Schema.optional(Schema.String),
        createdOn: Schema.optional(Schema.String),
        updatedOn: Schema.optional(Schema.String),
        createdBy: Schema.optional(Schema.String),
        updatedBy: Schema.optional(Schema.String),
      }),
    ),
  });
export type DenyAssignmentsGetByIdOutput =
  typeof DenyAssignmentsGetByIdOutput.Type;

// The operation
/**
 * Gets a deny assignment by ID.
 *
 * @param denyAssignmentId - The fully qualified deny assignment ID. For example, use the format, /subscriptions/{guid}/providers/Microsoft.Authorization/denyAssignments/{denyAssignmentId} for subscription level deny assignments, or /providers/Microsoft.Authorization/denyAssignments/{denyAssignmentId} for tenant level deny assignments.
 * @param api-version - The API version to use for this operation.
 */
export const DenyAssignmentsGetById = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DenyAssignmentsGetByIdInput,
    outputSchema: DenyAssignmentsGetByIdOutput,
  }),
);
// Input Schema
export const DenyAssignmentsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/denyAssignments",
    }),
  );
export type DenyAssignmentsListInput = typeof DenyAssignmentsListInput.Type;

// Output Schema
export const DenyAssignmentsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Struct({
              denyAssignmentName: Schema.optional(Schema.String),
              description: Schema.optional(Schema.String),
              permissions: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    actions: Schema.optional(Schema.Array(Schema.String)),
                    notActions: Schema.optional(Schema.Array(Schema.String)),
                    dataActions: Schema.optional(Schema.Array(Schema.String)),
                    notDataActions: Schema.optional(
                      Schema.Array(Schema.String),
                    ),
                    condition: Schema.optional(Schema.String),
                    conditionVersion: Schema.optional(Schema.String),
                  }),
                ),
              ),
              scope: Schema.optional(Schema.String),
              doNotApplyToChildScopes: Schema.optional(Schema.Boolean),
              principals: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    id: Schema.optional(Schema.String),
                    displayName: Schema.optional(Schema.String),
                    type: Schema.optional(Schema.String),
                    email: Schema.optional(Schema.String),
                  }),
                ),
              ),
              excludePrincipals: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    id: Schema.optional(Schema.String),
                    displayName: Schema.optional(Schema.String),
                    type: Schema.optional(Schema.String),
                    email: Schema.optional(Schema.String),
                  }),
                ),
              ),
              isSystemProtected: Schema.optional(Schema.Boolean),
              condition: Schema.optional(Schema.String),
              conditionVersion: Schema.optional(Schema.String),
              createdOn: Schema.optional(Schema.String),
              updatedOn: Schema.optional(Schema.String),
              createdBy: Schema.optional(Schema.String),
              updatedBy: Schema.optional(Schema.String),
            }),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type DenyAssignmentsListOutput = typeof DenyAssignmentsListOutput.Type;

// The operation
/**
 * Gets all deny assignments for the subscription.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const DenyAssignmentsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DenyAssignmentsListInput,
  outputSchema: DenyAssignmentsListOutput,
}));
// Input Schema
export const DenyAssignmentsListForResourceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    parentResourcePath: Schema.String.pipe(T.PathParam()),
    resourceType: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{parentResourcePath}/{resourceType}/{resourceName}/providers/Microsoft.Authorization/denyAssignments",
    }),
  );
export type DenyAssignmentsListForResourceInput =
  typeof DenyAssignmentsListForResourceInput.Type;

// Output Schema
export const DenyAssignmentsListForResourceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Struct({
              denyAssignmentName: Schema.optional(Schema.String),
              description: Schema.optional(Schema.String),
              permissions: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    actions: Schema.optional(Schema.Array(Schema.String)),
                    notActions: Schema.optional(Schema.Array(Schema.String)),
                    dataActions: Schema.optional(Schema.Array(Schema.String)),
                    notDataActions: Schema.optional(
                      Schema.Array(Schema.String),
                    ),
                    condition: Schema.optional(Schema.String),
                    conditionVersion: Schema.optional(Schema.String),
                  }),
                ),
              ),
              scope: Schema.optional(Schema.String),
              doNotApplyToChildScopes: Schema.optional(Schema.Boolean),
              principals: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    id: Schema.optional(Schema.String),
                    displayName: Schema.optional(Schema.String),
                    type: Schema.optional(Schema.String),
                    email: Schema.optional(Schema.String),
                  }),
                ),
              ),
              excludePrincipals: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    id: Schema.optional(Schema.String),
                    displayName: Schema.optional(Schema.String),
                    type: Schema.optional(Schema.String),
                    email: Schema.optional(Schema.String),
                  }),
                ),
              ),
              isSystemProtected: Schema.optional(Schema.Boolean),
              condition: Schema.optional(Schema.String),
              conditionVersion: Schema.optional(Schema.String),
              createdOn: Schema.optional(Schema.String),
              updatedOn: Schema.optional(Schema.String),
              createdBy: Schema.optional(Schema.String),
              updatedBy: Schema.optional(Schema.String),
            }),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type DenyAssignmentsListForResourceOutput =
  typeof DenyAssignmentsListForResourceOutput.Type;

// The operation
/**
 * Gets deny assignments for a resource.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param parentResourcePath - The parent resource identity.
 * @param resourceType - The resource type of the resource.
 * @param resourceName - The name of the resource to get deny assignments for.
 * @param api-version - The API version to use for this operation.
 */
export const DenyAssignmentsListForResource =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DenyAssignmentsListForResourceInput,
    outputSchema: DenyAssignmentsListForResourceOutput,
  }));
// Input Schema
export const DenyAssignmentsListForResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Authorization/denyAssignments",
    }),
  );
export type DenyAssignmentsListForResourceGroupInput =
  typeof DenyAssignmentsListForResourceGroupInput.Type;

// Output Schema
export const DenyAssignmentsListForResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Struct({
              denyAssignmentName: Schema.optional(Schema.String),
              description: Schema.optional(Schema.String),
              permissions: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    actions: Schema.optional(Schema.Array(Schema.String)),
                    notActions: Schema.optional(Schema.Array(Schema.String)),
                    dataActions: Schema.optional(Schema.Array(Schema.String)),
                    notDataActions: Schema.optional(
                      Schema.Array(Schema.String),
                    ),
                    condition: Schema.optional(Schema.String),
                    conditionVersion: Schema.optional(Schema.String),
                  }),
                ),
              ),
              scope: Schema.optional(Schema.String),
              doNotApplyToChildScopes: Schema.optional(Schema.Boolean),
              principals: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    id: Schema.optional(Schema.String),
                    displayName: Schema.optional(Schema.String),
                    type: Schema.optional(Schema.String),
                    email: Schema.optional(Schema.String),
                  }),
                ),
              ),
              excludePrincipals: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    id: Schema.optional(Schema.String),
                    displayName: Schema.optional(Schema.String),
                    type: Schema.optional(Schema.String),
                    email: Schema.optional(Schema.String),
                  }),
                ),
              ),
              isSystemProtected: Schema.optional(Schema.Boolean),
              condition: Schema.optional(Schema.String),
              conditionVersion: Schema.optional(Schema.String),
              createdOn: Schema.optional(Schema.String),
              updatedOn: Schema.optional(Schema.String),
              createdBy: Schema.optional(Schema.String),
              updatedBy: Schema.optional(Schema.String),
            }),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type DenyAssignmentsListForResourceGroupOutput =
  typeof DenyAssignmentsListForResourceGroupOutput.Type;

// The operation
/**
 * Gets deny assignments for a resource group.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const DenyAssignmentsListForResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DenyAssignmentsListForResourceGroupInput,
    outputSchema: DenyAssignmentsListForResourceGroupOutput,
  }));
// Input Schema
export const DenyAssignmentsListForScopeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scope: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/{scope}/providers/Microsoft.Authorization/denyAssignments",
    }),
  );
export type DenyAssignmentsListForScopeInput =
  typeof DenyAssignmentsListForScopeInput.Type;

// Output Schema
export const DenyAssignmentsListForScopeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Struct({
              denyAssignmentName: Schema.optional(Schema.String),
              description: Schema.optional(Schema.String),
              permissions: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    actions: Schema.optional(Schema.Array(Schema.String)),
                    notActions: Schema.optional(Schema.Array(Schema.String)),
                    dataActions: Schema.optional(Schema.Array(Schema.String)),
                    notDataActions: Schema.optional(
                      Schema.Array(Schema.String),
                    ),
                    condition: Schema.optional(Schema.String),
                    conditionVersion: Schema.optional(Schema.String),
                  }),
                ),
              ),
              scope: Schema.optional(Schema.String),
              doNotApplyToChildScopes: Schema.optional(Schema.Boolean),
              principals: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    id: Schema.optional(Schema.String),
                    displayName: Schema.optional(Schema.String),
                    type: Schema.optional(Schema.String),
                    email: Schema.optional(Schema.String),
                  }),
                ),
              ),
              excludePrincipals: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    id: Schema.optional(Schema.String),
                    displayName: Schema.optional(Schema.String),
                    type: Schema.optional(Schema.String),
                    email: Schema.optional(Schema.String),
                  }),
                ),
              ),
              isSystemProtected: Schema.optional(Schema.Boolean),
              condition: Schema.optional(Schema.String),
              conditionVersion: Schema.optional(Schema.String),
              createdOn: Schema.optional(Schema.String),
              updatedOn: Schema.optional(Schema.String),
              createdBy: Schema.optional(Schema.String),
              updatedBy: Schema.optional(Schema.String),
            }),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type DenyAssignmentsListForScopeOutput =
  typeof DenyAssignmentsListForScopeOutput.Type;

// The operation
/**
 * Gets deny assignments for a scope.
 *
 * @param scope - The scope of the deny assignments.
 * @param api-version - The API version to use for this operation.
 */
export const DenyAssignmentsListForScope = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DenyAssignmentsListForScopeInput,
    outputSchema: DenyAssignmentsListForScopeOutput,
  }),
);
// Input Schema
export const PermissionsListForResourceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceProviderNamespace: Schema.String.pipe(T.PathParam()),
    parentResourcePath: Schema.String.pipe(T.PathParam()),
    resourceType: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{parentResourcePath}/{resourceType}/{resourceName}/providers/Microsoft.Authorization/permissions",
    }),
  );
export type PermissionsListForResourceInput =
  typeof PermissionsListForResourceInput.Type;

// Output Schema
export const PermissionsListForResourceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          actions: Schema.optional(Schema.Array(Schema.String)),
          notActions: Schema.optional(Schema.Array(Schema.String)),
          dataActions: Schema.optional(Schema.Array(Schema.String)),
          notDataActions: Schema.optional(Schema.Array(Schema.String)),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type PermissionsListForResourceOutput =
  typeof PermissionsListForResourceOutput.Type;

// The operation
/**
 * Gets all permissions the caller has for a resource.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceProviderNamespace - The namespace of the resource provider.
 * @param parentResourcePath - The parent resource identity.
 * @param resourceType - The resource type of the resource.
 * @param resourceName - The name of the resource to get the permissions for.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const PermissionsListForResource = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PermissionsListForResourceInput,
    outputSchema: PermissionsListForResourceOutput,
  }),
);
// Input Schema
export const PermissionsListForResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Authorization/permissions",
    }),
  );
export type PermissionsListForResourceGroupInput =
  typeof PermissionsListForResourceGroupInput.Type;

// Output Schema
export const PermissionsListForResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          actions: Schema.optional(Schema.Array(Schema.String)),
          notActions: Schema.optional(Schema.Array(Schema.String)),
          dataActions: Schema.optional(Schema.Array(Schema.String)),
          notDataActions: Schema.optional(Schema.Array(Schema.String)),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type PermissionsListForResourceGroupOutput =
  typeof PermissionsListForResourceGroupOutput.Type;

// The operation
/**
 * Gets all permissions the caller has for a resource group.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const PermissionsListForResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PermissionsListForResourceGroupInput,
    outputSchema: PermissionsListForResourceGroupOutput,
  }));
// Input Schema
export const ProviderOperationsMetadataGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
    $expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Authorization/providerOperations/{resourceProviderNamespace}",
    }),
  );
export type ProviderOperationsMetadataGetInput =
  typeof ProviderOperationsMetadataGetInput.Type;

// Output Schema
export const ProviderOperationsMetadataGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    displayName: Schema.optional(Schema.String),
    resourceTypes: Schema.optional(
      Schema.Array(
        Schema.Struct({
          name: Schema.optional(Schema.String),
          displayName: Schema.optional(Schema.String),
          operations: Schema.optional(
            Schema.Array(
              Schema.Struct({
                name: Schema.optional(Schema.String),
                displayName: Schema.optional(Schema.String),
                description: Schema.optional(Schema.String),
                origin: Schema.optional(Schema.String),
                properties: Schema.optional(Schema.Unknown),
                isDataAction: Schema.optional(Schema.Boolean),
              }),
            ),
          ),
        }),
      ),
    ),
    operations: Schema.optional(
      Schema.Array(
        Schema.Struct({
          name: Schema.optional(Schema.String),
          displayName: Schema.optional(Schema.String),
          description: Schema.optional(Schema.String),
          origin: Schema.optional(Schema.String),
          properties: Schema.optional(Schema.Unknown),
          isDataAction: Schema.optional(Schema.Boolean),
        }),
      ),
    ),
  });
export type ProviderOperationsMetadataGetOutput =
  typeof ProviderOperationsMetadataGetOutput.Type;

// The operation
/**
 * Gets provider operations metadata for the specified resource provider.
 *
 * @param api-version - The API version to use for this operation.
 * @param $expand - Specifies whether to expand the values.
 */
export const ProviderOperationsMetadataGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ProviderOperationsMetadataGetInput,
    outputSchema: ProviderOperationsMetadataGetOutput,
  }));
// Input Schema
export const ProviderOperationsMetadataListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
    $expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Authorization/providerOperations",
    }),
  );
export type ProviderOperationsMetadataListInput =
  typeof ProviderOperationsMetadataListInput.Type;

// Output Schema
export const ProviderOperationsMetadataListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          displayName: Schema.optional(Schema.String),
          resourceTypes: Schema.optional(
            Schema.Array(
              Schema.Struct({
                name: Schema.optional(Schema.String),
                displayName: Schema.optional(Schema.String),
                operations: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      name: Schema.optional(Schema.String),
                      displayName: Schema.optional(Schema.String),
                      description: Schema.optional(Schema.String),
                      origin: Schema.optional(Schema.String),
                      properties: Schema.optional(Schema.Unknown),
                      isDataAction: Schema.optional(Schema.Boolean),
                    }),
                  ),
                ),
              }),
            ),
          ),
          operations: Schema.optional(
            Schema.Array(
              Schema.Struct({
                name: Schema.optional(Schema.String),
                displayName: Schema.optional(Schema.String),
                description: Schema.optional(Schema.String),
                origin: Schema.optional(Schema.String),
                properties: Schema.optional(Schema.Unknown),
                isDataAction: Schema.optional(Schema.Boolean),
              }),
            ),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ProviderOperationsMetadataListOutput =
  typeof ProviderOperationsMetadataListOutput.Type;

// The operation
/**
 * Gets provider operations metadata for all resource providers.
 *
 * @param api-version - The API version to use for this operation.
 * @param $expand - Specifies whether to expand the values.
 */
export const ProviderOperationsMetadataList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ProviderOperationsMetadataListInput,
    outputSchema: ProviderOperationsMetadataListOutput,
  }));
// Input Schema
export const RoleAssignmentsCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scope: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/{scope}/providers/Microsoft.Authorization/roleAssignments/{roleAssignmentName}",
    }),
  );
export type RoleAssignmentsCreateInput = typeof RoleAssignmentsCreateInput.Type;

// Output Schema
export const RoleAssignmentsCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        scope: Schema.optional(Schema.String),
        roleDefinitionId: Schema.String,
        principalId: Schema.String,
        principalType: Schema.optional(
          Schema.Literals([
            "User",
            "Group",
            "ServicePrincipal",
            "ForeignGroup",
            "Device",
          ]),
        ),
        description: Schema.optional(Schema.String),
        condition: Schema.optional(Schema.String),
        conditionVersion: Schema.optional(Schema.String),
        createdOn: Schema.optional(Schema.String),
        updatedOn: Schema.optional(Schema.String),
        createdBy: Schema.optional(Schema.String),
        updatedBy: Schema.optional(Schema.String),
        delegatedManagedIdentityResourceId: Schema.optional(Schema.String),
      }),
    ),
  });
export type RoleAssignmentsCreateOutput =
  typeof RoleAssignmentsCreateOutput.Type;

// The operation
/**
 * Create or update a role assignment by scope and name.
 *
 * @param scope - The scope of the operation or resource. Valid scopes are: subscription (format: '/subscriptions/{subscriptionId}'), resource group (format: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}', or resource (format: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/[{parentResourcePath}/]{resourceType}/{resourceName}'
 * @param api-version - The API version to use for this operation.
 */
export const RoleAssignmentsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RoleAssignmentsCreateInput,
    outputSchema: RoleAssignmentsCreateOutput,
  }),
);
// Input Schema
export const RoleAssignmentsCreateByIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(T.Http({ method: "PUT", path: "/{roleAssignmentId}" }));
export type RoleAssignmentsCreateByIdInput =
  typeof RoleAssignmentsCreateByIdInput.Type;

// Output Schema
export const RoleAssignmentsCreateByIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        scope: Schema.optional(Schema.String),
        roleDefinitionId: Schema.String,
        principalId: Schema.String,
        principalType: Schema.optional(
          Schema.Literals([
            "User",
            "Group",
            "ServicePrincipal",
            "ForeignGroup",
            "Device",
          ]),
        ),
        description: Schema.optional(Schema.String),
        condition: Schema.optional(Schema.String),
        conditionVersion: Schema.optional(Schema.String),
        createdOn: Schema.optional(Schema.String),
        updatedOn: Schema.optional(Schema.String),
        createdBy: Schema.optional(Schema.String),
        updatedBy: Schema.optional(Schema.String),
        delegatedManagedIdentityResourceId: Schema.optional(Schema.String),
      }),
    ),
  });
export type RoleAssignmentsCreateByIdOutput =
  typeof RoleAssignmentsCreateByIdOutput.Type;

// The operation
/**
 * Create or update a role assignment by ID.
 *
 * @param api-version - The API version to use for this operation.
 */
export const RoleAssignmentsCreateById = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RoleAssignmentsCreateByIdInput,
    outputSchema: RoleAssignmentsCreateByIdOutput,
  }),
);
// Input Schema
export const RoleAssignmentsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scope: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/{scope}/providers/Microsoft.Authorization/roleAssignments/{roleAssignmentName}",
    }),
  );
export type RoleAssignmentsDeleteInput = typeof RoleAssignmentsDeleteInput.Type;

// Output Schema
export const RoleAssignmentsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        scope: Schema.optional(Schema.String),
        roleDefinitionId: Schema.String,
        principalId: Schema.String,
        principalType: Schema.optional(
          Schema.Literals([
            "User",
            "Group",
            "ServicePrincipal",
            "ForeignGroup",
            "Device",
          ]),
        ),
        description: Schema.optional(Schema.String),
        condition: Schema.optional(Schema.String),
        conditionVersion: Schema.optional(Schema.String),
        createdOn: Schema.optional(Schema.String),
        updatedOn: Schema.optional(Schema.String),
        createdBy: Schema.optional(Schema.String),
        updatedBy: Schema.optional(Schema.String),
        delegatedManagedIdentityResourceId: Schema.optional(Schema.String),
      }),
    ),
  });
export type RoleAssignmentsDeleteOutput =
  typeof RoleAssignmentsDeleteOutput.Type;

// The operation
/**
 * Delete a role assignment by scope and name.
 *
 * @param scope - The scope of the operation or resource. Valid scopes are: subscription (format: '/subscriptions/{subscriptionId}'), resource group (format: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}', or resource (format: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/[{parentResourcePath}/]{resourceType}/{resourceName}'
 * @param api-version - The API version to use for this operation.
 */
export const RoleAssignmentsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RoleAssignmentsDeleteInput,
    outputSchema: RoleAssignmentsDeleteOutput,
  }),
);
// Input Schema
export const RoleAssignmentsDeleteByIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(T.Http({ method: "DELETE", path: "/{roleAssignmentId}" }));
export type RoleAssignmentsDeleteByIdInput =
  typeof RoleAssignmentsDeleteByIdInput.Type;

// Output Schema
export const RoleAssignmentsDeleteByIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        scope: Schema.optional(Schema.String),
        roleDefinitionId: Schema.String,
        principalId: Schema.String,
        principalType: Schema.optional(
          Schema.Literals([
            "User",
            "Group",
            "ServicePrincipal",
            "ForeignGroup",
            "Device",
          ]),
        ),
        description: Schema.optional(Schema.String),
        condition: Schema.optional(Schema.String),
        conditionVersion: Schema.optional(Schema.String),
        createdOn: Schema.optional(Schema.String),
        updatedOn: Schema.optional(Schema.String),
        createdBy: Schema.optional(Schema.String),
        updatedBy: Schema.optional(Schema.String),
        delegatedManagedIdentityResourceId: Schema.optional(Schema.String),
      }),
    ),
  });
export type RoleAssignmentsDeleteByIdOutput =
  typeof RoleAssignmentsDeleteByIdOutput.Type;

// The operation
/**
 * Delete a role assignment by ID.
 *
 * @param api-version - The API version to use for this operation.
 */
export const RoleAssignmentsDeleteById = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RoleAssignmentsDeleteByIdInput,
    outputSchema: RoleAssignmentsDeleteByIdOutput,
  }),
);
// Input Schema
export const RoleAssignmentsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scope: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/{scope}/providers/Microsoft.Authorization/roleAssignments/{roleAssignmentName}",
    }),
  );
export type RoleAssignmentsGetInput = typeof RoleAssignmentsGetInput.Type;

// Output Schema
export const RoleAssignmentsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        scope: Schema.optional(Schema.String),
        roleDefinitionId: Schema.String,
        principalId: Schema.String,
        principalType: Schema.optional(
          Schema.Literals([
            "User",
            "Group",
            "ServicePrincipal",
            "ForeignGroup",
            "Device",
          ]),
        ),
        description: Schema.optional(Schema.String),
        condition: Schema.optional(Schema.String),
        conditionVersion: Schema.optional(Schema.String),
        createdOn: Schema.optional(Schema.String),
        updatedOn: Schema.optional(Schema.String),
        createdBy: Schema.optional(Schema.String),
        updatedBy: Schema.optional(Schema.String),
        delegatedManagedIdentityResourceId: Schema.optional(Schema.String),
      }),
    ),
  });
export type RoleAssignmentsGetOutput = typeof RoleAssignmentsGetOutput.Type;

// The operation
/**
 * Get a role assignment by scope and name.
 *
 * @param scope - The scope of the operation or resource. Valid scopes are: subscription (format: '/subscriptions/{subscriptionId}'), resource group (format: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}', or resource (format: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/[{parentResourcePath}/]{resourceType}/{resourceName}'
 * @param api-version - The API version to use for this operation.
 */
export const RoleAssignmentsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RoleAssignmentsGetInput,
  outputSchema: RoleAssignmentsGetOutput,
}));
// Input Schema
export const RoleAssignmentsGetByIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(T.Http({ method: "GET", path: "/{roleAssignmentId}" }));
export type RoleAssignmentsGetByIdInput =
  typeof RoleAssignmentsGetByIdInput.Type;

// Output Schema
export const RoleAssignmentsGetByIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        scope: Schema.optional(Schema.String),
        roleDefinitionId: Schema.String,
        principalId: Schema.String,
        principalType: Schema.optional(
          Schema.Literals([
            "User",
            "Group",
            "ServicePrincipal",
            "ForeignGroup",
            "Device",
          ]),
        ),
        description: Schema.optional(Schema.String),
        condition: Schema.optional(Schema.String),
        conditionVersion: Schema.optional(Schema.String),
        createdOn: Schema.optional(Schema.String),
        updatedOn: Schema.optional(Schema.String),
        createdBy: Schema.optional(Schema.String),
        updatedBy: Schema.optional(Schema.String),
        delegatedManagedIdentityResourceId: Schema.optional(Schema.String),
      }),
    ),
  });
export type RoleAssignmentsGetByIdOutput =
  typeof RoleAssignmentsGetByIdOutput.Type;

// The operation
/**
 * Get a role assignment by ID.
 *
 * @param api-version - The API version to use for this operation.
 */
export const RoleAssignmentsGetById = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RoleAssignmentsGetByIdInput,
    outputSchema: RoleAssignmentsGetByIdOutput,
  }),
);
// Input Schema
export const RoleAssignmentsListForResourceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceProviderNamespace: Schema.String.pipe(T.PathParam()),
    resourceType: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}/providers/Microsoft.Authorization/roleAssignments",
    }),
  );
export type RoleAssignmentsListForResourceInput =
  typeof RoleAssignmentsListForResourceInput.Type;

// Output Schema
export const RoleAssignmentsListForResourceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Struct({
              scope: Schema.optional(Schema.String),
              roleDefinitionId: Schema.String,
              principalId: Schema.String,
              principalType: Schema.optional(
                Schema.Literals([
                  "User",
                  "Group",
                  "ServicePrincipal",
                  "ForeignGroup",
                  "Device",
                ]),
              ),
              description: Schema.optional(Schema.String),
              condition: Schema.optional(Schema.String),
              conditionVersion: Schema.optional(Schema.String),
              createdOn: Schema.optional(Schema.String),
              updatedOn: Schema.optional(Schema.String),
              createdBy: Schema.optional(Schema.String),
              updatedBy: Schema.optional(Schema.String),
              delegatedManagedIdentityResourceId: Schema.optional(
                Schema.String,
              ),
            }),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type RoleAssignmentsListForResourceOutput =
  typeof RoleAssignmentsListForResourceOutput.Type;

// The operation
/**
 * List all role assignments that apply to a resource.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceProviderNamespace - The namespace of the resource provider.
 * @param resourceType - The resource type name. For example the type name of a web app is 'sites' (from Microsoft.Web/sites).
 * @param resourceName - The resource name.
 * @param api-version - The API version to use for this operation.
 */
export const RoleAssignmentsListForResource =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RoleAssignmentsListForResourceInput,
    outputSchema: RoleAssignmentsListForResourceOutput,
  }));
// Input Schema
export const RoleAssignmentsListForResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Authorization/roleAssignments",
    }),
  );
export type RoleAssignmentsListForResourceGroupInput =
  typeof RoleAssignmentsListForResourceGroupInput.Type;

// Output Schema
export const RoleAssignmentsListForResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Struct({
              scope: Schema.optional(Schema.String),
              roleDefinitionId: Schema.String,
              principalId: Schema.String,
              principalType: Schema.optional(
                Schema.Literals([
                  "User",
                  "Group",
                  "ServicePrincipal",
                  "ForeignGroup",
                  "Device",
                ]),
              ),
              description: Schema.optional(Schema.String),
              condition: Schema.optional(Schema.String),
              conditionVersion: Schema.optional(Schema.String),
              createdOn: Schema.optional(Schema.String),
              updatedOn: Schema.optional(Schema.String),
              createdBy: Schema.optional(Schema.String),
              updatedBy: Schema.optional(Schema.String),
              delegatedManagedIdentityResourceId: Schema.optional(
                Schema.String,
              ),
            }),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type RoleAssignmentsListForResourceGroupOutput =
  typeof RoleAssignmentsListForResourceGroupOutput.Type;

// The operation
/**
 * List all role assignments that apply to a resource group.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const RoleAssignmentsListForResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RoleAssignmentsListForResourceGroupInput,
    outputSchema: RoleAssignmentsListForResourceGroupOutput,
  }));
// Input Schema
export const RoleAssignmentsListForScopeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scope: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/{scope}/providers/Microsoft.Authorization/roleAssignments",
    }),
  );
export type RoleAssignmentsListForScopeInput =
  typeof RoleAssignmentsListForScopeInput.Type;

// Output Schema
export const RoleAssignmentsListForScopeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Struct({
              scope: Schema.optional(Schema.String),
              roleDefinitionId: Schema.String,
              principalId: Schema.String,
              principalType: Schema.optional(
                Schema.Literals([
                  "User",
                  "Group",
                  "ServicePrincipal",
                  "ForeignGroup",
                  "Device",
                ]),
              ),
              description: Schema.optional(Schema.String),
              condition: Schema.optional(Schema.String),
              conditionVersion: Schema.optional(Schema.String),
              createdOn: Schema.optional(Schema.String),
              updatedOn: Schema.optional(Schema.String),
              createdBy: Schema.optional(Schema.String),
              updatedBy: Schema.optional(Schema.String),
              delegatedManagedIdentityResourceId: Schema.optional(
                Schema.String,
              ),
            }),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type RoleAssignmentsListForScopeOutput =
  typeof RoleAssignmentsListForScopeOutput.Type;

// The operation
/**
 * List all role assignments that apply to a scope.
 *
 * @param scope - The scope of the operation or resource. Valid scopes are: subscription (format: '/subscriptions/{subscriptionId}'), resource group (format: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}', or resource (format: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/[{parentResourcePath}/]{resourceType}/{resourceName}'
 * @param api-version - The API version to use for this operation.
 */
export const RoleAssignmentsListForScope = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RoleAssignmentsListForScopeInput,
    outputSchema: RoleAssignmentsListForScopeOutput,
  }),
);
// Input Schema
export const RoleAssignmentsListForSubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/roleAssignments",
    }),
  );
export type RoleAssignmentsListForSubscriptionInput =
  typeof RoleAssignmentsListForSubscriptionInput.Type;

// Output Schema
export const RoleAssignmentsListForSubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Struct({
              scope: Schema.optional(Schema.String),
              roleDefinitionId: Schema.String,
              principalId: Schema.String,
              principalType: Schema.optional(
                Schema.Literals([
                  "User",
                  "Group",
                  "ServicePrincipal",
                  "ForeignGroup",
                  "Device",
                ]),
              ),
              description: Schema.optional(Schema.String),
              condition: Schema.optional(Schema.String),
              conditionVersion: Schema.optional(Schema.String),
              createdOn: Schema.optional(Schema.String),
              updatedOn: Schema.optional(Schema.String),
              createdBy: Schema.optional(Schema.String),
              updatedBy: Schema.optional(Schema.String),
              delegatedManagedIdentityResourceId: Schema.optional(
                Schema.String,
              ),
            }),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type RoleAssignmentsListForSubscriptionOutput =
  typeof RoleAssignmentsListForSubscriptionOutput.Type;

// The operation
/**
 * List all role assignments that apply to a subscription.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const RoleAssignmentsListForSubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RoleAssignmentsListForSubscriptionInput,
    outputSchema: RoleAssignmentsListForSubscriptionOutput,
  }));
// Input Schema
export const RoleDefinitionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scope: Schema.String.pipe(T.PathParam()),
    roleDefinitionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/{scope}/providers/Microsoft.Authorization/roleDefinitions/{roleDefinitionId}",
    }),
  );
export type RoleDefinitionsCreateOrUpdateInput =
  typeof RoleDefinitionsCreateOrUpdateInput.Type;

// Output Schema
export const RoleDefinitionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        roleName: Schema.optional(Schema.String),
        description: Schema.optional(Schema.String),
        type: Schema.optional(Schema.String),
        permissions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              actions: Schema.optional(Schema.Array(Schema.String)),
              notActions: Schema.optional(Schema.Array(Schema.String)),
              dataActions: Schema.optional(Schema.Array(Schema.String)),
              notDataActions: Schema.optional(Schema.Array(Schema.String)),
            }),
          ),
        ),
        assignableScopes: Schema.optional(Schema.Array(Schema.String)),
        createdOn: Schema.optional(Schema.String),
        updatedOn: Schema.optional(Schema.String),
        createdBy: Schema.optional(Schema.String),
        updatedBy: Schema.optional(Schema.String),
      }),
    ),
  });
export type RoleDefinitionsCreateOrUpdateOutput =
  typeof RoleDefinitionsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a role definition.
 *
 * @param scope - The scope of the role definition.
 * @param roleDefinitionId - The ID of the role definition.
 * @param api-version - The API version to use for this operation.
 */
export const RoleDefinitionsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RoleDefinitionsCreateOrUpdateInput,
    outputSchema: RoleDefinitionsCreateOrUpdateOutput,
  }));
// Input Schema
export const RoleDefinitionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scope: Schema.String.pipe(T.PathParam()),
    roleDefinitionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/{scope}/providers/Microsoft.Authorization/roleDefinitions/{roleDefinitionId}",
    }),
  );
export type RoleDefinitionsDeleteInput = typeof RoleDefinitionsDeleteInput.Type;

// Output Schema
export const RoleDefinitionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        roleName: Schema.optional(Schema.String),
        description: Schema.optional(Schema.String),
        type: Schema.optional(Schema.String),
        permissions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              actions: Schema.optional(Schema.Array(Schema.String)),
              notActions: Schema.optional(Schema.Array(Schema.String)),
              dataActions: Schema.optional(Schema.Array(Schema.String)),
              notDataActions: Schema.optional(Schema.Array(Schema.String)),
            }),
          ),
        ),
        assignableScopes: Schema.optional(Schema.Array(Schema.String)),
        createdOn: Schema.optional(Schema.String),
        updatedOn: Schema.optional(Schema.String),
        createdBy: Schema.optional(Schema.String),
        updatedBy: Schema.optional(Schema.String),
      }),
    ),
  });
export type RoleDefinitionsDeleteOutput =
  typeof RoleDefinitionsDeleteOutput.Type;

// The operation
/**
 * Deletes a role definition.
 *
 * @param scope - The scope of the role definition.
 * @param roleDefinitionId - The ID of the role definition to delete.
 * @param api-version - The API version to use for this operation.
 */
export const RoleDefinitionsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RoleDefinitionsDeleteInput,
    outputSchema: RoleDefinitionsDeleteOutput,
  }),
);
// Input Schema
export const RoleDefinitionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scope: Schema.String.pipe(T.PathParam()),
    roleDefinitionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/{scope}/providers/Microsoft.Authorization/roleDefinitions/{roleDefinitionId}",
    }),
  );
export type RoleDefinitionsGetInput = typeof RoleDefinitionsGetInput.Type;

// Output Schema
export const RoleDefinitionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        roleName: Schema.optional(Schema.String),
        description: Schema.optional(Schema.String),
        type: Schema.optional(Schema.String),
        permissions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              actions: Schema.optional(Schema.Array(Schema.String)),
              notActions: Schema.optional(Schema.Array(Schema.String)),
              dataActions: Schema.optional(Schema.Array(Schema.String)),
              notDataActions: Schema.optional(Schema.Array(Schema.String)),
            }),
          ),
        ),
        assignableScopes: Schema.optional(Schema.Array(Schema.String)),
        createdOn: Schema.optional(Schema.String),
        updatedOn: Schema.optional(Schema.String),
        createdBy: Schema.optional(Schema.String),
        updatedBy: Schema.optional(Schema.String),
      }),
    ),
  });
export type RoleDefinitionsGetOutput = typeof RoleDefinitionsGetOutput.Type;

// The operation
/**
 * Get role definition by name (GUID).
 *
 * @param scope - The scope of the role definition.
 * @param roleDefinitionId - The ID of the role definition.
 * @param api-version - The API version to use for this operation.
 */
export const RoleDefinitionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RoleDefinitionsGetInput,
  outputSchema: RoleDefinitionsGetOutput,
}));
// Input Schema
export const RoleDefinitionsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scope: Schema.String.pipe(T.PathParam()),
    $filter: Schema.optional(Schema.String),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/{scope}/providers/Microsoft.Authorization/roleDefinitions",
    }),
  );
export type RoleDefinitionsListInput = typeof RoleDefinitionsListInput.Type;

// Output Schema
export const RoleDefinitionsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Struct({
              roleName: Schema.optional(Schema.String),
              description: Schema.optional(Schema.String),
              type: Schema.optional(Schema.String),
              permissions: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    actions: Schema.optional(Schema.Array(Schema.String)),
                    notActions: Schema.optional(Schema.Array(Schema.String)),
                    dataActions: Schema.optional(Schema.Array(Schema.String)),
                    notDataActions: Schema.optional(
                      Schema.Array(Schema.String),
                    ),
                  }),
                ),
              ),
              assignableScopes: Schema.optional(Schema.Array(Schema.String)),
              createdOn: Schema.optional(Schema.String),
              updatedOn: Schema.optional(Schema.String),
              createdBy: Schema.optional(Schema.String),
              updatedBy: Schema.optional(Schema.String),
            }),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type RoleDefinitionsListOutput = typeof RoleDefinitionsListOutput.Type;

// The operation
/**
 * Get all role definitions that are applicable at scope and above.
 *
 * @param scope - The scope of the role definition.
 * @param $filter - The filter to apply on the operation. Use atScopeAndBelow filter to search below the given scope as well.
 * @param api-version - The API version to use for this operation.
 */
export const RoleDefinitionsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RoleDefinitionsListInput,
  outputSchema: RoleDefinitionsListOutput,
}));
