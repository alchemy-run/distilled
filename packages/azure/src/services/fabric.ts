/**
 * Azure Fabric API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const FabricCapacitiesCheckNameAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Fabric/locations/{location}/checkNameAvailability",
    }),
  );
export type FabricCapacitiesCheckNameAvailabilityInput =
  typeof FabricCapacitiesCheckNameAvailabilityInput.Type;

// Output Schema
export const FabricCapacitiesCheckNameAvailabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nameAvailable: Schema.optional(Schema.Boolean),
    reason: Schema.optional(Schema.Literals(["Invalid", "AlreadyExists"])),
    message: Schema.optional(Schema.String),
  });
export type FabricCapacitiesCheckNameAvailabilityOutput =
  typeof FabricCapacitiesCheckNameAvailabilityOutput.Type;

// The operation
/**
 * Implements local CheckNameAvailability operations
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param location - The name of the Azure region.
 * @param name - The name of the resource for which availability needs to be checked.
 * @param type - The resource type.
 */
export const FabricCapacitiesCheckNameAvailability =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: FabricCapacitiesCheckNameAvailabilityInput,
    outputSchema: FabricCapacitiesCheckNameAvailabilityOutput,
  }));
// Input Schema
export const FabricCapacitiesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    capacityName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Fabric/capacities/{capacityName}",
    }),
  );
export type FabricCapacitiesCreateOrUpdateInput =
  typeof FabricCapacitiesCreateOrUpdateInput.Type;

// Output Schema
export const FabricCapacitiesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type FabricCapacitiesCreateOrUpdateOutput =
  typeof FabricCapacitiesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a FabricCapacity
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param capacityName - The name of the Microsoft Fabric capacity. It must be a minimum of 3 characters, and a maximum of 63.
 */
export const FabricCapacitiesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: FabricCapacitiesCreateOrUpdateInput,
    outputSchema: FabricCapacitiesCreateOrUpdateOutput,
  }));
// Input Schema
export const FabricCapacitiesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    capacityName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Fabric/capacities/{capacityName}",
    }),
  );
export type FabricCapacitiesDeleteInput =
  typeof FabricCapacitiesDeleteInput.Type;

// Output Schema
export const FabricCapacitiesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type FabricCapacitiesDeleteOutput =
  typeof FabricCapacitiesDeleteOutput.Type;

// The operation
/**
 * Delete a FabricCapacity
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param capacityName - The name of the Microsoft Fabric capacity. It must be a minimum of 3 characters, and a maximum of 63.
 */
export const FabricCapacitiesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: FabricCapacitiesDeleteInput,
    outputSchema: FabricCapacitiesDeleteOutput,
  }),
);
// Input Schema
export const FabricCapacitiesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    capacityName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Fabric/capacities/{capacityName}",
    }),
  );
export type FabricCapacitiesGetInput = typeof FabricCapacitiesGetInput.Type;

// Output Schema
export const FabricCapacitiesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type FabricCapacitiesGetOutput = typeof FabricCapacitiesGetOutput.Type;

// The operation
/**
 * Get a FabricCapacity
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param capacityName - The name of the Microsoft Fabric capacity. It must be a minimum of 3 characters, and a maximum of 63.
 */
export const FabricCapacitiesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FabricCapacitiesGetInput,
  outputSchema: FabricCapacitiesGetOutput,
}));
// Input Schema
export const FabricCapacitiesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Fabric/capacities",
    }),
  );
export type FabricCapacitiesListByResourceGroupInput =
  typeof FabricCapacitiesListByResourceGroupInput.Type;

// Output Schema
export const FabricCapacitiesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type FabricCapacitiesListByResourceGroupOutput =
  typeof FabricCapacitiesListByResourceGroupOutput.Type;

// The operation
/**
 * List FabricCapacity resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const FabricCapacitiesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: FabricCapacitiesListByResourceGroupInput,
    outputSchema: FabricCapacitiesListByResourceGroupOutput,
  }));
// Input Schema
export const FabricCapacitiesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Fabric/capacities",
    }),
  );
export type FabricCapacitiesListBySubscriptionInput =
  typeof FabricCapacitiesListBySubscriptionInput.Type;

// Output Schema
export const FabricCapacitiesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type FabricCapacitiesListBySubscriptionOutput =
  typeof FabricCapacitiesListBySubscriptionOutput.Type;

// The operation
/**
 * List FabricCapacity resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const FabricCapacitiesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: FabricCapacitiesListBySubscriptionInput,
    outputSchema: FabricCapacitiesListBySubscriptionOutput,
  }));
// Input Schema
export const FabricCapacitiesListSkusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Fabric/skus",
    }),
  );
export type FabricCapacitiesListSkusInput =
  typeof FabricCapacitiesListSkusInput.Type;

// Output Schema
export const FabricCapacitiesListSkusOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        resourceType: Schema.String,
        name: Schema.String,
        locations: Schema.Array(Schema.String),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type FabricCapacitiesListSkusOutput =
  typeof FabricCapacitiesListSkusOutput.Type;

// The operation
/**
 * List eligible SKUs for Microsoft Fabric resource provider
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const FabricCapacitiesListSkus = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: FabricCapacitiesListSkusInput,
    outputSchema: FabricCapacitiesListSkusOutput,
  }),
);
// Input Schema
export const FabricCapacitiesListSkusForCapacityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    capacityName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Fabric/capacities/{capacityName}/skus",
    }),
  );
export type FabricCapacitiesListSkusForCapacityInput =
  typeof FabricCapacitiesListSkusForCapacityInput.Type;

// Output Schema
export const FabricCapacitiesListSkusForCapacityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        resourceType: Schema.String,
        sku: Schema.Struct({
          name: Schema.String,
          tier: Schema.Literals(["Fabric"]),
        }),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type FabricCapacitiesListSkusForCapacityOutput =
  typeof FabricCapacitiesListSkusForCapacityOutput.Type;

// The operation
/**
 * List eligible SKUs for a Microsoft Fabric resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param capacityName - The name of the Microsoft Fabric capacity. It must be a minimum of 3 characters, and a maximum of 63.
 */
export const FabricCapacitiesListSkusForCapacity =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: FabricCapacitiesListSkusForCapacityInput,
    outputSchema: FabricCapacitiesListSkusForCapacityOutput,
  }));
// Input Schema
export const FabricCapacitiesResumeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    capacityName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Fabric/capacities/{capacityName}/resume",
    }),
  );
export type FabricCapacitiesResumeInput =
  typeof FabricCapacitiesResumeInput.Type;

// Output Schema
export const FabricCapacitiesResumeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type FabricCapacitiesResumeOutput =
  typeof FabricCapacitiesResumeOutput.Type;

// The operation
/**
 * Resume operation of the specified Fabric capacity instance.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param capacityName - The name of the Microsoft Fabric capacity. It must be a minimum of 3 characters, and a maximum of 63.
 */
export const FabricCapacitiesResume = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: FabricCapacitiesResumeInput,
    outputSchema: FabricCapacitiesResumeOutput,
  }),
);
// Input Schema
export const FabricCapacitiesSuspendInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    capacityName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Fabric/capacities/{capacityName}/suspend",
    }),
  );
export type FabricCapacitiesSuspendInput =
  typeof FabricCapacitiesSuspendInput.Type;

// Output Schema
export const FabricCapacitiesSuspendOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type FabricCapacitiesSuspendOutput =
  typeof FabricCapacitiesSuspendOutput.Type;

// The operation
/**
 * Suspend operation of the specified Fabric capacity instance.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param capacityName - The name of the Microsoft Fabric capacity. It must be a minimum of 3 characters, and a maximum of 63.
 */
export const FabricCapacitiesSuspend = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: FabricCapacitiesSuspendInput,
    outputSchema: FabricCapacitiesSuspendOutput,
  }),
);
// Input Schema
export const FabricCapacitiesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    capacityName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Fabric/capacities/{capacityName}",
    }),
  );
export type FabricCapacitiesUpdateInput =
  typeof FabricCapacitiesUpdateInput.Type;

// Output Schema
export const FabricCapacitiesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type FabricCapacitiesUpdateOutput =
  typeof FabricCapacitiesUpdateOutput.Type;

// The operation
/**
 * Update a FabricCapacity
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param capacityName - The name of the Microsoft Fabric capacity. It must be a minimum of 3 characters, and a maximum of 63.
 */
export const FabricCapacitiesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: FabricCapacitiesUpdateInput,
    outputSchema: FabricCapacitiesUpdateOutput,
  }),
);
