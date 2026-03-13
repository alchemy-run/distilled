/**
 * Azure Computeschedule API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const ScheduledActionsVirtualMachinesCancelOperationsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    locationparameter: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeSchedule/locations/{locationparameter}/virtualMachinesCancelOperations",
    }),
  );
export type ScheduledActionsVirtualMachinesCancelOperationsInput =
  typeof ScheduledActionsVirtualMachinesCancelOperationsInput.Type;

// Output Schema
export const ScheduledActionsVirtualMachinesCancelOperationsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    results: Schema.Array(
      Schema.Struct({
        resourceId: Schema.optional(Schema.String),
        errorCode: Schema.optional(Schema.String),
        errorDetails: Schema.optional(Schema.String),
        operation: Schema.optional(
          Schema.Struct({
            operationId: Schema.String,
            resourceId: Schema.optional(Schema.String),
            opType: Schema.optional(
              Schema.Literals(["Unknown", "Start", "Deallocate", "Hibernate"]),
            ),
            subscriptionId: Schema.optional(Schema.String),
            deadline: Schema.optional(Schema.String),
            deadlineType: Schema.optional(
              Schema.Literals(["Unknown", "InitiateAt", "CompleteBy"]),
            ),
            state: Schema.optional(
              Schema.Literals([
                "Unknown",
                "PendingScheduling",
                "Scheduled",
                "PendingExecution",
                "Executing",
                "Succeeded",
                "Failed",
                "Cancelled",
                "Blocked",
              ]),
            ),
            timezone: Schema.optional(Schema.String),
            timeZone: Schema.optional(Schema.String),
            resourceOperationError: Schema.optional(
              Schema.Struct({
                errorCode: Schema.String,
                errorDetails: Schema.String,
              }),
            ),
            completedAt: Schema.optional(Schema.String),
            retryPolicy: Schema.optional(
              Schema.Struct({
                retryCount: Schema.optional(Schema.Number),
                retryWindowInMinutes: Schema.optional(Schema.Number),
              }),
            ),
          }),
        ),
      }),
    ),
  });
export type ScheduledActionsVirtualMachinesCancelOperationsOutput =
  typeof ScheduledActionsVirtualMachinesCancelOperationsOutput.Type;

// The operation
/**
 * VirtualMachinesCancelOperations: Cancel a previously submitted (start/deallocate/hibernate) request
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param locationparameter - The location name.
 */
export const ScheduledActionsVirtualMachinesCancelOperations =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ScheduledActionsVirtualMachinesCancelOperationsInput,
    outputSchema: ScheduledActionsVirtualMachinesCancelOperationsOutput,
  }));
// Input Schema
export const ScheduledActionsVirtualMachinesExecuteCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    locationparameter: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeSchedule/locations/{locationparameter}/virtualMachinesExecuteCreate",
    }),
  );
export type ScheduledActionsVirtualMachinesExecuteCreateInput =
  typeof ScheduledActionsVirtualMachinesExecuteCreateInput.Type;

// Output Schema
export const ScheduledActionsVirtualMachinesExecuteCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    description: Schema.String,
    type: Schema.String,
    location: Schema.String,
    results: Schema.optional(
      Schema.Array(
        Schema.Struct({
          resourceId: Schema.optional(Schema.String),
          errorCode: Schema.optional(Schema.String),
          errorDetails: Schema.optional(Schema.String),
          operation: Schema.optional(
            Schema.Struct({
              operationId: Schema.String,
              resourceId: Schema.optional(Schema.String),
              opType: Schema.optional(
                Schema.Literals([
                  "Unknown",
                  "Start",
                  "Deallocate",
                  "Hibernate",
                ]),
              ),
              subscriptionId: Schema.optional(Schema.String),
              deadline: Schema.optional(Schema.String),
              deadlineType: Schema.optional(
                Schema.Literals(["Unknown", "InitiateAt", "CompleteBy"]),
              ),
              state: Schema.optional(
                Schema.Literals([
                  "Unknown",
                  "PendingScheduling",
                  "Scheduled",
                  "PendingExecution",
                  "Executing",
                  "Succeeded",
                  "Failed",
                  "Cancelled",
                  "Blocked",
                ]),
              ),
              timezone: Schema.optional(Schema.String),
              timeZone: Schema.optional(Schema.String),
              resourceOperationError: Schema.optional(
                Schema.Struct({
                  errorCode: Schema.String,
                  errorDetails: Schema.String,
                }),
              ),
              completedAt: Schema.optional(Schema.String),
              retryPolicy: Schema.optional(
                Schema.Struct({
                  retryCount: Schema.optional(Schema.Number),
                  retryWindowInMinutes: Schema.optional(Schema.Number),
                }),
              ),
            }),
          ),
        }),
      ),
    ),
  });
export type ScheduledActionsVirtualMachinesExecuteCreateOutput =
  typeof ScheduledActionsVirtualMachinesExecuteCreateOutput.Type;

// The operation
/**
 * [PRIVATE PREVIEW]: VirtualMachinesExecuteCreate: Execute create operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param locationparameter - The location name.
 */
export const ScheduledActionsVirtualMachinesExecuteCreate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ScheduledActionsVirtualMachinesExecuteCreateInput,
    outputSchema: ScheduledActionsVirtualMachinesExecuteCreateOutput,
  }));
// Input Schema
export const ScheduledActionsVirtualMachinesExecuteDeallocateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    locationparameter: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeSchedule/locations/{locationparameter}/virtualMachinesExecuteDeallocate",
    }),
  );
export type ScheduledActionsVirtualMachinesExecuteDeallocateInput =
  typeof ScheduledActionsVirtualMachinesExecuteDeallocateInput.Type;

// Output Schema
export const ScheduledActionsVirtualMachinesExecuteDeallocateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    description: Schema.String,
    type: Schema.String,
    location: Schema.String,
    results: Schema.optional(
      Schema.Array(
        Schema.Struct({
          resourceId: Schema.optional(Schema.String),
          errorCode: Schema.optional(Schema.String),
          errorDetails: Schema.optional(Schema.String),
          operation: Schema.optional(
            Schema.Struct({
              operationId: Schema.String,
              resourceId: Schema.optional(Schema.String),
              opType: Schema.optional(
                Schema.Literals([
                  "Unknown",
                  "Start",
                  "Deallocate",
                  "Hibernate",
                ]),
              ),
              subscriptionId: Schema.optional(Schema.String),
              deadline: Schema.optional(Schema.String),
              deadlineType: Schema.optional(
                Schema.Literals(["Unknown", "InitiateAt", "CompleteBy"]),
              ),
              state: Schema.optional(
                Schema.Literals([
                  "Unknown",
                  "PendingScheduling",
                  "Scheduled",
                  "PendingExecution",
                  "Executing",
                  "Succeeded",
                  "Failed",
                  "Cancelled",
                  "Blocked",
                ]),
              ),
              timezone: Schema.optional(Schema.String),
              timeZone: Schema.optional(Schema.String),
              resourceOperationError: Schema.optional(
                Schema.Struct({
                  errorCode: Schema.String,
                  errorDetails: Schema.String,
                }),
              ),
              completedAt: Schema.optional(Schema.String),
              retryPolicy: Schema.optional(
                Schema.Struct({
                  retryCount: Schema.optional(Schema.Number),
                  retryWindowInMinutes: Schema.optional(Schema.Number),
                }),
              ),
            }),
          ),
        }),
      ),
    ),
  });
export type ScheduledActionsVirtualMachinesExecuteDeallocateOutput =
  typeof ScheduledActionsVirtualMachinesExecuteDeallocateOutput.Type;

// The operation
/**
 * VirtualMachinesExecuteDeallocate: Execute deallocate operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param locationparameter - The location name.
 */
export const ScheduledActionsVirtualMachinesExecuteDeallocate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ScheduledActionsVirtualMachinesExecuteDeallocateInput,
    outputSchema: ScheduledActionsVirtualMachinesExecuteDeallocateOutput,
  }));
// Input Schema
export const ScheduledActionsVirtualMachinesExecuteDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    locationparameter: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeSchedule/locations/{locationparameter}/virtualMachinesExecuteDelete",
    }),
  );
export type ScheduledActionsVirtualMachinesExecuteDeleteInput =
  typeof ScheduledActionsVirtualMachinesExecuteDeleteInput.Type;

// Output Schema
export const ScheduledActionsVirtualMachinesExecuteDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    description: Schema.String,
    type: Schema.String,
    location: Schema.String,
    results: Schema.optional(
      Schema.Array(
        Schema.Struct({
          resourceId: Schema.optional(Schema.String),
          errorCode: Schema.optional(Schema.String),
          errorDetails: Schema.optional(Schema.String),
          operation: Schema.optional(
            Schema.Struct({
              operationId: Schema.String,
              resourceId: Schema.optional(Schema.String),
              opType: Schema.optional(
                Schema.Literals([
                  "Unknown",
                  "Start",
                  "Deallocate",
                  "Hibernate",
                ]),
              ),
              subscriptionId: Schema.optional(Schema.String),
              deadline: Schema.optional(Schema.String),
              deadlineType: Schema.optional(
                Schema.Literals(["Unknown", "InitiateAt", "CompleteBy"]),
              ),
              state: Schema.optional(
                Schema.Literals([
                  "Unknown",
                  "PendingScheduling",
                  "Scheduled",
                  "PendingExecution",
                  "Executing",
                  "Succeeded",
                  "Failed",
                  "Cancelled",
                  "Blocked",
                ]),
              ),
              timezone: Schema.optional(Schema.String),
              timeZone: Schema.optional(Schema.String),
              resourceOperationError: Schema.optional(
                Schema.Struct({
                  errorCode: Schema.String,
                  errorDetails: Schema.String,
                }),
              ),
              completedAt: Schema.optional(Schema.String),
              retryPolicy: Schema.optional(
                Schema.Struct({
                  retryCount: Schema.optional(Schema.Number),
                  retryWindowInMinutes: Schema.optional(Schema.Number),
                }),
              ),
            }),
          ),
        }),
      ),
    ),
  });
export type ScheduledActionsVirtualMachinesExecuteDeleteOutput =
  typeof ScheduledActionsVirtualMachinesExecuteDeleteOutput.Type;

// The operation
/**
 * [PRIVATE PREVIEW]: VirtualMachinesExecuteDelete: Execute delete operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param locationparameter - The location name.
 */
export const ScheduledActionsVirtualMachinesExecuteDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ScheduledActionsVirtualMachinesExecuteDeleteInput,
    outputSchema: ScheduledActionsVirtualMachinesExecuteDeleteOutput,
  }));
// Input Schema
export const ScheduledActionsVirtualMachinesExecuteHibernateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    locationparameter: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeSchedule/locations/{locationparameter}/virtualMachinesExecuteHibernate",
    }),
  );
export type ScheduledActionsVirtualMachinesExecuteHibernateInput =
  typeof ScheduledActionsVirtualMachinesExecuteHibernateInput.Type;

// Output Schema
export const ScheduledActionsVirtualMachinesExecuteHibernateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    description: Schema.String,
    type: Schema.String,
    location: Schema.String,
    results: Schema.optional(
      Schema.Array(
        Schema.Struct({
          resourceId: Schema.optional(Schema.String),
          errorCode: Schema.optional(Schema.String),
          errorDetails: Schema.optional(Schema.String),
          operation: Schema.optional(
            Schema.Struct({
              operationId: Schema.String,
              resourceId: Schema.optional(Schema.String),
              opType: Schema.optional(
                Schema.Literals([
                  "Unknown",
                  "Start",
                  "Deallocate",
                  "Hibernate",
                ]),
              ),
              subscriptionId: Schema.optional(Schema.String),
              deadline: Schema.optional(Schema.String),
              deadlineType: Schema.optional(
                Schema.Literals(["Unknown", "InitiateAt", "CompleteBy"]),
              ),
              state: Schema.optional(
                Schema.Literals([
                  "Unknown",
                  "PendingScheduling",
                  "Scheduled",
                  "PendingExecution",
                  "Executing",
                  "Succeeded",
                  "Failed",
                  "Cancelled",
                  "Blocked",
                ]),
              ),
              timezone: Schema.optional(Schema.String),
              timeZone: Schema.optional(Schema.String),
              resourceOperationError: Schema.optional(
                Schema.Struct({
                  errorCode: Schema.String,
                  errorDetails: Schema.String,
                }),
              ),
              completedAt: Schema.optional(Schema.String),
              retryPolicy: Schema.optional(
                Schema.Struct({
                  retryCount: Schema.optional(Schema.Number),
                  retryWindowInMinutes: Schema.optional(Schema.Number),
                }),
              ),
            }),
          ),
        }),
      ),
    ),
  });
export type ScheduledActionsVirtualMachinesExecuteHibernateOutput =
  typeof ScheduledActionsVirtualMachinesExecuteHibernateOutput.Type;

// The operation
/**
 * VirtualMachinesExecuteHibernate: Execute hibernate operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param locationparameter - The location name.
 */
export const ScheduledActionsVirtualMachinesExecuteHibernate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ScheduledActionsVirtualMachinesExecuteHibernateInput,
    outputSchema: ScheduledActionsVirtualMachinesExecuteHibernateOutput,
  }));
// Input Schema
export const ScheduledActionsVirtualMachinesExecuteStartInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    locationparameter: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeSchedule/locations/{locationparameter}/virtualMachinesExecuteStart",
    }),
  );
export type ScheduledActionsVirtualMachinesExecuteStartInput =
  typeof ScheduledActionsVirtualMachinesExecuteStartInput.Type;

// Output Schema
export const ScheduledActionsVirtualMachinesExecuteStartOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    description: Schema.String,
    type: Schema.String,
    location: Schema.String,
    results: Schema.optional(
      Schema.Array(
        Schema.Struct({
          resourceId: Schema.optional(Schema.String),
          errorCode: Schema.optional(Schema.String),
          errorDetails: Schema.optional(Schema.String),
          operation: Schema.optional(
            Schema.Struct({
              operationId: Schema.String,
              resourceId: Schema.optional(Schema.String),
              opType: Schema.optional(
                Schema.Literals([
                  "Unknown",
                  "Start",
                  "Deallocate",
                  "Hibernate",
                ]),
              ),
              subscriptionId: Schema.optional(Schema.String),
              deadline: Schema.optional(Schema.String),
              deadlineType: Schema.optional(
                Schema.Literals(["Unknown", "InitiateAt", "CompleteBy"]),
              ),
              state: Schema.optional(
                Schema.Literals([
                  "Unknown",
                  "PendingScheduling",
                  "Scheduled",
                  "PendingExecution",
                  "Executing",
                  "Succeeded",
                  "Failed",
                  "Cancelled",
                  "Blocked",
                ]),
              ),
              timezone: Schema.optional(Schema.String),
              timeZone: Schema.optional(Schema.String),
              resourceOperationError: Schema.optional(
                Schema.Struct({
                  errorCode: Schema.String,
                  errorDetails: Schema.String,
                }),
              ),
              completedAt: Schema.optional(Schema.String),
              retryPolicy: Schema.optional(
                Schema.Struct({
                  retryCount: Schema.optional(Schema.Number),
                  retryWindowInMinutes: Schema.optional(Schema.Number),
                }),
              ),
            }),
          ),
        }),
      ),
    ),
  });
export type ScheduledActionsVirtualMachinesExecuteStartOutput =
  typeof ScheduledActionsVirtualMachinesExecuteStartOutput.Type;

// The operation
/**
 * VirtualMachinesExecuteStart: Execute start operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param locationparameter - The location name.
 */
export const ScheduledActionsVirtualMachinesExecuteStart =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ScheduledActionsVirtualMachinesExecuteStartInput,
    outputSchema: ScheduledActionsVirtualMachinesExecuteStartOutput,
  }));
// Input Schema
export const ScheduledActionsVirtualMachinesGetOperationErrorsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    locationparameter: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeSchedule/locations/{locationparameter}/virtualMachinesGetOperationErrors",
    }),
  );
export type ScheduledActionsVirtualMachinesGetOperationErrorsInput =
  typeof ScheduledActionsVirtualMachinesGetOperationErrorsInput.Type;

// Output Schema
export const ScheduledActionsVirtualMachinesGetOperationErrorsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    results: Schema.Array(
      Schema.Struct({
        operationId: Schema.optional(Schema.String),
        creationTime: Schema.optional(Schema.String),
        activationTime: Schema.optional(Schema.String),
        completedAt: Schema.optional(Schema.String),
        operationErrors: Schema.optional(
          Schema.Array(
            Schema.Struct({
              errorCode: Schema.String,
              errorDetails: Schema.String,
              timestamp: Schema.optional(Schema.String),
              timeStamp: Schema.optional(Schema.String),
              azureOperationName: Schema.optional(Schema.String),
              crpOperationId: Schema.optional(Schema.String),
            }),
          ),
        ),
        requestErrorCode: Schema.optional(Schema.String),
        requestErrorDetails: Schema.optional(Schema.String),
      }),
    ),
  });
export type ScheduledActionsVirtualMachinesGetOperationErrorsOutput =
  typeof ScheduledActionsVirtualMachinesGetOperationErrorsOutput.Type;

// The operation
/**
 * VirtualMachinesGetOperationErrors: Get error details on operation errors (like transient errors encountered, additional logs) if they exist.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param locationparameter - The location name.
 */
export const ScheduledActionsVirtualMachinesGetOperationErrors =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ScheduledActionsVirtualMachinesGetOperationErrorsInput,
    outputSchema: ScheduledActionsVirtualMachinesGetOperationErrorsOutput,
  }));
// Input Schema
export const ScheduledActionsVirtualMachinesGetOperationStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    locationparameter: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeSchedule/locations/{locationparameter}/virtualMachinesGetOperationStatus",
    }),
  );
export type ScheduledActionsVirtualMachinesGetOperationStatusInput =
  typeof ScheduledActionsVirtualMachinesGetOperationStatusInput.Type;

// Output Schema
export const ScheduledActionsVirtualMachinesGetOperationStatusOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    results: Schema.Array(
      Schema.Struct({
        resourceId: Schema.optional(Schema.String),
        errorCode: Schema.optional(Schema.String),
        errorDetails: Schema.optional(Schema.String),
        operation: Schema.optional(
          Schema.Struct({
            operationId: Schema.String,
            resourceId: Schema.optional(Schema.String),
            opType: Schema.optional(
              Schema.Literals(["Unknown", "Start", "Deallocate", "Hibernate"]),
            ),
            subscriptionId: Schema.optional(Schema.String),
            deadline: Schema.optional(Schema.String),
            deadlineType: Schema.optional(
              Schema.Literals(["Unknown", "InitiateAt", "CompleteBy"]),
            ),
            state: Schema.optional(
              Schema.Literals([
                "Unknown",
                "PendingScheduling",
                "Scheduled",
                "PendingExecution",
                "Executing",
                "Succeeded",
                "Failed",
                "Cancelled",
                "Blocked",
              ]),
            ),
            timezone: Schema.optional(Schema.String),
            timeZone: Schema.optional(Schema.String),
            resourceOperationError: Schema.optional(
              Schema.Struct({
                errorCode: Schema.String,
                errorDetails: Schema.String,
              }),
            ),
            completedAt: Schema.optional(Schema.String),
            retryPolicy: Schema.optional(
              Schema.Struct({
                retryCount: Schema.optional(Schema.Number),
                retryWindowInMinutes: Schema.optional(Schema.Number),
              }),
            ),
          }),
        ),
      }),
    ),
  });
export type ScheduledActionsVirtualMachinesGetOperationStatusOutput =
  typeof ScheduledActionsVirtualMachinesGetOperationStatusOutput.Type;

// The operation
/**
 * VirtualMachinesGetOperationStatus: Polling endpoint to read status of operations performed on virtual machines
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param locationparameter - The location name.
 */
export const ScheduledActionsVirtualMachinesGetOperationStatus =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ScheduledActionsVirtualMachinesGetOperationStatusInput,
    outputSchema: ScheduledActionsVirtualMachinesGetOperationStatusOutput,
  }));
// Input Schema
export const ScheduledActionsVirtualMachinesSubmitDeallocateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    locationparameter: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeSchedule/locations/{locationparameter}/virtualMachinesSubmitDeallocate",
    }),
  );
export type ScheduledActionsVirtualMachinesSubmitDeallocateInput =
  typeof ScheduledActionsVirtualMachinesSubmitDeallocateInput.Type;

// Output Schema
export const ScheduledActionsVirtualMachinesSubmitDeallocateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    description: Schema.String,
    type: Schema.String,
    location: Schema.String,
    results: Schema.optional(
      Schema.Array(
        Schema.Struct({
          resourceId: Schema.optional(Schema.String),
          errorCode: Schema.optional(Schema.String),
          errorDetails: Schema.optional(Schema.String),
          operation: Schema.optional(
            Schema.Struct({
              operationId: Schema.String,
              resourceId: Schema.optional(Schema.String),
              opType: Schema.optional(
                Schema.Literals([
                  "Unknown",
                  "Start",
                  "Deallocate",
                  "Hibernate",
                ]),
              ),
              subscriptionId: Schema.optional(Schema.String),
              deadline: Schema.optional(Schema.String),
              deadlineType: Schema.optional(
                Schema.Literals(["Unknown", "InitiateAt", "CompleteBy"]),
              ),
              state: Schema.optional(
                Schema.Literals([
                  "Unknown",
                  "PendingScheduling",
                  "Scheduled",
                  "PendingExecution",
                  "Executing",
                  "Succeeded",
                  "Failed",
                  "Cancelled",
                  "Blocked",
                ]),
              ),
              timezone: Schema.optional(Schema.String),
              timeZone: Schema.optional(Schema.String),
              resourceOperationError: Schema.optional(
                Schema.Struct({
                  errorCode: Schema.String,
                  errorDetails: Schema.String,
                }),
              ),
              completedAt: Schema.optional(Schema.String),
              retryPolicy: Schema.optional(
                Schema.Struct({
                  retryCount: Schema.optional(Schema.Number),
                  retryWindowInMinutes: Schema.optional(Schema.Number),
                }),
              ),
            }),
          ),
        }),
      ),
    ),
  });
export type ScheduledActionsVirtualMachinesSubmitDeallocateOutput =
  typeof ScheduledActionsVirtualMachinesSubmitDeallocateOutput.Type;

// The operation
/**
 * VirtualMachinesSubmitDeallocate: Schedule deallocate operation for a batch of virtual machines at datetime in future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param locationparameter - The location name.
 */
export const ScheduledActionsVirtualMachinesSubmitDeallocate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ScheduledActionsVirtualMachinesSubmitDeallocateInput,
    outputSchema: ScheduledActionsVirtualMachinesSubmitDeallocateOutput,
  }));
// Input Schema
export const ScheduledActionsVirtualMachinesSubmitHibernateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    locationparameter: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeSchedule/locations/{locationparameter}/virtualMachinesSubmitHibernate",
    }),
  );
export type ScheduledActionsVirtualMachinesSubmitHibernateInput =
  typeof ScheduledActionsVirtualMachinesSubmitHibernateInput.Type;

// Output Schema
export const ScheduledActionsVirtualMachinesSubmitHibernateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    description: Schema.String,
    type: Schema.String,
    location: Schema.String,
    results: Schema.optional(
      Schema.Array(
        Schema.Struct({
          resourceId: Schema.optional(Schema.String),
          errorCode: Schema.optional(Schema.String),
          errorDetails: Schema.optional(Schema.String),
          operation: Schema.optional(
            Schema.Struct({
              operationId: Schema.String,
              resourceId: Schema.optional(Schema.String),
              opType: Schema.optional(
                Schema.Literals([
                  "Unknown",
                  "Start",
                  "Deallocate",
                  "Hibernate",
                ]),
              ),
              subscriptionId: Schema.optional(Schema.String),
              deadline: Schema.optional(Schema.String),
              deadlineType: Schema.optional(
                Schema.Literals(["Unknown", "InitiateAt", "CompleteBy"]),
              ),
              state: Schema.optional(
                Schema.Literals([
                  "Unknown",
                  "PendingScheduling",
                  "Scheduled",
                  "PendingExecution",
                  "Executing",
                  "Succeeded",
                  "Failed",
                  "Cancelled",
                  "Blocked",
                ]),
              ),
              timezone: Schema.optional(Schema.String),
              timeZone: Schema.optional(Schema.String),
              resourceOperationError: Schema.optional(
                Schema.Struct({
                  errorCode: Schema.String,
                  errorDetails: Schema.String,
                }),
              ),
              completedAt: Schema.optional(Schema.String),
              retryPolicy: Schema.optional(
                Schema.Struct({
                  retryCount: Schema.optional(Schema.Number),
                  retryWindowInMinutes: Schema.optional(Schema.Number),
                }),
              ),
            }),
          ),
        }),
      ),
    ),
  });
export type ScheduledActionsVirtualMachinesSubmitHibernateOutput =
  typeof ScheduledActionsVirtualMachinesSubmitHibernateOutput.Type;

// The operation
/**
 * VirtualMachinesSubmitHibernate: Schedule hibernate operation for a batch of virtual machines at datetime in future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param locationparameter - The location name.
 */
export const ScheduledActionsVirtualMachinesSubmitHibernate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ScheduledActionsVirtualMachinesSubmitHibernateInput,
    outputSchema: ScheduledActionsVirtualMachinesSubmitHibernateOutput,
  }));
// Input Schema
export const ScheduledActionsVirtualMachinesSubmitStartInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    locationparameter: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeSchedule/locations/{locationparameter}/virtualMachinesSubmitStart",
    }),
  );
export type ScheduledActionsVirtualMachinesSubmitStartInput =
  typeof ScheduledActionsVirtualMachinesSubmitStartInput.Type;

// Output Schema
export const ScheduledActionsVirtualMachinesSubmitStartOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    description: Schema.String,
    type: Schema.String,
    location: Schema.String,
    results: Schema.optional(
      Schema.Array(
        Schema.Struct({
          resourceId: Schema.optional(Schema.String),
          errorCode: Schema.optional(Schema.String),
          errorDetails: Schema.optional(Schema.String),
          operation: Schema.optional(
            Schema.Struct({
              operationId: Schema.String,
              resourceId: Schema.optional(Schema.String),
              opType: Schema.optional(
                Schema.Literals([
                  "Unknown",
                  "Start",
                  "Deallocate",
                  "Hibernate",
                ]),
              ),
              subscriptionId: Schema.optional(Schema.String),
              deadline: Schema.optional(Schema.String),
              deadlineType: Schema.optional(
                Schema.Literals(["Unknown", "InitiateAt", "CompleteBy"]),
              ),
              state: Schema.optional(
                Schema.Literals([
                  "Unknown",
                  "PendingScheduling",
                  "Scheduled",
                  "PendingExecution",
                  "Executing",
                  "Succeeded",
                  "Failed",
                  "Cancelled",
                  "Blocked",
                ]),
              ),
              timezone: Schema.optional(Schema.String),
              timeZone: Schema.optional(Schema.String),
              resourceOperationError: Schema.optional(
                Schema.Struct({
                  errorCode: Schema.String,
                  errorDetails: Schema.String,
                }),
              ),
              completedAt: Schema.optional(Schema.String),
              retryPolicy: Schema.optional(
                Schema.Struct({
                  retryCount: Schema.optional(Schema.Number),
                  retryWindowInMinutes: Schema.optional(Schema.Number),
                }),
              ),
            }),
          ),
        }),
      ),
    ),
  });
export type ScheduledActionsVirtualMachinesSubmitStartOutput =
  typeof ScheduledActionsVirtualMachinesSubmitStartOutput.Type;

// The operation
/**
 * VirtualMachinesSubmitStart: Schedule start operation for a batch of virtual machines at datetime in future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param locationparameter - The location name.
 */
export const ScheduledActionsVirtualMachinesSubmitStart =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ScheduledActionsVirtualMachinesSubmitStartInput,
    outputSchema: ScheduledActionsVirtualMachinesSubmitStartOutput,
  }));
