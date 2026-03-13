/**
 * Azure Baremetalinfrastructure API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const AzureBareMetalInstancesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BareMetalInfrastructure/bareMetalInstances/{azureBareMetalInstanceName}",
    }),
  );
export type AzureBareMetalInstancesGetInput =
  typeof AzureBareMetalInstancesGetInput.Type;

// Output Schema
export const AzureBareMetalInstancesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type AzureBareMetalInstancesGetOutput =
  typeof AzureBareMetalInstancesGetOutput.Type;

// The operation
/**
 * Gets an Azure BareMetal instance.
 *
 * Gets an Azure BareMetal instance for the specified subscription, resource group, and instance name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const AzureBareMetalInstancesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AzureBareMetalInstancesGetInput,
    outputSchema: AzureBareMetalInstancesGetOutput,
  }),
);
// Input Schema
export const AzureBareMetalInstancesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BareMetalInfrastructure/bareMetalInstances",
    }),
  );
export type AzureBareMetalInstancesListByResourceGroupInput =
  typeof AzureBareMetalInstancesListByResourceGroupInput.Type;

// Output Schema
export const AzureBareMetalInstancesListByResourceGroupOutput =
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
export type AzureBareMetalInstancesListByResourceGroupOutput =
  typeof AzureBareMetalInstancesListByResourceGroupOutput.Type;

// The operation
/**
 * Gets a list of Azure BareMetal instances in the specified subscription and resource group.
 *
 * Gets a list of AzureBareMetal instances in the specified subscription and resource group. The operations returns various properties of each Azure BareMetal instance.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const AzureBareMetalInstancesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AzureBareMetalInstancesListByResourceGroupInput,
    outputSchema: AzureBareMetalInstancesListByResourceGroupOutput,
  }));
// Input Schema
export const AzureBareMetalInstancesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.BareMetalInfrastructure/bareMetalInstances",
    }),
  );
export type AzureBareMetalInstancesListBySubscriptionInput =
  typeof AzureBareMetalInstancesListBySubscriptionInput.Type;

// Output Schema
export const AzureBareMetalInstancesListBySubscriptionOutput =
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
export type AzureBareMetalInstancesListBySubscriptionOutput =
  typeof AzureBareMetalInstancesListBySubscriptionOutput.Type;

// The operation
/**
 * Gets a list of Azure BareMetal instances in the specified subscription.
 *
 * Gets a list of AzureBareMetal instances in the specified subscription. The operations returns various properties of each Azure BareMetal instance.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const AzureBareMetalInstancesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AzureBareMetalInstancesListBySubscriptionInput,
    outputSchema: AzureBareMetalInstancesListBySubscriptionOutput,
  }));
// Input Schema
export const AzureBareMetalInstancesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BareMetalInfrastructure/bareMetalInstances/{azureBareMetalInstanceName}",
    }),
  );
export type AzureBareMetalInstancesUpdateInput =
  typeof AzureBareMetalInstancesUpdateInput.Type;

// Output Schema
export const AzureBareMetalInstancesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type AzureBareMetalInstancesUpdateOutput =
  typeof AzureBareMetalInstancesUpdateOutput.Type;

// The operation
/**
 * Patches the Tags field of a Azure BareMetal instance.
 *
 * Patches the Tags field of a Azure BareMetal instance for the specified subscription, resource group, and instance name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const AzureBareMetalInstancesUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AzureBareMetalInstancesUpdateInput,
    outputSchema: AzureBareMetalInstancesUpdateOutput,
  }));
// Input Schema
export const AzureBareMetalStorageInstancesCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BareMetalInfrastructure/bareMetalStorageInstances/{azureBareMetalStorageInstanceName}",
    }),
  );
export type AzureBareMetalStorageInstancesCreateInput =
  typeof AzureBareMetalStorageInstancesCreateInput.Type;

// Output Schema
export const AzureBareMetalStorageInstancesCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type AzureBareMetalStorageInstancesCreateOutput =
  typeof AzureBareMetalStorageInstancesCreateOutput.Type;

// The operation
/**
 * Create an azure baremetal storage resource.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const AzureBareMetalStorageInstancesCreate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AzureBareMetalStorageInstancesCreateInput,
    outputSchema: AzureBareMetalStorageInstancesCreateOutput,
  }));
// Input Schema
export const AzureBareMetalStorageInstancesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BareMetalInfrastructure/bareMetalStorageInstances/{azureBareMetalStorageInstanceName}",
    }),
  );
export type AzureBareMetalStorageInstancesDeleteInput =
  typeof AzureBareMetalStorageInstancesDeleteInput.Type;

// Output Schema
export const AzureBareMetalStorageInstancesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AzureBareMetalStorageInstancesDeleteOutput =
  typeof AzureBareMetalStorageInstancesDeleteOutput.Type;

// The operation
/**
 * Delete an AzureBareMetalStorageInstance.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const AzureBareMetalStorageInstancesDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AzureBareMetalStorageInstancesDeleteInput,
    outputSchema: AzureBareMetalStorageInstancesDeleteOutput,
  }));
// Input Schema
export const AzureBareMetalStorageInstancesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BareMetalInfrastructure/bareMetalStorageInstances/{azureBareMetalStorageInstanceName}",
    }),
  );
export type AzureBareMetalStorageInstancesGetInput =
  typeof AzureBareMetalStorageInstancesGetInput.Type;

// Output Schema
export const AzureBareMetalStorageInstancesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type AzureBareMetalStorageInstancesGetOutput =
  typeof AzureBareMetalStorageInstancesGetOutput.Type;

// The operation
/**
 * Gets an Azure BareMetal Storage instance.
 *
 * Gets an Azure BareMetal Storage instance for the specified subscription, resource group, and instance name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const AzureBareMetalStorageInstancesGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AzureBareMetalStorageInstancesGetInput,
    outputSchema: AzureBareMetalStorageInstancesGetOutput,
  }));
// Input Schema
export const AzureBareMetalStorageInstancesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BareMetalInfrastructure/bareMetalStorageInstances",
    }),
  );
export type AzureBareMetalStorageInstancesListByResourceGroupInput =
  typeof AzureBareMetalStorageInstancesListByResourceGroupInput.Type;

// Output Schema
export const AzureBareMetalStorageInstancesListByResourceGroupOutput =
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
export type AzureBareMetalStorageInstancesListByResourceGroupOutput =
  typeof AzureBareMetalStorageInstancesListByResourceGroupOutput.Type;

// The operation
/**
 * Gets a list of Azure BareMetalStorage instances in the specified subscription and resource group.
 *
 * Gets a list of AzureBareMetalStorage instances in the specified subscription and resource group. The operations returns various properties of each Azure BareMetal instance.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const AzureBareMetalStorageInstancesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AzureBareMetalStorageInstancesListByResourceGroupInput,
    outputSchema: AzureBareMetalStorageInstancesListByResourceGroupOutput,
  }));
// Input Schema
export const AzureBareMetalStorageInstancesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.BareMetalInfrastructure/bareMetalStorageInstances",
    }),
  );
export type AzureBareMetalStorageInstancesListBySubscriptionInput =
  typeof AzureBareMetalStorageInstancesListBySubscriptionInput.Type;

// Output Schema
export const AzureBareMetalStorageInstancesListBySubscriptionOutput =
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
export type AzureBareMetalStorageInstancesListBySubscriptionOutput =
  typeof AzureBareMetalStorageInstancesListBySubscriptionOutput.Type;

// The operation
/**
 * Gets a list of Azure BareMetalStorage instances in the specified subscription.
 *
 * Gets a list of AzureBareMetalStorage instances in the specified subscription. The operations returns various properties of each Azure BareMetal instance.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const AzureBareMetalStorageInstancesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AzureBareMetalStorageInstancesListBySubscriptionInput,
    outputSchema: AzureBareMetalStorageInstancesListBySubscriptionOutput,
  }));
// Input Schema
export const AzureBareMetalStorageInstancesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BareMetalInfrastructure/bareMetalStorageInstances/{azureBareMetalStorageInstanceName}",
    }),
  );
export type AzureBareMetalStorageInstancesUpdateInput =
  typeof AzureBareMetalStorageInstancesUpdateInput.Type;

// Output Schema
export const AzureBareMetalStorageInstancesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type AzureBareMetalStorageInstancesUpdateOutput =
  typeof AzureBareMetalStorageInstancesUpdateOutput.Type;

// The operation
/**
 * Patches the Tags field of a Azure BareMetalStorage instance.
 *
 * Patches the Tags field of a Azure BareMetalStorage instance for the specified subscription, resource group, and instance name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const AzureBareMetalStorageInstancesUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AzureBareMetalStorageInstancesUpdateInput,
    outputSchema: AzureBareMetalStorageInstancesUpdateOutput,
  }));
// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.BareMetalInfrastructure/operations",
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
        isDataAction: Schema.optional(Schema.Boolean),
      }),
    ),
  ),
});
export type OperationsListOutput = typeof OperationsListOutput.Type;

// The operation
/**
 * Gets a list of AzureBareMetal management operations.
 *
 * @param api-version - The API version to use for this operation.
 */
export const OperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationsListInput,
  outputSchema: OperationsListOutput,
}));
