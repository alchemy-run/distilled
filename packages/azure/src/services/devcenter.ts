/**
 * Azure Devcenter API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const AttachedNetworksDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/attachednetworks/{attachedNetworkConnectionName}",
    }),
  );
export type AttachedNetworksDeleteInput =
  typeof AttachedNetworksDeleteInput.Type;

// Output Schema
export const AttachedNetworksDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AttachedNetworksDeleteOutput =
  typeof AttachedNetworksDeleteOutput.Type;

// The operation
/**
 * Un-attach a NetworkConnection.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const AttachedNetworksDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AttachedNetworksDeleteInput,
    outputSchema: AttachedNetworksDeleteOutput,
  }),
);
// Input Schema
export const CatalogsConnectInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/catalogs/{catalogName}/connect",
  }),
);
export type CatalogsConnectInput = typeof CatalogsConnectInput.Type;

// Output Schema
export const CatalogsConnectOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CatalogsConnectOutput = typeof CatalogsConnectOutput.Type;

// The operation
/**
 * Connects a catalog to enable syncing.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const CatalogsConnect = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CatalogsConnectInput,
  outputSchema: CatalogsConnectOutput,
}));
// Input Schema
export const CatalogsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/catalogs/{catalogName}",
  }),
);
export type CatalogsDeleteInput = typeof CatalogsDeleteInput.Type;

// Output Schema
export const CatalogsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CatalogsDeleteOutput = typeof CatalogsDeleteOutput.Type;

// The operation
/**
 * Deletes a catalog resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const CatalogsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CatalogsDeleteInput,
  outputSchema: CatalogsDeleteOutput,
}));
// Input Schema
export const CatalogsGetSyncErrorDetailsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/catalogs/{catalogName}/getSyncErrorDetails",
    }),
  );
export type CatalogsGetSyncErrorDetailsInput =
  typeof CatalogsGetSyncErrorDetailsInput.Type;

// Output Schema
export const CatalogsGetSyncErrorDetailsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    operationError: Schema.optional(
      Schema.Struct({
        code: Schema.optional(Schema.String),
        message: Schema.optional(Schema.String),
      }),
    ),
    conflicts: Schema.optional(
      Schema.Array(
        Schema.Struct({
          path: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
        }),
      ),
    ),
    errors: Schema.optional(
      Schema.Array(
        Schema.Struct({
          path: Schema.optional(Schema.String),
          errorDetails: Schema.optional(
            Schema.Array(
              Schema.Struct({
                code: Schema.optional(Schema.String),
                message: Schema.optional(Schema.String),
              }),
            ),
          ),
        }),
      ),
    ),
  });
export type CatalogsGetSyncErrorDetailsOutput =
  typeof CatalogsGetSyncErrorDetailsOutput.Type;

// The operation
/**
 * Gets catalog synchronization error details
 */
export const CatalogsGetSyncErrorDetails = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CatalogsGetSyncErrorDetailsInput,
    outputSchema: CatalogsGetSyncErrorDetailsOutput,
  }),
);
// Input Schema
export const CatalogsSyncInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/catalogs/{catalogName}/sync",
  }),
);
export type CatalogsSyncInput = typeof CatalogsSyncInput.Type;

// Output Schema
export const CatalogsSyncOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CatalogsSyncOutput = typeof CatalogsSyncOutput.Type;

// The operation
/**
 * Syncs templates for a template source.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const CatalogsSync = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CatalogsSyncInput,
  outputSchema: CatalogsSyncOutput,
}));
// Input Schema
export const CheckNameAvailabilityExecuteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DevCenter/checkNameAvailability",
    }),
  );
export type CheckNameAvailabilityExecuteInput =
  typeof CheckNameAvailabilityExecuteInput.Type;

// Output Schema
export const CheckNameAvailabilityExecuteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nameAvailable: Schema.optional(Schema.Boolean),
    reason: Schema.optional(Schema.Literals(["Invalid", "AlreadyExists"])),
    message: Schema.optional(Schema.String),
  });
export type CheckNameAvailabilityExecuteOutput =
  typeof CheckNameAvailabilityExecuteOutput.Type;

// The operation
/**
 * Check the availability of name for resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param name - The name of the resource for which availability needs to be checked.
 * @param type - The resource type.
 */
export const CheckNameAvailabilityExecute =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CheckNameAvailabilityExecuteInput,
    outputSchema: CheckNameAvailabilityExecuteOutput,
  }));
// Input Schema
export const CheckScopedNameAvailabilityExecuteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DevCenter/checkScopedNameAvailability",
    }),
  );
export type CheckScopedNameAvailabilityExecuteInput =
  typeof CheckScopedNameAvailabilityExecuteInput.Type;

// Output Schema
export const CheckScopedNameAvailabilityExecuteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nameAvailable: Schema.optional(Schema.Boolean),
    reason: Schema.optional(Schema.Literals(["Invalid", "AlreadyExists"])),
    message: Schema.optional(Schema.String),
  });
export type CheckScopedNameAvailabilityExecuteOutput =
  typeof CheckScopedNameAvailabilityExecuteOutput.Type;

// The operation
/**
 * Check the availability of name for resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const CheckScopedNameAvailabilityExecute =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CheckScopedNameAvailabilityExecuteInput,
    outputSchema: CheckScopedNameAvailabilityExecuteOutput,
  }));
// Input Schema
export const CustomizationTasksGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/catalogs/{catalogName}/tasks/{taskName}",
    }),
  );
export type CustomizationTasksGetInput = typeof CustomizationTasksGetInput.Type;

// Output Schema
export const CustomizationTasksGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type CustomizationTasksGetOutput =
  typeof CustomizationTasksGetOutput.Type;

// The operation
/**
 * Gets a Task from the catalog
 */
export const CustomizationTasksGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CustomizationTasksGetInput,
    outputSchema: CustomizationTasksGetOutput,
  }),
);
// Input Schema
export const CustomizationTasksGetErrorDetailsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/catalogs/{catalogName}/tasks/{taskName}/getErrorDetails",
    }),
  );
export type CustomizationTasksGetErrorDetailsInput =
  typeof CustomizationTasksGetErrorDetailsInput.Type;

// Output Schema
export const CustomizationTasksGetErrorDetailsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    errors: Schema.optional(
      Schema.Array(
        Schema.Struct({
          code: Schema.optional(Schema.String),
          message: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type CustomizationTasksGetErrorDetailsOutput =
  typeof CustomizationTasksGetErrorDetailsOutput.Type;

// The operation
/**
 * Gets Customization Task error details
 */
export const CustomizationTasksGetErrorDetails =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CustomizationTasksGetErrorDetailsInput,
    outputSchema: CustomizationTasksGetErrorDetailsOutput,
  }));
// Input Schema
export const CustomizationTasksListByCatalogInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/catalogs/{catalogName}/tasks",
    }),
  );
export type CustomizationTasksListByCatalogInput =
  typeof CustomizationTasksListByCatalogInput.Type;

// Output Schema
export const CustomizationTasksListByCatalogOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type CustomizationTasksListByCatalogOutput =
  typeof CustomizationTasksListByCatalogOutput.Type;

// The operation
/**
 * List Tasks in the catalog.
 */
export const CustomizationTasksListByCatalog =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CustomizationTasksListByCatalogInput,
    outputSchema: CustomizationTasksListByCatalogOutput,
  }));
// Input Schema
export const DevBoxDefinitionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/devboxdefinitions/{devBoxDefinitionName}",
    }),
  );
export type DevBoxDefinitionsCreateOrUpdateInput =
  typeof DevBoxDefinitionsCreateOrUpdateInput.Type;

// Output Schema
export const DevBoxDefinitionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type DevBoxDefinitionsCreateOrUpdateOutput =
  typeof DevBoxDefinitionsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a Dev Box definition.
 */
export const DevBoxDefinitionsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DevBoxDefinitionsCreateOrUpdateInput,
    outputSchema: DevBoxDefinitionsCreateOrUpdateOutput,
  }));
// Input Schema
export const DevBoxDefinitionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/devboxdefinitions/{devBoxDefinitionName}",
    }),
  );
export type DevBoxDefinitionsDeleteInput =
  typeof DevBoxDefinitionsDeleteInput.Type;

// Output Schema
export const DevBoxDefinitionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DevBoxDefinitionsDeleteOutput =
  typeof DevBoxDefinitionsDeleteOutput.Type;

// The operation
/**
 * Deletes a Dev Box definition
 */
export const DevBoxDefinitionsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DevBoxDefinitionsDeleteInput,
    outputSchema: DevBoxDefinitionsDeleteOutput,
  }),
);
// Input Schema
export const DevBoxDefinitionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/devboxdefinitions/{devBoxDefinitionName}",
    }),
  );
export type DevBoxDefinitionsGetInput = typeof DevBoxDefinitionsGetInput.Type;

// Output Schema
export const DevBoxDefinitionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type DevBoxDefinitionsGetOutput = typeof DevBoxDefinitionsGetOutput.Type;

// The operation
/**
 * Gets a Dev Box definition
 */
export const DevBoxDefinitionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DevBoxDefinitionsGetInput,
    outputSchema: DevBoxDefinitionsGetOutput,
  }),
);
// Input Schema
export const DevBoxDefinitionsGetByProjectInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/projects/{projectName}/devboxdefinitions/{devBoxDefinitionName}",
    }),
  );
export type DevBoxDefinitionsGetByProjectInput =
  typeof DevBoxDefinitionsGetByProjectInput.Type;

// Output Schema
export const DevBoxDefinitionsGetByProjectOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type DevBoxDefinitionsGetByProjectOutput =
  typeof DevBoxDefinitionsGetByProjectOutput.Type;

// The operation
/**
 * Gets a Dev Box definition configured for a project
 */
export const DevBoxDefinitionsGetByProject =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DevBoxDefinitionsGetByProjectInput,
    outputSchema: DevBoxDefinitionsGetByProjectOutput,
  }));
// Input Schema
export const DevBoxDefinitionsListByDevCenterInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/devboxdefinitions",
    }),
  );
export type DevBoxDefinitionsListByDevCenterInput =
  typeof DevBoxDefinitionsListByDevCenterInput.Type;

// Output Schema
export const DevBoxDefinitionsListByDevCenterOutput =
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
export type DevBoxDefinitionsListByDevCenterOutput =
  typeof DevBoxDefinitionsListByDevCenterOutput.Type;

// The operation
/**
 * List Dev Box definitions for a devcenter.
 */
export const DevBoxDefinitionsListByDevCenter =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DevBoxDefinitionsListByDevCenterInput,
    outputSchema: DevBoxDefinitionsListByDevCenterOutput,
  }));
// Input Schema
export const DevBoxDefinitionsListByProjectInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/projects/{projectName}/devboxdefinitions",
    }),
  );
export type DevBoxDefinitionsListByProjectInput =
  typeof DevBoxDefinitionsListByProjectInput.Type;

// Output Schema
export const DevBoxDefinitionsListByProjectOutput =
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
export type DevBoxDefinitionsListByProjectOutput =
  typeof DevBoxDefinitionsListByProjectOutput.Type;

// The operation
/**
 * List Dev Box definitions configured for a project.
 */
export const DevBoxDefinitionsListByProject =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DevBoxDefinitionsListByProjectInput,
    outputSchema: DevBoxDefinitionsListByProjectOutput,
  }));
// Input Schema
export const DevBoxDefinitionsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/devboxdefinitions/{devBoxDefinitionName}",
    }),
  );
export type DevBoxDefinitionsUpdateInput =
  typeof DevBoxDefinitionsUpdateInput.Type;

// Output Schema
export const DevBoxDefinitionsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type DevBoxDefinitionsUpdateOutput =
  typeof DevBoxDefinitionsUpdateOutput.Type;

// The operation
/**
 * Partially updates a Dev Box definition.
 */
export const DevBoxDefinitionsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DevBoxDefinitionsUpdateInput,
    outputSchema: DevBoxDefinitionsUpdateOutput,
  }),
);
// Input Schema
export const DevCentersCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}",
    }),
  );
export type DevCentersCreateOrUpdateInput =
  typeof DevCentersCreateOrUpdateInput.Type;

// Output Schema
export const DevCentersCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type DevCentersCreateOrUpdateOutput =
  typeof DevCentersCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a devcenter resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const DevCentersCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DevCentersCreateOrUpdateInput,
    outputSchema: DevCentersCreateOrUpdateOutput,
  }),
);
// Input Schema
export const DevCentersDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}",
  }),
);
export type DevCentersDeleteInput = typeof DevCentersDeleteInput.Type;

// Output Schema
export const DevCentersDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DevCentersDeleteOutput = typeof DevCentersDeleteOutput.Type;

// The operation
/**
 * Deletes a devcenter
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const DevCentersDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DevCentersDeleteInput,
  outputSchema: DevCentersDeleteOutput,
}));
// Input Schema
export const DevCentersGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}",
  }),
);
export type DevCentersGetInput = typeof DevCentersGetInput.Type;

// Output Schema
export const DevCentersGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type DevCentersGetOutput = typeof DevCentersGetOutput.Type;

// The operation
/**
 * Gets a devcenter.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const DevCentersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DevCentersGetInput,
  outputSchema: DevCentersGetOutput,
}));
// Input Schema
export const DevCentersListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $top: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters",
    }),
  );
export type DevCentersListByResourceGroupInput =
  typeof DevCentersListByResourceGroupInput.Type;

// Output Schema
export const DevCentersListByResourceGroupOutput =
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
export type DevCentersListByResourceGroupOutput =
  typeof DevCentersListByResourceGroupOutput.Type;

// The operation
/**
 * Lists all devcenters in a resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param $top - The maximum number of resources to return from the operation. Example: '$top=10'.
 */
export const DevCentersListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DevCentersListByResourceGroupInput,
    outputSchema: DevCentersListByResourceGroupOutput,
  }));
// Input Schema
export const DevCentersListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $top: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DevCenter/devcenters",
    }),
  );
export type DevCentersListBySubscriptionInput =
  typeof DevCentersListBySubscriptionInput.Type;

// Output Schema
export const DevCentersListBySubscriptionOutput =
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
export type DevCentersListBySubscriptionOutput =
  typeof DevCentersListBySubscriptionOutput.Type;

// The operation
/**
 * Lists all devcenters in a subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param $top - The maximum number of resources to return from the operation. Example: '$top=10'.
 */
export const DevCentersListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DevCentersListBySubscriptionInput,
    outputSchema: DevCentersListBySubscriptionOutput,
  }));
// Input Schema
export const DevCentersUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}",
  }),
);
export type DevCentersUpdateInput = typeof DevCentersUpdateInput.Type;

// Output Schema
export const DevCentersUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  },
);
export type DevCentersUpdateOutput = typeof DevCentersUpdateOutput.Type;

// The operation
/**
 * Partially updates a devcenter.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const DevCentersUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DevCentersUpdateInput,
  outputSchema: DevCentersUpdateOutput,
}));
// Input Schema
export const EnvironmentDefinitionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/catalogs/{catalogName}/environmentDefinitions/{environmentDefinitionName}",
    }),
  );
export type EnvironmentDefinitionsGetInput =
  typeof EnvironmentDefinitionsGetInput.Type;

// Output Schema
export const EnvironmentDefinitionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type EnvironmentDefinitionsGetOutput =
  typeof EnvironmentDefinitionsGetOutput.Type;

// The operation
/**
 * Gets an environment definition from the catalog.
 */
export const EnvironmentDefinitionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: EnvironmentDefinitionsGetInput,
    outputSchema: EnvironmentDefinitionsGetOutput,
  }),
);
// Input Schema
export const EnvironmentDefinitionsGetByProjectCatalogInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/projects/{projectName}/catalogs/{catalogName}/environmentDefinitions/{environmentDefinitionName}",
    }),
  );
export type EnvironmentDefinitionsGetByProjectCatalogInput =
  typeof EnvironmentDefinitionsGetByProjectCatalogInput.Type;

// Output Schema
export const EnvironmentDefinitionsGetByProjectCatalogOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type EnvironmentDefinitionsGetByProjectCatalogOutput =
  typeof EnvironmentDefinitionsGetByProjectCatalogOutput.Type;

// The operation
/**
 * Gets an environment definition from the catalog.
 */
export const EnvironmentDefinitionsGetByProjectCatalog =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: EnvironmentDefinitionsGetByProjectCatalogInput,
    outputSchema: EnvironmentDefinitionsGetByProjectCatalogOutput,
  }));
// Input Schema
export const EnvironmentDefinitionsGetErrorDetailsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/catalogs/{catalogName}/environmentDefinitions/{environmentDefinitionName}/getErrorDetails",
    }),
  );
export type EnvironmentDefinitionsGetErrorDetailsInput =
  typeof EnvironmentDefinitionsGetErrorDetailsInput.Type;

// Output Schema
export const EnvironmentDefinitionsGetErrorDetailsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    errors: Schema.optional(
      Schema.Array(
        Schema.Struct({
          code: Schema.optional(Schema.String),
          message: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type EnvironmentDefinitionsGetErrorDetailsOutput =
  typeof EnvironmentDefinitionsGetErrorDetailsOutput.Type;

// The operation
/**
 * Gets Environment Definition error details
 */
export const EnvironmentDefinitionsGetErrorDetails =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: EnvironmentDefinitionsGetErrorDetailsInput,
    outputSchema: EnvironmentDefinitionsGetErrorDetailsOutput,
  }));
// Input Schema
export const EnvironmentDefinitionsListByCatalogInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $top: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/catalogs/{catalogName}/environmentDefinitions",
    }),
  );
export type EnvironmentDefinitionsListByCatalogInput =
  typeof EnvironmentDefinitionsListByCatalogInput.Type;

// Output Schema
export const EnvironmentDefinitionsListByCatalogOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type EnvironmentDefinitionsListByCatalogOutput =
  typeof EnvironmentDefinitionsListByCatalogOutput.Type;

// The operation
/**
 * List environment definitions in the catalog.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param $top - The maximum number of resources to return from the operation. Example: '$top=10'.
 */
export const EnvironmentDefinitionsListByCatalog =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: EnvironmentDefinitionsListByCatalogInput,
    outputSchema: EnvironmentDefinitionsListByCatalogOutput,
  }));
// Input Schema
export const EnvironmentDefinitionsListByProjectCatalogInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/projects/{projectName}/catalogs/{catalogName}/environmentDefinitions",
    }),
  );
export type EnvironmentDefinitionsListByProjectCatalogInput =
  typeof EnvironmentDefinitionsListByProjectCatalogInput.Type;

// Output Schema
export const EnvironmentDefinitionsListByProjectCatalogOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type EnvironmentDefinitionsListByProjectCatalogOutput =
  typeof EnvironmentDefinitionsListByProjectCatalogOutput.Type;

// The operation
/**
 * Lists the environment definitions in this project catalog.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const EnvironmentDefinitionsListByProjectCatalog =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: EnvironmentDefinitionsListByProjectCatalogInput,
    outputSchema: EnvironmentDefinitionsListByProjectCatalogOutput,
  }));
// Input Schema
export const EnvironmentTypesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/environmentTypes/{environmentTypeName}",
    }),
  );
export type EnvironmentTypesDeleteInput =
  typeof EnvironmentTypesDeleteInput.Type;

// Output Schema
export const EnvironmentTypesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type EnvironmentTypesDeleteOutput =
  typeof EnvironmentTypesDeleteOutput.Type;

// The operation
/**
 * Deletes an environment type.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const EnvironmentTypesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: EnvironmentTypesDeleteInput,
    outputSchema: EnvironmentTypesDeleteOutput,
  }),
);
// Input Schema
export const GalleriesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/galleries/{galleryName}",
  }),
);
export type GalleriesDeleteInput = typeof GalleriesDeleteInput.Type;

// Output Schema
export const GalleriesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type GalleriesDeleteOutput = typeof GalleriesDeleteOutput.Type;

// The operation
/**
 * Deletes a gallery resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const GalleriesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GalleriesDeleteInput,
  outputSchema: GalleriesDeleteOutput,
}));
// Input Schema
export const ImagesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/galleries/{galleryName}/images/{imageName}",
  }),
);
export type ImagesGetInput = typeof ImagesGetInput.Type;

// Output Schema
export const ImagesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ImagesGetOutput = typeof ImagesGetOutput.Type;

// The operation
/**
 * Gets a gallery image.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ImagesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ImagesGetInput,
  outputSchema: ImagesGetOutput,
}));
// Input Schema
export const ImagesGetByProjectInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/projects/{projectName}/images/{imageName}",
    }),
  );
export type ImagesGetByProjectInput = typeof ImagesGetByProjectInput.Type;

// Output Schema
export const ImagesGetByProjectOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ImagesGetByProjectOutput = typeof ImagesGetByProjectOutput.Type;

// The operation
/**
 * Gets an image.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - The name of the project.
 */
export const ImagesGetByProject = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ImagesGetByProjectInput,
  outputSchema: ImagesGetByProjectOutput,
}));
// Input Schema
export const ImagesListByDevCenterInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $top: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/images",
    }),
  );
export type ImagesListByDevCenterInput = typeof ImagesListByDevCenterInput.Type;

// Output Schema
export const ImagesListByDevCenterOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ImagesListByDevCenterOutput =
  typeof ImagesListByDevCenterOutput.Type;

// The operation
/**
 * Lists images for a devcenter.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param $top - The maximum number of resources to return from the operation. Example: '$top=10'.
 */
export const ImagesListByDevCenter = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ImagesListByDevCenterInput,
    outputSchema: ImagesListByDevCenterOutput,
  }),
);
// Input Schema
export const ImagesListByGalleryInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $top: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/galleries/{galleryName}/images",
    }),
  );
export type ImagesListByGalleryInput = typeof ImagesListByGalleryInput.Type;

// Output Schema
export const ImagesListByGalleryOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ImagesListByGalleryOutput = typeof ImagesListByGalleryOutput.Type;

// The operation
/**
 * Lists images for a gallery.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param $top - The maximum number of resources to return from the operation. Example: '$top=10'.
 */
export const ImagesListByGallery = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ImagesListByGalleryInput,
  outputSchema: ImagesListByGalleryOutput,
}));
// Input Schema
export const ImagesListByProjectInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/projects/{projectName}/images",
    }),
  );
export type ImagesListByProjectInput = typeof ImagesListByProjectInput.Type;

// Output Schema
export const ImagesListByProjectOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ImagesListByProjectOutput = typeof ImagesListByProjectOutput.Type;

// The operation
/**
 * Lists images for a project.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - The name of the project.
 */
export const ImagesListByProject = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ImagesListByProjectInput,
  outputSchema: ImagesListByProjectOutput,
}));
// Input Schema
export const ImageVersionsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/galleries/{galleryName}/images/{imageName}/versions/{versionName}",
  }),
);
export type ImageVersionsGetInput = typeof ImageVersionsGetInput.Type;

// Output Schema
export const ImageVersionsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type ImageVersionsGetOutput = typeof ImageVersionsGetOutput.Type;

// The operation
/**
 * Gets an image version.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ImageVersionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ImageVersionsGetInput,
  outputSchema: ImageVersionsGetOutput,
}));
// Input Schema
export const ImageVersionsGetByProjectInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/projects/{projectName}/images/{imageName}/versions/{versionName}",
    }),
  );
export type ImageVersionsGetByProjectInput =
  typeof ImageVersionsGetByProjectInput.Type;

// Output Schema
export const ImageVersionsGetByProjectOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ImageVersionsGetByProjectOutput =
  typeof ImageVersionsGetByProjectOutput.Type;

// The operation
/**
 * Gets an image version.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - The name of the project.
 */
export const ImageVersionsGetByProject = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ImageVersionsGetByProjectInput,
    outputSchema: ImageVersionsGetByProjectOutput,
  }),
);
// Input Schema
export const ImageVersionsListByImageInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/galleries/{galleryName}/images/{imageName}/versions",
    }),
  );
export type ImageVersionsListByImageInput =
  typeof ImageVersionsListByImageInput.Type;

// Output Schema
export const ImageVersionsListByImageOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ImageVersionsListByImageOutput =
  typeof ImageVersionsListByImageOutput.Type;

// The operation
/**
 * Lists versions for an image.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ImageVersionsListByImage = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ImageVersionsListByImageInput,
    outputSchema: ImageVersionsListByImageOutput,
  }),
);
// Input Schema
export const ImageVersionsListByProjectInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/projects/{projectName}/images/{imageName}/versions",
    }),
  );
export type ImageVersionsListByProjectInput =
  typeof ImageVersionsListByProjectInput.Type;

// Output Schema
export const ImageVersionsListByProjectOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ImageVersionsListByProjectOutput =
  typeof ImageVersionsListByProjectOutput.Type;

// The operation
/**
 * Lists versions for an image.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - The name of the project.
 */
export const ImageVersionsListByProject = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ImageVersionsListByProjectInput,
    outputSchema: ImageVersionsListByProjectOutput,
  }),
);
// Input Schema
export const NetworkConnectionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/networkConnections/{networkConnectionName}",
    }),
  );
export type NetworkConnectionsCreateOrUpdateInput =
  typeof NetworkConnectionsCreateOrUpdateInput.Type;

// Output Schema
export const NetworkConnectionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type NetworkConnectionsCreateOrUpdateOutput =
  typeof NetworkConnectionsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a Network Connections resource
 */
export const NetworkConnectionsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkConnectionsCreateOrUpdateInput,
    outputSchema: NetworkConnectionsCreateOrUpdateOutput,
  }));
// Input Schema
export const NetworkConnectionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/networkConnections/{networkConnectionName}",
    }),
  );
export type NetworkConnectionsDeleteInput =
  typeof NetworkConnectionsDeleteInput.Type;

// Output Schema
export const NetworkConnectionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type NetworkConnectionsDeleteOutput =
  typeof NetworkConnectionsDeleteOutput.Type;

// The operation
/**
 * Deletes a Network Connections resource
 */
export const NetworkConnectionsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: NetworkConnectionsDeleteInput,
    outputSchema: NetworkConnectionsDeleteOutput,
  }),
);
// Input Schema
export const NetworkConnectionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/networkConnections/{networkConnectionName}",
    }),
  );
export type NetworkConnectionsGetInput = typeof NetworkConnectionsGetInput.Type;

// Output Schema
export const NetworkConnectionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type NetworkConnectionsGetOutput =
  typeof NetworkConnectionsGetOutput.Type;

// The operation
/**
 * Gets a network connection resource
 */
export const NetworkConnectionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: NetworkConnectionsGetInput,
    outputSchema: NetworkConnectionsGetOutput,
  }),
);
// Input Schema
export const NetworkConnectionsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/networkConnections",
    }),
  );
export type NetworkConnectionsListByResourceGroupInput =
  typeof NetworkConnectionsListByResourceGroupInput.Type;

// Output Schema
export const NetworkConnectionsListByResourceGroupOutput =
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
export type NetworkConnectionsListByResourceGroupOutput =
  typeof NetworkConnectionsListByResourceGroupOutput.Type;

// The operation
/**
 * Lists network connections in a resource group
 */
export const NetworkConnectionsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkConnectionsListByResourceGroupInput,
    outputSchema: NetworkConnectionsListByResourceGroupOutput,
  }));
// Input Schema
export const NetworkConnectionsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DevCenter/networkConnections",
    }),
  );
export type NetworkConnectionsListBySubscriptionInput =
  typeof NetworkConnectionsListBySubscriptionInput.Type;

// Output Schema
export const NetworkConnectionsListBySubscriptionOutput =
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
export type NetworkConnectionsListBySubscriptionOutput =
  typeof NetworkConnectionsListBySubscriptionOutput.Type;

// The operation
/**
 * Lists network connections in a subscription
 */
export const NetworkConnectionsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkConnectionsListBySubscriptionInput,
    outputSchema: NetworkConnectionsListBySubscriptionOutput,
  }));
// Input Schema
export const NetworkConnectionsListOutboundNetworkDependenciesEndpointsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/networkConnections/{networkConnectionName}/outboundNetworkDependenciesEndpoints",
    }),
  );
export type NetworkConnectionsListOutboundNetworkDependenciesEndpointsInput =
  typeof NetworkConnectionsListOutboundNetworkDependenciesEndpointsInput.Type;

// Output Schema
export const NetworkConnectionsListOutboundNetworkDependenciesEndpointsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          category: Schema.optional(Schema.String),
          endpoints: Schema.optional(
            Schema.Array(
              Schema.Struct({
                domainName: Schema.optional(Schema.String),
                description: Schema.optional(Schema.String),
                endpointDetails: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      port: Schema.optional(Schema.Number),
                    }),
                  ),
                ),
              }),
            ),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type NetworkConnectionsListOutboundNetworkDependenciesEndpointsOutput =
  typeof NetworkConnectionsListOutboundNetworkDependenciesEndpointsOutput.Type;

// The operation
/**
 * Lists the endpoints that agents may call as part of Dev Box service administration. These FQDNs should be allowed for outbound access in order for the Dev Box service to function.
 */
export const NetworkConnectionsListOutboundNetworkDependenciesEndpoints =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      NetworkConnectionsListOutboundNetworkDependenciesEndpointsInput,
    outputSchema:
      NetworkConnectionsListOutboundNetworkDependenciesEndpointsOutput,
  }));
// Input Schema
export const NetworkConnectionsRunHealthChecksInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/networkConnections/{networkConnectionName}/runHealthChecks",
    }),
  );
export type NetworkConnectionsRunHealthChecksInput =
  typeof NetworkConnectionsRunHealthChecksInput.Type;

// Output Schema
export const NetworkConnectionsRunHealthChecksOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type NetworkConnectionsRunHealthChecksOutput =
  typeof NetworkConnectionsRunHealthChecksOutput.Type;

// The operation
/**
 * Triggers a new health check run. The execution and health check result can be tracked via the network Connection health check details
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const NetworkConnectionsRunHealthChecks =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkConnectionsRunHealthChecksInput,
    outputSchema: NetworkConnectionsRunHealthChecksOutput,
  }));
// Input Schema
export const NetworkConnectionsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/networkConnections/{networkConnectionName}",
    }),
  );
export type NetworkConnectionsUpdateInput =
  typeof NetworkConnectionsUpdateInput.Type;

// Output Schema
export const NetworkConnectionsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type NetworkConnectionsUpdateOutput =
  typeof NetworkConnectionsUpdateOutput.Type;

// The operation
/**
 * Partially updates a Network Connection
 */
export const NetworkConnectionsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: NetworkConnectionsUpdateInput,
    outputSchema: NetworkConnectionsUpdateOutput,
  }),
);
// Input Schema
export const PoolsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/projects/{projectName}/pools/{poolName}",
    }),
  );
export type PoolsCreateOrUpdateInput = typeof PoolsCreateOrUpdateInput.Type;

// Output Schema
export const PoolsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type PoolsCreateOrUpdateOutput = typeof PoolsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a machine pool
 */
export const PoolsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PoolsCreateOrUpdateInput,
  outputSchema: PoolsCreateOrUpdateOutput,
}));
// Input Schema
export const PoolsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/projects/{projectName}/pools/{poolName}",
  }),
);
export type PoolsDeleteInput = typeof PoolsDeleteInput.Type;

// Output Schema
export const PoolsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PoolsDeleteOutput = typeof PoolsDeleteOutput.Type;

// The operation
/**
 * Deletes a machine pool
 */
export const PoolsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PoolsDeleteInput,
  outputSchema: PoolsDeleteOutput,
}));
// Input Schema
export const PoolsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/projects/{projectName}/pools/{poolName}",
  }),
);
export type PoolsGetInput = typeof PoolsGetInput.Type;

// Output Schema
export const PoolsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type PoolsGetOutput = typeof PoolsGetOutput.Type;

// The operation
/**
 * Gets a machine pool
 */
export const PoolsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PoolsGetInput,
  outputSchema: PoolsGetOutput,
}));
// Input Schema
export const PoolsListByProjectInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/projects/{projectName}/pools",
    }),
  );
export type PoolsListByProjectInput = typeof PoolsListByProjectInput.Type;

// Output Schema
export const PoolsListByProjectOutput =
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
export type PoolsListByProjectOutput = typeof PoolsListByProjectOutput.Type;

// The operation
/**
 * Lists pools for a project
 */
export const PoolsListByProject = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PoolsListByProjectInput,
  outputSchema: PoolsListByProjectOutput,
}));
// Input Schema
export const PoolsRunHealthChecksInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/projects/{projectName}/pools/{poolName}/runHealthChecks",
    }),
  );
export type PoolsRunHealthChecksInput = typeof PoolsRunHealthChecksInput.Type;

// Output Schema
export const PoolsRunHealthChecksOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PoolsRunHealthChecksOutput = typeof PoolsRunHealthChecksOutput.Type;

// The operation
/**
 * Triggers a refresh of the pool status.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - The name of the project.
 */
export const PoolsRunHealthChecks = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PoolsRunHealthChecksInput,
    outputSchema: PoolsRunHealthChecksOutput,
  }),
);
// Input Schema
export const PoolsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/projects/{projectName}/pools/{poolName}",
  }),
);
export type PoolsUpdateInput = typeof PoolsUpdateInput.Type;

// Output Schema
export const PoolsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type PoolsUpdateOutput = typeof PoolsUpdateOutput.Type;

// The operation
/**
 * Partially updates a machine pool
 */
export const PoolsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PoolsUpdateInput,
  outputSchema: PoolsUpdateOutput,
}));
// Input Schema
export const ProjectCatalogEnvironmentDefinitionsGetErrorDetailsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/projects/{projectName}/catalogs/{catalogName}/environmentDefinitions/{environmentDefinitionName}/getErrorDetails",
    }),
  );
export type ProjectCatalogEnvironmentDefinitionsGetErrorDetailsInput =
  typeof ProjectCatalogEnvironmentDefinitionsGetErrorDetailsInput.Type;

// Output Schema
export const ProjectCatalogEnvironmentDefinitionsGetErrorDetailsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    errors: Schema.optional(
      Schema.Array(
        Schema.Struct({
          code: Schema.optional(Schema.String),
          message: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type ProjectCatalogEnvironmentDefinitionsGetErrorDetailsOutput =
  typeof ProjectCatalogEnvironmentDefinitionsGetErrorDetailsOutput.Type;

// The operation
/**
 * Gets Environment Definition error details
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ProjectCatalogEnvironmentDefinitionsGetErrorDetails =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ProjectCatalogEnvironmentDefinitionsGetErrorDetailsInput,
    outputSchema: ProjectCatalogEnvironmentDefinitionsGetErrorDetailsOutput,
  }));
// Input Schema
export const ProjectCatalogImageDefinitionBuildCancelInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/projects/{projectName}/catalogs/{catalogName}/imageDefinitions/{imageDefinitionName}/builds/{buildName}/cancel",
    }),
  );
export type ProjectCatalogImageDefinitionBuildCancelInput =
  typeof ProjectCatalogImageDefinitionBuildCancelInput.Type;

// Output Schema
export const ProjectCatalogImageDefinitionBuildCancelOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ProjectCatalogImageDefinitionBuildCancelOutput =
  typeof ProjectCatalogImageDefinitionBuildCancelOutput.Type;

// The operation
/**
 * Cancels the specified build for an image definition.
 */
export const ProjectCatalogImageDefinitionBuildCancel =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ProjectCatalogImageDefinitionBuildCancelInput,
    outputSchema: ProjectCatalogImageDefinitionBuildCancelOutput,
  }));
// Input Schema
export const ProjectCatalogImageDefinitionBuildGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/projects/{projectName}/catalogs/{catalogName}/imageDefinitions/{imageDefinitionName}/builds/{buildName}",
    }),
  );
export type ProjectCatalogImageDefinitionBuildGetInput =
  typeof ProjectCatalogImageDefinitionBuildGetInput.Type;

// Output Schema
export const ProjectCatalogImageDefinitionBuildGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ProjectCatalogImageDefinitionBuildGetOutput =
  typeof ProjectCatalogImageDefinitionBuildGetOutput.Type;

// The operation
/**
 * Gets a build for a specified image definition.
 */
export const ProjectCatalogImageDefinitionBuildGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ProjectCatalogImageDefinitionBuildGetInput,
    outputSchema: ProjectCatalogImageDefinitionBuildGetOutput,
  }));
// Input Schema
export const ProjectCatalogImageDefinitionBuildGetBuildDetailsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/projects/{projectName}/catalogs/{catalogName}/imageDefinitions/{imageDefinitionName}/builds/{buildName}/getBuildDetails",
    }),
  );
export type ProjectCatalogImageDefinitionBuildGetBuildDetailsInput =
  typeof ProjectCatalogImageDefinitionBuildGetBuildDetailsInput.Type;

// Output Schema
export const ProjectCatalogImageDefinitionBuildGetBuildDetailsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ProjectCatalogImageDefinitionBuildGetBuildDetailsOutput =
  typeof ProjectCatalogImageDefinitionBuildGetBuildDetailsOutput.Type;

// The operation
/**
 * Gets Build details
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ProjectCatalogImageDefinitionBuildGetBuildDetails =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ProjectCatalogImageDefinitionBuildGetBuildDetailsInput,
    outputSchema: ProjectCatalogImageDefinitionBuildGetBuildDetailsOutput,
  }));
// Input Schema
export const ProjectCatalogImageDefinitionBuildsListByImageDefinitionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/projects/{projectName}/catalogs/{catalogName}/imageDefinitions/{imageDefinitionName}/builds",
    }),
  );
export type ProjectCatalogImageDefinitionBuildsListByImageDefinitionInput =
  typeof ProjectCatalogImageDefinitionBuildsListByImageDefinitionInput.Type;

// Output Schema
export const ProjectCatalogImageDefinitionBuildsListByImageDefinitionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ProjectCatalogImageDefinitionBuildsListByImageDefinitionOutput =
  typeof ProjectCatalogImageDefinitionBuildsListByImageDefinitionOutput.Type;

// The operation
/**
 * Lists builds for a specified image definition.
 */
export const ProjectCatalogImageDefinitionBuildsListByImageDefinition =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ProjectCatalogImageDefinitionBuildsListByImageDefinitionInput,
    outputSchema:
      ProjectCatalogImageDefinitionBuildsListByImageDefinitionOutput,
  }));
// Input Schema
export const ProjectCatalogImageDefinitionsBuildImageInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/projects/{projectName}/catalogs/{catalogName}/imageDefinitions/{imageDefinitionName}/buildImage",
    }),
  );
export type ProjectCatalogImageDefinitionsBuildImageInput =
  typeof ProjectCatalogImageDefinitionsBuildImageInput.Type;

// Output Schema
export const ProjectCatalogImageDefinitionsBuildImageOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ProjectCatalogImageDefinitionsBuildImageOutput =
  typeof ProjectCatalogImageDefinitionsBuildImageOutput.Type;

// The operation
/**
 * Builds an image for the specified Image Definition.
 */
export const ProjectCatalogImageDefinitionsBuildImage =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ProjectCatalogImageDefinitionsBuildImageInput,
    outputSchema: ProjectCatalogImageDefinitionsBuildImageOutput,
  }));
// Input Schema
export const ProjectCatalogImageDefinitionsGetByProjectCatalogInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/projects/{projectName}/catalogs/{catalogName}/imageDefinitions/{imageDefinitionName}",
    }),
  );
export type ProjectCatalogImageDefinitionsGetByProjectCatalogInput =
  typeof ProjectCatalogImageDefinitionsGetByProjectCatalogInput.Type;

// Output Schema
export const ProjectCatalogImageDefinitionsGetByProjectCatalogOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ProjectCatalogImageDefinitionsGetByProjectCatalogOutput =
  typeof ProjectCatalogImageDefinitionsGetByProjectCatalogOutput.Type;

// The operation
/**
 * Gets an Image Definition from the catalog
 */
export const ProjectCatalogImageDefinitionsGetByProjectCatalog =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ProjectCatalogImageDefinitionsGetByProjectCatalogInput,
    outputSchema: ProjectCatalogImageDefinitionsGetByProjectCatalogOutput,
  }));
// Input Schema
export const ProjectCatalogImageDefinitionsGetErrorDetailsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/projects/{projectName}/catalogs/{catalogName}/imageDefinitions/{imageDefinitionName}/getErrorDetails",
    }),
  );
export type ProjectCatalogImageDefinitionsGetErrorDetailsInput =
  typeof ProjectCatalogImageDefinitionsGetErrorDetailsInput.Type;

// Output Schema
export const ProjectCatalogImageDefinitionsGetErrorDetailsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    errors: Schema.optional(
      Schema.Array(
        Schema.Struct({
          code: Schema.optional(Schema.String),
          message: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type ProjectCatalogImageDefinitionsGetErrorDetailsOutput =
  typeof ProjectCatalogImageDefinitionsGetErrorDetailsOutput.Type;

// The operation
/**
 * Gets Image Definition error details
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ProjectCatalogImageDefinitionsGetErrorDetails =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ProjectCatalogImageDefinitionsGetErrorDetailsInput,
    outputSchema: ProjectCatalogImageDefinitionsGetErrorDetailsOutput,
  }));
// Input Schema
export const ProjectCatalogImageDefinitionsListByProjectCatalogInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/projects/{projectName}/catalogs/{catalogName}/imageDefinitions",
    }),
  );
export type ProjectCatalogImageDefinitionsListByProjectCatalogInput =
  typeof ProjectCatalogImageDefinitionsListByProjectCatalogInput.Type;

// Output Schema
export const ProjectCatalogImageDefinitionsListByProjectCatalogOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ProjectCatalogImageDefinitionsListByProjectCatalogOutput =
  typeof ProjectCatalogImageDefinitionsListByProjectCatalogOutput.Type;

// The operation
/**
 * List Image Definitions in the catalog.
 */
export const ProjectCatalogImageDefinitionsListByProjectCatalog =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ProjectCatalogImageDefinitionsListByProjectCatalogInput,
    outputSchema: ProjectCatalogImageDefinitionsListByProjectCatalogOutput,
  }));
// Input Schema
export const ProjectCatalogsConnectInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/projects/{projectName}/catalogs/{catalogName}/connect",
    }),
  );
export type ProjectCatalogsConnectInput =
  typeof ProjectCatalogsConnectInput.Type;

// Output Schema
export const ProjectCatalogsConnectOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ProjectCatalogsConnectOutput =
  typeof ProjectCatalogsConnectOutput.Type;

// The operation
/**
 * Connects a project catalog to enable syncing.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ProjectCatalogsConnect = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ProjectCatalogsConnectInput,
    outputSchema: ProjectCatalogsConnectOutput,
  }),
);
// Input Schema
export const ProjectCatalogsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/projects/{projectName}/catalogs/{catalogName}",
    }),
  );
export type ProjectCatalogsDeleteInput = typeof ProjectCatalogsDeleteInput.Type;

// Output Schema
export const ProjectCatalogsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ProjectCatalogsDeleteOutput =
  typeof ProjectCatalogsDeleteOutput.Type;

// The operation
/**
 * Deletes a project catalog resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ProjectCatalogsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ProjectCatalogsDeleteInput,
    outputSchema: ProjectCatalogsDeleteOutput,
  }),
);
// Input Schema
export const ProjectCatalogsGetSyncErrorDetailsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/projects/{projectName}/catalogs/{catalogName}/getSyncErrorDetails",
    }),
  );
export type ProjectCatalogsGetSyncErrorDetailsInput =
  typeof ProjectCatalogsGetSyncErrorDetailsInput.Type;

// Output Schema
export const ProjectCatalogsGetSyncErrorDetailsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    operationError: Schema.optional(
      Schema.Struct({
        code: Schema.optional(Schema.String),
        message: Schema.optional(Schema.String),
      }),
    ),
    conflicts: Schema.optional(
      Schema.Array(
        Schema.Struct({
          path: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
        }),
      ),
    ),
    errors: Schema.optional(
      Schema.Array(
        Schema.Struct({
          path: Schema.optional(Schema.String),
          errorDetails: Schema.optional(
            Schema.Array(
              Schema.Struct({
                code: Schema.optional(Schema.String),
                message: Schema.optional(Schema.String),
              }),
            ),
          ),
        }),
      ),
    ),
  });
export type ProjectCatalogsGetSyncErrorDetailsOutput =
  typeof ProjectCatalogsGetSyncErrorDetailsOutput.Type;

// The operation
/**
 * Gets project catalog synchronization error details
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ProjectCatalogsGetSyncErrorDetails =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ProjectCatalogsGetSyncErrorDetailsInput,
    outputSchema: ProjectCatalogsGetSyncErrorDetailsOutput,
  }));
// Input Schema
export const ProjectCatalogsSyncInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/projects/{projectName}/catalogs/{catalogName}/sync",
    }),
  );
export type ProjectCatalogsSyncInput = typeof ProjectCatalogsSyncInput.Type;

// Output Schema
export const ProjectCatalogsSyncOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ProjectCatalogsSyncOutput = typeof ProjectCatalogsSyncOutput.Type;

// The operation
/**
 * Syncs templates for a template source.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ProjectCatalogsSync = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ProjectCatalogsSyncInput,
  outputSchema: ProjectCatalogsSyncOutput,
}));
// Input Schema
export const ProjectEnvironmentTypesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/projects/{projectName}/environmentTypes/{environmentTypeName}",
    }),
  );
export type ProjectEnvironmentTypesDeleteInput =
  typeof ProjectEnvironmentTypesDeleteInput.Type;

// Output Schema
export const ProjectEnvironmentTypesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ProjectEnvironmentTypesDeleteOutput =
  typeof ProjectEnvironmentTypesDeleteOutput.Type;

// The operation
/**
 * Deletes a project environment type.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ProjectEnvironmentTypesDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ProjectEnvironmentTypesDeleteInput,
    outputSchema: ProjectEnvironmentTypesDeleteOutput,
  }));
// Input Schema
export const ProjectPoliciesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/projectPolicies/{projectPolicyName}",
    }),
  );
export type ProjectPoliciesDeleteInput = typeof ProjectPoliciesDeleteInput.Type;

// Output Schema
export const ProjectPoliciesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ProjectPoliciesDeleteOutput =
  typeof ProjectPoliciesDeleteOutput.Type;

// The operation
/**
 * Deletes an project policy.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ProjectPoliciesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ProjectPoliciesDeleteInput,
    outputSchema: ProjectPoliciesDeleteOutput,
  }),
);
// Input Schema
export const ProjectsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/projects/{projectName}",
    }),
  );
export type ProjectsCreateOrUpdateInput =
  typeof ProjectsCreateOrUpdateInput.Type;

// Output Schema
export const ProjectsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ProjectsCreateOrUpdateOutput =
  typeof ProjectsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a project.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ProjectsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ProjectsCreateOrUpdateInput,
    outputSchema: ProjectsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const ProjectsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/projects/{projectName}",
  }),
);
export type ProjectsDeleteInput = typeof ProjectsDeleteInput.Type;

// Output Schema
export const ProjectsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ProjectsDeleteOutput = typeof ProjectsDeleteOutput.Type;

// The operation
/**
 * Deletes a project resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ProjectsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ProjectsDeleteInput,
  outputSchema: ProjectsDeleteOutput,
}));
// Input Schema
export const ProjectsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/projects/{projectName}",
  }),
);
export type ProjectsGetInput = typeof ProjectsGetInput.Type;

// Output Schema
export const ProjectsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type ProjectsGetOutput = typeof ProjectsGetOutput.Type;

// The operation
/**
 * Gets a specific project.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ProjectsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ProjectsGetInput,
  outputSchema: ProjectsGetOutput,
}));
// Input Schema
export const ProjectsGetInheritedSettingsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/projects/{projectName}/getInheritedSettings",
    }),
  );
export type ProjectsGetInheritedSettingsInput =
  typeof ProjectsGetInheritedSettingsInput.Type;

// Output Schema
export const ProjectsGetInheritedSettingsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    projectCatalogSettings: Schema.optional(
      Schema.Struct({
        catalogItemSyncEnableStatus: Schema.optional(
          Schema.Literals(["Enabled", "Disabled"]),
        ),
      }),
    ),
    networkSettings: Schema.optional(
      Schema.Struct({
        microsoftHostedNetworkEnableStatus: Schema.optional(
          Schema.Literals(["Enabled", "Disabled"]),
        ),
      }),
    ),
  });
export type ProjectsGetInheritedSettingsOutput =
  typeof ProjectsGetInheritedSettingsOutput.Type;

// The operation
/**
 * Gets applicable inherited settings for this project.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ProjectsGetInheritedSettings =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ProjectsGetInheritedSettingsInput,
    outputSchema: ProjectsGetInheritedSettingsOutput,
  }));
// Input Schema
export const ProjectsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $top: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/projects",
    }),
  );
export type ProjectsListByResourceGroupInput =
  typeof ProjectsListByResourceGroupInput.Type;

// Output Schema
export const ProjectsListByResourceGroupOutput =
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
export type ProjectsListByResourceGroupOutput =
  typeof ProjectsListByResourceGroupOutput.Type;

// The operation
/**
 * Lists all projects in the resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param $top - The maximum number of resources to return from the operation. Example: '$top=10'.
 */
export const ProjectsListByResourceGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ProjectsListByResourceGroupInput,
    outputSchema: ProjectsListByResourceGroupOutput,
  }),
);
// Input Schema
export const ProjectsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $top: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DevCenter/projects",
    }),
  );
export type ProjectsListBySubscriptionInput =
  typeof ProjectsListBySubscriptionInput.Type;

// Output Schema
export const ProjectsListBySubscriptionOutput =
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
export type ProjectsListBySubscriptionOutput =
  typeof ProjectsListBySubscriptionOutput.Type;

// The operation
/**
 * Lists all projects in the subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param $top - The maximum number of resources to return from the operation. Example: '$top=10'.
 */
export const ProjectsListBySubscription = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ProjectsListBySubscriptionInput,
    outputSchema: ProjectsListBySubscriptionOutput,
  }),
);
// Input Schema
export const ProjectsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/projects/{projectName}",
  }),
);
export type ProjectsUpdateInput = typeof ProjectsUpdateInput.Type;

// Output Schema
export const ProjectsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type ProjectsUpdateOutput = typeof ProjectsUpdateOutput.Type;

// The operation
/**
 * Partially updates a project.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ProjectsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ProjectsUpdateInput,
  outputSchema: ProjectsUpdateOutput,
}));
// Input Schema
export const SchedulesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/projects/{projectName}/pools/{poolName}/schedules/{scheduleName}",
  }),
);
export type SchedulesDeleteInput = typeof SchedulesDeleteInput.Type;

// Output Schema
export const SchedulesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SchedulesDeleteOutput = typeof SchedulesDeleteOutput.Type;

// The operation
/**
 * Deletes a Scheduled.
 */
export const SchedulesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SchedulesDeleteInput,
  outputSchema: SchedulesDeleteOutput,
}));
// Input Schema
export const UsagesListByLocationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DevCenter/locations/{location}/usages",
    }),
  );
export type UsagesListByLocationInput = typeof UsagesListByLocationInput.Type;

// Output Schema
export const UsagesListByLocationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          currentValue: Schema.optional(Schema.Number),
          limit: Schema.optional(Schema.Number),
          unit: Schema.optional(Schema.Literals(["Count"])),
          name: Schema.optional(
            Schema.Struct({
              localizedValue: Schema.optional(Schema.String),
              value: Schema.optional(Schema.String),
            }),
          ),
          id: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type UsagesListByLocationOutput = typeof UsagesListByLocationOutput.Type;

// The operation
/**
 * Lists the current usages and limits in this location for the provided subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const UsagesListByLocation = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: UsagesListByLocationInput,
    outputSchema: UsagesListByLocationOutput,
  }),
);
