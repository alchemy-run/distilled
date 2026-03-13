/**
 * Azure Hybridconnectivity API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const EndpointsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    endpointName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/{resourceUri}/providers/Microsoft.HybridConnectivity/endpoints/{endpointName}",
    }),
  );
export type EndpointsCreateOrUpdateInput =
  typeof EndpointsCreateOrUpdateInput.Type;

// Output Schema
export const EndpointsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type EndpointsCreateOrUpdateOutput =
  typeof EndpointsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update the endpoint to the target resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param endpointName - The endpoint name.
 */
export const EndpointsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: EndpointsCreateOrUpdateInput,
    outputSchema: EndpointsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const EndpointsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  endpointName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/{resourceUri}/providers/Microsoft.HybridConnectivity/endpoints/{endpointName}",
  }),
);
export type EndpointsDeleteInput = typeof EndpointsDeleteInput.Type;

// Output Schema
export const EndpointsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type EndpointsDeleteOutput = typeof EndpointsDeleteOutput.Type;

// The operation
/**
 * Deletes the endpoint access to the target resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param endpointName - The endpoint name.
 */
export const EndpointsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: EndpointsDeleteInput,
  outputSchema: EndpointsDeleteOutput,
}));
// Input Schema
export const EndpointsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  endpointName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/{resourceUri}/providers/Microsoft.HybridConnectivity/endpoints/{endpointName}",
  }),
);
export type EndpointsGetInput = typeof EndpointsGetInput.Type;

// Output Schema
export const EndpointsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type EndpointsGetOutput = typeof EndpointsGetOutput.Type;

// The operation
/**
 * Gets the endpoint to the resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param endpointName - The endpoint name.
 */
export const EndpointsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: EndpointsGetInput,
  outputSchema: EndpointsGetOutput,
}));
// Input Schema
export const EndpointsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/{resourceUri}/providers/Microsoft.HybridConnectivity/endpoints",
  }),
);
export type EndpointsListInput = typeof EndpointsListInput.Type;

// Output Schema
export const EndpointsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(Schema.Struct({})),
  nextLink: Schema.optional(Schema.String),
});
export type EndpointsListOutput = typeof EndpointsListOutput.Type;

// The operation
/**
 * List of endpoints to the target resource.
 *
 * @param api-version - The API version to use for this operation.
 */
export const EndpointsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: EndpointsListInput,
  outputSchema: EndpointsListOutput,
}));
// Input Schema
export const EndpointsListCredentialsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    endpointName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    expiresin: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/{resourceUri}/providers/Microsoft.HybridConnectivity/endpoints/{endpointName}/listCredentials",
    }),
  );
export type EndpointsListCredentialsInput =
  typeof EndpointsListCredentialsInput.Type;

// Output Schema
export const EndpointsListCredentialsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    relay: Schema.optional(
      Schema.Struct({
        namespaceName: Schema.String,
        namespaceNameSuffix: Schema.String,
        hybridConnectionName: Schema.String,
        accessKey: Schema.optional(Schema.String),
        expiresOn: Schema.optional(Schema.Number),
        serviceConfigurationToken: Schema.optional(Schema.String),
      }),
    ),
  });
export type EndpointsListCredentialsOutput =
  typeof EndpointsListCredentialsOutput.Type;

// The operation
/**
 * Gets the endpoint access credentials to the resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param endpointName - The endpoint name.
 * @param expiresin - The is how long the endpoint access token is valid (in seconds).
 */
export const EndpointsListCredentials = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: EndpointsListCredentialsInput,
    outputSchema: EndpointsListCredentialsOutput,
  }),
);
// Input Schema
export const EndpointsListIngressGatewayCredentialsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    endpointName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    expiresin: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/{resourceUri}/providers/Microsoft.HybridConnectivity/endpoints/{endpointName}/listIngressGatewayCredentials",
    }),
  );
export type EndpointsListIngressGatewayCredentialsInput =
  typeof EndpointsListIngressGatewayCredentialsInput.Type;

// Output Schema
export const EndpointsListIngressGatewayCredentialsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    relay: Schema.optional(
      Schema.Struct({
        namespaceName: Schema.String,
        namespaceNameSuffix: Schema.String,
        hybridConnectionName: Schema.String,
        accessKey: Schema.optional(Schema.String),
        expiresOn: Schema.optional(Schema.Number),
        serviceConfigurationToken: Schema.optional(Schema.String),
      }),
    ),
    ingress: Schema.optional(
      Schema.Struct({
        hostname: Schema.String,
        aadProfile: Schema.Struct({
          serverId: Schema.String,
          tenantId: Schema.String,
        }),
      }),
    ),
  });
export type EndpointsListIngressGatewayCredentialsOutput =
  typeof EndpointsListIngressGatewayCredentialsOutput.Type;

// The operation
/**
 * Gets the ingress gateway endpoint credentials
 *
 * @param api-version - The API version to use for this operation.
 * @param endpointName - The endpoint name.
 * @param expiresin - The is how long the endpoint access token is valid (in seconds).
 */
export const EndpointsListIngressGatewayCredentials =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: EndpointsListIngressGatewayCredentialsInput,
    outputSchema: EndpointsListIngressGatewayCredentialsOutput,
  }));
// Input Schema
export const EndpointsListManagedProxyDetailsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    endpointName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/{resourceUri}/providers/Microsoft.HybridConnectivity/endpoints/{endpointName}/listManagedProxyDetails",
    }),
  );
export type EndpointsListManagedProxyDetailsInput =
  typeof EndpointsListManagedProxyDetailsInput.Type;

// Output Schema
export const EndpointsListManagedProxyDetailsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    proxy: Schema.String,
    expiresOn: Schema.Number,
  });
export type EndpointsListManagedProxyDetailsOutput =
  typeof EndpointsListManagedProxyDetailsOutput.Type;

// The operation
/**
 * Fetches the managed proxy details
 *
 * @param api-version - The API version to use for this operation.
 * @param endpointName - The endpoint name.
 */
export const EndpointsListManagedProxyDetails =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: EndpointsListManagedProxyDetailsInput,
    outputSchema: EndpointsListManagedProxyDetailsOutput,
  }));
// Input Schema
export const EndpointsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  endpointName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/{resourceUri}/providers/Microsoft.HybridConnectivity/endpoints/{endpointName}",
  }),
);
export type EndpointsUpdateInput = typeof EndpointsUpdateInput.Type;

// Output Schema
export const EndpointsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type EndpointsUpdateOutput = typeof EndpointsUpdateOutput.Type;

// The operation
/**
 * Update the endpoint to the target resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param endpointName - The endpoint name.
 */
export const EndpointsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: EndpointsUpdateInput,
  outputSchema: EndpointsUpdateOutput,
}));
// Input Schema
export const GenerateAwsTemplatePostInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.HybridConnectivity/generateAwsTemplate",
    }),
  );
export type GenerateAwsTemplatePostInput =
  typeof GenerateAwsTemplatePostInput.Type;

// Output Schema
export const GenerateAwsTemplatePostOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown;
export type GenerateAwsTemplatePostOutput =
  typeof GenerateAwsTemplatePostOutput.Type;

// The operation
/**
 * Retrieve AWS Cloud Formation template
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const GenerateAwsTemplatePost = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GenerateAwsTemplatePostInput,
    outputSchema: GenerateAwsTemplatePostOutput,
  }),
);
// Input Schema
export const InventoryGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  solutionConfiguration: Schema.String.pipe(T.PathParam()),
  inventoryId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/{resourceUri}/providers/Microsoft.HybridConnectivity/solutionConfigurations/{solutionConfiguration}/inventory/{inventoryId}",
  }),
);
export type InventoryGetInput = typeof InventoryGetInput.Type;

// Output Schema
export const InventoryGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type InventoryGetOutput = typeof InventoryGetOutput.Type;

// The operation
/**
 * Get a InventoryResource
 *
 * @param api-version - The API version to use for this operation.
 * @param solutionConfiguration - Represent Solution Configuration Resource.
 * @param inventoryId - Inventory resource
 */
export const InventoryGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: InventoryGetInput,
  outputSchema: InventoryGetOutput,
}));
// Input Schema
export const InventoryListBySolutionConfigurationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    solutionConfiguration: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/{resourceUri}/providers/Microsoft.HybridConnectivity/solutionConfigurations/{solutionConfiguration}/inventory",
    }),
  );
export type InventoryListBySolutionConfigurationInput =
  typeof InventoryListBySolutionConfigurationInput.Type;

// Output Schema
export const InventoryListBySolutionConfigurationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type InventoryListBySolutionConfigurationOutput =
  typeof InventoryListBySolutionConfigurationOutput.Type;

// The operation
/**
 * List InventoryResource resources by SolutionConfiguration
 *
 * @param api-version - The API version to use for this operation.
 * @param solutionConfiguration - Represent Solution Configuration Resource.
 */
export const InventoryListBySolutionConfiguration =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: InventoryListBySolutionConfigurationInput,
    outputSchema: InventoryListBySolutionConfigurationOutput,
  }));
// Input Schema
export const PublicCloudConnectorsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    publicCloudConnector: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridConnectivity/publicCloudConnectors/{publicCloudConnector}",
    }),
  );
export type PublicCloudConnectorsCreateOrUpdateInput =
  typeof PublicCloudConnectorsCreateOrUpdateInput.Type;

// Output Schema
export const PublicCloudConnectorsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type PublicCloudConnectorsCreateOrUpdateOutput =
  typeof PublicCloudConnectorsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a PublicCloudConnector
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param publicCloudConnector - Represent public cloud connectors resource.
 */
export const PublicCloudConnectorsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PublicCloudConnectorsCreateOrUpdateInput,
    outputSchema: PublicCloudConnectorsCreateOrUpdateOutput,
  }));
// Input Schema
export const PublicCloudConnectorsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    publicCloudConnector: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridConnectivity/publicCloudConnectors/{publicCloudConnector}",
    }),
  );
export type PublicCloudConnectorsDeleteInput =
  typeof PublicCloudConnectorsDeleteInput.Type;

// Output Schema
export const PublicCloudConnectorsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PublicCloudConnectorsDeleteOutput =
  typeof PublicCloudConnectorsDeleteOutput.Type;

// The operation
/**
 * Delete a PublicCloudConnector
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param publicCloudConnector - Represent public cloud connectors resource.
 */
export const PublicCloudConnectorsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PublicCloudConnectorsDeleteInput,
    outputSchema: PublicCloudConnectorsDeleteOutput,
  }),
);
// Input Schema
export const PublicCloudConnectorsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    publicCloudConnector: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridConnectivity/publicCloudConnectors/{publicCloudConnector}",
    }),
  );
export type PublicCloudConnectorsGetInput =
  typeof PublicCloudConnectorsGetInput.Type;

// Output Schema
export const PublicCloudConnectorsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type PublicCloudConnectorsGetOutput =
  typeof PublicCloudConnectorsGetOutput.Type;

// The operation
/**
 * Get a PublicCloudConnector
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param publicCloudConnector - Represent public cloud connectors resource.
 */
export const PublicCloudConnectorsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PublicCloudConnectorsGetInput,
    outputSchema: PublicCloudConnectorsGetOutput,
  }),
);
// Input Schema
export const PublicCloudConnectorsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridConnectivity/publicCloudConnectors",
    }),
  );
export type PublicCloudConnectorsListByResourceGroupInput =
  typeof PublicCloudConnectorsListByResourceGroupInput.Type;

// Output Schema
export const PublicCloudConnectorsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type PublicCloudConnectorsListByResourceGroupOutput =
  typeof PublicCloudConnectorsListByResourceGroupOutput.Type;

// The operation
/**
 * List PublicCloudConnector resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const PublicCloudConnectorsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PublicCloudConnectorsListByResourceGroupInput,
    outputSchema: PublicCloudConnectorsListByResourceGroupOutput,
  }));
// Input Schema
export const PublicCloudConnectorsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.HybridConnectivity/publicCloudConnectors",
    }),
  );
export type PublicCloudConnectorsListBySubscriptionInput =
  typeof PublicCloudConnectorsListBySubscriptionInput.Type;

// Output Schema
export const PublicCloudConnectorsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type PublicCloudConnectorsListBySubscriptionOutput =
  typeof PublicCloudConnectorsListBySubscriptionOutput.Type;

// The operation
/**
 * List PublicCloudConnector resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const PublicCloudConnectorsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PublicCloudConnectorsListBySubscriptionInput,
    outputSchema: PublicCloudConnectorsListBySubscriptionOutput,
  }));
// Input Schema
export const PublicCloudConnectorsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    publicCloudConnector: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridConnectivity/publicCloudConnectors/{publicCloudConnector}",
    }),
  );
export type PublicCloudConnectorsUpdateInput =
  typeof PublicCloudConnectorsUpdateInput.Type;

// Output Schema
export const PublicCloudConnectorsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type PublicCloudConnectorsUpdateOutput =
  typeof PublicCloudConnectorsUpdateOutput.Type;

// The operation
/**
 * Update a PublicCloudConnector
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param publicCloudConnector - Represent public cloud connectors resource.
 */
export const PublicCloudConnectorsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PublicCloudConnectorsUpdateInput,
    outputSchema: PublicCloudConnectorsUpdateOutput,
  }),
);
// Input Schema
export const ServiceConfigurationsCreateOrupdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    endpointName: Schema.String.pipe(T.PathParam()),
    serviceConfigurationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/{resourceUri}/providers/Microsoft.HybridConnectivity/endpoints/{endpointName}/serviceConfigurations/{serviceConfigurationName}",
    }),
  );
export type ServiceConfigurationsCreateOrupdateInput =
  typeof ServiceConfigurationsCreateOrupdateInput.Type;

// Output Schema
export const ServiceConfigurationsCreateOrupdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ServiceConfigurationsCreateOrupdateOutput =
  typeof ServiceConfigurationsCreateOrupdateOutput.Type;

// The operation
/**
 * Create or update a service in serviceConfiguration for the endpoint resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param endpointName - The endpoint name.
 * @param serviceConfigurationName - The service name.
 */
export const ServiceConfigurationsCreateOrupdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServiceConfigurationsCreateOrupdateInput,
    outputSchema: ServiceConfigurationsCreateOrupdateOutput,
  }));
// Input Schema
export const ServiceConfigurationsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    endpointName: Schema.String.pipe(T.PathParam()),
    serviceConfigurationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/{resourceUri}/providers/Microsoft.HybridConnectivity/endpoints/{endpointName}/serviceConfigurations/{serviceConfigurationName}",
    }),
  );
export type ServiceConfigurationsDeleteInput =
  typeof ServiceConfigurationsDeleteInput.Type;

// Output Schema
export const ServiceConfigurationsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ServiceConfigurationsDeleteOutput =
  typeof ServiceConfigurationsDeleteOutput.Type;

// The operation
/**
 * Deletes the service details to the target resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param endpointName - The endpoint name.
 * @param serviceConfigurationName - The service name.
 */
export const ServiceConfigurationsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ServiceConfigurationsDeleteInput,
    outputSchema: ServiceConfigurationsDeleteOutput,
  }),
);
// Input Schema
export const ServiceConfigurationsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    endpointName: Schema.String.pipe(T.PathParam()),
    serviceConfigurationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/{resourceUri}/providers/Microsoft.HybridConnectivity/endpoints/{endpointName}/serviceConfigurations/{serviceConfigurationName}",
    }),
  );
export type ServiceConfigurationsGetInput =
  typeof ServiceConfigurationsGetInput.Type;

// Output Schema
export const ServiceConfigurationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ServiceConfigurationsGetOutput =
  typeof ServiceConfigurationsGetOutput.Type;

// The operation
/**
 * Gets the details about the service to the resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param endpointName - The endpoint name.
 * @param serviceConfigurationName - The service name.
 */
export const ServiceConfigurationsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ServiceConfigurationsGetInput,
    outputSchema: ServiceConfigurationsGetOutput,
  }),
);
// Input Schema
export const ServiceConfigurationsListByEndpointResourceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    endpointName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/{resourceUri}/providers/Microsoft.HybridConnectivity/endpoints/{endpointName}/serviceConfigurations",
    }),
  );
export type ServiceConfigurationsListByEndpointResourceInput =
  typeof ServiceConfigurationsListByEndpointResourceInput.Type;

// Output Schema
export const ServiceConfigurationsListByEndpointResourceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type ServiceConfigurationsListByEndpointResourceOutput =
  typeof ServiceConfigurationsListByEndpointResourceOutput.Type;

// The operation
/**
 * Lists of all the services associated with endpoint resource.
 *
 * API to enumerate registered services in service configurations under a Endpoint Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param endpointName - The endpoint name.
 */
export const ServiceConfigurationsListByEndpointResource =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServiceConfigurationsListByEndpointResourceInput,
    outputSchema: ServiceConfigurationsListByEndpointResourceOutput,
  }));
// Input Schema
export const ServiceConfigurationsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    endpointName: Schema.String.pipe(T.PathParam()),
    serviceConfigurationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/{resourceUri}/providers/Microsoft.HybridConnectivity/endpoints/{endpointName}/serviceConfigurations/{serviceConfigurationName}",
    }),
  );
export type ServiceConfigurationsUpdateInput =
  typeof ServiceConfigurationsUpdateInput.Type;

// Output Schema
export const ServiceConfigurationsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ServiceConfigurationsUpdateOutput =
  typeof ServiceConfigurationsUpdateOutput.Type;

// The operation
/**
 * Update the service details in the service configurations of the target resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param endpointName - The endpoint name.
 * @param serviceConfigurationName - The service name.
 */
export const ServiceConfigurationsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ServiceConfigurationsUpdateInput,
    outputSchema: ServiceConfigurationsUpdateOutput,
  }),
);
// Input Schema
export const SolutionConfigurationsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    solutionConfiguration: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/{resourceUri}/providers/Microsoft.HybridConnectivity/solutionConfigurations/{solutionConfiguration}",
    }),
  );
export type SolutionConfigurationsCreateOrUpdateInput =
  typeof SolutionConfigurationsCreateOrUpdateInput.Type;

// Output Schema
export const SolutionConfigurationsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SolutionConfigurationsCreateOrUpdateOutput =
  typeof SolutionConfigurationsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a SolutionConfiguration
 *
 * @param api-version - The API version to use for this operation.
 * @param solutionConfiguration - Represent Solution Configuration Resource.
 */
export const SolutionConfigurationsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SolutionConfigurationsCreateOrUpdateInput,
    outputSchema: SolutionConfigurationsCreateOrUpdateOutput,
  }));
// Input Schema
export const SolutionConfigurationsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    solutionConfiguration: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/{resourceUri}/providers/Microsoft.HybridConnectivity/solutionConfigurations/{solutionConfiguration}",
    }),
  );
export type SolutionConfigurationsDeleteInput =
  typeof SolutionConfigurationsDeleteInput.Type;

// Output Schema
export const SolutionConfigurationsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SolutionConfigurationsDeleteOutput =
  typeof SolutionConfigurationsDeleteOutput.Type;

// The operation
/**
 * Delete a SolutionConfiguration
 *
 * @param api-version - The API version to use for this operation.
 * @param solutionConfiguration - Represent Solution Configuration Resource.
 */
export const SolutionConfigurationsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SolutionConfigurationsDeleteInput,
    outputSchema: SolutionConfigurationsDeleteOutput,
  }));
// Input Schema
export const SolutionConfigurationsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    solutionConfiguration: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/{resourceUri}/providers/Microsoft.HybridConnectivity/solutionConfigurations/{solutionConfiguration}",
    }),
  );
export type SolutionConfigurationsGetInput =
  typeof SolutionConfigurationsGetInput.Type;

// Output Schema
export const SolutionConfigurationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SolutionConfigurationsGetOutput =
  typeof SolutionConfigurationsGetOutput.Type;

// The operation
/**
 * Get a SolutionConfiguration
 *
 * @param api-version - The API version to use for this operation.
 * @param solutionConfiguration - Represent Solution Configuration Resource.
 */
export const SolutionConfigurationsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SolutionConfigurationsGetInput,
    outputSchema: SolutionConfigurationsGetOutput,
  }),
);
// Input Schema
export const SolutionConfigurationsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/{resourceUri}/providers/Microsoft.HybridConnectivity/solutionConfigurations",
    }),
  );
export type SolutionConfigurationsListInput =
  typeof SolutionConfigurationsListInput.Type;

// Output Schema
export const SolutionConfigurationsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type SolutionConfigurationsListOutput =
  typeof SolutionConfigurationsListOutput.Type;

// The operation
/**
 * List SolutionConfiguration resources by parent
 *
 * @param api-version - The API version to use for this operation.
 */
export const SolutionConfigurationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SolutionConfigurationsListInput,
    outputSchema: SolutionConfigurationsListOutput,
  }),
);
// Input Schema
export const SolutionConfigurationsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    solutionConfiguration: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/{resourceUri}/providers/Microsoft.HybridConnectivity/solutionConfigurations/{solutionConfiguration}",
    }),
  );
export type SolutionConfigurationsUpdateInput =
  typeof SolutionConfigurationsUpdateInput.Type;

// Output Schema
export const SolutionConfigurationsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SolutionConfigurationsUpdateOutput =
  typeof SolutionConfigurationsUpdateOutput.Type;

// The operation
/**
 * Update a SolutionConfiguration
 *
 * @param api-version - The API version to use for this operation.
 * @param solutionConfiguration - Represent Solution Configuration Resource.
 */
export const SolutionConfigurationsUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SolutionConfigurationsUpdateInput,
    outputSchema: SolutionConfigurationsUpdateOutput,
  }));
// Input Schema
export const SolutionTypesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  solutionType: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridConnectivity/solutionTypes/{solutionType}",
  }),
);
export type SolutionTypesGetInput = typeof SolutionTypesGetInput.Type;

// Output Schema
export const SolutionTypesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type SolutionTypesGetOutput = typeof SolutionTypesGetOutput.Type;

// The operation
/**
 * Get a SolutionTypeResource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param solutionType - Solution Type resource
 */
export const SolutionTypesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SolutionTypesGetInput,
  outputSchema: SolutionTypesGetOutput,
}));
// Input Schema
export const SolutionTypesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridConnectivity/solutionTypes",
    }),
  );
export type SolutionTypesListByResourceGroupInput =
  typeof SolutionTypesListByResourceGroupInput.Type;

// Output Schema
export const SolutionTypesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type SolutionTypesListByResourceGroupOutput =
  typeof SolutionTypesListByResourceGroupOutput.Type;

// The operation
/**
 * List SolutionTypeResource resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const SolutionTypesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SolutionTypesListByResourceGroupInput,
    outputSchema: SolutionTypesListByResourceGroupOutput,
  }));
// Input Schema
export const SolutionTypesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.HybridConnectivity/solutionTypes",
    }),
  );
export type SolutionTypesListBySubscriptionInput =
  typeof SolutionTypesListBySubscriptionInput.Type;

// Output Schema
export const SolutionTypesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type SolutionTypesListBySubscriptionOutput =
  typeof SolutionTypesListBySubscriptionOutput.Type;

// The operation
/**
 * List SolutionTypeResource resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const SolutionTypesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SolutionTypesListBySubscriptionInput,
    outputSchema: SolutionTypesListBySubscriptionOutput,
  }));
