/**
 * Azure Management API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const CheckNameAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.Management/checkNameAvailability",
    }),
  );
export type CheckNameAvailabilityInput = typeof CheckNameAvailabilityInput.Type;

// Output Schema
export const CheckNameAvailabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nameAvailable: Schema.optional(Schema.Boolean),
    reason: Schema.optional(Schema.Literals(["Invalid", "AlreadyExists"])),
    message: Schema.optional(Schema.String),
  });
export type CheckNameAvailabilityOutput =
  typeof CheckNameAvailabilityOutput.Type;

// The operation
/**
 * Checks if the specified management group name is valid and unique
 *
 * @param api-version - The API version to use for this operation.
 */
export const CheckNameAvailability = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CheckNameAvailabilityInput,
    outputSchema: CheckNameAvailabilityOutput,
  }),
);
// Input Schema
export const EntitiesListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  "api-version": Schema.String,
  $skiptoken: Schema.optional(Schema.String),
  $skip: Schema.optional(Schema.Number),
  $top: Schema.optional(Schema.Number),
  $select: Schema.optional(Schema.String),
  $search: Schema.optional(
    Schema.Literals([
      "AllowedParents",
      "AllowedChildren",
      "ParentAndFirstLevelChildren",
      "ParentOnly",
      "ChildrenOnly",
    ]),
  ),
  $filter: Schema.optional(Schema.String),
  $view: Schema.optional(
    Schema.Literals([
      "FullHierarchy",
      "GroupsOnly",
      "SubscriptionsOnly",
      "Audit",
    ]),
  ),
  groupName: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "POST",
    path: "/providers/Microsoft.Management/getEntities",
  }),
);
export type EntitiesListInput = typeof EntitiesListInput.Type;

// Output Schema
export const EntitiesListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(
    Schema.Struct({
      id: Schema.optional(Schema.NullOr(Schema.String)),
      type: Schema.optional(Schema.NullOr(Schema.String)),
      name: Schema.optional(Schema.String),
      properties: Schema.optional(
        Schema.Struct({
          tenantId: Schema.optional(Schema.NullOr(Schema.String)),
          displayName: Schema.optional(Schema.NullOr(Schema.String)),
          parent: Schema.optional(
            Schema.Struct({
              id: Schema.optional(Schema.String),
            }),
          ),
          permissions: Schema.optional(
            Schema.Literals(["noaccess", "view", "edit", "delete"]),
          ),
          inheritedPermissions: Schema.optional(
            Schema.Literals(["noaccess", "view", "edit", "delete"]),
          ),
          numberOfDescendants: Schema.optional(Schema.NullOr(Schema.Number)),
          numberOfChildren: Schema.optional(Schema.NullOr(Schema.Number)),
          numberOfChildGroups: Schema.optional(Schema.NullOr(Schema.Number)),
          parentDisplayNameChain: Schema.optional(
            Schema.NullOr(Schema.Array(Schema.String)),
          ),
          parentNameChain: Schema.optional(
            Schema.NullOr(Schema.Array(Schema.String)),
          ),
        }),
      ),
    }),
  ),
  nextLink: Schema.optional(Schema.String),
  count: Schema.optional(Schema.Number),
});
export type EntitiesListOutput = typeof EntitiesListOutput.Type;

// The operation
/**
 * List all entities (Management Groups, Subscriptions, etc.) for the authenticated user.
 *
 * @param api-version - The API version to use for this operation.
 * @param $skiptoken - Page continuation token is only used if a previous operation returned a partial result.
If a previous response contains a nextLink element, the value of the nextLink element will include a token parameter that specifies a starting point to use for subsequent calls.
 * @param $skip - Number of entities to skip over when retrieving results. Passing this in will override $skipToken.
 * @param $top - Number of elements to return when retrieving results. Passing this in will override $skipToken.
 * @param $select - This parameter specifies the fields to include in the response. Can include any combination of Name,DisplayName,Type,ParentDisplayNameChain,ParentChain, e.g. '$select=Name,DisplayName,Type,ParentDisplayNameChain,ParentNameChain'. When specified the $select parameter can override select in $skipToken.
 * @param $search - The $search parameter is used in conjunction with the $filter parameter to return three different outputs depending on the parameter passed in.
With $search=AllowedParents the API will return the entity info of all groups that the requested entity will be able to reparent to as determined by the user's permissions.
With $search=AllowedChildren the API will return the entity info of all entities that can be added as children of the requested entity.
With $search=ParentAndFirstLevelChildren the API will return the parent and  first level of children that the user has either direct access to or indirect access via one of their descendants.
With $search=ParentOnly the API will return only the group if the user has access to at least one of the descendants of the group.
With $search=ChildrenOnly the API will return only the first level of children of the group entity info specified in $filter.  The user must have direct access to the children entities or one of it's descendants for it to show up in the results.
 * @param $filter - The filter parameter allows you to filter on the the name or display name fields. You can check for equality on the name field (e.g. name eq '{entityName}')  and you can check for substrings on either the name or display name fields(e.g. contains(name, '{substringToSearch}'), contains(displayName, '{substringToSearch')). Note that the '{entityName}' and '{substringToSearch}' fields are checked case insensitively.
 * @param $view - The view parameter allows clients to filter the type of data that is returned by the getEntities call.
 * @param groupName - A filter which allows the get entities call to focus on a particular group (i.e. "$filter=name eq 'groupName'")
 * @param Cache-Control - Indicates whether the request should utilize any caches. Populate the header with 'no-cache' value to bypass existing caches.
 */
export const EntitiesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: EntitiesListInput,
  outputSchema: EntitiesListOutput,
}));
// Input Schema
export const HierarchySettingsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/providers/Microsoft.Management/managementGroups/{groupId}/settings/default",
    }),
  );
export type HierarchySettingsCreateOrUpdateInput =
  typeof HierarchySettingsCreateOrUpdateInput.Type;

// Output Schema
export const HierarchySettingsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type HierarchySettingsCreateOrUpdateOutput =
  typeof HierarchySettingsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates the hierarchy settings defined at the Management Group level.
 *
 * @param api-version - The API version to use for this operation.
 * @param groupId - Management Group ID.
 */
export const HierarchySettingsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: HierarchySettingsCreateOrUpdateInput,
    outputSchema: HierarchySettingsCreateOrUpdateOutput,
  }));
// Input Schema
export const HierarchySettingsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/providers/Microsoft.Management/managementGroups/{groupId}/settings/default",
    }),
  );
export type HierarchySettingsDeleteInput =
  typeof HierarchySettingsDeleteInput.Type;

// Output Schema
export const HierarchySettingsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type HierarchySettingsDeleteOutput =
  typeof HierarchySettingsDeleteOutput.Type;

// The operation
/**
 * Deletes the hierarchy settings defined at the Management Group level.
 *
 * @param api-version - The API version to use for this operation.
 * @param groupId - Management Group ID.
 */
export const HierarchySettingsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: HierarchySettingsDeleteInput,
    outputSchema: HierarchySettingsDeleteOutput,
  }),
);
// Input Schema
export const HierarchySettingsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Management/managementGroups/{groupId}/settings/default",
    }),
  );
export type HierarchySettingsGetInput = typeof HierarchySettingsGetInput.Type;

// Output Schema
export const HierarchySettingsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type HierarchySettingsGetOutput = typeof HierarchySettingsGetOutput.Type;

// The operation
/**
 * Gets the hierarchy settings defined at the Management Group level. Settings can only be set on the root Management Group of the hierarchy.
 *
 * @param api-version - The API version to use for this operation.
 * @param groupId - Management Group ID.
 */
export const HierarchySettingsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: HierarchySettingsGetInput,
    outputSchema: HierarchySettingsGetOutput,
  }),
);
// Input Schema
export const HierarchySettingsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Management/managementGroups/{groupId}/settings",
    }),
  );
export type HierarchySettingsListInput = typeof HierarchySettingsListInput.Type;

// Output Schema
export const HierarchySettingsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Struct({
              tenantId: Schema.optional(Schema.String),
              requireAuthorizationForGroupCreation: Schema.optional(
                Schema.Boolean,
              ),
              defaultManagementGroup: Schema.optional(Schema.String),
            }),
          ),
        }),
      ),
    ),
    "@nextLink": Schema.optional(Schema.String),
  });
export type HierarchySettingsListOutput =
  typeof HierarchySettingsListOutput.Type;

// The operation
/**
 * Gets all the hierarchy settings defined at the Management Group level. Settings can only be set on the root Management Group of the hierarchy.
 *
 * @param api-version - The API version to use for this operation.
 * @param groupId - Management Group ID.
 */
export const HierarchySettingsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: HierarchySettingsListInput,
    outputSchema: HierarchySettingsListOutput,
  }),
);
// Input Schema
export const HierarchySettingsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/providers/Microsoft.Management/managementGroups/{groupId}/settings/default",
    }),
  );
export type HierarchySettingsUpdateInput =
  typeof HierarchySettingsUpdateInput.Type;

// Output Schema
export const HierarchySettingsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type HierarchySettingsUpdateOutput =
  typeof HierarchySettingsUpdateOutput.Type;

// The operation
/**
 * Updates the hierarchy settings defined at the Management Group level.
 *
 * @param api-version - The API version to use for this operation.
 * @param groupId - Management Group ID.
 */
export const HierarchySettingsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: HierarchySettingsUpdateInput,
    outputSchema: HierarchySettingsUpdateOutput,
  }),
);
// Input Schema
export const ManagementGroupsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/providers/Microsoft.Management/managementGroups/{groupId}",
    }),
  );
export type ManagementGroupsCreateOrUpdateInput =
  typeof ManagementGroupsCreateOrUpdateInput.Type;

// Output Schema
export const ManagementGroupsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagementGroupsCreateOrUpdateOutput =
  typeof ManagementGroupsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a management group.
 * If a management group is already created and a subsequent create request is issued with different properties, the management group properties will be updated.
 *
 * @param api-version - The API version to use for this operation.
 * @param groupId - Management Group ID.
 * @param Cache-Control - Indicates whether the request should utilize any caches. Populate the header with 'no-cache' value to bypass existing caches.
 */
export const ManagementGroupsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagementGroupsCreateOrUpdateInput,
    outputSchema: ManagementGroupsCreateOrUpdateOutput,
  }));
// Input Schema
export const ManagementGroupsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/providers/Microsoft.Management/managementGroups/{groupId}",
    }),
  );
export type ManagementGroupsDeleteInput =
  typeof ManagementGroupsDeleteInput.Type;

// Output Schema
export const ManagementGroupsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ManagementGroupsDeleteOutput =
  typeof ManagementGroupsDeleteOutput.Type;

// The operation
/**
 * Delete management group.
 * If a management group contains child resources, the request will fail.
 *
 * @param api-version - The API version to use for this operation.
 * @param groupId - Management Group ID.
 * @param Cache-Control - Indicates whether the request should utilize any caches. Populate the header with 'no-cache' value to bypass existing caches.
 */
export const ManagementGroupsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ManagementGroupsDeleteInput,
    outputSchema: ManagementGroupsDeleteOutput,
  }),
);
// Input Schema
export const ManagementGroupsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $expand: Schema.optional(
      Schema.Literals(["children", "path", "ancestors"]),
    ),
    $recurse: Schema.optional(Schema.Boolean),
    $filter: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Management/managementGroups/{groupId}",
    }),
  );
export type ManagementGroupsGetInput = typeof ManagementGroupsGetInput.Type;

// Output Schema
export const ManagementGroupsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagementGroupsGetOutput = typeof ManagementGroupsGetOutput.Type;

// The operation
/**
 * Get the details of the management group.
 *
 * @param api-version - The API version to use for this operation.
 * @param groupId - Management Group ID.
 * @param $expand - The $expand=children query string parameter allows clients to request inclusion of children in the response payload.  $expand=path includes the path from the root group to the current group.  $expand=ancestors includes the ancestor Ids of the current group.
 * @param $recurse - The $recurse=true query string parameter allows clients to request inclusion of entire hierarchy in the response payload. Note that  $expand=children must be passed up if $recurse is set to true.
 * @param $filter - A filter which allows the exclusion of subscriptions from results (i.e. '$filter=children.childType ne Subscription')
 * @param Cache-Control - Indicates whether the request should utilize any caches. Populate the header with 'no-cache' value to bypass existing caches.
 */
export const ManagementGroupsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ManagementGroupsGetInput,
  outputSchema: ManagementGroupsGetOutput,
}));
// Input Schema
export const ManagementGroupsGetDescendantsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $skiptoken: Schema.optional(Schema.String),
    $top: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Management/managementGroups/{groupId}/descendants",
    }),
  );
export type ManagementGroupsGetDescendantsInput =
  typeof ManagementGroupsGetDescendantsInput.Type;

// Output Schema
export const ManagementGroupsGetDescendantsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.NullOr(Schema.String)),
        type: Schema.optional(Schema.NullOr(Schema.String)),
        name: Schema.optional(Schema.String),
        properties: Schema.optional(
          Schema.Struct({
            displayName: Schema.optional(Schema.NullOr(Schema.String)),
            parent: Schema.optional(
              Schema.Struct({
                id: Schema.optional(Schema.String),
              }),
            ),
          }),
        ),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ManagementGroupsGetDescendantsOutput =
  typeof ManagementGroupsGetDescendantsOutput.Type;

// The operation
/**
 * List all entities that descend from a management group.
 *
 * @param api-version - The API version to use for this operation.
 * @param groupId - Management Group ID.
 * @param $skiptoken - Page continuation token is only used if a previous operation returned a partial result.
If a previous response contains a nextLink element, the value of the nextLink element will include a token parameter that specifies a starting point to use for subsequent calls.
 * @param $top - Number of elements to return when retrieving results. Passing this in will override $skipToken.
 */
export const ManagementGroupsGetDescendants =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagementGroupsGetDescendantsInput,
    outputSchema: ManagementGroupsGetDescendantsOutput,
  }));
// Input Schema
export const ManagementGroupsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
    $skiptoken: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Management/managementGroups",
    }),
  );
export type ManagementGroupsListInput = typeof ManagementGroupsListInput.Type;

// Output Schema
export const ManagementGroupsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Struct({
              tenantId: Schema.optional(Schema.String),
              displayName: Schema.optional(Schema.String),
            }),
          ),
        }),
      ),
    ),
    "@nextLink": Schema.optional(Schema.String),
  });
export type ManagementGroupsListOutput = typeof ManagementGroupsListOutput.Type;

// The operation
/**
 * List management groups for the authenticated user.
 *
 * @param api-version - The API version to use for this operation.
 * @param Cache-Control - Indicates whether the request should utilize any caches. Populate the header with 'no-cache' value to bypass existing caches.
 * @param $skiptoken - Page continuation token is only used if a previous operation returned a partial result.
If a previous response contains a nextLink element, the value of the nextLink element will include a token parameter that specifies a starting point to use for subsequent calls.
 */
export const ManagementGroupsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ManagementGroupsListInput,
    outputSchema: ManagementGroupsListOutput,
  }),
);
// Input Schema
export const ManagementGroupSubscriptionsCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/providers/Microsoft.Management/managementGroups/{groupId}/subscriptions/{subscriptionId}",
    }),
  );
export type ManagementGroupSubscriptionsCreateInput =
  typeof ManagementGroupSubscriptionsCreateInput.Type;

// Output Schema
export const ManagementGroupSubscriptionsCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagementGroupSubscriptionsCreateOutput =
  typeof ManagementGroupSubscriptionsCreateOutput.Type;

// The operation
/**
 * Associates existing subscription with the management group.
 *
 * @param api-version - The API version to use for this operation.
 * @param groupId - Management Group ID.
 * @param subscriptionId - Subscription ID.
 * @param Cache-Control - Indicates whether the request should utilize any caches. Populate the header with 'no-cache' value to bypass existing caches.
 */
export const ManagementGroupSubscriptionsCreate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagementGroupSubscriptionsCreateInput,
    outputSchema: ManagementGroupSubscriptionsCreateOutput,
  }));
// Input Schema
export const ManagementGroupSubscriptionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/providers/Microsoft.Management/managementGroups/{groupId}/subscriptions/{subscriptionId}",
    }),
  );
export type ManagementGroupSubscriptionsDeleteInput =
  typeof ManagementGroupSubscriptionsDeleteInput.Type;

// Output Schema
export const ManagementGroupSubscriptionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ManagementGroupSubscriptionsDeleteOutput =
  typeof ManagementGroupSubscriptionsDeleteOutput.Type;

// The operation
/**
 * De-associates subscription from the management group.
 *
 * @param api-version - The API version to use for this operation.
 * @param groupId - Management Group ID.
 * @param subscriptionId - Subscription ID.
 * @param Cache-Control - Indicates whether the request should utilize any caches. Populate the header with 'no-cache' value to bypass existing caches.
 */
export const ManagementGroupSubscriptionsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagementGroupSubscriptionsDeleteInput,
    outputSchema: ManagementGroupSubscriptionsDeleteOutput,
  }));
// Input Schema
export const ManagementGroupSubscriptionsGetSubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Management/managementGroups/{groupId}/subscriptions/{subscriptionId}",
    }),
  );
export type ManagementGroupSubscriptionsGetSubscriptionInput =
  typeof ManagementGroupSubscriptionsGetSubscriptionInput.Type;

// Output Schema
export const ManagementGroupSubscriptionsGetSubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagementGroupSubscriptionsGetSubscriptionOutput =
  typeof ManagementGroupSubscriptionsGetSubscriptionOutput.Type;

// The operation
/**
 * Retrieves details about given subscription which is associated with the management group.
 *
 * @param api-version - The API version to use for this operation.
 * @param groupId - Management Group ID.
 * @param subscriptionId - Subscription ID.
 * @param Cache-Control - Indicates whether the request should utilize any caches. Populate the header with 'no-cache' value to bypass existing caches.
 */
export const ManagementGroupSubscriptionsGetSubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagementGroupSubscriptionsGetSubscriptionInput,
    outputSchema: ManagementGroupSubscriptionsGetSubscriptionOutput,
  }));
// Input Schema
export const ManagementGroupSubscriptionsGetSubscriptionsUnderManagementGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $skiptoken: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Management/managementGroups/{groupId}/subscriptions",
    }),
  );
export type ManagementGroupSubscriptionsGetSubscriptionsUnderManagementGroupInput =
  typeof ManagementGroupSubscriptionsGetSubscriptionsUnderManagementGroupInput.Type;

// Output Schema
export const ManagementGroupSubscriptionsGetSubscriptionsUnderManagementGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type ManagementGroupSubscriptionsGetSubscriptionsUnderManagementGroupOutput =
  typeof ManagementGroupSubscriptionsGetSubscriptionsUnderManagementGroupOutput.Type;

// The operation
/**
 * Retrieves details about all subscriptions which are associated with the management group.
 *
 * @param api-version - The API version to use for this operation.
 * @param groupId - Management Group ID.
 * @param $skiptoken - Page continuation token is only used if a previous operation returned a partial result.
If a previous response contains a nextLink element, the value of the nextLink element will include a token parameter that specifies a starting point to use for subsequent calls.
 */
export const ManagementGroupSubscriptionsGetSubscriptionsUnderManagementGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      ManagementGroupSubscriptionsGetSubscriptionsUnderManagementGroupInput,
    outputSchema:
      ManagementGroupSubscriptionsGetSubscriptionsUnderManagementGroupOutput,
  }));
// Input Schema
export const ManagementGroupsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/providers/Microsoft.Management/managementGroups/{groupId}",
    }),
  );
export type ManagementGroupsUpdateInput =
  typeof ManagementGroupsUpdateInput.Type;

// Output Schema
export const ManagementGroupsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagementGroupsUpdateOutput =
  typeof ManagementGroupsUpdateOutput.Type;

// The operation
/**
 * Update a management group.
 *
 * @param api-version - The API version to use for this operation.
 * @param groupId - Management Group ID.
 * @param Cache-Control - Indicates whether the request should utilize any caches. Populate the header with 'no-cache' value to bypass existing caches.
 */
export const ManagementGroupsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ManagementGroupsUpdateInput,
    outputSchema: ManagementGroupsUpdateOutput,
  }),
);
// Input Schema
export const StartTenantBackfillInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.Management/startTenantBackfill",
    }),
  );
export type StartTenantBackfillInput = typeof StartTenantBackfillInput.Type;

// Output Schema
export const StartTenantBackfillOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tenantId: Schema.optional(Schema.String),
    status: Schema.optional(
      Schema.Literals([
        "NotStarted",
        "NotStartedButGroupsExist",
        "Started",
        "Failed",
        "Cancelled",
        "Completed",
      ]),
    ),
  });
export type StartTenantBackfillOutput = typeof StartTenantBackfillOutput.Type;

// The operation
/**
 * Starts backfilling subscriptions for the Tenant.
 *
 * @param api-version - The API version to use for this operation.
 */
export const StartTenantBackfill = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: StartTenantBackfillInput,
  outputSchema: StartTenantBackfillOutput,
}));
// Input Schema
export const TenantBackfillStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.Management/tenantBackfillStatus",
    }),
  );
export type TenantBackfillStatusInput = typeof TenantBackfillStatusInput.Type;

// Output Schema
export const TenantBackfillStatusOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tenantId: Schema.optional(Schema.String),
    status: Schema.optional(
      Schema.Literals([
        "NotStarted",
        "NotStartedButGroupsExist",
        "Started",
        "Failed",
        "Cancelled",
        "Completed",
      ]),
    ),
  });
export type TenantBackfillStatusOutput = typeof TenantBackfillStatusOutput.Type;

// The operation
/**
 * Gets tenant backfill status
 *
 * @param api-version - The API version to use for this operation.
 */
export const TenantBackfillStatus = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: TenantBackfillStatusInput,
    outputSchema: TenantBackfillStatusOutput,
  }),
);
