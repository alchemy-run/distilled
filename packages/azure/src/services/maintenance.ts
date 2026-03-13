/**
 * Azure Maintenance API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const ApplyUpdatesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    providerName: Schema.String.pipe(T.PathParam()),
    resourceType: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/{providerName}/{resourceType}/{resourceName}/providers/Microsoft.Maintenance/applyUpdates/default",
    }),
  );
export type ApplyUpdatesCreateOrUpdateInput =
  typeof ApplyUpdatesCreateOrUpdateInput.Type;

// Output Schema
export const ApplyUpdatesCreateOrUpdateOutput =
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
export type ApplyUpdatesCreateOrUpdateOutput =
  typeof ApplyUpdatesCreateOrUpdateOutput.Type;

// The operation
/**
 * Apply Updates to resource
 *
 * Apply maintenance updates to resource
 *
 * @param resourceGroupName - Resource group name
 * @param providerName - Resource provider name
 * @param resourceType - Resource type
 * @param resourceName - Resource identifier
 */
export const ApplyUpdatesCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ApplyUpdatesCreateOrUpdateInput,
    outputSchema: ApplyUpdatesCreateOrUpdateOutput,
  }),
);
// Input Schema
export const ApplyUpdatesCreateOrUpdateParentInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    providerName: Schema.String.pipe(T.PathParam()),
    resourceParentType: Schema.String.pipe(T.PathParam()),
    resourceParentName: Schema.String.pipe(T.PathParam()),
    resourceType: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/{providerName}/{resourceParentType}/{resourceParentName}/{resourceType}/{resourceName}/providers/Microsoft.Maintenance/applyUpdates/default",
    }),
  );
export type ApplyUpdatesCreateOrUpdateParentInput =
  typeof ApplyUpdatesCreateOrUpdateParentInput.Type;

// Output Schema
export const ApplyUpdatesCreateOrUpdateParentOutput =
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
export type ApplyUpdatesCreateOrUpdateParentOutput =
  typeof ApplyUpdatesCreateOrUpdateParentOutput.Type;

// The operation
/**
 * Apply Updates to resource with parent
 *
 * Apply maintenance updates to resource with parent
 *
 * @param resourceGroupName - Resource group name
 * @param providerName - Resource provider name
 * @param resourceParentType - Resource parent type
 * @param resourceParentName - Resource parent identifier
 * @param resourceType - Resource type
 * @param resourceName - Resource identifier
 */
export const ApplyUpdatesCreateOrUpdateParent =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ApplyUpdatesCreateOrUpdateParentInput,
    outputSchema: ApplyUpdatesCreateOrUpdateParentOutput,
  }));
// Input Schema
export const ApplyUpdatesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  providerName: Schema.String.pipe(T.PathParam()),
  resourceType: Schema.String.pipe(T.PathParam()),
  resourceName: Schema.String.pipe(T.PathParam()),
  applyUpdateName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/{providerName}/{resourceType}/{resourceName}/providers/Microsoft.Maintenance/applyUpdates/{applyUpdateName}",
  }),
);
export type ApplyUpdatesGetInput = typeof ApplyUpdatesGetInput.Type;

// Output Schema
export const ApplyUpdatesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
export type ApplyUpdatesGetOutput = typeof ApplyUpdatesGetOutput.Type;

// The operation
/**
 * Track Updates to resource
 *
 * Track maintenance updates to resource
 *
 * @param resourceGroupName - Resource group name
 * @param providerName - Resource provider name
 * @param resourceType - Resource type
 * @param resourceName - Resource identifier
 * @param applyUpdateName - applyUpdate Id
 */
export const ApplyUpdatesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ApplyUpdatesGetInput,
  outputSchema: ApplyUpdatesGetOutput,
}));
// Input Schema
export const ApplyUpdatesGetParentInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    providerName: Schema.String.pipe(T.PathParam()),
    resourceParentType: Schema.String.pipe(T.PathParam()),
    resourceParentName: Schema.String.pipe(T.PathParam()),
    resourceType: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    applyUpdateName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/{providerName}/{resourceParentType}/{resourceParentName}/{resourceType}/{resourceName}/providers/Microsoft.Maintenance/applyUpdates/{applyUpdateName}",
    }),
  );
export type ApplyUpdatesGetParentInput = typeof ApplyUpdatesGetParentInput.Type;

// Output Schema
export const ApplyUpdatesGetParentOutput =
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
export type ApplyUpdatesGetParentOutput =
  typeof ApplyUpdatesGetParentOutput.Type;

// The operation
/**
 * Track Updates to resource with parent
 *
 * Track maintenance updates to resource with parent
 *
 * @param resourceGroupName - Resource group name
 * @param providerName - Resource provider name
 * @param resourceParentType - Resource parent type
 * @param resourceParentName - Resource parent identifier
 * @param resourceType - Resource type
 * @param resourceName - Resource identifier
 * @param applyUpdateName - applyUpdate Id
 */
export const ApplyUpdatesGetParent = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ApplyUpdatesGetParentInput,
    outputSchema: ApplyUpdatesGetParentOutput,
  }),
);
// Input Schema
export const ConfigurationAssignmentsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    providerName: Schema.String.pipe(T.PathParam()),
    resourceType: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    configurationAssignmentName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/{providerName}/{resourceType}/{resourceName}/providers/Microsoft.Maintenance/configurationAssignments/{configurationAssignmentName}",
    }),
  );
export type ConfigurationAssignmentsCreateOrUpdateInput =
  typeof ConfigurationAssignmentsCreateOrUpdateInput.Type;

// Output Schema
export const ConfigurationAssignmentsCreateOrUpdateOutput =
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
export type ConfigurationAssignmentsCreateOrUpdateOutput =
  typeof ConfigurationAssignmentsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create configuration assignment
 *
 * Register configuration for resource.
 *
 * @param resourceGroupName - Resource group name
 * @param providerName - Resource provider name
 * @param resourceType - Resource type
 * @param resourceName - Resource identifier
 * @param configurationAssignmentName - Configuration assignment name
 */
export const ConfigurationAssignmentsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigurationAssignmentsCreateOrUpdateInput,
    outputSchema: ConfigurationAssignmentsCreateOrUpdateOutput,
  }));
// Input Schema
export const ConfigurationAssignmentsCreateOrUpdateParentInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    providerName: Schema.String.pipe(T.PathParam()),
    resourceParentType: Schema.String.pipe(T.PathParam()),
    resourceParentName: Schema.String.pipe(T.PathParam()),
    resourceType: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    configurationAssignmentName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/{providerName}/{resourceParentType}/{resourceParentName}/{resourceType}/{resourceName}/providers/Microsoft.Maintenance/configurationAssignments/{configurationAssignmentName}",
    }),
  );
export type ConfigurationAssignmentsCreateOrUpdateParentInput =
  typeof ConfigurationAssignmentsCreateOrUpdateParentInput.Type;

// Output Schema
export const ConfigurationAssignmentsCreateOrUpdateParentOutput =
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
export type ConfigurationAssignmentsCreateOrUpdateParentOutput =
  typeof ConfigurationAssignmentsCreateOrUpdateParentOutput.Type;

// The operation
/**
 * Create configuration assignment
 *
 * Register configuration for resource.
 *
 * @param resourceGroupName - Resource group name
 * @param providerName - Resource provider name
 * @param resourceParentType - Resource parent type
 * @param resourceParentName - Resource parent identifier
 * @param resourceType - Resource type
 * @param resourceName - Resource identifier
 * @param configurationAssignmentName - Configuration assignment name
 */
export const ConfigurationAssignmentsCreateOrUpdateParent =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigurationAssignmentsCreateOrUpdateParentInput,
    outputSchema: ConfigurationAssignmentsCreateOrUpdateParentOutput,
  }));
// Input Schema
export const ConfigurationAssignmentsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    providerName: Schema.String.pipe(T.PathParam()),
    resourceType: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    configurationAssignmentName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/{providerName}/{resourceType}/{resourceName}/providers/Microsoft.Maintenance/configurationAssignments/{configurationAssignmentName}",
    }),
  );
export type ConfigurationAssignmentsDeleteInput =
  typeof ConfigurationAssignmentsDeleteInput.Type;

// Output Schema
export const ConfigurationAssignmentsDeleteOutput =
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
export type ConfigurationAssignmentsDeleteOutput =
  typeof ConfigurationAssignmentsDeleteOutput.Type;

// The operation
/**
 * Unregister configuration for resource
 *
 * Unregister configuration for resource.
 *
 * @param resourceGroupName - Resource group name
 * @param providerName - Resource provider name
 * @param resourceType - Resource type
 * @param resourceName - Resource identifier
 * @param configurationAssignmentName - Unique configuration assignment name
 */
export const ConfigurationAssignmentsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigurationAssignmentsDeleteInput,
    outputSchema: ConfigurationAssignmentsDeleteOutput,
  }));
// Input Schema
export const ConfigurationAssignmentsDeleteParentInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    providerName: Schema.String.pipe(T.PathParam()),
    resourceParentType: Schema.String.pipe(T.PathParam()),
    resourceParentName: Schema.String.pipe(T.PathParam()),
    resourceType: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    configurationAssignmentName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/{providerName}/{resourceParentType}/{resourceParentName}/{resourceType}/{resourceName}/providers/Microsoft.Maintenance/configurationAssignments/{configurationAssignmentName}",
    }),
  );
export type ConfigurationAssignmentsDeleteParentInput =
  typeof ConfigurationAssignmentsDeleteParentInput.Type;

// Output Schema
export const ConfigurationAssignmentsDeleteParentOutput =
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
export type ConfigurationAssignmentsDeleteParentOutput =
  typeof ConfigurationAssignmentsDeleteParentOutput.Type;

// The operation
/**
 * Unregister configuration for resource
 *
 * Unregister configuration for resource.
 *
 * @param resourceGroupName - Resource group name
 * @param providerName - Resource provider name
 * @param resourceParentType - Resource parent type
 * @param resourceParentName - Resource parent identifier
 * @param resourceType - Resource type
 * @param resourceName - Resource identifier
 * @param configurationAssignmentName - Unique configuration assignment name
 */
export const ConfigurationAssignmentsDeleteParent =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigurationAssignmentsDeleteParentInput,
    outputSchema: ConfigurationAssignmentsDeleteParentOutput,
  }));
// Input Schema
export const ConfigurationAssignmentsForResourceGroupCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    configurationAssignmentName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Maintenance/configurationAssignments/{configurationAssignmentName}",
    }),
  );
export type ConfigurationAssignmentsForResourceGroupCreateOrUpdateInput =
  typeof ConfigurationAssignmentsForResourceGroupCreateOrUpdateInput.Type;

// Output Schema
export const ConfigurationAssignmentsForResourceGroupCreateOrUpdateOutput =
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
export type ConfigurationAssignmentsForResourceGroupCreateOrUpdateOutput =
  typeof ConfigurationAssignmentsForResourceGroupCreateOrUpdateOutput.Type;

// The operation
/**
 * Create configuration assignment
 *
 * Register configuration for resource.
 *
 * @param resourceGroupName - Resource group name
 * @param configurationAssignmentName - Configuration assignment name
 */
export const ConfigurationAssignmentsForResourceGroupCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigurationAssignmentsForResourceGroupCreateOrUpdateInput,
    outputSchema: ConfigurationAssignmentsForResourceGroupCreateOrUpdateOutput,
  }));
// Input Schema
export const ConfigurationAssignmentsForResourceGroupDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    configurationAssignmentName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Maintenance/configurationAssignments/{configurationAssignmentName}",
    }),
  );
export type ConfigurationAssignmentsForResourceGroupDeleteInput =
  typeof ConfigurationAssignmentsForResourceGroupDeleteInput.Type;

// Output Schema
export const ConfigurationAssignmentsForResourceGroupDeleteOutput =
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
export type ConfigurationAssignmentsForResourceGroupDeleteOutput =
  typeof ConfigurationAssignmentsForResourceGroupDeleteOutput.Type;

// The operation
/**
 * Unregister configuration for resource
 *
 * Unregister configuration for resource.
 *
 * @param resourceGroupName - Resource group name
 * @param configurationAssignmentName - Unique configuration assignment name
 */
export const ConfigurationAssignmentsForResourceGroupDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigurationAssignmentsForResourceGroupDeleteInput,
    outputSchema: ConfigurationAssignmentsForResourceGroupDeleteOutput,
  }));
// Input Schema
export const ConfigurationAssignmentsForResourceGroupGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    configurationAssignmentName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Maintenance/configurationAssignments/{configurationAssignmentName}",
    }),
  );
export type ConfigurationAssignmentsForResourceGroupGetInput =
  typeof ConfigurationAssignmentsForResourceGroupGetInput.Type;

// Output Schema
export const ConfigurationAssignmentsForResourceGroupGetOutput =
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
export type ConfigurationAssignmentsForResourceGroupGetOutput =
  typeof ConfigurationAssignmentsForResourceGroupGetOutput.Type;

// The operation
/**
 * Get configuration assignment
 *
 * Get configuration assignment for resource..
 *
 * @param resourceGroupName - Resource group name
 * @param configurationAssignmentName - Configuration assignment name
 */
export const ConfigurationAssignmentsForResourceGroupGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigurationAssignmentsForResourceGroupGetInput,
    outputSchema: ConfigurationAssignmentsForResourceGroupGetOutput,
  }));
// Input Schema
export const ConfigurationAssignmentsForResourceGroupUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    configurationAssignmentName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Maintenance/configurationAssignments/{configurationAssignmentName}",
    }),
  );
export type ConfigurationAssignmentsForResourceGroupUpdateInput =
  typeof ConfigurationAssignmentsForResourceGroupUpdateInput.Type;

// Output Schema
export const ConfigurationAssignmentsForResourceGroupUpdateOutput =
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
export type ConfigurationAssignmentsForResourceGroupUpdateOutput =
  typeof ConfigurationAssignmentsForResourceGroupUpdateOutput.Type;

// The operation
/**
 * Create configuration assignment
 *
 * Register configuration for resource.
 *
 * @param resourceGroupName - Resource group name
 * @param configurationAssignmentName - Configuration assignment name
 */
export const ConfigurationAssignmentsForResourceGroupUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigurationAssignmentsForResourceGroupUpdateInput,
    outputSchema: ConfigurationAssignmentsForResourceGroupUpdateOutput,
  }));
// Input Schema
export const ConfigurationAssignmentsForSubscriptionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    configurationAssignmentName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Maintenance/configurationAssignments/{configurationAssignmentName}",
    }),
  );
export type ConfigurationAssignmentsForSubscriptionsCreateOrUpdateInput =
  typeof ConfigurationAssignmentsForSubscriptionsCreateOrUpdateInput.Type;

// Output Schema
export const ConfigurationAssignmentsForSubscriptionsCreateOrUpdateOutput =
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
export type ConfigurationAssignmentsForSubscriptionsCreateOrUpdateOutput =
  typeof ConfigurationAssignmentsForSubscriptionsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create configuration assignment
 *
 * Register configuration for resource.
 *
 * @param configurationAssignmentName - Configuration assignment name
 */
export const ConfigurationAssignmentsForSubscriptionsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigurationAssignmentsForSubscriptionsCreateOrUpdateInput,
    outputSchema: ConfigurationAssignmentsForSubscriptionsCreateOrUpdateOutput,
  }));
// Input Schema
export const ConfigurationAssignmentsForSubscriptionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    configurationAssignmentName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Maintenance/configurationAssignments/{configurationAssignmentName}",
    }),
  );
export type ConfigurationAssignmentsForSubscriptionsDeleteInput =
  typeof ConfigurationAssignmentsForSubscriptionsDeleteInput.Type;

// Output Schema
export const ConfigurationAssignmentsForSubscriptionsDeleteOutput =
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
export type ConfigurationAssignmentsForSubscriptionsDeleteOutput =
  typeof ConfigurationAssignmentsForSubscriptionsDeleteOutput.Type;

// The operation
/**
 * Unregister configuration for resource
 *
 * Unregister configuration for resource.
 *
 * @param configurationAssignmentName - Unique configuration assignment name
 */
export const ConfigurationAssignmentsForSubscriptionsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigurationAssignmentsForSubscriptionsDeleteInput,
    outputSchema: ConfigurationAssignmentsForSubscriptionsDeleteOutput,
  }));
// Input Schema
export const ConfigurationAssignmentsForSubscriptionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    configurationAssignmentName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Maintenance/configurationAssignments/{configurationAssignmentName}",
    }),
  );
export type ConfigurationAssignmentsForSubscriptionsGetInput =
  typeof ConfigurationAssignmentsForSubscriptionsGetInput.Type;

// Output Schema
export const ConfigurationAssignmentsForSubscriptionsGetOutput =
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
export type ConfigurationAssignmentsForSubscriptionsGetOutput =
  typeof ConfigurationAssignmentsForSubscriptionsGetOutput.Type;

// The operation
/**
 * [UNSUPPORTED] Get configuration assignment. This API is not implemented yet.
 *
 * Get configuration assignment for resource.
 *
 * @param configurationAssignmentName - Configuration assignment name
 */
export const ConfigurationAssignmentsForSubscriptionsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigurationAssignmentsForSubscriptionsGetInput,
    outputSchema: ConfigurationAssignmentsForSubscriptionsGetOutput,
  }));
// Input Schema
export const ConfigurationAssignmentsForSubscriptionsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    configurationAssignmentName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Maintenance/configurationAssignments/{configurationAssignmentName}",
    }),
  );
export type ConfigurationAssignmentsForSubscriptionsUpdateInput =
  typeof ConfigurationAssignmentsForSubscriptionsUpdateInput.Type;

// Output Schema
export const ConfigurationAssignmentsForSubscriptionsUpdateOutput =
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
export type ConfigurationAssignmentsForSubscriptionsUpdateOutput =
  typeof ConfigurationAssignmentsForSubscriptionsUpdateOutput.Type;

// The operation
/**
 * Create configuration assignment
 *
 * Register configuration for resource.
 *
 * @param configurationAssignmentName - Configuration assignment name
 */
export const ConfigurationAssignmentsForSubscriptionsUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigurationAssignmentsForSubscriptionsUpdateInput,
    outputSchema: ConfigurationAssignmentsForSubscriptionsUpdateOutput,
  }));
// Input Schema
export const ConfigurationAssignmentsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    providerName: Schema.String.pipe(T.PathParam()),
    resourceType: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    configurationAssignmentName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/{providerName}/{resourceType}/{resourceName}/providers/Microsoft.Maintenance/configurationAssignments/{configurationAssignmentName}",
    }),
  );
export type ConfigurationAssignmentsGetInput =
  typeof ConfigurationAssignmentsGetInput.Type;

// Output Schema
export const ConfigurationAssignmentsGetOutput =
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
export type ConfigurationAssignmentsGetOutput =
  typeof ConfigurationAssignmentsGetOutput.Type;

// The operation
/**
 * Get configuration assignment
 *
 * Get configuration assignment for resource..
 *
 * @param resourceGroupName - Resource group name
 * @param providerName - Resource provider name
 * @param resourceType - Resource type
 * @param resourceName - Resource identifier
 * @param configurationAssignmentName - Configuration assignment name
 */
export const ConfigurationAssignmentsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ConfigurationAssignmentsGetInput,
    outputSchema: ConfigurationAssignmentsGetOutput,
  }),
);
// Input Schema
export const ConfigurationAssignmentsGetParentInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    providerName: Schema.String.pipe(T.PathParam()),
    resourceParentType: Schema.String.pipe(T.PathParam()),
    resourceParentName: Schema.String.pipe(T.PathParam()),
    resourceType: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    configurationAssignmentName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/{providerName}/{resourceParentType}/{resourceParentName}/{resourceType}/{resourceName}/providers/Microsoft.Maintenance/configurationAssignments/{configurationAssignmentName}",
    }),
  );
export type ConfigurationAssignmentsGetParentInput =
  typeof ConfigurationAssignmentsGetParentInput.Type;

// Output Schema
export const ConfigurationAssignmentsGetParentOutput =
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
export type ConfigurationAssignmentsGetParentOutput =
  typeof ConfigurationAssignmentsGetParentOutput.Type;

// The operation
/**
 * Get configuration assignment
 *
 * Get configuration assignment for resource..
 *
 * @param resourceGroupName - Resource group name
 * @param providerName - Resource provider name
 * @param resourceParentType - Resource parent type
 * @param resourceParentName - Resource parent identifier
 * @param resourceType - Resource type
 * @param resourceName - Resource identifier
 * @param configurationAssignmentName - Configuration assignment name
 */
export const ConfigurationAssignmentsGetParent =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigurationAssignmentsGetParentInput,
    outputSchema: ConfigurationAssignmentsGetParentOutput,
  }));
// Input Schema
export const ConfigurationAssignmentsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    providerName: Schema.String.pipe(T.PathParam()),
    resourceType: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/{providerName}/{resourceType}/{resourceName}/providers/Microsoft.Maintenance/configurationAssignments",
    }),
  );
export type ConfigurationAssignmentsListInput =
  typeof ConfigurationAssignmentsListInput.Type;

// Output Schema
export const ConfigurationAssignmentsListOutput =
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
  });
export type ConfigurationAssignmentsListOutput =
  typeof ConfigurationAssignmentsListOutput.Type;

// The operation
/**
 * List configurationAssignments for resource
 *
 * List configurationAssignments for resource.
 *
 * @param resourceGroupName - Resource group name
 * @param providerName - Resource provider name
 * @param resourceType - Resource type
 * @param resourceName - Resource identifier
 */
export const ConfigurationAssignmentsList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigurationAssignmentsListInput,
    outputSchema: ConfigurationAssignmentsListOutput,
  }));
// Input Schema
export const ConfigurationAssignmentsListParentInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    providerName: Schema.String.pipe(T.PathParam()),
    resourceParentType: Schema.String.pipe(T.PathParam()),
    resourceParentName: Schema.String.pipe(T.PathParam()),
    resourceType: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/{providerName}/{resourceParentType}/{resourceParentName}/{resourceType}/{resourceName}/providers/Microsoft.Maintenance/configurationAssignments",
    }),
  );
export type ConfigurationAssignmentsListParentInput =
  typeof ConfigurationAssignmentsListParentInput.Type;

// Output Schema
export const ConfigurationAssignmentsListParentOutput =
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
  });
export type ConfigurationAssignmentsListParentOutput =
  typeof ConfigurationAssignmentsListParentOutput.Type;

// The operation
/**
 * List configurationAssignments for resource
 *
 * List configurationAssignments for resource.
 *
 * @param resourceGroupName - Resource group name
 * @param providerName - Resource provider name
 * @param resourceParentType - Resource parent type
 * @param resourceParentName - Resource parent identifier
 * @param resourceType - Resource type
 * @param resourceName - Resource identifier
 */
export const ConfigurationAssignmentsListParent =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigurationAssignmentsListParentInput,
    outputSchema: ConfigurationAssignmentsListParentOutput,
  }));
// Input Schema
export const ConfigurationAssignmentsWithinSubscriptionListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Maintenance/configurationAssignments",
    }),
  );
export type ConfigurationAssignmentsWithinSubscriptionListInput =
  typeof ConfigurationAssignmentsWithinSubscriptionListInput.Type;

// Output Schema
export const ConfigurationAssignmentsWithinSubscriptionListOutput =
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
  });
export type ConfigurationAssignmentsWithinSubscriptionListOutput =
  typeof ConfigurationAssignmentsWithinSubscriptionListOutput.Type;

// The operation
/**
 * [UNSUPPORTED] Get configuration assignment within a subscription. This API is not implemented yet.
 */
export const ConfigurationAssignmentsWithinSubscriptionList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigurationAssignmentsWithinSubscriptionListInput,
    outputSchema: ConfigurationAssignmentsWithinSubscriptionListOutput,
  }));
// Input Schema
export const MaintenanceConfigurationsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Maintenance/maintenanceConfigurations/{resourceName}",
    }),
  );
export type MaintenanceConfigurationsCreateOrUpdateInput =
  typeof MaintenanceConfigurationsCreateOrUpdateInput.Type;

// Output Schema
export const MaintenanceConfigurationsCreateOrUpdateOutput =
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
export type MaintenanceConfigurationsCreateOrUpdateOutput =
  typeof MaintenanceConfigurationsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or Update configuration record
 *
 * @param resourceGroupName - Resource Group Name
 * @param resourceName - Maintenance Configuration Name
 */
export const MaintenanceConfigurationsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MaintenanceConfigurationsCreateOrUpdateInput,
    outputSchema: MaintenanceConfigurationsCreateOrUpdateOutput,
  }));
// Input Schema
export const MaintenanceConfigurationsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Maintenance/maintenanceConfigurations/{resourceName}",
    }),
  );
export type MaintenanceConfigurationsDeleteInput =
  typeof MaintenanceConfigurationsDeleteInput.Type;

// Output Schema
export const MaintenanceConfigurationsDeleteOutput =
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
export type MaintenanceConfigurationsDeleteOutput =
  typeof MaintenanceConfigurationsDeleteOutput.Type;

// The operation
/**
 * Delete Configuration record
 *
 * @param resourceGroupName - Resource Group Name
 * @param resourceName - Maintenance Configuration Name
 */
export const MaintenanceConfigurationsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MaintenanceConfigurationsDeleteInput,
    outputSchema: MaintenanceConfigurationsDeleteOutput,
  }));
// Input Schema
export const MaintenanceConfigurationsForResourceGroupListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Maintenance/maintenanceConfigurations",
    }),
  );
export type MaintenanceConfigurationsForResourceGroupListInput =
  typeof MaintenanceConfigurationsForResourceGroupListInput.Type;

// Output Schema
export const MaintenanceConfigurationsForResourceGroupListOutput =
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
  });
export type MaintenanceConfigurationsForResourceGroupListOutput =
  typeof MaintenanceConfigurationsForResourceGroupListOutput.Type;

// The operation
/**
 * Get Configuration records within a subscription and resource group
 *
 * @param resourceGroupName - Resource Group Name
 */
export const MaintenanceConfigurationsForResourceGroupList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MaintenanceConfigurationsForResourceGroupListInput,
    outputSchema: MaintenanceConfigurationsForResourceGroupListOutput,
  }));
// Input Schema
export const MaintenanceConfigurationsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Maintenance/maintenanceConfigurations/{resourceName}",
    }),
  );
export type MaintenanceConfigurationsGetInput =
  typeof MaintenanceConfigurationsGetInput.Type;

// Output Schema
export const MaintenanceConfigurationsGetOutput =
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
export type MaintenanceConfigurationsGetOutput =
  typeof MaintenanceConfigurationsGetOutput.Type;

// The operation
/**
 * Get Configuration record
 *
 * @param resourceGroupName - Resource Group Name
 * @param resourceName - Maintenance Configuration Name
 */
export const MaintenanceConfigurationsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MaintenanceConfigurationsGetInput,
    outputSchema: MaintenanceConfigurationsGetOutput,
  }));
// Input Schema
export const MaintenanceConfigurationsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Maintenance/maintenanceConfigurations",
    }),
  );
export type MaintenanceConfigurationsListInput =
  typeof MaintenanceConfigurationsListInput.Type;

// Output Schema
export const MaintenanceConfigurationsListOutput =
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
  });
export type MaintenanceConfigurationsListOutput =
  typeof MaintenanceConfigurationsListOutput.Type;

// The operation
/**
 * Get Configuration records within a subscription
 */
export const MaintenanceConfigurationsList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MaintenanceConfigurationsListInput,
    outputSchema: MaintenanceConfigurationsListOutput,
  }));
// Input Schema
export const MaintenanceConfigurationsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Maintenance/maintenanceConfigurations/{resourceName}",
    }),
  );
export type MaintenanceConfigurationsUpdateInput =
  typeof MaintenanceConfigurationsUpdateInput.Type;

// Output Schema
export const MaintenanceConfigurationsUpdateOutput =
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
export type MaintenanceConfigurationsUpdateOutput =
  typeof MaintenanceConfigurationsUpdateOutput.Type;

// The operation
/**
 * Patch configuration record
 *
 * @param resourceGroupName - Resource Group Name
 * @param resourceName - Maintenance Configuration Name
 */
export const MaintenanceConfigurationsUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MaintenanceConfigurationsUpdateInput,
    outputSchema: MaintenanceConfigurationsUpdateOutput,
  }));
// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.Maintenance/operations",
  }),
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
        origin: Schema.optional(Schema.String),
        properties: Schema.optional(Schema.Unknown),
        isDataAction: Schema.optional(Schema.Boolean),
      }),
    ),
  ),
});
export type OperationsListOutput = typeof OperationsListOutput.Type;

// The operation
/**
 * List available operations
 *
 * List the available operations supported by the Microsoft.Maintenance resource provider
 */
export const OperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationsListInput,
  outputSchema: OperationsListOutput,
}));
// Input Schema
export const PublicMaintenanceConfigurationsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Maintenance/publicMaintenanceConfigurations/{resourceName}",
    }),
  );
export type PublicMaintenanceConfigurationsGetInput =
  typeof PublicMaintenanceConfigurationsGetInput.Type;

// Output Schema
export const PublicMaintenanceConfigurationsGetOutput =
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
export type PublicMaintenanceConfigurationsGetOutput =
  typeof PublicMaintenanceConfigurationsGetOutput.Type;

// The operation
/**
 * Get Public Maintenance Configuration record
 *
 * @param resourceName - Maintenance Configuration Name
 */
export const PublicMaintenanceConfigurationsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PublicMaintenanceConfigurationsGetInput,
    outputSchema: PublicMaintenanceConfigurationsGetOutput,
  }));
// Input Schema
export const PublicMaintenanceConfigurationsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Maintenance/publicMaintenanceConfigurations",
    }),
  );
export type PublicMaintenanceConfigurationsListInput =
  typeof PublicMaintenanceConfigurationsListInput.Type;

// Output Schema
export const PublicMaintenanceConfigurationsListOutput =
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
  });
export type PublicMaintenanceConfigurationsListOutput =
  typeof PublicMaintenanceConfigurationsListOutput.Type;

// The operation
/**
 * Get Public Maintenance Configuration records
 */
export const PublicMaintenanceConfigurationsList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PublicMaintenanceConfigurationsListInput,
    outputSchema: PublicMaintenanceConfigurationsListOutput,
  }));
// Input Schema
export const UpdatesListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  providerName: Schema.String.pipe(T.PathParam()),
  resourceType: Schema.String.pipe(T.PathParam()),
  resourceName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/{providerName}/{resourceType}/{resourceName}/providers/Microsoft.Maintenance/updates",
  }),
);
export type UpdatesListInput = typeof UpdatesListInput.Type;

// Output Schema
export const UpdatesListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        maintenanceScope: Schema.optional(
          Schema.Literals([
            "Host",
            "Resource",
            "OSImage",
            "Extension",
            "InGuestPatch",
            "SQLDB",
            "SQLManagedInstance",
          ]),
        ),
        impactType: Schema.optional(
          Schema.Literals(["None", "Freeze", "Restart", "Redeploy"]),
        ),
        status: Schema.optional(
          Schema.Literals([
            "Pending",
            "InProgress",
            "Completed",
            "RetryNow",
            "RetryLater",
          ]),
        ),
        impactDurationInSec: Schema.optional(Schema.Number),
        notBefore: Schema.optional(Schema.String),
        properties: Schema.optional(
          Schema.Struct({
            resourceId: Schema.optional(Schema.String),
          }),
        ),
      }),
    ),
  ),
});
export type UpdatesListOutput = typeof UpdatesListOutput.Type;

// The operation
/**
 * Get Updates to resource
 *
 * Get updates to resources.
 *
 * @param resourceGroupName - Resource group name
 * @param providerName - Resource provider name
 * @param resourceType - Resource type
 * @param resourceName - Resource identifier
 */
export const UpdatesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: UpdatesListInput,
  outputSchema: UpdatesListOutput,
}));
// Input Schema
export const UpdatesListParentInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    providerName: Schema.String.pipe(T.PathParam()),
    resourceParentType: Schema.String.pipe(T.PathParam()),
    resourceParentName: Schema.String.pipe(T.PathParam()),
    resourceType: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/{providerName}/{resourceParentType}/{resourceParentName}/{resourceType}/{resourceName}/providers/Microsoft.Maintenance/updates",
  }),
);
export type UpdatesListParentInput = typeof UpdatesListParentInput.Type;

// Output Schema
export const UpdatesListParentOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          maintenanceScope: Schema.optional(
            Schema.Literals([
              "Host",
              "Resource",
              "OSImage",
              "Extension",
              "InGuestPatch",
              "SQLDB",
              "SQLManagedInstance",
            ]),
          ),
          impactType: Schema.optional(
            Schema.Literals(["None", "Freeze", "Restart", "Redeploy"]),
          ),
          status: Schema.optional(
            Schema.Literals([
              "Pending",
              "InProgress",
              "Completed",
              "RetryNow",
              "RetryLater",
            ]),
          ),
          impactDurationInSec: Schema.optional(Schema.Number),
          notBefore: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Struct({
              resourceId: Schema.optional(Schema.String),
            }),
          ),
        }),
      ),
    ),
  });
export type UpdatesListParentOutput = typeof UpdatesListParentOutput.Type;

// The operation
/**
 * Get Updates to resource
 *
 * Get updates to resources.
 *
 * @param resourceGroupName - Resource group name
 * @param providerName - Resource provider name
 * @param resourceParentType - Resource parent type
 * @param resourceParentName - Resource parent identifier
 * @param resourceType - Resource type
 * @param resourceName - Resource identifier
 */
export const UpdatesListParent = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: UpdatesListParentInput,
  outputSchema: UpdatesListParentOutput,
}));
