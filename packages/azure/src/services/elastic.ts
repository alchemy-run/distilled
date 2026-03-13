/**
 * Azure Elastic API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";
import { SensitiveString } from "../sensitive.ts";

// Input Schema
export const AllTrafficFiltersListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    monitorName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Elastic/monitors/{monitorName}/listAllTrafficFilters",
    }),
  );
export type AllTrafficFiltersListInput = typeof AllTrafficFiltersListInput.Type;

// Output Schema
export const AllTrafficFiltersListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    rulesets: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          description: Schema.optional(Schema.String),
          region: Schema.optional(Schema.String),
          type: Schema.optional(
            Schema.Literals(["ip", "azure_private_endpoint"]),
          ),
          includeByDefault: Schema.optional(Schema.Boolean),
          rules: Schema.optional(
            Schema.Array(
              Schema.Struct({
                source: Schema.optional(Schema.String),
                description: Schema.optional(Schema.String),
                azureEndpointGuid: Schema.optional(Schema.String),
                azureEndpointName: Schema.optional(Schema.String),
                id: Schema.optional(Schema.String),
              }),
            ),
          ),
        }),
      ),
    ),
  });
export type AllTrafficFiltersListOutput =
  typeof AllTrafficFiltersListOutput.Type;

// The operation
/**
 * List all traffic filters associated with your Elastic monitor resource, helping you manage network traffic control.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param monitorName - Monitor resource name
 */
export const AllTrafficFiltersList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AllTrafficFiltersListInput,
    outputSchema: AllTrafficFiltersListOutput,
  }),
);
// Input Schema
export const AssociateTrafficFilterAssociateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    monitorName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    rulesetId: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Elastic/monitors/{monitorName}/associateTrafficFilter",
    }),
  );
export type AssociateTrafficFilterAssociateInput =
  typeof AssociateTrafficFilterAssociateInput.Type;

// Output Schema
export const AssociateTrafficFilterAssociateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AssociateTrafficFilterAssociateOutput =
  typeof AssociateTrafficFilterAssociateOutput.Type;

// The operation
/**
 * Associate a traffic filter with your Elastic monitor resource to control and manage network traffic.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param monitorName - Monitor resource name
 * @param rulesetId - Ruleset Id of the filter
 */
export const AssociateTrafficFilterAssociate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AssociateTrafficFilterAssociateInput,
    outputSchema: AssociateTrafficFilterAssociateOutput,
  }));
// Input Schema
export const BillingInfoGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  monitorName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Elastic/monitors/{monitorName}/getBillingInfo",
  }),
);
export type BillingInfoGetInput = typeof BillingInfoGetInput.Type;

// Output Schema
export const BillingInfoGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  marketplaceSaasInfo: Schema.optional(
    Schema.Struct({
      marketplaceSubscription: Schema.optional(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          publisherId: Schema.optional(Schema.String),
          offerId: Schema.optional(Schema.String),
        }),
      ),
      marketplaceName: Schema.optional(Schema.String),
      marketplaceResourceId: Schema.optional(Schema.String),
      marketplaceStatus: Schema.optional(Schema.String),
      billedAzureSubscriptionId: Schema.optional(Schema.String),
      subscribed: Schema.optional(Schema.Boolean),
    }),
  ),
  partnerBillingEntity: Schema.optional(
    Schema.Struct({
      id: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      partnerEntityUri: Schema.optional(Schema.String),
    }),
  ),
});
export type BillingInfoGetOutput = typeof BillingInfoGetOutput.Type;

// The operation
/**
 * Retrieve marketplace and organization billing information mapped to the given Elastic monitor resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param monitorName - Monitor resource name
 */
export const BillingInfoGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: BillingInfoGetInput,
  outputSchema: BillingInfoGetOutput,
}));
// Input Schema
export const ConnectedPartnerResourcesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    monitorName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Elastic/monitors/{monitorName}/listConnectedPartnerResources",
    }),
  );
export type ConnectedPartnerResourcesListInput =
  typeof ConnectedPartnerResourcesListInput.Type;

// Output Schema
export const ConnectedPartnerResourcesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        properties: Schema.optional(
          Schema.Struct({
            partnerDeploymentName: Schema.optional(Schema.String),
            partnerDeploymentUri: Schema.optional(Schema.String),
            azureResourceId: Schema.optional(Schema.String),
            location: Schema.optional(Schema.String),
            type: Schema.optional(Schema.String),
          }),
        ),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ConnectedPartnerResourcesListOutput =
  typeof ConnectedPartnerResourcesListOutput.Type;

// The operation
/**
 * List all active deployments associated with the marketplace subscription linked to the given Elastic monitor resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param monitorName - Monitor resource name
 */
export const ConnectedPartnerResourcesList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConnectedPartnerResourcesListInput,
    outputSchema: ConnectedPartnerResourcesListOutput,
  }));
// Input Schema
export const CreateAndAssociateIPFilterCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    monitorName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    ips: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Elastic/monitors/{monitorName}/createAndAssociateIPFilter",
    }),
  );
export type CreateAndAssociateIPFilterCreateInput =
  typeof CreateAndAssociateIPFilterCreateInput.Type;

// Output Schema
export const CreateAndAssociateIPFilterCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CreateAndAssociateIPFilterCreateOutput =
  typeof CreateAndAssociateIPFilterCreateOutput.Type;

// The operation
/**
 * Create and associate an IP filter with your Elastic monitor resource to control and manage network traffic.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param monitorName - Monitor resource name
 * @param ips - List of ips
 * @param name - Name of the traffic filter
 */
export const createAndAssociateIPFilterCreate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CreateAndAssociateIPFilterCreateInput,
    outputSchema: CreateAndAssociateIPFilterCreateOutput,
  }));
// Input Schema
export const CreateAndAssociatePLFilterCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    monitorName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    name: Schema.optional(Schema.String),
    privateEndpointGuid: Schema.optional(Schema.String),
    privateEndpointName: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Elastic/monitors/{monitorName}/createAndAssociatePLFilter",
    }),
  );
export type CreateAndAssociatePLFilterCreateInput =
  typeof CreateAndAssociatePLFilterCreateInput.Type;

// Output Schema
export const CreateAndAssociatePLFilterCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CreateAndAssociatePLFilterCreateOutput =
  typeof CreateAndAssociatePLFilterCreateOutput.Type;

// The operation
/**
 * Create and associate a PL filter with your Elastic monitor resource to control and manage network traffic.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param monitorName - Monitor resource name
 * @param name - Name of the traffic filter
 * @param privateEndpointGuid - Guid of the private endpoint
 * @param privateEndpointName - Name of the private endpoint
 */
export const createAndAssociatePLFilterCreate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CreateAndAssociatePLFilterCreateInput,
    outputSchema: CreateAndAssociatePLFilterCreateOutput,
  }));
// Input Schema
export const DeploymentInfoListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    monitorName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Elastic/monitors/{monitorName}/listDeploymentInfo",
    }),
  );
export type DeploymentInfoListInput = typeof DeploymentInfoListInput.Type;

// Output Schema
export const DeploymentInfoListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    status: Schema.optional(Schema.Literals(["Healthy", "Unhealthy"])),
    version: Schema.optional(Schema.String),
    memoryCapacity: Schema.optional(Schema.String),
    diskCapacity: Schema.optional(Schema.String),
    elasticsearchEndPoint: Schema.optional(Schema.String),
    deploymentUrl: Schema.optional(Schema.String),
    marketplaceSaasInfo: Schema.optional(
      Schema.Struct({
        marketplaceSubscription: Schema.optional(
          Schema.Struct({
            id: Schema.optional(Schema.String),
            publisherId: Schema.optional(Schema.String),
            offerId: Schema.optional(Schema.String),
          }),
        ),
        marketplaceName: Schema.optional(Schema.String),
        marketplaceResourceId: Schema.optional(Schema.String),
        marketplaceStatus: Schema.optional(Schema.String),
        billedAzureSubscriptionId: Schema.optional(Schema.String),
        subscribed: Schema.optional(Schema.Boolean),
      }),
    ),
    projectType: Schema.optional(Schema.String),
    configurationType: Schema.optional(Schema.String),
  });
export type DeploymentInfoListOutput = typeof DeploymentInfoListOutput.Type;

// The operation
/**
 * Fetch detailed information about Elastic cloud deployments corresponding to the Elastic monitor resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param monitorName - Monitor resource name
 */
export const DeploymentInfoList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DeploymentInfoListInput,
  outputSchema: DeploymentInfoListOutput,
}));
// Input Schema
export const DetachAndDeleteTrafficFilterDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    monitorName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    rulesetId: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Elastic/monitors/{monitorName}/detachAndDeleteTrafficFilter",
    }),
  );
export type DetachAndDeleteTrafficFilterDeleteInput =
  typeof DetachAndDeleteTrafficFilterDeleteInput.Type;

// Output Schema
export const DetachAndDeleteTrafficFilterDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DetachAndDeleteTrafficFilterDeleteOutput =
  typeof DetachAndDeleteTrafficFilterDeleteOutput.Type;

// The operation
/**
 * Detach and delete an existing traffic filter from your Elastic monitor resource, removing its network traffic control capabilities.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param monitorName - Monitor resource name
 * @param rulesetId - Ruleset Id of the filter
 */
export const DetachAndDeleteTrafficFilterDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DetachAndDeleteTrafficFilterDeleteInput,
    outputSchema: DetachAndDeleteTrafficFilterDeleteOutput,
  }));
// Input Schema
export const DetachTrafficFilterUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    monitorName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    rulesetId: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Elastic/monitors/{monitorName}/detachTrafficFilter",
    }),
  );
export type DetachTrafficFilterUpdateInput =
  typeof DetachTrafficFilterUpdateInput.Type;

// Output Schema
export const DetachTrafficFilterUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DetachTrafficFilterUpdateOutput =
  typeof DetachTrafficFilterUpdateOutput.Type;

// The operation
/**
 * Detach an existing traffic filter from your Elastic monitor resource, removing its network traffic control capabilities.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param monitorName - Monitor resource name
 * @param rulesetId - Ruleset Id of the filter
 */
export const DetachTrafficFilterUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DetachTrafficFilterUpdateInput,
    outputSchema: DetachTrafficFilterUpdateOutput,
  }),
);
// Input Schema
export const ElasticVersionsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    region: Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Elastic/elasticVersions",
    }),
  );
export type ElasticVersionsListInput = typeof ElasticVersionsListInput.Type;

// Output Schema
export const ElasticVersionsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        properties: Schema.optional(
          Schema.Struct({
            version: Schema.optional(Schema.String),
          }),
        ),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ElasticVersionsListOutput = typeof ElasticVersionsListOutput.Type;

// The operation
/**
 * Retrieve a list of all available Elastic versions for a specified region, helping you choose the best version for your deployment.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param region - Region where elastic deployment will take place.
 */
export const ElasticVersionsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ElasticVersionsListInput,
  outputSchema: ElasticVersionsListOutput,
}));
// Input Schema
export const ExternalUserCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    monitorName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Elastic/monitors/{monitorName}/createOrUpdateExternalUser",
    }),
  );
export type ExternalUserCreateOrUpdateInput =
  typeof ExternalUserCreateOrUpdateInput.Type;

// Output Schema
export const ExternalUserCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    created: Schema.optional(Schema.Boolean),
  });
export type ExternalUserCreateOrUpdateOutput =
  typeof ExternalUserCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update external user configurations for your Elastic monitor resource, enabling access and management by external users.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param monitorName - Monitor resource name
 */
export const ExternalUserCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ExternalUserCreateOrUpdateInput,
    outputSchema: ExternalUserCreateOrUpdateOutput,
  }),
);
// Input Schema
export const ListAssociatedTrafficFiltersListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    monitorName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Elastic/monitors/{monitorName}/listAssociatedTrafficFilters",
    }),
  );
export type ListAssociatedTrafficFiltersListInput =
  typeof ListAssociatedTrafficFiltersListInput.Type;

// Output Schema
export const ListAssociatedTrafficFiltersListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    rulesets: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          description: Schema.optional(Schema.String),
          region: Schema.optional(Schema.String),
          type: Schema.optional(
            Schema.Literals(["ip", "azure_private_endpoint"]),
          ),
          includeByDefault: Schema.optional(Schema.Boolean),
          rules: Schema.optional(
            Schema.Array(
              Schema.Struct({
                source: Schema.optional(Schema.String),
                description: Schema.optional(Schema.String),
                azureEndpointGuid: Schema.optional(Schema.String),
                azureEndpointName: Schema.optional(Schema.String),
                id: Schema.optional(Schema.String),
              }),
            ),
          ),
        }),
      ),
    ),
  });
export type ListAssociatedTrafficFiltersListOutput =
  typeof ListAssociatedTrafficFiltersListOutput.Type;

// The operation
/**
 * List all traffic filters associated with your Elastic monitor resource, helping you manage network traffic control.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param monitorName - Monitor resource name
 */
export const listAssociatedTrafficFiltersList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ListAssociatedTrafficFiltersListInput,
    outputSchema: ListAssociatedTrafficFiltersListOutput,
  }));
// Input Schema
export const MonitoredResourcesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    monitorName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Elastic/monitors/{monitorName}/listMonitoredResources",
    }),
  );
export type MonitoredResourcesListInput =
  typeof MonitoredResourcesListInput.Type;

// Output Schema
export const MonitoredResourcesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        sendingLogs: Schema.optional(Schema.Literals(["True", "False"])),
        reasonForLogsStatus: Schema.optional(Schema.String),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type MonitoredResourcesListOutput =
  typeof MonitoredResourcesListOutput.Type;

// The operation
/**
 * List all resources currently being monitored by the Elastic monitor resource, helping you manage observability.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param monitorName - Monitor resource name
 */
export const MonitoredResourcesList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: MonitoredResourcesListInput,
    outputSchema: MonitoredResourcesListOutput,
  }),
);
// Input Schema
export const MonitoredSubscriptionsCreateorUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    monitorName: Schema.String.pipe(T.PathParam()),
    configurationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Elastic/monitors/{monitorName}/monitoredSubscriptions/{configurationName}",
    }),
  );
export type MonitoredSubscriptionsCreateorUpdateInput =
  typeof MonitoredSubscriptionsCreateorUpdateInput.Type;

// Output Schema
export const MonitoredSubscriptionsCreateorUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type MonitoredSubscriptionsCreateorUpdateOutput =
  typeof MonitoredSubscriptionsCreateorUpdateOutput.Type;

// The operation
/**
 * Add subscriptions to be monitored by the Elastic monitor resource, enabling observability and monitoring.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const MonitoredSubscriptionsCreateorUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MonitoredSubscriptionsCreateorUpdateInput,
    outputSchema: MonitoredSubscriptionsCreateorUpdateOutput,
  }));
// Input Schema
export const MonitoredSubscriptionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    monitorName: Schema.String.pipe(T.PathParam()),
    configurationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Elastic/monitors/{monitorName}/monitoredSubscriptions/{configurationName}",
    }),
  );
export type MonitoredSubscriptionsDeleteInput =
  typeof MonitoredSubscriptionsDeleteInput.Type;

// Output Schema
export const MonitoredSubscriptionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type MonitoredSubscriptionsDeleteOutput =
  typeof MonitoredSubscriptionsDeleteOutput.Type;

// The operation
/**
 * Delete subscriptions being monitored by the Elastic monitor resource, removing their observability and monitoring capabilities.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param monitorName - Monitor resource name
 * @param configurationName - The configuration name. Only 'default' value is supported.
 */
export const MonitoredSubscriptionsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MonitoredSubscriptionsDeleteInput,
    outputSchema: MonitoredSubscriptionsDeleteOutput,
  }));
// Input Schema
export const MonitoredSubscriptionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    monitorName: Schema.String.pipe(T.PathParam()),
    configurationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Elastic/monitors/{monitorName}/monitoredSubscriptions/{configurationName}",
    }),
  );
export type MonitoredSubscriptionsGetInput =
  typeof MonitoredSubscriptionsGetInput.Type;

// Output Schema
export const MonitoredSubscriptionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type MonitoredSubscriptionsGetOutput =
  typeof MonitoredSubscriptionsGetOutput.Type;

// The operation
/**
 * Get detailed information about all subscriptions currently being monitored by the Elastic monitor resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param monitorName - Monitor resource name
 * @param configurationName - The configuration name. Only 'default' value is supported.
 */
export const MonitoredSubscriptionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: MonitoredSubscriptionsGetInput,
    outputSchema: MonitoredSubscriptionsGetOutput,
  }),
);
// Input Schema
export const MonitoredSubscriptionsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    monitorName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Elastic/monitors/{monitorName}/monitoredSubscriptions",
    }),
  );
export type MonitoredSubscriptionsListInput =
  typeof MonitoredSubscriptionsListInput.Type;

// Output Schema
export const MonitoredSubscriptionsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type MonitoredSubscriptionsListOutput =
  typeof MonitoredSubscriptionsListOutput.Type;

// The operation
/**
 * List all subscriptions currently being monitored by the Elastic monitor resource, helping you manage observability.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param monitorName - Monitor resource name
 */
export const MonitoredSubscriptionsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: MonitoredSubscriptionsListInput,
    outputSchema: MonitoredSubscriptionsListOutput,
  }),
);
// Input Schema
export const MonitoredSubscriptionsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    monitorName: Schema.String.pipe(T.PathParam()),
    configurationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Elastic/monitors/{monitorName}/monitoredSubscriptions/{configurationName}",
    }),
  );
export type MonitoredSubscriptionsUpdateInput =
  typeof MonitoredSubscriptionsUpdateInput.Type;

// Output Schema
export const MonitoredSubscriptionsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type MonitoredSubscriptionsUpdateOutput =
  typeof MonitoredSubscriptionsUpdateOutput.Type;

// The operation
/**
 * Update subscriptions to be monitored by the Elastic monitor resource, ensuring optimal observability and performance.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const MonitoredSubscriptionsUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MonitoredSubscriptionsUpdateInput,
    outputSchema: MonitoredSubscriptionsUpdateOutput,
  }));
// Input Schema
export const MonitorsCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  monitorName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Elastic/monitors/{monitorName}",
  }),
);
export type MonitorsCreateInput = typeof MonitorsCreateInput.Type;

// Output Schema
export const MonitorsCreateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type MonitorsCreateOutput = typeof MonitorsCreateOutput.Type;

// The operation
/**
 * Create a new Elastic monitor resource in your Azure subscription, enabling observability and monitoring of your Azure resources through Elastic.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const MonitorsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: MonitorsCreateInput,
  outputSchema: MonitorsCreateOutput,
}));
// Input Schema
export const MonitorsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  monitorName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Elastic/monitors/{monitorName}",
  }),
);
export type MonitorsDeleteInput = typeof MonitorsDeleteInput.Type;

// Output Schema
export const MonitorsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type MonitorsDeleteOutput = typeof MonitorsDeleteOutput.Type;

// The operation
/**
 * Delete an existing Elastic monitor resource from your Azure subscription, removing its observability and monitoring capabilities.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param monitorName - Monitor resource name
 */
export const MonitorsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: MonitorsDeleteInput,
  outputSchema: MonitorsDeleteOutput,
}));
// Input Schema
export const MonitorsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  monitorName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Elastic/monitors/{monitorName}",
  }),
);
export type MonitorsGetInput = typeof MonitorsGetInput.Type;

// Output Schema
export const MonitorsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type MonitorsGetOutput = typeof MonitorsGetOutput.Type;

// The operation
/**
 * Get detailed properties of a specific Elastic monitor resource, helping you manage observability and performance.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param monitorName - Monitor resource name
 */
export const MonitorsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: MonitorsGetInput,
  outputSchema: MonitorsGetOutput,
}));
// Input Schema
export const MonitorsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.Elastic/monitors",
  }),
);
export type MonitorsListInput = typeof MonitorsListInput.Type;

// Output Schema
export const MonitorsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(
    Schema.Struct({
      tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      location: Schema.String,
    }),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type MonitorsListOutput = typeof MonitorsListOutput.Type;

// The operation
/**
 * List all Elastic monitor resources within a specified subscription, helping you audit and manage your monitoring setup.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const MonitorsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: MonitorsListInput,
  outputSchema: MonitorsListOutput,
}));
// Input Schema
export const MonitorsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Elastic/monitors",
    }),
  );
export type MonitorsListByResourceGroupInput =
  typeof MonitorsListByResourceGroupInput.Type;

// Output Schema
export const MonitorsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type MonitorsListByResourceGroupOutput =
  typeof MonitorsListByResourceGroupOutput.Type;

// The operation
/**
 * List all Elastic monitor resources within a specified resource group of the subscription, helping you audit and manage your monitoring setup.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const MonitorsListByResourceGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: MonitorsListByResourceGroupInput,
    outputSchema: MonitorsListByResourceGroupOutput,
  }),
);
// Input Schema
export const MonitorsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  monitorName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Elastic/monitors/{monitorName}",
  }),
);
export type MonitorsUpdateInput = typeof MonitorsUpdateInput.Type;

// Output Schema
export const MonitorsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type MonitorsUpdateOutput = typeof MonitorsUpdateOutput.Type;

// The operation
/**
 * Update an existing Elastic monitor resource in your Azure subscription, ensuring optimal observability and performance.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const MonitorsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: MonitorsUpdateInput,
  outputSchema: MonitorsUpdateOutput,
}));
// Input Schema
export const MonitorUpgradeInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  monitorName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Elastic/monitors/{monitorName}/upgrade",
  }),
);
export type MonitorUpgradeInput = typeof MonitorUpgradeInput.Type;

// Output Schema
export const MonitorUpgradeOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type MonitorUpgradeOutput = typeof MonitorUpgradeOutput.Type;

// The operation
/**
 * Upgrade the Elastic monitor resource to a newer version, ensuring optimal observability and performance.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param monitorName - Monitor resource name
 */
export const MonitorUpgrade = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: MonitorUpgradeInput,
  outputSchema: MonitorUpgradeOutput,
}));
// Input Schema
export const OpenAICreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    monitorName: Schema.String.pipe(T.PathParam()),
    integrationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Elastic/monitors/{monitorName}/openAIIntegrations/{integrationName}",
    }),
  );
export type OpenAICreateOrUpdateInput = typeof OpenAICreateOrUpdateInput.Type;

// Output Schema
export const OpenAICreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type OpenAICreateOrUpdateOutput = typeof OpenAICreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update an OpenAI integration rule for a given Elastic monitor resource, enabling advanced AI-driven observability and monitoring.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const OpenAICreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: OpenAICreateOrUpdateInput,
    outputSchema: OpenAICreateOrUpdateOutput,
  }),
);
// Input Schema
export const OpenAIDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  monitorName: Schema.String.pipe(T.PathParam()),
  integrationName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Elastic/monitors/{monitorName}/openAIIntegrations/{integrationName}",
  }),
);
export type OpenAIDeleteInput = typeof OpenAIDeleteInput.Type;

// Output Schema
export const OpenAIDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type OpenAIDeleteOutput = typeof OpenAIDeleteOutput.Type;

// The operation
/**
 * Delete an OpenAI integration rule for a given Elastic monitor resource, removing AI-driven observability and monitoring capabilities.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param monitorName - Monitor resource name
 * @param integrationName - OpenAI Integration name
 */
export const OpenAIDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OpenAIDeleteInput,
  outputSchema: OpenAIDeleteOutput,
}));
// Input Schema
export const OpenAIGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  monitorName: Schema.String.pipe(T.PathParam()),
  integrationName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Elastic/monitors/{monitorName}/openAIIntegrations/{integrationName}",
  }),
);
export type OpenAIGetInput = typeof OpenAIGetInput.Type;

// Output Schema
export const OpenAIGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type OpenAIGetOutput = typeof OpenAIGetOutput.Type;

// The operation
/**
 * Get detailed information about OpenAI integration rules for a given Elastic monitor resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param monitorName - Monitor resource name
 * @param integrationName - OpenAI Integration name
 */
export const OpenAIGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OpenAIGetInput,
  outputSchema: OpenAIGetOutput,
}));
// Input Schema
export const OpenAIGetStatusInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  monitorName: Schema.String.pipe(T.PathParam()),
  integrationName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Elastic/monitors/{monitorName}/openAIIntegrations/{integrationName}/getStatus",
  }),
);
export type OpenAIGetStatusInput = typeof OpenAIGetStatusInput.Type;

// Output Schema
export const OpenAIGetStatusOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  properties: Schema.optional(
    Schema.Struct({
      status: Schema.optional(Schema.String),
    }),
  ),
});
export type OpenAIGetStatusOutput = typeof OpenAIGetStatusOutput.Type;

// The operation
/**
 * Get the status of OpenAI integration for a given Elastic monitor resource, ensuring optimal observability and performance.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param monitorName - Monitor resource name
 * @param integrationName - OpenAI Integration name
 */
export const OpenAIGetStatus = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OpenAIGetStatusInput,
  outputSchema: OpenAIGetStatusOutput,
}));
// Input Schema
export const OpenAIListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  monitorName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Elastic/monitors/{monitorName}/openAIIntegrations",
  }),
);
export type OpenAIListInput = typeof OpenAIListInput.Type;

// Output Schema
export const OpenAIListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(Schema.Struct({})),
  nextLink: Schema.optional(Schema.String),
});
export type OpenAIListOutput = typeof OpenAIListOutput.Type;

// The operation
/**
 * List all OpenAI integration rules for a given Elastic monitor resource, helping you manage AI-driven observability and monitoring.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param monitorName - Monitor resource name
 */
export const OpenAIList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OpenAIListInput,
  outputSchema: OpenAIListOutput,
}));
// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  "api-version": Schema.String,
}).pipe(
  T.Http({ method: "GET", path: "/providers/Microsoft.Elastic/operations" }),
);
export type OperationsListInput = typeof OperationsListInput.Type;

// Output Schema
export const OperationsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(
    Schema.Struct({
      name: Schema.optional(Schema.String),
      isDataAction: Schema.optional(Schema.Boolean),
      display: Schema.optional(
        Schema.Struct({
          provider: Schema.optional(Schema.String),
          resource: Schema.optional(Schema.String),
          operation: Schema.optional(Schema.String),
          description: Schema.optional(Schema.String),
        }),
      ),
      origin: Schema.optional(Schema.String),
    }),
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
export const OrganizationsGetApiKeyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Elastic/getOrganizationApiKey",
    }),
  );
export type OrganizationsGetApiKeyInput =
  typeof OrganizationsGetApiKeyInput.Type;

// Output Schema
export const OrganizationsGetApiKeyOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    properties: Schema.optional(
      Schema.Struct({
        apiKey: Schema.optional(SensitiveString),
      }),
    ),
  });
export type OrganizationsGetApiKeyOutput =
  typeof OrganizationsGetApiKeyOutput.Type;

// The operation
/**
 * Fetch the User API Key from the internal database, if it was generated and stored during the creation of the Elasticsearch Organization.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const OrganizationsGetApiKey = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: OrganizationsGetApiKeyInput,
    outputSchema: OrganizationsGetApiKeyOutput,
  }),
);
// Input Schema
export const OrganizationsGetElasticToAzureSubscriptionMappingInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Elastic/getElasticOrganizationToAzureSubscriptionMapping",
    }),
  );
export type OrganizationsGetElasticToAzureSubscriptionMappingInput =
  typeof OrganizationsGetElasticToAzureSubscriptionMappingInput.Type;

// Output Schema
export const OrganizationsGetElasticToAzureSubscriptionMappingOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    properties: Schema.optional(
      Schema.Struct({
        billedAzureSubscriptionId: Schema.optional(Schema.String),
        marketplaceSaasInfo: Schema.optional(
          Schema.Struct({
            marketplaceSubscription: Schema.optional(
              Schema.Struct({
                id: Schema.optional(Schema.String),
                publisherId: Schema.optional(Schema.String),
                offerId: Schema.optional(Schema.String),
              }),
            ),
            marketplaceName: Schema.optional(Schema.String),
            marketplaceResourceId: Schema.optional(Schema.String),
            marketplaceStatus: Schema.optional(Schema.String),
            billedAzureSubscriptionId: Schema.optional(Schema.String),
            subscribed: Schema.optional(Schema.Boolean),
          }),
        ),
        elasticOrganizationId: Schema.optional(Schema.String),
        elasticOrganizationName: Schema.optional(Schema.String),
      }),
    ),
  });
export type OrganizationsGetElasticToAzureSubscriptionMappingOutput =
  typeof OrganizationsGetElasticToAzureSubscriptionMappingOutput.Type;

// The operation
/**
 * Retrieve mapping details between the Elastic Organization and Azure Subscription for the logged-in user.
 *
 * >;
 * /**
 * Retrieve mapping details between the Elastic Organization and Azure Subscription for the logged-in user.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const OrganizationsGetElasticToAzureSubscriptionMapping =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: OrganizationsGetElasticToAzureSubscriptionMappingInput,
    outputSchema: OrganizationsGetElasticToAzureSubscriptionMappingOutput,
  }));
// Input Schema
export const OrganizationsResubscribeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    monitorName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Elastic/monitors/{monitorName}/resubscribe",
    }),
  );
export type OrganizationsResubscribeInput =
  typeof OrganizationsResubscribeInput.Type;

// Output Schema
export const OrganizationsResubscribeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type OrganizationsResubscribeOutput =
  typeof OrganizationsResubscribeOutput.Type;

// The operation
/**
 * Resubscribe the Elasticsearch Organization.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param monitorName - Monitor resource name
 */
export const OrganizationsResubscribe = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: OrganizationsResubscribeInput,
    outputSchema: OrganizationsResubscribeOutput,
  }),
);
// Input Schema
export const TagRulesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    monitorName: Schema.String.pipe(T.PathParam()),
    ruleSetName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Elastic/monitors/{monitorName}/tagRules/{ruleSetName}",
    }),
  );
export type TagRulesCreateOrUpdateInput =
  typeof TagRulesCreateOrUpdateInput.Type;

// Output Schema
export const TagRulesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type TagRulesCreateOrUpdateOutput =
  typeof TagRulesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a tag rule set for a given Elastic monitor resource, enabling fine-grained control over observability based on resource tags.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const TagRulesCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: TagRulesCreateOrUpdateInput,
    outputSchema: TagRulesCreateOrUpdateOutput,
  }),
);
// Input Schema
export const TagRulesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  monitorName: Schema.String.pipe(T.PathParam()),
  ruleSetName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Elastic/monitors/{monitorName}/tagRules/{ruleSetName}",
  }),
);
export type TagRulesDeleteInput = typeof TagRulesDeleteInput.Type;

// Output Schema
export const TagRulesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type TagRulesDeleteOutput = typeof TagRulesDeleteOutput.Type;

// The operation
/**
 * Delete a tag rule set for a given Elastic monitor resource, removing fine-grained control over observability based on resource tags.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param monitorName - Monitor resource name
 * @param ruleSetName - Tag Rule Set resource name
 */
export const TagRulesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TagRulesDeleteInput,
  outputSchema: TagRulesDeleteOutput,
}));
// Input Schema
export const TagRulesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  monitorName: Schema.String.pipe(T.PathParam()),
  ruleSetName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Elastic/monitors/{monitorName}/tagRules/{ruleSetName}",
  }),
);
export type TagRulesGetInput = typeof TagRulesGetInput.Type;

// Output Schema
export const TagRulesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type TagRulesGetOutput = typeof TagRulesGetOutput.Type;

// The operation
/**
 * Get detailed information about a tag rule set for a given Elastic monitor resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param monitorName - Monitor resource name
 * @param ruleSetName - Tag Rule Set resource name
 */
export const TagRulesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TagRulesGetInput,
  outputSchema: TagRulesGetOutput,
}));
// Input Schema
export const TagRulesListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  monitorName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Elastic/monitors/{monitorName}/tagRules",
  }),
);
export type TagRulesListInput = typeof TagRulesListInput.Type;

// Output Schema
export const TagRulesListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(Schema.Struct({})),
  nextLink: Schema.optional(Schema.String),
});
export type TagRulesListOutput = typeof TagRulesListOutput.Type;

// The operation
/**
 * List all tag rules for a given Elastic monitor resource, helping you manage fine-grained control over observability based on resource tags.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param monitorName - Monitor resource name
 */
export const TagRulesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TagRulesListInput,
  outputSchema: TagRulesListOutput,
}));
// Input Schema
export const TrafficFiltersDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    monitorName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    rulesetId: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Elastic/monitors/{monitorName}/deleteTrafficFilter",
    }),
  );
export type TrafficFiltersDeleteInput = typeof TrafficFiltersDeleteInput.Type;

// Output Schema
export const TrafficFiltersDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type TrafficFiltersDeleteOutput = typeof TrafficFiltersDeleteOutput.Type;

// The operation
/**
 * Delete an existing traffic filter associated with your Elastic monitor resource, removing its network traffic control capabilities.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param monitorName - Monitor resource name
 * @param rulesetId - Ruleset Id of the filter
 */
export const TrafficFiltersDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: TrafficFiltersDeleteInput,
    outputSchema: TrafficFiltersDeleteOutput,
  }),
);
// Input Schema
export const UpgradableVersionsDetailsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    monitorName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Elastic/monitors/{monitorName}/listUpgradableVersions",
    }),
  );
export type UpgradableVersionsDetailsInput =
  typeof UpgradableVersionsDetailsInput.Type;

// Output Schema
export const UpgradableVersionsDetailsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    currentVersion: Schema.optional(Schema.String),
    upgradableVersions: Schema.optional(Schema.Array(Schema.String)),
  });
export type UpgradableVersionsDetailsOutput =
  typeof UpgradableVersionsDetailsOutput.Type;

// The operation
/**
 * List all upgradable versions for your Elastic monitor resource, helping you plan and execute upgrades.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param monitorName - Monitor resource name
 */
export const UpgradableVersionsDetails = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: UpgradableVersionsDetailsInput,
    outputSchema: UpgradableVersionsDetailsOutput,
  }),
);
// Input Schema
export const VMCollectionUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    monitorName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Elastic/monitors/{monitorName}/vmCollectionUpdate",
    }),
  );
export type VMCollectionUpdateInput = typeof VMCollectionUpdateInput.Type;

// Output Schema
export const VMCollectionUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type VMCollectionUpdateOutput = typeof VMCollectionUpdateOutput.Type;

// The operation
/**
 * Update the VM details that will be monitored by the Elastic monitor resource, ensuring optimal observability and performance.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param monitorName - Monitor resource name
 */
export const VMCollectionUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: VMCollectionUpdateInput,
  outputSchema: VMCollectionUpdateOutput,
}));
// Input Schema
export const VMHostListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  monitorName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Elastic/monitors/{monitorName}/listVMHost",
  }),
);
export type VMHostListInput = typeof VMHostListInput.Type;

// Output Schema
export const VMHostListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(
    Schema.Struct({
      vmResourceId: Schema.optional(Schema.String),
    }),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type VMHostListOutput = typeof VMHostListOutput.Type;

// The operation
/**
 * List all VM resources currently being monitored by the Elastic monitor resource, helping you manage observability.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param monitorName - Monitor resource name
 */
export const VMHostList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: VMHostListInput,
  outputSchema: VMHostListOutput,
}));
// Input Schema
export const VMIngestionDetailsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    monitorName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Elastic/monitors/{monitorName}/vmIngestionDetails",
    }),
  );
export type VMIngestionDetailsInput = typeof VMIngestionDetailsInput.Type;

// Output Schema
export const VMIngestionDetailsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    cloudId: Schema.optional(Schema.String),
    ingestionKey: Schema.optional(Schema.String),
  });
export type VMIngestionDetailsOutput = typeof VMIngestionDetailsOutput.Type;

// The operation
/**
 * List detailed information about VM ingestion that will be monitored by the Elastic monitor resource, ensuring optimal observability and performance.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param monitorName - Monitor resource name
 */
export const VMIngestionDetails = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: VMIngestionDetailsInput,
  outputSchema: VMIngestionDetailsOutput,
}));
