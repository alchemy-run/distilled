/**
 * Azure Edge API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const ArtifactsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  name: Schema.String.pipe(T.PathParam()),
  imageName: Schema.String.pipe(T.PathParam()),
  artifactName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/disconnectedOperations/{name}/images/{imageName}/artifacts/{artifactName}",
  }),
);
export type ArtifactsGetInput = typeof ArtifactsGetInput.Type;

// Output Schema
export const ArtifactsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ArtifactsGetOutput = typeof ArtifactsGetOutput.Type;

// The operation
/**
 * Get the resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of the resource
 * @param imageName - The name of the Image
 * @param artifactName - The name of the Artifact
 */
export const ArtifactsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ArtifactsGetInput,
  outputSchema: ArtifactsGetOutput,
}));
// Input Schema
export const ArtifactsListByParentInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    imageName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/disconnectedOperations/{name}/images/{imageName}/artifacts",
    }),
  );
export type ArtifactsListByParentInput = typeof ArtifactsListByParentInput.Type;

// Output Schema
export const ArtifactsListByParentOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type ArtifactsListByParentOutput =
  typeof ArtifactsListByParentOutput.Type;

// The operation
/**
 * List by parent
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of the resource
 * @param imageName - The name of the Image
 */
export const ArtifactsListByParent = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ArtifactsListByParentInput,
    outputSchema: ArtifactsListByParentOutput,
  }),
);
// Input Schema
export const ArtifactsListDownloadUriInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    imageName: Schema.String.pipe(T.PathParam()),
    artifactName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/disconnectedOperations/{name}/images/{imageName}/artifacts/{artifactName}/listDownloadUri",
    }),
  );
export type ArtifactsListDownloadUriInput =
  typeof ArtifactsListDownloadUriInput.Type;

// Output Schema
export const ArtifactsListDownloadUriOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    provisioningState: Schema.optional(
      Schema.Literals(["Succeeded", "Failed", "Canceled"]),
    ),
    artifactOrder: Schema.Number,
    title: Schema.String,
    description: Schema.String,
    size: Schema.optional(Schema.Number),
    downloadLink: Schema.String,
    linkExpiry: Schema.String,
  });
export type ArtifactsListDownloadUriOutput =
  typeof ArtifactsListDownloadUriOutput.Type;

// The operation
/**
 * Get artifact download link.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of the resource
 * @param imageName - The name of the Image
 * @param artifactName - The name of the Artifact
 */
export const ArtifactsListDownloadUri = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ArtifactsListDownloadUriInput,
    outputSchema: ArtifactsListDownloadUriOutput,
  }),
);
// Input Schema
export const ConfigTemplatesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    configTemplateName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/configTemplates/{configTemplateName}",
    }),
  );
export type ConfigTemplatesCreateOrUpdateInput =
  typeof ConfigTemplatesCreateOrUpdateInput.Type;

// Output Schema
export const ConfigTemplatesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ConfigTemplatesCreateOrUpdateOutput =
  typeof ConfigTemplatesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a Config Template Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param configTemplateName - The name of the ConfigTemplate
 */
export const ConfigTemplatesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigTemplatesCreateOrUpdateInput,
    outputSchema: ConfigTemplatesCreateOrUpdateOutput,
  }));
// Input Schema
export const ConfigTemplatesCreateVersionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    configTemplateName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/configTemplates/{configTemplateName}/createVersion",
    }),
  );
export type ConfigTemplatesCreateVersionInput =
  typeof ConfigTemplatesCreateVersionInput.Type;

// Output Schema
export const ConfigTemplatesCreateVersionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ConfigTemplatesCreateVersionOutput =
  typeof ConfigTemplatesCreateVersionOutput.Type;

// The operation
/**
 * Create or update a Config Template Version Resource with the specified UpdateType
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param configTemplateName - The name of the ConfigTemplate
 */
export const ConfigTemplatesCreateVersion =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigTemplatesCreateVersionInput,
    outputSchema: ConfigTemplatesCreateVersionOutput,
  }));
// Input Schema
export const ConfigTemplatesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    configTemplateName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/configTemplates/{configTemplateName}",
    }),
  );
export type ConfigTemplatesDeleteInput = typeof ConfigTemplatesDeleteInput.Type;

// Output Schema
export const ConfigTemplatesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ConfigTemplatesDeleteOutput =
  typeof ConfigTemplatesDeleteOutput.Type;

// The operation
/**
 * Delete a Config Template Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param configTemplateName - The name of the ConfigTemplate
 */
export const ConfigTemplatesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ConfigTemplatesDeleteInput,
    outputSchema: ConfigTemplatesDeleteOutput,
  }),
);
// Input Schema
export const ConfigTemplatesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    configTemplateName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/configTemplates/{configTemplateName}",
    }),
  );
export type ConfigTemplatesGetInput = typeof ConfigTemplatesGetInput.Type;

// Output Schema
export const ConfigTemplatesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ConfigTemplatesGetOutput = typeof ConfigTemplatesGetOutput.Type;

// The operation
/**
 * Get a Config Template Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param configTemplateName - The name of the ConfigTemplate
 */
export const ConfigTemplatesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ConfigTemplatesGetInput,
  outputSchema: ConfigTemplatesGetOutput,
}));
// Input Schema
export const ConfigTemplatesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/configTemplates",
    }),
  );
export type ConfigTemplatesListByResourceGroupInput =
  typeof ConfigTemplatesListByResourceGroupInput.Type;

// Output Schema
export const ConfigTemplatesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ConfigTemplatesListByResourceGroupOutput =
  typeof ConfigTemplatesListByResourceGroupOutput.Type;

// The operation
/**
 * List by specified resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ConfigTemplatesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigTemplatesListByResourceGroupInput,
    outputSchema: ConfigTemplatesListByResourceGroupOutput,
  }));
// Input Schema
export const ConfigTemplatesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Edge/configTemplates",
    }),
  );
export type ConfigTemplatesListBySubscriptionInput =
  typeof ConfigTemplatesListBySubscriptionInput.Type;

// Output Schema
export const ConfigTemplatesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ConfigTemplatesListBySubscriptionOutput =
  typeof ConfigTemplatesListBySubscriptionOutput.Type;

// The operation
/**
 * List by subscription
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const ConfigTemplatesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigTemplatesListBySubscriptionInput,
    outputSchema: ConfigTemplatesListBySubscriptionOutput,
  }));
// Input Schema
export const ConfigTemplatesRemoveVersionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    configTemplateName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/configTemplates/{configTemplateName}/removeVersion",
    }),
  );
export type ConfigTemplatesRemoveVersionInput =
  typeof ConfigTemplatesRemoveVersionInput.Type;

// Output Schema
export const ConfigTemplatesRemoveVersionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    status: Schema.String,
  });
export type ConfigTemplatesRemoveVersionOutput =
  typeof ConfigTemplatesRemoveVersionOutput.Type;

// The operation
/**
 * Remove Config Template Version Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param configTemplateName - The name of the ConfigTemplate
 */
export const ConfigTemplatesRemoveVersion =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigTemplatesRemoveVersionInput,
    outputSchema: ConfigTemplatesRemoveVersionOutput,
  }));
// Input Schema
export const ConfigTemplatesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    configTemplateName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/configTemplates/{configTemplateName}",
    }),
  );
export type ConfigTemplatesUpdateInput = typeof ConfigTemplatesUpdateInput.Type;

// Output Schema
export const ConfigTemplatesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ConfigTemplatesUpdateOutput =
  typeof ConfigTemplatesUpdateOutput.Type;

// The operation
/**
 * update a Config Template Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param configTemplateName - The name of the ConfigTemplate
 */
export const ConfigTemplatesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ConfigTemplatesUpdateInput,
    outputSchema: ConfigTemplatesUpdateOutput,
  }),
);
// Input Schema
export const ConfigTemplateVersionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    configTemplateName: Schema.String.pipe(T.PathParam()),
    configTemplateVersionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/configTemplates/{configTemplateName}/versions/{configTemplateVersionName}",
    }),
  );
export type ConfigTemplateVersionsGetInput =
  typeof ConfigTemplateVersionsGetInput.Type;

// Output Schema
export const ConfigTemplateVersionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ConfigTemplateVersionsGetOutput =
  typeof ConfigTemplateVersionsGetOutput.Type;

// The operation
/**
 * Get a Config Template Version Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param configTemplateName - The name of the ConfigTemplate
 * @param configTemplateVersionName - The name of the ConfigTemplateVersion
 */
export const ConfigTemplateVersionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ConfigTemplateVersionsGetInput,
    outputSchema: ConfigTemplateVersionsGetOutput,
  }),
);
// Input Schema
export const ConfigTemplateVersionsListByConfigTemplateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    configTemplateName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/configTemplates/{configTemplateName}/versions",
    }),
  );
export type ConfigTemplateVersionsListByConfigTemplateInput =
  typeof ConfigTemplateVersionsListByConfigTemplateInput.Type;

// Output Schema
export const ConfigTemplateVersionsListByConfigTemplateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type ConfigTemplateVersionsListByConfigTemplateOutput =
  typeof ConfigTemplateVersionsListByConfigTemplateOutput.Type;

// The operation
/**
 * List Config Template Version Resources
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param configTemplateName - The name of the ConfigTemplate
 */
export const ConfigTemplateVersionsListByConfigTemplate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigTemplateVersionsListByConfigTemplateInput,
    outputSchema: ConfigTemplateVersionsListByConfigTemplateOutput,
  }));
// Input Schema
export const ConfigurationReferencesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    configurationReferenceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/{resourceUri}/providers/Microsoft.Edge/configurationReferences/{configurationReferenceName}",
    }),
  );
export type ConfigurationReferencesCreateOrUpdateInput =
  typeof ConfigurationReferencesCreateOrUpdateInput.Type;

// Output Schema
export const ConfigurationReferencesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ConfigurationReferencesCreateOrUpdateOutput =
  typeof ConfigurationReferencesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a ConfigurationReference
 *
 * @param api-version - The API version to use for this operation.
 * @param configurationReferenceName - The name of the ConfigurationReference
 */
export const ConfigurationReferencesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigurationReferencesCreateOrUpdateInput,
    outputSchema: ConfigurationReferencesCreateOrUpdateOutput,
  }));
// Input Schema
export const ConfigurationReferencesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    configurationReferenceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/{resourceUri}/providers/Microsoft.Edge/configurationReferences/{configurationReferenceName}",
    }),
  );
export type ConfigurationReferencesDeleteInput =
  typeof ConfigurationReferencesDeleteInput.Type;

// Output Schema
export const ConfigurationReferencesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ConfigurationReferencesDeleteOutput =
  typeof ConfigurationReferencesDeleteOutput.Type;

// The operation
/**
 * Delete a ConfigurationReference
 *
 * @param api-version - The API version to use for this operation.
 * @param configurationReferenceName - The name of the ConfigurationReference
 */
export const ConfigurationReferencesDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigurationReferencesDeleteInput,
    outputSchema: ConfigurationReferencesDeleteOutput,
  }));
// Input Schema
export const ConfigurationReferencesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    configurationReferenceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/{resourceUri}/providers/Microsoft.Edge/configurationReferences/{configurationReferenceName}",
    }),
  );
export type ConfigurationReferencesGetInput =
  typeof ConfigurationReferencesGetInput.Type;

// Output Schema
export const ConfigurationReferencesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ConfigurationReferencesGetOutput =
  typeof ConfigurationReferencesGetOutput.Type;

// The operation
/**
 * Get a ConfigurationReference
 *
 * @param api-version - The API version to use for this operation.
 * @param configurationReferenceName - The name of the ConfigurationReference
 */
export const ConfigurationReferencesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ConfigurationReferencesGetInput,
    outputSchema: ConfigurationReferencesGetOutput,
  }),
);
// Input Schema
export const ConfigurationReferencesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/{resourceUri}/providers/Microsoft.Edge/configurationReferences",
    }),
  );
export type ConfigurationReferencesListInput =
  typeof ConfigurationReferencesListInput.Type;

// Output Schema
export const ConfigurationReferencesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type ConfigurationReferencesListOutput =
  typeof ConfigurationReferencesListOutput.Type;

// The operation
/**
 * List ConfigurationReference resources by parent
 *
 * @param api-version - The API version to use for this operation.
 */
export const ConfigurationReferencesList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ConfigurationReferencesListInput,
    outputSchema: ConfigurationReferencesListOutput,
  }),
);
// Input Schema
export const ConfigurationReferencesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    configurationReferenceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/{resourceUri}/providers/Microsoft.Edge/configurationReferences/{configurationReferenceName}",
    }),
  );
export type ConfigurationReferencesUpdateInput =
  typeof ConfigurationReferencesUpdateInput.Type;

// Output Schema
export const ConfigurationReferencesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ConfigurationReferencesUpdateOutput =
  typeof ConfigurationReferencesUpdateOutput.Type;

// The operation
/**
 * Update a ConfigurationReference
 *
 * @param api-version - The API version to use for this operation.
 * @param configurationReferenceName - The name of the ConfigurationReference
 */
export const ConfigurationReferencesUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigurationReferencesUpdateInput,
    outputSchema: ConfigurationReferencesUpdateOutput,
  }));
// Input Schema
export const ConfigurationsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    configurationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/configurations/{configurationName}",
    }),
  );
export type ConfigurationsCreateOrUpdateInput =
  typeof ConfigurationsCreateOrUpdateInput.Type;

// Output Schema
export const ConfigurationsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ConfigurationsCreateOrUpdateOutput =
  typeof ConfigurationsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a Configuration Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param configurationName - Name of the Configuration
 */
export const ConfigurationsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigurationsCreateOrUpdateInput,
    outputSchema: ConfigurationsCreateOrUpdateOutput,
  }));
// Input Schema
export const ConfigurationsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    configurationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/configurations/{configurationName}",
    }),
  );
export type ConfigurationsDeleteInput = typeof ConfigurationsDeleteInput.Type;

// Output Schema
export const ConfigurationsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ConfigurationsDeleteOutput = typeof ConfigurationsDeleteOutput.Type;

// The operation
/**
 * Delete a Configuration Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param configurationName - Name of the Configuration
 */
export const ConfigurationsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ConfigurationsDeleteInput,
    outputSchema: ConfigurationsDeleteOutput,
  }),
);
// Input Schema
export const ConfigurationsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    configurationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/configurations/{configurationName}",
  }),
);
export type ConfigurationsGetInput = typeof ConfigurationsGetInput.Type;

// Output Schema
export const ConfigurationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ConfigurationsGetOutput = typeof ConfigurationsGetOutput.Type;

// The operation
/**
 * Get a Configuration Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param configurationName - Name of the Configuration
 */
export const ConfigurationsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ConfigurationsGetInput,
  outputSchema: ConfigurationsGetOutput,
}));
// Input Schema
export const ConfigurationsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/configurations",
    }),
  );
export type ConfigurationsListByResourceGroupInput =
  typeof ConfigurationsListByResourceGroupInput.Type;

// Output Schema
export const ConfigurationsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ConfigurationsListByResourceGroupOutput =
  typeof ConfigurationsListByResourceGroupOutput.Type;

// The operation
/**
 * List by specified resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ConfigurationsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigurationsListByResourceGroupInput,
    outputSchema: ConfigurationsListByResourceGroupOutput,
  }));
// Input Schema
export const ConfigurationsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Edge/configurations",
    }),
  );
export type ConfigurationsListBySubscriptionInput =
  typeof ConfigurationsListBySubscriptionInput.Type;

// Output Schema
export const ConfigurationsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ConfigurationsListBySubscriptionOutput =
  typeof ConfigurationsListBySubscriptionOutput.Type;

// The operation
/**
 * List by subscription
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const ConfigurationsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigurationsListBySubscriptionInput,
    outputSchema: ConfigurationsListBySubscriptionOutput,
  }));
// Input Schema
export const ConfigurationsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    configurationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/configurations/{configurationName}",
    }),
  );
export type ConfigurationsUpdateInput = typeof ConfigurationsUpdateInput.Type;

// Output Schema
export const ConfigurationsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ConfigurationsUpdateOutput = typeof ConfigurationsUpdateOutput.Type;

// The operation
/**
 * Update a Configuration Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param configurationName - Name of the Configuration
 */
export const ConfigurationsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ConfigurationsUpdateInput,
    outputSchema: ConfigurationsUpdateOutput,
  }),
);
// Input Schema
export const ContextsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    contextName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/contexts/{contextName}",
    }),
  );
export type ContextsCreateOrUpdateInput =
  typeof ContextsCreateOrUpdateInput.Type;

// Output Schema
export const ContextsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ContextsCreateOrUpdateOutput =
  typeof ContextsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update Context Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param contextName - The name of the Context.
 */
export const ContextsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ContextsCreateOrUpdateInput,
    outputSchema: ContextsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const ContextsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  contextName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/contexts/{contextName}",
  }),
);
export type ContextsDeleteInput = typeof ContextsDeleteInput.Type;

// Output Schema
export const ContextsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ContextsDeleteOutput = typeof ContextsDeleteOutput.Type;

// The operation
/**
 * Delete Context Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param contextName - The name of the Context.
 */
export const ContextsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ContextsDeleteInput,
  outputSchema: ContextsDeleteOutput,
}));
// Input Schema
export const ContextsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  contextName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/contexts/{contextName}",
  }),
);
export type ContextsGetInput = typeof ContextsGetInput.Type;

// Output Schema
export const ContextsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type ContextsGetOutput = typeof ContextsGetOutput.Type;

// The operation
/**
 * Get Context Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param contextName - The name of the Context.
 */
export const ContextsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ContextsGetInput,
  outputSchema: ContextsGetOutput,
}));
// Input Schema
export const ContextsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/contexts",
    }),
  );
export type ContextsListByResourceGroupInput =
  typeof ContextsListByResourceGroupInput.Type;

// Output Schema
export const ContextsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ContextsListByResourceGroupOutput =
  typeof ContextsListByResourceGroupOutput.Type;

// The operation
/**
 * List by specified resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ContextsListByResourceGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ContextsListByResourceGroupInput,
    outputSchema: ContextsListByResourceGroupOutput,
  }),
);
// Input Schema
export const ContextsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Edge/contexts",
    }),
  );
export type ContextsListBySubscriptionInput =
  typeof ContextsListBySubscriptionInput.Type;

// Output Schema
export const ContextsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ContextsListBySubscriptionOutput =
  typeof ContextsListBySubscriptionOutput.Type;

// The operation
/**
 * List by subscription
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const ContextsListBySubscription = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ContextsListBySubscriptionInput,
    outputSchema: ContextsListBySubscriptionOutput,
  }),
);
// Input Schema
export const ContextsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  contextName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/contexts/{contextName}",
  }),
);
export type ContextsUpdateInput = typeof ContextsUpdateInput.Type;

// Output Schema
export const ContextsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type ContextsUpdateOutput = typeof ContextsUpdateOutput.Type;

// The operation
/**
 * update an Context Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param contextName - The name of the Context.
 */
export const ContextsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ContextsUpdateInput,
  outputSchema: ContextsUpdateOutput,
}));
// Input Schema
export const DiagnosticsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    diagnosticName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/diagnostics/{diagnosticName}",
    }),
  );
export type DiagnosticsCreateOrUpdateInput =
  typeof DiagnosticsCreateOrUpdateInput.Type;

// Output Schema
export const DiagnosticsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type DiagnosticsCreateOrUpdateOutput =
  typeof DiagnosticsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates new or updates existing Diagnostic resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param diagnosticName - Name of Diagnostic.
 */
export const DiagnosticsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DiagnosticsCreateOrUpdateInput,
    outputSchema: DiagnosticsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const DiagnosticsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    diagnosticName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/diagnostics/{diagnosticName}",
  }),
);
export type DiagnosticsDeleteInput = typeof DiagnosticsDeleteInput.Type;

// Output Schema
export const DiagnosticsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DiagnosticsDeleteOutput = typeof DiagnosticsDeleteOutput.Type;

// The operation
/**
 * Deletes specified Diagnostic resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param diagnosticName - Name of Diagnostic.
 */
export const DiagnosticsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DiagnosticsDeleteInput,
  outputSchema: DiagnosticsDeleteOutput,
}));
// Input Schema
export const DiagnosticsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  diagnosticName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/diagnostics/{diagnosticName}",
  }),
);
export type DiagnosticsGetInput = typeof DiagnosticsGetInput.Type;

// Output Schema
export const DiagnosticsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type DiagnosticsGetOutput = typeof DiagnosticsGetOutput.Type;

// The operation
/**
 * Returns details of specified Diagnostic resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param diagnosticName - Name of Diagnostic.
 */
export const DiagnosticsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DiagnosticsGetInput,
  outputSchema: DiagnosticsGetOutput,
}));
// Input Schema
export const DiagnosticsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/diagnostics",
    }),
  );
export type DiagnosticsListByResourceGroupInput =
  typeof DiagnosticsListByResourceGroupInput.Type;

// Output Schema
export const DiagnosticsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type DiagnosticsListByResourceGroupOutput =
  typeof DiagnosticsListByResourceGroupOutput.Type;

// The operation
/**
 * Returns a collection of Diagnostic resources within the resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const DiagnosticsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DiagnosticsListByResourceGroupInput,
    outputSchema: DiagnosticsListByResourceGroupOutput,
  }));
// Input Schema
export const DiagnosticsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Edge/diagnostics",
    }),
  );
export type DiagnosticsListBySubscriptionInput =
  typeof DiagnosticsListBySubscriptionInput.Type;

// Output Schema
export const DiagnosticsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type DiagnosticsListBySubscriptionOutput =
  typeof DiagnosticsListBySubscriptionOutput.Type;

// The operation
/**
 * Lists Diagnostics resources within an Azure subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const DiagnosticsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DiagnosticsListBySubscriptionInput,
    outputSchema: DiagnosticsListBySubscriptionOutput,
  }));
// Input Schema
export const DiagnosticsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    diagnosticName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/diagnostics/{diagnosticName}",
  }),
);
export type DiagnosticsUpdateInput = typeof DiagnosticsUpdateInput.Type;

// Output Schema
export const DiagnosticsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type DiagnosticsUpdateOutput = typeof DiagnosticsUpdateOutput.Type;

// The operation
/**
 * Updates existing Diagnostic resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param diagnosticName - Name of Diagnostic.
 */
export const DiagnosticsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DiagnosticsUpdateInput,
  outputSchema: DiagnosticsUpdateOutput,
}));
// Input Schema
export const DisconnectedOperationsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/disconnectedOperations/{name}",
    }),
  );
export type DisconnectedOperationsCreateOrUpdateInput =
  typeof DisconnectedOperationsCreateOrUpdateInput.Type;

// Output Schema
export const DisconnectedOperationsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type DisconnectedOperationsCreateOrUpdateOutput =
  typeof DisconnectedOperationsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a DisconnectedOperation
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of the resource
 */
export const DisconnectedOperationsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DisconnectedOperationsCreateOrUpdateInput,
    outputSchema: DisconnectedOperationsCreateOrUpdateOutput,
  }));
// Input Schema
export const DisconnectedOperationsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/disconnectedOperations/{name}",
    }),
  );
export type DisconnectedOperationsDeleteInput =
  typeof DisconnectedOperationsDeleteInput.Type;

// Output Schema
export const DisconnectedOperationsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DisconnectedOperationsDeleteOutput =
  typeof DisconnectedOperationsDeleteOutput.Type;

// The operation
/**
 * Delete a DisconnectedOperation
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of the resource
 */
export const DisconnectedOperationsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DisconnectedOperationsDeleteInput,
    outputSchema: DisconnectedOperationsDeleteOutput,
  }));
// Input Schema
export const DisconnectedOperationsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/disconnectedOperations/{name}",
    }),
  );
export type DisconnectedOperationsGetInput =
  typeof DisconnectedOperationsGetInput.Type;

// Output Schema
export const DisconnectedOperationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type DisconnectedOperationsGetOutput =
  typeof DisconnectedOperationsGetOutput.Type;

// The operation
/**
 * Get a DisconnectedOperation
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of the resource
 */
export const DisconnectedOperationsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DisconnectedOperationsGetInput,
    outputSchema: DisconnectedOperationsGetOutput,
  }),
);
// Input Schema
export const DisconnectedOperationsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/disconnectedOperations",
    }),
  );
export type DisconnectedOperationsListByResourceGroupInput =
  typeof DisconnectedOperationsListByResourceGroupInput.Type;

// Output Schema
export const DisconnectedOperationsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type DisconnectedOperationsListByResourceGroupOutput =
  typeof DisconnectedOperationsListByResourceGroupOutput.Type;

// The operation
/**
 * List DisconnectedOperation resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const DisconnectedOperationsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DisconnectedOperationsListByResourceGroupInput,
    outputSchema: DisconnectedOperationsListByResourceGroupOutput,
  }));
// Input Schema
export const DisconnectedOperationsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Edge/disconnectedOperations",
    }),
  );
export type DisconnectedOperationsListBySubscriptionInput =
  typeof DisconnectedOperationsListBySubscriptionInput.Type;

// Output Schema
export const DisconnectedOperationsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type DisconnectedOperationsListBySubscriptionOutput =
  typeof DisconnectedOperationsListBySubscriptionOutput.Type;

// The operation
/**
 * List DisconnectedOperation resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const DisconnectedOperationsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DisconnectedOperationsListBySubscriptionInput,
    outputSchema: DisconnectedOperationsListBySubscriptionOutput,
  }));
// Input Schema
export const DisconnectedOperationsListDeploymentManifestInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/disconnectedOperations/{name}/listDeploymentManifest",
    }),
  );
export type DisconnectedOperationsListDeploymentManifestInput =
  typeof DisconnectedOperationsListDeploymentManifestInput.Type;

// Output Schema
export const DisconnectedOperationsListDeploymentManifestOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceId: Schema.String,
    resourceName: Schema.String,
    stampId: Schema.String,
    location: Schema.String,
    billingModel: Schema.Literals(["Capacity"]),
    connectionIntent: Schema.Literals(["Connected", "Disconnected"]),
    cloud: Schema.optional(Schema.String),
    billingConfiguration: Schema.optional(
      Schema.Struct({
        autoRenew: Schema.Literals(["Enabled", "Disabled"]),
        billingStatus: Schema.Literals(["Enabled", "Disabled", "Stopped"]),
        current: Schema.Struct({
          cores: Schema.Number,
          pricingModel: Schema.Literals(["Trial", "Annual"]),
          startDate: Schema.optional(Schema.String),
          endDate: Schema.optional(Schema.String),
        }),
        upcoming: Schema.optional(
          Schema.Struct({
            cores: Schema.Number,
            pricingModel: Schema.Literals(["Trial", "Annual"]),
            startDate: Schema.optional(Schema.String),
            endDate: Schema.optional(Schema.String),
          }),
        ),
      }),
    ),
    benefitPlans: Schema.optional(
      Schema.Struct({
        azureHybridWindowsServerBenefit: Schema.optional(
          Schema.Literals(["Enabled", "Disabled"]),
        ),
        windowsServerVmCount: Schema.optional(Schema.Number),
      }),
    ),
  });
export type DisconnectedOperationsListDeploymentManifestOutput =
  typeof DisconnectedOperationsListDeploymentManifestOutput.Type;

// The operation
/**
 * get deployment manifest.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of the resource
 */
export const DisconnectedOperationsListDeploymentManifest =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DisconnectedOperationsListDeploymentManifestInput,
    outputSchema: DisconnectedOperationsListDeploymentManifestOutput,
  }));
// Input Schema
export const DisconnectedOperationsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/disconnectedOperations/{name}",
    }),
  );
export type DisconnectedOperationsUpdateInput =
  typeof DisconnectedOperationsUpdateInput.Type;

// Output Schema
export const DisconnectedOperationsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type DisconnectedOperationsUpdateOutput =
  typeof DisconnectedOperationsUpdateOutput.Type;

// The operation
/**
 * Update a DisconnectedOperation
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of the resource
 */
export const DisconnectedOperationsUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DisconnectedOperationsUpdateInput,
    outputSchema: DisconnectedOperationsUpdateOutput,
  }));
// Input Schema
export const DynamicConfigurationsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    configurationName: Schema.String.pipe(T.PathParam()),
    dynamicConfigurationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/configurations/{configurationName}/dynamicConfigurations/{dynamicConfigurationName}",
    }),
  );
export type DynamicConfigurationsCreateOrUpdateInput =
  typeof DynamicConfigurationsCreateOrUpdateInput.Type;

// Output Schema
export const DynamicConfigurationsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DynamicConfigurationsCreateOrUpdateOutput =
  typeof DynamicConfigurationsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a Dynamic Configuration Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param configurationName - Name of the Configuration
 * @param dynamicConfigurationName - Name of the dynamic configuration
 */
export const DynamicConfigurationsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DynamicConfigurationsCreateOrUpdateInput,
    outputSchema: DynamicConfigurationsCreateOrUpdateOutput,
  }));
// Input Schema
export const DynamicConfigurationsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    configurationName: Schema.String.pipe(T.PathParam()),
    dynamicConfigurationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/configurations/{configurationName}/dynamicConfigurations/{dynamicConfigurationName}",
    }),
  );
export type DynamicConfigurationsDeleteInput =
  typeof DynamicConfigurationsDeleteInput.Type;

// Output Schema
export const DynamicConfigurationsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DynamicConfigurationsDeleteOutput =
  typeof DynamicConfigurationsDeleteOutput.Type;

// The operation
/**
 * Delete a Dynamic Configuration Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param configurationName - Name of the Configuration
 * @param dynamicConfigurationName - Name of the dynamic configuration
 */
export const DynamicConfigurationsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DynamicConfigurationsDeleteInput,
    outputSchema: DynamicConfigurationsDeleteOutput,
  }),
);
// Input Schema
export const DynamicConfigurationsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    configurationName: Schema.String.pipe(T.PathParam()),
    dynamicConfigurationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/configurations/{configurationName}/dynamicConfigurations/{dynamicConfigurationName}",
    }),
  );
export type DynamicConfigurationsGetInput =
  typeof DynamicConfigurationsGetInput.Type;

// Output Schema
export const DynamicConfigurationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DynamicConfigurationsGetOutput =
  typeof DynamicConfigurationsGetOutput.Type;

// The operation
/**
 * Get a Dynamic Configuration Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param configurationName - Name of the Configuration
 * @param dynamicConfigurationName - Name of the dynamic configuration
 */
export const DynamicConfigurationsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DynamicConfigurationsGetInput,
    outputSchema: DynamicConfigurationsGetOutput,
  }),
);
// Input Schema
export const DynamicConfigurationsListByConfigurationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    configurationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/configurations/{configurationName}/dynamicConfigurations",
    }),
  );
export type DynamicConfigurationsListByConfigurationInput =
  typeof DynamicConfigurationsListByConfigurationInput.Type;

// Output Schema
export const DynamicConfigurationsListByConfigurationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type DynamicConfigurationsListByConfigurationOutput =
  typeof DynamicConfigurationsListByConfigurationOutput.Type;

// The operation
/**
 * List Dynamic Configuration Resources
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param configurationName - Name of the Configuration
 */
export const DynamicConfigurationsListByConfiguration =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DynamicConfigurationsListByConfigurationInput,
    outputSchema: DynamicConfigurationsListByConfigurationOutput,
  }));
// Input Schema
export const DynamicConfigurationsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    configurationName: Schema.String.pipe(T.PathParam()),
    dynamicConfigurationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/configurations/{configurationName}/dynamicConfigurations/{dynamicConfigurationName}",
    }),
  );
export type DynamicConfigurationsUpdateInput =
  typeof DynamicConfigurationsUpdateInput.Type;

// Output Schema
export const DynamicConfigurationsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DynamicConfigurationsUpdateOutput =
  typeof DynamicConfigurationsUpdateOutput.Type;

// The operation
/**
 * Update a Dynamic Configuration Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param configurationName - Name of the Configuration
 * @param dynamicConfigurationName - Name of the dynamic configuration
 */
export const DynamicConfigurationsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DynamicConfigurationsUpdateInput,
    outputSchema: DynamicConfigurationsUpdateOutput,
  }),
);
// Input Schema
export const DynamicConfigurationVersionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    configurationName: Schema.String.pipe(T.PathParam()),
    dynamicConfigurationName: Schema.String.pipe(T.PathParam()),
    dynamicConfigurationVersionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/configurations/{configurationName}/dynamicConfigurations/{dynamicConfigurationName}/versions/{dynamicConfigurationVersionName}",
    }),
  );
export type DynamicConfigurationVersionsCreateOrUpdateInput =
  typeof DynamicConfigurationVersionsCreateOrUpdateInput.Type;

// Output Schema
export const DynamicConfigurationVersionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DynamicConfigurationVersionsCreateOrUpdateOutput =
  typeof DynamicConfigurationVersionsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a Dynamic Configuration Version Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param configurationName - Name of the Configuration
 * @param dynamicConfigurationName - Name of the dynamic configuration
 * @param dynamicConfigurationVersionName - The name of the DynamicConfigurationVersion
 */
export const DynamicConfigurationVersionsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DynamicConfigurationVersionsCreateOrUpdateInput,
    outputSchema: DynamicConfigurationVersionsCreateOrUpdateOutput,
  }));
// Input Schema
export const DynamicConfigurationVersionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    configurationName: Schema.String.pipe(T.PathParam()),
    dynamicConfigurationName: Schema.String.pipe(T.PathParam()),
    dynamicConfigurationVersionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/configurations/{configurationName}/dynamicConfigurations/{dynamicConfigurationName}/versions/{dynamicConfigurationVersionName}",
    }),
  );
export type DynamicConfigurationVersionsDeleteInput =
  typeof DynamicConfigurationVersionsDeleteInput.Type;

// Output Schema
export const DynamicConfigurationVersionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DynamicConfigurationVersionsDeleteOutput =
  typeof DynamicConfigurationVersionsDeleteOutput.Type;

// The operation
/**
 * Delete a Dynamic Configuration Version Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param configurationName - Name of the Configuration
 * @param dynamicConfigurationName - Name of the dynamic configuration
 * @param dynamicConfigurationVersionName - The name of the DynamicConfigurationVersion
 */
export const DynamicConfigurationVersionsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DynamicConfigurationVersionsDeleteInput,
    outputSchema: DynamicConfigurationVersionsDeleteOutput,
  }));
// Input Schema
export const DynamicConfigurationVersionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    configurationName: Schema.String.pipe(T.PathParam()),
    dynamicConfigurationName: Schema.String.pipe(T.PathParam()),
    dynamicConfigurationVersionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/configurations/{configurationName}/dynamicConfigurations/{dynamicConfigurationName}/versions/{dynamicConfigurationVersionName}",
    }),
  );
export type DynamicConfigurationVersionsGetInput =
  typeof DynamicConfigurationVersionsGetInput.Type;

// Output Schema
export const DynamicConfigurationVersionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DynamicConfigurationVersionsGetOutput =
  typeof DynamicConfigurationVersionsGetOutput.Type;

// The operation
/**
 * Get a Dynamic Configuration Version Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param configurationName - Name of the Configuration
 * @param dynamicConfigurationName - Name of the dynamic configuration
 * @param dynamicConfigurationVersionName - The name of the DynamicConfigurationVersion
 */
export const DynamicConfigurationVersionsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DynamicConfigurationVersionsGetInput,
    outputSchema: DynamicConfigurationVersionsGetOutput,
  }));
// Input Schema
export const DynamicConfigurationVersionsListByDynamicConfigurationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    configurationName: Schema.String.pipe(T.PathParam()),
    dynamicConfigurationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/configurations/{configurationName}/dynamicConfigurations/{dynamicConfigurationName}/versions",
    }),
  );
export type DynamicConfigurationVersionsListByDynamicConfigurationInput =
  typeof DynamicConfigurationVersionsListByDynamicConfigurationInput.Type;

// Output Schema
export const DynamicConfigurationVersionsListByDynamicConfigurationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type DynamicConfigurationVersionsListByDynamicConfigurationOutput =
  typeof DynamicConfigurationVersionsListByDynamicConfigurationOutput.Type;

// The operation
/**
 * List Dynamic Configuration Version Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param configurationName - Name of the Configuration
 * @param dynamicConfigurationName - Name of the dynamic configuration
 */
export const DynamicConfigurationVersionsListByDynamicConfiguration =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DynamicConfigurationVersionsListByDynamicConfigurationInput,
    outputSchema: DynamicConfigurationVersionsListByDynamicConfigurationOutput,
  }));
// Input Schema
export const DynamicConfigurationVersionsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    configurationName: Schema.String.pipe(T.PathParam()),
    dynamicConfigurationName: Schema.String.pipe(T.PathParam()),
    dynamicConfigurationVersionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/configurations/{configurationName}/dynamicConfigurations/{dynamicConfigurationName}/versions/{dynamicConfigurationVersionName}",
    }),
  );
export type DynamicConfigurationVersionsUpdateInput =
  typeof DynamicConfigurationVersionsUpdateInput.Type;

// Output Schema
export const DynamicConfigurationVersionsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DynamicConfigurationVersionsUpdateOutput =
  typeof DynamicConfigurationVersionsUpdateOutput.Type;

// The operation
/**
 * update a Dynamic Configuration Version Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param configurationName - Name of the Configuration
 * @param dynamicConfigurationName - Name of the dynamic configuration
 * @param dynamicConfigurationVersionName - The name of the DynamicConfigurationVersion
 */
export const DynamicConfigurationVersionsUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DynamicConfigurationVersionsUpdateInput,
    outputSchema: DynamicConfigurationVersionsUpdateOutput,
  }));
// Input Schema
export const DynamicSchemasCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    schemaName: Schema.String.pipe(T.PathParam()),
    dynamicSchemaName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/schemas/{schemaName}/dynamicSchemas/{dynamicSchemaName}",
    }),
  );
export type DynamicSchemasCreateOrUpdateInput =
  typeof DynamicSchemasCreateOrUpdateInput.Type;

// Output Schema
export const DynamicSchemasCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DynamicSchemasCreateOrUpdateOutput =
  typeof DynamicSchemasCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a DynamicSchema Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param schemaName - The name of the Schema
 * @param dynamicSchemaName - The name of the DynamicSchema
 */
export const DynamicSchemasCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DynamicSchemasCreateOrUpdateInput,
    outputSchema: DynamicSchemasCreateOrUpdateOutput,
  }));
// Input Schema
export const DynamicSchemasDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    schemaName: Schema.String.pipe(T.PathParam()),
    dynamicSchemaName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/schemas/{schemaName}/dynamicSchemas/{dynamicSchemaName}",
    }),
  );
export type DynamicSchemasDeleteInput = typeof DynamicSchemasDeleteInput.Type;

// Output Schema
export const DynamicSchemasDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DynamicSchemasDeleteOutput = typeof DynamicSchemasDeleteOutput.Type;

// The operation
/**
 * Delete a DynamicSchema Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param schemaName - The name of the Schema
 * @param dynamicSchemaName - The name of the DynamicSchema
 */
export const DynamicSchemasDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DynamicSchemasDeleteInput,
    outputSchema: DynamicSchemasDeleteOutput,
  }),
);
// Input Schema
export const DynamicSchemasGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    schemaName: Schema.String.pipe(T.PathParam()),
    dynamicSchemaName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/schemas/{schemaName}/dynamicSchemas/{dynamicSchemaName}",
  }),
);
export type DynamicSchemasGetInput = typeof DynamicSchemasGetInput.Type;

// Output Schema
export const DynamicSchemasGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DynamicSchemasGetOutput = typeof DynamicSchemasGetOutput.Type;

// The operation
/**
 * Get a DynamicSchema Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param schemaName - The name of the Schema
 * @param dynamicSchemaName - The name of the DynamicSchema
 */
export const DynamicSchemasGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DynamicSchemasGetInput,
  outputSchema: DynamicSchemasGetOutput,
}));
// Input Schema
export const DynamicSchemasListBySchemaInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    schemaName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/schemas/{schemaName}/dynamicSchemas",
    }),
  );
export type DynamicSchemasListBySchemaInput =
  typeof DynamicSchemasListBySchemaInput.Type;

// Output Schema
export const DynamicSchemasListBySchemaOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type DynamicSchemasListBySchemaOutput =
  typeof DynamicSchemasListBySchemaOutput.Type;

// The operation
/**
 * List by Schema
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param schemaName - The name of the Schema
 */
export const DynamicSchemasListBySchema = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DynamicSchemasListBySchemaInput,
    outputSchema: DynamicSchemasListBySchemaOutput,
  }),
);
// Input Schema
export const DynamicSchemasUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    schemaName: Schema.String.pipe(T.PathParam()),
    dynamicSchemaName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/schemas/{schemaName}/dynamicSchemas/{dynamicSchemaName}",
    }),
  );
export type DynamicSchemasUpdateInput = typeof DynamicSchemasUpdateInput.Type;

// Output Schema
export const DynamicSchemasUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DynamicSchemasUpdateOutput = typeof DynamicSchemasUpdateOutput.Type;

// The operation
/**
 * update a DynamicSchema Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param schemaName - The name of the Schema
 * @param dynamicSchemaName - The name of the DynamicSchema
 */
export const DynamicSchemasUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DynamicSchemasUpdateInput,
    outputSchema: DynamicSchemasUpdateOutput,
  }),
);
// Input Schema
export const DynamicSchemaVersionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    schemaName: Schema.String.pipe(T.PathParam()),
    dynamicSchemaName: Schema.String.pipe(T.PathParam()),
    dynamicSchemaVersionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/schemas/{schemaName}/dynamicSchemas/{dynamicSchemaName}/versions/{dynamicSchemaVersionName}",
    }),
  );
export type DynamicSchemaVersionsCreateOrUpdateInput =
  typeof DynamicSchemaVersionsCreateOrUpdateInput.Type;

// Output Schema
export const DynamicSchemaVersionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DynamicSchemaVersionsCreateOrUpdateOutput =
  typeof DynamicSchemaVersionsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a Dynamic Schema Version Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param schemaName - The name of the Schema
 * @param dynamicSchemaName - The name of the DynamicSchema
 * @param dynamicSchemaVersionName - The name of the DynamicSchemaVersion
 */
export const DynamicSchemaVersionsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DynamicSchemaVersionsCreateOrUpdateInput,
    outputSchema: DynamicSchemaVersionsCreateOrUpdateOutput,
  }));
// Input Schema
export const DynamicSchemaVersionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    schemaName: Schema.String.pipe(T.PathParam()),
    dynamicSchemaName: Schema.String.pipe(T.PathParam()),
    dynamicSchemaVersionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/schemas/{schemaName}/dynamicSchemas/{dynamicSchemaName}/versions/{dynamicSchemaVersionName}",
    }),
  );
export type DynamicSchemaVersionsDeleteInput =
  typeof DynamicSchemaVersionsDeleteInput.Type;

// Output Schema
export const DynamicSchemaVersionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DynamicSchemaVersionsDeleteOutput =
  typeof DynamicSchemaVersionsDeleteOutput.Type;

// The operation
/**
 * Delete a Dynamic Schema Version Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param schemaName - The name of the Schema
 * @param dynamicSchemaName - The name of the DynamicSchema
 * @param dynamicSchemaVersionName - The name of the DynamicSchemaVersion
 */
export const DynamicSchemaVersionsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DynamicSchemaVersionsDeleteInput,
    outputSchema: DynamicSchemaVersionsDeleteOutput,
  }),
);
// Input Schema
export const DynamicSchemaVersionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    schemaName: Schema.String.pipe(T.PathParam()),
    dynamicSchemaName: Schema.String.pipe(T.PathParam()),
    dynamicSchemaVersionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/schemas/{schemaName}/dynamicSchemas/{dynamicSchemaName}/versions/{dynamicSchemaVersionName}",
    }),
  );
export type DynamicSchemaVersionsGetInput =
  typeof DynamicSchemaVersionsGetInput.Type;

// Output Schema
export const DynamicSchemaVersionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DynamicSchemaVersionsGetOutput =
  typeof DynamicSchemaVersionsGetOutput.Type;

// The operation
/**
 * Get a Dynamic Schema Version Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param schemaName - The name of the Schema
 * @param dynamicSchemaName - The name of the DynamicSchema
 * @param dynamicSchemaVersionName - The name of the DynamicSchemaVersion
 */
export const DynamicSchemaVersionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DynamicSchemaVersionsGetInput,
    outputSchema: DynamicSchemaVersionsGetOutput,
  }),
);
// Input Schema
export const DynamicSchemaVersionsListByDynamicSchemaInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    schemaName: Schema.String.pipe(T.PathParam()),
    dynamicSchemaName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/schemas/{schemaName}/dynamicSchemas/{dynamicSchemaName}/versions",
    }),
  );
export type DynamicSchemaVersionsListByDynamicSchemaInput =
  typeof DynamicSchemaVersionsListByDynamicSchemaInput.Type;

// Output Schema
export const DynamicSchemaVersionsListByDynamicSchemaOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type DynamicSchemaVersionsListByDynamicSchemaOutput =
  typeof DynamicSchemaVersionsListByDynamicSchemaOutput.Type;

// The operation
/**
 * List by Dynamic Schema
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param schemaName - The name of the Schema
 * @param dynamicSchemaName - The name of the DynamicSchema
 */
export const DynamicSchemaVersionsListByDynamicSchema =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DynamicSchemaVersionsListByDynamicSchemaInput,
    outputSchema: DynamicSchemaVersionsListByDynamicSchemaOutput,
  }));
// Input Schema
export const DynamicSchemaVersionsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    schemaName: Schema.String.pipe(T.PathParam()),
    dynamicSchemaName: Schema.String.pipe(T.PathParam()),
    dynamicSchemaVersionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/schemas/{schemaName}/dynamicSchemas/{dynamicSchemaName}/versions/{dynamicSchemaVersionName}",
    }),
  );
export type DynamicSchemaVersionsUpdateInput =
  typeof DynamicSchemaVersionsUpdateInput.Type;

// Output Schema
export const DynamicSchemaVersionsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DynamicSchemaVersionsUpdateOutput =
  typeof DynamicSchemaVersionsUpdateOutput.Type;

// The operation
/**
 * update a Dynamic Schema Version Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param schemaName - The name of the Schema
 * @param dynamicSchemaName - The name of the DynamicSchema
 * @param dynamicSchemaVersionName - The name of the DynamicSchemaVersion
 */
export const DynamicSchemaVersionsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DynamicSchemaVersionsUpdateInput,
    outputSchema: DynamicSchemaVersionsUpdateOutput,
  }),
);
// Input Schema
export const ExecutionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    contextName: Schema.String.pipe(T.PathParam()),
    workflowName: Schema.String.pipe(T.PathParam()),
    versionName: Schema.String.pipe(T.PathParam()),
    executionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/contexts/{contextName}/workflows/{workflowName}/versions/{versionName}/executions/{executionName}",
    }),
  );
export type ExecutionsCreateOrUpdateInput =
  typeof ExecutionsCreateOrUpdateInput.Type;

// Output Schema
export const ExecutionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ExecutionsCreateOrUpdateOutput =
  typeof ExecutionsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update Execution Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param contextName - The name of the Context.
 * @param workflowName - Name of the workflow
 * @param versionName - The name of the workflowVersion.
 * @param executionName - The name of the Execution.
 */
export const ExecutionsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ExecutionsCreateOrUpdateInput,
    outputSchema: ExecutionsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const ExecutionsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  contextName: Schema.String.pipe(T.PathParam()),
  workflowName: Schema.String.pipe(T.PathParam()),
  versionName: Schema.String.pipe(T.PathParam()),
  executionName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/contexts/{contextName}/workflows/{workflowName}/versions/{versionName}/executions/{executionName}",
  }),
);
export type ExecutionsDeleteInput = typeof ExecutionsDeleteInput.Type;

// Output Schema
export const ExecutionsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ExecutionsDeleteOutput = typeof ExecutionsDeleteOutput.Type;

// The operation
/**
 * Delete Execution Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param contextName - The name of the Context.
 * @param workflowName - Name of the workflow
 * @param versionName - The name of the workflowVersion.
 * @param executionName - The name of the Execution.
 */
export const ExecutionsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ExecutionsDeleteInput,
  outputSchema: ExecutionsDeleteOutput,
}));
// Input Schema
export const ExecutionsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  contextName: Schema.String.pipe(T.PathParam()),
  workflowName: Schema.String.pipe(T.PathParam()),
  versionName: Schema.String.pipe(T.PathParam()),
  executionName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/contexts/{contextName}/workflows/{workflowName}/versions/{versionName}/executions/{executionName}",
  }),
);
export type ExecutionsGetInput = typeof ExecutionsGetInput.Type;

// Output Schema
export const ExecutionsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type ExecutionsGetOutput = typeof ExecutionsGetOutput.Type;

// The operation
/**
 * Get Execution Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param contextName - The name of the Context.
 * @param workflowName - Name of the workflow
 * @param versionName - The name of the workflowVersion.
 * @param executionName - The name of the Execution.
 */
export const ExecutionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ExecutionsGetInput,
  outputSchema: ExecutionsGetOutput,
}));
// Input Schema
export const ExecutionsListByWorkflowVersionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    contextName: Schema.String.pipe(T.PathParam()),
    workflowName: Schema.String.pipe(T.PathParam()),
    versionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/contexts/{contextName}/workflows/{workflowName}/versions/{versionName}/executions",
    }),
  );
export type ExecutionsListByWorkflowVersionInput =
  typeof ExecutionsListByWorkflowVersionInput.Type;

// Output Schema
export const ExecutionsListByWorkflowVersionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type ExecutionsListByWorkflowVersionOutput =
  typeof ExecutionsListByWorkflowVersionOutput.Type;

// The operation
/**
 * List Execution Resources
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param contextName - The name of the Context.
 * @param workflowName - Name of the workflow
 * @param versionName - The name of the workflowVersion.
 */
export const ExecutionsListByWorkflowVersion =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ExecutionsListByWorkflowVersionInput,
    outputSchema: ExecutionsListByWorkflowVersionOutput,
  }));
// Input Schema
export const ExecutionsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  contextName: Schema.String.pipe(T.PathParam()),
  workflowName: Schema.String.pipe(T.PathParam()),
  versionName: Schema.String.pipe(T.PathParam()),
  executionName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/contexts/{contextName}/workflows/{workflowName}/versions/{versionName}/executions/{executionName}",
  }),
);
export type ExecutionsUpdateInput = typeof ExecutionsUpdateInput.Type;

// Output Schema
export const ExecutionsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type ExecutionsUpdateOutput = typeof ExecutionsUpdateOutput.Type;

// The operation
/**
 * update an Execution Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param contextName - The name of the Context.
 * @param workflowName - Name of the workflow
 * @param versionName - The name of the workflowVersion.
 * @param executionName - The name of the Execution.
 */
export const ExecutionsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ExecutionsUpdateInput,
  outputSchema: ExecutionsUpdateOutput,
}));
// Input Schema
export const HardwareSettingsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    hardwareSettingName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/disconnectedOperations/{name}/hardwareSettings/{hardwareSettingName}",
    }),
  );
export type HardwareSettingsCreateOrUpdateInput =
  typeof HardwareSettingsCreateOrUpdateInput.Type;

// Output Schema
export const HardwareSettingsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type HardwareSettingsCreateOrUpdateOutput =
  typeof HardwareSettingsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update hardware settings
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of the resource
 * @param hardwareSettingName - The name of the HardwareSetting
 */
export const HardwareSettingsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: HardwareSettingsCreateOrUpdateInput,
    outputSchema: HardwareSettingsCreateOrUpdateOutput,
  }));
// Input Schema
export const HardwareSettingsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    hardwareSettingName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/disconnectedOperations/{name}/hardwareSettings/{hardwareSettingName}",
    }),
  );
export type HardwareSettingsDeleteInput =
  typeof HardwareSettingsDeleteInput.Type;

// Output Schema
export const HardwareSettingsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type HardwareSettingsDeleteOutput =
  typeof HardwareSettingsDeleteOutput.Type;

// The operation
/**
 * Delete hardware settings
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of the resource
 * @param hardwareSettingName - The name of the HardwareSetting
 */
export const HardwareSettingsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: HardwareSettingsDeleteInput,
    outputSchema: HardwareSettingsDeleteOutput,
  }),
);
// Input Schema
export const HardwareSettingsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    hardwareSettingName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/disconnectedOperations/{name}/hardwareSettings/{hardwareSettingName}",
    }),
  );
export type HardwareSettingsGetInput = typeof HardwareSettingsGetInput.Type;

// Output Schema
export const HardwareSettingsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type HardwareSettingsGetOutput = typeof HardwareSettingsGetOutput.Type;

// The operation
/**
 * Get the hardware settings resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of the resource
 * @param hardwareSettingName - The name of the HardwareSetting
 */
export const HardwareSettingsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: HardwareSettingsGetInput,
  outputSchema: HardwareSettingsGetOutput,
}));
// Input Schema
export const HardwareSettingsListByParentInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/disconnectedOperations/{name}/hardwareSettings",
    }),
  );
export type HardwareSettingsListByParentInput =
  typeof HardwareSettingsListByParentInput.Type;

// Output Schema
export const HardwareSettingsListByParentOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type HardwareSettingsListByParentOutput =
  typeof HardwareSettingsListByParentOutput.Type;

// The operation
/**
 * List by parent
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of the resource
 */
export const HardwareSettingsListByParent =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: HardwareSettingsListByParentInput,
    outputSchema: HardwareSettingsListByParentOutput,
  }));
// Input Schema
export const ImagesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  name: Schema.String.pipe(T.PathParam()),
  imageName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/disconnectedOperations/{name}/images/{imageName}",
  }),
);
export type ImagesGetInput = typeof ImagesGetInput.Type;

// Output Schema
export const ImagesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ImagesGetOutput = typeof ImagesGetOutput.Type;

// The operation
/**
 * Get the resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of the resource
 * @param imageName - The name of the Image
 */
export const ImagesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ImagesGetInput,
  outputSchema: ImagesGetOutput,
}));
// Input Schema
export const ImagesListByDisconnectedOperationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/disconnectedOperations/{name}/images",
    }),
  );
export type ImagesListByDisconnectedOperationInput =
  typeof ImagesListByDisconnectedOperationInput.Type;

// Output Schema
export const ImagesListByDisconnectedOperationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type ImagesListByDisconnectedOperationOutput =
  typeof ImagesListByDisconnectedOperationOutput.Type;

// The operation
/**
 * List by disconnected operation.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of the resource
 */
export const ImagesListByDisconnectedOperation =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ImagesListByDisconnectedOperationInput,
    outputSchema: ImagesListByDisconnectedOperationOutput,
  }));
// Input Schema
export const ImagesListDownloadUriInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    imageName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/disconnectedOperations/{name}/images/{imageName}/listDownloadUri",
    }),
  );
export type ImagesListDownloadUriInput = typeof ImagesListDownloadUriInput.Type;

// Output Schema
export const ImagesListDownloadUriOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    provisioningState: Schema.optional(
      Schema.Literals(["Succeeded", "Failed", "Canceled"]),
    ),
    releaseVersion: Schema.String,
    releaseDisplayName: Schema.String,
    releaseNotes: Schema.String,
    releaseDate: Schema.String,
    releaseType: Schema.Literals(["Install", "Update"]),
    compatibleVersions: Schema.optional(Schema.Array(Schema.String)),
    updateProperties: Schema.optional(
      Schema.Struct({
        systemReboot: Schema.Literals(["Required", "NotRequired"]),
        securityUpdates: Schema.String,
        osVersion: Schema.String,
        agentVersion: Schema.String,
        featureUpdates: Schema.String,
      }),
    ),
    transactionId: Schema.String,
    downloadLink: Schema.String,
    linkExpiry: Schema.String,
  });
export type ImagesListDownloadUriOutput =
  typeof ImagesListDownloadUriOutput.Type;

// The operation
/**
 * Get the URI to download the image.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of the resource
 * @param imageName - The name of the Image
 */
export const ImagesListDownloadUri = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ImagesListDownloadUriInput,
    outputSchema: ImagesListDownloadUriOutput,
  }),
);
// Input Schema
export const InstanceHistoriesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    targetName: Schema.String.pipe(T.PathParam()),
    solutionName: Schema.String.pipe(T.PathParam()),
    instanceName: Schema.String.pipe(T.PathParam()),
    instanceHistoryName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/targets/{targetName}/solutions/{solutionName}/instances/{instanceName}/histories/{instanceHistoryName}",
    }),
  );
export type InstanceHistoriesGetInput = typeof InstanceHistoriesGetInput.Type;

// Output Schema
export const InstanceHistoriesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type InstanceHistoriesGetOutput = typeof InstanceHistoriesGetOutput.Type;

// The operation
/**
 * Get InstanceHistory Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param targetName - Name of the target
 * @param solutionName - Name of the solution
 * @param instanceName - Name of the instance
 * @param instanceHistoryName - Name of the instance history
 */
export const InstanceHistoriesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: InstanceHistoriesGetInput,
    outputSchema: InstanceHistoriesGetOutput,
  }),
);
// Input Schema
export const InstanceHistoriesListByInstanceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    targetName: Schema.String.pipe(T.PathParam()),
    solutionName: Schema.String.pipe(T.PathParam()),
    instanceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/targets/{targetName}/solutions/{solutionName}/instances/{instanceName}/histories",
    }),
  );
export type InstanceHistoriesListByInstanceInput =
  typeof InstanceHistoriesListByInstanceInput.Type;

// Output Schema
export const InstanceHistoriesListByInstanceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type InstanceHistoriesListByInstanceOutput =
  typeof InstanceHistoriesListByInstanceOutput.Type;

// The operation
/**
 * List InstanceHistory Resources
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param targetName - Name of the target
 * @param solutionName - Name of the solution
 * @param instanceName - Name of the instance
 */
export const InstanceHistoriesListByInstance =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: InstanceHistoriesListByInstanceInput,
    outputSchema: InstanceHistoriesListByInstanceOutput,
  }));
// Input Schema
export const InstancesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    targetName: Schema.String.pipe(T.PathParam()),
    solutionName: Schema.String.pipe(T.PathParam()),
    instanceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/targets/{targetName}/solutions/{solutionName}/instances/{instanceName}",
    }),
  );
export type InstancesCreateOrUpdateInput =
  typeof InstancesCreateOrUpdateInput.Type;

// Output Schema
export const InstancesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type InstancesCreateOrUpdateOutput =
  typeof InstancesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update Instance Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param targetName - Name of the target
 * @param solutionName - Name of the solution
 * @param instanceName - Name of the instance
 */
export const InstancesCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: InstancesCreateOrUpdateInput,
    outputSchema: InstancesCreateOrUpdateOutput,
  }),
);
// Input Schema
export const InstancesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  targetName: Schema.String.pipe(T.PathParam()),
  solutionName: Schema.String.pipe(T.PathParam()),
  instanceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/targets/{targetName}/solutions/{solutionName}/instances/{instanceName}",
  }),
);
export type InstancesDeleteInput = typeof InstancesDeleteInput.Type;

// Output Schema
export const InstancesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type InstancesDeleteOutput = typeof InstancesDeleteOutput.Type;

// The operation
/**
 * Delete Instance Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param targetName - Name of the target
 * @param solutionName - Name of the solution
 * @param instanceName - Name of the instance
 */
export const InstancesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: InstancesDeleteInput,
  outputSchema: InstancesDeleteOutput,
}));
// Input Schema
export const InstancesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  targetName: Schema.String.pipe(T.PathParam()),
  solutionName: Schema.String.pipe(T.PathParam()),
  instanceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/targets/{targetName}/solutions/{solutionName}/instances/{instanceName}",
  }),
);
export type InstancesGetInput = typeof InstancesGetInput.Type;

// Output Schema
export const InstancesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type InstancesGetOutput = typeof InstancesGetOutput.Type;

// The operation
/**
 * Get Instance Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param targetName - Name of the target
 * @param solutionName - Name of the solution
 * @param instanceName - Name of the instance
 */
export const InstancesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: InstancesGetInput,
  outputSchema: InstancesGetOutput,
}));
// Input Schema
export const InstancesListBySolutionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    targetName: Schema.String.pipe(T.PathParam()),
    solutionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/targets/{targetName}/solutions/{solutionName}/instances",
    }),
  );
export type InstancesListBySolutionInput =
  typeof InstancesListBySolutionInput.Type;

// Output Schema
export const InstancesListBySolutionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type InstancesListBySolutionOutput =
  typeof InstancesListBySolutionOutput.Type;

// The operation
/**
 * List Instance Resources
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param targetName - Name of the target
 * @param solutionName - Name of the solution
 */
export const InstancesListBySolution = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: InstancesListBySolutionInput,
    outputSchema: InstancesListBySolutionOutput,
  }),
);
// Input Schema
export const InstancesUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  targetName: Schema.String.pipe(T.PathParam()),
  solutionName: Schema.String.pipe(T.PathParam()),
  instanceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/targets/{targetName}/solutions/{solutionName}/instances/{instanceName}",
  }),
);
export type InstancesUpdateInput = typeof InstancesUpdateInput.Type;

// Output Schema
export const InstancesUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type InstancesUpdateOutput = typeof InstancesUpdateOutput.Type;

// The operation
/**
 * Update an Instance Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param targetName - Name of the target
 * @param solutionName - Name of the solution
 * @param instanceName - Name of the instance
 */
export const InstancesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: InstancesUpdateInput,
  outputSchema: InstancesUpdateOutput,
}));
// Input Schema
export const JobsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  jobName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/{resourceUri}/providers/Microsoft.Edge/jobs/{jobName}",
  }),
);
export type JobsGetInput = typeof JobsGetInput.Type;

// Output Schema
export const JobsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type JobsGetOutput = typeof JobsGetOutput.Type;

// The operation
/**
 * Get a Job resource
 *
 * @param api-version - The API version to use for this operation.
 * @param jobName - The name of the Job
 */
export const JobsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JobsGetInput,
  outputSchema: JobsGetOutput,
}));
// Input Schema
export const JobsListByTargetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/{resourceUri}/providers/Microsoft.Edge/jobs",
  }),
);
export type JobsListByTargetInput = typeof JobsListByTargetInput.Type;

// Output Schema
export const JobsListByTargetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  },
);
export type JobsListByTargetOutput = typeof JobsListByTargetOutput.Type;

// The operation
/**
 * List Jobs by parent resource
 *
 * @param api-version - The API version to use for this operation.
 */
export const JobsListByTarget = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JobsListByTargetInput,
  outputSchema: JobsListByTargetOutput,
}));
// Input Schema
export const SchemaReferencesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    schemaReferenceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/{resourceUri}/providers/Microsoft.Edge/schemaReferences/{schemaReferenceName}",
    }),
  );
export type SchemaReferencesCreateOrUpdateInput =
  typeof SchemaReferencesCreateOrUpdateInput.Type;

// Output Schema
export const SchemaReferencesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SchemaReferencesCreateOrUpdateOutput =
  typeof SchemaReferencesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a Schema Reference Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param schemaReferenceName - The name of the SchemaReference
 */
export const SchemaReferencesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SchemaReferencesCreateOrUpdateInput,
    outputSchema: SchemaReferencesCreateOrUpdateOutput,
  }));
// Input Schema
export const SchemaReferencesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    schemaReferenceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/{resourceUri}/providers/Microsoft.Edge/schemaReferences/{schemaReferenceName}",
    }),
  );
export type SchemaReferencesDeleteInput =
  typeof SchemaReferencesDeleteInput.Type;

// Output Schema
export const SchemaReferencesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SchemaReferencesDeleteOutput =
  typeof SchemaReferencesDeleteOutput.Type;

// The operation
/**
 * Delete a Schema Reference Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param schemaReferenceName - The name of the SchemaReference
 */
export const SchemaReferencesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SchemaReferencesDeleteInput,
    outputSchema: SchemaReferencesDeleteOutput,
  }),
);
// Input Schema
export const SchemaReferencesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    schemaReferenceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/{resourceUri}/providers/Microsoft.Edge/schemaReferences/{schemaReferenceName}",
    }),
  );
export type SchemaReferencesGetInput = typeof SchemaReferencesGetInput.Type;

// Output Schema
export const SchemaReferencesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SchemaReferencesGetOutput = typeof SchemaReferencesGetOutput.Type;

// The operation
/**
 * Get a Schema Reference Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param schemaReferenceName - The name of the SchemaReference
 */
export const SchemaReferencesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SchemaReferencesGetInput,
  outputSchema: SchemaReferencesGetOutput,
}));
// Input Schema
export const SchemaReferencesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/{resourceUri}/providers/Microsoft.Edge/schemaReferences",
    }),
  );
export type SchemaReferencesListByResourceGroupInput =
  typeof SchemaReferencesListByResourceGroupInput.Type;

// Output Schema
export const SchemaReferencesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type SchemaReferencesListByResourceGroupOutput =
  typeof SchemaReferencesListByResourceGroupOutput.Type;

// The operation
/**
 * List by specified resource group
 *
 * @param api-version - The API version to use for this operation.
 */
export const SchemaReferencesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SchemaReferencesListByResourceGroupInput,
    outputSchema: SchemaReferencesListByResourceGroupOutput,
  }));
// Input Schema
export const SchemaReferencesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    schemaReferenceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/{resourceUri}/providers/Microsoft.Edge/schemaReferences/{schemaReferenceName}",
    }),
  );
export type SchemaReferencesUpdateInput =
  typeof SchemaReferencesUpdateInput.Type;

// Output Schema
export const SchemaReferencesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SchemaReferencesUpdateOutput =
  typeof SchemaReferencesUpdateOutput.Type;

// The operation
/**
 * update a Schema Reference Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param schemaReferenceName - The name of the SchemaReference
 */
export const SchemaReferencesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SchemaReferencesUpdateInput,
    outputSchema: SchemaReferencesUpdateOutput,
  }),
);
// Input Schema
export const SchemasCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    schemaName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/schemas/{schemaName}",
    }),
  );
export type SchemasCreateOrUpdateInput = typeof SchemasCreateOrUpdateInput.Type;

// Output Schema
export const SchemasCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SchemasCreateOrUpdateOutput =
  typeof SchemasCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a Schema Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param schemaName - The name of the Schema
 */
export const SchemasCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SchemasCreateOrUpdateInput,
    outputSchema: SchemasCreateOrUpdateOutput,
  }),
);
// Input Schema
export const SchemasCreateVersionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    schemaName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/schemas/{schemaName}/createVersion",
    }),
  );
export type SchemasCreateVersionInput = typeof SchemasCreateVersionInput.Type;

// Output Schema
export const SchemasCreateVersionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SchemasCreateVersionOutput = typeof SchemasCreateVersionOutput.Type;

// The operation
/**
 * Create a Schema Version Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param schemaName - The name of the Schema
 */
export const SchemasCreateVersion = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SchemasCreateVersionInput,
    outputSchema: SchemasCreateVersionOutput,
  }),
);
// Input Schema
export const SchemasDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  schemaName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/schemas/{schemaName}",
  }),
);
export type SchemasDeleteInput = typeof SchemasDeleteInput.Type;

// Output Schema
export const SchemasDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SchemasDeleteOutput = typeof SchemasDeleteOutput.Type;

// The operation
/**
 * Delete a Schema Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param schemaName - The name of the Schema
 */
export const SchemasDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SchemasDeleteInput,
  outputSchema: SchemasDeleteOutput,
}));
// Input Schema
export const SchemasGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  schemaName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/schemas/{schemaName}",
  }),
);
export type SchemasGetInput = typeof SchemasGetInput.Type;

// Output Schema
export const SchemasGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type SchemasGetOutput = typeof SchemasGetOutput.Type;

// The operation
/**
 * Get a Schema Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param schemaName - The name of the Schema
 */
export const SchemasGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SchemasGetInput,
  outputSchema: SchemasGetOutput,
}));
// Input Schema
export const SchemasListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/schemas",
    }),
  );
export type SchemasListByResourceGroupInput =
  typeof SchemasListByResourceGroupInput.Type;

// Output Schema
export const SchemasListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type SchemasListByResourceGroupOutput =
  typeof SchemasListByResourceGroupOutput.Type;

// The operation
/**
 * List by specified resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const SchemasListByResourceGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SchemasListByResourceGroupInput,
    outputSchema: SchemasListByResourceGroupOutput,
  }),
);
// Input Schema
export const SchemasListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Edge/schemas",
    }),
  );
export type SchemasListBySubscriptionInput =
  typeof SchemasListBySubscriptionInput.Type;

// Output Schema
export const SchemasListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type SchemasListBySubscriptionOutput =
  typeof SchemasListBySubscriptionOutput.Type;

// The operation
/**
 * List by subscription
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const SchemasListBySubscription = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SchemasListBySubscriptionInput,
    outputSchema: SchemasListBySubscriptionOutput,
  }),
);
// Input Schema
export const SchemasRemoveVersionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    schemaName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/schemas/{schemaName}/removeVersion",
    }),
  );
export type SchemasRemoveVersionInput = typeof SchemasRemoveVersionInput.Type;

// Output Schema
export const SchemasRemoveVersionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    status: Schema.String,
  });
export type SchemasRemoveVersionOutput = typeof SchemasRemoveVersionOutput.Type;

// The operation
/**
 * Remove Schema Version Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param schemaName - The name of the Schema
 */
export const SchemasRemoveVersion = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SchemasRemoveVersionInput,
    outputSchema: SchemasRemoveVersionOutput,
  }),
);
// Input Schema
export const SchemasUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  schemaName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/schemas/{schemaName}",
  }),
);
export type SchemasUpdateInput = typeof SchemasUpdateInput.Type;

// Output Schema
export const SchemasUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type SchemasUpdateOutput = typeof SchemasUpdateOutput.Type;

// The operation
/**
 * update a Schema Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param schemaName - The name of the Schema
 */
export const SchemasUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SchemasUpdateInput,
  outputSchema: SchemasUpdateOutput,
}));
// Input Schema
export const SchemaVersionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    schemaName: Schema.String.pipe(T.PathParam()),
    schemaVersionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/schemas/{schemaName}/versions/{schemaVersionName}",
    }),
  );
export type SchemaVersionsCreateOrUpdateInput =
  typeof SchemaVersionsCreateOrUpdateInput.Type;

// Output Schema
export const SchemaVersionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SchemaVersionsCreateOrUpdateOutput =
  typeof SchemaVersionsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a Schema Version Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param schemaName - The name of the Schema
 * @param schemaVersionName - The name of the SchemaVersion
 */
export const SchemaVersionsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SchemaVersionsCreateOrUpdateInput,
    outputSchema: SchemaVersionsCreateOrUpdateOutput,
  }));
// Input Schema
export const SchemaVersionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    schemaName: Schema.String.pipe(T.PathParam()),
    schemaVersionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/schemas/{schemaName}/versions/{schemaVersionName}",
    }),
  );
export type SchemaVersionsDeleteInput = typeof SchemaVersionsDeleteInput.Type;

// Output Schema
export const SchemaVersionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SchemaVersionsDeleteOutput = typeof SchemaVersionsDeleteOutput.Type;

// The operation
/**
 * Delete a Schema Version Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param schemaName - The name of the Schema
 * @param schemaVersionName - The name of the SchemaVersion
 */
export const SchemaVersionsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SchemaVersionsDeleteInput,
    outputSchema: SchemaVersionsDeleteOutput,
  }),
);
// Input Schema
export const SchemaVersionsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    schemaName: Schema.String.pipe(T.PathParam()),
    schemaVersionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/schemas/{schemaName}/versions/{schemaVersionName}",
  }),
);
export type SchemaVersionsGetInput = typeof SchemaVersionsGetInput.Type;

// Output Schema
export const SchemaVersionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SchemaVersionsGetOutput = typeof SchemaVersionsGetOutput.Type;

// The operation
/**
 * Get a Schema Version Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param schemaName - The name of the Schema
 * @param schemaVersionName - The name of the SchemaVersion
 */
export const SchemaVersionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SchemaVersionsGetInput,
  outputSchema: SchemaVersionsGetOutput,
}));
// Input Schema
export const SchemaVersionsListBySchemaInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    schemaName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/schemas/{schemaName}/versions",
    }),
  );
export type SchemaVersionsListBySchemaInput =
  typeof SchemaVersionsListBySchemaInput.Type;

// Output Schema
export const SchemaVersionsListBySchemaOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type SchemaVersionsListBySchemaOutput =
  typeof SchemaVersionsListBySchemaOutput.Type;

// The operation
/**
 * List by specified resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param schemaName - The name of the Schema
 */
export const SchemaVersionsListBySchema = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SchemaVersionsListBySchemaInput,
    outputSchema: SchemaVersionsListBySchemaOutput,
  }),
);
// Input Schema
export const SchemaVersionsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    schemaName: Schema.String.pipe(T.PathParam()),
    schemaVersionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/schemas/{schemaName}/versions/{schemaVersionName}",
    }),
  );
export type SchemaVersionsUpdateInput = typeof SchemaVersionsUpdateInput.Type;

// Output Schema
export const SchemaVersionsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SchemaVersionsUpdateOutput = typeof SchemaVersionsUpdateOutput.Type;

// The operation
/**
 * update a Schema Version Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param schemaName - The name of the Schema
 * @param schemaVersionName - The name of the SchemaVersion
 */
export const SchemaVersionsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SchemaVersionsUpdateInput,
    outputSchema: SchemaVersionsUpdateOutput,
  }),
);
// Input Schema
export const SiteReferencesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    contextName: Schema.String.pipe(T.PathParam()),
    siteReferenceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/contexts/{contextName}/siteReferences/{siteReferenceName}",
    }),
  );
export type SiteReferencesCreateOrUpdateInput =
  typeof SiteReferencesCreateOrUpdateInput.Type;

// Output Schema
export const SiteReferencesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SiteReferencesCreateOrUpdateOutput =
  typeof SiteReferencesCreateOrUpdateOutput.Type;

// The operation
/**
 * Get Site Reference Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param contextName - The name of the Context.
 * @param siteReferenceName - The name of the SiteReference
 */
export const SiteReferencesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SiteReferencesCreateOrUpdateInput,
    outputSchema: SiteReferencesCreateOrUpdateOutput,
  }));
// Input Schema
export const SiteReferencesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    contextName: Schema.String.pipe(T.PathParam()),
    siteReferenceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/contexts/{contextName}/siteReferences/{siteReferenceName}",
    }),
  );
export type SiteReferencesDeleteInput = typeof SiteReferencesDeleteInput.Type;

// Output Schema
export const SiteReferencesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SiteReferencesDeleteOutput = typeof SiteReferencesDeleteOutput.Type;

// The operation
/**
 * Get Site Reference Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param contextName - The name of the Context.
 * @param siteReferenceName - The name of the SiteReference
 */
export const SiteReferencesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SiteReferencesDeleteInput,
    outputSchema: SiteReferencesDeleteOutput,
  }),
);
// Input Schema
export const SiteReferencesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    contextName: Schema.String.pipe(T.PathParam()),
    siteReferenceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/contexts/{contextName}/siteReferences/{siteReferenceName}",
  }),
);
export type SiteReferencesGetInput = typeof SiteReferencesGetInput.Type;

// Output Schema
export const SiteReferencesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SiteReferencesGetOutput = typeof SiteReferencesGetOutput.Type;

// The operation
/**
 * Get Site Reference Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param contextName - The name of the Context.
 * @param siteReferenceName - The name of the SiteReference
 */
export const SiteReferencesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SiteReferencesGetInput,
  outputSchema: SiteReferencesGetOutput,
}));
// Input Schema
export const SiteReferencesListByContextInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    contextName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/contexts/{contextName}/siteReferences",
    }),
  );
export type SiteReferencesListByContextInput =
  typeof SiteReferencesListByContextInput.Type;

// Output Schema
export const SiteReferencesListByContextOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type SiteReferencesListByContextOutput =
  typeof SiteReferencesListByContextOutput.Type;

// The operation
/**
 * List Site Reference Resources
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param contextName - The name of the Context.
 */
export const SiteReferencesListByContext = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SiteReferencesListByContextInput,
    outputSchema: SiteReferencesListByContextOutput,
  }),
);
// Input Schema
export const SiteReferencesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    contextName: Schema.String.pipe(T.PathParam()),
    siteReferenceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/contexts/{contextName}/siteReferences/{siteReferenceName}",
    }),
  );
export type SiteReferencesUpdateInput = typeof SiteReferencesUpdateInput.Type;

// Output Schema
export const SiteReferencesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SiteReferencesUpdateOutput = typeof SiteReferencesUpdateOutput.Type;

// The operation
/**
 * Get Site Reference Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param contextName - The name of the Context.
 * @param siteReferenceName - The name of the SiteReference
 */
export const SiteReferencesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SiteReferencesUpdateInput,
    outputSchema: SiteReferencesUpdateOutput,
  }),
);
// Input Schema
export const SitesByServiceGroupCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    servicegroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/providers/Microsoft.Management/serviceGroups/{servicegroupName}/providers/Microsoft.Edge/sites/{siteName}",
    }),
  );
export type SitesByServiceGroupCreateOrUpdateInput =
  typeof SitesByServiceGroupCreateOrUpdateInput.Type;

// Output Schema
export const SitesByServiceGroupCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SitesByServiceGroupCreateOrUpdateOutput =
  typeof SitesByServiceGroupCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a Site
 *
 * @param api-version - The API version to use for this operation.
 * @param servicegroupName - The name of the service group
 * @param siteName - The name of the Site
 */
export const SitesByServiceGroupCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SitesByServiceGroupCreateOrUpdateInput,
    outputSchema: SitesByServiceGroupCreateOrUpdateOutput,
  }));
// Input Schema
export const SitesByServiceGroupDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    servicegroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/providers/Microsoft.Management/serviceGroups/{servicegroupName}/providers/Microsoft.Edge/sites/{siteName}",
    }),
  );
export type SitesByServiceGroupDeleteInput =
  typeof SitesByServiceGroupDeleteInput.Type;

// Output Schema
export const SitesByServiceGroupDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SitesByServiceGroupDeleteOutput =
  typeof SitesByServiceGroupDeleteOutput.Type;

// The operation
/**
 * Delete a Site
 *
 * @param api-version - The API version to use for this operation.
 * @param servicegroupName - The name of the service group
 * @param siteName - The name of the Site
 */
export const SitesByServiceGroupDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SitesByServiceGroupDeleteInput,
    outputSchema: SitesByServiceGroupDeleteOutput,
  }),
);
// Input Schema
export const SitesByServiceGroupGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    servicegroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Management/serviceGroups/{servicegroupName}/providers/Microsoft.Edge/sites/{siteName}",
    }),
  );
export type SitesByServiceGroupGetInput =
  typeof SitesByServiceGroupGetInput.Type;

// Output Schema
export const SitesByServiceGroupGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SitesByServiceGroupGetOutput =
  typeof SitesByServiceGroupGetOutput.Type;

// The operation
/**
 * Get a Site
 *
 * @param api-version - The API version to use for this operation.
 * @param servicegroupName - The name of the service group
 * @param siteName - The name of the Site
 */
export const SitesByServiceGroupGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SitesByServiceGroupGetInput,
    outputSchema: SitesByServiceGroupGetOutput,
  }),
);
// Input Schema
export const SitesByServiceGroupListByServiceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    servicegroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Management/serviceGroups/{servicegroupName}/providers/Microsoft.Edge/sites",
    }),
  );
export type SitesByServiceGroupListByServiceGroupInput =
  typeof SitesByServiceGroupListByServiceGroupInput.Type;

// Output Schema
export const SitesByServiceGroupListByServiceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type SitesByServiceGroupListByServiceGroupOutput =
  typeof SitesByServiceGroupListByServiceGroupOutput.Type;

// The operation
/**
 * List Site resources by scope
 *
 * @param api-version - The API version to use for this operation.
 * @param servicegroupName - The name of the service group
 */
export const SitesByServiceGroupListByServiceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SitesByServiceGroupListByServiceGroupInput,
    outputSchema: SitesByServiceGroupListByServiceGroupOutput,
  }));
// Input Schema
export const SitesByServiceGroupUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    servicegroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/providers/Microsoft.Management/serviceGroups/{servicegroupName}/providers/Microsoft.Edge/sites/{siteName}",
    }),
  );
export type SitesByServiceGroupUpdateInput =
  typeof SitesByServiceGroupUpdateInput.Type;

// Output Schema
export const SitesByServiceGroupUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SitesByServiceGroupUpdateOutput =
  typeof SitesByServiceGroupUpdateOutput.Type;

// The operation
/**
 * Update a Site
 *
 * @param api-version - The API version to use for this operation.
 * @param servicegroupName - The name of the service group
 * @param siteName - The name of the Site
 */
export const SitesByServiceGroupUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SitesByServiceGroupUpdateInput,
    outputSchema: SitesByServiceGroupUpdateOutput,
  }),
);
// Input Schema
export const SitesBySubscriptionCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Edge/sites/{siteName}",
    }),
  );
export type SitesBySubscriptionCreateOrUpdateInput =
  typeof SitesBySubscriptionCreateOrUpdateInput.Type;

// Output Schema
export const SitesBySubscriptionCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SitesBySubscriptionCreateOrUpdateOutput =
  typeof SitesBySubscriptionCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a Site
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param siteName - The name of the Site
 */
export const SitesBySubscriptionCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SitesBySubscriptionCreateOrUpdateInput,
    outputSchema: SitesBySubscriptionCreateOrUpdateOutput,
  }));
// Input Schema
export const SitesBySubscriptionDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Edge/sites/{siteName}",
    }),
  );
export type SitesBySubscriptionDeleteInput =
  typeof SitesBySubscriptionDeleteInput.Type;

// Output Schema
export const SitesBySubscriptionDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SitesBySubscriptionDeleteOutput =
  typeof SitesBySubscriptionDeleteOutput.Type;

// The operation
/**
 * Delete a Site
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param siteName - The name of the Site
 */
export const SitesBySubscriptionDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SitesBySubscriptionDeleteInput,
    outputSchema: SitesBySubscriptionDeleteOutput,
  }),
);
// Input Schema
export const SitesBySubscriptionGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Edge/sites/{siteName}",
    }),
  );
export type SitesBySubscriptionGetInput =
  typeof SitesBySubscriptionGetInput.Type;

// Output Schema
export const SitesBySubscriptionGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SitesBySubscriptionGetOutput =
  typeof SitesBySubscriptionGetOutput.Type;

// The operation
/**
 * Get a Site
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param siteName - The name of the Site
 */
export const SitesBySubscriptionGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SitesBySubscriptionGetInput,
    outputSchema: SitesBySubscriptionGetOutput,
  }),
);
// Input Schema
export const SitesBySubscriptionListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Edge/sites",
    }),
  );
export type SitesBySubscriptionListInput =
  typeof SitesBySubscriptionListInput.Type;

// Output Schema
export const SitesBySubscriptionListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type SitesBySubscriptionListOutput =
  typeof SitesBySubscriptionListOutput.Type;

// The operation
/**
 * List Site resources by scope
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const SitesBySubscriptionList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SitesBySubscriptionListInput,
    outputSchema: SitesBySubscriptionListOutput,
  }),
);
// Input Schema
export const SitesBySubscriptionUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Edge/sites/{siteName}",
    }),
  );
export type SitesBySubscriptionUpdateInput =
  typeof SitesBySubscriptionUpdateInput.Type;

// Output Schema
export const SitesBySubscriptionUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SitesBySubscriptionUpdateOutput =
  typeof SitesBySubscriptionUpdateOutput.Type;

// The operation
/**
 * Update a Site
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param siteName - The name of the Site
 */
export const SitesBySubscriptionUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SitesBySubscriptionUpdateInput,
    outputSchema: SitesBySubscriptionUpdateOutput,
  }),
);
// Input Schema
export const SitesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/sites/{siteName}",
    }),
  );
export type SitesCreateOrUpdateInput = typeof SitesCreateOrUpdateInput.Type;

// Output Schema
export const SitesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SitesCreateOrUpdateOutput = typeof SitesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a Site
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - The name of the Site
 */
export const SitesCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SitesCreateOrUpdateInput,
  outputSchema: SitesCreateOrUpdateOutput,
}));
// Input Schema
export const SitesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  siteName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/sites/{siteName}",
  }),
);
export type SitesDeleteInput = typeof SitesDeleteInput.Type;

// Output Schema
export const SitesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SitesDeleteOutput = typeof SitesDeleteOutput.Type;

// The operation
/**
 * Delete a Site
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - The name of the Site
 */
export const SitesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SitesDeleteInput,
  outputSchema: SitesDeleteOutput,
}));
// Input Schema
export const SitesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  siteName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/sites/{siteName}",
  }),
);
export type SitesGetInput = typeof SitesGetInput.Type;

// Output Schema
export const SitesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SitesGetOutput = typeof SitesGetOutput.Type;

// The operation
/**
 * Get a Site
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - The name of the Site
 */
export const SitesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SitesGetInput,
  outputSchema: SitesGetOutput,
}));
// Input Schema
export const SitesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/sites",
    }),
  );
export type SitesListByResourceGroupInput =
  typeof SitesListByResourceGroupInput.Type;

// Output Schema
export const SitesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type SitesListByResourceGroupOutput =
  typeof SitesListByResourceGroupOutput.Type;

// The operation
/**
 * List Site resources by scope
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const SitesListByResourceGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SitesListByResourceGroupInput,
    outputSchema: SitesListByResourceGroupOutput,
  }),
);
// Input Schema
export const SitesUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  siteName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/sites/{siteName}",
  }),
);
export type SitesUpdateInput = typeof SitesUpdateInput.Type;

// Output Schema
export const SitesUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SitesUpdateOutput = typeof SitesUpdateOutput.Type;

// The operation
/**
 * Update a Site
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - The name of the Site
 */
export const SitesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SitesUpdateInput,
  outputSchema: SitesUpdateOutput,
}));
// Input Schema
export const SolutionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    targetName: Schema.String.pipe(T.PathParam()),
    solutionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/targets/{targetName}/solutions/{solutionName}",
    }),
  );
export type SolutionsCreateOrUpdateInput =
  typeof SolutionsCreateOrUpdateInput.Type;

// Output Schema
export const SolutionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SolutionsCreateOrUpdateOutput =
  typeof SolutionsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a Solution Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param targetName - Name of the target
 * @param solutionName - Name of the solution
 */
export const SolutionsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SolutionsCreateOrUpdateInput,
    outputSchema: SolutionsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const SolutionsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  targetName: Schema.String.pipe(T.PathParam()),
  solutionName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/targets/{targetName}/solutions/{solutionName}",
  }),
);
export type SolutionsDeleteInput = typeof SolutionsDeleteInput.Type;

// Output Schema
export const SolutionsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SolutionsDeleteOutput = typeof SolutionsDeleteOutput.Type;

// The operation
/**
 * Delete a Solution Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param targetName - Name of the target
 * @param solutionName - Name of the solution
 */
export const SolutionsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SolutionsDeleteInput,
  outputSchema: SolutionsDeleteOutput,
}));
// Input Schema
export const SolutionsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  targetName: Schema.String.pipe(T.PathParam()),
  solutionName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/targets/{targetName}/solutions/{solutionName}",
  }),
);
export type SolutionsGetInput = typeof SolutionsGetInput.Type;

// Output Schema
export const SolutionsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SolutionsGetOutput = typeof SolutionsGetOutput.Type;

// The operation
/**
 * Get a Solution resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param targetName - Name of the target
 * @param solutionName - Name of the solution
 */
export const SolutionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SolutionsGetInput,
  outputSchema: SolutionsGetOutput,
}));
// Input Schema
export const SolutionsListByTargetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    targetName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/targets/{targetName}/solutions",
    }),
  );
export type SolutionsListByTargetInput = typeof SolutionsListByTargetInput.Type;

// Output Schema
export const SolutionsListByTargetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type SolutionsListByTargetOutput =
  typeof SolutionsListByTargetOutput.Type;

// The operation
/**
 * List Solution resources
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param targetName - Name of the target
 */
export const SolutionsListByTarget = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SolutionsListByTargetInput,
    outputSchema: SolutionsListByTargetOutput,
  }),
);
// Input Schema
export const SolutionsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  targetName: Schema.String.pipe(T.PathParam()),
  solutionName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/targets/{targetName}/solutions/{solutionName}",
  }),
);
export type SolutionsUpdateInput = typeof SolutionsUpdateInput.Type;

// Output Schema
export const SolutionsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type SolutionsUpdateOutput = typeof SolutionsUpdateOutput.Type;

// The operation
/**
 * Update a Solution Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param targetName - Name of the target
 * @param solutionName - Name of the solution
 */
export const SolutionsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SolutionsUpdateInput,
  outputSchema: SolutionsUpdateOutput,
}));
// Input Schema
export const SolutionTemplatesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    solutionTemplateName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/solutionTemplates/{solutionTemplateName}",
    }),
  );
export type SolutionTemplatesCreateOrUpdateInput =
  typeof SolutionTemplatesCreateOrUpdateInput.Type;

// Output Schema
export const SolutionTemplatesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SolutionTemplatesCreateOrUpdateOutput =
  typeof SolutionTemplatesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a Solution Template Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param solutionTemplateName - The name of the SolutionTemplate
 */
export const SolutionTemplatesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SolutionTemplatesCreateOrUpdateInput,
    outputSchema: SolutionTemplatesCreateOrUpdateOutput,
  }));
// Input Schema
export const SolutionTemplatesCreateVersionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    solutionTemplateName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/solutionTemplates/{solutionTemplateName}/createVersion",
    }),
  );
export type SolutionTemplatesCreateVersionInput =
  typeof SolutionTemplatesCreateVersionInput.Type;

// Output Schema
export const SolutionTemplatesCreateVersionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SolutionTemplatesCreateVersionOutput =
  typeof SolutionTemplatesCreateVersionOutput.Type;

// The operation
/**
 * Create a Solution Template Version Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param solutionTemplateName - The name of the SolutionTemplate
 */
export const SolutionTemplatesCreateVersion =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SolutionTemplatesCreateVersionInput,
    outputSchema: SolutionTemplatesCreateVersionOutput,
  }));
// Input Schema
export const SolutionTemplatesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    solutionTemplateName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/solutionTemplates/{solutionTemplateName}",
    }),
  );
export type SolutionTemplatesDeleteInput =
  typeof SolutionTemplatesDeleteInput.Type;

// Output Schema
export const SolutionTemplatesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SolutionTemplatesDeleteOutput =
  typeof SolutionTemplatesDeleteOutput.Type;

// The operation
/**
 * Delete a Solution Template Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param solutionTemplateName - The name of the SolutionTemplate
 */
export const SolutionTemplatesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SolutionTemplatesDeleteInput,
    outputSchema: SolutionTemplatesDeleteOutput,
  }),
);
// Input Schema
export const SolutionTemplatesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    solutionTemplateName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/solutionTemplates/{solutionTemplateName}",
    }),
  );
export type SolutionTemplatesGetInput = typeof SolutionTemplatesGetInput.Type;

// Output Schema
export const SolutionTemplatesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SolutionTemplatesGetOutput = typeof SolutionTemplatesGetOutput.Type;

// The operation
/**
 * Get a Solution Template Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param solutionTemplateName - The name of the SolutionTemplate
 */
export const SolutionTemplatesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SolutionTemplatesGetInput,
    outputSchema: SolutionTemplatesGetOutput,
  }),
);
// Input Schema
export const SolutionTemplatesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/solutionTemplates",
    }),
  );
export type SolutionTemplatesListByResourceGroupInput =
  typeof SolutionTemplatesListByResourceGroupInput.Type;

// Output Schema
export const SolutionTemplatesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type SolutionTemplatesListByResourceGroupOutput =
  typeof SolutionTemplatesListByResourceGroupOutput.Type;

// The operation
/**
 * List by specified resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const SolutionTemplatesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SolutionTemplatesListByResourceGroupInput,
    outputSchema: SolutionTemplatesListByResourceGroupOutput,
  }));
// Input Schema
export const SolutionTemplatesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Edge/solutionTemplates",
    }),
  );
export type SolutionTemplatesListBySubscriptionInput =
  typeof SolutionTemplatesListBySubscriptionInput.Type;

// Output Schema
export const SolutionTemplatesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type SolutionTemplatesListBySubscriptionOutput =
  typeof SolutionTemplatesListBySubscriptionOutput.Type;

// The operation
/**
 * List by subscription
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const SolutionTemplatesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SolutionTemplatesListBySubscriptionInput,
    outputSchema: SolutionTemplatesListBySubscriptionOutput,
  }));
// Input Schema
export const SolutionTemplatesRemoveVersionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    solutionTemplateName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/solutionTemplates/{solutionTemplateName}/removeVersion",
    }),
  );
export type SolutionTemplatesRemoveVersionInput =
  typeof SolutionTemplatesRemoveVersionInput.Type;

// Output Schema
export const SolutionTemplatesRemoveVersionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SolutionTemplatesRemoveVersionOutput =
  typeof SolutionTemplatesRemoveVersionOutput.Type;

// The operation
/**
 * Remove Solution Template Version Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param solutionTemplateName - The name of the SolutionTemplate
 */
export const SolutionTemplatesRemoveVersion =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SolutionTemplatesRemoveVersionInput,
    outputSchema: SolutionTemplatesRemoveVersionOutput,
  }));
// Input Schema
export const SolutionTemplatesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    solutionTemplateName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/solutionTemplates/{solutionTemplateName}",
    }),
  );
export type SolutionTemplatesUpdateInput =
  typeof SolutionTemplatesUpdateInput.Type;

// Output Schema
export const SolutionTemplatesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SolutionTemplatesUpdateOutput =
  typeof SolutionTemplatesUpdateOutput.Type;

// The operation
/**
 * update a Solution Template Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param solutionTemplateName - The name of the SolutionTemplate
 */
export const SolutionTemplatesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SolutionTemplatesUpdateInput,
    outputSchema: SolutionTemplatesUpdateOutput,
  }),
);
// Input Schema
export const SolutionTemplateVersionsBulkDeploySolutionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    solutionTemplateName: Schema.String.pipe(T.PathParam()),
    solutionTemplateVersionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/solutionTemplates/{solutionTemplateName}/versions/{solutionTemplateVersionName}/bulkDeploySolution",
    }),
  );
export type SolutionTemplateVersionsBulkDeploySolutionInput =
  typeof SolutionTemplateVersionsBulkDeploySolutionInput.Type;

// Output Schema
export const SolutionTemplateVersionsBulkDeploySolutionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SolutionTemplateVersionsBulkDeploySolutionOutput =
  typeof SolutionTemplateVersionsBulkDeploySolutionOutput.Type;

// The operation
/**
 * Post request for bulk deploy
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param solutionTemplateName - The name of the SolutionTemplate
 * @param solutionTemplateVersionName - The name of the SolutionTemplateVersion
 */
export const SolutionTemplateVersionsBulkDeploySolution =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SolutionTemplateVersionsBulkDeploySolutionInput,
    outputSchema: SolutionTemplateVersionsBulkDeploySolutionOutput,
  }));
// Input Schema
export const SolutionTemplateVersionsBulkPublishSolutionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    solutionTemplateName: Schema.String.pipe(T.PathParam()),
    solutionTemplateVersionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/solutionTemplates/{solutionTemplateName}/versions/{solutionTemplateVersionName}/bulkPublishSolution",
    }),
  );
export type SolutionTemplateVersionsBulkPublishSolutionInput =
  typeof SolutionTemplateVersionsBulkPublishSolutionInput.Type;

// Output Schema
export const SolutionTemplateVersionsBulkPublishSolutionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SolutionTemplateVersionsBulkPublishSolutionOutput =
  typeof SolutionTemplateVersionsBulkPublishSolutionOutput.Type;

// The operation
/**
 * Post request for bulk publish
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param solutionTemplateName - The name of the SolutionTemplate
 * @param solutionTemplateVersionName - The name of the SolutionTemplateVersion
 */
export const SolutionTemplateVersionsBulkPublishSolution =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SolutionTemplateVersionsBulkPublishSolutionInput,
    outputSchema: SolutionTemplateVersionsBulkPublishSolutionOutput,
  }));
// Input Schema
export const SolutionTemplateVersionsBulkReviewSolutionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    solutionTemplateName: Schema.String.pipe(T.PathParam()),
    solutionTemplateVersionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/solutionTemplates/{solutionTemplateName}/versions/{solutionTemplateVersionName}/bulkReviewSolution",
    }),
  );
export type SolutionTemplateVersionsBulkReviewSolutionInput =
  typeof SolutionTemplateVersionsBulkReviewSolutionInput.Type;

// Output Schema
export const SolutionTemplateVersionsBulkReviewSolutionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SolutionTemplateVersionsBulkReviewSolutionOutput =
  typeof SolutionTemplateVersionsBulkReviewSolutionOutput.Type;

// The operation
/**
 * Post request for bulk review
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param solutionTemplateName - The name of the SolutionTemplate
 * @param solutionTemplateVersionName - The name of the SolutionTemplateVersion
 */
export const SolutionTemplateVersionsBulkReviewSolution =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SolutionTemplateVersionsBulkReviewSolutionInput,
    outputSchema: SolutionTemplateVersionsBulkReviewSolutionOutput,
  }));
// Input Schema
export const SolutionTemplateVersionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    solutionTemplateName: Schema.String.pipe(T.PathParam()),
    solutionTemplateVersionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/solutionTemplates/{solutionTemplateName}/versions/{solutionTemplateVersionName}",
    }),
  );
export type SolutionTemplateVersionsGetInput =
  typeof SolutionTemplateVersionsGetInput.Type;

// Output Schema
export const SolutionTemplateVersionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SolutionTemplateVersionsGetOutput =
  typeof SolutionTemplateVersionsGetOutput.Type;

// The operation
/**
 * Get a Solution Template Version Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param solutionTemplateName - The name of the SolutionTemplate
 * @param solutionTemplateVersionName - The name of the SolutionTemplateVersion
 */
export const SolutionTemplateVersionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SolutionTemplateVersionsGetInput,
    outputSchema: SolutionTemplateVersionsGetOutput,
  }),
);
// Input Schema
export const SolutionTemplateVersionsListBySolutionTemplateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    solutionTemplateName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/solutionTemplates/{solutionTemplateName}/versions",
    }),
  );
export type SolutionTemplateVersionsListBySolutionTemplateInput =
  typeof SolutionTemplateVersionsListBySolutionTemplateInput.Type;

// Output Schema
export const SolutionTemplateVersionsListBySolutionTemplateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type SolutionTemplateVersionsListBySolutionTemplateOutput =
  typeof SolutionTemplateVersionsListBySolutionTemplateOutput.Type;

// The operation
/**
 * List Solution Template Version Resources
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param solutionTemplateName - The name of the SolutionTemplate
 */
export const SolutionTemplateVersionsListBySolutionTemplate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SolutionTemplateVersionsListBySolutionTemplateInput,
    outputSchema: SolutionTemplateVersionsListBySolutionTemplateOutput,
  }));
// Input Schema
export const SolutionVersionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    targetName: Schema.String.pipe(T.PathParam()),
    solutionName: Schema.String.pipe(T.PathParam()),
    solutionVersionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/targets/{targetName}/solutions/{solutionName}/versions/{solutionVersionName}",
    }),
  );
export type SolutionVersionsCreateOrUpdateInput =
  typeof SolutionVersionsCreateOrUpdateInput.Type;

// Output Schema
export const SolutionVersionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SolutionVersionsCreateOrUpdateOutput =
  typeof SolutionVersionsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a Solution Version Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param targetName - Name of the target
 * @param solutionName - Name of the solution
 * @param solutionVersionName - Name of the solution version
 */
export const SolutionVersionsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SolutionVersionsCreateOrUpdateInput,
    outputSchema: SolutionVersionsCreateOrUpdateOutput,
  }));
// Input Schema
export const SolutionVersionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    targetName: Schema.String.pipe(T.PathParam()),
    solutionName: Schema.String.pipe(T.PathParam()),
    solutionVersionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/targets/{targetName}/solutions/{solutionName}/versions/{solutionVersionName}",
    }),
  );
export type SolutionVersionsDeleteInput =
  typeof SolutionVersionsDeleteInput.Type;

// Output Schema
export const SolutionVersionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SolutionVersionsDeleteOutput =
  typeof SolutionVersionsDeleteOutput.Type;

// The operation
/**
 * Delete a Solution Version Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param targetName - Name of the target
 * @param solutionName - Name of the solution
 * @param solutionVersionName - Name of the solution version
 */
export const SolutionVersionsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SolutionVersionsDeleteInput,
    outputSchema: SolutionVersionsDeleteOutput,
  }),
);
// Input Schema
export const SolutionVersionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    targetName: Schema.String.pipe(T.PathParam()),
    solutionName: Schema.String.pipe(T.PathParam()),
    solutionVersionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/targets/{targetName}/solutions/{solutionName}/versions/{solutionVersionName}",
    }),
  );
export type SolutionVersionsGetInput = typeof SolutionVersionsGetInput.Type;

// Output Schema
export const SolutionVersionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SolutionVersionsGetOutput = typeof SolutionVersionsGetOutput.Type;

// The operation
/**
 * Get a Solution Version Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param targetName - Name of the target
 * @param solutionName - Name of the solution
 * @param solutionVersionName - Name of the solution version
 */
export const SolutionVersionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SolutionVersionsGetInput,
  outputSchema: SolutionVersionsGetOutput,
}));
// Input Schema
export const SolutionVersionsListBySolutionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    targetName: Schema.String.pipe(T.PathParam()),
    solutionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/targets/{targetName}/solutions/{solutionName}/versions",
    }),
  );
export type SolutionVersionsListBySolutionInput =
  typeof SolutionVersionsListBySolutionInput.Type;

// Output Schema
export const SolutionVersionsListBySolutionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type SolutionVersionsListBySolutionOutput =
  typeof SolutionVersionsListBySolutionOutput.Type;

// The operation
/**
 * List Solution Version Resources
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param targetName - Name of the target
 * @param solutionName - Name of the solution
 */
export const SolutionVersionsListBySolution =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SolutionVersionsListBySolutionInput,
    outputSchema: SolutionVersionsListBySolutionOutput,
  }));
// Input Schema
export const SolutionVersionsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    targetName: Schema.String.pipe(T.PathParam()),
    solutionName: Schema.String.pipe(T.PathParam()),
    solutionVersionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/targets/{targetName}/solutions/{solutionName}/versions/{solutionVersionName}",
    }),
  );
export type SolutionVersionsUpdateInput =
  typeof SolutionVersionsUpdateInput.Type;

// Output Schema
export const SolutionVersionsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SolutionVersionsUpdateOutput =
  typeof SolutionVersionsUpdateOutput.Type;

// The operation
/**
 * Update a Solution Version Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param targetName - Name of the target
 * @param solutionName - Name of the solution
 * @param solutionVersionName - Name of the solution version
 */
export const SolutionVersionsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SolutionVersionsUpdateInput,
    outputSchema: SolutionVersionsUpdateOutput,
  }),
);
// Input Schema
export const TargetsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    targetName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/targets/{targetName}",
    }),
  );
export type TargetsCreateOrUpdateInput = typeof TargetsCreateOrUpdateInput.Type;

// Output Schema
export const TargetsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type TargetsCreateOrUpdateOutput =
  typeof TargetsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a Target Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param targetName - Name of the target
 */
export const TargetsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: TargetsCreateOrUpdateInput,
    outputSchema: TargetsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const TargetsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  targetName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/targets/{targetName}",
  }),
);
export type TargetsDeleteInput = typeof TargetsDeleteInput.Type;

// Output Schema
export const TargetsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type TargetsDeleteOutput = typeof TargetsDeleteOutput.Type;

// The operation
/**
 * Delete a Target Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param targetName - Name of the target
 */
export const TargetsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TargetsDeleteInput,
  outputSchema: TargetsDeleteOutput,
}));
// Input Schema
export const TargetsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  targetName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/targets/{targetName}",
  }),
);
export type TargetsGetInput = typeof TargetsGetInput.Type;

// Output Schema
export const TargetsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type TargetsGetOutput = typeof TargetsGetOutput.Type;

// The operation
/**
 * Get a Target Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param targetName - Name of the target
 */
export const TargetsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TargetsGetInput,
  outputSchema: TargetsGetOutput,
}));
// Input Schema
export const TargetsInstallSolutionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    targetName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/targets/{targetName}/installSolution",
    }),
  );
export type TargetsInstallSolutionInput =
  typeof TargetsInstallSolutionInput.Type;

// Output Schema
export const TargetsInstallSolutionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type TargetsInstallSolutionOutput =
  typeof TargetsInstallSolutionOutput.Type;

// The operation
/**
 * Post request to deploy
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param targetName - Name of the target
 */
export const TargetsInstallSolution = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: TargetsInstallSolutionInput,
    outputSchema: TargetsInstallSolutionOutput,
  }),
);
// Input Schema
export const TargetsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/targets",
    }),
  );
export type TargetsListByResourceGroupInput =
  typeof TargetsListByResourceGroupInput.Type;

// Output Schema
export const TargetsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type TargetsListByResourceGroupOutput =
  typeof TargetsListByResourceGroupOutput.Type;

// The operation
/**
 * List by specified resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const TargetsListByResourceGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: TargetsListByResourceGroupInput,
    outputSchema: TargetsListByResourceGroupOutput,
  }),
);
// Input Schema
export const TargetsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Edge/targets",
    }),
  );
export type TargetsListBySubscriptionInput =
  typeof TargetsListBySubscriptionInput.Type;

// Output Schema
export const TargetsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type TargetsListBySubscriptionOutput =
  typeof TargetsListBySubscriptionOutput.Type;

// The operation
/**
 * List by subscription
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const TargetsListBySubscription = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: TargetsListBySubscriptionInput,
    outputSchema: TargetsListBySubscriptionOutput,
  }),
);
// Input Schema
export const TargetsPublishSolutionVersionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    targetName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/targets/{targetName}/publishSolutionVersion",
    }),
  );
export type TargetsPublishSolutionVersionInput =
  typeof TargetsPublishSolutionVersionInput.Type;

// Output Schema
export const TargetsPublishSolutionVersionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type TargetsPublishSolutionVersionOutput =
  typeof TargetsPublishSolutionVersionOutput.Type;

// The operation
/**
 * Post request to publish
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param targetName - Name of the target
 */
export const TargetsPublishSolutionVersion =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: TargetsPublishSolutionVersionInput,
    outputSchema: TargetsPublishSolutionVersionOutput,
  }));
// Input Schema
export const TargetsRemoveRevisionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    targetName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/targets/{targetName}/removeRevision",
    }),
  );
export type TargetsRemoveRevisionInput = typeof TargetsRemoveRevisionInput.Type;

// Output Schema
export const TargetsRemoveRevisionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type TargetsRemoveRevisionOutput =
  typeof TargetsRemoveRevisionOutput.Type;

// The operation
/**
 * Post request to remove solution version revision
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param targetName - Name of the target
 */
export const TargetsRemoveRevision = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: TargetsRemoveRevisionInput,
    outputSchema: TargetsRemoveRevisionOutput,
  }),
);
// Input Schema
export const TargetsResolveConfigurationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    targetName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/targets/{targetName}/resolveConfiguration",
    }),
  );
export type TargetsResolveConfigurationInput =
  typeof TargetsResolveConfigurationInput.Type;

// Output Schema
export const TargetsResolveConfigurationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    configuration: Schema.String,
  });
export type TargetsResolveConfigurationOutput =
  typeof TargetsResolveConfigurationOutput.Type;

// The operation
/**
 * Post request to resolve configuration
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param targetName - Name of the target
 */
export const TargetsResolveConfiguration = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: TargetsResolveConfigurationInput,
    outputSchema: TargetsResolveConfigurationOutput,
  }),
);
// Input Schema
export const TargetsReviewSolutionVersionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    targetName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/targets/{targetName}/reviewSolutionVersion",
    }),
  );
export type TargetsReviewSolutionVersionInput =
  typeof TargetsReviewSolutionVersionInput.Type;

// Output Schema
export const TargetsReviewSolutionVersionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type TargetsReviewSolutionVersionOutput =
  typeof TargetsReviewSolutionVersionOutput.Type;

// The operation
/**
 * Post request to review configuration
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param targetName - Name of the target
 */
export const TargetsReviewSolutionVersion =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: TargetsReviewSolutionVersionInput,
    outputSchema: TargetsReviewSolutionVersionOutput,
  }));
// Input Schema
export const TargetsUninstallSolutionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    targetName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/targets/{targetName}/uninstallSolution",
    }),
  );
export type TargetsUninstallSolutionInput =
  typeof TargetsUninstallSolutionInput.Type;

// Output Schema
export const TargetsUninstallSolutionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type TargetsUninstallSolutionOutput =
  typeof TargetsUninstallSolutionOutput.Type;

// The operation
/**
 * Post request to uninstall
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param targetName - Name of the target
 */
export const TargetsUninstallSolution = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: TargetsUninstallSolutionInput,
    outputSchema: TargetsUninstallSolutionOutput,
  }),
);
// Input Schema
export const TargetsUnstageSolutionVersionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    targetName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/targets/{targetName}/unstageSolutionVersion",
    }),
  );
export type TargetsUnstageSolutionVersionInput =
  typeof TargetsUnstageSolutionVersionInput.Type;

// Output Schema
export const TargetsUnstageSolutionVersionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type TargetsUnstageSolutionVersionOutput =
  typeof TargetsUnstageSolutionVersionOutput.Type;

// The operation
/**
 * Post request to unstage solution version
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param targetName - Name of the target
 */
export const TargetsUnstageSolutionVersion =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: TargetsUnstageSolutionVersionInput,
    outputSchema: TargetsUnstageSolutionVersionOutput,
  }));
// Input Schema
export const TargetsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  targetName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/targets/{targetName}",
  }),
);
export type TargetsUpdateInput = typeof TargetsUpdateInput.Type;

// Output Schema
export const TargetsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type TargetsUpdateOutput = typeof TargetsUpdateOutput.Type;

// The operation
/**
 * update a Target Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param targetName - Name of the target
 */
export const TargetsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TargetsUpdateInput,
  outputSchema: TargetsUpdateOutput,
}));
// Input Schema
export const TargetsUpdateExternalValidationStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    targetName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/targets/{targetName}/updateExternalValidationStatus",
    }),
  );
export type TargetsUpdateExternalValidationStatusInput =
  typeof TargetsUpdateExternalValidationStatusInput.Type;

// Output Schema
export const TargetsUpdateExternalValidationStatusOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type TargetsUpdateExternalValidationStatusOutput =
  typeof TargetsUpdateExternalValidationStatusOutput.Type;

// The operation
/**
 * Post request to update external validation status
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param targetName - Name of the target
 */
export const TargetsUpdateExternalValidationStatus =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: TargetsUpdateExternalValidationStatusInput,
    outputSchema: TargetsUpdateExternalValidationStatusOutput,
  }));
// Input Schema
export const WorkflowsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    contextName: Schema.String.pipe(T.PathParam()),
    workflowName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/contexts/{contextName}/workflows/{workflowName}",
    }),
  );
export type WorkflowsCreateOrUpdateInput =
  typeof WorkflowsCreateOrUpdateInput.Type;

// Output Schema
export const WorkflowsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WorkflowsCreateOrUpdateOutput =
  typeof WorkflowsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a Workflow resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param contextName - The name of the Context.
 * @param workflowName - Name of the workflow
 */
export const WorkflowsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WorkflowsCreateOrUpdateInput,
    outputSchema: WorkflowsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const WorkflowsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  contextName: Schema.String.pipe(T.PathParam()),
  workflowName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/contexts/{contextName}/workflows/{workflowName}",
  }),
);
export type WorkflowsDeleteInput = typeof WorkflowsDeleteInput.Type;

// Output Schema
export const WorkflowsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type WorkflowsDeleteOutput = typeof WorkflowsDeleteOutput.Type;

// The operation
/**
 * Delete a Workflow resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param contextName - The name of the Context.
 * @param workflowName - Name of the workflow
 */
export const WorkflowsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WorkflowsDeleteInput,
  outputSchema: WorkflowsDeleteOutput,
}));
// Input Schema
export const WorkflowsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  contextName: Schema.String.pipe(T.PathParam()),
  workflowName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/contexts/{contextName}/workflows/{workflowName}",
  }),
);
export type WorkflowsGetInput = typeof WorkflowsGetInput.Type;

// Output Schema
export const WorkflowsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WorkflowsGetOutput = typeof WorkflowsGetOutput.Type;

// The operation
/**
 * Get a Workflow resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param contextName - The name of the Context.
 * @param workflowName - Name of the workflow
 */
export const WorkflowsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WorkflowsGetInput,
  outputSchema: WorkflowsGetOutput,
}));
// Input Schema
export const WorkflowsListByContextInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    contextName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/contexts/{contextName}/workflows",
    }),
  );
export type WorkflowsListByContextInput =
  typeof WorkflowsListByContextInput.Type;

// Output Schema
export const WorkflowsListByContextOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type WorkflowsListByContextOutput =
  typeof WorkflowsListByContextOutput.Type;

// The operation
/**
 * List Workflow resources
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param contextName - The name of the Context.
 */
export const WorkflowsListByContext = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WorkflowsListByContextInput,
    outputSchema: WorkflowsListByContextOutput,
  }),
);
// Input Schema
export const WorkflowsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  contextName: Schema.String.pipe(T.PathParam()),
  workflowName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/contexts/{contextName}/workflows/{workflowName}",
  }),
);
export type WorkflowsUpdateInput = typeof WorkflowsUpdateInput.Type;

// Output Schema
export const WorkflowsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type WorkflowsUpdateOutput = typeof WorkflowsUpdateOutput.Type;

// The operation
/**
 * update a Workflow resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param contextName - The name of the Context.
 * @param workflowName - Name of the workflow
 */
export const WorkflowsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WorkflowsUpdateInput,
  outputSchema: WorkflowsUpdateOutput,
}));
// Input Schema
export const WorkflowVersionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    contextName: Schema.String.pipe(T.PathParam()),
    workflowName: Schema.String.pipe(T.PathParam()),
    versionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/contexts/{contextName}/workflows/{workflowName}/versions/{versionName}",
    }),
  );
export type WorkflowVersionsCreateOrUpdateInput =
  typeof WorkflowVersionsCreateOrUpdateInput.Type;

// Output Schema
export const WorkflowVersionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WorkflowVersionsCreateOrUpdateOutput =
  typeof WorkflowVersionsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a Workflow Version Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param contextName - The name of the Context.
 * @param workflowName - Name of the workflow
 * @param versionName - The name of the workflowVersion.
 */
export const WorkflowVersionsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkflowVersionsCreateOrUpdateInput,
    outputSchema: WorkflowVersionsCreateOrUpdateOutput,
  }));
// Input Schema
export const WorkflowVersionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    contextName: Schema.String.pipe(T.PathParam()),
    workflowName: Schema.String.pipe(T.PathParam()),
    versionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/contexts/{contextName}/workflows/{workflowName}/versions/{versionName}",
    }),
  );
export type WorkflowVersionsDeleteInput =
  typeof WorkflowVersionsDeleteInput.Type;

// Output Schema
export const WorkflowVersionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type WorkflowVersionsDeleteOutput =
  typeof WorkflowVersionsDeleteOutput.Type;

// The operation
/**
 * Delete a Workflow Version Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param contextName - The name of the Context.
 * @param workflowName - Name of the workflow
 * @param versionName - The name of the workflowVersion.
 */
export const WorkflowVersionsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WorkflowVersionsDeleteInput,
    outputSchema: WorkflowVersionsDeleteOutput,
  }),
);
// Input Schema
export const WorkflowVersionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    contextName: Schema.String.pipe(T.PathParam()),
    workflowName: Schema.String.pipe(T.PathParam()),
    versionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/contexts/{contextName}/workflows/{workflowName}/versions/{versionName}",
    }),
  );
export type WorkflowVersionsGetInput = typeof WorkflowVersionsGetInput.Type;

// Output Schema
export const WorkflowVersionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WorkflowVersionsGetOutput = typeof WorkflowVersionsGetOutput.Type;

// The operation
/**
 * Get a Workflow Version Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param contextName - The name of the Context.
 * @param workflowName - Name of the workflow
 * @param versionName - The name of the workflowVersion.
 */
export const WorkflowVersionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WorkflowVersionsGetInput,
  outputSchema: WorkflowVersionsGetOutput,
}));
// Input Schema
export const WorkflowVersionsListByWorkflowInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    contextName: Schema.String.pipe(T.PathParam()),
    workflowName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/contexts/{contextName}/workflows/{workflowName}/versions",
    }),
  );
export type WorkflowVersionsListByWorkflowInput =
  typeof WorkflowVersionsListByWorkflowInput.Type;

// Output Schema
export const WorkflowVersionsListByWorkflowOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type WorkflowVersionsListByWorkflowOutput =
  typeof WorkflowVersionsListByWorkflowOutput.Type;

// The operation
/**
 * List Workflow Version Resources
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param contextName - The name of the Context.
 * @param workflowName - Name of the workflow
 */
export const WorkflowVersionsListByWorkflow =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkflowVersionsListByWorkflowInput,
    outputSchema: WorkflowVersionsListByWorkflowOutput,
  }));
// Input Schema
export const WorkflowVersionsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    contextName: Schema.String.pipe(T.PathParam()),
    workflowName: Schema.String.pipe(T.PathParam()),
    versionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/contexts/{contextName}/workflows/{workflowName}/versions/{versionName}",
    }),
  );
export type WorkflowVersionsUpdateInput =
  typeof WorkflowVersionsUpdateInput.Type;

// Output Schema
export const WorkflowVersionsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WorkflowVersionsUpdateOutput =
  typeof WorkflowVersionsUpdateOutput.Type;

// The operation
/**
 * update an WorkflowVersion Resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param contextName - The name of the Context.
 * @param workflowName - Name of the workflow
 * @param versionName - The name of the workflowVersion.
 */
export const WorkflowVersionsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WorkflowVersionsUpdateInput,
    outputSchema: WorkflowVersionsUpdateOutput,
  }),
);
