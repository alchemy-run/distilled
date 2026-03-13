/**
 * Azure Healthdataaiservices API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const DeidServicesCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    deidServiceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthDataAIServices/deidServices/{deidServiceName}",
    }),
  );
export type DeidServicesCreateInput = typeof DeidServicesCreateInput.Type;

// Output Schema
export const DeidServicesCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type DeidServicesCreateOutput = typeof DeidServicesCreateOutput.Type;

// The operation
/**
 * Create a DeidService
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param deidServiceName - The name of the deid service
 */
export const DeidServicesCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DeidServicesCreateInput,
  outputSchema: DeidServicesCreateOutput,
}));
// Input Schema
export const DeidServicesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    deidServiceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthDataAIServices/deidServices/{deidServiceName}",
    }),
  );
export type DeidServicesDeleteInput = typeof DeidServicesDeleteInput.Type;

// Output Schema
export const DeidServicesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DeidServicesDeleteOutput = typeof DeidServicesDeleteOutput.Type;

// The operation
/**
 * Delete a DeidService
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param deidServiceName - The name of the deid service
 */
export const DeidServicesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DeidServicesDeleteInput,
  outputSchema: DeidServicesDeleteOutput,
}));
// Input Schema
export const DeidServicesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  deidServiceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthDataAIServices/deidServices/{deidServiceName}",
  }),
);
export type DeidServicesGetInput = typeof DeidServicesGetInput.Type;

// Output Schema
export const DeidServicesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type DeidServicesGetOutput = typeof DeidServicesGetOutput.Type;

// The operation
/**
 * Get a DeidService
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param deidServiceName - The name of the deid service
 */
export const DeidServicesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DeidServicesGetInput,
  outputSchema: DeidServicesGetOutput,
}));
// Input Schema
export const DeidServicesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthDataAIServices/deidServices",
    }),
  );
export type DeidServicesListByResourceGroupInput =
  typeof DeidServicesListByResourceGroupInput.Type;

// Output Schema
export const DeidServicesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type DeidServicesListByResourceGroupOutput =
  typeof DeidServicesListByResourceGroupOutput.Type;

// The operation
/**
 * List DeidService resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const DeidServicesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeidServicesListByResourceGroupInput,
    outputSchema: DeidServicesListByResourceGroupOutput,
  }));
// Input Schema
export const DeidServicesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.HealthDataAIServices/deidServices",
    }),
  );
export type DeidServicesListBySubscriptionInput =
  typeof DeidServicesListBySubscriptionInput.Type;

// Output Schema
export const DeidServicesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type DeidServicesListBySubscriptionOutput =
  typeof DeidServicesListBySubscriptionOutput.Type;

// The operation
/**
 * List DeidService resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const DeidServicesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeidServicesListBySubscriptionInput,
    outputSchema: DeidServicesListBySubscriptionOutput,
  }));
// Input Schema
export const DeidServicesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    deidServiceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthDataAIServices/deidServices/{deidServiceName}",
    }),
  );
export type DeidServicesUpdateInput = typeof DeidServicesUpdateInput.Type;

// Output Schema
export const DeidServicesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type DeidServicesUpdateOutput = typeof DeidServicesUpdateOutput.Type;

// The operation
/**
 * Update a DeidService
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param deidServiceName - The name of the deid service
 */
export const DeidServicesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DeidServicesUpdateInput,
  outputSchema: DeidServicesUpdateOutput,
}));
// Input Schema
export const PrivateEndpointConnectionsCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    deidServiceName: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthDataAIServices/deidServices/{deidServiceName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type PrivateEndpointConnectionsCreateInput =
  typeof PrivateEndpointConnectionsCreateInput.Type;

// Output Schema
export const PrivateEndpointConnectionsCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PrivateEndpointConnectionsCreateOutput =
  typeof PrivateEndpointConnectionsCreateOutput.Type;

// The operation
/**
 * Create a Private endpoint connection
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param deidServiceName - The name of the deid service
 * @param privateEndpointConnectionName - The name of the private endpoint connection associated with the Azure resource.
 */
export const PrivateEndpointConnectionsCreate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsCreateInput,
    outputSchema: PrivateEndpointConnectionsCreateOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    deidServiceName: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthDataAIServices/deidServices/{deidServiceName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type PrivateEndpointConnectionsDeleteInput =
  typeof PrivateEndpointConnectionsDeleteInput.Type;

// Output Schema
export const PrivateEndpointConnectionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PrivateEndpointConnectionsDeleteOutput =
  typeof PrivateEndpointConnectionsDeleteOutput.Type;

// The operation
/**
 * Delete the private endpoint connection
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param deidServiceName - The name of the deid service
 * @param privateEndpointConnectionName - The name of the private endpoint connection associated with the Azure resource.
 */
export const PrivateEndpointConnectionsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsDeleteInput,
    outputSchema: PrivateEndpointConnectionsDeleteOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    deidServiceName: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthDataAIServices/deidServices/{deidServiceName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type PrivateEndpointConnectionsGetInput =
  typeof PrivateEndpointConnectionsGetInput.Type;

// Output Schema
export const PrivateEndpointConnectionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PrivateEndpointConnectionsGetOutput =
  typeof PrivateEndpointConnectionsGetOutput.Type;

// The operation
/**
 * Get a specific private connection
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param deidServiceName - The name of the deid service
 * @param privateEndpointConnectionName - The name of the private endpoint connection associated with the Azure resource.
 */
export const PrivateEndpointConnectionsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsGetInput,
    outputSchema: PrivateEndpointConnectionsGetOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsListByDeidServiceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    deidServiceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthDataAIServices/deidServices/{deidServiceName}/privateEndpointConnections",
    }),
  );
export type PrivateEndpointConnectionsListByDeidServiceInput =
  typeof PrivateEndpointConnectionsListByDeidServiceInput.Type;

// Output Schema
export const PrivateEndpointConnectionsListByDeidServiceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type PrivateEndpointConnectionsListByDeidServiceOutput =
  typeof PrivateEndpointConnectionsListByDeidServiceOutput.Type;

// The operation
/**
 * List private endpoint connections on the given resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param deidServiceName - The name of the deid service
 */
export const PrivateEndpointConnectionsListByDeidService =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsListByDeidServiceInput,
    outputSchema: PrivateEndpointConnectionsListByDeidServiceOutput,
  }));
// Input Schema
export const PrivateLinksListByDeidServiceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    deidServiceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthDataAIServices/deidServices/{deidServiceName}/privateLinkResources",
    }),
  );
export type PrivateLinksListByDeidServiceInput =
  typeof PrivateLinksListByDeidServiceInput.Type;

// Output Schema
export const PrivateLinksListByDeidServiceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type PrivateLinksListByDeidServiceOutput =
  typeof PrivateLinksListByDeidServiceOutput.Type;

// The operation
/**
 * List private links on the given resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param deidServiceName - The name of the deid service
 */
export const PrivateLinksListByDeidService =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinksListByDeidServiceInput,
    outputSchema: PrivateLinksListByDeidServiceOutput,
  }));
