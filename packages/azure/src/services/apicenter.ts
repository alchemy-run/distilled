/**
 * Azure Apicenter API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const ApiDefinitionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serviceName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    apiName: Schema.String.pipe(T.PathParam()),
    versionName: Schema.String.pipe(T.PathParam()),
    definitionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiCenter/services/{serviceName}/workspaces/{workspaceName}/apis/{apiName}/versions/{versionName}/definitions/{definitionName}",
    }),
  );
export type ApiDefinitionsCreateOrUpdateInput =
  typeof ApiDefinitionsCreateOrUpdateInput.Type;

// Output Schema
export const ApiDefinitionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ApiDefinitionsCreateOrUpdateOutput =
  typeof ApiDefinitionsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates new or updates existing API definition.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serviceName - The name of Azure API Center service.
 * @param workspaceName - The name of the workspace.
 * @param apiName - The name of the API.
 * @param versionName - The name of the API version.
 * @param definitionName - The name of the API definition.
 */
export const ApiDefinitionsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ApiDefinitionsCreateOrUpdateInput,
    outputSchema: ApiDefinitionsCreateOrUpdateOutput,
  }));
// Input Schema
export const ApiDefinitionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serviceName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    apiName: Schema.String.pipe(T.PathParam()),
    versionName: Schema.String.pipe(T.PathParam()),
    definitionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiCenter/services/{serviceName}/workspaces/{workspaceName}/apis/{apiName}/versions/{versionName}/definitions/{definitionName}",
    }),
  );
export type ApiDefinitionsDeleteInput = typeof ApiDefinitionsDeleteInput.Type;

// Output Schema
export const ApiDefinitionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ApiDefinitionsDeleteOutput = typeof ApiDefinitionsDeleteOutput.Type;

// The operation
/**
 * Deletes specified API definition.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serviceName - The name of Azure API Center service.
 * @param workspaceName - The name of the workspace.
 * @param apiName - The name of the API.
 * @param versionName - The name of the API version.
 * @param definitionName - The name of the API definition.
 */
export const ApiDefinitionsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ApiDefinitionsDeleteInput,
    outputSchema: ApiDefinitionsDeleteOutput,
  }),
);
// Input Schema
export const ApiDefinitionsExportSpecificationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serviceName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    apiName: Schema.String.pipe(T.PathParam()),
    versionName: Schema.String.pipe(T.PathParam()),
    definitionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiCenter/services/{serviceName}/workspaces/{workspaceName}/apis/{apiName}/versions/{versionName}/definitions/{definitionName}/exportSpecification",
    }),
  );
export type ApiDefinitionsExportSpecificationInput =
  typeof ApiDefinitionsExportSpecificationInput.Type;

// Output Schema
export const ApiDefinitionsExportSpecificationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    format: Schema.optional(Schema.Literals(["inline", "link"])),
    value: Schema.optional(Schema.String),
  });
export type ApiDefinitionsExportSpecificationOutput =
  typeof ApiDefinitionsExportSpecificationOutput.Type;

// The operation
/**
 * Exports the API specification.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serviceName - The name of Azure API Center service.
 * @param workspaceName - The name of the workspace.
 * @param apiName - The name of the API.
 * @param versionName - The name of the API version.
 * @param definitionName - The name of the API definition.
 */
export const ApiDefinitionsExportSpecification =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ApiDefinitionsExportSpecificationInput,
    outputSchema: ApiDefinitionsExportSpecificationOutput,
  }));
// Input Schema
export const ApiDefinitionsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serviceName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    apiName: Schema.String.pipe(T.PathParam()),
    versionName: Schema.String.pipe(T.PathParam()),
    definitionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiCenter/services/{serviceName}/workspaces/{workspaceName}/apis/{apiName}/versions/{versionName}/definitions/{definitionName}",
  }),
);
export type ApiDefinitionsGetInput = typeof ApiDefinitionsGetInput.Type;

// Output Schema
export const ApiDefinitionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ApiDefinitionsGetOutput = typeof ApiDefinitionsGetOutput.Type;

// The operation
/**
 * Returns details of the API definition.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serviceName - The name of Azure API Center service.
 * @param workspaceName - The name of the workspace.
 * @param apiName - The name of the API.
 * @param versionName - The name of the API version.
 * @param definitionName - The name of the API definition.
 */
export const ApiDefinitionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ApiDefinitionsGetInput,
  outputSchema: ApiDefinitionsGetOutput,
}));
// Input Schema
export const ApiDefinitionsImportSpecificationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serviceName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    apiName: Schema.String.pipe(T.PathParam()),
    versionName: Schema.String.pipe(T.PathParam()),
    definitionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiCenter/services/{serviceName}/workspaces/{workspaceName}/apis/{apiName}/versions/{versionName}/definitions/{definitionName}/importSpecification",
    }),
  );
export type ApiDefinitionsImportSpecificationInput =
  typeof ApiDefinitionsImportSpecificationInput.Type;

// Output Schema
export const ApiDefinitionsImportSpecificationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ApiDefinitionsImportSpecificationOutput =
  typeof ApiDefinitionsImportSpecificationOutput.Type;

// The operation
/**
 * Imports the API specification.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serviceName - The name of Azure API Center service.
 * @param workspaceName - The name of the workspace.
 * @param apiName - The name of the API.
 * @param versionName - The name of the API version.
 * @param definitionName - The name of the API definition.
 */
export const ApiDefinitionsImportSpecification =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ApiDefinitionsImportSpecificationInput,
    outputSchema: ApiDefinitionsImportSpecificationOutput,
  }));
// Input Schema
export const ApiDefinitionsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serviceName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    apiName: Schema.String.pipe(T.PathParam()),
    versionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiCenter/services/{serviceName}/workspaces/{workspaceName}/apis/{apiName}/versions/{versionName}/definitions",
    }),
  );
export type ApiDefinitionsListInput = typeof ApiDefinitionsListInput.Type;

// Output Schema
export const ApiDefinitionsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type ApiDefinitionsListOutput = typeof ApiDefinitionsListOutput.Type;

// The operation
/**
 * Returns a collection of API definitions.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serviceName - The name of Azure API Center service.
 * @param workspaceName - The name of the workspace.
 * @param apiName - The name of the API.
 * @param versionName - The name of the API version.
 */
export const ApiDefinitionsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ApiDefinitionsListInput,
  outputSchema: ApiDefinitionsListOutput,
}));
// Input Schema
export const ApisCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serviceName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    apiName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiCenter/services/{serviceName}/workspaces/{workspaceName}/apis/{apiName}",
    }),
  );
export type ApisCreateOrUpdateInput = typeof ApisCreateOrUpdateInput.Type;

// Output Schema
export const ApisCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ApisCreateOrUpdateOutput = typeof ApisCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates new or updates existing API.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serviceName - The name of Azure API Center service.
 * @param workspaceName - The name of the workspace.
 * @param apiName - The name of the API.
 */
export const ApisCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ApisCreateOrUpdateInput,
  outputSchema: ApisCreateOrUpdateOutput,
}));
// Input Schema
export const ApisDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  serviceName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  apiName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiCenter/services/{serviceName}/workspaces/{workspaceName}/apis/{apiName}",
  }),
);
export type ApisDeleteInput = typeof ApisDeleteInput.Type;

// Output Schema
export const ApisDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ApisDeleteOutput = typeof ApisDeleteOutput.Type;

// The operation
/**
 * Deletes specified API.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serviceName - The name of Azure API Center service.
 * @param workspaceName - The name of the workspace.
 * @param apiName - The name of the API.
 */
export const ApisDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ApisDeleteInput,
  outputSchema: ApisDeleteOutput,
}));
// Input Schema
export const ApisGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  serviceName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  apiName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiCenter/services/{serviceName}/workspaces/{workspaceName}/apis/{apiName}",
  }),
);
export type ApisGetInput = typeof ApisGetInput.Type;

// Output Schema
export const ApisGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ApisGetOutput = typeof ApisGetOutput.Type;

// The operation
/**
 * Returns details of the API.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serviceName - The name of Azure API Center service.
 * @param workspaceName - The name of the workspace.
 * @param apiName - The name of the API.
 */
export const ApisGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ApisGetInput,
  outputSchema: ApisGetOutput,
}));
// Input Schema
export const ApisListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  serviceName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiCenter/services/{serviceName}/workspaces/{workspaceName}/apis",
  }),
);
export type ApisListInput = typeof ApisListInput.Type;

// Output Schema
export const ApisListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(Schema.Struct({})),
  nextLink: Schema.optional(Schema.String),
});
export type ApisListOutput = typeof ApisListOutput.Type;

// The operation
/**
 * Returns a collection of APIs.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serviceName - The name of Azure API Center service.
 * @param workspaceName - The name of the workspace.
 */
export const ApisList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ApisListInput,
  outputSchema: ApisListOutput,
}));
// Input Schema
export const ApiVersionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serviceName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    apiName: Schema.String.pipe(T.PathParam()),
    versionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiCenter/services/{serviceName}/workspaces/{workspaceName}/apis/{apiName}/versions/{versionName}",
    }),
  );
export type ApiVersionsCreateOrUpdateInput =
  typeof ApiVersionsCreateOrUpdateInput.Type;

// Output Schema
export const ApiVersionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ApiVersionsCreateOrUpdateOutput =
  typeof ApiVersionsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates new or updates existing API version.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serviceName - The name of Azure API Center service.
 * @param workspaceName - The name of the workspace.
 * @param apiName - The name of the API.
 * @param versionName - The name of the API version.
 */
export const ApiVersionsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ApiVersionsCreateOrUpdateInput,
    outputSchema: ApiVersionsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const ApiVersionsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serviceName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    apiName: Schema.String.pipe(T.PathParam()),
    versionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiCenter/services/{serviceName}/workspaces/{workspaceName}/apis/{apiName}/versions/{versionName}",
  }),
);
export type ApiVersionsDeleteInput = typeof ApiVersionsDeleteInput.Type;

// Output Schema
export const ApiVersionsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ApiVersionsDeleteOutput = typeof ApiVersionsDeleteOutput.Type;

// The operation
/**
 * Deletes specified API version
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serviceName - The name of Azure API Center service.
 * @param workspaceName - The name of the workspace.
 * @param apiName - The name of the API.
 * @param versionName - The name of the API version.
 */
export const ApiVersionsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ApiVersionsDeleteInput,
  outputSchema: ApiVersionsDeleteOutput,
}));
// Input Schema
export const ApiVersionsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  serviceName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  apiName: Schema.String.pipe(T.PathParam()),
  versionName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiCenter/services/{serviceName}/workspaces/{workspaceName}/apis/{apiName}/versions/{versionName}",
  }),
);
export type ApiVersionsGetInput = typeof ApiVersionsGetInput.Type;

// Output Schema
export const ApiVersionsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type ApiVersionsGetOutput = typeof ApiVersionsGetOutput.Type;

// The operation
/**
 * Returns details of the API version.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serviceName - The name of Azure API Center service.
 * @param workspaceName - The name of the workspace.
 * @param apiName - The name of the API.
 * @param versionName - The name of the API version.
 */
export const ApiVersionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ApiVersionsGetInput,
  outputSchema: ApiVersionsGetOutput,
}));
// Input Schema
export const ApiVersionsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  serviceName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  apiName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiCenter/services/{serviceName}/workspaces/{workspaceName}/apis/{apiName}/versions",
  }),
);
export type ApiVersionsListInput = typeof ApiVersionsListInput.Type;

// Output Schema
export const ApiVersionsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(Schema.Struct({})),
  nextLink: Schema.optional(Schema.String),
});
export type ApiVersionsListOutput = typeof ApiVersionsListOutput.Type;

// The operation
/**
 * Returns a collection of API versions.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serviceName - The name of Azure API Center service.
 * @param workspaceName - The name of the workspace.
 * @param apiName - The name of the API.
 */
export const ApiVersionsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ApiVersionsListInput,
  outputSchema: ApiVersionsListOutput,
}));
// Input Schema
export const DeploymentsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serviceName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    apiName: Schema.String.pipe(T.PathParam()),
    deploymentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiCenter/services/{serviceName}/workspaces/{workspaceName}/apis/{apiName}/deployments/{deploymentName}",
    }),
  );
export type DeploymentsCreateOrUpdateInput =
  typeof DeploymentsCreateOrUpdateInput.Type;

// Output Schema
export const DeploymentsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DeploymentsCreateOrUpdateOutput =
  typeof DeploymentsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates new or updates existing API deployment.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serviceName - The name of Azure API Center service.
 * @param workspaceName - The name of the workspace.
 * @param apiName - The name of the API.
 * @param deploymentName - The name of the API deployment.
 */
export const DeploymentsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DeploymentsCreateOrUpdateInput,
    outputSchema: DeploymentsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const DeploymentsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serviceName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    apiName: Schema.String.pipe(T.PathParam()),
    deploymentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiCenter/services/{serviceName}/workspaces/{workspaceName}/apis/{apiName}/deployments/{deploymentName}",
  }),
);
export type DeploymentsDeleteInput = typeof DeploymentsDeleteInput.Type;

// Output Schema
export const DeploymentsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DeploymentsDeleteOutput = typeof DeploymentsDeleteOutput.Type;

// The operation
/**
 * Deletes API deployment.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serviceName - The name of Azure API Center service.
 * @param workspaceName - The name of the workspace.
 * @param apiName - The name of the API.
 * @param deploymentName - The name of the API deployment.
 */
export const DeploymentsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DeploymentsDeleteInput,
  outputSchema: DeploymentsDeleteOutput,
}));
// Input Schema
export const DeploymentsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  serviceName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  apiName: Schema.String.pipe(T.PathParam()),
  deploymentName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiCenter/services/{serviceName}/workspaces/{workspaceName}/apis/{apiName}/deployments/{deploymentName}",
  }),
);
export type DeploymentsGetInput = typeof DeploymentsGetInput.Type;

// Output Schema
export const DeploymentsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type DeploymentsGetOutput = typeof DeploymentsGetOutput.Type;

// The operation
/**
 * Returns details of the API deployment.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serviceName - The name of Azure API Center service.
 * @param workspaceName - The name of the workspace.
 * @param apiName - The name of the API.
 * @param deploymentName - The name of the API deployment.
 */
export const DeploymentsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DeploymentsGetInput,
  outputSchema: DeploymentsGetOutput,
}));
// Input Schema
export const DeploymentsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  serviceName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  apiName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiCenter/services/{serviceName}/workspaces/{workspaceName}/apis/{apiName}/deployments",
  }),
);
export type DeploymentsListInput = typeof DeploymentsListInput.Type;

// Output Schema
export const DeploymentsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(Schema.Struct({})),
  nextLink: Schema.optional(Schema.String),
});
export type DeploymentsListOutput = typeof DeploymentsListOutput.Type;

// The operation
/**
 * Returns a collection of API deployments.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serviceName - The name of Azure API Center service.
 * @param workspaceName - The name of the workspace.
 * @param apiName - The name of the API.
 */
export const DeploymentsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DeploymentsListInput,
  outputSchema: DeploymentsListOutput,
}));
// Input Schema
export const EnvironmentsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serviceName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    environmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiCenter/services/{serviceName}/workspaces/{workspaceName}/environments/{environmentName}",
    }),
  );
export type EnvironmentsCreateOrUpdateInput =
  typeof EnvironmentsCreateOrUpdateInput.Type;

// Output Schema
export const EnvironmentsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type EnvironmentsCreateOrUpdateOutput =
  typeof EnvironmentsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates new or updates existing environment.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serviceName - The name of Azure API Center service.
 * @param workspaceName - The name of the workspace.
 * @param environmentName - The name of the environment.
 */
export const EnvironmentsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: EnvironmentsCreateOrUpdateInput,
    outputSchema: EnvironmentsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const EnvironmentsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serviceName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    environmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiCenter/services/{serviceName}/workspaces/{workspaceName}/environments/{environmentName}",
    }),
  );
export type EnvironmentsDeleteInput = typeof EnvironmentsDeleteInput.Type;

// Output Schema
export const EnvironmentsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type EnvironmentsDeleteOutput = typeof EnvironmentsDeleteOutput.Type;

// The operation
/**
 * Deletes the environment.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serviceName - The name of Azure API Center service.
 * @param workspaceName - The name of the workspace.
 * @param environmentName - The name of the environment.
 */
export const EnvironmentsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: EnvironmentsDeleteInput,
  outputSchema: EnvironmentsDeleteOutput,
}));
// Input Schema
export const EnvironmentsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  serviceName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  environmentName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiCenter/services/{serviceName}/workspaces/{workspaceName}/environments/{environmentName}",
  }),
);
export type EnvironmentsGetInput = typeof EnvironmentsGetInput.Type;

// Output Schema
export const EnvironmentsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type EnvironmentsGetOutput = typeof EnvironmentsGetOutput.Type;

// The operation
/**
 * Returns details of the environment.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serviceName - The name of Azure API Center service.
 * @param workspaceName - The name of the workspace.
 * @param environmentName - The name of the environment.
 */
export const EnvironmentsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: EnvironmentsGetInput,
  outputSchema: EnvironmentsGetOutput,
}));
// Input Schema
export const EnvironmentsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  serviceName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiCenter/services/{serviceName}/workspaces/{workspaceName}/environments",
  }),
);
export type EnvironmentsListInput = typeof EnvironmentsListInput.Type;

// Output Schema
export const EnvironmentsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  },
);
export type EnvironmentsListOutput = typeof EnvironmentsListOutput.Type;

// The operation
/**
 * Returns a collection of environments.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serviceName - The name of Azure API Center service.
 * @param workspaceName - The name of the workspace.
 */
export const EnvironmentsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: EnvironmentsListInput,
  outputSchema: EnvironmentsListOutput,
}));
// Input Schema
export const MetadataSchemasCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serviceName: Schema.String.pipe(T.PathParam()),
    metadataSchemaName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiCenter/services/{serviceName}/metadataSchemas/{metadataSchemaName}",
    }),
  );
export type MetadataSchemasCreateOrUpdateInput =
  typeof MetadataSchemasCreateOrUpdateInput.Type;

// Output Schema
export const MetadataSchemasCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type MetadataSchemasCreateOrUpdateOutput =
  typeof MetadataSchemasCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates new or updates existing metadata schema.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serviceName - The name of Azure API Center service.
 * @param metadataSchemaName - The name of the metadata schema.
 */
export const MetadataSchemasCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MetadataSchemasCreateOrUpdateInput,
    outputSchema: MetadataSchemasCreateOrUpdateOutput,
  }));
// Input Schema
export const MetadataSchemasDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serviceName: Schema.String.pipe(T.PathParam()),
    metadataSchemaName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiCenter/services/{serviceName}/metadataSchemas/{metadataSchemaName}",
    }),
  );
export type MetadataSchemasDeleteInput = typeof MetadataSchemasDeleteInput.Type;

// Output Schema
export const MetadataSchemasDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type MetadataSchemasDeleteOutput =
  typeof MetadataSchemasDeleteOutput.Type;

// The operation
/**
 * Deletes specified metadata schema.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serviceName - The name of Azure API Center service.
 * @param metadataSchemaName - The name of the metadata schema.
 */
export const MetadataSchemasDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: MetadataSchemasDeleteInput,
    outputSchema: MetadataSchemasDeleteOutput,
  }),
);
// Input Schema
export const MetadataSchemasGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serviceName: Schema.String.pipe(T.PathParam()),
    metadataSchemaName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiCenter/services/{serviceName}/metadataSchemas/{metadataSchemaName}",
    }),
  );
export type MetadataSchemasGetInput = typeof MetadataSchemasGetInput.Type;

// Output Schema
export const MetadataSchemasGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type MetadataSchemasGetOutput = typeof MetadataSchemasGetOutput.Type;

// The operation
/**
 * Returns details of the metadata schema.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serviceName - The name of Azure API Center service.
 * @param metadataSchemaName - The name of the metadata schema.
 */
export const MetadataSchemasGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: MetadataSchemasGetInput,
  outputSchema: MetadataSchemasGetOutput,
}));
// Input Schema
export const MetadataSchemasListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serviceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiCenter/services/{serviceName}/metadataSchemas",
    }),
  );
export type MetadataSchemasListInput = typeof MetadataSchemasListInput.Type;

// Output Schema
export const MetadataSchemasListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type MetadataSchemasListOutput = typeof MetadataSchemasListOutput.Type;

// The operation
/**
 * Returns a collection of metadata schemas.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serviceName - The name of Azure API Center service.
 */
export const MetadataSchemasList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: MetadataSchemasListInput,
  outputSchema: MetadataSchemasListOutput,
}));
// Input Schema
export const ServicesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serviceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiCenter/services/{serviceName}",
    }),
  );
export type ServicesCreateOrUpdateInput =
  typeof ServicesCreateOrUpdateInput.Type;

// Output Schema
export const ServicesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ServicesCreateOrUpdateOutput =
  typeof ServicesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates new or updates existing API.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serviceName - The name of Azure API Center service.
 */
export const ServicesCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ServicesCreateOrUpdateInput,
    outputSchema: ServicesCreateOrUpdateOutput,
  }),
);
// Input Schema
export const ServicesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  serviceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiCenter/services/{serviceName}",
  }),
);
export type ServicesDeleteInput = typeof ServicesDeleteInput.Type;

// Output Schema
export const ServicesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ServicesDeleteOutput = typeof ServicesDeleteOutput.Type;

// The operation
/**
 * Deletes specified service.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serviceName - The name of Azure API Center service.
 */
export const ServicesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServicesDeleteInput,
  outputSchema: ServicesDeleteOutput,
}));
// Input Schema
export const ServicesExportMetadataSchemaInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serviceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiCenter/services/{serviceName}/exportMetadataSchema",
    }),
  );
export type ServicesExportMetadataSchemaInput =
  typeof ServicesExportMetadataSchemaInput.Type;

// Output Schema
export const ServicesExportMetadataSchemaOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    format: Schema.optional(Schema.Literals(["inline", "link"])),
    value: Schema.optional(Schema.String),
  });
export type ServicesExportMetadataSchemaOutput =
  typeof ServicesExportMetadataSchemaOutput.Type;

// The operation
/**
 * Exports the effective metadata schema.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serviceName - The name of Azure API Center service.
 */
export const ServicesExportMetadataSchema =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServicesExportMetadataSchemaInput,
    outputSchema: ServicesExportMetadataSchemaOutput,
  }));
// Input Schema
export const ServicesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  serviceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiCenter/services/{serviceName}",
  }),
);
export type ServicesGetInput = typeof ServicesGetInput.Type;

// Output Schema
export const ServicesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type ServicesGetOutput = typeof ServicesGetOutput.Type;

// The operation
/**
 * Returns details of the service.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serviceName - The name of Azure API Center service.
 */
export const ServicesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServicesGetInput,
  outputSchema: ServicesGetOutput,
}));
// Input Schema
export const ServicesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiCenter/services",
    }),
  );
export type ServicesListByResourceGroupInput =
  typeof ServicesListByResourceGroupInput.Type;

// Output Schema
export const ServicesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ServicesListByResourceGroupOutput =
  typeof ServicesListByResourceGroupOutput.Type;

// The operation
/**
 * Returns a collection of services within the resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ServicesListByResourceGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ServicesListByResourceGroupInput,
    outputSchema: ServicesListByResourceGroupOutput,
  }),
);
// Input Schema
export const ServicesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ApiCenter/services",
    }),
  );
export type ServicesListBySubscriptionInput =
  typeof ServicesListBySubscriptionInput.Type;

// Output Schema
export const ServicesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ServicesListBySubscriptionOutput =
  typeof ServicesListBySubscriptionOutput.Type;

// The operation
/**
 * Lists services within an Azure subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const ServicesListBySubscription = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ServicesListBySubscriptionInput,
    outputSchema: ServicesListBySubscriptionOutput,
  }),
);
// Input Schema
export const ServicesUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  serviceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiCenter/services/{serviceName}",
  }),
);
export type ServicesUpdateInput = typeof ServicesUpdateInput.Type;

// Output Schema
export const ServicesUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type ServicesUpdateOutput = typeof ServicesUpdateOutput.Type;

// The operation
/**
 * Updates existing service.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serviceName - The name of Azure API Center service.
 */
export const ServicesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServicesUpdateInput,
  outputSchema: ServicesUpdateOutput,
}));
// Input Schema
export const WorkspacesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serviceName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiCenter/services/{serviceName}/workspaces/{workspaceName}",
    }),
  );
export type WorkspacesCreateOrUpdateInput =
  typeof WorkspacesCreateOrUpdateInput.Type;

// Output Schema
export const WorkspacesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WorkspacesCreateOrUpdateOutput =
  typeof WorkspacesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates new or updates existing workspace.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serviceName - The name of Azure API Center service.
 * @param workspaceName - The name of the workspace.
 */
export const WorkspacesCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WorkspacesCreateOrUpdateInput,
    outputSchema: WorkspacesCreateOrUpdateOutput,
  }),
);
// Input Schema
export const WorkspacesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  serviceName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiCenter/services/{serviceName}/workspaces/{workspaceName}",
  }),
);
export type WorkspacesDeleteInput = typeof WorkspacesDeleteInput.Type;

// Output Schema
export const WorkspacesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type WorkspacesDeleteOutput = typeof WorkspacesDeleteOutput.Type;

// The operation
/**
 * Deletes specified workspace.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serviceName - The name of Azure API Center service.
 * @param workspaceName - The name of the workspace.
 */
export const WorkspacesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WorkspacesDeleteInput,
  outputSchema: WorkspacesDeleteOutput,
}));
// Input Schema
export const WorkspacesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  serviceName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiCenter/services/{serviceName}/workspaces/{workspaceName}",
  }),
);
export type WorkspacesGetInput = typeof WorkspacesGetInput.Type;

// Output Schema
export const WorkspacesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type WorkspacesGetOutput = typeof WorkspacesGetOutput.Type;

// The operation
/**
 * Returns details of the workspace.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serviceName - The name of Azure API Center service.
 * @param workspaceName - The name of the workspace.
 */
export const WorkspacesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WorkspacesGetInput,
  outputSchema: WorkspacesGetOutput,
}));
// Input Schema
export const WorkspacesListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  serviceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiCenter/services/{serviceName}/workspaces",
  }),
);
export type WorkspacesListInput = typeof WorkspacesListInput.Type;

// Output Schema
export const WorkspacesListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(Schema.Struct({})),
  nextLink: Schema.optional(Schema.String),
});
export type WorkspacesListOutput = typeof WorkspacesListOutput.Type;

// The operation
/**
 * Returns a collection of workspaces.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serviceName - The name of Azure API Center service.
 */
export const WorkspacesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WorkspacesListInput,
  outputSchema: WorkspacesListOutput,
}));
