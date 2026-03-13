/**
 * Azure Changeanalysis API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const ChangesListChangesByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ChangeAnalysis/changes",
    }),
  );
export type ChangesListChangesByResourceGroupInput =
  typeof ChangesListChangesByResourceGroupInput.Type;

// Output Schema
export const ChangesListChangesByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ChangesListChangesByResourceGroupOutput =
  typeof ChangesListChangesByResourceGroupOutput.Type;

// The operation
/**
 * List the changes of a resource group within the specified time range. Customer data will always be masked.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ChangesListChangesByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ChangesListChangesByResourceGroupInput,
    outputSchema: ChangesListChangesByResourceGroupOutput,
  }));
// Input Schema
export const ChangesListChangesBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ChangeAnalysis/changes",
    }),
  );
export type ChangesListChangesBySubscriptionInput =
  typeof ChangesListChangesBySubscriptionInput.Type;

// Output Schema
export const ChangesListChangesBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ChangesListChangesBySubscriptionOutput =
  typeof ChangesListChangesBySubscriptionOutput.Type;

// The operation
/**
 * List the changes of a subscription within the specified time range. Customer data will always be masked.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const ChangesListChangesBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ChangesListChangesBySubscriptionInput,
    outputSchema: ChangesListChangesBySubscriptionOutput,
  }));
// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.ChangeAnalysis/operations",
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
      }),
    ),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type OperationsListOutput = typeof OperationsListOutput.Type;

// The operation
/**
 * Lists all the supported operations by the Microsoft.ChangeAnalysis resource provider along with their descriptions.
 *
 * @param api-version - The API version to use for this operation.
 */
export const OperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationsListInput,
  outputSchema: OperationsListOutput,
}));
// Input Schema
export const ResourceChangesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/{resourceId}/providers/Microsoft.ChangeAnalysis/resourceChanges",
    }),
  );
export type ResourceChangesListInput = typeof ResourceChangesListInput.Type;

// Output Schema
export const ResourceChangesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ResourceChangesListOutput = typeof ResourceChangesListOutput.Type;

// The operation
/**
 * List the changes of a resource within the specified time range. Customer data will be masked if the user doesn't have access.
 *
 * @param api-version - The API version to use for this operation.
 */
export const ResourceChangesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ResourceChangesListInput,
  outputSchema: ResourceChangesListOutput,
}));
