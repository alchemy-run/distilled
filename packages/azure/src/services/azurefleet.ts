/**
 * Azure Azurefleet API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const FleetsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    fleetName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureFleet/fleets/{fleetName}",
    }),
  );
export type FleetsCreateOrUpdateInput = typeof FleetsCreateOrUpdateInput.Type;

// Output Schema
export const FleetsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type FleetsCreateOrUpdateOutput = typeof FleetsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a Fleet
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param fleetName - The name of the Compute Fleet
 */
export const FleetsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: FleetsCreateOrUpdateInput,
    outputSchema: FleetsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const FleetsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  fleetName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureFleet/fleets/{fleetName}",
  }),
);
export type FleetsDeleteInput = typeof FleetsDeleteInput.Type;

// Output Schema
export const FleetsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type FleetsDeleteOutput = typeof FleetsDeleteOutput.Type;

// The operation
/**
 * Delete a Fleet
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param fleetName - The name of the Compute Fleet
 */
export const FleetsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FleetsDeleteInput,
  outputSchema: FleetsDeleteOutput,
}));
// Input Schema
export const FleetsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  fleetName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureFleet/fleets/{fleetName}",
  }),
);
export type FleetsGetInput = typeof FleetsGetInput.Type;

// Output Schema
export const FleetsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type FleetsGetOutput = typeof FleetsGetOutput.Type;

// The operation
/**
 * Get a Fleet
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param fleetName - The name of the Compute Fleet
 */
export const FleetsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FleetsGetInput,
  outputSchema: FleetsGetOutput,
}));
// Input Schema
export const FleetsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureFleet/fleets",
    }),
  );
export type FleetsListByResourceGroupInput =
  typeof FleetsListByResourceGroupInput.Type;

// Output Schema
export const FleetsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type FleetsListByResourceGroupOutput =
  typeof FleetsListByResourceGroupOutput.Type;

// The operation
/**
 * List Fleet resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const FleetsListByResourceGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: FleetsListByResourceGroupInput,
    outputSchema: FleetsListByResourceGroupOutput,
  }),
);
// Input Schema
export const FleetsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AzureFleet/fleets",
    }),
  );
export type FleetsListBySubscriptionInput =
  typeof FleetsListBySubscriptionInput.Type;

// Output Schema
export const FleetsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type FleetsListBySubscriptionOutput =
  typeof FleetsListBySubscriptionOutput.Type;

// The operation
/**
 * List Fleet resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const FleetsListBySubscription = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: FleetsListBySubscriptionInput,
    outputSchema: FleetsListBySubscriptionOutput,
  }),
);
// Input Schema
export const FleetsListVirtualMachineScaleSetsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureFleet/fleets/{name}/virtualMachineScaleSets",
    }),
  );
export type FleetsListVirtualMachineScaleSetsInput =
  typeof FleetsListVirtualMachineScaleSetsInput.Type;

// Output Schema
export const FleetsListVirtualMachineScaleSetsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        name: Schema.String,
        id: Schema.String,
        type: Schema.optional(Schema.String),
        operationStatus: Schema.Literals([
          "Succeeded",
          "Failed",
          "Canceled",
          "Creating",
          "Updating",
          "Deleting",
          "Migrating",
        ]),
        error: Schema.optional(
          Schema.Struct({
            code: Schema.optional(Schema.String),
            target: Schema.optional(Schema.String),
            message: Schema.optional(Schema.String),
            details: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  code: Schema.optional(Schema.String),
                  target: Schema.optional(Schema.String),
                  message: Schema.optional(Schema.String),
                }),
              ),
            ),
            innererror: Schema.optional(
              Schema.Struct({
                exceptionType: Schema.optional(Schema.String),
                errorDetail: Schema.optional(Schema.String),
              }),
            ),
          }),
        ),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type FleetsListVirtualMachineScaleSetsOutput =
  typeof FleetsListVirtualMachineScaleSetsOutput.Type;

// The operation
/**
 * List VirtualMachineScaleSet resources by Fleet
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - The name of the Fleet
 */
export const FleetsListVirtualMachineScaleSets =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: FleetsListVirtualMachineScaleSetsInput,
    outputSchema: FleetsListVirtualMachineScaleSetsOutput,
  }));
// Input Schema
export const FleetsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  fleetName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureFleet/fleets/{fleetName}",
  }),
);
export type FleetsUpdateInput = typeof FleetsUpdateInput.Type;

// Output Schema
export const FleetsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type FleetsUpdateOutput = typeof FleetsUpdateOutput.Type;

// The operation
/**
 * Update a Fleet
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param fleetName - The name of the Compute Fleet
 */
export const FleetsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FleetsUpdateInput,
  outputSchema: FleetsUpdateOutput,
}));
