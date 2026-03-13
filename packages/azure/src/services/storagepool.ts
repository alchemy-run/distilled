/**
 * Azure Storagepool API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const DiskPoolsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StoragePool/diskPools/{diskPoolName}",
    }),
  );
export type DiskPoolsCreateOrUpdateInput =
  typeof DiskPoolsCreateOrUpdateInput.Type;

// Output Schema
export const DiskPoolsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type DiskPoolsCreateOrUpdateOutput =
  typeof DiskPoolsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or Update Disk pool. This create or update operation can take 15 minutes to complete. This is expected service behavior.
 */
export const DiskPoolsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DiskPoolsCreateOrUpdateInput,
    outputSchema: DiskPoolsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const DiskPoolsDeallocateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StoragePool/diskPools/{diskPoolName}/deallocate",
    }),
  );
export type DiskPoolsDeallocateInput = typeof DiskPoolsDeallocateInput.Type;

// Output Schema
export const DiskPoolsDeallocateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DiskPoolsDeallocateOutput = typeof DiskPoolsDeallocateOutput.Type;

// The operation
/**
 * Shuts down the Disk Pool and releases the compute resources. You are not billed for the compute resources that this Disk Pool uses. This operation can take 10 minutes to complete. This is expected service behavior.
 */
export const DiskPoolsDeallocate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DiskPoolsDeallocateInput,
  outputSchema: DiskPoolsDeallocateOutput,
}));
// Input Schema
export const DiskPoolsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StoragePool/diskPools/{diskPoolName}",
  }),
);
export type DiskPoolsDeleteInput = typeof DiskPoolsDeleteInput.Type;

// Output Schema
export const DiskPoolsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DiskPoolsDeleteOutput = typeof DiskPoolsDeleteOutput.Type;

// The operation
/**
 * Delete a Disk pool; attached disks are not affected. This delete operation can take 10 minutes to complete. This is expected service behavior.
 */
export const DiskPoolsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DiskPoolsDeleteInput,
  outputSchema: DiskPoolsDeleteOutput,
}));
// Input Schema
export const DiskPoolsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StoragePool/diskPools/{diskPoolName}",
  }),
);
export type DiskPoolsGetInput = typeof DiskPoolsGetInput.Type;

// Output Schema
export const DiskPoolsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type DiskPoolsGetOutput = typeof DiskPoolsGetOutput.Type;

// The operation
/**
 * Get a Disk pool.
 */
export const DiskPoolsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DiskPoolsGetInput,
  outputSchema: DiskPoolsGetOutput,
}));
// Input Schema
export const DiskPoolsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StoragePool/diskPools",
    }),
  );
export type DiskPoolsListByResourceGroupInput =
  typeof DiskPoolsListByResourceGroupInput.Type;

// Output Schema
export const DiskPoolsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type DiskPoolsListByResourceGroupOutput =
  typeof DiskPoolsListByResourceGroupOutput.Type;

// The operation
/**
 * Gets a list of DiskPools in a resource group.
 */
export const DiskPoolsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DiskPoolsListByResourceGroupInput,
    outputSchema: DiskPoolsListByResourceGroupOutput,
  }));
// Input Schema
export const DiskPoolsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.StoragePool/diskPools",
    }),
  );
export type DiskPoolsListBySubscriptionInput =
  typeof DiskPoolsListBySubscriptionInput.Type;

// Output Schema
export const DiskPoolsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type DiskPoolsListBySubscriptionOutput =
  typeof DiskPoolsListBySubscriptionOutput.Type;

// The operation
/**
 * Gets a list of Disk Pools in a subscription
 */
export const DiskPoolsListBySubscription = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DiskPoolsListBySubscriptionInput,
    outputSchema: DiskPoolsListBySubscriptionOutput,
  }),
);
// Input Schema
export const DiskPoolsListOutboundNetworkDependenciesEndpointsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StoragePool/diskPools/{diskPoolName}/outboundNetworkDependenciesEndpoints",
    }),
  );
export type DiskPoolsListOutboundNetworkDependenciesEndpointsInput =
  typeof DiskPoolsListOutboundNetworkDependenciesEndpointsInput.Type;

// Output Schema
export const DiskPoolsListOutboundNetworkDependenciesEndpointsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        category: Schema.optional(Schema.String),
        endpoints: Schema.optional(
          Schema.Array(
            Schema.Struct({
              domainName: Schema.optional(Schema.String),
              endpointDetails: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    ipAddress: Schema.optional(Schema.String),
                    port: Schema.optional(Schema.Number),
                    latency: Schema.optional(Schema.Number),
                    isAccessible: Schema.optional(Schema.Boolean),
                  }),
                ),
              ),
            }),
          ),
        ),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type DiskPoolsListOutboundNetworkDependenciesEndpointsOutput =
  typeof DiskPoolsListOutboundNetworkDependenciesEndpointsOutput.Type;

// The operation
/**
 * Gets the network endpoints of all outbound dependencies of a Disk Pool
 */
export const DiskPoolsListOutboundNetworkDependenciesEndpoints =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DiskPoolsListOutboundNetworkDependenciesEndpointsInput,
    outputSchema: DiskPoolsListOutboundNetworkDependenciesEndpointsOutput,
  }));
// Input Schema
export const DiskPoolsStartInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StoragePool/diskPools/{diskPoolName}/start",
  }),
);
export type DiskPoolsStartInput = typeof DiskPoolsStartInput.Type;

// Output Schema
export const DiskPoolsStartOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DiskPoolsStartOutput = typeof DiskPoolsStartOutput.Type;

// The operation
/**
 * The operation to start a Disk Pool. This start operation can take 10 minutes to complete. This is expected service behavior.
 */
export const DiskPoolsStart = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DiskPoolsStartInput,
  outputSchema: DiskPoolsStartOutput,
}));
// Input Schema
export const DiskPoolsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StoragePool/diskPools/{diskPoolName}",
  }),
);
export type DiskPoolsUpdateInput = typeof DiskPoolsUpdateInput.Type;

// Output Schema
export const DiskPoolsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type DiskPoolsUpdateOutput = typeof DiskPoolsUpdateOutput.Type;

// The operation
/**
 * Update a Disk pool.
 */
export const DiskPoolsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DiskPoolsUpdateInput,
  outputSchema: DiskPoolsUpdateOutput,
}));
// Input Schema
export const DiskPoolsUpgradeInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StoragePool/diskPools/{diskPoolName}/upgrade",
  }),
);
export type DiskPoolsUpgradeInput = typeof DiskPoolsUpgradeInput.Type;

// Output Schema
export const DiskPoolsUpgradeOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DiskPoolsUpgradeOutput = typeof DiskPoolsUpgradeOutput.Type;

// The operation
/**
 * Upgrade replaces the underlying virtual machine hosts one at a time. This operation can take 10-15 minutes to complete. This is expected service behavior.
 */
export const DiskPoolsUpgrade = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DiskPoolsUpgradeInput,
  outputSchema: DiskPoolsUpgradeOutput,
}));
// Input Schema
export const DiskPoolZonesListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.StoragePool/locations/{location}/diskPoolZones",
  }),
);
export type DiskPoolZonesListInput = typeof DiskPoolZonesListInput.Type;

// Output Schema
export const DiskPoolZonesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          availabilityZones: Schema.optional(Schema.Array(Schema.String)),
          additionalCapabilities: Schema.optional(Schema.Array(Schema.String)),
          sku: Schema.optional(
            Schema.Struct({
              name: Schema.String,
              tier: Schema.optional(Schema.String),
            }),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type DiskPoolZonesListOutput = typeof DiskPoolZonesListOutput.Type;

// The operation
/**
 * Lists available Disk Pool Skus in an Azure location.
 */
export const DiskPoolZonesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DiskPoolZonesListInput,
  outputSchema: DiskPoolZonesListOutput,
}));
// Input Schema
export const IscsiTargetsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StoragePool/diskPools/{diskPoolName}/iscsiTargets/{iscsiTargetName}",
    }),
  );
export type IscsiTargetsCreateOrUpdateInput =
  typeof IscsiTargetsCreateOrUpdateInput.Type;

// Output Schema
export const IscsiTargetsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type IscsiTargetsCreateOrUpdateOutput =
  typeof IscsiTargetsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or Update an iSCSI Target.
 */
export const IscsiTargetsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IscsiTargetsCreateOrUpdateInput,
    outputSchema: IscsiTargetsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const IscsiTargetsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StoragePool/diskPools/{diskPoolName}/iscsiTargets/{iscsiTargetName}",
    }),
  );
export type IscsiTargetsDeleteInput = typeof IscsiTargetsDeleteInput.Type;

// Output Schema
export const IscsiTargetsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type IscsiTargetsDeleteOutput = typeof IscsiTargetsDeleteOutput.Type;

// The operation
/**
 * Delete an iSCSI Target.
 */
export const IscsiTargetsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: IscsiTargetsDeleteInput,
  outputSchema: IscsiTargetsDeleteOutput,
}));
// Input Schema
export const IscsiTargetsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StoragePool/diskPools/{diskPoolName}/iscsiTargets/{iscsiTargetName}",
  }),
);
export type IscsiTargetsGetInput = typeof IscsiTargetsGetInput.Type;

// Output Schema
export const IscsiTargetsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type IscsiTargetsGetOutput = typeof IscsiTargetsGetOutput.Type;

// The operation
/**
 * Get an iSCSI Target.
 */
export const IscsiTargetsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: IscsiTargetsGetInput,
  outputSchema: IscsiTargetsGetOutput,
}));
// Input Schema
export const IscsiTargetsListByDiskPoolInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StoragePool/diskPools/{diskPoolName}/iscsiTargets",
    }),
  );
export type IscsiTargetsListByDiskPoolInput =
  typeof IscsiTargetsListByDiskPoolInput.Type;

// Output Schema
export const IscsiTargetsListByDiskPoolOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type IscsiTargetsListByDiskPoolOutput =
  typeof IscsiTargetsListByDiskPoolOutput.Type;

// The operation
/**
 * Get iSCSI Targets in a Disk pool.
 */
export const IscsiTargetsListByDiskPool = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IscsiTargetsListByDiskPoolInput,
    outputSchema: IscsiTargetsListByDiskPoolOutput,
  }),
);
// Input Schema
export const IscsiTargetsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StoragePool/diskPools/{diskPoolName}/iscsiTargets/{iscsiTargetName}",
    }),
  );
export type IscsiTargetsUpdateInput = typeof IscsiTargetsUpdateInput.Type;

// Output Schema
export const IscsiTargetsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type IscsiTargetsUpdateOutput = typeof IscsiTargetsUpdateOutput.Type;

// The operation
/**
 * Update an iSCSI Target.
 */
export const IscsiTargetsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: IscsiTargetsUpdateInput,
  outputSchema: IscsiTargetsUpdateOutput,
}));
// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.StoragePool/operations",
  }),
);
export type OperationsListInput = typeof OperationsListInput.Type;

// Output Schema
export const OperationsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(
    Schema.Struct({
      name: Schema.String,
      isDataAction: Schema.Boolean,
      actionType: Schema.optional(Schema.String),
      display: Schema.Struct({
        provider: Schema.String,
        resource: Schema.String,
        operation: Schema.String,
        description: Schema.String,
      }),
      origin: Schema.optional(Schema.String),
    }),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type OperationsListOutput = typeof OperationsListOutput.Type;

// The operation
/**
 * Gets a list of StoragePool operations.
 */
export const OperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationsListInput,
  outputSchema: OperationsListOutput,
}));
// Input Schema
export const ResourceSkusListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.StoragePool/locations/{location}/skus",
  }),
);
export type ResourceSkusListInput = typeof ResourceSkusListInput.Type;

// Output Schema
export const ResourceSkusListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          apiVersion: Schema.optional(Schema.String),
          resourceType: Schema.optional(Schema.String),
          capabilities: Schema.optional(
            Schema.Array(
              Schema.Struct({
                name: Schema.optional(Schema.String),
                value: Schema.optional(Schema.String),
              }),
            ),
          ),
          locationInfo: Schema.optional(
            Schema.Struct({
              location: Schema.optional(Schema.String),
              zones: Schema.optional(Schema.Array(Schema.String)),
              zoneDetails: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    name: Schema.optional(Schema.Array(Schema.String)),
                    capabilities: Schema.optional(
                      Schema.Array(
                        Schema.Struct({
                          name: Schema.optional(Schema.String),
                          value: Schema.optional(Schema.String),
                        }),
                      ),
                    ),
                  }),
                ),
              ),
            }),
          ),
          name: Schema.optional(Schema.String),
          tier: Schema.optional(Schema.String),
          restrictions: Schema.optional(
            Schema.Array(
              Schema.Struct({
                type: Schema.optional(Schema.Literals(["Location", "Zone"])),
                values: Schema.optional(Schema.Array(Schema.String)),
                restrictionInfo: Schema.optional(
                  Schema.Struct({
                    locations: Schema.optional(Schema.Array(Schema.String)),
                    zones: Schema.optional(Schema.Array(Schema.String)),
                  }),
                ),
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
  },
);
export type ResourceSkusListOutput = typeof ResourceSkusListOutput.Type;

// The operation
/**
 * Lists available StoragePool resources and skus in an Azure location.
 */
export const ResourceSkusList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ResourceSkusListInput,
  outputSchema: ResourceSkusListOutput,
}));
