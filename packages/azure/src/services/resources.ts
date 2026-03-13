/**
 * Azure Resources API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const ApplicationDefinitionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    applicationDefinitionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Solutions/applicationDefinitions/{applicationDefinitionName}",
    }),
  );
export type ApplicationDefinitionsCreateOrUpdateInput =
  typeof ApplicationDefinitionsCreateOrUpdateInput.Type;

// Output Schema
export const ApplicationDefinitionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    managedBy: Schema.optional(Schema.String),
    sku: Schema.optional(
      Schema.Struct({
        name: Schema.String,
        tier: Schema.optional(Schema.String),
        size: Schema.optional(Schema.String),
        family: Schema.optional(Schema.String),
        model: Schema.optional(Schema.String),
        capacity: Schema.optional(Schema.Number),
      }),
    ),
  });
export type ApplicationDefinitionsCreateOrUpdateOutput =
  typeof ApplicationDefinitionsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates a new managed application definition.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param applicationDefinitionName - The name of the managed application definition.
 */
export const ApplicationDefinitionsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ApplicationDefinitionsCreateOrUpdateInput,
    outputSchema: ApplicationDefinitionsCreateOrUpdateOutput,
  }));
// Input Schema
export const ApplicationDefinitionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    applicationDefinitionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Solutions/applicationDefinitions/{applicationDefinitionName}",
    }),
  );
export type ApplicationDefinitionsDeleteInput =
  typeof ApplicationDefinitionsDeleteInput.Type;

// Output Schema
export const ApplicationDefinitionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ApplicationDefinitionsDeleteOutput =
  typeof ApplicationDefinitionsDeleteOutput.Type;

// The operation
/**
 * Deletes the managed application definition.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param applicationDefinitionName - The name of the managed application definition to delete.
 */
export const ApplicationDefinitionsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ApplicationDefinitionsDeleteInput,
    outputSchema: ApplicationDefinitionsDeleteOutput,
  }));
// Input Schema
export const ApplicationDefinitionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    applicationDefinitionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Solutions/applicationDefinitions/{applicationDefinitionName}",
    }),
  );
export type ApplicationDefinitionsGetInput =
  typeof ApplicationDefinitionsGetInput.Type;

// Output Schema
export const ApplicationDefinitionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    managedBy: Schema.optional(Schema.String),
    sku: Schema.optional(
      Schema.Struct({
        name: Schema.String,
        tier: Schema.optional(Schema.String),
        size: Schema.optional(Schema.String),
        family: Schema.optional(Schema.String),
        model: Schema.optional(Schema.String),
        capacity: Schema.optional(Schema.Number),
      }),
    ),
  });
export type ApplicationDefinitionsGetOutput =
  typeof ApplicationDefinitionsGetOutput.Type;

// The operation
/**
 * Gets the managed application definition.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param applicationDefinitionName - The name of the managed application definition.
 */
export const ApplicationDefinitionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ApplicationDefinitionsGetInput,
    outputSchema: ApplicationDefinitionsGetOutput,
  }),
);
// Input Schema
export const ApplicationDefinitionsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Solutions/applicationDefinitions",
    }),
  );
export type ApplicationDefinitionsListByResourceGroupInput =
  typeof ApplicationDefinitionsListByResourceGroupInput.Type;

// Output Schema
export const ApplicationDefinitionsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          managedBy: Schema.optional(Schema.String),
          sku: Schema.optional(
            Schema.Struct({
              name: Schema.String,
              tier: Schema.optional(Schema.String),
              size: Schema.optional(Schema.String),
              family: Schema.optional(Schema.String),
              model: Schema.optional(Schema.String),
              capacity: Schema.optional(Schema.Number),
            }),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ApplicationDefinitionsListByResourceGroupOutput =
  typeof ApplicationDefinitionsListByResourceGroupOutput.Type;

// The operation
/**
 * Lists the managed application definitions in a resource group.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ApplicationDefinitionsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ApplicationDefinitionsListByResourceGroupInput,
    outputSchema: ApplicationDefinitionsListByResourceGroupOutput,
  }));
// Input Schema
export const ApplicationsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    applicationName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Solutions/applications/{applicationName}",
    }),
  );
export type ApplicationsCreateOrUpdateInput =
  typeof ApplicationsCreateOrUpdateInput.Type;

// Output Schema
export const ApplicationsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    managedBy: Schema.optional(Schema.String),
    sku: Schema.optional(
      Schema.Struct({
        name: Schema.String,
        tier: Schema.optional(Schema.String),
        size: Schema.optional(Schema.String),
        family: Schema.optional(Schema.String),
        model: Schema.optional(Schema.String),
        capacity: Schema.optional(Schema.Number),
      }),
    ),
  });
export type ApplicationsCreateOrUpdateOutput =
  typeof ApplicationsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates a new managed application.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param applicationName - The name of the managed application.
 */
export const ApplicationsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ApplicationsCreateOrUpdateInput,
    outputSchema: ApplicationsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const ApplicationsCreateOrUpdateByIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    applicationId: Schema.String.pipe(T.PathParam()),
  }).pipe(T.Http({ method: "PUT", path: "/{applicationId}" }));
export type ApplicationsCreateOrUpdateByIdInput =
  typeof ApplicationsCreateOrUpdateByIdInput.Type;

// Output Schema
export const ApplicationsCreateOrUpdateByIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    managedBy: Schema.optional(Schema.String),
    sku: Schema.optional(
      Schema.Struct({
        name: Schema.String,
        tier: Schema.optional(Schema.String),
        size: Schema.optional(Schema.String),
        family: Schema.optional(Schema.String),
        model: Schema.optional(Schema.String),
        capacity: Schema.optional(Schema.Number),
      }),
    ),
  });
export type ApplicationsCreateOrUpdateByIdOutput =
  typeof ApplicationsCreateOrUpdateByIdOutput.Type;

// The operation
/**
 * Creates a new managed application.
 *
 * @param applicationId - The fully qualified ID of the managed application, including the managed application name and the managed application resource type. Use the format, /subscriptions/{guid}/resourceGroups/{resource-group-name}/Microsoft.Solutions/applications/{application-name}
 */
export const ApplicationsCreateOrUpdateById =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ApplicationsCreateOrUpdateByIdInput,
    outputSchema: ApplicationsCreateOrUpdateByIdOutput,
  }));
// Input Schema
export const ApplicationsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    applicationName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Solutions/applications/{applicationName}",
    }),
  );
export type ApplicationsDeleteInput = typeof ApplicationsDeleteInput.Type;

// Output Schema
export const ApplicationsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ApplicationsDeleteOutput = typeof ApplicationsDeleteOutput.Type;

// The operation
/**
 * Deletes the managed application.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param applicationName - The name of the managed application.
 */
export const ApplicationsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ApplicationsDeleteInput,
  outputSchema: ApplicationsDeleteOutput,
}));
// Input Schema
export const ApplicationsDeleteByIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    applicationId: Schema.String.pipe(T.PathParam()),
  }).pipe(T.Http({ method: "DELETE", path: "/{applicationId}" }));
export type ApplicationsDeleteByIdInput =
  typeof ApplicationsDeleteByIdInput.Type;

// Output Schema
export const ApplicationsDeleteByIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ApplicationsDeleteByIdOutput =
  typeof ApplicationsDeleteByIdOutput.Type;

// The operation
/**
 * Deletes the managed application.
 *
 * @param applicationId - The fully qualified ID of the managed application, including the managed application name and the managed application resource type. Use the format, /subscriptions/{guid}/resourceGroups/{resource-group-name}/Microsoft.Solutions/applications/{application-name}
 */
export const ApplicationsDeleteById = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ApplicationsDeleteByIdInput,
    outputSchema: ApplicationsDeleteByIdOutput,
  }),
);
// Input Schema
export const ApplicationsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  applicationName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Solutions/applications/{applicationName}",
  }),
);
export type ApplicationsGetInput = typeof ApplicationsGetInput.Type;

// Output Schema
export const ApplicationsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  managedBy: Schema.optional(Schema.String),
  sku: Schema.optional(
    Schema.Struct({
      name: Schema.String,
      tier: Schema.optional(Schema.String),
      size: Schema.optional(Schema.String),
      family: Schema.optional(Schema.String),
      model: Schema.optional(Schema.String),
      capacity: Schema.optional(Schema.Number),
    }),
  ),
});
export type ApplicationsGetOutput = typeof ApplicationsGetOutput.Type;

// The operation
/**
 * Gets the managed application.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param applicationName - The name of the managed application.
 */
export const ApplicationsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ApplicationsGetInput,
  outputSchema: ApplicationsGetOutput,
}));
// Input Schema
export const ApplicationsGetByIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    applicationId: Schema.String.pipe(T.PathParam()),
  }).pipe(T.Http({ method: "GET", path: "/{applicationId}" }));
export type ApplicationsGetByIdInput = typeof ApplicationsGetByIdInput.Type;

// Output Schema
export const ApplicationsGetByIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    managedBy: Schema.optional(Schema.String),
    sku: Schema.optional(
      Schema.Struct({
        name: Schema.String,
        tier: Schema.optional(Schema.String),
        size: Schema.optional(Schema.String),
        family: Schema.optional(Schema.String),
        model: Schema.optional(Schema.String),
        capacity: Schema.optional(Schema.Number),
      }),
    ),
  });
export type ApplicationsGetByIdOutput = typeof ApplicationsGetByIdOutput.Type;

// The operation
/**
 * Gets the managed application.
 *
 * @param applicationId - The fully qualified ID of the managed application, including the managed application name and the managed application resource type. Use the format, /subscriptions/{guid}/resourceGroups/{resource-group-name}/Microsoft.Solutions/applications/{application-name}
 */
export const ApplicationsGetById = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ApplicationsGetByIdInput,
  outputSchema: ApplicationsGetByIdOutput,
}));
// Input Schema
export const ApplicationsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Solutions/applications",
    }),
  );
export type ApplicationsListByResourceGroupInput =
  typeof ApplicationsListByResourceGroupInput.Type;

// Output Schema
export const ApplicationsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          managedBy: Schema.optional(Schema.String),
          sku: Schema.optional(
            Schema.Struct({
              name: Schema.String,
              tier: Schema.optional(Schema.String),
              size: Schema.optional(Schema.String),
              family: Schema.optional(Schema.String),
              model: Schema.optional(Schema.String),
              capacity: Schema.optional(Schema.Number),
            }),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ApplicationsListByResourceGroupOutput =
  typeof ApplicationsListByResourceGroupOutput.Type;

// The operation
/**
 * Gets all the applications within a resource group.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ApplicationsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ApplicationsListByResourceGroupInput,
    outputSchema: ApplicationsListByResourceGroupOutput,
  }));
// Input Schema
export const ApplicationsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Solutions/applications",
    }),
  );
export type ApplicationsListBySubscriptionInput =
  typeof ApplicationsListBySubscriptionInput.Type;

// Output Schema
export const ApplicationsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          managedBy: Schema.optional(Schema.String),
          sku: Schema.optional(
            Schema.Struct({
              name: Schema.String,
              tier: Schema.optional(Schema.String),
              size: Schema.optional(Schema.String),
              family: Schema.optional(Schema.String),
              model: Schema.optional(Schema.String),
              capacity: Schema.optional(Schema.Number),
            }),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ApplicationsListBySubscriptionOutput =
  typeof ApplicationsListBySubscriptionOutput.Type;

// The operation
/**
 * Gets all the applications within a subscription.
 */
export const ApplicationsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ApplicationsListBySubscriptionInput,
    outputSchema: ApplicationsListBySubscriptionOutput,
  }));
// Input Schema
export const ApplicationsRefreshPermissionsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    applicationName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Solutions/applications/{applicationName}/refreshPermissions",
    }),
  );
export type ApplicationsRefreshPermissionsInput =
  typeof ApplicationsRefreshPermissionsInput.Type;

// Output Schema
export const ApplicationsRefreshPermissionsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ApplicationsRefreshPermissionsOutput =
  typeof ApplicationsRefreshPermissionsOutput.Type;

// The operation
/**
 * Refresh Permissions for application.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param applicationName - The name of the managed application.
 */
export const ApplicationsRefreshPermissions =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ApplicationsRefreshPermissionsInput,
    outputSchema: ApplicationsRefreshPermissionsOutput,
  }));
// Input Schema
export const ApplicationsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    applicationName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Solutions/applications/{applicationName}",
    }),
  );
export type ApplicationsUpdateInput = typeof ApplicationsUpdateInput.Type;

// Output Schema
export const ApplicationsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    managedBy: Schema.optional(Schema.String),
    sku: Schema.optional(
      Schema.Struct({
        name: Schema.String,
        tier: Schema.optional(Schema.String),
        size: Schema.optional(Schema.String),
        family: Schema.optional(Schema.String),
        model: Schema.optional(Schema.String),
        capacity: Schema.optional(Schema.Number),
      }),
    ),
  });
export type ApplicationsUpdateOutput = typeof ApplicationsUpdateOutput.Type;

// The operation
/**
 * Updates an existing managed application. The only value that can be updated via PATCH currently is the tags.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param applicationName - The name of the managed application.
 */
export const ApplicationsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ApplicationsUpdateInput,
  outputSchema: ApplicationsUpdateOutput,
}));
// Input Schema
export const ApplicationsUpdateByIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    applicationId: Schema.String.pipe(T.PathParam()),
  }).pipe(T.Http({ method: "PATCH", path: "/{applicationId}" }));
export type ApplicationsUpdateByIdInput =
  typeof ApplicationsUpdateByIdInput.Type;

// Output Schema
export const ApplicationsUpdateByIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    managedBy: Schema.optional(Schema.String),
    sku: Schema.optional(
      Schema.Struct({
        name: Schema.String,
        tier: Schema.optional(Schema.String),
        size: Schema.optional(Schema.String),
        family: Schema.optional(Schema.String),
        model: Schema.optional(Schema.String),
        capacity: Schema.optional(Schema.Number),
      }),
    ),
  });
export type ApplicationsUpdateByIdOutput =
  typeof ApplicationsUpdateByIdOutput.Type;

// The operation
/**
 * Updates an existing managed application. The only value that can be updated via PATCH currently is the tags.
 *
 * @param applicationId - The fully qualified ID of the managed application, including the managed application name and the managed application resource type. Use the format, /subscriptions/{guid}/resourceGroups/{resource-group-name}/Microsoft.Solutions/applications/{application-name}
 */
export const ApplicationsUpdateById = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ApplicationsUpdateByIdInput,
    outputSchema: ApplicationsUpdateByIdOutput,
  }),
);
// Input Schema
export const AuthorizationOperationsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Authorization/operations",
    }),
  );
export type AuthorizationOperationsListInput =
  typeof AuthorizationOperationsListInput.Type;

// Output Schema
export const AuthorizationOperationsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          name: Schema.optional(Schema.String),
          display: Schema.optional(
            Schema.Struct({
              provider: Schema.optional(Schema.String),
              resource: Schema.optional(Schema.String),
              operation: Schema.optional(Schema.String),
            }),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type AuthorizationOperationsListOutput =
  typeof AuthorizationOperationsListOutput.Type;

// The operation
/**
 * Lists all of the available Microsoft.Authorization REST API operations.
 *
 * @param api-version - The API version to use for this operation.
 */
export const AuthorizationOperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AuthorizationOperationsListInput,
    outputSchema: AuthorizationOperationsListOutput,
  }),
);
// Input Schema
export const ChangesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}/providers/Microsoft.Resources/changes/{changeResourceId}",
  }),
);
export type ChangesGetInput = typeof ChangesGetInput.Type;

// Output Schema
export const ChangesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
});
export type ChangesGetOutput = typeof ChangesGetOutput.Type;

// The operation
/**
 * Obtains the specified change resource for the target resource
 */
export const ChangesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ChangesGetInput,
  outputSchema: ChangesGetOutput,
}));
// Input Schema
export const ChangesListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}/providers/Microsoft.Resources/changes",
  }),
);
export type ChangesListInput = typeof ChangesListInput.Type;

// Output Schema
export const ChangesListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  nextLink: Schema.optional(Schema.String),
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        type: Schema.optional(Schema.String),
      }),
    ),
  ),
});
export type ChangesListOutput = typeof ChangesListOutput.Type;

// The operation
/**
 * Obtains a list of change resources from the past 14 days for the target resource
 */
export const ChangesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ChangesListInput,
  outputSchema: ChangesListOutput,
}));
// Input Schema
export const CheckResourceNameInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "POST",
    path: "/providers/Microsoft.Resources/checkResourceName",
  }),
);
export type CheckResourceNameInput = typeof CheckResourceNameInput.Type;

// Output Schema
export const CheckResourceNameOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    status: Schema.optional(Schema.Literals(["Allowed", "Reserved"])),
  });
export type CheckResourceNameOutput = typeof CheckResourceNameOutput.Type;

// The operation
/**
 * Checks resource name validity
 *
 * A resource name is valid if it is not a reserved word, does not contains a reserved word and does not start with a reserved word
 *
 * @param api-version - The API version to use for this operation.
 */
export const checkResourceName = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CheckResourceNameInput,
  outputSchema: CheckResourceNameOutput,
}));
// Input Schema
export const DataBoundariesGetScopeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scope: Schema.String.pipe(T.PathParam()),
    default: Schema.Literals(["default"]).pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/{scope}/providers/Microsoft.Resources/dataBoundaries/{default}",
    }),
  );
export type DataBoundariesGetScopeInput =
  typeof DataBoundariesGetScopeInput.Type;

// Output Schema
export const DataBoundariesGetScopeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DataBoundariesGetScopeOutput =
  typeof DataBoundariesGetScopeOutput.Type;

// The operation
/**
 * Get data boundary at specified scope
 *
 * @param scope - The scope at which the operation is performed.
 * @param api-version - The API version to use for this operation.
 * @param default - Default string modeled as parameter for auto generation to work correctly.
 */
export const DataBoundariesGetScope = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DataBoundariesGetScopeInput,
    outputSchema: DataBoundariesGetScopeOutput,
  }),
);
// Input Schema
export const DataBoundariesGetTenantInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    default: Schema.Literals(["default"]).pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Resources/dataBoundaries/{default}",
    }),
  );
export type DataBoundariesGetTenantInput =
  typeof DataBoundariesGetTenantInput.Type;

// Output Schema
export const DataBoundariesGetTenantOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DataBoundariesGetTenantOutput =
  typeof DataBoundariesGetTenantOutput.Type;

// The operation
/**
 * Get data boundary of tenant.
 *
 * @param api-version - The API version to use for this operation.
 * @param default - Default string modeled as parameter for auto generation to work correctly.
 */
export const DataBoundariesGetTenant = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DataBoundariesGetTenantInput,
    outputSchema: DataBoundariesGetTenantOutput,
  }),
);
// Input Schema
export const DataBoundariesPutInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    default: Schema.Literals(["default"]).pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "PUT",
    path: "/providers/Microsoft.Resources/dataBoundaries/{default}",
  }),
);
export type DataBoundariesPutInput = typeof DataBoundariesPutInput.Type;

// Output Schema
export const DataBoundariesPutOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DataBoundariesPutOutput = typeof DataBoundariesPutOutput.Type;

// The operation
/**
 * Opt-in tenant to data boundary.
 *
 * @param api-version - The API version to use for this operation.
 * @param default - Default string modeled as parameter for auto generation to work correctly.
 */
export const DataBoundariesPut = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DataBoundariesPutInput,
  outputSchema: DataBoundariesPutOutput,
}));
// Input Schema
export const DataPolicyManifestsGetByPolicyModeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    policyMode: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Authorization/dataPolicyManifests/{policyMode}",
    }),
  );
export type DataPolicyManifestsGetByPolicyModeInput =
  typeof DataPolicyManifestsGetByPolicyModeInput.Type;

// Output Schema
export const DataPolicyManifestsGetByPolicyModeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DataPolicyManifestsGetByPolicyModeOutput =
  typeof DataPolicyManifestsGetByPolicyModeOutput.Type;

// The operation
/**
 * Retrieves a data policy manifest.
 *
 * This operation retrieves the data policy manifest with the given policy mode.
 *
 * @param api-version - The API version to use for this operation.
 * @param policyMode - The policy mode of the data policy manifest to get.
 */
export const DataPolicyManifestsGetByPolicyMode =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DataPolicyManifestsGetByPolicyModeInput,
    outputSchema: DataPolicyManifestsGetByPolicyModeOutput,
  }));
// Input Schema
export const DataPolicyManifestsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
    $filter: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Authorization/dataPolicyManifests",
    }),
  );
export type DataPolicyManifestsListInput =
  typeof DataPolicyManifestsListInput.Type;

// Output Schema
export const DataPolicyManifestsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type DataPolicyManifestsListOutput =
  typeof DataPolicyManifestsListOutput.Type;

// The operation
/**
 * Retrieves data policy manifests.
 *
 * This operation retrieves a list of all the data policy manifests that match the optional given $filter. Valid values for $filter are: \\"$filter=namespace eq '{0}'\\". If $filter is not provided, the unfiltered list includes all data policy manifests for data resource types. If $filter=namespace is provided, the returned list only includes all data policy manifests that have a namespace matching the provided value.
 *
 * @param api-version - The API version to use for this operation.
 * @param $filter - The filter to apply on the operation. Valid values for $filter are: \\"namespace eq '{value}'\\". If $filter is not provided, no filtering is performed. If $filter=namespace eq '{value}' is provided, the returned list only includes all data policy manifests that have a namespace matching the provided value.
 */
export const DataPolicyManifestsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DataPolicyManifestsListInput,
    outputSchema: DataPolicyManifestsListOutput,
  }),
);
// Input Schema
export const DecompileBicepInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.Resources/decompileBicep",
  }),
);
export type DecompileBicepInput = typeof DecompileBicepInput.Type;

// Output Schema
export const DecompileBicepOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  files: Schema.Array(
    Schema.Struct({
      path: Schema.optional(Schema.String),
      contents: Schema.optional(Schema.String),
    }),
  ),
  entryPoint: Schema.String,
});
export type DecompileBicepOutput = typeof DecompileBicepOutput.Type;

// The operation
/**
 * Decompiles an ARM json template into a Bicep template
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const DecompileBicep = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DecompileBicepInput,
  outputSchema: DecompileBicepOutput,
}));
// Input Schema
export const DeploymentsCalculateTemplateHashInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.Resources/calculateTemplateHash",
    }),
  );
export type DeploymentsCalculateTemplateHashInput =
  typeof DeploymentsCalculateTemplateHashInput.Type;

// Output Schema
export const DeploymentsCalculateTemplateHashOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    minifiedTemplate: Schema.optional(Schema.String),
    templateHash: Schema.optional(Schema.String),
  });
export type DeploymentsCalculateTemplateHashOutput =
  typeof DeploymentsCalculateTemplateHashOutput.Type;

// The operation
/**
 * Calculate the hash of the given template.
 */
export const DeploymentsCalculateTemplateHash =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeploymentsCalculateTemplateHashInput,
    outputSchema: DeploymentsCalculateTemplateHashOutput,
  }));
// Input Schema
export const DeploymentsCancelInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    resourceGroupName: Schema.String.pipe(T.PathParam()),
  },
).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Resources/deployments/{deploymentName}/cancel",
  }),
);
export type DeploymentsCancelInput = typeof DeploymentsCancelInput.Type;

// Output Schema
export const DeploymentsCancelOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DeploymentsCancelOutput = typeof DeploymentsCancelOutput.Type;

// The operation
/**
 * Cancels a currently running template deployment.
 *
 * You can cancel a deployment only if the provisioningState is Accepted or Running. After the deployment is canceled, the provisioningState is set to Canceled. Canceling a template deployment stops the currently running template deployment and leaves the resource group partially deployed.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const DeploymentsCancel = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DeploymentsCancelInput,
  outputSchema: DeploymentsCancelOutput,
}));
// Input Schema
export const DeploymentsCancelAtManagementGroupScopeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.Management/managementGroups/{groupId}/providers/Microsoft.Resources/deployments/{deploymentName}/cancel",
    }),
  );
export type DeploymentsCancelAtManagementGroupScopeInput =
  typeof DeploymentsCancelAtManagementGroupScopeInput.Type;

// Output Schema
export const DeploymentsCancelAtManagementGroupScopeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DeploymentsCancelAtManagementGroupScopeOutput =
  typeof DeploymentsCancelAtManagementGroupScopeOutput.Type;

// The operation
/**
 * Cancels a currently running template deployment.
 *
 * You can cancel a deployment only if the provisioningState is Accepted or Running. After the deployment is canceled, the provisioningState is set to Canceled. Canceling a template deployment stops the currently running template deployment and leaves the resources partially deployed.
 */
export const DeploymentsCancelAtManagementGroupScope =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeploymentsCancelAtManagementGroupScopeInput,
    outputSchema: DeploymentsCancelAtManagementGroupScopeOutput,
  }));
// Input Schema
export const DeploymentsCancelAtScopeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/{scope}/providers/Microsoft.Resources/deployments/{deploymentName}/cancel",
    }),
  );
export type DeploymentsCancelAtScopeInput =
  typeof DeploymentsCancelAtScopeInput.Type;

// Output Schema
export const DeploymentsCancelAtScopeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DeploymentsCancelAtScopeOutput =
  typeof DeploymentsCancelAtScopeOutput.Type;

// The operation
/**
 * Cancels a currently running template deployment.
 *
 * You can cancel a deployment only if the provisioningState is Accepted or Running. After the deployment is canceled, the provisioningState is set to Canceled. Canceling a template deployment stops the currently running template deployment and leaves the resources partially deployed.
 */
export const DeploymentsCancelAtScope = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DeploymentsCancelAtScopeInput,
    outputSchema: DeploymentsCancelAtScopeOutput,
  }),
);
// Input Schema
export const DeploymentsCancelAtSubscriptionScopeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Resources/deployments/{deploymentName}/cancel",
    }),
  );
export type DeploymentsCancelAtSubscriptionScopeInput =
  typeof DeploymentsCancelAtSubscriptionScopeInput.Type;

// Output Schema
export const DeploymentsCancelAtSubscriptionScopeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DeploymentsCancelAtSubscriptionScopeOutput =
  typeof DeploymentsCancelAtSubscriptionScopeOutput.Type;

// The operation
/**
 * Cancels a currently running template deployment.
 *
 * You can cancel a deployment only if the provisioningState is Accepted or Running. After the deployment is canceled, the provisioningState is set to Canceled. Canceling a template deployment stops the currently running template deployment and leaves the resources partially deployed.
 */
export const DeploymentsCancelAtSubscriptionScope =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeploymentsCancelAtSubscriptionScopeInput,
    outputSchema: DeploymentsCancelAtSubscriptionScopeOutput,
  }));
// Input Schema
export const DeploymentsCancelAtTenantScopeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.Resources/deployments/{deploymentName}/cancel",
    }),
  );
export type DeploymentsCancelAtTenantScopeInput =
  typeof DeploymentsCancelAtTenantScopeInput.Type;

// Output Schema
export const DeploymentsCancelAtTenantScopeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DeploymentsCancelAtTenantScopeOutput =
  typeof DeploymentsCancelAtTenantScopeOutput.Type;

// The operation
/**
 * Cancels a currently running template deployment.
 *
 * You can cancel a deployment only if the provisioningState is Accepted or Running. After the deployment is canceled, the provisioningState is set to Canceled. Canceling a template deployment stops the currently running template deployment and leaves the resources partially deployed.
 */
export const DeploymentsCancelAtTenantScope =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeploymentsCancelAtTenantScopeInput,
    outputSchema: DeploymentsCancelAtTenantScopeOutput,
  }));
// Input Schema
export const DeploymentScriptsCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    scriptName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Resources/deploymentScripts/{scriptName}",
    }),
  );
export type DeploymentScriptsCreateInput =
  typeof DeploymentScriptsCreateInput.Type;

// Output Schema
export const DeploymentScriptsCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type DeploymentScriptsCreateOutput =
  typeof DeploymentScriptsCreateOutput.Type;

// The operation
/**
 * Creates a deployment script.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param scriptName - Name of the deployment script.
 */
export const DeploymentScriptsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DeploymentScriptsCreateInput,
    outputSchema: DeploymentScriptsCreateOutput,
  }),
);
// Input Schema
export const DeploymentScriptsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    scriptName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Resources/deploymentScripts/{scriptName}",
    }),
  );
export type DeploymentScriptsDeleteInput =
  typeof DeploymentScriptsDeleteInput.Type;

// Output Schema
export const DeploymentScriptsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DeploymentScriptsDeleteOutput =
  typeof DeploymentScriptsDeleteOutput.Type;

// The operation
/**
 * Deletes a deployment script. When operation completes, status code 200 returned without content.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param scriptName - Name of the deployment script.
 */
export const DeploymentScriptsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DeploymentScriptsDeleteInput,
    outputSchema: DeploymentScriptsDeleteOutput,
  }),
);
// Input Schema
export const DeploymentScriptsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    scriptName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Resources/deploymentScripts/{scriptName}",
    }),
  );
export type DeploymentScriptsGetInput = typeof DeploymentScriptsGetInput.Type;

// Output Schema
export const DeploymentScriptsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type DeploymentScriptsGetOutput = typeof DeploymentScriptsGetOutput.Type;

// The operation
/**
 * Gets a deployment script with a given name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param scriptName - Name of the deployment script.
 */
export const DeploymentScriptsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DeploymentScriptsGetInput,
    outputSchema: DeploymentScriptsGetOutput,
  }),
);
// Input Schema
export const DeploymentScriptsGetLogsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    scriptName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Resources/deploymentScripts/{scriptName}/logs",
    }),
  );
export type DeploymentScriptsGetLogsInput =
  typeof DeploymentScriptsGetLogsInput.Type;

// Output Schema
export const DeploymentScriptsGetLogsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
  });
export type DeploymentScriptsGetLogsOutput =
  typeof DeploymentScriptsGetLogsOutput.Type;

// The operation
/**
 * Gets deployment script logs for a given deployment script name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param scriptName - Name of the deployment script.
 */
export const DeploymentScriptsGetLogs = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DeploymentScriptsGetLogsInput,
    outputSchema: DeploymentScriptsGetLogsOutput,
  }),
);
// Input Schema
export const DeploymentScriptsGetLogsDefaultInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    scriptName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    tail: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Resources/deploymentScripts/{scriptName}/logs/default",
    }),
  );
export type DeploymentScriptsGetLogsDefaultInput =
  typeof DeploymentScriptsGetLogsDefaultInput.Type;

// Output Schema
export const DeploymentScriptsGetLogsDefaultOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DeploymentScriptsGetLogsDefaultOutput =
  typeof DeploymentScriptsGetLogsDefaultOutput.Type;

// The operation
/**
 * Gets deployment script logs for a given deployment script name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param scriptName - Name of the deployment script.
 * @param tail - The number of lines to show from the tail of the deployment script log. Valid value is a positive number up to 1000. If 'tail' is not provided, all available logs are shown up to container instance log capacity of 4mb.
 */
export const DeploymentScriptsGetLogsDefault =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeploymentScriptsGetLogsDefaultInput,
    outputSchema: DeploymentScriptsGetLogsDefaultOutput,
  }));
// Input Schema
export const DeploymentScriptsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Resources/deploymentScripts",
    }),
  );
export type DeploymentScriptsListByResourceGroupInput =
  typeof DeploymentScriptsListByResourceGroupInput.Type;

// Output Schema
export const DeploymentScriptsListByResourceGroupOutput =
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
export type DeploymentScriptsListByResourceGroupOutput =
  typeof DeploymentScriptsListByResourceGroupOutput.Type;

// The operation
/**
 * Lists deployments scripts.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const DeploymentScriptsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeploymentScriptsListByResourceGroupInput,
    outputSchema: DeploymentScriptsListByResourceGroupOutput,
  }));
// Input Schema
export const DeploymentScriptsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Resources/deploymentScripts",
    }),
  );
export type DeploymentScriptsListBySubscriptionInput =
  typeof DeploymentScriptsListBySubscriptionInput.Type;

// Output Schema
export const DeploymentScriptsListBySubscriptionOutput =
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
export type DeploymentScriptsListBySubscriptionOutput =
  typeof DeploymentScriptsListBySubscriptionOutput.Type;

// The operation
/**
 * Lists all deployment scripts for a given subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const DeploymentScriptsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeploymentScriptsListBySubscriptionInput,
    outputSchema: DeploymentScriptsListBySubscriptionOutput,
  }));
// Input Schema
export const DeploymentScriptsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    scriptName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Resources/deploymentScripts/{scriptName}",
    }),
  );
export type DeploymentScriptsUpdateInput =
  typeof DeploymentScriptsUpdateInput.Type;

// Output Schema
export const DeploymentScriptsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type DeploymentScriptsUpdateOutput =
  typeof DeploymentScriptsUpdateOutput.Type;

// The operation
/**
 * Updates deployment script tags with specified values.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param scriptName - Name of the deployment script.
 */
export const DeploymentScriptsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DeploymentScriptsUpdateInput,
    outputSchema: DeploymentScriptsUpdateOutput,
  }),
);
// Input Schema
export const DeploymentsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    resourceGroupName: Schema.String.pipe(T.PathParam()),
  },
).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Resources/deployments/{deploymentName}",
  }),
);
export type DeploymentsDeleteInput = typeof DeploymentsDeleteInput.Type;

// Output Schema
export const DeploymentsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DeploymentsDeleteOutput = typeof DeploymentsDeleteOutput.Type;

// The operation
/**
 * Deletes a deployment from the deployment history.
 *
 * A template deployment that is currently running cannot be deleted. Deleting a template deployment removes the associated deployment operations. Deleting a template deployment does not affect the state of the resource group. This is an asynchronous operation that returns a status of 202 until the template deployment is successfully deleted. The Location response header contains the URI that is used to obtain the status of the process. While the process is running, a call to the URI in the Location header returns a status of 202. When the process finishes, the URI in the Location header returns a status of 204 on success. If the asynchronous request failed, the URI in the Location header returns an error-level status code.
 *
 * @param resourceGroupName - The name of the resource group with the deployment to delete. The name is case insensitive.
 */
export const DeploymentsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DeploymentsDeleteInput,
  outputSchema: DeploymentsDeleteOutput,
}));
// Input Schema
export const DeploymentsDeleteAtManagementGroupScopeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "DELETE",
      path: "/providers/Microsoft.Management/managementGroups/{groupId}/providers/Microsoft.Resources/deployments/{deploymentName}",
    }),
  );
export type DeploymentsDeleteAtManagementGroupScopeInput =
  typeof DeploymentsDeleteAtManagementGroupScopeInput.Type;

// Output Schema
export const DeploymentsDeleteAtManagementGroupScopeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DeploymentsDeleteAtManagementGroupScopeOutput =
  typeof DeploymentsDeleteAtManagementGroupScopeOutput.Type;

// The operation
/**
 * Deletes a deployment from the deployment history.
 *
 * A template deployment that is currently running cannot be deleted. Deleting a template deployment removes the associated deployment operations. This is an asynchronous operation that returns a status of 202 until the template deployment is successfully deleted. The Location response header contains the URI that is used to obtain the status of the process. While the process is running, a call to the URI in the Location header returns a status of 202. When the process finishes, the URI in the Location header returns a status of 204 on success. If the asynchronous request failed, the URI in the Location header returns an error-level status code.
 */
export const DeploymentsDeleteAtManagementGroupScope =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeploymentsDeleteAtManagementGroupScopeInput,
    outputSchema: DeploymentsDeleteAtManagementGroupScopeOutput,
  }));
// Input Schema
export const DeploymentsDeleteAtScopeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "DELETE",
      path: "/{scope}/providers/Microsoft.Resources/deployments/{deploymentName}",
    }),
  );
export type DeploymentsDeleteAtScopeInput =
  typeof DeploymentsDeleteAtScopeInput.Type;

// Output Schema
export const DeploymentsDeleteAtScopeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DeploymentsDeleteAtScopeOutput =
  typeof DeploymentsDeleteAtScopeOutput.Type;

// The operation
/**
 * Deletes a deployment from the deployment history.
 *
 * A template deployment that is currently running cannot be deleted. Deleting a template deployment removes the associated deployment operations. This is an asynchronous operation that returns a status of 202 until the template deployment is successfully deleted. The Location response header contains the URI that is used to obtain the status of the process. While the process is running, a call to the URI in the Location header returns a status of 202. When the process finishes, the URI in the Location header returns a status of 204 on success. If the asynchronous request failed, the URI in the Location header returns an error-level status code.
 */
export const DeploymentsDeleteAtScope = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DeploymentsDeleteAtScopeInput,
    outputSchema: DeploymentsDeleteAtScopeOutput,
  }),
);
// Input Schema
export const DeploymentsDeleteAtSubscriptionScopeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Resources/deployments/{deploymentName}",
    }),
  );
export type DeploymentsDeleteAtSubscriptionScopeInput =
  typeof DeploymentsDeleteAtSubscriptionScopeInput.Type;

// Output Schema
export const DeploymentsDeleteAtSubscriptionScopeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DeploymentsDeleteAtSubscriptionScopeOutput =
  typeof DeploymentsDeleteAtSubscriptionScopeOutput.Type;

// The operation
/**
 * Deletes a deployment from the deployment history.
 *
 * A template deployment that is currently running cannot be deleted. Deleting a template deployment removes the associated deployment operations. This is an asynchronous operation that returns a status of 202 until the template deployment is successfully deleted. The Location response header contains the URI that is used to obtain the status of the process. While the process is running, a call to the URI in the Location header returns a status of 202. When the process finishes, the URI in the Location header returns a status of 204 on success. If the asynchronous request failed, the URI in the Location header returns an error-level status code.
 */
export const DeploymentsDeleteAtSubscriptionScope =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeploymentsDeleteAtSubscriptionScopeInput,
    outputSchema: DeploymentsDeleteAtSubscriptionScopeOutput,
  }));
// Input Schema
export const DeploymentsDeleteAtTenantScopeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "DELETE",
      path: "/providers/Microsoft.Resources/deployments/{deploymentName}",
    }),
  );
export type DeploymentsDeleteAtTenantScopeInput =
  typeof DeploymentsDeleteAtTenantScopeInput.Type;

// Output Schema
export const DeploymentsDeleteAtTenantScopeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DeploymentsDeleteAtTenantScopeOutput =
  typeof DeploymentsDeleteAtTenantScopeOutput.Type;

// The operation
/**
 * Deletes a deployment from the deployment history.
 *
 * A template deployment that is currently running cannot be deleted. Deleting a template deployment removes the associated deployment operations. This is an asynchronous operation that returns a status of 202 until the template deployment is successfully deleted. The Location response header contains the URI that is used to obtain the status of the process. While the process is running, a call to the URI in the Location header returns a status of 202. When the process finishes, the URI in the Location header returns a status of 204 on success. If the asynchronous request failed, the URI in the Location header returns an error-level status code.
 */
export const DeploymentsDeleteAtTenantScope =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeploymentsDeleteAtTenantScopeInput,
    outputSchema: DeploymentsDeleteAtTenantScopeOutput,
  }));
// Input Schema
export const DeploymentsExportTemplateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Resources/deployments/{deploymentName}/exportTemplate",
    }),
  );
export type DeploymentsExportTemplateInput =
  typeof DeploymentsExportTemplateInput.Type;

// Output Schema
export const DeploymentsExportTemplateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    template: Schema.optional(Schema.Unknown),
  });
export type DeploymentsExportTemplateOutput =
  typeof DeploymentsExportTemplateOutput.Type;

// The operation
/**
 * Exports the template used for specified deployment.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const DeploymentsExportTemplate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DeploymentsExportTemplateInput,
    outputSchema: DeploymentsExportTemplateOutput,
  }),
);
// Input Schema
export const DeploymentsExportTemplateAtManagementGroupScopeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.Management/managementGroups/{groupId}/providers/Microsoft.Resources/deployments/{deploymentName}/exportTemplate",
    }),
  );
export type DeploymentsExportTemplateAtManagementGroupScopeInput =
  typeof DeploymentsExportTemplateAtManagementGroupScopeInput.Type;

// Output Schema
export const DeploymentsExportTemplateAtManagementGroupScopeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    template: Schema.optional(Schema.Unknown),
  });
export type DeploymentsExportTemplateAtManagementGroupScopeOutput =
  typeof DeploymentsExportTemplateAtManagementGroupScopeOutput.Type;

// The operation
/**
 * Exports the template used for specified deployment.
 */
export const DeploymentsExportTemplateAtManagementGroupScope =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeploymentsExportTemplateAtManagementGroupScopeInput,
    outputSchema: DeploymentsExportTemplateAtManagementGroupScopeOutput,
  }));
// Input Schema
export const DeploymentsExportTemplateAtScopeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/{scope}/providers/Microsoft.Resources/deployments/{deploymentName}/exportTemplate",
    }),
  );
export type DeploymentsExportTemplateAtScopeInput =
  typeof DeploymentsExportTemplateAtScopeInput.Type;

// Output Schema
export const DeploymentsExportTemplateAtScopeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    template: Schema.optional(Schema.Unknown),
  });
export type DeploymentsExportTemplateAtScopeOutput =
  typeof DeploymentsExportTemplateAtScopeOutput.Type;

// The operation
/**
 * Exports the template used for specified deployment.
 */
export const DeploymentsExportTemplateAtScope =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeploymentsExportTemplateAtScopeInput,
    outputSchema: DeploymentsExportTemplateAtScopeOutput,
  }));
// Input Schema
export const DeploymentsExportTemplateAtSubscriptionScopeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Resources/deployments/{deploymentName}/exportTemplate",
    }),
  );
export type DeploymentsExportTemplateAtSubscriptionScopeInput =
  typeof DeploymentsExportTemplateAtSubscriptionScopeInput.Type;

// Output Schema
export const DeploymentsExportTemplateAtSubscriptionScopeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    template: Schema.optional(Schema.Unknown),
  });
export type DeploymentsExportTemplateAtSubscriptionScopeOutput =
  typeof DeploymentsExportTemplateAtSubscriptionScopeOutput.Type;

// The operation
/**
 * Exports the template used for specified deployment.
 */
export const DeploymentsExportTemplateAtSubscriptionScope =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeploymentsExportTemplateAtSubscriptionScopeInput,
    outputSchema: DeploymentsExportTemplateAtSubscriptionScopeOutput,
  }));
// Input Schema
export const DeploymentsExportTemplateAtTenantScopeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.Resources/deployments/{deploymentName}/exportTemplate",
    }),
  );
export type DeploymentsExportTemplateAtTenantScopeInput =
  typeof DeploymentsExportTemplateAtTenantScopeInput.Type;

// Output Schema
export const DeploymentsExportTemplateAtTenantScopeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    template: Schema.optional(Schema.Unknown),
  });
export type DeploymentsExportTemplateAtTenantScopeOutput =
  typeof DeploymentsExportTemplateAtTenantScopeOutput.Type;

// The operation
/**
 * Exports the template used for specified deployment.
 */
export const DeploymentsExportTemplateAtTenantScope =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeploymentsExportTemplateAtTenantScopeInput,
    outputSchema: DeploymentsExportTemplateAtTenantScopeOutput,
  }));
// Input Schema
export const DeploymentStacksCreateOrUpdateAtManagementGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    managementGroupId: Schema.String.pipe(T.PathParam()),
    deploymentStackName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Resources/deploymentStacks/{deploymentStackName}",
    }),
  );
export type DeploymentStacksCreateOrUpdateAtManagementGroupInput =
  typeof DeploymentStacksCreateOrUpdateAtManagementGroupInput.Type;

// Output Schema
export const DeploymentStacksCreateOrUpdateAtManagementGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DeploymentStacksCreateOrUpdateAtManagementGroupOutput =
  typeof DeploymentStacksCreateOrUpdateAtManagementGroupOutput.Type;

// The operation
/**
 * Creates or updates a Deployment stack at the specified scope.
 *
 * @param api-version - The API version to use for this operation.
 * @param managementGroupId - The management group ID.
 * @param deploymentStackName - Name of the deployment stack.
 */
export const DeploymentStacksCreateOrUpdateAtManagementGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeploymentStacksCreateOrUpdateAtManagementGroupInput,
    outputSchema: DeploymentStacksCreateOrUpdateAtManagementGroupOutput,
  }));
// Input Schema
export const DeploymentStacksCreateOrUpdateAtResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    deploymentStackName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Resources/deploymentStacks/{deploymentStackName}",
    }),
  );
export type DeploymentStacksCreateOrUpdateAtResourceGroupInput =
  typeof DeploymentStacksCreateOrUpdateAtResourceGroupInput.Type;

// Output Schema
export const DeploymentStacksCreateOrUpdateAtResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DeploymentStacksCreateOrUpdateAtResourceGroupOutput =
  typeof DeploymentStacksCreateOrUpdateAtResourceGroupOutput.Type;

// The operation
/**
 * Creates or updates a Deployment stack at the specified scope.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param deploymentStackName - Name of the deployment stack.
 */
export const DeploymentStacksCreateOrUpdateAtResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeploymentStacksCreateOrUpdateAtResourceGroupInput,
    outputSchema: DeploymentStacksCreateOrUpdateAtResourceGroupOutput,
  }));
// Input Schema
export const DeploymentStacksCreateOrUpdateAtSubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    deploymentStackName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Resources/deploymentStacks/{deploymentStackName}",
    }),
  );
export type DeploymentStacksCreateOrUpdateAtSubscriptionInput =
  typeof DeploymentStacksCreateOrUpdateAtSubscriptionInput.Type;

// Output Schema
export const DeploymentStacksCreateOrUpdateAtSubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DeploymentStacksCreateOrUpdateAtSubscriptionOutput =
  typeof DeploymentStacksCreateOrUpdateAtSubscriptionOutput.Type;

// The operation
/**
 * Creates or updates a Deployment stack at the specified scope.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param deploymentStackName - Name of the deployment stack.
 */
export const DeploymentStacksCreateOrUpdateAtSubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeploymentStacksCreateOrUpdateAtSubscriptionInput,
    outputSchema: DeploymentStacksCreateOrUpdateAtSubscriptionOutput,
  }));
// Input Schema
export const DeploymentStacksDeleteAtManagementGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    managementGroupId: Schema.String.pipe(T.PathParam()),
    deploymentStackName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Resources/deploymentStacks/{deploymentStackName}",
    }),
  );
export type DeploymentStacksDeleteAtManagementGroupInput =
  typeof DeploymentStacksDeleteAtManagementGroupInput.Type;

// Output Schema
export const DeploymentStacksDeleteAtManagementGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DeploymentStacksDeleteAtManagementGroupOutput =
  typeof DeploymentStacksDeleteAtManagementGroupOutput.Type;

// The operation
/**
 * Deletes a Deployment stack by name at the specified scope. When operation completes, status code 200 returned without content.
 *
 * @param api-version - The API version to use for this operation.
 * @param managementGroupId - The management group ID.
 * @param deploymentStackName - Name of the deployment stack.
 */
export const DeploymentStacksDeleteAtManagementGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeploymentStacksDeleteAtManagementGroupInput,
    outputSchema: DeploymentStacksDeleteAtManagementGroupOutput,
  }));
// Input Schema
export const DeploymentStacksDeleteAtResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    deploymentStackName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Resources/deploymentStacks/{deploymentStackName}",
    }),
  );
export type DeploymentStacksDeleteAtResourceGroupInput =
  typeof DeploymentStacksDeleteAtResourceGroupInput.Type;

// Output Schema
export const DeploymentStacksDeleteAtResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DeploymentStacksDeleteAtResourceGroupOutput =
  typeof DeploymentStacksDeleteAtResourceGroupOutput.Type;

// The operation
/**
 * Deletes a Deployment stack by name at the specified scope. When operation completes, status code 200 returned without content.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param deploymentStackName - Name of the deployment stack.
 */
export const DeploymentStacksDeleteAtResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeploymentStacksDeleteAtResourceGroupInput,
    outputSchema: DeploymentStacksDeleteAtResourceGroupOutput,
  }));
// Input Schema
export const DeploymentStacksDeleteAtSubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    deploymentStackName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Resources/deploymentStacks/{deploymentStackName}",
    }),
  );
export type DeploymentStacksDeleteAtSubscriptionInput =
  typeof DeploymentStacksDeleteAtSubscriptionInput.Type;

// Output Schema
export const DeploymentStacksDeleteAtSubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DeploymentStacksDeleteAtSubscriptionOutput =
  typeof DeploymentStacksDeleteAtSubscriptionOutput.Type;

// The operation
/**
 * Deletes a Deployment stack by name at the specified scope. When operation completes, status code 200 returned without content.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param deploymentStackName - Name of the deployment stack.
 */
export const DeploymentStacksDeleteAtSubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeploymentStacksDeleteAtSubscriptionInput,
    outputSchema: DeploymentStacksDeleteAtSubscriptionOutput,
  }));
// Input Schema
export const DeploymentStacksExportTemplateAtManagementGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    managementGroupId: Schema.String.pipe(T.PathParam()),
    deploymentStackName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Resources/deploymentStacks/{deploymentStackName}/exportTemplate",
    }),
  );
export type DeploymentStacksExportTemplateAtManagementGroupInput =
  typeof DeploymentStacksExportTemplateAtManagementGroupInput.Type;

// Output Schema
export const DeploymentStacksExportTemplateAtManagementGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    template: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    templateLink: Schema.optional(
      Schema.Struct({
        uri: Schema.optional(Schema.String),
        id: Schema.optional(Schema.String),
        relativePath: Schema.optional(Schema.String),
        queryString: Schema.optional(Schema.String),
        contentVersion: Schema.optional(Schema.String),
      }),
    ),
  });
export type DeploymentStacksExportTemplateAtManagementGroupOutput =
  typeof DeploymentStacksExportTemplateAtManagementGroupOutput.Type;

// The operation
/**
 * Exports the template used to create the Deployment stack at the specified scope.
 *
 * @param api-version - The API version to use for this operation.
 * @param managementGroupId - The management group ID.
 * @param deploymentStackName - Name of the deployment stack.
 */
export const DeploymentStacksExportTemplateAtManagementGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeploymentStacksExportTemplateAtManagementGroupInput,
    outputSchema: DeploymentStacksExportTemplateAtManagementGroupOutput,
  }));
// Input Schema
export const DeploymentStacksExportTemplateAtResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    deploymentStackName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Resources/deploymentStacks/{deploymentStackName}/exportTemplate",
    }),
  );
export type DeploymentStacksExportTemplateAtResourceGroupInput =
  typeof DeploymentStacksExportTemplateAtResourceGroupInput.Type;

// Output Schema
export const DeploymentStacksExportTemplateAtResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    template: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    templateLink: Schema.optional(
      Schema.Struct({
        uri: Schema.optional(Schema.String),
        id: Schema.optional(Schema.String),
        relativePath: Schema.optional(Schema.String),
        queryString: Schema.optional(Schema.String),
        contentVersion: Schema.optional(Schema.String),
      }),
    ),
  });
export type DeploymentStacksExportTemplateAtResourceGroupOutput =
  typeof DeploymentStacksExportTemplateAtResourceGroupOutput.Type;

// The operation
/**
 * Exports the template used to create the Deployment stack at the specified scope.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param deploymentStackName - Name of the deployment stack.
 */
export const DeploymentStacksExportTemplateAtResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeploymentStacksExportTemplateAtResourceGroupInput,
    outputSchema: DeploymentStacksExportTemplateAtResourceGroupOutput,
  }));
// Input Schema
export const DeploymentStacksExportTemplateAtSubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    deploymentStackName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Resources/deploymentStacks/{deploymentStackName}/exportTemplate",
    }),
  );
export type DeploymentStacksExportTemplateAtSubscriptionInput =
  typeof DeploymentStacksExportTemplateAtSubscriptionInput.Type;

// Output Schema
export const DeploymentStacksExportTemplateAtSubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    template: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    templateLink: Schema.optional(
      Schema.Struct({
        uri: Schema.optional(Schema.String),
        id: Schema.optional(Schema.String),
        relativePath: Schema.optional(Schema.String),
        queryString: Schema.optional(Schema.String),
        contentVersion: Schema.optional(Schema.String),
      }),
    ),
  });
export type DeploymentStacksExportTemplateAtSubscriptionOutput =
  typeof DeploymentStacksExportTemplateAtSubscriptionOutput.Type;

// The operation
/**
 * Exports the template used to create the Deployment stack at the specified scope.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param deploymentStackName - Name of the deployment stack.
 */
export const DeploymentStacksExportTemplateAtSubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeploymentStacksExportTemplateAtSubscriptionInput,
    outputSchema: DeploymentStacksExportTemplateAtSubscriptionOutput,
  }));
// Input Schema
export const DeploymentStacksGetAtManagementGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    managementGroupId: Schema.String.pipe(T.PathParam()),
    deploymentStackName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Resources/deploymentStacks/{deploymentStackName}",
    }),
  );
export type DeploymentStacksGetAtManagementGroupInput =
  typeof DeploymentStacksGetAtManagementGroupInput.Type;

// Output Schema
export const DeploymentStacksGetAtManagementGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DeploymentStacksGetAtManagementGroupOutput =
  typeof DeploymentStacksGetAtManagementGroupOutput.Type;

// The operation
/**
 * Gets the Deployment stack with the given name.
 *
 * @param api-version - The API version to use for this operation.
 * @param managementGroupId - The management group ID.
 * @param deploymentStackName - Name of the deployment stack.
 */
export const DeploymentStacksGetAtManagementGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeploymentStacksGetAtManagementGroupInput,
    outputSchema: DeploymentStacksGetAtManagementGroupOutput,
  }));
// Input Schema
export const DeploymentStacksGetAtResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    deploymentStackName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Resources/deploymentStacks/{deploymentStackName}",
    }),
  );
export type DeploymentStacksGetAtResourceGroupInput =
  typeof DeploymentStacksGetAtResourceGroupInput.Type;

// Output Schema
export const DeploymentStacksGetAtResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DeploymentStacksGetAtResourceGroupOutput =
  typeof DeploymentStacksGetAtResourceGroupOutput.Type;

// The operation
/**
 * Gets the Deployment stack with the given name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param deploymentStackName - Name of the deployment stack.
 */
export const DeploymentStacksGetAtResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeploymentStacksGetAtResourceGroupInput,
    outputSchema: DeploymentStacksGetAtResourceGroupOutput,
  }));
// Input Schema
export const DeploymentStacksGetAtSubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    deploymentStackName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Resources/deploymentStacks/{deploymentStackName}",
    }),
  );
export type DeploymentStacksGetAtSubscriptionInput =
  typeof DeploymentStacksGetAtSubscriptionInput.Type;

// Output Schema
export const DeploymentStacksGetAtSubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DeploymentStacksGetAtSubscriptionOutput =
  typeof DeploymentStacksGetAtSubscriptionOutput.Type;

// The operation
/**
 * Gets the Deployment stack with the given name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param deploymentStackName - Name of the deployment stack.
 */
export const DeploymentStacksGetAtSubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeploymentStacksGetAtSubscriptionInput,
    outputSchema: DeploymentStacksGetAtSubscriptionOutput,
  }));
// Input Schema
export const DeploymentStacksListAtManagementGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    managementGroupId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Resources/deploymentStacks",
    }),
  );
export type DeploymentStacksListAtManagementGroupInput =
  typeof DeploymentStacksListAtManagementGroupInput.Type;

// Output Schema
export const DeploymentStacksListAtManagementGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type DeploymentStacksListAtManagementGroupOutput =
  typeof DeploymentStacksListAtManagementGroupOutput.Type;

// The operation
/**
 * Lists Deployment stacks at the specified scope.
 *
 * @param api-version - The API version to use for this operation.
 * @param managementGroupId - The management group ID.
 */
export const DeploymentStacksListAtManagementGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeploymentStacksListAtManagementGroupInput,
    outputSchema: DeploymentStacksListAtManagementGroupOutput,
  }));
// Input Schema
export const DeploymentStacksListAtResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Resources/deploymentStacks",
    }),
  );
export type DeploymentStacksListAtResourceGroupInput =
  typeof DeploymentStacksListAtResourceGroupInput.Type;

// Output Schema
export const DeploymentStacksListAtResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type DeploymentStacksListAtResourceGroupOutput =
  typeof DeploymentStacksListAtResourceGroupOutput.Type;

// The operation
/**
 * Lists Deployment stacks at the specified scope.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const DeploymentStacksListAtResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeploymentStacksListAtResourceGroupInput,
    outputSchema: DeploymentStacksListAtResourceGroupOutput,
  }));
// Input Schema
export const DeploymentStacksListAtSubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Resources/deploymentStacks",
    }),
  );
export type DeploymentStacksListAtSubscriptionInput =
  typeof DeploymentStacksListAtSubscriptionInput.Type;

// Output Schema
export const DeploymentStacksListAtSubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type DeploymentStacksListAtSubscriptionOutput =
  typeof DeploymentStacksListAtSubscriptionOutput.Type;

// The operation
/**
 * Lists Deployment stacks at the specified scope.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const DeploymentStacksListAtSubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeploymentStacksListAtSubscriptionInput,
    outputSchema: DeploymentStacksListAtSubscriptionOutput,
  }));
// Input Schema
export const DeploymentStacksWhatIfResultsAtManagementGroupCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    managementGroupId: Schema.String.pipe(T.PathParam()),
    deploymentStacksWhatIfResultName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Resources/deploymentStacksWhatIfResults/{deploymentStacksWhatIfResultName}",
    }),
  );
export type DeploymentStacksWhatIfResultsAtManagementGroupCreateOrUpdateInput =
  typeof DeploymentStacksWhatIfResultsAtManagementGroupCreateOrUpdateInput.Type;

// Output Schema
export const DeploymentStacksWhatIfResultsAtManagementGroupCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DeploymentStacksWhatIfResultsAtManagementGroupCreateOrUpdateOutput =
  typeof DeploymentStacksWhatIfResultsAtManagementGroupCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a Deployment stack at the specified scope.
 *
 * @param api-version - The API version to use for this operation.
 * @param managementGroupId - The management group ID.
 * @param deploymentStacksWhatIfResultName - Name of the deployment stack what-if result.
 */
export const DeploymentStacksWhatIfResultsAtManagementGroupCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      DeploymentStacksWhatIfResultsAtManagementGroupCreateOrUpdateInput,
    outputSchema:
      DeploymentStacksWhatIfResultsAtManagementGroupCreateOrUpdateOutput,
  }));
// Input Schema
export const DeploymentStacksWhatIfResultsAtManagementGroupDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    managementGroupId: Schema.String.pipe(T.PathParam()),
    deploymentStacksWhatIfResultName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Resources/deploymentStacksWhatIfResults/{deploymentStacksWhatIfResultName}",
    }),
  );
export type DeploymentStacksWhatIfResultsAtManagementGroupDeleteInput =
  typeof DeploymentStacksWhatIfResultsAtManagementGroupDeleteInput.Type;

// Output Schema
export const DeploymentStacksWhatIfResultsAtManagementGroupDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DeploymentStacksWhatIfResultsAtManagementGroupDeleteOutput =
  typeof DeploymentStacksWhatIfResultsAtManagementGroupDeleteOutput.Type;

// The operation
/**
 * Deletes a Deployment stack by name at the specified scope. When operation completes, status code 200 returned without content.
 *
 * @param api-version - The API version to use for this operation.
 * @param managementGroupId - The management group ID.
 * @param deploymentStacksWhatIfResultName - Name of the deployment stack what-if result.
 */
export const DeploymentStacksWhatIfResultsAtManagementGroupDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeploymentStacksWhatIfResultsAtManagementGroupDeleteInput,
    outputSchema: DeploymentStacksWhatIfResultsAtManagementGroupDeleteOutput,
  }));
// Input Schema
export const DeploymentStacksWhatIfResultsAtManagementGroupGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    managementGroupId: Schema.String.pipe(T.PathParam()),
    deploymentStacksWhatIfResultName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Resources/deploymentStacksWhatIfResults/{deploymentStacksWhatIfResultName}",
    }),
  );
export type DeploymentStacksWhatIfResultsAtManagementGroupGetInput =
  typeof DeploymentStacksWhatIfResultsAtManagementGroupGetInput.Type;

// Output Schema
export const DeploymentStacksWhatIfResultsAtManagementGroupGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DeploymentStacksWhatIfResultsAtManagementGroupGetOutput =
  typeof DeploymentStacksWhatIfResultsAtManagementGroupGetOutput.Type;

// The operation
/**
 * Gets the Deployment stack with the given name.
 *
 * @param api-version - The API version to use for this operation.
 * @param managementGroupId - The management group ID.
 * @param deploymentStacksWhatIfResultName - Name of the deployment stack what-if result.
 */
export const DeploymentStacksWhatIfResultsAtManagementGroupGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeploymentStacksWhatIfResultsAtManagementGroupGetInput,
    outputSchema: DeploymentStacksWhatIfResultsAtManagementGroupGetOutput,
  }));
// Input Schema
export const DeploymentStacksWhatIfResultsAtManagementGroupListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    managementGroupId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Resources/deploymentStacksWhatIfResults",
    }),
  );
export type DeploymentStacksWhatIfResultsAtManagementGroupListInput =
  typeof DeploymentStacksWhatIfResultsAtManagementGroupListInput.Type;

// Output Schema
export const DeploymentStacksWhatIfResultsAtManagementGroupListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type DeploymentStacksWhatIfResultsAtManagementGroupListOutput =
  typeof DeploymentStacksWhatIfResultsAtManagementGroupListOutput.Type;

// The operation
/**
 * Lists Deployment stacks at the specified scope.
 *
 * @param api-version - The API version to use for this operation.
 * @param managementGroupId - The management group ID.
 */
export const DeploymentStacksWhatIfResultsAtManagementGroupList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeploymentStacksWhatIfResultsAtManagementGroupListInput,
    outputSchema: DeploymentStacksWhatIfResultsAtManagementGroupListOutput,
  }));
// Input Schema
export const DeploymentStacksWhatIfResultsAtManagementGroupWhatIfInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    managementGroupId: Schema.String.pipe(T.PathParam()),
    deploymentStacksWhatIfResultName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Resources/deploymentStacksWhatIfResults/{deploymentStacksWhatIfResultName}/whatIf",
    }),
  );
export type DeploymentStacksWhatIfResultsAtManagementGroupWhatIfInput =
  typeof DeploymentStacksWhatIfResultsAtManagementGroupWhatIfInput.Type;

// Output Schema
export const DeploymentStacksWhatIfResultsAtManagementGroupWhatIfOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DeploymentStacksWhatIfResultsAtManagementGroupWhatIfOutput =
  typeof DeploymentStacksWhatIfResultsAtManagementGroupWhatIfOutput.Type;

// The operation
/**
 * Returns property-level changes that will be made by the deployment if executed.
 *
 * @param api-version - The API version to use for this operation.
 * @param managementGroupId - The management group ID.
 * @param deploymentStacksWhatIfResultName - Name of the deployment stack what-if result.
 */
export const DeploymentStacksWhatIfResultsAtManagementGroupWhatIf =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeploymentStacksWhatIfResultsAtManagementGroupWhatIfInput,
    outputSchema: DeploymentStacksWhatIfResultsAtManagementGroupWhatIfOutput,
  }));
// Input Schema
export const DeploymentStacksWhatIfResultsAtResourceGroupCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    deploymentStacksWhatIfResultName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Resources/deploymentStacksWhatIfResults/{deploymentStacksWhatIfResultName}",
    }),
  );
export type DeploymentStacksWhatIfResultsAtResourceGroupCreateOrUpdateInput =
  typeof DeploymentStacksWhatIfResultsAtResourceGroupCreateOrUpdateInput.Type;

// Output Schema
export const DeploymentStacksWhatIfResultsAtResourceGroupCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DeploymentStacksWhatIfResultsAtResourceGroupCreateOrUpdateOutput =
  typeof DeploymentStacksWhatIfResultsAtResourceGroupCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a Deployment stack at the specified scope.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param deploymentStacksWhatIfResultName - Name of the deployment stack what-if result.
 */
export const DeploymentStacksWhatIfResultsAtResourceGroupCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      DeploymentStacksWhatIfResultsAtResourceGroupCreateOrUpdateInput,
    outputSchema:
      DeploymentStacksWhatIfResultsAtResourceGroupCreateOrUpdateOutput,
  }));
// Input Schema
export const DeploymentStacksWhatIfResultsAtResourceGroupDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    deploymentStacksWhatIfResultName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Resources/deploymentStacksWhatIfResults/{deploymentStacksWhatIfResultName}",
    }),
  );
export type DeploymentStacksWhatIfResultsAtResourceGroupDeleteInput =
  typeof DeploymentStacksWhatIfResultsAtResourceGroupDeleteInput.Type;

// Output Schema
export const DeploymentStacksWhatIfResultsAtResourceGroupDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DeploymentStacksWhatIfResultsAtResourceGroupDeleteOutput =
  typeof DeploymentStacksWhatIfResultsAtResourceGroupDeleteOutput.Type;

// The operation
/**
 * Deletes a Deployment stack by name at the specified scope. When operation completes, status code 200 returned without content.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param deploymentStacksWhatIfResultName - Name of the deployment stack what-if result.
 */
export const DeploymentStacksWhatIfResultsAtResourceGroupDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeploymentStacksWhatIfResultsAtResourceGroupDeleteInput,
    outputSchema: DeploymentStacksWhatIfResultsAtResourceGroupDeleteOutput,
  }));
// Input Schema
export const DeploymentStacksWhatIfResultsAtResourceGroupGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    deploymentStacksWhatIfResultName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Resources/deploymentStacksWhatIfResults/{deploymentStacksWhatIfResultName}",
    }),
  );
export type DeploymentStacksWhatIfResultsAtResourceGroupGetInput =
  typeof DeploymentStacksWhatIfResultsAtResourceGroupGetInput.Type;

// Output Schema
export const DeploymentStacksWhatIfResultsAtResourceGroupGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DeploymentStacksWhatIfResultsAtResourceGroupGetOutput =
  typeof DeploymentStacksWhatIfResultsAtResourceGroupGetOutput.Type;

// The operation
/**
 * Gets the Deployment stack with the given name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param deploymentStacksWhatIfResultName - Name of the deployment stack what-if result.
 */
export const DeploymentStacksWhatIfResultsAtResourceGroupGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeploymentStacksWhatIfResultsAtResourceGroupGetInput,
    outputSchema: DeploymentStacksWhatIfResultsAtResourceGroupGetOutput,
  }));
// Input Schema
export const DeploymentStacksWhatIfResultsAtResourceGroupListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Resources/deploymentStacksWhatIfResults",
    }),
  );
export type DeploymentStacksWhatIfResultsAtResourceGroupListInput =
  typeof DeploymentStacksWhatIfResultsAtResourceGroupListInput.Type;

// Output Schema
export const DeploymentStacksWhatIfResultsAtResourceGroupListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type DeploymentStacksWhatIfResultsAtResourceGroupListOutput =
  typeof DeploymentStacksWhatIfResultsAtResourceGroupListOutput.Type;

// The operation
/**
 * Lists Deployment stacks at the specified scope.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const DeploymentStacksWhatIfResultsAtResourceGroupList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeploymentStacksWhatIfResultsAtResourceGroupListInput,
    outputSchema: DeploymentStacksWhatIfResultsAtResourceGroupListOutput,
  }));
// Input Schema
export const DeploymentStacksWhatIfResultsAtResourceGroupWhatIfInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    deploymentStacksWhatIfResultName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Resources/deploymentStacksWhatIfResults/{deploymentStacksWhatIfResultName}/whatIf",
    }),
  );
export type DeploymentStacksWhatIfResultsAtResourceGroupWhatIfInput =
  typeof DeploymentStacksWhatIfResultsAtResourceGroupWhatIfInput.Type;

// Output Schema
export const DeploymentStacksWhatIfResultsAtResourceGroupWhatIfOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DeploymentStacksWhatIfResultsAtResourceGroupWhatIfOutput =
  typeof DeploymentStacksWhatIfResultsAtResourceGroupWhatIfOutput.Type;

// The operation
/**
 * Returns property-level changes that will be made by the deployment if executed.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param deploymentStacksWhatIfResultName - Name of the deployment stack what-if result.
 */
export const DeploymentStacksWhatIfResultsAtResourceGroupWhatIf =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeploymentStacksWhatIfResultsAtResourceGroupWhatIfInput,
    outputSchema: DeploymentStacksWhatIfResultsAtResourceGroupWhatIfOutput,
  }));
// Input Schema
export const DeploymentStacksWhatIfResultsAtSubscriptionCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    deploymentStacksWhatIfResultName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Resources/deploymentStacksWhatIfResults/{deploymentStacksWhatIfResultName}",
    }),
  );
export type DeploymentStacksWhatIfResultsAtSubscriptionCreateOrUpdateInput =
  typeof DeploymentStacksWhatIfResultsAtSubscriptionCreateOrUpdateInput.Type;

// Output Schema
export const DeploymentStacksWhatIfResultsAtSubscriptionCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DeploymentStacksWhatIfResultsAtSubscriptionCreateOrUpdateOutput =
  typeof DeploymentStacksWhatIfResultsAtSubscriptionCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a Deployment stack at the specified scope.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param deploymentStacksWhatIfResultName - Name of the deployment stack what-if result.
 */
export const DeploymentStacksWhatIfResultsAtSubscriptionCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeploymentStacksWhatIfResultsAtSubscriptionCreateOrUpdateInput,
    outputSchema:
      DeploymentStacksWhatIfResultsAtSubscriptionCreateOrUpdateOutput,
  }));
// Input Schema
export const DeploymentStacksWhatIfResultsAtSubscriptionDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    deploymentStacksWhatIfResultName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Resources/deploymentStacksWhatIfResults/{deploymentStacksWhatIfResultName}",
    }),
  );
export type DeploymentStacksWhatIfResultsAtSubscriptionDeleteInput =
  typeof DeploymentStacksWhatIfResultsAtSubscriptionDeleteInput.Type;

// Output Schema
export const DeploymentStacksWhatIfResultsAtSubscriptionDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DeploymentStacksWhatIfResultsAtSubscriptionDeleteOutput =
  typeof DeploymentStacksWhatIfResultsAtSubscriptionDeleteOutput.Type;

// The operation
/**
 * Deletes a Deployment stack by name at the specified scope. When operation completes, status code 200 returned without content.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param deploymentStacksWhatIfResultName - Name of the deployment stack what-if result.
 */
export const DeploymentStacksWhatIfResultsAtSubscriptionDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeploymentStacksWhatIfResultsAtSubscriptionDeleteInput,
    outputSchema: DeploymentStacksWhatIfResultsAtSubscriptionDeleteOutput,
  }));
// Input Schema
export const DeploymentStacksWhatIfResultsAtSubscriptionGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    deploymentStacksWhatIfResultName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Resources/deploymentStacksWhatIfResults/{deploymentStacksWhatIfResultName}",
    }),
  );
export type DeploymentStacksWhatIfResultsAtSubscriptionGetInput =
  typeof DeploymentStacksWhatIfResultsAtSubscriptionGetInput.Type;

// Output Schema
export const DeploymentStacksWhatIfResultsAtSubscriptionGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DeploymentStacksWhatIfResultsAtSubscriptionGetOutput =
  typeof DeploymentStacksWhatIfResultsAtSubscriptionGetOutput.Type;

// The operation
/**
 * Gets the Deployment stack with the given name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param deploymentStacksWhatIfResultName - Name of the deployment stack what-if result.
 */
export const DeploymentStacksWhatIfResultsAtSubscriptionGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeploymentStacksWhatIfResultsAtSubscriptionGetInput,
    outputSchema: DeploymentStacksWhatIfResultsAtSubscriptionGetOutput,
  }));
// Input Schema
export const DeploymentStacksWhatIfResultsAtSubscriptionListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Resources/deploymentStacksWhatIfResults",
    }),
  );
export type DeploymentStacksWhatIfResultsAtSubscriptionListInput =
  typeof DeploymentStacksWhatIfResultsAtSubscriptionListInput.Type;

// Output Schema
export const DeploymentStacksWhatIfResultsAtSubscriptionListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type DeploymentStacksWhatIfResultsAtSubscriptionListOutput =
  typeof DeploymentStacksWhatIfResultsAtSubscriptionListOutput.Type;

// The operation
/**
 * Lists Deployment stacks at the specified scope.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const DeploymentStacksWhatIfResultsAtSubscriptionList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeploymentStacksWhatIfResultsAtSubscriptionListInput,
    outputSchema: DeploymentStacksWhatIfResultsAtSubscriptionListOutput,
  }));
// Input Schema
export const DeploymentStacksWhatIfResultsAtSubscriptionWhatIfInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    deploymentStacksWhatIfResultName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Resources/deploymentStacksWhatIfResults/{deploymentStacksWhatIfResultName}/whatIf",
    }),
  );
export type DeploymentStacksWhatIfResultsAtSubscriptionWhatIfInput =
  typeof DeploymentStacksWhatIfResultsAtSubscriptionWhatIfInput.Type;

// Output Schema
export const DeploymentStacksWhatIfResultsAtSubscriptionWhatIfOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DeploymentStacksWhatIfResultsAtSubscriptionWhatIfOutput =
  typeof DeploymentStacksWhatIfResultsAtSubscriptionWhatIfOutput.Type;

// The operation
/**
 * Returns property-level changes that will be made by the deployment if executed.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param deploymentStacksWhatIfResultName - Name of the deployment stack what-if result.
 */
export const DeploymentStacksWhatIfResultsAtSubscriptionWhatIf =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeploymentStacksWhatIfResultsAtSubscriptionWhatIfInput,
    outputSchema: DeploymentStacksWhatIfResultsAtSubscriptionWhatIfOutput,
  }));
// Input Schema
export const FeaturesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceProviderNamespace: Schema.String.pipe(T.PathParam()),
  featureName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.Features/providers/{resourceProviderNamespace}/features/{featureName}",
  }),
);
export type FeaturesGetInput = typeof FeaturesGetInput.Type;

// Output Schema
export const FeaturesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  name: Schema.optional(Schema.String),
  properties: Schema.optional(
    Schema.Struct({
      state: Schema.optional(Schema.String),
    }),
  ),
  id: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
});
export type FeaturesGetOutput = typeof FeaturesGetOutput.Type;

// The operation
/**
 * Gets the preview feature with the specified name.
 *
 * @param resourceProviderNamespace - The resource provider namespace for the feature.
 * @param featureName - The name of the feature to get.
 */
export const FeaturesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FeaturesGetInput,
  outputSchema: FeaturesGetOutput,
}));
// Input Schema
export const FeaturesListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceProviderNamespace: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.Features/providers/{resourceProviderNamespace}/features",
  }),
);
export type FeaturesListInput = typeof FeaturesListInput.Type;

// Output Schema
export const FeaturesListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        name: Schema.optional(Schema.String),
        properties: Schema.optional(
          Schema.Struct({
            state: Schema.optional(Schema.String),
          }),
        ),
        id: Schema.optional(Schema.String),
        type: Schema.optional(Schema.String),
      }),
    ),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type FeaturesListOutput = typeof FeaturesListOutput.Type;

// The operation
/**
 * Gets all the preview features in a provider namespace that are available through AFEC for the subscription.
 *
 * @param resourceProviderNamespace - The namespace of the resource provider for getting features.
 */
export const FeaturesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FeaturesListInput,
  outputSchema: FeaturesListOutput,
}));
// Input Schema
export const FeaturesListAllInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.Features/features",
  }),
);
export type FeaturesListAllInput = typeof FeaturesListAllInput.Type;

// Output Schema
export const FeaturesListAllOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        name: Schema.optional(Schema.String),
        properties: Schema.optional(
          Schema.Struct({
            state: Schema.optional(Schema.String),
          }),
        ),
        id: Schema.optional(Schema.String),
        type: Schema.optional(Schema.String),
      }),
    ),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type FeaturesListAllOutput = typeof FeaturesListAllOutput.Type;

// The operation
/**
 * Gets all the preview features that are available through AFEC for the subscription.
 */
export const FeaturesListAll = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FeaturesListAllInput,
  outputSchema: FeaturesListAllOutput,
}));
// Input Schema
export const FeaturesRegisterInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceProviderNamespace: Schema.String.pipe(T.PathParam()),
  featureName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.Features/providers/{resourceProviderNamespace}/features/{featureName}/register",
  }),
);
export type FeaturesRegisterInput = typeof FeaturesRegisterInput.Type;

// Output Schema
export const FeaturesRegisterOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    name: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        state: Schema.optional(Schema.String),
      }),
    ),
    id: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  },
);
export type FeaturesRegisterOutput = typeof FeaturesRegisterOutput.Type;

// The operation
/**
 * Registers the preview feature for the subscription.
 *
 * @param resourceProviderNamespace - The namespace of the resource provider.
 * @param featureName - The name of the feature to register.
 */
export const FeaturesRegister = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FeaturesRegisterInput,
  outputSchema: FeaturesRegisterOutput,
}));
// Input Schema
export const FeaturesUnregisterInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceProviderNamespace: Schema.String.pipe(T.PathParam()),
    featureName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Features/providers/{resourceProviderNamespace}/features/{featureName}/unregister",
    }),
  );
export type FeaturesUnregisterInput = typeof FeaturesUnregisterInput.Type;

// Output Schema
export const FeaturesUnregisterOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        state: Schema.optional(Schema.String),
      }),
    ),
    id: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type FeaturesUnregisterOutput = typeof FeaturesUnregisterOutput.Type;

// The operation
/**
 * Unregisters the preview feature for the subscription.
 *
 * @param resourceProviderNamespace - The namespace of the resource provider.
 * @param featureName - The name of the feature to unregister.
 */
export const FeaturesUnregister = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FeaturesUnregisterInput,
  outputSchema: FeaturesUnregisterOutput,
}));
// Input Schema
export const JitRequestsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    jitRequestName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Solutions/jitRequests/{jitRequestName}",
    }),
  );
export type JitRequestsCreateOrUpdateInput =
  typeof JitRequestsCreateOrUpdateInput.Type;

// Output Schema
export const JitRequestsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type JitRequestsCreateOrUpdateOutput =
  typeof JitRequestsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates the JIT request.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param jitRequestName - The name of the JIT request.
 */
export const jitRequestsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: JitRequestsCreateOrUpdateInput,
    outputSchema: JitRequestsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const JitRequestsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    jitRequestName: Schema.String.pipe(T.PathParam()),
  },
).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Solutions/jitRequests/{jitRequestName}",
  }),
);
export type JitRequestsDeleteInput = typeof JitRequestsDeleteInput.Type;

// Output Schema
export const JitRequestsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type JitRequestsDeleteOutput = typeof JitRequestsDeleteOutput.Type;

// The operation
/**
 * Deletes the JIT request.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param jitRequestName - The name of the JIT request.
 */
export const jitRequestsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JitRequestsDeleteInput,
  outputSchema: JitRequestsDeleteOutput,
}));
// Input Schema
export const JitRequestsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  jitRequestName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Solutions/jitRequests/{jitRequestName}",
  }),
);
export type JitRequestsGetInput = typeof JitRequestsGetInput.Type;

// Output Schema
export const JitRequestsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
});
export type JitRequestsGetOutput = typeof JitRequestsGetOutput.Type;

// The operation
/**
 * Gets the JIT request.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param jitRequestName - The name of the JIT request.
 */
export const JitRequestsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JitRequestsGetInput,
  outputSchema: JitRequestsGetOutput,
}));
// Input Schema
export const JitRequestsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Solutions/jitRequests",
    }),
  );
export type JitRequestsListByResourceGroupInput =
  typeof JitRequestsListByResourceGroupInput.Type;

// Output Schema
export const JitRequestsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type JitRequestsListByResourceGroupOutput =
  typeof JitRequestsListByResourceGroupOutput.Type;

// The operation
/**
 * Retrieves all JIT requests within the resource group.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const jitRequestsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: JitRequestsListByResourceGroupInput,
    outputSchema: JitRequestsListByResourceGroupOutput,
  }));
// Input Schema
export const JitRequestsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Solutions/jitRequests",
    }),
  );
export type JitRequestsListBySubscriptionInput =
  typeof JitRequestsListBySubscriptionInput.Type;

// Output Schema
export const JitRequestsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type JitRequestsListBySubscriptionOutput =
  typeof JitRequestsListBySubscriptionOutput.Type;

// The operation
/**
 * Retrieves all JIT requests within the subscription.
 */
export const jitRequestsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: JitRequestsListBySubscriptionInput,
    outputSchema: JitRequestsListBySubscriptionOutput,
  }));
// Input Schema
export const JitRequestsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    jitRequestName: Schema.String.pipe(T.PathParam()),
  },
).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Solutions/jitRequests/{jitRequestName}",
  }),
);
export type JitRequestsUpdateInput = typeof JitRequestsUpdateInput.Type;

// Output Schema
export const JitRequestsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type JitRequestsUpdateOutput = typeof JitRequestsUpdateOutput.Type;

// The operation
/**
 * Updates the JIT request.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param jitRequestName - The name of the JIT request.
 */
export const JitRequestsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JitRequestsUpdateInput,
  outputSchema: JitRequestsUpdateOutput,
}));
// Input Schema
export const ListOperationsInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({ method: "GET", path: "/providers/Microsoft.Features/operations" }),
);
export type ListOperationsInput = typeof ListOperationsInput.Type;

// Output Schema
export const ListOperationsOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        name: Schema.optional(Schema.String),
        display: Schema.optional(
          Schema.Struct({
            provider: Schema.optional(Schema.String),
            resource: Schema.optional(Schema.String),
            operation: Schema.optional(Schema.String),
          }),
        ),
      }),
    ),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type ListOperationsOutput = typeof ListOperationsOutput.Type;

// The operation
/**
 * Lists all of the available Microsoft.Features REST API operations.
 */
export const ListOperations = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ListOperationsInput,
  outputSchema: ListOperationsOutput,
}));
// Input Schema
export const ManagementLocksCreateOrUpdateAtResourceGroupLevelInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    lockName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Authorization/locks/{lockName}",
    }),
  );
export type ManagementLocksCreateOrUpdateAtResourceGroupLevelInput =
  typeof ManagementLocksCreateOrUpdateAtResourceGroupLevelInput.Type;

// Output Schema
export const ManagementLocksCreateOrUpdateAtResourceGroupLevelOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    properties: Schema.Struct({
      level: Schema.Literals(["NotSpecified", "CanNotDelete", "ReadOnly"]),
      notes: Schema.optional(Schema.String),
      owners: Schema.optional(
        Schema.Array(
          Schema.Struct({
            applicationId: Schema.optional(Schema.String),
          }),
        ),
      ),
    }),
    id: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
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
export type ManagementLocksCreateOrUpdateAtResourceGroupLevelOutput =
  typeof ManagementLocksCreateOrUpdateAtResourceGroupLevelOutput.Type;

// The operation
/**
 * Creates or updates a management lock at the resource group level.
 *
 * When you apply a lock at a parent scope, all child resources inherit the same lock. To create management locks, you must have access to Microsoft.Authorization/* or Microsoft.Authorization/locks/* actions. Of the built-in roles, only Owner and User Access Administrator are granted those actions.
 *
 * @param resourceGroupName - The name of the resource group to lock.
 * @param lockName - The lock name. The lock name can be a maximum of 260 characters. It cannot contain <, > %, &, :, \\, ?, /, or any control characters.
 * @param api-version - The API version to use for this operation.
 */
export const ManagementLocksCreateOrUpdateAtResourceGroupLevel =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagementLocksCreateOrUpdateAtResourceGroupLevelInput,
    outputSchema: ManagementLocksCreateOrUpdateAtResourceGroupLevelOutput,
  }));
// Input Schema
export const ManagementLocksCreateOrUpdateAtResourceLevelInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceProviderNamespace: Schema.String.pipe(T.PathParam()),
    parentResourcePath: Schema.String.pipe(T.PathParam()),
    resourceType: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    lockName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{parentResourcePath}/{resourceType}/{resourceName}/providers/Microsoft.Authorization/locks/{lockName}",
    }),
  );
export type ManagementLocksCreateOrUpdateAtResourceLevelInput =
  typeof ManagementLocksCreateOrUpdateAtResourceLevelInput.Type;

// Output Schema
export const ManagementLocksCreateOrUpdateAtResourceLevelOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    properties: Schema.Struct({
      level: Schema.Literals(["NotSpecified", "CanNotDelete", "ReadOnly"]),
      notes: Schema.optional(Schema.String),
      owners: Schema.optional(
        Schema.Array(
          Schema.Struct({
            applicationId: Schema.optional(Schema.String),
          }),
        ),
      ),
    }),
    id: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
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
export type ManagementLocksCreateOrUpdateAtResourceLevelOutput =
  typeof ManagementLocksCreateOrUpdateAtResourceLevelOutput.Type;

// The operation
/**
 * Creates or updates a management lock at the resource level or any level below the resource.
 *
 * When you apply a lock at a parent scope, all child resources inherit the same lock. To create management locks, you must have access to Microsoft.Authorization/* or Microsoft.Authorization/locks/* actions. Of the built-in roles, only Owner and User Access Administrator are granted those actions.
 *
 * @param resourceGroupName - The name of the resource group containing the resource to lock.
 * @param resourceProviderNamespace - The resource provider namespace of the resource to lock.
 * @param parentResourcePath - The parent resource identity.
 * @param resourceType - The resource type of the resource to lock.
 * @param resourceName - The name of the resource to lock.
 * @param lockName - The name of lock. The lock name can be a maximum of 260 characters. It cannot contain <, > %, &, :, \\, ?, /, or any control characters.
 * @param api-version - The API version to use for this operation.
 */
export const ManagementLocksCreateOrUpdateAtResourceLevel =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagementLocksCreateOrUpdateAtResourceLevelInput,
    outputSchema: ManagementLocksCreateOrUpdateAtResourceLevelOutput,
  }));
// Input Schema
export const ManagementLocksCreateOrUpdateAtSubscriptionLevelInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    lockName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/locks/{lockName}",
    }),
  );
export type ManagementLocksCreateOrUpdateAtSubscriptionLevelInput =
  typeof ManagementLocksCreateOrUpdateAtSubscriptionLevelInput.Type;

// Output Schema
export const ManagementLocksCreateOrUpdateAtSubscriptionLevelOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    properties: Schema.Struct({
      level: Schema.Literals(["NotSpecified", "CanNotDelete", "ReadOnly"]),
      notes: Schema.optional(Schema.String),
      owners: Schema.optional(
        Schema.Array(
          Schema.Struct({
            applicationId: Schema.optional(Schema.String),
          }),
        ),
      ),
    }),
    id: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
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
export type ManagementLocksCreateOrUpdateAtSubscriptionLevelOutput =
  typeof ManagementLocksCreateOrUpdateAtSubscriptionLevelOutput.Type;

// The operation
/**
 * Creates or updates a management lock at the subscription level.
 *
 * When you apply a lock at a parent scope, all child resources inherit the same lock. To create management locks, you must have access to Microsoft.Authorization/* or Microsoft.Authorization/locks/* actions. Of the built-in roles, only Owner and User Access Administrator are granted those actions.
 *
 * @param lockName - The name of lock. The lock name can be a maximum of 260 characters. It cannot contain <, > %, &, :, \\, ?, /, or any control characters.
 * @param api-version - The API version to use for this operation.
 */
export const ManagementLocksCreateOrUpdateAtSubscriptionLevel =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagementLocksCreateOrUpdateAtSubscriptionLevelInput,
    outputSchema: ManagementLocksCreateOrUpdateAtSubscriptionLevelOutput,
  }));
// Input Schema
export const ManagementLocksCreateOrUpdateByScopeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scope: Schema.String.pipe(T.PathParam()),
    lockName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/{scope}/providers/Microsoft.Authorization/locks/{lockName}",
    }),
  );
export type ManagementLocksCreateOrUpdateByScopeInput =
  typeof ManagementLocksCreateOrUpdateByScopeInput.Type;

// Output Schema
export const ManagementLocksCreateOrUpdateByScopeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    properties: Schema.Struct({
      level: Schema.Literals(["NotSpecified", "CanNotDelete", "ReadOnly"]),
      notes: Schema.optional(Schema.String),
      owners: Schema.optional(
        Schema.Array(
          Schema.Struct({
            applicationId: Schema.optional(Schema.String),
          }),
        ),
      ),
    }),
    id: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
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
export type ManagementLocksCreateOrUpdateByScopeOutput =
  typeof ManagementLocksCreateOrUpdateByScopeOutput.Type;

// The operation
/**
 * Create or update a management lock by scope.
 *
 * @param scope - The scope for the lock. When providing a scope for the assignment, use '/subscriptions/{subscriptionId}' for subscriptions, '/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}' for resource groups, and '/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{parentResourcePathIfPresent}/{resourceType}/{resourceName}' for resources.
 * @param lockName - The name of lock.
 * @param api-version - The API version to use for this operation.
 */
export const ManagementLocksCreateOrUpdateByScope =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagementLocksCreateOrUpdateByScopeInput,
    outputSchema: ManagementLocksCreateOrUpdateByScopeOutput,
  }));
// Input Schema
export const ManagementLocksDeleteAtResourceGroupLevelInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    lockName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Authorization/locks/{lockName}",
    }),
  );
export type ManagementLocksDeleteAtResourceGroupLevelInput =
  typeof ManagementLocksDeleteAtResourceGroupLevelInput.Type;

// Output Schema
export const ManagementLocksDeleteAtResourceGroupLevelOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ManagementLocksDeleteAtResourceGroupLevelOutput =
  typeof ManagementLocksDeleteAtResourceGroupLevelOutput.Type;

// The operation
/**
 * Deletes a management lock at the resource group level.
 *
 * To delete management locks, you must have access to Microsoft.Authorization/* or Microsoft.Authorization/locks/* actions. Of the built-in roles, only Owner and User Access Administrator are granted those actions.
 *
 * @param resourceGroupName - The name of the resource group containing the lock.
 * @param lockName - The name of lock to delete.
 * @param api-version - The API version to use for this operation.
 */
export const ManagementLocksDeleteAtResourceGroupLevel =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagementLocksDeleteAtResourceGroupLevelInput,
    outputSchema: ManagementLocksDeleteAtResourceGroupLevelOutput,
  }));
// Input Schema
export const ManagementLocksDeleteAtResourceLevelInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceProviderNamespace: Schema.String.pipe(T.PathParam()),
    parentResourcePath: Schema.String.pipe(T.PathParam()),
    resourceType: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    lockName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{parentResourcePath}/{resourceType}/{resourceName}/providers/Microsoft.Authorization/locks/{lockName}",
    }),
  );
export type ManagementLocksDeleteAtResourceLevelInput =
  typeof ManagementLocksDeleteAtResourceLevelInput.Type;

// Output Schema
export const ManagementLocksDeleteAtResourceLevelOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ManagementLocksDeleteAtResourceLevelOutput =
  typeof ManagementLocksDeleteAtResourceLevelOutput.Type;

// The operation
/**
 * Deletes the management lock of a resource or any level below the resource.
 *
 * To delete management locks, you must have access to Microsoft.Authorization/* or Microsoft.Authorization/locks/* actions. Of the built-in roles, only Owner and User Access Administrator are granted those actions.
 *
 * @param resourceGroupName - The name of the resource group containing the resource with the lock to delete.
 * @param resourceProviderNamespace - The resource provider namespace of the resource with the lock to delete.
 * @param parentResourcePath - The parent resource identity.
 * @param resourceType - The resource type of the resource with the lock to delete.
 * @param resourceName - The name of the resource with the lock to delete.
 * @param lockName - The name of the lock to delete.
 * @param api-version - The API version to use for this operation.
 */
export const ManagementLocksDeleteAtResourceLevel =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagementLocksDeleteAtResourceLevelInput,
    outputSchema: ManagementLocksDeleteAtResourceLevelOutput,
  }));
// Input Schema
export const ManagementLocksDeleteAtSubscriptionLevelInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    lockName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/locks/{lockName}",
    }),
  );
export type ManagementLocksDeleteAtSubscriptionLevelInput =
  typeof ManagementLocksDeleteAtSubscriptionLevelInput.Type;

// Output Schema
export const ManagementLocksDeleteAtSubscriptionLevelOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ManagementLocksDeleteAtSubscriptionLevelOutput =
  typeof ManagementLocksDeleteAtSubscriptionLevelOutput.Type;

// The operation
/**
 * Deletes the management lock at the subscription level.
 *
 * To delete management locks, you must have access to Microsoft.Authorization/* or Microsoft.Authorization/locks/* actions. Of the built-in roles, only Owner and User Access Administrator are granted those actions.
 *
 * @param lockName - The name of lock to delete.
 * @param api-version - The API version to use for this operation.
 */
export const ManagementLocksDeleteAtSubscriptionLevel =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagementLocksDeleteAtSubscriptionLevelInput,
    outputSchema: ManagementLocksDeleteAtSubscriptionLevelOutput,
  }));
// Input Schema
export const ManagementLocksDeleteByScopeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scope: Schema.String.pipe(T.PathParam()),
    lockName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/{scope}/providers/Microsoft.Authorization/locks/{lockName}",
    }),
  );
export type ManagementLocksDeleteByScopeInput =
  typeof ManagementLocksDeleteByScopeInput.Type;

// Output Schema
export const ManagementLocksDeleteByScopeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ManagementLocksDeleteByScopeOutput =
  typeof ManagementLocksDeleteByScopeOutput.Type;

// The operation
/**
 * Delete a management lock by scope.
 *
 * @param scope - The scope for the lock.
 * @param lockName - The name of lock.
 * @param api-version - The API version to use for this operation.
 */
export const ManagementLocksDeleteByScope =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagementLocksDeleteByScopeInput,
    outputSchema: ManagementLocksDeleteByScopeOutput,
  }));
// Input Schema
export const ManagementLocksGetAtResourceGroupLevelInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    lockName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Authorization/locks/{lockName}",
    }),
  );
export type ManagementLocksGetAtResourceGroupLevelInput =
  typeof ManagementLocksGetAtResourceGroupLevelInput.Type;

// Output Schema
export const ManagementLocksGetAtResourceGroupLevelOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    properties: Schema.Struct({
      level: Schema.Literals(["NotSpecified", "CanNotDelete", "ReadOnly"]),
      notes: Schema.optional(Schema.String),
      owners: Schema.optional(
        Schema.Array(
          Schema.Struct({
            applicationId: Schema.optional(Schema.String),
          }),
        ),
      ),
    }),
    id: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
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
export type ManagementLocksGetAtResourceGroupLevelOutput =
  typeof ManagementLocksGetAtResourceGroupLevelOutput.Type;

// The operation
/**
 * Gets a management lock at the resource group level.
 *
 * @param resourceGroupName - The name of the locked resource group.
 * @param lockName - The name of the lock to get.
 * @param api-version - The API version to use for this operation.
 */
export const ManagementLocksGetAtResourceGroupLevel =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagementLocksGetAtResourceGroupLevelInput,
    outputSchema: ManagementLocksGetAtResourceGroupLevelOutput,
  }));
// Input Schema
export const ManagementLocksGetAtResourceLevelInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceProviderNamespace: Schema.String.pipe(T.PathParam()),
    parentResourcePath: Schema.String.pipe(T.PathParam()),
    resourceType: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    lockName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{parentResourcePath}/{resourceType}/{resourceName}/providers/Microsoft.Authorization/locks/{lockName}",
    }),
  );
export type ManagementLocksGetAtResourceLevelInput =
  typeof ManagementLocksGetAtResourceLevelInput.Type;

// Output Schema
export const ManagementLocksGetAtResourceLevelOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    properties: Schema.Struct({
      level: Schema.Literals(["NotSpecified", "CanNotDelete", "ReadOnly"]),
      notes: Schema.optional(Schema.String),
      owners: Schema.optional(
        Schema.Array(
          Schema.Struct({
            applicationId: Schema.optional(Schema.String),
          }),
        ),
      ),
    }),
    id: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
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
export type ManagementLocksGetAtResourceLevelOutput =
  typeof ManagementLocksGetAtResourceLevelOutput.Type;

// The operation
/**
 * Get the management lock of a resource or any level below resource.
 *
 * @param resourceGroupName - The name of the resource group.
 * @param resourceProviderNamespace - The namespace of the resource provider.
 * @param parentResourcePath - An extra path parameter needed in some services, like SQL Databases.
 * @param resourceType - The type of the resource.
 * @param resourceName - The name of the resource.
 * @param lockName - The name of lock.
 * @param api-version - The API version to use for this operation.
 */
export const ManagementLocksGetAtResourceLevel =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagementLocksGetAtResourceLevelInput,
    outputSchema: ManagementLocksGetAtResourceLevelOutput,
  }));
// Input Schema
export const ManagementLocksGetAtSubscriptionLevelInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    lockName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/locks/{lockName}",
    }),
  );
export type ManagementLocksGetAtSubscriptionLevelInput =
  typeof ManagementLocksGetAtSubscriptionLevelInput.Type;

// Output Schema
export const ManagementLocksGetAtSubscriptionLevelOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    properties: Schema.Struct({
      level: Schema.Literals(["NotSpecified", "CanNotDelete", "ReadOnly"]),
      notes: Schema.optional(Schema.String),
      owners: Schema.optional(
        Schema.Array(
          Schema.Struct({
            applicationId: Schema.optional(Schema.String),
          }),
        ),
      ),
    }),
    id: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
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
export type ManagementLocksGetAtSubscriptionLevelOutput =
  typeof ManagementLocksGetAtSubscriptionLevelOutput.Type;

// The operation
/**
 * Gets a management lock at the subscription level.
 *
 * @param lockName - The name of the lock to get.
 * @param api-version - The API version to use for this operation.
 */
export const ManagementLocksGetAtSubscriptionLevel =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagementLocksGetAtSubscriptionLevelInput,
    outputSchema: ManagementLocksGetAtSubscriptionLevelOutput,
  }));
// Input Schema
export const ManagementLocksGetByScopeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scope: Schema.String.pipe(T.PathParam()),
    lockName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/{scope}/providers/Microsoft.Authorization/locks/{lockName}",
    }),
  );
export type ManagementLocksGetByScopeInput =
  typeof ManagementLocksGetByScopeInput.Type;

// Output Schema
export const ManagementLocksGetByScopeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    properties: Schema.Struct({
      level: Schema.Literals(["NotSpecified", "CanNotDelete", "ReadOnly"]),
      notes: Schema.optional(Schema.String),
      owners: Schema.optional(
        Schema.Array(
          Schema.Struct({
            applicationId: Schema.optional(Schema.String),
          }),
        ),
      ),
    }),
    id: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
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
export type ManagementLocksGetByScopeOutput =
  typeof ManagementLocksGetByScopeOutput.Type;

// The operation
/**
 * Get a management lock by scope.
 *
 * @param scope - The scope for the lock.
 * @param lockName - The name of lock.
 * @param api-version - The API version to use for this operation.
 */
export const ManagementLocksGetByScope = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ManagementLocksGetByScopeInput,
    outputSchema: ManagementLocksGetByScopeOutput,
  }),
);
// Input Schema
export const ManagementLocksListAtResourceGroupLevelInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    $filter: Schema.optional(Schema.String),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Authorization/locks",
    }),
  );
export type ManagementLocksListAtResourceGroupLevelInput =
  typeof ManagementLocksListAtResourceGroupLevelInput.Type;

// Output Schema
export const ManagementLocksListAtResourceGroupLevelOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          properties: Schema.Struct({
            level: Schema.Literals([
              "NotSpecified",
              "CanNotDelete",
              "ReadOnly",
            ]),
            notes: Schema.optional(Schema.String),
            owners: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  applicationId: Schema.optional(Schema.String),
                }),
              ),
            ),
          }),
          id: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
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
export type ManagementLocksListAtResourceGroupLevelOutput =
  typeof ManagementLocksListAtResourceGroupLevelOutput.Type;

// The operation
/**
 * Gets all the management locks for a resource group.
 *
 * @param resourceGroupName - The name of the resource group containing the locks to get.
 * @param $filter - The filter to apply on the operation.
 * @param api-version - The API version to use for this operation.
 */
export const ManagementLocksListAtResourceGroupLevel =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagementLocksListAtResourceGroupLevelInput,
    outputSchema: ManagementLocksListAtResourceGroupLevelOutput,
  }));
// Input Schema
export const ManagementLocksListAtResourceLevelInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceProviderNamespace: Schema.String.pipe(T.PathParam()),
    parentResourcePath: Schema.String.pipe(T.PathParam()),
    resourceType: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    $filter: Schema.optional(Schema.String),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{parentResourcePath}/{resourceType}/{resourceName}/providers/Microsoft.Authorization/locks",
    }),
  );
export type ManagementLocksListAtResourceLevelInput =
  typeof ManagementLocksListAtResourceLevelInput.Type;

// Output Schema
export const ManagementLocksListAtResourceLevelOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          properties: Schema.Struct({
            level: Schema.Literals([
              "NotSpecified",
              "CanNotDelete",
              "ReadOnly",
            ]),
            notes: Schema.optional(Schema.String),
            owners: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  applicationId: Schema.optional(Schema.String),
                }),
              ),
            ),
          }),
          id: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
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
export type ManagementLocksListAtResourceLevelOutput =
  typeof ManagementLocksListAtResourceLevelOutput.Type;

// The operation
/**
 * Gets all the management locks for a resource or any level below resource.
 *
 * @param resourceGroupName - The name of the resource group containing the locked resource. The name is case insensitive.
 * @param resourceProviderNamespace - The namespace of the resource provider.
 * @param parentResourcePath - The parent resource identity.
 * @param resourceType - The resource type of the locked resource.
 * @param resourceName - The name of the locked resource.
 * @param $filter - The filter to apply on the operation.
 * @param api-version - The API version to use for this operation.
 */
export const ManagementLocksListAtResourceLevel =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagementLocksListAtResourceLevelInput,
    outputSchema: ManagementLocksListAtResourceLevelOutput,
  }));
// Input Schema
export const ManagementLocksListAtSubscriptionLevelInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    $filter: Schema.optional(Schema.String),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/locks",
    }),
  );
export type ManagementLocksListAtSubscriptionLevelInput =
  typeof ManagementLocksListAtSubscriptionLevelInput.Type;

// Output Schema
export const ManagementLocksListAtSubscriptionLevelOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          properties: Schema.Struct({
            level: Schema.Literals([
              "NotSpecified",
              "CanNotDelete",
              "ReadOnly",
            ]),
            notes: Schema.optional(Schema.String),
            owners: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  applicationId: Schema.optional(Schema.String),
                }),
              ),
            ),
          }),
          id: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
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
export type ManagementLocksListAtSubscriptionLevelOutput =
  typeof ManagementLocksListAtSubscriptionLevelOutput.Type;

// The operation
/**
 * Gets all the management locks for a subscription.
 *
 * @param $filter - The filter to apply on the operation.
 * @param api-version - The API version to use for this operation.
 */
export const ManagementLocksListAtSubscriptionLevel =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagementLocksListAtSubscriptionLevelInput,
    outputSchema: ManagementLocksListAtSubscriptionLevelOutput,
  }));
// Input Schema
export const ManagementLocksListByScopeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scope: Schema.String.pipe(T.PathParam()),
    $filter: Schema.optional(Schema.String),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/{scope}/providers/Microsoft.Authorization/locks",
    }),
  );
export type ManagementLocksListByScopeInput =
  typeof ManagementLocksListByScopeInput.Type;

// Output Schema
export const ManagementLocksListByScopeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          properties: Schema.Struct({
            level: Schema.Literals([
              "NotSpecified",
              "CanNotDelete",
              "ReadOnly",
            ]),
            notes: Schema.optional(Schema.String),
            owners: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  applicationId: Schema.optional(Schema.String),
                }),
              ),
            ),
          }),
          id: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
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
export type ManagementLocksListByScopeOutput =
  typeof ManagementLocksListByScopeOutput.Type;

// The operation
/**
 * Gets all the management locks for a scope.
 *
 * @param scope - The scope for the lock. When providing a scope for the assignment, use '/subscriptions/{subscriptionId}' for subscriptions, '/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}' for resource groups, and '/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{parentResourcePathIfPresent}/{resourceType}/{resourceName}' for resources.
 * @param $filter - The filter to apply on the operation.
 * @param api-version - The API version to use for this operation.
 */
export const ManagementLocksListByScope = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ManagementLocksListByScopeInput,
    outputSchema: ManagementLocksListByScopeOutput,
  }),
);
// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({ method: "GET", path: "/providers/Microsoft.Resources/operations" }),
);
export type OperationsListInput = typeof OperationsListInput.Type;

// Output Schema
export const OperationsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
      }),
    ),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type OperationsListOutput = typeof OperationsListOutput.Type;

// The operation
/**
 * Lists all of the available Microsoft.Resources REST API operations.
 */
export const OperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationsListInput,
  outputSchema: OperationsListOutput,
}));
// Input Schema
export const PolicyAssignmentsCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scope: Schema.String.pipe(T.PathParam()),
    policyAssignmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/{scope}/providers/Microsoft.Authorization/policyAssignments/{policyAssignmentName}",
    }),
  );
export type PolicyAssignmentsCreateInput =
  typeof PolicyAssignmentsCreateInput.Type;

// Output Schema
export const PolicyAssignmentsCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PolicyAssignmentsCreateOutput =
  typeof PolicyAssignmentsCreateOutput.Type;

// The operation
/**
 * This operation creates or updates a policy assignment with the given scope and name. Policy assignments apply to all resources contained within their scope. For example, when you assign a policy at resource group scope, that policy applies to all resources in the group.
 *
 * @param api-version - The API version to use for this operation.
 * @param scope - The fully qualified Azure Resource manager identifier of the resource.
 * @param policyAssignmentName - The name of the policy assignment to get.
 */
export const PolicyAssignmentsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PolicyAssignmentsCreateInput,
    outputSchema: PolicyAssignmentsCreateOutput,
  }),
);
// Input Schema
export const PolicyAssignmentsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scope: Schema.String.pipe(T.PathParam()),
    policyAssignmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/{scope}/providers/Microsoft.Authorization/policyAssignments/{policyAssignmentName}",
    }),
  );
export type PolicyAssignmentsDeleteInput =
  typeof PolicyAssignmentsDeleteInput.Type;

// Output Schema
export const PolicyAssignmentsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PolicyAssignmentsDeleteOutput =
  typeof PolicyAssignmentsDeleteOutput.Type;

// The operation
/**
 * This operation deletes a policy assignment, given its name and the scope it was created in. The scope of a policy assignment is the part of its ID preceding '/providers/Microsoft.Authorization/policyAssignments/{policyAssignmentName}'.
 *
 * @param api-version - The API version to use for this operation.
 * @param scope - The fully qualified Azure Resource manager identifier of the resource.
 * @param policyAssignmentName - The name of the policy assignment to get.
 */
export const PolicyAssignmentsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PolicyAssignmentsDeleteInput,
    outputSchema: PolicyAssignmentsDeleteOutput,
  }),
);
// Input Schema
export const PolicyAssignmentsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scope: Schema.String.pipe(T.PathParam()),
    policyAssignmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/{scope}/providers/Microsoft.Authorization/policyAssignments/{policyAssignmentName}",
    }),
  );
export type PolicyAssignmentsGetInput = typeof PolicyAssignmentsGetInput.Type;

// Output Schema
export const PolicyAssignmentsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PolicyAssignmentsGetOutput = typeof PolicyAssignmentsGetOutput.Type;

// The operation
/**
 * This operation retrieves a single policy assignment, given its name and the scope it was created at.
 *
 * @param api-version - The API version to use for this operation.
 * @param scope - The fully qualified Azure Resource manager identifier of the resource.
 * @param policyAssignmentName - The name of the policy assignment to get.
 * @param $expand - Comma-separated list of additional properties to be included in the response. Supported values are 'LatestDefinitionVersion, EffectiveDefinitionVersion'.
 */
export const PolicyAssignmentsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PolicyAssignmentsGetInput,
    outputSchema: PolicyAssignmentsGetOutput,
  }),
);
// Input Schema
export const PolicyAssignmentsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $filter: Schema.optional(Schema.String),
    $expand: Schema.optional(Schema.String),
    $top: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/policyAssignments",
    }),
  );
export type PolicyAssignmentsListInput = typeof PolicyAssignmentsListInput.Type;

// Output Schema
export const PolicyAssignmentsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type PolicyAssignmentsListOutput =
  typeof PolicyAssignmentsListOutput.Type;

// The operation
/**
 * Retrieves all policy assignments that apply to a subscription.
 *
 * This operation retrieves the list of all policy assignments associated with the given subscription that match the optional given $filter. Valid values for $filter are: 'atScope()', 'atExactScope()' or 'policyDefinitionId eq '{value}''. If $filter is not provided, the unfiltered list includes all policy assignments associated with the subscription, including those that apply directly or from management groups that contain the given subscription, as well as any applied to objects contained within the subscription. If $filter=atScope() is provided, the returned list includes all policy assignments that apply to the subscription, which is everything in the unfiltered list except those applied to objects contained within the subscription. If $filter=atExactScope() is provided, the returned list only includes all policy assignments that at the subscription. If $filter=policyDefinitionId eq '{value}' is provided, the returned list includes all policy assignments of the policy definition whose id is {value}.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param $filter - The filter to apply on the operation. Valid values for $filter are: 'atScope()', 'atExactScope()' or 'policyDefinitionId eq '{value}''. If $filter is not provided, no filtering is performed. If $filter=atScope() is provided, the returned list only includes all policy assignments that apply to the scope, which is everything in the unfiltered list except those applied to sub scopes contained within the given scope. If $filter=atExactScope() is provided, the returned list only includes all policy assignments that at the given scope. If $filter=policyDefinitionId eq '{value}' is provided, the returned list includes all policy assignments of the policy definition whose id is {value}.
 * @param $expand - Comma-separated list of additional properties to be included in the response. Supported values are 'LatestDefinitionVersion, EffectiveDefinitionVersion'.
 * @param $top - Maximum number of records to return. When the $top filter is not provided, it will return 500 records.
 */
export const PolicyAssignmentsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PolicyAssignmentsListInput,
    outputSchema: PolicyAssignmentsListOutput,
  }),
);
// Input Schema
export const PolicyAssignmentsListForManagementGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    managementGroupId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $filter: Schema.optional(Schema.String),
    $expand: Schema.optional(Schema.String),
    $top: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Authorization/policyAssignments",
    }),
  );
export type PolicyAssignmentsListForManagementGroupInput =
  typeof PolicyAssignmentsListForManagementGroupInput.Type;

// Output Schema
export const PolicyAssignmentsListForManagementGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type PolicyAssignmentsListForManagementGroupOutput =
  typeof PolicyAssignmentsListForManagementGroupOutput.Type;

// The operation
/**
 * Retrieves all policy assignments that apply to a management group.
 *
 * This operation retrieves the list of all policy assignments applicable to the management group that match the given $filter. Valid values for $filter are: 'atScope()', 'atExactScope()' or 'policyDefinitionId eq '{value}''. If $filter=atScope() is provided, the returned list includes all policy assignments that are assigned to the management group or the management group's ancestors. If $filter=atExactScope() is provided, the returned list only includes all policy assignments that at the management group. If $filter=policyDefinitionId eq '{value}' is provided, the returned list includes all policy assignments of the policy definition whose id is {value} that apply to the management group.
 *
 * @param api-version - The API version to use for this operation.
 * @param managementGroupId - The management group ID.
 * @param $filter - The filter to apply on the operation. Valid values for $filter are: 'atScope()', 'atExactScope()' or 'policyDefinitionId eq '{value}''. If $filter is not provided, no filtering is performed. If $filter=atScope() is provided, the returned list only includes all policy assignments that apply to the scope, which is everything in the unfiltered list except those applied to sub scopes contained within the given scope. If $filter=atExactScope() is provided, the returned list only includes all policy assignments that at the given scope. If $filter=policyDefinitionId eq '{value}' is provided, the returned list includes all policy assignments of the policy definition whose id is {value}.
 * @param $expand - Comma-separated list of additional properties to be included in the response. Supported values are 'LatestDefinitionVersion, EffectiveDefinitionVersion'.
 * @param $top - Maximum number of records to return. When the $top filter is not provided, it will return 500 records.
 */
export const PolicyAssignmentsListForManagementGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PolicyAssignmentsListForManagementGroupInput,
    outputSchema: PolicyAssignmentsListForManagementGroupOutput,
  }));
// Input Schema
export const PolicyAssignmentsListForResourceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceProviderNamespace: Schema.String.pipe(T.PathParam()),
    parentResourcePath: Schema.String.pipe(T.PathParam()),
    resourceType: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $filter: Schema.optional(Schema.String),
    $expand: Schema.optional(Schema.String),
    $top: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{parentResourcePath}/{resourceType}/{resourceName}/providers/Microsoft.Authorization/policyAssignments",
    }),
  );
export type PolicyAssignmentsListForResourceInput =
  typeof PolicyAssignmentsListForResourceInput.Type;

// Output Schema
export const PolicyAssignmentsListForResourceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type PolicyAssignmentsListForResourceOutput =
  typeof PolicyAssignmentsListForResourceOutput.Type;

// The operation
/**
 * Retrieves all policy assignments that apply to a resource.
 *
 * This operation retrieves the list of all policy assignments associated with the specified resource in the given resource group and subscription that match the optional given $filter. Valid values for $filter are: 'atScope()', 'atExactScope()' or 'policyDefinitionId eq '{value}''. If $filter is not provided, the unfiltered list includes all policy assignments associated with the resource, including those that apply directly or from all containing scopes, as well as any applied to resources contained within the resource. If $filter=atScope() is provided, the returned list includes all policy assignments that apply to the resource, which is everything in the unfiltered list except those applied to resources contained within the resource. If $filter=atExactScope() is provided, the returned list only includes all policy assignments that at the resource level. If $filter=policyDefinitionId eq '{value}' is provided, the returned list includes all policy assignments of the policy definition whose id is {value} that apply to the resource. Three parameters plus the resource name are used to identify a specific resource. If the resource is not part of a parent resource (the more common case), the parent resource path should not be provided (or provided as ''). For example a web app could be specified as ({resourceProviderNamespace} == 'Microsoft.Web', {parentResourcePath} == '', {resourceType} == 'sites', {resourceName} == 'MyWebApp'). If the resource is part of a parent resource, then all parameters should be provided. For example a virtual machine DNS name could be specified as ({resourceProviderNamespace} == 'Microsoft.Compute', {parentResourcePath} == 'virtualMachines/MyVirtualMachine', {resourceType} == 'domainNames', {resourceName} == 'MyComputerName'). A convenient alternative to providing the namespace and type name separately is to provide both in the {resourceType} parameter, format: ({resourceProviderNamespace} == '', {parentResourcePath} == '', {resourceType} == 'Microsoft.Web/sites', {resourceName} == 'MyWebApp').
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceProviderNamespace - The namespace of the resource provider. For example, the namespace of a virtual machine is Microsoft.Compute (from Microsoft.Compute/virtualMachines)
 * @param parentResourcePath - The parent resource path. Use empty string if there is none.
 * @param resourceType - The resource type name. For example the type name of a web app is 'sites' (from Microsoft.Web/sites).
 * @param resourceName - The name of the resource.
 * @param api-version - The API version to use for this operation.
 * @param $filter - The filter to apply on the operation. Valid values for $filter are: 'atScope()', 'atExactScope()' or 'policyDefinitionId eq '{value}''. If $filter is not provided, no filtering is performed. If $filter=atScope() is provided, the returned list only includes all policy assignments that apply to the scope, which is everything in the unfiltered list except those applied to sub scopes contained within the given scope. If $filter=atExactScope() is provided, the returned list only includes all policy assignments that at the given scope. If $filter=policyDefinitionId eq '{value}' is provided, the returned list includes all policy assignments of the policy definition whose id is {value}.
 * @param $expand - Comma-separated list of additional properties to be included in the response. Supported values are 'LatestDefinitionVersion, EffectiveDefinitionVersion'.
 * @param $top - Maximum number of records to return. When the $top filter is not provided, it will return 500 records.
 */
export const PolicyAssignmentsListForResource =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PolicyAssignmentsListForResourceInput,
    outputSchema: PolicyAssignmentsListForResourceOutput,
  }));
// Input Schema
export const PolicyAssignmentsListForResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $filter: Schema.optional(Schema.String),
    $expand: Schema.optional(Schema.String),
    $top: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Authorization/policyAssignments",
    }),
  );
export type PolicyAssignmentsListForResourceGroupInput =
  typeof PolicyAssignmentsListForResourceGroupInput.Type;

// Output Schema
export const PolicyAssignmentsListForResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type PolicyAssignmentsListForResourceGroupOutput =
  typeof PolicyAssignmentsListForResourceGroupOutput.Type;

// The operation
/**
 * This operation retrieves the list of all policy assignments associated with the given resource group in the given subscription that match the optional given $filter. Valid values for $filter are: 'atScope()', 'atExactScope()' or 'policyDefinitionId eq '{value}''. If $filter is not provided, the unfiltered list includes all policy assignments associated with the resource group, including those that apply directly or apply from containing scopes, as well as any applied to resources contained within the resource group. If $filter=atScope() is provided, the returned list includes all policy assignments that apply to the resource group, which is everything in the unfiltered list except those applied to resources contained within the resource group. If $filter=atExactScope() is provided, the returned list only includes all policy assignments that at the resource group. If $filter=policyDefinitionId eq '{value}' is provided, the returned list includes all policy assignments of the policy definition whose id is {value} that apply to the resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param $filter - The filter to apply on the operation. Valid values for $filter are: 'atScope()', 'atExactScope()' or 'policyDefinitionId eq '{value}''. If $filter is not provided, no filtering is performed. If $filter=atScope() is provided, the returned list only includes all policy assignments that apply to the scope, which is everything in the unfiltered list except those applied to sub scopes contained within the given scope. If $filter=atExactScope() is provided, the returned list only includes all policy assignments that at the given scope. If $filter=policyDefinitionId eq '{value}' is provided, the returned list includes all policy assignments of the policy definition whose id is {value}.
 * @param $expand - Comma-separated list of additional properties to be included in the response. Supported values are 'LatestDefinitionVersion, EffectiveDefinitionVersion'.
 * @param $top - Maximum number of records to return. When the $top filter is not provided, it will return 500 records.
 */
export const PolicyAssignmentsListForResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PolicyAssignmentsListForResourceGroupInput,
    outputSchema: PolicyAssignmentsListForResourceGroupOutput,
  }));
// Input Schema
export const PolicyAssignmentsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scope: Schema.String.pipe(T.PathParam()),
    policyAssignmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/{scope}/providers/Microsoft.Authorization/policyAssignments/{policyAssignmentName}",
    }),
  );
export type PolicyAssignmentsUpdateInput =
  typeof PolicyAssignmentsUpdateInput.Type;

// Output Schema
export const PolicyAssignmentsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PolicyAssignmentsUpdateOutput =
  typeof PolicyAssignmentsUpdateOutput.Type;

// The operation
/**
 * This operation updates a policy assignment with the given scope and name. Policy assignments apply to all resources contained within their scope. For example, when you assign a policy at resource group scope, that policy applies to all resources in the group.
 *
 * @param api-version - The API version to use for this operation.
 * @param scope - The fully qualified Azure Resource manager identifier of the resource.
 * @param policyAssignmentName - The name of the policy assignment to get.
 */
export const PolicyAssignmentsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PolicyAssignmentsUpdateInput,
    outputSchema: PolicyAssignmentsUpdateOutput,
  }),
);
// Input Schema
export const PolicyDefinitionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    policyDefinitionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/policyDefinitions/{policyDefinitionName}",
    }),
  );
export type PolicyDefinitionsCreateOrUpdateInput =
  typeof PolicyDefinitionsCreateOrUpdateInput.Type;

// Output Schema
export const PolicyDefinitionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PolicyDefinitionsCreateOrUpdateOutput =
  typeof PolicyDefinitionsCreateOrUpdateOutput.Type;

// The operation
/**
 * This operation creates or updates a policy definition in the given subscription with the given name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param policyDefinitionName - The name of the policy definition to get.
 */
export const PolicyDefinitionsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PolicyDefinitionsCreateOrUpdateInput,
    outputSchema: PolicyDefinitionsCreateOrUpdateOutput,
  }));
// Input Schema
export const PolicyDefinitionsCreateOrUpdateAtManagementGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    managementGroupId: Schema.String.pipe(T.PathParam()),
    policyDefinitionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Authorization/policyDefinitions/{policyDefinitionName}",
    }),
  );
export type PolicyDefinitionsCreateOrUpdateAtManagementGroupInput =
  typeof PolicyDefinitionsCreateOrUpdateAtManagementGroupInput.Type;

// Output Schema
export const PolicyDefinitionsCreateOrUpdateAtManagementGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PolicyDefinitionsCreateOrUpdateAtManagementGroupOutput =
  typeof PolicyDefinitionsCreateOrUpdateAtManagementGroupOutput.Type;

// The operation
/**
 * This operation creates or updates a policy definition in the given management group with the given name.
 *
 * @param api-version - The API version to use for this operation.
 * @param managementGroupId - The ID of the management group.
 * @param policyDefinitionName - The name of the policy definition to get.
 */
export const PolicyDefinitionsCreateOrUpdateAtManagementGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PolicyDefinitionsCreateOrUpdateAtManagementGroupInput,
    outputSchema: PolicyDefinitionsCreateOrUpdateAtManagementGroupOutput,
  }));
// Input Schema
export const PolicyDefinitionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    policyDefinitionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/policyDefinitions/{policyDefinitionName}",
    }),
  );
export type PolicyDefinitionsDeleteInput =
  typeof PolicyDefinitionsDeleteInput.Type;

// Output Schema
export const PolicyDefinitionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PolicyDefinitionsDeleteOutput =
  typeof PolicyDefinitionsDeleteOutput.Type;

// The operation
/**
 * This operation deletes the policy definition in the given subscription with the given name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param policyDefinitionName - The name of the policy definition to get.
 */
export const PolicyDefinitionsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PolicyDefinitionsDeleteInput,
    outputSchema: PolicyDefinitionsDeleteOutput,
  }),
);
// Input Schema
export const PolicyDefinitionsDeleteAtManagementGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    managementGroupId: Schema.String.pipe(T.PathParam()),
    policyDefinitionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Authorization/policyDefinitions/{policyDefinitionName}",
    }),
  );
export type PolicyDefinitionsDeleteAtManagementGroupInput =
  typeof PolicyDefinitionsDeleteAtManagementGroupInput.Type;

// Output Schema
export const PolicyDefinitionsDeleteAtManagementGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PolicyDefinitionsDeleteAtManagementGroupOutput =
  typeof PolicyDefinitionsDeleteAtManagementGroupOutput.Type;

// The operation
/**
 * This operation deletes the policy definition in the given management group with the given name.
 *
 * @param api-version - The API version to use for this operation.
 * @param managementGroupId - The ID of the management group.
 * @param policyDefinitionName - The name of the policy definition to get.
 */
export const PolicyDefinitionsDeleteAtManagementGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PolicyDefinitionsDeleteAtManagementGroupInput,
    outputSchema: PolicyDefinitionsDeleteAtManagementGroupOutput,
  }));
// Input Schema
export const PolicyDefinitionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    policyDefinitionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/policyDefinitions/{policyDefinitionName}",
    }),
  );
export type PolicyDefinitionsGetInput = typeof PolicyDefinitionsGetInput.Type;

// Output Schema
export const PolicyDefinitionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PolicyDefinitionsGetOutput = typeof PolicyDefinitionsGetOutput.Type;

// The operation
/**
 * This operation retrieves the policy definition in the given subscription with the given name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param policyDefinitionName - The name of the policy definition to get.
 */
export const PolicyDefinitionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PolicyDefinitionsGetInput,
    outputSchema: PolicyDefinitionsGetOutput,
  }),
);
// Input Schema
export const PolicyDefinitionsGetAtManagementGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    managementGroupId: Schema.String.pipe(T.PathParam()),
    policyDefinitionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Authorization/policyDefinitions/{policyDefinitionName}",
    }),
  );
export type PolicyDefinitionsGetAtManagementGroupInput =
  typeof PolicyDefinitionsGetAtManagementGroupInput.Type;

// Output Schema
export const PolicyDefinitionsGetAtManagementGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PolicyDefinitionsGetAtManagementGroupOutput =
  typeof PolicyDefinitionsGetAtManagementGroupOutput.Type;

// The operation
/**
 * This operation retrieves the policy definition in the given management group with the given name.
 *
 * @param api-version - The API version to use for this operation.
 * @param managementGroupId - The ID of the management group.
 * @param policyDefinitionName - The name of the policy definition to get.
 */
export const PolicyDefinitionsGetAtManagementGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PolicyDefinitionsGetAtManagementGroupInput,
    outputSchema: PolicyDefinitionsGetAtManagementGroupOutput,
  }));
// Input Schema
export const PolicyDefinitionsGetBuiltInInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    policyDefinitionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Authorization/policyDefinitions/{policyDefinitionName}",
    }),
  );
export type PolicyDefinitionsGetBuiltInInput =
  typeof PolicyDefinitionsGetBuiltInInput.Type;

// Output Schema
export const PolicyDefinitionsGetBuiltInOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PolicyDefinitionsGetBuiltInOutput =
  typeof PolicyDefinitionsGetBuiltInOutput.Type;

// The operation
/**
 * This operation retrieves the built-in policy definition with the given name.
 *
 * @param api-version - The API version to use for this operation.
 * @param policyDefinitionName - The name of the built-in policy definition to get.
 */
export const PolicyDefinitionsGetBuiltIn = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PolicyDefinitionsGetBuiltInInput,
    outputSchema: PolicyDefinitionsGetBuiltInOutput,
  }),
);
// Input Schema
export const PolicyDefinitionsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $filter: Schema.optional(Schema.String),
    $top: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/policyDefinitions",
    }),
  );
export type PolicyDefinitionsListInput = typeof PolicyDefinitionsListInput.Type;

// Output Schema
export const PolicyDefinitionsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type PolicyDefinitionsListOutput =
  typeof PolicyDefinitionsListOutput.Type;

// The operation
/**
 * This operation retrieves a list of all the policy definitions in a given subscription that match the optional given $filter. Valid values for $filter are: 'atExactScope()', 'policyType -eq {value}' or 'category eq '{value}''. If $filter is not provided, the unfiltered list includes all policy definitions associated with the subscription, including those that apply directly or from management groups that contain the given subscription. If $filter=atExactScope() is provided, the returned list only includes all policy definitions that at the given subscription. If $filter='policyType -eq {value}' is provided, the returned list only includes all policy definitions whose type match the {value}. Possible policyType values are NotSpecified, BuiltIn, Custom, and Static. If $filter='category -eq {value}' is provided, the returned list only includes all policy definitions whose category match the {value}.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param $filter - The filter to apply on the operation. Valid values for $filter are: 'atExactScope()', 'policyType -eq {value}' or 'category eq '{value}''. If $filter is not provided, no filtering is performed. If $filter=atExactScope() is provided, the returned list only includes all policy definitions that at the given scope. If $filter='policyType -eq {value}' is provided, the returned list only includes all policy definitions whose type match the {value}. Possible policyType values are NotSpecified, BuiltIn, Custom, and Static. If $filter='category -eq {value}' is provided, the returned list only includes all policy definitions whose category match the {value}.
 * @param $top - Maximum number of records to return. When the $top filter is not provided, it will return 500 records.
 */
export const PolicyDefinitionsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PolicyDefinitionsListInput,
    outputSchema: PolicyDefinitionsListOutput,
  }),
);
// Input Schema
export const PolicyDefinitionsListBuiltInInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
    $filter: Schema.optional(Schema.String),
    $top: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Authorization/policyDefinitions",
    }),
  );
export type PolicyDefinitionsListBuiltInInput =
  typeof PolicyDefinitionsListBuiltInInput.Type;

// Output Schema
export const PolicyDefinitionsListBuiltInOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type PolicyDefinitionsListBuiltInOutput =
  typeof PolicyDefinitionsListBuiltInOutput.Type;

// The operation
/**
 * This operation retrieves a list of all the built-in policy definitions that match the optional given $filter. If $filter='policyType -eq {value}' is provided, the returned list only includes all built-in policy definitions whose type match the {value}. Possible policyType values are NotSpecified, BuiltIn, Custom, and Static. If $filter='category -eq {value}' is provided, the returned list only includes all built-in policy definitions whose category match the {value}.
 *
 * @param api-version - The API version to use for this operation.
 * @param $filter - The filter to apply on the operation. Valid values for $filter are: 'atExactScope()', 'policyType -eq {value}' or 'category eq '{value}''. If $filter is not provided, no filtering is performed. If $filter=atExactScope() is provided, the returned list only includes all policy definitions that at the given scope. If $filter='policyType -eq {value}' is provided, the returned list only includes all policy definitions whose type match the {value}. Possible policyType values are NotSpecified, BuiltIn, Custom, and Static. If $filter='category -eq {value}' is provided, the returned list only includes all policy definitions whose category match the {value}.
 * @param $top - Maximum number of records to return. When the $top filter is not provided, it will return 500 records.
 */
export const PolicyDefinitionsListBuiltIn =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PolicyDefinitionsListBuiltInInput,
    outputSchema: PolicyDefinitionsListBuiltInOutput,
  }));
// Input Schema
export const PolicyDefinitionsListByManagementGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    managementGroupId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $filter: Schema.optional(Schema.String),
    $top: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Authorization/policyDefinitions",
    }),
  );
export type PolicyDefinitionsListByManagementGroupInput =
  typeof PolicyDefinitionsListByManagementGroupInput.Type;

// Output Schema
export const PolicyDefinitionsListByManagementGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type PolicyDefinitionsListByManagementGroupOutput =
  typeof PolicyDefinitionsListByManagementGroupOutput.Type;

// The operation
/**
 * This operation retrieves a list of all the policy definitions in a given management group that match the optional given $filter. Valid values for $filter are: 'atExactScope()', 'policyType -eq {value}' or 'category eq '{value}''. If $filter is not provided, the unfiltered list includes all policy definitions associated with the management group, including those that apply directly or from management groups that contain the given management group. If $filter=atExactScope() is provided, the returned list only includes all policy definitions that at the given management group. If $filter='policyType -eq {value}' is provided, the returned list only includes all policy definitions whose type match the {value}. Possible policyType values are NotSpecified, BuiltIn, Custom, and Static. If $filter='category -eq {value}' is provided, the returned list only includes all policy definitions whose category match the {value}.
 *
 * @param api-version - The API version to use for this operation.
 * @param managementGroupId - The ID of the management group.
 * @param $filter - The filter to apply on the operation. Valid values for $filter are: 'atExactScope()', 'policyType -eq {value}' or 'category eq '{value}''. If $filter is not provided, no filtering is performed. If $filter=atExactScope() is provided, the returned list only includes all policy definitions that at the given scope. If $filter='policyType -eq {value}' is provided, the returned list only includes all policy definitions whose type match the {value}. Possible policyType values are NotSpecified, BuiltIn, Custom, and Static. If $filter='category -eq {value}' is provided, the returned list only includes all policy definitions whose category match the {value}.
 * @param $top - Maximum number of records to return. When the $top filter is not provided, it will return 500 records.
 */
export const PolicyDefinitionsListByManagementGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PolicyDefinitionsListByManagementGroupInput,
    outputSchema: PolicyDefinitionsListByManagementGroupOutput,
  }));
// Input Schema
export const PolicyDefinitionVersionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    policyDefinitionName: Schema.String.pipe(T.PathParam()),
    policyDefinitionVersion: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/policyDefinitions/{policyDefinitionName}/versions/{policyDefinitionVersion}",
    }),
  );
export type PolicyDefinitionVersionsCreateOrUpdateInput =
  typeof PolicyDefinitionVersionsCreateOrUpdateInput.Type;

// Output Schema
export const PolicyDefinitionVersionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PolicyDefinitionVersionsCreateOrUpdateOutput =
  typeof PolicyDefinitionVersionsCreateOrUpdateOutput.Type;

// The operation
/**
 * This operation creates or updates a policy definition in the given subscription with the given name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param policyDefinitionName - The name of the policy definition.
 * @param policyDefinitionVersion - The policy definition version.  The format is x.y.z where x is the major version number, y is the minor version number, and z is the patch number
 */
export const PolicyDefinitionVersionsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PolicyDefinitionVersionsCreateOrUpdateInput,
    outputSchema: PolicyDefinitionVersionsCreateOrUpdateOutput,
  }));
// Input Schema
export const PolicyDefinitionVersionsCreateOrUpdateAtManagementGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    managementGroupName: Schema.String.pipe(T.PathParam()),
    policyDefinitionName: Schema.String.pipe(T.PathParam()),
    policyDefinitionVersion: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/providers/Microsoft.Management/managementGroups/{managementGroupName}/providers/Microsoft.Authorization/policyDefinitions/{policyDefinitionName}/versions/{policyDefinitionVersion}",
    }),
  );
export type PolicyDefinitionVersionsCreateOrUpdateAtManagementGroupInput =
  typeof PolicyDefinitionVersionsCreateOrUpdateAtManagementGroupInput.Type;

// Output Schema
export const PolicyDefinitionVersionsCreateOrUpdateAtManagementGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PolicyDefinitionVersionsCreateOrUpdateAtManagementGroupOutput =
  typeof PolicyDefinitionVersionsCreateOrUpdateAtManagementGroupOutput.Type;

// The operation
/**
 * This operation creates or updates a policy definition version in the given management group with the given name.
 *
 * @param api-version - The API version to use for this operation.
 * @param managementGroupName - The name of the management group. The name is case insensitive.
 * @param policyDefinitionName - The name of the policy definition.
 * @param policyDefinitionVersion - The policy definition version.  The format is x.y.z where x is the major version number, y is the minor version number, and z is the patch number
 */
export const PolicyDefinitionVersionsCreateOrUpdateAtManagementGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PolicyDefinitionVersionsCreateOrUpdateAtManagementGroupInput,
    outputSchema: PolicyDefinitionVersionsCreateOrUpdateAtManagementGroupOutput,
  }));
// Input Schema
export const PolicyDefinitionVersionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    policyDefinitionName: Schema.String.pipe(T.PathParam()),
    policyDefinitionVersion: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/policyDefinitions/{policyDefinitionName}/versions/{policyDefinitionVersion}",
    }),
  );
export type PolicyDefinitionVersionsDeleteInput =
  typeof PolicyDefinitionVersionsDeleteInput.Type;

// Output Schema
export const PolicyDefinitionVersionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PolicyDefinitionVersionsDeleteOutput =
  typeof PolicyDefinitionVersionsDeleteOutput.Type;

// The operation
/**
 * This operation deletes the policy definition version in the given subscription with the given name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param policyDefinitionName - The name of the policy definition.
 * @param policyDefinitionVersion - The policy definition version.  The format is x.y.z where x is the major version number, y is the minor version number, and z is the patch number
 */
export const PolicyDefinitionVersionsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PolicyDefinitionVersionsDeleteInput,
    outputSchema: PolicyDefinitionVersionsDeleteOutput,
  }));
// Input Schema
export const PolicyDefinitionVersionsDeleteAtManagementGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    managementGroupName: Schema.String.pipe(T.PathParam()),
    policyDefinitionName: Schema.String.pipe(T.PathParam()),
    policyDefinitionVersion: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/providers/Microsoft.Management/managementGroups/{managementGroupName}/providers/Microsoft.Authorization/policyDefinitions/{policyDefinitionName}/versions/{policyDefinitionVersion}",
    }),
  );
export type PolicyDefinitionVersionsDeleteAtManagementGroupInput =
  typeof PolicyDefinitionVersionsDeleteAtManagementGroupInput.Type;

// Output Schema
export const PolicyDefinitionVersionsDeleteAtManagementGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PolicyDefinitionVersionsDeleteAtManagementGroupOutput =
  typeof PolicyDefinitionVersionsDeleteAtManagementGroupOutput.Type;

// The operation
/**
 * This operation deletes the policy definition in the given management group with the given name.
 *
 * @param api-version - The API version to use for this operation.
 * @param managementGroupName - The name of the management group. The name is case insensitive.
 * @param policyDefinitionName - The name of the policy definition.
 * @param policyDefinitionVersion - The policy definition version.  The format is x.y.z where x is the major version number, y is the minor version number, and z is the patch number
 */
export const PolicyDefinitionVersionsDeleteAtManagementGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PolicyDefinitionVersionsDeleteAtManagementGroupInput,
    outputSchema: PolicyDefinitionVersionsDeleteAtManagementGroupOutput,
  }));
// Input Schema
export const PolicyDefinitionVersionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    policyDefinitionName: Schema.String.pipe(T.PathParam()),
    policyDefinitionVersion: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/policyDefinitions/{policyDefinitionName}/versions/{policyDefinitionVersion}",
    }),
  );
export type PolicyDefinitionVersionsGetInput =
  typeof PolicyDefinitionVersionsGetInput.Type;

// Output Schema
export const PolicyDefinitionVersionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PolicyDefinitionVersionsGetOutput =
  typeof PolicyDefinitionVersionsGetOutput.Type;

// The operation
/**
 * This operation retrieves the policy definition version in the given subscription with the given name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param policyDefinitionName - The name of the policy definition.
 * @param policyDefinitionVersion - The policy definition version.  The format is x.y.z where x is the major version number, y is the minor version number, and z is the patch number
 */
export const PolicyDefinitionVersionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PolicyDefinitionVersionsGetInput,
    outputSchema: PolicyDefinitionVersionsGetOutput,
  }),
);
// Input Schema
export const PolicyDefinitionVersionsGetAtManagementGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    managementGroupName: Schema.String.pipe(T.PathParam()),
    policyDefinitionName: Schema.String.pipe(T.PathParam()),
    policyDefinitionVersion: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Management/managementGroups/{managementGroupName}/providers/Microsoft.Authorization/policyDefinitions/{policyDefinitionName}/versions/{policyDefinitionVersion}",
    }),
  );
export type PolicyDefinitionVersionsGetAtManagementGroupInput =
  typeof PolicyDefinitionVersionsGetAtManagementGroupInput.Type;

// Output Schema
export const PolicyDefinitionVersionsGetAtManagementGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PolicyDefinitionVersionsGetAtManagementGroupOutput =
  typeof PolicyDefinitionVersionsGetAtManagementGroupOutput.Type;

// The operation
/**
 * This operation retrieves the policy definition version in the given management group with the given name.
 *
 * @param api-version - The API version to use for this operation.
 * @param managementGroupName - The name of the management group. The name is case insensitive.
 * @param policyDefinitionName - The name of the policy definition.
 * @param policyDefinitionVersion - The policy definition version.  The format is x.y.z where x is the major version number, y is the minor version number, and z is the patch number
 */
export const PolicyDefinitionVersionsGetAtManagementGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PolicyDefinitionVersionsGetAtManagementGroupInput,
    outputSchema: PolicyDefinitionVersionsGetAtManagementGroupOutput,
  }));
// Input Schema
export const PolicyDefinitionVersionsGetBuiltInInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    policyDefinitionName: Schema.String.pipe(T.PathParam()),
    policyDefinitionVersion: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Authorization/policyDefinitions/{policyDefinitionName}/versions/{policyDefinitionVersion}",
    }),
  );
export type PolicyDefinitionVersionsGetBuiltInInput =
  typeof PolicyDefinitionVersionsGetBuiltInInput.Type;

// Output Schema
export const PolicyDefinitionVersionsGetBuiltInOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PolicyDefinitionVersionsGetBuiltInOutput =
  typeof PolicyDefinitionVersionsGetBuiltInOutput.Type;

// The operation
/**
 * This operation retrieves the built-in policy definition version with the given name.
 *
 * @param api-version - The API version to use for this operation.
 * @param policyDefinitionName - The name of the policy definition.
 * @param policyDefinitionVersion - The policy definition version.  The format is x.y.z where x is the major version number, y is the minor version number, and z is the patch number
 */
export const PolicyDefinitionVersionsGetBuiltIn =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PolicyDefinitionVersionsGetBuiltInInput,
    outputSchema: PolicyDefinitionVersionsGetBuiltInOutput,
  }));
// Input Schema
export const PolicyDefinitionVersionsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    policyDefinitionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $top: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/policyDefinitions/{policyDefinitionName}/versions",
    }),
  );
export type PolicyDefinitionVersionsListInput =
  typeof PolicyDefinitionVersionsListInput.Type;

// Output Schema
export const PolicyDefinitionVersionsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type PolicyDefinitionVersionsListOutput =
  typeof PolicyDefinitionVersionsListOutput.Type;

// The operation
/**
 * This operation retrieves a list of all the policy definition versions for the given policy definition.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param policyDefinitionName - The name of the policy definition.
 * @param $top - Maximum number of records to return. When the $top filter is not provided, it will return 500 records.
 */
export const PolicyDefinitionVersionsList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PolicyDefinitionVersionsListInput,
    outputSchema: PolicyDefinitionVersionsListOutput,
  }));
// Input Schema
export const PolicyDefinitionVersionsListAllInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/listPolicyDefinitionVersions",
    }),
  );
export type PolicyDefinitionVersionsListAllInput =
  typeof PolicyDefinitionVersionsListAllInput.Type;

// Output Schema
export const PolicyDefinitionVersionsListAllOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type PolicyDefinitionVersionsListAllOutput =
  typeof PolicyDefinitionVersionsListAllOutput.Type;

// The operation
/**
 * Lists all policy definition versions within a subscription.
 *
 * This operation lists all the policy definition versions for all policy definitions within a subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const PolicyDefinitionVersionsListAll =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PolicyDefinitionVersionsListAllInput,
    outputSchema: PolicyDefinitionVersionsListAllOutput,
  }));
// Input Schema
export const PolicyDefinitionVersionsListAllAtManagementGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    managementGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.Management/managementGroups/{managementGroupName}/providers/Microsoft.Authorization/listPolicyDefinitionVersions",
    }),
  );
export type PolicyDefinitionVersionsListAllAtManagementGroupInput =
  typeof PolicyDefinitionVersionsListAllAtManagementGroupInput.Type;

// Output Schema
export const PolicyDefinitionVersionsListAllAtManagementGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type PolicyDefinitionVersionsListAllAtManagementGroupOutput =
  typeof PolicyDefinitionVersionsListAllAtManagementGroupOutput.Type;

// The operation
/**
 * Lists all policy definition versions at management group scope.
 *
 * This operation lists all the policy definition versions for all policy definitions at the management group scope.
 *
 * @param managementGroupName - The name of the management group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const PolicyDefinitionVersionsListAllAtManagementGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PolicyDefinitionVersionsListAllAtManagementGroupInput,
    outputSchema: PolicyDefinitionVersionsListAllAtManagementGroupOutput,
  }));
// Input Schema
export const PolicyDefinitionVersionsListAllBuiltinsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.Authorization/listPolicyDefinitionVersions",
    }),
  );
export type PolicyDefinitionVersionsListAllBuiltinsInput =
  typeof PolicyDefinitionVersionsListAllBuiltinsInput.Type;

// Output Schema
export const PolicyDefinitionVersionsListAllBuiltinsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type PolicyDefinitionVersionsListAllBuiltinsOutput =
  typeof PolicyDefinitionVersionsListAllBuiltinsOutput.Type;

// The operation
/**
 * Lists all built-in policy definition versions.
 *
 * This operation lists all the built-in policy definition versions for all built-in policy definitions.
 *
 * @param api-version - The API version to use for this operation.
 */
export const PolicyDefinitionVersionsListAllBuiltins =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PolicyDefinitionVersionsListAllBuiltinsInput,
    outputSchema: PolicyDefinitionVersionsListAllBuiltinsOutput,
  }));
// Input Schema
export const PolicyDefinitionVersionsListBuiltInInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    policyDefinitionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $top: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Authorization/policyDefinitions/{policyDefinitionName}/versions",
    }),
  );
export type PolicyDefinitionVersionsListBuiltInInput =
  typeof PolicyDefinitionVersionsListBuiltInInput.Type;

// Output Schema
export const PolicyDefinitionVersionsListBuiltInOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type PolicyDefinitionVersionsListBuiltInOutput =
  typeof PolicyDefinitionVersionsListBuiltInOutput.Type;

// The operation
/**
 * This operation retrieves a list of all the built-in policy definition versions for the given policy definition.
 *
 * @param api-version - The API version to use for this operation.
 * @param policyDefinitionName - The name of the policy definition.
 * @param $top - Maximum number of records to return. When the $top filter is not provided, it will return 500 records.
 */
export const PolicyDefinitionVersionsListBuiltIn =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PolicyDefinitionVersionsListBuiltInInput,
    outputSchema: PolicyDefinitionVersionsListBuiltInOutput,
  }));
// Input Schema
export const PolicyDefinitionVersionsListByManagementGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    managementGroupName: Schema.String.pipe(T.PathParam()),
    policyDefinitionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $top: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Management/managementGroups/{managementGroupName}/providers/Microsoft.Authorization/policyDefinitions/{policyDefinitionName}/versions",
    }),
  );
export type PolicyDefinitionVersionsListByManagementGroupInput =
  typeof PolicyDefinitionVersionsListByManagementGroupInput.Type;

// Output Schema
export const PolicyDefinitionVersionsListByManagementGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type PolicyDefinitionVersionsListByManagementGroupOutput =
  typeof PolicyDefinitionVersionsListByManagementGroupOutput.Type;

// The operation
/**
 * This operation retrieves a list of all the policy definition versions for the given policy definition in the given management group.
 *
 * @param api-version - The API version to use for this operation.
 * @param managementGroupName - The name of the management group. The name is case insensitive.
 * @param policyDefinitionName - The name of the policy definition.
 * @param $top - Maximum number of records to return. When the $top filter is not provided, it will return 500 records.
 */
export const PolicyDefinitionVersionsListByManagementGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PolicyDefinitionVersionsListByManagementGroupInput,
    outputSchema: PolicyDefinitionVersionsListByManagementGroupOutput,
  }));
// Input Schema
export const PolicySetDefinitionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    policySetDefinitionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/policySetDefinitions/{policySetDefinitionName}",
    }),
  );
export type PolicySetDefinitionsCreateOrUpdateInput =
  typeof PolicySetDefinitionsCreateOrUpdateInput.Type;

// Output Schema
export const PolicySetDefinitionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PolicySetDefinitionsCreateOrUpdateOutput =
  typeof PolicySetDefinitionsCreateOrUpdateOutput.Type;

// The operation
/**
 * This operation creates or updates a policy set definition in the given subscription with the given name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param policySetDefinitionName - The name of the policy set definition to get.
 */
export const PolicySetDefinitionsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PolicySetDefinitionsCreateOrUpdateInput,
    outputSchema: PolicySetDefinitionsCreateOrUpdateOutput,
  }));
// Input Schema
export const PolicySetDefinitionsCreateOrUpdateAtManagementGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    managementGroupId: Schema.String.pipe(T.PathParam()),
    policySetDefinitionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Authorization/policySetDefinitions/{policySetDefinitionName}",
    }),
  );
export type PolicySetDefinitionsCreateOrUpdateAtManagementGroupInput =
  typeof PolicySetDefinitionsCreateOrUpdateAtManagementGroupInput.Type;

// Output Schema
export const PolicySetDefinitionsCreateOrUpdateAtManagementGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PolicySetDefinitionsCreateOrUpdateAtManagementGroupOutput =
  typeof PolicySetDefinitionsCreateOrUpdateAtManagementGroupOutput.Type;

// The operation
/**
 * This operation creates or updates a policy set definition in the given management group with the given name.
 *
 * @param api-version - The API version to use for this operation.
 * @param managementGroupId - The ID of the management group.
 * @param policySetDefinitionName - The name of the policy set definition to get.
 */
export const PolicySetDefinitionsCreateOrUpdateAtManagementGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PolicySetDefinitionsCreateOrUpdateAtManagementGroupInput,
    outputSchema: PolicySetDefinitionsCreateOrUpdateAtManagementGroupOutput,
  }));
// Input Schema
export const PolicySetDefinitionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    policySetDefinitionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/policySetDefinitions/{policySetDefinitionName}",
    }),
  );
export type PolicySetDefinitionsDeleteInput =
  typeof PolicySetDefinitionsDeleteInput.Type;

// Output Schema
export const PolicySetDefinitionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PolicySetDefinitionsDeleteOutput =
  typeof PolicySetDefinitionsDeleteOutput.Type;

// The operation
/**
 * This operation deletes the policy set definition in the given subscription with the given name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param policySetDefinitionName - The name of the policy set definition to get.
 */
export const PolicySetDefinitionsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PolicySetDefinitionsDeleteInput,
    outputSchema: PolicySetDefinitionsDeleteOutput,
  }),
);
// Input Schema
export const PolicySetDefinitionsDeleteAtManagementGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    managementGroupId: Schema.String.pipe(T.PathParam()),
    policySetDefinitionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Authorization/policySetDefinitions/{policySetDefinitionName}",
    }),
  );
export type PolicySetDefinitionsDeleteAtManagementGroupInput =
  typeof PolicySetDefinitionsDeleteAtManagementGroupInput.Type;

// Output Schema
export const PolicySetDefinitionsDeleteAtManagementGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PolicySetDefinitionsDeleteAtManagementGroupOutput =
  typeof PolicySetDefinitionsDeleteAtManagementGroupOutput.Type;

// The operation
/**
 * This operation deletes the policy set definition in the given management group with the given name.
 *
 * @param api-version - The API version to use for this operation.
 * @param managementGroupId - The ID of the management group.
 * @param policySetDefinitionName - The name of the policy set definition to get.
 */
export const PolicySetDefinitionsDeleteAtManagementGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PolicySetDefinitionsDeleteAtManagementGroupInput,
    outputSchema: PolicySetDefinitionsDeleteAtManagementGroupOutput,
  }));
// Input Schema
export const PolicySetDefinitionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    policySetDefinitionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/policySetDefinitions/{policySetDefinitionName}",
    }),
  );
export type PolicySetDefinitionsGetInput =
  typeof PolicySetDefinitionsGetInput.Type;

// Output Schema
export const PolicySetDefinitionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PolicySetDefinitionsGetOutput =
  typeof PolicySetDefinitionsGetOutput.Type;

// The operation
/**
 * This operation retrieves the policy set definition in the given subscription with the given name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param policySetDefinitionName - The name of the policy set definition to get.
 * @param $expand - Comma-separated list of additional properties to be included in the response. Supported values are 'LatestDefinitionVersion, EffectiveDefinitionVersion'.
 */
export const PolicySetDefinitionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PolicySetDefinitionsGetInput,
    outputSchema: PolicySetDefinitionsGetOutput,
  }),
);
// Input Schema
export const PolicySetDefinitionsGetAtManagementGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    managementGroupId: Schema.String.pipe(T.PathParam()),
    policySetDefinitionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Authorization/policySetDefinitions/{policySetDefinitionName}",
    }),
  );
export type PolicySetDefinitionsGetAtManagementGroupInput =
  typeof PolicySetDefinitionsGetAtManagementGroupInput.Type;

// Output Schema
export const PolicySetDefinitionsGetAtManagementGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PolicySetDefinitionsGetAtManagementGroupOutput =
  typeof PolicySetDefinitionsGetAtManagementGroupOutput.Type;

// The operation
/**
 * This operation retrieves the policy set definition in the given management group with the given name.
 *
 * @param api-version - The API version to use for this operation.
 * @param managementGroupId - The ID of the management group.
 * @param policySetDefinitionName - The name of the policy set definition to get.
 * @param $expand - Comma-separated list of additional properties to be included in the response. Supported values are 'LatestDefinitionVersion, EffectiveDefinitionVersion'.
 */
export const PolicySetDefinitionsGetAtManagementGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PolicySetDefinitionsGetAtManagementGroupInput,
    outputSchema: PolicySetDefinitionsGetAtManagementGroupOutput,
  }));
// Input Schema
export const PolicySetDefinitionsGetBuiltInInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    policySetDefinitionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Authorization/policySetDefinitions/{policySetDefinitionName}",
    }),
  );
export type PolicySetDefinitionsGetBuiltInInput =
  typeof PolicySetDefinitionsGetBuiltInInput.Type;

// Output Schema
export const PolicySetDefinitionsGetBuiltInOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PolicySetDefinitionsGetBuiltInOutput =
  typeof PolicySetDefinitionsGetBuiltInOutput.Type;

// The operation
/**
 * This operation retrieves the built-in policy set definition with the given name.
 *
 * @param api-version - The API version to use for this operation.
 * @param policySetDefinitionName - The name of the policy set definition to get.
 * @param $expand - Comma-separated list of additional properties to be included in the response. Supported values are 'LatestDefinitionVersion, EffectiveDefinitionVersion'.
 */
export const PolicySetDefinitionsGetBuiltIn =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PolicySetDefinitionsGetBuiltInInput,
    outputSchema: PolicySetDefinitionsGetBuiltInOutput,
  }));
// Input Schema
export const PolicySetDefinitionsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $filter: Schema.optional(Schema.String),
    $expand: Schema.optional(Schema.String),
    $top: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/policySetDefinitions",
    }),
  );
export type PolicySetDefinitionsListInput =
  typeof PolicySetDefinitionsListInput.Type;

// Output Schema
export const PolicySetDefinitionsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type PolicySetDefinitionsListOutput =
  typeof PolicySetDefinitionsListOutput.Type;

// The operation
/**
 * This operation retrieves a list of all the policy set definitions in a given subscription that match the optional given $filter. Valid values for $filter are: 'atExactScope()', 'policyType -eq {value}' or 'category eq '{value}''. If $filter is not provided, the unfiltered list includes all policy set definitions associated with the subscription, including those that apply directly or from management groups that contain the given subscription. If $filter=atExactScope() is provided, the returned list only includes all policy set definitions that at the given subscription. If $filter='policyType -eq {value}' is provided, the returned list only includes all policy set definitions whose type match the {value}. Possible policyType values are NotSpecified, BuiltIn and Custom. If $filter='category -eq {value}' is provided, the returned list only includes all policy set definitions whose category match the {value}.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param $filter - The filter to apply on the operation. Valid values for $filter are: 'atExactScope()', 'policyType -eq {value}' or 'category eq '{value}''. If $filter is not provided, no filtering is performed. If $filter=atExactScope() is provided, the returned list only includes all policy set definitions that at the given scope. If $filter='policyType -eq {value}' is provided, the returned list only includes all policy set definitions whose type match the {value}. Possible policyType values are NotSpecified, BuiltIn, Custom, and Static. If $filter='category -eq {value}' is provided, the returned list only includes all policy set definitions whose category match the {value}.
 * @param $expand - Comma-separated list of additional properties to be included in the response. Supported values are 'LatestDefinitionVersion, EffectiveDefinitionVersion'.
 * @param $top - Maximum number of records to return. When the $top filter is not provided, it will return 500 records.
 */
export const PolicySetDefinitionsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PolicySetDefinitionsListInput,
    outputSchema: PolicySetDefinitionsListOutput,
  }),
);
// Input Schema
export const PolicySetDefinitionsListBuiltInInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
    $filter: Schema.optional(Schema.String),
    $expand: Schema.optional(Schema.String),
    $top: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Authorization/policySetDefinitions",
    }),
  );
export type PolicySetDefinitionsListBuiltInInput =
  typeof PolicySetDefinitionsListBuiltInInput.Type;

// Output Schema
export const PolicySetDefinitionsListBuiltInOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type PolicySetDefinitionsListBuiltInOutput =
  typeof PolicySetDefinitionsListBuiltInOutput.Type;

// The operation
/**
 * This operation retrieves a list of all the built-in policy set definitions that match the optional given $filter. If $filter='category -eq {value}' is provided, the returned list only includes all built-in policy set definitions whose category match the {value}.
 *
 * @param api-version - The API version to use for this operation.
 * @param $filter - The filter to apply on the operation. Valid values for $filter are: 'atExactScope()', 'policyType -eq {value}' or 'category eq '{value}''. If $filter is not provided, no filtering is performed. If $filter=atExactScope() is provided, the returned list only includes all policy set definitions that at the given scope. If $filter='policyType -eq {value}' is provided, the returned list only includes all policy set definitions whose type match the {value}. Possible policyType values are NotSpecified, BuiltIn, Custom, and Static. If $filter='category -eq {value}' is provided, the returned list only includes all policy set definitions whose category match the {value}.
 * @param $expand - Comma-separated list of additional properties to be included in the response. Supported values are 'LatestDefinitionVersion, EffectiveDefinitionVersion'.
 * @param $top - Maximum number of records to return. When the $top filter is not provided, it will return 500 records.
 */
export const PolicySetDefinitionsListBuiltIn =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PolicySetDefinitionsListBuiltInInput,
    outputSchema: PolicySetDefinitionsListBuiltInOutput,
  }));
// Input Schema
export const PolicySetDefinitionsListByManagementGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    managementGroupId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $filter: Schema.optional(Schema.String),
    $expand: Schema.optional(Schema.String),
    $top: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Authorization/policySetDefinitions",
    }),
  );
export type PolicySetDefinitionsListByManagementGroupInput =
  typeof PolicySetDefinitionsListByManagementGroupInput.Type;

// Output Schema
export const PolicySetDefinitionsListByManagementGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type PolicySetDefinitionsListByManagementGroupOutput =
  typeof PolicySetDefinitionsListByManagementGroupOutput.Type;

// The operation
/**
 * This operation retrieves a list of all the policy set definitions in a given management group that match the optional given $filter. Valid values for $filter are: 'atExactScope()', 'policyType -eq {value}' or 'category eq '{value}''. If $filter is not provided, the unfiltered list includes all policy set definitions associated with the management group, including those that apply directly or from management groups that contain the given management group. If $filter=atExactScope() is provided, the returned list only includes all policy set definitions that at the given management group. If $filter='policyType -eq {value}' is provided, the returned list only includes all policy set definitions whose type match the {value}. Possible policyType values are NotSpecified, BuiltIn and Custom. If $filter='category -eq {value}' is provided, the returned list only includes all policy set definitions whose category match the {value}.
 *
 * @param api-version - The API version to use for this operation.
 * @param managementGroupId - The ID of the management group.
 * @param $filter - The filter to apply on the operation. Valid values for $filter are: 'atExactScope()', 'policyType -eq {value}' or 'category eq '{value}''. If $filter is not provided, no filtering is performed. If $filter=atExactScope() is provided, the returned list only includes all policy set definitions that at the given scope. If $filter='policyType -eq {value}' is provided, the returned list only includes all policy set definitions whose type match the {value}. Possible policyType values are NotSpecified, BuiltIn, Custom, and Static. If $filter='category -eq {value}' is provided, the returned list only includes all policy set definitions whose category match the {value}.
 * @param $expand - Comma-separated list of additional properties to be included in the response. Supported values are 'LatestDefinitionVersion, EffectiveDefinitionVersion'.
 * @param $top - Maximum number of records to return. When the $top filter is not provided, it will return 500 records.
 */
export const PolicySetDefinitionsListByManagementGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PolicySetDefinitionsListByManagementGroupInput,
    outputSchema: PolicySetDefinitionsListByManagementGroupOutput,
  }));
// Input Schema
export const PolicySetDefinitionVersionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    policySetDefinitionName: Schema.String.pipe(T.PathParam()),
    policyDefinitionVersion: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/policySetDefinitions/{policySetDefinitionName}/versions/{policyDefinitionVersion}",
    }),
  );
export type PolicySetDefinitionVersionsCreateOrUpdateInput =
  typeof PolicySetDefinitionVersionsCreateOrUpdateInput.Type;

// Output Schema
export const PolicySetDefinitionVersionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PolicySetDefinitionVersionsCreateOrUpdateOutput =
  typeof PolicySetDefinitionVersionsCreateOrUpdateOutput.Type;

// The operation
/**
 * This operation creates or updates a policy set definition version in the given subscription with the given name and version.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param policySetDefinitionName - The name of the policy set definition.
 * @param policyDefinitionVersion - The policy set definition version.  The format is x.y.z where x is the major version number, y is the minor version number, and z is the patch number
 */
export const PolicySetDefinitionVersionsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PolicySetDefinitionVersionsCreateOrUpdateInput,
    outputSchema: PolicySetDefinitionVersionsCreateOrUpdateOutput,
  }));
// Input Schema
export const PolicySetDefinitionVersionsCreateOrUpdateAtManagementGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    managementGroupName: Schema.String.pipe(T.PathParam()),
    policySetDefinitionName: Schema.String.pipe(T.PathParam()),
    policyDefinitionVersion: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/providers/Microsoft.Management/managementGroups/{managementGroupName}/providers/Microsoft.Authorization/policySetDefinitions/{policySetDefinitionName}/versions/{policyDefinitionVersion}",
    }),
  );
export type PolicySetDefinitionVersionsCreateOrUpdateAtManagementGroupInput =
  typeof PolicySetDefinitionVersionsCreateOrUpdateAtManagementGroupInput.Type;

// Output Schema
export const PolicySetDefinitionVersionsCreateOrUpdateAtManagementGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PolicySetDefinitionVersionsCreateOrUpdateAtManagementGroupOutput =
  typeof PolicySetDefinitionVersionsCreateOrUpdateAtManagementGroupOutput.Type;

// The operation
/**
 * This operation creates or updates a policy set definition version in the given management group with the given name and version.
 *
 * @param api-version - The API version to use for this operation.
 * @param managementGroupName - The name of the management group. The name is case insensitive.
 * @param policySetDefinitionName - The name of the policy set definition.
 * @param policyDefinitionVersion - The policy set definition version.  The format is x.y.z where x is the major version number, y is the minor version number, and z is the patch number
 */
export const PolicySetDefinitionVersionsCreateOrUpdateAtManagementGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      PolicySetDefinitionVersionsCreateOrUpdateAtManagementGroupInput,
    outputSchema:
      PolicySetDefinitionVersionsCreateOrUpdateAtManagementGroupOutput,
  }));
// Input Schema
export const PolicySetDefinitionVersionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    policySetDefinitionName: Schema.String.pipe(T.PathParam()),
    policyDefinitionVersion: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/policySetDefinitions/{policySetDefinitionName}/versions/{policyDefinitionVersion}",
    }),
  );
export type PolicySetDefinitionVersionsDeleteInput =
  typeof PolicySetDefinitionVersionsDeleteInput.Type;

// Output Schema
export const PolicySetDefinitionVersionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PolicySetDefinitionVersionsDeleteOutput =
  typeof PolicySetDefinitionVersionsDeleteOutput.Type;

// The operation
/**
 * This operation deletes the policy set definition version in the given subscription with the given name and version.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param policySetDefinitionName - The name of the policy set definition.
 * @param policyDefinitionVersion - The policy set definition version.  The format is x.y.z where x is the major version number, y is the minor version number, and z is the patch number
 */
export const PolicySetDefinitionVersionsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PolicySetDefinitionVersionsDeleteInput,
    outputSchema: PolicySetDefinitionVersionsDeleteOutput,
  }));
// Input Schema
export const PolicySetDefinitionVersionsDeleteAtManagementGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    managementGroupName: Schema.String.pipe(T.PathParam()),
    policySetDefinitionName: Schema.String.pipe(T.PathParam()),
    policyDefinitionVersion: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/providers/Microsoft.Management/managementGroups/{managementGroupName}/providers/Microsoft.Authorization/policySetDefinitions/{policySetDefinitionName}/versions/{policyDefinitionVersion}",
    }),
  );
export type PolicySetDefinitionVersionsDeleteAtManagementGroupInput =
  typeof PolicySetDefinitionVersionsDeleteAtManagementGroupInput.Type;

// Output Schema
export const PolicySetDefinitionVersionsDeleteAtManagementGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PolicySetDefinitionVersionsDeleteAtManagementGroupOutput =
  typeof PolicySetDefinitionVersionsDeleteAtManagementGroupOutput.Type;

// The operation
/**
 * This operation deletes the policy set definition version in the given management group with the given name and version.
 *
 * @param api-version - The API version to use for this operation.
 * @param managementGroupName - The name of the management group. The name is case insensitive.
 * @param policySetDefinitionName - The name of the policy set definition.
 * @param policyDefinitionVersion - The policy set definition version.  The format is x.y.z where x is the major version number, y is the minor version number, and z is the patch number
 */
export const PolicySetDefinitionVersionsDeleteAtManagementGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PolicySetDefinitionVersionsDeleteAtManagementGroupInput,
    outputSchema: PolicySetDefinitionVersionsDeleteAtManagementGroupOutput,
  }));
// Input Schema
export const PolicySetDefinitionVersionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    policySetDefinitionName: Schema.String.pipe(T.PathParam()),
    policyDefinitionVersion: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/policySetDefinitions/{policySetDefinitionName}/versions/{policyDefinitionVersion}",
    }),
  );
export type PolicySetDefinitionVersionsGetInput =
  typeof PolicySetDefinitionVersionsGetInput.Type;

// Output Schema
export const PolicySetDefinitionVersionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PolicySetDefinitionVersionsGetOutput =
  typeof PolicySetDefinitionVersionsGetOutput.Type;

// The operation
/**
 * This operation retrieves the policy set definition version in the given subscription with the given name and version.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param policySetDefinitionName - The name of the policy set definition.
 * @param policyDefinitionVersion - The policy set definition version.  The format is x.y.z where x is the major version number, y is the minor version number, and z is the patch number
 * @param $expand - Comma-separated list of additional properties to be included in the response. Supported values are 'LatestDefinitionVersion, EffectiveDefinitionVersion'.
 */
export const PolicySetDefinitionVersionsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PolicySetDefinitionVersionsGetInput,
    outputSchema: PolicySetDefinitionVersionsGetOutput,
  }));
// Input Schema
export const PolicySetDefinitionVersionsGetAtManagementGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    managementGroupName: Schema.String.pipe(T.PathParam()),
    policySetDefinitionName: Schema.String.pipe(T.PathParam()),
    policyDefinitionVersion: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Management/managementGroups/{managementGroupName}/providers/Microsoft.Authorization/policySetDefinitions/{policySetDefinitionName}/versions/{policyDefinitionVersion}",
    }),
  );
export type PolicySetDefinitionVersionsGetAtManagementGroupInput =
  typeof PolicySetDefinitionVersionsGetAtManagementGroupInput.Type;

// Output Schema
export const PolicySetDefinitionVersionsGetAtManagementGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PolicySetDefinitionVersionsGetAtManagementGroupOutput =
  typeof PolicySetDefinitionVersionsGetAtManagementGroupOutput.Type;

// The operation
/**
 * This operation retrieves the policy set definition version in the given management group with the given name and version.
 *
 * @param api-version - The API version to use for this operation.
 * @param managementGroupName - The name of the management group. The name is case insensitive.
 * @param policySetDefinitionName - The name of the policy set definition.
 * @param policyDefinitionVersion - The policy set definition version.  The format is x.y.z where x is the major version number, y is the minor version number, and z is the patch number
 * @param $expand - Comma-separated list of additional properties to be included in the response. Supported values are 'LatestDefinitionVersion, EffectiveDefinitionVersion'.
 */
export const PolicySetDefinitionVersionsGetAtManagementGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PolicySetDefinitionVersionsGetAtManagementGroupInput,
    outputSchema: PolicySetDefinitionVersionsGetAtManagementGroupOutput,
  }));
// Input Schema
export const PolicySetDefinitionVersionsGetBuiltInInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    policySetDefinitionName: Schema.String.pipe(T.PathParam()),
    policyDefinitionVersion: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Authorization/policySetDefinitions/{policySetDefinitionName}/versions/{policyDefinitionVersion}",
    }),
  );
export type PolicySetDefinitionVersionsGetBuiltInInput =
  typeof PolicySetDefinitionVersionsGetBuiltInInput.Type;

// Output Schema
export const PolicySetDefinitionVersionsGetBuiltInOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PolicySetDefinitionVersionsGetBuiltInOutput =
  typeof PolicySetDefinitionVersionsGetBuiltInOutput.Type;

// The operation
/**
 * This operation retrieves the built-in policy set definition version with the given name and version.
 *
 * @param api-version - The API version to use for this operation.
 * @param policySetDefinitionName - The name of the policy set definition.
 * @param policyDefinitionVersion - The policy set definition version.  The format is x.y.z where x is the major version number, y is the minor version number, and z is the patch number
 * @param $expand - Comma-separated list of additional properties to be included in the response. Supported values are 'LatestDefinitionVersion, EffectiveDefinitionVersion'.
 */
export const PolicySetDefinitionVersionsGetBuiltIn =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PolicySetDefinitionVersionsGetBuiltInInput,
    outputSchema: PolicySetDefinitionVersionsGetBuiltInOutput,
  }));
// Input Schema
export const PolicySetDefinitionVersionsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    policySetDefinitionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $expand: Schema.optional(Schema.String),
    $top: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/policySetDefinitions/{policySetDefinitionName}/versions",
    }),
  );
export type PolicySetDefinitionVersionsListInput =
  typeof PolicySetDefinitionVersionsListInput.Type;

// Output Schema
export const PolicySetDefinitionVersionsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type PolicySetDefinitionVersionsListOutput =
  typeof PolicySetDefinitionVersionsListOutput.Type;

// The operation
/**
 * This operation retrieves a list of all the policy set definition versions for the given policy set definition.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param policySetDefinitionName - The name of the policy set definition.
 * @param $expand - Comma-separated list of additional properties to be included in the response. Supported values are 'LatestDefinitionVersion, EffectiveDefinitionVersion'.
 * @param $top - Maximum number of records to return. When the $top filter is not provided, it will return 500 records.
 */
export const PolicySetDefinitionVersionsList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PolicySetDefinitionVersionsListInput,
    outputSchema: PolicySetDefinitionVersionsListOutput,
  }));
// Input Schema
export const PolicySetDefinitionVersionsListAllInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/listPolicySetDefinitionVersions",
    }),
  );
export type PolicySetDefinitionVersionsListAllInput =
  typeof PolicySetDefinitionVersionsListAllInput.Type;

// Output Schema
export const PolicySetDefinitionVersionsListAllOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type PolicySetDefinitionVersionsListAllOutput =
  typeof PolicySetDefinitionVersionsListAllOutput.Type;

// The operation
/**
 * Lists all policy set definition versions within a subscription.
 *
 * This operation lists all the policy set definition versions for all policy set definitions within a subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const PolicySetDefinitionVersionsListAll =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PolicySetDefinitionVersionsListAllInput,
    outputSchema: PolicySetDefinitionVersionsListAllOutput,
  }));
// Input Schema
export const PolicySetDefinitionVersionsListAllAtManagementGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    managementGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.Management/managementGroups/{managementGroupName}/providers/Microsoft.Authorization/listPolicySetDefinitionVersions",
    }),
  );
export type PolicySetDefinitionVersionsListAllAtManagementGroupInput =
  typeof PolicySetDefinitionVersionsListAllAtManagementGroupInput.Type;

// Output Schema
export const PolicySetDefinitionVersionsListAllAtManagementGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type PolicySetDefinitionVersionsListAllAtManagementGroupOutput =
  typeof PolicySetDefinitionVersionsListAllAtManagementGroupOutput.Type;

// The operation
/**
 * Lists all policy set definition versions at management group scope.
 *
 * This operation lists all the policy set definition versions for all policy set definitions at the management group scope.
 *
 * @param managementGroupName - The name of the management group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const PolicySetDefinitionVersionsListAllAtManagementGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PolicySetDefinitionVersionsListAllAtManagementGroupInput,
    outputSchema: PolicySetDefinitionVersionsListAllAtManagementGroupOutput,
  }));
// Input Schema
export const PolicySetDefinitionVersionsListAllBuiltinsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.Authorization/listPolicySetDefinitionVersions",
    }),
  );
export type PolicySetDefinitionVersionsListAllBuiltinsInput =
  typeof PolicySetDefinitionVersionsListAllBuiltinsInput.Type;

// Output Schema
export const PolicySetDefinitionVersionsListAllBuiltinsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type PolicySetDefinitionVersionsListAllBuiltinsOutput =
  typeof PolicySetDefinitionVersionsListAllBuiltinsOutput.Type;

// The operation
/**
 * Lists all built-in policy set definition versions.
 *
 * This operation lists all the built-in policy set definition versions for all built-in policy set definitions.
 *
 * @param api-version - The API version to use for this operation.
 */
export const PolicySetDefinitionVersionsListAllBuiltins =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PolicySetDefinitionVersionsListAllBuiltinsInput,
    outputSchema: PolicySetDefinitionVersionsListAllBuiltinsOutput,
  }));
// Input Schema
export const PolicySetDefinitionVersionsListBuiltInInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    policySetDefinitionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $expand: Schema.optional(Schema.String),
    $top: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Authorization/policySetDefinitions/{policySetDefinitionName}/versions",
    }),
  );
export type PolicySetDefinitionVersionsListBuiltInInput =
  typeof PolicySetDefinitionVersionsListBuiltInInput.Type;

// Output Schema
export const PolicySetDefinitionVersionsListBuiltInOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type PolicySetDefinitionVersionsListBuiltInOutput =
  typeof PolicySetDefinitionVersionsListBuiltInOutput.Type;

// The operation
/**
 * This operation retrieves a list of all the built-in policy set definition versions for the given built-in policy set definition.
 *
 * @param api-version - The API version to use for this operation.
 * @param policySetDefinitionName - The name of the policy set definition.
 * @param $expand - Comma-separated list of additional properties to be included in the response. Supported values are 'LatestDefinitionVersion, EffectiveDefinitionVersion'.
 * @param $top - Maximum number of records to return. When the $top filter is not provided, it will return 500 records.
 */
export const PolicySetDefinitionVersionsListBuiltIn =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PolicySetDefinitionVersionsListBuiltInInput,
    outputSchema: PolicySetDefinitionVersionsListBuiltInOutput,
  }));
// Input Schema
export const PolicySetDefinitionVersionsListByManagementGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    managementGroupName: Schema.String.pipe(T.PathParam()),
    policySetDefinitionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $expand: Schema.optional(Schema.String),
    $top: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Management/managementGroups/{managementGroupName}/providers/Microsoft.Authorization/policySetDefinitions/{policySetDefinitionName}/versions",
    }),
  );
export type PolicySetDefinitionVersionsListByManagementGroupInput =
  typeof PolicySetDefinitionVersionsListByManagementGroupInput.Type;

// Output Schema
export const PolicySetDefinitionVersionsListByManagementGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type PolicySetDefinitionVersionsListByManagementGroupOutput =
  typeof PolicySetDefinitionVersionsListByManagementGroupOutput.Type;

// The operation
/**
 * This operation retrieves a list of all the policy set definition versions for the given policy set definition in a given management group.
 *
 * @param api-version - The API version to use for this operation.
 * @param managementGroupName - The name of the management group. The name is case insensitive.
 * @param policySetDefinitionName - The name of the policy set definition.
 * @param $expand - Comma-separated list of additional properties to be included in the response. Supported values are 'LatestDefinitionVersion, EffectiveDefinitionVersion'.
 * @param $top - Maximum number of records to return. When the $top filter is not provided, it will return 500 records.
 */
export const PolicySetDefinitionVersionsListByManagementGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PolicySetDefinitionVersionsListByManagementGroupInput,
    outputSchema: PolicySetDefinitionVersionsListByManagementGroupOutput,
  }));
// Input Schema
export const PolicyTokensAcquireInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/acquirePolicyToken",
    }),
  );
export type PolicyTokensAcquireInput = typeof PolicyTokensAcquireInput.Type;

// Output Schema
export const PolicyTokensAcquireOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    result: Schema.optional(Schema.Literals(["Succeeded", "Failed"])),
    requestDetails: Schema.optional(
      Schema.Struct({
        uri: Schema.String,
        resourceId: Schema.String,
        apiVersion: Schema.String,
        authorizationAction: Schema.String,
        httpMethod: Schema.String,
        contentHash: Schema.String,
      }),
    ),
    message: Schema.optional(Schema.String),
    retryAfter: Schema.optional(Schema.String),
    results: Schema.optional(
      Schema.Array(
        Schema.Struct({
          policyInfo: Schema.optional(
            Schema.Struct({
              policyDefinitionId: Schema.optional(Schema.String),
              policySetDefinitionId: Schema.optional(Schema.String),
              policyDefinitionReferenceId: Schema.optional(Schema.String),
              policySetDefinitionName: Schema.optional(Schema.String),
              policySetDefinitionDisplayName: Schema.optional(Schema.String),
              policySetDefinitionVersion: Schema.optional(Schema.String),
              policySetDefinitionCategory: Schema.optional(Schema.String),
              policyDefinitionName: Schema.optional(Schema.String),
              policyDefinitionDisplayName: Schema.optional(Schema.String),
              policyDefinitionVersion: Schema.optional(Schema.String),
              policyDefinitionEffect: Schema.optional(Schema.String),
              policyDefinitionGroupNames: Schema.optional(
                Schema.Array(Schema.String),
              ),
              policyAssignmentId: Schema.optional(Schema.String),
              policyAssignmentName: Schema.optional(Schema.String),
              policyAssignmentDisplayName: Schema.optional(Schema.String),
              policyAssignmentVersion: Schema.optional(Schema.String),
              policyAssignmentScope: Schema.optional(Schema.String),
              resourceLocation: Schema.optional(Schema.String),
              ancestors: Schema.optional(Schema.String),
              complianceReasonCode: Schema.optional(Schema.String),
              policyExemptionIds: Schema.optional(Schema.Array(Schema.String)),
            }),
          ),
          result: Schema.optional(Schema.Literals(["Succeeded", "Failed"])),
          endpointKind: Schema.optional(Schema.String),
          message: Schema.optional(Schema.String),
          retryAfter: Schema.optional(Schema.String),
          claims: Schema.optional(Schema.Unknown),
          policyAction: Schema.optional(
            Schema.Literals(["Unknown", "Allow", "Audit", "Deny", "Error"]),
          ),
          policyEvaluationDetails: Schema.optional(Schema.Unknown),
          additionalInfo: Schema.optional(Schema.Unknown),
          expiration: Schema.optional(Schema.String),
        }),
      ),
    ),
    changeReference: Schema.optional(Schema.String),
    token: Schema.optional(Schema.String),
    tokenId: Schema.optional(Schema.String),
    expiration: Schema.optional(Schema.String),
  });
export type PolicyTokensAcquireOutput = typeof PolicyTokensAcquireOutput.Type;

// The operation
/**
 * Acquires a policy token.
 *
 * This operation acquires a policy token in the given subscription for the given request body.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const PolicyTokensAcquire = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PolicyTokensAcquireInput,
  outputSchema: PolicyTokensAcquireOutput,
}));
// Input Schema
export const PolicyTokensAcquireAtManagementGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    managementGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.Management/managementGroups/{managementGroupName}/providers/Microsoft.Authorization/acquirePolicyToken",
    }),
  );
export type PolicyTokensAcquireAtManagementGroupInput =
  typeof PolicyTokensAcquireAtManagementGroupInput.Type;

// Output Schema
export const PolicyTokensAcquireAtManagementGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    result: Schema.optional(Schema.Literals(["Succeeded", "Failed"])),
    requestDetails: Schema.optional(
      Schema.Struct({
        uri: Schema.String,
        resourceId: Schema.String,
        apiVersion: Schema.String,
        authorizationAction: Schema.String,
        httpMethod: Schema.String,
        contentHash: Schema.String,
      }),
    ),
    message: Schema.optional(Schema.String),
    retryAfter: Schema.optional(Schema.String),
    results: Schema.optional(
      Schema.Array(
        Schema.Struct({
          policyInfo: Schema.optional(
            Schema.Struct({
              policyDefinitionId: Schema.optional(Schema.String),
              policySetDefinitionId: Schema.optional(Schema.String),
              policyDefinitionReferenceId: Schema.optional(Schema.String),
              policySetDefinitionName: Schema.optional(Schema.String),
              policySetDefinitionDisplayName: Schema.optional(Schema.String),
              policySetDefinitionVersion: Schema.optional(Schema.String),
              policySetDefinitionCategory: Schema.optional(Schema.String),
              policyDefinitionName: Schema.optional(Schema.String),
              policyDefinitionDisplayName: Schema.optional(Schema.String),
              policyDefinitionVersion: Schema.optional(Schema.String),
              policyDefinitionEffect: Schema.optional(Schema.String),
              policyDefinitionGroupNames: Schema.optional(
                Schema.Array(Schema.String),
              ),
              policyAssignmentId: Schema.optional(Schema.String),
              policyAssignmentName: Schema.optional(Schema.String),
              policyAssignmentDisplayName: Schema.optional(Schema.String),
              policyAssignmentVersion: Schema.optional(Schema.String),
              policyAssignmentScope: Schema.optional(Schema.String),
              resourceLocation: Schema.optional(Schema.String),
              ancestors: Schema.optional(Schema.String),
              complianceReasonCode: Schema.optional(Schema.String),
              policyExemptionIds: Schema.optional(Schema.Array(Schema.String)),
            }),
          ),
          result: Schema.optional(Schema.Literals(["Succeeded", "Failed"])),
          endpointKind: Schema.optional(Schema.String),
          message: Schema.optional(Schema.String),
          retryAfter: Schema.optional(Schema.String),
          claims: Schema.optional(Schema.Unknown),
          policyAction: Schema.optional(
            Schema.Literals(["Unknown", "Allow", "Audit", "Deny", "Error"]),
          ),
          policyEvaluationDetails: Schema.optional(Schema.Unknown),
          additionalInfo: Schema.optional(Schema.Unknown),
          expiration: Schema.optional(Schema.String),
        }),
      ),
    ),
    changeReference: Schema.optional(Schema.String),
    token: Schema.optional(Schema.String),
    tokenId: Schema.optional(Schema.String),
    expiration: Schema.optional(Schema.String),
  });
export type PolicyTokensAcquireAtManagementGroupOutput =
  typeof PolicyTokensAcquireAtManagementGroupOutput.Type;

// The operation
/**
 * Acquires a policy token at management group level.
 *
 * This operation acquires a policy token in the given management group for the given request body.
 *
 * @param managementGroupName - The name of the management group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const PolicyTokensAcquireAtManagementGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PolicyTokensAcquireAtManagementGroupInput,
    outputSchema: PolicyTokensAcquireAtManagementGroupOutput,
  }));
// Input Schema
export const PrivateLinkAssociationDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "DELETE",
      path: "/providers/Microsoft.Management/managementGroups/{groupId}/providers/Microsoft.Authorization/privateLinkAssociations/{plaId}",
    }),
  );
export type PrivateLinkAssociationDeleteInput =
  typeof PrivateLinkAssociationDeleteInput.Type;

// Output Schema
export const PrivateLinkAssociationDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PrivateLinkAssociationDeleteOutput =
  typeof PrivateLinkAssociationDeleteOutput.Type;

// The operation
/**
 * Delete a PrivateLinkAssociation
 */
export const PrivateLinkAssociationDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinkAssociationDeleteInput,
    outputSchema: PrivateLinkAssociationDeleteOutput,
  }));
// Input Schema
export const PrivateLinkAssociationGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Management/managementGroups/{groupId}/providers/Microsoft.Authorization/privateLinkAssociations/{plaId}",
    }),
  );
export type PrivateLinkAssociationGetInput =
  typeof PrivateLinkAssociationGetInput.Type;

// Output Schema
export const PrivateLinkAssociationGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    properties: Schema.optional(
      Schema.Struct({
        privateLink: Schema.optional(Schema.String),
        publicNetworkAccess: Schema.optional(
          Schema.Literals(["Enabled", "Disabled"]),
        ),
        tenantID: Schema.optional(Schema.String),
        scope: Schema.optional(Schema.String),
      }),
    ),
    id: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
  });
export type PrivateLinkAssociationGetOutput =
  typeof PrivateLinkAssociationGetOutput.Type;

// The operation
/**
 * Get a single private link association
 */
export const PrivateLinkAssociationGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PrivateLinkAssociationGetInput,
    outputSchema: PrivateLinkAssociationGetOutput,
  }),
);
// Input Schema
export const PrivateLinkAssociationListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Management/managementGroups/{groupId}/providers/Microsoft.Authorization/privateLinkAssociations",
    }),
  );
export type PrivateLinkAssociationListInput =
  typeof PrivateLinkAssociationListInput.Type;

// Output Schema
export const PrivateLinkAssociationListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          properties: Schema.optional(
            Schema.Struct({
              privateLink: Schema.optional(Schema.String),
              publicNetworkAccess: Schema.optional(
                Schema.Literals(["Enabled", "Disabled"]),
              ),
              tenantID: Schema.optional(Schema.String),
              scope: Schema.optional(Schema.String),
            }),
          ),
          id: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type PrivateLinkAssociationListOutput =
  typeof PrivateLinkAssociationListOutput.Type;

// The operation
/**
 * Get a private link association for a management group scope
 */
export const PrivateLinkAssociationList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PrivateLinkAssociationListInput,
    outputSchema: PrivateLinkAssociationListOutput,
  }),
);
// Input Schema
export const PrivateLinkAssociationPutInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PUT",
      path: "/providers/Microsoft.Management/managementGroups/{groupId}/providers/Microsoft.Authorization/privateLinkAssociations/{plaId}",
    }),
  );
export type PrivateLinkAssociationPutInput =
  typeof PrivateLinkAssociationPutInput.Type;

// Output Schema
export const PrivateLinkAssociationPutOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    properties: Schema.optional(
      Schema.Struct({
        privateLink: Schema.optional(Schema.String),
        publicNetworkAccess: Schema.optional(
          Schema.Literals(["Enabled", "Disabled"]),
        ),
        tenantID: Schema.optional(Schema.String),
        scope: Schema.optional(Schema.String),
      }),
    ),
    id: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
  });
export type PrivateLinkAssociationPutOutput =
  typeof PrivateLinkAssociationPutOutput.Type;

// The operation
/**
 * Create a PrivateLinkAssociation
 */
export const PrivateLinkAssociationPut = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PrivateLinkAssociationPutInput,
    outputSchema: PrivateLinkAssociationPutOutput,
  }),
);
// Input Schema
export const ProviderResourceTypesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceProviderNamespace: Schema.String.pipe(T.PathParam()),
    $expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/{resourceProviderNamespace}/resourceTypes",
    }),
  );
export type ProviderResourceTypesListInput =
  typeof ProviderResourceTypesListInput.Type;

// Output Schema
export const ProviderResourceTypesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          resourceType: Schema.optional(Schema.String),
          locations: Schema.optional(Schema.Array(Schema.String)),
          locationMappings: Schema.optional(
            Schema.Array(
              Schema.Struct({
                location: Schema.optional(Schema.String),
                type: Schema.optional(Schema.String),
                extendedLocations: Schema.optional(Schema.Array(Schema.String)),
              }),
            ),
          ),
          aliases: Schema.optional(
            Schema.Array(
              Schema.Struct({
                name: Schema.optional(Schema.String),
                paths: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      path: Schema.optional(Schema.String),
                      apiVersions: Schema.optional(Schema.Array(Schema.String)),
                      pattern: Schema.optional(
                        Schema.Struct({
                          phrase: Schema.optional(Schema.String),
                          variable: Schema.optional(Schema.String),
                          type: Schema.optional(
                            Schema.Literals(["NotSpecified", "Extract"]),
                          ),
                        }),
                      ),
                      metadata: Schema.optional(
                        Schema.Struct({
                          type: Schema.optional(
                            Schema.Literals([
                              "NotSpecified",
                              "Any",
                              "String",
                              "Object",
                              "Array",
                              "Integer",
                              "Number",
                              "Boolean",
                            ]),
                          ),
                          attributes: Schema.optional(
                            Schema.Literals(["None", "Modifiable"]),
                          ),
                        }),
                      ),
                    }),
                  ),
                ),
                type: Schema.optional(
                  Schema.Literals(["NotSpecified", "PlainText", "Mask"]),
                ),
                defaultPath: Schema.optional(Schema.String),
                defaultPattern: Schema.optional(
                  Schema.Struct({
                    phrase: Schema.optional(Schema.String),
                    variable: Schema.optional(Schema.String),
                    type: Schema.optional(
                      Schema.Literals(["NotSpecified", "Extract"]),
                    ),
                  }),
                ),
                defaultMetadata: Schema.optional(
                  Schema.Struct({
                    type: Schema.optional(
                      Schema.Literals([
                        "NotSpecified",
                        "Any",
                        "String",
                        "Object",
                        "Array",
                        "Integer",
                        "Number",
                        "Boolean",
                      ]),
                    ),
                    attributes: Schema.optional(
                      Schema.Literals(["None", "Modifiable"]),
                    ),
                  }),
                ),
              }),
            ),
          ),
          apiVersions: Schema.optional(Schema.Array(Schema.String)),
          defaultApiVersion: Schema.optional(Schema.String),
          zoneMappings: Schema.optional(
            Schema.Array(
              Schema.Struct({
                location: Schema.optional(Schema.String),
                zones: Schema.optional(Schema.Array(Schema.String)),
              }),
            ),
          ),
          apiProfiles: Schema.optional(
            Schema.Array(
              Schema.Struct({
                profileVersion: Schema.optional(Schema.String),
                apiVersion: Schema.optional(Schema.String),
              }),
            ),
          ),
          capabilities: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Record(Schema.String, Schema.String),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ProviderResourceTypesListOutput =
  typeof ProviderResourceTypesListOutput.Type;

// The operation
/**
 * List the resource types for a specified resource provider.
 *
 * @param $expand - The $expand query parameter. For example, to include property aliases in response, use $expand=resourceTypes/aliases.
 * @param resourceProviderNamespace - The namespace of the resource provider.
 */
export const ProviderResourceTypesList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ProviderResourceTypesListInput,
    outputSchema: ProviderResourceTypesListOutput,
  }),
);
// Input Schema
export const ProvidersGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceProviderNamespace: Schema.String.pipe(T.PathParam()),
  $expand: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/{resourceProviderNamespace}",
  }),
);
export type ProvidersGetInput = typeof ProvidersGetInput.Type;

// Output Schema
export const ProvidersGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  namespace: Schema.optional(Schema.String),
  registrationState: Schema.optional(Schema.String),
  registrationPolicy: Schema.optional(Schema.String),
  resourceTypes: Schema.optional(
    Schema.Array(
      Schema.Struct({
        resourceType: Schema.optional(Schema.String),
        locations: Schema.optional(Schema.Array(Schema.String)),
        locationMappings: Schema.optional(
          Schema.Array(
            Schema.Struct({
              location: Schema.optional(Schema.String),
              type: Schema.optional(Schema.String),
              extendedLocations: Schema.optional(Schema.Array(Schema.String)),
            }),
          ),
        ),
        aliases: Schema.optional(
          Schema.Array(
            Schema.Struct({
              name: Schema.optional(Schema.String),
              paths: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    path: Schema.optional(Schema.String),
                    apiVersions: Schema.optional(Schema.Array(Schema.String)),
                    pattern: Schema.optional(
                      Schema.Struct({
                        phrase: Schema.optional(Schema.String),
                        variable: Schema.optional(Schema.String),
                        type: Schema.optional(
                          Schema.Literals(["NotSpecified", "Extract"]),
                        ),
                      }),
                    ),
                    metadata: Schema.optional(
                      Schema.Struct({
                        type: Schema.optional(
                          Schema.Literals([
                            "NotSpecified",
                            "Any",
                            "String",
                            "Object",
                            "Array",
                            "Integer",
                            "Number",
                            "Boolean",
                          ]),
                        ),
                        attributes: Schema.optional(
                          Schema.Literals(["None", "Modifiable"]),
                        ),
                      }),
                    ),
                  }),
                ),
              ),
              type: Schema.optional(
                Schema.Literals(["NotSpecified", "PlainText", "Mask"]),
              ),
              defaultPath: Schema.optional(Schema.String),
              defaultPattern: Schema.optional(
                Schema.Struct({
                  phrase: Schema.optional(Schema.String),
                  variable: Schema.optional(Schema.String),
                  type: Schema.optional(
                    Schema.Literals(["NotSpecified", "Extract"]),
                  ),
                }),
              ),
              defaultMetadata: Schema.optional(
                Schema.Struct({
                  type: Schema.optional(
                    Schema.Literals([
                      "NotSpecified",
                      "Any",
                      "String",
                      "Object",
                      "Array",
                      "Integer",
                      "Number",
                      "Boolean",
                    ]),
                  ),
                  attributes: Schema.optional(
                    Schema.Literals(["None", "Modifiable"]),
                  ),
                }),
              ),
            }),
          ),
        ),
        apiVersions: Schema.optional(Schema.Array(Schema.String)),
        defaultApiVersion: Schema.optional(Schema.String),
        zoneMappings: Schema.optional(
          Schema.Array(
            Schema.Struct({
              location: Schema.optional(Schema.String),
              zones: Schema.optional(Schema.Array(Schema.String)),
            }),
          ),
        ),
        apiProfiles: Schema.optional(
          Schema.Array(
            Schema.Struct({
              profileVersion: Schema.optional(Schema.String),
              apiVersion: Schema.optional(Schema.String),
            }),
          ),
        ),
        capabilities: Schema.optional(Schema.String),
        properties: Schema.optional(
          Schema.Record(Schema.String, Schema.String),
        ),
      }),
    ),
  ),
  providerAuthorizationConsentState: Schema.optional(
    Schema.Literals(["NotSpecified", "Required", "NotRequired", "Consented"]),
  ),
});
export type ProvidersGetOutput = typeof ProvidersGetOutput.Type;

// The operation
/**
 * Gets the specified resource provider.
 *
 * @param $expand - The $expand query parameter. For example, to include property aliases in response, use $expand=resourceTypes/aliases.
 * @param resourceProviderNamespace - The namespace of the resource provider.
 */
export const ProvidersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ProvidersGetInput,
  outputSchema: ProvidersGetOutput,
}));
// Input Schema
export const ProvidersGetAtTenantScopeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceProviderNamespace: Schema.String.pipe(T.PathParam()),
    $expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({ method: "GET", path: "/providers/{resourceProviderNamespace}" }),
  );
export type ProvidersGetAtTenantScopeInput =
  typeof ProvidersGetAtTenantScopeInput.Type;

// Output Schema
export const ProvidersGetAtTenantScopeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    namespace: Schema.optional(Schema.String),
    registrationState: Schema.optional(Schema.String),
    registrationPolicy: Schema.optional(Schema.String),
    resourceTypes: Schema.optional(
      Schema.Array(
        Schema.Struct({
          resourceType: Schema.optional(Schema.String),
          locations: Schema.optional(Schema.Array(Schema.String)),
          locationMappings: Schema.optional(
            Schema.Array(
              Schema.Struct({
                location: Schema.optional(Schema.String),
                type: Schema.optional(Schema.String),
                extendedLocations: Schema.optional(Schema.Array(Schema.String)),
              }),
            ),
          ),
          aliases: Schema.optional(
            Schema.Array(
              Schema.Struct({
                name: Schema.optional(Schema.String),
                paths: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      path: Schema.optional(Schema.String),
                      apiVersions: Schema.optional(Schema.Array(Schema.String)),
                      pattern: Schema.optional(
                        Schema.Struct({
                          phrase: Schema.optional(Schema.String),
                          variable: Schema.optional(Schema.String),
                          type: Schema.optional(
                            Schema.Literals(["NotSpecified", "Extract"]),
                          ),
                        }),
                      ),
                      metadata: Schema.optional(
                        Schema.Struct({
                          type: Schema.optional(
                            Schema.Literals([
                              "NotSpecified",
                              "Any",
                              "String",
                              "Object",
                              "Array",
                              "Integer",
                              "Number",
                              "Boolean",
                            ]),
                          ),
                          attributes: Schema.optional(
                            Schema.Literals(["None", "Modifiable"]),
                          ),
                        }),
                      ),
                    }),
                  ),
                ),
                type: Schema.optional(
                  Schema.Literals(["NotSpecified", "PlainText", "Mask"]),
                ),
                defaultPath: Schema.optional(Schema.String),
                defaultPattern: Schema.optional(
                  Schema.Struct({
                    phrase: Schema.optional(Schema.String),
                    variable: Schema.optional(Schema.String),
                    type: Schema.optional(
                      Schema.Literals(["NotSpecified", "Extract"]),
                    ),
                  }),
                ),
                defaultMetadata: Schema.optional(
                  Schema.Struct({
                    type: Schema.optional(
                      Schema.Literals([
                        "NotSpecified",
                        "Any",
                        "String",
                        "Object",
                        "Array",
                        "Integer",
                        "Number",
                        "Boolean",
                      ]),
                    ),
                    attributes: Schema.optional(
                      Schema.Literals(["None", "Modifiable"]),
                    ),
                  }),
                ),
              }),
            ),
          ),
          apiVersions: Schema.optional(Schema.Array(Schema.String)),
          defaultApiVersion: Schema.optional(Schema.String),
          zoneMappings: Schema.optional(
            Schema.Array(
              Schema.Struct({
                location: Schema.optional(Schema.String),
                zones: Schema.optional(Schema.Array(Schema.String)),
              }),
            ),
          ),
          apiProfiles: Schema.optional(
            Schema.Array(
              Schema.Struct({
                profileVersion: Schema.optional(Schema.String),
                apiVersion: Schema.optional(Schema.String),
              }),
            ),
          ),
          capabilities: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Record(Schema.String, Schema.String),
          ),
        }),
      ),
    ),
    providerAuthorizationConsentState: Schema.optional(
      Schema.Literals(["NotSpecified", "Required", "NotRequired", "Consented"]),
    ),
  });
export type ProvidersGetAtTenantScopeOutput =
  typeof ProvidersGetAtTenantScopeOutput.Type;

// The operation
/**
 * Gets the specified resource provider at the tenant level.
 *
 * @param $expand - The $expand query parameter. For example, to include property aliases in response, use $expand=resourceTypes/aliases.
 * @param resourceProviderNamespace - The namespace of the resource provider.
 */
export const ProvidersGetAtTenantScope = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ProvidersGetAtTenantScopeInput,
    outputSchema: ProvidersGetAtTenantScopeOutput,
  }),
);
// Input Schema
export const ProvidersListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  $expand: Schema.optional(Schema.String),
}).pipe(
  T.Http({ method: "GET", path: "/subscriptions/{subscriptionId}/providers" }),
);
export type ProvidersListInput = typeof ProvidersListInput.Type;

// Output Schema
export const ProvidersListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        namespace: Schema.optional(Schema.String),
        registrationState: Schema.optional(Schema.String),
        registrationPolicy: Schema.optional(Schema.String),
        resourceTypes: Schema.optional(
          Schema.Array(
            Schema.Struct({
              resourceType: Schema.optional(Schema.String),
              locations: Schema.optional(Schema.Array(Schema.String)),
              locationMappings: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    location: Schema.optional(Schema.String),
                    type: Schema.optional(Schema.String),
                    extendedLocations: Schema.optional(
                      Schema.Array(Schema.String),
                    ),
                  }),
                ),
              ),
              aliases: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    paths: Schema.optional(
                      Schema.Array(
                        Schema.Struct({
                          path: Schema.optional(Schema.String),
                          apiVersions: Schema.optional(
                            Schema.Array(Schema.String),
                          ),
                          pattern: Schema.optional(
                            Schema.Struct({
                              phrase: Schema.optional(Schema.String),
                              variable: Schema.optional(Schema.String),
                              type: Schema.optional(
                                Schema.Literals(["NotSpecified", "Extract"]),
                              ),
                            }),
                          ),
                          metadata: Schema.optional(
                            Schema.Struct({
                              type: Schema.optional(
                                Schema.Literals([
                                  "NotSpecified",
                                  "Any",
                                  "String",
                                  "Object",
                                  "Array",
                                  "Integer",
                                  "Number",
                                  "Boolean",
                                ]),
                              ),
                              attributes: Schema.optional(
                                Schema.Literals(["None", "Modifiable"]),
                              ),
                            }),
                          ),
                        }),
                      ),
                    ),
                    type: Schema.optional(
                      Schema.Literals(["NotSpecified", "PlainText", "Mask"]),
                    ),
                    defaultPath: Schema.optional(Schema.String),
                    defaultPattern: Schema.optional(
                      Schema.Struct({
                        phrase: Schema.optional(Schema.String),
                        variable: Schema.optional(Schema.String),
                        type: Schema.optional(
                          Schema.Literals(["NotSpecified", "Extract"]),
                        ),
                      }),
                    ),
                    defaultMetadata: Schema.optional(
                      Schema.Struct({
                        type: Schema.optional(
                          Schema.Literals([
                            "NotSpecified",
                            "Any",
                            "String",
                            "Object",
                            "Array",
                            "Integer",
                            "Number",
                            "Boolean",
                          ]),
                        ),
                        attributes: Schema.optional(
                          Schema.Literals(["None", "Modifiable"]),
                        ),
                      }),
                    ),
                  }),
                ),
              ),
              apiVersions: Schema.optional(Schema.Array(Schema.String)),
              defaultApiVersion: Schema.optional(Schema.String),
              zoneMappings: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    location: Schema.optional(Schema.String),
                    zones: Schema.optional(Schema.Array(Schema.String)),
                  }),
                ),
              ),
              apiProfiles: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    profileVersion: Schema.optional(Schema.String),
                    apiVersion: Schema.optional(Schema.String),
                  }),
                ),
              ),
              capabilities: Schema.optional(Schema.String),
              properties: Schema.optional(
                Schema.Record(Schema.String, Schema.String),
              ),
            }),
          ),
        ),
        providerAuthorizationConsentState: Schema.optional(
          Schema.Literals([
            "NotSpecified",
            "Required",
            "NotRequired",
            "Consented",
          ]),
        ),
      }),
    ),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type ProvidersListOutput = typeof ProvidersListOutput.Type;

// The operation
/**
 * Gets all resource providers for a subscription.
 *
 * @param $expand - The properties to include in the results. For example, use &$expand=metadata in the query string to retrieve resource provider metadata. To include property aliases in response, use $expand=resourceTypes/aliases.
 */
export const ProvidersList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ProvidersListInput,
  outputSchema: ProvidersListOutput,
}));
// Input Schema
export const ProvidersListAtTenantScopeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    $expand: Schema.optional(Schema.String),
  }).pipe(T.Http({ method: "GET", path: "/providers" }));
export type ProvidersListAtTenantScopeInput =
  typeof ProvidersListAtTenantScopeInput.Type;

// Output Schema
export const ProvidersListAtTenantScopeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          namespace: Schema.optional(Schema.String),
          registrationState: Schema.optional(Schema.String),
          registrationPolicy: Schema.optional(Schema.String),
          resourceTypes: Schema.optional(
            Schema.Array(
              Schema.Struct({
                resourceType: Schema.optional(Schema.String),
                locations: Schema.optional(Schema.Array(Schema.String)),
                locationMappings: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      location: Schema.optional(Schema.String),
                      type: Schema.optional(Schema.String),
                      extendedLocations: Schema.optional(
                        Schema.Array(Schema.String),
                      ),
                    }),
                  ),
                ),
                aliases: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      name: Schema.optional(Schema.String),
                      paths: Schema.optional(
                        Schema.Array(
                          Schema.Struct({
                            path: Schema.optional(Schema.String),
                            apiVersions: Schema.optional(
                              Schema.Array(Schema.String),
                            ),
                            pattern: Schema.optional(
                              Schema.Struct({
                                phrase: Schema.optional(Schema.String),
                                variable: Schema.optional(Schema.String),
                                type: Schema.optional(
                                  Schema.Literals(["NotSpecified", "Extract"]),
                                ),
                              }),
                            ),
                            metadata: Schema.optional(
                              Schema.Struct({
                                type: Schema.optional(
                                  Schema.Literals([
                                    "NotSpecified",
                                    "Any",
                                    "String",
                                    "Object",
                                    "Array",
                                    "Integer",
                                    "Number",
                                    "Boolean",
                                  ]),
                                ),
                                attributes: Schema.optional(
                                  Schema.Literals(["None", "Modifiable"]),
                                ),
                              }),
                            ),
                          }),
                        ),
                      ),
                      type: Schema.optional(
                        Schema.Literals(["NotSpecified", "PlainText", "Mask"]),
                      ),
                      defaultPath: Schema.optional(Schema.String),
                      defaultPattern: Schema.optional(
                        Schema.Struct({
                          phrase: Schema.optional(Schema.String),
                          variable: Schema.optional(Schema.String),
                          type: Schema.optional(
                            Schema.Literals(["NotSpecified", "Extract"]),
                          ),
                        }),
                      ),
                      defaultMetadata: Schema.optional(
                        Schema.Struct({
                          type: Schema.optional(
                            Schema.Literals([
                              "NotSpecified",
                              "Any",
                              "String",
                              "Object",
                              "Array",
                              "Integer",
                              "Number",
                              "Boolean",
                            ]),
                          ),
                          attributes: Schema.optional(
                            Schema.Literals(["None", "Modifiable"]),
                          ),
                        }),
                      ),
                    }),
                  ),
                ),
                apiVersions: Schema.optional(Schema.Array(Schema.String)),
                defaultApiVersion: Schema.optional(Schema.String),
                zoneMappings: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      location: Schema.optional(Schema.String),
                      zones: Schema.optional(Schema.Array(Schema.String)),
                    }),
                  ),
                ),
                apiProfiles: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      profileVersion: Schema.optional(Schema.String),
                      apiVersion: Schema.optional(Schema.String),
                    }),
                  ),
                ),
                capabilities: Schema.optional(Schema.String),
                properties: Schema.optional(
                  Schema.Record(Schema.String, Schema.String),
                ),
              }),
            ),
          ),
          providerAuthorizationConsentState: Schema.optional(
            Schema.Literals([
              "NotSpecified",
              "Required",
              "NotRequired",
              "Consented",
            ]),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ProvidersListAtTenantScopeOutput =
  typeof ProvidersListAtTenantScopeOutput.Type;

// The operation
/**
 * Gets all resource providers for the tenant.
 *
 * @param $expand - The properties to include in the results. For example, use &$expand=metadata in the query string to retrieve resource provider metadata. To include property aliases in response, use $expand=resourceTypes/aliases.
 */
export const ProvidersListAtTenantScope = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ProvidersListAtTenantScopeInput,
    outputSchema: ProvidersListAtTenantScopeOutput,
  }),
);
// Input Schema
export const ProvidersProviderPermissionsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceProviderNamespace: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/{resourceProviderNamespace}/providerPermissions",
    }),
  );
export type ProvidersProviderPermissionsInput =
  typeof ProvidersProviderPermissionsInput.Type;

// Output Schema
export const ProvidersProviderPermissionsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          applicationId: Schema.optional(Schema.String),
          roleDefinition: Schema.optional(
            Schema.Struct({
              id: Schema.optional(Schema.String),
              name: Schema.optional(Schema.String),
              isServiceRole: Schema.optional(Schema.Boolean),
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
              scopes: Schema.optional(Schema.Array(Schema.String)),
            }),
          ),
          managedByRoleDefinition: Schema.optional(
            Schema.Struct({
              id: Schema.optional(Schema.String),
              name: Schema.optional(Schema.String),
              isServiceRole: Schema.optional(Schema.Boolean),
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
              scopes: Schema.optional(Schema.Array(Schema.String)),
            }),
          ),
          providerAuthorizationConsentState: Schema.optional(
            Schema.Literals([
              "NotSpecified",
              "Required",
              "NotRequired",
              "Consented",
            ]),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ProvidersProviderPermissionsOutput =
  typeof ProvidersProviderPermissionsOutput.Type;

// The operation
/**
 * Get the provider permissions.
 *
 * @param resourceProviderNamespace - The namespace of the resource provider.
 */
export const ProvidersProviderPermissions =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ProvidersProviderPermissionsInput,
    outputSchema: ProvidersProviderPermissionsOutput,
  }));
// Input Schema
export const ProvidersRegisterInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    resourceProviderNamespace: Schema.String.pipe(T.PathParam()),
  },
).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/providers/{resourceProviderNamespace}/register",
  }),
);
export type ProvidersRegisterInput = typeof ProvidersRegisterInput.Type;

// Output Schema
export const ProvidersRegisterOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    namespace: Schema.optional(Schema.String),
    registrationState: Schema.optional(Schema.String),
    registrationPolicy: Schema.optional(Schema.String),
    resourceTypes: Schema.optional(
      Schema.Array(
        Schema.Struct({
          resourceType: Schema.optional(Schema.String),
          locations: Schema.optional(Schema.Array(Schema.String)),
          locationMappings: Schema.optional(
            Schema.Array(
              Schema.Struct({
                location: Schema.optional(Schema.String),
                type: Schema.optional(Schema.String),
                extendedLocations: Schema.optional(Schema.Array(Schema.String)),
              }),
            ),
          ),
          aliases: Schema.optional(
            Schema.Array(
              Schema.Struct({
                name: Schema.optional(Schema.String),
                paths: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      path: Schema.optional(Schema.String),
                      apiVersions: Schema.optional(Schema.Array(Schema.String)),
                      pattern: Schema.optional(
                        Schema.Struct({
                          phrase: Schema.optional(Schema.String),
                          variable: Schema.optional(Schema.String),
                          type: Schema.optional(
                            Schema.Literals(["NotSpecified", "Extract"]),
                          ),
                        }),
                      ),
                      metadata: Schema.optional(
                        Schema.Struct({
                          type: Schema.optional(
                            Schema.Literals([
                              "NotSpecified",
                              "Any",
                              "String",
                              "Object",
                              "Array",
                              "Integer",
                              "Number",
                              "Boolean",
                            ]),
                          ),
                          attributes: Schema.optional(
                            Schema.Literals(["None", "Modifiable"]),
                          ),
                        }),
                      ),
                    }),
                  ),
                ),
                type: Schema.optional(
                  Schema.Literals(["NotSpecified", "PlainText", "Mask"]),
                ),
                defaultPath: Schema.optional(Schema.String),
                defaultPattern: Schema.optional(
                  Schema.Struct({
                    phrase: Schema.optional(Schema.String),
                    variable: Schema.optional(Schema.String),
                    type: Schema.optional(
                      Schema.Literals(["NotSpecified", "Extract"]),
                    ),
                  }),
                ),
                defaultMetadata: Schema.optional(
                  Schema.Struct({
                    type: Schema.optional(
                      Schema.Literals([
                        "NotSpecified",
                        "Any",
                        "String",
                        "Object",
                        "Array",
                        "Integer",
                        "Number",
                        "Boolean",
                      ]),
                    ),
                    attributes: Schema.optional(
                      Schema.Literals(["None", "Modifiable"]),
                    ),
                  }),
                ),
              }),
            ),
          ),
          apiVersions: Schema.optional(Schema.Array(Schema.String)),
          defaultApiVersion: Schema.optional(Schema.String),
          zoneMappings: Schema.optional(
            Schema.Array(
              Schema.Struct({
                location: Schema.optional(Schema.String),
                zones: Schema.optional(Schema.Array(Schema.String)),
              }),
            ),
          ),
          apiProfiles: Schema.optional(
            Schema.Array(
              Schema.Struct({
                profileVersion: Schema.optional(Schema.String),
                apiVersion: Schema.optional(Schema.String),
              }),
            ),
          ),
          capabilities: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Record(Schema.String, Schema.String),
          ),
        }),
      ),
    ),
    providerAuthorizationConsentState: Schema.optional(
      Schema.Literals(["NotSpecified", "Required", "NotRequired", "Consented"]),
    ),
  });
export type ProvidersRegisterOutput = typeof ProvidersRegisterOutput.Type;

// The operation
/**
 * Registers a subscription with a resource provider.
 *
 * @param resourceProviderNamespace - The namespace of the resource provider to register.
 */
export const ProvidersRegister = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ProvidersRegisterInput,
  outputSchema: ProvidersRegisterOutput,
}));
// Input Schema
export const ProvidersRegisterAtManagementGroupScopeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceProviderNamespace: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.Management/managementGroups/{groupId}/providers/{resourceProviderNamespace}/register",
    }),
  );
export type ProvidersRegisterAtManagementGroupScopeInput =
  typeof ProvidersRegisterAtManagementGroupScopeInput.Type;

// Output Schema
export const ProvidersRegisterAtManagementGroupScopeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ProvidersRegisterAtManagementGroupScopeOutput =
  typeof ProvidersRegisterAtManagementGroupScopeOutput.Type;

// The operation
/**
 * Registers a management group with a resource provider. Use this operation to register a resource provider with resource types that can be deployed at the management group scope. It does not recursively register subscriptions within the management group. Instead, you must register subscriptions individually.
 *
 * @param resourceProviderNamespace - The namespace of the resource provider to register.
 */
export const ProvidersRegisterAtManagementGroupScope =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ProvidersRegisterAtManagementGroupScopeInput,
    outputSchema: ProvidersRegisterAtManagementGroupScopeOutput,
  }));
// Input Schema
export const ProvidersUnregisterInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceProviderNamespace: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/{resourceProviderNamespace}/unregister",
    }),
  );
export type ProvidersUnregisterInput = typeof ProvidersUnregisterInput.Type;

// Output Schema
export const ProvidersUnregisterOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    namespace: Schema.optional(Schema.String),
    registrationState: Schema.optional(Schema.String),
    registrationPolicy: Schema.optional(Schema.String),
    resourceTypes: Schema.optional(
      Schema.Array(
        Schema.Struct({
          resourceType: Schema.optional(Schema.String),
          locations: Schema.optional(Schema.Array(Schema.String)),
          locationMappings: Schema.optional(
            Schema.Array(
              Schema.Struct({
                location: Schema.optional(Schema.String),
                type: Schema.optional(Schema.String),
                extendedLocations: Schema.optional(Schema.Array(Schema.String)),
              }),
            ),
          ),
          aliases: Schema.optional(
            Schema.Array(
              Schema.Struct({
                name: Schema.optional(Schema.String),
                paths: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      path: Schema.optional(Schema.String),
                      apiVersions: Schema.optional(Schema.Array(Schema.String)),
                      pattern: Schema.optional(
                        Schema.Struct({
                          phrase: Schema.optional(Schema.String),
                          variable: Schema.optional(Schema.String),
                          type: Schema.optional(
                            Schema.Literals(["NotSpecified", "Extract"]),
                          ),
                        }),
                      ),
                      metadata: Schema.optional(
                        Schema.Struct({
                          type: Schema.optional(
                            Schema.Literals([
                              "NotSpecified",
                              "Any",
                              "String",
                              "Object",
                              "Array",
                              "Integer",
                              "Number",
                              "Boolean",
                            ]),
                          ),
                          attributes: Schema.optional(
                            Schema.Literals(["None", "Modifiable"]),
                          ),
                        }),
                      ),
                    }),
                  ),
                ),
                type: Schema.optional(
                  Schema.Literals(["NotSpecified", "PlainText", "Mask"]),
                ),
                defaultPath: Schema.optional(Schema.String),
                defaultPattern: Schema.optional(
                  Schema.Struct({
                    phrase: Schema.optional(Schema.String),
                    variable: Schema.optional(Schema.String),
                    type: Schema.optional(
                      Schema.Literals(["NotSpecified", "Extract"]),
                    ),
                  }),
                ),
                defaultMetadata: Schema.optional(
                  Schema.Struct({
                    type: Schema.optional(
                      Schema.Literals([
                        "NotSpecified",
                        "Any",
                        "String",
                        "Object",
                        "Array",
                        "Integer",
                        "Number",
                        "Boolean",
                      ]),
                    ),
                    attributes: Schema.optional(
                      Schema.Literals(["None", "Modifiable"]),
                    ),
                  }),
                ),
              }),
            ),
          ),
          apiVersions: Schema.optional(Schema.Array(Schema.String)),
          defaultApiVersion: Schema.optional(Schema.String),
          zoneMappings: Schema.optional(
            Schema.Array(
              Schema.Struct({
                location: Schema.optional(Schema.String),
                zones: Schema.optional(Schema.Array(Schema.String)),
              }),
            ),
          ),
          apiProfiles: Schema.optional(
            Schema.Array(
              Schema.Struct({
                profileVersion: Schema.optional(Schema.String),
                apiVersion: Schema.optional(Schema.String),
              }),
            ),
          ),
          capabilities: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Record(Schema.String, Schema.String),
          ),
        }),
      ),
    ),
    providerAuthorizationConsentState: Schema.optional(
      Schema.Literals(["NotSpecified", "Required", "NotRequired", "Consented"]),
    ),
  });
export type ProvidersUnregisterOutput = typeof ProvidersUnregisterOutput.Type;

// The operation
/**
 * Unregisters a subscription from a resource provider.
 *
 * @param resourceProviderNamespace - The namespace of the resource provider to unregister.
 */
export const ProvidersUnregister = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ProvidersUnregisterInput,
  outputSchema: ProvidersUnregisterOutput,
}));
// Input Schema
export const ResourceGroupsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}",
    }),
  );
export type ResourceGroupsCreateOrUpdateInput =
  typeof ResourceGroupsCreateOrUpdateInput.Type;

// Output Schema
export const ResourceGroupsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        provisioningState: Schema.optional(Schema.String),
      }),
    ),
    location: Schema.String,
    managedBy: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type ResourceGroupsCreateOrUpdateOutput =
  typeof ResourceGroupsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a resource group.
 *
 * @param resourceGroupName - The name of the resource group to create or update. Can include alphanumeric, underscore, parentheses, hyphen, period (except at end), and Unicode characters that match the allowed characters.
 */
export const ResourceGroupsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ResourceGroupsCreateOrUpdateInput,
    outputSchema: ResourceGroupsCreateOrUpdateOutput,
  }));
// Input Schema
export const ResourceGroupsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    forceDeletionTypes: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}",
    }),
  );
export type ResourceGroupsDeleteInput = typeof ResourceGroupsDeleteInput.Type;

// Output Schema
export const ResourceGroupsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ResourceGroupsDeleteOutput = typeof ResourceGroupsDeleteOutput.Type;

// The operation
/**
 * Deletes a resource group.
 *
 * When you delete a resource group, all of its resources are also deleted. Deleting a resource group deletes all of its template deployments and currently stored operations.
 *
 * @param resourceGroupName - The name of the resource group to delete. The name is case insensitive.
 * @param forceDeletionTypes - The resource types you want to force delete. Currently, only the following is supported: forceDeletionTypes=Microsoft.Compute/virtualMachines,Microsoft.Compute/virtualMachineScaleSets
 */
export const ResourceGroupsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ResourceGroupsDeleteInput,
    outputSchema: ResourceGroupsDeleteOutput,
  }),
);
// Input Schema
export const ResourceGroupsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    resourceGroupName: Schema.String.pipe(T.PathParam()),
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}",
  }),
);
export type ResourceGroupsGetInput = typeof ResourceGroupsGetInput.Type;

// Output Schema
export const ResourceGroupsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        provisioningState: Schema.optional(Schema.String),
      }),
    ),
    location: Schema.String,
    managedBy: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type ResourceGroupsGetOutput = typeof ResourceGroupsGetOutput.Type;

// The operation
/**
 * Gets a resource group.
 *
 * @param resourceGroupName - The name of the resource group to get. The name is case insensitive.
 */
export const ResourceGroupsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ResourceGroupsGetInput,
  outputSchema: ResourceGroupsGetOutput,
}));
// Input Schema
export const ResourceGroupsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    $filter: Schema.optional(Schema.String),
    $top: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourcegroups",
    }),
  );
export type ResourceGroupsListInput = typeof ResourceGroupsListInput.Type;

// Output Schema
export const ResourceGroupsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Struct({
              provisioningState: Schema.optional(Schema.String),
            }),
          ),
          location: Schema.String,
          managedBy: Schema.optional(Schema.String),
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ResourceGroupsListOutput = typeof ResourceGroupsListOutput.Type;

// The operation
/**
 * Gets all the resource groups for a subscription.
 *
 * @param $filter - The filter to apply on the operation.<br><br>You can filter by tag names and values. For example, to filter for a tag name and value, use $filter=tagName eq 'tag1' and tagValue eq 'Value1'
 * @param $top - The number of results to return. If null is passed, returns all resource groups.
 */
export const ResourceGroupsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ResourceGroupsListInput,
  outputSchema: ResourceGroupsListOutput,
}));
// Input Schema
export const ResourceGroupsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}",
    }),
  );
export type ResourceGroupsUpdateInput = typeof ResourceGroupsUpdateInput.Type;

// Output Schema
export const ResourceGroupsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        provisioningState: Schema.optional(Schema.String),
      }),
    ),
    location: Schema.String,
    managedBy: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type ResourceGroupsUpdateOutput = typeof ResourceGroupsUpdateOutput.Type;

// The operation
/**
 * Updates a resource group.
 *
 * Resource groups can be updated through a simple PATCH operation to a group address. The format of the request is the same as that for creating a resource group. If a field is unspecified, the current value is retained.
 *
 * @param resourceGroupName - The name of the resource group to update. The name is case insensitive.
 */
export const ResourceGroupsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ResourceGroupsUpdateInput,
    outputSchema: ResourceGroupsUpdateOutput,
  }),
);
// Input Schema
export const ResourceLinksCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    linkId: Schema.String.pipe(T.PathParam()),
  }).pipe(T.Http({ method: "PUT", path: "/{linkId}" }));
export type ResourceLinksCreateOrUpdateInput =
  typeof ResourceLinksCreateOrUpdateInput.Type;

// Output Schema
export const ResourceLinksCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.Unknown),
    properties: Schema.optional(
      Schema.Struct({
        sourceId: Schema.optional(Schema.String),
        targetId: Schema.String,
        notes: Schema.optional(Schema.String),
      }),
    ),
  });
export type ResourceLinksCreateOrUpdateOutput =
  typeof ResourceLinksCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a resource link between the specified resources.
 *
 * @param linkId - The fully qualified ID of the resource link. Use the format, /subscriptions/{subscription-id}/resourceGroups/{resource-group-name}/{provider-namespace}/{resource-type}/{resource-name}/Microsoft.Resources/links/{link-name}. For example, /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myGroup/Microsoft.Web/sites/mySite/Microsoft.Resources/links/myLink
 */
export const ResourceLinksCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ResourceLinksCreateOrUpdateInput,
    outputSchema: ResourceLinksCreateOrUpdateOutput,
  }),
);
// Input Schema
export const ResourceLinksDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    linkId: Schema.String.pipe(T.PathParam()),
  }).pipe(T.Http({ method: "DELETE", path: "/{linkId}" }));
export type ResourceLinksDeleteInput = typeof ResourceLinksDeleteInput.Type;

// Output Schema
export const ResourceLinksDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ResourceLinksDeleteOutput = typeof ResourceLinksDeleteOutput.Type;

// The operation
/**
 * Deletes a resource link with the specified ID.
 *
 * @param linkId - The fully qualified ID of the resource link. Use the format, /subscriptions/{subscription-id}/resourceGroups/{resource-group-name}/{provider-namespace}/{resource-type}/{resource-name}/Microsoft.Resources/links/{link-name}. For example, /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myGroup/Microsoft.Web/sites/mySite/Microsoft.Resources/links/myLink
 */
export const ResourceLinksDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ResourceLinksDeleteInput,
  outputSchema: ResourceLinksDeleteOutput,
}));
// Input Schema
export const ResourceLinksGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  linkId: Schema.String.pipe(T.PathParam()),
}).pipe(T.Http({ method: "GET", path: "/{linkId}" }));
export type ResourceLinksGetInput = typeof ResourceLinksGetInput.Type;

// Output Schema
export const ResourceLinksGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.Unknown),
    properties: Schema.optional(
      Schema.Struct({
        sourceId: Schema.optional(Schema.String),
        targetId: Schema.String,
        notes: Schema.optional(Schema.String),
      }),
    ),
  },
);
export type ResourceLinksGetOutput = typeof ResourceLinksGetOutput.Type;

// The operation
/**
 * Gets a resource link with the specified ID.
 *
 * @param linkId - The fully qualified Id of the resource link. For example, /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myGroup/Microsoft.Web/sites/mySite/Microsoft.Resources/links/myLink
 */
export const ResourceLinksGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ResourceLinksGetInput,
  outputSchema: ResourceLinksGetOutput,
}));
// Input Schema
export const ResourceLinksListAtSourceScopeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scope: Schema.String.pipe(T.PathParam()),
    $filter: Schema.optional(Schema.Literals(["atScope()"])),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/{scope}/providers/Microsoft.Resources/links",
    }),
  );
export type ResourceLinksListAtSourceScopeInput =
  typeof ResourceLinksListAtSourceScopeInput.Type;

// Output Schema
export const ResourceLinksListAtSourceScopeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        type: Schema.optional(Schema.Unknown),
        properties: Schema.optional(
          Schema.Struct({
            sourceId: Schema.optional(Schema.String),
            targetId: Schema.String,
            notes: Schema.optional(Schema.String),
          }),
        ),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ResourceLinksListAtSourceScopeOutput =
  typeof ResourceLinksListAtSourceScopeOutput.Type;

// The operation
/**
 * Gets a list of resource links at and below the specified source scope.
 *
 * @param scope - The fully qualified ID of the scope for getting the resource links. For example, to list resource links at and under a resource group, set the scope to /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myGroup.
 * @param $filter - The filter to apply when getting resource links. To get links only at the specified scope (not below the scope), use Filter.atScope().
 */
export const ResourceLinksListAtSourceScope =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ResourceLinksListAtSourceScopeInput,
    outputSchema: ResourceLinksListAtSourceScopeOutput,
  }));
// Input Schema
export const ResourceLinksListAtSubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    $filter: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Resources/links",
    }),
  );
export type ResourceLinksListAtSubscriptionInput =
  typeof ResourceLinksListAtSubscriptionInput.Type;

// Output Schema
export const ResourceLinksListAtSubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        type: Schema.optional(Schema.Unknown),
        properties: Schema.optional(
          Schema.Struct({
            sourceId: Schema.optional(Schema.String),
            targetId: Schema.String,
            notes: Schema.optional(Schema.String),
          }),
        ),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ResourceLinksListAtSubscriptionOutput =
  typeof ResourceLinksListAtSubscriptionOutput.Type;

// The operation
/**
 * Gets all the linked resources for the subscription.
 *
 * @param $filter - The filter to apply on the list resource links operation. The supported filter for list resource links is targetId. For example, $filter=targetId eq {value}
 */
export const ResourceLinksListAtSubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ResourceLinksListAtSubscriptionInput,
    outputSchema: ResourceLinksListAtSubscriptionOutput,
  }));
// Input Schema
export const ResourceManagementPrivateLinkDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Authorization/resourceManagementPrivateLinks/{rmplName}",
    }),
  );
export type ResourceManagementPrivateLinkDeleteInput =
  typeof ResourceManagementPrivateLinkDeleteInput.Type;

// Output Schema
export const ResourceManagementPrivateLinkDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ResourceManagementPrivateLinkDeleteOutput =
  typeof ResourceManagementPrivateLinkDeleteOutput.Type;

// The operation
/**
 * Delete a resource management private link.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ResourceManagementPrivateLinkDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ResourceManagementPrivateLinkDeleteInput,
    outputSchema: ResourceManagementPrivateLinkDeleteOutput,
  }));
// Input Schema
export const ResourceManagementPrivateLinkGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Authorization/resourceManagementPrivateLinks/{rmplName}",
    }),
  );
export type ResourceManagementPrivateLinkGetInput =
  typeof ResourceManagementPrivateLinkGetInput.Type;

// Output Schema
export const ResourceManagementPrivateLinkGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    properties: Schema.optional(
      Schema.Struct({
        privateEndpointConnections: Schema.optional(
          Schema.Array(Schema.String),
        ),
      }),
    ),
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
  });
export type ResourceManagementPrivateLinkGetOutput =
  typeof ResourceManagementPrivateLinkGetOutput.Type;

// The operation
/**
 * Get a resource management private link(resource-level).
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ResourceManagementPrivateLinkGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ResourceManagementPrivateLinkGetInput,
    outputSchema: ResourceManagementPrivateLinkGetOutput,
  }));
// Input Schema
export const ResourceManagementPrivateLinkListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/resourceManagementPrivateLinks",
    }),
  );
export type ResourceManagementPrivateLinkListInput =
  typeof ResourceManagementPrivateLinkListInput.Type;

// Output Schema
export const ResourceManagementPrivateLinkListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          properties: Schema.optional(
            Schema.Struct({
              privateEndpointConnections: Schema.optional(
                Schema.Array(Schema.String),
              ),
            }),
          ),
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type ResourceManagementPrivateLinkListOutput =
  typeof ResourceManagementPrivateLinkListOutput.Type;

// The operation
/**
 * Get all the resource management private links in a subscription.
 */
export const ResourceManagementPrivateLinkList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ResourceManagementPrivateLinkListInput,
    outputSchema: ResourceManagementPrivateLinkListOutput,
  }));
// Input Schema
export const ResourceManagementPrivateLinkListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Authorization/resourceManagementPrivateLinks",
    }),
  );
export type ResourceManagementPrivateLinkListByResourceGroupInput =
  typeof ResourceManagementPrivateLinkListByResourceGroupInput.Type;

// Output Schema
export const ResourceManagementPrivateLinkListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          properties: Schema.optional(
            Schema.Struct({
              privateEndpointConnections: Schema.optional(
                Schema.Array(Schema.String),
              ),
            }),
          ),
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type ResourceManagementPrivateLinkListByResourceGroupOutput =
  typeof ResourceManagementPrivateLinkListByResourceGroupOutput.Type;

// The operation
/**
 * Get all the resource management private links in a resource group.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ResourceManagementPrivateLinkListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ResourceManagementPrivateLinkListByResourceGroupInput,
    outputSchema: ResourceManagementPrivateLinkListByResourceGroupOutput,
  }));
// Input Schema
export const ResourceManagementPrivateLinkPutInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Authorization/resourceManagementPrivateLinks/{rmplName}",
    }),
  );
export type ResourceManagementPrivateLinkPutInput =
  typeof ResourceManagementPrivateLinkPutInput.Type;

// Output Schema
export const ResourceManagementPrivateLinkPutOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    properties: Schema.optional(
      Schema.Struct({
        privateEndpointConnections: Schema.optional(
          Schema.Array(Schema.String),
        ),
      }),
    ),
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
  });
export type ResourceManagementPrivateLinkPutOutput =
  typeof ResourceManagementPrivateLinkPutOutput.Type;

// The operation
/**
 * Create a resource management group private link.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ResourceManagementPrivateLinkPut =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ResourceManagementPrivateLinkPutInput,
    outputSchema: ResourceManagementPrivateLinkPutOutput,
  }));
// Input Schema
export const ResourcesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceProviderNamespace: Schema.String.pipe(T.PathParam()),
    parentResourcePath: Schema.String.pipe(T.PathParam()),
    resourceType: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{parentResourcePath}/{resourceType}/{resourceName}",
    }),
  );
export type ResourcesCreateOrUpdateInput =
  typeof ResourcesCreateOrUpdateInput.Type;

// Output Schema
export const ResourcesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    extendedLocation: Schema.optional(
      Schema.Struct({
        type: Schema.optional(Schema.Literals(["EdgeZone"])),
        name: Schema.optional(Schema.String),
      }),
    ),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type ResourcesCreateOrUpdateOutput =
  typeof ResourcesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates a resource.
 *
 * @param resourceGroupName - The name of the resource group for the resource. The name is case insensitive.
 * @param resourceProviderNamespace - The namespace of the resource provider.
 * @param parentResourcePath - The parent resource identity.
 * @param resourceType - The resource type of the resource to create.
 * @param resourceName - The name of the resource to create.
 * @param api-version - The API version to use for the operation.
 */
export const ResourcesCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ResourcesCreateOrUpdateInput,
    outputSchema: ResourcesCreateOrUpdateOutput,
  }),
);
// Input Schema
export const ResourcesCreateOrUpdateByIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(T.Http({ method: "PUT", path: "/{resourceId}" }));
export type ResourcesCreateOrUpdateByIdInput =
  typeof ResourcesCreateOrUpdateByIdInput.Type;

// Output Schema
export const ResourcesCreateOrUpdateByIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    extendedLocation: Schema.optional(
      Schema.Struct({
        type: Schema.optional(Schema.Literals(["EdgeZone"])),
        name: Schema.optional(Schema.String),
      }),
    ),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type ResourcesCreateOrUpdateByIdOutput =
  typeof ResourcesCreateOrUpdateByIdOutput.Type;

// The operation
/**
 * Create a resource by ID.
 *
 * @param resourceId - The fully qualified ID of the resource, including the resource name and resource type. Use the format, /subscriptions/{guid}/resourceGroups/{resource-group-name}/{resource-provider-namespace}/{resource-type}/{resource-name}
 * @param api-version - The API version to use for the operation.
 */
export const ResourcesCreateOrUpdateById = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ResourcesCreateOrUpdateByIdInput,
    outputSchema: ResourcesCreateOrUpdateByIdOutput,
  }),
);
// Input Schema
export const ResourcesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  resourceProviderNamespace: Schema.String.pipe(T.PathParam()),
  parentResourcePath: Schema.String.pipe(T.PathParam()),
  resourceType: Schema.String.pipe(T.PathParam()),
  resourceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{parentResourcePath}/{resourceType}/{resourceName}",
  }),
);
export type ResourcesDeleteInput = typeof ResourcesDeleteInput.Type;

// Output Schema
export const ResourcesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ResourcesDeleteOutput = typeof ResourcesDeleteOutput.Type;

// The operation
/**
 * Deletes a resource.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource to delete. The name is case insensitive.
 * @param resourceProviderNamespace - The namespace of the resource provider.
 * @param parentResourcePath - The parent resource identity.
 * @param resourceType - The resource type.
 * @param resourceName - The name of the resource to delete.
 * @param api-version - The API version to use for the operation.
 */
export const ResourcesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ResourcesDeleteInput,
  outputSchema: ResourcesDeleteOutput,
}));
// Input Schema
export const ResourcesDeleteByIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(T.Http({ method: "DELETE", path: "/{resourceId}" }));
export type ResourcesDeleteByIdInput = typeof ResourcesDeleteByIdInput.Type;

// Output Schema
export const ResourcesDeleteByIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ResourcesDeleteByIdOutput = typeof ResourcesDeleteByIdOutput.Type;

// The operation
/**
 * Deletes a resource by ID.
 *
 * @param resourceId - The fully qualified ID of the resource, including the resource name and resource type. Use the format, /subscriptions/{guid}/resourceGroups/{resource-group-name}/{resource-provider-namespace}/{resource-type}/{resource-name}
 * @param api-version - The API version to use for the operation.
 */
export const ResourcesDeleteById = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ResourcesDeleteByIdInput,
  outputSchema: ResourcesDeleteByIdOutput,
}));
// Input Schema
export const ResourcesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  resourceProviderNamespace: Schema.String.pipe(T.PathParam()),
  parentResourcePath: Schema.String.pipe(T.PathParam()),
  resourceType: Schema.String.pipe(T.PathParam()),
  resourceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{parentResourcePath}/{resourceType}/{resourceName}",
  }),
);
export type ResourcesGetInput = typeof ResourcesGetInput.Type;

// Output Schema
export const ResourcesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  extendedLocation: Schema.optional(
    Schema.Struct({
      type: Schema.optional(Schema.Literals(["EdgeZone"])),
      name: Schema.optional(Schema.String),
    }),
  ),
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
});
export type ResourcesGetOutput = typeof ResourcesGetOutput.Type;

// The operation
/**
 * Gets a resource.
 *
 * @param resourceGroupName - The name of the resource group containing the resource to get. The name is case insensitive.
 * @param resourceProviderNamespace - The namespace of the resource provider.
 * @param parentResourcePath - The parent resource identity.
 * @param resourceType - The resource type of the resource.
 * @param resourceName - The name of the resource to get.
 * @param api-version - The API version to use for the operation.
 */
export const ResourcesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ResourcesGetInput,
  outputSchema: ResourcesGetOutput,
}));
// Input Schema
export const ResourcesGetByIdInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(T.Http({ method: "GET", path: "/{resourceId}" }));
export type ResourcesGetByIdInput = typeof ResourcesGetByIdInput.Type;

// Output Schema
export const ResourcesGetByIdOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    extendedLocation: Schema.optional(
      Schema.Struct({
        type: Schema.optional(Schema.Literals(["EdgeZone"])),
        name: Schema.optional(Schema.String),
      }),
    ),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  },
);
export type ResourcesGetByIdOutput = typeof ResourcesGetByIdOutput.Type;

// The operation
/**
 * Gets a resource by ID.
 *
 * @param resourceId - The fully qualified ID of the resource, including the resource name and resource type. Use the format, /subscriptions/{guid}/resourceGroups/{resource-group-name}/{resource-provider-namespace}/{resource-type}/{resource-name}
 * @param api-version - The API version to use for the operation.
 */
export const ResourcesGetById = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ResourcesGetByIdInput,
  outputSchema: ResourcesGetByIdOutput,
}));
// Input Schema
export const ResourcesListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  $filter: Schema.optional(Schema.String),
  $expand: Schema.optional(Schema.String),
  $top: Schema.optional(Schema.Number),
}).pipe(
  T.Http({ method: "GET", path: "/subscriptions/{subscriptionId}/resources" }),
);
export type ResourcesListInput = typeof ResourcesListInput.Type;

// Output Schema
export const ResourcesListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        plan: Schema.optional(
          Schema.Struct({
            name: Schema.optional(Schema.String),
            publisher: Schema.optional(Schema.String),
            product: Schema.optional(Schema.String),
            promotionCode: Schema.optional(Schema.String),
            version: Schema.optional(Schema.String),
          }),
        ),
        properties: Schema.optional(Schema.Unknown),
        kind: Schema.optional(Schema.String),
        managedBy: Schema.optional(Schema.String),
        sku: Schema.optional(
          Schema.Struct({
            name: Schema.optional(Schema.String),
            tier: Schema.optional(Schema.String),
            size: Schema.optional(Schema.String),
            family: Schema.optional(Schema.String),
            model: Schema.optional(Schema.String),
            capacity: Schema.optional(Schema.Number),
          }),
        ),
        identity: Schema.optional(
          Schema.Struct({
            principalId: Schema.optional(Schema.String),
            tenantId: Schema.optional(Schema.String),
            type: Schema.optional(
              Schema.Literals([
                "SystemAssigned",
                "UserAssigned",
                "SystemAssigned, UserAssigned",
                "None",
              ]),
            ),
            userAssignedIdentities: Schema.optional(
              Schema.Record(
                Schema.String,
                Schema.Struct({
                  principalId: Schema.optional(Schema.String),
                  clientId: Schema.optional(Schema.String),
                }),
              ),
            ),
          }),
        ),
      }),
    ),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type ResourcesListOutput = typeof ResourcesListOutput.Type;

// The operation
/**
 * Get all the resources in a subscription.
 *
 * @param $filter - The filter to apply on the operation.<br><br>Filter comparison operators include `eq` (equals) and `ne` (not equals) and may be used with the following properties: `location`, `resourceType`, `name`, `resourceGroup`, `identity`, `identity/principalId`, `plan`, `plan/publisher`, `plan/product`, `plan/name`, `plan/version`, and `plan/promotionCode`.<br><br>For example, to filter by a resource type, use `$filter=resourceType eq 'Microsoft.Network/virtualNetworks'`<br><br><br>`substringof(value, property)` can  be used to filter for substrings of the following currently-supported properties: `name` and `resourceGroup`<br><br>For example, to get all resources with 'demo' anywhere in the resource name, use `$filter=substringof('demo', name)`<br><br>Multiple substring operations can also be combined using `and`/`or` operators.<br><br>Note that any truncated number of results queried via `$top` may also not be compatible when using a filter.<br><br><br>Resources can be filtered by tag names and values. For example, to filter for a tag name and value, use `$filter=tagName eq 'tag1' and tagValue eq 'Value1'`. Note that when resources are filtered by tag name and value, <b>the original tags for each resource will not be returned in the results.</b> Any list of additional properties queried via `$expand` may also not be compatible when filtering by tag names/values. <br><br>For tag names only, resources can be filtered by prefix using the following syntax: `$filter=startswith(tagName, 'depart')`. This query will return all resources with a tag name prefixed by the phrase `depart` (i.e.`department`, `departureDate`, `departureTime`, etc.)<br><br><br>Note that some properties can be combined when filtering resources, which include the following: `substringof() and/or resourceType`, `plan and plan/publisher and plan/name`, and `identity and identity/principalId`.
 * @param $expand - Comma-separated list of additional properties to be included in the response. Valid values include `createdTime`, `changedTime` and `provisioningState`. For example, `$expand=createdTime,changedTime`.
 * @param $top - The number of recommendations per page if a paged version of this API is being used.
 */
export const ResourcesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ResourcesListInput,
  outputSchema: ResourcesListOutput,
}));
// Input Schema
export const ResourcesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    $filter: Schema.optional(Schema.String),
    $expand: Schema.optional(Schema.String),
    $top: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/resources",
    }),
  );
export type ResourcesListByResourceGroupInput =
  typeof ResourcesListByResourceGroupInput.Type;

// Output Schema
export const ResourcesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          plan: Schema.optional(
            Schema.Struct({
              name: Schema.optional(Schema.String),
              publisher: Schema.optional(Schema.String),
              product: Schema.optional(Schema.String),
              promotionCode: Schema.optional(Schema.String),
              version: Schema.optional(Schema.String),
            }),
          ),
          properties: Schema.optional(Schema.Unknown),
          kind: Schema.optional(Schema.String),
          managedBy: Schema.optional(Schema.String),
          sku: Schema.optional(
            Schema.Struct({
              name: Schema.optional(Schema.String),
              tier: Schema.optional(Schema.String),
              size: Schema.optional(Schema.String),
              family: Schema.optional(Schema.String),
              model: Schema.optional(Schema.String),
              capacity: Schema.optional(Schema.Number),
            }),
          ),
          identity: Schema.optional(
            Schema.Struct({
              principalId: Schema.optional(Schema.String),
              tenantId: Schema.optional(Schema.String),
              type: Schema.optional(
                Schema.Literals([
                  "SystemAssigned",
                  "UserAssigned",
                  "SystemAssigned, UserAssigned",
                  "None",
                ]),
              ),
              userAssignedIdentities: Schema.optional(
                Schema.Record(
                  Schema.String,
                  Schema.Struct({
                    principalId: Schema.optional(Schema.String),
                    clientId: Schema.optional(Schema.String),
                  }),
                ),
              ),
            }),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ResourcesListByResourceGroupOutput =
  typeof ResourcesListByResourceGroupOutput.Type;

// The operation
/**
 * Get all the resources for a resource group.
 *
 * @param resourceGroupName - The resource group with the resources to get.
 * @param $filter - The filter to apply on the operation.<br><br>The properties you can use for eq (equals) or ne (not equals) are: location, resourceType, name, resourceGroup, identity, identity/principalId, plan, plan/publisher, plan/product, plan/name, plan/version, and plan/promotionCode.<br><br>For example, to filter by a resource type, use: $filter=resourceType eq 'Microsoft.Network/virtualNetworks'<br><br>You can use substringof(value, property) in the filter. The properties you can use for substring are: name and resourceGroup.<br><br>For example, to get all resources with 'demo' anywhere in the name, use: $filter=substringof('demo', name)<br><br>You can link more than one substringof together by adding and/or operators.<br><br>You can filter by tag names and values. For example, to filter for a tag name and value, use $filter=tagName eq 'tag1' and tagValue eq 'Value1'. When you filter by a tag name and value, the tags for each resource are not returned in the results.<br><br>You can use some properties together when filtering. The combinations you can use are: substringof and/or resourceType, plan and plan/publisher and plan/name, identity and identity/principalId.
 * @param $expand - Comma-separated list of additional properties to be included in the response. Valid values include `createdTime`, `changedTime` and `provisioningState`. For example, `$expand=createdTime,changedTime`.
 * @param $top - The number of results to return. If null is passed, returns all resources.
 */
export const ResourcesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ResourcesListByResourceGroupInput,
    outputSchema: ResourcesListByResourceGroupOutput,
  }));
// Input Schema
export const ResourcesMoveResourcesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    sourceResourceGroupName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{sourceResourceGroupName}/moveResources",
    }),
  );
export type ResourcesMoveResourcesInput =
  typeof ResourcesMoveResourcesInput.Type;

// Output Schema
export const ResourcesMoveResourcesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ResourcesMoveResourcesOutput =
  typeof ResourcesMoveResourcesOutput.Type;

// The operation
/**
 * Moves resources from one resource group to another resource group.
 *
 * The resources to be moved must be in the same source resource group in the source subscription being used. The target resource group may be in a different subscription. When moving resources, both the source group and the target group are locked for the duration of the operation. Write and delete operations are blocked on the groups until the move completes.
 *
 * @param sourceResourceGroupName - The name of the resource group from the source subscription containing the resources to be moved.
 */
export const ResourcesMoveResources = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ResourcesMoveResourcesInput,
    outputSchema: ResourcesMoveResourcesOutput,
  }),
);
// Input Schema
export const ResourcesUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  resourceProviderNamespace: Schema.String.pipe(T.PathParam()),
  parentResourcePath: Schema.String.pipe(T.PathParam()),
  resourceType: Schema.String.pipe(T.PathParam()),
  resourceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{parentResourcePath}/{resourceType}/{resourceName}",
  }),
);
export type ResourcesUpdateInput = typeof ResourcesUpdateInput.Type;

// Output Schema
export const ResourcesUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  extendedLocation: Schema.optional(
    Schema.Struct({
      type: Schema.optional(Schema.Literals(["EdgeZone"])),
      name: Schema.optional(Schema.String),
    }),
  ),
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
});
export type ResourcesUpdateOutput = typeof ResourcesUpdateOutput.Type;

// The operation
/**
 * Updates a resource.
 *
 * @param resourceGroupName - The name of the resource group for the resource. The name is case insensitive.
 * @param resourceProviderNamespace - The namespace of the resource provider.
 * @param parentResourcePath - The parent resource identity.
 * @param resourceType - The resource type of the resource to update.
 * @param resourceName - The name of the resource to update.
 * @param api-version - The API version to use for the operation.
 */
export const ResourcesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ResourcesUpdateInput,
  outputSchema: ResourcesUpdateOutput,
}));
// Input Schema
export const ResourcesUpdateByIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(T.Http({ method: "PATCH", path: "/{resourceId}" }));
export type ResourcesUpdateByIdInput = typeof ResourcesUpdateByIdInput.Type;

// Output Schema
export const ResourcesUpdateByIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    extendedLocation: Schema.optional(
      Schema.Struct({
        type: Schema.optional(Schema.Literals(["EdgeZone"])),
        name: Schema.optional(Schema.String),
      }),
    ),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type ResourcesUpdateByIdOutput = typeof ResourcesUpdateByIdOutput.Type;

// The operation
/**
 * Updates a resource by ID.
 *
 * @param resourceId - The fully qualified ID of the resource, including the resource name and resource type. Use the format, /subscriptions/{guid}/resourceGroups/{resource-group-name}/{resource-provider-namespace}/{resource-type}/{resource-name}
 * @param api-version - The API version to use for the operation.
 */
export const ResourcesUpdateById = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ResourcesUpdateByIdInput,
  outputSchema: ResourcesUpdateByIdOutput,
}));
// Input Schema
export const ResourcesValidateMoveResourcesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    sourceResourceGroupName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{sourceResourceGroupName}/validateMoveResources",
    }),
  );
export type ResourcesValidateMoveResourcesInput =
  typeof ResourcesValidateMoveResourcesInput.Type;

// Output Schema
export const ResourcesValidateMoveResourcesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ResourcesValidateMoveResourcesOutput =
  typeof ResourcesValidateMoveResourcesOutput.Type;

// The operation
/**
 * Validates whether resources can be moved from one resource group to another resource group.
 *
 * This operation checks whether the specified resources can be moved to the target. The resources to be moved must be in the same source resource group in the source subscription being used. The target resource group may be in a different subscription. If validation succeeds, it returns HTTP response code 204 (no content). If validation fails, it returns HTTP response code 409 (Conflict) with an error message. Retrieve the URL in the Location header value to check the result of the long-running operation.
 *
 * @param sourceResourceGroupName - The name of the resource group from the source subscription containing the resources to be validated for move.
 */
export const ResourcesValidateMoveResources =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ResourcesValidateMoveResourcesInput,
    outputSchema: ResourcesValidateMoveResourcesOutput,
  }));
// Input Schema
export const ResourceValidationClientValidateResourcesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.Resources/validateResources",
    }),
  );
export type ResourceValidationClientValidateResourcesInput =
  typeof ResourceValidationClientValidateResourcesInput.Type;

// Output Schema
export const ResourceValidationClientValidateResourcesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    properties: Schema.Struct({
      validatedResources: Schema.Array(Schema.String),
    }),
  });
export type ResourceValidationClientValidateResourcesOutput =
  typeof ResourceValidationClientValidateResourcesOutput.Type;

// The operation
/**
 * Validates multiple ARM resources.
 *
 * @param api-version - The API version to use for this operation.
 */
export const ResourceValidationClientValidateResources =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ResourceValidationClientValidateResourcesInput,
    outputSchema: ResourceValidationClientValidateResourcesOutput,
  }));
// Input Schema
export const SubscriptionFeatureRegistrationsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Features/featureProviders/{providerNamespace}/subscriptionFeatureRegistrations/{featureName}",
    }),
  );
export type SubscriptionFeatureRegistrationsCreateOrUpdateInput =
  typeof SubscriptionFeatureRegistrationsCreateOrUpdateInput.Type;

// Output Schema
export const SubscriptionFeatureRegistrationsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type SubscriptionFeatureRegistrationsCreateOrUpdateOutput =
  typeof SubscriptionFeatureRegistrationsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a feature registration.
 */
export const SubscriptionFeatureRegistrationsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SubscriptionFeatureRegistrationsCreateOrUpdateInput,
    outputSchema: SubscriptionFeatureRegistrationsCreateOrUpdateOutput,
  }));
// Input Schema
export const SubscriptionFeatureRegistrationsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Features/featureProviders/{providerNamespace}/subscriptionFeatureRegistrations/{featureName}",
    }),
  );
export type SubscriptionFeatureRegistrationsDeleteInput =
  typeof SubscriptionFeatureRegistrationsDeleteInput.Type;

// Output Schema
export const SubscriptionFeatureRegistrationsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SubscriptionFeatureRegistrationsDeleteOutput =
  typeof SubscriptionFeatureRegistrationsDeleteOutput.Type;

// The operation
/**
 * Deletes a feature registration
 */
export const SubscriptionFeatureRegistrationsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SubscriptionFeatureRegistrationsDeleteInput,
    outputSchema: SubscriptionFeatureRegistrationsDeleteOutput,
  }));
// Input Schema
export const SubscriptionFeatureRegistrationsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Features/featureProviders/{providerNamespace}/subscriptionFeatureRegistrations/{featureName}",
    }),
  );
export type SubscriptionFeatureRegistrationsGetInput =
  typeof SubscriptionFeatureRegistrationsGetInput.Type;

// Output Schema
export const SubscriptionFeatureRegistrationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type SubscriptionFeatureRegistrationsGetOutput =
  typeof SubscriptionFeatureRegistrationsGetOutput.Type;

// The operation
/**
 * Returns a feature registration
 */
export const SubscriptionFeatureRegistrationsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SubscriptionFeatureRegistrationsGetInput,
    outputSchema: SubscriptionFeatureRegistrationsGetOutput,
  }));
// Input Schema
export const SubscriptionFeatureRegistrationsListAllBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Features/subscriptionFeatureRegistrations",
    }),
  );
export type SubscriptionFeatureRegistrationsListAllBySubscriptionInput =
  typeof SubscriptionFeatureRegistrationsListAllBySubscriptionInput.Type;

// Output Schema
export const SubscriptionFeatureRegistrationsListAllBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type SubscriptionFeatureRegistrationsListAllBySubscriptionOutput =
  typeof SubscriptionFeatureRegistrationsListAllBySubscriptionOutput.Type;

// The operation
/**
 * Returns subscription feature registrations for given subscription.
 */
export const SubscriptionFeatureRegistrationsListAllBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SubscriptionFeatureRegistrationsListAllBySubscriptionInput,
    outputSchema: SubscriptionFeatureRegistrationsListAllBySubscriptionOutput,
  }));
// Input Schema
export const SubscriptionFeatureRegistrationsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Features/featureProviders/{providerNamespace}/subscriptionFeatureRegistrations",
    }),
  );
export type SubscriptionFeatureRegistrationsListBySubscriptionInput =
  typeof SubscriptionFeatureRegistrationsListBySubscriptionInput.Type;

// Output Schema
export const SubscriptionFeatureRegistrationsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type SubscriptionFeatureRegistrationsListBySubscriptionOutput =
  typeof SubscriptionFeatureRegistrationsListBySubscriptionOutput.Type;

// The operation
/**
 * Returns subscription feature registrations for given subscription and provider namespace.
 */
export const SubscriptionFeatureRegistrationsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SubscriptionFeatureRegistrationsListBySubscriptionInput,
    outputSchema: SubscriptionFeatureRegistrationsListBySubscriptionOutput,
  }));
// Input Schema
export const SubscriptionsCheckZonePeersInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Resources/checkZonePeers/",
    }),
  );
export type SubscriptionsCheckZonePeersInput =
  typeof SubscriptionsCheckZonePeersInput.Type;

// Output Schema
export const SubscriptionsCheckZonePeersOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    availabilityZonePeers: Schema.optional(
      Schema.Array(
        Schema.Struct({
          availabilityZone: Schema.optional(Schema.String),
          peers: Schema.optional(
            Schema.Array(
              Schema.Struct({
                subscriptionId: Schema.optional(Schema.String),
                availabilityZone: Schema.optional(Schema.String),
              }),
            ),
          ),
        }),
      ),
    ),
  });
export type SubscriptionsCheckZonePeersOutput =
  typeof SubscriptionsCheckZonePeersOutput.Type;

// The operation
/**
 * Compares a subscriptions logical zone mapping
 *
 * @param api-version - The API version to use for this operation.
 */
export const SubscriptionsCheckZonePeers = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SubscriptionsCheckZonePeersInput,
    outputSchema: SubscriptionsCheckZonePeersOutput,
  }),
);
// Input Schema
export const SubscriptionsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  "api-version": Schema.String,
}).pipe(T.Http({ method: "GET", path: "/subscriptions/{subscriptionId}" }));
export type SubscriptionsGetInput = typeof SubscriptionsGetInput.Type;

// Output Schema
export const SubscriptionsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    id: Schema.optional(Schema.String),
    subscriptionId: Schema.optional(Schema.String),
    displayName: Schema.optional(Schema.String),
    tenantId: Schema.optional(Schema.String),
    state: Schema.optional(
      Schema.Literals(["Enabled", "Warned", "PastDue", "Disabled", "Deleted"]),
    ),
    subscriptionPolicies: Schema.optional(
      Schema.Struct({
        locationPlacementId: Schema.optional(Schema.String),
        quotaId: Schema.optional(Schema.String),
        spendingLimit: Schema.optional(
          Schema.Literals(["On", "Off", "CurrentPeriodOff"]),
        ),
      }),
    ),
    authorizationSource: Schema.optional(Schema.String),
    managedByTenants: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tenantId: Schema.optional(Schema.String),
        }),
      ),
    ),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  },
);
export type SubscriptionsGetOutput = typeof SubscriptionsGetOutput.Type;

// The operation
/**
 * Gets details about a specified subscription.
 *
 * @param api-version - The API version to use for this operation.
 */
export const SubscriptionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SubscriptionsGetInput,
  outputSchema: SubscriptionsGetOutput,
}));
// Input Schema
export const SubscriptionsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    "api-version": Schema.String,
  },
).pipe(T.Http({ method: "GET", path: "/subscriptions" }));
export type SubscriptionsListInput = typeof SubscriptionsListInput.Type;

// Output Schema
export const SubscriptionsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          subscriptionId: Schema.optional(Schema.String),
          displayName: Schema.optional(Schema.String),
          tenantId: Schema.optional(Schema.String),
          state: Schema.optional(
            Schema.Literals([
              "Enabled",
              "Warned",
              "PastDue",
              "Disabled",
              "Deleted",
            ]),
          ),
          subscriptionPolicies: Schema.optional(
            Schema.Struct({
              locationPlacementId: Schema.optional(Schema.String),
              quotaId: Schema.optional(Schema.String),
              spendingLimit: Schema.optional(
                Schema.Literals(["On", "Off", "CurrentPeriodOff"]),
              ),
            }),
          ),
          authorizationSource: Schema.optional(Schema.String),
          managedByTenants: Schema.optional(
            Schema.Array(
              Schema.Struct({
                tenantId: Schema.optional(Schema.String),
              }),
            ),
          ),
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        }),
      ),
    ),
    nextLink: Schema.String,
  });
export type SubscriptionsListOutput = typeof SubscriptionsListOutput.Type;

// The operation
/**
 * Gets all subscriptions for a tenant.
 *
 * @param api-version - The API version to use for this operation.
 */
export const SubscriptionsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SubscriptionsListInput,
  outputSchema: SubscriptionsListOutput,
}));
// Input Schema
export const SubscriptionsListLocationsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
    includeExtendedLocations: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/locations",
    }),
  );
export type SubscriptionsListLocationsInput =
  typeof SubscriptionsListLocationsInput.Type;

// Output Schema
export const SubscriptionsListLocationsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          subscriptionId: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.Literals(["Region", "EdgeZone"])),
          displayName: Schema.optional(Schema.String),
          regionalDisplayName: Schema.optional(Schema.String),
          metadata: Schema.optional(
            Schema.Struct({
              regionType: Schema.optional(
                Schema.Literals(["Physical", "Logical"]),
              ),
              regionCategory: Schema.optional(
                Schema.Literals(["Recommended", "Extended", "Other"]),
              ),
              geography: Schema.optional(Schema.String),
              geographyGroup: Schema.optional(Schema.String),
              longitude: Schema.optional(Schema.String),
              latitude: Schema.optional(Schema.String),
              physicalLocation: Schema.optional(Schema.String),
              pairedRegion: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    id: Schema.optional(Schema.String),
                    subscriptionId: Schema.optional(Schema.String),
                  }),
                ),
              ),
              homeLocation: Schema.optional(Schema.String),
            }),
          ),
          availabilityZoneMappings: Schema.optional(
            Schema.Array(
              Schema.Struct({
                logicalZone: Schema.optional(Schema.String),
                physicalZone: Schema.optional(Schema.String),
              }),
            ),
          ),
        }),
      ),
    ),
  });
export type SubscriptionsListLocationsOutput =
  typeof SubscriptionsListLocationsOutput.Type;

// The operation
/**
 * Gets all available geo-locations.
 *
 * This operation provides all the locations that are available for resource providers; however, each resource provider may support a subset of this list.
 *
 * @param api-version - The API version to use for this operation.
 * @param includeExtendedLocations - Whether to include extended locations.
 */
export const SubscriptionsListLocations = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SubscriptionsListLocationsInput,
    outputSchema: SubscriptionsListLocationsOutput,
  }),
);
// Input Schema
export const TagsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tagName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/tagNames/{tagName}",
    }),
  );
export type TagsCreateOrUpdateInput = typeof TagsCreateOrUpdateInput.Type;

// Output Schema
export const TagsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    tagName: Schema.optional(Schema.String),
    count: Schema.optional(
      Schema.Struct({
        type: Schema.optional(Schema.String),
        value: Schema.optional(Schema.Number),
      }),
    ),
    values: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          tagValue: Schema.optional(Schema.String),
          count: Schema.optional(
            Schema.Struct({
              type: Schema.optional(Schema.String),
              value: Schema.optional(Schema.Number),
            }),
          ),
        }),
      ),
    ),
  });
export type TagsCreateOrUpdateOutput = typeof TagsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates a predefined tag name.
 *
 * This operation allows adding a name to the list of predefined tag names for the given subscription. A tag name can have a maximum of 512 characters and is case-insensitive. Tag names cannot have the following prefixes which are reserved for Azure use: 'microsoft', 'azure', 'windows'.
 *
 * @param tagName - The name of the tag to create.
 */
export const TagsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TagsCreateOrUpdateInput,
  outputSchema: TagsCreateOrUpdateOutput,
}));
// Input Schema
export const TagsCreateOrUpdateAtScopeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PUT",
      path: "/{scope}/providers/Microsoft.Resources/tags/default",
    }),
  );
export type TagsCreateOrUpdateAtScopeInput =
  typeof TagsCreateOrUpdateAtScopeInput.Type;

// Output Schema
export const TagsCreateOrUpdateAtScopeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    properties: Schema.Struct({
      tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    }),
  });
export type TagsCreateOrUpdateAtScopeOutput =
  typeof TagsCreateOrUpdateAtScopeOutput.Type;

// The operation
/**
 * Creates or updates the entire set of tags on a resource or subscription.
 *
 * This operation allows adding or replacing the entire set of tags on the specified resource or subscription. The specified entity can have a maximum of 50 tags.
 */
export const TagsCreateOrUpdateAtScope = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: TagsCreateOrUpdateAtScopeInput,
    outputSchema: TagsCreateOrUpdateAtScopeOutput,
  }),
);
// Input Schema
export const TagsCreateOrUpdateValueInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tagName: Schema.String.pipe(T.PathParam()),
    tagValue: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/tagNames/{tagName}/tagValues/{tagValue}",
    }),
  );
export type TagsCreateOrUpdateValueInput =
  typeof TagsCreateOrUpdateValueInput.Type;

// Output Schema
export const TagsCreateOrUpdateValueOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    tagValue: Schema.optional(Schema.String),
    count: Schema.optional(
      Schema.Struct({
        type: Schema.optional(Schema.String),
        value: Schema.optional(Schema.Number),
      }),
    ),
  });
export type TagsCreateOrUpdateValueOutput =
  typeof TagsCreateOrUpdateValueOutput.Type;

// The operation
/**
 * Creates a predefined value for a predefined tag name.
 *
 * This operation allows adding a value to the list of predefined values for an existing predefined tag name. A tag value can have a maximum of 256 characters.
 *
 * @param tagName - The name of the tag.
 * @param tagValue - The value of the tag to create.
 */
export const TagsCreateOrUpdateValue = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: TagsCreateOrUpdateValueInput,
    outputSchema: TagsCreateOrUpdateValueOutput,
  }),
);
// Input Schema
export const TagsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tagName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/tagNames/{tagName}",
  }),
);
export type TagsDeleteInput = typeof TagsDeleteInput.Type;

// Output Schema
export const TagsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type TagsDeleteOutput = typeof TagsDeleteOutput.Type;

// The operation
/**
 * Deletes a predefined tag name.
 *
 * This operation allows deleting a name from the list of predefined tag names for the given subscription. The name being deleted must not be in use as a tag name for any resource. All predefined values for the given name must have already been deleted.
 *
 * @param tagName - The name of the tag.
 */
export const TagsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TagsDeleteInput,
  outputSchema: TagsDeleteOutput,
}));
// Input Schema
export const TagsDeleteAtScopeInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "DELETE",
    path: "/{scope}/providers/Microsoft.Resources/tags/default",
  }),
);
export type TagsDeleteAtScopeInput = typeof TagsDeleteAtScopeInput.Type;

// Output Schema
export const TagsDeleteAtScopeOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type TagsDeleteAtScopeOutput = typeof TagsDeleteAtScopeOutput.Type;

// The operation
/**
 * Deletes the entire set of tags on a resource or subscription.
 */
export const TagsDeleteAtScope = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TagsDeleteAtScopeInput,
  outputSchema: TagsDeleteAtScopeOutput,
}));
// Input Schema
export const TagsDeleteValueInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tagName: Schema.String.pipe(T.PathParam()),
  tagValue: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/tagNames/{tagName}/tagValues/{tagValue}",
  }),
);
export type TagsDeleteValueInput = typeof TagsDeleteValueInput.Type;

// Output Schema
export const TagsDeleteValueOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type TagsDeleteValueOutput = typeof TagsDeleteValueOutput.Type;

// The operation
/**
 * Deletes a predefined tag value for a predefined tag name.
 *
 * This operation allows deleting a value from the list of predefined values for an existing predefined tag name. The value being deleted must not be in use as a tag value for the given tag name for any resource.
 *
 * @param tagName - The name of the tag.
 * @param tagValue - The value of the tag to delete.
 */
export const TagsDeleteValue = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TagsDeleteValueInput,
  outputSchema: TagsDeleteValueOutput,
}));
// Input Schema
export const TagsGetAtScopeInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/{scope}/providers/Microsoft.Resources/tags/default",
  }),
);
export type TagsGetAtScopeInput = typeof TagsGetAtScopeInput.Type;

// Output Schema
export const TagsGetAtScopeOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  properties: Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  }),
});
export type TagsGetAtScopeOutput = typeof TagsGetAtScopeOutput.Type;

// The operation
/**
 * Gets the entire set of tags on a resource or subscription.
 */
export const TagsGetAtScope = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TagsGetAtScopeInput,
  outputSchema: TagsGetAtScopeOutput,
}));
// Input Schema
export const TagsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
  T.Http({ method: "GET", path: "/subscriptions/{subscriptionId}/tagNames" }),
);
export type TagsListInput = typeof TagsListInput.Type;

// Output Schema
export const TagsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        tagName: Schema.optional(Schema.String),
        count: Schema.optional(
          Schema.Struct({
            type: Schema.optional(Schema.String),
            value: Schema.optional(Schema.Number),
          }),
        ),
        values: Schema.optional(
          Schema.Array(
            Schema.Struct({
              id: Schema.optional(Schema.String),
              tagValue: Schema.optional(Schema.String),
              count: Schema.optional(
                Schema.Struct({
                  type: Schema.optional(Schema.String),
                  value: Schema.optional(Schema.Number),
                }),
              ),
            }),
          ),
        ),
      }),
    ),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type TagsListOutput = typeof TagsListOutput.Type;

// The operation
/**
 * Gets a summary of tag usage under the subscription.
 *
 * This operation performs a union of predefined tags, resource tags, resource group tags and subscription tags, and returns a summary of usage for each tag name and value under the given subscription. In case of a large number of tags, this operation may return a previously cached result.
 */
export const TagsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TagsListInput,
  outputSchema: TagsListOutput,
}));
// Input Schema
export const TagsUpdateAtScopeInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "PATCH",
    path: "/{scope}/providers/Microsoft.Resources/tags/default",
  }),
);
export type TagsUpdateAtScopeInput = typeof TagsUpdateAtScopeInput.Type;

// Output Schema
export const TagsUpdateAtScopeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    properties: Schema.Struct({
      tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    }),
  });
export type TagsUpdateAtScopeOutput = typeof TagsUpdateAtScopeOutput.Type;

// The operation
/**
 * Selectively updates the set of tags on a resource or subscription.
 *
 * This operation allows replacing, merging or selectively deleting tags on the specified resource or subscription. The specified entity can have a maximum of 50 tags at the end of the operation. The 'replace' option replaces the entire set of existing tags with a new set. The 'merge' option allows adding tags with new names and updating the values of tags with existing names. The 'delete' option allows selectively deleting tags based on given names or name/value pairs.
 */
export const TagsUpdateAtScope = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TagsUpdateAtScopeInput,
  outputSchema: TagsUpdateAtScopeOutput,
}));
// Input Schema
export const TemplateSpecsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Resources/templateSpecs/{templateSpecName}",
    }),
  );
export type TemplateSpecsCreateOrUpdateInput =
  typeof TemplateSpecsCreateOrUpdateInput.Type;

// Output Schema
export const TemplateSpecsCreateOrUpdateOutput =
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
  });
export type TemplateSpecsCreateOrUpdateOutput =
  typeof TemplateSpecsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a Template Spec.
 */
export const TemplateSpecsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: TemplateSpecsCreateOrUpdateInput,
    outputSchema: TemplateSpecsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const TemplateSpecsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Resources/templateSpecs/{templateSpecName}",
    }),
  );
export type TemplateSpecsDeleteInput = typeof TemplateSpecsDeleteInput.Type;

// Output Schema
export const TemplateSpecsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type TemplateSpecsDeleteOutput = typeof TemplateSpecsDeleteOutput.Type;

// The operation
/**
 * Deletes a Template Spec by name. When operation completes, status code 200 returned without content.
 */
export const TemplateSpecsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TemplateSpecsDeleteInput,
  outputSchema: TemplateSpecsDeleteOutput,
}));
// Input Schema
export const TemplateSpecsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Resources/templateSpecs/{templateSpecName}",
  }),
);
export type TemplateSpecsGetInput = typeof TemplateSpecsGetInput.Type;

// Output Schema
export const TemplateSpecsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
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
  },
);
export type TemplateSpecsGetOutput = typeof TemplateSpecsGetOutput.Type;

// The operation
/**
 * Gets a Template Spec with a given name.
 */
export const TemplateSpecsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TemplateSpecsGetInput,
  outputSchema: TemplateSpecsGetOutput,
}));
// Input Schema
export const TemplateSpecsGetBuiltInInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Resources/builtInTemplateSpecs/{templateSpecName}",
    }),
  );
export type TemplateSpecsGetBuiltInInput =
  typeof TemplateSpecsGetBuiltInInput.Type;

// Output Schema
export const TemplateSpecsGetBuiltInOutput =
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
  });
export type TemplateSpecsGetBuiltInOutput =
  typeof TemplateSpecsGetBuiltInOutput.Type;

// The operation
/**
 * Gets a built-in Template Spec with a given name.
 */
export const TemplateSpecsGetBuiltIn = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: TemplateSpecsGetBuiltInInput,
    outputSchema: TemplateSpecsGetBuiltInOutput,
  }),
);
// Input Schema
export const TemplateSpecsListBuiltInsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Resources/builtInTemplateSpecs/",
    }),
  );
export type TemplateSpecsListBuiltInsInput =
  typeof TemplateSpecsListBuiltInsInput.Type;

// Output Schema
export const TemplateSpecsListBuiltInsOutput =
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
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type TemplateSpecsListBuiltInsOutput =
  typeof TemplateSpecsListBuiltInsOutput.Type;

// The operation
/**
 * Lists built-in Template Specs.
 */
export const TemplateSpecsListBuiltIns = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: TemplateSpecsListBuiltInsInput,
    outputSchema: TemplateSpecsListBuiltInsOutput,
  }),
);
// Input Schema
export const TemplateSpecsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Resources/templateSpecs/",
    }),
  );
export type TemplateSpecsListByResourceGroupInput =
  typeof TemplateSpecsListByResourceGroupInput.Type;

// Output Schema
export const TemplateSpecsListByResourceGroupOutput =
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
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type TemplateSpecsListByResourceGroupOutput =
  typeof TemplateSpecsListByResourceGroupOutput.Type;

// The operation
/**
 * Lists all the Template Specs within the specified resource group.
 */
export const TemplateSpecsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: TemplateSpecsListByResourceGroupInput,
    outputSchema: TemplateSpecsListByResourceGroupOutput,
  }));
// Input Schema
export const TemplateSpecsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Resources/templateSpecs/",
    }),
  );
export type TemplateSpecsListBySubscriptionInput =
  typeof TemplateSpecsListBySubscriptionInput.Type;

// Output Schema
export const TemplateSpecsListBySubscriptionOutput =
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
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type TemplateSpecsListBySubscriptionOutput =
  typeof TemplateSpecsListBySubscriptionOutput.Type;

// The operation
/**
 * Lists all the Template Specs within the specified subscriptions.
 */
export const TemplateSpecsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: TemplateSpecsListBySubscriptionInput,
    outputSchema: TemplateSpecsListBySubscriptionOutput,
  }));
// Input Schema
export const TemplateSpecsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Resources/templateSpecs/{templateSpecName}",
    }),
  );
export type TemplateSpecsUpdateInput = typeof TemplateSpecsUpdateInput.Type;

// Output Schema
export const TemplateSpecsUpdateOutput =
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
  });
export type TemplateSpecsUpdateOutput = typeof TemplateSpecsUpdateOutput.Type;

// The operation
/**
 * Updates Template Spec tags with specified values.
 */
export const TemplateSpecsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TemplateSpecsUpdateInput,
  outputSchema: TemplateSpecsUpdateOutput,
}));
// Input Schema
export const TemplateSpecVersionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Resources/templateSpecs/{templateSpecName}/versions/{templateSpecVersion}",
    }),
  );
export type TemplateSpecVersionsCreateOrUpdateInput =
  typeof TemplateSpecVersionsCreateOrUpdateInput.Type;

// Output Schema
export const TemplateSpecVersionsCreateOrUpdateOutput =
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
  });
export type TemplateSpecVersionsCreateOrUpdateOutput =
  typeof TemplateSpecVersionsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a Template Spec version.
 */
export const TemplateSpecVersionsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: TemplateSpecVersionsCreateOrUpdateInput,
    outputSchema: TemplateSpecVersionsCreateOrUpdateOutput,
  }));
// Input Schema
export const TemplateSpecVersionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Resources/templateSpecs/{templateSpecName}/versions/{templateSpecVersion}",
    }),
  );
export type TemplateSpecVersionsDeleteInput =
  typeof TemplateSpecVersionsDeleteInput.Type;

// Output Schema
export const TemplateSpecVersionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type TemplateSpecVersionsDeleteOutput =
  typeof TemplateSpecVersionsDeleteOutput.Type;

// The operation
/**
 * Deletes a specific version from a Template Spec. When operation completes, status code 200 returned without content.
 */
export const TemplateSpecVersionsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: TemplateSpecVersionsDeleteInput,
    outputSchema: TemplateSpecVersionsDeleteOutput,
  }),
);
// Input Schema
export const TemplateSpecVersionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Resources/templateSpecs/{templateSpecName}/versions/{templateSpecVersion}",
    }),
  );
export type TemplateSpecVersionsGetInput =
  typeof TemplateSpecVersionsGetInput.Type;

// Output Schema
export const TemplateSpecVersionsGetOutput =
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
  });
export type TemplateSpecVersionsGetOutput =
  typeof TemplateSpecVersionsGetOutput.Type;

// The operation
/**
 * Gets a Template Spec version from a specific Template Spec.
 */
export const TemplateSpecVersionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: TemplateSpecVersionsGetInput,
    outputSchema: TemplateSpecVersionsGetOutput,
  }),
);
// Input Schema
export const TemplateSpecVersionsGetBuiltInInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Resources/builtInTemplateSpecs/{templateSpecName}/versions/{templateSpecVersion}",
    }),
  );
export type TemplateSpecVersionsGetBuiltInInput =
  typeof TemplateSpecVersionsGetBuiltInInput.Type;

// Output Schema
export const TemplateSpecVersionsGetBuiltInOutput =
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
  });
export type TemplateSpecVersionsGetBuiltInOutput =
  typeof TemplateSpecVersionsGetBuiltInOutput.Type;

// The operation
/**
 * Gets a Template Spec version from a specific built-in Template Spec.
 */
export const TemplateSpecVersionsGetBuiltIn =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: TemplateSpecVersionsGetBuiltInInput,
    outputSchema: TemplateSpecVersionsGetBuiltInOutput,
  }));
// Input Schema
export const TemplateSpecVersionsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Resources/templateSpecs/{templateSpecName}/versions",
    }),
  );
export type TemplateSpecVersionsListInput =
  typeof TemplateSpecVersionsListInput.Type;

// Output Schema
export const TemplateSpecVersionsListOutput =
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
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type TemplateSpecVersionsListOutput =
  typeof TemplateSpecVersionsListOutput.Type;

// The operation
/**
 * Lists all the Template Spec versions in the specified Template Spec.
 */
export const TemplateSpecVersionsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: TemplateSpecVersionsListInput,
    outputSchema: TemplateSpecVersionsListOutput,
  }),
);
// Input Schema
export const TemplateSpecVersionsListBuiltInsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Resources/builtInTemplateSpecs/{templateSpecName}/versions",
    }),
  );
export type TemplateSpecVersionsListBuiltInsInput =
  typeof TemplateSpecVersionsListBuiltInsInput.Type;

// Output Schema
export const TemplateSpecVersionsListBuiltInsOutput =
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
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type TemplateSpecVersionsListBuiltInsOutput =
  typeof TemplateSpecVersionsListBuiltInsOutput.Type;

// The operation
/**
 * Lists all the Template Spec versions in the specified built-in Template Spec.
 */
export const TemplateSpecVersionsListBuiltIns =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: TemplateSpecVersionsListBuiltInsInput,
    outputSchema: TemplateSpecVersionsListBuiltInsOutput,
  }));
// Input Schema
export const TemplateSpecVersionsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Resources/templateSpecs/{templateSpecName}/versions/{templateSpecVersion}",
    }),
  );
export type TemplateSpecVersionsUpdateInput =
  typeof TemplateSpecVersionsUpdateInput.Type;

// Output Schema
export const TemplateSpecVersionsUpdateOutput =
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
  });
export type TemplateSpecVersionsUpdateOutput =
  typeof TemplateSpecVersionsUpdateOutput.Type;

// The operation
/**
 * Updates Template Spec Version tags with specified values.
 */
export const TemplateSpecVersionsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: TemplateSpecVersionsUpdateInput,
    outputSchema: TemplateSpecVersionsUpdateOutput,
  }),
);
// Input Schema
export const TenantsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  "api-version": Schema.String,
}).pipe(T.Http({ method: "GET", path: "/tenants" }));
export type TenantsListInput = typeof TenantsListInput.Type;

// Output Schema
export const TenantsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        tenantId: Schema.optional(Schema.String),
        tenantCategory: Schema.optional(
          Schema.Literals(["Home", "ProjectedBy", "ManagedBy"]),
        ),
        country: Schema.optional(Schema.String),
        countryCode: Schema.optional(Schema.String),
        displayName: Schema.optional(Schema.String),
        domains: Schema.optional(Schema.Array(Schema.String)),
        defaultDomain: Schema.optional(Schema.String),
        tenantType: Schema.optional(Schema.String),
        tenantBrandingLogoUrl: Schema.optional(Schema.String),
      }),
    ),
  ),
  nextLink: Schema.String,
});
export type TenantsListOutput = typeof TenantsListOutput.Type;

// The operation
/**
 * Gets the tenants for your account.
 *
 * @param api-version - The API version to use for this operation.
 */
export const TenantsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TenantsListInput,
  outputSchema: TenantsListOutput,
}));
