/**
 * Azure Guestconfiguration API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const GuestConfigurationAssignmentReportsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vmName: Schema.String.pipe(T.PathParam()),
    guestConfigurationAssignmentName: Schema.String.pipe(T.PathParam()),
    reportId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/providers/Microsoft.GuestConfiguration/guestConfigurationAssignments/{guestConfigurationAssignmentName}/reports/{reportId}",
    }),
  );
export type GuestConfigurationAssignmentReportsGetInput =
  typeof GuestConfigurationAssignmentReportsGetInput.Type;

// Output Schema
export const GuestConfigurationAssignmentReportsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        complianceStatus: Schema.optional(
          Schema.Literals(["Compliant", "NonCompliant", "Pending"]),
        ),
        reportId: Schema.optional(Schema.String),
        assignment: Schema.optional(
          Schema.Struct({
            name: Schema.optional(Schema.String),
            configuration: Schema.optional(
              Schema.Struct({
                name: Schema.optional(Schema.String),
                version: Schema.optional(Schema.String),
              }),
            ),
          }),
        ),
        vm: Schema.optional(
          Schema.Struct({
            id: Schema.optional(Schema.String),
            uuid: Schema.optional(Schema.String),
          }),
        ),
        startTime: Schema.optional(Schema.String),
        endTime: Schema.optional(Schema.String),
        details: Schema.optional(
          Schema.Struct({
            complianceStatus: Schema.optional(
              Schema.Literals(["Compliant", "NonCompliant", "Pending"]),
            ),
            startTime: Schema.optional(Schema.String),
            endTime: Schema.optional(Schema.String),
            jobId: Schema.optional(Schema.String),
            operationType: Schema.optional(
              Schema.Literals(["Consistency", "Initial"]),
            ),
            resources: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  complianceStatus: Schema.optional(
                    Schema.Literals(["Compliant", "NonCompliant", "Pending"]),
                  ),
                  resourceId: Schema.optional(Schema.String),
                  reasons: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        phrase: Schema.optional(Schema.String),
                        code: Schema.optional(Schema.String),
                      }),
                    ),
                  ),
                  properties: Schema.optional(Schema.Unknown),
                }),
              ),
            ),
          }),
        ),
        vmssResourceId: Schema.optional(Schema.String),
      }),
    ),
  });
export type GuestConfigurationAssignmentReportsGetOutput =
  typeof GuestConfigurationAssignmentReportsGetOutput.Type;

// The operation
/**
 * Get a report for the guest configuration assignment, by reportId.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vmName - The name of the virtual machine.
 * @param guestConfigurationAssignmentName - The guest configuration assignment name.
 * @param reportId - The GUID for the guest configuration assignment report.
 */
export const GuestConfigurationAssignmentReportsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GuestConfigurationAssignmentReportsGetInput,
    outputSchema: GuestConfigurationAssignmentReportsGetOutput,
  }));
// Input Schema
export const GuestConfigurationAssignmentReportsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vmName: Schema.String.pipe(T.PathParam()),
    guestConfigurationAssignmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/providers/Microsoft.GuestConfiguration/guestConfigurationAssignments/{guestConfigurationAssignmentName}/reports",
    }),
  );
export type GuestConfigurationAssignmentReportsListInput =
  typeof GuestConfigurationAssignmentReportsListInput.Type;

// Output Schema
export const GuestConfigurationAssignmentReportsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Struct({
              complianceStatus: Schema.optional(
                Schema.Literals(["Compliant", "NonCompliant", "Pending"]),
              ),
              reportId: Schema.optional(Schema.String),
              assignment: Schema.optional(
                Schema.Struct({
                  name: Schema.optional(Schema.String),
                  configuration: Schema.optional(
                    Schema.Struct({
                      name: Schema.optional(Schema.String),
                      version: Schema.optional(Schema.String),
                    }),
                  ),
                }),
              ),
              vm: Schema.optional(
                Schema.Struct({
                  id: Schema.optional(Schema.String),
                  uuid: Schema.optional(Schema.String),
                }),
              ),
              startTime: Schema.optional(Schema.String),
              endTime: Schema.optional(Schema.String),
              details: Schema.optional(
                Schema.Struct({
                  complianceStatus: Schema.optional(
                    Schema.Literals(["Compliant", "NonCompliant", "Pending"]),
                  ),
                  startTime: Schema.optional(Schema.String),
                  endTime: Schema.optional(Schema.String),
                  jobId: Schema.optional(Schema.String),
                  operationType: Schema.optional(
                    Schema.Literals(["Consistency", "Initial"]),
                  ),
                  resources: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        complianceStatus: Schema.optional(
                          Schema.Literals([
                            "Compliant",
                            "NonCompliant",
                            "Pending",
                          ]),
                        ),
                        resourceId: Schema.optional(Schema.String),
                        reasons: Schema.optional(
                          Schema.Array(
                            Schema.Struct({
                              phrase: Schema.optional(Schema.String),
                              code: Schema.optional(Schema.String),
                            }),
                          ),
                        ),
                        properties: Schema.optional(Schema.Unknown),
                      }),
                    ),
                  ),
                }),
              ),
              vmssResourceId: Schema.optional(Schema.String),
            }),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type GuestConfigurationAssignmentReportsListOutput =
  typeof GuestConfigurationAssignmentReportsListOutput.Type;

// The operation
/**
 * List all reports for the guest configuration assignment, latest report first.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vmName - The name of the virtual machine.
 * @param guestConfigurationAssignmentName - The guest configuration assignment name.
 */
export const GuestConfigurationAssignmentReportsList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GuestConfigurationAssignmentReportsListInput,
    outputSchema: GuestConfigurationAssignmentReportsListOutput,
  }));
// Input Schema
export const GuestConfigurationAssignmentReportsVMSSGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vmssName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    id: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmssName}/providers/Microsoft.GuestConfiguration/guestConfigurationAssignments/{name}/reports/{id}",
    }),
  );
export type GuestConfigurationAssignmentReportsVMSSGetInput =
  typeof GuestConfigurationAssignmentReportsVMSSGetInput.Type;

// Output Schema
export const GuestConfigurationAssignmentReportsVMSSGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        complianceStatus: Schema.optional(
          Schema.Literals(["Compliant", "NonCompliant", "Pending"]),
        ),
        reportId: Schema.optional(Schema.String),
        assignment: Schema.optional(
          Schema.Struct({
            name: Schema.optional(Schema.String),
            configuration: Schema.optional(
              Schema.Struct({
                name: Schema.optional(Schema.String),
                version: Schema.optional(Schema.String),
              }),
            ),
          }),
        ),
        vm: Schema.optional(
          Schema.Struct({
            id: Schema.optional(Schema.String),
            uuid: Schema.optional(Schema.String),
          }),
        ),
        startTime: Schema.optional(Schema.String),
        endTime: Schema.optional(Schema.String),
        details: Schema.optional(
          Schema.Struct({
            complianceStatus: Schema.optional(
              Schema.Literals(["Compliant", "NonCompliant", "Pending"]),
            ),
            startTime: Schema.optional(Schema.String),
            endTime: Schema.optional(Schema.String),
            jobId: Schema.optional(Schema.String),
            operationType: Schema.optional(
              Schema.Literals(["Consistency", "Initial"]),
            ),
            resources: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  complianceStatus: Schema.optional(
                    Schema.Literals(["Compliant", "NonCompliant", "Pending"]),
                  ),
                  resourceId: Schema.optional(Schema.String),
                  reasons: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        phrase: Schema.optional(Schema.String),
                        code: Schema.optional(Schema.String),
                      }),
                    ),
                  ),
                  properties: Schema.optional(Schema.Unknown),
                }),
              ),
            ),
          }),
        ),
        vmssResourceId: Schema.optional(Schema.String),
      }),
    ),
  });
export type GuestConfigurationAssignmentReportsVMSSGetOutput =
  typeof GuestConfigurationAssignmentReportsVMSSGetOutput.Type;

// The operation
/**
 * Get a report for the VMSS guest configuration assignment, by reportId.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vmssName - The name of the virtual machine scale set.
 * @param name - The guest configuration assignment name.
 * @param id - The GUID for the guest configuration assignment report.
 */
export const GuestConfigurationAssignmentReportsVMSSGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GuestConfigurationAssignmentReportsVMSSGetInput,
    outputSchema: GuestConfigurationAssignmentReportsVMSSGetOutput,
  }));
// Input Schema
export const GuestConfigurationAssignmentReportsVMSSListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vmssName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmssName}/providers/Microsoft.GuestConfiguration/guestConfigurationAssignments/{name}/reports",
    }),
  );
export type GuestConfigurationAssignmentReportsVMSSListInput =
  typeof GuestConfigurationAssignmentReportsVMSSListInput.Type;

// Output Schema
export const GuestConfigurationAssignmentReportsVMSSListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Struct({
              complianceStatus: Schema.optional(
                Schema.Literals(["Compliant", "NonCompliant", "Pending"]),
              ),
              reportId: Schema.optional(Schema.String),
              assignment: Schema.optional(
                Schema.Struct({
                  name: Schema.optional(Schema.String),
                  configuration: Schema.optional(
                    Schema.Struct({
                      name: Schema.optional(Schema.String),
                      version: Schema.optional(Schema.String),
                    }),
                  ),
                }),
              ),
              vm: Schema.optional(
                Schema.Struct({
                  id: Schema.optional(Schema.String),
                  uuid: Schema.optional(Schema.String),
                }),
              ),
              startTime: Schema.optional(Schema.String),
              endTime: Schema.optional(Schema.String),
              details: Schema.optional(
                Schema.Struct({
                  complianceStatus: Schema.optional(
                    Schema.Literals(["Compliant", "NonCompliant", "Pending"]),
                  ),
                  startTime: Schema.optional(Schema.String),
                  endTime: Schema.optional(Schema.String),
                  jobId: Schema.optional(Schema.String),
                  operationType: Schema.optional(
                    Schema.Literals(["Consistency", "Initial"]),
                  ),
                  resources: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        complianceStatus: Schema.optional(
                          Schema.Literals([
                            "Compliant",
                            "NonCompliant",
                            "Pending",
                          ]),
                        ),
                        resourceId: Schema.optional(Schema.String),
                        reasons: Schema.optional(
                          Schema.Array(
                            Schema.Struct({
                              phrase: Schema.optional(Schema.String),
                              code: Schema.optional(Schema.String),
                            }),
                          ),
                        ),
                        properties: Schema.optional(Schema.Unknown),
                      }),
                    ),
                  ),
                }),
              ),
              vmssResourceId: Schema.optional(Schema.String),
            }),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type GuestConfigurationAssignmentReportsVMSSListOutput =
  typeof GuestConfigurationAssignmentReportsVMSSListOutput.Type;

// The operation
/**
 * List all reports for the VMSS guest configuration assignment, latest report first.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vmssName - The name of the virtual machine scale set.
 * @param name - The guest configuration assignment name.
 */
export const GuestConfigurationAssignmentReportsVMSSList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GuestConfigurationAssignmentReportsVMSSListInput,
    outputSchema: GuestConfigurationAssignmentReportsVMSSListOutput,
  }));
// Input Schema
export const GuestConfigurationAssignmentsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vmName: Schema.String.pipe(T.PathParam()),
    guestConfigurationAssignmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/providers/Microsoft.GuestConfiguration/guestConfigurationAssignments/{guestConfigurationAssignmentName}",
    }),
  );
export type GuestConfigurationAssignmentsCreateOrUpdateInput =
  typeof GuestConfigurationAssignmentsCreateOrUpdateInput.Type;

// Output Schema
export const GuestConfigurationAssignmentsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.String,
    location: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type GuestConfigurationAssignmentsCreateOrUpdateOutput =
  typeof GuestConfigurationAssignmentsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates an association between a VM and guest configuration
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vmName - The name of the virtual machine.
 * @param guestConfigurationAssignmentName - The guest configuration assignment name.
 */
export const GuestConfigurationAssignmentsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GuestConfigurationAssignmentsCreateOrUpdateInput,
    outputSchema: GuestConfigurationAssignmentsCreateOrUpdateOutput,
  }));
// Input Schema
export const GuestConfigurationAssignmentsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vmName: Schema.String.pipe(T.PathParam()),
    guestConfigurationAssignmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/providers/Microsoft.GuestConfiguration/guestConfigurationAssignments/{guestConfigurationAssignmentName}",
    }),
  );
export type GuestConfigurationAssignmentsDeleteInput =
  typeof GuestConfigurationAssignmentsDeleteInput.Type;

// Output Schema
export const GuestConfigurationAssignmentsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type GuestConfigurationAssignmentsDeleteOutput =
  typeof GuestConfigurationAssignmentsDeleteOutput.Type;

// The operation
/**
 * Delete a guest configuration assignment
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vmName - The name of the virtual machine.
 * @param guestConfigurationAssignmentName - The guest configuration assignment name.
 */
export const GuestConfigurationAssignmentsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GuestConfigurationAssignmentsDeleteInput,
    outputSchema: GuestConfigurationAssignmentsDeleteOutput,
  }));
// Input Schema
export const GuestConfigurationAssignmentsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vmName: Schema.String.pipe(T.PathParam()),
    guestConfigurationAssignmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/providers/Microsoft.GuestConfiguration/guestConfigurationAssignments/{guestConfigurationAssignmentName}",
    }),
  );
export type GuestConfigurationAssignmentsGetInput =
  typeof GuestConfigurationAssignmentsGetInput.Type;

// Output Schema
export const GuestConfigurationAssignmentsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.String,
    location: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type GuestConfigurationAssignmentsGetOutput =
  typeof GuestConfigurationAssignmentsGetOutput.Type;

// The operation
/**
 * Get information about a guest configuration assignment
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vmName - The name of the virtual machine.
 * @param guestConfigurationAssignmentName - The guest configuration assignment name.
 */
export const GuestConfigurationAssignmentsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GuestConfigurationAssignmentsGetInput,
    outputSchema: GuestConfigurationAssignmentsGetOutput,
  }));
// Input Schema
export const GuestConfigurationAssignmentsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vmName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/providers/Microsoft.GuestConfiguration/guestConfigurationAssignments",
    }),
  );
export type GuestConfigurationAssignmentsListInput =
  typeof GuestConfigurationAssignmentsListInput.Type;

// Output Schema
export const GuestConfigurationAssignmentsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.String,
          location: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type GuestConfigurationAssignmentsListOutput =
  typeof GuestConfigurationAssignmentsListOutput.Type;

// The operation
/**
 * List all guest configuration assignments for a virtual machine.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vmName - The name of the virtual machine.
 */
export const GuestConfigurationAssignmentsList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GuestConfigurationAssignmentsListInput,
    outputSchema: GuestConfigurationAssignmentsListOutput,
  }));
// Input Schema
export const GuestConfigurationAssignmentsRGListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.GuestConfiguration/guestConfigurationAssignments",
    }),
  );
export type GuestConfigurationAssignmentsRGListInput =
  typeof GuestConfigurationAssignmentsRGListInput.Type;

// Output Schema
export const GuestConfigurationAssignmentsRGListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.String,
          location: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type GuestConfigurationAssignmentsRGListOutput =
  typeof GuestConfigurationAssignmentsRGListOutput.Type;

// The operation
/**
 * List all guest configuration assignments for a resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription.
 */
export const GuestConfigurationAssignmentsRGList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GuestConfigurationAssignmentsRGListInput,
    outputSchema: GuestConfigurationAssignmentsRGListOutput,
  }));
// Input Schema
export const GuestConfigurationAssignmentsSubscriptionListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.GuestConfiguration/guestConfigurationAssignments",
    }),
  );
export type GuestConfigurationAssignmentsSubscriptionListInput =
  typeof GuestConfigurationAssignmentsSubscriptionListInput.Type;

// Output Schema
export const GuestConfigurationAssignmentsSubscriptionListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.String,
          location: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type GuestConfigurationAssignmentsSubscriptionListOutput =
  typeof GuestConfigurationAssignmentsSubscriptionListOutput.Type;

// The operation
/**
 * List all guest configuration assignments for a subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const GuestConfigurationAssignmentsSubscriptionList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GuestConfigurationAssignmentsSubscriptionListInput,
    outputSchema: GuestConfigurationAssignmentsSubscriptionListOutput,
  }));
// Input Schema
export const GuestConfigurationAssignmentsVMSSCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vmssName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmssName}/providers/Microsoft.GuestConfiguration/guestConfigurationAssignments/{name}",
    }),
  );
export type GuestConfigurationAssignmentsVMSSCreateOrUpdateInput =
  typeof GuestConfigurationAssignmentsVMSSCreateOrUpdateInput.Type;

// Output Schema
export const GuestConfigurationAssignmentsVMSSCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.String,
    location: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type GuestConfigurationAssignmentsVMSSCreateOrUpdateOutput =
  typeof GuestConfigurationAssignmentsVMSSCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates an association between a VMSS and guest configuration
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vmssName - The name of the virtual machine scale set.
 * @param name - The guest configuration assignment name.
 */
export const GuestConfigurationAssignmentsVMSSCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GuestConfigurationAssignmentsVMSSCreateOrUpdateInput,
    outputSchema: GuestConfigurationAssignmentsVMSSCreateOrUpdateOutput,
  }));
// Input Schema
export const GuestConfigurationAssignmentsVMSSDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vmssName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmssName}/providers/Microsoft.GuestConfiguration/guestConfigurationAssignments/{name}",
    }),
  );
export type GuestConfigurationAssignmentsVMSSDeleteInput =
  typeof GuestConfigurationAssignmentsVMSSDeleteInput.Type;

// Output Schema
export const GuestConfigurationAssignmentsVMSSDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.String,
    location: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type GuestConfigurationAssignmentsVMSSDeleteOutput =
  typeof GuestConfigurationAssignmentsVMSSDeleteOutput.Type;

// The operation
/**
 * Delete a guest configuration assignment for VMSS
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vmssName - The name of the virtual machine scale set.
 * @param name - The guest configuration assignment name.
 */
export const GuestConfigurationAssignmentsVMSSDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GuestConfigurationAssignmentsVMSSDeleteInput,
    outputSchema: GuestConfigurationAssignmentsVMSSDeleteOutput,
  }));
// Input Schema
export const GuestConfigurationAssignmentsVMSSGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vmssName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmssName}/providers/Microsoft.GuestConfiguration/guestConfigurationAssignments/{name}",
    }),
  );
export type GuestConfigurationAssignmentsVMSSGetInput =
  typeof GuestConfigurationAssignmentsVMSSGetInput.Type;

// Output Schema
export const GuestConfigurationAssignmentsVMSSGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.String,
    location: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type GuestConfigurationAssignmentsVMSSGetOutput =
  typeof GuestConfigurationAssignmentsVMSSGetOutput.Type;

// The operation
/**
 * Get information about a guest configuration assignment for VMSS
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vmssName - The name of the virtual machine scale set.
 * @param name - The guest configuration assignment name.
 */
export const GuestConfigurationAssignmentsVMSSGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GuestConfigurationAssignmentsVMSSGetInput,
    outputSchema: GuestConfigurationAssignmentsVMSSGetOutput,
  }));
// Input Schema
export const GuestConfigurationAssignmentsVMSSListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vmssName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmssName}/providers/Microsoft.GuestConfiguration/guestConfigurationAssignments",
    }),
  );
export type GuestConfigurationAssignmentsVMSSListInput =
  typeof GuestConfigurationAssignmentsVMSSListInput.Type;

// Output Schema
export const GuestConfigurationAssignmentsVMSSListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.String,
          location: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type GuestConfigurationAssignmentsVMSSListOutput =
  typeof GuestConfigurationAssignmentsVMSSListOutput.Type;

// The operation
/**
 * List all guest configuration assignments for VMSS.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vmssName - The name of the virtual machine scale set.
 */
export const GuestConfigurationAssignmentsVMSSList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GuestConfigurationAssignmentsVMSSListInput,
    outputSchema: GuestConfigurationAssignmentsVMSSListOutput,
  }));
// Input Schema
export const GuestConfigurationConnectedVMwarevSphereAssignmentsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vmName: Schema.String.pipe(T.PathParam()),
    guestConfigurationAssignmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ConnectedVMwarevSphere/virtualmachines/{vmName}/providers/Microsoft.GuestConfiguration/guestConfigurationAssignments/{guestConfigurationAssignmentName}",
    }),
  );
export type GuestConfigurationConnectedVMwarevSphereAssignmentsCreateOrUpdateInput =
  typeof GuestConfigurationConnectedVMwarevSphereAssignmentsCreateOrUpdateInput.Type;

// Output Schema
export const GuestConfigurationConnectedVMwarevSphereAssignmentsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.String,
    location: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type GuestConfigurationConnectedVMwarevSphereAssignmentsCreateOrUpdateOutput =
  typeof GuestConfigurationConnectedVMwarevSphereAssignmentsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates an association between a Connected VM Sphere machine and guest configuration
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vmName - The name of the virtual machine.
 * @param guestConfigurationAssignmentName - The guest configuration assignment name.
 */
export const GuestConfigurationConnectedVMwarevSphereAssignmentsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      GuestConfigurationConnectedVMwarevSphereAssignmentsCreateOrUpdateInput,
    outputSchema:
      GuestConfigurationConnectedVMwarevSphereAssignmentsCreateOrUpdateOutput,
  }));
// Input Schema
export const GuestConfigurationConnectedVMwarevSphereAssignmentsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vmName: Schema.String.pipe(T.PathParam()),
    guestConfigurationAssignmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ConnectedVMwarevSphere/virtualmachines/{vmName}/providers/Microsoft.GuestConfiguration/guestConfigurationAssignments/{guestConfigurationAssignmentName}",
    }),
  );
export type GuestConfigurationConnectedVMwarevSphereAssignmentsDeleteInput =
  typeof GuestConfigurationConnectedVMwarevSphereAssignmentsDeleteInput.Type;

// Output Schema
export const GuestConfigurationConnectedVMwarevSphereAssignmentsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type GuestConfigurationConnectedVMwarevSphereAssignmentsDeleteOutput =
  typeof GuestConfigurationConnectedVMwarevSphereAssignmentsDeleteOutput.Type;

// The operation
/**
 * Delete a guest configuration assignment
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vmName - The name of the virtual machine.
 * @param guestConfigurationAssignmentName - The guest configuration assignment name.
 */
export const GuestConfigurationConnectedVMwarevSphereAssignmentsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GuestConfigurationConnectedVMwarevSphereAssignmentsDeleteInput,
    outputSchema:
      GuestConfigurationConnectedVMwarevSphereAssignmentsDeleteOutput,
  }));
// Input Schema
export const GuestConfigurationConnectedVMwarevSphereAssignmentsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vmName: Schema.String.pipe(T.PathParam()),
    guestConfigurationAssignmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ConnectedVMwarevSphere/virtualmachines/{vmName}/providers/Microsoft.GuestConfiguration/guestConfigurationAssignments/{guestConfigurationAssignmentName}",
    }),
  );
export type GuestConfigurationConnectedVMwarevSphereAssignmentsGetInput =
  typeof GuestConfigurationConnectedVMwarevSphereAssignmentsGetInput.Type;

// Output Schema
export const GuestConfigurationConnectedVMwarevSphereAssignmentsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.String,
    location: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type GuestConfigurationConnectedVMwarevSphereAssignmentsGetOutput =
  typeof GuestConfigurationConnectedVMwarevSphereAssignmentsGetOutput.Type;

// The operation
/**
 * Get information about a guest configuration assignment
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vmName - The name of the virtual machine.
 * @param guestConfigurationAssignmentName - The guest configuration assignment name.
 */
export const GuestConfigurationConnectedVMwarevSphereAssignmentsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GuestConfigurationConnectedVMwarevSphereAssignmentsGetInput,
    outputSchema: GuestConfigurationConnectedVMwarevSphereAssignmentsGetOutput,
  }));
// Input Schema
export const GuestConfigurationConnectedVMwarevSphereAssignmentsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vmName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ConnectedVMwarevSphere/virtualmachines/{vmName}/providers/Microsoft.GuestConfiguration/guestConfigurationAssignments",
    }),
  );
export type GuestConfigurationConnectedVMwarevSphereAssignmentsListInput =
  typeof GuestConfigurationConnectedVMwarevSphereAssignmentsListInput.Type;

// Output Schema
export const GuestConfigurationConnectedVMwarevSphereAssignmentsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.String,
          location: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type GuestConfigurationConnectedVMwarevSphereAssignmentsListOutput =
  typeof GuestConfigurationConnectedVMwarevSphereAssignmentsListOutput.Type;

// The operation
/**
 * List all guest configuration assignments for an ARC machine.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vmName - The name of the virtual machine.
 */
export const GuestConfigurationConnectedVMwarevSphereAssignmentsList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GuestConfigurationConnectedVMwarevSphereAssignmentsListInput,
    outputSchema: GuestConfigurationConnectedVMwarevSphereAssignmentsListOutput,
  }));
// Input Schema
export const GuestConfigurationConnectedVMwarevSphereAssignmentsReportsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vmName: Schema.String.pipe(T.PathParam()),
    guestConfigurationAssignmentName: Schema.String.pipe(T.PathParam()),
    reportId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ConnectedVMwarevSphere/virtualmachines/{vmName}/providers/Microsoft.GuestConfiguration/guestConfigurationAssignments/{guestConfigurationAssignmentName}/reports/{reportId}",
    }),
  );
export type GuestConfigurationConnectedVMwarevSphereAssignmentsReportsGetInput =
  typeof GuestConfigurationConnectedVMwarevSphereAssignmentsReportsGetInput.Type;

// Output Schema
export const GuestConfigurationConnectedVMwarevSphereAssignmentsReportsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        complianceStatus: Schema.optional(
          Schema.Literals(["Compliant", "NonCompliant", "Pending"]),
        ),
        reportId: Schema.optional(Schema.String),
        assignment: Schema.optional(
          Schema.Struct({
            name: Schema.optional(Schema.String),
            configuration: Schema.optional(
              Schema.Struct({
                name: Schema.optional(Schema.String),
                version: Schema.optional(Schema.String),
              }),
            ),
          }),
        ),
        vm: Schema.optional(
          Schema.Struct({
            id: Schema.optional(Schema.String),
            uuid: Schema.optional(Schema.String),
          }),
        ),
        startTime: Schema.optional(Schema.String),
        endTime: Schema.optional(Schema.String),
        details: Schema.optional(
          Schema.Struct({
            complianceStatus: Schema.optional(
              Schema.Literals(["Compliant", "NonCompliant", "Pending"]),
            ),
            startTime: Schema.optional(Schema.String),
            endTime: Schema.optional(Schema.String),
            jobId: Schema.optional(Schema.String),
            operationType: Schema.optional(
              Schema.Literals(["Consistency", "Initial"]),
            ),
            resources: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  complianceStatus: Schema.optional(
                    Schema.Literals(["Compliant", "NonCompliant", "Pending"]),
                  ),
                  resourceId: Schema.optional(Schema.String),
                  reasons: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        phrase: Schema.optional(Schema.String),
                        code: Schema.optional(Schema.String),
                      }),
                    ),
                  ),
                  properties: Schema.optional(Schema.Unknown),
                }),
              ),
            ),
          }),
        ),
        vmssResourceId: Schema.optional(Schema.String),
      }),
    ),
  });
export type GuestConfigurationConnectedVMwarevSphereAssignmentsReportsGetOutput =
  typeof GuestConfigurationConnectedVMwarevSphereAssignmentsReportsGetOutput.Type;

// The operation
/**
 * Get a report for the guest configuration assignment, by reportId.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vmName - The name of the virtual machine.
 * @param guestConfigurationAssignmentName - The guest configuration assignment name.
 * @param reportId - The GUID for the guest configuration assignment report.
 */
export const GuestConfigurationConnectedVMwarevSphereAssignmentsReportsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      GuestConfigurationConnectedVMwarevSphereAssignmentsReportsGetInput,
    outputSchema:
      GuestConfigurationConnectedVMwarevSphereAssignmentsReportsGetOutput,
  }));
// Input Schema
export const GuestConfigurationConnectedVMwarevSphereAssignmentsReportsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vmName: Schema.String.pipe(T.PathParam()),
    guestConfigurationAssignmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ConnectedVMwarevSphere/virtualmachines/{vmName}/providers/Microsoft.GuestConfiguration/guestConfigurationAssignments/{guestConfigurationAssignmentName}/reports",
    }),
  );
export type GuestConfigurationConnectedVMwarevSphereAssignmentsReportsListInput =
  typeof GuestConfigurationConnectedVMwarevSphereAssignmentsReportsListInput.Type;

// Output Schema
export const GuestConfigurationConnectedVMwarevSphereAssignmentsReportsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Struct({
              complianceStatus: Schema.optional(
                Schema.Literals(["Compliant", "NonCompliant", "Pending"]),
              ),
              reportId: Schema.optional(Schema.String),
              assignment: Schema.optional(
                Schema.Struct({
                  name: Schema.optional(Schema.String),
                  configuration: Schema.optional(
                    Schema.Struct({
                      name: Schema.optional(Schema.String),
                      version: Schema.optional(Schema.String),
                    }),
                  ),
                }),
              ),
              vm: Schema.optional(
                Schema.Struct({
                  id: Schema.optional(Schema.String),
                  uuid: Schema.optional(Schema.String),
                }),
              ),
              startTime: Schema.optional(Schema.String),
              endTime: Schema.optional(Schema.String),
              details: Schema.optional(
                Schema.Struct({
                  complianceStatus: Schema.optional(
                    Schema.Literals(["Compliant", "NonCompliant", "Pending"]),
                  ),
                  startTime: Schema.optional(Schema.String),
                  endTime: Schema.optional(Schema.String),
                  jobId: Schema.optional(Schema.String),
                  operationType: Schema.optional(
                    Schema.Literals(["Consistency", "Initial"]),
                  ),
                  resources: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        complianceStatus: Schema.optional(
                          Schema.Literals([
                            "Compliant",
                            "NonCompliant",
                            "Pending",
                          ]),
                        ),
                        resourceId: Schema.optional(Schema.String),
                        reasons: Schema.optional(
                          Schema.Array(
                            Schema.Struct({
                              phrase: Schema.optional(Schema.String),
                              code: Schema.optional(Schema.String),
                            }),
                          ),
                        ),
                        properties: Schema.optional(Schema.Unknown),
                      }),
                    ),
                  ),
                }),
              ),
              vmssResourceId: Schema.optional(Schema.String),
            }),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type GuestConfigurationConnectedVMwarevSphereAssignmentsReportsListOutput =
  typeof GuestConfigurationConnectedVMwarevSphereAssignmentsReportsListOutput.Type;

// The operation
/**
 * List all reports for the guest configuration assignment, latest report first.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vmName - The name of the virtual machine.
 * @param guestConfigurationAssignmentName - The guest configuration assignment name.
 */
export const GuestConfigurationConnectedVMwarevSphereAssignmentsReportsList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      GuestConfigurationConnectedVMwarevSphereAssignmentsReportsListInput,
    outputSchema:
      GuestConfigurationConnectedVMwarevSphereAssignmentsReportsListOutput,
  }));
// Input Schema
export const GuestConfigurationHCRPAssignmentReportsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    machineName: Schema.String.pipe(T.PathParam()),
    guestConfigurationAssignmentName: Schema.String.pipe(T.PathParam()),
    reportId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/machines/{machineName}/providers/Microsoft.GuestConfiguration/guestConfigurationAssignments/{guestConfigurationAssignmentName}/reports/{reportId}",
    }),
  );
export type GuestConfigurationHCRPAssignmentReportsGetInput =
  typeof GuestConfigurationHCRPAssignmentReportsGetInput.Type;

// Output Schema
export const GuestConfigurationHCRPAssignmentReportsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        complianceStatus: Schema.optional(
          Schema.Literals(["Compliant", "NonCompliant", "Pending"]),
        ),
        reportId: Schema.optional(Schema.String),
        assignment: Schema.optional(
          Schema.Struct({
            name: Schema.optional(Schema.String),
            configuration: Schema.optional(
              Schema.Struct({
                name: Schema.optional(Schema.String),
                version: Schema.optional(Schema.String),
              }),
            ),
          }),
        ),
        vm: Schema.optional(
          Schema.Struct({
            id: Schema.optional(Schema.String),
            uuid: Schema.optional(Schema.String),
          }),
        ),
        startTime: Schema.optional(Schema.String),
        endTime: Schema.optional(Schema.String),
        details: Schema.optional(
          Schema.Struct({
            complianceStatus: Schema.optional(
              Schema.Literals(["Compliant", "NonCompliant", "Pending"]),
            ),
            startTime: Schema.optional(Schema.String),
            endTime: Schema.optional(Schema.String),
            jobId: Schema.optional(Schema.String),
            operationType: Schema.optional(
              Schema.Literals(["Consistency", "Initial"]),
            ),
            resources: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  complianceStatus: Schema.optional(
                    Schema.Literals(["Compliant", "NonCompliant", "Pending"]),
                  ),
                  resourceId: Schema.optional(Schema.String),
                  reasons: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        phrase: Schema.optional(Schema.String),
                        code: Schema.optional(Schema.String),
                      }),
                    ),
                  ),
                  properties: Schema.optional(Schema.Unknown),
                }),
              ),
            ),
          }),
        ),
        vmssResourceId: Schema.optional(Schema.String),
      }),
    ),
  });
export type GuestConfigurationHCRPAssignmentReportsGetOutput =
  typeof GuestConfigurationHCRPAssignmentReportsGetOutput.Type;

// The operation
/**
 * Get a report for the guest configuration assignment, by reportId.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param machineName - The name of the ARC machine.
 * @param guestConfigurationAssignmentName - The guest configuration assignment name.
 * @param reportId - The GUID for the guest configuration assignment report.
 */
export const GuestConfigurationHCRPAssignmentReportsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GuestConfigurationHCRPAssignmentReportsGetInput,
    outputSchema: GuestConfigurationHCRPAssignmentReportsGetOutput,
  }));
// Input Schema
export const GuestConfigurationHCRPAssignmentReportsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    machineName: Schema.String.pipe(T.PathParam()),
    guestConfigurationAssignmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/machines/{machineName}/providers/Microsoft.GuestConfiguration/guestConfigurationAssignments/{guestConfigurationAssignmentName}/reports",
    }),
  );
export type GuestConfigurationHCRPAssignmentReportsListInput =
  typeof GuestConfigurationHCRPAssignmentReportsListInput.Type;

// Output Schema
export const GuestConfigurationHCRPAssignmentReportsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Struct({
              complianceStatus: Schema.optional(
                Schema.Literals(["Compliant", "NonCompliant", "Pending"]),
              ),
              reportId: Schema.optional(Schema.String),
              assignment: Schema.optional(
                Schema.Struct({
                  name: Schema.optional(Schema.String),
                  configuration: Schema.optional(
                    Schema.Struct({
                      name: Schema.optional(Schema.String),
                      version: Schema.optional(Schema.String),
                    }),
                  ),
                }),
              ),
              vm: Schema.optional(
                Schema.Struct({
                  id: Schema.optional(Schema.String),
                  uuid: Schema.optional(Schema.String),
                }),
              ),
              startTime: Schema.optional(Schema.String),
              endTime: Schema.optional(Schema.String),
              details: Schema.optional(
                Schema.Struct({
                  complianceStatus: Schema.optional(
                    Schema.Literals(["Compliant", "NonCompliant", "Pending"]),
                  ),
                  startTime: Schema.optional(Schema.String),
                  endTime: Schema.optional(Schema.String),
                  jobId: Schema.optional(Schema.String),
                  operationType: Schema.optional(
                    Schema.Literals(["Consistency", "Initial"]),
                  ),
                  resources: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        complianceStatus: Schema.optional(
                          Schema.Literals([
                            "Compliant",
                            "NonCompliant",
                            "Pending",
                          ]),
                        ),
                        resourceId: Schema.optional(Schema.String),
                        reasons: Schema.optional(
                          Schema.Array(
                            Schema.Struct({
                              phrase: Schema.optional(Schema.String),
                              code: Schema.optional(Schema.String),
                            }),
                          ),
                        ),
                        properties: Schema.optional(Schema.Unknown),
                      }),
                    ),
                  ),
                }),
              ),
              vmssResourceId: Schema.optional(Schema.String),
            }),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type GuestConfigurationHCRPAssignmentReportsListOutput =
  typeof GuestConfigurationHCRPAssignmentReportsListOutput.Type;

// The operation
/**
 * List all reports for the guest configuration assignment, latest report first.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param machineName - The name of the ARC machine.
 * @param guestConfigurationAssignmentName - The guest configuration assignment name.
 */
export const GuestConfigurationHCRPAssignmentReportsList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GuestConfigurationHCRPAssignmentReportsListInput,
    outputSchema: GuestConfigurationHCRPAssignmentReportsListOutput,
  }));
// Input Schema
export const GuestConfigurationHCRPAssignmentsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    machineName: Schema.String.pipe(T.PathParam()),
    guestConfigurationAssignmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/machines/{machineName}/providers/Microsoft.GuestConfiguration/guestConfigurationAssignments/{guestConfigurationAssignmentName}",
    }),
  );
export type GuestConfigurationHCRPAssignmentsCreateOrUpdateInput =
  typeof GuestConfigurationHCRPAssignmentsCreateOrUpdateInput.Type;

// Output Schema
export const GuestConfigurationHCRPAssignmentsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.String,
    location: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type GuestConfigurationHCRPAssignmentsCreateOrUpdateOutput =
  typeof GuestConfigurationHCRPAssignmentsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates an association between a ARC machine and guest configuration
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param machineName - The name of the ARC machine.
 * @param guestConfigurationAssignmentName - The guest configuration assignment name.
 */
export const GuestConfigurationHCRPAssignmentsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GuestConfigurationHCRPAssignmentsCreateOrUpdateInput,
    outputSchema: GuestConfigurationHCRPAssignmentsCreateOrUpdateOutput,
  }));
// Input Schema
export const GuestConfigurationHCRPAssignmentsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    machineName: Schema.String.pipe(T.PathParam()),
    guestConfigurationAssignmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/machines/{machineName}/providers/Microsoft.GuestConfiguration/guestConfigurationAssignments/{guestConfigurationAssignmentName}",
    }),
  );
export type GuestConfigurationHCRPAssignmentsDeleteInput =
  typeof GuestConfigurationHCRPAssignmentsDeleteInput.Type;

// Output Schema
export const GuestConfigurationHCRPAssignmentsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type GuestConfigurationHCRPAssignmentsDeleteOutput =
  typeof GuestConfigurationHCRPAssignmentsDeleteOutput.Type;

// The operation
/**
 * Delete a guest configuration assignment
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param machineName - The name of the ARC machine.
 * @param guestConfigurationAssignmentName - The guest configuration assignment name.
 */
export const GuestConfigurationHCRPAssignmentsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GuestConfigurationHCRPAssignmentsDeleteInput,
    outputSchema: GuestConfigurationHCRPAssignmentsDeleteOutput,
  }));
// Input Schema
export const GuestConfigurationHCRPAssignmentsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    machineName: Schema.String.pipe(T.PathParam()),
    guestConfigurationAssignmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/machines/{machineName}/providers/Microsoft.GuestConfiguration/guestConfigurationAssignments/{guestConfigurationAssignmentName}",
    }),
  );
export type GuestConfigurationHCRPAssignmentsGetInput =
  typeof GuestConfigurationHCRPAssignmentsGetInput.Type;

// Output Schema
export const GuestConfigurationHCRPAssignmentsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.String,
    location: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type GuestConfigurationHCRPAssignmentsGetOutput =
  typeof GuestConfigurationHCRPAssignmentsGetOutput.Type;

// The operation
/**
 * Get information about a guest configuration assignment
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param machineName - The name of the ARC machine.
 * @param guestConfigurationAssignmentName - The guest configuration assignment name.
 */
export const GuestConfigurationHCRPAssignmentsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GuestConfigurationHCRPAssignmentsGetInput,
    outputSchema: GuestConfigurationHCRPAssignmentsGetOutput,
  }));
// Input Schema
export const GuestConfigurationHCRPAssignmentsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    machineName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/machines/{machineName}/providers/Microsoft.GuestConfiguration/guestConfigurationAssignments",
    }),
  );
export type GuestConfigurationHCRPAssignmentsListInput =
  typeof GuestConfigurationHCRPAssignmentsListInput.Type;

// Output Schema
export const GuestConfigurationHCRPAssignmentsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.String,
          location: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type GuestConfigurationHCRPAssignmentsListOutput =
  typeof GuestConfigurationHCRPAssignmentsListOutput.Type;

// The operation
/**
 * List all guest configuration assignments for an ARC machine.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param machineName - The name of the ARC machine.
 */
export const GuestConfigurationHCRPAssignmentsList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GuestConfigurationHCRPAssignmentsListInput,
    outputSchema: GuestConfigurationHCRPAssignmentsListOutput,
  }));
// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.GuestConfiguration/operations",
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
      properties: Schema.optional(
        Schema.Struct({
          statusCode: Schema.optional(Schema.String),
        }),
      ),
    }),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type OperationsListOutput = typeof OperationsListOutput.Type;

// The operation
/**
 * List the operations for the provider
 *
 * @param api-version - The API version to use for this operation.
 */
export const OperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationsListInput,
  outputSchema: OperationsListOutput,
}));
