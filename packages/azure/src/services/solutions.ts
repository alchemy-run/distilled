/**
 * Azure Solutions API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";
import { SensitiveString } from "../sensitive.ts";

// Input Schema
export const ApplicationDefinitionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Solutions/applicationDefinitions/{applicationDefinitionName}",
    }),
  );
export type ApplicationDefinitionsCreateOrUpdateInput =
  typeof ApplicationDefinitionsCreateOrUpdateInput.Type;

// Output Schema
export const ApplicationDefinitionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    managedBy: Schema.optional(Schema.String),
    sku: Schema.optional(
      Schema.Struct({
        name: Schema.String,
        tier: Schema.optional(Schema.String),
        size: Schema.optional(Schema.String),
        family: Schema.optional(Schema.String),
        model: Schema.optional(Schema.String),
        capacity: Schema.optional(Schema.Number),
      }),
    ),
  });
export type ApplicationDefinitionsCreateOrUpdateOutput =
  typeof ApplicationDefinitionsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a managed application definition.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const ApplicationDefinitionsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ApplicationDefinitionsCreateOrUpdateInput,
    outputSchema: ApplicationDefinitionsCreateOrUpdateOutput,
  }));
// Input Schema
export const ApplicationDefinitionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Solutions/applicationDefinitions/{applicationDefinitionName}",
    }),
  );
export type ApplicationDefinitionsDeleteInput =
  typeof ApplicationDefinitionsDeleteInput.Type;

// Output Schema
export const ApplicationDefinitionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ApplicationDefinitionsDeleteOutput =
  typeof ApplicationDefinitionsDeleteOutput.Type;

// The operation
/**
 * Deletes the managed application definition.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const ApplicationDefinitionsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ApplicationDefinitionsDeleteInput,
    outputSchema: ApplicationDefinitionsDeleteOutput,
  }));
// Input Schema
export const ApplicationDefinitionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Solutions/applicationDefinitions/{applicationDefinitionName}",
    }),
  );
export type ApplicationDefinitionsGetInput =
  typeof ApplicationDefinitionsGetInput.Type;

// Output Schema
export const ApplicationDefinitionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    managedBy: Schema.optional(Schema.String),
    sku: Schema.optional(
      Schema.Struct({
        name: Schema.String,
        tier: Schema.optional(Schema.String),
        size: Schema.optional(Schema.String),
        family: Schema.optional(Schema.String),
        model: Schema.optional(Schema.String),
        capacity: Schema.optional(Schema.Number),
      }),
    ),
  });
export type ApplicationDefinitionsGetOutput =
  typeof ApplicationDefinitionsGetOutput.Type;

// The operation
/**
 * Gets the managed application definition.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const ApplicationDefinitionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ApplicationDefinitionsGetInput,
    outputSchema: ApplicationDefinitionsGetOutput,
  }),
);
// Input Schema
export const ApplicationDefinitionsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Solutions/applicationDefinitions",
    }),
  );
export type ApplicationDefinitionsListByResourceGroupInput =
  typeof ApplicationDefinitionsListByResourceGroupInput.Type;

// Output Schema
export const ApplicationDefinitionsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          managedBy: Schema.optional(Schema.String),
          sku: Schema.optional(
            Schema.Struct({
              name: Schema.String,
              tier: Schema.optional(Schema.String),
              size: Schema.optional(Schema.String),
              family: Schema.optional(Schema.String),
              model: Schema.optional(Schema.String),
              capacity: Schema.optional(Schema.Number),
            }),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ApplicationDefinitionsListByResourceGroupOutput =
  typeof ApplicationDefinitionsListByResourceGroupOutput.Type;

// The operation
/**
 * Lists the managed application definitions in a resource group.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const ApplicationDefinitionsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ApplicationDefinitionsListByResourceGroupInput,
    outputSchema: ApplicationDefinitionsListByResourceGroupOutput,
  }));
// Input Schema
export const ApplicationDefinitionsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Solutions/applicationDefinitions",
    }),
  );
export type ApplicationDefinitionsListBySubscriptionInput =
  typeof ApplicationDefinitionsListBySubscriptionInput.Type;

// Output Schema
export const ApplicationDefinitionsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          managedBy: Schema.optional(Schema.String),
          sku: Schema.optional(
            Schema.Struct({
              name: Schema.String,
              tier: Schema.optional(Schema.String),
              size: Schema.optional(Schema.String),
              family: Schema.optional(Schema.String),
              model: Schema.optional(Schema.String),
              capacity: Schema.optional(Schema.Number),
            }),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ApplicationDefinitionsListBySubscriptionOutput =
  typeof ApplicationDefinitionsListBySubscriptionOutput.Type;

// The operation
/**
 * Lists all the application definitions within a subscription.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const ApplicationDefinitionsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ApplicationDefinitionsListBySubscriptionInput,
    outputSchema: ApplicationDefinitionsListBySubscriptionOutput,
  }));
// Input Schema
export const ApplicationDefinitionsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Solutions/applicationDefinitions/{applicationDefinitionName}",
    }),
  );
export type ApplicationDefinitionsUpdateInput =
  typeof ApplicationDefinitionsUpdateInput.Type;

// Output Schema
export const ApplicationDefinitionsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    managedBy: Schema.optional(Schema.String),
    sku: Schema.optional(
      Schema.Struct({
        name: Schema.String,
        tier: Schema.optional(Schema.String),
        size: Schema.optional(Schema.String),
        family: Schema.optional(Schema.String),
        model: Schema.optional(Schema.String),
        capacity: Schema.optional(Schema.Number),
      }),
    ),
  });
export type ApplicationDefinitionsUpdateOutput =
  typeof ApplicationDefinitionsUpdateOutput.Type;

// The operation
/**
 * Updates the managed application definition.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const ApplicationDefinitionsUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ApplicationDefinitionsUpdateInput,
    outputSchema: ApplicationDefinitionsUpdateOutput,
  }));
// Input Schema
export const ApplicationsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Solutions/applications/{applicationName}",
    }),
  );
export type ApplicationsCreateOrUpdateInput =
  typeof ApplicationsCreateOrUpdateInput.Type;

// Output Schema
export const ApplicationsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    managedBy: Schema.optional(Schema.String),
    sku: Schema.optional(
      Schema.Struct({
        name: Schema.String,
        tier: Schema.optional(Schema.String),
        size: Schema.optional(Schema.String),
        family: Schema.optional(Schema.String),
        model: Schema.optional(Schema.String),
        capacity: Schema.optional(Schema.Number),
      }),
    ),
  });
export type ApplicationsCreateOrUpdateOutput =
  typeof ApplicationsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a managed application.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const ApplicationsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ApplicationsCreateOrUpdateInput,
    outputSchema: ApplicationsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const ApplicationsCreateOrUpdateByIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    applicationId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(T.Http({ method: "PUT", path: "/{applicationId}" }));
export type ApplicationsCreateOrUpdateByIdInput =
  typeof ApplicationsCreateOrUpdateByIdInput.Type;

// Output Schema
export const ApplicationsCreateOrUpdateByIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    managedBy: Schema.optional(Schema.String),
    sku: Schema.optional(
      Schema.Struct({
        name: Schema.String,
        tier: Schema.optional(Schema.String),
        size: Schema.optional(Schema.String),
        family: Schema.optional(Schema.String),
        model: Schema.optional(Schema.String),
        capacity: Schema.optional(Schema.Number),
      }),
    ),
  });
export type ApplicationsCreateOrUpdateByIdOutput =
  typeof ApplicationsCreateOrUpdateByIdOutput.Type;

// The operation
/**
 * Creates or updates a managed application.
 *
 * @param applicationId - The fully qualified ID of the managed application, including the managed application name and the managed application resource type. Use the format, /subscriptions/{guid}/resourceGroups/{resource-group-name}/Microsoft.Solutions/applications/{application-name}
 * @param api-version - The API version to use for this operation.
 */
export const ApplicationsCreateOrUpdateById =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ApplicationsCreateOrUpdateByIdInput,
    outputSchema: ApplicationsCreateOrUpdateByIdOutput,
  }));
// Input Schema
export const ApplicationsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Solutions/applications/{applicationName}",
    }),
  );
export type ApplicationsDeleteInput = typeof ApplicationsDeleteInput.Type;

// Output Schema
export const ApplicationsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ApplicationsDeleteOutput = typeof ApplicationsDeleteOutput.Type;

// The operation
/**
 * Deletes the managed application.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const ApplicationsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ApplicationsDeleteInput,
  outputSchema: ApplicationsDeleteOutput,
}));
// Input Schema
export const ApplicationsDeleteByIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    applicationId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(T.Http({ method: "DELETE", path: "/{applicationId}" }));
export type ApplicationsDeleteByIdInput =
  typeof ApplicationsDeleteByIdInput.Type;

// Output Schema
export const ApplicationsDeleteByIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ApplicationsDeleteByIdOutput =
  typeof ApplicationsDeleteByIdOutput.Type;

// The operation
/**
 * Deletes the managed application.
 *
 * @param applicationId - The fully qualified ID of the managed application, including the managed application name and the managed application resource type. Use the format, /subscriptions/{guid}/resourceGroups/{resource-group-name}/Microsoft.Solutions/applications/{application-name}
 * @param api-version - The API version to use for this operation.
 */
export const ApplicationsDeleteById = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ApplicationsDeleteByIdInput,
    outputSchema: ApplicationsDeleteByIdOutput,
  }),
);
// Input Schema
export const ApplicationsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Solutions/applications/{applicationName}",
  }),
);
export type ApplicationsGetInput = typeof ApplicationsGetInput.Type;

// Output Schema
export const ApplicationsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  managedBy: Schema.optional(Schema.String),
  sku: Schema.optional(
    Schema.Struct({
      name: Schema.String,
      tier: Schema.optional(Schema.String),
      size: Schema.optional(Schema.String),
      family: Schema.optional(Schema.String),
      model: Schema.optional(Schema.String),
      capacity: Schema.optional(Schema.Number),
    }),
  ),
});
export type ApplicationsGetOutput = typeof ApplicationsGetOutput.Type;

// The operation
/**
 * Gets the managed application.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const ApplicationsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ApplicationsGetInput,
  outputSchema: ApplicationsGetOutput,
}));
// Input Schema
export const ApplicationsGetByIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    applicationId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(T.Http({ method: "GET", path: "/{applicationId}" }));
export type ApplicationsGetByIdInput = typeof ApplicationsGetByIdInput.Type;

// Output Schema
export const ApplicationsGetByIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    managedBy: Schema.optional(Schema.String),
    sku: Schema.optional(
      Schema.Struct({
        name: Schema.String,
        tier: Schema.optional(Schema.String),
        size: Schema.optional(Schema.String),
        family: Schema.optional(Schema.String),
        model: Schema.optional(Schema.String),
        capacity: Schema.optional(Schema.Number),
      }),
    ),
  });
export type ApplicationsGetByIdOutput = typeof ApplicationsGetByIdOutput.Type;

// The operation
/**
 * Gets the managed application.
 *
 * @param applicationId - The fully qualified ID of the managed application, including the managed application name and the managed application resource type. Use the format, /subscriptions/{guid}/resourceGroups/{resource-group-name}/Microsoft.Solutions/applications/{application-name}
 * @param api-version - The API version to use for this operation.
 */
export const ApplicationsGetById = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ApplicationsGetByIdInput,
  outputSchema: ApplicationsGetByIdOutput,
}));
// Input Schema
export const ApplicationsListAllowedUpgradePlansInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Solutions/applications/{applicationName}/listAllowedUpgradePlans",
    }),
  );
export type ApplicationsListAllowedUpgradePlansInput =
  typeof ApplicationsListAllowedUpgradePlansInput.Type;

// Output Schema
export const ApplicationsListAllowedUpgradePlansOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          name: Schema.String,
          publisher: Schema.String,
          product: Schema.String,
          promotionCode: Schema.optional(Schema.String),
          version: Schema.String,
        }),
      ),
    ),
  });
export type ApplicationsListAllowedUpgradePlansOutput =
  typeof ApplicationsListAllowedUpgradePlansOutput.Type;

// The operation
/**
 * List allowed upgrade plans for application.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const ApplicationsListAllowedUpgradePlans =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ApplicationsListAllowedUpgradePlansInput,
    outputSchema: ApplicationsListAllowedUpgradePlansOutput,
  }));
// Input Schema
export const ApplicationsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Solutions/applications",
    }),
  );
export type ApplicationsListByResourceGroupInput =
  typeof ApplicationsListByResourceGroupInput.Type;

// Output Schema
export const ApplicationsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          managedBy: Schema.optional(Schema.String),
          sku: Schema.optional(
            Schema.Struct({
              name: Schema.String,
              tier: Schema.optional(Schema.String),
              size: Schema.optional(Schema.String),
              family: Schema.optional(Schema.String),
              model: Schema.optional(Schema.String),
              capacity: Schema.optional(Schema.Number),
            }),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ApplicationsListByResourceGroupOutput =
  typeof ApplicationsListByResourceGroupOutput.Type;

// The operation
/**
 * Lists all the applications within a resource group.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const ApplicationsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ApplicationsListByResourceGroupInput,
    outputSchema: ApplicationsListByResourceGroupOutput,
  }));
// Input Schema
export const ApplicationsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Solutions/applications",
    }),
  );
export type ApplicationsListBySubscriptionInput =
  typeof ApplicationsListBySubscriptionInput.Type;

// Output Schema
export const ApplicationsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          managedBy: Schema.optional(Schema.String),
          sku: Schema.optional(
            Schema.Struct({
              name: Schema.String,
              tier: Schema.optional(Schema.String),
              size: Schema.optional(Schema.String),
              family: Schema.optional(Schema.String),
              model: Schema.optional(Schema.String),
              capacity: Schema.optional(Schema.Number),
            }),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ApplicationsListBySubscriptionOutput =
  typeof ApplicationsListBySubscriptionOutput.Type;

// The operation
/**
 * Lists all the applications within a subscription.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const ApplicationsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ApplicationsListBySubscriptionInput,
    outputSchema: ApplicationsListBySubscriptionOutput,
  }));
// Input Schema
export const ApplicationsListTokensInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    applicationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Solutions/applications/{applicationName}/listTokens",
    }),
  );
export type ApplicationsListTokensInput =
  typeof ApplicationsListTokensInput.Type;

// Output Schema
export const ApplicationsListTokensOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          accessToken: Schema.optional(SensitiveString),
          expiresIn: Schema.optional(Schema.String),
          expiresOn: Schema.optional(Schema.String),
          notBefore: Schema.optional(Schema.String),
          authorizationAudience: Schema.optional(Schema.String),
          resourceId: Schema.optional(Schema.String),
          tokenType: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type ApplicationsListTokensOutput =
  typeof ApplicationsListTokensOutput.Type;

// The operation
/**
 * List tokens for application.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param applicationName - The name of the managed application.
 * @param api-version - The API version to use for this operation.
 */
export const ApplicationsListTokens = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ApplicationsListTokensInput,
    outputSchema: ApplicationsListTokensOutput,
  }),
);
// Input Schema
export const ApplicationsRefreshPermissionsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Solutions/applications/{applicationName}/refreshPermissions",
    }),
  );
export type ApplicationsRefreshPermissionsInput =
  typeof ApplicationsRefreshPermissionsInput.Type;

// Output Schema
export const ApplicationsRefreshPermissionsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ApplicationsRefreshPermissionsOutput =
  typeof ApplicationsRefreshPermissionsOutput.Type;

// The operation
/**
 * Refresh Permissions for application.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const ApplicationsRefreshPermissions =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ApplicationsRefreshPermissionsInput,
    outputSchema: ApplicationsRefreshPermissionsOutput,
  }));
// Input Schema
export const ApplicationsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Solutions/applications/{applicationName}",
    }),
  );
export type ApplicationsUpdateInput = typeof ApplicationsUpdateInput.Type;

// Output Schema
export const ApplicationsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    managedBy: Schema.optional(Schema.String),
    sku: Schema.optional(
      Schema.Struct({
        name: Schema.String,
        tier: Schema.optional(Schema.String),
        size: Schema.optional(Schema.String),
        family: Schema.optional(Schema.String),
        model: Schema.optional(Schema.String),
        capacity: Schema.optional(Schema.Number),
      }),
    ),
  });
export type ApplicationsUpdateOutput = typeof ApplicationsUpdateOutput.Type;

// The operation
/**
 * Updates an existing managed application.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const ApplicationsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ApplicationsUpdateInput,
  outputSchema: ApplicationsUpdateOutput,
}));
// Input Schema
export const ApplicationsUpdateAccessInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    applicationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Solutions/applications/{applicationName}/updateAccess",
    }),
  );
export type ApplicationsUpdateAccessInput =
  typeof ApplicationsUpdateAccessInput.Type;

// Output Schema
export const ApplicationsUpdateAccessOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ApplicationsUpdateAccessOutput =
  typeof ApplicationsUpdateAccessOutput.Type;

// The operation
/**
 * Update access for application.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param applicationName - The name of the managed application.
 * @param api-version - The API version to use for this operation.
 */
export const ApplicationsUpdateAccess = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ApplicationsUpdateAccessInput,
    outputSchema: ApplicationsUpdateAccessOutput,
  }),
);
// Input Schema
export const ApplicationsUpdateByIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    applicationId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(T.Http({ method: "PATCH", path: "/{applicationId}" }));
export type ApplicationsUpdateByIdInput =
  typeof ApplicationsUpdateByIdInput.Type;

// Output Schema
export const ApplicationsUpdateByIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    managedBy: Schema.optional(Schema.String),
    sku: Schema.optional(
      Schema.Struct({
        name: Schema.String,
        tier: Schema.optional(Schema.String),
        size: Schema.optional(Schema.String),
        family: Schema.optional(Schema.String),
        model: Schema.optional(Schema.String),
        capacity: Schema.optional(Schema.Number),
      }),
    ),
  });
export type ApplicationsUpdateByIdOutput =
  typeof ApplicationsUpdateByIdOutput.Type;

// The operation
/**
 * Updates an existing managed application.
 *
 * @param applicationId - The fully qualified ID of the managed application, including the managed application name and the managed application resource type. Use the format, /subscriptions/{guid}/resourceGroups/{resource-group-name}/Microsoft.Solutions/applications/{application-name}
 * @param api-version - The API version to use for this operation.
 */
export const ApplicationsUpdateById = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ApplicationsUpdateByIdInput,
    outputSchema: ApplicationsUpdateByIdOutput,
  }),
);
// Input Schema
export const JitRequestsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Solutions/jitRequests/{jitRequestName}",
    }),
  );
export type JitRequestsCreateOrUpdateInput =
  typeof JitRequestsCreateOrUpdateInput.Type;

// Output Schema
export const JitRequestsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
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
export type JitRequestsCreateOrUpdateOutput =
  typeof JitRequestsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates the JIT request.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const jitRequestsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: JitRequestsCreateOrUpdateInput,
    outputSchema: JitRequestsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const JitRequestsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Solutions/jitRequests/{jitRequestName}",
  }),
);
export type JitRequestsDeleteInput = typeof JitRequestsDeleteInput.Type;

// Output Schema
export const JitRequestsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type JitRequestsDeleteOutput = typeof JitRequestsDeleteOutput.Type;

// The operation
/**
 * Deletes the JIT request.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const jitRequestsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JitRequestsDeleteInput,
  outputSchema: JitRequestsDeleteOutput,
}));
// Input Schema
export const JitRequestsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Solutions/jitRequests/{jitRequestName}",
  }),
);
export type JitRequestsGetInput = typeof JitRequestsGetInput.Type;

// Output Schema
export const JitRequestsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
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
export type JitRequestsGetOutput = typeof JitRequestsGetOutput.Type;

// The operation
/**
 * Gets the JIT request.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const JitRequestsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JitRequestsGetInput,
  outputSchema: JitRequestsGetOutput,
}));
// Input Schema
export const JitRequestsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Solutions/jitRequests",
    }),
  );
export type JitRequestsListByResourceGroupInput =
  typeof JitRequestsListByResourceGroupInput.Type;

// Output Schema
export const JitRequestsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
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
    nextLink: Schema.optional(Schema.String),
  });
export type JitRequestsListByResourceGroupOutput =
  typeof JitRequestsListByResourceGroupOutput.Type;

// The operation
/**
 * Lists all JIT requests within the resource group.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const jitRequestsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: JitRequestsListByResourceGroupInput,
    outputSchema: JitRequestsListByResourceGroupOutput,
  }));
// Input Schema
export const JitRequestsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Solutions/jitRequests",
    }),
  );
export type JitRequestsListBySubscriptionInput =
  typeof JitRequestsListBySubscriptionInput.Type;

// Output Schema
export const JitRequestsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
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
    nextLink: Schema.optional(Schema.String),
  });
export type JitRequestsListBySubscriptionOutput =
  typeof JitRequestsListBySubscriptionOutput.Type;

// The operation
/**
 * Lists all JIT requests within the subscription.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const jitRequestsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: JitRequestsListBySubscriptionInput,
    outputSchema: JitRequestsListBySubscriptionOutput,
  }));
// Input Schema
export const JitRequestsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Solutions/jitRequests/{jitRequestName}",
  }),
);
export type JitRequestsUpdateInput = typeof JitRequestsUpdateInput.Type;

// Output Schema
export const JitRequestsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
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
export type JitRequestsUpdateOutput = typeof JitRequestsUpdateOutput.Type;

// The operation
/**
 * Updates the JIT request.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const JitRequestsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JitRequestsUpdateInput,
  outputSchema: JitRequestsUpdateOutput,
}));
