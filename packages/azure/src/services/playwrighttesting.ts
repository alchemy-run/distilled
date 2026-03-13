/**
 * Azure Playwrighttesting API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const AccountQuotasGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  accountName: Schema.String.pipe(T.PathParam()),
  quotaName: Schema.Literals(["ScalableExecution", "Reporting"]).pipe(
    T.PathParam(),
  ),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzurePlaywrightService/accounts/{accountName}/quotas/{quotaName}",
  }),
);
export type AccountQuotasGetInput = typeof AccountQuotasGetInput.Type;

// Output Schema
export const AccountQuotasGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type AccountQuotasGetOutput = typeof AccountQuotasGetOutput.Type;

// The operation
/**
 * Get quota by name for an account.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - Name of account.
 * @param quotaName - The Playwright service account quota name.
 */
export const AccountQuotasGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AccountQuotasGetInput,
  outputSchema: AccountQuotasGetOutput,
}));
// Input Schema
export const AccountQuotasListByAccountInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzurePlaywrightService/accounts/{accountName}/quotas",
    }),
  );
export type AccountQuotasListByAccountInput =
  typeof AccountQuotasListByAccountInput.Type;

// Output Schema
export const AccountQuotasListByAccountOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type AccountQuotasListByAccountOutput =
  typeof AccountQuotasListByAccountOutput.Type;

// The operation
/**
 * List quotas for a given account.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - Name of account.
 */
export const AccountQuotasListByAccount = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AccountQuotasListByAccountInput,
    outputSchema: AccountQuotasListByAccountOutput,
  }),
);
// Input Schema
export const AccountsCheckNameAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AzurePlaywrightService/checkNameAvailability",
    }),
  );
export type AccountsCheckNameAvailabilityInput =
  typeof AccountsCheckNameAvailabilityInput.Type;

// Output Schema
export const AccountsCheckNameAvailabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nameAvailable: Schema.optional(Schema.Boolean),
    reason: Schema.optional(Schema.Literals(["Invalid", "AlreadyExists"])),
    message: Schema.optional(Schema.String),
  });
export type AccountsCheckNameAvailabilityOutput =
  typeof AccountsCheckNameAvailabilityOutput.Type;

// The operation
/**
 * Adds check global name availability operation, normally used if a resource name must be globally unique.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param name - The name of the resource for which availability needs to be checked.
 * @param type - The resource type.
 */
export const AccountsCheckNameAvailability =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AccountsCheckNameAvailabilityInput,
    outputSchema: AccountsCheckNameAvailabilityOutput,
  }));
// Input Schema
export const AccountsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzurePlaywrightService/accounts/{accountName}",
    }),
  );
export type AccountsCreateOrUpdateInput =
  typeof AccountsCreateOrUpdateInput.Type;

// Output Schema
export const AccountsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type AccountsCreateOrUpdateOutput =
  typeof AccountsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a Account
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - Name of account.
 */
export const AccountsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AccountsCreateOrUpdateInput,
    outputSchema: AccountsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const AccountsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  accountName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzurePlaywrightService/accounts/{accountName}",
  }),
);
export type AccountsDeleteInput = typeof AccountsDeleteInput.Type;

// Output Schema
export const AccountsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AccountsDeleteOutput = typeof AccountsDeleteOutput.Type;

// The operation
/**
 * Delete a Account
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - Name of account.
 */
export const AccountsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AccountsDeleteInput,
  outputSchema: AccountsDeleteOutput,
}));
// Input Schema
export const AccountsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  accountName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzurePlaywrightService/accounts/{accountName}",
  }),
);
export type AccountsGetInput = typeof AccountsGetInput.Type;

// Output Schema
export const AccountsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type AccountsGetOutput = typeof AccountsGetOutput.Type;

// The operation
/**
 * Get a Account
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - Name of account.
 */
export const AccountsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AccountsGetInput,
  outputSchema: AccountsGetOutput,
}));
// Input Schema
export const AccountsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzurePlaywrightService/accounts",
    }),
  );
export type AccountsListByResourceGroupInput =
  typeof AccountsListByResourceGroupInput.Type;

// Output Schema
export const AccountsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type AccountsListByResourceGroupOutput =
  typeof AccountsListByResourceGroupOutput.Type;

// The operation
/**
 * List Account resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const AccountsListByResourceGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AccountsListByResourceGroupInput,
    outputSchema: AccountsListByResourceGroupOutput,
  }),
);
// Input Schema
export const AccountsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AzurePlaywrightService/accounts",
    }),
  );
export type AccountsListBySubscriptionInput =
  typeof AccountsListBySubscriptionInput.Type;

// Output Schema
export const AccountsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type AccountsListBySubscriptionOutput =
  typeof AccountsListBySubscriptionOutput.Type;

// The operation
/**
 * List Account resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const AccountsListBySubscription = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AccountsListBySubscriptionInput,
    outputSchema: AccountsListBySubscriptionOutput,
  }),
);
// Input Schema
export const AccountsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  accountName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzurePlaywrightService/accounts/{accountName}",
  }),
);
export type AccountsUpdateInput = typeof AccountsUpdateInput.Type;

// Output Schema
export const AccountsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type AccountsUpdateOutput = typeof AccountsUpdateOutput.Type;

// The operation
/**
 * Update a Account
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - Name of account.
 */
export const AccountsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AccountsUpdateInput,
  outputSchema: AccountsUpdateOutput,
}));
// Input Schema
export const QuotasGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  location: Schema.String.pipe(T.PathParam()),
  quotaName: Schema.Literals(["ScalableExecution", "Reporting"]).pipe(
    T.PathParam(),
  ),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.AzurePlaywrightService/locations/{location}/quotas/{quotaName}",
  }),
);
export type QuotasGetInput = typeof QuotasGetInput.Type;

// Output Schema
export const QuotasGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type QuotasGetOutput = typeof QuotasGetOutput.Type;

// The operation
/**
 * Get subscription quota by name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param location - The location of quota in ARM Normalized format like eastus, southeastasia etc.
 * @param quotaName - The quota name.
 */
export const QuotasGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: QuotasGetInput,
  outputSchema: QuotasGetOutput,
}));
// Input Schema
export const QuotasListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AzurePlaywrightService/locations/{location}/quotas",
    }),
  );
export type QuotasListBySubscriptionInput =
  typeof QuotasListBySubscriptionInput.Type;

// Output Schema
export const QuotasListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type QuotasListBySubscriptionOutput =
  typeof QuotasListBySubscriptionOutput.Type;

// The operation
/**
 * List quotas for a given subscription Id.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param location - The location of quota in ARM Normalized format like eastus, southeastasia etc.
 */
export const QuotasListBySubscription = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: QuotasListBySubscriptionInput,
    outputSchema: QuotasListBySubscriptionOutput,
  }),
);
