/**
 * Azure Communication API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const CommunicationServicesCheckNameAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Communication/checkNameAvailability",
    }),
  );
export type CommunicationServicesCheckNameAvailabilityInput =
  typeof CommunicationServicesCheckNameAvailabilityInput.Type;

// Output Schema
export const CommunicationServicesCheckNameAvailabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nameAvailable: Schema.optional(Schema.Boolean),
    reason: Schema.optional(Schema.Literals(["Invalid", "AlreadyExists"])),
    message: Schema.optional(Schema.String),
  });
export type CommunicationServicesCheckNameAvailabilityOutput =
  typeof CommunicationServicesCheckNameAvailabilityOutput.Type;

// The operation
/**
 * Check Name Availability
 *
 * Checks that the CommunicationService name is valid and is not already in use.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const CommunicationServicesCheckNameAvailability =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CommunicationServicesCheckNameAvailabilityInput,
    outputSchema: CommunicationServicesCheckNameAvailabilityOutput,
  }));
// Input Schema
export const CommunicationServicesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    communicationServiceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Communication/communicationServices/{communicationServiceName}",
    }),
  );
export type CommunicationServicesCreateOrUpdateInput =
  typeof CommunicationServicesCreateOrUpdateInput.Type;

// Output Schema
export const CommunicationServicesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type CommunicationServicesCreateOrUpdateOutput =
  typeof CommunicationServicesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create Or Update
 *
 * Create a new CommunicationService or update an existing CommunicationService.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param communicationServiceName - The name of the CommunicationService resource.
 */
export const CommunicationServicesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CommunicationServicesCreateOrUpdateInput,
    outputSchema: CommunicationServicesCreateOrUpdateOutput,
  }));
// Input Schema
export const CommunicationServicesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    communicationServiceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Communication/communicationServices/{communicationServiceName}",
    }),
  );
export type CommunicationServicesDeleteInput =
  typeof CommunicationServicesDeleteInput.Type;

// Output Schema
export const CommunicationServicesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CommunicationServicesDeleteOutput =
  typeof CommunicationServicesDeleteOutput.Type;

// The operation
/**
 * Delete
 *
 * Operation to delete a CommunicationService.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param communicationServiceName - The name of the CommunicationService resource.
 */
export const CommunicationServicesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CommunicationServicesDeleteInput,
    outputSchema: CommunicationServicesDeleteOutput,
  }),
);
// Input Schema
export const CommunicationServicesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    communicationServiceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Communication/communicationServices/{communicationServiceName}",
    }),
  );
export type CommunicationServicesGetInput =
  typeof CommunicationServicesGetInput.Type;

// Output Schema
export const CommunicationServicesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type CommunicationServicesGetOutput =
  typeof CommunicationServicesGetOutput.Type;

// The operation
/**
 * Get
 *
 * Get the CommunicationService and its properties.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param communicationServiceName - The name of the CommunicationService resource.
 */
export const CommunicationServicesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CommunicationServicesGetInput,
    outputSchema: CommunicationServicesGetOutput,
  }),
);
// Input Schema
export const CommunicationServicesLinkNotificationHubInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    communicationServiceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Communication/communicationServices/{communicationServiceName}/linkNotificationHub",
    }),
  );
export type CommunicationServicesLinkNotificationHubInput =
  typeof CommunicationServicesLinkNotificationHubInput.Type;

// Output Schema
export const CommunicationServicesLinkNotificationHubOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceId: Schema.optional(Schema.String),
  });
export type CommunicationServicesLinkNotificationHubOutput =
  typeof CommunicationServicesLinkNotificationHubOutput.Type;

// The operation
/**
 * Link Notification Hub
 *
 * Links an Azure Notification Hub to this communication service.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param communicationServiceName - The name of the CommunicationService resource.
 */
export const CommunicationServicesLinkNotificationHub =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CommunicationServicesLinkNotificationHubInput,
    outputSchema: CommunicationServicesLinkNotificationHubOutput,
  }));
// Input Schema
export const CommunicationServicesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Communication/communicationServices",
    }),
  );
export type CommunicationServicesListByResourceGroupInput =
  typeof CommunicationServicesListByResourceGroupInput.Type;

// Output Schema
export const CommunicationServicesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type CommunicationServicesListByResourceGroupOutput =
  typeof CommunicationServicesListByResourceGroupOutput.Type;

// The operation
/**
 * List By Resource Group
 *
 * Handles requests to list all resources in a resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const CommunicationServicesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CommunicationServicesListByResourceGroupInput,
    outputSchema: CommunicationServicesListByResourceGroupOutput,
  }));
// Input Schema
export const CommunicationServicesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Communication/communicationServices",
    }),
  );
export type CommunicationServicesListBySubscriptionInput =
  typeof CommunicationServicesListBySubscriptionInput.Type;

// Output Schema
export const CommunicationServicesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type CommunicationServicesListBySubscriptionOutput =
  typeof CommunicationServicesListBySubscriptionOutput.Type;

// The operation
/**
 * List By Subscription
 *
 * Handles requests to list all resources in a subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const CommunicationServicesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CommunicationServicesListBySubscriptionInput,
    outputSchema: CommunicationServicesListBySubscriptionOutput,
  }));
// Input Schema
export const CommunicationServicesListKeysInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    communicationServiceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Communication/communicationServices/{communicationServiceName}/listKeys",
    }),
  );
export type CommunicationServicesListKeysInput =
  typeof CommunicationServicesListKeysInput.Type;

// Output Schema
export const CommunicationServicesListKeysOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    primaryKey: Schema.optional(Schema.String),
    secondaryKey: Schema.optional(Schema.String),
    primaryConnectionString: Schema.optional(Schema.String),
    secondaryConnectionString: Schema.optional(Schema.String),
  });
export type CommunicationServicesListKeysOutput =
  typeof CommunicationServicesListKeysOutput.Type;

// The operation
/**
 * List Keys
 *
 * Get the access keys of the CommunicationService resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param communicationServiceName - The name of the CommunicationService resource.
 */
export const CommunicationServicesListKeys =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CommunicationServicesListKeysInput,
    outputSchema: CommunicationServicesListKeysOutput,
  }));
// Input Schema
export const CommunicationServicesRegenerateKeyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    communicationServiceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Communication/communicationServices/{communicationServiceName}/regenerateKey",
    }),
  );
export type CommunicationServicesRegenerateKeyInput =
  typeof CommunicationServicesRegenerateKeyInput.Type;

// Output Schema
export const CommunicationServicesRegenerateKeyOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    primaryKey: Schema.optional(Schema.String),
    secondaryKey: Schema.optional(Schema.String),
    primaryConnectionString: Schema.optional(Schema.String),
    secondaryConnectionString: Schema.optional(Schema.String),
  });
export type CommunicationServicesRegenerateKeyOutput =
  typeof CommunicationServicesRegenerateKeyOutput.Type;

// The operation
/**
 * Regenerate Key
 *
 * Regenerate CommunicationService access key. PrimaryKey and SecondaryKey cannot be regenerated at the same time.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param communicationServiceName - The name of the CommunicationService resource.
 */
export const CommunicationServicesRegenerateKey =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CommunicationServicesRegenerateKeyInput,
    outputSchema: CommunicationServicesRegenerateKeyOutput,
  }));
// Input Schema
export const CommunicationServicesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    communicationServiceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Communication/communicationServices/{communicationServiceName}",
    }),
  );
export type CommunicationServicesUpdateInput =
  typeof CommunicationServicesUpdateInput.Type;

// Output Schema
export const CommunicationServicesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type CommunicationServicesUpdateOutput =
  typeof CommunicationServicesUpdateOutput.Type;

// The operation
/**
 * Update
 *
 * Operation to update an existing CommunicationService.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param communicationServiceName - The name of the CommunicationService resource.
 */
export const CommunicationServicesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CommunicationServicesUpdateInput,
    outputSchema: CommunicationServicesUpdateOutput,
  }),
);
// Input Schema
export const DomainsCancelVerificationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    emailServiceName: Schema.String.pipe(T.PathParam()),
    domainName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Communication/emailServices/{emailServiceName}/domains/{domainName}/cancelVerification",
    }),
  );
export type DomainsCancelVerificationInput =
  typeof DomainsCancelVerificationInput.Type;

// Output Schema
export const DomainsCancelVerificationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DomainsCancelVerificationOutput =
  typeof DomainsCancelVerificationOutput.Type;

// The operation
/**
 * Cancel Verification
 *
 * Cancel verification of DNS record.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param emailServiceName - The name of the EmailService resource.
 * @param domainName - The name of the Domains resource.
 */
export const DomainsCancelVerification = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DomainsCancelVerificationInput,
    outputSchema: DomainsCancelVerificationOutput,
  }),
);
// Input Schema
export const DomainsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    emailServiceName: Schema.String.pipe(T.PathParam()),
    domainName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Communication/emailServices/{emailServiceName}/domains/{domainName}",
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
 * Create Or Update
 *
 * Add a new Domains resource under the parent EmailService resource or update an existing Domains resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param emailServiceName - The name of the EmailService resource.
 * @param domainName - The name of the Domains resource.
 */
export const DomainsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DomainsCreateOrUpdateInput,
    outputSchema: DomainsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const DomainsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  emailServiceName: Schema.String.pipe(T.PathParam()),
  domainName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Communication/emailServices/{emailServiceName}/domains/{domainName}",
  }),
);
export type DomainsDeleteInput = typeof DomainsDeleteInput.Type;

// Output Schema
export const DomainsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DomainsDeleteOutput = typeof DomainsDeleteOutput.Type;

// The operation
/**
 * Delete
 *
 * Operation to delete a Domains resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param emailServiceName - The name of the EmailService resource.
 * @param domainName - The name of the Domains resource.
 */
export const DomainsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DomainsDeleteInput,
  outputSchema: DomainsDeleteOutput,
}));
// Input Schema
export const DomainsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  emailServiceName: Schema.String.pipe(T.PathParam()),
  domainName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Communication/emailServices/{emailServiceName}/domains/{domainName}",
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
 * Get
 *
 * Get the Domains resource and its properties.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param emailServiceName - The name of the EmailService resource.
 * @param domainName - The name of the Domains resource.
 */
export const DomainsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DomainsGetInput,
  outputSchema: DomainsGetOutput,
}));
// Input Schema
export const DomainsInitiateVerificationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    emailServiceName: Schema.String.pipe(T.PathParam()),
    domainName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Communication/emailServices/{emailServiceName}/domains/{domainName}/initiateVerification",
    }),
  );
export type DomainsInitiateVerificationInput =
  typeof DomainsInitiateVerificationInput.Type;

// Output Schema
export const DomainsInitiateVerificationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DomainsInitiateVerificationOutput =
  typeof DomainsInitiateVerificationOutput.Type;

// The operation
/**
 * Initiate Verification
 *
 * Initiate verification of DNS record.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param emailServiceName - The name of the EmailService resource.
 * @param domainName - The name of the Domains resource.
 */
export const DomainsInitiateVerification = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DomainsInitiateVerificationInput,
    outputSchema: DomainsInitiateVerificationOutput,
  }),
);
// Input Schema
export const DomainsListByEmailServiceResourceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    emailServiceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Communication/emailServices/{emailServiceName}/domains",
    }),
  );
export type DomainsListByEmailServiceResourceInput =
  typeof DomainsListByEmailServiceResourceInput.Type;

// Output Schema
export const DomainsListByEmailServiceResourceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type DomainsListByEmailServiceResourceOutput =
  typeof DomainsListByEmailServiceResourceOutput.Type;

// The operation
/**
 * List by EmailService
 *
 * Handles requests to list all Domains resources under the parent EmailServices resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param emailServiceName - The name of the EmailService resource.
 */
export const DomainsListByEmailServiceResource =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DomainsListByEmailServiceResourceInput,
    outputSchema: DomainsListByEmailServiceResourceOutput,
  }));
// Input Schema
export const DomainsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  emailServiceName: Schema.String.pipe(T.PathParam()),
  domainName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Communication/emailServices/{emailServiceName}/domains/{domainName}",
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
 * Update
 *
 * Operation to update an existing Domains resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param emailServiceName - The name of the EmailService resource.
 * @param domainName - The name of the Domains resource.
 */
export const DomainsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DomainsUpdateInput,
  outputSchema: DomainsUpdateOutput,
}));
// Input Schema
export const EmailServicesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    emailServiceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Communication/emailServices/{emailServiceName}",
    }),
  );
export type EmailServicesCreateOrUpdateInput =
  typeof EmailServicesCreateOrUpdateInput.Type;

// Output Schema
export const EmailServicesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type EmailServicesCreateOrUpdateOutput =
  typeof EmailServicesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create Or Update
 *
 * Create a new EmailService or update an existing EmailService.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param emailServiceName - The name of the EmailService resource.
 */
export const EmailServicesCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: EmailServicesCreateOrUpdateInput,
    outputSchema: EmailServicesCreateOrUpdateOutput,
  }),
);
// Input Schema
export const EmailServicesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    emailServiceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Communication/emailServices/{emailServiceName}",
    }),
  );
export type EmailServicesDeleteInput = typeof EmailServicesDeleteInput.Type;

// Output Schema
export const EmailServicesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type EmailServicesDeleteOutput = typeof EmailServicesDeleteOutput.Type;

// The operation
/**
 * Delete
 *
 * Operation to delete a EmailService.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param emailServiceName - The name of the EmailService resource.
 */
export const EmailServicesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: EmailServicesDeleteInput,
  outputSchema: EmailServicesDeleteOutput,
}));
// Input Schema
export const EmailServicesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  emailServiceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Communication/emailServices/{emailServiceName}",
  }),
);
export type EmailServicesGetInput = typeof EmailServicesGetInput.Type;

// Output Schema
export const EmailServicesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  },
);
export type EmailServicesGetOutput = typeof EmailServicesGetOutput.Type;

// The operation
/**
 * Get
 *
 * Get the EmailService and its properties.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param emailServiceName - The name of the EmailService resource.
 */
export const EmailServicesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: EmailServicesGetInput,
  outputSchema: EmailServicesGetOutput,
}));
// Input Schema
export const EmailServicesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Communication/emailServices",
    }),
  );
export type EmailServicesListByResourceGroupInput =
  typeof EmailServicesListByResourceGroupInput.Type;

// Output Schema
export const EmailServicesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type EmailServicesListByResourceGroupOutput =
  typeof EmailServicesListByResourceGroupOutput.Type;

// The operation
/**
 * List By Resource Group
 *
 * Handles requests to list all resources in a resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const EmailServicesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: EmailServicesListByResourceGroupInput,
    outputSchema: EmailServicesListByResourceGroupOutput,
  }));
// Input Schema
export const EmailServicesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Communication/emailServices",
    }),
  );
export type EmailServicesListBySubscriptionInput =
  typeof EmailServicesListBySubscriptionInput.Type;

// Output Schema
export const EmailServicesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type EmailServicesListBySubscriptionOutput =
  typeof EmailServicesListBySubscriptionOutput.Type;

// The operation
/**
 * List By Subscription
 *
 * Handles requests to list all resources in a subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const EmailServicesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: EmailServicesListBySubscriptionInput,
    outputSchema: EmailServicesListBySubscriptionOutput,
  }));
// Input Schema
export const EmailServicesListVerifiedExchangeOnlineDomainsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Communication/listVerifiedExchangeOnlineDomains",
    }),
  );
export type EmailServicesListVerifiedExchangeOnlineDomainsInput =
  typeof EmailServicesListVerifiedExchangeOnlineDomainsInput.Type;

// Output Schema
export const EmailServicesListVerifiedExchangeOnlineDomainsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Array(Schema.String);
export type EmailServicesListVerifiedExchangeOnlineDomainsOutput =
  typeof EmailServicesListVerifiedExchangeOnlineDomainsOutput.Type;

// The operation
/**
 * List Verified Domains From Exchange Online
 *
 * Get a list of domains that are fully verified in Exchange Online.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const EmailServicesListVerifiedExchangeOnlineDomains =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: EmailServicesListVerifiedExchangeOnlineDomainsInput,
    outputSchema: EmailServicesListVerifiedExchangeOnlineDomainsOutput,
  }));
// Input Schema
export const EmailServicesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    emailServiceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Communication/emailServices/{emailServiceName}",
    }),
  );
export type EmailServicesUpdateInput = typeof EmailServicesUpdateInput.Type;

// Output Schema
export const EmailServicesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type EmailServicesUpdateOutput = typeof EmailServicesUpdateOutput.Type;

// The operation
/**
 * Update
 *
 * Operation to update an existing EmailService.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param emailServiceName - The name of the EmailService resource.
 */
export const EmailServicesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: EmailServicesUpdateInput,
  outputSchema: EmailServicesUpdateOutput,
}));
// Input Schema
export const SenderUsernamesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    emailServiceName: Schema.String.pipe(T.PathParam()),
    domainName: Schema.String.pipe(T.PathParam()),
    senderUsername: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Communication/emailServices/{emailServiceName}/domains/{domainName}/senderUsernames/{senderUsername}",
    }),
  );
export type SenderUsernamesCreateOrUpdateInput =
  typeof SenderUsernamesCreateOrUpdateInput.Type;

// Output Schema
export const SenderUsernamesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SenderUsernamesCreateOrUpdateOutput =
  typeof SenderUsernamesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create Or Update
 *
 * Add a new SenderUsername resource under the parent Domains resource or update an existing SenderUsername resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param emailServiceName - The name of the EmailService resource.
 * @param domainName - The name of the Domains resource.
 * @param senderUsername - The valid sender Username.
 */
export const SenderUsernamesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SenderUsernamesCreateOrUpdateInput,
    outputSchema: SenderUsernamesCreateOrUpdateOutput,
  }));
// Input Schema
export const SenderUsernamesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    emailServiceName: Schema.String.pipe(T.PathParam()),
    domainName: Schema.String.pipe(T.PathParam()),
    senderUsername: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Communication/emailServices/{emailServiceName}/domains/{domainName}/senderUsernames/{senderUsername}",
    }),
  );
export type SenderUsernamesDeleteInput = typeof SenderUsernamesDeleteInput.Type;

// Output Schema
export const SenderUsernamesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SenderUsernamesDeleteOutput =
  typeof SenderUsernamesDeleteOutput.Type;

// The operation
/**
 * Delete
 *
 * Operation to delete a SenderUsernames resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param emailServiceName - The name of the EmailService resource.
 * @param domainName - The name of the Domains resource.
 * @param senderUsername - The valid sender Username.
 */
export const SenderUsernamesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SenderUsernamesDeleteInput,
    outputSchema: SenderUsernamesDeleteOutput,
  }),
);
// Input Schema
export const SenderUsernamesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    emailServiceName: Schema.String.pipe(T.PathParam()),
    domainName: Schema.String.pipe(T.PathParam()),
    senderUsername: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Communication/emailServices/{emailServiceName}/domains/{domainName}/senderUsernames/{senderUsername}",
    }),
  );
export type SenderUsernamesGetInput = typeof SenderUsernamesGetInput.Type;

// Output Schema
export const SenderUsernamesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SenderUsernamesGetOutput = typeof SenderUsernamesGetOutput.Type;

// The operation
/**
 * Get
 *
 * Get a valid sender username for a domains resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param emailServiceName - The name of the EmailService resource.
 * @param domainName - The name of the Domains resource.
 * @param senderUsername - The valid sender Username.
 */
export const SenderUsernamesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SenderUsernamesGetInput,
  outputSchema: SenderUsernamesGetOutput,
}));
// Input Schema
export const SenderUsernamesListByDomainsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    emailServiceName: Schema.String.pipe(T.PathParam()),
    domainName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Communication/emailServices/{emailServiceName}/domains/{domainName}/senderUsernames",
    }),
  );
export type SenderUsernamesListByDomainsInput =
  typeof SenderUsernamesListByDomainsInput.Type;

// Output Schema
export const SenderUsernamesListByDomainsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type SenderUsernamesListByDomainsOutput =
  typeof SenderUsernamesListByDomainsOutput.Type;

// The operation
/**
 * ListBy_Domains
 *
 * List all valid sender usernames for a domains resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param emailServiceName - The name of the EmailService resource.
 * @param domainName - The name of the Domains resource.
 */
export const SenderUsernamesListByDomains =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SenderUsernamesListByDomainsInput,
    outputSchema: SenderUsernamesListByDomainsOutput,
  }));
// Input Schema
export const SmtpUsernamesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    communicationServiceName: Schema.String.pipe(T.PathParam()),
    smtpUsername: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Communication/communicationServices/{communicationServiceName}/smtpUsernames/{smtpUsername}",
    }),
  );
export type SmtpUsernamesCreateOrUpdateInput =
  typeof SmtpUsernamesCreateOrUpdateInput.Type;

// Output Schema
export const SmtpUsernamesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SmtpUsernamesCreateOrUpdateOutput =
  typeof SmtpUsernamesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create Or Update
 *
 * Create or update an SmtpUsernameResource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param communicationServiceName - The name of the CommunicationService resource.
 * @param smtpUsername - The name of the SmtpUsernameResource.
 */
export const SmtpUsernamesCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SmtpUsernamesCreateOrUpdateInput,
    outputSchema: SmtpUsernamesCreateOrUpdateOutput,
  }),
);
// Input Schema
export const SmtpUsernamesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    communicationServiceName: Schema.String.pipe(T.PathParam()),
    smtpUsername: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Communication/communicationServices/{communicationServiceName}/smtpUsernames/{smtpUsername}",
    }),
  );
export type SmtpUsernamesDeleteInput = typeof SmtpUsernamesDeleteInput.Type;

// Output Schema
export const SmtpUsernamesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SmtpUsernamesDeleteOutput = typeof SmtpUsernamesDeleteOutput.Type;

// The operation
/**
 * Delete
 *
 * Operation to delete a single SmtpUsername resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param communicationServiceName - The name of the CommunicationService resource.
 * @param smtpUsername - The name of the SmtpUsernameResource.
 */
export const SmtpUsernamesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SmtpUsernamesDeleteInput,
  outputSchema: SmtpUsernamesDeleteOutput,
}));
// Input Schema
export const SmtpUsernamesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  communicationServiceName: Schema.String.pipe(T.PathParam()),
  smtpUsername: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Communication/communicationServices/{communicationServiceName}/smtpUsernames/{smtpUsername}",
  }),
);
export type SmtpUsernamesGetInput = typeof SmtpUsernamesGetInput.Type;

// Output Schema
export const SmtpUsernamesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type SmtpUsernamesGetOutput = typeof SmtpUsernamesGetOutput.Type;

// The operation
/**
 * Get
 *
 * Get a SmtpUsernameResource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param communicationServiceName - The name of the CommunicationService resource.
 * @param smtpUsername - The name of the SmtpUsernameResource.
 */
export const SmtpUsernamesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SmtpUsernamesGetInput,
  outputSchema: SmtpUsernamesGetOutput,
}));
// Input Schema
export const SmtpUsernamesListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    communicationServiceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Communication/communicationServices/{communicationServiceName}/smtpUsernames",
  }),
);
export type SmtpUsernamesListInput = typeof SmtpUsernamesListInput.Type;

// Output Schema
export const SmtpUsernamesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type SmtpUsernamesListOutput = typeof SmtpUsernamesListOutput.Type;

// The operation
/**
 * Get
 *
 * Get all SmtpUsernameResources for a Communication resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param communicationServiceName - The name of the CommunicationService resource.
 */
export const SmtpUsernamesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SmtpUsernamesListInput,
  outputSchema: SmtpUsernamesListOutput,
}));
// Input Schema
export const SuppressionListAddressesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    emailServiceName: Schema.String.pipe(T.PathParam()),
    domainName: Schema.String.pipe(T.PathParam()),
    suppressionListName: Schema.String.pipe(T.PathParam()),
    addressId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Communication/emailServices/{emailServiceName}/domains/{domainName}/suppressionLists/{suppressionListName}/suppressionListAddresses/{addressId}",
    }),
  );
export type SuppressionListAddressesCreateOrUpdateInput =
  typeof SuppressionListAddressesCreateOrUpdateInput.Type;

// Output Schema
export const SuppressionListAddressesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SuppressionListAddressesCreateOrUpdateOutput =
  typeof SuppressionListAddressesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create Or Update
 *
 * Create or update a SuppressionListAddress.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param emailServiceName - The name of the EmailService resource.
 * @param domainName - The name of the Domains resource.
 * @param suppressionListName - The name of the suppression list.
 * @param addressId - The id of the address in a suppression list.
 */
export const SuppressionListAddressesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SuppressionListAddressesCreateOrUpdateInput,
    outputSchema: SuppressionListAddressesCreateOrUpdateOutput,
  }));
// Input Schema
export const SuppressionListAddressesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    emailServiceName: Schema.String.pipe(T.PathParam()),
    domainName: Schema.String.pipe(T.PathParam()),
    suppressionListName: Schema.String.pipe(T.PathParam()),
    addressId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Communication/emailServices/{emailServiceName}/domains/{domainName}/suppressionLists/{suppressionListName}/suppressionListAddresses/{addressId}",
    }),
  );
export type SuppressionListAddressesDeleteInput =
  typeof SuppressionListAddressesDeleteInput.Type;

// Output Schema
export const SuppressionListAddressesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SuppressionListAddressesDeleteOutput =
  typeof SuppressionListAddressesDeleteOutput.Type;

// The operation
/**
 * Delete
 *
 * Operation to delete a single address from a suppression list.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param emailServiceName - The name of the EmailService resource.
 * @param domainName - The name of the Domains resource.
 * @param suppressionListName - The name of the suppression list.
 * @param addressId - The id of the address in a suppression list.
 */
export const SuppressionListAddressesDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SuppressionListAddressesDeleteInput,
    outputSchema: SuppressionListAddressesDeleteOutput,
  }));
// Input Schema
export const SuppressionListAddressesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    emailServiceName: Schema.String.pipe(T.PathParam()),
    domainName: Schema.String.pipe(T.PathParam()),
    suppressionListName: Schema.String.pipe(T.PathParam()),
    addressId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Communication/emailServices/{emailServiceName}/domains/{domainName}/suppressionLists/{suppressionListName}/suppressionListAddresses/{addressId}",
    }),
  );
export type SuppressionListAddressesGetInput =
  typeof SuppressionListAddressesGetInput.Type;

// Output Schema
export const SuppressionListAddressesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SuppressionListAddressesGetOutput =
  typeof SuppressionListAddressesGetOutput.Type;

// The operation
/**
 * Get
 *
 * Get a SuppressionListAddress.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param emailServiceName - The name of the EmailService resource.
 * @param domainName - The name of the Domains resource.
 * @param suppressionListName - The name of the suppression list.
 * @param addressId - The id of the address in a suppression list.
 */
export const SuppressionListAddressesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SuppressionListAddressesGetInput,
    outputSchema: SuppressionListAddressesGetOutput,
  }),
);
// Input Schema
export const SuppressionListAddressesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    emailServiceName: Schema.String.pipe(T.PathParam()),
    domainName: Schema.String.pipe(T.PathParam()),
    suppressionListName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Communication/emailServices/{emailServiceName}/domains/{domainName}/suppressionLists/{suppressionListName}/suppressionListAddresses",
    }),
  );
export type SuppressionListAddressesListInput =
  typeof SuppressionListAddressesListInput.Type;

// Output Schema
export const SuppressionListAddressesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type SuppressionListAddressesListOutput =
  typeof SuppressionListAddressesListOutput.Type;

// The operation
/**
 * Get
 *
 * Get all the addresses in a suppression list.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param emailServiceName - The name of the EmailService resource.
 * @param domainName - The name of the Domains resource.
 * @param suppressionListName - The name of the suppression list.
 */
export const SuppressionListAddressesList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SuppressionListAddressesListInput,
    outputSchema: SuppressionListAddressesListOutput,
  }));
// Input Schema
export const SuppressionListsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    emailServiceName: Schema.String.pipe(T.PathParam()),
    domainName: Schema.String.pipe(T.PathParam()),
    suppressionListName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Communication/emailServices/{emailServiceName}/domains/{domainName}/suppressionLists/{suppressionListName}",
    }),
  );
export type SuppressionListsCreateOrUpdateInput =
  typeof SuppressionListsCreateOrUpdateInput.Type;

// Output Schema
export const SuppressionListsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SuppressionListsCreateOrUpdateOutput =
  typeof SuppressionListsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create Or Update
 *
 * Add a new SuppressionList resource under the parent Domains resource or update an existing SuppressionList resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param emailServiceName - The name of the EmailService resource.
 * @param domainName - The name of the Domains resource.
 * @param suppressionListName - The name of the suppression list.
 */
export const SuppressionListsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SuppressionListsCreateOrUpdateInput,
    outputSchema: SuppressionListsCreateOrUpdateOutput,
  }));
// Input Schema
export const SuppressionListsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    emailServiceName: Schema.String.pipe(T.PathParam()),
    domainName: Schema.String.pipe(T.PathParam()),
    suppressionListName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Communication/emailServices/{emailServiceName}/domains/{domainName}/suppressionLists/{suppressionListName}",
    }),
  );
export type SuppressionListsDeleteInput =
  typeof SuppressionListsDeleteInput.Type;

// Output Schema
export const SuppressionListsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SuppressionListsDeleteOutput =
  typeof SuppressionListsDeleteOutput.Type;

// The operation
/**
 * Delete
 *
 * Delete a SuppressionList.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param emailServiceName - The name of the EmailService resource.
 * @param domainName - The name of the Domains resource.
 * @param suppressionListName - The name of the suppression list.
 */
export const SuppressionListsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SuppressionListsDeleteInput,
    outputSchema: SuppressionListsDeleteOutput,
  }),
);
// Input Schema
export const SuppressionListsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    emailServiceName: Schema.String.pipe(T.PathParam()),
    domainName: Schema.String.pipe(T.PathParam()),
    suppressionListName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Communication/emailServices/{emailServiceName}/domains/{domainName}/suppressionLists/{suppressionListName}",
    }),
  );
export type SuppressionListsGetInput = typeof SuppressionListsGetInput.Type;

// Output Schema
export const SuppressionListsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SuppressionListsGetOutput = typeof SuppressionListsGetOutput.Type;

// The operation
/**
 * Get
 *
 * Get a SuppressionList resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param emailServiceName - The name of the EmailService resource.
 * @param domainName - The name of the Domains resource.
 * @param suppressionListName - The name of the suppression list.
 */
export const SuppressionListsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SuppressionListsGetInput,
  outputSchema: SuppressionListsGetOutput,
}));
// Input Schema
export const SuppressionListsListByDomainInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    emailServiceName: Schema.String.pipe(T.PathParam()),
    domainName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Communication/emailServices/{emailServiceName}/domains/{domainName}/suppressionLists",
    }),
  );
export type SuppressionListsListByDomainInput =
  typeof SuppressionListsListByDomainInput.Type;

// Output Schema
export const SuppressionListsListByDomainOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type SuppressionListsListByDomainOutput =
  typeof SuppressionListsListByDomainOutput.Type;

// The operation
/**
 * List
 *
 * List all suppression lists for a domains resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param emailServiceName - The name of the EmailService resource.
 * @param domainName - The name of the Domains resource.
 */
export const SuppressionListsListByDomain =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SuppressionListsListByDomainInput,
    outputSchema: SuppressionListsListByDomainOutput,
  }));
