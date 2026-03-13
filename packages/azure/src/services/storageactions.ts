/**
 * Azure Storageactions API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const StorageTaskAssignmentListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    storageTaskName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $maxpagesize: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageActions/storageTasks/{storageTaskName}/storageTaskAssignments",
    }),
  );
export type StorageTaskAssignmentListInput =
  typeof StorageTaskAssignmentListInput.Type;

// Output Schema
export const StorageTaskAssignmentListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type StorageTaskAssignmentListOutput =
  typeof StorageTaskAssignmentListOutput.Type;

// The operation
/**
 * Lists Resource IDs of the Storage Task Assignments associated with this Storage Task.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageTaskName - The name of the storage task within the specified resource group. Storage task names must be between 3 and 18 characters in length and use numbers and lower-case letters only.
 * @param $maxpagesize - Optional, specifies the maximum number of Storage Task Assignment Resource IDs to be included in the list response.
 */
export const StorageTaskAssignmentList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: StorageTaskAssignmentListInput,
    outputSchema: StorageTaskAssignmentListOutput,
  }),
);
// Input Schema
export const StorageTasksCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    storageTaskName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageActions/storageTasks/{storageTaskName}",
    }),
  );
export type StorageTasksCreateInput = typeof StorageTasksCreateInput.Type;

// Output Schema
export const StorageTasksCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type StorageTasksCreateOutput = typeof StorageTasksCreateOutput.Type;

// The operation
/**
 * Asynchronously creates a new storage task resource with the specified parameters. If a storage task is already created and a subsequent create request is issued with different properties, the storage task properties will be updated. If a storage task is already created and a subsequent create or update request is issued with the exact same set of properties, the request will succeed.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageTaskName - The name of the storage task within the specified resource group. Storage task names must be between 3 and 18 characters in length and use numbers and lower-case letters only.
 */
export const StorageTasksCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: StorageTasksCreateInput,
  outputSchema: StorageTasksCreateOutput,
}));
// Input Schema
export const StorageTasksDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    storageTaskName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageActions/storageTasks/{storageTaskName}",
    }),
  );
export type StorageTasksDeleteInput = typeof StorageTasksDeleteInput.Type;

// Output Schema
export const StorageTasksDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type StorageTasksDeleteOutput = typeof StorageTasksDeleteOutput.Type;

// The operation
/**
 * Delete the storage task resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageTaskName - The name of the storage task within the specified resource group. Storage task names must be between 3 and 18 characters in length and use numbers and lower-case letters only.
 */
export const StorageTasksDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: StorageTasksDeleteInput,
  outputSchema: StorageTasksDeleteOutput,
}));
// Input Schema
export const StorageTasksGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  storageTaskName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageActions/storageTasks/{storageTaskName}",
  }),
);
export type StorageTasksGetInput = typeof StorageTasksGetInput.Type;

// Output Schema
export const StorageTasksGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type StorageTasksGetOutput = typeof StorageTasksGetOutput.Type;

// The operation
/**
 * Get the storage task properties
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageTaskName - The name of the storage task within the specified resource group. Storage task names must be between 3 and 18 characters in length and use numbers and lower-case letters only.
 */
export const StorageTasksGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: StorageTasksGetInput,
  outputSchema: StorageTasksGetOutput,
}));
// Input Schema
export const StorageTasksListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageActions/storageTasks",
    }),
  );
export type StorageTasksListByResourceGroupInput =
  typeof StorageTasksListByResourceGroupInput.Type;

// Output Schema
export const StorageTasksListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type StorageTasksListByResourceGroupOutput =
  typeof StorageTasksListByResourceGroupOutput.Type;

// The operation
/**
 * Lists all the storage tasks available under the given resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const StorageTasksListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: StorageTasksListByResourceGroupInput,
    outputSchema: StorageTasksListByResourceGroupOutput,
  }));
// Input Schema
export const StorageTasksListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.StorageActions/storageTasks",
    }),
  );
export type StorageTasksListBySubscriptionInput =
  typeof StorageTasksListBySubscriptionInput.Type;

// Output Schema
export const StorageTasksListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type StorageTasksListBySubscriptionOutput =
  typeof StorageTasksListBySubscriptionOutput.Type;

// The operation
/**
 * Lists all the storage tasks available under the subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const StorageTasksListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: StorageTasksListBySubscriptionInput,
    outputSchema: StorageTasksListBySubscriptionOutput,
  }));
// Input Schema
export const StorageTasksPreviewActionsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.StorageActions/locations/{location}/previewActions",
    }),
  );
export type StorageTasksPreviewActionsInput =
  typeof StorageTasksPreviewActionsInput.Type;

// Output Schema
export const StorageTasksPreviewActionsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    properties: Schema.Struct({
      container: Schema.Struct({
        name: Schema.optional(Schema.String),
        metadata: Schema.optional(
          Schema.Array(
            Schema.Struct({
              key: Schema.optional(Schema.String),
              value: Schema.optional(Schema.String),
            }),
          ),
        ),
      }),
      blobs: Schema.Array(
        Schema.Struct({
          name: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Array(
              Schema.Struct({
                key: Schema.optional(Schema.String),
                value: Schema.optional(Schema.String),
              }),
            ),
          ),
          metadata: Schema.optional(
            Schema.Array(
              Schema.Struct({
                key: Schema.optional(Schema.String),
                value: Schema.optional(Schema.String),
              }),
            ),
          ),
          tags: Schema.optional(
            Schema.Array(
              Schema.Struct({
                key: Schema.optional(Schema.String),
                value: Schema.optional(Schema.String),
              }),
            ),
          ),
          matchedBlock: Schema.optional(
            Schema.Literals(["If", "Else", "None"]),
          ),
        }),
      ),
      action: Schema.Struct({
        if: Schema.Struct({
          condition: Schema.optional(Schema.String),
        }),
        elseBlockExists: Schema.Boolean,
      }),
    }),
  });
export type StorageTasksPreviewActionsOutput =
  typeof StorageTasksPreviewActionsOutput.Type;

// The operation
/**
 * Runs the input conditions against input object metadata properties and designates matched objects in response.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param location - Represents an Azure geography region where supported resource providers live.
 */
export const StorageTasksPreviewActions = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: StorageTasksPreviewActionsInput,
    outputSchema: StorageTasksPreviewActionsOutput,
  }),
);
// Input Schema
export const StorageTasksReportListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    storageTaskName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $maxpagesize: Schema.optional(Schema.Number),
    $filter: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageActions/storageTasks/{storageTaskName}/reports",
    }),
  );
export type StorageTasksReportListInput =
  typeof StorageTasksReportListInput.Type;

// Output Schema
export const StorageTasksReportListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type StorageTasksReportListOutput =
  typeof StorageTasksReportListOutput.Type;

// The operation
/**
 * Fetch the storage tasks run report summary for each assignment.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageTaskName - The name of the storage task within the specified resource group. Storage task names must be between 3 and 18 characters in length and use numbers and lower-case letters only.
 * @param $maxpagesize - Optional, specifies the maximum number of Storage Task Assignment Resource IDs to be included in the list response.
 * @param $filter - Optional. When specified, it can be used to query using reporting properties.
 */
export const StorageTasksReportList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: StorageTasksReportListInput,
    outputSchema: StorageTasksReportListOutput,
  }),
);
// Input Schema
export const StorageTasksUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    storageTaskName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageActions/storageTasks/{storageTaskName}",
    }),
  );
export type StorageTasksUpdateInput = typeof StorageTasksUpdateInput.Type;

// Output Schema
export const StorageTasksUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type StorageTasksUpdateOutput = typeof StorageTasksUpdateOutput.Type;

// The operation
/**
 * Update storage task properties
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageTaskName - The name of the storage task within the specified resource group. Storage task names must be between 3 and 18 characters in length and use numbers and lower-case letters only.
 */
export const StorageTasksUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: StorageTasksUpdateInput,
  outputSchema: StorageTasksUpdateOutput,
}));
