/**
 * Azure App API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";
import { SensitiveString } from "../sensitive.ts";

// Input Schema
export const AvailableWorkloadProfilesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.App/locations/{location}/availableManagedEnvironmentsWorkloadProfileTypes",
    }),
  );
export type AvailableWorkloadProfilesGetInput =
  typeof AvailableWorkloadProfilesGetInput.Type;

// Output Schema
export const AvailableWorkloadProfilesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type AvailableWorkloadProfilesGetOutput =
  typeof AvailableWorkloadProfilesGetOutput.Type;

// The operation
/**
 * Get available workload profiles by location.
 *
 * Get all available workload profiles for a location.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param location - The name of Azure region.
 * @param api-version - The API version to use for this operation.
 */
export const AvailableWorkloadProfilesGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AvailableWorkloadProfilesGetInput,
    outputSchema: AvailableWorkloadProfilesGetOutput,
  }));
// Input Schema
export const BillingMetersGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  location: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.App/locations/{location}/billingMeters",
  }),
);
export type BillingMetersGetInput = typeof BillingMetersGetInput.Type;

// Output Schema
export const BillingMetersGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    value: Schema.Array(Schema.Struct({})),
  },
);
export type BillingMetersGetOutput = typeof BillingMetersGetOutput.Type;

// The operation
/**
 * Get billing meters by location.
 *
 * Get all billingMeters for a location.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param location - The name of Azure region.
 * @param api-version - The API version to use for this operation.
 */
export const BillingMetersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: BillingMetersGetInput,
  outputSchema: BillingMetersGetOutput,
}));
// Input Schema
export const CertificatesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    environmentName: Schema.String.pipe(T.PathParam()),
    certificateName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    properties: Schema.optional(
      Schema.Struct({
        provisioningState: Schema.optional(
          Schema.Literals([
            "Succeeded",
            "Failed",
            "Canceled",
            "DeleteFailed",
            "Pending",
            "Deleting",
          ]),
        ),
        deploymentErrors: Schema.optional(Schema.String),
        certificateKeyVaultProperties: Schema.optional(
          Schema.Struct({
            identity: Schema.optional(Schema.String),
            keyVaultUrl: Schema.optional(Schema.String),
          }),
        ),
        password: Schema.optional(SensitiveString),
        subjectName: Schema.optional(Schema.String),
        subjectAlternativeNames: Schema.optional(Schema.Array(Schema.String)),
        value: Schema.optional(Schema.String),
        issuer: Schema.optional(Schema.String),
        issueDate: Schema.optional(Schema.String),
        expirationDate: Schema.optional(Schema.String),
        thumbprint: Schema.optional(Schema.String),
        valid: Schema.optional(Schema.Boolean),
        publicKeyHash: Schema.optional(Schema.String),
      }),
    ),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/certificates/{certificateName}",
    }),
  );
export type CertificatesCreateOrUpdateInput =
  typeof CertificatesCreateOrUpdateInput.Type;

// Output Schema
export const CertificatesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type CertificatesCreateOrUpdateOutput =
  typeof CertificatesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or Update a Certificate.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param environmentName - Name of the Managed Environment.
 * @param certificateName - Name of the Certificate.
 * @param api-version - The API version to use for this operation.
 * @param properties - Certificate resource specific properties
 */
export const CertificatesCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CertificatesCreateOrUpdateInput,
    outputSchema: CertificatesCreateOrUpdateOutput,
  }),
);
// Input Schema
export const CertificatesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    environmentName: Schema.String.pipe(T.PathParam()),
    certificateName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/certificates/{certificateName}",
    }),
  );
export type CertificatesDeleteInput = typeof CertificatesDeleteInput.Type;

// Output Schema
export const CertificatesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CertificatesDeleteOutput = typeof CertificatesDeleteOutput.Type;

// The operation
/**
 * Deletes the specified Certificate.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param environmentName - Name of the Managed Environment.
 * @param certificateName - Name of the Certificate.
 * @param api-version - The API version to use for this operation.
 */
export const CertificatesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CertificatesDeleteInput,
  outputSchema: CertificatesDeleteOutput,
}));
// Input Schema
export const CertificatesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  environmentName: Schema.String.pipe(T.PathParam()),
  certificateName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/certificates/{certificateName}",
  }),
);
export type CertificatesGetInput = typeof CertificatesGetInput.Type;

// Output Schema
export const CertificatesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type CertificatesGetOutput = typeof CertificatesGetOutput.Type;

// The operation
/**
 * Get the specified Certificate.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param environmentName - Name of the Managed Environment.
 * @param certificateName - Name of the Certificate.
 * @param api-version - The API version to use for this operation.
 */
export const CertificatesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CertificatesGetInput,
  outputSchema: CertificatesGetOutput,
}));
// Input Schema
export const CertificatesListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  environmentName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/certificates",
  }),
);
export type CertificatesListInput = typeof CertificatesListInput.Type;

// Output Schema
export const CertificatesListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  },
);
export type CertificatesListOutput = typeof CertificatesListOutput.Type;

// The operation
/**
 * Get the Certificates in a given managed environment.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param environmentName - Name of the Managed Environment.
 * @param api-version - The API version to use for this operation.
 */
export const CertificatesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CertificatesListInput,
  outputSchema: CertificatesListOutput,
}));
// Input Schema
export const CertificatesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    environmentName: Schema.String.pipe(T.PathParam()),
    certificateName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/certificates/{certificateName}",
    }),
  );
export type CertificatesUpdateInput = typeof CertificatesUpdateInput.Type;

// Output Schema
export const CertificatesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type CertificatesUpdateOutput = typeof CertificatesUpdateOutput.Type;

// The operation
/**
 * Update properties of a certificate
 *
 * Patches a certificate. Currently only patching of tags is supported
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param environmentName - Name of the Managed Environment.
 * @param certificateName - Name of the Certificate.
 * @param api-version - The API version to use for this operation.
 * @param tags - Application-specific metadata in the form of key-value pairs.
 */
export const CertificatesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CertificatesUpdateInput,
  outputSchema: CertificatesUpdateOutput,
}));
// Input Schema
export const ConnectedEnvironmentsCertificatesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    connectedEnvironmentName: Schema.String.pipe(T.PathParam()),
    certificateName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    properties: Schema.optional(
      Schema.Struct({
        provisioningState: Schema.optional(
          Schema.Literals([
            "Succeeded",
            "Failed",
            "Canceled",
            "DeleteFailed",
            "Pending",
            "Deleting",
          ]),
        ),
        deploymentErrors: Schema.optional(Schema.String),
        certificateKeyVaultProperties: Schema.optional(
          Schema.Struct({
            identity: Schema.optional(Schema.String),
            keyVaultUrl: Schema.optional(Schema.String),
          }),
        ),
        password: Schema.optional(SensitiveString),
        subjectName: Schema.optional(Schema.String),
        subjectAlternativeNames: Schema.optional(Schema.Array(Schema.String)),
        value: Schema.optional(Schema.String),
        issuer: Schema.optional(Schema.String),
        issueDate: Schema.optional(Schema.String),
        expirationDate: Schema.optional(Schema.String),
        thumbprint: Schema.optional(Schema.String),
        valid: Schema.optional(Schema.Boolean),
        publicKeyHash: Schema.optional(Schema.String),
      }),
    ),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/connectedEnvironments/{connectedEnvironmentName}/certificates/{certificateName}",
    }),
  );
export type ConnectedEnvironmentsCertificatesCreateOrUpdateInput =
  typeof ConnectedEnvironmentsCertificatesCreateOrUpdateInput.Type;

// Output Schema
export const ConnectedEnvironmentsCertificatesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ConnectedEnvironmentsCertificatesCreateOrUpdateOutput =
  typeof ConnectedEnvironmentsCertificatesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or Update a Certificate.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param connectedEnvironmentName - Name of the Connected Environment.
 * @param certificateName - Name of the Certificate.
 * @param api-version - The API version to use for this operation.
 * @param properties - Certificate resource specific properties
 */
export const ConnectedEnvironmentsCertificatesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConnectedEnvironmentsCertificatesCreateOrUpdateInput,
    outputSchema: ConnectedEnvironmentsCertificatesCreateOrUpdateOutput,
  }));
// Input Schema
export const ConnectedEnvironmentsCertificatesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    connectedEnvironmentName: Schema.String.pipe(T.PathParam()),
    certificateName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/connectedEnvironments/{connectedEnvironmentName}/certificates/{certificateName}",
    }),
  );
export type ConnectedEnvironmentsCertificatesDeleteInput =
  typeof ConnectedEnvironmentsCertificatesDeleteInput.Type;

// Output Schema
export const ConnectedEnvironmentsCertificatesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ConnectedEnvironmentsCertificatesDeleteOutput =
  typeof ConnectedEnvironmentsCertificatesDeleteOutput.Type;

// The operation
/**
 * Deletes the specified Certificate.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param connectedEnvironmentName - Name of the Connected Environment.
 * @param certificateName - Name of the Certificate.
 * @param api-version - The API version to use for this operation.
 */
export const ConnectedEnvironmentsCertificatesDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConnectedEnvironmentsCertificatesDeleteInput,
    outputSchema: ConnectedEnvironmentsCertificatesDeleteOutput,
  }));
// Input Schema
export const ConnectedEnvironmentsCertificatesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    connectedEnvironmentName: Schema.String.pipe(T.PathParam()),
    certificateName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/connectedEnvironments/{connectedEnvironmentName}/certificates/{certificateName}",
    }),
  );
export type ConnectedEnvironmentsCertificatesGetInput =
  typeof ConnectedEnvironmentsCertificatesGetInput.Type;

// Output Schema
export const ConnectedEnvironmentsCertificatesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ConnectedEnvironmentsCertificatesGetOutput =
  typeof ConnectedEnvironmentsCertificatesGetOutput.Type;

// The operation
/**
 * Get the specified Certificate.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param connectedEnvironmentName - Name of the Connected Environment.
 * @param certificateName - Name of the Certificate.
 * @param api-version - The API version to use for this operation.
 */
export const ConnectedEnvironmentsCertificatesGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConnectedEnvironmentsCertificatesGetInput,
    outputSchema: ConnectedEnvironmentsCertificatesGetOutput,
  }));
// Input Schema
export const ConnectedEnvironmentsCertificatesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    connectedEnvironmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/connectedEnvironments/{connectedEnvironmentName}/certificates",
    }),
  );
export type ConnectedEnvironmentsCertificatesListInput =
  typeof ConnectedEnvironmentsCertificatesListInput.Type;

// Output Schema
export const ConnectedEnvironmentsCertificatesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ConnectedEnvironmentsCertificatesListOutput =
  typeof ConnectedEnvironmentsCertificatesListOutput.Type;

// The operation
/**
 * Get the Certificates in a given connected environment.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param connectedEnvironmentName - Name of the Connected Environment.
 * @param api-version - The API version to use for this operation.
 */
export const ConnectedEnvironmentsCertificatesList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConnectedEnvironmentsCertificatesListInput,
    outputSchema: ConnectedEnvironmentsCertificatesListOutput,
  }));
// Input Schema
export const ConnectedEnvironmentsCertificatesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    connectedEnvironmentName: Schema.String.pipe(T.PathParam()),
    certificateName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/connectedEnvironments/{connectedEnvironmentName}/certificates/{certificateName}",
    }),
  );
export type ConnectedEnvironmentsCertificatesUpdateInput =
  typeof ConnectedEnvironmentsCertificatesUpdateInput.Type;

// Output Schema
export const ConnectedEnvironmentsCertificatesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ConnectedEnvironmentsCertificatesUpdateOutput =
  typeof ConnectedEnvironmentsCertificatesUpdateOutput.Type;

// The operation
/**
 * Update properties of a certificate
 *
 * Patches a certificate. Currently only patching of tags is supported
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param connectedEnvironmentName - Name of the Connected Environment.
 * @param certificateName - Name of the Certificate.
 * @param api-version - The API version to use for this operation.
 * @param tags - Application-specific metadata in the form of key-value pairs.
 */
export const ConnectedEnvironmentsCertificatesUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConnectedEnvironmentsCertificatesUpdateInput,
    outputSchema: ConnectedEnvironmentsCertificatesUpdateOutput,
  }));
// Input Schema
export const ConnectedEnvironmentsCheckNameAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    connectedEnvironmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/connectedEnvironments/{connectedEnvironmentName}/checkNameAvailability",
    }),
  );
export type ConnectedEnvironmentsCheckNameAvailabilityInput =
  typeof ConnectedEnvironmentsCheckNameAvailabilityInput.Type;

// Output Schema
export const ConnectedEnvironmentsCheckNameAvailabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nameAvailable: Schema.optional(Schema.Boolean),
    reason: Schema.optional(Schema.Literals(["Invalid", "AlreadyExists"])),
    message: Schema.optional(Schema.String),
  });
export type ConnectedEnvironmentsCheckNameAvailabilityOutput =
  typeof ConnectedEnvironmentsCheckNameAvailabilityOutput.Type;

// The operation
/**
 * Checks the resource connectedEnvironmentName availability.
 *
 * Checks if resource connectedEnvironmentName is available.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param connectedEnvironmentName - Name of the Managed Environment.
 * @param api-version - The API version to use for this operation.
 * @param name - The name of the resource for which availability needs to be checked.
 * @param type - The resource type.
 */
export const ConnectedEnvironmentsCheckNameAvailability =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConnectedEnvironmentsCheckNameAvailabilityInput,
    outputSchema: ConnectedEnvironmentsCheckNameAvailabilityOutput,
  }));
// Input Schema
export const ConnectedEnvironmentsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    connectedEnvironmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/connectedEnvironments/{connectedEnvironmentName}",
    }),
  );
export type ConnectedEnvironmentsCreateOrUpdateInput =
  typeof ConnectedEnvironmentsCreateOrUpdateInput.Type;

// Output Schema
export const ConnectedEnvironmentsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ConnectedEnvironmentsCreateOrUpdateOutput =
  typeof ConnectedEnvironmentsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates an connectedEnvironment.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param connectedEnvironmentName - Name of the connectedEnvironment.
 * @param api-version - The API version to use for this operation.
 */
export const ConnectedEnvironmentsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConnectedEnvironmentsCreateOrUpdateInput,
    outputSchema: ConnectedEnvironmentsCreateOrUpdateOutput,
  }));
// Input Schema
export const ConnectedEnvironmentsDaprComponentsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    connectedEnvironmentName: Schema.String.pipe(T.PathParam()),
    componentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    properties: Schema.optional(
      Schema.Struct({
        componentType: Schema.optional(Schema.String),
        version: Schema.optional(Schema.String),
        ignoreErrors: Schema.optional(Schema.Boolean),
        initTimeout: Schema.optional(Schema.String),
        secrets: Schema.optional(
          Schema.Array(
            Schema.Struct({
              name: Schema.optional(Schema.String),
              value: Schema.optional(Schema.String),
              identity: Schema.optional(Schema.String),
              keyVaultUrl: Schema.optional(Schema.String),
            }),
          ),
        ),
        secretStoreComponent: Schema.optional(Schema.String),
        metadata: Schema.optional(
          Schema.Array(
            Schema.Struct({
              name: Schema.optional(Schema.String),
              value: Schema.optional(Schema.String),
              secretRef: Schema.optional(Schema.String),
            }),
          ),
        ),
        scopes: Schema.optional(Schema.Array(Schema.String)),
        provisioningState: Schema.optional(
          Schema.Literals([
            "Succeeded",
            "Failed",
            "Canceled",
            "InProgress",
            "Deleting",
          ]),
        ),
        deploymentErrors: Schema.optional(Schema.String),
      }),
    ),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/connectedEnvironments/{connectedEnvironmentName}/daprComponents/{componentName}",
    }),
  );
export type ConnectedEnvironmentsDaprComponentsCreateOrUpdateInput =
  typeof ConnectedEnvironmentsDaprComponentsCreateOrUpdateInput.Type;

// Output Schema
export const ConnectedEnvironmentsDaprComponentsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ConnectedEnvironmentsDaprComponentsCreateOrUpdateOutput =
  typeof ConnectedEnvironmentsDaprComponentsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a Dapr Component.
 *
 * Creates or updates a Dapr Component in a connected environment.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param connectedEnvironmentName - Name of the connected environment.
 * @param componentName - Name of the Dapr Component.
 * @param api-version - The API version to use for this operation.
 * @param properties - Dapr Component resource specific properties
 */
export const ConnectedEnvironmentsDaprComponentsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConnectedEnvironmentsDaprComponentsCreateOrUpdateInput,
    outputSchema: ConnectedEnvironmentsDaprComponentsCreateOrUpdateOutput,
  }));
// Input Schema
export const ConnectedEnvironmentsDaprComponentsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    connectedEnvironmentName: Schema.String.pipe(T.PathParam()),
    componentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/connectedEnvironments/{connectedEnvironmentName}/daprComponents/{componentName}",
    }),
  );
export type ConnectedEnvironmentsDaprComponentsDeleteInput =
  typeof ConnectedEnvironmentsDaprComponentsDeleteInput.Type;

// Output Schema
export const ConnectedEnvironmentsDaprComponentsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ConnectedEnvironmentsDaprComponentsDeleteOutput =
  typeof ConnectedEnvironmentsDaprComponentsDeleteOutput.Type;

// The operation
/**
 * Delete a Dapr Component.
 *
 * Delete a Dapr Component from a connected environment.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param connectedEnvironmentName - Name of the connected environment.
 * @param componentName - Name of the Dapr Component.
 * @param api-version - The API version to use for this operation.
 */
export const ConnectedEnvironmentsDaprComponentsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConnectedEnvironmentsDaprComponentsDeleteInput,
    outputSchema: ConnectedEnvironmentsDaprComponentsDeleteOutput,
  }));
// Input Schema
export const ConnectedEnvironmentsDaprComponentsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    connectedEnvironmentName: Schema.String.pipe(T.PathParam()),
    componentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/connectedEnvironments/{connectedEnvironmentName}/daprComponents/{componentName}",
    }),
  );
export type ConnectedEnvironmentsDaprComponentsGetInput =
  typeof ConnectedEnvironmentsDaprComponentsGetInput.Type;

// Output Schema
export const ConnectedEnvironmentsDaprComponentsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ConnectedEnvironmentsDaprComponentsGetOutput =
  typeof ConnectedEnvironmentsDaprComponentsGetOutput.Type;

// The operation
/**
 * Get a dapr component.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param connectedEnvironmentName - Name of the connected environment.
 * @param componentName - Name of the Dapr Component.
 * @param api-version - The API version to use for this operation.
 */
export const ConnectedEnvironmentsDaprComponentsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConnectedEnvironmentsDaprComponentsGetInput,
    outputSchema: ConnectedEnvironmentsDaprComponentsGetOutput,
  }));
// Input Schema
export const ConnectedEnvironmentsDaprComponentsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    connectedEnvironmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/connectedEnvironments/{connectedEnvironmentName}/daprComponents",
    }),
  );
export type ConnectedEnvironmentsDaprComponentsListInput =
  typeof ConnectedEnvironmentsDaprComponentsListInput.Type;

// Output Schema
export const ConnectedEnvironmentsDaprComponentsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type ConnectedEnvironmentsDaprComponentsListOutput =
  typeof ConnectedEnvironmentsDaprComponentsListOutput.Type;

// The operation
/**
 * Get the Dapr Components for a connected environment.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param connectedEnvironmentName - Name of the connected environment.
 * @param api-version - The API version to use for this operation.
 */
export const ConnectedEnvironmentsDaprComponentsList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConnectedEnvironmentsDaprComponentsListInput,
    outputSchema: ConnectedEnvironmentsDaprComponentsListOutput,
  }));
// Input Schema
export const ConnectedEnvironmentsDaprComponentsListSecretsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    connectedEnvironmentName: Schema.String.pipe(T.PathParam()),
    componentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/connectedEnvironments/{connectedEnvironmentName}/daprComponents/{componentName}/listSecrets",
    }),
  );
export type ConnectedEnvironmentsDaprComponentsListSecretsInput =
  typeof ConnectedEnvironmentsDaprComponentsListSecretsInput.Type;

// Output Schema
export const ConnectedEnvironmentsDaprComponentsListSecretsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        name: Schema.optional(Schema.String),
        value: Schema.optional(Schema.String),
      }),
    ),
  });
export type ConnectedEnvironmentsDaprComponentsListSecretsOutput =
  typeof ConnectedEnvironmentsDaprComponentsListSecretsOutput.Type;

// The operation
/**
 * List secrets for a dapr component
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param connectedEnvironmentName - Name of the connected environment.
 * @param componentName - Name of the Dapr Component.
 * @param api-version - The API version to use for this operation.
 */
export const ConnectedEnvironmentsDaprComponentsListSecrets =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConnectedEnvironmentsDaprComponentsListSecretsInput,
    outputSchema: ConnectedEnvironmentsDaprComponentsListSecretsOutput,
  }));
// Input Schema
export const ConnectedEnvironmentsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    connectedEnvironmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/connectedEnvironments/{connectedEnvironmentName}",
    }),
  );
export type ConnectedEnvironmentsDeleteInput =
  typeof ConnectedEnvironmentsDeleteInput.Type;

// Output Schema
export const ConnectedEnvironmentsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ConnectedEnvironmentsDeleteOutput =
  typeof ConnectedEnvironmentsDeleteOutput.Type;

// The operation
/**
 * Delete an connectedEnvironment.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param connectedEnvironmentName - Name of the connectedEnvironment.
 * @param api-version - The API version to use for this operation.
 */
export const ConnectedEnvironmentsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ConnectedEnvironmentsDeleteInput,
    outputSchema: ConnectedEnvironmentsDeleteOutput,
  }),
);
// Input Schema
export const ConnectedEnvironmentsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    connectedEnvironmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/connectedEnvironments/{connectedEnvironmentName}",
    }),
  );
export type ConnectedEnvironmentsGetInput =
  typeof ConnectedEnvironmentsGetInput.Type;

// Output Schema
export const ConnectedEnvironmentsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ConnectedEnvironmentsGetOutput =
  typeof ConnectedEnvironmentsGetOutput.Type;

// The operation
/**
 * Get the properties of an connectedEnvironment.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param connectedEnvironmentName - Name of the connectedEnvironment.
 * @param api-version - The API version to use for this operation.
 */
export const ConnectedEnvironmentsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ConnectedEnvironmentsGetInput,
    outputSchema: ConnectedEnvironmentsGetOutput,
  }),
);
// Input Schema
export const ConnectedEnvironmentsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/connectedEnvironments",
    }),
  );
export type ConnectedEnvironmentsListByResourceGroupInput =
  typeof ConnectedEnvironmentsListByResourceGroupInput.Type;

// Output Schema
export const ConnectedEnvironmentsListByResourceGroupOutput =
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
export type ConnectedEnvironmentsListByResourceGroupOutput =
  typeof ConnectedEnvironmentsListByResourceGroupOutput.Type;

// The operation
/**
 * Get all connectedEnvironments in a resource group.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const ConnectedEnvironmentsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConnectedEnvironmentsListByResourceGroupInput,
    outputSchema: ConnectedEnvironmentsListByResourceGroupOutput,
  }));
// Input Schema
export const ConnectedEnvironmentsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.App/connectedEnvironments",
    }),
  );
export type ConnectedEnvironmentsListBySubscriptionInput =
  typeof ConnectedEnvironmentsListBySubscriptionInput.Type;

// Output Schema
export const ConnectedEnvironmentsListBySubscriptionOutput =
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
export type ConnectedEnvironmentsListBySubscriptionOutput =
  typeof ConnectedEnvironmentsListBySubscriptionOutput.Type;

// The operation
/**
 * Get all connectedEnvironments for a subscription.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const ConnectedEnvironmentsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConnectedEnvironmentsListBySubscriptionInput,
    outputSchema: ConnectedEnvironmentsListBySubscriptionOutput,
  }));
// Input Schema
export const ConnectedEnvironmentsStoragesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    connectedEnvironmentName: Schema.String.pipe(T.PathParam()),
    storageName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/connectedEnvironments/{connectedEnvironmentName}/storages/{storageName}",
    }),
  );
export type ConnectedEnvironmentsStoragesCreateOrUpdateInput =
  typeof ConnectedEnvironmentsStoragesCreateOrUpdateInput.Type;

// Output Schema
export const ConnectedEnvironmentsStoragesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ConnectedEnvironmentsStoragesCreateOrUpdateOutput =
  typeof ConnectedEnvironmentsStoragesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update storage for a connectedEnvironment.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param connectedEnvironmentName - Name of the Environment.
 * @param storageName - Name of the storage.
 * @param api-version - The API version to use for this operation.
 */
export const ConnectedEnvironmentsStoragesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConnectedEnvironmentsStoragesCreateOrUpdateInput,
    outputSchema: ConnectedEnvironmentsStoragesCreateOrUpdateOutput,
  }));
// Input Schema
export const ConnectedEnvironmentsStoragesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    connectedEnvironmentName: Schema.String.pipe(T.PathParam()),
    storageName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/connectedEnvironments/{connectedEnvironmentName}/storages/{storageName}",
    }),
  );
export type ConnectedEnvironmentsStoragesDeleteInput =
  typeof ConnectedEnvironmentsStoragesDeleteInput.Type;

// Output Schema
export const ConnectedEnvironmentsStoragesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ConnectedEnvironmentsStoragesDeleteOutput =
  typeof ConnectedEnvironmentsStoragesDeleteOutput.Type;

// The operation
/**
 * Delete storage for a connectedEnvironment.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param connectedEnvironmentName - Name of the Environment.
 * @param storageName - Name of the storage.
 * @param api-version - The API version to use for this operation.
 */
export const ConnectedEnvironmentsStoragesDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConnectedEnvironmentsStoragesDeleteInput,
    outputSchema: ConnectedEnvironmentsStoragesDeleteOutput,
  }));
// Input Schema
export const ConnectedEnvironmentsStoragesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    connectedEnvironmentName: Schema.String.pipe(T.PathParam()),
    storageName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/connectedEnvironments/{connectedEnvironmentName}/storages/{storageName}",
    }),
  );
export type ConnectedEnvironmentsStoragesGetInput =
  typeof ConnectedEnvironmentsStoragesGetInput.Type;

// Output Schema
export const ConnectedEnvironmentsStoragesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ConnectedEnvironmentsStoragesGetOutput =
  typeof ConnectedEnvironmentsStoragesGetOutput.Type;

// The operation
/**
 * Get storage for a connectedEnvironment.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param connectedEnvironmentName - Name of the Environment.
 * @param storageName - Name of the storage.
 * @param api-version - The API version to use for this operation.
 */
export const ConnectedEnvironmentsStoragesGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConnectedEnvironmentsStoragesGetInput,
    outputSchema: ConnectedEnvironmentsStoragesGetOutput,
  }));
// Input Schema
export const ConnectedEnvironmentsStoragesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    connectedEnvironmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/connectedEnvironments/{connectedEnvironmentName}/storages",
    }),
  );
export type ConnectedEnvironmentsStoragesListInput =
  typeof ConnectedEnvironmentsStoragesListInput.Type;

// Output Schema
export const ConnectedEnvironmentsStoragesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
  });
export type ConnectedEnvironmentsStoragesListOutput =
  typeof ConnectedEnvironmentsStoragesListOutput.Type;

// The operation
/**
 * Get all storages for a connectedEnvironment.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param connectedEnvironmentName - Name of the Environment.
 * @param api-version - The API version to use for this operation.
 */
export const ConnectedEnvironmentsStoragesList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConnectedEnvironmentsStoragesListInput,
    outputSchema: ConnectedEnvironmentsStoragesListOutput,
  }));
// Input Schema
export const ConnectedEnvironmentsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    connectedEnvironmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/connectedEnvironments/{connectedEnvironmentName}",
    }),
  );
export type ConnectedEnvironmentsUpdateInput =
  typeof ConnectedEnvironmentsUpdateInput.Type;

// Output Schema
export const ConnectedEnvironmentsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ConnectedEnvironmentsUpdateOutput =
  typeof ConnectedEnvironmentsUpdateOutput.Type;

// The operation
/**
 * Update connected Environment's properties.
 *
 * Patches a Managed Environment. Only patching of tags is supported currently
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param connectedEnvironmentName - Name of the connectedEnvironment.
 * @param api-version - The API version to use for this operation.
 */
export const ConnectedEnvironmentsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ConnectedEnvironmentsUpdateInput,
    outputSchema: ConnectedEnvironmentsUpdateOutput,
  }),
);
// Input Schema
export const ContainerAppsAuthConfigsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    containerAppName: Schema.String.pipe(T.PathParam()),
    authConfigName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/authConfigs/{authConfigName}",
    }),
  );
export type ContainerAppsAuthConfigsCreateOrUpdateInput =
  typeof ContainerAppsAuthConfigsCreateOrUpdateInput.Type;

// Output Schema
export const ContainerAppsAuthConfigsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ContainerAppsAuthConfigsCreateOrUpdateOutput =
  typeof ContainerAppsAuthConfigsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update the AuthConfig for a Container App.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param containerAppName - Name of the Container App.
 * @param authConfigName - Name of the Container App AuthConfig.
 * @param api-version - The API version to use for this operation.
 */
export const ContainerAppsAuthConfigsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ContainerAppsAuthConfigsCreateOrUpdateInput,
    outputSchema: ContainerAppsAuthConfigsCreateOrUpdateOutput,
  }));
// Input Schema
export const ContainerAppsAuthConfigsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    containerAppName: Schema.String.pipe(T.PathParam()),
    authConfigName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/authConfigs/{authConfigName}",
    }),
  );
export type ContainerAppsAuthConfigsDeleteInput =
  typeof ContainerAppsAuthConfigsDeleteInput.Type;

// Output Schema
export const ContainerAppsAuthConfigsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ContainerAppsAuthConfigsDeleteOutput =
  typeof ContainerAppsAuthConfigsDeleteOutput.Type;

// The operation
/**
 * Delete a Container App AuthConfig.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param containerAppName - Name of the Container App.
 * @param authConfigName - Name of the Container App AuthConfig.
 * @param api-version - The API version to use for this operation.
 */
export const ContainerAppsAuthConfigsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ContainerAppsAuthConfigsDeleteInput,
    outputSchema: ContainerAppsAuthConfigsDeleteOutput,
  }));
// Input Schema
export const ContainerAppsAuthConfigsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    containerAppName: Schema.String.pipe(T.PathParam()),
    authConfigName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/authConfigs/{authConfigName}",
    }),
  );
export type ContainerAppsAuthConfigsGetInput =
  typeof ContainerAppsAuthConfigsGetInput.Type;

// Output Schema
export const ContainerAppsAuthConfigsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ContainerAppsAuthConfigsGetOutput =
  typeof ContainerAppsAuthConfigsGetOutput.Type;

// The operation
/**
 * Get a AuthConfig of a Container App.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param containerAppName - Name of the Container App.
 * @param authConfigName - Name of the Container App AuthConfig.
 * @param api-version - The API version to use for this operation.
 */
export const ContainerAppsAuthConfigsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ContainerAppsAuthConfigsGetInput,
    outputSchema: ContainerAppsAuthConfigsGetOutput,
  }),
);
// Input Schema
export const ContainerAppsAuthConfigsListByContainerAppInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    containerAppName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/authConfigs",
    }),
  );
export type ContainerAppsAuthConfigsListByContainerAppInput =
  typeof ContainerAppsAuthConfigsListByContainerAppInput.Type;

// Output Schema
export const ContainerAppsAuthConfigsListByContainerAppOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type ContainerAppsAuthConfigsListByContainerAppOutput =
  typeof ContainerAppsAuthConfigsListByContainerAppOutput.Type;

// The operation
/**
 * Get the Container App AuthConfigs in a given resource group.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param containerAppName - Name of the Container App.
 * @param api-version - The API version to use for this operation.
 */
export const ContainerAppsAuthConfigsListByContainerApp =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ContainerAppsAuthConfigsListByContainerAppInput,
    outputSchema: ContainerAppsAuthConfigsListByContainerAppOutput,
  }));
// Input Schema
export const ContainerAppsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    containerAppName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}",
    }),
  );
export type ContainerAppsCreateOrUpdateInput =
  typeof ContainerAppsCreateOrUpdateInput.Type;

// Output Schema
export const ContainerAppsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ContainerAppsCreateOrUpdateOutput =
  typeof ContainerAppsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a Container App.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param containerAppName - Name of the Container App.
 * @param api-version - The API version to use for this operation.
 */
export const ContainerAppsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ContainerAppsCreateOrUpdateInput,
    outputSchema: ContainerAppsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const ContainerAppsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    containerAppName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}",
    }),
  );
export type ContainerAppsDeleteInput = typeof ContainerAppsDeleteInput.Type;

// Output Schema
export const ContainerAppsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ContainerAppsDeleteOutput = typeof ContainerAppsDeleteOutput.Type;

// The operation
/**
 * Delete a Container App.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param containerAppName - Name of the Container App.
 * @param api-version - The API version to use for this operation.
 */
export const ContainerAppsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ContainerAppsDeleteInput,
  outputSchema: ContainerAppsDeleteOutput,
}));
// Input Schema
export const ContainerAppsDiagnosticsGetDetectorInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    containerAppName: Schema.String.pipe(T.PathParam()),
    detectorName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/detectors/{detectorName}",
    }),
  );
export type ContainerAppsDiagnosticsGetDetectorInput =
  typeof ContainerAppsDiagnosticsGetDetectorInput.Type;

// Output Schema
export const ContainerAppsDiagnosticsGetDetectorOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ContainerAppsDiagnosticsGetDetectorOutput =
  typeof ContainerAppsDiagnosticsGetDetectorOutput.Type;

// The operation
/**
 * Get a diagnostics result of a Container App.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param containerAppName - Name of the Container App.
 * @param detectorName - Name of the Container App Detector.
 * @param api-version - The API version to use for this operation.
 */
export const ContainerAppsDiagnosticsGetDetector =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ContainerAppsDiagnosticsGetDetectorInput,
    outputSchema: ContainerAppsDiagnosticsGetDetectorOutput,
  }));
// Input Schema
export const ContainerAppsDiagnosticsGetRevisionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    containerAppName: Schema.String.pipe(T.PathParam()),
    revisionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/detectorProperties/revisionsApi/revisions/{revisionName}",
    }),
  );
export type ContainerAppsDiagnosticsGetRevisionInput =
  typeof ContainerAppsDiagnosticsGetRevisionInput.Type;

// Output Schema
export const ContainerAppsDiagnosticsGetRevisionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ContainerAppsDiagnosticsGetRevisionOutput =
  typeof ContainerAppsDiagnosticsGetRevisionOutput.Type;

// The operation
/**
 * Get a revision of a Container App.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param containerAppName - Name of the Container App.
 * @param revisionName - Name of the Container App Revision.
 * @param api-version - The API version to use for this operation.
 */
export const ContainerAppsDiagnosticsGetRevision =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ContainerAppsDiagnosticsGetRevisionInput,
    outputSchema: ContainerAppsDiagnosticsGetRevisionOutput,
  }));
// Input Schema
export const ContainerAppsDiagnosticsGetRootInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    containerAppName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/detectorProperties/rootApi/",
    }),
  );
export type ContainerAppsDiagnosticsGetRootInput =
  typeof ContainerAppsDiagnosticsGetRootInput.Type;

// Output Schema
export const ContainerAppsDiagnosticsGetRootOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ContainerAppsDiagnosticsGetRootOutput =
  typeof ContainerAppsDiagnosticsGetRootOutput.Type;

// The operation
/**
 * Get the properties of a Container App.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param containerAppName - Name of the Container App.
 * @param api-version - The API version to use for this operation.
 */
export const ContainerAppsDiagnosticsGetRoot =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ContainerAppsDiagnosticsGetRootInput,
    outputSchema: ContainerAppsDiagnosticsGetRootOutput,
  }));
// Input Schema
export const ContainerAppsDiagnosticsListDetectorsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    containerAppName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/detectors",
    }),
  );
export type ContainerAppsDiagnosticsListDetectorsInput =
  typeof ContainerAppsDiagnosticsListDetectorsInput.Type;

// Output Schema
export const ContainerAppsDiagnosticsListDetectorsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type ContainerAppsDiagnosticsListDetectorsOutput =
  typeof ContainerAppsDiagnosticsListDetectorsOutput.Type;

// The operation
/**
 * Get the list of diagnostics for a given Container App.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param containerAppName - Name of the Container App for which detector info is needed.
 * @param api-version - The API version to use for this operation.
 */
export const ContainerAppsDiagnosticsListDetectors =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ContainerAppsDiagnosticsListDetectorsInput,
    outputSchema: ContainerAppsDiagnosticsListDetectorsOutput,
  }));
// Input Schema
export const ContainerAppsDiagnosticsListRevisionsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    containerAppName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $filter: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/detectorProperties/revisionsApi/revisions/",
    }),
  );
export type ContainerAppsDiagnosticsListRevisionsInput =
  typeof ContainerAppsDiagnosticsListRevisionsInput.Type;

// Output Schema
export const ContainerAppsDiagnosticsListRevisionsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type ContainerAppsDiagnosticsListRevisionsOutput =
  typeof ContainerAppsDiagnosticsListRevisionsOutput.Type;

// The operation
/**
 * Get the Revisions for a given Container App.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param containerAppName - Name of the Container App for which Revisions are needed.
 * @param api-version - The API version to use for this operation.
 * @param $filter - The filter to apply on the operation.
 */
export const ContainerAppsDiagnosticsListRevisions =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ContainerAppsDiagnosticsListRevisionsInput,
    outputSchema: ContainerAppsDiagnosticsListRevisionsOutput,
  }));
// Input Schema
export const ContainerAppsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  containerAppName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}",
  }),
);
export type ContainerAppsGetInput = typeof ContainerAppsGetInput.Type;

// Output Schema
export const ContainerAppsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  },
);
export type ContainerAppsGetOutput = typeof ContainerAppsGetOutput.Type;

// The operation
/**
 * Get the properties of a Container App.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param containerAppName - Name of the Container App.
 * @param api-version - The API version to use for this operation.
 */
export const ContainerAppsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ContainerAppsGetInput,
  outputSchema: ContainerAppsGetOutput,
}));
// Input Schema
export const ContainerAppsGetAuthTokenInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    containerAppName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/getAuthtoken",
    }),
  );
export type ContainerAppsGetAuthTokenInput =
  typeof ContainerAppsGetAuthTokenInput.Type;

// Output Schema
export const ContainerAppsGetAuthTokenOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ContainerAppsGetAuthTokenOutput =
  typeof ContainerAppsGetAuthTokenOutput.Type;

// The operation
/**
 * Get auth token for a container app
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param containerAppName - Name of the Container App.
 */
export const ContainerAppsGetAuthToken = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ContainerAppsGetAuthTokenInput,
    outputSchema: ContainerAppsGetAuthTokenOutput,
  }),
);
// Input Schema
export const ContainerAppsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps",
    }),
  );
export type ContainerAppsListByResourceGroupInput =
  typeof ContainerAppsListByResourceGroupInput.Type;

// Output Schema
export const ContainerAppsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ContainerAppsListByResourceGroupOutput =
  typeof ContainerAppsListByResourceGroupOutput.Type;

// The operation
/**
 * Get the Container Apps in a given resource group.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const ContainerAppsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ContainerAppsListByResourceGroupInput,
    outputSchema: ContainerAppsListByResourceGroupOutput,
  }));
// Input Schema
export const ContainerAppsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.App/containerApps",
    }),
  );
export type ContainerAppsListBySubscriptionInput =
  typeof ContainerAppsListBySubscriptionInput.Type;

// Output Schema
export const ContainerAppsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ContainerAppsListBySubscriptionOutput =
  typeof ContainerAppsListBySubscriptionOutput.Type;

// The operation
/**
 * Get the Container Apps in a given subscription.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const ContainerAppsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ContainerAppsListBySubscriptionInput,
    outputSchema: ContainerAppsListBySubscriptionOutput,
  }));
// Input Schema
export const ContainerAppsListCustomHostNameAnalysisInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    containerAppName: Schema.String.pipe(T.PathParam()),
    customHostname: Schema.optional(Schema.String),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/listCustomHostNameAnalysis",
    }),
  );
export type ContainerAppsListCustomHostNameAnalysisInput =
  typeof ContainerAppsListCustomHostNameAnalysisInput.Type;

// Output Schema
export const ContainerAppsListCustomHostNameAnalysisOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    hostName: Schema.optional(Schema.String),
    isHostnameAlreadyVerified: Schema.optional(Schema.Boolean),
    customDomainVerificationTest: Schema.optional(
      Schema.Literals(["Passed", "Failed", "Skipped"]),
    ),
    customDomainVerificationFailureInfo: Schema.optional(
      Schema.Struct({
        code: Schema.optional(Schema.String),
        message: Schema.optional(Schema.String),
        target: Schema.optional(Schema.String),
        details: Schema.optional(
          Schema.Array(
            Schema.Struct({
              code: Schema.optional(Schema.String),
              message: Schema.optional(Schema.String),
              target: Schema.optional(Schema.String),
            }),
          ),
        ),
      }),
    ),
    hasConflictOnManagedEnvironment: Schema.optional(Schema.Boolean),
    conflictWithEnvironmentCustomDomain: Schema.optional(Schema.Boolean),
    conflictingContainerAppResourceId: Schema.optional(Schema.String),
    cNameRecords: Schema.optional(Schema.Array(Schema.String)),
    txtRecords: Schema.optional(Schema.Array(Schema.String)),
    aRecords: Schema.optional(Schema.Array(Schema.String)),
    alternateCNameRecords: Schema.optional(Schema.Array(Schema.String)),
    alternateTxtRecords: Schema.optional(Schema.Array(Schema.String)),
  });
export type ContainerAppsListCustomHostNameAnalysisOutput =
  typeof ContainerAppsListCustomHostNameAnalysisOutput.Type;

// The operation
/**
 * Analyzes a custom hostname for a Container App
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param containerAppName - Name of the Container App.
 * @param customHostname - Custom hostname.
 * @param api-version - The API version to use for this operation.
 */
export const ContainerAppsListCustomHostNameAnalysis =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ContainerAppsListCustomHostNameAnalysisInput,
    outputSchema: ContainerAppsListCustomHostNameAnalysisOutput,
  }));
// Input Schema
export const ContainerAppsListSecretsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    containerAppName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/listSecrets",
    }),
  );
export type ContainerAppsListSecretsInput =
  typeof ContainerAppsListSecretsInput.Type;

// Output Schema
export const ContainerAppsListSecretsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        name: Schema.optional(Schema.String),
        value: Schema.optional(Schema.String),
        identity: Schema.optional(Schema.String),
        keyVaultUrl: Schema.optional(Schema.String),
      }),
    ),
  });
export type ContainerAppsListSecretsOutput =
  typeof ContainerAppsListSecretsOutput.Type;

// The operation
/**
 * List secrets for a container app
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param containerAppName - Name of the Container App.
 */
export const ContainerAppsListSecrets = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ContainerAppsListSecretsInput,
    outputSchema: ContainerAppsListSecretsOutput,
  }),
);
// Input Schema
export const ContainerAppsRevisionReplicasGetReplicaInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    containerAppName: Schema.String.pipe(T.PathParam()),
    revisionName: Schema.String.pipe(T.PathParam()),
    replicaName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/revisions/{revisionName}/replicas/{replicaName}",
    }),
  );
export type ContainerAppsRevisionReplicasGetReplicaInput =
  typeof ContainerAppsRevisionReplicasGetReplicaInput.Type;

// Output Schema
export const ContainerAppsRevisionReplicasGetReplicaOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ContainerAppsRevisionReplicasGetReplicaOutput =
  typeof ContainerAppsRevisionReplicasGetReplicaOutput.Type;

// The operation
/**
 * Get a replica for a Container App Revision.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param containerAppName - Name of the Container App.
 * @param revisionName - Name of the Container App Revision.
 * @param replicaName - Name of the Container App Revision Replica.
 * @param api-version - The API version to use for this operation.
 */
export const ContainerAppsRevisionReplicasGetReplica =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ContainerAppsRevisionReplicasGetReplicaInput,
    outputSchema: ContainerAppsRevisionReplicasGetReplicaOutput,
  }));
// Input Schema
export const ContainerAppsRevisionReplicasListReplicasInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    containerAppName: Schema.String.pipe(T.PathParam()),
    revisionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/revisions/{revisionName}/replicas",
    }),
  );
export type ContainerAppsRevisionReplicasListReplicasInput =
  typeof ContainerAppsRevisionReplicasListReplicasInput.Type;

// Output Schema
export const ContainerAppsRevisionReplicasListReplicasOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
  });
export type ContainerAppsRevisionReplicasListReplicasOutput =
  typeof ContainerAppsRevisionReplicasListReplicasOutput.Type;

// The operation
/**
 * List replicas for a Container App Revision.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param containerAppName - Name of the Container App.
 * @param revisionName - Name of the Container App Revision.
 * @param api-version - The API version to use for this operation.
 */
export const ContainerAppsRevisionReplicasListReplicas =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ContainerAppsRevisionReplicasListReplicasInput,
    outputSchema: ContainerAppsRevisionReplicasListReplicasOutput,
  }));
// Input Schema
export const ContainerAppsRevisionsActivateRevisionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    containerAppName: Schema.String.pipe(T.PathParam()),
    revisionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/revisions/{revisionName}/activate",
    }),
  );
export type ContainerAppsRevisionsActivateRevisionInput =
  typeof ContainerAppsRevisionsActivateRevisionInput.Type;

// Output Schema
export const ContainerAppsRevisionsActivateRevisionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ContainerAppsRevisionsActivateRevisionOutput =
  typeof ContainerAppsRevisionsActivateRevisionOutput.Type;

// The operation
/**
 * Activates a revision for a Container App
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param containerAppName - Name of the Container App.
 * @param revisionName - Name of the Container App Revision.
 * @param api-version - The API version to use for this operation.
 */
export const ContainerAppsRevisionsActivateRevision =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ContainerAppsRevisionsActivateRevisionInput,
    outputSchema: ContainerAppsRevisionsActivateRevisionOutput,
  }));
// Input Schema
export const ContainerAppsRevisionsDeactivateRevisionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    containerAppName: Schema.String.pipe(T.PathParam()),
    revisionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/revisions/{revisionName}/deactivate",
    }),
  );
export type ContainerAppsRevisionsDeactivateRevisionInput =
  typeof ContainerAppsRevisionsDeactivateRevisionInput.Type;

// Output Schema
export const ContainerAppsRevisionsDeactivateRevisionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ContainerAppsRevisionsDeactivateRevisionOutput =
  typeof ContainerAppsRevisionsDeactivateRevisionOutput.Type;

// The operation
/**
 * Deactivates a revision for a Container App
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param containerAppName - Name of the Container App.
 * @param revisionName - Name of the Container App Revision.
 * @param api-version - The API version to use for this operation.
 */
export const ContainerAppsRevisionsDeactivateRevision =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ContainerAppsRevisionsDeactivateRevisionInput,
    outputSchema: ContainerAppsRevisionsDeactivateRevisionOutput,
  }));
// Input Schema
export const ContainerAppsRevisionsGetRevisionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    containerAppName: Schema.String.pipe(T.PathParam()),
    revisionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/revisions/{revisionName}",
    }),
  );
export type ContainerAppsRevisionsGetRevisionInput =
  typeof ContainerAppsRevisionsGetRevisionInput.Type;

// Output Schema
export const ContainerAppsRevisionsGetRevisionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ContainerAppsRevisionsGetRevisionOutput =
  typeof ContainerAppsRevisionsGetRevisionOutput.Type;

// The operation
/**
 * Get a revision of a Container App.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param containerAppName - Name of the Container App.
 * @param revisionName - Name of the Container App Revision.
 * @param api-version - The API version to use for this operation.
 */
export const ContainerAppsRevisionsGetRevision =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ContainerAppsRevisionsGetRevisionInput,
    outputSchema: ContainerAppsRevisionsGetRevisionOutput,
  }));
// Input Schema
export const ContainerAppsRevisionsListRevisionsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    containerAppName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $filter: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/revisions",
    }),
  );
export type ContainerAppsRevisionsListRevisionsInput =
  typeof ContainerAppsRevisionsListRevisionsInput.Type;

// Output Schema
export const ContainerAppsRevisionsListRevisionsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type ContainerAppsRevisionsListRevisionsOutput =
  typeof ContainerAppsRevisionsListRevisionsOutput.Type;

// The operation
/**
 * Get the Revisions for a given Container App.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param containerAppName - Name of the Container App for which Revisions are needed.
 * @param api-version - The API version to use for this operation.
 * @param $filter - The filter to apply on the operation.
 */
export const ContainerAppsRevisionsListRevisions =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ContainerAppsRevisionsListRevisionsInput,
    outputSchema: ContainerAppsRevisionsListRevisionsOutput,
  }));
// Input Schema
export const ContainerAppsRevisionsRestartRevisionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    containerAppName: Schema.String.pipe(T.PathParam()),
    revisionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/revisions/{revisionName}/restart",
    }),
  );
export type ContainerAppsRevisionsRestartRevisionInput =
  typeof ContainerAppsRevisionsRestartRevisionInput.Type;

// Output Schema
export const ContainerAppsRevisionsRestartRevisionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ContainerAppsRevisionsRestartRevisionOutput =
  typeof ContainerAppsRevisionsRestartRevisionOutput.Type;

// The operation
/**
 * Restarts a revision for a Container App
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param containerAppName - Name of the Container App.
 * @param revisionName - Name of the Container App Revision.
 * @param api-version - The API version to use for this operation.
 */
export const ContainerAppsRevisionsRestartRevision =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ContainerAppsRevisionsRestartRevisionInput,
    outputSchema: ContainerAppsRevisionsRestartRevisionOutput,
  }));
// Input Schema
export const ContainerAppsSessionPoolsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/sessionPools/{sessionPoolName}",
    }),
  );
export type ContainerAppsSessionPoolsCreateOrUpdateInput =
  typeof ContainerAppsSessionPoolsCreateOrUpdateInput.Type;

// Output Schema
export const ContainerAppsSessionPoolsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ContainerAppsSessionPoolsCreateOrUpdateOutput =
  typeof ContainerAppsSessionPoolsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a session pool.
 *
 * Create or update a session pool with the given properties.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const ContainerAppsSessionPoolsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ContainerAppsSessionPoolsCreateOrUpdateInput,
    outputSchema: ContainerAppsSessionPoolsCreateOrUpdateOutput,
  }));
// Input Schema
export const ContainerAppsSessionPoolsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/sessionPools/{sessionPoolName}",
    }),
  );
export type ContainerAppsSessionPoolsDeleteInput =
  typeof ContainerAppsSessionPoolsDeleteInput.Type;

// Output Schema
export const ContainerAppsSessionPoolsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ContainerAppsSessionPoolsDeleteOutput =
  typeof ContainerAppsSessionPoolsDeleteOutput.Type;

// The operation
/**
 * Delete a session pool.
 *
 * Delete the session pool with the given name.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const ContainerAppsSessionPoolsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ContainerAppsSessionPoolsDeleteInput,
    outputSchema: ContainerAppsSessionPoolsDeleteOutput,
  }));
// Input Schema
export const ContainerAppsSessionPoolsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/sessionPools/{sessionPoolName}",
    }),
  );
export type ContainerAppsSessionPoolsGetInput =
  typeof ContainerAppsSessionPoolsGetInput.Type;

// Output Schema
export const ContainerAppsSessionPoolsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ContainerAppsSessionPoolsGetOutput =
  typeof ContainerAppsSessionPoolsGetOutput.Type;

// The operation
/**
 * Get the properties of a session pool.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const ContainerAppsSessionPoolsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ContainerAppsSessionPoolsGetInput,
    outputSchema: ContainerAppsSessionPoolsGetOutput,
  }));
// Input Schema
export const ContainerAppsSessionPoolsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/sessionPools",
    }),
  );
export type ContainerAppsSessionPoolsListByResourceGroupInput =
  typeof ContainerAppsSessionPoolsListByResourceGroupInput.Type;

// Output Schema
export const ContainerAppsSessionPoolsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ContainerAppsSessionPoolsListByResourceGroupOutput =
  typeof ContainerAppsSessionPoolsListByResourceGroupOutput.Type;

// The operation
/**
 * Get the session pools in a given resource group of a subscription.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const ContainerAppsSessionPoolsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ContainerAppsSessionPoolsListByResourceGroupInput,
    outputSchema: ContainerAppsSessionPoolsListByResourceGroupOutput,
  }));
// Input Schema
export const ContainerAppsSessionPoolsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.App/sessionPools",
    }),
  );
export type ContainerAppsSessionPoolsListBySubscriptionInput =
  typeof ContainerAppsSessionPoolsListBySubscriptionInput.Type;

// Output Schema
export const ContainerAppsSessionPoolsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ContainerAppsSessionPoolsListBySubscriptionOutput =
  typeof ContainerAppsSessionPoolsListBySubscriptionOutput.Type;

// The operation
/**
 * Get the session pools in a given subscription.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param api-version - The API version to use for this operation.
 */
export const ContainerAppsSessionPoolsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ContainerAppsSessionPoolsListBySubscriptionInput,
    outputSchema: ContainerAppsSessionPoolsListBySubscriptionOutput,
  }));
// Input Schema
export const ContainerAppsSessionPoolsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/sessionPools/{sessionPoolName}",
    }),
  );
export type ContainerAppsSessionPoolsUpdateInput =
  typeof ContainerAppsSessionPoolsUpdateInput.Type;

// Output Schema
export const ContainerAppsSessionPoolsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ContainerAppsSessionPoolsUpdateOutput =
  typeof ContainerAppsSessionPoolsUpdateOutput.Type;

// The operation
/**
 * Update properties of a session pool
 *
 * Patches a session pool using JSON merge patch
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const ContainerAppsSessionPoolsUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ContainerAppsSessionPoolsUpdateInput,
    outputSchema: ContainerAppsSessionPoolsUpdateOutput,
  }));
// Input Schema
export const ContainerAppsSourceControlsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    containerAppName: Schema.String.pipe(T.PathParam()),
    sourceControlName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/sourcecontrols/{sourceControlName}",
    }),
  );
export type ContainerAppsSourceControlsCreateOrUpdateInput =
  typeof ContainerAppsSourceControlsCreateOrUpdateInput.Type;

// Output Schema
export const ContainerAppsSourceControlsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ContainerAppsSourceControlsCreateOrUpdateOutput =
  typeof ContainerAppsSourceControlsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update the SourceControl for a Container App.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param containerAppName - Name of the Container App.
 * @param sourceControlName - Name of the Container App SourceControl.
 * @param api-version - The API version to use for this operation.
 */
export const ContainerAppsSourceControlsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ContainerAppsSourceControlsCreateOrUpdateInput,
    outputSchema: ContainerAppsSourceControlsCreateOrUpdateOutput,
  }));
// Input Schema
export const ContainerAppsSourceControlsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    containerAppName: Schema.String.pipe(T.PathParam()),
    sourceControlName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/sourcecontrols/{sourceControlName}",
    }),
  );
export type ContainerAppsSourceControlsDeleteInput =
  typeof ContainerAppsSourceControlsDeleteInput.Type;

// Output Schema
export const ContainerAppsSourceControlsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ContainerAppsSourceControlsDeleteOutput =
  typeof ContainerAppsSourceControlsDeleteOutput.Type;

// The operation
/**
 * Delete a Container App SourceControl.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param containerAppName - Name of the Container App.
 * @param sourceControlName - Name of the Container App SourceControl.
 * @param api-version - The API version to use for this operation.
 */
export const ContainerAppsSourceControlsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ContainerAppsSourceControlsDeleteInput,
    outputSchema: ContainerAppsSourceControlsDeleteOutput,
  }));
// Input Schema
export const ContainerAppsSourceControlsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    containerAppName: Schema.String.pipe(T.PathParam()),
    sourceControlName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/sourcecontrols/{sourceControlName}",
    }),
  );
export type ContainerAppsSourceControlsGetInput =
  typeof ContainerAppsSourceControlsGetInput.Type;

// Output Schema
export const ContainerAppsSourceControlsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ContainerAppsSourceControlsGetOutput =
  typeof ContainerAppsSourceControlsGetOutput.Type;

// The operation
/**
 * Get a SourceControl of a Container App.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param containerAppName - Name of the Container App.
 * @param sourceControlName - Name of the Container App SourceControl.
 * @param api-version - The API version to use for this operation.
 */
export const ContainerAppsSourceControlsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ContainerAppsSourceControlsGetInput,
    outputSchema: ContainerAppsSourceControlsGetOutput,
  }));
// Input Schema
export const ContainerAppsSourceControlsListByContainerAppInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    containerAppName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/sourcecontrols",
    }),
  );
export type ContainerAppsSourceControlsListByContainerAppInput =
  typeof ContainerAppsSourceControlsListByContainerAppInput.Type;

// Output Schema
export const ContainerAppsSourceControlsListByContainerAppOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type ContainerAppsSourceControlsListByContainerAppOutput =
  typeof ContainerAppsSourceControlsListByContainerAppOutput.Type;

// The operation
/**
 * Get the Container App SourceControls in a given resource group.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param containerAppName - Name of the Container App.
 * @param api-version - The API version to use for this operation.
 */
export const ContainerAppsSourceControlsListByContainerApp =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ContainerAppsSourceControlsListByContainerAppInput,
    outputSchema: ContainerAppsSourceControlsListByContainerAppOutput,
  }));
// Input Schema
export const ContainerAppsStartInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    containerAppName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/start",
    }),
  );
export type ContainerAppsStartInput = typeof ContainerAppsStartInput.Type;

// Output Schema
export const ContainerAppsStartOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ContainerAppsStartOutput = typeof ContainerAppsStartOutput.Type;

// The operation
/**
 * Start a container app
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param containerAppName - Name of the Container App.
 */
export const ContainerAppsStart = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ContainerAppsStartInput,
  outputSchema: ContainerAppsStartOutput,
}));
// Input Schema
export const ContainerAppsStopInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    containerAppName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/stop",
  }),
);
export type ContainerAppsStopInput = typeof ContainerAppsStopInput.Type;

// Output Schema
export const ContainerAppsStopOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ContainerAppsStopOutput = typeof ContainerAppsStopOutput.Type;

// The operation
/**
 * Stop a container app
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param containerAppName - Name of the Container App.
 */
export const ContainerAppsStop = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ContainerAppsStopInput,
  outputSchema: ContainerAppsStopOutput,
}));
// Input Schema
export const ContainerAppsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    containerAppName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}",
    }),
  );
export type ContainerAppsUpdateInput = typeof ContainerAppsUpdateInput.Type;

// Output Schema
export const ContainerAppsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ContainerAppsUpdateOutput = typeof ContainerAppsUpdateOutput.Type;

// The operation
/**
 * Update properties of a Container App
 *
 * Patches a Container App using JSON Merge Patch
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param containerAppName - Name of the Container App.
 * @param api-version - The API version to use for this operation.
 */
export const ContainerAppsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ContainerAppsUpdateInput,
  outputSchema: ContainerAppsUpdateOutput,
}));
// Input Schema
export const DaprComponentsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    environmentName: Schema.String.pipe(T.PathParam()),
    componentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    properties: Schema.optional(
      Schema.Struct({
        componentType: Schema.optional(Schema.String),
        version: Schema.optional(Schema.String),
        ignoreErrors: Schema.optional(Schema.Boolean),
        initTimeout: Schema.optional(Schema.String),
        secrets: Schema.optional(
          Schema.Array(
            Schema.Struct({
              name: Schema.optional(Schema.String),
              value: Schema.optional(Schema.String),
              identity: Schema.optional(Schema.String),
              keyVaultUrl: Schema.optional(Schema.String),
            }),
          ),
        ),
        secretStoreComponent: Schema.optional(Schema.String),
        metadata: Schema.optional(
          Schema.Array(
            Schema.Struct({
              name: Schema.optional(Schema.String),
              value: Schema.optional(Schema.String),
              secretRef: Schema.optional(Schema.String),
            }),
          ),
        ),
        scopes: Schema.optional(Schema.Array(Schema.String)),
        provisioningState: Schema.optional(
          Schema.Literals([
            "Succeeded",
            "Failed",
            "Canceled",
            "InProgress",
            "Deleting",
          ]),
        ),
        deploymentErrors: Schema.optional(Schema.String),
      }),
    ),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/daprComponents/{componentName}",
    }),
  );
export type DaprComponentsCreateOrUpdateInput =
  typeof DaprComponentsCreateOrUpdateInput.Type;

// Output Schema
export const DaprComponentsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DaprComponentsCreateOrUpdateOutput =
  typeof DaprComponentsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a Dapr Component.
 *
 * Creates or updates a Dapr Component in a Managed Environment.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param environmentName - Name of the Managed Environment.
 * @param componentName - Name of the Dapr Component.
 * @param api-version - The API version to use for this operation.
 * @param properties - Dapr Component resource specific properties
 */
export const DaprComponentsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DaprComponentsCreateOrUpdateInput,
    outputSchema: DaprComponentsCreateOrUpdateOutput,
  }));
// Input Schema
export const DaprComponentsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    environmentName: Schema.String.pipe(T.PathParam()),
    componentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/daprComponents/{componentName}",
    }),
  );
export type DaprComponentsDeleteInput = typeof DaprComponentsDeleteInput.Type;

// Output Schema
export const DaprComponentsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DaprComponentsDeleteOutput = typeof DaprComponentsDeleteOutput.Type;

// The operation
/**
 * Delete a Dapr Component.
 *
 * Delete a Dapr Component from a Managed Environment.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param environmentName - Name of the Managed Environment.
 * @param componentName - Name of the Dapr Component.
 * @param api-version - The API version to use for this operation.
 */
export const DaprComponentsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DaprComponentsDeleteInput,
    outputSchema: DaprComponentsDeleteOutput,
  }),
);
// Input Schema
export const DaprComponentsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    environmentName: Schema.String.pipe(T.PathParam()),
    componentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/daprComponents/{componentName}",
  }),
);
export type DaprComponentsGetInput = typeof DaprComponentsGetInput.Type;

// Output Schema
export const DaprComponentsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DaprComponentsGetOutput = typeof DaprComponentsGetOutput.Type;

// The operation
/**
 * Get a dapr component.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param environmentName - Name of the Managed Environment.
 * @param componentName - Name of the Dapr Component.
 * @param api-version - The API version to use for this operation.
 */
export const DaprComponentsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DaprComponentsGetInput,
  outputSchema: DaprComponentsGetOutput,
}));
// Input Schema
export const DaprComponentsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    environmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/daprComponents",
    }),
  );
export type DaprComponentsListInput = typeof DaprComponentsListInput.Type;

// Output Schema
export const DaprComponentsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type DaprComponentsListOutput = typeof DaprComponentsListOutput.Type;

// The operation
/**
 * Get the Dapr Components for a managed environment.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param environmentName - Name of the Managed Environment.
 * @param api-version - The API version to use for this operation.
 */
export const DaprComponentsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DaprComponentsListInput,
  outputSchema: DaprComponentsListOutput,
}));
// Input Schema
export const DaprComponentsListSecretsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    environmentName: Schema.String.pipe(T.PathParam()),
    componentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/daprComponents/{componentName}/listSecrets",
    }),
  );
export type DaprComponentsListSecretsInput =
  typeof DaprComponentsListSecretsInput.Type;

// Output Schema
export const DaprComponentsListSecretsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        name: Schema.optional(Schema.String),
        value: Schema.optional(Schema.String),
      }),
    ),
  });
export type DaprComponentsListSecretsOutput =
  typeof DaprComponentsListSecretsOutput.Type;

// The operation
/**
 * List secrets for a dapr component
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param environmentName - Name of the Managed Environment.
 * @param componentName - Name of the Dapr Component.
 * @param api-version - The API version to use for this operation.
 */
export const DaprComponentsListSecrets = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DaprComponentsListSecretsInput,
    outputSchema: DaprComponentsListSecretsOutput,
  }),
);
// Input Schema
export const GetCustomDomainVerificationIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.App/getCustomDomainVerificationId",
    }),
  );
export type GetCustomDomainVerificationIdInput =
  typeof GetCustomDomainVerificationIdInput.Type;

// Output Schema
export const GetCustomDomainVerificationIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.String;
export type GetCustomDomainVerificationIdOutput =
  typeof GetCustomDomainVerificationIdOutput.Type;

// The operation
/**
 * Get the verification id of a subscription used for verifying custom domains
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param api-version - The API version to use for this operation.
 */
export const GetCustomDomainVerificationId =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetCustomDomainVerificationIdInput,
    outputSchema: GetCustomDomainVerificationIdOutput,
  }));
// Input Schema
export const HttpRouteConfigCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    environmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/httpRouteConfigs/{httpRouteName}",
    }),
  );
export type HttpRouteConfigCreateOrUpdateInput =
  typeof HttpRouteConfigCreateOrUpdateInput.Type;

// Output Schema
export const HttpRouteConfigCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type HttpRouteConfigCreateOrUpdateOutput =
  typeof HttpRouteConfigCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or Update a Http Route Config.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param environmentName - Name of the Managed Environment.
 * @param api-version - The API version to use for this operation.
 */
export const HttpRouteConfigCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: HttpRouteConfigCreateOrUpdateInput,
    outputSchema: HttpRouteConfigCreateOrUpdateOutput,
  }));
// Input Schema
export const HttpRouteConfigDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    environmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/httpRouteConfigs/{httpRouteName}",
    }),
  );
export type HttpRouteConfigDeleteInput = typeof HttpRouteConfigDeleteInput.Type;

// Output Schema
export const HttpRouteConfigDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type HttpRouteConfigDeleteOutput =
  typeof HttpRouteConfigDeleteOutput.Type;

// The operation
/**
 * Deletes the specified Http Route Config.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param environmentName - Name of the Managed Environment.
 * @param api-version - The API version to use for this operation.
 */
export const HttpRouteConfigDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: HttpRouteConfigDeleteInput,
    outputSchema: HttpRouteConfigDeleteOutput,
  }),
);
// Input Schema
export const HttpRouteConfigGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    environmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/httpRouteConfigs/{httpRouteName}",
    }),
  );
export type HttpRouteConfigGetInput = typeof HttpRouteConfigGetInput.Type;

// Output Schema
export const HttpRouteConfigGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type HttpRouteConfigGetOutput = typeof HttpRouteConfigGetOutput.Type;

// The operation
/**
 * Get the specified Http Route Config.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param environmentName - Name of the Managed Environment.
 * @param api-version - The API version to use for this operation.
 */
export const HttpRouteConfigGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: HttpRouteConfigGetInput,
  outputSchema: HttpRouteConfigGetOutput,
}));
// Input Schema
export const HttpRouteConfigListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    environmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/httpRouteConfigs",
    }),
  );
export type HttpRouteConfigListInput = typeof HttpRouteConfigListInput.Type;

// Output Schema
export const HttpRouteConfigListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type HttpRouteConfigListOutput = typeof HttpRouteConfigListOutput.Type;

// The operation
/**
 * List the Http Route Configs in a given managed environment.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param environmentName - Name of the Managed Environment.
 * @param api-version - The API version to use for this operation.
 */
export const HttpRouteConfigList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: HttpRouteConfigListInput,
  outputSchema: HttpRouteConfigListOutput,
}));
// Input Schema
export const HttpRouteConfigUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    environmentName: Schema.String.pipe(T.PathParam()),
    httpRouteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/httpRouteConfigs/{httpRouteName}",
    }),
  );
export type HttpRouteConfigUpdateInput = typeof HttpRouteConfigUpdateInput.Type;

// Output Schema
export const HttpRouteConfigUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type HttpRouteConfigUpdateOutput =
  typeof HttpRouteConfigUpdateOutput.Type;

// The operation
/**
 * Update tags of a Http Route Config object
 *
 * Patches a Http Route Config resource. Only patching of tags is supported
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param environmentName - Name of the Managed Environment.
 * @param httpRouteName - Name of the Http Route Config Resource.
 * @param api-version - The API version to use for this operation.
 */
export const HttpRouteConfigUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: HttpRouteConfigUpdateInput,
    outputSchema: HttpRouteConfigUpdateOutput,
  }),
);
// Input Schema
export const JavaComponentsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    environmentName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/javaComponents/{name}",
    }),
  );
export type JavaComponentsCreateOrUpdateInput =
  typeof JavaComponentsCreateOrUpdateInput.Type;

// Output Schema
export const JavaComponentsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type JavaComponentsCreateOrUpdateOutput =
  typeof JavaComponentsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a Java Component.
 *
 * Creates or updates a Java Component in a Managed Environment.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param environmentName - Name of the Managed Environment.
 * @param name - Name of the Java Component.
 * @param api-version - The API version to use for this operation.
 */
export const JavaComponentsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: JavaComponentsCreateOrUpdateInput,
    outputSchema: JavaComponentsCreateOrUpdateOutput,
  }));
// Input Schema
export const JavaComponentsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    environmentName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/javaComponents/{name}",
    }),
  );
export type JavaComponentsDeleteInput = typeof JavaComponentsDeleteInput.Type;

// Output Schema
export const JavaComponentsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type JavaComponentsDeleteOutput = typeof JavaComponentsDeleteOutput.Type;

// The operation
/**
 * Delete.
 *
 * Delete a Java Component.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param environmentName - Name of the Managed Environment.
 * @param name - Name of the Java Component.
 * @param api-version - The API version to use for this operation.
 */
export const JavaComponentsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: JavaComponentsDeleteInput,
    outputSchema: JavaComponentsDeleteOutput,
  }),
);
// Input Schema
export const JavaComponentsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    environmentName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/javaComponents/{name}",
  }),
);
export type JavaComponentsGetInput = typeof JavaComponentsGetInput.Type;

// Output Schema
export const JavaComponentsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type JavaComponentsGetOutput = typeof JavaComponentsGetOutput.Type;

// The operation
/**
 * Get a Java Component.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param environmentName - Name of the Managed Environment.
 * @param name - Name of the Java Component.
 * @param api-version - The API version to use for this operation.
 */
export const JavaComponentsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JavaComponentsGetInput,
  outputSchema: JavaComponentsGetOutput,
}));
// Input Schema
export const JavaComponentsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    environmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/javaComponents",
    }),
  );
export type JavaComponentsListInput = typeof JavaComponentsListInput.Type;

// Output Schema
export const JavaComponentsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type JavaComponentsListOutput = typeof JavaComponentsListOutput.Type;

// The operation
/**
 * Get the Java Components for a managed environment.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param environmentName - Name of the Managed Environment.
 * @param api-version - The API version to use for this operation.
 */
export const JavaComponentsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JavaComponentsListInput,
  outputSchema: JavaComponentsListOutput,
}));
// Input Schema
export const JavaComponentsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    environmentName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/javaComponents/{name}",
    }),
  );
export type JavaComponentsUpdateInput = typeof JavaComponentsUpdateInput.Type;

// Output Schema
export const JavaComponentsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type JavaComponentsUpdateOutput = typeof JavaComponentsUpdateOutput.Type;

// The operation
/**
 * Update properties of a Java Component
 *
 * Patches a Java Component using JSON Merge Patch
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param environmentName - Name of the Managed Environment.
 * @param name - Name of the Java Component.
 * @param api-version - The API version to use for this operation.
 */
export const JavaComponentsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: JavaComponentsUpdateInput,
    outputSchema: JavaComponentsUpdateOutput,
  }),
);
// Input Schema
export const JobExecutionInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/jobs/{jobName}/executions/{jobExecutionName}",
  }),
);
export type JobExecutionInput = typeof JobExecutionInput.Type;

// Output Schema
export const JobExecutionOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  name: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  properties: Schema.optional(
    Schema.Struct({
      status: Schema.optional(
        Schema.Literals([
          "Running",
          "Processing",
          "Stopped",
          "Degraded",
          "Failed",
          "Unknown",
          "Succeeded",
        ]),
      ),
      startTime: Schema.optional(Schema.String),
      endTime: Schema.optional(Schema.String),
      template: Schema.optional(
        Schema.Struct({
          containers: Schema.optional(
            Schema.Array(
              Schema.Struct({
                image: Schema.optional(Schema.String),
                name: Schema.optional(Schema.String),
                command: Schema.optional(Schema.Array(Schema.String)),
                args: Schema.optional(Schema.Array(Schema.String)),
                env: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      name: Schema.optional(Schema.String),
                      value: Schema.optional(Schema.String),
                      secretRef: Schema.optional(Schema.String),
                    }),
                  ),
                ),
                resources: Schema.optional(
                  Schema.Struct({
                    cpu: Schema.optional(Schema.Number),
                    memory: Schema.optional(Schema.String),
                    ephemeralStorage: Schema.optional(Schema.String),
                  }),
                ),
              }),
            ),
          ),
          initContainers: Schema.optional(
            Schema.Array(
              Schema.Struct({
                image: Schema.optional(Schema.String),
                name: Schema.optional(Schema.String),
                command: Schema.optional(Schema.Array(Schema.String)),
                args: Schema.optional(Schema.Array(Schema.String)),
                env: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      name: Schema.optional(Schema.String),
                      value: Schema.optional(Schema.String),
                      secretRef: Schema.optional(Schema.String),
                    }),
                  ),
                ),
                resources: Schema.optional(
                  Schema.Struct({
                    cpu: Schema.optional(Schema.Number),
                    memory: Schema.optional(Schema.String),
                    ephemeralStorage: Schema.optional(Schema.String),
                  }),
                ),
              }),
            ),
          ),
        }),
      ),
    }),
  ),
});
export type JobExecutionOutput = typeof JobExecutionOutput.Type;

// The operation
/**
 * Get details of a single job execution
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const JobExecution = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JobExecutionInput,
  outputSchema: JobExecutionOutput,
}));
// Input Schema
export const JobsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/jobs/{jobName}",
    }),
  );
export type JobsCreateOrUpdateInput = typeof JobsCreateOrUpdateInput.Type;

// Output Schema
export const JobsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type JobsCreateOrUpdateOutput = typeof JobsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or Update a Container Apps Job.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const JobsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JobsCreateOrUpdateInput,
  outputSchema: JobsCreateOrUpdateOutput,
}));
// Input Schema
export const JobsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/jobs/{jobName}",
  }),
);
export type JobsDeleteInput = typeof JobsDeleteInput.Type;

// Output Schema
export const JobsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type JobsDeleteOutput = typeof JobsDeleteOutput.Type;

// The operation
/**
 * Delete a Container Apps Job.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const JobsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JobsDeleteInput,
  outputSchema: JobsDeleteOutput,
}));
// Input Schema
export const JobsExecutionsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $filter: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/jobs/{jobName}/executions",
    }),
  );
export type JobsExecutionsListInput = typeof JobsExecutionsListInput.Type;

// Output Schema
export const JobsExecutionsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        name: Schema.optional(Schema.String),
        id: Schema.optional(Schema.String),
        type: Schema.optional(Schema.String),
        properties: Schema.optional(
          Schema.Struct({
            status: Schema.optional(
              Schema.Literals([
                "Running",
                "Processing",
                "Stopped",
                "Degraded",
                "Failed",
                "Unknown",
                "Succeeded",
              ]),
            ),
            startTime: Schema.optional(Schema.String),
            endTime: Schema.optional(Schema.String),
            template: Schema.optional(
              Schema.Struct({
                containers: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      image: Schema.optional(Schema.String),
                      name: Schema.optional(Schema.String),
                      command: Schema.optional(Schema.Array(Schema.String)),
                      args: Schema.optional(Schema.Array(Schema.String)),
                      env: Schema.optional(
                        Schema.Array(
                          Schema.Struct({
                            name: Schema.optional(Schema.String),
                            value: Schema.optional(Schema.String),
                            secretRef: Schema.optional(Schema.String),
                          }),
                        ),
                      ),
                      resources: Schema.optional(
                        Schema.Struct({
                          cpu: Schema.optional(Schema.Number),
                          memory: Schema.optional(Schema.String),
                          ephemeralStorage: Schema.optional(Schema.String),
                        }),
                      ),
                    }),
                  ),
                ),
                initContainers: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      image: Schema.optional(Schema.String),
                      name: Schema.optional(Schema.String),
                      command: Schema.optional(Schema.Array(Schema.String)),
                      args: Schema.optional(Schema.Array(Schema.String)),
                      env: Schema.optional(
                        Schema.Array(
                          Schema.Struct({
                            name: Schema.optional(Schema.String),
                            value: Schema.optional(Schema.String),
                            secretRef: Schema.optional(Schema.String),
                          }),
                        ),
                      ),
                      resources: Schema.optional(
                        Schema.Struct({
                          cpu: Schema.optional(Schema.Number),
                          memory: Schema.optional(Schema.String),
                          ephemeralStorage: Schema.optional(Schema.String),
                        }),
                      ),
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
export type JobsExecutionsListOutput = typeof JobsExecutionsListOutput.Type;

// The operation
/**
 * Get a Container Apps Job's executions
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param $filter - The filter to apply on the operation.
 */
export const JobsExecutionsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JobsExecutionsListInput,
  outputSchema: JobsExecutionsListOutput,
}));
// Input Schema
export const JobsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/jobs/{jobName}",
  }),
);
export type JobsGetInput = typeof JobsGetInput.Type;

// Output Schema
export const JobsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type JobsGetOutput = typeof JobsGetOutput.Type;

// The operation
/**
 * Get the properties of a Container Apps Job.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const JobsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JobsGetInput,
  outputSchema: JobsGetOutput,
}));
// Input Schema
export const JobsGetDetectorInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  jobName: Schema.String.pipe(T.PathParam()),
  detectorName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/jobs/{jobName}/detectors/{detectorName}",
  }),
);
export type JobsGetDetectorInput = typeof JobsGetDetectorInput.Type;

// Output Schema
export const JobsGetDetectorOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type JobsGetDetectorOutput = typeof JobsGetDetectorOutput.Type;

// The operation
/**
 * Get the diagnostics data for a given Container App Job.
 *
 * Get the diagnostics data for a Container App Job.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param jobName - Job Name
 * @param detectorName - Name of the Container App Job detector.
 * @param api-version - The API version to use for this operation.
 */
export const JobsGetDetector = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JobsGetDetectorInput,
  outputSchema: JobsGetDetectorOutput,
}));
// Input Schema
export const JobsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/jobs",
    }),
  );
export type JobsListByResourceGroupInput =
  typeof JobsListByResourceGroupInput.Type;

// Output Schema
export const JobsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type JobsListByResourceGroupOutput =
  typeof JobsListByResourceGroupOutput.Type;

// The operation
/**
 * Get the Container Apps Jobs in a given resource group.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const JobsListByResourceGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: JobsListByResourceGroupInput,
    outputSchema: JobsListByResourceGroupOutput,
  }),
);
// Input Schema
export const JobsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.App/jobs",
    }),
  );
export type JobsListBySubscriptionInput =
  typeof JobsListBySubscriptionInput.Type;

// Output Schema
export const JobsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type JobsListBySubscriptionOutput =
  typeof JobsListBySubscriptionOutput.Type;

// The operation
/**
 * Get the Container Apps Jobs in a given subscription.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const JobsListBySubscription = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: JobsListBySubscriptionInput,
    outputSchema: JobsListBySubscriptionOutput,
  }),
);
// Input Schema
export const JobsListDetectorsInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    jobName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/jobs/{jobName}/detectors",
  }),
);
export type JobsListDetectorsInput = typeof JobsListDetectorsInput.Type;

// Output Schema
export const JobsListDetectorsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type JobsListDetectorsOutput = typeof JobsListDetectorsOutput.Type;

// The operation
/**
 * Get the list of diagnostics for a given Container App Job.
 *
 * Get the list of diagnostics for a Container App Job.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param jobName - Job Name
 * @param api-version - The API version to use for this operation.
 */
export const JobsListDetectors = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JobsListDetectorsInput,
  outputSchema: JobsListDetectorsOutput,
}));
// Input Schema
export const JobsListSecretsInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/jobs/{jobName}/listSecrets",
  }),
);
export type JobsListSecretsInput = typeof JobsListSecretsInput.Type;

// Output Schema
export const JobsListSecretsOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(
    Schema.Struct({
      name: Schema.optional(Schema.String),
      value: Schema.optional(Schema.String),
      identity: Schema.optional(Schema.String),
      keyVaultUrl: Schema.optional(Schema.String),
    }),
  ),
});
export type JobsListSecretsOutput = typeof JobsListSecretsOutput.Type;

// The operation
/**
 * List secrets for a container apps job
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const JobsListSecrets = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JobsListSecretsInput,
  outputSchema: JobsListSecretsOutput,
}));
// Input Schema
export const JobsProxyGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  jobName: Schema.String.pipe(T.PathParam()),
  apiName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/jobs/{jobName}/detectorProperties/{apiName}",
  }),
);
export type JobsProxyGetInput = typeof JobsProxyGetInput.Type;

// Output Schema
export const JobsProxyGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type JobsProxyGetOutput = typeof JobsProxyGetOutput.Type;

// The operation
/**
 * Get the properties of a Container App Job.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param jobName - Job Name
 * @param apiName - Proxy API Name for Container App Job.
 * @param api-version - The API version to use for this operation.
 */
export const JobsProxyGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JobsProxyGetInput,
  outputSchema: JobsProxyGetOutput,
}));
// Input Schema
export const JobsStartInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/jobs/{jobName}/start",
  }),
);
export type JobsStartInput = typeof JobsStartInput.Type;

// Output Schema
export const JobsStartOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  name: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
});
export type JobsStartOutput = typeof JobsStartOutput.Type;

// The operation
/**
 * Start a Container Apps Job
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const JobsStart = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JobsStartInput,
  outputSchema: JobsStartOutput,
}));
// Input Schema
export const JobsStopExecutionInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/jobs/{jobName}/executions/{jobExecutionName}/stop",
  }),
);
export type JobsStopExecutionInput = typeof JobsStopExecutionInput.Type;

// Output Schema
export const JobsStopExecutionOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type JobsStopExecutionOutput = typeof JobsStopExecutionOutput.Type;

// The operation
/**
 * Terminates execution of a running container apps job
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const JobsStopExecution = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JobsStopExecutionInput,
  outputSchema: JobsStopExecutionOutput,
}));
// Input Schema
export const JobsStopMultipleExecutionsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/jobs/{jobName}/stop",
    }),
  );
export type JobsStopMultipleExecutionsInput =
  typeof JobsStopMultipleExecutionsInput.Type;

// Output Schema
export const JobsStopMultipleExecutionsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        name: Schema.optional(Schema.String),
        id: Schema.optional(Schema.String),
        type: Schema.optional(Schema.String),
        properties: Schema.optional(
          Schema.Struct({
            status: Schema.optional(
              Schema.Literals([
                "Running",
                "Processing",
                "Stopped",
                "Degraded",
                "Failed",
                "Unknown",
                "Succeeded",
              ]),
            ),
            startTime: Schema.optional(Schema.String),
            endTime: Schema.optional(Schema.String),
            template: Schema.optional(
              Schema.Struct({
                containers: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      image: Schema.optional(Schema.String),
                      name: Schema.optional(Schema.String),
                      command: Schema.optional(Schema.Array(Schema.String)),
                      args: Schema.optional(Schema.Array(Schema.String)),
                      env: Schema.optional(
                        Schema.Array(
                          Schema.Struct({
                            name: Schema.optional(Schema.String),
                            value: Schema.optional(Schema.String),
                            secretRef: Schema.optional(Schema.String),
                          }),
                        ),
                      ),
                      resources: Schema.optional(
                        Schema.Struct({
                          cpu: Schema.optional(Schema.Number),
                          memory: Schema.optional(Schema.String),
                          ephemeralStorage: Schema.optional(Schema.String),
                        }),
                      ),
                    }),
                  ),
                ),
                initContainers: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      image: Schema.optional(Schema.String),
                      name: Schema.optional(Schema.String),
                      command: Schema.optional(Schema.Array(Schema.String)),
                      args: Schema.optional(Schema.Array(Schema.String)),
                      env: Schema.optional(
                        Schema.Array(
                          Schema.Struct({
                            name: Schema.optional(Schema.String),
                            value: Schema.optional(Schema.String),
                            secretRef: Schema.optional(Schema.String),
                          }),
                        ),
                      ),
                      resources: Schema.optional(
                        Schema.Struct({
                          cpu: Schema.optional(Schema.Number),
                          memory: Schema.optional(Schema.String),
                          ephemeralStorage: Schema.optional(Schema.String),
                        }),
                      ),
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
export type JobsStopMultipleExecutionsOutput =
  typeof JobsStopMultipleExecutionsOutput.Type;

// The operation
/**
 * Terminates execution of a running container apps job
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const JobsStopMultipleExecutions = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: JobsStopMultipleExecutionsInput,
    outputSchema: JobsStopMultipleExecutionsOutput,
  }),
);
// Input Schema
export const JobsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/jobs/{jobName}",
  }),
);
export type JobsUpdateInput = typeof JobsUpdateInput.Type;

// Output Schema
export const JobsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type JobsUpdateOutput = typeof JobsUpdateOutput.Type;

// The operation
/**
 * Update properties of a Container Apps Job
 *
 * Patches a Container Apps Job using JSON Merge Patch
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const JobsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JobsUpdateInput,
  outputSchema: JobsUpdateOutput,
}));
// Input Schema
export const LogicAppsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/providers/Microsoft.App/logicApps/{logicAppName}",
    }),
  );
export type LogicAppsCreateOrUpdateInput =
  typeof LogicAppsCreateOrUpdateInput.Type;

// Output Schema
export const LogicAppsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type LogicAppsCreateOrUpdateOutput =
  typeof LogicAppsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a Logic App extension resource
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const LogicAppsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: LogicAppsCreateOrUpdateInput,
    outputSchema: LogicAppsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const LogicAppsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/providers/Microsoft.App/logicApps/{logicAppName}",
  }),
);
export type LogicAppsDeleteInput = typeof LogicAppsDeleteInput.Type;

// Output Schema
export const LogicAppsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type LogicAppsDeleteOutput = typeof LogicAppsDeleteOutput.Type;

// The operation
/**
 * Deletes a Logic App extension resource
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const LogicAppsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: LogicAppsDeleteInput,
  outputSchema: LogicAppsDeleteOutput,
}));
// Input Schema
export const LogicAppsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/providers/Microsoft.App/logicApps/{logicAppName}",
  }),
);
export type LogicAppsGetInput = typeof LogicAppsGetInput.Type;

// Output Schema
export const LogicAppsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type LogicAppsGetOutput = typeof LogicAppsGetOutput.Type;

// The operation
/**
 * Gets a logic app extension resource.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const LogicAppsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: LogicAppsGetInput,
  outputSchema: LogicAppsGetOutput,
}));
// Input Schema
export const LogicAppsGetWorkflowInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workflowName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/providers/Microsoft.App/logicApps/{logicAppName}/workflows/{workflowName}",
    }),
  );
export type LogicAppsGetWorkflowInput = typeof LogicAppsGetWorkflowInput.Type;

// Output Schema
export const LogicAppsGetWorkflowOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type LogicAppsGetWorkflowOutput = typeof LogicAppsGetWorkflowOutput.Type;

// The operation
/**
 * Get workflow information by its name
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workflowName - Workflow name.
 * @param api-version - The API version to use for this operation.
 */
export const LogicAppsGetWorkflow = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: LogicAppsGetWorkflowInput,
    outputSchema: LogicAppsGetWorkflowOutput,
  }),
);
// Input Schema
export const LogicAppsListWorkflowsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/providers/Microsoft.App/logicApps/{logicAppName}/workflows",
    }),
  );
export type LogicAppsListWorkflowsInput =
  typeof LogicAppsListWorkflowsInput.Type;

// Output Schema
export const LogicAppsListWorkflowsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type LogicAppsListWorkflowsOutput =
  typeof LogicAppsListWorkflowsOutput.Type;

// The operation
/**
 * List the workflows for a logic app.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const LogicAppsListWorkflows = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: LogicAppsListWorkflowsInput,
    outputSchema: LogicAppsListWorkflowsOutput,
  }),
);
// Input Schema
export const LogicAppsListWorkflowsConnectionsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/providers/Microsoft.App/logicApps/{logicAppName}/listWorkflowsConnections",
    }),
  );
export type LogicAppsListWorkflowsConnectionsInput =
  typeof LogicAppsListWorkflowsConnectionsInput.Type;

// Output Schema
export const LogicAppsListWorkflowsConnectionsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type LogicAppsListWorkflowsConnectionsOutput =
  typeof LogicAppsListWorkflowsConnectionsOutput.Type;

// The operation
/**
 * Gets logic app's connections.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const LogicAppsListWorkflowsConnections =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LogicAppsListWorkflowsConnectionsInput,
    outputSchema: LogicAppsListWorkflowsConnectionsOutput,
  }));
// Input Schema
export const MaintenanceConfigurationsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    environmentName: Schema.String.pipe(T.PathParam()),
    configName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/maintenanceConfigurations/{configName}",
    }),
  );
export type MaintenanceConfigurationsCreateOrUpdateInput =
  typeof MaintenanceConfigurationsCreateOrUpdateInput.Type;

// Output Schema
export const MaintenanceConfigurationsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type MaintenanceConfigurationsCreateOrUpdateOutput =
  typeof MaintenanceConfigurationsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update the maintenance configuration for Managed Environment.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param environmentName - The name of the Managed Environment.
 * @param configName - The name of the maintenance configuration.
 * @param api-version - The API version to use for this operation.
 */
export const MaintenanceConfigurationsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MaintenanceConfigurationsCreateOrUpdateInput,
    outputSchema: MaintenanceConfigurationsCreateOrUpdateOutput,
  }));
// Input Schema
export const MaintenanceConfigurationsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    environmentName: Schema.String.pipe(T.PathParam()),
    configName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/maintenanceConfigurations/{configName}",
    }),
  );
export type MaintenanceConfigurationsDeleteInput =
  typeof MaintenanceConfigurationsDeleteInput.Type;

// Output Schema
export const MaintenanceConfigurationsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type MaintenanceConfigurationsDeleteOutput =
  typeof MaintenanceConfigurationsDeleteOutput.Type;

// The operation
/**
 * Deletes the maintenance configuration of a ManagedEnvironment .
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param environmentName - The name of the Managed Environment.
 * @param configName - The name of the maintenance configuration.
 * @param api-version - The API version to use for this operation.
 */
export const MaintenanceConfigurationsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MaintenanceConfigurationsDeleteInput,
    outputSchema: MaintenanceConfigurationsDeleteOutput,
  }));
// Input Schema
export const MaintenanceConfigurationsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    environmentName: Schema.String.pipe(T.PathParam()),
    configName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/maintenanceConfigurations/{configName}",
    }),
  );
export type MaintenanceConfigurationsGetInput =
  typeof MaintenanceConfigurationsGetInput.Type;

// Output Schema
export const MaintenanceConfigurationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type MaintenanceConfigurationsGetOutput =
  typeof MaintenanceConfigurationsGetOutput.Type;

// The operation
/**
 * Gets the maintenance configuration of a ManagedEnvironment .
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param environmentName - The name of the Managed Environment.
 * @param configName - The name of the maintenance configuration.
 * @param api-version - The API version to use for this operation.
 */
export const MaintenanceConfigurationsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MaintenanceConfigurationsGetInput,
    outputSchema: MaintenanceConfigurationsGetOutput,
  }));
// Input Schema
export const MaintenanceConfigurationsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    environmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/maintenanceConfigurations",
    }),
  );
export type MaintenanceConfigurationsListInput =
  typeof MaintenanceConfigurationsListInput.Type;

// Output Schema
export const MaintenanceConfigurationsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type MaintenanceConfigurationsListOutput =
  typeof MaintenanceConfigurationsListOutput.Type;

// The operation
/**
 * Gets all maintenance configurations in the specified Managed Environment.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param environmentName - The name of the Managed Environment.
 * @param api-version - The API version to use for this operation.
 */
export const MaintenanceConfigurationsList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MaintenanceConfigurationsListInput,
    outputSchema: MaintenanceConfigurationsListOutput,
  }));
// Input Schema
export const ManagedCertificatesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    environmentName: Schema.String.pipe(T.PathParam()),
    managedCertificateName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    properties: Schema.optional(
      Schema.Struct({
        provisioningState: Schema.optional(
          Schema.Literals([
            "Succeeded",
            "Failed",
            "Canceled",
            "DeleteFailed",
            "Pending",
            "Deleting",
          ]),
        ),
        subjectName: Schema.optional(Schema.String),
        error: Schema.optional(Schema.String),
        domainControlValidation: Schema.optional(
          Schema.Literals(["CNAME", "HTTP", "TXT"]),
        ),
        validationToken: Schema.optional(Schema.String),
      }),
    ),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/managedCertificates/{managedCertificateName}",
    }),
  );
export type ManagedCertificatesCreateOrUpdateInput =
  typeof ManagedCertificatesCreateOrUpdateInput.Type;

// Output Schema
export const ManagedCertificatesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ManagedCertificatesCreateOrUpdateOutput =
  typeof ManagedCertificatesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or Update a Managed Certificate.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param environmentName - Name of the Managed Environment.
 * @param managedCertificateName - Name of the Managed Certificate.
 * @param api-version - The API version to use for this operation.
 * @param properties - Certificate resource specific properties
 */
export const ManagedCertificatesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedCertificatesCreateOrUpdateInput,
    outputSchema: ManagedCertificatesCreateOrUpdateOutput,
  }));
// Input Schema
export const ManagedCertificatesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    environmentName: Schema.String.pipe(T.PathParam()),
    managedCertificateName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/managedCertificates/{managedCertificateName}",
    }),
  );
export type ManagedCertificatesDeleteInput =
  typeof ManagedCertificatesDeleteInput.Type;

// Output Schema
export const ManagedCertificatesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ManagedCertificatesDeleteOutput =
  typeof ManagedCertificatesDeleteOutput.Type;

// The operation
/**
 * Deletes the specified Managed Certificate.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param environmentName - Name of the Managed Environment.
 * @param managedCertificateName - Name of the Managed Certificate.
 * @param api-version - The API version to use for this operation.
 */
export const ManagedCertificatesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ManagedCertificatesDeleteInput,
    outputSchema: ManagedCertificatesDeleteOutput,
  }),
);
// Input Schema
export const ManagedCertificatesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    environmentName: Schema.String.pipe(T.PathParam()),
    managedCertificateName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/managedCertificates/{managedCertificateName}",
    }),
  );
export type ManagedCertificatesGetInput =
  typeof ManagedCertificatesGetInput.Type;

// Output Schema
export const ManagedCertificatesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ManagedCertificatesGetOutput =
  typeof ManagedCertificatesGetOutput.Type;

// The operation
/**
 * Get the specified Managed Certificate.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param environmentName - Name of the Managed Environment.
 * @param managedCertificateName - Name of the Managed Certificate.
 * @param api-version - The API version to use for this operation.
 */
export const ManagedCertificatesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ManagedCertificatesGetInput,
    outputSchema: ManagedCertificatesGetOutput,
  }),
);
// Input Schema
export const ManagedCertificatesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    environmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/managedCertificates",
    }),
  );
export type ManagedCertificatesListInput =
  typeof ManagedCertificatesListInput.Type;

// Output Schema
export const ManagedCertificatesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ManagedCertificatesListOutput =
  typeof ManagedCertificatesListOutput.Type;

// The operation
/**
 * Get the Managed Certificates in a given managed environment.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param environmentName - Name of the Managed Environment.
 * @param api-version - The API version to use for this operation.
 */
export const ManagedCertificatesList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ManagedCertificatesListInput,
    outputSchema: ManagedCertificatesListOutput,
  }),
);
// Input Schema
export const ManagedCertificatesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    environmentName: Schema.String.pipe(T.PathParam()),
    managedCertificateName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/managedCertificates/{managedCertificateName}",
    }),
  );
export type ManagedCertificatesUpdateInput =
  typeof ManagedCertificatesUpdateInput.Type;

// Output Schema
export const ManagedCertificatesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ManagedCertificatesUpdateOutput =
  typeof ManagedCertificatesUpdateOutput.Type;

// The operation
/**
 * Update tags of a managed certificate
 *
 * Patches a managed certificate. Oly patching of tags is supported
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param environmentName - Name of the Managed Environment.
 * @param managedCertificateName - Name of the Managed Certificate.
 * @param api-version - The API version to use for this operation.
 * @param tags - Application-specific metadata in the form of key-value pairs.
 */
export const ManagedCertificatesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ManagedCertificatesUpdateInput,
    outputSchema: ManagedCertificatesUpdateOutput,
  }),
);
// Input Schema
export const ManagedEnvironmentDiagnosticsGetDetectorInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    environmentName: Schema.String.pipe(T.PathParam()),
    detectorName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/detectors/{detectorName}",
    }),
  );
export type ManagedEnvironmentDiagnosticsGetDetectorInput =
  typeof ManagedEnvironmentDiagnosticsGetDetectorInput.Type;

// Output Schema
export const ManagedEnvironmentDiagnosticsGetDetectorOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagedEnvironmentDiagnosticsGetDetectorOutput =
  typeof ManagedEnvironmentDiagnosticsGetDetectorOutput.Type;

// The operation
/**
 * Get the diagnostics data for a given Managed Environment.
 *
 * Get the diagnostics data for a Managed Environment used to host container apps.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param environmentName - Name of the Environment.
 * @param detectorName - Name of the Managed Environment detector.
 * @param api-version - The API version to use for this operation.
 */
export const ManagedEnvironmentDiagnosticsGetDetector =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedEnvironmentDiagnosticsGetDetectorInput,
    outputSchema: ManagedEnvironmentDiagnosticsGetDetectorOutput,
  }));
// Input Schema
export const ManagedEnvironmentDiagnosticsListDetectorsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    environmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/detectors",
    }),
  );
export type ManagedEnvironmentDiagnosticsListDetectorsInput =
  typeof ManagedEnvironmentDiagnosticsListDetectorsInput.Type;

// Output Schema
export const ManagedEnvironmentDiagnosticsListDetectorsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type ManagedEnvironmentDiagnosticsListDetectorsOutput =
  typeof ManagedEnvironmentDiagnosticsListDetectorsOutput.Type;

// The operation
/**
 * Get the list of diagnostics for a given Managed Environment.
 *
 * Get the list of diagnostics for a Managed Environment used to host container apps.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param environmentName - Name of the Environment.
 * @param api-version - The API version to use for this operation.
 */
export const ManagedEnvironmentDiagnosticsListDetectors =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedEnvironmentDiagnosticsListDetectorsInput,
    outputSchema: ManagedEnvironmentDiagnosticsListDetectorsOutput,
  }));
// Input Schema
export const ManagedEnvironmentPrivateEndpointConnectionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    environmentName: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type ManagedEnvironmentPrivateEndpointConnectionsDeleteInput =
  typeof ManagedEnvironmentPrivateEndpointConnectionsDeleteInput.Type;

// Output Schema
export const ManagedEnvironmentPrivateEndpointConnectionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ManagedEnvironmentPrivateEndpointConnectionsDeleteOutput =
  typeof ManagedEnvironmentPrivateEndpointConnectionsDeleteOutput.Type;

// The operation
/**
 * Delete a private endpoint connection for a given managed environment.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param environmentName - Name of the Managed Environment.
 * @param privateEndpointConnectionName - The name of the private endpoint connection associated with the Azure resource.
 * @param api-version - The API version to use for this operation.
 */
export const ManagedEnvironmentPrivateEndpointConnectionsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedEnvironmentPrivateEndpointConnectionsDeleteInput,
    outputSchema: ManagedEnvironmentPrivateEndpointConnectionsDeleteOutput,
  }));
// Input Schema
export const ManagedEnvironmentsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    environmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}",
    }),
  );
export type ManagedEnvironmentsCreateOrUpdateInput =
  typeof ManagedEnvironmentsCreateOrUpdateInput.Type;

// Output Schema
export const ManagedEnvironmentsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ManagedEnvironmentsCreateOrUpdateOutput =
  typeof ManagedEnvironmentsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a Managed Environment.
 *
 * Creates or updates a Managed Environment used to host container apps.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param environmentName - Name of the Environment.
 * @param api-version - The API version to use for this operation.
 */
export const ManagedEnvironmentsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedEnvironmentsCreateOrUpdateInput,
    outputSchema: ManagedEnvironmentsCreateOrUpdateOutput,
  }));
// Input Schema
export const ManagedEnvironmentsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    environmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}",
    }),
  );
export type ManagedEnvironmentsDeleteInput =
  typeof ManagedEnvironmentsDeleteInput.Type;

// Output Schema
export const ManagedEnvironmentsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ManagedEnvironmentsDeleteOutput =
  typeof ManagedEnvironmentsDeleteOutput.Type;

// The operation
/**
 * Delete a Managed Environment.
 *
 * Delete a Managed Environment if it does not have any container apps.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param environmentName - Name of the Environment.
 * @param api-version - The API version to use for this operation.
 */
export const ManagedEnvironmentsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ManagedEnvironmentsDeleteInput,
    outputSchema: ManagedEnvironmentsDeleteOutput,
  }),
);
// Input Schema
export const ManagedEnvironmentsDiagnosticsGetRootInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    environmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/detectorProperties/rootApi/",
    }),
  );
export type ManagedEnvironmentsDiagnosticsGetRootInput =
  typeof ManagedEnvironmentsDiagnosticsGetRootInput.Type;

// Output Schema
export const ManagedEnvironmentsDiagnosticsGetRootOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ManagedEnvironmentsDiagnosticsGetRootOutput =
  typeof ManagedEnvironmentsDiagnosticsGetRootOutput.Type;

// The operation
/**
 * Get the properties of a Managed Environment.
 *
 * Get the properties of a Managed Environment used to host container apps.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param environmentName - Name of the Environment.
 * @param api-version - The API version to use for this operation.
 */
export const ManagedEnvironmentsDiagnosticsGetRoot =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedEnvironmentsDiagnosticsGetRootInput,
    outputSchema: ManagedEnvironmentsDiagnosticsGetRootOutput,
  }));
// Input Schema
export const ManagedEnvironmentsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    environmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}",
    }),
  );
export type ManagedEnvironmentsGetInput =
  typeof ManagedEnvironmentsGetInput.Type;

// Output Schema
export const ManagedEnvironmentsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ManagedEnvironmentsGetOutput =
  typeof ManagedEnvironmentsGetOutput.Type;

// The operation
/**
 * Get the properties of a Managed Environment.
 *
 * Get the properties of a Managed Environment used to host container apps.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param environmentName - Name of the Environment.
 * @param api-version - The API version to use for this operation.
 */
export const ManagedEnvironmentsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ManagedEnvironmentsGetInput,
    outputSchema: ManagedEnvironmentsGetOutput,
  }),
);
// Input Schema
export const ManagedEnvironmentsGetAuthTokenInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    environmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/getAuthtoken",
    }),
  );
export type ManagedEnvironmentsGetAuthTokenInput =
  typeof ManagedEnvironmentsGetAuthTokenInput.Type;

// Output Schema
export const ManagedEnvironmentsGetAuthTokenOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ManagedEnvironmentsGetAuthTokenOutput =
  typeof ManagedEnvironmentsGetAuthTokenOutput.Type;

// The operation
/**
 * Get auth token for a managed environment
 *
 * Checks if resource name is available.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param environmentName - Name of the Managed Environment.
 * @param api-version - The API version to use for this operation.
 */
export const ManagedEnvironmentsGetAuthToken =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedEnvironmentsGetAuthTokenInput,
    outputSchema: ManagedEnvironmentsGetAuthTokenOutput,
  }));
// Input Schema
export const ManagedEnvironmentsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments",
    }),
  );
export type ManagedEnvironmentsListByResourceGroupInput =
  typeof ManagedEnvironmentsListByResourceGroupInput.Type;

// Output Schema
export const ManagedEnvironmentsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ManagedEnvironmentsListByResourceGroupOutput =
  typeof ManagedEnvironmentsListByResourceGroupOutput.Type;

// The operation
/**
 * Get all the Environments in a resource group.
 *
 * Get all the Managed Environments in a resource group.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const ManagedEnvironmentsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedEnvironmentsListByResourceGroupInput,
    outputSchema: ManagedEnvironmentsListByResourceGroupOutput,
  }));
// Input Schema
export const ManagedEnvironmentsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.App/managedEnvironments",
    }),
  );
export type ManagedEnvironmentsListBySubscriptionInput =
  typeof ManagedEnvironmentsListBySubscriptionInput.Type;

// Output Schema
export const ManagedEnvironmentsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ManagedEnvironmentsListBySubscriptionOutput =
  typeof ManagedEnvironmentsListBySubscriptionOutput.Type;

// The operation
/**
 * Get all Environments for a subscription.
 *
 * Get all Managed Environments for a subscription.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const ManagedEnvironmentsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedEnvironmentsListBySubscriptionInput,
    outputSchema: ManagedEnvironmentsListBySubscriptionOutput,
  }));
// Input Schema
export const ManagedEnvironmentsListWorkloadProfileStatesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    environmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/workloadProfileStates",
    }),
  );
export type ManagedEnvironmentsListWorkloadProfileStatesInput =
  typeof ManagedEnvironmentsListWorkloadProfileStatesInput.Type;

// Output Schema
export const ManagedEnvironmentsListWorkloadProfileStatesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type ManagedEnvironmentsListWorkloadProfileStatesOutput =
  typeof ManagedEnvironmentsListWorkloadProfileStatesOutput.Type;

// The operation
/**
 * Get all workload Profile States for a Managed Environment..
 *
 * Get all workload Profile States for a Managed Environment.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param environmentName - Name of the Managed Environment.
 */
export const ManagedEnvironmentsListWorkloadProfileStates =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedEnvironmentsListWorkloadProfileStatesInput,
    outputSchema: ManagedEnvironmentsListWorkloadProfileStatesOutput,
  }));
// Input Schema
export const ManagedEnvironmentsStoragesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    environmentName: Schema.String.pipe(T.PathParam()),
    storageName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/storages/{storageName}",
    }),
  );
export type ManagedEnvironmentsStoragesCreateOrUpdateInput =
  typeof ManagedEnvironmentsStoragesCreateOrUpdateInput.Type;

// Output Schema
export const ManagedEnvironmentsStoragesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagedEnvironmentsStoragesCreateOrUpdateOutput =
  typeof ManagedEnvironmentsStoragesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update storage for a managedEnvironment.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param environmentName - Name of the Environment.
 * @param storageName - Name of the storage.
 * @param api-version - The API version to use for this operation.
 */
export const ManagedEnvironmentsStoragesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedEnvironmentsStoragesCreateOrUpdateInput,
    outputSchema: ManagedEnvironmentsStoragesCreateOrUpdateOutput,
  }));
// Input Schema
export const ManagedEnvironmentsStoragesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    environmentName: Schema.String.pipe(T.PathParam()),
    storageName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/storages/{storageName}",
    }),
  );
export type ManagedEnvironmentsStoragesDeleteInput =
  typeof ManagedEnvironmentsStoragesDeleteInput.Type;

// Output Schema
export const ManagedEnvironmentsStoragesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ManagedEnvironmentsStoragesDeleteOutput =
  typeof ManagedEnvironmentsStoragesDeleteOutput.Type;

// The operation
/**
 * Delete storage for a managedEnvironment.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param environmentName - Name of the Environment.
 * @param storageName - Name of the storage.
 * @param api-version - The API version to use for this operation.
 */
export const ManagedEnvironmentsStoragesDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedEnvironmentsStoragesDeleteInput,
    outputSchema: ManagedEnvironmentsStoragesDeleteOutput,
  }));
// Input Schema
export const ManagedEnvironmentsStoragesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    environmentName: Schema.String.pipe(T.PathParam()),
    storageName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/storages/{storageName}",
    }),
  );
export type ManagedEnvironmentsStoragesGetInput =
  typeof ManagedEnvironmentsStoragesGetInput.Type;

// Output Schema
export const ManagedEnvironmentsStoragesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagedEnvironmentsStoragesGetOutput =
  typeof ManagedEnvironmentsStoragesGetOutput.Type;

// The operation
/**
 * Get storage for a managedEnvironment.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param environmentName - Name of the Environment.
 * @param storageName - Name of the storage.
 * @param api-version - The API version to use for this operation.
 */
export const ManagedEnvironmentsStoragesGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedEnvironmentsStoragesGetInput,
    outputSchema: ManagedEnvironmentsStoragesGetOutput,
  }));
// Input Schema
export const ManagedEnvironmentsStoragesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    environmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/storages",
    }),
  );
export type ManagedEnvironmentsStoragesListInput =
  typeof ManagedEnvironmentsStoragesListInput.Type;

// Output Schema
export const ManagedEnvironmentsStoragesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
  });
export type ManagedEnvironmentsStoragesListOutput =
  typeof ManagedEnvironmentsStoragesListOutput.Type;

// The operation
/**
 * Get all storages for a managedEnvironment.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param environmentName - Name of the Environment.
 * @param api-version - The API version to use for this operation.
 */
export const ManagedEnvironmentsStoragesList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedEnvironmentsStoragesListInput,
    outputSchema: ManagedEnvironmentsStoragesListOutput,
  }));
// Input Schema
export const ManagedEnvironmentsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    environmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}",
    }),
  );
export type ManagedEnvironmentsUpdateInput =
  typeof ManagedEnvironmentsUpdateInput.Type;

// Output Schema
export const ManagedEnvironmentsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ManagedEnvironmentsUpdateOutput =
  typeof ManagedEnvironmentsUpdateOutput.Type;

// The operation
/**
 * Update Managed Environment's properties.
 *
 * Patches a Managed Environment using JSON Merge Patch
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param environmentName - Name of the Environment.
 * @param api-version - The API version to use for this operation.
 */
export const ManagedEnvironmentsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ManagedEnvironmentsUpdateInput,
    outputSchema: ManagedEnvironmentsUpdateOutput,
  }),
);
// Input Schema
export const ManagedEnvironmentUsagesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    environmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/usages",
    }),
  );
export type ManagedEnvironmentUsagesListInput =
  typeof ManagedEnvironmentUsagesListInput.Type;

// Output Schema
export const ManagedEnvironmentUsagesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          unit: Schema.Literals(["Count"]),
          currentValue: Schema.Number,
          limit: Schema.Number,
          name: Schema.Struct({
            value: Schema.optional(Schema.String),
            localizedValue: Schema.optional(Schema.String),
          }),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ManagedEnvironmentUsagesListOutput =
  typeof ManagedEnvironmentUsagesListOutput.Type;

// The operation
/**
 * Gets the current usage information as well as the limits for environment.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param environmentName - Name of the Environment.
 * @param api-version - The API version to use for this operation.
 */
export const ManagedEnvironmentUsagesList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedEnvironmentUsagesListInput,
    outputSchema: ManagedEnvironmentUsagesListOutput,
  }));
// Input Schema
export const NamespacesCheckNameAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    environmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/checkNameAvailability",
    }),
  );
export type NamespacesCheckNameAvailabilityInput =
  typeof NamespacesCheckNameAvailabilityInput.Type;

// Output Schema
export const NamespacesCheckNameAvailabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nameAvailable: Schema.optional(Schema.Boolean),
    reason: Schema.optional(Schema.Literals(["Invalid", "AlreadyExists"])),
    message: Schema.optional(Schema.String),
  });
export type NamespacesCheckNameAvailabilityOutput =
  typeof NamespacesCheckNameAvailabilityOutput.Type;

// The operation
/**
 * Checks the resource name availability.
 *
 * Checks if resource name is available.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param environmentName - Name of the Managed Environment.
 * @param api-version - The API version to use for this operation.
 * @param name - The name of the resource for which availability needs to be checked.
 * @param type - The resource type.
 */
export const NamespacesCheckNameAvailability =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NamespacesCheckNameAvailabilityInput,
    outputSchema: NamespacesCheckNameAvailabilityOutput,
  }));
// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  "api-version": Schema.String,
}).pipe(T.Http({ method: "GET", path: "/providers/Microsoft.App/operations" }));
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
      }),
    ),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type OperationsListOutput = typeof OperationsListOutput.Type;

// The operation
/**
 * Lists all of the available RP operations.
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
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.App/locations/{location}/usages",
  }),
);
export type UsagesListInput = typeof UsagesListInput.Type;

// Output Schema
export const UsagesListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        unit: Schema.Literals(["Count"]),
        currentValue: Schema.Number,
        limit: Schema.Number,
        name: Schema.Struct({
          value: Schema.optional(Schema.String),
          localizedValue: Schema.optional(Schema.String),
        }),
      }),
    ),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type UsagesListOutput = typeof UsagesListOutput.Type;

// The operation
/**
 * Gets, for the specified location, the current resource usage information as well as the limits under the subscription.
 *
 * @param location - The location for which resource usage is queried.
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const UsagesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: UsagesListInput,
  outputSchema: UsagesListOutput,
}));
