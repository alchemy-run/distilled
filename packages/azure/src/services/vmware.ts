/**
 * Azure Vmware API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";
import { SensitiveString } from "../sensitive.ts";

// Input Schema
export const AddonsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    addonName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/addons/{addonName}",
    }),
  );
export type AddonsCreateOrUpdateInput = typeof AddonsCreateOrUpdateInput.Type;

// Output Schema
export const AddonsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type AddonsCreateOrUpdateOutput = typeof AddonsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a Addon
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 * @param addonName - Name of the addon.
 */
export const AddonsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AddonsCreateOrUpdateInput,
    outputSchema: AddonsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const AddonsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  privateCloudName: Schema.String.pipe(T.PathParam()),
  addonName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/addons/{addonName}",
  }),
);
export type AddonsDeleteInput = typeof AddonsDeleteInput.Type;

// Output Schema
export const AddonsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AddonsDeleteOutput = typeof AddonsDeleteOutput.Type;

// The operation
/**
 * Delete a Addon
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 * @param addonName - Name of the addon.
 */
export const AddonsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AddonsDeleteInput,
  outputSchema: AddonsDeleteOutput,
}));
// Input Schema
export const AddonsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  privateCloudName: Schema.String.pipe(T.PathParam()),
  addonName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/addons/{addonName}",
  }),
);
export type AddonsGetInput = typeof AddonsGetInput.Type;

// Output Schema
export const AddonsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type AddonsGetOutput = typeof AddonsGetOutput.Type;

// The operation
/**
 * Get a Addon
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 * @param addonName - Name of the addon.
 */
export const AddonsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AddonsGetInput,
  outputSchema: AddonsGetOutput,
}));
// Input Schema
export const AddonsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  privateCloudName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/addons",
  }),
);
export type AddonsListInput = typeof AddonsListInput.Type;

// Output Schema
export const AddonsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(Schema.Struct({})),
  nextLink: Schema.optional(Schema.String),
});
export type AddonsListOutput = typeof AddonsListOutput.Type;

// The operation
/**
 * List Addon resources by PrivateCloud
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 */
export const AddonsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AddonsListInput,
  outputSchema: AddonsListOutput,
}));
// Input Schema
export const AuthorizationsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    authorizationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/authorizations/{authorizationName}",
    }),
  );
export type AuthorizationsCreateOrUpdateInput =
  typeof AuthorizationsCreateOrUpdateInput.Type;

// Output Schema
export const AuthorizationsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type AuthorizationsCreateOrUpdateOutput =
  typeof AuthorizationsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a ExpressRouteAuthorization
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 * @param authorizationName - Name of the ExpressRoute Circuit Authorization
 */
export const AuthorizationsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AuthorizationsCreateOrUpdateInput,
    outputSchema: AuthorizationsCreateOrUpdateOutput,
  }));
// Input Schema
export const AuthorizationsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    authorizationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/authorizations/{authorizationName}",
    }),
  );
export type AuthorizationsDeleteInput = typeof AuthorizationsDeleteInput.Type;

// Output Schema
export const AuthorizationsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AuthorizationsDeleteOutput = typeof AuthorizationsDeleteOutput.Type;

// The operation
/**
 * Delete a ExpressRouteAuthorization
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 * @param authorizationName - Name of the ExpressRoute Circuit Authorization
 */
export const AuthorizationsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AuthorizationsDeleteInput,
    outputSchema: AuthorizationsDeleteOutput,
  }),
);
// Input Schema
export const AuthorizationsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    authorizationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/authorizations/{authorizationName}",
  }),
);
export type AuthorizationsGetInput = typeof AuthorizationsGetInput.Type;

// Output Schema
export const AuthorizationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type AuthorizationsGetOutput = typeof AuthorizationsGetOutput.Type;

// The operation
/**
 * Get a ExpressRouteAuthorization
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 * @param authorizationName - Name of the ExpressRoute Circuit Authorization
 */
export const AuthorizationsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AuthorizationsGetInput,
  outputSchema: AuthorizationsGetOutput,
}));
// Input Schema
export const AuthorizationsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/authorizations",
    }),
  );
export type AuthorizationsListInput = typeof AuthorizationsListInput.Type;

// Output Schema
export const AuthorizationsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type AuthorizationsListOutput = typeof AuthorizationsListOutput.Type;

// The operation
/**
 * List ExpressRouteAuthorization resources by PrivateCloud
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 */
export const AuthorizationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AuthorizationsListInput,
  outputSchema: AuthorizationsListOutput,
}));
// Input Schema
export const CloudLinksCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    cloudLinkName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/cloudLinks/{cloudLinkName}",
    }),
  );
export type CloudLinksCreateOrUpdateInput =
  typeof CloudLinksCreateOrUpdateInput.Type;

// Output Schema
export const CloudLinksCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type CloudLinksCreateOrUpdateOutput =
  typeof CloudLinksCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a CloudLink
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 * @param cloudLinkName - Name of the cloud link.
 */
export const CloudLinksCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CloudLinksCreateOrUpdateInput,
    outputSchema: CloudLinksCreateOrUpdateOutput,
  }),
);
// Input Schema
export const CloudLinksDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  privateCloudName: Schema.String.pipe(T.PathParam()),
  cloudLinkName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/cloudLinks/{cloudLinkName}",
  }),
);
export type CloudLinksDeleteInput = typeof CloudLinksDeleteInput.Type;

// Output Schema
export const CloudLinksDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CloudLinksDeleteOutput = typeof CloudLinksDeleteOutput.Type;

// The operation
/**
 * Delete a CloudLink
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 * @param cloudLinkName - Name of the cloud link.
 */
export const CloudLinksDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CloudLinksDeleteInput,
  outputSchema: CloudLinksDeleteOutput,
}));
// Input Schema
export const CloudLinksGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  privateCloudName: Schema.String.pipe(T.PathParam()),
  cloudLinkName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/cloudLinks/{cloudLinkName}",
  }),
);
export type CloudLinksGetInput = typeof CloudLinksGetInput.Type;

// Output Schema
export const CloudLinksGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type CloudLinksGetOutput = typeof CloudLinksGetOutput.Type;

// The operation
/**
 * Get a CloudLink
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 * @param cloudLinkName - Name of the cloud link.
 */
export const CloudLinksGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CloudLinksGetInput,
  outputSchema: CloudLinksGetOutput,
}));
// Input Schema
export const CloudLinksListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  privateCloudName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/cloudLinks",
  }),
);
export type CloudLinksListInput = typeof CloudLinksListInput.Type;

// Output Schema
export const CloudLinksListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(Schema.Struct({})),
  nextLink: Schema.optional(Schema.String),
});
export type CloudLinksListOutput = typeof CloudLinksListOutput.Type;

// The operation
/**
 * List CloudLink resources by PrivateCloud
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 */
export const CloudLinksList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CloudLinksListInput,
  outputSchema: CloudLinksListOutput,
}));
// Input Schema
export const ClustersCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/clusters/{clusterName}",
    }),
  );
export type ClustersCreateOrUpdateInput =
  typeof ClustersCreateOrUpdateInput.Type;

// Output Schema
export const ClustersCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ClustersCreateOrUpdateOutput =
  typeof ClustersCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a Cluster
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 * @param clusterName - Name of the cluster
 */
export const ClustersCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ClustersCreateOrUpdateInput,
    outputSchema: ClustersCreateOrUpdateOutput,
  }),
);
// Input Schema
export const ClustersDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  privateCloudName: Schema.String.pipe(T.PathParam()),
  clusterName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/clusters/{clusterName}",
  }),
);
export type ClustersDeleteInput = typeof ClustersDeleteInput.Type;

// Output Schema
export const ClustersDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ClustersDeleteOutput = typeof ClustersDeleteOutput.Type;

// The operation
/**
 * Delete a Cluster
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 * @param clusterName - Name of the cluster
 */
export const ClustersDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ClustersDeleteInput,
  outputSchema: ClustersDeleteOutput,
}));
// Input Schema
export const ClustersGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  privateCloudName: Schema.String.pipe(T.PathParam()),
  clusterName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/clusters/{clusterName}",
  }),
);
export type ClustersGetInput = typeof ClustersGetInput.Type;

// Output Schema
export const ClustersGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ClustersGetOutput = typeof ClustersGetOutput.Type;

// The operation
/**
 * Get a Cluster
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 * @param clusterName - Name of the cluster
 */
export const ClustersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ClustersGetInput,
  outputSchema: ClustersGetOutput,
}));
// Input Schema
export const ClustersListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  privateCloudName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/clusters",
  }),
);
export type ClustersListInput = typeof ClustersListInput.Type;

// Output Schema
export const ClustersListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(Schema.Struct({})),
  nextLink: Schema.optional(Schema.String),
});
export type ClustersListOutput = typeof ClustersListOutput.Type;

// The operation
/**
 * List Cluster resources by PrivateCloud
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 */
export const ClustersList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ClustersListInput,
  outputSchema: ClustersListOutput,
}));
// Input Schema
export const ClustersListZonesInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/clusters/{clusterName}/listZones",
  }),
);
export type ClustersListZonesInput = typeof ClustersListZonesInput.Type;

// Output Schema
export const ClustersListZonesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    zones: Schema.optional(
      Schema.Array(
        Schema.Struct({
          hosts: Schema.optional(Schema.Array(Schema.String)),
          zone: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type ClustersListZonesOutput = typeof ClustersListZonesOutput.Type;

// The operation
/**
 * List hosts by zone in a cluster
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 * @param clusterName - Name of the cluster
 */
export const ClustersListZones = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ClustersListZonesInput,
  outputSchema: ClustersListZonesOutput,
}));
// Input Schema
export const ClustersUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  privateCloudName: Schema.String.pipe(T.PathParam()),
  clusterName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/clusters/{clusterName}",
  }),
);
export type ClustersUpdateInput = typeof ClustersUpdateInput.Type;

// Output Schema
export const ClustersUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type ClustersUpdateOutput = typeof ClustersUpdateOutput.Type;

// The operation
/**
 * Update a Cluster
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 * @param clusterName - Name of the cluster
 */
export const ClustersUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ClustersUpdateInput,
  outputSchema: ClustersUpdateOutput,
}));
// Input Schema
export const DatastoresCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    datastoreName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/clusters/{clusterName}/datastores/{datastoreName}",
    }),
  );
export type DatastoresCreateOrUpdateInput =
  typeof DatastoresCreateOrUpdateInput.Type;

// Output Schema
export const DatastoresCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DatastoresCreateOrUpdateOutput =
  typeof DatastoresCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a Datastore
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 * @param clusterName - Name of the cluster
 * @param datastoreName - Name of the datastore
 */
export const DatastoresCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DatastoresCreateOrUpdateInput,
    outputSchema: DatastoresCreateOrUpdateOutput,
  }),
);
// Input Schema
export const DatastoresDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  privateCloudName: Schema.String.pipe(T.PathParam()),
  clusterName: Schema.String.pipe(T.PathParam()),
  datastoreName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/clusters/{clusterName}/datastores/{datastoreName}",
  }),
);
export type DatastoresDeleteInput = typeof DatastoresDeleteInput.Type;

// Output Schema
export const DatastoresDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DatastoresDeleteOutput = typeof DatastoresDeleteOutput.Type;

// The operation
/**
 * Delete a Datastore
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 * @param clusterName - Name of the cluster
 * @param datastoreName - Name of the datastore
 */
export const DatastoresDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DatastoresDeleteInput,
  outputSchema: DatastoresDeleteOutput,
}));
// Input Schema
export const DatastoresGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  privateCloudName: Schema.String.pipe(T.PathParam()),
  clusterName: Schema.String.pipe(T.PathParam()),
  datastoreName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/clusters/{clusterName}/datastores/{datastoreName}",
  }),
);
export type DatastoresGetInput = typeof DatastoresGetInput.Type;

// Output Schema
export const DatastoresGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type DatastoresGetOutput = typeof DatastoresGetOutput.Type;

// The operation
/**
 * Get a Datastore
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 * @param clusterName - Name of the cluster
 * @param datastoreName - Name of the datastore
 */
export const DatastoresGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DatastoresGetInput,
  outputSchema: DatastoresGetOutput,
}));
// Input Schema
export const DatastoresListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  privateCloudName: Schema.String.pipe(T.PathParam()),
  clusterName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/clusters/{clusterName}/datastores",
  }),
);
export type DatastoresListInput = typeof DatastoresListInput.Type;

// Output Schema
export const DatastoresListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(Schema.Struct({})),
  nextLink: Schema.optional(Schema.String),
});
export type DatastoresListOutput = typeof DatastoresListOutput.Type;

// The operation
/**
 * List Datastore resources by Cluster
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 * @param clusterName - Name of the cluster
 */
export const DatastoresList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DatastoresListInput,
  outputSchema: DatastoresListOutput,
}));
// Input Schema
export const GlobalReachConnectionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    globalReachConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/globalReachConnections/{globalReachConnectionName}",
    }),
  );
export type GlobalReachConnectionsCreateOrUpdateInput =
  typeof GlobalReachConnectionsCreateOrUpdateInput.Type;

// Output Schema
export const GlobalReachConnectionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type GlobalReachConnectionsCreateOrUpdateOutput =
  typeof GlobalReachConnectionsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a GlobalReachConnection
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 * @param globalReachConnectionName - Name of the global reach connection
 */
export const GlobalReachConnectionsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GlobalReachConnectionsCreateOrUpdateInput,
    outputSchema: GlobalReachConnectionsCreateOrUpdateOutput,
  }));
// Input Schema
export const GlobalReachConnectionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    globalReachConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/globalReachConnections/{globalReachConnectionName}",
    }),
  );
export type GlobalReachConnectionsDeleteInput =
  typeof GlobalReachConnectionsDeleteInput.Type;

// Output Schema
export const GlobalReachConnectionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type GlobalReachConnectionsDeleteOutput =
  typeof GlobalReachConnectionsDeleteOutput.Type;

// The operation
/**
 * Delete a GlobalReachConnection
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 * @param globalReachConnectionName - Name of the global reach connection
 */
export const GlobalReachConnectionsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GlobalReachConnectionsDeleteInput,
    outputSchema: GlobalReachConnectionsDeleteOutput,
  }));
// Input Schema
export const GlobalReachConnectionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    globalReachConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/globalReachConnections/{globalReachConnectionName}",
    }),
  );
export type GlobalReachConnectionsGetInput =
  typeof GlobalReachConnectionsGetInput.Type;

// Output Schema
export const GlobalReachConnectionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type GlobalReachConnectionsGetOutput =
  typeof GlobalReachConnectionsGetOutput.Type;

// The operation
/**
 * Get a GlobalReachConnection
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 * @param globalReachConnectionName - Name of the global reach connection
 */
export const GlobalReachConnectionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GlobalReachConnectionsGetInput,
    outputSchema: GlobalReachConnectionsGetOutput,
  }),
);
// Input Schema
export const GlobalReachConnectionsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/globalReachConnections",
    }),
  );
export type GlobalReachConnectionsListInput =
  typeof GlobalReachConnectionsListInput.Type;

// Output Schema
export const GlobalReachConnectionsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type GlobalReachConnectionsListOutput =
  typeof GlobalReachConnectionsListOutput.Type;

// The operation
/**
 * List GlobalReachConnection resources by PrivateCloud
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 */
export const GlobalReachConnectionsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GlobalReachConnectionsListInput,
    outputSchema: GlobalReachConnectionsListOutput,
  }),
);
// Input Schema
export const HcxEnterpriseSitesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    hcxEnterpriseSiteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/hcxEnterpriseSites/{hcxEnterpriseSiteName}",
    }),
  );
export type HcxEnterpriseSitesCreateOrUpdateInput =
  typeof HcxEnterpriseSitesCreateOrUpdateInput.Type;

// Output Schema
export const HcxEnterpriseSitesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type HcxEnterpriseSitesCreateOrUpdateOutput =
  typeof HcxEnterpriseSitesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a HcxEnterpriseSite
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 * @param hcxEnterpriseSiteName - Name of the HCX Enterprise Site
 */
export const HcxEnterpriseSitesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: HcxEnterpriseSitesCreateOrUpdateInput,
    outputSchema: HcxEnterpriseSitesCreateOrUpdateOutput,
  }));
// Input Schema
export const HcxEnterpriseSitesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    hcxEnterpriseSiteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/hcxEnterpriseSites/{hcxEnterpriseSiteName}",
    }),
  );
export type HcxEnterpriseSitesDeleteInput =
  typeof HcxEnterpriseSitesDeleteInput.Type;

// Output Schema
export const HcxEnterpriseSitesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type HcxEnterpriseSitesDeleteOutput =
  typeof HcxEnterpriseSitesDeleteOutput.Type;

// The operation
/**
 * Delete a HcxEnterpriseSite
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 * @param hcxEnterpriseSiteName - Name of the HCX Enterprise Site
 */
export const HcxEnterpriseSitesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: HcxEnterpriseSitesDeleteInput,
    outputSchema: HcxEnterpriseSitesDeleteOutput,
  }),
);
// Input Schema
export const HcxEnterpriseSitesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    hcxEnterpriseSiteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/hcxEnterpriseSites/{hcxEnterpriseSiteName}",
    }),
  );
export type HcxEnterpriseSitesGetInput = typeof HcxEnterpriseSitesGetInput.Type;

// Output Schema
export const HcxEnterpriseSitesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type HcxEnterpriseSitesGetOutput =
  typeof HcxEnterpriseSitesGetOutput.Type;

// The operation
/**
 * Get a HcxEnterpriseSite
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 * @param hcxEnterpriseSiteName - Name of the HCX Enterprise Site
 */
export const HcxEnterpriseSitesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: HcxEnterpriseSitesGetInput,
    outputSchema: HcxEnterpriseSitesGetOutput,
  }),
);
// Input Schema
export const HcxEnterpriseSitesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/hcxEnterpriseSites",
    }),
  );
export type HcxEnterpriseSitesListInput =
  typeof HcxEnterpriseSitesListInput.Type;

// Output Schema
export const HcxEnterpriseSitesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type HcxEnterpriseSitesListOutput =
  typeof HcxEnterpriseSitesListOutput.Type;

// The operation
/**
 * List HcxEnterpriseSite resources by PrivateCloud
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 */
export const HcxEnterpriseSitesList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: HcxEnterpriseSitesListInput,
    outputSchema: HcxEnterpriseSitesListOutput,
  }),
);
// Input Schema
export const HostsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  privateCloudName: Schema.String.pipe(T.PathParam()),
  clusterName: Schema.String.pipe(T.PathParam()),
  hostId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/clusters/{clusterName}/hosts/{hostId}",
  }),
);
export type HostsGetInput = typeof HostsGetInput.Type;

// Output Schema
export const HostsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type HostsGetOutput = typeof HostsGetOutput.Type;

// The operation
/**
 * Get a Host
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 * @param clusterName - Name of the cluster
 * @param hostId - The host identifier.
 */
export const HostsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: HostsGetInput,
  outputSchema: HostsGetOutput,
}));
// Input Schema
export const HostsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  privateCloudName: Schema.String.pipe(T.PathParam()),
  clusterName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/clusters/{clusterName}/hosts",
  }),
);
export type HostsListInput = typeof HostsListInput.Type;

// Output Schema
export const HostsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(Schema.Struct({})),
  nextLink: Schema.optional(Schema.String),
});
export type HostsListOutput = typeof HostsListOutput.Type;

// The operation
/**
 * List Host resources by Cluster
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 * @param clusterName - Name of the cluster
 */
export const HostsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: HostsListInput,
  outputSchema: HostsListOutput,
}));
// Input Schema
export const IscsiPathsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/iscsiPaths/default",
    }),
  );
export type IscsiPathsCreateOrUpdateInput =
  typeof IscsiPathsCreateOrUpdateInput.Type;

// Output Schema
export const IscsiPathsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type IscsiPathsCreateOrUpdateOutput =
  typeof IscsiPathsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a IscsiPath
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 */
export const IscsiPathsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IscsiPathsCreateOrUpdateInput,
    outputSchema: IscsiPathsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const IscsiPathsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  privateCloudName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/iscsiPaths/default",
  }),
);
export type IscsiPathsDeleteInput = typeof IscsiPathsDeleteInput.Type;

// Output Schema
export const IscsiPathsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type IscsiPathsDeleteOutput = typeof IscsiPathsDeleteOutput.Type;

// The operation
/**
 * Delete a IscsiPath
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 */
export const IscsiPathsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: IscsiPathsDeleteInput,
  outputSchema: IscsiPathsDeleteOutput,
}));
// Input Schema
export const IscsiPathsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  privateCloudName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/iscsiPaths/default",
  }),
);
export type IscsiPathsGetInput = typeof IscsiPathsGetInput.Type;

// Output Schema
export const IscsiPathsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type IscsiPathsGetOutput = typeof IscsiPathsGetOutput.Type;

// The operation
/**
 * Get a IscsiPath
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 */
export const IscsiPathsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: IscsiPathsGetInput,
  outputSchema: IscsiPathsGetOutput,
}));
// Input Schema
export const IscsiPathsListByPrivateCloudInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/iscsiPaths",
    }),
  );
export type IscsiPathsListByPrivateCloudInput =
  typeof IscsiPathsListByPrivateCloudInput.Type;

// Output Schema
export const IscsiPathsListByPrivateCloudOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type IscsiPathsListByPrivateCloudOutput =
  typeof IscsiPathsListByPrivateCloudOutput.Type;

// The operation
/**
 * List IscsiPath resources by PrivateCloud
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 */
export const IscsiPathsListByPrivateCloud =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IscsiPathsListByPrivateCloudInput,
    outputSchema: IscsiPathsListByPrivateCloudOutput,
  }));
// Input Schema
export const LicensesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    licenseName: Schema.Literals(["VmwareFirewall"]).pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/licenses/{licenseName}",
    }),
  );
export type LicensesCreateOrUpdateInput =
  typeof LicensesCreateOrUpdateInput.Type;

// Output Schema
export const LicensesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type LicensesCreateOrUpdateOutput =
  typeof LicensesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a License
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 * @param licenseName - Name of the license.
 */
export const LicensesCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: LicensesCreateOrUpdateInput,
    outputSchema: LicensesCreateOrUpdateOutput,
  }),
);
// Input Schema
export const LicensesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  privateCloudName: Schema.String.pipe(T.PathParam()),
  licenseName: Schema.Literals(["VmwareFirewall"]).pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/licenses/{licenseName}",
  }),
);
export type LicensesDeleteInput = typeof LicensesDeleteInput.Type;

// Output Schema
export const LicensesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type LicensesDeleteOutput = typeof LicensesDeleteOutput.Type;

// The operation
/**
 * Delete a License
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 * @param licenseName - Name of the license.
 */
export const LicensesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: LicensesDeleteInput,
  outputSchema: LicensesDeleteOutput,
}));
// Input Schema
export const LicensesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  privateCloudName: Schema.String.pipe(T.PathParam()),
  licenseName: Schema.Literals(["VmwareFirewall"]).pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/licenses/{licenseName}",
  }),
);
export type LicensesGetInput = typeof LicensesGetInput.Type;

// Output Schema
export const LicensesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type LicensesGetOutput = typeof LicensesGetOutput.Type;

// The operation
/**
 * Get a License
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 * @param licenseName - Name of the license.
 */
export const LicensesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: LicensesGetInput,
  outputSchema: LicensesGetOutput,
}));
// Input Schema
export const LicensesGetPropertiesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    licenseName: Schema.Literals(["VmwareFirewall"]).pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/licenses/{licenseName}/getProperties",
    }),
  );
export type LicensesGetPropertiesInput = typeof LicensesGetPropertiesInput.Type;

// Output Schema
export const LicensesGetPropertiesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    kind: Schema.Literals(["VmwareFirewall"]),
    provisioningState: Schema.optional(
      Schema.Literals(["Succeeded", "Failed", "Canceled"]),
    ),
  });
export type LicensesGetPropertiesOutput =
  typeof LicensesGetPropertiesOutput.Type;

// The operation
/**
 * Just like ArmResourceActionSync, but with no request body.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 * @param licenseName - Name of the license.
 */
export const LicensesGetProperties = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: LicensesGetPropertiesInput,
    outputSchema: LicensesGetPropertiesOutput,
  }),
);
// Input Schema
export const LicensesListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  privateCloudName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/licenses",
  }),
);
export type LicensesListInput = typeof LicensesListInput.Type;

// Output Schema
export const LicensesListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(Schema.Struct({})),
  nextLink: Schema.optional(Schema.String),
});
export type LicensesListOutput = typeof LicensesListOutput.Type;

// The operation
/**
 * List License resources by PrivateCloud
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 */
export const LicensesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: LicensesListInput,
  outputSchema: LicensesListOutput,
}));
// Input Schema
export const LocationsCheckQuotaAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AVS/locations/{location}/checkQuotaAvailability",
    }),
  );
export type LocationsCheckQuotaAvailabilityInput =
  typeof LocationsCheckQuotaAvailabilityInput.Type;

// Output Schema
export const LocationsCheckQuotaAvailabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    hostsRemaining: Schema.optional(
      Schema.Record(Schema.String, Schema.Number),
    ),
    quotaEnabled: Schema.optional(Schema.Literals(["Enabled", "Disabled"])),
  });
export type LocationsCheckQuotaAvailabilityOutput =
  typeof LocationsCheckQuotaAvailabilityOutput.Type;

// The operation
/**
 * Return quota for subscription by region
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param location - The name of the Azure region.
 */
export const LocationsCheckQuotaAvailability =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LocationsCheckQuotaAvailabilityInput,
    outputSchema: LocationsCheckQuotaAvailabilityOutput,
  }));
// Input Schema
export const MaintenancesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  privateCloudName: Schema.String.pipe(T.PathParam()),
  maintenanceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/maintenances/{maintenanceName}",
  }),
);
export type MaintenancesGetInput = typeof MaintenancesGetInput.Type;

// Output Schema
export const MaintenancesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type MaintenancesGetOutput = typeof MaintenancesGetOutput.Type;

// The operation
/**
 * Get a Maintenance
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 * @param maintenanceName - Name of the maintenance
 */
export const MaintenancesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: MaintenancesGetInput,
  outputSchema: MaintenancesGetOutput,
}));
// Input Schema
export const MaintenancesInitiateChecksInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    maintenanceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/maintenances/{maintenanceName}/initiateChecks",
    }),
  );
export type MaintenancesInitiateChecksInput =
  typeof MaintenancesInitiateChecksInput.Type;

// Output Schema
export const MaintenancesInitiateChecksOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type MaintenancesInitiateChecksOutput =
  typeof MaintenancesInitiateChecksOutput.Type;

// The operation
/**
 * Initiate maintenance readiness checks
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 * @param maintenanceName - Name of the maintenance
 */
export const MaintenancesInitiateChecks = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: MaintenancesInitiateChecksInput,
    outputSchema: MaintenancesInitiateChecksOutput,
  }),
);
// Input Schema
export const MaintenancesListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  privateCloudName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
  stateName: Schema.optional(
    Schema.Literals([
      "NotScheduled",
      "Scheduled",
      "InProgress",
      "Success",
      "Failed",
      "Canceled",
    ]),
  ),
  status: Schema.optional(Schema.Literals(["Active", "Inactive"])),
  from: Schema.optional(Schema.String),
  to: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/maintenances",
  }),
);
export type MaintenancesListInput = typeof MaintenancesListInput.Type;

// Output Schema
export const MaintenancesListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  },
);
export type MaintenancesListOutput = typeof MaintenancesListOutput.Type;

// The operation
/**
 * List Maintenance resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 * @param stateName - Filter maintenances based on state
 * @param status - Filter active or inactive maintenances
 * @param from - date from which result should be returned. ie. scheduledStartTime >= from
 * @param to - date till which result should be returned. i.e. scheduledStartTime <= to
 */
export const MaintenancesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: MaintenancesListInput,
  outputSchema: MaintenancesListOutput,
}));
// Input Schema
export const MaintenancesRescheduleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    maintenanceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/maintenances/{maintenanceName}/reschedule",
    }),
  );
export type MaintenancesRescheduleInput =
  typeof MaintenancesRescheduleInput.Type;

// Output Schema
export const MaintenancesRescheduleOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type MaintenancesRescheduleOutput =
  typeof MaintenancesRescheduleOutput.Type;

// The operation
/**
 * Reschedule a maintenance
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 * @param maintenanceName - Name of the maintenance
 */
export const MaintenancesReschedule = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: MaintenancesRescheduleInput,
    outputSchema: MaintenancesRescheduleOutput,
  }),
);
// Input Schema
export const MaintenancesScheduleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    maintenanceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/maintenances/{maintenanceName}/schedule",
    }),
  );
export type MaintenancesScheduleInput = typeof MaintenancesScheduleInput.Type;

// Output Schema
export const MaintenancesScheduleOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type MaintenancesScheduleOutput = typeof MaintenancesScheduleOutput.Type;

// The operation
/**
 * Schedule a maintenance
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 * @param maintenanceName - Name of the maintenance
 */
export const MaintenancesSchedule = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: MaintenancesScheduleInput,
    outputSchema: MaintenancesScheduleOutput,
  }),
);
// Input Schema
export const PlacementPoliciesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    placementPolicyName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/clusters/{clusterName}/placementPolicies/{placementPolicyName}",
    }),
  );
export type PlacementPoliciesCreateOrUpdateInput =
  typeof PlacementPoliciesCreateOrUpdateInput.Type;

// Output Schema
export const PlacementPoliciesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PlacementPoliciesCreateOrUpdateOutput =
  typeof PlacementPoliciesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a PlacementPolicy
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 * @param clusterName - Name of the cluster
 * @param placementPolicyName - Name of the placement policy.
 */
export const PlacementPoliciesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PlacementPoliciesCreateOrUpdateInput,
    outputSchema: PlacementPoliciesCreateOrUpdateOutput,
  }));
// Input Schema
export const PlacementPoliciesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    placementPolicyName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/clusters/{clusterName}/placementPolicies/{placementPolicyName}",
    }),
  );
export type PlacementPoliciesDeleteInput =
  typeof PlacementPoliciesDeleteInput.Type;

// Output Schema
export const PlacementPoliciesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PlacementPoliciesDeleteOutput =
  typeof PlacementPoliciesDeleteOutput.Type;

// The operation
/**
 * Delete a PlacementPolicy
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 * @param clusterName - Name of the cluster
 * @param placementPolicyName - Name of the placement policy.
 */
export const PlacementPoliciesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PlacementPoliciesDeleteInput,
    outputSchema: PlacementPoliciesDeleteOutput,
  }),
);
// Input Schema
export const PlacementPoliciesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    placementPolicyName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/clusters/{clusterName}/placementPolicies/{placementPolicyName}",
    }),
  );
export type PlacementPoliciesGetInput = typeof PlacementPoliciesGetInput.Type;

// Output Schema
export const PlacementPoliciesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PlacementPoliciesGetOutput = typeof PlacementPoliciesGetOutput.Type;

// The operation
/**
 * Get a PlacementPolicy
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 * @param clusterName - Name of the cluster
 * @param placementPolicyName - Name of the placement policy.
 */
export const PlacementPoliciesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PlacementPoliciesGetInput,
    outputSchema: PlacementPoliciesGetOutput,
  }),
);
// Input Schema
export const PlacementPoliciesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/clusters/{clusterName}/placementPolicies",
    }),
  );
export type PlacementPoliciesListInput = typeof PlacementPoliciesListInput.Type;

// Output Schema
export const PlacementPoliciesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type PlacementPoliciesListOutput =
  typeof PlacementPoliciesListOutput.Type;

// The operation
/**
 * List PlacementPolicy resources by Cluster
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 * @param clusterName - Name of the cluster
 */
export const PlacementPoliciesList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PlacementPoliciesListInput,
    outputSchema: PlacementPoliciesListOutput,
  }),
);
// Input Schema
export const PlacementPoliciesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    placementPolicyName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/clusters/{clusterName}/placementPolicies/{placementPolicyName}",
    }),
  );
export type PlacementPoliciesUpdateInput =
  typeof PlacementPoliciesUpdateInput.Type;

// Output Schema
export const PlacementPoliciesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PlacementPoliciesUpdateOutput =
  typeof PlacementPoliciesUpdateOutput.Type;

// The operation
/**
 * Update a PlacementPolicy
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 * @param clusterName - Name of the cluster
 * @param placementPolicyName - Name of the placement policy.
 */
export const PlacementPoliciesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PlacementPoliciesUpdateInput,
    outputSchema: PlacementPoliciesUpdateOutput,
  }),
);
// Input Schema
export const PrivateCloudsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}",
    }),
  );
export type PrivateCloudsCreateOrUpdateInput =
  typeof PrivateCloudsCreateOrUpdateInput.Type;

// Output Schema
export const PrivateCloudsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type PrivateCloudsCreateOrUpdateOutput =
  typeof PrivateCloudsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a PrivateCloud
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 */
export const PrivateCloudsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PrivateCloudsCreateOrUpdateInput,
    outputSchema: PrivateCloudsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const PrivateCloudsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}",
    }),
  );
export type PrivateCloudsDeleteInput = typeof PrivateCloudsDeleteInput.Type;

// Output Schema
export const PrivateCloudsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PrivateCloudsDeleteOutput = typeof PrivateCloudsDeleteOutput.Type;

// The operation
/**
 * Delete a PrivateCloud
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 */
export const PrivateCloudsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PrivateCloudsDeleteInput,
  outputSchema: PrivateCloudsDeleteOutput,
}));
// Input Schema
export const PrivateCloudsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  privateCloudName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}",
  }),
);
export type PrivateCloudsGetInput = typeof PrivateCloudsGetInput.Type;

// Output Schema
export const PrivateCloudsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  },
);
export type PrivateCloudsGetOutput = typeof PrivateCloudsGetOutput.Type;

// The operation
/**
 * Get a PrivateCloud
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 */
export const PrivateCloudsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PrivateCloudsGetInput,
  outputSchema: PrivateCloudsGetOutput,
}));
// Input Schema
export const PrivateCloudsGetVcfLicenseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/getVcfLicense",
    }),
  );
export type PrivateCloudsGetVcfLicenseInput =
  typeof PrivateCloudsGetVcfLicenseInput.Type;

// Output Schema
export const PrivateCloudsGetVcfLicenseOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    kind: Schema.Literals(["vcf5"]),
    provisioningState: Schema.optional(
      Schema.Literals(["Succeeded", "Failed", "Canceled"]),
    ),
  });
export type PrivateCloudsGetVcfLicenseOutput =
  typeof PrivateCloudsGetVcfLicenseOutput.Type;

// The operation
/**
 * Get the license for the private cloud
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 */
export const PrivateCloudsGetVcfLicense = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PrivateCloudsGetVcfLicenseInput,
    outputSchema: PrivateCloudsGetVcfLicenseOutput,
  }),
);
// Input Schema
export const PrivateCloudsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds",
  }),
);
export type PrivateCloudsListInput = typeof PrivateCloudsListInput.Type;

// Output Schema
export const PrivateCloudsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type PrivateCloudsListOutput = typeof PrivateCloudsListOutput.Type;

// The operation
/**
 * List PrivateCloud resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const PrivateCloudsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PrivateCloudsListInput,
  outputSchema: PrivateCloudsListOutput,
}));
// Input Schema
export const PrivateCloudsListAdminCredentialsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/listAdminCredentials",
    }),
  );
export type PrivateCloudsListAdminCredentialsInput =
  typeof PrivateCloudsListAdminCredentialsInput.Type;

// Output Schema
export const PrivateCloudsListAdminCredentialsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nsxtUsername: Schema.optional(Schema.String),
    nsxtPassword: Schema.optional(SensitiveString),
    vcenterUsername: Schema.optional(Schema.String),
    vcenterPassword: Schema.optional(SensitiveString),
  });
export type PrivateCloudsListAdminCredentialsOutput =
  typeof PrivateCloudsListAdminCredentialsOutput.Type;

// The operation
/**
 * List the admin credentials for the private cloud
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 */
export const PrivateCloudsListAdminCredentials =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateCloudsListAdminCredentialsInput,
    outputSchema: PrivateCloudsListAdminCredentialsOutput,
  }));
// Input Schema
export const PrivateCloudsListInSubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AVS/privateClouds",
    }),
  );
export type PrivateCloudsListInSubscriptionInput =
  typeof PrivateCloudsListInSubscriptionInput.Type;

// Output Schema
export const PrivateCloudsListInSubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type PrivateCloudsListInSubscriptionOutput =
  typeof PrivateCloudsListInSubscriptionOutput.Type;

// The operation
/**
 * List PrivateCloud resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const PrivateCloudsListInSubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateCloudsListInSubscriptionInput,
    outputSchema: PrivateCloudsListInSubscriptionOutput,
  }));
// Input Schema
export const PrivateCloudsRotateNsxtPasswordInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/rotateNsxtPassword",
    }),
  );
export type PrivateCloudsRotateNsxtPasswordInput =
  typeof PrivateCloudsRotateNsxtPasswordInput.Type;

// Output Schema
export const PrivateCloudsRotateNsxtPasswordOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PrivateCloudsRotateNsxtPasswordOutput =
  typeof PrivateCloudsRotateNsxtPasswordOutput.Type;

// The operation
/**
 * Rotate the NSX-T Manager password
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 */
export const PrivateCloudsRotateNsxtPassword =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateCloudsRotateNsxtPasswordInput,
    outputSchema: PrivateCloudsRotateNsxtPasswordOutput,
  }));
// Input Schema
export const PrivateCloudsRotateVcenterPasswordInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/rotateVcenterPassword",
    }),
  );
export type PrivateCloudsRotateVcenterPasswordInput =
  typeof PrivateCloudsRotateVcenterPasswordInput.Type;

// Output Schema
export const PrivateCloudsRotateVcenterPasswordOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PrivateCloudsRotateVcenterPasswordOutput =
  typeof PrivateCloudsRotateVcenterPasswordOutput.Type;

// The operation
/**
 * Rotate the vCenter password
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 */
export const PrivateCloudsRotateVcenterPassword =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateCloudsRotateVcenterPasswordInput,
    outputSchema: PrivateCloudsRotateVcenterPasswordOutput,
  }));
// Input Schema
export const PrivateCloudsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}",
    }),
  );
export type PrivateCloudsUpdateInput = typeof PrivateCloudsUpdateInput.Type;

// Output Schema
export const PrivateCloudsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type PrivateCloudsUpdateOutput = typeof PrivateCloudsUpdateOutput.Type;

// The operation
/**
 * Update a PrivateCloud
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 */
export const PrivateCloudsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PrivateCloudsUpdateInput,
  outputSchema: PrivateCloudsUpdateOutput,
}));
// Input Schema
export const ProvisionedNetworksGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    provisionedNetworkName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/provisionedNetworks/{provisionedNetworkName}",
    }),
  );
export type ProvisionedNetworksGetInput =
  typeof ProvisionedNetworksGetInput.Type;

// Output Schema
export const ProvisionedNetworksGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ProvisionedNetworksGetOutput =
  typeof ProvisionedNetworksGetOutput.Type;

// The operation
/**
 * Get a ProvisionedNetwork
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 * @param provisionedNetworkName - Name of the cloud link.
 */
export const ProvisionedNetworksGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ProvisionedNetworksGetInput,
    outputSchema: ProvisionedNetworksGetOutput,
  }),
);
// Input Schema
export const ProvisionedNetworksListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/provisionedNetworks",
    }),
  );
export type ProvisionedNetworksListInput =
  typeof ProvisionedNetworksListInput.Type;

// Output Schema
export const ProvisionedNetworksListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type ProvisionedNetworksListOutput =
  typeof ProvisionedNetworksListOutput.Type;

// The operation
/**
 * List ProvisionedNetwork resources by PrivateCloud
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 */
export const ProvisionedNetworksList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ProvisionedNetworksListInput,
    outputSchema: ProvisionedNetworksListOutput,
  }),
);
// Input Schema
export const PureStoragePoliciesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    storagePolicyName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/pureStoragePolicies/{storagePolicyName}",
    }),
  );
export type PureStoragePoliciesCreateOrUpdateInput =
  typeof PureStoragePoliciesCreateOrUpdateInput.Type;

// Output Schema
export const PureStoragePoliciesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PureStoragePoliciesCreateOrUpdateOutput =
  typeof PureStoragePoliciesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a PureStoragePolicy
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 * @param storagePolicyName - Name of the storage policy.
 */
export const PureStoragePoliciesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PureStoragePoliciesCreateOrUpdateInput,
    outputSchema: PureStoragePoliciesCreateOrUpdateOutput,
  }));
// Input Schema
export const PureStoragePoliciesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    storagePolicyName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/pureStoragePolicies/{storagePolicyName}",
    }),
  );
export type PureStoragePoliciesDeleteInput =
  typeof PureStoragePoliciesDeleteInput.Type;

// Output Schema
export const PureStoragePoliciesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PureStoragePoliciesDeleteOutput =
  typeof PureStoragePoliciesDeleteOutput.Type;

// The operation
/**
 * Delete a PureStoragePolicy
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 * @param storagePolicyName - Name of the storage policy.
 */
export const PureStoragePoliciesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PureStoragePoliciesDeleteInput,
    outputSchema: PureStoragePoliciesDeleteOutput,
  }),
);
// Input Schema
export const PureStoragePoliciesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    storagePolicyName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/pureStoragePolicies/{storagePolicyName}",
    }),
  );
export type PureStoragePoliciesGetInput =
  typeof PureStoragePoliciesGetInput.Type;

// Output Schema
export const PureStoragePoliciesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PureStoragePoliciesGetOutput =
  typeof PureStoragePoliciesGetOutput.Type;

// The operation
/**
 * Get a PureStoragePolicy
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 * @param storagePolicyName - Name of the storage policy.
 */
export const PureStoragePoliciesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PureStoragePoliciesGetInput,
    outputSchema: PureStoragePoliciesGetOutput,
  }),
);
// Input Schema
export const PureStoragePoliciesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/pureStoragePolicies",
    }),
  );
export type PureStoragePoliciesListInput =
  typeof PureStoragePoliciesListInput.Type;

// Output Schema
export const PureStoragePoliciesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type PureStoragePoliciesListOutput =
  typeof PureStoragePoliciesListOutput.Type;

// The operation
/**
 * List PureStoragePolicy resources by PrivateCloud
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 */
export const PureStoragePoliciesList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PureStoragePoliciesListInput,
    outputSchema: PureStoragePoliciesListOutput,
  }),
);
// Input Schema
export const ScriptCmdletsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  privateCloudName: Schema.String.pipe(T.PathParam()),
  scriptPackageName: Schema.String.pipe(T.PathParam()),
  scriptCmdletName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/scriptPackages/{scriptPackageName}/scriptCmdlets/{scriptCmdletName}",
  }),
);
export type ScriptCmdletsGetInput = typeof ScriptCmdletsGetInput.Type;

// Output Schema
export const ScriptCmdletsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type ScriptCmdletsGetOutput = typeof ScriptCmdletsGetOutput.Type;

// The operation
/**
 * Get a ScriptCmdlet
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 * @param scriptPackageName - Name of the script package.
 * @param scriptCmdletName - Name of the script cmdlet.
 */
export const ScriptCmdletsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ScriptCmdletsGetInput,
  outputSchema: ScriptCmdletsGetOutput,
}));
// Input Schema
export const ScriptCmdletsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    scriptPackageName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/scriptPackages/{scriptPackageName}/scriptCmdlets",
  }),
);
export type ScriptCmdletsListInput = typeof ScriptCmdletsListInput.Type;

// Output Schema
export const ScriptCmdletsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type ScriptCmdletsListOutput = typeof ScriptCmdletsListOutput.Type;

// The operation
/**
 * List ScriptCmdlet resources by ScriptPackage
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 * @param scriptPackageName - Name of the script package.
 */
export const ScriptCmdletsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ScriptCmdletsListInput,
  outputSchema: ScriptCmdletsListOutput,
}));
// Input Schema
export const ScriptExecutionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    scriptExecutionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/scriptExecutions/{scriptExecutionName}",
    }),
  );
export type ScriptExecutionsCreateOrUpdateInput =
  typeof ScriptExecutionsCreateOrUpdateInput.Type;

// Output Schema
export const ScriptExecutionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ScriptExecutionsCreateOrUpdateOutput =
  typeof ScriptExecutionsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a ScriptExecution
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 * @param scriptExecutionName - Name of the script cmdlet.
 */
export const ScriptExecutionsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ScriptExecutionsCreateOrUpdateInput,
    outputSchema: ScriptExecutionsCreateOrUpdateOutput,
  }));
// Input Schema
export const ScriptExecutionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    scriptExecutionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/scriptExecutions/{scriptExecutionName}",
    }),
  );
export type ScriptExecutionsDeleteInput =
  typeof ScriptExecutionsDeleteInput.Type;

// Output Schema
export const ScriptExecutionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ScriptExecutionsDeleteOutput =
  typeof ScriptExecutionsDeleteOutput.Type;

// The operation
/**
 * Delete a ScriptExecution
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 * @param scriptExecutionName - Name of the script cmdlet.
 */
export const ScriptExecutionsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ScriptExecutionsDeleteInput,
    outputSchema: ScriptExecutionsDeleteOutput,
  }),
);
// Input Schema
export const ScriptExecutionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    scriptExecutionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/scriptExecutions/{scriptExecutionName}",
    }),
  );
export type ScriptExecutionsGetInput = typeof ScriptExecutionsGetInput.Type;

// Output Schema
export const ScriptExecutionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ScriptExecutionsGetOutput = typeof ScriptExecutionsGetOutput.Type;

// The operation
/**
 * Get a ScriptExecution
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 * @param scriptExecutionName - Name of the script cmdlet.
 */
export const ScriptExecutionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ScriptExecutionsGetInput,
  outputSchema: ScriptExecutionsGetOutput,
}));
// Input Schema
export const ScriptExecutionsGetExecutionLogsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    scriptExecutionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/scriptExecutions/{scriptExecutionName}/getExecutionLogs",
    }),
  );
export type ScriptExecutionsGetExecutionLogsInput =
  typeof ScriptExecutionsGetExecutionLogsInput.Type;

// Output Schema
export const ScriptExecutionsGetExecutionLogsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ScriptExecutionsGetExecutionLogsOutput =
  typeof ScriptExecutionsGetExecutionLogsOutput.Type;

// The operation
/**
 * Return the logs for a script execution resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 * @param scriptExecutionName - Name of the script cmdlet.
 */
export const ScriptExecutionsGetExecutionLogs =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ScriptExecutionsGetExecutionLogsInput,
    outputSchema: ScriptExecutionsGetExecutionLogsOutput,
  }));
// Input Schema
export const ScriptExecutionsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/scriptExecutions",
    }),
  );
export type ScriptExecutionsListInput = typeof ScriptExecutionsListInput.Type;

// Output Schema
export const ScriptExecutionsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type ScriptExecutionsListOutput = typeof ScriptExecutionsListOutput.Type;

// The operation
/**
 * List ScriptExecution resources by PrivateCloud
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 */
export const ScriptExecutionsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ScriptExecutionsListInput,
    outputSchema: ScriptExecutionsListOutput,
  }),
);
// Input Schema
export const ScriptPackagesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    scriptPackageName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/scriptPackages/{scriptPackageName}",
  }),
);
export type ScriptPackagesGetInput = typeof ScriptPackagesGetInput.Type;

// Output Schema
export const ScriptPackagesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ScriptPackagesGetOutput = typeof ScriptPackagesGetOutput.Type;

// The operation
/**
 * Get a ScriptPackage
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 * @param scriptPackageName - Name of the script package.
 */
export const ScriptPackagesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ScriptPackagesGetInput,
  outputSchema: ScriptPackagesGetOutput,
}));
// Input Schema
export const ScriptPackagesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/scriptPackages",
    }),
  );
export type ScriptPackagesListInput = typeof ScriptPackagesListInput.Type;

// Output Schema
export const ScriptPackagesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type ScriptPackagesListOutput = typeof ScriptPackagesListOutput.Type;

// The operation
/**
 * List ScriptPackage resources by PrivateCloud
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 */
export const ScriptPackagesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ScriptPackagesListInput,
  outputSchema: ScriptPackagesListOutput,
}));
// Input Schema
export const ServiceComponentsCheckAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    serviceComponentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AVS/locations/{location}/serviceComponents/{serviceComponentName}/checkAvailability",
    }),
  );
export type ServiceComponentsCheckAvailabilityInput =
  typeof ServiceComponentsCheckAvailabilityInput.Type;

// Output Schema
export const ServiceComponentsCheckAvailabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ServiceComponentsCheckAvailabilityOutput =
  typeof ServiceComponentsCheckAvailabilityOutput.Type;

// The operation
/**
 * Return service component availability
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param location - The name of the Azure region.
 * @param serviceComponentName - A service component
 */
export const ServiceComponentsCheckAvailability =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServiceComponentsCheckAvailabilityInput,
    outputSchema: ServiceComponentsCheckAvailabilityOutput,
  }));
// Input Schema
export const SkusListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.AVS/skus",
  }),
);
export type SkusListInput = typeof SkusListInput.Type;

// Output Schema
export const SkusListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(
    Schema.Struct({
      resourceType: Schema.Literals([
        "privateClouds",
        "privateClouds/clusters",
      ]),
      name: Schema.String,
      tier: Schema.optional(Schema.String),
      size: Schema.optional(Schema.String),
      family: Schema.optional(Schema.String),
      locations: Schema.Array(Schema.String),
      locationInfo: Schema.Array(
        Schema.Struct({
          location: Schema.String,
          zones: Schema.Array(Schema.String),
          zoneDetails: Schema.Array(
            Schema.Struct({
              name: Schema.Array(Schema.String),
              capabilities: Schema.Array(
                Schema.Struct({
                  name: Schema.String,
                  value: Schema.String,
                }),
              ),
            }),
          ),
        }),
      ),
      capabilities: Schema.optional(
        Schema.Array(
          Schema.Struct({
            name: Schema.String,
            value: Schema.String,
          }),
        ),
      ),
      restrictions: Schema.Array(
        Schema.Struct({
          type: Schema.optional(Schema.Literals(["Location", "Zone"])),
          values: Schema.Array(Schema.String),
          restrictionInfo: Schema.Struct({
            locations: Schema.optional(Schema.Array(Schema.String)),
            zones: Schema.optional(Schema.Array(Schema.String)),
          }),
          reasonCode: Schema.optional(
            Schema.Literals(["QuotaId", "NotAvailableForSubscription"]),
          ),
        }),
      ),
    }),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type SkusListOutput = typeof SkusListOutput.Type;

// The operation
/**
 * A list of SKUs.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const SkusList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SkusListInput,
  outputSchema: SkusListOutput,
}));
// Input Schema
export const VirtualMachinesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    virtualMachineId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/clusters/{clusterName}/virtualMachines/{virtualMachineId}",
    }),
  );
export type VirtualMachinesGetInput = typeof VirtualMachinesGetInput.Type;

// Output Schema
export const VirtualMachinesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type VirtualMachinesGetOutput = typeof VirtualMachinesGetOutput.Type;

// The operation
/**
 * Get a VirtualMachine
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 * @param clusterName - Name of the cluster
 * @param virtualMachineId - ID of the virtual machine.
 */
export const VirtualMachinesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: VirtualMachinesGetInput,
  outputSchema: VirtualMachinesGetOutput,
}));
// Input Schema
export const VirtualMachinesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/clusters/{clusterName}/virtualMachines",
    }),
  );
export type VirtualMachinesListInput = typeof VirtualMachinesListInput.Type;

// Output Schema
export const VirtualMachinesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type VirtualMachinesListOutput = typeof VirtualMachinesListOutput.Type;

// The operation
/**
 * List VirtualMachine resources by Cluster
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 * @param clusterName - Name of the cluster
 */
export const VirtualMachinesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: VirtualMachinesListInput,
  outputSchema: VirtualMachinesListOutput,
}));
// Input Schema
export const VirtualMachinesRestrictMovementInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    virtualMachineId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/clusters/{clusterName}/virtualMachines/{virtualMachineId}/restrictMovement",
    }),
  );
export type VirtualMachinesRestrictMovementInput =
  typeof VirtualMachinesRestrictMovementInput.Type;

// Output Schema
export const VirtualMachinesRestrictMovementOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type VirtualMachinesRestrictMovementOutput =
  typeof VirtualMachinesRestrictMovementOutput.Type;

// The operation
/**
 * Enable or disable DRS-driven VM movement restriction
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 * @param clusterName - Name of the cluster
 * @param virtualMachineId - ID of the virtual machine.
 */
export const VirtualMachinesRestrictMovement =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: VirtualMachinesRestrictMovementInput,
    outputSchema: VirtualMachinesRestrictMovementOutput,
  }));
// Input Schema
export const WorkloadNetworksCreateDhcpInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    dhcpId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/workloadNetworks/default/dhcpConfigurations/{dhcpId}",
    }),
  );
export type WorkloadNetworksCreateDhcpInput =
  typeof WorkloadNetworksCreateDhcpInput.Type;

// Output Schema
export const WorkloadNetworksCreateDhcpOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WorkloadNetworksCreateDhcpOutput =
  typeof WorkloadNetworksCreateDhcpOutput.Type;

// The operation
/**
 * Create a WorkloadNetworkDhcp
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 * @param dhcpId - The ID of the DHCP configuration
 */
export const WorkloadNetworksCreateDhcp = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WorkloadNetworksCreateDhcpInput,
    outputSchema: WorkloadNetworksCreateDhcpOutput,
  }),
);
// Input Schema
export const WorkloadNetworksCreateDnsServiceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    dnsServiceId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/workloadNetworks/default/dnsServices/{dnsServiceId}",
    }),
  );
export type WorkloadNetworksCreateDnsServiceInput =
  typeof WorkloadNetworksCreateDnsServiceInput.Type;

// Output Schema
export const WorkloadNetworksCreateDnsServiceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WorkloadNetworksCreateDnsServiceOutput =
  typeof WorkloadNetworksCreateDnsServiceOutput.Type;

// The operation
/**
 * Create a WorkloadNetworkDnsService
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 * @param dnsServiceId - ID of the DNS service.
 */
export const WorkloadNetworksCreateDnsService =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkloadNetworksCreateDnsServiceInput,
    outputSchema: WorkloadNetworksCreateDnsServiceOutput,
  }));
// Input Schema
export const WorkloadNetworksCreateDnsZoneInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    dnsZoneId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/workloadNetworks/default/dnsZones/{dnsZoneId}",
    }),
  );
export type WorkloadNetworksCreateDnsZoneInput =
  typeof WorkloadNetworksCreateDnsZoneInput.Type;

// Output Schema
export const WorkloadNetworksCreateDnsZoneOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WorkloadNetworksCreateDnsZoneOutput =
  typeof WorkloadNetworksCreateDnsZoneOutput.Type;

// The operation
/**
 * Create a WorkloadNetworkDnsZone
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 * @param dnsZoneId - ID of the DNS zone.
 */
export const WorkloadNetworksCreateDnsZone =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkloadNetworksCreateDnsZoneInput,
    outputSchema: WorkloadNetworksCreateDnsZoneOutput,
  }));
// Input Schema
export const WorkloadNetworksCreatePortMirroringInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    portMirroringId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/workloadNetworks/default/portMirroringProfiles/{portMirroringId}",
    }),
  );
export type WorkloadNetworksCreatePortMirroringInput =
  typeof WorkloadNetworksCreatePortMirroringInput.Type;

// Output Schema
export const WorkloadNetworksCreatePortMirroringOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WorkloadNetworksCreatePortMirroringOutput =
  typeof WorkloadNetworksCreatePortMirroringOutput.Type;

// The operation
/**
 * Create a WorkloadNetworkPortMirroring
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 * @param portMirroringId - ID of the NSX port mirroring profile.
 */
export const WorkloadNetworksCreatePortMirroring =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkloadNetworksCreatePortMirroringInput,
    outputSchema: WorkloadNetworksCreatePortMirroringOutput,
  }));
// Input Schema
export const WorkloadNetworksCreatePublicIPInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    publicIPId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/workloadNetworks/default/publicIPs/{publicIPId}",
    }),
  );
export type WorkloadNetworksCreatePublicIPInput =
  typeof WorkloadNetworksCreatePublicIPInput.Type;

// Output Schema
export const WorkloadNetworksCreatePublicIPOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WorkloadNetworksCreatePublicIPOutput =
  typeof WorkloadNetworksCreatePublicIPOutput.Type;

// The operation
/**
 * Create a WorkloadNetworkPublicIP
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 * @param publicIPId - ID of the DNS zone.
 */
export const WorkloadNetworksCreatePublicIP =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkloadNetworksCreatePublicIPInput,
    outputSchema: WorkloadNetworksCreatePublicIPOutput,
  }));
// Input Schema
export const WorkloadNetworksCreateSegmentsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    segmentId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/workloadNetworks/default/segments/{segmentId}",
    }),
  );
export type WorkloadNetworksCreateSegmentsInput =
  typeof WorkloadNetworksCreateSegmentsInput.Type;

// Output Schema
export const WorkloadNetworksCreateSegmentsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WorkloadNetworksCreateSegmentsOutput =
  typeof WorkloadNetworksCreateSegmentsOutput.Type;

// The operation
/**
 * Create a WorkloadNetworkSegment
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 * @param segmentId - The ID of the NSX Segment
 */
export const WorkloadNetworksCreateSegments =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkloadNetworksCreateSegmentsInput,
    outputSchema: WorkloadNetworksCreateSegmentsOutput,
  }));
// Input Schema
export const WorkloadNetworksCreateVMGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    vmGroupId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/workloadNetworks/default/vmGroups/{vmGroupId}",
    }),
  );
export type WorkloadNetworksCreateVMGroupInput =
  typeof WorkloadNetworksCreateVMGroupInput.Type;

// Output Schema
export const WorkloadNetworksCreateVMGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WorkloadNetworksCreateVMGroupOutput =
  typeof WorkloadNetworksCreateVMGroupOutput.Type;

// The operation
/**
 * Create a WorkloadNetworkVMGroup
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 * @param vmGroupId - ID of the VM group.
 */
export const WorkloadNetworksCreateVMGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkloadNetworksCreateVMGroupInput,
    outputSchema: WorkloadNetworksCreateVMGroupOutput,
  }));
// Input Schema
export const WorkloadNetworksDeleteDhcpInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    dhcpId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/workloadNetworks/default/dhcpConfigurations/{dhcpId}",
    }),
  );
export type WorkloadNetworksDeleteDhcpInput =
  typeof WorkloadNetworksDeleteDhcpInput.Type;

// Output Schema
export const WorkloadNetworksDeleteDhcpOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type WorkloadNetworksDeleteDhcpOutput =
  typeof WorkloadNetworksDeleteDhcpOutput.Type;

// The operation
/**
 * Delete a WorkloadNetworkDhcp
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 * @param dhcpId - The ID of the DHCP configuration
 */
export const WorkloadNetworksDeleteDhcp = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WorkloadNetworksDeleteDhcpInput,
    outputSchema: WorkloadNetworksDeleteDhcpOutput,
  }),
);
// Input Schema
export const WorkloadNetworksDeleteDnsServiceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/workloadNetworks/default/dnsServices/{dnsServiceId}",
    }),
  );
export type WorkloadNetworksDeleteDnsServiceInput =
  typeof WorkloadNetworksDeleteDnsServiceInput.Type;

// Output Schema
export const WorkloadNetworksDeleteDnsServiceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type WorkloadNetworksDeleteDnsServiceOutput =
  typeof WorkloadNetworksDeleteDnsServiceOutput.Type;

// The operation
/**
 * Delete a WorkloadNetworkDnsService
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const WorkloadNetworksDeleteDnsService =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkloadNetworksDeleteDnsServiceInput,
    outputSchema: WorkloadNetworksDeleteDnsServiceOutput,
  }));
// Input Schema
export const WorkloadNetworksDeleteDnsZoneInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/workloadNetworks/default/dnsZones/{dnsZoneId}",
    }),
  );
export type WorkloadNetworksDeleteDnsZoneInput =
  typeof WorkloadNetworksDeleteDnsZoneInput.Type;

// Output Schema
export const WorkloadNetworksDeleteDnsZoneOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type WorkloadNetworksDeleteDnsZoneOutput =
  typeof WorkloadNetworksDeleteDnsZoneOutput.Type;

// The operation
/**
 * Delete a WorkloadNetworkDnsZone
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const WorkloadNetworksDeleteDnsZone =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkloadNetworksDeleteDnsZoneInput,
    outputSchema: WorkloadNetworksDeleteDnsZoneOutput,
  }));
// Input Schema
export const WorkloadNetworksDeletePortMirroringInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/workloadNetworks/default/portMirroringProfiles/{portMirroringId}",
    }),
  );
export type WorkloadNetworksDeletePortMirroringInput =
  typeof WorkloadNetworksDeletePortMirroringInput.Type;

// Output Schema
export const WorkloadNetworksDeletePortMirroringOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type WorkloadNetworksDeletePortMirroringOutput =
  typeof WorkloadNetworksDeletePortMirroringOutput.Type;

// The operation
/**
 * Delete a WorkloadNetworkPortMirroring
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const WorkloadNetworksDeletePortMirroring =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkloadNetworksDeletePortMirroringInput,
    outputSchema: WorkloadNetworksDeletePortMirroringOutput,
  }));
// Input Schema
export const WorkloadNetworksDeletePublicIPInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/workloadNetworks/default/publicIPs/{publicIPId}",
    }),
  );
export type WorkloadNetworksDeletePublicIPInput =
  typeof WorkloadNetworksDeletePublicIPInput.Type;

// Output Schema
export const WorkloadNetworksDeletePublicIPOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type WorkloadNetworksDeletePublicIPOutput =
  typeof WorkloadNetworksDeletePublicIPOutput.Type;

// The operation
/**
 * Delete a WorkloadNetworkPublicIP
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const WorkloadNetworksDeletePublicIP =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkloadNetworksDeletePublicIPInput,
    outputSchema: WorkloadNetworksDeletePublicIPOutput,
  }));
// Input Schema
export const WorkloadNetworksDeleteSegmentInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    segmentId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/workloadNetworks/default/segments/{segmentId}",
    }),
  );
export type WorkloadNetworksDeleteSegmentInput =
  typeof WorkloadNetworksDeleteSegmentInput.Type;

// Output Schema
export const WorkloadNetworksDeleteSegmentOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type WorkloadNetworksDeleteSegmentOutput =
  typeof WorkloadNetworksDeleteSegmentOutput.Type;

// The operation
/**
 * Delete a WorkloadNetworkSegment
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 * @param segmentId - The ID of the NSX Segment
 */
export const WorkloadNetworksDeleteSegment =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkloadNetworksDeleteSegmentInput,
    outputSchema: WorkloadNetworksDeleteSegmentOutput,
  }));
// Input Schema
export const WorkloadNetworksDeleteVMGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/workloadNetworks/default/vmGroups/{vmGroupId}",
    }),
  );
export type WorkloadNetworksDeleteVMGroupInput =
  typeof WorkloadNetworksDeleteVMGroupInput.Type;

// Output Schema
export const WorkloadNetworksDeleteVMGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type WorkloadNetworksDeleteVMGroupOutput =
  typeof WorkloadNetworksDeleteVMGroupOutput.Type;

// The operation
/**
 * Delete a WorkloadNetworkVMGroup
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const WorkloadNetworksDeleteVMGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkloadNetworksDeleteVMGroupInput,
    outputSchema: WorkloadNetworksDeleteVMGroupOutput,
  }));
// Input Schema
export const WorkloadNetworksGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/workloadNetworks/default",
    }),
  );
export type WorkloadNetworksGetInput = typeof WorkloadNetworksGetInput.Type;

// Output Schema
export const WorkloadNetworksGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WorkloadNetworksGetOutput = typeof WorkloadNetworksGetOutput.Type;

// The operation
/**
 * Get a WorkloadNetwork
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 */
export const WorkloadNetworksGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WorkloadNetworksGetInput,
  outputSchema: WorkloadNetworksGetOutput,
}));
// Input Schema
export const WorkloadNetworksGetDhcpInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/workloadNetworks/default/dhcpConfigurations/{dhcpId}",
    }),
  );
export type WorkloadNetworksGetDhcpInput =
  typeof WorkloadNetworksGetDhcpInput.Type;

// Output Schema
export const WorkloadNetworksGetDhcpOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WorkloadNetworksGetDhcpOutput =
  typeof WorkloadNetworksGetDhcpOutput.Type;

// The operation
/**
 * Get a WorkloadNetworkDhcp
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const WorkloadNetworksGetDhcp = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WorkloadNetworksGetDhcpInput,
    outputSchema: WorkloadNetworksGetDhcpOutput,
  }),
);
// Input Schema
export const WorkloadNetworksGetDnsServiceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    dnsServiceId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/workloadNetworks/default/dnsServices/{dnsServiceId}",
    }),
  );
export type WorkloadNetworksGetDnsServiceInput =
  typeof WorkloadNetworksGetDnsServiceInput.Type;

// Output Schema
export const WorkloadNetworksGetDnsServiceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WorkloadNetworksGetDnsServiceOutput =
  typeof WorkloadNetworksGetDnsServiceOutput.Type;

// The operation
/**
 * Get a WorkloadNetworkDnsService
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 * @param dnsServiceId - ID of the DNS service.
 */
export const WorkloadNetworksGetDnsService =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkloadNetworksGetDnsServiceInput,
    outputSchema: WorkloadNetworksGetDnsServiceOutput,
  }));
// Input Schema
export const WorkloadNetworksGetDnsZoneInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    dnsZoneId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/workloadNetworks/default/dnsZones/{dnsZoneId}",
    }),
  );
export type WorkloadNetworksGetDnsZoneInput =
  typeof WorkloadNetworksGetDnsZoneInput.Type;

// Output Schema
export const WorkloadNetworksGetDnsZoneOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WorkloadNetworksGetDnsZoneOutput =
  typeof WorkloadNetworksGetDnsZoneOutput.Type;

// The operation
/**
 * Get a WorkloadNetworkDnsZone
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 * @param dnsZoneId - ID of the DNS zone.
 */
export const WorkloadNetworksGetDnsZone = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WorkloadNetworksGetDnsZoneInput,
    outputSchema: WorkloadNetworksGetDnsZoneOutput,
  }),
);
// Input Schema
export const WorkloadNetworksGetGatewayInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    gatewayId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/workloadNetworks/default/gateways/{gatewayId}",
    }),
  );
export type WorkloadNetworksGetGatewayInput =
  typeof WorkloadNetworksGetGatewayInput.Type;

// Output Schema
export const WorkloadNetworksGetGatewayOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WorkloadNetworksGetGatewayOutput =
  typeof WorkloadNetworksGetGatewayOutput.Type;

// The operation
/**
 * Get a WorkloadNetworkGateway
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 * @param gatewayId - The ID of the NSX Gateway
 */
export const WorkloadNetworksGetGateway = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WorkloadNetworksGetGatewayInput,
    outputSchema: WorkloadNetworksGetGatewayOutput,
  }),
);
// Input Schema
export const WorkloadNetworksGetPortMirroringInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    portMirroringId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/workloadNetworks/default/portMirroringProfiles/{portMirroringId}",
    }),
  );
export type WorkloadNetworksGetPortMirroringInput =
  typeof WorkloadNetworksGetPortMirroringInput.Type;

// Output Schema
export const WorkloadNetworksGetPortMirroringOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WorkloadNetworksGetPortMirroringOutput =
  typeof WorkloadNetworksGetPortMirroringOutput.Type;

// The operation
/**
 * Get a WorkloadNetworkPortMirroring
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 * @param portMirroringId - ID of the NSX port mirroring profile.
 */
export const WorkloadNetworksGetPortMirroring =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkloadNetworksGetPortMirroringInput,
    outputSchema: WorkloadNetworksGetPortMirroringOutput,
  }));
// Input Schema
export const WorkloadNetworksGetPublicIPInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    publicIPId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/workloadNetworks/default/publicIPs/{publicIPId}",
    }),
  );
export type WorkloadNetworksGetPublicIPInput =
  typeof WorkloadNetworksGetPublicIPInput.Type;

// Output Schema
export const WorkloadNetworksGetPublicIPOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WorkloadNetworksGetPublicIPOutput =
  typeof WorkloadNetworksGetPublicIPOutput.Type;

// The operation
/**
 * Get a WorkloadNetworkPublicIP
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 * @param publicIPId - ID of the DNS zone.
 */
export const WorkloadNetworksGetPublicIP = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WorkloadNetworksGetPublicIPInput,
    outputSchema: WorkloadNetworksGetPublicIPOutput,
  }),
);
// Input Schema
export const WorkloadNetworksGetSegmentInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    segmentId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/workloadNetworks/default/segments/{segmentId}",
    }),
  );
export type WorkloadNetworksGetSegmentInput =
  typeof WorkloadNetworksGetSegmentInput.Type;

// Output Schema
export const WorkloadNetworksGetSegmentOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WorkloadNetworksGetSegmentOutput =
  typeof WorkloadNetworksGetSegmentOutput.Type;

// The operation
/**
 * Get a WorkloadNetworkSegment
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 * @param segmentId - The ID of the NSX Segment
 */
export const WorkloadNetworksGetSegment = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WorkloadNetworksGetSegmentInput,
    outputSchema: WorkloadNetworksGetSegmentOutput,
  }),
);
// Input Schema
export const WorkloadNetworksGetVirtualMachineInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    virtualMachineId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/workloadNetworks/default/virtualMachines/{virtualMachineId}",
    }),
  );
export type WorkloadNetworksGetVirtualMachineInput =
  typeof WorkloadNetworksGetVirtualMachineInput.Type;

// Output Schema
export const WorkloadNetworksGetVirtualMachineOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WorkloadNetworksGetVirtualMachineOutput =
  typeof WorkloadNetworksGetVirtualMachineOutput.Type;

// The operation
/**
 * Get a WorkloadNetworkVirtualMachine
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 * @param virtualMachineId - ID of the virtual machine.
 */
export const WorkloadNetworksGetVirtualMachine =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkloadNetworksGetVirtualMachineInput,
    outputSchema: WorkloadNetworksGetVirtualMachineOutput,
  }));
// Input Schema
export const WorkloadNetworksGetVMGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    vmGroupId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/workloadNetworks/default/vmGroups/{vmGroupId}",
    }),
  );
export type WorkloadNetworksGetVMGroupInput =
  typeof WorkloadNetworksGetVMGroupInput.Type;

// Output Schema
export const WorkloadNetworksGetVMGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WorkloadNetworksGetVMGroupOutput =
  typeof WorkloadNetworksGetVMGroupOutput.Type;

// The operation
/**
 * Get a WorkloadNetworkVMGroup
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 * @param vmGroupId - ID of the VM group.
 */
export const WorkloadNetworksGetVMGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WorkloadNetworksGetVMGroupInput,
    outputSchema: WorkloadNetworksGetVMGroupOutput,
  }),
);
// Input Schema
export const WorkloadNetworksListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/workloadNetworks",
    }),
  );
export type WorkloadNetworksListInput = typeof WorkloadNetworksListInput.Type;

// Output Schema
export const WorkloadNetworksListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type WorkloadNetworksListOutput = typeof WorkloadNetworksListOutput.Type;

// The operation
/**
 * List WorkloadNetwork resources by PrivateCloud
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 */
export const WorkloadNetworksList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WorkloadNetworksListInput,
    outputSchema: WorkloadNetworksListOutput,
  }),
);
// Input Schema
export const WorkloadNetworksListDhcpInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/workloadNetworks/default/dhcpConfigurations",
    }),
  );
export type WorkloadNetworksListDhcpInput =
  typeof WorkloadNetworksListDhcpInput.Type;

// Output Schema
export const WorkloadNetworksListDhcpOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type WorkloadNetworksListDhcpOutput =
  typeof WorkloadNetworksListDhcpOutput.Type;

// The operation
/**
 * List WorkloadNetworkDhcp resources by WorkloadNetwork
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 */
export const WorkloadNetworksListDhcp = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WorkloadNetworksListDhcpInput,
    outputSchema: WorkloadNetworksListDhcpOutput,
  }),
);
// Input Schema
export const WorkloadNetworksListDnsServicesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/workloadNetworks/default/dnsServices",
    }),
  );
export type WorkloadNetworksListDnsServicesInput =
  typeof WorkloadNetworksListDnsServicesInput.Type;

// Output Schema
export const WorkloadNetworksListDnsServicesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type WorkloadNetworksListDnsServicesOutput =
  typeof WorkloadNetworksListDnsServicesOutput.Type;

// The operation
/**
 * List WorkloadNetworkDnsService resources by WorkloadNetwork
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 */
export const WorkloadNetworksListDnsServices =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkloadNetworksListDnsServicesInput,
    outputSchema: WorkloadNetworksListDnsServicesOutput,
  }));
// Input Schema
export const WorkloadNetworksListDnsZonesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/workloadNetworks/default/dnsZones",
    }),
  );
export type WorkloadNetworksListDnsZonesInput =
  typeof WorkloadNetworksListDnsZonesInput.Type;

// Output Schema
export const WorkloadNetworksListDnsZonesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type WorkloadNetworksListDnsZonesOutput =
  typeof WorkloadNetworksListDnsZonesOutput.Type;

// The operation
/**
 * List WorkloadNetworkDnsZone resources by WorkloadNetwork
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 */
export const WorkloadNetworksListDnsZones =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkloadNetworksListDnsZonesInput,
    outputSchema: WorkloadNetworksListDnsZonesOutput,
  }));
// Input Schema
export const WorkloadNetworksListGatewaysInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/workloadNetworks/default/gateways",
    }),
  );
export type WorkloadNetworksListGatewaysInput =
  typeof WorkloadNetworksListGatewaysInput.Type;

// Output Schema
export const WorkloadNetworksListGatewaysOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type WorkloadNetworksListGatewaysOutput =
  typeof WorkloadNetworksListGatewaysOutput.Type;

// The operation
/**
 * List WorkloadNetworkGateway resources by WorkloadNetwork
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 */
export const WorkloadNetworksListGateways =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkloadNetworksListGatewaysInput,
    outputSchema: WorkloadNetworksListGatewaysOutput,
  }));
// Input Schema
export const WorkloadNetworksListPortMirroringInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/workloadNetworks/default/portMirroringProfiles",
    }),
  );
export type WorkloadNetworksListPortMirroringInput =
  typeof WorkloadNetworksListPortMirroringInput.Type;

// Output Schema
export const WorkloadNetworksListPortMirroringOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type WorkloadNetworksListPortMirroringOutput =
  typeof WorkloadNetworksListPortMirroringOutput.Type;

// The operation
/**
 * List WorkloadNetworkPortMirroring resources by WorkloadNetwork
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 */
export const WorkloadNetworksListPortMirroring =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkloadNetworksListPortMirroringInput,
    outputSchema: WorkloadNetworksListPortMirroringOutput,
  }));
// Input Schema
export const WorkloadNetworksListPublicIPsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/workloadNetworks/default/publicIPs",
    }),
  );
export type WorkloadNetworksListPublicIPsInput =
  typeof WorkloadNetworksListPublicIPsInput.Type;

// Output Schema
export const WorkloadNetworksListPublicIPsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type WorkloadNetworksListPublicIPsOutput =
  typeof WorkloadNetworksListPublicIPsOutput.Type;

// The operation
/**
 * List WorkloadNetworkPublicIP resources by WorkloadNetwork
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 */
export const WorkloadNetworksListPublicIPs =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkloadNetworksListPublicIPsInput,
    outputSchema: WorkloadNetworksListPublicIPsOutput,
  }));
// Input Schema
export const WorkloadNetworksListSegmentsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/workloadNetworks/default/segments",
    }),
  );
export type WorkloadNetworksListSegmentsInput =
  typeof WorkloadNetworksListSegmentsInput.Type;

// Output Schema
export const WorkloadNetworksListSegmentsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type WorkloadNetworksListSegmentsOutput =
  typeof WorkloadNetworksListSegmentsOutput.Type;

// The operation
/**
 * List WorkloadNetworkSegment resources by WorkloadNetwork
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 */
export const WorkloadNetworksListSegments =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkloadNetworksListSegmentsInput,
    outputSchema: WorkloadNetworksListSegmentsOutput,
  }));
// Input Schema
export const WorkloadNetworksListVirtualMachinesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/workloadNetworks/default/virtualMachines",
    }),
  );
export type WorkloadNetworksListVirtualMachinesInput =
  typeof WorkloadNetworksListVirtualMachinesInput.Type;

// Output Schema
export const WorkloadNetworksListVirtualMachinesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type WorkloadNetworksListVirtualMachinesOutput =
  typeof WorkloadNetworksListVirtualMachinesOutput.Type;

// The operation
/**
 * List WorkloadNetworkVirtualMachine resources by WorkloadNetwork
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 */
export const WorkloadNetworksListVirtualMachines =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkloadNetworksListVirtualMachinesInput,
    outputSchema: WorkloadNetworksListVirtualMachinesOutput,
  }));
// Input Schema
export const WorkloadNetworksListVMGroupsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/workloadNetworks/default/vmGroups",
    }),
  );
export type WorkloadNetworksListVMGroupsInput =
  typeof WorkloadNetworksListVMGroupsInput.Type;

// Output Schema
export const WorkloadNetworksListVMGroupsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type WorkloadNetworksListVMGroupsOutput =
  typeof WorkloadNetworksListVMGroupsOutput.Type;

// The operation
/**
 * List WorkloadNetworkVMGroup resources by WorkloadNetwork
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 */
export const WorkloadNetworksListVMGroups =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkloadNetworksListVMGroupsInput,
    outputSchema: WorkloadNetworksListVMGroupsOutput,
  }));
// Input Schema
export const WorkloadNetworksUpdateDhcpInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    dhcpId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/workloadNetworks/default/dhcpConfigurations/{dhcpId}",
    }),
  );
export type WorkloadNetworksUpdateDhcpInput =
  typeof WorkloadNetworksUpdateDhcpInput.Type;

// Output Schema
export const WorkloadNetworksUpdateDhcpOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WorkloadNetworksUpdateDhcpOutput =
  typeof WorkloadNetworksUpdateDhcpOutput.Type;

// The operation
/**
 * Update a WorkloadNetworkDhcp
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 * @param dhcpId - The ID of the DHCP configuration
 */
export const WorkloadNetworksUpdateDhcp = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WorkloadNetworksUpdateDhcpInput,
    outputSchema: WorkloadNetworksUpdateDhcpOutput,
  }),
);
// Input Schema
export const WorkloadNetworksUpdateDnsServiceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    dnsServiceId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/workloadNetworks/default/dnsServices/{dnsServiceId}",
    }),
  );
export type WorkloadNetworksUpdateDnsServiceInput =
  typeof WorkloadNetworksUpdateDnsServiceInput.Type;

// Output Schema
export const WorkloadNetworksUpdateDnsServiceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WorkloadNetworksUpdateDnsServiceOutput =
  typeof WorkloadNetworksUpdateDnsServiceOutput.Type;

// The operation
/**
 * Update a WorkloadNetworkDnsService
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 * @param dnsServiceId - ID of the DNS service.
 */
export const WorkloadNetworksUpdateDnsService =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkloadNetworksUpdateDnsServiceInput,
    outputSchema: WorkloadNetworksUpdateDnsServiceOutput,
  }));
// Input Schema
export const WorkloadNetworksUpdateDnsZoneInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    dnsZoneId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/workloadNetworks/default/dnsZones/{dnsZoneId}",
    }),
  );
export type WorkloadNetworksUpdateDnsZoneInput =
  typeof WorkloadNetworksUpdateDnsZoneInput.Type;

// Output Schema
export const WorkloadNetworksUpdateDnsZoneOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WorkloadNetworksUpdateDnsZoneOutput =
  typeof WorkloadNetworksUpdateDnsZoneOutput.Type;

// The operation
/**
 * Update a WorkloadNetworkDnsZone
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 * @param dnsZoneId - ID of the DNS zone.
 */
export const WorkloadNetworksUpdateDnsZone =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkloadNetworksUpdateDnsZoneInput,
    outputSchema: WorkloadNetworksUpdateDnsZoneOutput,
  }));
// Input Schema
export const WorkloadNetworksUpdatePortMirroringInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    portMirroringId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/workloadNetworks/default/portMirroringProfiles/{portMirroringId}",
    }),
  );
export type WorkloadNetworksUpdatePortMirroringInput =
  typeof WorkloadNetworksUpdatePortMirroringInput.Type;

// Output Schema
export const WorkloadNetworksUpdatePortMirroringOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WorkloadNetworksUpdatePortMirroringOutput =
  typeof WorkloadNetworksUpdatePortMirroringOutput.Type;

// The operation
/**
 * Update a WorkloadNetworkPortMirroring
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 * @param portMirroringId - ID of the NSX port mirroring profile.
 */
export const WorkloadNetworksUpdatePortMirroring =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkloadNetworksUpdatePortMirroringInput,
    outputSchema: WorkloadNetworksUpdatePortMirroringOutput,
  }));
// Input Schema
export const WorkloadNetworksUpdateSegmentsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    segmentId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/workloadNetworks/default/segments/{segmentId}",
    }),
  );
export type WorkloadNetworksUpdateSegmentsInput =
  typeof WorkloadNetworksUpdateSegmentsInput.Type;

// Output Schema
export const WorkloadNetworksUpdateSegmentsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WorkloadNetworksUpdateSegmentsOutput =
  typeof WorkloadNetworksUpdateSegmentsOutput.Type;

// The operation
/**
 * Update a WorkloadNetworkSegment
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 * @param segmentId - The ID of the NSX Segment
 */
export const WorkloadNetworksUpdateSegments =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkloadNetworksUpdateSegmentsInput,
    outputSchema: WorkloadNetworksUpdateSegmentsOutput,
  }));
// Input Schema
export const WorkloadNetworksUpdateVMGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateCloudName: Schema.String.pipe(T.PathParam()),
    vmGroupId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/workloadNetworks/default/vmGroups/{vmGroupId}",
    }),
  );
export type WorkloadNetworksUpdateVMGroupInput =
  typeof WorkloadNetworksUpdateVMGroupInput.Type;

// Output Schema
export const WorkloadNetworksUpdateVMGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WorkloadNetworksUpdateVMGroupOutput =
  typeof WorkloadNetworksUpdateVMGroupOutput.Type;

// The operation
/**
 * Update a WorkloadNetworkVMGroup
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateCloudName - Name of the private cloud
 * @param vmGroupId - ID of the VM group.
 */
export const WorkloadNetworksUpdateVMGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkloadNetworksUpdateVMGroupInput,
    outputSchema: WorkloadNetworksUpdateVMGroupOutput,
  }));
