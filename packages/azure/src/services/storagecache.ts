/**
 * Azure Storagecache API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";
import { SensitiveString } from "../sensitive.ts";

// Input Schema
export const AmlFilesystemsArchiveInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/amlFilesystems/{amlFilesystemName}/archive",
    }),
  );
export type AmlFilesystemsArchiveInput = typeof AmlFilesystemsArchiveInput.Type;

// Output Schema
export const AmlFilesystemsArchiveOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AmlFilesystemsArchiveOutput =
  typeof AmlFilesystemsArchiveOutput.Type;

// The operation
/**
 * Archive data from the AML file system.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const amlFilesystemsArchive = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AmlFilesystemsArchiveInput,
    outputSchema: AmlFilesystemsArchiveOutput,
  }),
);
// Input Schema
export const AmlFilesystemsCancelArchiveInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/amlFilesystems/{amlFilesystemName}/cancelArchive",
    }),
  );
export type AmlFilesystemsCancelArchiveInput =
  typeof AmlFilesystemsCancelArchiveInput.Type;

// Output Schema
export const AmlFilesystemsCancelArchiveOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AmlFilesystemsCancelArchiveOutput =
  typeof AmlFilesystemsCancelArchiveOutput.Type;

// The operation
/**
 * Cancel archiving data from the AML file system.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const amlFilesystemsCancelArchive = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AmlFilesystemsCancelArchiveInput,
    outputSchema: AmlFilesystemsCancelArchiveOutput,
  }),
);
// Input Schema
export const AmlFilesystemsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/amlFilesystems/{amlFilesystemName}",
    }),
  );
export type AmlFilesystemsCreateOrUpdateInput =
  typeof AmlFilesystemsCreateOrUpdateInput.Type;

// Output Schema
export const AmlFilesystemsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type AmlFilesystemsCreateOrUpdateOutput =
  typeof AmlFilesystemsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update an AML file system.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const amlFilesystemsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AmlFilesystemsCreateOrUpdateInput,
    outputSchema: AmlFilesystemsCreateOrUpdateOutput,
  }));
// Input Schema
export const AmlFilesystemsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/amlFilesystems/{amlFilesystemName}",
    }),
  );
export type AmlFilesystemsDeleteInput = typeof AmlFilesystemsDeleteInput.Type;

// Output Schema
export const AmlFilesystemsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AmlFilesystemsDeleteOutput = typeof AmlFilesystemsDeleteOutput.Type;

// The operation
/**
 * Schedules an AML file system for deletion.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const amlFilesystemsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AmlFilesystemsDeleteInput,
    outputSchema: AmlFilesystemsDeleteOutput,
  }),
);
// Input Schema
export const AmlFilesystemsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/amlFilesystems/{amlFilesystemName}",
  }),
);
export type AmlFilesystemsGetInput = typeof AmlFilesystemsGetInput.Type;

// Output Schema
export const AmlFilesystemsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type AmlFilesystemsGetOutput = typeof AmlFilesystemsGetOutput.Type;

// The operation
/**
 * Returns an AML file system.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const amlFilesystemsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AmlFilesystemsGetInput,
  outputSchema: AmlFilesystemsGetOutput,
}));
// Input Schema
export const AmlFilesystemsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.StorageCache/amlFilesystems",
    }),
  );
export type AmlFilesystemsListInput = typeof AmlFilesystemsListInput.Type;

// Output Schema
export const AmlFilesystemsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
  });
export type AmlFilesystemsListOutput = typeof AmlFilesystemsListOutput.Type;

// The operation
/**
 * Returns all AML file systems the user has access to under a subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const amlFilesystemsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AmlFilesystemsListInput,
  outputSchema: AmlFilesystemsListOutput,
}));
// Input Schema
export const AmlFilesystemsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/amlFilesystems",
    }),
  );
export type AmlFilesystemsListByResourceGroupInput =
  typeof AmlFilesystemsListByResourceGroupInput.Type;

// Output Schema
export const AmlFilesystemsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
  });
export type AmlFilesystemsListByResourceGroupOutput =
  typeof AmlFilesystemsListByResourceGroupOutput.Type;

// The operation
/**
 * Returns all AML file systems the user has access to under a resource group.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const amlFilesystemsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AmlFilesystemsListByResourceGroupInput,
    outputSchema: AmlFilesystemsListByResourceGroupOutput,
  }));
// Input Schema
export const AmlFilesystemsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/amlFilesystems/{amlFilesystemName}",
    }),
  );
export type AmlFilesystemsUpdateInput = typeof AmlFilesystemsUpdateInput.Type;

// Output Schema
export const AmlFilesystemsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type AmlFilesystemsUpdateOutput = typeof AmlFilesystemsUpdateOutput.Type;

// The operation
/**
 * Update an AML file system instance.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const amlFilesystemsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AmlFilesystemsUpdateInput,
    outputSchema: AmlFilesystemsUpdateOutput,
  }),
);
// Input Schema
export const AscOperationsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  location: Schema.String.pipe(T.PathParam()),
  operationId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.StorageCache/locations/{location}/ascOperations/{operationId}",
  }),
);
export type AscOperationsGetInput = typeof AscOperationsGetInput.Type;

// Output Schema
export const AscOperationsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    startTime: Schema.optional(Schema.String),
    endTime: Schema.optional(Schema.String),
    status: Schema.optional(Schema.String),
    error: Schema.optional(
      Schema.Struct({
        code: Schema.optional(Schema.String),
        message: Schema.optional(Schema.String),
      }),
    ),
    properties: Schema.optional(
      Schema.Struct({
        output: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      }),
    ),
  },
);
export type AscOperationsGetOutput = typeof AscOperationsGetOutput.Type;

// The operation
/**
 * Gets the status of an asynchronous operation for the Azure HPC Cache
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param location - The name of Azure region.
 * @param operationId - The ID of an ongoing async operation.
 */
export const AscOperationsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AscOperationsGetInput,
  outputSchema: AscOperationsGetOutput,
}));
// Input Schema
export const AscUsagesListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  location: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.StorageCache/locations/{location}/usages",
  }),
);
export type AscUsagesListInput = typeof AscUsagesListInput.Type;

// Output Schema
export const AscUsagesListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  nextLink: Schema.optional(Schema.String),
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        limit: Schema.optional(Schema.Number),
        unit: Schema.optional(Schema.String),
        currentValue: Schema.optional(Schema.Number),
        name: Schema.optional(
          Schema.Struct({
            value: Schema.optional(Schema.String),
            localizedValue: Schema.optional(Schema.String),
          }),
        ),
      }),
    ),
  ),
});
export type AscUsagesListOutput = typeof AscUsagesListOutput.Type;

// The operation
/**
 * Gets the quantity used and quota limit for resources
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param location - The name of the region to query for usage information.
 */
export const AscUsagesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AscUsagesListInput,
  outputSchema: AscUsagesListOutput,
}));
// Input Schema
export const AutoExportJobsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/amlFilesystems/{amlFilesystemName}/autoExportJobs/{autoExportJobName}",
    }),
  );
export type AutoExportJobsCreateOrUpdateInput =
  typeof AutoExportJobsCreateOrUpdateInput.Type;

// Output Schema
export const AutoExportJobsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type AutoExportJobsCreateOrUpdateOutput =
  typeof AutoExportJobsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update an auto export job.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const autoExportJobsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AutoExportJobsCreateOrUpdateInput,
    outputSchema: AutoExportJobsCreateOrUpdateOutput,
  }));
// Input Schema
export const AutoExportJobsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/amlFilesystems/{amlFilesystemName}/autoExportJobs/{autoExportJobName}",
    }),
  );
export type AutoExportJobsDeleteInput = typeof AutoExportJobsDeleteInput.Type;

// Output Schema
export const AutoExportJobsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AutoExportJobsDeleteOutput = typeof AutoExportJobsDeleteOutput.Type;

// The operation
/**
 * Schedules an auto export job for deletion.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const autoExportJobsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AutoExportJobsDeleteInput,
    outputSchema: AutoExportJobsDeleteOutput,
  }),
);
// Input Schema
export const AutoExportJobsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/amlFilesystems/{amlFilesystemName}/autoExportJobs/{autoExportJobName}",
  }),
);
export type AutoExportJobsGetInput = typeof AutoExportJobsGetInput.Type;

// Output Schema
export const AutoExportJobsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type AutoExportJobsGetOutput = typeof AutoExportJobsGetOutput.Type;

// The operation
/**
 * Returns an auto export job.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const autoExportJobsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AutoExportJobsGetInput,
  outputSchema: AutoExportJobsGetOutput,
}));
// Input Schema
export const AutoExportJobsListByAmlFilesystemInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/amlFilesystems/{amlFilesystemName}/autoExportJobs",
    }),
  );
export type AutoExportJobsListByAmlFilesystemInput =
  typeof AutoExportJobsListByAmlFilesystemInput.Type;

// Output Schema
export const AutoExportJobsListByAmlFilesystemOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
  });
export type AutoExportJobsListByAmlFilesystemOutput =
  typeof AutoExportJobsListByAmlFilesystemOutput.Type;

// The operation
/**
 * Returns all the auto export jobs the user has access to under an AML File System.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const autoExportJobsListByAmlFilesystem =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AutoExportJobsListByAmlFilesystemInput,
    outputSchema: AutoExportJobsListByAmlFilesystemOutput,
  }));
// Input Schema
export const AutoExportJobsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/amlFilesystems/{amlFilesystemName}/autoExportJobs/{autoExportJobName}",
    }),
  );
export type AutoExportJobsUpdateInput = typeof AutoExportJobsUpdateInput.Type;

// Output Schema
export const AutoExportJobsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type AutoExportJobsUpdateOutput = typeof AutoExportJobsUpdateOutput.Type;

// The operation
/**
 * Update an auto export job instance.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const autoExportJobsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AutoExportJobsUpdateInput,
    outputSchema: AutoExportJobsUpdateOutput,
  }),
);
// Input Schema
export const AutoImportJobsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/amlFilesystems/{amlFilesystemName}/autoImportJobs/{autoImportJobName}",
    }),
  );
export type AutoImportJobsCreateOrUpdateInput =
  typeof AutoImportJobsCreateOrUpdateInput.Type;

// Output Schema
export const AutoImportJobsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type AutoImportJobsCreateOrUpdateOutput =
  typeof AutoImportJobsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update an auto import job.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const autoImportJobsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AutoImportJobsCreateOrUpdateInput,
    outputSchema: AutoImportJobsCreateOrUpdateOutput,
  }));
// Input Schema
export const AutoImportJobsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/amlFilesystems/{amlFilesystemName}/autoImportJobs/{autoImportJobName}",
    }),
  );
export type AutoImportJobsDeleteInput = typeof AutoImportJobsDeleteInput.Type;

// Output Schema
export const AutoImportJobsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AutoImportJobsDeleteOutput = typeof AutoImportJobsDeleteOutput.Type;

// The operation
/**
 * Schedules an auto import job for deletion.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const autoImportJobsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AutoImportJobsDeleteInput,
    outputSchema: AutoImportJobsDeleteOutput,
  }),
);
// Input Schema
export const AutoImportJobsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/amlFilesystems/{amlFilesystemName}/autoImportJobs/{autoImportJobName}",
  }),
);
export type AutoImportJobsGetInput = typeof AutoImportJobsGetInput.Type;

// Output Schema
export const AutoImportJobsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type AutoImportJobsGetOutput = typeof AutoImportJobsGetOutput.Type;

// The operation
/**
 * Returns an auto import job.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const autoImportJobsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AutoImportJobsGetInput,
  outputSchema: AutoImportJobsGetOutput,
}));
// Input Schema
export const AutoImportJobsListByAmlFilesystemInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/amlFilesystems/{amlFilesystemName}/autoImportJobs",
    }),
  );
export type AutoImportJobsListByAmlFilesystemInput =
  typeof AutoImportJobsListByAmlFilesystemInput.Type;

// Output Schema
export const AutoImportJobsListByAmlFilesystemOutput =
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
export type AutoImportJobsListByAmlFilesystemOutput =
  typeof AutoImportJobsListByAmlFilesystemOutput.Type;

// The operation
/**
 * Returns all the auto import jobs the user has access to under an AML File System.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const autoImportJobsListByAmlFilesystem =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AutoImportJobsListByAmlFilesystemInput,
    outputSchema: AutoImportJobsListByAmlFilesystemOutput,
  }));
// Input Schema
export const AutoImportJobsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/amlFilesystems/{amlFilesystemName}/autoImportJobs/{autoImportJobName}",
    }),
  );
export type AutoImportJobsUpdateInput = typeof AutoImportJobsUpdateInput.Type;

// Output Schema
export const AutoImportJobsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type AutoImportJobsUpdateOutput = typeof AutoImportJobsUpdateOutput.Type;

// The operation
/**
 * Update an auto import job instance.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const autoImportJobsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AutoImportJobsUpdateInput,
    outputSchema: AutoImportJobsUpdateOutput,
  }),
);
// Input Schema
export const CachesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.StorageCache/caches/{cacheName}",
    }),
  );
export type CachesCreateOrUpdateInput = typeof CachesCreateOrUpdateInput.Type;

// Output Schema
export const CachesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    id: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    identity: Schema.optional(
      Schema.Struct({
        principalId: Schema.optional(Schema.String),
        tenantId: Schema.optional(Schema.String),
        type: Schema.optional(
          Schema.Literals([
            "SystemAssigned",
            "UserAssigned",
            "SystemAssigned, UserAssigned",
            "None",
          ]),
        ),
        userAssignedIdentities: Schema.optional(
          Schema.Record(
            Schema.String,
            Schema.Struct({
              principalId: Schema.optional(Schema.String),
              clientId: Schema.optional(Schema.String),
            }),
          ),
        ),
      }),
    ),
    systemData: Schema.optional(
      Schema.Struct({
        createdBy: Schema.optional(Schema.String),
        createdByType: Schema.optional(
          Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
        ),
        createdAt: Schema.optional(Schema.String),
        lastModifiedBy: Schema.optional(Schema.String),
        lastModifiedByType: Schema.optional(
          Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
        ),
        lastModifiedAt: Schema.optional(Schema.String),
      }),
    ),
    properties: Schema.optional(
      Schema.Struct({
        cacheSizeGB: Schema.optional(Schema.Number),
        health: Schema.optional(
          Schema.Struct({
            state: Schema.optional(
              Schema.Literals([
                "Unknown",
                "Healthy",
                "Degraded",
                "Down",
                "Transitioning",
                "Stopping",
                "Stopped",
                "Upgrading",
                "Flushing",
                "WaitingForKey",
                "StartFailed",
                "UpgradeFailed",
              ]),
            ),
            statusDescription: Schema.optional(Schema.String),
            conditions: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  timestamp: Schema.optional(Schema.String),
                  message: Schema.optional(Schema.String),
                }),
              ),
            ),
          }),
        ),
        mountAddresses: Schema.optional(Schema.Array(Schema.String)),
        provisioningState: Schema.optional(
          Schema.Literals([
            "Succeeded",
            "Failed",
            "Canceled",
            "Creating",
            "Deleting",
            "Updating",
          ]),
        ),
        subnet: Schema.optional(Schema.String),
        upgradeStatus: Schema.optional(
          Schema.Struct({
            currentFirmwareVersion: Schema.optional(Schema.String),
            firmwareUpdateStatus: Schema.optional(
              Schema.Literals(["available", "unavailable"]),
            ),
            firmwareUpdateDeadline: Schema.optional(Schema.String),
            lastFirmwareUpdate: Schema.optional(Schema.String),
            pendingFirmwareVersion: Schema.optional(Schema.String),
          }),
        ),
        upgradeSettings: Schema.optional(
          Schema.Struct({
            upgradeScheduleEnabled: Schema.optional(Schema.Boolean),
            scheduledTime: Schema.optional(Schema.String),
          }),
        ),
        networkSettings: Schema.optional(
          Schema.Struct({
            mtu: Schema.optional(Schema.Number),
            utilityAddresses: Schema.optional(Schema.Array(Schema.String)),
            dnsServers: Schema.optional(Schema.Array(Schema.String)),
            dnsSearchDomain: Schema.optional(Schema.String),
            ntpServer: Schema.optional(Schema.String),
          }),
        ),
        encryptionSettings: Schema.optional(
          Schema.Struct({
            keyEncryptionKey: Schema.optional(
              Schema.Struct({
                keyUrl: Schema.String,
                sourceVault: Schema.Struct({
                  id: Schema.optional(Schema.String),
                }),
              }),
            ),
            rotationToLatestKeyVersionEnabled: Schema.optional(Schema.Boolean),
          }),
        ),
        securitySettings: Schema.optional(
          Schema.Struct({
            accessPolicies: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  name: Schema.String,
                  accessRules: Schema.Array(
                    Schema.Struct({
                      scope: Schema.Literals(["default", "network", "host"]),
                      filter: Schema.optional(Schema.String),
                      access: Schema.Literals(["no", "ro", "rw"]),
                      suid: Schema.optional(Schema.Boolean),
                      submountAccess: Schema.optional(Schema.Boolean),
                      rootSquash: Schema.optional(Schema.Boolean),
                      anonymousUID: Schema.optional(Schema.String),
                      anonymousGID: Schema.optional(Schema.String),
                    }),
                  ),
                }),
              ),
            ),
          }),
        ),
        directoryServicesSettings: Schema.optional(
          Schema.Struct({
            activeDirectory: Schema.optional(
              Schema.Struct({
                primaryDnsIpAddress: Schema.String,
                secondaryDnsIpAddress: Schema.optional(Schema.String),
                domainName: Schema.String,
                domainNetBiosName: Schema.String,
                cacheNetBiosName: Schema.String,
                domainJoined: Schema.optional(
                  Schema.Literals(["Yes", "No", "Error"]),
                ),
                credentials: Schema.optional(
                  Schema.Struct({
                    username: Schema.String,
                    password: Schema.optional(SensitiveString),
                  }),
                ),
              }),
            ),
            usernameDownload: Schema.optional(
              Schema.Struct({
                extendedGroups: Schema.optional(Schema.Boolean),
                usernameSource: Schema.optional(
                  Schema.Literals(["AD", "LDAP", "File", "None"]),
                ),
                groupFileURI: Schema.optional(Schema.String),
                userFileURI: Schema.optional(Schema.String),
                ldapServer: Schema.optional(Schema.String),
                ldapBaseDN: Schema.optional(Schema.String),
                encryptLdapConnection: Schema.optional(Schema.Boolean),
                requireValidCertificate: Schema.optional(Schema.Boolean),
                autoDownloadCertificate: Schema.optional(Schema.Boolean),
                caCertificateURI: Schema.optional(Schema.String),
                usernameDownloaded: Schema.optional(
                  Schema.Literals(["Yes", "No", "Error"]),
                ),
                credentials: Schema.optional(
                  Schema.Struct({
                    bindDn: Schema.optional(Schema.String),
                    bindPassword: Schema.optional(SensitiveString),
                  }),
                ),
              }),
            ),
          }),
        ),
        zones: Schema.optional(Schema.Array(Schema.String)),
        primingJobs: Schema.optional(
          Schema.Array(
            Schema.Struct({
              primingJobName: Schema.String,
              primingManifestUrl: Schema.String,
              primingJobId: Schema.optional(Schema.String),
              primingJobState: Schema.optional(
                Schema.Literals(["Queued", "Running", "Paused", "Complete"]),
              ),
              primingJobStatus: Schema.optional(Schema.String),
              primingJobDetails: Schema.optional(Schema.String),
              primingJobPercentComplete: Schema.optional(Schema.Number),
            }),
          ),
        ),
        spaceAllocation: Schema.optional(
          Schema.Array(
            Schema.Struct({
              name: Schema.optional(Schema.String),
              allocationPercentage: Schema.optional(Schema.Number),
            }),
          ),
        ),
      }),
    ),
    sku: Schema.optional(
      Schema.Struct({
        name: Schema.optional(Schema.String),
      }),
    ),
  });
export type CachesCreateOrUpdateOutput = typeof CachesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a cache.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const CachesCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CachesCreateOrUpdateInput,
    outputSchema: CachesCreateOrUpdateOutput,
  }),
);
// Input Schema
export const CachesDebugInfoInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.StorageCache/caches/{cacheName}/debugInfo",
  }),
);
export type CachesDebugInfoInput = typeof CachesDebugInfoInput.Type;

// Output Schema
export const CachesDebugInfoOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CachesDebugInfoOutput = typeof CachesDebugInfoOutput.Type;

// The operation
/**
 * Tells a cache to write generate debug info for support to process.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const CachesDebugInfo = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CachesDebugInfoInput,
  outputSchema: CachesDebugInfoOutput,
}));
// Input Schema
export const CachesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.StorageCache/caches/{cacheName}",
  }),
);
export type CachesDeleteInput = typeof CachesDeleteInput.Type;

// Output Schema
export const CachesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CachesDeleteOutput = typeof CachesDeleteOutput.Type;

// The operation
/**
 * Schedules a cache for deletion.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const CachesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CachesDeleteInput,
  outputSchema: CachesDeleteOutput,
}));
// Input Schema
export const CachesFlushInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.StorageCache/caches/{cacheName}/flush",
  }),
);
export type CachesFlushInput = typeof CachesFlushInput.Type;

// Output Schema
export const CachesFlushOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CachesFlushOutput = typeof CachesFlushOutput.Type;

// The operation
/**
 * Tells a cache to write all dirty data to the Storage Target(s). During the flush, clients will see errors returned until the flush is complete.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const CachesFlush = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CachesFlushInput,
  outputSchema: CachesFlushOutput,
}));
// Input Schema
export const CachesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.StorageCache/caches/{cacheName}",
  }),
);
export type CachesGetInput = typeof CachesGetInput.Type;

// Output Schema
export const CachesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  id: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  identity: Schema.optional(
    Schema.Struct({
      principalId: Schema.optional(Schema.String),
      tenantId: Schema.optional(Schema.String),
      type: Schema.optional(
        Schema.Literals([
          "SystemAssigned",
          "UserAssigned",
          "SystemAssigned, UserAssigned",
          "None",
        ]),
      ),
      userAssignedIdentities: Schema.optional(
        Schema.Record(
          Schema.String,
          Schema.Struct({
            principalId: Schema.optional(Schema.String),
            clientId: Schema.optional(Schema.String),
          }),
        ),
      ),
    }),
  ),
  systemData: Schema.optional(
    Schema.Struct({
      createdBy: Schema.optional(Schema.String),
      createdByType: Schema.optional(
        Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
      ),
      createdAt: Schema.optional(Schema.String),
      lastModifiedBy: Schema.optional(Schema.String),
      lastModifiedByType: Schema.optional(
        Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
      ),
      lastModifiedAt: Schema.optional(Schema.String),
    }),
  ),
  properties: Schema.optional(
    Schema.Struct({
      cacheSizeGB: Schema.optional(Schema.Number),
      health: Schema.optional(
        Schema.Struct({
          state: Schema.optional(
            Schema.Literals([
              "Unknown",
              "Healthy",
              "Degraded",
              "Down",
              "Transitioning",
              "Stopping",
              "Stopped",
              "Upgrading",
              "Flushing",
              "WaitingForKey",
              "StartFailed",
              "UpgradeFailed",
            ]),
          ),
          statusDescription: Schema.optional(Schema.String),
          conditions: Schema.optional(
            Schema.Array(
              Schema.Struct({
                timestamp: Schema.optional(Schema.String),
                message: Schema.optional(Schema.String),
              }),
            ),
          ),
        }),
      ),
      mountAddresses: Schema.optional(Schema.Array(Schema.String)),
      provisioningState: Schema.optional(
        Schema.Literals([
          "Succeeded",
          "Failed",
          "Canceled",
          "Creating",
          "Deleting",
          "Updating",
        ]),
      ),
      subnet: Schema.optional(Schema.String),
      upgradeStatus: Schema.optional(
        Schema.Struct({
          currentFirmwareVersion: Schema.optional(Schema.String),
          firmwareUpdateStatus: Schema.optional(
            Schema.Literals(["available", "unavailable"]),
          ),
          firmwareUpdateDeadline: Schema.optional(Schema.String),
          lastFirmwareUpdate: Schema.optional(Schema.String),
          pendingFirmwareVersion: Schema.optional(Schema.String),
        }),
      ),
      upgradeSettings: Schema.optional(
        Schema.Struct({
          upgradeScheduleEnabled: Schema.optional(Schema.Boolean),
          scheduledTime: Schema.optional(Schema.String),
        }),
      ),
      networkSettings: Schema.optional(
        Schema.Struct({
          mtu: Schema.optional(Schema.Number),
          utilityAddresses: Schema.optional(Schema.Array(Schema.String)),
          dnsServers: Schema.optional(Schema.Array(Schema.String)),
          dnsSearchDomain: Schema.optional(Schema.String),
          ntpServer: Schema.optional(Schema.String),
        }),
      ),
      encryptionSettings: Schema.optional(
        Schema.Struct({
          keyEncryptionKey: Schema.optional(
            Schema.Struct({
              keyUrl: Schema.String,
              sourceVault: Schema.Struct({
                id: Schema.optional(Schema.String),
              }),
            }),
          ),
          rotationToLatestKeyVersionEnabled: Schema.optional(Schema.Boolean),
        }),
      ),
      securitySettings: Schema.optional(
        Schema.Struct({
          accessPolicies: Schema.optional(
            Schema.Array(
              Schema.Struct({
                name: Schema.String,
                accessRules: Schema.Array(
                  Schema.Struct({
                    scope: Schema.Literals(["default", "network", "host"]),
                    filter: Schema.optional(Schema.String),
                    access: Schema.Literals(["no", "ro", "rw"]),
                    suid: Schema.optional(Schema.Boolean),
                    submountAccess: Schema.optional(Schema.Boolean),
                    rootSquash: Schema.optional(Schema.Boolean),
                    anonymousUID: Schema.optional(Schema.String),
                    anonymousGID: Schema.optional(Schema.String),
                  }),
                ),
              }),
            ),
          ),
        }),
      ),
      directoryServicesSettings: Schema.optional(
        Schema.Struct({
          activeDirectory: Schema.optional(
            Schema.Struct({
              primaryDnsIpAddress: Schema.String,
              secondaryDnsIpAddress: Schema.optional(Schema.String),
              domainName: Schema.String,
              domainNetBiosName: Schema.String,
              cacheNetBiosName: Schema.String,
              domainJoined: Schema.optional(
                Schema.Literals(["Yes", "No", "Error"]),
              ),
              credentials: Schema.optional(
                Schema.Struct({
                  username: Schema.String,
                  password: Schema.optional(SensitiveString),
                }),
              ),
            }),
          ),
          usernameDownload: Schema.optional(
            Schema.Struct({
              extendedGroups: Schema.optional(Schema.Boolean),
              usernameSource: Schema.optional(
                Schema.Literals(["AD", "LDAP", "File", "None"]),
              ),
              groupFileURI: Schema.optional(Schema.String),
              userFileURI: Schema.optional(Schema.String),
              ldapServer: Schema.optional(Schema.String),
              ldapBaseDN: Schema.optional(Schema.String),
              encryptLdapConnection: Schema.optional(Schema.Boolean),
              requireValidCertificate: Schema.optional(Schema.Boolean),
              autoDownloadCertificate: Schema.optional(Schema.Boolean),
              caCertificateURI: Schema.optional(Schema.String),
              usernameDownloaded: Schema.optional(
                Schema.Literals(["Yes", "No", "Error"]),
              ),
              credentials: Schema.optional(
                Schema.Struct({
                  bindDn: Schema.optional(Schema.String),
                  bindPassword: Schema.optional(SensitiveString),
                }),
              ),
            }),
          ),
        }),
      ),
      zones: Schema.optional(Schema.Array(Schema.String)),
      primingJobs: Schema.optional(
        Schema.Array(
          Schema.Struct({
            primingJobName: Schema.String,
            primingManifestUrl: Schema.String,
            primingJobId: Schema.optional(Schema.String),
            primingJobState: Schema.optional(
              Schema.Literals(["Queued", "Running", "Paused", "Complete"]),
            ),
            primingJobStatus: Schema.optional(Schema.String),
            primingJobDetails: Schema.optional(Schema.String),
            primingJobPercentComplete: Schema.optional(Schema.Number),
          }),
        ),
      ),
      spaceAllocation: Schema.optional(
        Schema.Array(
          Schema.Struct({
            name: Schema.optional(Schema.String),
            allocationPercentage: Schema.optional(Schema.Number),
          }),
        ),
      ),
    }),
  ),
  sku: Schema.optional(
    Schema.Struct({
      name: Schema.optional(Schema.String),
    }),
  ),
});
export type CachesGetOutput = typeof CachesGetOutput.Type;

// The operation
/**
 * Returns a cache.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const CachesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CachesGetInput,
  outputSchema: CachesGetOutput,
}));
// Input Schema
export const CachesListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.StorageCache/caches",
  }),
);
export type CachesListInput = typeof CachesListInput.Type;

// Output Schema
export const CachesListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  nextLink: Schema.optional(Schema.String),
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        id: Schema.optional(Schema.String),
        location: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        type: Schema.optional(Schema.String),
        identity: Schema.optional(
          Schema.Struct({
            principalId: Schema.optional(Schema.String),
            tenantId: Schema.optional(Schema.String),
            type: Schema.optional(
              Schema.Literals([
                "SystemAssigned",
                "UserAssigned",
                "SystemAssigned, UserAssigned",
                "None",
              ]),
            ),
            userAssignedIdentities: Schema.optional(
              Schema.Record(
                Schema.String,
                Schema.Struct({
                  principalId: Schema.optional(Schema.String),
                  clientId: Schema.optional(Schema.String),
                }),
              ),
            ),
          }),
        ),
        systemData: Schema.optional(
          Schema.Struct({
            createdBy: Schema.optional(Schema.String),
            createdByType: Schema.optional(
              Schema.Literals([
                "User",
                "Application",
                "ManagedIdentity",
                "Key",
              ]),
            ),
            createdAt: Schema.optional(Schema.String),
            lastModifiedBy: Schema.optional(Schema.String),
            lastModifiedByType: Schema.optional(
              Schema.Literals([
                "User",
                "Application",
                "ManagedIdentity",
                "Key",
              ]),
            ),
            lastModifiedAt: Schema.optional(Schema.String),
          }),
        ),
        properties: Schema.optional(
          Schema.Struct({
            cacheSizeGB: Schema.optional(Schema.Number),
            health: Schema.optional(
              Schema.Struct({
                state: Schema.optional(
                  Schema.Literals([
                    "Unknown",
                    "Healthy",
                    "Degraded",
                    "Down",
                    "Transitioning",
                    "Stopping",
                    "Stopped",
                    "Upgrading",
                    "Flushing",
                    "WaitingForKey",
                    "StartFailed",
                    "UpgradeFailed",
                  ]),
                ),
                statusDescription: Schema.optional(Schema.String),
                conditions: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      timestamp: Schema.optional(Schema.String),
                      message: Schema.optional(Schema.String),
                    }),
                  ),
                ),
              }),
            ),
            mountAddresses: Schema.optional(Schema.Array(Schema.String)),
            provisioningState: Schema.optional(
              Schema.Literals([
                "Succeeded",
                "Failed",
                "Canceled",
                "Creating",
                "Deleting",
                "Updating",
              ]),
            ),
            subnet: Schema.optional(Schema.String),
            upgradeStatus: Schema.optional(
              Schema.Struct({
                currentFirmwareVersion: Schema.optional(Schema.String),
                firmwareUpdateStatus: Schema.optional(
                  Schema.Literals(["available", "unavailable"]),
                ),
                firmwareUpdateDeadline: Schema.optional(Schema.String),
                lastFirmwareUpdate: Schema.optional(Schema.String),
                pendingFirmwareVersion: Schema.optional(Schema.String),
              }),
            ),
            upgradeSettings: Schema.optional(
              Schema.Struct({
                upgradeScheduleEnabled: Schema.optional(Schema.Boolean),
                scheduledTime: Schema.optional(Schema.String),
              }),
            ),
            networkSettings: Schema.optional(
              Schema.Struct({
                mtu: Schema.optional(Schema.Number),
                utilityAddresses: Schema.optional(Schema.Array(Schema.String)),
                dnsServers: Schema.optional(Schema.Array(Schema.String)),
                dnsSearchDomain: Schema.optional(Schema.String),
                ntpServer: Schema.optional(Schema.String),
              }),
            ),
            encryptionSettings: Schema.optional(
              Schema.Struct({
                keyEncryptionKey: Schema.optional(
                  Schema.Struct({
                    keyUrl: Schema.String,
                    sourceVault: Schema.Struct({
                      id: Schema.optional(Schema.String),
                    }),
                  }),
                ),
                rotationToLatestKeyVersionEnabled: Schema.optional(
                  Schema.Boolean,
                ),
              }),
            ),
            securitySettings: Schema.optional(
              Schema.Struct({
                accessPolicies: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      name: Schema.String,
                      accessRules: Schema.Array(
                        Schema.Struct({
                          scope: Schema.Literals([
                            "default",
                            "network",
                            "host",
                          ]),
                          filter: Schema.optional(Schema.String),
                          access: Schema.Literals(["no", "ro", "rw"]),
                          suid: Schema.optional(Schema.Boolean),
                          submountAccess: Schema.optional(Schema.Boolean),
                          rootSquash: Schema.optional(Schema.Boolean),
                          anonymousUID: Schema.optional(Schema.String),
                          anonymousGID: Schema.optional(Schema.String),
                        }),
                      ),
                    }),
                  ),
                ),
              }),
            ),
            directoryServicesSettings: Schema.optional(
              Schema.Struct({
                activeDirectory: Schema.optional(
                  Schema.Struct({
                    primaryDnsIpAddress: Schema.String,
                    secondaryDnsIpAddress: Schema.optional(Schema.String),
                    domainName: Schema.String,
                    domainNetBiosName: Schema.String,
                    cacheNetBiosName: Schema.String,
                    domainJoined: Schema.optional(
                      Schema.Literals(["Yes", "No", "Error"]),
                    ),
                    credentials: Schema.optional(
                      Schema.Struct({
                        username: Schema.String,
                        password: Schema.optional(SensitiveString),
                      }),
                    ),
                  }),
                ),
                usernameDownload: Schema.optional(
                  Schema.Struct({
                    extendedGroups: Schema.optional(Schema.Boolean),
                    usernameSource: Schema.optional(
                      Schema.Literals(["AD", "LDAP", "File", "None"]),
                    ),
                    groupFileURI: Schema.optional(Schema.String),
                    userFileURI: Schema.optional(Schema.String),
                    ldapServer: Schema.optional(Schema.String),
                    ldapBaseDN: Schema.optional(Schema.String),
                    encryptLdapConnection: Schema.optional(Schema.Boolean),
                    requireValidCertificate: Schema.optional(Schema.Boolean),
                    autoDownloadCertificate: Schema.optional(Schema.Boolean),
                    caCertificateURI: Schema.optional(Schema.String),
                    usernameDownloaded: Schema.optional(
                      Schema.Literals(["Yes", "No", "Error"]),
                    ),
                    credentials: Schema.optional(
                      Schema.Struct({
                        bindDn: Schema.optional(Schema.String),
                        bindPassword: Schema.optional(SensitiveString),
                      }),
                    ),
                  }),
                ),
              }),
            ),
            zones: Schema.optional(Schema.Array(Schema.String)),
            primingJobs: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  primingJobName: Schema.String,
                  primingManifestUrl: Schema.String,
                  primingJobId: Schema.optional(Schema.String),
                  primingJobState: Schema.optional(
                    Schema.Literals([
                      "Queued",
                      "Running",
                      "Paused",
                      "Complete",
                    ]),
                  ),
                  primingJobStatus: Schema.optional(Schema.String),
                  primingJobDetails: Schema.optional(Schema.String),
                  primingJobPercentComplete: Schema.optional(Schema.Number),
                }),
              ),
            ),
            spaceAllocation: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  name: Schema.optional(Schema.String),
                  allocationPercentage: Schema.optional(Schema.Number),
                }),
              ),
            ),
          }),
        ),
        sku: Schema.optional(
          Schema.Struct({
            name: Schema.optional(Schema.String),
          }),
        ),
      }),
    ),
  ),
});
export type CachesListOutput = typeof CachesListOutput.Type;

// The operation
/**
 * Returns all caches the user has access to under a subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const CachesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CachesListInput,
  outputSchema: CachesListOutput,
}));
// Input Schema
export const CachesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.StorageCache/caches",
    }),
  );
export type CachesListByResourceGroupInput =
  typeof CachesListByResourceGroupInput.Type;

// Output Schema
export const CachesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          id: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          identity: Schema.optional(
            Schema.Struct({
              principalId: Schema.optional(Schema.String),
              tenantId: Schema.optional(Schema.String),
              type: Schema.optional(
                Schema.Literals([
                  "SystemAssigned",
                  "UserAssigned",
                  "SystemAssigned, UserAssigned",
                  "None",
                ]),
              ),
              userAssignedIdentities: Schema.optional(
                Schema.Record(
                  Schema.String,
                  Schema.Struct({
                    principalId: Schema.optional(Schema.String),
                    clientId: Schema.optional(Schema.String),
                  }),
                ),
              ),
            }),
          ),
          systemData: Schema.optional(
            Schema.Struct({
              createdBy: Schema.optional(Schema.String),
              createdByType: Schema.optional(
                Schema.Literals([
                  "User",
                  "Application",
                  "ManagedIdentity",
                  "Key",
                ]),
              ),
              createdAt: Schema.optional(Schema.String),
              lastModifiedBy: Schema.optional(Schema.String),
              lastModifiedByType: Schema.optional(
                Schema.Literals([
                  "User",
                  "Application",
                  "ManagedIdentity",
                  "Key",
                ]),
              ),
              lastModifiedAt: Schema.optional(Schema.String),
            }),
          ),
          properties: Schema.optional(
            Schema.Struct({
              cacheSizeGB: Schema.optional(Schema.Number),
              health: Schema.optional(
                Schema.Struct({
                  state: Schema.optional(
                    Schema.Literals([
                      "Unknown",
                      "Healthy",
                      "Degraded",
                      "Down",
                      "Transitioning",
                      "Stopping",
                      "Stopped",
                      "Upgrading",
                      "Flushing",
                      "WaitingForKey",
                      "StartFailed",
                      "UpgradeFailed",
                    ]),
                  ),
                  statusDescription: Schema.optional(Schema.String),
                  conditions: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        timestamp: Schema.optional(Schema.String),
                        message: Schema.optional(Schema.String),
                      }),
                    ),
                  ),
                }),
              ),
              mountAddresses: Schema.optional(Schema.Array(Schema.String)),
              provisioningState: Schema.optional(
                Schema.Literals([
                  "Succeeded",
                  "Failed",
                  "Canceled",
                  "Creating",
                  "Deleting",
                  "Updating",
                ]),
              ),
              subnet: Schema.optional(Schema.String),
              upgradeStatus: Schema.optional(
                Schema.Struct({
                  currentFirmwareVersion: Schema.optional(Schema.String),
                  firmwareUpdateStatus: Schema.optional(
                    Schema.Literals(["available", "unavailable"]),
                  ),
                  firmwareUpdateDeadline: Schema.optional(Schema.String),
                  lastFirmwareUpdate: Schema.optional(Schema.String),
                  pendingFirmwareVersion: Schema.optional(Schema.String),
                }),
              ),
              upgradeSettings: Schema.optional(
                Schema.Struct({
                  upgradeScheduleEnabled: Schema.optional(Schema.Boolean),
                  scheduledTime: Schema.optional(Schema.String),
                }),
              ),
              networkSettings: Schema.optional(
                Schema.Struct({
                  mtu: Schema.optional(Schema.Number),
                  utilityAddresses: Schema.optional(
                    Schema.Array(Schema.String),
                  ),
                  dnsServers: Schema.optional(Schema.Array(Schema.String)),
                  dnsSearchDomain: Schema.optional(Schema.String),
                  ntpServer: Schema.optional(Schema.String),
                }),
              ),
              encryptionSettings: Schema.optional(
                Schema.Struct({
                  keyEncryptionKey: Schema.optional(
                    Schema.Struct({
                      keyUrl: Schema.String,
                      sourceVault: Schema.Struct({
                        id: Schema.optional(Schema.String),
                      }),
                    }),
                  ),
                  rotationToLatestKeyVersionEnabled: Schema.optional(
                    Schema.Boolean,
                  ),
                }),
              ),
              securitySettings: Schema.optional(
                Schema.Struct({
                  accessPolicies: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        name: Schema.String,
                        accessRules: Schema.Array(
                          Schema.Struct({
                            scope: Schema.Literals([
                              "default",
                              "network",
                              "host",
                            ]),
                            filter: Schema.optional(Schema.String),
                            access: Schema.Literals(["no", "ro", "rw"]),
                            suid: Schema.optional(Schema.Boolean),
                            submountAccess: Schema.optional(Schema.Boolean),
                            rootSquash: Schema.optional(Schema.Boolean),
                            anonymousUID: Schema.optional(Schema.String),
                            anonymousGID: Schema.optional(Schema.String),
                          }),
                        ),
                      }),
                    ),
                  ),
                }),
              ),
              directoryServicesSettings: Schema.optional(
                Schema.Struct({
                  activeDirectory: Schema.optional(
                    Schema.Struct({
                      primaryDnsIpAddress: Schema.String,
                      secondaryDnsIpAddress: Schema.optional(Schema.String),
                      domainName: Schema.String,
                      domainNetBiosName: Schema.String,
                      cacheNetBiosName: Schema.String,
                      domainJoined: Schema.optional(
                        Schema.Literals(["Yes", "No", "Error"]),
                      ),
                      credentials: Schema.optional(
                        Schema.Struct({
                          username: Schema.String,
                          password: Schema.optional(SensitiveString),
                        }),
                      ),
                    }),
                  ),
                  usernameDownload: Schema.optional(
                    Schema.Struct({
                      extendedGroups: Schema.optional(Schema.Boolean),
                      usernameSource: Schema.optional(
                        Schema.Literals(["AD", "LDAP", "File", "None"]),
                      ),
                      groupFileURI: Schema.optional(Schema.String),
                      userFileURI: Schema.optional(Schema.String),
                      ldapServer: Schema.optional(Schema.String),
                      ldapBaseDN: Schema.optional(Schema.String),
                      encryptLdapConnection: Schema.optional(Schema.Boolean),
                      requireValidCertificate: Schema.optional(Schema.Boolean),
                      autoDownloadCertificate: Schema.optional(Schema.Boolean),
                      caCertificateURI: Schema.optional(Schema.String),
                      usernameDownloaded: Schema.optional(
                        Schema.Literals(["Yes", "No", "Error"]),
                      ),
                      credentials: Schema.optional(
                        Schema.Struct({
                          bindDn: Schema.optional(Schema.String),
                          bindPassword: Schema.optional(SensitiveString),
                        }),
                      ),
                    }),
                  ),
                }),
              ),
              zones: Schema.optional(Schema.Array(Schema.String)),
              primingJobs: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    primingJobName: Schema.String,
                    primingManifestUrl: Schema.String,
                    primingJobId: Schema.optional(Schema.String),
                    primingJobState: Schema.optional(
                      Schema.Literals([
                        "Queued",
                        "Running",
                        "Paused",
                        "Complete",
                      ]),
                    ),
                    primingJobStatus: Schema.optional(Schema.String),
                    primingJobDetails: Schema.optional(Schema.String),
                    primingJobPercentComplete: Schema.optional(Schema.Number),
                  }),
                ),
              ),
              spaceAllocation: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    allocationPercentage: Schema.optional(Schema.Number),
                  }),
                ),
              ),
            }),
          ),
          sku: Schema.optional(
            Schema.Struct({
              name: Schema.optional(Schema.String),
            }),
          ),
        }),
      ),
    ),
  });
export type CachesListByResourceGroupOutput =
  typeof CachesListByResourceGroupOutput.Type;

// The operation
/**
 * Returns all caches the user has access to under a resource group.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const CachesListByResourceGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CachesListByResourceGroupInput,
    outputSchema: CachesListByResourceGroupOutput,
  }),
);
// Input Schema
export const CachesPausePrimingJobInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.StorageCache/caches/{cacheName}/pausePrimingJob",
    }),
  );
export type CachesPausePrimingJobInput = typeof CachesPausePrimingJobInput.Type;

// Output Schema
export const CachesPausePrimingJobOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CachesPausePrimingJobOutput =
  typeof CachesPausePrimingJobOutput.Type;

// The operation
/**
 * Schedule a priming job to be paused.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const CachesPausePrimingJob = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CachesPausePrimingJobInput,
    outputSchema: CachesPausePrimingJobOutput,
  }),
);
// Input Schema
export const CachesResumePrimingJobInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.StorageCache/caches/{cacheName}/resumePrimingJob",
    }),
  );
export type CachesResumePrimingJobInput =
  typeof CachesResumePrimingJobInput.Type;

// Output Schema
export const CachesResumePrimingJobOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CachesResumePrimingJobOutput =
  typeof CachesResumePrimingJobOutput.Type;

// The operation
/**
 * Resumes a paused priming job.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const CachesResumePrimingJob = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CachesResumePrimingJobInput,
    outputSchema: CachesResumePrimingJobOutput,
  }),
);
// Input Schema
export const CachesSpaceAllocationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.StorageCache/caches/{cacheName}/spaceAllocation",
    }),
  );
export type CachesSpaceAllocationInput = typeof CachesSpaceAllocationInput.Type;

// Output Schema
export const CachesSpaceAllocationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CachesSpaceAllocationOutput =
  typeof CachesSpaceAllocationOutput.Type;

// The operation
/**
 * Update cache space allocation.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const CachesSpaceAllocation = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CachesSpaceAllocationInput,
    outputSchema: CachesSpaceAllocationOutput,
  }),
);
// Input Schema
export const CachesStartInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.StorageCache/caches/{cacheName}/start",
  }),
);
export type CachesStartInput = typeof CachesStartInput.Type;

// Output Schema
export const CachesStartOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CachesStartOutput = typeof CachesStartOutput.Type;

// The operation
/**
 * Tells a Stopped state cache to transition to Active state.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const CachesStart = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CachesStartInput,
  outputSchema: CachesStartOutput,
}));
// Input Schema
export const CachesStartPrimingJobInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.StorageCache/caches/{cacheName}/startPrimingJob",
    }),
  );
export type CachesStartPrimingJobInput = typeof CachesStartPrimingJobInput.Type;

// Output Schema
export const CachesStartPrimingJobOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CachesStartPrimingJobOutput =
  typeof CachesStartPrimingJobOutput.Type;

// The operation
/**
 * Create a priming job. This operation is only allowed when the cache is healthy.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const CachesStartPrimingJob = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CachesStartPrimingJobInput,
    outputSchema: CachesStartPrimingJobOutput,
  }),
);
// Input Schema
export const CachesStopInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.StorageCache/caches/{cacheName}/stop",
  }),
);
export type CachesStopInput = typeof CachesStopInput.Type;

// Output Schema
export const CachesStopOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CachesStopOutput = typeof CachesStopOutput.Type;

// The operation
/**
 * Tells an Active cache to transition to Stopped state.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const CachesStop = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CachesStopInput,
  outputSchema: CachesStopOutput,
}));
// Input Schema
export const CachesStopPrimingJobInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.StorageCache/caches/{cacheName}/stopPrimingJob",
    }),
  );
export type CachesStopPrimingJobInput = typeof CachesStopPrimingJobInput.Type;

// Output Schema
export const CachesStopPrimingJobOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CachesStopPrimingJobOutput = typeof CachesStopPrimingJobOutput.Type;

// The operation
/**
 * Schedule a priming job for deletion.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const CachesStopPrimingJob = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CachesStopPrimingJobInput,
    outputSchema: CachesStopPrimingJobOutput,
  }),
);
// Input Schema
export const CachesUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.StorageCache/caches/{cacheName}",
  }),
);
export type CachesUpdateInput = typeof CachesUpdateInput.Type;

// Output Schema
export const CachesUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  id: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  identity: Schema.optional(
    Schema.Struct({
      principalId: Schema.optional(Schema.String),
      tenantId: Schema.optional(Schema.String),
      type: Schema.optional(
        Schema.Literals([
          "SystemAssigned",
          "UserAssigned",
          "SystemAssigned, UserAssigned",
          "None",
        ]),
      ),
      userAssignedIdentities: Schema.optional(
        Schema.Record(
          Schema.String,
          Schema.Struct({
            principalId: Schema.optional(Schema.String),
            clientId: Schema.optional(Schema.String),
          }),
        ),
      ),
    }),
  ),
  systemData: Schema.optional(
    Schema.Struct({
      createdBy: Schema.optional(Schema.String),
      createdByType: Schema.optional(
        Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
      ),
      createdAt: Schema.optional(Schema.String),
      lastModifiedBy: Schema.optional(Schema.String),
      lastModifiedByType: Schema.optional(
        Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
      ),
      lastModifiedAt: Schema.optional(Schema.String),
    }),
  ),
  properties: Schema.optional(
    Schema.Struct({
      cacheSizeGB: Schema.optional(Schema.Number),
      health: Schema.optional(
        Schema.Struct({
          state: Schema.optional(
            Schema.Literals([
              "Unknown",
              "Healthy",
              "Degraded",
              "Down",
              "Transitioning",
              "Stopping",
              "Stopped",
              "Upgrading",
              "Flushing",
              "WaitingForKey",
              "StartFailed",
              "UpgradeFailed",
            ]),
          ),
          statusDescription: Schema.optional(Schema.String),
          conditions: Schema.optional(
            Schema.Array(
              Schema.Struct({
                timestamp: Schema.optional(Schema.String),
                message: Schema.optional(Schema.String),
              }),
            ),
          ),
        }),
      ),
      mountAddresses: Schema.optional(Schema.Array(Schema.String)),
      provisioningState: Schema.optional(
        Schema.Literals([
          "Succeeded",
          "Failed",
          "Canceled",
          "Creating",
          "Deleting",
          "Updating",
        ]),
      ),
      subnet: Schema.optional(Schema.String),
      upgradeStatus: Schema.optional(
        Schema.Struct({
          currentFirmwareVersion: Schema.optional(Schema.String),
          firmwareUpdateStatus: Schema.optional(
            Schema.Literals(["available", "unavailable"]),
          ),
          firmwareUpdateDeadline: Schema.optional(Schema.String),
          lastFirmwareUpdate: Schema.optional(Schema.String),
          pendingFirmwareVersion: Schema.optional(Schema.String),
        }),
      ),
      upgradeSettings: Schema.optional(
        Schema.Struct({
          upgradeScheduleEnabled: Schema.optional(Schema.Boolean),
          scheduledTime: Schema.optional(Schema.String),
        }),
      ),
      networkSettings: Schema.optional(
        Schema.Struct({
          mtu: Schema.optional(Schema.Number),
          utilityAddresses: Schema.optional(Schema.Array(Schema.String)),
          dnsServers: Schema.optional(Schema.Array(Schema.String)),
          dnsSearchDomain: Schema.optional(Schema.String),
          ntpServer: Schema.optional(Schema.String),
        }),
      ),
      encryptionSettings: Schema.optional(
        Schema.Struct({
          keyEncryptionKey: Schema.optional(
            Schema.Struct({
              keyUrl: Schema.String,
              sourceVault: Schema.Struct({
                id: Schema.optional(Schema.String),
              }),
            }),
          ),
          rotationToLatestKeyVersionEnabled: Schema.optional(Schema.Boolean),
        }),
      ),
      securitySettings: Schema.optional(
        Schema.Struct({
          accessPolicies: Schema.optional(
            Schema.Array(
              Schema.Struct({
                name: Schema.String,
                accessRules: Schema.Array(
                  Schema.Struct({
                    scope: Schema.Literals(["default", "network", "host"]),
                    filter: Schema.optional(Schema.String),
                    access: Schema.Literals(["no", "ro", "rw"]),
                    suid: Schema.optional(Schema.Boolean),
                    submountAccess: Schema.optional(Schema.Boolean),
                    rootSquash: Schema.optional(Schema.Boolean),
                    anonymousUID: Schema.optional(Schema.String),
                    anonymousGID: Schema.optional(Schema.String),
                  }),
                ),
              }),
            ),
          ),
        }),
      ),
      directoryServicesSettings: Schema.optional(
        Schema.Struct({
          activeDirectory: Schema.optional(
            Schema.Struct({
              primaryDnsIpAddress: Schema.String,
              secondaryDnsIpAddress: Schema.optional(Schema.String),
              domainName: Schema.String,
              domainNetBiosName: Schema.String,
              cacheNetBiosName: Schema.String,
              domainJoined: Schema.optional(
                Schema.Literals(["Yes", "No", "Error"]),
              ),
              credentials: Schema.optional(
                Schema.Struct({
                  username: Schema.String,
                  password: Schema.optional(SensitiveString),
                }),
              ),
            }),
          ),
          usernameDownload: Schema.optional(
            Schema.Struct({
              extendedGroups: Schema.optional(Schema.Boolean),
              usernameSource: Schema.optional(
                Schema.Literals(["AD", "LDAP", "File", "None"]),
              ),
              groupFileURI: Schema.optional(Schema.String),
              userFileURI: Schema.optional(Schema.String),
              ldapServer: Schema.optional(Schema.String),
              ldapBaseDN: Schema.optional(Schema.String),
              encryptLdapConnection: Schema.optional(Schema.Boolean),
              requireValidCertificate: Schema.optional(Schema.Boolean),
              autoDownloadCertificate: Schema.optional(Schema.Boolean),
              caCertificateURI: Schema.optional(Schema.String),
              usernameDownloaded: Schema.optional(
                Schema.Literals(["Yes", "No", "Error"]),
              ),
              credentials: Schema.optional(
                Schema.Struct({
                  bindDn: Schema.optional(Schema.String),
                  bindPassword: Schema.optional(SensitiveString),
                }),
              ),
            }),
          ),
        }),
      ),
      zones: Schema.optional(Schema.Array(Schema.String)),
      primingJobs: Schema.optional(
        Schema.Array(
          Schema.Struct({
            primingJobName: Schema.String,
            primingManifestUrl: Schema.String,
            primingJobId: Schema.optional(Schema.String),
            primingJobState: Schema.optional(
              Schema.Literals(["Queued", "Running", "Paused", "Complete"]),
            ),
            primingJobStatus: Schema.optional(Schema.String),
            primingJobDetails: Schema.optional(Schema.String),
            primingJobPercentComplete: Schema.optional(Schema.Number),
          }),
        ),
      ),
      spaceAllocation: Schema.optional(
        Schema.Array(
          Schema.Struct({
            name: Schema.optional(Schema.String),
            allocationPercentage: Schema.optional(Schema.Number),
          }),
        ),
      ),
    }),
  ),
  sku: Schema.optional(
    Schema.Struct({
      name: Schema.optional(Schema.String),
    }),
  ),
});
export type CachesUpdateOutput = typeof CachesUpdateOutput.Type;

// The operation
/**
 * Update a cache instance.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const CachesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CachesUpdateInput,
  outputSchema: CachesUpdateOutput,
}));
// Input Schema
export const CachesUpgradeFirmwareInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.StorageCache/caches/{cacheName}/upgrade",
    }),
  );
export type CachesUpgradeFirmwareInput = typeof CachesUpgradeFirmwareInput.Type;

// Output Schema
export const CachesUpgradeFirmwareOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CachesUpgradeFirmwareOutput =
  typeof CachesUpgradeFirmwareOutput.Type;

// The operation
/**
 * Upgrade a cache's firmware if a new version is available. Otherwise, this operation has no effect.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const CachesUpgradeFirmware = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CachesUpgradeFirmwareInput,
    outputSchema: CachesUpgradeFirmwareOutput,
  }),
);
// Input Schema
export const CheckAmlFSSubnetsInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.StorageCache/checkAmlFSSubnets",
  }),
);
export type CheckAmlFSSubnetsInput = typeof CheckAmlFSSubnetsInput.Type;

// Output Schema
export const CheckAmlFSSubnetsOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CheckAmlFSSubnetsOutput = typeof CheckAmlFSSubnetsOutput.Type;

// The operation
/**
 * Check that subnets will be valid for AML file system create calls.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const checkAmlFSSubnets = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CheckAmlFSSubnetsInput,
  outputSchema: CheckAmlFSSubnetsOutput,
}));
// Input Schema
export const ExpansionJobsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/amlFilesystems/{amlFilesystemName}/expansionJobs/{expansionJobName}",
    }),
  );
export type ExpansionJobsCreateOrUpdateInput =
  typeof ExpansionJobsCreateOrUpdateInput.Type;

// Output Schema
export const ExpansionJobsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ExpansionJobsCreateOrUpdateOutput =
  typeof ExpansionJobsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update an expansion job.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const expansionJobsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ExpansionJobsCreateOrUpdateInput,
    outputSchema: ExpansionJobsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const ExpansionJobsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/amlFilesystems/{amlFilesystemName}/expansionJobs/{expansionJobName}",
    }),
  );
export type ExpansionJobsDeleteInput = typeof ExpansionJobsDeleteInput.Type;

// Output Schema
export const ExpansionJobsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ExpansionJobsDeleteOutput = typeof ExpansionJobsDeleteOutput.Type;

// The operation
/**
 * Schedules an expansion job for deletion.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const expansionJobsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ExpansionJobsDeleteInput,
  outputSchema: ExpansionJobsDeleteOutput,
}));
// Input Schema
export const ExpansionJobsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/amlFilesystems/{amlFilesystemName}/expansionJobs/{expansionJobName}",
  }),
);
export type ExpansionJobsGetInput = typeof ExpansionJobsGetInput.Type;

// Output Schema
export const ExpansionJobsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  },
);
export type ExpansionJobsGetOutput = typeof ExpansionJobsGetOutput.Type;

// The operation
/**
 * Returns an expansion job.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const expansionJobsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ExpansionJobsGetInput,
  outputSchema: ExpansionJobsGetOutput,
}));
// Input Schema
export const ExpansionJobsListByAmlFilesystemInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/amlFilesystems/{amlFilesystemName}/expansionJobs",
    }),
  );
export type ExpansionJobsListByAmlFilesystemInput =
  typeof ExpansionJobsListByAmlFilesystemInput.Type;

// Output Schema
export const ExpansionJobsListByAmlFilesystemOutput =
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
export type ExpansionJobsListByAmlFilesystemOutput =
  typeof ExpansionJobsListByAmlFilesystemOutput.Type;

// The operation
/**
 * Returns all the expansion jobs the user has access to under an AML File System.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const expansionJobsListByAmlFilesystem =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ExpansionJobsListByAmlFilesystemInput,
    outputSchema: ExpansionJobsListByAmlFilesystemOutput,
  }));
// Input Schema
export const ExpansionJobsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/amlFilesystems/{amlFilesystemName}/expansionJobs/{expansionJobName}",
    }),
  );
export type ExpansionJobsUpdateInput = typeof ExpansionJobsUpdateInput.Type;

// Output Schema
export const ExpansionJobsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ExpansionJobsUpdateOutput = typeof ExpansionJobsUpdateOutput.Type;

// The operation
/**
 * Update an expansion job instance.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const expansionJobsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ExpansionJobsUpdateInput,
  outputSchema: ExpansionJobsUpdateOutput,
}));
// Input Schema
export const GetRequiredAmlFSSubnetsSizeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.StorageCache/getRequiredAmlFSSubnetsSize",
    }),
  );
export type GetRequiredAmlFSSubnetsSizeInput =
  typeof GetRequiredAmlFSSubnetsSizeInput.Type;

// Output Schema
export const GetRequiredAmlFSSubnetsSizeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    filesystemSubnetSize: Schema.optional(Schema.Number),
  });
export type GetRequiredAmlFSSubnetsSizeOutput =
  typeof GetRequiredAmlFSSubnetsSizeOutput.Type;

// The operation
/**
 * Get the number of available IP addresses needed for the AML file system information provided.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const getRequiredAmlFSSubnetsSize = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetRequiredAmlFSSubnetsSizeInput,
    outputSchema: GetRequiredAmlFSSubnetsSizeOutput,
  }),
);
// Input Schema
export const ImportJobsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/amlFilesystems/{amlFilesystemName}/importJobs/{importJobName}",
    }),
  );
export type ImportJobsCreateOrUpdateInput =
  typeof ImportJobsCreateOrUpdateInput.Type;

// Output Schema
export const ImportJobsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ImportJobsCreateOrUpdateOutput =
  typeof ImportJobsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update an import job.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const importJobsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ImportJobsCreateOrUpdateInput,
    outputSchema: ImportJobsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const ImportJobsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/amlFilesystems/{amlFilesystemName}/importJobs/{importJobName}",
  }),
);
export type ImportJobsDeleteInput = typeof ImportJobsDeleteInput.Type;

// Output Schema
export const ImportJobsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ImportJobsDeleteOutput = typeof ImportJobsDeleteOutput.Type;

// The operation
/**
 * Schedules an import job for deletion.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const importJobsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ImportJobsDeleteInput,
  outputSchema: ImportJobsDeleteOutput,
}));
// Input Schema
export const ImportJobsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/amlFilesystems/{amlFilesystemName}/importJobs/{importJobName}",
  }),
);
export type ImportJobsGetInput = typeof ImportJobsGetInput.Type;

// Output Schema
export const ImportJobsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type ImportJobsGetOutput = typeof ImportJobsGetOutput.Type;

// The operation
/**
 * Returns an import job.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const importJobsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ImportJobsGetInput,
  outputSchema: ImportJobsGetOutput,
}));
// Input Schema
export const ImportJobsListByAmlFilesystemInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/amlFilesystems/{amlFilesystemName}/importJobs",
    }),
  );
export type ImportJobsListByAmlFilesystemInput =
  typeof ImportJobsListByAmlFilesystemInput.Type;

// Output Schema
export const ImportJobsListByAmlFilesystemOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
  });
export type ImportJobsListByAmlFilesystemOutput =
  typeof ImportJobsListByAmlFilesystemOutput.Type;

// The operation
/**
 * Returns all import jobs the user has access to under an AML File System.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const importJobsListByAmlFilesystem =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ImportJobsListByAmlFilesystemInput,
    outputSchema: ImportJobsListByAmlFilesystemOutput,
  }));
// Input Schema
export const ImportJobsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/amlFilesystems/{amlFilesystemName}/importJobs/{importJobName}",
  }),
);
export type ImportJobsUpdateInput = typeof ImportJobsUpdateInput.Type;

// Output Schema
export const ImportJobsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  },
);
export type ImportJobsUpdateOutput = typeof ImportJobsUpdateOutput.Type;

// The operation
/**
 * Update an import job instance.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const importJobsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ImportJobsUpdateInput,
  outputSchema: ImportJobsUpdateOutput,
}));
// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.StorageCache/operations",
  }),
);
export type OperationsListInput = typeof OperationsListInput.Type;

// Output Schema
export const OperationsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  nextLink: Schema.optional(Schema.String),
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        display: Schema.optional(
          Schema.Struct({
            operation: Schema.optional(Schema.String),
            provider: Schema.optional(Schema.String),
            resource: Schema.optional(Schema.String),
            description: Schema.optional(Schema.String),
          }),
        ),
        origin: Schema.optional(Schema.String),
        isDataAction: Schema.optional(Schema.Boolean),
        name: Schema.optional(Schema.String),
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
                      supportedAggregationTypes: Schema.optional(
                        Schema.Array(
                          Schema.Literals([
                            "NotSpecified",
                            "None",
                            "Average",
                            "Minimum",
                            "Maximum",
                            "Total",
                            "Count",
                          ]),
                        ),
                      ),
                      metricClass: Schema.optional(Schema.String),
                      dimensions: Schema.optional(
                        Schema.Array(
                          Schema.Struct({
                            name: Schema.optional(Schema.String),
                            displayName: Schema.optional(Schema.String),
                            internalName: Schema.optional(Schema.String),
                            toBeExportedForShoebox: Schema.optional(
                              Schema.Boolean,
                            ),
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
});
export type OperationsListOutput = typeof OperationsListOutput.Type;

// The operation
/**
 * Lists all of the available Resource Provider operations.
 *
 * @param api-version - The API version to use for this operation.
 */
export const OperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationsListInput,
  outputSchema: OperationsListOutput,
}));
// Input Schema
export const SkusListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.StorageCache/skus",
  }),
);
export type SkusListInput = typeof SkusListInput.Type;

// Output Schema
export const SkusListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  nextLink: Schema.optional(Schema.String),
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        resourceType: Schema.optional(Schema.String),
        capabilities: Schema.optional(
          Schema.Array(
            Schema.Struct({
              name: Schema.optional(Schema.String),
              value: Schema.optional(Schema.String),
            }),
          ),
        ),
        locations: Schema.optional(Schema.Array(Schema.String)),
        locationInfo: Schema.optional(
          Schema.Array(
            Schema.Struct({
              location: Schema.optional(Schema.String),
              zones: Schema.optional(Schema.Array(Schema.String)),
            }),
          ),
        ),
        name: Schema.optional(Schema.String),
        restrictions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              type: Schema.optional(Schema.String),
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
});
export type SkusListOutput = typeof SkusListOutput.Type;

// The operation
/**
 * Get the list of StorageCache.Cache SKUs available to this subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const SkusList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SkusListInput,
  outputSchema: SkusListOutput,
}));
// Input Schema
export const StorageTargetFlushInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.StorageCache/caches/{cacheName}/storageTargets/{storageTargetName}/flush",
    }),
  );
export type StorageTargetFlushInput = typeof StorageTargetFlushInput.Type;

// Output Schema
export const StorageTargetFlushOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type StorageTargetFlushOutput = typeof StorageTargetFlushOutput.Type;

// The operation
/**
 * Tells the cache to write all dirty data to the Storage Target's backend storage. Client requests to this storage target's namespace will return errors until the flush operation completes.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const StorageTargetFlush = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: StorageTargetFlushInput,
  outputSchema: StorageTargetFlushOutput,
}));
// Input Schema
export const StorageTargetInvalidateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.StorageCache/caches/{cacheName}/storageTargets/{storageTargetName}/invalidate",
    }),
  );
export type StorageTargetInvalidateInput =
  typeof StorageTargetInvalidateInput.Type;

// Output Schema
export const StorageTargetInvalidateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type StorageTargetInvalidateOutput =
  typeof StorageTargetInvalidateOutput.Type;

// The operation
/**
 * Invalidate all cached data for a storage target. Cached files are discarded and fetched from the back end on the next request.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const StorageTargetInvalidate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: StorageTargetInvalidateInput,
    outputSchema: StorageTargetInvalidateOutput,
  }),
);
// Input Schema
export const StorageTargetResumeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.StorageCache/caches/{cacheName}/storageTargets/{storageTargetName}/resume",
    }),
  );
export type StorageTargetResumeInput = typeof StorageTargetResumeInput.Type;

// Output Schema
export const StorageTargetResumeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type StorageTargetResumeOutput = typeof StorageTargetResumeOutput.Type;

// The operation
/**
 * Resumes client access to a previously suspended storage target.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const StorageTargetResume = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: StorageTargetResumeInput,
  outputSchema: StorageTargetResumeOutput,
}));
// Input Schema
export const StorageTargetsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.StorageCache/caches/{cacheName}/storageTargets/{storageTargetName}",
    }),
  );
export type StorageTargetsCreateOrUpdateInput =
  typeof StorageTargetsCreateOrUpdateInput.Type;

// Output Schema
export const StorageTargetsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.optional(Schema.String),
    id: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    systemData: Schema.optional(
      Schema.Struct({
        createdBy: Schema.optional(Schema.String),
        createdByType: Schema.optional(
          Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
        ),
        createdAt: Schema.optional(Schema.String),
        lastModifiedBy: Schema.optional(Schema.String),
        lastModifiedByType: Schema.optional(
          Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
        ),
        lastModifiedAt: Schema.optional(Schema.String),
      }),
    ),
  });
export type StorageTargetsCreateOrUpdateOutput =
  typeof StorageTargetsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a Storage Target. This operation is allowed at any time, but if the cache is down or unhealthy, the actual creation/modification of the Storage Target may be delayed until the cache is healthy again.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const StorageTargetsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: StorageTargetsCreateOrUpdateInput,
    outputSchema: StorageTargetsCreateOrUpdateOutput,
  }));
// Input Schema
export const StorageTargetsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    force: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.StorageCache/caches/{cacheName}/storageTargets/{storageTargetName}",
    }),
  );
export type StorageTargetsDeleteInput = typeof StorageTargetsDeleteInput.Type;

// Output Schema
export const StorageTargetsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type StorageTargetsDeleteOutput = typeof StorageTargetsDeleteOutput.Type;

// The operation
/**
 * Removes a Storage Target from a cache. This operation is allowed at any time, but if the cache is down or unhealthy, the actual removal of the Storage Target may be delayed until the cache is healthy again. Note that if the cache has data to flush to the Storage Target, the data will be flushed before the Storage Target will be deleted.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param force - Boolean value requesting the force delete operation for a storage target. Force delete discards unwritten-data in the cache instead of flushing it to back-end storage.
 */
export const StorageTargetsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: StorageTargetsDeleteInput,
    outputSchema: StorageTargetsDeleteOutput,
  }),
);
// Input Schema
export const StorageTargetsDnsRefreshInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.StorageCache/caches/{cacheName}/storageTargets/{storageTargetName}/dnsRefresh",
    }),
  );
export type StorageTargetsDnsRefreshInput =
  typeof StorageTargetsDnsRefreshInput.Type;

// Output Schema
export const StorageTargetsDnsRefreshOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type StorageTargetsDnsRefreshOutput =
  typeof StorageTargetsDnsRefreshOutput.Type;

// The operation
/**
 * Tells a storage target to refresh its DNS information.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const StorageTargetsDnsRefresh = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: StorageTargetsDnsRefreshInput,
    outputSchema: StorageTargetsDnsRefreshOutput,
  }),
);
// Input Schema
export const StorageTargetsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.StorageCache/caches/{cacheName}/storageTargets/{storageTargetName}",
  }),
);
export type StorageTargetsGetInput = typeof StorageTargetsGetInput.Type;

// Output Schema
export const StorageTargetsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.optional(Schema.String),
    id: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    systemData: Schema.optional(
      Schema.Struct({
        createdBy: Schema.optional(Schema.String),
        createdByType: Schema.optional(
          Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
        ),
        createdAt: Schema.optional(Schema.String),
        lastModifiedBy: Schema.optional(Schema.String),
        lastModifiedByType: Schema.optional(
          Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
        ),
        lastModifiedAt: Schema.optional(Schema.String),
      }),
    ),
  });
export type StorageTargetsGetOutput = typeof StorageTargetsGetOutput.Type;

// The operation
/**
 * Returns a Storage Target from a cache.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const StorageTargetsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: StorageTargetsGetInput,
  outputSchema: StorageTargetsGetOutput,
}));
// Input Schema
export const StorageTargetsListByCacheInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.StorageCache/caches/{cacheName}/storageTargets",
    }),
  );
export type StorageTargetsListByCacheInput =
  typeof StorageTargetsListByCacheInput.Type;

// Output Schema
export const StorageTargetsListByCacheOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          name: Schema.optional(Schema.String),
          id: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
          systemData: Schema.optional(
            Schema.Struct({
              createdBy: Schema.optional(Schema.String),
              createdByType: Schema.optional(
                Schema.Literals([
                  "User",
                  "Application",
                  "ManagedIdentity",
                  "Key",
                ]),
              ),
              createdAt: Schema.optional(Schema.String),
              lastModifiedBy: Schema.optional(Schema.String),
              lastModifiedByType: Schema.optional(
                Schema.Literals([
                  "User",
                  "Application",
                  "ManagedIdentity",
                  "Key",
                ]),
              ),
              lastModifiedAt: Schema.optional(Schema.String),
            }),
          ),
        }),
      ),
    ),
  });
export type StorageTargetsListByCacheOutput =
  typeof StorageTargetsListByCacheOutput.Type;

// The operation
/**
 * Returns a list of Storage Targets for the specified cache.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const StorageTargetsListByCache = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: StorageTargetsListByCacheInput,
    outputSchema: StorageTargetsListByCacheOutput,
  }),
);
// Input Schema
export const StorageTargetsRestoreDefaultsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/caches/{cacheName}/storageTargets/{storageTargetName}/restoreDefaults",
    }),
  );
export type StorageTargetsRestoreDefaultsInput =
  typeof StorageTargetsRestoreDefaultsInput.Type;

// Output Schema
export const StorageTargetsRestoreDefaultsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type StorageTargetsRestoreDefaultsOutput =
  typeof StorageTargetsRestoreDefaultsOutput.Type;

// The operation
/**
 * Tells a storage target to restore its settings to their default values.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const StorageTargetsRestoreDefaults =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: StorageTargetsRestoreDefaultsInput,
    outputSchema: StorageTargetsRestoreDefaultsOutput,
  }));
// Input Schema
export const StorageTargetSuspendInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.StorageCache/caches/{cacheName}/storageTargets/{storageTargetName}/suspend",
    }),
  );
export type StorageTargetSuspendInput = typeof StorageTargetSuspendInput.Type;

// Output Schema
export const StorageTargetSuspendOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type StorageTargetSuspendOutput = typeof StorageTargetSuspendOutput.Type;

// The operation
/**
 * Suspends client access to a storage target.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const StorageTargetSuspend = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: StorageTargetSuspendInput,
    outputSchema: StorageTargetSuspendOutput,
  }),
);
// Input Schema
export const UsageModelsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.StorageCache/usageModels",
  }),
);
export type UsageModelsListInput = typeof UsageModelsListInput.Type;

// Output Schema
export const UsageModelsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  nextLink: Schema.optional(Schema.String),
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        display: Schema.optional(
          Schema.Struct({
            description: Schema.optional(Schema.String),
          }),
        ),
        modelName: Schema.optional(Schema.String),
        targetType: Schema.optional(Schema.String),
      }),
    ),
  ),
});
export type UsageModelsListOutput = typeof UsageModelsListOutput.Type;

// The operation
/**
 * Get the list of cache usage models available to this subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const UsageModelsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: UsageModelsListInput,
  outputSchema: UsageModelsListOutput,
}));
