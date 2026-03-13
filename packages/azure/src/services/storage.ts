/**
 * Azure Storage API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";
import { SensitiveString } from "../sensitive.ts";

// Input Schema
export const BlobContainersClearLegalHoldInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    containerName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/blobServices/default/containers/{containerName}/clearLegalHold",
    }),
  );
export type BlobContainersClearLegalHoldInput =
  typeof BlobContainersClearLegalHoldInput.Type;

// Output Schema
export const BlobContainersClearLegalHoldOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    hasLegalHold: Schema.optional(Schema.Boolean),
    tags: Schema.Array(Schema.String),
    allowProtectedAppendWritesAll: Schema.optional(Schema.Boolean),
  });
export type BlobContainersClearLegalHoldOutput =
  typeof BlobContainersClearLegalHoldOutput.Type;

// The operation
/**
 * Clears legal hold tags. Clearing the same or non-existent tag results in an idempotent operation. ClearLegalHold clears out only the specified tags in the request.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 * @param containerName - The name of the blob container within the specified storage account. Blob container names must be between 3 and 63 characters in length and use numbers, lower-case letters and dash (-) only. Every dash (-) character must be immediately preceded and followed by a letter or number.
 */
export const BlobContainersClearLegalHold =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: BlobContainersClearLegalHoldInput,
    outputSchema: BlobContainersClearLegalHoldOutput,
  }));
// Input Schema
export const BlobContainersCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    containerName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/blobServices/default/containers/{containerName}",
    }),
  );
export type BlobContainersCreateInput = typeof BlobContainersCreateInput.Type;

// Output Schema
export const BlobContainersCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type BlobContainersCreateOutput = typeof BlobContainersCreateOutput.Type;

// The operation
/**
 * Creates a new container under the specified account as described by request body. The container resource includes metadata and properties for that container. It does not include a list of the blobs contained by the container.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 * @param containerName - The name of the blob container within the specified storage account. Blob container names must be between 3 and 63 characters in length and use numbers, lower-case letters and dash (-) only. Every dash (-) character must be immediately preceded and followed by a letter or number.
 */
export const BlobContainersCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: BlobContainersCreateInput,
    outputSchema: BlobContainersCreateOutput,
  }),
);
// Input Schema
export const BlobContainersCreateOrUpdateImmutabilityPolicyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    containerName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/blobServices/default/containers/{containerName}/immutabilityPolicies/default",
    }),
  );
export type BlobContainersCreateOrUpdateImmutabilityPolicyInput =
  typeof BlobContainersCreateOrUpdateImmutabilityPolicyInput.Type;

// Output Schema
export const BlobContainersCreateOrUpdateImmutabilityPolicyOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type BlobContainersCreateOrUpdateImmutabilityPolicyOutput =
  typeof BlobContainersCreateOrUpdateImmutabilityPolicyOutput.Type;

// The operation
/**
 * Creates or updates an unlocked immutability policy. ETag in If-Match is honored if given but not required for this operation.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 * @param containerName - The name of the blob container within the specified storage account. Blob container names must be between 3 and 63 characters in length and use numbers, lower-case letters and dash (-) only. Every dash (-) character must be immediately preceded and followed by a letter or number.
 * @param If-Match - The entity state (ETag) version of the immutability policy to update must be returned to the server for all update operations. The ETag value must include the leading and trailing double quotes as returned by the service.
 */
export const BlobContainersCreateOrUpdateImmutabilityPolicy =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: BlobContainersCreateOrUpdateImmutabilityPolicyInput,
    outputSchema: BlobContainersCreateOrUpdateImmutabilityPolicyOutput,
  }));
// Input Schema
export const BlobContainersDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    containerName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/blobServices/default/containers/{containerName}",
    }),
  );
export type BlobContainersDeleteInput = typeof BlobContainersDeleteInput.Type;

// Output Schema
export const BlobContainersDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type BlobContainersDeleteOutput = typeof BlobContainersDeleteOutput.Type;

// The operation
/**
 * Deletes specified container under its account.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 * @param containerName - The name of the blob container within the specified storage account. Blob container names must be between 3 and 63 characters in length and use numbers, lower-case letters and dash (-) only. Every dash (-) character must be immediately preceded and followed by a letter or number.
 */
export const BlobContainersDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: BlobContainersDeleteInput,
    outputSchema: BlobContainersDeleteOutput,
  }),
);
// Input Schema
export const BlobContainersDeleteImmutabilityPolicyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    containerName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/blobServices/default/containers/{containerName}/immutabilityPolicies/default",
    }),
  );
export type BlobContainersDeleteImmutabilityPolicyInput =
  typeof BlobContainersDeleteImmutabilityPolicyInput.Type;

// Output Schema
export const BlobContainersDeleteImmutabilityPolicyOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type BlobContainersDeleteImmutabilityPolicyOutput =
  typeof BlobContainersDeleteImmutabilityPolicyOutput.Type;

// The operation
/**
 * Aborts an unlocked immutability policy. The response of delete has immutabilityPeriodSinceCreationInDays set to 0. ETag in If-Match is required for this operation. Deleting a locked immutability policy is not allowed, the only way is to delete the container after deleting all expired blobs inside the policy locked container.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 * @param containerName - The name of the blob container within the specified storage account. Blob container names must be between 3 and 63 characters in length and use numbers, lower-case letters and dash (-) only. Every dash (-) character must be immediately preceded and followed by a letter or number.
 * @param If-Match - The entity state (ETag) version of the immutability policy to update must be returned to the server for all update operations. The ETag value must include the leading and trailing double quotes as returned by the service.
 */
export const BlobContainersDeleteImmutabilityPolicy =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: BlobContainersDeleteImmutabilityPolicyInput,
    outputSchema: BlobContainersDeleteImmutabilityPolicyOutput,
  }));
// Input Schema
export const BlobContainersExtendImmutabilityPolicyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    containerName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/blobServices/default/containers/{containerName}/immutabilityPolicies/default/extend",
    }),
  );
export type BlobContainersExtendImmutabilityPolicyInput =
  typeof BlobContainersExtendImmutabilityPolicyInput.Type;

// Output Schema
export const BlobContainersExtendImmutabilityPolicyOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type BlobContainersExtendImmutabilityPolicyOutput =
  typeof BlobContainersExtendImmutabilityPolicyOutput.Type;

// The operation
/**
 * Extends the immutabilityPeriodSinceCreationInDays of a locked immutabilityPolicy. The only action allowed on a Locked policy will be this action. ETag in If-Match is required for this operation.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 * @param containerName - The name of the blob container within the specified storage account. Blob container names must be between 3 and 63 characters in length and use numbers, lower-case letters and dash (-) only. Every dash (-) character must be immediately preceded and followed by a letter or number.
 * @param If-Match - The entity state (ETag) version of the immutability policy to update must be returned to the server for all update operations. The ETag value must include the leading and trailing double quotes as returned by the service.
 */
export const BlobContainersExtendImmutabilityPolicy =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: BlobContainersExtendImmutabilityPolicyInput,
    outputSchema: BlobContainersExtendImmutabilityPolicyOutput,
  }));
// Input Schema
export const BlobContainersGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    containerName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/blobServices/default/containers/{containerName}",
  }),
);
export type BlobContainersGetInput = typeof BlobContainersGetInput.Type;

// Output Schema
export const BlobContainersGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type BlobContainersGetOutput = typeof BlobContainersGetOutput.Type;

// The operation
/**
 * Gets properties of a specified container.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 * @param containerName - The name of the blob container within the specified storage account. Blob container names must be between 3 and 63 characters in length and use numbers, lower-case letters and dash (-) only. Every dash (-) character must be immediately preceded and followed by a letter or number.
 */
export const BlobContainersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: BlobContainersGetInput,
  outputSchema: BlobContainersGetOutput,
}));
// Input Schema
export const BlobContainersGetImmutabilityPolicyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    containerName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/blobServices/default/containers/{containerName}/immutabilityPolicies/default",
    }),
  );
export type BlobContainersGetImmutabilityPolicyInput =
  typeof BlobContainersGetImmutabilityPolicyInput.Type;

// Output Schema
export const BlobContainersGetImmutabilityPolicyOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type BlobContainersGetImmutabilityPolicyOutput =
  typeof BlobContainersGetImmutabilityPolicyOutput.Type;

// The operation
/**
 * Gets the existing immutability policy along with the corresponding ETag in response headers and body.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 * @param containerName - The name of the blob container within the specified storage account. Blob container names must be between 3 and 63 characters in length and use numbers, lower-case letters and dash (-) only. Every dash (-) character must be immediately preceded and followed by a letter or number.
 * @param If-Match - The entity state (ETag) version of the immutability policy to update must be returned to the server for all update operations. The ETag value must include the leading and trailing double quotes as returned by the service.
 */
export const BlobContainersGetImmutabilityPolicy =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: BlobContainersGetImmutabilityPolicyInput,
    outputSchema: BlobContainersGetImmutabilityPolicyOutput,
  }));
// Input Schema
export const BlobContainersLeaseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    containerName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/blobServices/default/containers/{containerName}/lease",
    }),
  );
export type BlobContainersLeaseInput = typeof BlobContainersLeaseInput.Type;

// Output Schema
export const BlobContainersLeaseOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    leaseId: Schema.optional(Schema.String),
    leaseTimeSeconds: Schema.optional(Schema.String),
  });
export type BlobContainersLeaseOutput = typeof BlobContainersLeaseOutput.Type;

// The operation
/**
 * The Lease Container operation establishes and manages a lock on a container for delete operations. The lock duration can be 15 to 60 seconds, or can be infinite.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 * @param containerName - The name of the blob container within the specified storage account. Blob container names must be between 3 and 63 characters in length and use numbers, lower-case letters and dash (-) only. Every dash (-) character must be immediately preceded and followed by a letter or number.
 */
export const BlobContainersLease = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: BlobContainersLeaseInput,
  outputSchema: BlobContainersLeaseOutput,
}));
// Input Schema
export const BlobContainersListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $maxpagesize: Schema.optional(Schema.String),
    $filter: Schema.optional(Schema.String),
    $include: Schema.optional(Schema.Literals(["deleted"])),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/blobServices/default/containers",
    }),
  );
export type BlobContainersListInput = typeof BlobContainersListInput.Type;

// Output Schema
export const BlobContainersListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        etag: Schema.optional(Schema.String),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type BlobContainersListOutput = typeof BlobContainersListOutput.Type;

// The operation
/**
 * Lists all containers and does not support a prefix like data plane. Also SRP today does not return continuation token.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 * @param $maxpagesize - Optional. Specified maximum number of containers that can be included in the list.
 * @param $filter - Optional. When specified, only container names starting with the filter will be listed.
 * @param $include - Optional, used to include the properties for soft deleted blob containers.
 */
export const BlobContainersList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: BlobContainersListInput,
  outputSchema: BlobContainersListOutput,
}));
// Input Schema
export const BlobContainersLockImmutabilityPolicyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    containerName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/blobServices/default/containers/{containerName}/immutabilityPolicies/default/lock",
    }),
  );
export type BlobContainersLockImmutabilityPolicyInput =
  typeof BlobContainersLockImmutabilityPolicyInput.Type;

// Output Schema
export const BlobContainersLockImmutabilityPolicyOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type BlobContainersLockImmutabilityPolicyOutput =
  typeof BlobContainersLockImmutabilityPolicyOutput.Type;

// The operation
/**
 * Sets the ImmutabilityPolicy to Locked state. The only action allowed on a Locked policy is ExtendImmutabilityPolicy action. ETag in If-Match is required for this operation.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 * @param containerName - The name of the blob container within the specified storage account. Blob container names must be between 3 and 63 characters in length and use numbers, lower-case letters and dash (-) only. Every dash (-) character must be immediately preceded and followed by a letter or number.
 * @param If-Match - The entity state (ETag) version of the immutability policy to update must be returned to the server for all update operations. The ETag value must include the leading and trailing double quotes as returned by the service.
 */
export const BlobContainersLockImmutabilityPolicy =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: BlobContainersLockImmutabilityPolicyInput,
    outputSchema: BlobContainersLockImmutabilityPolicyOutput,
  }));
// Input Schema
export const BlobContainersObjectLevelWormInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    containerName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/blobServices/default/containers/{containerName}/migrate",
    }),
  );
export type BlobContainersObjectLevelWormInput =
  typeof BlobContainersObjectLevelWormInput.Type;

// Output Schema
export const BlobContainersObjectLevelWormOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type BlobContainersObjectLevelWormOutput =
  typeof BlobContainersObjectLevelWormOutput.Type;

// The operation
/**
 * This operation migrates a blob container from container level WORM to object level immutability enabled container. Prerequisites require a container level immutability policy either in locked or unlocked state, Account level versioning must be enabled and there should be no Legal hold on the container.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 * @param containerName - The name of the blob container within the specified storage account. Blob container names must be between 3 and 63 characters in length and use numbers, lower-case letters and dash (-) only. Every dash (-) character must be immediately preceded and followed by a letter or number.
 */
export const BlobContainersObjectLevelWorm =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: BlobContainersObjectLevelWormInput,
    outputSchema: BlobContainersObjectLevelWormOutput,
  }));
// Input Schema
export const BlobContainersSetLegalHoldInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    containerName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/blobServices/default/containers/{containerName}/setLegalHold",
    }),
  );
export type BlobContainersSetLegalHoldInput =
  typeof BlobContainersSetLegalHoldInput.Type;

// Output Schema
export const BlobContainersSetLegalHoldOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    hasLegalHold: Schema.optional(Schema.Boolean),
    tags: Schema.Array(Schema.String),
    allowProtectedAppendWritesAll: Schema.optional(Schema.Boolean),
  });
export type BlobContainersSetLegalHoldOutput =
  typeof BlobContainersSetLegalHoldOutput.Type;

// The operation
/**
 * Sets legal hold tags. Setting the same tag results in an idempotent operation. SetLegalHold follows an append pattern and does not clear out the existing tags that are not specified in the request.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 * @param containerName - The name of the blob container within the specified storage account. Blob container names must be between 3 and 63 characters in length and use numbers, lower-case letters and dash (-) only. Every dash (-) character must be immediately preceded and followed by a letter or number.
 */
export const BlobContainersSetLegalHold = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: BlobContainersSetLegalHoldInput,
    outputSchema: BlobContainersSetLegalHoldOutput,
  }),
);
// Input Schema
export const BlobContainersUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    containerName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/blobServices/default/containers/{containerName}",
    }),
  );
export type BlobContainersUpdateInput = typeof BlobContainersUpdateInput.Type;

// Output Schema
export const BlobContainersUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type BlobContainersUpdateOutput = typeof BlobContainersUpdateOutput.Type;

// The operation
/**
 * Updates container properties as specified in request body. Properties not mentioned in the request will be unchanged. Update fails if the specified container doesn't already exist.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 * @param containerName - The name of the blob container within the specified storage account. Blob container names must be between 3 and 63 characters in length and use numbers, lower-case letters and dash (-) only. Every dash (-) character must be immediately preceded and followed by a letter or number.
 */
export const BlobContainersUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: BlobContainersUpdateInput,
    outputSchema: BlobContainersUpdateOutput,
  }),
);
// Input Schema
export const BlobInventoryPoliciesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    blobInventoryPolicyName: Schema.Literals(["default"]).pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/inventoryPolicies/{blobInventoryPolicyName}",
    }),
  );
export type BlobInventoryPoliciesCreateOrUpdateInput =
  typeof BlobInventoryPoliciesCreateOrUpdateInput.Type;

// Output Schema
export const BlobInventoryPoliciesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type BlobInventoryPoliciesCreateOrUpdateOutput =
  typeof BlobInventoryPoliciesCreateOrUpdateOutput.Type;

// The operation
/**
 * Sets the blob inventory policy to the specified storage account.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 * @param blobInventoryPolicyName - The name of the storage account blob inventory policy. It should always be 'default'
 */
export const BlobInventoryPoliciesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: BlobInventoryPoliciesCreateOrUpdateInput,
    outputSchema: BlobInventoryPoliciesCreateOrUpdateOutput,
  }));
// Input Schema
export const BlobInventoryPoliciesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    blobInventoryPolicyName: Schema.Literals(["default"]).pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/inventoryPolicies/{blobInventoryPolicyName}",
    }),
  );
export type BlobInventoryPoliciesDeleteInput =
  typeof BlobInventoryPoliciesDeleteInput.Type;

// Output Schema
export const BlobInventoryPoliciesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type BlobInventoryPoliciesDeleteOutput =
  typeof BlobInventoryPoliciesDeleteOutput.Type;

// The operation
/**
 * Deletes the blob inventory policy associated with the specified storage account.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 * @param blobInventoryPolicyName - The name of the storage account blob inventory policy. It should always be 'default'
 */
export const BlobInventoryPoliciesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: BlobInventoryPoliciesDeleteInput,
    outputSchema: BlobInventoryPoliciesDeleteOutput,
  }),
);
// Input Schema
export const BlobInventoryPoliciesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    blobInventoryPolicyName: Schema.Literals(["default"]).pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/inventoryPolicies/{blobInventoryPolicyName}",
    }),
  );
export type BlobInventoryPoliciesGetInput =
  typeof BlobInventoryPoliciesGetInput.Type;

// Output Schema
export const BlobInventoryPoliciesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type BlobInventoryPoliciesGetOutput =
  typeof BlobInventoryPoliciesGetOutput.Type;

// The operation
/**
 * Gets the blob inventory policy associated with the specified storage account.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 * @param blobInventoryPolicyName - The name of the storage account blob inventory policy. It should always be 'default'
 */
export const BlobInventoryPoliciesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: BlobInventoryPoliciesGetInput,
    outputSchema: BlobInventoryPoliciesGetOutput,
  }),
);
// Input Schema
export const BlobInventoryPoliciesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/inventoryPolicies",
    }),
  );
export type BlobInventoryPoliciesListInput =
  typeof BlobInventoryPoliciesListInput.Type;

// Output Schema
export const BlobInventoryPoliciesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type BlobInventoryPoliciesListOutput =
  typeof BlobInventoryPoliciesListOutput.Type;

// The operation
/**
 * Gets the blob inventory policy associated with the specified storage account.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 */
export const BlobInventoryPoliciesList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: BlobInventoryPoliciesListInput,
    outputSchema: BlobInventoryPoliciesListOutput,
  }),
);
// Input Schema
export const BlobServicesGetServicePropertiesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/blobServices/default",
    }),
  );
export type BlobServicesGetServicePropertiesInput =
  typeof BlobServicesGetServicePropertiesInput.Type;

// Output Schema
export const BlobServicesGetServicePropertiesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type BlobServicesGetServicePropertiesOutput =
  typeof BlobServicesGetServicePropertiesOutput.Type;

// The operation
/**
 * Gets the properties of a storage account’s Blob service, including properties for Storage Analytics and CORS (Cross-Origin Resource Sharing) rules.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 */
export const BlobServicesGetServiceProperties =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: BlobServicesGetServicePropertiesInput,
    outputSchema: BlobServicesGetServicePropertiesOutput,
  }));
// Input Schema
export const BlobServicesListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  accountName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/blobServices",
  }),
);
export type BlobServicesListInput = typeof BlobServicesListInput.Type;

// Output Schema
export const BlobServicesListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  },
);
export type BlobServicesListOutput = typeof BlobServicesListOutput.Type;

// The operation
/**
 * List blob services of storage account. It returns a collection of one object named default.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 */
export const BlobServicesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: BlobServicesListInput,
  outputSchema: BlobServicesListOutput,
}));
// Input Schema
export const BlobServicesSetServicePropertiesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/blobServices/default",
    }),
  );
export type BlobServicesSetServicePropertiesInput =
  typeof BlobServicesSetServicePropertiesInput.Type;

// Output Schema
export const BlobServicesSetServicePropertiesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type BlobServicesSetServicePropertiesOutput =
  typeof BlobServicesSetServicePropertiesOutput.Type;

// The operation
/**
 * Sets the properties of a storage account’s Blob service, including properties for Storage Analytics and CORS (Cross-Origin Resource Sharing) rules.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 */
export const BlobServicesSetServiceProperties =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: BlobServicesSetServicePropertiesInput,
    outputSchema: BlobServicesSetServicePropertiesOutput,
  }));
// Input Schema
export const ConnectorsCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  accountName: Schema.String.pipe(T.PathParam()),
  connectorName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/connectors/{connectorName}",
  }),
);
export type ConnectorsCreateInput = typeof ConnectorsCreateInput.Type;

// Output Schema
export const ConnectorsCreateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  },
);
export type ConnectorsCreateOutput = typeof ConnectorsCreateOutput.Type;

// The operation
/**
 * Create a Storage Connector if it does not already exist; otherwise, error out. This API will not allow you to replace an already existing resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 * @param connectorName - The name of the Storage Connector.
 */
export const ConnectorsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ConnectorsCreateInput,
  outputSchema: ConnectorsCreateOutput,
}));
// Input Schema
export const ConnectorsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  accountName: Schema.String.pipe(T.PathParam()),
  connectorName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/connectors/{connectorName}",
  }),
);
export type ConnectorsDeleteInput = typeof ConnectorsDeleteInput.Type;

// Output Schema
export const ConnectorsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ConnectorsDeleteOutput = typeof ConnectorsDeleteOutput.Type;

// The operation
/**
 * Delete a Storage Connector.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 * @param connectorName - The name of the Storage Connector.
 */
export const ConnectorsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ConnectorsDeleteInput,
  outputSchema: ConnectorsDeleteOutput,
}));
// Input Schema
export const ConnectorsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  accountName: Schema.String.pipe(T.PathParam()),
  connectorName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/connectors/{connectorName}",
  }),
);
export type ConnectorsGetInput = typeof ConnectorsGetInput.Type;

// Output Schema
export const ConnectorsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type ConnectorsGetOutput = typeof ConnectorsGetOutput.Type;

// The operation
/**
 * Get the specified Storage Connector.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 * @param connectorName - The name of the Storage Connector.
 */
export const ConnectorsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ConnectorsGetInput,
  outputSchema: ConnectorsGetOutput,
}));
// Input Schema
export const ConnectorsListByStorageAccountInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/connectors",
    }),
  );
export type ConnectorsListByStorageAccountInput =
  typeof ConnectorsListByStorageAccountInput.Type;

// Output Schema
export const ConnectorsListByStorageAccountOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ConnectorsListByStorageAccountOutput =
  typeof ConnectorsListByStorageAccountOutput.Type;

// The operation
/**
 * List all Storage Connectors in a Storage Account.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 */
export const ConnectorsListByStorageAccount =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConnectorsListByStorageAccountInput,
    outputSchema: ConnectorsListByStorageAccountOutput,
  }));
// Input Schema
export const ConnectorsTestExistingConnectionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    connectorName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/connectors/{connectorName}/testExistingConnection",
    }),
  );
export type ConnectorsTestExistingConnectionInput =
  typeof ConnectorsTestExistingConnectionInput.Type;

// Output Schema
export const ConnectorsTestExistingConnectionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    storageConnectorMethodName: Schema.String,
    storageConnectorErrorMessage: Schema.optional(Schema.String),
    storageConnectorRequestId: Schema.String,
  });
export type ConnectorsTestExistingConnectionOutput =
  typeof ConnectorsTestExistingConnectionOutput.Type;

// The operation
/**
 * This method is used to verify that the connection to the backing data store works.
 * This API is designed to be used for monitoring and debugging purposes. From the caller’s perspective,
 * this method does the following: Calls List on the backing data store, attempting to list up to one blob/object/etc.
 * If the above succeeds, and if a blob/object/etc is found, calls Get on that object, attempting to download one byte.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 * @param connectorName - The name of the Storage Connector.
 */
export const ConnectorsTestExistingConnection =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConnectorsTestExistingConnectionInput,
    outputSchema: ConnectorsTestExistingConnectionOutput,
  }));
// Input Schema
export const ConnectorsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  accountName: Schema.String.pipe(T.PathParam()),
  connectorName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/connectors/{connectorName}",
  }),
);
export type ConnectorsUpdateInput = typeof ConnectorsUpdateInput.Type;

// Output Schema
export const ConnectorsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  },
);
export type ConnectorsUpdateOutput = typeof ConnectorsUpdateOutput.Type;

// The operation
/**
 * Update a Storage Connector.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 * @param connectorName - The name of the Storage Connector.
 */
export const ConnectorsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ConnectorsUpdateInput,
  outputSchema: ConnectorsUpdateOutput,
}));
// Input Schema
export const DataSharesCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  accountName: Schema.String.pipe(T.PathParam()),
  dataShareName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/dataShares/{dataShareName}",
  }),
);
export type DataSharesCreateInput = typeof DataSharesCreateInput.Type;

// Output Schema
export const DataSharesCreateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  },
);
export type DataSharesCreateOutput = typeof DataSharesCreateOutput.Type;

// The operation
/**
 * Create a Storage DataShare if it does not already exist; otherwise, error out. This API will not allow you to replace an already existing resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 * @param dataShareName - The name of the Storage DataShare.
 */
export const DataSharesCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DataSharesCreateInput,
  outputSchema: DataSharesCreateOutput,
}));
// Input Schema
export const DataSharesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  accountName: Schema.String.pipe(T.PathParam()),
  dataShareName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/dataShares/{dataShareName}",
  }),
);
export type DataSharesDeleteInput = typeof DataSharesDeleteInput.Type;

// Output Schema
export const DataSharesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DataSharesDeleteOutput = typeof DataSharesDeleteOutput.Type;

// The operation
/**
 * Delete a Storage DataShare.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 * @param dataShareName - The name of the Storage DataShare.
 */
export const DataSharesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DataSharesDeleteInput,
  outputSchema: DataSharesDeleteOutput,
}));
// Input Schema
export const DataSharesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  accountName: Schema.String.pipe(T.PathParam()),
  dataShareName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/dataShares/{dataShareName}",
  }),
);
export type DataSharesGetInput = typeof DataSharesGetInput.Type;

// Output Schema
export const DataSharesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type DataSharesGetOutput = typeof DataSharesGetOutput.Type;

// The operation
/**
 * Get the specified Storage DataShare.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 * @param dataShareName - The name of the Storage DataShare.
 */
export const DataSharesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DataSharesGetInput,
  outputSchema: DataSharesGetOutput,
}));
// Input Schema
export const DataSharesListByStorageAccountInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/dataShares",
    }),
  );
export type DataSharesListByStorageAccountInput =
  typeof DataSharesListByStorageAccountInput.Type;

// Output Schema
export const DataSharesListByStorageAccountOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type DataSharesListByStorageAccountOutput =
  typeof DataSharesListByStorageAccountOutput.Type;

// The operation
/**
 * List all Storage DataShares in a Storage Account.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 */
export const DataSharesListByStorageAccount =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DataSharesListByStorageAccountInput,
    outputSchema: DataSharesListByStorageAccountOutput,
  }));
// Input Schema
export const DataSharesUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  accountName: Schema.String.pipe(T.PathParam()),
  dataShareName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/dataShares/{dataShareName}",
  }),
);
export type DataSharesUpdateInput = typeof DataSharesUpdateInput.Type;

// Output Schema
export const DataSharesUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  },
);
export type DataSharesUpdateOutput = typeof DataSharesUpdateOutput.Type;

// The operation
/**
 * Update a Storage DataShare.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 * @param dataShareName - The name of the Storage DataShare.
 */
export const DataSharesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DataSharesUpdateInput,
  outputSchema: DataSharesUpdateOutput,
}));
// Input Schema
export const DeletedAccountsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    deletedAccountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Storage/locations/{location}/deletedAccounts/{deletedAccountName}",
    }),
  );
export type DeletedAccountsGetInput = typeof DeletedAccountsGetInput.Type;

// Output Schema
export const DeletedAccountsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DeletedAccountsGetOutput = typeof DeletedAccountsGetOutput.Type;

// The operation
/**
 * Get properties of specified deleted account resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param location - The name of the Azure region.
 * @param deletedAccountName - Name of the deleted storage account.
 */
export const DeletedAccountsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DeletedAccountsGetInput,
  outputSchema: DeletedAccountsGetOutput,
}));
// Input Schema
export const DeletedAccountsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Storage/deletedAccounts",
    }),
  );
export type DeletedAccountsListInput = typeof DeletedAccountsListInput.Type;

// Output Schema
export const DeletedAccountsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type DeletedAccountsListOutput = typeof DeletedAccountsListOutput.Type;

// The operation
/**
 * Lists deleted accounts under the subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const DeletedAccountsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DeletedAccountsListInput,
  outputSchema: DeletedAccountsListOutput,
}));
// Input Schema
export const EncryptionScopesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    encryptionScopeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/encryptionScopes/{encryptionScopeName}",
    }),
  );
export type EncryptionScopesGetInput = typeof EncryptionScopesGetInput.Type;

// Output Schema
export const EncryptionScopesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type EncryptionScopesGetOutput = typeof EncryptionScopesGetOutput.Type;

// The operation
/**
 * Returns the properties for the specified encryption scope.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 * @param encryptionScopeName - The name of the encryption scope within the specified storage account. Encryption scope names must be between 3 and 63 characters in length and use numbers, lower-case letters and dash (-) only. Every dash (-) character must be immediately preceded and followed by a letter or number.
 */
export const EncryptionScopesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: EncryptionScopesGetInput,
  outputSchema: EncryptionScopesGetOutput,
}));
// Input Schema
export const EncryptionScopesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $maxpagesize: Schema.optional(Schema.Number),
    $filter: Schema.optional(Schema.String),
    $include: Schema.optional(Schema.Literals(["All", "Enabled", "Disabled"])),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/encryptionScopes",
    }),
  );
export type EncryptionScopesListInput = typeof EncryptionScopesListInput.Type;

// Output Schema
export const EncryptionScopesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type EncryptionScopesListOutput = typeof EncryptionScopesListOutput.Type;

// The operation
/**
 * Lists all the encryption scopes available under the specified storage account.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 * @param $maxpagesize - Optional, specifies the maximum number of encryption scopes that will be included in the list response.
 * @param $filter - Optional. When specified, only encryption scope names starting with the filter will be listed.
 * @param $include - Optional, when specified, will list encryption scopes with the specific state. Defaults to All
 */
export const EncryptionScopesList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: EncryptionScopesListInput,
    outputSchema: EncryptionScopesListOutput,
  }),
);
// Input Schema
export const EncryptionScopesPatchInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    encryptionScopeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/encryptionScopes/{encryptionScopeName}",
    }),
  );
export type EncryptionScopesPatchInput = typeof EncryptionScopesPatchInput.Type;

// Output Schema
export const EncryptionScopesPatchOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type EncryptionScopesPatchOutput =
  typeof EncryptionScopesPatchOutput.Type;

// The operation
/**
 * Update encryption scope properties as specified in the request body. Update fails if the specified encryption scope does not already exist.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 * @param encryptionScopeName - The name of the encryption scope within the specified storage account. Encryption scope names must be between 3 and 63 characters in length and use numbers, lower-case letters and dash (-) only. Every dash (-) character must be immediately preceded and followed by a letter or number.
 */
export const EncryptionScopesPatch = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: EncryptionScopesPatchInput,
    outputSchema: EncryptionScopesPatchOutput,
  }),
);
// Input Schema
export const EncryptionScopesPutInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    encryptionScopeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/encryptionScopes/{encryptionScopeName}",
    }),
  );
export type EncryptionScopesPutInput = typeof EncryptionScopesPutInput.Type;

// Output Schema
export const EncryptionScopesPutOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type EncryptionScopesPutOutput = typeof EncryptionScopesPutOutput.Type;

// The operation
/**
 * Synchronously creates or updates an encryption scope under the specified storage account. If an encryption scope is already created and a subsequent request is issued with different properties, the encryption scope properties will be updated per the specified request.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 * @param encryptionScopeName - The name of the encryption scope within the specified storage account. Encryption scope names must be between 3 and 63 characters in length and use numbers, lower-case letters and dash (-) only. Every dash (-) character must be immediately preceded and followed by a letter or number.
 */
export const EncryptionScopesPut = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: EncryptionScopesPutInput,
  outputSchema: EncryptionScopesPutOutput,
}));
// Input Schema
export const FileServicesGetServicePropertiesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/fileServices/default",
    }),
  );
export type FileServicesGetServicePropertiesInput =
  typeof FileServicesGetServicePropertiesInput.Type;

// Output Schema
export const FileServicesGetServicePropertiesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type FileServicesGetServicePropertiesOutput =
  typeof FileServicesGetServicePropertiesOutput.Type;

// The operation
/**
 * Gets the properties of file services in storage accounts, including CORS (Cross-Origin Resource Sharing) rules.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 */
export const FileServicesGetServiceProperties =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: FileServicesGetServicePropertiesInput,
    outputSchema: FileServicesGetServicePropertiesOutput,
  }));
// Input Schema
export const FileServicesGetServiceUsageInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/fileServices/default/usages/default",
    }),
  );
export type FileServicesGetServiceUsageInput =
  typeof FileServicesGetServiceUsageInput.Type;

// Output Schema
export const FileServicesGetServiceUsageOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type FileServicesGetServiceUsageOutput =
  typeof FileServicesGetServiceUsageOutput.Type;

// The operation
/**
 * Gets the usage of file service in storage account including account limits, file share limits and constants used in recommendations and bursting formula.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 */
export const FileServicesGetServiceUsage = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: FileServicesGetServiceUsageInput,
    outputSchema: FileServicesGetServiceUsageOutput,
  }),
);
// Input Schema
export const FileServicesListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  accountName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/fileServices",
  }),
);
export type FileServicesListInput = typeof FileServicesListInput.Type;

// Output Schema
export const FileServicesListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
  },
);
export type FileServicesListOutput = typeof FileServicesListOutput.Type;

// The operation
/**
 * List all file services in storage accounts
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 */
export const FileServicesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FileServicesListInput,
  outputSchema: FileServicesListOutput,
}));
// Input Schema
export const FileServicesListServiceUsagesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $maxpagesize: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/fileServices/default/usages",
    }),
  );
export type FileServicesListServiceUsagesInput =
  typeof FileServicesListServiceUsagesInput.Type;

// Output Schema
export const FileServicesListServiceUsagesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type FileServicesListServiceUsagesOutput =
  typeof FileServicesListServiceUsagesOutput.Type;

// The operation
/**
 * Gets the usages of file service in storage account.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 * @param $maxpagesize - Optional, specifies the maximum number of file service usages to be included in the list response.
 */
export const FileServicesListServiceUsages =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: FileServicesListServiceUsagesInput,
    outputSchema: FileServicesListServiceUsagesOutput,
  }));
// Input Schema
export const FileServicesSetServicePropertiesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/fileServices/default",
    }),
  );
export type FileServicesSetServicePropertiesInput =
  typeof FileServicesSetServicePropertiesInput.Type;

// Output Schema
export const FileServicesSetServicePropertiesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type FileServicesSetServicePropertiesOutput =
  typeof FileServicesSetServicePropertiesOutput.Type;

// The operation
/**
 * Sets the properties of file services in storage accounts, including CORS (Cross-Origin Resource Sharing) rules.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 */
export const FileServicesSetServiceProperties =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: FileServicesSetServicePropertiesInput,
    outputSchema: FileServicesSetServicePropertiesOutput,
  }));
// Input Schema
export const FileSharesCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  accountName: Schema.String.pipe(T.PathParam()),
  shareName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
  $expand: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/fileServices/default/shares/{shareName}",
  }),
);
export type FileSharesCreateInput = typeof FileSharesCreateInput.Type;

// Output Schema
export const FileSharesCreateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type FileSharesCreateOutput = typeof FileSharesCreateOutput.Type;

// The operation
/**
 * Creates a new share under the specified account as described by request body. The share resource includes metadata and properties for that share. It does not include a list of the files contained by the share.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 * @param shareName - The name of the file share within the specified storage account. File share names must be between 3 and 63 characters in length and use numbers, lower-case letters and dash (-) only. Every dash (-) character must be immediately preceded and followed by a letter or number.
 * @param $expand - Optional, used to expand the properties within share's properties. Valid values are: snapshots. Should be passed as a string with delimiter ','
 */
export const FileSharesCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FileSharesCreateInput,
  outputSchema: FileSharesCreateOutput,
}));
// Input Schema
export const FileSharesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  accountName: Schema.String.pipe(T.PathParam()),
  shareName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
  $include: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/fileServices/default/shares/{shareName}",
  }),
);
export type FileSharesDeleteInput = typeof FileSharesDeleteInput.Type;

// Output Schema
export const FileSharesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type FileSharesDeleteOutput = typeof FileSharesDeleteOutput.Type;

// The operation
/**
 * Deletes specified share under its account.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 * @param shareName - The name of the file share within the specified storage account. File share names must be between 3 and 63 characters in length and use numbers, lower-case letters and dash (-) only. Every dash (-) character must be immediately preceded and followed by a letter or number.
 * @param x-ms-snapshot - Optional, used to delete a snapshot.
 * @param $include - Optional. Valid values are: snapshots, leased-snapshots, none. The default value is snapshots. For 'snapshots', the file share is deleted including all of its file share snapshots. If the file share contains leased-snapshots, the deletion fails. For 'leased-snapshots', the file share is deleted included all of its file share snapshots (leased/unleased). For 'none', the file share is deleted if it has no share snapshots. If the file share contains any snapshots (leased or unleased), the deletion fails.
 */
export const FileSharesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FileSharesDeleteInput,
  outputSchema: FileSharesDeleteOutput,
}));
// Input Schema
export const FileSharesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  accountName: Schema.String.pipe(T.PathParam()),
  shareName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
  $expand: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/fileServices/default/shares/{shareName}",
  }),
);
export type FileSharesGetInput = typeof FileSharesGetInput.Type;

// Output Schema
export const FileSharesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type FileSharesGetOutput = typeof FileSharesGetOutput.Type;

// The operation
/**
 * Gets properties of a specified share.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 * @param shareName - The name of the file share within the specified storage account. File share names must be between 3 and 63 characters in length and use numbers, lower-case letters and dash (-) only. Every dash (-) character must be immediately preceded and followed by a letter or number.
 * @param $expand - Optional, used to expand the properties within share's properties. Valid values are: stats. Should be passed as a string with delimiter ','.
 * @param x-ms-snapshot - Optional, used to retrieve properties of a snapshot.
 */
export const FileSharesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FileSharesGetInput,
  outputSchema: FileSharesGetOutput,
}));
// Input Schema
export const FileSharesLeaseInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  accountName: Schema.String.pipe(T.PathParam()),
  shareName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/fileServices/default/shares/{shareName}/lease",
  }),
);
export type FileSharesLeaseInput = typeof FileSharesLeaseInput.Type;

// Output Schema
export const FileSharesLeaseOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  leaseId: Schema.optional(Schema.String),
  leaseTimeSeconds: Schema.optional(Schema.String),
});
export type FileSharesLeaseOutput = typeof FileSharesLeaseOutput.Type;

// The operation
/**
 * The Lease Share operation establishes and manages a lock on a share for delete operations. The lock duration can be 15 to 60 seconds, or can be infinite.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 * @param shareName - The name of the file share within the specified storage account. File share names must be between 3 and 63 characters in length and use numbers, lower-case letters and dash (-) only. Every dash (-) character must be immediately preceded and followed by a letter or number.
 * @param x-ms-snapshot - Optional. Specify the snapshot time to lease a snapshot.
 */
export const FileSharesLease = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FileSharesLeaseInput,
  outputSchema: FileSharesLeaseOutput,
}));
// Input Schema
export const FileSharesListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  accountName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
  $maxpagesize: Schema.optional(Schema.String),
  $filter: Schema.optional(Schema.String),
  $expand: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/fileServices/default/shares",
  }),
);
export type FileSharesListInput = typeof FileSharesListInput.Type;

// Output Schema
export const FileSharesListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(
    Schema.Struct({
      etag: Schema.optional(Schema.String),
    }),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type FileSharesListOutput = typeof FileSharesListOutput.Type;

// The operation
/**
 * Lists all shares.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 * @param $maxpagesize - Optional. Specified maximum number of shares that can be included in the list.
 * @param $filter - Optional. When specified, only share names starting with the filter will be listed.
 * @param $expand - Optional, used to expand the properties within share's properties. Valid values are: deleted, snapshots. Should be passed as a string with delimiter ','
 */
export const FileSharesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FileSharesListInput,
  outputSchema: FileSharesListOutput,
}));
// Input Schema
export const FileSharesRestoreInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    shareName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/fileServices/default/shares/{shareName}/restore",
  }),
);
export type FileSharesRestoreInput = typeof FileSharesRestoreInput.Type;

// Output Schema
export const FileSharesRestoreOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type FileSharesRestoreOutput = typeof FileSharesRestoreOutput.Type;

// The operation
/**
 * Restore a file share within a valid retention days if share soft delete is enabled
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 * @param shareName - The name of the file share within the specified storage account. File share names must be between 3 and 63 characters in length and use numbers, lower-case letters and dash (-) only. Every dash (-) character must be immediately preceded and followed by a letter or number.
 */
export const FileSharesRestore = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FileSharesRestoreInput,
  outputSchema: FileSharesRestoreOutput,
}));
// Input Schema
export const FileSharesUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  accountName: Schema.String.pipe(T.PathParam()),
  shareName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/fileServices/default/shares/{shareName}",
  }),
);
export type FileSharesUpdateInput = typeof FileSharesUpdateInput.Type;

// Output Schema
export const FileSharesUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type FileSharesUpdateOutput = typeof FileSharesUpdateOutput.Type;

// The operation
/**
 * Updates share properties as specified in request body. Properties not mentioned in the request will not be changed. Update fails if the specified share does not already exist.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 * @param shareName - The name of the file share within the specified storage account. File share names must be between 3 and 63 characters in length and use numbers, lower-case letters and dash (-) only. Every dash (-) character must be immediately preceded and followed by a letter or number.
 */
export const FileSharesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FileSharesUpdateInput,
  outputSchema: FileSharesUpdateOutput,
}));
// Input Schema
export const LocalUsersCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    username: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/localUsers/{username}",
    }),
  );
export type LocalUsersCreateOrUpdateInput =
  typeof LocalUsersCreateOrUpdateInput.Type;

// Output Schema
export const LocalUsersCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type LocalUsersCreateOrUpdateOutput =
  typeof LocalUsersCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update the properties of a local user associated with the storage account. Properties for NFSv3 enablement and extended groups cannot be set with other properties.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 * @param username - The name of local user. The username must contain lowercase letters and numbers only. It must be unique only within the storage account.
 */
export const LocalUsersCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: LocalUsersCreateOrUpdateInput,
    outputSchema: LocalUsersCreateOrUpdateOutput,
  }),
);
// Input Schema
export const LocalUsersDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  accountName: Schema.String.pipe(T.PathParam()),
  username: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/localUsers/{username}",
  }),
);
export type LocalUsersDeleteInput = typeof LocalUsersDeleteInput.Type;

// Output Schema
export const LocalUsersDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type LocalUsersDeleteOutput = typeof LocalUsersDeleteOutput.Type;

// The operation
/**
 * Deletes the local user associated with the specified storage account.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 * @param username - The name of local user. The username must contain lowercase letters and numbers only. It must be unique only within the storage account.
 */
export const LocalUsersDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: LocalUsersDeleteInput,
  outputSchema: LocalUsersDeleteOutput,
}));
// Input Schema
export const LocalUsersGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  accountName: Schema.String.pipe(T.PathParam()),
  username: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/localUsers/{username}",
  }),
);
export type LocalUsersGetInput = typeof LocalUsersGetInput.Type;

// Output Schema
export const LocalUsersGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type LocalUsersGetOutput = typeof LocalUsersGetOutput.Type;

// The operation
/**
 * Get the local user of the storage account by username.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 * @param username - The name of local user. The username must contain lowercase letters and numbers only. It must be unique only within the storage account.
 */
export const LocalUsersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: LocalUsersGetInput,
  outputSchema: LocalUsersGetOutput,
}));
// Input Schema
export const LocalUsersListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  accountName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
  $maxpagesize: Schema.optional(Schema.Number),
  $filter: Schema.optional(Schema.String),
  $include: Schema.optional(Schema.Literals(["nfsv3"])),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/localUsers",
  }),
);
export type LocalUsersListInput = typeof LocalUsersListInput.Type;

// Output Schema
export const LocalUsersListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(Schema.Struct({})),
  nextLink: Schema.optional(Schema.String),
});
export type LocalUsersListOutput = typeof LocalUsersListOutput.Type;

// The operation
/**
 * List the local users associated with the storage account.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 * @param $maxpagesize - Optional, specifies the maximum number of local users that will be included in the list response.
 * @param $filter - Optional. When specified, only local user names starting with the filter will be listed.
 * @param $include - Optional, when specified, will list local users enabled for the specific protocol. Lists all users by default.
 */
export const LocalUsersList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: LocalUsersListInput,
  outputSchema: LocalUsersListOutput,
}));
// Input Schema
export const LocalUsersListKeysInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    username: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/localUsers/{username}/listKeys",
    }),
  );
export type LocalUsersListKeysInput = typeof LocalUsersListKeysInput.Type;

// Output Schema
export const LocalUsersListKeysOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    sshAuthorizedKeys: Schema.optional(
      Schema.Array(
        Schema.Struct({
          description: Schema.optional(Schema.String),
          key: Schema.optional(Schema.String),
        }),
      ),
    ),
    sharedKey: Schema.optional(Schema.String),
  });
export type LocalUsersListKeysOutput = typeof LocalUsersListKeysOutput.Type;

// The operation
/**
 * List SSH authorized keys and shared key of the local user.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 * @param username - The name of local user. The username must contain lowercase letters and numbers only. It must be unique only within the storage account.
 */
export const LocalUsersListKeys = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: LocalUsersListKeysInput,
  outputSchema: LocalUsersListKeysOutput,
}));
// Input Schema
export const LocalUsersRegeneratePasswordInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    username: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/localUsers/{username}/regeneratePassword",
    }),
  );
export type LocalUsersRegeneratePasswordInput =
  typeof LocalUsersRegeneratePasswordInput.Type;

// Output Schema
export const LocalUsersRegeneratePasswordOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    sshPassword: Schema.optional(SensitiveString),
  });
export type LocalUsersRegeneratePasswordOutput =
  typeof LocalUsersRegeneratePasswordOutput.Type;

// The operation
/**
 * Regenerate the local user SSH password.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 * @param username - The name of local user. The username must contain lowercase letters and numbers only. It must be unique only within the storage account.
 */
export const LocalUsersRegeneratePassword =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LocalUsersRegeneratePasswordInput,
    outputSchema: LocalUsersRegeneratePasswordOutput,
  }));
// Input Schema
export const ManagementPoliciesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    managementPolicyName: Schema.Literals(["default"]).pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/managementPolicies/{managementPolicyName}",
    }),
  );
export type ManagementPoliciesCreateOrUpdateInput =
  typeof ManagementPoliciesCreateOrUpdateInput.Type;

// Output Schema
export const ManagementPoliciesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagementPoliciesCreateOrUpdateOutput =
  typeof ManagementPoliciesCreateOrUpdateOutput.Type;

// The operation
/**
 * Sets the managementpolicy to the specified storage account.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 * @param managementPolicyName - The name of the Storage Account Management Policy. It should always be 'default'
 */
export const ManagementPoliciesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagementPoliciesCreateOrUpdateInput,
    outputSchema: ManagementPoliciesCreateOrUpdateOutput,
  }));
// Input Schema
export const ManagementPoliciesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    managementPolicyName: Schema.Literals(["default"]).pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/managementPolicies/{managementPolicyName}",
    }),
  );
export type ManagementPoliciesDeleteInput =
  typeof ManagementPoliciesDeleteInput.Type;

// Output Schema
export const ManagementPoliciesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ManagementPoliciesDeleteOutput =
  typeof ManagementPoliciesDeleteOutput.Type;

// The operation
/**
 * Deletes the managementpolicy associated with the specified storage account.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 * @param managementPolicyName - The name of the Storage Account Management Policy. It should always be 'default'
 */
export const ManagementPoliciesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ManagementPoliciesDeleteInput,
    outputSchema: ManagementPoliciesDeleteOutput,
  }),
);
// Input Schema
export const ManagementPoliciesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    managementPolicyName: Schema.Literals(["default"]).pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/managementPolicies/{managementPolicyName}",
    }),
  );
export type ManagementPoliciesGetInput = typeof ManagementPoliciesGetInput.Type;

// Output Schema
export const ManagementPoliciesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagementPoliciesGetOutput =
  typeof ManagementPoliciesGetOutput.Type;

// The operation
/**
 * Gets the managementpolicy associated with the specified storage account.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 * @param managementPolicyName - The name of the Storage Account Management Policy. It should always be 'default'
 */
export const ManagementPoliciesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ManagementPoliciesGetInput,
    outputSchema: ManagementPoliciesGetOutput,
  }),
);
// Input Schema
export const NetworkSecurityPerimeterConfigurationsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    networkSecurityPerimeterConfigurationName: Schema.String.pipe(
      T.PathParam(),
    ),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/networkSecurityPerimeterConfigurations/{networkSecurityPerimeterConfigurationName}",
    }),
  );
export type NetworkSecurityPerimeterConfigurationsGetInput =
  typeof NetworkSecurityPerimeterConfigurationsGetInput.Type;

// Output Schema
export const NetworkSecurityPerimeterConfigurationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type NetworkSecurityPerimeterConfigurationsGetOutput =
  typeof NetworkSecurityPerimeterConfigurationsGetOutput.Type;

// The operation
/**
 * Gets effective NetworkSecurityPerimeterConfiguration for association
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 * @param networkSecurityPerimeterConfigurationName - The name for Network Security Perimeter configuration
 */
export const NetworkSecurityPerimeterConfigurationsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkSecurityPerimeterConfigurationsGetInput,
    outputSchema: NetworkSecurityPerimeterConfigurationsGetOutput,
  }));
// Input Schema
export const NetworkSecurityPerimeterConfigurationsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/networkSecurityPerimeterConfigurations",
    }),
  );
export type NetworkSecurityPerimeterConfigurationsListInput =
  typeof NetworkSecurityPerimeterConfigurationsListInput.Type;

// Output Schema
export const NetworkSecurityPerimeterConfigurationsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type NetworkSecurityPerimeterConfigurationsListOutput =
  typeof NetworkSecurityPerimeterConfigurationsListOutput.Type;

// The operation
/**
 * Gets list of effective NetworkSecurityPerimeterConfiguration for storage account
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 */
export const NetworkSecurityPerimeterConfigurationsList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkSecurityPerimeterConfigurationsListInput,
    outputSchema: NetworkSecurityPerimeterConfigurationsListOutput,
  }));
// Input Schema
export const NetworkSecurityPerimeterConfigurationsReconcileInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    networkSecurityPerimeterConfigurationName: Schema.String.pipe(
      T.PathParam(),
    ),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/networkSecurityPerimeterConfigurations/{networkSecurityPerimeterConfigurationName}/reconcile",
    }),
  );
export type NetworkSecurityPerimeterConfigurationsReconcileInput =
  typeof NetworkSecurityPerimeterConfigurationsReconcileInput.Type;

// Output Schema
export const NetworkSecurityPerimeterConfigurationsReconcileOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type NetworkSecurityPerimeterConfigurationsReconcileOutput =
  typeof NetworkSecurityPerimeterConfigurationsReconcileOutput.Type;

// The operation
/**
 * Refreshes any information about the association.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 * @param networkSecurityPerimeterConfigurationName - The name for Network Security Perimeter configuration
 */
export const NetworkSecurityPerimeterConfigurationsReconcile =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkSecurityPerimeterConfigurationsReconcileInput,
    outputSchema: NetworkSecurityPerimeterConfigurationsReconcileOutput,
  }));
// Input Schema
export const ObjectReplicationPoliciesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    objectReplicationPolicyId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/objectReplicationPolicies/{objectReplicationPolicyId}",
    }),
  );
export type ObjectReplicationPoliciesCreateOrUpdateInput =
  typeof ObjectReplicationPoliciesCreateOrUpdateInput.Type;

// Output Schema
export const ObjectReplicationPoliciesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ObjectReplicationPoliciesCreateOrUpdateOutput =
  typeof ObjectReplicationPoliciesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update the object replication policy of the storage account.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 * @param objectReplicationPolicyId - For the destination account, provide the value 'default'. Configure the policy on the destination account first. For the source account, provide the value of the policy ID that is returned when you download the policy that was defined on the destination account. The policy is downloaded as a JSON file.
 */
export const ObjectReplicationPoliciesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ObjectReplicationPoliciesCreateOrUpdateInput,
    outputSchema: ObjectReplicationPoliciesCreateOrUpdateOutput,
  }));
// Input Schema
export const ObjectReplicationPoliciesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    objectReplicationPolicyId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/objectReplicationPolicies/{objectReplicationPolicyId}",
    }),
  );
export type ObjectReplicationPoliciesDeleteInput =
  typeof ObjectReplicationPoliciesDeleteInput.Type;

// Output Schema
export const ObjectReplicationPoliciesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ObjectReplicationPoliciesDeleteOutput =
  typeof ObjectReplicationPoliciesDeleteOutput.Type;

// The operation
/**
 * Deletes the object replication policy associated with the specified storage account.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 * @param objectReplicationPolicyId - For the destination account, provide the value 'default'. Configure the policy on the destination account first. For the source account, provide the value of the policy ID that is returned when you download the policy that was defined on the destination account. The policy is downloaded as a JSON file.
 */
export const ObjectReplicationPoliciesDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ObjectReplicationPoliciesDeleteInput,
    outputSchema: ObjectReplicationPoliciesDeleteOutput,
  }));
// Input Schema
export const ObjectReplicationPoliciesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    objectReplicationPolicyId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/objectReplicationPolicies/{objectReplicationPolicyId}",
    }),
  );
export type ObjectReplicationPoliciesGetInput =
  typeof ObjectReplicationPoliciesGetInput.Type;

// Output Schema
export const ObjectReplicationPoliciesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ObjectReplicationPoliciesGetOutput =
  typeof ObjectReplicationPoliciesGetOutput.Type;

// The operation
/**
 * Get the object replication policy of the storage account by policy ID.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 * @param objectReplicationPolicyId - For the destination account, provide the value 'default'. Configure the policy on the destination account first. For the source account, provide the value of the policy ID that is returned when you download the policy that was defined on the destination account. The policy is downloaded as a JSON file.
 */
export const ObjectReplicationPoliciesGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ObjectReplicationPoliciesGetInput,
    outputSchema: ObjectReplicationPoliciesGetOutput,
  }));
// Input Schema
export const ObjectReplicationPoliciesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/objectReplicationPolicies",
    }),
  );
export type ObjectReplicationPoliciesListInput =
  typeof ObjectReplicationPoliciesListInput.Type;

// Output Schema
export const ObjectReplicationPoliciesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ObjectReplicationPoliciesListOutput =
  typeof ObjectReplicationPoliciesListOutput.Type;

// The operation
/**
 * List the object replication policies associated with the storage account.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 */
export const ObjectReplicationPoliciesList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ObjectReplicationPoliciesListInput,
    outputSchema: ObjectReplicationPoliciesListOutput,
  }));
// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  "api-version": Schema.String,
}).pipe(
  T.Http({ method: "GET", path: "/providers/Microsoft.Storage/operations" }),
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
                      dimensions: Schema.optional(
                        Schema.Array(
                          Schema.Struct({
                            name: Schema.optional(Schema.String),
                            displayName: Schema.optional(Schema.String),
                          }),
                        ),
                      ),
                      aggregationType: Schema.optional(Schema.String),
                      fillGapWithZero: Schema.optional(Schema.Boolean),
                      category: Schema.optional(Schema.String),
                      resourceIdDimensionNameOverride: Schema.optional(
                        Schema.String,
                      ),
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
 * Lists all of the available Storage Rest API operations.
 *
 * @param api-version - The API version to use for this operation.
 */
export const OperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationsListInput,
  outputSchema: OperationsListOutput,
}));
// Input Schema
export const PrivateEndpointConnectionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/privateEndpointConnections/{privateEndpointConnectionName}",
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
 * Deletes the specified private endpoint connection associated with the storage account.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 * @param privateEndpointConnectionName - The name of the private endpoint connection associated with the Azure resource
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
    accountName: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/privateEndpointConnections/{privateEndpointConnectionName}",
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
 * Gets the specified private endpoint connection associated with the storage account.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 * @param privateEndpointConnectionName - The name of the private endpoint connection associated with the Azure resource
 */
export const PrivateEndpointConnectionsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsGetInput,
    outputSchema: PrivateEndpointConnectionsGetOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/privateEndpointConnections",
    }),
  );
export type PrivateEndpointConnectionsListInput =
  typeof PrivateEndpointConnectionsListInput.Type;

// Output Schema
export const PrivateEndpointConnectionsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type PrivateEndpointConnectionsListOutput =
  typeof PrivateEndpointConnectionsListOutput.Type;

// The operation
/**
 * List all the private endpoint connections associated with the storage account.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 */
export const PrivateEndpointConnectionsList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsListInput,
    outputSchema: PrivateEndpointConnectionsListOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsPutInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type PrivateEndpointConnectionsPutInput =
  typeof PrivateEndpointConnectionsPutInput.Type;

// Output Schema
export const PrivateEndpointConnectionsPutOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PrivateEndpointConnectionsPutOutput =
  typeof PrivateEndpointConnectionsPutOutput.Type;

// The operation
/**
 * Update the state of specified private endpoint connection associated with the storage account.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 * @param privateEndpointConnectionName - The name of the private endpoint connection associated with the Azure resource
 */
export const PrivateEndpointConnectionsPut =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsPutInput,
    outputSchema: PrivateEndpointConnectionsPutOutput,
  }));
// Input Schema
export const QueueCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  accountName: Schema.String.pipe(T.PathParam()),
  queueName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/queueServices/default/queues/{queueName}",
  }),
);
export type QueueCreateInput = typeof QueueCreateInput.Type;

// Output Schema
export const QueueCreateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type QueueCreateOutput = typeof QueueCreateOutput.Type;

// The operation
/**
 * Creates a new queue with the specified queue name, under the specified account.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 * @param queueName - A queue name must be unique within a storage account and must be between 3 and 63 characters.The name must comprise of lowercase alphanumeric and dash(-) characters only, it should begin and end with an alphanumeric character and it cannot have two consecutive dash(-) characters.
 */
export const QueueCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: QueueCreateInput,
  outputSchema: QueueCreateOutput,
}));
// Input Schema
export const QueueDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  accountName: Schema.String.pipe(T.PathParam()),
  queueName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/queueServices/default/queues/{queueName}",
  }),
);
export type QueueDeleteInput = typeof QueueDeleteInput.Type;

// Output Schema
export const QueueDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type QueueDeleteOutput = typeof QueueDeleteOutput.Type;

// The operation
/**
 * Deletes the queue with the specified queue name, under the specified account if it exists.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 * @param queueName - A queue name must be unique within a storage account and must be between 3 and 63 characters.The name must comprise of lowercase alphanumeric and dash(-) characters only, it should begin and end with an alphanumeric character and it cannot have two consecutive dash(-) characters.
 */
export const QueueDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: QueueDeleteInput,
  outputSchema: QueueDeleteOutput,
}));
// Input Schema
export const QueueGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  accountName: Schema.String.pipe(T.PathParam()),
  queueName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/queueServices/default/queues/{queueName}",
  }),
);
export type QueueGetInput = typeof QueueGetInput.Type;

// Output Schema
export const QueueGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type QueueGetOutput = typeof QueueGetOutput.Type;

// The operation
/**
 * Gets the queue with the specified queue name, under the specified account if it exists.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 * @param queueName - A queue name must be unique within a storage account and must be between 3 and 63 characters.The name must comprise of lowercase alphanumeric and dash(-) characters only, it should begin and end with an alphanumeric character and it cannot have two consecutive dash(-) characters.
 */
export const QueueGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: QueueGetInput,
  outputSchema: QueueGetOutput,
}));
// Input Schema
export const QueueServicesGetServicePropertiesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/queueServices/default",
    }),
  );
export type QueueServicesGetServicePropertiesInput =
  typeof QueueServicesGetServicePropertiesInput.Type;

// Output Schema
export const QueueServicesGetServicePropertiesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type QueueServicesGetServicePropertiesOutput =
  typeof QueueServicesGetServicePropertiesOutput.Type;

// The operation
/**
 * Gets the properties of a storage account’s Queue service, including properties for Storage Analytics and CORS (Cross-Origin Resource Sharing) rules.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 */
export const QueueServicesGetServiceProperties =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: QueueServicesGetServicePropertiesInput,
    outputSchema: QueueServicesGetServicePropertiesOutput,
  }));
// Input Schema
export const QueueServicesListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/queueServices",
  }),
);
export type QueueServicesListInput = typeof QueueServicesListInput.Type;

// Output Schema
export const QueueServicesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
  });
export type QueueServicesListOutput = typeof QueueServicesListOutput.Type;

// The operation
/**
 * List all queue services for the storage account
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 */
export const QueueServicesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: QueueServicesListInput,
  outputSchema: QueueServicesListOutput,
}));
// Input Schema
export const QueueServicesSetServicePropertiesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/queueServices/default",
    }),
  );
export type QueueServicesSetServicePropertiesInput =
  typeof QueueServicesSetServicePropertiesInput.Type;

// Output Schema
export const QueueServicesSetServicePropertiesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type QueueServicesSetServicePropertiesOutput =
  typeof QueueServicesSetServicePropertiesOutput.Type;

// The operation
/**
 * Sets the properties of a storage account’s Queue service, including properties for Storage Analytics and CORS (Cross-Origin Resource Sharing) rules.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 */
export const QueueServicesSetServiceProperties =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: QueueServicesSetServicePropertiesInput,
    outputSchema: QueueServicesSetServicePropertiesOutput,
  }));
// Input Schema
export const QueueUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  accountName: Schema.String.pipe(T.PathParam()),
  queueName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/queueServices/default/queues/{queueName}",
  }),
);
export type QueueUpdateInput = typeof QueueUpdateInput.Type;

// Output Schema
export const QueueUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type QueueUpdateOutput = typeof QueueUpdateOutput.Type;

// The operation
/**
 * Creates a new queue with the specified queue name, under the specified account.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 * @param queueName - A queue name must be unique within a storage account and must be between 3 and 63 characters.The name must comprise of lowercase alphanumeric and dash(-) characters only, it should begin and end with an alphanumeric character and it cannot have two consecutive dash(-) characters.
 */
export const QueueUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: QueueUpdateInput,
  outputSchema: QueueUpdateOutput,
}));
// Input Schema
export const SkusListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.Storage/skus",
  }),
);
export type SkusListInput = typeof SkusListInput.Type;

// Output Schema
export const SkusListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        name: Schema.Literals([
          "Standard_LRS",
          "Standard_GRS",
          "Standard_RAGRS",
          "Standard_ZRS",
          "Premium_LRS",
          "Premium_ZRS",
          "Standard_GZRS",
          "Standard_RAGZRS",
          "StandardV2_LRS",
          "StandardV2_GRS",
          "StandardV2_ZRS",
          "StandardV2_GZRS",
          "PremiumV2_LRS",
          "PremiumV2_ZRS",
        ]),
        tier: Schema.optional(Schema.Literals(["Standard", "Premium"])),
        resourceType: Schema.optional(Schema.String),
        kind: Schema.optional(
          Schema.Literals([
            "Storage",
            "StorageV2",
            "BlobStorage",
            "FileStorage",
            "BlockBlobStorage",
          ]),
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
        capabilities: Schema.optional(
          Schema.Array(
            Schema.Struct({
              name: Schema.optional(Schema.String),
              value: Schema.optional(Schema.String),
            }),
          ),
        ),
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
  nextLink: Schema.optional(Schema.String),
});
export type SkusListOutput = typeof SkusListOutput.Type;

// The operation
/**
 * Lists the available SKUs supported by Microsoft.Storage for given subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const SkusList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SkusListInput,
  outputSchema: SkusListOutput,
}));
// Input Schema
export const StorageAccountsAbortHierarchicalNamespaceMigrationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/aborthnsonmigration",
    }),
  );
export type StorageAccountsAbortHierarchicalNamespaceMigrationInput =
  typeof StorageAccountsAbortHierarchicalNamespaceMigrationInput.Type;

// Output Schema
export const StorageAccountsAbortHierarchicalNamespaceMigrationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type StorageAccountsAbortHierarchicalNamespaceMigrationOutput =
  typeof StorageAccountsAbortHierarchicalNamespaceMigrationOutput.Type;

// The operation
/**
 * Abort live Migration of storage account to enable Hns
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 */
export const StorageAccountsAbortHierarchicalNamespaceMigration =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: StorageAccountsAbortHierarchicalNamespaceMigrationInput,
    outputSchema: StorageAccountsAbortHierarchicalNamespaceMigrationOutput,
  }));
// Input Schema
export const StorageAccountsCheckNameAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Storage/checkNameAvailability",
    }),
  );
export type StorageAccountsCheckNameAvailabilityInput =
  typeof StorageAccountsCheckNameAvailabilityInput.Type;

// Output Schema
export const StorageAccountsCheckNameAvailabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nameAvailable: Schema.optional(Schema.Boolean),
    reason: Schema.optional(
      Schema.Literals(["AccountNameInvalid", "AlreadyExists"]),
    ),
    message: Schema.optional(Schema.String),
  });
export type StorageAccountsCheckNameAvailabilityOutput =
  typeof StorageAccountsCheckNameAvailabilityOutput.Type;

// The operation
/**
 * Checks that the storage account name is valid and is not already in use.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const StorageAccountsCheckNameAvailability =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: StorageAccountsCheckNameAvailabilityInput,
    outputSchema: StorageAccountsCheckNameAvailabilityOutput,
  }));
// Input Schema
export const StorageAccountsCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}",
    }),
  );
export type StorageAccountsCreateInput = typeof StorageAccountsCreateInput.Type;

// Output Schema
export const StorageAccountsCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type StorageAccountsCreateOutput =
  typeof StorageAccountsCreateOutput.Type;

// The operation
/**
 * Asynchronously creates a new storage account with the specified parameters. If an account is already created and a subsequent create request is issued with different properties, the account properties will be updated. If an account is already created and a subsequent create or update request is issued with the exact same set of properties, the request will succeed.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 */
export const StorageAccountsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: StorageAccountsCreateInput,
    outputSchema: StorageAccountsCreateOutput,
  }),
);
// Input Schema
export const StorageAccountsCustomerInitiatedMigrationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/startAccountMigration",
    }),
  );
export type StorageAccountsCustomerInitiatedMigrationInput =
  typeof StorageAccountsCustomerInitiatedMigrationInput.Type;

// Output Schema
export const StorageAccountsCustomerInitiatedMigrationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type StorageAccountsCustomerInitiatedMigrationOutput =
  typeof StorageAccountsCustomerInitiatedMigrationOutput.Type;

// The operation
/**
 * Account Migration request can be triggered for a storage account to change its redundancy level. The migration updates the non-zonal redundant storage account to a zonal redundant account or vice-versa in order to have better reliability and availability. Zone-redundant storage (ZRS) replicates your storage account synchronously across three Azure availability zones in the primary region.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 */
export const StorageAccountsCustomerInitiatedMigration =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: StorageAccountsCustomerInitiatedMigrationInput,
    outputSchema: StorageAccountsCustomerInitiatedMigrationOutput,
  }));
// Input Schema
export const StorageAccountsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}",
    }),
  );
export type StorageAccountsDeleteInput = typeof StorageAccountsDeleteInput.Type;

// Output Schema
export const StorageAccountsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type StorageAccountsDeleteOutput =
  typeof StorageAccountsDeleteOutput.Type;

// The operation
/**
 * Deletes a storage account in Microsoft Azure.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 */
export const StorageAccountsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: StorageAccountsDeleteInput,
    outputSchema: StorageAccountsDeleteOutput,
  }),
);
// Input Schema
export const StorageAccountsFailoverInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    failoverType: Schema.optional(Schema.Literals(["Planned"])),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/failover",
    }),
  );
export type StorageAccountsFailoverInput =
  typeof StorageAccountsFailoverInput.Type;

// Output Schema
export const StorageAccountsFailoverOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type StorageAccountsFailoverOutput =
  typeof StorageAccountsFailoverOutput.Type;

// The operation
/**
 * A failover request can be triggered for a storage account in the event a primary endpoint becomes unavailable for any reason. The failover occurs from the storage account's primary cluster to the secondary cluster for RA-GRS accounts. The secondary cluster will become primary after failover and the account is converted to LRS. In the case of a Planned Failover, the primary and secondary clusters are swapped after failover and the account remains geo-replicated. Failover should continue to be used in the event of availability issues as Planned failover is only available while the primary and secondary endpoints are available. The primary use case of a Planned Failover is disaster recovery testing drills. This type of failover is invoked by setting FailoverType parameter to 'Planned'. Learn more about the failover options here- https://learn.microsoft.com/azure/storage/common/storage-disaster-recovery-guidance
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 * @param failoverType - The parameter is set to 'Planned' to indicate whether a Planned failover is requested.
 */
export const StorageAccountsFailover = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: StorageAccountsFailoverInput,
    outputSchema: StorageAccountsFailoverOutput,
  }),
);
// Input Schema
export const StorageAccountsGetCustomerInitiatedMigrationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    migrationName: Schema.Literals(["default"]).pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/accountMigrations/{migrationName}",
    }),
  );
export type StorageAccountsGetCustomerInitiatedMigrationInput =
  typeof StorageAccountsGetCustomerInitiatedMigrationInput.Type;

// Output Schema
export const StorageAccountsGetCustomerInitiatedMigrationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type StorageAccountsGetCustomerInitiatedMigrationOutput =
  typeof StorageAccountsGetCustomerInitiatedMigrationOutput.Type;

// The operation
/**
 * Gets the status of the ongoing migration for the specified storage account.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 * @param migrationName - The name of the Storage Account Migration. It should always be 'default'
 */
export const StorageAccountsGetCustomerInitiatedMigration =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: StorageAccountsGetCustomerInitiatedMigrationInput,
    outputSchema: StorageAccountsGetCustomerInitiatedMigrationOutput,
  }));
// Input Schema
export const StorageAccountsGetPropertiesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $expand: Schema.optional(
      Schema.Literals(["geoReplicationStats", "blobRestoreStatus"]),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}",
    }),
  );
export type StorageAccountsGetPropertiesInput =
  typeof StorageAccountsGetPropertiesInput.Type;

// Output Schema
export const StorageAccountsGetPropertiesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type StorageAccountsGetPropertiesOutput =
  typeof StorageAccountsGetPropertiesOutput.Type;

// The operation
/**
 * Returns the properties for the specified storage account including but not limited to name, SKU name, location, and account status. The ListKeys operation should be used to retrieve storage keys.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 * @param $expand - May be used to expand the properties within account's properties. By default, data is not included when fetching properties. Currently we only support geoReplicationStats and blobRestoreStatus.
 */
export const StorageAccountsGetProperties =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: StorageAccountsGetPropertiesInput,
    outputSchema: StorageAccountsGetPropertiesOutput,
  }));
// Input Schema
export const StorageAccountsHierarchicalNamespaceMigrationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    requestType: Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/hnsonmigration",
    }),
  );
export type StorageAccountsHierarchicalNamespaceMigrationInput =
  typeof StorageAccountsHierarchicalNamespaceMigrationInput.Type;

// Output Schema
export const StorageAccountsHierarchicalNamespaceMigrationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type StorageAccountsHierarchicalNamespaceMigrationOutput =
  typeof StorageAccountsHierarchicalNamespaceMigrationOutput.Type;

// The operation
/**
 * Live Migration of storage account to enable Hns
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 * @param requestType - Required. Hierarchical namespace migration type can either be a hierarchical namespace validation request 'HnsOnValidationRequest' or a hydration request 'HnsOnHydrationRequest'. The validation request will validate the migration whereas the hydration request will migrate the account.
 */
export const StorageAccountsHierarchicalNamespaceMigration =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: StorageAccountsHierarchicalNamespaceMigrationInput,
    outputSchema: StorageAccountsHierarchicalNamespaceMigrationOutput,
  }));
// Input Schema
export const StorageAccountsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Storage/storageAccounts",
    }),
  );
export type StorageAccountsListInput = typeof StorageAccountsListInput.Type;

// Output Schema
export const StorageAccountsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type StorageAccountsListOutput = typeof StorageAccountsListOutput.Type;

// The operation
/**
 * Lists all the storage accounts available under the subscription. Note that storage keys are not returned; use the ListKeys operation for this.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const StorageAccountsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: StorageAccountsListInput,
  outputSchema: StorageAccountsListOutput,
}));
// Input Schema
export const StorageAccountsListAccountSASInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/listAccountSas",
    }),
  );
export type StorageAccountsListAccountSASInput =
  typeof StorageAccountsListAccountSASInput.Type;

// Output Schema
export const StorageAccountsListAccountSASOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountSasToken: Schema.optional(Schema.String),
  });
export type StorageAccountsListAccountSASOutput =
  typeof StorageAccountsListAccountSASOutput.Type;

// The operation
/**
 * List SAS credentials of a storage account.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 */
export const StorageAccountsListAccountSAS =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: StorageAccountsListAccountSASInput,
    outputSchema: StorageAccountsListAccountSASOutput,
  }));
// Input Schema
export const StorageAccountsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts",
    }),
  );
export type StorageAccountsListByResourceGroupInput =
  typeof StorageAccountsListByResourceGroupInput.Type;

// Output Schema
export const StorageAccountsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type StorageAccountsListByResourceGroupOutput =
  typeof StorageAccountsListByResourceGroupOutput.Type;

// The operation
/**
 * Lists all the storage accounts available under the given resource group. Note that storage keys are not returned; use the ListKeys operation for this.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const StorageAccountsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: StorageAccountsListByResourceGroupInput,
    outputSchema: StorageAccountsListByResourceGroupOutput,
  }));
// Input Schema
export const StorageAccountsListKeysInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $expand: Schema.optional(Schema.Literals(["kerb"])),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/listKeys",
    }),
  );
export type StorageAccountsListKeysInput =
  typeof StorageAccountsListKeysInput.Type;

// Output Schema
export const StorageAccountsListKeysOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    keys: Schema.optional(
      Schema.Array(
        Schema.Struct({
          keyName: Schema.optional(Schema.String),
          value: Schema.optional(Schema.String),
          permissions: Schema.optional(Schema.Literals(["Read", "Full"])),
          creationTime: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type StorageAccountsListKeysOutput =
  typeof StorageAccountsListKeysOutput.Type;

// The operation
/**
 * Lists the access keys or Kerberos keys (if active directory enabled) for the specified storage account.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 * @param $expand - Specifies type of the key to be listed. Possible value is kerb.
 */
export const StorageAccountsListKeys = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: StorageAccountsListKeysInput,
    outputSchema: StorageAccountsListKeysOutput,
  }),
);
// Input Schema
export const StorageAccountsListServiceSASInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/listServiceSas",
    }),
  );
export type StorageAccountsListServiceSASInput =
  typeof StorageAccountsListServiceSASInput.Type;

// Output Schema
export const StorageAccountsListServiceSASOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    serviceSasToken: Schema.optional(Schema.String),
  });
export type StorageAccountsListServiceSASOutput =
  typeof StorageAccountsListServiceSASOutput.Type;

// The operation
/**
 * List service SAS credentials of a specific resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 */
export const StorageAccountsListServiceSAS =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: StorageAccountsListServiceSASInput,
    outputSchema: StorageAccountsListServiceSASOutput,
  }));
// Input Schema
export const StorageAccountsRegenerateKeyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/regenerateKey",
    }),
  );
export type StorageAccountsRegenerateKeyInput =
  typeof StorageAccountsRegenerateKeyInput.Type;

// Output Schema
export const StorageAccountsRegenerateKeyOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    keys: Schema.optional(
      Schema.Array(
        Schema.Struct({
          keyName: Schema.optional(Schema.String),
          value: Schema.optional(Schema.String),
          permissions: Schema.optional(Schema.Literals(["Read", "Full"])),
          creationTime: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type StorageAccountsRegenerateKeyOutput =
  typeof StorageAccountsRegenerateKeyOutput.Type;

// The operation
/**
 * Regenerates one of the access keys or Kerberos keys for the specified storage account.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 */
export const StorageAccountsRegenerateKey =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: StorageAccountsRegenerateKeyInput,
    outputSchema: StorageAccountsRegenerateKeyOutput,
  }));
// Input Schema
export const StorageAccountsRestoreBlobRangesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/restoreBlobRanges",
    }),
  );
export type StorageAccountsRestoreBlobRangesInput =
  typeof StorageAccountsRestoreBlobRangesInput.Type;

// Output Schema
export const StorageAccountsRestoreBlobRangesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    status: Schema.optional(
      Schema.Literals(["InProgress", "Complete", "Failed"]),
    ),
    failureReason: Schema.optional(Schema.String),
    restoreId: Schema.optional(Schema.String),
    parameters: Schema.optional(
      Schema.Struct({
        timeToRestore: Schema.String,
        blobRanges: Schema.Array(
          Schema.Struct({
            startRange: Schema.String,
            endRange: Schema.String,
          }),
        ),
      }),
    ),
  });
export type StorageAccountsRestoreBlobRangesOutput =
  typeof StorageAccountsRestoreBlobRangesOutput.Type;

// The operation
/**
 * Restore blobs in the specified blob ranges
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 */
export const StorageAccountsRestoreBlobRanges =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: StorageAccountsRestoreBlobRangesInput,
    outputSchema: StorageAccountsRestoreBlobRangesOutput,
  }));
// Input Schema
export const StorageAccountsRevokeUserDelegationKeysInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/revokeUserDelegationKeys",
    }),
  );
export type StorageAccountsRevokeUserDelegationKeysInput =
  typeof StorageAccountsRevokeUserDelegationKeysInput.Type;

// Output Schema
export const StorageAccountsRevokeUserDelegationKeysOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type StorageAccountsRevokeUserDelegationKeysOutput =
  typeof StorageAccountsRevokeUserDelegationKeysOutput.Type;

// The operation
/**
 * Revoke user delegation keys.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 */
export const StorageAccountsRevokeUserDelegationKeys =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: StorageAccountsRevokeUserDelegationKeysInput,
    outputSchema: StorageAccountsRevokeUserDelegationKeysOutput,
  }));
// Input Schema
export const StorageAccountsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}",
    }),
  );
export type StorageAccountsUpdateInput = typeof StorageAccountsUpdateInput.Type;

// Output Schema
export const StorageAccountsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type StorageAccountsUpdateOutput =
  typeof StorageAccountsUpdateOutput.Type;

// The operation
/**
 * The update operation can be used to update the SKU, encryption, access tier, or tags for a storage account. It can also be used to map the account to a custom domain. Only one custom domain is supported per storage account; the replacement/change of custom domain is not supported. In order to replace an old custom domain, the old value must be cleared/unregistered before a new value can be set. The update of multiple properties is supported. This call does not change the storage keys for the account. If you want to change the storage account keys, use the regenerate keys operation. The location and name of the storage account cannot be changed after creation.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 */
export const StorageAccountsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: StorageAccountsUpdateInput,
    outputSchema: StorageAccountsUpdateOutput,
  }),
);
// Input Schema
export const StorageTaskAssignmentInstancesReportListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    storageTaskAssignmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $maxpagesize: Schema.optional(Schema.Number),
    $filter: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/storageTaskAssignments/{storageTaskAssignmentName}/reports",
    }),
  );
export type StorageTaskAssignmentInstancesReportListInput =
  typeof StorageTaskAssignmentInstancesReportListInput.Type;

// Output Schema
export const StorageTaskAssignmentInstancesReportListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type StorageTaskAssignmentInstancesReportListOutput =
  typeof StorageTaskAssignmentInstancesReportListOutput.Type;

// The operation
/**
 * Fetch the report summary of a single storage task assignment's instances
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 * @param storageTaskAssignmentName - The name of the storage task assignment within the specified resource group. Storage task assignment names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 * @param $maxpagesize - Optional, specifies the maximum number of storage task assignment instances to be included in the list response.
 * @param $filter - Optional. When specified, it can be used to query using reporting properties. See [Constructing Filter Strings](https://learn.microsoft.com/rest/api/storageservices/querying-tables-and-entities#constructing-filter-strings) for details.
 */
export const StorageTaskAssignmentInstancesReportList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: StorageTaskAssignmentInstancesReportListInput,
    outputSchema: StorageTaskAssignmentInstancesReportListOutput,
  }));
// Input Schema
export const StorageTaskAssignmentsCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    storageTaskAssignmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/storageTaskAssignments/{storageTaskAssignmentName}",
    }),
  );
export type StorageTaskAssignmentsCreateInput =
  typeof StorageTaskAssignmentsCreateInput.Type;

// Output Schema
export const StorageTaskAssignmentsCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type StorageTaskAssignmentsCreateOutput =
  typeof StorageTaskAssignmentsCreateOutput.Type;

// The operation
/**
 * Asynchronously creates a new storage task assignment sub-resource with the specified parameters. If a storage task assignment is already created and a subsequent create request is issued with different properties, the storage task assignment properties will be updated. If a storage task assignment is already created and a subsequent create or update request is issued with the exact same set of properties, the request will succeed.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 * @param storageTaskAssignmentName - The name of the storage task assignment within the specified resource group. Storage task assignment names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 */
export const StorageTaskAssignmentsCreate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: StorageTaskAssignmentsCreateInput,
    outputSchema: StorageTaskAssignmentsCreateOutput,
  }));
// Input Schema
export const StorageTaskAssignmentsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    storageTaskAssignmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/storageTaskAssignments/{storageTaskAssignmentName}",
    }),
  );
export type StorageTaskAssignmentsDeleteInput =
  typeof StorageTaskAssignmentsDeleteInput.Type;

// Output Schema
export const StorageTaskAssignmentsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type StorageTaskAssignmentsDeleteOutput =
  typeof StorageTaskAssignmentsDeleteOutput.Type;

// The operation
/**
 * Delete the storage task assignment sub-resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 * @param storageTaskAssignmentName - The name of the storage task assignment within the specified resource group. Storage task assignment names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 */
export const StorageTaskAssignmentsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: StorageTaskAssignmentsDeleteInput,
    outputSchema: StorageTaskAssignmentsDeleteOutput,
  }));
// Input Schema
export const StorageTaskAssignmentsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    storageTaskAssignmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/storageTaskAssignments/{storageTaskAssignmentName}",
    }),
  );
export type StorageTaskAssignmentsGetInput =
  typeof StorageTaskAssignmentsGetInput.Type;

// Output Schema
export const StorageTaskAssignmentsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type StorageTaskAssignmentsGetOutput =
  typeof StorageTaskAssignmentsGetOutput.Type;

// The operation
/**
 * Get the storage task assignment properties
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 * @param storageTaskAssignmentName - The name of the storage task assignment within the specified resource group. Storage task assignment names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 */
export const StorageTaskAssignmentsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: StorageTaskAssignmentsGetInput,
    outputSchema: StorageTaskAssignmentsGetOutput,
  }),
);
// Input Schema
export const StorageTaskAssignmentsInstancesReportListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $maxpagesize: Schema.optional(Schema.Number),
    $filter: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/reports",
    }),
  );
export type StorageTaskAssignmentsInstancesReportListInput =
  typeof StorageTaskAssignmentsInstancesReportListInput.Type;

// Output Schema
export const StorageTaskAssignmentsInstancesReportListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type StorageTaskAssignmentsInstancesReportListOutput =
  typeof StorageTaskAssignmentsInstancesReportListOutput.Type;

// The operation
/**
 * Fetch the report summary of all the storage task assignments and instances in an account
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 * @param $maxpagesize - Optional, specifies the maximum number of storage task assignment instances to be included in the list response.
 * @param $filter - Optional. When specified, it can be used to query using reporting properties. See [Constructing Filter Strings](https://learn.microsoft.com/rest/api/storageservices/querying-tables-and-entities#constructing-filter-strings) for details.
 */
export const StorageTaskAssignmentsInstancesReportList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: StorageTaskAssignmentsInstancesReportListInput,
    outputSchema: StorageTaskAssignmentsInstancesReportListOutput,
  }));
// Input Schema
export const StorageTaskAssignmentsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $top: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/storageTaskAssignments",
    }),
  );
export type StorageTaskAssignmentsListInput =
  typeof StorageTaskAssignmentsListInput.Type;

// Output Schema
export const StorageTaskAssignmentsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        type: Schema.optional(Schema.String),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type StorageTaskAssignmentsListOutput =
  typeof StorageTaskAssignmentsListOutput.Type;

// The operation
/**
 * List all the storage task assignments in an account
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 * @param $top - Optional, specifies the maximum number of storage task assignment Ids to be included in the list response.
 */
export const StorageTaskAssignmentsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: StorageTaskAssignmentsListInput,
    outputSchema: StorageTaskAssignmentsListOutput,
  }),
);
// Input Schema
export const StorageTaskAssignmentsStopAssignmentInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    storageTaskAssignmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/storageTaskAssignments/{storageTaskAssignmentName}/stopAssignment",
    }),
  );
export type StorageTaskAssignmentsStopAssignmentInput =
  typeof StorageTaskAssignmentsStopAssignmentInput.Type;

// Output Schema
export const StorageTaskAssignmentsStopAssignmentOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type StorageTaskAssignmentsStopAssignmentOutput =
  typeof StorageTaskAssignmentsStopAssignmentOutput.Type;

// The operation
/**
 * Stops any active running storage action for the storage task assignment
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 * @param storageTaskAssignmentName - The name of the storage task assignment within the specified resource group. Storage task assignment names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 */
export const StorageTaskAssignmentsStopAssignment =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: StorageTaskAssignmentsStopAssignmentInput,
    outputSchema: StorageTaskAssignmentsStopAssignmentOutput,
  }));
// Input Schema
export const StorageTaskAssignmentsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    storageTaskAssignmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/storageTaskAssignments/{storageTaskAssignmentName}",
    }),
  );
export type StorageTaskAssignmentsUpdateInput =
  typeof StorageTaskAssignmentsUpdateInput.Type;

// Output Schema
export const StorageTaskAssignmentsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type StorageTaskAssignmentsUpdateOutput =
  typeof StorageTaskAssignmentsUpdateOutput.Type;

// The operation
/**
 * Update storage task assignment properties
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 * @param storageTaskAssignmentName - The name of the storage task assignment within the specified resource group. Storage task assignment names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 */
export const StorageTaskAssignmentsUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: StorageTaskAssignmentsUpdateInput,
    outputSchema: StorageTaskAssignmentsUpdateOutput,
  }));
// Input Schema
export const TableCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  accountName: Schema.String.pipe(T.PathParam()),
  tableName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/tableServices/default/tables/{tableName}",
  }),
);
export type TableCreateInput = typeof TableCreateInput.Type;

// Output Schema
export const TableCreateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type TableCreateOutput = typeof TableCreateOutput.Type;

// The operation
/**
 * Creates a new table with the specified table name, under the specified account.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 * @param tableName - A table name must be unique within a storage account and must be between 3 and 63 characters.The name must comprise of only alphanumeric characters and it cannot begin with a numeric character.
 */
export const TableCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TableCreateInput,
  outputSchema: TableCreateOutput,
}));
// Input Schema
export const TableDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  accountName: Schema.String.pipe(T.PathParam()),
  tableName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/tableServices/default/tables/{tableName}",
  }),
);
export type TableDeleteInput = typeof TableDeleteInput.Type;

// Output Schema
export const TableDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type TableDeleteOutput = typeof TableDeleteOutput.Type;

// The operation
/**
 * Deletes the table with the specified table name, under the specified account if it exists.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 * @param tableName - A table name must be unique within a storage account and must be between 3 and 63 characters.The name must comprise of only alphanumeric characters and it cannot begin with a numeric character.
 */
export const TableDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TableDeleteInput,
  outputSchema: TableDeleteOutput,
}));
// Input Schema
export const TableGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  accountName: Schema.String.pipe(T.PathParam()),
  tableName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/tableServices/default/tables/{tableName}",
  }),
);
export type TableGetInput = typeof TableGetInput.Type;

// Output Schema
export const TableGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type TableGetOutput = typeof TableGetOutput.Type;

// The operation
/**
 * Gets the table with the specified table name, under the specified account if it exists.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 * @param tableName - A table name must be unique within a storage account and must be between 3 and 63 characters.The name must comprise of only alphanumeric characters and it cannot begin with a numeric character.
 */
export const TableGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TableGetInput,
  outputSchema: TableGetOutput,
}));
// Input Schema
export const TableListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  accountName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/tableServices/default/tables",
  }),
);
export type TableListInput = typeof TableListInput.Type;

// Output Schema
export const TableListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(Schema.Struct({})),
  nextLink: Schema.optional(Schema.String),
});
export type TableListOutput = typeof TableListOutput.Type;

// The operation
/**
 * Gets a list of all the tables under the specified storage account
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 */
export const TableList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TableListInput,
  outputSchema: TableListOutput,
}));
// Input Schema
export const TableServicesGetServicePropertiesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/tableServices/default",
    }),
  );
export type TableServicesGetServicePropertiesInput =
  typeof TableServicesGetServicePropertiesInput.Type;

// Output Schema
export const TableServicesGetServicePropertiesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type TableServicesGetServicePropertiesOutput =
  typeof TableServicesGetServicePropertiesOutput.Type;

// The operation
/**
 * Gets the properties of a storage account’s Table service, including properties for Storage Analytics and CORS (Cross-Origin Resource Sharing) rules.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 */
export const TableServicesGetServiceProperties =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: TableServicesGetServicePropertiesInput,
    outputSchema: TableServicesGetServicePropertiesOutput,
  }));
// Input Schema
export const TableServicesListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/tableServices",
  }),
);
export type TableServicesListInput = typeof TableServicesListInput.Type;

// Output Schema
export const TableServicesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
  });
export type TableServicesListOutput = typeof TableServicesListOutput.Type;

// The operation
/**
 * List all table services for the storage account.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 */
export const TableServicesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TableServicesListInput,
  outputSchema: TableServicesListOutput,
}));
// Input Schema
export const TableServicesSetServicePropertiesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/tableServices/default",
    }),
  );
export type TableServicesSetServicePropertiesInput =
  typeof TableServicesSetServicePropertiesInput.Type;

// Output Schema
export const TableServicesSetServicePropertiesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type TableServicesSetServicePropertiesOutput =
  typeof TableServicesSetServicePropertiesOutput.Type;

// The operation
/**
 * Sets the properties of a storage account’s Table service, including properties for Storage Analytics and CORS (Cross-Origin Resource Sharing) rules.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 */
export const TableServicesSetServiceProperties =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: TableServicesSetServicePropertiesInput,
    outputSchema: TableServicesSetServicePropertiesOutput,
  }));
// Input Schema
export const TableUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  accountName: Schema.String.pipe(T.PathParam()),
  tableName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/tableServices/default/tables/{tableName}",
  }),
);
export type TableUpdateInput = typeof TableUpdateInput.Type;

// Output Schema
export const TableUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type TableUpdateOutput = typeof TableUpdateOutput.Type;

// The operation
/**
 * Creates a new table with the specified table name, under the specified account.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
 * @param tableName - A table name must be unique within a storage account and must be between 3 and 63 characters.The name must comprise of only alphanumeric characters and it cannot begin with a numeric character.
 */
export const TableUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TableUpdateInput,
  outputSchema: TableUpdateOutput,
}));
// Input Schema
export const UsagesListByLocationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Storage/locations/{location}/usages",
    }),
  );
export type UsagesListByLocationInput = typeof UsagesListByLocationInput.Type;

// Output Schema
export const UsagesListByLocationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          unit: Schema.optional(
            Schema.Literals([
              "Count",
              "Bytes",
              "Seconds",
              "Percent",
              "CountsPerSecond",
              "BytesPerSecond",
            ]),
          ),
          currentValue: Schema.optional(Schema.Number),
          limit: Schema.optional(Schema.Number),
          name: Schema.optional(
            Schema.Struct({
              value: Schema.optional(Schema.String),
              localizedValue: Schema.optional(Schema.String),
            }),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type UsagesListByLocationOutput = typeof UsagesListByLocationOutput.Type;

// The operation
/**
 * Gets the current usage count and the limit for the resources of the location under the subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param location - The name of the Azure region.
 */
export const UsagesListByLocation = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: UsagesListByLocationInput,
    outputSchema: UsagesListByLocationOutput,
  }),
);
