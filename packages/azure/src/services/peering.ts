/**
 * Azure Peering API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const CheckServiceProviderAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Peering/checkServiceProviderAvailability",
    }),
  );
export type CheckServiceProviderAvailabilityInput =
  typeof CheckServiceProviderAvailabilityInput.Type;

// Output Schema
export const CheckServiceProviderAvailabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Literals(["Available", "Unavailable"]);
export type CheckServiceProviderAvailabilityOutput =
  typeof CheckServiceProviderAvailabilityOutput.Type;

// The operation
/**
 * Checks if the peering service provider is present within 1000 miles of customer's location
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const CheckServiceProviderAvailability =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CheckServiceProviderAvailabilityInput,
    outputSchema: CheckServiceProviderAvailabilityOutput,
  }));
// Input Schema
export const ConnectionMonitorTestsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    peeringServiceName: Schema.String.pipe(T.PathParam()),
    connectionMonitorTestName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Peering/peeringServices/{peeringServiceName}/connectionMonitorTests/{connectionMonitorTestName}",
    }),
  );
export type ConnectionMonitorTestsCreateOrUpdateInput =
  typeof ConnectionMonitorTestsCreateOrUpdateInput.Type;

// Output Schema
export const ConnectionMonitorTestsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ConnectionMonitorTestsCreateOrUpdateOutput =
  typeof ConnectionMonitorTestsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a connection monitor test with the specified name under the given subscription, resource group and peering service.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param peeringServiceName - The name of the peering.
 * @param connectionMonitorTestName - The name of the connection monitor test
 */
export const ConnectionMonitorTestsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConnectionMonitorTestsCreateOrUpdateInput,
    outputSchema: ConnectionMonitorTestsCreateOrUpdateOutput,
  }));
// Input Schema
export const ConnectionMonitorTestsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    peeringServiceName: Schema.String.pipe(T.PathParam()),
    connectionMonitorTestName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Peering/peeringServices/{peeringServiceName}/connectionMonitorTests/{connectionMonitorTestName}",
    }),
  );
export type ConnectionMonitorTestsDeleteInput =
  typeof ConnectionMonitorTestsDeleteInput.Type;

// Output Schema
export const ConnectionMonitorTestsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ConnectionMonitorTestsDeleteOutput =
  typeof ConnectionMonitorTestsDeleteOutput.Type;

// The operation
/**
 * Deletes an existing connection monitor test with the specified name under the given subscription, resource group and peering service.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param peeringServiceName - The name of the peering.
 * @param connectionMonitorTestName - The name of the connection monitor test
 */
export const ConnectionMonitorTestsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConnectionMonitorTestsDeleteInput,
    outputSchema: ConnectionMonitorTestsDeleteOutput,
  }));
// Input Schema
export const ConnectionMonitorTestsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    peeringServiceName: Schema.String.pipe(T.PathParam()),
    connectionMonitorTestName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Peering/peeringServices/{peeringServiceName}/connectionMonitorTests/{connectionMonitorTestName}",
    }),
  );
export type ConnectionMonitorTestsGetInput =
  typeof ConnectionMonitorTestsGetInput.Type;

// Output Schema
export const ConnectionMonitorTestsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ConnectionMonitorTestsGetOutput =
  typeof ConnectionMonitorTestsGetOutput.Type;

// The operation
/**
 * Gets an existing connection monitor test with the specified name under the given subscription, resource group and peering service.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param peeringServiceName - The name of the peering.
 * @param connectionMonitorTestName - The name of the connection monitor test
 */
export const ConnectionMonitorTestsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ConnectionMonitorTestsGetInput,
    outputSchema: ConnectionMonitorTestsGetOutput,
  }),
);
// Input Schema
export const ConnectionMonitorTestsListByPeeringServiceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    peeringServiceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Peering/peeringServices/{peeringServiceName}/connectionMonitorTests",
    }),
  );
export type ConnectionMonitorTestsListByPeeringServiceInput =
  typeof ConnectionMonitorTestsListByPeeringServiceInput.Type;

// Output Schema
export const ConnectionMonitorTestsListByPeeringServiceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type ConnectionMonitorTestsListByPeeringServiceOutput =
  typeof ConnectionMonitorTestsListByPeeringServiceOutput.Type;

// The operation
/**
 * Lists all connection monitor tests under the given subscription, resource group and peering service.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param peeringServiceName - The name of the peering.
 */
export const ConnectionMonitorTestsListByPeeringService =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConnectionMonitorTestsListByPeeringServiceInput,
    outputSchema: ConnectionMonitorTestsListByPeeringServiceOutput,
  }));
// Input Schema
export const LegacyPeeringsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    peeringLocation: Schema.String,
    kind: Schema.Literals(["Direct", "Exchange"]),
    asn: Schema.optional(Schema.Number),
    directPeeringType: Schema.optional(
      Schema.Literals([
        "Edge",
        "Transit",
        "Cdn",
        "Internal",
        "Ix",
        "IxRs",
        "Voice",
        "EdgeZoneForOperators",
        "PeerProp",
      ]),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Peering/legacyPeerings",
    }),
  );
export type LegacyPeeringsListInput = typeof LegacyPeeringsListInput.Type;

// Output Schema
export const LegacyPeeringsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type LegacyPeeringsListOutput = typeof LegacyPeeringsListOutput.Type;

// The operation
/**
 * Lists all of the legacy peerings under the given subscription matching the specified kind and location.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param peeringLocation - The location of the peering.
 * @param kind - The kind of the peering.
 * @param asn - The ASN number associated with a legacy peering.
 * @param directPeeringType - The direct peering type.
 */
export const LegacyPeeringsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: LegacyPeeringsListInput,
  outputSchema: LegacyPeeringsListOutput,
}));
// Input Schema
export const LookingGlassInvokeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    command: Schema.Literals(["Traceroute", "Ping", "BgpRoute"]),
    sourceType: Schema.Literals(["EdgeSite", "AzureRegion"]),
    sourceLocation: Schema.String,
    destinationIP: Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Peering/lookingGlass",
    }),
  );
export type LookingGlassInvokeInput = typeof LookingGlassInvokeInput.Type;

// Output Schema
export const LookingGlassInvokeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    command: Schema.optional(
      Schema.Literals(["Traceroute", "Ping", "BgpRoute"]),
    ),
    output: Schema.optional(Schema.String),
  });
export type LookingGlassInvokeOutput = typeof LookingGlassInvokeOutput.Type;

// The operation
/**
 * Run looking glass functionality
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param command - The command to be executed: ping, traceroute, bgpRoute.
 * @param sourceType - The type of the source: Edge site or Azure Region.
 * @param sourceLocation - The location of the source.
 * @param destinationIP - The IP address of the destination.
 */
export const LookingGlassInvoke = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: LookingGlassInvokeInput,
  outputSchema: LookingGlassInvokeOutput,
}));
// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  "api-version": Schema.String,
}).pipe(
  T.Http({ method: "GET", path: "/providers/Microsoft.Peering/operations" }),
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
        isDataAction: Schema.optional(Schema.Boolean),
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
                      supportedTimeGrainTypes: Schema.optional(
                        Schema.Array(Schema.String),
                      ),
                      dimensions: Schema.optional(
                        Schema.Array(
                          Schema.Struct({
                            name: Schema.optional(Schema.String),
                            displayName: Schema.optional(Schema.String),
                          }),
                        ),
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
 * List the operations for the provider
 *
 * @param api-version - The API version to use for this operation.
 */
export const OperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationsListInput,
  outputSchema: OperationsListOutput,
}));
// Input Schema
export const PeerAsnsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    peerAsnName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Peering/peerAsns/{peerAsnName}",
    }),
  );
export type PeerAsnsCreateOrUpdateInput =
  typeof PeerAsnsCreateOrUpdateInput.Type;

// Output Schema
export const PeerAsnsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PeerAsnsCreateOrUpdateOutput =
  typeof PeerAsnsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates a new peer ASN or updates an existing peer ASN with the specified name under the given subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param peerAsnName - The peer ASN name.
 */
export const PeerAsnsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PeerAsnsCreateOrUpdateInput,
    outputSchema: PeerAsnsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const PeerAsnsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  peerAsnName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.Peering/peerAsns/{peerAsnName}",
  }),
);
export type PeerAsnsDeleteInput = typeof PeerAsnsDeleteInput.Type;

// Output Schema
export const PeerAsnsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PeerAsnsDeleteOutput = typeof PeerAsnsDeleteOutput.Type;

// The operation
/**
 * Deletes an existing peer ASN with the specified name under the given subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param peerAsnName - The peer ASN name.
 */
export const PeerAsnsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PeerAsnsDeleteInput,
  outputSchema: PeerAsnsDeleteOutput,
}));
// Input Schema
export const PeerAsnsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  peerAsnName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.Peering/peerAsns/{peerAsnName}",
  }),
);
export type PeerAsnsGetInput = typeof PeerAsnsGetInput.Type;

// Output Schema
export const PeerAsnsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PeerAsnsGetOutput = typeof PeerAsnsGetOutput.Type;

// The operation
/**
 * Gets the peer ASN with the specified name under the given subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param peerAsnName - The peer ASN name.
 */
export const PeerAsnsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PeerAsnsGetInput,
  outputSchema: PeerAsnsGetOutput,
}));
// Input Schema
export const PeerAsnsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Peering/peerAsns",
    }),
  );
export type PeerAsnsListBySubscriptionInput =
  typeof PeerAsnsListBySubscriptionInput.Type;

// Output Schema
export const PeerAsnsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type PeerAsnsListBySubscriptionOutput =
  typeof PeerAsnsListBySubscriptionOutput.Type;

// The operation
/**
 * Lists all of the peer ASNs under the given subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const PeerAsnsListBySubscription = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PeerAsnsListBySubscriptionInput,
    outputSchema: PeerAsnsListBySubscriptionOutput,
  }),
);
// Input Schema
export const PeeringsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    peeringName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Peering/peerings/{peeringName}",
    }),
  );
export type PeeringsCreateOrUpdateInput =
  typeof PeeringsCreateOrUpdateInput.Type;

// Output Schema
export const PeeringsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type PeeringsCreateOrUpdateOutput =
  typeof PeeringsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates a new peering or updates an existing peering with the specified name under the given subscription and resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param peeringName - The name of the peering.
 */
export const PeeringsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PeeringsCreateOrUpdateInput,
    outputSchema: PeeringsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const PeeringsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  peeringName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Peering/peerings/{peeringName}",
  }),
);
export type PeeringsDeleteInput = typeof PeeringsDeleteInput.Type;

// Output Schema
export const PeeringsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PeeringsDeleteOutput = typeof PeeringsDeleteOutput.Type;

// The operation
/**
 * Deletes an existing peering with the specified name under the given subscription and resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param peeringName - The name of the peering.
 */
export const PeeringsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PeeringsDeleteInput,
  outputSchema: PeeringsDeleteOutput,
}));
// Input Schema
export const PeeringServicesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    peeringServiceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Peering/peeringServices/{peeringServiceName}",
    }),
  );
export type PeeringServicesCreateOrUpdateInput =
  typeof PeeringServicesCreateOrUpdateInput.Type;

// Output Schema
export const PeeringServicesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type PeeringServicesCreateOrUpdateOutput =
  typeof PeeringServicesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates a new peering service or updates an existing peering with the specified name under the given subscription and resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param peeringServiceName - The name of the peering.
 */
export const PeeringServicesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PeeringServicesCreateOrUpdateInput,
    outputSchema: PeeringServicesCreateOrUpdateOutput,
  }));
// Input Schema
export const PeeringServicesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    peeringServiceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Peering/peeringServices/{peeringServiceName}",
    }),
  );
export type PeeringServicesDeleteInput = typeof PeeringServicesDeleteInput.Type;

// Output Schema
export const PeeringServicesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PeeringServicesDeleteOutput =
  typeof PeeringServicesDeleteOutput.Type;

// The operation
/**
 * Deletes an existing peering service with the specified name under the given subscription and resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param peeringServiceName - The name of the peering.
 */
export const PeeringServicesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PeeringServicesDeleteInput,
    outputSchema: PeeringServicesDeleteOutput,
  }),
);
// Input Schema
export const PeeringServicesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    peeringServiceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Peering/peeringServices/{peeringServiceName}",
    }),
  );
export type PeeringServicesGetInput = typeof PeeringServicesGetInput.Type;

// Output Schema
export const PeeringServicesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type PeeringServicesGetOutput = typeof PeeringServicesGetOutput.Type;

// The operation
/**
 * Gets an existing peering service with the specified name under the given subscription and resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param peeringServiceName - The name of the peering.
 */
export const PeeringServicesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PeeringServicesGetInput,
  outputSchema: PeeringServicesGetOutput,
}));
// Input Schema
export const PeeringServicesInitializeConnectionMonitorInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Peering/initializeConnectionMonitor",
    }),
  );
export type PeeringServicesInitializeConnectionMonitorInput =
  typeof PeeringServicesInitializeConnectionMonitorInput.Type;

// Output Schema
export const PeeringServicesInitializeConnectionMonitorOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PeeringServicesInitializeConnectionMonitorOutput =
  typeof PeeringServicesInitializeConnectionMonitorOutput.Type;

// The operation
/**
 * Initialize Peering Service for Connection Monitor functionality
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const PeeringServicesInitializeConnectionMonitor =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PeeringServicesInitializeConnectionMonitorInput,
    outputSchema: PeeringServicesInitializeConnectionMonitorOutput,
  }));
// Input Schema
export const PeeringServicesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Peering/peeringServices",
    }),
  );
export type PeeringServicesListByResourceGroupInput =
  typeof PeeringServicesListByResourceGroupInput.Type;

// Output Schema
export const PeeringServicesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type PeeringServicesListByResourceGroupOutput =
  typeof PeeringServicesListByResourceGroupOutput.Type;

// The operation
/**
 * Lists all of the peering services under the given subscription and resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const PeeringServicesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PeeringServicesListByResourceGroupInput,
    outputSchema: PeeringServicesListByResourceGroupOutput,
  }));
// Input Schema
export const PeeringServicesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Peering/peeringServices",
    }),
  );
export type PeeringServicesListBySubscriptionInput =
  typeof PeeringServicesListBySubscriptionInput.Type;

// Output Schema
export const PeeringServicesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type PeeringServicesListBySubscriptionOutput =
  typeof PeeringServicesListBySubscriptionOutput.Type;

// The operation
/**
 * Lists all of the peerings under the given subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const PeeringServicesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PeeringServicesListBySubscriptionInput,
    outputSchema: PeeringServicesListBySubscriptionOutput,
  }));
// Input Schema
export const PeeringServicesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    peeringServiceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Peering/peeringServices/{peeringServiceName}",
    }),
  );
export type PeeringServicesUpdateInput = typeof PeeringServicesUpdateInput.Type;

// Output Schema
export const PeeringServicesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type PeeringServicesUpdateOutput =
  typeof PeeringServicesUpdateOutput.Type;

// The operation
/**
 * Updates tags for a peering service with the specified name under the given subscription and resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param peeringServiceName - The name of the peering.
 */
export const PeeringServicesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PeeringServicesUpdateInput,
    outputSchema: PeeringServicesUpdateOutput,
  }),
);
// Input Schema
export const PeeringsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  peeringName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Peering/peerings/{peeringName}",
  }),
);
export type PeeringsGetInput = typeof PeeringsGetInput.Type;

// Output Schema
export const PeeringsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type PeeringsGetOutput = typeof PeeringsGetOutput.Type;

// The operation
/**
 * Gets an existing peering with the specified name under the given subscription and resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param peeringName - The name of the peering.
 */
export const PeeringsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PeeringsGetInput,
  outputSchema: PeeringsGetOutput,
}));
// Input Schema
export const PeeringsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Peering/peerings",
    }),
  );
export type PeeringsListByResourceGroupInput =
  typeof PeeringsListByResourceGroupInput.Type;

// Output Schema
export const PeeringsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type PeeringsListByResourceGroupOutput =
  typeof PeeringsListByResourceGroupOutput.Type;

// The operation
/**
 * Lists all of the peerings under the given subscription and resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const PeeringsListByResourceGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PeeringsListByResourceGroupInput,
    outputSchema: PeeringsListByResourceGroupOutput,
  }),
);
// Input Schema
export const PeeringsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Peering/peerings",
    }),
  );
export type PeeringsListBySubscriptionInput =
  typeof PeeringsListBySubscriptionInput.Type;

// Output Schema
export const PeeringsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type PeeringsListBySubscriptionOutput =
  typeof PeeringsListBySubscriptionOutput.Type;

// The operation
/**
 * Lists all of the peerings under the given subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const PeeringsListBySubscription = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PeeringsListBySubscriptionInput,
    outputSchema: PeeringsListBySubscriptionOutput,
  }),
);
// Input Schema
export const PeeringsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  peeringName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Peering/peerings/{peeringName}",
  }),
);
export type PeeringsUpdateInput = typeof PeeringsUpdateInput.Type;

// Output Schema
export const PeeringsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type PeeringsUpdateOutput = typeof PeeringsUpdateOutput.Type;

// The operation
/**
 * Updates tags for a peering with the specified name under the given subscription and resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param peeringName - The name of the peering.
 */
export const PeeringsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PeeringsUpdateInput,
  outputSchema: PeeringsUpdateOutput,
}));
// Input Schema
export const PrefixesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    peeringServiceName: Schema.String.pipe(T.PathParam()),
    prefixName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Peering/peeringServices/{peeringServiceName}/prefixes/{prefixName}",
    }),
  );
export type PrefixesCreateOrUpdateInput =
  typeof PrefixesCreateOrUpdateInput.Type;

// Output Schema
export const PrefixesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PrefixesCreateOrUpdateOutput =
  typeof PrefixesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates a new prefix with the specified name under the given subscription, resource group and peering service.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param peeringServiceName - The name of the peering.
 * @param prefixName - The name of the prefix.
 */
export const PrefixesCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PrefixesCreateOrUpdateInput,
    outputSchema: PrefixesCreateOrUpdateOutput,
  }),
);
// Input Schema
export const PrefixesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  peeringServiceName: Schema.String.pipe(T.PathParam()),
  prefixName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Peering/peeringServices/{peeringServiceName}/prefixes/{prefixName}",
  }),
);
export type PrefixesDeleteInput = typeof PrefixesDeleteInput.Type;

// Output Schema
export const PrefixesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PrefixesDeleteOutput = typeof PrefixesDeleteOutput.Type;

// The operation
/**
 * Deletes an existing prefix with the specified name under the given subscription, resource group and peering service.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param peeringServiceName - The name of the peering.
 * @param prefixName - The name of the prefix.
 */
export const PrefixesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PrefixesDeleteInput,
  outputSchema: PrefixesDeleteOutput,
}));
// Input Schema
export const PrefixesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  peeringServiceName: Schema.String.pipe(T.PathParam()),
  prefixName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
  $expand: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Peering/peeringServices/{peeringServiceName}/prefixes/{prefixName}",
  }),
);
export type PrefixesGetInput = typeof PrefixesGetInput.Type;

// Output Schema
export const PrefixesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PrefixesGetOutput = typeof PrefixesGetOutput.Type;

// The operation
/**
 * Gets an existing prefix with the specified name under the given subscription, resource group and peering service.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param peeringServiceName - The name of the peering.
 * @param prefixName - The name of the prefix.
 * @param $expand - The properties to be expanded.
 */
export const PrefixesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PrefixesGetInput,
  outputSchema: PrefixesGetOutput,
}));
// Input Schema
export const PrefixesListByPeeringServiceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    peeringServiceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Peering/peeringServices/{peeringServiceName}/prefixes",
    }),
  );
export type PrefixesListByPeeringServiceInput =
  typeof PrefixesListByPeeringServiceInput.Type;

// Output Schema
export const PrefixesListByPeeringServiceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type PrefixesListByPeeringServiceOutput =
  typeof PrefixesListByPeeringServiceOutput.Type;

// The operation
/**
 * Lists all prefixes under the given subscription, resource group and peering service.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param peeringServiceName - The name of the peering.
 * @param $expand - The properties to be expanded.
 */
export const PrefixesListByPeeringService =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrefixesListByPeeringServiceInput,
    outputSchema: PrefixesListByPeeringServiceOutput,
  }));
// Input Schema
export const ReceivedRoutesListByPeeringInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    peeringName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    prefix: Schema.optional(Schema.String),
    asPath: Schema.optional(Schema.String),
    originAsValidationState: Schema.optional(Schema.String),
    rpkiValidationState: Schema.optional(Schema.String),
    $skipToken: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Peering/peerings/{peeringName}/receivedRoutes",
    }),
  );
export type ReceivedRoutesListByPeeringInput =
  typeof ReceivedRoutesListByPeeringInput.Type;

// Output Schema
export const ReceivedRoutesListByPeeringOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        prefix: Schema.optional(Schema.String),
        nextHop: Schema.optional(Schema.String),
        asPath: Schema.optional(Schema.String),
        originAsValidationState: Schema.optional(Schema.String),
        rpkiValidationState: Schema.optional(Schema.String),
        trustAnchor: Schema.optional(Schema.String),
        receivedTimestamp: Schema.optional(Schema.String),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ReceivedRoutesListByPeeringOutput =
  typeof ReceivedRoutesListByPeeringOutput.Type;

// The operation
/**
 * Lists the prefixes received over the specified peering under the given subscription and resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param peeringName - The name of the peering.
 * @param prefix - The optional prefix that can be used to filter the routes.
 * @param asPath - The optional AS path that can be used to filter the routes.
 * @param originAsValidationState - The optional origin AS validation state that can be used to filter the routes.
 * @param rpkiValidationState - The optional RPKI validation state that can be used to filter the routes.
 * @param $skipToken - The optional page continuation token that is used in the event of paginated result.
 */
export const ReceivedRoutesListByPeering = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ReceivedRoutesListByPeeringInput,
    outputSchema: ReceivedRoutesListByPeeringOutput,
  }),
);
// Input Schema
export const RegisteredAsnsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    peeringName: Schema.String.pipe(T.PathParam()),
    registeredAsnName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Peering/peerings/{peeringName}/registeredAsns/{registeredAsnName}",
    }),
  );
export type RegisteredAsnsCreateOrUpdateInput =
  typeof RegisteredAsnsCreateOrUpdateInput.Type;

// Output Schema
export const RegisteredAsnsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type RegisteredAsnsCreateOrUpdateOutput =
  typeof RegisteredAsnsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates a new registered ASN with the specified name under the given subscription, resource group and peering.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param peeringName - The name of the peering.
 * @param registeredAsnName - The name of the registered ASN.
 */
export const RegisteredAsnsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RegisteredAsnsCreateOrUpdateInput,
    outputSchema: RegisteredAsnsCreateOrUpdateOutput,
  }));
// Input Schema
export const RegisteredAsnsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    peeringName: Schema.String.pipe(T.PathParam()),
    registeredAsnName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Peering/peerings/{peeringName}/registeredAsns/{registeredAsnName}",
    }),
  );
export type RegisteredAsnsDeleteInput = typeof RegisteredAsnsDeleteInput.Type;

// Output Schema
export const RegisteredAsnsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type RegisteredAsnsDeleteOutput = typeof RegisteredAsnsDeleteOutput.Type;

// The operation
/**
 * Deletes an existing registered ASN with the specified name under the given subscription, resource group and peering.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param peeringName - The name of the peering.
 * @param registeredAsnName - The name of the registered ASN.
 */
export const RegisteredAsnsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RegisteredAsnsDeleteInput,
    outputSchema: RegisteredAsnsDeleteOutput,
  }),
);
// Input Schema
export const RegisteredAsnsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    peeringName: Schema.String.pipe(T.PathParam()),
    registeredAsnName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Peering/peerings/{peeringName}/registeredAsns/{registeredAsnName}",
  }),
);
export type RegisteredAsnsGetInput = typeof RegisteredAsnsGetInput.Type;

// Output Schema
export const RegisteredAsnsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type RegisteredAsnsGetOutput = typeof RegisteredAsnsGetOutput.Type;

// The operation
/**
 * Gets an existing registered ASN with the specified name under the given subscription, resource group and peering.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param peeringName - The name of the peering.
 * @param registeredAsnName - The name of the registered ASN.
 */
export const RegisteredAsnsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RegisteredAsnsGetInput,
  outputSchema: RegisteredAsnsGetOutput,
}));
// Input Schema
export const RegisteredAsnsListByPeeringInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    peeringName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Peering/peerings/{peeringName}/registeredAsns",
    }),
  );
export type RegisteredAsnsListByPeeringInput =
  typeof RegisteredAsnsListByPeeringInput.Type;

// Output Schema
export const RegisteredAsnsListByPeeringOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type RegisteredAsnsListByPeeringOutput =
  typeof RegisteredAsnsListByPeeringOutput.Type;

// The operation
/**
 * Lists all registered ASNs under the given subscription, resource group and peering.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param peeringName - The name of the peering.
 */
export const RegisteredAsnsListByPeering = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RegisteredAsnsListByPeeringInput,
    outputSchema: RegisteredAsnsListByPeeringOutput,
  }),
);
// Input Schema
export const RegisteredPrefixesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    peeringName: Schema.String.pipe(T.PathParam()),
    registeredPrefixName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Peering/peerings/{peeringName}/registeredPrefixes/{registeredPrefixName}",
    }),
  );
export type RegisteredPrefixesCreateOrUpdateInput =
  typeof RegisteredPrefixesCreateOrUpdateInput.Type;

// Output Schema
export const RegisteredPrefixesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type RegisteredPrefixesCreateOrUpdateOutput =
  typeof RegisteredPrefixesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates a new registered prefix with the specified name under the given subscription, resource group and peering.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param peeringName - The name of the peering.
 * @param registeredPrefixName - The name of the registered prefix.
 */
export const RegisteredPrefixesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RegisteredPrefixesCreateOrUpdateInput,
    outputSchema: RegisteredPrefixesCreateOrUpdateOutput,
  }));
// Input Schema
export const RegisteredPrefixesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    peeringName: Schema.String.pipe(T.PathParam()),
    registeredPrefixName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Peering/peerings/{peeringName}/registeredPrefixes/{registeredPrefixName}",
    }),
  );
export type RegisteredPrefixesDeleteInput =
  typeof RegisteredPrefixesDeleteInput.Type;

// Output Schema
export const RegisteredPrefixesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type RegisteredPrefixesDeleteOutput =
  typeof RegisteredPrefixesDeleteOutput.Type;

// The operation
/**
 * Deletes an existing registered prefix with the specified name under the given subscription, resource group and peering.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param peeringName - The name of the peering.
 * @param registeredPrefixName - The name of the registered prefix.
 */
export const RegisteredPrefixesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RegisteredPrefixesDeleteInput,
    outputSchema: RegisteredPrefixesDeleteOutput,
  }),
);
// Input Schema
export const RegisteredPrefixesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    peeringName: Schema.String.pipe(T.PathParam()),
    registeredPrefixName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Peering/peerings/{peeringName}/registeredPrefixes/{registeredPrefixName}",
    }),
  );
export type RegisteredPrefixesGetInput = typeof RegisteredPrefixesGetInput.Type;

// Output Schema
export const RegisteredPrefixesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type RegisteredPrefixesGetOutput =
  typeof RegisteredPrefixesGetOutput.Type;

// The operation
/**
 * Gets an existing registered prefix with the specified name under the given subscription, resource group and peering.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param peeringName - The name of the peering.
 * @param registeredPrefixName - The name of the registered prefix.
 */
export const RegisteredPrefixesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RegisteredPrefixesGetInput,
    outputSchema: RegisteredPrefixesGetOutput,
  }),
);
// Input Schema
export const RegisteredPrefixesListByPeeringInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    peeringName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Peering/peerings/{peeringName}/registeredPrefixes",
    }),
  );
export type RegisteredPrefixesListByPeeringInput =
  typeof RegisteredPrefixesListByPeeringInput.Type;

// Output Schema
export const RegisteredPrefixesListByPeeringOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type RegisteredPrefixesListByPeeringOutput =
  typeof RegisteredPrefixesListByPeeringOutput.Type;

// The operation
/**
 * Lists all registered prefixes under the given subscription, resource group and peering.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param peeringName - The name of the peering.
 */
export const RegisteredPrefixesListByPeering =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RegisteredPrefixesListByPeeringInput,
    outputSchema: RegisteredPrefixesListByPeeringOutput,
  }));
// Input Schema
export const RegisteredPrefixesValidateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    peeringName: Schema.String.pipe(T.PathParam()),
    registeredPrefixName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Peering/peerings/{peeringName}/registeredPrefixes/{registeredPrefixName}/validate",
    }),
  );
export type RegisteredPrefixesValidateInput =
  typeof RegisteredPrefixesValidateInput.Type;

// Output Schema
export const RegisteredPrefixesValidateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type RegisteredPrefixesValidateOutput =
  typeof RegisteredPrefixesValidateOutput.Type;

// The operation
/**
 * Validates an existing registered prefix with the specified name under the given subscription, resource group and peering.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param peeringName - The name of the peering.
 * @param registeredPrefixName - The name of the registered prefix.
 */
export const RegisteredPrefixesValidate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RegisteredPrefixesValidateInput,
    outputSchema: RegisteredPrefixesValidateOutput,
  }),
);
// Input Schema
export const RpUnbilledPrefixesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    peeringName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    consolidate: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Peering/peerings/{peeringName}/rpUnbilledPrefixes",
    }),
  );
export type RpUnbilledPrefixesListInput =
  typeof RpUnbilledPrefixesListInput.Type;

// Output Schema
export const RpUnbilledPrefixesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        prefix: Schema.optional(Schema.String),
        azureRegion: Schema.optional(Schema.String),
        peerAsn: Schema.optional(Schema.Number),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type RpUnbilledPrefixesListOutput =
  typeof RpUnbilledPrefixesListOutput.Type;

// The operation
/**
 * Lists all of the RP unbilled prefixes for the specified peering
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param peeringName - The name of the peering.
 * @param consolidate - Flag to enable consolidation prefixes
 */
export const RpUnbilledPrefixesList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RpUnbilledPrefixesListInput,
    outputSchema: RpUnbilledPrefixesListOutput,
  }),
);
