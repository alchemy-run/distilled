/**
 * Azure Liftrweightsandbiases API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const InstancesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    instancename: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.WeightsAndBiases/instances/{instancename}",
    }),
  );
export type InstancesCreateOrUpdateInput =
  typeof InstancesCreateOrUpdateInput.Type;

// Output Schema
export const InstancesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type InstancesCreateOrUpdateOutput =
  typeof InstancesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a InstanceResource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param instancename - Name of the Instance resource
 */
export const InstancesCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: InstancesCreateOrUpdateInput,
    outputSchema: InstancesCreateOrUpdateOutput,
  }),
);
// Input Schema
export const InstancesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  instancename: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.WeightsAndBiases/instances/{instancename}",
  }),
);
export type InstancesDeleteInput = typeof InstancesDeleteInput.Type;

// Output Schema
export const InstancesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type InstancesDeleteOutput = typeof InstancesDeleteOutput.Type;

// The operation
/**
 * Delete a InstanceResource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param instancename - Name of the Instance resource
 */
export const InstancesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: InstancesDeleteInput,
  outputSchema: InstancesDeleteOutput,
}));
// Input Schema
export const InstancesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  instancename: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.WeightsAndBiases/instances/{instancename}",
  }),
);
export type InstancesGetInput = typeof InstancesGetInput.Type;

// Output Schema
export const InstancesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type InstancesGetOutput = typeof InstancesGetOutput.Type;

// The operation
/**
 * Get a InstanceResource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param instancename - Name of the Instance resource
 */
export const InstancesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: InstancesGetInput,
  outputSchema: InstancesGetOutput,
}));
// Input Schema
export const InstancesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.WeightsAndBiases/instances",
    }),
  );
export type InstancesListByResourceGroupInput =
  typeof InstancesListByResourceGroupInput.Type;

// Output Schema
export const InstancesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type InstancesListByResourceGroupOutput =
  typeof InstancesListByResourceGroupOutput.Type;

// The operation
/**
 * List InstanceResource resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const InstancesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: InstancesListByResourceGroupInput,
    outputSchema: InstancesListByResourceGroupOutput,
  }));
// Input Schema
export const InstancesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.WeightsAndBiases/instances",
    }),
  );
export type InstancesListBySubscriptionInput =
  typeof InstancesListBySubscriptionInput.Type;

// Output Schema
export const InstancesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type InstancesListBySubscriptionOutput =
  typeof InstancesListBySubscriptionOutput.Type;

// The operation
/**
 * List InstanceResource resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const InstancesListBySubscription = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: InstancesListBySubscriptionInput,
    outputSchema: InstancesListBySubscriptionOutput,
  }),
);
// Input Schema
export const InstancesUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  instancename: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.WeightsAndBiases/instances/{instancename}",
  }),
);
export type InstancesUpdateInput = typeof InstancesUpdateInput.Type;

// Output Schema
export const InstancesUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type InstancesUpdateOutput = typeof InstancesUpdateOutput.Type;

// The operation
/**
 * Update a InstanceResource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param instancename - Name of the Instance resource
 */
export const InstancesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: InstancesUpdateInput,
  outputSchema: InstancesUpdateOutput,
}));
