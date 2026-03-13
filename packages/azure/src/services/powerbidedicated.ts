/**
 * Azure Powerbidedicated API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const AutoScaleVCoresCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vcoreName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PowerBIDedicated/autoScaleVCores/{vcoreName}",
    }),
  );
export type AutoScaleVCoresCreateInput = typeof AutoScaleVCoresCreateInput.Type;

// Output Schema
export const AutoScaleVCoresCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type AutoScaleVCoresCreateOutput =
  typeof AutoScaleVCoresCreateOutput.Type;

// The operation
/**
 * Provisions the specified auto scale v-core based on the configuration specified in the request.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vcoreName - The name of the auto scale v-core. It must be a minimum of 3 characters, and a maximum of 63.
 */
export const AutoScaleVCoresCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AutoScaleVCoresCreateInput,
    outputSchema: AutoScaleVCoresCreateOutput,
  }),
);
// Input Schema
export const AutoScaleVCoresDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vcoreName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PowerBIDedicated/autoScaleVCores/{vcoreName}",
    }),
  );
export type AutoScaleVCoresDeleteInput = typeof AutoScaleVCoresDeleteInput.Type;

// Output Schema
export const AutoScaleVCoresDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AutoScaleVCoresDeleteOutput =
  typeof AutoScaleVCoresDeleteOutput.Type;

// The operation
/**
 * Deletes the specified auto scale v-core.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vcoreName - The name of the auto scale v-core. It must be a minimum of 3 characters, and a maximum of 63.
 */
export const AutoScaleVCoresDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AutoScaleVCoresDeleteInput,
    outputSchema: AutoScaleVCoresDeleteOutput,
  }),
);
// Input Schema
export const AutoScaleVCoresGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vcoreName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PowerBIDedicated/autoScaleVCores/{vcoreName}",
    }),
  );
export type AutoScaleVCoresGetInput = typeof AutoScaleVCoresGetInput.Type;

// Output Schema
export const AutoScaleVCoresGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type AutoScaleVCoresGetOutput = typeof AutoScaleVCoresGetOutput.Type;

// The operation
/**
 * Gets details about the specified auto scale v-core.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vcoreName - The name of the auto scale v-core. It must be a minimum of 3 characters, and a maximum of 63.
 */
export const AutoScaleVCoresGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AutoScaleVCoresGetInput,
  outputSchema: AutoScaleVCoresGetOutput,
}));
// Input Schema
export const AutoScaleVCoresListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PowerBIDedicated/autoScaleVCores",
    }),
  );
export type AutoScaleVCoresListByResourceGroupInput =
  typeof AutoScaleVCoresListByResourceGroupInput.Type;

// Output Schema
export const AutoScaleVCoresListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type AutoScaleVCoresListByResourceGroupOutput =
  typeof AutoScaleVCoresListByResourceGroupOutput.Type;

// The operation
/**
 * Gets all the auto scale v-cores for the given resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const AutoScaleVCoresListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AutoScaleVCoresListByResourceGroupInput,
    outputSchema: AutoScaleVCoresListByResourceGroupOutput,
  }));
// Input Schema
export const AutoScaleVCoresListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.PowerBIDedicated/autoScaleVCores",
    }),
  );
export type AutoScaleVCoresListBySubscriptionInput =
  typeof AutoScaleVCoresListBySubscriptionInput.Type;

// Output Schema
export const AutoScaleVCoresListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type AutoScaleVCoresListBySubscriptionOutput =
  typeof AutoScaleVCoresListBySubscriptionOutput.Type;

// The operation
/**
 * Lists all the auto scale v-cores for the given subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const AutoScaleVCoresListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AutoScaleVCoresListBySubscriptionInput,
    outputSchema: AutoScaleVCoresListBySubscriptionOutput,
  }));
// Input Schema
export const AutoScaleVCoresUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vcoreName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PowerBIDedicated/autoScaleVCores/{vcoreName}",
    }),
  );
export type AutoScaleVCoresUpdateInput = typeof AutoScaleVCoresUpdateInput.Type;

// Output Schema
export const AutoScaleVCoresUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type AutoScaleVCoresUpdateOutput =
  typeof AutoScaleVCoresUpdateOutput.Type;

// The operation
/**
 * Updates the current state of the specified auto scale v-core.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vcoreName - The name of the auto scale v-core. It must be a minimum of 3 characters, and a maximum of 63.
 */
export const AutoScaleVCoresUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AutoScaleVCoresUpdateInput,
    outputSchema: AutoScaleVCoresUpdateOutput,
  }),
);
// Input Schema
export const CapacitiesCheckNameAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.PowerBIDedicated/locations/{location}/checkNameAvailability",
    }),
  );
export type CapacitiesCheckNameAvailabilityInput =
  typeof CapacitiesCheckNameAvailabilityInput.Type;

// Output Schema
export const CapacitiesCheckNameAvailabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nameAvailable: Schema.optional(Schema.Boolean),
    reason: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
  });
export type CapacitiesCheckNameAvailabilityOutput =
  typeof CapacitiesCheckNameAvailabilityOutput.Type;

// The operation
/**
 * Check the name availability in the target location.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param location - The name of Azure region.
 */
export const CapacitiesCheckNameAvailability =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CapacitiesCheckNameAvailabilityInput,
    outputSchema: CapacitiesCheckNameAvailabilityOutput,
  }));
// Input Schema
export const CapacitiesCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  dedicatedCapacityName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PowerBIDedicated/capacities/{dedicatedCapacityName}",
  }),
);
export type CapacitiesCreateInput = typeof CapacitiesCreateInput.Type;

// Output Schema
export const CapacitiesCreateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  },
);
export type CapacitiesCreateOutput = typeof CapacitiesCreateOutput.Type;

// The operation
/**
 * Provisions the specified Dedicated capacity based on the configuration specified in the request.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param dedicatedCapacityName - The name of the dedicated capacity. It must be a minimum of 3 characters, and a maximum of 63.
 */
export const CapacitiesCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CapacitiesCreateInput,
  outputSchema: CapacitiesCreateOutput,
}));
// Input Schema
export const CapacitiesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  dedicatedCapacityName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PowerBIDedicated/capacities/{dedicatedCapacityName}",
  }),
);
export type CapacitiesDeleteInput = typeof CapacitiesDeleteInput.Type;

// Output Schema
export const CapacitiesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CapacitiesDeleteOutput = typeof CapacitiesDeleteOutput.Type;

// The operation
/**
 * Deletes the specified Dedicated capacity.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param dedicatedCapacityName - The name of the dedicated capacity. It must be a minimum of 3 characters, and a maximum of 63.
 */
export const CapacitiesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CapacitiesDeleteInput,
  outputSchema: CapacitiesDeleteOutput,
}));
// Input Schema
export const CapacitiesGetDetailsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    dedicatedCapacityName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PowerBIDedicated/capacities/{dedicatedCapacityName}",
    }),
  );
export type CapacitiesGetDetailsInput = typeof CapacitiesGetDetailsInput.Type;

// Output Schema
export const CapacitiesGetDetailsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type CapacitiesGetDetailsOutput = typeof CapacitiesGetDetailsOutput.Type;

// The operation
/**
 * Gets details about the specified dedicated capacity.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param dedicatedCapacityName - The name of the dedicated capacity. It must be a minimum of 3 characters, and a maximum of 63.
 */
export const CapacitiesGetDetails = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CapacitiesGetDetailsInput,
    outputSchema: CapacitiesGetDetailsOutput,
  }),
);
// Input Schema
export const CapacitiesListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.PowerBIDedicated/capacities",
  }),
);
export type CapacitiesListInput = typeof CapacitiesListInput.Type;

// Output Schema
export const CapacitiesListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(
    Schema.Struct({
      tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      location: Schema.String,
    }),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type CapacitiesListOutput = typeof CapacitiesListOutput.Type;

// The operation
/**
 * Lists all the Dedicated capacities for the given subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const CapacitiesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CapacitiesListInput,
  outputSchema: CapacitiesListOutput,
}));
// Input Schema
export const CapacitiesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PowerBIDedicated/capacities",
    }),
  );
export type CapacitiesListByResourceGroupInput =
  typeof CapacitiesListByResourceGroupInput.Type;

// Output Schema
export const CapacitiesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type CapacitiesListByResourceGroupOutput =
  typeof CapacitiesListByResourceGroupOutput.Type;

// The operation
/**
 * Gets all the Dedicated capacities for the given resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const CapacitiesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CapacitiesListByResourceGroupInput,
    outputSchema: CapacitiesListByResourceGroupOutput,
  }));
// Input Schema
export const CapacitiesListSkusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.PowerBIDedicated/skus",
    }),
  );
export type CapacitiesListSkusInput = typeof CapacitiesListSkusInput.Type;

// Output Schema
export const CapacitiesListSkusOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          name: Schema.String,
          tier: Schema.optional(
            Schema.Literals(["PBIE_Azure", "Premium", "AutoPremiumHost"]),
          ),
          capacity: Schema.optional(Schema.Number),
        }),
      ),
    ),
  });
export type CapacitiesListSkusOutput = typeof CapacitiesListSkusOutput.Type;

// The operation
/**
 * Lists eligible SKUs for PowerBI Dedicated resource provider.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const CapacitiesListSkus = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CapacitiesListSkusInput,
  outputSchema: CapacitiesListSkusOutput,
}));
// Input Schema
export const CapacitiesListSkusForCapacityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    dedicatedCapacityName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PowerBIDedicated/capacities/{dedicatedCapacityName}/skus",
    }),
  );
export type CapacitiesListSkusForCapacityInput =
  typeof CapacitiesListSkusForCapacityInput.Type;

// Output Schema
export const CapacitiesListSkusForCapacityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          resourceType: Schema.optional(Schema.String),
          sku: Schema.optional(
            Schema.Struct({
              name: Schema.String,
              tier: Schema.optional(
                Schema.Literals(["PBIE_Azure", "Premium", "AutoPremiumHost"]),
              ),
              capacity: Schema.optional(Schema.Number),
            }),
          ),
        }),
      ),
    ),
  });
export type CapacitiesListSkusForCapacityOutput =
  typeof CapacitiesListSkusForCapacityOutput.Type;

// The operation
/**
 * Lists eligible SKUs for a PowerBI Dedicated resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param dedicatedCapacityName - The name of the dedicated capacity. It must be a minimum of 3 characters, and a maximum of 63.
 */
export const CapacitiesListSkusForCapacity =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CapacitiesListSkusForCapacityInput,
    outputSchema: CapacitiesListSkusForCapacityOutput,
  }));
// Input Schema
export const CapacitiesResumeInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  dedicatedCapacityName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PowerBIDedicated/capacities/{dedicatedCapacityName}/resume",
  }),
);
export type CapacitiesResumeInput = typeof CapacitiesResumeInput.Type;

// Output Schema
export const CapacitiesResumeOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CapacitiesResumeOutput = typeof CapacitiesResumeOutput.Type;

// The operation
/**
 * Resumes operation of the specified Dedicated capacity instance.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param dedicatedCapacityName - The name of the dedicated capacity. It must be a minimum of 3 characters, and a maximum of 63.
 */
export const CapacitiesResume = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CapacitiesResumeInput,
  outputSchema: CapacitiesResumeOutput,
}));
// Input Schema
export const CapacitiesSuspendInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    dedicatedCapacityName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PowerBIDedicated/capacities/{dedicatedCapacityName}/suspend",
  }),
);
export type CapacitiesSuspendInput = typeof CapacitiesSuspendInput.Type;

// Output Schema
export const CapacitiesSuspendOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CapacitiesSuspendOutput = typeof CapacitiesSuspendOutput.Type;

// The operation
/**
 * Suspends operation of the specified dedicated capacity instance.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param dedicatedCapacityName - The name of the dedicated capacity. It must be a minimum of 3 characters, and a maximum of 63.
 */
export const CapacitiesSuspend = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CapacitiesSuspendInput,
  outputSchema: CapacitiesSuspendOutput,
}));
// Input Schema
export const CapacitiesUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  dedicatedCapacityName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PowerBIDedicated/capacities/{dedicatedCapacityName}",
  }),
);
export type CapacitiesUpdateInput = typeof CapacitiesUpdateInput.Type;

// Output Schema
export const CapacitiesUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  },
);
export type CapacitiesUpdateOutput = typeof CapacitiesUpdateOutput.Type;

// The operation
/**
 * Updates the current state of the specified Dedicated capacity.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param dedicatedCapacityName - The name of the dedicated capacity. It must be a minimum of 3 characters, and a maximum of 63.
 */
export const CapacitiesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CapacitiesUpdateInput,
  outputSchema: CapacitiesUpdateOutput,
}));
// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.PowerBIDedicated/operations",
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
        origin: Schema.optional(Schema.String),
        properties: Schema.optional(
          Schema.Struct({
            serviceSpecification: Schema.optional(
              Schema.Struct({
                metricSpecifications: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      name: Schema.optional(Schema.String),
                      displayName: Schema.optional(Schema.String),
                      displayDescription: Schema.optional(Schema.String),
                      unit: Schema.optional(Schema.String),
                      aggregationType: Schema.optional(Schema.String),
                      metricFilterPattern: Schema.optional(Schema.String),
                      dimensions: Schema.optional(
                        Schema.Array(
                          Schema.Struct({
                            name: Schema.optional(Schema.String),
                            displayName: Schema.optional(Schema.String),
                          }),
                        ),
                      ),
                    }),
                  ),
                ),
                logSpecifications: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      name: Schema.optional(Schema.String),
                      displayName: Schema.optional(Schema.String),
                      blobDuration: Schema.optional(Schema.String),
                    }),
                  ),
                ),
              }),
            ),
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
 * List the operations for the provider
 *
 * @param api-version - The API version to use for this operation.
 */
export const OperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationsListInput,
  outputSchema: OperationsListOutput,
}));
