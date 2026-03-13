/**
 * Azure Deviceupdate API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const AccountsCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceUpdate/accounts/{accountName}",
  }),
);
export type AccountsCreateInput = typeof AccountsCreateInput.Type;

// Output Schema
export const AccountsCreateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type AccountsCreateOutput = typeof AccountsCreateOutput.Type;

// The operation
/**
 * Creates or updates Account.
 */
export const AccountsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AccountsCreateInput,
  outputSchema: AccountsCreateOutput,
}));
// Input Schema
export const AccountsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceUpdate/accounts/{accountName}",
  }),
);
export type AccountsDeleteInput = typeof AccountsDeleteInput.Type;

// Output Schema
export const AccountsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AccountsDeleteOutput = typeof AccountsDeleteOutput.Type;

// The operation
/**
 * Deletes account.
 */
export const AccountsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AccountsDeleteInput,
  outputSchema: AccountsDeleteOutput,
}));
// Input Schema
export const AccountsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceUpdate/accounts/{accountName}",
  }),
);
export type AccountsGetInput = typeof AccountsGetInput.Type;

// Output Schema
export const AccountsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type AccountsGetOutput = typeof AccountsGetOutput.Type;

// The operation
/**
 * Returns account details for the given account name.
 */
export const AccountsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AccountsGetInput,
  outputSchema: AccountsGetOutput,
}));
// Input Schema
export const AccountsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceUpdate/accounts",
    }),
  );
export type AccountsListByResourceGroupInput =
  typeof AccountsListByResourceGroupInput.Type;

// Output Schema
export const AccountsListByResourceGroupOutput =
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
export type AccountsListByResourceGroupOutput =
  typeof AccountsListByResourceGroupOutput.Type;

// The operation
/**
 * Returns list of Accounts.
 */
export const AccountsListByResourceGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AccountsListByResourceGroupInput,
    outputSchema: AccountsListByResourceGroupOutput,
  }),
);
// Input Schema
export const AccountsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DeviceUpdate/accounts",
    }),
  );
export type AccountsListBySubscriptionInput =
  typeof AccountsListBySubscriptionInput.Type;

// Output Schema
export const AccountsListBySubscriptionOutput =
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
export type AccountsListBySubscriptionOutput =
  typeof AccountsListBySubscriptionOutput.Type;

// The operation
/**
 * Returns list of Accounts.
 */
export const AccountsListBySubscription = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AccountsListBySubscriptionInput,
    outputSchema: AccountsListBySubscriptionOutput,
  }),
);
// Input Schema
export const AccountsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceUpdate/accounts/{accountName}",
  }),
);
export type AccountsUpdateInput = typeof AccountsUpdateInput.Type;

// Output Schema
export const AccountsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type AccountsUpdateOutput = typeof AccountsUpdateOutput.Type;

// The operation
/**
 * Updates account's patchable properties
 */
export const AccountsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AccountsUpdateInput,
  outputSchema: AccountsUpdateOutput,
}));
// Input Schema
export const CheckNameAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DeviceUpdate/checknameavailability",
    }),
  );
export type CheckNameAvailabilityInput = typeof CheckNameAvailabilityInput.Type;

// Output Schema
export const CheckNameAvailabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nameAvailable: Schema.optional(Schema.Boolean),
    reason: Schema.optional(Schema.Literals(["Invalid", "AlreadyExists"])),
    message: Schema.optional(Schema.String),
  });
export type CheckNameAvailabilityOutput =
  typeof CheckNameAvailabilityOutput.Type;

// The operation
/**
 * Checks ADU resource name availability.
 * @param name - The name of the resource for which availability needs to be checked.
 * @param type - The resource type.
 */
export const CheckNameAvailability = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CheckNameAvailabilityInput,
    outputSchema: CheckNameAvailabilityOutput,
  }),
);
// Input Schema
export const InstancesCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceUpdate/accounts/{accountName}/instances/{instanceName}",
  }),
);
export type InstancesCreateInput = typeof InstancesCreateInput.Type;

// Output Schema
export const InstancesCreateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type InstancesCreateOutput = typeof InstancesCreateOutput.Type;

// The operation
/**
 * Creates or updates instance.
 */
export const InstancesCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: InstancesCreateInput,
  outputSchema: InstancesCreateOutput,
}));
// Input Schema
export const InstancesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceUpdate/accounts/{accountName}/instances/{instanceName}",
  }),
);
export type InstancesDeleteInput = typeof InstancesDeleteInput.Type;

// Output Schema
export const InstancesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type InstancesDeleteOutput = typeof InstancesDeleteOutput.Type;

// The operation
/**
 * Deletes instance.
 */
export const InstancesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: InstancesDeleteInput,
  outputSchema: InstancesDeleteOutput,
}));
// Input Schema
export const InstancesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceUpdate/accounts/{accountName}/instances/{instanceName}",
  }),
);
export type InstancesGetInput = typeof InstancesGetInput.Type;

// Output Schema
export const InstancesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type InstancesGetOutput = typeof InstancesGetOutput.Type;

// The operation
/**
 * Returns instance details for the given instance and account name.
 */
export const InstancesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: InstancesGetInput,
  outputSchema: InstancesGetOutput,
}));
// Input Schema
export const InstancesListByAccountInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceUpdate/accounts/{accountName}/instances",
    }),
  );
export type InstancesListByAccountInput =
  typeof InstancesListByAccountInput.Type;

// Output Schema
export const InstancesListByAccountOutput =
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
export type InstancesListByAccountOutput =
  typeof InstancesListByAccountOutput.Type;

// The operation
/**
 * Returns instances for the given account name.
 */
export const InstancesListByAccount = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: InstancesListByAccountInput,
    outputSchema: InstancesListByAccountOutput,
  }),
);
// Input Schema
export const InstancesUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceUpdate/accounts/{accountName}/instances/{instanceName}",
  }),
);
export type InstancesUpdateInput = typeof InstancesUpdateInput.Type;

// Output Schema
export const InstancesUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type InstancesUpdateOutput = typeof InstancesUpdateOutput.Type;

// The operation
/**
 * Updates instance's tags.
 */
export const InstancesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: InstancesUpdateInput,
  outputSchema: InstancesUpdateOutput,
}));
// Input Schema
export const PrivateEndpointConnectionProxiesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceUpdate/accounts/{accountName}/privateEndpointConnectionProxies/{privateEndpointConnectionProxyId}",
    }),
  );
export type PrivateEndpointConnectionProxiesCreateOrUpdateInput =
  typeof PrivateEndpointConnectionProxiesCreateOrUpdateInput.Type;

// Output Schema
export const PrivateEndpointConnectionProxiesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    eTag: Schema.optional(Schema.String),
    remotePrivateEndpoint: Schema.optional(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        location: Schema.optional(Schema.String),
        immutableSubscriptionId: Schema.optional(Schema.String),
        immutableResourceId: Schema.optional(Schema.String),
        vnetTrafficTag: Schema.optional(Schema.String),
        manualPrivateLinkServiceConnections: Schema.optional(
          Schema.Array(
            Schema.Struct({
              name: Schema.optional(Schema.String),
              groupIds: Schema.optional(Schema.Array(Schema.String)),
              requestMessage: Schema.optional(Schema.String),
            }),
          ),
        ),
        privateLinkServiceConnections: Schema.optional(
          Schema.Array(
            Schema.Struct({
              name: Schema.optional(Schema.String),
              groupIds: Schema.optional(Schema.Array(Schema.String)),
              requestMessage: Schema.optional(Schema.String),
            }),
          ),
        ),
        privateLinkServiceProxies: Schema.optional(
          Schema.Array(
            Schema.Struct({
              id: Schema.optional(Schema.String),
              remotePrivateLinkServiceConnectionState: Schema.optional(
                Schema.Struct({
                  status: Schema.optional(
                    Schema.Literals(["Pending", "Approved", "Rejected"]),
                  ),
                  description: Schema.optional(Schema.String),
                  actionsRequired: Schema.optional(Schema.String),
                }),
              ),
              remotePrivateEndpointConnection: Schema.optional(
                Schema.Struct({
                  id: Schema.optional(Schema.String),
                }),
              ),
              groupConnectivityInformation: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    groupId: Schema.optional(Schema.String),
                    memberName: Schema.optional(Schema.String),
                    customerVisibleFqdns: Schema.optional(
                      Schema.Array(Schema.String),
                    ),
                    internalFqdn: Schema.optional(Schema.String),
                    redirectMapId: Schema.optional(Schema.String),
                    privateLinkServiceArmRegion: Schema.optional(Schema.String),
                  }),
                ),
              ),
            }),
          ),
        ),
        connectionDetails: Schema.optional(
          Schema.Array(
            Schema.Struct({
              id: Schema.optional(Schema.String),
              privateIpAddress: Schema.optional(Schema.String),
              linkIdentifier: Schema.optional(Schema.String),
              groupId: Schema.optional(Schema.String),
              memberName: Schema.optional(Schema.String),
            }),
          ),
        ),
      }),
    ),
    status: Schema.optional(Schema.String),
  });
export type PrivateEndpointConnectionProxiesCreateOrUpdateOutput =
  typeof PrivateEndpointConnectionProxiesCreateOrUpdateOutput.Type;

// The operation
/**
 * (INTERNAL - DO NOT USE) Creates or updates the specified private endpoint connection proxy resource associated with the device update account.
 */
export const PrivateEndpointConnectionProxiesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionProxiesCreateOrUpdateInput,
    outputSchema: PrivateEndpointConnectionProxiesCreateOrUpdateOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionProxiesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceUpdate/accounts/{accountName}/privateEndpointConnectionProxies/{privateEndpointConnectionProxyId}",
    }),
  );
export type PrivateEndpointConnectionProxiesDeleteInput =
  typeof PrivateEndpointConnectionProxiesDeleteInput.Type;

// Output Schema
export const PrivateEndpointConnectionProxiesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PrivateEndpointConnectionProxiesDeleteOutput =
  typeof PrivateEndpointConnectionProxiesDeleteOutput.Type;

// The operation
/**
 * (INTERNAL - DO NOT USE) Deletes the specified private endpoint connection proxy associated with the device update account.
 */
export const PrivateEndpointConnectionProxiesDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionProxiesDeleteInput,
    outputSchema: PrivateEndpointConnectionProxiesDeleteOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionProxiesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceUpdate/accounts/{accountName}/privateEndpointConnectionProxies/{privateEndpointConnectionProxyId}",
    }),
  );
export type PrivateEndpointConnectionProxiesGetInput =
  typeof PrivateEndpointConnectionProxiesGetInput.Type;

// Output Schema
export const PrivateEndpointConnectionProxiesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    eTag: Schema.optional(Schema.String),
    remotePrivateEndpoint: Schema.optional(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        location: Schema.optional(Schema.String),
        immutableSubscriptionId: Schema.optional(Schema.String),
        immutableResourceId: Schema.optional(Schema.String),
        vnetTrafficTag: Schema.optional(Schema.String),
        manualPrivateLinkServiceConnections: Schema.optional(
          Schema.Array(
            Schema.Struct({
              name: Schema.optional(Schema.String),
              groupIds: Schema.optional(Schema.Array(Schema.String)),
              requestMessage: Schema.optional(Schema.String),
            }),
          ),
        ),
        privateLinkServiceConnections: Schema.optional(
          Schema.Array(
            Schema.Struct({
              name: Schema.optional(Schema.String),
              groupIds: Schema.optional(Schema.Array(Schema.String)),
              requestMessage: Schema.optional(Schema.String),
            }),
          ),
        ),
        privateLinkServiceProxies: Schema.optional(
          Schema.Array(
            Schema.Struct({
              id: Schema.optional(Schema.String),
              remotePrivateLinkServiceConnectionState: Schema.optional(
                Schema.Struct({
                  status: Schema.optional(
                    Schema.Literals(["Pending", "Approved", "Rejected"]),
                  ),
                  description: Schema.optional(Schema.String),
                  actionsRequired: Schema.optional(Schema.String),
                }),
              ),
              remotePrivateEndpointConnection: Schema.optional(
                Schema.Struct({
                  id: Schema.optional(Schema.String),
                }),
              ),
              groupConnectivityInformation: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    groupId: Schema.optional(Schema.String),
                    memberName: Schema.optional(Schema.String),
                    customerVisibleFqdns: Schema.optional(
                      Schema.Array(Schema.String),
                    ),
                    internalFqdn: Schema.optional(Schema.String),
                    redirectMapId: Schema.optional(Schema.String),
                    privateLinkServiceArmRegion: Schema.optional(Schema.String),
                  }),
                ),
              ),
            }),
          ),
        ),
        connectionDetails: Schema.optional(
          Schema.Array(
            Schema.Struct({
              id: Schema.optional(Schema.String),
              privateIpAddress: Schema.optional(Schema.String),
              linkIdentifier: Schema.optional(Schema.String),
              groupId: Schema.optional(Schema.String),
              memberName: Schema.optional(Schema.String),
            }),
          ),
        ),
      }),
    ),
    status: Schema.optional(Schema.String),
  });
export type PrivateEndpointConnectionProxiesGetOutput =
  typeof PrivateEndpointConnectionProxiesGetOutput.Type;

// The operation
/**
 * (INTERNAL - DO NOT USE) Get the specified private endpoint connection proxy associated with the device update account.
 */
export const PrivateEndpointConnectionProxiesGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionProxiesGetInput,
    outputSchema: PrivateEndpointConnectionProxiesGetOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionProxiesListByAccountInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceUpdate/accounts/{accountName}/privateEndpointConnectionProxies",
    }),
  );
export type PrivateEndpointConnectionProxiesListByAccountInput =
  typeof PrivateEndpointConnectionProxiesListByAccountInput.Type;

// Output Schema
export const PrivateEndpointConnectionProxiesListByAccountOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          eTag: Schema.optional(Schema.String),
          remotePrivateEndpoint: Schema.optional(
            Schema.Struct({
              id: Schema.optional(Schema.String),
              location: Schema.optional(Schema.String),
              immutableSubscriptionId: Schema.optional(Schema.String),
              immutableResourceId: Schema.optional(Schema.String),
              vnetTrafficTag: Schema.optional(Schema.String),
              manualPrivateLinkServiceConnections: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    groupIds: Schema.optional(Schema.Array(Schema.String)),
                    requestMessage: Schema.optional(Schema.String),
                  }),
                ),
              ),
              privateLinkServiceConnections: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    groupIds: Schema.optional(Schema.Array(Schema.String)),
                    requestMessage: Schema.optional(Schema.String),
                  }),
                ),
              ),
              privateLinkServiceProxies: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    id: Schema.optional(Schema.String),
                    remotePrivateLinkServiceConnectionState: Schema.optional(
                      Schema.Struct({
                        status: Schema.optional(
                          Schema.Literals(["Pending", "Approved", "Rejected"]),
                        ),
                        description: Schema.optional(Schema.String),
                        actionsRequired: Schema.optional(Schema.String),
                      }),
                    ),
                    remotePrivateEndpointConnection: Schema.optional(
                      Schema.Struct({
                        id: Schema.optional(Schema.String),
                      }),
                    ),
                    groupConnectivityInformation: Schema.optional(
                      Schema.Array(
                        Schema.Struct({
                          groupId: Schema.optional(Schema.String),
                          memberName: Schema.optional(Schema.String),
                          customerVisibleFqdns: Schema.optional(
                            Schema.Array(Schema.String),
                          ),
                          internalFqdn: Schema.optional(Schema.String),
                          redirectMapId: Schema.optional(Schema.String),
                          privateLinkServiceArmRegion: Schema.optional(
                            Schema.String,
                          ),
                        }),
                      ),
                    ),
                  }),
                ),
              ),
              connectionDetails: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    id: Schema.optional(Schema.String),
                    privateIpAddress: Schema.optional(Schema.String),
                    linkIdentifier: Schema.optional(Schema.String),
                    groupId: Schema.optional(Schema.String),
                    memberName: Schema.optional(Schema.String),
                  }),
                ),
              ),
            }),
          ),
          status: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type PrivateEndpointConnectionProxiesListByAccountOutput =
  typeof PrivateEndpointConnectionProxiesListByAccountOutput.Type;

// The operation
/**
 * (INTERNAL - DO NOT USE) List all private endpoint connection proxies in a device update account.
 */
export const PrivateEndpointConnectionProxiesListByAccount =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionProxiesListByAccountInput,
    outputSchema: PrivateEndpointConnectionProxiesListByAccountOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionProxiesUpdatePrivateEndpointPropertiesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceUpdate/accounts/{accountName}/privateEndpointConnectionProxies/{privateEndpointConnectionProxyId}/updatePrivateEndpointProperties",
    }),
  );
export type PrivateEndpointConnectionProxiesUpdatePrivateEndpointPropertiesInput =
  typeof PrivateEndpointConnectionProxiesUpdatePrivateEndpointPropertiesInput.Type;

// Output Schema
export const PrivateEndpointConnectionProxiesUpdatePrivateEndpointPropertiesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PrivateEndpointConnectionProxiesUpdatePrivateEndpointPropertiesOutput =
  typeof PrivateEndpointConnectionProxiesUpdatePrivateEndpointPropertiesOutput.Type;

// The operation
/**
 * (INTERNAL - DO NOT USE) Updates a private endpoint inside the private endpoint connection proxy object.
 */
export const PrivateEndpointConnectionProxiesUpdatePrivateEndpointProperties =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      PrivateEndpointConnectionProxiesUpdatePrivateEndpointPropertiesInput,
    outputSchema:
      PrivateEndpointConnectionProxiesUpdatePrivateEndpointPropertiesOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionProxiesValidateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceUpdate/accounts/{accountName}/privateEndpointConnectionProxies/{privateEndpointConnectionProxyId}/validate",
    }),
  );
export type PrivateEndpointConnectionProxiesValidateInput =
  typeof PrivateEndpointConnectionProxiesValidateInput.Type;

// Output Schema
export const PrivateEndpointConnectionProxiesValidateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PrivateEndpointConnectionProxiesValidateOutput =
  typeof PrivateEndpointConnectionProxiesValidateOutput.Type;

// The operation
/**
 * (INTERNAL - DO NOT USE) Validates a private endpoint connection proxy object.
 */
export const PrivateEndpointConnectionProxiesValidate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionProxiesValidateInput,
    outputSchema: PrivateEndpointConnectionProxiesValidateOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceUpdate/accounts/{accountName}/privateEndpointConnections/{privateEndpointConnectionName}",
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
 * Deletes the specified private endpoint connection associated with the device update account.
 *
 * @param privateEndpointConnectionName - The name of the private endpoint connection associated with the Azure resource
 */
export const PrivateEndpointConnectionsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsDeleteInput,
    outputSchema: PrivateEndpointConnectionsDeleteOutput,
  }));
// Input Schema
export const PrivateLinkResourcesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceUpdate/accounts/{accountName}/privateLinkResources/{groupId}",
    }),
  );
export type PrivateLinkResourcesGetInput =
  typeof PrivateLinkResourcesGetInput.Type;

// Output Schema
export const PrivateLinkResourcesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PrivateLinkResourcesGetOutput =
  typeof PrivateLinkResourcesGetOutput.Type;

// The operation
/**
 * Get the specified private link resource associated with the device update account.
 */
export const PrivateLinkResourcesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PrivateLinkResourcesGetInput,
    outputSchema: PrivateLinkResourcesGetOutput,
  }),
);
// Input Schema
export const PrivateLinkResourcesListByAccountInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceUpdate/accounts/{accountName}/privateLinkResources",
    }),
  );
export type PrivateLinkResourcesListByAccountInput =
  typeof PrivateLinkResourcesListByAccountInput.Type;

// Output Schema
export const PrivateLinkResourcesListByAccountOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type PrivateLinkResourcesListByAccountOutput =
  typeof PrivateLinkResourcesListByAccountOutput.Type;

// The operation
/**
 * List all private link resources in a device update account.
 */
export const PrivateLinkResourcesListByAccount =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinkResourcesListByAccountInput,
    outputSchema: PrivateLinkResourcesListByAccountOutput,
  }));
