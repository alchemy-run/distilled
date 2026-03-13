/**
 * Azure Notificationhubs API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const NamespacesCheckAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.NotificationHubs/checkNamespaceAvailability",
    }),
  );
export type NamespacesCheckAvailabilityInput =
  typeof NamespacesCheckAvailabilityInput.Type;

// Output Schema
export const NamespacesCheckAvailabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type NamespacesCheckAvailabilityOutput =
  typeof NamespacesCheckAvailabilityOutput.Type;

// The operation
/**
 * Checks the availability of the given service namespace across all Azure subscriptions. This is useful because the domain name is created based on the service namespace name.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param api-version - The API version to use for this operation.
 */
export const NamespacesCheckAvailability = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: NamespacesCheckAvailabilityInput,
    outputSchema: NamespacesCheckAvailabilityOutput,
  }),
);
// Input Schema
export const NamespacesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NotificationHubs/namespaces/{namespaceName}",
    }),
  );
export type NamespacesCreateOrUpdateInput =
  typeof NamespacesCreateOrUpdateInput.Type;

// Output Schema
export const NamespacesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type NamespacesCreateOrUpdateOutput =
  typeof NamespacesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates / Updates a Notification Hub namespace. This operation is idempotent.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NamespacesCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: NamespacesCreateOrUpdateInput,
    outputSchema: NamespacesCreateOrUpdateOutput,
  }),
);
// Input Schema
export const NamespacesCreateOrUpdateAuthorizationRuleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NotificationHubs/namespaces/{namespaceName}/authorizationRules/{authorizationRuleName}",
    }),
  );
export type NamespacesCreateOrUpdateAuthorizationRuleInput =
  typeof NamespacesCreateOrUpdateAuthorizationRuleInput.Type;

// Output Schema
export const NamespacesCreateOrUpdateAuthorizationRuleOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type NamespacesCreateOrUpdateAuthorizationRuleOutput =
  typeof NamespacesCreateOrUpdateAuthorizationRuleOutput.Type;

// The operation
/**
 * Creates an authorization rule for a namespace
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NamespacesCreateOrUpdateAuthorizationRule =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NamespacesCreateOrUpdateAuthorizationRuleInput,
    outputSchema: NamespacesCreateOrUpdateAuthorizationRuleOutput,
  }));
// Input Schema
export const NamespacesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NotificationHubs/namespaces/{namespaceName}",
  }),
);
export type NamespacesDeleteInput = typeof NamespacesDeleteInput.Type;

// Output Schema
export const NamespacesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type NamespacesDeleteOutput = typeof NamespacesDeleteOutput.Type;

// The operation
/**
 * Deletes an existing namespace. This operation also removes all associated notificationHubs under the namespace.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NamespacesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: NamespacesDeleteInput,
  outputSchema: NamespacesDeleteOutput,
}));
// Input Schema
export const NamespacesDeleteAuthorizationRuleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NotificationHubs/namespaces/{namespaceName}/authorizationRules/{authorizationRuleName}",
    }),
  );
export type NamespacesDeleteAuthorizationRuleInput =
  typeof NamespacesDeleteAuthorizationRuleInput.Type;

// Output Schema
export const NamespacesDeleteAuthorizationRuleOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type NamespacesDeleteAuthorizationRuleOutput =
  typeof NamespacesDeleteAuthorizationRuleOutput.Type;

// The operation
/**
 * Deletes a namespace authorization rule
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NamespacesDeleteAuthorizationRule =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NamespacesDeleteAuthorizationRuleInput,
    outputSchema: NamespacesDeleteAuthorizationRuleOutput,
  }));
// Input Schema
export const NamespacesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NotificationHubs/namespaces/{namespaceName}",
  }),
);
export type NamespacesGetInput = typeof NamespacesGetInput.Type;

// Output Schema
export const NamespacesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type NamespacesGetOutput = typeof NamespacesGetOutput.Type;

// The operation
/**
 * Returns the given namespace.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NamespacesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: NamespacesGetInput,
  outputSchema: NamespacesGetOutput,
}));
// Input Schema
export const NamespacesGetAuthorizationRuleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NotificationHubs/namespaces/{namespaceName}/authorizationRules/{authorizationRuleName}",
    }),
  );
export type NamespacesGetAuthorizationRuleInput =
  typeof NamespacesGetAuthorizationRuleInput.Type;

// Output Schema
export const NamespacesGetAuthorizationRuleOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type NamespacesGetAuthorizationRuleOutput =
  typeof NamespacesGetAuthorizationRuleOutput.Type;

// The operation
/**
 * Gets an authorization rule for a namespace by name.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NamespacesGetAuthorizationRule =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NamespacesGetAuthorizationRuleInput,
    outputSchema: NamespacesGetAuthorizationRuleOutput,
  }));
// Input Schema
export const NamespacesGetPnsCredentialsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NotificationHubs/namespaces/{namespaceName}/pnsCredentials",
    }),
  );
export type NamespacesGetPnsCredentialsInput =
  typeof NamespacesGetPnsCredentialsInput.Type;

// Output Schema
export const NamespacesGetPnsCredentialsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type NamespacesGetPnsCredentialsOutput =
  typeof NamespacesGetPnsCredentialsOutput.Type;

// The operation
/**
 * Lists the PNS credentials associated with a namespace.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NamespacesGetPnsCredentials = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: NamespacesGetPnsCredentialsInput,
    outputSchema: NamespacesGetPnsCredentialsOutput,
  }),
);
// Input Schema
export const NamespacesListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  $skipToken: Schema.optional(Schema.String),
  $top: Schema.optional(Schema.Number),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NotificationHubs/namespaces",
  }),
);
export type NamespacesListInput = typeof NamespacesListInput.Type;

// Output Schema
export const NamespacesListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
export type NamespacesListOutput = typeof NamespacesListOutput.Type;

// The operation
/**
 * Lists the available namespaces within a resource group.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param $skipToken - Skip token for subsequent requests.
 * @param $top - Maximum number of results to return.
 * @param api-version - The API version to use for this operation.
 */
export const NamespacesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: NamespacesListInput,
  outputSchema: NamespacesListOutput,
}));
// Input Schema
export const NamespacesListAllInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    $skipToken: Schema.optional(Schema.String),
    $top: Schema.optional(Schema.Number),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.NotificationHubs/namespaces",
  }),
);
export type NamespacesListAllInput = typeof NamespacesListAllInput.Type;

// Output Schema
export const NamespacesListAllOutput =
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
export type NamespacesListAllOutput = typeof NamespacesListAllOutput.Type;

// The operation
/**
 * Lists all the available namespaces within the subscription.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param $skipToken - Skip token for subsequent requests.
 * @param $top - Maximum number of results to return.
 * @param api-version - The API version to use for this operation.
 */
export const NamespacesListAll = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: NamespacesListAllInput,
  outputSchema: NamespacesListAllOutput,
}));
// Input Schema
export const NamespacesListAuthorizationRulesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NotificationHubs/namespaces/{namespaceName}/authorizationRules",
    }),
  );
export type NamespacesListAuthorizationRulesInput =
  typeof NamespacesListAuthorizationRulesInput.Type;

// Output Schema
export const NamespacesListAuthorizationRulesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type NamespacesListAuthorizationRulesOutput =
  typeof NamespacesListAuthorizationRulesOutput.Type;

// The operation
/**
 * Gets the authorization rules for a namespace.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NamespacesListAuthorizationRules =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NamespacesListAuthorizationRulesInput,
    outputSchema: NamespacesListAuthorizationRulesOutput,
  }));
// Input Schema
export const NamespacesListKeysInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NotificationHubs/namespaces/{namespaceName}/authorizationRules/{authorizationRuleName}/listKeys",
    }),
  );
export type NamespacesListKeysInput = typeof NamespacesListKeysInput.Type;

// Output Schema
export const NamespacesListKeysOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    primaryConnectionString: Schema.optional(Schema.String),
    secondaryConnectionString: Schema.optional(Schema.String),
    primaryKey: Schema.optional(Schema.String),
    secondaryKey: Schema.optional(Schema.String),
    keyName: Schema.optional(Schema.String),
  });
export type NamespacesListKeysOutput = typeof NamespacesListKeysOutput.Type;

// The operation
/**
 * Gets the Primary and Secondary ConnectionStrings to the namespace.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NamespacesListKeys = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: NamespacesListKeysInput,
  outputSchema: NamespacesListKeysOutput,
}));
// Input Schema
export const NamespacesRegenerateKeysInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NotificationHubs/namespaces/{namespaceName}/authorizationRules/{authorizationRuleName}/regenerateKeys",
    }),
  );
export type NamespacesRegenerateKeysInput =
  typeof NamespacesRegenerateKeysInput.Type;

// Output Schema
export const NamespacesRegenerateKeysOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    primaryConnectionString: Schema.optional(Schema.String),
    secondaryConnectionString: Schema.optional(Schema.String),
    primaryKey: Schema.optional(Schema.String),
    secondaryKey: Schema.optional(Schema.String),
    keyName: Schema.optional(Schema.String),
  });
export type NamespacesRegenerateKeysOutput =
  typeof NamespacesRegenerateKeysOutput.Type;

// The operation
/**
 * Regenerates the Primary/Secondary Keys to the Namespace Authorization Rule
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NamespacesRegenerateKeys = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: NamespacesRegenerateKeysInput,
    outputSchema: NamespacesRegenerateKeysOutput,
  }),
);
// Input Schema
export const NamespacesUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NotificationHubs/namespaces/{namespaceName}",
  }),
);
export type NamespacesUpdateInput = typeof NamespacesUpdateInput.Type;

// Output Schema
export const NamespacesUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  },
);
export type NamespacesUpdateOutput = typeof NamespacesUpdateOutput.Type;

// The operation
/**
 * Patches the existing namespace.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NamespacesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: NamespacesUpdateInput,
  outputSchema: NamespacesUpdateOutput,
}));
// Input Schema
export const NotificationHubsCheckNotificationHubAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NotificationHubs/namespaces/{namespaceName}/checkNotificationHubAvailability",
    }),
  );
export type NotificationHubsCheckNotificationHubAvailabilityInput =
  typeof NotificationHubsCheckNotificationHubAvailabilityInput.Type;

// Output Schema
export const NotificationHubsCheckNotificationHubAvailabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type NotificationHubsCheckNotificationHubAvailabilityOutput =
  typeof NotificationHubsCheckNotificationHubAvailabilityOutput.Type;

// The operation
/**
 * Checks the availability of the given notificationHub in a namespace.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NotificationHubsCheckNotificationHubAvailability =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NotificationHubsCheckNotificationHubAvailabilityInput,
    outputSchema: NotificationHubsCheckNotificationHubAvailabilityOutput,
  }));
// Input Schema
export const NotificationHubsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NotificationHubs/namespaces/{namespaceName}/notificationHubs/{notificationHubName}",
    }),
  );
export type NotificationHubsCreateOrUpdateInput =
  typeof NotificationHubsCreateOrUpdateInput.Type;

// Output Schema
export const NotificationHubsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type NotificationHubsCreateOrUpdateOutput =
  typeof NotificationHubsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates/Update a NotificationHub in a namespace.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NotificationHubsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NotificationHubsCreateOrUpdateInput,
    outputSchema: NotificationHubsCreateOrUpdateOutput,
  }));
// Input Schema
export const NotificationHubsCreateOrUpdateAuthorizationRuleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NotificationHubs/namespaces/{namespaceName}/notificationHubs/{notificationHubName}/authorizationRules/{authorizationRuleName}",
    }),
  );
export type NotificationHubsCreateOrUpdateAuthorizationRuleInput =
  typeof NotificationHubsCreateOrUpdateAuthorizationRuleInput.Type;

// Output Schema
export const NotificationHubsCreateOrUpdateAuthorizationRuleOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type NotificationHubsCreateOrUpdateAuthorizationRuleOutput =
  typeof NotificationHubsCreateOrUpdateAuthorizationRuleOutput.Type;

// The operation
/**
 * Creates/Updates an authorization rule for a NotificationHub
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NotificationHubsCreateOrUpdateAuthorizationRule =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NotificationHubsCreateOrUpdateAuthorizationRuleInput,
    outputSchema: NotificationHubsCreateOrUpdateAuthorizationRuleOutput,
  }));
// Input Schema
export const NotificationHubsDebugSendInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NotificationHubs/namespaces/{namespaceName}/notificationHubs/{notificationHubName}/debugsend",
    }),
  );
export type NotificationHubsDebugSendInput =
  typeof NotificationHubsDebugSendInput.Type;

// Output Schema
export const NotificationHubsDebugSendOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type NotificationHubsDebugSendOutput =
  typeof NotificationHubsDebugSendOutput.Type;

// The operation
/**
 * Test send a push notification.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NotificationHubsDebugSend = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: NotificationHubsDebugSendInput,
    outputSchema: NotificationHubsDebugSendOutput,
  }),
);
// Input Schema
export const NotificationHubsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NotificationHubs/namespaces/{namespaceName}/notificationHubs/{notificationHubName}",
    }),
  );
export type NotificationHubsDeleteInput =
  typeof NotificationHubsDeleteInput.Type;

// Output Schema
export const NotificationHubsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type NotificationHubsDeleteOutput =
  typeof NotificationHubsDeleteOutput.Type;

// The operation
/**
 * Deletes a notification hub associated with a namespace.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NotificationHubsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: NotificationHubsDeleteInput,
    outputSchema: NotificationHubsDeleteOutput,
  }),
);
// Input Schema
export const NotificationHubsDeleteAuthorizationRuleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NotificationHubs/namespaces/{namespaceName}/notificationHubs/{notificationHubName}/authorizationRules/{authorizationRuleName}",
    }),
  );
export type NotificationHubsDeleteAuthorizationRuleInput =
  typeof NotificationHubsDeleteAuthorizationRuleInput.Type;

// Output Schema
export const NotificationHubsDeleteAuthorizationRuleOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type NotificationHubsDeleteAuthorizationRuleOutput =
  typeof NotificationHubsDeleteAuthorizationRuleOutput.Type;

// The operation
/**
 * Deletes a notificationHub authorization rule
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NotificationHubsDeleteAuthorizationRule =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NotificationHubsDeleteAuthorizationRuleInput,
    outputSchema: NotificationHubsDeleteAuthorizationRuleOutput,
  }));
// Input Schema
export const NotificationHubsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NotificationHubs/namespaces/{namespaceName}/notificationHubs/{notificationHubName}",
    }),
  );
export type NotificationHubsGetInput = typeof NotificationHubsGetInput.Type;

// Output Schema
export const NotificationHubsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type NotificationHubsGetOutput = typeof NotificationHubsGetOutput.Type;

// The operation
/**
 * Gets the notification hub.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NotificationHubsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: NotificationHubsGetInput,
  outputSchema: NotificationHubsGetOutput,
}));
// Input Schema
export const NotificationHubsGetAuthorizationRuleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NotificationHubs/namespaces/{namespaceName}/notificationHubs/{notificationHubName}/authorizationRules/{authorizationRuleName}",
    }),
  );
export type NotificationHubsGetAuthorizationRuleInput =
  typeof NotificationHubsGetAuthorizationRuleInput.Type;

// Output Schema
export const NotificationHubsGetAuthorizationRuleOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type NotificationHubsGetAuthorizationRuleOutput =
  typeof NotificationHubsGetAuthorizationRuleOutput.Type;

// The operation
/**
 * Gets an authorization rule for a NotificationHub by name.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NotificationHubsGetAuthorizationRule =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NotificationHubsGetAuthorizationRuleInput,
    outputSchema: NotificationHubsGetAuthorizationRuleOutput,
  }));
// Input Schema
export const NotificationHubsGetPnsCredentialsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NotificationHubs/namespaces/{namespaceName}/notificationHubs/{notificationHubName}/pnsCredentials",
    }),
  );
export type NotificationHubsGetPnsCredentialsInput =
  typeof NotificationHubsGetPnsCredentialsInput.Type;

// Output Schema
export const NotificationHubsGetPnsCredentialsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type NotificationHubsGetPnsCredentialsOutput =
  typeof NotificationHubsGetPnsCredentialsOutput.Type;

// The operation
/**
 * Lists the PNS Credentials associated with a notification hub.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NotificationHubsGetPnsCredentials =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NotificationHubsGetPnsCredentialsInput,
    outputSchema: NotificationHubsGetPnsCredentialsOutput,
  }));
// Input Schema
export const NotificationHubsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    $skipToken: Schema.optional(Schema.String),
    $top: Schema.optional(Schema.Number),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NotificationHubs/namespaces/{namespaceName}/notificationHubs",
    }),
  );
export type NotificationHubsListInput = typeof NotificationHubsListInput.Type;

// Output Schema
export const NotificationHubsListOutput =
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
export type NotificationHubsListOutput = typeof NotificationHubsListOutput.Type;

// The operation
/**
 * Lists the notification hubs associated with a namespace.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param $skipToken - Continuation token.
 * @param $top - Page size.
 * @param api-version - The API version to use for this operation.
 */
export const NotificationHubsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: NotificationHubsListInput,
    outputSchema: NotificationHubsListOutput,
  }),
);
// Input Schema
export const NotificationHubsListAuthorizationRulesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NotificationHubs/namespaces/{namespaceName}/notificationHubs/{notificationHubName}/authorizationRules",
    }),
  );
export type NotificationHubsListAuthorizationRulesInput =
  typeof NotificationHubsListAuthorizationRulesInput.Type;

// Output Schema
export const NotificationHubsListAuthorizationRulesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type NotificationHubsListAuthorizationRulesOutput =
  typeof NotificationHubsListAuthorizationRulesOutput.Type;

// The operation
/**
 * Gets the authorization rules for a NotificationHub.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NotificationHubsListAuthorizationRules =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NotificationHubsListAuthorizationRulesInput,
    outputSchema: NotificationHubsListAuthorizationRulesOutput,
  }));
// Input Schema
export const NotificationHubsListKeysInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NotificationHubs/namespaces/{namespaceName}/notificationHubs/{notificationHubName}/authorizationRules/{authorizationRuleName}/listKeys",
    }),
  );
export type NotificationHubsListKeysInput =
  typeof NotificationHubsListKeysInput.Type;

// Output Schema
export const NotificationHubsListKeysOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    primaryConnectionString: Schema.optional(Schema.String),
    secondaryConnectionString: Schema.optional(Schema.String),
    primaryKey: Schema.optional(Schema.String),
    secondaryKey: Schema.optional(Schema.String),
    keyName: Schema.optional(Schema.String),
  });
export type NotificationHubsListKeysOutput =
  typeof NotificationHubsListKeysOutput.Type;

// The operation
/**
 * Gets the Primary and Secondary ConnectionStrings to the NotificationHub
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NotificationHubsListKeys = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: NotificationHubsListKeysInput,
    outputSchema: NotificationHubsListKeysOutput,
  }),
);
// Input Schema
export const NotificationHubsRegenerateKeysInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NotificationHubs/namespaces/{namespaceName}/notificationHubs/{notificationHubName}/authorizationRules/{authorizationRuleName}/regenerateKeys",
    }),
  );
export type NotificationHubsRegenerateKeysInput =
  typeof NotificationHubsRegenerateKeysInput.Type;

// Output Schema
export const NotificationHubsRegenerateKeysOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    primaryConnectionString: Schema.optional(Schema.String),
    secondaryConnectionString: Schema.optional(Schema.String),
    primaryKey: Schema.optional(Schema.String),
    secondaryKey: Schema.optional(Schema.String),
    keyName: Schema.optional(Schema.String),
  });
export type NotificationHubsRegenerateKeysOutput =
  typeof NotificationHubsRegenerateKeysOutput.Type;

// The operation
/**
 * Regenerates the Primary/Secondary Keys to the NotificationHub Authorization Rule
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NotificationHubsRegenerateKeys =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NotificationHubsRegenerateKeysInput,
    outputSchema: NotificationHubsRegenerateKeysOutput,
  }));
// Input Schema
export const NotificationHubsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NotificationHubs/namespaces/{namespaceName}/notificationHubs/{notificationHubName}",
    }),
  );
export type NotificationHubsUpdateInput =
  typeof NotificationHubsUpdateInput.Type;

// Output Schema
export const NotificationHubsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type NotificationHubsUpdateOutput =
  typeof NotificationHubsUpdateOutput.Type;

// The operation
/**
 * Patch a NotificationHub in a namespace.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NotificationHubsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: NotificationHubsUpdateInput,
    outputSchema: NotificationHubsUpdateOutput,
  }),
);
// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.NotificationHubs/operations",
  }),
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
        properties: Schema.optional(
          Schema.Struct({
            serviceSpecification: Schema.optional(
              Schema.Struct({
                logSpecifications: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      name: Schema.optional(Schema.String),
                      displayName: Schema.optional(Schema.String),
                      blobDuration: Schema.optional(Schema.String),
                    }),
                  ),
                ),
                metricSpecifications: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      name: Schema.optional(Schema.String),
                      displayName: Schema.optional(Schema.String),
                      displayDescription: Schema.optional(Schema.String),
                      unit: Schema.optional(Schema.String),
                      aggregationType: Schema.optional(Schema.String),
                      availabilities: Schema.optional(
                        Schema.Array(
                          Schema.Struct({
                            timeGrain: Schema.optional(Schema.String),
                            blobDuration: Schema.optional(Schema.String),
                          }),
                        ),
                      ),
                      metricFilterPattern: Schema.optional(Schema.String),
                      fillGapWithZero: Schema.optional(Schema.Boolean),
                    }),
                  ),
                ),
              }),
            ),
          }),
        ),
        isDataAction: Schema.optional(Schema.Boolean),
      }),
    ),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type OperationsListOutput = typeof OperationsListOutput.Type;

// The operation
/**
 * Lists all available Notification Hubs operations.
 *
 * @param api-version - The API version to use for this operation.
 */
export const OperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationsListInput,
  outputSchema: OperationsListOutput,
}));
// Input Schema
export const PrivateEndpointConnectionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NotificationHubs/namespaces/{namespaceName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type PrivateEndpointConnectionsDeleteInput =
  typeof PrivateEndpointConnectionsDeleteInput.Type;

// Output Schema
export const PrivateEndpointConnectionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PrivateEndpointConnectionsDeleteOutput =
  typeof PrivateEndpointConnectionsDeleteOutput.Type;

// The operation
/**
 * Deletes the Private Endpoint Connection.
This is a public API that can be called directly by Notification Hubs users.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const PrivateEndpointConnectionsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsDeleteInput,
    outputSchema: PrivateEndpointConnectionsDeleteOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NotificationHubs/namespaces/{namespaceName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type PrivateEndpointConnectionsGetInput =
  typeof PrivateEndpointConnectionsGetInput.Type;

// Output Schema
export const PrivateEndpointConnectionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PrivateEndpointConnectionsGetOutput =
  typeof PrivateEndpointConnectionsGetOutput.Type;

// The operation
/**
 * Returns a Private Endpoint Connection with a given name. 
This is a public API that can be called directly by Notification Hubs users.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const PrivateEndpointConnectionsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsGetInput,
    outputSchema: PrivateEndpointConnectionsGetOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsGetGroupIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subResourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NotificationHubs/namespaces/{namespaceName}/privateLinkResources/{subResourceName}",
    }),
  );
export type PrivateEndpointConnectionsGetGroupIdInput =
  typeof PrivateEndpointConnectionsGetGroupIdInput.Type;

// Output Schema
export const PrivateEndpointConnectionsGetGroupIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PrivateEndpointConnectionsGetGroupIdOutput =
  typeof PrivateEndpointConnectionsGetGroupIdOutput.Type;

// The operation
/**
 * Returns Group Id response. 
This is a public API required by the Networking RP contract. It can be used directly by Notification Hubs users.
 *
 * Even though this namespace requires subscription id, resource group and namespace name, it returns a constant payload (for a given namespacE) every time it's called.
 * That's why we don't send it to the sibling RP, but process it directly in the scale unit that received the request.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subResourceName - Name of the Private Link sub-resource. The only supported sub-resource is "namespace"
 * @param api-version - The API version to use for this operation.
 */
export const PrivateEndpointConnectionsGetGroupId =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsGetGroupIdInput,
    outputSchema: PrivateEndpointConnectionsGetGroupIdOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NotificationHubs/namespaces/{namespaceName}/privateEndpointConnections",
    }),
  );
export type PrivateEndpointConnectionsListInput =
  typeof PrivateEndpointConnectionsListInput.Type;

// Output Schema
export const PrivateEndpointConnectionsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type PrivateEndpointConnectionsListOutput =
  typeof PrivateEndpointConnectionsListOutput.Type;

// The operation
/**
 * Returns all Private Endpoint Connections that belong to the given Notification Hubs namespace.
This is a public API that can be called directly by Notification Hubs users.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const PrivateEndpointConnectionsList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsListInput,
    outputSchema: PrivateEndpointConnectionsListOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsListGroupIdsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NotificationHubs/namespaces/{namespaceName}/privateLinkResources",
    }),
  );
export type PrivateEndpointConnectionsListGroupIdsInput =
  typeof PrivateEndpointConnectionsListGroupIdsInput.Type;

// Output Schema
export const PrivateEndpointConnectionsListGroupIdsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type PrivateEndpointConnectionsListGroupIdsOutput =
  typeof PrivateEndpointConnectionsListGroupIdsOutput.Type;

// The operation
/**
 * Returns all Group Ids supported by the Notification Hubs RP.
This is a public API required by the Networking RP contract. It can be used directly by Notification Hubs users.
 *
 * Even though this namespace requires subscription id, resource group and namespace name, it returns a constant payload (for a given namespacE) every time it's called.
 * That's why we don't send it to the sibling RP, but process it directly in the scale unit that received the request.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const PrivateEndpointConnectionsListGroupIds =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsListGroupIdsInput,
    outputSchema: PrivateEndpointConnectionsListGroupIdsOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NotificationHubs/namespaces/{namespaceName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type PrivateEndpointConnectionsUpdateInput =
  typeof PrivateEndpointConnectionsUpdateInput.Type;

// Output Schema
export const PrivateEndpointConnectionsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PrivateEndpointConnectionsUpdateOutput =
  typeof PrivateEndpointConnectionsUpdateOutput.Type;

// The operation
/**
 * Approves or rejects Private Endpoint Connection.
This is a public API that can be called directly by Notification Hubs users.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const PrivateEndpointConnectionsUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsUpdateInput,
    outputSchema: PrivateEndpointConnectionsUpdateOutput,
  }));
