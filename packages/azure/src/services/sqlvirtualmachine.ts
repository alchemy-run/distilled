/**
 * Azure Sqlvirtualmachine API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const AvailabilityGroupListenersCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    sqlVirtualMachineGroupName: Schema.String.pipe(T.PathParam()),
    availabilityGroupListenerName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SqlVirtualMachine/sqlVirtualMachineGroups/{sqlVirtualMachineGroupName}/availabilityGroupListeners/{availabilityGroupListenerName}",
    }),
  );
export type AvailabilityGroupListenersCreateOrUpdateInput =
  typeof AvailabilityGroupListenersCreateOrUpdateInput.Type;

// Output Schema
export const AvailabilityGroupListenersCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type AvailabilityGroupListenersCreateOrUpdateOutput =
  typeof AvailabilityGroupListenersCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates an availability group listener.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param sqlVirtualMachineGroupName - Name of the SQL virtual machine group.
 * @param availabilityGroupListenerName - Name of the availability group listener.
 */
export const AvailabilityGroupListenersCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AvailabilityGroupListenersCreateOrUpdateInput,
    outputSchema: AvailabilityGroupListenersCreateOrUpdateOutput,
  }));
// Input Schema
export const AvailabilityGroupListenersDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    sqlVirtualMachineGroupName: Schema.String.pipe(T.PathParam()),
    availabilityGroupListenerName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SqlVirtualMachine/sqlVirtualMachineGroups/{sqlVirtualMachineGroupName}/availabilityGroupListeners/{availabilityGroupListenerName}",
    }),
  );
export type AvailabilityGroupListenersDeleteInput =
  typeof AvailabilityGroupListenersDeleteInput.Type;

// Output Schema
export const AvailabilityGroupListenersDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AvailabilityGroupListenersDeleteOutput =
  typeof AvailabilityGroupListenersDeleteOutput.Type;

// The operation
/**
 * Deletes an availability group listener.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param sqlVirtualMachineGroupName - Name of the SQL virtual machine group.
 * @param availabilityGroupListenerName - Name of the availability group listener.
 */
export const AvailabilityGroupListenersDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AvailabilityGroupListenersDeleteInput,
    outputSchema: AvailabilityGroupListenersDeleteOutput,
  }));
// Input Schema
export const AvailabilityGroupListenersGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    sqlVirtualMachineGroupName: Schema.String.pipe(T.PathParam()),
    availabilityGroupListenerName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SqlVirtualMachine/sqlVirtualMachineGroups/{sqlVirtualMachineGroupName}/availabilityGroupListeners/{availabilityGroupListenerName}",
    }),
  );
export type AvailabilityGroupListenersGetInput =
  typeof AvailabilityGroupListenersGetInput.Type;

// Output Schema
export const AvailabilityGroupListenersGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type AvailabilityGroupListenersGetOutput =
  typeof AvailabilityGroupListenersGetOutput.Type;

// The operation
/**
 * Gets an availability group listener.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param sqlVirtualMachineGroupName - Name of the SQL virtual machine group.
 * @param availabilityGroupListenerName - Name of the availability group listener.
 * @param $expand - The child resources to include in the response.
 */
export const AvailabilityGroupListenersGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AvailabilityGroupListenersGetInput,
    outputSchema: AvailabilityGroupListenersGetOutput,
  }));
// Input Schema
export const AvailabilityGroupListenersListByGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    sqlVirtualMachineGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SqlVirtualMachine/sqlVirtualMachineGroups/{sqlVirtualMachineGroupName}/availabilityGroupListeners",
    }),
  );
export type AvailabilityGroupListenersListByGroupInput =
  typeof AvailabilityGroupListenersListByGroupInput.Type;

// Output Schema
export const AvailabilityGroupListenersListByGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type AvailabilityGroupListenersListByGroupOutput =
  typeof AvailabilityGroupListenersListByGroupOutput.Type;

// The operation
/**
 * Lists all availability group listeners in a SQL virtual machine group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param sqlVirtualMachineGroupName - Name of the SQL virtual machine group.
 */
export const AvailabilityGroupListenersListByGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AvailabilityGroupListenersListByGroupInput,
    outputSchema: AvailabilityGroupListenersListByGroupOutput,
  }));
// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.SqlVirtualMachine/operations",
  }),
);
export type OperationsListInput = typeof OperationsListInput.Type;

// Output Schema
export const OperationsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(
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
      origin: Schema.optional(Schema.Literals(["user", "system"])),
      properties: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    }),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type OperationsListOutput = typeof OperationsListOutput.Type;

// The operation
/**
 * Lists all of the available SQL Virtual Machine Rest API operations.
 *
 * @param api-version - The API version to use for this operation.
 */
export const OperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationsListInput,
  outputSchema: OperationsListOutput,
}));
// Input Schema
export const SqlVirtualMachineGroupsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    sqlVirtualMachineGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SqlVirtualMachine/sqlVirtualMachineGroups/{sqlVirtualMachineGroupName}",
    }),
  );
export type SqlVirtualMachineGroupsCreateOrUpdateInput =
  typeof SqlVirtualMachineGroupsCreateOrUpdateInput.Type;

// Output Schema
export const SqlVirtualMachineGroupsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SqlVirtualMachineGroupsCreateOrUpdateOutput =
  typeof SqlVirtualMachineGroupsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a SQL virtual machine group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param sqlVirtualMachineGroupName - Name of the SQL virtual machine group.
 */
export const SqlVirtualMachineGroupsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlVirtualMachineGroupsCreateOrUpdateInput,
    outputSchema: SqlVirtualMachineGroupsCreateOrUpdateOutput,
  }));
// Input Schema
export const SqlVirtualMachineGroupsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    sqlVirtualMachineGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SqlVirtualMachine/sqlVirtualMachineGroups/{sqlVirtualMachineGroupName}",
    }),
  );
export type SqlVirtualMachineGroupsDeleteInput =
  typeof SqlVirtualMachineGroupsDeleteInput.Type;

// Output Schema
export const SqlVirtualMachineGroupsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SqlVirtualMachineGroupsDeleteOutput =
  typeof SqlVirtualMachineGroupsDeleteOutput.Type;

// The operation
/**
 * Deletes a SQL virtual machine group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param sqlVirtualMachineGroupName - Name of the SQL virtual machine group.
 */
export const SqlVirtualMachineGroupsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlVirtualMachineGroupsDeleteInput,
    outputSchema: SqlVirtualMachineGroupsDeleteOutput,
  }));
// Input Schema
export const SqlVirtualMachineGroupsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    sqlVirtualMachineGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SqlVirtualMachine/sqlVirtualMachineGroups/{sqlVirtualMachineGroupName}",
    }),
  );
export type SqlVirtualMachineGroupsGetInput =
  typeof SqlVirtualMachineGroupsGetInput.Type;

// Output Schema
export const SqlVirtualMachineGroupsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SqlVirtualMachineGroupsGetOutput =
  typeof SqlVirtualMachineGroupsGetOutput.Type;

// The operation
/**
 * Gets a SQL virtual machine group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param sqlVirtualMachineGroupName - Name of the SQL virtual machine group.
 */
export const SqlVirtualMachineGroupsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SqlVirtualMachineGroupsGetInput,
    outputSchema: SqlVirtualMachineGroupsGetOutput,
  }),
);
// Input Schema
export const SqlVirtualMachineGroupsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.SqlVirtualMachine/sqlVirtualMachineGroups",
    }),
  );
export type SqlVirtualMachineGroupsListInput =
  typeof SqlVirtualMachineGroupsListInput.Type;

// Output Schema
export const SqlVirtualMachineGroupsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type SqlVirtualMachineGroupsListOutput =
  typeof SqlVirtualMachineGroupsListOutput.Type;

// The operation
/**
 * Gets all SQL virtual machine groups in a subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const SqlVirtualMachineGroupsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SqlVirtualMachineGroupsListInput,
    outputSchema: SqlVirtualMachineGroupsListOutput,
  }),
);
// Input Schema
export const SqlVirtualMachineGroupsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SqlVirtualMachine/sqlVirtualMachineGroups",
    }),
  );
export type SqlVirtualMachineGroupsListByResourceGroupInput =
  typeof SqlVirtualMachineGroupsListByResourceGroupInput.Type;

// Output Schema
export const SqlVirtualMachineGroupsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type SqlVirtualMachineGroupsListByResourceGroupOutput =
  typeof SqlVirtualMachineGroupsListByResourceGroupOutput.Type;

// The operation
/**
 * Gets all SQL virtual machine groups in a resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const SqlVirtualMachineGroupsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlVirtualMachineGroupsListByResourceGroupInput,
    outputSchema: SqlVirtualMachineGroupsListByResourceGroupOutput,
  }));
// Input Schema
export const SqlVirtualMachineGroupsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    sqlVirtualMachineGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SqlVirtualMachine/sqlVirtualMachineGroups/{sqlVirtualMachineGroupName}",
    }),
  );
export type SqlVirtualMachineGroupsUpdateInput =
  typeof SqlVirtualMachineGroupsUpdateInput.Type;

// Output Schema
export const SqlVirtualMachineGroupsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SqlVirtualMachineGroupsUpdateOutput =
  typeof SqlVirtualMachineGroupsUpdateOutput.Type;

// The operation
/**
 * Updates SQL virtual machine group tags.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param sqlVirtualMachineGroupName - Name of the SQL virtual machine group.
 */
export const SqlVirtualMachineGroupsUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlVirtualMachineGroupsUpdateInput,
    outputSchema: SqlVirtualMachineGroupsUpdateOutput,
  }));
// Input Schema
export const SqlVirtualMachinesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    sqlVirtualMachineName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SqlVirtualMachine/sqlVirtualMachines/{sqlVirtualMachineName}",
    }),
  );
export type SqlVirtualMachinesCreateOrUpdateInput =
  typeof SqlVirtualMachinesCreateOrUpdateInput.Type;

// Output Schema
export const SqlVirtualMachinesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SqlVirtualMachinesCreateOrUpdateOutput =
  typeof SqlVirtualMachinesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a SQL virtual machine.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param sqlVirtualMachineName - Name of the SQL virtual machine.
 */
export const SqlVirtualMachinesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlVirtualMachinesCreateOrUpdateInput,
    outputSchema: SqlVirtualMachinesCreateOrUpdateOutput,
  }));
// Input Schema
export const SqlVirtualMachinesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    sqlVirtualMachineName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SqlVirtualMachine/sqlVirtualMachines/{sqlVirtualMachineName}",
    }),
  );
export type SqlVirtualMachinesDeleteInput =
  typeof SqlVirtualMachinesDeleteInput.Type;

// Output Schema
export const SqlVirtualMachinesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SqlVirtualMachinesDeleteOutput =
  typeof SqlVirtualMachinesDeleteOutput.Type;

// The operation
/**
 * Deletes a SQL virtual machine.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param sqlVirtualMachineName - Name of the SQL virtual machine.
 */
export const SqlVirtualMachinesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SqlVirtualMachinesDeleteInput,
    outputSchema: SqlVirtualMachinesDeleteOutput,
  }),
);
// Input Schema
export const SqlVirtualMachinesFetchDCAssessmentInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    sqlVirtualMachineName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SqlVirtualMachine/sqlVirtualMachines/{sqlVirtualMachineName}/fetchDCAssessment",
    }),
  );
export type SqlVirtualMachinesFetchDCAssessmentInput =
  typeof SqlVirtualMachinesFetchDCAssessmentInput.Type;

// Output Schema
export const SqlVirtualMachinesFetchDCAssessmentOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SqlVirtualMachinesFetchDCAssessmentOutput =
  typeof SqlVirtualMachinesFetchDCAssessmentOutput.Type;

// The operation
/**
 * Starts SQL best practices Assessment with Disk Config rules on SQL virtual machine
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param sqlVirtualMachineName - Name of the SQL virtual machine.
 */
export const SqlVirtualMachinesFetchDCAssessment =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlVirtualMachinesFetchDCAssessmentInput,
    outputSchema: SqlVirtualMachinesFetchDCAssessmentOutput,
  }));
// Input Schema
export const SqlVirtualMachinesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    sqlVirtualMachineName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SqlVirtualMachine/sqlVirtualMachines/{sqlVirtualMachineName}",
    }),
  );
export type SqlVirtualMachinesGetInput = typeof SqlVirtualMachinesGetInput.Type;

// Output Schema
export const SqlVirtualMachinesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SqlVirtualMachinesGetOutput =
  typeof SqlVirtualMachinesGetOutput.Type;

// The operation
/**
 * Gets a SQL virtual machine.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param sqlVirtualMachineName - Name of the SQL virtual machine.
 * @param $expand - The child resources to include in the response.
 */
export const SqlVirtualMachinesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SqlVirtualMachinesGetInput,
    outputSchema: SqlVirtualMachinesGetOutput,
  }),
);
// Input Schema
export const SqlVirtualMachinesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.SqlVirtualMachine/sqlVirtualMachines",
    }),
  );
export type SqlVirtualMachinesListInput =
  typeof SqlVirtualMachinesListInput.Type;

// Output Schema
export const SqlVirtualMachinesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type SqlVirtualMachinesListOutput =
  typeof SqlVirtualMachinesListOutput.Type;

// The operation
/**
 * Gets all SQL virtual machines in a subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const SqlVirtualMachinesList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SqlVirtualMachinesListInput,
    outputSchema: SqlVirtualMachinesListOutput,
  }),
);
// Input Schema
export const SqlVirtualMachinesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SqlVirtualMachine/sqlVirtualMachines",
    }),
  );
export type SqlVirtualMachinesListByResourceGroupInput =
  typeof SqlVirtualMachinesListByResourceGroupInput.Type;

// Output Schema
export const SqlVirtualMachinesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type SqlVirtualMachinesListByResourceGroupOutput =
  typeof SqlVirtualMachinesListByResourceGroupOutput.Type;

// The operation
/**
 * Gets all SQL virtual machines in a resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const SqlVirtualMachinesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlVirtualMachinesListByResourceGroupInput,
    outputSchema: SqlVirtualMachinesListByResourceGroupOutput,
  }));
// Input Schema
export const SqlVirtualMachinesListBySqlVmGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    sqlVirtualMachineGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SqlVirtualMachine/sqlVirtualMachineGroups/{sqlVirtualMachineGroupName}/sqlVirtualMachines",
    }),
  );
export type SqlVirtualMachinesListBySqlVmGroupInput =
  typeof SqlVirtualMachinesListBySqlVmGroupInput.Type;

// Output Schema
export const SqlVirtualMachinesListBySqlVmGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type SqlVirtualMachinesListBySqlVmGroupOutput =
  typeof SqlVirtualMachinesListBySqlVmGroupOutput.Type;

// The operation
/**
 * Gets the list of sql virtual machines in a SQL virtual machine group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param sqlVirtualMachineGroupName - Name of the SQL virtual machine group.
 */
export const SqlVirtualMachinesListBySqlVmGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlVirtualMachinesListBySqlVmGroupInput,
    outputSchema: SqlVirtualMachinesListBySqlVmGroupOutput,
  }));
// Input Schema
export const SqlVirtualMachinesRedeployInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    sqlVirtualMachineName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SqlVirtualMachine/sqlVirtualMachines/{sqlVirtualMachineName}/redeploy",
    }),
  );
export type SqlVirtualMachinesRedeployInput =
  typeof SqlVirtualMachinesRedeployInput.Type;

// Output Schema
export const SqlVirtualMachinesRedeployOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SqlVirtualMachinesRedeployOutput =
  typeof SqlVirtualMachinesRedeployOutput.Type;

// The operation
/**
 * Uninstalls and reinstalls the SQL IaaS Extension.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param sqlVirtualMachineName - Name of the SQL virtual machine.
 */
export const SqlVirtualMachinesRedeploy = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SqlVirtualMachinesRedeployInput,
    outputSchema: SqlVirtualMachinesRedeployOutput,
  }),
);
// Input Schema
export const SqlVirtualMachinesStartAssessmentInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    sqlVirtualMachineName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SqlVirtualMachine/sqlVirtualMachines/{sqlVirtualMachineName}/startAssessment",
    }),
  );
export type SqlVirtualMachinesStartAssessmentInput =
  typeof SqlVirtualMachinesStartAssessmentInput.Type;

// Output Schema
export const SqlVirtualMachinesStartAssessmentOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SqlVirtualMachinesStartAssessmentOutput =
  typeof SqlVirtualMachinesStartAssessmentOutput.Type;

// The operation
/**
 * Starts SQL best practices Assessment on SQL virtual machine.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param sqlVirtualMachineName - Name of the SQL virtual machine.
 */
export const SqlVirtualMachinesStartAssessment =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlVirtualMachinesStartAssessmentInput,
    outputSchema: SqlVirtualMachinesStartAssessmentOutput,
  }));
// Input Schema
export const SqlVirtualMachinesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    sqlVirtualMachineName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SqlVirtualMachine/sqlVirtualMachines/{sqlVirtualMachineName}",
    }),
  );
export type SqlVirtualMachinesUpdateInput =
  typeof SqlVirtualMachinesUpdateInput.Type;

// Output Schema
export const SqlVirtualMachinesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SqlVirtualMachinesUpdateOutput =
  typeof SqlVirtualMachinesUpdateOutput.Type;

// The operation
/**
 * Updates SQL virtual machine tags.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param sqlVirtualMachineName - Name of the SQL virtual machine.
 */
export const SqlVirtualMachinesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SqlVirtualMachinesUpdateInput,
    outputSchema: SqlVirtualMachinesUpdateOutput,
  }),
);
// Input Schema
export const SqlVirtualMachineTroubleshootTroubleshootInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    sqlVirtualMachineName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SqlVirtualMachine/sqlVirtualMachines/{sqlVirtualMachineName}/troubleshoot",
    }),
  );
export type SqlVirtualMachineTroubleshootTroubleshootInput =
  typeof SqlVirtualMachineTroubleshootTroubleshootInput.Type;

// Output Schema
export const SqlVirtualMachineTroubleshootTroubleshootOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    startTimeUtc: Schema.optional(Schema.String),
    endTimeUtc: Schema.optional(Schema.String),
    troubleshootingScenario: Schema.optional(
      Schema.Literals(["UnhealthyReplica"]),
    ),
    properties: Schema.optional(
      Schema.Struct({
        unhealthyReplicaInfo: Schema.optional(
          Schema.Struct({
            availabilityGroupName: Schema.optional(Schema.String),
          }),
        ),
      }),
    ),
    virtualMachineResourceId: Schema.optional(Schema.String),
  });
export type SqlVirtualMachineTroubleshootTroubleshootOutput =
  typeof SqlVirtualMachineTroubleshootTroubleshootOutput.Type;

// The operation
/**
 * Starts SQL virtual machine troubleshooting.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param sqlVirtualMachineName - Name of the SQL virtual machine.
 */
export const SqlVirtualMachineTroubleshootTroubleshoot =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlVirtualMachineTroubleshootTroubleshootInput,
    outputSchema: SqlVirtualMachineTroubleshootTroubleshootOutput,
  }));
