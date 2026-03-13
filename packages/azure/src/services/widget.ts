/**
 * Azure Widget API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const EmployeesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    employeeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Widget/employees/{employeeName}",
    }),
  );
export type EmployeesCreateOrUpdateInput =
  typeof EmployeesCreateOrUpdateInput.Type;

// Output Schema
export const EmployeesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type EmployeesCreateOrUpdateOutput =
  typeof EmployeesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a Employee
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param employeeName - The name of the Employee
 */
export const EmployeesCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: EmployeesCreateOrUpdateInput,
    outputSchema: EmployeesCreateOrUpdateOutput,
  }),
);
// Input Schema
export const EmployeesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  employeeName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Widget/employees/{employeeName}",
  }),
);
export type EmployeesDeleteInput = typeof EmployeesDeleteInput.Type;

// Output Schema
export const EmployeesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type EmployeesDeleteOutput = typeof EmployeesDeleteOutput.Type;

// The operation
/**
 * Delete a Employee
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param employeeName - The name of the Employee
 */
export const EmployeesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: EmployeesDeleteInput,
  outputSchema: EmployeesDeleteOutput,
}));
// Input Schema
export const EmployeesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  employeeName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Widget/employees/{employeeName}",
  }),
);
export type EmployeesGetInput = typeof EmployeesGetInput.Type;

// Output Schema
export const EmployeesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type EmployeesGetOutput = typeof EmployeesGetOutput.Type;

// The operation
/**
 * Get a Employee
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param employeeName - The name of the Employee
 */
export const EmployeesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: EmployeesGetInput,
  outputSchema: EmployeesGetOutput,
}));
// Input Schema
export const EmployeesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Widget/employees",
    }),
  );
export type EmployeesListByResourceGroupInput =
  typeof EmployeesListByResourceGroupInput.Type;

// Output Schema
export const EmployeesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type EmployeesListByResourceGroupOutput =
  typeof EmployeesListByResourceGroupOutput.Type;

// The operation
/**
 * List Employee resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const EmployeesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: EmployeesListByResourceGroupInput,
    outputSchema: EmployeesListByResourceGroupOutput,
  }));
// Input Schema
export const EmployeesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Widget/employees",
    }),
  );
export type EmployeesListBySubscriptionInput =
  typeof EmployeesListBySubscriptionInput.Type;

// Output Schema
export const EmployeesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type EmployeesListBySubscriptionOutput =
  typeof EmployeesListBySubscriptionOutput.Type;

// The operation
/**
 * List Employee resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const EmployeesListBySubscription = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: EmployeesListBySubscriptionInput,
    outputSchema: EmployeesListBySubscriptionOutput,
  }),
);
// Input Schema
export const EmployeesUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  employeeName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Widget/employees/{employeeName}",
  }),
);
export type EmployeesUpdateInput = typeof EmployeesUpdateInput.Type;

// Output Schema
export const EmployeesUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type EmployeesUpdateOutput = typeof EmployeesUpdateOutput.Type;

// The operation
/**
 * Update a Employee
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param employeeName - The name of the Employee
 */
export const EmployeesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: EmployeesUpdateInput,
  outputSchema: EmployeesUpdateOutput,
}));
