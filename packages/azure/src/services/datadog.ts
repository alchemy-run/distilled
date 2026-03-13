/**
 * Azure Datadog API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";
import { SensitiveString } from "../sensitive.ts";

// Input Schema
export const BillingInfoGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  monitorName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Datadog/monitors/{monitorName}/getBillingInfo",
  }),
);
export type BillingInfoGetInput = typeof BillingInfoGetInput.Type;

// Output Schema
export const BillingInfoGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  marketplaceSaasInfo: Schema.optional(
    Schema.Struct({
      marketplaceSubscriptionId: Schema.optional(Schema.String),
      marketplaceName: Schema.optional(Schema.String),
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
 * Get marketplace and organization info mapped to the given monitor.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param monitorName - Monitor resource name
 */
export const BillingInfoGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: BillingInfoGetInput,
  outputSchema: BillingInfoGetOutput,
}));
// Input Schema
export const CreationSupportedGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    datadogOrganizationId: Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Datadog/subscriptionStatuses/default",
    }),
  );
export type CreationSupportedGetInput = typeof CreationSupportedGetInput.Type;

// Output Schema
export const CreationSupportedGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    properties: Schema.optional(
      Schema.Struct({
        name: Schema.optional(Schema.String),
        creationSupported: Schema.optional(Schema.Boolean),
      }),
    ),
  });
export type CreationSupportedGetOutput = typeof CreationSupportedGetOutput.Type;

// The operation
/**
 * Informs if the current subscription is being already monitored for selected Datadog organization.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param datadogOrganizationId - Datadog Organization Id
 */
export const CreationSupportedGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CreationSupportedGetInput,
    outputSchema: CreationSupportedGetOutput,
  }),
);
// Input Schema
export const CreationSupportedListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    datadogOrganizationId: Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Datadog/subscriptionStatuses",
    }),
  );
export type CreationSupportedListInput = typeof CreationSupportedListInput.Type;

// Output Schema
export const CreationSupportedListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        properties: Schema.optional(
          Schema.Struct({
            name: Schema.optional(Schema.String),
            creationSupported: Schema.optional(Schema.Boolean),
          }),
        ),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type CreationSupportedListOutput =
  typeof CreationSupportedListOutput.Type;

// The operation
/**
 * Informs if the current subscription is being already monitored for selected Datadog organization.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param datadogOrganizationId - Datadog Organization Id
 */
export const CreationSupportedList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CreationSupportedListInput,
    outputSchema: CreationSupportedListOutput,
  }),
);
// Input Schema
export const MarketplaceAgreementsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Datadog/agreements/default",
    }),
  );
export type MarketplaceAgreementsCreateOrUpdateInput =
  typeof MarketplaceAgreementsCreateOrUpdateInput.Type;

// Output Schema
export const MarketplaceAgreementsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        publisher: Schema.optional(Schema.String),
        product: Schema.optional(Schema.String),
        plan: Schema.optional(Schema.String),
        licenseTextLink: Schema.optional(Schema.String),
        privacyPolicyLink: Schema.optional(Schema.String),
        retrieveDatetime: Schema.optional(Schema.String),
        signature: Schema.optional(Schema.String),
        accepted: Schema.optional(Schema.Boolean),
      }),
    ),
    systemData: Schema.optional(
      Schema.Struct({
        createdBy: Schema.optional(Schema.String),
        createdByType: Schema.optional(
          Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
        ),
        createdAt: Schema.optional(Schema.String),
        lastModifiedBy: Schema.optional(Schema.String),
        lastModifiedByType: Schema.optional(
          Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
        ),
        lastModifiedAt: Schema.optional(Schema.String),
      }),
    ),
  });
export type MarketplaceAgreementsCreateOrUpdateOutput =
  typeof MarketplaceAgreementsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create Datadog marketplace agreement in the subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const MarketplaceAgreementsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MarketplaceAgreementsCreateOrUpdateInput,
    outputSchema: MarketplaceAgreementsCreateOrUpdateOutput,
  }));
// Input Schema
export const MarketplaceAgreementsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Datadog/agreements",
    }),
  );
export type MarketplaceAgreementsListInput =
  typeof MarketplaceAgreementsListInput.Type;

// Output Schema
export const MarketplaceAgreementsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        type: Schema.optional(Schema.String),
        properties: Schema.optional(
          Schema.Struct({
            publisher: Schema.optional(Schema.String),
            product: Schema.optional(Schema.String),
            plan: Schema.optional(Schema.String),
            licenseTextLink: Schema.optional(Schema.String),
            privacyPolicyLink: Schema.optional(Schema.String),
            retrieveDatetime: Schema.optional(Schema.String),
            signature: Schema.optional(Schema.String),
            accepted: Schema.optional(Schema.Boolean),
          }),
        ),
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
export type MarketplaceAgreementsListOutput =
  typeof MarketplaceAgreementsListOutput.Type;

// The operation
/**
 * List Datadog marketplace agreements in the subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const MarketplaceAgreementsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: MarketplaceAgreementsListInput,
    outputSchema: MarketplaceAgreementsListOutput,
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
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Datadog/monitors/{monitorName}/monitoredSubscriptions/{configurationName}",
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
 * Add the subscriptions that should be monitored by the Datadog monitor resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param monitorName - Monitor resource name
 * @param configurationName - The configuration name. Only 'default' value is supported.
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
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Datadog/monitors/{monitorName}/monitoredSubscriptions/{configurationName}",
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
 * Updates the subscriptions that are being monitored by the Datadog monitor resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
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
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Datadog/monitors/{monitorName}/monitoredSubscriptions/{configurationName}",
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
 * List the subscriptions currently being monitored by the Datadog monitor resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
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
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Datadog/monitors/{monitorName}/monitoredSubscriptions",
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
 * List the subscriptions currently being monitored by the Datadog monitor resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
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
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Datadog/monitors/{monitorName}/monitoredSubscriptions/{configurationName}",
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
 * Updates the subscriptions that are being monitored by the Datadog monitor resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param monitorName - Monitor resource name
 * @param configurationName - The configuration name. Only 'default' value is supported.
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
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Datadog/monitors/{monitorName}",
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
 * Create a monitor resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param monitorName - Monitor resource name
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
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Datadog/monitors/{monitorName}",
  }),
);
export type MonitorsDeleteInput = typeof MonitorsDeleteInput.Type;

// Output Schema
export const MonitorsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type MonitorsDeleteOutput = typeof MonitorsDeleteOutput.Type;

// The operation
/**
 * Delete a monitor resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
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
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Datadog/monitors/{monitorName}",
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
 * Get the properties of a specific monitor resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param monitorName - Monitor resource name
 */
export const MonitorsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: MonitorsGetInput,
  outputSchema: MonitorsGetOutput,
}));
// Input Schema
export const MonitorsGetDefaultKeyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    monitorName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Datadog/monitors/{monitorName}/getDefaultKey",
    }),
  );
export type MonitorsGetDefaultKeyInput = typeof MonitorsGetDefaultKeyInput.Type;

// Output Schema
export const MonitorsGetDefaultKeyOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    createdBy: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    key: Schema.String,
    created: Schema.optional(Schema.String),
  });
export type MonitorsGetDefaultKeyOutput =
  typeof MonitorsGetDefaultKeyOutput.Type;

// The operation
/**
 * Get the default api key.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param monitorName - Monitor resource name
 */
export const MonitorsGetDefaultKey = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: MonitorsGetDefaultKeyInput,
    outputSchema: MonitorsGetDefaultKeyOutput,
  }),
);
// Input Schema
export const MonitorsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.Datadog/monitors",
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
 * List all monitors under the specified subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const MonitorsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: MonitorsListInput,
  outputSchema: MonitorsListOutput,
}));
// Input Schema
export const MonitorsListApiKeysInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    monitorName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Datadog/monitors/{monitorName}/listApiKeys",
    }),
  );
export type MonitorsListApiKeysInput = typeof MonitorsListApiKeysInput.Type;

// Output Schema
export const MonitorsListApiKeysOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        createdBy: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        key: Schema.String,
        created: Schema.optional(Schema.String),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type MonitorsListApiKeysOutput = typeof MonitorsListApiKeysOutput.Type;

// The operation
/**
 * List the api keys for a given monitor resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param monitorName - Monitor resource name
 */
export const MonitorsListApiKeys = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: MonitorsListApiKeysInput,
  outputSchema: MonitorsListApiKeysOutput,
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
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Datadog/monitors",
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
 * List all monitors under the specified resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const MonitorsListByResourceGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: MonitorsListByResourceGroupInput,
    outputSchema: MonitorsListByResourceGroupOutput,
  }),
);
// Input Schema
export const MonitorsListHostsInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    monitorName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Datadog/monitors/{monitorName}/listHosts",
  }),
);
export type MonitorsListHostsInput = typeof MonitorsListHostsInput.Type;

// Output Schema
export const MonitorsListHostsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        name: Schema.optional(Schema.String),
        aliases: Schema.optional(Schema.Array(Schema.String)),
        apps: Schema.optional(Schema.Array(Schema.String)),
        meta: Schema.optional(
          Schema.Struct({
            agentVersion: Schema.optional(Schema.String),
            installMethod: Schema.optional(
              Schema.Struct({
                tool: Schema.optional(Schema.String),
                toolVersion: Schema.optional(Schema.String),
                installerVersion: Schema.optional(Schema.String),
              }),
            ),
            logsAgent: Schema.optional(
              Schema.Struct({
                transport: Schema.optional(Schema.String),
              }),
            ),
          }),
        ),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type MonitorsListHostsOutput = typeof MonitorsListHostsOutput.Type;

// The operation
/**
 * List the hosts for a given monitor resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param monitorName - Monitor resource name
 */
export const MonitorsListHosts = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: MonitorsListHostsInput,
  outputSchema: MonitorsListHostsOutput,
}));
// Input Schema
export const MonitorsListLinkedResourcesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    monitorName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Datadog/monitors/{monitorName}/listLinkedResources",
    }),
  );
export type MonitorsListLinkedResourcesInput =
  typeof MonitorsListLinkedResourcesInput.Type;

// Output Schema
export const MonitorsListLinkedResourcesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        location: Schema.optional(Schema.String),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type MonitorsListLinkedResourcesOutput =
  typeof MonitorsListLinkedResourcesOutput.Type;

// The operation
/**
 * List all Azure resources associated to the same Datadog organization as the target resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param monitorName - Monitor resource name
 */
export const MonitorsListLinkedResources = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: MonitorsListLinkedResourcesInput,
    outputSchema: MonitorsListLinkedResourcesOutput,
  }),
);
// Input Schema
export const MonitorsListMonitoredResourcesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    monitorName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Datadog/monitors/{monitorName}/listMonitoredResources",
    }),
  );
export type MonitorsListMonitoredResourcesInput =
  typeof MonitorsListMonitoredResourcesInput.Type;

// Output Schema
export const MonitorsListMonitoredResourcesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        sendingMetrics: Schema.optional(Schema.Boolean),
        reasonForMetricsStatus: Schema.optional(Schema.String),
        sendingLogs: Schema.optional(Schema.Boolean),
        reasonForLogsStatus: Schema.optional(Schema.String),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type MonitorsListMonitoredResourcesOutput =
  typeof MonitorsListMonitoredResourcesOutput.Type;

// The operation
/**
 * List the resources currently being monitored by the Datadog monitor resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param monitorName - Monitor resource name
 */
export const MonitorsListMonitoredResources =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MonitorsListMonitoredResourcesInput,
    outputSchema: MonitorsListMonitoredResourcesOutput,
  }));
// Input Schema
export const MonitorsRefreshSetPasswordLinkInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    monitorName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Datadog/monitors/{monitorName}/refreshSetPasswordLink",
    }),
  );
export type MonitorsRefreshSetPasswordLinkInput =
  typeof MonitorsRefreshSetPasswordLinkInput.Type;

// Output Schema
export const MonitorsRefreshSetPasswordLinkOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    setPasswordLink: Schema.optional(SensitiveString),
  });
export type MonitorsRefreshSetPasswordLinkOutput =
  typeof MonitorsRefreshSetPasswordLinkOutput.Type;

// The operation
/**
 * Refresh the set password link and return a latest one.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param monitorName - Monitor resource name
 */
export const MonitorsRefreshSetPasswordLink =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MonitorsRefreshSetPasswordLinkInput,
    outputSchema: MonitorsRefreshSetPasswordLinkOutput,
  }));
// Input Schema
export const MonitorsSetDefaultKeyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    monitorName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Datadog/monitors/{monitorName}/setDefaultKey",
    }),
  );
export type MonitorsSetDefaultKeyInput = typeof MonitorsSetDefaultKeyInput.Type;

// Output Schema
export const MonitorsSetDefaultKeyOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type MonitorsSetDefaultKeyOutput =
  typeof MonitorsSetDefaultKeyOutput.Type;

// The operation
/**
 * Set the default api key.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param monitorName - Monitor resource name
 */
export const MonitorsSetDefaultKey = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: MonitorsSetDefaultKeyInput,
    outputSchema: MonitorsSetDefaultKeyOutput,
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
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Datadog/monitors/{monitorName}",
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
 * Update a monitor resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param monitorName - Monitor resource name
 */
export const MonitorsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: MonitorsUpdateInput,
  outputSchema: MonitorsUpdateOutput,
}));
// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  "api-version": Schema.String,
}).pipe(
  T.Http({ method: "GET", path: "/providers/Microsoft.Datadog/operations" }),
);
export type OperationsListInput = typeof OperationsListInput.Type;

// Output Schema
export const OperationsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(
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
    }),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type OperationsListOutput = typeof OperationsListOutput.Type;

// The operation
/**
 * List all operations provided by Microsoft.Datadog for the 2025-06-11 api version.
 *
 * @param api-version - The API version to use for this operation.
 */
export const OperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationsListInput,
  outputSchema: OperationsListOutput,
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
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Datadog/monitors/{monitorName}/resubscribe",
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
 * Reinstate integration with your Datadog organization by choosing one of the available subscription plans.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
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
export const SingleSignOnConfigurationsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    monitorName: Schema.String.pipe(T.PathParam()),
    configurationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Datadog/monitors/{monitorName}/singleSignOnConfigurations/{configurationName}",
    }),
  );
export type SingleSignOnConfigurationsCreateOrUpdateInput =
  typeof SingleSignOnConfigurationsCreateOrUpdateInput.Type;

// Output Schema
export const SingleSignOnConfigurationsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SingleSignOnConfigurationsCreateOrUpdateOutput =
  typeof SingleSignOnConfigurationsCreateOrUpdateOutput.Type;

// The operation
/**
 * Configures single-sign-on for this resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param monitorName - Monitor resource name
 * @param configurationName - Configuration name
 */
export const SingleSignOnConfigurationsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SingleSignOnConfigurationsCreateOrUpdateInput,
    outputSchema: SingleSignOnConfigurationsCreateOrUpdateOutput,
  }));
// Input Schema
export const SingleSignOnConfigurationsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    monitorName: Schema.String.pipe(T.PathParam()),
    configurationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Datadog/monitors/{monitorName}/singleSignOnConfigurations/{configurationName}",
    }),
  );
export type SingleSignOnConfigurationsGetInput =
  typeof SingleSignOnConfigurationsGetInput.Type;

// Output Schema
export const SingleSignOnConfigurationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SingleSignOnConfigurationsGetOutput =
  typeof SingleSignOnConfigurationsGetOutput.Type;

// The operation
/**
 * Gets the datadog single sign-on resource for the given Monitor.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param monitorName - Monitor resource name
 * @param configurationName - Configuration name
 */
export const SingleSignOnConfigurationsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SingleSignOnConfigurationsGetInput,
    outputSchema: SingleSignOnConfigurationsGetOutput,
  }));
// Input Schema
export const SingleSignOnConfigurationsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    monitorName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Datadog/monitors/{monitorName}/singleSignOnConfigurations",
    }),
  );
export type SingleSignOnConfigurationsListInput =
  typeof SingleSignOnConfigurationsListInput.Type;

// Output Schema
export const SingleSignOnConfigurationsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type SingleSignOnConfigurationsListOutput =
  typeof SingleSignOnConfigurationsListOutput.Type;

// The operation
/**
 * List the single sign-on configurations for a given monitor resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param monitorName - Monitor resource name
 */
export const SingleSignOnConfigurationsList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SingleSignOnConfigurationsListInput,
    outputSchema: SingleSignOnConfigurationsListOutput,
  }));
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
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Datadog/monitors/{monitorName}/tagRules/{ruleSetName}",
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
 * Create or update a tag rule set for a given monitor resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param monitorName - Monitor resource name
 * @param ruleSetName - Rule set name
 */
export const TagRulesCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: TagRulesCreateOrUpdateInput,
    outputSchema: TagRulesCreateOrUpdateOutput,
  }),
);
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
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Datadog/monitors/{monitorName}/tagRules/{ruleSetName}",
  }),
);
export type TagRulesGetInput = typeof TagRulesGetInput.Type;

// Output Schema
export const TagRulesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type TagRulesGetOutput = typeof TagRulesGetOutput.Type;

// The operation
/**
 * Get a tag rule set for a given monitor resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param monitorName - Monitor resource name
 * @param ruleSetName - Rule set name
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
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Datadog/monitors/{monitorName}/tagRules",
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
 * List the tag rules for a given monitor resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param monitorName - Monitor resource name
 */
export const TagRulesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TagRulesListInput,
  outputSchema: TagRulesListOutput,
}));
