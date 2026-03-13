/**
 * Azure Hybridcompute API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const AgentVersionGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  osType: Schema.String.pipe(T.PathParam()),
  version: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.HybridCompute/osType/{osType}/agentVersions/{version}",
  }),
);
export type AgentVersionGetInput = typeof AgentVersionGetInput.Type;

// Output Schema
export const AgentVersionGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  agentVersion: Schema.optional(Schema.String),
  downloadLink: Schema.optional(Schema.String),
  osType: Schema.optional(Schema.String),
});
export type AgentVersionGetOutput = typeof AgentVersionGetOutput.Type;

// The operation
/**
 * Gets an Agent Version along with the download link currently present.
 *
 * @param api-version - The API version to use for this operation.
 * @param osType - Defines the os type
 * @param version - Defines the agent version. To get latest, use latest or else a specific agent version.
 */
export const AgentVersionGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AgentVersionGetInput,
  outputSchema: AgentVersionGetOutput,
}));
// Input Schema
export const AgentVersionListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  osType: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.HybridCompute/osType/{osType}/agentVersions",
  }),
);
export type AgentVersionListInput = typeof AgentVersionListInput.Type;

// Output Schema
export const AgentVersionListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          agentVersion: Schema.optional(Schema.String),
          downloadLink: Schema.optional(Schema.String),
          osType: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  },
);
export type AgentVersionListOutput = typeof AgentVersionListOutput.Type;

// The operation
/**
 * Gets all Agent Versions along with the download link currently present.
 *
 * @param api-version - The API version to use for this operation.
 * @param osType - Defines the os type.
 */
export const AgentVersionList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AgentVersionListInput,
  outputSchema: AgentVersionListOutput,
}));
// Input Schema
export const ExtensionMetadataGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    publisher: Schema.String.pipe(T.PathParam()),
    extensionType: Schema.String.pipe(T.PathParam()),
    version: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.HybridCompute/locations/{location}/publishers/{publisher}/extensionTypes/{extensionType}/versions/{version}",
    }),
  );
export type ExtensionMetadataGetInput = typeof ExtensionMetadataGetInput.Type;

// Output Schema
export const ExtensionMetadataGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ExtensionMetadataGetOutput = typeof ExtensionMetadataGetOutput.Type;

// The operation
/**
 * Gets an Extension Metadata based on location, publisher, extensionType and version
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param location - The location of the Extension being received.
 * @param publisher - The publisher of the Extension being received.
 * @param extensionType - The extensionType of the Extension being received.
 * @param version - The version of the Extension being received.
 */
export const ExtensionMetadataGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ExtensionMetadataGetInput,
    outputSchema: ExtensionMetadataGetOutput,
  }),
);
// Input Schema
export const ExtensionMetadataListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    publisher: Schema.String.pipe(T.PathParam()),
    extensionType: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.HybridCompute/locations/{location}/publishers/{publisher}/extensionTypes/{extensionType}/versions",
    }),
  );
export type ExtensionMetadataListInput = typeof ExtensionMetadataListInput.Type;

// Output Schema
export const ExtensionMetadataListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
  });
export type ExtensionMetadataListOutput =
  typeof ExtensionMetadataListOutput.Type;

// The operation
/**
 * Gets all Extension versions based on location, publisher, extensionType
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param location - The location of the Extension being received.
 * @param publisher - The publisher of the Extension being received.
 * @param extensionType - The extensionType of the Extension being received.
 */
export const ExtensionMetadataList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ExtensionMetadataListInput,
    outputSchema: ExtensionMetadataListOutput,
  }),
);
// Input Schema
export const ExtensionMetadataV2GetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    location: Schema.String.pipe(T.PathParam()),
    publisher: Schema.String.pipe(T.PathParam()),
    extensionType: Schema.String.pipe(T.PathParam()),
    version: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.HybridCompute/locations/{location}/publishers/{publisher}/extensionTypes/{extensionType}/versions/{version}",
    }),
  );
export type ExtensionMetadataV2GetInput =
  typeof ExtensionMetadataV2GetInput.Type;

// Output Schema
export const ExtensionMetadataV2GetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ExtensionMetadataV2GetOutput =
  typeof ExtensionMetadataV2GetOutput.Type;

// The operation
/**
 * Gets an Extension Metadata based on location, publisher, extensionType and version
 *
 * @param api-version - The API version to use for this operation.
 * @param location - The name of Azure region.
 * @param publisher - The publisher of the Extension being received.
 * @param extensionType - The extensionType of the Extension being received.
 * @param version - The version of the Extension being received.
 */
export const ExtensionMetadataV2Get = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ExtensionMetadataV2GetInput,
    outputSchema: ExtensionMetadataV2GetOutput,
  }),
);
// Input Schema
export const ExtensionMetadataV2ListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    location: Schema.String.pipe(T.PathParam()),
    publisher: Schema.String.pipe(T.PathParam()),
    extensionType: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.HybridCompute/locations/{location}/publishers/{publisher}/extensionTypes/{extensionType}/versions",
    }),
  );
export type ExtensionMetadataV2ListInput =
  typeof ExtensionMetadataV2ListInput.Type;

// Output Schema
export const ExtensionMetadataV2ListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ExtensionMetadataV2ListOutput =
  typeof ExtensionMetadataV2ListOutput.Type;

// The operation
/**
 * Gets all Extension versions based on location, publisher, extensionType
 *
 * @param api-version - The API version to use for this operation.
 * @param location - The name of Azure region.
 * @param publisher - The publisher of the Extension being received.
 * @param extensionType - The extensionType of the Extension being received.
 */
export const ExtensionMetadataV2List = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ExtensionMetadataV2ListInput,
    outputSchema: ExtensionMetadataV2ListOutput,
  }),
);
// Input Schema
export const ExtensionPublisherListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    location: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.HybridCompute/locations/{location}/publishers",
    }),
  );
export type ExtensionPublisherListInput =
  typeof ExtensionPublisherListInput.Type;

// Output Schema
export const ExtensionPublisherListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ExtensionPublisherListOutput =
  typeof ExtensionPublisherListOutput.Type;

// The operation
/**
 * Gets all Extension publishers based on the location
 *
 * @param api-version - The API version to use for this operation.
 * @param location - The name of Azure region.
 */
export const ExtensionPublisherList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ExtensionPublisherListInput,
    outputSchema: ExtensionPublisherListOutput,
  }),
);
// Input Schema
export const ExtensionTypeListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    location: Schema.String.pipe(T.PathParam()),
    publisher: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.HybridCompute/locations/{location}/publishers/{publisher}/extensionTypes",
  }),
);
export type ExtensionTypeListInput = typeof ExtensionTypeListInput.Type;

// Output Schema
export const ExtensionTypeListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ExtensionTypeListOutput = typeof ExtensionTypeListOutput.Type;

// The operation
/**
 * Gets all Extension types based on location and publisher
 *
 * @param api-version - The API version to use for this operation.
 * @param location - The name of Azure region.
 * @param publisher - The publisher of the Extension being received.
 */
export const ExtensionTypeList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ExtensionTypeListInput,
  outputSchema: ExtensionTypeListOutput,
}));
// Input Schema
export const GatewaysCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/gateways/{gatewayName}",
    }),
  );
export type GatewaysCreateOrUpdateInput =
  typeof GatewaysCreateOrUpdateInput.Type;

// Output Schema
export const GatewaysCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type GatewaysCreateOrUpdateOutput =
  typeof GatewaysCreateOrUpdateOutput.Type;

// The operation
/**
 * The operation to create or update a gateway.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const GatewaysCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GatewaysCreateOrUpdateInput,
    outputSchema: GatewaysCreateOrUpdateOutput,
  }),
);
// Input Schema
export const GatewaysDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/gateways/{gatewayName}",
  }),
);
export type GatewaysDeleteInput = typeof GatewaysDeleteInput.Type;

// Output Schema
export const GatewaysDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type GatewaysDeleteOutput = typeof GatewaysDeleteOutput.Type;

// The operation
/**
 * The operation to delete a gateway.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const GatewaysDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GatewaysDeleteInput,
  outputSchema: GatewaysDeleteOutput,
}));
// Input Schema
export const GatewaysGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/gateways/{gatewayName}",
  }),
);
export type GatewaysGetInput = typeof GatewaysGetInput.Type;

// Output Schema
export const GatewaysGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type GatewaysGetOutput = typeof GatewaysGetOutput.Type;

// The operation
/**
 * Retrieves information about the view of a gateway.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const GatewaysGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GatewaysGetInput,
  outputSchema: GatewaysGetOutput,
}));
// Input Schema
export const GatewaysListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/gateways",
    }),
  );
export type GatewaysListByResourceGroupInput =
  typeof GatewaysListByResourceGroupInput.Type;

// Output Schema
export const GatewaysListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type GatewaysListByResourceGroupOutput =
  typeof GatewaysListByResourceGroupOutput.Type;

// The operation
/**
 * The operation to get all gateways of a non-Azure machine
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const GatewaysListByResourceGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GatewaysListByResourceGroupInput,
    outputSchema: GatewaysListByResourceGroupOutput,
  }),
);
// Input Schema
export const GatewaysListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.HybridCompute/gateways",
    }),
  );
export type GatewaysListBySubscriptionInput =
  typeof GatewaysListBySubscriptionInput.Type;

// Output Schema
export const GatewaysListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type GatewaysListBySubscriptionOutput =
  typeof GatewaysListBySubscriptionOutput.Type;

// The operation
/**
 * The operation to get all gateways of a non-Azure machine
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const GatewaysListBySubscription = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GatewaysListBySubscriptionInput,
    outputSchema: GatewaysListBySubscriptionOutput,
  }),
);
// Input Schema
export const GatewaysUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/gateways/{gatewayName}",
  }),
);
export type GatewaysUpdateInput = typeof GatewaysUpdateInput.Type;

// Output Schema
export const GatewaysUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type GatewaysUpdateOutput = typeof GatewaysUpdateOutput.Type;

// The operation
/**
 * The operation to update a gateway.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const GatewaysUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GatewaysUpdateInput,
  outputSchema: GatewaysUpdateOutput,
}));
// Input Schema
export const HybridIdentityMetadataGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    machineName: Schema.String.pipe(T.PathParam()),
    metadataName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/machines/{machineName}/hybridIdentityMetadata/{metadataName}",
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
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param machineName - The name of the hybrid machine.
 * @param metadataName - Name of the HybridIdentityMetadata.
 * @param api-version - The API version to use for this operation.
 */
export const HybridIdentityMetadataGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: HybridIdentityMetadataGetInput,
    outputSchema: HybridIdentityMetadataGetOutput,
  }),
);
// Input Schema
export const HybridIdentityMetadataListByMachinesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    machineName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/machines/{machineName}/hybridIdentityMetadata",
    }),
  );
export type HybridIdentityMetadataListByMachinesInput =
  typeof HybridIdentityMetadataListByMachinesInput.Type;

// Output Schema
export const HybridIdentityMetadataListByMachinesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.Array(Schema.Struct({})),
  });
export type HybridIdentityMetadataListByMachinesOutput =
  typeof HybridIdentityMetadataListByMachinesOutput.Type;

// The operation
/**
 * Implements GET HybridIdentityMetadata in a machine.
 *
 * Returns the list of HybridIdentityMetadata of the given machine.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param machineName - The name of the hybrid machine.
 * @param api-version - The API version to use for this operation.
 */
export const HybridIdentityMetadataListByMachines =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: HybridIdentityMetadataListByMachinesInput,
    outputSchema: HybridIdentityMetadataListByMachinesOutput,
  }));
// Input Schema
export const LicenseProfilesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/machines/{machineName}/licenseProfiles/{licenseProfileName}",
    }),
  );
export type LicenseProfilesCreateOrUpdateInput =
  typeof LicenseProfilesCreateOrUpdateInput.Type;

// Output Schema
export const LicenseProfilesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type LicenseProfilesCreateOrUpdateOutput =
  typeof LicenseProfilesCreateOrUpdateOutput.Type;

// The operation
/**
 * The operation to create or update a license profile.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const LicenseProfilesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LicenseProfilesCreateOrUpdateInput,
    outputSchema: LicenseProfilesCreateOrUpdateOutput,
  }));
// Input Schema
export const LicenseProfilesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/machines/{machineName}/licenseProfiles/{licenseProfileName}",
    }),
  );
export type LicenseProfilesDeleteInput = typeof LicenseProfilesDeleteInput.Type;

// Output Schema
export const LicenseProfilesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type LicenseProfilesDeleteOutput =
  typeof LicenseProfilesDeleteOutput.Type;

// The operation
/**
 * The operation to delete a license profile.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const LicenseProfilesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: LicenseProfilesDeleteInput,
    outputSchema: LicenseProfilesDeleteOutput,
  }),
);
// Input Schema
export const LicenseProfilesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/machines/{machineName}/licenseProfiles/{licenseProfileName}",
    }),
  );
export type LicenseProfilesGetInput = typeof LicenseProfilesGetInput.Type;

// Output Schema
export const LicenseProfilesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type LicenseProfilesGetOutput = typeof LicenseProfilesGetOutput.Type;

// The operation
/**
 * Retrieves information about the view of a license profile.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const LicenseProfilesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: LicenseProfilesGetInput,
  outputSchema: LicenseProfilesGetOutput,
}));
// Input Schema
export const LicenseProfilesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    machineName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/machines/{machineName}/licenseProfiles",
    }),
  );
export type LicenseProfilesListInput = typeof LicenseProfilesListInput.Type;

// Output Schema
export const LicenseProfilesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type LicenseProfilesListOutput = typeof LicenseProfilesListOutput.Type;

// The operation
/**
 * The operation to get all license profiles of a non-Azure machine
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param machineName - The name of the machine.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const LicenseProfilesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: LicenseProfilesListInput,
  outputSchema: LicenseProfilesListOutput,
}));
// Input Schema
export const LicenseProfilesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/machines/{machineName}/licenseProfiles/{licenseProfileName}",
    }),
  );
export type LicenseProfilesUpdateInput = typeof LicenseProfilesUpdateInput.Type;

// Output Schema
export const LicenseProfilesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type LicenseProfilesUpdateOutput =
  typeof LicenseProfilesUpdateOutput.Type;

// The operation
/**
 * The operation to update a license profile.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const LicenseProfilesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: LicenseProfilesUpdateInput,
    outputSchema: LicenseProfilesUpdateOutput,
  }),
);
// Input Schema
export const LicensesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/licenses/{licenseName}",
    }),
  );
export type LicensesCreateOrUpdateInput =
  typeof LicensesCreateOrUpdateInput.Type;

// Output Schema
export const LicensesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type LicensesCreateOrUpdateOutput =
  typeof LicensesCreateOrUpdateOutput.Type;

// The operation
/**
 * The operation to create or update a license.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
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
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/licenses/{licenseName}",
  }),
);
export type LicensesDeleteInput = typeof LicensesDeleteInput.Type;

// Output Schema
export const LicensesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type LicensesDeleteOutput = typeof LicensesDeleteOutput.Type;

// The operation
/**
 * The operation to delete a license.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const LicensesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: LicensesDeleteInput,
  outputSchema: LicensesDeleteOutput,
}));
// Input Schema
export const LicensesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/licenses/{licenseName}",
  }),
);
export type LicensesGetInput = typeof LicensesGetInput.Type;

// Output Schema
export const LicensesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type LicensesGetOutput = typeof LicensesGetOutput.Type;

// The operation
/**
 * Retrieves information about the view of a license.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const LicensesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: LicensesGetInput,
  outputSchema: LicensesGetOutput,
}));
// Input Schema
export const LicensesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/licenses",
    }),
  );
export type LicensesListByResourceGroupInput =
  typeof LicensesListByResourceGroupInput.Type;

// Output Schema
export const LicensesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type LicensesListByResourceGroupOutput =
  typeof LicensesListByResourceGroupOutput.Type;

// The operation
/**
 * The operation to get all licenses of a non-Azure machine
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const LicensesListByResourceGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: LicensesListByResourceGroupInput,
    outputSchema: LicensesListByResourceGroupOutput,
  }),
);
// Input Schema
export const LicensesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.HybridCompute/licenses",
    }),
  );
export type LicensesListBySubscriptionInput =
  typeof LicensesListBySubscriptionInput.Type;

// Output Schema
export const LicensesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type LicensesListBySubscriptionOutput =
  typeof LicensesListBySubscriptionOutput.Type;

// The operation
/**
 * The operation to get all licenses of a non-Azure machine
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const LicensesListBySubscription = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: LicensesListBySubscriptionInput,
    outputSchema: LicensesListBySubscriptionOutput,
  }),
);
// Input Schema
export const LicensesUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/licenses/{licenseName}",
  }),
);
export type LicensesUpdateInput = typeof LicensesUpdateInput.Type;

// Output Schema
export const LicensesUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type LicensesUpdateOutput = typeof LicensesUpdateOutput.Type;

// The operation
/**
 * The operation to update a license.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const LicensesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: LicensesUpdateInput,
  outputSchema: LicensesUpdateOutput,
}));
// Input Schema
export const LicensesValidateLicenseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.HybridCompute/validateLicense",
    }),
  );
export type LicensesValidateLicenseInput =
  typeof LicensesValidateLicenseInput.Type;

// Output Schema
export const LicensesValidateLicenseOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type LicensesValidateLicenseOutput =
  typeof LicensesValidateLicenseOutput.Type;

// The operation
/**
 * The operation to validate a license.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const LicensesValidateLicense = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: LicensesValidateLicenseInput,
    outputSchema: LicensesValidateLicenseOutput,
  }),
);
// Input Schema
export const MachineExtensionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    machineName: Schema.String.pipe(T.PathParam()),
    extensionName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/machines/{machineName}/extensions/{extensionName}",
    }),
  );
export type MachineExtensionsCreateOrUpdateInput =
  typeof MachineExtensionsCreateOrUpdateInput.Type;

// Output Schema
export const MachineExtensionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type MachineExtensionsCreateOrUpdateOutput =
  typeof MachineExtensionsCreateOrUpdateOutput.Type;

// The operation
/**
 * The operation to create or update the extension.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param machineName - The name of the machine where the extension should be created or updated.
 * @param extensionName - The name of the machine extension.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const MachineExtensionsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MachineExtensionsCreateOrUpdateInput,
    outputSchema: MachineExtensionsCreateOrUpdateOutput,
  }));
// Input Schema
export const MachineExtensionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    machineName: Schema.String.pipe(T.PathParam()),
    extensionName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/machines/{machineName}/extensions/{extensionName}",
    }),
  );
export type MachineExtensionsDeleteInput =
  typeof MachineExtensionsDeleteInput.Type;

// Output Schema
export const MachineExtensionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type MachineExtensionsDeleteOutput =
  typeof MachineExtensionsDeleteOutput.Type;

// The operation
/**
 * The operation to delete the extension.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param machineName - The name of the machine where the extension should be deleted.
 * @param extensionName - The name of the machine extension.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const MachineExtensionsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: MachineExtensionsDeleteInput,
    outputSchema: MachineExtensionsDeleteOutput,
  }),
);
// Input Schema
export const MachineExtensionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    machineName: Schema.String.pipe(T.PathParam()),
    extensionName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/machines/{machineName}/extensions/{extensionName}",
    }),
  );
export type MachineExtensionsGetInput = typeof MachineExtensionsGetInput.Type;

// Output Schema
export const MachineExtensionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type MachineExtensionsGetOutput = typeof MachineExtensionsGetOutput.Type;

// The operation
/**
 * The operation to get the extension.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param machineName - The name of the machine containing the extension.
 * @param extensionName - The name of the machine extension.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const MachineExtensionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: MachineExtensionsGetInput,
    outputSchema: MachineExtensionsGetOutput,
  }),
);
// Input Schema
export const MachineExtensionsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    machineName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    $expand: Schema.optional(Schema.String),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/machines/{machineName}/extensions",
    }),
  );
export type MachineExtensionsListInput = typeof MachineExtensionsListInput.Type;

// Output Schema
export const MachineExtensionsListOutput =
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
export type MachineExtensionsListOutput =
  typeof MachineExtensionsListOutput.Type;

// The operation
/**
 * The operation to get all extensions of a non-Azure machine
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param machineName - The name of the machine containing the extension.
 * @param $expand - The expand expression to apply on the operation.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const MachineExtensionsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: MachineExtensionsListInput,
    outputSchema: MachineExtensionsListOutput,
  }),
);
// Input Schema
export const MachineExtensionsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    machineName: Schema.String.pipe(T.PathParam()),
    extensionName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/machines/{machineName}/extensions/{extensionName}",
    }),
  );
export type MachineExtensionsUpdateInput =
  typeof MachineExtensionsUpdateInput.Type;

// Output Schema
export const MachineExtensionsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type MachineExtensionsUpdateOutput =
  typeof MachineExtensionsUpdateOutput.Type;

// The operation
/**
 * The operation to create or update the extension.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param machineName - The name of the machine where the extension should be created or updated.
 * @param extensionName - The name of the machine extension.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const MachineExtensionsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: MachineExtensionsUpdateInput,
    outputSchema: MachineExtensionsUpdateOutput,
  }),
);
// Input Schema
export const MachineRunCommandsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/machines/{machineName}/runCommands/{runCommandName}",
    }),
  );
export type MachineRunCommandsCreateOrUpdateInput =
  typeof MachineRunCommandsCreateOrUpdateInput.Type;

// Output Schema
export const MachineRunCommandsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type MachineRunCommandsCreateOrUpdateOutput =
  typeof MachineRunCommandsCreateOrUpdateOutput.Type;

// The operation
/**
 * The operation to create or update a run command.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const MachineRunCommandsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MachineRunCommandsCreateOrUpdateInput,
    outputSchema: MachineRunCommandsCreateOrUpdateOutput,
  }));
// Input Schema
export const MachineRunCommandsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/machines/{machineName}/runCommands/{runCommandName}",
    }),
  );
export type MachineRunCommandsDeleteInput =
  typeof MachineRunCommandsDeleteInput.Type;

// Output Schema
export const MachineRunCommandsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type MachineRunCommandsDeleteOutput =
  typeof MachineRunCommandsDeleteOutput.Type;

// The operation
/**
 * The operation to delete a run command.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const MachineRunCommandsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: MachineRunCommandsDeleteInput,
    outputSchema: MachineRunCommandsDeleteOutput,
  }),
);
// Input Schema
export const MachineRunCommandsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/machines/{machineName}/runCommands/{runCommandName}",
    }),
  );
export type MachineRunCommandsGetInput = typeof MachineRunCommandsGetInput.Type;

// Output Schema
export const MachineRunCommandsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type MachineRunCommandsGetOutput =
  typeof MachineRunCommandsGetOutput.Type;

// The operation
/**
 * The operation to get a run command.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const MachineRunCommandsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: MachineRunCommandsGetInput,
    outputSchema: MachineRunCommandsGetOutput,
  }),
);
// Input Schema
export const MachineRunCommandsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    $expand: Schema.optional(Schema.String),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/machines/{machineName}/runCommands",
    }),
  );
export type MachineRunCommandsListInput =
  typeof MachineRunCommandsListInput.Type;

// Output Schema
export const MachineRunCommandsListOutput =
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
export type MachineRunCommandsListOutput =
  typeof MachineRunCommandsListOutput.Type;

// The operation
/**
 * The operation to get all the run commands of a non-Azure machine.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param $expand - The expand expression to apply on the operation.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const MachineRunCommandsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: MachineRunCommandsListInput,
    outputSchema: MachineRunCommandsListOutput,
  }),
);
// Input Schema
export const MachineRunCommandsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/machines/{machineName}/runCommands/{runCommandName}",
    }),
  );
export type MachineRunCommandsUpdateInput =
  typeof MachineRunCommandsUpdateInput.Type;

// Output Schema
export const MachineRunCommandsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type MachineRunCommandsUpdateOutput =
  typeof MachineRunCommandsUpdateOutput.Type;

// The operation
/**
 * The operation to update the run command.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const MachineRunCommandsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: MachineRunCommandsUpdateInput,
    outputSchema: MachineRunCommandsUpdateOutput,
  }),
);
// Input Schema
export const MachinesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    machineName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/machines/{machineName}",
    }),
  );
export type MachinesCreateOrUpdateInput =
  typeof MachinesCreateOrUpdateInput.Type;

// Output Schema
export const MachinesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type MachinesCreateOrUpdateOutput =
  typeof MachinesCreateOrUpdateOutput.Type;

// The operation
/**
 * The operation to create or update a hybrid machine. Please note some properties can be set only during machine creation.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param machineName - The name of the hybrid machine.
 * @param $expand - Expands referenced resources.
 */
export const MachinesCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: MachinesCreateOrUpdateInput,
    outputSchema: MachinesCreateOrUpdateOutput,
  }),
);
// Input Schema
export const MachinesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  machineName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/machines/{machineName}",
  }),
);
export type MachinesDeleteInput = typeof MachinesDeleteInput.Type;

// Output Schema
export const MachinesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type MachinesDeleteOutput = typeof MachinesDeleteOutput.Type;

// The operation
/**
 * The operation to delete a hybrid machine.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param machineName - The name of the hybrid machine.
 */
export const MachinesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: MachinesDeleteInput,
  outputSchema: MachinesDeleteOutput,
}));
// Input Schema
export const MachinesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  machineName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
  $expand: Schema.optional(Schema.Literals(["instanceView"])),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/machines/{machineName}",
  }),
);
export type MachinesGetInput = typeof MachinesGetInput.Type;

// Output Schema
export const MachinesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type MachinesGetOutput = typeof MachinesGetOutput.Type;

// The operation
/**
 * Retrieves information about the model view or the instance view of a hybrid machine.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param machineName - The name of the hybrid machine.
 * @param $expand - The expand expression to apply on the operation.
 */
export const MachinesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: MachinesGetInput,
  outputSchema: MachinesGetOutput,
}));
// Input Schema
export const MachinesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/machines",
    }),
  );
export type MachinesListByResourceGroupInput =
  typeof MachinesListByResourceGroupInput.Type;

// Output Schema
export const MachinesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type MachinesListByResourceGroupOutput =
  typeof MachinesListByResourceGroupOutput.Type;

// The operation
/**
 * Lists all the hybrid machines in the specified resource group. Use the nextLink property in the response to get the next page of hybrid machines.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param $expand - Expands referenced resources.
 */
export const MachinesListByResourceGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: MachinesListByResourceGroupInput,
    outputSchema: MachinesListByResourceGroupOutput,
  }),
);
// Input Schema
export const MachinesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.HybridCompute/machines",
    }),
  );
export type MachinesListBySubscriptionInput =
  typeof MachinesListBySubscriptionInput.Type;

// Output Schema
export const MachinesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type MachinesListBySubscriptionOutput =
  typeof MachinesListBySubscriptionOutput.Type;

// The operation
/**
 * Lists all the hybrid machines in the specified subscription. Use the nextLink property in the response to get the next page of hybrid machines.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const MachinesListBySubscription = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: MachinesListBySubscriptionInput,
    outputSchema: MachinesListBySubscriptionOutput,
  }),
);
// Input Schema
export const MachinesUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  machineName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/machines/{machineName}",
  }),
);
export type MachinesUpdateInput = typeof MachinesUpdateInput.Type;

// Output Schema
export const MachinesUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type MachinesUpdateOutput = typeof MachinesUpdateOutput.Type;

// The operation
/**
 * The operation to update a hybrid machine.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param machineName - The name of the hybrid machine.
 */
export const MachinesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: MachinesUpdateInput,
  outputSchema: MachinesUpdateOutput,
}));
// Input Schema
export const NetworkConfigurationsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/machines/{machineName}/providers/Microsoft.HybridCompute/networkConfigurations/current",
    }),
  );
export type NetworkConfigurationsCreateOrUpdateInput =
  typeof NetworkConfigurationsCreateOrUpdateInput.Type;

// Output Schema
export const NetworkConfigurationsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type NetworkConfigurationsCreateOrUpdateOutput =
  typeof NetworkConfigurationsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update the NetworkConfiguration of the target resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const NetworkConfigurationsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkConfigurationsCreateOrUpdateInput,
    outputSchema: NetworkConfigurationsCreateOrUpdateOutput,
  }));
// Input Schema
export const NetworkConfigurationsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/machines/{machineName}/providers/Microsoft.HybridCompute/networkConfigurations/current",
    }),
  );
export type NetworkConfigurationsGetInput =
  typeof NetworkConfigurationsGetInput.Type;

// Output Schema
export const NetworkConfigurationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type NetworkConfigurationsGetOutput =
  typeof NetworkConfigurationsGetOutput.Type;

// The operation
/**
 * Returns a NetworkConfiguration for the target resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const NetworkConfigurationsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: NetworkConfigurationsGetInput,
    outputSchema: NetworkConfigurationsGetOutput,
  }),
);
// Input Schema
export const NetworkConfigurationsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/machines/{machineName}/providers/Microsoft.HybridCompute/networkConfigurations/current",
    }),
  );
export type NetworkConfigurationsUpdateInput =
  typeof NetworkConfigurationsUpdateInput.Type;

// Output Schema
export const NetworkConfigurationsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type NetworkConfigurationsUpdateOutput =
  typeof NetworkConfigurationsUpdateOutput.Type;

// The operation
/**
 * Update the endpoint to the target resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const NetworkConfigurationsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: NetworkConfigurationsUpdateInput,
    outputSchema: NetworkConfigurationsUpdateOutput,
  }),
);
// Input Schema
export const NetworkProfileGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    machineName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/machines/{machineName}/networkProfile",
  }),
);
export type NetworkProfileGetInput = typeof NetworkProfileGetInput.Type;

// Output Schema
export const NetworkProfileGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    networkInterfaces: Schema.optional(
      Schema.Array(
        Schema.Struct({
          macAddress: Schema.optional(Schema.String),
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          ipAddresses: Schema.optional(
            Schema.Array(
              Schema.Struct({
                address: Schema.optional(Schema.String),
                ipAddressVersion: Schema.optional(Schema.String),
                subnet: Schema.optional(
                  Schema.Struct({
                    addressPrefix: Schema.optional(Schema.String),
                  }),
                ),
              }),
            ),
          ),
        }),
      ),
    ),
  });
export type NetworkProfileGetOutput = typeof NetworkProfileGetOutput.Type;

// The operation
/**
 * The operation to get network information of hybrid machine
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param machineName - The name of the hybrid machine.
 */
export const NetworkProfileGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: NetworkProfileGetInput,
  outputSchema: NetworkProfileGetOutput,
}));
// Input Schema
export const NetworkSecurityPerimeterConfigurationsGetByPrivateLinkScopeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/privateLinkScopes/{scopeName}/networkSecurityPerimeterConfigurations/{perimeterName}",
    }),
  );
export type NetworkSecurityPerimeterConfigurationsGetByPrivateLinkScopeInput =
  typeof NetworkSecurityPerimeterConfigurationsGetByPrivateLinkScopeInput.Type;

// Output Schema
export const NetworkSecurityPerimeterConfigurationsGetByPrivateLinkScopeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        provisioningState: Schema.optional(Schema.String),
        provisioningIssues: Schema.optional(
          Schema.Array(
            Schema.Struct({
              name: Schema.optional(Schema.String),
              properties: Schema.optional(
                Schema.Struct({
                  issueType: Schema.optional(
                    Schema.Literals([
                      "MissingPerimeterConfiguration",
                      "MissingIdentityConfiguration",
                      "ConfigurationPropagationFailure",
                      "Other",
                    ]),
                  ),
                  severity: Schema.optional(
                    Schema.Literals(["Warning", "Error"]),
                  ),
                  description: Schema.optional(Schema.String),
                  suggestedResourceIds: Schema.optional(
                    Schema.Array(Schema.String),
                  ),
                  suggestedAccessRules: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        name: Schema.optional(Schema.String),
                        properties: Schema.optional(
                          Schema.Struct({
                            direction: Schema.optional(
                              Schema.Literals(["Inbound", "Outbound"]),
                            ),
                            addressPrefixes: Schema.optional(
                              Schema.Array(Schema.String),
                            ),
                          }),
                        ),
                      }),
                    ),
                  ),
                }),
              ),
            }),
          ),
        ),
        networkSecurityPerimeter: Schema.optional(
          Schema.Struct({
            id: Schema.optional(Schema.String),
            perimeterGuid: Schema.optional(Schema.String),
            location: Schema.optional(Schema.String),
          }),
        ),
        resourceAssociation: Schema.optional(
          Schema.Struct({
            name: Schema.optional(Schema.String),
            accessMode: Schema.optional(
              Schema.Literals(["enforced", "audit", "learning"]),
            ),
          }),
        ),
        profile: Schema.optional(
          Schema.Struct({
            name: Schema.optional(Schema.String),
            accessRulesVersion: Schema.optional(Schema.Number),
            accessRules: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  name: Schema.optional(Schema.String),
                  properties: Schema.optional(
                    Schema.Struct({
                      direction: Schema.optional(
                        Schema.Literals(["Inbound", "Outbound"]),
                      ),
                      addressPrefixes: Schema.optional(
                        Schema.Array(Schema.String),
                      ),
                    }),
                  ),
                }),
              ),
            ),
            diagnosticSettingsVersion: Schema.optional(Schema.Number),
            enabledLogCategories: Schema.optional(Schema.Array(Schema.String)),
          }),
        ),
      }),
    ),
  });
export type NetworkSecurityPerimeterConfigurationsGetByPrivateLinkScopeOutput =
  typeof NetworkSecurityPerimeterConfigurationsGetByPrivateLinkScopeOutput.Type;

// The operation
/**
 * Gets the network security perimeter configuration for a private link scope.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NetworkSecurityPerimeterConfigurationsGetByPrivateLinkScope =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      NetworkSecurityPerimeterConfigurationsGetByPrivateLinkScopeInput,
    outputSchema:
      NetworkSecurityPerimeterConfigurationsGetByPrivateLinkScopeOutput,
  }));
// Input Schema
export const NetworkSecurityPerimeterConfigurationsListByPrivateLinkScopeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/privateLinkScopes/{scopeName}/networkSecurityPerimeterConfigurations",
    }),
  );
export type NetworkSecurityPerimeterConfigurationsListByPrivateLinkScopeInput =
  typeof NetworkSecurityPerimeterConfigurationsListByPrivateLinkScopeInput.Type;

// Output Schema
export const NetworkSecurityPerimeterConfigurationsListByPrivateLinkScopeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Struct({
              provisioningState: Schema.optional(Schema.String),
              provisioningIssues: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    properties: Schema.optional(
                      Schema.Struct({
                        issueType: Schema.optional(
                          Schema.Literals([
                            "MissingPerimeterConfiguration",
                            "MissingIdentityConfiguration",
                            "ConfigurationPropagationFailure",
                            "Other",
                          ]),
                        ),
                        severity: Schema.optional(
                          Schema.Literals(["Warning", "Error"]),
                        ),
                        description: Schema.optional(Schema.String),
                        suggestedResourceIds: Schema.optional(
                          Schema.Array(Schema.String),
                        ),
                        suggestedAccessRules: Schema.optional(
                          Schema.Array(
                            Schema.Struct({
                              name: Schema.optional(Schema.String),
                              properties: Schema.optional(
                                Schema.Struct({
                                  direction: Schema.optional(
                                    Schema.Literals(["Inbound", "Outbound"]),
                                  ),
                                  addressPrefixes: Schema.optional(
                                    Schema.Array(Schema.String),
                                  ),
                                }),
                              ),
                            }),
                          ),
                        ),
                      }),
                    ),
                  }),
                ),
              ),
              networkSecurityPerimeter: Schema.optional(
                Schema.Struct({
                  id: Schema.optional(Schema.String),
                  perimeterGuid: Schema.optional(Schema.String),
                  location: Schema.optional(Schema.String),
                }),
              ),
              resourceAssociation: Schema.optional(
                Schema.Struct({
                  name: Schema.optional(Schema.String),
                  accessMode: Schema.optional(
                    Schema.Literals(["enforced", "audit", "learning"]),
                  ),
                }),
              ),
              profile: Schema.optional(
                Schema.Struct({
                  name: Schema.optional(Schema.String),
                  accessRulesVersion: Schema.optional(Schema.Number),
                  accessRules: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        name: Schema.optional(Schema.String),
                        properties: Schema.optional(
                          Schema.Struct({
                            direction: Schema.optional(
                              Schema.Literals(["Inbound", "Outbound"]),
                            ),
                            addressPrefixes: Schema.optional(
                              Schema.Array(Schema.String),
                            ),
                          }),
                        ),
                      }),
                    ),
                  ),
                  diagnosticSettingsVersion: Schema.optional(Schema.Number),
                  enabledLogCategories: Schema.optional(
                    Schema.Array(Schema.String),
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
export type NetworkSecurityPerimeterConfigurationsListByPrivateLinkScopeOutput =
  typeof NetworkSecurityPerimeterConfigurationsListByPrivateLinkScopeOutput.Type;

// The operation
/**
 * Lists the network security perimeter configurations for a private link scope.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NetworkSecurityPerimeterConfigurationsListByPrivateLinkScope =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      NetworkSecurityPerimeterConfigurationsListByPrivateLinkScopeInput,
    outputSchema:
      NetworkSecurityPerimeterConfigurationsListByPrivateLinkScopeOutput,
  }));
// Input Schema
export const NetworkSecurityPerimeterConfigurationsReconcileForPrivateLinkScopeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/privateLinkScopes/{scopeName}/networkSecurityPerimeterConfigurations/{perimeterName}/reconcile",
    }),
  );
export type NetworkSecurityPerimeterConfigurationsReconcileForPrivateLinkScopeInput =
  typeof NetworkSecurityPerimeterConfigurationsReconcileForPrivateLinkScopeInput.Type;

// Output Schema
export const NetworkSecurityPerimeterConfigurationsReconcileForPrivateLinkScopeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    location: Schema.optional(Schema.String),
  });
export type NetworkSecurityPerimeterConfigurationsReconcileForPrivateLinkScopeOutput =
  typeof NetworkSecurityPerimeterConfigurationsReconcileForPrivateLinkScopeOutput.Type;

// The operation
/**
 * Forces the network security perimeter configuration to refresh for a private link scope.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NetworkSecurityPerimeterConfigurationsReconcileForPrivateLinkScope =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      NetworkSecurityPerimeterConfigurationsReconcileForPrivateLinkScopeInput,
    outputSchema:
      NetworkSecurityPerimeterConfigurationsReconcileForPrivateLinkScopeOutput,
  }));
// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.HybridCompute/operations",
  }),
);
export type OperationsListInput = typeof OperationsListInput.Type;

// Output Schema
export const OperationsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        origin: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        display: Schema.optional(
          Schema.Struct({
            operation: Schema.optional(Schema.String),
            resource: Schema.optional(Schema.String),
            description: Schema.optional(Schema.String),
            provider: Schema.optional(Schema.String),
          }),
        ),
        isDataAction: Schema.optional(Schema.Boolean),
      }),
    ),
  ),
});
export type OperationsListOutput = typeof OperationsListOutput.Type;

// The operation
/**
 * Gets a list of hybrid compute operations.
 *
 * @param api-version - The API version to use for this operation.
 */
export const OperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationsListInput,
  outputSchema: OperationsListOutput,
}));
// Input Schema
export const PrivateEndpointConnectionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/privateLinkScopes/{scopeName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type PrivateEndpointConnectionsCreateOrUpdateInput =
  typeof PrivateEndpointConnectionsCreateOrUpdateInput.Type;

// Output Schema
export const PrivateEndpointConnectionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PrivateEndpointConnectionsCreateOrUpdateOutput =
  typeof PrivateEndpointConnectionsCreateOrUpdateOutput.Type;

// The operation
/**
 * Approve or reject a private endpoint connection with a given name.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param privateEndpointConnectionName - The name of the private endpoint connection.
 */
export const PrivateEndpointConnectionsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsCreateOrUpdateInput,
    outputSchema: PrivateEndpointConnectionsCreateOrUpdateOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/privateLinkScopes/{scopeName}/privateEndpointConnections/{privateEndpointConnectionName}",
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
 * Deletes a private endpoint connection with a given name.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param privateEndpointConnectionName - The name of the private endpoint connection.
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
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/privateLinkScopes/{scopeName}/privateEndpointConnections/{privateEndpointConnectionName}",
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
 * Gets a private endpoint connection.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param privateEndpointConnectionName - The name of the private endpoint connection.
 */
export const PrivateEndpointConnectionsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsGetInput,
    outputSchema: PrivateEndpointConnectionsGetOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsListByPrivateLinkScopeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/privateLinkScopes/{scopeName}/privateEndpointConnections",
    }),
  );
export type PrivateEndpointConnectionsListByPrivateLinkScopeInput =
  typeof PrivateEndpointConnectionsListByPrivateLinkScopeInput.Type;

// Output Schema
export const PrivateEndpointConnectionsListByPrivateLinkScopeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type PrivateEndpointConnectionsListByPrivateLinkScopeOutput =
  typeof PrivateEndpointConnectionsListByPrivateLinkScopeOutput.Type;

// The operation
/**
 * Gets all private endpoint connections on a private link scope.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const PrivateEndpointConnectionsListByPrivateLinkScope =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsListByPrivateLinkScopeInput,
    outputSchema: PrivateEndpointConnectionsListByPrivateLinkScopeOutput,
  }));
// Input Schema
export const PrivateLinkResourcesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/privateLinkScopes/{scopeName}/privateLinkResources/{groupName}",
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
 * Gets the private link resources that need to be created for a Azure Monitor PrivateLinkScope.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const PrivateLinkResourcesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PrivateLinkResourcesGetInput,
    outputSchema: PrivateLinkResourcesGetOutput,
  }),
);
// Input Schema
export const PrivateLinkResourcesListByPrivateLinkScopeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/privateLinkScopes/{scopeName}/privateLinkResources",
    }),
  );
export type PrivateLinkResourcesListByPrivateLinkScopeInput =
  typeof PrivateLinkResourcesListByPrivateLinkScopeInput.Type;

// Output Schema
export const PrivateLinkResourcesListByPrivateLinkScopeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type PrivateLinkResourcesListByPrivateLinkScopeOutput =
  typeof PrivateLinkResourcesListByPrivateLinkScopeOutput.Type;

// The operation
/**
 * Gets the private link resources that need to be created for a Azure Monitor PrivateLinkScope.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const PrivateLinkResourcesListByPrivateLinkScope =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinkResourcesListByPrivateLinkScopeInput,
    outputSchema: PrivateLinkResourcesListByPrivateLinkScopeOutput,
  }));
// Input Schema
export const PrivateLinkScopesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/privateLinkScopes/{scopeName}",
    }),
  );
export type PrivateLinkScopesCreateOrUpdateInput =
  typeof PrivateLinkScopesCreateOrUpdateInput.Type;

// Output Schema
export const PrivateLinkScopesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type PrivateLinkScopesCreateOrUpdateOutput =
  typeof PrivateLinkScopesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates (or updates) a Azure Arc PrivateLinkScope. Note: You cannot specify a different value for InstrumentationKey nor AppId in the Put operation.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const PrivateLinkScopesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinkScopesCreateOrUpdateInput,
    outputSchema: PrivateLinkScopesCreateOrUpdateOutput,
  }));
// Input Schema
export const PrivateLinkScopesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/privateLinkScopes/{scopeName}",
    }),
  );
export type PrivateLinkScopesDeleteInput =
  typeof PrivateLinkScopesDeleteInput.Type;

// Output Schema
export const PrivateLinkScopesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PrivateLinkScopesDeleteOutput =
  typeof PrivateLinkScopesDeleteOutput.Type;

// The operation
/**
 * Deletes a Azure Arc PrivateLinkScope.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const PrivateLinkScopesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PrivateLinkScopesDeleteInput,
    outputSchema: PrivateLinkScopesDeleteOutput,
  }),
);
// Input Schema
export const PrivateLinkScopesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/privateLinkScopes/{scopeName}",
    }),
  );
export type PrivateLinkScopesGetInput = typeof PrivateLinkScopesGetInput.Type;

// Output Schema
export const PrivateLinkScopesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type PrivateLinkScopesGetOutput = typeof PrivateLinkScopesGetOutput.Type;

// The operation
/**
 * Returns a Azure Arc PrivateLinkScope.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const PrivateLinkScopesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PrivateLinkScopesGetInput,
    outputSchema: PrivateLinkScopesGetOutput,
  }),
);
// Input Schema
export const PrivateLinkScopesGetValidationDetailsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.HybridCompute/locations/{location}/privateLinkScopes/{privateLinkScopeId}",
    }),
  );
export type PrivateLinkScopesGetValidationDetailsInput =
  typeof PrivateLinkScopesGetValidationDetailsInput.Type;

// Output Schema
export const PrivateLinkScopesGetValidationDetailsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    publicNetworkAccess: Schema.optional(
      Schema.Literals(["Enabled", "Disabled"]),
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
  });
export type PrivateLinkScopesGetValidationDetailsOutput =
  typeof PrivateLinkScopesGetValidationDetailsOutput.Type;

// The operation
/**
 * Returns a Azure Arc PrivateLinkScope's validation details.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const PrivateLinkScopesGetValidationDetails =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinkScopesGetValidationDetailsInput,
    outputSchema: PrivateLinkScopesGetValidationDetailsOutput,
  }));
// Input Schema
export const PrivateLinkScopesGetValidationDetailsForMachineInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/machines/{machineName}/privateLinkScopes/current",
    }),
  );
export type PrivateLinkScopesGetValidationDetailsForMachineInput =
  typeof PrivateLinkScopesGetValidationDetailsForMachineInput.Type;

// Output Schema
export const PrivateLinkScopesGetValidationDetailsForMachineOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    publicNetworkAccess: Schema.optional(
      Schema.Literals(["Enabled", "Disabled"]),
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
  });
export type PrivateLinkScopesGetValidationDetailsForMachineOutput =
  typeof PrivateLinkScopesGetValidationDetailsForMachineOutput.Type;

// The operation
/**
 * Returns a Azure Arc PrivateLinkScope's validation details for a given machine.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const PrivateLinkScopesGetValidationDetailsForMachine =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinkScopesGetValidationDetailsForMachineInput,
    outputSchema: PrivateLinkScopesGetValidationDetailsForMachineOutput,
  }));
// Input Schema
export const PrivateLinkScopesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.HybridCompute/privateLinkScopes",
    }),
  );
export type PrivateLinkScopesListInput = typeof PrivateLinkScopesListInput.Type;

// Output Schema
export const PrivateLinkScopesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        type: Schema.optional(Schema.String),
        location: Schema.String,
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type PrivateLinkScopesListOutput =
  typeof PrivateLinkScopesListOutput.Type;

// The operation
/**
 * Gets a list of all Azure Arc PrivateLinkScopes within a subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const PrivateLinkScopesList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PrivateLinkScopesListInput,
    outputSchema: PrivateLinkScopesListOutput,
  }),
);
// Input Schema
export const PrivateLinkScopesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/privateLinkScopes",
    }),
  );
export type PrivateLinkScopesListByResourceGroupInput =
  typeof PrivateLinkScopesListByResourceGroupInput.Type;

// Output Schema
export const PrivateLinkScopesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        type: Schema.optional(Schema.String),
        location: Schema.String,
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type PrivateLinkScopesListByResourceGroupOutput =
  typeof PrivateLinkScopesListByResourceGroupOutput.Type;

// The operation
/**
 * Gets a list of Azure Arc PrivateLinkScopes within a resource group.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const PrivateLinkScopesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinkScopesListByResourceGroupInput,
    outputSchema: PrivateLinkScopesListByResourceGroupOutput,
  }));
// Input Schema
export const PrivateLinkScopesUpdateTagsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/privateLinkScopes/{scopeName}",
    }),
  );
export type PrivateLinkScopesUpdateTagsInput =
  typeof PrivateLinkScopesUpdateTagsInput.Type;

// Output Schema
export const PrivateLinkScopesUpdateTagsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type PrivateLinkScopesUpdateTagsOutput =
  typeof PrivateLinkScopesUpdateTagsOutput.Type;

// The operation
/**
 * Updates an existing PrivateLinkScope's tags. To update other fields use the CreateOrUpdate method.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const PrivateLinkScopesUpdateTags = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PrivateLinkScopesUpdateTagsInput,
    outputSchema: PrivateLinkScopesUpdateTagsOutput,
  }),
);
// Input Schema
export const SettingsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{baseProvider}/{baseResourceType}/{baseResourceName}/providers/Microsoft.HybridCompute/settings/{settingsResourceName}",
  }),
);
export type SettingsGetInput = typeof SettingsGetInput.Type;

// Output Schema
export const SettingsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SettingsGetOutput = typeof SettingsGetOutput.Type;

// The operation
/**
 * Returns the base Settings for the target resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const SettingsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SettingsGetInput,
  outputSchema: SettingsGetOutput,
}));
// Input Schema
export const SettingsPatchInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{baseProvider}/{baseResourceType}/{baseResourceName}/providers/Microsoft.HybridCompute/settings/{settingsResourceName}",
  }),
);
export type SettingsPatchInput = typeof SettingsPatchInput.Type;

// Output Schema
export const SettingsPatchOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type SettingsPatchOutput = typeof SettingsPatchOutput.Type;

// The operation
/**
 * Update the base Settings of the target resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const SettingsPatch = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SettingsPatchInput,
  outputSchema: SettingsPatchOutput,
}));
// Input Schema
export const SettingsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{baseProvider}/{baseResourceType}/{baseResourceName}/providers/Microsoft.HybridCompute/settings/{settingsResourceName}",
  }),
);
export type SettingsUpdateInput = typeof SettingsUpdateInput.Type;

// Output Schema
export const SettingsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type SettingsUpdateOutput = typeof SettingsUpdateOutput.Type;

// The operation
/**
 * Updates the base Settings of the target resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const SettingsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SettingsUpdateInput,
  outputSchema: SettingsUpdateOutput,
}));
// Input Schema
export const SetupExtensionsInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  machineName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/machines/{machineName}/addExtensions",
  }),
);
export type SetupExtensionsInput = typeof SetupExtensionsInput.Type;

// Output Schema
export const SetupExtensionsOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  extensions: Schema.optional(
    Schema.Array(
      Schema.Struct({
        forceUpdateTag: Schema.optional(Schema.String),
        publisher: Schema.optional(Schema.String),
        type: Schema.optional(Schema.String),
        typeHandlerVersion: Schema.optional(Schema.String),
        enableAutomaticUpgrade: Schema.optional(Schema.Boolean),
        autoUpgradeMinorVersion: Schema.optional(Schema.Boolean),
        settings: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
        protectedSettings: Schema.optional(
          Schema.Record(Schema.String, Schema.Unknown),
        ),
        provisioningState: Schema.optional(Schema.String),
        instanceView: Schema.optional(
          Schema.Struct({
            name: Schema.optional(Schema.String),
            type: Schema.optional(Schema.String),
            typeHandlerVersion: Schema.optional(Schema.String),
            status: Schema.optional(
              Schema.Struct({
                code: Schema.optional(Schema.String),
                level: Schema.optional(
                  Schema.Literals(["Info", "Warning", "Error"]),
                ),
                displayStatus: Schema.optional(Schema.String),
                message: Schema.optional(Schema.String),
                time: Schema.optional(Schema.String),
              }),
            ),
          }),
        ),
      }),
    ),
  ),
});
export type SetupExtensionsOutput = typeof SetupExtensionsOutput.Type;

// The operation
/**
 * The operation to Setup Machine Extensions.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param machineName - The name of the hybrid machine.
 */
export const SetupExtensions = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SetupExtensionsInput,
  outputSchema: SetupExtensionsOutput,
}));
// Input Schema
export const UpgradeExtensionsInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    machineName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/machines/{machineName}/upgradeExtensions",
  }),
);
export type UpgradeExtensionsInput = typeof UpgradeExtensionsInput.Type;

// Output Schema
export const UpgradeExtensionsOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type UpgradeExtensionsOutput = typeof UpgradeExtensionsOutput.Type;

// The operation
/**
 * The operation to Upgrade Machine Extensions.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param machineName - The name of the hybrid machine.
 */
export const UpgradeExtensions = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: UpgradeExtensionsInput,
  outputSchema: UpgradeExtensionsOutput,
}));
