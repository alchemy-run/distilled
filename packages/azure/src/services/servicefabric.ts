/**
 * Azure Servicefabric API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const ApplicationsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/clusters/{clusterName}/applications/{applicationName}",
    }),
  );
export type ApplicationsCreateOrUpdateInput =
  typeof ApplicationsCreateOrUpdateInput.Type;

// Output Schema
export const ApplicationsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ApplicationsCreateOrUpdateOutput =
  typeof ApplicationsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a Service Fabric application resource.
 *
 * Create or update a Service Fabric application resource with the specified name.
 */
export const ApplicationsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ApplicationsCreateOrUpdateInput,
    outputSchema: ApplicationsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const ApplicationsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/clusters/{clusterName}/applications/{applicationName}",
    }),
  );
export type ApplicationsDeleteInput = typeof ApplicationsDeleteInput.Type;

// Output Schema
export const ApplicationsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ApplicationsDeleteOutput = typeof ApplicationsDeleteOutput.Type;

// The operation
/**
 * Deletes a Service Fabric application resource.
 *
 * Delete a Service Fabric application resource with the specified name.
 */
export const ApplicationsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ApplicationsDeleteInput,
  outputSchema: ApplicationsDeleteOutput,
}));
// Input Schema
export const ApplicationsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/clusters/{clusterName}/applications/{applicationName}",
  }),
);
export type ApplicationsGetInput = typeof ApplicationsGetInput.Type;

// Output Schema
export const ApplicationsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  etag: Schema.optional(Schema.String),
  systemData: Schema.optional(
    Schema.Struct({
      createdBy: Schema.optional(Schema.String),
      createdByType: Schema.optional(Schema.String),
      createdAt: Schema.optional(Schema.String),
      lastModifiedBy: Schema.optional(Schema.String),
      lastModifiedByType: Schema.optional(Schema.String),
      lastModifiedAt: Schema.optional(Schema.String),
    }),
  ),
});
export type ApplicationsGetOutput = typeof ApplicationsGetOutput.Type;

// The operation
/**
 * Gets a Service Fabric application resource.
 *
 * Get a Service Fabric application resource created or in the process of being created in the Service Fabric cluster resource.
 */
export const ApplicationsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ApplicationsGetInput,
  outputSchema: ApplicationsGetOutput,
}));
// Input Schema
export const ApplicationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/clusters/{clusterName}/applications",
  }),
);
export type ApplicationsListInput = typeof ApplicationsListInput.Type;

// Output Schema
export const ApplicationsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
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
              createdByType: Schema.optional(Schema.String),
              createdAt: Schema.optional(Schema.String),
              lastModifiedBy: Schema.optional(Schema.String),
              lastModifiedByType: Schema.optional(Schema.String),
              lastModifiedAt: Schema.optional(Schema.String),
            }),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  },
);
export type ApplicationsListOutput = typeof ApplicationsListOutput.Type;

// The operation
/**
 * Gets the list of application resources created in the specified Service Fabric cluster resource.
 *
 * Gets all application resources created or in the process of being created in the Service Fabric cluster resource.
 */
export const ApplicationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ApplicationsListInput,
  outputSchema: ApplicationsListOutput,
}));
// Input Schema
export const ApplicationsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/clusters/{clusterName}/applications/{applicationName}",
    }),
  );
export type ApplicationsUpdateInput = typeof ApplicationsUpdateInput.Type;

// Output Schema
export const ApplicationsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ApplicationsUpdateOutput = typeof ApplicationsUpdateOutput.Type;

// The operation
/**
 * Updates a Service Fabric application resource.
 *
 * Update a Service Fabric application resource with the specified name.
 */
export const ApplicationsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ApplicationsUpdateInput,
  outputSchema: ApplicationsUpdateOutput,
}));
// Input Schema
export const ApplicationTypesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/clusters/{clusterName}/applicationTypes/{applicationTypeName}",
    }),
  );
export type ApplicationTypesCreateOrUpdateInput =
  typeof ApplicationTypesCreateOrUpdateInput.Type;

// Output Schema
export const ApplicationTypesCreateOrUpdateOutput =
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
        createdByType: Schema.optional(Schema.String),
        createdAt: Schema.optional(Schema.String),
        lastModifiedBy: Schema.optional(Schema.String),
        lastModifiedByType: Schema.optional(Schema.String),
        lastModifiedAt: Schema.optional(Schema.String),
      }),
    ),
  });
export type ApplicationTypesCreateOrUpdateOutput =
  typeof ApplicationTypesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a Service Fabric application type name resource.
 *
 * Create or update a Service Fabric application type name resource with the specified name.
 */
export const ApplicationTypesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ApplicationTypesCreateOrUpdateInput,
    outputSchema: ApplicationTypesCreateOrUpdateOutput,
  }));
// Input Schema
export const ApplicationTypesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/clusters/{clusterName}/applicationTypes/{applicationTypeName}",
    }),
  );
export type ApplicationTypesDeleteInput =
  typeof ApplicationTypesDeleteInput.Type;

// Output Schema
export const ApplicationTypesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ApplicationTypesDeleteOutput =
  typeof ApplicationTypesDeleteOutput.Type;

// The operation
/**
 * Deletes a Service Fabric application type name resource.
 *
 * Delete a Service Fabric application type name resource with the specified name.
 */
export const ApplicationTypesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ApplicationTypesDeleteInput,
    outputSchema: ApplicationTypesDeleteOutput,
  }),
);
// Input Schema
export const ApplicationTypesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/clusters/{clusterName}/applicationTypes/{applicationTypeName}",
    }),
  );
export type ApplicationTypesGetInput = typeof ApplicationTypesGetInput.Type;

// Output Schema
export const ApplicationTypesGetOutput =
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
        createdByType: Schema.optional(Schema.String),
        createdAt: Schema.optional(Schema.String),
        lastModifiedBy: Schema.optional(Schema.String),
        lastModifiedByType: Schema.optional(Schema.String),
        lastModifiedAt: Schema.optional(Schema.String),
      }),
    ),
  });
export type ApplicationTypesGetOutput = typeof ApplicationTypesGetOutput.Type;

// The operation
/**
 * Gets a Service Fabric application type name resource.
 *
 * Get a Service Fabric application type name resource created or in the process of being created in the Service Fabric cluster resource.
 */
export const ApplicationTypesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ApplicationTypesGetInput,
  outputSchema: ApplicationTypesGetOutput,
}));
// Input Schema
export const ApplicationTypesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/clusters/{clusterName}/applicationTypes",
    }),
  );
export type ApplicationTypesListInput = typeof ApplicationTypesListInput.Type;

// Output Schema
export const ApplicationTypesListOutput =
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
              createdByType: Schema.optional(Schema.String),
              createdAt: Schema.optional(Schema.String),
              lastModifiedBy: Schema.optional(Schema.String),
              lastModifiedByType: Schema.optional(Schema.String),
              lastModifiedAt: Schema.optional(Schema.String),
            }),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ApplicationTypesListOutput = typeof ApplicationTypesListOutput.Type;

// The operation
/**
 * Gets the list of application type name resources created in the specified Service Fabric cluster resource.
 *
 * Gets all application type name resources created or in the process of being created in the Service Fabric cluster resource.
 */
export const ApplicationTypesList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ApplicationTypesListInput,
    outputSchema: ApplicationTypesListOutput,
  }),
);
// Input Schema
export const ApplicationTypeVersionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/clusters/{clusterName}/applicationTypes/{applicationTypeName}/versions/{version}",
    }),
  );
export type ApplicationTypeVersionsCreateOrUpdateInput =
  typeof ApplicationTypeVersionsCreateOrUpdateInput.Type;

// Output Schema
export const ApplicationTypeVersionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ApplicationTypeVersionsCreateOrUpdateOutput =
  typeof ApplicationTypeVersionsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a Service Fabric application type version resource.
 *
 * Create or update a Service Fabric application type version resource with the specified name.
 */
export const ApplicationTypeVersionsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ApplicationTypeVersionsCreateOrUpdateInput,
    outputSchema: ApplicationTypeVersionsCreateOrUpdateOutput,
  }));
// Input Schema
export const ApplicationTypeVersionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/clusters/{clusterName}/applicationTypes/{applicationTypeName}/versions/{version}",
    }),
  );
export type ApplicationTypeVersionsDeleteInput =
  typeof ApplicationTypeVersionsDeleteInput.Type;

// Output Schema
export const ApplicationTypeVersionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ApplicationTypeVersionsDeleteOutput =
  typeof ApplicationTypeVersionsDeleteOutput.Type;

// The operation
/**
 * Deletes a Service Fabric application type version resource.
 *
 * Delete a Service Fabric application type version resource with the specified name.
 */
export const ApplicationTypeVersionsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ApplicationTypeVersionsDeleteInput,
    outputSchema: ApplicationTypeVersionsDeleteOutput,
  }));
// Input Schema
export const ApplicationTypeVersionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/clusters/{clusterName}/applicationTypes/{applicationTypeName}/versions/{version}",
    }),
  );
export type ApplicationTypeVersionsGetInput =
  typeof ApplicationTypeVersionsGetInput.Type;

// Output Schema
export const ApplicationTypeVersionsGetOutput =
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
        createdByType: Schema.optional(Schema.String),
        createdAt: Schema.optional(Schema.String),
        lastModifiedBy: Schema.optional(Schema.String),
        lastModifiedByType: Schema.optional(Schema.String),
        lastModifiedAt: Schema.optional(Schema.String),
      }),
    ),
  });
export type ApplicationTypeVersionsGetOutput =
  typeof ApplicationTypeVersionsGetOutput.Type;

// The operation
/**
 * Gets a Service Fabric application type version resource.
 *
 * Get a Service Fabric application type version resource created or in the process of being created in the Service Fabric application type name resource.
 */
export const ApplicationTypeVersionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ApplicationTypeVersionsGetInput,
    outputSchema: ApplicationTypeVersionsGetOutput,
  }),
);
// Input Schema
export const ApplicationTypeVersionsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/clusters/{clusterName}/applicationTypes/{applicationTypeName}/versions",
    }),
  );
export type ApplicationTypeVersionsListInput =
  typeof ApplicationTypeVersionsListInput.Type;

// Output Schema
export const ApplicationTypeVersionsListOutput =
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
              createdByType: Schema.optional(Schema.String),
              createdAt: Schema.optional(Schema.String),
              lastModifiedBy: Schema.optional(Schema.String),
              lastModifiedByType: Schema.optional(Schema.String),
              lastModifiedAt: Schema.optional(Schema.String),
            }),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ApplicationTypeVersionsListOutput =
  typeof ApplicationTypeVersionsListOutput.Type;

// The operation
/**
 * Gets the list of application type version resources created in the specified Service Fabric application type name resource.
 *
 * Gets all application type version resources created or in the process of being created in the Service Fabric application type name resource.
 */
export const ApplicationTypeVersionsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ApplicationTypeVersionsListInput,
    outputSchema: ApplicationTypeVersionsListOutput,
  }),
);
// Input Schema
export const ClustersCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/clusters/{clusterName}",
    }),
  );
export type ClustersCreateOrUpdateInput =
  typeof ClustersCreateOrUpdateInput.Type;

// Output Schema
export const ClustersCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    etag: Schema.optional(Schema.String),
    systemData: Schema.optional(
      Schema.Struct({
        createdBy: Schema.optional(Schema.String),
        createdByType: Schema.optional(Schema.String),
        createdAt: Schema.optional(Schema.String),
        lastModifiedBy: Schema.optional(Schema.String),
        lastModifiedByType: Schema.optional(Schema.String),
        lastModifiedAt: Schema.optional(Schema.String),
      }),
    ),
  });
export type ClustersCreateOrUpdateOutput =
  typeof ClustersCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a Service Fabric cluster resource.
 *
 * Create or update a Service Fabric cluster resource with the specified name.
 */
export const ClustersCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ClustersCreateOrUpdateInput,
    outputSchema: ClustersCreateOrUpdateOutput,
  }),
);
// Input Schema
export const ClustersDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/clusters/{clusterName}",
  }),
);
export type ClustersDeleteInput = typeof ClustersDeleteInput.Type;

// Output Schema
export const ClustersDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ClustersDeleteOutput = typeof ClustersDeleteOutput.Type;

// The operation
/**
 * Deletes a Service Fabric cluster resource.
 *
 * Delete a Service Fabric cluster resource with the specified name.
 */
export const ClustersDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ClustersDeleteInput,
  outputSchema: ClustersDeleteOutput,
}));
// Input Schema
export const ClustersGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/clusters/{clusterName}",
  }),
);
export type ClustersGetInput = typeof ClustersGetInput.Type;

// Output Schema
export const ClustersGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  location: Schema.String,
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  etag: Schema.optional(Schema.String),
  systemData: Schema.optional(
    Schema.Struct({
      createdBy: Schema.optional(Schema.String),
      createdByType: Schema.optional(Schema.String),
      createdAt: Schema.optional(Schema.String),
      lastModifiedBy: Schema.optional(Schema.String),
      lastModifiedByType: Schema.optional(Schema.String),
      lastModifiedAt: Schema.optional(Schema.String),
    }),
  ),
});
export type ClustersGetOutput = typeof ClustersGetOutput.Type;

// The operation
/**
 * Gets a Service Fabric cluster resource.
 *
 * Get a Service Fabric cluster resource created or in the process of being created in the specified resource group.
 */
export const ClustersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ClustersGetInput,
  outputSchema: ClustersGetOutput,
}));
// Input Schema
export const ClustersListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.ServiceFabric/clusters",
  }),
);
export type ClustersListInput = typeof ClustersListInput.Type;

// Output Schema
export const ClustersListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        type: Schema.optional(Schema.String),
        location: Schema.String,
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        etag: Schema.optional(Schema.String),
        systemData: Schema.optional(
          Schema.Struct({
            createdBy: Schema.optional(Schema.String),
            createdByType: Schema.optional(Schema.String),
            createdAt: Schema.optional(Schema.String),
            lastModifiedBy: Schema.optional(Schema.String),
            lastModifiedByType: Schema.optional(Schema.String),
            lastModifiedAt: Schema.optional(Schema.String),
          }),
        ),
      }),
    ),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type ClustersListOutput = typeof ClustersListOutput.Type;

// The operation
/**
 * Gets the list of Service Fabric cluster resources created in the specified subscription.
 *
 * Gets all Service Fabric cluster resources created or in the process of being created in the subscription.
 */
export const ClustersList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ClustersListInput,
  outputSchema: ClustersListOutput,
}));
// Input Schema
export const ClustersListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/clusters",
    }),
  );
export type ClustersListByResourceGroupInput =
  typeof ClustersListByResourceGroupInput.Type;

// Output Schema
export const ClustersListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.String,
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          etag: Schema.optional(Schema.String),
          systemData: Schema.optional(
            Schema.Struct({
              createdBy: Schema.optional(Schema.String),
              createdByType: Schema.optional(Schema.String),
              createdAt: Schema.optional(Schema.String),
              lastModifiedBy: Schema.optional(Schema.String),
              lastModifiedByType: Schema.optional(Schema.String),
              lastModifiedAt: Schema.optional(Schema.String),
            }),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ClustersListByResourceGroupOutput =
  typeof ClustersListByResourceGroupOutput.Type;

// The operation
/**
 * Gets the list of Service Fabric cluster resources created in the specified resource group.
 *
 * Gets all Service Fabric cluster resources created or in the process of being created in the resource group.
 */
export const ClustersListByResourceGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ClustersListByResourceGroupInput,
    outputSchema: ClustersListByResourceGroupOutput,
  }),
);
// Input Schema
export const ClustersListUpgradableVersionsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/clusters/{clusterName}/listUpgradableVersions",
    }),
  );
export type ClustersListUpgradableVersionsInput =
  typeof ClustersListUpgradableVersionsInput.Type;

// Output Schema
export const ClustersListUpgradableVersionsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    supportedPath: Schema.optional(Schema.Array(Schema.String)),
  });
export type ClustersListUpgradableVersionsOutput =
  typeof ClustersListUpgradableVersionsOutput.Type;

// The operation
/**
 * Operation to get the minimum and maximum upgradable version from the current cluster version, or the required path to get to the an specific target version.
 *
 * If a target is not provided, it will get the minimum and maximum versions available from the current cluster version. If a target is given, it will provide the required path to get from the current cluster version to the target version.
 */
export const ClustersListUpgradableVersions =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ClustersListUpgradableVersionsInput,
    outputSchema: ClustersListUpgradableVersionsOutput,
  }));
// Input Schema
export const ClustersUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/clusters/{clusterName}",
  }),
);
export type ClustersUpdateInput = typeof ClustersUpdateInput.Type;

// Output Schema
export const ClustersUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  location: Schema.String,
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  etag: Schema.optional(Schema.String),
  systemData: Schema.optional(
    Schema.Struct({
      createdBy: Schema.optional(Schema.String),
      createdByType: Schema.optional(Schema.String),
      createdAt: Schema.optional(Schema.String),
      lastModifiedBy: Schema.optional(Schema.String),
      lastModifiedByType: Schema.optional(Schema.String),
      lastModifiedAt: Schema.optional(Schema.String),
    }),
  ),
});
export type ClustersUpdateOutput = typeof ClustersUpdateOutput.Type;

// The operation
/**
 * Updates the configuration of a Service Fabric cluster resource.
 *
 * Update the configuration of a Service Fabric cluster resource with the specified name.
 */
export const ClustersUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ClustersUpdateInput,
  outputSchema: ClustersUpdateOutput,
}));
// Input Schema
export const ClusterVersionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ServiceFabric/locations/{location}/clusterVersions/{clusterVersion}",
    }),
  );
export type ClusterVersionsGetInput = typeof ClusterVersionsGetInput.Type;

// Output Schema
export const ClusterVersionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Struct({
              codeVersion: Schema.optional(Schema.String),
              supportExpiryUtc: Schema.optional(Schema.String),
              environment: Schema.optional(
                Schema.Literals(["Windows", "Linux"]),
              ),
            }),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ClusterVersionsGetOutput = typeof ClusterVersionsGetOutput.Type;

// The operation
/**
 * Gets information about a Service Fabric cluster code version available in the specified location.
 *
 * Gets information about an available Service Fabric cluster code version.
 */
export const ClusterVersionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ClusterVersionsGetInput,
  outputSchema: ClusterVersionsGetOutput,
}));
// Input Schema
export const ClusterVersionsGetByEnvironmentInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ServiceFabric/locations/{location}/environments/{environment}/clusterVersions/{clusterVersion}",
    }),
  );
export type ClusterVersionsGetByEnvironmentInput =
  typeof ClusterVersionsGetByEnvironmentInput.Type;

// Output Schema
export const ClusterVersionsGetByEnvironmentOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Struct({
              codeVersion: Schema.optional(Schema.String),
              supportExpiryUtc: Schema.optional(Schema.String),
              environment: Schema.optional(
                Schema.Literals(["Windows", "Linux"]),
              ),
            }),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ClusterVersionsGetByEnvironmentOutput =
  typeof ClusterVersionsGetByEnvironmentOutput.Type;

// The operation
/**
 * Gets information about a Service Fabric cluster code version available for the specified environment.
 *
 * Gets information about an available Service Fabric cluster code version by environment.
 */
export const ClusterVersionsGetByEnvironment =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ClusterVersionsGetByEnvironmentInput,
    outputSchema: ClusterVersionsGetByEnvironmentOutput,
  }));
// Input Schema
export const ClusterVersionsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ServiceFabric/locations/{location}/clusterVersions",
    }),
  );
export type ClusterVersionsListInput = typeof ClusterVersionsListInput.Type;

// Output Schema
export const ClusterVersionsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Struct({
              codeVersion: Schema.optional(Schema.String),
              supportExpiryUtc: Schema.optional(Schema.String),
              environment: Schema.optional(
                Schema.Literals(["Windows", "Linux"]),
              ),
            }),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ClusterVersionsListOutput = typeof ClusterVersionsListOutput.Type;

// The operation
/**
 * Gets the list of Service Fabric cluster code versions available for the specified location.
 *
 * Gets all available code versions for Service Fabric cluster resources by location.
 */
export const ClusterVersionsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ClusterVersionsListInput,
  outputSchema: ClusterVersionsListOutput,
}));
// Input Schema
export const ClusterVersionsListByEnvironmentInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ServiceFabric/locations/{location}/environments/{environment}/clusterVersions",
    }),
  );
export type ClusterVersionsListByEnvironmentInput =
  typeof ClusterVersionsListByEnvironmentInput.Type;

// Output Schema
export const ClusterVersionsListByEnvironmentOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Struct({
              codeVersion: Schema.optional(Schema.String),
              supportExpiryUtc: Schema.optional(Schema.String),
              environment: Schema.optional(
                Schema.Literals(["Windows", "Linux"]),
              ),
            }),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ClusterVersionsListByEnvironmentOutput =
  typeof ClusterVersionsListByEnvironmentOutput.Type;

// The operation
/**
 * Gets the list of Service Fabric cluster code versions available for the specified environment.
 *
 * Gets all available code versions for Service Fabric cluster resources by environment.
 */
export const ClusterVersionsListByEnvironment =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ClusterVersionsListByEnvironmentInput,
    outputSchema: ClusterVersionsListByEnvironmentOutput,
  }));
// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.ServiceFabric/operations",
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
        nextLink: Schema.optional(Schema.String),
      }),
    ),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type OperationsListOutput = typeof OperationsListOutput.Type;

// The operation
/**
 * Lists all of the available Service Fabric resource provider API operations.
 *
 * Get the list of available Service Fabric resource provider API operations.
 *
 * @param api-version - The version of the Service Fabric resource provider API
 */
export const OperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationsListInput,
  outputSchema: OperationsListOutput,
}));
// Input Schema
export const ServicesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/clusters/{clusterName}/applications/{applicationName}/services/{serviceName}",
    }),
  );
export type ServicesCreateOrUpdateInput =
  typeof ServicesCreateOrUpdateInput.Type;

// Output Schema
export const ServicesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ServicesCreateOrUpdateOutput =
  typeof ServicesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a Service Fabric service resource.
 *
 * Create or update a Service Fabric service resource with the specified name.
 */
export const ServicesCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ServicesCreateOrUpdateInput,
    outputSchema: ServicesCreateOrUpdateOutput,
  }),
);
// Input Schema
export const ServicesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/clusters/{clusterName}/applications/{applicationName}/services/{serviceName}",
  }),
);
export type ServicesDeleteInput = typeof ServicesDeleteInput.Type;

// Output Schema
export const ServicesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ServicesDeleteOutput = typeof ServicesDeleteOutput.Type;

// The operation
/**
 * Deletes a Service Fabric service resource.
 *
 * Delete a Service Fabric service resource with the specified name.
 */
export const ServicesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServicesDeleteInput,
  outputSchema: ServicesDeleteOutput,
}));
// Input Schema
export const ServicesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/clusters/{clusterName}/applications/{applicationName}/services/{serviceName}",
  }),
);
export type ServicesGetInput = typeof ServicesGetInput.Type;

// Output Schema
export const ServicesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  etag: Schema.optional(Schema.String),
  systemData: Schema.optional(
    Schema.Struct({
      createdBy: Schema.optional(Schema.String),
      createdByType: Schema.optional(Schema.String),
      createdAt: Schema.optional(Schema.String),
      lastModifiedBy: Schema.optional(Schema.String),
      lastModifiedByType: Schema.optional(Schema.String),
      lastModifiedAt: Schema.optional(Schema.String),
    }),
  ),
});
export type ServicesGetOutput = typeof ServicesGetOutput.Type;

// The operation
/**
 * Gets a Service Fabric service resource.
 *
 * Get a Service Fabric service resource created or in the process of being created in the Service Fabric application resource.
 */
export const ServicesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServicesGetInput,
  outputSchema: ServicesGetOutput,
}));
// Input Schema
export const ServicesListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/clusters/{clusterName}/applications/{applicationName}/services",
  }),
);
export type ServicesListInput = typeof ServicesListInput.Type;

// Output Schema
export const ServicesListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
            createdByType: Schema.optional(Schema.String),
            createdAt: Schema.optional(Schema.String),
            lastModifiedBy: Schema.optional(Schema.String),
            lastModifiedByType: Schema.optional(Schema.String),
            lastModifiedAt: Schema.optional(Schema.String),
          }),
        ),
      }),
    ),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type ServicesListOutput = typeof ServicesListOutput.Type;

// The operation
/**
 * Gets the list of service resources created in the specified Service Fabric application resource.
 *
 * Gets all service resources created or in the process of being created in the Service Fabric application resource.
 */
export const ServicesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServicesListInput,
  outputSchema: ServicesListOutput,
}));
// Input Schema
export const ServicesUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/clusters/{clusterName}/applications/{applicationName}/services/{serviceName}",
  }),
);
export type ServicesUpdateInput = typeof ServicesUpdateInput.Type;

// Output Schema
export const ServicesUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ServicesUpdateOutput = typeof ServicesUpdateOutput.Type;

// The operation
/**
 * Updates a Service Fabric service resource.
 *
 * Update a Service Fabric service resource with the specified name.
 */
export const ServicesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServicesUpdateInput,
  outputSchema: ServicesUpdateOutput,
}));
