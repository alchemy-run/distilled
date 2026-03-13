/**
 * Azure Manufacturingplatform API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const ManufacturingDataServicesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    mdsResourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManufacturingPlatform/manufacturingDataServices/{mdsResourceName}",
    }),
  );
export type ManufacturingDataServicesCreateOrUpdateInput =
  typeof ManufacturingDataServicesCreateOrUpdateInput.Type;

// Output Schema
export const ManufacturingDataServicesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ManufacturingDataServicesCreateOrUpdateOutput =
  typeof ManufacturingDataServicesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a MdsResource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param mdsResourceName - Name.
 */
export const ManufacturingDataServicesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManufacturingDataServicesCreateOrUpdateInput,
    outputSchema: ManufacturingDataServicesCreateOrUpdateOutput,
  }));
// Input Schema
export const ManufacturingDataServicesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    mdsResourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManufacturingPlatform/manufacturingDataServices/{mdsResourceName}",
    }),
  );
export type ManufacturingDataServicesDeleteInput =
  typeof ManufacturingDataServicesDeleteInput.Type;

// Output Schema
export const ManufacturingDataServicesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ManufacturingDataServicesDeleteOutput =
  typeof ManufacturingDataServicesDeleteOutput.Type;

// The operation
/**
 * Delete a MdsResource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param mdsResourceName - Name.
 */
export const ManufacturingDataServicesDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManufacturingDataServicesDeleteInput,
    outputSchema: ManufacturingDataServicesDeleteOutput,
  }));
// Input Schema
export const ManufacturingDataServicesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    mdsResourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManufacturingPlatform/manufacturingDataServices/{mdsResourceName}",
    }),
  );
export type ManufacturingDataServicesGetInput =
  typeof ManufacturingDataServicesGetInput.Type;

// Output Schema
export const ManufacturingDataServicesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ManufacturingDataServicesGetOutput =
  typeof ManufacturingDataServicesGetOutput.Type;

// The operation
/**
 * Get a MdsResource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param mdsResourceName - Name.
 */
export const ManufacturingDataServicesGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManufacturingDataServicesGetInput,
    outputSchema: ManufacturingDataServicesGetOutput,
  }));
// Input Schema
export const ManufacturingDataServicesListAvailableVersionsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    mdsResourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManufacturingPlatform/manufacturingDataServices/{mdsResourceName}/listAvailableVersions",
    }),
  );
export type ManufacturingDataServicesListAvailableVersionsInput =
  typeof ManufacturingDataServicesListAvailableVersionsInput.Type;

// Output Schema
export const ManufacturingDataServicesListAvailableVersionsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    versions: Schema.Array(
      Schema.Struct({
        version: Schema.String,
        isLatest: Schema.Boolean,
        isPreview: Schema.Boolean,
        isDeprecated: Schema.Boolean,
      }),
    ),
  });
export type ManufacturingDataServicesListAvailableVersionsOutput =
  typeof ManufacturingDataServicesListAvailableVersionsOutput.Type;

// The operation
/**
 * Returns the list of available versions
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param mdsResourceName - Name.
 */
export const ManufacturingDataServicesListAvailableVersions =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManufacturingDataServicesListAvailableVersionsInput,
    outputSchema: ManufacturingDataServicesListAvailableVersionsOutput,
  }));
// Input Schema
export const ManufacturingDataServicesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManufacturingPlatform/manufacturingDataServices",
    }),
  );
export type ManufacturingDataServicesListByResourceGroupInput =
  typeof ManufacturingDataServicesListByResourceGroupInput.Type;

// Output Schema
export const ManufacturingDataServicesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ManufacturingDataServicesListByResourceGroupOutput =
  typeof ManufacturingDataServicesListByResourceGroupOutput.Type;

// The operation
/**
 * List MdsResource resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ManufacturingDataServicesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManufacturingDataServicesListByResourceGroupInput,
    outputSchema: ManufacturingDataServicesListByResourceGroupOutput,
  }));
// Input Schema
export const ManufacturingDataServicesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ManufacturingPlatform/manufacturingDataServices",
    }),
  );
export type ManufacturingDataServicesListBySubscriptionInput =
  typeof ManufacturingDataServicesListBySubscriptionInput.Type;

// Output Schema
export const ManufacturingDataServicesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ManufacturingDataServicesListBySubscriptionOutput =
  typeof ManufacturingDataServicesListBySubscriptionOutput.Type;

// The operation
/**
 * List MdsResource resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const ManufacturingDataServicesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManufacturingDataServicesListBySubscriptionInput,
    outputSchema: ManufacturingDataServicesListBySubscriptionOutput,
  }));
// Input Schema
export const ManufacturingDataServicesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    mdsResourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManufacturingPlatform/manufacturingDataServices/{mdsResourceName}",
    }),
  );
export type ManufacturingDataServicesUpdateInput =
  typeof ManufacturingDataServicesUpdateInput.Type;

// Output Schema
export const ManufacturingDataServicesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ManufacturingDataServicesUpdateOutput =
  typeof ManufacturingDataServicesUpdateOutput.Type;

// The operation
/**
 * Update a MdsResource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param mdsResourceName - Name.
 */
export const ManufacturingDataServicesUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManufacturingDataServicesUpdateInput,
    outputSchema: ManufacturingDataServicesUpdateOutput,
  }));
