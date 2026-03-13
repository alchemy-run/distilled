/**
 * Azure AzureKusto API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const AttachedDatabaseConfigurationsCheckNameAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/attachedDatabaseConfigurationCheckNameAvailability",
    }),
  );
export type AttachedDatabaseConfigurationsCheckNameAvailabilityInput =
  typeof AttachedDatabaseConfigurationsCheckNameAvailabilityInput.Type;

// Output Schema
export const AttachedDatabaseConfigurationsCheckNameAvailabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nameAvailable: Schema.optional(Schema.Boolean),
    name: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
    reason: Schema.optional(Schema.Literals(["Invalid", "AlreadyExists"])),
  });
export type AttachedDatabaseConfigurationsCheckNameAvailabilityOutput =
  typeof AttachedDatabaseConfigurationsCheckNameAvailabilityOutput.Type;

// The operation
/**
 * Checks that the attached database configuration resource name is valid and is not already in use.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const AttachedDatabaseConfigurationsCheckNameAvailability =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AttachedDatabaseConfigurationsCheckNameAvailabilityInput,
    outputSchema: AttachedDatabaseConfigurationsCheckNameAvailabilityOutput,
  }));
// Input Schema
export const AttachedDatabaseConfigurationsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/attachedDatabaseConfigurations/{attachedDatabaseConfigurationName}",
    }),
  );
export type AttachedDatabaseConfigurationsCreateOrUpdateInput =
  typeof AttachedDatabaseConfigurationsCreateOrUpdateInput.Type;

// Output Schema
export const AttachedDatabaseConfigurationsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type AttachedDatabaseConfigurationsCreateOrUpdateOutput =
  typeof AttachedDatabaseConfigurationsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates an attached database configuration.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const AttachedDatabaseConfigurationsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AttachedDatabaseConfigurationsCreateOrUpdateInput,
    outputSchema: AttachedDatabaseConfigurationsCreateOrUpdateOutput,
  }));
// Input Schema
export const AttachedDatabaseConfigurationsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/attachedDatabaseConfigurations/{attachedDatabaseConfigurationName}",
    }),
  );
export type AttachedDatabaseConfigurationsDeleteInput =
  typeof AttachedDatabaseConfigurationsDeleteInput.Type;

// Output Schema
export const AttachedDatabaseConfigurationsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AttachedDatabaseConfigurationsDeleteOutput =
  typeof AttachedDatabaseConfigurationsDeleteOutput.Type;

// The operation
/**
 * Deletes the attached database configuration with the given name.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const AttachedDatabaseConfigurationsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AttachedDatabaseConfigurationsDeleteInput,
    outputSchema: AttachedDatabaseConfigurationsDeleteOutput,
  }));
// Input Schema
export const AttachedDatabaseConfigurationsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/attachedDatabaseConfigurations/{attachedDatabaseConfigurationName}",
    }),
  );
export type AttachedDatabaseConfigurationsGetInput =
  typeof AttachedDatabaseConfigurationsGetInput.Type;

// Output Schema
export const AttachedDatabaseConfigurationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type AttachedDatabaseConfigurationsGetOutput =
  typeof AttachedDatabaseConfigurationsGetOutput.Type;

// The operation
/**
 * Returns an attached database configuration.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const AttachedDatabaseConfigurationsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AttachedDatabaseConfigurationsGetInput,
    outputSchema: AttachedDatabaseConfigurationsGetOutput,
  }));
// Input Schema
export const AttachedDatabaseConfigurationsListByClusterInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/attachedDatabaseConfigurations",
    }),
  );
export type AttachedDatabaseConfigurationsListByClusterInput =
  typeof AttachedDatabaseConfigurationsListByClusterInput.Type;

// Output Schema
export const AttachedDatabaseConfigurationsListByClusterOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
  });
export type AttachedDatabaseConfigurationsListByClusterOutput =
  typeof AttachedDatabaseConfigurationsListByClusterOutput.Type;

// The operation
/**
 * Returns the list of attached database configurations of the given Kusto cluster.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const AttachedDatabaseConfigurationsListByCluster =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AttachedDatabaseConfigurationsListByClusterInput,
    outputSchema: AttachedDatabaseConfigurationsListByClusterOutput,
  }));
// Input Schema
export const ClusterPrincipalAssignmentsCheckNameAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/checkPrincipalAssignmentNameAvailability",
    }),
  );
export type ClusterPrincipalAssignmentsCheckNameAvailabilityInput =
  typeof ClusterPrincipalAssignmentsCheckNameAvailabilityInput.Type;

// Output Schema
export const ClusterPrincipalAssignmentsCheckNameAvailabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nameAvailable: Schema.optional(Schema.Boolean),
    name: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
    reason: Schema.optional(Schema.Literals(["Invalid", "AlreadyExists"])),
  });
export type ClusterPrincipalAssignmentsCheckNameAvailabilityOutput =
  typeof ClusterPrincipalAssignmentsCheckNameAvailabilityOutput.Type;

// The operation
/**
 * Checks that the principal assignment name is valid and is not already in use.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const ClusterPrincipalAssignmentsCheckNameAvailability =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ClusterPrincipalAssignmentsCheckNameAvailabilityInput,
    outputSchema: ClusterPrincipalAssignmentsCheckNameAvailabilityOutput,
  }));
// Input Schema
export const ClusterPrincipalAssignmentsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/principalAssignments/{principalAssignmentName}",
    }),
  );
export type ClusterPrincipalAssignmentsCreateOrUpdateInput =
  typeof ClusterPrincipalAssignmentsCreateOrUpdateInput.Type;

// Output Schema
export const ClusterPrincipalAssignmentsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ClusterPrincipalAssignmentsCreateOrUpdateOutput =
  typeof ClusterPrincipalAssignmentsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a Kusto cluster principalAssignment.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const ClusterPrincipalAssignmentsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ClusterPrincipalAssignmentsCreateOrUpdateInput,
    outputSchema: ClusterPrincipalAssignmentsCreateOrUpdateOutput,
  }));
// Input Schema
export const ClusterPrincipalAssignmentsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/principalAssignments/{principalAssignmentName}",
    }),
  );
export type ClusterPrincipalAssignmentsDeleteInput =
  typeof ClusterPrincipalAssignmentsDeleteInput.Type;

// Output Schema
export const ClusterPrincipalAssignmentsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ClusterPrincipalAssignmentsDeleteOutput =
  typeof ClusterPrincipalAssignmentsDeleteOutput.Type;

// The operation
/**
 * Deletes a Kusto cluster principalAssignment.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const ClusterPrincipalAssignmentsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ClusterPrincipalAssignmentsDeleteInput,
    outputSchema: ClusterPrincipalAssignmentsDeleteOutput,
  }));
// Input Schema
export const ClusterPrincipalAssignmentsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/principalAssignments/{principalAssignmentName}",
    }),
  );
export type ClusterPrincipalAssignmentsGetInput =
  typeof ClusterPrincipalAssignmentsGetInput.Type;

// Output Schema
export const ClusterPrincipalAssignmentsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ClusterPrincipalAssignmentsGetOutput =
  typeof ClusterPrincipalAssignmentsGetOutput.Type;

// The operation
/**
 * Gets a Kusto cluster principalAssignment.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const ClusterPrincipalAssignmentsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ClusterPrincipalAssignmentsGetInput,
    outputSchema: ClusterPrincipalAssignmentsGetOutput,
  }));
// Input Schema
export const ClusterPrincipalAssignmentsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/principalAssignments",
    }),
  );
export type ClusterPrincipalAssignmentsListInput =
  typeof ClusterPrincipalAssignmentsListInput.Type;

// Output Schema
export const ClusterPrincipalAssignmentsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
  });
export type ClusterPrincipalAssignmentsListOutput =
  typeof ClusterPrincipalAssignmentsListOutput.Type;

// The operation
/**
 * Lists all Kusto cluster principalAssignments.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const ClusterPrincipalAssignmentsList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ClusterPrincipalAssignmentsListInput,
    outputSchema: ClusterPrincipalAssignmentsListOutput,
  }));
// Input Schema
export const ClustersAddCalloutPoliciesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/addCalloutPolicies",
    }),
  );
export type ClustersAddCalloutPoliciesInput =
  typeof ClustersAddCalloutPoliciesInput.Type;

// Output Schema
export const ClustersAddCalloutPoliciesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ClustersAddCalloutPoliciesOutput =
  typeof ClustersAddCalloutPoliciesOutput.Type;

// The operation
/**
 * Adds a list of callout policies for engine services.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const ClustersAddCalloutPolicies = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ClustersAddCalloutPoliciesInput,
    outputSchema: ClustersAddCalloutPoliciesOutput,
  }),
);
// Input Schema
export const ClustersAddLanguageExtensionsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/addLanguageExtensions",
    }),
  );
export type ClustersAddLanguageExtensionsInput =
  typeof ClustersAddLanguageExtensionsInput.Type;

// Output Schema
export const ClustersAddLanguageExtensionsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ClustersAddLanguageExtensionsOutput =
  typeof ClustersAddLanguageExtensionsOutput.Type;

// The operation
/**
 * Add a list of language extensions that can run within KQL queries.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const ClustersAddLanguageExtensions =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ClustersAddLanguageExtensionsInput,
    outputSchema: ClustersAddLanguageExtensionsOutput,
  }));
// Input Schema
export const ClustersCheckNameAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Kusto/locations/{location}/checkNameAvailability",
    }),
  );
export type ClustersCheckNameAvailabilityInput =
  typeof ClustersCheckNameAvailabilityInput.Type;

// Output Schema
export const ClustersCheckNameAvailabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nameAvailable: Schema.optional(Schema.Boolean),
    name: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
    reason: Schema.optional(Schema.Literals(["Invalid", "AlreadyExists"])),
  });
export type ClustersCheckNameAvailabilityOutput =
  typeof ClustersCheckNameAvailabilityOutput.Type;

// The operation
/**
 * Checks that the cluster name is valid and is not already in use.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param location - The name of Azure region.
 */
export const ClustersCheckNameAvailability =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ClustersCheckNameAvailabilityInput,
    outputSchema: ClustersCheckNameAvailabilityOutput,
  }));
// Input Schema
export const ClustersCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}",
    }),
  );
export type ClustersCreateOrUpdateInput =
  typeof ClustersCreateOrUpdateInput.Type;

// Output Schema
export const ClustersCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ClustersCreateOrUpdateOutput =
  typeof ClustersCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a Kusto cluster.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param If-Match - The ETag of the cluster. Omit this value to always overwrite the current cluster. Specify the last-seen ETag value to prevent accidentally overwriting concurrent changes.
 * @param If-None-Match - Set to '*' to allow a new cluster to be created, but to prevent updating an existing cluster. Other values will result in a 412 Pre-condition Failed response.
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const ClustersCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ClustersCreateOrUpdateInput,
    outputSchema: ClustersCreateOrUpdateOutput,
  }),
);
// Input Schema
export const ClustersDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}",
  }),
);
export type ClustersDeleteInput = typeof ClustersDeleteInput.Type;

// Output Schema
export const ClustersDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ClustersDeleteOutput = typeof ClustersDeleteOutput.Type;

// The operation
/**
 * Deletes a Kusto cluster.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const ClustersDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ClustersDeleteInput,
  outputSchema: ClustersDeleteOutput,
}));
// Input Schema
export const ClustersDetachFollowerDatabasesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/detachFollowerDatabases",
    }),
  );
export type ClustersDetachFollowerDatabasesInput =
  typeof ClustersDetachFollowerDatabasesInput.Type;

// Output Schema
export const ClustersDetachFollowerDatabasesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ClustersDetachFollowerDatabasesOutput =
  typeof ClustersDetachFollowerDatabasesOutput.Type;

// The operation
/**
 * Detaches all followers of a database owned by this cluster.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const ClustersDetachFollowerDatabases =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ClustersDetachFollowerDatabasesInput,
    outputSchema: ClustersDetachFollowerDatabasesOutput,
  }));
// Input Schema
export const ClustersDiagnoseVirtualNetworkInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/diagnoseVirtualNetwork",
    }),
  );
export type ClustersDiagnoseVirtualNetworkInput =
  typeof ClustersDiagnoseVirtualNetworkInput.Type;

// Output Schema
export const ClustersDiagnoseVirtualNetworkOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    findings: Schema.optional(Schema.Array(Schema.String)),
  });
export type ClustersDiagnoseVirtualNetworkOutput =
  typeof ClustersDiagnoseVirtualNetworkOutput.Type;

// The operation
/**
 * Diagnoses network connectivity status for external resources on which the service is dependent on.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const ClustersDiagnoseVirtualNetwork =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ClustersDiagnoseVirtualNetworkInput,
    outputSchema: ClustersDiagnoseVirtualNetworkOutput,
  }));
// Input Schema
export const ClustersGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}",
  }),
);
export type ClustersGetInput = typeof ClustersGetInput.Type;

// Output Schema
export const ClustersGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type ClustersGetOutput = typeof ClustersGetOutput.Type;

// The operation
/**
 * Gets a Kusto cluster.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const ClustersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ClustersGetInput,
  outputSchema: ClustersGetOutput,
}));
// Input Schema
export const ClustersListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.Kusto/clusters",
  }),
);
export type ClustersListInput = typeof ClustersListInput.Type;

// Output Schema
export const ClustersListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
  ),
});
export type ClustersListOutput = typeof ClustersListOutput.Type;

// The operation
/**
 * Lists all Kusto clusters within a subscription.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const ClustersList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ClustersListInput,
  outputSchema: ClustersListOutput,
}));
// Input Schema
export const ClustersListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters",
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
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
  });
export type ClustersListByResourceGroupOutput =
  typeof ClustersListByResourceGroupOutput.Type;

// The operation
/**
 * Lists all Kusto clusters within a resource group.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const ClustersListByResourceGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ClustersListByResourceGroupInput,
    outputSchema: ClustersListByResourceGroupOutput,
  }),
);
// Input Schema
export const ClustersListCalloutPoliciesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/listCalloutPolicies",
    }),
  );
export type ClustersListCalloutPoliciesInput =
  typeof ClustersListCalloutPoliciesInput.Type;

// Output Schema
export const ClustersListCalloutPoliciesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          calloutUriRegex: Schema.optional(Schema.String),
          calloutType: Schema.optional(
            Schema.Literals([
              "kusto",
              "sql",
              "cosmosdb",
              "external_data",
              "azure_digital_twins",
              "sandbox_artifacts",
              "webapi",
              "mysql",
              "postgresql",
              "genevametrics",
              "azure_openai",
            ]),
          ),
          outboundAccess: Schema.optional(Schema.Literals(["Allow", "Deny"])),
          calloutId: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ClustersListCalloutPoliciesOutput =
  typeof ClustersListCalloutPoliciesOutput.Type;

// The operation
/**
 * Returns the allowed callout policies for the specified service.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const ClustersListCalloutPolicies = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ClustersListCalloutPoliciesInput,
    outputSchema: ClustersListCalloutPoliciesOutput,
  }),
);
// Input Schema
export const ClustersListFollowerDatabasesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/listFollowerDatabases",
    }),
  );
export type ClustersListFollowerDatabasesInput =
  typeof ClustersListFollowerDatabasesInput.Type;

// Output Schema
export const ClustersListFollowerDatabasesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          clusterResourceId: Schema.String,
          attachedDatabaseConfigurationName: Schema.String,
          databaseName: Schema.optional(Schema.String),
          tableLevelSharingProperties: Schema.optional(
            Schema.Struct({
              tablesToInclude: Schema.optional(Schema.Array(Schema.String)),
              tablesToExclude: Schema.optional(Schema.Array(Schema.String)),
              externalTablesToInclude: Schema.optional(
                Schema.Array(Schema.String),
              ),
              externalTablesToExclude: Schema.optional(
                Schema.Array(Schema.String),
              ),
              materializedViewsToInclude: Schema.optional(
                Schema.Array(Schema.String),
              ),
              materializedViewsToExclude: Schema.optional(
                Schema.Array(Schema.String),
              ),
              functionsToInclude: Schema.optional(Schema.Array(Schema.String)),
              functionsToExclude: Schema.optional(Schema.Array(Schema.String)),
            }),
          ),
          databaseShareOrigin: Schema.optional(
            Schema.Literals(["Direct", "DataShare", "Other"]),
          ),
        }),
      ),
    ),
  });
export type ClustersListFollowerDatabasesOutput =
  typeof ClustersListFollowerDatabasesOutput.Type;

// The operation
/**
 * Returns a list of databases that are owned by this cluster and were followed by another cluster.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const ClustersListFollowerDatabases =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ClustersListFollowerDatabasesInput,
    outputSchema: ClustersListFollowerDatabasesOutput,
  }));
// Input Schema
export const ClustersListFollowerDatabasesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/listFollowerDatabases",
    }),
  );
export type ClustersListFollowerDatabasesGetInput =
  typeof ClustersListFollowerDatabasesGetInput.Type;

// Output Schema
export const ClustersListFollowerDatabasesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          properties: Schema.optional(
            Schema.Struct({
              clusterResourceId: Schema.String,
              attachedDatabaseConfigurationName: Schema.String,
              databaseName: Schema.optional(Schema.String),
              tableLevelSharingProperties: Schema.optional(
                Schema.Struct({
                  tablesToInclude: Schema.optional(Schema.Array(Schema.String)),
                  tablesToExclude: Schema.optional(Schema.Array(Schema.String)),
                  externalTablesToInclude: Schema.optional(
                    Schema.Array(Schema.String),
                  ),
                  externalTablesToExclude: Schema.optional(
                    Schema.Array(Schema.String),
                  ),
                  materializedViewsToInclude: Schema.optional(
                    Schema.Array(Schema.String),
                  ),
                  materializedViewsToExclude: Schema.optional(
                    Schema.Array(Schema.String),
                  ),
                  functionsToInclude: Schema.optional(
                    Schema.Array(Schema.String),
                  ),
                  functionsToExclude: Schema.optional(
                    Schema.Array(Schema.String),
                  ),
                }),
              ),
              databaseShareOrigin: Schema.optional(
                Schema.Literals(["Direct", "DataShare", "Other"]),
              ),
            }),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ClustersListFollowerDatabasesGetOutput =
  typeof ClustersListFollowerDatabasesGetOutput.Type;

// The operation
/**
 * Returns a list of databases that are owned by this cluster and were followed by another cluster.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const ClustersListFollowerDatabasesGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ClustersListFollowerDatabasesGetInput,
    outputSchema: ClustersListFollowerDatabasesGetOutput,
  }));
// Input Schema
export const ClustersListLanguageExtensionsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/listLanguageExtensions",
    }),
  );
export type ClustersListLanguageExtensionsInput =
  typeof ClustersListLanguageExtensionsInput.Type;

// Output Schema
export const ClustersListLanguageExtensionsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          languageExtensionName: Schema.optional(
            Schema.Literals(["PYTHON", "R"]),
          ),
          languageExtensionImageName: Schema.optional(
            Schema.Literals([
              "R",
              "Python3_6_5",
              "Python3_10_8",
              "Python3_10_8_DL",
              "PythonCustomImage",
              "Python3_11_7",
              "Python3_11_7_DL",
            ]),
          ),
          languageExtensionCustomImageName: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type ClustersListLanguageExtensionsOutput =
  typeof ClustersListLanguageExtensionsOutput.Type;

// The operation
/**
 * Returns a list of language extensions that can run within KQL queries.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const ClustersListLanguageExtensions =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ClustersListLanguageExtensionsInput,
    outputSchema: ClustersListLanguageExtensionsOutput,
  }));
// Input Schema
export const ClustersListOutboundNetworkDependenciesEndpointsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/outboundNetworkDependenciesEndpoints",
    }),
  );
export type ClustersListOutboundNetworkDependenciesEndpointsInput =
  typeof ClustersListOutboundNetworkDependenciesEndpointsInput.Type;

// Output Schema
export const ClustersListOutboundNetworkDependenciesEndpointsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type ClustersListOutboundNetworkDependenciesEndpointsOutput =
  typeof ClustersListOutboundNetworkDependenciesEndpointsOutput.Type;

// The operation
/**
 * Gets the network endpoints of all outbound dependencies of a Kusto cluster
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const ClustersListOutboundNetworkDependenciesEndpoints =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ClustersListOutboundNetworkDependenciesEndpointsInput,
    outputSchema: ClustersListOutboundNetworkDependenciesEndpointsOutput,
  }));
// Input Schema
export const ClustersListSkusInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.Kusto/skus",
  }),
);
export type ClustersListSkusInput = typeof ClustersListSkusInput.Type;

// Output Schema
export const ClustersListSkusOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          resourceType: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          tier: Schema.optional(Schema.String),
          locations: Schema.optional(Schema.Array(Schema.String)),
          locationInfo: Schema.optional(
            Schema.Array(
              Schema.Struct({
                location: Schema.String,
                zones: Schema.optional(Schema.Array(Schema.String)),
                zoneDetails: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      name: Schema.optional(Schema.Array(Schema.String)),
                      capabilities: Schema.optional(
                        Schema.Array(
                          Schema.Struct({
                            name: Schema.optional(Schema.String),
                            value: Schema.optional(Schema.String),
                          }),
                        ),
                      ),
                    }),
                  ),
                ),
              }),
            ),
          ),
          restrictions: Schema.optional(Schema.Array(Schema.Unknown)),
        }),
      ),
    ),
  },
);
export type ClustersListSkusOutput = typeof ClustersListSkusOutput.Type;

// The operation
/**
 * Lists eligible SKUs for Kusto resource provider.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const ClustersListSkus = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ClustersListSkusInput,
  outputSchema: ClustersListSkusOutput,
}));
// Input Schema
export const ClustersListSkusByResourceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/skus",
    }),
  );
export type ClustersListSkusByResourceInput =
  typeof ClustersListSkusByResourceInput.Type;

// Output Schema
export const ClustersListSkusByResourceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          resourceType: Schema.optional(Schema.String),
          sku: Schema.optional(
            Schema.Struct({
              name: Schema.Literals([
                "Dev(No SLA)_Standard_D11_v2",
                "Dev(No SLA)_Standard_E2a_v4",
                "Standard_D11_v2",
                "Standard_D12_v2",
                "Standard_D13_v2",
                "Standard_D14_v2",
                "Standard_D32d_v4",
                "Standard_D16d_v5",
                "Standard_D32d_v5",
                "Standard_DS13_v2+1TB_PS",
                "Standard_DS13_v2+2TB_PS",
                "Standard_DS14_v2+3TB_PS",
                "Standard_DS14_v2+4TB_PS",
                "Standard_L4s",
                "Standard_L8s",
                "Standard_L16s",
                "Standard_L8s_v2",
                "Standard_L16s_v2",
                "Standard_L8s_v3",
                "Standard_L16s_v3",
                "Standard_L32s_v3",
                "Standard_L8as_v3",
                "Standard_L16as_v3",
                "Standard_L32as_v3",
                "Standard_E64i_v3",
                "Standard_E80ids_v4",
                "Standard_E2a_v4",
                "Standard_E4a_v4",
                "Standard_E8a_v4",
                "Standard_E16a_v4",
                "Standard_E8as_v4+1TB_PS",
                "Standard_E8as_v4+2TB_PS",
                "Standard_E16as_v4+3TB_PS",
                "Standard_E16as_v4+4TB_PS",
                "Standard_E8as_v5+1TB_PS",
                "Standard_E8as_v5+2TB_PS",
                "Standard_E16as_v5+3TB_PS",
                "Standard_E16as_v5+4TB_PS",
                "Standard_E2ads_v5",
                "Standard_E4ads_v5",
                "Standard_E8ads_v5",
                "Standard_E16ads_v5",
                "Standard_EC8as_v5+1TB_PS",
                "Standard_EC8as_v5+2TB_PS",
                "Standard_EC16as_v5+3TB_PS",
                "Standard_EC16as_v5+4TB_PS",
                "Standard_EC8ads_v5",
                "Standard_EC16ads_v5",
                "Standard_E8s_v4+1TB_PS",
                "Standard_E8s_v4+2TB_PS",
                "Standard_E16s_v4+3TB_PS",
                "Standard_E16s_v4+4TB_PS",
                "Standard_E8s_v5+1TB_PS",
                "Standard_E8s_v5+2TB_PS",
                "Standard_E16s_v5+3TB_PS",
                "Standard_E16s_v5+4TB_PS",
                "Standard_E2d_v4",
                "Standard_E4d_v4",
                "Standard_E8d_v4",
                "Standard_E16d_v4",
                "Standard_E2d_v5",
                "Standard_E4d_v5",
                "Standard_E8d_v5",
                "Standard_E16d_v5",
              ]),
              capacity: Schema.optional(Schema.Number),
              tier: Schema.Literals(["Basic", "Standard"]),
            }),
          ),
          capacity: Schema.optional(
            Schema.Struct({
              scaleType: Schema.Literals(["automatic", "manual", "none"]),
              minimum: Schema.Number,
              maximum: Schema.Number,
              default: Schema.Number,
            }),
          ),
        }),
      ),
    ),
  });
export type ClustersListSkusByResourceOutput =
  typeof ClustersListSkusByResourceOutput.Type;

// The operation
/**
 * Returns the SKUs available for the provided resource.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const ClustersListSkusByResource = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ClustersListSkusByResourceInput,
    outputSchema: ClustersListSkusByResourceOutput,
  }),
);
// Input Schema
export const ClustersMigrateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/migrate",
  }),
);
export type ClustersMigrateInput = typeof ClustersMigrateInput.Type;

// Output Schema
export const ClustersMigrateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ClustersMigrateOutput = typeof ClustersMigrateOutput.Type;

// The operation
/**
 * Migrate data from a Kusto cluster to another cluster.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const ClustersMigrate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ClustersMigrateInput,
  outputSchema: ClustersMigrateOutput,
}));
// Input Schema
export const ClustersRemoveCalloutPolicyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/removeCalloutPolicy",
    }),
  );
export type ClustersRemoveCalloutPolicyInput =
  typeof ClustersRemoveCalloutPolicyInput.Type;

// Output Schema
export const ClustersRemoveCalloutPolicyOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ClustersRemoveCalloutPolicyOutput =
  typeof ClustersRemoveCalloutPolicyOutput.Type;

// The operation
/**
 * Removes callout policy for engine services.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const ClustersRemoveCalloutPolicy = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ClustersRemoveCalloutPolicyInput,
    outputSchema: ClustersRemoveCalloutPolicyOutput,
  }),
);
// Input Schema
export const ClustersRemoveLanguageExtensionsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/removeLanguageExtensions",
    }),
  );
export type ClustersRemoveLanguageExtensionsInput =
  typeof ClustersRemoveLanguageExtensionsInput.Type;

// Output Schema
export const ClustersRemoveLanguageExtensionsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ClustersRemoveLanguageExtensionsOutput =
  typeof ClustersRemoveLanguageExtensionsOutput.Type;

// The operation
/**
 * Remove a list of language extensions that can run within KQL queries.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const ClustersRemoveLanguageExtensions =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ClustersRemoveLanguageExtensionsInput,
    outputSchema: ClustersRemoveLanguageExtensionsOutput,
  }));
// Input Schema
export const ClustersStartInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/start",
  }),
);
export type ClustersStartInput = typeof ClustersStartInput.Type;

// Output Schema
export const ClustersStartOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ClustersStartOutput = typeof ClustersStartOutput.Type;

// The operation
/**
 * Starts a Kusto cluster.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const ClustersStart = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ClustersStartInput,
  outputSchema: ClustersStartOutput,
}));
// Input Schema
export const ClustersStopInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/stop",
  }),
);
export type ClustersStopInput = typeof ClustersStopInput.Type;

// Output Schema
export const ClustersStopOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ClustersStopOutput = typeof ClustersStopOutput.Type;

// The operation
/**
 * Stops a Kusto cluster.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const ClustersStop = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ClustersStopInput,
  outputSchema: ClustersStopOutput,
}));
// Input Schema
export const ClustersUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}",
  }),
);
export type ClustersUpdateInput = typeof ClustersUpdateInput.Type;

// Output Schema
export const ClustersUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type ClustersUpdateOutput = typeof ClustersUpdateOutput.Type;

// The operation
/**
 * Update a Kusto cluster.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param If-Match - The ETag of the cluster. Omit this value to always overwrite the current cluster. Specify the last-seen ETag value to prevent accidentally overwriting concurrent changes.
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const ClustersUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ClustersUpdateInput,
  outputSchema: ClustersUpdateOutput,
}));
// Input Schema
export const DatabaseInviteFollowerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/databases/{databaseName}/inviteFollower",
    }),
  );
export type DatabaseInviteFollowerInput =
  typeof DatabaseInviteFollowerInput.Type;

// Output Schema
export const DatabaseInviteFollowerOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    generatedInvitation: Schema.optional(Schema.String),
  });
export type DatabaseInviteFollowerOutput =
  typeof DatabaseInviteFollowerOutput.Type;

// The operation
/**
 * Generates an invitation token that allows attaching a follower database to this database.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const DatabaseInviteFollower = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DatabaseInviteFollowerInput,
    outputSchema: DatabaseInviteFollowerOutput,
  }),
);
// Input Schema
export const DatabasePrincipalAssignmentsCheckNameAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/databases/{databaseName}/checkPrincipalAssignmentNameAvailability",
    }),
  );
export type DatabasePrincipalAssignmentsCheckNameAvailabilityInput =
  typeof DatabasePrincipalAssignmentsCheckNameAvailabilityInput.Type;

// Output Schema
export const DatabasePrincipalAssignmentsCheckNameAvailabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nameAvailable: Schema.optional(Schema.Boolean),
    name: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
    reason: Schema.optional(Schema.Literals(["Invalid", "AlreadyExists"])),
  });
export type DatabasePrincipalAssignmentsCheckNameAvailabilityOutput =
  typeof DatabasePrincipalAssignmentsCheckNameAvailabilityOutput.Type;

// The operation
/**
 * Checks that the database principal assignment is valid and is not already in use.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const DatabasePrincipalAssignmentsCheckNameAvailability =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabasePrincipalAssignmentsCheckNameAvailabilityInput,
    outputSchema: DatabasePrincipalAssignmentsCheckNameAvailabilityOutput,
  }));
// Input Schema
export const DatabasePrincipalAssignmentsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/databases/{databaseName}/principalAssignments/{principalAssignmentName}",
    }),
  );
export type DatabasePrincipalAssignmentsCreateOrUpdateInput =
  typeof DatabasePrincipalAssignmentsCreateOrUpdateInput.Type;

// Output Schema
export const DatabasePrincipalAssignmentsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DatabasePrincipalAssignmentsCreateOrUpdateOutput =
  typeof DatabasePrincipalAssignmentsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates a Kusto cluster database principalAssignment.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const DatabasePrincipalAssignmentsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabasePrincipalAssignmentsCreateOrUpdateInput,
    outputSchema: DatabasePrincipalAssignmentsCreateOrUpdateOutput,
  }));
// Input Schema
export const DatabasePrincipalAssignmentsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/databases/{databaseName}/principalAssignments/{principalAssignmentName}",
    }),
  );
export type DatabasePrincipalAssignmentsDeleteInput =
  typeof DatabasePrincipalAssignmentsDeleteInput.Type;

// Output Schema
export const DatabasePrincipalAssignmentsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DatabasePrincipalAssignmentsDeleteOutput =
  typeof DatabasePrincipalAssignmentsDeleteOutput.Type;

// The operation
/**
 * Deletes a Kusto principalAssignment.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const DatabasePrincipalAssignmentsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabasePrincipalAssignmentsDeleteInput,
    outputSchema: DatabasePrincipalAssignmentsDeleteOutput,
  }));
// Input Schema
export const DatabasePrincipalAssignmentsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/databases/{databaseName}/principalAssignments/{principalAssignmentName}",
    }),
  );
export type DatabasePrincipalAssignmentsGetInput =
  typeof DatabasePrincipalAssignmentsGetInput.Type;

// Output Schema
export const DatabasePrincipalAssignmentsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DatabasePrincipalAssignmentsGetOutput =
  typeof DatabasePrincipalAssignmentsGetOutput.Type;

// The operation
/**
 * Gets a Kusto cluster database principalAssignment.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const DatabasePrincipalAssignmentsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabasePrincipalAssignmentsGetInput,
    outputSchema: DatabasePrincipalAssignmentsGetOutput,
  }));
// Input Schema
export const DatabasePrincipalAssignmentsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/databases/{databaseName}/principalAssignments",
    }),
  );
export type DatabasePrincipalAssignmentsListInput =
  typeof DatabasePrincipalAssignmentsListInput.Type;

// Output Schema
export const DatabasePrincipalAssignmentsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
  });
export type DatabasePrincipalAssignmentsListOutput =
  typeof DatabasePrincipalAssignmentsListOutput.Type;

// The operation
/**
 * Lists all Kusto cluster database principalAssignments.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const DatabasePrincipalAssignmentsList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabasePrincipalAssignmentsListInput,
    outputSchema: DatabasePrincipalAssignmentsListOutput,
  }));
// Input Schema
export const DatabasesAddPrincipalsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/databases/{databaseName}/addPrincipals",
    }),
  );
export type DatabasesAddPrincipalsInput =
  typeof DatabasesAddPrincipalsInput.Type;

// Output Schema
export const DatabasesAddPrincipalsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          role: Schema.Literals([
            "Admin",
            "Ingestor",
            "Monitor",
            "User",
            "UnrestrictedViewer",
            "Viewer",
          ]),
          name: Schema.String,
          type: Schema.Literals(["App", "Group", "User"]),
          fqn: Schema.optional(Schema.String),
          email: Schema.optional(Schema.String),
          appId: Schema.optional(Schema.String),
          tenantName: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type DatabasesAddPrincipalsOutput =
  typeof DatabasesAddPrincipalsOutput.Type;

// The operation
/**
 * Add Database principals permissions.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const DatabasesAddPrincipals = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DatabasesAddPrincipalsInput,
    outputSchema: DatabasesAddPrincipalsOutput,
  }),
);
// Input Schema
export const DatabasesCheckNameAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/checkNameAvailability",
    }),
  );
export type DatabasesCheckNameAvailabilityInput =
  typeof DatabasesCheckNameAvailabilityInput.Type;

// Output Schema
export const DatabasesCheckNameAvailabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nameAvailable: Schema.optional(Schema.Boolean),
    name: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
    reason: Schema.optional(Schema.Literals(["Invalid", "AlreadyExists"])),
  });
export type DatabasesCheckNameAvailabilityOutput =
  typeof DatabasesCheckNameAvailabilityOutput.Type;

// The operation
/**
 * Checks that the databases resource name is valid and is not already in use.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const DatabasesCheckNameAvailability =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabasesCheckNameAvailabilityInput,
    outputSchema: DatabasesCheckNameAvailabilityOutput,
  }));
// Input Schema
export const DatabasesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/databases/{databaseName}",
    }),
  );
export type DatabasesCreateOrUpdateInput =
  typeof DatabasesCreateOrUpdateInput.Type;

// Output Schema
export const DatabasesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DatabasesCreateOrUpdateOutput =
  typeof DatabasesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a database.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const DatabasesCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DatabasesCreateOrUpdateInput,
    outputSchema: DatabasesCreateOrUpdateOutput,
  }),
);
// Input Schema
export const DatabasesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/databases/{databaseName}",
  }),
);
export type DatabasesDeleteInput = typeof DatabasesDeleteInput.Type;

// Output Schema
export const DatabasesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DatabasesDeleteOutput = typeof DatabasesDeleteOutput.Type;

// The operation
/**
 * Deletes the database with the given name.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const DatabasesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DatabasesDeleteInput,
  outputSchema: DatabasesDeleteOutput,
}));
// Input Schema
export const DatabasesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/databases/{databaseName}",
  }),
);
export type DatabasesGetInput = typeof DatabasesGetInput.Type;

// Output Schema
export const DatabasesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DatabasesGetOutput = typeof DatabasesGetOutput.Type;

// The operation
/**
 * Returns a database.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const DatabasesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DatabasesGetInput,
  outputSchema: DatabasesGetOutput,
}));
// Input Schema
export const DatabasesListByClusterInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $top: Schema.optional(Schema.Number),
    $skiptoken: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/databases",
    }),
  );
export type DatabasesListByClusterInput =
  typeof DatabasesListByClusterInput.Type;

// Output Schema
export const DatabasesListByClusterOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
  });
export type DatabasesListByClusterOutput =
  typeof DatabasesListByClusterOutput.Type;

// The operation
/**
 * Returns the list of databases of the given Kusto cluster.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 * @param $top - limit the number of results
 * @param $skiptoken - Skiptoken is only used if a previous operation returned a partial result. If a previous response contains a nextLink element, the value of the nextLink element will include a skiptoken parameter that specifies a starting point to use for subsequent calls.
 */
export const DatabasesListByCluster = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DatabasesListByClusterInput,
    outputSchema: DatabasesListByClusterOutput,
  }),
);
// Input Schema
export const DatabasesListPrincipalsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/databases/{databaseName}/listPrincipals",
    }),
  );
export type DatabasesListPrincipalsInput =
  typeof DatabasesListPrincipalsInput.Type;

// Output Schema
export const DatabasesListPrincipalsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          role: Schema.Literals([
            "Admin",
            "Ingestor",
            "Monitor",
            "User",
            "UnrestrictedViewer",
            "Viewer",
          ]),
          name: Schema.String,
          type: Schema.Literals(["App", "Group", "User"]),
          fqn: Schema.optional(Schema.String),
          email: Schema.optional(Schema.String),
          appId: Schema.optional(Schema.String),
          tenantName: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type DatabasesListPrincipalsOutput =
  typeof DatabasesListPrincipalsOutput.Type;

// The operation
/**
 * Returns a list of database principals of the given Kusto cluster and database.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const DatabasesListPrincipals = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DatabasesListPrincipalsInput,
    outputSchema: DatabasesListPrincipalsOutput,
  }),
);
// Input Schema
export const DatabasesRemovePrincipalsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/databases/{databaseName}/removePrincipals",
    }),
  );
export type DatabasesRemovePrincipalsInput =
  typeof DatabasesRemovePrincipalsInput.Type;

// Output Schema
export const DatabasesRemovePrincipalsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          role: Schema.Literals([
            "Admin",
            "Ingestor",
            "Monitor",
            "User",
            "UnrestrictedViewer",
            "Viewer",
          ]),
          name: Schema.String,
          type: Schema.Literals(["App", "Group", "User"]),
          fqn: Schema.optional(Schema.String),
          email: Schema.optional(Schema.String),
          appId: Schema.optional(Schema.String),
          tenantName: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type DatabasesRemovePrincipalsOutput =
  typeof DatabasesRemovePrincipalsOutput.Type;

// The operation
/**
 * Remove Database principals permissions.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const DatabasesRemovePrincipals = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DatabasesRemovePrincipalsInput,
    outputSchema: DatabasesRemovePrincipalsOutput,
  }),
);
// Input Schema
export const DatabasesUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/databases/{databaseName}",
  }),
);
export type DatabasesUpdateInput = typeof DatabasesUpdateInput.Type;

// Output Schema
export const DatabasesUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type DatabasesUpdateOutput = typeof DatabasesUpdateOutput.Type;

// The operation
/**
 * Updates a database.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const DatabasesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DatabasesUpdateInput,
  outputSchema: DatabasesUpdateOutput,
}));
// Input Schema
export const DataConnectionsCheckNameAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/databases/{databaseName}/checkNameAvailability",
    }),
  );
export type DataConnectionsCheckNameAvailabilityInput =
  typeof DataConnectionsCheckNameAvailabilityInput.Type;

// Output Schema
export const DataConnectionsCheckNameAvailabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nameAvailable: Schema.optional(Schema.Boolean),
    name: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
    reason: Schema.optional(Schema.Literals(["Invalid", "AlreadyExists"])),
  });
export type DataConnectionsCheckNameAvailabilityOutput =
  typeof DataConnectionsCheckNameAvailabilityOutput.Type;

// The operation
/**
 * Checks that the data connection name is valid and is not already in use.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const DataConnectionsCheckNameAvailability =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DataConnectionsCheckNameAvailabilityInput,
    outputSchema: DataConnectionsCheckNameAvailabilityOutput,
  }));
// Input Schema
export const DataConnectionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/databases/{databaseName}/dataConnections/{dataConnectionName}",
    }),
  );
export type DataConnectionsCreateOrUpdateInput =
  typeof DataConnectionsCreateOrUpdateInput.Type;

// Output Schema
export const DataConnectionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DataConnectionsCreateOrUpdateOutput =
  typeof DataConnectionsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a data connection.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const DataConnectionsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DataConnectionsCreateOrUpdateInput,
    outputSchema: DataConnectionsCreateOrUpdateOutput,
  }));
// Input Schema
export const DataConnectionsDataConnectionValidationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/databases/{databaseName}/dataConnectionValidation",
    }),
  );
export type DataConnectionsDataConnectionValidationInput =
  typeof DataConnectionsDataConnectionValidationInput.Type;

// Output Schema
export const DataConnectionsDataConnectionValidationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          errorMessage: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type DataConnectionsDataConnectionValidationOutput =
  typeof DataConnectionsDataConnectionValidationOutput.Type;

// The operation
/**
 * Checks that the data connection parameters are valid.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const DataConnectionsDataConnectionValidation =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DataConnectionsDataConnectionValidationInput,
    outputSchema: DataConnectionsDataConnectionValidationOutput,
  }));
// Input Schema
export const DataConnectionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/databases/{databaseName}/dataConnections/{dataConnectionName}",
    }),
  );
export type DataConnectionsDeleteInput = typeof DataConnectionsDeleteInput.Type;

// Output Schema
export const DataConnectionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DataConnectionsDeleteOutput =
  typeof DataConnectionsDeleteOutput.Type;

// The operation
/**
 * Deletes the data connection with the given name.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const DataConnectionsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DataConnectionsDeleteInput,
    outputSchema: DataConnectionsDeleteOutput,
  }),
);
// Input Schema
export const DataConnectionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/databases/{databaseName}/dataConnections/{dataConnectionName}",
    }),
  );
export type DataConnectionsGetInput = typeof DataConnectionsGetInput.Type;

// Output Schema
export const DataConnectionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DataConnectionsGetOutput = typeof DataConnectionsGetOutput.Type;

// The operation
/**
 * Returns a data connection.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const DataConnectionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DataConnectionsGetInput,
  outputSchema: DataConnectionsGetOutput,
}));
// Input Schema
export const DataConnectionsListByDatabaseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/databases/{databaseName}/dataConnections",
    }),
  );
export type DataConnectionsListByDatabaseInput =
  typeof DataConnectionsListByDatabaseInput.Type;

// Output Schema
export const DataConnectionsListByDatabaseOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
  });
export type DataConnectionsListByDatabaseOutput =
  typeof DataConnectionsListByDatabaseOutput.Type;

// The operation
/**
 * Returns the list of data connections of the given Kusto database.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const DataConnectionsListByDatabase =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DataConnectionsListByDatabaseInput,
    outputSchema: DataConnectionsListByDatabaseOutput,
  }));
// Input Schema
export const DataConnectionsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/databases/{databaseName}/dataConnections/{dataConnectionName}",
    }),
  );
export type DataConnectionsUpdateInput = typeof DataConnectionsUpdateInput.Type;

// Output Schema
export const DataConnectionsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DataConnectionsUpdateOutput =
  typeof DataConnectionsUpdateOutput.Type;

// The operation
/**
 * Updates a data connection.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const DataConnectionsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DataConnectionsUpdateInput,
    outputSchema: DataConnectionsUpdateOutput,
  }),
);
// Input Schema
export const ManagedPrivateEndpointsCheckNameAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/managedPrivateEndpointsCheckNameAvailability",
    }),
  );
export type ManagedPrivateEndpointsCheckNameAvailabilityInput =
  typeof ManagedPrivateEndpointsCheckNameAvailabilityInput.Type;

// Output Schema
export const ManagedPrivateEndpointsCheckNameAvailabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nameAvailable: Schema.optional(Schema.Boolean),
    name: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
    reason: Schema.optional(Schema.Literals(["Invalid", "AlreadyExists"])),
  });
export type ManagedPrivateEndpointsCheckNameAvailabilityOutput =
  typeof ManagedPrivateEndpointsCheckNameAvailabilityOutput.Type;

// The operation
/**
 * Checks that the managed private endpoints resource name is valid and is not already in use.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const ManagedPrivateEndpointsCheckNameAvailability =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedPrivateEndpointsCheckNameAvailabilityInput,
    outputSchema: ManagedPrivateEndpointsCheckNameAvailabilityOutput,
  }));
// Input Schema
export const ManagedPrivateEndpointsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/managedPrivateEndpoints/{managedPrivateEndpointName}",
    }),
  );
export type ManagedPrivateEndpointsCreateOrUpdateInput =
  typeof ManagedPrivateEndpointsCreateOrUpdateInput.Type;

// Output Schema
export const ManagedPrivateEndpointsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagedPrivateEndpointsCreateOrUpdateOutput =
  typeof ManagedPrivateEndpointsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates a managed private endpoint.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const ManagedPrivateEndpointsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedPrivateEndpointsCreateOrUpdateInput,
    outputSchema: ManagedPrivateEndpointsCreateOrUpdateOutput,
  }));
// Input Schema
export const ManagedPrivateEndpointsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/managedPrivateEndpoints/{managedPrivateEndpointName}",
    }),
  );
export type ManagedPrivateEndpointsDeleteInput =
  typeof ManagedPrivateEndpointsDeleteInput.Type;

// Output Schema
export const ManagedPrivateEndpointsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ManagedPrivateEndpointsDeleteOutput =
  typeof ManagedPrivateEndpointsDeleteOutput.Type;

// The operation
/**
 * Deletes a managed private endpoint.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const ManagedPrivateEndpointsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedPrivateEndpointsDeleteInput,
    outputSchema: ManagedPrivateEndpointsDeleteOutput,
  }));
// Input Schema
export const ManagedPrivateEndpointsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/managedPrivateEndpoints/{managedPrivateEndpointName}",
    }),
  );
export type ManagedPrivateEndpointsGetInput =
  typeof ManagedPrivateEndpointsGetInput.Type;

// Output Schema
export const ManagedPrivateEndpointsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagedPrivateEndpointsGetOutput =
  typeof ManagedPrivateEndpointsGetOutput.Type;

// The operation
/**
 * Gets a managed private endpoint.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const ManagedPrivateEndpointsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ManagedPrivateEndpointsGetInput,
    outputSchema: ManagedPrivateEndpointsGetOutput,
  }),
);
// Input Schema
export const ManagedPrivateEndpointsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/managedPrivateEndpoints",
    }),
  );
export type ManagedPrivateEndpointsListInput =
  typeof ManagedPrivateEndpointsListInput.Type;

// Output Schema
export const ManagedPrivateEndpointsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
  });
export type ManagedPrivateEndpointsListOutput =
  typeof ManagedPrivateEndpointsListOutput.Type;

// The operation
/**
 * Returns the list of managed private endpoints.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const ManagedPrivateEndpointsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ManagedPrivateEndpointsListInput,
    outputSchema: ManagedPrivateEndpointsListOutput,
  }),
);
// Input Schema
export const ManagedPrivateEndpointsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/managedPrivateEndpoints/{managedPrivateEndpointName}",
    }),
  );
export type ManagedPrivateEndpointsUpdateInput =
  typeof ManagedPrivateEndpointsUpdateInput.Type;

// Output Schema
export const ManagedPrivateEndpointsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagedPrivateEndpointsUpdateOutput =
  typeof ManagedPrivateEndpointsUpdateOutput.Type;

// The operation
/**
 * Updates a managed private endpoint.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const ManagedPrivateEndpointsUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedPrivateEndpointsUpdateInput,
    outputSchema: ManagedPrivateEndpointsUpdateOutput,
  }));
// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  "api-version": Schema.String,
}).pipe(
  T.Http({ method: "GET", path: "/providers/Microsoft.Kusto/operations" }),
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
            operation: Schema.optional(Schema.String),
            resource: Schema.optional(Schema.String),
            description: Schema.optional(Schema.String),
          }),
        ),
        origin: Schema.optional(Schema.String),
        properties: Schema.optional(Schema.Unknown),
      }),
    ),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type OperationsListOutput = typeof OperationsListOutput.Type;

// The operation
/**
 * Lists available operations for the Microsoft.Kusto provider.
 *
 * @param api-version - The API version to use for this operation.
 */
export const OperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationsListInput,
  outputSchema: OperationsListOutput,
}));
// Input Schema
export const OperationsResultsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    operationId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Kusto/locations/{location}/operationResults/{operationId}",
    }),
  );
export type OperationsResultsGetInput = typeof OperationsResultsGetInput.Type;

// Output Schema
export const OperationsResultsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    status: Schema.optional(
      Schema.Literals(["Succeeded", "Canceled", "Failed", "Running"]),
    ),
    startTime: Schema.optional(Schema.String),
    endTime: Schema.optional(Schema.String),
    percentComplete: Schema.optional(Schema.Number),
    properties: Schema.optional(
      Schema.Struct({
        operationKind: Schema.optional(Schema.String),
        provisioningState: Schema.optional(
          Schema.Literals([
            "Running",
            "Creating",
            "Deleting",
            "Succeeded",
            "Failed",
            "Moving",
            "Canceled",
          ]),
        ),
        operationState: Schema.optional(Schema.String),
      }),
    ),
    error: Schema.optional(
      Schema.Struct({
        code: Schema.optional(Schema.String),
        message: Schema.optional(Schema.String),
      }),
    ),
  });
export type OperationsResultsGetOutput = typeof OperationsResultsGetOutput.Type;

// The operation
/**
 * Returns operation results.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param location - The name of Azure region.
 * @param operationId - The ID of an ongoing async operation.
 * @param api-version - The API version to use for this operation.
 */
export const OperationsResultsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: OperationsResultsGetInput,
    outputSchema: OperationsResultsGetOutput,
  }),
);
// Input Schema
export const PrivateEndpointConnectionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type PrivateEndpointConnectionsCreateOrUpdateInput =
  typeof PrivateEndpointConnectionsCreateOrUpdateInput.Type;

// Output Schema
export const PrivateEndpointConnectionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PrivateEndpointConnectionsCreateOrUpdateOutput =
  typeof PrivateEndpointConnectionsCreateOrUpdateOutput.Type;

// The operation
/**
 * Approve or reject a private endpoint connection with a given name.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const PrivateEndpointConnectionsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsCreateOrUpdateInput,
    outputSchema: PrivateEndpointConnectionsCreateOrUpdateOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/privateEndpointConnections/{privateEndpointConnectionName}",
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
 * Deletes a private endpoint connection with a given name.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const PrivateEndpointConnectionsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsDeleteInput,
    outputSchema: PrivateEndpointConnectionsDeleteOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type PrivateEndpointConnectionsGetInput =
  typeof PrivateEndpointConnectionsGetInput.Type;

// Output Schema
export const PrivateEndpointConnectionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PrivateEndpointConnectionsGetOutput =
  typeof PrivateEndpointConnectionsGetOutput.Type;

// The operation
/**
 * Gets a private endpoint connection.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const PrivateEndpointConnectionsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsGetInput,
    outputSchema: PrivateEndpointConnectionsGetOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/privateEndpointConnections",
    }),
  );
export type PrivateEndpointConnectionsListInput =
  typeof PrivateEndpointConnectionsListInput.Type;

// Output Schema
export const PrivateEndpointConnectionsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
  });
export type PrivateEndpointConnectionsListOutput =
  typeof PrivateEndpointConnectionsListOutput.Type;

// The operation
/**
 * Returns the list of private endpoint connections.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const PrivateEndpointConnectionsList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsListInput,
    outputSchema: PrivateEndpointConnectionsListOutput,
  }));
// Input Schema
export const PrivateLinkResourcesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/privateLinkResources/{privateLinkResourceName}",
    }),
  );
export type PrivateLinkResourcesGetInput =
  typeof PrivateLinkResourcesGetInput.Type;

// Output Schema
export const PrivateLinkResourcesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type PrivateLinkResourcesGetOutput =
  typeof PrivateLinkResourcesGetOutput.Type;

// The operation
/**
 * Gets a private link resource.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const PrivateLinkResourcesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PrivateLinkResourcesGetInput,
    outputSchema: PrivateLinkResourcesGetOutput,
  }),
);
// Input Schema
export const PrivateLinkResourcesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/privateLinkResources",
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
 * Returns the list of private link resources.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const PrivateLinkResourcesList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PrivateLinkResourcesListInput,
    outputSchema: PrivateLinkResourcesListOutput,
  }),
);
// Input Schema
export const SandboxCustomImagesCheckNameAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/sandboxCustomImagesCheckNameAvailability",
    }),
  );
export type SandboxCustomImagesCheckNameAvailabilityInput =
  typeof SandboxCustomImagesCheckNameAvailabilityInput.Type;

// Output Schema
export const SandboxCustomImagesCheckNameAvailabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nameAvailable: Schema.optional(Schema.Boolean),
    name: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
    reason: Schema.optional(Schema.Literals(["Invalid", "AlreadyExists"])),
  });
export type SandboxCustomImagesCheckNameAvailabilityOutput =
  typeof SandboxCustomImagesCheckNameAvailabilityOutput.Type;

// The operation
/**
 * Checks that the sandbox custom image resource name is valid and is not already in use.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const SandboxCustomImagesCheckNameAvailability =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SandboxCustomImagesCheckNameAvailabilityInput,
    outputSchema: SandboxCustomImagesCheckNameAvailabilityOutput,
  }));
// Input Schema
export const SandboxCustomImagesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/sandboxCustomImages/{sandboxCustomImageName}",
    }),
  );
export type SandboxCustomImagesCreateOrUpdateInput =
  typeof SandboxCustomImagesCreateOrUpdateInput.Type;

// Output Schema
export const SandboxCustomImagesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SandboxCustomImagesCreateOrUpdateOutput =
  typeof SandboxCustomImagesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a sandbox custom image.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SandboxCustomImagesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SandboxCustomImagesCreateOrUpdateInput,
    outputSchema: SandboxCustomImagesCreateOrUpdateOutput,
  }));
// Input Schema
export const SandboxCustomImagesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/sandboxCustomImages/{sandboxCustomImageName}",
    }),
  );
export type SandboxCustomImagesDeleteInput =
  typeof SandboxCustomImagesDeleteInput.Type;

// Output Schema
export const SandboxCustomImagesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SandboxCustomImagesDeleteOutput =
  typeof SandboxCustomImagesDeleteOutput.Type;

// The operation
/**
 * Deletes a sandbox custom image.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SandboxCustomImagesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SandboxCustomImagesDeleteInput,
    outputSchema: SandboxCustomImagesDeleteOutput,
  }),
);
// Input Schema
export const SandboxCustomImagesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/sandboxCustomImages/{sandboxCustomImageName}",
    }),
  );
export type SandboxCustomImagesGetInput =
  typeof SandboxCustomImagesGetInput.Type;

// Output Schema
export const SandboxCustomImagesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SandboxCustomImagesGetOutput =
  typeof SandboxCustomImagesGetOutput.Type;

// The operation
/**
 * Returns a sandbox custom image
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SandboxCustomImagesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SandboxCustomImagesGetInput,
    outputSchema: SandboxCustomImagesGetOutput,
  }),
);
// Input Schema
export const SandboxCustomImagesListByClusterInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/sandboxCustomImages",
    }),
  );
export type SandboxCustomImagesListByClusterInput =
  typeof SandboxCustomImagesListByClusterInput.Type;

// Output Schema
export const SandboxCustomImagesListByClusterOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
  });
export type SandboxCustomImagesListByClusterOutput =
  typeof SandboxCustomImagesListByClusterOutput.Type;

// The operation
/**
 * Returns the list of the existing sandbox custom images of the given Kusto cluster.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const SandboxCustomImagesListByCluster =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SandboxCustomImagesListByClusterInput,
    outputSchema: SandboxCustomImagesListByClusterOutput,
  }));
// Input Schema
export const SandboxCustomImagesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/sandboxCustomImages/{sandboxCustomImageName}",
    }),
  );
export type SandboxCustomImagesUpdateInput =
  typeof SandboxCustomImagesUpdateInput.Type;

// Output Schema
export const SandboxCustomImagesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SandboxCustomImagesUpdateOutput =
  typeof SandboxCustomImagesUpdateOutput.Type;

// The operation
/**
 * Updates a sandbox custom image.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SandboxCustomImagesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SandboxCustomImagesUpdateInput,
    outputSchema: SandboxCustomImagesUpdateOutput,
  }),
);
// Input Schema
export const ScriptsCheckNameAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/databases/{databaseName}/scriptsCheckNameAvailability",
    }),
  );
export type ScriptsCheckNameAvailabilityInput =
  typeof ScriptsCheckNameAvailabilityInput.Type;

// Output Schema
export const ScriptsCheckNameAvailabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nameAvailable: Schema.optional(Schema.Boolean),
    name: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
    reason: Schema.optional(Schema.Literals(["Invalid", "AlreadyExists"])),
  });
export type ScriptsCheckNameAvailabilityOutput =
  typeof ScriptsCheckNameAvailabilityOutput.Type;

// The operation
/**
 * Checks that the script name is valid and is not already in use.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const ScriptsCheckNameAvailability =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ScriptsCheckNameAvailabilityInput,
    outputSchema: ScriptsCheckNameAvailabilityOutput,
  }));
// Input Schema
export const ScriptsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/databases/{databaseName}/scripts/{scriptName}",
    }),
  );
export type ScriptsCreateOrUpdateInput = typeof ScriptsCreateOrUpdateInput.Type;

// Output Schema
export const ScriptsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ScriptsCreateOrUpdateOutput =
  typeof ScriptsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates a Kusto database script.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const ScriptsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ScriptsCreateOrUpdateInput,
    outputSchema: ScriptsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const ScriptsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/databases/{databaseName}/scripts/{scriptName}",
  }),
);
export type ScriptsDeleteInput = typeof ScriptsDeleteInput.Type;

// Output Schema
export const ScriptsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ScriptsDeleteOutput = typeof ScriptsDeleteOutput.Type;

// The operation
/**
 * Deletes a Kusto database script.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const ScriptsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ScriptsDeleteInput,
  outputSchema: ScriptsDeleteOutput,
}));
// Input Schema
export const ScriptsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/databases/{databaseName}/scripts/{scriptName}",
  }),
);
export type ScriptsGetInput = typeof ScriptsGetInput.Type;

// Output Schema
export const ScriptsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ScriptsGetOutput = typeof ScriptsGetOutput.Type;

// The operation
/**
 * Gets a Kusto cluster database script.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const ScriptsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ScriptsGetInput,
  outputSchema: ScriptsGetOutput,
}));
// Input Schema
export const ScriptsListByDatabaseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/databases/{databaseName}/scripts",
    }),
  );
export type ScriptsListByDatabaseInput = typeof ScriptsListByDatabaseInput.Type;

// Output Schema
export const ScriptsListByDatabaseOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
  });
export type ScriptsListByDatabaseOutput =
  typeof ScriptsListByDatabaseOutput.Type;

// The operation
/**
 * Returns the list of database scripts for given database.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const ScriptsListByDatabase = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ScriptsListByDatabaseInput,
    outputSchema: ScriptsListByDatabaseOutput,
  }),
);
// Input Schema
export const ScriptsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/databases/{databaseName}/scripts/{scriptName}",
  }),
);
export type ScriptsUpdateInput = typeof ScriptsUpdateInput.Type;

// Output Schema
export const ScriptsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type ScriptsUpdateOutput = typeof ScriptsUpdateOutput.Type;

// The operation
/**
 * Updates a database script.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const ScriptsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ScriptsUpdateInput,
  outputSchema: ScriptsUpdateOutput,
}));
// Input Schema
export const SkusListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  location: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.Kusto/locations/{location}/skus",
  }),
);
export type SkusListInput = typeof SkusListInput.Type;

// Output Schema
export const SkusListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        resourceType: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        tier: Schema.optional(Schema.String),
        locations: Schema.optional(Schema.Array(Schema.String)),
        locationInfo: Schema.optional(
          Schema.Array(
            Schema.Struct({
              location: Schema.String,
              zones: Schema.optional(Schema.Array(Schema.String)),
              zoneDetails: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    name: Schema.optional(Schema.Array(Schema.String)),
                    capabilities: Schema.optional(
                      Schema.Array(
                        Schema.Struct({
                          name: Schema.optional(Schema.String),
                          value: Schema.optional(Schema.String),
                        }),
                      ),
                    ),
                  }),
                ),
              ),
            }),
          ),
        ),
        restrictions: Schema.optional(Schema.Array(Schema.Unknown)),
      }),
    ),
  ),
});
export type SkusListOutput = typeof SkusListOutput.Type;

// The operation
/**
 * Lists eligible region SKUs for Kusto resource provider by Azure region.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param location - The name of Azure region.
 */
export const SkusList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SkusListInput,
  outputSchema: SkusListOutput,
}));
