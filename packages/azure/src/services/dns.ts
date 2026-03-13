/**
 * Azure Dns API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const DnsResourceReferenceGetByTargetResourcesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Network/getDnsResourceReference",
    }),
  );
export type DnsResourceReferenceGetByTargetResourcesInput =
  typeof DnsResourceReferenceGetByTargetResourcesInput.Type;

// Output Schema
export const DnsResourceReferenceGetByTargetResourcesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    properties: Schema.optional(
      Schema.Struct({
        dnsResourceReferences: Schema.optional(
          Schema.Array(
            Schema.Struct({
              dnsResources: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    id: Schema.optional(Schema.String),
                  }),
                ),
              ),
              targetResource: Schema.optional(
                Schema.Struct({
                  id: Schema.optional(Schema.String),
                }),
              ),
            }),
          ),
        ),
      }),
    ),
  });
export type DnsResourceReferenceGetByTargetResourcesOutput =
  typeof DnsResourceReferenceGetByTargetResourcesOutput.Type;

// The operation
/**
 * Returns the DNS records specified by the referencing targetResourceIds.
 */
export const DnsResourceReferenceGetByTargetResources =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DnsResourceReferenceGetByTargetResourcesInput,
    outputSchema: DnsResourceReferenceGetByTargetResourcesOutput,
  }));
// Input Schema
export const RecordSetsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    zoneName: Schema.String.pipe(T.PathParam()),
    relativeRecordSetName: Schema.String.pipe(T.PathParam()),
    recordType: Schema.Literals([
      "A",
      "AAAA",
      "CAA",
      "CNAME",
      "MX",
      "NS",
      "PTR",
      "SOA",
      "SRV",
      "TXT",
    ]).pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsZones/{zoneName}/{recordType}/{relativeRecordSetName}",
    }),
  );
export type RecordSetsCreateOrUpdateInput =
  typeof RecordSetsCreateOrUpdateInput.Type;

// Output Schema
export const RecordSetsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    etag: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        TTL: Schema.optional(Schema.Number),
        fqdn: Schema.optional(Schema.String),
        provisioningState: Schema.optional(Schema.String),
        targetResource: Schema.optional(
          Schema.Struct({
            id: Schema.optional(Schema.String),
          }),
        ),
        ARecords: Schema.optional(
          Schema.Array(
            Schema.Struct({
              ipv4Address: Schema.optional(Schema.String),
            }),
          ),
        ),
        AAAARecords: Schema.optional(
          Schema.Array(
            Schema.Struct({
              ipv6Address: Schema.optional(Schema.String),
            }),
          ),
        ),
        MXRecords: Schema.optional(
          Schema.Array(
            Schema.Struct({
              preference: Schema.optional(Schema.Number),
              exchange: Schema.optional(Schema.String),
            }),
          ),
        ),
        NSRecords: Schema.optional(
          Schema.Array(
            Schema.Struct({
              nsdname: Schema.optional(Schema.String),
            }),
          ),
        ),
        PTRRecords: Schema.optional(
          Schema.Array(
            Schema.Struct({
              ptrdname: Schema.optional(Schema.String),
            }),
          ),
        ),
        SRVRecords: Schema.optional(
          Schema.Array(
            Schema.Struct({
              priority: Schema.optional(Schema.Number),
              weight: Schema.optional(Schema.Number),
              port: Schema.optional(Schema.Number),
              target: Schema.optional(Schema.String),
            }),
          ),
        ),
        TXTRecords: Schema.optional(
          Schema.Array(
            Schema.Struct({
              value: Schema.optional(Schema.Array(Schema.String)),
            }),
          ),
        ),
        CNAMERecord: Schema.optional(
          Schema.Struct({
            cname: Schema.optional(Schema.String),
          }),
        ),
        SOARecord: Schema.optional(
          Schema.Struct({
            host: Schema.optional(Schema.String),
            email: Schema.optional(Schema.String),
            serialNumber: Schema.optional(Schema.Number),
            refreshTime: Schema.optional(Schema.Number),
            retryTime: Schema.optional(Schema.Number),
            expireTime: Schema.optional(Schema.Number),
            minimumTTL: Schema.optional(Schema.Number),
          }),
        ),
        caaRecords: Schema.optional(
          Schema.Array(
            Schema.Struct({
              flags: Schema.optional(Schema.Number),
              tag: Schema.optional(Schema.String),
              value: Schema.optional(Schema.String),
            }),
          ),
        ),
      }),
    ),
  });
export type RecordSetsCreateOrUpdateOutput =
  typeof RecordSetsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a record set within a DNS zone.
 *
 * @param resourceGroupName - The name of the resource group.
 * @param zoneName - The name of the DNS zone (without a terminating dot).
 * @param relativeRecordSetName - The name of the record set, relative to the name of the zone.
 * @param recordType - The type of DNS record in this record set. Record sets of type SOA can be updated but not created (they are created when the DNS zone is created).
 * @param If-Match - The etag of the record set. Omit this value to always overwrite the current record set. Specify the last-seen etag value to prevent accidentally overwriting any concurrent changes.
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
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  zoneName: Schema.String.pipe(T.PathParam()),
  relativeRecordSetName: Schema.String.pipe(T.PathParam()),
  recordType: Schema.Literals([
    "A",
    "AAAA",
    "CAA",
    "CNAME",
    "MX",
    "NS",
    "PTR",
    "SOA",
    "SRV",
    "TXT",
  ]).pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsZones/{zoneName}/{recordType}/{relativeRecordSetName}",
  }),
);
export type RecordSetsDeleteInput = typeof RecordSetsDeleteInput.Type;

// Output Schema
export const RecordSetsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type RecordSetsDeleteOutput = typeof RecordSetsDeleteOutput.Type;

// The operation
/**
 * Deletes a record set from a DNS zone. This operation cannot be undone.
 *
 * @param resourceGroupName - The name of the resource group.
 * @param zoneName - The name of the DNS zone (without a terminating dot).
 * @param relativeRecordSetName - The name of the record set, relative to the name of the zone.
 * @param recordType - The type of DNS record in this record set. Record sets of type SOA cannot be deleted (they are deleted when the DNS zone is deleted).
 * @param If-Match - The etag of the record set. Omit this value to always delete the current record set. Specify the last-seen etag value to prevent accidentally deleting any concurrent changes.
 */
export const RecordSetsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RecordSetsDeleteInput,
  outputSchema: RecordSetsDeleteOutput,
}));
// Input Schema
export const RecordSetsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  zoneName: Schema.String.pipe(T.PathParam()),
  relativeRecordSetName: Schema.String.pipe(T.PathParam()),
  recordType: Schema.Literals([
    "A",
    "AAAA",
    "CAA",
    "CNAME",
    "MX",
    "NS",
    "PTR",
    "SOA",
    "SRV",
    "TXT",
  ]).pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsZones/{zoneName}/{recordType}/{relativeRecordSetName}",
  }),
);
export type RecordSetsGetInput = typeof RecordSetsGetInput.Type;

// Output Schema
export const RecordSetsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  properties: Schema.optional(
    Schema.Struct({
      metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      TTL: Schema.optional(Schema.Number),
      fqdn: Schema.optional(Schema.String),
      provisioningState: Schema.optional(Schema.String),
      targetResource: Schema.optional(
        Schema.Struct({
          id: Schema.optional(Schema.String),
        }),
      ),
      ARecords: Schema.optional(
        Schema.Array(
          Schema.Struct({
            ipv4Address: Schema.optional(Schema.String),
          }),
        ),
      ),
      AAAARecords: Schema.optional(
        Schema.Array(
          Schema.Struct({
            ipv6Address: Schema.optional(Schema.String),
          }),
        ),
      ),
      MXRecords: Schema.optional(
        Schema.Array(
          Schema.Struct({
            preference: Schema.optional(Schema.Number),
            exchange: Schema.optional(Schema.String),
          }),
        ),
      ),
      NSRecords: Schema.optional(
        Schema.Array(
          Schema.Struct({
            nsdname: Schema.optional(Schema.String),
          }),
        ),
      ),
      PTRRecords: Schema.optional(
        Schema.Array(
          Schema.Struct({
            ptrdname: Schema.optional(Schema.String),
          }),
        ),
      ),
      SRVRecords: Schema.optional(
        Schema.Array(
          Schema.Struct({
            priority: Schema.optional(Schema.Number),
            weight: Schema.optional(Schema.Number),
            port: Schema.optional(Schema.Number),
            target: Schema.optional(Schema.String),
          }),
        ),
      ),
      TXTRecords: Schema.optional(
        Schema.Array(
          Schema.Struct({
            value: Schema.optional(Schema.Array(Schema.String)),
          }),
        ),
      ),
      CNAMERecord: Schema.optional(
        Schema.Struct({
          cname: Schema.optional(Schema.String),
        }),
      ),
      SOARecord: Schema.optional(
        Schema.Struct({
          host: Schema.optional(Schema.String),
          email: Schema.optional(Schema.String),
          serialNumber: Schema.optional(Schema.Number),
          refreshTime: Schema.optional(Schema.Number),
          retryTime: Schema.optional(Schema.Number),
          expireTime: Schema.optional(Schema.Number),
          minimumTTL: Schema.optional(Schema.Number),
        }),
      ),
      caaRecords: Schema.optional(
        Schema.Array(
          Schema.Struct({
            flags: Schema.optional(Schema.Number),
            tag: Schema.optional(Schema.String),
            value: Schema.optional(Schema.String),
          }),
        ),
      ),
    }),
  ),
});
export type RecordSetsGetOutput = typeof RecordSetsGetOutput.Type;

// The operation
/**
 * Gets a record set.
 *
 * @param resourceGroupName - The name of the resource group.
 * @param zoneName - The name of the DNS zone (without a terminating dot).
 * @param relativeRecordSetName - The name of the record set, relative to the name of the zone.
 * @param recordType - The type of DNS record in this record set.
 */
export const RecordSetsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RecordSetsGetInput,
  outputSchema: RecordSetsGetOutput,
}));
// Input Schema
export const RecordSetsListAllByDnsZoneInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    zoneName: Schema.String.pipe(T.PathParam()),
    $top: Schema.optional(Schema.Number),
    $recordsetnamesuffix: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsZones/{zoneName}/all",
    }),
  );
export type RecordSetsListAllByDnsZoneInput =
  typeof RecordSetsListAllByDnsZoneInput.Type;

// Output Schema
export const RecordSetsListAllByDnsZoneOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          etag: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Struct({
              metadata: Schema.optional(
                Schema.Record(Schema.String, Schema.String),
              ),
              TTL: Schema.optional(Schema.Number),
              fqdn: Schema.optional(Schema.String),
              provisioningState: Schema.optional(Schema.String),
              targetResource: Schema.optional(
                Schema.Struct({
                  id: Schema.optional(Schema.String),
                }),
              ),
              ARecords: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    ipv4Address: Schema.optional(Schema.String),
                  }),
                ),
              ),
              AAAARecords: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    ipv6Address: Schema.optional(Schema.String),
                  }),
                ),
              ),
              MXRecords: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    preference: Schema.optional(Schema.Number),
                    exchange: Schema.optional(Schema.String),
                  }),
                ),
              ),
              NSRecords: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    nsdname: Schema.optional(Schema.String),
                  }),
                ),
              ),
              PTRRecords: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    ptrdname: Schema.optional(Schema.String),
                  }),
                ),
              ),
              SRVRecords: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    priority: Schema.optional(Schema.Number),
                    weight: Schema.optional(Schema.Number),
                    port: Schema.optional(Schema.Number),
                    target: Schema.optional(Schema.String),
                  }),
                ),
              ),
              TXTRecords: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    value: Schema.optional(Schema.Array(Schema.String)),
                  }),
                ),
              ),
              CNAMERecord: Schema.optional(
                Schema.Struct({
                  cname: Schema.optional(Schema.String),
                }),
              ),
              SOARecord: Schema.optional(
                Schema.Struct({
                  host: Schema.optional(Schema.String),
                  email: Schema.optional(Schema.String),
                  serialNumber: Schema.optional(Schema.Number),
                  refreshTime: Schema.optional(Schema.Number),
                  retryTime: Schema.optional(Schema.Number),
                  expireTime: Schema.optional(Schema.Number),
                  minimumTTL: Schema.optional(Schema.Number),
                }),
              ),
              caaRecords: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    flags: Schema.optional(Schema.Number),
                    tag: Schema.optional(Schema.String),
                    value: Schema.optional(Schema.String),
                  }),
                ),
              ),
            }),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type RecordSetsListAllByDnsZoneOutput =
  typeof RecordSetsListAllByDnsZoneOutput.Type;

// The operation
/**
 * Lists all record sets in a DNS zone.
 *
 * @param resourceGroupName - The name of the resource group.
 * @param zoneName - The name of the DNS zone (without a terminating dot).
 * @param $top - The maximum number of record sets to return. If not specified, returns up to 100 record sets.
 * @param $recordsetnamesuffix - The suffix label of the record set name that has to be used to filter the record set enumerations. If this parameter is specified, Enumeration will return only records that end with .<recordSetNameSuffix>
 */
export const RecordSetsListAllByDnsZone = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RecordSetsListAllByDnsZoneInput,
    outputSchema: RecordSetsListAllByDnsZoneOutput,
  }),
);
// Input Schema
export const RecordSetsListByDnsZoneInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    zoneName: Schema.String.pipe(T.PathParam()),
    $top: Schema.optional(Schema.Number),
    $recordsetnamesuffix: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsZones/{zoneName}/recordsets",
    }),
  );
export type RecordSetsListByDnsZoneInput =
  typeof RecordSetsListByDnsZoneInput.Type;

// Output Schema
export const RecordSetsListByDnsZoneOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          etag: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Struct({
              metadata: Schema.optional(
                Schema.Record(Schema.String, Schema.String),
              ),
              TTL: Schema.optional(Schema.Number),
              fqdn: Schema.optional(Schema.String),
              provisioningState: Schema.optional(Schema.String),
              targetResource: Schema.optional(
                Schema.Struct({
                  id: Schema.optional(Schema.String),
                }),
              ),
              ARecords: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    ipv4Address: Schema.optional(Schema.String),
                  }),
                ),
              ),
              AAAARecords: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    ipv6Address: Schema.optional(Schema.String),
                  }),
                ),
              ),
              MXRecords: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    preference: Schema.optional(Schema.Number),
                    exchange: Schema.optional(Schema.String),
                  }),
                ),
              ),
              NSRecords: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    nsdname: Schema.optional(Schema.String),
                  }),
                ),
              ),
              PTRRecords: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    ptrdname: Schema.optional(Schema.String),
                  }),
                ),
              ),
              SRVRecords: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    priority: Schema.optional(Schema.Number),
                    weight: Schema.optional(Schema.Number),
                    port: Schema.optional(Schema.Number),
                    target: Schema.optional(Schema.String),
                  }),
                ),
              ),
              TXTRecords: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    value: Schema.optional(Schema.Array(Schema.String)),
                  }),
                ),
              ),
              CNAMERecord: Schema.optional(
                Schema.Struct({
                  cname: Schema.optional(Schema.String),
                }),
              ),
              SOARecord: Schema.optional(
                Schema.Struct({
                  host: Schema.optional(Schema.String),
                  email: Schema.optional(Schema.String),
                  serialNumber: Schema.optional(Schema.Number),
                  refreshTime: Schema.optional(Schema.Number),
                  retryTime: Schema.optional(Schema.Number),
                  expireTime: Schema.optional(Schema.Number),
                  minimumTTL: Schema.optional(Schema.Number),
                }),
              ),
              caaRecords: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    flags: Schema.optional(Schema.Number),
                    tag: Schema.optional(Schema.String),
                    value: Schema.optional(Schema.String),
                  }),
                ),
              ),
            }),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type RecordSetsListByDnsZoneOutput =
  typeof RecordSetsListByDnsZoneOutput.Type;

// The operation
/**
 * Lists all record sets in a DNS zone.
 *
 * @param resourceGroupName - The name of the resource group.
 * @param zoneName - The name of the DNS zone (without a terminating dot).
 * @param $top - The maximum number of record sets to return. If not specified, returns up to 100 record sets.
 * @param $recordsetnamesuffix - The suffix label of the record set name that has to be used to filter the record set enumerations. If this parameter is specified, Enumeration will return only records that end with .<recordSetNameSuffix>
 */
export const RecordSetsListByDnsZone = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RecordSetsListByDnsZoneInput,
    outputSchema: RecordSetsListByDnsZoneOutput,
  }),
);
// Input Schema
export const RecordSetsListByTypeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    zoneName: Schema.String.pipe(T.PathParam()),
    recordType: Schema.Literals([
      "A",
      "AAAA",
      "CAA",
      "CNAME",
      "MX",
      "NS",
      "PTR",
      "SOA",
      "SRV",
      "TXT",
    ]).pipe(T.PathParam()),
    $top: Schema.optional(Schema.Number),
    $recordsetnamesuffix: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsZones/{zoneName}/{recordType}",
    }),
  );
export type RecordSetsListByTypeInput = typeof RecordSetsListByTypeInput.Type;

// Output Schema
export const RecordSetsListByTypeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          etag: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Struct({
              metadata: Schema.optional(
                Schema.Record(Schema.String, Schema.String),
              ),
              TTL: Schema.optional(Schema.Number),
              fqdn: Schema.optional(Schema.String),
              provisioningState: Schema.optional(Schema.String),
              targetResource: Schema.optional(
                Schema.Struct({
                  id: Schema.optional(Schema.String),
                }),
              ),
              ARecords: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    ipv4Address: Schema.optional(Schema.String),
                  }),
                ),
              ),
              AAAARecords: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    ipv6Address: Schema.optional(Schema.String),
                  }),
                ),
              ),
              MXRecords: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    preference: Schema.optional(Schema.Number),
                    exchange: Schema.optional(Schema.String),
                  }),
                ),
              ),
              NSRecords: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    nsdname: Schema.optional(Schema.String),
                  }),
                ),
              ),
              PTRRecords: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    ptrdname: Schema.optional(Schema.String),
                  }),
                ),
              ),
              SRVRecords: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    priority: Schema.optional(Schema.Number),
                    weight: Schema.optional(Schema.Number),
                    port: Schema.optional(Schema.Number),
                    target: Schema.optional(Schema.String),
                  }),
                ),
              ),
              TXTRecords: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    value: Schema.optional(Schema.Array(Schema.String)),
                  }),
                ),
              ),
              CNAMERecord: Schema.optional(
                Schema.Struct({
                  cname: Schema.optional(Schema.String),
                }),
              ),
              SOARecord: Schema.optional(
                Schema.Struct({
                  host: Schema.optional(Schema.String),
                  email: Schema.optional(Schema.String),
                  serialNumber: Schema.optional(Schema.Number),
                  refreshTime: Schema.optional(Schema.Number),
                  retryTime: Schema.optional(Schema.Number),
                  expireTime: Schema.optional(Schema.Number),
                  minimumTTL: Schema.optional(Schema.Number),
                }),
              ),
              caaRecords: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    flags: Schema.optional(Schema.Number),
                    tag: Schema.optional(Schema.String),
                    value: Schema.optional(Schema.String),
                  }),
                ),
              ),
            }),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type RecordSetsListByTypeOutput = typeof RecordSetsListByTypeOutput.Type;

// The operation
/**
 * Lists the record sets of a specified type in a DNS zone.
 *
 * @param resourceGroupName - The name of the resource group.
 * @param zoneName - The name of the DNS zone (without a terminating dot).
 * @param recordType - The type of record sets to enumerate.
 * @param $top - The maximum number of record sets to return. If not specified, returns up to 100 record sets.
 * @param $recordsetnamesuffix - The suffix label of the record set name that has to be used to filter the record set enumerations. If this parameter is specified, Enumeration will return only records that end with .<recordSetNameSuffix>
 */
export const RecordSetsListByType = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RecordSetsListByTypeInput,
    outputSchema: RecordSetsListByTypeOutput,
  }),
);
// Input Schema
export const RecordSetsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  zoneName: Schema.String.pipe(T.PathParam()),
  relativeRecordSetName: Schema.String.pipe(T.PathParam()),
  recordType: Schema.Literals([
    "A",
    "AAAA",
    "CAA",
    "CNAME",
    "MX",
    "NS",
    "PTR",
    "SOA",
    "SRV",
    "TXT",
  ]).pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsZones/{zoneName}/{recordType}/{relativeRecordSetName}",
  }),
);
export type RecordSetsUpdateInput = typeof RecordSetsUpdateInput.Type;

// Output Schema
export const RecordSetsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    etag: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        TTL: Schema.optional(Schema.Number),
        fqdn: Schema.optional(Schema.String),
        provisioningState: Schema.optional(Schema.String),
        targetResource: Schema.optional(
          Schema.Struct({
            id: Schema.optional(Schema.String),
          }),
        ),
        ARecords: Schema.optional(
          Schema.Array(
            Schema.Struct({
              ipv4Address: Schema.optional(Schema.String),
            }),
          ),
        ),
        AAAARecords: Schema.optional(
          Schema.Array(
            Schema.Struct({
              ipv6Address: Schema.optional(Schema.String),
            }),
          ),
        ),
        MXRecords: Schema.optional(
          Schema.Array(
            Schema.Struct({
              preference: Schema.optional(Schema.Number),
              exchange: Schema.optional(Schema.String),
            }),
          ),
        ),
        NSRecords: Schema.optional(
          Schema.Array(
            Schema.Struct({
              nsdname: Schema.optional(Schema.String),
            }),
          ),
        ),
        PTRRecords: Schema.optional(
          Schema.Array(
            Schema.Struct({
              ptrdname: Schema.optional(Schema.String),
            }),
          ),
        ),
        SRVRecords: Schema.optional(
          Schema.Array(
            Schema.Struct({
              priority: Schema.optional(Schema.Number),
              weight: Schema.optional(Schema.Number),
              port: Schema.optional(Schema.Number),
              target: Schema.optional(Schema.String),
            }),
          ),
        ),
        TXTRecords: Schema.optional(
          Schema.Array(
            Schema.Struct({
              value: Schema.optional(Schema.Array(Schema.String)),
            }),
          ),
        ),
        CNAMERecord: Schema.optional(
          Schema.Struct({
            cname: Schema.optional(Schema.String),
          }),
        ),
        SOARecord: Schema.optional(
          Schema.Struct({
            host: Schema.optional(Schema.String),
            email: Schema.optional(Schema.String),
            serialNumber: Schema.optional(Schema.Number),
            refreshTime: Schema.optional(Schema.Number),
            retryTime: Schema.optional(Schema.Number),
            expireTime: Schema.optional(Schema.Number),
            minimumTTL: Schema.optional(Schema.Number),
          }),
        ),
        caaRecords: Schema.optional(
          Schema.Array(
            Schema.Struct({
              flags: Schema.optional(Schema.Number),
              tag: Schema.optional(Schema.String),
              value: Schema.optional(Schema.String),
            }),
          ),
        ),
      }),
    ),
  },
);
export type RecordSetsUpdateOutput = typeof RecordSetsUpdateOutput.Type;

// The operation
/**
 * Updates a record set within a DNS zone.
 *
 * @param resourceGroupName - The name of the resource group.
 * @param zoneName - The name of the DNS zone (without a terminating dot).
 * @param relativeRecordSetName - The name of the record set, relative to the name of the zone.
 * @param recordType - The type of DNS record in this record set.
 * @param If-Match - The etag of the record set. Omit this value to always overwrite the current record set. Specify the last-seen etag value to prevent accidentally overwriting concurrent changes.
 */
export const RecordSetsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RecordSetsUpdateInput,
  outputSchema: RecordSetsUpdateOutput,
}));
// Input Schema
export const ZonesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    zoneName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsZones/{zoneName}",
    }),
  );
export type ZonesCreateOrUpdateInput = typeof ZonesCreateOrUpdateInput.Type;

// Output Schema
export const ZonesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type ZonesCreateOrUpdateOutput = typeof ZonesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a DNS zone. Does not modify DNS records within the zone.
 *
 * @param resourceGroupName - The name of the resource group.
 * @param zoneName - The name of the DNS zone (without a terminating dot).
 * @param If-Match - The etag of the DNS zone. Omit this value to always overwrite the current zone. Specify the last-seen etag value to prevent accidentally overwriting any concurrent changes.
 * @param If-None-Match - Set to '*' to allow a new DNS zone to be created, but to prevent updating an existing zone. Other values will be ignored.
 */
export const ZonesCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ZonesCreateOrUpdateInput,
  outputSchema: ZonesCreateOrUpdateOutput,
}));
// Input Schema
export const ZonesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  zoneName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsZones/{zoneName}",
  }),
);
export type ZonesDeleteInput = typeof ZonesDeleteInput.Type;

// Output Schema
export const ZonesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ZonesDeleteOutput = typeof ZonesDeleteOutput.Type;

// The operation
/**
 * Deletes a DNS zone. WARNING: All DNS records in the zone will also be deleted. This operation cannot be undone.
 *
 * @param resourceGroupName - The name of the resource group.
 * @param zoneName - The name of the DNS zone (without a terminating dot).
 * @param If-Match - The etag of the DNS zone. Omit this value to always delete the current zone. Specify the last-seen etag value to prevent accidentally deleting any concurrent changes.
 */
export const ZonesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ZonesDeleteInput,
  outputSchema: ZonesDeleteOutput,
}));
// Input Schema
export const ZonesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  zoneName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsZones/{zoneName}",
  }),
);
export type ZonesGetInput = typeof ZonesGetInput.Type;

// Output Schema
export const ZonesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  location: Schema.String,
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
});
export type ZonesGetOutput = typeof ZonesGetOutput.Type;

// The operation
/**
 * Gets a DNS zone. Retrieves the zone properties, but not the record sets within the zone.
 *
 * @param resourceGroupName - The name of the resource group.
 * @param zoneName - The name of the DNS zone (without a terminating dot).
 */
export const ZonesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ZonesGetInput,
  outputSchema: ZonesGetOutput,
}));
// Input Schema
export const ZonesListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  $top: Schema.optional(Schema.Number),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.Network/dnszones",
  }),
);
export type ZonesListInput = typeof ZonesListInput.Type;

// Output Schema
export const ZonesListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        type: Schema.optional(Schema.String),
        location: Schema.String,
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      }),
    ),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type ZonesListOutput = typeof ZonesListOutput.Type;

// The operation
/**
 * Lists the DNS zones in all resource groups in a subscription.
 *
 * @param $top - The maximum number of DNS zones to return. If not specified, returns up to 100 zones.
 */
export const ZonesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ZonesListInput,
  outputSchema: ZonesListOutput,
}));
// Input Schema
export const ZonesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    $top: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsZones",
    }),
  );
export type ZonesListByResourceGroupInput =
  typeof ZonesListByResourceGroupInput.Type;

// Output Schema
export const ZonesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.String,
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ZonesListByResourceGroupOutput =
  typeof ZonesListByResourceGroupOutput.Type;

// The operation
/**
 * Lists the DNS zones within a resource group.
 *
 * @param resourceGroupName - The name of the resource group.
 * @param $top - The maximum number of record sets to return. If not specified, returns up to 100 record sets.
 */
export const ZonesListByResourceGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ZonesListByResourceGroupInput,
    outputSchema: ZonesListByResourceGroupOutput,
  }),
);
// Input Schema
export const ZonesUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  zoneName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsZones/{zoneName}",
  }),
);
export type ZonesUpdateInput = typeof ZonesUpdateInput.Type;

// Output Schema
export const ZonesUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  location: Schema.String,
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
});
export type ZonesUpdateOutput = typeof ZonesUpdateOutput.Type;

// The operation
/**
 * Updates a DNS zone. Does not modify DNS records within the zone.
 *
 * @param resourceGroupName - The name of the resource group.
 * @param zoneName - The name of the DNS zone (without a terminating dot).
 * @param If-Match - The etag of the DNS zone. Omit this value to always overwrite the current zone. Specify the last-seen etag value to prevent accidentally overwriting any concurrent changes.
 */
export const ZonesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ZonesUpdateInput,
  outputSchema: ZonesUpdateOutput,
}));
