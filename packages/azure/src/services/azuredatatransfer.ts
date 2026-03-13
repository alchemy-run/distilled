/**
 * Azure Azuredatatransfer API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";
import { SensitiveString } from "../sensitive.ts";

// Input Schema
export const AzureDataTransferListApprovedSchemasInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.AzureDataTransfer/listApprovedSchemas",
    }),
  );
export type AzureDataTransferListApprovedSchemasInput =
  typeof AzureDataTransferListApprovedSchemasInput.Type;

// Output Schema
export const AzureDataTransferListApprovedSchemasOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          connectionId: Schema.optional(Schema.String),
          status: Schema.optional(Schema.Literals(["New", "Approved"])),
          name: Schema.optional(Schema.String),
          content: Schema.optional(Schema.String),
          direction: Schema.optional(Schema.Literals(["Send", "Receive"])),
          schemaUri: Schema.optional(Schema.String),
          schemaType: Schema.optional(Schema.Literals(["Xsd", "Zip"])),
        }),
      ),
    ),
  });
export type AzureDataTransferListApprovedSchemasOutput =
  typeof AzureDataTransferListApprovedSchemasOutput.Type;

// The operation
/**
 * Retrieves the list of approved schemas available for Azure Data Transfer. This operation has reached end of life support starting version 2025-05-30-preview. For schema support please create and use a FlowProfile resource.
 *
 * @param api-version - The API version to use for this operation.
 */
export const AzureDataTransferListApprovedSchemas =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AzureDataTransferListApprovedSchemasInput,
    outputSchema: AzureDataTransferListApprovedSchemasOutput,
  }));
// Input Schema
export const AzureDataTransferValidateSchemaInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.AzureDataTransfer/validateSchema",
    }),
  );
export type AzureDataTransferValidateSchemaInput =
  typeof AzureDataTransferValidateSchemaInput.Type;

// Output Schema
export const AzureDataTransferValidateSchemaOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    status: Schema.optional(Schema.Literals(["Succeeded", "Failed"])),
    message: Schema.optional(Schema.String),
  });
export type AzureDataTransferValidateSchemaOutput =
  typeof AzureDataTransferValidateSchemaOutput.Type;

// The operation
/**
 * Validates the structure and content of a schema for use in Azure Data Transfer. This operation has reached end of life support starting version 2025-05-30-preview. For schema support please create and use a FlowProfile resource.
 *
 * @param api-version - The API version to use for this operation.
 */
export const AzureDataTransferValidateSchema =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AzureDataTransferValidateSchemaInput,
    outputSchema: AzureDataTransferValidateSchemaOutput,
  }));
// Input Schema
export const ConnectionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    connectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/connections/{connectionName}",
    }),
  );
export type ConnectionsCreateOrUpdateInput =
  typeof ConnectionsCreateOrUpdateInput.Type;

// Output Schema
export const ConnectionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ConnectionsCreateOrUpdateOutput =
  typeof ConnectionsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates the connection resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param connectionName - The name for the connection to perform the operation on.
 */
export const ConnectionsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ConnectionsCreateOrUpdateInput,
    outputSchema: ConnectionsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const ConnectionsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    connectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/connections/{connectionName}",
  }),
);
export type ConnectionsDeleteInput = typeof ConnectionsDeleteInput.Type;

// Output Schema
export const ConnectionsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ConnectionsDeleteOutput = typeof ConnectionsDeleteOutput.Type;

// The operation
/**
 * Deletes the connection resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param connectionName - The name for the connection to perform the operation on.
 */
export const ConnectionsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ConnectionsDeleteInput,
  outputSchema: ConnectionsDeleteOutput,
}));
// Input Schema
export const ConnectionsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  connectionName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/connections/{connectionName}",
  }),
);
export type ConnectionsGetInput = typeof ConnectionsGetInput.Type;

// Output Schema
export const ConnectionsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type ConnectionsGetOutput = typeof ConnectionsGetOutput.Type;

// The operation
/**
 * Gets connection resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param connectionName - The name for the connection to perform the operation on.
 */
export const ConnectionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ConnectionsGetInput,
  outputSchema: ConnectionsGetOutput,
}));
// Input Schema
export const ConnectionsLinkInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  connectionName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/connections/{connectionName}/link",
  }),
);
export type ConnectionsLinkInput = typeof ConnectionsLinkInput.Type;

// Output Schema
export const ConnectionsLinkOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type ConnectionsLinkOutput = typeof ConnectionsLinkOutput.Type;

// The operation
/**
 * Links the connection to its pending connection.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param connectionName - The name for the connection to perform the operation on.
 */
export const ConnectionsLink = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ConnectionsLinkInput,
  outputSchema: ConnectionsLinkOutput,
}));
// Input Schema
export const ConnectionsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/connections",
    }),
  );
export type ConnectionsListByResourceGroupInput =
  typeof ConnectionsListByResourceGroupInput.Type;

// Output Schema
export const ConnectionsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ConnectionsListByResourceGroupOutput =
  typeof ConnectionsListByResourceGroupOutput.Type;

// The operation
/**
 * Gets connections in a resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ConnectionsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConnectionsListByResourceGroupInput,
    outputSchema: ConnectionsListByResourceGroupOutput,
  }));
// Input Schema
export const ConnectionsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AzureDataTransfer/connections",
    }),
  );
export type ConnectionsListBySubscriptionInput =
  typeof ConnectionsListBySubscriptionInput.Type;

// Output Schema
export const ConnectionsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ConnectionsListBySubscriptionOutput =
  typeof ConnectionsListBySubscriptionOutput.Type;

// The operation
/**
 * Gets connections in a subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const ConnectionsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConnectionsListBySubscriptionInput,
    outputSchema: ConnectionsListBySubscriptionOutput,
  }));
// Input Schema
export const ConnectionsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    connectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/connections/{connectionName}",
  }),
);
export type ConnectionsUpdateInput = typeof ConnectionsUpdateInput.Type;

// Output Schema
export const ConnectionsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ConnectionsUpdateOutput = typeof ConnectionsUpdateOutput.Type;

// The operation
/**
 * Updates the connection resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param connectionName - The name for the connection to perform the operation on.
 */
export const ConnectionsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ConnectionsUpdateInput,
  outputSchema: ConnectionsUpdateOutput,
}));
// Input Schema
export const FlowsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    connectionName: Schema.String.pipe(T.PathParam()),
    flowName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/connections/{connectionName}/flows/{flowName}",
    }),
  );
export type FlowsCreateOrUpdateInput = typeof FlowsCreateOrUpdateInput.Type;

// Output Schema
export const FlowsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type FlowsCreateOrUpdateOutput = typeof FlowsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates the flow resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param connectionName - The name for the connection to perform the operation on.
 * @param flowName - The name for the flow to perform the operation on.
 */
export const FlowsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FlowsCreateOrUpdateInput,
  outputSchema: FlowsCreateOrUpdateOutput,
}));
// Input Schema
export const FlowsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  connectionName: Schema.String.pipe(T.PathParam()),
  flowName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/connections/{connectionName}/flows/{flowName}",
  }),
);
export type FlowsDeleteInput = typeof FlowsDeleteInput.Type;

// Output Schema
export const FlowsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type FlowsDeleteOutput = typeof FlowsDeleteOutput.Type;

// The operation
/**
 * Deletes the flow resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param connectionName - The name for the connection to perform the operation on.
 * @param flowName - The name for the flow to perform the operation on.
 */
export const FlowsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FlowsDeleteInput,
  outputSchema: FlowsDeleteOutput,
}));
// Input Schema
export const FlowsDisableInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  connectionName: Schema.String.pipe(T.PathParam()),
  flowName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/connections/{connectionName}/flows/{flowName}/disable",
  }),
);
export type FlowsDisableInput = typeof FlowsDisableInput.Type;

// Output Schema
export const FlowsDisableOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type FlowsDisableOutput = typeof FlowsDisableOutput.Type;

// The operation
/**
 * Disables the specified flow
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param connectionName - The name for the connection to perform the operation on.
 * @param flowName - The name for the flow to perform the operation on.
 */
export const FlowsDisable = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FlowsDisableInput,
  outputSchema: FlowsDisableOutput,
}));
// Input Schema
export const FlowsEnableInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  connectionName: Schema.String.pipe(T.PathParam()),
  flowName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/connections/{connectionName}/flows/{flowName}/enable",
  }),
);
export type FlowsEnableInput = typeof FlowsEnableInput.Type;

// Output Schema
export const FlowsEnableOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type FlowsEnableOutput = typeof FlowsEnableOutput.Type;

// The operation
/**
 * Enables the specified flow.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param connectionName - The name for the connection to perform the operation on.
 * @param flowName - The name for the flow to perform the operation on.
 */
export const FlowsEnable = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FlowsEnableInput,
  outputSchema: FlowsEnableOutput,
}));
// Input Schema
export const FlowsGeneratePassphraseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    connectionName: Schema.String.pipe(T.PathParam()),
    flowName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/connections/{connectionName}/flows/{flowName}/generatePassphrase",
    }),
  );
export type FlowsGeneratePassphraseInput =
  typeof FlowsGeneratePassphraseInput.Type;

// Output Schema
export const FlowsGeneratePassphraseOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type FlowsGeneratePassphraseOutput =
  typeof FlowsGeneratePassphraseOutput.Type;

// The operation
/**
 * Generate a compliant passphrase for the specified flow.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param connectionName - The name for the connection to perform the operation on.
 * @param flowName - The name for the flow to perform the operation on.
 */
export const FlowsGeneratePassphrase = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: FlowsGeneratePassphraseInput,
    outputSchema: FlowsGeneratePassphraseOutput,
  }),
);
// Input Schema
export const FlowsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  connectionName: Schema.String.pipe(T.PathParam()),
  flowName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/connections/{connectionName}/flows/{flowName}",
  }),
);
export type FlowsGetInput = typeof FlowsGetInput.Type;

// Output Schema
export const FlowsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type FlowsGetOutput = typeof FlowsGetOutput.Type;

// The operation
/**
 * Gets flow resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param connectionName - The name for the connection to perform the operation on.
 * @param flowName - The name for the flow to perform the operation on.
 */
export const FlowsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FlowsGetInput,
  outputSchema: FlowsGetOutput,
}));
// Input Schema
export const FlowsGetDestinationEndpointPortsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    connectionName: Schema.String.pipe(T.PathParam()),
    flowName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/connections/{connectionName}/flows/{flowName}/getDestinationEndpointPorts",
    }),
  );
export type FlowsGetDestinationEndpointPortsInput =
  typeof FlowsGetDestinationEndpointPortsInput.Type;

// Output Schema
export const FlowsGetDestinationEndpointPortsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ports: Schema.optional(Schema.Array(Schema.Number)),
  });
export type FlowsGetDestinationEndpointPortsOutput =
  typeof FlowsGetDestinationEndpointPortsOutput.Type;

// The operation
/**
 * Get the destination endpoint ports for the specified flow.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param connectionName - The name for the connection to perform the operation on.
 * @param flowName - The name for the flow to perform the operation on.
 */
export const FlowsGetDestinationEndpointPorts =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: FlowsGetDestinationEndpointPortsInput,
    outputSchema: FlowsGetDestinationEndpointPortsOutput,
  }));
// Input Schema
export const FlowsGetDestinationEndpointsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    connectionName: Schema.String.pipe(T.PathParam()),
    flowName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/connections/{connectionName}/flows/{flowName}/getDestinationEndpoints",
    }),
  );
export type FlowsGetDestinationEndpointsInput =
  typeof FlowsGetDestinationEndpointsInput.Type;

// Output Schema
export const FlowsGetDestinationEndpointsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    endpoints: Schema.optional(Schema.Array(Schema.String)),
  });
export type FlowsGetDestinationEndpointsOutput =
  typeof FlowsGetDestinationEndpointsOutput.Type;

// The operation
/**
 * Get the destination endpoints for the specified flow.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param connectionName - The name for the connection to perform the operation on.
 * @param flowName - The name for the flow to perform the operation on.
 */
export const FlowsGetDestinationEndpoints =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: FlowsGetDestinationEndpointsInput,
    outputSchema: FlowsGetDestinationEndpointsOutput,
  }));
// Input Schema
export const FlowsGetSourceAddressesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    connectionName: Schema.String.pipe(T.PathParam()),
    flowName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/connections/{connectionName}/flows/{flowName}/getSourceAddresses",
    }),
  );
export type FlowsGetSourceAddressesInput =
  typeof FlowsGetSourceAddressesInput.Type;

// Output Schema
export const FlowsGetSourceAddressesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    sourceAddresses: Schema.optional(Schema.Array(Schema.String)),
  });
export type FlowsGetSourceAddressesOutput =
  typeof FlowsGetSourceAddressesOutput.Type;

// The operation
/**
 * Get the source addresses for the specified flow.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param connectionName - The name for the connection to perform the operation on.
 * @param flowName - The name for the flow to perform the operation on.
 */
export const FlowsGetSourceAddresses = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: FlowsGetSourceAddressesInput,
    outputSchema: FlowsGetSourceAddressesOutput,
  }),
);
// Input Schema
export const FlowsGetStreamConnectionStringInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    connectionName: Schema.String.pipe(T.PathParam()),
    flowName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/connections/{connectionName}/flows/{flowName}/getStreamConnectionString",
    }),
  );
export type FlowsGetStreamConnectionStringInput =
  typeof FlowsGetStreamConnectionStringInput.Type;

// Output Schema
export const FlowsGetStreamConnectionStringOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    connectionString: Schema.optional(SensitiveString),
  });
export type FlowsGetStreamConnectionStringOutput =
  typeof FlowsGetStreamConnectionStringOutput.Type;

// The operation
/**
 * Get the connection string for the specified flow.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param connectionName - The name for the connection to perform the operation on.
 * @param flowName - The name for the flow to perform the operation on.
 */
export const FlowsGetStreamConnectionString =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: FlowsGetStreamConnectionStringInput,
    outputSchema: FlowsGetStreamConnectionStringOutput,
  }));
// Input Schema
export const FlowsLinkInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  connectionName: Schema.String.pipe(T.PathParam()),
  flowName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/connections/{connectionName}/flows/{flowName}/link",
  }),
);
export type FlowsLinkInput = typeof FlowsLinkInput.Type;

// Output Schema
export const FlowsLinkOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type FlowsLinkOutput = typeof FlowsLinkOutput.Type;

// The operation
/**
 * Links the specified flow.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param connectionName - The name for the connection to perform the operation on.
 * @param flowName - The name for the flow to perform the operation on.
 */
export const FlowsLink = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FlowsLinkInput,
  outputSchema: FlowsLinkOutput,
}));
// Input Schema
export const FlowsListByConnectionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    connectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/connections/{connectionName}/flows",
    }),
  );
export type FlowsListByConnectionInput = typeof FlowsListByConnectionInput.Type;

// Output Schema
export const FlowsListByConnectionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type FlowsListByConnectionOutput =
  typeof FlowsListByConnectionOutput.Type;

// The operation
/**
 * Gets flows in a connection.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param connectionName - The name for the connection to perform the operation on.
 */
export const FlowsListByConnection = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: FlowsListByConnectionInput,
    outputSchema: FlowsListByConnectionOutput,
  }),
);
// Input Schema
export const FlowsSetDestinationEndpointPortsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    connectionName: Schema.String.pipe(T.PathParam()),
    flowName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/connections/{connectionName}/flows/{flowName}/setDestinationEndpointPorts",
    }),
  );
export type FlowsSetDestinationEndpointPortsInput =
  typeof FlowsSetDestinationEndpointPortsInput.Type;

// Output Schema
export const FlowsSetDestinationEndpointPortsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type FlowsSetDestinationEndpointPortsOutput =
  typeof FlowsSetDestinationEndpointPortsOutput.Type;

// The operation
/**
 * Set the destination endpoint ports for the specified flow.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param connectionName - The name for the connection to perform the operation on.
 * @param flowName - The name for the flow to perform the operation on.
 */
export const FlowsSetDestinationEndpointPorts =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: FlowsSetDestinationEndpointPortsInput,
    outputSchema: FlowsSetDestinationEndpointPortsOutput,
  }));
// Input Schema
export const FlowsSetDestinationEndpointsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    connectionName: Schema.String.pipe(T.PathParam()),
    flowName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/connections/{connectionName}/flows/{flowName}/setDestinationEndpoints",
    }),
  );
export type FlowsSetDestinationEndpointsInput =
  typeof FlowsSetDestinationEndpointsInput.Type;

// Output Schema
export const FlowsSetDestinationEndpointsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type FlowsSetDestinationEndpointsOutput =
  typeof FlowsSetDestinationEndpointsOutput.Type;

// The operation
/**
 * Set the destination endpoints for the specified flow.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param connectionName - The name for the connection to perform the operation on.
 * @param flowName - The name for the flow to perform the operation on.
 */
export const FlowsSetDestinationEndpoints =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: FlowsSetDestinationEndpointsInput,
    outputSchema: FlowsSetDestinationEndpointsOutput,
  }));
// Input Schema
export const FlowsSetPassphraseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    connectionName: Schema.String.pipe(T.PathParam()),
    flowName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/connections/{connectionName}/flows/{flowName}/setPassphrase",
    }),
  );
export type FlowsSetPassphraseInput = typeof FlowsSetPassphraseInput.Type;

// Output Schema
export const FlowsSetPassphraseOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type FlowsSetPassphraseOutput = typeof FlowsSetPassphraseOutput.Type;

// The operation
/**
 * Sets the passphrase of the specified flow.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param connectionName - The name for the connection to perform the operation on.
 * @param flowName - The name for the flow to perform the operation on.
 */
export const FlowsSetPassphrase = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FlowsSetPassphraseInput,
  outputSchema: FlowsSetPassphraseOutput,
}));
// Input Schema
export const FlowsSetSourceAddressesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    connectionName: Schema.String.pipe(T.PathParam()),
    flowName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/connections/{connectionName}/flows/{flowName}/setSourceAddresses",
    }),
  );
export type FlowsSetSourceAddressesInput =
  typeof FlowsSetSourceAddressesInput.Type;

// Output Schema
export const FlowsSetSourceAddressesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type FlowsSetSourceAddressesOutput =
  typeof FlowsSetSourceAddressesOutput.Type;

// The operation
/**
 * Set the source addresses for the specified flow.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param connectionName - The name for the connection to perform the operation on.
 * @param flowName - The name for the flow to perform the operation on.
 */
export const FlowsSetSourceAddresses = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: FlowsSetSourceAddressesInput,
    outputSchema: FlowsSetSourceAddressesOutput,
  }),
);
// Input Schema
export const FlowsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  connectionName: Schema.String.pipe(T.PathParam()),
  flowName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/connections/{connectionName}/flows/{flowName}",
  }),
);
export type FlowsUpdateInput = typeof FlowsUpdateInput.Type;

// Output Schema
export const FlowsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type FlowsUpdateOutput = typeof FlowsUpdateOutput.Type;

// The operation
/**
 * Updates the flow resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param connectionName - The name for the connection to perform the operation on.
 * @param flowName - The name for the flow to perform the operation on.
 */
export const FlowsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FlowsUpdateInput,
  outputSchema: FlowsUpdateOutput,
}));
// Input Schema
export const ListFlowsByPipelineListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    pipelineName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/pipelines/{pipelineName}/listFlows",
    }),
  );
export type ListFlowsByPipelineListInput =
  typeof ListFlowsByPipelineListInput.Type;

// Output Schema
export const ListFlowsByPipelineListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          flows: Schema.optional(
            Schema.Array(
              Schema.Struct({
                tags: Schema.optional(
                  Schema.Record(Schema.String, Schema.String),
                ),
                location: Schema.String,
              }),
            ),
          ),
        }),
      ),
    ),
  });
export type ListFlowsByPipelineListOutput =
  typeof ListFlowsByPipelineListOutput.Type;

// The operation
/**
 * Lists all Flows associated with the specified Pipeline.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param pipelineName - The name of the pipeline on which to operate.
 */
export const ListFlowsByPipelineList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ListFlowsByPipelineListInput,
    outputSchema: ListFlowsByPipelineListOutput,
  }),
);
// Input Schema
export const ListPendingConnectionsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    connectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/connections/{connectionName}/listPendingConnections",
    }),
  );
export type ListPendingConnectionsListInput =
  typeof ListPendingConnectionsListInput.Type;

// Output Schema
export const ListPendingConnectionsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        subscriptionId: Schema.optional(Schema.String),
        pipeline: Schema.String,
        direction: Schema.optional(Schema.Literals(["Send", "Receive"])),
        justification: Schema.optional(Schema.String),
        status: Schema.optional(
          Schema.Literals(["InReview", "Approved", "Rejected", "Accepted"]),
        ),
        forceDisabledStatus: Schema.optional(
          Schema.Array(
            Schema.Literals([
              "ConnectionForceDisabled",
              "FlowTypeForceDisabled",
            ]),
          ),
        ),
        statusReason: Schema.optional(Schema.String),
        linkStatus: Schema.optional(Schema.Literals(["Linked", "Unlinked"])),
        linkedConnectionId: Schema.optional(Schema.String),
        flowTypes: Schema.optional(
          Schema.Array(
            Schema.Literals([
              "Unknown",
              "Complex",
              "DevSecOps",
              "Messaging",
              "Mission",
              "MicrosoftInternal",
              "BasicFiles",
              "Data",
              "Standard",
              "StreamingVideo",
              "Opaque",
              "MissionOpaqueXML",
              "DiskImages",
              "API",
            ]),
          ),
        ),
        requirementId: Schema.optional(Schema.String),
        remoteSubscriptionId: Schema.optional(Schema.String),
        approver: Schema.optional(Schema.String),
        pin: Schema.optional(Schema.String),
        dateSubmitted: Schema.optional(Schema.String),
        primaryContact: Schema.optional(Schema.String),
        secondaryContacts: Schema.optional(Schema.Array(Schema.String)),
        provisioningState: Schema.optional(
          Schema.Literals(["Succeeded", "Failed", "Canceled", "Accepted"]),
        ),
        policies: Schema.optional(Schema.Array(Schema.String)),
        schemas: Schema.optional(
          Schema.Array(
            Schema.Struct({
              id: Schema.optional(Schema.String),
              connectionId: Schema.optional(Schema.String),
              status: Schema.optional(Schema.Literals(["New", "Approved"])),
              name: Schema.optional(Schema.String),
              content: Schema.optional(Schema.String),
              direction: Schema.optional(Schema.Literals(["Send", "Receive"])),
              schemaUri: Schema.optional(Schema.String),
              schemaType: Schema.optional(Schema.Literals(["Xsd", "Zip"])),
            }),
          ),
        ),
        schemaUris: Schema.optional(Schema.Array(Schema.String)),
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
        id: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        type: Schema.optional(Schema.String),
        systemData: Schema.optional(
          Schema.Struct({
            createdBy: Schema.optional(Schema.String),
            createdByType: Schema.optional(
              Schema.Literals([
                "User",
                "Application",
                "ManagedIdentity",
                "Key",
              ]),
            ),
            createdAt: Schema.optional(Schema.String),
            lastModifiedBy: Schema.optional(Schema.String),
            lastModifiedByType: Schema.optional(
              Schema.Literals([
                "User",
                "Application",
                "ManagedIdentity",
                "Key",
              ]),
            ),
            lastModifiedAt: Schema.optional(Schema.String),
          }),
        ),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ListPendingConnectionsListOutput =
  typeof ListPendingConnectionsListOutput.Type;

// The operation
/**
 * Lists all pending remote connections that are linkable to this connection.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param connectionName - The name for the connection to perform the operation on.
 */
export const ListPendingConnectionsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ListPendingConnectionsListInput,
    outputSchema: ListPendingConnectionsListOutput,
  }),
);
// Input Schema
export const ListPendingFlowsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    connectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/connections/{connectionName}/listPendingFlows",
    }),
  );
export type ListPendingFlowsListInput = typeof ListPendingFlowsListInput.Type;

// Output Schema
export const ListPendingFlowsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        subscriptionId: Schema.optional(Schema.String),
        connectionId: Schema.optional(Schema.String),
        connection: Schema.optional(
          Schema.Struct({
            name: Schema.optional(Schema.String),
            id: Schema.String,
            location: Schema.optional(Schema.String),
            subscriptionName: Schema.optional(Schema.String),
          }),
        ),
        flowId: Schema.optional(Schema.String),
        keyVaultUri: Schema.optional(Schema.String),
        linkStatus: Schema.optional(Schema.Literals(["Linked", "Unlinked"])),
        linkedFlowId: Schema.optional(Schema.String),
        status: Schema.optional(Schema.Literals(["Enabled", "Disabled"])),
        forceDisabledStatus: Schema.optional(
          Schema.Array(
            Schema.Literals([
              "ConnectionForceDisabled",
              "FlowTypeForceDisabled",
            ]),
          ),
        ),
        storageAccountName: Schema.optional(Schema.String),
        storageAccountId: Schema.optional(Schema.String),
        storageContainerName: Schema.optional(Schema.String),
        storageTableName: Schema.optional(Schema.String),
        serviceBusQueueId: Schema.optional(Schema.String),
        flowType: Schema.optional(
          Schema.Literals([
            "Unknown",
            "Complex",
            "DevSecOps",
            "Messaging",
            "Mission",
            "MicrosoftInternal",
            "BasicFiles",
            "Data",
            "Standard",
            "StreamingVideo",
            "Opaque",
            "MissionOpaqueXML",
            "DiskImages",
            "API",
          ]),
        ),
        dataType: Schema.optional(Schema.Literals(["Blob", "Table"])),
        provisioningState: Schema.optional(
          Schema.Literals(["Succeeded", "Failed", "Canceled", "Accepted"]),
        ),
        policies: Schema.optional(Schema.Array(Schema.String)),
        schema: Schema.optional(
          Schema.Struct({
            id: Schema.optional(Schema.String),
            connectionId: Schema.optional(Schema.String),
            status: Schema.optional(Schema.Literals(["New", "Approved"])),
            name: Schema.optional(Schema.String),
            content: Schema.optional(Schema.String),
            direction: Schema.optional(Schema.Literals(["Send", "Receive"])),
            schemaUri: Schema.optional(Schema.String),
            schemaType: Schema.optional(Schema.Literals(["Xsd", "Zip"])),
          }),
        ),
        messagingOptions: Schema.optional(
          Schema.Struct({
            billingTier: Schema.optional(
              Schema.Literals(["BlobTransport", "Standard", "Premium"]),
            ),
          }),
        ),
        apiFlowOptions: Schema.optional(
          Schema.Struct({
            remoteEndpoint: Schema.optional(Schema.String),
            cname: Schema.optional(Schema.String),
            apiMode: Schema.optional(Schema.Literals(["SDK", "Endpoint"])),
            identityTranslation: Schema.optional(
              Schema.Literals(["UserIdentity", "ServiceIdentity"]),
            ),
            senderClientId: Schema.optional(Schema.String),
            remoteCallingModeClientId: Schema.optional(Schema.String),
            audienceOverride: Schema.optional(Schema.String),
          }),
        ),
        customerManagedKeyVaultUri: Schema.optional(Schema.String),
        streamId: Schema.optional(Schema.String),
        streamProtocol: Schema.optional(Schema.Literals(["UDP", "SRT", "RTP"])),
        streamLatency: Schema.optional(Schema.Number),
        passphrase: Schema.optional(Schema.String),
        sourceAddresses: Schema.optional(
          Schema.Struct({
            sourceAddresses: Schema.optional(Schema.Array(Schema.String)),
          }),
        ),
        destinationEndpoints: Schema.optional(Schema.Array(Schema.String)),
        destinationEndpointPorts: Schema.optional(Schema.Array(Schema.Number)),
        eventHubId: Schema.optional(Schema.String),
        consumerGroup: Schema.optional(Schema.String),
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
        id: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        type: Schema.optional(Schema.String),
        systemData: Schema.optional(
          Schema.Struct({
            createdBy: Schema.optional(Schema.String),
            createdByType: Schema.optional(
              Schema.Literals([
                "User",
                "Application",
                "ManagedIdentity",
                "Key",
              ]),
            ),
            createdAt: Schema.optional(Schema.String),
            lastModifiedBy: Schema.optional(Schema.String),
            lastModifiedByType: Schema.optional(
              Schema.Literals([
                "User",
                "Application",
                "ManagedIdentity",
                "Key",
              ]),
            ),
            lastModifiedAt: Schema.optional(Schema.String),
          }),
        ),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ListPendingFlowsListOutput = typeof ListPendingFlowsListOutput.Type;

// The operation
/**
 * Lists all remote flows that have not yet been linked to local flows
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param connectionName - The name for the connection to perform the operation on.
 */
export const ListPendingFlowsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ListPendingFlowsListInput,
    outputSchema: ListPendingFlowsListOutput,
  }),
);
// Input Schema
export const ListSchemasListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  pipelineName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/pipelines/{pipelineName}/listSchemas",
  }),
);
export type ListSchemasListInput = typeof ListSchemasListInput.Type;

// Output Schema
export const ListSchemasListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        connectionId: Schema.optional(Schema.String),
        status: Schema.optional(Schema.Literals(["New", "Approved"])),
        name: Schema.optional(Schema.String),
        content: Schema.optional(Schema.String),
        direction: Schema.optional(Schema.Literals(["Send", "Receive"])),
        schemaUri: Schema.optional(Schema.String),
        schemaType: Schema.optional(Schema.Literals(["Xsd", "Zip"])),
      }),
    ),
  ),
});
export type ListSchemasListOutput = typeof ListSchemasListOutput.Type;

// The operation
/**
 * Lists the schemas associated with a specific connection in the Pipeline. This operation has reached end of life support starting version 2025-05-30-preview. For schema support please create and use a FlowProfile resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param pipelineName - The name of the pipeline on which to operate.
 */
export const ListSchemasList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ListSchemasListInput,
  outputSchema: ListSchemasListOutput,
}));
// Input Schema
export const PipelinesApproveConnectionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    pipelineName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/pipelines/{pipelineName}/approveConnection",
    }),
  );
export type PipelinesApproveConnectionInput =
  typeof PipelinesApproveConnectionInput.Type;

// Output Schema
export const PipelinesApproveConnectionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type PipelinesApproveConnectionOutput =
  typeof PipelinesApproveConnectionOutput.Type;

// The operation
/**
 * Approves a pending connection request associated with the specified Pipeline.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param pipelineName - The name of the pipeline on which to operate.
 */
export const PipelinesApproveConnection = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PipelinesApproveConnectionInput,
    outputSchema: PipelinesApproveConnectionOutput,
  }),
);
// Input Schema
export const PipelinesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    pipelineName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/pipelines/{pipelineName}",
    }),
  );
export type PipelinesCreateOrUpdateInput =
  typeof PipelinesCreateOrUpdateInput.Type;

// Output Schema
export const PipelinesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type PipelinesCreateOrUpdateOutput =
  typeof PipelinesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates a new Pipeline resource or updates an existing one. This operation is asynchronous and returns the resulting Pipeline.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param pipelineName - The name of the pipeline on which to operate.
 */
export const PipelinesCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PipelinesCreateOrUpdateInput,
    outputSchema: PipelinesCreateOrUpdateOutput,
  }),
);
// Input Schema
export const PipelinesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  pipelineName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/pipelines/{pipelineName}",
  }),
);
export type PipelinesDeleteInput = typeof PipelinesDeleteInput.Type;

// Output Schema
export const PipelinesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PipelinesDeleteOutput = typeof PipelinesDeleteOutput.Type;

// The operation
/**
 * Deletes the specified Pipeline resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param pipelineName - The name of the pipeline on which to operate.
 */
export const PipelinesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PipelinesDeleteInput,
  outputSchema: PipelinesDeleteOutput,
}));
// Input Schema
export const PipelinesExecuteActionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    pipelineName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/pipelines/{pipelineName}/executeAction",
    }),
  );
export type PipelinesExecuteActionInput =
  typeof PipelinesExecuteActionInput.Type;

// Output Schema
export const PipelinesExecuteActionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type PipelinesExecuteActionOutput =
  typeof PipelinesExecuteActionOutput.Type;

// The operation
/**
 * Executes a privileged or administrative action on the specified Pipeline.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param pipelineName - The name of the pipeline on which to operate.
 */
export const PipelinesExecuteAction = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PipelinesExecuteActionInput,
    outputSchema: PipelinesExecuteActionOutput,
  }),
);
// Input Schema
export const PipelinesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  pipelineName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/pipelines/{pipelineName}",
  }),
);
export type PipelinesGetInput = typeof PipelinesGetInput.Type;

// Output Schema
export const PipelinesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type PipelinesGetOutput = typeof PipelinesGetOutput.Type;

// The operation
/**
 * Retrieves the specified Pipeline resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param pipelineName - The name of the pipeline on which to operate.
 */
export const PipelinesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PipelinesGetInput,
  outputSchema: PipelinesGetOutput,
}));
// Input Schema
export const PipelinesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/pipelines",
    }),
  );
export type PipelinesListByResourceGroupInput =
  typeof PipelinesListByResourceGroupInput.Type;

// Output Schema
export const PipelinesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type PipelinesListByResourceGroupOutput =
  typeof PipelinesListByResourceGroupOutput.Type;

// The operation
/**
 * Lists all Pipeline resources within the specified resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const PipelinesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PipelinesListByResourceGroupInput,
    outputSchema: PipelinesListByResourceGroupOutput,
  }));
// Input Schema
export const PipelinesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AzureDataTransfer/pipelines",
    }),
  );
export type PipelinesListBySubscriptionInput =
  typeof PipelinesListBySubscriptionInput.Type;

// Output Schema
export const PipelinesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type PipelinesListBySubscriptionOutput =
  typeof PipelinesListBySubscriptionOutput.Type;

// The operation
/**
 * Lists all Pipeline resources within the current subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const PipelinesListBySubscription = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PipelinesListBySubscriptionInput,
    outputSchema: PipelinesListBySubscriptionOutput,
  }),
);
// Input Schema
export const PipelinesRejectConnectionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    pipelineName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/pipelines/{pipelineName}/rejectConnection",
    }),
  );
export type PipelinesRejectConnectionInput =
  typeof PipelinesRejectConnectionInput.Type;

// Output Schema
export const PipelinesRejectConnectionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type PipelinesRejectConnectionOutput =
  typeof PipelinesRejectConnectionOutput.Type;

// The operation
/**
 * Rejects a pending connection request associated with the specified Pipeline.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param pipelineName - The name of the pipeline on which to operate.
 */
export const PipelinesRejectConnection = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PipelinesRejectConnectionInput,
    outputSchema: PipelinesRejectConnectionOutput,
  }),
);
// Input Schema
export const PipelinesUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  pipelineName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/pipelines/{pipelineName}",
  }),
);
export type PipelinesUpdateInput = typeof PipelinesUpdateInput.Type;

// Output Schema
export const PipelinesUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type PipelinesUpdateOutput = typeof PipelinesUpdateOutput.Type;

// The operation
/**
 * Applies partial updates to an existing Pipeline resource. This operation supports patch semantics and returns the updated Pipeline.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param pipelineName - The name of the pipeline on which to operate.
 */
export const PipelinesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PipelinesUpdateInput,
  outputSchema: PipelinesUpdateOutput,
}));
