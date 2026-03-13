/**
 * Azure Codesigning API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const CertificateProfilesCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CodeSigning/codeSigningAccounts/{accountName}/certificateProfiles/{profileName}",
    }),
  );
export type CertificateProfilesCreateInput =
  typeof CertificateProfilesCreateInput.Type;

// Output Schema
export const CertificateProfilesCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type CertificateProfilesCreateOutput =
  typeof CertificateProfilesCreateOutput.Type;

// The operation
/**
 * Create a certificate profile.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - Artifact Signing account name.
 * @param profileName - Certificate profile name.
 */
export const CertificateProfilesCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CertificateProfilesCreateInput,
    outputSchema: CertificateProfilesCreateOutput,
  }),
);
// Input Schema
export const CertificateProfilesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CodeSigning/codeSigningAccounts/{accountName}/certificateProfiles/{profileName}",
    }),
  );
export type CertificateProfilesDeleteInput =
  typeof CertificateProfilesDeleteInput.Type;

// Output Schema
export const CertificateProfilesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CertificateProfilesDeleteOutput =
  typeof CertificateProfilesDeleteOutput.Type;

// The operation
/**
 * Delete a certificate profile.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - Artifact Signing account name.
 * @param profileName - Certificate profile name.
 */
export const CertificateProfilesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CertificateProfilesDeleteInput,
    outputSchema: CertificateProfilesDeleteOutput,
  }),
);
// Input Schema
export const CertificateProfilesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CodeSigning/codeSigningAccounts/{accountName}/certificateProfiles/{profileName}",
    }),
  );
export type CertificateProfilesGetInput =
  typeof CertificateProfilesGetInput.Type;

// Output Schema
export const CertificateProfilesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type CertificateProfilesGetOutput =
  typeof CertificateProfilesGetOutput.Type;

// The operation
/**
 * Get details of a certificate profile.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - Artifact Signing account name.
 * @param profileName - Certificate profile name.
 */
export const CertificateProfilesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CertificateProfilesGetInput,
    outputSchema: CertificateProfilesGetOutput,
  }),
);
// Input Schema
export const CertificateProfilesListByCodeSigningAccountInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CodeSigning/codeSigningAccounts/{accountName}/certificateProfiles",
    }),
  );
export type CertificateProfilesListByCodeSigningAccountInput =
  typeof CertificateProfilesListByCodeSigningAccountInput.Type;

// Output Schema
export const CertificateProfilesListByCodeSigningAccountOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type CertificateProfilesListByCodeSigningAccountOutput =
  typeof CertificateProfilesListByCodeSigningAccountOutput.Type;

// The operation
/**
 * List certificate profiles under an artifact signing account.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - Artifact Signing account name.
 */
export const CertificateProfilesListByCodeSigningAccount =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CertificateProfilesListByCodeSigningAccountInput,
    outputSchema: CertificateProfilesListByCodeSigningAccountOutput,
  }));
// Input Schema
export const CertificateProfilesRevokeCertificateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CodeSigning/codeSigningAccounts/{accountName}/certificateProfiles/{profileName}/revokeCertificate",
    }),
  );
export type CertificateProfilesRevokeCertificateInput =
  typeof CertificateProfilesRevokeCertificateInput.Type;

// Output Schema
export const CertificateProfilesRevokeCertificateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CertificateProfilesRevokeCertificateOutput =
  typeof CertificateProfilesRevokeCertificateOutput.Type;

// The operation
/**
 * Revoke a certificate under a certificate profile.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - Artifact Signing account name.
 * @param profileName - Certificate profile name.
 */
export const CertificateProfilesRevokeCertificate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CertificateProfilesRevokeCertificateInput,
    outputSchema: CertificateProfilesRevokeCertificateOutput,
  }));
// Input Schema
export const CodeSigningAccountsCheckNameAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.CodeSigning/checkNameAvailability",
    }),
  );
export type CodeSigningAccountsCheckNameAvailabilityInput =
  typeof CodeSigningAccountsCheckNameAvailabilityInput.Type;

// Output Schema
export const CodeSigningAccountsCheckNameAvailabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nameAvailable: Schema.optional(Schema.Boolean),
    reason: Schema.optional(
      Schema.Literals(["AccountNameInvalid", "AlreadyExists"]),
    ),
    message: Schema.optional(Schema.String),
  });
export type CodeSigningAccountsCheckNameAvailabilityOutput =
  typeof CodeSigningAccountsCheckNameAvailabilityOutput.Type;

// The operation
/**
 * Checks if the artifact signing account name is valid and is not already in use.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const CodeSigningAccountsCheckNameAvailability =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CodeSigningAccountsCheckNameAvailabilityInput,
    outputSchema: CodeSigningAccountsCheckNameAvailabilityOutput,
  }));
// Input Schema
export const CodeSigningAccountsCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CodeSigning/codeSigningAccounts/{accountName}",
    }),
  );
export type CodeSigningAccountsCreateInput =
  typeof CodeSigningAccountsCreateInput.Type;

// Output Schema
export const CodeSigningAccountsCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type CodeSigningAccountsCreateOutput =
  typeof CodeSigningAccountsCreateOutput.Type;

// The operation
/**
 * Create an artifact Signing Account.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - Artifact Signing account name.
 */
export const CodeSigningAccountsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CodeSigningAccountsCreateInput,
    outputSchema: CodeSigningAccountsCreateOutput,
  }),
);
// Input Schema
export const CodeSigningAccountsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CodeSigning/codeSigningAccounts/{accountName}",
    }),
  );
export type CodeSigningAccountsDeleteInput =
  typeof CodeSigningAccountsDeleteInput.Type;

// Output Schema
export const CodeSigningAccountsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CodeSigningAccountsDeleteOutput =
  typeof CodeSigningAccountsDeleteOutput.Type;

// The operation
/**
 * Delete an artifact signing account.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - Artifact Signing account name.
 */
export const CodeSigningAccountsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CodeSigningAccountsDeleteInput,
    outputSchema: CodeSigningAccountsDeleteOutput,
  }),
);
// Input Schema
export const CodeSigningAccountsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CodeSigning/codeSigningAccounts/{accountName}",
    }),
  );
export type CodeSigningAccountsGetInput =
  typeof CodeSigningAccountsGetInput.Type;

// Output Schema
export const CodeSigningAccountsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type CodeSigningAccountsGetOutput =
  typeof CodeSigningAccountsGetOutput.Type;

// The operation
/**
 * Get an artifact Signing Account.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - Artifact Signing account name.
 */
export const CodeSigningAccountsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CodeSigningAccountsGetInput,
    outputSchema: CodeSigningAccountsGetOutput,
  }),
);
// Input Schema
export const CodeSigningAccountsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CodeSigning/codeSigningAccounts",
    }),
  );
export type CodeSigningAccountsListByResourceGroupInput =
  typeof CodeSigningAccountsListByResourceGroupInput.Type;

// Output Schema
export const CodeSigningAccountsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type CodeSigningAccountsListByResourceGroupOutput =
  typeof CodeSigningAccountsListByResourceGroupOutput.Type;

// The operation
/**
 * Lists artifact signing accounts within a resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const CodeSigningAccountsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CodeSigningAccountsListByResourceGroupInput,
    outputSchema: CodeSigningAccountsListByResourceGroupOutput,
  }));
// Input Schema
export const CodeSigningAccountsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.CodeSigning/codeSigningAccounts",
    }),
  );
export type CodeSigningAccountsListBySubscriptionInput =
  typeof CodeSigningAccountsListBySubscriptionInput.Type;

// Output Schema
export const CodeSigningAccountsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type CodeSigningAccountsListBySubscriptionOutput =
  typeof CodeSigningAccountsListBySubscriptionOutput.Type;

// The operation
/**
 * Lists artifact signing accounts within a subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const CodeSigningAccountsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CodeSigningAccountsListBySubscriptionInput,
    outputSchema: CodeSigningAccountsListBySubscriptionOutput,
  }));
// Input Schema
export const CodeSigningAccountsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CodeSigning/codeSigningAccounts/{accountName}",
    }),
  );
export type CodeSigningAccountsUpdateInput =
  typeof CodeSigningAccountsUpdateInput.Type;

// Output Schema
export const CodeSigningAccountsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type CodeSigningAccountsUpdateOutput =
  typeof CodeSigningAccountsUpdateOutput.Type;

// The operation
/**
 * Update an artifact signing account.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - Artifact Signing account name.
 */
export const CodeSigningAccountsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CodeSigningAccountsUpdateInput,
    outputSchema: CodeSigningAccountsUpdateOutput,
  }),
);
