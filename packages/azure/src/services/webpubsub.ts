/**
 * Azure Webpubsub API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.SignalRService/operations",
  }),
);
export type OperationsListInput = typeof OperationsListInput.Type;

// Output Schema
export const OperationsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(
    Schema.Array(
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
                      fillGapWithZero: Schema.optional(Schema.String),
                      category: Schema.optional(Schema.String),
                      dimensions: Schema.optional(
                        Schema.Array(
                          Schema.Struct({
                            name: Schema.optional(Schema.String),
                            displayName: Schema.optional(Schema.String),
                            internalName: Schema.optional(Schema.String),
                            toBeExportedForShoebox: Schema.optional(
                              Schema.Boolean,
                            ),
                          }),
                        ),
                      ),
                    }),
                  ),
                ),
                logSpecifications: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      name: Schema.optional(Schema.String),
                      displayName: Schema.optional(Schema.String),
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
 * Lists all of the available REST API operations of the Microsoft.SignalRService provider.
 *
 * @param api-version - The API version to use for this operation.
 */
export const OperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationsListInput,
  outputSchema: OperationsListOutput,
}));
// Input Schema
export const UsagesListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  location: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.SignalRService/locations/{location}/usages",
  }),
);
export type UsagesListInput = typeof UsagesListInput.Type;

// Output Schema
export const UsagesListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        currentValue: Schema.optional(Schema.Number),
        limit: Schema.optional(Schema.Number),
        name: Schema.optional(
          Schema.Struct({
            value: Schema.optional(Schema.String),
            localizedValue: Schema.optional(Schema.String),
          }),
        ),
        unit: Schema.optional(Schema.String),
      }),
    ),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type UsagesListOutput = typeof UsagesListOutput.Type;

// The operation
/**
 * List resource usage quotas by location.
 *
 * @param location - the location like "eastus"
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const UsagesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: UsagesListInput,
  outputSchema: UsagesListOutput,
}));
// Input Schema
export const WebPubSubCheckNameAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    location: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.SignalRService/locations/{location}/checkNameAvailability",
    }),
  );
export type WebPubSubCheckNameAvailabilityInput =
  typeof WebPubSubCheckNameAvailabilityInput.Type;

// Output Schema
export const WebPubSubCheckNameAvailabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nameAvailable: Schema.optional(Schema.Boolean),
    reason: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
  });
export type WebPubSubCheckNameAvailabilityOutput =
  typeof WebPubSubCheckNameAvailabilityOutput.Type;

// The operation
/**
 * Checks that the resource name is valid and is not already in use.
 *
 * @param location - the region
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const WebPubSubCheckNameAvailability =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WebPubSubCheckNameAvailabilityInput,
    outputSchema: WebPubSubCheckNameAvailabilityOutput,
  }));
// Input Schema
export const WebPubSubCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/webPubSub/{resourceName}",
    }),
  );
export type WebPubSubCreateOrUpdateInput =
  typeof WebPubSubCreateOrUpdateInput.Type;

// Output Schema
export const WebPubSubCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type WebPubSubCreateOrUpdateOutput =
  typeof WebPubSubCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const WebPubSubCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WebPubSubCreateOrUpdateInput,
    outputSchema: WebPubSubCreateOrUpdateOutput,
  }),
);
// Input Schema
export const WebPubSubCustomCertificatesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    certificateName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/webPubSub/{resourceName}/customCertificates/{certificateName}",
    }),
  );
export type WebPubSubCustomCertificatesCreateOrUpdateInput =
  typeof WebPubSubCustomCertificatesCreateOrUpdateInput.Type;

// Output Schema
export const WebPubSubCustomCertificatesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WebPubSubCustomCertificatesCreateOrUpdateOutput =
  typeof WebPubSubCustomCertificatesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a custom certificate.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param certificateName - Custom certificate name
 * @param api-version - The API version to use for this operation.
 */
export const WebPubSubCustomCertificatesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WebPubSubCustomCertificatesCreateOrUpdateInput,
    outputSchema: WebPubSubCustomCertificatesCreateOrUpdateOutput,
  }));
// Input Schema
export const WebPubSubCustomCertificatesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    certificateName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/webPubSub/{resourceName}/customCertificates/{certificateName}",
    }),
  );
export type WebPubSubCustomCertificatesDeleteInput =
  typeof WebPubSubCustomCertificatesDeleteInput.Type;

// Output Schema
export const WebPubSubCustomCertificatesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type WebPubSubCustomCertificatesDeleteOutput =
  typeof WebPubSubCustomCertificatesDeleteOutput.Type;

// The operation
/**
 * Delete a custom certificate.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param certificateName - Custom certificate name
 * @param api-version - The API version to use for this operation.
 */
export const WebPubSubCustomCertificatesDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WebPubSubCustomCertificatesDeleteInput,
    outputSchema: WebPubSubCustomCertificatesDeleteOutput,
  }));
// Input Schema
export const WebPubSubCustomCertificatesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    certificateName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/webPubSub/{resourceName}/customCertificates/{certificateName}",
    }),
  );
export type WebPubSubCustomCertificatesGetInput =
  typeof WebPubSubCustomCertificatesGetInput.Type;

// Output Schema
export const WebPubSubCustomCertificatesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WebPubSubCustomCertificatesGetOutput =
  typeof WebPubSubCustomCertificatesGetOutput.Type;

// The operation
/**
 * Get a custom certificate.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param certificateName - Custom certificate name
 * @param api-version - The API version to use for this operation.
 */
export const WebPubSubCustomCertificatesGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WebPubSubCustomCertificatesGetInput,
    outputSchema: WebPubSubCustomCertificatesGetOutput,
  }));
// Input Schema
export const WebPubSubCustomCertificatesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/webPubSub/{resourceName}/customCertificates",
    }),
  );
export type WebPubSubCustomCertificatesListInput =
  typeof WebPubSubCustomCertificatesListInput.Type;

// Output Schema
export const WebPubSubCustomCertificatesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type WebPubSubCustomCertificatesListOutput =
  typeof WebPubSubCustomCertificatesListOutput.Type;

// The operation
/**
 * List all custom certificates.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const WebPubSubCustomCertificatesList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WebPubSubCustomCertificatesListInput,
    outputSchema: WebPubSubCustomCertificatesListOutput,
  }));
// Input Schema
export const WebPubSubCustomDomainsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/webPubSub/{resourceName}/customDomains/{name}",
    }),
  );
export type WebPubSubCustomDomainsCreateOrUpdateInput =
  typeof WebPubSubCustomDomainsCreateOrUpdateInput.Type;

// Output Schema
export const WebPubSubCustomDomainsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WebPubSubCustomDomainsCreateOrUpdateOutput =
  typeof WebPubSubCustomDomainsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a custom domain.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Custom domain name.
 * @param api-version - The API version to use for this operation.
 */
export const WebPubSubCustomDomainsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WebPubSubCustomDomainsCreateOrUpdateInput,
    outputSchema: WebPubSubCustomDomainsCreateOrUpdateOutput,
  }));
// Input Schema
export const WebPubSubCustomDomainsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/webPubSub/{resourceName}/customDomains/{name}",
    }),
  );
export type WebPubSubCustomDomainsDeleteInput =
  typeof WebPubSubCustomDomainsDeleteInput.Type;

// Output Schema
export const WebPubSubCustomDomainsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type WebPubSubCustomDomainsDeleteOutput =
  typeof WebPubSubCustomDomainsDeleteOutput.Type;

// The operation
/**
 * Delete a custom domain.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Custom domain name.
 * @param api-version - The API version to use for this operation.
 */
export const WebPubSubCustomDomainsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WebPubSubCustomDomainsDeleteInput,
    outputSchema: WebPubSubCustomDomainsDeleteOutput,
  }));
// Input Schema
export const WebPubSubCustomDomainsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/webPubSub/{resourceName}/customDomains/{name}",
    }),
  );
export type WebPubSubCustomDomainsGetInput =
  typeof WebPubSubCustomDomainsGetInput.Type;

// Output Schema
export const WebPubSubCustomDomainsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WebPubSubCustomDomainsGetOutput =
  typeof WebPubSubCustomDomainsGetOutput.Type;

// The operation
/**
 * Get a custom domain.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Custom domain name.
 * @param api-version - The API version to use for this operation.
 */
export const WebPubSubCustomDomainsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WebPubSubCustomDomainsGetInput,
    outputSchema: WebPubSubCustomDomainsGetOutput,
  }),
);
// Input Schema
export const WebPubSubCustomDomainsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/webPubSub/{resourceName}/customDomains",
    }),
  );
export type WebPubSubCustomDomainsListInput =
  typeof WebPubSubCustomDomainsListInput.Type;

// Output Schema
export const WebPubSubCustomDomainsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type WebPubSubCustomDomainsListOutput =
  typeof WebPubSubCustomDomainsListOutput.Type;

// The operation
/**
 * List all custom domains.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const WebPubSubCustomDomainsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WebPubSubCustomDomainsListInput,
    outputSchema: WebPubSubCustomDomainsListOutput,
  }),
);
// Input Schema
export const WebPubSubDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/webPubSub/{resourceName}",
  }),
);
export type WebPubSubDeleteInput = typeof WebPubSubDeleteInput.Type;

// Output Schema
export const WebPubSubDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type WebPubSubDeleteOutput = typeof WebPubSubDeleteOutput.Type;

// The operation
/**
 * Operation to delete a resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const WebPubSubDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WebPubSubDeleteInput,
  outputSchema: WebPubSubDeleteOutput,
}));
// Input Schema
export const WebPubSubGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/webPubSub/{resourceName}",
  }),
);
export type WebPubSubGetInput = typeof WebPubSubGetInput.Type;

// Output Schema
export const WebPubSubGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type WebPubSubGetOutput = typeof WebPubSubGetOutput.Type;

// The operation
/**
 * Get the resource and its properties.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const WebPubSubGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WebPubSubGetInput,
  outputSchema: WebPubSubGetOutput,
}));
// Input Schema
export const WebPubSubHubsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    hubName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/webPubSub/{resourceName}/hubs/{hubName}",
    }),
  );
export type WebPubSubHubsCreateOrUpdateInput =
  typeof WebPubSubHubsCreateOrUpdateInput.Type;

// Output Schema
export const WebPubSubHubsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WebPubSubHubsCreateOrUpdateOutput =
  typeof WebPubSubHubsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a hub setting.
 *
 * @param hubName - The hub name.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const WebPubSubHubsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WebPubSubHubsCreateOrUpdateInput,
    outputSchema: WebPubSubHubsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const WebPubSubHubsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    hubName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/webPubSub/{resourceName}/hubs/{hubName}",
    }),
  );
export type WebPubSubHubsDeleteInput = typeof WebPubSubHubsDeleteInput.Type;

// Output Schema
export const WebPubSubHubsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type WebPubSubHubsDeleteOutput = typeof WebPubSubHubsDeleteOutput.Type;

// The operation
/**
 * Delete a hub setting.
 *
 * @param hubName - The hub name.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const WebPubSubHubsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WebPubSubHubsDeleteInput,
  outputSchema: WebPubSubHubsDeleteOutput,
}));
// Input Schema
export const WebPubSubHubsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  hubName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/webPubSub/{resourceName}/hubs/{hubName}",
  }),
);
export type WebPubSubHubsGetInput = typeof WebPubSubHubsGetInput.Type;

// Output Schema
export const WebPubSubHubsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type WebPubSubHubsGetOutput = typeof WebPubSubHubsGetOutput.Type;

// The operation
/**
 * Get a hub setting.
 *
 * @param hubName - The hub name.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const WebPubSubHubsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WebPubSubHubsGetInput,
  outputSchema: WebPubSubHubsGetOutput,
}));
// Input Schema
export const WebPubSubHubsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/webPubSub/{resourceName}/hubs",
  }),
);
export type WebPubSubHubsListInput = typeof WebPubSubHubsListInput.Type;

// Output Schema
export const WebPubSubHubsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type WebPubSubHubsListOutput = typeof WebPubSubHubsListOutput.Type;

// The operation
/**
 * List hub settings.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const WebPubSubHubsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WebPubSubHubsListInput,
  outputSchema: WebPubSubHubsListOutput,
}));
// Input Schema
export const WebPubSubListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/webPubSub",
    }),
  );
export type WebPubSubListByResourceGroupInput =
  typeof WebPubSubListByResourceGroupInput.Type;

// Output Schema
export const WebPubSubListByResourceGroupOutput =
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
export type WebPubSubListByResourceGroupOutput =
  typeof WebPubSubListByResourceGroupOutput.Type;

// The operation
/**
 * Handles requests to list all resources in a resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const WebPubSubListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WebPubSubListByResourceGroupInput,
    outputSchema: WebPubSubListByResourceGroupOutput,
  }));
// Input Schema
export const WebPubSubListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.SignalRService/webPubSub",
    }),
  );
export type WebPubSubListBySubscriptionInput =
  typeof WebPubSubListBySubscriptionInput.Type;

// Output Schema
export const WebPubSubListBySubscriptionOutput =
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
export type WebPubSubListBySubscriptionOutput =
  typeof WebPubSubListBySubscriptionOutput.Type;

// The operation
/**
 * Handles requests to list all resources in a subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const WebPubSubListBySubscription = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WebPubSubListBySubscriptionInput,
    outputSchema: WebPubSubListBySubscriptionOutput,
  }),
);
// Input Schema
export const WebPubSubListKeysInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/webPubSub/{resourceName}/listKeys",
  }),
);
export type WebPubSubListKeysInput = typeof WebPubSubListKeysInput.Type;

// Output Schema
export const WebPubSubListKeysOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    primaryKey: Schema.optional(Schema.String),
    secondaryKey: Schema.optional(Schema.String),
    primaryConnectionString: Schema.optional(Schema.String),
    secondaryConnectionString: Schema.optional(Schema.String),
  });
export type WebPubSubListKeysOutput = typeof WebPubSubListKeysOutput.Type;

// The operation
/**
 * Get the access keys of the resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const WebPubSubListKeys = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WebPubSubListKeysInput,
  outputSchema: WebPubSubListKeysOutput,
}));
// Input Schema
export const WebPubSubListReplicaSkusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/webPubSub/{resourceName}/replicas/{replicaName}/skus",
    }),
  );
export type WebPubSubListReplicaSkusInput =
  typeof WebPubSubListReplicaSkusInput.Type;

// Output Schema
export const WebPubSubListReplicaSkusOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          resourceType: Schema.optional(Schema.String),
          sku: Schema.optional(
            Schema.Struct({
              name: Schema.String,
              tier: Schema.optional(
                Schema.Literals(["Free", "Basic", "Standard", "Premium"]),
              ),
              size: Schema.optional(Schema.String),
              family: Schema.optional(Schema.String),
              capacity: Schema.optional(Schema.Number),
            }),
          ),
          capacity: Schema.optional(
            Schema.Struct({
              minimum: Schema.optional(Schema.Number),
              maximum: Schema.optional(Schema.Number),
              default: Schema.optional(Schema.Number),
              allowedValues: Schema.optional(Schema.Array(Schema.Number)),
              scaleType: Schema.optional(
                Schema.Literals(["None", "Manual", "Automatic"]),
              ),
            }),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type WebPubSubListReplicaSkusOutput =
  typeof WebPubSubListReplicaSkusOutput.Type;

// The operation
/**
 * List all available skus of the replica resource.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const WebPubSubListReplicaSkus = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WebPubSubListReplicaSkusInput,
    outputSchema: WebPubSubListReplicaSkusOutput,
  }),
);
// Input Schema
export const WebPubSubListSkusInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/webPubSub/{resourceName}/skus",
  }),
);
export type WebPubSubListSkusInput = typeof WebPubSubListSkusInput.Type;

// Output Schema
export const WebPubSubListSkusOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          resourceType: Schema.optional(Schema.String),
          sku: Schema.optional(
            Schema.Struct({
              name: Schema.String,
              tier: Schema.optional(
                Schema.Literals(["Free", "Basic", "Standard", "Premium"]),
              ),
              size: Schema.optional(Schema.String),
              family: Schema.optional(Schema.String),
              capacity: Schema.optional(Schema.Number),
            }),
          ),
          capacity: Schema.optional(
            Schema.Struct({
              minimum: Schema.optional(Schema.Number),
              maximum: Schema.optional(Schema.Number),
              default: Schema.optional(Schema.Number),
              allowedValues: Schema.optional(Schema.Array(Schema.Number)),
              scaleType: Schema.optional(
                Schema.Literals(["None", "Manual", "Automatic"]),
              ),
            }),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type WebPubSubListSkusOutput = typeof WebPubSubListSkusOutput.Type;

// The operation
/**
 * List all available skus of the resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const WebPubSubListSkus = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WebPubSubListSkusInput,
  outputSchema: WebPubSubListSkusOutput,
}));
// Input Schema
export const WebPubSubPrivateEndpointConnectionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/webPubSub/{resourceName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type WebPubSubPrivateEndpointConnectionsDeleteInput =
  typeof WebPubSubPrivateEndpointConnectionsDeleteInput.Type;

// Output Schema
export const WebPubSubPrivateEndpointConnectionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type WebPubSubPrivateEndpointConnectionsDeleteOutput =
  typeof WebPubSubPrivateEndpointConnectionsDeleteOutput.Type;

// The operation
/**
 * Delete the specified private endpoint connection
 *
 * @param privateEndpointConnectionName - The name of the private endpoint connection associated with the Azure resource.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const WebPubSubPrivateEndpointConnectionsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WebPubSubPrivateEndpointConnectionsDeleteInput,
    outputSchema: WebPubSubPrivateEndpointConnectionsDeleteOutput,
  }));
// Input Schema
export const WebPubSubPrivateEndpointConnectionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/webPubSub/{resourceName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type WebPubSubPrivateEndpointConnectionsGetInput =
  typeof WebPubSubPrivateEndpointConnectionsGetInput.Type;

// Output Schema
export const WebPubSubPrivateEndpointConnectionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WebPubSubPrivateEndpointConnectionsGetOutput =
  typeof WebPubSubPrivateEndpointConnectionsGetOutput.Type;

// The operation
/**
 * Get the specified private endpoint connection
 *
 * @param privateEndpointConnectionName - The name of the private endpoint connection associated with the Azure resource.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const WebPubSubPrivateEndpointConnectionsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WebPubSubPrivateEndpointConnectionsGetInput,
    outputSchema: WebPubSubPrivateEndpointConnectionsGetOutput,
  }));
// Input Schema
export const WebPubSubPrivateEndpointConnectionsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/webPubSub/{resourceName}/privateEndpointConnections",
    }),
  );
export type WebPubSubPrivateEndpointConnectionsListInput =
  typeof WebPubSubPrivateEndpointConnectionsListInput.Type;

// Output Schema
export const WebPubSubPrivateEndpointConnectionsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type WebPubSubPrivateEndpointConnectionsListOutput =
  typeof WebPubSubPrivateEndpointConnectionsListOutput.Type;

// The operation
/**
 * List private endpoint connections
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const WebPubSubPrivateEndpointConnectionsList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WebPubSubPrivateEndpointConnectionsListInput,
    outputSchema: WebPubSubPrivateEndpointConnectionsListOutput,
  }));
// Input Schema
export const WebPubSubPrivateEndpointConnectionsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/webPubSub/{resourceName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type WebPubSubPrivateEndpointConnectionsUpdateInput =
  typeof WebPubSubPrivateEndpointConnectionsUpdateInput.Type;

// Output Schema
export const WebPubSubPrivateEndpointConnectionsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WebPubSubPrivateEndpointConnectionsUpdateOutput =
  typeof WebPubSubPrivateEndpointConnectionsUpdateOutput.Type;

// The operation
/**
 * Update the state of specified private endpoint connection
 *
 * @param privateEndpointConnectionName - The name of the private endpoint connection associated with the Azure resource.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const WebPubSubPrivateEndpointConnectionsUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WebPubSubPrivateEndpointConnectionsUpdateInput,
    outputSchema: WebPubSubPrivateEndpointConnectionsUpdateOutput,
  }));
// Input Schema
export const WebPubSubPrivateLinkResourcesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/webPubSub/{resourceName}/privateLinkResources",
    }),
  );
export type WebPubSubPrivateLinkResourcesListInput =
  typeof WebPubSubPrivateLinkResourcesListInput.Type;

// Output Schema
export const WebPubSubPrivateLinkResourcesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type WebPubSubPrivateLinkResourcesListOutput =
  typeof WebPubSubPrivateLinkResourcesListOutput.Type;

// The operation
/**
 * Get the private link resources that need to be created for a resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const WebPubSubPrivateLinkResourcesList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WebPubSubPrivateLinkResourcesListInput,
    outputSchema: WebPubSubPrivateLinkResourcesListOutput,
  }));
// Input Schema
export const WebPubSubRegenerateKeyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/webPubSub/{resourceName}/regenerateKey",
    }),
  );
export type WebPubSubRegenerateKeyInput =
  typeof WebPubSubRegenerateKeyInput.Type;

// Output Schema
export const WebPubSubRegenerateKeyOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    primaryKey: Schema.optional(Schema.String),
    secondaryKey: Schema.optional(Schema.String),
    primaryConnectionString: Schema.optional(Schema.String),
    secondaryConnectionString: Schema.optional(Schema.String),
  });
export type WebPubSubRegenerateKeyOutput =
  typeof WebPubSubRegenerateKeyOutput.Type;

// The operation
/**
 * Regenerate the access key for the resource. PrimaryKey and SecondaryKey cannot be regenerated at the same time.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const WebPubSubRegenerateKey = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WebPubSubRegenerateKeyInput,
    outputSchema: WebPubSubRegenerateKeyOutput,
  }),
);
// Input Schema
export const WebPubSubReplicasCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/webPubSub/{resourceName}/replicas/{replicaName}",
    }),
  );
export type WebPubSubReplicasCreateOrUpdateInput =
  typeof WebPubSubReplicasCreateOrUpdateInput.Type;

// Output Schema
export const WebPubSubReplicasCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type WebPubSubReplicasCreateOrUpdateOutput =
  typeof WebPubSubReplicasCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a replica.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const WebPubSubReplicasCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WebPubSubReplicasCreateOrUpdateInput,
    outputSchema: WebPubSubReplicasCreateOrUpdateOutput,
  }));
// Input Schema
export const WebPubSubReplicasDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/webPubSub/{resourceName}/replicas/{replicaName}",
    }),
  );
export type WebPubSubReplicasDeleteInput =
  typeof WebPubSubReplicasDeleteInput.Type;

// Output Schema
export const WebPubSubReplicasDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type WebPubSubReplicasDeleteOutput =
  typeof WebPubSubReplicasDeleteOutput.Type;

// The operation
/**
 * Operation to delete a replica.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const WebPubSubReplicasDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WebPubSubReplicasDeleteInput,
    outputSchema: WebPubSubReplicasDeleteOutput,
  }),
);
// Input Schema
export const WebPubSubReplicasGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/webPubSub/{resourceName}/replicas/{replicaName}",
    }),
  );
export type WebPubSubReplicasGetInput = typeof WebPubSubReplicasGetInput.Type;

// Output Schema
export const WebPubSubReplicasGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type WebPubSubReplicasGetOutput = typeof WebPubSubReplicasGetOutput.Type;

// The operation
/**
 * Get the replica and its properties.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const WebPubSubReplicasGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WebPubSubReplicasGetInput,
    outputSchema: WebPubSubReplicasGetOutput,
  }),
);
// Input Schema
export const WebPubSubReplicaSharedPrivateLinkResourcesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/webPubSub/{resourceName}/replicas/{replicaName}/sharedPrivateLinkResources/{sharedPrivateLinkResourceName}",
    }),
  );
export type WebPubSubReplicaSharedPrivateLinkResourcesCreateOrUpdateInput =
  typeof WebPubSubReplicaSharedPrivateLinkResourcesCreateOrUpdateInput.Type;

// Output Schema
export const WebPubSubReplicaSharedPrivateLinkResourcesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WebPubSubReplicaSharedPrivateLinkResourcesCreateOrUpdateOutput =
  typeof WebPubSubReplicaSharedPrivateLinkResourcesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a shared private link resource
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const WebPubSubReplicaSharedPrivateLinkResourcesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WebPubSubReplicaSharedPrivateLinkResourcesCreateOrUpdateInput,
    outputSchema:
      WebPubSubReplicaSharedPrivateLinkResourcesCreateOrUpdateOutput,
  }));
// Input Schema
export const WebPubSubReplicaSharedPrivateLinkResourcesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/webPubSub/{resourceName}/replicas/{replicaName}/sharedPrivateLinkResources/{sharedPrivateLinkResourceName}",
    }),
  );
export type WebPubSubReplicaSharedPrivateLinkResourcesGetInput =
  typeof WebPubSubReplicaSharedPrivateLinkResourcesGetInput.Type;

// Output Schema
export const WebPubSubReplicaSharedPrivateLinkResourcesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WebPubSubReplicaSharedPrivateLinkResourcesGetOutput =
  typeof WebPubSubReplicaSharedPrivateLinkResourcesGetOutput.Type;

// The operation
/**
 * Get the specified shared private link resource
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const WebPubSubReplicaSharedPrivateLinkResourcesGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WebPubSubReplicaSharedPrivateLinkResourcesGetInput,
    outputSchema: WebPubSubReplicaSharedPrivateLinkResourcesGetOutput,
  }));
// Input Schema
export const WebPubSubReplicaSharedPrivateLinkResourcesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/webPubSub/{resourceName}/replicas/{replicaName}/sharedPrivateLinkResources",
    }),
  );
export type WebPubSubReplicaSharedPrivateLinkResourcesListInput =
  typeof WebPubSubReplicaSharedPrivateLinkResourcesListInput.Type;

// Output Schema
export const WebPubSubReplicaSharedPrivateLinkResourcesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type WebPubSubReplicaSharedPrivateLinkResourcesListOutput =
  typeof WebPubSubReplicaSharedPrivateLinkResourcesListOutput.Type;

// The operation
/**
 * List shared private link resources
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const WebPubSubReplicaSharedPrivateLinkResourcesList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WebPubSubReplicaSharedPrivateLinkResourcesListInput,
    outputSchema: WebPubSubReplicaSharedPrivateLinkResourcesListOutput,
  }));
// Input Schema
export const WebPubSubReplicasListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/webPubSub/{resourceName}/replicas",
    }),
  );
export type WebPubSubReplicasListInput = typeof WebPubSubReplicasListInput.Type;

// Output Schema
export const WebPubSubReplicasListOutput =
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
export type WebPubSubReplicasListOutput =
  typeof WebPubSubReplicasListOutput.Type;

// The operation
/**
 * List all replicas belong to this resource
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const WebPubSubReplicasList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WebPubSubReplicasListInput,
    outputSchema: WebPubSubReplicasListOutput,
  }),
);
// Input Schema
export const WebPubSubReplicasRestartInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/webPubSub/{resourceName}/replicas/{replicaName}/restart",
    }),
  );
export type WebPubSubReplicasRestartInput =
  typeof WebPubSubReplicasRestartInput.Type;

// Output Schema
export const WebPubSubReplicasRestartOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type WebPubSubReplicasRestartOutput =
  typeof WebPubSubReplicasRestartOutput.Type;

// The operation
/**
 * Operation to restart a replica.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const WebPubSubReplicasRestart = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WebPubSubReplicasRestartInput,
    outputSchema: WebPubSubReplicasRestartOutput,
  }),
);
// Input Schema
export const WebPubSubReplicasUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/webPubSub/{resourceName}/replicas/{replicaName}",
    }),
  );
export type WebPubSubReplicasUpdateInput =
  typeof WebPubSubReplicasUpdateInput.Type;

// Output Schema
export const WebPubSubReplicasUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type WebPubSubReplicasUpdateOutput =
  typeof WebPubSubReplicasUpdateOutput.Type;

// The operation
/**
 * Operation to update an exiting replica.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const WebPubSubReplicasUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WebPubSubReplicasUpdateInput,
    outputSchema: WebPubSubReplicasUpdateOutput,
  }),
);
// Input Schema
export const WebPubSubRestartInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/webPubSub/{resourceName}/restart",
  }),
);
export type WebPubSubRestartInput = typeof WebPubSubRestartInput.Type;

// Output Schema
export const WebPubSubRestartOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type WebPubSubRestartOutput = typeof WebPubSubRestartOutput.Type;

// The operation
/**
 * Operation to restart a resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const WebPubSubRestart = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WebPubSubRestartInput,
  outputSchema: WebPubSubRestartOutput,
}));
// Input Schema
export const WebPubSubSharedPrivateLinkResourcesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/webPubSub/{resourceName}/sharedPrivateLinkResources/{sharedPrivateLinkResourceName}",
    }),
  );
export type WebPubSubSharedPrivateLinkResourcesCreateOrUpdateInput =
  typeof WebPubSubSharedPrivateLinkResourcesCreateOrUpdateInput.Type;

// Output Schema
export const WebPubSubSharedPrivateLinkResourcesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WebPubSubSharedPrivateLinkResourcesCreateOrUpdateOutput =
  typeof WebPubSubSharedPrivateLinkResourcesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a shared private link resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const WebPubSubSharedPrivateLinkResourcesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WebPubSubSharedPrivateLinkResourcesCreateOrUpdateInput,
    outputSchema: WebPubSubSharedPrivateLinkResourcesCreateOrUpdateOutput,
  }));
// Input Schema
export const WebPubSubSharedPrivateLinkResourcesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/webPubSub/{resourceName}/sharedPrivateLinkResources/{sharedPrivateLinkResourceName}",
    }),
  );
export type WebPubSubSharedPrivateLinkResourcesDeleteInput =
  typeof WebPubSubSharedPrivateLinkResourcesDeleteInput.Type;

// Output Schema
export const WebPubSubSharedPrivateLinkResourcesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type WebPubSubSharedPrivateLinkResourcesDeleteOutput =
  typeof WebPubSubSharedPrivateLinkResourcesDeleteOutput.Type;

// The operation
/**
 * Delete the specified shared private link resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const WebPubSubSharedPrivateLinkResourcesDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WebPubSubSharedPrivateLinkResourcesDeleteInput,
    outputSchema: WebPubSubSharedPrivateLinkResourcesDeleteOutput,
  }));
// Input Schema
export const WebPubSubSharedPrivateLinkResourcesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/webPubSub/{resourceName}/sharedPrivateLinkResources/{sharedPrivateLinkResourceName}",
    }),
  );
export type WebPubSubSharedPrivateLinkResourcesGetInput =
  typeof WebPubSubSharedPrivateLinkResourcesGetInput.Type;

// Output Schema
export const WebPubSubSharedPrivateLinkResourcesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WebPubSubSharedPrivateLinkResourcesGetOutput =
  typeof WebPubSubSharedPrivateLinkResourcesGetOutput.Type;

// The operation
/**
 * Get the specified shared private link resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const WebPubSubSharedPrivateLinkResourcesGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WebPubSubSharedPrivateLinkResourcesGetInput,
    outputSchema: WebPubSubSharedPrivateLinkResourcesGetOutput,
  }));
// Input Schema
export const WebPubSubSharedPrivateLinkResourcesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/webPubSub/{resourceName}/sharedPrivateLinkResources",
    }),
  );
export type WebPubSubSharedPrivateLinkResourcesListInput =
  typeof WebPubSubSharedPrivateLinkResourcesListInput.Type;

// Output Schema
export const WebPubSubSharedPrivateLinkResourcesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type WebPubSubSharedPrivateLinkResourcesListOutput =
  typeof WebPubSubSharedPrivateLinkResourcesListOutput.Type;

// The operation
/**
 * List shared private link resources
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const WebPubSubSharedPrivateLinkResourcesList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WebPubSubSharedPrivateLinkResourcesListInput,
    outputSchema: WebPubSubSharedPrivateLinkResourcesListOutput,
  }));
// Input Schema
export const WebPubSubUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/webPubSub/{resourceName}",
  }),
);
export type WebPubSubUpdateInput = typeof WebPubSubUpdateInput.Type;

// Output Schema
export const WebPubSubUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type WebPubSubUpdateOutput = typeof WebPubSubUpdateOutput.Type;

// The operation
/**
 * Operation to update an exiting resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const WebPubSubUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WebPubSubUpdateInput,
  outputSchema: WebPubSubUpdateOutput,
}));
