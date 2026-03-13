/**
 * Azure Privatedns API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const PrivateZonesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateZoneName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/privateDnsZones/{privateZoneName}",
    }),
  );
export type PrivateZonesCreateOrUpdateInput =
  typeof PrivateZonesCreateOrUpdateInput.Type;

// Output Schema
export const PrivateZonesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PrivateZonesCreateOrUpdateOutput =
  typeof PrivateZonesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a Private DNS zone. Does not modify Links to virtual networks or DNS records within the zone.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateZoneName - The name of the Private DNS zone (without a terminating dot).
 * @param If-Match - The ETag of the Private DNS zone. Omit this value to always overwrite the current zone. Specify the last-seen ETag value to prevent accidentally overwriting any concurrent changes.
 * @param If-None-Match - Set to '*' to allow a new Private DNS zone to be created, but to prevent updating an existing zone. Other values will be ignored.
 */
export const PrivateZonesCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PrivateZonesCreateOrUpdateInput,
    outputSchema: PrivateZonesCreateOrUpdateOutput,
  }),
);
// Input Schema
export const PrivateZonesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateZoneName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/privateDnsZones/{privateZoneName}",
    }),
  );
export type PrivateZonesDeleteInput = typeof PrivateZonesDeleteInput.Type;

// Output Schema
export const PrivateZonesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PrivateZonesDeleteOutput = typeof PrivateZonesDeleteOutput.Type;

// The operation
/**
 * Deletes a Private DNS zone. WARNING: All DNS records in the zone will also be deleted. This operation cannot be undone. Private DNS zone cannot be deleted unless all virtual network links to it are removed.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateZoneName - The name of the Private DNS zone (without a terminating dot).
 * @param If-Match - The ETag of the Private DNS zone. Omit this value to always delete the current zone. Specify the last-seen ETag value to prevent accidentally deleting any concurrent changes.
 */
export const PrivateZonesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PrivateZonesDeleteInput,
  outputSchema: PrivateZonesDeleteOutput,
}));
// Input Schema
export const PrivateZonesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  privateZoneName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/privateDnsZones/{privateZoneName}",
  }),
);
export type PrivateZonesGetInput = typeof PrivateZonesGetInput.Type;

// Output Schema
export const PrivateZonesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type PrivateZonesGetOutput = typeof PrivateZonesGetOutput.Type;

// The operation
/**
 * Gets a Private DNS zone. Retrieves the zone properties, but not the virtual networks links or the record sets within the zone.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateZoneName - The name of the Private DNS zone (without a terminating dot).
 */
export const PrivateZonesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PrivateZonesGetInput,
  outputSchema: PrivateZonesGetOutput,
}));
// Input Schema
export const PrivateZonesListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
  $top: Schema.optional(Schema.Number),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.Network/privateDnsZones",
  }),
);
export type PrivateZonesListInput = typeof PrivateZonesListInput.Type;

// Output Schema
export const PrivateZonesListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  },
);
export type PrivateZonesListOutput = typeof PrivateZonesListOutput.Type;

// The operation
/**
 * Lists the Private DNS zones in all resource groups in a subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param $top - The maximum number of Private DNS zones to return. If not specified, returns up to 100 zones.
 */
export const PrivateZonesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PrivateZonesListInput,
  outputSchema: PrivateZonesListOutput,
}));
// Input Schema
export const PrivateZonesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $top: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/privateDnsZones",
    }),
  );
export type PrivateZonesListByResourceGroupInput =
  typeof PrivateZonesListByResourceGroupInput.Type;

// Output Schema
export const PrivateZonesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type PrivateZonesListByResourceGroupOutput =
  typeof PrivateZonesListByResourceGroupOutput.Type;

// The operation
/**
 * Lists the Private DNS zones within a resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param $top - The maximum number of record sets to return. If not specified, returns up to 100 record sets.
 */
export const PrivateZonesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateZonesListByResourceGroupInput,
    outputSchema: PrivateZonesListByResourceGroupOutput,
  }));
// Input Schema
export const PrivateZonesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateZoneName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/privateDnsZones/{privateZoneName}",
    }),
  );
export type PrivateZonesUpdateInput = typeof PrivateZonesUpdateInput.Type;

// Output Schema
export const PrivateZonesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PrivateZonesUpdateOutput = typeof PrivateZonesUpdateOutput.Type;

// The operation
/**
 * Updates a Private DNS zone. Does not modify virtual network links or DNS records within the zone.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateZoneName - The name of the Private DNS zone (without a terminating dot).
 * @param If-Match - The ETag of the Private DNS zone. Omit this value to always overwrite the current zone. Specify the last-seen ETag value to prevent accidentally overwriting any concurrent changes.
 */
export const PrivateZonesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PrivateZonesUpdateInput,
  outputSchema: PrivateZonesUpdateOutput,
}));
// Input Schema
export const RecordSetsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateZoneName: Schema.String.pipe(T.PathParam()),
    recordType: Schema.Literals([
      "A",
      "AAAA",
      "CNAME",
      "MX",
      "PTR",
      "SOA",
      "SRV",
      "TXT",
    ]).pipe(T.PathParam()),
    relativeRecordSetName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/privateDnsZones/{privateZoneName}/{recordType}/{relativeRecordSetName}",
    }),
  );
export type RecordSetsCreateOrUpdateInput =
  typeof RecordSetsCreateOrUpdateInput.Type;

// Output Schema
export const RecordSetsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type RecordSetsCreateOrUpdateOutput =
  typeof RecordSetsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a record set within a Private DNS zone.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateZoneName - The name of the DNS zone (without a terminating dot).
 * @param recordType - The type of DNS record in this record set.
 * @param relativeRecordSetName - The name of the record set, relative to the name of the zone.
 * @param If-Match - The ETag of the record set. Omit this value to always overwrite the current record set. Specify the last-seen ETag value to prevent accidentally overwriting any concurrent changes.
 * @param If-None-Match - Set to '*' to allow a new record set to be created, but to prevent updating an existing record set. Other values will be ignored.
 */
export const RecordSetsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RecordSetsCreateOrUpdateInput,
    outputSchema: RecordSetsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const RecordSetsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  privateZoneName: Schema.String.pipe(T.PathParam()),
  recordType: Schema.Literals([
    "A",
    "AAAA",
    "CNAME",
    "MX",
    "PTR",
    "SOA",
    "SRV",
    "TXT",
  ]).pipe(T.PathParam()),
  relativeRecordSetName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/privateDnsZones/{privateZoneName}/{recordType}/{relativeRecordSetName}",
  }),
);
export type RecordSetsDeleteInput = typeof RecordSetsDeleteInput.Type;

// Output Schema
export const RecordSetsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type RecordSetsDeleteOutput = typeof RecordSetsDeleteOutput.Type;

// The operation
/**
 * Deletes a record set from a Private DNS zone. This operation cannot be undone.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateZoneName - The name of the DNS zone (without a terminating dot).
 * @param recordType - The type of DNS record in this record set.
 * @param relativeRecordSetName - The name of the record set, relative to the name of the zone.
 * @param If-Match - The ETag of the record set. Omit this value to always delete the current record set. Specify the last-seen ETag value to prevent accidentally deleting any concurrent changes.
 */
export const RecordSetsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RecordSetsDeleteInput,
  outputSchema: RecordSetsDeleteOutput,
}));
// Input Schema
export const RecordSetsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  privateZoneName: Schema.String.pipe(T.PathParam()),
  recordType: Schema.Literals([
    "A",
    "AAAA",
    "CNAME",
    "MX",
    "PTR",
    "SOA",
    "SRV",
    "TXT",
  ]).pipe(T.PathParam()),
  relativeRecordSetName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/privateDnsZones/{privateZoneName}/{recordType}/{relativeRecordSetName}",
  }),
);
export type RecordSetsGetInput = typeof RecordSetsGetInput.Type;

// Output Schema
export const RecordSetsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type RecordSetsGetOutput = typeof RecordSetsGetOutput.Type;

// The operation
/**
 * Gets a record set.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateZoneName - The name of the DNS zone (without a terminating dot).
 * @param recordType - The type of DNS record in this record set.
 * @param relativeRecordSetName - The name of the record set, relative to the name of the zone.
 */
export const RecordSetsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RecordSetsGetInput,
  outputSchema: RecordSetsGetOutput,
}));
// Input Schema
export const RecordSetsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  privateZoneName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
  $top: Schema.optional(Schema.Number),
  $recordsetnamesuffix: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/privateDnsZones/{privateZoneName}/aLL",
  }),
);
export type RecordSetsListInput = typeof RecordSetsListInput.Type;

// Output Schema
export const RecordSetsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(Schema.Struct({})),
  nextLink: Schema.optional(Schema.String),
});
export type RecordSetsListOutput = typeof RecordSetsListOutput.Type;

// The operation
/**
 * Lists all record sets in a Private DNS zone.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateZoneName - The name of the Private DNS zone (without a terminating dot).
 * @param $top - The maximum number of record sets to return. If not specified, returns up to 100 record sets.
 * @param $recordsetnamesuffix - The suffix label of the record set name to be used to filter the record set enumeration. If this parameter is specified, the returned enumeration will only contain records that end with ".<recordsetnamesuffix>".
 */
export const RecordSetsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RecordSetsListInput,
  outputSchema: RecordSetsListOutput,
}));
// Input Schema
export const RecordSetsListByTypeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateZoneName: Schema.String.pipe(T.PathParam()),
    recordType: Schema.Literals([
      "A",
      "AAAA",
      "CNAME",
      "MX",
      "PTR",
      "SOA",
      "SRV",
      "TXT",
    ]).pipe(T.PathParam()),
    "api-version": Schema.String,
    $top: Schema.optional(Schema.Number),
    $recordsetnamesuffix: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/privateDnsZones/{privateZoneName}/{recordType}",
    }),
  );
export type RecordSetsListByTypeInput = typeof RecordSetsListByTypeInput.Type;

// Output Schema
export const RecordSetsListByTypeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type RecordSetsListByTypeOutput = typeof RecordSetsListByTypeOutput.Type;

// The operation
/**
 * Lists the record sets of a specified type in a Private DNS zone.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateZoneName - The name of the DNS zone (without a terminating dot).
 * @param recordType - The type of DNS record in this record set.
 * @param $top - The maximum number of record sets to return. If not specified, returns up to 100 record sets.
 * @param $recordsetnamesuffix - The suffix label of the record set name to be used to filter the record set enumeration. If this parameter is specified, the returned enumeration will only contain records that end with ".<recordsetnamesuffix>".
 */
export const RecordSetsListByType = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RecordSetsListByTypeInput,
    outputSchema: RecordSetsListByTypeOutput,
  }),
);
// Input Schema
export const RecordSetsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  privateZoneName: Schema.String.pipe(T.PathParam()),
  recordType: Schema.Literals([
    "A",
    "AAAA",
    "CNAME",
    "MX",
    "PTR",
    "SOA",
    "SRV",
    "TXT",
  ]).pipe(T.PathParam()),
  relativeRecordSetName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/privateDnsZones/{privateZoneName}/{recordType}/{relativeRecordSetName}",
  }),
);
export type RecordSetsUpdateInput = typeof RecordSetsUpdateInput.Type;

// Output Schema
export const RecordSetsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type RecordSetsUpdateOutput = typeof RecordSetsUpdateOutput.Type;

// The operation
/**
 * Updates a record set within a Private DNS zone.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateZoneName - The name of the DNS zone (without a terminating dot).
 * @param recordType - The type of DNS record in this record set.
 * @param relativeRecordSetName - The name of the record set, relative to the name of the zone.
 * @param If-Match - The ETag of the record set. Omit this value to always overwrite the current record set. Specify the last-seen ETag value to prevent accidentally overwriting concurrent changes.
 */
export const RecordSetsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RecordSetsUpdateInput,
  outputSchema: RecordSetsUpdateOutput,
}));
// Input Schema
export const VirtualNetworkLinksCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateZoneName: Schema.String.pipe(T.PathParam()),
    virtualNetworkLinkName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/privateDnsZones/{privateZoneName}/virtualNetworkLinks/{virtualNetworkLinkName}",
    }),
  );
export type VirtualNetworkLinksCreateOrUpdateInput =
  typeof VirtualNetworkLinksCreateOrUpdateInput.Type;

// Output Schema
export const VirtualNetworkLinksCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type VirtualNetworkLinksCreateOrUpdateOutput =
  typeof VirtualNetworkLinksCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a virtual network link to the specified Private DNS zone.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateZoneName - The name of the Private DNS zone (without a terminating dot).
 * @param virtualNetworkLinkName - The name of the virtual network link.
 * @param If-Match - The ETag of the virtual network link to the Private DNS zone. Omit this value to always overwrite the current virtual network link. Specify the last-seen ETag value to prevent accidentally overwriting any concurrent changes.
 * @param If-None-Match - Set to '*' to allow a new virtual network link to the Private DNS zone to be created, but to prevent updating an existing link. Other values will be ignored.
 */
export const VirtualNetworkLinksCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: VirtualNetworkLinksCreateOrUpdateInput,
    outputSchema: VirtualNetworkLinksCreateOrUpdateOutput,
  }));
// Input Schema
export const VirtualNetworkLinksDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateZoneName: Schema.String.pipe(T.PathParam()),
    virtualNetworkLinkName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/privateDnsZones/{privateZoneName}/virtualNetworkLinks/{virtualNetworkLinkName}",
    }),
  );
export type VirtualNetworkLinksDeleteInput =
  typeof VirtualNetworkLinksDeleteInput.Type;

// Output Schema
export const VirtualNetworkLinksDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type VirtualNetworkLinksDeleteOutput =
  typeof VirtualNetworkLinksDeleteOutput.Type;

// The operation
/**
 * Deletes a virtual network link to the specified Private DNS zone. WARNING: In case of a registration virtual network, all auto-registered DNS records in the zone for the virtual network will also be deleted. This operation cannot be undone.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateZoneName - The name of the Private DNS zone (without a terminating dot).
 * @param virtualNetworkLinkName - The name of the virtual network link.
 * @param If-Match - The ETag of the virtual network link to the Private DNS zone. Omit this value to always delete the current zone. Specify the last-seen ETag value to prevent accidentally deleting any concurrent changes.
 */
export const VirtualNetworkLinksDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VirtualNetworkLinksDeleteInput,
    outputSchema: VirtualNetworkLinksDeleteOutput,
  }),
);
// Input Schema
export const VirtualNetworkLinksGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateZoneName: Schema.String.pipe(T.PathParam()),
    virtualNetworkLinkName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/privateDnsZones/{privateZoneName}/virtualNetworkLinks/{virtualNetworkLinkName}",
    }),
  );
export type VirtualNetworkLinksGetInput =
  typeof VirtualNetworkLinksGetInput.Type;

// Output Schema
export const VirtualNetworkLinksGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type VirtualNetworkLinksGetOutput =
  typeof VirtualNetworkLinksGetOutput.Type;

// The operation
/**
 * Gets a virtual network link to the specified Private DNS zone.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateZoneName - The name of the Private DNS zone (without a terminating dot).
 * @param virtualNetworkLinkName - The name of the virtual network link.
 */
export const VirtualNetworkLinksGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VirtualNetworkLinksGetInput,
    outputSchema: VirtualNetworkLinksGetOutput,
  }),
);
// Input Schema
export const VirtualNetworkLinksListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateZoneName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $top: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/privateDnsZones/{privateZoneName}/virtualNetworkLinks",
    }),
  );
export type VirtualNetworkLinksListInput =
  typeof VirtualNetworkLinksListInput.Type;

// Output Schema
export const VirtualNetworkLinksListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type VirtualNetworkLinksListOutput =
  typeof VirtualNetworkLinksListOutput.Type;

// The operation
/**
 * Lists the virtual network links to the specified Private DNS zone.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateZoneName - The name of the Private DNS zone (without a terminating dot).
 * @param $top - The maximum number of virtual network links to return. If not specified, returns up to 100 virtual network links.
 */
export const VirtualNetworkLinksList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VirtualNetworkLinksListInput,
    outputSchema: VirtualNetworkLinksListOutput,
  }),
);
// Input Schema
export const VirtualNetworkLinksUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateZoneName: Schema.String.pipe(T.PathParam()),
    virtualNetworkLinkName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/privateDnsZones/{privateZoneName}/virtualNetworkLinks/{virtualNetworkLinkName}",
    }),
  );
export type VirtualNetworkLinksUpdateInput =
  typeof VirtualNetworkLinksUpdateInput.Type;

// Output Schema
export const VirtualNetworkLinksUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type VirtualNetworkLinksUpdateOutput =
  typeof VirtualNetworkLinksUpdateOutput.Type;

// The operation
/**
 * Updates a virtual network link to the specified Private DNS zone.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateZoneName - The name of the Private DNS zone (without a terminating dot).
 * @param virtualNetworkLinkName - The name of the virtual network link.
 * @param If-Match - The ETag of the virtual network link to the Private DNS zone. Omit this value to always overwrite the current virtual network link. Specify the last-seen ETag value to prevent accidentally overwriting any concurrent changes.
 */
export const VirtualNetworkLinksUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VirtualNetworkLinksUpdateInput,
    outputSchema: VirtualNetworkLinksUpdateOutput,
  }),
);
