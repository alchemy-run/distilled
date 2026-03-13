/**
 * Azure Communitytraining API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const CommunityTrainingsCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    communityTrainingName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Community/communityTrainings/{communityTrainingName}",
    }),
  );
export type CommunityTrainingsCreateInput =
  typeof CommunityTrainingsCreateInput.Type;

// Output Schema
export const CommunityTrainingsCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type CommunityTrainingsCreateOutput =
  typeof CommunityTrainingsCreateOutput.Type;

// The operation
/**
 * Create a CommunityTraining
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param communityTrainingName - The name of the Community Training Resource
 */
export const CommunityTrainingsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CommunityTrainingsCreateInput,
    outputSchema: CommunityTrainingsCreateOutput,
  }),
);
// Input Schema
export const CommunityTrainingsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    communityTrainingName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Community/communityTrainings/{communityTrainingName}",
    }),
  );
export type CommunityTrainingsDeleteInput =
  typeof CommunityTrainingsDeleteInput.Type;

// Output Schema
export const CommunityTrainingsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CommunityTrainingsDeleteOutput =
  typeof CommunityTrainingsDeleteOutput.Type;

// The operation
/**
 * Delete a CommunityTraining
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param communityTrainingName - The name of the Community Training Resource
 */
export const CommunityTrainingsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CommunityTrainingsDeleteInput,
    outputSchema: CommunityTrainingsDeleteOutput,
  }),
);
// Input Schema
export const CommunityTrainingsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    communityTrainingName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Community/communityTrainings/{communityTrainingName}",
    }),
  );
export type CommunityTrainingsGetInput = typeof CommunityTrainingsGetInput.Type;

// Output Schema
export const CommunityTrainingsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type CommunityTrainingsGetOutput =
  typeof CommunityTrainingsGetOutput.Type;

// The operation
/**
 * Get a CommunityTraining
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param communityTrainingName - The name of the Community Training Resource
 */
export const CommunityTrainingsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CommunityTrainingsGetInput,
    outputSchema: CommunityTrainingsGetOutput,
  }),
);
// Input Schema
export const CommunityTrainingsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Community/communityTrainings",
    }),
  );
export type CommunityTrainingsListByResourceGroupInput =
  typeof CommunityTrainingsListByResourceGroupInput.Type;

// Output Schema
export const CommunityTrainingsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type CommunityTrainingsListByResourceGroupOutput =
  typeof CommunityTrainingsListByResourceGroupOutput.Type;

// The operation
/**
 * List CommunityTraining resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const CommunityTrainingsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CommunityTrainingsListByResourceGroupInput,
    outputSchema: CommunityTrainingsListByResourceGroupOutput,
  }));
// Input Schema
export const CommunityTrainingsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Community/communityTrainings",
    }),
  );
export type CommunityTrainingsListBySubscriptionInput =
  typeof CommunityTrainingsListBySubscriptionInput.Type;

// Output Schema
export const CommunityTrainingsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type CommunityTrainingsListBySubscriptionOutput =
  typeof CommunityTrainingsListBySubscriptionOutput.Type;

// The operation
/**
 * List CommunityTraining resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const CommunityTrainingsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CommunityTrainingsListBySubscriptionInput,
    outputSchema: CommunityTrainingsListBySubscriptionOutput,
  }));
// Input Schema
export const CommunityTrainingsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    communityTrainingName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Community/communityTrainings/{communityTrainingName}",
    }),
  );
export type CommunityTrainingsUpdateInput =
  typeof CommunityTrainingsUpdateInput.Type;

// Output Schema
export const CommunityTrainingsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type CommunityTrainingsUpdateOutput =
  typeof CommunityTrainingsUpdateOutput.Type;

// The operation
/**
 * Update a CommunityTraining
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param communityTrainingName - The name of the Community Training Resource
 */
export const CommunityTrainingsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CommunityTrainingsUpdateInput,
    outputSchema: CommunityTrainingsUpdateOutput,
  }),
);
