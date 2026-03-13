/**
 * Azure Labservices API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const ImagesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.LabServices/labPlans/{labPlanName}/images/{imageName}",
    }),
  );
export type ImagesCreateOrUpdateInput = typeof ImagesCreateOrUpdateInput.Type;

// Output Schema
export const ImagesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ImagesCreateOrUpdateOutput = typeof ImagesCreateOrUpdateOutput.Type;

// The operation
/**
 * Updates an image via PUT.
 *
 * Updates an image resource via PUT. Creating new resources via PUT will not function.
 */
export const ImagesCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ImagesCreateOrUpdateInput,
    outputSchema: ImagesCreateOrUpdateOutput,
  }),
);
// Input Schema
export const ImagesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.LabServices/labPlans/{labPlanName}/images/{imageName}",
  }),
);
export type ImagesGetInput = typeof ImagesGetInput.Type;

// Output Schema
export const ImagesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ImagesGetOutput = typeof ImagesGetOutput.Type;

// The operation
/**
 * Gets an image.
 *
 * Gets an image resource.
 */
export const ImagesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ImagesGetInput,
  outputSchema: ImagesGetOutput,
}));
// Input Schema
export const ImagesListByLabPlanInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.LabServices/labPlans/{labPlanName}/images",
    }),
  );
export type ImagesListByLabPlanInput = typeof ImagesListByLabPlanInput.Type;

// Output Schema
export const ImagesListByLabPlanOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ImagesListByLabPlanOutput = typeof ImagesListByLabPlanOutput.Type;

// The operation
/**
 * Gets all images.
 *
 * Gets all images from galleries attached to a lab plan.
 */
export const ImagesListByLabPlan = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ImagesListByLabPlanInput,
  outputSchema: ImagesListByLabPlanOutput,
}));
// Input Schema
export const ImagesUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.LabServices/labPlans/{labPlanName}/images/{imageName}",
  }),
);
export type ImagesUpdateInput = typeof ImagesUpdateInput.Type;

// Output Schema
export const ImagesUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ImagesUpdateOutput = typeof ImagesUpdateOutput.Type;

// The operation
/**
 * Updates an image.
 *
 * Updates an image resource.
 */
export const ImagesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ImagesUpdateInput,
  outputSchema: ImagesUpdateOutput,
}));
// Input Schema
export const LabPlansCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.LabServices/labPlans/{labPlanName}",
    }),
  );
export type LabPlansCreateOrUpdateInput =
  typeof LabPlansCreateOrUpdateInput.Type;

// Output Schema
export const LabPlansCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type LabPlansCreateOrUpdateOutput =
  typeof LabPlansCreateOrUpdateOutput.Type;

// The operation
/**
 * Updates or creates a Lab Plan resource.
 *
 * Operation to create or update a Lab Plan resource.
 */
export const LabPlansCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: LabPlansCreateOrUpdateInput,
    outputSchema: LabPlansCreateOrUpdateOutput,
  }),
);
// Input Schema
export const LabPlansDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.LabServices/labPlans/{labPlanName}",
  }),
);
export type LabPlansDeleteInput = typeof LabPlansDeleteInput.Type;

// Output Schema
export const LabPlansDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type LabPlansDeleteOutput = typeof LabPlansDeleteOutput.Type;

// The operation
/**
 * Deletes a Lab Plan resource.
 *
 * Operation to delete a Lab Plan resource. Deleting a lab plan does not delete labs associated with a lab plan, nor does it delete shared images added to a gallery via the lab plan permission container.
 */
export const LabPlansDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: LabPlansDeleteInput,
  outputSchema: LabPlansDeleteOutput,
}));
// Input Schema
export const LabPlansGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.LabServices/labPlans/{labPlanName}",
  }),
);
export type LabPlansGetInput = typeof LabPlansGetInput.Type;

// Output Schema
export const LabPlansGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type LabPlansGetOutput = typeof LabPlansGetOutput.Type;

// The operation
/**
 * Retrieves a Lab Plan resource.
 *
 * Retrieves the properties of a Lab Plan.
 */
export const LabPlansGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: LabPlansGetInput,
  outputSchema: LabPlansGetOutput,
}));
// Input Schema
export const LabPlansListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.LabServices/labPlans",
    }),
  );
export type LabPlansListByResourceGroupInput =
  typeof LabPlansListByResourceGroupInput.Type;

// Output Schema
export const LabPlansListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type LabPlansListByResourceGroupOutput =
  typeof LabPlansListByResourceGroupOutput.Type;

// The operation
/**
 * Get all lab plans for a subscription and resource group.
 *
 * Returns a list of all lab plans for a subscription and resource group.
 */
export const LabPlansListByResourceGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: LabPlansListByResourceGroupInput,
    outputSchema: LabPlansListByResourceGroupOutput,
  }),
);
// Input Schema
export const LabPlansListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.LabServices/labPlans",
    }),
  );
export type LabPlansListBySubscriptionInput =
  typeof LabPlansListBySubscriptionInput.Type;

// Output Schema
export const LabPlansListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type LabPlansListBySubscriptionOutput =
  typeof LabPlansListBySubscriptionOutput.Type;

// The operation
/**
 * Get all lab plans for a subscription.
 *
 * Returns a list of all lab plans within a subscription
 */
export const LabPlansListBySubscription = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: LabPlansListBySubscriptionInput,
    outputSchema: LabPlansListBySubscriptionOutput,
  }),
);
// Input Schema
export const LabPlansSaveImageInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.LabServices/labPlans/{labPlanName}/saveImage",
  }),
);
export type LabPlansSaveImageInput = typeof LabPlansSaveImageInput.Type;

// Output Schema
export const LabPlansSaveImageOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type LabPlansSaveImageOutput = typeof LabPlansSaveImageOutput.Type;

// The operation
/**
 * Save an image from a lab VM to the attached shared image gallery.
 *
 * Saves an image from a lab VM to the attached shared image gallery.
 */
export const LabPlansSaveImage = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: LabPlansSaveImageInput,
  outputSchema: LabPlansSaveImageOutput,
}));
// Input Schema
export const LabPlansUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.LabServices/labPlans/{labPlanName}",
  }),
);
export type LabPlansUpdateInput = typeof LabPlansUpdateInput.Type;

// Output Schema
export const LabPlansUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type LabPlansUpdateOutput = typeof LabPlansUpdateOutput.Type;

// The operation
/**
 * Updates a Lab Plan resource.
 *
 * Operation to update a Lab Plan resource.
 */
export const LabPlansUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: LabPlansUpdateInput,
  outputSchema: LabPlansUpdateOutput,
}));
// Input Schema
export const LabsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.LabServices/labs/{labName}",
    }),
  );
export type LabsCreateOrUpdateInput = typeof LabsCreateOrUpdateInput.Type;

// Output Schema
export const LabsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type LabsCreateOrUpdateOutput = typeof LabsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a lab resource.
 *
 * Operation to create or update a lab resource.
 */
export const LabsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: LabsCreateOrUpdateInput,
  outputSchema: LabsCreateOrUpdateOutput,
}));
// Input Schema
export const LabsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.LabServices/labs/{labName}",
  }),
);
export type LabsDeleteInput = typeof LabsDeleteInput.Type;

// Output Schema
export const LabsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type LabsDeleteOutput = typeof LabsDeleteOutput.Type;

// The operation
/**
 * Deletes a lab resource.
 *
 * Operation to delete a lab resource.
 */
export const LabsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: LabsDeleteInput,
  outputSchema: LabsDeleteOutput,
}));
// Input Schema
export const LabsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.LabServices/labs/{labName}",
  }),
);
export type LabsGetInput = typeof LabsGetInput.Type;

// Output Schema
export const LabsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type LabsGetOutput = typeof LabsGetOutput.Type;

// The operation
/**
 * Get a lab resource.
 *
 * Returns the properties of a lab resource.
 */
export const LabsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: LabsGetInput,
  outputSchema: LabsGetOutput,
}));
// Input Schema
export const LabsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.LabServices/labs",
    }),
  );
export type LabsListByResourceGroupInput =
  typeof LabsListByResourceGroupInput.Type;

// Output Schema
export const LabsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type LabsListByResourceGroupOutput =
  typeof LabsListByResourceGroupOutput.Type;

// The operation
/**
 * Get all labs for a subscription and resource group.
 *
 * Returns a list of all labs in a resource group.
 */
export const LabsListByResourceGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: LabsListByResourceGroupInput,
    outputSchema: LabsListByResourceGroupOutput,
  }),
);
// Input Schema
export const LabsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.LabServices/labs",
    }),
  );
export type LabsListBySubscriptionInput =
  typeof LabsListBySubscriptionInput.Type;

// Output Schema
export const LabsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type LabsListBySubscriptionOutput =
  typeof LabsListBySubscriptionOutput.Type;

// The operation
/**
 * Get all labs for a subscription.
 *
 * Returns a list of all labs for a subscription.
 */
export const LabsListBySubscription = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: LabsListBySubscriptionInput,
    outputSchema: LabsListBySubscriptionOutput,
  }),
);
// Input Schema
export const LabsPublishInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.LabServices/labs/{labName}/publish",
  }),
);
export type LabsPublishInput = typeof LabsPublishInput.Type;

// Output Schema
export const LabsPublishOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type LabsPublishOutput = typeof LabsPublishOutput.Type;

// The operation
/**
 * Publish or re-publish a lab.
 *
 * Publish or re-publish a lab. This will create or update all lab resources, such as virtual machines.
 */
export const LabsPublish = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: LabsPublishInput,
  outputSchema: LabsPublishOutput,
}));
// Input Schema
export const LabsSyncGroupInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.LabServices/labs/{labName}/syncGroup",
  }),
);
export type LabsSyncGroupInput = typeof LabsSyncGroupInput.Type;

// Output Schema
export const LabsSyncGroupOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type LabsSyncGroupOutput = typeof LabsSyncGroupOutput.Type;

// The operation
/**
 * Manually sync the lab group.
 *
 * Action used to manually kick off an AAD group sync job.
 */
export const LabsSyncGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: LabsSyncGroupInput,
  outputSchema: LabsSyncGroupOutput,
}));
// Input Schema
export const LabsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.LabServices/labs/{labName}",
  }),
);
export type LabsUpdateInput = typeof LabsUpdateInput.Type;

// Output Schema
export const LabsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type LabsUpdateOutput = typeof LabsUpdateOutput.Type;

// The operation
/**
 * Update a lab resource.
 *
 * Operation to update a lab resource.
 */
export const LabsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: LabsUpdateInput,
  outputSchema: LabsUpdateOutput,
}));
// Input Schema
export const SchedulesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.LabServices/labs/{labName}/schedules/{scheduleName}",
    }),
  );
export type SchedulesCreateOrUpdateInput =
  typeof SchedulesCreateOrUpdateInput.Type;

// Output Schema
export const SchedulesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SchedulesCreateOrUpdateOutput =
  typeof SchedulesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a lab schedule.
 *
 * Operation to create or update a lab schedule.
 */
export const SchedulesCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SchedulesCreateOrUpdateInput,
    outputSchema: SchedulesCreateOrUpdateOutput,
  }),
);
// Input Schema
export const SchedulesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.LabServices/labs/{labName}/schedules/{scheduleName}",
  }),
);
export type SchedulesDeleteInput = typeof SchedulesDeleteInput.Type;

// Output Schema
export const SchedulesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SchedulesDeleteOutput = typeof SchedulesDeleteOutput.Type;

// The operation
/**
 * Deletes a schedule resource.
 *
 * Operation to delete a schedule resource.
 */
export const SchedulesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SchedulesDeleteInput,
  outputSchema: SchedulesDeleteOutput,
}));
// Input Schema
export const SchedulesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.LabServices/labs/{labName}/schedules/{scheduleName}",
  }),
);
export type SchedulesGetInput = typeof SchedulesGetInput.Type;

// Output Schema
export const SchedulesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SchedulesGetOutput = typeof SchedulesGetOutput.Type;

// The operation
/**
 * Get a lab Schedule.
 *
 * Returns the properties of a lab Schedule.
 */
export const SchedulesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SchedulesGetInput,
  outputSchema: SchedulesGetOutput,
}));
// Input Schema
export const SchedulesListByLabInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.LabServices/labs/{labName}/schedules",
    }),
  );
export type SchedulesListByLabInput = typeof SchedulesListByLabInput.Type;

// Output Schema
export const SchedulesListByLabOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type SchedulesListByLabOutput = typeof SchedulesListByLabOutput.Type;

// The operation
/**
 * Get all schedules for a lab.
 *
 * Returns a list of all schedules for a lab.
 */
export const SchedulesListByLab = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SchedulesListByLabInput,
  outputSchema: SchedulesListByLabOutput,
}));
// Input Schema
export const SchedulesUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.LabServices/labs/{labName}/schedules/{scheduleName}",
  }),
);
export type SchedulesUpdateInput = typeof SchedulesUpdateInput.Type;

// Output Schema
export const SchedulesUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type SchedulesUpdateOutput = typeof SchedulesUpdateOutput.Type;

// The operation
/**
 * Update a lab schedule.
 *
 * Operation to update a lab schedule.
 */
export const SchedulesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SchedulesUpdateInput,
  outputSchema: SchedulesUpdateOutput,
}));
// Input Schema
export const SkusListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.LabServices/skus",
  }),
);
export type SkusListInput = typeof SkusListInput.Type;

// Output Schema
export const SkusListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        resourceType: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        tier: Schema.optional(Schema.Literals(["Standard", "Premium"])),
        size: Schema.optional(Schema.String),
        family: Schema.optional(Schema.String),
        capacity: Schema.optional(
          Schema.Struct({
            default: Schema.optional(Schema.Number),
            minimum: Schema.optional(Schema.Number),
            maximum: Schema.optional(Schema.Number),
            scaleType: Schema.optional(
              Schema.Literals(["None", "Manual", "Automatic"]),
            ),
          }),
        ),
        capabilities: Schema.optional(
          Schema.Array(
            Schema.Struct({
              name: Schema.optional(Schema.String),
              value: Schema.optional(Schema.String),
            }),
          ),
        ),
        locations: Schema.optional(Schema.Array(Schema.String)),
        costs: Schema.optional(
          Schema.Array(
            Schema.Struct({
              meterId: Schema.optional(Schema.String),
              quantity: Schema.optional(Schema.Number),
              extendedUnit: Schema.optional(Schema.String),
            }),
          ),
        ),
        restrictions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              type: Schema.optional(Schema.Literals(["Location"])),
              values: Schema.optional(Schema.Array(Schema.String)),
              reasonCode: Schema.optional(
                Schema.Literals(["QuotaId", "NotAvailableForSubscription"]),
              ),
            }),
          ),
        ),
      }),
    ),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type SkusListOutput = typeof SkusListOutput.Type;

// The operation
/**
 * Gets the Azure Lab Services resource SKUs.
 *
 * Returns a list of Azure Lab Services resource SKUs.
 */
export const SkusList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SkusListInput,
  outputSchema: SkusListOutput,
}));
// Input Schema
export const UsagesListByLocationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.LabServices/locations/{location}/usages",
    }),
  );
export type UsagesListByLocationInput = typeof UsagesListByLocationInput.Type;

// Output Schema
export const UsagesListByLocationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          currentValue: Schema.optional(Schema.Number),
          limit: Schema.optional(Schema.Number),
          unit: Schema.optional(Schema.Literals(["Count"])),
          name: Schema.optional(
            Schema.Struct({
              localizedValue: Schema.optional(Schema.String),
              skuInstances: Schema.optional(Schema.Array(Schema.String)),
              value: Schema.optional(Schema.String),
            }),
          ),
          id: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type UsagesListByLocationOutput = typeof UsagesListByLocationOutput.Type;

// The operation
/**
 * Gets the list of usages.
 *
 * Returns list of usage per SKU family for the specified subscription in the specified region.
 */
export const UsagesListByLocation = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: UsagesListByLocationInput,
    outputSchema: UsagesListByLocationOutput,
  }),
);
// Input Schema
export const UsersCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.LabServices/labs/{labName}/users/{userName}",
    }),
  );
export type UsersCreateOrUpdateInput = typeof UsersCreateOrUpdateInput.Type;

// Output Schema
export const UsersCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type UsersCreateOrUpdateOutput = typeof UsersCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a lab user.
 *
 * Operation to create or update a lab user.
 */
export const UsersCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: UsersCreateOrUpdateInput,
  outputSchema: UsersCreateOrUpdateOutput,
}));
// Input Schema
export const UsersDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.LabServices/labs/{labName}/users/{userName}",
  }),
);
export type UsersDeleteInput = typeof UsersDeleteInput.Type;

// Output Schema
export const UsersDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type UsersDeleteOutput = typeof UsersDeleteOutput.Type;

// The operation
/**
 * Deletes a user resource.
 *
 * Operation to delete a user resource.
 */
export const UsersDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: UsersDeleteInput,
  outputSchema: UsersDeleteOutput,
}));
// Input Schema
export const UsersGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.LabServices/labs/{labName}/users/{userName}",
  }),
);
export type UsersGetInput = typeof UsersGetInput.Type;

// Output Schema
export const UsersGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type UsersGetOutput = typeof UsersGetOutput.Type;

// The operation
/**
 * Get a lab user.
 *
 * Returns the properties of a lab user.
 */
export const UsersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: UsersGetInput,
  outputSchema: UsersGetOutput,
}));
// Input Schema
export const UsersInviteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.LabServices/labs/{labName}/users/{userName}/invite",
  }),
);
export type UsersInviteInput = typeof UsersInviteInput.Type;

// Output Schema
export const UsersInviteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type UsersInviteOutput = typeof UsersInviteOutput.Type;

// The operation
/**
 * Invite a user to a lab.
 *
 * Operation to invite a user to a lab.
 */
export const UsersInvite = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: UsersInviteInput,
  outputSchema: UsersInviteOutput,
}));
// Input Schema
export const UsersListByLabInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.LabServices/labs/{labName}/users",
  }),
);
export type UsersListByLabInput = typeof UsersListByLabInput.Type;

// Output Schema
export const UsersListByLabOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(Schema.Array(Schema.Struct({}))),
  nextLink: Schema.optional(Schema.String),
});
export type UsersListByLabOutput = typeof UsersListByLabOutput.Type;

// The operation
/**
 * Get all users for a lab.
 *
 * Returns a list of all users for a lab.
 */
export const UsersListByLab = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: UsersListByLabInput,
  outputSchema: UsersListByLabOutput,
}));
// Input Schema
export const UsersUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.LabServices/labs/{labName}/users/{userName}",
  }),
);
export type UsersUpdateInput = typeof UsersUpdateInput.Type;

// Output Schema
export const UsersUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type UsersUpdateOutput = typeof UsersUpdateOutput.Type;

// The operation
/**
 * Update a lab user.
 *
 * Operation to update a lab user.
 */
export const UsersUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: UsersUpdateInput,
  outputSchema: UsersUpdateOutput,
}));
// Input Schema
export const VirtualMachinesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.LabServices/labs/{labName}/virtualMachines/{virtualMachineName}",
    }),
  );
export type VirtualMachinesGetInput = typeof VirtualMachinesGetInput.Type;

// Output Schema
export const VirtualMachinesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type VirtualMachinesGetOutput = typeof VirtualMachinesGetOutput.Type;

// The operation
/**
 * Get a lab virtual machine.
 *
 * Returns the properties for a lab virtual machine.
 */
export const VirtualMachinesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: VirtualMachinesGetInput,
  outputSchema: VirtualMachinesGetOutput,
}));
// Input Schema
export const VirtualMachinesListByLabInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.LabServices/labs/{labName}/virtualMachines",
    }),
  );
export type VirtualMachinesListByLabInput =
  typeof VirtualMachinesListByLabInput.Type;

// Output Schema
export const VirtualMachinesListByLabOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type VirtualMachinesListByLabOutput =
  typeof VirtualMachinesListByLabOutput.Type;

// The operation
/**
 * Get all virtual machines for a lab.
 *
 * Returns a list of all virtual machines for a lab.
 */
export const VirtualMachinesListByLab = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VirtualMachinesListByLabInput,
    outputSchema: VirtualMachinesListByLabOutput,
  }),
);
// Input Schema
export const VirtualMachinesRedeployInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.LabServices/labs/{labName}/virtualMachines/{virtualMachineName}/redeploy",
    }),
  );
export type VirtualMachinesRedeployInput =
  typeof VirtualMachinesRedeployInput.Type;

// Output Schema
export const VirtualMachinesRedeployOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type VirtualMachinesRedeployOutput =
  typeof VirtualMachinesRedeployOutput.Type;

// The operation
/**
 * Redeploy a lab virtual machine to a different compute node. For troubleshooting connectivity.
 *
 * Action to redeploy a lab virtual machine to a different compute node. For troubleshooting connectivity.
 */
export const VirtualMachinesRedeploy = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VirtualMachinesRedeployInput,
    outputSchema: VirtualMachinesRedeployOutput,
  }),
);
// Input Schema
export const VirtualMachinesReimageInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.LabServices/labs/{labName}/virtualMachines/{virtualMachineName}/reimage",
    }),
  );
export type VirtualMachinesReimageInput =
  typeof VirtualMachinesReimageInput.Type;

// Output Schema
export const VirtualMachinesReimageOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type VirtualMachinesReimageOutput =
  typeof VirtualMachinesReimageOutput.Type;

// The operation
/**
 * Re-image a lab virtual machine.
 *
 * Re-image a lab virtual machine. The virtual machine will be deleted and recreated using the latest published snapshot of the reference environment of the lab.
 */
export const VirtualMachinesReimage = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VirtualMachinesReimageInput,
    outputSchema: VirtualMachinesReimageOutput,
  }),
);
// Input Schema
export const VirtualMachinesResetPasswordInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.LabServices/labs/{labName}/virtualMachines/{virtualMachineName}/resetPassword",
    }),
  );
export type VirtualMachinesResetPasswordInput =
  typeof VirtualMachinesResetPasswordInput.Type;

// Output Schema
export const VirtualMachinesResetPasswordOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type VirtualMachinesResetPasswordOutput =
  typeof VirtualMachinesResetPasswordOutput.Type;

// The operation
/**
 * Reset a lab virtual machine password.
 *
 * Resets a lab virtual machine password.
 */
export const VirtualMachinesResetPassword =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: VirtualMachinesResetPasswordInput,
    outputSchema: VirtualMachinesResetPasswordOutput,
  }));
// Input Schema
export const VirtualMachinesStartInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.LabServices/labs/{labName}/virtualMachines/{virtualMachineName}/start",
    }),
  );
export type VirtualMachinesStartInput = typeof VirtualMachinesStartInput.Type;

// Output Schema
export const VirtualMachinesStartOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type VirtualMachinesStartOutput = typeof VirtualMachinesStartOutput.Type;

// The operation
/**
 * Start a lab virtual machine.
 *
 * Action to start a lab virtual machine.
 */
export const VirtualMachinesStart = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VirtualMachinesStartInput,
    outputSchema: VirtualMachinesStartOutput,
  }),
);
// Input Schema
export const VirtualMachinesStopInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.LabServices/labs/{labName}/virtualMachines/{virtualMachineName}/stop",
    }),
  );
export type VirtualMachinesStopInput = typeof VirtualMachinesStopInput.Type;

// Output Schema
export const VirtualMachinesStopOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type VirtualMachinesStopOutput = typeof VirtualMachinesStopOutput.Type;

// The operation
/**
 * Stop a lab virtual machine.
 *
 * Action to stop a lab virtual machine.
 */
export const VirtualMachinesStop = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: VirtualMachinesStopInput,
  outputSchema: VirtualMachinesStopOutput,
}));
