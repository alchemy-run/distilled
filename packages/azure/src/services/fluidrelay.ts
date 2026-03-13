/**
 * Azure Fluidrelay API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const FluidRelayContainersDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.FluidRelay/fluidRelayServers/{fluidRelayServerName}/fluidRelayContainers/{fluidRelayContainerName}",
    }),
  );
export type FluidRelayContainersDeleteInput =
  typeof FluidRelayContainersDeleteInput.Type;

// Output Schema
export const FluidRelayContainersDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type FluidRelayContainersDeleteOutput =
  typeof FluidRelayContainersDeleteOutput.Type;

// The operation
/**
 * Delete a Fluid Relay container.
 *
 * @param api-version - The API version to use for this operation.
 */
export const FluidRelayContainersDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: FluidRelayContainersDeleteInput,
    outputSchema: FluidRelayContainersDeleteOutput,
  }),
);
// Input Schema
export const FluidRelayContainersGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.FluidRelay/fluidRelayServers/{fluidRelayServerName}/fluidRelayContainers/{fluidRelayContainerName}",
    }),
  );
export type FluidRelayContainersGetInput =
  typeof FluidRelayContainersGetInput.Type;

// Output Schema
export const FluidRelayContainersGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type FluidRelayContainersGetOutput =
  typeof FluidRelayContainersGetOutput.Type;

// The operation
/**
 * Get a Fluid Relay container.
 *
 * @param api-version - The API version to use for this operation.
 */
export const FluidRelayContainersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: FluidRelayContainersGetInput,
    outputSchema: FluidRelayContainersGetOutput,
  }),
);
// Input Schema
export const FluidRelayContainersListByFluidRelayServersInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.FluidRelay/fluidRelayServers/{fluidRelayServerName}/fluidRelayContainers",
    }),
  );
export type FluidRelayContainersListByFluidRelayServersInput =
  typeof FluidRelayContainersListByFluidRelayServersInput.Type;

// Output Schema
export const FluidRelayContainersListByFluidRelayServersOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type FluidRelayContainersListByFluidRelayServersOutput =
  typeof FluidRelayContainersListByFluidRelayServersOutput.Type;

// The operation
/**
 * List all Fluid Relay containers which are children of a given Fluid Relay server.
 *
 * @param api-version - The API version to use for this operation.
 */
export const FluidRelayContainersListByFluidRelayServers =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: FluidRelayContainersListByFluidRelayServersInput,
    outputSchema: FluidRelayContainersListByFluidRelayServersOutput,
  }));
// Input Schema
export const FluidRelayOperationsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.FluidRelay/operations",
    }),
  );
export type FluidRelayOperationsListInput =
  typeof FluidRelayOperationsListInput.Type;

// Output Schema
export const FluidRelayOperationsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
          isDataAction: Schema.optional(Schema.Boolean),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type FluidRelayOperationsListOutput =
  typeof FluidRelayOperationsListOutput.Type;

// The operation
/**
 * List all operations provided by Microsoft.FluidRelay.
 *
 * @param api-version - The API version to use for this operation.
 */
export const FluidRelayOperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: FluidRelayOperationsListInput,
    outputSchema: FluidRelayOperationsListOutput,
  }),
);
// Input Schema
export const FluidRelayServersCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.FluidRelay/fluidRelayServers/{fluidRelayServerName}",
    }),
  );
export type FluidRelayServersCreateOrUpdateInput =
  typeof FluidRelayServersCreateOrUpdateInput.Type;

// Output Schema
export const FluidRelayServersCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type FluidRelayServersCreateOrUpdateOutput =
  typeof FluidRelayServersCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or Update a Fluid Relay server.
 *
 * @param api-version - The API version to use for this operation.
 */
export const FluidRelayServersCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: FluidRelayServersCreateOrUpdateInput,
    outputSchema: FluidRelayServersCreateOrUpdateOutput,
  }));
// Input Schema
export const FluidRelayServersDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.FluidRelay/fluidRelayServers/{fluidRelayServerName}",
    }),
  );
export type FluidRelayServersDeleteInput =
  typeof FluidRelayServersDeleteInput.Type;

// Output Schema
export const FluidRelayServersDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type FluidRelayServersDeleteOutput =
  typeof FluidRelayServersDeleteOutput.Type;

// The operation
/**
 * Delete a Fluid Relay server.
 *
 * @param api-version - The API version to use for this operation.
 */
export const FluidRelayServersDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: FluidRelayServersDeleteInput,
    outputSchema: FluidRelayServersDeleteOutput,
  }),
);
// Input Schema
export const FluidRelayServersGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.FluidRelay/fluidRelayServers/{fluidRelayServerName}",
    }),
  );
export type FluidRelayServersGetInput = typeof FluidRelayServersGetInput.Type;

// Output Schema
export const FluidRelayServersGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type FluidRelayServersGetOutput = typeof FluidRelayServersGetOutput.Type;

// The operation
/**
 * Get a Fluid Relay server.
 *
 * @param api-version - The API version to use for this operation.
 */
export const FluidRelayServersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: FluidRelayServersGetInput,
    outputSchema: FluidRelayServersGetOutput,
  }),
);
// Input Schema
export const FluidRelayServersListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.FluidRelay/fluidRelayServers",
    }),
  );
export type FluidRelayServersListByResourceGroupInput =
  typeof FluidRelayServersListByResourceGroupInput.Type;

// Output Schema
export const FluidRelayServersListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type FluidRelayServersListByResourceGroupOutput =
  typeof FluidRelayServersListByResourceGroupOutput.Type;

// The operation
/**
 * List all Fluid Relay servers in a resource group.
 *
 * @param api-version - The API version to use for this operation.
 */
export const FluidRelayServersListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: FluidRelayServersListByResourceGroupInput,
    outputSchema: FluidRelayServersListByResourceGroupOutput,
  }));
// Input Schema
export const FluidRelayServersListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.FluidRelay/fluidRelayServers",
    }),
  );
export type FluidRelayServersListBySubscriptionInput =
  typeof FluidRelayServersListBySubscriptionInput.Type;

// Output Schema
export const FluidRelayServersListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type FluidRelayServersListBySubscriptionOutput =
  typeof FluidRelayServersListBySubscriptionOutput.Type;

// The operation
/**
 * List all Fluid Relay servers in a subscription.
 *
 * @param api-version - The API version to use for this operation.
 */
export const FluidRelayServersListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: FluidRelayServersListBySubscriptionInput,
    outputSchema: FluidRelayServersListBySubscriptionOutput,
  }));
// Input Schema
export const FluidRelayServersListKeysInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.FluidRelay/fluidRelayServers/{fluidRelayServerName}/listKeys",
    }),
  );
export type FluidRelayServersListKeysInput =
  typeof FluidRelayServersListKeysInput.Type;

// Output Schema
export const FluidRelayServersListKeysOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    key1: Schema.optional(Schema.String),
    key2: Schema.optional(Schema.String),
  });
export type FluidRelayServersListKeysOutput =
  typeof FluidRelayServersListKeysOutput.Type;

// The operation
/**
 * Get primary and secondary key for this server.
 *
 * @param api-version - The API version to use for this operation.
 */
export const FluidRelayServersListKeys = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: FluidRelayServersListKeysInput,
    outputSchema: FluidRelayServersListKeysOutput,
  }),
);
// Input Schema
export const FluidRelayServersRegenerateKeyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.FluidRelay/fluidRelayServers/{fluidRelayServerName}/regenerateKey",
    }),
  );
export type FluidRelayServersRegenerateKeyInput =
  typeof FluidRelayServersRegenerateKeyInput.Type;

// Output Schema
export const FluidRelayServersRegenerateKeyOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    key1: Schema.optional(Schema.String),
    key2: Schema.optional(Schema.String),
  });
export type FluidRelayServersRegenerateKeyOutput =
  typeof FluidRelayServersRegenerateKeyOutput.Type;

// The operation
/**
 * Regenerate the primary or secondary key for this server.
 *
 * @param api-version - The API version to use for this operation.
 */
export const FluidRelayServersRegenerateKey =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: FluidRelayServersRegenerateKeyInput,
    outputSchema: FluidRelayServersRegenerateKeyOutput,
  }));
// Input Schema
export const FluidRelayServersUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.FluidRelay/fluidRelayServers/{fluidRelayServerName}",
    }),
  );
export type FluidRelayServersUpdateInput =
  typeof FluidRelayServersUpdateInput.Type;

// Output Schema
export const FluidRelayServersUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type FluidRelayServersUpdateOutput =
  typeof FluidRelayServersUpdateOutput.Type;

// The operation
/**
 * Update a Fluid Relay server.
 *
 * @param api-version - The API version to use for this operation.
 */
export const FluidRelayServersUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: FluidRelayServersUpdateInput,
    outputSchema: FluidRelayServersUpdateOutput,
  }),
);
