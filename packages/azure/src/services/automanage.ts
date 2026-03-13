/**
 * Azure Automanage API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const BestPracticesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  bestPracticeName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.Automanage/bestPractices/{bestPracticeName}",
  }),
);
export type BestPracticesGetInput = typeof BestPracticesGetInput.Type;

// Output Schema
export const BestPracticesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    id: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        configuration: Schema.optional(Schema.Unknown),
      }),
    ),
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
export type BestPracticesGetOutput = typeof BestPracticesGetOutput.Type;

// The operation
/**
 * Get information about a Automanage best practice
 *
 * @param bestPracticeName - The Automanage best practice name.
 * @param api-version - The API version to use for this operation.
 */
export const BestPracticesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: BestPracticesGetInput,
  outputSchema: BestPracticesGetOutput,
}));
// Input Schema
export const BestPracticesListByTenantInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Automanage/bestPractices",
    }),
  );
export type BestPracticesListByTenantInput =
  typeof BestPracticesListByTenantInput.Type;

// Output Schema
export const BestPracticesListByTenantOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Struct({
              configuration: Schema.optional(Schema.Unknown),
            }),
          ),
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
export type BestPracticesListByTenantOutput =
  typeof BestPracticesListByTenantOutput.Type;

// The operation
/**
 * Retrieve a list of Automanage best practices
 *
 * @param api-version - The API version to use for this operation.
 */
export const BestPracticesListByTenant = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: BestPracticesListByTenantInput,
    outputSchema: BestPracticesListByTenantOutput,
  }),
);
// Input Schema
export const BestPracticesVersionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    bestPracticeName: Schema.String.pipe(T.PathParam()),
    versionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Automanage/bestPractices/{bestPracticeName}/versions/{versionName}",
    }),
  );
export type BestPracticesVersionsGetInput =
  typeof BestPracticesVersionsGetInput.Type;

// Output Schema
export const BestPracticesVersionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        configuration: Schema.optional(Schema.Unknown),
      }),
    ),
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
export type BestPracticesVersionsGetOutput =
  typeof BestPracticesVersionsGetOutput.Type;

// The operation
/**
 * Get information about a Automanage best practice version
 *
 * @param bestPracticeName - The Automanage best practice name.
 * @param versionName - The Automanage best practice version name.
 * @param api-version - The API version to use for this operation.
 */
export const BestPracticesVersionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: BestPracticesVersionsGetInput,
    outputSchema: BestPracticesVersionsGetOutput,
  }),
);
// Input Schema
export const BestPracticesVersionsListByTenantInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    bestPracticeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Automanage/bestPractices/{bestPracticeName}/versions",
    }),
  );
export type BestPracticesVersionsListByTenantInput =
  typeof BestPracticesVersionsListByTenantInput.Type;

// Output Schema
export const BestPracticesVersionsListByTenantOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Struct({
              configuration: Schema.optional(Schema.Unknown),
            }),
          ),
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
export type BestPracticesVersionsListByTenantOutput =
  typeof BestPracticesVersionsListByTenantOutput.Type;

// The operation
/**
 * Retrieve a list of Automanage best practices versions
 *
 * @param bestPracticeName - The Automanage best practice name.
 * @param api-version - The API version to use for this operation.
 */
export const BestPracticesVersionsListByTenant =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: BestPracticesVersionsListByTenantInput,
    outputSchema: BestPracticesVersionsListByTenantOutput,
  }));
// Input Schema
export const ConfigurationProfileAssignmentsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    configurationProfileAssignmentName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/providers/Microsoft.Automanage/configurationProfileAssignments/{configurationProfileAssignmentName}",
    }),
  );
export type ConfigurationProfileAssignmentsCreateOrUpdateInput =
  typeof ConfigurationProfileAssignmentsCreateOrUpdateInput.Type;

// Output Schema
export const ConfigurationProfileAssignmentsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ConfigurationProfileAssignmentsCreateOrUpdateOutput =
  typeof ConfigurationProfileAssignmentsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates an association between a VM and Automanage configuration profile
 *
 * @param configurationProfileAssignmentName - Name of the configuration profile assignment. Only default is supported.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const ConfigurationProfileAssignmentsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigurationProfileAssignmentsCreateOrUpdateInput,
    outputSchema: ConfigurationProfileAssignmentsCreateOrUpdateOutput,
  }));
// Input Schema
export const ConfigurationProfileAssignmentsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    configurationProfileAssignmentName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/providers/Microsoft.Automanage/configurationProfileAssignments/{configurationProfileAssignmentName}",
    }),
  );
export type ConfigurationProfileAssignmentsDeleteInput =
  typeof ConfigurationProfileAssignmentsDeleteInput.Type;

// Output Schema
export const ConfigurationProfileAssignmentsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ConfigurationProfileAssignmentsDeleteOutput =
  typeof ConfigurationProfileAssignmentsDeleteOutput.Type;

// The operation
/**
 * Delete a configuration profile assignment
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param configurationProfileAssignmentName - Name of the configuration profile assignment
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const ConfigurationProfileAssignmentsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigurationProfileAssignmentsDeleteInput,
    outputSchema: ConfigurationProfileAssignmentsDeleteOutput,
  }));
// Input Schema
export const ConfigurationProfileAssignmentsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    configurationProfileAssignmentName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/providers/Microsoft.Automanage/configurationProfileAssignments/{configurationProfileAssignmentName}",
    }),
  );
export type ConfigurationProfileAssignmentsGetInput =
  typeof ConfigurationProfileAssignmentsGetInput.Type;

// Output Schema
export const ConfigurationProfileAssignmentsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ConfigurationProfileAssignmentsGetOutput =
  typeof ConfigurationProfileAssignmentsGetOutput.Type;

// The operation
/**
 * Get information about a configuration profile assignment
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param configurationProfileAssignmentName - The configuration profile assignment name.
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const ConfigurationProfileAssignmentsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigurationProfileAssignmentsGetInput,
    outputSchema: ConfigurationProfileAssignmentsGetOutput,
  }));
// Input Schema
export const ConfigurationProfileAssignmentsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automanage/configurationProfileAssignments",
    }),
  );
export type ConfigurationProfileAssignmentsListInput =
  typeof ConfigurationProfileAssignmentsListInput.Type;

// Output Schema
export const ConfigurationProfileAssignmentsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
  });
export type ConfigurationProfileAssignmentsListOutput =
  typeof ConfigurationProfileAssignmentsListOutput.Type;

// The operation
/**
 * Get list of configuration profile assignments
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const ConfigurationProfileAssignmentsList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigurationProfileAssignmentsListInput,
    outputSchema: ConfigurationProfileAssignmentsListOutput,
  }));
// Input Schema
export const ConfigurationProfileAssignmentsListByClusterNameInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHci/clusters/{clusterName}/providers/Microsoft.Automanage/configurationProfileAssignments",
    }),
  );
export type ConfigurationProfileAssignmentsListByClusterNameInput =
  typeof ConfigurationProfileAssignmentsListByClusterNameInput.Type;

// Output Schema
export const ConfigurationProfileAssignmentsListByClusterNameOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
  });
export type ConfigurationProfileAssignmentsListByClusterNameOutput =
  typeof ConfigurationProfileAssignmentsListByClusterNameOutput.Type;

// The operation
/**
 * Get list of configuration profile assignments
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const ConfigurationProfileAssignmentsListByClusterName =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigurationProfileAssignmentsListByClusterNameInput,
    outputSchema: ConfigurationProfileAssignmentsListByClusterNameOutput,
  }));
// Input Schema
export const ConfigurationProfileAssignmentsListByMachineNameInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/machines/{machineName}/providers/Microsoft.Automanage/configurationProfileAssignments",
    }),
  );
export type ConfigurationProfileAssignmentsListByMachineNameInput =
  typeof ConfigurationProfileAssignmentsListByMachineNameInput.Type;

// Output Schema
export const ConfigurationProfileAssignmentsListByMachineNameOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
  });
export type ConfigurationProfileAssignmentsListByMachineNameOutput =
  typeof ConfigurationProfileAssignmentsListByMachineNameOutput.Type;

// The operation
/**
 * Get list of configuration profile assignments
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const ConfigurationProfileAssignmentsListByMachineName =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigurationProfileAssignmentsListByMachineNameInput,
    outputSchema: ConfigurationProfileAssignmentsListByMachineNameOutput,
  }));
// Input Schema
export const ConfigurationProfileAssignmentsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Automanage/configurationProfileAssignments",
    }),
  );
export type ConfigurationProfileAssignmentsListBySubscriptionInput =
  typeof ConfigurationProfileAssignmentsListBySubscriptionInput.Type;

// Output Schema
export const ConfigurationProfileAssignmentsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
  });
export type ConfigurationProfileAssignmentsListBySubscriptionOutput =
  typeof ConfigurationProfileAssignmentsListBySubscriptionOutput.Type;

// The operation
/**
 * Get list of configuration profile assignments under a given subscription
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const ConfigurationProfileAssignmentsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigurationProfileAssignmentsListBySubscriptionInput,
    outputSchema: ConfigurationProfileAssignmentsListBySubscriptionOutput,
  }));
// Input Schema
export const ConfigurationProfileAssignmentsListByVirtualMachinesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/providers/Microsoft.Automanage/configurationProfileAssignments",
    }),
  );
export type ConfigurationProfileAssignmentsListByVirtualMachinesInput =
  typeof ConfigurationProfileAssignmentsListByVirtualMachinesInput.Type;

// Output Schema
export const ConfigurationProfileAssignmentsListByVirtualMachinesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
  });
export type ConfigurationProfileAssignmentsListByVirtualMachinesOutput =
  typeof ConfigurationProfileAssignmentsListByVirtualMachinesOutput.Type;

// The operation
/**
 * Get list of configuration profile assignments
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const ConfigurationProfileAssignmentsListByVirtualMachines =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigurationProfileAssignmentsListByVirtualMachinesInput,
    outputSchema: ConfigurationProfileAssignmentsListByVirtualMachinesOutput,
  }));
// Input Schema
export const ConfigurationProfileHCIAssignmentsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    configurationProfileAssignmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHci/clusters/{clusterName}/providers/Microsoft.Automanage/configurationProfileAssignments/{configurationProfileAssignmentName}",
    }),
  );
export type ConfigurationProfileHCIAssignmentsCreateOrUpdateInput =
  typeof ConfigurationProfileHCIAssignmentsCreateOrUpdateInput.Type;

// Output Schema
export const ConfigurationProfileHCIAssignmentsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ConfigurationProfileHCIAssignmentsCreateOrUpdateOutput =
  typeof ConfigurationProfileHCIAssignmentsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates an association between a AzureStackHCI cluster and Automanage configuration profile
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param configurationProfileAssignmentName - Name of the configuration profile assignment. Only default is supported.
 * @param api-version - The API version to use for this operation.
 */
export const ConfigurationProfileHCIAssignmentsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigurationProfileHCIAssignmentsCreateOrUpdateInput,
    outputSchema: ConfigurationProfileHCIAssignmentsCreateOrUpdateOutput,
  }));
// Input Schema
export const ConfigurationProfileHCIAssignmentsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    configurationProfileAssignmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHci/clusters/{clusterName}/providers/Microsoft.Automanage/configurationProfileAssignments/{configurationProfileAssignmentName}",
    }),
  );
export type ConfigurationProfileHCIAssignmentsDeleteInput =
  typeof ConfigurationProfileHCIAssignmentsDeleteInput.Type;

// Output Schema
export const ConfigurationProfileHCIAssignmentsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ConfigurationProfileHCIAssignmentsDeleteOutput =
  typeof ConfigurationProfileHCIAssignmentsDeleteOutput.Type;

// The operation
/**
 * Delete a configuration profile assignment
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param configurationProfileAssignmentName - Name of the configuration profile assignment
 * @param api-version - The API version to use for this operation.
 */
export const ConfigurationProfileHCIAssignmentsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigurationProfileHCIAssignmentsDeleteInput,
    outputSchema: ConfigurationProfileHCIAssignmentsDeleteOutput,
  }));
// Input Schema
export const ConfigurationProfileHCIAssignmentsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    configurationProfileAssignmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHci/clusters/{clusterName}/providers/Microsoft.Automanage/configurationProfileAssignments/{configurationProfileAssignmentName}",
    }),
  );
export type ConfigurationProfileHCIAssignmentsGetInput =
  typeof ConfigurationProfileHCIAssignmentsGetInput.Type;

// Output Schema
export const ConfigurationProfileHCIAssignmentsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ConfigurationProfileHCIAssignmentsGetOutput =
  typeof ConfigurationProfileHCIAssignmentsGetOutput.Type;

// The operation
/**
 * Get information about a configuration profile assignment
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription.
 * @param configurationProfileAssignmentName - The configuration profile assignment name.
 * @param api-version - The API version to use for this operation.
 */
export const ConfigurationProfileHCIAssignmentsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigurationProfileHCIAssignmentsGetInput,
    outputSchema: ConfigurationProfileHCIAssignmentsGetOutput,
  }));
// Input Schema
export const ConfigurationProfileHCRPAssignmentsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    configurationProfileAssignmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/machines/{machineName}/providers/Microsoft.Automanage/configurationProfileAssignments/{configurationProfileAssignmentName}",
    }),
  );
export type ConfigurationProfileHCRPAssignmentsCreateOrUpdateInput =
  typeof ConfigurationProfileHCRPAssignmentsCreateOrUpdateInput.Type;

// Output Schema
export const ConfigurationProfileHCRPAssignmentsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ConfigurationProfileHCRPAssignmentsCreateOrUpdateOutput =
  typeof ConfigurationProfileHCRPAssignmentsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates an association between a ARC machine and Automanage configuration profile
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param configurationProfileAssignmentName - Name of the configuration profile assignment. Only default is supported.
 * @param api-version - The API version to use for this operation.
 */
export const ConfigurationProfileHCRPAssignmentsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigurationProfileHCRPAssignmentsCreateOrUpdateInput,
    outputSchema: ConfigurationProfileHCRPAssignmentsCreateOrUpdateOutput,
  }));
// Input Schema
export const ConfigurationProfileHCRPAssignmentsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    configurationProfileAssignmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/machines/{machineName}/providers/Microsoft.Automanage/configurationProfileAssignments/{configurationProfileAssignmentName}",
    }),
  );
export type ConfigurationProfileHCRPAssignmentsDeleteInput =
  typeof ConfigurationProfileHCRPAssignmentsDeleteInput.Type;

// Output Schema
export const ConfigurationProfileHCRPAssignmentsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ConfigurationProfileHCRPAssignmentsDeleteOutput =
  typeof ConfigurationProfileHCRPAssignmentsDeleteOutput.Type;

// The operation
/**
 * Delete a configuration profile assignment
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription.
 * @param configurationProfileAssignmentName - Name of the configuration profile assignment
 * @param api-version - The API version to use for this operation.
 */
export const ConfigurationProfileHCRPAssignmentsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigurationProfileHCRPAssignmentsDeleteInput,
    outputSchema: ConfigurationProfileHCRPAssignmentsDeleteOutput,
  }));
// Input Schema
export const ConfigurationProfileHCRPAssignmentsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    configurationProfileAssignmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/machines/{machineName}/providers/Microsoft.Automanage/configurationProfileAssignments/{configurationProfileAssignmentName}",
    }),
  );
export type ConfigurationProfileHCRPAssignmentsGetInput =
  typeof ConfigurationProfileHCRPAssignmentsGetInput.Type;

// Output Schema
export const ConfigurationProfileHCRPAssignmentsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ConfigurationProfileHCRPAssignmentsGetOutput =
  typeof ConfigurationProfileHCRPAssignmentsGetOutput.Type;

// The operation
/**
 * Get information about a configuration profile assignment
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription.
 * @param configurationProfileAssignmentName - The configuration profile assignment name.
 * @param api-version - The API version to use for this operation.
 */
export const ConfigurationProfileHCRPAssignmentsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigurationProfileHCRPAssignmentsGetInput,
    outputSchema: ConfigurationProfileHCRPAssignmentsGetOutput,
  }));
// Input Schema
export const ConfigurationProfilesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    configurationProfileName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automanage/configurationProfiles/{configurationProfileName}",
    }),
  );
export type ConfigurationProfilesCreateOrUpdateInput =
  typeof ConfigurationProfilesCreateOrUpdateInput.Type;

// Output Schema
export const ConfigurationProfilesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ConfigurationProfilesCreateOrUpdateOutput =
  typeof ConfigurationProfilesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates a configuration profile
 *
 * @param configurationProfileName - Name of the configuration profile.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const ConfigurationProfilesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigurationProfilesCreateOrUpdateInput,
    outputSchema: ConfigurationProfilesCreateOrUpdateOutput,
  }));
// Input Schema
export const ConfigurationProfilesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    configurationProfileName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automanage/configurationProfiles/{configurationProfileName}",
    }),
  );
export type ConfigurationProfilesDeleteInput =
  typeof ConfigurationProfilesDeleteInput.Type;

// Output Schema
export const ConfigurationProfilesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ConfigurationProfilesDeleteOutput =
  typeof ConfigurationProfilesDeleteOutput.Type;

// The operation
/**
 * Delete a configuration profile
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param configurationProfileName - Name of the configuration profile
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const ConfigurationProfilesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ConfigurationProfilesDeleteInput,
    outputSchema: ConfigurationProfilesDeleteOutput,
  }),
);
// Input Schema
export const ConfigurationProfilesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    configurationProfileName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automanage/configurationProfiles/{configurationProfileName}",
    }),
  );
export type ConfigurationProfilesGetInput =
  typeof ConfigurationProfilesGetInput.Type;

// Output Schema
export const ConfigurationProfilesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ConfigurationProfilesGetOutput =
  typeof ConfigurationProfilesGetOutput.Type;

// The operation
/**
 * Get information about a configuration profile
 *
 * @param configurationProfileName - The configuration profile name.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const ConfigurationProfilesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ConfigurationProfilesGetInput,
    outputSchema: ConfigurationProfilesGetOutput,
  }),
);
// Input Schema
export const ConfigurationProfilesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automanage/configurationProfiles",
    }),
  );
export type ConfigurationProfilesListByResourceGroupInput =
  typeof ConfigurationProfilesListByResourceGroupInput.Type;

// Output Schema
export const ConfigurationProfilesListByResourceGroupOutput =
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
export type ConfigurationProfilesListByResourceGroupOutput =
  typeof ConfigurationProfilesListByResourceGroupOutput.Type;

// The operation
/**
 * Retrieve a list of configuration profile within a given resource group
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const ConfigurationProfilesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigurationProfilesListByResourceGroupInput,
    outputSchema: ConfigurationProfilesListByResourceGroupOutput,
  }));
// Input Schema
export const ConfigurationProfilesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Automanage/configurationProfiles",
    }),
  );
export type ConfigurationProfilesListBySubscriptionInput =
  typeof ConfigurationProfilesListBySubscriptionInput.Type;

// Output Schema
export const ConfigurationProfilesListBySubscriptionOutput =
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
export type ConfigurationProfilesListBySubscriptionOutput =
  typeof ConfigurationProfilesListBySubscriptionOutput.Type;

// The operation
/**
 * Retrieve a list of configuration profile within a subscription
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const ConfigurationProfilesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigurationProfilesListBySubscriptionInput,
    outputSchema: ConfigurationProfilesListBySubscriptionOutput,
  }));
// Input Schema
export const ConfigurationProfilesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    configurationProfileName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automanage/configurationProfiles/{configurationProfileName}",
    }),
  );
export type ConfigurationProfilesUpdateInput =
  typeof ConfigurationProfilesUpdateInput.Type;

// Output Schema
export const ConfigurationProfilesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ConfigurationProfilesUpdateOutput =
  typeof ConfigurationProfilesUpdateOutput.Type;

// The operation
/**
 * Updates a configuration profile
 *
 * @param configurationProfileName - Name of the configuration profile.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const ConfigurationProfilesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ConfigurationProfilesUpdateInput,
    outputSchema: ConfigurationProfilesUpdateOutput,
  }),
);
// Input Schema
export const ConfigurationProfilesVersionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    configurationProfileName: Schema.String.pipe(T.PathParam()),
    versionName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automanage/configurationProfiles/{configurationProfileName}/versions/{versionName}",
    }),
  );
export type ConfigurationProfilesVersionsCreateOrUpdateInput =
  typeof ConfigurationProfilesVersionsCreateOrUpdateInput.Type;

// Output Schema
export const ConfigurationProfilesVersionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ConfigurationProfilesVersionsCreateOrUpdateOutput =
  typeof ConfigurationProfilesVersionsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates a configuration profile version
 *
 * @param configurationProfileName - Name of the configuration profile.
 * @param versionName - The configuration profile version name.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const ConfigurationProfilesVersionsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigurationProfilesVersionsCreateOrUpdateInput,
    outputSchema: ConfigurationProfilesVersionsCreateOrUpdateOutput,
  }));
// Input Schema
export const ConfigurationProfilesVersionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    configurationProfileName: Schema.String.pipe(T.PathParam()),
    versionName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automanage/configurationProfiles/{configurationProfileName}/versions/{versionName}",
    }),
  );
export type ConfigurationProfilesVersionsDeleteInput =
  typeof ConfigurationProfilesVersionsDeleteInput.Type;

// Output Schema
export const ConfigurationProfilesVersionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ConfigurationProfilesVersionsDeleteOutput =
  typeof ConfigurationProfilesVersionsDeleteOutput.Type;

// The operation
/**
 * Delete a configuration profile version
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param configurationProfileName - Name of the configuration profile
 * @param versionName - The configuration profile version name.
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const ConfigurationProfilesVersionsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigurationProfilesVersionsDeleteInput,
    outputSchema: ConfigurationProfilesVersionsDeleteOutput,
  }));
// Input Schema
export const ConfigurationProfilesVersionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    configurationProfileName: Schema.String.pipe(T.PathParam()),
    versionName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automanage/configurationProfiles/{configurationProfileName}/versions/{versionName}",
    }),
  );
export type ConfigurationProfilesVersionsGetInput =
  typeof ConfigurationProfilesVersionsGetInput.Type;

// Output Schema
export const ConfigurationProfilesVersionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ConfigurationProfilesVersionsGetOutput =
  typeof ConfigurationProfilesVersionsGetOutput.Type;

// The operation
/**
 * Get information about a configuration profile version
 *
 * @param configurationProfileName - The configuration profile name.
 * @param versionName - The configuration profile version name.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const ConfigurationProfilesVersionsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigurationProfilesVersionsGetInput,
    outputSchema: ConfigurationProfilesVersionsGetOutput,
  }));
// Input Schema
export const ConfigurationProfilesVersionsListChildResourcesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    configurationProfileName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automanage/configurationProfiles/{configurationProfileName}/versions",
    }),
  );
export type ConfigurationProfilesVersionsListChildResourcesInput =
  typeof ConfigurationProfilesVersionsListChildResourcesInput.Type;

// Output Schema
export const ConfigurationProfilesVersionsListChildResourcesOutput =
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
export type ConfigurationProfilesVersionsListChildResourcesOutput =
  typeof ConfigurationProfilesVersionsListChildResourcesOutput.Type;

// The operation
/**
 * Retrieve a list of configuration profile version for a configuration profile
 *
 * @param configurationProfileName - Name of the configuration profile.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const ConfigurationProfilesVersionsListChildResources =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigurationProfilesVersionsListChildResourcesInput,
    outputSchema: ConfigurationProfilesVersionsListChildResourcesOutput,
  }));
// Input Schema
export const HCIReportsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  configurationProfileAssignmentName: Schema.String.pipe(T.PathParam()),
  reportName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHci/clusters/{clusterName}/providers/Microsoft.Automanage/configurationProfileAssignments/{configurationProfileAssignmentName}/reports/{reportName}",
  }),
);
export type HCIReportsGetInput = typeof HCIReportsGetInput.Type;

// Output Schema
export const HCIReportsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type HCIReportsGetOutput = typeof HCIReportsGetOutput.Type;

// The operation
/**
 * Get information about a report associated with a configuration profile assignment run
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription.
 * @param configurationProfileAssignmentName - The configuration profile assignment name.
 * @param reportName - The report name.
 * @param api-version - The API version to use for this operation.
 */
export const HCIReportsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: HCIReportsGetInput,
  outputSchema: HCIReportsGetOutput,
}));
// Input Schema
export const HCIReportsListByConfigurationProfileAssignmentsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    configurationProfileAssignmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHci/clusters/{clusterName}/providers/Microsoft.Automanage/configurationProfileAssignments/{configurationProfileAssignmentName}/reports",
    }),
  );
export type HCIReportsListByConfigurationProfileAssignmentsInput =
  typeof HCIReportsListByConfigurationProfileAssignmentsInput.Type;

// Output Schema
export const HCIReportsListByConfigurationProfileAssignmentsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
  });
export type HCIReportsListByConfigurationProfileAssignmentsOutput =
  typeof HCIReportsListByConfigurationProfileAssignmentsOutput.Type;

// The operation
/**
 * Retrieve a list of reports within a given configuration profile assignment
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param configurationProfileAssignmentName - The configuration profile assignment name.
 * @param api-version - The API version to use for this operation.
 */
export const HCIReportsListByConfigurationProfileAssignments =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: HCIReportsListByConfigurationProfileAssignmentsInput,
    outputSchema: HCIReportsListByConfigurationProfileAssignmentsOutput,
  }));
// Input Schema
export const HCRPReportsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  configurationProfileAssignmentName: Schema.String.pipe(T.PathParam()),
  reportName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/machines/{machineName}/providers/Microsoft.Automanage/configurationProfileAssignments/{configurationProfileAssignmentName}/reports/{reportName}",
  }),
);
export type HCRPReportsGetInput = typeof HCRPReportsGetInput.Type;

// Output Schema
export const HCRPReportsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type HCRPReportsGetOutput = typeof HCRPReportsGetOutput.Type;

// The operation
/**
 * Get information about a report associated with a configuration profile assignment run
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param configurationProfileAssignmentName - The configuration profile assignment name.
 * @param reportName - The report name.
 * @param api-version - The API version to use for this operation.
 */
export const HCRPReportsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: HCRPReportsGetInput,
  outputSchema: HCRPReportsGetOutput,
}));
// Input Schema
export const HCRPReportsListByConfigurationProfileAssignmentsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    configurationProfileAssignmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/machines/{machineName}/providers/Microsoft.Automanage/configurationProfileAssignments/{configurationProfileAssignmentName}/reports",
    }),
  );
export type HCRPReportsListByConfigurationProfileAssignmentsInput =
  typeof HCRPReportsListByConfigurationProfileAssignmentsInput.Type;

// Output Schema
export const HCRPReportsListByConfigurationProfileAssignmentsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
  });
export type HCRPReportsListByConfigurationProfileAssignmentsOutput =
  typeof HCRPReportsListByConfigurationProfileAssignmentsOutput.Type;

// The operation
/**
 * Retrieve a list of reports within a given configuration profile assignment
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param configurationProfileAssignmentName - The configuration profile assignment name.
 * @param api-version - The API version to use for this operation.
 */
export const HCRPReportsListByConfigurationProfileAssignments =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: HCRPReportsListByConfigurationProfileAssignmentsInput,
    outputSchema: HCRPReportsListByConfigurationProfileAssignmentsOutput,
  }));
// Input Schema
export const ReportsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  configurationProfileAssignmentName: Schema.String.pipe(T.PathParam()),
  reportName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/providers/Microsoft.Automanage/configurationProfileAssignments/{configurationProfileAssignmentName}/reports/{reportName}",
  }),
);
export type ReportsGetInput = typeof ReportsGetInput.Type;

// Output Schema
export const ReportsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ReportsGetOutput = typeof ReportsGetOutput.Type;

// The operation
/**
 * Get information about a report associated with a configuration profile assignment run
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param configurationProfileAssignmentName - The configuration profile assignment name.
 * @param reportName - The report name.
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const reportsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ReportsGetInput,
  outputSchema: ReportsGetOutput,
}));
// Input Schema
export const ReportsListByConfigurationProfileAssignmentsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    configurationProfileAssignmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/providers/Microsoft.Automanage/configurationProfileAssignments/{configurationProfileAssignmentName}/reports",
    }),
  );
export type ReportsListByConfigurationProfileAssignmentsInput =
  typeof ReportsListByConfigurationProfileAssignmentsInput.Type;

// Output Schema
export const ReportsListByConfigurationProfileAssignmentsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
  });
export type ReportsListByConfigurationProfileAssignmentsOutput =
  typeof ReportsListByConfigurationProfileAssignmentsOutput.Type;

// The operation
/**
 * Retrieve a list of reports within a given configuration profile assignment
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param configurationProfileAssignmentName - The configuration profile assignment name.
 * @param api-version - The API version to use for this operation.
 */
export const reportsListByConfigurationProfileAssignments =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReportsListByConfigurationProfileAssignmentsInput,
    outputSchema: ReportsListByConfigurationProfileAssignmentsOutput,
  }));
// Input Schema
export const ServicePrincipalsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Automanage/servicePrincipals/default",
    }),
  );
export type ServicePrincipalsGetInput = typeof ServicePrincipalsGetInput.Type;

// Output Schema
export const ServicePrincipalsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ServicePrincipalsGetOutput = typeof ServicePrincipalsGetOutput.Type;

// The operation
/**
 * Get the Automanage AAD first party Application Service Principal details for the subscription id.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const ServicePrincipalsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ServicePrincipalsGetInput,
    outputSchema: ServicePrincipalsGetOutput,
  }),
);
// Input Schema
export const ServicePrincipalsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Automanage/servicePrincipals",
    }),
  );
export type ServicePrincipalsListBySubscriptionInput =
  typeof ServicePrincipalsListBySubscriptionInput.Type;

// Output Schema
export const ServicePrincipalsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
  });
export type ServicePrincipalsListBySubscriptionOutput =
  typeof ServicePrincipalsListBySubscriptionOutput.Type;

// The operation
/**
 * Get the Automanage AAD first party Application Service Principal details for the subscription id.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const ServicePrincipalsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServicePrincipalsListBySubscriptionInput,
    outputSchema: ServicePrincipalsListBySubscriptionOutput,
  }));
