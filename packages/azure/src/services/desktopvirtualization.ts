/**
 * Azure Desktopvirtualization API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const AppAttachPackageCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DesktopVirtualization/appAttachPackages/{appAttachPackageName}",
    }),
  );
export type AppAttachPackageCreateOrUpdateInput =
  typeof AppAttachPackageCreateOrUpdateInput.Type;

// Output Schema
export const AppAttachPackageCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type AppAttachPackageCreateOrUpdateOutput =
  typeof AppAttachPackageCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update an App Attach package.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const AppAttachPackageCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AppAttachPackageCreateOrUpdateInput,
    outputSchema: AppAttachPackageCreateOrUpdateOutput,
  }));
// Input Schema
export const AppAttachPackageDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DesktopVirtualization/appAttachPackages/{appAttachPackageName}",
    }),
  );
export type AppAttachPackageDeleteInput =
  typeof AppAttachPackageDeleteInput.Type;

// Output Schema
export const AppAttachPackageDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AppAttachPackageDeleteOutput =
  typeof AppAttachPackageDeleteOutput.Type;

// The operation
/**
 * Remove an App Attach Package.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const AppAttachPackageDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AppAttachPackageDeleteInput,
    outputSchema: AppAttachPackageDeleteOutput,
  }),
);
// Input Schema
export const AppAttachPackageGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DesktopVirtualization/appAttachPackages/{appAttachPackageName}",
    }),
  );
export type AppAttachPackageGetInput = typeof AppAttachPackageGetInput.Type;

// Output Schema
export const AppAttachPackageGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type AppAttachPackageGetOutput = typeof AppAttachPackageGetOutput.Type;

// The operation
/**
 * Get an app attach package.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const AppAttachPackageGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AppAttachPackageGetInput,
  outputSchema: AppAttachPackageGetOutput,
}));
// Input Schema
export const AppAttachPackageInfoImportInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DesktopVirtualization/hostPools/{hostPoolName}/importAppAttachPackageInfo",
    }),
  );
export type AppAttachPackageInfoImportInput =
  typeof AppAttachPackageInfoImportInput.Type;

// Output Schema
export const AppAttachPackageInfoImportOutput =
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
export type AppAttachPackageInfoImportOutput =
  typeof AppAttachPackageInfoImportOutput.Type;

// The operation
/**
 * Gets information from a package given the path to the package.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const AppAttachPackageInfoImport = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AppAttachPackageInfoImportInput,
    outputSchema: AppAttachPackageInfoImportOutput,
  }),
);
// Input Schema
export const AppAttachPackageListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $filter: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DesktopVirtualization/appAttachPackages",
    }),
  );
export type AppAttachPackageListByResourceGroupInput =
  typeof AppAttachPackageListByResourceGroupInput.Type;

// Output Schema
export const AppAttachPackageListByResourceGroupOutput =
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
export type AppAttachPackageListByResourceGroupOutput =
  typeof AppAttachPackageListByResourceGroupOutput.Type;

// The operation
/**
 * List App Attach packages in resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param $filter - OData filter expression. Valid properties for filtering are package name and host pool.
 */
export const AppAttachPackageListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AppAttachPackageListByResourceGroupInput,
    outputSchema: AppAttachPackageListByResourceGroupOutput,
  }));
// Input Schema
export const AppAttachPackageListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $filter: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DesktopVirtualization/appAttachPackages",
    }),
  );
export type AppAttachPackageListBySubscriptionInput =
  typeof AppAttachPackageListBySubscriptionInput.Type;

// Output Schema
export const AppAttachPackageListBySubscriptionOutput =
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
export type AppAttachPackageListBySubscriptionOutput =
  typeof AppAttachPackageListBySubscriptionOutput.Type;

// The operation
/**
 * List App Attach packages in subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param $filter - OData filter expression. Valid properties for filtering are package name, host pool, and resource group.
 */
export const AppAttachPackageListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AppAttachPackageListBySubscriptionInput,
    outputSchema: AppAttachPackageListBySubscriptionOutput,
  }));
// Input Schema
export const AppAttachPackageUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DesktopVirtualization/appAttachPackages/{appAttachPackageName}",
    }),
  );
export type AppAttachPackageUpdateInput =
  typeof AppAttachPackageUpdateInput.Type;

// Output Schema
export const AppAttachPackageUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type AppAttachPackageUpdateOutput =
  typeof AppAttachPackageUpdateOutput.Type;

// The operation
/**
 * Update an App Attach Package
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const AppAttachPackageUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AppAttachPackageUpdateInput,
    outputSchema: AppAttachPackageUpdateOutput,
  }),
);
// Input Schema
export const ApplicationGroupsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DesktopVirtualization/applicationGroups/{applicationGroupName}",
    }),
  );
export type ApplicationGroupsDeleteInput =
  typeof ApplicationGroupsDeleteInput.Type;

// Output Schema
export const ApplicationGroupsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ApplicationGroupsDeleteOutput =
  typeof ApplicationGroupsDeleteOutput.Type;

// The operation
/**
 * Remove an applicationGroup.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ApplicationGroupsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ApplicationGroupsDeleteInput,
    outputSchema: ApplicationGroupsDeleteOutput,
  }),
);
// Input Schema
export const ApplicationsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DesktopVirtualization/applicationGroups/{applicationGroupName}/applications/{applicationName}",
    }),
  );
export type ApplicationsDeleteInput = typeof ApplicationsDeleteInput.Type;

// Output Schema
export const ApplicationsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ApplicationsDeleteOutput = typeof ApplicationsDeleteOutput.Type;

// The operation
/**
 * Remove an application.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ApplicationsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ApplicationsDeleteInput,
  outputSchema: ApplicationsDeleteOutput,
}));
// Input Schema
export const HostPoolsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
  force: Schema.optional(Schema.Boolean),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DesktopVirtualization/hostPools/{hostPoolName}",
  }),
);
export type HostPoolsDeleteInput = typeof HostPoolsDeleteInput.Type;

// Output Schema
export const HostPoolsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type HostPoolsDeleteOutput = typeof HostPoolsDeleteOutput.Type;

// The operation
/**
 * Remove a host pool.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param force - Force flag to delete sessionHost.
 */
export const HostPoolsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: HostPoolsDeleteInput,
  outputSchema: HostPoolsDeleteOutput,
}));
// Input Schema
export const HostPoolsListRegistrationTokensInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DesktopVirtualization/hostPools/{hostPoolName}/listRegistrationTokens",
    }),
  );
export type HostPoolsListRegistrationTokensInput =
  typeof HostPoolsListRegistrationTokensInput.Type;

// Output Schema
export const HostPoolsListRegistrationTokensOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          expirationTime: Schema.optional(Schema.NullOr(Schema.String)),
          token: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type HostPoolsListRegistrationTokensOutput =
  typeof HostPoolsListRegistrationTokensOutput.Type;

// The operation
/**
 * Operation to list the RegistrationTokens associated with the HostPool
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const HostPoolsListRegistrationTokens =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: HostPoolsListRegistrationTokensInput,
    outputSchema: HostPoolsListRegistrationTokensOutput,
  }));
// Input Schema
export const HostPoolsRetrieveRegistrationTokenInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DesktopVirtualization/hostPools/{hostPoolName}/retrieveRegistrationToken",
    }),
  );
export type HostPoolsRetrieveRegistrationTokenInput =
  typeof HostPoolsRetrieveRegistrationTokenInput.Type;

// Output Schema
export const HostPoolsRetrieveRegistrationTokenOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    expirationTime: Schema.optional(Schema.NullOr(Schema.String)),
    token: Schema.optional(Schema.String),
    registrationTokenOperation: Schema.optional(
      Schema.Literals(["Delete", "None", "Update"]),
    ),
  });
export type HostPoolsRetrieveRegistrationTokenOutput =
  typeof HostPoolsRetrieveRegistrationTokenOutput.Type;

// The operation
/**
 * Registration token of the host pool.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const HostPoolsRetrieveRegistrationToken =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: HostPoolsRetrieveRegistrationTokenInput,
    outputSchema: HostPoolsRetrieveRegistrationTokenOutput,
  }));
// Input Schema
export const MSIXPackagesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.DesktopVirtualization/hostPools/{hostPoolName}/msixPackages/{msixPackageFullName}",
    }),
  );
export type MSIXPackagesDeleteInput = typeof MSIXPackagesDeleteInput.Type;

// Output Schema
export const MSIXPackagesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type MSIXPackagesDeleteOutput = typeof MSIXPackagesDeleteOutput.Type;

// The operation
/**
 * Remove an MSIX Package.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const MSIXPackagesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: MSIXPackagesDeleteInput,
  outputSchema: MSIXPackagesDeleteOutput,
}));
// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.DesktopVirtualization/operations",
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
        isDataAction: Schema.optional(Schema.Boolean),
        properties: Schema.optional(
          Schema.Struct({
            serviceSpecification: Schema.optional(
              Schema.Struct({
                logSpecifications: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      name: Schema.optional(Schema.String),
                      displayName: Schema.optional(Schema.String),
                      blobDuration: Schema.optional(Schema.String),
                    }),
                  ),
                ),
              }),
            ),
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
 * List all of the available operations the Desktop Virtualization resource provider supports.
 *
 * @param api-version - The API version to use for this operation.
 */
export const OperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationsListInput,
  outputSchema: OperationsListOutput,
}));
// Input Schema
export const PrivateEndpointConnectionsDeleteByHostPoolInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DesktopVirtualization/hostPools/{hostPoolName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type PrivateEndpointConnectionsDeleteByHostPoolInput =
  typeof PrivateEndpointConnectionsDeleteByHostPoolInput.Type;

// Output Schema
export const PrivateEndpointConnectionsDeleteByHostPoolOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PrivateEndpointConnectionsDeleteByHostPoolOutput =
  typeof PrivateEndpointConnectionsDeleteByHostPoolOutput.Type;

// The operation
/**
 * Remove a connection.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateEndpointConnectionName - The name of the private endpoint connection associated with the Azure resource.
 */
export const PrivateEndpointConnectionsDeleteByHostPool =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsDeleteByHostPoolInput,
    outputSchema: PrivateEndpointConnectionsDeleteByHostPoolOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsDeleteByWorkspaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DesktopVirtualization/workspaces/{workspaceName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type PrivateEndpointConnectionsDeleteByWorkspaceInput =
  typeof PrivateEndpointConnectionsDeleteByWorkspaceInput.Type;

// Output Schema
export const PrivateEndpointConnectionsDeleteByWorkspaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PrivateEndpointConnectionsDeleteByWorkspaceOutput =
  typeof PrivateEndpointConnectionsDeleteByWorkspaceOutput.Type;

// The operation
/**
 * Remove a connection.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateEndpointConnectionName - The name of the private endpoint connection associated with the Azure resource.
 */
export const PrivateEndpointConnectionsDeleteByWorkspace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsDeleteByWorkspaceInput,
    outputSchema: PrivateEndpointConnectionsDeleteByWorkspaceOutput,
  }));
// Input Schema
export const ScalingPlanPersonalSchedulesCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DesktopVirtualization/scalingPlans/{scalingPlanName}/personalSchedules/{scalingPlanScheduleName}",
    }),
  );
export type ScalingPlanPersonalSchedulesCreateInput =
  typeof ScalingPlanPersonalSchedulesCreateInput.Type;

// Output Schema
export const ScalingPlanPersonalSchedulesCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ScalingPlanPersonalSchedulesCreateOutput =
  typeof ScalingPlanPersonalSchedulesCreateOutput.Type;

// The operation
/**
 * Create or update a ScalingPlanPersonalSchedule.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ScalingPlanPersonalSchedulesCreate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ScalingPlanPersonalSchedulesCreateInput,
    outputSchema: ScalingPlanPersonalSchedulesCreateOutput,
  }));
// Input Schema
export const ScalingPlanPersonalSchedulesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DesktopVirtualization/scalingPlans/{scalingPlanName}/personalSchedules/{scalingPlanScheduleName}",
    }),
  );
export type ScalingPlanPersonalSchedulesDeleteInput =
  typeof ScalingPlanPersonalSchedulesDeleteInput.Type;

// Output Schema
export const ScalingPlanPersonalSchedulesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ScalingPlanPersonalSchedulesDeleteOutput =
  typeof ScalingPlanPersonalSchedulesDeleteOutput.Type;

// The operation
/**
 * Remove a ScalingPlanPersonalSchedule.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ScalingPlanPersonalSchedulesDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ScalingPlanPersonalSchedulesDeleteInput,
    outputSchema: ScalingPlanPersonalSchedulesDeleteOutput,
  }));
// Input Schema
export const ScalingPlanPersonalSchedulesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DesktopVirtualization/scalingPlans/{scalingPlanName}/personalSchedules/{scalingPlanScheduleName}",
    }),
  );
export type ScalingPlanPersonalSchedulesGetInput =
  typeof ScalingPlanPersonalSchedulesGetInput.Type;

// Output Schema
export const ScalingPlanPersonalSchedulesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ScalingPlanPersonalSchedulesGetOutput =
  typeof ScalingPlanPersonalSchedulesGetOutput.Type;

// The operation
/**
 * Get a ScalingPlanPersonalSchedule.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ScalingPlanPersonalSchedulesGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ScalingPlanPersonalSchedulesGetInput,
    outputSchema: ScalingPlanPersonalSchedulesGetOutput,
  }));
// Input Schema
export const ScalingPlanPersonalSchedulesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    pageSize: Schema.optional(Schema.Number),
    isDescending: Schema.optional(Schema.Boolean),
    initialSkip: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DesktopVirtualization/scalingPlans/{scalingPlanName}/personalSchedules",
    }),
  );
export type ScalingPlanPersonalSchedulesListInput =
  typeof ScalingPlanPersonalSchedulesListInput.Type;

// Output Schema
export const ScalingPlanPersonalSchedulesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ScalingPlanPersonalSchedulesListOutput =
  typeof ScalingPlanPersonalSchedulesListOutput.Type;

// The operation
/**
 * List ScalingPlanPersonalSchedules.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param pageSize - Number of items per page.
 * @param isDescending - Indicates whether the collection is descending.
 * @param initialSkip - Initial number of items to skip.
 */
export const ScalingPlanPersonalSchedulesList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ScalingPlanPersonalSchedulesListInput,
    outputSchema: ScalingPlanPersonalSchedulesListOutput,
  }));
// Input Schema
export const ScalingPlanPersonalSchedulesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DesktopVirtualization/scalingPlans/{scalingPlanName}/personalSchedules/{scalingPlanScheduleName}",
    }),
  );
export type ScalingPlanPersonalSchedulesUpdateInput =
  typeof ScalingPlanPersonalSchedulesUpdateInput.Type;

// Output Schema
export const ScalingPlanPersonalSchedulesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ScalingPlanPersonalSchedulesUpdateOutput =
  typeof ScalingPlanPersonalSchedulesUpdateOutput.Type;

// The operation
/**
 * Update a ScalingPlanPersonalSchedule.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ScalingPlanPersonalSchedulesUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ScalingPlanPersonalSchedulesUpdateInput,
    outputSchema: ScalingPlanPersonalSchedulesUpdateOutput,
  }));
// Input Schema
export const ScalingPlanPooledSchedulesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DesktopVirtualization/scalingPlans/{scalingPlanName}/pooledSchedules/{scalingPlanScheduleName}",
    }),
  );
export type ScalingPlanPooledSchedulesDeleteInput =
  typeof ScalingPlanPooledSchedulesDeleteInput.Type;

// Output Schema
export const ScalingPlanPooledSchedulesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ScalingPlanPooledSchedulesDeleteOutput =
  typeof ScalingPlanPooledSchedulesDeleteOutput.Type;

// The operation
/**
 * Remove a ScalingPlanPooledSchedule.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ScalingPlanPooledSchedulesDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ScalingPlanPooledSchedulesDeleteInput,
    outputSchema: ScalingPlanPooledSchedulesDeleteOutput,
  }));
// Input Schema
export const ScalingPlansDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DesktopVirtualization/scalingPlans/{scalingPlanName}",
    }),
  );
export type ScalingPlansDeleteInput = typeof ScalingPlansDeleteInput.Type;

// Output Schema
export const ScalingPlansDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ScalingPlansDeleteOutput = typeof ScalingPlansDeleteOutput.Type;

// The operation
/**
 * Remove a scaling plan.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ScalingPlansDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ScalingPlansDeleteInput,
  outputSchema: ScalingPlansDeleteOutput,
}));
// Input Schema
export const SessionHostsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    force: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DesktopVirtualization/hostPools/{hostPoolName}/sessionHosts/{sessionHostName}",
    }),
  );
export type SessionHostsDeleteInput = typeof SessionHostsDeleteInput.Type;

// Output Schema
export const SessionHostsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SessionHostsDeleteOutput = typeof SessionHostsDeleteOutput.Type;

// The operation
/**
 * Remove a SessionHost.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param force - Force flag to force sessionHost deletion even when userSession exists.
 */
export const SessionHostsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SessionHostsDeleteInput,
  outputSchema: SessionHostsDeleteOutput,
}));
// Input Schema
export const UserSessionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    force: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DesktopVirtualization/hostPools/{hostPoolName}/sessionHosts/{sessionHostName}/userSessions/{userSessionId}",
    }),
  );
export type UserSessionsDeleteInput = typeof UserSessionsDeleteInput.Type;

// Output Schema
export const UserSessionsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type UserSessionsDeleteOutput = typeof UserSessionsDeleteOutput.Type;

// The operation
/**
 * Remove a userSession.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param force - Force flag to login off userSession.
 */
export const UserSessionsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: UserSessionsDeleteInput,
  outputSchema: UserSessionsDeleteOutput,
}));
// Input Schema
export const UserSessionsDisconnectInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DesktopVirtualization/hostPools/{hostPoolName}/sessionHosts/{sessionHostName}/userSessions/{userSessionId}/disconnect",
    }),
  );
export type UserSessionsDisconnectInput =
  typeof UserSessionsDisconnectInput.Type;

// Output Schema
export const UserSessionsDisconnectOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type UserSessionsDisconnectOutput =
  typeof UserSessionsDisconnectOutput.Type;

// The operation
/**
 * Disconnect a userSession.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const UserSessionsDisconnect = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: UserSessionsDisconnectInput,
    outputSchema: UserSessionsDisconnectOutput,
  }),
);
// Input Schema
export const UserSessionsSendMessageInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DesktopVirtualization/hostPools/{hostPoolName}/sessionHosts/{sessionHostName}/userSessions/{userSessionId}/sendMessage",
    }),
  );
export type UserSessionsSendMessageInput =
  typeof UserSessionsSendMessageInput.Type;

// Output Schema
export const UserSessionsSendMessageOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type UserSessionsSendMessageOutput =
  typeof UserSessionsSendMessageOutput.Type;

// The operation
/**
 * Send a message to a user.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const UserSessionsSendMessage = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: UserSessionsSendMessageInput,
    outputSchema: UserSessionsSendMessageOutput,
  }),
);
// Input Schema
export const WorkspacesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DesktopVirtualization/workspaces/{workspaceName}",
  }),
);
export type WorkspacesDeleteInput = typeof WorkspacesDeleteInput.Type;

// Output Schema
export const WorkspacesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type WorkspacesDeleteOutput = typeof WorkspacesDeleteOutput.Type;

// The operation
/**
 * Remove a workspace.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const WorkspacesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WorkspacesDeleteInput,
  outputSchema: WorkspacesDeleteOutput,
}));
