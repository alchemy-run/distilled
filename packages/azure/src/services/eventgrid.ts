/**
 * Azure Eventgrid API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const CaCertificatesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    caCertificateName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}/caCertificates/{caCertificateName}",
    }),
  );
export type CaCertificatesCreateOrUpdateInput =
  typeof CaCertificatesCreateOrUpdateInput.Type;

// Output Schema
export const CaCertificatesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type CaCertificatesCreateOrUpdateOutput =
  typeof CaCertificatesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a CA certificate.
 *
 * Create or update a CA certificate with the specified parameters.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param namespaceName - Name of the namespace.
 * @param caCertificateName - The CA certificate name.
 */
export const CaCertificatesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CaCertificatesCreateOrUpdateInput,
    outputSchema: CaCertificatesCreateOrUpdateOutput,
  }));
// Input Schema
export const CaCertificatesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    caCertificateName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}/caCertificates/{caCertificateName}",
    }),
  );
export type CaCertificatesDeleteInput = typeof CaCertificatesDeleteInput.Type;

// Output Schema
export const CaCertificatesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CaCertificatesDeleteOutput = typeof CaCertificatesDeleteOutput.Type;

// The operation
/**
 * Delete a CA certificate.
 *
 * Delete an existing CA certificate.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param namespaceName - Name of the namespace.
 * @param caCertificateName - Name of the CA certificate.
 */
export const CaCertificatesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CaCertificatesDeleteInput,
    outputSchema: CaCertificatesDeleteOutput,
  }),
);
// Input Schema
export const CaCertificatesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    caCertificateName: Schema.String.pipe(T.PathParam()),
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}/caCertificates/{caCertificateName}",
  }),
);
export type CaCertificatesGetInput = typeof CaCertificatesGetInput.Type;

// Output Schema
export const CaCertificatesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type CaCertificatesGetOutput = typeof CaCertificatesGetOutput.Type;

// The operation
/**
 * Get a CA certificate.
 *
 * Get properties of a CA certificate.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param namespaceName - Name of the namespace.
 * @param caCertificateName - Name of the CA certificate.
 */
export const CaCertificatesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CaCertificatesGetInput,
  outputSchema: CaCertificatesGetOutput,
}));
// Input Schema
export const CaCertificatesListByNamespaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}/caCertificates",
    }),
  );
export type CaCertificatesListByNamespaceInput =
  typeof CaCertificatesListByNamespaceInput.Type;

// Output Schema
export const CaCertificatesListByNamespaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type CaCertificatesListByNamespaceOutput =
  typeof CaCertificatesListByNamespaceOutput.Type;

// The operation
/**
 * List all CA certificates under a namespace.
 *
 * Get all the CA certificates under a namespace.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param namespaceName - Name of the namespace.
 */
export const CaCertificatesListByNamespace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CaCertificatesListByNamespaceInput,
    outputSchema: CaCertificatesListByNamespaceOutput,
  }));
// Input Schema
export const ChannelsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    partnerNamespaceName: Schema.String.pipe(T.PathParam()),
    channelName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerNamespaces/{partnerNamespaceName}/channels/{channelName}",
    }),
  );
export type ChannelsCreateOrUpdateInput =
  typeof ChannelsCreateOrUpdateInput.Type;

// Output Schema
export const ChannelsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type ChannelsCreateOrUpdateOutput =
  typeof ChannelsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a channel.
 *
 * Synchronously creates or updates a new channel with the specified parameters.
 *
 * @param resourceGroupName - The name of the resource group within the partners subscription.
 * @param partnerNamespaceName - Name of the partner namespace.
 * @param channelName - Name of the channel.
 */
export const ChannelsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ChannelsCreateOrUpdateInput,
    outputSchema: ChannelsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const ChannelsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  partnerNamespaceName: Schema.String.pipe(T.PathParam()),
  channelName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerNamespaces/{partnerNamespaceName}/channels/{channelName}",
  }),
);
export type ChannelsDeleteInput = typeof ChannelsDeleteInput.Type;

// Output Schema
export const ChannelsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ChannelsDeleteOutput = typeof ChannelsDeleteOutput.Type;

// The operation
/**
 * Delete a channel.
 *
 * Delete an existing channel.
 *
 * @param resourceGroupName - The name of the resource group within the partners subscription.
 * @param partnerNamespaceName - Name of the partner namespace.
 * @param channelName - Name of the channel.
 */
export const ChannelsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ChannelsDeleteInput,
  outputSchema: ChannelsDeleteOutput,
}));
// Input Schema
export const ChannelsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  partnerNamespaceName: Schema.String.pipe(T.PathParam()),
  channelName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerNamespaces/{partnerNamespaceName}/channels/{channelName}",
  }),
);
export type ChannelsGetInput = typeof ChannelsGetInput.Type;

// Output Schema
export const ChannelsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
});
export type ChannelsGetOutput = typeof ChannelsGetOutput.Type;

// The operation
/**
 * Get a channel.
 *
 * Get properties of a channel.
 *
 * @param resourceGroupName - The name of the resource group within the partners subscription.
 * @param partnerNamespaceName - Name of the partner namespace.
 * @param channelName - Name of the channel.
 */
export const ChannelsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ChannelsGetInput,
  outputSchema: ChannelsGetOutput,
}));
// Input Schema
export const ChannelsGetFullUrlInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    partnerNamespaceName: Schema.String.pipe(T.PathParam()),
    channelName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerNamespaces/{partnerNamespaceName}/channels/{channelName}/getFullUrl",
    }),
  );
export type ChannelsGetFullUrlInput = typeof ChannelsGetFullUrlInput.Type;

// Output Schema
export const ChannelsGetFullUrlOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    endpointUrl: Schema.optional(Schema.String),
  });
export type ChannelsGetFullUrlOutput = typeof ChannelsGetFullUrlOutput.Type;

// The operation
/**
 * Get full URL of partner destination channel.
 *
 * Get the full endpoint URL of a partner destination channel.
 *
 * @param resourceGroupName - The name of the resource group within the partners subscription.
 * @param partnerNamespaceName - Name of the partner namespace.
 * @param channelName - Name of the Channel.
 */
export const ChannelsGetFullUrl = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ChannelsGetFullUrlInput,
  outputSchema: ChannelsGetFullUrlOutput,
}));
// Input Schema
export const ChannelsListByPartnerNamespaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    partnerNamespaceName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerNamespaces/{partnerNamespaceName}/channels",
    }),
  );
export type ChannelsListByPartnerNamespaceInput =
  typeof ChannelsListByPartnerNamespaceInput.Type;

// Output Schema
export const ChannelsListByPartnerNamespaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ChannelsListByPartnerNamespaceOutput =
  typeof ChannelsListByPartnerNamespaceOutput.Type;

// The operation
/**
 * List channels.
 *
 * List all the channels in a partner namespace.
 *
 * @param resourceGroupName - The name of the resource group within the partners subscription.
 * @param partnerNamespaceName - Name of the partner namespace.
 */
export const ChannelsListByPartnerNamespace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ChannelsListByPartnerNamespaceInput,
    outputSchema: ChannelsListByPartnerNamespaceOutput,
  }));
// Input Schema
export const ChannelsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  partnerNamespaceName: Schema.String.pipe(T.PathParam()),
  channelName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerNamespaces/{partnerNamespaceName}/channels/{channelName}",
  }),
);
export type ChannelsUpdateInput = typeof ChannelsUpdateInput.Type;

// Output Schema
export const ChannelsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ChannelsUpdateOutput = typeof ChannelsUpdateOutput.Type;

// The operation
/**
 * Update a Channel.
 *
 * Synchronously updates a channel with the specified parameters.
 *
 * @param resourceGroupName - The name of the resource group within the partners subscription.
 * @param partnerNamespaceName - Name of the partner namespace.
 * @param channelName - Name of the channel.
 */
export const ChannelsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ChannelsUpdateInput,
  outputSchema: ChannelsUpdateOutput,
}));
// Input Schema
export const ClientGroupsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    clientGroupName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}/clientGroups/{clientGroupName}",
    }),
  );
export type ClientGroupsCreateOrUpdateInput =
  typeof ClientGroupsCreateOrUpdateInput.Type;

// Output Schema
export const ClientGroupsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type ClientGroupsCreateOrUpdateOutput =
  typeof ClientGroupsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a client group.
 *
 * Create or update a client group with the specified parameters.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param namespaceName - Name of the namespace.
 * @param clientGroupName - The client group name.
 */
export const ClientGroupsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ClientGroupsCreateOrUpdateInput,
    outputSchema: ClientGroupsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const ClientGroupsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    clientGroupName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}/clientGroups/{clientGroupName}",
    }),
  );
export type ClientGroupsDeleteInput = typeof ClientGroupsDeleteInput.Type;

// Output Schema
export const ClientGroupsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ClientGroupsDeleteOutput = typeof ClientGroupsDeleteOutput.Type;

// The operation
/**
 * Delete a client group.
 *
 * Delete an existing client group.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param namespaceName - Name of the namespace.
 * @param clientGroupName - Name of the client group.
 */
export const ClientGroupsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ClientGroupsDeleteInput,
  outputSchema: ClientGroupsDeleteOutput,
}));
// Input Schema
export const ClientGroupsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  namespaceName: Schema.String.pipe(T.PathParam()),
  clientGroupName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}/clientGroups/{clientGroupName}",
  }),
);
export type ClientGroupsGetInput = typeof ClientGroupsGetInput.Type;

// Output Schema
export const ClientGroupsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
});
export type ClientGroupsGetOutput = typeof ClientGroupsGetOutput.Type;

// The operation
/**
 * Get a client group.
 *
 * Get properties of a client group.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param namespaceName - Name of the namespace.
 * @param clientGroupName - Name of the client group.
 */
export const ClientGroupsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ClientGroupsGetInput,
  outputSchema: ClientGroupsGetOutput,
}));
// Input Schema
export const ClientGroupsListByNamespaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}/clientGroups",
    }),
  );
export type ClientGroupsListByNamespaceInput =
  typeof ClientGroupsListByNamespaceInput.Type;

// Output Schema
export const ClientGroupsListByNamespaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ClientGroupsListByNamespaceOutput =
  typeof ClientGroupsListByNamespaceOutput.Type;

// The operation
/**
 * List all client groups under a namespace.
 *
 * Get all the client groups under a namespace.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param namespaceName - Name of the namespace.
 */
export const ClientGroupsListByNamespace = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ClientGroupsListByNamespaceInput,
    outputSchema: ClientGroupsListByNamespaceOutput,
  }),
);
// Input Schema
export const ClientsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    clientName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}/clients/{clientName}",
    }),
  );
export type ClientsCreateOrUpdateInput = typeof ClientsCreateOrUpdateInput.Type;

// Output Schema
export const ClientsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type ClientsCreateOrUpdateOutput =
  typeof ClientsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a client.
 *
 * Create or update a client with the specified parameters.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param namespaceName - Name of the namespace.
 * @param clientName - The client name.
 */
export const ClientsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ClientsCreateOrUpdateInput,
    outputSchema: ClientsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const ClientsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  namespaceName: Schema.String.pipe(T.PathParam()),
  clientName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}/clients/{clientName}",
  }),
);
export type ClientsDeleteInput = typeof ClientsDeleteInput.Type;

// Output Schema
export const ClientsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ClientsDeleteOutput = typeof ClientsDeleteOutput.Type;

// The operation
/**
 * Delete a client.
 *
 * Delete an existing client.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param namespaceName - Name of the namespace.
 * @param clientName - Name of the client.
 */
export const ClientsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ClientsDeleteInput,
  outputSchema: ClientsDeleteOutput,
}));
// Input Schema
export const ClientsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  namespaceName: Schema.String.pipe(T.PathParam()),
  clientName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}/clients/{clientName}",
  }),
);
export type ClientsGetInput = typeof ClientsGetInput.Type;

// Output Schema
export const ClientsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
});
export type ClientsGetOutput = typeof ClientsGetOutput.Type;

// The operation
/**
 * Get a client.
 *
 * Get properties of a client.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param namespaceName - Name of the namespace.
 * @param clientName - Name of the client.
 */
export const ClientsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ClientsGetInput,
  outputSchema: ClientsGetOutput,
}));
// Input Schema
export const ClientsListByNamespaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}/clients",
    }),
  );
export type ClientsListByNamespaceInput =
  typeof ClientsListByNamespaceInput.Type;

// Output Schema
export const ClientsListByNamespaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ClientsListByNamespaceOutput =
  typeof ClientsListByNamespaceOutput.Type;

// The operation
/**
 * List all permission bindings under a namespace.
 *
 * Get all the permission bindings under a namespace.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param namespaceName - Name of the namespace.
 */
export const ClientsListByNamespace = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ClientsListByNamespaceInput,
    outputSchema: ClientsListByNamespaceOutput,
  }),
);
// Input Schema
export const DomainEventSubscriptionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    domainName: Schema.String.pipe(T.PathParam()),
    eventSubscriptionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/domains/{domainName}/eventSubscriptions/{eventSubscriptionName}",
    }),
  );
export type DomainEventSubscriptionsCreateOrUpdateInput =
  typeof DomainEventSubscriptionsCreateOrUpdateInput.Type;

// Output Schema
export const DomainEventSubscriptionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type DomainEventSubscriptionsCreateOrUpdateOutput =
  typeof DomainEventSubscriptionsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update an event subscription to a domain.
 *
 * Asynchronously creates a new event subscription or updates an existing event subscription.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param domainName - Name of the domain topic.
 * @param eventSubscriptionName - Name of the event subscription to be created. Event subscription names must be between 3 and 64 characters in length and use alphanumeric letters only.
 */
export const DomainEventSubscriptionsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DomainEventSubscriptionsCreateOrUpdateInput,
    outputSchema: DomainEventSubscriptionsCreateOrUpdateOutput,
  }));
// Input Schema
export const DomainEventSubscriptionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    domainName: Schema.String.pipe(T.PathParam()),
    eventSubscriptionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/domains/{domainName}/eventSubscriptions/{eventSubscriptionName}",
    }),
  );
export type DomainEventSubscriptionsDeleteInput =
  typeof DomainEventSubscriptionsDeleteInput.Type;

// Output Schema
export const DomainEventSubscriptionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DomainEventSubscriptionsDeleteOutput =
  typeof DomainEventSubscriptionsDeleteOutput.Type;

// The operation
/**
 * Delete an event subscription for a domain.
 *
 * Delete an existing event subscription for a domain.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param domainName - Name of the domain.
 * @param eventSubscriptionName - Name of the event subscription to be deleted.
 */
export const DomainEventSubscriptionsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DomainEventSubscriptionsDeleteInput,
    outputSchema: DomainEventSubscriptionsDeleteOutput,
  }));
// Input Schema
export const DomainEventSubscriptionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    domainName: Schema.String.pipe(T.PathParam()),
    eventSubscriptionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/domains/{domainName}/eventSubscriptions/{eventSubscriptionName}",
    }),
  );
export type DomainEventSubscriptionsGetInput =
  typeof DomainEventSubscriptionsGetInput.Type;

// Output Schema
export const DomainEventSubscriptionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type DomainEventSubscriptionsGetOutput =
  typeof DomainEventSubscriptionsGetOutput.Type;

// The operation
/**
 * Get an event subscription of a domain.
 *
 * Get properties of an event subscription of a domain.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param domainName - Name of the domain.
 * @param eventSubscriptionName - Name of the event subscription to be found.
 */
export const DomainEventSubscriptionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DomainEventSubscriptionsGetInput,
    outputSchema: DomainEventSubscriptionsGetOutput,
  }),
);
// Input Schema
export const DomainEventSubscriptionsGetDeliveryAttributesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    domainName: Schema.String.pipe(T.PathParam()),
    eventSubscriptionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/domains/{domainName}/eventSubscriptions/{eventSubscriptionName}/getDeliveryAttributes",
    }),
  );
export type DomainEventSubscriptionsGetDeliveryAttributesInput =
  typeof DomainEventSubscriptionsGetDeliveryAttributesInput.Type;

// Output Schema
export const DomainEventSubscriptionsGetDeliveryAttributesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          name: Schema.optional(Schema.String),
          type: Schema.Literals(["Static", "Dynamic"]),
        }),
      ),
    ),
  });
export type DomainEventSubscriptionsGetDeliveryAttributesOutput =
  typeof DomainEventSubscriptionsGetDeliveryAttributesOutput.Type;

// The operation
/**
 * Get delivery attributes for an event subscription for domain.
 *
 * Get all delivery attributes for an event subscription for domain.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param domainName - Name of the domain.
 * @param eventSubscriptionName - Name of the event subscription.
 */
export const DomainEventSubscriptionsGetDeliveryAttributes =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DomainEventSubscriptionsGetDeliveryAttributesInput,
    outputSchema: DomainEventSubscriptionsGetDeliveryAttributesOutput,
  }));
// Input Schema
export const DomainEventSubscriptionsGetFullUrlInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    domainName: Schema.String.pipe(T.PathParam()),
    eventSubscriptionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/domains/{domainName}/eventSubscriptions/{eventSubscriptionName}/getFullUrl",
    }),
  );
export type DomainEventSubscriptionsGetFullUrlInput =
  typeof DomainEventSubscriptionsGetFullUrlInput.Type;

// Output Schema
export const DomainEventSubscriptionsGetFullUrlOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    endpointUrl: Schema.optional(Schema.String),
  });
export type DomainEventSubscriptionsGetFullUrlOutput =
  typeof DomainEventSubscriptionsGetFullUrlOutput.Type;

// The operation
/**
 * Get full URL of an event subscription for domain.
 *
 * Get the full endpoint URL for an event subscription for domain.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param domainName - Name of the domain topic.
 * @param eventSubscriptionName - Name of the event subscription.
 */
export const DomainEventSubscriptionsGetFullUrl =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DomainEventSubscriptionsGetFullUrlInput,
    outputSchema: DomainEventSubscriptionsGetFullUrlOutput,
  }));
// Input Schema
export const DomainEventSubscriptionsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    domainName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/domains/{domainName}/eventSubscriptions",
    }),
  );
export type DomainEventSubscriptionsListInput =
  typeof DomainEventSubscriptionsListInput.Type;

// Output Schema
export const DomainEventSubscriptionsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type DomainEventSubscriptionsListOutput =
  typeof DomainEventSubscriptionsListOutput.Type;

// The operation
/**
 * List all event subscriptions for a specific domain.
 *
 * List all event subscriptions that have been created for a specific topic.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param domainName - Name of the domain.
 */
export const DomainEventSubscriptionsList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DomainEventSubscriptionsListInput,
    outputSchema: DomainEventSubscriptionsListOutput,
  }));
// Input Schema
export const DomainEventSubscriptionsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    domainName: Schema.String.pipe(T.PathParam()),
    eventSubscriptionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/domains/{domainName}/eventSubscriptions/{eventSubscriptionName}",
    }),
  );
export type DomainEventSubscriptionsUpdateInput =
  typeof DomainEventSubscriptionsUpdateInput.Type;

// Output Schema
export const DomainEventSubscriptionsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type DomainEventSubscriptionsUpdateOutput =
  typeof DomainEventSubscriptionsUpdateOutput.Type;

// The operation
/**
 * Update an event subscription for a domain.
 *
 * Update an existing event subscription for a topic.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param domainName - Name of the domain.
 * @param eventSubscriptionName - Name of the event subscription to be updated.
 */
export const DomainEventSubscriptionsUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DomainEventSubscriptionsUpdateInput,
    outputSchema: DomainEventSubscriptionsUpdateOutput,
  }));
// Input Schema
export const DomainsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    domainName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/domains/{domainName}",
    }),
  );
export type DomainsCreateOrUpdateInput = typeof DomainsCreateOrUpdateInput.Type;

// Output Schema
export const DomainsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    location: Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type DomainsCreateOrUpdateOutput =
  typeof DomainsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a domain.
 *
 * Asynchronously creates or updates a new domain with the specified parameters.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param domainName - Name of the domain.
 */
export const DomainsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DomainsCreateOrUpdateInput,
    outputSchema: DomainsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const DomainsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  domainName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/domains/{domainName}",
  }),
);
export type DomainsDeleteInput = typeof DomainsDeleteInput.Type;

// Output Schema
export const DomainsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DomainsDeleteOutput = typeof DomainsDeleteOutput.Type;

// The operation
/**
 * Delete a domain.
 *
 * Delete existing domain.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param domainName - Name of the domain.
 */
export const DomainsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DomainsDeleteInput,
  outputSchema: DomainsDeleteOutput,
}));
// Input Schema
export const DomainsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  domainName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/domains/{domainName}",
  }),
);
export type DomainsGetInput = typeof DomainsGetInput.Type;

// Output Schema
export const DomainsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  location: Schema.String,
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
});
export type DomainsGetOutput = typeof DomainsGetOutput.Type;

// The operation
/**
 * Get a domain.
 *
 * Get properties of a domain.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param domainName - Name of the domain.
 */
export const DomainsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DomainsGetInput,
  outputSchema: DomainsGetOutput,
}));
// Input Schema
export const DomainsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/domains",
    }),
  );
export type DomainsListByResourceGroupInput =
  typeof DomainsListByResourceGroupInput.Type;

// Output Schema
export const DomainsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          location: Schema.String,
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type DomainsListByResourceGroupOutput =
  typeof DomainsListByResourceGroupOutput.Type;

// The operation
/**
 * List domains under a resource group.
 *
 * List all the domains under a resource group.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 */
export const DomainsListByResourceGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DomainsListByResourceGroupInput,
    outputSchema: DomainsListByResourceGroupOutput,
  }),
);
// Input Schema
export const DomainsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.EventGrid/domains",
    }),
  );
export type DomainsListBySubscriptionInput =
  typeof DomainsListBySubscriptionInput.Type;

// Output Schema
export const DomainsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          location: Schema.String,
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type DomainsListBySubscriptionOutput =
  typeof DomainsListBySubscriptionOutput.Type;

// The operation
/**
 * List domains under an Azure subscription.
 *
 * List all the domains under an Azure subscription.
 */
export const DomainsListBySubscription = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DomainsListBySubscriptionInput,
    outputSchema: DomainsListBySubscriptionOutput,
  }),
);
// Input Schema
export const DomainsListSharedAccessKeysInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    domainName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/domains/{domainName}/listKeys",
    }),
  );
export type DomainsListSharedAccessKeysInput =
  typeof DomainsListSharedAccessKeysInput.Type;

// Output Schema
export const DomainsListSharedAccessKeysOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    key1: Schema.optional(Schema.String),
    key2: Schema.optional(Schema.String),
  });
export type DomainsListSharedAccessKeysOutput =
  typeof DomainsListSharedAccessKeysOutput.Type;

// The operation
/**
 * List keys for a domain.
 *
 * List the two keys used to publish to a domain.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param domainName - Name of the domain.
 */
export const DomainsListSharedAccessKeys = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DomainsListSharedAccessKeysInput,
    outputSchema: DomainsListSharedAccessKeysOutput,
  }),
);
// Input Schema
export const DomainsRegenerateKeyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    domainName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/domains/{domainName}/regenerateKey",
    }),
  );
export type DomainsRegenerateKeyInput = typeof DomainsRegenerateKeyInput.Type;

// Output Schema
export const DomainsRegenerateKeyOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    key1: Schema.optional(Schema.String),
    key2: Schema.optional(Schema.String),
  });
export type DomainsRegenerateKeyOutput = typeof DomainsRegenerateKeyOutput.Type;

// The operation
/**
 * Regenerate key for a domain.
 *
 * Regenerate a shared access key for a domain.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param domainName - Name of the domain.
 */
export const DomainsRegenerateKey = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DomainsRegenerateKeyInput,
    outputSchema: DomainsRegenerateKeyOutput,
  }),
);
// Input Schema
export const DomainsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  domainName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/domains/{domainName}",
  }),
);
export type DomainsUpdateInput = typeof DomainsUpdateInput.Type;

// Output Schema
export const DomainsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DomainsUpdateOutput = typeof DomainsUpdateOutput.Type;

// The operation
/**
 * Update a domain.
 *
 * Asynchronously updates a domain with the specified parameters.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param domainName - Name of the domain.
 */
export const DomainsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DomainsUpdateInput,
  outputSchema: DomainsUpdateOutput,
}));
// Input Schema
export const DomainTopicEventSubscriptionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    domainName: Schema.String.pipe(T.PathParam()),
    topicName: Schema.String.pipe(T.PathParam()),
    eventSubscriptionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/domains/{domainName}/topics/{topicName}/eventSubscriptions/{eventSubscriptionName}",
    }),
  );
export type DomainTopicEventSubscriptionsCreateOrUpdateInput =
  typeof DomainTopicEventSubscriptionsCreateOrUpdateInput.Type;

// Output Schema
export const DomainTopicEventSubscriptionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type DomainTopicEventSubscriptionsCreateOrUpdateOutput =
  typeof DomainTopicEventSubscriptionsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a nested event subscription to a domain topic.
 *
 * Asynchronously creates a new event subscription or updates an existing event subscription.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param domainName - Name of the top level domain.
 * @param topicName - Name of the domain topic.
 * @param eventSubscriptionName - Name of the event subscription to be created. Event subscription names must be between 3 and 64 characters in length and use alphanumeric letters only.
 */
export const DomainTopicEventSubscriptionsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DomainTopicEventSubscriptionsCreateOrUpdateInput,
    outputSchema: DomainTopicEventSubscriptionsCreateOrUpdateOutput,
  }));
// Input Schema
export const DomainTopicEventSubscriptionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    domainName: Schema.String.pipe(T.PathParam()),
    topicName: Schema.String.pipe(T.PathParam()),
    eventSubscriptionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/domains/{domainName}/topics/{topicName}/eventSubscriptions/{eventSubscriptionName}",
    }),
  );
export type DomainTopicEventSubscriptionsDeleteInput =
  typeof DomainTopicEventSubscriptionsDeleteInput.Type;

// Output Schema
export const DomainTopicEventSubscriptionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DomainTopicEventSubscriptionsDeleteOutput =
  typeof DomainTopicEventSubscriptionsDeleteOutput.Type;

// The operation
/**
 * Delete a nested event subscription for a domain topic.
 *
 * Delete a nested existing event subscription for a domain topic.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param domainName - Name of the top level domain.
 * @param topicName - Name of the domain topic.
 * @param eventSubscriptionName - Name of the event subscription to be deleted.
 */
export const DomainTopicEventSubscriptionsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DomainTopicEventSubscriptionsDeleteInput,
    outputSchema: DomainTopicEventSubscriptionsDeleteOutput,
  }));
// Input Schema
export const DomainTopicEventSubscriptionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    domainName: Schema.String.pipe(T.PathParam()),
    topicName: Schema.String.pipe(T.PathParam()),
    eventSubscriptionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/domains/{domainName}/topics/{topicName}/eventSubscriptions/{eventSubscriptionName}",
    }),
  );
export type DomainTopicEventSubscriptionsGetInput =
  typeof DomainTopicEventSubscriptionsGetInput.Type;

// Output Schema
export const DomainTopicEventSubscriptionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type DomainTopicEventSubscriptionsGetOutput =
  typeof DomainTopicEventSubscriptionsGetOutput.Type;

// The operation
/**
 * Get a nested event subscription for domain topic.
 *
 * Get properties of a nested event subscription for a domain topic.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param domainName - Name of the top level domain.
 * @param topicName - Name of the domain topic.
 * @param eventSubscriptionName - Name of the event subscription to be found.
 */
export const DomainTopicEventSubscriptionsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DomainTopicEventSubscriptionsGetInput,
    outputSchema: DomainTopicEventSubscriptionsGetOutput,
  }));
// Input Schema
export const DomainTopicEventSubscriptionsGetDeliveryAttributesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    domainName: Schema.String.pipe(T.PathParam()),
    topicName: Schema.String.pipe(T.PathParam()),
    eventSubscriptionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/domains/{domainName}/topics/{topicName}/eventSubscriptions/{eventSubscriptionName}/getDeliveryAttributes",
    }),
  );
export type DomainTopicEventSubscriptionsGetDeliveryAttributesInput =
  typeof DomainTopicEventSubscriptionsGetDeliveryAttributesInput.Type;

// Output Schema
export const DomainTopicEventSubscriptionsGetDeliveryAttributesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          name: Schema.optional(Schema.String),
          type: Schema.Literals(["Static", "Dynamic"]),
        }),
      ),
    ),
  });
export type DomainTopicEventSubscriptionsGetDeliveryAttributesOutput =
  typeof DomainTopicEventSubscriptionsGetDeliveryAttributesOutput.Type;

// The operation
/**
 * Get delivery attributes for an event subscription for domain topic.
 *
 * Get all delivery attributes for an event subscription for domain topic.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param domainName - Name of the top level domain.
 * @param topicName - Name of the domain topic.
 * @param eventSubscriptionName - Name of the event subscription.
 */
export const DomainTopicEventSubscriptionsGetDeliveryAttributes =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DomainTopicEventSubscriptionsGetDeliveryAttributesInput,
    outputSchema: DomainTopicEventSubscriptionsGetDeliveryAttributesOutput,
  }));
// Input Schema
export const DomainTopicEventSubscriptionsGetFullUrlInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    domainName: Schema.String.pipe(T.PathParam()),
    topicName: Schema.String.pipe(T.PathParam()),
    eventSubscriptionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/domains/{domainName}/topics/{topicName}/eventSubscriptions/{eventSubscriptionName}/getFullUrl",
    }),
  );
export type DomainTopicEventSubscriptionsGetFullUrlInput =
  typeof DomainTopicEventSubscriptionsGetFullUrlInput.Type;

// Output Schema
export const DomainTopicEventSubscriptionsGetFullUrlOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    endpointUrl: Schema.optional(Schema.String),
  });
export type DomainTopicEventSubscriptionsGetFullUrlOutput =
  typeof DomainTopicEventSubscriptionsGetFullUrlOutput.Type;

// The operation
/**
 * Get full URL of a nested event subscription for domain topic.
 *
 * Get the full endpoint URL for a nested event subscription for domain topic.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param domainName - Name of the top level domain.
 * @param topicName - Name of the domain topic.
 * @param eventSubscriptionName - Name of the event subscription.
 */
export const DomainTopicEventSubscriptionsGetFullUrl =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DomainTopicEventSubscriptionsGetFullUrlInput,
    outputSchema: DomainTopicEventSubscriptionsGetFullUrlOutput,
  }));
// Input Schema
export const DomainTopicEventSubscriptionsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    domainName: Schema.String.pipe(T.PathParam()),
    topicName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/domains/{domainName}/topics/{topicName}/eventSubscriptions",
    }),
  );
export type DomainTopicEventSubscriptionsListInput =
  typeof DomainTopicEventSubscriptionsListInput.Type;

// Output Schema
export const DomainTopicEventSubscriptionsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type DomainTopicEventSubscriptionsListOutput =
  typeof DomainTopicEventSubscriptionsListOutput.Type;

// The operation
/**
 * List all nested event subscriptions for a specific domain topic.
 *
 * List all event subscriptions that have been created for a specific domain topic.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param domainName - Name of the top level domain.
 * @param topicName - Name of the domain topic.
 */
export const DomainTopicEventSubscriptionsList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DomainTopicEventSubscriptionsListInput,
    outputSchema: DomainTopicEventSubscriptionsListOutput,
  }));
// Input Schema
export const DomainTopicEventSubscriptionsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    domainName: Schema.String.pipe(T.PathParam()),
    topicName: Schema.String.pipe(T.PathParam()),
    eventSubscriptionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/domains/{domainName}/topics/{topicName}/eventSubscriptions/{eventSubscriptionName}",
    }),
  );
export type DomainTopicEventSubscriptionsUpdateInput =
  typeof DomainTopicEventSubscriptionsUpdateInput.Type;

// Output Schema
export const DomainTopicEventSubscriptionsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type DomainTopicEventSubscriptionsUpdateOutput =
  typeof DomainTopicEventSubscriptionsUpdateOutput.Type;

// The operation
/**
 * Update a nested event subscription for a domain topic.
 *
 * Update an existing event subscription for a domain topic.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param domainName - Name of the domain.
 * @param topicName - Name of the topic.
 * @param eventSubscriptionName - Name of the event subscription to be updated.
 */
export const DomainTopicEventSubscriptionsUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DomainTopicEventSubscriptionsUpdateInput,
    outputSchema: DomainTopicEventSubscriptionsUpdateOutput,
  }));
// Input Schema
export const DomainTopicsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    domainName: Schema.String.pipe(T.PathParam()),
    domainTopicName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/domains/{domainName}/topics/{domainTopicName}",
    }),
  );
export type DomainTopicsCreateOrUpdateInput =
  typeof DomainTopicsCreateOrUpdateInput.Type;

// Output Schema
export const DomainTopicsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type DomainTopicsCreateOrUpdateOutput =
  typeof DomainTopicsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a domain topic.
 *
 * Asynchronously creates or updates a new domain topic with the specified parameters.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param domainName - Name of the domain.
 * @param domainTopicName - Name of the domain topic.
 */
export const DomainTopicsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DomainTopicsCreateOrUpdateInput,
    outputSchema: DomainTopicsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const DomainTopicsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    domainName: Schema.String.pipe(T.PathParam()),
    domainTopicName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/domains/{domainName}/topics/{domainTopicName}",
    }),
  );
export type DomainTopicsDeleteInput = typeof DomainTopicsDeleteInput.Type;

// Output Schema
export const DomainTopicsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DomainTopicsDeleteOutput = typeof DomainTopicsDeleteOutput.Type;

// The operation
/**
 * Delete a domain topic.
 *
 * Delete existing domain topic.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param domainName - Name of the domain.
 * @param domainTopicName - Name of the domain topic.
 */
export const DomainTopicsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DomainTopicsDeleteInput,
  outputSchema: DomainTopicsDeleteOutput,
}));
// Input Schema
export const DomainTopicsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  domainName: Schema.String.pipe(T.PathParam()),
  domainTopicName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/domains/{domainName}/topics/{domainTopicName}",
  }),
);
export type DomainTopicsGetInput = typeof DomainTopicsGetInput.Type;

// Output Schema
export const DomainTopicsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
});
export type DomainTopicsGetOutput = typeof DomainTopicsGetOutput.Type;

// The operation
/**
 * Get a domain topic.
 *
 * Get properties of a domain topic.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param domainName - Name of the domain.
 * @param domainTopicName - Name of the topic.
 */
export const DomainTopicsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DomainTopicsGetInput,
  outputSchema: DomainTopicsGetOutput,
}));
// Input Schema
export const DomainTopicsListByDomainInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    domainName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/domains/{domainName}/topics",
    }),
  );
export type DomainTopicsListByDomainInput =
  typeof DomainTopicsListByDomainInput.Type;

// Output Schema
export const DomainTopicsListByDomainOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type DomainTopicsListByDomainOutput =
  typeof DomainTopicsListByDomainOutput.Type;

// The operation
/**
 * List domain topics.
 *
 * List all the topics in a domain.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param domainName - Domain name.
 */
export const DomainTopicsListByDomain = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DomainTopicsListByDomainInput,
    outputSchema: DomainTopicsListByDomainOutput,
  }),
);
// Input Schema
export const EventSubscriptionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scope: Schema.String.pipe(T.PathParam()),
    eventSubscriptionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/{scope}/providers/Microsoft.EventGrid/eventSubscriptions/{eventSubscriptionName}",
    }),
  );
export type EventSubscriptionsCreateOrUpdateInput =
  typeof EventSubscriptionsCreateOrUpdateInput.Type;

// Output Schema
export const EventSubscriptionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type EventSubscriptionsCreateOrUpdateOutput =
  typeof EventSubscriptionsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update an event subscription.
 *
 * Asynchronously creates a new event subscription or updates an existing event subscription based on the specified scope.
 *
 * @param scope - The identifier of the resource to which the event subscription needs to be created or updated. The scope can be a subscription, or a resource group, or a top level resource belonging to a resource provider namespace, or an EventGrid topic. For example, use '/subscriptions/{subscriptionId}/' for a subscription, '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}' for a resource group, and '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}' for a resource, and '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/topics/{topicName}' for an EventGrid topic.
 * @param eventSubscriptionName - Name of the event subscription to be created. Event subscription names must be between 3 and 64 characters in length and should use alphanumeric letters only.
 */
export const EventSubscriptionsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: EventSubscriptionsCreateOrUpdateInput,
    outputSchema: EventSubscriptionsCreateOrUpdateOutput,
  }));
// Input Schema
export const EventSubscriptionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scope: Schema.String.pipe(T.PathParam()),
    eventSubscriptionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/{scope}/providers/Microsoft.EventGrid/eventSubscriptions/{eventSubscriptionName}",
    }),
  );
export type EventSubscriptionsDeleteInput =
  typeof EventSubscriptionsDeleteInput.Type;

// Output Schema
export const EventSubscriptionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type EventSubscriptionsDeleteOutput =
  typeof EventSubscriptionsDeleteOutput.Type;

// The operation
/**
 * Delete an event subscription.
 *
 * Delete an existing event subscription.
 *
 * @param scope - The scope of the event subscription. The scope can be a subscription, or a resource group, or a top level resource belonging to a resource provider namespace, or an EventGrid topic. For example, use '/subscriptions/{subscriptionId}/' for a subscription, '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}' for a resource group, and '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}' for a resource, and '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/topics/{topicName}' for an EventGrid topic.
 * @param eventSubscriptionName - Name of the event subscription to be deleted.
 */
export const EventSubscriptionsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: EventSubscriptionsDeleteInput,
    outputSchema: EventSubscriptionsDeleteOutput,
  }),
);
// Input Schema
export const EventSubscriptionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scope: Schema.String.pipe(T.PathParam()),
    eventSubscriptionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/{scope}/providers/Microsoft.EventGrid/eventSubscriptions/{eventSubscriptionName}",
    }),
  );
export type EventSubscriptionsGetInput = typeof EventSubscriptionsGetInput.Type;

// Output Schema
export const EventSubscriptionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type EventSubscriptionsGetOutput =
  typeof EventSubscriptionsGetOutput.Type;

// The operation
/**
 * Get an event subscription.
 *
 * Get properties of an event subscription.
 *
 * @param scope - The scope of the event subscription. The scope can be a subscription, or a resource group, or a top level resource belonging to a resource provider namespace, or an EventGrid topic. For example, use '/subscriptions/{subscriptionId}/' for a subscription, '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}' for a resource group, and '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}' for a resource, and '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/topics/{topicName}' for an EventGrid topic.
 * @param eventSubscriptionName - Name of the event subscription to be found.
 */
export const EventSubscriptionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: EventSubscriptionsGetInput,
    outputSchema: EventSubscriptionsGetOutput,
  }),
);
// Input Schema
export const EventSubscriptionsGetDeliveryAttributesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scope: Schema.String.pipe(T.PathParam()),
    eventSubscriptionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/{scope}/providers/Microsoft.EventGrid/eventSubscriptions/{eventSubscriptionName}/getDeliveryAttributes",
    }),
  );
export type EventSubscriptionsGetDeliveryAttributesInput =
  typeof EventSubscriptionsGetDeliveryAttributesInput.Type;

// Output Schema
export const EventSubscriptionsGetDeliveryAttributesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          name: Schema.optional(Schema.String),
          type: Schema.Literals(["Static", "Dynamic"]),
        }),
      ),
    ),
  });
export type EventSubscriptionsGetDeliveryAttributesOutput =
  typeof EventSubscriptionsGetDeliveryAttributesOutput.Type;

// The operation
/**
 * Get delivery attributes for an event subscription.
 *
 * Get all delivery attributes for an event subscription.
 *
 * @param scope - The scope of the event subscription. The scope can be a subscription, or a resource group, or a top level resource belonging to a resource provider namespace, or an EventGrid topic. For example, use '/subscriptions/{subscriptionId}/' for a subscription, '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}' for a resource group, and '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}' for a resource, and '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/topics/{topicName}' for an EventGrid topic.
 * @param eventSubscriptionName - Name of the event subscription.
 */
export const EventSubscriptionsGetDeliveryAttributes =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: EventSubscriptionsGetDeliveryAttributesInput,
    outputSchema: EventSubscriptionsGetDeliveryAttributesOutput,
  }));
// Input Schema
export const EventSubscriptionsGetFullUrlInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scope: Schema.String.pipe(T.PathParam()),
    eventSubscriptionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/{scope}/providers/Microsoft.EventGrid/eventSubscriptions/{eventSubscriptionName}/getFullUrl",
    }),
  );
export type EventSubscriptionsGetFullUrlInput =
  typeof EventSubscriptionsGetFullUrlInput.Type;

// Output Schema
export const EventSubscriptionsGetFullUrlOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    endpointUrl: Schema.optional(Schema.String),
  });
export type EventSubscriptionsGetFullUrlOutput =
  typeof EventSubscriptionsGetFullUrlOutput.Type;

// The operation
/**
 * Get full URL of an event subscription.
 *
 * Get the full endpoint URL for an event subscription.
 *
 * @param scope - The scope of the event subscription. The scope can be a subscription, or a resource group, or a top level resource belonging to a resource provider namespace, or an EventGrid topic. For example, use '/subscriptions/{subscriptionId}/' for a subscription, '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}' for a resource group, and '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}' for a resource, and '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/topics/{topicName}' for an EventGrid topic.
 * @param eventSubscriptionName - Name of the event subscription.
 */
export const EventSubscriptionsGetFullUrl =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: EventSubscriptionsGetFullUrlInput,
    outputSchema: EventSubscriptionsGetFullUrlOutput,
  }));
// Input Schema
export const EventSubscriptionsListByDomainTopicInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    domainName: Schema.String.pipe(T.PathParam()),
    topicName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/domains/{domainName}/topics/{topicName}/providers/Microsoft.EventGrid/eventSubscriptions",
    }),
  );
export type EventSubscriptionsListByDomainTopicInput =
  typeof EventSubscriptionsListByDomainTopicInput.Type;

// Output Schema
export const EventSubscriptionsListByDomainTopicOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type EventSubscriptionsListByDomainTopicOutput =
  typeof EventSubscriptionsListByDomainTopicOutput.Type;

// The operation
/**
 * List all event subscriptions for a specific domain topic.
 *
 * List all event subscriptions that have been created for a specific domain topic.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param domainName - Name of the top level domain.
 * @param topicName - Name of the domain topic.
 */
export const EventSubscriptionsListByDomainTopic =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: EventSubscriptionsListByDomainTopicInput,
    outputSchema: EventSubscriptionsListByDomainTopicOutput,
  }));
// Input Schema
export const EventSubscriptionsListByResourceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    providerNamespace: Schema.String.pipe(T.PathParam()),
    resourceTypeName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{providerNamespace}/{resourceTypeName}/{resourceName}/providers/Microsoft.EventGrid/eventSubscriptions",
    }),
  );
export type EventSubscriptionsListByResourceInput =
  typeof EventSubscriptionsListByResourceInput.Type;

// Output Schema
export const EventSubscriptionsListByResourceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type EventSubscriptionsListByResourceOutput =
  typeof EventSubscriptionsListByResourceOutput.Type;

// The operation
/**
 * List all event subscriptions.
 *
 * List all event subscriptions that have been created for a specific resource.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param providerNamespace - Namespace of the provider of the topic.
 * @param resourceTypeName - Name of the resource type.
 * @param resourceName - Name of the resource.
 */
export const EventSubscriptionsListByResource =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: EventSubscriptionsListByResourceInput,
    outputSchema: EventSubscriptionsListByResourceOutput,
  }));
// Input Schema
export const EventSubscriptionsListGlobalByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/eventSubscriptions",
    }),
  );
export type EventSubscriptionsListGlobalByResourceGroupInput =
  typeof EventSubscriptionsListGlobalByResourceGroupInput.Type;

// Output Schema
export const EventSubscriptionsListGlobalByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type EventSubscriptionsListGlobalByResourceGroupOutput =
  typeof EventSubscriptionsListGlobalByResourceGroupOutput.Type;

// The operation
/**
 * List all global event subscriptions under an Azure subscription and resource group.
 *
 * List all global event subscriptions under a specific Azure subscription and resource group.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 */
export const EventSubscriptionsListGlobalByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: EventSubscriptionsListGlobalByResourceGroupInput,
    outputSchema: EventSubscriptionsListGlobalByResourceGroupOutput,
  }));
// Input Schema
export const EventSubscriptionsListGlobalByResourceGroupForTopicTypeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    topicTypeName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/topicTypes/{topicTypeName}/eventSubscriptions",
    }),
  );
export type EventSubscriptionsListGlobalByResourceGroupForTopicTypeInput =
  typeof EventSubscriptionsListGlobalByResourceGroupForTopicTypeInput.Type;

// Output Schema
export const EventSubscriptionsListGlobalByResourceGroupForTopicTypeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type EventSubscriptionsListGlobalByResourceGroupForTopicTypeOutput =
  typeof EventSubscriptionsListGlobalByResourceGroupForTopicTypeOutput.Type;

// The operation
/**
 * List all global event subscriptions under a resource group for a topic type.
 *
 * List all global event subscriptions under a resource group for a specific topic type.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param topicTypeName - Name of the topic type.
 */
export const EventSubscriptionsListGlobalByResourceGroupForTopicType =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: EventSubscriptionsListGlobalByResourceGroupForTopicTypeInput,
    outputSchema: EventSubscriptionsListGlobalByResourceGroupForTopicTypeOutput,
  }));
// Input Schema
export const EventSubscriptionsListGlobalBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.EventGrid/eventSubscriptions",
    }),
  );
export type EventSubscriptionsListGlobalBySubscriptionInput =
  typeof EventSubscriptionsListGlobalBySubscriptionInput.Type;

// Output Schema
export const EventSubscriptionsListGlobalBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type EventSubscriptionsListGlobalBySubscriptionOutput =
  typeof EventSubscriptionsListGlobalBySubscriptionOutput.Type;

// The operation
/**
 * Get an aggregated list of all global event subscriptions under an Azure subscription.
 *
 * List all aggregated global event subscriptions under a specific Azure subscription.
 */
export const EventSubscriptionsListGlobalBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: EventSubscriptionsListGlobalBySubscriptionInput,
    outputSchema: EventSubscriptionsListGlobalBySubscriptionOutput,
  }));
// Input Schema
export const EventSubscriptionsListGlobalBySubscriptionForTopicTypeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    topicTypeName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.EventGrid/topicTypes/{topicTypeName}/eventSubscriptions",
    }),
  );
export type EventSubscriptionsListGlobalBySubscriptionForTopicTypeInput =
  typeof EventSubscriptionsListGlobalBySubscriptionForTopicTypeInput.Type;

// Output Schema
export const EventSubscriptionsListGlobalBySubscriptionForTopicTypeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type EventSubscriptionsListGlobalBySubscriptionForTopicTypeOutput =
  typeof EventSubscriptionsListGlobalBySubscriptionForTopicTypeOutput.Type;

// The operation
/**
 * List all global event subscriptions for a topic type.
 *
 * List all global event subscriptions under an Azure subscription for a topic type.
 *
 * @param topicTypeName - Name of the topic type.
 */
export const EventSubscriptionsListGlobalBySubscriptionForTopicType =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: EventSubscriptionsListGlobalBySubscriptionForTopicTypeInput,
    outputSchema: EventSubscriptionsListGlobalBySubscriptionForTopicTypeOutput,
  }));
// Input Schema
export const EventSubscriptionsListRegionalByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/locations/{location}/eventSubscriptions",
    }),
  );
export type EventSubscriptionsListRegionalByResourceGroupInput =
  typeof EventSubscriptionsListRegionalByResourceGroupInput.Type;

// Output Schema
export const EventSubscriptionsListRegionalByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type EventSubscriptionsListRegionalByResourceGroupOutput =
  typeof EventSubscriptionsListRegionalByResourceGroupOutput.Type;

// The operation
/**
 * List all regional event subscriptions under an Azure subscription and resource group.
 *
 * List all event subscriptions from the given location under a specific Azure subscription and resource group.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param location - Name of the location.
 */
export const EventSubscriptionsListRegionalByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: EventSubscriptionsListRegionalByResourceGroupInput,
    outputSchema: EventSubscriptionsListRegionalByResourceGroupOutput,
  }));
// Input Schema
export const EventSubscriptionsListRegionalByResourceGroupForTopicTypeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    topicTypeName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/locations/{location}/topicTypes/{topicTypeName}/eventSubscriptions",
    }),
  );
export type EventSubscriptionsListRegionalByResourceGroupForTopicTypeInput =
  typeof EventSubscriptionsListRegionalByResourceGroupForTopicTypeInput.Type;

// Output Schema
export const EventSubscriptionsListRegionalByResourceGroupForTopicTypeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type EventSubscriptionsListRegionalByResourceGroupForTopicTypeOutput =
  typeof EventSubscriptionsListRegionalByResourceGroupForTopicTypeOutput.Type;

// The operation
/**
 * List all regional event subscriptions under an Azure subscription and resource group for a topic type.
 *
 * List all event subscriptions from the given location under a specific Azure subscription and resource group and topic type.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param location - Name of the location.
 * @param topicTypeName - Name of the topic type.
 */
export const EventSubscriptionsListRegionalByResourceGroupForTopicType =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: EventSubscriptionsListRegionalByResourceGroupForTopicTypeInput,
    outputSchema:
      EventSubscriptionsListRegionalByResourceGroupForTopicTypeOutput,
  }));
// Input Schema
export const EventSubscriptionsListRegionalBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    location: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.EventGrid/locations/{location}/eventSubscriptions",
    }),
  );
export type EventSubscriptionsListRegionalBySubscriptionInput =
  typeof EventSubscriptionsListRegionalBySubscriptionInput.Type;

// Output Schema
export const EventSubscriptionsListRegionalBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type EventSubscriptionsListRegionalBySubscriptionOutput =
  typeof EventSubscriptionsListRegionalBySubscriptionOutput.Type;

// The operation
/**
 * List all regional event subscriptions under an Azure subscription.
 *
 * List all event subscriptions from the given location under a specific Azure subscription.
 *
 * @param location - Name of the location.
 */
export const EventSubscriptionsListRegionalBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: EventSubscriptionsListRegionalBySubscriptionInput,
    outputSchema: EventSubscriptionsListRegionalBySubscriptionOutput,
  }));
// Input Schema
export const EventSubscriptionsListRegionalBySubscriptionForTopicTypeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    location: Schema.String.pipe(T.PathParam()),
    topicTypeName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.EventGrid/locations/{location}/topicTypes/{topicTypeName}/eventSubscriptions",
    }),
  );
export type EventSubscriptionsListRegionalBySubscriptionForTopicTypeInput =
  typeof EventSubscriptionsListRegionalBySubscriptionForTopicTypeInput.Type;

// Output Schema
export const EventSubscriptionsListRegionalBySubscriptionForTopicTypeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type EventSubscriptionsListRegionalBySubscriptionForTopicTypeOutput =
  typeof EventSubscriptionsListRegionalBySubscriptionForTopicTypeOutput.Type;

// The operation
/**
 * List all regional event subscriptions under an Azure subscription for a topic type.
 *
 * List all event subscriptions from the given location under a specific Azure subscription and topic type.
 *
 * @param location - Name of the location.
 * @param topicTypeName - Name of the topic type.
 */
export const EventSubscriptionsListRegionalBySubscriptionForTopicType =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: EventSubscriptionsListRegionalBySubscriptionForTopicTypeInput,
    outputSchema:
      EventSubscriptionsListRegionalBySubscriptionForTopicTypeOutput,
  }));
// Input Schema
export const EventSubscriptionsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scope: Schema.String.pipe(T.PathParam()),
    eventSubscriptionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/{scope}/providers/Microsoft.EventGrid/eventSubscriptions/{eventSubscriptionName}",
    }),
  );
export type EventSubscriptionsUpdateInput =
  typeof EventSubscriptionsUpdateInput.Type;

// Output Schema
export const EventSubscriptionsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type EventSubscriptionsUpdateOutput =
  typeof EventSubscriptionsUpdateOutput.Type;

// The operation
/**
 * Update an event subscription.
 *
 * Asynchronously updates an existing event subscription.
 *
 * @param scope - The scope of existing event subscription. The scope can be a subscription, or a resource group, or a top level resource belonging to a resource provider namespace, or an EventGrid topic. For example, use '/subscriptions/{subscriptionId}/' for a subscription, '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}' for a resource group, and '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}' for a resource, and '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/topics/{topicName}' for an EventGrid topic.
 * @param eventSubscriptionName - Name of the event subscription to be updated.
 */
export const EventSubscriptionsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: EventSubscriptionsUpdateInput,
    outputSchema: EventSubscriptionsUpdateOutput,
  }),
);
// Input Schema
export const ExtensionTopicsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scope: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/{scope}/providers/Microsoft.EventGrid/extensionTopics/default",
    }),
  );
export type ExtensionTopicsGetInput = typeof ExtensionTopicsGetInput.Type;

// Output Schema
export const ExtensionTopicsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type ExtensionTopicsGetOutput = typeof ExtensionTopicsGetOutput.Type;

// The operation
/**
 * Get properties of an extension topic.
 *
 * Get the properties of an extension topic.
 *
 * @param scope - The identifier of the resource to which extension topic is queried. The scope can be a subscription, or a resource group, or a top level resource belonging to a resource provider namespace. For example, use '/subscriptions/{subscriptionId}/' for a subscription, '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}' for a resource group, and '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}' for Azure resource.
 */
export const ExtensionTopicsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ExtensionTopicsGetInput,
  outputSchema: ExtensionTopicsGetOutput,
}));
// Input Schema
export const NamespacesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}",
    }),
  );
export type NamespacesCreateOrUpdateInput =
  typeof NamespacesCreateOrUpdateInput.Type;

// Output Schema
export const NamespacesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    location: Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type NamespacesCreateOrUpdateOutput =
  typeof NamespacesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a namespace.
 *
 * Asynchronously creates or updates a new namespace with the specified parameters.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param namespaceName - Name of the namespace.
 */
export const NamespacesCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: NamespacesCreateOrUpdateInput,
    outputSchema: NamespacesCreateOrUpdateOutput,
  }),
);
// Input Schema
export const NamespacesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  namespaceName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}",
  }),
);
export type NamespacesDeleteInput = typeof NamespacesDeleteInput.Type;

// Output Schema
export const NamespacesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type NamespacesDeleteOutput = typeof NamespacesDeleteOutput.Type;

// The operation
/**
 * Delete a namespace.
 *
 * Delete existing namespace.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param namespaceName - Name of the namespace.
 */
export const NamespacesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: NamespacesDeleteInput,
  outputSchema: NamespacesDeleteOutput,
}));
// Input Schema
export const NamespacesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  namespaceName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}",
  }),
);
export type NamespacesGetInput = typeof NamespacesGetInput.Type;

// Output Schema
export const NamespacesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  location: Schema.String,
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
});
export type NamespacesGetOutput = typeof NamespacesGetOutput.Type;

// The operation
/**
 * Get a namespace.
 *
 * Get properties of a namespace.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param namespaceName - Name of the namespace.
 */
export const NamespacesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: NamespacesGetInput,
  outputSchema: NamespacesGetOutput,
}));
// Input Schema
export const NamespacesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces",
    }),
  );
export type NamespacesListByResourceGroupInput =
  typeof NamespacesListByResourceGroupInput.Type;

// Output Schema
export const NamespacesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          location: Schema.String,
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type NamespacesListByResourceGroupOutput =
  typeof NamespacesListByResourceGroupOutput.Type;

// The operation
/**
 * List namespaces under a resource group.
 *
 * List all the namespaces under a resource group.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 */
export const NamespacesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NamespacesListByResourceGroupInput,
    outputSchema: NamespacesListByResourceGroupOutput,
  }));
// Input Schema
export const NamespacesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.EventGrid/namespaces",
    }),
  );
export type NamespacesListBySubscriptionInput =
  typeof NamespacesListBySubscriptionInput.Type;

// Output Schema
export const NamespacesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          location: Schema.String,
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type NamespacesListBySubscriptionOutput =
  typeof NamespacesListBySubscriptionOutput.Type;

// The operation
/**
 * List namespaces under an Azure subscription.
 *
 * List all the namespaces under an Azure subscription.
 */
export const NamespacesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NamespacesListBySubscriptionInput,
    outputSchema: NamespacesListBySubscriptionOutput,
  }));
// Input Schema
export const NamespacesListSharedAccessKeysInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}/listKeys",
    }),
  );
export type NamespacesListSharedAccessKeysInput =
  typeof NamespacesListSharedAccessKeysInput.Type;

// Output Schema
export const NamespacesListSharedAccessKeysOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    key1: Schema.optional(Schema.String),
    key2: Schema.optional(Schema.String),
  });
export type NamespacesListSharedAccessKeysOutput =
  typeof NamespacesListSharedAccessKeysOutput.Type;

// The operation
/**
 * List keys for a namespace.
 *
 * List the two keys used to publish to a namespace.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param namespaceName - Name of the namespace.
 */
export const NamespacesListSharedAccessKeys =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NamespacesListSharedAccessKeysInput,
    outputSchema: NamespacesListSharedAccessKeysOutput,
  }));
// Input Schema
export const NamespacesRegenerateKeyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}/regenerateKey",
    }),
  );
export type NamespacesRegenerateKeyInput =
  typeof NamespacesRegenerateKeyInput.Type;

// Output Schema
export const NamespacesRegenerateKeyOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    key1: Schema.optional(Schema.String),
    key2: Schema.optional(Schema.String),
  });
export type NamespacesRegenerateKeyOutput =
  typeof NamespacesRegenerateKeyOutput.Type;

// The operation
/**
 * Regenerate key for a namespace.
 *
 * Regenerate a shared access key for a namespace.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param namespaceName - Name of the Namespace.
 */
export const NamespacesRegenerateKey = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: NamespacesRegenerateKeyInput,
    outputSchema: NamespacesRegenerateKeyOutput,
  }),
);
// Input Schema
export const NamespacesUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  namespaceName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}",
  }),
);
export type NamespacesUpdateInput = typeof NamespacesUpdateInput.Type;

// Output Schema
export const NamespacesUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    location: Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  },
);
export type NamespacesUpdateOutput = typeof NamespacesUpdateOutput.Type;

// The operation
/**
 * Update a namespace.
 *
 * Asynchronously updates a namespace with the specified parameters.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param namespaceName - Name of the namespace.
 */
export const NamespacesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: NamespacesUpdateInput,
  outputSchema: NamespacesUpdateOutput,
}));
// Input Schema
export const NamespacesValidateCustomDomainOwnershipInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}/validateCustomDomainOwnership",
    }),
  );
export type NamespacesValidateCustomDomainOwnershipInput =
  typeof NamespacesValidateCustomDomainOwnershipInput.Type;

// Output Schema
export const NamespacesValidateCustomDomainOwnershipOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    customDomainsForTopicsConfiguration: Schema.optional(
      Schema.Array(
        Schema.Struct({
          fullyQualifiedDomainName: Schema.String,
          validationState: Schema.optional(
            Schema.Literals([
              "Pending",
              "Approved",
              "ErrorRetrievingDnsRecord",
            ]),
          ),
          identity: Schema.optional(
            Schema.Struct({
              type: Schema.optional(
                Schema.Literals(["SystemAssigned", "UserAssigned"]),
              ),
              userAssignedIdentity: Schema.optional(Schema.String),
            }),
          ),
          certificateUrl: Schema.optional(Schema.String),
          expectedTxtRecordName: Schema.optional(Schema.String),
          expectedTxtRecordValue: Schema.optional(Schema.String),
        }),
      ),
    ),
    customDomainsForTopicSpacesConfiguration: Schema.optional(
      Schema.Array(
        Schema.Struct({
          fullyQualifiedDomainName: Schema.String,
          validationState: Schema.optional(
            Schema.Literals([
              "Pending",
              "Approved",
              "ErrorRetrievingDnsRecord",
            ]),
          ),
          identity: Schema.optional(
            Schema.Struct({
              type: Schema.optional(
                Schema.Literals(["SystemAssigned", "UserAssigned"]),
              ),
              userAssignedIdentity: Schema.optional(Schema.String),
            }),
          ),
          certificateUrl: Schema.optional(Schema.String),
          expectedTxtRecordName: Schema.optional(Schema.String),
          expectedTxtRecordValue: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type NamespacesValidateCustomDomainOwnershipOutput =
  typeof NamespacesValidateCustomDomainOwnershipOutput.Type;

// The operation
/**
 * Validate ownership for all custom domains in a namespace.
 *
 * Performs ownership validation via checking TXT records for all custom domains in a namespace.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param namespaceName - Name of the Namespace.
 */
export const NamespacesValidateCustomDomainOwnership =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NamespacesValidateCustomDomainOwnershipInput,
    outputSchema: NamespacesValidateCustomDomainOwnershipOutput,
  }));
// Input Schema
export const NamespaceTopicEventSubscriptionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    topicName: Schema.String.pipe(T.PathParam()),
    eventSubscriptionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}/topics/{topicName}/eventSubscriptions/{eventSubscriptionName}",
    }),
  );
export type NamespaceTopicEventSubscriptionsCreateOrUpdateInput =
  typeof NamespaceTopicEventSubscriptionsCreateOrUpdateInput.Type;

// Output Schema
export const NamespaceTopicEventSubscriptionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type NamespaceTopicEventSubscriptionsCreateOrUpdateOutput =
  typeof NamespaceTopicEventSubscriptionsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update an event subscription of a namespace topic.
 *
 * Asynchronously creates or updates an event subscription of a namespace topic with the specified parameters. Existing event subscriptions will be updated with this API.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param namespaceName - Name of the namespace.
 * @param topicName - Name of the namespace topic.
 * @param eventSubscriptionName - Name of the event subscription to be created. Event subscription names must be between 3 and 50 characters in length and use alphanumeric letters only.
 */
export const NamespaceTopicEventSubscriptionsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NamespaceTopicEventSubscriptionsCreateOrUpdateInput,
    outputSchema: NamespaceTopicEventSubscriptionsCreateOrUpdateOutput,
  }));
// Input Schema
export const NamespaceTopicEventSubscriptionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    topicName: Schema.String.pipe(T.PathParam()),
    eventSubscriptionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}/topics/{topicName}/eventSubscriptions/{eventSubscriptionName}",
    }),
  );
export type NamespaceTopicEventSubscriptionsDeleteInput =
  typeof NamespaceTopicEventSubscriptionsDeleteInput.Type;

// Output Schema
export const NamespaceTopicEventSubscriptionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type NamespaceTopicEventSubscriptionsDeleteOutput =
  typeof NamespaceTopicEventSubscriptionsDeleteOutput.Type;

// The operation
/**
 * Delete an event subscription of a namespace topic.
 *
 * Delete an existing event subscription of a namespace topic.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param namespaceName - Name of the namespace.
 * @param topicName - Name of the namespace topic.
 * @param eventSubscriptionName - Name of the event subscription to be deleted.
 */
export const NamespaceTopicEventSubscriptionsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NamespaceTopicEventSubscriptionsDeleteInput,
    outputSchema: NamespaceTopicEventSubscriptionsDeleteOutput,
  }));
// Input Schema
export const NamespaceTopicEventSubscriptionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    topicName: Schema.String.pipe(T.PathParam()),
    eventSubscriptionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}/topics/{topicName}/eventSubscriptions/{eventSubscriptionName}",
    }),
  );
export type NamespaceTopicEventSubscriptionsGetInput =
  typeof NamespaceTopicEventSubscriptionsGetInput.Type;

// Output Schema
export const NamespaceTopicEventSubscriptionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type NamespaceTopicEventSubscriptionsGetOutput =
  typeof NamespaceTopicEventSubscriptionsGetOutput.Type;

// The operation
/**
 * Get an event subscription of a namespace topic.
 *
 * Get properties of an event subscription of a namespace topic.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param namespaceName - Name of the namespace.
 * @param topicName - Name of the namespace topic.
 * @param eventSubscriptionName - Name of the event subscription to be found.
 */
export const NamespaceTopicEventSubscriptionsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NamespaceTopicEventSubscriptionsGetInput,
    outputSchema: NamespaceTopicEventSubscriptionsGetOutput,
  }));
// Input Schema
export const NamespaceTopicEventSubscriptionsGetDeliveryAttributesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    topicName: Schema.String.pipe(T.PathParam()),
    eventSubscriptionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}/topics/{topicName}/eventSubscriptions/{eventSubscriptionName}/getDeliveryAttributes",
    }),
  );
export type NamespaceTopicEventSubscriptionsGetDeliveryAttributesInput =
  typeof NamespaceTopicEventSubscriptionsGetDeliveryAttributesInput.Type;

// Output Schema
export const NamespaceTopicEventSubscriptionsGetDeliveryAttributesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          name: Schema.optional(Schema.String),
          type: Schema.Literals(["Static", "Dynamic"]),
        }),
      ),
    ),
  });
export type NamespaceTopicEventSubscriptionsGetDeliveryAttributesOutput =
  typeof NamespaceTopicEventSubscriptionsGetDeliveryAttributesOutput.Type;

// The operation
/**
 * Get delivery attributes for an event subscription of a namespace topic.
 *
 * Get all delivery attributes for an event subscription of a namespace topic.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param namespaceName - Name of the namespace.
 * @param topicName - Name of the namespace topic.
 * @param eventSubscriptionName - Name of the event subscription.
 */
export const NamespaceTopicEventSubscriptionsGetDeliveryAttributes =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NamespaceTopicEventSubscriptionsGetDeliveryAttributesInput,
    outputSchema: NamespaceTopicEventSubscriptionsGetDeliveryAttributesOutput,
  }));
// Input Schema
export const NamespaceTopicEventSubscriptionsGetFullUrlInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    topicName: Schema.String.pipe(T.PathParam()),
    eventSubscriptionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}/topics/{topicName}/eventSubscriptions/{eventSubscriptionName}/getFullUrl",
    }),
  );
export type NamespaceTopicEventSubscriptionsGetFullUrlInput =
  typeof NamespaceTopicEventSubscriptionsGetFullUrlInput.Type;

// Output Schema
export const NamespaceTopicEventSubscriptionsGetFullUrlOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    endpointUrl: Schema.optional(Schema.String),
  });
export type NamespaceTopicEventSubscriptionsGetFullUrlOutput =
  typeof NamespaceTopicEventSubscriptionsGetFullUrlOutput.Type;

// The operation
/**
 * Get full URL of an event subscription of a namespace topic.
 *
 * Get the full endpoint URL for an event subscription of a namespace topic.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param namespaceName - Name of the namespace.
 * @param topicName - Name of the namespace topic.
 * @param eventSubscriptionName - Name of the event subscription.
 */
export const NamespaceTopicEventSubscriptionsGetFullUrl =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NamespaceTopicEventSubscriptionsGetFullUrlInput,
    outputSchema: NamespaceTopicEventSubscriptionsGetFullUrlOutput,
  }));
// Input Schema
export const NamespaceTopicEventSubscriptionsListByNamespaceTopicInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    topicName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}/topics/{topicName}/eventSubscriptions",
    }),
  );
export type NamespaceTopicEventSubscriptionsListByNamespaceTopicInput =
  typeof NamespaceTopicEventSubscriptionsListByNamespaceTopicInput.Type;

// Output Schema
export const NamespaceTopicEventSubscriptionsListByNamespaceTopicOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type NamespaceTopicEventSubscriptionsListByNamespaceTopicOutput =
  typeof NamespaceTopicEventSubscriptionsListByNamespaceTopicOutput.Type;

// The operation
/**
 * List event subscriptions of a namespace topic.
 *
 * List event subscriptions that belong to a specific namespace topic.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param namespaceName - Name of the namespace.
 * @param topicName - Name of the namespace topic.
 */
export const NamespaceTopicEventSubscriptionsListByNamespaceTopic =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NamespaceTopicEventSubscriptionsListByNamespaceTopicInput,
    outputSchema: NamespaceTopicEventSubscriptionsListByNamespaceTopicOutput,
  }));
// Input Schema
export const NamespaceTopicEventSubscriptionsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    topicName: Schema.String.pipe(T.PathParam()),
    eventSubscriptionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}/topics/{topicName}/eventSubscriptions/{eventSubscriptionName}",
    }),
  );
export type NamespaceTopicEventSubscriptionsUpdateInput =
  typeof NamespaceTopicEventSubscriptionsUpdateInput.Type;

// Output Schema
export const NamespaceTopicEventSubscriptionsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type NamespaceTopicEventSubscriptionsUpdateOutput =
  typeof NamespaceTopicEventSubscriptionsUpdateOutput.Type;

// The operation
/**
 * Update event subscription of a namespace topic.
 *
 * Update an existing event subscription of a namespace topic.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param namespaceName - Name of the namespace.
 * @param topicName - Name of the namespace topic.
 * @param eventSubscriptionName - Name of the event subscription to be updated.
 */
export const NamespaceTopicEventSubscriptionsUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NamespaceTopicEventSubscriptionsUpdateInput,
    outputSchema: NamespaceTopicEventSubscriptionsUpdateOutput,
  }));
// Input Schema
export const NamespaceTopicsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    topicName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}/topics/{topicName}",
    }),
  );
export type NamespaceTopicsCreateOrUpdateInput =
  typeof NamespaceTopicsCreateOrUpdateInput.Type;

// Output Schema
export const NamespaceTopicsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type NamespaceTopicsCreateOrUpdateOutput =
  typeof NamespaceTopicsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a namespace topic.
 *
 * Asynchronously creates a new namespace topic with the specified parameters.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param namespaceName - Name of the namespace.
 * @param topicName - Name of the namespace topic.
 */
export const NamespaceTopicsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NamespaceTopicsCreateOrUpdateInput,
    outputSchema: NamespaceTopicsCreateOrUpdateOutput,
  }));
// Input Schema
export const NamespaceTopicsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    topicName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}/topics/{topicName}",
    }),
  );
export type NamespaceTopicsDeleteInput = typeof NamespaceTopicsDeleteInput.Type;

// Output Schema
export const NamespaceTopicsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type NamespaceTopicsDeleteOutput =
  typeof NamespaceTopicsDeleteOutput.Type;

// The operation
/**
 * Delete a namespace topic.
 *
 * Delete existing namespace topic.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param namespaceName - Name of the namespace.
 * @param topicName - Name of the topic.
 */
export const NamespaceTopicsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: NamespaceTopicsDeleteInput,
    outputSchema: NamespaceTopicsDeleteOutput,
  }),
);
// Input Schema
export const NamespaceTopicsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    topicName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}/topics/{topicName}",
    }),
  );
export type NamespaceTopicsGetInput = typeof NamespaceTopicsGetInput.Type;

// Output Schema
export const NamespaceTopicsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type NamespaceTopicsGetOutput = typeof NamespaceTopicsGetOutput.Type;

// The operation
/**
 * Get a namespace topic.
 *
 * Get properties of a namespace topic.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param namespaceName - Name of the namespace.
 * @param topicName - Name of the namespace topic.
 */
export const NamespaceTopicsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: NamespaceTopicsGetInput,
  outputSchema: NamespaceTopicsGetOutput,
}));
// Input Schema
export const NamespaceTopicsListByNamespaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}/topics",
    }),
  );
export type NamespaceTopicsListByNamespaceInput =
  typeof NamespaceTopicsListByNamespaceInput.Type;

// Output Schema
export const NamespaceTopicsListByNamespaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type NamespaceTopicsListByNamespaceOutput =
  typeof NamespaceTopicsListByNamespaceOutput.Type;

// The operation
/**
 * List namespace topics under a namespace.
 *
 * List all the namespace topics under a namespace.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param namespaceName - Name of the namespace.
 */
export const NamespaceTopicsListByNamespace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NamespaceTopicsListByNamespaceInput,
    outputSchema: NamespaceTopicsListByNamespaceOutput,
  }));
// Input Schema
export const NamespaceTopicsListSharedAccessKeysInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    topicName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}/topics/{topicName}/listKeys",
    }),
  );
export type NamespaceTopicsListSharedAccessKeysInput =
  typeof NamespaceTopicsListSharedAccessKeysInput.Type;

// Output Schema
export const NamespaceTopicsListSharedAccessKeysOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    key1: Schema.optional(Schema.String),
    key2: Schema.optional(Schema.String),
  });
export type NamespaceTopicsListSharedAccessKeysOutput =
  typeof NamespaceTopicsListSharedAccessKeysOutput.Type;

// The operation
/**
 * List keys for a namespace topic.
 *
 * List the two keys used to publish to a namespace topic.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param namespaceName - Name of the namespace.
 * @param topicName - Name of the topic.
 */
export const NamespaceTopicsListSharedAccessKeys =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NamespaceTopicsListSharedAccessKeysInput,
    outputSchema: NamespaceTopicsListSharedAccessKeysOutput,
  }));
// Input Schema
export const NamespaceTopicsRegenerateKeyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    topicName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}/topics/{topicName}/regenerateKey",
    }),
  );
export type NamespaceTopicsRegenerateKeyInput =
  typeof NamespaceTopicsRegenerateKeyInput.Type;

// Output Schema
export const NamespaceTopicsRegenerateKeyOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    key1: Schema.optional(Schema.String),
    key2: Schema.optional(Schema.String),
  });
export type NamespaceTopicsRegenerateKeyOutput =
  typeof NamespaceTopicsRegenerateKeyOutput.Type;

// The operation
/**
 * Regenerate key for a namespace topic.
 *
 * Regenerate a shared access key for a namespace topic.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param namespaceName - Name of the namespace.
 * @param topicName - Name of the topic.
 */
export const NamespaceTopicsRegenerateKey =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NamespaceTopicsRegenerateKeyInput,
    outputSchema: NamespaceTopicsRegenerateKeyOutput,
  }));
// Input Schema
export const NamespaceTopicsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    topicName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}/topics/{topicName}",
    }),
  );
export type NamespaceTopicsUpdateInput = typeof NamespaceTopicsUpdateInput.Type;

// Output Schema
export const NamespaceTopicsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type NamespaceTopicsUpdateOutput =
  typeof NamespaceTopicsUpdateOutput.Type;

// The operation
/**
 * Update a namespace topic.
 *
 * Asynchronously updates a namespace topic with the specified parameters.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param namespaceName - Name of the namespace.
 * @param topicName - Name of the namespace topic.
 */
export const NamespaceTopicsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: NamespaceTopicsUpdateInput,
    outputSchema: NamespaceTopicsUpdateOutput,
  }),
);
// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({ method: "GET", path: "/providers/Microsoft.EventGrid/operations" }),
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
        isDataAction: Schema.optional(Schema.Boolean),
        properties: Schema.optional(Schema.Unknown),
      }),
    ),
  ),
});
export type OperationsListOutput = typeof OperationsListOutput.Type;

// The operation
/**
 * List available operations.
 *
 * List the available operations supported by the Microsoft.EventGrid resource provider.
 */
export const OperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationsListInput,
  outputSchema: OperationsListOutput,
}));
// Input Schema
export const PartnerConfigurationsAuthorizePartnerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerConfigurations/default/authorizePartner",
    }),
  );
export type PartnerConfigurationsAuthorizePartnerInput =
  typeof PartnerConfigurationsAuthorizePartnerInput.Type;

// Output Schema
export const PartnerConfigurationsAuthorizePartnerOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type PartnerConfigurationsAuthorizePartnerOutput =
  typeof PartnerConfigurationsAuthorizePartnerOutput.Type;

// The operation
/**
 * Authorize a partner.
 *
 * Authorize a single partner either by partner registration immutable Id or by partner name.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 */
export const PartnerConfigurationsAuthorizePartner =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PartnerConfigurationsAuthorizePartnerInput,
    outputSchema: PartnerConfigurationsAuthorizePartnerOutput,
  }));
// Input Schema
export const PartnerConfigurationsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerConfigurations/default",
    }),
  );
export type PartnerConfigurationsCreateOrUpdateInput =
  typeof PartnerConfigurationsCreateOrUpdateInput.Type;

// Output Schema
export const PartnerConfigurationsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type PartnerConfigurationsCreateOrUpdateOutput =
  typeof PartnerConfigurationsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a partner configuration.
 *
 * Synchronously creates or updates a partner configuration with the specified parameters.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 */
export const PartnerConfigurationsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PartnerConfigurationsCreateOrUpdateInput,
    outputSchema: PartnerConfigurationsCreateOrUpdateOutput,
  }));
// Input Schema
export const PartnerConfigurationsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerConfigurations/default",
    }),
  );
export type PartnerConfigurationsDeleteInput =
  typeof PartnerConfigurationsDeleteInput.Type;

// Output Schema
export const PartnerConfigurationsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PartnerConfigurationsDeleteOutput =
  typeof PartnerConfigurationsDeleteOutput.Type;

// The operation
/**
 * Delete a partner configuration.
 *
 * Delete existing partner configuration.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 */
export const PartnerConfigurationsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PartnerConfigurationsDeleteInput,
    outputSchema: PartnerConfigurationsDeleteOutput,
  }),
);
// Input Schema
export const PartnerConfigurationsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerConfigurations/default",
    }),
  );
export type PartnerConfigurationsGetInput =
  typeof PartnerConfigurationsGetInput.Type;

// Output Schema
export const PartnerConfigurationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type PartnerConfigurationsGetOutput =
  typeof PartnerConfigurationsGetOutput.Type;

// The operation
/**
 * Get a partner configuration.
 *
 * Get properties of a partner configuration.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 */
export const PartnerConfigurationsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PartnerConfigurationsGetInput,
    outputSchema: PartnerConfigurationsGetOutput,
  }),
);
// Input Schema
export const PartnerConfigurationsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerConfigurations",
    }),
  );
export type PartnerConfigurationsListByResourceGroupInput =
  typeof PartnerConfigurationsListByResourceGroupInput.Type;

// Output Schema
export const PartnerConfigurationsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type PartnerConfigurationsListByResourceGroupOutput =
  typeof PartnerConfigurationsListByResourceGroupOutput.Type;

// The operation
/**
 * List partner configurations under a resource group.
 *
 * List all the partner configurations under a resource group.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 */
export const PartnerConfigurationsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PartnerConfigurationsListByResourceGroupInput,
    outputSchema: PartnerConfigurationsListByResourceGroupOutput,
  }));
// Input Schema
export const PartnerConfigurationsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.EventGrid/partnerConfigurations",
    }),
  );
export type PartnerConfigurationsListBySubscriptionInput =
  typeof PartnerConfigurationsListBySubscriptionInput.Type;

// Output Schema
export const PartnerConfigurationsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type PartnerConfigurationsListBySubscriptionOutput =
  typeof PartnerConfigurationsListBySubscriptionOutput.Type;

// The operation
/**
 * List partner configurations under an Azure subscription.
 *
 * List all the partner configurations under an Azure subscription.
 */
export const PartnerConfigurationsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PartnerConfigurationsListBySubscriptionInput,
    outputSchema: PartnerConfigurationsListBySubscriptionOutput,
  }));
// Input Schema
export const PartnerConfigurationsUnauthorizePartnerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerConfigurations/default/unauthorizePartner",
    }),
  );
export type PartnerConfigurationsUnauthorizePartnerInput =
  typeof PartnerConfigurationsUnauthorizePartnerInput.Type;

// Output Schema
export const PartnerConfigurationsUnauthorizePartnerOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type PartnerConfigurationsUnauthorizePartnerOutput =
  typeof PartnerConfigurationsUnauthorizePartnerOutput.Type;

// The operation
/**
 * Unauthorize a partner.
 *
 * Unauthorize a single partner either by partner registration immutable Id or by partner name.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 */
export const PartnerConfigurationsUnauthorizePartner =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PartnerConfigurationsUnauthorizePartnerInput,
    outputSchema: PartnerConfigurationsUnauthorizePartnerOutput,
  }));
// Input Schema
export const PartnerConfigurationsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerConfigurations/default",
    }),
  );
export type PartnerConfigurationsUpdateInput =
  typeof PartnerConfigurationsUpdateInput.Type;

// Output Schema
export const PartnerConfigurationsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type PartnerConfigurationsUpdateOutput =
  typeof PartnerConfigurationsUpdateOutput.Type;

// The operation
/**
 * Update a partner configuration.
 *
 * Synchronously updates a partner configuration with the specified parameters.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 */
export const PartnerConfigurationsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PartnerConfigurationsUpdateInput,
    outputSchema: PartnerConfigurationsUpdateOutput,
  }),
);
// Input Schema
export const PartnerNamespacesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    partnerNamespaceName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerNamespaces/{partnerNamespaceName}",
    }),
  );
export type PartnerNamespacesCreateOrUpdateInput =
  typeof PartnerNamespacesCreateOrUpdateInput.Type;

// Output Schema
export const PartnerNamespacesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    location: Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type PartnerNamespacesCreateOrUpdateOutput =
  typeof PartnerNamespacesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a partner namespace.
 *
 * Asynchronously creates a new partner namespace with the specified parameters.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param partnerNamespaceName - Name of the partner namespace.
 */
export const PartnerNamespacesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PartnerNamespacesCreateOrUpdateInput,
    outputSchema: PartnerNamespacesCreateOrUpdateOutput,
  }));
// Input Schema
export const PartnerNamespacesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    partnerNamespaceName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerNamespaces/{partnerNamespaceName}",
    }),
  );
export type PartnerNamespacesDeleteInput =
  typeof PartnerNamespacesDeleteInput.Type;

// Output Schema
export const PartnerNamespacesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PartnerNamespacesDeleteOutput =
  typeof PartnerNamespacesDeleteOutput.Type;

// The operation
/**
 * Delete a partner namespace.
 *
 * Delete existing partner namespace.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param partnerNamespaceName - Name of the partner namespace.
 */
export const PartnerNamespacesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PartnerNamespacesDeleteInput,
    outputSchema: PartnerNamespacesDeleteOutput,
  }),
);
// Input Schema
export const PartnerNamespacesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    partnerNamespaceName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerNamespaces/{partnerNamespaceName}",
    }),
  );
export type PartnerNamespacesGetInput = typeof PartnerNamespacesGetInput.Type;

// Output Schema
export const PartnerNamespacesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    location: Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type PartnerNamespacesGetOutput = typeof PartnerNamespacesGetOutput.Type;

// The operation
/**
 * Get a partner namespace.
 *
 * Get properties of a partner namespace.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param partnerNamespaceName - Name of the partner namespace.
 */
export const PartnerNamespacesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PartnerNamespacesGetInput,
    outputSchema: PartnerNamespacesGetOutput,
  }),
);
// Input Schema
export const PartnerNamespacesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerNamespaces",
    }),
  );
export type PartnerNamespacesListByResourceGroupInput =
  typeof PartnerNamespacesListByResourceGroupInput.Type;

// Output Schema
export const PartnerNamespacesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          location: Schema.String,
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type PartnerNamespacesListByResourceGroupOutput =
  typeof PartnerNamespacesListByResourceGroupOutput.Type;

// The operation
/**
 * List partner namespaces under a resource group.
 *
 * List all the partner namespaces under a resource group.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 */
export const PartnerNamespacesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PartnerNamespacesListByResourceGroupInput,
    outputSchema: PartnerNamespacesListByResourceGroupOutput,
  }));
// Input Schema
export const PartnerNamespacesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.EventGrid/partnerNamespaces",
    }),
  );
export type PartnerNamespacesListBySubscriptionInput =
  typeof PartnerNamespacesListBySubscriptionInput.Type;

// Output Schema
export const PartnerNamespacesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          location: Schema.String,
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type PartnerNamespacesListBySubscriptionOutput =
  typeof PartnerNamespacesListBySubscriptionOutput.Type;

// The operation
/**
 * List partner namespaces under an Azure subscription.
 *
 * List all the partner namespaces under an Azure subscription.
 */
export const PartnerNamespacesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PartnerNamespacesListBySubscriptionInput,
    outputSchema: PartnerNamespacesListBySubscriptionOutput,
  }));
// Input Schema
export const PartnerNamespacesListSharedAccessKeysInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    partnerNamespaceName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerNamespaces/{partnerNamespaceName}/listKeys",
    }),
  );
export type PartnerNamespacesListSharedAccessKeysInput =
  typeof PartnerNamespacesListSharedAccessKeysInput.Type;

// Output Schema
export const PartnerNamespacesListSharedAccessKeysOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    key1: Schema.optional(Schema.String),
    key2: Schema.optional(Schema.String),
  });
export type PartnerNamespacesListSharedAccessKeysOutput =
  typeof PartnerNamespacesListSharedAccessKeysOutput.Type;

// The operation
/**
 * List keys for a partner namespace.
 *
 * List the two keys used to publish to a partner namespace.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param partnerNamespaceName - Name of the partner namespace.
 */
export const PartnerNamespacesListSharedAccessKeys =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PartnerNamespacesListSharedAccessKeysInput,
    outputSchema: PartnerNamespacesListSharedAccessKeysOutput,
  }));
// Input Schema
export const PartnerNamespacesRegenerateKeyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    partnerNamespaceName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerNamespaces/{partnerNamespaceName}/regenerateKey",
    }),
  );
export type PartnerNamespacesRegenerateKeyInput =
  typeof PartnerNamespacesRegenerateKeyInput.Type;

// Output Schema
export const PartnerNamespacesRegenerateKeyOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    key1: Schema.optional(Schema.String),
    key2: Schema.optional(Schema.String),
  });
export type PartnerNamespacesRegenerateKeyOutput =
  typeof PartnerNamespacesRegenerateKeyOutput.Type;

// The operation
/**
 * Regenerate key for a partner namespace.
 *
 * Regenerate a shared access key for a partner namespace.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param partnerNamespaceName - Name of the partner namespace.
 */
export const PartnerNamespacesRegenerateKey =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PartnerNamespacesRegenerateKeyInput,
    outputSchema: PartnerNamespacesRegenerateKeyOutput,
  }));
// Input Schema
export const PartnerNamespacesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    partnerNamespaceName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerNamespaces/{partnerNamespaceName}",
    }),
  );
export type PartnerNamespacesUpdateInput =
  typeof PartnerNamespacesUpdateInput.Type;

// Output Schema
export const PartnerNamespacesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PartnerNamespacesUpdateOutput =
  typeof PartnerNamespacesUpdateOutput.Type;

// The operation
/**
 * Update a partner namespace.
 *
 * Asynchronously updates a partner namespace with the specified parameters.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param partnerNamespaceName - Name of the partner namespace.
 */
export const PartnerNamespacesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PartnerNamespacesUpdateInput,
    outputSchema: PartnerNamespacesUpdateOutput,
  }),
);
// Input Schema
export const PartnerRegistrationsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    partnerRegistrationName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerRegistrations/{partnerRegistrationName}",
    }),
  );
export type PartnerRegistrationsCreateOrUpdateInput =
  typeof PartnerRegistrationsCreateOrUpdateInput.Type;

// Output Schema
export const PartnerRegistrationsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    location: Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type PartnerRegistrationsCreateOrUpdateOutput =
  typeof PartnerRegistrationsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a partner registration.
 *
 * Creates a new partner registration with the specified parameters.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param partnerRegistrationName - Name of the partner registration.
 */
export const PartnerRegistrationsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PartnerRegistrationsCreateOrUpdateInput,
    outputSchema: PartnerRegistrationsCreateOrUpdateOutput,
  }));
// Input Schema
export const PartnerRegistrationsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    partnerRegistrationName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerRegistrations/{partnerRegistrationName}",
    }),
  );
export type PartnerRegistrationsDeleteInput =
  typeof PartnerRegistrationsDeleteInput.Type;

// Output Schema
export const PartnerRegistrationsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PartnerRegistrationsDeleteOutput =
  typeof PartnerRegistrationsDeleteOutput.Type;

// The operation
/**
 * Delete a partner registration.
 *
 * Deletes a partner registration with the specified parameters.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param partnerRegistrationName - Name of the partner registration.
 */
export const PartnerRegistrationsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PartnerRegistrationsDeleteInput,
    outputSchema: PartnerRegistrationsDeleteOutput,
  }),
);
// Input Schema
export const PartnerRegistrationsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    partnerRegistrationName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerRegistrations/{partnerRegistrationName}",
    }),
  );
export type PartnerRegistrationsGetInput =
  typeof PartnerRegistrationsGetInput.Type;

// Output Schema
export const PartnerRegistrationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    location: Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type PartnerRegistrationsGetOutput =
  typeof PartnerRegistrationsGetOutput.Type;

// The operation
/**
 * Get a partner registration.
 *
 * Gets a partner registration with the specified parameters.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param partnerRegistrationName - Name of the partner registration.
 */
export const PartnerRegistrationsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PartnerRegistrationsGetInput,
    outputSchema: PartnerRegistrationsGetOutput,
  }),
);
// Input Schema
export const PartnerRegistrationsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerRegistrations",
    }),
  );
export type PartnerRegistrationsListByResourceGroupInput =
  typeof PartnerRegistrationsListByResourceGroupInput.Type;

// Output Schema
export const PartnerRegistrationsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          location: Schema.String,
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type PartnerRegistrationsListByResourceGroupOutput =
  typeof PartnerRegistrationsListByResourceGroupOutput.Type;

// The operation
/**
 * List partner registrations under a resource group.
 *
 * List all the partner registrations under a resource group.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 */
export const PartnerRegistrationsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PartnerRegistrationsListByResourceGroupInput,
    outputSchema: PartnerRegistrationsListByResourceGroupOutput,
  }));
// Input Schema
export const PartnerRegistrationsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.EventGrid/partnerRegistrations",
    }),
  );
export type PartnerRegistrationsListBySubscriptionInput =
  typeof PartnerRegistrationsListBySubscriptionInput.Type;

// Output Schema
export const PartnerRegistrationsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          location: Schema.String,
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type PartnerRegistrationsListBySubscriptionOutput =
  typeof PartnerRegistrationsListBySubscriptionOutput.Type;

// The operation
/**
 * List partner registrations under an Azure subscription.
 *
 * List all the partner registrations under an Azure subscription.
 */
export const PartnerRegistrationsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PartnerRegistrationsListBySubscriptionInput,
    outputSchema: PartnerRegistrationsListBySubscriptionOutput,
  }));
// Input Schema
export const PartnerRegistrationsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    partnerRegistrationName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerRegistrations/{partnerRegistrationName}",
    }),
  );
export type PartnerRegistrationsUpdateInput =
  typeof PartnerRegistrationsUpdateInput.Type;

// Output Schema
export const PartnerRegistrationsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PartnerRegistrationsUpdateOutput =
  typeof PartnerRegistrationsUpdateOutput.Type;

// The operation
/**
 * Update a partner registration.
 *
 * Updates a partner registration with the specified parameters.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param partnerRegistrationName - Name of the partner registration.
 */
export const PartnerRegistrationsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PartnerRegistrationsUpdateInput,
    outputSchema: PartnerRegistrationsUpdateOutput,
  }),
);
// Input Schema
export const PartnerTopicEventSubscriptionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    partnerTopicName: Schema.String.pipe(T.PathParam()),
    eventSubscriptionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerTopics/{partnerTopicName}/eventSubscriptions/{eventSubscriptionName}",
    }),
  );
export type PartnerTopicEventSubscriptionsCreateOrUpdateInput =
  typeof PartnerTopicEventSubscriptionsCreateOrUpdateInput.Type;

// Output Schema
export const PartnerTopicEventSubscriptionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type PartnerTopicEventSubscriptionsCreateOrUpdateOutput =
  typeof PartnerTopicEventSubscriptionsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update an event subscription of a partner topic.
 *
 * Asynchronously creates or updates an event subscription of a partner topic with the specified parameters. Existing event subscriptions will be updated with this API.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param partnerTopicName - Name of the partner topic.
 * @param eventSubscriptionName - Name of the event subscription to be created. Event subscription names must be between 3 and 64 characters in length and use alphanumeric letters only.
 */
export const PartnerTopicEventSubscriptionsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PartnerTopicEventSubscriptionsCreateOrUpdateInput,
    outputSchema: PartnerTopicEventSubscriptionsCreateOrUpdateOutput,
  }));
// Input Schema
export const PartnerTopicEventSubscriptionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    partnerTopicName: Schema.String.pipe(T.PathParam()),
    eventSubscriptionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerTopics/{partnerTopicName}/eventSubscriptions/{eventSubscriptionName}",
    }),
  );
export type PartnerTopicEventSubscriptionsDeleteInput =
  typeof PartnerTopicEventSubscriptionsDeleteInput.Type;

// Output Schema
export const PartnerTopicEventSubscriptionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PartnerTopicEventSubscriptionsDeleteOutput =
  typeof PartnerTopicEventSubscriptionsDeleteOutput.Type;

// The operation
/**
 * Delete an event subscription of a partner topic.
 *
 * Delete an existing event subscription of a partner topic.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param partnerTopicName - Name of the partner topic.
 * @param eventSubscriptionName - Name of the event subscription to be deleted.
 */
export const PartnerTopicEventSubscriptionsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PartnerTopicEventSubscriptionsDeleteInput,
    outputSchema: PartnerTopicEventSubscriptionsDeleteOutput,
  }));
// Input Schema
export const PartnerTopicEventSubscriptionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    partnerTopicName: Schema.String.pipe(T.PathParam()),
    eventSubscriptionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerTopics/{partnerTopicName}/eventSubscriptions/{eventSubscriptionName}",
    }),
  );
export type PartnerTopicEventSubscriptionsGetInput =
  typeof PartnerTopicEventSubscriptionsGetInput.Type;

// Output Schema
export const PartnerTopicEventSubscriptionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type PartnerTopicEventSubscriptionsGetOutput =
  typeof PartnerTopicEventSubscriptionsGetOutput.Type;

// The operation
/**
 * Get an event subscription of a partner topic.
 *
 * Get properties of an event subscription of a partner topic.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param partnerTopicName - Name of the partner topic.
 * @param eventSubscriptionName - Name of the event subscription to be found.
 */
export const PartnerTopicEventSubscriptionsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PartnerTopicEventSubscriptionsGetInput,
    outputSchema: PartnerTopicEventSubscriptionsGetOutput,
  }));
// Input Schema
export const PartnerTopicEventSubscriptionsGetDeliveryAttributesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    partnerTopicName: Schema.String.pipe(T.PathParam()),
    eventSubscriptionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerTopics/{partnerTopicName}/eventSubscriptions/{eventSubscriptionName}/getDeliveryAttributes",
    }),
  );
export type PartnerTopicEventSubscriptionsGetDeliveryAttributesInput =
  typeof PartnerTopicEventSubscriptionsGetDeliveryAttributesInput.Type;

// Output Schema
export const PartnerTopicEventSubscriptionsGetDeliveryAttributesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          name: Schema.optional(Schema.String),
          type: Schema.Literals(["Static", "Dynamic"]),
        }),
      ),
    ),
  });
export type PartnerTopicEventSubscriptionsGetDeliveryAttributesOutput =
  typeof PartnerTopicEventSubscriptionsGetDeliveryAttributesOutput.Type;

// The operation
/**
 * Get delivery attributes for an event subscription of a partner topic.
 *
 * Get all delivery attributes for an event subscription of a partner topic.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param partnerTopicName - Name of the partner topic.
 * @param eventSubscriptionName - Name of the event subscription.
 */
export const PartnerTopicEventSubscriptionsGetDeliveryAttributes =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PartnerTopicEventSubscriptionsGetDeliveryAttributesInput,
    outputSchema: PartnerTopicEventSubscriptionsGetDeliveryAttributesOutput,
  }));
// Input Schema
export const PartnerTopicEventSubscriptionsGetFullUrlInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    partnerTopicName: Schema.String.pipe(T.PathParam()),
    eventSubscriptionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerTopics/{partnerTopicName}/eventSubscriptions/{eventSubscriptionName}/getFullUrl",
    }),
  );
export type PartnerTopicEventSubscriptionsGetFullUrlInput =
  typeof PartnerTopicEventSubscriptionsGetFullUrlInput.Type;

// Output Schema
export const PartnerTopicEventSubscriptionsGetFullUrlOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    endpointUrl: Schema.optional(Schema.String),
  });
export type PartnerTopicEventSubscriptionsGetFullUrlOutput =
  typeof PartnerTopicEventSubscriptionsGetFullUrlOutput.Type;

// The operation
/**
 * Get full URL of an event subscription of a partner topic.
 *
 * Get the full endpoint URL for an event subscription of a partner topic.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param partnerTopicName - Name of the partner topic.
 * @param eventSubscriptionName - Name of the event subscription.
 */
export const PartnerTopicEventSubscriptionsGetFullUrl =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PartnerTopicEventSubscriptionsGetFullUrlInput,
    outputSchema: PartnerTopicEventSubscriptionsGetFullUrlOutput,
  }));
// Input Schema
export const PartnerTopicEventSubscriptionsListByPartnerTopicInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    partnerTopicName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerTopics/{partnerTopicName}/eventSubscriptions",
    }),
  );
export type PartnerTopicEventSubscriptionsListByPartnerTopicInput =
  typeof PartnerTopicEventSubscriptionsListByPartnerTopicInput.Type;

// Output Schema
export const PartnerTopicEventSubscriptionsListByPartnerTopicOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type PartnerTopicEventSubscriptionsListByPartnerTopicOutput =
  typeof PartnerTopicEventSubscriptionsListByPartnerTopicOutput.Type;

// The operation
/**
 * List event subscriptions of a partner topic.
 *
 * List event subscriptions that belong to a specific partner topic.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param partnerTopicName - Name of the partner topic.
 */
export const PartnerTopicEventSubscriptionsListByPartnerTopic =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PartnerTopicEventSubscriptionsListByPartnerTopicInput,
    outputSchema: PartnerTopicEventSubscriptionsListByPartnerTopicOutput,
  }));
// Input Schema
export const PartnerTopicEventSubscriptionsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    partnerTopicName: Schema.String.pipe(T.PathParam()),
    eventSubscriptionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerTopics/{partnerTopicName}/eventSubscriptions/{eventSubscriptionName}",
    }),
  );
export type PartnerTopicEventSubscriptionsUpdateInput =
  typeof PartnerTopicEventSubscriptionsUpdateInput.Type;

// Output Schema
export const PartnerTopicEventSubscriptionsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type PartnerTopicEventSubscriptionsUpdateOutput =
  typeof PartnerTopicEventSubscriptionsUpdateOutput.Type;

// The operation
/**
 * Update event subscription of a partner topic.
 *
 * Update an existing event subscription of a partner topic.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param partnerTopicName - Name of the partner topic.
 * @param eventSubscriptionName - Name of the event subscription to be updated.
 */
export const PartnerTopicEventSubscriptionsUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PartnerTopicEventSubscriptionsUpdateInput,
    outputSchema: PartnerTopicEventSubscriptionsUpdateOutput,
  }));
// Input Schema
export const PartnerTopicsActivateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    partnerTopicName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerTopics/{partnerTopicName}/activate",
    }),
  );
export type PartnerTopicsActivateInput = typeof PartnerTopicsActivateInput.Type;

// Output Schema
export const PartnerTopicsActivateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    location: Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type PartnerTopicsActivateOutput =
  typeof PartnerTopicsActivateOutput.Type;

// The operation
/**
 * Activate a partner topic.
 *
 * Activate a newly created partner topic.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param partnerTopicName - Name of the partner topic.
 */
export const PartnerTopicsActivate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PartnerTopicsActivateInput,
    outputSchema: PartnerTopicsActivateOutput,
  }),
);
// Input Schema
export const PartnerTopicsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    partnerTopicName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerTopics/{partnerTopicName}",
    }),
  );
export type PartnerTopicsCreateOrUpdateInput =
  typeof PartnerTopicsCreateOrUpdateInput.Type;

// Output Schema
export const PartnerTopicsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    location: Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type PartnerTopicsCreateOrUpdateOutput =
  typeof PartnerTopicsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a partner topic.
 *
 * Asynchronously creates a new partner topic with the specified parameters.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param partnerTopicName - Name of the partner topic.
 */
export const PartnerTopicsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PartnerTopicsCreateOrUpdateInput,
    outputSchema: PartnerTopicsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const PartnerTopicsDeactivateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    partnerTopicName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerTopics/{partnerTopicName}/deactivate",
    }),
  );
export type PartnerTopicsDeactivateInput =
  typeof PartnerTopicsDeactivateInput.Type;

// Output Schema
export const PartnerTopicsDeactivateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    location: Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type PartnerTopicsDeactivateOutput =
  typeof PartnerTopicsDeactivateOutput.Type;

// The operation
/**
 * Deactivate a partner topic.
 *
 * Deactivate specific partner topic.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param partnerTopicName - Name of the partner topic.
 */
export const PartnerTopicsDeactivate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PartnerTopicsDeactivateInput,
    outputSchema: PartnerTopicsDeactivateOutput,
  }),
);
// Input Schema
export const PartnerTopicsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    partnerTopicName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerTopics/{partnerTopicName}",
    }),
  );
export type PartnerTopicsDeleteInput = typeof PartnerTopicsDeleteInput.Type;

// Output Schema
export const PartnerTopicsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PartnerTopicsDeleteOutput = typeof PartnerTopicsDeleteOutput.Type;

// The operation
/**
 * Delete a partner topic.
 *
 * Delete existing partner topic.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param partnerTopicName - Name of the partner topic.
 */
export const PartnerTopicsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PartnerTopicsDeleteInput,
  outputSchema: PartnerTopicsDeleteOutput,
}));
// Input Schema
export const PartnerTopicsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  partnerTopicName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerTopics/{partnerTopicName}",
  }),
);
export type PartnerTopicsGetInput = typeof PartnerTopicsGetInput.Type;

// Output Schema
export const PartnerTopicsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    location: Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  },
);
export type PartnerTopicsGetOutput = typeof PartnerTopicsGetOutput.Type;

// The operation
/**
 * Get a partner topic.
 *
 * Get properties of a partner topic.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param partnerTopicName - Name of the partner topic.
 */
export const PartnerTopicsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PartnerTopicsGetInput,
  outputSchema: PartnerTopicsGetOutput,
}));
// Input Schema
export const PartnerTopicsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerTopics",
    }),
  );
export type PartnerTopicsListByResourceGroupInput =
  typeof PartnerTopicsListByResourceGroupInput.Type;

// Output Schema
export const PartnerTopicsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          location: Schema.String,
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type PartnerTopicsListByResourceGroupOutput =
  typeof PartnerTopicsListByResourceGroupOutput.Type;

// The operation
/**
 * List partner topics under a resource group.
 *
 * List all the partner topics under a resource group.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 */
export const PartnerTopicsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PartnerTopicsListByResourceGroupInput,
    outputSchema: PartnerTopicsListByResourceGroupOutput,
  }));
// Input Schema
export const PartnerTopicsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.EventGrid/partnerTopics",
    }),
  );
export type PartnerTopicsListBySubscriptionInput =
  typeof PartnerTopicsListBySubscriptionInput.Type;

// Output Schema
export const PartnerTopicsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          location: Schema.String,
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type PartnerTopicsListBySubscriptionOutput =
  typeof PartnerTopicsListBySubscriptionOutput.Type;

// The operation
/**
 * List partner topics under an Azure subscription.
 *
 * List all the partner topics under an Azure subscription.
 */
export const PartnerTopicsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PartnerTopicsListBySubscriptionInput,
    outputSchema: PartnerTopicsListBySubscriptionOutput,
  }));
// Input Schema
export const PartnerTopicsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    partnerTopicName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerTopics/{partnerTopicName}",
    }),
  );
export type PartnerTopicsUpdateInput = typeof PartnerTopicsUpdateInput.Type;

// Output Schema
export const PartnerTopicsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PartnerTopicsUpdateOutput = typeof PartnerTopicsUpdateOutput.Type;

// The operation
/**
 * Update a partner topic.
 *
 * Asynchronously updates a partner topic with the specified parameters.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param partnerTopicName - Name of the partner topic.
 */
export const PartnerTopicsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PartnerTopicsUpdateInput,
  outputSchema: PartnerTopicsUpdateOutput,
}));
// Input Schema
export const PermissionBindingsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    permissionBindingName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}/permissionBindings/{permissionBindingName}",
    }),
  );
export type PermissionBindingsCreateOrUpdateInput =
  typeof PermissionBindingsCreateOrUpdateInput.Type;

// Output Schema
export const PermissionBindingsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type PermissionBindingsCreateOrUpdateOutput =
  typeof PermissionBindingsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a permission binding.
 *
 * Create or update a permission binding with the specified parameters.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param namespaceName - Name of the namespace.
 * @param permissionBindingName - The permission binding name.
 */
export const PermissionBindingsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PermissionBindingsCreateOrUpdateInput,
    outputSchema: PermissionBindingsCreateOrUpdateOutput,
  }));
// Input Schema
export const PermissionBindingsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    permissionBindingName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}/permissionBindings/{permissionBindingName}",
    }),
  );
export type PermissionBindingsDeleteInput =
  typeof PermissionBindingsDeleteInput.Type;

// Output Schema
export const PermissionBindingsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PermissionBindingsDeleteOutput =
  typeof PermissionBindingsDeleteOutput.Type;

// The operation
/**
 * Delete a permission binding.
 *
 * Delete an existing permission binding.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param namespaceName - Name of the namespace.
 * @param permissionBindingName - Name of the permission binding.
 */
export const PermissionBindingsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PermissionBindingsDeleteInput,
    outputSchema: PermissionBindingsDeleteOutput,
  }),
);
// Input Schema
export const PermissionBindingsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    permissionBindingName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}/permissionBindings/{permissionBindingName}",
    }),
  );
export type PermissionBindingsGetInput = typeof PermissionBindingsGetInput.Type;

// Output Schema
export const PermissionBindingsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type PermissionBindingsGetOutput =
  typeof PermissionBindingsGetOutput.Type;

// The operation
/**
 * Get a permission binding.
 *
 * Get properties of a permission binding.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param namespaceName - Name of the namespace.
 * @param permissionBindingName - Name of the permission binding.
 */
export const PermissionBindingsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PermissionBindingsGetInput,
    outputSchema: PermissionBindingsGetOutput,
  }),
);
// Input Schema
export const PermissionBindingsListByNamespaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}/permissionBindings",
    }),
  );
export type PermissionBindingsListByNamespaceInput =
  typeof PermissionBindingsListByNamespaceInput.Type;

// Output Schema
export const PermissionBindingsListByNamespaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type PermissionBindingsListByNamespaceOutput =
  typeof PermissionBindingsListByNamespaceOutput.Type;

// The operation
/**
 * List all permission bindings under a namespace.
 *
 * Get all the permission bindings under a namespace.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param namespaceName - Name of the namespace.
 */
export const PermissionBindingsListByNamespace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PermissionBindingsListByNamespaceInput,
    outputSchema: PermissionBindingsListByNamespaceOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    parentType: Schema.Literals([
      "topics",
      "domains",
      "partnerNamespaces",
      "namespaces",
    ]).pipe(T.PathParam()),
    parentName: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/{parentType}/{parentName}/privateEndpointConnections/{privateEndpointConnectionName}",
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
 * Delete a specific private endpoint connection.
 *
 * Delete a specific private endpoint connection under a topic, domain, or partner namespace or namespace.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param parentType - The type of the parent resource. This can be either \\'topics\\', \\'domains\\', or \\'partnerNamespaces\\' or \\'namespaces\\'.
 * @param parentName - The name of the parent resource (namely, either, the topic name, domain name, or partner namespace name or namespace name).
 * @param privateEndpointConnectionName - The name of the private endpoint connection connection.
 */
export const PrivateEndpointConnectionsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsDeleteInput,
    outputSchema: PrivateEndpointConnectionsDeleteOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    parentType: Schema.Literals([
      "topics",
      "domains",
      "partnerNamespaces",
      "namespaces",
    ]).pipe(T.PathParam()),
    parentName: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/{parentType}/{parentName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type PrivateEndpointConnectionsGetInput =
  typeof PrivateEndpointConnectionsGetInput.Type;

// Output Schema
export const PrivateEndpointConnectionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type PrivateEndpointConnectionsGetOutput =
  typeof PrivateEndpointConnectionsGetOutput.Type;

// The operation
/**
 * Get a specific private endpoint connection.
 *
 * Get a specific private endpoint connection under a topic, domain, or partner namespace or namespace.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param parentType - The type of the parent resource. This can be either \\'topics\\', \\'domains\\', or \\'partnerNamespaces\\' or \\'namespaces\\'.
 * @param parentName - The name of the parent resource (namely, either, the topic name, domain name, or partner namespace name or namespace name).
 * @param privateEndpointConnectionName - The name of the private endpoint connection connection.
 */
export const PrivateEndpointConnectionsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsGetInput,
    outputSchema: PrivateEndpointConnectionsGetOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsListByResourceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    parentType: Schema.Literals([
      "topics",
      "domains",
      "partnerNamespaces",
      "namespaces",
    ]).pipe(T.PathParam()),
    parentName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/{parentType}/{parentName}/privateEndpointConnections",
    }),
  );
export type PrivateEndpointConnectionsListByResourceInput =
  typeof PrivateEndpointConnectionsListByResourceInput.Type;

// Output Schema
export const PrivateEndpointConnectionsListByResourceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type PrivateEndpointConnectionsListByResourceOutput =
  typeof PrivateEndpointConnectionsListByResourceOutput.Type;

// The operation
/**
 * Lists all private endpoint connections under a resource.
 *
 * Get all private endpoint connections under a topic, domain, or partner namespace or namespace.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param parentType - The type of the parent resource. This can be either \\'topics\\', \\'domains\\', or \\'partnerNamespaces\\' or \\'namespaces\\'.
 * @param parentName - The name of the parent resource (namely, either, the topic name, domain name, or partner namespace name or namespace name).
 */
export const PrivateEndpointConnectionsListByResource =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsListByResourceInput,
    outputSchema: PrivateEndpointConnectionsListByResourceOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    parentType: Schema.Literals([
      "topics",
      "domains",
      "partnerNamespaces",
      "namespaces",
    ]).pipe(T.PathParam()),
    parentName: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/{parentType}/{parentName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type PrivateEndpointConnectionsUpdateInput =
  typeof PrivateEndpointConnectionsUpdateInput.Type;

// Output Schema
export const PrivateEndpointConnectionsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type PrivateEndpointConnectionsUpdateOutput =
  typeof PrivateEndpointConnectionsUpdateOutput.Type;

// The operation
/**
 * Update a specific private endpoint connection.
 *
 * Update a specific private endpoint connection under a topic, domain or partner namespace.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param parentType - The type of the parent resource. This can be either \\'topics\\', \\'domains\\', or \\'partnerNamespaces\\' or \\'namespaces\\'.
 * @param parentName - The name of the parent resource (namely, either, the topic name, domain name, or partner namespace name or namespace name).
 * @param privateEndpointConnectionName - The name of the private endpoint connection connection.
 */
export const PrivateEndpointConnectionsUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsUpdateInput,
    outputSchema: PrivateEndpointConnectionsUpdateOutput,
  }));
// Input Schema
export const PrivateLinkResourcesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    parentType: Schema.String.pipe(T.PathParam()),
    parentName: Schema.String.pipe(T.PathParam()),
    privateLinkResourceName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/{parentType}/{parentName}/privateLinkResources/{privateLinkResourceName}",
    }),
  );
export type PrivateLinkResourcesGetInput =
  typeof PrivateLinkResourcesGetInput.Type;

// Output Schema
export const PrivateLinkResourcesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    properties: Schema.optional(
      Schema.Struct({
        groupId: Schema.optional(Schema.String),
        displayName: Schema.optional(Schema.String),
        requiredMembers: Schema.optional(Schema.Array(Schema.String)),
        requiredZoneNames: Schema.optional(Schema.Array(Schema.String)),
      }),
    ),
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type PrivateLinkResourcesGetOutput =
  typeof PrivateLinkResourcesGetOutput.Type;

// The operation
/**
 * Get a private link resource.
 *
 * Get properties of a private link resource.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param parentType - The type of the parent resource. This can be either \\'topics\\', \\'domains\\', or \\'partnerNamespaces\\' or \\'namespaces\\'.
 * @param parentName - The name of the parent resource (namely, either, the topic name, domain name, or partner namespace name or namespace name).
 * @param privateLinkResourceName - The name of private link resource will be either topic, domain, partnerNamespace or namespace.
 */
export const PrivateLinkResourcesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PrivateLinkResourcesGetInput,
    outputSchema: PrivateLinkResourcesGetOutput,
  }),
);
// Input Schema
export const PrivateLinkResourcesListByResourceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    parentType: Schema.String.pipe(T.PathParam()),
    parentName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/{parentType}/{parentName}/privateLinkResources",
    }),
  );
export type PrivateLinkResourcesListByResourceInput =
  typeof PrivateLinkResourcesListByResourceInput.Type;

// Output Schema
export const PrivateLinkResourcesListByResourceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          properties: Schema.optional(
            Schema.Struct({
              groupId: Schema.optional(Schema.String),
              displayName: Schema.optional(Schema.String),
              requiredMembers: Schema.optional(Schema.Array(Schema.String)),
              requiredZoneNames: Schema.optional(Schema.Array(Schema.String)),
            }),
          ),
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type PrivateLinkResourcesListByResourceOutput =
  typeof PrivateLinkResourcesListByResourceOutput.Type;

// The operation
/**
 * List private link resources under specific topic, domain, or partner namespace or namespace.
 *
 * List all the private link resources under a topic, domain, or partner namespace or namespace.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param parentType - The type of the parent resource. This can be either \\'topics\\', \\'domains\\', or \\'partnerNamespaces\\' or \\'namespaces\\'.
 * @param parentName - The name of the parent resource (namely, either, the topic name, domain name, or partner namespace or namespace name).
 */
export const PrivateLinkResourcesListByResource =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinkResourcesListByResourceInput,
    outputSchema: PrivateLinkResourcesListByResourceOutput,
  }));
// Input Schema
export const SystemTopicEventSubscriptionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    systemTopicName: Schema.String.pipe(T.PathParam()),
    eventSubscriptionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/systemTopics/{systemTopicName}/eventSubscriptions/{eventSubscriptionName}",
    }),
  );
export type SystemTopicEventSubscriptionsCreateOrUpdateInput =
  typeof SystemTopicEventSubscriptionsCreateOrUpdateInput.Type;

// Output Schema
export const SystemTopicEventSubscriptionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type SystemTopicEventSubscriptionsCreateOrUpdateOutput =
  typeof SystemTopicEventSubscriptionsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update an event subscription for a system topic.
 *
 * Asynchronously creates or updates an event subscription with the specified parameters. Existing event subscriptions will be updated with this API.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param systemTopicName - Name of the system topic.
 * @param eventSubscriptionName - Name of the event subscription to be created. Event subscription names must be between 3 and 64 characters in length and use alphanumeric letters only.
 */
export const SystemTopicEventSubscriptionsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SystemTopicEventSubscriptionsCreateOrUpdateInput,
    outputSchema: SystemTopicEventSubscriptionsCreateOrUpdateOutput,
  }));
// Input Schema
export const SystemTopicEventSubscriptionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    systemTopicName: Schema.String.pipe(T.PathParam()),
    eventSubscriptionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/systemTopics/{systemTopicName}/eventSubscriptions/{eventSubscriptionName}",
    }),
  );
export type SystemTopicEventSubscriptionsDeleteInput =
  typeof SystemTopicEventSubscriptionsDeleteInput.Type;

// Output Schema
export const SystemTopicEventSubscriptionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SystemTopicEventSubscriptionsDeleteOutput =
  typeof SystemTopicEventSubscriptionsDeleteOutput.Type;

// The operation
/**
 * Delete an event subscription of a system topic.
 *
 * Delete an existing event subscription of a system topic.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param systemTopicName - Name of the system topic.
 * @param eventSubscriptionName - Name of the event subscription to be deleted.
 */
export const SystemTopicEventSubscriptionsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SystemTopicEventSubscriptionsDeleteInput,
    outputSchema: SystemTopicEventSubscriptionsDeleteOutput,
  }));
// Input Schema
export const SystemTopicEventSubscriptionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    systemTopicName: Schema.String.pipe(T.PathParam()),
    eventSubscriptionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/systemTopics/{systemTopicName}/eventSubscriptions/{eventSubscriptionName}",
    }),
  );
export type SystemTopicEventSubscriptionsGetInput =
  typeof SystemTopicEventSubscriptionsGetInput.Type;

// Output Schema
export const SystemTopicEventSubscriptionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type SystemTopicEventSubscriptionsGetOutput =
  typeof SystemTopicEventSubscriptionsGetOutput.Type;

// The operation
/**
 * Get an event subscription of a system topic.
 *
 * Get an event subscription.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param systemTopicName - Name of the system topic.
 * @param eventSubscriptionName - Name of the event subscription to be found.
 */
export const SystemTopicEventSubscriptionsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SystemTopicEventSubscriptionsGetInput,
    outputSchema: SystemTopicEventSubscriptionsGetOutput,
  }));
// Input Schema
export const SystemTopicEventSubscriptionsGetDeliveryAttributesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    systemTopicName: Schema.String.pipe(T.PathParam()),
    eventSubscriptionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/systemTopics/{systemTopicName}/eventSubscriptions/{eventSubscriptionName}/getDeliveryAttributes",
    }),
  );
export type SystemTopicEventSubscriptionsGetDeliveryAttributesInput =
  typeof SystemTopicEventSubscriptionsGetDeliveryAttributesInput.Type;

// Output Schema
export const SystemTopicEventSubscriptionsGetDeliveryAttributesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          name: Schema.optional(Schema.String),
          type: Schema.Literals(["Static", "Dynamic"]),
        }),
      ),
    ),
  });
export type SystemTopicEventSubscriptionsGetDeliveryAttributesOutput =
  typeof SystemTopicEventSubscriptionsGetDeliveryAttributesOutput.Type;

// The operation
/**
 * Get delivery attributes for an event subscription.
 *
 * Get all delivery attributes for an event subscription.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param systemTopicName - Name of the system topic.
 * @param eventSubscriptionName - Name of the event subscription.
 */
export const SystemTopicEventSubscriptionsGetDeliveryAttributes =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SystemTopicEventSubscriptionsGetDeliveryAttributesInput,
    outputSchema: SystemTopicEventSubscriptionsGetDeliveryAttributesOutput,
  }));
// Input Schema
export const SystemTopicEventSubscriptionsGetFullUrlInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    systemTopicName: Schema.String.pipe(T.PathParam()),
    eventSubscriptionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/systemTopics/{systemTopicName}/eventSubscriptions/{eventSubscriptionName}/getFullUrl",
    }),
  );
export type SystemTopicEventSubscriptionsGetFullUrlInput =
  typeof SystemTopicEventSubscriptionsGetFullUrlInput.Type;

// Output Schema
export const SystemTopicEventSubscriptionsGetFullUrlOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    endpointUrl: Schema.optional(Schema.String),
  });
export type SystemTopicEventSubscriptionsGetFullUrlOutput =
  typeof SystemTopicEventSubscriptionsGetFullUrlOutput.Type;

// The operation
/**
 * Get full URL of an event subscription of a system topic.
 *
 * Get the full endpoint URL for an event subscription of a system topic.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param systemTopicName - Name of the system topic.
 * @param eventSubscriptionName - Name of the event subscription.
 */
export const SystemTopicEventSubscriptionsGetFullUrl =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SystemTopicEventSubscriptionsGetFullUrlInput,
    outputSchema: SystemTopicEventSubscriptionsGetFullUrlOutput,
  }));
// Input Schema
export const SystemTopicEventSubscriptionsListBySystemTopicInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    systemTopicName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/systemTopics/{systemTopicName}/eventSubscriptions",
    }),
  );
export type SystemTopicEventSubscriptionsListBySystemTopicInput =
  typeof SystemTopicEventSubscriptionsListBySystemTopicInput.Type;

// Output Schema
export const SystemTopicEventSubscriptionsListBySystemTopicOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type SystemTopicEventSubscriptionsListBySystemTopicOutput =
  typeof SystemTopicEventSubscriptionsListBySystemTopicOutput.Type;

// The operation
/**
 * List event subscriptions of a system topic.
 *
 * List event subscriptions that belong to a specific system topic.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param systemTopicName - Name of the system topic.
 */
export const SystemTopicEventSubscriptionsListBySystemTopic =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SystemTopicEventSubscriptionsListBySystemTopicInput,
    outputSchema: SystemTopicEventSubscriptionsListBySystemTopicOutput,
  }));
// Input Schema
export const SystemTopicEventSubscriptionsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    systemTopicName: Schema.String.pipe(T.PathParam()),
    eventSubscriptionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/systemTopics/{systemTopicName}/eventSubscriptions/{eventSubscriptionName}",
    }),
  );
export type SystemTopicEventSubscriptionsUpdateInput =
  typeof SystemTopicEventSubscriptionsUpdateInput.Type;

// Output Schema
export const SystemTopicEventSubscriptionsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type SystemTopicEventSubscriptionsUpdateOutput =
  typeof SystemTopicEventSubscriptionsUpdateOutput.Type;

// The operation
/**
 * Update event subscription of a system topic.
 *
 * Update an existing event subscription of a system topic.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param systemTopicName - Name of the system topic.
 * @param eventSubscriptionName - Name of the event subscription to be updated.
 */
export const SystemTopicEventSubscriptionsUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SystemTopicEventSubscriptionsUpdateInput,
    outputSchema: SystemTopicEventSubscriptionsUpdateOutput,
  }));
// Input Schema
export const SystemTopicsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    systemTopicName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/systemTopics/{systemTopicName}",
    }),
  );
export type SystemTopicsCreateOrUpdateInput =
  typeof SystemTopicsCreateOrUpdateInput.Type;

// Output Schema
export const SystemTopicsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    location: Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type SystemTopicsCreateOrUpdateOutput =
  typeof SystemTopicsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a system topic.
 *
 * Asynchronously creates a new system topic with the specified parameters.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param systemTopicName - Name of the system topic.
 */
export const SystemTopicsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SystemTopicsCreateOrUpdateInput,
    outputSchema: SystemTopicsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const SystemTopicsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    systemTopicName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/systemTopics/{systemTopicName}",
    }),
  );
export type SystemTopicsDeleteInput = typeof SystemTopicsDeleteInput.Type;

// Output Schema
export const SystemTopicsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SystemTopicsDeleteOutput = typeof SystemTopicsDeleteOutput.Type;

// The operation
/**
 * Delete a system topic.
 *
 * Delete existing system topic.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param systemTopicName - Name of the system topic.
 */
export const SystemTopicsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SystemTopicsDeleteInput,
  outputSchema: SystemTopicsDeleteOutput,
}));
// Input Schema
export const SystemTopicsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  systemTopicName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/systemTopics/{systemTopicName}",
  }),
);
export type SystemTopicsGetInput = typeof SystemTopicsGetInput.Type;

// Output Schema
export const SystemTopicsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  location: Schema.String,
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
});
export type SystemTopicsGetOutput = typeof SystemTopicsGetOutput.Type;

// The operation
/**
 * Get a system topic.
 *
 * Get properties of a system topic.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param systemTopicName - Name of the system topic.
 */
export const SystemTopicsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SystemTopicsGetInput,
  outputSchema: SystemTopicsGetOutput,
}));
// Input Schema
export const SystemTopicsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/systemTopics",
    }),
  );
export type SystemTopicsListByResourceGroupInput =
  typeof SystemTopicsListByResourceGroupInput.Type;

// Output Schema
export const SystemTopicsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          location: Schema.String,
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type SystemTopicsListByResourceGroupOutput =
  typeof SystemTopicsListByResourceGroupOutput.Type;

// The operation
/**
 * List system topics under a resource group.
 *
 * List all the system topics under a resource group.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 */
export const SystemTopicsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SystemTopicsListByResourceGroupInput,
    outputSchema: SystemTopicsListByResourceGroupOutput,
  }));
// Input Schema
export const SystemTopicsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.EventGrid/systemTopics",
    }),
  );
export type SystemTopicsListBySubscriptionInput =
  typeof SystemTopicsListBySubscriptionInput.Type;

// Output Schema
export const SystemTopicsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          location: Schema.String,
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type SystemTopicsListBySubscriptionOutput =
  typeof SystemTopicsListBySubscriptionOutput.Type;

// The operation
/**
 * List system topics under an Azure subscription.
 *
 * List all the system topics under an Azure subscription.
 */
export const SystemTopicsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SystemTopicsListBySubscriptionInput,
    outputSchema: SystemTopicsListBySubscriptionOutput,
  }));
// Input Schema
export const SystemTopicsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    systemTopicName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/systemTopics/{systemTopicName}",
    }),
  );
export type SystemTopicsUpdateInput = typeof SystemTopicsUpdateInput.Type;

// Output Schema
export const SystemTopicsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    location: Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type SystemTopicsUpdateOutput = typeof SystemTopicsUpdateOutput.Type;

// The operation
/**
 * Update a system topic.
 *
 * Asynchronously updates a system topic with the specified parameters.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param systemTopicName - Name of the system topic.
 */
export const SystemTopicsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SystemTopicsUpdateInput,
  outputSchema: SystemTopicsUpdateOutput,
}));
// Input Schema
export const TopicEventSubscriptionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    topicName: Schema.String.pipe(T.PathParam()),
    eventSubscriptionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/topics/{topicName}/eventSubscriptions/{eventSubscriptionName}",
    }),
  );
export type TopicEventSubscriptionsCreateOrUpdateInput =
  typeof TopicEventSubscriptionsCreateOrUpdateInput.Type;

// Output Schema
export const TopicEventSubscriptionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type TopicEventSubscriptionsCreateOrUpdateOutput =
  typeof TopicEventSubscriptionsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update an event subscription to a topic.
 *
 * Asynchronously creates a new event subscription or updates an existing event subscription.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param topicName - Name of the domain topic.
 * @param eventSubscriptionName - Name of the event subscription to be created. Event subscription names must be between 3 and 64 characters in length and use alphanumeric letters only.
 */
export const TopicEventSubscriptionsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: TopicEventSubscriptionsCreateOrUpdateInput,
    outputSchema: TopicEventSubscriptionsCreateOrUpdateOutput,
  }));
// Input Schema
export const TopicEventSubscriptionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    topicName: Schema.String.pipe(T.PathParam()),
    eventSubscriptionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/topics/{topicName}/eventSubscriptions/{eventSubscriptionName}",
    }),
  );
export type TopicEventSubscriptionsDeleteInput =
  typeof TopicEventSubscriptionsDeleteInput.Type;

// Output Schema
export const TopicEventSubscriptionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type TopicEventSubscriptionsDeleteOutput =
  typeof TopicEventSubscriptionsDeleteOutput.Type;

// The operation
/**
 * Delete an event subscription for a topic.
 *
 * Delete an existing event subscription for a topic.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param topicName - Name of the topic.
 * @param eventSubscriptionName - Name of the event subscription to be deleted.
 */
export const TopicEventSubscriptionsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: TopicEventSubscriptionsDeleteInput,
    outputSchema: TopicEventSubscriptionsDeleteOutput,
  }));
// Input Schema
export const TopicEventSubscriptionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    topicName: Schema.String.pipe(T.PathParam()),
    eventSubscriptionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/topics/{topicName}/eventSubscriptions/{eventSubscriptionName}",
    }),
  );
export type TopicEventSubscriptionsGetInput =
  typeof TopicEventSubscriptionsGetInput.Type;

// Output Schema
export const TopicEventSubscriptionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type TopicEventSubscriptionsGetOutput =
  typeof TopicEventSubscriptionsGetOutput.Type;

// The operation
/**
 * Get an event subscription of a topic.
 *
 * Get properties of an event subscription of a topic.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param topicName - Name of the topic.
 * @param eventSubscriptionName - Name of the event subscription to be found.
 */
export const TopicEventSubscriptionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: TopicEventSubscriptionsGetInput,
    outputSchema: TopicEventSubscriptionsGetOutput,
  }),
);
// Input Schema
export const TopicEventSubscriptionsGetDeliveryAttributesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    topicName: Schema.String.pipe(T.PathParam()),
    eventSubscriptionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/topics/{topicName}/eventSubscriptions/{eventSubscriptionName}/getDeliveryAttributes",
    }),
  );
export type TopicEventSubscriptionsGetDeliveryAttributesInput =
  typeof TopicEventSubscriptionsGetDeliveryAttributesInput.Type;

// Output Schema
export const TopicEventSubscriptionsGetDeliveryAttributesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          name: Schema.optional(Schema.String),
          type: Schema.Literals(["Static", "Dynamic"]),
        }),
      ),
    ),
  });
export type TopicEventSubscriptionsGetDeliveryAttributesOutput =
  typeof TopicEventSubscriptionsGetDeliveryAttributesOutput.Type;

// The operation
/**
 * Get delivery attributes for an event subscription for topic.
 *
 * Get all delivery attributes for an event subscription for topic.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param topicName - Name of the topic.
 * @param eventSubscriptionName - Name of the event subscription.
 */
export const TopicEventSubscriptionsGetDeliveryAttributes =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: TopicEventSubscriptionsGetDeliveryAttributesInput,
    outputSchema: TopicEventSubscriptionsGetDeliveryAttributesOutput,
  }));
// Input Schema
export const TopicEventSubscriptionsGetFullUrlInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    topicName: Schema.String.pipe(T.PathParam()),
    eventSubscriptionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/topics/{topicName}/eventSubscriptions/{eventSubscriptionName}/getFullUrl",
    }),
  );
export type TopicEventSubscriptionsGetFullUrlInput =
  typeof TopicEventSubscriptionsGetFullUrlInput.Type;

// Output Schema
export const TopicEventSubscriptionsGetFullUrlOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    endpointUrl: Schema.optional(Schema.String),
  });
export type TopicEventSubscriptionsGetFullUrlOutput =
  typeof TopicEventSubscriptionsGetFullUrlOutput.Type;

// The operation
/**
 * Get full URL of an event subscription for topic.
 *
 * Get the full endpoint URL for an event subscription for topic.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param topicName - Name of the domain topic.
 * @param eventSubscriptionName - Name of the event subscription.
 */
export const TopicEventSubscriptionsGetFullUrl =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: TopicEventSubscriptionsGetFullUrlInput,
    outputSchema: TopicEventSubscriptionsGetFullUrlOutput,
  }));
// Input Schema
export const TopicEventSubscriptionsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    topicName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/topics/{topicName}/eventSubscriptions",
    }),
  );
export type TopicEventSubscriptionsListInput =
  typeof TopicEventSubscriptionsListInput.Type;

// Output Schema
export const TopicEventSubscriptionsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type TopicEventSubscriptionsListOutput =
  typeof TopicEventSubscriptionsListOutput.Type;

// The operation
/**
 * List all event subscriptions for a specific topic.
 *
 * List all event subscriptions that have been created for a specific topic.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param topicName - Name of the topic.
 */
export const TopicEventSubscriptionsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: TopicEventSubscriptionsListInput,
    outputSchema: TopicEventSubscriptionsListOutput,
  }),
);
// Input Schema
export const TopicEventSubscriptionsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    topicName: Schema.String.pipe(T.PathParam()),
    eventSubscriptionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/topics/{topicName}/eventSubscriptions/{eventSubscriptionName}",
    }),
  );
export type TopicEventSubscriptionsUpdateInput =
  typeof TopicEventSubscriptionsUpdateInput.Type;

// Output Schema
export const TopicEventSubscriptionsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type TopicEventSubscriptionsUpdateOutput =
  typeof TopicEventSubscriptionsUpdateOutput.Type;

// The operation
/**
 * Update an event subscription for a topic.
 *
 * Update an existing event subscription for a topic.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param topicName - Name of the domain.
 * @param eventSubscriptionName - Name of the event subscription to be updated.
 */
export const TopicEventSubscriptionsUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: TopicEventSubscriptionsUpdateInput,
    outputSchema: TopicEventSubscriptionsUpdateOutput,
  }));
// Input Schema
export const TopicsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    topicName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/topics/{topicName}",
    }),
  );
export type TopicsCreateOrUpdateInput = typeof TopicsCreateOrUpdateInput.Type;

// Output Schema
export const TopicsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    location: Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type TopicsCreateOrUpdateOutput = typeof TopicsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a topic.
 *
 * Asynchronously creates a new topic with the specified parameters.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param topicName - Name of the topic.
 */
export const TopicsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: TopicsCreateOrUpdateInput,
    outputSchema: TopicsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const TopicsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  topicName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/topics/{topicName}",
  }),
);
export type TopicsDeleteInput = typeof TopicsDeleteInput.Type;

// Output Schema
export const TopicsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type TopicsDeleteOutput = typeof TopicsDeleteOutput.Type;

// The operation
/**
 * Delete a topic.
 *
 * Delete existing topic.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param topicName - Name of the topic.
 */
export const TopicsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TopicsDeleteInput,
  outputSchema: TopicsDeleteOutput,
}));
// Input Schema
export const TopicsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  topicName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/topics/{topicName}",
  }),
);
export type TopicsGetInput = typeof TopicsGetInput.Type;

// Output Schema
export const TopicsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  location: Schema.String,
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
});
export type TopicsGetOutput = typeof TopicsGetOutput.Type;

// The operation
/**
 * Get a topic.
 *
 * Get properties of a topic.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param topicName - Name of the topic.
 */
export const TopicsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TopicsGetInput,
  outputSchema: TopicsGetOutput,
}));
// Input Schema
export const TopicsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/topics",
    }),
  );
export type TopicsListByResourceGroupInput =
  typeof TopicsListByResourceGroupInput.Type;

// Output Schema
export const TopicsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          location: Schema.String,
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type TopicsListByResourceGroupOutput =
  typeof TopicsListByResourceGroupOutput.Type;

// The operation
/**
 * List topics under a resource group.
 *
 * List all the topics under a resource group.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 */
export const TopicsListByResourceGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: TopicsListByResourceGroupInput,
    outputSchema: TopicsListByResourceGroupOutput,
  }),
);
// Input Schema
export const TopicsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.EventGrid/topics",
    }),
  );
export type TopicsListBySubscriptionInput =
  typeof TopicsListBySubscriptionInput.Type;

// Output Schema
export const TopicsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          location: Schema.String,
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type TopicsListBySubscriptionOutput =
  typeof TopicsListBySubscriptionOutput.Type;

// The operation
/**
 * List topics under an Azure subscription.
 *
 * List all the topics under an Azure subscription.
 */
export const TopicsListBySubscription = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: TopicsListBySubscriptionInput,
    outputSchema: TopicsListBySubscriptionOutput,
  }),
);
// Input Schema
export const TopicsListEventTypesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    providerNamespace: Schema.String.pipe(T.PathParam()),
    resourceTypeName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{providerNamespace}/{resourceTypeName}/{resourceName}/providers/Microsoft.EventGrid/eventTypes",
    }),
  );
export type TopicsListEventTypesInput = typeof TopicsListEventTypesInput.Type;

// Output Schema
export const TopicsListEventTypesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type TopicsListEventTypesOutput = typeof TopicsListEventTypesOutput.Type;

// The operation
/**
 * List topic event types.
 *
 * List event types for a topic.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param providerNamespace - Namespace of the provider of the topic.
 * @param resourceTypeName - Name of the topic type.
 * @param resourceName - Name of the topic.
 */
export const TopicsListEventTypes = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: TopicsListEventTypesInput,
    outputSchema: TopicsListEventTypesOutput,
  }),
);
// Input Schema
export const TopicsListSharedAccessKeysInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    topicName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/topics/{topicName}/listKeys",
    }),
  );
export type TopicsListSharedAccessKeysInput =
  typeof TopicsListSharedAccessKeysInput.Type;

// Output Schema
export const TopicsListSharedAccessKeysOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    key1: Schema.optional(Schema.String),
    key2: Schema.optional(Schema.String),
  });
export type TopicsListSharedAccessKeysOutput =
  typeof TopicsListSharedAccessKeysOutput.Type;

// The operation
/**
 * List keys for a topic.
 *
 * List the two keys used to publish to a topic.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param topicName - Name of the topic.
 */
export const TopicsListSharedAccessKeys = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: TopicsListSharedAccessKeysInput,
    outputSchema: TopicsListSharedAccessKeysOutput,
  }),
);
// Input Schema
export const TopicSpacesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    topicSpaceName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}/topicSpaces/{topicSpaceName}",
    }),
  );
export type TopicSpacesCreateOrUpdateInput =
  typeof TopicSpacesCreateOrUpdateInput.Type;

// Output Schema
export const TopicSpacesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type TopicSpacesCreateOrUpdateOutput =
  typeof TopicSpacesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a topic space.
 *
 * Create or update a topic space with the specified parameters.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param namespaceName - Name of the namespace.
 * @param topicSpaceName - The topic space name.
 */
export const TopicSpacesCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: TopicSpacesCreateOrUpdateInput,
    outputSchema: TopicSpacesCreateOrUpdateOutput,
  }),
);
// Input Schema
export const TopicSpacesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    topicSpaceName: Schema.String.pipe(T.PathParam()),
  },
).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}/topicSpaces/{topicSpaceName}",
  }),
);
export type TopicSpacesDeleteInput = typeof TopicSpacesDeleteInput.Type;

// Output Schema
export const TopicSpacesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type TopicSpacesDeleteOutput = typeof TopicSpacesDeleteOutput.Type;

// The operation
/**
 * Delete a topic space.
 *
 * Delete an existing topic space.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param namespaceName - Name of the namespace.
 * @param topicSpaceName - Name of the Topic space.
 */
export const TopicSpacesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TopicSpacesDeleteInput,
  outputSchema: TopicSpacesDeleteOutput,
}));
// Input Schema
export const TopicSpacesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  namespaceName: Schema.String.pipe(T.PathParam()),
  topicSpaceName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}/topicSpaces/{topicSpaceName}",
  }),
);
export type TopicSpacesGetInput = typeof TopicSpacesGetInput.Type;

// Output Schema
export const TopicSpacesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
});
export type TopicSpacesGetOutput = typeof TopicSpacesGetOutput.Type;

// The operation
/**
 * Get a topic space.
 *
 * Get properties of a topic space.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param namespaceName - Name of the namespace.
 * @param topicSpaceName - Name of the Topic space.
 */
export const TopicSpacesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TopicSpacesGetInput,
  outputSchema: TopicSpacesGetOutput,
}));
// Input Schema
export const TopicSpacesListByNamespaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}/topicSpaces",
    }),
  );
export type TopicSpacesListByNamespaceInput =
  typeof TopicSpacesListByNamespaceInput.Type;

// Output Schema
export const TopicSpacesListByNamespaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type TopicSpacesListByNamespaceOutput =
  typeof TopicSpacesListByNamespaceOutput.Type;

// The operation
/**
 * List all topic spaces under a namespace.
 *
 * Get all the topic spaces under a namespace.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param namespaceName - Name of the namespace.
 */
export const TopicSpacesListByNamespace = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: TopicSpacesListByNamespaceInput,
    outputSchema: TopicSpacesListByNamespaceOutput,
  }),
);
// Input Schema
export const TopicsRegenerateKeyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    topicName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/topics/{topicName}/regenerateKey",
    }),
  );
export type TopicsRegenerateKeyInput = typeof TopicsRegenerateKeyInput.Type;

// Output Schema
export const TopicsRegenerateKeyOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    key1: Schema.optional(Schema.String),
    key2: Schema.optional(Schema.String),
  });
export type TopicsRegenerateKeyOutput = typeof TopicsRegenerateKeyOutput.Type;

// The operation
/**
 * Regenerate key for a topic.
 *
 * Regenerate a shared access key for a topic.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param topicName - Name of the topic.
 */
export const TopicsRegenerateKey = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TopicsRegenerateKeyInput,
  outputSchema: TopicsRegenerateKeyOutput,
}));
// Input Schema
export const TopicsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  topicName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/topics/{topicName}",
  }),
);
export type TopicsUpdateInput = typeof TopicsUpdateInput.Type;

// Output Schema
export const TopicsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type TopicsUpdateOutput = typeof TopicsUpdateOutput.Type;

// The operation
/**
 * Update a topic.
 *
 * Asynchronously updates a topic with the specified parameters.
 *
 * @param resourceGroupName - The name of the resource group within the user's subscription.
 * @param topicName - Name of the topic.
 */
export const TopicsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TopicsUpdateInput,
  outputSchema: TopicsUpdateOutput,
}));
// Input Schema
export const TopicTypesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  topicTypeName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.EventGrid/topicTypes/{topicTypeName}",
  }),
);
export type TopicTypesGetInput = typeof TopicTypesGetInput.Type;

// Output Schema
export const TopicTypesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
});
export type TopicTypesGetOutput = typeof TopicTypesGetOutput.Type;

// The operation
/**
 * Get a topic type.
 *
 * Get information about a topic type.
 *
 * @param topicTypeName - Name of the topic type.
 */
export const TopicTypesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TopicTypesGetInput,
  outputSchema: TopicTypesGetOutput,
}));
// Input Schema
export const TopicTypesListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({ method: "GET", path: "/providers/Microsoft.EventGrid/topicTypes" }),
);
export type TopicTypesListInput = typeof TopicTypesListInput.Type;

// Output Schema
export const TopicTypesListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        type: Schema.optional(Schema.String),
      }),
    ),
  ),
});
export type TopicTypesListOutput = typeof TopicTypesListOutput.Type;

// The operation
/**
 * List topic types.
 *
 * List all registered topic types.
 */
export const TopicTypesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TopicTypesListInput,
  outputSchema: TopicTypesListOutput,
}));
// Input Schema
export const TopicTypesListEventTypesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    topicTypeName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.EventGrid/topicTypes/{topicTypeName}/eventTypes",
    }),
  );
export type TopicTypesListEventTypesInput =
  typeof TopicTypesListEventTypesInput.Type;

// Output Schema
export const TopicTypesListEventTypesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type TopicTypesListEventTypesOutput =
  typeof TopicTypesListEventTypesOutput.Type;

// The operation
/**
 * List event types.
 *
 * List event types for a topic type.
 *
 * @param topicTypeName - Name of the topic type.
 */
export const TopicTypesListEventTypes = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: TopicTypesListEventTypesInput,
    outputSchema: TopicTypesListEventTypesOutput,
  }),
);
// Input Schema
export const VerifiedPartnersGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    verifiedPartnerName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.EventGrid/verifiedPartners/{verifiedPartnerName}",
    }),
  );
export type VerifiedPartnersGetInput = typeof VerifiedPartnersGetInput.Type;

// Output Schema
export const VerifiedPartnersGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type VerifiedPartnersGetOutput = typeof VerifiedPartnersGetOutput.Type;

// The operation
/**
 * Get a verified partner.
 *
 * Get properties of a verified partner.
 *
 * @param verifiedPartnerName - Name of the verified partner.
 */
export const VerifiedPartnersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: VerifiedPartnersGetInput,
  outputSchema: VerifiedPartnersGetOutput,
}));
// Input Schema
export const VerifiedPartnersListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.EventGrid/verifiedPartners",
    }),
  );
export type VerifiedPartnersListInput = typeof VerifiedPartnersListInput.Type;

// Output Schema
export const VerifiedPartnersListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type VerifiedPartnersListOutput = typeof VerifiedPartnersListOutput.Type;

// The operation
/**
 * List all verified partners.
 *
 * Get a list of all verified partners.
 */
export const VerifiedPartnersList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VerifiedPartnersListInput,
    outputSchema: VerifiedPartnersListOutput,
  }),
);
