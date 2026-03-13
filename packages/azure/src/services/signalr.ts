/**
 * Azure Signalr API
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
export const SignalRCheckNameAvailabilityInput =
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
export type SignalRCheckNameAvailabilityInput =
  typeof SignalRCheckNameAvailabilityInput.Type;

// Output Schema
export const SignalRCheckNameAvailabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nameAvailable: Schema.optional(Schema.Boolean),
    reason: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
  });
export type SignalRCheckNameAvailabilityOutput =
  typeof SignalRCheckNameAvailabilityOutput.Type;

// The operation
/**
 * Checks that the resource name is valid and is not already in use.
 *
 * @param location - the region
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const SignalRCheckNameAvailability =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SignalRCheckNameAvailabilityInput,
    outputSchema: SignalRCheckNameAvailabilityOutput,
  }));
// Input Schema
export const SignalRCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/signalR/{resourceName}",
    }),
  );
export type SignalRCreateOrUpdateInput = typeof SignalRCreateOrUpdateInput.Type;

// Output Schema
export const SignalRCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SignalRCreateOrUpdateOutput =
  typeof SignalRCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const SignalRCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SignalRCreateOrUpdateInput,
    outputSchema: SignalRCreateOrUpdateOutput,
  }),
);
// Input Schema
export const SignalRCustomCertificatesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    certificateName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/signalR/{resourceName}/customCertificates/{certificateName}",
    }),
  );
export type SignalRCustomCertificatesCreateOrUpdateInput =
  typeof SignalRCustomCertificatesCreateOrUpdateInput.Type;

// Output Schema
export const SignalRCustomCertificatesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SignalRCustomCertificatesCreateOrUpdateOutput =
  typeof SignalRCustomCertificatesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a custom certificate.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param certificateName - Custom certificate name
 * @param api-version - The API version to use for this operation.
 */
export const SignalRCustomCertificatesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SignalRCustomCertificatesCreateOrUpdateInput,
    outputSchema: SignalRCustomCertificatesCreateOrUpdateOutput,
  }));
// Input Schema
export const SignalRCustomCertificatesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    certificateName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/signalR/{resourceName}/customCertificates/{certificateName}",
    }),
  );
export type SignalRCustomCertificatesDeleteInput =
  typeof SignalRCustomCertificatesDeleteInput.Type;

// Output Schema
export const SignalRCustomCertificatesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SignalRCustomCertificatesDeleteOutput =
  typeof SignalRCustomCertificatesDeleteOutput.Type;

// The operation
/**
 * Delete a custom certificate.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param certificateName - Custom certificate name
 * @param api-version - The API version to use for this operation.
 */
export const SignalRCustomCertificatesDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SignalRCustomCertificatesDeleteInput,
    outputSchema: SignalRCustomCertificatesDeleteOutput,
  }));
// Input Schema
export const SignalRCustomCertificatesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    certificateName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/signalR/{resourceName}/customCertificates/{certificateName}",
    }),
  );
export type SignalRCustomCertificatesGetInput =
  typeof SignalRCustomCertificatesGetInput.Type;

// Output Schema
export const SignalRCustomCertificatesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SignalRCustomCertificatesGetOutput =
  typeof SignalRCustomCertificatesGetOutput.Type;

// The operation
/**
 * Get a custom certificate.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param certificateName - Custom certificate name
 * @param api-version - The API version to use for this operation.
 */
export const SignalRCustomCertificatesGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SignalRCustomCertificatesGetInput,
    outputSchema: SignalRCustomCertificatesGetOutput,
  }));
// Input Schema
export const SignalRCustomCertificatesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/signalR/{resourceName}/customCertificates",
    }),
  );
export type SignalRCustomCertificatesListInput =
  typeof SignalRCustomCertificatesListInput.Type;

// Output Schema
export const SignalRCustomCertificatesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type SignalRCustomCertificatesListOutput =
  typeof SignalRCustomCertificatesListOutput.Type;

// The operation
/**
 * List all custom certificates.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SignalRCustomCertificatesList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SignalRCustomCertificatesListInput,
    outputSchema: SignalRCustomCertificatesListOutput,
  }));
// Input Schema
export const SignalRCustomDomainsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/signalR/{resourceName}/customDomains/{name}",
    }),
  );
export type SignalRCustomDomainsCreateOrUpdateInput =
  typeof SignalRCustomDomainsCreateOrUpdateInput.Type;

// Output Schema
export const SignalRCustomDomainsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SignalRCustomDomainsCreateOrUpdateOutput =
  typeof SignalRCustomDomainsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a custom domain.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Custom domain name.
 * @param api-version - The API version to use for this operation.
 */
export const SignalRCustomDomainsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SignalRCustomDomainsCreateOrUpdateInput,
    outputSchema: SignalRCustomDomainsCreateOrUpdateOutput,
  }));
// Input Schema
export const SignalRCustomDomainsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/signalR/{resourceName}/customDomains/{name}",
    }),
  );
export type SignalRCustomDomainsDeleteInput =
  typeof SignalRCustomDomainsDeleteInput.Type;

// Output Schema
export const SignalRCustomDomainsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SignalRCustomDomainsDeleteOutput =
  typeof SignalRCustomDomainsDeleteOutput.Type;

// The operation
/**
 * Delete a custom domain.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Custom domain name.
 * @param api-version - The API version to use for this operation.
 */
export const SignalRCustomDomainsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SignalRCustomDomainsDeleteInput,
    outputSchema: SignalRCustomDomainsDeleteOutput,
  }),
);
// Input Schema
export const SignalRCustomDomainsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/signalR/{resourceName}/customDomains/{name}",
    }),
  );
export type SignalRCustomDomainsGetInput =
  typeof SignalRCustomDomainsGetInput.Type;

// Output Schema
export const SignalRCustomDomainsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SignalRCustomDomainsGetOutput =
  typeof SignalRCustomDomainsGetOutput.Type;

// The operation
/**
 * Get a custom domain.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Custom domain name.
 * @param api-version - The API version to use for this operation.
 */
export const SignalRCustomDomainsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SignalRCustomDomainsGetInput,
    outputSchema: SignalRCustomDomainsGetOutput,
  }),
);
// Input Schema
export const SignalRCustomDomainsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/signalR/{resourceName}/customDomains",
    }),
  );
export type SignalRCustomDomainsListInput =
  typeof SignalRCustomDomainsListInput.Type;

// Output Schema
export const SignalRCustomDomainsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type SignalRCustomDomainsListOutput =
  typeof SignalRCustomDomainsListOutput.Type;

// The operation
/**
 * List all custom domains.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SignalRCustomDomainsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SignalRCustomDomainsListInput,
    outputSchema: SignalRCustomDomainsListOutput,
  }),
);
// Input Schema
export const SignalRDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/signalR/{resourceName}",
  }),
);
export type SignalRDeleteInput = typeof SignalRDeleteInput.Type;

// Output Schema
export const SignalRDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SignalRDeleteOutput = typeof SignalRDeleteOutput.Type;

// The operation
/**
 * Operation to delete a resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const SignalRDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SignalRDeleteInput,
  outputSchema: SignalRDeleteOutput,
}));
// Input Schema
export const SignalRGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/signalR/{resourceName}",
  }),
);
export type SignalRGetInput = typeof SignalRGetInput.Type;

// Output Schema
export const SignalRGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type SignalRGetOutput = typeof SignalRGetOutput.Type;

// The operation
/**
 * Get the resource and its properties.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const SignalRGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SignalRGetInput,
  outputSchema: SignalRGetOutput,
}));
// Input Schema
export const SignalRListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/signalR",
    }),
  );
export type SignalRListByResourceGroupInput =
  typeof SignalRListByResourceGroupInput.Type;

// Output Schema
export const SignalRListByResourceGroupOutput =
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
export type SignalRListByResourceGroupOutput =
  typeof SignalRListByResourceGroupOutput.Type;

// The operation
/**
 * Handles requests to list all resources in a resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const SignalRListByResourceGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SignalRListByResourceGroupInput,
    outputSchema: SignalRListByResourceGroupOutput,
  }),
);
// Input Schema
export const SignalRListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.SignalRService/signalR",
    }),
  );
export type SignalRListBySubscriptionInput =
  typeof SignalRListBySubscriptionInput.Type;

// Output Schema
export const SignalRListBySubscriptionOutput =
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
export type SignalRListBySubscriptionOutput =
  typeof SignalRListBySubscriptionOutput.Type;

// The operation
/**
 * Handles requests to list all resources in a subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const SignalRListBySubscription = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SignalRListBySubscriptionInput,
    outputSchema: SignalRListBySubscriptionOutput,
  }),
);
// Input Schema
export const SignalRListKeysInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/signalR/{resourceName}/listKeys",
  }),
);
export type SignalRListKeysInput = typeof SignalRListKeysInput.Type;

// Output Schema
export const SignalRListKeysOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  primaryKey: Schema.optional(Schema.String),
  secondaryKey: Schema.optional(Schema.String),
  primaryConnectionString: Schema.optional(Schema.String),
  secondaryConnectionString: Schema.optional(Schema.String),
});
export type SignalRListKeysOutput = typeof SignalRListKeysOutput.Type;

// The operation
/**
 * Get the access keys of the resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const SignalRListKeys = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SignalRListKeysInput,
  outputSchema: SignalRListKeysOutput,
}));
// Input Schema
export const SignalRListReplicaSkusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/signalR/{resourceName}/replicas/{replicaName}/skus",
    }),
  );
export type SignalRListReplicaSkusInput =
  typeof SignalRListReplicaSkusInput.Type;

// Output Schema
export const SignalRListReplicaSkusOutput =
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
export type SignalRListReplicaSkusOutput =
  typeof SignalRListReplicaSkusOutput.Type;

// The operation
/**
 * List all available skus of the replica resource.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SignalRListReplicaSkus = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SignalRListReplicaSkusInput,
    outputSchema: SignalRListReplicaSkusOutput,
  }),
);
// Input Schema
export const SignalRListSkusInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/signalR/{resourceName}/skus",
  }),
);
export type SignalRListSkusInput = typeof SignalRListSkusInput.Type;

// Output Schema
export const SignalRListSkusOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
export type SignalRListSkusOutput = typeof SignalRListSkusOutput.Type;

// The operation
/**
 * List all available skus of the resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const SignalRListSkus = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SignalRListSkusInput,
  outputSchema: SignalRListSkusOutput,
}));
// Input Schema
export const SignalRPrivateEndpointConnectionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/signalR/{resourceName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type SignalRPrivateEndpointConnectionsDeleteInput =
  typeof SignalRPrivateEndpointConnectionsDeleteInput.Type;

// Output Schema
export const SignalRPrivateEndpointConnectionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SignalRPrivateEndpointConnectionsDeleteOutput =
  typeof SignalRPrivateEndpointConnectionsDeleteOutput.Type;

// The operation
/**
 * Delete the specified private endpoint connection
 *
 * @param privateEndpointConnectionName - The name of the private endpoint connection associated with the Azure resource.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const SignalRPrivateEndpointConnectionsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SignalRPrivateEndpointConnectionsDeleteInput,
    outputSchema: SignalRPrivateEndpointConnectionsDeleteOutput,
  }));
// Input Schema
export const SignalRPrivateEndpointConnectionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/signalR/{resourceName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type SignalRPrivateEndpointConnectionsGetInput =
  typeof SignalRPrivateEndpointConnectionsGetInput.Type;

// Output Schema
export const SignalRPrivateEndpointConnectionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SignalRPrivateEndpointConnectionsGetOutput =
  typeof SignalRPrivateEndpointConnectionsGetOutput.Type;

// The operation
/**
 * Get the specified private endpoint connection
 *
 * @param privateEndpointConnectionName - The name of the private endpoint connection associated with the Azure resource.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const SignalRPrivateEndpointConnectionsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SignalRPrivateEndpointConnectionsGetInput,
    outputSchema: SignalRPrivateEndpointConnectionsGetOutput,
  }));
// Input Schema
export const SignalRPrivateEndpointConnectionsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/signalR/{resourceName}/privateEndpointConnections",
    }),
  );
export type SignalRPrivateEndpointConnectionsListInput =
  typeof SignalRPrivateEndpointConnectionsListInput.Type;

// Output Schema
export const SignalRPrivateEndpointConnectionsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type SignalRPrivateEndpointConnectionsListOutput =
  typeof SignalRPrivateEndpointConnectionsListOutput.Type;

// The operation
/**
 * List private endpoint connections
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const SignalRPrivateEndpointConnectionsList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SignalRPrivateEndpointConnectionsListInput,
    outputSchema: SignalRPrivateEndpointConnectionsListOutput,
  }));
// Input Schema
export const SignalRPrivateEndpointConnectionsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/signalR/{resourceName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type SignalRPrivateEndpointConnectionsUpdateInput =
  typeof SignalRPrivateEndpointConnectionsUpdateInput.Type;

// Output Schema
export const SignalRPrivateEndpointConnectionsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SignalRPrivateEndpointConnectionsUpdateOutput =
  typeof SignalRPrivateEndpointConnectionsUpdateOutput.Type;

// The operation
/**
 * Update the state of specified private endpoint connection
 *
 * @param privateEndpointConnectionName - The name of the private endpoint connection associated with the Azure resource.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const SignalRPrivateEndpointConnectionsUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SignalRPrivateEndpointConnectionsUpdateInput,
    outputSchema: SignalRPrivateEndpointConnectionsUpdateOutput,
  }));
// Input Schema
export const SignalRPrivateLinkResourcesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/signalR/{resourceName}/privateLinkResources",
    }),
  );
export type SignalRPrivateLinkResourcesListInput =
  typeof SignalRPrivateLinkResourcesListInput.Type;

// Output Schema
export const SignalRPrivateLinkResourcesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type SignalRPrivateLinkResourcesListOutput =
  typeof SignalRPrivateLinkResourcesListOutput.Type;

// The operation
/**
 * Get the private link resources that need to be created for a resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const SignalRPrivateLinkResourcesList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SignalRPrivateLinkResourcesListInput,
    outputSchema: SignalRPrivateLinkResourcesListOutput,
  }));
// Input Schema
export const SignalRRegenerateKeyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/signalR/{resourceName}/regenerateKey",
    }),
  );
export type SignalRRegenerateKeyInput = typeof SignalRRegenerateKeyInput.Type;

// Output Schema
export const SignalRRegenerateKeyOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    primaryKey: Schema.optional(Schema.String),
    secondaryKey: Schema.optional(Schema.String),
    primaryConnectionString: Schema.optional(Schema.String),
    secondaryConnectionString: Schema.optional(Schema.String),
  });
export type SignalRRegenerateKeyOutput = typeof SignalRRegenerateKeyOutput.Type;

// The operation
/**
 * Regenerate the access key for the resource. PrimaryKey and SecondaryKey cannot be regenerated at the same time.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const SignalRRegenerateKey = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SignalRRegenerateKeyInput,
    outputSchema: SignalRRegenerateKeyOutput,
  }),
);
// Input Schema
export const SignalRReplicasCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/signalR/{resourceName}/replicas/{replicaName}",
    }),
  );
export type SignalRReplicasCreateOrUpdateInput =
  typeof SignalRReplicasCreateOrUpdateInput.Type;

// Output Schema
export const SignalRReplicasCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SignalRReplicasCreateOrUpdateOutput =
  typeof SignalRReplicasCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a replica.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SignalRReplicasCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SignalRReplicasCreateOrUpdateInput,
    outputSchema: SignalRReplicasCreateOrUpdateOutput,
  }));
// Input Schema
export const SignalRReplicasDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/signalR/{resourceName}/replicas/{replicaName}",
    }),
  );
export type SignalRReplicasDeleteInput = typeof SignalRReplicasDeleteInput.Type;

// Output Schema
export const SignalRReplicasDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SignalRReplicasDeleteOutput =
  typeof SignalRReplicasDeleteOutput.Type;

// The operation
/**
 * Operation to delete a replica.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SignalRReplicasDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SignalRReplicasDeleteInput,
    outputSchema: SignalRReplicasDeleteOutput,
  }),
);
// Input Schema
export const SignalRReplicasGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/signalR/{resourceName}/replicas/{replicaName}",
    }),
  );
export type SignalRReplicasGetInput = typeof SignalRReplicasGetInput.Type;

// Output Schema
export const SignalRReplicasGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SignalRReplicasGetOutput = typeof SignalRReplicasGetOutput.Type;

// The operation
/**
 * Get the replica and its properties.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SignalRReplicasGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SignalRReplicasGetInput,
  outputSchema: SignalRReplicasGetOutput,
}));
// Input Schema
export const SignalRReplicaSharedPrivateLinkResourcesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/signalR/{resourceName}/replicas/{replicaName}/sharedPrivateLinkResources/{sharedPrivateLinkResourceName}",
    }),
  );
export type SignalRReplicaSharedPrivateLinkResourcesCreateOrUpdateInput =
  typeof SignalRReplicaSharedPrivateLinkResourcesCreateOrUpdateInput.Type;

// Output Schema
export const SignalRReplicaSharedPrivateLinkResourcesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SignalRReplicaSharedPrivateLinkResourcesCreateOrUpdateOutput =
  typeof SignalRReplicaSharedPrivateLinkResourcesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a shared private link resource
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SignalRReplicaSharedPrivateLinkResourcesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SignalRReplicaSharedPrivateLinkResourcesCreateOrUpdateInput,
    outputSchema: SignalRReplicaSharedPrivateLinkResourcesCreateOrUpdateOutput,
  }));
// Input Schema
export const SignalRReplicaSharedPrivateLinkResourcesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/signalR/{resourceName}/replicas/{replicaName}/sharedPrivateLinkResources/{sharedPrivateLinkResourceName}",
    }),
  );
export type SignalRReplicaSharedPrivateLinkResourcesGetInput =
  typeof SignalRReplicaSharedPrivateLinkResourcesGetInput.Type;

// Output Schema
export const SignalRReplicaSharedPrivateLinkResourcesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SignalRReplicaSharedPrivateLinkResourcesGetOutput =
  typeof SignalRReplicaSharedPrivateLinkResourcesGetOutput.Type;

// The operation
/**
 * Get the specified shared private link resource
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SignalRReplicaSharedPrivateLinkResourcesGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SignalRReplicaSharedPrivateLinkResourcesGetInput,
    outputSchema: SignalRReplicaSharedPrivateLinkResourcesGetOutput,
  }));
// Input Schema
export const SignalRReplicaSharedPrivateLinkResourcesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/signalR/{resourceName}/replicas/{replicaName}/sharedPrivateLinkResources",
    }),
  );
export type SignalRReplicaSharedPrivateLinkResourcesListInput =
  typeof SignalRReplicaSharedPrivateLinkResourcesListInput.Type;

// Output Schema
export const SignalRReplicaSharedPrivateLinkResourcesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type SignalRReplicaSharedPrivateLinkResourcesListOutput =
  typeof SignalRReplicaSharedPrivateLinkResourcesListOutput.Type;

// The operation
/**
 * List shared private link resources
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SignalRReplicaSharedPrivateLinkResourcesList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SignalRReplicaSharedPrivateLinkResourcesListInput,
    outputSchema: SignalRReplicaSharedPrivateLinkResourcesListOutput,
  }));
// Input Schema
export const SignalRReplicasListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/signalR/{resourceName}/replicas",
    }),
  );
export type SignalRReplicasListInput = typeof SignalRReplicasListInput.Type;

// Output Schema
export const SignalRReplicasListOutput =
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
export type SignalRReplicasListOutput = typeof SignalRReplicasListOutput.Type;

// The operation
/**
 * List all replicas belong to this resource
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SignalRReplicasList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SignalRReplicasListInput,
  outputSchema: SignalRReplicasListOutput,
}));
// Input Schema
export const SignalRReplicasRestartInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/signalR/{resourceName}/replicas/{replicaName}/restart",
    }),
  );
export type SignalRReplicasRestartInput =
  typeof SignalRReplicasRestartInput.Type;

// Output Schema
export const SignalRReplicasRestartOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SignalRReplicasRestartOutput =
  typeof SignalRReplicasRestartOutput.Type;

// The operation
/**
 * Operation to restart a replica.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SignalRReplicasRestart = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SignalRReplicasRestartInput,
    outputSchema: SignalRReplicasRestartOutput,
  }),
);
// Input Schema
export const SignalRReplicasUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/signalR/{resourceName}/replicas/{replicaName}",
    }),
  );
export type SignalRReplicasUpdateInput = typeof SignalRReplicasUpdateInput.Type;

// Output Schema
export const SignalRReplicasUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SignalRReplicasUpdateOutput =
  typeof SignalRReplicasUpdateOutput.Type;

// The operation
/**
 * Operation to update an exiting replica.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SignalRReplicasUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SignalRReplicasUpdateInput,
    outputSchema: SignalRReplicasUpdateOutput,
  }),
);
// Input Schema
export const SignalRRestartInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/signalR/{resourceName}/restart",
  }),
);
export type SignalRRestartInput = typeof SignalRRestartInput.Type;

// Output Schema
export const SignalRRestartOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SignalRRestartOutput = typeof SignalRRestartOutput.Type;

// The operation
/**
 * Operation to restart a resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const SignalRRestart = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SignalRRestartInput,
  outputSchema: SignalRRestartOutput,
}));
// Input Schema
export const SignalRSharedPrivateLinkResourcesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/signalR/{resourceName}/sharedPrivateLinkResources/{sharedPrivateLinkResourceName}",
    }),
  );
export type SignalRSharedPrivateLinkResourcesCreateOrUpdateInput =
  typeof SignalRSharedPrivateLinkResourcesCreateOrUpdateInput.Type;

// Output Schema
export const SignalRSharedPrivateLinkResourcesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SignalRSharedPrivateLinkResourcesCreateOrUpdateOutput =
  typeof SignalRSharedPrivateLinkResourcesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a shared private link resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const SignalRSharedPrivateLinkResourcesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SignalRSharedPrivateLinkResourcesCreateOrUpdateInput,
    outputSchema: SignalRSharedPrivateLinkResourcesCreateOrUpdateOutput,
  }));
// Input Schema
export const SignalRSharedPrivateLinkResourcesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/signalR/{resourceName}/sharedPrivateLinkResources/{sharedPrivateLinkResourceName}",
    }),
  );
export type SignalRSharedPrivateLinkResourcesDeleteInput =
  typeof SignalRSharedPrivateLinkResourcesDeleteInput.Type;

// Output Schema
export const SignalRSharedPrivateLinkResourcesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SignalRSharedPrivateLinkResourcesDeleteOutput =
  typeof SignalRSharedPrivateLinkResourcesDeleteOutput.Type;

// The operation
/**
 * Delete the specified shared private link resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const SignalRSharedPrivateLinkResourcesDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SignalRSharedPrivateLinkResourcesDeleteInput,
    outputSchema: SignalRSharedPrivateLinkResourcesDeleteOutput,
  }));
// Input Schema
export const SignalRSharedPrivateLinkResourcesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/signalR/{resourceName}/sharedPrivateLinkResources/{sharedPrivateLinkResourceName}",
    }),
  );
export type SignalRSharedPrivateLinkResourcesGetInput =
  typeof SignalRSharedPrivateLinkResourcesGetInput.Type;

// Output Schema
export const SignalRSharedPrivateLinkResourcesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SignalRSharedPrivateLinkResourcesGetOutput =
  typeof SignalRSharedPrivateLinkResourcesGetOutput.Type;

// The operation
/**
 * Get the specified shared private link resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const SignalRSharedPrivateLinkResourcesGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SignalRSharedPrivateLinkResourcesGetInput,
    outputSchema: SignalRSharedPrivateLinkResourcesGetOutput,
  }));
// Input Schema
export const SignalRSharedPrivateLinkResourcesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/signalR/{resourceName}/sharedPrivateLinkResources",
    }),
  );
export type SignalRSharedPrivateLinkResourcesListInput =
  typeof SignalRSharedPrivateLinkResourcesListInput.Type;

// Output Schema
export const SignalRSharedPrivateLinkResourcesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type SignalRSharedPrivateLinkResourcesListOutput =
  typeof SignalRSharedPrivateLinkResourcesListOutput.Type;

// The operation
/**
 * List shared private link resources
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const SignalRSharedPrivateLinkResourcesList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SignalRSharedPrivateLinkResourcesListInput,
    outputSchema: SignalRSharedPrivateLinkResourcesListOutput,
  }));
// Input Schema
export const SignalRUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SignalRService/signalR/{resourceName}",
  }),
);
export type SignalRUpdateInput = typeof SignalRUpdateInput.Type;

// Output Schema
export const SignalRUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type SignalRUpdateOutput = typeof SignalRUpdateOutput.Type;

// The operation
/**
 * Operation to update an exiting resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const SignalRUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SignalRUpdateInput,
  outputSchema: SignalRUpdateOutput,
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
