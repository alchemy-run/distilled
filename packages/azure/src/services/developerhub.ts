/**
 * Azure Developerhub API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const GeneratePreviewArtifactsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DevHub/locations/{location}/generatePreviewArtifacts",
    }),
  );
export type GeneratePreviewArtifactsInput =
  typeof GeneratePreviewArtifactsInput.Type;

// Output Schema
export const GeneratePreviewArtifactsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Record(Schema.String, Schema.String);
export type GeneratePreviewArtifactsOutput =
  typeof GeneratePreviewArtifactsOutput.Type;

// The operation
/**
 * Generate preview dockerfile and manifests.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param location - The name of Azure region.
 */
export const GeneratePreviewArtifacts = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GeneratePreviewArtifactsInput,
    outputSchema: GeneratePreviewArtifactsOutput,
  }),
);
// Input Schema
export const GitHubOAuthInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  location: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.DevHub/locations/{location}/githuboauth/default/getGitHubOAuthInfo",
  }),
);
export type GitHubOAuthInput = typeof GitHubOAuthInput.Type;

// Output Schema
export const GitHubOAuthOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  authURL: Schema.optional(Schema.String),
  token: Schema.optional(Schema.String),
});
export type GitHubOAuthOutput = typeof GitHubOAuthOutput.Type;

// The operation
/**
 * Gets GitHubOAuth info used to authenticate users with the Developer Hub GitHub App.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param location - The name of Azure region.
 */
export const GitHubOAuth = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GitHubOAuthInput,
  outputSchema: GitHubOAuthOutput,
}));
// Input Schema
export const GitHubOAuthCallbackInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DevHub/locations/{location}/githuboauth/default",
    }),
  );
export type GitHubOAuthCallbackInput = typeof GitHubOAuthCallbackInput.Type;

// Output Schema
export const GitHubOAuthCallbackOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type GitHubOAuthCallbackOutput = typeof GitHubOAuthCallbackOutput.Type;

// The operation
/**
 * Callback URL to hit once authenticated with GitHub App to have the service store the OAuth token.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param location - The name of Azure region.
 */
export const GitHubOAuthCallback = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GitHubOAuthCallbackInput,
  outputSchema: GitHubOAuthCallbackOutput,
}));
// Input Schema
export const ListGitHubOAuthInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  location: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.DevHub/locations/{location}/githuboauth",
  }),
);
export type ListGitHubOAuthInput = typeof ListGitHubOAuthInput.Type;

// Output Schema
export const ListGitHubOAuthOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(Schema.Array(Schema.Struct({}))),
});
export type ListGitHubOAuthOutput = typeof ListGitHubOAuthOutput.Type;

// The operation
/**
 * Callback URL to hit once authenticated with GitHub App to have the service store the OAuth token.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param location - The name of Azure region.
 */
export const ListGitHubOAuth = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ListGitHubOAuthInput,
  outputSchema: ListGitHubOAuthOutput,
}));
// Input Schema
export const WorkflowCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevHub/workflows/{workflowName}",
    }),
  );
export type WorkflowCreateOrUpdateInput =
  typeof WorkflowCreateOrUpdateInput.Type;

// Output Schema
export const WorkflowCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type WorkflowCreateOrUpdateOutput =
  typeof WorkflowCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a workflow
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const WorkflowCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WorkflowCreateOrUpdateInput,
    outputSchema: WorkflowCreateOrUpdateOutput,
  }),
);
// Input Schema
export const WorkflowDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevHub/workflows/{workflowName}",
  }),
);
export type WorkflowDeleteInput = typeof WorkflowDeleteInput.Type;

// Output Schema
export const WorkflowDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  status: Schema.optional(Schema.String),
});
export type WorkflowDeleteOutput = typeof WorkflowDeleteOutput.Type;

// The operation
/**
 * Deletes a workflow
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const WorkflowDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WorkflowDeleteInput,
  outputSchema: WorkflowDeleteOutput,
}));
// Input Schema
export const WorkflowGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevHub/workflows/{workflowName}",
  }),
);
export type WorkflowGetInput = typeof WorkflowGetInput.Type;

// Output Schema
export const WorkflowGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type WorkflowGetOutput = typeof WorkflowGetOutput.Type;

// The operation
/**
 * Gets a workflow.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const WorkflowGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WorkflowGetInput,
  outputSchema: WorkflowGetOutput,
}));
// Input Schema
export const WorkflowListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.DevHub/workflows",
  }),
);
export type WorkflowListInput = typeof WorkflowListInput.Type;

// Output Schema
export const WorkflowListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
export type WorkflowListOutput = typeof WorkflowListOutput.Type;

// The operation
/**
 * Gets a list of workflows associated with the specified subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const WorkflowList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WorkflowListInput,
  outputSchema: WorkflowListOutput,
}));
// Input Schema
export const WorkflowListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevHub/workflows",
    }),
  );
export type WorkflowListByResourceGroupInput =
  typeof WorkflowListByResourceGroupInput.Type;

// Output Schema
export const WorkflowListByResourceGroupOutput =
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
export type WorkflowListByResourceGroupOutput =
  typeof WorkflowListByResourceGroupOutput.Type;

// The operation
/**
 * Gets a list of workflows within a resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const WorkflowListByResourceGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WorkflowListByResourceGroupInput,
    outputSchema: WorkflowListByResourceGroupOutput,
  }),
);
// Input Schema
export const WorkflowUpdateTagsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevHub/workflows/{workflowName}",
    }),
  );
export type WorkflowUpdateTagsInput = typeof WorkflowUpdateTagsInput.Type;

// Output Schema
export const WorkflowUpdateTagsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type WorkflowUpdateTagsOutput = typeof WorkflowUpdateTagsOutput.Type;

// The operation
/**
 * Updates tags on a workflow.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const WorkflowUpdateTags = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WorkflowUpdateTagsInput,
  outputSchema: WorkflowUpdateTagsOutput,
}));
