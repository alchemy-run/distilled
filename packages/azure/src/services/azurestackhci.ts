/**
 * Azure Azurestackhci API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const ArcSettingsConsentAndInstallDefaultExtensionsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    arcSettingName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/arcSettings/{arcSettingName}/consentAndInstallDefaultExtensions",
    }),
  );
export type ArcSettingsConsentAndInstallDefaultExtensionsInput =
  typeof ArcSettingsConsentAndInstallDefaultExtensionsInput.Type;

// Output Schema
export const ArcSettingsConsentAndInstallDefaultExtensionsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ArcSettingsConsentAndInstallDefaultExtensionsOutput =
  typeof ArcSettingsConsentAndInstallDefaultExtensionsOutput.Type;

// The operation
/**
 * Add consent time for default extensions and initiate extensions installation
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 * @param arcSettingName - The name of the proxy resource holding details of HCI ArcSetting information.
 */
export const ArcSettingsConsentAndInstallDefaultExtensions =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ArcSettingsConsentAndInstallDefaultExtensionsInput,
    outputSchema: ArcSettingsConsentAndInstallDefaultExtensionsOutput,
  }));
// Input Schema
export const ArcSettingsCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    arcSettingName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/arcSettings/{arcSettingName}",
  }),
);
export type ArcSettingsCreateInput = typeof ArcSettingsCreateInput.Type;

// Output Schema
export const ArcSettingsCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ArcSettingsCreateOutput = typeof ArcSettingsCreateOutput.Type;

// The operation
/**
 * Create ArcSetting for HCI cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 * @param arcSettingName - The name of the proxy resource holding details of HCI ArcSetting information.
 */
export const ArcSettingsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ArcSettingsCreateInput,
  outputSchema: ArcSettingsCreateOutput,
}));
// Input Schema
export const ArcSettingsCreateIdentityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    arcSettingName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/arcSettings/{arcSettingName}/createArcIdentity",
    }),
  );
export type ArcSettingsCreateIdentityInput =
  typeof ArcSettingsCreateIdentityInput.Type;

// Output Schema
export const ArcSettingsCreateIdentityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    properties: Schema.optional(
      Schema.Struct({
        arcApplicationClientId: Schema.optional(Schema.String),
        arcApplicationTenantId: Schema.optional(Schema.String),
        arcServicePrincipalObjectId: Schema.optional(Schema.String),
        arcApplicationObjectId: Schema.optional(Schema.String),
      }),
    ),
  });
export type ArcSettingsCreateIdentityOutput =
  typeof ArcSettingsCreateIdentityOutput.Type;

// The operation
/**
 * Create Aad identity for arc settings.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 * @param arcSettingName - The name of the proxy resource holding details of HCI ArcSetting information.
 */
export const ArcSettingsCreateIdentity = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ArcSettingsCreateIdentityInput,
    outputSchema: ArcSettingsCreateIdentityOutput,
  }),
);
// Input Schema
export const ArcSettingsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    arcSettingName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/arcSettings/{arcSettingName}",
  }),
);
export type ArcSettingsDeleteInput = typeof ArcSettingsDeleteInput.Type;

// Output Schema
export const ArcSettingsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ArcSettingsDeleteOutput = typeof ArcSettingsDeleteOutput.Type;

// The operation
/**
 * Delete ArcSetting resource details of HCI Cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 * @param arcSettingName - The name of the proxy resource holding details of HCI ArcSetting information.
 */
export const ArcSettingsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ArcSettingsDeleteInput,
  outputSchema: ArcSettingsDeleteOutput,
}));
// Input Schema
export const ArcSettingsGeneratePasswordInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    arcSettingName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/arcSettings/{arcSettingName}/generatePassword",
    }),
  );
export type ArcSettingsGeneratePasswordInput =
  typeof ArcSettingsGeneratePasswordInput.Type;

// Output Schema
export const ArcSettingsGeneratePasswordOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    secretText: Schema.optional(Schema.String),
    keyId: Schema.optional(Schema.String),
    startDateTime: Schema.optional(Schema.String),
    endDateTime: Schema.optional(Schema.String),
  });
export type ArcSettingsGeneratePasswordOutput =
  typeof ArcSettingsGeneratePasswordOutput.Type;

// The operation
/**
 * Generate password for arc settings.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 * @param arcSettingName - The name of the proxy resource holding details of HCI ArcSetting information.
 */
export const ArcSettingsGeneratePassword = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ArcSettingsGeneratePasswordInput,
    outputSchema: ArcSettingsGeneratePasswordOutput,
  }),
);
// Input Schema
export const ArcSettingsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  clusterName: Schema.String.pipe(T.PathParam()),
  arcSettingName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/arcSettings/{arcSettingName}",
  }),
);
export type ArcSettingsGetInput = typeof ArcSettingsGetInput.Type;

// Output Schema
export const ArcSettingsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type ArcSettingsGetOutput = typeof ArcSettingsGetOutput.Type;

// The operation
/**
 * Get ArcSetting resource details of HCI Cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 * @param arcSettingName - The name of the proxy resource holding details of HCI ArcSetting information.
 */
export const ArcSettingsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ArcSettingsGetInput,
  outputSchema: ArcSettingsGetOutput,
}));
// Input Schema
export const ArcSettingsInitializeDisableProcessInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    arcSettingName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/arcSettings/{arcSettingName}/initializeDisableProcess",
    }),
  );
export type ArcSettingsInitializeDisableProcessInput =
  typeof ArcSettingsInitializeDisableProcessInput.Type;

// Output Schema
export const ArcSettingsInitializeDisableProcessOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ArcSettingsInitializeDisableProcessOutput =
  typeof ArcSettingsInitializeDisableProcessOutput.Type;

// The operation
/**
 * Initializes ARC Disable process on the cluster
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 * @param arcSettingName - The name of the proxy resource holding details of HCI ArcSetting information.
 */
export const ArcSettingsInitializeDisableProcess =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ArcSettingsInitializeDisableProcessInput,
    outputSchema: ArcSettingsInitializeDisableProcessOutput,
  }));
// Input Schema
export const ArcSettingsListByClusterInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/arcSettings",
    }),
  );
export type ArcSettingsListByClusterInput =
  typeof ArcSettingsListByClusterInput.Type;

// Output Schema
export const ArcSettingsListByClusterOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type ArcSettingsListByClusterOutput =
  typeof ArcSettingsListByClusterOutput.Type;

// The operation
/**
 * Get ArcSetting resources of HCI Cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 */
export const ArcSettingsListByCluster = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ArcSettingsListByClusterInput,
    outputSchema: ArcSettingsListByClusterOutput,
  }),
);
// Input Schema
export const ArcSettingsReconcileInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    arcSettingName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/arcSettings/{arcSettingName}/reconcile",
    }),
  );
export type ArcSettingsReconcileInput = typeof ArcSettingsReconcileInput.Type;

// Output Schema
export const ArcSettingsReconcileOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ArcSettingsReconcileOutput = typeof ArcSettingsReconcileOutput.Type;

// The operation
/**
 * Reconcile Arc Settings with information related to all nodes.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 * @param arcSettingName - The name of the proxy resource holding details of HCI ArcSetting information.
 */
export const ArcSettingsReconcile = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ArcSettingsReconcileInput,
    outputSchema: ArcSettingsReconcileOutput,
  }),
);
// Input Schema
export const ArcSettingsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    arcSettingName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/arcSettings/{arcSettingName}",
  }),
);
export type ArcSettingsUpdateInput = typeof ArcSettingsUpdateInput.Type;

// Output Schema
export const ArcSettingsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ArcSettingsUpdateOutput = typeof ArcSettingsUpdateOutput.Type;

// The operation
/**
 * Update ArcSettings for HCI cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 * @param arcSettingName - The name of the proxy resource holding details of HCI ArcSetting information.
 */
export const ArcSettingsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ArcSettingsUpdateInput,
  outputSchema: ArcSettingsUpdateOutput,
}));
// Input Schema
export const ClustersConfigureRemoteSupportInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/configureRemoteSupport",
    }),
  );
export type ClustersConfigureRemoteSupportInput =
  typeof ClustersConfigureRemoteSupportInput.Type;

// Output Schema
export const ClustersConfigureRemoteSupportOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ClustersConfigureRemoteSupportOutput =
  typeof ClustersConfigureRemoteSupportOutput.Type;

// The operation
/**
 * Configure RemoteSupport on a cluster
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 */
export const ClustersConfigureRemoteSupport =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ClustersConfigureRemoteSupportInput,
    outputSchema: ClustersConfigureRemoteSupportOutput,
  }));
// Input Schema
export const ClustersCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  clusterName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}",
  }),
);
export type ClustersCreateInput = typeof ClustersCreateInput.Type;

// Output Schema
export const ClustersCreateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type ClustersCreateOutput = typeof ClustersCreateOutput.Type;

// The operation
/**
 * Create an HCI cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 */
export const ClustersCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ClustersCreateInput,
  outputSchema: ClustersCreateOutput,
}));
// Input Schema
export const ClustersCreateIdentityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/createClusterIdentity",
    }),
  );
export type ClustersCreateIdentityInput =
  typeof ClustersCreateIdentityInput.Type;

// Output Schema
export const ClustersCreateIdentityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    properties: Schema.optional(
      Schema.Struct({
        aadClientId: Schema.optional(Schema.String),
        aadTenantId: Schema.optional(Schema.String),
        aadServicePrincipalObjectId: Schema.optional(Schema.String),
        aadApplicationObjectId: Schema.optional(Schema.String),
      }),
    ),
  });
export type ClustersCreateIdentityOutput =
  typeof ClustersCreateIdentityOutput.Type;

// The operation
/**
 * Create cluster identity.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 */
export const ClustersCreateIdentity = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ClustersCreateIdentityInput,
    outputSchema: ClustersCreateIdentityOutput,
  }),
);
// Input Schema
export const ClustersDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  clusterName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}",
  }),
);
export type ClustersDeleteInput = typeof ClustersDeleteInput.Type;

// Output Schema
export const ClustersDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ClustersDeleteOutput = typeof ClustersDeleteOutput.Type;

// The operation
/**
 * Delete an HCI cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 */
export const ClustersDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ClustersDeleteInput,
  outputSchema: ClustersDeleteOutput,
}));
// Input Schema
export const ClustersExtendSoftwareAssuranceBenefitInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/extendSoftwareAssuranceBenefit",
    }),
  );
export type ClustersExtendSoftwareAssuranceBenefitInput =
  typeof ClustersExtendSoftwareAssuranceBenefitInput.Type;

// Output Schema
export const ClustersExtendSoftwareAssuranceBenefitOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ClustersExtendSoftwareAssuranceBenefitOutput =
  typeof ClustersExtendSoftwareAssuranceBenefitOutput.Type;

// The operation
/**
 * Extends Software Assurance Benefit to a cluster
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 */
export const ClustersExtendSoftwareAssuranceBenefit =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ClustersExtendSoftwareAssuranceBenefitInput,
    outputSchema: ClustersExtendSoftwareAssuranceBenefitOutput,
  }));
// Input Schema
export const ClustersGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  clusterName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}",
  }),
);
export type ClustersGetInput = typeof ClustersGetInput.Type;

// Output Schema
export const ClustersGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type ClustersGetOutput = typeof ClustersGetOutput.Type;

// The operation
/**
 * Get HCI cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 */
export const ClustersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ClustersGetInput,
  outputSchema: ClustersGetOutput,
}));
// Input Schema
export const ClustersListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters",
    }),
  );
export type ClustersListByResourceGroupInput =
  typeof ClustersListByResourceGroupInput.Type;

// Output Schema
export const ClustersListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ClustersListByResourceGroupOutput =
  typeof ClustersListByResourceGroupOutput.Type;

// The operation
/**
 * List all HCI clusters in a resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ClustersListByResourceGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ClustersListByResourceGroupInput,
    outputSchema: ClustersListByResourceGroupOutput,
  }),
);
// Input Schema
export const ClustersListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AzureStackHCI/clusters",
    }),
  );
export type ClustersListBySubscriptionInput =
  typeof ClustersListBySubscriptionInput.Type;

// Output Schema
export const ClustersListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ClustersListBySubscriptionOutput =
  typeof ClustersListBySubscriptionOutput.Type;

// The operation
/**
 * List all HCI clusters in a subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const ClustersListBySubscription = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ClustersListBySubscriptionInput,
    outputSchema: ClustersListBySubscriptionOutput,
  }),
);
// Input Schema
export const ClustersTriggerLogCollectionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/triggerLogCollection",
    }),
  );
export type ClustersTriggerLogCollectionInput =
  typeof ClustersTriggerLogCollectionInput.Type;

// Output Schema
export const ClustersTriggerLogCollectionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ClustersTriggerLogCollectionOutput =
  typeof ClustersTriggerLogCollectionOutput.Type;

// The operation
/**
 * Trigger Log Collection on a cluster
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 */
export const ClustersTriggerLogCollection =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ClustersTriggerLogCollectionInput,
    outputSchema: ClustersTriggerLogCollectionOutput,
  }));
// Input Schema
export const ClustersUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  clusterName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}",
  }),
);
export type ClustersUpdateInput = typeof ClustersUpdateInput.Type;

// Output Schema
export const ClustersUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type ClustersUpdateOutput = typeof ClustersUpdateOutput.Type;

// The operation
/**
 * Update an HCI cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 */
export const ClustersUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ClustersUpdateInput,
  outputSchema: ClustersUpdateOutput,
}));
// Input Schema
export const ClustersUpdateSecretsLocationsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/updateSecretsLocations",
    }),
  );
export type ClustersUpdateSecretsLocationsInput =
  typeof ClustersUpdateSecretsLocationsInput.Type;

// Output Schema
export const ClustersUpdateSecretsLocationsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ClustersUpdateSecretsLocationsOutput =
  typeof ClustersUpdateSecretsLocationsOutput.Type;

// The operation
/**
 * Update cluster secrets locations.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 */
export const ClustersUpdateSecretsLocations =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ClustersUpdateSecretsLocationsInput,
    outputSchema: ClustersUpdateSecretsLocationsOutput,
  }));
// Input Schema
export const ClustersUploadCertificateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/uploadCertificate",
    }),
  );
export type ClustersUploadCertificateInput =
  typeof ClustersUploadCertificateInput.Type;

// Output Schema
export const ClustersUploadCertificateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ClustersUploadCertificateOutput =
  typeof ClustersUploadCertificateOutput.Type;

// The operation
/**
 * Upload certificate.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 */
export const ClustersUploadCertificate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ClustersUploadCertificateInput,
    outputSchema: ClustersUploadCertificateOutput,
  }),
);
// Input Schema
export const DeploymentSettingsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    deploymentSettingsName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/deploymentSettings/{deploymentSettingsName}",
    }),
  );
export type DeploymentSettingsCreateOrUpdateInput =
  typeof DeploymentSettingsCreateOrUpdateInput.Type;

// Output Schema
export const DeploymentSettingsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DeploymentSettingsCreateOrUpdateOutput =
  typeof DeploymentSettingsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a DeploymentSetting
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 * @param deploymentSettingsName - Name of Deployment Setting
 */
export const DeploymentSettingsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeploymentSettingsCreateOrUpdateInput,
    outputSchema: DeploymentSettingsCreateOrUpdateOutput,
  }));
// Input Schema
export const DeploymentSettingsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    deploymentSettingsName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/deploymentSettings/{deploymentSettingsName}",
    }),
  );
export type DeploymentSettingsDeleteInput =
  typeof DeploymentSettingsDeleteInput.Type;

// Output Schema
export const DeploymentSettingsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DeploymentSettingsDeleteOutput =
  typeof DeploymentSettingsDeleteOutput.Type;

// The operation
/**
 * Delete a DeploymentSetting
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 * @param deploymentSettingsName - Name of Deployment Setting
 */
export const DeploymentSettingsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DeploymentSettingsDeleteInput,
    outputSchema: DeploymentSettingsDeleteOutput,
  }),
);
// Input Schema
export const DeploymentSettingsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    deploymentSettingsName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/deploymentSettings/{deploymentSettingsName}",
    }),
  );
export type DeploymentSettingsGetInput = typeof DeploymentSettingsGetInput.Type;

// Output Schema
export const DeploymentSettingsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DeploymentSettingsGetOutput =
  typeof DeploymentSettingsGetOutput.Type;

// The operation
/**
 * Get a DeploymentSetting
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 * @param deploymentSettingsName - Name of Deployment Setting
 */
export const DeploymentSettingsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DeploymentSettingsGetInput,
    outputSchema: DeploymentSettingsGetOutput,
  }),
);
// Input Schema
export const DeploymentSettingsListByClustersInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/deploymentSettings",
    }),
  );
export type DeploymentSettingsListByClustersInput =
  typeof DeploymentSettingsListByClustersInput.Type;

// Output Schema
export const DeploymentSettingsListByClustersOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type DeploymentSettingsListByClustersOutput =
  typeof DeploymentSettingsListByClustersOutput.Type;

// The operation
/**
 * List DeploymentSetting resources by Clusters
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 */
export const DeploymentSettingsListByClusters =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeploymentSettingsListByClustersInput,
    outputSchema: DeploymentSettingsListByClustersOutput,
  }));
// Input Schema
export const EdgeDeviceJobsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceUri: Schema.String.pipe(T.PathParam()),
    edgeDeviceName: Schema.String.pipe(T.PathParam()),
    jobsName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/{resourceUri}/providers/Microsoft.AzureStackHCI/edgeDevices/{edgeDeviceName}/jobs/{jobsName}",
    }),
  );
export type EdgeDeviceJobsCreateOrUpdateInput =
  typeof EdgeDeviceJobsCreateOrUpdateInput.Type;

// Output Schema
export const EdgeDeviceJobsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type EdgeDeviceJobsCreateOrUpdateOutput =
  typeof EdgeDeviceJobsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a EdgeDeviceJob
 *
 * @param api-version - The API version to use for this operation.
 * @param resourceUri - The fully qualified Azure Resource manager identifier of the resource.
 * @param edgeDeviceName - Name of Device
 * @param jobsName - Name of EdgeDevice Job
 */
export const EdgeDeviceJobsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: EdgeDeviceJobsCreateOrUpdateInput,
    outputSchema: EdgeDeviceJobsCreateOrUpdateOutput,
  }));
// Input Schema
export const EdgeDeviceJobsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceUri: Schema.String.pipe(T.PathParam()),
    edgeDeviceName: Schema.String.pipe(T.PathParam()),
    jobsName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/{resourceUri}/providers/Microsoft.AzureStackHCI/edgeDevices/{edgeDeviceName}/jobs/{jobsName}",
    }),
  );
export type EdgeDeviceJobsDeleteInput = typeof EdgeDeviceJobsDeleteInput.Type;

// Output Schema
export const EdgeDeviceJobsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type EdgeDeviceJobsDeleteOutput = typeof EdgeDeviceJobsDeleteOutput.Type;

// The operation
/**
 * Delete a EdgeDeviceJob
 *
 * @param api-version - The API version to use for this operation.
 * @param resourceUri - The fully qualified Azure Resource manager identifier of the resource.
 * @param edgeDeviceName - Name of Device
 * @param jobsName - Name of EdgeDevice Job
 */
export const EdgeDeviceJobsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: EdgeDeviceJobsDeleteInput,
    outputSchema: EdgeDeviceJobsDeleteOutput,
  }),
);
// Input Schema
export const EdgeDeviceJobsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    resourceUri: Schema.String.pipe(T.PathParam()),
    edgeDeviceName: Schema.String.pipe(T.PathParam()),
    jobsName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/{resourceUri}/providers/Microsoft.AzureStackHCI/edgeDevices/{edgeDeviceName}/jobs/{jobsName}",
  }),
);
export type EdgeDeviceJobsGetInput = typeof EdgeDeviceJobsGetInput.Type;

// Output Schema
export const EdgeDeviceJobsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type EdgeDeviceJobsGetOutput = typeof EdgeDeviceJobsGetOutput.Type;

// The operation
/**
 * Get a EdgeDeviceJob
 *
 * @param api-version - The API version to use for this operation.
 * @param resourceUri - The fully qualified Azure Resource manager identifier of the resource.
 * @param edgeDeviceName - Name of Device
 * @param jobsName - Name of EdgeDevice Job
 */
export const EdgeDeviceJobsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: EdgeDeviceJobsGetInput,
  outputSchema: EdgeDeviceJobsGetOutput,
}));
// Input Schema
export const EdgeDeviceJobsListByEdgeDeviceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceUri: Schema.String.pipe(T.PathParam()),
    edgeDeviceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/{resourceUri}/providers/Microsoft.AzureStackHCI/edgeDevices/{edgeDeviceName}/jobs",
    }),
  );
export type EdgeDeviceJobsListByEdgeDeviceInput =
  typeof EdgeDeviceJobsListByEdgeDeviceInput.Type;

// Output Schema
export const EdgeDeviceJobsListByEdgeDeviceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type EdgeDeviceJobsListByEdgeDeviceOutput =
  typeof EdgeDeviceJobsListByEdgeDeviceOutput.Type;

// The operation
/**
 * List EdgeDeviceJob resources by EdgeDevice
 *
 * @param api-version - The API version to use for this operation.
 * @param resourceUri - The fully qualified Azure Resource manager identifier of the resource.
 * @param edgeDeviceName - Name of Device
 */
export const EdgeDeviceJobsListByEdgeDevice =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: EdgeDeviceJobsListByEdgeDeviceInput,
    outputSchema: EdgeDeviceJobsListByEdgeDeviceOutput,
  }));
// Input Schema
export const EdgeDevicesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceUri: Schema.String.pipe(T.PathParam()),
    edgeDeviceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/{resourceUri}/providers/Microsoft.AzureStackHCI/edgeDevices/{edgeDeviceName}",
    }),
  );
export type EdgeDevicesCreateOrUpdateInput =
  typeof EdgeDevicesCreateOrUpdateInput.Type;

// Output Schema
export const EdgeDevicesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type EdgeDevicesCreateOrUpdateOutput =
  typeof EdgeDevicesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a EdgeDevice
 *
 * @param api-version - The API version to use for this operation.
 * @param resourceUri - The fully qualified Azure Resource manager identifier of the resource.
 * @param edgeDeviceName - Name of Device
 */
export const EdgeDevicesCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: EdgeDevicesCreateOrUpdateInput,
    outputSchema: EdgeDevicesCreateOrUpdateOutput,
  }),
);
// Input Schema
export const EdgeDevicesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    resourceUri: Schema.String.pipe(T.PathParam()),
    edgeDeviceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "DELETE",
    path: "/{resourceUri}/providers/Microsoft.AzureStackHCI/edgeDevices/{edgeDeviceName}",
  }),
);
export type EdgeDevicesDeleteInput = typeof EdgeDevicesDeleteInput.Type;

// Output Schema
export const EdgeDevicesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type EdgeDevicesDeleteOutput = typeof EdgeDevicesDeleteOutput.Type;

// The operation
/**
 * Delete a EdgeDevice
 *
 * @param api-version - The API version to use for this operation.
 * @param resourceUri - The fully qualified Azure Resource manager identifier of the resource.
 * @param edgeDeviceName - Name of Device
 */
export const EdgeDevicesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: EdgeDevicesDeleteInput,
  outputSchema: EdgeDevicesDeleteOutput,
}));
// Input Schema
export const EdgeDevicesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceUri: Schema.String.pipe(T.PathParam()),
  edgeDeviceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/{resourceUri}/providers/Microsoft.AzureStackHCI/edgeDevices/{edgeDeviceName}",
  }),
);
export type EdgeDevicesGetInput = typeof EdgeDevicesGetInput.Type;

// Output Schema
export const EdgeDevicesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type EdgeDevicesGetOutput = typeof EdgeDevicesGetOutput.Type;

// The operation
/**
 * Get a EdgeDevice
 *
 * @param api-version - The API version to use for this operation.
 * @param resourceUri - The fully qualified Azure Resource manager identifier of the resource.
 * @param edgeDeviceName - Name of Device
 */
export const EdgeDevicesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: EdgeDevicesGetInput,
  outputSchema: EdgeDevicesGetOutput,
}));
// Input Schema
export const EdgeDevicesListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceUri: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/{resourceUri}/providers/Microsoft.AzureStackHCI/edgeDevices",
  }),
);
export type EdgeDevicesListInput = typeof EdgeDevicesListInput.Type;

// Output Schema
export const EdgeDevicesListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(Schema.Struct({})),
  nextLink: Schema.optional(Schema.String),
});
export type EdgeDevicesListOutput = typeof EdgeDevicesListOutput.Type;

// The operation
/**
 * List EdgeDevice resources by parent
 *
 * @param api-version - The API version to use for this operation.
 * @param resourceUri - The fully qualified Azure Resource manager identifier of the resource.
 */
export const EdgeDevicesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: EdgeDevicesListInput,
  outputSchema: EdgeDevicesListOutput,
}));
// Input Schema
export const EdgeDevicesValidateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceUri: Schema.String.pipe(T.PathParam()),
    edgeDeviceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/{resourceUri}/providers/Microsoft.AzureStackHCI/edgeDevices/{edgeDeviceName}/validate",
    }),
  );
export type EdgeDevicesValidateInput = typeof EdgeDevicesValidateInput.Type;

// Output Schema
export const EdgeDevicesValidateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    status: Schema.optional(Schema.String),
  });
export type EdgeDevicesValidateOutput = typeof EdgeDevicesValidateOutput.Type;

// The operation
/**
 * A long-running resource action.
 *
 * @param api-version - The API version to use for this operation.
 * @param resourceUri - The fully qualified Azure Resource manager identifier of the resource.
 * @param edgeDeviceName - Name of Device
 */
export const EdgeDevicesValidate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: EdgeDevicesValidateInput,
  outputSchema: EdgeDevicesValidateOutput,
}));
// Input Schema
export const ExtensionsCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  clusterName: Schema.String.pipe(T.PathParam()),
  arcSettingName: Schema.String.pipe(T.PathParam()),
  extensionName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/arcSettings/{arcSettingName}/extensions/{extensionName}",
  }),
);
export type ExtensionsCreateInput = typeof ExtensionsCreateInput.Type;

// Output Schema
export const ExtensionsCreateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type ExtensionsCreateOutput = typeof ExtensionsCreateOutput.Type;

// The operation
/**
 * Create Extension for HCI cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 * @param arcSettingName - The name of the proxy resource holding details of HCI ArcSetting information.
 * @param extensionName - The name of the machine extension.
 */
export const ExtensionsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ExtensionsCreateInput,
  outputSchema: ExtensionsCreateOutput,
}));
// Input Schema
export const ExtensionsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  clusterName: Schema.String.pipe(T.PathParam()),
  arcSettingName: Schema.String.pipe(T.PathParam()),
  extensionName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/arcSettings/{arcSettingName}/extensions/{extensionName}",
  }),
);
export type ExtensionsDeleteInput = typeof ExtensionsDeleteInput.Type;

// Output Schema
export const ExtensionsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ExtensionsDeleteOutput = typeof ExtensionsDeleteOutput.Type;

// The operation
/**
 * Delete particular Arc Extension of HCI Cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 * @param arcSettingName - The name of the proxy resource holding details of HCI ArcSetting information.
 * @param extensionName - The name of the machine extension.
 */
export const ExtensionsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ExtensionsDeleteInput,
  outputSchema: ExtensionsDeleteOutput,
}));
// Input Schema
export const ExtensionsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  clusterName: Schema.String.pipe(T.PathParam()),
  arcSettingName: Schema.String.pipe(T.PathParam()),
  extensionName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/arcSettings/{arcSettingName}/extensions/{extensionName}",
  }),
);
export type ExtensionsGetInput = typeof ExtensionsGetInput.Type;

// Output Schema
export const ExtensionsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type ExtensionsGetOutput = typeof ExtensionsGetOutput.Type;

// The operation
/**
 * Get particular Arc Extension of HCI Cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 * @param arcSettingName - The name of the proxy resource holding details of HCI ArcSetting information.
 * @param extensionName - The name of the machine extension.
 */
export const ExtensionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ExtensionsGetInput,
  outputSchema: ExtensionsGetOutput,
}));
// Input Schema
export const ExtensionsListByArcSettingInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    arcSettingName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/arcSettings/{arcSettingName}/extensions",
    }),
  );
export type ExtensionsListByArcSettingInput =
  typeof ExtensionsListByArcSettingInput.Type;

// Output Schema
export const ExtensionsListByArcSettingOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type ExtensionsListByArcSettingOutput =
  typeof ExtensionsListByArcSettingOutput.Type;

// The operation
/**
 * List all Extensions under ArcSetting resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 * @param arcSettingName - The name of the proxy resource holding details of HCI ArcSetting information.
 */
export const ExtensionsListByArcSetting = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ExtensionsListByArcSettingInput,
    outputSchema: ExtensionsListByArcSettingOutput,
  }),
);
// Input Schema
export const ExtensionsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  clusterName: Schema.String.pipe(T.PathParam()),
  arcSettingName: Schema.String.pipe(T.PathParam()),
  extensionName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/arcSettings/{arcSettingName}/extensions/{extensionName}",
  }),
);
export type ExtensionsUpdateInput = typeof ExtensionsUpdateInput.Type;

// Output Schema
export const ExtensionsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type ExtensionsUpdateOutput = typeof ExtensionsUpdateOutput.Type;

// The operation
/**
 * Update Extension for HCI cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 * @param arcSettingName - The name of the proxy resource holding details of HCI ArcSetting information.
 * @param extensionName - The name of the machine extension.
 */
export const ExtensionsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ExtensionsUpdateInput,
  outputSchema: ExtensionsUpdateOutput,
}));
// Input Schema
export const ExtensionsUpgradeInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    arcSettingName: Schema.String.pipe(T.PathParam()),
    extensionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/arcSettings/{arcSettingName}/extensions/{extensionName}/upgrade",
  }),
);
export type ExtensionsUpgradeInput = typeof ExtensionsUpgradeInput.Type;

// Output Schema
export const ExtensionsUpgradeOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ExtensionsUpgradeOutput = typeof ExtensionsUpgradeOutput.Type;

// The operation
/**
 * Upgrade a particular Arc Extension of HCI Cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 * @param arcSettingName - The name of the proxy resource holding details of HCI ArcSetting information.
 * @param extensionName - The name of the machine extension.
 */
export const ExtensionsUpgrade = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ExtensionsUpgradeInput,
  outputSchema: ExtensionsUpgradeOutput,
}));
// Input Schema
export const GalleryImagesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/galleryImages/{galleryImageName}",
    }),
  );
export type GalleryImagesCreateOrUpdateInput =
  typeof GalleryImagesCreateOrUpdateInput.Type;

// Output Schema
export const GalleryImagesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type GalleryImagesCreateOrUpdateOutput =
  typeof GalleryImagesCreateOrUpdateOutput.Type;

// The operation
/**
 * The operation to create or update a gallery image. Please note some properties can be set only during gallery image creation.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const GalleryImagesCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GalleryImagesCreateOrUpdateInput,
    outputSchema: GalleryImagesCreateOrUpdateOutput,
  }),
);
// Input Schema
export const GalleryImagesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/galleryImages/{galleryImageName}",
    }),
  );
export type GalleryImagesDeleteInput = typeof GalleryImagesDeleteInput.Type;

// Output Schema
export const GalleryImagesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type GalleryImagesDeleteOutput = typeof GalleryImagesDeleteOutput.Type;

// The operation
/**
 * The operation to delete a gallery image.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const GalleryImagesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GalleryImagesDeleteInput,
  outputSchema: GalleryImagesDeleteOutput,
}));
// Input Schema
export const GalleryImagesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/galleryImages/{galleryImageName}",
  }),
);
export type GalleryImagesGetInput = typeof GalleryImagesGetInput.Type;

// Output Schema
export const GalleryImagesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  },
);
export type GalleryImagesGetOutput = typeof GalleryImagesGetOutput.Type;

// The operation
/**
 * Gets a gallery image
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const GalleryImagesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GalleryImagesGetInput,
  outputSchema: GalleryImagesGetOutput,
}));
// Input Schema
export const GalleryImagesListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/galleryImages",
  }),
);
export type GalleryImagesListInput = typeof GalleryImagesListInput.Type;

// Output Schema
export const GalleryImagesListOutput =
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
export type GalleryImagesListOutput = typeof GalleryImagesListOutput.Type;

// The operation
/**
 * Lists all of the gallery images in the specified resource group. Use the nextLink property in the response to get the next page of gallery images.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const GalleryImagesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GalleryImagesListInput,
  outputSchema: GalleryImagesListOutput,
}));
// Input Schema
export const GalleryImagesListAllInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AzureStackHCI/galleryImages",
    }),
  );
export type GalleryImagesListAllInput = typeof GalleryImagesListAllInput.Type;

// Output Schema
export const GalleryImagesListAllOutput =
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
export type GalleryImagesListAllOutput = typeof GalleryImagesListAllOutput.Type;

// The operation
/**
 * Lists all of the gallery images in the specified subscription. Use the nextLink property in the response to get the next page of gallery images.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const GalleryImagesListAll = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GalleryImagesListAllInput,
    outputSchema: GalleryImagesListAllOutput,
  }),
);
// Input Schema
export const GalleryImagesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/galleryImages/{galleryImageName}",
    }),
  );
export type GalleryImagesUpdateInput = typeof GalleryImagesUpdateInput.Type;

// Output Schema
export const GalleryImagesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type GalleryImagesUpdateOutput = typeof GalleryImagesUpdateOutput.Type;

// The operation
/**
 * The operation to update a gallery image.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const GalleryImagesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GalleryImagesUpdateInput,
  outputSchema: GalleryImagesUpdateOutput,
}));
// Input Schema
export const GuestAgentCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PUT",
    path: "/{resourceUri}/providers/Microsoft.AzureStackHCI/virtualMachineInstances/default/guestAgents/default",
  }),
);
export type GuestAgentCreateInput = typeof GuestAgentCreateInput.Type;

// Output Schema
export const GuestAgentCreateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type GuestAgentCreateOutput = typeof GuestAgentCreateOutput.Type;

// The operation
/**
 * Implements GuestAgent PUT method.
 *
 * Create Or Update GuestAgent.
 *
 * @param api-version - The API version to use for this operation.
 */
export const GuestAgentCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GuestAgentCreateInput,
  outputSchema: GuestAgentCreateOutput,
}));
// Input Schema
export const GuestAgentDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/{resourceUri}/providers/Microsoft.AzureStackHCI/virtualMachineInstances/default/guestAgents/default",
  }),
);
export type GuestAgentDeleteInput = typeof GuestAgentDeleteInput.Type;

// Output Schema
export const GuestAgentDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type GuestAgentDeleteOutput = typeof GuestAgentDeleteOutput.Type;

// The operation
/**
 * Deleted an GuestAgent.
 *
 * Implements GuestAgent DELETE method.
 *
 * @param api-version - The API version to use for this operation.
 */
export const GuestAgentDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GuestAgentDeleteInput,
  outputSchema: GuestAgentDeleteOutput,
}));
// Input Schema
export const GuestAgentGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/{resourceUri}/providers/Microsoft.AzureStackHCI/virtualMachineInstances/default/guestAgents/default",
  }),
);
export type GuestAgentGetInput = typeof GuestAgentGetInput.Type;

// Output Schema
export const GuestAgentGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type GuestAgentGetOutput = typeof GuestAgentGetOutput.Type;

// The operation
/**
 * Gets GuestAgent.
 *
 * Implements GuestAgent GET method.
 *
 * @param api-version - The API version to use for this operation.
 */
export const GuestAgentGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GuestAgentGetInput,
  outputSchema: GuestAgentGetOutput,
}));
// Input Schema
export const GuestAgentsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/{resourceUri}/providers/Microsoft.AzureStackHCI/virtualMachineInstances/default/guestAgents",
  }),
);
export type GuestAgentsListInput = typeof GuestAgentsListInput.Type;

// Output Schema
export const GuestAgentsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  nextLink: Schema.optional(Schema.String),
  value: Schema.Array(Schema.Struct({})),
});
export type GuestAgentsListOutput = typeof GuestAgentsListOutput.Type;

// The operation
/**
 * Implements GET GuestAgent in a vm.
 *
 * Returns the list of GuestAgent of the given vm.
 *
 * @param api-version - The API version to use for this operation.
 */
export const GuestAgentsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GuestAgentsListInput,
  outputSchema: GuestAgentsListOutput,
}));
// Input Schema
export const HybridIdentityMetadataGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/{resourceUri}/providers/Microsoft.AzureStackHCI/virtualMachineInstances/default/hybridIdentityMetadata/default",
    }),
  );
export type HybridIdentityMetadataGetInput =
  typeof HybridIdentityMetadataGetInput.Type;

// Output Schema
export const HybridIdentityMetadataGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type HybridIdentityMetadataGetOutput =
  typeof HybridIdentityMetadataGetOutput.Type;

// The operation
/**
 * Gets HybridIdentityMetadata.
 *
 * Implements HybridIdentityMetadata GET method.
 *
 * @param api-version - The API version to use for this operation.
 */
export const HybridIdentityMetadataGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: HybridIdentityMetadataGetInput,
    outputSchema: HybridIdentityMetadataGetOutput,
  }),
);
// Input Schema
export const HybridIdentityMetadataListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/{resourceUri}/providers/Microsoft.AzureStackHCI/virtualMachineInstances/default/hybridIdentityMetadata",
    }),
  );
export type HybridIdentityMetadataListInput =
  typeof HybridIdentityMetadataListInput.Type;

// Output Schema
export const HybridIdentityMetadataListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.Array(Schema.Struct({})),
  });
export type HybridIdentityMetadataListOutput =
  typeof HybridIdentityMetadataListOutput.Type;

// The operation
/**
 * Implements GET HybridIdentityMetadata in a vm.
 *
 * Returns the list of HybridIdentityMetadata of the given vm.
 *
 * @param api-version - The API version to use for this operation.
 */
export const HybridIdentityMetadataList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: HybridIdentityMetadataListInput,
    outputSchema: HybridIdentityMetadataListOutput,
  }),
);
// Input Schema
export const LogicalNetworksCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/logicalNetworks/{logicalNetworkName}",
    }),
  );
export type LogicalNetworksCreateOrUpdateInput =
  typeof LogicalNetworksCreateOrUpdateInput.Type;

// Output Schema
export const LogicalNetworksCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type LogicalNetworksCreateOrUpdateOutput =
  typeof LogicalNetworksCreateOrUpdateOutput.Type;

// The operation
/**
 * The operation to create or update a logical network. Please note some properties can be set only during logical network creation.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const LogicalNetworksCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LogicalNetworksCreateOrUpdateInput,
    outputSchema: LogicalNetworksCreateOrUpdateOutput,
  }));
// Input Schema
export const LogicalNetworksDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/logicalNetworks/{logicalNetworkName}",
    }),
  );
export type LogicalNetworksDeleteInput = typeof LogicalNetworksDeleteInput.Type;

// Output Schema
export const LogicalNetworksDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type LogicalNetworksDeleteOutput =
  typeof LogicalNetworksDeleteOutput.Type;

// The operation
/**
 * The operation to delete a logical network.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const LogicalNetworksDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: LogicalNetworksDeleteInput,
    outputSchema: LogicalNetworksDeleteOutput,
  }),
);
// Input Schema
export const LogicalNetworksGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/logicalNetworks/{logicalNetworkName}",
    }),
  );
export type LogicalNetworksGetInput = typeof LogicalNetworksGetInput.Type;

// Output Schema
export const LogicalNetworksGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type LogicalNetworksGetOutput = typeof LogicalNetworksGetOutput.Type;

// The operation
/**
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const LogicalNetworksGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: LogicalNetworksGetInput,
  outputSchema: LogicalNetworksGetOutput,
}));
// Input Schema
export const LogicalNetworksListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/logicalNetworks",
    }),
  );
export type LogicalNetworksListInput = typeof LogicalNetworksListInput.Type;

// Output Schema
export const LogicalNetworksListOutput =
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
export type LogicalNetworksListOutput = typeof LogicalNetworksListOutput.Type;

// The operation
/**
 * Lists all of the logical networks in the specified resource group. Use the nextLink property in the response to get the next page of logical networks.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const LogicalNetworksList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: LogicalNetworksListInput,
  outputSchema: LogicalNetworksListOutput,
}));
// Input Schema
export const LogicalNetworksListAllInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AzureStackHCI/logicalNetworks",
    }),
  );
export type LogicalNetworksListAllInput =
  typeof LogicalNetworksListAllInput.Type;

// Output Schema
export const LogicalNetworksListAllOutput =
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
export type LogicalNetworksListAllOutput =
  typeof LogicalNetworksListAllOutput.Type;

// The operation
/**
 * Lists all of the logical networks in the specified subscription. Use the nextLink property in the response to get the next page of logical networks.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const LogicalNetworksListAll = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: LogicalNetworksListAllInput,
    outputSchema: LogicalNetworksListAllOutput,
  }),
);
// Input Schema
export const LogicalNetworksUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/logicalNetworks/{logicalNetworkName}",
    }),
  );
export type LogicalNetworksUpdateInput = typeof LogicalNetworksUpdateInput.Type;

// Output Schema
export const LogicalNetworksUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type LogicalNetworksUpdateOutput =
  typeof LogicalNetworksUpdateOutput.Type;

// The operation
/**
 * The operation to update a logical network.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const LogicalNetworksUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: LogicalNetworksUpdateInput,
    outputSchema: LogicalNetworksUpdateOutput,
  }),
);
// Input Schema
export const MarketplaceGalleryImagesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/marketplaceGalleryImages/{marketplaceGalleryImageName}",
    }),
  );
export type MarketplaceGalleryImagesCreateOrUpdateInput =
  typeof MarketplaceGalleryImagesCreateOrUpdateInput.Type;

// Output Schema
export const MarketplaceGalleryImagesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type MarketplaceGalleryImagesCreateOrUpdateOutput =
  typeof MarketplaceGalleryImagesCreateOrUpdateOutput.Type;

// The operation
/**
 * The operation to create or update a marketplace gallery image. Please note some properties can be set only during marketplace gallery image creation.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const MarketplaceGalleryImagesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MarketplaceGalleryImagesCreateOrUpdateInput,
    outputSchema: MarketplaceGalleryImagesCreateOrUpdateOutput,
  }));
// Input Schema
export const MarketplaceGalleryImagesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/marketplaceGalleryImages/{marketplaceGalleryImageName}",
    }),
  );
export type MarketplaceGalleryImagesDeleteInput =
  typeof MarketplaceGalleryImagesDeleteInput.Type;

// Output Schema
export const MarketplaceGalleryImagesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type MarketplaceGalleryImagesDeleteOutput =
  typeof MarketplaceGalleryImagesDeleteOutput.Type;

// The operation
/**
 * The operation to delete a marketplace gallery image.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const MarketplaceGalleryImagesDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MarketplaceGalleryImagesDeleteInput,
    outputSchema: MarketplaceGalleryImagesDeleteOutput,
  }));
// Input Schema
export const MarketplaceGalleryImagesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/marketplaceGalleryImages/{marketplaceGalleryImageName}",
    }),
  );
export type MarketplaceGalleryImagesGetInput =
  typeof MarketplaceGalleryImagesGetInput.Type;

// Output Schema
export const MarketplaceGalleryImagesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type MarketplaceGalleryImagesGetOutput =
  typeof MarketplaceGalleryImagesGetOutput.Type;

// The operation
/**
 * Gets a marketplace gallery image
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const MarketplaceGalleryImagesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: MarketplaceGalleryImagesGetInput,
    outputSchema: MarketplaceGalleryImagesGetOutput,
  }),
);
// Input Schema
export const MarketplaceGalleryImagesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/marketplaceGalleryImages",
    }),
  );
export type MarketplaceGalleryImagesListInput =
  typeof MarketplaceGalleryImagesListInput.Type;

// Output Schema
export const MarketplaceGalleryImagesListOutput =
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
export type MarketplaceGalleryImagesListOutput =
  typeof MarketplaceGalleryImagesListOutput.Type;

// The operation
/**
 * Lists all of the marketplace gallery images in the specified resource group. Use the nextLink property in the response to get the next page of marketplace gallery images.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const MarketplaceGalleryImagesList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MarketplaceGalleryImagesListInput,
    outputSchema: MarketplaceGalleryImagesListOutput,
  }));
// Input Schema
export const MarketplaceGalleryImagesListAllInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AzureStackHCI/marketplaceGalleryImages",
    }),
  );
export type MarketplaceGalleryImagesListAllInput =
  typeof MarketplaceGalleryImagesListAllInput.Type;

// Output Schema
export const MarketplaceGalleryImagesListAllOutput =
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
export type MarketplaceGalleryImagesListAllOutput =
  typeof MarketplaceGalleryImagesListAllOutput.Type;

// The operation
/**
 * Lists all of the marketplace gallery images in the specified subscription. Use the nextLink property in the response to get the next page of marketplace gallery images.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const MarketplaceGalleryImagesListAll =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MarketplaceGalleryImagesListAllInput,
    outputSchema: MarketplaceGalleryImagesListAllOutput,
  }));
// Input Schema
export const MarketplaceGalleryImagesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/marketplaceGalleryImages/{marketplaceGalleryImageName}",
    }),
  );
export type MarketplaceGalleryImagesUpdateInput =
  typeof MarketplaceGalleryImagesUpdateInput.Type;

// Output Schema
export const MarketplaceGalleryImagesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type MarketplaceGalleryImagesUpdateOutput =
  typeof MarketplaceGalleryImagesUpdateOutput.Type;

// The operation
/**
 * The operation to update a marketplace gallery image.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const MarketplaceGalleryImagesUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MarketplaceGalleryImagesUpdateInput,
    outputSchema: MarketplaceGalleryImagesUpdateOutput,
  }));
// Input Schema
export const NetworkInterfacesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/networkInterfaces/{networkInterfaceName}",
    }),
  );
export type NetworkInterfacesCreateOrUpdateInput =
  typeof NetworkInterfacesCreateOrUpdateInput.Type;

// Output Schema
export const NetworkInterfacesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type NetworkInterfacesCreateOrUpdateOutput =
  typeof NetworkInterfacesCreateOrUpdateOutput.Type;

// The operation
/**
 * The operation to create or update a network interface. Please note some properties can be set only during network interface creation.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NetworkInterfacesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkInterfacesCreateOrUpdateInput,
    outputSchema: NetworkInterfacesCreateOrUpdateOutput,
  }));
// Input Schema
export const NetworkInterfacesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/networkInterfaces/{networkInterfaceName}",
    }),
  );
export type NetworkInterfacesDeleteInput =
  typeof NetworkInterfacesDeleteInput.Type;

// Output Schema
export const NetworkInterfacesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type NetworkInterfacesDeleteOutput =
  typeof NetworkInterfacesDeleteOutput.Type;

// The operation
/**
 * The operation to delete a network interface.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NetworkInterfacesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: NetworkInterfacesDeleteInput,
    outputSchema: NetworkInterfacesDeleteOutput,
  }),
);
// Input Schema
export const NetworkInterfacesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/networkInterfaces/{networkInterfaceName}",
    }),
  );
export type NetworkInterfacesGetInput = typeof NetworkInterfacesGetInput.Type;

// Output Schema
export const NetworkInterfacesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type NetworkInterfacesGetOutput = typeof NetworkInterfacesGetOutput.Type;

// The operation
/**
 * Gets a network interface
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NetworkInterfacesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: NetworkInterfacesGetInput,
    outputSchema: NetworkInterfacesGetOutput,
  }),
);
// Input Schema
export const NetworkInterfacesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/networkInterfaces",
    }),
  );
export type NetworkInterfacesListInput = typeof NetworkInterfacesListInput.Type;

// Output Schema
export const NetworkInterfacesListOutput =
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
export type NetworkInterfacesListOutput =
  typeof NetworkInterfacesListOutput.Type;

// The operation
/**
 * Lists all of the network interfaces in the specified resource group. Use the nextLink property in the response to get the next page of network interfaces.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NetworkInterfacesList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: NetworkInterfacesListInput,
    outputSchema: NetworkInterfacesListOutput,
  }),
);
// Input Schema
export const NetworkInterfacesListAllInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AzureStackHCI/networkInterfaces",
    }),
  );
export type NetworkInterfacesListAllInput =
  typeof NetworkInterfacesListAllInput.Type;

// Output Schema
export const NetworkInterfacesListAllOutput =
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
export type NetworkInterfacesListAllOutput =
  typeof NetworkInterfacesListAllOutput.Type;

// The operation
/**
 * Lists all of the network interfaces in the specified subscription. Use the nextLink property in the response to get the next page of network interfaces.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const NetworkInterfacesListAll = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: NetworkInterfacesListAllInput,
    outputSchema: NetworkInterfacesListAllOutput,
  }),
);
// Input Schema
export const NetworkInterfacesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/networkInterfaces/{networkInterfaceName}",
    }),
  );
export type NetworkInterfacesUpdateInput =
  typeof NetworkInterfacesUpdateInput.Type;

// Output Schema
export const NetworkInterfacesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type NetworkInterfacesUpdateOutput =
  typeof NetworkInterfacesUpdateOutput.Type;

// The operation
/**
 * The operation to update a network interface.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NetworkInterfacesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: NetworkInterfacesUpdateInput,
    outputSchema: NetworkInterfacesUpdateOutput,
  }),
);
// Input Schema
export const OffersGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  clusterName: Schema.String.pipe(T.PathParam()),
  publisherName: Schema.String.pipe(T.PathParam()),
  offerName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
  $expand: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/publishers/{publisherName}/offers/{offerName}",
  }),
);
export type OffersGetInput = typeof OffersGetInput.Type;

// Output Schema
export const OffersGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type OffersGetOutput = typeof OffersGetOutput.Type;

// The operation
/**
 * Get Offer resource details within a publisher of HCI Cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 * @param publisherName - The name of the publisher available within HCI cluster.
 * @param offerName - The name of the offer available within HCI cluster.
 * @param $expand - Specify $expand=content,contentVersion to populate additional fields related to the marketplace offer.
 */
export const OffersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OffersGetInput,
  outputSchema: OffersGetOutput,
}));
// Input Schema
export const OffersListByClusterInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/offers",
    }),
  );
export type OffersListByClusterInput = typeof OffersListByClusterInput.Type;

// Output Schema
export const OffersListByClusterOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type OffersListByClusterOutput = typeof OffersListByClusterOutput.Type;

// The operation
/**
 * List Offers available across publishers for the HCI Cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 * @param $expand - Specify $expand=content,contentVersion to populate additional fields related to the marketplace offer.
 */
export const OffersListByCluster = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OffersListByClusterInput,
  outputSchema: OffersListByClusterOutput,
}));
// Input Schema
export const OffersListByPublisherInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    publisherName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/publishers/{publisherName}/offers",
    }),
  );
export type OffersListByPublisherInput = typeof OffersListByPublisherInput.Type;

// Output Schema
export const OffersListByPublisherOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type OffersListByPublisherOutput =
  typeof OffersListByPublisherOutput.Type;

// The operation
/**
 * List Offers available for a publisher within the HCI Cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 * @param publisherName - The name of the publisher available within HCI cluster.
 * @param $expand - Specify $expand=content,contentVersion to populate additional fields related to the marketplace offer.
 */
export const OffersListByPublisher = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: OffersListByPublisherInput,
    outputSchema: OffersListByPublisherOutput,
  }),
);
// Input Schema
export const SecuritySettingsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    securitySettingsName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/securitySettings/{securitySettingsName}",
    }),
  );
export type SecuritySettingsCreateOrUpdateInput =
  typeof SecuritySettingsCreateOrUpdateInput.Type;

// Output Schema
export const SecuritySettingsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SecuritySettingsCreateOrUpdateOutput =
  typeof SecuritySettingsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a security setting
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 * @param securitySettingsName - Name of security setting
 */
export const SecuritySettingsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SecuritySettingsCreateOrUpdateInput,
    outputSchema: SecuritySettingsCreateOrUpdateOutput,
  }));
// Input Schema
export const SecuritySettingsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    securitySettingsName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/securitySettings/{securitySettingsName}",
    }),
  );
export type SecuritySettingsDeleteInput =
  typeof SecuritySettingsDeleteInput.Type;

// Output Schema
export const SecuritySettingsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SecuritySettingsDeleteOutput =
  typeof SecuritySettingsDeleteOutput.Type;

// The operation
/**
 * Delete a SecuritySetting
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 * @param securitySettingsName - Name of security setting
 */
export const SecuritySettingsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SecuritySettingsDeleteInput,
    outputSchema: SecuritySettingsDeleteOutput,
  }),
);
// Input Schema
export const SecuritySettingsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    securitySettingsName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/securitySettings/{securitySettingsName}",
    }),
  );
export type SecuritySettingsGetInput = typeof SecuritySettingsGetInput.Type;

// Output Schema
export const SecuritySettingsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SecuritySettingsGetOutput = typeof SecuritySettingsGetOutput.Type;

// The operation
/**
 * Get a SecuritySetting
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 * @param securitySettingsName - Name of security setting
 */
export const SecuritySettingsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SecuritySettingsGetInput,
  outputSchema: SecuritySettingsGetOutput,
}));
// Input Schema
export const SecuritySettingsListByClustersInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/securitySettings",
    }),
  );
export type SecuritySettingsListByClustersInput =
  typeof SecuritySettingsListByClustersInput.Type;

// Output Schema
export const SecuritySettingsListByClustersOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type SecuritySettingsListByClustersOutput =
  typeof SecuritySettingsListByClustersOutput.Type;

// The operation
/**
 * List SecuritySetting resources by Clusters
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 */
export const SecuritySettingsListByClusters =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SecuritySettingsListByClustersInput,
    outputSchema: SecuritySettingsListByClustersOutput,
  }));
// Input Schema
export const SkusGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  clusterName: Schema.String.pipe(T.PathParam()),
  publisherName: Schema.String.pipe(T.PathParam()),
  offerName: Schema.String.pipe(T.PathParam()),
  skuName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
  $expand: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/publishers/{publisherName}/offers/{offerName}/skus/{skuName}",
  }),
);
export type SkusGetInput = typeof SkusGetInput.Type;

// Output Schema
export const SkusGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SkusGetOutput = typeof SkusGetOutput.Type;

// The operation
/**
 * Get SKU resource details within a offer of HCI Cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 * @param publisherName - The name of the publisher available within HCI cluster.
 * @param offerName - The name of the offer available within HCI cluster.
 * @param skuName - The name of the SKU available within HCI cluster.
 * @param $expand - Specify $expand=content,contentVersion to populate additional fields related to the marketplace offer.
 */
export const SkusGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SkusGetInput,
  outputSchema: SkusGetOutput,
}));
// Input Schema
export const SkusListByOfferInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  clusterName: Schema.String.pipe(T.PathParam()),
  publisherName: Schema.String.pipe(T.PathParam()),
  offerName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
  $expand: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/publishers/{publisherName}/offers/{offerName}/skus",
  }),
);
export type SkusListByOfferInput = typeof SkusListByOfferInput.Type;

// Output Schema
export const SkusListByOfferOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(Schema.Struct({})),
  nextLink: Schema.optional(Schema.String),
});
export type SkusListByOfferOutput = typeof SkusListByOfferOutput.Type;

// The operation
/**
 * List Skus available for a offer within the HCI Cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 * @param publisherName - The name of the publisher available within HCI cluster.
 * @param offerName - The name of the offer available within HCI cluster.
 * @param $expand - Specify $expand=content,contentVersion to populate additional fields related to the marketplace offer.
 */
export const SkusListByOffer = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SkusListByOfferInput,
  outputSchema: SkusListByOfferOutput,
}));
// Input Schema
export const StorageContainersCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/storageContainers/{storageContainerName}",
    }),
  );
export type StorageContainersCreateOrUpdateInput =
  typeof StorageContainersCreateOrUpdateInput.Type;

// Output Schema
export const StorageContainersCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type StorageContainersCreateOrUpdateOutput =
  typeof StorageContainersCreateOrUpdateOutput.Type;

// The operation
/**
 * The operation to create or update a storage container. Please note some properties can be set only during storage container creation.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const StorageContainersCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: StorageContainersCreateOrUpdateInput,
    outputSchema: StorageContainersCreateOrUpdateOutput,
  }));
// Input Schema
export const StorageContainersDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/storageContainers/{storageContainerName}",
    }),
  );
export type StorageContainersDeleteInput =
  typeof StorageContainersDeleteInput.Type;

// Output Schema
export const StorageContainersDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type StorageContainersDeleteOutput =
  typeof StorageContainersDeleteOutput.Type;

// The operation
/**
 * The operation to delete a storage container.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const StorageContainersDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: StorageContainersDeleteInput,
    outputSchema: StorageContainersDeleteOutput,
  }),
);
// Input Schema
export const StorageContainersGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/storageContainers/{storageContainerName}",
    }),
  );
export type StorageContainersGetInput = typeof StorageContainersGetInput.Type;

// Output Schema
export const StorageContainersGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type StorageContainersGetOutput = typeof StorageContainersGetOutput.Type;

// The operation
/**
 * Gets a storage container
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const StorageContainersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: StorageContainersGetInput,
    outputSchema: StorageContainersGetOutput,
  }),
);
// Input Schema
export const StorageContainersListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/storageContainers",
    }),
  );
export type StorageContainersListInput = typeof StorageContainersListInput.Type;

// Output Schema
export const StorageContainersListOutput =
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
export type StorageContainersListOutput =
  typeof StorageContainersListOutput.Type;

// The operation
/**
 * Lists all of the storage containers in the specified resource group. Use the nextLink property in the response to get the next page of storage containers.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const StorageContainersList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: StorageContainersListInput,
    outputSchema: StorageContainersListOutput,
  }),
);
// Input Schema
export const StorageContainersListAllInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AzureStackHCI/storageContainers",
    }),
  );
export type StorageContainersListAllInput =
  typeof StorageContainersListAllInput.Type;

// Output Schema
export const StorageContainersListAllOutput =
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
export type StorageContainersListAllOutput =
  typeof StorageContainersListAllOutput.Type;

// The operation
/**
 * Lists all of the storage containers in the specified subscription. Use the nextLink property in the response to get the next page of storage containers.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const StorageContainersListAll = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: StorageContainersListAllInput,
    outputSchema: StorageContainersListAllOutput,
  }),
);
// Input Schema
export const StorageContainersUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/storageContainers/{storageContainerName}",
    }),
  );
export type StorageContainersUpdateInput =
  typeof StorageContainersUpdateInput.Type;

// Output Schema
export const StorageContainersUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type StorageContainersUpdateOutput =
  typeof StorageContainersUpdateOutput.Type;

// The operation
/**
 * The operation to update a storage container.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const StorageContainersUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: StorageContainersUpdateInput,
    outputSchema: StorageContainersUpdateOutput,
  }),
);
// Input Schema
export const UpdateRunsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  clusterName: Schema.String.pipe(T.PathParam()),
  updateName: Schema.String.pipe(T.PathParam()),
  updateRunName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/updates/{updateName}/updateRuns/{updateRunName}",
  }),
);
export type UpdateRunsDeleteInput = typeof UpdateRunsDeleteInput.Type;

// Output Schema
export const UpdateRunsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type UpdateRunsDeleteOutput = typeof UpdateRunsDeleteOutput.Type;

// The operation
/**
 * Delete specified Update Run
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 * @param updateName - The name of the Update
 * @param updateRunName - The name of the Update Run
 */
export const UpdateRunsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: UpdateRunsDeleteInput,
  outputSchema: UpdateRunsDeleteOutput,
}));
// Input Schema
export const UpdateRunsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  clusterName: Schema.String.pipe(T.PathParam()),
  updateName: Schema.String.pipe(T.PathParam()),
  updateRunName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/updates/{updateName}/updateRuns/{updateRunName}",
  }),
);
export type UpdateRunsGetInput = typeof UpdateRunsGetInput.Type;

// Output Schema
export const UpdateRunsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type UpdateRunsGetOutput = typeof UpdateRunsGetOutput.Type;

// The operation
/**
 * Get the Update run for a specified update
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 * @param updateName - The name of the Update
 * @param updateRunName - The name of the Update Run
 */
export const UpdateRunsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: UpdateRunsGetInput,
  outputSchema: UpdateRunsGetOutput,
}));
// Input Schema
export const UpdateRunsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  clusterName: Schema.String.pipe(T.PathParam()),
  updateName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/updates/{updateName}/updateRuns",
  }),
);
export type UpdateRunsListInput = typeof UpdateRunsListInput.Type;

// Output Schema
export const UpdateRunsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(Schema.Struct({})),
  nextLink: Schema.optional(Schema.String),
});
export type UpdateRunsListOutput = typeof UpdateRunsListOutput.Type;

// The operation
/**
 * List all Update runs for a specified update
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 * @param updateName - The name of the Update
 */
export const UpdateRunsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: UpdateRunsListInput,
  outputSchema: UpdateRunsListOutput,
}));
// Input Schema
export const UpdateRunsPutInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  clusterName: Schema.String.pipe(T.PathParam()),
  updateName: Schema.String.pipe(T.PathParam()),
  updateRunName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/updates/{updateName}/updateRuns/{updateRunName}",
  }),
);
export type UpdateRunsPutInput = typeof UpdateRunsPutInput.Type;

// Output Schema
export const UpdateRunsPutOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type UpdateRunsPutOutput = typeof UpdateRunsPutOutput.Type;

// The operation
/**
 * Put Update runs for a specified update
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 * @param updateName - The name of the Update
 * @param updateRunName - The name of the Update Run
 */
export const UpdateRunsPut = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: UpdateRunsPutInput,
  outputSchema: UpdateRunsPutOutput,
}));
// Input Schema
export const UpdatesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  clusterName: Schema.String.pipe(T.PathParam()),
  updateName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/updates/{updateName}",
  }),
);
export type UpdatesDeleteInput = typeof UpdatesDeleteInput.Type;

// Output Schema
export const UpdatesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type UpdatesDeleteOutput = typeof UpdatesDeleteOutput.Type;

// The operation
/**
 * Delete specified Update
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 * @param updateName - The name of the Update
 */
export const UpdatesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: UpdatesDeleteInput,
  outputSchema: UpdatesDeleteOutput,
}));
// Input Schema
export const UpdatesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  clusterName: Schema.String.pipe(T.PathParam()),
  updateName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/updates/{updateName}",
  }),
);
export type UpdatesGetInput = typeof UpdatesGetInput.Type;

// Output Schema
export const UpdatesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type UpdatesGetOutput = typeof UpdatesGetOutput.Type;

// The operation
/**
 * Get specified Update
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 * @param updateName - The name of the Update
 */
export const UpdatesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: UpdatesGetInput,
  outputSchema: UpdatesGetOutput,
}));
// Input Schema
export const UpdatesListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  clusterName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/updates",
  }),
);
export type UpdatesListInput = typeof UpdatesListInput.Type;

// Output Schema
export const UpdatesListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(Schema.Struct({})),
  nextLink: Schema.optional(Schema.String),
});
export type UpdatesListOutput = typeof UpdatesListOutput.Type;

// The operation
/**
 * List all Updates
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 */
export const UpdatesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: UpdatesListInput,
  outputSchema: UpdatesListOutput,
}));
// Input Schema
export const UpdatesPostInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  clusterName: Schema.String.pipe(T.PathParam()),
  updateName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/updates/{updateName}/apply",
  }),
);
export type UpdatesPostInput = typeof UpdatesPostInput.Type;

// Output Schema
export const UpdatesPostOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type UpdatesPostOutput = typeof UpdatesPostOutput.Type;

// The operation
/**
 * Apply Update
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 * @param updateName - The name of the Update
 */
export const UpdatesPost = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: UpdatesPostInput,
  outputSchema: UpdatesPostOutput,
}));
// Input Schema
export const UpdatesPutInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  clusterName: Schema.String.pipe(T.PathParam()),
  updateName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/updates/{updateName}",
  }),
);
export type UpdatesPutInput = typeof UpdatesPutInput.Type;

// Output Schema
export const UpdatesPutOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type UpdatesPutOutput = typeof UpdatesPutOutput.Type;

// The operation
/**
 * Put specified Update
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 * @param updateName - The name of the Update
 */
export const UpdatesPut = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: UpdatesPutInput,
  outputSchema: UpdatesPutOutput,
}));
// Input Schema
export const UpdateSummariesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/updateSummaries/default",
    }),
  );
export type UpdateSummariesDeleteInput = typeof UpdateSummariesDeleteInput.Type;

// Output Schema
export const UpdateSummariesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type UpdateSummariesDeleteOutput =
  typeof UpdateSummariesDeleteOutput.Type;

// The operation
/**
 * Delete Update Summaries
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 */
export const UpdateSummariesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: UpdateSummariesDeleteInput,
    outputSchema: UpdateSummariesDeleteOutput,
  }),
);
// Input Schema
export const UpdateSummariesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/updateSummaries/default",
    }),
  );
export type UpdateSummariesGetInput = typeof UpdateSummariesGetInput.Type;

// Output Schema
export const UpdateSummariesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type UpdateSummariesGetOutput = typeof UpdateSummariesGetOutput.Type;

// The operation
/**
 * Get all Update summaries under the HCI cluster
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 */
export const UpdateSummariesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: UpdateSummariesGetInput,
  outputSchema: UpdateSummariesGetOutput,
}));
// Input Schema
export const UpdateSummariesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/updateSummaries",
    }),
  );
export type UpdateSummariesListInput = typeof UpdateSummariesListInput.Type;

// Output Schema
export const UpdateSummariesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type UpdateSummariesListOutput = typeof UpdateSummariesListOutput.Type;

// The operation
/**
 * List all Update summaries under the HCI cluster
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 */
export const UpdateSummariesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: UpdateSummariesListInput,
  outputSchema: UpdateSummariesListOutput,
}));
// Input Schema
export const UpdateSummariesPutInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/updateSummaries/default",
    }),
  );
export type UpdateSummariesPutInput = typeof UpdateSummariesPutInput.Type;

// Output Schema
export const UpdateSummariesPutOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type UpdateSummariesPutOutput = typeof UpdateSummariesPutOutput.Type;

// The operation
/**
 * Put Update summaries under the HCI cluster
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 */
export const UpdateSummariesPut = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: UpdateSummariesPutInput,
  outputSchema: UpdateSummariesPutOutput,
}));
// Input Schema
export const ValidatedSolutionRecipesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    validatedSolutionRecipeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AzureStackHCI/locations/{location}/validatedSolutionRecipes/{validatedSolutionRecipeName}",
    }),
  );
export type ValidatedSolutionRecipesGetInput =
  typeof ValidatedSolutionRecipesGetInput.Type;

// Output Schema
export const ValidatedSolutionRecipesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ValidatedSolutionRecipesGetOutput =
  typeof ValidatedSolutionRecipesGetOutput.Type;

// The operation
/**
 * Get a validated solution recipe.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param location - The name of the Azure region.
 * @param validatedSolutionRecipeName - The name of the ValidatedSolutionRecipe
 */
export const ValidatedSolutionRecipesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ValidatedSolutionRecipesGetInput,
    outputSchema: ValidatedSolutionRecipesGetOutput,
  }),
);
// Input Schema
export const ValidatedSolutionRecipesListBySubscriptionLocationResourceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AzureStackHCI/locations/{location}/validatedSolutionRecipes",
    }),
  );
export type ValidatedSolutionRecipesListBySubscriptionLocationResourceInput =
  typeof ValidatedSolutionRecipesListBySubscriptionLocationResourceInput.Type;

// Output Schema
export const ValidatedSolutionRecipesListBySubscriptionLocationResourceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type ValidatedSolutionRecipesListBySubscriptionLocationResourceOutput =
  typeof ValidatedSolutionRecipesListBySubscriptionLocationResourceOutput.Type;

// The operation
/**
 * List all validated solution recipes.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param location - The name of the Azure region.
 */
export const ValidatedSolutionRecipesListBySubscriptionLocationResource =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      ValidatedSolutionRecipesListBySubscriptionLocationResourceInput,
    outputSchema:
      ValidatedSolutionRecipesListBySubscriptionLocationResourceOutput,
  }));
// Input Schema
export const VirtualHardDisksCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/virtualHardDisks/{virtualHardDiskName}",
    }),
  );
export type VirtualHardDisksCreateOrUpdateInput =
  typeof VirtualHardDisksCreateOrUpdateInput.Type;

// Output Schema
export const VirtualHardDisksCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type VirtualHardDisksCreateOrUpdateOutput =
  typeof VirtualHardDisksCreateOrUpdateOutput.Type;

// The operation
/**
 * The operation to create or update a virtual hard disk. Please note some properties can be set only during virtual hard disk creation.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const VirtualHardDisksCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: VirtualHardDisksCreateOrUpdateInput,
    outputSchema: VirtualHardDisksCreateOrUpdateOutput,
  }));
// Input Schema
export const VirtualHardDisksDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/virtualHardDisks/{virtualHardDiskName}",
    }),
  );
export type VirtualHardDisksDeleteInput =
  typeof VirtualHardDisksDeleteInput.Type;

// Output Schema
export const VirtualHardDisksDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type VirtualHardDisksDeleteOutput =
  typeof VirtualHardDisksDeleteOutput.Type;

// The operation
/**
 * The operation to delete a virtual hard disk.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const VirtualHardDisksDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VirtualHardDisksDeleteInput,
    outputSchema: VirtualHardDisksDeleteOutput,
  }),
);
// Input Schema
export const VirtualHardDisksGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/virtualHardDisks/{virtualHardDiskName}",
    }),
  );
export type VirtualHardDisksGetInput = typeof VirtualHardDisksGetInput.Type;

// Output Schema
export const VirtualHardDisksGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type VirtualHardDisksGetOutput = typeof VirtualHardDisksGetOutput.Type;

// The operation
/**
 * Gets a virtual hard disk
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const VirtualHardDisksGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: VirtualHardDisksGetInput,
  outputSchema: VirtualHardDisksGetOutput,
}));
// Input Schema
export const VirtualHardDisksListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/virtualHardDisks",
    }),
  );
export type VirtualHardDisksListInput = typeof VirtualHardDisksListInput.Type;

// Output Schema
export const VirtualHardDisksListOutput =
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
export type VirtualHardDisksListOutput = typeof VirtualHardDisksListOutput.Type;

// The operation
/**
 * Lists all of the virtual hard disks in the specified resource group. Use the nextLink property in the response to get the next page of virtual hard disks.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const VirtualHardDisksList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VirtualHardDisksListInput,
    outputSchema: VirtualHardDisksListOutput,
  }),
);
// Input Schema
export const VirtualHardDisksListAllInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AzureStackHCI/virtualHardDisks",
    }),
  );
export type VirtualHardDisksListAllInput =
  typeof VirtualHardDisksListAllInput.Type;

// Output Schema
export const VirtualHardDisksListAllOutput =
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
export type VirtualHardDisksListAllOutput =
  typeof VirtualHardDisksListAllOutput.Type;

// The operation
/**
 * Lists all of the virtual hard disks in the specified subscription. Use the nextLink property in the response to get the next page of virtual hard disks.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const VirtualHardDisksListAll = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VirtualHardDisksListAllInput,
    outputSchema: VirtualHardDisksListAllOutput,
  }),
);
// Input Schema
export const VirtualHardDisksUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/virtualHardDisks/{virtualHardDiskName}",
    }),
  );
export type VirtualHardDisksUpdateInput =
  typeof VirtualHardDisksUpdateInput.Type;

// Output Schema
export const VirtualHardDisksUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type VirtualHardDisksUpdateOutput =
  typeof VirtualHardDisksUpdateOutput.Type;

// The operation
/**
 * The operation to update a virtual hard disk.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const VirtualHardDisksUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VirtualHardDisksUpdateInput,
    outputSchema: VirtualHardDisksUpdateOutput,
  }),
);
// Input Schema
export const VirtualMachineInstancesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/{resourceUri}/providers/Microsoft.AzureStackHCI/virtualMachineInstances/default",
    }),
  );
export type VirtualMachineInstancesCreateOrUpdateInput =
  typeof VirtualMachineInstancesCreateOrUpdateInput.Type;

// Output Schema
export const VirtualMachineInstancesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type VirtualMachineInstancesCreateOrUpdateOutput =
  typeof VirtualMachineInstancesCreateOrUpdateOutput.Type;

// The operation
/**
 * The operation to create or update a virtual machine instance. Please note some properties can be set only during virtual machine instance creation.
 *
 * @param api-version - The API version to use for this operation.
 */
export const VirtualMachineInstancesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: VirtualMachineInstancesCreateOrUpdateInput,
    outputSchema: VirtualMachineInstancesCreateOrUpdateOutput,
  }));
// Input Schema
export const VirtualMachineInstancesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/{resourceUri}/providers/Microsoft.AzureStackHCI/virtualMachineInstances/default",
    }),
  );
export type VirtualMachineInstancesDeleteInput =
  typeof VirtualMachineInstancesDeleteInput.Type;

// Output Schema
export const VirtualMachineInstancesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type VirtualMachineInstancesDeleteOutput =
  typeof VirtualMachineInstancesDeleteOutput.Type;

// The operation
/**
 * The operation to delete a virtual machine instance.
 *
 * @param api-version - The API version to use for this operation.
 */
export const VirtualMachineInstancesDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: VirtualMachineInstancesDeleteInput,
    outputSchema: VirtualMachineInstancesDeleteOutput,
  }));
// Input Schema
export const VirtualMachineInstancesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/{resourceUri}/providers/Microsoft.AzureStackHCI/virtualMachineInstances/default",
    }),
  );
export type VirtualMachineInstancesGetInput =
  typeof VirtualMachineInstancesGetInput.Type;

// Output Schema
export const VirtualMachineInstancesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type VirtualMachineInstancesGetOutput =
  typeof VirtualMachineInstancesGetOutput.Type;

// The operation
/**
 * Gets a virtual machine instance
 *
 * @param api-version - The API version to use for this operation.
 */
export const VirtualMachineInstancesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VirtualMachineInstancesGetInput,
    outputSchema: VirtualMachineInstancesGetOutput,
  }),
);
// Input Schema
export const VirtualMachineInstancesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/{resourceUri}/providers/Microsoft.AzureStackHCI/virtualMachineInstances",
    }),
  );
export type VirtualMachineInstancesListInput =
  typeof VirtualMachineInstancesListInput.Type;

// Output Schema
export const VirtualMachineInstancesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type VirtualMachineInstancesListOutput =
  typeof VirtualMachineInstancesListOutput.Type;

// The operation
/**
 * Lists all of the virtual machine instances within the specified parent resource.
 *
 * @param api-version - The API version to use for this operation.
 */
export const VirtualMachineInstancesList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VirtualMachineInstancesListInput,
    outputSchema: VirtualMachineInstancesListOutput,
  }),
);
// Input Schema
export const VirtualMachineInstancesRestartInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/{resourceUri}/providers/Microsoft.AzureStackHCI/virtualMachineInstances/default/restart",
    }),
  );
export type VirtualMachineInstancesRestartInput =
  typeof VirtualMachineInstancesRestartInput.Type;

// Output Schema
export const VirtualMachineInstancesRestartOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type VirtualMachineInstancesRestartOutput =
  typeof VirtualMachineInstancesRestartOutput.Type;

// The operation
/**
 * The operation to restart a virtual machine instance.
 *
 * @param api-version - The API version to use for this operation.
 */
export const VirtualMachineInstancesRestart =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: VirtualMachineInstancesRestartInput,
    outputSchema: VirtualMachineInstancesRestartOutput,
  }));
// Input Schema
export const VirtualMachineInstancesStartInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/{resourceUri}/providers/Microsoft.AzureStackHCI/virtualMachineInstances/default/start",
    }),
  );
export type VirtualMachineInstancesStartInput =
  typeof VirtualMachineInstancesStartInput.Type;

// Output Schema
export const VirtualMachineInstancesStartOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type VirtualMachineInstancesStartOutput =
  typeof VirtualMachineInstancesStartOutput.Type;

// The operation
/**
 * The operation to start a virtual machine instance.
 *
 * @param api-version - The API version to use for this operation.
 */
export const VirtualMachineInstancesStart =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: VirtualMachineInstancesStartInput,
    outputSchema: VirtualMachineInstancesStartOutput,
  }));
// Input Schema
export const VirtualMachineInstancesStopInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/{resourceUri}/providers/Microsoft.AzureStackHCI/virtualMachineInstances/default/stop",
    }),
  );
export type VirtualMachineInstancesStopInput =
  typeof VirtualMachineInstancesStopInput.Type;

// Output Schema
export const VirtualMachineInstancesStopOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type VirtualMachineInstancesStopOutput =
  typeof VirtualMachineInstancesStopOutput.Type;

// The operation
/**
 * The operation to stop a virtual machine instance.
 *
 * @param api-version - The API version to use for this operation.
 */
export const VirtualMachineInstancesStop = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VirtualMachineInstancesStopInput,
    outputSchema: VirtualMachineInstancesStopOutput,
  }),
);
// Input Schema
export const VirtualMachineInstancesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/{resourceUri}/providers/Microsoft.AzureStackHCI/virtualMachineInstances/default",
    }),
  );
export type VirtualMachineInstancesUpdateInput =
  typeof VirtualMachineInstancesUpdateInput.Type;

// Output Schema
export const VirtualMachineInstancesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type VirtualMachineInstancesUpdateOutput =
  typeof VirtualMachineInstancesUpdateOutput.Type;

// The operation
/**
 * The operation to update a virtual machine instance.
 *
 * @param api-version - The API version to use for this operation.
 */
export const VirtualMachineInstancesUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: VirtualMachineInstancesUpdateInput,
    outputSchema: VirtualMachineInstancesUpdateOutput,
  }));
