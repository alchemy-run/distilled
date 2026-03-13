/**
 * Azure Securityinsights API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const ActionsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/alertRules/{ruleId}/actions/{actionId}",
  }),
);
export type ActionsDeleteInput = typeof ActionsDeleteInput.Type;

// Output Schema
export const ActionsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ActionsDeleteOutput = typeof ActionsDeleteOutput.Type;

// The operation
/**
 * Delete the action of alert rule.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const ActionsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ActionsDeleteInput,
  outputSchema: ActionsDeleteOutput,
}));
// Input Schema
export const AlertRulesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/alertRules/{ruleId}",
    }),
  );
export type AlertRulesCreateOrUpdateInput =
  typeof AlertRulesCreateOrUpdateInput.Type;

// Output Schema
export const AlertRulesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    etag: Schema.optional(Schema.String),
  });
export type AlertRulesCreateOrUpdateOutput =
  typeof AlertRulesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates the alert rule.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const AlertRulesCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AlertRulesCreateOrUpdateInput,
    outputSchema: AlertRulesCreateOrUpdateOutput,
  }),
);
// Input Schema
export const AlertRulesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/alertRules/{ruleId}",
  }),
);
export type AlertRulesDeleteInput = typeof AlertRulesDeleteInput.Type;

// Output Schema
export const AlertRulesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AlertRulesDeleteOutput = typeof AlertRulesDeleteOutput.Type;

// The operation
/**
 * Delete the alert rule.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const AlertRulesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AlertRulesDeleteInput,
  outputSchema: AlertRulesDeleteOutput,
}));
// Input Schema
export const AlertRulesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/alertRules/{ruleId}",
  }),
);
export type AlertRulesGetInput = typeof AlertRulesGetInput.Type;

// Output Schema
export const AlertRulesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  etag: Schema.optional(Schema.String),
});
export type AlertRulesGetOutput = typeof AlertRulesGetOutput.Type;

// The operation
/**
 * Gets the alert rule.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const AlertRulesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AlertRulesGetInput,
  outputSchema: AlertRulesGetOutput,
}));
// Input Schema
export const AlertRulesListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/alertRules",
  }),
);
export type AlertRulesListInput = typeof AlertRulesListInput.Type;

// Output Schema
export const AlertRulesListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  nextLink: Schema.optional(Schema.String),
  value: Schema.Array(
    Schema.Struct({
      etag: Schema.optional(Schema.String),
    }),
  ),
});
export type AlertRulesListOutput = typeof AlertRulesListOutput.Type;

// The operation
/**
 * Gets all alert rules.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const AlertRulesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AlertRulesListInput,
  outputSchema: AlertRulesListOutput,
}));
// Input Schema
export const AutomationRulesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/automationRules/{automationRuleId}",
    }),
  );
export type AutomationRulesCreateOrUpdateInput =
  typeof AutomationRulesCreateOrUpdateInput.Type;

// Output Schema
export const AutomationRulesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    etag: Schema.optional(Schema.String),
  });
export type AutomationRulesCreateOrUpdateOutput =
  typeof AutomationRulesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates the automation rule.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const AutomationRulesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AutomationRulesCreateOrUpdateInput,
    outputSchema: AutomationRulesCreateOrUpdateOutput,
  }));
// Input Schema
export const AutomationRulesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/automationRules/{automationRuleId}",
    }),
  );
export type AutomationRulesDeleteInput = typeof AutomationRulesDeleteInput.Type;

// Output Schema
export const AutomationRulesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown;
export type AutomationRulesDeleteOutput =
  typeof AutomationRulesDeleteOutput.Type;

// The operation
/**
 * Delete the automation rule.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const AutomationRulesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AutomationRulesDeleteInput,
    outputSchema: AutomationRulesDeleteOutput,
  }),
);
// Input Schema
export const AutomationRulesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/automationRules/{automationRuleId}",
    }),
  );
export type AutomationRulesGetInput = typeof AutomationRulesGetInput.Type;

// Output Schema
export const AutomationRulesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    etag: Schema.optional(Schema.String),
  });
export type AutomationRulesGetOutput = typeof AutomationRulesGetOutput.Type;

// The operation
/**
 * Gets the automation rule.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const AutomationRulesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AutomationRulesGetInput,
  outputSchema: AutomationRulesGetOutput,
}));
// Input Schema
export const AutomationRulesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/automationRules",
    }),
  );
export type AutomationRulesListInput = typeof AutomationRulesListInput.Type;

// Output Schema
export const AutomationRulesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          etag: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type AutomationRulesListOutput = typeof AutomationRulesListOutput.Type;

// The operation
/**
 * Gets all automation rules.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const AutomationRulesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AutomationRulesListInput,
  outputSchema: AutomationRulesListOutput,
}));
// Input Schema
export const BookmarksCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/bookmarks/{bookmarkId}",
    }),
  );
export type BookmarksCreateOrUpdateInput =
  typeof BookmarksCreateOrUpdateInput.Type;

// Output Schema
export const BookmarksCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    etag: Schema.optional(Schema.String),
  });
export type BookmarksCreateOrUpdateOutput =
  typeof BookmarksCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates the bookmark.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const BookmarksCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: BookmarksCreateOrUpdateInput,
    outputSchema: BookmarksCreateOrUpdateOutput,
  }),
);
// Input Schema
export const BookmarksDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/bookmarks/{bookmarkId}",
  }),
);
export type BookmarksDeleteInput = typeof BookmarksDeleteInput.Type;

// Output Schema
export const BookmarksDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type BookmarksDeleteOutput = typeof BookmarksDeleteOutput.Type;

// The operation
/**
 * Delete the bookmark.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const BookmarksDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: BookmarksDeleteInput,
  outputSchema: BookmarksDeleteOutput,
}));
// Input Schema
export const BookmarksGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/bookmarks/{bookmarkId}",
  }),
);
export type BookmarksGetInput = typeof BookmarksGetInput.Type;

// Output Schema
export const BookmarksGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  etag: Schema.optional(Schema.String),
});
export type BookmarksGetOutput = typeof BookmarksGetOutput.Type;

// The operation
/**
 * Gets a bookmark.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const BookmarksGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: BookmarksGetInput,
  outputSchema: BookmarksGetOutput,
}));
// Input Schema
export const BookmarksListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/bookmarks",
  }),
);
export type BookmarksListInput = typeof BookmarksListInput.Type;

// Output Schema
export const BookmarksListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  nextLink: Schema.optional(Schema.String),
  value: Schema.Array(
    Schema.Struct({
      etag: Schema.optional(Schema.String),
    }),
  ),
});
export type BookmarksListOutput = typeof BookmarksListOutput.Type;

// The operation
/**
 * Gets all bookmarks.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const BookmarksList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: BookmarksListInput,
  outputSchema: BookmarksListOutput,
}));
// Input Schema
export const ContentPackageInstallInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/contentPackages/{packageId}",
    }),
  );
export type ContentPackageInstallInput = typeof ContentPackageInstallInput.Type;

// Output Schema
export const ContentPackageInstallOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    etag: Schema.optional(Schema.String),
  });
export type ContentPackageInstallOutput =
  typeof ContentPackageInstallOutput.Type;

// The operation
/**
 * Install a package to the workspace.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const ContentPackageInstall = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ContentPackageInstallInput,
    outputSchema: ContentPackageInstallOutput,
  }),
);
// Input Schema
export const ContentPackagesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/contentPackages/{packageId}",
    }),
  );
export type ContentPackagesGetInput = typeof ContentPackagesGetInput.Type;

// Output Schema
export const ContentPackagesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    etag: Schema.optional(Schema.String),
  });
export type ContentPackagesGetOutput = typeof ContentPackagesGetOutput.Type;

// The operation
/**
 * Gets an installed packages by its id.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const ContentPackagesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ContentPackagesGetInput,
  outputSchema: ContentPackagesGetOutput,
}));
// Input Schema
export const ContentPackagesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $filter: Schema.optional(Schema.String),
    $orderby: Schema.optional(Schema.String),
    $search: Schema.optional(Schema.String),
    $count: Schema.optional(Schema.Boolean),
    $top: Schema.optional(Schema.Number),
    $skip: Schema.optional(Schema.Number),
    $skipToken: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/contentPackages",
    }),
  );
export type ContentPackagesListInput = typeof ContentPackagesListInput.Type;

// Output Schema
export const ContentPackagesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.Array(
      Schema.Struct({
        etag: Schema.optional(Schema.String),
      }),
    ),
  });
export type ContentPackagesListOutput = typeof ContentPackagesListOutput.Type;

// The operation
/**
 * Gets all installed packages.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param $filter - Filters the results, based on a Boolean condition. Optional.
 * @param $orderby - Sorts the results. Optional.
 * @param $search - Searches for a substring in the response. Optional.
 * @param $count - Instructs the server to return only object count without actual body. Optional.
 * @param $top - Returns only the first n results. Optional.
 * @param $skip - Used to skip n elements in the OData query (offset). Returns a nextLink to the next page of results if there are any left.
 * @param $skipToken - Skiptoken is only used if a previous operation returned a partial result. If a previous response contains a nextLink element, the value of the nextLink element will include a skiptoken parameter that specifies a starting point to use for subsequent calls. Optional.
 */
export const ContentPackagesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ContentPackagesListInput,
  outputSchema: ContentPackagesListOutput,
}));
// Input Schema
export const ContentPackageUninstallInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/contentPackages/{packageId}",
    }),
  );
export type ContentPackageUninstallInput =
  typeof ContentPackageUninstallInput.Type;

// Output Schema
export const ContentPackageUninstallOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ContentPackageUninstallOutput =
  typeof ContentPackageUninstallOutput.Type;

// The operation
/**
 * Uninstall a package from the workspace.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const ContentPackageUninstall = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ContentPackageUninstallInput,
    outputSchema: ContentPackageUninstallOutput,
  }),
);
// Input Schema
export const ContentTemplateDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/contentTemplates/{templateId}",
    }),
  );
export type ContentTemplateDeleteInput = typeof ContentTemplateDeleteInput.Type;

// Output Schema
export const ContentTemplateDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ContentTemplateDeleteOutput =
  typeof ContentTemplateDeleteOutput.Type;

// The operation
/**
 * Delete an installed template.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const ContentTemplateDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ContentTemplateDeleteInput,
    outputSchema: ContentTemplateDeleteOutput,
  }),
);
// Input Schema
export const ContentTemplateGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/contentTemplates/{templateId}",
    }),
  );
export type ContentTemplateGetInput = typeof ContentTemplateGetInput.Type;

// Output Schema
export const ContentTemplateGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    etag: Schema.optional(Schema.String),
  });
export type ContentTemplateGetOutput = typeof ContentTemplateGetOutput.Type;

// The operation
/**
 * Gets a template byt its identifier.
 * Expandable properties:
 * - properties/mainTemplate
 * - properties/dependantTemplates
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const ContentTemplateGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ContentTemplateGetInput,
  outputSchema: ContentTemplateGetOutput,
}));
// Input Schema
export const ContentTemplateInstallInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/contentTemplates/{templateId}",
    }),
  );
export type ContentTemplateInstallInput =
  typeof ContentTemplateInstallInput.Type;

// Output Schema
export const ContentTemplateInstallOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    etag: Schema.optional(Schema.String),
  });
export type ContentTemplateInstallOutput =
  typeof ContentTemplateInstallOutput.Type;

// The operation
/**
 * Install a template.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const ContentTemplateInstall = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ContentTemplateInstallInput,
    outputSchema: ContentTemplateInstallOutput,
  }),
);
// Input Schema
export const ContentTemplatesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $filter: Schema.optional(Schema.String),
    $orderby: Schema.optional(Schema.String),
    $expand: Schema.optional(Schema.String),
    $search: Schema.optional(Schema.String),
    $count: Schema.optional(Schema.Boolean),
    $top: Schema.optional(Schema.Number),
    $skip: Schema.optional(Schema.Number),
    $skipToken: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/contentTemplates",
    }),
  );
export type ContentTemplatesListInput = typeof ContentTemplatesListInput.Type;

// Output Schema
export const ContentTemplatesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        etag: Schema.optional(Schema.String),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ContentTemplatesListOutput = typeof ContentTemplatesListOutput.Type;

// The operation
/**
 * Gets all installed templates.
 * Expandable properties:
 * - properties/mainTemplate
 * - properties/dependantTemplates
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param $filter - Filters the results, based on a Boolean condition. Optional.
 * @param $orderby - Sorts the results. Optional.
 * @param $expand - Expands the object with optional fiends that are not included by default. Optional.
 * @param $search - Searches for a substring in the response. Optional.
 * @param $count - Instructs the server to return only object count without actual body. Optional.
 * @param $top - Returns only the first n results. Optional.
 * @param $skip - Used to skip n elements in the OData query (offset). Returns a nextLink to the next page of results if there are any left.
 * @param $skipToken - Skiptoken is only used if a previous operation returned a partial result. If a previous response contains a nextLink element, the value of the nextLink element will include a skiptoken parameter that specifies a starting point to use for subsequent calls. Optional.
 */
export const ContentTemplatesList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ContentTemplatesListInput,
    outputSchema: ContentTemplatesListOutput,
  }),
);
// Input Schema
export const DataConnectorDefinitionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/dataConnectorDefinitions/{dataConnectorDefinitionName}",
    }),
  );
export type DataConnectorDefinitionsCreateOrUpdateInput =
  typeof DataConnectorDefinitionsCreateOrUpdateInput.Type;

// Output Schema
export const DataConnectorDefinitionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    etag: Schema.optional(Schema.String),
  });
export type DataConnectorDefinitionsCreateOrUpdateOutput =
  typeof DataConnectorDefinitionsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates the data connector definition.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param api-version - The API version to use for this operation.
 */
export const DataConnectorDefinitionsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DataConnectorDefinitionsCreateOrUpdateInput,
    outputSchema: DataConnectorDefinitionsCreateOrUpdateOutput,
  }));
// Input Schema
export const DataConnectorDefinitionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/dataConnectorDefinitions/{dataConnectorDefinitionName}",
    }),
  );
export type DataConnectorDefinitionsDeleteInput =
  typeof DataConnectorDefinitionsDeleteInput.Type;

// Output Schema
export const DataConnectorDefinitionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DataConnectorDefinitionsDeleteOutput =
  typeof DataConnectorDefinitionsDeleteOutput.Type;

// The operation
/**
 * Delete the data connector definition.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param api-version - The API version to use for this operation.
 */
export const DataConnectorDefinitionsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DataConnectorDefinitionsDeleteInput,
    outputSchema: DataConnectorDefinitionsDeleteOutput,
  }));
// Input Schema
export const DataConnectorDefinitionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/dataConnectorDefinitions/{dataConnectorDefinitionName}",
    }),
  );
export type DataConnectorDefinitionsGetInput =
  typeof DataConnectorDefinitionsGetInput.Type;

// Output Schema
export const DataConnectorDefinitionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    etag: Schema.optional(Schema.String),
  });
export type DataConnectorDefinitionsGetOutput =
  typeof DataConnectorDefinitionsGetOutput.Type;

// The operation
/**
 * Gets a data connector definition.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param api-version - The API version to use for this operation.
 */
export const DataConnectorDefinitionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DataConnectorDefinitionsGetInput,
    outputSchema: DataConnectorDefinitionsGetOutput,
  }),
);
// Input Schema
export const DataConnectorDefinitionsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/dataConnectorDefinitions",
    }),
  );
export type DataConnectorDefinitionsListInput =
  typeof DataConnectorDefinitionsListInput.Type;

// Output Schema
export const DataConnectorDefinitionsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          etag: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type DataConnectorDefinitionsListOutput =
  typeof DataConnectorDefinitionsListOutput.Type;

// The operation
/**
 * Gets all data connector definitions.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param api-version - The API version to use for this operation.
 */
export const DataConnectorDefinitionsList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DataConnectorDefinitionsListInput,
    outputSchema: DataConnectorDefinitionsListOutput,
  }));
// Input Schema
export const DataConnectorsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/dataConnectors/{dataConnectorId}",
    }),
  );
export type DataConnectorsCreateOrUpdateInput =
  typeof DataConnectorsCreateOrUpdateInput.Type;

// Output Schema
export const DataConnectorsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    etag: Schema.optional(Schema.String),
  });
export type DataConnectorsCreateOrUpdateOutput =
  typeof DataConnectorsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates the data connector.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const DataConnectorsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DataConnectorsCreateOrUpdateInput,
    outputSchema: DataConnectorsCreateOrUpdateOutput,
  }));
// Input Schema
export const DataConnectorsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/dataConnectors/{dataConnectorId}",
    }),
  );
export type DataConnectorsDeleteInput = typeof DataConnectorsDeleteInput.Type;

// Output Schema
export const DataConnectorsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DataConnectorsDeleteOutput = typeof DataConnectorsDeleteOutput.Type;

// The operation
/**
 * Delete the data connector.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const DataConnectorsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DataConnectorsDeleteInput,
    outputSchema: DataConnectorsDeleteOutput,
  }),
);
// Input Schema
export const DataConnectorsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/dataConnectors/{dataConnectorId}",
  }),
);
export type DataConnectorsGetInput = typeof DataConnectorsGetInput.Type;

// Output Schema
export const DataConnectorsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    etag: Schema.optional(Schema.String),
  });
export type DataConnectorsGetOutput = typeof DataConnectorsGetOutput.Type;

// The operation
/**
 * Gets a data connector.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const DataConnectorsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DataConnectorsGetInput,
  outputSchema: DataConnectorsGetOutput,
}));
// Input Schema
export const DataConnectorsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/dataConnectors",
    }),
  );
export type DataConnectorsListInput = typeof DataConnectorsListInput.Type;

// Output Schema
export const DataConnectorsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.Array(
      Schema.Struct({
        etag: Schema.optional(Schema.String),
      }),
    ),
  });
export type DataConnectorsListOutput = typeof DataConnectorsListOutput.Type;

// The operation
/**
 * Gets all data connectors.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const DataConnectorsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DataConnectorsListInput,
  outputSchema: DataConnectorsListOutput,
}));
// Input Schema
export const EntitiesRunPlaybookInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    entityIdentifier: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/entities/{entityIdentifier}/runPlaybook",
    }),
  );
export type EntitiesRunPlaybookInput = typeof EntitiesRunPlaybookInput.Type;

// Output Schema
export const EntitiesRunPlaybookOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type EntitiesRunPlaybookOutput = typeof EntitiesRunPlaybookOutput.Type;

// The operation
/**
 * Triggers playbook on a specific entity.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param entityIdentifier - Entity ID
 */
export const EntitiesRunPlaybook = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: EntitiesRunPlaybookInput,
  outputSchema: EntitiesRunPlaybookOutput,
}));
// Input Schema
export const IncidentCommentsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/incidents/{incidentId}/comments/{incidentCommentId}",
    }),
  );
export type IncidentCommentsCreateOrUpdateInput =
  typeof IncidentCommentsCreateOrUpdateInput.Type;

// Output Schema
export const IncidentCommentsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    etag: Schema.optional(Schema.String),
  });
export type IncidentCommentsCreateOrUpdateOutput =
  typeof IncidentCommentsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a comment for a given incident.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const IncidentCommentsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IncidentCommentsCreateOrUpdateInput,
    outputSchema: IncidentCommentsCreateOrUpdateOutput,
  }));
// Input Schema
export const IncidentCommentsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/incidents/{incidentId}/comments/{incidentCommentId}",
    }),
  );
export type IncidentCommentsDeleteInput =
  typeof IncidentCommentsDeleteInput.Type;

// Output Schema
export const IncidentCommentsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type IncidentCommentsDeleteOutput =
  typeof IncidentCommentsDeleteOutput.Type;

// The operation
/**
 * Deletes a comment for a given incident.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const IncidentCommentsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IncidentCommentsDeleteInput,
    outputSchema: IncidentCommentsDeleteOutput,
  }),
);
// Input Schema
export const IncidentCommentsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/incidents/{incidentId}/comments/{incidentCommentId}",
    }),
  );
export type IncidentCommentsGetInput = typeof IncidentCommentsGetInput.Type;

// Output Schema
export const IncidentCommentsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    etag: Schema.optional(Schema.String),
  });
export type IncidentCommentsGetOutput = typeof IncidentCommentsGetOutput.Type;

// The operation
/**
 * Gets a comment for a given incident.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const IncidentCommentsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: IncidentCommentsGetInput,
  outputSchema: IncidentCommentsGetOutput,
}));
// Input Schema
export const IncidentCommentsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $filter: Schema.optional(Schema.String),
    $orderby: Schema.optional(Schema.String),
    $top: Schema.optional(Schema.Number),
    $skipToken: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/incidents/{incidentId}/comments",
    }),
  );
export type IncidentCommentsListInput = typeof IncidentCommentsListInput.Type;

// Output Schema
export const IncidentCommentsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.Array(
      Schema.Struct({
        etag: Schema.optional(Schema.String),
      }),
    ),
  });
export type IncidentCommentsListOutput = typeof IncidentCommentsListOutput.Type;

// The operation
/**
 * Gets all comments for a given incident.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param $filter - Filters the results, based on a Boolean condition. Optional.
 * @param $orderby - Sorts the results. Optional.
 * @param $top - Returns only the first n results. Optional.
 * @param $skipToken - Skiptoken is only used if a previous operation returned a partial result. If a previous response contains a nextLink element, the value of the nextLink element will include a skiptoken parameter that specifies a starting point to use for subsequent calls. Optional.
 */
export const IncidentCommentsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IncidentCommentsListInput,
    outputSchema: IncidentCommentsListOutput,
  }),
);
// Input Schema
export const IncidentRelationsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/incidents/{incidentId}/relations/{relationName}",
    }),
  );
export type IncidentRelationsCreateOrUpdateInput =
  typeof IncidentRelationsCreateOrUpdateInput.Type;

// Output Schema
export const IncidentRelationsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    etag: Schema.optional(Schema.String),
  });
export type IncidentRelationsCreateOrUpdateOutput =
  typeof IncidentRelationsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a relation for a given incident.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const IncidentRelationsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IncidentRelationsCreateOrUpdateInput,
    outputSchema: IncidentRelationsCreateOrUpdateOutput,
  }));
// Input Schema
export const IncidentRelationsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/incidents/{incidentId}/relations/{relationName}",
    }),
  );
export type IncidentRelationsDeleteInput =
  typeof IncidentRelationsDeleteInput.Type;

// Output Schema
export const IncidentRelationsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type IncidentRelationsDeleteOutput =
  typeof IncidentRelationsDeleteOutput.Type;

// The operation
/**
 * Deletes a relation for a given incident.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const IncidentRelationsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IncidentRelationsDeleteInput,
    outputSchema: IncidentRelationsDeleteOutput,
  }),
);
// Input Schema
export const IncidentRelationsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/incidents/{incidentId}/relations/{relationName}",
    }),
  );
export type IncidentRelationsGetInput = typeof IncidentRelationsGetInput.Type;

// Output Schema
export const IncidentRelationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    etag: Schema.optional(Schema.String),
  });
export type IncidentRelationsGetOutput = typeof IncidentRelationsGetOutput.Type;

// The operation
/**
 * Gets a relation for a given incident.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const IncidentRelationsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IncidentRelationsGetInput,
    outputSchema: IncidentRelationsGetOutput,
  }),
);
// Input Schema
export const IncidentRelationsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $filter: Schema.optional(Schema.String),
    $orderby: Schema.optional(Schema.String),
    $top: Schema.optional(Schema.Number),
    $skipToken: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/incidents/{incidentId}/relations",
    }),
  );
export type IncidentRelationsListInput = typeof IncidentRelationsListInput.Type;

// Output Schema
export const IncidentRelationsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.Array(
      Schema.Struct({
        etag: Schema.optional(Schema.String),
      }),
    ),
  });
export type IncidentRelationsListOutput =
  typeof IncidentRelationsListOutput.Type;

// The operation
/**
 * Gets all relations for a given incident.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param $filter - Filters the results, based on a Boolean condition. Optional.
 * @param $orderby - Sorts the results. Optional.
 * @param $top - Returns only the first n results. Optional.
 * @param $skipToken - Skiptoken is only used if a previous operation returned a partial result. If a previous response contains a nextLink element, the value of the nextLink element will include a skiptoken parameter that specifies a starting point to use for subsequent calls. Optional.
 */
export const IncidentRelationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IncidentRelationsListInput,
    outputSchema: IncidentRelationsListOutput,
  }),
);
// Input Schema
export const IncidentsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/incidents/{incidentId}",
    }),
  );
export type IncidentsCreateOrUpdateInput =
  typeof IncidentsCreateOrUpdateInput.Type;

// Output Schema
export const IncidentsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    etag: Schema.optional(Schema.String),
  });
export type IncidentsCreateOrUpdateOutput =
  typeof IncidentsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates an incident.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const IncidentsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IncidentsCreateOrUpdateInput,
    outputSchema: IncidentsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const IncidentsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/incidents/{incidentId}",
  }),
);
export type IncidentsDeleteInput = typeof IncidentsDeleteInput.Type;

// Output Schema
export const IncidentsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type IncidentsDeleteOutput = typeof IncidentsDeleteOutput.Type;

// The operation
/**
 * Deletes a given incident.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const IncidentsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: IncidentsDeleteInput,
  outputSchema: IncidentsDeleteOutput,
}));
// Input Schema
export const IncidentsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/incidents/{incidentId}",
  }),
);
export type IncidentsGetInput = typeof IncidentsGetInput.Type;

// Output Schema
export const IncidentsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  etag: Schema.optional(Schema.String),
});
export type IncidentsGetOutput = typeof IncidentsGetOutput.Type;

// The operation
/**
 * Gets a given incident.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const IncidentsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: IncidentsGetInput,
  outputSchema: IncidentsGetOutput,
}));
// Input Schema
export const IncidentsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
  $filter: Schema.optional(Schema.String),
  $orderby: Schema.optional(Schema.String),
  $top: Schema.optional(Schema.Number),
  $skipToken: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/incidents",
  }),
);
export type IncidentsListInput = typeof IncidentsListInput.Type;

// Output Schema
export const IncidentsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  nextLink: Schema.optional(Schema.String),
  value: Schema.Array(
    Schema.Struct({
      etag: Schema.optional(Schema.String),
    }),
  ),
});
export type IncidentsListOutput = typeof IncidentsListOutput.Type;

// The operation
/**
 * Gets all incidents.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param $filter - Filters the results, based on a Boolean condition. Optional.
 * @param $orderby - Sorts the results. Optional.
 * @param $top - Returns only the first n results. Optional.
 * @param $skipToken - Skiptoken is only used if a previous operation returned a partial result. If a previous response contains a nextLink element, the value of the nextLink element will include a skiptoken parameter that specifies a starting point to use for subsequent calls. Optional.
 */
export const IncidentsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: IncidentsListInput,
  outputSchema: IncidentsListOutput,
}));
// Input Schema
export const IncidentsRunPlaybookInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    incidentIdentifier: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/incidents/{incidentIdentifier}/runPlaybook",
    }),
  );
export type IncidentsRunPlaybookInput = typeof IncidentsRunPlaybookInput.Type;

// Output Schema
export const IncidentsRunPlaybookOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type IncidentsRunPlaybookOutput = typeof IncidentsRunPlaybookOutput.Type;

// The operation
/**
 * Triggers playbook on a specific incident
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param incidentIdentifier - Incident ID
 */
export const IncidentsRunPlaybook = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IncidentsRunPlaybookInput,
    outputSchema: IncidentsRunPlaybookOutput,
  }),
);
// Input Schema
export const IncidentTasksCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/incidents/{incidentId}/tasks/{incidentTaskId}",
    }),
  );
export type IncidentTasksCreateOrUpdateInput =
  typeof IncidentTasksCreateOrUpdateInput.Type;

// Output Schema
export const IncidentTasksCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    etag: Schema.optional(Schema.String),
  });
export type IncidentTasksCreateOrUpdateOutput =
  typeof IncidentTasksCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates the incident task.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const IncidentTasksCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IncidentTasksCreateOrUpdateInput,
    outputSchema: IncidentTasksCreateOrUpdateOutput,
  }),
);
// Input Schema
export const IncidentTasksDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/incidents/{incidentId}/tasks/{incidentTaskId}",
    }),
  );
export type IncidentTasksDeleteInput = typeof IncidentTasksDeleteInput.Type;

// Output Schema
export const IncidentTasksDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type IncidentTasksDeleteOutput = typeof IncidentTasksDeleteOutput.Type;

// The operation
/**
 * Delete the incident task.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const IncidentTasksDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: IncidentTasksDeleteInput,
  outputSchema: IncidentTasksDeleteOutput,
}));
// Input Schema
export const IncidentTasksGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/incidents/{incidentId}/tasks/{incidentTaskId}",
  }),
);
export type IncidentTasksGetInput = typeof IncidentTasksGetInput.Type;

// Output Schema
export const IncidentTasksGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    etag: Schema.optional(Schema.String),
  },
);
export type IncidentTasksGetOutput = typeof IncidentTasksGetOutput.Type;

// The operation
/**
 * Gets an incident task.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const IncidentTasksGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: IncidentTasksGetInput,
  outputSchema: IncidentTasksGetOutput,
}));
// Input Schema
export const IncidentTasksListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/incidents/{incidentId}/tasks",
  }),
);
export type IncidentTasksListInput = typeof IncidentTasksListInput.Type;

// Output Schema
export const IncidentTasksListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          etag: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type IncidentTasksListOutput = typeof IncidentTasksListOutput.Type;

// The operation
/**
 * Gets all incident tasks.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const IncidentTasksList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: IncidentTasksListInput,
  outputSchema: IncidentTasksListOutput,
}));
// Input Schema
export const MetadataCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/metadata/{metadataName}",
  }),
);
export type MetadataCreateInput = typeof MetadataCreateInput.Type;

// Output Schema
export const MetadataCreateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  etag: Schema.optional(Schema.String),
});
export type MetadataCreateOutput = typeof MetadataCreateOutput.Type;

// The operation
/**
 * Create a Metadata.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const MetadataCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: MetadataCreateInput,
  outputSchema: MetadataCreateOutput,
}));
// Input Schema
export const MetadataDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/metadata/{metadataName}",
  }),
);
export type MetadataDeleteInput = typeof MetadataDeleteInput.Type;

// Output Schema
export const MetadataDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type MetadataDeleteOutput = typeof MetadataDeleteOutput.Type;

// The operation
/**
 * Delete a Metadata.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const MetadataDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: MetadataDeleteInput,
  outputSchema: MetadataDeleteOutput,
}));
// Input Schema
export const MetadataGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/metadata/{metadataName}",
  }),
);
export type MetadataGetInput = typeof MetadataGetInput.Type;

// Output Schema
export const MetadataGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  etag: Schema.optional(Schema.String),
});
export type MetadataGetOutput = typeof MetadataGetOutput.Type;

// The operation
/**
 * Get a Metadata.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const MetadataGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: MetadataGetInput,
  outputSchema: MetadataGetOutput,
}));
// Input Schema
export const MetadataListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
  $filter: Schema.optional(Schema.String),
  $orderby: Schema.optional(Schema.String),
  $top: Schema.optional(Schema.Number),
  $skip: Schema.optional(Schema.Number),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/metadata",
  }),
);
export type MetadataListInput = typeof MetadataListInput.Type;

// Output Schema
export const MetadataListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(
    Schema.Struct({
      etag: Schema.optional(Schema.String),
    }),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type MetadataListOutput = typeof MetadataListOutput.Type;

// The operation
/**
 * List of all metadata
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param $filter - Filters the results, based on a Boolean condition. Optional.
 * @param $orderby - Sorts the results. Optional.
 * @param $top - Returns only the first n results. Optional.
 * @param $skip - Used to skip n elements in the OData query (offset). Returns a nextLink to the next page of results if there are any left.
 */
export const MetadataList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: MetadataListInput,
  outputSchema: MetadataListOutput,
}));
// Input Schema
export const MetadataUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/metadata/{metadataName}",
  }),
);
export type MetadataUpdateInput = typeof MetadataUpdateInput.Type;

// Output Schema
export const MetadataUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  etag: Schema.optional(Schema.String),
});
export type MetadataUpdateOutput = typeof MetadataUpdateOutput.Type;

// The operation
/**
 * Update an existing Metadata.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const MetadataUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: MetadataUpdateInput,
  outputSchema: MetadataUpdateOutput,
}));
// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.SecurityInsights/operations",
  }),
);
export type OperationsListInput = typeof OperationsListInput.Type;

// Output Schema
export const OperationsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  nextLink: Schema.optional(Schema.String),
  value: Schema.Array(
    Schema.Struct({
      display: Schema.optional(
        Schema.Struct({
          description: Schema.optional(Schema.String),
          operation: Schema.optional(Schema.String),
          provider: Schema.optional(Schema.String),
          resource: Schema.optional(Schema.String),
        }),
      ),
      name: Schema.optional(Schema.String),
      origin: Schema.optional(Schema.String),
      isDataAction: Schema.optional(Schema.Boolean),
    }),
  ),
});
export type OperationsListOutput = typeof OperationsListOutput.Type;

// The operation
/**
 * Lists all operations available Azure Security Insights Resource Provider.
 *
 * @param api-version - The API version to use for this operation.
 */
export const OperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationsListInput,
  outputSchema: OperationsListOutput,
}));
// Input Schema
export const ProductPackageGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/contentProductPackages/{packageId}",
  }),
);
export type ProductPackageGetInput = typeof ProductPackageGetInput.Type;

// Output Schema
export const ProductPackageGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    etag: Schema.optional(Schema.String),
  });
export type ProductPackageGetOutput = typeof ProductPackageGetOutput.Type;

// The operation
/**
 * Gets a package by its identifier from the catalog.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const ProductPackageGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ProductPackageGetInput,
  outputSchema: ProductPackageGetOutput,
}));
// Input Schema
export const ProductPackagesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $filter: Schema.optional(Schema.String),
    $orderby: Schema.optional(Schema.String),
    $top: Schema.optional(Schema.Number),
    $skipToken: Schema.optional(Schema.String),
    $search: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/contentProductPackages",
    }),
  );
export type ProductPackagesListInput = typeof ProductPackagesListInput.Type;

// Output Schema
export const ProductPackagesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.Array(
      Schema.Struct({
        etag: Schema.optional(Schema.String),
      }),
    ),
  });
export type ProductPackagesListOutput = typeof ProductPackagesListOutput.Type;

// The operation
/**
 * Gets all packages from the catalog.
 * Expandable properties:
 * - properties/installed
 * - properties/packagedContent
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param $filter - Filters the results, based on a Boolean condition. Optional.
 * @param $orderby - Sorts the results. Optional.
 * @param $top - Returns only the first n results. Optional.
 * @param $skipToken - Skiptoken is only used if a previous operation returned a partial result. If a previous response contains a nextLink element, the value of the nextLink element will include a skiptoken parameter that specifies a starting point to use for subsequent calls. Optional.
 * @param $search - Searches for a substring in the response. Optional.
 */
export const ProductPackagesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ProductPackagesListInput,
  outputSchema: ProductPackagesListOutput,
}));
// Input Schema
export const ProductTemplateGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/contentproducttemplates/{templateId}",
    }),
  );
export type ProductTemplateGetInput = typeof ProductTemplateGetInput.Type;

// Output Schema
export const ProductTemplateGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    etag: Schema.optional(Schema.String),
  });
export type ProductTemplateGetOutput = typeof ProductTemplateGetOutput.Type;

// The operation
/**
 * Gets a template by its identifier.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const ProductTemplateGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ProductTemplateGetInput,
  outputSchema: ProductTemplateGetOutput,
}));
// Input Schema
export const ProductTemplatesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $filter: Schema.optional(Schema.String),
    $orderby: Schema.optional(Schema.String),
    $search: Schema.optional(Schema.String),
    $count: Schema.optional(Schema.Boolean),
    $top: Schema.optional(Schema.Number),
    $skip: Schema.optional(Schema.Number),
    $skipToken: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/contentProductTemplates",
    }),
  );
export type ProductTemplatesListInput = typeof ProductTemplatesListInput.Type;

// Output Schema
export const ProductTemplatesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        etag: Schema.optional(Schema.String),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ProductTemplatesListOutput = typeof ProductTemplatesListOutput.Type;

// The operation
/**
 * Gets all templates in the catalog.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param $filter - Filters the results, based on a Boolean condition. Optional.
 * @param $orderby - Sorts the results. Optional.
 * @param $search - Searches for a substring in the response. Optional.
 * @param $count - Instructs the server to return only object count without actual body. Optional.
 * @param $top - Returns only the first n results. Optional.
 * @param $skip - Used to skip n elements in the OData query (offset). Returns a nextLink to the next page of results if there are any left.
 * @param $skipToken - Skiptoken is only used if a previous operation returned a partial result. If a previous response contains a nextLink element, the value of the nextLink element will include a skiptoken parameter that specifies a starting point to use for subsequent calls. Optional.
 */
export const ProductTemplatesList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ProductTemplatesListInput,
    outputSchema: ProductTemplatesListOutput,
  }),
);
// Input Schema
export const SecurityMLAnalyticsSettingsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/securityMLAnalyticsSettings/{settingsResourceName}",
    }),
  );
export type SecurityMLAnalyticsSettingsCreateOrUpdateInput =
  typeof SecurityMLAnalyticsSettingsCreateOrUpdateInput.Type;

// Output Schema
export const SecurityMLAnalyticsSettingsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    etag: Schema.optional(Schema.String),
  });
export type SecurityMLAnalyticsSettingsCreateOrUpdateOutput =
  typeof SecurityMLAnalyticsSettingsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates the Security ML Analytics Settings.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const SecurityMLAnalyticsSettingsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SecurityMLAnalyticsSettingsCreateOrUpdateInput,
    outputSchema: SecurityMLAnalyticsSettingsCreateOrUpdateOutput,
  }));
// Input Schema
export const SecurityMLAnalyticsSettingsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/securityMLAnalyticsSettings/{settingsResourceName}",
    }),
  );
export type SecurityMLAnalyticsSettingsDeleteInput =
  typeof SecurityMLAnalyticsSettingsDeleteInput.Type;

// Output Schema
export const SecurityMLAnalyticsSettingsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SecurityMLAnalyticsSettingsDeleteOutput =
  typeof SecurityMLAnalyticsSettingsDeleteOutput.Type;

// The operation
/**
 * Delete the Security ML Analytics Settings.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const SecurityMLAnalyticsSettingsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SecurityMLAnalyticsSettingsDeleteInput,
    outputSchema: SecurityMLAnalyticsSettingsDeleteOutput,
  }));
// Input Schema
export const SecurityMLAnalyticsSettingsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/securityMLAnalyticsSettings/{settingsResourceName}",
    }),
  );
export type SecurityMLAnalyticsSettingsGetInput =
  typeof SecurityMLAnalyticsSettingsGetInput.Type;

// Output Schema
export const SecurityMLAnalyticsSettingsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    etag: Schema.optional(Schema.String),
  });
export type SecurityMLAnalyticsSettingsGetOutput =
  typeof SecurityMLAnalyticsSettingsGetOutput.Type;

// The operation
/**
 * Gets the Security ML Analytics Settings.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const SecurityMLAnalyticsSettingsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SecurityMLAnalyticsSettingsGetInput,
    outputSchema: SecurityMLAnalyticsSettingsGetOutput,
  }));
// Input Schema
export const SecurityMLAnalyticsSettingsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/securityMLAnalyticsSettings",
    }),
  );
export type SecurityMLAnalyticsSettingsListInput =
  typeof SecurityMLAnalyticsSettingsListInput.Type;

// Output Schema
export const SecurityMLAnalyticsSettingsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.Array(
      Schema.Struct({
        etag: Schema.optional(Schema.String),
      }),
    ),
  });
export type SecurityMLAnalyticsSettingsListOutput =
  typeof SecurityMLAnalyticsSettingsListOutput.Type;

// The operation
/**
 * Gets all Security ML Analytics Settings.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const SecurityMLAnalyticsSettingsList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SecurityMLAnalyticsSettingsListInput,
    outputSchema: SecurityMLAnalyticsSettingsListOutput,
  }));
// Input Schema
export const SentinelOnboardingStatesCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/onboardingStates/{sentinelOnboardingStateName}",
    }),
  );
export type SentinelOnboardingStatesCreateInput =
  typeof SentinelOnboardingStatesCreateInput.Type;

// Output Schema
export const SentinelOnboardingStatesCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    etag: Schema.optional(Schema.String),
  });
export type SentinelOnboardingStatesCreateOutput =
  typeof SentinelOnboardingStatesCreateOutput.Type;

// The operation
/**
 * Create Sentinel onboarding state
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const SentinelOnboardingStatesCreate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SentinelOnboardingStatesCreateInput,
    outputSchema: SentinelOnboardingStatesCreateOutput,
  }));
// Input Schema
export const SentinelOnboardingStatesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/onboardingStates/{sentinelOnboardingStateName}",
    }),
  );
export type SentinelOnboardingStatesDeleteInput =
  typeof SentinelOnboardingStatesDeleteInput.Type;

// Output Schema
export const SentinelOnboardingStatesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SentinelOnboardingStatesDeleteOutput =
  typeof SentinelOnboardingStatesDeleteOutput.Type;

// The operation
/**
 * Delete Sentinel onboarding state
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const SentinelOnboardingStatesDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SentinelOnboardingStatesDeleteInput,
    outputSchema: SentinelOnboardingStatesDeleteOutput,
  }));
// Input Schema
export const SentinelOnboardingStatesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/onboardingStates/{sentinelOnboardingStateName}",
    }),
  );
export type SentinelOnboardingStatesGetInput =
  typeof SentinelOnboardingStatesGetInput.Type;

// Output Schema
export const SentinelOnboardingStatesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    etag: Schema.optional(Schema.String),
  });
export type SentinelOnboardingStatesGetOutput =
  typeof SentinelOnboardingStatesGetOutput.Type;

// The operation
/**
 * Get Sentinel onboarding state
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const SentinelOnboardingStatesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SentinelOnboardingStatesGetInput,
    outputSchema: SentinelOnboardingStatesGetOutput,
  }),
);
// Input Schema
export const SentinelOnboardingStatesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/onboardingStates",
    }),
  );
export type SentinelOnboardingStatesListInput =
  typeof SentinelOnboardingStatesListInput.Type;

// Output Schema
export const SentinelOnboardingStatesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        etag: Schema.optional(Schema.String),
      }),
    ),
  });
export type SentinelOnboardingStatesListOutput =
  typeof SentinelOnboardingStatesListOutput.Type;

// The operation
/**
 * Gets all Sentinel onboarding states
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const SentinelOnboardingStatesList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SentinelOnboardingStatesListInput,
    outputSchema: SentinelOnboardingStatesListOutput,
  }));
// Input Schema
export const SourceControlListRepositoriesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/listRepositories",
    }),
  );
export type SourceControlListRepositoriesInput =
  typeof SourceControlListRepositoriesInput.Type;

// Output Schema
export const SourceControlListRepositoriesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.Array(
      Schema.Struct({
        url: Schema.optional(Schema.String),
        fullName: Schema.optional(Schema.String),
        installationId: Schema.optional(Schema.Number),
        branches: Schema.optional(Schema.Array(Schema.String)),
      }),
    ),
  });
export type SourceControlListRepositoriesOutput =
  typeof SourceControlListRepositoriesOutput.Type;

// The operation
/**
 * Gets a list of repositories metadata.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const SourceControlListRepositories =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SourceControlListRepositoriesInput,
    outputSchema: SourceControlListRepositoriesOutput,
  }));
// Input Schema
export const SourceControlsCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/sourcecontrols/{sourceControlId}",
    }),
  );
export type SourceControlsCreateInput = typeof SourceControlsCreateInput.Type;

// Output Schema
export const SourceControlsCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    etag: Schema.optional(Schema.String),
  });
export type SourceControlsCreateOutput = typeof SourceControlsCreateOutput.Type;

// The operation
/**
 * Creates a source control.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const SourceControlsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SourceControlsCreateInput,
    outputSchema: SourceControlsCreateOutput,
  }),
);
// Input Schema
export const SourceControlsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/sourcecontrols/{sourceControlId}/delete",
    }),
  );
export type SourceControlsDeleteInput = typeof SourceControlsDeleteInput.Type;

// Output Schema
export const SourceControlsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    warning: Schema.optional(
      Schema.Struct({
        code: Schema.optional(
          Schema.Literals([
            "SourceControlWarning_DeleteServicePrincipal",
            "SourceControlWarning_DeletePipelineFromAzureDevOps",
            "SourceControlWarning_DeleteWorkflowAndSecretFromGitHub",
            "SourceControlWarning_DeleteRoleAssignment",
            "SourceControl_DeletedWithWarnings",
          ]),
        ),
        message: Schema.optional(Schema.String),
        details: Schema.optional(Schema.Array(Schema.Unknown)),
      }),
    ),
  });
export type SourceControlsDeleteOutput = typeof SourceControlsDeleteOutput.Type;

// The operation
/**
 * Delete a source control.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const SourceControlsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SourceControlsDeleteInput,
    outputSchema: SourceControlsDeleteOutput,
  }),
);
// Input Schema
export const SourceControlsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/sourcecontrols/{sourceControlId}",
  }),
);
export type SourceControlsGetInput = typeof SourceControlsGetInput.Type;

// Output Schema
export const SourceControlsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    etag: Schema.optional(Schema.String),
  });
export type SourceControlsGetOutput = typeof SourceControlsGetOutput.Type;

// The operation
/**
 * Gets a source control byt its identifier.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const SourceControlsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SourceControlsGetInput,
  outputSchema: SourceControlsGetOutput,
}));
// Input Schema
export const SourceControlsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/sourcecontrols",
    }),
  );
export type SourceControlsListInput = typeof SourceControlsListInput.Type;

// Output Schema
export const SourceControlsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.Array(
      Schema.Struct({
        etag: Schema.optional(Schema.String),
      }),
    ),
  });
export type SourceControlsListOutput = typeof SourceControlsListOutput.Type;

// The operation
/**
 * Gets all source controls, without source control items.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const SourceControlsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SourceControlsListInput,
  outputSchema: SourceControlsListOutput,
}));
// Input Schema
export const ThreatIntelligenceIndicatorAppendTagsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/threatIntelligence/main/indicators/{name}/appendTags",
    }),
  );
export type ThreatIntelligenceIndicatorAppendTagsInput =
  typeof ThreatIntelligenceIndicatorAppendTagsInput.Type;

// Output Schema
export const ThreatIntelligenceIndicatorAppendTagsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ThreatIntelligenceIndicatorAppendTagsOutput =
  typeof ThreatIntelligenceIndicatorAppendTagsOutput.Type;

// The operation
/**
 * Append tags to a threat intelligence indicator.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const ThreatIntelligenceIndicatorAppendTags =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ThreatIntelligenceIndicatorAppendTagsInput,
    outputSchema: ThreatIntelligenceIndicatorAppendTagsOutput,
  }));
// Input Schema
export const ThreatIntelligenceIndicatorCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/threatIntelligence/main/indicators/{name}",
    }),
  );
export type ThreatIntelligenceIndicatorCreateInput =
  typeof ThreatIntelligenceIndicatorCreateInput.Type;

// Output Schema
export const ThreatIntelligenceIndicatorCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    etag: Schema.optional(Schema.String),
  });
export type ThreatIntelligenceIndicatorCreateOutput =
  typeof ThreatIntelligenceIndicatorCreateOutput.Type;

// The operation
/**
 * Update a threat Intelligence indicator.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const ThreatIntelligenceIndicatorCreate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ThreatIntelligenceIndicatorCreateInput,
    outputSchema: ThreatIntelligenceIndicatorCreateOutput,
  }));
// Input Schema
export const ThreatIntelligenceIndicatorCreateIndicatorInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/threatIntelligence/main/createIndicator",
    }),
  );
export type ThreatIntelligenceIndicatorCreateIndicatorInput =
  typeof ThreatIntelligenceIndicatorCreateIndicatorInput.Type;

// Output Schema
export const ThreatIntelligenceIndicatorCreateIndicatorOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    etag: Schema.optional(Schema.String),
  });
export type ThreatIntelligenceIndicatorCreateIndicatorOutput =
  typeof ThreatIntelligenceIndicatorCreateIndicatorOutput.Type;

// The operation
/**
 * Create a new threat intelligence indicator.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const ThreatIntelligenceIndicatorCreateIndicator =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ThreatIntelligenceIndicatorCreateIndicatorInput,
    outputSchema: ThreatIntelligenceIndicatorCreateIndicatorOutput,
  }));
// Input Schema
export const ThreatIntelligenceIndicatorDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/threatIntelligence/main/indicators/{name}",
    }),
  );
export type ThreatIntelligenceIndicatorDeleteInput =
  typeof ThreatIntelligenceIndicatorDeleteInput.Type;

// Output Schema
export const ThreatIntelligenceIndicatorDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ThreatIntelligenceIndicatorDeleteOutput =
  typeof ThreatIntelligenceIndicatorDeleteOutput.Type;

// The operation
/**
 * Delete a threat intelligence indicator.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const ThreatIntelligenceIndicatorDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ThreatIntelligenceIndicatorDeleteInput,
    outputSchema: ThreatIntelligenceIndicatorDeleteOutput,
  }));
// Input Schema
export const ThreatIntelligenceIndicatorGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/threatIntelligence/main/indicators/{name}",
    }),
  );
export type ThreatIntelligenceIndicatorGetInput =
  typeof ThreatIntelligenceIndicatorGetInput.Type;

// Output Schema
export const ThreatIntelligenceIndicatorGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    etag: Schema.optional(Schema.String),
  });
export type ThreatIntelligenceIndicatorGetOutput =
  typeof ThreatIntelligenceIndicatorGetOutput.Type;

// The operation
/**
 * View a threat intelligence indicator by name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const ThreatIntelligenceIndicatorGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ThreatIntelligenceIndicatorGetInput,
    outputSchema: ThreatIntelligenceIndicatorGetOutput,
  }));
// Input Schema
export const ThreatIntelligenceIndicatorMetricsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/threatIntelligence/main/metrics",
    }),
  );
export type ThreatIntelligenceIndicatorMetricsListInput =
  typeof ThreatIntelligenceIndicatorMetricsListInput.Type;

// Output Schema
export const ThreatIntelligenceIndicatorMetricsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        properties: Schema.optional(
          Schema.Struct({
            lastUpdatedTimeUtc: Schema.optional(Schema.String),
            threatTypeMetrics: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  metricName: Schema.optional(Schema.String),
                  metricValue: Schema.optional(Schema.Number),
                }),
              ),
            ),
            patternTypeMetrics: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  metricName: Schema.optional(Schema.String),
                  metricValue: Schema.optional(Schema.Number),
                }),
              ),
            ),
            sourceMetrics: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  metricName: Schema.optional(Schema.String),
                  metricValue: Schema.optional(Schema.Number),
                }),
              ),
            ),
          }),
        ),
      }),
    ),
  });
export type ThreatIntelligenceIndicatorMetricsListOutput =
  typeof ThreatIntelligenceIndicatorMetricsListOutput.Type;

// The operation
/**
 * Get threat intelligence indicators metrics (Indicators counts by Type, Threat Type, Source).
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const ThreatIntelligenceIndicatorMetricsList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ThreatIntelligenceIndicatorMetricsListInput,
    outputSchema: ThreatIntelligenceIndicatorMetricsListOutput,
  }));
// Input Schema
export const ThreatIntelligenceIndicatorQueryIndicatorsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/threatIntelligence/main/queryIndicators",
    }),
  );
export type ThreatIntelligenceIndicatorQueryIndicatorsInput =
  typeof ThreatIntelligenceIndicatorQueryIndicatorsInput.Type;

// Output Schema
export const ThreatIntelligenceIndicatorQueryIndicatorsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.Array(
      Schema.Struct({
        etag: Schema.optional(Schema.String),
      }),
    ),
  });
export type ThreatIntelligenceIndicatorQueryIndicatorsOutput =
  typeof ThreatIntelligenceIndicatorQueryIndicatorsOutput.Type;

// The operation
/**
 * Query threat intelligence indicators as per filtering criteria.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const ThreatIntelligenceIndicatorQueryIndicators =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ThreatIntelligenceIndicatorQueryIndicatorsInput,
    outputSchema: ThreatIntelligenceIndicatorQueryIndicatorsOutput,
  }));
// Input Schema
export const ThreatIntelligenceIndicatorReplaceTagsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/threatIntelligence/main/indicators/{name}/replaceTags",
    }),
  );
export type ThreatIntelligenceIndicatorReplaceTagsInput =
  typeof ThreatIntelligenceIndicatorReplaceTagsInput.Type;

// Output Schema
export const ThreatIntelligenceIndicatorReplaceTagsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    etag: Schema.optional(Schema.String),
  });
export type ThreatIntelligenceIndicatorReplaceTagsOutput =
  typeof ThreatIntelligenceIndicatorReplaceTagsOutput.Type;

// The operation
/**
 * Replace tags added to a threat intelligence indicator.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const ThreatIntelligenceIndicatorReplaceTags =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ThreatIntelligenceIndicatorReplaceTagsInput,
    outputSchema: ThreatIntelligenceIndicatorReplaceTagsOutput,
  }));
// Input Schema
export const ThreatIntelligenceIndicatorsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $filter: Schema.optional(Schema.String),
    $top: Schema.optional(Schema.Number),
    $skipToken: Schema.optional(Schema.String),
    $orderby: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/threatIntelligence/main/indicators",
    }),
  );
export type ThreatIntelligenceIndicatorsListInput =
  typeof ThreatIntelligenceIndicatorsListInput.Type;

// Output Schema
export const ThreatIntelligenceIndicatorsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.Array(
      Schema.Struct({
        etag: Schema.optional(Schema.String),
      }),
    ),
  });
export type ThreatIntelligenceIndicatorsListOutput =
  typeof ThreatIntelligenceIndicatorsListOutput.Type;

// The operation
/**
 * Get all threat intelligence indicators.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param $filter - Filters the results, based on a Boolean condition. Optional.
 * @param $top - Returns only the first n results. Optional.
 * @param $skipToken - Skiptoken is only used if a previous operation returned a partial result. If a previous response contains a nextLink element, the value of the nextLink element will include a skiptoken parameter that specifies a starting point to use for subsequent calls. Optional.
 * @param $orderby - Sorts the results. Optional.
 */
export const ThreatIntelligenceIndicatorsList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ThreatIntelligenceIndicatorsListInput,
    outputSchema: ThreatIntelligenceIndicatorsListOutput,
  }));
// Input Schema
export const WatchlistItemsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/watchlists/{watchlistAlias}/watchlistItems/{watchlistItemId}",
    }),
  );
export type WatchlistItemsCreateOrUpdateInput =
  typeof WatchlistItemsCreateOrUpdateInput.Type;

// Output Schema
export const WatchlistItemsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    etag: Schema.optional(Schema.String),
  });
export type WatchlistItemsCreateOrUpdateOutput =
  typeof WatchlistItemsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a watchlist item.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const WatchlistItemsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WatchlistItemsCreateOrUpdateInput,
    outputSchema: WatchlistItemsCreateOrUpdateOutput,
  }));
// Input Schema
export const WatchlistItemsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/watchlists/{watchlistAlias}/watchlistItems/{watchlistItemId}",
    }),
  );
export type WatchlistItemsDeleteInput = typeof WatchlistItemsDeleteInput.Type;

// Output Schema
export const WatchlistItemsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type WatchlistItemsDeleteOutput = typeof WatchlistItemsDeleteOutput.Type;

// The operation
/**
 * Delete a watchlist item.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const WatchlistItemsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WatchlistItemsDeleteInput,
    outputSchema: WatchlistItemsDeleteOutput,
  }),
);
// Input Schema
export const WatchlistItemsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/watchlists/{watchlistAlias}/watchlistItems/{watchlistItemId}",
  }),
);
export type WatchlistItemsGetInput = typeof WatchlistItemsGetInput.Type;

// Output Schema
export const WatchlistItemsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    etag: Schema.optional(Schema.String),
  });
export type WatchlistItemsGetOutput = typeof WatchlistItemsGetOutput.Type;

// The operation
/**
 * Get a watchlist item.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const WatchlistItemsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WatchlistItemsGetInput,
  outputSchema: WatchlistItemsGetOutput,
}));
// Input Schema
export const WatchlistItemsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $skipToken: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/watchlists/{watchlistAlias}/watchlistItems",
    }),
  );
export type WatchlistItemsListInput = typeof WatchlistItemsListInput.Type;

// Output Schema
export const WatchlistItemsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.Array(
      Schema.Struct({
        etag: Schema.optional(Schema.String),
      }),
    ),
  });
export type WatchlistItemsListOutput = typeof WatchlistItemsListOutput.Type;

// The operation
/**
 * Get all watchlist Items.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param $skipToken - Skiptoken is only used if a previous operation returned a partial result. If a previous response contains a nextLink element, the value of the nextLink element will include a skiptoken parameter that specifies a starting point to use for subsequent calls. Optional.
 */
export const WatchlistItemsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WatchlistItemsListInput,
  outputSchema: WatchlistItemsListOutput,
}));
// Input Schema
export const WatchlistsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/watchlists/{watchlistAlias}",
    }),
  );
export type WatchlistsCreateOrUpdateInput =
  typeof WatchlistsCreateOrUpdateInput.Type;

// Output Schema
export const WatchlistsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    etag: Schema.optional(Schema.String),
  });
export type WatchlistsCreateOrUpdateOutput =
  typeof WatchlistsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a Watchlist and its Watchlist Items (bulk creation, e.g. through text/csv content type). To create a Watchlist and its Items, we should call this endpoint with rawContent and contentType properties.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const WatchlistsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WatchlistsCreateOrUpdateInput,
    outputSchema: WatchlistsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const WatchlistsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/watchlists/{watchlistAlias}",
  }),
);
export type WatchlistsDeleteInput = typeof WatchlistsDeleteInput.Type;

// Output Schema
export const WatchlistsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type WatchlistsDeleteOutput = typeof WatchlistsDeleteOutput.Type;

// The operation
/**
 * Delete a watchlist.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const WatchlistsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WatchlistsDeleteInput,
  outputSchema: WatchlistsDeleteOutput,
}));
// Input Schema
export const WatchlistsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/watchlists/{watchlistAlias}",
  }),
);
export type WatchlistsGetInput = typeof WatchlistsGetInput.Type;

// Output Schema
export const WatchlistsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  etag: Schema.optional(Schema.String),
});
export type WatchlistsGetOutput = typeof WatchlistsGetOutput.Type;

// The operation
/**
 * Get a watchlist, without its watchlist items.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const WatchlistsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WatchlistsGetInput,
  outputSchema: WatchlistsGetOutput,
}));
// Input Schema
export const WatchlistsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
  $skipToken: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/watchlists",
  }),
);
export type WatchlistsListInput = typeof WatchlistsListInput.Type;

// Output Schema
export const WatchlistsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  nextLink: Schema.optional(Schema.String),
  value: Schema.Array(
    Schema.Struct({
      etag: Schema.optional(Schema.String),
    }),
  ),
});
export type WatchlistsListOutput = typeof WatchlistsListOutput.Type;

// The operation
/**
 * Get all watchlists, without watchlist items.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param $skipToken - Skiptoken is only used if a previous operation returned a partial result. If a previous response contains a nextLink element, the value of the nextLink element will include a skiptoken parameter that specifies a starting point to use for subsequent calls. Optional.
 */
export const WatchlistsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WatchlistsListInput,
  outputSchema: WatchlistsListOutput,
}));
