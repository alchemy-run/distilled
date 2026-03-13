/**
 * Azure Orbital API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const AvailableGroundStationsListByCapabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Orbital/availableGroundStations",
    }),
  );
export type AvailableGroundStationsListByCapabilityInput =
  typeof AvailableGroundStationsListByCapabilityInput.Type;

// Output Schema
export const AvailableGroundStationsListByCapabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          properties: Schema.Struct({
            city: Schema.optional(Schema.String),
            providerName: Schema.optional(Schema.String),
            longitudeDegrees: Schema.optional(Schema.Number),
            latitudeDegrees: Schema.optional(Schema.Number),
            altitudeMeters: Schema.optional(Schema.Number),
            releaseMode: Schema.optional(Schema.Literals(["Preview", "GA"])),
          }),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type AvailableGroundStationsListByCapabilityOutput =
  typeof AvailableGroundStationsListByCapabilityOutput.Type;

// The operation
/**
 * Returns list of available ground stations.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const AvailableGroundStationsListByCapability =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AvailableGroundStationsListByCapabilityInput,
    outputSchema: AvailableGroundStationsListByCapabilityOutput,
  }));
// Input Schema
export const ContactProfilesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Orbital/contactProfiles/{contactProfileName}",
    }),
  );
export type ContactProfilesCreateOrUpdateInput =
  typeof ContactProfilesCreateOrUpdateInput.Type;

// Output Schema
export const ContactProfilesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ContactProfilesCreateOrUpdateOutput =
  typeof ContactProfilesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a contact profile.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const ContactProfilesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ContactProfilesCreateOrUpdateInput,
    outputSchema: ContactProfilesCreateOrUpdateOutput,
  }));
// Input Schema
export const ContactProfilesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Orbital/contactProfiles/{contactProfileName}",
    }),
  );
export type ContactProfilesDeleteInput = typeof ContactProfilesDeleteInput.Type;

// Output Schema
export const ContactProfilesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ContactProfilesDeleteOutput =
  typeof ContactProfilesDeleteOutput.Type;

// The operation
/**
 * Deletes a specified contact profile resource.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const ContactProfilesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ContactProfilesDeleteInput,
    outputSchema: ContactProfilesDeleteOutput,
  }),
);
// Input Schema
export const ContactProfilesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Orbital/contactProfiles/{contactProfileName}",
    }),
  );
export type ContactProfilesGetInput = typeof ContactProfilesGetInput.Type;

// Output Schema
export const ContactProfilesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ContactProfilesGetOutput = typeof ContactProfilesGetOutput.Type;

// The operation
/**
 * Gets the specified contact Profile in a specified resource group.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const ContactProfilesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ContactProfilesGetInput,
  outputSchema: ContactProfilesGetOutput,
}));
// Input Schema
export const ContactProfilesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Orbital/contactProfiles",
    }),
  );
export type ContactProfilesListInput = typeof ContactProfilesListInput.Type;

// Output Schema
export const ContactProfilesListOutput =
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
export type ContactProfilesListOutput = typeof ContactProfilesListOutput.Type;

// The operation
/**
 * Returns list of contact profiles by Resource Group.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const ContactProfilesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ContactProfilesListInput,
  outputSchema: ContactProfilesListOutput,
}));
// Input Schema
export const ContactProfilesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Orbital/contactProfiles",
    }),
  );
export type ContactProfilesListBySubscriptionInput =
  typeof ContactProfilesListBySubscriptionInput.Type;

// Output Schema
export const ContactProfilesListBySubscriptionOutput =
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
export type ContactProfilesListBySubscriptionOutput =
  typeof ContactProfilesListBySubscriptionOutput.Type;

// The operation
/**
 * Returns list of contact profiles by Subscription.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const ContactProfilesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ContactProfilesListBySubscriptionInput,
    outputSchema: ContactProfilesListBySubscriptionOutput,
  }));
// Input Schema
export const ContactProfilesUpdateTagsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Orbital/contactProfiles/{contactProfileName}",
    }),
  );
export type ContactProfilesUpdateTagsInput =
  typeof ContactProfilesUpdateTagsInput.Type;

// Output Schema
export const ContactProfilesUpdateTagsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ContactProfilesUpdateTagsOutput =
  typeof ContactProfilesUpdateTagsOutput.Type;

// The operation
/**
 * Updates the specified contact profile tags.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const ContactProfilesUpdateTags = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ContactProfilesUpdateTagsInput,
    outputSchema: ContactProfilesUpdateTagsOutput,
  }),
);
// Input Schema
export const ContactsCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Orbital/spacecrafts/{spacecraftName}/contacts/{contactName}",
  }),
);
export type ContactsCreateInput = typeof ContactsCreateInput.Type;

// Output Schema
export const ContactsCreateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type ContactsCreateOutput = typeof ContactsCreateOutput.Type;

// The operation
/**
 * Creates a contact.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const ContactsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ContactsCreateInput,
  outputSchema: ContactsCreateOutput,
}));
// Input Schema
export const ContactsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Orbital/spacecrafts/{spacecraftName}/contacts/{contactName}",
  }),
);
export type ContactsDeleteInput = typeof ContactsDeleteInput.Type;

// Output Schema
export const ContactsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ContactsDeleteOutput = typeof ContactsDeleteOutput.Type;

// The operation
/**
 * Deletes a specified contact.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const ContactsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ContactsDeleteInput,
  outputSchema: ContactsDeleteOutput,
}));
// Input Schema
export const ContactsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Orbital/spacecrafts/{spacecraftName}/contacts/{contactName}",
  }),
);
export type ContactsGetInput = typeof ContactsGetInput.Type;

// Output Schema
export const ContactsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ContactsGetOutput = typeof ContactsGetOutput.Type;

// The operation
/**
 * Gets the specified contact in a specified resource group.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const ContactsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ContactsGetInput,
  outputSchema: ContactsGetOutput,
}));
// Input Schema
export const ContactsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Orbital/spacecrafts/{spacecraftName}/contacts",
  }),
);
export type ContactsListInput = typeof ContactsListInput.Type;

// Output Schema
export const ContactsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(Schema.Array(Schema.Struct({}))),
  nextLink: Schema.optional(Schema.String),
});
export type ContactsListOutput = typeof ContactsListOutput.Type;

// The operation
/**
 * Returns list of contacts by spacecraftName.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const ContactsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ContactsListInput,
  outputSchema: ContactsListOutput,
}));
// Input Schema
export const EdgeSitesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Orbital/edgeSites/{edgeSiteName}",
    }),
  );
export type EdgeSitesCreateOrUpdateInput =
  typeof EdgeSitesCreateOrUpdateInput.Type;

// Output Schema
export const EdgeSitesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type EdgeSitesCreateOrUpdateOutput =
  typeof EdgeSitesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates an edge site.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param api-version - The API version to use for this operation.
 */
export const EdgeSitesCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: EdgeSitesCreateOrUpdateInput,
    outputSchema: EdgeSitesCreateOrUpdateOutput,
  }),
);
// Input Schema
export const EdgeSitesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Orbital/edgeSites/{edgeSiteName}",
  }),
);
export type EdgeSitesDeleteInput = typeof EdgeSitesDeleteInput.Type;

// Output Schema
export const EdgeSitesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type EdgeSitesDeleteOutput = typeof EdgeSitesDeleteOutput.Type;

// The operation
/**
 * Deletes a specified edge site resource.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param api-version - The API version to use for this operation.
 */
export const EdgeSitesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: EdgeSitesDeleteInput,
  outputSchema: EdgeSitesDeleteOutput,
}));
// Input Schema
export const EdgeSitesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Orbital/edgeSites/{edgeSiteName}",
  }),
);
export type EdgeSitesGetInput = typeof EdgeSitesGetInput.Type;

// Output Schema
export const EdgeSitesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type EdgeSitesGetOutput = typeof EdgeSitesGetOutput.Type;

// The operation
/**
 * Gets the specified edge site in a specified resource group.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param api-version - The API version to use for this operation.
 */
export const EdgeSitesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: EdgeSitesGetInput,
  outputSchema: EdgeSitesGetOutput,
}));
// Input Schema
export const EdgeSitesListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Orbital/edgeSites",
  }),
);
export type EdgeSitesListInput = typeof EdgeSitesListInput.Type;

// Output Schema
export const EdgeSitesListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
export type EdgeSitesListOutput = typeof EdgeSitesListOutput.Type;

// The operation
/**
 * Returns a list of edge sites for a resource group.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param api-version - The API version to use for this operation.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const EdgeSitesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: EdgeSitesListInput,
  outputSchema: EdgeSitesListOutput,
}));
// Input Schema
export const EdgeSitesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Orbital/edgeSites",
    }),
  );
export type EdgeSitesListBySubscriptionInput =
  typeof EdgeSitesListBySubscriptionInput.Type;

// Output Schema
export const EdgeSitesListBySubscriptionOutput =
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
export type EdgeSitesListBySubscriptionOutput =
  typeof EdgeSitesListBySubscriptionOutput.Type;

// The operation
/**
 * Returns a list of edge sites for a subscription.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param api-version - The API version to use for this operation.
 */
export const EdgeSitesListBySubscription = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: EdgeSitesListBySubscriptionInput,
    outputSchema: EdgeSitesListBySubscriptionOutput,
  }),
);
// Input Schema
export const EdgeSitesListL2ConnectionsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Orbital/edgeSites/{edgeSiteName}/listL2Connections",
    }),
  );
export type EdgeSitesListL2ConnectionsInput =
  typeof EdgeSitesListL2ConnectionsInput.Type;

// Output Schema
export const EdgeSitesListL2ConnectionsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type EdgeSitesListL2ConnectionsOutput =
  typeof EdgeSitesListL2ConnectionsOutput.Type;

// The operation
/**
 * Returns a list of L2 Connections attached to an edge site.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param api-version - The API version to use for this operation.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const EdgeSitesListL2Connections = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: EdgeSitesListL2ConnectionsInput,
    outputSchema: EdgeSitesListL2ConnectionsOutput,
  }),
);
// Input Schema
export const EdgeSitesUpdateTagsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Orbital/edgeSites/{edgeSiteName}",
    }),
  );
export type EdgeSitesUpdateTagsInput = typeof EdgeSitesUpdateTagsInput.Type;

// Output Schema
export const EdgeSitesUpdateTagsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type EdgeSitesUpdateTagsOutput = typeof EdgeSitesUpdateTagsOutput.Type;

// The operation
/**
 * Updates the specified edge site's tags.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param api-version - The API version to use for this operation.
 */
export const EdgeSitesUpdateTags = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: EdgeSitesUpdateTagsInput,
  outputSchema: EdgeSitesUpdateTagsOutput,
}));
// Input Schema
export const GlobalCommunicationsSitesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Orbital/globalCommunicationsSites",
    }),
  );
export type GlobalCommunicationsSitesListBySubscriptionInput =
  typeof GlobalCommunicationsSitesListBySubscriptionInput.Type;

// Output Schema
export const GlobalCommunicationsSitesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type GlobalCommunicationsSitesListBySubscriptionOutput =
  typeof GlobalCommunicationsSitesListBySubscriptionOutput.Type;

// The operation
/**
 * Returns a list of the global communications sites that a subscription is authorized to use.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param api-version - The API version to use for this operation.
 */
export const GlobalCommunicationsSitesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GlobalCommunicationsSitesListBySubscriptionInput,
    outputSchema: GlobalCommunicationsSitesListBySubscriptionOutput,
  }));
// Input Schema
export const GroundStationsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Orbital/groundStations/{groundStationName}",
    }),
  );
export type GroundStationsCreateOrUpdateInput =
  typeof GroundStationsCreateOrUpdateInput.Type;

// Output Schema
export const GroundStationsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type GroundStationsCreateOrUpdateOutput =
  typeof GroundStationsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a ground station resource.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const GroundStationsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GroundStationsCreateOrUpdateInput,
    outputSchema: GroundStationsCreateOrUpdateOutput,
  }));
// Input Schema
export const GroundStationsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Orbital/groundStations/{groundStationName}",
    }),
  );
export type GroundStationsDeleteInput = typeof GroundStationsDeleteInput.Type;

// Output Schema
export const GroundStationsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type GroundStationsDeleteOutput = typeof GroundStationsDeleteOutput.Type;

// The operation
/**
 * Deletes a specified ground station resource.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const GroundStationsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GroundStationsDeleteInput,
    outputSchema: GroundStationsDeleteOutput,
  }),
);
// Input Schema
export const GroundStationsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Orbital/groundStations/{groundStationName}",
  }),
);
export type GroundStationsGetInput = typeof GroundStationsGetInput.Type;

// Output Schema
export const GroundStationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type GroundStationsGetOutput = typeof GroundStationsGetOutput.Type;

// The operation
/**
 * Gets the specified ground station in a specified resource group.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const GroundStationsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GroundStationsGetInput,
  outputSchema: GroundStationsGetOutput,
}));
// Input Schema
export const GroundStationsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Orbital/groundStations",
    }),
  );
export type GroundStationsListInput = typeof GroundStationsListInput.Type;

// Output Schema
export const GroundStationsListOutput =
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
export type GroundStationsListOutput = typeof GroundStationsListOutput.Type;

// The operation
/**
 * Return list of ground stations.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const GroundStationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GroundStationsListInput,
  outputSchema: GroundStationsListOutput,
}));
// Input Schema
export const GroundStationsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Orbital/groundStations",
    }),
  );
export type GroundStationsListBySubscriptionInput =
  typeof GroundStationsListBySubscriptionInput.Type;

// Output Schema
export const GroundStationsListBySubscriptionOutput =
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
export type GroundStationsListBySubscriptionOutput =
  typeof GroundStationsListBySubscriptionOutput.Type;

// The operation
/**
 * Return list of ground stations.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param api-version - The API version to use for this operation.
 */
export const GroundStationsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GroundStationsListBySubscriptionInput,
    outputSchema: GroundStationsListBySubscriptionOutput,
  }));
// Input Schema
export const GroundStationsListL2ConnectionsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Orbital/groundStations/{groundStationName}/listL2Connections",
    }),
  );
export type GroundStationsListL2ConnectionsInput =
  typeof GroundStationsListL2ConnectionsInput.Type;

// Output Schema
export const GroundStationsListL2ConnectionsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type GroundStationsListL2ConnectionsOutput =
  typeof GroundStationsListL2ConnectionsOutput.Type;

// The operation
/**
 * Returns a list of L2 Connections attached to an ground station.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param api-version - The API version to use for this operation.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const GroundStationsListL2Connections =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GroundStationsListL2ConnectionsInput,
    outputSchema: GroundStationsListL2ConnectionsOutput,
  }));
// Input Schema
export const GroundStationsUpdateTagsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Orbital/groundStations/{groundStationName}",
    }),
  );
export type GroundStationsUpdateTagsInput =
  typeof GroundStationsUpdateTagsInput.Type;

// Output Schema
export const GroundStationsUpdateTagsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type GroundStationsUpdateTagsOutput =
  typeof GroundStationsUpdateTagsOutput.Type;

// The operation
/**
 * Updates the specified ground station tags.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param api-version - The API version to use for this operation.
 */
export const GroundStationsUpdateTags = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GroundStationsUpdateTagsInput,
    outputSchema: GroundStationsUpdateTagsOutput,
  }),
);
// Input Schema
export const L2ConnectionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Orbital/l2Connections/{l2ConnectionName}",
    }),
  );
export type L2ConnectionsCreateOrUpdateInput =
  typeof L2ConnectionsCreateOrUpdateInput.Type;

// Output Schema
export const L2ConnectionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type L2ConnectionsCreateOrUpdateOutput =
  typeof L2ConnectionsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates an L2 Connection.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param api-version - The API version to use for this operation.
 */
export const L2ConnectionsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: L2ConnectionsCreateOrUpdateInput,
    outputSchema: L2ConnectionsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const L2ConnectionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Orbital/l2Connections/{l2ConnectionName}",
    }),
  );
export type L2ConnectionsDeleteInput = typeof L2ConnectionsDeleteInput.Type;

// Output Schema
export const L2ConnectionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type L2ConnectionsDeleteOutput = typeof L2ConnectionsDeleteOutput.Type;

// The operation
/**
 * Deletes a specified L2 Connection resource.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param api-version - The API version to use for this operation.
 */
export const L2ConnectionsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: L2ConnectionsDeleteInput,
  outputSchema: L2ConnectionsDeleteOutput,
}));
// Input Schema
export const L2ConnectionsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Orbital/l2Connections/{l2ConnectionName}",
  }),
);
export type L2ConnectionsGetInput = typeof L2ConnectionsGetInput.Type;

// Output Schema
export const L2ConnectionsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  },
);
export type L2ConnectionsGetOutput = typeof L2ConnectionsGetOutput.Type;

// The operation
/**
 * Gets the specified L2 connection in a specified resource group.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param api-version - The API version to use for this operation.
 */
export const L2ConnectionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: L2ConnectionsGetInput,
  outputSchema: L2ConnectionsGetOutput,
}));
// Input Schema
export const L2ConnectionsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Orbital/l2Connections",
  }),
);
export type L2ConnectionsListInput = typeof L2ConnectionsListInput.Type;

// Output Schema
export const L2ConnectionsListOutput =
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
export type L2ConnectionsListOutput = typeof L2ConnectionsListOutput.Type;

// The operation
/**
 * Returns a list of L2 Connections attached to an orbital gateway.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param api-version - The API version to use for this operation.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const L2ConnectionsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: L2ConnectionsListInput,
  outputSchema: L2ConnectionsListOutput,
}));
// Input Schema
export const L2ConnectionsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Orbital/l2Connections",
    }),
  );
export type L2ConnectionsListBySubscriptionInput =
  typeof L2ConnectionsListBySubscriptionInput.Type;

// Output Schema
export const L2ConnectionsListBySubscriptionOutput =
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
export type L2ConnectionsListBySubscriptionOutput =
  typeof L2ConnectionsListBySubscriptionOutput.Type;

// The operation
/**
 * Returns a list of L2 Connections attached to a subscription.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param api-version - The API version to use for this operation.
 */
export const L2ConnectionsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: L2ConnectionsListBySubscriptionInput,
    outputSchema: L2ConnectionsListBySubscriptionOutput,
  }));
// Input Schema
export const L2ConnectionsUpdateTagsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Orbital/l2Connections/{l2ConnectionName}",
    }),
  );
export type L2ConnectionsUpdateTagsInput =
  typeof L2ConnectionsUpdateTagsInput.Type;

// Output Schema
export const L2ConnectionsUpdateTagsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type L2ConnectionsUpdateTagsOutput =
  typeof L2ConnectionsUpdateTagsOutput.Type;

// The operation
/**
 * Updates the specified L2 Connection's tags.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param api-version - The API version to use for this operation.
 */
export const L2ConnectionsUpdateTags = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: L2ConnectionsUpdateTagsInput,
    outputSchema: L2ConnectionsUpdateTagsOutput,
  }),
);
// Input Schema
export const OperationsResultsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    operationId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Orbital/locations/{location}/operationResults/{operationId}",
    }),
  );
export type OperationsResultsGetInput = typeof OperationsResultsGetInput.Type;

// Output Schema
export const OperationsResultsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    status: Schema.optional(
      Schema.Literals(["Succeeded", "Canceled", "Failed", "Running"]),
    ),
    startTime: Schema.optional(Schema.String),
    endTime: Schema.optional(Schema.String),
    percentComplete: Schema.optional(Schema.Number),
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
    properties: Schema.optional(Schema.Struct({})),
    error: Schema.optional(
      Schema.Struct({
        code: Schema.optional(Schema.String),
        message: Schema.optional(Schema.String),
      }),
    ),
  });
export type OperationsResultsGetOutput = typeof OperationsResultsGetOutput.Type;

// The operation
/**
 * Returns operation results.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 * @param location - The name of Azure region.
 * @param operationId - The ID of an ongoing async operation.
 */
export const OperationsResultsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: OperationsResultsGetInput,
    outputSchema: OperationsResultsGetOutput,
  }),
);
// Input Schema
export const SpacecraftsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Orbital/spacecrafts/{spacecraftName}",
    }),
  );
export type SpacecraftsCreateOrUpdateInput =
  typeof SpacecraftsCreateOrUpdateInput.Type;

// Output Schema
export const SpacecraftsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SpacecraftsCreateOrUpdateOutput =
  typeof SpacecraftsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a spacecraft resource.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const SpacecraftsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SpacecraftsCreateOrUpdateInput,
    outputSchema: SpacecraftsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const SpacecraftsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Orbital/spacecrafts/{spacecraftName}",
  }),
);
export type SpacecraftsDeleteInput = typeof SpacecraftsDeleteInput.Type;

// Output Schema
export const SpacecraftsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SpacecraftsDeleteOutput = typeof SpacecraftsDeleteOutput.Type;

// The operation
/**
 * Deletes a specified spacecraft resource.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const SpacecraftsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SpacecraftsDeleteInput,
  outputSchema: SpacecraftsDeleteOutput,
}));
// Input Schema
export const SpacecraftsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Orbital/spacecrafts/{spacecraftName}",
  }),
);
export type SpacecraftsGetInput = typeof SpacecraftsGetInput.Type;

// Output Schema
export const SpacecraftsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type SpacecraftsGetOutput = typeof SpacecraftsGetOutput.Type;

// The operation
/**
 * Gets the specified spacecraft in a specified resource group.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const SpacecraftsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SpacecraftsGetInput,
  outputSchema: SpacecraftsGetOutput,
}));
// Input Schema
export const SpacecraftsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Orbital/spacecrafts",
  }),
);
export type SpacecraftsListInput = typeof SpacecraftsListInput.Type;

// Output Schema
export const SpacecraftsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
export type SpacecraftsListOutput = typeof SpacecraftsListOutput.Type;

// The operation
/**
 * Returns list of spacecrafts by resource group.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const SpacecraftsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SpacecraftsListInput,
  outputSchema: SpacecraftsListOutput,
}));
// Input Schema
export const SpacecraftsListAvailableContactsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Orbital/spacecrafts/{spacecraftName}/listAvailableContacts",
    }),
  );
export type SpacecraftsListAvailableContactsInput =
  typeof SpacecraftsListAvailableContactsInput.Type;

// Output Schema
export const SpacecraftsListAvailableContactsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          spacecraft: Schema.optional(
            Schema.Struct({
              id: Schema.String,
            }),
          ),
          groundStationName: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Struct({
              maximumElevationDegrees: Schema.optional(Schema.Number),
              txStartTime: Schema.optional(Schema.String),
              txEndTime: Schema.optional(Schema.String),
              rxStartTime: Schema.optional(Schema.String),
              rxEndTime: Schema.optional(Schema.String),
              startAzimuthDegrees: Schema.optional(Schema.Number),
              endAzimuthDegrees: Schema.optional(Schema.Number),
              startElevationDegrees: Schema.optional(Schema.Number),
              endElevationDegrees: Schema.optional(Schema.Number),
            }),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type SpacecraftsListAvailableContactsOutput =
  typeof SpacecraftsListAvailableContactsOutput.Type;

// The operation
/**
 * Returns list of available contacts. A contact is available if the spacecraft is visible from the ground station for more than the minimum viable contact duration provided in the contact profile.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const SpacecraftsListAvailableContacts =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SpacecraftsListAvailableContactsInput,
    outputSchema: SpacecraftsListAvailableContactsOutput,
  }));
// Input Schema
export const SpacecraftsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Orbital/spacecrafts",
    }),
  );
export type SpacecraftsListBySubscriptionInput =
  typeof SpacecraftsListBySubscriptionInput.Type;

// Output Schema
export const SpacecraftsListBySubscriptionOutput =
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
export type SpacecraftsListBySubscriptionOutput =
  typeof SpacecraftsListBySubscriptionOutput.Type;

// The operation
/**
 * Returns list of spacecrafts by subscription.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const SpacecraftsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SpacecraftsListBySubscriptionInput,
    outputSchema: SpacecraftsListBySubscriptionOutput,
  }));
// Input Schema
export const SpacecraftsUpdateTagsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Orbital/spacecrafts/{spacecraftName}",
    }),
  );
export type SpacecraftsUpdateTagsInput = typeof SpacecraftsUpdateTagsInput.Type;

// Output Schema
export const SpacecraftsUpdateTagsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SpacecraftsUpdateTagsOutput =
  typeof SpacecraftsUpdateTagsOutput.Type;

// The operation
/**
 * Updates the specified spacecraft tags.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const SpacecraftsUpdateTags = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SpacecraftsUpdateTagsInput,
    outputSchema: SpacecraftsUpdateTagsOutput,
  }),
);
