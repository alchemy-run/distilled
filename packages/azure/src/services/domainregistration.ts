/**
 * Azure Domainregistration API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const DomainRegistrationProviderListOperationsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.DomainRegistration/operations",
    }),
  );
export type DomainRegistrationProviderListOperationsInput =
  typeof DomainRegistrationProviderListOperationsInput.Type;

// Output Schema
export const DomainRegistrationProviderListOperationsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
                      supportsInstanceLevelAggregation: Schema.optional(
                        Schema.Boolean,
                      ),
                      enableRegionalMdmAccount: Schema.optional(Schema.Boolean),
                      sourceMdmAccount: Schema.optional(Schema.String),
                      sourceMdmNamespace: Schema.optional(Schema.String),
                      metricFilterPattern: Schema.optional(Schema.String),
                      fillGapWithZero: Schema.optional(Schema.Boolean),
                      isInternal: Schema.optional(Schema.Boolean),
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
                      category: Schema.optional(Schema.String),
                      availabilities: Schema.optional(
                        Schema.Array(
                          Schema.Struct({
                            timeGrain: Schema.optional(Schema.String),
                            blobDuration: Schema.optional(Schema.String),
                          }),
                        ),
                      ),
                      supportedTimeGrainTypes: Schema.optional(
                        Schema.Array(Schema.String),
                      ),
                      supportedAggregationTypes: Schema.optional(
                        Schema.Array(Schema.String),
                      ),
                    }),
                  ),
                ),
                logSpecifications: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      name: Schema.optional(Schema.String),
                      displayName: Schema.optional(Schema.String),
                      blobDuration: Schema.optional(Schema.String),
                      logFilterPattern: Schema.optional(Schema.String),
                    }),
                  ),
                ),
              }),
            ),
          }),
        ),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type DomainRegistrationProviderListOperationsOutput =
  typeof DomainRegistrationProviderListOperationsOutput.Type;

// The operation
/**
 * Implements Csm operations Api to exposes the list of available Csm Apis under the resource provider
 *
 * Description for Implements Csm operations Api to exposes the list of available Csm Apis under the resource provider
 *
 * @param api-version - The API version to use for this operation.
 */
export const DomainRegistrationProviderListOperations =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DomainRegistrationProviderListOperationsInput,
    outputSchema: DomainRegistrationProviderListOperationsOutput,
  }));
// Input Schema
export const DomainsCheckAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DomainRegistration/checkDomainAvailability",
    }),
  );
export type DomainsCheckAvailabilityInput =
  typeof DomainsCheckAvailabilityInput.Type;

// Output Schema
export const DomainsCheckAvailabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.optional(Schema.String),
    available: Schema.optional(Schema.Boolean),
    domainType: Schema.optional(Schema.Literals(["Regular", "SoftDeleted"])),
  });
export type DomainsCheckAvailabilityOutput =
  typeof DomainsCheckAvailabilityOutput.Type;

// The operation
/**
 * Check if a domain is available for registration.
 *
 * Description for Check if a domain is available for registration.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const DomainsCheckAvailability = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DomainsCheckAvailabilityInput,
    outputSchema: DomainsCheckAvailabilityOutput,
  }),
);
// Input Schema
export const DomainsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    domainName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DomainRegistration/domains/{domainName}",
    }),
  );
export type DomainsCreateOrUpdateInput = typeof DomainsCreateOrUpdateInput.Type;

// Output Schema
export const DomainsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type DomainsCreateOrUpdateOutput =
  typeof DomainsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a domain.
 *
 * Description for Creates or updates a domain.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param domainName - Name of the domain.
 */
export const DomainsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DomainsCreateOrUpdateInput,
    outputSchema: DomainsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const DomainsCreateOrUpdateOwnershipIdentifierInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    domainName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DomainRegistration/domains/{domainName}/domainOwnershipIdentifiers/{name}",
    }),
  );
export type DomainsCreateOrUpdateOwnershipIdentifierInput =
  typeof DomainsCreateOrUpdateOwnershipIdentifierInput.Type;

// Output Schema
export const DomainsCreateOrUpdateOwnershipIdentifierOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DomainsCreateOrUpdateOwnershipIdentifierOutput =
  typeof DomainsCreateOrUpdateOwnershipIdentifierOutput.Type;

// The operation
/**
 * Creates an ownership identifier for a domain or updates identifier details for an existing identifier
 *
 * Description for Creates an ownership identifier for a domain or updates identifier details for an existing identifier
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param domainName - Name of the domain.
 * @param name - Name of identifier.
 */
export const DomainsCreateOrUpdateOwnershipIdentifier =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DomainsCreateOrUpdateOwnershipIdentifierInput,
    outputSchema: DomainsCreateOrUpdateOwnershipIdentifierOutput,
  }));
// Input Schema
export const DomainsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  domainName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
  forceHardDeleteDomain: Schema.optional(Schema.Boolean),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DomainRegistration/domains/{domainName}",
  }),
);
export type DomainsDeleteInput = typeof DomainsDeleteInput.Type;

// Output Schema
export const DomainsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DomainsDeleteOutput = typeof DomainsDeleteOutput.Type;

// The operation
/**
 * Delete a domain.
 *
 * Description for Delete a domain.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param domainName - Name of the domain.
 * @param forceHardDeleteDomain - Specify <code>true</code> to delete the domain immediately. The default is <code>false</code> which deletes the domain after 24 hours.
 */
export const DomainsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DomainsDeleteInput,
  outputSchema: DomainsDeleteOutput,
}));
// Input Schema
export const DomainsDeleteOwnershipIdentifierInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    domainName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DomainRegistration/domains/{domainName}/domainOwnershipIdentifiers/{name}",
    }),
  );
export type DomainsDeleteOwnershipIdentifierInput =
  typeof DomainsDeleteOwnershipIdentifierInput.Type;

// Output Schema
export const DomainsDeleteOwnershipIdentifierOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DomainsDeleteOwnershipIdentifierOutput =
  typeof DomainsDeleteOwnershipIdentifierOutput.Type;

// The operation
/**
 * Delete ownership identifier for domain
 *
 * Description for Delete ownership identifier for domain
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param domainName - Name of the domain.
 * @param name - Name of identifier.
 */
export const DomainsDeleteOwnershipIdentifier =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DomainsDeleteOwnershipIdentifierInput,
    outputSchema: DomainsDeleteOwnershipIdentifierOutput,
  }));
// Input Schema
export const DomainsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  domainName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DomainRegistration/domains/{domainName}",
  }),
);
export type DomainsGetInput = typeof DomainsGetInput.Type;

// Output Schema
export const DomainsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type DomainsGetOutput = typeof DomainsGetOutput.Type;

// The operation
/**
 * Get a domain.
 *
 * Description for Get a domain.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param domainName - Name of the domain.
 */
export const DomainsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DomainsGetInput,
  outputSchema: DomainsGetOutput,
}));
// Input Schema
export const DomainsGetControlCenterSsoRequestInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DomainRegistration/generateSsoRequest",
    }),
  );
export type DomainsGetControlCenterSsoRequestInput =
  typeof DomainsGetControlCenterSsoRequestInput.Type;

// Output Schema
export const DomainsGetControlCenterSsoRequestOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    url: Schema.optional(Schema.String),
    postParameterKey: Schema.optional(Schema.String),
    postParameterValue: Schema.optional(Schema.String),
  });
export type DomainsGetControlCenterSsoRequestOutput =
  typeof DomainsGetControlCenterSsoRequestOutput.Type;

// The operation
/**
 * Generate a single sign-on request for the domain management portal.
 *
 * Description for Generate a single sign-on request for the domain management portal.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const DomainsGetControlCenterSsoRequest =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DomainsGetControlCenterSsoRequestInput,
    outputSchema: DomainsGetControlCenterSsoRequestOutput,
  }));
// Input Schema
export const DomainsGetOwnershipIdentifierInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    domainName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DomainRegistration/domains/{domainName}/domainOwnershipIdentifiers/{name}",
    }),
  );
export type DomainsGetOwnershipIdentifierInput =
  typeof DomainsGetOwnershipIdentifierInput.Type;

// Output Schema
export const DomainsGetOwnershipIdentifierOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DomainsGetOwnershipIdentifierOutput =
  typeof DomainsGetOwnershipIdentifierOutput.Type;

// The operation
/**
 * Get ownership identifier for domain
 *
 * Description for Get ownership identifier for domain
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param domainName - Name of the domain.
 * @param name - Name of identifier.
 */
export const DomainsGetOwnershipIdentifier =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DomainsGetOwnershipIdentifierInput,
    outputSchema: DomainsGetOwnershipIdentifierOutput,
  }));
// Input Schema
export const DomainsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.DomainRegistration/domains",
  }),
);
export type DomainsListInput = typeof DomainsListInput.Type;

// Output Schema
export const DomainsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(
    Schema.Struct({
      tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      location: Schema.String,
    }),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type DomainsListOutput = typeof DomainsListOutput.Type;

// The operation
/**
 * Get all domains in a subscription.
 *
 * Description for Get all domains in a subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const DomainsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DomainsListInput,
  outputSchema: DomainsListOutput,
}));
// Input Schema
export const DomainsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DomainRegistration/domains",
    }),
  );
export type DomainsListByResourceGroupInput =
  typeof DomainsListByResourceGroupInput.Type;

// Output Schema
export const DomainsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type DomainsListByResourceGroupOutput =
  typeof DomainsListByResourceGroupOutput.Type;

// The operation
/**
 * Get all domains in a resource group.
 *
 * Description for Get all domains in a resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const DomainsListByResourceGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DomainsListByResourceGroupInput,
    outputSchema: DomainsListByResourceGroupOutput,
  }),
);
// Input Schema
export const DomainsListOwnershipIdentifiersInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    domainName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DomainRegistration/domains/{domainName}/domainOwnershipIdentifiers",
    }),
  );
export type DomainsListOwnershipIdentifiersInput =
  typeof DomainsListOwnershipIdentifiersInput.Type;

// Output Schema
export const DomainsListOwnershipIdentifiersOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type DomainsListOwnershipIdentifiersOutput =
  typeof DomainsListOwnershipIdentifiersOutput.Type;

// The operation
/**
 * Lists domain ownership identifiers.
 *
 * Description for Lists domain ownership identifiers.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param domainName - Name of the domain.
 */
export const DomainsListOwnershipIdentifiers =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DomainsListOwnershipIdentifiersInput,
    outputSchema: DomainsListOwnershipIdentifiersOutput,
  }));
// Input Schema
export const DomainsListRecommendationsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DomainRegistration/listDomainRecommendations",
    }),
  );
export type DomainsListRecommendationsInput =
  typeof DomainsListRecommendationsInput.Type;

// Output Schema
export const DomainsListRecommendationsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        name: Schema.optional(Schema.String),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type DomainsListRecommendationsOutput =
  typeof DomainsListRecommendationsOutput.Type;

// The operation
/**
 * Get domain name recommendations based on keywords.
 *
 * Description for Get domain name recommendations based on keywords.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const DomainsListRecommendations = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DomainsListRecommendationsInput,
    outputSchema: DomainsListRecommendationsOutput,
  }),
);
// Input Schema
export const DomainsRenewInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  domainName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DomainRegistration/domains/{domainName}/renew",
  }),
);
export type DomainsRenewInput = typeof DomainsRenewInput.Type;

// Output Schema
export const DomainsRenewOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DomainsRenewOutput = typeof DomainsRenewOutput.Type;

// The operation
/**
 * Renew a domain.
 *
 * Description for Renew a domain.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param domainName - Name of the domain.
 */
export const DomainsRenew = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DomainsRenewInput,
  outputSchema: DomainsRenewOutput,
}));
// Input Schema
export const DomainsTransferOutInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    domainName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DomainRegistration/domains/{domainName}/transferOut",
    }),
  );
export type DomainsTransferOutInput = typeof DomainsTransferOutInput.Type;

// Output Schema
export const DomainsTransferOutOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type DomainsTransferOutOutput = typeof DomainsTransferOutOutput.Type;

// The operation
/**
 * Transfer out domain to another registrar
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param domainName - Name of the domain.
 */
export const DomainsTransferOut = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DomainsTransferOutInput,
  outputSchema: DomainsTransferOutOutput,
}));
// Input Schema
export const DomainsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  domainName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DomainRegistration/domains/{domainName}",
  }),
);
export type DomainsUpdateInput = typeof DomainsUpdateInput.Type;

// Output Schema
export const DomainsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type DomainsUpdateOutput = typeof DomainsUpdateOutput.Type;

// The operation
/**
 * Creates or updates a domain.
 *
 * Description for Creates or updates a domain.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param domainName - Name of the domain.
 */
export const DomainsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DomainsUpdateInput,
  outputSchema: DomainsUpdateOutput,
}));
// Input Schema
export const DomainsUpdateOwnershipIdentifierInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    domainName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DomainRegistration/domains/{domainName}/domainOwnershipIdentifiers/{name}",
    }),
  );
export type DomainsUpdateOwnershipIdentifierInput =
  typeof DomainsUpdateOwnershipIdentifierInput.Type;

// Output Schema
export const DomainsUpdateOwnershipIdentifierOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DomainsUpdateOwnershipIdentifierOutput =
  typeof DomainsUpdateOwnershipIdentifierOutput.Type;

// The operation
/**
 * Creates an ownership identifier for a domain or updates identifier details for an existing identifier
 *
 * Description for Creates an ownership identifier for a domain or updates identifier details for an existing identifier
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param domainName - Name of the domain.
 * @param name - Name of identifier.
 */
export const DomainsUpdateOwnershipIdentifier =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DomainsUpdateOwnershipIdentifierInput,
    outputSchema: DomainsUpdateOwnershipIdentifierOutput,
  }));
// Input Schema
export const TopLevelDomainsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DomainRegistration/topLevelDomains/{name}",
    }),
  );
export type TopLevelDomainsGetInput = typeof TopLevelDomainsGetInput.Type;

// Output Schema
export const TopLevelDomainsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type TopLevelDomainsGetOutput = typeof TopLevelDomainsGetOutput.Type;

// The operation
/**
 * Get details of a top-level domain.
 *
 * Description for Get details of a top-level domain.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param name - Name of the top-level domain.
 */
export const TopLevelDomainsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TopLevelDomainsGetInput,
  outputSchema: TopLevelDomainsGetOutput,
}));
// Input Schema
export const TopLevelDomainsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DomainRegistration/topLevelDomains",
    }),
  );
export type TopLevelDomainsListInput = typeof TopLevelDomainsListInput.Type;

// Output Schema
export const TopLevelDomainsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type TopLevelDomainsListOutput = typeof TopLevelDomainsListOutput.Type;

// The operation
/**
 * Get all top-level domains supported for registration.
 *
 * Description for Get all top-level domains supported for registration.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const TopLevelDomainsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TopLevelDomainsListInput,
  outputSchema: TopLevelDomainsListOutput,
}));
// Input Schema
export const TopLevelDomainsListAgreementsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DomainRegistration/topLevelDomains/{name}/listAgreements",
    }),
  );
export type TopLevelDomainsListAgreementsInput =
  typeof TopLevelDomainsListAgreementsInput.Type;

// Output Schema
export const TopLevelDomainsListAgreementsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        agreementKey: Schema.String,
        title: Schema.String,
        content: Schema.String,
        url: Schema.optional(Schema.String),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type TopLevelDomainsListAgreementsOutput =
  typeof TopLevelDomainsListAgreementsOutput.Type;

// The operation
/**
 * Gets all legal agreements that user needs to accept before purchasing a domain.
 *
 * Description for Gets all legal agreements that user needs to accept before purchasing a domain.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param name - Name of the top-level domain.
 */
export const TopLevelDomainsListAgreements =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: TopLevelDomainsListAgreementsInput,
    outputSchema: TopLevelDomainsListAgreementsOutput,
  }));
