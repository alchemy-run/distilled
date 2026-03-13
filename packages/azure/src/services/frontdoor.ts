/**
 * Azure Frontdoor API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const EndpointsPurgeContentInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    frontDoorName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/frontDoors/{frontDoorName}/purge",
    }),
  );
export type EndpointsPurgeContentInput = typeof EndpointsPurgeContentInput.Type;

// Output Schema
export const EndpointsPurgeContentOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type EndpointsPurgeContentOutput =
  typeof EndpointsPurgeContentOutput.Type;

// The operation
/**
 * Removes a content from Front Door.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param frontDoorName - Name of the Front Door which is globally unique.
 */
export const EndpointsPurgeContent = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: EndpointsPurgeContentInput,
    outputSchema: EndpointsPurgeContentOutput,
  }),
);
// Input Schema
export const ExperimentsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    experimentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/NetworkExperimentProfiles/{profileName}/Experiments/{experimentName}",
    }),
  );
export type ExperimentsCreateOrUpdateInput =
  typeof ExperimentsCreateOrUpdateInput.Type;

// Output Schema
export const ExperimentsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type ExperimentsCreateOrUpdateOutput =
  typeof ExperimentsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates an Experiment
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - The Profile identifier associated with the Tenant and Partner
 * @param experimentName - The Experiment identifier associated with the Experiment
 */
export const ExperimentsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ExperimentsCreateOrUpdateInput,
    outputSchema: ExperimentsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const ExperimentsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    experimentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/NetworkExperimentProfiles/{profileName}/Experiments/{experimentName}",
  }),
);
export type ExperimentsDeleteInput = typeof ExperimentsDeleteInput.Type;

// Output Schema
export const ExperimentsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ExperimentsDeleteOutput = typeof ExperimentsDeleteOutput.Type;

// The operation
/**
 * Deletes an Experiment
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - The Profile identifier associated with the Tenant and Partner
 * @param experimentName - The Experiment identifier associated with the Experiment
 */
export const ExperimentsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ExperimentsDeleteInput,
  outputSchema: ExperimentsDeleteOutput,
}));
// Input Schema
export const ExperimentsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  profileName: Schema.String.pipe(T.PathParam()),
  experimentName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/NetworkExperimentProfiles/{profileName}/Experiments/{experimentName}",
  }),
);
export type ExperimentsGetInput = typeof ExperimentsGetInput.Type;

// Output Schema
export const ExperimentsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
});
export type ExperimentsGetOutput = typeof ExperimentsGetOutput.Type;

// The operation
/**
 * Gets an Experiment by ExperimentName
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - The Profile identifier associated with the Tenant and Partner
 * @param experimentName - The Experiment identifier associated with the Experiment
 */
export const ExperimentsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ExperimentsGetInput,
  outputSchema: ExperimentsGetOutput,
}));
// Input Schema
export const ExperimentsListByProfileInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/NetworkExperimentProfiles/{profileName}/Experiments",
    }),
  );
export type ExperimentsListByProfileInput =
  typeof ExperimentsListByProfileInput.Type;

// Output Schema
export const ExperimentsListByProfileOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        type: Schema.optional(Schema.String),
        location: Schema.optional(Schema.String),
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ExperimentsListByProfileOutput =
  typeof ExperimentsListByProfileOutput.Type;

// The operation
/**
 * Gets a list of Experiments
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - The Profile identifier associated with the Tenant and Partner
 */
export const ExperimentsListByProfile = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ExperimentsListByProfileInput,
    outputSchema: ExperimentsListByProfileOutput,
  }),
);
// Input Schema
export const ExperimentsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    experimentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/NetworkExperimentProfiles/{profileName}/Experiments/{experimentName}",
  }),
);
export type ExperimentsUpdateInput = typeof ExperimentsUpdateInput.Type;

// Output Schema
export const ExperimentsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type ExperimentsUpdateOutput = typeof ExperimentsUpdateOutput.Type;

// The operation
/**
 * Updates an Experiment by Experiment id
 *
 * Updates an Experiment
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - The Profile identifier associated with the Tenant and Partner
 * @param experimentName - The Experiment identifier associated with the Experiment
 */
export const ExperimentsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ExperimentsUpdateInput,
  outputSchema: ExperimentsUpdateOutput,
}));
// Input Schema
export const FrontDoorNameAvailabilityCheckInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.Network/checkFrontDoorNameAvailability",
    }),
  );
export type FrontDoorNameAvailabilityCheckInput =
  typeof FrontDoorNameAvailabilityCheckInput.Type;

// Output Schema
export const FrontDoorNameAvailabilityCheckOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nameAvailability: Schema.optional(
      Schema.Literals(["Available", "Unavailable"]),
    ),
    reason: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
  });
export type FrontDoorNameAvailabilityCheckOutput =
  typeof FrontDoorNameAvailabilityCheckOutput.Type;

// The operation
/**
 * Check the availability of a Front Door resource name.
 *
 * @param api-version - The API version to use for this operation.
 */
export const FrontDoorNameAvailabilityCheck =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: FrontDoorNameAvailabilityCheckInput,
    outputSchema: FrontDoorNameAvailabilityCheckOutput,
  }));
// Input Schema
export const FrontDoorNameAvailabilityWithSubscriptionCheckInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Network/checkFrontDoorNameAvailability",
    }),
  );
export type FrontDoorNameAvailabilityWithSubscriptionCheckInput =
  typeof FrontDoorNameAvailabilityWithSubscriptionCheckInput.Type;

// Output Schema
export const FrontDoorNameAvailabilityWithSubscriptionCheckOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nameAvailability: Schema.optional(
      Schema.Literals(["Available", "Unavailable"]),
    ),
    reason: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
  });
export type FrontDoorNameAvailabilityWithSubscriptionCheckOutput =
  typeof FrontDoorNameAvailabilityWithSubscriptionCheckOutput.Type;

// The operation
/**
 * Check the availability of a Front Door subdomain.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const FrontDoorNameAvailabilityWithSubscriptionCheck =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: FrontDoorNameAvailabilityWithSubscriptionCheckInput,
    outputSchema: FrontDoorNameAvailabilityWithSubscriptionCheckOutput,
  }));
// Input Schema
export const FrontDoorsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    frontDoorName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/frontDoors/{frontDoorName}",
    }),
  );
export type FrontDoorsCreateOrUpdateInput =
  typeof FrontDoorsCreateOrUpdateInput.Type;

// Output Schema
export const FrontDoorsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type FrontDoorsCreateOrUpdateOutput =
  typeof FrontDoorsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates a new Front Door with a Front Door name under the specified subscription and resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param frontDoorName - Name of the Front Door which is globally unique.
 */
export const FrontDoorsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: FrontDoorsCreateOrUpdateInput,
    outputSchema: FrontDoorsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const FrontDoorsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  frontDoorName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/frontDoors/{frontDoorName}",
  }),
);
export type FrontDoorsDeleteInput = typeof FrontDoorsDeleteInput.Type;

// Output Schema
export const FrontDoorsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type FrontDoorsDeleteOutput = typeof FrontDoorsDeleteOutput.Type;

// The operation
/**
 * Deletes an existing Front Door with the specified parameters.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param frontDoorName - Name of the Front Door which is globally unique.
 */
export const FrontDoorsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FrontDoorsDeleteInput,
  outputSchema: FrontDoorsDeleteOutput,
}));
// Input Schema
export const FrontDoorsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  frontDoorName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/frontDoors/{frontDoorName}",
  }),
);
export type FrontDoorsGetInput = typeof FrontDoorsGetInput.Type;

// Output Schema
export const FrontDoorsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
});
export type FrontDoorsGetOutput = typeof FrontDoorsGetOutput.Type;

// The operation
/**
 * Gets a Front Door with the specified Front Door name under the specified subscription and resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param frontDoorName - Name of the Front Door which is globally unique.
 */
export const FrontDoorsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FrontDoorsGetInput,
  outputSchema: FrontDoorsGetOutput,
}));
// Input Schema
export const FrontDoorsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.Network/frontDoors",
  }),
);
export type FrontDoorsListInput = typeof FrontDoorsListInput.Type;

// Output Schema
export const FrontDoorsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(
    Schema.Struct({
      id: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      type: Schema.optional(Schema.String),
      location: Schema.optional(Schema.String),
      tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    }),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type FrontDoorsListOutput = typeof FrontDoorsListOutput.Type;

// The operation
/**
 * Lists all of the Front Doors within an Azure subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const FrontDoorsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FrontDoorsListInput,
  outputSchema: FrontDoorsListOutput,
}));
// Input Schema
export const FrontDoorsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/frontDoors",
    }),
  );
export type FrontDoorsListByResourceGroupInput =
  typeof FrontDoorsListByResourceGroupInput.Type;

// Output Schema
export const FrontDoorsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        type: Schema.optional(Schema.String),
        location: Schema.optional(Schema.String),
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type FrontDoorsListByResourceGroupOutput =
  typeof FrontDoorsListByResourceGroupOutput.Type;

// The operation
/**
 * Lists all of the Front Doors within a resource group under a subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const FrontDoorsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: FrontDoorsListByResourceGroupInput,
    outputSchema: FrontDoorsListByResourceGroupOutput,
  }));
// Input Schema
export const FrontDoorsValidateCustomDomainInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    frontDoorName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/frontDoors/{frontDoorName}/validateCustomDomain",
    }),
  );
export type FrontDoorsValidateCustomDomainInput =
  typeof FrontDoorsValidateCustomDomainInput.Type;

// Output Schema
export const FrontDoorsValidateCustomDomainOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    customDomainValidated: Schema.optional(Schema.Boolean),
    reason: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
  });
export type FrontDoorsValidateCustomDomainOutput =
  typeof FrontDoorsValidateCustomDomainOutput.Type;

// The operation
/**
 * Validates the custom domain mapping to ensure it maps to the correct Front Door endpoint in DNS.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param frontDoorName - Name of the Front Door which is globally unique.
 */
export const FrontDoorsValidateCustomDomain =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: FrontDoorsValidateCustomDomainInput,
    outputSchema: FrontDoorsValidateCustomDomainOutput,
  }));
// Input Schema
export const FrontendEndpointsDisableHttpsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    frontDoorName: Schema.String.pipe(T.PathParam()),
    frontendEndpointName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/frontDoors/{frontDoorName}/frontendEndpoints/{frontendEndpointName}/disableHttps",
    }),
  );
export type FrontendEndpointsDisableHttpsInput =
  typeof FrontendEndpointsDisableHttpsInput.Type;

// Output Schema
export const FrontendEndpointsDisableHttpsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type FrontendEndpointsDisableHttpsOutput =
  typeof FrontendEndpointsDisableHttpsOutput.Type;

// The operation
/**
 * Disables a frontendEndpoint for HTTPS traffic
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param frontDoorName - Name of the Front Door which is globally unique.
 * @param frontendEndpointName - Name of the Frontend endpoint which is unique within the Front Door.
 */
export const FrontendEndpointsDisableHttps =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: FrontendEndpointsDisableHttpsInput,
    outputSchema: FrontendEndpointsDisableHttpsOutput,
  }));
// Input Schema
export const FrontendEndpointsEnableHttpsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    frontDoorName: Schema.String.pipe(T.PathParam()),
    frontendEndpointName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/frontDoors/{frontDoorName}/frontendEndpoints/{frontendEndpointName}/enableHttps",
    }),
  );
export type FrontendEndpointsEnableHttpsInput =
  typeof FrontendEndpointsEnableHttpsInput.Type;

// Output Schema
export const FrontendEndpointsEnableHttpsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type FrontendEndpointsEnableHttpsOutput =
  typeof FrontendEndpointsEnableHttpsOutput.Type;

// The operation
/**
 * Enables a frontendEndpoint for HTTPS traffic
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param frontDoorName - Name of the Front Door which is globally unique.
 * @param frontendEndpointName - Name of the Frontend endpoint which is unique within the Front Door.
 */
export const FrontendEndpointsEnableHttps =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: FrontendEndpointsEnableHttpsInput,
    outputSchema: FrontendEndpointsEnableHttpsOutput,
  }));
// Input Schema
export const FrontendEndpointsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    frontDoorName: Schema.String.pipe(T.PathParam()),
    frontendEndpointName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/frontDoors/{frontDoorName}/frontendEndpoints/{frontendEndpointName}",
    }),
  );
export type FrontendEndpointsGetInput = typeof FrontendEndpointsGetInput.Type;

// Output Schema
export const FrontendEndpointsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type FrontendEndpointsGetOutput = typeof FrontendEndpointsGetOutput.Type;

// The operation
/**
 * Gets a Frontend endpoint with the specified name within the specified Front Door.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param frontDoorName - Name of the Front Door which is globally unique.
 * @param frontendEndpointName - Name of the Frontend endpoint which is unique within the Front Door.
 */
export const FrontendEndpointsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: FrontendEndpointsGetInput,
    outputSchema: FrontendEndpointsGetOutput,
  }),
);
// Input Schema
export const FrontendEndpointsListByFrontDoorInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    frontDoorName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/frontDoors/{frontDoorName}/frontendEndpoints",
    }),
  );
export type FrontendEndpointsListByFrontDoorInput =
  typeof FrontendEndpointsListByFrontDoorInput.Type;

// Output Schema
export const FrontendEndpointsListByFrontDoorOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        type: Schema.optional(Schema.String),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type FrontendEndpointsListByFrontDoorOutput =
  typeof FrontendEndpointsListByFrontDoorOutput.Type;

// The operation
/**
 * Lists all of the frontend endpoints within a Front Door.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param frontDoorName - Name of the Front Door which is globally unique.
 */
export const FrontendEndpointsListByFrontDoor =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: FrontendEndpointsListByFrontDoorInput,
    outputSchema: FrontendEndpointsListByFrontDoorOutput,
  }));
// Input Schema
export const ManagedRuleSetsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Network/frontDoorWebApplicationFirewallManagedRuleSets",
    }),
  );
export type ManagedRuleSetsListInput = typeof ManagedRuleSetsListInput.Type;

// Output Schema
export const ManagedRuleSetsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        type: Schema.optional(Schema.String),
        location: Schema.optional(Schema.String),
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ManagedRuleSetsListOutput = typeof ManagedRuleSetsListOutput.Type;

// The operation
/**
 * Lists all available managed rule sets.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const ManagedRuleSetsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ManagedRuleSetsListInput,
  outputSchema: ManagedRuleSetsListOutput,
}));
// Input Schema
export const NetworkExperimentProfilesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/NetworkExperimentProfiles/{profileName}",
    }),
  );
export type NetworkExperimentProfilesCreateOrUpdateInput =
  typeof NetworkExperimentProfilesCreateOrUpdateInput.Type;

// Output Schema
export const NetworkExperimentProfilesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type NetworkExperimentProfilesCreateOrUpdateOutput =
  typeof NetworkExperimentProfilesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates an NetworkExperiment Profile
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - The Profile identifier associated with the Tenant and Partner
 */
export const NetworkExperimentProfilesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkExperimentProfilesCreateOrUpdateInput,
    outputSchema: NetworkExperimentProfilesCreateOrUpdateOutput,
  }));
// Input Schema
export const NetworkExperimentProfilesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/NetworkExperimentProfiles/{profileName}",
    }),
  );
export type NetworkExperimentProfilesDeleteInput =
  typeof NetworkExperimentProfilesDeleteInput.Type;

// Output Schema
export const NetworkExperimentProfilesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type NetworkExperimentProfilesDeleteOutput =
  typeof NetworkExperimentProfilesDeleteOutput.Type;

// The operation
/**
 * Deletes an NetworkExperiment Profile by ProfileName
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - The Profile identifier associated with the Tenant and Partner
 */
export const NetworkExperimentProfilesDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkExperimentProfilesDeleteInput,
    outputSchema: NetworkExperimentProfilesDeleteOutput,
  }));
// Input Schema
export const NetworkExperimentProfilesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/NetworkExperimentProfiles/{profileName}",
    }),
  );
export type NetworkExperimentProfilesGetInput =
  typeof NetworkExperimentProfilesGetInput.Type;

// Output Schema
export const NetworkExperimentProfilesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type NetworkExperimentProfilesGetOutput =
  typeof NetworkExperimentProfilesGetOutput.Type;

// The operation
/**
 * Gets an NetworkExperiment Profile by ProfileName
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - The Profile identifier associated with the Tenant and Partner
 */
export const NetworkExperimentProfilesGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkExperimentProfilesGetInput,
    outputSchema: NetworkExperimentProfilesGetOutput,
  }));
// Input Schema
export const NetworkExperimentProfilesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Network/NetworkExperimentProfiles",
    }),
  );
export type NetworkExperimentProfilesListInput =
  typeof NetworkExperimentProfilesListInput.Type;

// Output Schema
export const NetworkExperimentProfilesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        type: Schema.optional(Schema.String),
        location: Schema.optional(Schema.String),
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type NetworkExperimentProfilesListOutput =
  typeof NetworkExperimentProfilesListOutput.Type;

// The operation
/**
 * Gets a list of Network Experiment Profiles under a subscription
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const NetworkExperimentProfilesList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkExperimentProfilesListInput,
    outputSchema: NetworkExperimentProfilesListOutput,
  }));
// Input Schema
export const NetworkExperimentProfilesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/NetworkExperimentProfiles",
    }),
  );
export type NetworkExperimentProfilesListByResourceGroupInput =
  typeof NetworkExperimentProfilesListByResourceGroupInput.Type;

// Output Schema
export const NetworkExperimentProfilesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        type: Schema.optional(Schema.String),
        location: Schema.optional(Schema.String),
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type NetworkExperimentProfilesListByResourceGroupOutput =
  typeof NetworkExperimentProfilesListByResourceGroupOutput.Type;

// The operation
/**
 * Gets a list of Network Experiment Profiles within a resource group under a subscription
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const NetworkExperimentProfilesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkExperimentProfilesListByResourceGroupInput,
    outputSchema: NetworkExperimentProfilesListByResourceGroupOutput,
  }));
// Input Schema
export const NetworkExperimentProfilesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/NetworkExperimentProfiles/{profileName}",
    }),
  );
export type NetworkExperimentProfilesUpdateInput =
  typeof NetworkExperimentProfilesUpdateInput.Type;

// Output Schema
export const NetworkExperimentProfilesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type NetworkExperimentProfilesUpdateOutput =
  typeof NetworkExperimentProfilesUpdateOutput.Type;

// The operation
/**
 * Updates an NetworkExperimentProfiles by NetworkExperimentProfile name
 *
 * Updates an NetworkExperimentProfiles
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - The Profile identifier associated with the Tenant and Partner
 */
export const NetworkExperimentProfilesUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkExperimentProfilesUpdateInput,
    outputSchema: NetworkExperimentProfilesUpdateOutput,
  }));
// Input Schema
export const PoliciesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    policyName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/FrontDoorWebApplicationFirewallPolicies/{policyName}",
    }),
  );
export type PoliciesCreateOrUpdateInput =
  typeof PoliciesCreateOrUpdateInput.Type;

// Output Schema
export const PoliciesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type PoliciesCreateOrUpdateOutput =
  typeof PoliciesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update policy with specified rule set name within a resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param policyName - The name of the Web Application Firewall Policy.
 */
export const PoliciesCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PoliciesCreateOrUpdateInput,
    outputSchema: PoliciesCreateOrUpdateOutput,
  }),
);
// Input Schema
export const PoliciesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  policyName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/FrontDoorWebApplicationFirewallPolicies/{policyName}",
  }),
);
export type PoliciesDeleteInput = typeof PoliciesDeleteInput.Type;

// Output Schema
export const PoliciesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PoliciesDeleteOutput = typeof PoliciesDeleteOutput.Type;

// The operation
/**
 * Deletes Policy
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param policyName - The name of the Web Application Firewall Policy.
 */
export const PoliciesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PoliciesDeleteInput,
  outputSchema: PoliciesDeleteOutput,
}));
// Input Schema
export const PoliciesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  policyName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/FrontDoorWebApplicationFirewallPolicies/{policyName}",
  }),
);
export type PoliciesGetInput = typeof PoliciesGetInput.Type;

// Output Schema
export const PoliciesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
});
export type PoliciesGetOutput = typeof PoliciesGetOutput.Type;

// The operation
/**
 * Retrieve protection policy with specified name within a resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param policyName - The name of the Web Application Firewall Policy.
 */
export const PoliciesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PoliciesGetInput,
  outputSchema: PoliciesGetOutput,
}));
// Input Schema
export const PoliciesListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/FrontDoorWebApplicationFirewallPolicies",
  }),
);
export type PoliciesListInput = typeof PoliciesListInput.Type;

// Output Schema
export const PoliciesListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(
    Schema.Struct({
      id: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      type: Schema.optional(Schema.String),
      location: Schema.optional(Schema.String),
      tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    }),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type PoliciesListOutput = typeof PoliciesListOutput.Type;

// The operation
/**
 * Lists all of the protection policies within a resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const PoliciesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PoliciesListInput,
  outputSchema: PoliciesListOutput,
}));
// Input Schema
export const PoliciesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Network/FrontDoorWebApplicationFirewallPolicies",
    }),
  );
export type PoliciesListBySubscriptionInput =
  typeof PoliciesListBySubscriptionInput.Type;

// Output Schema
export const PoliciesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        type: Schema.optional(Schema.String),
        location: Schema.optional(Schema.String),
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type PoliciesListBySubscriptionOutput =
  typeof PoliciesListBySubscriptionOutput.Type;

// The operation
/**
 * Lists all of the protection policies within a subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const PoliciesListBySubscription = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PoliciesListBySubscriptionInput,
    outputSchema: PoliciesListBySubscriptionOutput,
  }),
);
// Input Schema
export const PoliciesUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  policyName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/FrontDoorWebApplicationFirewallPolicies/{policyName}",
  }),
);
export type PoliciesUpdateInput = typeof PoliciesUpdateInput.Type;

// Output Schema
export const PoliciesUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
});
export type PoliciesUpdateOutput = typeof PoliciesUpdateOutput.Type;

// The operation
/**
 * Patch a specific frontdoor webApplicationFirewall policy for tags update under the specified subscription and resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param policyName - The name of the Web Application Firewall Policy.
 */
export const PoliciesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PoliciesUpdateInput,
  outputSchema: PoliciesUpdateOutput,
}));
// Input Schema
export const PreconfiguredEndpointsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/NetworkExperimentProfiles/{profileName}/preconfiguredEndpoints",
    }),
  );
export type PreconfiguredEndpointsListInput =
  typeof PreconfiguredEndpointsListInput.Type;

// Output Schema
export const PreconfiguredEndpointsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        type: Schema.optional(Schema.String),
        location: Schema.optional(Schema.String),
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type PreconfiguredEndpointsListOutput =
  typeof PreconfiguredEndpointsListOutput.Type;

// The operation
/**
 * Gets a list of Preconfigured Endpoints
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - The Profile identifier associated with the Tenant and Partner
 */
export const PreconfiguredEndpointsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PreconfiguredEndpointsListInput,
    outputSchema: PreconfiguredEndpointsListOutput,
  }),
);
// Input Schema
export const ReportsGetLatencyScorecardsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    experimentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    endDateTimeUTC: Schema.optional(Schema.String),
    country: Schema.optional(Schema.String),
    aggregationInterval: Schema.Literals(["Daily", "Weekly", "Monthly"]),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/NetworkExperimentProfiles/{profileName}/Experiments/{experimentName}/latencyScorecard",
    }),
  );
export type ReportsGetLatencyScorecardsInput =
  typeof ReportsGetLatencyScorecardsInput.Type;

// Output Schema
export const ReportsGetLatencyScorecardsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type ReportsGetLatencyScorecardsOutput =
  typeof ReportsGetLatencyScorecardsOutput.Type;

// The operation
/**
 * Gets a Latency Scorecard for a given Experiment
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - The Profile identifier associated with the Tenant and Partner
 * @param experimentName - The Experiment identifier associated with the Experiment
 * @param endDateTimeUTC - The end DateTime of the Latency Scorecard in UTC
 * @param country - The country associated with the Latency Scorecard. Values are country ISO codes as specified here- https://www.iso.org/iso-3166-country-codes.html
 * @param aggregationInterval - The aggregation interval of the Latency Scorecard
 */
export const ReportsGetLatencyScorecards = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ReportsGetLatencyScorecardsInput,
    outputSchema: ReportsGetLatencyScorecardsOutput,
  }),
);
// Input Schema
export const ReportsGetTimeseriesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    experimentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    startDateTimeUTC: Schema.String,
    endDateTimeUTC: Schema.String,
    aggregationInterval: Schema.Literals(["Hourly", "Daily"]),
    timeseriesType: Schema.Literals([
      "MeasurementCounts",
      "LatencyP50",
      "LatencyP75",
      "LatencyP95",
    ]),
    endpoint: Schema.optional(Schema.String),
    country: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/NetworkExperimentProfiles/{profileName}/Experiments/{experimentName}/timeseries",
    }),
  );
export type ReportsGetTimeseriesInput = typeof ReportsGetTimeseriesInput.Type;

// Output Schema
export const ReportsGetTimeseriesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type ReportsGetTimeseriesOutput = typeof ReportsGetTimeseriesOutput.Type;

// The operation
/**
 * Gets a Timeseries for a given Experiment
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - The Profile identifier associated with the Tenant and Partner
 * @param experimentName - The Experiment identifier associated with the Experiment
 * @param startDateTimeUTC - The start DateTime of the Timeseries in UTC
 * @param endDateTimeUTC - The end DateTime of the Timeseries in UTC
 * @param aggregationInterval - The aggregation interval of the Timeseries
 * @param timeseriesType - The type of Timeseries
 * @param endpoint - The specific endpoint
 * @param country - The country associated with the Timeseries. Values are country ISO codes as specified here- https://www.iso.org/iso-3166-country-codes.html
 */
export const ReportsGetTimeseries = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ReportsGetTimeseriesInput,
    outputSchema: ReportsGetTimeseriesOutput,
  }),
);
// Input Schema
export const RulesEnginesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    frontDoorName: Schema.String.pipe(T.PathParam()),
    rulesEngineName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/frontDoors/{frontDoorName}/rulesEngines/{rulesEngineName}",
    }),
  );
export type RulesEnginesCreateOrUpdateInput =
  typeof RulesEnginesCreateOrUpdateInput.Type;

// Output Schema
export const RulesEnginesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type RulesEnginesCreateOrUpdateOutput =
  typeof RulesEnginesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates a new Rules Engine Configuration with the specified name within the specified Front Door.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param frontDoorName - Name of the Front Door which is globally unique.
 * @param rulesEngineName - Name of the Rules Engine which is unique within the Front Door.
 */
export const RulesEnginesCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RulesEnginesCreateOrUpdateInput,
    outputSchema: RulesEnginesCreateOrUpdateOutput,
  }),
);
// Input Schema
export const RulesEnginesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    frontDoorName: Schema.String.pipe(T.PathParam()),
    rulesEngineName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/frontDoors/{frontDoorName}/rulesEngines/{rulesEngineName}",
    }),
  );
export type RulesEnginesDeleteInput = typeof RulesEnginesDeleteInput.Type;

// Output Schema
export const RulesEnginesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type RulesEnginesDeleteOutput = typeof RulesEnginesDeleteOutput.Type;

// The operation
/**
 * Deletes an existing Rules Engine Configuration with the specified parameters.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param frontDoorName - Name of the Front Door which is globally unique.
 * @param rulesEngineName - Name of the Rules Engine which is unique within the Front Door.
 */
export const RulesEnginesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RulesEnginesDeleteInput,
  outputSchema: RulesEnginesDeleteOutput,
}));
// Input Schema
export const RulesEnginesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  frontDoorName: Schema.String.pipe(T.PathParam()),
  rulesEngineName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/frontDoors/{frontDoorName}/rulesEngines/{rulesEngineName}",
  }),
);
export type RulesEnginesGetInput = typeof RulesEnginesGetInput.Type;

// Output Schema
export const RulesEnginesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
});
export type RulesEnginesGetOutput = typeof RulesEnginesGetOutput.Type;

// The operation
/**
 * Gets a Rules Engine Configuration with the specified name within the specified Front Door.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param frontDoorName - Name of the Front Door which is globally unique.
 * @param rulesEngineName - Name of the Rules Engine which is unique within the Front Door.
 */
export const RulesEnginesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RulesEnginesGetInput,
  outputSchema: RulesEnginesGetOutput,
}));
// Input Schema
export const RulesEnginesListByFrontDoorInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    frontDoorName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/frontDoors/{frontDoorName}/rulesEngines",
    }),
  );
export type RulesEnginesListByFrontDoorInput =
  typeof RulesEnginesListByFrontDoorInput.Type;

// Output Schema
export const RulesEnginesListByFrontDoorOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        type: Schema.optional(Schema.String),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type RulesEnginesListByFrontDoorOutput =
  typeof RulesEnginesListByFrontDoorOutput.Type;

// The operation
/**
 * Lists all of the Rules Engine Configurations within a Front Door.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param frontDoorName - Name of the Front Door which is globally unique.
 */
export const RulesEnginesListByFrontDoor = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RulesEnginesListByFrontDoorInput,
    outputSchema: RulesEnginesListByFrontDoorOutput,
  }),
);
