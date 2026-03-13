/**
 * Azure Devopsinfrastructure API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const ImageVersionsListByImageInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    imageName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevOpsInfrastructure/images/{imageName}/versions",
    }),
  );
export type ImageVersionsListByImageInput =
  typeof ImageVersionsListByImageInput.Type;

// Output Schema
export const ImageVersionsListByImageOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type ImageVersionsListByImageOutput =
  typeof ImageVersionsListByImageOutput.Type;

// The operation
/**
 * List ImageVersion resources by Image
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param imageName - Name of the image.
 */
export const ImageVersionsListByImage = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ImageVersionsListByImageInput,
    outputSchema: ImageVersionsListByImageOutput,
  }),
);
// Input Schema
export const PoolsCheckNameAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DevOpsInfrastructure/checkNameAvailability",
    }),
  );
export type PoolsCheckNameAvailabilityInput =
  typeof PoolsCheckNameAvailabilityInput.Type;

// Output Schema
export const PoolsCheckNameAvailabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    available: Schema.Literals(["Available", "Unavailable"]),
    message: Schema.String,
    name: Schema.String,
    reason: Schema.Literals(["Invalid", "AlreadyExists"]),
  });
export type PoolsCheckNameAvailabilityOutput =
  typeof PoolsCheckNameAvailabilityOutput.Type;

// The operation
/**
 * Checks that the pool name is valid and is not already in use.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const PoolsCheckNameAvailability = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PoolsCheckNameAvailabilityInput,
    outputSchema: PoolsCheckNameAvailabilityOutput,
  }),
);
// Input Schema
export const PoolsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    poolName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevOpsInfrastructure/pools/{poolName}",
    }),
  );
export type PoolsCreateOrUpdateInput = typeof PoolsCreateOrUpdateInput.Type;

// Output Schema
export const PoolsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type PoolsCreateOrUpdateOutput = typeof PoolsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a Pool
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param poolName - Name of the pool. It needs to be globally unique.
 */
export const PoolsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PoolsCreateOrUpdateInput,
  outputSchema: PoolsCreateOrUpdateOutput,
}));
// Input Schema
export const PoolsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  poolName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevOpsInfrastructure/pools/{poolName}",
  }),
);
export type PoolsDeleteInput = typeof PoolsDeleteInput.Type;

// Output Schema
export const PoolsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PoolsDeleteOutput = typeof PoolsDeleteOutput.Type;

// The operation
/**
 * Delete a Pool
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param poolName - Name of the pool. It needs to be globally unique.
 */
export const PoolsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PoolsDeleteInput,
  outputSchema: PoolsDeleteOutput,
}));
// Input Schema
export const PoolsDeleteResourcesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    poolName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevOpsInfrastructure/pools/{poolName}/resources",
    }),
  );
export type PoolsDeleteResourcesInput = typeof PoolsDeleteResourcesInput.Type;

// Output Schema
export const PoolsDeleteResourcesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PoolsDeleteResourcesOutput = typeof PoolsDeleteResourcesOutput.Type;

// The operation
/**
 * A synchronous resource action.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param poolName - Name of the pool. It needs to be globally unique.
 */
export const PoolsDeleteResources = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PoolsDeleteResourcesInput,
    outputSchema: PoolsDeleteResourcesOutput,
  }),
);
// Input Schema
export const PoolsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  poolName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevOpsInfrastructure/pools/{poolName}",
  }),
);
export type PoolsGetInput = typeof PoolsGetInput.Type;

// Output Schema
export const PoolsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type PoolsGetOutput = typeof PoolsGetOutput.Type;

// The operation
/**
 * Get a Pool
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param poolName - Name of the pool. It needs to be globally unique.
 */
export const PoolsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PoolsGetInput,
  outputSchema: PoolsGetOutput,
}));
// Input Schema
export const PoolsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevOpsInfrastructure/pools",
    }),
  );
export type PoolsListByResourceGroupInput =
  typeof PoolsListByResourceGroupInput.Type;

// Output Schema
export const PoolsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type PoolsListByResourceGroupOutput =
  typeof PoolsListByResourceGroupOutput.Type;

// The operation
/**
 * List Pool resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const PoolsListByResourceGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PoolsListByResourceGroupInput,
    outputSchema: PoolsListByResourceGroupOutput,
  }),
);
// Input Schema
export const PoolsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DevOpsInfrastructure/pools",
    }),
  );
export type PoolsListBySubscriptionInput =
  typeof PoolsListBySubscriptionInput.Type;

// Output Schema
export const PoolsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type PoolsListBySubscriptionOutput =
  typeof PoolsListBySubscriptionOutput.Type;

// The operation
/**
 * List Pool resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const PoolsListBySubscription = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PoolsListBySubscriptionInput,
    outputSchema: PoolsListBySubscriptionOutput,
  }),
);
// Input Schema
export const PoolsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  poolName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevOpsInfrastructure/pools/{poolName}",
  }),
);
export type PoolsUpdateInput = typeof PoolsUpdateInput.Type;

// Output Schema
export const PoolsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type PoolsUpdateOutput = typeof PoolsUpdateOutput.Type;

// The operation
/**
 * Update a Pool
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param poolName - Name of the pool. It needs to be globally unique.
 */
export const PoolsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PoolsUpdateInput,
  outputSchema: PoolsUpdateOutput,
}));
// Input Schema
export const ResourceDetailsListByPoolInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    poolName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevOpsInfrastructure/pools/{poolName}/resources",
    }),
  );
export type ResourceDetailsListByPoolInput =
  typeof ResourceDetailsListByPoolInput.Type;

// Output Schema
export const ResourceDetailsListByPoolOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type ResourceDetailsListByPoolOutput =
  typeof ResourceDetailsListByPoolOutput.Type;

// The operation
/**
 * List ResourceDetailsObject resources by Pool
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param poolName - Name of the pool. It needs to be globally unique.
 */
export const ResourceDetailsListByPool = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ResourceDetailsListByPoolInput,
    outputSchema: ResourceDetailsListByPoolOutput,
  }),
);
// Input Schema
export const SkuListByLocationInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    locationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.DevOpsInfrastructure/locations/{locationName}/skus",
  }),
);
export type SkuListByLocationInput = typeof SkuListByLocationInput.Type;

// Output Schema
export const SkuListByLocationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type SkuListByLocationOutput = typeof SkuListByLocationOutput.Type;

// The operation
/**
 * List ResourceSku resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param locationName - Name of the location.
 */
export const SkuListByLocation = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SkuListByLocationInput,
  outputSchema: SkuListByLocationOutput,
}));
// Input Schema
export const SubscriptionUsagesUsagesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DevOpsInfrastructure/locations/{location}/usages",
    }),
  );
export type SubscriptionUsagesUsagesInput =
  typeof SubscriptionUsagesUsagesInput.Type;

// Output Schema
export const SubscriptionUsagesUsagesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        name: Schema.optional(
          Schema.Struct({
            value: Schema.optional(Schema.String),
            localizedValue: Schema.optional(Schema.String),
          }),
        ),
        id: Schema.String,
        unit: Schema.String,
        currentValue: Schema.Number,
        limit: Schema.Number,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type SubscriptionUsagesUsagesOutput =
  typeof SubscriptionUsagesUsagesOutput.Type;

// The operation
/**
 * List Quota resources by subscription ID
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param location - The name of the Azure region.
 * @param api-version - The API version to use for this operation.
 */
export const SubscriptionUsagesUsages = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SubscriptionUsagesUsagesInput,
    outputSchema: SubscriptionUsagesUsagesOutput,
  }),
);
