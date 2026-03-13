/**
 * Azure Azurestack API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const CloudManifestFileGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    verificationVersion: Schema.String.pipe(T.PathParam()),
    versionCreationDate: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.AzureStack/cloudManifestFiles/{verificationVersion}",
    }),
  );
export type CloudManifestFileGetInput = typeof CloudManifestFileGetInput.Type;

// Output Schema
export const CloudManifestFileGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    etag: Schema.optional(Schema.String),
  });
export type CloudManifestFileGetOutput = typeof CloudManifestFileGetOutput.Type;

// The operation
/**
 * Returns a cloud specific manifest JSON file.
 *
 * @param verificationVersion - Signing verification key version.
 * @param versionCreationDate - Signing verification key version creation date.
 */
export const CloudManifestFileGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CloudManifestFileGetInput,
    outputSchema: CloudManifestFileGetOutput,
  }),
);
// Input Schema
export const CloudManifestFileListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.AzureStack/cloudManifestFiles",
    }),
  );
export type CloudManifestFileListInput = typeof CloudManifestFileListInput.Type;

// Output Schema
export const CloudManifestFileListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    etag: Schema.optional(Schema.String),
  });
export type CloudManifestFileListOutput =
  typeof CloudManifestFileListOutput.Type;

// The operation
/**
 * Returns a cloud specific manifest JSON file with latest version.
 */
export const CloudManifestFileList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CloudManifestFileListInput,
    outputSchema: CloudManifestFileListOutput,
  }),
);
// Input Schema
export const CustomerSubscriptionsCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroup: Schema.String.pipe(T.PathParam()),
    registrationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.AzureStack/registrations/{registrationName}/customerSubscriptions/{customerSubscriptionName}",
    }),
  );
export type CustomerSubscriptionsCreateInput =
  typeof CustomerSubscriptionsCreateInput.Type;

// Output Schema
export const CustomerSubscriptionsCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    etag: Schema.optional(Schema.String),
  });
export type CustomerSubscriptionsCreateOutput =
  typeof CustomerSubscriptionsCreateOutput.Type;

// The operation
/**
 * Creates a new customer subscription under a registration.
 *
 * @param subscriptionId - Subscription credentials that uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param resourceGroup - Name of the resource group.
 * @param registrationName - Name of the Azure Stack registration.
 * @param api-version - Client API Version.
 */
export const CustomerSubscriptionsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CustomerSubscriptionsCreateInput,
    outputSchema: CustomerSubscriptionsCreateOutput,
  }),
);
// Input Schema
export const CustomerSubscriptionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroup: Schema.String.pipe(T.PathParam()),
    registrationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.AzureStack/registrations/{registrationName}/customerSubscriptions/{customerSubscriptionName}",
    }),
  );
export type CustomerSubscriptionsDeleteInput =
  typeof CustomerSubscriptionsDeleteInput.Type;

// Output Schema
export const CustomerSubscriptionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CustomerSubscriptionsDeleteOutput =
  typeof CustomerSubscriptionsDeleteOutput.Type;

// The operation
/**
 * Deletes a customer subscription under a registration.
 *
 * @param subscriptionId - Subscription credentials that uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param resourceGroup - Name of the resource group.
 * @param registrationName - Name of the Azure Stack registration.
 * @param api-version - Client API Version.
 */
export const CustomerSubscriptionsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CustomerSubscriptionsDeleteInput,
    outputSchema: CustomerSubscriptionsDeleteOutput,
  }),
);
// Input Schema
export const CustomerSubscriptionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroup: Schema.String.pipe(T.PathParam()),
    registrationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.AzureStack/registrations/{registrationName}/customerSubscriptions/{customerSubscriptionName}",
    }),
  );
export type CustomerSubscriptionsGetInput =
  typeof CustomerSubscriptionsGetInput.Type;

// Output Schema
export const CustomerSubscriptionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    etag: Schema.optional(Schema.String),
  });
export type CustomerSubscriptionsGetOutput =
  typeof CustomerSubscriptionsGetOutput.Type;

// The operation
/**
 * Returns the specified product.
 *
 * @param subscriptionId - Subscription credentials that uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param resourceGroup - Name of the resource group.
 * @param registrationName - Name of the Azure Stack registration.
 * @param api-version - Client API Version.
 */
export const CustomerSubscriptionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CustomerSubscriptionsGetInput,
    outputSchema: CustomerSubscriptionsGetOutput,
  }),
);
// Input Schema
export const CustomerSubscriptionsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroup: Schema.String.pipe(T.PathParam()),
    registrationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.AzureStack/registrations/{registrationName}/customerSubscriptions",
    }),
  );
export type CustomerSubscriptionsListInput =
  typeof CustomerSubscriptionsListInput.Type;

// Output Schema
export const CustomerSubscriptionsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          etag: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type CustomerSubscriptionsListOutput =
  typeof CustomerSubscriptionsListOutput.Type;

// The operation
/**
 * Returns a list of products.
 *
 * @param subscriptionId - Subscription credentials that uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param resourceGroup - Name of the resource group.
 * @param registrationName - Name of the Azure Stack registration.
 * @param api-version - Client API Version.
 */
export const CustomerSubscriptionsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CustomerSubscriptionsListInput,
    outputSchema: CustomerSubscriptionsListOutput,
  }),
);
// Input Schema
export const DeploymentLicenseCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AzureStack/generateDeploymentLicense",
    }),
  );
export type DeploymentLicenseCreateInput =
  typeof DeploymentLicenseCreateInput.Type;

// Output Schema
export const DeploymentLicenseCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    temporaryLicenseChain: Schema.optional(Schema.Array(Schema.String)),
    signature: Schema.optional(Schema.String),
  });
export type DeploymentLicenseCreateOutput =
  typeof DeploymentLicenseCreateOutput.Type;

// The operation
/**
 * Creates a license that can be used to deploy an Azure Stack device.
 */
export const DeploymentLicenseCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DeploymentLicenseCreateInput,
    outputSchema: DeploymentLicenseCreateOutput,
  }),
);
// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({ method: "GET", path: "/providers/Microsoft.AzureStack/operations" }),
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
 * Returns the list of supported REST operations.
 */
export const OperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationsListInput,
  outputSchema: OperationsListOutput,
}));
// Input Schema
export const ProductsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroup: Schema.String.pipe(T.PathParam()),
  registrationName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.AzureStack/registrations/{registrationName}/products/{productName}",
  }),
);
export type ProductsGetInput = typeof ProductsGetInput.Type;

// Output Schema
export const ProductsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
});
export type ProductsGetOutput = typeof ProductsGetOutput.Type;

// The operation
/**
 * Returns the specified product.
 *
 * @param subscriptionId - Subscription credentials that uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param resourceGroup - Name of the resource group.
 * @param registrationName - Name of the Azure Stack registration.
 * @param api-version - Client API Version.
 */
export const ProductsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ProductsGetInput,
  outputSchema: ProductsGetOutput,
}));
// Input Schema
export const ProductsGetProductInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroup: Schema.String.pipe(T.PathParam()),
    registrationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.AzureStack/registrations/{registrationName}/products/{productName}/getProduct",
    }),
  );
export type ProductsGetProductInput = typeof ProductsGetProductInput.Type;

// Output Schema
export const ProductsGetProductOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    etag: Schema.optional(Schema.String),
  });
export type ProductsGetProductOutput = typeof ProductsGetProductOutput.Type;

// The operation
/**
 * Returns the specified product.
 *
 * @param subscriptionId - Subscription credentials that uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param resourceGroup - Name of the resource group.
 * @param registrationName - Name of the Azure Stack registration.
 * @param api-version - Client API Version.
 */
export const ProductsGetProduct = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ProductsGetProductInput,
  outputSchema: ProductsGetProductOutput,
}));
// Input Schema
export const ProductsGetProductsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroup: Schema.String.pipe(T.PathParam()),
    registrationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.AzureStack/registrations/{registrationName}/products/{productName}/getProducts",
    }),
  );
export type ProductsGetProductsInput = typeof ProductsGetProductsInput.Type;

// Output Schema
export const ProductsGetProductsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          etag: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type ProductsGetProductsOutput = typeof ProductsGetProductsOutput.Type;

// The operation
/**
 * Returns a list of products.
 *
 * @param subscriptionId - Subscription credentials that uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param resourceGroup - Name of the resource group.
 * @param registrationName - Name of the Azure Stack registration.
 * @param api-version - Client API Version.
 */
export const ProductsGetProducts = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ProductsGetProductsInput,
  outputSchema: ProductsGetProductsOutput,
}));
// Input Schema
export const ProductsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroup: Schema.String.pipe(T.PathParam()),
  registrationName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.AzureStack/registrations/{registrationName}/products",
  }),
);
export type ProductsListInput = typeof ProductsListInput.Type;

// Output Schema
export const ProductsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  nextLink: Schema.optional(Schema.String),
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        type: Schema.optional(Schema.String),
        etag: Schema.optional(Schema.String),
      }),
    ),
  ),
});
export type ProductsListOutput = typeof ProductsListOutput.Type;

// The operation
/**
 * Returns a list of products.
 *
 * @param subscriptionId - Subscription credentials that uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param resourceGroup - Name of the resource group.
 * @param registrationName - Name of the Azure Stack registration.
 * @param api-version - Client API Version.
 */
export const ProductsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ProductsListInput,
  outputSchema: ProductsListOutput,
}));
// Input Schema
export const ProductsListDetailsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroup: Schema.String.pipe(T.PathParam()),
    registrationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.AzureStack/registrations/{registrationName}/products/{productName}/listDetails",
    }),
  );
export type ProductsListDetailsInput = typeof ProductsListDetailsInput.Type;

// Output Schema
export const ProductsListDetailsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    galleryPackageBlobSasUri: Schema.optional(Schema.String),
    productKind: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        computeRole: Schema.optional(Schema.Literals(["None", "IaaS", "PaaS"])),
        isSystemExtension: Schema.optional(Schema.Boolean),
        sourceBlob: Schema.optional(
          Schema.Struct({
            uri: Schema.optional(Schema.String),
          }),
        ),
        supportMultipleExtensions: Schema.optional(Schema.Boolean),
        version: Schema.optional(Schema.String),
        vmOsType: Schema.optional(
          Schema.Literals(["None", "Windows", "Linux"]),
        ),
        vmScaleSetEnabled: Schema.optional(Schema.Boolean),
        osDiskImage: Schema.optional(
          Schema.Struct({
            operatingSystem: Schema.optional(
              Schema.Literals(["None", "Windows", "Linux"]),
            ),
            sourceBlobSasUri: Schema.optional(Schema.String),
          }),
        ),
        dataDiskImages: Schema.optional(
          Schema.Array(
            Schema.Struct({
              lun: Schema.optional(Schema.Number),
              sourceBlobSasUri: Schema.optional(Schema.String),
            }),
          ),
        ),
      }),
    ),
  });
export type ProductsListDetailsOutput = typeof ProductsListDetailsOutput.Type;

// The operation
/**
 * Returns the extended properties of a product.
 *
 * @param subscriptionId - Subscription credentials that uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param resourceGroup - Name of the resource group.
 * @param registrationName - Name of the Azure Stack registration.
 * @param api-version - Client API Version.
 */
export const ProductsListDetails = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ProductsListDetailsInput,
  outputSchema: ProductsListDetailsOutput,
}));
// Input Schema
export const ProductsListProductsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroup: Schema.String.pipe(T.PathParam()),
    registrationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.AzureStack/registrations/{registrationName}/products/{productName}/listProducts",
    }),
  );
export type ProductsListProductsInput = typeof ProductsListProductsInput.Type;

// Output Schema
export const ProductsListProductsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          etag: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type ProductsListProductsOutput = typeof ProductsListProductsOutput.Type;

// The operation
/**
 * Returns a list of products.
 *
 * @param subscriptionId - Subscription credentials that uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param resourceGroup - Name of the resource group.
 * @param registrationName - Name of the Azure Stack registration.
 * @param api-version - Client API Version.
 */
export const ProductsListProducts = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ProductsListProductsInput,
    outputSchema: ProductsListProductsOutput,
  }),
);
// Input Schema
export const ProductsUploadLogInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroup: Schema.String.pipe(T.PathParam()),
    registrationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.AzureStack/registrations/{registrationName}/products/{productName}/uploadProductLog",
  }),
);
export type ProductsUploadLogInput = typeof ProductsUploadLogInput.Type;

// Output Schema
export const ProductsUploadLogOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    productId: Schema.optional(Schema.String),
    subscriptionId: Schema.optional(Schema.String),
    registrationName: Schema.optional(Schema.String),
    resourceGroupName: Schema.optional(Schema.String),
    operation: Schema.optional(Schema.String),
    startDate: Schema.optional(Schema.String),
    endDate: Schema.optional(Schema.String),
    status: Schema.optional(Schema.String),
    error: Schema.optional(Schema.String),
    details: Schema.optional(Schema.String),
  });
export type ProductsUploadLogOutput = typeof ProductsUploadLogOutput.Type;

// The operation
/**
 * Returns the specified product.
 *
 * @param subscriptionId - Subscription credentials that uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param resourceGroup - Name of the resource group.
 * @param registrationName - Name of the Azure Stack registration.
 * @param api-version - Client API Version.
 */
export const ProductsUploadLog = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ProductsUploadLogInput,
  outputSchema: ProductsUploadLogOutput,
}));
// Input Schema
export const RegistrationsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroup: Schema.String.pipe(T.PathParam()),
    registrationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.AzureStack/registrations/{registrationName}",
    }),
  );
export type RegistrationsCreateOrUpdateInput =
  typeof RegistrationsCreateOrUpdateInput.Type;

// Output Schema
export const RegistrationsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.Literals(["global"]),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    etag: Schema.optional(Schema.String),
  });
export type RegistrationsCreateOrUpdateOutput =
  typeof RegistrationsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update an Azure Stack registration.
 *
 * @param subscriptionId - Subscription credentials that uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param resourceGroup - Name of the resource group.
 * @param registrationName - Name of the Azure Stack registration.
 * @param api-version - Client API Version.
 */
export const RegistrationsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RegistrationsCreateOrUpdateInput,
    outputSchema: RegistrationsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const RegistrationsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroup: Schema.String.pipe(T.PathParam()),
    registrationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.AzureStack/registrations/{registrationName}",
    }),
  );
export type RegistrationsDeleteInput = typeof RegistrationsDeleteInput.Type;

// Output Schema
export const RegistrationsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type RegistrationsDeleteOutput = typeof RegistrationsDeleteOutput.Type;

// The operation
/**
 * Delete the requested Azure Stack registration.
 *
 * @param subscriptionId - Subscription credentials that uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param resourceGroup - Name of the resource group.
 * @param registrationName - Name of the Azure Stack registration.
 * @param api-version - Client API Version.
 */
export const RegistrationsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RegistrationsDeleteInput,
  outputSchema: RegistrationsDeleteOutput,
}));
// Input Schema
export const RegistrationsEnableRemoteManagementInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroup: Schema.String.pipe(T.PathParam()),
    registrationName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.AzureStack/registrations/{registrationName}/enableRemoteManagement",
    }),
  );
export type RegistrationsEnableRemoteManagementInput =
  typeof RegistrationsEnableRemoteManagementInput.Type;

// Output Schema
export const RegistrationsEnableRemoteManagementOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type RegistrationsEnableRemoteManagementOutput =
  typeof RegistrationsEnableRemoteManagementOutput.Type;

// The operation
/**
 * Enables remote management for device under the Azure Stack registration.
 *
 * @param subscriptionId - Subscription credentials that uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param resourceGroup - Name of the resource group.
 * @param registrationName - Name of the Azure Stack registration.
 */
export const RegistrationsEnableRemoteManagement =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RegistrationsEnableRemoteManagementInput,
    outputSchema: RegistrationsEnableRemoteManagementOutput,
  }));
// Input Schema
export const RegistrationsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroup: Schema.String.pipe(T.PathParam()),
  registrationName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.AzureStack/registrations/{registrationName}",
  }),
);
export type RegistrationsGetInput = typeof RegistrationsGetInput.Type;

// Output Schema
export const RegistrationsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.Literals(["global"]),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    etag: Schema.optional(Schema.String),
  },
);
export type RegistrationsGetOutput = typeof RegistrationsGetOutput.Type;

// The operation
/**
 * Returns the properties of an Azure Stack registration.
 *
 * @param subscriptionId - Subscription credentials that uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param resourceGroup - Name of the resource group.
 * @param registrationName - Name of the Azure Stack registration.
 * @param api-version - Client API Version.
 */
export const RegistrationsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RegistrationsGetInput,
  outputSchema: RegistrationsGetOutput,
}));
// Input Schema
export const RegistrationsGetActivationKeyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroup: Schema.String.pipe(T.PathParam()),
    registrationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.AzureStack/registrations/{registrationName}/getactivationkey",
    }),
  );
export type RegistrationsGetActivationKeyInput =
  typeof RegistrationsGetActivationKeyInput.Type;

// Output Schema
export const RegistrationsGetActivationKeyOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    activationKey: Schema.optional(Schema.String),
  });
export type RegistrationsGetActivationKeyOutput =
  typeof RegistrationsGetActivationKeyOutput.Type;

// The operation
/**
 * Returns Azure Stack Activation Key.
 *
 * @param subscriptionId - Subscription credentials that uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param resourceGroup - Name of the resource group.
 * @param registrationName - Name of the Azure Stack registration.
 * @param api-version - Client API Version.
 */
export const RegistrationsGetActivationKey =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RegistrationsGetActivationKeyInput,
    outputSchema: RegistrationsGetActivationKeyOutput,
  }));
// Input Schema
export const RegistrationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroup: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.AzureStack/registrations",
  }),
);
export type RegistrationsListInput = typeof RegistrationsListInput.Type;

// Output Schema
export const RegistrationsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.Literals(["global"]),
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          etag: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type RegistrationsListOutput = typeof RegistrationsListOutput.Type;

// The operation
/**
 * Returns a list of all registrations.
 *
 * @param subscriptionId - Subscription credentials that uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param resourceGroup - Name of the resource group.
 * @param api-version - Client API Version.
 */
export const RegistrationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RegistrationsListInput,
  outputSchema: RegistrationsListOutput,
}));
// Input Schema
export const RegistrationsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AzureStack/registrations",
    }),
  );
export type RegistrationsListBySubscriptionInput =
  typeof RegistrationsListBySubscriptionInput.Type;

// Output Schema
export const RegistrationsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.Literals(["global"]),
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          etag: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type RegistrationsListBySubscriptionOutput =
  typeof RegistrationsListBySubscriptionOutput.Type;

// The operation
/**
 * Returns a list of all registrations under current subscription.
 *
 * @param subscriptionId - Subscription credentials that uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client API Version.
 */
export const RegistrationsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RegistrationsListBySubscriptionInput,
    outputSchema: RegistrationsListBySubscriptionOutput,
  }));
// Input Schema
export const RegistrationsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroup: Schema.String.pipe(T.PathParam()),
    registrationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.AzureStack/registrations/{registrationName}",
    }),
  );
export type RegistrationsUpdateInput = typeof RegistrationsUpdateInput.Type;

// Output Schema
export const RegistrationsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.Literals(["global"]),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    etag: Schema.optional(Schema.String),
  });
export type RegistrationsUpdateOutput = typeof RegistrationsUpdateOutput.Type;

// The operation
/**
 * Patch an Azure Stack registration.
 *
 * @param subscriptionId - Subscription credentials that uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param resourceGroup - Name of the resource group.
 * @param registrationName - Name of the Azure Stack registration.
 * @param api-version - Client API Version.
 */
export const RegistrationsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RegistrationsUpdateInput,
  outputSchema: RegistrationsUpdateOutput,
}));
