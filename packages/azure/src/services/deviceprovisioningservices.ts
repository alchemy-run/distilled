/**
 * Azure Deviceprovisioningservices API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const DpsCertificateCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    provisioningServiceName: Schema.String.pipe(T.PathParam()),
    certificateName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Devices/provisioningServices/{provisioningServiceName}/certificates/{certificateName}",
    }),
  );
export type DpsCertificateCreateOrUpdateInput =
  typeof DpsCertificateCreateOrUpdateInput.Type;

// Output Schema
export const DpsCertificateCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    properties: Schema.optional(
      Schema.Struct({
        subject: Schema.optional(Schema.String),
        expiry: Schema.optional(Schema.String),
        thumbprint: Schema.optional(Schema.String),
        isVerified: Schema.optional(Schema.Boolean),
        certificate: Schema.optional(Schema.String),
        created: Schema.optional(Schema.String),
        updated: Schema.optional(Schema.String),
      }),
    ),
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    etag: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
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
export type DpsCertificateCreateOrUpdateOutput =
  typeof DpsCertificateCreateOrUpdateOutput.Type;

// The operation
/**
 * Upload the certificate to the provisioning service.
 *
 * Add new certificate or update an existing certificate.
 *
 * @param resourceGroupName - Resource group identifier.
 * @param provisioningServiceName - The name of the provisioning service.
 * @param certificateName - The name of the certificate create or update.
 * @param If-Match - ETag of the certificate. This is required to update an existing certificate, and ignored while creating a brand new certificate.
 */
export const DpsCertificateCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DpsCertificateCreateOrUpdateInput,
    outputSchema: DpsCertificateCreateOrUpdateOutput,
  }));
// Input Schema
export const DpsCertificateDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    provisioningServiceName: Schema.String.pipe(T.PathParam()),
    certificateName: Schema.String.pipe(T.PathParam()),
    "certificate.name": Schema.optional(Schema.String),
    "certificate.rawBytes": Schema.optional(Schema.String),
    "certificate.isVerified": Schema.optional(Schema.Boolean),
    "certificate.purpose": Schema.optional(
      Schema.Literals(["clientAuthentication", "serverAuthentication"]),
    ),
    "certificate.created": Schema.optional(Schema.String),
    "certificate.lastUpdated": Schema.optional(Schema.String),
    "certificate.hasPrivateKey": Schema.optional(Schema.Boolean),
    "certificate.nonce": Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Devices/provisioningServices/{provisioningServiceName}/certificates/{certificateName}",
    }),
  );
export type DpsCertificateDeleteInput = typeof DpsCertificateDeleteInput.Type;

// Output Schema
export const DpsCertificateDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DpsCertificateDeleteOutput = typeof DpsCertificateDeleteOutput.Type;

// The operation
/**
 * Delete the Provisioning Service Certificate.
 *
 * Deletes the specified certificate associated with the Provisioning Service
 *
 * @param resourceGroupName - Resource group identifier.
 * @param If-Match - ETag of the certificate
 * @param provisioningServiceName - The name of the provisioning service.
 * @param certificateName - This is a mandatory field, and is the logical name of the certificate that the provisioning service will access by.
 * @param certificate.name - This is optional, and it is the Common Name of the certificate.
 * @param certificate.rawBytes - Raw data within the certificate.
 * @param certificate.isVerified - Indicates if certificate has been verified by owner of the private key.
 * @param certificate.purpose - A description that mentions the purpose of the certificate.
 * @param certificate.created - Time the certificate is created.
 * @param certificate.lastUpdated - Time the certificate is last updated.
 * @param certificate.hasPrivateKey - Indicates if the certificate contains a private key.
 * @param certificate.nonce - Random number generated to indicate Proof of Possession.
 */
export const DpsCertificateDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DpsCertificateDeleteInput,
    outputSchema: DpsCertificateDeleteOutput,
  }),
);
// Input Schema
export const DpsCertificateGenerateVerificationCodeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    certificateName: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    provisioningServiceName: Schema.String.pipe(T.PathParam()),
    "certificate.name": Schema.optional(Schema.String),
    "certificate.rawBytes": Schema.optional(Schema.String),
    "certificate.isVerified": Schema.optional(Schema.Boolean),
    "certificate.purpose": Schema.optional(
      Schema.Literals(["clientAuthentication", "serverAuthentication"]),
    ),
    "certificate.created": Schema.optional(Schema.String),
    "certificate.lastUpdated": Schema.optional(Schema.String),
    "certificate.hasPrivateKey": Schema.optional(Schema.Boolean),
    "certificate.nonce": Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Devices/provisioningServices/{provisioningServiceName}/certificates/{certificateName}/generateVerificationCode",
    }),
  );
export type DpsCertificateGenerateVerificationCodeInput =
  typeof DpsCertificateGenerateVerificationCodeInput.Type;

// Output Schema
export const DpsCertificateGenerateVerificationCodeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.optional(Schema.String),
    etag: Schema.optional(Schema.String),
    id: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        verificationCode: Schema.optional(Schema.String),
        subject: Schema.optional(Schema.String),
        expiry: Schema.optional(Schema.String),
        thumbprint: Schema.optional(Schema.String),
        isVerified: Schema.optional(Schema.Boolean),
        certificate: Schema.optional(Schema.String),
        created: Schema.optional(Schema.String),
        updated: Schema.optional(Schema.String),
      }),
    ),
  });
export type DpsCertificateGenerateVerificationCodeOutput =
  typeof DpsCertificateGenerateVerificationCodeOutput.Type;

// The operation
/**
 * Generate verification code for Proof of Possession.
 *
 * @param certificateName - The mandatory logical name of the certificate, that the provisioning service uses to access.
 * @param If-Match - ETag of the certificate. This is required to update an existing certificate, and ignored while creating a brand new certificate.
 * @param resourceGroupName - name of resource group.
 * @param provisioningServiceName - Name of provisioning service.
 * @param certificate.name - Common Name for the certificate.
 * @param certificate.rawBytes - Raw data of certificate.
 * @param certificate.isVerified - Indicates if the certificate has been verified by owner of the private key.
 * @param certificate.purpose - Description mentioning the purpose of the certificate.
 * @param certificate.created - Certificate creation time.
 * @param certificate.lastUpdated - Certificate last updated time.
 * @param certificate.hasPrivateKey - Indicates if the certificate contains private key.
 * @param certificate.nonce - Random number generated to indicate Proof of Possession.
 */
export const DpsCertificateGenerateVerificationCode =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DpsCertificateGenerateVerificationCodeInput,
    outputSchema: DpsCertificateGenerateVerificationCodeOutput,
  }));
// Input Schema
export const DpsCertificateGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    certificateName: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    provisioningServiceName: Schema.String.pipe(T.PathParam()),
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Devices/provisioningServices/{provisioningServiceName}/certificates/{certificateName}",
  }),
);
export type DpsCertificateGetInput = typeof DpsCertificateGetInput.Type;

// Output Schema
export const DpsCertificateGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    properties: Schema.optional(
      Schema.Struct({
        subject: Schema.optional(Schema.String),
        expiry: Schema.optional(Schema.String),
        thumbprint: Schema.optional(Schema.String),
        isVerified: Schema.optional(Schema.Boolean),
        certificate: Schema.optional(Schema.String),
        created: Schema.optional(Schema.String),
        updated: Schema.optional(Schema.String),
      }),
    ),
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    etag: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
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
export type DpsCertificateGetOutput = typeof DpsCertificateGetOutput.Type;

// The operation
/**
 * Get the certificate from the provisioning service.
 *
 * @param certificateName - Name of the certificate to retrieve.
 * @param resourceGroupName - Resource group identifier.
 * @param provisioningServiceName - Name of the provisioning service the certificate is associated with.
 * @param If-Match - ETag of the certificate.
 */
export const DpsCertificateGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DpsCertificateGetInput,
  outputSchema: DpsCertificateGetOutput,
}));
// Input Schema
export const DpsCertificateListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    provisioningServiceName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Devices/provisioningServices/{provisioningServiceName}/certificates",
    }),
  );
export type DpsCertificateListInput = typeof DpsCertificateListInput.Type;

// Output Schema
export const DpsCertificateListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          properties: Schema.optional(
            Schema.Struct({
              subject: Schema.optional(Schema.String),
              expiry: Schema.optional(Schema.String),
              thumbprint: Schema.optional(Schema.String),
              isVerified: Schema.optional(Schema.Boolean),
              certificate: Schema.optional(Schema.String),
              created: Schema.optional(Schema.String),
              updated: Schema.optional(Schema.String),
            }),
          ),
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          etag: Schema.optional(Schema.String),
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
    ),
  });
export type DpsCertificateListOutput = typeof DpsCertificateListOutput.Type;

// The operation
/**
 * Get all the certificates tied to the provisioning service.
 *
 * @param resourceGroupName - Name of resource group.
 * @param provisioningServiceName - Name of provisioning service to retrieve certificates for.
 */
export const DpsCertificateList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DpsCertificateListInput,
  outputSchema: DpsCertificateListOutput,
}));
// Input Schema
export const DpsCertificateVerifyCertificateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    certificateName: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    provisioningServiceName: Schema.String.pipe(T.PathParam()),
    "certificate.name": Schema.optional(Schema.String),
    "certificate.rawBytes": Schema.optional(Schema.String),
    "certificate.isVerified": Schema.optional(Schema.Boolean),
    "certificate.purpose": Schema.optional(
      Schema.Literals(["clientAuthentication", "serverAuthentication"]),
    ),
    "certificate.created": Schema.optional(Schema.String),
    "certificate.lastUpdated": Schema.optional(Schema.String),
    "certificate.hasPrivateKey": Schema.optional(Schema.Boolean),
    "certificate.nonce": Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Devices/provisioningServices/{provisioningServiceName}/certificates/{certificateName}/verify",
    }),
  );
export type DpsCertificateVerifyCertificateInput =
  typeof DpsCertificateVerifyCertificateInput.Type;

// Output Schema
export const DpsCertificateVerifyCertificateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    properties: Schema.optional(
      Schema.Struct({
        subject: Schema.optional(Schema.String),
        expiry: Schema.optional(Schema.String),
        thumbprint: Schema.optional(Schema.String),
        isVerified: Schema.optional(Schema.Boolean),
        certificate: Schema.optional(Schema.String),
        created: Schema.optional(Schema.String),
        updated: Schema.optional(Schema.String),
      }),
    ),
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    etag: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
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
export type DpsCertificateVerifyCertificateOutput =
  typeof DpsCertificateVerifyCertificateOutput.Type;

// The operation
/**
 * Verify certificate's private key possession.
 *
 * Verifies the certificate's private key possession by providing the leaf cert issued by the verifying pre uploaded certificate.
 *
 * @param certificateName - The mandatory logical name of the certificate, that the provisioning service uses to access.
 * @param If-Match - ETag of the certificate.
 * @param resourceGroupName - Resource group name.
 * @param provisioningServiceName - Provisioning service name.
 * @param certificate.name - Common Name for the certificate.
 * @param certificate.rawBytes - Raw data of certificate.
 * @param certificate.isVerified - Indicates if the certificate has been verified by owner of the private key.
 * @param certificate.purpose - Describe the purpose of the certificate.
 * @param certificate.created - Certificate creation time.
 * @param certificate.lastUpdated - Certificate last updated time.
 * @param certificate.hasPrivateKey - Indicates if the certificate contains private key.
 * @param certificate.nonce - Random number generated to indicate Proof of Possession.
 */
export const DpsCertificateVerifyCertificate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DpsCertificateVerifyCertificateInput,
    outputSchema: DpsCertificateVerifyCertificateOutput,
  }));
// Input Schema
export const IotDpsResourceCheckProvisioningServiceNameAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Devices/checkProvisioningServiceNameAvailability",
    }),
  );
export type IotDpsResourceCheckProvisioningServiceNameAvailabilityInput =
  typeof IotDpsResourceCheckProvisioningServiceNameAvailabilityInput.Type;

// Output Schema
export const IotDpsResourceCheckProvisioningServiceNameAvailabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nameAvailable: Schema.optional(Schema.Boolean),
    reason: Schema.optional(Schema.Literals(["Invalid", "AlreadyExists"])),
    message: Schema.optional(Schema.String),
  });
export type IotDpsResourceCheckProvisioningServiceNameAvailabilityOutput =
  typeof IotDpsResourceCheckProvisioningServiceNameAvailabilityOutput.Type;

// The operation
/**
 * Check if a provisioning service name is available.
 *
 * Check if a provisioning service name is available. This will validate if the name is syntactically valid and if the name is usable
 */
export const IotDpsResourceCheckProvisioningServiceNameAvailability =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IotDpsResourceCheckProvisioningServiceNameAvailabilityInput,
    outputSchema: IotDpsResourceCheckProvisioningServiceNameAvailabilityOutput,
  }));
// Input Schema
export const IotDpsResourceCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    provisioningServiceName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Devices/provisioningServices/{provisioningServiceName}",
    }),
  );
export type IotDpsResourceCreateOrUpdateInput =
  typeof IotDpsResourceCreateOrUpdateInput.Type;

// Output Schema
export const IotDpsResourceCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.String,
    resourcegroup: Schema.optional(Schema.String),
    subscriptionid: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type IotDpsResourceCreateOrUpdateOutput =
  typeof IotDpsResourceCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update the metadata of the provisioning service.
 *
 * Create or update the metadata of the provisioning service. The usual pattern to modify a property is to retrieve the provisioning service metadata and security metadata, and then combine them with the modified values in a new body to update the provisioning service.
 *
 * @param resourceGroupName - Resource group identifier.
 * @param provisioningServiceName - Name of provisioning service to create or update.
 */
export const IotDpsResourceCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IotDpsResourceCreateOrUpdateInput,
    outputSchema: IotDpsResourceCreateOrUpdateOutput,
  }));
// Input Schema
export const IotDpsResourceCreateOrUpdatePrivateEndpointConnectionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Devices/provisioningServices/{resourceName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type IotDpsResourceCreateOrUpdatePrivateEndpointConnectionInput =
  typeof IotDpsResourceCreateOrUpdatePrivateEndpointConnectionInput.Type;

// Output Schema
export const IotDpsResourceCreateOrUpdatePrivateEndpointConnectionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    properties: Schema.Struct({
      privateEndpoint: Schema.optional(
        Schema.Struct({
          id: Schema.optional(Schema.String),
        }),
      ),
      privateLinkServiceConnectionState: Schema.Struct({
        status: Schema.Literals([
          "Pending",
          "Approved",
          "Rejected",
          "Disconnected",
        ]),
        description: Schema.String,
        actionsRequired: Schema.optional(Schema.String),
      }),
    }),
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
export type IotDpsResourceCreateOrUpdatePrivateEndpointConnectionOutput =
  typeof IotDpsResourceCreateOrUpdatePrivateEndpointConnectionOutput.Type;

// The operation
/**
 * Create or update private endpoint connection
 *
 * Create or update the status of a private endpoint connection with the specified name
 */
export const IotDpsResourceCreateOrUpdatePrivateEndpointConnection =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IotDpsResourceCreateOrUpdatePrivateEndpointConnectionInput,
    outputSchema: IotDpsResourceCreateOrUpdatePrivateEndpointConnectionOutput,
  }));
// Input Schema
export const IotDpsResourceDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    provisioningServiceName: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Devices/provisioningServices/{provisioningServiceName}",
    }),
  );
export type IotDpsResourceDeleteInput = typeof IotDpsResourceDeleteInput.Type;

// Output Schema
export const IotDpsResourceDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type IotDpsResourceDeleteOutput = typeof IotDpsResourceDeleteOutput.Type;

// The operation
/**
 * Delete the Provisioning Service
 *
 * Deletes the Provisioning Service.
 *
 * @param provisioningServiceName - Name of provisioning service to delete.
 * @param resourceGroupName - Resource group identifier.
 */
export const IotDpsResourceDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IotDpsResourceDeleteInput,
    outputSchema: IotDpsResourceDeleteOutput,
  }),
);
// Input Schema
export const IotDpsResourceDeletePrivateEndpointConnectionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Devices/provisioningServices/{resourceName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type IotDpsResourceDeletePrivateEndpointConnectionInput =
  typeof IotDpsResourceDeletePrivateEndpointConnectionInput.Type;

// Output Schema
export const IotDpsResourceDeletePrivateEndpointConnectionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    properties: Schema.Struct({
      privateEndpoint: Schema.optional(
        Schema.Struct({
          id: Schema.optional(Schema.String),
        }),
      ),
      privateLinkServiceConnectionState: Schema.Struct({
        status: Schema.Literals([
          "Pending",
          "Approved",
          "Rejected",
          "Disconnected",
        ]),
        description: Schema.String,
        actionsRequired: Schema.optional(Schema.String),
      }),
    }),
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
export type IotDpsResourceDeletePrivateEndpointConnectionOutput =
  typeof IotDpsResourceDeletePrivateEndpointConnectionOutput.Type;

// The operation
/**
 * Delete private endpoint connection
 *
 * Delete private endpoint connection with the specified name
 */
export const IotDpsResourceDeletePrivateEndpointConnection =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IotDpsResourceDeletePrivateEndpointConnectionInput,
    outputSchema: IotDpsResourceDeletePrivateEndpointConnectionOutput,
  }));
// Input Schema
export const IotDpsResourceGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    provisioningServiceName: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Devices/provisioningServices/{provisioningServiceName}",
  }),
);
export type IotDpsResourceGetInput = typeof IotDpsResourceGetInput.Type;

// Output Schema
export const IotDpsResourceGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.String,
    resourcegroup: Schema.optional(Schema.String),
    subscriptionid: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type IotDpsResourceGetOutput = typeof IotDpsResourceGetOutput.Type;

// The operation
/**
 * Get the non-security related metadata of the provisioning service.
 *
 * Get the metadata of the provisioning service without SAS keys.
 *
 * @param provisioningServiceName - Name of the provisioning service to retrieve.
 * @param resourceGroupName - Resource group name.
 */
export const IotDpsResourceGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: IotDpsResourceGetInput,
  outputSchema: IotDpsResourceGetOutput,
}));
// Input Schema
export const IotDpsResourceGetOperationResultInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    operationId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    provisioningServiceName: Schema.String.pipe(T.PathParam()),
    asyncinfo: Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Devices/provisioningServices/{provisioningServiceName}/operationresults/{operationId}",
    }),
  );
export type IotDpsResourceGetOperationResultInput =
  typeof IotDpsResourceGetOperationResultInput.Type;

// Output Schema
export const IotDpsResourceGetOperationResultOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    status: Schema.optional(Schema.String),
    error: Schema.optional(
      Schema.Struct({
        code: Schema.optional(Schema.String),
        message: Schema.optional(Schema.String),
        details: Schema.optional(Schema.String),
      }),
    ),
  });
export type IotDpsResourceGetOperationResultOutput =
  typeof IotDpsResourceGetOperationResultOutput.Type;

// The operation
/**
 * Gets the status of a long running operation, such as create, update or delete a provisioning service.
 *
 * @param operationId - Operation id corresponding to long running operation. Use this to poll for the status.
 * @param resourceGroupName - Resource group identifier.
 * @param provisioningServiceName - Name of provisioning service that the operation is running on.
 * @param asyncinfo - Async header used to poll on the status of the operation, obtained while creating the long running operation.
 */
export const IotDpsResourceGetOperationResult =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IotDpsResourceGetOperationResultInput,
    outputSchema: IotDpsResourceGetOperationResultOutput,
  }));
// Input Schema
export const IotDpsResourceGetPrivateEndpointConnectionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Devices/provisioningServices/{resourceName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type IotDpsResourceGetPrivateEndpointConnectionInput =
  typeof IotDpsResourceGetPrivateEndpointConnectionInput.Type;

// Output Schema
export const IotDpsResourceGetPrivateEndpointConnectionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    properties: Schema.Struct({
      privateEndpoint: Schema.optional(
        Schema.Struct({
          id: Schema.optional(Schema.String),
        }),
      ),
      privateLinkServiceConnectionState: Schema.Struct({
        status: Schema.Literals([
          "Pending",
          "Approved",
          "Rejected",
          "Disconnected",
        ]),
        description: Schema.String,
        actionsRequired: Schema.optional(Schema.String),
      }),
    }),
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
export type IotDpsResourceGetPrivateEndpointConnectionOutput =
  typeof IotDpsResourceGetPrivateEndpointConnectionOutput.Type;

// The operation
/**
 * Get private endpoint connection
 *
 * Get private endpoint connection properties
 */
export const IotDpsResourceGetPrivateEndpointConnection =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IotDpsResourceGetPrivateEndpointConnectionInput,
    outputSchema: IotDpsResourceGetPrivateEndpointConnectionOutput,
  }));
// Input Schema
export const IotDpsResourceGetPrivateLinkResourcesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Devices/provisioningServices/{resourceName}/privateLinkResources/{groupId}",
    }),
  );
export type IotDpsResourceGetPrivateLinkResourcesInput =
  typeof IotDpsResourceGetPrivateLinkResourcesInput.Type;

// Output Schema
export const IotDpsResourceGetPrivateLinkResourcesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    properties: Schema.Struct({
      groupId: Schema.optional(Schema.String),
      requiredMembers: Schema.optional(Schema.Array(Schema.String)),
      requiredZoneNames: Schema.optional(Schema.Array(Schema.String)),
    }),
  });
export type IotDpsResourceGetPrivateLinkResourcesOutput =
  typeof IotDpsResourceGetPrivateLinkResourcesOutput.Type;

// The operation
/**
 * Get the specified private link resource
 *
 * Get the specified private link resource for the given provisioning service
 */
export const IotDpsResourceGetPrivateLinkResources =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IotDpsResourceGetPrivateLinkResourcesInput,
    outputSchema: IotDpsResourceGetPrivateLinkResourcesOutput,
  }));
// Input Schema
export const IotDpsResourceListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Devices/provisioningServices",
    }),
  );
export type IotDpsResourceListByResourceGroupInput =
  typeof IotDpsResourceListByResourceGroupInput.Type;

// Output Schema
export const IotDpsResourceListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.String,
          resourcegroup: Schema.optional(Schema.String),
          subscriptionid: Schema.optional(Schema.String),
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type IotDpsResourceListByResourceGroupOutput =
  typeof IotDpsResourceListByResourceGroupOutput.Type;

// The operation
/**
 * Get a list of all provisioning services in the given resource group.
 *
 * @param resourceGroupName - Resource group identifier.
 */
export const IotDpsResourceListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IotDpsResourceListByResourceGroupInput,
    outputSchema: IotDpsResourceListByResourceGroupOutput,
  }));
// Input Schema
export const IotDpsResourceListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Devices/provisioningServices",
    }),
  );
export type IotDpsResourceListBySubscriptionInput =
  typeof IotDpsResourceListBySubscriptionInput.Type;

// Output Schema
export const IotDpsResourceListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.String,
          resourcegroup: Schema.optional(Schema.String),
          subscriptionid: Schema.optional(Schema.String),
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type IotDpsResourceListBySubscriptionOutput =
  typeof IotDpsResourceListBySubscriptionOutput.Type;

// The operation
/**
 * Get all the provisioning services in a subscription.
 *
 * List all the provisioning services for a given subscription id.
 */
export const IotDpsResourceListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IotDpsResourceListBySubscriptionInput,
    outputSchema: IotDpsResourceListBySubscriptionOutput,
  }));
// Input Schema
export const IotDpsResourceListKeysInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    provisioningServiceName: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Devices/provisioningServices/{provisioningServiceName}/listkeys",
    }),
  );
export type IotDpsResourceListKeysInput =
  typeof IotDpsResourceListKeysInput.Type;

// Output Schema
export const IotDpsResourceListKeysOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          keyName: Schema.String,
          primaryKey: Schema.optional(Schema.String),
          secondaryKey: Schema.optional(Schema.String),
          rights: Schema.Literals([
            "ServiceConfig",
            "EnrollmentRead",
            "EnrollmentWrite",
            "DeviceConnect",
            "RegistrationStatusRead",
            "RegistrationStatusWrite",
          ]),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type IotDpsResourceListKeysOutput =
  typeof IotDpsResourceListKeysOutput.Type;

// The operation
/**
 * Get the security metadata for a provisioning service.
 *
 * List the primary and secondary keys for a provisioning service.
 *
 * @param provisioningServiceName - The provisioning service name to get the shared access keys for.
 * @param resourceGroupName - resource group name
 */
export const IotDpsResourceListKeys = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IotDpsResourceListKeysInput,
    outputSchema: IotDpsResourceListKeysOutput,
  }),
);
// Input Schema
export const IotDpsResourceListKeysForKeyNameInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    provisioningServiceName: Schema.String.pipe(T.PathParam()),
    keyName: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Devices/provisioningServices/{provisioningServiceName}/keys/{keyName}/listkeys",
    }),
  );
export type IotDpsResourceListKeysForKeyNameInput =
  typeof IotDpsResourceListKeysForKeyNameInput.Type;

// Output Schema
export const IotDpsResourceListKeysForKeyNameOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    keyName: Schema.String,
    primaryKey: Schema.optional(Schema.String),
    secondaryKey: Schema.optional(Schema.String),
    rights: Schema.Literals([
      "ServiceConfig",
      "EnrollmentRead",
      "EnrollmentWrite",
      "DeviceConnect",
      "RegistrationStatusRead",
      "RegistrationStatusWrite",
    ]),
  });
export type IotDpsResourceListKeysForKeyNameOutput =
  typeof IotDpsResourceListKeysForKeyNameOutput.Type;

// The operation
/**
 * Get a shared access policy by name from a provisioning service.
 *
 * List primary and secondary keys for a specific key name
 *
 * @param provisioningServiceName - Name of the provisioning service.
 * @param keyName - Logical key name to get key-values for.
 * @param resourceGroupName - The name of the resource group that contains the provisioning service.
 */
export const IotDpsResourceListKeysForKeyName =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IotDpsResourceListKeysForKeyNameInput,
    outputSchema: IotDpsResourceListKeysForKeyNameOutput,
  }));
// Input Schema
export const IotDpsResourceListPrivateEndpointConnectionsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Devices/provisioningServices/{resourceName}/privateEndpointConnections",
    }),
  );
export type IotDpsResourceListPrivateEndpointConnectionsInput =
  typeof IotDpsResourceListPrivateEndpointConnectionsInput.Type;

// Output Schema
export const IotDpsResourceListPrivateEndpointConnectionsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
    Schema.Struct({
      id: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      type: Schema.optional(Schema.String),
      properties: Schema.Struct({
        privateEndpoint: Schema.optional(
          Schema.Struct({
            id: Schema.optional(Schema.String),
          }),
        ),
        privateLinkServiceConnectionState: Schema.Struct({
          status: Schema.Literals([
            "Pending",
            "Approved",
            "Rejected",
            "Disconnected",
          ]),
          description: Schema.String,
          actionsRequired: Schema.optional(Schema.String),
        }),
      }),
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
    }),
  );
export type IotDpsResourceListPrivateEndpointConnectionsOutput =
  typeof IotDpsResourceListPrivateEndpointConnectionsOutput.Type;

// The operation
/**
 * List private endpoint connections
 *
 * List private endpoint connection properties
 */
export const IotDpsResourceListPrivateEndpointConnections =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IotDpsResourceListPrivateEndpointConnectionsInput,
    outputSchema: IotDpsResourceListPrivateEndpointConnectionsOutput,
  }));
// Input Schema
export const IotDpsResourceListPrivateLinkResourcesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Devices/provisioningServices/{resourceName}/privateLinkResources",
    }),
  );
export type IotDpsResourceListPrivateLinkResourcesInput =
  typeof IotDpsResourceListPrivateLinkResourcesInput.Type;

// Output Schema
export const IotDpsResourceListPrivateLinkResourcesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          properties: Schema.Struct({
            groupId: Schema.optional(Schema.String),
            requiredMembers: Schema.optional(Schema.Array(Schema.String)),
            requiredZoneNames: Schema.optional(Schema.Array(Schema.String)),
          }),
        }),
      ),
    ),
  });
export type IotDpsResourceListPrivateLinkResourcesOutput =
  typeof IotDpsResourceListPrivateLinkResourcesOutput.Type;

// The operation
/**
 * List private link resources
 *
 * List private link resources for the given provisioning service
 */
export const IotDpsResourceListPrivateLinkResources =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IotDpsResourceListPrivateLinkResourcesInput,
    outputSchema: IotDpsResourceListPrivateLinkResourcesOutput,
  }));
// Input Schema
export const IotDpsResourceListValidSkusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    provisioningServiceName: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Devices/provisioningServices/{provisioningServiceName}/skus",
    }),
  );
export type IotDpsResourceListValidSkusInput =
  typeof IotDpsResourceListValidSkusInput.Type;

// Output Schema
export const IotDpsResourceListValidSkusOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          name: Schema.optional(Schema.Literals(["S1"])),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type IotDpsResourceListValidSkusOutput =
  typeof IotDpsResourceListValidSkusOutput.Type;

// The operation
/**
 * Get the list of valid SKUs for a provisioning service.
 *
 * Gets the list of valid SKUs and tiers for a provisioning service.
 *
 * @param provisioningServiceName - Name of provisioning service.
 * @param resourceGroupName - Name of resource group.
 */
export const IotDpsResourceListValidSkus = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IotDpsResourceListValidSkusInput,
    outputSchema: IotDpsResourceListValidSkusOutput,
  }),
);
// Input Schema
export const IotDpsResourceUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    provisioningServiceName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Devices/provisioningServices/{provisioningServiceName}",
    }),
  );
export type IotDpsResourceUpdateInput = typeof IotDpsResourceUpdateInput.Type;

// Output Schema
export const IotDpsResourceUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.String,
    resourcegroup: Schema.optional(Schema.String),
    subscriptionid: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type IotDpsResourceUpdateOutput = typeof IotDpsResourceUpdateOutput.Type;

// The operation
/**
 * Update an existing provisioning service's tags.
 *
 * Update an existing provisioning service's tags. to update other fields use the CreateOrUpdate method
 *
 * @param resourceGroupName - Resource group identifier.
 * @param provisioningServiceName - Name of provisioning service to create or update.
 */
export const IotDpsResourceUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IotDpsResourceUpdateInput,
    outputSchema: IotDpsResourceUpdateOutput,
  }),
);
// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({ method: "GET", path: "/providers/Microsoft.Devices/operations" }),
);
export type OperationsListInput = typeof OperationsListInput.Type;

// Output Schema
export const OperationsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        name: Schema.optional(Schema.String),
        display: Schema.optional(
          Schema.Struct({
            provider: Schema.optional(Schema.String),
            resource: Schema.optional(Schema.String),
            operation: Schema.optional(Schema.String),
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
 * Lists all of the available Microsoft.Devices REST API operations.
 */
export const OperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationsListInput,
  outputSchema: OperationsListOutput,
}));
