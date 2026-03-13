/**
 * Azure Workloads API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const MonitorsCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/monitors/{monitorName}",
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
 * Creates a SAP monitor.
 *
 * Creates a SAP monitor for the specified subscription, resource group, and resource name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const monitorsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: MonitorsCreateInput,
  outputSchema: MonitorsCreateOutput,
}));
// Input Schema
export const MonitorsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/monitors/{monitorName}",
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
 * Gets properties of a SAP monitor.
 *
 * Gets properties of a SAP monitor for the specified subscription, resource group, and resource name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const monitorsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: MonitorsGetInput,
  outputSchema: MonitorsGetOutput,
}));
// Input Schema
export const MonitorsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.Workloads/monitors",
  }),
);
export type MonitorsListInput = typeof MonitorsListInput.Type;

// Output Schema
export const MonitorsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
export type MonitorsListOutput = typeof MonitorsListOutput.Type;

// The operation
/**
 * Gets a list of SAP monitors in the specified subscription.
 *
 * Gets a list of SAP monitors in the specified subscription. The operations returns various properties of each SAP monitor.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const monitorsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: MonitorsListInput,
  outputSchema: MonitorsListOutput,
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
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/monitors",
    }),
  );
export type MonitorsListByResourceGroupInput =
  typeof MonitorsListByResourceGroupInput.Type;

// Output Schema
export const MonitorsListByResourceGroupOutput =
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
export type MonitorsListByResourceGroupOutput =
  typeof MonitorsListByResourceGroupOutput.Type;

// The operation
/**
 * Gets a list of SAP monitors
 *
 * Gets a list of SAP monitors in the specified resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const monitorsListByResourceGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: MonitorsListByResourceGroupInput,
    outputSchema: MonitorsListByResourceGroupOutput,
  }),
);
// Input Schema
export const MonitorsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/monitors/{monitorName}",
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
 * Patches the Tags field of a SAP monitor.
 *
 * Patches the Tags field of a SAP monitor for the specified subscription, resource group, and SAP monitor name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const monitorsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: MonitorsUpdateInput,
  outputSchema: MonitorsUpdateOutput,
}));
// Input Schema
export const ProviderInstancesCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/monitors/{monitorName}/providerInstances/{providerInstanceName}",
    }),
  );
export type ProviderInstancesCreateInput =
  typeof ProviderInstancesCreateInput.Type;

// Output Schema
export const ProviderInstancesCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ProviderInstancesCreateOutput =
  typeof ProviderInstancesCreateOutput.Type;

// The operation
/**
 * Creates a provider instance.
 *
 * Creates a provider instance for the specified subscription, resource group, SAP monitor name, and resource name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ProviderInstancesCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ProviderInstancesCreateInput,
    outputSchema: ProviderInstancesCreateOutput,
  }),
);
// Input Schema
export const ProviderInstancesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/monitors/{monitorName}/providerInstances/{providerInstanceName}",
    }),
  );
export type ProviderInstancesGetInput = typeof ProviderInstancesGetInput.Type;

// Output Schema
export const ProviderInstancesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ProviderInstancesGetOutput = typeof ProviderInstancesGetOutput.Type;

// The operation
/**
 * Gets properties of a provider instance.
 *
 * Gets properties of a provider instance for the specified subscription, resource group, SAP monitor name, and resource name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ProviderInstancesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ProviderInstancesGetInput,
    outputSchema: ProviderInstancesGetOutput,
  }),
);
// Input Schema
export const ProviderInstancesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/monitors/{monitorName}/providerInstances",
    }),
  );
export type ProviderInstancesListInput = typeof ProviderInstancesListInput.Type;

// Output Schema
export const ProviderInstancesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ProviderInstancesListOutput =
  typeof ProviderInstancesListOutput.Type;

// The operation
/**
 * Gets a list of provider instances in the specified SAP monitor.
 *
 * Gets a list of provider instances in the specified SAP monitor. The operations returns various properties of each provider instances.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ProviderInstancesList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ProviderInstancesListInput,
    outputSchema: ProviderInstancesListOutput,
  }),
);
// Input Schema
export const SAPApplicationServerInstancesCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}/applicationInstances/{applicationInstanceName}",
    }),
  );
export type SAPApplicationServerInstancesCreateInput =
  typeof SAPApplicationServerInstancesCreateInput.Type;

// Output Schema
export const SAPApplicationServerInstancesCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SAPApplicationServerInstancesCreateOutput =
  typeof SAPApplicationServerInstancesCreateOutput.Type;

// The operation
/**
 * Puts the SAP Application Server Instance resource. <br><br>This will be used by service only. PUT by end user will return a Bad Request error.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SAPApplicationServerInstancesCreate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SAPApplicationServerInstancesCreateInput,
    outputSchema: SAPApplicationServerInstancesCreateOutput,
  }));
// Input Schema
export const SapApplicationServerInstancesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    sapVirtualInstanceName: Schema.String.pipe(T.PathParam()),
    applicationInstanceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}/applicationInstances/{applicationInstanceName}",
    }),
  );
export type SapApplicationServerInstancesDeleteInput =
  typeof SapApplicationServerInstancesDeleteInput.Type;

// Output Schema
export const SapApplicationServerInstancesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SapApplicationServerInstancesDeleteOutput =
  typeof SapApplicationServerInstancesDeleteOutput.Type;

// The operation
/**
 * Deletes the SAP Application Server Instance resource. &lt;br&gt;&lt;br&gt;This operation will be used by service only. Delete by end user will return a Bad Request error.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param sapVirtualInstanceName - The name of the Virtual Instances for SAP solutions resource
 * @param applicationInstanceName - The name of SAP Application Server instance resource.
 */
export const SapApplicationServerInstancesDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SapApplicationServerInstancesDeleteInput,
    outputSchema: SapApplicationServerInstancesDeleteOutput,
  }));
// Input Schema
export const SAPApplicationServerInstancesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}/applicationInstances/{applicationInstanceName}",
    }),
  );
export type SAPApplicationServerInstancesGetInput =
  typeof SAPApplicationServerInstancesGetInput.Type;

// Output Schema
export const SAPApplicationServerInstancesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SAPApplicationServerInstancesGetOutput =
  typeof SAPApplicationServerInstancesGetOutput.Type;

// The operation
/**
 * Gets the SAP Application Server Instance corresponding to the Virtual Instance for SAP solutions resource.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SAPApplicationServerInstancesGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SAPApplicationServerInstancesGetInput,
    outputSchema: SAPApplicationServerInstancesGetOutput,
  }));
// Input Schema
export const SAPApplicationServerInstancesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}/applicationInstances",
    }),
  );
export type SAPApplicationServerInstancesListInput =
  typeof SAPApplicationServerInstancesListInput.Type;

// Output Schema
export const SAPApplicationServerInstancesListOutput =
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
export type SAPApplicationServerInstancesListOutput =
  typeof SAPApplicationServerInstancesListOutput.Type;

// The operation
/**
 * Lists the SAP Application Server Instance resources for a given Virtual Instance for SAP solutions resource.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SAPApplicationServerInstancesList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SAPApplicationServerInstancesListInput,
    outputSchema: SAPApplicationServerInstancesListOutput,
  }));
// Input Schema
export const SAPApplicationServerInstancesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}/applicationInstances/{applicationInstanceName}",
    }),
  );
export type SAPApplicationServerInstancesUpdateInput =
  typeof SAPApplicationServerInstancesUpdateInput.Type;

// Output Schema
export const SAPApplicationServerInstancesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SAPApplicationServerInstancesUpdateOutput =
  typeof SAPApplicationServerInstancesUpdateOutput.Type;

// The operation
/**
 * Puts the SAP Application Server Instance resource.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SAPApplicationServerInstancesUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SAPApplicationServerInstancesUpdateInput,
    outputSchema: SAPApplicationServerInstancesUpdateOutput,
  }));
// Input Schema
export const SAPAvailabilityZoneDetailsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Workloads/locations/{location}/sapVirtualInstanceMetadata/default/getAvailabilityZoneDetails",
    }),
  );
export type SAPAvailabilityZoneDetailsInput =
  typeof SAPAvailabilityZoneDetailsInput.Type;

// Output Schema
export const SAPAvailabilityZoneDetailsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    availabilityZonePairs: Schema.optional(
      Schema.Array(
        Schema.Struct({
          zoneA: Schema.optional(Schema.Number),
          zoneB: Schema.optional(Schema.Number),
        }),
      ),
    ),
  });
export type SAPAvailabilityZoneDetailsOutput =
  typeof SAPAvailabilityZoneDetailsOutput.Type;

// The operation
/**
 * Get the recommended SAP Availability Zone Pair Details for your region.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param location - The name of Azure region.
 * @param api-version - The API version to use for this operation.
 */
export const SAPAvailabilityZoneDetails = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SAPAvailabilityZoneDetailsInput,
    outputSchema: SAPAvailabilityZoneDetailsOutput,
  }),
);
// Input Schema
export const SAPCentralInstancesCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}/centralInstances/{centralInstanceName}",
    }),
  );
export type SAPCentralInstancesCreateInput =
  typeof SAPCentralInstancesCreateInput.Type;

// Output Schema
export const SAPCentralInstancesCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SAPCentralInstancesCreateOutput =
  typeof SAPCentralInstancesCreateOutput.Type;

// The operation
/**
 * Creates the SAP Central Services Instance resource. <br><br>This will be used by service only. PUT operation on this resource by end user will return a Bad Request error.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SAPCentralInstancesCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SAPCentralInstancesCreateInput,
    outputSchema: SAPCentralInstancesCreateOutput,
  }),
);
// Input Schema
export const SAPCentralInstancesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}/centralInstances/{centralInstanceName}",
    }),
  );
export type SAPCentralInstancesGetInput =
  typeof SAPCentralInstancesGetInput.Type;

// Output Schema
export const SAPCentralInstancesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SAPCentralInstancesGetOutput =
  typeof SAPCentralInstancesGetOutput.Type;

// The operation
/**
 * Gets the SAP Central Services Instance resource.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SAPCentralInstancesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SAPCentralInstancesGetInput,
    outputSchema: SAPCentralInstancesGetOutput,
  }),
);
// Input Schema
export const SAPCentralInstancesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}/centralInstances",
    }),
  );
export type SAPCentralInstancesListInput =
  typeof SAPCentralInstancesListInput.Type;

// Output Schema
export const SAPCentralInstancesListOutput =
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
export type SAPCentralInstancesListOutput =
  typeof SAPCentralInstancesListOutput.Type;

// The operation
/**
 * Lists the SAP Central Services Instance resource for the given Virtual Instance for SAP solutions resource.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SAPCentralInstancesList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SAPCentralInstancesListInput,
    outputSchema: SAPCentralInstancesListOutput,
  }),
);
// Input Schema
export const SAPCentralInstancesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}/centralInstances/{centralInstanceName}",
    }),
  );
export type SAPCentralInstancesUpdateInput =
  typeof SAPCentralInstancesUpdateInput.Type;

// Output Schema
export const SAPCentralInstancesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SAPCentralInstancesUpdateOutput =
  typeof SAPCentralInstancesUpdateOutput.Type;

// The operation
/**
 * Updates the SAP Central Services Instance resource. <br><br>This can be used to update tags on the resource.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SAPCentralInstancesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SAPCentralInstancesUpdateInput,
    outputSchema: SAPCentralInstancesUpdateOutput,
  }),
);
// Input Schema
export const SapCentralServerInstancesCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    sapVirtualInstanceName: Schema.String.pipe(T.PathParam()),
    centralInstanceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}/centralInstances/{centralInstanceName}",
    }),
  );
export type SapCentralServerInstancesCreateInput =
  typeof SapCentralServerInstancesCreateInput.Type;

// Output Schema
export const SapCentralServerInstancesCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SapCentralServerInstancesCreateOutput =
  typeof SapCentralServerInstancesCreateOutput.Type;

// The operation
/**
 * Creates the SAP Central Services Instance resource. &lt;br&gt;&lt;br&gt;This will be used by service only. PUT operation on this resource by end user will return a Bad Request error.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param sapVirtualInstanceName - The name of the Virtual Instances for SAP solutions resource
 * @param centralInstanceName - Central Services Instance resource name string modeled as parameter for auto generation to work correctly.
 */
export const SapCentralServerInstancesCreate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SapCentralServerInstancesCreateInput,
    outputSchema: SapCentralServerInstancesCreateOutput,
  }));
// Input Schema
export const SapCentralServerInstancesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    sapVirtualInstanceName: Schema.String.pipe(T.PathParam()),
    centralInstanceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}/centralInstances/{centralInstanceName}",
    }),
  );
export type SapCentralServerInstancesDeleteInput =
  typeof SapCentralServerInstancesDeleteInput.Type;

// Output Schema
export const SapCentralServerInstancesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SapCentralServerInstancesDeleteOutput =
  typeof SapCentralServerInstancesDeleteOutput.Type;

// The operation
/**
 * Deletes the SAP Central Services Instance resource. &lt;br&gt;&lt;br&gt;This will be used by service only. Delete operation on this resource by end user will return a Bad Request error. You can delete the parent resource, which is the Virtual Instance for SAP solutions resource, using the delete operation on it.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param sapVirtualInstanceName - The name of the Virtual Instances for SAP solutions resource
 * @param centralInstanceName - Central Services Instance resource name string modeled as parameter for auto generation to work correctly.
 */
export const SapCentralServerInstancesDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SapCentralServerInstancesDeleteInput,
    outputSchema: SapCentralServerInstancesDeleteOutput,
  }));
// Input Schema
export const SapCentralServerInstancesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    sapVirtualInstanceName: Schema.String.pipe(T.PathParam()),
    centralInstanceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}/centralInstances/{centralInstanceName}",
    }),
  );
export type SapCentralServerInstancesGetInput =
  typeof SapCentralServerInstancesGetInput.Type;

// Output Schema
export const SapCentralServerInstancesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SapCentralServerInstancesGetOutput =
  typeof SapCentralServerInstancesGetOutput.Type;

// The operation
/**
 * Gets the SAP Central Services Instance resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param sapVirtualInstanceName - The name of the Virtual Instances for SAP solutions resource
 * @param centralInstanceName - Central Services Instance resource name string modeled as parameter for auto generation to work correctly.
 */
export const SapCentralServerInstancesGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SapCentralServerInstancesGetInput,
    outputSchema: SapCentralServerInstancesGetOutput,
  }));
// Input Schema
export const SapCentralServerInstancesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    sapVirtualInstanceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}/centralInstances",
    }),
  );
export type SapCentralServerInstancesListInput =
  typeof SapCentralServerInstancesListInput.Type;

// Output Schema
export const SapCentralServerInstancesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type SapCentralServerInstancesListOutput =
  typeof SapCentralServerInstancesListOutput.Type;

// The operation
/**
 * Lists the SAP Central Services Instance resource for the given Virtual Instance for SAP solutions resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param sapVirtualInstanceName - The name of the Virtual Instances for SAP solutions resource
 */
export const SapCentralServerInstancesList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SapCentralServerInstancesListInput,
    outputSchema: SapCentralServerInstancesListOutput,
  }));
// Input Schema
export const SapCentralServerInstancesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    sapVirtualInstanceName: Schema.String.pipe(T.PathParam()),
    centralInstanceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}/centralInstances/{centralInstanceName}",
    }),
  );
export type SapCentralServerInstancesUpdateInput =
  typeof SapCentralServerInstancesUpdateInput.Type;

// Output Schema
export const SapCentralServerInstancesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SapCentralServerInstancesUpdateOutput =
  typeof SapCentralServerInstancesUpdateOutput.Type;

// The operation
/**
 * Updates the SAP Central Services Instance resource. &lt;br&gt;&lt;br&gt;This can be used to update tags on the resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param sapVirtualInstanceName - The name of the Virtual Instances for SAP solutions resource
 * @param centralInstanceName - Central Services Instance resource name string modeled as parameter for auto generation to work correctly.
 */
export const SapCentralServerInstancesUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SapCentralServerInstancesUpdateInput,
    outputSchema: SapCentralServerInstancesUpdateOutput,
  }));
// Input Schema
export const SAPDatabaseInstancesCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}/databaseInstances/{databaseInstanceName}",
    }),
  );
export type SAPDatabaseInstancesCreateInput =
  typeof SAPDatabaseInstancesCreateInput.Type;

// Output Schema
export const SAPDatabaseInstancesCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SAPDatabaseInstancesCreateOutput =
  typeof SAPDatabaseInstancesCreateOutput.Type;

// The operation
/**
 * Creates the Database resource corresponding to the Virtual Instance for SAP solutions resource. <br><br>This will be used by service only. PUT by end user will return a Bad Request error.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SAPDatabaseInstancesCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SAPDatabaseInstancesCreateInput,
    outputSchema: SAPDatabaseInstancesCreateOutput,
  }),
);
// Input Schema
export const SapDatabaseInstancesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    sapVirtualInstanceName: Schema.String.pipe(T.PathParam()),
    databaseInstanceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}/databaseInstances/{databaseInstanceName}",
    }),
  );
export type SapDatabaseInstancesDeleteInput =
  typeof SapDatabaseInstancesDeleteInput.Type;

// Output Schema
export const SapDatabaseInstancesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SapDatabaseInstancesDeleteOutput =
  typeof SapDatabaseInstancesDeleteOutput.Type;

// The operation
/**
 * Deletes the Database resource corresponding to a Virtual Instance for SAP solutions resource. &lt;br&gt;&lt;br&gt;This will be used by service only. Delete by end user will return a Bad Request error.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param sapVirtualInstanceName - The name of the Virtual Instances for SAP solutions resource
 * @param databaseInstanceName - Database resource name string modeled as parameter for auto generation to work correctly.
 */
export const SapDatabaseInstancesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SapDatabaseInstancesDeleteInput,
    outputSchema: SapDatabaseInstancesDeleteOutput,
  }),
);
// Input Schema
export const SAPDatabaseInstancesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}/databaseInstances/{databaseInstanceName}",
    }),
  );
export type SAPDatabaseInstancesGetInput =
  typeof SAPDatabaseInstancesGetInput.Type;

// Output Schema
export const SAPDatabaseInstancesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SAPDatabaseInstancesGetOutput =
  typeof SAPDatabaseInstancesGetOutput.Type;

// The operation
/**
 * Gets the SAP Database Instance resource.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SAPDatabaseInstancesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SAPDatabaseInstancesGetInput,
    outputSchema: SAPDatabaseInstancesGetOutput,
  }),
);
// Input Schema
export const SAPDatabaseInstancesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}/databaseInstances",
    }),
  );
export type SAPDatabaseInstancesListInput =
  typeof SAPDatabaseInstancesListInput.Type;

// Output Schema
export const SAPDatabaseInstancesListOutput =
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
export type SAPDatabaseInstancesListOutput =
  typeof SAPDatabaseInstancesListOutput.Type;

// The operation
/**
 * Lists the Database resources associated with a Virtual Instance for SAP solutions resource.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SAPDatabaseInstancesList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SAPDatabaseInstancesListInput,
    outputSchema: SAPDatabaseInstancesListOutput,
  }),
);
// Input Schema
export const SAPDatabaseInstancesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}/databaseInstances/{databaseInstanceName}",
    }),
  );
export type SAPDatabaseInstancesUpdateInput =
  typeof SAPDatabaseInstancesUpdateInput.Type;

// Output Schema
export const SAPDatabaseInstancesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SAPDatabaseInstancesUpdateOutput =
  typeof SAPDatabaseInstancesUpdateOutput.Type;

// The operation
/**
 * Updates the Database resource.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SAPDatabaseInstancesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SAPDatabaseInstancesUpdateInput,
    outputSchema: SAPDatabaseInstancesUpdateOutput,
  }),
);
// Input Schema
export const SAPDiskConfigurationsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Workloads/locations/{location}/sapVirtualInstanceMetadata/default/getDiskConfigurations",
    }),
  );
export type SAPDiskConfigurationsInput = typeof SAPDiskConfigurationsInput.Type;

// Output Schema
export const SAPDiskConfigurationsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    volumeConfigurations: Schema.optional(
      Schema.Record(
        Schema.String,
        Schema.Struct({
          recommendedConfiguration: Schema.optional(
            Schema.Struct({
              count: Schema.optional(Schema.Number),
              sizeGB: Schema.optional(Schema.Number),
              sku: Schema.optional(
                Schema.Struct({
                  name: Schema.optional(
                    Schema.Literals([
                      "Standard_LRS",
                      "Premium_LRS",
                      "StandardSSD_LRS",
                      "UltraSSD_LRS",
                      "Premium_ZRS",
                      "StandardSSD_ZRS",
                      "PremiumV2_LRS",
                    ]),
                  ),
                }),
              ),
            }),
          ),
          supportedConfigurations: Schema.optional(
            Schema.Array(
              Schema.Struct({
                sku: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(
                      Schema.Literals([
                        "Standard_LRS",
                        "Premium_LRS",
                        "StandardSSD_LRS",
                        "UltraSSD_LRS",
                        "Premium_ZRS",
                        "StandardSSD_ZRS",
                        "PremiumV2_LRS",
                      ]),
                    ),
                  }),
                ),
                sizeGB: Schema.optional(Schema.Number),
                minimumSupportedDiskCount: Schema.optional(Schema.Number),
                maximumSupportedDiskCount: Schema.optional(Schema.Number),
                iopsReadWrite: Schema.optional(Schema.Number),
                mbpsReadWrite: Schema.optional(Schema.Number),
                diskTier: Schema.optional(Schema.String),
              }),
            ),
          ),
        }),
      ),
    ),
  });
export type SAPDiskConfigurationsOutput =
  typeof SAPDiskConfigurationsOutput.Type;

// The operation
/**
 * Get the SAP Disk Configuration Layout prod/non-prod SAP System.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param location - The name of Azure region.
 * @param api-version - The API version to use for this operation.
 */
export const SAPDiskConfigurations = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SAPDiskConfigurationsInput,
    outputSchema: SAPDiskConfigurationsOutput,
  }),
);
// Input Schema
export const SapLandscapeMonitorCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/monitors/{monitorName}/sapLandscapeMonitor/default",
    }),
  );
export type SapLandscapeMonitorCreateInput =
  typeof SapLandscapeMonitorCreateInput.Type;

// Output Schema
export const SapLandscapeMonitorCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SapLandscapeMonitorCreateOutput =
  typeof SapLandscapeMonitorCreateOutput.Type;

// The operation
/**
 * Creates a SAP Landscape Monitor Dashboard.
 *
 * Creates a SAP Landscape Monitor Dashboard for the specified subscription, resource group, and resource name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const SapLandscapeMonitorCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SapLandscapeMonitorCreateInput,
    outputSchema: SapLandscapeMonitorCreateOutput,
  }),
);
// Input Schema
export const SapLandscapeMonitorDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/monitors/{monitorName}/sapLandscapeMonitor/default",
    }),
  );
export type SapLandscapeMonitorDeleteInput =
  typeof SapLandscapeMonitorDeleteInput.Type;

// Output Schema
export const SapLandscapeMonitorDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SapLandscapeMonitorDeleteOutput =
  typeof SapLandscapeMonitorDeleteOutput.Type;

// The operation
/**
 * Deletes a SAP Landscape Monitor Dashboard.
 *
 * Deletes a SAP Landscape Monitor Dashboard with the specified subscription, resource group, and SAP monitor name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const SapLandscapeMonitorDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SapLandscapeMonitorDeleteInput,
    outputSchema: SapLandscapeMonitorDeleteOutput,
  }),
);
// Input Schema
export const SapLandscapeMonitorGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/monitors/{monitorName}/sapLandscapeMonitor/default",
    }),
  );
export type SapLandscapeMonitorGetInput =
  typeof SapLandscapeMonitorGetInput.Type;

// Output Schema
export const SapLandscapeMonitorGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SapLandscapeMonitorGetOutput =
  typeof SapLandscapeMonitorGetOutput.Type;

// The operation
/**
 * Gets configuration values for Single Pane Of Glass for SAP monitor.
 *
 * Gets configuration values for Single Pane Of Glass for SAP monitor for the specified subscription, resource group, and resource name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const SapLandscapeMonitorGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SapLandscapeMonitorGetInput,
    outputSchema: SapLandscapeMonitorGetOutput,
  }),
);
// Input Schema
export const SapLandscapeMonitorListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/monitors/{monitorName}/sapLandscapeMonitor",
    }),
  );
export type SapLandscapeMonitorListInput =
  typeof SapLandscapeMonitorListInput.Type;

// Output Schema
export const SapLandscapeMonitorListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type SapLandscapeMonitorListOutput =
  typeof SapLandscapeMonitorListOutput.Type;

// The operation
/**
 * Gets configuration values for Single Pane Of Glass for SAP monitor.
 *
 * Gets configuration values for Single Pane Of Glass for SAP monitor for the specified subscription, resource group, and resource name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const SapLandscapeMonitorList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SapLandscapeMonitorListInput,
    outputSchema: SapLandscapeMonitorListOutput,
  }),
);
// Input Schema
export const SapLandscapeMonitorUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/monitors/{monitorName}/sapLandscapeMonitor/default",
    }),
  );
export type SapLandscapeMonitorUpdateInput =
  typeof SapLandscapeMonitorUpdateInput.Type;

// Output Schema
export const SapLandscapeMonitorUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SapLandscapeMonitorUpdateOutput =
  typeof SapLandscapeMonitorUpdateOutput.Type;

// The operation
/**
 * Patches the SAP Landscape Monitor Dashboard.
 *
 * Patches the SAP Landscape Monitor Dashboard for the specified subscription, resource group, and SAP monitor name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const SapLandscapeMonitorUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SapLandscapeMonitorUpdateInput,
    outputSchema: SapLandscapeMonitorUpdateOutput,
  }),
);
// Input Schema
export const SAPSizingRecommendationsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Workloads/locations/{location}/sapVirtualInstanceMetadata/default/getSizingRecommendations",
    }),
  );
export type SAPSizingRecommendationsInput =
  typeof SAPSizingRecommendationsInput.Type;

// Output Schema
export const SAPSizingRecommendationsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    deploymentType: Schema.Literals(["SingleServer", "ThreeTier"]),
  });
export type SAPSizingRecommendationsOutput =
  typeof SAPSizingRecommendationsOutput.Type;

// The operation
/**
 * Get SAP sizing recommendations by providing input SAPS for application tier and memory required for database tier
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param location - The name of Azure region.
 * @param api-version - The API version to use for this operation.
 */
export const SAPSizingRecommendations = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SAPSizingRecommendationsInput,
    outputSchema: SAPSizingRecommendationsOutput,
  }),
);
// Input Schema
export const SAPSupportedSkuInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  location: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.Workloads/locations/{location}/sapVirtualInstanceMetadata/default/getSapSupportedSku",
  }),
);
export type SAPSupportedSkuInput = typeof SAPSupportedSkuInput.Type;

// Output Schema
export const SAPSupportedSkuOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  supportedSkus: Schema.optional(
    Schema.Array(
      Schema.Struct({
        vmSku: Schema.optional(Schema.String),
        isAppServerCertified: Schema.optional(Schema.Boolean),
        isDatabaseCertified: Schema.optional(Schema.Boolean),
      }),
    ),
  ),
});
export type SAPSupportedSkuOutput = typeof SAPSupportedSkuOutput.Type;

// The operation
/**
 * Get a list of SAP supported SKUs for ASCS, Application and Database tier.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param location - The name of Azure region.
 * @param api-version - The API version to use for this operation.
 */
export const SAPSupportedSku = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SAPSupportedSkuInput,
  outputSchema: SAPSupportedSkuOutput,
}));
// Input Schema
export const SAPVirtualInstancesCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}",
    }),
  );
export type SAPVirtualInstancesCreateInput =
  typeof SAPVirtualInstancesCreateInput.Type;

// Output Schema
export const SAPVirtualInstancesCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SAPVirtualInstancesCreateOutput =
  typeof SAPVirtualInstancesCreateOutput.Type;

// The operation
/**
 * Creates a Virtual Instance for SAP solutions (VIS) resource
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SAPVirtualInstancesCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SAPVirtualInstancesCreateInput,
    outputSchema: SAPVirtualInstancesCreateOutput,
  }),
);
// Input Schema
export const SapVirtualInstancesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    sapVirtualInstanceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}",
    }),
  );
export type SapVirtualInstancesDeleteInput =
  typeof SapVirtualInstancesDeleteInput.Type;

// Output Schema
export const SapVirtualInstancesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SapVirtualInstancesDeleteOutput =
  typeof SapVirtualInstancesDeleteOutput.Type;

// The operation
/**
 * Deletes a Virtual Instance for SAP solutions resource and its child resources, that is the associated Central Services Instance, Application Server Instances and Database Instance.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param sapVirtualInstanceName - The name of the Virtual Instances for SAP solutions resource
 */
export const SapVirtualInstancesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SapVirtualInstancesDeleteInput,
    outputSchema: SapVirtualInstancesDeleteOutput,
  }),
);
// Input Schema
export const SAPVirtualInstancesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}",
    }),
  );
export type SAPVirtualInstancesGetInput =
  typeof SAPVirtualInstancesGetInput.Type;

// Output Schema
export const SAPVirtualInstancesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SAPVirtualInstancesGetOutput =
  typeof SAPVirtualInstancesGetOutput.Type;

// The operation
/**
 * Gets a Virtual Instance for SAP solutions resource
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SAPVirtualInstancesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SAPVirtualInstancesGetInput,
    outputSchema: SAPVirtualInstancesGetOutput,
  }),
);
// Input Schema
export const SapVirtualInstancesInvokeAvailabilityZoneDetailsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Workloads/locations/{location}/sapVirtualInstanceMetadata/default/getAvailabilityZoneDetails",
    }),
  );
export type SapVirtualInstancesInvokeAvailabilityZoneDetailsInput =
  typeof SapVirtualInstancesInvokeAvailabilityZoneDetailsInput.Type;

// Output Schema
export const SapVirtualInstancesInvokeAvailabilityZoneDetailsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    availabilityZonePairs: Schema.optional(
      Schema.Array(
        Schema.Struct({
          zoneA: Schema.optional(Schema.Number),
          zoneB: Schema.optional(Schema.Number),
        }),
      ),
    ),
  });
export type SapVirtualInstancesInvokeAvailabilityZoneDetailsOutput =
  typeof SapVirtualInstancesInvokeAvailabilityZoneDetailsOutput.Type;

// The operation
/**
 * Get the recommended SAP Availability Zone Pair Details for your region.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param location - The name of the Azure region.
 */
export const SapVirtualInstancesInvokeAvailabilityZoneDetails =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SapVirtualInstancesInvokeAvailabilityZoneDetailsInput,
    outputSchema: SapVirtualInstancesInvokeAvailabilityZoneDetailsOutput,
  }));
// Input Schema
export const SapVirtualInstancesInvokeDiskConfigurationsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Workloads/locations/{location}/sapVirtualInstanceMetadata/default/getDiskConfigurations",
    }),
  );
export type SapVirtualInstancesInvokeDiskConfigurationsInput =
  typeof SapVirtualInstancesInvokeDiskConfigurationsInput.Type;

// Output Schema
export const SapVirtualInstancesInvokeDiskConfigurationsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    volumeConfigurations: Schema.optional(
      Schema.Record(
        Schema.String,
        Schema.Struct({
          recommendedConfiguration: Schema.optional(
            Schema.Struct({
              count: Schema.optional(Schema.Number),
              sizeGB: Schema.optional(Schema.Number),
              sku: Schema.optional(
                Schema.Struct({
                  name: Schema.optional(
                    Schema.Literals([
                      "Standard_LRS",
                      "Premium_LRS",
                      "StandardSSD_LRS",
                      "UltraSSD_LRS",
                      "Premium_ZRS",
                      "StandardSSD_ZRS",
                      "PremiumV2_LRS",
                    ]),
                  ),
                }),
              ),
            }),
          ),
          supportedConfigurations: Schema.optional(
            Schema.Array(
              Schema.Struct({
                sku: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(
                      Schema.Literals([
                        "Standard_LRS",
                        "Premium_LRS",
                        "StandardSSD_LRS",
                        "UltraSSD_LRS",
                        "Premium_ZRS",
                        "StandardSSD_ZRS",
                        "PremiumV2_LRS",
                      ]),
                    ),
                  }),
                ),
                sizeGB: Schema.optional(Schema.Number),
                minimumSupportedDiskCount: Schema.optional(Schema.Number),
                maximumSupportedDiskCount: Schema.optional(Schema.Number),
                iopsReadWrite: Schema.optional(Schema.Number),
                mbpsReadWrite: Schema.optional(Schema.Number),
                diskTier: Schema.optional(Schema.String),
              }),
            ),
          ),
        }),
      ),
    ),
  });
export type SapVirtualInstancesInvokeDiskConfigurationsOutput =
  typeof SapVirtualInstancesInvokeDiskConfigurationsOutput.Type;

// The operation
/**
 * Get the SAP Disk Configuration Layout prod/non-prod SAP System.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param location - The name of the Azure region.
 */
export const SapVirtualInstancesInvokeDiskConfigurations =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SapVirtualInstancesInvokeDiskConfigurationsInput,
    outputSchema: SapVirtualInstancesInvokeDiskConfigurationsOutput,
  }));
// Input Schema
export const SapVirtualInstancesInvokeSapSupportedSkuInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Workloads/locations/{location}/sapVirtualInstanceMetadata/default/getSapSupportedSku",
    }),
  );
export type SapVirtualInstancesInvokeSapSupportedSkuInput =
  typeof SapVirtualInstancesInvokeSapSupportedSkuInput.Type;

// Output Schema
export const SapVirtualInstancesInvokeSapSupportedSkuOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    supportedSkus: Schema.optional(
      Schema.Array(
        Schema.Struct({
          vmSku: Schema.optional(Schema.String),
          isAppServerCertified: Schema.optional(Schema.Boolean),
          isDatabaseCertified: Schema.optional(Schema.Boolean),
        }),
      ),
    ),
  });
export type SapVirtualInstancesInvokeSapSupportedSkuOutput =
  typeof SapVirtualInstancesInvokeSapSupportedSkuOutput.Type;

// The operation
/**
 * Get a list of SAP supported SKUs for ASCS, Application and Database tier.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param location - The name of the Azure region.
 */
export const SapVirtualInstancesInvokeSapSupportedSku =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SapVirtualInstancesInvokeSapSupportedSkuInput,
    outputSchema: SapVirtualInstancesInvokeSapSupportedSkuOutput,
  }));
// Input Schema
export const SapVirtualInstancesInvokeSizingRecommendationsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Workloads/locations/{location}/sapVirtualInstanceMetadata/default/getSizingRecommendations",
    }),
  );
export type SapVirtualInstancesInvokeSizingRecommendationsInput =
  typeof SapVirtualInstancesInvokeSizingRecommendationsInput.Type;

// Output Schema
export const SapVirtualInstancesInvokeSizingRecommendationsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    deploymentType: Schema.Literals(["SingleServer", "ThreeTier"]),
  });
export type SapVirtualInstancesInvokeSizingRecommendationsOutput =
  typeof SapVirtualInstancesInvokeSizingRecommendationsOutput.Type;

// The operation
/**
 * Gets the sizing recommendations.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param location - The name of the Azure region.
 */
export const SapVirtualInstancesInvokeSizingRecommendations =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SapVirtualInstancesInvokeSizingRecommendationsInput,
    outputSchema: SapVirtualInstancesInvokeSizingRecommendationsOutput,
  }));
// Input Schema
export const SAPVirtualInstancesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances",
    }),
  );
export type SAPVirtualInstancesListByResourceGroupInput =
  typeof SAPVirtualInstancesListByResourceGroupInput.Type;

// Output Schema
export const SAPVirtualInstancesListByResourceGroupOutput =
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
export type SAPVirtualInstancesListByResourceGroupOutput =
  typeof SAPVirtualInstancesListByResourceGroupOutput.Type;

// The operation
/**
 * Gets all Virtual Instances for SAP solutions resources in a Resource Group.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SAPVirtualInstancesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SAPVirtualInstancesListByResourceGroupInput,
    outputSchema: SAPVirtualInstancesListByResourceGroupOutput,
  }));
// Input Schema
export const SAPVirtualInstancesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Workloads/sapVirtualInstances",
    }),
  );
export type SAPVirtualInstancesListBySubscriptionInput =
  typeof SAPVirtualInstancesListBySubscriptionInput.Type;

// Output Schema
export const SAPVirtualInstancesListBySubscriptionOutput =
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
export type SAPVirtualInstancesListBySubscriptionOutput =
  typeof SAPVirtualInstancesListBySubscriptionOutput.Type;

// The operation
/**
 * Gets all Virtual Instances for SAP solutions resources in a Subscription.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const SAPVirtualInstancesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SAPVirtualInstancesListBySubscriptionInput,
    outputSchema: SAPVirtualInstancesListBySubscriptionOutput,
  }));
// Input Schema
export const SAPVirtualInstancesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}",
    }),
  );
export type SAPVirtualInstancesUpdateInput =
  typeof SAPVirtualInstancesUpdateInput.Type;

// Output Schema
export const SAPVirtualInstancesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SAPVirtualInstancesUpdateOutput =
  typeof SAPVirtualInstancesUpdateOutput.Type;

// The operation
/**
 * Updates a Virtual Instance for SAP solutions resource
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SAPVirtualInstancesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SAPVirtualInstancesUpdateInput,
    outputSchema: SAPVirtualInstancesUpdateOutput,
  }),
);
