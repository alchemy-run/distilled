/**
 * Azure Redisenterprise API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const AccessPolicyAssignmentCreateUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redisEnterprise/{clusterName}/databases/{databaseName}/accessPolicyAssignments/{accessPolicyAssignmentName}",
    }),
  );
export type AccessPolicyAssignmentCreateUpdateInput =
  typeof AccessPolicyAssignmentCreateUpdateInput.Type;

// Output Schema
export const AccessPolicyAssignmentCreateUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type AccessPolicyAssignmentCreateUpdateOutput =
  typeof AccessPolicyAssignmentCreateUpdateOutput.Type;

// The operation
/**
 * Creates/Updates a particular access policy assignment for a database
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const AccessPolicyAssignmentCreateUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AccessPolicyAssignmentCreateUpdateInput,
    outputSchema: AccessPolicyAssignmentCreateUpdateOutput,
  }));
// Input Schema
export const AccessPolicyAssignmentDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redisEnterprise/{clusterName}/databases/{databaseName}/accessPolicyAssignments/{accessPolicyAssignmentName}",
    }),
  );
export type AccessPolicyAssignmentDeleteInput =
  typeof AccessPolicyAssignmentDeleteInput.Type;

// Output Schema
export const AccessPolicyAssignmentDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AccessPolicyAssignmentDeleteOutput =
  typeof AccessPolicyAssignmentDeleteOutput.Type;

// The operation
/**
 * Deletes a single access policy assignment.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const AccessPolicyAssignmentDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AccessPolicyAssignmentDeleteInput,
    outputSchema: AccessPolicyAssignmentDeleteOutput,
  }));
// Input Schema
export const AccessPolicyAssignmentGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redisEnterprise/{clusterName}/databases/{databaseName}/accessPolicyAssignments/{accessPolicyAssignmentName}",
    }),
  );
export type AccessPolicyAssignmentGetInput =
  typeof AccessPolicyAssignmentGetInput.Type;

// Output Schema
export const AccessPolicyAssignmentGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type AccessPolicyAssignmentGetOutput =
  typeof AccessPolicyAssignmentGetOutput.Type;

// The operation
/**
 * Gets information about access policy assignment for database.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const AccessPolicyAssignmentGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AccessPolicyAssignmentGetInput,
    outputSchema: AccessPolicyAssignmentGetOutput,
  }),
);
// Input Schema
export const AccessPolicyAssignmentListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redisEnterprise/{clusterName}/databases/{databaseName}/accessPolicyAssignments",
    }),
  );
export type AccessPolicyAssignmentListInput =
  typeof AccessPolicyAssignmentListInput.Type;

// Output Schema
export const AccessPolicyAssignmentListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type AccessPolicyAssignmentListOutput =
  typeof AccessPolicyAssignmentListOutput.Type;

// The operation
/**
 * Gets all access policy assignments..
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const AccessPolicyAssignmentList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AccessPolicyAssignmentListInput,
    outputSchema: AccessPolicyAssignmentListOutput,
  }),
);
// Input Schema
export const DatabasesCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redisEnterprise/{clusterName}/databases/{databaseName}",
  }),
);
export type DatabasesCreateInput = typeof DatabasesCreateInput.Type;

// Output Schema
export const DatabasesCreateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type DatabasesCreateOutput = typeof DatabasesCreateOutput.Type;

// The operation
/**
 * Creates a database
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const DatabasesCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DatabasesCreateInput,
  outputSchema: DatabasesCreateOutput,
}));
// Input Schema
export const DatabasesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redisEnterprise/{clusterName}/databases/{databaseName}",
  }),
);
export type DatabasesDeleteInput = typeof DatabasesDeleteInput.Type;

// Output Schema
export const DatabasesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DatabasesDeleteOutput = typeof DatabasesDeleteOutput.Type;

// The operation
/**
 * Deletes a single database
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const DatabasesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DatabasesDeleteInput,
  outputSchema: DatabasesDeleteOutput,
}));
// Input Schema
export const DatabasesExportInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redisEnterprise/{clusterName}/databases/{databaseName}/export",
  }),
);
export type DatabasesExportInput = typeof DatabasesExportInput.Type;

// Output Schema
export const DatabasesExportOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DatabasesExportOutput = typeof DatabasesExportOutput.Type;

// The operation
/**
 * Exports a database file from target database.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const DatabasesExport = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DatabasesExportInput,
  outputSchema: DatabasesExportOutput,
}));
// Input Schema
export const DatabasesFlushInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redisEnterprise/{clusterName}/databases/{databaseName}/flush",
  }),
);
export type DatabasesFlushInput = typeof DatabasesFlushInput.Type;

// Output Schema
export const DatabasesFlushOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DatabasesFlushOutput = typeof DatabasesFlushOutput.Type;

// The operation
/**
 * Flushes all the keys in this database and also from its linked databases.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const DatabasesFlush = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DatabasesFlushInput,
  outputSchema: DatabasesFlushOutput,
}));
// Input Schema
export const DatabasesForceLinkToReplicationGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redisEnterprise/{clusterName}/databases/{databaseName}/forceLinkToReplicationGroup",
    }),
  );
export type DatabasesForceLinkToReplicationGroupInput =
  typeof DatabasesForceLinkToReplicationGroupInput.Type;

// Output Schema
export const DatabasesForceLinkToReplicationGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DatabasesForceLinkToReplicationGroupOutput =
  typeof DatabasesForceLinkToReplicationGroupOutput.Type;

// The operation
/**
 * Forcibly recreates an existing database on the specified cluster, and rejoins it to an existing replication group. **IMPORTANT NOTE:** All data in this database will be discarded, and the database will temporarily be unavailable while rejoining the replication group.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const DatabasesForceLinkToReplicationGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabasesForceLinkToReplicationGroupInput,
    outputSchema: DatabasesForceLinkToReplicationGroupOutput,
  }));
// Input Schema
export const DatabasesForceUnlinkInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redisEnterprise/{clusterName}/databases/{databaseName}/forceUnlink",
    }),
  );
export type DatabasesForceUnlinkInput = typeof DatabasesForceUnlinkInput.Type;

// Output Schema
export const DatabasesForceUnlinkOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DatabasesForceUnlinkOutput = typeof DatabasesForceUnlinkOutput.Type;

// The operation
/**
 * Forcibly removes the link to the specified database resource.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const DatabasesForceUnlink = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DatabasesForceUnlinkInput,
    outputSchema: DatabasesForceUnlinkOutput,
  }),
);
// Input Schema
export const DatabasesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redisEnterprise/{clusterName}/databases/{databaseName}",
  }),
);
export type DatabasesGetInput = typeof DatabasesGetInput.Type;

// Output Schema
export const DatabasesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DatabasesGetOutput = typeof DatabasesGetOutput.Type;

// The operation
/**
 * Gets information about a database in a Redis Enterprise cluster.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const DatabasesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DatabasesGetInput,
  outputSchema: DatabasesGetOutput,
}));
// Input Schema
export const DatabasesImportInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redisEnterprise/{clusterName}/databases/{databaseName}/import",
  }),
);
export type DatabasesImportInput = typeof DatabasesImportInput.Type;

// Output Schema
export const DatabasesImportOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DatabasesImportOutput = typeof DatabasesImportOutput.Type;

// The operation
/**
 * Imports database files to target database.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const DatabasesImport = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DatabasesImportInput,
  outputSchema: DatabasesImportOutput,
}));
// Input Schema
export const DatabasesListByClusterInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redisEnterprise/{clusterName}/databases",
    }),
  );
export type DatabasesListByClusterInput =
  typeof DatabasesListByClusterInput.Type;

// Output Schema
export const DatabasesListByClusterOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type DatabasesListByClusterOutput =
  typeof DatabasesListByClusterOutput.Type;

// The operation
/**
 * Gets all databases in the specified Redis Enterprise cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const DatabasesListByCluster = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DatabasesListByClusterInput,
    outputSchema: DatabasesListByClusterOutput,
  }),
);
// Input Schema
export const DatabasesListKeysInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redisEnterprise/{clusterName}/databases/{databaseName}/listKeys",
  }),
);
export type DatabasesListKeysInput = typeof DatabasesListKeysInput.Type;

// Output Schema
export const DatabasesListKeysOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    primaryKey: Schema.optional(Schema.String),
    secondaryKey: Schema.optional(Schema.String),
  });
export type DatabasesListKeysOutput = typeof DatabasesListKeysOutput.Type;

// The operation
/**
 * Retrieves the access keys for the Redis Enterprise database.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const DatabasesListKeys = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DatabasesListKeysInput,
  outputSchema: DatabasesListKeysOutput,
}));
// Input Schema
export const DatabasesRegenerateKeyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redisEnterprise/{clusterName}/databases/{databaseName}/regenerateKey",
    }),
  );
export type DatabasesRegenerateKeyInput =
  typeof DatabasesRegenerateKeyInput.Type;

// Output Schema
export const DatabasesRegenerateKeyOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    primaryKey: Schema.optional(Schema.String),
    secondaryKey: Schema.optional(Schema.String),
  });
export type DatabasesRegenerateKeyOutput =
  typeof DatabasesRegenerateKeyOutput.Type;

// The operation
/**
 * Regenerates the Redis Enterprise database's access keys.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const DatabasesRegenerateKey = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DatabasesRegenerateKeyInput,
    outputSchema: DatabasesRegenerateKeyOutput,
  }),
);
// Input Schema
export const DatabasesUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redisEnterprise/{clusterName}/databases/{databaseName}",
  }),
);
export type DatabasesUpdateInput = typeof DatabasesUpdateInput.Type;

// Output Schema
export const DatabasesUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type DatabasesUpdateOutput = typeof DatabasesUpdateOutput.Type;

// The operation
/**
 * Updates a database
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const DatabasesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DatabasesUpdateInput,
  outputSchema: DatabasesUpdateOutput,
}));
// Input Schema
export const DatabasesUpgradeDBRedisVersionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redisEnterprise/{clusterName}/databases/{databaseName}/upgradeDBRedisVersion",
    }),
  );
export type DatabasesUpgradeDBRedisVersionInput =
  typeof DatabasesUpgradeDBRedisVersionInput.Type;

// Output Schema
export const DatabasesUpgradeDBRedisVersionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DatabasesUpgradeDBRedisVersionOutput =
  typeof DatabasesUpgradeDBRedisVersionOutput.Type;

// The operation
/**
 * Upgrades the database Redis version to the latest available.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const DatabasesUpgradeDBRedisVersion =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabasesUpgradeDBRedisVersionInput,
    outputSchema: DatabasesUpgradeDBRedisVersionOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redisEnterprise/{clusterName}/privateEndpointConnections/{privateEndpointConnectionName}",
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
 * Deletes the specified private endpoint connection associated with the Redis Enterprise cluster.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
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
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redisEnterprise/{clusterName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type PrivateEndpointConnectionsGetInput =
  typeof PrivateEndpointConnectionsGetInput.Type;

// Output Schema
export const PrivateEndpointConnectionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type PrivateEndpointConnectionsGetOutput =
  typeof PrivateEndpointConnectionsGetOutput.Type;

// The operation
/**
 * Gets the specified private endpoint connection associated with the Redis Enterprise cluster.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateEndpointConnectionName - The name of the private endpoint connection associated with the Azure resource
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const PrivateEndpointConnectionsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsGetInput,
    outputSchema: PrivateEndpointConnectionsGetOutput,
  }));
// Input Schema
export const RedisEnterpriseCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redisEnterprise/{clusterName}",
    }),
  );
export type RedisEnterpriseCreateInput = typeof RedisEnterpriseCreateInput.Type;

// Output Schema
export const RedisEnterpriseCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type RedisEnterpriseCreateOutput =
  typeof RedisEnterpriseCreateOutput.Type;

// The operation
/**
 * Creates or updates an existing (overwrite/recreate, with potential downtime) cache cluster
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const RedisEnterpriseCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RedisEnterpriseCreateInput,
    outputSchema: RedisEnterpriseCreateOutput,
  }),
);
// Input Schema
export const RedisEnterpriseDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redisEnterprise/{clusterName}",
    }),
  );
export type RedisEnterpriseDeleteInput = typeof RedisEnterpriseDeleteInput.Type;

// Output Schema
export const RedisEnterpriseDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type RedisEnterpriseDeleteOutput =
  typeof RedisEnterpriseDeleteOutput.Type;

// The operation
/**
 * Deletes a Redis Enterprise cache cluster.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const RedisEnterpriseDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RedisEnterpriseDeleteInput,
    outputSchema: RedisEnterpriseDeleteOutput,
  }),
);
// Input Schema
export const RedisEnterpriseGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redisEnterprise/{clusterName}",
    }),
  );
export type RedisEnterpriseGetInput = typeof RedisEnterpriseGetInput.Type;

// Output Schema
export const RedisEnterpriseGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type RedisEnterpriseGetOutput = typeof RedisEnterpriseGetOutput.Type;

// The operation
/**
 * Gets information about a Redis Enterprise cluster
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const RedisEnterpriseGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RedisEnterpriseGetInput,
  outputSchema: RedisEnterpriseGetOutput,
}));
// Input Schema
export const RedisEnterpriseListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Cache/redisEnterprise",
    }),
  );
export type RedisEnterpriseListInput = typeof RedisEnterpriseListInput.Type;

// Output Schema
export const RedisEnterpriseListOutput =
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
export type RedisEnterpriseListOutput = typeof RedisEnterpriseListOutput.Type;

// The operation
/**
 * Lists all Redis Enterprise clusters in the specified subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const RedisEnterpriseList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RedisEnterpriseListInput,
  outputSchema: RedisEnterpriseListOutput,
}));
// Input Schema
export const RedisEnterpriseListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redisEnterprise",
    }),
  );
export type RedisEnterpriseListByResourceGroupInput =
  typeof RedisEnterpriseListByResourceGroupInput.Type;

// Output Schema
export const RedisEnterpriseListByResourceGroupOutput =
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
export type RedisEnterpriseListByResourceGroupOutput =
  typeof RedisEnterpriseListByResourceGroupOutput.Type;

// The operation
/**
 * Lists all Redis Enterprise clusters in a resource group.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const RedisEnterpriseListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RedisEnterpriseListByResourceGroupInput,
    outputSchema: RedisEnterpriseListByResourceGroupOutput,
  }));
// Input Schema
export const RedisEnterpriseListSkusForScalingInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redisEnterprise/{clusterName}/listSkusForScaling",
    }),
  );
export type RedisEnterpriseListSkusForScalingInput =
  typeof RedisEnterpriseListSkusForScalingInput.Type;

// Output Schema
export const RedisEnterpriseListSkusForScalingOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    skus: Schema.optional(
      Schema.Array(
        Schema.Struct({
          name: Schema.optional(Schema.String),
          sizeInGB: Schema.optional(Schema.Number),
        }),
      ),
    ),
  });
export type RedisEnterpriseListSkusForScalingOutput =
  typeof RedisEnterpriseListSkusForScalingOutput.Type;

// The operation
/**
 * Lists the available SKUs for scaling the Redis Enterprise cluster.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const RedisEnterpriseListSkusForScaling =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RedisEnterpriseListSkusForScalingInput,
    outputSchema: RedisEnterpriseListSkusForScalingOutput,
  }));
// Input Schema
export const RedisEnterpriseUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redisEnterprise/{clusterName}",
    }),
  );
export type RedisEnterpriseUpdateInput = typeof RedisEnterpriseUpdateInput.Type;

// Output Schema
export const RedisEnterpriseUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type RedisEnterpriseUpdateOutput =
  typeof RedisEnterpriseUpdateOutput.Type;

// The operation
/**
 * Updates an existing Redis Enterprise cluster
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const RedisEnterpriseUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RedisEnterpriseUpdateInput,
    outputSchema: RedisEnterpriseUpdateOutput,
  }),
);
