/**
 * Azure Storagediscovery API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const ReportGenerateReportInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    storageDiscoveryWorkspaceName: Schema.String.pipe(T.PathParam()),
    discoveryResourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageDiscovery/storageDiscoveryWorkspaces/{storageDiscoveryWorkspaceName}/reports/{discoveryResourceName}/generateReport",
    }),
  );
export type ReportGenerateReportInput = typeof ReportGenerateReportInput.Type;

// Output Schema
export const ReportGenerateReportOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    results: Schema.Array(
      Schema.Struct({
        columns: Schema.optional(
          Schema.Array(
            Schema.Struct({
              name: Schema.String,
              type: Schema.String,
            }),
          ),
        ),
        rows: Schema.optional(Schema.Array(Schema.Array(Schema.String))),
        errorCode: Schema.optional(Schema.String),
      }),
    ),
  });
export type ReportGenerateReportOutput = typeof ReportGenerateReportOutput.Type;

// The operation
/**
 * A long-running resource action.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageDiscoveryWorkspaceName - The name of the StorageDiscoveryWorkspace
 * @param discoveryResourceName - The name of the ReportResource
 */
export const ReportGenerateReport = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ReportGenerateReportInput,
    outputSchema: ReportGenerateReportOutput,
  }),
);
// Input Schema
export const ReportGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  storageDiscoveryWorkspaceName: Schema.String.pipe(T.PathParam()),
  discoveryResourceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageDiscovery/storageDiscoveryWorkspaces/{storageDiscoveryWorkspaceName}/reports/{discoveryResourceName}",
  }),
);
export type ReportGetInput = typeof ReportGetInput.Type;

// Output Schema
export const ReportGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ReportGetOutput = typeof ReportGetOutput.Type;

// The operation
/**
 * Get a ReportResource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageDiscoveryWorkspaceName - The name of the StorageDiscoveryWorkspace
 * @param discoveryResourceName - The name of the ReportResource
 */
export const ReportGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ReportGetInput,
  outputSchema: ReportGetOutput,
}));
// Input Schema
export const ReportListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    storageDiscoveryWorkspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageDiscovery/storageDiscoveryWorkspaces/{storageDiscoveryWorkspaceName}/reports",
    }),
  );
export type ReportListByResourceGroupInput =
  typeof ReportListByResourceGroupInput.Type;

// Output Schema
export const ReportListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type ReportListByResourceGroupOutput =
  typeof ReportListByResourceGroupOutput.Type;

// The operation
/**
 * List ReportResource resources by StorageDiscoveryWorkspace
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageDiscoveryWorkspaceName - The name of the StorageDiscoveryWorkspace
 */
export const ReportListByResourceGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ReportListByResourceGroupInput,
    outputSchema: ReportListByResourceGroupOutput,
  }),
);
// Input Schema
export const ReportListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    storageDiscoveryWorkspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.StorageDiscovery/storageDiscoveryWorkspaces/{storageDiscoveryWorkspaceName}/reports",
    }),
  );
export type ReportListBySubscriptionInput =
  typeof ReportListBySubscriptionInput.Type;

// Output Schema
export const ReportListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type ReportListBySubscriptionOutput =
  typeof ReportListBySubscriptionOutput.Type;

// The operation
/**
 * List ReportResource resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param storageDiscoveryWorkspaceName - The name of the StorageDiscoveryWorkspace
 */
export const ReportListBySubscription = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ReportListBySubscriptionInput,
    outputSchema: ReportListBySubscriptionOutput,
  }),
);
// Input Schema
export const StorageDiscoveryWorkspacesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    storageDiscoveryWorkspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageDiscovery/storageDiscoveryWorkspaces/{storageDiscoveryWorkspaceName}",
    }),
  );
export type StorageDiscoveryWorkspacesCreateOrUpdateInput =
  typeof StorageDiscoveryWorkspacesCreateOrUpdateInput.Type;

// Output Schema
export const StorageDiscoveryWorkspacesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type StorageDiscoveryWorkspacesCreateOrUpdateOutput =
  typeof StorageDiscoveryWorkspacesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a StorageDiscoveryWorkspace
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageDiscoveryWorkspaceName - The name of the StorageDiscoveryWorkspace
 */
export const StorageDiscoveryWorkspacesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: StorageDiscoveryWorkspacesCreateOrUpdateInput,
    outputSchema: StorageDiscoveryWorkspacesCreateOrUpdateOutput,
  }));
// Input Schema
export const StorageDiscoveryWorkspacesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    storageDiscoveryWorkspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageDiscovery/storageDiscoveryWorkspaces/{storageDiscoveryWorkspaceName}",
    }),
  );
export type StorageDiscoveryWorkspacesDeleteInput =
  typeof StorageDiscoveryWorkspacesDeleteInput.Type;

// Output Schema
export const StorageDiscoveryWorkspacesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type StorageDiscoveryWorkspacesDeleteOutput =
  typeof StorageDiscoveryWorkspacesDeleteOutput.Type;

// The operation
/**
 * Delete a StorageDiscoveryWorkspace
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageDiscoveryWorkspaceName - The name of the StorageDiscoveryWorkspace
 */
export const StorageDiscoveryWorkspacesDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: StorageDiscoveryWorkspacesDeleteInput,
    outputSchema: StorageDiscoveryWorkspacesDeleteOutput,
  }));
// Input Schema
export const StorageDiscoveryWorkspacesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    storageDiscoveryWorkspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageDiscovery/storageDiscoveryWorkspaces/{storageDiscoveryWorkspaceName}",
    }),
  );
export type StorageDiscoveryWorkspacesGetInput =
  typeof StorageDiscoveryWorkspacesGetInput.Type;

// Output Schema
export const StorageDiscoveryWorkspacesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type StorageDiscoveryWorkspacesGetOutput =
  typeof StorageDiscoveryWorkspacesGetOutput.Type;

// The operation
/**
 * Get a StorageDiscoveryWorkspace
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageDiscoveryWorkspaceName - The name of the StorageDiscoveryWorkspace
 */
export const StorageDiscoveryWorkspacesGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: StorageDiscoveryWorkspacesGetInput,
    outputSchema: StorageDiscoveryWorkspacesGetOutput,
  }));
// Input Schema
export const StorageDiscoveryWorkspacesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageDiscovery/storageDiscoveryWorkspaces",
    }),
  );
export type StorageDiscoveryWorkspacesListByResourceGroupInput =
  typeof StorageDiscoveryWorkspacesListByResourceGroupInput.Type;

// Output Schema
export const StorageDiscoveryWorkspacesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type StorageDiscoveryWorkspacesListByResourceGroupOutput =
  typeof StorageDiscoveryWorkspacesListByResourceGroupOutput.Type;

// The operation
/**
 * List StorageDiscoveryWorkspace resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const StorageDiscoveryWorkspacesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: StorageDiscoveryWorkspacesListByResourceGroupInput,
    outputSchema: StorageDiscoveryWorkspacesListByResourceGroupOutput,
  }));
// Input Schema
export const StorageDiscoveryWorkspacesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.StorageDiscovery/storageDiscoveryWorkspaces",
    }),
  );
export type StorageDiscoveryWorkspacesListBySubscriptionInput =
  typeof StorageDiscoveryWorkspacesListBySubscriptionInput.Type;

// Output Schema
export const StorageDiscoveryWorkspacesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type StorageDiscoveryWorkspacesListBySubscriptionOutput =
  typeof StorageDiscoveryWorkspacesListBySubscriptionOutput.Type;

// The operation
/**
 * List StorageDiscoveryWorkspace resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const StorageDiscoveryWorkspacesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: StorageDiscoveryWorkspacesListBySubscriptionInput,
    outputSchema: StorageDiscoveryWorkspacesListBySubscriptionOutput,
  }));
// Input Schema
export const StorageDiscoveryWorkspacesReportInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    storageDiscoveryWorkspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageDiscovery/storageDiscoveryWorkspaces/{storageDiscoveryWorkspaceName}/report",
    }),
  );
export type StorageDiscoveryWorkspacesReportInput =
  typeof StorageDiscoveryWorkspacesReportInput.Type;

// Output Schema
export const StorageDiscoveryWorkspacesReportOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    results: Schema.Array(
      Schema.Struct({
        columns: Schema.optional(
          Schema.Array(
            Schema.Struct({
              name: Schema.String,
              type: Schema.String,
            }),
          ),
        ),
        rows: Schema.optional(Schema.Array(Schema.Array(Schema.String))),
        errorCode: Schema.optional(Schema.String),
      }),
    ),
  });
export type StorageDiscoveryWorkspacesReportOutput =
  typeof StorageDiscoveryWorkspacesReportOutput.Type;

// The operation
/**
 * A long-running resource action.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageDiscoveryWorkspaceName - The name of the StorageDiscoveryWorkspace
 */
export const StorageDiscoveryWorkspacesReport =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: StorageDiscoveryWorkspacesReportInput,
    outputSchema: StorageDiscoveryWorkspacesReportOutput,
  }));
// Input Schema
export const StorageDiscoveryWorkspacesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    storageDiscoveryWorkspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageDiscovery/storageDiscoveryWorkspaces/{storageDiscoveryWorkspaceName}",
    }),
  );
export type StorageDiscoveryWorkspacesUpdateInput =
  typeof StorageDiscoveryWorkspacesUpdateInput.Type;

// Output Schema
export const StorageDiscoveryWorkspacesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type StorageDiscoveryWorkspacesUpdateOutput =
  typeof StorageDiscoveryWorkspacesUpdateOutput.Type;

// The operation
/**
 * Update a StorageDiscoveryWorkspace
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageDiscoveryWorkspaceName - The name of the StorageDiscoveryWorkspace
 */
export const StorageDiscoveryWorkspacesUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: StorageDiscoveryWorkspacesUpdateInput,
    outputSchema: StorageDiscoveryWorkspacesUpdateOutput,
  }));
