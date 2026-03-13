/**
 * Azure Datashare API
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
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataShare/accounts/{accountName}",
  }),
);
export type AccountsCreateInput = typeof AccountsCreateInput.Type;

// Output Schema
export const AccountsCreateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  location: Schema.optional(Schema.String),
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
});
export type AccountsCreateOutput = typeof AccountsCreateOutput.Type;

// The operation
/**
 * Create an account in the given resource group
 *
 * Create an account
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
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataShare/accounts/{accountName}",
  }),
);
export type AccountsDeleteInput = typeof AccountsDeleteInput.Type;

// Output Schema
export const AccountsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  endTime: Schema.optional(Schema.String),
  error: Schema.optional(
    Schema.Struct({
      code: Schema.String,
      details: Schema.optional(Schema.Array(Schema.Unknown)),
      message: Schema.String,
      target: Schema.optional(Schema.String),
    }),
  ),
  startTime: Schema.optional(Schema.String),
  status: Schema.Literals([
    "Accepted",
    "InProgress",
    "TransientFailure",
    "Succeeded",
    "Failed",
    "Canceled",
  ]),
});
export type AccountsDeleteOutput = typeof AccountsDeleteOutput.Type;

// The operation
/**
 * Delete an account
 *
 * DeleteAccount
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
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataShare/accounts/{accountName}",
  }),
);
export type AccountsGetInput = typeof AccountsGetInput.Type;

// Output Schema
export const AccountsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  location: Schema.optional(Schema.String),
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
});
export type AccountsGetOutput = typeof AccountsGetOutput.Type;

// The operation
/**
 * Get an account under a resource group
 *
 * Get an account
 */
export const AccountsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AccountsGetInput,
  outputSchema: AccountsGetOutput,
}));
// Input Schema
export const AccountsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    $skipToken: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataShare/accounts",
    }),
  );
export type AccountsListByResourceGroupInput =
  typeof AccountsListByResourceGroupInput.Type;

// Output Schema
export const AccountsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.Array(
      Schema.Struct({
        location: Schema.optional(Schema.String),
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      }),
    ),
  });
export type AccountsListByResourceGroupOutput =
  typeof AccountsListByResourceGroupOutput.Type;

// The operation
/**
 * List Accounts in a resource group
 *
 * List Accounts in ResourceGroup
 *
 * @param $skipToken - Continuation token
 */
export const AccountsListByResourceGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AccountsListByResourceGroupInput,
    outputSchema: AccountsListByResourceGroupOutput,
  }),
);
// Input Schema
export const AccountsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    $skipToken: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DataShare/accounts",
    }),
  );
export type AccountsListBySubscriptionInput =
  typeof AccountsListBySubscriptionInput.Type;

// Output Schema
export const AccountsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.Array(
      Schema.Struct({
        location: Schema.optional(Schema.String),
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      }),
    ),
  });
export type AccountsListBySubscriptionOutput =
  typeof AccountsListBySubscriptionOutput.Type;

// The operation
/**
 * List Accounts in a subscription
 *
 * List Accounts in Subscription
 *
 * @param $skipToken - Continuation token
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
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataShare/accounts/{accountName}",
  }),
);
export type AccountsUpdateInput = typeof AccountsUpdateInput.Type;

// Output Schema
export const AccountsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  location: Schema.optional(Schema.String),
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
});
export type AccountsUpdateOutput = typeof AccountsUpdateOutput.Type;

// The operation
/**
 * Patch a given account
 *
 * Patch an account
 */
export const AccountsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AccountsUpdateInput,
  outputSchema: AccountsUpdateOutput,
}));
// Input Schema
export const ConsumerInvitationsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    location: Schema.String.pipe(T.PathParam()),
    invitationId: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.DataShare/locations/{location}/consumerInvitations/{invitationId}",
    }),
  );
export type ConsumerInvitationsGetInput =
  typeof ConsumerInvitationsGetInput.Type;

// Output Schema
export const ConsumerInvitationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    systemData: Schema.optional(
      Schema.Struct({
        createdAt: Schema.optional(Schema.String),
        createdBy: Schema.optional(Schema.String),
        createdByType: Schema.optional(
          Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
        ),
        lastModifiedAt: Schema.optional(Schema.String),
        lastModifiedBy: Schema.optional(Schema.String),
        lastModifiedByType: Schema.optional(
          Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
        ),
      }),
    ),
    type: Schema.optional(Schema.String),
  });
export type ConsumerInvitationsGetOutput =
  typeof ConsumerInvitationsGetOutput.Type;

// The operation
/**
 * Gets the invitation identified by invitationId
 *
 * Get an invitation
 *
 * @param location - Location of the invitation
 * @param invitationId - An invitation id
 */
export const ConsumerInvitationsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ConsumerInvitationsGetInput,
    outputSchema: ConsumerInvitationsGetOutput,
  }),
);
// Input Schema
export const ConsumerInvitationsListInvitationsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    $skipToken: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.DataShare/listInvitations",
    }),
  );
export type ConsumerInvitationsListInvitationsInput =
  typeof ConsumerInvitationsListInvitationsInput.Type;

// Output Schema
export const ConsumerInvitationsListInvitationsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        systemData: Schema.optional(
          Schema.Struct({
            createdAt: Schema.optional(Schema.String),
            createdBy: Schema.optional(Schema.String),
            createdByType: Schema.optional(
              Schema.Literals([
                "User",
                "Application",
                "ManagedIdentity",
                "Key",
              ]),
            ),
            lastModifiedAt: Schema.optional(Schema.String),
            lastModifiedBy: Schema.optional(Schema.String),
            lastModifiedByType: Schema.optional(
              Schema.Literals([
                "User",
                "Application",
                "ManagedIdentity",
                "Key",
              ]),
            ),
          }),
        ),
        type: Schema.optional(Schema.String),
      }),
    ),
  });
export type ConsumerInvitationsListInvitationsOutput =
  typeof ConsumerInvitationsListInvitationsOutput.Type;

// The operation
/**
 * List the invitations
 *
 * Lists invitations
 *
 * @param $skipToken - The continuation token
 */
export const ConsumerInvitationsListInvitations =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConsumerInvitationsListInvitationsInput,
    outputSchema: ConsumerInvitationsListInvitationsOutput,
  }));
// Input Schema
export const ConsumerInvitationsRejectInvitationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    location: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.DataShare/locations/{location}/rejectInvitation",
    }),
  );
export type ConsumerInvitationsRejectInvitationInput =
  typeof ConsumerInvitationsRejectInvitationInput.Type;

// Output Schema
export const ConsumerInvitationsRejectInvitationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    systemData: Schema.optional(
      Schema.Struct({
        createdAt: Schema.optional(Schema.String),
        createdBy: Schema.optional(Schema.String),
        createdByType: Schema.optional(
          Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
        ),
        lastModifiedAt: Schema.optional(Schema.String),
        lastModifiedBy: Schema.optional(Schema.String),
        lastModifiedByType: Schema.optional(
          Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
        ),
      }),
    ),
    type: Schema.optional(Schema.String),
  });
export type ConsumerInvitationsRejectInvitationOutput =
  typeof ConsumerInvitationsRejectInvitationOutput.Type;

// The operation
/**
 * Rejects the invitation identified by invitationId
 *
 * Reject an invitation
 *
 * @param location - Location of the invitation
 */
export const ConsumerInvitationsRejectInvitation =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConsumerInvitationsRejectInvitationInput,
    outputSchema: ConsumerInvitationsRejectInvitationOutput,
  }));
// Input Schema
export const ConsumerSourceDataSetsListByShareSubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    shareSubscriptionName: Schema.String.pipe(T.PathParam()),
    $skipToken: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataShare/accounts/{accountName}/shareSubscriptions/{shareSubscriptionName}/consumerSourceDataSets",
    }),
  );
export type ConsumerSourceDataSetsListByShareSubscriptionInput =
  typeof ConsumerSourceDataSetsListByShareSubscriptionInput.Type;

// Output Schema
export const ConsumerSourceDataSetsListByShareSubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        systemData: Schema.optional(
          Schema.Struct({
            createdAt: Schema.optional(Schema.String),
            createdBy: Schema.optional(Schema.String),
            createdByType: Schema.optional(
              Schema.Literals([
                "User",
                "Application",
                "ManagedIdentity",
                "Key",
              ]),
            ),
            lastModifiedAt: Schema.optional(Schema.String),
            lastModifiedBy: Schema.optional(Schema.String),
            lastModifiedByType: Schema.optional(
              Schema.Literals([
                "User",
                "Application",
                "ManagedIdentity",
                "Key",
              ]),
            ),
          }),
        ),
        type: Schema.optional(Schema.String),
      }),
    ),
  });
export type ConsumerSourceDataSetsListByShareSubscriptionOutput =
  typeof ConsumerSourceDataSetsListByShareSubscriptionOutput.Type;

// The operation
/**
 * Get source dataSets of a shareSubscription.
 *
 * Get source dataSets of a shareSubscription
 *
 * @param shareSubscriptionName - The name of the shareSubscription.
 * @param $skipToken - Continuation token
 */
export const ConsumerSourceDataSetsListByShareSubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConsumerSourceDataSetsListByShareSubscriptionInput,
    outputSchema: ConsumerSourceDataSetsListByShareSubscriptionOutput,
  }));
// Input Schema
export const DataSetMappingsCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    shareSubscriptionName: Schema.String.pipe(T.PathParam()),
    dataSetMappingName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataShare/accounts/{accountName}/shareSubscriptions/{shareSubscriptionName}/dataSetMappings/{dataSetMappingName}",
    }),
  );
export type DataSetMappingsCreateInput = typeof DataSetMappingsCreateInput.Type;

// Output Schema
export const DataSetMappingsCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    systemData: Schema.optional(
      Schema.Struct({
        createdAt: Schema.optional(Schema.String),
        createdBy: Schema.optional(Schema.String),
        createdByType: Schema.optional(
          Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
        ),
        lastModifiedAt: Schema.optional(Schema.String),
        lastModifiedBy: Schema.optional(Schema.String),
        lastModifiedByType: Schema.optional(
          Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
        ),
      }),
    ),
    type: Schema.optional(Schema.String),
  });
export type DataSetMappingsCreateOutput =
  typeof DataSetMappingsCreateOutput.Type;

// The operation
/**
 * Maps a source data set in the source share to a sink data set in the share subscription.
Enables copying the data set from source to destination.
 *
 * Create a DataSetMapping
 *
 * @param shareSubscriptionName - The name of the share subscription which will hold the data set sink.
 * @param dataSetMappingName - The name of the data set mapping to be created.
 */
export const DataSetMappingsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DataSetMappingsCreateInput,
    outputSchema: DataSetMappingsCreateOutput,
  }),
);
// Input Schema
export const DataSetMappingsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    shareSubscriptionName: Schema.String.pipe(T.PathParam()),
    dataSetMappingName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataShare/accounts/{accountName}/shareSubscriptions/{shareSubscriptionName}/dataSetMappings/{dataSetMappingName}",
    }),
  );
export type DataSetMappingsDeleteInput = typeof DataSetMappingsDeleteInput.Type;

// Output Schema
export const DataSetMappingsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DataSetMappingsDeleteOutput =
  typeof DataSetMappingsDeleteOutput.Type;

// The operation
/**
 * Delete DataSetMapping in a shareSubscription.
 *
 * Delete a DataSetMapping in a shareSubscription
 *
 * @param shareSubscriptionName - The name of the shareSubscription.
 * @param dataSetMappingName - The name of the dataSetMapping.
 */
export const DataSetMappingsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DataSetMappingsDeleteInput,
    outputSchema: DataSetMappingsDeleteOutput,
  }),
);
// Input Schema
export const DataSetMappingsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    shareSubscriptionName: Schema.String.pipe(T.PathParam()),
    dataSetMappingName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataShare/accounts/{accountName}/shareSubscriptions/{shareSubscriptionName}/dataSetMappings/{dataSetMappingName}",
    }),
  );
export type DataSetMappingsGetInput = typeof DataSetMappingsGetInput.Type;

// Output Schema
export const DataSetMappingsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    systemData: Schema.optional(
      Schema.Struct({
        createdAt: Schema.optional(Schema.String),
        createdBy: Schema.optional(Schema.String),
        createdByType: Schema.optional(
          Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
        ),
        lastModifiedAt: Schema.optional(Schema.String),
        lastModifiedBy: Schema.optional(Schema.String),
        lastModifiedByType: Schema.optional(
          Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
        ),
      }),
    ),
    type: Schema.optional(Schema.String),
  });
export type DataSetMappingsGetOutput = typeof DataSetMappingsGetOutput.Type;

// The operation
/**
 * Get DataSetMapping in a shareSubscription.
 *
 * Get a DataSetMapping in a shareSubscription
 *
 * @param shareSubscriptionName - The name of the shareSubscription.
 * @param dataSetMappingName - The name of the dataSetMapping.
 */
export const DataSetMappingsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DataSetMappingsGetInput,
  outputSchema: DataSetMappingsGetOutput,
}));
// Input Schema
export const DataSetMappingsListByShareSubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    shareSubscriptionName: Schema.String.pipe(T.PathParam()),
    $skipToken: Schema.optional(Schema.String),
    $filter: Schema.optional(Schema.String),
    $orderby: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataShare/accounts/{accountName}/shareSubscriptions/{shareSubscriptionName}/dataSetMappings",
    }),
  );
export type DataSetMappingsListByShareSubscriptionInput =
  typeof DataSetMappingsListByShareSubscriptionInput.Type;

// Output Schema
export const DataSetMappingsListByShareSubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        systemData: Schema.optional(
          Schema.Struct({
            createdAt: Schema.optional(Schema.String),
            createdBy: Schema.optional(Schema.String),
            createdByType: Schema.optional(
              Schema.Literals([
                "User",
                "Application",
                "ManagedIdentity",
                "Key",
              ]),
            ),
            lastModifiedAt: Schema.optional(Schema.String),
            lastModifiedBy: Schema.optional(Schema.String),
            lastModifiedByType: Schema.optional(
              Schema.Literals([
                "User",
                "Application",
                "ManagedIdentity",
                "Key",
              ]),
            ),
          }),
        ),
        type: Schema.optional(Schema.String),
      }),
    ),
  });
export type DataSetMappingsListByShareSubscriptionOutput =
  typeof DataSetMappingsListByShareSubscriptionOutput.Type;

// The operation
/**
 * List DataSetMappings in a share subscription.
 *
 * List DataSetMappings in a share subscription
 *
 * @param shareSubscriptionName - The name of the share subscription.
 * @param $skipToken - Continuation token
 * @param $filter - Filters the results using OData syntax.
 * @param $orderby - Sorts the results using OData syntax.
 */
export const DataSetMappingsListByShareSubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DataSetMappingsListByShareSubscriptionInput,
    outputSchema: DataSetMappingsListByShareSubscriptionOutput,
  }));
// Input Schema
export const DataSetsCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  shareName: Schema.String.pipe(T.PathParam()),
  dataSetName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataShare/accounts/{accountName}/shares/{shareName}/dataSets/{dataSetName}",
  }),
);
export type DataSetsCreateInput = typeof DataSetsCreateInput.Type;

// Output Schema
export const DataSetsCreateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  systemData: Schema.optional(
    Schema.Struct({
      createdAt: Schema.optional(Schema.String),
      createdBy: Schema.optional(Schema.String),
      createdByType: Schema.optional(
        Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
      ),
      lastModifiedAt: Schema.optional(Schema.String),
      lastModifiedBy: Schema.optional(Schema.String),
      lastModifiedByType: Schema.optional(
        Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
      ),
    }),
  ),
  type: Schema.optional(Schema.String),
});
export type DataSetsCreateOutput = typeof DataSetsCreateOutput.Type;

// The operation
/**
 * Adds a new data set to an existing share.
 *
 * Create a DataSet
 *
 * @param shareName - The name of the share to add the data set to.
 * @param dataSetName - The name of the dataSet.
 */
export const DataSetsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DataSetsCreateInput,
  outputSchema: DataSetsCreateOutput,
}));
// Input Schema
export const DataSetsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  shareName: Schema.String.pipe(T.PathParam()),
  dataSetName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataShare/accounts/{accountName}/shares/{shareName}/dataSets/{dataSetName}",
  }),
);
export type DataSetsDeleteInput = typeof DataSetsDeleteInput.Type;

// Output Schema
export const DataSetsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DataSetsDeleteOutput = typeof DataSetsDeleteOutput.Type;

// The operation
/**
 * Delete DataSet in a share.
 *
 * Delete a DataSet in a share
 *
 * @param shareName - The name of the share.
 * @param dataSetName - The name of the dataSet.
 */
export const DataSetsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DataSetsDeleteInput,
  outputSchema: DataSetsDeleteOutput,
}));
// Input Schema
export const DataSetsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  shareName: Schema.String.pipe(T.PathParam()),
  dataSetName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataShare/accounts/{accountName}/shares/{shareName}/dataSets/{dataSetName}",
  }),
);
export type DataSetsGetInput = typeof DataSetsGetInput.Type;

// Output Schema
export const DataSetsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  systemData: Schema.optional(
    Schema.Struct({
      createdAt: Schema.optional(Schema.String),
      createdBy: Schema.optional(Schema.String),
      createdByType: Schema.optional(
        Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
      ),
      lastModifiedAt: Schema.optional(Schema.String),
      lastModifiedBy: Schema.optional(Schema.String),
      lastModifiedByType: Schema.optional(
        Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
      ),
    }),
  ),
  type: Schema.optional(Schema.String),
});
export type DataSetsGetOutput = typeof DataSetsGetOutput.Type;

// The operation
/**
 * Get DataSet in a share.
 *
 * Get a DataSet in a share
 *
 * @param shareName - The name of the share.
 * @param dataSetName - The name of the dataSet.
 */
export const DataSetsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DataSetsGetInput,
  outputSchema: DataSetsGetOutput,
}));
// Input Schema
export const DataSetsListByShareInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    shareName: Schema.String.pipe(T.PathParam()),
    $skipToken: Schema.optional(Schema.String),
    $filter: Schema.optional(Schema.String),
    $orderby: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataShare/accounts/{accountName}/shares/{shareName}/dataSets",
    }),
  );
export type DataSetsListByShareInput = typeof DataSetsListByShareInput.Type;

// Output Schema
export const DataSetsListByShareOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        systemData: Schema.optional(
          Schema.Struct({
            createdAt: Schema.optional(Schema.String),
            createdBy: Schema.optional(Schema.String),
            createdByType: Schema.optional(
              Schema.Literals([
                "User",
                "Application",
                "ManagedIdentity",
                "Key",
              ]),
            ),
            lastModifiedAt: Schema.optional(Schema.String),
            lastModifiedBy: Schema.optional(Schema.String),
            lastModifiedByType: Schema.optional(
              Schema.Literals([
                "User",
                "Application",
                "ManagedIdentity",
                "Key",
              ]),
            ),
          }),
        ),
        type: Schema.optional(Schema.String),
      }),
    ),
  });
export type DataSetsListByShareOutput = typeof DataSetsListByShareOutput.Type;

// The operation
/**
 * List DataSets in a share.
 *
 * List DataSets in a share
 *
 * @param shareName - The name of the share.
 * @param $skipToken - continuation token
 * @param $filter - Filters the results using OData syntax.
 * @param $orderby - Sorts the results using OData syntax.
 */
export const DataSetsListByShare = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DataSetsListByShareInput,
  outputSchema: DataSetsListByShareOutput,
}));
// Input Schema
export const EmailRegistrationsActivateEmailInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    location: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.DataShare/locations/{location}/activateEmail",
    }),
  );
export type EmailRegistrationsActivateEmailInput =
  typeof EmailRegistrationsActivateEmailInput.Type;

// Output Schema
export const EmailRegistrationsActivateEmailOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    activationCode: Schema.optional(Schema.String),
    activationExpirationDate: Schema.optional(Schema.String),
    email: Schema.optional(Schema.String),
    registrationStatus: Schema.optional(
      Schema.Literals([
        "ActivationPending",
        "Activated",
        "ActivationAttemptsExhausted",
      ]),
    ),
    tenantId: Schema.optional(Schema.String),
  });
export type EmailRegistrationsActivateEmailOutput =
  typeof EmailRegistrationsActivateEmailOutput.Type;

// The operation
/**
 * Activates the tenant and email combination using email code received.
 *
 * Activate the email registration for the current tenant
 *
 * @param location - Location of the activation.
 */
export const EmailRegistrationsActivateEmail =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: EmailRegistrationsActivateEmailInput,
    outputSchema: EmailRegistrationsActivateEmailOutput,
  }));
// Input Schema
export const EmailRegistrationsRegisterEmailInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    location: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.DataShare/locations/{location}/registerEmail",
    }),
  );
export type EmailRegistrationsRegisterEmailInput =
  typeof EmailRegistrationsRegisterEmailInput.Type;

// Output Schema
export const EmailRegistrationsRegisterEmailOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    activationCode: Schema.optional(Schema.String),
    activationExpirationDate: Schema.optional(Schema.String),
    email: Schema.optional(Schema.String),
    registrationStatus: Schema.optional(
      Schema.Literals([
        "ActivationPending",
        "Activated",
        "ActivationAttemptsExhausted",
      ]),
    ),
    tenantId: Schema.optional(Schema.String),
  });
export type EmailRegistrationsRegisterEmailOutput =
  typeof EmailRegistrationsRegisterEmailOutput.Type;

// The operation
/**
 * Registers the tenant and email combination for verification.
 *
 * Register an email for the current tenant
 *
 * @param location - Location of the registration
 */
export const EmailRegistrationsRegisterEmail =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: EmailRegistrationsRegisterEmailInput,
    outputSchema: EmailRegistrationsRegisterEmailOutput,
  }));
// Input Schema
export const InvitationsCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    shareName: Schema.String.pipe(T.PathParam()),
    invitationName: Schema.String.pipe(T.PathParam()),
  },
).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataShare/accounts/{accountName}/shares/{shareName}/invitations/{invitationName}",
  }),
);
export type InvitationsCreateInput = typeof InvitationsCreateInput.Type;

// Output Schema
export const InvitationsCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    systemData: Schema.optional(
      Schema.Struct({
        createdAt: Schema.optional(Schema.String),
        createdBy: Schema.optional(Schema.String),
        createdByType: Schema.optional(
          Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
        ),
        lastModifiedAt: Schema.optional(Schema.String),
        lastModifiedBy: Schema.optional(Schema.String),
        lastModifiedByType: Schema.optional(
          Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
        ),
      }),
    ),
    type: Schema.optional(Schema.String),
  });
export type InvitationsCreateOutput = typeof InvitationsCreateOutput.Type;

// The operation
/**
 * Sends a new invitation to a recipient to access a share.
 *
 * Create an invitation
 *
 * @param shareName - The name of the share to send the invitation for.
 * @param invitationName - The name of the invitation.
 */
export const InvitationsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: InvitationsCreateInput,
  outputSchema: InvitationsCreateOutput,
}));
// Input Schema
export const InvitationsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    shareName: Schema.String.pipe(T.PathParam()),
    invitationName: Schema.String.pipe(T.PathParam()),
  },
).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataShare/accounts/{accountName}/shares/{shareName}/invitations/{invitationName}",
  }),
);
export type InvitationsDeleteInput = typeof InvitationsDeleteInput.Type;

// Output Schema
export const InvitationsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type InvitationsDeleteOutput = typeof InvitationsDeleteOutput.Type;

// The operation
/**
 * Delete Invitation in a share.
 *
 * Delete an invitation in a share
 *
 * @param shareName - The name of the share.
 * @param invitationName - The name of the invitation.
 */
export const InvitationsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: InvitationsDeleteInput,
  outputSchema: InvitationsDeleteOutput,
}));
// Input Schema
export const InvitationsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  shareName: Schema.String.pipe(T.PathParam()),
  invitationName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataShare/accounts/{accountName}/shares/{shareName}/invitations/{invitationName}",
  }),
);
export type InvitationsGetInput = typeof InvitationsGetInput.Type;

// Output Schema
export const InvitationsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  systemData: Schema.optional(
    Schema.Struct({
      createdAt: Schema.optional(Schema.String),
      createdBy: Schema.optional(Schema.String),
      createdByType: Schema.optional(
        Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
      ),
      lastModifiedAt: Schema.optional(Schema.String),
      lastModifiedBy: Schema.optional(Schema.String),
      lastModifiedByType: Schema.optional(
        Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
      ),
    }),
  ),
  type: Schema.optional(Schema.String),
});
export type InvitationsGetOutput = typeof InvitationsGetOutput.Type;

// The operation
/**
 * Get Invitation in a share.
 *
 * Get an invitation in a share
 *
 * @param shareName - The name of the share.
 * @param invitationName - The name of the invitation.
 */
export const InvitationsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: InvitationsGetInput,
  outputSchema: InvitationsGetOutput,
}));
// Input Schema
export const InvitationsListByShareInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    shareName: Schema.String.pipe(T.PathParam()),
    $skipToken: Schema.optional(Schema.String),
    $filter: Schema.optional(Schema.String),
    $orderby: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataShare/accounts/{accountName}/shares/{shareName}/invitations",
    }),
  );
export type InvitationsListByShareInput =
  typeof InvitationsListByShareInput.Type;

// Output Schema
export const InvitationsListByShareOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        systemData: Schema.optional(
          Schema.Struct({
            createdAt: Schema.optional(Schema.String),
            createdBy: Schema.optional(Schema.String),
            createdByType: Schema.optional(
              Schema.Literals([
                "User",
                "Application",
                "ManagedIdentity",
                "Key",
              ]),
            ),
            lastModifiedAt: Schema.optional(Schema.String),
            lastModifiedBy: Schema.optional(Schema.String),
            lastModifiedByType: Schema.optional(
              Schema.Literals([
                "User",
                "Application",
                "ManagedIdentity",
                "Key",
              ]),
            ),
          }),
        ),
        type: Schema.optional(Schema.String),
      }),
    ),
  });
export type InvitationsListByShareOutput =
  typeof InvitationsListByShareOutput.Type;

// The operation
/**
 * List all Invitations in a share.
 *
 * List invitations in a share
 *
 * @param shareName - The name of the share.
 * @param $skipToken - The continuation token
 * @param $filter - Filters the results using OData syntax.
 * @param $orderby - Sorts the results using OData syntax.
 */
export const InvitationsListByShare = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: InvitationsListByShareInput,
    outputSchema: InvitationsListByShareOutput,
  }),
);
// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({ method: "GET", path: "/providers/Microsoft.DataShare/operations" }),
);
export type OperationsListInput = typeof OperationsListInput.Type;

// Output Schema
export const OperationsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  nextLink: Schema.optional(Schema.String),
  value: Schema.Array(
    Schema.Struct({
      display: Schema.optional(
        Schema.Struct({
          description: Schema.optional(Schema.String),
          operation: Schema.optional(Schema.String),
          provider: Schema.optional(Schema.String),
          resource: Schema.optional(Schema.String),
        }),
      ),
      name: Schema.optional(Schema.String),
      origin: Schema.optional(Schema.String),
      properties: Schema.optional(
        Schema.Struct({
          serviceSpecification: Schema.optional(
            Schema.Struct({
              logSpecifications: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    blobDuration: Schema.optional(Schema.String),
                    displayName: Schema.optional(Schema.String),
                    name: Schema.optional(Schema.String),
                  }),
                ),
              ),
              metricSpecifications: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    aggregationType: Schema.optional(Schema.String),
                    dimensions: Schema.optional(
                      Schema.Array(
                        Schema.Struct({
                          displayName: Schema.optional(Schema.String),
                          name: Schema.optional(Schema.String),
                        }),
                      ),
                    ),
                    displayDescription: Schema.optional(Schema.String),
                    displayName: Schema.optional(Schema.String),
                    enableRegionalMdmAccount: Schema.optional(Schema.String),
                    fillGapWithZero: Schema.optional(Schema.Boolean),
                    internalMetricName: Schema.optional(Schema.String),
                    name: Schema.optional(Schema.String),
                    resourceIdDimensionNameOverride: Schema.optional(
                      Schema.String,
                    ),
                    supportedAggregationTypes: Schema.optional(
                      Schema.Array(Schema.String),
                    ),
                    supportedTimeGrainTypes: Schema.optional(
                      Schema.Array(Schema.String),
                    ),
                    unit: Schema.optional(Schema.String),
                  }),
                ),
              ),
            }),
          ),
        }),
      ),
    }),
  ),
});
export type OperationsListOutput = typeof OperationsListOutput.Type;

// The operation
/**
 * Lists the available operations
 *
 * List of available operations
 */
export const OperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationsListInput,
  outputSchema: OperationsListOutput,
}));
// Input Schema
export const ProviderShareSubscriptionsAdjustInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    shareName: Schema.String.pipe(T.PathParam()),
    providerShareSubscriptionId: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataShare/accounts/{accountName}/shares/{shareName}/providerShareSubscriptions/{providerShareSubscriptionId}/adjust",
    }),
  );
export type ProviderShareSubscriptionsAdjustInput =
  typeof ProviderShareSubscriptionsAdjustInput.Type;

// Output Schema
export const ProviderShareSubscriptionsAdjustOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    systemData: Schema.optional(
      Schema.Struct({
        createdAt: Schema.optional(Schema.String),
        createdBy: Schema.optional(Schema.String),
        createdByType: Schema.optional(
          Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
        ),
        lastModifiedAt: Schema.optional(Schema.String),
        lastModifiedBy: Schema.optional(Schema.String),
        lastModifiedByType: Schema.optional(
          Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
        ),
      }),
    ),
    type: Schema.optional(Schema.String),
  });
export type ProviderShareSubscriptionsAdjustOutput =
  typeof ProviderShareSubscriptionsAdjustOutput.Type;

// The operation
/**
 * Adjust the expiration date of a share subscription in a provider share.
 *
 * Adjust a share subscription's expiration date in a provider share
 *
 * @param shareName - The name of the share.
 * @param providerShareSubscriptionId - To locate shareSubscription
 */
export const ProviderShareSubscriptionsAdjust =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ProviderShareSubscriptionsAdjustInput,
    outputSchema: ProviderShareSubscriptionsAdjustOutput,
  }));
// Input Schema
export const ProviderShareSubscriptionsGetByShareInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    shareName: Schema.String.pipe(T.PathParam()),
    providerShareSubscriptionId: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataShare/accounts/{accountName}/shares/{shareName}/providerShareSubscriptions/{providerShareSubscriptionId}",
    }),
  );
export type ProviderShareSubscriptionsGetByShareInput =
  typeof ProviderShareSubscriptionsGetByShareInput.Type;

// Output Schema
export const ProviderShareSubscriptionsGetByShareOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    systemData: Schema.optional(
      Schema.Struct({
        createdAt: Schema.optional(Schema.String),
        createdBy: Schema.optional(Schema.String),
        createdByType: Schema.optional(
          Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
        ),
        lastModifiedAt: Schema.optional(Schema.String),
        lastModifiedBy: Schema.optional(Schema.String),
        lastModifiedByType: Schema.optional(
          Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
        ),
      }),
    ),
    type: Schema.optional(Schema.String),
  });
export type ProviderShareSubscriptionsGetByShareOutput =
  typeof ProviderShareSubscriptionsGetByShareOutput.Type;

// The operation
/**
 * Get share subscription in a provider share.
 *
 * Get share subscription in a provider share
 *
 * @param shareName - The name of the share.
 * @param providerShareSubscriptionId - To locate shareSubscription
 */
export const ProviderShareSubscriptionsGetByShare =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ProviderShareSubscriptionsGetByShareInput,
    outputSchema: ProviderShareSubscriptionsGetByShareOutput,
  }));
// Input Schema
export const ProviderShareSubscriptionsListByShareInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    shareName: Schema.String.pipe(T.PathParam()),
    $skipToken: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataShare/accounts/{accountName}/shares/{shareName}/providerShareSubscriptions",
    }),
  );
export type ProviderShareSubscriptionsListByShareInput =
  typeof ProviderShareSubscriptionsListByShareInput.Type;

// Output Schema
export const ProviderShareSubscriptionsListByShareOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        systemData: Schema.optional(
          Schema.Struct({
            createdAt: Schema.optional(Schema.String),
            createdBy: Schema.optional(Schema.String),
            createdByType: Schema.optional(
              Schema.Literals([
                "User",
                "Application",
                "ManagedIdentity",
                "Key",
              ]),
            ),
            lastModifiedAt: Schema.optional(Schema.String),
            lastModifiedBy: Schema.optional(Schema.String),
            lastModifiedByType: Schema.optional(
              Schema.Literals([
                "User",
                "Application",
                "ManagedIdentity",
                "Key",
              ]),
            ),
          }),
        ),
        type: Schema.optional(Schema.String),
      }),
    ),
  });
export type ProviderShareSubscriptionsListByShareOutput =
  typeof ProviderShareSubscriptionsListByShareOutput.Type;

// The operation
/**
 * List of available share subscriptions to a provider share.
 *
 * List share subscriptions in a provider share
 *
 * @param shareName - The name of the share.
 * @param $skipToken - Continuation Token
 */
export const ProviderShareSubscriptionsListByShare =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ProviderShareSubscriptionsListByShareInput,
    outputSchema: ProviderShareSubscriptionsListByShareOutput,
  }));
// Input Schema
export const ProviderShareSubscriptionsReinstateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    shareName: Schema.String.pipe(T.PathParam()),
    providerShareSubscriptionId: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataShare/accounts/{accountName}/shares/{shareName}/providerShareSubscriptions/{providerShareSubscriptionId}/reinstate",
    }),
  );
export type ProviderShareSubscriptionsReinstateInput =
  typeof ProviderShareSubscriptionsReinstateInput.Type;

// Output Schema
export const ProviderShareSubscriptionsReinstateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    systemData: Schema.optional(
      Schema.Struct({
        createdAt: Schema.optional(Schema.String),
        createdBy: Schema.optional(Schema.String),
        createdByType: Schema.optional(
          Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
        ),
        lastModifiedAt: Schema.optional(Schema.String),
        lastModifiedBy: Schema.optional(Schema.String),
        lastModifiedByType: Schema.optional(
          Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
        ),
      }),
    ),
    type: Schema.optional(Schema.String),
  });
export type ProviderShareSubscriptionsReinstateOutput =
  typeof ProviderShareSubscriptionsReinstateOutput.Type;

// The operation
/**
 * Reinstate share subscription in a provider share.
 *
 * Reinstate share subscription in a provider share
 *
 * @param shareName - The name of the share.
 * @param providerShareSubscriptionId - To locate shareSubscription
 */
export const ProviderShareSubscriptionsReinstate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ProviderShareSubscriptionsReinstateInput,
    outputSchema: ProviderShareSubscriptionsReinstateOutput,
  }));
// Input Schema
export const ProviderShareSubscriptionsRevokeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    shareName: Schema.String.pipe(T.PathParam()),
    providerShareSubscriptionId: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataShare/accounts/{accountName}/shares/{shareName}/providerShareSubscriptions/{providerShareSubscriptionId}/revoke",
    }),
  );
export type ProviderShareSubscriptionsRevokeInput =
  typeof ProviderShareSubscriptionsRevokeInput.Type;

// Output Schema
export const ProviderShareSubscriptionsRevokeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    systemData: Schema.optional(
      Schema.Struct({
        createdAt: Schema.optional(Schema.String),
        createdBy: Schema.optional(Schema.String),
        createdByType: Schema.optional(
          Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
        ),
        lastModifiedAt: Schema.optional(Schema.String),
        lastModifiedBy: Schema.optional(Schema.String),
        lastModifiedByType: Schema.optional(
          Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
        ),
      }),
    ),
    type: Schema.optional(Schema.String),
  });
export type ProviderShareSubscriptionsRevokeOutput =
  typeof ProviderShareSubscriptionsRevokeOutput.Type;

// The operation
/**
 * Revoke share subscription in a provider share.
 *
 * Revoke share subscription in a provider share
 *
 * @param shareName - The name of the share.
 * @param providerShareSubscriptionId - To locate shareSubscription
 */
export const ProviderShareSubscriptionsRevoke =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ProviderShareSubscriptionsRevokeInput,
    outputSchema: ProviderShareSubscriptionsRevokeOutput,
  }));
// Input Schema
export const SharesCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  shareName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataShare/accounts/{accountName}/shares/{shareName}",
  }),
);
export type SharesCreateInput = typeof SharesCreateInput.Type;

// Output Schema
export const SharesCreateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  systemData: Schema.optional(
    Schema.Struct({
      createdAt: Schema.optional(Schema.String),
      createdBy: Schema.optional(Schema.String),
      createdByType: Schema.optional(
        Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
      ),
      lastModifiedAt: Schema.optional(Schema.String),
      lastModifiedBy: Schema.optional(Schema.String),
      lastModifiedByType: Schema.optional(
        Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
      ),
    }),
  ),
  type: Schema.optional(Schema.String),
});
export type SharesCreateOutput = typeof SharesCreateOutput.Type;

// The operation
/**
 * Create a share in the given account.
 *
 * Create a share
 *
 * @param shareName - The name of the share.
 */
export const SharesCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SharesCreateInput,
  outputSchema: SharesCreateOutput,
}));
// Input Schema
export const SharesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  shareName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataShare/accounts/{accountName}/shares/{shareName}",
  }),
);
export type SharesDeleteInput = typeof SharesDeleteInput.Type;

// Output Schema
export const SharesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  endTime: Schema.optional(Schema.String),
  error: Schema.optional(
    Schema.Struct({
      code: Schema.String,
      details: Schema.optional(Schema.Array(Schema.Unknown)),
      message: Schema.String,
      target: Schema.optional(Schema.String),
    }),
  ),
  startTime: Schema.optional(Schema.String),
  status: Schema.Literals([
    "Accepted",
    "InProgress",
    "TransientFailure",
    "Succeeded",
    "Failed",
    "Canceled",
  ]),
});
export type SharesDeleteOutput = typeof SharesDeleteOutput.Type;

// The operation
/**
 * Deletes a share
 *
 * Delete a share
 *
 * @param shareName - The name of the share.
 */
export const SharesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SharesDeleteInput,
  outputSchema: SharesDeleteOutput,
}));
// Input Schema
export const SharesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  shareName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataShare/accounts/{accountName}/shares/{shareName}",
  }),
);
export type SharesGetInput = typeof SharesGetInput.Type;

// Output Schema
export const SharesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  systemData: Schema.optional(
    Schema.Struct({
      createdAt: Schema.optional(Schema.String),
      createdBy: Schema.optional(Schema.String),
      createdByType: Schema.optional(
        Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
      ),
      lastModifiedAt: Schema.optional(Schema.String),
      lastModifiedBy: Schema.optional(Schema.String),
      lastModifiedByType: Schema.optional(
        Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
      ),
    }),
  ),
  type: Schema.optional(Schema.String),
});
export type SharesGetOutput = typeof SharesGetOutput.Type;

// The operation
/**
 * Get a specified share
 *
 * Get a share
 *
 * @param shareName - The name of the share to retrieve.
 */
export const SharesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SharesGetInput,
  outputSchema: SharesGetOutput,
}));
// Input Schema
export const SharesListByAccountInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    $skipToken: Schema.optional(Schema.String),
    $filter: Schema.optional(Schema.String),
    $orderby: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataShare/accounts/{accountName}/shares",
    }),
  );
export type SharesListByAccountInput = typeof SharesListByAccountInput.Type;

// Output Schema
export const SharesListByAccountOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        systemData: Schema.optional(
          Schema.Struct({
            createdAt: Schema.optional(Schema.String),
            createdBy: Schema.optional(Schema.String),
            createdByType: Schema.optional(
              Schema.Literals([
                "User",
                "Application",
                "ManagedIdentity",
                "Key",
              ]),
            ),
            lastModifiedAt: Schema.optional(Schema.String),
            lastModifiedBy: Schema.optional(Schema.String),
            lastModifiedByType: Schema.optional(
              Schema.Literals([
                "User",
                "Application",
                "ManagedIdentity",
                "Key",
              ]),
            ),
          }),
        ),
        type: Schema.optional(Schema.String),
      }),
    ),
  });
export type SharesListByAccountOutput = typeof SharesListByAccountOutput.Type;

// The operation
/**
 * List of available shares under an account.
 *
 * List shares in an account
 *
 * @param $skipToken - Continuation Token
 * @param $filter - Filters the results using OData syntax.
 * @param $orderby - Sorts the results using OData syntax.
 */
export const SharesListByAccount = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SharesListByAccountInput,
  outputSchema: SharesListByAccountOutput,
}));
// Input Schema
export const SharesListSynchronizationDetailsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    shareName: Schema.String.pipe(T.PathParam()),
    $skipToken: Schema.optional(Schema.String),
    $filter: Schema.optional(Schema.String),
    $orderby: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataShare/accounts/{accountName}/shares/{shareName}/listSynchronizationDetails",
    }),
  );
export type SharesListSynchronizationDetailsInput =
  typeof SharesListSynchronizationDetailsInput.Type;

// Output Schema
export const SharesListSynchronizationDetailsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.Array(
      Schema.Struct({
        dataSetId: Schema.optional(Schema.String),
        dataSetType: Schema.optional(
          Schema.Literals([
            "Blob",
            "Container",
            "BlobFolder",
            "AdlsGen2FileSystem",
            "AdlsGen2Folder",
            "AdlsGen2File",
            "AdlsGen1Folder",
            "AdlsGen1File",
            "KustoCluster",
            "KustoDatabase",
            "KustoTable",
            "SqlDBTable",
            "SqlDWTable",
            "SynapseWorkspaceSqlPoolTable",
          ]),
        ),
        durationMs: Schema.optional(Schema.Number),
        endTime: Schema.optional(Schema.String),
        filesRead: Schema.optional(Schema.Number),
        filesWritten: Schema.optional(Schema.Number),
        message: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        rowsCopied: Schema.optional(Schema.Number),
        rowsRead: Schema.optional(Schema.Number),
        sizeRead: Schema.optional(Schema.Number),
        sizeWritten: Schema.optional(Schema.Number),
        startTime: Schema.optional(Schema.String),
        status: Schema.optional(Schema.String),
        vCore: Schema.optional(Schema.Number),
      }),
    ),
  });
export type SharesListSynchronizationDetailsOutput =
  typeof SharesListSynchronizationDetailsOutput.Type;

// The operation
/**
 * List data set level details for a share synchronization
 *
 * List synchronization details
 *
 * @param shareName - The name of the share.
 * @param $skipToken - Continuation token
 * @param $filter - Filters the results using OData syntax.
 * @param $orderby - Sorts the results using OData syntax.
 */
export const SharesListSynchronizationDetails =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SharesListSynchronizationDetailsInput,
    outputSchema: SharesListSynchronizationDetailsOutput,
  }));
// Input Schema
export const SharesListSynchronizationsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    shareName: Schema.String.pipe(T.PathParam()),
    $skipToken: Schema.optional(Schema.String),
    $filter: Schema.optional(Schema.String),
    $orderby: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataShare/accounts/{accountName}/shares/{shareName}/listSynchronizations",
    }),
  );
export type SharesListSynchronizationsInput =
  typeof SharesListSynchronizationsInput.Type;

// Output Schema
export const SharesListSynchronizationsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.Array(
      Schema.Struct({
        consumerEmail: Schema.optional(Schema.String),
        consumerName: Schema.optional(Schema.String),
        consumerTenantName: Schema.optional(Schema.String),
        durationMs: Schema.optional(Schema.Number),
        endTime: Schema.optional(Schema.String),
        message: Schema.optional(Schema.String),
        startTime: Schema.optional(Schema.String),
        status: Schema.optional(Schema.String),
        synchronizationId: Schema.optional(Schema.String),
        synchronizationMode: Schema.optional(
          Schema.Literals(["Incremental", "FullSync"]),
        ),
      }),
    ),
  });
export type SharesListSynchronizationsOutput =
  typeof SharesListSynchronizationsOutput.Type;

// The operation
/**
 * List Synchronizations in a share
 *
 * List synchronizations of a share
 *
 * @param shareName - The name of the share.
 * @param $skipToken - Continuation token
 * @param $filter - Filters the results using OData syntax.
 * @param $orderby - Sorts the results using OData syntax.
 */
export const SharesListSynchronizations = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SharesListSynchronizationsInput,
    outputSchema: SharesListSynchronizationsOutput,
  }),
);
// Input Schema
export const ShareSubscriptionsCancelSynchronizationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    shareSubscriptionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataShare/accounts/{accountName}/shareSubscriptions/{shareSubscriptionName}/cancelSynchronization",
    }),
  );
export type ShareSubscriptionsCancelSynchronizationInput =
  typeof ShareSubscriptionsCancelSynchronizationInput.Type;

// Output Schema
export const ShareSubscriptionsCancelSynchronizationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    durationMs: Schema.optional(Schema.Number),
    endTime: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
    startTime: Schema.optional(Schema.String),
    status: Schema.optional(Schema.String),
    synchronizationId: Schema.String,
    synchronizationMode: Schema.optional(
      Schema.Literals(["Incremental", "FullSync"]),
    ),
  });
export type ShareSubscriptionsCancelSynchronizationOutput =
  typeof ShareSubscriptionsCancelSynchronizationOutput.Type;

// The operation
/**
 * Request cancellation of a data share snapshot
 *
 * Request to cancel a synchronization.
 *
 * @param shareSubscriptionName - The name of the shareSubscription.
 */
export const ShareSubscriptionsCancelSynchronization =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ShareSubscriptionsCancelSynchronizationInput,
    outputSchema: ShareSubscriptionsCancelSynchronizationOutput,
  }));
// Input Schema
export const ShareSubscriptionsCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    shareSubscriptionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataShare/accounts/{accountName}/shareSubscriptions/{shareSubscriptionName}",
    }),
  );
export type ShareSubscriptionsCreateInput =
  typeof ShareSubscriptionsCreateInput.Type;

// Output Schema
export const ShareSubscriptionsCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    systemData: Schema.optional(
      Schema.Struct({
        createdAt: Schema.optional(Schema.String),
        createdBy: Schema.optional(Schema.String),
        createdByType: Schema.optional(
          Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
        ),
        lastModifiedAt: Schema.optional(Schema.String),
        lastModifiedBy: Schema.optional(Schema.String),
        lastModifiedByType: Schema.optional(
          Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
        ),
      }),
    ),
    type: Schema.optional(Schema.String),
  });
export type ShareSubscriptionsCreateOutput =
  typeof ShareSubscriptionsCreateOutput.Type;

// The operation
/**
 * Create shareSubscription in an account.
 *
 * Create a shareSubscription in an account
 *
 * @param shareSubscriptionName - The name of the shareSubscription.
 */
export const ShareSubscriptionsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ShareSubscriptionsCreateInput,
    outputSchema: ShareSubscriptionsCreateOutput,
  }),
);
// Input Schema
export const ShareSubscriptionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    shareSubscriptionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataShare/accounts/{accountName}/shareSubscriptions/{shareSubscriptionName}",
    }),
  );
export type ShareSubscriptionsDeleteInput =
  typeof ShareSubscriptionsDeleteInput.Type;

// Output Schema
export const ShareSubscriptionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    endTime: Schema.optional(Schema.String),
    error: Schema.optional(
      Schema.Struct({
        code: Schema.String,
        details: Schema.optional(Schema.Array(Schema.Unknown)),
        message: Schema.String,
        target: Schema.optional(Schema.String),
      }),
    ),
    startTime: Schema.optional(Schema.String),
    status: Schema.Literals([
      "Accepted",
      "InProgress",
      "TransientFailure",
      "Succeeded",
      "Failed",
      "Canceled",
    ]),
  });
export type ShareSubscriptionsDeleteOutput =
  typeof ShareSubscriptionsDeleteOutput.Type;

// The operation
/**
 * Delete shareSubscription in an account.
 *
 * Delete a shareSubscription in an account
 *
 * @param shareSubscriptionName - The name of the shareSubscription.
 */
export const ShareSubscriptionsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ShareSubscriptionsDeleteInput,
    outputSchema: ShareSubscriptionsDeleteOutput,
  }),
);
// Input Schema
export const ShareSubscriptionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    shareSubscriptionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataShare/accounts/{accountName}/shareSubscriptions/{shareSubscriptionName}",
    }),
  );
export type ShareSubscriptionsGetInput = typeof ShareSubscriptionsGetInput.Type;

// Output Schema
export const ShareSubscriptionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    systemData: Schema.optional(
      Schema.Struct({
        createdAt: Schema.optional(Schema.String),
        createdBy: Schema.optional(Schema.String),
        createdByType: Schema.optional(
          Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
        ),
        lastModifiedAt: Schema.optional(Schema.String),
        lastModifiedBy: Schema.optional(Schema.String),
        lastModifiedByType: Schema.optional(
          Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
        ),
      }),
    ),
    type: Schema.optional(Schema.String),
  });
export type ShareSubscriptionsGetOutput =
  typeof ShareSubscriptionsGetOutput.Type;

// The operation
/**
 * Get shareSubscription in an account.
 *
 * Get a shareSubscription in an account
 *
 * @param shareSubscriptionName - The name of the shareSubscription.
 */
export const ShareSubscriptionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ShareSubscriptionsGetInput,
    outputSchema: ShareSubscriptionsGetOutput,
  }),
);
// Input Schema
export const ShareSubscriptionsListByAccountInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    $skipToken: Schema.optional(Schema.String),
    $filter: Schema.optional(Schema.String),
    $orderby: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataShare/accounts/{accountName}/shareSubscriptions",
    }),
  );
export type ShareSubscriptionsListByAccountInput =
  typeof ShareSubscriptionsListByAccountInput.Type;

// Output Schema
export const ShareSubscriptionsListByAccountOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        systemData: Schema.optional(
          Schema.Struct({
            createdAt: Schema.optional(Schema.String),
            createdBy: Schema.optional(Schema.String),
            createdByType: Schema.optional(
              Schema.Literals([
                "User",
                "Application",
                "ManagedIdentity",
                "Key",
              ]),
            ),
            lastModifiedAt: Schema.optional(Schema.String),
            lastModifiedBy: Schema.optional(Schema.String),
            lastModifiedByType: Schema.optional(
              Schema.Literals([
                "User",
                "Application",
                "ManagedIdentity",
                "Key",
              ]),
            ),
          }),
        ),
        type: Schema.optional(Schema.String),
      }),
    ),
  });
export type ShareSubscriptionsListByAccountOutput =
  typeof ShareSubscriptionsListByAccountOutput.Type;

// The operation
/**
 * List of available share subscriptions under an account.
 *
 * List share subscriptions in an account
 *
 * @param $skipToken - Continuation Token
 * @param $filter - Filters the results using OData syntax.
 * @param $orderby - Sorts the results using OData syntax.
 */
export const ShareSubscriptionsListByAccount =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ShareSubscriptionsListByAccountInput,
    outputSchema: ShareSubscriptionsListByAccountOutput,
  }));
// Input Schema
export const ShareSubscriptionsListSourceShareSynchronizationSettingsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    shareSubscriptionName: Schema.String.pipe(T.PathParam()),
    $skipToken: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataShare/accounts/{accountName}/shareSubscriptions/{shareSubscriptionName}/listSourceShareSynchronizationSettings",
    }),
  );
export type ShareSubscriptionsListSourceShareSynchronizationSettingsInput =
  typeof ShareSubscriptionsListSourceShareSynchronizationSettingsInput.Type;

// Output Schema
export const ShareSubscriptionsListSourceShareSynchronizationSettingsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.Array(
      Schema.Struct({
        kind: Schema.Literals(["ScheduleBased"]),
      }),
    ),
  });
export type ShareSubscriptionsListSourceShareSynchronizationSettingsOutput =
  typeof ShareSubscriptionsListSourceShareSynchronizationSettingsOutput.Type;

// The operation
/**
 * Get source share synchronization settings for a shareSubscription.
 *
 * Get synchronization settings set on a share
 *
 * @param shareSubscriptionName - The name of the shareSubscription.
 * @param $skipToken - Continuation token
 */
export const ShareSubscriptionsListSourceShareSynchronizationSettings =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ShareSubscriptionsListSourceShareSynchronizationSettingsInput,
    outputSchema:
      ShareSubscriptionsListSourceShareSynchronizationSettingsOutput,
  }));
// Input Schema
export const ShareSubscriptionsListSynchronizationDetailsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    shareSubscriptionName: Schema.String.pipe(T.PathParam()),
    $skipToken: Schema.optional(Schema.String),
    $filter: Schema.optional(Schema.String),
    $orderby: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataShare/accounts/{accountName}/shareSubscriptions/{shareSubscriptionName}/listSynchronizationDetails",
    }),
  );
export type ShareSubscriptionsListSynchronizationDetailsInput =
  typeof ShareSubscriptionsListSynchronizationDetailsInput.Type;

// Output Schema
export const ShareSubscriptionsListSynchronizationDetailsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.Array(
      Schema.Struct({
        dataSetId: Schema.optional(Schema.String),
        dataSetType: Schema.optional(
          Schema.Literals([
            "Blob",
            "Container",
            "BlobFolder",
            "AdlsGen2FileSystem",
            "AdlsGen2Folder",
            "AdlsGen2File",
            "AdlsGen1Folder",
            "AdlsGen1File",
            "KustoCluster",
            "KustoDatabase",
            "KustoTable",
            "SqlDBTable",
            "SqlDWTable",
            "SynapseWorkspaceSqlPoolTable",
          ]),
        ),
        durationMs: Schema.optional(Schema.Number),
        endTime: Schema.optional(Schema.String),
        filesRead: Schema.optional(Schema.Number),
        filesWritten: Schema.optional(Schema.Number),
        message: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        rowsCopied: Schema.optional(Schema.Number),
        rowsRead: Schema.optional(Schema.Number),
        sizeRead: Schema.optional(Schema.Number),
        sizeWritten: Schema.optional(Schema.Number),
        startTime: Schema.optional(Schema.String),
        status: Schema.optional(Schema.String),
        vCore: Schema.optional(Schema.Number),
      }),
    ),
  });
export type ShareSubscriptionsListSynchronizationDetailsOutput =
  typeof ShareSubscriptionsListSynchronizationDetailsOutput.Type;

// The operation
/**
 * List data set level details for a share subscription synchronization
 *
 * List synchronization details
 *
 * @param shareSubscriptionName - The name of the share subscription.
 * @param $skipToken - Continuation token
 * @param $filter - Filters the results using OData syntax.
 * @param $orderby - Sorts the results using OData syntax.
 */
export const ShareSubscriptionsListSynchronizationDetails =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ShareSubscriptionsListSynchronizationDetailsInput,
    outputSchema: ShareSubscriptionsListSynchronizationDetailsOutput,
  }));
// Input Schema
export const ShareSubscriptionsListSynchronizationsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    shareSubscriptionName: Schema.String.pipe(T.PathParam()),
    $skipToken: Schema.optional(Schema.String),
    $filter: Schema.optional(Schema.String),
    $orderby: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataShare/accounts/{accountName}/shareSubscriptions/{shareSubscriptionName}/listSynchronizations",
    }),
  );
export type ShareSubscriptionsListSynchronizationsInput =
  typeof ShareSubscriptionsListSynchronizationsInput.Type;

// Output Schema
export const ShareSubscriptionsListSynchronizationsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.Array(
      Schema.Struct({
        durationMs: Schema.optional(Schema.Number),
        endTime: Schema.optional(Schema.String),
        message: Schema.optional(Schema.String),
        startTime: Schema.optional(Schema.String),
        status: Schema.optional(Schema.String),
        synchronizationId: Schema.String,
        synchronizationMode: Schema.optional(
          Schema.Literals(["Incremental", "FullSync"]),
        ),
      }),
    ),
  });
export type ShareSubscriptionsListSynchronizationsOutput =
  typeof ShareSubscriptionsListSynchronizationsOutput.Type;

// The operation
/**
 * List Synchronizations in a share subscription.
 *
 * List synchronizations of a share subscription
 *
 * @param shareSubscriptionName - The name of the share subscription.
 * @param $skipToken - Continuation token
 * @param $filter - Filters the results using OData syntax.
 * @param $orderby - Sorts the results using OData syntax.
 */
export const ShareSubscriptionsListSynchronizations =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ShareSubscriptionsListSynchronizationsInput,
    outputSchema: ShareSubscriptionsListSynchronizationsOutput,
  }));
// Input Schema
export const ShareSubscriptionsSynchronizeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    shareSubscriptionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataShare/accounts/{accountName}/shareSubscriptions/{shareSubscriptionName}/synchronize",
    }),
  );
export type ShareSubscriptionsSynchronizeInput =
  typeof ShareSubscriptionsSynchronizeInput.Type;

// Output Schema
export const ShareSubscriptionsSynchronizeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    durationMs: Schema.optional(Schema.Number),
    endTime: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
    startTime: Schema.optional(Schema.String),
    status: Schema.optional(Schema.String),
    synchronizationId: Schema.String,
    synchronizationMode: Schema.optional(
      Schema.Literals(["Incremental", "FullSync"]),
    ),
  });
export type ShareSubscriptionsSynchronizeOutput =
  typeof ShareSubscriptionsSynchronizeOutput.Type;

// The operation
/**
 * Initiate an asynchronous data share job
 *
 * Initiate a copy
 *
 * @param shareSubscriptionName - The name of share subscription
 */
export const ShareSubscriptionsSynchronize =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ShareSubscriptionsSynchronizeInput,
    outputSchema: ShareSubscriptionsSynchronizeOutput,
  }));
// Input Schema
export const SynchronizationSettingsCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    shareName: Schema.String.pipe(T.PathParam()),
    synchronizationSettingName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataShare/accounts/{accountName}/shares/{shareName}/synchronizationSettings/{synchronizationSettingName}",
    }),
  );
export type SynchronizationSettingsCreateInput =
  typeof SynchronizationSettingsCreateInput.Type;

// Output Schema
export const SynchronizationSettingsCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    systemData: Schema.optional(
      Schema.Struct({
        createdAt: Schema.optional(Schema.String),
        createdBy: Schema.optional(Schema.String),
        createdByType: Schema.optional(
          Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
        ),
        lastModifiedAt: Schema.optional(Schema.String),
        lastModifiedBy: Schema.optional(Schema.String),
        lastModifiedByType: Schema.optional(
          Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
        ),
      }),
    ),
    type: Schema.optional(Schema.String),
  });
export type SynchronizationSettingsCreateOutput =
  typeof SynchronizationSettingsCreateOutput.Type;

// The operation
/**
 * Adds a new synchronization setting to an existing share.
 *
 * Create a synchronizationSetting
 *
 * @param shareName - The name of the share to add the synchronization setting to.
 * @param synchronizationSettingName - The name of the synchronizationSetting.
 */
export const SynchronizationSettingsCreate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SynchronizationSettingsCreateInput,
    outputSchema: SynchronizationSettingsCreateOutput,
  }));
// Input Schema
export const SynchronizationSettingsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    shareName: Schema.String.pipe(T.PathParam()),
    synchronizationSettingName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataShare/accounts/{accountName}/shares/{shareName}/synchronizationSettings/{synchronizationSettingName}",
    }),
  );
export type SynchronizationSettingsDeleteInput =
  typeof SynchronizationSettingsDeleteInput.Type;

// Output Schema
export const SynchronizationSettingsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    endTime: Schema.optional(Schema.String),
    error: Schema.optional(
      Schema.Struct({
        code: Schema.String,
        details: Schema.optional(Schema.Array(Schema.Unknown)),
        message: Schema.String,
        target: Schema.optional(Schema.String),
      }),
    ),
    startTime: Schema.optional(Schema.String),
    status: Schema.Literals([
      "Accepted",
      "InProgress",
      "TransientFailure",
      "Succeeded",
      "Failed",
      "Canceled",
    ]),
  });
export type SynchronizationSettingsDeleteOutput =
  typeof SynchronizationSettingsDeleteOutput.Type;

// The operation
/**
 * Delete synchronizationSetting in a share.
 *
 * Delete a synchronizationSetting in a share
 *
 * @param shareName - The name of the share.
 * @param synchronizationSettingName - The name of the synchronizationSetting .
 */
export const SynchronizationSettingsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SynchronizationSettingsDeleteInput,
    outputSchema: SynchronizationSettingsDeleteOutput,
  }));
// Input Schema
export const SynchronizationSettingsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    shareName: Schema.String.pipe(T.PathParam()),
    synchronizationSettingName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataShare/accounts/{accountName}/shares/{shareName}/synchronizationSettings/{synchronizationSettingName}",
    }),
  );
export type SynchronizationSettingsGetInput =
  typeof SynchronizationSettingsGetInput.Type;

// Output Schema
export const SynchronizationSettingsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    systemData: Schema.optional(
      Schema.Struct({
        createdAt: Schema.optional(Schema.String),
        createdBy: Schema.optional(Schema.String),
        createdByType: Schema.optional(
          Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
        ),
        lastModifiedAt: Schema.optional(Schema.String),
        lastModifiedBy: Schema.optional(Schema.String),
        lastModifiedByType: Schema.optional(
          Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
        ),
      }),
    ),
    type: Schema.optional(Schema.String),
  });
export type SynchronizationSettingsGetOutput =
  typeof SynchronizationSettingsGetOutput.Type;

// The operation
/**
 * Get synchronizationSetting in a share.
 *
 * Get a synchronizationSetting in a share
 *
 * @param shareName - The name of the share.
 * @param synchronizationSettingName - The name of the synchronizationSetting.
 */
export const SynchronizationSettingsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SynchronizationSettingsGetInput,
    outputSchema: SynchronizationSettingsGetOutput,
  }),
);
// Input Schema
export const SynchronizationSettingsListByShareInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    shareName: Schema.String.pipe(T.PathParam()),
    $skipToken: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataShare/accounts/{accountName}/shares/{shareName}/synchronizationSettings",
    }),
  );
export type SynchronizationSettingsListByShareInput =
  typeof SynchronizationSettingsListByShareInput.Type;

// Output Schema
export const SynchronizationSettingsListByShareOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        systemData: Schema.optional(
          Schema.Struct({
            createdAt: Schema.optional(Schema.String),
            createdBy: Schema.optional(Schema.String),
            createdByType: Schema.optional(
              Schema.Literals([
                "User",
                "Application",
                "ManagedIdentity",
                "Key",
              ]),
            ),
            lastModifiedAt: Schema.optional(Schema.String),
            lastModifiedBy: Schema.optional(Schema.String),
            lastModifiedByType: Schema.optional(
              Schema.Literals([
                "User",
                "Application",
                "ManagedIdentity",
                "Key",
              ]),
            ),
          }),
        ),
        type: Schema.optional(Schema.String),
      }),
    ),
  });
export type SynchronizationSettingsListByShareOutput =
  typeof SynchronizationSettingsListByShareOutput.Type;

// The operation
/**
 * List synchronizationSettings in a share.
 *
 * List synchronizationSettings in a share
 *
 * @param shareName - The name of the share.
 * @param $skipToken - continuation token
 */
export const SynchronizationSettingsListByShare =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SynchronizationSettingsListByShareInput,
    outputSchema: SynchronizationSettingsListByShareOutput,
  }));
// Input Schema
export const TriggersCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  shareSubscriptionName: Schema.String.pipe(T.PathParam()),
  triggerName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataShare/accounts/{accountName}/shareSubscriptions/{shareSubscriptionName}/triggers/{triggerName}",
  }),
);
export type TriggersCreateInput = typeof TriggersCreateInput.Type;

// Output Schema
export const TriggersCreateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  systemData: Schema.optional(
    Schema.Struct({
      createdAt: Schema.optional(Schema.String),
      createdBy: Schema.optional(Schema.String),
      createdByType: Schema.optional(
        Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
      ),
      lastModifiedAt: Schema.optional(Schema.String),
      lastModifiedBy: Schema.optional(Schema.String),
      lastModifiedByType: Schema.optional(
        Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
      ),
    }),
  ),
  type: Schema.optional(Schema.String),
});
export type TriggersCreateOutput = typeof TriggersCreateOutput.Type;

// The operation
/**
 * This method creates a trigger for a share subscription
 *
 * Create a Trigger
 *
 * @param shareSubscriptionName - The name of the share subscription which will hold the data set sink.
 * @param triggerName - The name of the trigger.
 */
export const TriggersCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TriggersCreateInput,
  outputSchema: TriggersCreateOutput,
}));
// Input Schema
export const TriggersDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  shareSubscriptionName: Schema.String.pipe(T.PathParam()),
  triggerName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataShare/accounts/{accountName}/shareSubscriptions/{shareSubscriptionName}/triggers/{triggerName}",
  }),
);
export type TriggersDeleteInput = typeof TriggersDeleteInput.Type;

// Output Schema
export const TriggersDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  endTime: Schema.optional(Schema.String),
  error: Schema.optional(
    Schema.Struct({
      code: Schema.String,
      details: Schema.optional(Schema.Array(Schema.Unknown)),
      message: Schema.String,
      target: Schema.optional(Schema.String),
    }),
  ),
  startTime: Schema.optional(Schema.String),
  status: Schema.Literals([
    "Accepted",
    "InProgress",
    "TransientFailure",
    "Succeeded",
    "Failed",
    "Canceled",
  ]),
});
export type TriggersDeleteOutput = typeof TriggersDeleteOutput.Type;

// The operation
/**
 * Delete Trigger in a shareSubscription.
 *
 * Delete a Trigger in a shareSubscription
 *
 * @param shareSubscriptionName - The name of the shareSubscription.
 * @param triggerName - The name of the trigger.
 */
export const TriggersDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TriggersDeleteInput,
  outputSchema: TriggersDeleteOutput,
}));
// Input Schema
export const TriggersGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  shareSubscriptionName: Schema.String.pipe(T.PathParam()),
  triggerName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataShare/accounts/{accountName}/shareSubscriptions/{shareSubscriptionName}/triggers/{triggerName}",
  }),
);
export type TriggersGetInput = typeof TriggersGetInput.Type;

// Output Schema
export const TriggersGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  systemData: Schema.optional(
    Schema.Struct({
      createdAt: Schema.optional(Schema.String),
      createdBy: Schema.optional(Schema.String),
      createdByType: Schema.optional(
        Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
      ),
      lastModifiedAt: Schema.optional(Schema.String),
      lastModifiedBy: Schema.optional(Schema.String),
      lastModifiedByType: Schema.optional(
        Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
      ),
    }),
  ),
  type: Schema.optional(Schema.String),
});
export type TriggersGetOutput = typeof TriggersGetOutput.Type;

// The operation
/**
 * Get Trigger in a shareSubscription.
 *
 * Get a Trigger in a shareSubscription
 *
 * @param shareSubscriptionName - The name of the shareSubscription.
 * @param triggerName - The name of the trigger.
 */
export const TriggersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TriggersGetInput,
  outputSchema: TriggersGetOutput,
}));
// Input Schema
export const TriggersListByShareSubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    shareSubscriptionName: Schema.String.pipe(T.PathParam()),
    $skipToken: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataShare/accounts/{accountName}/shareSubscriptions/{shareSubscriptionName}/triggers",
    }),
  );
export type TriggersListByShareSubscriptionInput =
  typeof TriggersListByShareSubscriptionInput.Type;

// Output Schema
export const TriggersListByShareSubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        systemData: Schema.optional(
          Schema.Struct({
            createdAt: Schema.optional(Schema.String),
            createdBy: Schema.optional(Schema.String),
            createdByType: Schema.optional(
              Schema.Literals([
                "User",
                "Application",
                "ManagedIdentity",
                "Key",
              ]),
            ),
            lastModifiedAt: Schema.optional(Schema.String),
            lastModifiedBy: Schema.optional(Schema.String),
            lastModifiedByType: Schema.optional(
              Schema.Literals([
                "User",
                "Application",
                "ManagedIdentity",
                "Key",
              ]),
            ),
          }),
        ),
        type: Schema.optional(Schema.String),
      }),
    ),
  });
export type TriggersListByShareSubscriptionOutput =
  typeof TriggersListByShareSubscriptionOutput.Type;

// The operation
/**
 * List Triggers in a share subscription.
 *
 * List Triggers in a share subscription
 *
 * @param shareSubscriptionName - The name of the share subscription.
 * @param $skipToken - Continuation token
 */
export const TriggersListByShareSubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: TriggersListByShareSubscriptionInput,
    outputSchema: TriggersListByShareSubscriptionOutput,
  }));
