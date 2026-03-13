/**
 * Azure Databox API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const JobsBookShipmentPickUpInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    jobName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBox/jobs/{jobName}/bookShipmentPickUp",
    }),
  );
export type JobsBookShipmentPickUpInput =
  typeof JobsBookShipmentPickUpInput.Type;

// Output Schema
export const JobsBookShipmentPickUpOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    confirmationNumber: Schema.optional(Schema.String),
    readyByTime: Schema.optional(Schema.String),
  });
export type JobsBookShipmentPickUpOutput =
  typeof JobsBookShipmentPickUpOutput.Type;

// The operation
/**
 * Book shipment pick up.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param jobName - The name of the job Resource within the specified resource group. job names must be between 3 and 24 characters in length and use any alphanumeric and underscore only
 */
export const JobsBookShipmentPickUp = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: JobsBookShipmentPickUpInput,
    outputSchema: JobsBookShipmentPickUpOutput,
  }),
);
// Input Schema
export const JobsCancelInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  jobName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBox/jobs/{jobName}/cancel",
  }),
);
export type JobsCancelInput = typeof JobsCancelInput.Type;

// Output Schema
export const JobsCancelOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type JobsCancelOutput = typeof JobsCancelOutput.Type;

// The operation
/**
 * CancelJob.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param jobName - The name of the job Resource within the specified resource group. job names must be between 3 and 24 characters in length and use any alphanumeric and underscore only
 */
export const JobsCancel = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JobsCancelInput,
  outputSchema: JobsCancelOutput,
}));
// Input Schema
export const JobsCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  jobName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBox/jobs/{jobName}",
  }),
);
export type JobsCreateInput = typeof JobsCreateInput.Type;

// Output Schema
export const JobsCreateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type JobsCreateOutput = typeof JobsCreateOutput.Type;

// The operation
/**
 * Creates a new job with the specified parameters. Existing job cannot be updated with this API and should instead be updated with the Update job API.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param jobName - The name of the job Resource within the specified resource group. job names must be between 3 and 24 characters in length and use any alphanumeric and underscore only
 */
export const JobsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JobsCreateInput,
  outputSchema: JobsCreateOutput,
}));
// Input Schema
export const JobsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  jobName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBox/jobs/{jobName}",
  }),
);
export type JobsDeleteInput = typeof JobsDeleteInput.Type;

// Output Schema
export const JobsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type JobsDeleteOutput = typeof JobsDeleteOutput.Type;

// The operation
/**
 * Deletes a job.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param jobName - The name of the job Resource within the specified resource group. job names must be between 3 and 24 characters in length and use any alphanumeric and underscore only
 */
export const JobsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JobsDeleteInput,
  outputSchema: JobsDeleteOutput,
}));
// Input Schema
export const JobsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  jobName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
  $expand: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBox/jobs/{jobName}",
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
 * Gets information about the specified job.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param jobName - The name of the job Resource within the specified resource group. job names must be between 3 and 24 characters in length and use any alphanumeric and underscore only
 * @param $expand - $expand is supported on details parameter for job, which provides details on the job stages.
 */
export const JobsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JobsGetInput,
  outputSchema: JobsGetOutput,
}));
// Input Schema
export const JobsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
  $skipToken: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.DataBox/jobs",
  }),
);
export type JobsListInput = typeof JobsListInput.Type;

// Output Schema
export const JobsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(
    Schema.Struct({
      tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      location: Schema.String,
    }),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type JobsListOutput = typeof JobsListOutput.Type;

// The operation
/**
 * Lists all the jobs available under the subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param $skipToken - $skipToken is supported on Get list of jobs, which provides the next page in the list of jobs.
 */
export const JobsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JobsListInput,
  outputSchema: JobsListOutput,
}));
// Input Schema
export const JobsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $skipToken: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBox/jobs",
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
 * Lists all the jobs available under the given resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param $skipToken - $skipToken is supported on Get list of jobs, which provides the next page in the list of jobs.
 */
export const JobsListByResourceGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: JobsListByResourceGroupInput,
    outputSchema: JobsListByResourceGroupOutput,
  }),
);
// Input Schema
export const JobsListCredentialsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    jobName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBox/jobs/{jobName}/listCredentials",
    }),
  );
export type JobsListCredentialsInput = typeof JobsListCredentialsInput.Type;

// Output Schema
export const JobsListCredentialsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        jobName: Schema.optional(Schema.String),
        jobSecrets: Schema.optional(
          Schema.Struct({
            jobSecretsType: Schema.Literals([
              "DataBox",
              "DataBoxDisk",
              "DataBoxHeavy",
              "DataBoxCustomerDisk",
            ]),
            dcAccessSecurityCode: Schema.optional(
              Schema.Struct({
                reverseDCAccessCode: Schema.optional(Schema.String),
                forwardDCAccessCode: Schema.optional(Schema.String),
              }),
            ),
            error: Schema.optional(
              Schema.Struct({
                additionalInfo: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      info: Schema.optional(
                        Schema.Record(Schema.String, Schema.Unknown),
                      ),
                      type: Schema.optional(Schema.String),
                    }),
                  ),
                ),
                code: Schema.optional(Schema.String),
                details: Schema.optional(Schema.Array(Schema.Unknown)),
                message: Schema.optional(Schema.String),
                target: Schema.optional(Schema.String),
              }),
            ),
          }),
        ),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type JobsListCredentialsOutput = typeof JobsListCredentialsOutput.Type;

// The operation
/**
 * This method gets the unencrypted secrets related to the job.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param jobName - The name of the job Resource within the specified resource group. job names must be between 3 and 24 characters in length and use any alphanumeric and underscore only
 */
export const JobsListCredentials = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JobsListCredentialsInput,
  outputSchema: JobsListCredentialsOutput,
}));
// Input Schema
export const JobsMarkDevicesShippedInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    jobName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBox/jobs/{jobName}/markDevicesShipped",
    }),
  );
export type JobsMarkDevicesShippedInput =
  typeof JobsMarkDevicesShippedInput.Type;

// Output Schema
export const JobsMarkDevicesShippedOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type JobsMarkDevicesShippedOutput =
  typeof JobsMarkDevicesShippedOutput.Type;

// The operation
/**
 * Request to mark devices for a given job as shipped
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param jobName - The name of the job Resource within the specified resource group. job names must be between 3 and 24 characters in length and use any alphanumeric and underscore only
 */
export const JobsMarkDevicesShipped = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: JobsMarkDevicesShippedInput,
    outputSchema: JobsMarkDevicesShippedOutput,
  }),
);
// Input Schema
export const JobsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  jobName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBox/jobs/{jobName}",
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
 * Updates the properties of an existing job.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param jobName - The name of the job Resource within the specified resource group. job names must be between 3 and 24 characters in length and use any alphanumeric and underscore only
 * @param If-Match - Defines the If-Match condition. The patch will be performed only if the ETag of the job on the server matches this value.
 */
export const JobsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JobsUpdateInput,
  outputSchema: JobsUpdateOutput,
}));
// Input Schema
export const MitigateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  jobName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBox/jobs/{jobName}/mitigate",
  }),
);
export type MitigateInput = typeof MitigateInput.Type;

// Output Schema
export const MitigateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type MitigateOutput = typeof MitigateOutput.Type;

// The operation
/**
 * Request to mitigate for a given job
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param jobName - The name of the job Resource within the specified resource group. job names must be between 3 and 24 characters in length and use any alphanumeric and underscore only
 */
export const Mitigate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: MitigateInput,
  outputSchema: MitigateOutput,
}));
// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  "api-version": Schema.String,
}).pipe(
  T.Http({ method: "GET", path: "/providers/Microsoft.DataBox/operations" }),
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
        properties: Schema.optional(Schema.Unknown),
        origin: Schema.optional(Schema.String),
        isDataAction: Schema.optional(Schema.Boolean),
      }),
    ),
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
export const ServiceListAvailableSkusByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBox/locations/{location}/availableSkus",
    }),
  );
export type ServiceListAvailableSkusByResourceGroupInput =
  typeof ServiceListAvailableSkusByResourceGroupInput.Type;

// Output Schema
export const ServiceListAvailableSkusByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        sku: Schema.optional(
          Schema.Struct({
            name: Schema.Literals([
              "DataBox",
              "DataBoxDisk",
              "DataBoxHeavy",
              "DataBoxCustomerDisk",
            ]),
            displayName: Schema.optional(Schema.String),
            family: Schema.optional(Schema.String),
            model: Schema.optional(
              Schema.Literals([
                "DataBox",
                "DataBoxDisk",
                "DataBoxHeavy",
                "DataBoxCustomerDisk",
                "AzureDataBox120",
                "AzureDataBox525",
              ]),
            ),
          }),
        ),
        enabled: Schema.optional(Schema.Boolean),
        properties: Schema.optional(
          Schema.Struct({
            dataLocationToServiceLocationMap: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  dataLocation: Schema.optional(Schema.String),
                  serviceLocation: Schema.optional(Schema.String),
                }),
              ),
            ),
            capacity: Schema.optional(
              Schema.Struct({
                usable: Schema.optional(Schema.String),
                maximum: Schema.optional(Schema.String),
                individualSkuUsable: Schema.optional(Schema.String),
              }),
            ),
            costs: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  meterId: Schema.optional(Schema.String),
                  meterType: Schema.optional(Schema.String),
                  multiplier: Schema.optional(Schema.Number),
                }),
              ),
            ),
            apiVersions: Schema.optional(Schema.Array(Schema.String)),
            disabledReason: Schema.optional(
              Schema.Literals([
                "None",
                "Country",
                "Region",
                "Feature",
                "OfferType",
                "NoSubscriptionInfo",
              ]),
            ),
            disabledReasonMessage: Schema.optional(Schema.String),
            requiredFeature: Schema.optional(Schema.String),
            countriesWithinCommerceBoundary: Schema.optional(
              Schema.Array(Schema.String),
            ),
          }),
        ),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ServiceListAvailableSkusByResourceGroupOutput =
  typeof ServiceListAvailableSkusByResourceGroupOutput.Type;

// The operation
/**
 * This method provides the list of available skus for the given subscription, resource group and location.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param location - The name of Azure region.
 */
export const ServiceListAvailableSkusByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServiceListAvailableSkusByResourceGroupInput,
    outputSchema: ServiceListAvailableSkusByResourceGroupOutput,
  }));
// Input Schema
export const ServiceRegionConfigurationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DataBox/locations/{location}/regionConfiguration",
    }),
  );
export type ServiceRegionConfigurationInput =
  typeof ServiceRegionConfigurationInput.Type;

// Output Schema
export const ServiceRegionConfigurationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scheduleAvailabilityResponse: Schema.optional(
      Schema.Struct({
        availableDates: Schema.optional(Schema.Array(Schema.String)),
      }),
    ),
    transportAvailabilityResponse: Schema.optional(
      Schema.Struct({
        transportAvailabilityDetails: Schema.optional(
          Schema.Array(
            Schema.Struct({
              shipmentType: Schema.optional(
                Schema.Literals(["CustomerManaged", "MicrosoftManaged"]),
              ),
            }),
          ),
        ),
      }),
    ),
    datacenterAddressResponse: Schema.optional(
      Schema.Struct({
        datacenterAddressType: Schema.Literals([
          "DatacenterAddressLocation",
          "DatacenterAddressInstruction",
        ]),
        supportedCarriersForReturnShipment: Schema.optional(
          Schema.Array(Schema.String),
        ),
        dataCenterAzureLocation: Schema.optional(Schema.String),
      }),
    ),
    deviceCapabilityResponse: Schema.optional(
      Schema.Struct({
        deviceCapabilityDetails: Schema.optional(
          Schema.Array(
            Schema.Struct({
              hardwareEncryption: Schema.optional(
                Schema.Literals(["Enabled", "Disabled"]),
              ),
            }),
          ),
        ),
      }),
    ),
  });
export type ServiceRegionConfigurationOutput =
  typeof ServiceRegionConfigurationOutput.Type;

// The operation
/**
 * This API provides configuration details specific to given region/location at Subscription level.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param location - The name of Azure region.
 */
export const ServiceRegionConfiguration = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ServiceRegionConfigurationInput,
    outputSchema: ServiceRegionConfigurationOutput,
  }),
);
// Input Schema
export const ServiceRegionConfigurationByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBox/locations/{location}/regionConfiguration",
    }),
  );
export type ServiceRegionConfigurationByResourceGroupInput =
  typeof ServiceRegionConfigurationByResourceGroupInput.Type;

// Output Schema
export const ServiceRegionConfigurationByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scheduleAvailabilityResponse: Schema.optional(
      Schema.Struct({
        availableDates: Schema.optional(Schema.Array(Schema.String)),
      }),
    ),
    transportAvailabilityResponse: Schema.optional(
      Schema.Struct({
        transportAvailabilityDetails: Schema.optional(
          Schema.Array(
            Schema.Struct({
              shipmentType: Schema.optional(
                Schema.Literals(["CustomerManaged", "MicrosoftManaged"]),
              ),
            }),
          ),
        ),
      }),
    ),
    datacenterAddressResponse: Schema.optional(
      Schema.Struct({
        datacenterAddressType: Schema.Literals([
          "DatacenterAddressLocation",
          "DatacenterAddressInstruction",
        ]),
        supportedCarriersForReturnShipment: Schema.optional(
          Schema.Array(Schema.String),
        ),
        dataCenterAzureLocation: Schema.optional(Schema.String),
      }),
    ),
    deviceCapabilityResponse: Schema.optional(
      Schema.Struct({
        deviceCapabilityDetails: Schema.optional(
          Schema.Array(
            Schema.Struct({
              hardwareEncryption: Schema.optional(
                Schema.Literals(["Enabled", "Disabled"]),
              ),
            }),
          ),
        ),
      }),
    ),
  });
export type ServiceRegionConfigurationByResourceGroupOutput =
  typeof ServiceRegionConfigurationByResourceGroupOutput.Type;

// The operation
/**
 * This API provides configuration details specific to given region/location at Resource group level.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param location - The name of Azure region.
 */
export const ServiceRegionConfigurationByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServiceRegionConfigurationByResourceGroupInput,
    outputSchema: ServiceRegionConfigurationByResourceGroupOutput,
  }));
// Input Schema
export const ServiceValidateInputsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DataBox/locations/{location}/validateInputs",
    }),
  );
export type ServiceValidateInputsInput = typeof ServiceValidateInputsInput.Type;

// Output Schema
export const ServiceValidateInputsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    properties: Schema.optional(
      Schema.Struct({
        status: Schema.optional(
          Schema.Literals([
            "AllValidToProceed",
            "InputsRevisitRequired",
            "CertainInputValidationsSkipped",
          ]),
        ),
        individualResponseDetails: Schema.optional(
          Schema.Array(
            Schema.Struct({
              validationType: Schema.Literals([
                "ValidateAddress",
                "ValidateSubscriptionIsAllowedToCreateJob",
                "ValidatePreferences",
                "ValidateCreateOrderLimit",
                "ValidateSkuAvailability",
                "ValidateDataTransferDetails",
              ]),
              error: Schema.optional(
                Schema.Struct({
                  additionalInfo: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        info: Schema.optional(
                          Schema.Record(Schema.String, Schema.Unknown),
                        ),
                        type: Schema.optional(Schema.String),
                      }),
                    ),
                  ),
                  code: Schema.optional(Schema.String),
                  details: Schema.optional(Schema.Array(Schema.Unknown)),
                  message: Schema.optional(Schema.String),
                  target: Schema.optional(Schema.String),
                }),
              ),
            }),
          ),
        ),
      }),
    ),
  });
export type ServiceValidateInputsOutput =
  typeof ServiceValidateInputsOutput.Type;

// The operation
/**
 * This method does all necessary pre-job creation validation under subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param location - The name of Azure region.
 */
export const ServiceValidateInputs = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ServiceValidateInputsInput,
    outputSchema: ServiceValidateInputsOutput,
  }),
);
// Input Schema
export const ServiceValidateInputsByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBox/locations/{location}/validateInputs",
    }),
  );
export type ServiceValidateInputsByResourceGroupInput =
  typeof ServiceValidateInputsByResourceGroupInput.Type;

// Output Schema
export const ServiceValidateInputsByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    properties: Schema.optional(
      Schema.Struct({
        status: Schema.optional(
          Schema.Literals([
            "AllValidToProceed",
            "InputsRevisitRequired",
            "CertainInputValidationsSkipped",
          ]),
        ),
        individualResponseDetails: Schema.optional(
          Schema.Array(
            Schema.Struct({
              validationType: Schema.Literals([
                "ValidateAddress",
                "ValidateSubscriptionIsAllowedToCreateJob",
                "ValidatePreferences",
                "ValidateCreateOrderLimit",
                "ValidateSkuAvailability",
                "ValidateDataTransferDetails",
              ]),
              error: Schema.optional(
                Schema.Struct({
                  additionalInfo: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        info: Schema.optional(
                          Schema.Record(Schema.String, Schema.Unknown),
                        ),
                        type: Schema.optional(Schema.String),
                      }),
                    ),
                  ),
                  code: Schema.optional(Schema.String),
                  details: Schema.optional(Schema.Array(Schema.Unknown)),
                  message: Schema.optional(Schema.String),
                  target: Schema.optional(Schema.String),
                }),
              ),
            }),
          ),
        ),
      }),
    ),
  });
export type ServiceValidateInputsByResourceGroupOutput =
  typeof ServiceValidateInputsByResourceGroupOutput.Type;

// The operation
/**
 * This method does all necessary pre-job creation validation under resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param location - The name of Azure region.
 */
export const ServiceValidateInputsByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServiceValidateInputsByResourceGroupInput,
    outputSchema: ServiceValidateInputsByResourceGroupOutput,
  }));
