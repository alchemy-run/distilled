/**
 * Azure Awsconnector API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const AccessAnalyzerAnalyzersCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/accessAnalyzerAnalyzers/{name}",
    }),
  );
export type AccessAnalyzerAnalyzersCreateOrReplaceInput =
  typeof AccessAnalyzerAnalyzersCreateOrReplaceInput.Type;

// Output Schema
export const AccessAnalyzerAnalyzersCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type AccessAnalyzerAnalyzersCreateOrReplaceOutput =
  typeof AccessAnalyzerAnalyzersCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a AccessAnalyzerAnalyzer. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of AccessAnalyzerAnalyzer
 */
export const AccessAnalyzerAnalyzersCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AccessAnalyzerAnalyzersCreateOrReplaceInput,
    outputSchema: AccessAnalyzerAnalyzersCreateOrReplaceOutput,
  }));
// Input Schema
export const AccessAnalyzerAnalyzersDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/accessAnalyzerAnalyzers/{name}",
    }),
  );
export type AccessAnalyzerAnalyzersDeleteInput =
  typeof AccessAnalyzerAnalyzersDeleteInput.Type;

// Output Schema
export const AccessAnalyzerAnalyzersDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AccessAnalyzerAnalyzersDeleteOutput =
  typeof AccessAnalyzerAnalyzersDeleteOutput.Type;

// The operation
/**
 * Delete a AccessAnalyzerAnalyzer
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of AccessAnalyzerAnalyzer
 */
export const AccessAnalyzerAnalyzersDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AccessAnalyzerAnalyzersDeleteInput,
    outputSchema: AccessAnalyzerAnalyzersDeleteOutput,
  }));
// Input Schema
export const AccessAnalyzerAnalyzersGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/accessAnalyzerAnalyzers/{name}",
    }),
  );
export type AccessAnalyzerAnalyzersGetInput =
  typeof AccessAnalyzerAnalyzersGetInput.Type;

// Output Schema
export const AccessAnalyzerAnalyzersGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type AccessAnalyzerAnalyzersGetOutput =
  typeof AccessAnalyzerAnalyzersGetOutput.Type;

// The operation
/**
 * Get a AccessAnalyzerAnalyzer
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of AccessAnalyzerAnalyzer
 */
export const AccessAnalyzerAnalyzersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AccessAnalyzerAnalyzersGetInput,
    outputSchema: AccessAnalyzerAnalyzersGetOutput,
  }),
);
// Input Schema
export const AccessAnalyzerAnalyzersListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/accessAnalyzerAnalyzers",
    }),
  );
export type AccessAnalyzerAnalyzersListByResourceGroupInput =
  typeof AccessAnalyzerAnalyzersListByResourceGroupInput.Type;

// Output Schema
export const AccessAnalyzerAnalyzersListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type AccessAnalyzerAnalyzersListByResourceGroupOutput =
  typeof AccessAnalyzerAnalyzersListByResourceGroupOutput.Type;

// The operation
/**
 * List AccessAnalyzerAnalyzer resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const AccessAnalyzerAnalyzersListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AccessAnalyzerAnalyzersListByResourceGroupInput,
    outputSchema: AccessAnalyzerAnalyzersListByResourceGroupOutput,
  }));
// Input Schema
export const AccessAnalyzerAnalyzersListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/accessAnalyzerAnalyzers",
    }),
  );
export type AccessAnalyzerAnalyzersListBySubscriptionInput =
  typeof AccessAnalyzerAnalyzersListBySubscriptionInput.Type;

// Output Schema
export const AccessAnalyzerAnalyzersListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type AccessAnalyzerAnalyzersListBySubscriptionOutput =
  typeof AccessAnalyzerAnalyzersListBySubscriptionOutput.Type;

// The operation
/**
 * List AccessAnalyzerAnalyzer resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const AccessAnalyzerAnalyzersListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AccessAnalyzerAnalyzersListBySubscriptionInput,
    outputSchema: AccessAnalyzerAnalyzersListBySubscriptionOutput,
  }));
// Input Schema
export const AccessAnalyzerAnalyzersUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/accessAnalyzerAnalyzers/{name}",
    }),
  );
export type AccessAnalyzerAnalyzersUpdateInput =
  typeof AccessAnalyzerAnalyzersUpdateInput.Type;

// Output Schema
export const AccessAnalyzerAnalyzersUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type AccessAnalyzerAnalyzersUpdateOutput =
  typeof AccessAnalyzerAnalyzersUpdateOutput.Type;

// The operation
/**
 * Update a AccessAnalyzerAnalyzer
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of AccessAnalyzerAnalyzer
 */
export const AccessAnalyzerAnalyzersUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AccessAnalyzerAnalyzersUpdateInput,
    outputSchema: AccessAnalyzerAnalyzersUpdateOutput,
  }));
// Input Schema
export const AcmCertificateSummariesCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/acmCertificateSummaries/{name}",
    }),
  );
export type AcmCertificateSummariesCreateOrReplaceInput =
  typeof AcmCertificateSummariesCreateOrReplaceInput.Type;

// Output Schema
export const AcmCertificateSummariesCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type AcmCertificateSummariesCreateOrReplaceOutput =
  typeof AcmCertificateSummariesCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a AcmCertificateSummary. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of AcmCertificateSummary
 */
export const AcmCertificateSummariesCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AcmCertificateSummariesCreateOrReplaceInput,
    outputSchema: AcmCertificateSummariesCreateOrReplaceOutput,
  }));
// Input Schema
export const AcmCertificateSummariesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/acmCertificateSummaries/{name}",
    }),
  );
export type AcmCertificateSummariesDeleteInput =
  typeof AcmCertificateSummariesDeleteInput.Type;

// Output Schema
export const AcmCertificateSummariesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AcmCertificateSummariesDeleteOutput =
  typeof AcmCertificateSummariesDeleteOutput.Type;

// The operation
/**
 * Delete a AcmCertificateSummary
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of AcmCertificateSummary
 */
export const AcmCertificateSummariesDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AcmCertificateSummariesDeleteInput,
    outputSchema: AcmCertificateSummariesDeleteOutput,
  }));
// Input Schema
export const AcmCertificateSummariesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/acmCertificateSummaries/{name}",
    }),
  );
export type AcmCertificateSummariesGetInput =
  typeof AcmCertificateSummariesGetInput.Type;

// Output Schema
export const AcmCertificateSummariesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type AcmCertificateSummariesGetOutput =
  typeof AcmCertificateSummariesGetOutput.Type;

// The operation
/**
 * Get a AcmCertificateSummary
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of AcmCertificateSummary
 */
export const AcmCertificateSummariesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AcmCertificateSummariesGetInput,
    outputSchema: AcmCertificateSummariesGetOutput,
  }),
);
// Input Schema
export const AcmCertificateSummariesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/acmCertificateSummaries",
    }),
  );
export type AcmCertificateSummariesListByResourceGroupInput =
  typeof AcmCertificateSummariesListByResourceGroupInput.Type;

// Output Schema
export const AcmCertificateSummariesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type AcmCertificateSummariesListByResourceGroupOutput =
  typeof AcmCertificateSummariesListByResourceGroupOutput.Type;

// The operation
/**
 * List AcmCertificateSummary resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const AcmCertificateSummariesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AcmCertificateSummariesListByResourceGroupInput,
    outputSchema: AcmCertificateSummariesListByResourceGroupOutput,
  }));
// Input Schema
export const AcmCertificateSummariesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/acmCertificateSummaries",
    }),
  );
export type AcmCertificateSummariesListBySubscriptionInput =
  typeof AcmCertificateSummariesListBySubscriptionInput.Type;

// Output Schema
export const AcmCertificateSummariesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type AcmCertificateSummariesListBySubscriptionOutput =
  typeof AcmCertificateSummariesListBySubscriptionOutput.Type;

// The operation
/**
 * List AcmCertificateSummary resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const AcmCertificateSummariesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AcmCertificateSummariesListBySubscriptionInput,
    outputSchema: AcmCertificateSummariesListBySubscriptionOutput,
  }));
// Input Schema
export const AcmCertificateSummariesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/acmCertificateSummaries/{name}",
    }),
  );
export type AcmCertificateSummariesUpdateInput =
  typeof AcmCertificateSummariesUpdateInput.Type;

// Output Schema
export const AcmCertificateSummariesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type AcmCertificateSummariesUpdateOutput =
  typeof AcmCertificateSummariesUpdateOutput.Type;

// The operation
/**
 * Update a AcmCertificateSummary
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of AcmCertificateSummary
 */
export const AcmCertificateSummariesUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AcmCertificateSummariesUpdateInput,
    outputSchema: AcmCertificateSummariesUpdateOutput,
  }));
// Input Schema
export const ApiGatewayRestApisCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/apiGatewayRestApis/{name}",
    }),
  );
export type ApiGatewayRestApisCreateOrReplaceInput =
  typeof ApiGatewayRestApisCreateOrReplaceInput.Type;

// Output Schema
export const ApiGatewayRestApisCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ApiGatewayRestApisCreateOrReplaceOutput =
  typeof ApiGatewayRestApisCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a ApiGatewayRestApi. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of ApiGatewayRestApi
 */
export const ApiGatewayRestApisCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ApiGatewayRestApisCreateOrReplaceInput,
    outputSchema: ApiGatewayRestApisCreateOrReplaceOutput,
  }));
// Input Schema
export const ApiGatewayRestApisDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/apiGatewayRestApis/{name}",
    }),
  );
export type ApiGatewayRestApisDeleteInput =
  typeof ApiGatewayRestApisDeleteInput.Type;

// Output Schema
export const ApiGatewayRestApisDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ApiGatewayRestApisDeleteOutput =
  typeof ApiGatewayRestApisDeleteOutput.Type;

// The operation
/**
 * Delete a ApiGatewayRestApi
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of ApiGatewayRestApi
 */
export const ApiGatewayRestApisDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ApiGatewayRestApisDeleteInput,
    outputSchema: ApiGatewayRestApisDeleteOutput,
  }),
);
// Input Schema
export const ApiGatewayRestApisGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/apiGatewayRestApis/{name}",
    }),
  );
export type ApiGatewayRestApisGetInput = typeof ApiGatewayRestApisGetInput.Type;

// Output Schema
export const ApiGatewayRestApisGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ApiGatewayRestApisGetOutput =
  typeof ApiGatewayRestApisGetOutput.Type;

// The operation
/**
 * Get a ApiGatewayRestApi
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of ApiGatewayRestApi
 */
export const ApiGatewayRestApisGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ApiGatewayRestApisGetInput,
    outputSchema: ApiGatewayRestApisGetOutput,
  }),
);
// Input Schema
export const ApiGatewayRestApisListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/apiGatewayRestApis",
    }),
  );
export type ApiGatewayRestApisListByResourceGroupInput =
  typeof ApiGatewayRestApisListByResourceGroupInput.Type;

// Output Schema
export const ApiGatewayRestApisListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ApiGatewayRestApisListByResourceGroupOutput =
  typeof ApiGatewayRestApisListByResourceGroupOutput.Type;

// The operation
/**
 * List ApiGatewayRestApi resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ApiGatewayRestApisListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ApiGatewayRestApisListByResourceGroupInput,
    outputSchema: ApiGatewayRestApisListByResourceGroupOutput,
  }));
// Input Schema
export const ApiGatewayRestApisListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/apiGatewayRestApis",
    }),
  );
export type ApiGatewayRestApisListBySubscriptionInput =
  typeof ApiGatewayRestApisListBySubscriptionInput.Type;

// Output Schema
export const ApiGatewayRestApisListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ApiGatewayRestApisListBySubscriptionOutput =
  typeof ApiGatewayRestApisListBySubscriptionOutput.Type;

// The operation
/**
 * List ApiGatewayRestApi resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const ApiGatewayRestApisListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ApiGatewayRestApisListBySubscriptionInput,
    outputSchema: ApiGatewayRestApisListBySubscriptionOutput,
  }));
// Input Schema
export const ApiGatewayRestApisUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/apiGatewayRestApis/{name}",
    }),
  );
export type ApiGatewayRestApisUpdateInput =
  typeof ApiGatewayRestApisUpdateInput.Type;

// Output Schema
export const ApiGatewayRestApisUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ApiGatewayRestApisUpdateOutput =
  typeof ApiGatewayRestApisUpdateOutput.Type;

// The operation
/**
 * Update a ApiGatewayRestApi
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of ApiGatewayRestApi
 */
export const ApiGatewayRestApisUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ApiGatewayRestApisUpdateInput,
    outputSchema: ApiGatewayRestApisUpdateOutput,
  }),
);
// Input Schema
export const ApiGatewayStagesCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/apiGatewayStages/{name}",
    }),
  );
export type ApiGatewayStagesCreateOrReplaceInput =
  typeof ApiGatewayStagesCreateOrReplaceInput.Type;

// Output Schema
export const ApiGatewayStagesCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ApiGatewayStagesCreateOrReplaceOutput =
  typeof ApiGatewayStagesCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a ApiGatewayStage. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of ApiGatewayStage
 */
export const ApiGatewayStagesCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ApiGatewayStagesCreateOrReplaceInput,
    outputSchema: ApiGatewayStagesCreateOrReplaceOutput,
  }));
// Input Schema
export const ApiGatewayStagesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/apiGatewayStages/{name}",
    }),
  );
export type ApiGatewayStagesDeleteInput =
  typeof ApiGatewayStagesDeleteInput.Type;

// Output Schema
export const ApiGatewayStagesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ApiGatewayStagesDeleteOutput =
  typeof ApiGatewayStagesDeleteOutput.Type;

// The operation
/**
 * Delete a ApiGatewayStage
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of ApiGatewayStage
 */
export const ApiGatewayStagesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ApiGatewayStagesDeleteInput,
    outputSchema: ApiGatewayStagesDeleteOutput,
  }),
);
// Input Schema
export const ApiGatewayStagesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/apiGatewayStages/{name}",
    }),
  );
export type ApiGatewayStagesGetInput = typeof ApiGatewayStagesGetInput.Type;

// Output Schema
export const ApiGatewayStagesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ApiGatewayStagesGetOutput = typeof ApiGatewayStagesGetOutput.Type;

// The operation
/**
 * Get a ApiGatewayStage
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of ApiGatewayStage
 */
export const ApiGatewayStagesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ApiGatewayStagesGetInput,
  outputSchema: ApiGatewayStagesGetOutput,
}));
// Input Schema
export const ApiGatewayStagesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/apiGatewayStages",
    }),
  );
export type ApiGatewayStagesListByResourceGroupInput =
  typeof ApiGatewayStagesListByResourceGroupInput.Type;

// Output Schema
export const ApiGatewayStagesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ApiGatewayStagesListByResourceGroupOutput =
  typeof ApiGatewayStagesListByResourceGroupOutput.Type;

// The operation
/**
 * List ApiGatewayStage resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ApiGatewayStagesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ApiGatewayStagesListByResourceGroupInput,
    outputSchema: ApiGatewayStagesListByResourceGroupOutput,
  }));
// Input Schema
export const ApiGatewayStagesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/apiGatewayStages",
    }),
  );
export type ApiGatewayStagesListBySubscriptionInput =
  typeof ApiGatewayStagesListBySubscriptionInput.Type;

// Output Schema
export const ApiGatewayStagesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ApiGatewayStagesListBySubscriptionOutput =
  typeof ApiGatewayStagesListBySubscriptionOutput.Type;

// The operation
/**
 * List ApiGatewayStage resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const ApiGatewayStagesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ApiGatewayStagesListBySubscriptionInput,
    outputSchema: ApiGatewayStagesListBySubscriptionOutput,
  }));
// Input Schema
export const ApiGatewayStagesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/apiGatewayStages/{name}",
    }),
  );
export type ApiGatewayStagesUpdateInput =
  typeof ApiGatewayStagesUpdateInput.Type;

// Output Schema
export const ApiGatewayStagesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ApiGatewayStagesUpdateOutput =
  typeof ApiGatewayStagesUpdateOutput.Type;

// The operation
/**
 * Update a ApiGatewayStage
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of ApiGatewayStage
 */
export const ApiGatewayStagesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ApiGatewayStagesUpdateInput,
    outputSchema: ApiGatewayStagesUpdateOutput,
  }),
);
// Input Schema
export const AppSyncGraphqlApisCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/appSyncGraphqlApis/{name}",
    }),
  );
export type AppSyncGraphqlApisCreateOrReplaceInput =
  typeof AppSyncGraphqlApisCreateOrReplaceInput.Type;

// Output Schema
export const AppSyncGraphqlApisCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type AppSyncGraphqlApisCreateOrReplaceOutput =
  typeof AppSyncGraphqlApisCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a AppSyncGraphqlApi. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of AppSyncGraphqlApi
 */
export const AppSyncGraphqlApisCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AppSyncGraphqlApisCreateOrReplaceInput,
    outputSchema: AppSyncGraphqlApisCreateOrReplaceOutput,
  }));
// Input Schema
export const AppSyncGraphqlApisDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/appSyncGraphqlApis/{name}",
    }),
  );
export type AppSyncGraphqlApisDeleteInput =
  typeof AppSyncGraphqlApisDeleteInput.Type;

// Output Schema
export const AppSyncGraphqlApisDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AppSyncGraphqlApisDeleteOutput =
  typeof AppSyncGraphqlApisDeleteOutput.Type;

// The operation
/**
 * Delete a AppSyncGraphqlApi
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of AppSyncGraphqlApi
 */
export const AppSyncGraphqlApisDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AppSyncGraphqlApisDeleteInput,
    outputSchema: AppSyncGraphqlApisDeleteOutput,
  }),
);
// Input Schema
export const AppSyncGraphqlApisGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/appSyncGraphqlApis/{name}",
    }),
  );
export type AppSyncGraphqlApisGetInput = typeof AppSyncGraphqlApisGetInput.Type;

// Output Schema
export const AppSyncGraphqlApisGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type AppSyncGraphqlApisGetOutput =
  typeof AppSyncGraphqlApisGetOutput.Type;

// The operation
/**
 * Get a AppSyncGraphqlApi
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of AppSyncGraphqlApi
 */
export const AppSyncGraphqlApisGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AppSyncGraphqlApisGetInput,
    outputSchema: AppSyncGraphqlApisGetOutput,
  }),
);
// Input Schema
export const AppSyncGraphqlApisListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/appSyncGraphqlApis",
    }),
  );
export type AppSyncGraphqlApisListByResourceGroupInput =
  typeof AppSyncGraphqlApisListByResourceGroupInput.Type;

// Output Schema
export const AppSyncGraphqlApisListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type AppSyncGraphqlApisListByResourceGroupOutput =
  typeof AppSyncGraphqlApisListByResourceGroupOutput.Type;

// The operation
/**
 * List AppSyncGraphqlApi resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const AppSyncGraphqlApisListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AppSyncGraphqlApisListByResourceGroupInput,
    outputSchema: AppSyncGraphqlApisListByResourceGroupOutput,
  }));
// Input Schema
export const AppSyncGraphqlApisListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/appSyncGraphqlApis",
    }),
  );
export type AppSyncGraphqlApisListBySubscriptionInput =
  typeof AppSyncGraphqlApisListBySubscriptionInput.Type;

// Output Schema
export const AppSyncGraphqlApisListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type AppSyncGraphqlApisListBySubscriptionOutput =
  typeof AppSyncGraphqlApisListBySubscriptionOutput.Type;

// The operation
/**
 * List AppSyncGraphqlApi resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const AppSyncGraphqlApisListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AppSyncGraphqlApisListBySubscriptionInput,
    outputSchema: AppSyncGraphqlApisListBySubscriptionOutput,
  }));
// Input Schema
export const AppSyncGraphqlApisUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/appSyncGraphqlApis/{name}",
    }),
  );
export type AppSyncGraphqlApisUpdateInput =
  typeof AppSyncGraphqlApisUpdateInput.Type;

// Output Schema
export const AppSyncGraphqlApisUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type AppSyncGraphqlApisUpdateOutput =
  typeof AppSyncGraphqlApisUpdateOutput.Type;

// The operation
/**
 * Update a AppSyncGraphqlApi
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of AppSyncGraphqlApi
 */
export const AppSyncGraphqlApisUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AppSyncGraphqlApisUpdateInput,
    outputSchema: AppSyncGraphqlApisUpdateOutput,
  }),
);
// Input Schema
export const AutoScalingAutoScalingGroupsCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/autoScalingAutoScalingGroups/{name}",
    }),
  );
export type AutoScalingAutoScalingGroupsCreateOrReplaceInput =
  typeof AutoScalingAutoScalingGroupsCreateOrReplaceInput.Type;

// Output Schema
export const AutoScalingAutoScalingGroupsCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type AutoScalingAutoScalingGroupsCreateOrReplaceOutput =
  typeof AutoScalingAutoScalingGroupsCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a AutoScalingAutoScalingGroup. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of AutoScalingAutoScalingGroup
 */
export const AutoScalingAutoScalingGroupsCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AutoScalingAutoScalingGroupsCreateOrReplaceInput,
    outputSchema: AutoScalingAutoScalingGroupsCreateOrReplaceOutput,
  }));
// Input Schema
export const AutoScalingAutoScalingGroupsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/autoScalingAutoScalingGroups/{name}",
    }),
  );
export type AutoScalingAutoScalingGroupsDeleteInput =
  typeof AutoScalingAutoScalingGroupsDeleteInput.Type;

// Output Schema
export const AutoScalingAutoScalingGroupsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AutoScalingAutoScalingGroupsDeleteOutput =
  typeof AutoScalingAutoScalingGroupsDeleteOutput.Type;

// The operation
/**
 * Delete a AutoScalingAutoScalingGroup
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of AutoScalingAutoScalingGroup
 */
export const AutoScalingAutoScalingGroupsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AutoScalingAutoScalingGroupsDeleteInput,
    outputSchema: AutoScalingAutoScalingGroupsDeleteOutput,
  }));
// Input Schema
export const AutoScalingAutoScalingGroupsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/autoScalingAutoScalingGroups/{name}",
    }),
  );
export type AutoScalingAutoScalingGroupsGetInput =
  typeof AutoScalingAutoScalingGroupsGetInput.Type;

// Output Schema
export const AutoScalingAutoScalingGroupsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type AutoScalingAutoScalingGroupsGetOutput =
  typeof AutoScalingAutoScalingGroupsGetOutput.Type;

// The operation
/**
 * Get a AutoScalingAutoScalingGroup
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of AutoScalingAutoScalingGroup
 */
export const AutoScalingAutoScalingGroupsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AutoScalingAutoScalingGroupsGetInput,
    outputSchema: AutoScalingAutoScalingGroupsGetOutput,
  }));
// Input Schema
export const AutoScalingAutoScalingGroupsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/autoScalingAutoScalingGroups",
    }),
  );
export type AutoScalingAutoScalingGroupsListByResourceGroupInput =
  typeof AutoScalingAutoScalingGroupsListByResourceGroupInput.Type;

// Output Schema
export const AutoScalingAutoScalingGroupsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type AutoScalingAutoScalingGroupsListByResourceGroupOutput =
  typeof AutoScalingAutoScalingGroupsListByResourceGroupOutput.Type;

// The operation
/**
 * List AutoScalingAutoScalingGroup resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const AutoScalingAutoScalingGroupsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AutoScalingAutoScalingGroupsListByResourceGroupInput,
    outputSchema: AutoScalingAutoScalingGroupsListByResourceGroupOutput,
  }));
// Input Schema
export const AutoScalingAutoScalingGroupsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/autoScalingAutoScalingGroups",
    }),
  );
export type AutoScalingAutoScalingGroupsListBySubscriptionInput =
  typeof AutoScalingAutoScalingGroupsListBySubscriptionInput.Type;

// Output Schema
export const AutoScalingAutoScalingGroupsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type AutoScalingAutoScalingGroupsListBySubscriptionOutput =
  typeof AutoScalingAutoScalingGroupsListBySubscriptionOutput.Type;

// The operation
/**
 * List AutoScalingAutoScalingGroup resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const AutoScalingAutoScalingGroupsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AutoScalingAutoScalingGroupsListBySubscriptionInput,
    outputSchema: AutoScalingAutoScalingGroupsListBySubscriptionOutput,
  }));
// Input Schema
export const AutoScalingAutoScalingGroupsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/autoScalingAutoScalingGroups/{name}",
    }),
  );
export type AutoScalingAutoScalingGroupsUpdateInput =
  typeof AutoScalingAutoScalingGroupsUpdateInput.Type;

// Output Schema
export const AutoScalingAutoScalingGroupsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type AutoScalingAutoScalingGroupsUpdateOutput =
  typeof AutoScalingAutoScalingGroupsUpdateOutput.Type;

// The operation
/**
 * Update a AutoScalingAutoScalingGroup
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of AutoScalingAutoScalingGroup
 */
export const AutoScalingAutoScalingGroupsUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AutoScalingAutoScalingGroupsUpdateInput,
    outputSchema: AutoScalingAutoScalingGroupsUpdateOutput,
  }));
// Input Schema
export const CloudFormationStacksCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/cloudFormationStacks/{name}",
    }),
  );
export type CloudFormationStacksCreateOrReplaceInput =
  typeof CloudFormationStacksCreateOrReplaceInput.Type;

// Output Schema
export const CloudFormationStacksCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type CloudFormationStacksCreateOrReplaceOutput =
  typeof CloudFormationStacksCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a CloudFormationStack. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of CloudFormationStack
 */
export const CloudFormationStacksCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CloudFormationStacksCreateOrReplaceInput,
    outputSchema: CloudFormationStacksCreateOrReplaceOutput,
  }));
// Input Schema
export const CloudFormationStacksDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/cloudFormationStacks/{name}",
    }),
  );
export type CloudFormationStacksDeleteInput =
  typeof CloudFormationStacksDeleteInput.Type;

// Output Schema
export const CloudFormationStacksDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CloudFormationStacksDeleteOutput =
  typeof CloudFormationStacksDeleteOutput.Type;

// The operation
/**
 * Delete a CloudFormationStack
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of CloudFormationStack
 */
export const CloudFormationStacksDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CloudFormationStacksDeleteInput,
    outputSchema: CloudFormationStacksDeleteOutput,
  }),
);
// Input Schema
export const CloudFormationStackSetsCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/cloudFormationStackSets/{name}",
    }),
  );
export type CloudFormationStackSetsCreateOrReplaceInput =
  typeof CloudFormationStackSetsCreateOrReplaceInput.Type;

// Output Schema
export const CloudFormationStackSetsCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type CloudFormationStackSetsCreateOrReplaceOutput =
  typeof CloudFormationStackSetsCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a CloudFormationStackSet. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of CloudFormationStackSet
 */
export const CloudFormationStackSetsCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CloudFormationStackSetsCreateOrReplaceInput,
    outputSchema: CloudFormationStackSetsCreateOrReplaceOutput,
  }));
// Input Schema
export const CloudFormationStackSetsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/cloudFormationStackSets/{name}",
    }),
  );
export type CloudFormationStackSetsDeleteInput =
  typeof CloudFormationStackSetsDeleteInput.Type;

// Output Schema
export const CloudFormationStackSetsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CloudFormationStackSetsDeleteOutput =
  typeof CloudFormationStackSetsDeleteOutput.Type;

// The operation
/**
 * Delete a CloudFormationStackSet
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of CloudFormationStackSet
 */
export const CloudFormationStackSetsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CloudFormationStackSetsDeleteInput,
    outputSchema: CloudFormationStackSetsDeleteOutput,
  }));
// Input Schema
export const CloudFormationStackSetsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/cloudFormationStackSets/{name}",
    }),
  );
export type CloudFormationStackSetsGetInput =
  typeof CloudFormationStackSetsGetInput.Type;

// Output Schema
export const CloudFormationStackSetsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type CloudFormationStackSetsGetOutput =
  typeof CloudFormationStackSetsGetOutput.Type;

// The operation
/**
 * Get a CloudFormationStackSet
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of CloudFormationStackSet
 */
export const CloudFormationStackSetsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CloudFormationStackSetsGetInput,
    outputSchema: CloudFormationStackSetsGetOutput,
  }),
);
// Input Schema
export const CloudFormationStackSetsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/cloudFormationStackSets",
    }),
  );
export type CloudFormationStackSetsListByResourceGroupInput =
  typeof CloudFormationStackSetsListByResourceGroupInput.Type;

// Output Schema
export const CloudFormationStackSetsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type CloudFormationStackSetsListByResourceGroupOutput =
  typeof CloudFormationStackSetsListByResourceGroupOutput.Type;

// The operation
/**
 * List CloudFormationStackSet resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const CloudFormationStackSetsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CloudFormationStackSetsListByResourceGroupInput,
    outputSchema: CloudFormationStackSetsListByResourceGroupOutput,
  }));
// Input Schema
export const CloudFormationStackSetsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/cloudFormationStackSets",
    }),
  );
export type CloudFormationStackSetsListBySubscriptionInput =
  typeof CloudFormationStackSetsListBySubscriptionInput.Type;

// Output Schema
export const CloudFormationStackSetsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type CloudFormationStackSetsListBySubscriptionOutput =
  typeof CloudFormationStackSetsListBySubscriptionOutput.Type;

// The operation
/**
 * List CloudFormationStackSet resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const CloudFormationStackSetsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CloudFormationStackSetsListBySubscriptionInput,
    outputSchema: CloudFormationStackSetsListBySubscriptionOutput,
  }));
// Input Schema
export const CloudFormationStackSetsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/cloudFormationStackSets/{name}",
    }),
  );
export type CloudFormationStackSetsUpdateInput =
  typeof CloudFormationStackSetsUpdateInput.Type;

// Output Schema
export const CloudFormationStackSetsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type CloudFormationStackSetsUpdateOutput =
  typeof CloudFormationStackSetsUpdateOutput.Type;

// The operation
/**
 * Update a CloudFormationStackSet
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of CloudFormationStackSet
 */
export const CloudFormationStackSetsUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CloudFormationStackSetsUpdateInput,
    outputSchema: CloudFormationStackSetsUpdateOutput,
  }));
// Input Schema
export const CloudFormationStacksGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/cloudFormationStacks/{name}",
    }),
  );
export type CloudFormationStacksGetInput =
  typeof CloudFormationStacksGetInput.Type;

// Output Schema
export const CloudFormationStacksGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type CloudFormationStacksGetOutput =
  typeof CloudFormationStacksGetOutput.Type;

// The operation
/**
 * Get a CloudFormationStack
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of CloudFormationStack
 */
export const CloudFormationStacksGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CloudFormationStacksGetInput,
    outputSchema: CloudFormationStacksGetOutput,
  }),
);
// Input Schema
export const CloudFormationStacksListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/cloudFormationStacks",
    }),
  );
export type CloudFormationStacksListByResourceGroupInput =
  typeof CloudFormationStacksListByResourceGroupInput.Type;

// Output Schema
export const CloudFormationStacksListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type CloudFormationStacksListByResourceGroupOutput =
  typeof CloudFormationStacksListByResourceGroupOutput.Type;

// The operation
/**
 * List CloudFormationStack resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const CloudFormationStacksListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CloudFormationStacksListByResourceGroupInput,
    outputSchema: CloudFormationStacksListByResourceGroupOutput,
  }));
// Input Schema
export const CloudFormationStacksListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/cloudFormationStacks",
    }),
  );
export type CloudFormationStacksListBySubscriptionInput =
  typeof CloudFormationStacksListBySubscriptionInput.Type;

// Output Schema
export const CloudFormationStacksListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type CloudFormationStacksListBySubscriptionOutput =
  typeof CloudFormationStacksListBySubscriptionOutput.Type;

// The operation
/**
 * List CloudFormationStack resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const CloudFormationStacksListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CloudFormationStacksListBySubscriptionInput,
    outputSchema: CloudFormationStacksListBySubscriptionOutput,
  }));
// Input Schema
export const CloudFormationStacksUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/cloudFormationStacks/{name}",
    }),
  );
export type CloudFormationStacksUpdateInput =
  typeof CloudFormationStacksUpdateInput.Type;

// Output Schema
export const CloudFormationStacksUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type CloudFormationStacksUpdateOutput =
  typeof CloudFormationStacksUpdateOutput.Type;

// The operation
/**
 * Update a CloudFormationStack
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of CloudFormationStack
 */
export const CloudFormationStacksUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CloudFormationStacksUpdateInput,
    outputSchema: CloudFormationStacksUpdateOutput,
  }),
);
// Input Schema
export const CloudFrontDistributionsCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/cloudFrontDistributions/{name}",
    }),
  );
export type CloudFrontDistributionsCreateOrReplaceInput =
  typeof CloudFrontDistributionsCreateOrReplaceInput.Type;

// Output Schema
export const CloudFrontDistributionsCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type CloudFrontDistributionsCreateOrReplaceOutput =
  typeof CloudFrontDistributionsCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a CloudFrontDistribution. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of CloudFrontDistribution
 */
export const CloudFrontDistributionsCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CloudFrontDistributionsCreateOrReplaceInput,
    outputSchema: CloudFrontDistributionsCreateOrReplaceOutput,
  }));
// Input Schema
export const CloudFrontDistributionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/cloudFrontDistributions/{name}",
    }),
  );
export type CloudFrontDistributionsDeleteInput =
  typeof CloudFrontDistributionsDeleteInput.Type;

// Output Schema
export const CloudFrontDistributionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CloudFrontDistributionsDeleteOutput =
  typeof CloudFrontDistributionsDeleteOutput.Type;

// The operation
/**
 * Delete a CloudFrontDistribution
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of CloudFrontDistribution
 */
export const CloudFrontDistributionsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CloudFrontDistributionsDeleteInput,
    outputSchema: CloudFrontDistributionsDeleteOutput,
  }));
// Input Schema
export const CloudFrontDistributionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/cloudFrontDistributions/{name}",
    }),
  );
export type CloudFrontDistributionsGetInput =
  typeof CloudFrontDistributionsGetInput.Type;

// Output Schema
export const CloudFrontDistributionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type CloudFrontDistributionsGetOutput =
  typeof CloudFrontDistributionsGetOutput.Type;

// The operation
/**
 * Get a CloudFrontDistribution
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of CloudFrontDistribution
 */
export const CloudFrontDistributionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CloudFrontDistributionsGetInput,
    outputSchema: CloudFrontDistributionsGetOutput,
  }),
);
// Input Schema
export const CloudFrontDistributionsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/cloudFrontDistributions",
    }),
  );
export type CloudFrontDistributionsListByResourceGroupInput =
  typeof CloudFrontDistributionsListByResourceGroupInput.Type;

// Output Schema
export const CloudFrontDistributionsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type CloudFrontDistributionsListByResourceGroupOutput =
  typeof CloudFrontDistributionsListByResourceGroupOutput.Type;

// The operation
/**
 * List CloudFrontDistribution resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const CloudFrontDistributionsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CloudFrontDistributionsListByResourceGroupInput,
    outputSchema: CloudFrontDistributionsListByResourceGroupOutput,
  }));
// Input Schema
export const CloudFrontDistributionsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/cloudFrontDistributions",
    }),
  );
export type CloudFrontDistributionsListBySubscriptionInput =
  typeof CloudFrontDistributionsListBySubscriptionInput.Type;

// Output Schema
export const CloudFrontDistributionsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type CloudFrontDistributionsListBySubscriptionOutput =
  typeof CloudFrontDistributionsListBySubscriptionOutput.Type;

// The operation
/**
 * List CloudFrontDistribution resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const CloudFrontDistributionsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CloudFrontDistributionsListBySubscriptionInput,
    outputSchema: CloudFrontDistributionsListBySubscriptionOutput,
  }));
// Input Schema
export const CloudFrontDistributionsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/cloudFrontDistributions/{name}",
    }),
  );
export type CloudFrontDistributionsUpdateInput =
  typeof CloudFrontDistributionsUpdateInput.Type;

// Output Schema
export const CloudFrontDistributionsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type CloudFrontDistributionsUpdateOutput =
  typeof CloudFrontDistributionsUpdateOutput.Type;

// The operation
/**
 * Update a CloudFrontDistribution
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of CloudFrontDistribution
 */
export const CloudFrontDistributionsUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CloudFrontDistributionsUpdateInput,
    outputSchema: CloudFrontDistributionsUpdateOutput,
  }));
// Input Schema
export const CloudTrailTrailsCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/cloudTrailTrails/{name}",
    }),
  );
export type CloudTrailTrailsCreateOrReplaceInput =
  typeof CloudTrailTrailsCreateOrReplaceInput.Type;

// Output Schema
export const CloudTrailTrailsCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type CloudTrailTrailsCreateOrReplaceOutput =
  typeof CloudTrailTrailsCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a CloudTrailTrail. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of CloudTrailTrail
 */
export const CloudTrailTrailsCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CloudTrailTrailsCreateOrReplaceInput,
    outputSchema: CloudTrailTrailsCreateOrReplaceOutput,
  }));
// Input Schema
export const CloudTrailTrailsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/cloudTrailTrails/{name}",
    }),
  );
export type CloudTrailTrailsDeleteInput =
  typeof CloudTrailTrailsDeleteInput.Type;

// Output Schema
export const CloudTrailTrailsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CloudTrailTrailsDeleteOutput =
  typeof CloudTrailTrailsDeleteOutput.Type;

// The operation
/**
 * Delete a CloudTrailTrail
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of CloudTrailTrail
 */
export const CloudTrailTrailsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CloudTrailTrailsDeleteInput,
    outputSchema: CloudTrailTrailsDeleteOutput,
  }),
);
// Input Schema
export const CloudTrailTrailsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/cloudTrailTrails/{name}",
    }),
  );
export type CloudTrailTrailsGetInput = typeof CloudTrailTrailsGetInput.Type;

// Output Schema
export const CloudTrailTrailsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type CloudTrailTrailsGetOutput = typeof CloudTrailTrailsGetOutput.Type;

// The operation
/**
 * Get a CloudTrailTrail
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of CloudTrailTrail
 */
export const CloudTrailTrailsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CloudTrailTrailsGetInput,
  outputSchema: CloudTrailTrailsGetOutput,
}));
// Input Schema
export const CloudTrailTrailsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/cloudTrailTrails",
    }),
  );
export type CloudTrailTrailsListByResourceGroupInput =
  typeof CloudTrailTrailsListByResourceGroupInput.Type;

// Output Schema
export const CloudTrailTrailsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type CloudTrailTrailsListByResourceGroupOutput =
  typeof CloudTrailTrailsListByResourceGroupOutput.Type;

// The operation
/**
 * List CloudTrailTrail resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const CloudTrailTrailsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CloudTrailTrailsListByResourceGroupInput,
    outputSchema: CloudTrailTrailsListByResourceGroupOutput,
  }));
// Input Schema
export const CloudTrailTrailsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/cloudTrailTrails",
    }),
  );
export type CloudTrailTrailsListBySubscriptionInput =
  typeof CloudTrailTrailsListBySubscriptionInput.Type;

// Output Schema
export const CloudTrailTrailsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type CloudTrailTrailsListBySubscriptionOutput =
  typeof CloudTrailTrailsListBySubscriptionOutput.Type;

// The operation
/**
 * List CloudTrailTrail resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const CloudTrailTrailsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CloudTrailTrailsListBySubscriptionInput,
    outputSchema: CloudTrailTrailsListBySubscriptionOutput,
  }));
// Input Schema
export const CloudTrailTrailsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/cloudTrailTrails/{name}",
    }),
  );
export type CloudTrailTrailsUpdateInput =
  typeof CloudTrailTrailsUpdateInput.Type;

// Output Schema
export const CloudTrailTrailsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type CloudTrailTrailsUpdateOutput =
  typeof CloudTrailTrailsUpdateOutput.Type;

// The operation
/**
 * Update a CloudTrailTrail
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of CloudTrailTrail
 */
export const CloudTrailTrailsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CloudTrailTrailsUpdateInput,
    outputSchema: CloudTrailTrailsUpdateOutput,
  }),
);
// Input Schema
export const CloudWatchAlarmsCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/cloudWatchAlarms/{name}",
    }),
  );
export type CloudWatchAlarmsCreateOrReplaceInput =
  typeof CloudWatchAlarmsCreateOrReplaceInput.Type;

// Output Schema
export const CloudWatchAlarmsCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type CloudWatchAlarmsCreateOrReplaceOutput =
  typeof CloudWatchAlarmsCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a CloudWatchAlarm. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of CloudWatchAlarm
 */
export const CloudWatchAlarmsCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CloudWatchAlarmsCreateOrReplaceInput,
    outputSchema: CloudWatchAlarmsCreateOrReplaceOutput,
  }));
// Input Schema
export const CloudWatchAlarmsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/cloudWatchAlarms/{name}",
    }),
  );
export type CloudWatchAlarmsDeleteInput =
  typeof CloudWatchAlarmsDeleteInput.Type;

// Output Schema
export const CloudWatchAlarmsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CloudWatchAlarmsDeleteOutput =
  typeof CloudWatchAlarmsDeleteOutput.Type;

// The operation
/**
 * Delete a CloudWatchAlarm
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of CloudWatchAlarm
 */
export const CloudWatchAlarmsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CloudWatchAlarmsDeleteInput,
    outputSchema: CloudWatchAlarmsDeleteOutput,
  }),
);
// Input Schema
export const CloudWatchAlarmsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/cloudWatchAlarms/{name}",
    }),
  );
export type CloudWatchAlarmsGetInput = typeof CloudWatchAlarmsGetInput.Type;

// Output Schema
export const CloudWatchAlarmsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type CloudWatchAlarmsGetOutput = typeof CloudWatchAlarmsGetOutput.Type;

// The operation
/**
 * Get a CloudWatchAlarm
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of CloudWatchAlarm
 */
export const CloudWatchAlarmsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CloudWatchAlarmsGetInput,
  outputSchema: CloudWatchAlarmsGetOutput,
}));
// Input Schema
export const CloudWatchAlarmsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/cloudWatchAlarms",
    }),
  );
export type CloudWatchAlarmsListByResourceGroupInput =
  typeof CloudWatchAlarmsListByResourceGroupInput.Type;

// Output Schema
export const CloudWatchAlarmsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type CloudWatchAlarmsListByResourceGroupOutput =
  typeof CloudWatchAlarmsListByResourceGroupOutput.Type;

// The operation
/**
 * List CloudWatchAlarm resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const CloudWatchAlarmsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CloudWatchAlarmsListByResourceGroupInput,
    outputSchema: CloudWatchAlarmsListByResourceGroupOutput,
  }));
// Input Schema
export const CloudWatchAlarmsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/cloudWatchAlarms",
    }),
  );
export type CloudWatchAlarmsListBySubscriptionInput =
  typeof CloudWatchAlarmsListBySubscriptionInput.Type;

// Output Schema
export const CloudWatchAlarmsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type CloudWatchAlarmsListBySubscriptionOutput =
  typeof CloudWatchAlarmsListBySubscriptionOutput.Type;

// The operation
/**
 * List CloudWatchAlarm resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const CloudWatchAlarmsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CloudWatchAlarmsListBySubscriptionInput,
    outputSchema: CloudWatchAlarmsListBySubscriptionOutput,
  }));
// Input Schema
export const CloudWatchAlarmsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/cloudWatchAlarms/{name}",
    }),
  );
export type CloudWatchAlarmsUpdateInput =
  typeof CloudWatchAlarmsUpdateInput.Type;

// Output Schema
export const CloudWatchAlarmsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type CloudWatchAlarmsUpdateOutput =
  typeof CloudWatchAlarmsUpdateOutput.Type;

// The operation
/**
 * Update a CloudWatchAlarm
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of CloudWatchAlarm
 */
export const CloudWatchAlarmsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CloudWatchAlarmsUpdateInput,
    outputSchema: CloudWatchAlarmsUpdateOutput,
  }),
);
// Input Schema
export const CodeBuildProjectsCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/codeBuildProjects/{name}",
    }),
  );
export type CodeBuildProjectsCreateOrReplaceInput =
  typeof CodeBuildProjectsCreateOrReplaceInput.Type;

// Output Schema
export const CodeBuildProjectsCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type CodeBuildProjectsCreateOrReplaceOutput =
  typeof CodeBuildProjectsCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a CodeBuildProject. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of CodeBuildProject
 */
export const CodeBuildProjectsCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CodeBuildProjectsCreateOrReplaceInput,
    outputSchema: CodeBuildProjectsCreateOrReplaceOutput,
  }));
// Input Schema
export const CodeBuildProjectsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/codeBuildProjects/{name}",
    }),
  );
export type CodeBuildProjectsDeleteInput =
  typeof CodeBuildProjectsDeleteInput.Type;

// Output Schema
export const CodeBuildProjectsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CodeBuildProjectsDeleteOutput =
  typeof CodeBuildProjectsDeleteOutput.Type;

// The operation
/**
 * Delete a CodeBuildProject
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of CodeBuildProject
 */
export const CodeBuildProjectsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CodeBuildProjectsDeleteInput,
    outputSchema: CodeBuildProjectsDeleteOutput,
  }),
);
// Input Schema
export const CodeBuildProjectsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/codeBuildProjects/{name}",
    }),
  );
export type CodeBuildProjectsGetInput = typeof CodeBuildProjectsGetInput.Type;

// Output Schema
export const CodeBuildProjectsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type CodeBuildProjectsGetOutput = typeof CodeBuildProjectsGetOutput.Type;

// The operation
/**
 * Get a CodeBuildProject
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of CodeBuildProject
 */
export const CodeBuildProjectsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CodeBuildProjectsGetInput,
    outputSchema: CodeBuildProjectsGetOutput,
  }),
);
// Input Schema
export const CodeBuildProjectsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/codeBuildProjects",
    }),
  );
export type CodeBuildProjectsListByResourceGroupInput =
  typeof CodeBuildProjectsListByResourceGroupInput.Type;

// Output Schema
export const CodeBuildProjectsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type CodeBuildProjectsListByResourceGroupOutput =
  typeof CodeBuildProjectsListByResourceGroupOutput.Type;

// The operation
/**
 * List CodeBuildProject resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const CodeBuildProjectsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CodeBuildProjectsListByResourceGroupInput,
    outputSchema: CodeBuildProjectsListByResourceGroupOutput,
  }));
// Input Schema
export const CodeBuildProjectsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/codeBuildProjects",
    }),
  );
export type CodeBuildProjectsListBySubscriptionInput =
  typeof CodeBuildProjectsListBySubscriptionInput.Type;

// Output Schema
export const CodeBuildProjectsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type CodeBuildProjectsListBySubscriptionOutput =
  typeof CodeBuildProjectsListBySubscriptionOutput.Type;

// The operation
/**
 * List CodeBuildProject resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const CodeBuildProjectsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CodeBuildProjectsListBySubscriptionInput,
    outputSchema: CodeBuildProjectsListBySubscriptionOutput,
  }));
// Input Schema
export const CodeBuildProjectsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/codeBuildProjects/{name}",
    }),
  );
export type CodeBuildProjectsUpdateInput =
  typeof CodeBuildProjectsUpdateInput.Type;

// Output Schema
export const CodeBuildProjectsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type CodeBuildProjectsUpdateOutput =
  typeof CodeBuildProjectsUpdateOutput.Type;

// The operation
/**
 * Update a CodeBuildProject
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of CodeBuildProject
 */
export const CodeBuildProjectsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CodeBuildProjectsUpdateInput,
    outputSchema: CodeBuildProjectsUpdateOutput,
  }),
);
// Input Schema
export const CodeBuildSourceCredentialsInfosCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/codeBuildSourceCredentialsInfos/{name}",
    }),
  );
export type CodeBuildSourceCredentialsInfosCreateOrReplaceInput =
  typeof CodeBuildSourceCredentialsInfosCreateOrReplaceInput.Type;

// Output Schema
export const CodeBuildSourceCredentialsInfosCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type CodeBuildSourceCredentialsInfosCreateOrReplaceOutput =
  typeof CodeBuildSourceCredentialsInfosCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a CodeBuildSourceCredentialsInfo. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of CodeBuildSourceCredentialsInfo
 */
export const CodeBuildSourceCredentialsInfosCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CodeBuildSourceCredentialsInfosCreateOrReplaceInput,
    outputSchema: CodeBuildSourceCredentialsInfosCreateOrReplaceOutput,
  }));
// Input Schema
export const CodeBuildSourceCredentialsInfosDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/codeBuildSourceCredentialsInfos/{name}",
    }),
  );
export type CodeBuildSourceCredentialsInfosDeleteInput =
  typeof CodeBuildSourceCredentialsInfosDeleteInput.Type;

// Output Schema
export const CodeBuildSourceCredentialsInfosDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CodeBuildSourceCredentialsInfosDeleteOutput =
  typeof CodeBuildSourceCredentialsInfosDeleteOutput.Type;

// The operation
/**
 * Delete a CodeBuildSourceCredentialsInfo
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of CodeBuildSourceCredentialsInfo
 */
export const CodeBuildSourceCredentialsInfosDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CodeBuildSourceCredentialsInfosDeleteInput,
    outputSchema: CodeBuildSourceCredentialsInfosDeleteOutput,
  }));
// Input Schema
export const CodeBuildSourceCredentialsInfosGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/codeBuildSourceCredentialsInfos/{name}",
    }),
  );
export type CodeBuildSourceCredentialsInfosGetInput =
  typeof CodeBuildSourceCredentialsInfosGetInput.Type;

// Output Schema
export const CodeBuildSourceCredentialsInfosGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type CodeBuildSourceCredentialsInfosGetOutput =
  typeof CodeBuildSourceCredentialsInfosGetOutput.Type;

// The operation
/**
 * Get a CodeBuildSourceCredentialsInfo
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of CodeBuildSourceCredentialsInfo
 */
export const CodeBuildSourceCredentialsInfosGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CodeBuildSourceCredentialsInfosGetInput,
    outputSchema: CodeBuildSourceCredentialsInfosGetOutput,
  }));
// Input Schema
export const CodeBuildSourceCredentialsInfosListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/codeBuildSourceCredentialsInfos",
    }),
  );
export type CodeBuildSourceCredentialsInfosListByResourceGroupInput =
  typeof CodeBuildSourceCredentialsInfosListByResourceGroupInput.Type;

// Output Schema
export const CodeBuildSourceCredentialsInfosListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type CodeBuildSourceCredentialsInfosListByResourceGroupOutput =
  typeof CodeBuildSourceCredentialsInfosListByResourceGroupOutput.Type;

// The operation
/**
 * List CodeBuildSourceCredentialsInfo resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const CodeBuildSourceCredentialsInfosListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CodeBuildSourceCredentialsInfosListByResourceGroupInput,
    outputSchema: CodeBuildSourceCredentialsInfosListByResourceGroupOutput,
  }));
// Input Schema
export const CodeBuildSourceCredentialsInfosListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/codeBuildSourceCredentialsInfos",
    }),
  );
export type CodeBuildSourceCredentialsInfosListBySubscriptionInput =
  typeof CodeBuildSourceCredentialsInfosListBySubscriptionInput.Type;

// Output Schema
export const CodeBuildSourceCredentialsInfosListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type CodeBuildSourceCredentialsInfosListBySubscriptionOutput =
  typeof CodeBuildSourceCredentialsInfosListBySubscriptionOutput.Type;

// The operation
/**
 * List CodeBuildSourceCredentialsInfo resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const CodeBuildSourceCredentialsInfosListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CodeBuildSourceCredentialsInfosListBySubscriptionInput,
    outputSchema: CodeBuildSourceCredentialsInfosListBySubscriptionOutput,
  }));
// Input Schema
export const CodeBuildSourceCredentialsInfosUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/codeBuildSourceCredentialsInfos/{name}",
    }),
  );
export type CodeBuildSourceCredentialsInfosUpdateInput =
  typeof CodeBuildSourceCredentialsInfosUpdateInput.Type;

// Output Schema
export const CodeBuildSourceCredentialsInfosUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type CodeBuildSourceCredentialsInfosUpdateOutput =
  typeof CodeBuildSourceCredentialsInfosUpdateOutput.Type;

// The operation
/**
 * Update a CodeBuildSourceCredentialsInfo
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of CodeBuildSourceCredentialsInfo
 */
export const CodeBuildSourceCredentialsInfosUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CodeBuildSourceCredentialsInfosUpdateInput,
    outputSchema: CodeBuildSourceCredentialsInfosUpdateOutput,
  }));
// Input Schema
export const ConfigServiceConfigurationRecordersCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/configServiceConfigurationRecorders/{name}",
    }),
  );
export type ConfigServiceConfigurationRecordersCreateOrReplaceInput =
  typeof ConfigServiceConfigurationRecordersCreateOrReplaceInput.Type;

// Output Schema
export const ConfigServiceConfigurationRecordersCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ConfigServiceConfigurationRecordersCreateOrReplaceOutput =
  typeof ConfigServiceConfigurationRecordersCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a ConfigServiceConfigurationRecorder. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of ConfigServiceConfigurationRecorder
 */
export const ConfigServiceConfigurationRecordersCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigServiceConfigurationRecordersCreateOrReplaceInput,
    outputSchema: ConfigServiceConfigurationRecordersCreateOrReplaceOutput,
  }));
// Input Schema
export const ConfigServiceConfigurationRecordersDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/configServiceConfigurationRecorders/{name}",
    }),
  );
export type ConfigServiceConfigurationRecordersDeleteInput =
  typeof ConfigServiceConfigurationRecordersDeleteInput.Type;

// Output Schema
export const ConfigServiceConfigurationRecordersDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ConfigServiceConfigurationRecordersDeleteOutput =
  typeof ConfigServiceConfigurationRecordersDeleteOutput.Type;

// The operation
/**
 * Delete a ConfigServiceConfigurationRecorder
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of ConfigServiceConfigurationRecorder
 */
export const ConfigServiceConfigurationRecordersDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigServiceConfigurationRecordersDeleteInput,
    outputSchema: ConfigServiceConfigurationRecordersDeleteOutput,
  }));
// Input Schema
export const ConfigServiceConfigurationRecordersGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/configServiceConfigurationRecorders/{name}",
    }),
  );
export type ConfigServiceConfigurationRecordersGetInput =
  typeof ConfigServiceConfigurationRecordersGetInput.Type;

// Output Schema
export const ConfigServiceConfigurationRecordersGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ConfigServiceConfigurationRecordersGetOutput =
  typeof ConfigServiceConfigurationRecordersGetOutput.Type;

// The operation
/**
 * Get a ConfigServiceConfigurationRecorder
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of ConfigServiceConfigurationRecorder
 */
export const ConfigServiceConfigurationRecordersGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigServiceConfigurationRecordersGetInput,
    outputSchema: ConfigServiceConfigurationRecordersGetOutput,
  }));
// Input Schema
export const ConfigServiceConfigurationRecordersListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/configServiceConfigurationRecorders",
    }),
  );
export type ConfigServiceConfigurationRecordersListByResourceGroupInput =
  typeof ConfigServiceConfigurationRecordersListByResourceGroupInput.Type;

// Output Schema
export const ConfigServiceConfigurationRecordersListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ConfigServiceConfigurationRecordersListByResourceGroupOutput =
  typeof ConfigServiceConfigurationRecordersListByResourceGroupOutput.Type;

// The operation
/**
 * List ConfigServiceConfigurationRecorder resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ConfigServiceConfigurationRecordersListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigServiceConfigurationRecordersListByResourceGroupInput,
    outputSchema: ConfigServiceConfigurationRecordersListByResourceGroupOutput,
  }));
// Input Schema
export const ConfigServiceConfigurationRecordersListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/configServiceConfigurationRecorders",
    }),
  );
export type ConfigServiceConfigurationRecordersListBySubscriptionInput =
  typeof ConfigServiceConfigurationRecordersListBySubscriptionInput.Type;

// Output Schema
export const ConfigServiceConfigurationRecordersListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ConfigServiceConfigurationRecordersListBySubscriptionOutput =
  typeof ConfigServiceConfigurationRecordersListBySubscriptionOutput.Type;

// The operation
/**
 * List ConfigServiceConfigurationRecorder resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const ConfigServiceConfigurationRecordersListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigServiceConfigurationRecordersListBySubscriptionInput,
    outputSchema: ConfigServiceConfigurationRecordersListBySubscriptionOutput,
  }));
// Input Schema
export const ConfigServiceConfigurationRecorderStatusesCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/configServiceConfigurationRecorderStatuses/{name}",
    }),
  );
export type ConfigServiceConfigurationRecorderStatusesCreateOrReplaceInput =
  typeof ConfigServiceConfigurationRecorderStatusesCreateOrReplaceInput.Type;

// Output Schema
export const ConfigServiceConfigurationRecorderStatusesCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ConfigServiceConfigurationRecorderStatusesCreateOrReplaceOutput =
  typeof ConfigServiceConfigurationRecorderStatusesCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a ConfigServiceConfigurationRecorderStatus. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of ConfigServiceConfigurationRecorderStatus
 */
export const ConfigServiceConfigurationRecorderStatusesCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigServiceConfigurationRecorderStatusesCreateOrReplaceInput,
    outputSchema:
      ConfigServiceConfigurationRecorderStatusesCreateOrReplaceOutput,
  }));
// Input Schema
export const ConfigServiceConfigurationRecorderStatusesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/configServiceConfigurationRecorderStatuses/{name}",
    }),
  );
export type ConfigServiceConfigurationRecorderStatusesDeleteInput =
  typeof ConfigServiceConfigurationRecorderStatusesDeleteInput.Type;

// Output Schema
export const ConfigServiceConfigurationRecorderStatusesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ConfigServiceConfigurationRecorderStatusesDeleteOutput =
  typeof ConfigServiceConfigurationRecorderStatusesDeleteOutput.Type;

// The operation
/**
 * Delete a ConfigServiceConfigurationRecorderStatus
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of ConfigServiceConfigurationRecorderStatus
 */
export const ConfigServiceConfigurationRecorderStatusesDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigServiceConfigurationRecorderStatusesDeleteInput,
    outputSchema: ConfigServiceConfigurationRecorderStatusesDeleteOutput,
  }));
// Input Schema
export const ConfigServiceConfigurationRecorderStatusesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/configServiceConfigurationRecorderStatuses/{name}",
    }),
  );
export type ConfigServiceConfigurationRecorderStatusesGetInput =
  typeof ConfigServiceConfigurationRecorderStatusesGetInput.Type;

// Output Schema
export const ConfigServiceConfigurationRecorderStatusesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ConfigServiceConfigurationRecorderStatusesGetOutput =
  typeof ConfigServiceConfigurationRecorderStatusesGetOutput.Type;

// The operation
/**
 * Get a ConfigServiceConfigurationRecorderStatus
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of ConfigServiceConfigurationRecorderStatus
 */
export const ConfigServiceConfigurationRecorderStatusesGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigServiceConfigurationRecorderStatusesGetInput,
    outputSchema: ConfigServiceConfigurationRecorderStatusesGetOutput,
  }));
// Input Schema
export const ConfigServiceConfigurationRecorderStatusesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/configServiceConfigurationRecorderStatuses",
    }),
  );
export type ConfigServiceConfigurationRecorderStatusesListByResourceGroupInput =
  typeof ConfigServiceConfigurationRecorderStatusesListByResourceGroupInput.Type;

// Output Schema
export const ConfigServiceConfigurationRecorderStatusesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ConfigServiceConfigurationRecorderStatusesListByResourceGroupOutput =
  typeof ConfigServiceConfigurationRecorderStatusesListByResourceGroupOutput.Type;

// The operation
/**
 * List ConfigServiceConfigurationRecorderStatus resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ConfigServiceConfigurationRecorderStatusesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      ConfigServiceConfigurationRecorderStatusesListByResourceGroupInput,
    outputSchema:
      ConfigServiceConfigurationRecorderStatusesListByResourceGroupOutput,
  }));
// Input Schema
export const ConfigServiceConfigurationRecorderStatusesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/configServiceConfigurationRecorderStatuses",
    }),
  );
export type ConfigServiceConfigurationRecorderStatusesListBySubscriptionInput =
  typeof ConfigServiceConfigurationRecorderStatusesListBySubscriptionInput.Type;

// Output Schema
export const ConfigServiceConfigurationRecorderStatusesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ConfigServiceConfigurationRecorderStatusesListBySubscriptionOutput =
  typeof ConfigServiceConfigurationRecorderStatusesListBySubscriptionOutput.Type;

// The operation
/**
 * List ConfigServiceConfigurationRecorderStatus resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const ConfigServiceConfigurationRecorderStatusesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      ConfigServiceConfigurationRecorderStatusesListBySubscriptionInput,
    outputSchema:
      ConfigServiceConfigurationRecorderStatusesListBySubscriptionOutput,
  }));
// Input Schema
export const ConfigServiceConfigurationRecorderStatusesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/configServiceConfigurationRecorderStatuses/{name}",
    }),
  );
export type ConfigServiceConfigurationRecorderStatusesUpdateInput =
  typeof ConfigServiceConfigurationRecorderStatusesUpdateInput.Type;

// Output Schema
export const ConfigServiceConfigurationRecorderStatusesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ConfigServiceConfigurationRecorderStatusesUpdateOutput =
  typeof ConfigServiceConfigurationRecorderStatusesUpdateOutput.Type;

// The operation
/**
 * Update a ConfigServiceConfigurationRecorderStatus
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of ConfigServiceConfigurationRecorderStatus
 */
export const ConfigServiceConfigurationRecorderStatusesUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigServiceConfigurationRecorderStatusesUpdateInput,
    outputSchema: ConfigServiceConfigurationRecorderStatusesUpdateOutput,
  }));
// Input Schema
export const ConfigServiceConfigurationRecordersUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/configServiceConfigurationRecorders/{name}",
    }),
  );
export type ConfigServiceConfigurationRecordersUpdateInput =
  typeof ConfigServiceConfigurationRecordersUpdateInput.Type;

// Output Schema
export const ConfigServiceConfigurationRecordersUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ConfigServiceConfigurationRecordersUpdateOutput =
  typeof ConfigServiceConfigurationRecordersUpdateOutput.Type;

// The operation
/**
 * Update a ConfigServiceConfigurationRecorder
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of ConfigServiceConfigurationRecorder
 */
export const ConfigServiceConfigurationRecordersUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigServiceConfigurationRecordersUpdateInput,
    outputSchema: ConfigServiceConfigurationRecordersUpdateOutput,
  }));
// Input Schema
export const ConfigServiceDeliveryChannelsCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/configServiceDeliveryChannels/{name}",
    }),
  );
export type ConfigServiceDeliveryChannelsCreateOrReplaceInput =
  typeof ConfigServiceDeliveryChannelsCreateOrReplaceInput.Type;

// Output Schema
export const ConfigServiceDeliveryChannelsCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ConfigServiceDeliveryChannelsCreateOrReplaceOutput =
  typeof ConfigServiceDeliveryChannelsCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a ConfigServiceDeliveryChannel. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of ConfigServiceDeliveryChannel
 */
export const ConfigServiceDeliveryChannelsCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigServiceDeliveryChannelsCreateOrReplaceInput,
    outputSchema: ConfigServiceDeliveryChannelsCreateOrReplaceOutput,
  }));
// Input Schema
export const ConfigServiceDeliveryChannelsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/configServiceDeliveryChannels/{name}",
    }),
  );
export type ConfigServiceDeliveryChannelsDeleteInput =
  typeof ConfigServiceDeliveryChannelsDeleteInput.Type;

// Output Schema
export const ConfigServiceDeliveryChannelsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ConfigServiceDeliveryChannelsDeleteOutput =
  typeof ConfigServiceDeliveryChannelsDeleteOutput.Type;

// The operation
/**
 * Delete a ConfigServiceDeliveryChannel
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of ConfigServiceDeliveryChannel
 */
export const ConfigServiceDeliveryChannelsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigServiceDeliveryChannelsDeleteInput,
    outputSchema: ConfigServiceDeliveryChannelsDeleteOutput,
  }));
// Input Schema
export const ConfigServiceDeliveryChannelsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/configServiceDeliveryChannels/{name}",
    }),
  );
export type ConfigServiceDeliveryChannelsGetInput =
  typeof ConfigServiceDeliveryChannelsGetInput.Type;

// Output Schema
export const ConfigServiceDeliveryChannelsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ConfigServiceDeliveryChannelsGetOutput =
  typeof ConfigServiceDeliveryChannelsGetOutput.Type;

// The operation
/**
 * Get a ConfigServiceDeliveryChannel
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of ConfigServiceDeliveryChannel
 */
export const ConfigServiceDeliveryChannelsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigServiceDeliveryChannelsGetInput,
    outputSchema: ConfigServiceDeliveryChannelsGetOutput,
  }));
// Input Schema
export const ConfigServiceDeliveryChannelsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/configServiceDeliveryChannels",
    }),
  );
export type ConfigServiceDeliveryChannelsListByResourceGroupInput =
  typeof ConfigServiceDeliveryChannelsListByResourceGroupInput.Type;

// Output Schema
export const ConfigServiceDeliveryChannelsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ConfigServiceDeliveryChannelsListByResourceGroupOutput =
  typeof ConfigServiceDeliveryChannelsListByResourceGroupOutput.Type;

// The operation
/**
 * List ConfigServiceDeliveryChannel resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ConfigServiceDeliveryChannelsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigServiceDeliveryChannelsListByResourceGroupInput,
    outputSchema: ConfigServiceDeliveryChannelsListByResourceGroupOutput,
  }));
// Input Schema
export const ConfigServiceDeliveryChannelsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/configServiceDeliveryChannels",
    }),
  );
export type ConfigServiceDeliveryChannelsListBySubscriptionInput =
  typeof ConfigServiceDeliveryChannelsListBySubscriptionInput.Type;

// Output Schema
export const ConfigServiceDeliveryChannelsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ConfigServiceDeliveryChannelsListBySubscriptionOutput =
  typeof ConfigServiceDeliveryChannelsListBySubscriptionOutput.Type;

// The operation
/**
 * List ConfigServiceDeliveryChannel resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const ConfigServiceDeliveryChannelsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigServiceDeliveryChannelsListBySubscriptionInput,
    outputSchema: ConfigServiceDeliveryChannelsListBySubscriptionOutput,
  }));
// Input Schema
export const ConfigServiceDeliveryChannelsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/configServiceDeliveryChannels/{name}",
    }),
  );
export type ConfigServiceDeliveryChannelsUpdateInput =
  typeof ConfigServiceDeliveryChannelsUpdateInput.Type;

// Output Schema
export const ConfigServiceDeliveryChannelsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ConfigServiceDeliveryChannelsUpdateOutput =
  typeof ConfigServiceDeliveryChannelsUpdateOutput.Type;

// The operation
/**
 * Update a ConfigServiceDeliveryChannel
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of ConfigServiceDeliveryChannel
 */
export const ConfigServiceDeliveryChannelsUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigServiceDeliveryChannelsUpdateInput,
    outputSchema: ConfigServiceDeliveryChannelsUpdateOutput,
  }));
// Input Schema
export const DatabaseMigrationServiceReplicationInstancesCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/databaseMigrationServiceReplicationInstances/{name}",
    }),
  );
export type DatabaseMigrationServiceReplicationInstancesCreateOrReplaceInput =
  typeof DatabaseMigrationServiceReplicationInstancesCreateOrReplaceInput.Type;

// Output Schema
export const DatabaseMigrationServiceReplicationInstancesCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type DatabaseMigrationServiceReplicationInstancesCreateOrReplaceOutput =
  typeof DatabaseMigrationServiceReplicationInstancesCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a DatabaseMigrationServiceReplicationInstance. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of DatabaseMigrationServiceReplicationInstance
 */
export const DatabaseMigrationServiceReplicationInstancesCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      DatabaseMigrationServiceReplicationInstancesCreateOrReplaceInput,
    outputSchema:
      DatabaseMigrationServiceReplicationInstancesCreateOrReplaceOutput,
  }));
// Input Schema
export const DatabaseMigrationServiceReplicationInstancesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/databaseMigrationServiceReplicationInstances/{name}",
    }),
  );
export type DatabaseMigrationServiceReplicationInstancesDeleteInput =
  typeof DatabaseMigrationServiceReplicationInstancesDeleteInput.Type;

// Output Schema
export const DatabaseMigrationServiceReplicationInstancesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DatabaseMigrationServiceReplicationInstancesDeleteOutput =
  typeof DatabaseMigrationServiceReplicationInstancesDeleteOutput.Type;

// The operation
/**
 * Delete a DatabaseMigrationServiceReplicationInstance
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of DatabaseMigrationServiceReplicationInstance
 */
export const DatabaseMigrationServiceReplicationInstancesDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseMigrationServiceReplicationInstancesDeleteInput,
    outputSchema: DatabaseMigrationServiceReplicationInstancesDeleteOutput,
  }));
// Input Schema
export const DatabaseMigrationServiceReplicationInstancesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/databaseMigrationServiceReplicationInstances/{name}",
    }),
  );
export type DatabaseMigrationServiceReplicationInstancesGetInput =
  typeof DatabaseMigrationServiceReplicationInstancesGetInput.Type;

// Output Schema
export const DatabaseMigrationServiceReplicationInstancesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type DatabaseMigrationServiceReplicationInstancesGetOutput =
  typeof DatabaseMigrationServiceReplicationInstancesGetOutput.Type;

// The operation
/**
 * Get a DatabaseMigrationServiceReplicationInstance
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of DatabaseMigrationServiceReplicationInstance
 */
export const DatabaseMigrationServiceReplicationInstancesGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseMigrationServiceReplicationInstancesGetInput,
    outputSchema: DatabaseMigrationServiceReplicationInstancesGetOutput,
  }));
// Input Schema
export const DatabaseMigrationServiceReplicationInstancesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/databaseMigrationServiceReplicationInstances",
    }),
  );
export type DatabaseMigrationServiceReplicationInstancesListByResourceGroupInput =
  typeof DatabaseMigrationServiceReplicationInstancesListByResourceGroupInput.Type;

// Output Schema
export const DatabaseMigrationServiceReplicationInstancesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type DatabaseMigrationServiceReplicationInstancesListByResourceGroupOutput =
  typeof DatabaseMigrationServiceReplicationInstancesListByResourceGroupOutput.Type;

// The operation
/**
 * List DatabaseMigrationServiceReplicationInstance resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const DatabaseMigrationServiceReplicationInstancesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      DatabaseMigrationServiceReplicationInstancesListByResourceGroupInput,
    outputSchema:
      DatabaseMigrationServiceReplicationInstancesListByResourceGroupOutput,
  }));
// Input Schema
export const DatabaseMigrationServiceReplicationInstancesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/databaseMigrationServiceReplicationInstances",
    }),
  );
export type DatabaseMigrationServiceReplicationInstancesListBySubscriptionInput =
  typeof DatabaseMigrationServiceReplicationInstancesListBySubscriptionInput.Type;

// Output Schema
export const DatabaseMigrationServiceReplicationInstancesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type DatabaseMigrationServiceReplicationInstancesListBySubscriptionOutput =
  typeof DatabaseMigrationServiceReplicationInstancesListBySubscriptionOutput.Type;

// The operation
/**
 * List DatabaseMigrationServiceReplicationInstance resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const DatabaseMigrationServiceReplicationInstancesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      DatabaseMigrationServiceReplicationInstancesListBySubscriptionInput,
    outputSchema:
      DatabaseMigrationServiceReplicationInstancesListBySubscriptionOutput,
  }));
// Input Schema
export const DatabaseMigrationServiceReplicationInstancesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/databaseMigrationServiceReplicationInstances/{name}",
    }),
  );
export type DatabaseMigrationServiceReplicationInstancesUpdateInput =
  typeof DatabaseMigrationServiceReplicationInstancesUpdateInput.Type;

// Output Schema
export const DatabaseMigrationServiceReplicationInstancesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type DatabaseMigrationServiceReplicationInstancesUpdateOutput =
  typeof DatabaseMigrationServiceReplicationInstancesUpdateOutput.Type;

// The operation
/**
 * Update a DatabaseMigrationServiceReplicationInstance
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of DatabaseMigrationServiceReplicationInstance
 */
export const DatabaseMigrationServiceReplicationInstancesUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseMigrationServiceReplicationInstancesUpdateInput,
    outputSchema: DatabaseMigrationServiceReplicationInstancesUpdateOutput,
  }));
// Input Schema
export const DaxClustersCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/daxClusters/{name}",
    }),
  );
export type DaxClustersCreateOrReplaceInput =
  typeof DaxClustersCreateOrReplaceInput.Type;

// Output Schema
export const DaxClustersCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type DaxClustersCreateOrReplaceOutput =
  typeof DaxClustersCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a DaxCluster. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of DaxCluster
 */
export const DaxClustersCreateOrReplace = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DaxClustersCreateOrReplaceInput,
    outputSchema: DaxClustersCreateOrReplaceOutput,
  }),
);
// Input Schema
export const DaxClustersDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/daxClusters/{name}",
  }),
);
export type DaxClustersDeleteInput = typeof DaxClustersDeleteInput.Type;

// Output Schema
export const DaxClustersDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DaxClustersDeleteOutput = typeof DaxClustersDeleteOutput.Type;

// The operation
/**
 * Delete a DaxCluster
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of DaxCluster
 */
export const DaxClustersDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DaxClustersDeleteInput,
  outputSchema: DaxClustersDeleteOutput,
}));
// Input Schema
export const DaxClustersGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  name: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/daxClusters/{name}",
  }),
);
export type DaxClustersGetInput = typeof DaxClustersGetInput.Type;

// Output Schema
export const DaxClustersGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type DaxClustersGetOutput = typeof DaxClustersGetOutput.Type;

// The operation
/**
 * Get a DaxCluster
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of DaxCluster
 */
export const DaxClustersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DaxClustersGetInput,
  outputSchema: DaxClustersGetOutput,
}));
// Input Schema
export const DaxClustersListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/daxClusters",
    }),
  );
export type DaxClustersListByResourceGroupInput =
  typeof DaxClustersListByResourceGroupInput.Type;

// Output Schema
export const DaxClustersListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type DaxClustersListByResourceGroupOutput =
  typeof DaxClustersListByResourceGroupOutput.Type;

// The operation
/**
 * List DaxCluster resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const DaxClustersListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DaxClustersListByResourceGroupInput,
    outputSchema: DaxClustersListByResourceGroupOutput,
  }));
// Input Schema
export const DaxClustersListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/daxClusters",
    }),
  );
export type DaxClustersListBySubscriptionInput =
  typeof DaxClustersListBySubscriptionInput.Type;

// Output Schema
export const DaxClustersListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type DaxClustersListBySubscriptionOutput =
  typeof DaxClustersListBySubscriptionOutput.Type;

// The operation
/**
 * List DaxCluster resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const DaxClustersListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DaxClustersListBySubscriptionInput,
    outputSchema: DaxClustersListBySubscriptionOutput,
  }));
// Input Schema
export const DaxClustersUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/daxClusters/{name}",
  }),
);
export type DaxClustersUpdateInput = typeof DaxClustersUpdateInput.Type;

// Output Schema
export const DaxClustersUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type DaxClustersUpdateOutput = typeof DaxClustersUpdateOutput.Type;

// The operation
/**
 * Update a DaxCluster
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of DaxCluster
 */
export const DaxClustersUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DaxClustersUpdateInput,
  outputSchema: DaxClustersUpdateOutput,
}));
// Input Schema
export const DynamoDbContinuousBackupsDescriptionsCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/dynamoDBContinuousBackupsDescriptions/{name}",
    }),
  );
export type DynamoDbContinuousBackupsDescriptionsCreateOrReplaceInput =
  typeof DynamoDbContinuousBackupsDescriptionsCreateOrReplaceInput.Type;

// Output Schema
export const DynamoDbContinuousBackupsDescriptionsCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type DynamoDbContinuousBackupsDescriptionsCreateOrReplaceOutput =
  typeof DynamoDbContinuousBackupsDescriptionsCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a DynamoDBContinuousBackupsDescription. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of DynamoDBContinuousBackupsDescription
 */
export const DynamoDbContinuousBackupsDescriptionsCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DynamoDbContinuousBackupsDescriptionsCreateOrReplaceInput,
    outputSchema: DynamoDbContinuousBackupsDescriptionsCreateOrReplaceOutput,
  }));
// Input Schema
export const DynamoDbContinuousBackupsDescriptionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/dynamoDBContinuousBackupsDescriptions/{name}",
    }),
  );
export type DynamoDbContinuousBackupsDescriptionsDeleteInput =
  typeof DynamoDbContinuousBackupsDescriptionsDeleteInput.Type;

// Output Schema
export const DynamoDbContinuousBackupsDescriptionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DynamoDbContinuousBackupsDescriptionsDeleteOutput =
  typeof DynamoDbContinuousBackupsDescriptionsDeleteOutput.Type;

// The operation
/**
 * Delete a DynamoDBContinuousBackupsDescription
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of DynamoDBContinuousBackupsDescription
 */
export const DynamoDbContinuousBackupsDescriptionsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DynamoDbContinuousBackupsDescriptionsDeleteInput,
    outputSchema: DynamoDbContinuousBackupsDescriptionsDeleteOutput,
  }));
// Input Schema
export const DynamoDbContinuousBackupsDescriptionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/dynamoDBContinuousBackupsDescriptions/{name}",
    }),
  );
export type DynamoDbContinuousBackupsDescriptionsGetInput =
  typeof DynamoDbContinuousBackupsDescriptionsGetInput.Type;

// Output Schema
export const DynamoDbContinuousBackupsDescriptionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type DynamoDbContinuousBackupsDescriptionsGetOutput =
  typeof DynamoDbContinuousBackupsDescriptionsGetOutput.Type;

// The operation
/**
 * Get a DynamoDBContinuousBackupsDescription
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of DynamoDBContinuousBackupsDescription
 */
export const DynamoDbContinuousBackupsDescriptionsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DynamoDbContinuousBackupsDescriptionsGetInput,
    outputSchema: DynamoDbContinuousBackupsDescriptionsGetOutput,
  }));
// Input Schema
export const DynamoDbContinuousBackupsDescriptionsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/dynamoDBContinuousBackupsDescriptions",
    }),
  );
export type DynamoDbContinuousBackupsDescriptionsListByResourceGroupInput =
  typeof DynamoDbContinuousBackupsDescriptionsListByResourceGroupInput.Type;

// Output Schema
export const DynamoDbContinuousBackupsDescriptionsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type DynamoDbContinuousBackupsDescriptionsListByResourceGroupOutput =
  typeof DynamoDbContinuousBackupsDescriptionsListByResourceGroupOutput.Type;

// The operation
/**
 * List DynamoDBContinuousBackupsDescription resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const DynamoDbContinuousBackupsDescriptionsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DynamoDbContinuousBackupsDescriptionsListByResourceGroupInput,
    outputSchema:
      DynamoDbContinuousBackupsDescriptionsListByResourceGroupOutput,
  }));
// Input Schema
export const DynamoDbContinuousBackupsDescriptionsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/dynamoDBContinuousBackupsDescriptions",
    }),
  );
export type DynamoDbContinuousBackupsDescriptionsListBySubscriptionInput =
  typeof DynamoDbContinuousBackupsDescriptionsListBySubscriptionInput.Type;

// Output Schema
export const DynamoDbContinuousBackupsDescriptionsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type DynamoDbContinuousBackupsDescriptionsListBySubscriptionOutput =
  typeof DynamoDbContinuousBackupsDescriptionsListBySubscriptionOutput.Type;

// The operation
/**
 * List DynamoDBContinuousBackupsDescription resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const DynamoDbContinuousBackupsDescriptionsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DynamoDbContinuousBackupsDescriptionsListBySubscriptionInput,
    outputSchema: DynamoDbContinuousBackupsDescriptionsListBySubscriptionOutput,
  }));
// Input Schema
export const DynamoDbContinuousBackupsDescriptionsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/dynamoDBContinuousBackupsDescriptions/{name}",
    }),
  );
export type DynamoDbContinuousBackupsDescriptionsUpdateInput =
  typeof DynamoDbContinuousBackupsDescriptionsUpdateInput.Type;

// Output Schema
export const DynamoDbContinuousBackupsDescriptionsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type DynamoDbContinuousBackupsDescriptionsUpdateOutput =
  typeof DynamoDbContinuousBackupsDescriptionsUpdateOutput.Type;

// The operation
/**
 * Update a DynamoDBContinuousBackupsDescription
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of DynamoDBContinuousBackupsDescription
 */
export const DynamoDbContinuousBackupsDescriptionsUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DynamoDbContinuousBackupsDescriptionsUpdateInput,
    outputSchema: DynamoDbContinuousBackupsDescriptionsUpdateOutput,
  }));
// Input Schema
export const DynamoDbTablesCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/dynamoDBTables/{name}",
    }),
  );
export type DynamoDbTablesCreateOrReplaceInput =
  typeof DynamoDbTablesCreateOrReplaceInput.Type;

// Output Schema
export const DynamoDbTablesCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type DynamoDbTablesCreateOrReplaceOutput =
  typeof DynamoDbTablesCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a DynamoDBTable. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of DynamoDBTable
 */
export const DynamoDbTablesCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DynamoDbTablesCreateOrReplaceInput,
    outputSchema: DynamoDbTablesCreateOrReplaceOutput,
  }));
// Input Schema
export const DynamoDbTablesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/dynamoDBTables/{name}",
    }),
  );
export type DynamoDbTablesDeleteInput = typeof DynamoDbTablesDeleteInput.Type;

// Output Schema
export const DynamoDbTablesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DynamoDbTablesDeleteOutput = typeof DynamoDbTablesDeleteOutput.Type;

// The operation
/**
 * Delete a DynamoDBTable
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of DynamoDBTable
 */
export const DynamoDbTablesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DynamoDbTablesDeleteInput,
    outputSchema: DynamoDbTablesDeleteOutput,
  }),
);
// Input Schema
export const DynamoDbTablesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/dynamoDBTables/{name}",
  }),
);
export type DynamoDbTablesGetInput = typeof DynamoDbTablesGetInput.Type;

// Output Schema
export const DynamoDbTablesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type DynamoDbTablesGetOutput = typeof DynamoDbTablesGetOutput.Type;

// The operation
/**
 * Get a DynamoDBTable
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of DynamoDBTable
 */
export const DynamoDbTablesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DynamoDbTablesGetInput,
  outputSchema: DynamoDbTablesGetOutput,
}));
// Input Schema
export const DynamoDbTablesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/dynamoDBTables",
    }),
  );
export type DynamoDbTablesListByResourceGroupInput =
  typeof DynamoDbTablesListByResourceGroupInput.Type;

// Output Schema
export const DynamoDbTablesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type DynamoDbTablesListByResourceGroupOutput =
  typeof DynamoDbTablesListByResourceGroupOutput.Type;

// The operation
/**
 * List DynamoDBTable resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const DynamoDbTablesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DynamoDbTablesListByResourceGroupInput,
    outputSchema: DynamoDbTablesListByResourceGroupOutput,
  }));
// Input Schema
export const DynamoDbTablesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/dynamoDBTables",
    }),
  );
export type DynamoDbTablesListBySubscriptionInput =
  typeof DynamoDbTablesListBySubscriptionInput.Type;

// Output Schema
export const DynamoDbTablesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type DynamoDbTablesListBySubscriptionOutput =
  typeof DynamoDbTablesListBySubscriptionOutput.Type;

// The operation
/**
 * List DynamoDBTable resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const DynamoDbTablesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DynamoDbTablesListBySubscriptionInput,
    outputSchema: DynamoDbTablesListBySubscriptionOutput,
  }));
// Input Schema
export const DynamoDbTablesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/dynamoDBTables/{name}",
    }),
  );
export type DynamoDbTablesUpdateInput = typeof DynamoDbTablesUpdateInput.Type;

// Output Schema
export const DynamoDbTablesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type DynamoDbTablesUpdateOutput = typeof DynamoDbTablesUpdateOutput.Type;

// The operation
/**
 * Update a DynamoDBTable
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of DynamoDBTable
 */
export const DynamoDbTablesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DynamoDbTablesUpdateInput,
    outputSchema: DynamoDbTablesUpdateOutput,
  }),
);
// Input Schema
export const Ec2AccountAttributesCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2AccountAttributes/{name}",
    }),
  );
export type Ec2AccountAttributesCreateOrReplaceInput =
  typeof Ec2AccountAttributesCreateOrReplaceInput.Type;

// Output Schema
export const Ec2AccountAttributesCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type Ec2AccountAttributesCreateOrReplaceOutput =
  typeof Ec2AccountAttributesCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a Ec2AccountAttribute. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Ec2AccountAttribute
 */
export const Ec2AccountAttributesCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: Ec2AccountAttributesCreateOrReplaceInput,
    outputSchema: Ec2AccountAttributesCreateOrReplaceOutput,
  }));
// Input Schema
export const Ec2AccountAttributesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2AccountAttributes/{name}",
    }),
  );
export type Ec2AccountAttributesDeleteInput =
  typeof Ec2AccountAttributesDeleteInput.Type;

// Output Schema
export const Ec2AccountAttributesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type Ec2AccountAttributesDeleteOutput =
  typeof Ec2AccountAttributesDeleteOutput.Type;

// The operation
/**
 * Delete a Ec2AccountAttribute
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Ec2AccountAttribute
 */
export const Ec2AccountAttributesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: Ec2AccountAttributesDeleteInput,
    outputSchema: Ec2AccountAttributesDeleteOutput,
  }),
);
// Input Schema
export const Ec2AccountAttributesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2AccountAttributes/{name}",
    }),
  );
export type Ec2AccountAttributesGetInput =
  typeof Ec2AccountAttributesGetInput.Type;

// Output Schema
export const Ec2AccountAttributesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type Ec2AccountAttributesGetOutput =
  typeof Ec2AccountAttributesGetOutput.Type;

// The operation
/**
 * Get a Ec2AccountAttribute
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Ec2AccountAttribute
 */
export const Ec2AccountAttributesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: Ec2AccountAttributesGetInput,
    outputSchema: Ec2AccountAttributesGetOutput,
  }),
);
// Input Schema
export const Ec2AccountAttributesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2AccountAttributes",
    }),
  );
export type Ec2AccountAttributesListByResourceGroupInput =
  typeof Ec2AccountAttributesListByResourceGroupInput.Type;

// Output Schema
export const Ec2AccountAttributesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type Ec2AccountAttributesListByResourceGroupOutput =
  typeof Ec2AccountAttributesListByResourceGroupOutput.Type;

// The operation
/**
 * List Ec2AccountAttribute resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const Ec2AccountAttributesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: Ec2AccountAttributesListByResourceGroupInput,
    outputSchema: Ec2AccountAttributesListByResourceGroupOutput,
  }));
// Input Schema
export const Ec2AccountAttributesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/ec2AccountAttributes",
    }),
  );
export type Ec2AccountAttributesListBySubscriptionInput =
  typeof Ec2AccountAttributesListBySubscriptionInput.Type;

// Output Schema
export const Ec2AccountAttributesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type Ec2AccountAttributesListBySubscriptionOutput =
  typeof Ec2AccountAttributesListBySubscriptionOutput.Type;

// The operation
/**
 * List Ec2AccountAttribute resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const Ec2AccountAttributesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: Ec2AccountAttributesListBySubscriptionInput,
    outputSchema: Ec2AccountAttributesListBySubscriptionOutput,
  }));
// Input Schema
export const Ec2AccountAttributesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2AccountAttributes/{name}",
    }),
  );
export type Ec2AccountAttributesUpdateInput =
  typeof Ec2AccountAttributesUpdateInput.Type;

// Output Schema
export const Ec2AccountAttributesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type Ec2AccountAttributesUpdateOutput =
  typeof Ec2AccountAttributesUpdateOutput.Type;

// The operation
/**
 * Update a Ec2AccountAttribute
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Ec2AccountAttribute
 */
export const Ec2AccountAttributesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: Ec2AccountAttributesUpdateInput,
    outputSchema: Ec2AccountAttributesUpdateOutput,
  }),
);
// Input Schema
export const Ec2AddressesCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2Addresses/{name}",
    }),
  );
export type Ec2AddressesCreateOrReplaceInput =
  typeof Ec2AddressesCreateOrReplaceInput.Type;

// Output Schema
export const Ec2AddressesCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type Ec2AddressesCreateOrReplaceOutput =
  typeof Ec2AddressesCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a Ec2Address. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Ec2Address
 */
export const Ec2AddressesCreateOrReplace = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: Ec2AddressesCreateOrReplaceInput,
    outputSchema: Ec2AddressesCreateOrReplaceOutput,
  }),
);
// Input Schema
export const Ec2AddressesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2Addresses/{name}",
    }),
  );
export type Ec2AddressesDeleteInput = typeof Ec2AddressesDeleteInput.Type;

// Output Schema
export const Ec2AddressesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type Ec2AddressesDeleteOutput = typeof Ec2AddressesDeleteOutput.Type;

// The operation
/**
 * Delete a Ec2Address
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Ec2Address
 */
export const Ec2AddressesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: Ec2AddressesDeleteInput,
  outputSchema: Ec2AddressesDeleteOutput,
}));
// Input Schema
export const Ec2AddressesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  name: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2Addresses/{name}",
  }),
);
export type Ec2AddressesGetInput = typeof Ec2AddressesGetInput.Type;

// Output Schema
export const Ec2AddressesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type Ec2AddressesGetOutput = typeof Ec2AddressesGetOutput.Type;

// The operation
/**
 * Get a Ec2Address
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Ec2Address
 */
export const Ec2AddressesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: Ec2AddressesGetInput,
  outputSchema: Ec2AddressesGetOutput,
}));
// Input Schema
export const Ec2AddressesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2Addresses",
    }),
  );
export type Ec2AddressesListByResourceGroupInput =
  typeof Ec2AddressesListByResourceGroupInput.Type;

// Output Schema
export const Ec2AddressesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type Ec2AddressesListByResourceGroupOutput =
  typeof Ec2AddressesListByResourceGroupOutput.Type;

// The operation
/**
 * List Ec2Address resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const Ec2AddressesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: Ec2AddressesListByResourceGroupInput,
    outputSchema: Ec2AddressesListByResourceGroupOutput,
  }));
// Input Schema
export const Ec2AddressesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/ec2Addresses",
    }),
  );
export type Ec2AddressesListBySubscriptionInput =
  typeof Ec2AddressesListBySubscriptionInput.Type;

// Output Schema
export const Ec2AddressesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type Ec2AddressesListBySubscriptionOutput =
  typeof Ec2AddressesListBySubscriptionOutput.Type;

// The operation
/**
 * List Ec2Address resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const Ec2AddressesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: Ec2AddressesListBySubscriptionInput,
    outputSchema: Ec2AddressesListBySubscriptionOutput,
  }));
// Input Schema
export const Ec2AddressesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2Addresses/{name}",
    }),
  );
export type Ec2AddressesUpdateInput = typeof Ec2AddressesUpdateInput.Type;

// Output Schema
export const Ec2AddressesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type Ec2AddressesUpdateOutput = typeof Ec2AddressesUpdateOutput.Type;

// The operation
/**
 * Update a Ec2Address
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Ec2Address
 */
export const Ec2AddressesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: Ec2AddressesUpdateInput,
  outputSchema: Ec2AddressesUpdateOutput,
}));
// Input Schema
export const Ec2FlowLogsCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2FlowLogs/{name}",
    }),
  );
export type Ec2FlowLogsCreateOrReplaceInput =
  typeof Ec2FlowLogsCreateOrReplaceInput.Type;

// Output Schema
export const Ec2FlowLogsCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type Ec2FlowLogsCreateOrReplaceOutput =
  typeof Ec2FlowLogsCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a Ec2FlowLog. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Ec2FlowLog
 */
export const Ec2FlowLogsCreateOrReplace = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: Ec2FlowLogsCreateOrReplaceInput,
    outputSchema: Ec2FlowLogsCreateOrReplaceOutput,
  }),
);
// Input Schema
export const Ec2FlowLogsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2FlowLogs/{name}",
  }),
);
export type Ec2FlowLogsDeleteInput = typeof Ec2FlowLogsDeleteInput.Type;

// Output Schema
export const Ec2FlowLogsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type Ec2FlowLogsDeleteOutput = typeof Ec2FlowLogsDeleteOutput.Type;

// The operation
/**
 * Delete a Ec2FlowLog
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Ec2FlowLog
 */
export const Ec2FlowLogsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: Ec2FlowLogsDeleteInput,
  outputSchema: Ec2FlowLogsDeleteOutput,
}));
// Input Schema
export const Ec2FlowLogsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  name: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2FlowLogs/{name}",
  }),
);
export type Ec2FlowLogsGetInput = typeof Ec2FlowLogsGetInput.Type;

// Output Schema
export const Ec2FlowLogsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type Ec2FlowLogsGetOutput = typeof Ec2FlowLogsGetOutput.Type;

// The operation
/**
 * Get a Ec2FlowLog
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Ec2FlowLog
 */
export const Ec2FlowLogsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: Ec2FlowLogsGetInput,
  outputSchema: Ec2FlowLogsGetOutput,
}));
// Input Schema
export const Ec2FlowLogsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2FlowLogs",
    }),
  );
export type Ec2FlowLogsListByResourceGroupInput =
  typeof Ec2FlowLogsListByResourceGroupInput.Type;

// Output Schema
export const Ec2FlowLogsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type Ec2FlowLogsListByResourceGroupOutput =
  typeof Ec2FlowLogsListByResourceGroupOutput.Type;

// The operation
/**
 * List Ec2FlowLog resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const Ec2FlowLogsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: Ec2FlowLogsListByResourceGroupInput,
    outputSchema: Ec2FlowLogsListByResourceGroupOutput,
  }));
// Input Schema
export const Ec2FlowLogsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/ec2FlowLogs",
    }),
  );
export type Ec2FlowLogsListBySubscriptionInput =
  typeof Ec2FlowLogsListBySubscriptionInput.Type;

// Output Schema
export const Ec2FlowLogsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type Ec2FlowLogsListBySubscriptionOutput =
  typeof Ec2FlowLogsListBySubscriptionOutput.Type;

// The operation
/**
 * List Ec2FlowLog resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const Ec2FlowLogsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: Ec2FlowLogsListBySubscriptionInput,
    outputSchema: Ec2FlowLogsListBySubscriptionOutput,
  }));
// Input Schema
export const Ec2FlowLogsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2FlowLogs/{name}",
  }),
);
export type Ec2FlowLogsUpdateInput = typeof Ec2FlowLogsUpdateInput.Type;

// Output Schema
export const Ec2FlowLogsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type Ec2FlowLogsUpdateOutput = typeof Ec2FlowLogsUpdateOutput.Type;

// The operation
/**
 * Update a Ec2FlowLog
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Ec2FlowLog
 */
export const Ec2FlowLogsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: Ec2FlowLogsUpdateInput,
  outputSchema: Ec2FlowLogsUpdateOutput,
}));
// Input Schema
export const Ec2ImagesCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2Images/{name}",
    }),
  );
export type Ec2ImagesCreateOrReplaceInput =
  typeof Ec2ImagesCreateOrReplaceInput.Type;

// Output Schema
export const Ec2ImagesCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type Ec2ImagesCreateOrReplaceOutput =
  typeof Ec2ImagesCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a Ec2Image. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Ec2Image
 */
export const Ec2ImagesCreateOrReplace = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: Ec2ImagesCreateOrReplaceInput,
    outputSchema: Ec2ImagesCreateOrReplaceOutput,
  }),
);
// Input Schema
export const Ec2ImagesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  name: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2Images/{name}",
  }),
);
export type Ec2ImagesDeleteInput = typeof Ec2ImagesDeleteInput.Type;

// Output Schema
export const Ec2ImagesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type Ec2ImagesDeleteOutput = typeof Ec2ImagesDeleteOutput.Type;

// The operation
/**
 * Delete a Ec2Image
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Ec2Image
 */
export const Ec2ImagesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: Ec2ImagesDeleteInput,
  outputSchema: Ec2ImagesDeleteOutput,
}));
// Input Schema
export const Ec2ImagesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  name: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2Images/{name}",
  }),
);
export type Ec2ImagesGetInput = typeof Ec2ImagesGetInput.Type;

// Output Schema
export const Ec2ImagesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type Ec2ImagesGetOutput = typeof Ec2ImagesGetOutput.Type;

// The operation
/**
 * Get a Ec2Image
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Ec2Image
 */
export const Ec2ImagesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: Ec2ImagesGetInput,
  outputSchema: Ec2ImagesGetOutput,
}));
// Input Schema
export const Ec2ImagesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2Images",
    }),
  );
export type Ec2ImagesListByResourceGroupInput =
  typeof Ec2ImagesListByResourceGroupInput.Type;

// Output Schema
export const Ec2ImagesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type Ec2ImagesListByResourceGroupOutput =
  typeof Ec2ImagesListByResourceGroupOutput.Type;

// The operation
/**
 * List Ec2Image resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const Ec2ImagesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: Ec2ImagesListByResourceGroupInput,
    outputSchema: Ec2ImagesListByResourceGroupOutput,
  }));
// Input Schema
export const Ec2ImagesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/ec2Images",
    }),
  );
export type Ec2ImagesListBySubscriptionInput =
  typeof Ec2ImagesListBySubscriptionInput.Type;

// Output Schema
export const Ec2ImagesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type Ec2ImagesListBySubscriptionOutput =
  typeof Ec2ImagesListBySubscriptionOutput.Type;

// The operation
/**
 * List Ec2Image resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const Ec2ImagesListBySubscription = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: Ec2ImagesListBySubscriptionInput,
    outputSchema: Ec2ImagesListBySubscriptionOutput,
  }),
);
// Input Schema
export const Ec2ImagesUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  name: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2Images/{name}",
  }),
);
export type Ec2ImagesUpdateInput = typeof Ec2ImagesUpdateInput.Type;

// Output Schema
export const Ec2ImagesUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type Ec2ImagesUpdateOutput = typeof Ec2ImagesUpdateOutput.Type;

// The operation
/**
 * Update a Ec2Image
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Ec2Image
 */
export const Ec2ImagesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: Ec2ImagesUpdateInput,
  outputSchema: Ec2ImagesUpdateOutput,
}));
// Input Schema
export const Ec2InstancesCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/{resourceUri}/providers/Microsoft.AwsConnector/ec2Instances/default",
    }),
  );
export type Ec2InstancesCreateOrReplaceInput =
  typeof Ec2InstancesCreateOrReplaceInput.Type;

// Output Schema
export const Ec2InstancesCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type Ec2InstancesCreateOrReplaceOutput =
  typeof Ec2InstancesCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a Ec2Instance. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 */
export const Ec2InstancesCreateOrReplace = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: Ec2InstancesCreateOrReplaceInput,
    outputSchema: Ec2InstancesCreateOrReplaceOutput,
  }),
);
// Input Schema
export const Ec2InstancesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/{resourceUri}/providers/Microsoft.AwsConnector/ec2Instances/default",
    }),
  );
export type Ec2InstancesDeleteInput = typeof Ec2InstancesDeleteInput.Type;

// Output Schema
export const Ec2InstancesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type Ec2InstancesDeleteOutput = typeof Ec2InstancesDeleteOutput.Type;

// The operation
/**
 * Delete a Ec2Instance
 *
 * @param api-version - The API version to use for this operation.
 */
export const Ec2InstancesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: Ec2InstancesDeleteInput,
  outputSchema: Ec2InstancesDeleteOutput,
}));
// Input Schema
export const Ec2InstancesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/{resourceUri}/providers/Microsoft.AwsConnector/ec2Instances/default",
  }),
);
export type Ec2InstancesGetInput = typeof Ec2InstancesGetInput.Type;

// Output Schema
export const Ec2InstancesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type Ec2InstancesGetOutput = typeof Ec2InstancesGetOutput.Type;

// The operation
/**
 * Get a Ec2Instance
 *
 * @param api-version - The API version to use for this operation.
 */
export const Ec2InstancesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: Ec2InstancesGetInput,
  outputSchema: Ec2InstancesGetOutput,
}));
// Input Schema
export const Ec2InstancesListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/{resourceUri}/providers/Microsoft.AwsConnector/ec2Instances",
  }),
);
export type Ec2InstancesListInput = typeof Ec2InstancesListInput.Type;

// Output Schema
export const Ec2InstancesListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  },
);
export type Ec2InstancesListOutput = typeof Ec2InstancesListOutput.Type;

// The operation
/**
 * List Ec2Instance resources by parent
 *
 * @param api-version - The API version to use for this operation.
 */
export const Ec2InstancesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: Ec2InstancesListInput,
  outputSchema: Ec2InstancesListOutput,
}));
// Input Schema
export const Ec2InstanceStatusesCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2InstanceStatuses/{name}",
    }),
  );
export type Ec2InstanceStatusesCreateOrReplaceInput =
  typeof Ec2InstanceStatusesCreateOrReplaceInput.Type;

// Output Schema
export const Ec2InstanceStatusesCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type Ec2InstanceStatusesCreateOrReplaceOutput =
  typeof Ec2InstanceStatusesCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a Ec2InstanceStatus. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Ec2InstanceStatus
 */
export const Ec2InstanceStatusesCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: Ec2InstanceStatusesCreateOrReplaceInput,
    outputSchema: Ec2InstanceStatusesCreateOrReplaceOutput,
  }));
// Input Schema
export const Ec2InstanceStatusesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2InstanceStatuses/{name}",
    }),
  );
export type Ec2InstanceStatusesDeleteInput =
  typeof Ec2InstanceStatusesDeleteInput.Type;

// Output Schema
export const Ec2InstanceStatusesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type Ec2InstanceStatusesDeleteOutput =
  typeof Ec2InstanceStatusesDeleteOutput.Type;

// The operation
/**
 * Delete a Ec2InstanceStatus
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Ec2InstanceStatus
 */
export const Ec2InstanceStatusesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: Ec2InstanceStatusesDeleteInput,
    outputSchema: Ec2InstanceStatusesDeleteOutput,
  }),
);
// Input Schema
export const Ec2InstanceStatusesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2InstanceStatuses/{name}",
    }),
  );
export type Ec2InstanceStatusesGetInput =
  typeof Ec2InstanceStatusesGetInput.Type;

// Output Schema
export const Ec2InstanceStatusesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type Ec2InstanceStatusesGetOutput =
  typeof Ec2InstanceStatusesGetOutput.Type;

// The operation
/**
 * Get a Ec2InstanceStatus
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Ec2InstanceStatus
 */
export const Ec2InstanceStatusesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: Ec2InstanceStatusesGetInput,
    outputSchema: Ec2InstanceStatusesGetOutput,
  }),
);
// Input Schema
export const Ec2InstanceStatusesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2InstanceStatuses",
    }),
  );
export type Ec2InstanceStatusesListByResourceGroupInput =
  typeof Ec2InstanceStatusesListByResourceGroupInput.Type;

// Output Schema
export const Ec2InstanceStatusesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type Ec2InstanceStatusesListByResourceGroupOutput =
  typeof Ec2InstanceStatusesListByResourceGroupOutput.Type;

// The operation
/**
 * List Ec2InstanceStatus resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const Ec2InstanceStatusesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: Ec2InstanceStatusesListByResourceGroupInput,
    outputSchema: Ec2InstanceStatusesListByResourceGroupOutput,
  }));
// Input Schema
export const Ec2InstanceStatusesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/ec2InstanceStatuses",
    }),
  );
export type Ec2InstanceStatusesListBySubscriptionInput =
  typeof Ec2InstanceStatusesListBySubscriptionInput.Type;

// Output Schema
export const Ec2InstanceStatusesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type Ec2InstanceStatusesListBySubscriptionOutput =
  typeof Ec2InstanceStatusesListBySubscriptionOutput.Type;

// The operation
/**
 * List Ec2InstanceStatus resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const Ec2InstanceStatusesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: Ec2InstanceStatusesListBySubscriptionInput,
    outputSchema: Ec2InstanceStatusesListBySubscriptionOutput,
  }));
// Input Schema
export const Ec2InstanceStatusesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2InstanceStatuses/{name}",
    }),
  );
export type Ec2InstanceStatusesUpdateInput =
  typeof Ec2InstanceStatusesUpdateInput.Type;

// Output Schema
export const Ec2InstanceStatusesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type Ec2InstanceStatusesUpdateOutput =
  typeof Ec2InstanceStatusesUpdateOutput.Type;

// The operation
/**
 * Update a Ec2InstanceStatus
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Ec2InstanceStatus
 */
export const Ec2InstanceStatusesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: Ec2InstanceStatusesUpdateInput,
    outputSchema: Ec2InstanceStatusesUpdateOutput,
  }),
);
// Input Schema
export const Ec2IpamsCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2Ipams/{name}",
    }),
  );
export type Ec2IpamsCreateOrReplaceInput =
  typeof Ec2IpamsCreateOrReplaceInput.Type;

// Output Schema
export const Ec2IpamsCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type Ec2IpamsCreateOrReplaceOutput =
  typeof Ec2IpamsCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a Ec2Ipam. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Ec2Ipam
 */
export const Ec2IpamsCreateOrReplace = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: Ec2IpamsCreateOrReplaceInput,
    outputSchema: Ec2IpamsCreateOrReplaceOutput,
  }),
);
// Input Schema
export const Ec2IpamsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  name: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2Ipams/{name}",
  }),
);
export type Ec2IpamsDeleteInput = typeof Ec2IpamsDeleteInput.Type;

// Output Schema
export const Ec2IpamsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type Ec2IpamsDeleteOutput = typeof Ec2IpamsDeleteOutput.Type;

// The operation
/**
 * Delete a Ec2Ipam
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Ec2Ipam
 */
export const Ec2IpamsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: Ec2IpamsDeleteInput,
  outputSchema: Ec2IpamsDeleteOutput,
}));
// Input Schema
export const Ec2IpamsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  name: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2Ipams/{name}",
  }),
);
export type Ec2IpamsGetInput = typeof Ec2IpamsGetInput.Type;

// Output Schema
export const Ec2IpamsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type Ec2IpamsGetOutput = typeof Ec2IpamsGetOutput.Type;

// The operation
/**
 * Get a Ec2Ipam
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Ec2Ipam
 */
export const Ec2IpamsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: Ec2IpamsGetInput,
  outputSchema: Ec2IpamsGetOutput,
}));
// Input Schema
export const Ec2IpamsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2Ipams",
    }),
  );
export type Ec2IpamsListByResourceGroupInput =
  typeof Ec2IpamsListByResourceGroupInput.Type;

// Output Schema
export const Ec2IpamsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type Ec2IpamsListByResourceGroupOutput =
  typeof Ec2IpamsListByResourceGroupOutput.Type;

// The operation
/**
 * List Ec2Ipam resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const Ec2IpamsListByResourceGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: Ec2IpamsListByResourceGroupInput,
    outputSchema: Ec2IpamsListByResourceGroupOutput,
  }),
);
// Input Schema
export const Ec2IpamsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/ec2Ipams",
    }),
  );
export type Ec2IpamsListBySubscriptionInput =
  typeof Ec2IpamsListBySubscriptionInput.Type;

// Output Schema
export const Ec2IpamsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type Ec2IpamsListBySubscriptionOutput =
  typeof Ec2IpamsListBySubscriptionOutput.Type;

// The operation
/**
 * List Ec2Ipam resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const Ec2IpamsListBySubscription = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: Ec2IpamsListBySubscriptionInput,
    outputSchema: Ec2IpamsListBySubscriptionOutput,
  }),
);
// Input Schema
export const Ec2IpamsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  name: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2Ipams/{name}",
  }),
);
export type Ec2IpamsUpdateInput = typeof Ec2IpamsUpdateInput.Type;

// Output Schema
export const Ec2IpamsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type Ec2IpamsUpdateOutput = typeof Ec2IpamsUpdateOutput.Type;

// The operation
/**
 * Update a Ec2Ipam
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Ec2Ipam
 */
export const Ec2IpamsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: Ec2IpamsUpdateInput,
  outputSchema: Ec2IpamsUpdateOutput,
}));
// Input Schema
export const Ec2KeyPairsCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2KeyPairs/{name}",
    }),
  );
export type Ec2KeyPairsCreateOrReplaceInput =
  typeof Ec2KeyPairsCreateOrReplaceInput.Type;

// Output Schema
export const Ec2KeyPairsCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type Ec2KeyPairsCreateOrReplaceOutput =
  typeof Ec2KeyPairsCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a Ec2KeyPair. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Ec2KeyPair
 */
export const Ec2KeyPairsCreateOrReplace = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: Ec2KeyPairsCreateOrReplaceInput,
    outputSchema: Ec2KeyPairsCreateOrReplaceOutput,
  }),
);
// Input Schema
export const Ec2KeyPairsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2KeyPairs/{name}",
  }),
);
export type Ec2KeyPairsDeleteInput = typeof Ec2KeyPairsDeleteInput.Type;

// Output Schema
export const Ec2KeyPairsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type Ec2KeyPairsDeleteOutput = typeof Ec2KeyPairsDeleteOutput.Type;

// The operation
/**
 * Delete a Ec2KeyPair
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Ec2KeyPair
 */
export const Ec2KeyPairsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: Ec2KeyPairsDeleteInput,
  outputSchema: Ec2KeyPairsDeleteOutput,
}));
// Input Schema
export const Ec2KeyPairsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  name: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2KeyPairs/{name}",
  }),
);
export type Ec2KeyPairsGetInput = typeof Ec2KeyPairsGetInput.Type;

// Output Schema
export const Ec2KeyPairsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type Ec2KeyPairsGetOutput = typeof Ec2KeyPairsGetOutput.Type;

// The operation
/**
 * Get a Ec2KeyPair
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Ec2KeyPair
 */
export const Ec2KeyPairsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: Ec2KeyPairsGetInput,
  outputSchema: Ec2KeyPairsGetOutput,
}));
// Input Schema
export const Ec2KeyPairsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2KeyPairs",
    }),
  );
export type Ec2KeyPairsListByResourceGroupInput =
  typeof Ec2KeyPairsListByResourceGroupInput.Type;

// Output Schema
export const Ec2KeyPairsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type Ec2KeyPairsListByResourceGroupOutput =
  typeof Ec2KeyPairsListByResourceGroupOutput.Type;

// The operation
/**
 * List Ec2KeyPair resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const Ec2KeyPairsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: Ec2KeyPairsListByResourceGroupInput,
    outputSchema: Ec2KeyPairsListByResourceGroupOutput,
  }));
// Input Schema
export const Ec2KeyPairsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/ec2KeyPairs",
    }),
  );
export type Ec2KeyPairsListBySubscriptionInput =
  typeof Ec2KeyPairsListBySubscriptionInput.Type;

// Output Schema
export const Ec2KeyPairsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type Ec2KeyPairsListBySubscriptionOutput =
  typeof Ec2KeyPairsListBySubscriptionOutput.Type;

// The operation
/**
 * List Ec2KeyPair resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const Ec2KeyPairsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: Ec2KeyPairsListBySubscriptionInput,
    outputSchema: Ec2KeyPairsListBySubscriptionOutput,
  }));
// Input Schema
export const Ec2KeyPairsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2KeyPairs/{name}",
  }),
);
export type Ec2KeyPairsUpdateInput = typeof Ec2KeyPairsUpdateInput.Type;

// Output Schema
export const Ec2KeyPairsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type Ec2KeyPairsUpdateOutput = typeof Ec2KeyPairsUpdateOutput.Type;

// The operation
/**
 * Update a Ec2KeyPair
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Ec2KeyPair
 */
export const Ec2KeyPairsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: Ec2KeyPairsUpdateInput,
  outputSchema: Ec2KeyPairsUpdateOutput,
}));
// Input Schema
export const Ec2NetworkAclsCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2NetworkAcls/{name}",
    }),
  );
export type Ec2NetworkAclsCreateOrReplaceInput =
  typeof Ec2NetworkAclsCreateOrReplaceInput.Type;

// Output Schema
export const Ec2NetworkAclsCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type Ec2NetworkAclsCreateOrReplaceOutput =
  typeof Ec2NetworkAclsCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a Ec2NetworkAcl. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Ec2NetworkAcl
 */
export const Ec2NetworkAclsCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: Ec2NetworkAclsCreateOrReplaceInput,
    outputSchema: Ec2NetworkAclsCreateOrReplaceOutput,
  }));
// Input Schema
export const Ec2NetworkAclsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2NetworkAcls/{name}",
    }),
  );
export type Ec2NetworkAclsDeleteInput = typeof Ec2NetworkAclsDeleteInput.Type;

// Output Schema
export const Ec2NetworkAclsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type Ec2NetworkAclsDeleteOutput = typeof Ec2NetworkAclsDeleteOutput.Type;

// The operation
/**
 * Delete a Ec2NetworkAcl
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Ec2NetworkAcl
 */
export const Ec2NetworkAclsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: Ec2NetworkAclsDeleteInput,
    outputSchema: Ec2NetworkAclsDeleteOutput,
  }),
);
// Input Schema
export const Ec2NetworkAclsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2NetworkAcls/{name}",
  }),
);
export type Ec2NetworkAclsGetInput = typeof Ec2NetworkAclsGetInput.Type;

// Output Schema
export const Ec2NetworkAclsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type Ec2NetworkAclsGetOutput = typeof Ec2NetworkAclsGetOutput.Type;

// The operation
/**
 * Get a Ec2NetworkAcl
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Ec2NetworkAcl
 */
export const Ec2NetworkAclsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: Ec2NetworkAclsGetInput,
  outputSchema: Ec2NetworkAclsGetOutput,
}));
// Input Schema
export const Ec2NetworkAclsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2NetworkAcls",
    }),
  );
export type Ec2NetworkAclsListByResourceGroupInput =
  typeof Ec2NetworkAclsListByResourceGroupInput.Type;

// Output Schema
export const Ec2NetworkAclsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type Ec2NetworkAclsListByResourceGroupOutput =
  typeof Ec2NetworkAclsListByResourceGroupOutput.Type;

// The operation
/**
 * List Ec2NetworkAcl resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const Ec2NetworkAclsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: Ec2NetworkAclsListByResourceGroupInput,
    outputSchema: Ec2NetworkAclsListByResourceGroupOutput,
  }));
// Input Schema
export const Ec2NetworkAclsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/ec2NetworkAcls",
    }),
  );
export type Ec2NetworkAclsListBySubscriptionInput =
  typeof Ec2NetworkAclsListBySubscriptionInput.Type;

// Output Schema
export const Ec2NetworkAclsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type Ec2NetworkAclsListBySubscriptionOutput =
  typeof Ec2NetworkAclsListBySubscriptionOutput.Type;

// The operation
/**
 * List Ec2NetworkAcl resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const Ec2NetworkAclsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: Ec2NetworkAclsListBySubscriptionInput,
    outputSchema: Ec2NetworkAclsListBySubscriptionOutput,
  }));
// Input Schema
export const Ec2NetworkAclsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2NetworkAcls/{name}",
    }),
  );
export type Ec2NetworkAclsUpdateInput = typeof Ec2NetworkAclsUpdateInput.Type;

// Output Schema
export const Ec2NetworkAclsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type Ec2NetworkAclsUpdateOutput = typeof Ec2NetworkAclsUpdateOutput.Type;

// The operation
/**
 * Update a Ec2NetworkAcl
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Ec2NetworkAcl
 */
export const Ec2NetworkAclsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: Ec2NetworkAclsUpdateInput,
    outputSchema: Ec2NetworkAclsUpdateOutput,
  }),
);
// Input Schema
export const Ec2NetworkInterfacesCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2NetworkInterfaces/{name}",
    }),
  );
export type Ec2NetworkInterfacesCreateOrReplaceInput =
  typeof Ec2NetworkInterfacesCreateOrReplaceInput.Type;

// Output Schema
export const Ec2NetworkInterfacesCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type Ec2NetworkInterfacesCreateOrReplaceOutput =
  typeof Ec2NetworkInterfacesCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a Ec2NetworkInterface. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Ec2NetworkInterface
 */
export const Ec2NetworkInterfacesCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: Ec2NetworkInterfacesCreateOrReplaceInput,
    outputSchema: Ec2NetworkInterfacesCreateOrReplaceOutput,
  }));
// Input Schema
export const Ec2NetworkInterfacesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2NetworkInterfaces/{name}",
    }),
  );
export type Ec2NetworkInterfacesDeleteInput =
  typeof Ec2NetworkInterfacesDeleteInput.Type;

// Output Schema
export const Ec2NetworkInterfacesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type Ec2NetworkInterfacesDeleteOutput =
  typeof Ec2NetworkInterfacesDeleteOutput.Type;

// The operation
/**
 * Delete a Ec2NetworkInterface
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Ec2NetworkInterface
 */
export const Ec2NetworkInterfacesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: Ec2NetworkInterfacesDeleteInput,
    outputSchema: Ec2NetworkInterfacesDeleteOutput,
  }),
);
// Input Schema
export const Ec2NetworkInterfacesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2NetworkInterfaces/{name}",
    }),
  );
export type Ec2NetworkInterfacesGetInput =
  typeof Ec2NetworkInterfacesGetInput.Type;

// Output Schema
export const Ec2NetworkInterfacesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type Ec2NetworkInterfacesGetOutput =
  typeof Ec2NetworkInterfacesGetOutput.Type;

// The operation
/**
 * Get a Ec2NetworkInterface
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Ec2NetworkInterface
 */
export const Ec2NetworkInterfacesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: Ec2NetworkInterfacesGetInput,
    outputSchema: Ec2NetworkInterfacesGetOutput,
  }),
);
// Input Schema
export const Ec2NetworkInterfacesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2NetworkInterfaces",
    }),
  );
export type Ec2NetworkInterfacesListByResourceGroupInput =
  typeof Ec2NetworkInterfacesListByResourceGroupInput.Type;

// Output Schema
export const Ec2NetworkInterfacesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type Ec2NetworkInterfacesListByResourceGroupOutput =
  typeof Ec2NetworkInterfacesListByResourceGroupOutput.Type;

// The operation
/**
 * List Ec2NetworkInterface resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const Ec2NetworkInterfacesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: Ec2NetworkInterfacesListByResourceGroupInput,
    outputSchema: Ec2NetworkInterfacesListByResourceGroupOutput,
  }));
// Input Schema
export const Ec2NetworkInterfacesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/ec2NetworkInterfaces",
    }),
  );
export type Ec2NetworkInterfacesListBySubscriptionInput =
  typeof Ec2NetworkInterfacesListBySubscriptionInput.Type;

// Output Schema
export const Ec2NetworkInterfacesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type Ec2NetworkInterfacesListBySubscriptionOutput =
  typeof Ec2NetworkInterfacesListBySubscriptionOutput.Type;

// The operation
/**
 * List Ec2NetworkInterface resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const Ec2NetworkInterfacesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: Ec2NetworkInterfacesListBySubscriptionInput,
    outputSchema: Ec2NetworkInterfacesListBySubscriptionOutput,
  }));
// Input Schema
export const Ec2NetworkInterfacesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2NetworkInterfaces/{name}",
    }),
  );
export type Ec2NetworkInterfacesUpdateInput =
  typeof Ec2NetworkInterfacesUpdateInput.Type;

// Output Schema
export const Ec2NetworkInterfacesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type Ec2NetworkInterfacesUpdateOutput =
  typeof Ec2NetworkInterfacesUpdateOutput.Type;

// The operation
/**
 * Update a Ec2NetworkInterface
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Ec2NetworkInterface
 */
export const Ec2NetworkInterfacesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: Ec2NetworkInterfacesUpdateInput,
    outputSchema: Ec2NetworkInterfacesUpdateOutput,
  }),
);
// Input Schema
export const Ec2RouteTablesCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2RouteTables/{name}",
    }),
  );
export type Ec2RouteTablesCreateOrReplaceInput =
  typeof Ec2RouteTablesCreateOrReplaceInput.Type;

// Output Schema
export const Ec2RouteTablesCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type Ec2RouteTablesCreateOrReplaceOutput =
  typeof Ec2RouteTablesCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a Ec2RouteTable. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Ec2RouteTable
 */
export const Ec2RouteTablesCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: Ec2RouteTablesCreateOrReplaceInput,
    outputSchema: Ec2RouteTablesCreateOrReplaceOutput,
  }));
// Input Schema
export const Ec2RouteTablesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2RouteTables/{name}",
    }),
  );
export type Ec2RouteTablesDeleteInput = typeof Ec2RouteTablesDeleteInput.Type;

// Output Schema
export const Ec2RouteTablesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type Ec2RouteTablesDeleteOutput = typeof Ec2RouteTablesDeleteOutput.Type;

// The operation
/**
 * Delete a Ec2RouteTable
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Ec2RouteTable
 */
export const Ec2RouteTablesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: Ec2RouteTablesDeleteInput,
    outputSchema: Ec2RouteTablesDeleteOutput,
  }),
);
// Input Schema
export const Ec2RouteTablesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2RouteTables/{name}",
  }),
);
export type Ec2RouteTablesGetInput = typeof Ec2RouteTablesGetInput.Type;

// Output Schema
export const Ec2RouteTablesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type Ec2RouteTablesGetOutput = typeof Ec2RouteTablesGetOutput.Type;

// The operation
/**
 * Get a Ec2RouteTable
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Ec2RouteTable
 */
export const Ec2RouteTablesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: Ec2RouteTablesGetInput,
  outputSchema: Ec2RouteTablesGetOutput,
}));
// Input Schema
export const Ec2RouteTablesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2RouteTables",
    }),
  );
export type Ec2RouteTablesListByResourceGroupInput =
  typeof Ec2RouteTablesListByResourceGroupInput.Type;

// Output Schema
export const Ec2RouteTablesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type Ec2RouteTablesListByResourceGroupOutput =
  typeof Ec2RouteTablesListByResourceGroupOutput.Type;

// The operation
/**
 * List Ec2RouteTable resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const Ec2RouteTablesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: Ec2RouteTablesListByResourceGroupInput,
    outputSchema: Ec2RouteTablesListByResourceGroupOutput,
  }));
// Input Schema
export const Ec2RouteTablesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/ec2RouteTables",
    }),
  );
export type Ec2RouteTablesListBySubscriptionInput =
  typeof Ec2RouteTablesListBySubscriptionInput.Type;

// Output Schema
export const Ec2RouteTablesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type Ec2RouteTablesListBySubscriptionOutput =
  typeof Ec2RouteTablesListBySubscriptionOutput.Type;

// The operation
/**
 * List Ec2RouteTable resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const Ec2RouteTablesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: Ec2RouteTablesListBySubscriptionInput,
    outputSchema: Ec2RouteTablesListBySubscriptionOutput,
  }));
// Input Schema
export const Ec2RouteTablesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2RouteTables/{name}",
    }),
  );
export type Ec2RouteTablesUpdateInput = typeof Ec2RouteTablesUpdateInput.Type;

// Output Schema
export const Ec2RouteTablesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type Ec2RouteTablesUpdateOutput = typeof Ec2RouteTablesUpdateOutput.Type;

// The operation
/**
 * Update a Ec2RouteTable
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Ec2RouteTable
 */
export const Ec2RouteTablesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: Ec2RouteTablesUpdateInput,
    outputSchema: Ec2RouteTablesUpdateOutput,
  }),
);
// Input Schema
export const Ec2SecurityGroupsCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2SecurityGroups/{name}",
    }),
  );
export type Ec2SecurityGroupsCreateOrReplaceInput =
  typeof Ec2SecurityGroupsCreateOrReplaceInput.Type;

// Output Schema
export const Ec2SecurityGroupsCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type Ec2SecurityGroupsCreateOrReplaceOutput =
  typeof Ec2SecurityGroupsCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a Ec2SecurityGroup. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Ec2SecurityGroup
 */
export const Ec2SecurityGroupsCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: Ec2SecurityGroupsCreateOrReplaceInput,
    outputSchema: Ec2SecurityGroupsCreateOrReplaceOutput,
  }));
// Input Schema
export const Ec2SecurityGroupsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2SecurityGroups/{name}",
    }),
  );
export type Ec2SecurityGroupsDeleteInput =
  typeof Ec2SecurityGroupsDeleteInput.Type;

// Output Schema
export const Ec2SecurityGroupsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type Ec2SecurityGroupsDeleteOutput =
  typeof Ec2SecurityGroupsDeleteOutput.Type;

// The operation
/**
 * Delete a Ec2SecurityGroup
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Ec2SecurityGroup
 */
export const Ec2SecurityGroupsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: Ec2SecurityGroupsDeleteInput,
    outputSchema: Ec2SecurityGroupsDeleteOutput,
  }),
);
// Input Schema
export const Ec2SecurityGroupsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2SecurityGroups/{name}",
    }),
  );
export type Ec2SecurityGroupsGetInput = typeof Ec2SecurityGroupsGetInput.Type;

// Output Schema
export const Ec2SecurityGroupsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type Ec2SecurityGroupsGetOutput = typeof Ec2SecurityGroupsGetOutput.Type;

// The operation
/**
 * Get a Ec2SecurityGroup
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Ec2SecurityGroup
 */
export const Ec2SecurityGroupsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: Ec2SecurityGroupsGetInput,
    outputSchema: Ec2SecurityGroupsGetOutput,
  }),
);
// Input Schema
export const Ec2SecurityGroupsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2SecurityGroups",
    }),
  );
export type Ec2SecurityGroupsListByResourceGroupInput =
  typeof Ec2SecurityGroupsListByResourceGroupInput.Type;

// Output Schema
export const Ec2SecurityGroupsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type Ec2SecurityGroupsListByResourceGroupOutput =
  typeof Ec2SecurityGroupsListByResourceGroupOutput.Type;

// The operation
/**
 * List Ec2SecurityGroup resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const Ec2SecurityGroupsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: Ec2SecurityGroupsListByResourceGroupInput,
    outputSchema: Ec2SecurityGroupsListByResourceGroupOutput,
  }));
// Input Schema
export const Ec2SecurityGroupsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/ec2SecurityGroups",
    }),
  );
export type Ec2SecurityGroupsListBySubscriptionInput =
  typeof Ec2SecurityGroupsListBySubscriptionInput.Type;

// Output Schema
export const Ec2SecurityGroupsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type Ec2SecurityGroupsListBySubscriptionOutput =
  typeof Ec2SecurityGroupsListBySubscriptionOutput.Type;

// The operation
/**
 * List Ec2SecurityGroup resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const Ec2SecurityGroupsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: Ec2SecurityGroupsListBySubscriptionInput,
    outputSchema: Ec2SecurityGroupsListBySubscriptionOutput,
  }));
// Input Schema
export const Ec2SecurityGroupsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2SecurityGroups/{name}",
    }),
  );
export type Ec2SecurityGroupsUpdateInput =
  typeof Ec2SecurityGroupsUpdateInput.Type;

// Output Schema
export const Ec2SecurityGroupsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type Ec2SecurityGroupsUpdateOutput =
  typeof Ec2SecurityGroupsUpdateOutput.Type;

// The operation
/**
 * Update a Ec2SecurityGroup
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Ec2SecurityGroup
 */
export const Ec2SecurityGroupsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: Ec2SecurityGroupsUpdateInput,
    outputSchema: Ec2SecurityGroupsUpdateOutput,
  }),
);
// Input Schema
export const Ec2SnapshotsCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2Snapshots/{name}",
    }),
  );
export type Ec2SnapshotsCreateOrReplaceInput =
  typeof Ec2SnapshotsCreateOrReplaceInput.Type;

// Output Schema
export const Ec2SnapshotsCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type Ec2SnapshotsCreateOrReplaceOutput =
  typeof Ec2SnapshotsCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a Ec2Snapshot. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Ec2Snapshot
 */
export const Ec2SnapshotsCreateOrReplace = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: Ec2SnapshotsCreateOrReplaceInput,
    outputSchema: Ec2SnapshotsCreateOrReplaceOutput,
  }),
);
// Input Schema
export const Ec2SnapshotsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2Snapshots/{name}",
    }),
  );
export type Ec2SnapshotsDeleteInput = typeof Ec2SnapshotsDeleteInput.Type;

// Output Schema
export const Ec2SnapshotsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type Ec2SnapshotsDeleteOutput = typeof Ec2SnapshotsDeleteOutput.Type;

// The operation
/**
 * Delete a Ec2Snapshot
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Ec2Snapshot
 */
export const Ec2SnapshotsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: Ec2SnapshotsDeleteInput,
  outputSchema: Ec2SnapshotsDeleteOutput,
}));
// Input Schema
export const Ec2SnapshotsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  name: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2Snapshots/{name}",
  }),
);
export type Ec2SnapshotsGetInput = typeof Ec2SnapshotsGetInput.Type;

// Output Schema
export const Ec2SnapshotsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type Ec2SnapshotsGetOutput = typeof Ec2SnapshotsGetOutput.Type;

// The operation
/**
 * Get a Ec2Snapshot
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Ec2Snapshot
 */
export const Ec2SnapshotsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: Ec2SnapshotsGetInput,
  outputSchema: Ec2SnapshotsGetOutput,
}));
// Input Schema
export const Ec2SnapshotsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2Snapshots",
    }),
  );
export type Ec2SnapshotsListByResourceGroupInput =
  typeof Ec2SnapshotsListByResourceGroupInput.Type;

// Output Schema
export const Ec2SnapshotsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type Ec2SnapshotsListByResourceGroupOutput =
  typeof Ec2SnapshotsListByResourceGroupOutput.Type;

// The operation
/**
 * List Ec2Snapshot resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const Ec2SnapshotsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: Ec2SnapshotsListByResourceGroupInput,
    outputSchema: Ec2SnapshotsListByResourceGroupOutput,
  }));
// Input Schema
export const Ec2SnapshotsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/ec2Snapshots",
    }),
  );
export type Ec2SnapshotsListBySubscriptionInput =
  typeof Ec2SnapshotsListBySubscriptionInput.Type;

// Output Schema
export const Ec2SnapshotsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type Ec2SnapshotsListBySubscriptionOutput =
  typeof Ec2SnapshotsListBySubscriptionOutput.Type;

// The operation
/**
 * List Ec2Snapshot resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const Ec2SnapshotsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: Ec2SnapshotsListBySubscriptionInput,
    outputSchema: Ec2SnapshotsListBySubscriptionOutput,
  }));
// Input Schema
export const Ec2SnapshotsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2Snapshots/{name}",
    }),
  );
export type Ec2SnapshotsUpdateInput = typeof Ec2SnapshotsUpdateInput.Type;

// Output Schema
export const Ec2SnapshotsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type Ec2SnapshotsUpdateOutput = typeof Ec2SnapshotsUpdateOutput.Type;

// The operation
/**
 * Update a Ec2Snapshot
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Ec2Snapshot
 */
export const Ec2SnapshotsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: Ec2SnapshotsUpdateInput,
  outputSchema: Ec2SnapshotsUpdateOutput,
}));
// Input Schema
export const Ec2SubnetsCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2Subnets/{name}",
    }),
  );
export type Ec2SubnetsCreateOrReplaceInput =
  typeof Ec2SubnetsCreateOrReplaceInput.Type;

// Output Schema
export const Ec2SubnetsCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type Ec2SubnetsCreateOrReplaceOutput =
  typeof Ec2SubnetsCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a Ec2Subnet. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Ec2Subnet
 */
export const Ec2SubnetsCreateOrReplace = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: Ec2SubnetsCreateOrReplaceInput,
    outputSchema: Ec2SubnetsCreateOrReplaceOutput,
  }),
);
// Input Schema
export const Ec2SubnetsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  name: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2Subnets/{name}",
  }),
);
export type Ec2SubnetsDeleteInput = typeof Ec2SubnetsDeleteInput.Type;

// Output Schema
export const Ec2SubnetsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type Ec2SubnetsDeleteOutput = typeof Ec2SubnetsDeleteOutput.Type;

// The operation
/**
 * Delete a Ec2Subnet
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Ec2Subnet
 */
export const Ec2SubnetsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: Ec2SubnetsDeleteInput,
  outputSchema: Ec2SubnetsDeleteOutput,
}));
// Input Schema
export const Ec2SubnetsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  name: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2Subnets/{name}",
  }),
);
export type Ec2SubnetsGetInput = typeof Ec2SubnetsGetInput.Type;

// Output Schema
export const Ec2SubnetsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type Ec2SubnetsGetOutput = typeof Ec2SubnetsGetOutput.Type;

// The operation
/**
 * Get a Ec2Subnet
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Ec2Subnet
 */
export const Ec2SubnetsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: Ec2SubnetsGetInput,
  outputSchema: Ec2SubnetsGetOutput,
}));
// Input Schema
export const Ec2SubnetsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2Subnets",
    }),
  );
export type Ec2SubnetsListByResourceGroupInput =
  typeof Ec2SubnetsListByResourceGroupInput.Type;

// Output Schema
export const Ec2SubnetsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type Ec2SubnetsListByResourceGroupOutput =
  typeof Ec2SubnetsListByResourceGroupOutput.Type;

// The operation
/**
 * List Ec2Subnet resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const Ec2SubnetsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: Ec2SubnetsListByResourceGroupInput,
    outputSchema: Ec2SubnetsListByResourceGroupOutput,
  }));
// Input Schema
export const Ec2SubnetsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/ec2Subnets",
    }),
  );
export type Ec2SubnetsListBySubscriptionInput =
  typeof Ec2SubnetsListBySubscriptionInput.Type;

// Output Schema
export const Ec2SubnetsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type Ec2SubnetsListBySubscriptionOutput =
  typeof Ec2SubnetsListBySubscriptionOutput.Type;

// The operation
/**
 * List Ec2Subnet resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const Ec2SubnetsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: Ec2SubnetsListBySubscriptionInput,
    outputSchema: Ec2SubnetsListBySubscriptionOutput,
  }));
// Input Schema
export const Ec2SubnetsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  name: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2Subnets/{name}",
  }),
);
export type Ec2SubnetsUpdateInput = typeof Ec2SubnetsUpdateInput.Type;

// Output Schema
export const Ec2SubnetsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  },
);
export type Ec2SubnetsUpdateOutput = typeof Ec2SubnetsUpdateOutput.Type;

// The operation
/**
 * Update a Ec2Subnet
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Ec2Subnet
 */
export const Ec2SubnetsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: Ec2SubnetsUpdateInput,
  outputSchema: Ec2SubnetsUpdateOutput,
}));
// Input Schema
export const Ec2VolumesCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2Volumes/{name}",
    }),
  );
export type Ec2VolumesCreateOrReplaceInput =
  typeof Ec2VolumesCreateOrReplaceInput.Type;

// Output Schema
export const Ec2VolumesCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type Ec2VolumesCreateOrReplaceOutput =
  typeof Ec2VolumesCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a Ec2Volume. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Ec2Volume
 */
export const Ec2VolumesCreateOrReplace = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: Ec2VolumesCreateOrReplaceInput,
    outputSchema: Ec2VolumesCreateOrReplaceOutput,
  }),
);
// Input Schema
export const Ec2VolumesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  name: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2Volumes/{name}",
  }),
);
export type Ec2VolumesDeleteInput = typeof Ec2VolumesDeleteInput.Type;

// Output Schema
export const Ec2VolumesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type Ec2VolumesDeleteOutput = typeof Ec2VolumesDeleteOutput.Type;

// The operation
/**
 * Delete a Ec2Volume
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Ec2Volume
 */
export const Ec2VolumesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: Ec2VolumesDeleteInput,
  outputSchema: Ec2VolumesDeleteOutput,
}));
// Input Schema
export const Ec2VolumesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  name: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2Volumes/{name}",
  }),
);
export type Ec2VolumesGetInput = typeof Ec2VolumesGetInput.Type;

// Output Schema
export const Ec2VolumesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type Ec2VolumesGetOutput = typeof Ec2VolumesGetOutput.Type;

// The operation
/**
 * Get a Ec2Volume
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Ec2Volume
 */
export const Ec2VolumesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: Ec2VolumesGetInput,
  outputSchema: Ec2VolumesGetOutput,
}));
// Input Schema
export const Ec2VolumesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2Volumes",
    }),
  );
export type Ec2VolumesListByResourceGroupInput =
  typeof Ec2VolumesListByResourceGroupInput.Type;

// Output Schema
export const Ec2VolumesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type Ec2VolumesListByResourceGroupOutput =
  typeof Ec2VolumesListByResourceGroupOutput.Type;

// The operation
/**
 * List Ec2Volume resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const Ec2VolumesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: Ec2VolumesListByResourceGroupInput,
    outputSchema: Ec2VolumesListByResourceGroupOutput,
  }));
// Input Schema
export const Ec2VolumesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/ec2Volumes",
    }),
  );
export type Ec2VolumesListBySubscriptionInput =
  typeof Ec2VolumesListBySubscriptionInput.Type;

// Output Schema
export const Ec2VolumesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type Ec2VolumesListBySubscriptionOutput =
  typeof Ec2VolumesListBySubscriptionOutput.Type;

// The operation
/**
 * List Ec2Volume resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const Ec2VolumesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: Ec2VolumesListBySubscriptionInput,
    outputSchema: Ec2VolumesListBySubscriptionOutput,
  }));
// Input Schema
export const Ec2VolumesUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  name: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2Volumes/{name}",
  }),
);
export type Ec2VolumesUpdateInput = typeof Ec2VolumesUpdateInput.Type;

// Output Schema
export const Ec2VolumesUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  },
);
export type Ec2VolumesUpdateOutput = typeof Ec2VolumesUpdateOutput.Type;

// The operation
/**
 * Update a Ec2Volume
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Ec2Volume
 */
export const Ec2VolumesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: Ec2VolumesUpdateInput,
  outputSchema: Ec2VolumesUpdateOutput,
}));
// Input Schema
export const Ec2VpcEndpointsCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2VPCEndpoints/{name}",
    }),
  );
export type Ec2VpcEndpointsCreateOrReplaceInput =
  typeof Ec2VpcEndpointsCreateOrReplaceInput.Type;

// Output Schema
export const Ec2VpcEndpointsCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type Ec2VpcEndpointsCreateOrReplaceOutput =
  typeof Ec2VpcEndpointsCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a Ec2VPCEndpoint. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Ec2VPCEndpoint
 */
export const Ec2VpcEndpointsCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: Ec2VpcEndpointsCreateOrReplaceInput,
    outputSchema: Ec2VpcEndpointsCreateOrReplaceOutput,
  }));
// Input Schema
export const Ec2VpcEndpointsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2VPCEndpoints/{name}",
    }),
  );
export type Ec2VpcEndpointsDeleteInput = typeof Ec2VpcEndpointsDeleteInput.Type;

// Output Schema
export const Ec2VpcEndpointsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type Ec2VpcEndpointsDeleteOutput =
  typeof Ec2VpcEndpointsDeleteOutput.Type;

// The operation
/**
 * Delete a Ec2VPCEndpoint
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Ec2VPCEndpoint
 */
export const Ec2VpcEndpointsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: Ec2VpcEndpointsDeleteInput,
    outputSchema: Ec2VpcEndpointsDeleteOutput,
  }),
);
// Input Schema
export const Ec2VpcEndpointsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2VPCEndpoints/{name}",
    }),
  );
export type Ec2VpcEndpointsGetInput = typeof Ec2VpcEndpointsGetInput.Type;

// Output Schema
export const Ec2VpcEndpointsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type Ec2VpcEndpointsGetOutput = typeof Ec2VpcEndpointsGetOutput.Type;

// The operation
/**
 * Get a Ec2VPCEndpoint
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Ec2VPCEndpoint
 */
export const Ec2VpcEndpointsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: Ec2VpcEndpointsGetInput,
  outputSchema: Ec2VpcEndpointsGetOutput,
}));
// Input Schema
export const Ec2VpcEndpointsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2VPCEndpoints",
    }),
  );
export type Ec2VpcEndpointsListByResourceGroupInput =
  typeof Ec2VpcEndpointsListByResourceGroupInput.Type;

// Output Schema
export const Ec2VpcEndpointsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type Ec2VpcEndpointsListByResourceGroupOutput =
  typeof Ec2VpcEndpointsListByResourceGroupOutput.Type;

// The operation
/**
 * List Ec2VPCEndpoint resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const Ec2VpcEndpointsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: Ec2VpcEndpointsListByResourceGroupInput,
    outputSchema: Ec2VpcEndpointsListByResourceGroupOutput,
  }));
// Input Schema
export const Ec2VpcEndpointsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/ec2VPCEndpoints",
    }),
  );
export type Ec2VpcEndpointsListBySubscriptionInput =
  typeof Ec2VpcEndpointsListBySubscriptionInput.Type;

// Output Schema
export const Ec2VpcEndpointsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type Ec2VpcEndpointsListBySubscriptionOutput =
  typeof Ec2VpcEndpointsListBySubscriptionOutput.Type;

// The operation
/**
 * List Ec2VPCEndpoint resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const Ec2VpcEndpointsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: Ec2VpcEndpointsListBySubscriptionInput,
    outputSchema: Ec2VpcEndpointsListBySubscriptionOutput,
  }));
// Input Schema
export const Ec2VpcEndpointsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2VPCEndpoints/{name}",
    }),
  );
export type Ec2VpcEndpointsUpdateInput = typeof Ec2VpcEndpointsUpdateInput.Type;

// Output Schema
export const Ec2VpcEndpointsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type Ec2VpcEndpointsUpdateOutput =
  typeof Ec2VpcEndpointsUpdateOutput.Type;

// The operation
/**
 * Update a Ec2VPCEndpoint
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Ec2VPCEndpoint
 */
export const Ec2VpcEndpointsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: Ec2VpcEndpointsUpdateInput,
    outputSchema: Ec2VpcEndpointsUpdateOutput,
  }),
);
// Input Schema
export const Ec2VpcPeeringConnectionsCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2VPCPeeringConnections/{name}",
    }),
  );
export type Ec2VpcPeeringConnectionsCreateOrReplaceInput =
  typeof Ec2VpcPeeringConnectionsCreateOrReplaceInput.Type;

// Output Schema
export const Ec2VpcPeeringConnectionsCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type Ec2VpcPeeringConnectionsCreateOrReplaceOutput =
  typeof Ec2VpcPeeringConnectionsCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a Ec2VPCPeeringConnection. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Ec2VPCPeeringConnection
 */
export const Ec2VpcPeeringConnectionsCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: Ec2VpcPeeringConnectionsCreateOrReplaceInput,
    outputSchema: Ec2VpcPeeringConnectionsCreateOrReplaceOutput,
  }));
// Input Schema
export const Ec2VpcPeeringConnectionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2VPCPeeringConnections/{name}",
    }),
  );
export type Ec2VpcPeeringConnectionsDeleteInput =
  typeof Ec2VpcPeeringConnectionsDeleteInput.Type;

// Output Schema
export const Ec2VpcPeeringConnectionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type Ec2VpcPeeringConnectionsDeleteOutput =
  typeof Ec2VpcPeeringConnectionsDeleteOutput.Type;

// The operation
/**
 * Delete a Ec2VPCPeeringConnection
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Ec2VPCPeeringConnection
 */
export const Ec2VpcPeeringConnectionsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: Ec2VpcPeeringConnectionsDeleteInput,
    outputSchema: Ec2VpcPeeringConnectionsDeleteOutput,
  }));
// Input Schema
export const Ec2VpcPeeringConnectionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2VPCPeeringConnections/{name}",
    }),
  );
export type Ec2VpcPeeringConnectionsGetInput =
  typeof Ec2VpcPeeringConnectionsGetInput.Type;

// Output Schema
export const Ec2VpcPeeringConnectionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type Ec2VpcPeeringConnectionsGetOutput =
  typeof Ec2VpcPeeringConnectionsGetOutput.Type;

// The operation
/**
 * Get a Ec2VPCPeeringConnection
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Ec2VPCPeeringConnection
 */
export const Ec2VpcPeeringConnectionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: Ec2VpcPeeringConnectionsGetInput,
    outputSchema: Ec2VpcPeeringConnectionsGetOutput,
  }),
);
// Input Schema
export const Ec2VpcPeeringConnectionsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2VPCPeeringConnections",
    }),
  );
export type Ec2VpcPeeringConnectionsListByResourceGroupInput =
  typeof Ec2VpcPeeringConnectionsListByResourceGroupInput.Type;

// Output Schema
export const Ec2VpcPeeringConnectionsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type Ec2VpcPeeringConnectionsListByResourceGroupOutput =
  typeof Ec2VpcPeeringConnectionsListByResourceGroupOutput.Type;

// The operation
/**
 * List Ec2VPCPeeringConnection resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const Ec2VpcPeeringConnectionsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: Ec2VpcPeeringConnectionsListByResourceGroupInput,
    outputSchema: Ec2VpcPeeringConnectionsListByResourceGroupOutput,
  }));
// Input Schema
export const Ec2VpcPeeringConnectionsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/ec2VPCPeeringConnections",
    }),
  );
export type Ec2VpcPeeringConnectionsListBySubscriptionInput =
  typeof Ec2VpcPeeringConnectionsListBySubscriptionInput.Type;

// Output Schema
export const Ec2VpcPeeringConnectionsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type Ec2VpcPeeringConnectionsListBySubscriptionOutput =
  typeof Ec2VpcPeeringConnectionsListBySubscriptionOutput.Type;

// The operation
/**
 * List Ec2VPCPeeringConnection resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const Ec2VpcPeeringConnectionsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: Ec2VpcPeeringConnectionsListBySubscriptionInput,
    outputSchema: Ec2VpcPeeringConnectionsListBySubscriptionOutput,
  }));
// Input Schema
export const Ec2VpcPeeringConnectionsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2VPCPeeringConnections/{name}",
    }),
  );
export type Ec2VpcPeeringConnectionsUpdateInput =
  typeof Ec2VpcPeeringConnectionsUpdateInput.Type;

// Output Schema
export const Ec2VpcPeeringConnectionsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type Ec2VpcPeeringConnectionsUpdateOutput =
  typeof Ec2VpcPeeringConnectionsUpdateOutput.Type;

// The operation
/**
 * Update a Ec2VPCPeeringConnection
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Ec2VPCPeeringConnection
 */
export const Ec2VpcPeeringConnectionsUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: Ec2VpcPeeringConnectionsUpdateInput,
    outputSchema: Ec2VpcPeeringConnectionsUpdateOutput,
  }));
// Input Schema
export const Ec2VpcsCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2Vpcs/{name}",
    }),
  );
export type Ec2VpcsCreateOrReplaceInput =
  typeof Ec2VpcsCreateOrReplaceInput.Type;

// Output Schema
export const Ec2VpcsCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type Ec2VpcsCreateOrReplaceOutput =
  typeof Ec2VpcsCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a Ec2Vpc. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Ec2Vpc
 */
export const Ec2VpcsCreateOrReplace = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: Ec2VpcsCreateOrReplaceInput,
    outputSchema: Ec2VpcsCreateOrReplaceOutput,
  }),
);
// Input Schema
export const Ec2VpcsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  name: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2Vpcs/{name}",
  }),
);
export type Ec2VpcsDeleteInput = typeof Ec2VpcsDeleteInput.Type;

// Output Schema
export const Ec2VpcsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type Ec2VpcsDeleteOutput = typeof Ec2VpcsDeleteOutput.Type;

// The operation
/**
 * Delete a Ec2Vpc
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Ec2Vpc
 */
export const Ec2VpcsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: Ec2VpcsDeleteInput,
  outputSchema: Ec2VpcsDeleteOutput,
}));
// Input Schema
export const Ec2VpcsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  name: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2Vpcs/{name}",
  }),
);
export type Ec2VpcsGetInput = typeof Ec2VpcsGetInput.Type;

// Output Schema
export const Ec2VpcsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type Ec2VpcsGetOutput = typeof Ec2VpcsGetOutput.Type;

// The operation
/**
 * Get a Ec2Vpc
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Ec2Vpc
 */
export const Ec2VpcsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: Ec2VpcsGetInput,
  outputSchema: Ec2VpcsGetOutput,
}));
// Input Schema
export const Ec2VpcsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2Vpcs",
    }),
  );
export type Ec2VpcsListByResourceGroupInput =
  typeof Ec2VpcsListByResourceGroupInput.Type;

// Output Schema
export const Ec2VpcsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type Ec2VpcsListByResourceGroupOutput =
  typeof Ec2VpcsListByResourceGroupOutput.Type;

// The operation
/**
 * List Ec2Vpc resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const Ec2VpcsListByResourceGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: Ec2VpcsListByResourceGroupInput,
    outputSchema: Ec2VpcsListByResourceGroupOutput,
  }),
);
// Input Schema
export const Ec2VpcsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/ec2Vpcs",
    }),
  );
export type Ec2VpcsListBySubscriptionInput =
  typeof Ec2VpcsListBySubscriptionInput.Type;

// Output Schema
export const Ec2VpcsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type Ec2VpcsListBySubscriptionOutput =
  typeof Ec2VpcsListBySubscriptionOutput.Type;

// The operation
/**
 * List Ec2Vpc resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const Ec2VpcsListBySubscription = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: Ec2VpcsListBySubscriptionInput,
    outputSchema: Ec2VpcsListBySubscriptionOutput,
  }),
);
// Input Schema
export const Ec2VpcsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  name: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ec2Vpcs/{name}",
  }),
);
export type Ec2VpcsUpdateInput = typeof Ec2VpcsUpdateInput.Type;

// Output Schema
export const Ec2VpcsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type Ec2VpcsUpdateOutput = typeof Ec2VpcsUpdateOutput.Type;

// The operation
/**
 * Update a Ec2Vpc
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Ec2Vpc
 */
export const Ec2VpcsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: Ec2VpcsUpdateInput,
  outputSchema: Ec2VpcsUpdateOutput,
}));
// Input Schema
export const EcrImageDetailsCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ecrImageDetails/{name}",
    }),
  );
export type EcrImageDetailsCreateOrReplaceInput =
  typeof EcrImageDetailsCreateOrReplaceInput.Type;

// Output Schema
export const EcrImageDetailsCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type EcrImageDetailsCreateOrReplaceOutput =
  typeof EcrImageDetailsCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a EcrImageDetail. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of EcrImageDetail
 */
export const EcrImageDetailsCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: EcrImageDetailsCreateOrReplaceInput,
    outputSchema: EcrImageDetailsCreateOrReplaceOutput,
  }));
// Input Schema
export const EcrImageDetailsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ecrImageDetails/{name}",
    }),
  );
export type EcrImageDetailsDeleteInput = typeof EcrImageDetailsDeleteInput.Type;

// Output Schema
export const EcrImageDetailsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type EcrImageDetailsDeleteOutput =
  typeof EcrImageDetailsDeleteOutput.Type;

// The operation
/**
 * Delete a EcrImageDetail
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of EcrImageDetail
 */
export const EcrImageDetailsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: EcrImageDetailsDeleteInput,
    outputSchema: EcrImageDetailsDeleteOutput,
  }),
);
// Input Schema
export const EcrImageDetailsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ecrImageDetails/{name}",
    }),
  );
export type EcrImageDetailsGetInput = typeof EcrImageDetailsGetInput.Type;

// Output Schema
export const EcrImageDetailsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type EcrImageDetailsGetOutput = typeof EcrImageDetailsGetOutput.Type;

// The operation
/**
 * Get a EcrImageDetail
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of EcrImageDetail
 */
export const EcrImageDetailsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: EcrImageDetailsGetInput,
  outputSchema: EcrImageDetailsGetOutput,
}));
// Input Schema
export const EcrImageDetailsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ecrImageDetails",
    }),
  );
export type EcrImageDetailsListByResourceGroupInput =
  typeof EcrImageDetailsListByResourceGroupInput.Type;

// Output Schema
export const EcrImageDetailsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type EcrImageDetailsListByResourceGroupOutput =
  typeof EcrImageDetailsListByResourceGroupOutput.Type;

// The operation
/**
 * List EcrImageDetail resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const EcrImageDetailsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: EcrImageDetailsListByResourceGroupInput,
    outputSchema: EcrImageDetailsListByResourceGroupOutput,
  }));
// Input Schema
export const EcrImageDetailsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/ecrImageDetails",
    }),
  );
export type EcrImageDetailsListBySubscriptionInput =
  typeof EcrImageDetailsListBySubscriptionInput.Type;

// Output Schema
export const EcrImageDetailsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type EcrImageDetailsListBySubscriptionOutput =
  typeof EcrImageDetailsListBySubscriptionOutput.Type;

// The operation
/**
 * List EcrImageDetail resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const EcrImageDetailsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: EcrImageDetailsListBySubscriptionInput,
    outputSchema: EcrImageDetailsListBySubscriptionOutput,
  }));
// Input Schema
export const EcrImageDetailsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ecrImageDetails/{name}",
    }),
  );
export type EcrImageDetailsUpdateInput = typeof EcrImageDetailsUpdateInput.Type;

// Output Schema
export const EcrImageDetailsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type EcrImageDetailsUpdateOutput =
  typeof EcrImageDetailsUpdateOutput.Type;

// The operation
/**
 * Update a EcrImageDetail
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of EcrImageDetail
 */
export const EcrImageDetailsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: EcrImageDetailsUpdateInput,
    outputSchema: EcrImageDetailsUpdateOutput,
  }),
);
// Input Schema
export const EcrRepositoriesCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ecrRepositories/{name}",
    }),
  );
export type EcrRepositoriesCreateOrReplaceInput =
  typeof EcrRepositoriesCreateOrReplaceInput.Type;

// Output Schema
export const EcrRepositoriesCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type EcrRepositoriesCreateOrReplaceOutput =
  typeof EcrRepositoriesCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a EcrRepository. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of EcrRepository
 */
export const EcrRepositoriesCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: EcrRepositoriesCreateOrReplaceInput,
    outputSchema: EcrRepositoriesCreateOrReplaceOutput,
  }));
// Input Schema
export const EcrRepositoriesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ecrRepositories/{name}",
    }),
  );
export type EcrRepositoriesDeleteInput = typeof EcrRepositoriesDeleteInput.Type;

// Output Schema
export const EcrRepositoriesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type EcrRepositoriesDeleteOutput =
  typeof EcrRepositoriesDeleteOutput.Type;

// The operation
/**
 * Delete a EcrRepository
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of EcrRepository
 */
export const EcrRepositoriesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: EcrRepositoriesDeleteInput,
    outputSchema: EcrRepositoriesDeleteOutput,
  }),
);
// Input Schema
export const EcrRepositoriesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ecrRepositories/{name}",
    }),
  );
export type EcrRepositoriesGetInput = typeof EcrRepositoriesGetInput.Type;

// Output Schema
export const EcrRepositoriesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type EcrRepositoriesGetOutput = typeof EcrRepositoriesGetOutput.Type;

// The operation
/**
 * Get a EcrRepository
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of EcrRepository
 */
export const EcrRepositoriesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: EcrRepositoriesGetInput,
  outputSchema: EcrRepositoriesGetOutput,
}));
// Input Schema
export const EcrRepositoriesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ecrRepositories",
    }),
  );
export type EcrRepositoriesListByResourceGroupInput =
  typeof EcrRepositoriesListByResourceGroupInput.Type;

// Output Schema
export const EcrRepositoriesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type EcrRepositoriesListByResourceGroupOutput =
  typeof EcrRepositoriesListByResourceGroupOutput.Type;

// The operation
/**
 * List EcrRepository resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const EcrRepositoriesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: EcrRepositoriesListByResourceGroupInput,
    outputSchema: EcrRepositoriesListByResourceGroupOutput,
  }));
// Input Schema
export const EcrRepositoriesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/ecrRepositories",
    }),
  );
export type EcrRepositoriesListBySubscriptionInput =
  typeof EcrRepositoriesListBySubscriptionInput.Type;

// Output Schema
export const EcrRepositoriesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type EcrRepositoriesListBySubscriptionOutput =
  typeof EcrRepositoriesListBySubscriptionOutput.Type;

// The operation
/**
 * List EcrRepository resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const EcrRepositoriesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: EcrRepositoriesListBySubscriptionInput,
    outputSchema: EcrRepositoriesListBySubscriptionOutput,
  }));
// Input Schema
export const EcrRepositoriesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ecrRepositories/{name}",
    }),
  );
export type EcrRepositoriesUpdateInput = typeof EcrRepositoriesUpdateInput.Type;

// Output Schema
export const EcrRepositoriesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type EcrRepositoriesUpdateOutput =
  typeof EcrRepositoriesUpdateOutput.Type;

// The operation
/**
 * Update a EcrRepository
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of EcrRepository
 */
export const EcrRepositoriesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: EcrRepositoriesUpdateInput,
    outputSchema: EcrRepositoriesUpdateOutput,
  }),
);
// Input Schema
export const EcsClustersCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ecsClusters/{name}",
    }),
  );
export type EcsClustersCreateOrReplaceInput =
  typeof EcsClustersCreateOrReplaceInput.Type;

// Output Schema
export const EcsClustersCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type EcsClustersCreateOrReplaceOutput =
  typeof EcsClustersCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a EcsCluster. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of EcsCluster
 */
export const EcsClustersCreateOrReplace = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: EcsClustersCreateOrReplaceInput,
    outputSchema: EcsClustersCreateOrReplaceOutput,
  }),
);
// Input Schema
export const EcsClustersDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ecsClusters/{name}",
  }),
);
export type EcsClustersDeleteInput = typeof EcsClustersDeleteInput.Type;

// Output Schema
export const EcsClustersDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type EcsClustersDeleteOutput = typeof EcsClustersDeleteOutput.Type;

// The operation
/**
 * Delete a EcsCluster
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of EcsCluster
 */
export const EcsClustersDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: EcsClustersDeleteInput,
  outputSchema: EcsClustersDeleteOutput,
}));
// Input Schema
export const EcsClustersGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  name: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ecsClusters/{name}",
  }),
);
export type EcsClustersGetInput = typeof EcsClustersGetInput.Type;

// Output Schema
export const EcsClustersGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type EcsClustersGetOutput = typeof EcsClustersGetOutput.Type;

// The operation
/**
 * Get a EcsCluster
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of EcsCluster
 */
export const EcsClustersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: EcsClustersGetInput,
  outputSchema: EcsClustersGetOutput,
}));
// Input Schema
export const EcsClustersListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ecsClusters",
    }),
  );
export type EcsClustersListByResourceGroupInput =
  typeof EcsClustersListByResourceGroupInput.Type;

// Output Schema
export const EcsClustersListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type EcsClustersListByResourceGroupOutput =
  typeof EcsClustersListByResourceGroupOutput.Type;

// The operation
/**
 * List EcsCluster resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const EcsClustersListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: EcsClustersListByResourceGroupInput,
    outputSchema: EcsClustersListByResourceGroupOutput,
  }));
// Input Schema
export const EcsClustersListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/ecsClusters",
    }),
  );
export type EcsClustersListBySubscriptionInput =
  typeof EcsClustersListBySubscriptionInput.Type;

// Output Schema
export const EcsClustersListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type EcsClustersListBySubscriptionOutput =
  typeof EcsClustersListBySubscriptionOutput.Type;

// The operation
/**
 * List EcsCluster resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const EcsClustersListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: EcsClustersListBySubscriptionInput,
    outputSchema: EcsClustersListBySubscriptionOutput,
  }));
// Input Schema
export const EcsClustersUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ecsClusters/{name}",
  }),
);
export type EcsClustersUpdateInput = typeof EcsClustersUpdateInput.Type;

// Output Schema
export const EcsClustersUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type EcsClustersUpdateOutput = typeof EcsClustersUpdateOutput.Type;

// The operation
/**
 * Update a EcsCluster
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of EcsCluster
 */
export const EcsClustersUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: EcsClustersUpdateInput,
  outputSchema: EcsClustersUpdateOutput,
}));
// Input Schema
export const EcsServicesCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ecsServices/{name}",
    }),
  );
export type EcsServicesCreateOrReplaceInput =
  typeof EcsServicesCreateOrReplaceInput.Type;

// Output Schema
export const EcsServicesCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type EcsServicesCreateOrReplaceOutput =
  typeof EcsServicesCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a EcsService. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of EcsService
 */
export const EcsServicesCreateOrReplace = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: EcsServicesCreateOrReplaceInput,
    outputSchema: EcsServicesCreateOrReplaceOutput,
  }),
);
// Input Schema
export const EcsServicesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ecsServices/{name}",
  }),
);
export type EcsServicesDeleteInput = typeof EcsServicesDeleteInput.Type;

// Output Schema
export const EcsServicesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type EcsServicesDeleteOutput = typeof EcsServicesDeleteOutput.Type;

// The operation
/**
 * Delete a EcsService
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of EcsService
 */
export const EcsServicesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: EcsServicesDeleteInput,
  outputSchema: EcsServicesDeleteOutput,
}));
// Input Schema
export const EcsServicesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  name: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ecsServices/{name}",
  }),
);
export type EcsServicesGetInput = typeof EcsServicesGetInput.Type;

// Output Schema
export const EcsServicesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type EcsServicesGetOutput = typeof EcsServicesGetOutput.Type;

// The operation
/**
 * Get a EcsService
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of EcsService
 */
export const EcsServicesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: EcsServicesGetInput,
  outputSchema: EcsServicesGetOutput,
}));
// Input Schema
export const EcsServicesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ecsServices",
    }),
  );
export type EcsServicesListByResourceGroupInput =
  typeof EcsServicesListByResourceGroupInput.Type;

// Output Schema
export const EcsServicesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type EcsServicesListByResourceGroupOutput =
  typeof EcsServicesListByResourceGroupOutput.Type;

// The operation
/**
 * List EcsService resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const EcsServicesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: EcsServicesListByResourceGroupInput,
    outputSchema: EcsServicesListByResourceGroupOutput,
  }));
// Input Schema
export const EcsServicesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/ecsServices",
    }),
  );
export type EcsServicesListBySubscriptionInput =
  typeof EcsServicesListBySubscriptionInput.Type;

// Output Schema
export const EcsServicesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type EcsServicesListBySubscriptionOutput =
  typeof EcsServicesListBySubscriptionOutput.Type;

// The operation
/**
 * List EcsService resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const EcsServicesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: EcsServicesListBySubscriptionInput,
    outputSchema: EcsServicesListBySubscriptionOutput,
  }));
// Input Schema
export const EcsServicesUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ecsServices/{name}",
  }),
);
export type EcsServicesUpdateInput = typeof EcsServicesUpdateInput.Type;

// Output Schema
export const EcsServicesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type EcsServicesUpdateOutput = typeof EcsServicesUpdateOutput.Type;

// The operation
/**
 * Update a EcsService
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of EcsService
 */
export const EcsServicesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: EcsServicesUpdateInput,
  outputSchema: EcsServicesUpdateOutput,
}));
// Input Schema
export const EcsTaskDefinitionsCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ecsTaskDefinitions/{name}",
    }),
  );
export type EcsTaskDefinitionsCreateOrReplaceInput =
  typeof EcsTaskDefinitionsCreateOrReplaceInput.Type;

// Output Schema
export const EcsTaskDefinitionsCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type EcsTaskDefinitionsCreateOrReplaceOutput =
  typeof EcsTaskDefinitionsCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a EcsTaskDefinition. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of EcsTaskDefinition
 */
export const EcsTaskDefinitionsCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: EcsTaskDefinitionsCreateOrReplaceInput,
    outputSchema: EcsTaskDefinitionsCreateOrReplaceOutput,
  }));
// Input Schema
export const EcsTaskDefinitionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ecsTaskDefinitions/{name}",
    }),
  );
export type EcsTaskDefinitionsDeleteInput =
  typeof EcsTaskDefinitionsDeleteInput.Type;

// Output Schema
export const EcsTaskDefinitionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type EcsTaskDefinitionsDeleteOutput =
  typeof EcsTaskDefinitionsDeleteOutput.Type;

// The operation
/**
 * Delete a EcsTaskDefinition
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of EcsTaskDefinition
 */
export const EcsTaskDefinitionsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: EcsTaskDefinitionsDeleteInput,
    outputSchema: EcsTaskDefinitionsDeleteOutput,
  }),
);
// Input Schema
export const EcsTaskDefinitionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ecsTaskDefinitions/{name}",
    }),
  );
export type EcsTaskDefinitionsGetInput = typeof EcsTaskDefinitionsGetInput.Type;

// Output Schema
export const EcsTaskDefinitionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type EcsTaskDefinitionsGetOutput =
  typeof EcsTaskDefinitionsGetOutput.Type;

// The operation
/**
 * Get a EcsTaskDefinition
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of EcsTaskDefinition
 */
export const EcsTaskDefinitionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: EcsTaskDefinitionsGetInput,
    outputSchema: EcsTaskDefinitionsGetOutput,
  }),
);
// Input Schema
export const EcsTaskDefinitionsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ecsTaskDefinitions",
    }),
  );
export type EcsTaskDefinitionsListByResourceGroupInput =
  typeof EcsTaskDefinitionsListByResourceGroupInput.Type;

// Output Schema
export const EcsTaskDefinitionsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type EcsTaskDefinitionsListByResourceGroupOutput =
  typeof EcsTaskDefinitionsListByResourceGroupOutput.Type;

// The operation
/**
 * List EcsTaskDefinition resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const EcsTaskDefinitionsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: EcsTaskDefinitionsListByResourceGroupInput,
    outputSchema: EcsTaskDefinitionsListByResourceGroupOutput,
  }));
// Input Schema
export const EcsTaskDefinitionsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/ecsTaskDefinitions",
    }),
  );
export type EcsTaskDefinitionsListBySubscriptionInput =
  typeof EcsTaskDefinitionsListBySubscriptionInput.Type;

// Output Schema
export const EcsTaskDefinitionsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type EcsTaskDefinitionsListBySubscriptionOutput =
  typeof EcsTaskDefinitionsListBySubscriptionOutput.Type;

// The operation
/**
 * List EcsTaskDefinition resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const EcsTaskDefinitionsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: EcsTaskDefinitionsListBySubscriptionInput,
    outputSchema: EcsTaskDefinitionsListBySubscriptionOutput,
  }));
// Input Schema
export const EcsTaskDefinitionsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ecsTaskDefinitions/{name}",
    }),
  );
export type EcsTaskDefinitionsUpdateInput =
  typeof EcsTaskDefinitionsUpdateInput.Type;

// Output Schema
export const EcsTaskDefinitionsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type EcsTaskDefinitionsUpdateOutput =
  typeof EcsTaskDefinitionsUpdateOutput.Type;

// The operation
/**
 * Update a EcsTaskDefinition
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of EcsTaskDefinition
 */
export const EcsTaskDefinitionsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: EcsTaskDefinitionsUpdateInput,
    outputSchema: EcsTaskDefinitionsUpdateOutput,
  }),
);
// Input Schema
export const EfsFileSystemsCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/efsFileSystems/{name}",
    }),
  );
export type EfsFileSystemsCreateOrReplaceInput =
  typeof EfsFileSystemsCreateOrReplaceInput.Type;

// Output Schema
export const EfsFileSystemsCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type EfsFileSystemsCreateOrReplaceOutput =
  typeof EfsFileSystemsCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a EfsFileSystem. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of EfsFileSystem
 */
export const EfsFileSystemsCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: EfsFileSystemsCreateOrReplaceInput,
    outputSchema: EfsFileSystemsCreateOrReplaceOutput,
  }));
// Input Schema
export const EfsFileSystemsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/efsFileSystems/{name}",
    }),
  );
export type EfsFileSystemsDeleteInput = typeof EfsFileSystemsDeleteInput.Type;

// Output Schema
export const EfsFileSystemsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type EfsFileSystemsDeleteOutput = typeof EfsFileSystemsDeleteOutput.Type;

// The operation
/**
 * Delete a EfsFileSystem
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of EfsFileSystem
 */
export const EfsFileSystemsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: EfsFileSystemsDeleteInput,
    outputSchema: EfsFileSystemsDeleteOutput,
  }),
);
// Input Schema
export const EfsFileSystemsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/efsFileSystems/{name}",
  }),
);
export type EfsFileSystemsGetInput = typeof EfsFileSystemsGetInput.Type;

// Output Schema
export const EfsFileSystemsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type EfsFileSystemsGetOutput = typeof EfsFileSystemsGetOutput.Type;

// The operation
/**
 * Get a EfsFileSystem
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of EfsFileSystem
 */
export const EfsFileSystemsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: EfsFileSystemsGetInput,
  outputSchema: EfsFileSystemsGetOutput,
}));
// Input Schema
export const EfsFileSystemsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/efsFileSystems",
    }),
  );
export type EfsFileSystemsListByResourceGroupInput =
  typeof EfsFileSystemsListByResourceGroupInput.Type;

// Output Schema
export const EfsFileSystemsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type EfsFileSystemsListByResourceGroupOutput =
  typeof EfsFileSystemsListByResourceGroupOutput.Type;

// The operation
/**
 * List EfsFileSystem resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const EfsFileSystemsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: EfsFileSystemsListByResourceGroupInput,
    outputSchema: EfsFileSystemsListByResourceGroupOutput,
  }));
// Input Schema
export const EfsFileSystemsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/efsFileSystems",
    }),
  );
export type EfsFileSystemsListBySubscriptionInput =
  typeof EfsFileSystemsListBySubscriptionInput.Type;

// Output Schema
export const EfsFileSystemsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type EfsFileSystemsListBySubscriptionOutput =
  typeof EfsFileSystemsListBySubscriptionOutput.Type;

// The operation
/**
 * List EfsFileSystem resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const EfsFileSystemsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: EfsFileSystemsListBySubscriptionInput,
    outputSchema: EfsFileSystemsListBySubscriptionOutput,
  }));
// Input Schema
export const EfsFileSystemsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/efsFileSystems/{name}",
    }),
  );
export type EfsFileSystemsUpdateInput = typeof EfsFileSystemsUpdateInput.Type;

// Output Schema
export const EfsFileSystemsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type EfsFileSystemsUpdateOutput = typeof EfsFileSystemsUpdateOutput.Type;

// The operation
/**
 * Update a EfsFileSystem
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of EfsFileSystem
 */
export const EfsFileSystemsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: EfsFileSystemsUpdateInput,
    outputSchema: EfsFileSystemsUpdateOutput,
  }),
);
// Input Schema
export const EfsMountTargetsCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/efsMountTargets/{name}",
    }),
  );
export type EfsMountTargetsCreateOrReplaceInput =
  typeof EfsMountTargetsCreateOrReplaceInput.Type;

// Output Schema
export const EfsMountTargetsCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type EfsMountTargetsCreateOrReplaceOutput =
  typeof EfsMountTargetsCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a EfsMountTarget. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of EfsMountTarget
 */
export const EfsMountTargetsCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: EfsMountTargetsCreateOrReplaceInput,
    outputSchema: EfsMountTargetsCreateOrReplaceOutput,
  }));
// Input Schema
export const EfsMountTargetsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/efsMountTargets/{name}",
    }),
  );
export type EfsMountTargetsDeleteInput = typeof EfsMountTargetsDeleteInput.Type;

// Output Schema
export const EfsMountTargetsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type EfsMountTargetsDeleteOutput =
  typeof EfsMountTargetsDeleteOutput.Type;

// The operation
/**
 * Delete a EfsMountTarget
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of EfsMountTarget
 */
export const EfsMountTargetsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: EfsMountTargetsDeleteInput,
    outputSchema: EfsMountTargetsDeleteOutput,
  }),
);
// Input Schema
export const EfsMountTargetsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/efsMountTargets/{name}",
    }),
  );
export type EfsMountTargetsGetInput = typeof EfsMountTargetsGetInput.Type;

// Output Schema
export const EfsMountTargetsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type EfsMountTargetsGetOutput = typeof EfsMountTargetsGetOutput.Type;

// The operation
/**
 * Get a EfsMountTarget
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of EfsMountTarget
 */
export const EfsMountTargetsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: EfsMountTargetsGetInput,
  outputSchema: EfsMountTargetsGetOutput,
}));
// Input Schema
export const EfsMountTargetsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/efsMountTargets",
    }),
  );
export type EfsMountTargetsListByResourceGroupInput =
  typeof EfsMountTargetsListByResourceGroupInput.Type;

// Output Schema
export const EfsMountTargetsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type EfsMountTargetsListByResourceGroupOutput =
  typeof EfsMountTargetsListByResourceGroupOutput.Type;

// The operation
/**
 * List EfsMountTarget resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const EfsMountTargetsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: EfsMountTargetsListByResourceGroupInput,
    outputSchema: EfsMountTargetsListByResourceGroupOutput,
  }));
// Input Schema
export const EfsMountTargetsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/efsMountTargets",
    }),
  );
export type EfsMountTargetsListBySubscriptionInput =
  typeof EfsMountTargetsListBySubscriptionInput.Type;

// Output Schema
export const EfsMountTargetsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type EfsMountTargetsListBySubscriptionOutput =
  typeof EfsMountTargetsListBySubscriptionOutput.Type;

// The operation
/**
 * List EfsMountTarget resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const EfsMountTargetsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: EfsMountTargetsListBySubscriptionInput,
    outputSchema: EfsMountTargetsListBySubscriptionOutput,
  }));
// Input Schema
export const EfsMountTargetsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/efsMountTargets/{name}",
    }),
  );
export type EfsMountTargetsUpdateInput = typeof EfsMountTargetsUpdateInput.Type;

// Output Schema
export const EfsMountTargetsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type EfsMountTargetsUpdateOutput =
  typeof EfsMountTargetsUpdateOutput.Type;

// The operation
/**
 * Update a EfsMountTarget
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of EfsMountTarget
 */
export const EfsMountTargetsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: EfsMountTargetsUpdateInput,
    outputSchema: EfsMountTargetsUpdateOutput,
  }),
);
// Input Schema
export const EksClustersCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/{resourceUri}/providers/Microsoft.AwsConnector/eksClusters/default",
    }),
  );
export type EksClustersCreateOrReplaceInput =
  typeof EksClustersCreateOrReplaceInput.Type;

// Output Schema
export const EksClustersCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type EksClustersCreateOrReplaceOutput =
  typeof EksClustersCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a EksCluster. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 */
export const EksClustersCreateOrReplace = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: EksClustersCreateOrReplaceInput,
    outputSchema: EksClustersCreateOrReplaceOutput,
  }),
);
// Input Schema
export const EksClustersDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "DELETE",
    path: "/{resourceUri}/providers/Microsoft.AwsConnector/eksClusters/default",
  }),
);
export type EksClustersDeleteInput = typeof EksClustersDeleteInput.Type;

// Output Schema
export const EksClustersDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type EksClustersDeleteOutput = typeof EksClustersDeleteOutput.Type;

// The operation
/**
 * Delete a EksCluster
 *
 * @param api-version - The API version to use for this operation.
 */
export const EksClustersDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: EksClustersDeleteInput,
  outputSchema: EksClustersDeleteOutput,
}));
// Input Schema
export const EksClustersGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/{resourceUri}/providers/Microsoft.AwsConnector/eksClusters/default",
  }),
);
export type EksClustersGetInput = typeof EksClustersGetInput.Type;

// Output Schema
export const EksClustersGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type EksClustersGetOutput = typeof EksClustersGetOutput.Type;

// The operation
/**
 * Get a EksCluster
 *
 * @param api-version - The API version to use for this operation.
 */
export const EksClustersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: EksClustersGetInput,
  outputSchema: EksClustersGetOutput,
}));
// Input Schema
export const EksClustersListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/{resourceUri}/providers/Microsoft.AwsConnector/eksClusters",
  }),
);
export type EksClustersListInput = typeof EksClustersListInput.Type;

// Output Schema
export const EksClustersListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(Schema.Struct({})),
  nextLink: Schema.optional(Schema.String),
});
export type EksClustersListOutput = typeof EksClustersListOutput.Type;

// The operation
/**
 * List EksCluster resources by parent
 *
 * @param api-version - The API version to use for this operation.
 */
export const EksClustersList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: EksClustersListInput,
  outputSchema: EksClustersListOutput,
}));
// Input Schema
export const EksNodegroupsCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/eksNodegroups/{name}",
    }),
  );
export type EksNodegroupsCreateOrReplaceInput =
  typeof EksNodegroupsCreateOrReplaceInput.Type;

// Output Schema
export const EksNodegroupsCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type EksNodegroupsCreateOrReplaceOutput =
  typeof EksNodegroupsCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a EksNodegroup. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of EksNodegroup
 */
export const EksNodegroupsCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: EksNodegroupsCreateOrReplaceInput,
    outputSchema: EksNodegroupsCreateOrReplaceOutput,
  }));
// Input Schema
export const EksNodegroupsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/eksNodegroups/{name}",
    }),
  );
export type EksNodegroupsDeleteInput = typeof EksNodegroupsDeleteInput.Type;

// Output Schema
export const EksNodegroupsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type EksNodegroupsDeleteOutput = typeof EksNodegroupsDeleteOutput.Type;

// The operation
/**
 * Delete a EksNodegroup
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of EksNodegroup
 */
export const EksNodegroupsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: EksNodegroupsDeleteInput,
  outputSchema: EksNodegroupsDeleteOutput,
}));
// Input Schema
export const EksNodegroupsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  name: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/eksNodegroups/{name}",
  }),
);
export type EksNodegroupsGetInput = typeof EksNodegroupsGetInput.Type;

// Output Schema
export const EksNodegroupsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  },
);
export type EksNodegroupsGetOutput = typeof EksNodegroupsGetOutput.Type;

// The operation
/**
 * Get a EksNodegroup
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of EksNodegroup
 */
export const EksNodegroupsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: EksNodegroupsGetInput,
  outputSchema: EksNodegroupsGetOutput,
}));
// Input Schema
export const EksNodegroupsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/eksNodegroups",
    }),
  );
export type EksNodegroupsListByResourceGroupInput =
  typeof EksNodegroupsListByResourceGroupInput.Type;

// Output Schema
export const EksNodegroupsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type EksNodegroupsListByResourceGroupOutput =
  typeof EksNodegroupsListByResourceGroupOutput.Type;

// The operation
/**
 * List EksNodegroup resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const EksNodegroupsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: EksNodegroupsListByResourceGroupInput,
    outputSchema: EksNodegroupsListByResourceGroupOutput,
  }));
// Input Schema
export const EksNodegroupsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/eksNodegroups",
    }),
  );
export type EksNodegroupsListBySubscriptionInput =
  typeof EksNodegroupsListBySubscriptionInput.Type;

// Output Schema
export const EksNodegroupsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type EksNodegroupsListBySubscriptionOutput =
  typeof EksNodegroupsListBySubscriptionOutput.Type;

// The operation
/**
 * List EksNodegroup resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const EksNodegroupsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: EksNodegroupsListBySubscriptionInput,
    outputSchema: EksNodegroupsListBySubscriptionOutput,
  }));
// Input Schema
export const EksNodegroupsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/eksNodegroups/{name}",
    }),
  );
export type EksNodegroupsUpdateInput = typeof EksNodegroupsUpdateInput.Type;

// Output Schema
export const EksNodegroupsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type EksNodegroupsUpdateOutput = typeof EksNodegroupsUpdateOutput.Type;

// The operation
/**
 * Update a EksNodegroup
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of EksNodegroup
 */
export const EksNodegroupsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: EksNodegroupsUpdateInput,
  outputSchema: EksNodegroupsUpdateOutput,
}));
// Input Schema
export const ElasticBeanstalkApplicationsCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/elasticBeanstalkApplications/{name}",
    }),
  );
export type ElasticBeanstalkApplicationsCreateOrReplaceInput =
  typeof ElasticBeanstalkApplicationsCreateOrReplaceInput.Type;

// Output Schema
export const ElasticBeanstalkApplicationsCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ElasticBeanstalkApplicationsCreateOrReplaceOutput =
  typeof ElasticBeanstalkApplicationsCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a ElasticBeanstalkApplication. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of ElasticBeanstalkApplication
 */
export const ElasticBeanstalkApplicationsCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ElasticBeanstalkApplicationsCreateOrReplaceInput,
    outputSchema: ElasticBeanstalkApplicationsCreateOrReplaceOutput,
  }));
// Input Schema
export const ElasticBeanstalkApplicationsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/elasticBeanstalkApplications/{name}",
    }),
  );
export type ElasticBeanstalkApplicationsDeleteInput =
  typeof ElasticBeanstalkApplicationsDeleteInput.Type;

// Output Schema
export const ElasticBeanstalkApplicationsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ElasticBeanstalkApplicationsDeleteOutput =
  typeof ElasticBeanstalkApplicationsDeleteOutput.Type;

// The operation
/**
 * Delete a ElasticBeanstalkApplication
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of ElasticBeanstalkApplication
 */
export const ElasticBeanstalkApplicationsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ElasticBeanstalkApplicationsDeleteInput,
    outputSchema: ElasticBeanstalkApplicationsDeleteOutput,
  }));
// Input Schema
export const ElasticBeanstalkApplicationsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/elasticBeanstalkApplications/{name}",
    }),
  );
export type ElasticBeanstalkApplicationsGetInput =
  typeof ElasticBeanstalkApplicationsGetInput.Type;

// Output Schema
export const ElasticBeanstalkApplicationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ElasticBeanstalkApplicationsGetOutput =
  typeof ElasticBeanstalkApplicationsGetOutput.Type;

// The operation
/**
 * Get a ElasticBeanstalkApplication
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of ElasticBeanstalkApplication
 */
export const ElasticBeanstalkApplicationsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ElasticBeanstalkApplicationsGetInput,
    outputSchema: ElasticBeanstalkApplicationsGetOutput,
  }));
// Input Schema
export const ElasticBeanstalkApplicationsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/elasticBeanstalkApplications",
    }),
  );
export type ElasticBeanstalkApplicationsListByResourceGroupInput =
  typeof ElasticBeanstalkApplicationsListByResourceGroupInput.Type;

// Output Schema
export const ElasticBeanstalkApplicationsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ElasticBeanstalkApplicationsListByResourceGroupOutput =
  typeof ElasticBeanstalkApplicationsListByResourceGroupOutput.Type;

// The operation
/**
 * List ElasticBeanstalkApplication resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ElasticBeanstalkApplicationsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ElasticBeanstalkApplicationsListByResourceGroupInput,
    outputSchema: ElasticBeanstalkApplicationsListByResourceGroupOutput,
  }));
// Input Schema
export const ElasticBeanstalkApplicationsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/elasticBeanstalkApplications",
    }),
  );
export type ElasticBeanstalkApplicationsListBySubscriptionInput =
  typeof ElasticBeanstalkApplicationsListBySubscriptionInput.Type;

// Output Schema
export const ElasticBeanstalkApplicationsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ElasticBeanstalkApplicationsListBySubscriptionOutput =
  typeof ElasticBeanstalkApplicationsListBySubscriptionOutput.Type;

// The operation
/**
 * List ElasticBeanstalkApplication resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const ElasticBeanstalkApplicationsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ElasticBeanstalkApplicationsListBySubscriptionInput,
    outputSchema: ElasticBeanstalkApplicationsListBySubscriptionOutput,
  }));
// Input Schema
export const ElasticBeanstalkApplicationsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/elasticBeanstalkApplications/{name}",
    }),
  );
export type ElasticBeanstalkApplicationsUpdateInput =
  typeof ElasticBeanstalkApplicationsUpdateInput.Type;

// Output Schema
export const ElasticBeanstalkApplicationsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ElasticBeanstalkApplicationsUpdateOutput =
  typeof ElasticBeanstalkApplicationsUpdateOutput.Type;

// The operation
/**
 * Update a ElasticBeanstalkApplication
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of ElasticBeanstalkApplication
 */
export const ElasticBeanstalkApplicationsUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ElasticBeanstalkApplicationsUpdateInput,
    outputSchema: ElasticBeanstalkApplicationsUpdateOutput,
  }));
// Input Schema
export const ElasticBeanstalkConfigurationTemplatesCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/elasticBeanstalkConfigurationTemplates/{name}",
    }),
  );
export type ElasticBeanstalkConfigurationTemplatesCreateOrReplaceInput =
  typeof ElasticBeanstalkConfigurationTemplatesCreateOrReplaceInput.Type;

// Output Schema
export const ElasticBeanstalkConfigurationTemplatesCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ElasticBeanstalkConfigurationTemplatesCreateOrReplaceOutput =
  typeof ElasticBeanstalkConfigurationTemplatesCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a ElasticBeanstalkConfigurationTemplate. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of ElasticBeanstalkConfigurationTemplate
 */
export const ElasticBeanstalkConfigurationTemplatesCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ElasticBeanstalkConfigurationTemplatesCreateOrReplaceInput,
    outputSchema: ElasticBeanstalkConfigurationTemplatesCreateOrReplaceOutput,
  }));
// Input Schema
export const ElasticBeanstalkConfigurationTemplatesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/elasticBeanstalkConfigurationTemplates/{name}",
    }),
  );
export type ElasticBeanstalkConfigurationTemplatesDeleteInput =
  typeof ElasticBeanstalkConfigurationTemplatesDeleteInput.Type;

// Output Schema
export const ElasticBeanstalkConfigurationTemplatesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ElasticBeanstalkConfigurationTemplatesDeleteOutput =
  typeof ElasticBeanstalkConfigurationTemplatesDeleteOutput.Type;

// The operation
/**
 * Delete a ElasticBeanstalkConfigurationTemplate
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of ElasticBeanstalkConfigurationTemplate
 */
export const ElasticBeanstalkConfigurationTemplatesDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ElasticBeanstalkConfigurationTemplatesDeleteInput,
    outputSchema: ElasticBeanstalkConfigurationTemplatesDeleteOutput,
  }));
// Input Schema
export const ElasticBeanstalkConfigurationTemplatesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/elasticBeanstalkConfigurationTemplates/{name}",
    }),
  );
export type ElasticBeanstalkConfigurationTemplatesGetInput =
  typeof ElasticBeanstalkConfigurationTemplatesGetInput.Type;

// Output Schema
export const ElasticBeanstalkConfigurationTemplatesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ElasticBeanstalkConfigurationTemplatesGetOutput =
  typeof ElasticBeanstalkConfigurationTemplatesGetOutput.Type;

// The operation
/**
 * Get a ElasticBeanstalkConfigurationTemplate
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of ElasticBeanstalkConfigurationTemplate
 */
export const ElasticBeanstalkConfigurationTemplatesGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ElasticBeanstalkConfigurationTemplatesGetInput,
    outputSchema: ElasticBeanstalkConfigurationTemplatesGetOutput,
  }));
// Input Schema
export const ElasticBeanstalkConfigurationTemplatesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/elasticBeanstalkConfigurationTemplates",
    }),
  );
export type ElasticBeanstalkConfigurationTemplatesListByResourceGroupInput =
  typeof ElasticBeanstalkConfigurationTemplatesListByResourceGroupInput.Type;

// Output Schema
export const ElasticBeanstalkConfigurationTemplatesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ElasticBeanstalkConfigurationTemplatesListByResourceGroupOutput =
  typeof ElasticBeanstalkConfigurationTemplatesListByResourceGroupOutput.Type;

// The operation
/**
 * List ElasticBeanstalkConfigurationTemplate resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ElasticBeanstalkConfigurationTemplatesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ElasticBeanstalkConfigurationTemplatesListByResourceGroupInput,
    outputSchema:
      ElasticBeanstalkConfigurationTemplatesListByResourceGroupOutput,
  }));
// Input Schema
export const ElasticBeanstalkConfigurationTemplatesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/elasticBeanstalkConfigurationTemplates",
    }),
  );
export type ElasticBeanstalkConfigurationTemplatesListBySubscriptionInput =
  typeof ElasticBeanstalkConfigurationTemplatesListBySubscriptionInput.Type;

// Output Schema
export const ElasticBeanstalkConfigurationTemplatesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ElasticBeanstalkConfigurationTemplatesListBySubscriptionOutput =
  typeof ElasticBeanstalkConfigurationTemplatesListBySubscriptionOutput.Type;

// The operation
/**
 * List ElasticBeanstalkConfigurationTemplate resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const ElasticBeanstalkConfigurationTemplatesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ElasticBeanstalkConfigurationTemplatesListBySubscriptionInput,
    outputSchema:
      ElasticBeanstalkConfigurationTemplatesListBySubscriptionOutput,
  }));
// Input Schema
export const ElasticBeanstalkConfigurationTemplatesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/elasticBeanstalkConfigurationTemplates/{name}",
    }),
  );
export type ElasticBeanstalkConfigurationTemplatesUpdateInput =
  typeof ElasticBeanstalkConfigurationTemplatesUpdateInput.Type;

// Output Schema
export const ElasticBeanstalkConfigurationTemplatesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ElasticBeanstalkConfigurationTemplatesUpdateOutput =
  typeof ElasticBeanstalkConfigurationTemplatesUpdateOutput.Type;

// The operation
/**
 * Update a ElasticBeanstalkConfigurationTemplate
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of ElasticBeanstalkConfigurationTemplate
 */
export const ElasticBeanstalkConfigurationTemplatesUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ElasticBeanstalkConfigurationTemplatesUpdateInput,
    outputSchema: ElasticBeanstalkConfigurationTemplatesUpdateOutput,
  }));
// Input Schema
export const ElasticBeanstalkEnvironmentsCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/elasticBeanstalkEnvironments/{name}",
    }),
  );
export type ElasticBeanstalkEnvironmentsCreateOrReplaceInput =
  typeof ElasticBeanstalkEnvironmentsCreateOrReplaceInput.Type;

// Output Schema
export const ElasticBeanstalkEnvironmentsCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ElasticBeanstalkEnvironmentsCreateOrReplaceOutput =
  typeof ElasticBeanstalkEnvironmentsCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a ElasticBeanstalkEnvironment. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of ElasticBeanstalkEnvironment
 */
export const ElasticBeanstalkEnvironmentsCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ElasticBeanstalkEnvironmentsCreateOrReplaceInput,
    outputSchema: ElasticBeanstalkEnvironmentsCreateOrReplaceOutput,
  }));
// Input Schema
export const ElasticBeanstalkEnvironmentsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/elasticBeanstalkEnvironments/{name}",
    }),
  );
export type ElasticBeanstalkEnvironmentsDeleteInput =
  typeof ElasticBeanstalkEnvironmentsDeleteInput.Type;

// Output Schema
export const ElasticBeanstalkEnvironmentsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ElasticBeanstalkEnvironmentsDeleteOutput =
  typeof ElasticBeanstalkEnvironmentsDeleteOutput.Type;

// The operation
/**
 * Delete a ElasticBeanstalkEnvironment
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of ElasticBeanstalkEnvironment
 */
export const ElasticBeanstalkEnvironmentsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ElasticBeanstalkEnvironmentsDeleteInput,
    outputSchema: ElasticBeanstalkEnvironmentsDeleteOutput,
  }));
// Input Schema
export const ElasticBeanstalkEnvironmentsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/elasticBeanstalkEnvironments/{name}",
    }),
  );
export type ElasticBeanstalkEnvironmentsGetInput =
  typeof ElasticBeanstalkEnvironmentsGetInput.Type;

// Output Schema
export const ElasticBeanstalkEnvironmentsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ElasticBeanstalkEnvironmentsGetOutput =
  typeof ElasticBeanstalkEnvironmentsGetOutput.Type;

// The operation
/**
 * Get a ElasticBeanstalkEnvironment
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of ElasticBeanstalkEnvironment
 */
export const ElasticBeanstalkEnvironmentsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ElasticBeanstalkEnvironmentsGetInput,
    outputSchema: ElasticBeanstalkEnvironmentsGetOutput,
  }));
// Input Schema
export const ElasticBeanstalkEnvironmentsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/elasticBeanstalkEnvironments",
    }),
  );
export type ElasticBeanstalkEnvironmentsListByResourceGroupInput =
  typeof ElasticBeanstalkEnvironmentsListByResourceGroupInput.Type;

// Output Schema
export const ElasticBeanstalkEnvironmentsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ElasticBeanstalkEnvironmentsListByResourceGroupOutput =
  typeof ElasticBeanstalkEnvironmentsListByResourceGroupOutput.Type;

// The operation
/**
 * List ElasticBeanstalkEnvironment resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ElasticBeanstalkEnvironmentsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ElasticBeanstalkEnvironmentsListByResourceGroupInput,
    outputSchema: ElasticBeanstalkEnvironmentsListByResourceGroupOutput,
  }));
// Input Schema
export const ElasticBeanstalkEnvironmentsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/elasticBeanstalkEnvironments",
    }),
  );
export type ElasticBeanstalkEnvironmentsListBySubscriptionInput =
  typeof ElasticBeanstalkEnvironmentsListBySubscriptionInput.Type;

// Output Schema
export const ElasticBeanstalkEnvironmentsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ElasticBeanstalkEnvironmentsListBySubscriptionOutput =
  typeof ElasticBeanstalkEnvironmentsListBySubscriptionOutput.Type;

// The operation
/**
 * List ElasticBeanstalkEnvironment resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const ElasticBeanstalkEnvironmentsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ElasticBeanstalkEnvironmentsListBySubscriptionInput,
    outputSchema: ElasticBeanstalkEnvironmentsListBySubscriptionOutput,
  }));
// Input Schema
export const ElasticBeanstalkEnvironmentsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/elasticBeanstalkEnvironments/{name}",
    }),
  );
export type ElasticBeanstalkEnvironmentsUpdateInput =
  typeof ElasticBeanstalkEnvironmentsUpdateInput.Type;

// Output Schema
export const ElasticBeanstalkEnvironmentsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ElasticBeanstalkEnvironmentsUpdateOutput =
  typeof ElasticBeanstalkEnvironmentsUpdateOutput.Type;

// The operation
/**
 * Update a ElasticBeanstalkEnvironment
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of ElasticBeanstalkEnvironment
 */
export const ElasticBeanstalkEnvironmentsUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ElasticBeanstalkEnvironmentsUpdateInput,
    outputSchema: ElasticBeanstalkEnvironmentsUpdateOutput,
  }));
// Input Schema
export const ElasticLoadBalancingV2ListenersCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/elasticLoadBalancingV2Listeners/{name}",
    }),
  );
export type ElasticLoadBalancingV2ListenersCreateOrReplaceInput =
  typeof ElasticLoadBalancingV2ListenersCreateOrReplaceInput.Type;

// Output Schema
export const ElasticLoadBalancingV2ListenersCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ElasticLoadBalancingV2ListenersCreateOrReplaceOutput =
  typeof ElasticLoadBalancingV2ListenersCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a ElasticLoadBalancingV2Listener. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of ElasticLoadBalancingV2Listener
 */
export const ElasticLoadBalancingV2ListenersCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ElasticLoadBalancingV2ListenersCreateOrReplaceInput,
    outputSchema: ElasticLoadBalancingV2ListenersCreateOrReplaceOutput,
  }));
// Input Schema
export const ElasticLoadBalancingV2ListenersDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/elasticLoadBalancingV2Listeners/{name}",
    }),
  );
export type ElasticLoadBalancingV2ListenersDeleteInput =
  typeof ElasticLoadBalancingV2ListenersDeleteInput.Type;

// Output Schema
export const ElasticLoadBalancingV2ListenersDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ElasticLoadBalancingV2ListenersDeleteOutput =
  typeof ElasticLoadBalancingV2ListenersDeleteOutput.Type;

// The operation
/**
 * Delete a ElasticLoadBalancingV2Listener
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of ElasticLoadBalancingV2Listener
 */
export const ElasticLoadBalancingV2ListenersDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ElasticLoadBalancingV2ListenersDeleteInput,
    outputSchema: ElasticLoadBalancingV2ListenersDeleteOutput,
  }));
// Input Schema
export const ElasticLoadBalancingV2ListenersGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/elasticLoadBalancingV2Listeners/{name}",
    }),
  );
export type ElasticLoadBalancingV2ListenersGetInput =
  typeof ElasticLoadBalancingV2ListenersGetInput.Type;

// Output Schema
export const ElasticLoadBalancingV2ListenersGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ElasticLoadBalancingV2ListenersGetOutput =
  typeof ElasticLoadBalancingV2ListenersGetOutput.Type;

// The operation
/**
 * Get a ElasticLoadBalancingV2Listener
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of ElasticLoadBalancingV2Listener
 */
export const ElasticLoadBalancingV2ListenersGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ElasticLoadBalancingV2ListenersGetInput,
    outputSchema: ElasticLoadBalancingV2ListenersGetOutput,
  }));
// Input Schema
export const ElasticLoadBalancingV2ListenersListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/elasticLoadBalancingV2Listeners",
    }),
  );
export type ElasticLoadBalancingV2ListenersListByResourceGroupInput =
  typeof ElasticLoadBalancingV2ListenersListByResourceGroupInput.Type;

// Output Schema
export const ElasticLoadBalancingV2ListenersListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ElasticLoadBalancingV2ListenersListByResourceGroupOutput =
  typeof ElasticLoadBalancingV2ListenersListByResourceGroupOutput.Type;

// The operation
/**
 * List ElasticLoadBalancingV2Listener resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ElasticLoadBalancingV2ListenersListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ElasticLoadBalancingV2ListenersListByResourceGroupInput,
    outputSchema: ElasticLoadBalancingV2ListenersListByResourceGroupOutput,
  }));
// Input Schema
export const ElasticLoadBalancingV2ListenersListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/elasticLoadBalancingV2Listeners",
    }),
  );
export type ElasticLoadBalancingV2ListenersListBySubscriptionInput =
  typeof ElasticLoadBalancingV2ListenersListBySubscriptionInput.Type;

// Output Schema
export const ElasticLoadBalancingV2ListenersListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ElasticLoadBalancingV2ListenersListBySubscriptionOutput =
  typeof ElasticLoadBalancingV2ListenersListBySubscriptionOutput.Type;

// The operation
/**
 * List ElasticLoadBalancingV2Listener resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const ElasticLoadBalancingV2ListenersListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ElasticLoadBalancingV2ListenersListBySubscriptionInput,
    outputSchema: ElasticLoadBalancingV2ListenersListBySubscriptionOutput,
  }));
// Input Schema
export const ElasticLoadBalancingV2ListenersUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/elasticLoadBalancingV2Listeners/{name}",
    }),
  );
export type ElasticLoadBalancingV2ListenersUpdateInput =
  typeof ElasticLoadBalancingV2ListenersUpdateInput.Type;

// Output Schema
export const ElasticLoadBalancingV2ListenersUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ElasticLoadBalancingV2ListenersUpdateOutput =
  typeof ElasticLoadBalancingV2ListenersUpdateOutput.Type;

// The operation
/**
 * Update a ElasticLoadBalancingV2Listener
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of ElasticLoadBalancingV2Listener
 */
export const ElasticLoadBalancingV2ListenersUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ElasticLoadBalancingV2ListenersUpdateInput,
    outputSchema: ElasticLoadBalancingV2ListenersUpdateOutput,
  }));
// Input Schema
export const ElasticLoadBalancingV2LoadBalancersCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/elasticLoadBalancingV2LoadBalancers/{name}",
    }),
  );
export type ElasticLoadBalancingV2LoadBalancersCreateOrReplaceInput =
  typeof ElasticLoadBalancingV2LoadBalancersCreateOrReplaceInput.Type;

// Output Schema
export const ElasticLoadBalancingV2LoadBalancersCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ElasticLoadBalancingV2LoadBalancersCreateOrReplaceOutput =
  typeof ElasticLoadBalancingV2LoadBalancersCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a ElasticLoadBalancingV2LoadBalancer. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of ElasticLoadBalancingV2LoadBalancer
 */
export const ElasticLoadBalancingV2LoadBalancersCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ElasticLoadBalancingV2LoadBalancersCreateOrReplaceInput,
    outputSchema: ElasticLoadBalancingV2LoadBalancersCreateOrReplaceOutput,
  }));
// Input Schema
export const ElasticLoadBalancingV2LoadBalancersDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/elasticLoadBalancingV2LoadBalancers/{name}",
    }),
  );
export type ElasticLoadBalancingV2LoadBalancersDeleteInput =
  typeof ElasticLoadBalancingV2LoadBalancersDeleteInput.Type;

// Output Schema
export const ElasticLoadBalancingV2LoadBalancersDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ElasticLoadBalancingV2LoadBalancersDeleteOutput =
  typeof ElasticLoadBalancingV2LoadBalancersDeleteOutput.Type;

// The operation
/**
 * Delete a ElasticLoadBalancingV2LoadBalancer
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of ElasticLoadBalancingV2LoadBalancer
 */
export const ElasticLoadBalancingV2LoadBalancersDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ElasticLoadBalancingV2LoadBalancersDeleteInput,
    outputSchema: ElasticLoadBalancingV2LoadBalancersDeleteOutput,
  }));
// Input Schema
export const ElasticLoadBalancingV2LoadBalancersGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/elasticLoadBalancingV2LoadBalancers/{name}",
    }),
  );
export type ElasticLoadBalancingV2LoadBalancersGetInput =
  typeof ElasticLoadBalancingV2LoadBalancersGetInput.Type;

// Output Schema
export const ElasticLoadBalancingV2LoadBalancersGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ElasticLoadBalancingV2LoadBalancersGetOutput =
  typeof ElasticLoadBalancingV2LoadBalancersGetOutput.Type;

// The operation
/**
 * Get a ElasticLoadBalancingV2LoadBalancer
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of ElasticLoadBalancingV2LoadBalancer
 */
export const ElasticLoadBalancingV2LoadBalancersGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ElasticLoadBalancingV2LoadBalancersGetInput,
    outputSchema: ElasticLoadBalancingV2LoadBalancersGetOutput,
  }));
// Input Schema
export const ElasticLoadBalancingV2LoadBalancersListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/elasticLoadBalancingV2LoadBalancers",
    }),
  );
export type ElasticLoadBalancingV2LoadBalancersListByResourceGroupInput =
  typeof ElasticLoadBalancingV2LoadBalancersListByResourceGroupInput.Type;

// Output Schema
export const ElasticLoadBalancingV2LoadBalancersListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ElasticLoadBalancingV2LoadBalancersListByResourceGroupOutput =
  typeof ElasticLoadBalancingV2LoadBalancersListByResourceGroupOutput.Type;

// The operation
/**
 * List ElasticLoadBalancingV2LoadBalancer resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ElasticLoadBalancingV2LoadBalancersListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ElasticLoadBalancingV2LoadBalancersListByResourceGroupInput,
    outputSchema: ElasticLoadBalancingV2LoadBalancersListByResourceGroupOutput,
  }));
// Input Schema
export const ElasticLoadBalancingV2LoadBalancersListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/elasticLoadBalancingV2LoadBalancers",
    }),
  );
export type ElasticLoadBalancingV2LoadBalancersListBySubscriptionInput =
  typeof ElasticLoadBalancingV2LoadBalancersListBySubscriptionInput.Type;

// Output Schema
export const ElasticLoadBalancingV2LoadBalancersListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ElasticLoadBalancingV2LoadBalancersListBySubscriptionOutput =
  typeof ElasticLoadBalancingV2LoadBalancersListBySubscriptionOutput.Type;

// The operation
/**
 * List ElasticLoadBalancingV2LoadBalancer resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const ElasticLoadBalancingV2LoadBalancersListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ElasticLoadBalancingV2LoadBalancersListBySubscriptionInput,
    outputSchema: ElasticLoadBalancingV2LoadBalancersListBySubscriptionOutput,
  }));
// Input Schema
export const ElasticLoadBalancingV2LoadBalancersUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/elasticLoadBalancingV2LoadBalancers/{name}",
    }),
  );
export type ElasticLoadBalancingV2LoadBalancersUpdateInput =
  typeof ElasticLoadBalancingV2LoadBalancersUpdateInput.Type;

// Output Schema
export const ElasticLoadBalancingV2LoadBalancersUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ElasticLoadBalancingV2LoadBalancersUpdateOutput =
  typeof ElasticLoadBalancingV2LoadBalancersUpdateOutput.Type;

// The operation
/**
 * Update a ElasticLoadBalancingV2LoadBalancer
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of ElasticLoadBalancingV2LoadBalancer
 */
export const ElasticLoadBalancingV2LoadBalancersUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ElasticLoadBalancingV2LoadBalancersUpdateInput,
    outputSchema: ElasticLoadBalancingV2LoadBalancersUpdateOutput,
  }));
// Input Schema
export const ElasticLoadBalancingV2TargetGroupsCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/elasticLoadBalancingV2TargetGroups/{name}",
    }),
  );
export type ElasticLoadBalancingV2TargetGroupsCreateOrReplaceInput =
  typeof ElasticLoadBalancingV2TargetGroupsCreateOrReplaceInput.Type;

// Output Schema
export const ElasticLoadBalancingV2TargetGroupsCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ElasticLoadBalancingV2TargetGroupsCreateOrReplaceOutput =
  typeof ElasticLoadBalancingV2TargetGroupsCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a ElasticLoadBalancingV2TargetGroup. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of ElasticLoadBalancingV2TargetGroup
 */
export const ElasticLoadBalancingV2TargetGroupsCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ElasticLoadBalancingV2TargetGroupsCreateOrReplaceInput,
    outputSchema: ElasticLoadBalancingV2TargetGroupsCreateOrReplaceOutput,
  }));
// Input Schema
export const ElasticLoadBalancingV2TargetGroupsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/elasticLoadBalancingV2TargetGroups/{name}",
    }),
  );
export type ElasticLoadBalancingV2TargetGroupsDeleteInput =
  typeof ElasticLoadBalancingV2TargetGroupsDeleteInput.Type;

// Output Schema
export const ElasticLoadBalancingV2TargetGroupsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ElasticLoadBalancingV2TargetGroupsDeleteOutput =
  typeof ElasticLoadBalancingV2TargetGroupsDeleteOutput.Type;

// The operation
/**
 * Delete a ElasticLoadBalancingV2TargetGroup
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of ElasticLoadBalancingV2TargetGroup
 */
export const ElasticLoadBalancingV2TargetGroupsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ElasticLoadBalancingV2TargetGroupsDeleteInput,
    outputSchema: ElasticLoadBalancingV2TargetGroupsDeleteOutput,
  }));
// Input Schema
export const ElasticLoadBalancingV2TargetGroupsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/elasticLoadBalancingV2TargetGroups/{name}",
    }),
  );
export type ElasticLoadBalancingV2TargetGroupsGetInput =
  typeof ElasticLoadBalancingV2TargetGroupsGetInput.Type;

// Output Schema
export const ElasticLoadBalancingV2TargetGroupsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ElasticLoadBalancingV2TargetGroupsGetOutput =
  typeof ElasticLoadBalancingV2TargetGroupsGetOutput.Type;

// The operation
/**
 * Get a ElasticLoadBalancingV2TargetGroup
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of ElasticLoadBalancingV2TargetGroup
 */
export const ElasticLoadBalancingV2TargetGroupsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ElasticLoadBalancingV2TargetGroupsGetInput,
    outputSchema: ElasticLoadBalancingV2TargetGroupsGetOutput,
  }));
// Input Schema
export const ElasticLoadBalancingV2TargetGroupsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/elasticLoadBalancingV2TargetGroups",
    }),
  );
export type ElasticLoadBalancingV2TargetGroupsListByResourceGroupInput =
  typeof ElasticLoadBalancingV2TargetGroupsListByResourceGroupInput.Type;

// Output Schema
export const ElasticLoadBalancingV2TargetGroupsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ElasticLoadBalancingV2TargetGroupsListByResourceGroupOutput =
  typeof ElasticLoadBalancingV2TargetGroupsListByResourceGroupOutput.Type;

// The operation
/**
 * List ElasticLoadBalancingV2TargetGroup resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ElasticLoadBalancingV2TargetGroupsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ElasticLoadBalancingV2TargetGroupsListByResourceGroupInput,
    outputSchema: ElasticLoadBalancingV2TargetGroupsListByResourceGroupOutput,
  }));
// Input Schema
export const ElasticLoadBalancingV2TargetGroupsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/elasticLoadBalancingV2TargetGroups",
    }),
  );
export type ElasticLoadBalancingV2TargetGroupsListBySubscriptionInput =
  typeof ElasticLoadBalancingV2TargetGroupsListBySubscriptionInput.Type;

// Output Schema
export const ElasticLoadBalancingV2TargetGroupsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ElasticLoadBalancingV2TargetGroupsListBySubscriptionOutput =
  typeof ElasticLoadBalancingV2TargetGroupsListBySubscriptionOutput.Type;

// The operation
/**
 * List ElasticLoadBalancingV2TargetGroup resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const ElasticLoadBalancingV2TargetGroupsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ElasticLoadBalancingV2TargetGroupsListBySubscriptionInput,
    outputSchema: ElasticLoadBalancingV2TargetGroupsListBySubscriptionOutput,
  }));
// Input Schema
export const ElasticLoadBalancingV2TargetGroupsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/elasticLoadBalancingV2TargetGroups/{name}",
    }),
  );
export type ElasticLoadBalancingV2TargetGroupsUpdateInput =
  typeof ElasticLoadBalancingV2TargetGroupsUpdateInput.Type;

// Output Schema
export const ElasticLoadBalancingV2TargetGroupsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ElasticLoadBalancingV2TargetGroupsUpdateOutput =
  typeof ElasticLoadBalancingV2TargetGroupsUpdateOutput.Type;

// The operation
/**
 * Update a ElasticLoadBalancingV2TargetGroup
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of ElasticLoadBalancingV2TargetGroup
 */
export const ElasticLoadBalancingV2TargetGroupsUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ElasticLoadBalancingV2TargetGroupsUpdateInput,
    outputSchema: ElasticLoadBalancingV2TargetGroupsUpdateOutput,
  }));
// Input Schema
export const ElasticLoadBalancingv2TargetHealthDescriptionsCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/elasticLoadBalancingV2TargetHealthDescriptions/{name}",
    }),
  );
export type ElasticLoadBalancingv2TargetHealthDescriptionsCreateOrReplaceInput =
  typeof ElasticLoadBalancingv2TargetHealthDescriptionsCreateOrReplaceInput.Type;

// Output Schema
export const ElasticLoadBalancingv2TargetHealthDescriptionsCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ElasticLoadBalancingv2TargetHealthDescriptionsCreateOrReplaceOutput =
  typeof ElasticLoadBalancingv2TargetHealthDescriptionsCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a ElasticLoadBalancingv2TargetHealthDescription. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of ElasticLoadBalancingv2TargetHealthDescription
 */
export const ElasticLoadBalancingv2TargetHealthDescriptionsCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      ElasticLoadBalancingv2TargetHealthDescriptionsCreateOrReplaceInput,
    outputSchema:
      ElasticLoadBalancingv2TargetHealthDescriptionsCreateOrReplaceOutput,
  }));
// Input Schema
export const ElasticLoadBalancingv2TargetHealthDescriptionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/elasticLoadBalancingV2TargetHealthDescriptions/{name}",
    }),
  );
export type ElasticLoadBalancingv2TargetHealthDescriptionsDeleteInput =
  typeof ElasticLoadBalancingv2TargetHealthDescriptionsDeleteInput.Type;

// Output Schema
export const ElasticLoadBalancingv2TargetHealthDescriptionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ElasticLoadBalancingv2TargetHealthDescriptionsDeleteOutput =
  typeof ElasticLoadBalancingv2TargetHealthDescriptionsDeleteOutput.Type;

// The operation
/**
 * Delete a ElasticLoadBalancingv2TargetHealthDescription
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of ElasticLoadBalancingv2TargetHealthDescription
 */
export const ElasticLoadBalancingv2TargetHealthDescriptionsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ElasticLoadBalancingv2TargetHealthDescriptionsDeleteInput,
    outputSchema: ElasticLoadBalancingv2TargetHealthDescriptionsDeleteOutput,
  }));
// Input Schema
export const ElasticLoadBalancingv2TargetHealthDescriptionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/elasticLoadBalancingV2TargetHealthDescriptions/{name}",
    }),
  );
export type ElasticLoadBalancingv2TargetHealthDescriptionsGetInput =
  typeof ElasticLoadBalancingv2TargetHealthDescriptionsGetInput.Type;

// Output Schema
export const ElasticLoadBalancingv2TargetHealthDescriptionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ElasticLoadBalancingv2TargetHealthDescriptionsGetOutput =
  typeof ElasticLoadBalancingv2TargetHealthDescriptionsGetOutput.Type;

// The operation
/**
 * Get a ElasticLoadBalancingv2TargetHealthDescription
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of ElasticLoadBalancingv2TargetHealthDescription
 */
export const ElasticLoadBalancingv2TargetHealthDescriptionsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ElasticLoadBalancingv2TargetHealthDescriptionsGetInput,
    outputSchema: ElasticLoadBalancingv2TargetHealthDescriptionsGetOutput,
  }));
// Input Schema
export const ElasticLoadBalancingv2TargetHealthDescriptionsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/elasticLoadBalancingV2TargetHealthDescriptions",
    }),
  );
export type ElasticLoadBalancingv2TargetHealthDescriptionsListByResourceGroupInput =
  typeof ElasticLoadBalancingv2TargetHealthDescriptionsListByResourceGroupInput.Type;

// Output Schema
export const ElasticLoadBalancingv2TargetHealthDescriptionsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ElasticLoadBalancingv2TargetHealthDescriptionsListByResourceGroupOutput =
  typeof ElasticLoadBalancingv2TargetHealthDescriptionsListByResourceGroupOutput.Type;

// The operation
/**
 * List ElasticLoadBalancingv2TargetHealthDescription resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ElasticLoadBalancingv2TargetHealthDescriptionsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      ElasticLoadBalancingv2TargetHealthDescriptionsListByResourceGroupInput,
    outputSchema:
      ElasticLoadBalancingv2TargetHealthDescriptionsListByResourceGroupOutput,
  }));
// Input Schema
export const ElasticLoadBalancingv2TargetHealthDescriptionsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/elasticLoadBalancingV2TargetHealthDescriptions",
    }),
  );
export type ElasticLoadBalancingv2TargetHealthDescriptionsListBySubscriptionInput =
  typeof ElasticLoadBalancingv2TargetHealthDescriptionsListBySubscriptionInput.Type;

// Output Schema
export const ElasticLoadBalancingv2TargetHealthDescriptionsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ElasticLoadBalancingv2TargetHealthDescriptionsListBySubscriptionOutput =
  typeof ElasticLoadBalancingv2TargetHealthDescriptionsListBySubscriptionOutput.Type;

// The operation
/**
 * List ElasticLoadBalancingv2TargetHealthDescription resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const ElasticLoadBalancingv2TargetHealthDescriptionsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      ElasticLoadBalancingv2TargetHealthDescriptionsListBySubscriptionInput,
    outputSchema:
      ElasticLoadBalancingv2TargetHealthDescriptionsListBySubscriptionOutput,
  }));
// Input Schema
export const ElasticLoadBalancingv2TargetHealthDescriptionsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/elasticLoadBalancingV2TargetHealthDescriptions/{name}",
    }),
  );
export type ElasticLoadBalancingv2TargetHealthDescriptionsUpdateInput =
  typeof ElasticLoadBalancingv2TargetHealthDescriptionsUpdateInput.Type;

// Output Schema
export const ElasticLoadBalancingv2TargetHealthDescriptionsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ElasticLoadBalancingv2TargetHealthDescriptionsUpdateOutput =
  typeof ElasticLoadBalancingv2TargetHealthDescriptionsUpdateOutput.Type;

// The operation
/**
 * Update a ElasticLoadBalancingv2TargetHealthDescription
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of ElasticLoadBalancingv2TargetHealthDescription
 */
export const ElasticLoadBalancingv2TargetHealthDescriptionsUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ElasticLoadBalancingv2TargetHealthDescriptionsUpdateInput,
    outputSchema: ElasticLoadBalancingv2TargetHealthDescriptionsUpdateOutput,
  }));
// Input Schema
export const EmrClustersCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/emrClusters/{name}",
    }),
  );
export type EmrClustersCreateOrReplaceInput =
  typeof EmrClustersCreateOrReplaceInput.Type;

// Output Schema
export const EmrClustersCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type EmrClustersCreateOrReplaceOutput =
  typeof EmrClustersCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a EmrCluster. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of EmrCluster
 */
export const EmrClustersCreateOrReplace = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: EmrClustersCreateOrReplaceInput,
    outputSchema: EmrClustersCreateOrReplaceOutput,
  }),
);
// Input Schema
export const EmrClustersDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/emrClusters/{name}",
  }),
);
export type EmrClustersDeleteInput = typeof EmrClustersDeleteInput.Type;

// Output Schema
export const EmrClustersDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type EmrClustersDeleteOutput = typeof EmrClustersDeleteOutput.Type;

// The operation
/**
 * Delete a EmrCluster
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of EmrCluster
 */
export const EmrClustersDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: EmrClustersDeleteInput,
  outputSchema: EmrClustersDeleteOutput,
}));
// Input Schema
export const EmrClustersGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  name: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/emrClusters/{name}",
  }),
);
export type EmrClustersGetInput = typeof EmrClustersGetInput.Type;

// Output Schema
export const EmrClustersGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type EmrClustersGetOutput = typeof EmrClustersGetOutput.Type;

// The operation
/**
 * Get a EmrCluster
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of EmrCluster
 */
export const EmrClustersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: EmrClustersGetInput,
  outputSchema: EmrClustersGetOutput,
}));
// Input Schema
export const EmrClustersListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/emrClusters",
    }),
  );
export type EmrClustersListByResourceGroupInput =
  typeof EmrClustersListByResourceGroupInput.Type;

// Output Schema
export const EmrClustersListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type EmrClustersListByResourceGroupOutput =
  typeof EmrClustersListByResourceGroupOutput.Type;

// The operation
/**
 * List EmrCluster resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const EmrClustersListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: EmrClustersListByResourceGroupInput,
    outputSchema: EmrClustersListByResourceGroupOutput,
  }));
// Input Schema
export const EmrClustersListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/emrClusters",
    }),
  );
export type EmrClustersListBySubscriptionInput =
  typeof EmrClustersListBySubscriptionInput.Type;

// Output Schema
export const EmrClustersListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type EmrClustersListBySubscriptionOutput =
  typeof EmrClustersListBySubscriptionOutput.Type;

// The operation
/**
 * List EmrCluster resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const EmrClustersListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: EmrClustersListBySubscriptionInput,
    outputSchema: EmrClustersListBySubscriptionOutput,
  }));
// Input Schema
export const EmrClustersUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/emrClusters/{name}",
  }),
);
export type EmrClustersUpdateInput = typeof EmrClustersUpdateInput.Type;

// Output Schema
export const EmrClustersUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type EmrClustersUpdateOutput = typeof EmrClustersUpdateOutput.Type;

// The operation
/**
 * Update a EmrCluster
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of EmrCluster
 */
export const EmrClustersUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: EmrClustersUpdateInput,
  outputSchema: EmrClustersUpdateOutput,
}));
// Input Schema
export const GuardDutyDetectorsCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/guardDutyDetectors/{name}",
    }),
  );
export type GuardDutyDetectorsCreateOrReplaceInput =
  typeof GuardDutyDetectorsCreateOrReplaceInput.Type;

// Output Schema
export const GuardDutyDetectorsCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type GuardDutyDetectorsCreateOrReplaceOutput =
  typeof GuardDutyDetectorsCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a GuardDutyDetector. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of GuardDutyDetector
 */
export const GuardDutyDetectorsCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GuardDutyDetectorsCreateOrReplaceInput,
    outputSchema: GuardDutyDetectorsCreateOrReplaceOutput,
  }));
// Input Schema
export const GuardDutyDetectorsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/guardDutyDetectors/{name}",
    }),
  );
export type GuardDutyDetectorsDeleteInput =
  typeof GuardDutyDetectorsDeleteInput.Type;

// Output Schema
export const GuardDutyDetectorsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type GuardDutyDetectorsDeleteOutput =
  typeof GuardDutyDetectorsDeleteOutput.Type;

// The operation
/**
 * Delete a GuardDutyDetector
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of GuardDutyDetector
 */
export const GuardDutyDetectorsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GuardDutyDetectorsDeleteInput,
    outputSchema: GuardDutyDetectorsDeleteOutput,
  }),
);
// Input Schema
export const GuardDutyDetectorsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/guardDutyDetectors/{name}",
    }),
  );
export type GuardDutyDetectorsGetInput = typeof GuardDutyDetectorsGetInput.Type;

// Output Schema
export const GuardDutyDetectorsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type GuardDutyDetectorsGetOutput =
  typeof GuardDutyDetectorsGetOutput.Type;

// The operation
/**
 * Get a GuardDutyDetector
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of GuardDutyDetector
 */
export const GuardDutyDetectorsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GuardDutyDetectorsGetInput,
    outputSchema: GuardDutyDetectorsGetOutput,
  }),
);
// Input Schema
export const GuardDutyDetectorsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/guardDutyDetectors",
    }),
  );
export type GuardDutyDetectorsListByResourceGroupInput =
  typeof GuardDutyDetectorsListByResourceGroupInput.Type;

// Output Schema
export const GuardDutyDetectorsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type GuardDutyDetectorsListByResourceGroupOutput =
  typeof GuardDutyDetectorsListByResourceGroupOutput.Type;

// The operation
/**
 * List GuardDutyDetector resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const GuardDutyDetectorsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GuardDutyDetectorsListByResourceGroupInput,
    outputSchema: GuardDutyDetectorsListByResourceGroupOutput,
  }));
// Input Schema
export const GuardDutyDetectorsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/guardDutyDetectors",
    }),
  );
export type GuardDutyDetectorsListBySubscriptionInput =
  typeof GuardDutyDetectorsListBySubscriptionInput.Type;

// Output Schema
export const GuardDutyDetectorsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type GuardDutyDetectorsListBySubscriptionOutput =
  typeof GuardDutyDetectorsListBySubscriptionOutput.Type;

// The operation
/**
 * List GuardDutyDetector resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const GuardDutyDetectorsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GuardDutyDetectorsListBySubscriptionInput,
    outputSchema: GuardDutyDetectorsListBySubscriptionOutput,
  }));
// Input Schema
export const GuardDutyDetectorsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/guardDutyDetectors/{name}",
    }),
  );
export type GuardDutyDetectorsUpdateInput =
  typeof GuardDutyDetectorsUpdateInput.Type;

// Output Schema
export const GuardDutyDetectorsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type GuardDutyDetectorsUpdateOutput =
  typeof GuardDutyDetectorsUpdateOutput.Type;

// The operation
/**
 * Update a GuardDutyDetector
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of GuardDutyDetector
 */
export const GuardDutyDetectorsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GuardDutyDetectorsUpdateInput,
    outputSchema: GuardDutyDetectorsUpdateOutput,
  }),
);
// Input Schema
export const IamAccessKeyLastUsedsCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/iamAccessKeyLastUseds/{name}",
    }),
  );
export type IamAccessKeyLastUsedsCreateOrReplaceInput =
  typeof IamAccessKeyLastUsedsCreateOrReplaceInput.Type;

// Output Schema
export const IamAccessKeyLastUsedsCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type IamAccessKeyLastUsedsCreateOrReplaceOutput =
  typeof IamAccessKeyLastUsedsCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a IamAccessKeyLastUsed. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of IamAccessKeyLastUsed
 */
export const IamAccessKeyLastUsedsCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IamAccessKeyLastUsedsCreateOrReplaceInput,
    outputSchema: IamAccessKeyLastUsedsCreateOrReplaceOutput,
  }));
// Input Schema
export const IamAccessKeyLastUsedsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/iamAccessKeyLastUseds/{name}",
    }),
  );
export type IamAccessKeyLastUsedsDeleteInput =
  typeof IamAccessKeyLastUsedsDeleteInput.Type;

// Output Schema
export const IamAccessKeyLastUsedsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type IamAccessKeyLastUsedsDeleteOutput =
  typeof IamAccessKeyLastUsedsDeleteOutput.Type;

// The operation
/**
 * Delete a IamAccessKeyLastUsed
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of IamAccessKeyLastUsed
 */
export const IamAccessKeyLastUsedsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IamAccessKeyLastUsedsDeleteInput,
    outputSchema: IamAccessKeyLastUsedsDeleteOutput,
  }),
);
// Input Schema
export const IamAccessKeyLastUsedsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/iamAccessKeyLastUseds/{name}",
    }),
  );
export type IamAccessKeyLastUsedsGetInput =
  typeof IamAccessKeyLastUsedsGetInput.Type;

// Output Schema
export const IamAccessKeyLastUsedsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type IamAccessKeyLastUsedsGetOutput =
  typeof IamAccessKeyLastUsedsGetOutput.Type;

// The operation
/**
 * Get a IamAccessKeyLastUsed
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of IamAccessKeyLastUsed
 */
export const IamAccessKeyLastUsedsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IamAccessKeyLastUsedsGetInput,
    outputSchema: IamAccessKeyLastUsedsGetOutput,
  }),
);
// Input Schema
export const IamAccessKeyLastUsedsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/iamAccessKeyLastUseds",
    }),
  );
export type IamAccessKeyLastUsedsListByResourceGroupInput =
  typeof IamAccessKeyLastUsedsListByResourceGroupInput.Type;

// Output Schema
export const IamAccessKeyLastUsedsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type IamAccessKeyLastUsedsListByResourceGroupOutput =
  typeof IamAccessKeyLastUsedsListByResourceGroupOutput.Type;

// The operation
/**
 * List IamAccessKeyLastUsed resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const IamAccessKeyLastUsedsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IamAccessKeyLastUsedsListByResourceGroupInput,
    outputSchema: IamAccessKeyLastUsedsListByResourceGroupOutput,
  }));
// Input Schema
export const IamAccessKeyLastUsedsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/iamAccessKeyLastUseds",
    }),
  );
export type IamAccessKeyLastUsedsListBySubscriptionInput =
  typeof IamAccessKeyLastUsedsListBySubscriptionInput.Type;

// Output Schema
export const IamAccessKeyLastUsedsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type IamAccessKeyLastUsedsListBySubscriptionOutput =
  typeof IamAccessKeyLastUsedsListBySubscriptionOutput.Type;

// The operation
/**
 * List IamAccessKeyLastUsed resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const IamAccessKeyLastUsedsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IamAccessKeyLastUsedsListBySubscriptionInput,
    outputSchema: IamAccessKeyLastUsedsListBySubscriptionOutput,
  }));
// Input Schema
export const IamAccessKeyLastUsedsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/iamAccessKeyLastUseds/{name}",
    }),
  );
export type IamAccessKeyLastUsedsUpdateInput =
  typeof IamAccessKeyLastUsedsUpdateInput.Type;

// Output Schema
export const IamAccessKeyLastUsedsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type IamAccessKeyLastUsedsUpdateOutput =
  typeof IamAccessKeyLastUsedsUpdateOutput.Type;

// The operation
/**
 * Update a IamAccessKeyLastUsed
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of IamAccessKeyLastUsed
 */
export const IamAccessKeyLastUsedsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IamAccessKeyLastUsedsUpdateInput,
    outputSchema: IamAccessKeyLastUsedsUpdateOutput,
  }),
);
// Input Schema
export const IamAccessKeyMetadataInfoCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/iamAccessKeyMetadata/{name}",
    }),
  );
export type IamAccessKeyMetadataInfoCreateOrReplaceInput =
  typeof IamAccessKeyMetadataInfoCreateOrReplaceInput.Type;

// Output Schema
export const IamAccessKeyMetadataInfoCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type IamAccessKeyMetadataInfoCreateOrReplaceOutput =
  typeof IamAccessKeyMetadataInfoCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a IamAccessKeyMetadata. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of IamAccessKeyMetadata
 */
export const IamAccessKeyMetadataInfoCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IamAccessKeyMetadataInfoCreateOrReplaceInput,
    outputSchema: IamAccessKeyMetadataInfoCreateOrReplaceOutput,
  }));
// Input Schema
export const IamAccessKeyMetadataInfoDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/iamAccessKeyMetadata/{name}",
    }),
  );
export type IamAccessKeyMetadataInfoDeleteInput =
  typeof IamAccessKeyMetadataInfoDeleteInput.Type;

// Output Schema
export const IamAccessKeyMetadataInfoDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type IamAccessKeyMetadataInfoDeleteOutput =
  typeof IamAccessKeyMetadataInfoDeleteOutput.Type;

// The operation
/**
 * Delete a IamAccessKeyMetadata
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of IamAccessKeyMetadata
 */
export const IamAccessKeyMetadataInfoDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IamAccessKeyMetadataInfoDeleteInput,
    outputSchema: IamAccessKeyMetadataInfoDeleteOutput,
  }));
// Input Schema
export const IamAccessKeyMetadataInfoGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/iamAccessKeyMetadata/{name}",
    }),
  );
export type IamAccessKeyMetadataInfoGetInput =
  typeof IamAccessKeyMetadataInfoGetInput.Type;

// Output Schema
export const IamAccessKeyMetadataInfoGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type IamAccessKeyMetadataInfoGetOutput =
  typeof IamAccessKeyMetadataInfoGetOutput.Type;

// The operation
/**
 * Get a IamAccessKeyMetadata
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of IamAccessKeyMetadata
 */
export const IamAccessKeyMetadataInfoGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IamAccessKeyMetadataInfoGetInput,
    outputSchema: IamAccessKeyMetadataInfoGetOutput,
  }),
);
// Input Schema
export const IamAccessKeyMetadataInfoListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/iamAccessKeyMetadata",
    }),
  );
export type IamAccessKeyMetadataInfoListByResourceGroupInput =
  typeof IamAccessKeyMetadataInfoListByResourceGroupInput.Type;

// Output Schema
export const IamAccessKeyMetadataInfoListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type IamAccessKeyMetadataInfoListByResourceGroupOutput =
  typeof IamAccessKeyMetadataInfoListByResourceGroupOutput.Type;

// The operation
/**
 * List IamAccessKeyMetadata resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const IamAccessKeyMetadataInfoListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IamAccessKeyMetadataInfoListByResourceGroupInput,
    outputSchema: IamAccessKeyMetadataInfoListByResourceGroupOutput,
  }));
// Input Schema
export const IamAccessKeyMetadataInfoListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/iamAccessKeyMetadata",
    }),
  );
export type IamAccessKeyMetadataInfoListBySubscriptionInput =
  typeof IamAccessKeyMetadataInfoListBySubscriptionInput.Type;

// Output Schema
export const IamAccessKeyMetadataInfoListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type IamAccessKeyMetadataInfoListBySubscriptionOutput =
  typeof IamAccessKeyMetadataInfoListBySubscriptionOutput.Type;

// The operation
/**
 * List IamAccessKeyMetadata resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const IamAccessKeyMetadataInfoListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IamAccessKeyMetadataInfoListBySubscriptionInput,
    outputSchema: IamAccessKeyMetadataInfoListBySubscriptionOutput,
  }));
// Input Schema
export const IamAccessKeyMetadataInfoUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/iamAccessKeyMetadata/{name}",
    }),
  );
export type IamAccessKeyMetadataInfoUpdateInput =
  typeof IamAccessKeyMetadataInfoUpdateInput.Type;

// Output Schema
export const IamAccessKeyMetadataInfoUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type IamAccessKeyMetadataInfoUpdateOutput =
  typeof IamAccessKeyMetadataInfoUpdateOutput.Type;

// The operation
/**
 * Update a IamAccessKeyMetadata
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of IamAccessKeyMetadata
 */
export const IamAccessKeyMetadataInfoUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IamAccessKeyMetadataInfoUpdateInput,
    outputSchema: IamAccessKeyMetadataInfoUpdateOutput,
  }));
// Input Schema
export const IamGroupsCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/iamGroups/{name}",
    }),
  );
export type IamGroupsCreateOrReplaceInput =
  typeof IamGroupsCreateOrReplaceInput.Type;

// Output Schema
export const IamGroupsCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type IamGroupsCreateOrReplaceOutput =
  typeof IamGroupsCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a IamGroup. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of IamGroup
 */
export const IamGroupsCreateOrReplace = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IamGroupsCreateOrReplaceInput,
    outputSchema: IamGroupsCreateOrReplaceOutput,
  }),
);
// Input Schema
export const IamGroupsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  name: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/iamGroups/{name}",
  }),
);
export type IamGroupsDeleteInput = typeof IamGroupsDeleteInput.Type;

// Output Schema
export const IamGroupsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type IamGroupsDeleteOutput = typeof IamGroupsDeleteOutput.Type;

// The operation
/**
 * Delete a IamGroup
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of IamGroup
 */
export const IamGroupsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: IamGroupsDeleteInput,
  outputSchema: IamGroupsDeleteOutput,
}));
// Input Schema
export const IamGroupsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  name: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/iamGroups/{name}",
  }),
);
export type IamGroupsGetInput = typeof IamGroupsGetInput.Type;

// Output Schema
export const IamGroupsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type IamGroupsGetOutput = typeof IamGroupsGetOutput.Type;

// The operation
/**
 * Get a IamGroup
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of IamGroup
 */
export const IamGroupsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: IamGroupsGetInput,
  outputSchema: IamGroupsGetOutput,
}));
// Input Schema
export const IamGroupsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/iamGroups",
    }),
  );
export type IamGroupsListByResourceGroupInput =
  typeof IamGroupsListByResourceGroupInput.Type;

// Output Schema
export const IamGroupsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type IamGroupsListByResourceGroupOutput =
  typeof IamGroupsListByResourceGroupOutput.Type;

// The operation
/**
 * List IamGroup resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const IamGroupsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IamGroupsListByResourceGroupInput,
    outputSchema: IamGroupsListByResourceGroupOutput,
  }));
// Input Schema
export const IamGroupsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/iamGroups",
    }),
  );
export type IamGroupsListBySubscriptionInput =
  typeof IamGroupsListBySubscriptionInput.Type;

// Output Schema
export const IamGroupsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type IamGroupsListBySubscriptionOutput =
  typeof IamGroupsListBySubscriptionOutput.Type;

// The operation
/**
 * List IamGroup resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const IamGroupsListBySubscription = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IamGroupsListBySubscriptionInput,
    outputSchema: IamGroupsListBySubscriptionOutput,
  }),
);
// Input Schema
export const IamGroupsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  name: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/iamGroups/{name}",
  }),
);
export type IamGroupsUpdateInput = typeof IamGroupsUpdateInput.Type;

// Output Schema
export const IamGroupsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type IamGroupsUpdateOutput = typeof IamGroupsUpdateOutput.Type;

// The operation
/**
 * Update a IamGroup
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of IamGroup
 */
export const IamGroupsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: IamGroupsUpdateInput,
  outputSchema: IamGroupsUpdateOutput,
}));
// Input Schema
export const IamInstanceProfilesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/iamInstanceProfiles/{name}",
    }),
  );
export type IamInstanceProfilesCreateOrUpdateInput =
  typeof IamInstanceProfilesCreateOrUpdateInput.Type;

// Output Schema
export const IamInstanceProfilesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type IamInstanceProfilesCreateOrUpdateOutput =
  typeof IamInstanceProfilesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a IamInstanceProfile. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of IamInstanceProfile
 */
export const IamInstanceProfilesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IamInstanceProfilesCreateOrUpdateInput,
    outputSchema: IamInstanceProfilesCreateOrUpdateOutput,
  }));
// Input Schema
export const IamInstanceProfilesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/iamInstanceProfiles/{name}",
    }),
  );
export type IamInstanceProfilesDeleteInput =
  typeof IamInstanceProfilesDeleteInput.Type;

// Output Schema
export const IamInstanceProfilesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type IamInstanceProfilesDeleteOutput =
  typeof IamInstanceProfilesDeleteOutput.Type;

// The operation
/**
 * Delete a IamInstanceProfile
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of IamInstanceProfile
 */
export const IamInstanceProfilesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IamInstanceProfilesDeleteInput,
    outputSchema: IamInstanceProfilesDeleteOutput,
  }),
);
// Input Schema
export const IamInstanceProfilesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/iamInstanceProfiles/{name}",
    }),
  );
export type IamInstanceProfilesGetInput =
  typeof IamInstanceProfilesGetInput.Type;

// Output Schema
export const IamInstanceProfilesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type IamInstanceProfilesGetOutput =
  typeof IamInstanceProfilesGetOutput.Type;

// The operation
/**
 * Get a IamInstanceProfile
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of IamInstanceProfile
 */
export const IamInstanceProfilesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IamInstanceProfilesGetInput,
    outputSchema: IamInstanceProfilesGetOutput,
  }),
);
// Input Schema
export const IamInstanceProfilesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/iamInstanceProfiles",
    }),
  );
export type IamInstanceProfilesListByResourceGroupInput =
  typeof IamInstanceProfilesListByResourceGroupInput.Type;

// Output Schema
export const IamInstanceProfilesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type IamInstanceProfilesListByResourceGroupOutput =
  typeof IamInstanceProfilesListByResourceGroupOutput.Type;

// The operation
/**
 * List IamInstanceProfile resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const IamInstanceProfilesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IamInstanceProfilesListByResourceGroupInput,
    outputSchema: IamInstanceProfilesListByResourceGroupOutput,
  }));
// Input Schema
export const IamInstanceProfilesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/iamInstanceProfiles",
    }),
  );
export type IamInstanceProfilesListBySubscriptionInput =
  typeof IamInstanceProfilesListBySubscriptionInput.Type;

// Output Schema
export const IamInstanceProfilesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type IamInstanceProfilesListBySubscriptionOutput =
  typeof IamInstanceProfilesListBySubscriptionOutput.Type;

// The operation
/**
 * List IamInstanceProfile resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const IamInstanceProfilesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IamInstanceProfilesListBySubscriptionInput,
    outputSchema: IamInstanceProfilesListBySubscriptionOutput,
  }));
// Input Schema
export const IamInstanceProfilesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/iamInstanceProfiles/{name}",
    }),
  );
export type IamInstanceProfilesUpdateInput =
  typeof IamInstanceProfilesUpdateInput.Type;

// Output Schema
export const IamInstanceProfilesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type IamInstanceProfilesUpdateOutput =
  typeof IamInstanceProfilesUpdateOutput.Type;

// The operation
/**
 * Update a IamInstanceProfile
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of IamInstanceProfile
 */
export const IamInstanceProfilesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IamInstanceProfilesUpdateInput,
    outputSchema: IamInstanceProfilesUpdateOutput,
  }),
);
// Input Schema
export const IamMfaDevicesCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/iamMFADevices/{name}",
    }),
  );
export type IamMfaDevicesCreateOrReplaceInput =
  typeof IamMfaDevicesCreateOrReplaceInput.Type;

// Output Schema
export const IamMfaDevicesCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type IamMfaDevicesCreateOrReplaceOutput =
  typeof IamMfaDevicesCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a IamMFADevice. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of IamMFADevice
 */
export const IamMfaDevicesCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IamMfaDevicesCreateOrReplaceInput,
    outputSchema: IamMfaDevicesCreateOrReplaceOutput,
  }));
// Input Schema
export const IamMfaDevicesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/iamMFADevices/{name}",
    }),
  );
export type IamMfaDevicesDeleteInput = typeof IamMfaDevicesDeleteInput.Type;

// Output Schema
export const IamMfaDevicesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type IamMfaDevicesDeleteOutput = typeof IamMfaDevicesDeleteOutput.Type;

// The operation
/**
 * Delete a IamMFADevice
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of IamMFADevice
 */
export const IamMfaDevicesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: IamMfaDevicesDeleteInput,
  outputSchema: IamMfaDevicesDeleteOutput,
}));
// Input Schema
export const IamMfaDevicesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  name: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/iamMFADevices/{name}",
  }),
);
export type IamMfaDevicesGetInput = typeof IamMfaDevicesGetInput.Type;

// Output Schema
export const IamMfaDevicesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  },
);
export type IamMfaDevicesGetOutput = typeof IamMfaDevicesGetOutput.Type;

// The operation
/**
 * Get a IamMFADevice
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of IamMFADevice
 */
export const IamMfaDevicesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: IamMfaDevicesGetInput,
  outputSchema: IamMfaDevicesGetOutput,
}));
// Input Schema
export const IamMfaDevicesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/iamMFADevices",
    }),
  );
export type IamMfaDevicesListByResourceGroupInput =
  typeof IamMfaDevicesListByResourceGroupInput.Type;

// Output Schema
export const IamMfaDevicesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type IamMfaDevicesListByResourceGroupOutput =
  typeof IamMfaDevicesListByResourceGroupOutput.Type;

// The operation
/**
 * List IamMFADevice resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const IamMfaDevicesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IamMfaDevicesListByResourceGroupInput,
    outputSchema: IamMfaDevicesListByResourceGroupOutput,
  }));
// Input Schema
export const IamMfaDevicesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/iamMFADevices",
    }),
  );
export type IamMfaDevicesListBySubscriptionInput =
  typeof IamMfaDevicesListBySubscriptionInput.Type;

// Output Schema
export const IamMfaDevicesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type IamMfaDevicesListBySubscriptionOutput =
  typeof IamMfaDevicesListBySubscriptionOutput.Type;

// The operation
/**
 * List IamMFADevice resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const IamMfaDevicesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IamMfaDevicesListBySubscriptionInput,
    outputSchema: IamMfaDevicesListBySubscriptionOutput,
  }));
// Input Schema
export const IamMfaDevicesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/iamMFADevices/{name}",
    }),
  );
export type IamMfaDevicesUpdateInput = typeof IamMfaDevicesUpdateInput.Type;

// Output Schema
export const IamMfaDevicesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type IamMfaDevicesUpdateOutput = typeof IamMfaDevicesUpdateOutput.Type;

// The operation
/**
 * Update a IamMFADevice
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of IamMFADevice
 */
export const IamMfaDevicesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: IamMfaDevicesUpdateInput,
  outputSchema: IamMfaDevicesUpdateOutput,
}));
// Input Schema
export const IamPasswordPoliciesCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/iamPasswordPolicies/{name}",
    }),
  );
export type IamPasswordPoliciesCreateOrReplaceInput =
  typeof IamPasswordPoliciesCreateOrReplaceInput.Type;

// Output Schema
export const IamPasswordPoliciesCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type IamPasswordPoliciesCreateOrReplaceOutput =
  typeof IamPasswordPoliciesCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a IamPasswordPolicy. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of IamPasswordPolicy
 */
export const IamPasswordPoliciesCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IamPasswordPoliciesCreateOrReplaceInput,
    outputSchema: IamPasswordPoliciesCreateOrReplaceOutput,
  }));
// Input Schema
export const IamPasswordPoliciesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/iamPasswordPolicies/{name}",
    }),
  );
export type IamPasswordPoliciesDeleteInput =
  typeof IamPasswordPoliciesDeleteInput.Type;

// Output Schema
export const IamPasswordPoliciesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type IamPasswordPoliciesDeleteOutput =
  typeof IamPasswordPoliciesDeleteOutput.Type;

// The operation
/**
 * Delete a IamPasswordPolicy
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of IamPasswordPolicy
 */
export const IamPasswordPoliciesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IamPasswordPoliciesDeleteInput,
    outputSchema: IamPasswordPoliciesDeleteOutput,
  }),
);
// Input Schema
export const IamPasswordPoliciesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/iamPasswordPolicies/{name}",
    }),
  );
export type IamPasswordPoliciesGetInput =
  typeof IamPasswordPoliciesGetInput.Type;

// Output Schema
export const IamPasswordPoliciesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type IamPasswordPoliciesGetOutput =
  typeof IamPasswordPoliciesGetOutput.Type;

// The operation
/**
 * Get a IamPasswordPolicy
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of IamPasswordPolicy
 */
export const IamPasswordPoliciesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IamPasswordPoliciesGetInput,
    outputSchema: IamPasswordPoliciesGetOutput,
  }),
);
// Input Schema
export const IamPasswordPoliciesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/iamPasswordPolicies",
    }),
  );
export type IamPasswordPoliciesListByResourceGroupInput =
  typeof IamPasswordPoliciesListByResourceGroupInput.Type;

// Output Schema
export const IamPasswordPoliciesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type IamPasswordPoliciesListByResourceGroupOutput =
  typeof IamPasswordPoliciesListByResourceGroupOutput.Type;

// The operation
/**
 * List IamPasswordPolicy resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const IamPasswordPoliciesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IamPasswordPoliciesListByResourceGroupInput,
    outputSchema: IamPasswordPoliciesListByResourceGroupOutput,
  }));
// Input Schema
export const IamPasswordPoliciesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/iamPasswordPolicies",
    }),
  );
export type IamPasswordPoliciesListBySubscriptionInput =
  typeof IamPasswordPoliciesListBySubscriptionInput.Type;

// Output Schema
export const IamPasswordPoliciesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type IamPasswordPoliciesListBySubscriptionOutput =
  typeof IamPasswordPoliciesListBySubscriptionOutput.Type;

// The operation
/**
 * List IamPasswordPolicy resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const IamPasswordPoliciesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IamPasswordPoliciesListBySubscriptionInput,
    outputSchema: IamPasswordPoliciesListBySubscriptionOutput,
  }));
// Input Schema
export const IamPasswordPoliciesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/iamPasswordPolicies/{name}",
    }),
  );
export type IamPasswordPoliciesUpdateInput =
  typeof IamPasswordPoliciesUpdateInput.Type;

// Output Schema
export const IamPasswordPoliciesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type IamPasswordPoliciesUpdateOutput =
  typeof IamPasswordPoliciesUpdateOutput.Type;

// The operation
/**
 * Update a IamPasswordPolicy
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of IamPasswordPolicy
 */
export const IamPasswordPoliciesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IamPasswordPoliciesUpdateInput,
    outputSchema: IamPasswordPoliciesUpdateOutput,
  }),
);
// Input Schema
export const IamPolicyVersionsCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/iamPolicyVersions/{name}",
    }),
  );
export type IamPolicyVersionsCreateOrReplaceInput =
  typeof IamPolicyVersionsCreateOrReplaceInput.Type;

// Output Schema
export const IamPolicyVersionsCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type IamPolicyVersionsCreateOrReplaceOutput =
  typeof IamPolicyVersionsCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a IamPolicyVersion. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of IamPolicyVersion
 */
export const IamPolicyVersionsCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IamPolicyVersionsCreateOrReplaceInput,
    outputSchema: IamPolicyVersionsCreateOrReplaceOutput,
  }));
// Input Schema
export const IamPolicyVersionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/iamPolicyVersions/{name}",
    }),
  );
export type IamPolicyVersionsDeleteInput =
  typeof IamPolicyVersionsDeleteInput.Type;

// Output Schema
export const IamPolicyVersionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type IamPolicyVersionsDeleteOutput =
  typeof IamPolicyVersionsDeleteOutput.Type;

// The operation
/**
 * Delete a IamPolicyVersion
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of IamPolicyVersion
 */
export const IamPolicyVersionsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IamPolicyVersionsDeleteInput,
    outputSchema: IamPolicyVersionsDeleteOutput,
  }),
);
// Input Schema
export const IamPolicyVersionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/iamPolicyVersions/{name}",
    }),
  );
export type IamPolicyVersionsGetInput = typeof IamPolicyVersionsGetInput.Type;

// Output Schema
export const IamPolicyVersionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type IamPolicyVersionsGetOutput = typeof IamPolicyVersionsGetOutput.Type;

// The operation
/**
 * Get a IamPolicyVersion
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of IamPolicyVersion
 */
export const IamPolicyVersionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IamPolicyVersionsGetInput,
    outputSchema: IamPolicyVersionsGetOutput,
  }),
);
// Input Schema
export const IamPolicyVersionsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/iamPolicyVersions",
    }),
  );
export type IamPolicyVersionsListByResourceGroupInput =
  typeof IamPolicyVersionsListByResourceGroupInput.Type;

// Output Schema
export const IamPolicyVersionsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type IamPolicyVersionsListByResourceGroupOutput =
  typeof IamPolicyVersionsListByResourceGroupOutput.Type;

// The operation
/**
 * List IamPolicyVersion resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const IamPolicyVersionsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IamPolicyVersionsListByResourceGroupInput,
    outputSchema: IamPolicyVersionsListByResourceGroupOutput,
  }));
// Input Schema
export const IamPolicyVersionsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/iamPolicyVersions",
    }),
  );
export type IamPolicyVersionsListBySubscriptionInput =
  typeof IamPolicyVersionsListBySubscriptionInput.Type;

// Output Schema
export const IamPolicyVersionsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type IamPolicyVersionsListBySubscriptionOutput =
  typeof IamPolicyVersionsListBySubscriptionOutput.Type;

// The operation
/**
 * List IamPolicyVersion resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const IamPolicyVersionsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IamPolicyVersionsListBySubscriptionInput,
    outputSchema: IamPolicyVersionsListBySubscriptionOutput,
  }));
// Input Schema
export const IamPolicyVersionsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/iamPolicyVersions/{name}",
    }),
  );
export type IamPolicyVersionsUpdateInput =
  typeof IamPolicyVersionsUpdateInput.Type;

// Output Schema
export const IamPolicyVersionsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type IamPolicyVersionsUpdateOutput =
  typeof IamPolicyVersionsUpdateOutput.Type;

// The operation
/**
 * Update a IamPolicyVersion
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of IamPolicyVersion
 */
export const IamPolicyVersionsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IamPolicyVersionsUpdateInput,
    outputSchema: IamPolicyVersionsUpdateOutput,
  }),
);
// Input Schema
export const IamRolesCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/iamRoles/{name}",
    }),
  );
export type IamRolesCreateOrReplaceInput =
  typeof IamRolesCreateOrReplaceInput.Type;

// Output Schema
export const IamRolesCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type IamRolesCreateOrReplaceOutput =
  typeof IamRolesCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a IamRole. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of IamRole
 */
export const IamRolesCreateOrReplace = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IamRolesCreateOrReplaceInput,
    outputSchema: IamRolesCreateOrReplaceOutput,
  }),
);
// Input Schema
export const IamRolesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  name: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/iamRoles/{name}",
  }),
);
export type IamRolesDeleteInput = typeof IamRolesDeleteInput.Type;

// Output Schema
export const IamRolesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type IamRolesDeleteOutput = typeof IamRolesDeleteOutput.Type;

// The operation
/**
 * Delete a IamRole
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of IamRole
 */
export const IamRolesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: IamRolesDeleteInput,
  outputSchema: IamRolesDeleteOutput,
}));
// Input Schema
export const IamRolesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  name: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/iamRoles/{name}",
  }),
);
export type IamRolesGetInput = typeof IamRolesGetInput.Type;

// Output Schema
export const IamRolesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type IamRolesGetOutput = typeof IamRolesGetOutput.Type;

// The operation
/**
 * Get a IamRole
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of IamRole
 */
export const IamRolesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: IamRolesGetInput,
  outputSchema: IamRolesGetOutput,
}));
// Input Schema
export const IamRolesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/iamRoles",
    }),
  );
export type IamRolesListByResourceGroupInput =
  typeof IamRolesListByResourceGroupInput.Type;

// Output Schema
export const IamRolesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type IamRolesListByResourceGroupOutput =
  typeof IamRolesListByResourceGroupOutput.Type;

// The operation
/**
 * List IamRole resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const IamRolesListByResourceGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IamRolesListByResourceGroupInput,
    outputSchema: IamRolesListByResourceGroupOutput,
  }),
);
// Input Schema
export const IamRolesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/iamRoles",
    }),
  );
export type IamRolesListBySubscriptionInput =
  typeof IamRolesListBySubscriptionInput.Type;

// Output Schema
export const IamRolesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type IamRolesListBySubscriptionOutput =
  typeof IamRolesListBySubscriptionOutput.Type;

// The operation
/**
 * List IamRole resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const IamRolesListBySubscription = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IamRolesListBySubscriptionInput,
    outputSchema: IamRolesListBySubscriptionOutput,
  }),
);
// Input Schema
export const IamRolesUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  name: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/iamRoles/{name}",
  }),
);
export type IamRolesUpdateInput = typeof IamRolesUpdateInput.Type;

// Output Schema
export const IamRolesUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type IamRolesUpdateOutput = typeof IamRolesUpdateOutput.Type;

// The operation
/**
 * Update a IamRole
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of IamRole
 */
export const IamRolesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: IamRolesUpdateInput,
  outputSchema: IamRolesUpdateOutput,
}));
// Input Schema
export const IamServerCertificatesCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/iamServerCertificates/{name}",
    }),
  );
export type IamServerCertificatesCreateOrReplaceInput =
  typeof IamServerCertificatesCreateOrReplaceInput.Type;

// Output Schema
export const IamServerCertificatesCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type IamServerCertificatesCreateOrReplaceOutput =
  typeof IamServerCertificatesCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a IamServerCertificate. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of IamServerCertificate
 */
export const IamServerCertificatesCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IamServerCertificatesCreateOrReplaceInput,
    outputSchema: IamServerCertificatesCreateOrReplaceOutput,
  }));
// Input Schema
export const IamServerCertificatesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/iamServerCertificates/{name}",
    }),
  );
export type IamServerCertificatesDeleteInput =
  typeof IamServerCertificatesDeleteInput.Type;

// Output Schema
export const IamServerCertificatesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type IamServerCertificatesDeleteOutput =
  typeof IamServerCertificatesDeleteOutput.Type;

// The operation
/**
 * Delete a IamServerCertificate
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of IamServerCertificate
 */
export const IamServerCertificatesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IamServerCertificatesDeleteInput,
    outputSchema: IamServerCertificatesDeleteOutput,
  }),
);
// Input Schema
export const IamServerCertificatesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/iamServerCertificates/{name}",
    }),
  );
export type IamServerCertificatesGetInput =
  typeof IamServerCertificatesGetInput.Type;

// Output Schema
export const IamServerCertificatesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type IamServerCertificatesGetOutput =
  typeof IamServerCertificatesGetOutput.Type;

// The operation
/**
 * Get a IamServerCertificate
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of IamServerCertificate
 */
export const IamServerCertificatesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IamServerCertificatesGetInput,
    outputSchema: IamServerCertificatesGetOutput,
  }),
);
// Input Schema
export const IamServerCertificatesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/iamServerCertificates",
    }),
  );
export type IamServerCertificatesListByResourceGroupInput =
  typeof IamServerCertificatesListByResourceGroupInput.Type;

// Output Schema
export const IamServerCertificatesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type IamServerCertificatesListByResourceGroupOutput =
  typeof IamServerCertificatesListByResourceGroupOutput.Type;

// The operation
/**
 * List IamServerCertificate resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const IamServerCertificatesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IamServerCertificatesListByResourceGroupInput,
    outputSchema: IamServerCertificatesListByResourceGroupOutput,
  }));
// Input Schema
export const IamServerCertificatesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/iamServerCertificates",
    }),
  );
export type IamServerCertificatesListBySubscriptionInput =
  typeof IamServerCertificatesListBySubscriptionInput.Type;

// Output Schema
export const IamServerCertificatesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type IamServerCertificatesListBySubscriptionOutput =
  typeof IamServerCertificatesListBySubscriptionOutput.Type;

// The operation
/**
 * List IamServerCertificate resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const IamServerCertificatesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IamServerCertificatesListBySubscriptionInput,
    outputSchema: IamServerCertificatesListBySubscriptionOutput,
  }));
// Input Schema
export const IamServerCertificatesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/iamServerCertificates/{name}",
    }),
  );
export type IamServerCertificatesUpdateInput =
  typeof IamServerCertificatesUpdateInput.Type;

// Output Schema
export const IamServerCertificatesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type IamServerCertificatesUpdateOutput =
  typeof IamServerCertificatesUpdateOutput.Type;

// The operation
/**
 * Update a IamServerCertificate
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of IamServerCertificate
 */
export const IamServerCertificatesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IamServerCertificatesUpdateInput,
    outputSchema: IamServerCertificatesUpdateOutput,
  }),
);
// Input Schema
export const IamVirtualMfaDevicesCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/iamVirtualMFADevices/{name}",
    }),
  );
export type IamVirtualMfaDevicesCreateOrReplaceInput =
  typeof IamVirtualMfaDevicesCreateOrReplaceInput.Type;

// Output Schema
export const IamVirtualMfaDevicesCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type IamVirtualMfaDevicesCreateOrReplaceOutput =
  typeof IamVirtualMfaDevicesCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a IamVirtualMFADevice. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of IamVirtualMFADevice
 */
export const IamVirtualMfaDevicesCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IamVirtualMfaDevicesCreateOrReplaceInput,
    outputSchema: IamVirtualMfaDevicesCreateOrReplaceOutput,
  }));
// Input Schema
export const IamVirtualMfaDevicesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/iamVirtualMFADevices/{name}",
    }),
  );
export type IamVirtualMfaDevicesDeleteInput =
  typeof IamVirtualMfaDevicesDeleteInput.Type;

// Output Schema
export const IamVirtualMfaDevicesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type IamVirtualMfaDevicesDeleteOutput =
  typeof IamVirtualMfaDevicesDeleteOutput.Type;

// The operation
/**
 * Delete a IamVirtualMFADevice
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of IamVirtualMFADevice
 */
export const IamVirtualMfaDevicesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IamVirtualMfaDevicesDeleteInput,
    outputSchema: IamVirtualMfaDevicesDeleteOutput,
  }),
);
// Input Schema
export const IamVirtualMfaDevicesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/iamVirtualMFADevices/{name}",
    }),
  );
export type IamVirtualMfaDevicesGetInput =
  typeof IamVirtualMfaDevicesGetInput.Type;

// Output Schema
export const IamVirtualMfaDevicesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type IamVirtualMfaDevicesGetOutput =
  typeof IamVirtualMfaDevicesGetOutput.Type;

// The operation
/**
 * Get a IamVirtualMFADevice
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of IamVirtualMFADevice
 */
export const IamVirtualMfaDevicesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IamVirtualMfaDevicesGetInput,
    outputSchema: IamVirtualMfaDevicesGetOutput,
  }),
);
// Input Schema
export const IamVirtualMfaDevicesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/iamVirtualMFADevices",
    }),
  );
export type IamVirtualMfaDevicesListByResourceGroupInput =
  typeof IamVirtualMfaDevicesListByResourceGroupInput.Type;

// Output Schema
export const IamVirtualMfaDevicesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type IamVirtualMfaDevicesListByResourceGroupOutput =
  typeof IamVirtualMfaDevicesListByResourceGroupOutput.Type;

// The operation
/**
 * List IamVirtualMFADevice resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const IamVirtualMfaDevicesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IamVirtualMfaDevicesListByResourceGroupInput,
    outputSchema: IamVirtualMfaDevicesListByResourceGroupOutput,
  }));
// Input Schema
export const IamVirtualMfaDevicesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/iamVirtualMFADevices",
    }),
  );
export type IamVirtualMfaDevicesListBySubscriptionInput =
  typeof IamVirtualMfaDevicesListBySubscriptionInput.Type;

// Output Schema
export const IamVirtualMfaDevicesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type IamVirtualMfaDevicesListBySubscriptionOutput =
  typeof IamVirtualMfaDevicesListBySubscriptionOutput.Type;

// The operation
/**
 * List IamVirtualMFADevice resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const IamVirtualMfaDevicesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IamVirtualMfaDevicesListBySubscriptionInput,
    outputSchema: IamVirtualMfaDevicesListBySubscriptionOutput,
  }));
// Input Schema
export const IamVirtualMfaDevicesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/iamVirtualMFADevices/{name}",
    }),
  );
export type IamVirtualMfaDevicesUpdateInput =
  typeof IamVirtualMfaDevicesUpdateInput.Type;

// Output Schema
export const IamVirtualMfaDevicesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type IamVirtualMfaDevicesUpdateOutput =
  typeof IamVirtualMfaDevicesUpdateOutput.Type;

// The operation
/**
 * Update a IamVirtualMFADevice
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of IamVirtualMFADevice
 */
export const IamVirtualMfaDevicesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IamVirtualMfaDevicesUpdateInput,
    outputSchema: IamVirtualMfaDevicesUpdateOutput,
  }),
);
// Input Schema
export const KmsAliasesCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/kmsAliases/{name}",
    }),
  );
export type KmsAliasesCreateOrReplaceInput =
  typeof KmsAliasesCreateOrReplaceInput.Type;

// Output Schema
export const KmsAliasesCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type KmsAliasesCreateOrReplaceOutput =
  typeof KmsAliasesCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a KmsAlias. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of KmsAlias
 */
export const KmsAliasesCreateOrReplace = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: KmsAliasesCreateOrReplaceInput,
    outputSchema: KmsAliasesCreateOrReplaceOutput,
  }),
);
// Input Schema
export const KmsAliasesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  name: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/kmsAliases/{name}",
  }),
);
export type KmsAliasesDeleteInput = typeof KmsAliasesDeleteInput.Type;

// Output Schema
export const KmsAliasesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type KmsAliasesDeleteOutput = typeof KmsAliasesDeleteOutput.Type;

// The operation
/**
 * Delete a KmsAlias
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of KmsAlias
 */
export const KmsAliasesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: KmsAliasesDeleteInput,
  outputSchema: KmsAliasesDeleteOutput,
}));
// Input Schema
export const KmsAliasesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  name: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/kmsAliases/{name}",
  }),
);
export type KmsAliasesGetInput = typeof KmsAliasesGetInput.Type;

// Output Schema
export const KmsAliasesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type KmsAliasesGetOutput = typeof KmsAliasesGetOutput.Type;

// The operation
/**
 * Get a KmsAlias
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of KmsAlias
 */
export const KmsAliasesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: KmsAliasesGetInput,
  outputSchema: KmsAliasesGetOutput,
}));
// Input Schema
export const KmsAliasesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/kmsAliases",
    }),
  );
export type KmsAliasesListByResourceGroupInput =
  typeof KmsAliasesListByResourceGroupInput.Type;

// Output Schema
export const KmsAliasesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type KmsAliasesListByResourceGroupOutput =
  typeof KmsAliasesListByResourceGroupOutput.Type;

// The operation
/**
 * List KmsAlias resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const KmsAliasesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: KmsAliasesListByResourceGroupInput,
    outputSchema: KmsAliasesListByResourceGroupOutput,
  }));
// Input Schema
export const KmsAliasesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/kmsAliases",
    }),
  );
export type KmsAliasesListBySubscriptionInput =
  typeof KmsAliasesListBySubscriptionInput.Type;

// Output Schema
export const KmsAliasesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type KmsAliasesListBySubscriptionOutput =
  typeof KmsAliasesListBySubscriptionOutput.Type;

// The operation
/**
 * List KmsAlias resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const KmsAliasesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: KmsAliasesListBySubscriptionInput,
    outputSchema: KmsAliasesListBySubscriptionOutput,
  }));
// Input Schema
export const KmsAliasesUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  name: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/kmsAliases/{name}",
  }),
);
export type KmsAliasesUpdateInput = typeof KmsAliasesUpdateInput.Type;

// Output Schema
export const KmsAliasesUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  },
);
export type KmsAliasesUpdateOutput = typeof KmsAliasesUpdateOutput.Type;

// The operation
/**
 * Update a KmsAlias
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of KmsAlias
 */
export const KmsAliasesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: KmsAliasesUpdateInput,
  outputSchema: KmsAliasesUpdateOutput,
}));
// Input Schema
export const KmsKeysCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/kmsKeys/{name}",
    }),
  );
export type KmsKeysCreateOrReplaceInput =
  typeof KmsKeysCreateOrReplaceInput.Type;

// Output Schema
export const KmsKeysCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type KmsKeysCreateOrReplaceOutput =
  typeof KmsKeysCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a KmsKey. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of KmsKey
 */
export const KmsKeysCreateOrReplace = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: KmsKeysCreateOrReplaceInput,
    outputSchema: KmsKeysCreateOrReplaceOutput,
  }),
);
// Input Schema
export const KmsKeysDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  name: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/kmsKeys/{name}",
  }),
);
export type KmsKeysDeleteInput = typeof KmsKeysDeleteInput.Type;

// Output Schema
export const KmsKeysDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type KmsKeysDeleteOutput = typeof KmsKeysDeleteOutput.Type;

// The operation
/**
 * Delete a KmsKey
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of KmsKey
 */
export const KmsKeysDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: KmsKeysDeleteInput,
  outputSchema: KmsKeysDeleteOutput,
}));
// Input Schema
export const KmsKeysGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  name: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/kmsKeys/{name}",
  }),
);
export type KmsKeysGetInput = typeof KmsKeysGetInput.Type;

// Output Schema
export const KmsKeysGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type KmsKeysGetOutput = typeof KmsKeysGetOutput.Type;

// The operation
/**
 * Get a KmsKey
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of KmsKey
 */
export const KmsKeysGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: KmsKeysGetInput,
  outputSchema: KmsKeysGetOutput,
}));
// Input Schema
export const KmsKeysListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/kmsKeys",
    }),
  );
export type KmsKeysListByResourceGroupInput =
  typeof KmsKeysListByResourceGroupInput.Type;

// Output Schema
export const KmsKeysListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type KmsKeysListByResourceGroupOutput =
  typeof KmsKeysListByResourceGroupOutput.Type;

// The operation
/**
 * List KmsKey resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const KmsKeysListByResourceGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: KmsKeysListByResourceGroupInput,
    outputSchema: KmsKeysListByResourceGroupOutput,
  }),
);
// Input Schema
export const KmsKeysListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/kmsKeys",
    }),
  );
export type KmsKeysListBySubscriptionInput =
  typeof KmsKeysListBySubscriptionInput.Type;

// Output Schema
export const KmsKeysListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type KmsKeysListBySubscriptionOutput =
  typeof KmsKeysListBySubscriptionOutput.Type;

// The operation
/**
 * List KmsKey resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const KmsKeysListBySubscription = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: KmsKeysListBySubscriptionInput,
    outputSchema: KmsKeysListBySubscriptionOutput,
  }),
);
// Input Schema
export const KmsKeysUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  name: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/kmsKeys/{name}",
  }),
);
export type KmsKeysUpdateInput = typeof KmsKeysUpdateInput.Type;

// Output Schema
export const KmsKeysUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type KmsKeysUpdateOutput = typeof KmsKeysUpdateOutput.Type;

// The operation
/**
 * Update a KmsKey
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of KmsKey
 */
export const KmsKeysUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: KmsKeysUpdateInput,
  outputSchema: KmsKeysUpdateOutput,
}));
// Input Schema
export const LambdaFunctionCodeLocationsCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/lambdaFunctionCodeLocations/{name}",
    }),
  );
export type LambdaFunctionCodeLocationsCreateOrReplaceInput =
  typeof LambdaFunctionCodeLocationsCreateOrReplaceInput.Type;

// Output Schema
export const LambdaFunctionCodeLocationsCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type LambdaFunctionCodeLocationsCreateOrReplaceOutput =
  typeof LambdaFunctionCodeLocationsCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a LambdaFunctionCodeLocation. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of LambdaFunctionCodeLocation
 */
export const LambdaFunctionCodeLocationsCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LambdaFunctionCodeLocationsCreateOrReplaceInput,
    outputSchema: LambdaFunctionCodeLocationsCreateOrReplaceOutput,
  }));
// Input Schema
export const LambdaFunctionCodeLocationsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/lambdaFunctionCodeLocations/{name}",
    }),
  );
export type LambdaFunctionCodeLocationsDeleteInput =
  typeof LambdaFunctionCodeLocationsDeleteInput.Type;

// Output Schema
export const LambdaFunctionCodeLocationsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type LambdaFunctionCodeLocationsDeleteOutput =
  typeof LambdaFunctionCodeLocationsDeleteOutput.Type;

// The operation
/**
 * Delete a LambdaFunctionCodeLocation
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of LambdaFunctionCodeLocation
 */
export const LambdaFunctionCodeLocationsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LambdaFunctionCodeLocationsDeleteInput,
    outputSchema: LambdaFunctionCodeLocationsDeleteOutput,
  }));
// Input Schema
export const LambdaFunctionCodeLocationsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/lambdaFunctionCodeLocations/{name}",
    }),
  );
export type LambdaFunctionCodeLocationsGetInput =
  typeof LambdaFunctionCodeLocationsGetInput.Type;

// Output Schema
export const LambdaFunctionCodeLocationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type LambdaFunctionCodeLocationsGetOutput =
  typeof LambdaFunctionCodeLocationsGetOutput.Type;

// The operation
/**
 * Get a LambdaFunctionCodeLocation
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of LambdaFunctionCodeLocation
 */
export const LambdaFunctionCodeLocationsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LambdaFunctionCodeLocationsGetInput,
    outputSchema: LambdaFunctionCodeLocationsGetOutput,
  }));
// Input Schema
export const LambdaFunctionCodeLocationsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/lambdaFunctionCodeLocations",
    }),
  );
export type LambdaFunctionCodeLocationsListByResourceGroupInput =
  typeof LambdaFunctionCodeLocationsListByResourceGroupInput.Type;

// Output Schema
export const LambdaFunctionCodeLocationsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type LambdaFunctionCodeLocationsListByResourceGroupOutput =
  typeof LambdaFunctionCodeLocationsListByResourceGroupOutput.Type;

// The operation
/**
 * List LambdaFunctionCodeLocation resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const LambdaFunctionCodeLocationsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LambdaFunctionCodeLocationsListByResourceGroupInput,
    outputSchema: LambdaFunctionCodeLocationsListByResourceGroupOutput,
  }));
// Input Schema
export const LambdaFunctionCodeLocationsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/lambdaFunctionCodeLocations",
    }),
  );
export type LambdaFunctionCodeLocationsListBySubscriptionInput =
  typeof LambdaFunctionCodeLocationsListBySubscriptionInput.Type;

// Output Schema
export const LambdaFunctionCodeLocationsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type LambdaFunctionCodeLocationsListBySubscriptionOutput =
  typeof LambdaFunctionCodeLocationsListBySubscriptionOutput.Type;

// The operation
/**
 * List LambdaFunctionCodeLocation resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const LambdaFunctionCodeLocationsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LambdaFunctionCodeLocationsListBySubscriptionInput,
    outputSchema: LambdaFunctionCodeLocationsListBySubscriptionOutput,
  }));
// Input Schema
export const LambdaFunctionCodeLocationsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/lambdaFunctionCodeLocations/{name}",
    }),
  );
export type LambdaFunctionCodeLocationsUpdateInput =
  typeof LambdaFunctionCodeLocationsUpdateInput.Type;

// Output Schema
export const LambdaFunctionCodeLocationsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type LambdaFunctionCodeLocationsUpdateOutput =
  typeof LambdaFunctionCodeLocationsUpdateOutput.Type;

// The operation
/**
 * Update a LambdaFunctionCodeLocation
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of LambdaFunctionCodeLocation
 */
export const LambdaFunctionCodeLocationsUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LambdaFunctionCodeLocationsUpdateInput,
    outputSchema: LambdaFunctionCodeLocationsUpdateOutput,
  }));
// Input Schema
export const LambdaFunctionsCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/lambdaFunctions/{name}",
    }),
  );
export type LambdaFunctionsCreateOrReplaceInput =
  typeof LambdaFunctionsCreateOrReplaceInput.Type;

// Output Schema
export const LambdaFunctionsCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type LambdaFunctionsCreateOrReplaceOutput =
  typeof LambdaFunctionsCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a LambdaFunction. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of LambdaFunction
 */
export const LambdaFunctionsCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LambdaFunctionsCreateOrReplaceInput,
    outputSchema: LambdaFunctionsCreateOrReplaceOutput,
  }));
// Input Schema
export const LambdaFunctionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/lambdaFunctions/{name}",
    }),
  );
export type LambdaFunctionsDeleteInput = typeof LambdaFunctionsDeleteInput.Type;

// Output Schema
export const LambdaFunctionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type LambdaFunctionsDeleteOutput =
  typeof LambdaFunctionsDeleteOutput.Type;

// The operation
/**
 * Delete a LambdaFunction
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of LambdaFunction
 */
export const LambdaFunctionsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: LambdaFunctionsDeleteInput,
    outputSchema: LambdaFunctionsDeleteOutput,
  }),
);
// Input Schema
export const LambdaFunctionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/lambdaFunctions/{name}",
    }),
  );
export type LambdaFunctionsGetInput = typeof LambdaFunctionsGetInput.Type;

// Output Schema
export const LambdaFunctionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type LambdaFunctionsGetOutput = typeof LambdaFunctionsGetOutput.Type;

// The operation
/**
 * Get a LambdaFunction
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of LambdaFunction
 */
export const LambdaFunctionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: LambdaFunctionsGetInput,
  outputSchema: LambdaFunctionsGetOutput,
}));
// Input Schema
export const LambdaFunctionsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/lambdaFunctions",
    }),
  );
export type LambdaFunctionsListByResourceGroupInput =
  typeof LambdaFunctionsListByResourceGroupInput.Type;

// Output Schema
export const LambdaFunctionsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type LambdaFunctionsListByResourceGroupOutput =
  typeof LambdaFunctionsListByResourceGroupOutput.Type;

// The operation
/**
 * List LambdaFunction resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const LambdaFunctionsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LambdaFunctionsListByResourceGroupInput,
    outputSchema: LambdaFunctionsListByResourceGroupOutput,
  }));
// Input Schema
export const LambdaFunctionsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/lambdaFunctions",
    }),
  );
export type LambdaFunctionsListBySubscriptionInput =
  typeof LambdaFunctionsListBySubscriptionInput.Type;

// Output Schema
export const LambdaFunctionsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type LambdaFunctionsListBySubscriptionOutput =
  typeof LambdaFunctionsListBySubscriptionOutput.Type;

// The operation
/**
 * List LambdaFunction resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const LambdaFunctionsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LambdaFunctionsListBySubscriptionInput,
    outputSchema: LambdaFunctionsListBySubscriptionOutput,
  }));
// Input Schema
export const LambdaFunctionsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/lambdaFunctions/{name}",
    }),
  );
export type LambdaFunctionsUpdateInput = typeof LambdaFunctionsUpdateInput.Type;

// Output Schema
export const LambdaFunctionsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type LambdaFunctionsUpdateOutput =
  typeof LambdaFunctionsUpdateOutput.Type;

// The operation
/**
 * Update a LambdaFunction
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of LambdaFunction
 */
export const LambdaFunctionsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: LambdaFunctionsUpdateInput,
    outputSchema: LambdaFunctionsUpdateOutput,
  }),
);
// Input Schema
export const LightsailBucketsCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/lightsailBuckets/{name}",
    }),
  );
export type LightsailBucketsCreateOrReplaceInput =
  typeof LightsailBucketsCreateOrReplaceInput.Type;

// Output Schema
export const LightsailBucketsCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type LightsailBucketsCreateOrReplaceOutput =
  typeof LightsailBucketsCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a LightsailBucket. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of LightsailBucket
 */
export const LightsailBucketsCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LightsailBucketsCreateOrReplaceInput,
    outputSchema: LightsailBucketsCreateOrReplaceOutput,
  }));
// Input Schema
export const LightsailBucketsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/lightsailBuckets/{name}",
    }),
  );
export type LightsailBucketsDeleteInput =
  typeof LightsailBucketsDeleteInput.Type;

// Output Schema
export const LightsailBucketsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type LightsailBucketsDeleteOutput =
  typeof LightsailBucketsDeleteOutput.Type;

// The operation
/**
 * Delete a LightsailBucket
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of LightsailBucket
 */
export const LightsailBucketsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: LightsailBucketsDeleteInput,
    outputSchema: LightsailBucketsDeleteOutput,
  }),
);
// Input Schema
export const LightsailBucketsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/lightsailBuckets/{name}",
    }),
  );
export type LightsailBucketsGetInput = typeof LightsailBucketsGetInput.Type;

// Output Schema
export const LightsailBucketsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type LightsailBucketsGetOutput = typeof LightsailBucketsGetOutput.Type;

// The operation
/**
 * Get a LightsailBucket
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of LightsailBucket
 */
export const LightsailBucketsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: LightsailBucketsGetInput,
  outputSchema: LightsailBucketsGetOutput,
}));
// Input Schema
export const LightsailBucketsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/lightsailBuckets",
    }),
  );
export type LightsailBucketsListByResourceGroupInput =
  typeof LightsailBucketsListByResourceGroupInput.Type;

// Output Schema
export const LightsailBucketsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type LightsailBucketsListByResourceGroupOutput =
  typeof LightsailBucketsListByResourceGroupOutput.Type;

// The operation
/**
 * List LightsailBucket resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const LightsailBucketsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LightsailBucketsListByResourceGroupInput,
    outputSchema: LightsailBucketsListByResourceGroupOutput,
  }));
// Input Schema
export const LightsailBucketsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/lightsailBuckets",
    }),
  );
export type LightsailBucketsListBySubscriptionInput =
  typeof LightsailBucketsListBySubscriptionInput.Type;

// Output Schema
export const LightsailBucketsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type LightsailBucketsListBySubscriptionOutput =
  typeof LightsailBucketsListBySubscriptionOutput.Type;

// The operation
/**
 * List LightsailBucket resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const LightsailBucketsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LightsailBucketsListBySubscriptionInput,
    outputSchema: LightsailBucketsListBySubscriptionOutput,
  }));
// Input Schema
export const LightsailBucketsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/lightsailBuckets/{name}",
    }),
  );
export type LightsailBucketsUpdateInput =
  typeof LightsailBucketsUpdateInput.Type;

// Output Schema
export const LightsailBucketsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type LightsailBucketsUpdateOutput =
  typeof LightsailBucketsUpdateOutput.Type;

// The operation
/**
 * Update a LightsailBucket
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of LightsailBucket
 */
export const LightsailBucketsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: LightsailBucketsUpdateInput,
    outputSchema: LightsailBucketsUpdateOutput,
  }),
);
// Input Schema
export const LightsailInstancesCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/lightsailInstances/{name}",
    }),
  );
export type LightsailInstancesCreateOrReplaceInput =
  typeof LightsailInstancesCreateOrReplaceInput.Type;

// Output Schema
export const LightsailInstancesCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type LightsailInstancesCreateOrReplaceOutput =
  typeof LightsailInstancesCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a LightsailInstance. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of LightsailInstance
 */
export const LightsailInstancesCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LightsailInstancesCreateOrReplaceInput,
    outputSchema: LightsailInstancesCreateOrReplaceOutput,
  }));
// Input Schema
export const LightsailInstancesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/lightsailInstances/{name}",
    }),
  );
export type LightsailInstancesDeleteInput =
  typeof LightsailInstancesDeleteInput.Type;

// Output Schema
export const LightsailInstancesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type LightsailInstancesDeleteOutput =
  typeof LightsailInstancesDeleteOutput.Type;

// The operation
/**
 * Delete a LightsailInstance
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of LightsailInstance
 */
export const LightsailInstancesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: LightsailInstancesDeleteInput,
    outputSchema: LightsailInstancesDeleteOutput,
  }),
);
// Input Schema
export const LightsailInstancesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/lightsailInstances/{name}",
    }),
  );
export type LightsailInstancesGetInput = typeof LightsailInstancesGetInput.Type;

// Output Schema
export const LightsailInstancesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type LightsailInstancesGetOutput =
  typeof LightsailInstancesGetOutput.Type;

// The operation
/**
 * Get a LightsailInstance
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of LightsailInstance
 */
export const LightsailInstancesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: LightsailInstancesGetInput,
    outputSchema: LightsailInstancesGetOutput,
  }),
);
// Input Schema
export const LightsailInstancesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/lightsailInstances",
    }),
  );
export type LightsailInstancesListByResourceGroupInput =
  typeof LightsailInstancesListByResourceGroupInput.Type;

// Output Schema
export const LightsailInstancesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type LightsailInstancesListByResourceGroupOutput =
  typeof LightsailInstancesListByResourceGroupOutput.Type;

// The operation
/**
 * List LightsailInstance resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const LightsailInstancesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LightsailInstancesListByResourceGroupInput,
    outputSchema: LightsailInstancesListByResourceGroupOutput,
  }));
// Input Schema
export const LightsailInstancesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/lightsailInstances",
    }),
  );
export type LightsailInstancesListBySubscriptionInput =
  typeof LightsailInstancesListBySubscriptionInput.Type;

// Output Schema
export const LightsailInstancesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type LightsailInstancesListBySubscriptionOutput =
  typeof LightsailInstancesListBySubscriptionOutput.Type;

// The operation
/**
 * List LightsailInstance resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const LightsailInstancesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LightsailInstancesListBySubscriptionInput,
    outputSchema: LightsailInstancesListBySubscriptionOutput,
  }));
// Input Schema
export const LightsailInstancesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/lightsailInstances/{name}",
    }),
  );
export type LightsailInstancesUpdateInput =
  typeof LightsailInstancesUpdateInput.Type;

// Output Schema
export const LightsailInstancesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type LightsailInstancesUpdateOutput =
  typeof LightsailInstancesUpdateOutput.Type;

// The operation
/**
 * Update a LightsailInstance
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of LightsailInstance
 */
export const LightsailInstancesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: LightsailInstancesUpdateInput,
    outputSchema: LightsailInstancesUpdateOutput,
  }),
);
// Input Schema
export const LogsLogGroupsCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/logsLogGroups/{name}",
    }),
  );
export type LogsLogGroupsCreateOrReplaceInput =
  typeof LogsLogGroupsCreateOrReplaceInput.Type;

// Output Schema
export const LogsLogGroupsCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type LogsLogGroupsCreateOrReplaceOutput =
  typeof LogsLogGroupsCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a LogsLogGroup. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of LogsLogGroup
 */
export const LogsLogGroupsCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LogsLogGroupsCreateOrReplaceInput,
    outputSchema: LogsLogGroupsCreateOrReplaceOutput,
  }));
// Input Schema
export const LogsLogGroupsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/logsLogGroups/{name}",
    }),
  );
export type LogsLogGroupsDeleteInput = typeof LogsLogGroupsDeleteInput.Type;

// Output Schema
export const LogsLogGroupsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type LogsLogGroupsDeleteOutput = typeof LogsLogGroupsDeleteOutput.Type;

// The operation
/**
 * Delete a LogsLogGroup
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of LogsLogGroup
 */
export const LogsLogGroupsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: LogsLogGroupsDeleteInput,
  outputSchema: LogsLogGroupsDeleteOutput,
}));
// Input Schema
export const LogsLogGroupsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  name: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/logsLogGroups/{name}",
  }),
);
export type LogsLogGroupsGetInput = typeof LogsLogGroupsGetInput.Type;

// Output Schema
export const LogsLogGroupsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  },
);
export type LogsLogGroupsGetOutput = typeof LogsLogGroupsGetOutput.Type;

// The operation
/**
 * Get a LogsLogGroup
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of LogsLogGroup
 */
export const LogsLogGroupsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: LogsLogGroupsGetInput,
  outputSchema: LogsLogGroupsGetOutput,
}));
// Input Schema
export const LogsLogGroupsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/logsLogGroups",
    }),
  );
export type LogsLogGroupsListByResourceGroupInput =
  typeof LogsLogGroupsListByResourceGroupInput.Type;

// Output Schema
export const LogsLogGroupsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type LogsLogGroupsListByResourceGroupOutput =
  typeof LogsLogGroupsListByResourceGroupOutput.Type;

// The operation
/**
 * List LogsLogGroup resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const LogsLogGroupsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LogsLogGroupsListByResourceGroupInput,
    outputSchema: LogsLogGroupsListByResourceGroupOutput,
  }));
// Input Schema
export const LogsLogGroupsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/logsLogGroups",
    }),
  );
export type LogsLogGroupsListBySubscriptionInput =
  typeof LogsLogGroupsListBySubscriptionInput.Type;

// Output Schema
export const LogsLogGroupsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type LogsLogGroupsListBySubscriptionOutput =
  typeof LogsLogGroupsListBySubscriptionOutput.Type;

// The operation
/**
 * List LogsLogGroup resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const LogsLogGroupsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LogsLogGroupsListBySubscriptionInput,
    outputSchema: LogsLogGroupsListBySubscriptionOutput,
  }));
// Input Schema
export const LogsLogGroupsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/logsLogGroups/{name}",
    }),
  );
export type LogsLogGroupsUpdateInput = typeof LogsLogGroupsUpdateInput.Type;

// Output Schema
export const LogsLogGroupsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type LogsLogGroupsUpdateOutput = typeof LogsLogGroupsUpdateOutput.Type;

// The operation
/**
 * Update a LogsLogGroup
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of LogsLogGroup
 */
export const LogsLogGroupsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: LogsLogGroupsUpdateInput,
  outputSchema: LogsLogGroupsUpdateOutput,
}));
// Input Schema
export const LogsLogStreamsCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/logsLogStreams/{name}",
    }),
  );
export type LogsLogStreamsCreateOrReplaceInput =
  typeof LogsLogStreamsCreateOrReplaceInput.Type;

// Output Schema
export const LogsLogStreamsCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type LogsLogStreamsCreateOrReplaceOutput =
  typeof LogsLogStreamsCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a LogsLogStream. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of LogsLogStream
 */
export const LogsLogStreamsCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LogsLogStreamsCreateOrReplaceInput,
    outputSchema: LogsLogStreamsCreateOrReplaceOutput,
  }));
// Input Schema
export const LogsLogStreamsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/logsLogStreams/{name}",
    }),
  );
export type LogsLogStreamsDeleteInput = typeof LogsLogStreamsDeleteInput.Type;

// Output Schema
export const LogsLogStreamsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type LogsLogStreamsDeleteOutput = typeof LogsLogStreamsDeleteOutput.Type;

// The operation
/**
 * Delete a LogsLogStream
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of LogsLogStream
 */
export const LogsLogStreamsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: LogsLogStreamsDeleteInput,
    outputSchema: LogsLogStreamsDeleteOutput,
  }),
);
// Input Schema
export const LogsLogStreamsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/logsLogStreams/{name}",
  }),
);
export type LogsLogStreamsGetInput = typeof LogsLogStreamsGetInput.Type;

// Output Schema
export const LogsLogStreamsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type LogsLogStreamsGetOutput = typeof LogsLogStreamsGetOutput.Type;

// The operation
/**
 * Get a LogsLogStream
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of LogsLogStream
 */
export const LogsLogStreamsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: LogsLogStreamsGetInput,
  outputSchema: LogsLogStreamsGetOutput,
}));
// Input Schema
export const LogsLogStreamsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/logsLogStreams",
    }),
  );
export type LogsLogStreamsListByResourceGroupInput =
  typeof LogsLogStreamsListByResourceGroupInput.Type;

// Output Schema
export const LogsLogStreamsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type LogsLogStreamsListByResourceGroupOutput =
  typeof LogsLogStreamsListByResourceGroupOutput.Type;

// The operation
/**
 * List LogsLogStream resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const LogsLogStreamsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LogsLogStreamsListByResourceGroupInput,
    outputSchema: LogsLogStreamsListByResourceGroupOutput,
  }));
// Input Schema
export const LogsLogStreamsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/logsLogStreams",
    }),
  );
export type LogsLogStreamsListBySubscriptionInput =
  typeof LogsLogStreamsListBySubscriptionInput.Type;

// Output Schema
export const LogsLogStreamsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type LogsLogStreamsListBySubscriptionOutput =
  typeof LogsLogStreamsListBySubscriptionOutput.Type;

// The operation
/**
 * List LogsLogStream resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const LogsLogStreamsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LogsLogStreamsListBySubscriptionInput,
    outputSchema: LogsLogStreamsListBySubscriptionOutput,
  }));
// Input Schema
export const LogsLogStreamsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/logsLogStreams/{name}",
    }),
  );
export type LogsLogStreamsUpdateInput = typeof LogsLogStreamsUpdateInput.Type;

// Output Schema
export const LogsLogStreamsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type LogsLogStreamsUpdateOutput = typeof LogsLogStreamsUpdateOutput.Type;

// The operation
/**
 * Update a LogsLogStream
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of LogsLogStream
 */
export const LogsLogStreamsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: LogsLogStreamsUpdateInput,
    outputSchema: LogsLogStreamsUpdateOutput,
  }),
);
// Input Schema
export const LogsMetricFiltersCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/logsMetricFilters/{name}",
    }),
  );
export type LogsMetricFiltersCreateOrReplaceInput =
  typeof LogsMetricFiltersCreateOrReplaceInput.Type;

// Output Schema
export const LogsMetricFiltersCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type LogsMetricFiltersCreateOrReplaceOutput =
  typeof LogsMetricFiltersCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a LogsMetricFilter. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of LogsMetricFilter
 */
export const LogsMetricFiltersCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LogsMetricFiltersCreateOrReplaceInput,
    outputSchema: LogsMetricFiltersCreateOrReplaceOutput,
  }));
// Input Schema
export const LogsMetricFiltersDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/logsMetricFilters/{name}",
    }),
  );
export type LogsMetricFiltersDeleteInput =
  typeof LogsMetricFiltersDeleteInput.Type;

// Output Schema
export const LogsMetricFiltersDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type LogsMetricFiltersDeleteOutput =
  typeof LogsMetricFiltersDeleteOutput.Type;

// The operation
/**
 * Delete a LogsMetricFilter
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of LogsMetricFilter
 */
export const LogsMetricFiltersDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: LogsMetricFiltersDeleteInput,
    outputSchema: LogsMetricFiltersDeleteOutput,
  }),
);
// Input Schema
export const LogsMetricFiltersGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/logsMetricFilters/{name}",
    }),
  );
export type LogsMetricFiltersGetInput = typeof LogsMetricFiltersGetInput.Type;

// Output Schema
export const LogsMetricFiltersGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type LogsMetricFiltersGetOutput = typeof LogsMetricFiltersGetOutput.Type;

// The operation
/**
 * Get a LogsMetricFilter
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of LogsMetricFilter
 */
export const LogsMetricFiltersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: LogsMetricFiltersGetInput,
    outputSchema: LogsMetricFiltersGetOutput,
  }),
);
// Input Schema
export const LogsMetricFiltersListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/logsMetricFilters",
    }),
  );
export type LogsMetricFiltersListByResourceGroupInput =
  typeof LogsMetricFiltersListByResourceGroupInput.Type;

// Output Schema
export const LogsMetricFiltersListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type LogsMetricFiltersListByResourceGroupOutput =
  typeof LogsMetricFiltersListByResourceGroupOutput.Type;

// The operation
/**
 * List LogsMetricFilter resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const LogsMetricFiltersListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LogsMetricFiltersListByResourceGroupInput,
    outputSchema: LogsMetricFiltersListByResourceGroupOutput,
  }));
// Input Schema
export const LogsMetricFiltersListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/logsMetricFilters",
    }),
  );
export type LogsMetricFiltersListBySubscriptionInput =
  typeof LogsMetricFiltersListBySubscriptionInput.Type;

// Output Schema
export const LogsMetricFiltersListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type LogsMetricFiltersListBySubscriptionOutput =
  typeof LogsMetricFiltersListBySubscriptionOutput.Type;

// The operation
/**
 * List LogsMetricFilter resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const LogsMetricFiltersListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LogsMetricFiltersListBySubscriptionInput,
    outputSchema: LogsMetricFiltersListBySubscriptionOutput,
  }));
// Input Schema
export const LogsMetricFiltersUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/logsMetricFilters/{name}",
    }),
  );
export type LogsMetricFiltersUpdateInput =
  typeof LogsMetricFiltersUpdateInput.Type;

// Output Schema
export const LogsMetricFiltersUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type LogsMetricFiltersUpdateOutput =
  typeof LogsMetricFiltersUpdateOutput.Type;

// The operation
/**
 * Update a LogsMetricFilter
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of LogsMetricFilter
 */
export const LogsMetricFiltersUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: LogsMetricFiltersUpdateInput,
    outputSchema: LogsMetricFiltersUpdateOutput,
  }),
);
// Input Schema
export const LogsSubscriptionFiltersCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/logsSubscriptionFilters/{name}",
    }),
  );
export type LogsSubscriptionFiltersCreateOrReplaceInput =
  typeof LogsSubscriptionFiltersCreateOrReplaceInput.Type;

// Output Schema
export const LogsSubscriptionFiltersCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type LogsSubscriptionFiltersCreateOrReplaceOutput =
  typeof LogsSubscriptionFiltersCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a LogsSubscriptionFilter. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of LogsSubscriptionFilter
 */
export const LogsSubscriptionFiltersCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LogsSubscriptionFiltersCreateOrReplaceInput,
    outputSchema: LogsSubscriptionFiltersCreateOrReplaceOutput,
  }));
// Input Schema
export const LogsSubscriptionFiltersDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/logsSubscriptionFilters/{name}",
    }),
  );
export type LogsSubscriptionFiltersDeleteInput =
  typeof LogsSubscriptionFiltersDeleteInput.Type;

// Output Schema
export const LogsSubscriptionFiltersDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type LogsSubscriptionFiltersDeleteOutput =
  typeof LogsSubscriptionFiltersDeleteOutput.Type;

// The operation
/**
 * Delete a LogsSubscriptionFilter
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of LogsSubscriptionFilter
 */
export const LogsSubscriptionFiltersDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LogsSubscriptionFiltersDeleteInput,
    outputSchema: LogsSubscriptionFiltersDeleteOutput,
  }));
// Input Schema
export const LogsSubscriptionFiltersGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/logsSubscriptionFilters/{name}",
    }),
  );
export type LogsSubscriptionFiltersGetInput =
  typeof LogsSubscriptionFiltersGetInput.Type;

// Output Schema
export const LogsSubscriptionFiltersGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type LogsSubscriptionFiltersGetOutput =
  typeof LogsSubscriptionFiltersGetOutput.Type;

// The operation
/**
 * Get a LogsSubscriptionFilter
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of LogsSubscriptionFilter
 */
export const LogsSubscriptionFiltersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: LogsSubscriptionFiltersGetInput,
    outputSchema: LogsSubscriptionFiltersGetOutput,
  }),
);
// Input Schema
export const LogsSubscriptionFiltersListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/logsSubscriptionFilters",
    }),
  );
export type LogsSubscriptionFiltersListByResourceGroupInput =
  typeof LogsSubscriptionFiltersListByResourceGroupInput.Type;

// Output Schema
export const LogsSubscriptionFiltersListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type LogsSubscriptionFiltersListByResourceGroupOutput =
  typeof LogsSubscriptionFiltersListByResourceGroupOutput.Type;

// The operation
/**
 * List LogsSubscriptionFilter resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const LogsSubscriptionFiltersListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LogsSubscriptionFiltersListByResourceGroupInput,
    outputSchema: LogsSubscriptionFiltersListByResourceGroupOutput,
  }));
// Input Schema
export const LogsSubscriptionFiltersListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/logsSubscriptionFilters",
    }),
  );
export type LogsSubscriptionFiltersListBySubscriptionInput =
  typeof LogsSubscriptionFiltersListBySubscriptionInput.Type;

// Output Schema
export const LogsSubscriptionFiltersListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type LogsSubscriptionFiltersListBySubscriptionOutput =
  typeof LogsSubscriptionFiltersListBySubscriptionOutput.Type;

// The operation
/**
 * List LogsSubscriptionFilter resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const LogsSubscriptionFiltersListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LogsSubscriptionFiltersListBySubscriptionInput,
    outputSchema: LogsSubscriptionFiltersListBySubscriptionOutput,
  }));
// Input Schema
export const LogsSubscriptionFiltersUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/logsSubscriptionFilters/{name}",
    }),
  );
export type LogsSubscriptionFiltersUpdateInput =
  typeof LogsSubscriptionFiltersUpdateInput.Type;

// Output Schema
export const LogsSubscriptionFiltersUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type LogsSubscriptionFiltersUpdateOutput =
  typeof LogsSubscriptionFiltersUpdateOutput.Type;

// The operation
/**
 * Update a LogsSubscriptionFilter
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of LogsSubscriptionFilter
 */
export const LogsSubscriptionFiltersUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LogsSubscriptionFiltersUpdateInput,
    outputSchema: LogsSubscriptionFiltersUpdateOutput,
  }));
// Input Schema
export const Macie2JobSummariesCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/macie2JobSummaries/{name}",
    }),
  );
export type Macie2JobSummariesCreateOrReplaceInput =
  typeof Macie2JobSummariesCreateOrReplaceInput.Type;

// Output Schema
export const Macie2JobSummariesCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type Macie2JobSummariesCreateOrReplaceOutput =
  typeof Macie2JobSummariesCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a Macie2JobSummary. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Macie2JobSummary
 */
export const Macie2JobSummariesCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: Macie2JobSummariesCreateOrReplaceInput,
    outputSchema: Macie2JobSummariesCreateOrReplaceOutput,
  }));
// Input Schema
export const Macie2JobSummariesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/macie2JobSummaries/{name}",
    }),
  );
export type Macie2JobSummariesDeleteInput =
  typeof Macie2JobSummariesDeleteInput.Type;

// Output Schema
export const Macie2JobSummariesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type Macie2JobSummariesDeleteOutput =
  typeof Macie2JobSummariesDeleteOutput.Type;

// The operation
/**
 * Delete a Macie2JobSummary
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Macie2JobSummary
 */
export const Macie2JobSummariesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: Macie2JobSummariesDeleteInput,
    outputSchema: Macie2JobSummariesDeleteOutput,
  }),
);
// Input Schema
export const Macie2JobSummariesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/macie2JobSummaries/{name}",
    }),
  );
export type Macie2JobSummariesGetInput = typeof Macie2JobSummariesGetInput.Type;

// Output Schema
export const Macie2JobSummariesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type Macie2JobSummariesGetOutput =
  typeof Macie2JobSummariesGetOutput.Type;

// The operation
/**
 * Get a Macie2JobSummary
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Macie2JobSummary
 */
export const Macie2JobSummariesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: Macie2JobSummariesGetInput,
    outputSchema: Macie2JobSummariesGetOutput,
  }),
);
// Input Schema
export const Macie2JobSummariesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/macie2JobSummaries",
    }),
  );
export type Macie2JobSummariesListByResourceGroupInput =
  typeof Macie2JobSummariesListByResourceGroupInput.Type;

// Output Schema
export const Macie2JobSummariesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type Macie2JobSummariesListByResourceGroupOutput =
  typeof Macie2JobSummariesListByResourceGroupOutput.Type;

// The operation
/**
 * List Macie2JobSummary resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const Macie2JobSummariesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: Macie2JobSummariesListByResourceGroupInput,
    outputSchema: Macie2JobSummariesListByResourceGroupOutput,
  }));
// Input Schema
export const Macie2JobSummariesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/macie2JobSummaries",
    }),
  );
export type Macie2JobSummariesListBySubscriptionInput =
  typeof Macie2JobSummariesListBySubscriptionInput.Type;

// Output Schema
export const Macie2JobSummariesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type Macie2JobSummariesListBySubscriptionOutput =
  typeof Macie2JobSummariesListBySubscriptionOutput.Type;

// The operation
/**
 * List Macie2JobSummary resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const Macie2JobSummariesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: Macie2JobSummariesListBySubscriptionInput,
    outputSchema: Macie2JobSummariesListBySubscriptionOutput,
  }));
// Input Schema
export const Macie2JobSummariesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/macie2JobSummaries/{name}",
    }),
  );
export type Macie2JobSummariesUpdateInput =
  typeof Macie2JobSummariesUpdateInput.Type;

// Output Schema
export const Macie2JobSummariesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type Macie2JobSummariesUpdateOutput =
  typeof Macie2JobSummariesUpdateOutput.Type;

// The operation
/**
 * Update a Macie2JobSummary
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Macie2JobSummary
 */
export const Macie2JobSummariesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: Macie2JobSummariesUpdateInput,
    outputSchema: Macie2JobSummariesUpdateOutput,
  }),
);
// Input Schema
export const MacieAllowListsCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/macieAllowLists/{name}",
    }),
  );
export type MacieAllowListsCreateOrReplaceInput =
  typeof MacieAllowListsCreateOrReplaceInput.Type;

// Output Schema
export const MacieAllowListsCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type MacieAllowListsCreateOrReplaceOutput =
  typeof MacieAllowListsCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a MacieAllowList. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of MacieAllowList
 */
export const MacieAllowListsCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MacieAllowListsCreateOrReplaceInput,
    outputSchema: MacieAllowListsCreateOrReplaceOutput,
  }));
// Input Schema
export const MacieAllowListsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/macieAllowLists/{name}",
    }),
  );
export type MacieAllowListsDeleteInput = typeof MacieAllowListsDeleteInput.Type;

// Output Schema
export const MacieAllowListsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type MacieAllowListsDeleteOutput =
  typeof MacieAllowListsDeleteOutput.Type;

// The operation
/**
 * Delete a MacieAllowList
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of MacieAllowList
 */
export const MacieAllowListsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: MacieAllowListsDeleteInput,
    outputSchema: MacieAllowListsDeleteOutput,
  }),
);
// Input Schema
export const MacieAllowListsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/macieAllowLists/{name}",
    }),
  );
export type MacieAllowListsGetInput = typeof MacieAllowListsGetInput.Type;

// Output Schema
export const MacieAllowListsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type MacieAllowListsGetOutput = typeof MacieAllowListsGetOutput.Type;

// The operation
/**
 * Get a MacieAllowList
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of MacieAllowList
 */
export const MacieAllowListsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: MacieAllowListsGetInput,
  outputSchema: MacieAllowListsGetOutput,
}));
// Input Schema
export const MacieAllowListsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/macieAllowLists",
    }),
  );
export type MacieAllowListsListByResourceGroupInput =
  typeof MacieAllowListsListByResourceGroupInput.Type;

// Output Schema
export const MacieAllowListsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type MacieAllowListsListByResourceGroupOutput =
  typeof MacieAllowListsListByResourceGroupOutput.Type;

// The operation
/**
 * List MacieAllowList resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const MacieAllowListsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MacieAllowListsListByResourceGroupInput,
    outputSchema: MacieAllowListsListByResourceGroupOutput,
  }));
// Input Schema
export const MacieAllowListsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/macieAllowLists",
    }),
  );
export type MacieAllowListsListBySubscriptionInput =
  typeof MacieAllowListsListBySubscriptionInput.Type;

// Output Schema
export const MacieAllowListsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type MacieAllowListsListBySubscriptionOutput =
  typeof MacieAllowListsListBySubscriptionOutput.Type;

// The operation
/**
 * List MacieAllowList resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const MacieAllowListsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MacieAllowListsListBySubscriptionInput,
    outputSchema: MacieAllowListsListBySubscriptionOutput,
  }));
// Input Schema
export const MacieAllowListsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/macieAllowLists/{name}",
    }),
  );
export type MacieAllowListsUpdateInput = typeof MacieAllowListsUpdateInput.Type;

// Output Schema
export const MacieAllowListsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type MacieAllowListsUpdateOutput =
  typeof MacieAllowListsUpdateOutput.Type;

// The operation
/**
 * Update a MacieAllowList
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of MacieAllowList
 */
export const MacieAllowListsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: MacieAllowListsUpdateInput,
    outputSchema: MacieAllowListsUpdateOutput,
  }),
);
// Input Schema
export const NetworkFirewallFirewallPoliciesCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/networkFirewallFirewallPolicies/{name}",
    }),
  );
export type NetworkFirewallFirewallPoliciesCreateOrReplaceInput =
  typeof NetworkFirewallFirewallPoliciesCreateOrReplaceInput.Type;

// Output Schema
export const NetworkFirewallFirewallPoliciesCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type NetworkFirewallFirewallPoliciesCreateOrReplaceOutput =
  typeof NetworkFirewallFirewallPoliciesCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a NetworkFirewallFirewallPolicy. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of NetworkFirewallFirewallPolicy
 */
export const NetworkFirewallFirewallPoliciesCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkFirewallFirewallPoliciesCreateOrReplaceInput,
    outputSchema: NetworkFirewallFirewallPoliciesCreateOrReplaceOutput,
  }));
// Input Schema
export const NetworkFirewallFirewallPoliciesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/networkFirewallFirewallPolicies/{name}",
    }),
  );
export type NetworkFirewallFirewallPoliciesDeleteInput =
  typeof NetworkFirewallFirewallPoliciesDeleteInput.Type;

// Output Schema
export const NetworkFirewallFirewallPoliciesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type NetworkFirewallFirewallPoliciesDeleteOutput =
  typeof NetworkFirewallFirewallPoliciesDeleteOutput.Type;

// The operation
/**
 * Delete a NetworkFirewallFirewallPolicy
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of NetworkFirewallFirewallPolicy
 */
export const NetworkFirewallFirewallPoliciesDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkFirewallFirewallPoliciesDeleteInput,
    outputSchema: NetworkFirewallFirewallPoliciesDeleteOutput,
  }));
// Input Schema
export const NetworkFirewallFirewallPoliciesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/networkFirewallFirewallPolicies/{name}",
    }),
  );
export type NetworkFirewallFirewallPoliciesGetInput =
  typeof NetworkFirewallFirewallPoliciesGetInput.Type;

// Output Schema
export const NetworkFirewallFirewallPoliciesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type NetworkFirewallFirewallPoliciesGetOutput =
  typeof NetworkFirewallFirewallPoliciesGetOutput.Type;

// The operation
/**
 * Get a NetworkFirewallFirewallPolicy
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of NetworkFirewallFirewallPolicy
 */
export const NetworkFirewallFirewallPoliciesGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkFirewallFirewallPoliciesGetInput,
    outputSchema: NetworkFirewallFirewallPoliciesGetOutput,
  }));
// Input Schema
export const NetworkFirewallFirewallPoliciesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/networkFirewallFirewallPolicies",
    }),
  );
export type NetworkFirewallFirewallPoliciesListByResourceGroupInput =
  typeof NetworkFirewallFirewallPoliciesListByResourceGroupInput.Type;

// Output Schema
export const NetworkFirewallFirewallPoliciesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type NetworkFirewallFirewallPoliciesListByResourceGroupOutput =
  typeof NetworkFirewallFirewallPoliciesListByResourceGroupOutput.Type;

// The operation
/**
 * List NetworkFirewallFirewallPolicy resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const NetworkFirewallFirewallPoliciesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkFirewallFirewallPoliciesListByResourceGroupInput,
    outputSchema: NetworkFirewallFirewallPoliciesListByResourceGroupOutput,
  }));
// Input Schema
export const NetworkFirewallFirewallPoliciesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/networkFirewallFirewallPolicies",
    }),
  );
export type NetworkFirewallFirewallPoliciesListBySubscriptionInput =
  typeof NetworkFirewallFirewallPoliciesListBySubscriptionInput.Type;

// Output Schema
export const NetworkFirewallFirewallPoliciesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type NetworkFirewallFirewallPoliciesListBySubscriptionOutput =
  typeof NetworkFirewallFirewallPoliciesListBySubscriptionOutput.Type;

// The operation
/**
 * List NetworkFirewallFirewallPolicy resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const NetworkFirewallFirewallPoliciesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkFirewallFirewallPoliciesListBySubscriptionInput,
    outputSchema: NetworkFirewallFirewallPoliciesListBySubscriptionOutput,
  }));
// Input Schema
export const NetworkFirewallFirewallPoliciesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/networkFirewallFirewallPolicies/{name}",
    }),
  );
export type NetworkFirewallFirewallPoliciesUpdateInput =
  typeof NetworkFirewallFirewallPoliciesUpdateInput.Type;

// Output Schema
export const NetworkFirewallFirewallPoliciesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type NetworkFirewallFirewallPoliciesUpdateOutput =
  typeof NetworkFirewallFirewallPoliciesUpdateOutput.Type;

// The operation
/**
 * Update a NetworkFirewallFirewallPolicy
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of NetworkFirewallFirewallPolicy
 */
export const NetworkFirewallFirewallPoliciesUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkFirewallFirewallPoliciesUpdateInput,
    outputSchema: NetworkFirewallFirewallPoliciesUpdateOutput,
  }));
// Input Schema
export const NetworkFirewallFirewallsCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/networkFirewallFirewalls/{name}",
    }),
  );
export type NetworkFirewallFirewallsCreateOrReplaceInput =
  typeof NetworkFirewallFirewallsCreateOrReplaceInput.Type;

// Output Schema
export const NetworkFirewallFirewallsCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type NetworkFirewallFirewallsCreateOrReplaceOutput =
  typeof NetworkFirewallFirewallsCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a NetworkFirewallFirewall. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of NetworkFirewallFirewall
 */
export const NetworkFirewallFirewallsCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkFirewallFirewallsCreateOrReplaceInput,
    outputSchema: NetworkFirewallFirewallsCreateOrReplaceOutput,
  }));
// Input Schema
export const NetworkFirewallFirewallsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/networkFirewallFirewalls/{name}",
    }),
  );
export type NetworkFirewallFirewallsDeleteInput =
  typeof NetworkFirewallFirewallsDeleteInput.Type;

// Output Schema
export const NetworkFirewallFirewallsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type NetworkFirewallFirewallsDeleteOutput =
  typeof NetworkFirewallFirewallsDeleteOutput.Type;

// The operation
/**
 * Delete a NetworkFirewallFirewall
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of NetworkFirewallFirewall
 */
export const NetworkFirewallFirewallsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkFirewallFirewallsDeleteInput,
    outputSchema: NetworkFirewallFirewallsDeleteOutput,
  }));
// Input Schema
export const NetworkFirewallFirewallsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/networkFirewallFirewalls/{name}",
    }),
  );
export type NetworkFirewallFirewallsGetInput =
  typeof NetworkFirewallFirewallsGetInput.Type;

// Output Schema
export const NetworkFirewallFirewallsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type NetworkFirewallFirewallsGetOutput =
  typeof NetworkFirewallFirewallsGetOutput.Type;

// The operation
/**
 * Get a NetworkFirewallFirewall
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of NetworkFirewallFirewall
 */
export const NetworkFirewallFirewallsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: NetworkFirewallFirewallsGetInput,
    outputSchema: NetworkFirewallFirewallsGetOutput,
  }),
);
// Input Schema
export const NetworkFirewallFirewallsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/networkFirewallFirewalls",
    }),
  );
export type NetworkFirewallFirewallsListByResourceGroupInput =
  typeof NetworkFirewallFirewallsListByResourceGroupInput.Type;

// Output Schema
export const NetworkFirewallFirewallsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type NetworkFirewallFirewallsListByResourceGroupOutput =
  typeof NetworkFirewallFirewallsListByResourceGroupOutput.Type;

// The operation
/**
 * List NetworkFirewallFirewall resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const NetworkFirewallFirewallsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkFirewallFirewallsListByResourceGroupInput,
    outputSchema: NetworkFirewallFirewallsListByResourceGroupOutput,
  }));
// Input Schema
export const NetworkFirewallFirewallsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/networkFirewallFirewalls",
    }),
  );
export type NetworkFirewallFirewallsListBySubscriptionInput =
  typeof NetworkFirewallFirewallsListBySubscriptionInput.Type;

// Output Schema
export const NetworkFirewallFirewallsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type NetworkFirewallFirewallsListBySubscriptionOutput =
  typeof NetworkFirewallFirewallsListBySubscriptionOutput.Type;

// The operation
/**
 * List NetworkFirewallFirewall resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const NetworkFirewallFirewallsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkFirewallFirewallsListBySubscriptionInput,
    outputSchema: NetworkFirewallFirewallsListBySubscriptionOutput,
  }));
// Input Schema
export const NetworkFirewallFirewallsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/networkFirewallFirewalls/{name}",
    }),
  );
export type NetworkFirewallFirewallsUpdateInput =
  typeof NetworkFirewallFirewallsUpdateInput.Type;

// Output Schema
export const NetworkFirewallFirewallsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type NetworkFirewallFirewallsUpdateOutput =
  typeof NetworkFirewallFirewallsUpdateOutput.Type;

// The operation
/**
 * Update a NetworkFirewallFirewall
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of NetworkFirewallFirewall
 */
export const NetworkFirewallFirewallsUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkFirewallFirewallsUpdateInput,
    outputSchema: NetworkFirewallFirewallsUpdateOutput,
  }));
// Input Schema
export const NetworkFirewallRuleGroupsCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/networkFirewallRuleGroups/{name}",
    }),
  );
export type NetworkFirewallRuleGroupsCreateOrReplaceInput =
  typeof NetworkFirewallRuleGroupsCreateOrReplaceInput.Type;

// Output Schema
export const NetworkFirewallRuleGroupsCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type NetworkFirewallRuleGroupsCreateOrReplaceOutput =
  typeof NetworkFirewallRuleGroupsCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a NetworkFirewallRuleGroup. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of NetworkFirewallRuleGroup
 */
export const NetworkFirewallRuleGroupsCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkFirewallRuleGroupsCreateOrReplaceInput,
    outputSchema: NetworkFirewallRuleGroupsCreateOrReplaceOutput,
  }));
// Input Schema
export const NetworkFirewallRuleGroupsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/networkFirewallRuleGroups/{name}",
    }),
  );
export type NetworkFirewallRuleGroupsDeleteInput =
  typeof NetworkFirewallRuleGroupsDeleteInput.Type;

// Output Schema
export const NetworkFirewallRuleGroupsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type NetworkFirewallRuleGroupsDeleteOutput =
  typeof NetworkFirewallRuleGroupsDeleteOutput.Type;

// The operation
/**
 * Delete a NetworkFirewallRuleGroup
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of NetworkFirewallRuleGroup
 */
export const NetworkFirewallRuleGroupsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkFirewallRuleGroupsDeleteInput,
    outputSchema: NetworkFirewallRuleGroupsDeleteOutput,
  }));
// Input Schema
export const NetworkFirewallRuleGroupsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/networkFirewallRuleGroups/{name}",
    }),
  );
export type NetworkFirewallRuleGroupsGetInput =
  typeof NetworkFirewallRuleGroupsGetInput.Type;

// Output Schema
export const NetworkFirewallRuleGroupsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type NetworkFirewallRuleGroupsGetOutput =
  typeof NetworkFirewallRuleGroupsGetOutput.Type;

// The operation
/**
 * Get a NetworkFirewallRuleGroup
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of NetworkFirewallRuleGroup
 */
export const NetworkFirewallRuleGroupsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkFirewallRuleGroupsGetInput,
    outputSchema: NetworkFirewallRuleGroupsGetOutput,
  }));
// Input Schema
export const NetworkFirewallRuleGroupsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/networkFirewallRuleGroups",
    }),
  );
export type NetworkFirewallRuleGroupsListByResourceGroupInput =
  typeof NetworkFirewallRuleGroupsListByResourceGroupInput.Type;

// Output Schema
export const NetworkFirewallRuleGroupsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type NetworkFirewallRuleGroupsListByResourceGroupOutput =
  typeof NetworkFirewallRuleGroupsListByResourceGroupOutput.Type;

// The operation
/**
 * List NetworkFirewallRuleGroup resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const NetworkFirewallRuleGroupsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkFirewallRuleGroupsListByResourceGroupInput,
    outputSchema: NetworkFirewallRuleGroupsListByResourceGroupOutput,
  }));
// Input Schema
export const NetworkFirewallRuleGroupsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/networkFirewallRuleGroups",
    }),
  );
export type NetworkFirewallRuleGroupsListBySubscriptionInput =
  typeof NetworkFirewallRuleGroupsListBySubscriptionInput.Type;

// Output Schema
export const NetworkFirewallRuleGroupsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type NetworkFirewallRuleGroupsListBySubscriptionOutput =
  typeof NetworkFirewallRuleGroupsListBySubscriptionOutput.Type;

// The operation
/**
 * List NetworkFirewallRuleGroup resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const NetworkFirewallRuleGroupsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkFirewallRuleGroupsListBySubscriptionInput,
    outputSchema: NetworkFirewallRuleGroupsListBySubscriptionOutput,
  }));
// Input Schema
export const NetworkFirewallRuleGroupsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/networkFirewallRuleGroups/{name}",
    }),
  );
export type NetworkFirewallRuleGroupsUpdateInput =
  typeof NetworkFirewallRuleGroupsUpdateInput.Type;

// Output Schema
export const NetworkFirewallRuleGroupsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type NetworkFirewallRuleGroupsUpdateOutput =
  typeof NetworkFirewallRuleGroupsUpdateOutput.Type;

// The operation
/**
 * Update a NetworkFirewallRuleGroup
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of NetworkFirewallRuleGroup
 */
export const NetworkFirewallRuleGroupsUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkFirewallRuleGroupsUpdateInput,
    outputSchema: NetworkFirewallRuleGroupsUpdateOutput,
  }));
// Input Schema
export const OpenSearchDomainStatusesCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/openSearchDomainStatuses/{name}",
    }),
  );
export type OpenSearchDomainStatusesCreateOrReplaceInput =
  typeof OpenSearchDomainStatusesCreateOrReplaceInput.Type;

// Output Schema
export const OpenSearchDomainStatusesCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type OpenSearchDomainStatusesCreateOrReplaceOutput =
  typeof OpenSearchDomainStatusesCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a OpenSearchDomainStatus. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of OpenSearchDomainStatus
 */
export const OpenSearchDomainStatusesCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: OpenSearchDomainStatusesCreateOrReplaceInput,
    outputSchema: OpenSearchDomainStatusesCreateOrReplaceOutput,
  }));
// Input Schema
export const OpenSearchDomainStatusesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/openSearchDomainStatuses/{name}",
    }),
  );
export type OpenSearchDomainStatusesDeleteInput =
  typeof OpenSearchDomainStatusesDeleteInput.Type;

// Output Schema
export const OpenSearchDomainStatusesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type OpenSearchDomainStatusesDeleteOutput =
  typeof OpenSearchDomainStatusesDeleteOutput.Type;

// The operation
/**
 * Delete a OpenSearchDomainStatus
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of OpenSearchDomainStatus
 */
export const OpenSearchDomainStatusesDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: OpenSearchDomainStatusesDeleteInput,
    outputSchema: OpenSearchDomainStatusesDeleteOutput,
  }));
// Input Schema
export const OpenSearchDomainStatusesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/openSearchDomainStatuses/{name}",
    }),
  );
export type OpenSearchDomainStatusesGetInput =
  typeof OpenSearchDomainStatusesGetInput.Type;

// Output Schema
export const OpenSearchDomainStatusesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type OpenSearchDomainStatusesGetOutput =
  typeof OpenSearchDomainStatusesGetOutput.Type;

// The operation
/**
 * Get a OpenSearchDomainStatus
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of OpenSearchDomainStatus
 */
export const OpenSearchDomainStatusesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: OpenSearchDomainStatusesGetInput,
    outputSchema: OpenSearchDomainStatusesGetOutput,
  }),
);
// Input Schema
export const OpenSearchDomainStatusesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/openSearchDomainStatuses",
    }),
  );
export type OpenSearchDomainStatusesListByResourceGroupInput =
  typeof OpenSearchDomainStatusesListByResourceGroupInput.Type;

// Output Schema
export const OpenSearchDomainStatusesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type OpenSearchDomainStatusesListByResourceGroupOutput =
  typeof OpenSearchDomainStatusesListByResourceGroupOutput.Type;

// The operation
/**
 * List OpenSearchDomainStatus resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const OpenSearchDomainStatusesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: OpenSearchDomainStatusesListByResourceGroupInput,
    outputSchema: OpenSearchDomainStatusesListByResourceGroupOutput,
  }));
// Input Schema
export const OpenSearchDomainStatusesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/openSearchDomainStatuses",
    }),
  );
export type OpenSearchDomainStatusesListBySubscriptionInput =
  typeof OpenSearchDomainStatusesListBySubscriptionInput.Type;

// Output Schema
export const OpenSearchDomainStatusesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type OpenSearchDomainStatusesListBySubscriptionOutput =
  typeof OpenSearchDomainStatusesListBySubscriptionOutput.Type;

// The operation
/**
 * List OpenSearchDomainStatus resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const OpenSearchDomainStatusesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: OpenSearchDomainStatusesListBySubscriptionInput,
    outputSchema: OpenSearchDomainStatusesListBySubscriptionOutput,
  }));
// Input Schema
export const OpenSearchDomainStatusesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/openSearchDomainStatuses/{name}",
    }),
  );
export type OpenSearchDomainStatusesUpdateInput =
  typeof OpenSearchDomainStatusesUpdateInput.Type;

// Output Schema
export const OpenSearchDomainStatusesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type OpenSearchDomainStatusesUpdateOutput =
  typeof OpenSearchDomainStatusesUpdateOutput.Type;

// The operation
/**
 * Update a OpenSearchDomainStatus
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of OpenSearchDomainStatus
 */
export const OpenSearchDomainStatusesUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: OpenSearchDomainStatusesUpdateInput,
    outputSchema: OpenSearchDomainStatusesUpdateOutput,
  }));
// Input Schema
export const OrganizationsAccountsCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/organizationsAccounts/{name}",
    }),
  );
export type OrganizationsAccountsCreateOrReplaceInput =
  typeof OrganizationsAccountsCreateOrReplaceInput.Type;

// Output Schema
export const OrganizationsAccountsCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type OrganizationsAccountsCreateOrReplaceOutput =
  typeof OrganizationsAccountsCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a OrganizationsAccount. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of OrganizationsAccount
 */
export const OrganizationsAccountsCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: OrganizationsAccountsCreateOrReplaceInput,
    outputSchema: OrganizationsAccountsCreateOrReplaceOutput,
  }));
// Input Schema
export const OrganizationsAccountsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/organizationsAccounts/{name}",
    }),
  );
export type OrganizationsAccountsDeleteInput =
  typeof OrganizationsAccountsDeleteInput.Type;

// Output Schema
export const OrganizationsAccountsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type OrganizationsAccountsDeleteOutput =
  typeof OrganizationsAccountsDeleteOutput.Type;

// The operation
/**
 * Delete a OrganizationsAccount
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of OrganizationsAccount
 */
export const OrganizationsAccountsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: OrganizationsAccountsDeleteInput,
    outputSchema: OrganizationsAccountsDeleteOutput,
  }),
);
// Input Schema
export const OrganizationsAccountsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/organizationsAccounts/{name}",
    }),
  );
export type OrganizationsAccountsGetInput =
  typeof OrganizationsAccountsGetInput.Type;

// Output Schema
export const OrganizationsAccountsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type OrganizationsAccountsGetOutput =
  typeof OrganizationsAccountsGetOutput.Type;

// The operation
/**
 * Get a OrganizationsAccount
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of OrganizationsAccount
 */
export const OrganizationsAccountsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: OrganizationsAccountsGetInput,
    outputSchema: OrganizationsAccountsGetOutput,
  }),
);
// Input Schema
export const OrganizationsAccountsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/organizationsAccounts",
    }),
  );
export type OrganizationsAccountsListByResourceGroupInput =
  typeof OrganizationsAccountsListByResourceGroupInput.Type;

// Output Schema
export const OrganizationsAccountsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type OrganizationsAccountsListByResourceGroupOutput =
  typeof OrganizationsAccountsListByResourceGroupOutput.Type;

// The operation
/**
 * List OrganizationsAccount resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const OrganizationsAccountsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: OrganizationsAccountsListByResourceGroupInput,
    outputSchema: OrganizationsAccountsListByResourceGroupOutput,
  }));
// Input Schema
export const OrganizationsAccountsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/organizationsAccounts",
    }),
  );
export type OrganizationsAccountsListBySubscriptionInput =
  typeof OrganizationsAccountsListBySubscriptionInput.Type;

// Output Schema
export const OrganizationsAccountsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type OrganizationsAccountsListBySubscriptionOutput =
  typeof OrganizationsAccountsListBySubscriptionOutput.Type;

// The operation
/**
 * List OrganizationsAccount resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const OrganizationsAccountsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: OrganizationsAccountsListBySubscriptionInput,
    outputSchema: OrganizationsAccountsListBySubscriptionOutput,
  }));
// Input Schema
export const OrganizationsAccountsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/organizationsAccounts/{name}",
    }),
  );
export type OrganizationsAccountsUpdateInput =
  typeof OrganizationsAccountsUpdateInput.Type;

// Output Schema
export const OrganizationsAccountsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type OrganizationsAccountsUpdateOutput =
  typeof OrganizationsAccountsUpdateOutput.Type;

// The operation
/**
 * Update a OrganizationsAccount
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of OrganizationsAccount
 */
export const OrganizationsAccountsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: OrganizationsAccountsUpdateInput,
    outputSchema: OrganizationsAccountsUpdateOutput,
  }),
);
// Input Schema
export const OrganizationsOrganizationsCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/organizationsOrganizations/{name}",
    }),
  );
export type OrganizationsOrganizationsCreateOrReplaceInput =
  typeof OrganizationsOrganizationsCreateOrReplaceInput.Type;

// Output Schema
export const OrganizationsOrganizationsCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type OrganizationsOrganizationsCreateOrReplaceOutput =
  typeof OrganizationsOrganizationsCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a OrganizationsOrganization. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of OrganizationsOrganization
 */
export const OrganizationsOrganizationsCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: OrganizationsOrganizationsCreateOrReplaceInput,
    outputSchema: OrganizationsOrganizationsCreateOrReplaceOutput,
  }));
// Input Schema
export const OrganizationsOrganizationsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/organizationsOrganizations/{name}",
    }),
  );
export type OrganizationsOrganizationsDeleteInput =
  typeof OrganizationsOrganizationsDeleteInput.Type;

// Output Schema
export const OrganizationsOrganizationsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type OrganizationsOrganizationsDeleteOutput =
  typeof OrganizationsOrganizationsDeleteOutput.Type;

// The operation
/**
 * Delete a OrganizationsOrganization
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of OrganizationsOrganization
 */
export const OrganizationsOrganizationsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: OrganizationsOrganizationsDeleteInput,
    outputSchema: OrganizationsOrganizationsDeleteOutput,
  }));
// Input Schema
export const OrganizationsOrganizationsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/organizationsOrganizations/{name}",
    }),
  );
export type OrganizationsOrganizationsGetInput =
  typeof OrganizationsOrganizationsGetInput.Type;

// Output Schema
export const OrganizationsOrganizationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type OrganizationsOrganizationsGetOutput =
  typeof OrganizationsOrganizationsGetOutput.Type;

// The operation
/**
 * Get a OrganizationsOrganization
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of OrganizationsOrganization
 */
export const OrganizationsOrganizationsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: OrganizationsOrganizationsGetInput,
    outputSchema: OrganizationsOrganizationsGetOutput,
  }));
// Input Schema
export const OrganizationsOrganizationsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/organizationsOrganizations",
    }),
  );
export type OrganizationsOrganizationsListByResourceGroupInput =
  typeof OrganizationsOrganizationsListByResourceGroupInput.Type;

// Output Schema
export const OrganizationsOrganizationsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type OrganizationsOrganizationsListByResourceGroupOutput =
  typeof OrganizationsOrganizationsListByResourceGroupOutput.Type;

// The operation
/**
 * List OrganizationsOrganization resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const OrganizationsOrganizationsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: OrganizationsOrganizationsListByResourceGroupInput,
    outputSchema: OrganizationsOrganizationsListByResourceGroupOutput,
  }));
// Input Schema
export const OrganizationsOrganizationsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/organizationsOrganizations",
    }),
  );
export type OrganizationsOrganizationsListBySubscriptionInput =
  typeof OrganizationsOrganizationsListBySubscriptionInput.Type;

// Output Schema
export const OrganizationsOrganizationsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type OrganizationsOrganizationsListBySubscriptionOutput =
  typeof OrganizationsOrganizationsListBySubscriptionOutput.Type;

// The operation
/**
 * List OrganizationsOrganization resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const OrganizationsOrganizationsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: OrganizationsOrganizationsListBySubscriptionInput,
    outputSchema: OrganizationsOrganizationsListBySubscriptionOutput,
  }));
// Input Schema
export const OrganizationsOrganizationsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/organizationsOrganizations/{name}",
    }),
  );
export type OrganizationsOrganizationsUpdateInput =
  typeof OrganizationsOrganizationsUpdateInput.Type;

// Output Schema
export const OrganizationsOrganizationsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type OrganizationsOrganizationsUpdateOutput =
  typeof OrganizationsOrganizationsUpdateOutput.Type;

// The operation
/**
 * Update a OrganizationsOrganization
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of OrganizationsOrganization
 */
export const OrganizationsOrganizationsUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: OrganizationsOrganizationsUpdateInput,
    outputSchema: OrganizationsOrganizationsUpdateOutput,
  }));
// Input Schema
export const RdsDbClustersCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/rdsDBClusters/{name}",
    }),
  );
export type RdsDbClustersCreateOrReplaceInput =
  typeof RdsDbClustersCreateOrReplaceInput.Type;

// Output Schema
export const RdsDbClustersCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type RdsDbClustersCreateOrReplaceOutput =
  typeof RdsDbClustersCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a RdsDBCluster. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of RdsDBCluster
 */
export const RdsDbClustersCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RdsDbClustersCreateOrReplaceInput,
    outputSchema: RdsDbClustersCreateOrReplaceOutput,
  }));
// Input Schema
export const RdsDbClustersDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/rdsDBClusters/{name}",
    }),
  );
export type RdsDbClustersDeleteInput = typeof RdsDbClustersDeleteInput.Type;

// Output Schema
export const RdsDbClustersDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type RdsDbClustersDeleteOutput = typeof RdsDbClustersDeleteOutput.Type;

// The operation
/**
 * Delete a RdsDBCluster
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of RdsDBCluster
 */
export const RdsDbClustersDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RdsDbClustersDeleteInput,
  outputSchema: RdsDbClustersDeleteOutput,
}));
// Input Schema
export const RdsDbClustersGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  name: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/rdsDBClusters/{name}",
  }),
);
export type RdsDbClustersGetInput = typeof RdsDbClustersGetInput.Type;

// Output Schema
export const RdsDbClustersGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  },
);
export type RdsDbClustersGetOutput = typeof RdsDbClustersGetOutput.Type;

// The operation
/**
 * Get a RdsDBCluster
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of RdsDBCluster
 */
export const RdsDbClustersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RdsDbClustersGetInput,
  outputSchema: RdsDbClustersGetOutput,
}));
// Input Schema
export const RdsDbClustersListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/rdsDBClusters",
    }),
  );
export type RdsDbClustersListByResourceGroupInput =
  typeof RdsDbClustersListByResourceGroupInput.Type;

// Output Schema
export const RdsDbClustersListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type RdsDbClustersListByResourceGroupOutput =
  typeof RdsDbClustersListByResourceGroupOutput.Type;

// The operation
/**
 * List RdsDBCluster resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const RdsDbClustersListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RdsDbClustersListByResourceGroupInput,
    outputSchema: RdsDbClustersListByResourceGroupOutput,
  }));
// Input Schema
export const RdsDbClustersListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/rdsDBClusters",
    }),
  );
export type RdsDbClustersListBySubscriptionInput =
  typeof RdsDbClustersListBySubscriptionInput.Type;

// Output Schema
export const RdsDbClustersListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type RdsDbClustersListBySubscriptionOutput =
  typeof RdsDbClustersListBySubscriptionOutput.Type;

// The operation
/**
 * List RdsDBCluster resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const RdsDbClustersListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RdsDbClustersListBySubscriptionInput,
    outputSchema: RdsDbClustersListBySubscriptionOutput,
  }));
// Input Schema
export const RdsDbClustersUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/rdsDBClusters/{name}",
    }),
  );
export type RdsDbClustersUpdateInput = typeof RdsDbClustersUpdateInput.Type;

// Output Schema
export const RdsDbClustersUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type RdsDbClustersUpdateOutput = typeof RdsDbClustersUpdateOutput.Type;

// The operation
/**
 * Update a RdsDBCluster
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of RdsDBCluster
 */
export const RdsDbClustersUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RdsDbClustersUpdateInput,
  outputSchema: RdsDbClustersUpdateOutput,
}));
// Input Schema
export const RdsDbInstancesCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/rdsDBInstances/{name}",
    }),
  );
export type RdsDbInstancesCreateOrReplaceInput =
  typeof RdsDbInstancesCreateOrReplaceInput.Type;

// Output Schema
export const RdsDbInstancesCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type RdsDbInstancesCreateOrReplaceOutput =
  typeof RdsDbInstancesCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a RdsDBInstance. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of RdsDBInstance
 */
export const RdsDbInstancesCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RdsDbInstancesCreateOrReplaceInput,
    outputSchema: RdsDbInstancesCreateOrReplaceOutput,
  }));
// Input Schema
export const RdsDbInstancesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/rdsDBInstances/{name}",
    }),
  );
export type RdsDbInstancesDeleteInput = typeof RdsDbInstancesDeleteInput.Type;

// Output Schema
export const RdsDbInstancesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type RdsDbInstancesDeleteOutput = typeof RdsDbInstancesDeleteOutput.Type;

// The operation
/**
 * Delete a RdsDBInstance
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of RdsDBInstance
 */
export const RdsDbInstancesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RdsDbInstancesDeleteInput,
    outputSchema: RdsDbInstancesDeleteOutput,
  }),
);
// Input Schema
export const RdsDbInstancesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/rdsDBInstances/{name}",
  }),
);
export type RdsDbInstancesGetInput = typeof RdsDbInstancesGetInput.Type;

// Output Schema
export const RdsDbInstancesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type RdsDbInstancesGetOutput = typeof RdsDbInstancesGetOutput.Type;

// The operation
/**
 * Get a RdsDBInstance
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of RdsDBInstance
 */
export const RdsDbInstancesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RdsDbInstancesGetInput,
  outputSchema: RdsDbInstancesGetOutput,
}));
// Input Schema
export const RdsDbInstancesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/rdsDBInstances",
    }),
  );
export type RdsDbInstancesListByResourceGroupInput =
  typeof RdsDbInstancesListByResourceGroupInput.Type;

// Output Schema
export const RdsDbInstancesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type RdsDbInstancesListByResourceGroupOutput =
  typeof RdsDbInstancesListByResourceGroupOutput.Type;

// The operation
/**
 * List RdsDBInstance resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const RdsDbInstancesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RdsDbInstancesListByResourceGroupInput,
    outputSchema: RdsDbInstancesListByResourceGroupOutput,
  }));
// Input Schema
export const RdsDbInstancesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/rdsDBInstances",
    }),
  );
export type RdsDbInstancesListBySubscriptionInput =
  typeof RdsDbInstancesListBySubscriptionInput.Type;

// Output Schema
export const RdsDbInstancesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type RdsDbInstancesListBySubscriptionOutput =
  typeof RdsDbInstancesListBySubscriptionOutput.Type;

// The operation
/**
 * List RdsDBInstance resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const RdsDbInstancesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RdsDbInstancesListBySubscriptionInput,
    outputSchema: RdsDbInstancesListBySubscriptionOutput,
  }));
// Input Schema
export const RdsDbInstancesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/rdsDBInstances/{name}",
    }),
  );
export type RdsDbInstancesUpdateInput = typeof RdsDbInstancesUpdateInput.Type;

// Output Schema
export const RdsDbInstancesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type RdsDbInstancesUpdateOutput = typeof RdsDbInstancesUpdateOutput.Type;

// The operation
/**
 * Update a RdsDBInstance
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of RdsDBInstance
 */
export const RdsDbInstancesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RdsDbInstancesUpdateInput,
    outputSchema: RdsDbInstancesUpdateOutput,
  }),
);
// Input Schema
export const RdsDbSnapshotAttributesResultsCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/rdsDBSnapshotAttributesResults/{name}",
    }),
  );
export type RdsDbSnapshotAttributesResultsCreateOrReplaceInput =
  typeof RdsDbSnapshotAttributesResultsCreateOrReplaceInput.Type;

// Output Schema
export const RdsDbSnapshotAttributesResultsCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type RdsDbSnapshotAttributesResultsCreateOrReplaceOutput =
  typeof RdsDbSnapshotAttributesResultsCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a RdsDBSnapshotAttributesResult. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of RdsDBSnapshotAttributesResult
 */
export const RdsDbSnapshotAttributesResultsCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RdsDbSnapshotAttributesResultsCreateOrReplaceInput,
    outputSchema: RdsDbSnapshotAttributesResultsCreateOrReplaceOutput,
  }));
// Input Schema
export const RdsDbSnapshotAttributesResultsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/rdsDBSnapshotAttributesResults/{name}",
    }),
  );
export type RdsDbSnapshotAttributesResultsDeleteInput =
  typeof RdsDbSnapshotAttributesResultsDeleteInput.Type;

// Output Schema
export const RdsDbSnapshotAttributesResultsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type RdsDbSnapshotAttributesResultsDeleteOutput =
  typeof RdsDbSnapshotAttributesResultsDeleteOutput.Type;

// The operation
/**
 * Delete a RdsDBSnapshotAttributesResult
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of RdsDBSnapshotAttributesResult
 */
export const RdsDbSnapshotAttributesResultsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RdsDbSnapshotAttributesResultsDeleteInput,
    outputSchema: RdsDbSnapshotAttributesResultsDeleteOutput,
  }));
// Input Schema
export const RdsDbSnapshotAttributesResultsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/rdsDBSnapshotAttributesResults/{name}",
    }),
  );
export type RdsDbSnapshotAttributesResultsGetInput =
  typeof RdsDbSnapshotAttributesResultsGetInput.Type;

// Output Schema
export const RdsDbSnapshotAttributesResultsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type RdsDbSnapshotAttributesResultsGetOutput =
  typeof RdsDbSnapshotAttributesResultsGetOutput.Type;

// The operation
/**
 * Get a RdsDBSnapshotAttributesResult
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of RdsDBSnapshotAttributesResult
 */
export const RdsDbSnapshotAttributesResultsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RdsDbSnapshotAttributesResultsGetInput,
    outputSchema: RdsDbSnapshotAttributesResultsGetOutput,
  }));
// Input Schema
export const RdsDbSnapshotAttributesResultsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/rdsDBSnapshotAttributesResults",
    }),
  );
export type RdsDbSnapshotAttributesResultsListByResourceGroupInput =
  typeof RdsDbSnapshotAttributesResultsListByResourceGroupInput.Type;

// Output Schema
export const RdsDbSnapshotAttributesResultsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type RdsDbSnapshotAttributesResultsListByResourceGroupOutput =
  typeof RdsDbSnapshotAttributesResultsListByResourceGroupOutput.Type;

// The operation
/**
 * List RdsDBSnapshotAttributesResult resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const RdsDbSnapshotAttributesResultsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RdsDbSnapshotAttributesResultsListByResourceGroupInput,
    outputSchema: RdsDbSnapshotAttributesResultsListByResourceGroupOutput,
  }));
// Input Schema
export const RdsDbSnapshotAttributesResultsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/rdsDBSnapshotAttributesResults",
    }),
  );
export type RdsDbSnapshotAttributesResultsListBySubscriptionInput =
  typeof RdsDbSnapshotAttributesResultsListBySubscriptionInput.Type;

// Output Schema
export const RdsDbSnapshotAttributesResultsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type RdsDbSnapshotAttributesResultsListBySubscriptionOutput =
  typeof RdsDbSnapshotAttributesResultsListBySubscriptionOutput.Type;

// The operation
/**
 * List RdsDBSnapshotAttributesResult resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const RdsDbSnapshotAttributesResultsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RdsDbSnapshotAttributesResultsListBySubscriptionInput,
    outputSchema: RdsDbSnapshotAttributesResultsListBySubscriptionOutput,
  }));
// Input Schema
export const RdsDbSnapshotAttributesResultsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/rdsDBSnapshotAttributesResults/{name}",
    }),
  );
export type RdsDbSnapshotAttributesResultsUpdateInput =
  typeof RdsDbSnapshotAttributesResultsUpdateInput.Type;

// Output Schema
export const RdsDbSnapshotAttributesResultsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type RdsDbSnapshotAttributesResultsUpdateOutput =
  typeof RdsDbSnapshotAttributesResultsUpdateOutput.Type;

// The operation
/**
 * Update a RdsDBSnapshotAttributesResult
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of RdsDBSnapshotAttributesResult
 */
export const RdsDbSnapshotAttributesResultsUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RdsDbSnapshotAttributesResultsUpdateInput,
    outputSchema: RdsDbSnapshotAttributesResultsUpdateOutput,
  }));
// Input Schema
export const RdsDbSnapshotsCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/rdsDBSnapshots/{name}",
    }),
  );
export type RdsDbSnapshotsCreateOrReplaceInput =
  typeof RdsDbSnapshotsCreateOrReplaceInput.Type;

// Output Schema
export const RdsDbSnapshotsCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type RdsDbSnapshotsCreateOrReplaceOutput =
  typeof RdsDbSnapshotsCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a RdsDBSnapshot. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of RdsDBSnapshot
 */
export const RdsDbSnapshotsCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RdsDbSnapshotsCreateOrReplaceInput,
    outputSchema: RdsDbSnapshotsCreateOrReplaceOutput,
  }));
// Input Schema
export const RdsDbSnapshotsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/rdsDBSnapshots/{name}",
    }),
  );
export type RdsDbSnapshotsDeleteInput = typeof RdsDbSnapshotsDeleteInput.Type;

// Output Schema
export const RdsDbSnapshotsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type RdsDbSnapshotsDeleteOutput = typeof RdsDbSnapshotsDeleteOutput.Type;

// The operation
/**
 * Delete a RdsDBSnapshot
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of RdsDBSnapshot
 */
export const RdsDbSnapshotsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RdsDbSnapshotsDeleteInput,
    outputSchema: RdsDbSnapshotsDeleteOutput,
  }),
);
// Input Schema
export const RdsDbSnapshotsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/rdsDBSnapshots/{name}",
  }),
);
export type RdsDbSnapshotsGetInput = typeof RdsDbSnapshotsGetInput.Type;

// Output Schema
export const RdsDbSnapshotsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type RdsDbSnapshotsGetOutput = typeof RdsDbSnapshotsGetOutput.Type;

// The operation
/**
 * Get a RdsDBSnapshot
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of RdsDBSnapshot
 */
export const RdsDbSnapshotsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RdsDbSnapshotsGetInput,
  outputSchema: RdsDbSnapshotsGetOutput,
}));
// Input Schema
export const RdsDbSnapshotsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/rdsDBSnapshots",
    }),
  );
export type RdsDbSnapshotsListByResourceGroupInput =
  typeof RdsDbSnapshotsListByResourceGroupInput.Type;

// Output Schema
export const RdsDbSnapshotsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type RdsDbSnapshotsListByResourceGroupOutput =
  typeof RdsDbSnapshotsListByResourceGroupOutput.Type;

// The operation
/**
 * List RdsDBSnapshot resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const RdsDbSnapshotsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RdsDbSnapshotsListByResourceGroupInput,
    outputSchema: RdsDbSnapshotsListByResourceGroupOutput,
  }));
// Input Schema
export const RdsDbSnapshotsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/rdsDBSnapshots",
    }),
  );
export type RdsDbSnapshotsListBySubscriptionInput =
  typeof RdsDbSnapshotsListBySubscriptionInput.Type;

// Output Schema
export const RdsDbSnapshotsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type RdsDbSnapshotsListBySubscriptionOutput =
  typeof RdsDbSnapshotsListBySubscriptionOutput.Type;

// The operation
/**
 * List RdsDBSnapshot resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const RdsDbSnapshotsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RdsDbSnapshotsListBySubscriptionInput,
    outputSchema: RdsDbSnapshotsListBySubscriptionOutput,
  }));
// Input Schema
export const RdsDbSnapshotsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/rdsDBSnapshots/{name}",
    }),
  );
export type RdsDbSnapshotsUpdateInput = typeof RdsDbSnapshotsUpdateInput.Type;

// Output Schema
export const RdsDbSnapshotsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type RdsDbSnapshotsUpdateOutput = typeof RdsDbSnapshotsUpdateOutput.Type;

// The operation
/**
 * Update a RdsDBSnapshot
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of RdsDBSnapshot
 */
export const RdsDbSnapshotsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RdsDbSnapshotsUpdateInput,
    outputSchema: RdsDbSnapshotsUpdateOutput,
  }),
);
// Input Schema
export const RdsEventSubscriptionsCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/rdsEventSubscriptions/{name}",
    }),
  );
export type RdsEventSubscriptionsCreateOrReplaceInput =
  typeof RdsEventSubscriptionsCreateOrReplaceInput.Type;

// Output Schema
export const RdsEventSubscriptionsCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type RdsEventSubscriptionsCreateOrReplaceOutput =
  typeof RdsEventSubscriptionsCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a RdsEventSubscription. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of RdsEventSubscription
 */
export const RdsEventSubscriptionsCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RdsEventSubscriptionsCreateOrReplaceInput,
    outputSchema: RdsEventSubscriptionsCreateOrReplaceOutput,
  }));
// Input Schema
export const RdsEventSubscriptionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/rdsEventSubscriptions/{name}",
    }),
  );
export type RdsEventSubscriptionsDeleteInput =
  typeof RdsEventSubscriptionsDeleteInput.Type;

// Output Schema
export const RdsEventSubscriptionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type RdsEventSubscriptionsDeleteOutput =
  typeof RdsEventSubscriptionsDeleteOutput.Type;

// The operation
/**
 * Delete a RdsEventSubscription
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of RdsEventSubscription
 */
export const RdsEventSubscriptionsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RdsEventSubscriptionsDeleteInput,
    outputSchema: RdsEventSubscriptionsDeleteOutput,
  }),
);
// Input Schema
export const RdsEventSubscriptionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/rdsEventSubscriptions/{name}",
    }),
  );
export type RdsEventSubscriptionsGetInput =
  typeof RdsEventSubscriptionsGetInput.Type;

// Output Schema
export const RdsEventSubscriptionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type RdsEventSubscriptionsGetOutput =
  typeof RdsEventSubscriptionsGetOutput.Type;

// The operation
/**
 * Get a RdsEventSubscription
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of RdsEventSubscription
 */
export const RdsEventSubscriptionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RdsEventSubscriptionsGetInput,
    outputSchema: RdsEventSubscriptionsGetOutput,
  }),
);
// Input Schema
export const RdsEventSubscriptionsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/rdsEventSubscriptions",
    }),
  );
export type RdsEventSubscriptionsListByResourceGroupInput =
  typeof RdsEventSubscriptionsListByResourceGroupInput.Type;

// Output Schema
export const RdsEventSubscriptionsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type RdsEventSubscriptionsListByResourceGroupOutput =
  typeof RdsEventSubscriptionsListByResourceGroupOutput.Type;

// The operation
/**
 * List RdsEventSubscription resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const RdsEventSubscriptionsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RdsEventSubscriptionsListByResourceGroupInput,
    outputSchema: RdsEventSubscriptionsListByResourceGroupOutput,
  }));
// Input Schema
export const RdsEventSubscriptionsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/rdsEventSubscriptions",
    }),
  );
export type RdsEventSubscriptionsListBySubscriptionInput =
  typeof RdsEventSubscriptionsListBySubscriptionInput.Type;

// Output Schema
export const RdsEventSubscriptionsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type RdsEventSubscriptionsListBySubscriptionOutput =
  typeof RdsEventSubscriptionsListBySubscriptionOutput.Type;

// The operation
/**
 * List RdsEventSubscription resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const RdsEventSubscriptionsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RdsEventSubscriptionsListBySubscriptionInput,
    outputSchema: RdsEventSubscriptionsListBySubscriptionOutput,
  }));
// Input Schema
export const RdsEventSubscriptionsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/rdsEventSubscriptions/{name}",
    }),
  );
export type RdsEventSubscriptionsUpdateInput =
  typeof RdsEventSubscriptionsUpdateInput.Type;

// Output Schema
export const RdsEventSubscriptionsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type RdsEventSubscriptionsUpdateOutput =
  typeof RdsEventSubscriptionsUpdateOutput.Type;

// The operation
/**
 * Update a RdsEventSubscription
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of RdsEventSubscription
 */
export const RdsEventSubscriptionsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RdsEventSubscriptionsUpdateInput,
    outputSchema: RdsEventSubscriptionsUpdateOutput,
  }),
);
// Input Schema
export const RdsExportTasksCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/rdsExportTasks/{name}",
    }),
  );
export type RdsExportTasksCreateOrReplaceInput =
  typeof RdsExportTasksCreateOrReplaceInput.Type;

// Output Schema
export const RdsExportTasksCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type RdsExportTasksCreateOrReplaceOutput =
  typeof RdsExportTasksCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a RdsExportTask. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of RdsExportTask
 */
export const RdsExportTasksCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RdsExportTasksCreateOrReplaceInput,
    outputSchema: RdsExportTasksCreateOrReplaceOutput,
  }));
// Input Schema
export const RdsExportTasksDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/rdsExportTasks/{name}",
    }),
  );
export type RdsExportTasksDeleteInput = typeof RdsExportTasksDeleteInput.Type;

// Output Schema
export const RdsExportTasksDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type RdsExportTasksDeleteOutput = typeof RdsExportTasksDeleteOutput.Type;

// The operation
/**
 * Delete a RdsExportTask
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of RdsExportTask
 */
export const RdsExportTasksDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RdsExportTasksDeleteInput,
    outputSchema: RdsExportTasksDeleteOutput,
  }),
);
// Input Schema
export const RdsExportTasksGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/rdsExportTasks/{name}",
  }),
);
export type RdsExportTasksGetInput = typeof RdsExportTasksGetInput.Type;

// Output Schema
export const RdsExportTasksGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type RdsExportTasksGetOutput = typeof RdsExportTasksGetOutput.Type;

// The operation
/**
 * Get a RdsExportTask
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of RdsExportTask
 */
export const RdsExportTasksGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RdsExportTasksGetInput,
  outputSchema: RdsExportTasksGetOutput,
}));
// Input Schema
export const RdsExportTasksListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/rdsExportTasks",
    }),
  );
export type RdsExportTasksListByResourceGroupInput =
  typeof RdsExportTasksListByResourceGroupInput.Type;

// Output Schema
export const RdsExportTasksListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type RdsExportTasksListByResourceGroupOutput =
  typeof RdsExportTasksListByResourceGroupOutput.Type;

// The operation
/**
 * List RdsExportTask resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const RdsExportTasksListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RdsExportTasksListByResourceGroupInput,
    outputSchema: RdsExportTasksListByResourceGroupOutput,
  }));
// Input Schema
export const RdsExportTasksListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/rdsExportTasks",
    }),
  );
export type RdsExportTasksListBySubscriptionInput =
  typeof RdsExportTasksListBySubscriptionInput.Type;

// Output Schema
export const RdsExportTasksListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type RdsExportTasksListBySubscriptionOutput =
  typeof RdsExportTasksListBySubscriptionOutput.Type;

// The operation
/**
 * List RdsExportTask resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const RdsExportTasksListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RdsExportTasksListBySubscriptionInput,
    outputSchema: RdsExportTasksListBySubscriptionOutput,
  }));
// Input Schema
export const RdsExportTasksUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/rdsExportTasks/{name}",
    }),
  );
export type RdsExportTasksUpdateInput = typeof RdsExportTasksUpdateInput.Type;

// Output Schema
export const RdsExportTasksUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type RdsExportTasksUpdateOutput = typeof RdsExportTasksUpdateOutput.Type;

// The operation
/**
 * Update a RdsExportTask
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of RdsExportTask
 */
export const RdsExportTasksUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RdsExportTasksUpdateInput,
    outputSchema: RdsExportTasksUpdateOutput,
  }),
);
// Input Schema
export const RedshiftClusterParameterGroupsCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/redshiftClusterParameterGroups/{name}",
    }),
  );
export type RedshiftClusterParameterGroupsCreateOrReplaceInput =
  typeof RedshiftClusterParameterGroupsCreateOrReplaceInput.Type;

// Output Schema
export const RedshiftClusterParameterGroupsCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type RedshiftClusterParameterGroupsCreateOrReplaceOutput =
  typeof RedshiftClusterParameterGroupsCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a RedshiftClusterParameterGroup. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of RedshiftClusterParameterGroup
 */
export const RedshiftClusterParameterGroupsCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RedshiftClusterParameterGroupsCreateOrReplaceInput,
    outputSchema: RedshiftClusterParameterGroupsCreateOrReplaceOutput,
  }));
// Input Schema
export const RedshiftClusterParameterGroupsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/redshiftClusterParameterGroups/{name}",
    }),
  );
export type RedshiftClusterParameterGroupsDeleteInput =
  typeof RedshiftClusterParameterGroupsDeleteInput.Type;

// Output Schema
export const RedshiftClusterParameterGroupsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type RedshiftClusterParameterGroupsDeleteOutput =
  typeof RedshiftClusterParameterGroupsDeleteOutput.Type;

// The operation
/**
 * Delete a RedshiftClusterParameterGroup
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of RedshiftClusterParameterGroup
 */
export const RedshiftClusterParameterGroupsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RedshiftClusterParameterGroupsDeleteInput,
    outputSchema: RedshiftClusterParameterGroupsDeleteOutput,
  }));
// Input Schema
export const RedshiftClusterParameterGroupsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/redshiftClusterParameterGroups/{name}",
    }),
  );
export type RedshiftClusterParameterGroupsGetInput =
  typeof RedshiftClusterParameterGroupsGetInput.Type;

// Output Schema
export const RedshiftClusterParameterGroupsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type RedshiftClusterParameterGroupsGetOutput =
  typeof RedshiftClusterParameterGroupsGetOutput.Type;

// The operation
/**
 * Get a RedshiftClusterParameterGroup
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of RedshiftClusterParameterGroup
 */
export const RedshiftClusterParameterGroupsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RedshiftClusterParameterGroupsGetInput,
    outputSchema: RedshiftClusterParameterGroupsGetOutput,
  }));
// Input Schema
export const RedshiftClusterParameterGroupsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/redshiftClusterParameterGroups",
    }),
  );
export type RedshiftClusterParameterGroupsListByResourceGroupInput =
  typeof RedshiftClusterParameterGroupsListByResourceGroupInput.Type;

// Output Schema
export const RedshiftClusterParameterGroupsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type RedshiftClusterParameterGroupsListByResourceGroupOutput =
  typeof RedshiftClusterParameterGroupsListByResourceGroupOutput.Type;

// The operation
/**
 * List RedshiftClusterParameterGroup resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const RedshiftClusterParameterGroupsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RedshiftClusterParameterGroupsListByResourceGroupInput,
    outputSchema: RedshiftClusterParameterGroupsListByResourceGroupOutput,
  }));
// Input Schema
export const RedshiftClusterParameterGroupsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/redshiftClusterParameterGroups",
    }),
  );
export type RedshiftClusterParameterGroupsListBySubscriptionInput =
  typeof RedshiftClusterParameterGroupsListBySubscriptionInput.Type;

// Output Schema
export const RedshiftClusterParameterGroupsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type RedshiftClusterParameterGroupsListBySubscriptionOutput =
  typeof RedshiftClusterParameterGroupsListBySubscriptionOutput.Type;

// The operation
/**
 * List RedshiftClusterParameterGroup resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const RedshiftClusterParameterGroupsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RedshiftClusterParameterGroupsListBySubscriptionInput,
    outputSchema: RedshiftClusterParameterGroupsListBySubscriptionOutput,
  }));
// Input Schema
export const RedshiftClusterParameterGroupsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/redshiftClusterParameterGroups/{name}",
    }),
  );
export type RedshiftClusterParameterGroupsUpdateInput =
  typeof RedshiftClusterParameterGroupsUpdateInput.Type;

// Output Schema
export const RedshiftClusterParameterGroupsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type RedshiftClusterParameterGroupsUpdateOutput =
  typeof RedshiftClusterParameterGroupsUpdateOutput.Type;

// The operation
/**
 * Update a RedshiftClusterParameterGroup
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of RedshiftClusterParameterGroup
 */
export const RedshiftClusterParameterGroupsUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RedshiftClusterParameterGroupsUpdateInput,
    outputSchema: RedshiftClusterParameterGroupsUpdateOutput,
  }));
// Input Schema
export const RedshiftClustersCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/redshiftClusters/{name}",
    }),
  );
export type RedshiftClustersCreateOrReplaceInput =
  typeof RedshiftClustersCreateOrReplaceInput.Type;

// Output Schema
export const RedshiftClustersCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type RedshiftClustersCreateOrReplaceOutput =
  typeof RedshiftClustersCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a RedshiftCluster. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of RedshiftCluster
 */
export const RedshiftClustersCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RedshiftClustersCreateOrReplaceInput,
    outputSchema: RedshiftClustersCreateOrReplaceOutput,
  }));
// Input Schema
export const RedshiftClustersDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/redshiftClusters/{name}",
    }),
  );
export type RedshiftClustersDeleteInput =
  typeof RedshiftClustersDeleteInput.Type;

// Output Schema
export const RedshiftClustersDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type RedshiftClustersDeleteOutput =
  typeof RedshiftClustersDeleteOutput.Type;

// The operation
/**
 * Delete a RedshiftCluster
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of RedshiftCluster
 */
export const RedshiftClustersDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RedshiftClustersDeleteInput,
    outputSchema: RedshiftClustersDeleteOutput,
  }),
);
// Input Schema
export const RedshiftClustersGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/redshiftClusters/{name}",
    }),
  );
export type RedshiftClustersGetInput = typeof RedshiftClustersGetInput.Type;

// Output Schema
export const RedshiftClustersGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type RedshiftClustersGetOutput = typeof RedshiftClustersGetOutput.Type;

// The operation
/**
 * Get a RedshiftCluster
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of RedshiftCluster
 */
export const RedshiftClustersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RedshiftClustersGetInput,
  outputSchema: RedshiftClustersGetOutput,
}));
// Input Schema
export const RedshiftClustersListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/redshiftClusters",
    }),
  );
export type RedshiftClustersListByResourceGroupInput =
  typeof RedshiftClustersListByResourceGroupInput.Type;

// Output Schema
export const RedshiftClustersListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type RedshiftClustersListByResourceGroupOutput =
  typeof RedshiftClustersListByResourceGroupOutput.Type;

// The operation
/**
 * List RedshiftCluster resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const RedshiftClustersListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RedshiftClustersListByResourceGroupInput,
    outputSchema: RedshiftClustersListByResourceGroupOutput,
  }));
// Input Schema
export const RedshiftClustersListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/redshiftClusters",
    }),
  );
export type RedshiftClustersListBySubscriptionInput =
  typeof RedshiftClustersListBySubscriptionInput.Type;

// Output Schema
export const RedshiftClustersListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type RedshiftClustersListBySubscriptionOutput =
  typeof RedshiftClustersListBySubscriptionOutput.Type;

// The operation
/**
 * List RedshiftCluster resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const RedshiftClustersListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RedshiftClustersListBySubscriptionInput,
    outputSchema: RedshiftClustersListBySubscriptionOutput,
  }));
// Input Schema
export const RedshiftClustersUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/redshiftClusters/{name}",
    }),
  );
export type RedshiftClustersUpdateInput =
  typeof RedshiftClustersUpdateInput.Type;

// Output Schema
export const RedshiftClustersUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type RedshiftClustersUpdateOutput =
  typeof RedshiftClustersUpdateOutput.Type;

// The operation
/**
 * Update a RedshiftCluster
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of RedshiftCluster
 */
export const RedshiftClustersUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RedshiftClustersUpdateInput,
    outputSchema: RedshiftClustersUpdateOutput,
  }),
);
// Input Schema
export const Route53DomainsDomainSummariesCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/route53DomainsDomainSummaries/{name}",
    }),
  );
export type Route53DomainsDomainSummariesCreateOrReplaceInput =
  typeof Route53DomainsDomainSummariesCreateOrReplaceInput.Type;

// Output Schema
export const Route53DomainsDomainSummariesCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type Route53DomainsDomainSummariesCreateOrReplaceOutput =
  typeof Route53DomainsDomainSummariesCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a Route53DomainsDomainSummary. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Route53DomainsDomainSummary
 */
export const Route53DomainsDomainSummariesCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: Route53DomainsDomainSummariesCreateOrReplaceInput,
    outputSchema: Route53DomainsDomainSummariesCreateOrReplaceOutput,
  }));
// Input Schema
export const Route53DomainsDomainSummariesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/route53DomainsDomainSummaries/{name}",
    }),
  );
export type Route53DomainsDomainSummariesDeleteInput =
  typeof Route53DomainsDomainSummariesDeleteInput.Type;

// Output Schema
export const Route53DomainsDomainSummariesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type Route53DomainsDomainSummariesDeleteOutput =
  typeof Route53DomainsDomainSummariesDeleteOutput.Type;

// The operation
/**
 * Delete a Route53DomainsDomainSummary
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Route53DomainsDomainSummary
 */
export const Route53DomainsDomainSummariesDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: Route53DomainsDomainSummariesDeleteInput,
    outputSchema: Route53DomainsDomainSummariesDeleteOutput,
  }));
// Input Schema
export const Route53DomainsDomainSummariesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/route53DomainsDomainSummaries/{name}",
    }),
  );
export type Route53DomainsDomainSummariesGetInput =
  typeof Route53DomainsDomainSummariesGetInput.Type;

// Output Schema
export const Route53DomainsDomainSummariesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type Route53DomainsDomainSummariesGetOutput =
  typeof Route53DomainsDomainSummariesGetOutput.Type;

// The operation
/**
 * Get a Route53DomainsDomainSummary
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Route53DomainsDomainSummary
 */
export const Route53DomainsDomainSummariesGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: Route53DomainsDomainSummariesGetInput,
    outputSchema: Route53DomainsDomainSummariesGetOutput,
  }));
// Input Schema
export const Route53DomainsDomainSummariesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/route53DomainsDomainSummaries",
    }),
  );
export type Route53DomainsDomainSummariesListByResourceGroupInput =
  typeof Route53DomainsDomainSummariesListByResourceGroupInput.Type;

// Output Schema
export const Route53DomainsDomainSummariesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type Route53DomainsDomainSummariesListByResourceGroupOutput =
  typeof Route53DomainsDomainSummariesListByResourceGroupOutput.Type;

// The operation
/**
 * List Route53DomainsDomainSummary resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const Route53DomainsDomainSummariesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: Route53DomainsDomainSummariesListByResourceGroupInput,
    outputSchema: Route53DomainsDomainSummariesListByResourceGroupOutput,
  }));
// Input Schema
export const Route53DomainsDomainSummariesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/route53DomainsDomainSummaries",
    }),
  );
export type Route53DomainsDomainSummariesListBySubscriptionInput =
  typeof Route53DomainsDomainSummariesListBySubscriptionInput.Type;

// Output Schema
export const Route53DomainsDomainSummariesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type Route53DomainsDomainSummariesListBySubscriptionOutput =
  typeof Route53DomainsDomainSummariesListBySubscriptionOutput.Type;

// The operation
/**
 * List Route53DomainsDomainSummary resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const Route53DomainsDomainSummariesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: Route53DomainsDomainSummariesListBySubscriptionInput,
    outputSchema: Route53DomainsDomainSummariesListBySubscriptionOutput,
  }));
// Input Schema
export const Route53DomainsDomainSummariesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/route53DomainsDomainSummaries/{name}",
    }),
  );
export type Route53DomainsDomainSummariesUpdateInput =
  typeof Route53DomainsDomainSummariesUpdateInput.Type;

// Output Schema
export const Route53DomainsDomainSummariesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type Route53DomainsDomainSummariesUpdateOutput =
  typeof Route53DomainsDomainSummariesUpdateOutput.Type;

// The operation
/**
 * Update a Route53DomainsDomainSummary
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Route53DomainsDomainSummary
 */
export const Route53DomainsDomainSummariesUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: Route53DomainsDomainSummariesUpdateInput,
    outputSchema: Route53DomainsDomainSummariesUpdateOutput,
  }));
// Input Schema
export const Route53HostedZonesCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/route53HostedZones/{name}",
    }),
  );
export type Route53HostedZonesCreateOrReplaceInput =
  typeof Route53HostedZonesCreateOrReplaceInput.Type;

// Output Schema
export const Route53HostedZonesCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type Route53HostedZonesCreateOrReplaceOutput =
  typeof Route53HostedZonesCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a Route53HostedZone. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Route53HostedZone
 */
export const Route53HostedZonesCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: Route53HostedZonesCreateOrReplaceInput,
    outputSchema: Route53HostedZonesCreateOrReplaceOutput,
  }));
// Input Schema
export const Route53HostedZonesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/route53HostedZones/{name}",
    }),
  );
export type Route53HostedZonesDeleteInput =
  typeof Route53HostedZonesDeleteInput.Type;

// Output Schema
export const Route53HostedZonesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type Route53HostedZonesDeleteOutput =
  typeof Route53HostedZonesDeleteOutput.Type;

// The operation
/**
 * Delete a Route53HostedZone
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Route53HostedZone
 */
export const Route53HostedZonesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: Route53HostedZonesDeleteInput,
    outputSchema: Route53HostedZonesDeleteOutput,
  }),
);
// Input Schema
export const Route53HostedZonesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/route53HostedZones/{name}",
    }),
  );
export type Route53HostedZonesGetInput = typeof Route53HostedZonesGetInput.Type;

// Output Schema
export const Route53HostedZonesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type Route53HostedZonesGetOutput =
  typeof Route53HostedZonesGetOutput.Type;

// The operation
/**
 * Get a Route53HostedZone
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Route53HostedZone
 */
export const Route53HostedZonesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: Route53HostedZonesGetInput,
    outputSchema: Route53HostedZonesGetOutput,
  }),
);
// Input Schema
export const Route53HostedZonesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/route53HostedZones",
    }),
  );
export type Route53HostedZonesListByResourceGroupInput =
  typeof Route53HostedZonesListByResourceGroupInput.Type;

// Output Schema
export const Route53HostedZonesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type Route53HostedZonesListByResourceGroupOutput =
  typeof Route53HostedZonesListByResourceGroupOutput.Type;

// The operation
/**
 * List Route53HostedZone resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const Route53HostedZonesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: Route53HostedZonesListByResourceGroupInput,
    outputSchema: Route53HostedZonesListByResourceGroupOutput,
  }));
// Input Schema
export const Route53HostedZonesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/route53HostedZones",
    }),
  );
export type Route53HostedZonesListBySubscriptionInput =
  typeof Route53HostedZonesListBySubscriptionInput.Type;

// Output Schema
export const Route53HostedZonesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type Route53HostedZonesListBySubscriptionOutput =
  typeof Route53HostedZonesListBySubscriptionOutput.Type;

// The operation
/**
 * List Route53HostedZone resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const Route53HostedZonesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: Route53HostedZonesListBySubscriptionInput,
    outputSchema: Route53HostedZonesListBySubscriptionOutput,
  }));
// Input Schema
export const Route53HostedZonesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/route53HostedZones/{name}",
    }),
  );
export type Route53HostedZonesUpdateInput =
  typeof Route53HostedZonesUpdateInput.Type;

// Output Schema
export const Route53HostedZonesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type Route53HostedZonesUpdateOutput =
  typeof Route53HostedZonesUpdateOutput.Type;

// The operation
/**
 * Update a Route53HostedZone
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Route53HostedZone
 */
export const Route53HostedZonesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: Route53HostedZonesUpdateInput,
    outputSchema: Route53HostedZonesUpdateOutput,
  }),
);
// Input Schema
export const Route53ResourceRecordSetsCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/route53ResourceRecordSets/{name}",
    }),
  );
export type Route53ResourceRecordSetsCreateOrReplaceInput =
  typeof Route53ResourceRecordSetsCreateOrReplaceInput.Type;

// Output Schema
export const Route53ResourceRecordSetsCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type Route53ResourceRecordSetsCreateOrReplaceOutput =
  typeof Route53ResourceRecordSetsCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a Route53ResourceRecordSet. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Route53ResourceRecordSet
 */
export const Route53ResourceRecordSetsCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: Route53ResourceRecordSetsCreateOrReplaceInput,
    outputSchema: Route53ResourceRecordSetsCreateOrReplaceOutput,
  }));
// Input Schema
export const Route53ResourceRecordSetsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/route53ResourceRecordSets/{name}",
    }),
  );
export type Route53ResourceRecordSetsDeleteInput =
  typeof Route53ResourceRecordSetsDeleteInput.Type;

// Output Schema
export const Route53ResourceRecordSetsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type Route53ResourceRecordSetsDeleteOutput =
  typeof Route53ResourceRecordSetsDeleteOutput.Type;

// The operation
/**
 * Delete a Route53ResourceRecordSet
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Route53ResourceRecordSet
 */
export const Route53ResourceRecordSetsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: Route53ResourceRecordSetsDeleteInput,
    outputSchema: Route53ResourceRecordSetsDeleteOutput,
  }));
// Input Schema
export const Route53ResourceRecordSetsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/route53ResourceRecordSets/{name}",
    }),
  );
export type Route53ResourceRecordSetsGetInput =
  typeof Route53ResourceRecordSetsGetInput.Type;

// Output Schema
export const Route53ResourceRecordSetsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type Route53ResourceRecordSetsGetOutput =
  typeof Route53ResourceRecordSetsGetOutput.Type;

// The operation
/**
 * Get a Route53ResourceRecordSet
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Route53ResourceRecordSet
 */
export const Route53ResourceRecordSetsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: Route53ResourceRecordSetsGetInput,
    outputSchema: Route53ResourceRecordSetsGetOutput,
  }));
// Input Schema
export const Route53ResourceRecordSetsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/route53ResourceRecordSets",
    }),
  );
export type Route53ResourceRecordSetsListByResourceGroupInput =
  typeof Route53ResourceRecordSetsListByResourceGroupInput.Type;

// Output Schema
export const Route53ResourceRecordSetsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type Route53ResourceRecordSetsListByResourceGroupOutput =
  typeof Route53ResourceRecordSetsListByResourceGroupOutput.Type;

// The operation
/**
 * List Route53ResourceRecordSet resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const Route53ResourceRecordSetsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: Route53ResourceRecordSetsListByResourceGroupInput,
    outputSchema: Route53ResourceRecordSetsListByResourceGroupOutput,
  }));
// Input Schema
export const Route53ResourceRecordSetsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/route53ResourceRecordSets",
    }),
  );
export type Route53ResourceRecordSetsListBySubscriptionInput =
  typeof Route53ResourceRecordSetsListBySubscriptionInput.Type;

// Output Schema
export const Route53ResourceRecordSetsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type Route53ResourceRecordSetsListBySubscriptionOutput =
  typeof Route53ResourceRecordSetsListBySubscriptionOutput.Type;

// The operation
/**
 * List Route53ResourceRecordSet resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const Route53ResourceRecordSetsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: Route53ResourceRecordSetsListBySubscriptionInput,
    outputSchema: Route53ResourceRecordSetsListBySubscriptionOutput,
  }));
// Input Schema
export const Route53ResourceRecordSetsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/route53ResourceRecordSets/{name}",
    }),
  );
export type Route53ResourceRecordSetsUpdateInput =
  typeof Route53ResourceRecordSetsUpdateInput.Type;

// Output Schema
export const Route53ResourceRecordSetsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type Route53ResourceRecordSetsUpdateOutput =
  typeof Route53ResourceRecordSetsUpdateOutput.Type;

// The operation
/**
 * Update a Route53ResourceRecordSet
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Route53ResourceRecordSet
 */
export const Route53ResourceRecordSetsUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: Route53ResourceRecordSetsUpdateInput,
    outputSchema: Route53ResourceRecordSetsUpdateOutput,
  }));
// Input Schema
export const S3AccessControlPoliciesCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/s3AccessControlPolicies/{name}",
    }),
  );
export type S3AccessControlPoliciesCreateOrReplaceInput =
  typeof S3AccessControlPoliciesCreateOrReplaceInput.Type;

// Output Schema
export const S3AccessControlPoliciesCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type S3AccessControlPoliciesCreateOrReplaceOutput =
  typeof S3AccessControlPoliciesCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a S3AccessControlPolicy. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of S3AccessControlPolicy
 */
export const S3AccessControlPoliciesCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: S3AccessControlPoliciesCreateOrReplaceInput,
    outputSchema: S3AccessControlPoliciesCreateOrReplaceOutput,
  }));
// Input Schema
export const S3AccessControlPoliciesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/s3AccessControlPolicies/{name}",
    }),
  );
export type S3AccessControlPoliciesDeleteInput =
  typeof S3AccessControlPoliciesDeleteInput.Type;

// Output Schema
export const S3AccessControlPoliciesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type S3AccessControlPoliciesDeleteOutput =
  typeof S3AccessControlPoliciesDeleteOutput.Type;

// The operation
/**
 * Delete a S3AccessControlPolicy
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of S3AccessControlPolicy
 */
export const S3AccessControlPoliciesDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: S3AccessControlPoliciesDeleteInput,
    outputSchema: S3AccessControlPoliciesDeleteOutput,
  }));
// Input Schema
export const S3AccessControlPoliciesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/s3AccessControlPolicies/{name}",
    }),
  );
export type S3AccessControlPoliciesGetInput =
  typeof S3AccessControlPoliciesGetInput.Type;

// Output Schema
export const S3AccessControlPoliciesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type S3AccessControlPoliciesGetOutput =
  typeof S3AccessControlPoliciesGetOutput.Type;

// The operation
/**
 * Get a S3AccessControlPolicy
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of S3AccessControlPolicy
 */
export const S3AccessControlPoliciesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: S3AccessControlPoliciesGetInput,
    outputSchema: S3AccessControlPoliciesGetOutput,
  }),
);
// Input Schema
export const S3AccessControlPoliciesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/s3AccessControlPolicies",
    }),
  );
export type S3AccessControlPoliciesListByResourceGroupInput =
  typeof S3AccessControlPoliciesListByResourceGroupInput.Type;

// Output Schema
export const S3AccessControlPoliciesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type S3AccessControlPoliciesListByResourceGroupOutput =
  typeof S3AccessControlPoliciesListByResourceGroupOutput.Type;

// The operation
/**
 * List S3AccessControlPolicy resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const S3AccessControlPoliciesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: S3AccessControlPoliciesListByResourceGroupInput,
    outputSchema: S3AccessControlPoliciesListByResourceGroupOutput,
  }));
// Input Schema
export const S3AccessControlPoliciesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/s3AccessControlPolicies",
    }),
  );
export type S3AccessControlPoliciesListBySubscriptionInput =
  typeof S3AccessControlPoliciesListBySubscriptionInput.Type;

// Output Schema
export const S3AccessControlPoliciesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type S3AccessControlPoliciesListBySubscriptionOutput =
  typeof S3AccessControlPoliciesListBySubscriptionOutput.Type;

// The operation
/**
 * List S3AccessControlPolicy resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const S3AccessControlPoliciesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: S3AccessControlPoliciesListBySubscriptionInput,
    outputSchema: S3AccessControlPoliciesListBySubscriptionOutput,
  }));
// Input Schema
export const S3AccessControlPoliciesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/s3AccessControlPolicies/{name}",
    }),
  );
export type S3AccessControlPoliciesUpdateInput =
  typeof S3AccessControlPoliciesUpdateInput.Type;

// Output Schema
export const S3AccessControlPoliciesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type S3AccessControlPoliciesUpdateOutput =
  typeof S3AccessControlPoliciesUpdateOutput.Type;

// The operation
/**
 * Update a S3AccessControlPolicy
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of S3AccessControlPolicy
 */
export const S3AccessControlPoliciesUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: S3AccessControlPoliciesUpdateInput,
    outputSchema: S3AccessControlPoliciesUpdateOutput,
  }));
// Input Schema
export const S3AccessPointsCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/s3AccessPoints/{name}",
    }),
  );
export type S3AccessPointsCreateOrReplaceInput =
  typeof S3AccessPointsCreateOrReplaceInput.Type;

// Output Schema
export const S3AccessPointsCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type S3AccessPointsCreateOrReplaceOutput =
  typeof S3AccessPointsCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a S3AccessPoint. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of S3AccessPoint
 */
export const S3AccessPointsCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: S3AccessPointsCreateOrReplaceInput,
    outputSchema: S3AccessPointsCreateOrReplaceOutput,
  }));
// Input Schema
export const S3AccessPointsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/s3AccessPoints/{name}",
    }),
  );
export type S3AccessPointsDeleteInput = typeof S3AccessPointsDeleteInput.Type;

// Output Schema
export const S3AccessPointsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type S3AccessPointsDeleteOutput = typeof S3AccessPointsDeleteOutput.Type;

// The operation
/**
 * Delete a S3AccessPoint
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of S3AccessPoint
 */
export const S3AccessPointsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: S3AccessPointsDeleteInput,
    outputSchema: S3AccessPointsDeleteOutput,
  }),
);
// Input Schema
export const S3AccessPointsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/s3AccessPoints/{name}",
  }),
);
export type S3AccessPointsGetInput = typeof S3AccessPointsGetInput.Type;

// Output Schema
export const S3AccessPointsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type S3AccessPointsGetOutput = typeof S3AccessPointsGetOutput.Type;

// The operation
/**
 * Get a S3AccessPoint
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of S3AccessPoint
 */
export const S3AccessPointsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: S3AccessPointsGetInput,
  outputSchema: S3AccessPointsGetOutput,
}));
// Input Schema
export const S3AccessPointsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/s3AccessPoints",
    }),
  );
export type S3AccessPointsListByResourceGroupInput =
  typeof S3AccessPointsListByResourceGroupInput.Type;

// Output Schema
export const S3AccessPointsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type S3AccessPointsListByResourceGroupOutput =
  typeof S3AccessPointsListByResourceGroupOutput.Type;

// The operation
/**
 * List S3AccessPoint resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const S3AccessPointsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: S3AccessPointsListByResourceGroupInput,
    outputSchema: S3AccessPointsListByResourceGroupOutput,
  }));
// Input Schema
export const S3AccessPointsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/s3AccessPoints",
    }),
  );
export type S3AccessPointsListBySubscriptionInput =
  typeof S3AccessPointsListBySubscriptionInput.Type;

// Output Schema
export const S3AccessPointsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type S3AccessPointsListBySubscriptionOutput =
  typeof S3AccessPointsListBySubscriptionOutput.Type;

// The operation
/**
 * List S3AccessPoint resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const S3AccessPointsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: S3AccessPointsListBySubscriptionInput,
    outputSchema: S3AccessPointsListBySubscriptionOutput,
  }));
// Input Schema
export const S3AccessPointsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/s3AccessPoints/{name}",
    }),
  );
export type S3AccessPointsUpdateInput = typeof S3AccessPointsUpdateInput.Type;

// Output Schema
export const S3AccessPointsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type S3AccessPointsUpdateOutput = typeof S3AccessPointsUpdateOutput.Type;

// The operation
/**
 * Update a S3AccessPoint
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of S3AccessPoint
 */
export const S3AccessPointsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: S3AccessPointsUpdateInput,
    outputSchema: S3AccessPointsUpdateOutput,
  }),
);
// Input Schema
export const S3BucketPoliciesCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/s3BucketPolicies/{name}",
    }),
  );
export type S3BucketPoliciesCreateOrReplaceInput =
  typeof S3BucketPoliciesCreateOrReplaceInput.Type;

// Output Schema
export const S3BucketPoliciesCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type S3BucketPoliciesCreateOrReplaceOutput =
  typeof S3BucketPoliciesCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a S3BucketPolicy. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of S3BucketPolicy
 */
export const S3BucketPoliciesCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: S3BucketPoliciesCreateOrReplaceInput,
    outputSchema: S3BucketPoliciesCreateOrReplaceOutput,
  }));
// Input Schema
export const S3BucketPoliciesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/s3BucketPolicies/{name}",
    }),
  );
export type S3BucketPoliciesDeleteInput =
  typeof S3BucketPoliciesDeleteInput.Type;

// Output Schema
export const S3BucketPoliciesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type S3BucketPoliciesDeleteOutput =
  typeof S3BucketPoliciesDeleteOutput.Type;

// The operation
/**
 * Delete a S3BucketPolicy
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of S3BucketPolicy
 */
export const S3BucketPoliciesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: S3BucketPoliciesDeleteInput,
    outputSchema: S3BucketPoliciesDeleteOutput,
  }),
);
// Input Schema
export const S3BucketPoliciesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/s3BucketPolicies/{name}",
    }),
  );
export type S3BucketPoliciesGetInput = typeof S3BucketPoliciesGetInput.Type;

// Output Schema
export const S3BucketPoliciesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type S3BucketPoliciesGetOutput = typeof S3BucketPoliciesGetOutput.Type;

// The operation
/**
 * Get a S3BucketPolicy
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of S3BucketPolicy
 */
export const S3BucketPoliciesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: S3BucketPoliciesGetInput,
  outputSchema: S3BucketPoliciesGetOutput,
}));
// Input Schema
export const S3BucketPoliciesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/s3BucketPolicies",
    }),
  );
export type S3BucketPoliciesListByResourceGroupInput =
  typeof S3BucketPoliciesListByResourceGroupInput.Type;

// Output Schema
export const S3BucketPoliciesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type S3BucketPoliciesListByResourceGroupOutput =
  typeof S3BucketPoliciesListByResourceGroupOutput.Type;

// The operation
/**
 * List S3BucketPolicy resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const S3BucketPoliciesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: S3BucketPoliciesListByResourceGroupInput,
    outputSchema: S3BucketPoliciesListByResourceGroupOutput,
  }));
// Input Schema
export const S3BucketPoliciesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/s3BucketPolicies",
    }),
  );
export type S3BucketPoliciesListBySubscriptionInput =
  typeof S3BucketPoliciesListBySubscriptionInput.Type;

// Output Schema
export const S3BucketPoliciesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type S3BucketPoliciesListBySubscriptionOutput =
  typeof S3BucketPoliciesListBySubscriptionOutput.Type;

// The operation
/**
 * List S3BucketPolicy resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const S3BucketPoliciesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: S3BucketPoliciesListBySubscriptionInput,
    outputSchema: S3BucketPoliciesListBySubscriptionOutput,
  }));
// Input Schema
export const S3BucketPoliciesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/s3BucketPolicies/{name}",
    }),
  );
export type S3BucketPoliciesUpdateInput =
  typeof S3BucketPoliciesUpdateInput.Type;

// Output Schema
export const S3BucketPoliciesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type S3BucketPoliciesUpdateOutput =
  typeof S3BucketPoliciesUpdateOutput.Type;

// The operation
/**
 * Update a S3BucketPolicy
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of S3BucketPolicy
 */
export const S3BucketPoliciesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: S3BucketPoliciesUpdateInput,
    outputSchema: S3BucketPoliciesUpdateOutput,
  }),
);
// Input Schema
export const S3BucketsCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/s3Buckets/{name}",
    }),
  );
export type S3BucketsCreateOrReplaceInput =
  typeof S3BucketsCreateOrReplaceInput.Type;

// Output Schema
export const S3BucketsCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type S3BucketsCreateOrReplaceOutput =
  typeof S3BucketsCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a S3Bucket. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of S3Bucket
 */
export const S3BucketsCreateOrReplace = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: S3BucketsCreateOrReplaceInput,
    outputSchema: S3BucketsCreateOrReplaceOutput,
  }),
);
// Input Schema
export const S3BucketsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  name: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/s3Buckets/{name}",
  }),
);
export type S3BucketsDeleteInput = typeof S3BucketsDeleteInput.Type;

// Output Schema
export const S3BucketsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type S3BucketsDeleteOutput = typeof S3BucketsDeleteOutput.Type;

// The operation
/**
 * Delete a S3Bucket
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of S3Bucket
 */
export const S3BucketsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: S3BucketsDeleteInput,
  outputSchema: S3BucketsDeleteOutput,
}));
// Input Schema
export const S3BucketsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  name: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/s3Buckets/{name}",
  }),
);
export type S3BucketsGetInput = typeof S3BucketsGetInput.Type;

// Output Schema
export const S3BucketsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type S3BucketsGetOutput = typeof S3BucketsGetOutput.Type;

// The operation
/**
 * Get a S3Bucket
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of S3Bucket
 */
export const S3BucketsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: S3BucketsGetInput,
  outputSchema: S3BucketsGetOutput,
}));
// Input Schema
export const S3BucketsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/s3Buckets",
    }),
  );
export type S3BucketsListByResourceGroupInput =
  typeof S3BucketsListByResourceGroupInput.Type;

// Output Schema
export const S3BucketsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type S3BucketsListByResourceGroupOutput =
  typeof S3BucketsListByResourceGroupOutput.Type;

// The operation
/**
 * List S3Bucket resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const S3BucketsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: S3BucketsListByResourceGroupInput,
    outputSchema: S3BucketsListByResourceGroupOutput,
  }));
// Input Schema
export const S3BucketsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/s3Buckets",
    }),
  );
export type S3BucketsListBySubscriptionInput =
  typeof S3BucketsListBySubscriptionInput.Type;

// Output Schema
export const S3BucketsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type S3BucketsListBySubscriptionOutput =
  typeof S3BucketsListBySubscriptionOutput.Type;

// The operation
/**
 * List S3Bucket resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const S3BucketsListBySubscription = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: S3BucketsListBySubscriptionInput,
    outputSchema: S3BucketsListBySubscriptionOutput,
  }),
);
// Input Schema
export const S3BucketsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  name: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/s3Buckets/{name}",
  }),
);
export type S3BucketsUpdateInput = typeof S3BucketsUpdateInput.Type;

// Output Schema
export const S3BucketsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type S3BucketsUpdateOutput = typeof S3BucketsUpdateOutput.Type;

// The operation
/**
 * Update a S3Bucket
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of S3Bucket
 */
export const S3BucketsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: S3BucketsUpdateInput,
  outputSchema: S3BucketsUpdateOutput,
}));
// Input Schema
export const S3ControlMultiRegionAccessPointPolicyDocumentsCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/s3ControlMultiRegionAccessPointPolicyDocuments/{name}",
    }),
  );
export type S3ControlMultiRegionAccessPointPolicyDocumentsCreateOrReplaceInput =
  typeof S3ControlMultiRegionAccessPointPolicyDocumentsCreateOrReplaceInput.Type;

// Output Schema
export const S3ControlMultiRegionAccessPointPolicyDocumentsCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type S3ControlMultiRegionAccessPointPolicyDocumentsCreateOrReplaceOutput =
  typeof S3ControlMultiRegionAccessPointPolicyDocumentsCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a S3ControlMultiRegionAccessPointPolicyDocument. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of S3ControlMultiRegionAccessPointPolicyDocument
 */
export const S3ControlMultiRegionAccessPointPolicyDocumentsCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      S3ControlMultiRegionAccessPointPolicyDocumentsCreateOrReplaceInput,
    outputSchema:
      S3ControlMultiRegionAccessPointPolicyDocumentsCreateOrReplaceOutput,
  }));
// Input Schema
export const S3ControlMultiRegionAccessPointPolicyDocumentsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/s3ControlMultiRegionAccessPointPolicyDocuments/{name}",
    }),
  );
export type S3ControlMultiRegionAccessPointPolicyDocumentsDeleteInput =
  typeof S3ControlMultiRegionAccessPointPolicyDocumentsDeleteInput.Type;

// Output Schema
export const S3ControlMultiRegionAccessPointPolicyDocumentsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type S3ControlMultiRegionAccessPointPolicyDocumentsDeleteOutput =
  typeof S3ControlMultiRegionAccessPointPolicyDocumentsDeleteOutput.Type;

// The operation
/**
 * Delete a S3ControlMultiRegionAccessPointPolicyDocument
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of S3ControlMultiRegionAccessPointPolicyDocument
 */
export const S3ControlMultiRegionAccessPointPolicyDocumentsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: S3ControlMultiRegionAccessPointPolicyDocumentsDeleteInput,
    outputSchema: S3ControlMultiRegionAccessPointPolicyDocumentsDeleteOutput,
  }));
// Input Schema
export const S3ControlMultiRegionAccessPointPolicyDocumentsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/s3ControlMultiRegionAccessPointPolicyDocuments/{name}",
    }),
  );
export type S3ControlMultiRegionAccessPointPolicyDocumentsGetInput =
  typeof S3ControlMultiRegionAccessPointPolicyDocumentsGetInput.Type;

// Output Schema
export const S3ControlMultiRegionAccessPointPolicyDocumentsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type S3ControlMultiRegionAccessPointPolicyDocumentsGetOutput =
  typeof S3ControlMultiRegionAccessPointPolicyDocumentsGetOutput.Type;

// The operation
/**
 * Get a S3ControlMultiRegionAccessPointPolicyDocument
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of S3ControlMultiRegionAccessPointPolicyDocument
 */
export const S3ControlMultiRegionAccessPointPolicyDocumentsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: S3ControlMultiRegionAccessPointPolicyDocumentsGetInput,
    outputSchema: S3ControlMultiRegionAccessPointPolicyDocumentsGetOutput,
  }));
// Input Schema
export const S3ControlMultiRegionAccessPointPolicyDocumentsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/s3ControlMultiRegionAccessPointPolicyDocuments",
    }),
  );
export type S3ControlMultiRegionAccessPointPolicyDocumentsListByResourceGroupInput =
  typeof S3ControlMultiRegionAccessPointPolicyDocumentsListByResourceGroupInput.Type;

// Output Schema
export const S3ControlMultiRegionAccessPointPolicyDocumentsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type S3ControlMultiRegionAccessPointPolicyDocumentsListByResourceGroupOutput =
  typeof S3ControlMultiRegionAccessPointPolicyDocumentsListByResourceGroupOutput.Type;

// The operation
/**
 * List S3ControlMultiRegionAccessPointPolicyDocument resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const S3ControlMultiRegionAccessPointPolicyDocumentsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      S3ControlMultiRegionAccessPointPolicyDocumentsListByResourceGroupInput,
    outputSchema:
      S3ControlMultiRegionAccessPointPolicyDocumentsListByResourceGroupOutput,
  }));
// Input Schema
export const S3ControlMultiRegionAccessPointPolicyDocumentsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/s3ControlMultiRegionAccessPointPolicyDocuments",
    }),
  );
export type S3ControlMultiRegionAccessPointPolicyDocumentsListBySubscriptionInput =
  typeof S3ControlMultiRegionAccessPointPolicyDocumentsListBySubscriptionInput.Type;

// Output Schema
export const S3ControlMultiRegionAccessPointPolicyDocumentsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type S3ControlMultiRegionAccessPointPolicyDocumentsListBySubscriptionOutput =
  typeof S3ControlMultiRegionAccessPointPolicyDocumentsListBySubscriptionOutput.Type;

// The operation
/**
 * List S3ControlMultiRegionAccessPointPolicyDocument resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const S3ControlMultiRegionAccessPointPolicyDocumentsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      S3ControlMultiRegionAccessPointPolicyDocumentsListBySubscriptionInput,
    outputSchema:
      S3ControlMultiRegionAccessPointPolicyDocumentsListBySubscriptionOutput,
  }));
// Input Schema
export const S3ControlMultiRegionAccessPointPolicyDocumentsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/s3ControlMultiRegionAccessPointPolicyDocuments/{name}",
    }),
  );
export type S3ControlMultiRegionAccessPointPolicyDocumentsUpdateInput =
  typeof S3ControlMultiRegionAccessPointPolicyDocumentsUpdateInput.Type;

// Output Schema
export const S3ControlMultiRegionAccessPointPolicyDocumentsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type S3ControlMultiRegionAccessPointPolicyDocumentsUpdateOutput =
  typeof S3ControlMultiRegionAccessPointPolicyDocumentsUpdateOutput.Type;

// The operation
/**
 * Update a S3ControlMultiRegionAccessPointPolicyDocument
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of S3ControlMultiRegionAccessPointPolicyDocument
 */
export const S3ControlMultiRegionAccessPointPolicyDocumentsUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: S3ControlMultiRegionAccessPointPolicyDocumentsUpdateInput,
    outputSchema: S3ControlMultiRegionAccessPointPolicyDocumentsUpdateOutput,
  }));
// Input Schema
export const SageMakerAppsCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/sageMakerApps/{name}",
    }),
  );
export type SageMakerAppsCreateOrReplaceInput =
  typeof SageMakerAppsCreateOrReplaceInput.Type;

// Output Schema
export const SageMakerAppsCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SageMakerAppsCreateOrReplaceOutput =
  typeof SageMakerAppsCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a SageMakerApp. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of SageMakerApp
 */
export const SageMakerAppsCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SageMakerAppsCreateOrReplaceInput,
    outputSchema: SageMakerAppsCreateOrReplaceOutput,
  }));
// Input Schema
export const SageMakerAppsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/sageMakerApps/{name}",
    }),
  );
export type SageMakerAppsDeleteInput = typeof SageMakerAppsDeleteInput.Type;

// Output Schema
export const SageMakerAppsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SageMakerAppsDeleteOutput = typeof SageMakerAppsDeleteOutput.Type;

// The operation
/**
 * Delete a SageMakerApp
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of SageMakerApp
 */
export const SageMakerAppsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SageMakerAppsDeleteInput,
  outputSchema: SageMakerAppsDeleteOutput,
}));
// Input Schema
export const SageMakerAppsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  name: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/sageMakerApps/{name}",
  }),
);
export type SageMakerAppsGetInput = typeof SageMakerAppsGetInput.Type;

// Output Schema
export const SageMakerAppsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  },
);
export type SageMakerAppsGetOutput = typeof SageMakerAppsGetOutput.Type;

// The operation
/**
 * Get a SageMakerApp
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of SageMakerApp
 */
export const SageMakerAppsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SageMakerAppsGetInput,
  outputSchema: SageMakerAppsGetOutput,
}));
// Input Schema
export const SageMakerAppsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/sageMakerApps",
    }),
  );
export type SageMakerAppsListByResourceGroupInput =
  typeof SageMakerAppsListByResourceGroupInput.Type;

// Output Schema
export const SageMakerAppsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type SageMakerAppsListByResourceGroupOutput =
  typeof SageMakerAppsListByResourceGroupOutput.Type;

// The operation
/**
 * List SageMakerApp resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const SageMakerAppsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SageMakerAppsListByResourceGroupInput,
    outputSchema: SageMakerAppsListByResourceGroupOutput,
  }));
// Input Schema
export const SageMakerAppsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/sageMakerApps",
    }),
  );
export type SageMakerAppsListBySubscriptionInput =
  typeof SageMakerAppsListBySubscriptionInput.Type;

// Output Schema
export const SageMakerAppsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type SageMakerAppsListBySubscriptionOutput =
  typeof SageMakerAppsListBySubscriptionOutput.Type;

// The operation
/**
 * List SageMakerApp resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const SageMakerAppsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SageMakerAppsListBySubscriptionInput,
    outputSchema: SageMakerAppsListBySubscriptionOutput,
  }));
// Input Schema
export const SageMakerAppsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/sageMakerApps/{name}",
    }),
  );
export type SageMakerAppsUpdateInput = typeof SageMakerAppsUpdateInput.Type;

// Output Schema
export const SageMakerAppsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SageMakerAppsUpdateOutput = typeof SageMakerAppsUpdateOutput.Type;

// The operation
/**
 * Update a SageMakerApp
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of SageMakerApp
 */
export const SageMakerAppsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SageMakerAppsUpdateInput,
  outputSchema: SageMakerAppsUpdateOutput,
}));
// Input Schema
export const SageMakerNotebookInstanceSummariesCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/sageMakerNotebookInstanceSummaries/{name}",
    }),
  );
export type SageMakerNotebookInstanceSummariesCreateOrReplaceInput =
  typeof SageMakerNotebookInstanceSummariesCreateOrReplaceInput.Type;

// Output Schema
export const SageMakerNotebookInstanceSummariesCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SageMakerNotebookInstanceSummariesCreateOrReplaceOutput =
  typeof SageMakerNotebookInstanceSummariesCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a SageMakerNotebookInstanceSummary. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of SageMakerNotebookInstanceSummary
 */
export const SageMakerNotebookInstanceSummariesCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SageMakerNotebookInstanceSummariesCreateOrReplaceInput,
    outputSchema: SageMakerNotebookInstanceSummariesCreateOrReplaceOutput,
  }));
// Input Schema
export const SageMakerNotebookInstanceSummariesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/sageMakerNotebookInstanceSummaries/{name}",
    }),
  );
export type SageMakerNotebookInstanceSummariesDeleteInput =
  typeof SageMakerNotebookInstanceSummariesDeleteInput.Type;

// Output Schema
export const SageMakerNotebookInstanceSummariesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SageMakerNotebookInstanceSummariesDeleteOutput =
  typeof SageMakerNotebookInstanceSummariesDeleteOutput.Type;

// The operation
/**
 * Delete a SageMakerNotebookInstanceSummary
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of SageMakerNotebookInstanceSummary
 */
export const SageMakerNotebookInstanceSummariesDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SageMakerNotebookInstanceSummariesDeleteInput,
    outputSchema: SageMakerNotebookInstanceSummariesDeleteOutput,
  }));
// Input Schema
export const SageMakerNotebookInstanceSummariesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/sageMakerNotebookInstanceSummaries/{name}",
    }),
  );
export type SageMakerNotebookInstanceSummariesGetInput =
  typeof SageMakerNotebookInstanceSummariesGetInput.Type;

// Output Schema
export const SageMakerNotebookInstanceSummariesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SageMakerNotebookInstanceSummariesGetOutput =
  typeof SageMakerNotebookInstanceSummariesGetOutput.Type;

// The operation
/**
 * Get a SageMakerNotebookInstanceSummary
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of SageMakerNotebookInstanceSummary
 */
export const SageMakerNotebookInstanceSummariesGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SageMakerNotebookInstanceSummariesGetInput,
    outputSchema: SageMakerNotebookInstanceSummariesGetOutput,
  }));
// Input Schema
export const SageMakerNotebookInstanceSummariesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/sageMakerNotebookInstanceSummaries",
    }),
  );
export type SageMakerNotebookInstanceSummariesListByResourceGroupInput =
  typeof SageMakerNotebookInstanceSummariesListByResourceGroupInput.Type;

// Output Schema
export const SageMakerNotebookInstanceSummariesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type SageMakerNotebookInstanceSummariesListByResourceGroupOutput =
  typeof SageMakerNotebookInstanceSummariesListByResourceGroupOutput.Type;

// The operation
/**
 * List SageMakerNotebookInstanceSummary resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const SageMakerNotebookInstanceSummariesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SageMakerNotebookInstanceSummariesListByResourceGroupInput,
    outputSchema: SageMakerNotebookInstanceSummariesListByResourceGroupOutput,
  }));
// Input Schema
export const SageMakerNotebookInstanceSummariesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/sageMakerNotebookInstanceSummaries",
    }),
  );
export type SageMakerNotebookInstanceSummariesListBySubscriptionInput =
  typeof SageMakerNotebookInstanceSummariesListBySubscriptionInput.Type;

// Output Schema
export const SageMakerNotebookInstanceSummariesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type SageMakerNotebookInstanceSummariesListBySubscriptionOutput =
  typeof SageMakerNotebookInstanceSummariesListBySubscriptionOutput.Type;

// The operation
/**
 * List SageMakerNotebookInstanceSummary resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const SageMakerNotebookInstanceSummariesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SageMakerNotebookInstanceSummariesListBySubscriptionInput,
    outputSchema: SageMakerNotebookInstanceSummariesListBySubscriptionOutput,
  }));
// Input Schema
export const SageMakerNotebookInstanceSummariesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/sageMakerNotebookInstanceSummaries/{name}",
    }),
  );
export type SageMakerNotebookInstanceSummariesUpdateInput =
  typeof SageMakerNotebookInstanceSummariesUpdateInput.Type;

// Output Schema
export const SageMakerNotebookInstanceSummariesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SageMakerNotebookInstanceSummariesUpdateOutput =
  typeof SageMakerNotebookInstanceSummariesUpdateOutput.Type;

// The operation
/**
 * Update a SageMakerNotebookInstanceSummary
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of SageMakerNotebookInstanceSummary
 */
export const SageMakerNotebookInstanceSummariesUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SageMakerNotebookInstanceSummariesUpdateInput,
    outputSchema: SageMakerNotebookInstanceSummariesUpdateOutput,
  }));
// Input Schema
export const SecretsManagerResourcePoliciesCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/secretsManagerResourcePolicies/{name}",
    }),
  );
export type SecretsManagerResourcePoliciesCreateOrReplaceInput =
  typeof SecretsManagerResourcePoliciesCreateOrReplaceInput.Type;

// Output Schema
export const SecretsManagerResourcePoliciesCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SecretsManagerResourcePoliciesCreateOrReplaceOutput =
  typeof SecretsManagerResourcePoliciesCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a SecretsManagerResourcePolicy. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of SecretsManagerResourcePolicy
 */
export const SecretsManagerResourcePoliciesCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SecretsManagerResourcePoliciesCreateOrReplaceInput,
    outputSchema: SecretsManagerResourcePoliciesCreateOrReplaceOutput,
  }));
// Input Schema
export const SecretsManagerResourcePoliciesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/secretsManagerResourcePolicies/{name}",
    }),
  );
export type SecretsManagerResourcePoliciesDeleteInput =
  typeof SecretsManagerResourcePoliciesDeleteInput.Type;

// Output Schema
export const SecretsManagerResourcePoliciesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SecretsManagerResourcePoliciesDeleteOutput =
  typeof SecretsManagerResourcePoliciesDeleteOutput.Type;

// The operation
/**
 * Delete a SecretsManagerResourcePolicy
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of SecretsManagerResourcePolicy
 */
export const SecretsManagerResourcePoliciesDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SecretsManagerResourcePoliciesDeleteInput,
    outputSchema: SecretsManagerResourcePoliciesDeleteOutput,
  }));
// Input Schema
export const SecretsManagerResourcePoliciesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/secretsManagerResourcePolicies/{name}",
    }),
  );
export type SecretsManagerResourcePoliciesGetInput =
  typeof SecretsManagerResourcePoliciesGetInput.Type;

// Output Schema
export const SecretsManagerResourcePoliciesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SecretsManagerResourcePoliciesGetOutput =
  typeof SecretsManagerResourcePoliciesGetOutput.Type;

// The operation
/**
 * Get a SecretsManagerResourcePolicy
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of SecretsManagerResourcePolicy
 */
export const SecretsManagerResourcePoliciesGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SecretsManagerResourcePoliciesGetInput,
    outputSchema: SecretsManagerResourcePoliciesGetOutput,
  }));
// Input Schema
export const SecretsManagerResourcePoliciesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/secretsManagerResourcePolicies",
    }),
  );
export type SecretsManagerResourcePoliciesListByResourceGroupInput =
  typeof SecretsManagerResourcePoliciesListByResourceGroupInput.Type;

// Output Schema
export const SecretsManagerResourcePoliciesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type SecretsManagerResourcePoliciesListByResourceGroupOutput =
  typeof SecretsManagerResourcePoliciesListByResourceGroupOutput.Type;

// The operation
/**
 * List SecretsManagerResourcePolicy resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const SecretsManagerResourcePoliciesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SecretsManagerResourcePoliciesListByResourceGroupInput,
    outputSchema: SecretsManagerResourcePoliciesListByResourceGroupOutput,
  }));
// Input Schema
export const SecretsManagerResourcePoliciesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/secretsManagerResourcePolicies",
    }),
  );
export type SecretsManagerResourcePoliciesListBySubscriptionInput =
  typeof SecretsManagerResourcePoliciesListBySubscriptionInput.Type;

// Output Schema
export const SecretsManagerResourcePoliciesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type SecretsManagerResourcePoliciesListBySubscriptionOutput =
  typeof SecretsManagerResourcePoliciesListBySubscriptionOutput.Type;

// The operation
/**
 * List SecretsManagerResourcePolicy resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const SecretsManagerResourcePoliciesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SecretsManagerResourcePoliciesListBySubscriptionInput,
    outputSchema: SecretsManagerResourcePoliciesListBySubscriptionOutput,
  }));
// Input Schema
export const SecretsManagerResourcePoliciesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/secretsManagerResourcePolicies/{name}",
    }),
  );
export type SecretsManagerResourcePoliciesUpdateInput =
  typeof SecretsManagerResourcePoliciesUpdateInput.Type;

// Output Schema
export const SecretsManagerResourcePoliciesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SecretsManagerResourcePoliciesUpdateOutput =
  typeof SecretsManagerResourcePoliciesUpdateOutput.Type;

// The operation
/**
 * Update a SecretsManagerResourcePolicy
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of SecretsManagerResourcePolicy
 */
export const SecretsManagerResourcePoliciesUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SecretsManagerResourcePoliciesUpdateInput,
    outputSchema: SecretsManagerResourcePoliciesUpdateOutput,
  }));
// Input Schema
export const SecretsManagerSecretsCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/secretsManagerSecrets/{name}",
    }),
  );
export type SecretsManagerSecretsCreateOrReplaceInput =
  typeof SecretsManagerSecretsCreateOrReplaceInput.Type;

// Output Schema
export const SecretsManagerSecretsCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SecretsManagerSecretsCreateOrReplaceOutput =
  typeof SecretsManagerSecretsCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a SecretsManagerSecret. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of SecretsManagerSecret
 */
export const SecretsManagerSecretsCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SecretsManagerSecretsCreateOrReplaceInput,
    outputSchema: SecretsManagerSecretsCreateOrReplaceOutput,
  }));
// Input Schema
export const SecretsManagerSecretsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/secretsManagerSecrets/{name}",
    }),
  );
export type SecretsManagerSecretsDeleteInput =
  typeof SecretsManagerSecretsDeleteInput.Type;

// Output Schema
export const SecretsManagerSecretsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SecretsManagerSecretsDeleteOutput =
  typeof SecretsManagerSecretsDeleteOutput.Type;

// The operation
/**
 * Delete a SecretsManagerSecret
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of SecretsManagerSecret
 */
export const SecretsManagerSecretsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SecretsManagerSecretsDeleteInput,
    outputSchema: SecretsManagerSecretsDeleteOutput,
  }),
);
// Input Schema
export const SecretsManagerSecretsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/secretsManagerSecrets/{name}",
    }),
  );
export type SecretsManagerSecretsGetInput =
  typeof SecretsManagerSecretsGetInput.Type;

// Output Schema
export const SecretsManagerSecretsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SecretsManagerSecretsGetOutput =
  typeof SecretsManagerSecretsGetOutput.Type;

// The operation
/**
 * Get a SecretsManagerSecret
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of SecretsManagerSecret
 */
export const SecretsManagerSecretsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SecretsManagerSecretsGetInput,
    outputSchema: SecretsManagerSecretsGetOutput,
  }),
);
// Input Schema
export const SecretsManagerSecretsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/secretsManagerSecrets",
    }),
  );
export type SecretsManagerSecretsListByResourceGroupInput =
  typeof SecretsManagerSecretsListByResourceGroupInput.Type;

// Output Schema
export const SecretsManagerSecretsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type SecretsManagerSecretsListByResourceGroupOutput =
  typeof SecretsManagerSecretsListByResourceGroupOutput.Type;

// The operation
/**
 * List SecretsManagerSecret resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const SecretsManagerSecretsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SecretsManagerSecretsListByResourceGroupInput,
    outputSchema: SecretsManagerSecretsListByResourceGroupOutput,
  }));
// Input Schema
export const SecretsManagerSecretsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/secretsManagerSecrets",
    }),
  );
export type SecretsManagerSecretsListBySubscriptionInput =
  typeof SecretsManagerSecretsListBySubscriptionInput.Type;

// Output Schema
export const SecretsManagerSecretsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type SecretsManagerSecretsListBySubscriptionOutput =
  typeof SecretsManagerSecretsListBySubscriptionOutput.Type;

// The operation
/**
 * List SecretsManagerSecret resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const SecretsManagerSecretsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SecretsManagerSecretsListBySubscriptionInput,
    outputSchema: SecretsManagerSecretsListBySubscriptionOutput,
  }));
// Input Schema
export const SecretsManagerSecretsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/secretsManagerSecrets/{name}",
    }),
  );
export type SecretsManagerSecretsUpdateInput =
  typeof SecretsManagerSecretsUpdateInput.Type;

// Output Schema
export const SecretsManagerSecretsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SecretsManagerSecretsUpdateOutput =
  typeof SecretsManagerSecretsUpdateOutput.Type;

// The operation
/**
 * Update a SecretsManagerSecret
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of SecretsManagerSecret
 */
export const SecretsManagerSecretsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SecretsManagerSecretsUpdateInput,
    outputSchema: SecretsManagerSecretsUpdateOutput,
  }),
);
// Input Schema
export const SnsSubscriptionsCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/snsSubscriptions/{name}",
    }),
  );
export type SnsSubscriptionsCreateOrReplaceInput =
  typeof SnsSubscriptionsCreateOrReplaceInput.Type;

// Output Schema
export const SnsSubscriptionsCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SnsSubscriptionsCreateOrReplaceOutput =
  typeof SnsSubscriptionsCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a SnsSubscription. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of SnsSubscription
 */
export const SnsSubscriptionsCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SnsSubscriptionsCreateOrReplaceInput,
    outputSchema: SnsSubscriptionsCreateOrReplaceOutput,
  }));
// Input Schema
export const SnsSubscriptionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/snsSubscriptions/{name}",
    }),
  );
export type SnsSubscriptionsDeleteInput =
  typeof SnsSubscriptionsDeleteInput.Type;

// Output Schema
export const SnsSubscriptionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SnsSubscriptionsDeleteOutput =
  typeof SnsSubscriptionsDeleteOutput.Type;

// The operation
/**
 * Delete a SnsSubscription
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of SnsSubscription
 */
export const SnsSubscriptionsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SnsSubscriptionsDeleteInput,
    outputSchema: SnsSubscriptionsDeleteOutput,
  }),
);
// Input Schema
export const SnsSubscriptionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/snsSubscriptions/{name}",
    }),
  );
export type SnsSubscriptionsGetInput = typeof SnsSubscriptionsGetInput.Type;

// Output Schema
export const SnsSubscriptionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SnsSubscriptionsGetOutput = typeof SnsSubscriptionsGetOutput.Type;

// The operation
/**
 * Get a SnsSubscription
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of SnsSubscription
 */
export const SnsSubscriptionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SnsSubscriptionsGetInput,
  outputSchema: SnsSubscriptionsGetOutput,
}));
// Input Schema
export const SnsSubscriptionsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/snsSubscriptions",
    }),
  );
export type SnsSubscriptionsListByResourceGroupInput =
  typeof SnsSubscriptionsListByResourceGroupInput.Type;

// Output Schema
export const SnsSubscriptionsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type SnsSubscriptionsListByResourceGroupOutput =
  typeof SnsSubscriptionsListByResourceGroupOutput.Type;

// The operation
/**
 * List SnsSubscription resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const SnsSubscriptionsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SnsSubscriptionsListByResourceGroupInput,
    outputSchema: SnsSubscriptionsListByResourceGroupOutput,
  }));
// Input Schema
export const SnsSubscriptionsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/snsSubscriptions",
    }),
  );
export type SnsSubscriptionsListBySubscriptionInput =
  typeof SnsSubscriptionsListBySubscriptionInput.Type;

// Output Schema
export const SnsSubscriptionsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type SnsSubscriptionsListBySubscriptionOutput =
  typeof SnsSubscriptionsListBySubscriptionOutput.Type;

// The operation
/**
 * List SnsSubscription resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const SnsSubscriptionsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SnsSubscriptionsListBySubscriptionInput,
    outputSchema: SnsSubscriptionsListBySubscriptionOutput,
  }));
// Input Schema
export const SnsSubscriptionsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/snsSubscriptions/{name}",
    }),
  );
export type SnsSubscriptionsUpdateInput =
  typeof SnsSubscriptionsUpdateInput.Type;

// Output Schema
export const SnsSubscriptionsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SnsSubscriptionsUpdateOutput =
  typeof SnsSubscriptionsUpdateOutput.Type;

// The operation
/**
 * Update a SnsSubscription
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of SnsSubscription
 */
export const SnsSubscriptionsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SnsSubscriptionsUpdateInput,
    outputSchema: SnsSubscriptionsUpdateOutput,
  }),
);
// Input Schema
export const SnsTopicsCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/snsTopics/{name}",
    }),
  );
export type SnsTopicsCreateOrReplaceInput =
  typeof SnsTopicsCreateOrReplaceInput.Type;

// Output Schema
export const SnsTopicsCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SnsTopicsCreateOrReplaceOutput =
  typeof SnsTopicsCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a SnsTopic. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of SnsTopic
 */
export const SnsTopicsCreateOrReplace = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SnsTopicsCreateOrReplaceInput,
    outputSchema: SnsTopicsCreateOrReplaceOutput,
  }),
);
// Input Schema
export const SnsTopicsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  name: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/snsTopics/{name}",
  }),
);
export type SnsTopicsDeleteInput = typeof SnsTopicsDeleteInput.Type;

// Output Schema
export const SnsTopicsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SnsTopicsDeleteOutput = typeof SnsTopicsDeleteOutput.Type;

// The operation
/**
 * Delete a SnsTopic
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of SnsTopic
 */
export const SnsTopicsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SnsTopicsDeleteInput,
  outputSchema: SnsTopicsDeleteOutput,
}));
// Input Schema
export const SnsTopicsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  name: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/snsTopics/{name}",
  }),
);
export type SnsTopicsGetInput = typeof SnsTopicsGetInput.Type;

// Output Schema
export const SnsTopicsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type SnsTopicsGetOutput = typeof SnsTopicsGetOutput.Type;

// The operation
/**
 * Get a SnsTopic
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of SnsTopic
 */
export const SnsTopicsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SnsTopicsGetInput,
  outputSchema: SnsTopicsGetOutput,
}));
// Input Schema
export const SnsTopicsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/snsTopics",
    }),
  );
export type SnsTopicsListByResourceGroupInput =
  typeof SnsTopicsListByResourceGroupInput.Type;

// Output Schema
export const SnsTopicsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type SnsTopicsListByResourceGroupOutput =
  typeof SnsTopicsListByResourceGroupOutput.Type;

// The operation
/**
 * List SnsTopic resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const SnsTopicsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SnsTopicsListByResourceGroupInput,
    outputSchema: SnsTopicsListByResourceGroupOutput,
  }));
// Input Schema
export const SnsTopicsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/snsTopics",
    }),
  );
export type SnsTopicsListBySubscriptionInput =
  typeof SnsTopicsListBySubscriptionInput.Type;

// Output Schema
export const SnsTopicsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type SnsTopicsListBySubscriptionOutput =
  typeof SnsTopicsListBySubscriptionOutput.Type;

// The operation
/**
 * List SnsTopic resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const SnsTopicsListBySubscription = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SnsTopicsListBySubscriptionInput,
    outputSchema: SnsTopicsListBySubscriptionOutput,
  }),
);
// Input Schema
export const SnsTopicsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  name: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/snsTopics/{name}",
  }),
);
export type SnsTopicsUpdateInput = typeof SnsTopicsUpdateInput.Type;

// Output Schema
export const SnsTopicsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type SnsTopicsUpdateOutput = typeof SnsTopicsUpdateOutput.Type;

// The operation
/**
 * Update a SnsTopic
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of SnsTopic
 */
export const SnsTopicsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SnsTopicsUpdateInput,
  outputSchema: SnsTopicsUpdateOutput,
}));
// Input Schema
export const SqsQueuesCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/sqsQueues/{name}",
    }),
  );
export type SqsQueuesCreateOrReplaceInput =
  typeof SqsQueuesCreateOrReplaceInput.Type;

// Output Schema
export const SqsQueuesCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SqsQueuesCreateOrReplaceOutput =
  typeof SqsQueuesCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a SqsQueue. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of SqsQueue
 */
export const SqsQueuesCreateOrReplace = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SqsQueuesCreateOrReplaceInput,
    outputSchema: SqsQueuesCreateOrReplaceOutput,
  }),
);
// Input Schema
export const SqsQueuesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  name: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/sqsQueues/{name}",
  }),
);
export type SqsQueuesDeleteInput = typeof SqsQueuesDeleteInput.Type;

// Output Schema
export const SqsQueuesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SqsQueuesDeleteOutput = typeof SqsQueuesDeleteOutput.Type;

// The operation
/**
 * Delete a SqsQueue
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of SqsQueue
 */
export const SqsQueuesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SqsQueuesDeleteInput,
  outputSchema: SqsQueuesDeleteOutput,
}));
// Input Schema
export const SqsQueuesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  name: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/sqsQueues/{name}",
  }),
);
export type SqsQueuesGetInput = typeof SqsQueuesGetInput.Type;

// Output Schema
export const SqsQueuesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type SqsQueuesGetOutput = typeof SqsQueuesGetOutput.Type;

// The operation
/**
 * Get a SqsQueue
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of SqsQueue
 */
export const SqsQueuesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SqsQueuesGetInput,
  outputSchema: SqsQueuesGetOutput,
}));
// Input Schema
export const SqsQueuesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/sqsQueues",
    }),
  );
export type SqsQueuesListByResourceGroupInput =
  typeof SqsQueuesListByResourceGroupInput.Type;

// Output Schema
export const SqsQueuesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type SqsQueuesListByResourceGroupOutput =
  typeof SqsQueuesListByResourceGroupOutput.Type;

// The operation
/**
 * List SqsQueue resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const SqsQueuesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqsQueuesListByResourceGroupInput,
    outputSchema: SqsQueuesListByResourceGroupOutput,
  }));
// Input Schema
export const SqsQueuesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/sqsQueues",
    }),
  );
export type SqsQueuesListBySubscriptionInput =
  typeof SqsQueuesListBySubscriptionInput.Type;

// Output Schema
export const SqsQueuesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type SqsQueuesListBySubscriptionOutput =
  typeof SqsQueuesListBySubscriptionOutput.Type;

// The operation
/**
 * List SqsQueue resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const SqsQueuesListBySubscription = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SqsQueuesListBySubscriptionInput,
    outputSchema: SqsQueuesListBySubscriptionOutput,
  }),
);
// Input Schema
export const SqsQueuesUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  name: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/sqsQueues/{name}",
  }),
);
export type SqsQueuesUpdateInput = typeof SqsQueuesUpdateInput.Type;

// Output Schema
export const SqsQueuesUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type SqsQueuesUpdateOutput = typeof SqsQueuesUpdateOutput.Type;

// The operation
/**
 * Update a SqsQueue
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of SqsQueue
 */
export const SqsQueuesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SqsQueuesUpdateInput,
  outputSchema: SqsQueuesUpdateOutput,
}));
// Input Schema
export const SsmInstanceInformationsCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ssmInstanceInformations/{name}",
    }),
  );
export type SsmInstanceInformationsCreateOrReplaceInput =
  typeof SsmInstanceInformationsCreateOrReplaceInput.Type;

// Output Schema
export const SsmInstanceInformationsCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SsmInstanceInformationsCreateOrReplaceOutput =
  typeof SsmInstanceInformationsCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a SsmInstanceInformation. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of SsmInstanceInformation
 */
export const SsmInstanceInformationsCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SsmInstanceInformationsCreateOrReplaceInput,
    outputSchema: SsmInstanceInformationsCreateOrReplaceOutput,
  }));
// Input Schema
export const SsmInstanceInformationsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ssmInstanceInformations/{name}",
    }),
  );
export type SsmInstanceInformationsDeleteInput =
  typeof SsmInstanceInformationsDeleteInput.Type;

// Output Schema
export const SsmInstanceInformationsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SsmInstanceInformationsDeleteOutput =
  typeof SsmInstanceInformationsDeleteOutput.Type;

// The operation
/**
 * Delete a SsmInstanceInformation
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of SsmInstanceInformation
 */
export const SsmInstanceInformationsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SsmInstanceInformationsDeleteInput,
    outputSchema: SsmInstanceInformationsDeleteOutput,
  }));
// Input Schema
export const SsmInstanceInformationsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ssmInstanceInformations/{name}",
    }),
  );
export type SsmInstanceInformationsGetInput =
  typeof SsmInstanceInformationsGetInput.Type;

// Output Schema
export const SsmInstanceInformationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SsmInstanceInformationsGetOutput =
  typeof SsmInstanceInformationsGetOutput.Type;

// The operation
/**
 * Get a SsmInstanceInformation
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of SsmInstanceInformation
 */
export const SsmInstanceInformationsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SsmInstanceInformationsGetInput,
    outputSchema: SsmInstanceInformationsGetOutput,
  }),
);
// Input Schema
export const SsmInstanceInformationsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ssmInstanceInformations",
    }),
  );
export type SsmInstanceInformationsListByResourceGroupInput =
  typeof SsmInstanceInformationsListByResourceGroupInput.Type;

// Output Schema
export const SsmInstanceInformationsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type SsmInstanceInformationsListByResourceGroupOutput =
  typeof SsmInstanceInformationsListByResourceGroupOutput.Type;

// The operation
/**
 * List SsmInstanceInformation resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const SsmInstanceInformationsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SsmInstanceInformationsListByResourceGroupInput,
    outputSchema: SsmInstanceInformationsListByResourceGroupOutput,
  }));
// Input Schema
export const SsmInstanceInformationsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/ssmInstanceInformations",
    }),
  );
export type SsmInstanceInformationsListBySubscriptionInput =
  typeof SsmInstanceInformationsListBySubscriptionInput.Type;

// Output Schema
export const SsmInstanceInformationsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type SsmInstanceInformationsListBySubscriptionOutput =
  typeof SsmInstanceInformationsListBySubscriptionOutput.Type;

// The operation
/**
 * List SsmInstanceInformation resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const SsmInstanceInformationsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SsmInstanceInformationsListBySubscriptionInput,
    outputSchema: SsmInstanceInformationsListBySubscriptionOutput,
  }));
// Input Schema
export const SsmInstanceInformationsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ssmInstanceInformations/{name}",
    }),
  );
export type SsmInstanceInformationsUpdateInput =
  typeof SsmInstanceInformationsUpdateInput.Type;

// Output Schema
export const SsmInstanceInformationsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SsmInstanceInformationsUpdateOutput =
  typeof SsmInstanceInformationsUpdateOutput.Type;

// The operation
/**
 * Update a SsmInstanceInformation
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of SsmInstanceInformation
 */
export const SsmInstanceInformationsUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SsmInstanceInformationsUpdateInput,
    outputSchema: SsmInstanceInformationsUpdateOutput,
  }));
// Input Schema
export const SsmParametersCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ssmParameters/{name}",
    }),
  );
export type SsmParametersCreateOrReplaceInput =
  typeof SsmParametersCreateOrReplaceInput.Type;

// Output Schema
export const SsmParametersCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SsmParametersCreateOrReplaceOutput =
  typeof SsmParametersCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a SsmParameter. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of SsmParameter
 */
export const SsmParametersCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SsmParametersCreateOrReplaceInput,
    outputSchema: SsmParametersCreateOrReplaceOutput,
  }));
// Input Schema
export const SsmParametersDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ssmParameters/{name}",
    }),
  );
export type SsmParametersDeleteInput = typeof SsmParametersDeleteInput.Type;

// Output Schema
export const SsmParametersDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SsmParametersDeleteOutput = typeof SsmParametersDeleteOutput.Type;

// The operation
/**
 * Delete a SsmParameter
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of SsmParameter
 */
export const SsmParametersDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SsmParametersDeleteInput,
  outputSchema: SsmParametersDeleteOutput,
}));
// Input Schema
export const SsmParametersGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  name: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ssmParameters/{name}",
  }),
);
export type SsmParametersGetInput = typeof SsmParametersGetInput.Type;

// Output Schema
export const SsmParametersGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  },
);
export type SsmParametersGetOutput = typeof SsmParametersGetOutput.Type;

// The operation
/**
 * Get a SsmParameter
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of SsmParameter
 */
export const SsmParametersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SsmParametersGetInput,
  outputSchema: SsmParametersGetOutput,
}));
// Input Schema
export const SsmParametersListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ssmParameters",
    }),
  );
export type SsmParametersListByResourceGroupInput =
  typeof SsmParametersListByResourceGroupInput.Type;

// Output Schema
export const SsmParametersListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type SsmParametersListByResourceGroupOutput =
  typeof SsmParametersListByResourceGroupOutput.Type;

// The operation
/**
 * List SsmParameter resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const SsmParametersListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SsmParametersListByResourceGroupInput,
    outputSchema: SsmParametersListByResourceGroupOutput,
  }));
// Input Schema
export const SsmParametersListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/ssmParameters",
    }),
  );
export type SsmParametersListBySubscriptionInput =
  typeof SsmParametersListBySubscriptionInput.Type;

// Output Schema
export const SsmParametersListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type SsmParametersListBySubscriptionOutput =
  typeof SsmParametersListBySubscriptionOutput.Type;

// The operation
/**
 * List SsmParameter resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const SsmParametersListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SsmParametersListBySubscriptionInput,
    outputSchema: SsmParametersListBySubscriptionOutput,
  }));
// Input Schema
export const SsmParametersUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ssmParameters/{name}",
    }),
  );
export type SsmParametersUpdateInput = typeof SsmParametersUpdateInput.Type;

// Output Schema
export const SsmParametersUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SsmParametersUpdateOutput = typeof SsmParametersUpdateOutput.Type;

// The operation
/**
 * Update a SsmParameter
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of SsmParameter
 */
export const SsmParametersUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SsmParametersUpdateInput,
  outputSchema: SsmParametersUpdateOutput,
}));
// Input Schema
export const SsmResourceComplianceSummaryItemsCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ssmResourceComplianceSummaryItems/{name}",
    }),
  );
export type SsmResourceComplianceSummaryItemsCreateOrReplaceInput =
  typeof SsmResourceComplianceSummaryItemsCreateOrReplaceInput.Type;

// Output Schema
export const SsmResourceComplianceSummaryItemsCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SsmResourceComplianceSummaryItemsCreateOrReplaceOutput =
  typeof SsmResourceComplianceSummaryItemsCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a SsmResourceComplianceSummaryItem. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of SsmResourceComplianceSummaryItem
 */
export const SsmResourceComplianceSummaryItemsCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SsmResourceComplianceSummaryItemsCreateOrReplaceInput,
    outputSchema: SsmResourceComplianceSummaryItemsCreateOrReplaceOutput,
  }));
// Input Schema
export const SsmResourceComplianceSummaryItemsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ssmResourceComplianceSummaryItems/{name}",
    }),
  );
export type SsmResourceComplianceSummaryItemsDeleteInput =
  typeof SsmResourceComplianceSummaryItemsDeleteInput.Type;

// Output Schema
export const SsmResourceComplianceSummaryItemsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SsmResourceComplianceSummaryItemsDeleteOutput =
  typeof SsmResourceComplianceSummaryItemsDeleteOutput.Type;

// The operation
/**
 * Delete a SsmResourceComplianceSummaryItem
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of SsmResourceComplianceSummaryItem
 */
export const SsmResourceComplianceSummaryItemsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SsmResourceComplianceSummaryItemsDeleteInput,
    outputSchema: SsmResourceComplianceSummaryItemsDeleteOutput,
  }));
// Input Schema
export const SsmResourceComplianceSummaryItemsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ssmResourceComplianceSummaryItems/{name}",
    }),
  );
export type SsmResourceComplianceSummaryItemsGetInput =
  typeof SsmResourceComplianceSummaryItemsGetInput.Type;

// Output Schema
export const SsmResourceComplianceSummaryItemsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SsmResourceComplianceSummaryItemsGetOutput =
  typeof SsmResourceComplianceSummaryItemsGetOutput.Type;

// The operation
/**
 * Get a SsmResourceComplianceSummaryItem
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of SsmResourceComplianceSummaryItem
 */
export const SsmResourceComplianceSummaryItemsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SsmResourceComplianceSummaryItemsGetInput,
    outputSchema: SsmResourceComplianceSummaryItemsGetOutput,
  }));
// Input Schema
export const SsmResourceComplianceSummaryItemsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ssmResourceComplianceSummaryItems",
    }),
  );
export type SsmResourceComplianceSummaryItemsListByResourceGroupInput =
  typeof SsmResourceComplianceSummaryItemsListByResourceGroupInput.Type;

// Output Schema
export const SsmResourceComplianceSummaryItemsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type SsmResourceComplianceSummaryItemsListByResourceGroupOutput =
  typeof SsmResourceComplianceSummaryItemsListByResourceGroupOutput.Type;

// The operation
/**
 * List SsmResourceComplianceSummaryItem resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const SsmResourceComplianceSummaryItemsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SsmResourceComplianceSummaryItemsListByResourceGroupInput,
    outputSchema: SsmResourceComplianceSummaryItemsListByResourceGroupOutput,
  }));
// Input Schema
export const SsmResourceComplianceSummaryItemsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/ssmResourceComplianceSummaryItems",
    }),
  );
export type SsmResourceComplianceSummaryItemsListBySubscriptionInput =
  typeof SsmResourceComplianceSummaryItemsListBySubscriptionInput.Type;

// Output Schema
export const SsmResourceComplianceSummaryItemsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type SsmResourceComplianceSummaryItemsListBySubscriptionOutput =
  typeof SsmResourceComplianceSummaryItemsListBySubscriptionOutput.Type;

// The operation
/**
 * List SsmResourceComplianceSummaryItem resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const SsmResourceComplianceSummaryItemsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SsmResourceComplianceSummaryItemsListBySubscriptionInput,
    outputSchema: SsmResourceComplianceSummaryItemsListBySubscriptionOutput,
  }));
// Input Schema
export const SsmResourceComplianceSummaryItemsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/ssmResourceComplianceSummaryItems/{name}",
    }),
  );
export type SsmResourceComplianceSummaryItemsUpdateInput =
  typeof SsmResourceComplianceSummaryItemsUpdateInput.Type;

// Output Schema
export const SsmResourceComplianceSummaryItemsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SsmResourceComplianceSummaryItemsUpdateOutput =
  typeof SsmResourceComplianceSummaryItemsUpdateOutput.Type;

// The operation
/**
 * Update a SsmResourceComplianceSummaryItem
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of SsmResourceComplianceSummaryItem
 */
export const SsmResourceComplianceSummaryItemsUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SsmResourceComplianceSummaryItemsUpdateInput,
    outputSchema: SsmResourceComplianceSummaryItemsUpdateOutput,
  }));
// Input Schema
export const Wafv2LoggingConfigurationsCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/wafv2LoggingConfigurations/{name}",
    }),
  );
export type Wafv2LoggingConfigurationsCreateOrReplaceInput =
  typeof Wafv2LoggingConfigurationsCreateOrReplaceInput.Type;

// Output Schema
export const Wafv2LoggingConfigurationsCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type Wafv2LoggingConfigurationsCreateOrReplaceOutput =
  typeof Wafv2LoggingConfigurationsCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a Wafv2LoggingConfiguration. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Wafv2LoggingConfiguration
 */
export const Wafv2LoggingConfigurationsCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: Wafv2LoggingConfigurationsCreateOrReplaceInput,
    outputSchema: Wafv2LoggingConfigurationsCreateOrReplaceOutput,
  }));
// Input Schema
export const Wafv2LoggingConfigurationsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/wafv2LoggingConfigurations/{name}",
    }),
  );
export type Wafv2LoggingConfigurationsDeleteInput =
  typeof Wafv2LoggingConfigurationsDeleteInput.Type;

// Output Schema
export const Wafv2LoggingConfigurationsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type Wafv2LoggingConfigurationsDeleteOutput =
  typeof Wafv2LoggingConfigurationsDeleteOutput.Type;

// The operation
/**
 * Delete a Wafv2LoggingConfiguration
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Wafv2LoggingConfiguration
 */
export const Wafv2LoggingConfigurationsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: Wafv2LoggingConfigurationsDeleteInput,
    outputSchema: Wafv2LoggingConfigurationsDeleteOutput,
  }));
// Input Schema
export const Wafv2LoggingConfigurationsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/wafv2LoggingConfigurations/{name}",
    }),
  );
export type Wafv2LoggingConfigurationsGetInput =
  typeof Wafv2LoggingConfigurationsGetInput.Type;

// Output Schema
export const Wafv2LoggingConfigurationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type Wafv2LoggingConfigurationsGetOutput =
  typeof Wafv2LoggingConfigurationsGetOutput.Type;

// The operation
/**
 * Get a Wafv2LoggingConfiguration
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Wafv2LoggingConfiguration
 */
export const Wafv2LoggingConfigurationsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: Wafv2LoggingConfigurationsGetInput,
    outputSchema: Wafv2LoggingConfigurationsGetOutput,
  }));
// Input Schema
export const Wafv2LoggingConfigurationsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/wafv2LoggingConfigurations",
    }),
  );
export type Wafv2LoggingConfigurationsListByResourceGroupInput =
  typeof Wafv2LoggingConfigurationsListByResourceGroupInput.Type;

// Output Schema
export const Wafv2LoggingConfigurationsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type Wafv2LoggingConfigurationsListByResourceGroupOutput =
  typeof Wafv2LoggingConfigurationsListByResourceGroupOutput.Type;

// The operation
/**
 * List Wafv2LoggingConfiguration resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const Wafv2LoggingConfigurationsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: Wafv2LoggingConfigurationsListByResourceGroupInput,
    outputSchema: Wafv2LoggingConfigurationsListByResourceGroupOutput,
  }));
// Input Schema
export const Wafv2LoggingConfigurationsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/wafv2LoggingConfigurations",
    }),
  );
export type Wafv2LoggingConfigurationsListBySubscriptionInput =
  typeof Wafv2LoggingConfigurationsListBySubscriptionInput.Type;

// Output Schema
export const Wafv2LoggingConfigurationsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type Wafv2LoggingConfigurationsListBySubscriptionOutput =
  typeof Wafv2LoggingConfigurationsListBySubscriptionOutput.Type;

// The operation
/**
 * List Wafv2LoggingConfiguration resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const Wafv2LoggingConfigurationsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: Wafv2LoggingConfigurationsListBySubscriptionInput,
    outputSchema: Wafv2LoggingConfigurationsListBySubscriptionOutput,
  }));
// Input Schema
export const Wafv2LoggingConfigurationsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/wafv2LoggingConfigurations/{name}",
    }),
  );
export type Wafv2LoggingConfigurationsUpdateInput =
  typeof Wafv2LoggingConfigurationsUpdateInput.Type;

// Output Schema
export const Wafv2LoggingConfigurationsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type Wafv2LoggingConfigurationsUpdateOutput =
  typeof Wafv2LoggingConfigurationsUpdateOutput.Type;

// The operation
/**
 * Update a Wafv2LoggingConfiguration
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of Wafv2LoggingConfiguration
 */
export const Wafv2LoggingConfigurationsUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: Wafv2LoggingConfigurationsUpdateInput,
    outputSchema: Wafv2LoggingConfigurationsUpdateOutput,
  }));
// Input Schema
export const WafWebAclSummariesCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/wafWebACLSummaries/{name}",
    }),
  );
export type WafWebAclSummariesCreateOrReplaceInput =
  typeof WafWebAclSummariesCreateOrReplaceInput.Type;

// Output Schema
export const WafWebAclSummariesCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type WafWebAclSummariesCreateOrReplaceOutput =
  typeof WafWebAclSummariesCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a WafWebACLSummary. Please note that end user resource creation is currently restricted, but it will be enabled in the future.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of WafWebACLSummary
 */
export const WafWebAclSummariesCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WafWebAclSummariesCreateOrReplaceInput,
    outputSchema: WafWebAclSummariesCreateOrReplaceOutput,
  }));
// Input Schema
export const WafWebAclSummariesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/wafWebACLSummaries/{name}",
    }),
  );
export type WafWebAclSummariesDeleteInput =
  typeof WafWebAclSummariesDeleteInput.Type;

// Output Schema
export const WafWebAclSummariesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type WafWebAclSummariesDeleteOutput =
  typeof WafWebAclSummariesDeleteOutput.Type;

// The operation
/**
 * Delete a WafWebACLSummary
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of WafWebACLSummary
 */
export const WafWebAclSummariesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WafWebAclSummariesDeleteInput,
    outputSchema: WafWebAclSummariesDeleteOutput,
  }),
);
// Input Schema
export const WafWebAclSummariesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/wafWebACLSummaries/{name}",
    }),
  );
export type WafWebAclSummariesGetInput = typeof WafWebAclSummariesGetInput.Type;

// Output Schema
export const WafWebAclSummariesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type WafWebAclSummariesGetOutput =
  typeof WafWebAclSummariesGetOutput.Type;

// The operation
/**
 * Get a WafWebACLSummary
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of WafWebACLSummary
 */
export const WafWebAclSummariesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WafWebAclSummariesGetInput,
    outputSchema: WafWebAclSummariesGetOutput,
  }),
);
// Input Schema
export const WafWebAclSummariesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/wafWebACLSummaries",
    }),
  );
export type WafWebAclSummariesListByResourceGroupInput =
  typeof WafWebAclSummariesListByResourceGroupInput.Type;

// Output Schema
export const WafWebAclSummariesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type WafWebAclSummariesListByResourceGroupOutput =
  typeof WafWebAclSummariesListByResourceGroupOutput.Type;

// The operation
/**
 * List WafWebACLSummary resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const WafWebAclSummariesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WafWebAclSummariesListByResourceGroupInput,
    outputSchema: WafWebAclSummariesListByResourceGroupOutput,
  }));
// Input Schema
export const WafWebAclSummariesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.AwsConnector/wafWebACLSummaries",
    }),
  );
export type WafWebAclSummariesListBySubscriptionInput =
  typeof WafWebAclSummariesListBySubscriptionInput.Type;

// Output Schema
export const WafWebAclSummariesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type WafWebAclSummariesListBySubscriptionOutput =
  typeof WafWebAclSummariesListBySubscriptionOutput.Type;

// The operation
/**
 * List WafWebACLSummary resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const WafWebAclSummariesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WafWebAclSummariesListBySubscriptionInput,
    outputSchema: WafWebAclSummariesListBySubscriptionOutput,
  }));
// Input Schema
export const WafWebAclSummariesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AwsConnector/wafWebACLSummaries/{name}",
    }),
  );
export type WafWebAclSummariesUpdateInput =
  typeof WafWebAclSummariesUpdateInput.Type;

// Output Schema
export const WafWebAclSummariesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type WafWebAclSummariesUpdateOutput =
  typeof WafWebAclSummariesUpdateOutput.Type;

// The operation
/**
 * Update a WafWebACLSummary
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of WafWebACLSummary
 */
export const WafWebAclSummariesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WafWebAclSummariesUpdateInput,
    outputSchema: WafWebAclSummariesUpdateOutput,
  }),
);
