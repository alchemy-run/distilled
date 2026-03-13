/**
 * Azure Azurelargeinstance API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const AzureLargeInstanceGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    azureLargeInstanceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureLargeInstance/azureLargeInstances/{azureLargeInstanceName}",
    }),
  );
export type AzureLargeInstanceGetInput = typeof AzureLargeInstanceGetInput.Type;

// Output Schema
export const AzureLargeInstanceGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type AzureLargeInstanceGetOutput =
  typeof AzureLargeInstanceGetOutput.Type;

// The operation
/**
 * Gets an Azure Large Instance for the specified subscription, resource group,
 * and instance name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param azureLargeInstanceName - Name of the AzureLargeInstance.
 */
export const AzureLargeInstanceGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AzureLargeInstanceGetInput,
    outputSchema: AzureLargeInstanceGetOutput,
  }),
);
// Input Schema
export const AzureLargeInstanceListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureLargeInstance/azureLargeInstances",
    }),
  );
export type AzureLargeInstanceListByResourceGroupInput =
  typeof AzureLargeInstanceListByResourceGroupInput.Type;

// Output Schema
export const AzureLargeInstanceListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type AzureLargeInstanceListByResourceGroupOutput =
  typeof AzureLargeInstanceListByResourceGroupOutput.Type;

// The operation
/**
 * Gets a list of Azure Large Instances in the specified subscription and resource
 * group. The operations returns various properties of each Azure Large Instance.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const AzureLargeInstanceListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AzureLargeInstanceListByResourceGroupInput,
    outputSchema: AzureLargeInstanceListByResourceGroupOutput,
  }));
// Input Schema
export const AzureLargeInstanceListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AzureLargeInstance/azureLargeInstances",
    }),
  );
export type AzureLargeInstanceListBySubscriptionInput =
  typeof AzureLargeInstanceListBySubscriptionInput.Type;

// Output Schema
export const AzureLargeInstanceListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type AzureLargeInstanceListBySubscriptionOutput =
  typeof AzureLargeInstanceListBySubscriptionOutput.Type;

// The operation
/**
 * Gets a list of Azure Large Instances in the specified subscription. The
 * operations returns various properties of each Azure Large Instance.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const AzureLargeInstanceListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AzureLargeInstanceListBySubscriptionInput,
    outputSchema: AzureLargeInstanceListBySubscriptionOutput,
  }));
// Input Schema
export const AzureLargeInstanceUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    azureLargeInstanceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureLargeInstance/azureLargeInstances/{azureLargeInstanceName}",
    }),
  );
export type AzureLargeInstanceUpdateInput =
  typeof AzureLargeInstanceUpdateInput.Type;

// Output Schema
export const AzureLargeInstanceUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type AzureLargeInstanceUpdateOutput =
  typeof AzureLargeInstanceUpdateOutput.Type;

// The operation
/**
 * Patches the Tags field of an Azure Large Instance for the specified
 * subscription, resource group, and instance name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param azureLargeInstanceName - Name of the AzureLargeInstance.
 */
export const AzureLargeInstanceUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AzureLargeInstanceUpdateInput,
    outputSchema: AzureLargeInstanceUpdateOutput,
  }),
);
// Input Schema
export const AzureLargeStorageInstanceGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    azureLargeStorageInstanceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureLargeInstance/azureLargeStorageInstances/{azureLargeStorageInstanceName}",
    }),
  );
export type AzureLargeStorageInstanceGetInput =
  typeof AzureLargeStorageInstanceGetInput.Type;

// Output Schema
export const AzureLargeStorageInstanceGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type AzureLargeStorageInstanceGetOutput =
  typeof AzureLargeStorageInstanceGetOutput.Type;

// The operation
/**
 * Gets an Azure Large Storage instance for the specified subscription, resource
 * group, and instance name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param azureLargeStorageInstanceName - Name of the AzureLargeStorageInstance.
 */
export const AzureLargeStorageInstanceGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AzureLargeStorageInstanceGetInput,
    outputSchema: AzureLargeStorageInstanceGetOutput,
  }));
// Input Schema
export const AzureLargeStorageInstanceListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureLargeInstance/azureLargeStorageInstances",
    }),
  );
export type AzureLargeStorageInstanceListByResourceGroupInput =
  typeof AzureLargeStorageInstanceListByResourceGroupInput.Type;

// Output Schema
export const AzureLargeStorageInstanceListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type AzureLargeStorageInstanceListByResourceGroupOutput =
  typeof AzureLargeStorageInstanceListByResourceGroupOutput.Type;

// The operation
/**
 * Gets a list of AzureLargeStorageInstances in the specified subscription and
 * resource group. The operations returns various properties of each Azure
 * LargeStorage instance.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const AzureLargeStorageInstanceListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AzureLargeStorageInstanceListByResourceGroupInput,
    outputSchema: AzureLargeStorageInstanceListByResourceGroupOutput,
  }));
// Input Schema
export const AzureLargeStorageInstanceListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AzureLargeInstance/azureLargeStorageInstances",
    }),
  );
export type AzureLargeStorageInstanceListBySubscriptionInput =
  typeof AzureLargeStorageInstanceListBySubscriptionInput.Type;

// Output Schema
export const AzureLargeStorageInstanceListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type AzureLargeStorageInstanceListBySubscriptionOutput =
  typeof AzureLargeStorageInstanceListBySubscriptionOutput.Type;

// The operation
/**
 * Gets a list of AzureLargeStorageInstances in the specified subscription. The
 * operations returns various properties of each Azure LargeStorage instance.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const AzureLargeStorageInstanceListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AzureLargeStorageInstanceListBySubscriptionInput,
    outputSchema: AzureLargeStorageInstanceListBySubscriptionOutput,
  }));
// Input Schema
export const AzureLargeStorageInstanceUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    azureLargeStorageInstanceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureLargeInstance/azureLargeStorageInstances/{azureLargeStorageInstanceName}",
    }),
  );
export type AzureLargeStorageInstanceUpdateInput =
  typeof AzureLargeStorageInstanceUpdateInput.Type;

// Output Schema
export const AzureLargeStorageInstanceUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type AzureLargeStorageInstanceUpdateOutput =
  typeof AzureLargeStorageInstanceUpdateOutput.Type;

// The operation
/**
 * Patches the Tags field of a Azure Large Storage Instance for the specified
 * subscription, resource group, and instance name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param azureLargeStorageInstanceName - Name of the AzureLargeStorageInstance.
 */
export const AzureLargeStorageInstanceUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AzureLargeStorageInstanceUpdateInput,
    outputSchema: AzureLargeStorageInstanceUpdateOutput,
  }));
