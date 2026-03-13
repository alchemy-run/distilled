/**
 * Azure Mongocluster API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";
import { SensitiveString } from "../sensitive.ts";

// Input Schema
export const FirewallRulesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    mongoClusterName: Schema.String.pipe(T.PathParam()),
    firewallRuleName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters/{mongoClusterName}/firewallRules/{firewallRuleName}",
    }),
  );
export type FirewallRulesCreateOrUpdateInput =
  typeof FirewallRulesCreateOrUpdateInput.Type;

// Output Schema
export const FirewallRulesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type FirewallRulesCreateOrUpdateOutput =
  typeof FirewallRulesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates a new firewall rule or updates an existing firewall rule on a mongo cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param mongoClusterName - The name of the mongo cluster.
 * @param firewallRuleName - The name of the mongo cluster firewall rule.
 */
export const FirewallRulesCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: FirewallRulesCreateOrUpdateInput,
    outputSchema: FirewallRulesCreateOrUpdateOutput,
  }),
);
// Input Schema
export const FirewallRulesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    mongoClusterName: Schema.String.pipe(T.PathParam()),
    firewallRuleName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters/{mongoClusterName}/firewallRules/{firewallRuleName}",
    }),
  );
export type FirewallRulesDeleteInput = typeof FirewallRulesDeleteInput.Type;

// Output Schema
export const FirewallRulesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type FirewallRulesDeleteOutput = typeof FirewallRulesDeleteOutput.Type;

// The operation
/**
 * Deletes a mongo cluster firewall rule.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param mongoClusterName - The name of the mongo cluster.
 * @param firewallRuleName - The name of the mongo cluster firewall rule.
 */
export const FirewallRulesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FirewallRulesDeleteInput,
  outputSchema: FirewallRulesDeleteOutput,
}));
// Input Schema
export const FirewallRulesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  mongoClusterName: Schema.String.pipe(T.PathParam()),
  firewallRuleName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters/{mongoClusterName}/firewallRules/{firewallRuleName}",
  }),
);
export type FirewallRulesGetInput = typeof FirewallRulesGetInput.Type;

// Output Schema
export const FirewallRulesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type FirewallRulesGetOutput = typeof FirewallRulesGetOutput.Type;

// The operation
/**
 * Gets information about a mongo cluster firewall rule.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param mongoClusterName - The name of the mongo cluster.
 * @param firewallRuleName - The name of the mongo cluster firewall rule.
 */
export const FirewallRulesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FirewallRulesGetInput,
  outputSchema: FirewallRulesGetOutput,
}));
// Input Schema
export const FirewallRulesListByMongoClusterInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    mongoClusterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters/{mongoClusterName}/firewallRules",
    }),
  );
export type FirewallRulesListByMongoClusterInput =
  typeof FirewallRulesListByMongoClusterInput.Type;

// Output Schema
export const FirewallRulesListByMongoClusterOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type FirewallRulesListByMongoClusterOutput =
  typeof FirewallRulesListByMongoClusterOutput.Type;

// The operation
/**
 * List all the firewall rules in a given mongo cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param mongoClusterName - The name of the mongo cluster.
 */
export const FirewallRulesListByMongoCluster =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: FirewallRulesListByMongoClusterInput,
    outputSchema: FirewallRulesListByMongoClusterOutput,
  }));
// Input Schema
export const MongoClustersCheckNameAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DocumentDB/locations/{location}/checkMongoClusterNameAvailability",
    }),
  );
export type MongoClustersCheckNameAvailabilityInput =
  typeof MongoClustersCheckNameAvailabilityInput.Type;

// Output Schema
export const MongoClustersCheckNameAvailabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nameAvailable: Schema.optional(Schema.Boolean),
    reason: Schema.optional(Schema.Literals(["Invalid", "AlreadyExists"])),
    message: Schema.optional(Schema.String),
  });
export type MongoClustersCheckNameAvailabilityOutput =
  typeof MongoClustersCheckNameAvailabilityOutput.Type;

// The operation
/**
 * Check if mongo cluster name is available for use.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param location - The name of the Azure region.
 * @param name - The name of the resource for which availability needs to be checked.
 * @param type - The resource type.
 */
export const MongoClustersCheckNameAvailability =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MongoClustersCheckNameAvailabilityInput,
    outputSchema: MongoClustersCheckNameAvailabilityOutput,
  }));
// Input Schema
export const MongoClustersCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    mongoClusterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters/{mongoClusterName}",
    }),
  );
export type MongoClustersCreateOrUpdateInput =
  typeof MongoClustersCreateOrUpdateInput.Type;

// Output Schema
export const MongoClustersCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type MongoClustersCreateOrUpdateOutput =
  typeof MongoClustersCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a mongo cluster. Update overwrites all properties for the resource. To only modify some of the properties, use PATCH.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param mongoClusterName - The name of the mongo cluster.
 */
export const MongoClustersCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: MongoClustersCreateOrUpdateInput,
    outputSchema: MongoClustersCreateOrUpdateOutput,
  }),
);
// Input Schema
export const MongoClustersDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    mongoClusterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters/{mongoClusterName}",
    }),
  );
export type MongoClustersDeleteInput = typeof MongoClustersDeleteInput.Type;

// Output Schema
export const MongoClustersDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type MongoClustersDeleteOutput = typeof MongoClustersDeleteOutput.Type;

// The operation
/**
 * Deletes a mongo cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param mongoClusterName - The name of the mongo cluster.
 */
export const MongoClustersDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: MongoClustersDeleteInput,
  outputSchema: MongoClustersDeleteOutput,
}));
// Input Schema
export const MongoClustersGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  mongoClusterName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters/{mongoClusterName}",
  }),
);
export type MongoClustersGetInput = typeof MongoClustersGetInput.Type;

// Output Schema
export const MongoClustersGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  },
);
export type MongoClustersGetOutput = typeof MongoClustersGetOutput.Type;

// The operation
/**
 * Gets information about a mongo cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param mongoClusterName - The name of the mongo cluster.
 */
export const MongoClustersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: MongoClustersGetInput,
  outputSchema: MongoClustersGetOutput,
}));
// Input Schema
export const MongoClustersListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.DocumentDB/mongoClusters",
  }),
);
export type MongoClustersListInput = typeof MongoClustersListInput.Type;

// Output Schema
export const MongoClustersListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type MongoClustersListOutput = typeof MongoClustersListOutput.Type;

// The operation
/**
 * List all the mongo clusters in a given subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const MongoClustersList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: MongoClustersListInput,
  outputSchema: MongoClustersListOutput,
}));
// Input Schema
export const MongoClustersListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters",
    }),
  );
export type MongoClustersListByResourceGroupInput =
  typeof MongoClustersListByResourceGroupInput.Type;

// Output Schema
export const MongoClustersListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type MongoClustersListByResourceGroupOutput =
  typeof MongoClustersListByResourceGroupOutput.Type;

// The operation
/**
 * List all the mongo clusters in a given resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const MongoClustersListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MongoClustersListByResourceGroupInput,
    outputSchema: MongoClustersListByResourceGroupOutput,
  }));
// Input Schema
export const MongoClustersListConnectionStringsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    mongoClusterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters/{mongoClusterName}/listConnectionStrings",
    }),
  );
export type MongoClustersListConnectionStringsInput =
  typeof MongoClustersListConnectionStringsInput.Type;

// Output Schema
export const MongoClustersListConnectionStringsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    connectionStrings: Schema.optional(
      Schema.Array(
        Schema.Struct({
          connectionString: Schema.optional(SensitiveString),
          description: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type MongoClustersListConnectionStringsOutput =
  typeof MongoClustersListConnectionStringsOutput.Type;

// The operation
/**
 * List mongo cluster connection strings. This includes the default connection string using SCRAM-SHA-256, as well as other connection strings supported by the cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param mongoClusterName - The name of the mongo cluster.
 */
export const MongoClustersListConnectionStrings =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MongoClustersListConnectionStringsInput,
    outputSchema: MongoClustersListConnectionStringsOutput,
  }));
// Input Schema
export const MongoClustersPromoteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    mongoClusterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters/{mongoClusterName}/promote",
    }),
  );
export type MongoClustersPromoteInput = typeof MongoClustersPromoteInput.Type;

// Output Schema
export const MongoClustersPromoteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type MongoClustersPromoteOutput = typeof MongoClustersPromoteOutput.Type;

// The operation
/**
 * Promotes a replica mongo cluster to a primary role.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param mongoClusterName - The name of the mongo cluster.
 */
export const MongoClustersPromote = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: MongoClustersPromoteInput,
    outputSchema: MongoClustersPromoteOutput,
  }),
);
// Input Schema
export const MongoClustersUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    mongoClusterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters/{mongoClusterName}",
    }),
  );
export type MongoClustersUpdateInput = typeof MongoClustersUpdateInput.Type;

// Output Schema
export const MongoClustersUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type MongoClustersUpdateOutput = typeof MongoClustersUpdateOutput.Type;

// The operation
/**
 * Updates an existing mongo cluster. The request body can contain one to many of the properties present in the normal mongo cluster definition.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param mongoClusterName - The name of the mongo cluster.
 */
export const MongoClustersUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: MongoClustersUpdateInput,
  outputSchema: MongoClustersUpdateOutput,
}));
// Input Schema
export const PrivateEndpointConnectionsCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    mongoClusterName: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters/{mongoClusterName}/privateEndpointConnections/{privateEndpointConnectionName}",
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
 * @param mongoClusterName - The name of the mongo cluster.
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
    mongoClusterName: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters/{mongoClusterName}/privateEndpointConnections/{privateEndpointConnectionName}",
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
 * @param mongoClusterName - The name of the mongo cluster.
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
    mongoClusterName: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters/{mongoClusterName}/privateEndpointConnections/{privateEndpointConnectionName}",
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
 * @param mongoClusterName - The name of the mongo cluster.
 * @param privateEndpointConnectionName - The name of the private endpoint connection associated with the Azure resource.
 */
export const PrivateEndpointConnectionsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsGetInput,
    outputSchema: PrivateEndpointConnectionsGetOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsListByMongoClusterInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    mongoClusterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters/{mongoClusterName}/privateEndpointConnections",
    }),
  );
export type PrivateEndpointConnectionsListByMongoClusterInput =
  typeof PrivateEndpointConnectionsListByMongoClusterInput.Type;

// Output Schema
export const PrivateEndpointConnectionsListByMongoClusterOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type PrivateEndpointConnectionsListByMongoClusterOutput =
  typeof PrivateEndpointConnectionsListByMongoClusterOutput.Type;

// The operation
/**
 * List existing private connections
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param mongoClusterName - The name of the mongo cluster.
 */
export const PrivateEndpointConnectionsListByMongoCluster =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsListByMongoClusterInput,
    outputSchema: PrivateEndpointConnectionsListByMongoClusterOutput,
  }));
// Input Schema
export const PrivateLinksListByMongoClusterInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    mongoClusterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters/{mongoClusterName}/privateLinkResources",
    }),
  );
export type PrivateLinksListByMongoClusterInput =
  typeof PrivateLinksListByMongoClusterInput.Type;

// Output Schema
export const PrivateLinksListByMongoClusterOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type PrivateLinksListByMongoClusterOutput =
  typeof PrivateLinksListByMongoClusterOutput.Type;

// The operation
/**
 * list private links on the given resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param mongoClusterName - The name of the mongo cluster.
 */
export const PrivateLinksListByMongoCluster =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinksListByMongoClusterInput,
    outputSchema: PrivateLinksListByMongoClusterOutput,
  }));
// Input Schema
export const ReplicasListByParentInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    mongoClusterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters/{mongoClusterName}/replicas",
    }),
  );
export type ReplicasListByParentInput = typeof ReplicasListByParentInput.Type;

// Output Schema
export const ReplicasListByParentOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type ReplicasListByParentOutput = typeof ReplicasListByParentOutput.Type;

// The operation
/**
 * List all the replicas for the mongo cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param mongoClusterName - The name of the mongo cluster.
 */
export const ReplicasListByParent = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ReplicasListByParentInput,
    outputSchema: ReplicasListByParentOutput,
  }),
);
// Input Schema
export const UsersCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    mongoClusterName: Schema.String.pipe(T.PathParam()),
    userName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters/{mongoClusterName}/users/{userName}",
    }),
  );
export type UsersCreateOrUpdateInput = typeof UsersCreateOrUpdateInput.Type;

// Output Schema
export const UsersCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type UsersCreateOrUpdateOutput = typeof UsersCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates a new user or updates an existing user on a mongo cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param mongoClusterName - The name of the mongo cluster.
 * @param userName - The name of the mongo cluster user.
 */
export const UsersCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: UsersCreateOrUpdateInput,
  outputSchema: UsersCreateOrUpdateOutput,
}));
// Input Schema
export const UsersDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  mongoClusterName: Schema.String.pipe(T.PathParam()),
  userName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters/{mongoClusterName}/users/{userName}",
  }),
);
export type UsersDeleteInput = typeof UsersDeleteInput.Type;

// Output Schema
export const UsersDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type UsersDeleteOutput = typeof UsersDeleteOutput.Type;

// The operation
/**
 * Deletes a mongo cluster user.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param mongoClusterName - The name of the mongo cluster.
 * @param userName - The name of the mongo cluster user.
 */
export const UsersDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: UsersDeleteInput,
  outputSchema: UsersDeleteOutput,
}));
// Input Schema
export const UsersGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  mongoClusterName: Schema.String.pipe(T.PathParam()),
  userName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters/{mongoClusterName}/users/{userName}",
  }),
);
export type UsersGetInput = typeof UsersGetInput.Type;

// Output Schema
export const UsersGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type UsersGetOutput = typeof UsersGetOutput.Type;

// The operation
/**
 * Gets the defintion of a Mongo cluster user.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param mongoClusterName - The name of the mongo cluster.
 * @param userName - The name of the mongo cluster user.
 */
export const UsersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: UsersGetInput,
  outputSchema: UsersGetOutput,
}));
// Input Schema
export const UsersListByMongoClusterInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    mongoClusterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters/{mongoClusterName}/users",
    }),
  );
export type UsersListByMongoClusterInput =
  typeof UsersListByMongoClusterInput.Type;

// Output Schema
export const UsersListByMongoClusterOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type UsersListByMongoClusterOutput =
  typeof UsersListByMongoClusterOutput.Type;

// The operation
/**
 * List all the users on a mongo cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param mongoClusterName - The name of the mongo cluster.
 */
export const UsersListByMongoCluster = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: UsersListByMongoClusterInput,
    outputSchema: UsersListByMongoClusterOutput,
  }),
);
