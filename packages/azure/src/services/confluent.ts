/**
 * Azure Confluent API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";
import { SensitiveString } from "../sensitive.ts";

// Input Schema
export const AccessCreateRoleBindingInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    organizationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/access/default/createRoleBinding",
    }),
  );
export type AccessCreateRoleBindingInput =
  typeof AccessCreateRoleBindingInput.Type;

// Output Schema
export const AccessCreateRoleBindingOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    kind: Schema.optional(Schema.String),
    id: Schema.optional(Schema.String),
    metadata: Schema.optional(
      Schema.Struct({
        self: Schema.optional(Schema.String),
        resource_name: Schema.optional(Schema.String),
        created_at: Schema.optional(Schema.String),
        updated_at: Schema.optional(Schema.String),
        deleted_at: Schema.optional(Schema.String),
      }),
    ),
    principal: Schema.optional(Schema.String),
    role_name: Schema.optional(Schema.String),
    crn_pattern: Schema.optional(Schema.String),
  });
export type AccessCreateRoleBindingOutput =
  typeof AccessCreateRoleBindingOutput.Type;

// The operation
/**
 * Organization role bindings
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param organizationName - Organization resource name
 */
export const AccessCreateRoleBinding = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AccessCreateRoleBindingInput,
    outputSchema: AccessCreateRoleBindingOutput,
  }),
);
// Input Schema
export const AccessDeleteRoleBindingInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    organizationName: Schema.String.pipe(T.PathParam()),
    roleBindingId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/access/default/deleteRoleBinding/{roleBindingId}",
    }),
  );
export type AccessDeleteRoleBindingInput =
  typeof AccessDeleteRoleBindingInput.Type;

// Output Schema
export const AccessDeleteRoleBindingOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AccessDeleteRoleBindingOutput =
  typeof AccessDeleteRoleBindingOutput.Type;

// The operation
/**
 * Organization role bindings
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param organizationName - Organization resource name
 * @param roleBindingId - Confluent Role binding id
 */
export const AccessDeleteRoleBinding = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AccessDeleteRoleBindingInput,
    outputSchema: AccessDeleteRoleBindingOutput,
  }),
);
// Input Schema
export const AccessInviteUserInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  organizationName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/access/default/createInvitation",
  }),
);
export type AccessInviteUserInput = typeof AccessInviteUserInput.Type;

// Output Schema
export const AccessInviteUserOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    kind: Schema.optional(Schema.String),
    id: Schema.optional(Schema.String),
    metadata: Schema.optional(
      Schema.Struct({
        self: Schema.optional(Schema.String),
        resource_name: Schema.optional(Schema.String),
        created_at: Schema.optional(Schema.String),
        updated_at: Schema.optional(Schema.String),
        deleted_at: Schema.optional(Schema.String),
      }),
    ),
    email: Schema.optional(Schema.String),
    auth_type: Schema.optional(Schema.String),
    status: Schema.optional(Schema.String),
    accepted_at: Schema.optional(Schema.String),
    expires_at: Schema.optional(Schema.String),
  },
);
export type AccessInviteUserOutput = typeof AccessInviteUserOutput.Type;

// The operation
/**
 * Invite user to the organization
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param organizationName - Organization resource name
 */
export const AccessInviteUser = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AccessInviteUserInput,
  outputSchema: AccessInviteUserOutput,
}));
// Input Schema
export const AccessListClustersInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    organizationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/access/default/listClusters",
    }),
  );
export type AccessListClustersInput = typeof AccessListClustersInput.Type;

// Output Schema
export const AccessListClustersOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    kind: Schema.optional(Schema.String),
    metadata: Schema.optional(
      Schema.Struct({
        first: Schema.optional(Schema.String),
        last: Schema.optional(Schema.String),
        prev: Schema.optional(Schema.String),
        next: Schema.optional(Schema.String),
        total_size: Schema.optional(Schema.Number),
      }),
    ),
    data: Schema.optional(
      Schema.Array(
        Schema.Struct({
          kind: Schema.optional(Schema.String),
          id: Schema.optional(Schema.String),
          metadata: Schema.optional(
            Schema.Struct({
              self: Schema.optional(Schema.String),
              resource_name: Schema.optional(Schema.String),
              created_at: Schema.optional(Schema.String),
              updated_at: Schema.optional(Schema.String),
              deleted_at: Schema.optional(Schema.String),
            }),
          ),
          display_name: Schema.optional(Schema.String),
          spec: Schema.optional(
            Schema.Struct({
              display_name: Schema.optional(Schema.String),
              availability: Schema.optional(Schema.String),
              cloud: Schema.optional(Schema.String),
              zone: Schema.optional(Schema.String),
              region: Schema.optional(Schema.String),
              kafka_bootstrap_endpoint: Schema.optional(Schema.String),
              http_endpoint: Schema.optional(Schema.String),
              api_endpoint: Schema.optional(Schema.String),
              config: Schema.optional(
                Schema.Struct({
                  kind: Schema.optional(Schema.String),
                }),
              ),
              environment: Schema.optional(
                Schema.Struct({
                  id: Schema.optional(Schema.String),
                  environment: Schema.optional(Schema.String),
                  related: Schema.optional(Schema.String),
                  resource_name: Schema.optional(Schema.String),
                }),
              ),
              network: Schema.optional(
                Schema.Struct({
                  id: Schema.optional(Schema.String),
                  environment: Schema.optional(Schema.String),
                  related: Schema.optional(Schema.String),
                  resource_name: Schema.optional(Schema.String),
                }),
              ),
              byok: Schema.optional(
                Schema.Struct({
                  id: Schema.optional(Schema.String),
                  related: Schema.optional(Schema.String),
                  resource_name: Schema.optional(Schema.String),
                }),
              ),
            }),
          ),
          status: Schema.optional(
            Schema.Struct({
              phase: Schema.optional(Schema.String),
              cku: Schema.optional(Schema.Number),
            }),
          ),
        }),
      ),
    ),
  });
export type AccessListClustersOutput = typeof AccessListClustersOutput.Type;

// The operation
/**
 * Cluster details
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param organizationName - Organization resource name
 */
export const AccessListClusters = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AccessListClustersInput,
  outputSchema: AccessListClustersOutput,
}));
// Input Schema
export const AccessListEnvironmentsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    organizationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/access/default/listEnvironments",
    }),
  );
export type AccessListEnvironmentsInput =
  typeof AccessListEnvironmentsInput.Type;

// Output Schema
export const AccessListEnvironmentsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    kind: Schema.optional(Schema.String),
    metadata: Schema.optional(
      Schema.Struct({
        first: Schema.optional(Schema.String),
        last: Schema.optional(Schema.String),
        prev: Schema.optional(Schema.String),
        next: Schema.optional(Schema.String),
        total_size: Schema.optional(Schema.Number),
      }),
    ),
    data: Schema.optional(
      Schema.Array(
        Schema.Struct({
          kind: Schema.optional(Schema.String),
          id: Schema.optional(Schema.String),
          metadata: Schema.optional(
            Schema.Struct({
              self: Schema.optional(Schema.String),
              resource_name: Schema.optional(Schema.String),
              created_at: Schema.optional(Schema.String),
              updated_at: Schema.optional(Schema.String),
              deleted_at: Schema.optional(Schema.String),
            }),
          ),
          display_name: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type AccessListEnvironmentsOutput =
  typeof AccessListEnvironmentsOutput.Type;

// The operation
/**
 * Environment list of an organization
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param organizationName - Organization resource name
 */
export const AccessListEnvironments = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AccessListEnvironmentsInput,
    outputSchema: AccessListEnvironmentsOutput,
  }),
);
// Input Schema
export const AccessListInvitationsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    organizationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/access/default/listInvitations",
    }),
  );
export type AccessListInvitationsInput = typeof AccessListInvitationsInput.Type;

// Output Schema
export const AccessListInvitationsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    kind: Schema.optional(Schema.String),
    metadata: Schema.optional(
      Schema.Struct({
        first: Schema.optional(Schema.String),
        last: Schema.optional(Schema.String),
        prev: Schema.optional(Schema.String),
        next: Schema.optional(Schema.String),
        total_size: Schema.optional(Schema.Number),
      }),
    ),
    data: Schema.optional(
      Schema.Array(
        Schema.Struct({
          kind: Schema.optional(Schema.String),
          id: Schema.optional(Schema.String),
          metadata: Schema.optional(
            Schema.Struct({
              self: Schema.optional(Schema.String),
              resource_name: Schema.optional(Schema.String),
              created_at: Schema.optional(Schema.String),
              updated_at: Schema.optional(Schema.String),
              deleted_at: Schema.optional(Schema.String),
            }),
          ),
          email: Schema.optional(Schema.String),
          auth_type: Schema.optional(Schema.String),
          status: Schema.optional(Schema.String),
          accepted_at: Schema.optional(Schema.String),
          expires_at: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type AccessListInvitationsOutput =
  typeof AccessListInvitationsOutput.Type;

// The operation
/**
 * Organization accounts invitation details
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param organizationName - Organization resource name
 */
export const AccessListInvitations = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AccessListInvitationsInput,
    outputSchema: AccessListInvitationsOutput,
  }),
);
// Input Schema
export const AccessListRoleBindingNameListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    organizationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/access/default/listRoleBindingNameList",
    }),
  );
export type AccessListRoleBindingNameListInput =
  typeof AccessListRoleBindingNameListInput.Type;

// Output Schema
export const AccessListRoleBindingNameListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    kind: Schema.optional(Schema.String),
    metadata: Schema.optional(
      Schema.Struct({
        first: Schema.optional(Schema.String),
        last: Schema.optional(Schema.String),
        prev: Schema.optional(Schema.String),
        next: Schema.optional(Schema.String),
        total_size: Schema.optional(Schema.Number),
      }),
    ),
    data: Schema.optional(Schema.Array(Schema.String)),
  });
export type AccessListRoleBindingNameListOutput =
  typeof AccessListRoleBindingNameListOutput.Type;

// The operation
/**
 * Organization role bindings
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param organizationName - Organization resource name
 */
export const AccessListRoleBindingNameList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AccessListRoleBindingNameListInput,
    outputSchema: AccessListRoleBindingNameListOutput,
  }));
// Input Schema
export const AccessListRoleBindingsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    organizationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/access/default/listRoleBindings",
    }),
  );
export type AccessListRoleBindingsInput =
  typeof AccessListRoleBindingsInput.Type;

// Output Schema
export const AccessListRoleBindingsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    kind: Schema.optional(Schema.String),
    metadata: Schema.optional(
      Schema.Struct({
        first: Schema.optional(Schema.String),
        last: Schema.optional(Schema.String),
        prev: Schema.optional(Schema.String),
        next: Schema.optional(Schema.String),
        total_size: Schema.optional(Schema.Number),
      }),
    ),
    data: Schema.optional(
      Schema.Array(
        Schema.Struct({
          kind: Schema.optional(Schema.String),
          id: Schema.optional(Schema.String),
          metadata: Schema.optional(
            Schema.Struct({
              self: Schema.optional(Schema.String),
              resource_name: Schema.optional(Schema.String),
              created_at: Schema.optional(Schema.String),
              updated_at: Schema.optional(Schema.String),
              deleted_at: Schema.optional(Schema.String),
            }),
          ),
          principal: Schema.optional(Schema.String),
          role_name: Schema.optional(Schema.String),
          crn_pattern: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type AccessListRoleBindingsOutput =
  typeof AccessListRoleBindingsOutput.Type;

// The operation
/**
 * Organization role bindings
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param organizationName - Organization resource name
 */
export const AccessListRoleBindings = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AccessListRoleBindingsInput,
    outputSchema: AccessListRoleBindingsOutput,
  }),
);
// Input Schema
export const AccessListServiceAccountsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    organizationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/access/default/listServiceAccounts",
    }),
  );
export type AccessListServiceAccountsInput =
  typeof AccessListServiceAccountsInput.Type;

// Output Schema
export const AccessListServiceAccountsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    kind: Schema.optional(Schema.String),
    metadata: Schema.optional(
      Schema.Struct({
        first: Schema.optional(Schema.String),
        last: Schema.optional(Schema.String),
        prev: Schema.optional(Schema.String),
        next: Schema.optional(Schema.String),
        total_size: Schema.optional(Schema.Number),
      }),
    ),
    data: Schema.optional(
      Schema.Array(
        Schema.Struct({
          kind: Schema.optional(Schema.String),
          id: Schema.optional(Schema.String),
          metadata: Schema.optional(
            Schema.Struct({
              self: Schema.optional(Schema.String),
              resource_name: Schema.optional(Schema.String),
              created_at: Schema.optional(Schema.String),
              updated_at: Schema.optional(Schema.String),
              deleted_at: Schema.optional(Schema.String),
            }),
          ),
          display_name: Schema.optional(Schema.String),
          description: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type AccessListServiceAccountsOutput =
  typeof AccessListServiceAccountsOutput.Type;

// The operation
/**
 * Organization service accounts details
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param organizationName - Organization resource name
 */
export const AccessListServiceAccounts = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AccessListServiceAccountsInput,
    outputSchema: AccessListServiceAccountsOutput,
  }),
);
// Input Schema
export const AccessListUsersInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  organizationName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/access/default/listUsers",
  }),
);
export type AccessListUsersInput = typeof AccessListUsersInput.Type;

// Output Schema
export const AccessListUsersOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  kind: Schema.optional(Schema.String),
  metadata: Schema.optional(
    Schema.Struct({
      first: Schema.optional(Schema.String),
      last: Schema.optional(Schema.String),
      prev: Schema.optional(Schema.String),
      next: Schema.optional(Schema.String),
      total_size: Schema.optional(Schema.Number),
    }),
  ),
  data: Schema.optional(
    Schema.Array(
      Schema.Struct({
        kind: Schema.optional(Schema.String),
        id: Schema.optional(Schema.String),
        metadata: Schema.optional(
          Schema.Struct({
            self: Schema.optional(Schema.String),
            resource_name: Schema.optional(Schema.String),
            created_at: Schema.optional(Schema.String),
            updated_at: Schema.optional(Schema.String),
            deleted_at: Schema.optional(Schema.String),
          }),
        ),
        email: Schema.optional(Schema.String),
        full_name: Schema.optional(Schema.String),
        auth_type: Schema.optional(Schema.String),
      }),
    ),
  ),
});
export type AccessListUsersOutput = typeof AccessListUsersOutput.Type;

// The operation
/**
 * Organization users details
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param organizationName - Organization resource name
 */
export const AccessListUsers = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AccessListUsersInput,
  outputSchema: AccessListUsersOutput,
}));
// Input Schema
export const ClusterCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    organizationName: Schema.String.pipe(T.PathParam()),
    environmentId: Schema.String.pipe(T.PathParam()),
    clusterId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/environments/{environmentId}/clusters/{clusterId}",
    }),
  );
export type ClusterCreateOrUpdateInput = typeof ClusterCreateOrUpdateInput.Type;

// Output Schema
export const ClusterCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ClusterCreateOrUpdateOutput =
  typeof ClusterCreateOrUpdateOutput.Type;

// The operation
/**
 * Create confluent clusters
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param organizationName - Organization resource name
 * @param environmentId - Confluent environment id
 * @param clusterId - Confluent kafka or schema registry cluster id
 */
export const ClusterCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ClusterCreateOrUpdateInput,
    outputSchema: ClusterCreateOrUpdateOutput,
  }),
);
// Input Schema
export const ClusterDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  organizationName: Schema.String.pipe(T.PathParam()),
  environmentId: Schema.String.pipe(T.PathParam()),
  clusterId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/environments/{environmentId}/clusters/{clusterId}",
  }),
);
export type ClusterDeleteInput = typeof ClusterDeleteInput.Type;

// Output Schema
export const ClusterDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ClusterDeleteOutput = typeof ClusterDeleteOutput.Type;

// The operation
/**
 * Delete confluent cluster by id
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param organizationName - Organization resource name
 * @param environmentId - Confluent environment id
 * @param clusterId - Confluent kafka or schema registry cluster id
 */
export const ClusterDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ClusterDeleteInput,
  outputSchema: ClusterDeleteOutput,
}));
// Input Schema
export const ConnectorCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    organizationName: Schema.String.pipe(T.PathParam()),
    environmentId: Schema.String.pipe(T.PathParam()),
    clusterId: Schema.String.pipe(T.PathParam()),
    connectorName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/environments/{environmentId}/clusters/{clusterId}/connectors/{connectorName}",
    }),
  );
export type ConnectorCreateOrUpdateInput =
  typeof ConnectorCreateOrUpdateInput.Type;

// Output Schema
export const ConnectorCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ConnectorCreateOrUpdateOutput =
  typeof ConnectorCreateOrUpdateOutput.Type;

// The operation
/**
 * Create confluent connector by Name
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param organizationName - Organization resource name
 * @param environmentId - Confluent environment id
 * @param clusterId - Confluent kafka or schema registry cluster id
 * @param connectorName - Confluent connector name
 */
export const ConnectorCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ConnectorCreateOrUpdateInput,
    outputSchema: ConnectorCreateOrUpdateOutput,
  }),
);
// Input Schema
export const ConnectorDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  organizationName: Schema.String.pipe(T.PathParam()),
  environmentId: Schema.String.pipe(T.PathParam()),
  clusterId: Schema.String.pipe(T.PathParam()),
  connectorName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/environments/{environmentId}/clusters/{clusterId}/connectors/{connectorName}",
  }),
);
export type ConnectorDeleteInput = typeof ConnectorDeleteInput.Type;

// Output Schema
export const ConnectorDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ConnectorDeleteOutput = typeof ConnectorDeleteOutput.Type;

// The operation
/**
 * Delete confluent connector by name
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param organizationName - Organization resource name
 * @param environmentId - Confluent environment id
 * @param clusterId - Confluent kafka or schema registry cluster id
 * @param connectorName - Confluent connector name
 */
export const ConnectorDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ConnectorDeleteInput,
  outputSchema: ConnectorDeleteOutput,
}));
// Input Schema
export const ConnectorGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  organizationName: Schema.String.pipe(T.PathParam()),
  environmentId: Schema.String.pipe(T.PathParam()),
  clusterId: Schema.String.pipe(T.PathParam()),
  connectorName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/environments/{environmentId}/clusters/{clusterId}/connectors/{connectorName}",
  }),
);
export type ConnectorGetInput = typeof ConnectorGetInput.Type;

// Output Schema
export const ConnectorGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ConnectorGetOutput = typeof ConnectorGetOutput.Type;

// The operation
/**
 * Get confluent connector by Name
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param organizationName - Organization resource name
 * @param environmentId - Confluent environment id
 * @param clusterId - Confluent kafka or schema registry cluster id
 * @param connectorName - Confluent connector name
 */
export const ConnectorGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ConnectorGetInput,
  outputSchema: ConnectorGetOutput,
}));
// Input Schema
export const ConnectorListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  organizationName: Schema.String.pipe(T.PathParam()),
  environmentId: Schema.String.pipe(T.PathParam()),
  clusterId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
  pageSize: Schema.optional(Schema.Number),
  pageToken: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/environments/{environmentId}/clusters/{clusterId}/connectors",
  }),
);
export type ConnectorListInput = typeof ConnectorListInput.Type;

// Output Schema
export const ConnectorListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(Schema.Struct({})),
  nextLink: Schema.optional(Schema.String),
});
export type ConnectorListOutput = typeof ConnectorListOutput.Type;

// The operation
/**
 * Lists all the connectors in a cluster
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param organizationName - Organization resource name
 * @param environmentId - Confluent environment id
 * @param clusterId - Confluent kafka or schema registry cluster id
 * @param pageSize - Pagination size
 * @param pageToken - An opaque pagination token to fetch the next set of records
 */
export const ConnectorList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ConnectorListInput,
  outputSchema: ConnectorListOutput,
}));
// Input Schema
export const EnvironmentCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    organizationName: Schema.String.pipe(T.PathParam()),
    environmentId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/environments/{environmentId}",
    }),
  );
export type EnvironmentCreateOrUpdateInput =
  typeof EnvironmentCreateOrUpdateInput.Type;

// Output Schema
export const EnvironmentCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type EnvironmentCreateOrUpdateOutput =
  typeof EnvironmentCreateOrUpdateOutput.Type;

// The operation
/**
 * Create confluent environment
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param organizationName - Organization resource name
 * @param environmentId - Confluent environment id
 */
export const EnvironmentCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: EnvironmentCreateOrUpdateInput,
    outputSchema: EnvironmentCreateOrUpdateOutput,
  }),
);
// Input Schema
export const EnvironmentDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    organizationName: Schema.String.pipe(T.PathParam()),
    environmentId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/environments/{environmentId}",
  }),
);
export type EnvironmentDeleteInput = typeof EnvironmentDeleteInput.Type;

// Output Schema
export const EnvironmentDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type EnvironmentDeleteOutput = typeof EnvironmentDeleteOutput.Type;

// The operation
/**
 * Delete confluent environment by id
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param organizationName - Organization resource name
 * @param environmentId - Confluent environment id
 */
export const EnvironmentDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: EnvironmentDeleteInput,
  outputSchema: EnvironmentDeleteOutput,
}));
// Input Schema
export const MarketplaceAgreementsCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Confluent/agreements/default",
    }),
  );
export type MarketplaceAgreementsCreateInput =
  typeof MarketplaceAgreementsCreateInput.Type;

// Output Schema
export const MarketplaceAgreementsCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
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
    properties: Schema.optional(
      Schema.Struct({
        publisher: Schema.optional(Schema.String),
        product: Schema.optional(Schema.String),
        plan: Schema.optional(Schema.String),
        licenseTextLink: Schema.optional(Schema.String),
        privacyPolicyLink: Schema.optional(Schema.String),
        retrieveDatetime: Schema.optional(Schema.String),
        signature: Schema.optional(Schema.String),
        accepted: Schema.optional(Schema.Boolean),
      }),
    ),
  });
export type MarketplaceAgreementsCreateOutput =
  typeof MarketplaceAgreementsCreateOutput.Type;

// The operation
/**
 * Create Confluent Marketplace agreement in the subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const MarketplaceAgreementsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: MarketplaceAgreementsCreateInput,
    outputSchema: MarketplaceAgreementsCreateOutput,
  }),
);
// Input Schema
export const MarketplaceAgreementsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Confluent/agreements",
    }),
  );
export type MarketplaceAgreementsListInput =
  typeof MarketplaceAgreementsListInput.Type;

// Output Schema
export const MarketplaceAgreementsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
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
        properties: Schema.optional(
          Schema.Struct({
            publisher: Schema.optional(Schema.String),
            product: Schema.optional(Schema.String),
            plan: Schema.optional(Schema.String),
            licenseTextLink: Schema.optional(Schema.String),
            privacyPolicyLink: Schema.optional(Schema.String),
            retrieveDatetime: Schema.optional(Schema.String),
            signature: Schema.optional(Schema.String),
            accepted: Schema.optional(Schema.Boolean),
          }),
        ),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type MarketplaceAgreementsListOutput =
  typeof MarketplaceAgreementsListOutput.Type;

// The operation
/**
 * List Confluent marketplace agreements in the subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const MarketplaceAgreementsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: MarketplaceAgreementsListInput,
    outputSchema: MarketplaceAgreementsListOutput,
  }),
);
// Input Schema
export const OrganizationCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    organizationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}",
    }),
  );
export type OrganizationCreateInput = typeof OrganizationCreateInput.Type;

// Output Schema
export const OrganizationCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type OrganizationCreateOutput = typeof OrganizationCreateOutput.Type;

// The operation
/**
 * Create Organization resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param organizationName - Organization resource name
 */
export const OrganizationCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OrganizationCreateInput,
  outputSchema: OrganizationCreateOutput,
}));
// Input Schema
export const OrganizationCreateAPIKeyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    organizationName: Schema.String.pipe(T.PathParam()),
    environmentId: Schema.String.pipe(T.PathParam()),
    clusterId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/environments/{environmentId}/clusters/{clusterId}/createAPIKey",
    }),
  );
export type OrganizationCreateAPIKeyInput =
  typeof OrganizationCreateAPIKeyInput.Type;

// Output Schema
export const OrganizationCreateAPIKeyOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    kind: Schema.optional(Schema.String),
    id: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        metadata: Schema.optional(
          Schema.Struct({
            self: Schema.optional(Schema.String),
            resourceName: Schema.optional(Schema.String),
            createdTimestamp: Schema.optional(Schema.String),
            updatedTimestamp: Schema.optional(Schema.String),
            deletedTimestamp: Schema.optional(Schema.String),
          }),
        ),
        spec: Schema.optional(
          Schema.Struct({
            description: Schema.optional(Schema.String),
            name: Schema.optional(Schema.String),
            secret: Schema.optional(SensitiveString),
            resource: Schema.optional(
              Schema.Struct({
                id: Schema.optional(Schema.String),
                environment: Schema.optional(Schema.String),
                related: Schema.optional(Schema.String),
                resourceName: Schema.optional(Schema.String),
                kind: Schema.optional(Schema.String),
              }),
            ),
            owner: Schema.optional(
              Schema.Struct({
                id: Schema.optional(Schema.String),
                related: Schema.optional(Schema.String),
                resourceName: Schema.optional(Schema.String),
                kind: Schema.optional(Schema.String),
              }),
            ),
          }),
        ),
      }),
    ),
  });
export type OrganizationCreateAPIKeyOutput =
  typeof OrganizationCreateAPIKeyOutput.Type;

// The operation
/**
 * Creates API key for a schema registry Cluster ID or Kafka Cluster ID under a environment
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param organizationName - Organization resource name
 * @param environmentId - Confluent environment id
 * @param clusterId - Confluent kafka or schema registry cluster id
 */
export const OrganizationCreateAPIKey = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: OrganizationCreateAPIKeyInput,
    outputSchema: OrganizationCreateAPIKeyOutput,
  }),
);
// Input Schema
export const OrganizationDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    organizationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}",
    }),
  );
export type OrganizationDeleteInput = typeof OrganizationDeleteInput.Type;

// Output Schema
export const OrganizationDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type OrganizationDeleteOutput = typeof OrganizationDeleteOutput.Type;

// The operation
/**
 * Delete Organization resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param organizationName - Organization resource name
 */
export const OrganizationDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OrganizationDeleteInput,
  outputSchema: OrganizationDeleteOutput,
}));
// Input Schema
export const OrganizationDeleteClusterAPIKeyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    organizationName: Schema.String.pipe(T.PathParam()),
    apiKeyId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/apiKeys/{apiKeyId}",
    }),
  );
export type OrganizationDeleteClusterAPIKeyInput =
  typeof OrganizationDeleteClusterAPIKeyInput.Type;

// Output Schema
export const OrganizationDeleteClusterAPIKeyOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type OrganizationDeleteClusterAPIKeyOutput =
  typeof OrganizationDeleteClusterAPIKeyOutput.Type;

// The operation
/**
 * Deletes API key of a kafka or schema registry cluster
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param organizationName - Organization resource name
 * @param apiKeyId - Confluent API Key id
 */
export const OrganizationDeleteClusterAPIKey =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: OrganizationDeleteClusterAPIKeyInput,
    outputSchema: OrganizationDeleteClusterAPIKeyOutput,
  }));
// Input Schema
export const OrganizationGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  organizationName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}",
  }),
);
export type OrganizationGetInput = typeof OrganizationGetInput.Type;

// Output Schema
export const OrganizationGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type OrganizationGetOutput = typeof OrganizationGetOutput.Type;

// The operation
/**
 * Get the properties of a specific Organization resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param organizationName - Organization resource name
 */
export const OrganizationGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OrganizationGetInput,
  outputSchema: OrganizationGetOutput,
}));
// Input Schema
export const OrganizationGetClusterAPIKeyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    organizationName: Schema.String.pipe(T.PathParam()),
    apiKeyId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/apiKeys/{apiKeyId}",
    }),
  );
export type OrganizationGetClusterAPIKeyInput =
  typeof OrganizationGetClusterAPIKeyInput.Type;

// Output Schema
export const OrganizationGetClusterAPIKeyOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    kind: Schema.optional(Schema.String),
    id: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        metadata: Schema.optional(
          Schema.Struct({
            self: Schema.optional(Schema.String),
            resourceName: Schema.optional(Schema.String),
            createdTimestamp: Schema.optional(Schema.String),
            updatedTimestamp: Schema.optional(Schema.String),
            deletedTimestamp: Schema.optional(Schema.String),
          }),
        ),
        spec: Schema.optional(
          Schema.Struct({
            description: Schema.optional(Schema.String),
            name: Schema.optional(Schema.String),
            secret: Schema.optional(SensitiveString),
            resource: Schema.optional(
              Schema.Struct({
                id: Schema.optional(Schema.String),
                environment: Schema.optional(Schema.String),
                related: Schema.optional(Schema.String),
                resourceName: Schema.optional(Schema.String),
                kind: Schema.optional(Schema.String),
              }),
            ),
            owner: Schema.optional(
              Schema.Struct({
                id: Schema.optional(Schema.String),
                related: Schema.optional(Schema.String),
                resourceName: Schema.optional(Schema.String),
                kind: Schema.optional(Schema.String),
              }),
            ),
          }),
        ),
      }),
    ),
  });
export type OrganizationGetClusterAPIKeyOutput =
  typeof OrganizationGetClusterAPIKeyOutput.Type;

// The operation
/**
 * Get API key details of a kafka or schema registry cluster
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param organizationName - Organization resource name
 * @param apiKeyId - Confluent API Key id
 */
export const OrganizationGetClusterAPIKey =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: OrganizationGetClusterAPIKeyInput,
    outputSchema: OrganizationGetClusterAPIKeyOutput,
  }));
// Input Schema
export const OrganizationGetClusterByIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    organizationName: Schema.String.pipe(T.PathParam()),
    environmentId: Schema.String.pipe(T.PathParam()),
    clusterId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/environments/{environmentId}/clusters/{clusterId}",
    }),
  );
export type OrganizationGetClusterByIdInput =
  typeof OrganizationGetClusterByIdInput.Type;

// Output Schema
export const OrganizationGetClusterByIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type OrganizationGetClusterByIdOutput =
  typeof OrganizationGetClusterByIdOutput.Type;

// The operation
/**
 * Get cluster by Id
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param organizationName - Organization resource name
 * @param environmentId - Confluent environment id
 * @param clusterId - Confluent kafka or schema registry cluster id
 */
export const OrganizationGetClusterById = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: OrganizationGetClusterByIdInput,
    outputSchema: OrganizationGetClusterByIdOutput,
  }),
);
// Input Schema
export const OrganizationGetEnvironmentByIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    organizationName: Schema.String.pipe(T.PathParam()),
    environmentId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/environments/{environmentId}",
    }),
  );
export type OrganizationGetEnvironmentByIdInput =
  typeof OrganizationGetEnvironmentByIdInput.Type;

// Output Schema
export const OrganizationGetEnvironmentByIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type OrganizationGetEnvironmentByIdOutput =
  typeof OrganizationGetEnvironmentByIdOutput.Type;

// The operation
/**
 * Get Environment details by environment Id
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param organizationName - Organization resource name
 * @param environmentId - Confluent environment id
 */
export const OrganizationGetEnvironmentById =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: OrganizationGetEnvironmentByIdInput,
    outputSchema: OrganizationGetEnvironmentByIdOutput,
  }));
// Input Schema
export const OrganizationGetSchemaRegistryClusterByIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    organizationName: Schema.String.pipe(T.PathParam()),
    environmentId: Schema.String.pipe(T.PathParam()),
    clusterId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/environments/{environmentId}/schemaRegistryClusters/{clusterId}",
    }),
  );
export type OrganizationGetSchemaRegistryClusterByIdInput =
  typeof OrganizationGetSchemaRegistryClusterByIdInput.Type;

// Output Schema
export const OrganizationGetSchemaRegistryClusterByIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    kind: Schema.optional(Schema.String),
    id: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        metadata: Schema.optional(
          Schema.Struct({
            self: Schema.optional(Schema.String),
            resourceName: Schema.optional(Schema.String),
            createdTimestamp: Schema.optional(Schema.String),
            updatedTimestamp: Schema.optional(Schema.String),
            deletedTimestamp: Schema.optional(Schema.String),
          }),
        ),
        spec: Schema.optional(
          Schema.Struct({
            name: Schema.optional(Schema.String),
            httpEndpoint: Schema.optional(Schema.String),
            package: Schema.optional(Schema.String),
            region: Schema.optional(
              Schema.Struct({
                id: Schema.optional(Schema.String),
                related: Schema.optional(Schema.String),
                resourceName: Schema.optional(Schema.String),
              }),
            ),
            environment: Schema.optional(
              Schema.Struct({
                id: Schema.optional(Schema.String),
                related: Schema.optional(Schema.String),
                resourceName: Schema.optional(Schema.String),
              }),
            ),
            cloud: Schema.optional(Schema.String),
          }),
        ),
        status: Schema.optional(
          Schema.Struct({
            phase: Schema.optional(Schema.String),
          }),
        ),
      }),
    ),
  });
export type OrganizationGetSchemaRegistryClusterByIdOutput =
  typeof OrganizationGetSchemaRegistryClusterByIdOutput.Type;

// The operation
/**
 * Get schema registry cluster by Id
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param organizationName - Organization resource name
 * @param environmentId - Confluent environment id
 * @param clusterId - Confluent connector name
 */
export const OrganizationGetSchemaRegistryClusterById =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: OrganizationGetSchemaRegistryClusterByIdInput,
    outputSchema: OrganizationGetSchemaRegistryClusterByIdOutput,
  }));
// Input Schema
export const OrganizationListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations",
    }),
  );
export type OrganizationListByResourceGroupInput =
  typeof OrganizationListByResourceGroupInput.Type;

// Output Schema
export const OrganizationListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type OrganizationListByResourceGroupOutput =
  typeof OrganizationListByResourceGroupOutput.Type;

// The operation
/**
 * List all Organizations under the specified resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const OrganizationListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: OrganizationListByResourceGroupInput,
    outputSchema: OrganizationListByResourceGroupOutput,
  }));
// Input Schema
export const OrganizationListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Confluent/organizations",
    }),
  );
export type OrganizationListBySubscriptionInput =
  typeof OrganizationListBySubscriptionInput.Type;

// Output Schema
export const OrganizationListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type OrganizationListBySubscriptionOutput =
  typeof OrganizationListBySubscriptionOutput.Type;

// The operation
/**
 * List all organizations under the specified subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const OrganizationListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: OrganizationListBySubscriptionInput,
    outputSchema: OrganizationListBySubscriptionOutput,
  }));
// Input Schema
export const OrganizationListClustersInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    organizationName: Schema.String.pipe(T.PathParam()),
    environmentId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    pageSize: Schema.optional(Schema.Number),
    pageToken: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/environments/{environmentId}/clusters",
    }),
  );
export type OrganizationListClustersInput =
  typeof OrganizationListClustersInput.Type;

// Output Schema
export const OrganizationListClustersOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type OrganizationListClustersOutput =
  typeof OrganizationListClustersOutput.Type;

// The operation
/**
 * Lists of all the clusters in a environment
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param organizationName - Organization resource name
 * @param environmentId - Confluent environment id
 * @param pageSize - Pagination size
 * @param pageToken - An opaque pagination token to fetch the next set of records
 */
export const OrganizationListClusters = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: OrganizationListClustersInput,
    outputSchema: OrganizationListClustersOutput,
  }),
);
// Input Schema
export const OrganizationListEnvironmentsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    organizationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    pageSize: Schema.optional(Schema.Number),
    pageToken: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/environments",
    }),
  );
export type OrganizationListEnvironmentsInput =
  typeof OrganizationListEnvironmentsInput.Type;

// Output Schema
export const OrganizationListEnvironmentsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type OrganizationListEnvironmentsOutput =
  typeof OrganizationListEnvironmentsOutput.Type;

// The operation
/**
 * Lists of all the environments in a organization
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param organizationName - Organization resource name
 * @param pageSize - Pagination size
 * @param pageToken - An opaque pagination token to fetch the next set of records
 */
export const OrganizationListEnvironments =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: OrganizationListEnvironmentsInput,
    outputSchema: OrganizationListEnvironmentsOutput,
  }));
// Input Schema
export const OrganizationListRegionsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    organizationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/listRegions",
    }),
  );
export type OrganizationListRegionsInput =
  typeof OrganizationListRegionsInput.Type;

// Output Schema
export const OrganizationListRegionsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    data: Schema.optional(
      Schema.Array(
        Schema.Struct({
          kind: Schema.optional(Schema.String),
          id: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Struct({
              metadata: Schema.optional(
                Schema.Struct({
                  self: Schema.optional(Schema.String),
                  resourceName: Schema.optional(Schema.String),
                  createdTimestamp: Schema.optional(Schema.String),
                  updatedTimestamp: Schema.optional(Schema.String),
                  deletedTimestamp: Schema.optional(Schema.String),
                }),
              ),
              spec: Schema.optional(
                Schema.Struct({
                  name: Schema.optional(Schema.String),
                  cloud: Schema.optional(Schema.String),
                  regionName: Schema.optional(Schema.String),
                  packages: Schema.optional(Schema.Array(Schema.String)),
                }),
              ),
            }),
          ),
        }),
      ),
    ),
  });
export type OrganizationListRegionsOutput =
  typeof OrganizationListRegionsOutput.Type;

// The operation
/**
 * cloud provider regions available for creating Schema Registry clusters.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param organizationName - Organization resource name
 */
export const OrganizationListRegions = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: OrganizationListRegionsInput,
    outputSchema: OrganizationListRegionsOutput,
  }),
);
// Input Schema
export const OrganizationListSchemaRegistryClustersInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    organizationName: Schema.String.pipe(T.PathParam()),
    environmentId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    pageSize: Schema.optional(Schema.Number),
    pageToken: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/environments/{environmentId}/schemaRegistryClusters",
    }),
  );
export type OrganizationListSchemaRegistryClustersInput =
  typeof OrganizationListSchemaRegistryClustersInput.Type;

// Output Schema
export const OrganizationListSchemaRegistryClustersOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        kind: Schema.optional(Schema.String),
        id: Schema.optional(Schema.String),
        properties: Schema.optional(
          Schema.Struct({
            metadata: Schema.optional(
              Schema.Struct({
                self: Schema.optional(Schema.String),
                resourceName: Schema.optional(Schema.String),
                createdTimestamp: Schema.optional(Schema.String),
                updatedTimestamp: Schema.optional(Schema.String),
                deletedTimestamp: Schema.optional(Schema.String),
              }),
            ),
            spec: Schema.optional(
              Schema.Struct({
                name: Schema.optional(Schema.String),
                httpEndpoint: Schema.optional(Schema.String),
                package: Schema.optional(Schema.String),
                region: Schema.optional(
                  Schema.Struct({
                    id: Schema.optional(Schema.String),
                    related: Schema.optional(Schema.String),
                    resourceName: Schema.optional(Schema.String),
                  }),
                ),
                environment: Schema.optional(
                  Schema.Struct({
                    id: Schema.optional(Schema.String),
                    related: Schema.optional(Schema.String),
                    resourceName: Schema.optional(Schema.String),
                  }),
                ),
                cloud: Schema.optional(Schema.String),
              }),
            ),
            status: Schema.optional(
              Schema.Struct({
                phase: Schema.optional(Schema.String),
              }),
            ),
          }),
        ),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type OrganizationListSchemaRegistryClustersOutput =
  typeof OrganizationListSchemaRegistryClustersOutput.Type;

// The operation
/**
 * Get schema registry clusters
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param organizationName - Organization resource name
 * @param environmentId - Confluent environment id
 * @param pageSize - Pagination size
 * @param pageToken - An opaque pagination token to fetch the next set of records
 */
export const OrganizationListSchemaRegistryClusters =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: OrganizationListSchemaRegistryClustersInput,
    outputSchema: OrganizationListSchemaRegistryClustersOutput,
  }));
// Input Schema
export const OrganizationOperationsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Confluent/operations",
    }),
  );
export type OrganizationOperationsListInput =
  typeof OrganizationOperationsListInput.Type;

// Output Schema
export const OrganizationOperationsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
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
        isDataAction: Schema.optional(Schema.Boolean),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type OrganizationOperationsListOutput =
  typeof OrganizationOperationsListOutput.Type;

// The operation
/**
 * List the operations for the provider
 *
 * @param api-version - The API version to use for this operation.
 */
export const OrganizationOperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: OrganizationOperationsListInput,
    outputSchema: OrganizationOperationsListOutput,
  }),
);
// Input Schema
export const OrganizationUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    organizationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}",
    }),
  );
export type OrganizationUpdateInput = typeof OrganizationUpdateInput.Type;

// Output Schema
export const OrganizationUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type OrganizationUpdateOutput = typeof OrganizationUpdateOutput.Type;

// The operation
/**
 * Update Organization resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param organizationName - Organization resource name
 */
export const OrganizationUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OrganizationUpdateInput,
  outputSchema: OrganizationUpdateOutput,
}));
// Input Schema
export const TopicsCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  organizationName: Schema.String.pipe(T.PathParam()),
  environmentId: Schema.String.pipe(T.PathParam()),
  clusterId: Schema.String.pipe(T.PathParam()),
  topicName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/environments/{environmentId}/clusters/{clusterId}/topics/{topicName}",
  }),
);
export type TopicsCreateInput = typeof TopicsCreateInput.Type;

// Output Schema
export const TopicsCreateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type TopicsCreateOutput = typeof TopicsCreateOutput.Type;

// The operation
/**
 * Create confluent topics by Name
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param organizationName - Organization resource name
 * @param environmentId - Confluent environment id
 * @param clusterId - Confluent kafka or schema registry cluster id
 * @param topicName - Confluent kafka or schema registry topic name
 */
export const TopicsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TopicsCreateInput,
  outputSchema: TopicsCreateOutput,
}));
// Input Schema
export const TopicsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  organizationName: Schema.String.pipe(T.PathParam()),
  environmentId: Schema.String.pipe(T.PathParam()),
  clusterId: Schema.String.pipe(T.PathParam()),
  topicName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/environments/{environmentId}/clusters/{clusterId}/topics/{topicName}",
  }),
);
export type TopicsDeleteInput = typeof TopicsDeleteInput.Type;

// Output Schema
export const TopicsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type TopicsDeleteOutput = typeof TopicsDeleteOutput.Type;

// The operation
/**
 * Delete confluent topic by name
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param organizationName - Organization resource name
 * @param environmentId - Confluent environment id
 * @param clusterId - Confluent kafka or schema registry cluster id
 * @param topicName - Confluent kafka or schema registry topic name
 */
export const TopicsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TopicsDeleteInput,
  outputSchema: TopicsDeleteOutput,
}));
// Input Schema
export const TopicsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  organizationName: Schema.String.pipe(T.PathParam()),
  environmentId: Schema.String.pipe(T.PathParam()),
  clusterId: Schema.String.pipe(T.PathParam()),
  topicName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/environments/{environmentId}/clusters/{clusterId}/topics/{topicName}",
  }),
);
export type TopicsGetInput = typeof TopicsGetInput.Type;

// Output Schema
export const TopicsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type TopicsGetOutput = typeof TopicsGetOutput.Type;

// The operation
/**
 * Get confluent topic by Name
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param organizationName - Organization resource name
 * @param environmentId - Confluent environment id
 * @param clusterId - Confluent kafka or schema registry cluster id
 * @param topicName - Confluent kafka or schema registry topic name
 */
export const TopicsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TopicsGetInput,
  outputSchema: TopicsGetOutput,
}));
// Input Schema
export const TopicsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  organizationName: Schema.String.pipe(T.PathParam()),
  environmentId: Schema.String.pipe(T.PathParam()),
  clusterId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
  pageSize: Schema.optional(Schema.Number),
  pageToken: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/environments/{environmentId}/clusters/{clusterId}/topics",
  }),
);
export type TopicsListInput = typeof TopicsListInput.Type;

// Output Schema
export const TopicsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(Schema.Struct({})),
  nextLink: Schema.optional(Schema.String),
});
export type TopicsListOutput = typeof TopicsListOutput.Type;

// The operation
/**
 * Lists of all the topics in a clusters
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param organizationName - Organization resource name
 * @param environmentId - Confluent environment id
 * @param clusterId - Confluent kafka or schema registry cluster id
 * @param pageSize - Pagination size
 * @param pageToken - An opaque pagination token to fetch the next set of records
 */
export const TopicsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TopicsListInput,
  outputSchema: TopicsListOutput,
}));
// Input Schema
export const ValidationsValidateOrganizationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    organizationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/validations/{organizationName}/orgvalidate",
    }),
  );
export type ValidationsValidateOrganizationInput =
  typeof ValidationsValidateOrganizationInput.Type;

// Output Schema
export const ValidationsValidateOrganizationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ValidationsValidateOrganizationOutput =
  typeof ValidationsValidateOrganizationOutput.Type;

// The operation
/**
 * Organization Validate proxy resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param organizationName - Organization resource name
 */
export const ValidationsValidateOrganization =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ValidationsValidateOrganizationInput,
    outputSchema: ValidationsValidateOrganizationOutput,
  }));
// Input Schema
export const ValidationsValidateOrganizationV2Input =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    organizationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/validations/{organizationName}/orgvalidateV2",
    }),
  );
export type ValidationsValidateOrganizationV2Input =
  typeof ValidationsValidateOrganizationV2Input.Type;

// Output Schema
export const ValidationsValidateOrganizationV2Output =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    info: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type ValidationsValidateOrganizationV2Output =
  typeof ValidationsValidateOrganizationV2Output.Type;

// The operation
/**
 * Organization Validate proxy resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param organizationName - Organization resource name
 */
export const ValidationsValidateOrganizationV2 =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ValidationsValidateOrganizationV2Input,
    outputSchema: ValidationsValidateOrganizationV2Output,
  }));
