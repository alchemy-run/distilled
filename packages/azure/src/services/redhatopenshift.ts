/**
 * Azure Redhatopenshift API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";
import { SensitiveString } from "../sensitive.ts";

// Input Schema
export const OpenShiftClustersCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RedHatOpenShift/openShiftClusters/{resourceName}",
    }),
  );
export type OpenShiftClustersCreateOrUpdateInput =
  typeof OpenShiftClustersCreateOrUpdateInput.Type;

// Output Schema
export const OpenShiftClustersCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type OpenShiftClustersCreateOrUpdateOutput =
  typeof OpenShiftClustersCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a OpenShift cluster with the specified subscription, resource group and resource name.
 *
 * The operation returns properties of a OpenShift cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceName - The name of the OpenShift cluster resource.
 */
export const OpenShiftClustersCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: OpenShiftClustersCreateOrUpdateInput,
    outputSchema: OpenShiftClustersCreateOrUpdateOutput,
  }));
// Input Schema
export const OpenShiftClustersDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RedHatOpenShift/openShiftClusters/{resourceName}",
    }),
  );
export type OpenShiftClustersDeleteInput =
  typeof OpenShiftClustersDeleteInput.Type;

// Output Schema
export const OpenShiftClustersDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type OpenShiftClustersDeleteOutput =
  typeof OpenShiftClustersDeleteOutput.Type;

// The operation
/**
 * Deletes a OpenShift cluster with the specified subscription, resource group and resource name.
 *
 * The operation returns nothing.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceName - The name of the OpenShift cluster resource.
 */
export const OpenShiftClustersDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: OpenShiftClustersDeleteInput,
    outputSchema: OpenShiftClustersDeleteOutput,
  }),
);
// Input Schema
export const OpenShiftClustersGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RedHatOpenShift/openShiftClusters/{resourceName}",
    }),
  );
export type OpenShiftClustersGetInput = typeof OpenShiftClustersGetInput.Type;

// Output Schema
export const OpenShiftClustersGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type OpenShiftClustersGetOutput = typeof OpenShiftClustersGetOutput.Type;

// The operation
/**
 * Gets a OpenShift cluster with the specified subscription, resource group and resource name.
 *
 * The operation returns properties of a OpenShift cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceName - The name of the OpenShift cluster resource.
 */
export const OpenShiftClustersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: OpenShiftClustersGetInput,
    outputSchema: OpenShiftClustersGetOutput,
  }),
);
// Input Schema
export const OpenShiftClustersListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.RedHatOpenShift/openShiftClusters",
    }),
  );
export type OpenShiftClustersListInput = typeof OpenShiftClustersListInput.Type;

// Output Schema
export const OpenShiftClustersListOutput =
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
export type OpenShiftClustersListOutput =
  typeof OpenShiftClustersListOutput.Type;

// The operation
/**
 * Lists OpenShift clusters in the specified subscription.
 *
 * The operation returns properties of each OpenShift cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const OpenShiftClustersList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: OpenShiftClustersListInput,
    outputSchema: OpenShiftClustersListOutput,
  }),
);
// Input Schema
export const OpenShiftClustersListAdminCredentialsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RedHatOpenShift/openShiftClusters/{resourceName}/listAdminCredentials",
    }),
  );
export type OpenShiftClustersListAdminCredentialsInput =
  typeof OpenShiftClustersListAdminCredentialsInput.Type;

// Output Schema
export const OpenShiftClustersListAdminCredentialsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    kubeconfig: Schema.optional(Schema.String),
  });
export type OpenShiftClustersListAdminCredentialsOutput =
  typeof OpenShiftClustersListAdminCredentialsOutput.Type;

// The operation
/**
 * Lists admin kubeconfig of an OpenShift cluster with the specified subscription, resource group and resource name.
 *
 * The operation returns the admin kubeconfig.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceName - The name of the OpenShift cluster resource.
 */
export const OpenShiftClustersListAdminCredentials =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: OpenShiftClustersListAdminCredentialsInput,
    outputSchema: OpenShiftClustersListAdminCredentialsOutput,
  }));
// Input Schema
export const OpenShiftClustersListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RedHatOpenShift/openShiftClusters",
    }),
  );
export type OpenShiftClustersListByResourceGroupInput =
  typeof OpenShiftClustersListByResourceGroupInput.Type;

// Output Schema
export const OpenShiftClustersListByResourceGroupOutput =
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
export type OpenShiftClustersListByResourceGroupOutput =
  typeof OpenShiftClustersListByResourceGroupOutput.Type;

// The operation
/**
 * Lists OpenShift clusters in the specified subscription and resource group.
 *
 * The operation returns properties of each OpenShift cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const OpenShiftClustersListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: OpenShiftClustersListByResourceGroupInput,
    outputSchema: OpenShiftClustersListByResourceGroupOutput,
  }));
// Input Schema
export const OpenShiftClustersListCredentialsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RedHatOpenShift/openShiftClusters/{resourceName}/listCredentials",
    }),
  );
export type OpenShiftClustersListCredentialsInput =
  typeof OpenShiftClustersListCredentialsInput.Type;

// Output Schema
export const OpenShiftClustersListCredentialsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    kubeadminUsername: Schema.optional(Schema.String),
    kubeadminPassword: Schema.optional(SensitiveString),
  });
export type OpenShiftClustersListCredentialsOutput =
  typeof OpenShiftClustersListCredentialsOutput.Type;

// The operation
/**
 * Lists credentials of an OpenShift cluster with the specified subscription, resource group and resource name.
 *
 * The operation returns the credentials.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceName - The name of the OpenShift cluster resource.
 */
export const OpenShiftClustersListCredentials =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: OpenShiftClustersListCredentialsInput,
    outputSchema: OpenShiftClustersListCredentialsOutput,
  }));
// Input Schema
export const OpenShiftClustersUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RedHatOpenShift/openShiftClusters/{resourceName}",
    }),
  );
export type OpenShiftClustersUpdateInput =
  typeof OpenShiftClustersUpdateInput.Type;

// Output Schema
export const OpenShiftClustersUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type OpenShiftClustersUpdateOutput =
  typeof OpenShiftClustersUpdateOutput.Type;

// The operation
/**
 * Creates or updates a OpenShift cluster with the specified subscription, resource group and resource name.
 *
 * The operation returns properties of a OpenShift cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceName - The name of the OpenShift cluster resource.
 */
export const OpenShiftClustersUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: OpenShiftClustersUpdateInput,
    outputSchema: OpenShiftClustersUpdateOutput,
  }),
);
// Input Schema
export const OpenShiftVersionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    openShiftVersion: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.RedHatOpenShift/locations/{location}/openShiftVersions/{openShiftVersion}",
    }),
  );
export type OpenShiftVersionsGetInput = typeof OpenShiftVersionsGetInput.Type;

// Output Schema
export const OpenShiftVersionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type OpenShiftVersionsGetOutput = typeof OpenShiftVersionsGetOutput.Type;

// The operation
/**
 * Gets an available OpenShift version to install in the specified location.
 *
 * This operation returns installable OpenShift version as a string.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param location - The name of the Azure region.
 * @param openShiftVersion - The desired version value of the OpenShiftVersion resource.
 */
export const OpenShiftVersionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: OpenShiftVersionsGetInput,
    outputSchema: OpenShiftVersionsGetOutput,
  }),
);
// Input Schema
export const OpenShiftVersionsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.RedHatOpenShift/locations/{location}/openShiftVersions",
    }),
  );
export type OpenShiftVersionsListInput = typeof OpenShiftVersionsListInput.Type;

// Output Schema
export const OpenShiftVersionsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type OpenShiftVersionsListOutput =
  typeof OpenShiftVersionsListOutput.Type;

// The operation
/**
 * Lists all OpenShift versions available to install in the specified location.
 *
 * The operation returns the installable OpenShift versions as a string.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param location - The name of the Azure region.
 */
export const OpenShiftVersionsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: OpenShiftVersionsListInput,
    outputSchema: OpenShiftVersionsListOutput,
  }),
);
// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.RedHatOpenShift/operations",
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
      }),
    ),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type OperationsListOutput = typeof OperationsListOutput.Type;

// The operation
/**
 * Lists all of the available RP operations.
 *
 * The operation returns the RP operations.
 *
 * @param api-version - The API version to use for this operation.
 */
export const OperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationsListInput,
  outputSchema: OperationsListOutput,
}));
// Input Schema
export const PlatformWorkloadIdentityRoleSetGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    openShiftMinorVersion: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.RedHatOpenShift/locations/{location}/platformWorkloadIdentityRoleSets/{openShiftMinorVersion}",
    }),
  );
export type PlatformWorkloadIdentityRoleSetGetInput =
  typeof PlatformWorkloadIdentityRoleSetGetInput.Type;

// Output Schema
export const PlatformWorkloadIdentityRoleSetGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PlatformWorkloadIdentityRoleSetGetOutput =
  typeof PlatformWorkloadIdentityRoleSetGetOutput.Type;

// The operation
/**
 * Gets a mapping of an OpenShift version to identity requirements, which includes operatorName, roleDefinitionName, roleDefinitionId, and serviceAccounts.
 *
 * This operation returns Platform Workload Identity Role Set as a string
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param location - The name of the Azure region.
 * @param openShiftMinorVersion - The desired version value of the PlatformWorkloadIdentityRoleSet resource.
 */
export const PlatformWorkloadIdentityRoleSetGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PlatformWorkloadIdentityRoleSetGetInput,
    outputSchema: PlatformWorkloadIdentityRoleSetGetOutput,
  }));
// Input Schema
export const PlatformWorkloadIdentityRoleSetsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.RedHatOpenShift/locations/{location}/platformWorkloadIdentityRoleSets",
    }),
  );
export type PlatformWorkloadIdentityRoleSetsListInput =
  typeof PlatformWorkloadIdentityRoleSetsListInput.Type;

// Output Schema
export const PlatformWorkloadIdentityRoleSetsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type PlatformWorkloadIdentityRoleSetsListOutput =
  typeof PlatformWorkloadIdentityRoleSetsListOutput.Type;

// The operation
/**
 * Lists a mapping of OpenShift versions to identity requirements, which include operatorName, roleDefinitionName, roleDefinitionId, and serviceAccounts.
 *
 * This operation returns a list of Platform Workload Identity Role Sets as a string
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param location - The name of the Azure region.
 */
export const PlatformWorkloadIdentityRoleSetsList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PlatformWorkloadIdentityRoleSetsListInput,
    outputSchema: PlatformWorkloadIdentityRoleSetsListOutput,
  }));
