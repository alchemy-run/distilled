/**
 * Azure Iotcentral API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const AppsCheckNameAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.IoTCentral/checkNameAvailability",
    }),
  );
export type AppsCheckNameAvailabilityInput =
  typeof AppsCheckNameAvailabilityInput.Type;

// Output Schema
export const AppsCheckNameAvailabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nameAvailable: Schema.optional(Schema.Boolean),
    reason: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
  });
export type AppsCheckNameAvailabilityOutput =
  typeof AppsCheckNameAvailabilityOutput.Type;

// The operation
/**
 * Check if an IoT Central application name is available.
 */
export const AppsCheckNameAvailability = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AppsCheckNameAvailabilityInput,
    outputSchema: AppsCheckNameAvailabilityOutput,
  }),
);
// Input Schema
export const AppsCheckSubdomainAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.IoTCentral/checkSubdomainAvailability",
    }),
  );
export type AppsCheckSubdomainAvailabilityInput =
  typeof AppsCheckSubdomainAvailabilityInput.Type;

// Output Schema
export const AppsCheckSubdomainAvailabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nameAvailable: Schema.optional(Schema.Boolean),
    reason: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
  });
export type AppsCheckSubdomainAvailabilityOutput =
  typeof AppsCheckSubdomainAvailabilityOutput.Type;

// The operation
/**
 * Check if an IoT Central application subdomain is available.
 */
export const AppsCheckSubdomainAvailability =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AppsCheckSubdomainAvailabilityInput,
    outputSchema: AppsCheckSubdomainAvailabilityOutput,
  }));
// Input Schema
export const AppsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTCentral/iotApps/{resourceName}",
    }),
  );
export type AppsCreateOrUpdateInput = typeof AppsCreateOrUpdateInput.Type;

// Output Schema
export const AppsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type AppsCreateOrUpdateOutput = typeof AppsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update the metadata of an IoT Central application. The usual pattern to modify a property is to retrieve the IoT Central application metadata and security metadata, and then combine them with the modified values in a new body to update the IoT Central application.
 */
export const AppsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AppsCreateOrUpdateInput,
  outputSchema: AppsCreateOrUpdateOutput,
}));
// Input Schema
export const AppsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTCentral/iotApps/{resourceName}",
  }),
);
export type AppsDeleteInput = typeof AppsDeleteInput.Type;

// Output Schema
export const AppsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AppsDeleteOutput = typeof AppsDeleteOutput.Type;

// The operation
/**
 * Delete an IoT Central application.
 */
export const AppsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AppsDeleteInput,
  outputSchema: AppsDeleteOutput,
}));
// Input Schema
export const AppsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTCentral/iotApps/{resourceName}",
  }),
);
export type AppsGetInput = typeof AppsGetInput.Type;

// Output Schema
export const AppsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  location: Schema.String,
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
});
export type AppsGetOutput = typeof AppsGetOutput.Type;

// The operation
/**
 * Get the metadata of an IoT Central application.
 */
export const AppsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AppsGetInput,
  outputSchema: AppsGetOutput,
}));
// Input Schema
export const AppsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTCentral/iotApps",
    }),
  );
export type AppsListByResourceGroupInput =
  typeof AppsListByResourceGroupInput.Type;

// Output Schema
export const AppsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.String,
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        }),
      ),
    ),
  });
export type AppsListByResourceGroupOutput =
  typeof AppsListByResourceGroupOutput.Type;

// The operation
/**
 * Get all the IoT Central Applications in a resource group.
 */
export const AppsListByResourceGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AppsListByResourceGroupInput,
    outputSchema: AppsListByResourceGroupOutput,
  }),
);
// Input Schema
export const AppsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.IoTCentral/iotApps",
    }),
  );
export type AppsListBySubscriptionInput =
  typeof AppsListBySubscriptionInput.Type;

// Output Schema
export const AppsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.String,
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        }),
      ),
    ),
  });
export type AppsListBySubscriptionOutput =
  typeof AppsListBySubscriptionOutput.Type;

// The operation
/**
 * Get all IoT Central Applications in a subscription.
 */
export const AppsListBySubscription = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AppsListBySubscriptionInput,
    outputSchema: AppsListBySubscriptionOutput,
  }),
);
// Input Schema
export const AppsListTemplatesInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.IoTCentral/appTemplates",
  }),
);
export type AppsListTemplatesInput = typeof AppsListTemplatesInput.Type;

// Output Schema
export const AppsListTemplatesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          manifestId: Schema.optional(Schema.String),
          manifestVersion: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          title: Schema.optional(Schema.String),
          order: Schema.optional(Schema.Number),
          description: Schema.optional(Schema.String),
          industry: Schema.optional(Schema.String),
          locations: Schema.optional(
            Schema.Array(
              Schema.Struct({
                id: Schema.optional(Schema.String),
                displayName: Schema.optional(Schema.String),
              }),
            ),
          ),
        }),
      ),
    ),
  });
export type AppsListTemplatesOutput = typeof AppsListTemplatesOutput.Type;

// The operation
/**
 * Get all available application templates.
 */
export const AppsListTemplates = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AppsListTemplatesInput,
  outputSchema: AppsListTemplatesOutput,
}));
// Input Schema
export const AppsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTCentral/iotApps/{resourceName}",
  }),
);
export type AppsUpdateInput = typeof AppsUpdateInput.Type;

// Output Schema
export const AppsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  location: Schema.String,
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
});
export type AppsUpdateOutput = typeof AppsUpdateOutput.Type;

// The operation
/**
 * Update the metadata of an IoT Central application.
 */
export const AppsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AppsUpdateInput,
  outputSchema: AppsUpdateOutput,
}));
// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({ method: "GET", path: "/providers/Microsoft.IoTCentral/operations" }),
);
export type OperationsListInput = typeof OperationsListInput.Type;

// Output Schema
export const OperationsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  nextLink: Schema.optional(Schema.String),
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
        properties: Schema.optional(Schema.Unknown),
      }),
    ),
  ),
});
export type OperationsListOutput = typeof OperationsListOutput.Type;

// The operation
/**
 * Lists all of the available IoT Central Resource Provider operations.
 */
export const OperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationsListInput,
  outputSchema: OperationsListOutput,
}));
