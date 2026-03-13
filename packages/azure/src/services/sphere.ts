/**
 * Azure Sphere API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const CatalogsCountDevicesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    catalogName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/countDevices",
    }),
  );
export type CatalogsCountDevicesInput = typeof CatalogsCountDevicesInput.Type;

// Output Schema
export const CatalogsCountDevicesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Number,
  });
export type CatalogsCountDevicesOutput = typeof CatalogsCountDevicesOutput.Type;

// The operation
/**
 * Counts devices in catalog.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param catalogName - Name of catalog
 */
export const CatalogsCountDevices = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CatalogsCountDevicesInput,
    outputSchema: CatalogsCountDevicesOutput,
  }),
);
// Input Schema
export const CatalogsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    catalogName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}",
    }),
  );
export type CatalogsCreateOrUpdateInput =
  typeof CatalogsCreateOrUpdateInput.Type;

// Output Schema
export const CatalogsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type CatalogsCreateOrUpdateOutput =
  typeof CatalogsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a Catalog
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param catalogName - Name of catalog
 */
export const CatalogsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CatalogsCreateOrUpdateInput,
    outputSchema: CatalogsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const CatalogsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  catalogName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}",
  }),
);
export type CatalogsDeleteInput = typeof CatalogsDeleteInput.Type;

// Output Schema
export const CatalogsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CatalogsDeleteOutput = typeof CatalogsDeleteOutput.Type;

// The operation
/**
 * Delete a Catalog
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param catalogName - Name of catalog
 */
export const CatalogsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CatalogsDeleteInput,
  outputSchema: CatalogsDeleteOutput,
}));
// Input Schema
export const CatalogsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  catalogName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}",
  }),
);
export type CatalogsGetInput = typeof CatalogsGetInput.Type;

// Output Schema
export const CatalogsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type CatalogsGetOutput = typeof CatalogsGetOutput.Type;

// The operation
/**
 * Get a Catalog
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param catalogName - Name of catalog
 */
export const CatalogsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CatalogsGetInput,
  outputSchema: CatalogsGetOutput,
}));
// Input Schema
export const CatalogsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs",
    }),
  );
export type CatalogsListByResourceGroupInput =
  typeof CatalogsListByResourceGroupInput.Type;

// Output Schema
export const CatalogsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type CatalogsListByResourceGroupOutput =
  typeof CatalogsListByResourceGroupOutput.Type;

// The operation
/**
 * List Catalog resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const CatalogsListByResourceGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CatalogsListByResourceGroupInput,
    outputSchema: CatalogsListByResourceGroupOutput,
  }),
);
// Input Schema
export const CatalogsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AzureSphere/catalogs",
    }),
  );
export type CatalogsListBySubscriptionInput =
  typeof CatalogsListBySubscriptionInput.Type;

// Output Schema
export const CatalogsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type CatalogsListBySubscriptionOutput =
  typeof CatalogsListBySubscriptionOutput.Type;

// The operation
/**
 * List Catalog resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const CatalogsListBySubscription = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CatalogsListBySubscriptionInput,
    outputSchema: CatalogsListBySubscriptionOutput,
  }),
);
// Input Schema
export const CatalogsListDeploymentsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    catalogName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/listDeployments",
    }),
  );
export type CatalogsListDeploymentsInput =
  typeof CatalogsListDeploymentsInput.Type;

// Output Schema
export const CatalogsListDeploymentsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type CatalogsListDeploymentsOutput =
  typeof CatalogsListDeploymentsOutput.Type;

// The operation
/**
 * Lists deployments for catalog.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param catalogName - Name of catalog
 */
export const CatalogsListDeployments = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CatalogsListDeploymentsInput,
    outputSchema: CatalogsListDeploymentsOutput,
  }),
);
// Input Schema
export const CatalogsListDeviceGroupsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    catalogName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/listDeviceGroups",
    }),
  );
export type CatalogsListDeviceGroupsInput =
  typeof CatalogsListDeviceGroupsInput.Type;

// Output Schema
export const CatalogsListDeviceGroupsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type CatalogsListDeviceGroupsOutput =
  typeof CatalogsListDeviceGroupsOutput.Type;

// The operation
/**
 * List the device groups for the catalog.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param catalogName - Name of catalog
 */
export const CatalogsListDeviceGroups = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CatalogsListDeviceGroupsInput,
    outputSchema: CatalogsListDeviceGroupsOutput,
  }),
);
// Input Schema
export const CatalogsListDeviceInsightsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    catalogName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/listDeviceInsights",
    }),
  );
export type CatalogsListDeviceInsightsInput =
  typeof CatalogsListDeviceInsightsInput.Type;

// Output Schema
export const CatalogsListDeviceInsightsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        deviceId: Schema.String,
        description: Schema.String,
        startTimestampUtc: Schema.String,
        endTimestampUtc: Schema.String,
        eventCategory: Schema.String,
        eventClass: Schema.String,
        eventType: Schema.String,
        eventCount: Schema.Number,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type CatalogsListDeviceInsightsOutput =
  typeof CatalogsListDeviceInsightsOutput.Type;

// The operation
/**
 * Lists device insights for catalog.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param catalogName - Name of catalog
 */
export const CatalogsListDeviceInsights = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CatalogsListDeviceInsightsInput,
    outputSchema: CatalogsListDeviceInsightsOutput,
  }),
);
// Input Schema
export const CatalogsListDevicesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    catalogName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/listDevices",
    }),
  );
export type CatalogsListDevicesInput = typeof CatalogsListDevicesInput.Type;

// Output Schema
export const CatalogsListDevicesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type CatalogsListDevicesOutput = typeof CatalogsListDevicesOutput.Type;

// The operation
/**
 * Lists devices for catalog.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param catalogName - Name of catalog
 */
export const CatalogsListDevices = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CatalogsListDevicesInput,
  outputSchema: CatalogsListDevicesOutput,
}));
// Input Schema
export const CatalogsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  catalogName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}",
  }),
);
export type CatalogsUpdateInput = typeof CatalogsUpdateInput.Type;

// Output Schema
export const CatalogsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type CatalogsUpdateOutput = typeof CatalogsUpdateOutput.Type;

// The operation
/**
 * Update a Catalog
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param catalogName - Name of catalog
 */
export const CatalogsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CatalogsUpdateInput,
  outputSchema: CatalogsUpdateOutput,
}));
// Input Schema
export const CatalogsUploadImageInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    catalogName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/uploadImage",
    }),
  );
export type CatalogsUploadImageInput = typeof CatalogsUploadImageInput.Type;

// Output Schema
export const CatalogsUploadImageOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CatalogsUploadImageOutput = typeof CatalogsUploadImageOutput.Type;

// The operation
/**
 * Creates an image. Use this action when the image ID is unknown.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param catalogName - Name of catalog
 */
export const CatalogsUploadImage = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CatalogsUploadImageInput,
  outputSchema: CatalogsUploadImageOutput,
}));
// Input Schema
export const CertificatesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  catalogName: Schema.String.pipe(T.PathParam()),
  serialNumber: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/certificates/{serialNumber}",
  }),
);
export type CertificatesGetInput = typeof CertificatesGetInput.Type;

// Output Schema
export const CertificatesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type CertificatesGetOutput = typeof CertificatesGetOutput.Type;

// The operation
/**
 * Get a Certificate
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param catalogName - Name of catalog
 * @param serialNumber - Serial number of the certificate. Use '.default' to get current active certificate.
 */
export const CertificatesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CertificatesGetInput,
  outputSchema: CertificatesGetOutput,
}));
// Input Schema
export const CertificatesListByCatalogInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    catalogName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/certificates",
    }),
  );
export type CertificatesListByCatalogInput =
  typeof CertificatesListByCatalogInput.Type;

// Output Schema
export const CertificatesListByCatalogOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type CertificatesListByCatalogOutput =
  typeof CertificatesListByCatalogOutput.Type;

// The operation
/**
 * List Certificate resources by Catalog
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param catalogName - Name of catalog
 */
export const CertificatesListByCatalog = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CertificatesListByCatalogInput,
    outputSchema: CertificatesListByCatalogOutput,
  }),
);
// Input Schema
export const CertificatesRetrieveCertChainInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    catalogName: Schema.String.pipe(T.PathParam()),
    serialNumber: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/certificates/{serialNumber}/retrieveCertChain",
    }),
  );
export type CertificatesRetrieveCertChainInput =
  typeof CertificatesRetrieveCertChainInput.Type;

// Output Schema
export const CertificatesRetrieveCertChainOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    certificateChain: Schema.optional(Schema.String),
  });
export type CertificatesRetrieveCertChainOutput =
  typeof CertificatesRetrieveCertChainOutput.Type;

// The operation
/**
 * Retrieves cert chain.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param catalogName - Name of catalog
 * @param serialNumber - Serial number of the certificate. Use '.default' to get current active certificate.
 */
export const CertificatesRetrieveCertChain =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CertificatesRetrieveCertChainInput,
    outputSchema: CertificatesRetrieveCertChainOutput,
  }));
// Input Schema
export const CertificatesRetrieveProofOfPossessionNonceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    catalogName: Schema.String.pipe(T.PathParam()),
    serialNumber: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/certificates/{serialNumber}/retrieveProofOfPossessionNonce",
    }),
  );
export type CertificatesRetrieveProofOfPossessionNonceInput =
  typeof CertificatesRetrieveProofOfPossessionNonceInput.Type;

// Output Schema
export const CertificatesRetrieveProofOfPossessionNonceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    certificate: Schema.optional(Schema.String),
    status: Schema.optional(
      Schema.Literals(["Active", "Inactive", "Expired", "Revoked"]),
    ),
    subject: Schema.optional(Schema.String),
    thumbprint: Schema.optional(Schema.String),
    expiryUtc: Schema.optional(Schema.String),
    notBeforeUtc: Schema.optional(Schema.String),
    provisioningState: Schema.optional(
      Schema.Literals([
        "Succeeded",
        "Failed",
        "Canceled",
        "Provisioning",
        "Updating",
        "Deleting",
        "Accepted",
      ]),
    ),
  });
export type CertificatesRetrieveProofOfPossessionNonceOutput =
  typeof CertificatesRetrieveProofOfPossessionNonceOutput.Type;

// The operation
/**
 * Gets the proof of possession nonce.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param catalogName - Name of catalog
 * @param serialNumber - Serial number of the certificate. Use '.default' to get current active certificate.
 */
export const CertificatesRetrieveProofOfPossessionNonce =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CertificatesRetrieveProofOfPossessionNonceInput,
    outputSchema: CertificatesRetrieveProofOfPossessionNonceOutput,
  }));
// Input Schema
export const DeploymentsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    catalogName: Schema.String.pipe(T.PathParam()),
    productName: Schema.String.pipe(T.PathParam()),
    deviceGroupName: Schema.String.pipe(T.PathParam()),
    deploymentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}/deviceGroups/{deviceGroupName}/deployments/{deploymentName}",
    }),
  );
export type DeploymentsCreateOrUpdateInput =
  typeof DeploymentsCreateOrUpdateInput.Type;

// Output Schema
export const DeploymentsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DeploymentsCreateOrUpdateOutput =
  typeof DeploymentsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a Deployment. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param catalogName - Name of catalog
 * @param productName - Name of product.
 * @param deviceGroupName - Name of device group.
 * @param deploymentName - Deployment name. Use .default for deployment creation and to get the current deployment for the associated device group.
 */
export const DeploymentsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DeploymentsCreateOrUpdateInput,
    outputSchema: DeploymentsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const DeploymentsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    catalogName: Schema.String.pipe(T.PathParam()),
    productName: Schema.String.pipe(T.PathParam()),
    deviceGroupName: Schema.String.pipe(T.PathParam()),
    deploymentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}/deviceGroups/{deviceGroupName}/deployments/{deploymentName}",
  }),
);
export type DeploymentsDeleteInput = typeof DeploymentsDeleteInput.Type;

// Output Schema
export const DeploymentsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DeploymentsDeleteOutput = typeof DeploymentsDeleteOutput.Type;

// The operation
/**
 * Delete a Deployment. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param catalogName - Name of catalog
 * @param productName - Name of product.
 * @param deviceGroupName - Name of device group.
 * @param deploymentName - Deployment name. Use .default for deployment creation and to get the current deployment for the associated device group.
 */
export const DeploymentsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DeploymentsDeleteInput,
  outputSchema: DeploymentsDeleteOutput,
}));
// Input Schema
export const DeploymentsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  catalogName: Schema.String.pipe(T.PathParam()),
  productName: Schema.String.pipe(T.PathParam()),
  deviceGroupName: Schema.String.pipe(T.PathParam()),
  deploymentName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}/deviceGroups/{deviceGroupName}/deployments/{deploymentName}",
  }),
);
export type DeploymentsGetInput = typeof DeploymentsGetInput.Type;

// Output Schema
export const DeploymentsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type DeploymentsGetOutput = typeof DeploymentsGetOutput.Type;

// The operation
/**
 * Get a Deployment. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param catalogName - Name of catalog
 * @param productName - Name of product.
 * @param deviceGroupName - Name of device group.
 * @param deploymentName - Deployment name. Use .default for deployment creation and to get the current deployment for the associated device group.
 */
export const DeploymentsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DeploymentsGetInput,
  outputSchema: DeploymentsGetOutput,
}));
// Input Schema
export const DeploymentsListByDeviceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    catalogName: Schema.String.pipe(T.PathParam()),
    productName: Schema.String.pipe(T.PathParam()),
    deviceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}/deviceGroups/{deviceGroupName}/deployments",
    }),
  );
export type DeploymentsListByDeviceGroupInput =
  typeof DeploymentsListByDeviceGroupInput.Type;

// Output Schema
export const DeploymentsListByDeviceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type DeploymentsListByDeviceGroupOutput =
  typeof DeploymentsListByDeviceGroupOutput.Type;

// The operation
/**
 * List Deployment resources by DeviceGroup. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param catalogName - Name of catalog
 * @param productName - Name of product.
 * @param deviceGroupName - Name of device group.
 */
export const DeploymentsListByDeviceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeploymentsListByDeviceGroupInput,
    outputSchema: DeploymentsListByDeviceGroupOutput,
  }));
// Input Schema
export const DeviceGroupsClaimDevicesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    catalogName: Schema.String.pipe(T.PathParam()),
    productName: Schema.String.pipe(T.PathParam()),
    deviceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}/deviceGroups/{deviceGroupName}/claimDevices",
    }),
  );
export type DeviceGroupsClaimDevicesInput =
  typeof DeviceGroupsClaimDevicesInput.Type;

// Output Schema
export const DeviceGroupsClaimDevicesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DeviceGroupsClaimDevicesOutput =
  typeof DeviceGroupsClaimDevicesOutput.Type;

// The operation
/**
 * Bulk claims the devices. Use '.unassigned' or '.default' for the device group and product names when bulk claiming devices to a catalog only.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param catalogName - Name of catalog
 * @param productName - Name of product.
 * @param deviceGroupName - Name of device group.
 */
export const DeviceGroupsClaimDevices = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DeviceGroupsClaimDevicesInput,
    outputSchema: DeviceGroupsClaimDevicesOutput,
  }),
);
// Input Schema
export const DeviceGroupsCountDevicesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    catalogName: Schema.String.pipe(T.PathParam()),
    productName: Schema.String.pipe(T.PathParam()),
    deviceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}/deviceGroups/{deviceGroupName}/countDevices",
    }),
  );
export type DeviceGroupsCountDevicesInput =
  typeof DeviceGroupsCountDevicesInput.Type;

// Output Schema
export const DeviceGroupsCountDevicesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Number,
  });
export type DeviceGroupsCountDevicesOutput =
  typeof DeviceGroupsCountDevicesOutput.Type;

// The operation
/**
 * Counts devices in device group. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param catalogName - Name of catalog
 * @param productName - Name of product.
 * @param deviceGroupName - Name of device group.
 */
export const DeviceGroupsCountDevices = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DeviceGroupsCountDevicesInput,
    outputSchema: DeviceGroupsCountDevicesOutput,
  }),
);
// Input Schema
export const DeviceGroupsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    catalogName: Schema.String.pipe(T.PathParam()),
    productName: Schema.String.pipe(T.PathParam()),
    deviceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}/deviceGroups/{deviceGroupName}",
    }),
  );
export type DeviceGroupsCreateOrUpdateInput =
  typeof DeviceGroupsCreateOrUpdateInput.Type;

// Output Schema
export const DeviceGroupsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DeviceGroupsCreateOrUpdateOutput =
  typeof DeviceGroupsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a DeviceGroup. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param catalogName - Name of catalog
 * @param productName - Name of product.
 * @param deviceGroupName - Name of device group.
 */
export const DeviceGroupsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DeviceGroupsCreateOrUpdateInput,
    outputSchema: DeviceGroupsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const DeviceGroupsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    catalogName: Schema.String.pipe(T.PathParam()),
    productName: Schema.String.pipe(T.PathParam()),
    deviceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}/deviceGroups/{deviceGroupName}",
    }),
  );
export type DeviceGroupsDeleteInput = typeof DeviceGroupsDeleteInput.Type;

// Output Schema
export const DeviceGroupsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DeviceGroupsDeleteOutput = typeof DeviceGroupsDeleteOutput.Type;

// The operation
/**
 * Delete a DeviceGroup. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param catalogName - Name of catalog
 * @param productName - Name of product.
 * @param deviceGroupName - Name of device group.
 */
export const DeviceGroupsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DeviceGroupsDeleteInput,
  outputSchema: DeviceGroupsDeleteOutput,
}));
// Input Schema
export const DeviceGroupsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  catalogName: Schema.String.pipe(T.PathParam()),
  productName: Schema.String.pipe(T.PathParam()),
  deviceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}/deviceGroups/{deviceGroupName}",
  }),
);
export type DeviceGroupsGetInput = typeof DeviceGroupsGetInput.Type;

// Output Schema
export const DeviceGroupsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type DeviceGroupsGetOutput = typeof DeviceGroupsGetOutput.Type;

// The operation
/**
 * Get a DeviceGroup. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param catalogName - Name of catalog
 * @param productName - Name of product.
 * @param deviceGroupName - Name of device group.
 */
export const DeviceGroupsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DeviceGroupsGetInput,
  outputSchema: DeviceGroupsGetOutput,
}));
// Input Schema
export const DeviceGroupsListByProductInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    catalogName: Schema.String.pipe(T.PathParam()),
    productName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}/deviceGroups",
    }),
  );
export type DeviceGroupsListByProductInput =
  typeof DeviceGroupsListByProductInput.Type;

// Output Schema
export const DeviceGroupsListByProductOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type DeviceGroupsListByProductOutput =
  typeof DeviceGroupsListByProductOutput.Type;

// The operation
/**
 * List DeviceGroup resources by Product. '.default' and '.unassigned' are system defined values and cannot be used for product name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param catalogName - Name of catalog
 * @param productName - Name of product.
 */
export const DeviceGroupsListByProduct = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DeviceGroupsListByProductInput,
    outputSchema: DeviceGroupsListByProductOutput,
  }),
);
// Input Schema
export const DeviceGroupsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    catalogName: Schema.String.pipe(T.PathParam()),
    productName: Schema.String.pipe(T.PathParam()),
    deviceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}/deviceGroups/{deviceGroupName}",
    }),
  );
export type DeviceGroupsUpdateInput = typeof DeviceGroupsUpdateInput.Type;

// Output Schema
export const DeviceGroupsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DeviceGroupsUpdateOutput = typeof DeviceGroupsUpdateOutput.Type;

// The operation
/**
 * Update a DeviceGroup. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param catalogName - Name of catalog
 * @param productName - Name of product.
 * @param deviceGroupName - Name of device group.
 */
export const DeviceGroupsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DeviceGroupsUpdateInput,
  outputSchema: DeviceGroupsUpdateOutput,
}));
// Input Schema
export const DevicesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    catalogName: Schema.String.pipe(T.PathParam()),
    productName: Schema.String.pipe(T.PathParam()),
    deviceGroupName: Schema.String.pipe(T.PathParam()),
    deviceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}/deviceGroups/{deviceGroupName}/devices/{deviceName}",
    }),
  );
export type DevicesCreateOrUpdateInput = typeof DevicesCreateOrUpdateInput.Type;

// Output Schema
export const DevicesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DevicesCreateOrUpdateOutput =
  typeof DevicesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a Device. Use '.unassigned' or '.default' for the device group and product names to claim a device to the catalog only.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param catalogName - Name of catalog
 * @param productName - Name of product.
 * @param deviceGroupName - Name of device group.
 * @param deviceName - Device name
 */
export const DevicesCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DevicesCreateOrUpdateInput,
    outputSchema: DevicesCreateOrUpdateOutput,
  }),
);
// Input Schema
export const DevicesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  catalogName: Schema.String.pipe(T.PathParam()),
  productName: Schema.String.pipe(T.PathParam()),
  deviceGroupName: Schema.String.pipe(T.PathParam()),
  deviceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}/deviceGroups/{deviceGroupName}/devices/{deviceName}",
  }),
);
export type DevicesDeleteInput = typeof DevicesDeleteInput.Type;

// Output Schema
export const DevicesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DevicesDeleteOutput = typeof DevicesDeleteOutput.Type;

// The operation
/**
 * Delete a Device
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param catalogName - Name of catalog
 * @param productName - Name of product.
 * @param deviceGroupName - Name of device group.
 * @param deviceName - Device name
 */
export const DevicesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DevicesDeleteInput,
  outputSchema: DevicesDeleteOutput,
}));
// Input Schema
export const DevicesGenerateCapabilityImageInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    catalogName: Schema.String.pipe(T.PathParam()),
    productName: Schema.String.pipe(T.PathParam()),
    deviceGroupName: Schema.String.pipe(T.PathParam()),
    deviceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}/deviceGroups/{deviceGroupName}/devices/{deviceName}/generateCapabilityImage",
    }),
  );
export type DevicesGenerateCapabilityImageInput =
  typeof DevicesGenerateCapabilityImageInput.Type;

// Output Schema
export const DevicesGenerateCapabilityImageOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    image: Schema.optional(Schema.String),
  });
export type DevicesGenerateCapabilityImageOutput =
  typeof DevicesGenerateCapabilityImageOutput.Type;

// The operation
/**
 * Generates the capability image for the device. Use '.unassigned' or '.default' for the device group and product names to generate the image for a device that does not belong to a specific device group and product.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param catalogName - Name of catalog
 * @param productName - Name of product.
 * @param deviceGroupName - Name of device group.
 * @param deviceName - Device name
 */
export const DevicesGenerateCapabilityImage =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DevicesGenerateCapabilityImageInput,
    outputSchema: DevicesGenerateCapabilityImageOutput,
  }));
// Input Schema
export const DevicesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  catalogName: Schema.String.pipe(T.PathParam()),
  productName: Schema.String.pipe(T.PathParam()),
  deviceGroupName: Schema.String.pipe(T.PathParam()),
  deviceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}/deviceGroups/{deviceGroupName}/devices/{deviceName}",
  }),
);
export type DevicesGetInput = typeof DevicesGetInput.Type;

// Output Schema
export const DevicesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DevicesGetOutput = typeof DevicesGetOutput.Type;

// The operation
/**
 * Get a Device. Use '.unassigned' or '.default' for the device group and product names when a device does not belong to a device group and product.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param catalogName - Name of catalog
 * @param productName - Name of product.
 * @param deviceGroupName - Name of device group.
 * @param deviceName - Device name
 */
export const DevicesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DevicesGetInput,
  outputSchema: DevicesGetOutput,
}));
// Input Schema
export const DevicesListByDeviceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    catalogName: Schema.String.pipe(T.PathParam()),
    productName: Schema.String.pipe(T.PathParam()),
    deviceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}/deviceGroups/{deviceGroupName}/devices",
    }),
  );
export type DevicesListByDeviceGroupInput =
  typeof DevicesListByDeviceGroupInput.Type;

// Output Schema
export const DevicesListByDeviceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type DevicesListByDeviceGroupOutput =
  typeof DevicesListByDeviceGroupOutput.Type;

// The operation
/**
 * List Device resources by DeviceGroup. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param catalogName - Name of catalog
 * @param productName - Name of product.
 * @param deviceGroupName - Name of device group.
 */
export const DevicesListByDeviceGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DevicesListByDeviceGroupInput,
    outputSchema: DevicesListByDeviceGroupOutput,
  }),
);
// Input Schema
export const DevicesUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  catalogName: Schema.String.pipe(T.PathParam()),
  productName: Schema.String.pipe(T.PathParam()),
  deviceGroupName: Schema.String.pipe(T.PathParam()),
  deviceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}/deviceGroups/{deviceGroupName}/devices/{deviceName}",
  }),
);
export type DevicesUpdateInput = typeof DevicesUpdateInput.Type;

// Output Schema
export const DevicesUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type DevicesUpdateOutput = typeof DevicesUpdateOutput.Type;

// The operation
/**
 * Update a Device. Use '.unassigned' or '.default' for the device group and product names to move a device to the catalog level.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param catalogName - Name of catalog
 * @param productName - Name of product.
 * @param deviceGroupName - Name of device group.
 * @param deviceName - Device name
 */
export const DevicesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DevicesUpdateInput,
  outputSchema: DevicesUpdateOutput,
}));
// Input Schema
export const ImagesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    catalogName: Schema.String.pipe(T.PathParam()),
    imageName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/images/{imageName}",
    }),
  );
export type ImagesCreateOrUpdateInput = typeof ImagesCreateOrUpdateInput.Type;

// Output Schema
export const ImagesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ImagesCreateOrUpdateOutput = typeof ImagesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a Image
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param catalogName - Name of catalog
 * @param imageName - Image name. Use an image GUID for GA versions of the API.
 */
export const ImagesCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ImagesCreateOrUpdateInput,
    outputSchema: ImagesCreateOrUpdateOutput,
  }),
);
// Input Schema
export const ImagesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  catalogName: Schema.String.pipe(T.PathParam()),
  imageName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/images/{imageName}",
  }),
);
export type ImagesDeleteInput = typeof ImagesDeleteInput.Type;

// Output Schema
export const ImagesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ImagesDeleteOutput = typeof ImagesDeleteOutput.Type;

// The operation
/**
 * Delete a Image
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param catalogName - Name of catalog
 * @param imageName - Image name. Use an image GUID for GA versions of the API.
 */
export const ImagesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ImagesDeleteInput,
  outputSchema: ImagesDeleteOutput,
}));
// Input Schema
export const ImagesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  catalogName: Schema.String.pipe(T.PathParam()),
  imageName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/images/{imageName}",
  }),
);
export type ImagesGetInput = typeof ImagesGetInput.Type;

// Output Schema
export const ImagesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ImagesGetOutput = typeof ImagesGetOutput.Type;

// The operation
/**
 * Get a Image
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param catalogName - Name of catalog
 * @param imageName - Image name. Use an image GUID for GA versions of the API.
 */
export const ImagesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ImagesGetInput,
  outputSchema: ImagesGetOutput,
}));
// Input Schema
export const ImagesListByCatalogInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    catalogName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/images",
    }),
  );
export type ImagesListByCatalogInput = typeof ImagesListByCatalogInput.Type;

// Output Schema
export const ImagesListByCatalogOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type ImagesListByCatalogOutput = typeof ImagesListByCatalogOutput.Type;

// The operation
/**
 * List Image resources by Catalog
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param catalogName - Name of catalog
 */
export const ImagesListByCatalog = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ImagesListByCatalogInput,
  outputSchema: ImagesListByCatalogOutput,
}));
// Input Schema
export const ProductsCountDevicesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    catalogName: Schema.String.pipe(T.PathParam()),
    productName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}/countDevices",
    }),
  );
export type ProductsCountDevicesInput = typeof ProductsCountDevicesInput.Type;

// Output Schema
export const ProductsCountDevicesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Number,
  });
export type ProductsCountDevicesOutput = typeof ProductsCountDevicesOutput.Type;

// The operation
/**
 * Counts devices in product. '.default' and '.unassigned' are system defined values and cannot be used for product name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param catalogName - Name of catalog
 * @param productName - Name of product.
 */
export const ProductsCountDevices = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ProductsCountDevicesInput,
    outputSchema: ProductsCountDevicesOutput,
  }),
);
// Input Schema
export const ProductsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    catalogName: Schema.String.pipe(T.PathParam()),
    productName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}",
    }),
  );
export type ProductsCreateOrUpdateInput =
  typeof ProductsCreateOrUpdateInput.Type;

// Output Schema
export const ProductsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ProductsCreateOrUpdateOutput =
  typeof ProductsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a Product. '.default' and '.unassigned' are system defined values and cannot be used for product name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param catalogName - Name of catalog
 * @param productName - Name of product.
 */
export const ProductsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ProductsCreateOrUpdateInput,
    outputSchema: ProductsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const ProductsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  catalogName: Schema.String.pipe(T.PathParam()),
  productName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}",
  }),
);
export type ProductsDeleteInput = typeof ProductsDeleteInput.Type;

// Output Schema
export const ProductsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ProductsDeleteOutput = typeof ProductsDeleteOutput.Type;

// The operation
/**
 * Delete a Product. '.default' and '.unassigned' are system defined values and cannot be used for product name'
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param catalogName - Name of catalog
 * @param productName - Name of product.
 */
export const ProductsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ProductsDeleteInput,
  outputSchema: ProductsDeleteOutput,
}));
// Input Schema
export const ProductsGenerateDefaultDeviceGroupsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    catalogName: Schema.String.pipe(T.PathParam()),
    productName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}/generateDefaultDeviceGroups",
    }),
  );
export type ProductsGenerateDefaultDeviceGroupsInput =
  typeof ProductsGenerateDefaultDeviceGroupsInput.Type;

// Output Schema
export const ProductsGenerateDefaultDeviceGroupsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type ProductsGenerateDefaultDeviceGroupsOutput =
  typeof ProductsGenerateDefaultDeviceGroupsOutput.Type;

// The operation
/**
 * Generates default device groups for the product. '.default' and '.unassigned' are system defined values and cannot be used for product name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param catalogName - Name of catalog
 * @param productName - Name of product.
 */
export const ProductsGenerateDefaultDeviceGroups =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ProductsGenerateDefaultDeviceGroupsInput,
    outputSchema: ProductsGenerateDefaultDeviceGroupsOutput,
  }));
// Input Schema
export const ProductsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  catalogName: Schema.String.pipe(T.PathParam()),
  productName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}",
  }),
);
export type ProductsGetInput = typeof ProductsGetInput.Type;

// Output Schema
export const ProductsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ProductsGetOutput = typeof ProductsGetOutput.Type;

// The operation
/**
 * Get a Product. '.default' and '.unassigned' are system defined values and cannot be used for product name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param catalogName - Name of catalog
 * @param productName - Name of product.
 */
export const ProductsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ProductsGetInput,
  outputSchema: ProductsGetOutput,
}));
// Input Schema
export const ProductsListByCatalogInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    catalogName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products",
    }),
  );
export type ProductsListByCatalogInput = typeof ProductsListByCatalogInput.Type;

// Output Schema
export const ProductsListByCatalogOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type ProductsListByCatalogOutput =
  typeof ProductsListByCatalogOutput.Type;

// The operation
/**
 * List Product resources by Catalog
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param catalogName - Name of catalog
 */
export const ProductsListByCatalog = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ProductsListByCatalogInput,
    outputSchema: ProductsListByCatalogOutput,
  }),
);
// Input Schema
export const ProductsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  catalogName: Schema.String.pipe(T.PathParam()),
  productName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}",
  }),
);
export type ProductsUpdateInput = typeof ProductsUpdateInput.Type;

// Output Schema
export const ProductsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type ProductsUpdateOutput = typeof ProductsUpdateOutput.Type;

// The operation
/**
 * Update a Product. '.default' and '.unassigned' are system defined values and cannot be used for product name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param catalogName - Name of catalog
 * @param productName - Name of product.
 */
export const ProductsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ProductsUpdateInput,
  outputSchema: ProductsUpdateOutput,
}));
