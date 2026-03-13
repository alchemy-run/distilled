/**
 * Azure Migrate API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const AksAssessmentOperationsCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    assessmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/aksAssessments/{assessmentName}",
    }),
  );
export type AksAssessmentOperationsCreateInput =
  typeof AksAssessmentOperationsCreateInput.Type;

// Output Schema
export const AksAssessmentOperationsCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type AksAssessmentOperationsCreateOutput =
  typeof AksAssessmentOperationsCreateOutput.Type;

// The operation
/**
 * Create a AKSAssessment
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 * @param assessmentName - AKS Assessment Name.
 */
export const AksAssessmentOperationsCreate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AksAssessmentOperationsCreateInput,
    outputSchema: AksAssessmentOperationsCreateOutput,
  }));
// Input Schema
export const AksAssessmentOperationsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    assessmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/aksAssessments/{assessmentName}",
    }),
  );
export type AksAssessmentOperationsDeleteInput =
  typeof AksAssessmentOperationsDeleteInput.Type;

// Output Schema
export const AksAssessmentOperationsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AksAssessmentOperationsDeleteOutput =
  typeof AksAssessmentOperationsDeleteOutput.Type;

// The operation
/**
 * Delete a AKSAssessment
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 * @param assessmentName - AKS Assessment Name.
 */
export const AksAssessmentOperationsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AksAssessmentOperationsDeleteInput,
    outputSchema: AksAssessmentOperationsDeleteOutput,
  }));
// Input Schema
export const AksAssessmentOperationsDownloadUrlInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    assessmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/aksAssessments/{assessmentName}/downloadUrl",
    }),
  );
export type AksAssessmentOperationsDownloadUrlInput =
  typeof AksAssessmentOperationsDownloadUrlInput.Type;

// Output Schema
export const AksAssessmentOperationsDownloadUrlOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    assessmentReportUrl: Schema.String,
    expirationTime: Schema.String,
  });
export type AksAssessmentOperationsDownloadUrlOutput =
  typeof AksAssessmentOperationsDownloadUrlOutput.Type;

// The operation
/**
 * Get URL for downloading AKS Assessment Report.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 * @param assessmentName - AKS Assessment Name.
 */
export const AksAssessmentOperationsDownloadUrl =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AksAssessmentOperationsDownloadUrlInput,
    outputSchema: AksAssessmentOperationsDownloadUrlOutput,
  }));
// Input Schema
export const AksAssessmentOperationsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    assessmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/aksAssessments/{assessmentName}",
    }),
  );
export type AksAssessmentOperationsGetInput =
  typeof AksAssessmentOperationsGetInput.Type;

// Output Schema
export const AksAssessmentOperationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type AksAssessmentOperationsGetOutput =
  typeof AksAssessmentOperationsGetOutput.Type;

// The operation
/**
 * Get a AKSAssessment
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 * @param assessmentName - AKS Assessment Name.
 */
export const AksAssessmentOperationsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AksAssessmentOperationsGetInput,
    outputSchema: AksAssessmentOperationsGetOutput,
  }),
);
// Input Schema
export const AksAssessmentOperationsListByAssessmentProjectInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    continuationToken: Schema.optional(Schema.String),
    $top: Schema.optional(Schema.Number),
    $filter: Schema.optional(Schema.String),
    totalRecordCount: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/aksAssessments",
    }),
  );
export type AksAssessmentOperationsListByAssessmentProjectInput =
  typeof AksAssessmentOperationsListByAssessmentProjectInput.Type;

// Output Schema
export const AksAssessmentOperationsListByAssessmentProjectOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type AksAssessmentOperationsListByAssessmentProjectOutput =
  typeof AksAssessmentOperationsListByAssessmentProjectOutput.Type;

// The operation
/**
 * List AKSAssessment resources by AssessmentProject
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param continuationToken - Continuation Token Query Parameter.
 * @param $top - Page Size Query Parameter.
 * @param $filter - Filter Query Parameter.
 * @param totalRecordCount - Total Record Count Query Parameter.
 * @param projectName - Assessment Project Name
 */
export const AksAssessmentOperationsListByAssessmentProject =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AksAssessmentOperationsListByAssessmentProjectInput,
    outputSchema: AksAssessmentOperationsListByAssessmentProjectOutput,
  }));
// Input Schema
export const AksClusterOperationsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    assessmentName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/aksAssessments/{assessmentName}/clusters/{clusterName}",
    }),
  );
export type AksClusterOperationsGetInput =
  typeof AksClusterOperationsGetInput.Type;

// Output Schema
export const AksClusterOperationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type AksClusterOperationsGetOutput =
  typeof AksClusterOperationsGetOutput.Type;

// The operation
/**
 * Get a AKSCluster
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 * @param assessmentName - AKS Assessment Name.
 * @param clusterName - AKS Cluster Name.
 */
export const AksClusterOperationsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AksClusterOperationsGetInput,
    outputSchema: AksClusterOperationsGetOutput,
  }),
);
// Input Schema
export const AksClusterOperationsListByAksAssessmentInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    assessmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $filter: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/aksAssessments/{assessmentName}/clusters",
    }),
  );
export type AksClusterOperationsListByAksAssessmentInput =
  typeof AksClusterOperationsListByAksAssessmentInput.Type;

// Output Schema
export const AksClusterOperationsListByAksAssessmentOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type AksClusterOperationsListByAksAssessmentOutput =
  typeof AksClusterOperationsListByAksAssessmentOutput.Type;

// The operation
/**
 * List AKSCluster resources by AKSAssessment
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param $filter - Filter Query Parameter.
 * @param projectName - Assessment Project Name
 * @param assessmentName - AKS Assessment Name.
 */
export const AksClusterOperationsListByAksAssessment =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AksClusterOperationsListByAksAssessmentInput,
    outputSchema: AksClusterOperationsListByAksAssessmentOutput,
  }));
// Input Schema
export const AksCostDetailOperationsListByAksAssessmentInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    assessmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $filter: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/aksAssessments/{assessmentName}/costDetails",
    }),
  );
export type AksCostDetailOperationsListByAksAssessmentInput =
  typeof AksCostDetailOperationsListByAksAssessmentInput.Type;

// Output Schema
export const AksCostDetailOperationsListByAksAssessmentOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type AksCostDetailOperationsListByAksAssessmentOutput =
  typeof AksCostDetailOperationsListByAksAssessmentOutput.Type;

// The operation
/**
 * List AKSCostDetail resources by AKSAssessment
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param $filter - Filter Query Parameter.
 * @param projectName - Assessment Project Name
 * @param assessmentName - AKS Assessment Name.
 */
export const AksCostDetailOperationsListByAksAssessment =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AksCostDetailOperationsListByAksAssessmentInput,
    outputSchema: AksCostDetailOperationsListByAksAssessmentOutput,
  }));
// Input Schema
export const AksOptionsOperationsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    assessmentOptionsName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/aksAssessmentOptions/{assessmentOptionsName}",
    }),
  );
export type AksOptionsOperationsGetInput =
  typeof AksOptionsOperationsGetInput.Type;

// Output Schema
export const AksOptionsOperationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type AksOptionsOperationsGetOutput =
  typeof AksOptionsOperationsGetOutput.Type;

// The operation
/**
 * Get a AKSAssessmentOptions
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 * @param assessmentOptionsName - AKS Assessment Options Name.
 */
export const AksOptionsOperationsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AksOptionsOperationsGetInput,
    outputSchema: AksOptionsOperationsGetOutput,
  }),
);
// Input Schema
export const AksOptionsOperationsListByAssessmentProjectInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/aksAssessmentOptions",
    }),
  );
export type AksOptionsOperationsListByAssessmentProjectInput =
  typeof AksOptionsOperationsListByAssessmentProjectInput.Type;

// Output Schema
export const AksOptionsOperationsListByAssessmentProjectOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type AksOptionsOperationsListByAssessmentProjectOutput =
  typeof AksOptionsOperationsListByAssessmentProjectOutput.Type;

// The operation
/**
 * List AKSAssessmentOptions resources by AssessmentProject
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 */
export const AksOptionsOperationsListByAssessmentProject =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AksOptionsOperationsListByAssessmentProjectInput,
    outputSchema: AksOptionsOperationsListByAssessmentProjectOutput,
  }));
// Input Schema
export const AksSummaryOperationsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    assessmentName: Schema.String.pipe(T.PathParam()),
    summaryName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/aksAssessments/{assessmentName}/summaries/{summaryName}",
    }),
  );
export type AksSummaryOperationsGetInput =
  typeof AksSummaryOperationsGetInput.Type;

// Output Schema
export const AksSummaryOperationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type AksSummaryOperationsGetOutput =
  typeof AksSummaryOperationsGetOutput.Type;

// The operation
/**
 * Get a AKSSummary
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 * @param assessmentName - AKS Assessment Name.
 * @param summaryName - AKS Assessment Summary Name.
 */
export const AksSummaryOperationsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AksSummaryOperationsGetInput,
    outputSchema: AksSummaryOperationsGetOutput,
  }),
);
// Input Schema
export const AksSummaryOperationsListByAksAssessmentInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    assessmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/aksAssessments/{assessmentName}/summaries",
    }),
  );
export type AksSummaryOperationsListByAksAssessmentInput =
  typeof AksSummaryOperationsListByAksAssessmentInput.Type;

// Output Schema
export const AksSummaryOperationsListByAksAssessmentOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type AksSummaryOperationsListByAksAssessmentOutput =
  typeof AksSummaryOperationsListByAksAssessmentOutput.Type;

// The operation
/**
 * List AKSSummary resources by AKSAssessment
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 * @param assessmentName - AKS Assessment Name.
 */
export const AksSummaryOperationsListByAksAssessment =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AksSummaryOperationsListByAksAssessmentInput,
    outputSchema: AksSummaryOperationsListByAksAssessmentOutput,
  }));
// Input Schema
export const AssessedMachinesOperationsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    groupName: Schema.String.pipe(T.PathParam()),
    assessmentName: Schema.String.pipe(T.PathParam()),
    assessedMachineName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/groups/{groupName}/assessments/{assessmentName}/assessedMachines/{assessedMachineName}",
    }),
  );
export type AssessedMachinesOperationsGetInput =
  typeof AssessedMachinesOperationsGetInput.Type;

// Output Schema
export const AssessedMachinesOperationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type AssessedMachinesOperationsGetOutput =
  typeof AssessedMachinesOperationsGetOutput.Type;

// The operation
/**
 * Get a AssessedMachine
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 * @param groupName - Group ARM name
 * @param assessmentName - Machine Assessment ARM name
 * @param assessedMachineName - Machine assessment Assessed Machine ARM name
 */
export const AssessedMachinesOperationsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AssessedMachinesOperationsGetInput,
    outputSchema: AssessedMachinesOperationsGetOutput,
  }));
// Input Schema
export const AssessedMachinesOperationsListByAssessmentInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    groupName: Schema.String.pipe(T.PathParam()),
    assessmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $filter: Schema.optional(Schema.String),
    pageSize: Schema.optional(Schema.Number),
    continuationToken: Schema.optional(Schema.String),
    totalRecordCount: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/groups/{groupName}/assessments/{assessmentName}/assessedMachines",
    }),
  );
export type AssessedMachinesOperationsListByAssessmentInput =
  typeof AssessedMachinesOperationsListByAssessmentInput.Type;

// Output Schema
export const AssessedMachinesOperationsListByAssessmentOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type AssessedMachinesOperationsListByAssessmentOutput =
  typeof AssessedMachinesOperationsListByAssessmentOutput.Type;

// The operation
/**
 * List AssessedMachine resources by Assessment
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param $filter - Filter query.
 * @param pageSize - Optional parameter for page size.
 * @param continuationToken - Optional parameter for continuation token.
 * @param totalRecordCount - Total record count.
 * @param projectName - Assessment Project Name
 * @param groupName - Group ARM name
 * @param assessmentName - Machine Assessment ARM name
 */
export const AssessedMachinesOperationsListByAssessment =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AssessedMachinesOperationsListByAssessmentInput,
    outputSchema: AssessedMachinesOperationsListByAssessmentOutput,
  }));
// Input Schema
export const AssessedSqlDatabaseV2OperationsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    groupName: Schema.String.pipe(T.PathParam()),
    assessmentName: Schema.String.pipe(T.PathParam()),
    assessedSqlDatabaseName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/groups/{groupName}/sqlAssessments/{assessmentName}/assessedSqlDatabases/{assessedSqlDatabaseName}",
    }),
  );
export type AssessedSqlDatabaseV2OperationsGetInput =
  typeof AssessedSqlDatabaseV2OperationsGetInput.Type;

// Output Schema
export const AssessedSqlDatabaseV2OperationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type AssessedSqlDatabaseV2OperationsGetOutput =
  typeof AssessedSqlDatabaseV2OperationsGetOutput.Type;

// The operation
/**
 * Get a AssessedSqlDatabaseV2
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 * @param groupName - Group ARM name
 * @param assessmentName - SQL Assessment arm name.
 * @param assessedSqlDatabaseName - Sql assessment Assessed Databases ARM name.
 */
export const AssessedSqlDatabaseV2OperationsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AssessedSqlDatabaseV2OperationsGetInput,
    outputSchema: AssessedSqlDatabaseV2OperationsGetOutput,
  }));
// Input Schema
export const AssessedSqlDatabaseV2OperationsListBySqlAssessmentV2Input =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    groupName: Schema.String.pipe(T.PathParam()),
    assessmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $filter: Schema.optional(Schema.String),
    pageSize: Schema.optional(Schema.Number),
    continuationToken: Schema.optional(Schema.String),
    totalRecordCount: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/groups/{groupName}/sqlAssessments/{assessmentName}/assessedSqlDatabases",
    }),
  );
export type AssessedSqlDatabaseV2OperationsListBySqlAssessmentV2Input =
  typeof AssessedSqlDatabaseV2OperationsListBySqlAssessmentV2Input.Type;

// Output Schema
export const AssessedSqlDatabaseV2OperationsListBySqlAssessmentV2Output =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type AssessedSqlDatabaseV2OperationsListBySqlAssessmentV2Output =
  typeof AssessedSqlDatabaseV2OperationsListBySqlAssessmentV2Output.Type;

// The operation
/**
 * List AssessedSqlDatabaseV2 resources by SqlAssessmentV2
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param $filter - Filter query.
 * @param pageSize - Optional parameter for page size.
 * @param continuationToken - Optional parameter for continuation token.
 * @param totalRecordCount - Total record count.
 * @param projectName - Assessment Project Name
 * @param groupName - Group ARM name
 * @param assessmentName - SQL Assessment arm name.
 */
export const AssessedSqlDatabaseV2OperationsListBySqlAssessmentV2 =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AssessedSqlDatabaseV2OperationsListBySqlAssessmentV2Input,
    outputSchema: AssessedSqlDatabaseV2OperationsListBySqlAssessmentV2Output,
  }));
// Input Schema
export const AssessedSqlInstanceV2OperationsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    groupName: Schema.String.pipe(T.PathParam()),
    assessmentName: Schema.String.pipe(T.PathParam()),
    assessedSqlInstanceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/groups/{groupName}/sqlAssessments/{assessmentName}/assessedSqlInstances/{assessedSqlInstanceName}",
    }),
  );
export type AssessedSqlInstanceV2OperationsGetInput =
  typeof AssessedSqlInstanceV2OperationsGetInput.Type;

// Output Schema
export const AssessedSqlInstanceV2OperationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type AssessedSqlInstanceV2OperationsGetOutput =
  typeof AssessedSqlInstanceV2OperationsGetOutput.Type;

// The operation
/**
 * Get a AssessedSqlInstanceV2
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 * @param groupName - Group ARM name
 * @param assessmentName - SQL Assessment arm name.
 * @param assessedSqlInstanceName - Sql assessment Assessed Instance ARM name.
 */
export const AssessedSqlInstanceV2OperationsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AssessedSqlInstanceV2OperationsGetInput,
    outputSchema: AssessedSqlInstanceV2OperationsGetOutput,
  }));
// Input Schema
export const AssessedSqlInstanceV2OperationsListBySqlAssessmentV2Input =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    groupName: Schema.String.pipe(T.PathParam()),
    assessmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $filter: Schema.optional(Schema.String),
    pageSize: Schema.optional(Schema.Number),
    continuationToken: Schema.optional(Schema.String),
    totalRecordCount: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/groups/{groupName}/sqlAssessments/{assessmentName}/assessedSqlInstances",
    }),
  );
export type AssessedSqlInstanceV2OperationsListBySqlAssessmentV2Input =
  typeof AssessedSqlInstanceV2OperationsListBySqlAssessmentV2Input.Type;

// Output Schema
export const AssessedSqlInstanceV2OperationsListBySqlAssessmentV2Output =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type AssessedSqlInstanceV2OperationsListBySqlAssessmentV2Output =
  typeof AssessedSqlInstanceV2OperationsListBySqlAssessmentV2Output.Type;

// The operation
/**
 * List AssessedSqlInstanceV2 resources by SqlAssessmentV2
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param $filter - Filter query.
 * @param pageSize - Optional parameter for page size.
 * @param continuationToken - Optional parameter for continuation token.
 * @param totalRecordCount - Total record count.
 * @param projectName - Assessment Project Name
 * @param groupName - Group ARM name
 * @param assessmentName - SQL Assessment arm name.
 */
export const AssessedSqlInstanceV2OperationsListBySqlAssessmentV2 =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AssessedSqlInstanceV2OperationsListBySqlAssessmentV2Input,
    outputSchema: AssessedSqlInstanceV2OperationsListBySqlAssessmentV2Output,
  }));
// Input Schema
export const AssessedSqlMachinesOperationsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    groupName: Schema.String.pipe(T.PathParam()),
    assessmentName: Schema.String.pipe(T.PathParam()),
    assessedSqlMachineName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/groups/{groupName}/sqlAssessments/{assessmentName}/assessedSqlMachines/{assessedSqlMachineName}",
    }),
  );
export type AssessedSqlMachinesOperationsGetInput =
  typeof AssessedSqlMachinesOperationsGetInput.Type;

// Output Schema
export const AssessedSqlMachinesOperationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type AssessedSqlMachinesOperationsGetOutput =
  typeof AssessedSqlMachinesOperationsGetOutput.Type;

// The operation
/**
 * Get a AssessedSqlMachine
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 * @param groupName - Group ARM name
 * @param assessmentName - SQL Assessment arm name.
 * @param assessedSqlMachineName - Sql assessment Assessed Machine ARM name.
 */
export const AssessedSqlMachinesOperationsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AssessedSqlMachinesOperationsGetInput,
    outputSchema: AssessedSqlMachinesOperationsGetOutput,
  }));
// Input Schema
export const AssessedSqlMachinesOperationsListBySqlAssessmentV2Input =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    groupName: Schema.String.pipe(T.PathParam()),
    assessmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $filter: Schema.optional(Schema.String),
    pageSize: Schema.optional(Schema.Number),
    continuationToken: Schema.optional(Schema.String),
    totalRecordCount: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/groups/{groupName}/sqlAssessments/{assessmentName}/assessedSqlMachines",
    }),
  );
export type AssessedSqlMachinesOperationsListBySqlAssessmentV2Input =
  typeof AssessedSqlMachinesOperationsListBySqlAssessmentV2Input.Type;

// Output Schema
export const AssessedSqlMachinesOperationsListBySqlAssessmentV2Output =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type AssessedSqlMachinesOperationsListBySqlAssessmentV2Output =
  typeof AssessedSqlMachinesOperationsListBySqlAssessmentV2Output.Type;

// The operation
/**
 * List AssessedSqlMachine resources by SqlAssessmentV2
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param $filter - Filter query.
 * @param pageSize - Optional parameter for page size.
 * @param continuationToken - Optional parameter for continuation token.
 * @param totalRecordCount - Total record count.
 * @param projectName - Assessment Project Name
 * @param groupName - Group ARM name
 * @param assessmentName - SQL Assessment arm name.
 */
export const AssessedSqlMachinesOperationsListBySqlAssessmentV2 =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AssessedSqlMachinesOperationsListBySqlAssessmentV2Input,
    outputSchema: AssessedSqlMachinesOperationsListBySqlAssessmentV2Output,
  }));
// Input Schema
export const AssessedSqlRecommendedEntityOperationsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    groupName: Schema.String.pipe(T.PathParam()),
    assessmentName: Schema.String.pipe(T.PathParam()),
    recommendedAssessedEntityName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/groups/{groupName}/sqlAssessments/{assessmentName}/recommendedAssessedEntities/{recommendedAssessedEntityName}",
    }),
  );
export type AssessedSqlRecommendedEntityOperationsGetInput =
  typeof AssessedSqlRecommendedEntityOperationsGetInput.Type;

// Output Schema
export const AssessedSqlRecommendedEntityOperationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type AssessedSqlRecommendedEntityOperationsGetOutput =
  typeof AssessedSqlRecommendedEntityOperationsGetOutput.Type;

// The operation
/**
 * Get a AssessedSqlRecommendedEntity
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 * @param groupName - Group ARM name
 * @param assessmentName - SQL Assessment arm name.
 * @param recommendedAssessedEntityName - Sql assessment Assessed Recommended Entity ARM name.
 */
export const AssessedSqlRecommendedEntityOperationsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AssessedSqlRecommendedEntityOperationsGetInput,
    outputSchema: AssessedSqlRecommendedEntityOperationsGetOutput,
  }));
// Input Schema
export const AssessedSqlRecommendedEntityOperationsListBySqlAssessmentV2Input =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    groupName: Schema.String.pipe(T.PathParam()),
    assessmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $filter: Schema.optional(Schema.String),
    pageSize: Schema.optional(Schema.Number),
    continuationToken: Schema.optional(Schema.String),
    totalRecordCount: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/groups/{groupName}/sqlAssessments/{assessmentName}/recommendedAssessedEntities",
    }),
  );
export type AssessedSqlRecommendedEntityOperationsListBySqlAssessmentV2Input =
  typeof AssessedSqlRecommendedEntityOperationsListBySqlAssessmentV2Input.Type;

// Output Schema
export const AssessedSqlRecommendedEntityOperationsListBySqlAssessmentV2Output =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type AssessedSqlRecommendedEntityOperationsListBySqlAssessmentV2Output =
  typeof AssessedSqlRecommendedEntityOperationsListBySqlAssessmentV2Output.Type;

// The operation
/**
 * List AssessedSqlRecommendedEntity resources by SqlAssessmentV2
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param $filter - Filter query.
 * @param pageSize - Optional parameter for page size.
 * @param continuationToken - Optional parameter for continuation token.
 * @param totalRecordCount - Total record count.
 * @param projectName - Assessment Project Name
 * @param groupName - Group ARM name
 * @param assessmentName - SQL Assessment arm name.
 */
export const AssessedSqlRecommendedEntityOperationsListBySqlAssessmentV2 =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      AssessedSqlRecommendedEntityOperationsListBySqlAssessmentV2Input,
    outputSchema:
      AssessedSqlRecommendedEntityOperationsListBySqlAssessmentV2Output,
  }));
// Input Schema
export const AssessedWebApplicationOperationsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    assessmentName: Schema.String.pipe(T.PathParam()),
    assessedWorkload: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/aksAssessments/{assessmentName}/assessedWebApps/{assessedWorkload}",
    }),
  );
export type AssessedWebApplicationOperationsGetInput =
  typeof AssessedWebApplicationOperationsGetInput.Type;

// Output Schema
export const AssessedWebApplicationOperationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type AssessedWebApplicationOperationsGetOutput =
  typeof AssessedWebApplicationOperationsGetOutput.Type;

// The operation
/**
 * Get a AssessedWebApplication
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 * @param assessmentName - AKS Assessment Name.
 * @param assessedWorkload - Assessed Web Application Name.
 */
export const AssessedWebApplicationOperationsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AssessedWebApplicationOperationsGetInput,
    outputSchema: AssessedWebApplicationOperationsGetOutput,
  }));
// Input Schema
export const AssessedWebApplicationOperationsListByAksAssessmentInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    assessmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    continuationToken: Schema.optional(Schema.String),
    $top: Schema.optional(Schema.Number),
    $filter: Schema.optional(Schema.String),
    totalRecordCount: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/aksAssessments/{assessmentName}/assessedWebApps",
    }),
  );
export type AssessedWebApplicationOperationsListByAksAssessmentInput =
  typeof AssessedWebApplicationOperationsListByAksAssessmentInput.Type;

// Output Schema
export const AssessedWebApplicationOperationsListByAksAssessmentOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type AssessedWebApplicationOperationsListByAksAssessmentOutput =
  typeof AssessedWebApplicationOperationsListByAksAssessmentOutput.Type;

// The operation
/**
 * List AssessedWebApplication resources by AKSAssessment
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param continuationToken - Continuation Token Query Parameter.
 * @param $top - Page Size Query Parameter.
 * @param $filter - Filter Query Parameter.
 * @param totalRecordCount - Total Record Count Query Parameter.
 * @param projectName - Assessment Project Name
 * @param assessmentName - AKS Assessment Name.
 */
export const AssessedWebApplicationOperationsListByAksAssessment =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AssessedWebApplicationOperationsListByAksAssessmentInput,
    outputSchema: AssessedWebApplicationOperationsListByAksAssessmentOutput,
  }));
// Input Schema
export const AssessedWebAppV2OperationsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    groupName: Schema.String.pipe(T.PathParam()),
    assessmentName: Schema.String.pipe(T.PathParam()),
    assessedWebAppName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/groups/{groupName}/webAppAssessments/{assessmentName}/assessedWebApps/{assessedWebAppName}",
    }),
  );
export type AssessedWebAppV2OperationsGetInput =
  typeof AssessedWebAppV2OperationsGetInput.Type;

// Output Schema
export const AssessedWebAppV2OperationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type AssessedWebAppV2OperationsGetOutput =
  typeof AssessedWebAppV2OperationsGetOutput.Type;

// The operation
/**
 * Get a AssessedWebAppV2
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 * @param groupName - Group ARM name
 * @param assessmentName - Web app Assessment arm name.
 * @param assessedWebAppName - Assessed web app ARM name.
 */
export const AssessedWebAppV2OperationsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AssessedWebAppV2OperationsGetInput,
    outputSchema: AssessedWebAppV2OperationsGetOutput,
  }));
// Input Schema
export const AssessedWebAppV2OperationsListByWebAppAssessmentV2Input =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    groupName: Schema.String.pipe(T.PathParam()),
    assessmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $filter: Schema.optional(Schema.String),
    pageSize: Schema.optional(Schema.Number),
    continuationToken: Schema.optional(Schema.String),
    totalRecordCount: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/groups/{groupName}/webAppAssessments/{assessmentName}/assessedWebApps",
    }),
  );
export type AssessedWebAppV2OperationsListByWebAppAssessmentV2Input =
  typeof AssessedWebAppV2OperationsListByWebAppAssessmentV2Input.Type;

// Output Schema
export const AssessedWebAppV2OperationsListByWebAppAssessmentV2Output =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type AssessedWebAppV2OperationsListByWebAppAssessmentV2Output =
  typeof AssessedWebAppV2OperationsListByWebAppAssessmentV2Output.Type;

// The operation
/**
 * List AssessedWebAppV2 resources by WebAppAssessmentV2
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param $filter - Filter query.
 * @param pageSize - Optional parameter for page size.
 * @param continuationToken - Optional parameter for continuation token.
 * @param totalRecordCount - Total record count.
 * @param projectName - Assessment Project Name
 * @param groupName - Group ARM name
 * @param assessmentName - Web app Assessment arm name.
 */
export const AssessedWebAppV2OperationsListByWebAppAssessmentV2 =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AssessedWebAppV2OperationsListByWebAppAssessmentV2Input,
    outputSchema: AssessedWebAppV2OperationsListByWebAppAssessmentV2Output,
  }));
// Input Schema
export const AssessmentOptionsOperationsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    assessmentOptionsName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/assessmentOptions/{assessmentOptionsName}",
    }),
  );
export type AssessmentOptionsOperationsGetInput =
  typeof AssessmentOptionsOperationsGetInput.Type;

// Output Schema
export const AssessmentOptionsOperationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type AssessmentOptionsOperationsGetOutput =
  typeof AssessmentOptionsOperationsGetOutput.Type;

// The operation
/**
 * Get a AssessmentOptions
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 * @param assessmentOptionsName -  assessment options ARM name. Accepted value is 'default'
 */
export const AssessmentOptionsOperationsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AssessmentOptionsOperationsGetInput,
    outputSchema: AssessmentOptionsOperationsGetOutput,
  }));
// Input Schema
export const AssessmentOptionsOperationsListByAssessmentProjectInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/assessmentOptions",
    }),
  );
export type AssessmentOptionsOperationsListByAssessmentProjectInput =
  typeof AssessmentOptionsOperationsListByAssessmentProjectInput.Type;

// Output Schema
export const AssessmentOptionsOperationsListByAssessmentProjectOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type AssessmentOptionsOperationsListByAssessmentProjectOutput =
  typeof AssessmentOptionsOperationsListByAssessmentProjectOutput.Type;

// The operation
/**
 * List AssessmentOptions resources by AssessmentProject
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 */
export const AssessmentOptionsOperationsListByAssessmentProject =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AssessmentOptionsOperationsListByAssessmentProjectInput,
    outputSchema: AssessmentOptionsOperationsListByAssessmentProjectOutput,
  }));
// Input Schema
export const AssessmentProjectsOperationsCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}",
    }),
  );
export type AssessmentProjectsOperationsCreateInput =
  typeof AssessmentProjectsOperationsCreateInput.Type;

// Output Schema
export const AssessmentProjectsOperationsCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type AssessmentProjectsOperationsCreateOutput =
  typeof AssessmentProjectsOperationsCreateOutput.Type;

// The operation
/**
 * Create a AssessmentProject
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 */
export const AssessmentProjectsOperationsCreate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AssessmentProjectsOperationsCreateInput,
    outputSchema: AssessmentProjectsOperationsCreateOutput,
  }));
// Input Schema
export const AssessmentProjectsOperationsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}",
    }),
  );
export type AssessmentProjectsOperationsDeleteInput =
  typeof AssessmentProjectsOperationsDeleteInput.Type;

// Output Schema
export const AssessmentProjectsOperationsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AssessmentProjectsOperationsDeleteOutput =
  typeof AssessmentProjectsOperationsDeleteOutput.Type;

// The operation
/**
 * Delete a AssessmentProject
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 */
export const AssessmentProjectsOperationsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AssessmentProjectsOperationsDeleteInput,
    outputSchema: AssessmentProjectsOperationsDeleteOutput,
  }));
// Input Schema
export const AssessmentProjectsOperationsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}",
    }),
  );
export type AssessmentProjectsOperationsGetInput =
  typeof AssessmentProjectsOperationsGetInput.Type;

// Output Schema
export const AssessmentProjectsOperationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type AssessmentProjectsOperationsGetOutput =
  typeof AssessmentProjectsOperationsGetOutput.Type;

// The operation
/**
 * Get a AssessmentProject
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 */
export const AssessmentProjectsOperationsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AssessmentProjectsOperationsGetInput,
    outputSchema: AssessmentProjectsOperationsGetOutput,
  }));
// Input Schema
export const AssessmentProjectsOperationsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects",
    }),
  );
export type AssessmentProjectsOperationsListByResourceGroupInput =
  typeof AssessmentProjectsOperationsListByResourceGroupInput.Type;

// Output Schema
export const AssessmentProjectsOperationsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type AssessmentProjectsOperationsListByResourceGroupOutput =
  typeof AssessmentProjectsOperationsListByResourceGroupOutput.Type;

// The operation
/**
 * List AssessmentProject resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const AssessmentProjectsOperationsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AssessmentProjectsOperationsListByResourceGroupInput,
    outputSchema: AssessmentProjectsOperationsListByResourceGroupOutput,
  }));
// Input Schema
export const AssessmentProjectsOperationsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Migrate/assessmentProjects",
    }),
  );
export type AssessmentProjectsOperationsListBySubscriptionInput =
  typeof AssessmentProjectsOperationsListBySubscriptionInput.Type;

// Output Schema
export const AssessmentProjectsOperationsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type AssessmentProjectsOperationsListBySubscriptionOutput =
  typeof AssessmentProjectsOperationsListBySubscriptionOutput.Type;

// The operation
/**
 * List AssessmentProject resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const AssessmentProjectsOperationsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AssessmentProjectsOperationsListBySubscriptionInput,
    outputSchema: AssessmentProjectsOperationsListBySubscriptionOutput,
  }));
// Input Schema
export const AssessmentProjectsOperationsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}",
    }),
  );
export type AssessmentProjectsOperationsUpdateInput =
  typeof AssessmentProjectsOperationsUpdateInput.Type;

// Output Schema
export const AssessmentProjectsOperationsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type AssessmentProjectsOperationsUpdateOutput =
  typeof AssessmentProjectsOperationsUpdateOutput.Type;

// The operation
/**
 * Update a AssessmentProject
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 */
export const AssessmentProjectsOperationsUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AssessmentProjectsOperationsUpdateInput,
    outputSchema: AssessmentProjectsOperationsUpdateOutput,
  }));
// Input Schema
export const AssessmentProjectSummaryOperationsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    projectSummaryName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/projectSummary/{projectSummaryName}",
    }),
  );
export type AssessmentProjectSummaryOperationsGetInput =
  typeof AssessmentProjectSummaryOperationsGetInput.Type;

// Output Schema
export const AssessmentProjectSummaryOperationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type AssessmentProjectSummaryOperationsGetOutput =
  typeof AssessmentProjectSummaryOperationsGetOutput.Type;

// The operation
/**
 * Get a AssessmentProjectSummary
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 * @param projectSummaryName - Group ARM name
 */
export const AssessmentProjectSummaryOperationsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AssessmentProjectSummaryOperationsGetInput,
    outputSchema: AssessmentProjectSummaryOperationsGetOutput,
  }));
// Input Schema
export const AssessmentProjectSummaryOperationsListByAssessmentProjectInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/projectSummary",
    }),
  );
export type AssessmentProjectSummaryOperationsListByAssessmentProjectInput =
  typeof AssessmentProjectSummaryOperationsListByAssessmentProjectInput.Type;

// Output Schema
export const AssessmentProjectSummaryOperationsListByAssessmentProjectOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type AssessmentProjectSummaryOperationsListByAssessmentProjectOutput =
  typeof AssessmentProjectSummaryOperationsListByAssessmentProjectOutput.Type;

// The operation
/**
 * List AssessmentProjectSummary resources by AssessmentProject
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 */
export const AssessmentProjectSummaryOperationsListByAssessmentProject =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AssessmentProjectSummaryOperationsListByAssessmentProjectInput,
    outputSchema:
      AssessmentProjectSummaryOperationsListByAssessmentProjectOutput,
  }));
// Input Schema
export const AssessmentsOperationsCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    groupName: Schema.String.pipe(T.PathParam()),
    assessmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/groups/{groupName}/assessments/{assessmentName}",
    }),
  );
export type AssessmentsOperationsCreateInput =
  typeof AssessmentsOperationsCreateInput.Type;

// Output Schema
export const AssessmentsOperationsCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type AssessmentsOperationsCreateOutput =
  typeof AssessmentsOperationsCreateOutput.Type;

// The operation
/**
 * Create a Assessment
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 * @param groupName - Group ARM name
 * @param assessmentName - Machine Assessment ARM name
 */
export const AssessmentsOperationsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AssessmentsOperationsCreateInput,
    outputSchema: AssessmentsOperationsCreateOutput,
  }),
);
// Input Schema
export const AssessmentsOperationsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    groupName: Schema.String.pipe(T.PathParam()),
    assessmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/groups/{groupName}/assessments/{assessmentName}",
    }),
  );
export type AssessmentsOperationsDeleteInput =
  typeof AssessmentsOperationsDeleteInput.Type;

// Output Schema
export const AssessmentsOperationsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AssessmentsOperationsDeleteOutput =
  typeof AssessmentsOperationsDeleteOutput.Type;

// The operation
/**
 * Delete a Assessment
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 * @param groupName - Group ARM name
 * @param assessmentName - Machine Assessment ARM name
 */
export const AssessmentsOperationsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AssessmentsOperationsDeleteInput,
    outputSchema: AssessmentsOperationsDeleteOutput,
  }),
);
// Input Schema
export const AssessmentsOperationsDownloadUrlInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    groupName: Schema.String.pipe(T.PathParam()),
    assessmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/groups/{groupName}/assessments/{assessmentName}/downloadUrl",
    }),
  );
export type AssessmentsOperationsDownloadUrlInput =
  typeof AssessmentsOperationsDownloadUrlInput.Type;

// Output Schema
export const AssessmentsOperationsDownloadUrlOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    assessmentReportUrl: Schema.String,
    expirationTime: Schema.String,
  });
export type AssessmentsOperationsDownloadUrlOutput =
  typeof AssessmentsOperationsDownloadUrlOutput.Type;

// The operation
/**
 * Get download URL for the assessment report.
 *
 * Get the URL for downloading the assessment in a report format.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 * @param groupName - Group ARM name
 * @param assessmentName - Machine Assessment ARM name
 */
export const AssessmentsOperationsDownloadUrl =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AssessmentsOperationsDownloadUrlInput,
    outputSchema: AssessmentsOperationsDownloadUrlOutput,
  }));
// Input Schema
export const AssessmentsOperationsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    groupName: Schema.String.pipe(T.PathParam()),
    assessmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/groups/{groupName}/assessments/{assessmentName}",
    }),
  );
export type AssessmentsOperationsGetInput =
  typeof AssessmentsOperationsGetInput.Type;

// Output Schema
export const AssessmentsOperationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type AssessmentsOperationsGetOutput =
  typeof AssessmentsOperationsGetOutput.Type;

// The operation
/**
 * Get a Assessment
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 * @param groupName - Group ARM name
 * @param assessmentName - Machine Assessment ARM name
 */
export const AssessmentsOperationsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AssessmentsOperationsGetInput,
    outputSchema: AssessmentsOperationsGetOutput,
  }),
);
// Input Schema
export const AssessmentsOperationsListByGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    groupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/groups/{groupName}/assessments",
    }),
  );
export type AssessmentsOperationsListByGroupInput =
  typeof AssessmentsOperationsListByGroupInput.Type;

// Output Schema
export const AssessmentsOperationsListByGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type AssessmentsOperationsListByGroupOutput =
  typeof AssessmentsOperationsListByGroupOutput.Type;

// The operation
/**
 * List Assessment resources by Group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 * @param groupName - Group ARM name
 */
export const AssessmentsOperationsListByGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AssessmentsOperationsListByGroupInput,
    outputSchema: AssessmentsOperationsListByGroupOutput,
  }));
// Input Schema
export const AvsAssessedMachinesOperationsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    groupName: Schema.String.pipe(T.PathParam()),
    assessmentName: Schema.String.pipe(T.PathParam()),
    avsAssessedMachineName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/groups/{groupName}/avsAssessments/{assessmentName}/avsAssessedMachines/{avsAssessedMachineName}",
    }),
  );
export type AvsAssessedMachinesOperationsGetInput =
  typeof AvsAssessedMachinesOperationsGetInput.Type;

// Output Schema
export const AvsAssessedMachinesOperationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type AvsAssessedMachinesOperationsGetOutput =
  typeof AvsAssessedMachinesOperationsGetOutput.Type;

// The operation
/**
 * Get a AvsAssessedMachine
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 * @param groupName - Group ARM name
 * @param assessmentName - AVS Assessment ARM name
 * @param avsAssessedMachineName - AVS assessment Assessed Machine ARM name
 */
export const AvsAssessedMachinesOperationsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AvsAssessedMachinesOperationsGetInput,
    outputSchema: AvsAssessedMachinesOperationsGetOutput,
  }));
// Input Schema
export const AvsAssessedMachinesOperationsListByAvsAssessmentInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    groupName: Schema.String.pipe(T.PathParam()),
    assessmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $filter: Schema.optional(Schema.String),
    pageSize: Schema.optional(Schema.Number),
    continuationToken: Schema.optional(Schema.String),
    totalRecordCount: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/groups/{groupName}/avsAssessments/{assessmentName}/avsAssessedMachines",
    }),
  );
export type AvsAssessedMachinesOperationsListByAvsAssessmentInput =
  typeof AvsAssessedMachinesOperationsListByAvsAssessmentInput.Type;

// Output Schema
export const AvsAssessedMachinesOperationsListByAvsAssessmentOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type AvsAssessedMachinesOperationsListByAvsAssessmentOutput =
  typeof AvsAssessedMachinesOperationsListByAvsAssessmentOutput.Type;

// The operation
/**
 * List AvsAssessedMachine resources by AvsAssessment
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param $filter - Filter query.
 * @param pageSize - Optional parameter for page size.
 * @param continuationToken - Optional parameter for continuation token.
 * @param totalRecordCount - Total record count.
 * @param projectName - Assessment Project Name
 * @param groupName - Group ARM name
 * @param assessmentName - AVS Assessment ARM name
 */
export const AvsAssessedMachinesOperationsListByAvsAssessment =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AvsAssessedMachinesOperationsListByAvsAssessmentInput,
    outputSchema: AvsAssessedMachinesOperationsListByAvsAssessmentOutput,
  }));
// Input Schema
export const AvsAssessmentOptionsOperationsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    avsAssessmentOptionsName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/avsAssessmentOptions/{avsAssessmentOptionsName}",
    }),
  );
export type AvsAssessmentOptionsOperationsGetInput =
  typeof AvsAssessmentOptionsOperationsGetInput.Type;

// Output Schema
export const AvsAssessmentOptionsOperationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type AvsAssessmentOptionsOperationsGetOutput =
  typeof AvsAssessmentOptionsOperationsGetOutput.Type;

// The operation
/**
 * Get a AvsAssessmentOptions
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 * @param avsAssessmentOptionsName - AVS Assessment options ARM name. Accepted value is 'default'
 */
export const AvsAssessmentOptionsOperationsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AvsAssessmentOptionsOperationsGetInput,
    outputSchema: AvsAssessmentOptionsOperationsGetOutput,
  }));
// Input Schema
export const AvsAssessmentOptionsOperationsListByAssessmentProjectInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/avsAssessmentOptions",
    }),
  );
export type AvsAssessmentOptionsOperationsListByAssessmentProjectInput =
  typeof AvsAssessmentOptionsOperationsListByAssessmentProjectInput.Type;

// Output Schema
export const AvsAssessmentOptionsOperationsListByAssessmentProjectOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type AvsAssessmentOptionsOperationsListByAssessmentProjectOutput =
  typeof AvsAssessmentOptionsOperationsListByAssessmentProjectOutput.Type;

// The operation
/**
 * List AvsAssessmentOptions resources by AssessmentProject
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 */
export const AvsAssessmentOptionsOperationsListByAssessmentProject =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AvsAssessmentOptionsOperationsListByAssessmentProjectInput,
    outputSchema: AvsAssessmentOptionsOperationsListByAssessmentProjectOutput,
  }));
// Input Schema
export const AvsAssessmentsOperationsCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    groupName: Schema.String.pipe(T.PathParam()),
    assessmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/groups/{groupName}/avsAssessments/{assessmentName}",
    }),
  );
export type AvsAssessmentsOperationsCreateInput =
  typeof AvsAssessmentsOperationsCreateInput.Type;

// Output Schema
export const AvsAssessmentsOperationsCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type AvsAssessmentsOperationsCreateOutput =
  typeof AvsAssessmentsOperationsCreateOutput.Type;

// The operation
/**
 * Create a AvsAssessment
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 * @param groupName - Group ARM name
 * @param assessmentName - AVS Assessment ARM name
 */
export const AvsAssessmentsOperationsCreate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AvsAssessmentsOperationsCreateInput,
    outputSchema: AvsAssessmentsOperationsCreateOutput,
  }));
// Input Schema
export const AvsAssessmentsOperationsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    groupName: Schema.String.pipe(T.PathParam()),
    assessmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/groups/{groupName}/avsAssessments/{assessmentName}",
    }),
  );
export type AvsAssessmentsOperationsDeleteInput =
  typeof AvsAssessmentsOperationsDeleteInput.Type;

// Output Schema
export const AvsAssessmentsOperationsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AvsAssessmentsOperationsDeleteOutput =
  typeof AvsAssessmentsOperationsDeleteOutput.Type;

// The operation
/**
 * Delete a AvsAssessment
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 * @param groupName - Group ARM name
 * @param assessmentName - AVS Assessment ARM name
 */
export const AvsAssessmentsOperationsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AvsAssessmentsOperationsDeleteInput,
    outputSchema: AvsAssessmentsOperationsDeleteOutput,
  }));
// Input Schema
export const AvsAssessmentsOperationsDownloadUrlInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    groupName: Schema.String.pipe(T.PathParam()),
    assessmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/groups/{groupName}/avsAssessments/{assessmentName}/downloadUrl",
    }),
  );
export type AvsAssessmentsOperationsDownloadUrlInput =
  typeof AvsAssessmentsOperationsDownloadUrlInput.Type;

// Output Schema
export const AvsAssessmentsOperationsDownloadUrlOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    assessmentReportUrl: Schema.String,
    expirationTime: Schema.String,
  });
export type AvsAssessmentsOperationsDownloadUrlOutput =
  typeof AvsAssessmentsOperationsDownloadUrlOutput.Type;

// The operation
/**
 * Get download URL for the assessment report.
 *
 * Get the URL for downloading the assessment in a report format.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 * @param groupName - Group ARM name
 * @param assessmentName - AVS Assessment ARM name
 */
export const AvsAssessmentsOperationsDownloadUrl =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AvsAssessmentsOperationsDownloadUrlInput,
    outputSchema: AvsAssessmentsOperationsDownloadUrlOutput,
  }));
// Input Schema
export const AvsAssessmentsOperationsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    groupName: Schema.String.pipe(T.PathParam()),
    assessmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/groups/{groupName}/avsAssessments/{assessmentName}",
    }),
  );
export type AvsAssessmentsOperationsGetInput =
  typeof AvsAssessmentsOperationsGetInput.Type;

// Output Schema
export const AvsAssessmentsOperationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type AvsAssessmentsOperationsGetOutput =
  typeof AvsAssessmentsOperationsGetOutput.Type;

// The operation
/**
 * Get a AvsAssessment
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 * @param groupName - Group ARM name
 * @param assessmentName - AVS Assessment ARM name
 */
export const AvsAssessmentsOperationsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AvsAssessmentsOperationsGetInput,
    outputSchema: AvsAssessmentsOperationsGetOutput,
  }),
);
// Input Schema
export const AvsAssessmentsOperationsListByGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    groupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/groups/{groupName}/avsAssessments",
    }),
  );
export type AvsAssessmentsOperationsListByGroupInput =
  typeof AvsAssessmentsOperationsListByGroupInput.Type;

// Output Schema
export const AvsAssessmentsOperationsListByGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type AvsAssessmentsOperationsListByGroupOutput =
  typeof AvsAssessmentsOperationsListByGroupOutput.Type;

// The operation
/**
 * List AvsAssessment resources by Group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 * @param groupName - Group ARM name
 */
export const AvsAssessmentsOperationsListByGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AvsAssessmentsOperationsListByGroupInput,
    outputSchema: AvsAssessmentsOperationsListByGroupOutput,
  }));
// Input Schema
export const DatabaseInstancesControllerGetDatabaseInstanceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/migrateProjects/{migrateProjectName}/databaseInstances/{databaseInstanceName}",
    }),
  );
export type DatabaseInstancesControllerGetDatabaseInstanceInput =
  typeof DatabaseInstancesControllerGetDatabaseInstanceInput.Type;

// Output Schema
export const DatabaseInstancesControllerGetDatabaseInstanceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        discoveryData: Schema.optional(
          Schema.Array(
            Schema.Struct({
              lastUpdatedTime: Schema.optional(Schema.String),
              id: Schema.optional(Schema.String),
              instanceId: Schema.optional(Schema.String),
              enqueueTime: Schema.optional(Schema.String),
              solutionName: Schema.optional(Schema.String),
              instanceName: Schema.optional(Schema.String),
              instanceVersion: Schema.optional(Schema.String),
              instanceType: Schema.optional(Schema.String),
              hostName: Schema.optional(Schema.String),
              ipAddress: Schema.optional(Schema.String),
              portNumber: Schema.optional(Schema.Number),
              extendedInfo: Schema.optional(
                Schema.Record(Schema.String, Schema.String),
              ),
            }),
          ),
        ),
        summary: Schema.optional(
          Schema.Record(
            Schema.String,
            Schema.Struct({
              databasesAssessedCount: Schema.optional(Schema.Number),
              migrationReadyCount: Schema.optional(Schema.Number),
            }),
          ),
        ),
        lastUpdatedTime: Schema.optional(Schema.String),
      }),
    ),
  });
export type DatabaseInstancesControllerGetDatabaseInstanceOutput =
  typeof DatabaseInstancesControllerGetDatabaseInstanceOutput.Type;

// The operation
/**
 * Gets a database instance in the migrate project.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const DatabaseInstancesControllerGetDatabaseInstance =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseInstancesControllerGetDatabaseInstanceInput,
    outputSchema: DatabaseInstancesControllerGetDatabaseInstanceOutput,
  }));
// Input Schema
export const DatabaseInstancesControllerListDatabaseInstancesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/migrateProjects/{migrateProjectName}/databaseInstances",
    }),
  );
export type DatabaseInstancesControllerListDatabaseInstancesInput =
  typeof DatabaseInstancesControllerListDatabaseInstancesInput.Type;

// Output Schema
export const DatabaseInstancesControllerListDatabaseInstancesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Struct({
              discoveryData: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    lastUpdatedTime: Schema.optional(Schema.String),
                    id: Schema.optional(Schema.String),
                    instanceId: Schema.optional(Schema.String),
                    enqueueTime: Schema.optional(Schema.String),
                    solutionName: Schema.optional(Schema.String),
                    instanceName: Schema.optional(Schema.String),
                    instanceVersion: Schema.optional(Schema.String),
                    instanceType: Schema.optional(Schema.String),
                    hostName: Schema.optional(Schema.String),
                    ipAddress: Schema.optional(Schema.String),
                    portNumber: Schema.optional(Schema.Number),
                    extendedInfo: Schema.optional(
                      Schema.Record(Schema.String, Schema.String),
                    ),
                  }),
                ),
              ),
              summary: Schema.optional(
                Schema.Record(
                  Schema.String,
                  Schema.Struct({
                    databasesAssessedCount: Schema.optional(Schema.Number),
                    migrationReadyCount: Schema.optional(Schema.Number),
                  }),
                ),
              ),
              lastUpdatedTime: Schema.optional(Schema.String),
            }),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type DatabaseInstancesControllerListDatabaseInstancesOutput =
  typeof DatabaseInstancesControllerListDatabaseInstancesOutput.Type;

// The operation
/**
 * Gets a list of database instances in the migrate project.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const DatabaseInstancesControllerListDatabaseInstances =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseInstancesControllerListDatabaseInstancesInput,
    outputSchema: DatabaseInstancesControllerListDatabaseInstancesOutput,
  }));
// Input Schema
export const DatabasesControllerGetDatabaseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/migrateProjects/{migrateProjectName}/databases/{databaseName}",
    }),
  );
export type DatabasesControllerGetDatabaseInput =
  typeof DatabasesControllerGetDatabaseInput.Type;

// Output Schema
export const DatabasesControllerGetDatabaseOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        assessmentData: Schema.optional(
          Schema.Array(
            Schema.Struct({
              assessmentId: Schema.optional(Schema.String),
              id: Schema.optional(Schema.String),
              migrationBlockersCount: Schema.optional(Schema.Number),
              breakingChangesCount: Schema.optional(Schema.Number),
              isReadyForMigration: Schema.optional(Schema.Boolean),
              assessmentTargetType: Schema.optional(Schema.String),
              lastAssessedTime: Schema.optional(Schema.String),
              compatibilityLevel: Schema.optional(Schema.String),
              databaseSizeInMB: Schema.optional(Schema.String),
              lastUpdatedTime: Schema.optional(Schema.String),
              enqueueTime: Schema.optional(Schema.String),
              solutionName: Schema.optional(Schema.String),
              instanceId: Schema.optional(Schema.String),
              databaseName: Schema.optional(Schema.String),
              extendedInfo: Schema.optional(
                Schema.Record(Schema.String, Schema.String),
              ),
            }),
          ),
        ),
        lastUpdatedTime: Schema.optional(Schema.String),
      }),
    ),
  });
export type DatabasesControllerGetDatabaseOutput =
  typeof DatabasesControllerGetDatabaseOutput.Type;

// The operation
/**
 * Gets a database in the migrate project.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const DatabasesControllerGetDatabase =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabasesControllerGetDatabaseInput,
    outputSchema: DatabasesControllerGetDatabaseOutput,
  }));
// Input Schema
export const DatabasesControllerListDatabasesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/migrateProjects/{migrateProjectName}/databases",
    }),
  );
export type DatabasesControllerListDatabasesInput =
  typeof DatabasesControllerListDatabasesInput.Type;

// Output Schema
export const DatabasesControllerListDatabasesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Struct({
              assessmentData: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    assessmentId: Schema.optional(Schema.String),
                    id: Schema.optional(Schema.String),
                    migrationBlockersCount: Schema.optional(Schema.Number),
                    breakingChangesCount: Schema.optional(Schema.Number),
                    isReadyForMigration: Schema.optional(Schema.Boolean),
                    assessmentTargetType: Schema.optional(Schema.String),
                    lastAssessedTime: Schema.optional(Schema.String),
                    compatibilityLevel: Schema.optional(Schema.String),
                    databaseSizeInMB: Schema.optional(Schema.String),
                    lastUpdatedTime: Schema.optional(Schema.String),
                    enqueueTime: Schema.optional(Schema.String),
                    solutionName: Schema.optional(Schema.String),
                    instanceId: Schema.optional(Schema.String),
                    databaseName: Schema.optional(Schema.String),
                    extendedInfo: Schema.optional(
                      Schema.Record(Schema.String, Schema.String),
                    ),
                  }),
                ),
              ),
              lastUpdatedTime: Schema.optional(Schema.String),
            }),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type DatabasesControllerListDatabasesOutput =
  typeof DatabasesControllerListDatabasesOutput.Type;

// The operation
/**
 * Gets a list of databases in the migrate project.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const DatabasesControllerListDatabases =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabasesControllerListDatabasesInput,
    outputSchema: DatabasesControllerListDatabasesOutput,
  }));
// Input Schema
export const DependencyMapControllerClientGroupMembersInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/vmwareSites/{siteName}/clientGroupMembers",
    }),
  );
export type DependencyMapControllerClientGroupMembersInput =
  typeof DependencyMapControllerClientGroupMembersInput.Type;

// Output Schema
export const DependencyMapControllerClientGroupMembersOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown;
export type DependencyMapControllerClientGroupMembersOutput =
  typeof DependencyMapControllerClientGroupMembersOutput.Type;

// The operation
/**
 * API to list client group members for the selected client group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const DependencyMapControllerClientGroupMembers =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DependencyMapControllerClientGroupMembersInput,
    outputSchema: DependencyMapControllerClientGroupMembersOutput,
  }));
// Input Schema
export const DependencyMapControllerExportDependenciesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/vmwareSites/{siteName}/exportDependencies",
    }),
  );
export type DependencyMapControllerExportDependenciesInput =
  typeof DependencyMapControllerExportDependenciesInput.Type;

// Output Schema
export const DependencyMapControllerExportDependenciesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown;
export type DependencyMapControllerExportDependenciesOutput =
  typeof DependencyMapControllerExportDependenciesOutput.Type;

// The operation
/**
 * API to generate report containing agentless dependencies.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const DependencyMapControllerExportDependencies =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DependencyMapControllerExportDependenciesInput,
    outputSchema: DependencyMapControllerExportDependenciesOutput,
  }));
// Input Schema
export const DependencyMapControllerGenerateCoarseMapInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/vmwareSites/{siteName}/generateCoarseMap",
    }),
  );
export type DependencyMapControllerGenerateCoarseMapInput =
  typeof DependencyMapControllerGenerateCoarseMapInput.Type;

// Output Schema
export const DependencyMapControllerGenerateCoarseMapOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown;
export type DependencyMapControllerGenerateCoarseMapOutput =
  typeof DependencyMapControllerGenerateCoarseMapOutput.Type;

// The operation
/**
 * API to generate coarse map for the list of machines.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const DependencyMapControllerGenerateCoarseMap =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DependencyMapControllerGenerateCoarseMapInput,
    outputSchema: DependencyMapControllerGenerateCoarseMapOutput,
  }));
// Input Schema
export const DependencyMapControllerGenerateDetailedMapInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/vmwareSites/{siteName}/generateDetailedMap",
    }),
  );
export type DependencyMapControllerGenerateDetailedMapInput =
  typeof DependencyMapControllerGenerateDetailedMapInput.Type;

// Output Schema
export const DependencyMapControllerGenerateDetailedMapOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown;
export type DependencyMapControllerGenerateDetailedMapOutput =
  typeof DependencyMapControllerGenerateDetailedMapOutput.Type;

// The operation
/**
 * API to generate detailed map for a selected machine.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const DependencyMapControllerGenerateDetailedMap =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DependencyMapControllerGenerateDetailedMapInput,
    outputSchema: DependencyMapControllerGenerateDetailedMapOutput,
  }));
// Input Schema
export const DependencyMapControllerServerGroupMembersInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/vmwareSites/{siteName}/serverGroupMembers",
    }),
  );
export type DependencyMapControllerServerGroupMembersInput =
  typeof DependencyMapControllerServerGroupMembersInput.Type;

// Output Schema
export const DependencyMapControllerServerGroupMembersOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown;
export type DependencyMapControllerServerGroupMembersOutput =
  typeof DependencyMapControllerServerGroupMembersOutput.Type;

// The operation
/**
 * API to list server group members for the selected server group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const DependencyMapControllerServerGroupMembers =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DependencyMapControllerServerGroupMembersInput,
    outputSchema: DependencyMapControllerServerGroupMembersOutput,
  }));
// Input Schema
export const EventsControllerDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/migrateProjects/{migrateProjectName}/migrateEvents/{eventName}",
    }),
  );
export type EventsControllerDeleteInput =
  typeof EventsControllerDeleteInput.Type;

// Output Schema
export const EventsControllerDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type EventsControllerDeleteOutput =
  typeof EventsControllerDeleteOutput.Type;

// The operation
/**
 * Delete the migrate event
 *
 * Delete the migrate event. Deleting non-existent migrate event is a no-operation.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const EventsControllerDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: EventsControllerDeleteInput,
    outputSchema: EventsControllerDeleteOutput,
  }),
);
// Input Schema
export const EventsControllerGetEventInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/migrateProjects/{migrateProjectName}/migrateEvents/{eventName}",
    }),
  );
export type EventsControllerGetEventInput =
  typeof EventsControllerGetEventInput.Type;

// Output Schema
export const EventsControllerGetEventOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        instanceType: Schema.optional(Schema.String),
        errorCode: Schema.optional(Schema.String),
        errorMessage: Schema.optional(Schema.String),
        recommendation: Schema.optional(Schema.String),
        possibleCauses: Schema.optional(Schema.String),
        solution: Schema.optional(Schema.String),
        clientRequestId: Schema.optional(Schema.String),
      }),
    ),
  });
export type EventsControllerGetEventOutput =
  typeof EventsControllerGetEventOutput.Type;

// The operation
/**
 * Gets an event in the migrate project.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const EventsControllerGetEvent = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: EventsControllerGetEventInput,
    outputSchema: EventsControllerGetEventOutput,
  }),
);
// Input Schema
export const EventsControllerListEventsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/migrateProjects/{migrateProjectName}/migrateEvents",
    }),
  );
export type EventsControllerListEventsInput =
  typeof EventsControllerListEventsInput.Type;

// Output Schema
export const EventsControllerListEventsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Struct({
              instanceType: Schema.optional(Schema.String),
              errorCode: Schema.optional(Schema.String),
              errorMessage: Schema.optional(Schema.String),
              recommendation: Schema.optional(Schema.String),
              possibleCauses: Schema.optional(Schema.String),
              solution: Schema.optional(Schema.String),
              clientRequestId: Schema.optional(Schema.String),
            }),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type EventsControllerListEventsOutput =
  typeof EventsControllerListEventsOutput.Type;

// The operation
/**
 * Gets a list of events in the migrate project.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const EventsControllerListEvents = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: EventsControllerListEventsInput,
    outputSchema: EventsControllerListEventsOutput,
  }),
);
// Input Schema
export const GroupsOperationsCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    groupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/groups/{groupName}",
    }),
  );
export type GroupsOperationsCreateInput =
  typeof GroupsOperationsCreateInput.Type;

// Output Schema
export const GroupsOperationsCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type GroupsOperationsCreateOutput =
  typeof GroupsOperationsCreateOutput.Type;

// The operation
/**
 * Create a Group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 * @param groupName - Group ARM name
 */
export const GroupsOperationsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GroupsOperationsCreateInput,
    outputSchema: GroupsOperationsCreateOutput,
  }),
);
// Input Schema
export const GroupsOperationsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    groupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/groups/{groupName}",
    }),
  );
export type GroupsOperationsDeleteInput =
  typeof GroupsOperationsDeleteInput.Type;

// Output Schema
export const GroupsOperationsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type GroupsOperationsDeleteOutput =
  typeof GroupsOperationsDeleteOutput.Type;

// The operation
/**
 * Delete a Group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 * @param groupName - Group ARM name
 */
export const GroupsOperationsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GroupsOperationsDeleteInput,
    outputSchema: GroupsOperationsDeleteOutput,
  }),
);
// Input Schema
export const GroupsOperationsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    groupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/groups/{groupName}",
    }),
  );
export type GroupsOperationsGetInput = typeof GroupsOperationsGetInput.Type;

// Output Schema
export const GroupsOperationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type GroupsOperationsGetOutput = typeof GroupsOperationsGetOutput.Type;

// The operation
/**
 * Get a Group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 * @param groupName - Group ARM name
 */
export const GroupsOperationsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GroupsOperationsGetInput,
  outputSchema: GroupsOperationsGetOutput,
}));
// Input Schema
export const GroupsOperationsListByAssessmentProjectInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/groups",
    }),
  );
export type GroupsOperationsListByAssessmentProjectInput =
  typeof GroupsOperationsListByAssessmentProjectInput.Type;

// Output Schema
export const GroupsOperationsListByAssessmentProjectOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type GroupsOperationsListByAssessmentProjectOutput =
  typeof GroupsOperationsListByAssessmentProjectOutput.Type;

// The operation
/**
 * List Group resources by AssessmentProject
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 */
export const GroupsOperationsListByAssessmentProject =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GroupsOperationsListByAssessmentProjectInput,
    outputSchema: GroupsOperationsListByAssessmentProjectOutput,
  }));
// Input Schema
export const GroupsOperationsUpdateMachinesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    groupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/groups/{groupName}/updateMachines",
    }),
  );
export type GroupsOperationsUpdateMachinesInput =
  typeof GroupsOperationsUpdateMachinesInput.Type;

// Output Schema
export const GroupsOperationsUpdateMachinesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type GroupsOperationsUpdateMachinesOutput =
  typeof GroupsOperationsUpdateMachinesOutput.Type;

// The operation
/**
 * Update machines in group.
 *
 * Update machines in group by adding or removing machines.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 * @param groupName - Group ARM name
 */
export const GroupsOperationsUpdateMachines =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GroupsOperationsUpdateMachinesInput,
    outputSchema: GroupsOperationsUpdateMachinesOutput,
  }));
// Input Schema
export const HypervClusterControllerCreateClusterInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/hypervSites/{siteName}/clusters/{clusterName}",
    }),
  );
export type HypervClusterControllerCreateClusterInput =
  typeof HypervClusterControllerCreateClusterInput.Type;

// Output Schema
export const HypervClusterControllerCreateClusterOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type HypervClusterControllerCreateClusterOutput =
  typeof HypervClusterControllerCreateClusterOutput.Type;

// The operation
/**
 * Method to create or update a Hyper-V cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param clusterName -  Cluster ARM name
 */
export const HypervClusterControllerCreateCluster =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: HypervClusterControllerCreateClusterInput,
    outputSchema: HypervClusterControllerCreateClusterOutput,
  }));
// Input Schema
export const HypervClusterControllerDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/hypervSites/{siteName}/clusters/{clusterName}",
    }),
  );
export type HypervClusterControllerDeleteInput =
  typeof HypervClusterControllerDeleteInput.Type;

// Output Schema
export const HypervClusterControllerDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type HypervClusterControllerDeleteOutput =
  typeof HypervClusterControllerDeleteOutput.Type;

// The operation
/**
 * Delete a HypervCluster
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param clusterName -  Cluster ARM name
 */
export const HypervClusterControllerDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: HypervClusterControllerDeleteInput,
    outputSchema: HypervClusterControllerDeleteOutput,
  }));
// Input Schema
export const HypervClusterControllerGetClusterInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/hypervSites/{siteName}/clusters/{clusterName}",
    }),
  );
export type HypervClusterControllerGetClusterInput =
  typeof HypervClusterControllerGetClusterInput.Type;

// Output Schema
export const HypervClusterControllerGetClusterOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type HypervClusterControllerGetClusterOutput =
  typeof HypervClusterControllerGetClusterOutput.Type;

// The operation
/**
 * Method to get a Hyper-V cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param clusterName -  Cluster ARM name
 */
export const HypervClusterControllerGetCluster =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: HypervClusterControllerGetClusterInput,
    outputSchema: HypervClusterControllerGetClusterOutput,
  }));
// Input Schema
export const HypervClusterControllerListByHypervSiteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    filter: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/hypervSites/{siteName}/clusters",
    }),
  );
export type HypervClusterControllerListByHypervSiteInput =
  typeof HypervClusterControllerListByHypervSiteInput.Type;

// Output Schema
export const HypervClusterControllerListByHypervSiteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type HypervClusterControllerListByHypervSiteOutput =
  typeof HypervClusterControllerListByHypervSiteOutput.Type;

// The operation
/**
 * List HypervCluster resources by HypervSite
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param filter - filter query
 * @param siteName - Site name
 */
export const HypervClusterControllerListByHypervSite =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: HypervClusterControllerListByHypervSiteInput,
    outputSchema: HypervClusterControllerListByHypervSiteOutput,
  }));
// Input Schema
export const HypervCollectorsOperationsCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    hypervCollectorName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/hypervcollectors/{hypervCollectorName}",
    }),
  );
export type HypervCollectorsOperationsCreateInput =
  typeof HypervCollectorsOperationsCreateInput.Type;

// Output Schema
export const HypervCollectorsOperationsCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type HypervCollectorsOperationsCreateOutput =
  typeof HypervCollectorsOperationsCreateOutput.Type;

// The operation
/**
 * Create a HypervCollector
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 * @param hypervCollectorName - Hyper-V collector ARM name
 */
export const HypervCollectorsOperationsCreate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: HypervCollectorsOperationsCreateInput,
    outputSchema: HypervCollectorsOperationsCreateOutput,
  }));
// Input Schema
export const HypervCollectorsOperationsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    hypervCollectorName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/hypervcollectors/{hypervCollectorName}",
    }),
  );
export type HypervCollectorsOperationsDeleteInput =
  typeof HypervCollectorsOperationsDeleteInput.Type;

// Output Schema
export const HypervCollectorsOperationsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type HypervCollectorsOperationsDeleteOutput =
  typeof HypervCollectorsOperationsDeleteOutput.Type;

// The operation
/**
 * Delete a HypervCollector
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 * @param hypervCollectorName - Hyper-V collector ARM name
 */
export const HypervCollectorsOperationsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: HypervCollectorsOperationsDeleteInput,
    outputSchema: HypervCollectorsOperationsDeleteOutput,
  }));
// Input Schema
export const HypervCollectorsOperationsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    hypervCollectorName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/hypervcollectors/{hypervCollectorName}",
    }),
  );
export type HypervCollectorsOperationsGetInput =
  typeof HypervCollectorsOperationsGetInput.Type;

// Output Schema
export const HypervCollectorsOperationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type HypervCollectorsOperationsGetOutput =
  typeof HypervCollectorsOperationsGetOutput.Type;

// The operation
/**
 * Get a HypervCollector
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 * @param hypervCollectorName - Hyper-V collector ARM name
 */
export const HypervCollectorsOperationsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: HypervCollectorsOperationsGetInput,
    outputSchema: HypervCollectorsOperationsGetOutput,
  }));
// Input Schema
export const HypervCollectorsOperationsListByAssessmentProjectInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/hypervcollectors",
    }),
  );
export type HypervCollectorsOperationsListByAssessmentProjectInput =
  typeof HypervCollectorsOperationsListByAssessmentProjectInput.Type;

// Output Schema
export const HypervCollectorsOperationsListByAssessmentProjectOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type HypervCollectorsOperationsListByAssessmentProjectOutput =
  typeof HypervCollectorsOperationsListByAssessmentProjectOutput.Type;

// The operation
/**
 * List HypervCollector resources by AssessmentProject
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 */
export const HypervCollectorsOperationsListByAssessmentProject =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: HypervCollectorsOperationsListByAssessmentProjectInput,
    outputSchema: HypervCollectorsOperationsListByAssessmentProjectOutput,
  }));
// Input Schema
export const HypervDependencyMapControllerClientGroupMembersInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/hypervSites/{siteName}/clientGroupMembers",
    }),
  );
export type HypervDependencyMapControllerClientGroupMembersInput =
  typeof HypervDependencyMapControllerClientGroupMembersInput.Type;

// Output Schema
export const HypervDependencyMapControllerClientGroupMembersOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown;
export type HypervDependencyMapControllerClientGroupMembersOutput =
  typeof HypervDependencyMapControllerClientGroupMembersOutput.Type;

// The operation
/**
 * API to list client group members for the selected client group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const HypervDependencyMapControllerClientGroupMembers =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: HypervDependencyMapControllerClientGroupMembersInput,
    outputSchema: HypervDependencyMapControllerClientGroupMembersOutput,
  }));
// Input Schema
export const HypervDependencyMapControllerExportDependenciesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/hypervSites/{siteName}/exportDependencies",
    }),
  );
export type HypervDependencyMapControllerExportDependenciesInput =
  typeof HypervDependencyMapControllerExportDependenciesInput.Type;

// Output Schema
export const HypervDependencyMapControllerExportDependenciesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown;
export type HypervDependencyMapControllerExportDependenciesOutput =
  typeof HypervDependencyMapControllerExportDependenciesOutput.Type;

// The operation
/**
 * API to generate report containing agentless dependencies.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const HypervDependencyMapControllerExportDependencies =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: HypervDependencyMapControllerExportDependenciesInput,
    outputSchema: HypervDependencyMapControllerExportDependenciesOutput,
  }));
// Input Schema
export const HypervDependencyMapControllerGenerateCoarseMapInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/hypervSites/{siteName}/generateCoarseMap",
    }),
  );
export type HypervDependencyMapControllerGenerateCoarseMapInput =
  typeof HypervDependencyMapControllerGenerateCoarseMapInput.Type;

// Output Schema
export const HypervDependencyMapControllerGenerateCoarseMapOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown;
export type HypervDependencyMapControllerGenerateCoarseMapOutput =
  typeof HypervDependencyMapControllerGenerateCoarseMapOutput.Type;

// The operation
/**
 * API to generate coarse map for the list of machines.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const HypervDependencyMapControllerGenerateCoarseMap =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: HypervDependencyMapControllerGenerateCoarseMapInput,
    outputSchema: HypervDependencyMapControllerGenerateCoarseMapOutput,
  }));
// Input Schema
export const HypervDependencyMapControllerGenerateDetailedMapInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/hypervSites/{siteName}/generateDetailedMap",
    }),
  );
export type HypervDependencyMapControllerGenerateDetailedMapInput =
  typeof HypervDependencyMapControllerGenerateDetailedMapInput.Type;

// Output Schema
export const HypervDependencyMapControllerGenerateDetailedMapOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown;
export type HypervDependencyMapControllerGenerateDetailedMapOutput =
  typeof HypervDependencyMapControllerGenerateDetailedMapOutput.Type;

// The operation
/**
 * API to generate detailed map for a selected machine.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const HypervDependencyMapControllerGenerateDetailedMap =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: HypervDependencyMapControllerGenerateDetailedMapInput,
    outputSchema: HypervDependencyMapControllerGenerateDetailedMapOutput,
  }));
// Input Schema
export const HypervDependencyMapControllerServerGroupMembersInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/hypervSites/{siteName}/serverGroupMembers",
    }),
  );
export type HypervDependencyMapControllerServerGroupMembersInput =
  typeof HypervDependencyMapControllerServerGroupMembersInput.Type;

// Output Schema
export const HypervDependencyMapControllerServerGroupMembersOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown;
export type HypervDependencyMapControllerServerGroupMembersOutput =
  typeof HypervDependencyMapControllerServerGroupMembersOutput.Type;

// The operation
/**
 * API to list server group members for the selected server group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const HypervDependencyMapControllerServerGroupMembers =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: HypervDependencyMapControllerServerGroupMembersInput,
    outputSchema: HypervDependencyMapControllerServerGroupMembersOutput,
  }));
// Input Schema
export const HypervDependencyMapControllerUpdateDependencyMapStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/hypervSites/{siteName}/updateDependencyMapStatus",
    }),
  );
export type HypervDependencyMapControllerUpdateDependencyMapStatusInput =
  typeof HypervDependencyMapControllerUpdateDependencyMapStatusInput.Type;

// Output Schema
export const HypervDependencyMapControllerUpdateDependencyMapStatusOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown;
export type HypervDependencyMapControllerUpdateDependencyMapStatusOutput =
  typeof HypervDependencyMapControllerUpdateDependencyMapStatusOutput.Type;

// The operation
/**
 * Method to enable disable dependency map status for machines
 * in a site.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const HypervDependencyMapControllerUpdateDependencyMapStatus =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: HypervDependencyMapControllerUpdateDependencyMapStatusInput,
    outputSchema: HypervDependencyMapControllerUpdateDependencyMapStatusOutput,
  }));
// Input Schema
export const HypervHostControllerCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    hostName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/hypervSites/{siteName}/hosts/{hostName}",
    }),
  );
export type HypervHostControllerCreateInput =
  typeof HypervHostControllerCreateInput.Type;

// Output Schema
export const HypervHostControllerCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type HypervHostControllerCreateOutput =
  typeof HypervHostControllerCreateOutput.Type;

// The operation
/**
 * Create a HypervHost
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param hostName -  Host name
 */
export const HypervHostControllerCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: HypervHostControllerCreateInput,
    outputSchema: HypervHostControllerCreateOutput,
  }),
);
// Input Schema
export const HypervHostControllerDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    hostName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/hypervSites/{siteName}/hosts/{hostName}",
    }),
  );
export type HypervHostControllerDeleteInput =
  typeof HypervHostControllerDeleteInput.Type;

// Output Schema
export const HypervHostControllerDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type HypervHostControllerDeleteOutput =
  typeof HypervHostControllerDeleteOutput.Type;

// The operation
/**
 * Delete a HypervHost
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param hostName -  Host name
 */
export const HypervHostControllerDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: HypervHostControllerDeleteInput,
    outputSchema: HypervHostControllerDeleteOutput,
  }),
);
// Input Schema
export const HypervHostControllerGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    hostName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/hypervSites/{siteName}/hosts/{hostName}",
    }),
  );
export type HypervHostControllerGetInput =
  typeof HypervHostControllerGetInput.Type;

// Output Schema
export const HypervHostControllerGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type HypervHostControllerGetOutput =
  typeof HypervHostControllerGetOutput.Type;

// The operation
/**
 * Get a HypervHost
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param hostName -  Host name
 */
export const HypervHostControllerGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: HypervHostControllerGetInput,
    outputSchema: HypervHostControllerGetOutput,
  }),
);
// Input Schema
export const HypervHostControllerListByHypervSiteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    filter: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/hypervSites/{siteName}/hosts",
    }),
  );
export type HypervHostControllerListByHypervSiteInput =
  typeof HypervHostControllerListByHypervSiteInput.Type;

// Output Schema
export const HypervHostControllerListByHypervSiteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type HypervHostControllerListByHypervSiteOutput =
  typeof HypervHostControllerListByHypervSiteOutput.Type;

// The operation
/**
 * List HypervHost resources by HypervSite
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param filter - filter query
 * @param siteName - Site name
 */
export const HypervHostControllerListByHypervSite =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: HypervHostControllerListByHypervSiteInput,
    outputSchema: HypervHostControllerListByHypervSiteOutput,
  }));
// Input Schema
export const HypervJobsControllerGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    jobName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/vmwareSites/{siteName}/jobs/{jobName}",
    }),
  );
export type HypervJobsControllerGetInput =
  typeof HypervJobsControllerGetInput.Type;

// Output Schema
export const HypervJobsControllerGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type HypervJobsControllerGetOutput =
  typeof HypervJobsControllerGetOutput.Type;

// The operation
/**
 * Get a VmwareJob
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param jobName -  Jobs name
 */
export const HypervJobsControllerGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: HypervJobsControllerGetInput,
    outputSchema: HypervJobsControllerGetOutput,
  }),
);
// Input Schema
export const HypervJobsControllerListByVmwareSiteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/vmwareSites/{siteName}/jobs",
    }),
  );
export type HypervJobsControllerListByVmwareSiteInput =
  typeof HypervJobsControllerListByVmwareSiteInput.Type;

// Output Schema
export const HypervJobsControllerListByVmwareSiteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type HypervJobsControllerListByVmwareSiteOutput =
  typeof HypervJobsControllerListByVmwareSiteOutput.Type;

// The operation
/**
 * List VmwareJob resources by VmwareSite
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const HypervJobsControllerListByVmwareSite =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: HypervJobsControllerListByVmwareSiteInput,
    outputSchema: HypervJobsControllerListByVmwareSiteOutput,
  }));
// Input Schema
export const HypervJobsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  siteName: Schema.String.pipe(T.PathParam()),
  jobName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/hypervSites/{siteName}/jobs/{jobName}",
  }),
);
export type HypervJobsGetInput = typeof HypervJobsGetInput.Type;

// Output Schema
export const HypervJobsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type HypervJobsGetOutput = typeof HypervJobsGetOutput.Type;

// The operation
/**
 * Get a HypervJob
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param jobName -  Job name
 */
export const HypervJobsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: HypervJobsGetInput,
  outputSchema: HypervJobsGetOutput,
}));
// Input Schema
export const HypervJobsListByHypervSiteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/hypervSites/{siteName}/jobs",
    }),
  );
export type HypervJobsListByHypervSiteInput =
  typeof HypervJobsListByHypervSiteInput.Type;

// Output Schema
export const HypervJobsListByHypervSiteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type HypervJobsListByHypervSiteOutput =
  typeof HypervJobsListByHypervSiteOutput.Type;

// The operation
/**
 * List HypervJob resources by HypervSite
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const HypervJobsListByHypervSite = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: HypervJobsListByHypervSiteInput,
    outputSchema: HypervJobsListByHypervSiteOutput,
  }),
);
// Input Schema
export const HypervMachinesControllerGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    machineName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/hypervSites/{siteName}/machines/{machineName}",
    }),
  );
export type HypervMachinesControllerGetInput =
  typeof HypervMachinesControllerGetInput.Type;

// Output Schema
export const HypervMachinesControllerGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type HypervMachinesControllerGetOutput =
  typeof HypervMachinesControllerGetOutput.Type;

// The operation
/**
 * Get a HypervMachine
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param machineName -  HypervMachine name
 */
export const HypervMachinesControllerGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: HypervMachinesControllerGetInput,
    outputSchema: HypervMachinesControllerGetOutput,
  }),
);
// Input Schema
export const HypervMachinesControllerListByHypervSiteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    filter: Schema.optional(Schema.String),
    top: Schema.optional(Schema.Number),
    continuationToken: Schema.optional(Schema.String),
    totalRecordCount: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/hypervSites/{siteName}/machines",
    }),
  );
export type HypervMachinesControllerListByHypervSiteInput =
  typeof HypervMachinesControllerListByHypervSiteInput.Type;

// Output Schema
export const HypervMachinesControllerListByHypervSiteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type HypervMachinesControllerListByHypervSiteOutput =
  typeof HypervMachinesControllerListByHypervSiteOutput.Type;

// The operation
/**
 * List HypervMachine resources by HypervSite
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param filter - filter query
 * @param top - page size  query
 * @param continuationToken - Optional parameter for continuation token.
 * @param totalRecordCount - Total count of machines in the given site.
 * @param siteName - Site name
 */
export const HypervMachinesControllerListByHypervSite =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: HypervMachinesControllerListByHypervSiteInput,
    outputSchema: HypervMachinesControllerListByHypervSiteOutput,
  }));
// Input Schema
export const HypervMachinesControllerUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    machineName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/hypervSites/{siteName}/machines/{machineName}",
    }),
  );
export type HypervMachinesControllerUpdateInput =
  typeof HypervMachinesControllerUpdateInput.Type;

// Output Schema
export const HypervMachinesControllerUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type HypervMachinesControllerUpdateOutput =
  typeof HypervMachinesControllerUpdateOutput.Type;

// The operation
/**
 * Update a HypervMachine
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param machineName -  HypervMachine name
 */
export const HypervMachinesControllerUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: HypervMachinesControllerUpdateInput,
    outputSchema: HypervMachinesControllerUpdateOutput,
  }));
// Input Schema
export const HypervMachinesControllerUpdatePropertiesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/hypervSites/{siteName}/updateProperties",
    }),
  );
export type HypervMachinesControllerUpdatePropertiesInput =
  typeof HypervMachinesControllerUpdatePropertiesInput.Type;

// Output Schema
export const HypervMachinesControllerUpdatePropertiesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown;
export type HypervMachinesControllerUpdatePropertiesOutput =
  typeof HypervMachinesControllerUpdatePropertiesOutput.Type;

// The operation
/**
 * Method to update custom properties for HYPERV machines
 * in a site.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const HypervMachinesControllerUpdateProperties =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: HypervMachinesControllerUpdatePropertiesInput,
    outputSchema: HypervMachinesControllerUpdatePropertiesOutput,
  }));
// Input Schema
export const HypervOperationsStatusControllerGetHypervOperationsStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    operationStatusName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/hypervSites/{siteName}/operationsStatus/{operationStatusName}",
    }),
  );
export type HypervOperationsStatusControllerGetHypervOperationsStatusInput =
  typeof HypervOperationsStatusControllerGetHypervOperationsStatusInput.Type;

// Output Schema
export const HypervOperationsStatusControllerGetHypervOperationsStatusOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    status: Schema.optional(Schema.String),
    startTime: Schema.optional(Schema.String),
    endTime: Schema.optional(Schema.String),
    error: Schema.optional(
      Schema.Struct({
        code: Schema.optional(Schema.String),
        message: Schema.optional(Schema.String),
      }),
    ),
    properties: Schema.optional(
      Schema.Struct({
        result: Schema.optional(Schema.String),
      }),
    ),
  });
export type HypervOperationsStatusControllerGetHypervOperationsStatusOutput =
  typeof HypervOperationsStatusControllerGetHypervOperationsStatusOutput.Type;

// The operation
/**
 * Method to get operation status.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param operationStatusName - Operation status  Arm Name.
 */
export const HypervOperationsStatusControllerGetHypervOperationsStatus =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: HypervOperationsStatusControllerGetHypervOperationsStatusInput,
    outputSchema:
      HypervOperationsStatusControllerGetHypervOperationsStatusOutput,
  }));
// Input Schema
export const HypervRunAsAccountsControllerGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/hypervSites/{siteName}/runAsAccounts/{accountName}",
    }),
  );
export type HypervRunAsAccountsControllerGetInput =
  typeof HypervRunAsAccountsControllerGetInput.Type;

// Output Schema
export const HypervRunAsAccountsControllerGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type HypervRunAsAccountsControllerGetOutput =
  typeof HypervRunAsAccountsControllerGetOutput.Type;

// The operation
/**
 * Get a HypervRunAsAccountResource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param accountName -  RunAsAccounts name
 */
export const HypervRunAsAccountsControllerGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: HypervRunAsAccountsControllerGetInput,
    outputSchema: HypervRunAsAccountsControllerGetOutput,
  }));
// Input Schema
export const HypervRunAsAccountsControllerListByHypervSiteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/hypervSites/{siteName}/runAsAccounts",
    }),
  );
export type HypervRunAsAccountsControllerListByHypervSiteInput =
  typeof HypervRunAsAccountsControllerListByHypervSiteInput.Type;

// Output Schema
export const HypervRunAsAccountsControllerListByHypervSiteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type HypervRunAsAccountsControllerListByHypervSiteOutput =
  typeof HypervRunAsAccountsControllerListByHypervSiteOutput.Type;

// The operation
/**
 * List HypervRunAsAccountResource resources by HypervSite
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const HypervRunAsAccountsControllerListByHypervSite =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: HypervRunAsAccountsControllerListByHypervSiteInput,
    outputSchema: HypervRunAsAccountsControllerListByHypervSiteOutput,
  }));
// Input Schema
export const HypervSitesControllerComputeErrorSummaryInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/hypervSites/{siteName}/computeErrorSummary",
    }),
  );
export type HypervSitesControllerComputeErrorSummaryInput =
  typeof HypervSitesControllerComputeErrorSummaryInput.Type;

// Output Schema
export const HypervSitesControllerComputeErrorSummaryOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    applianceName: Schema.String,
    discoveryScopeErrorSummaries: Schema.Struct({
      affectedResourceType: Schema.String,
      affectedObjectsCount: Schema.Number,
      discoveryScope: Schema.Literals([
        "AppsAndRoles",
        "DependencyMap",
        "StaticData",
        "SQLServerConnectionInfo",
      ]),
    }),
    nextLink: Schema.optional(Schema.String),
  });
export type HypervSitesControllerComputeErrorSummaryOutput =
  typeof HypervSitesControllerComputeErrorSummaryOutput.Type;

// The operation
/**
 * Method to get site error summary.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const HypervSitesControllerComputeErrorSummary =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: HypervSitesControllerComputeErrorSummaryInput,
    outputSchema: HypervSitesControllerComputeErrorSummaryOutput,
  }));
// Input Schema
export const HypervSitesControllerComputeusageInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/hypervSites/{siteName}/computeusage",
    }),
  );
export type HypervSitesControllerComputeusageInput =
  typeof HypervSitesControllerComputeusageInput.Type;

// Output Schema
export const HypervSitesControllerComputeusageOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    machineCount: Schema.optional(Schema.Number),
    runAsAccountCount: Schema.optional(Schema.Number),
    hostCount: Schema.optional(Schema.Number),
    clusterCount: Schema.optional(Schema.Number),
  });
export type HypervSitesControllerComputeusageOutput =
  typeof HypervSitesControllerComputeusageOutput.Type;

// The operation
/**
 * Get a hyperv site usage.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const HypervSitesControllerComputeusage =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: HypervSitesControllerComputeusageInput,
    outputSchema: HypervSitesControllerComputeusageOutput,
  }));
// Input Schema
export const HypervSitesControllerCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/hypervSites/{siteName}",
    }),
  );
export type HypervSitesControllerCreateInput =
  typeof HypervSitesControllerCreateInput.Type;

// Output Schema
export const HypervSitesControllerCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type HypervSitesControllerCreateOutput =
  typeof HypervSitesControllerCreateOutput.Type;

// The operation
/**
 * Create a HypervSite
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const HypervSitesControllerCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: HypervSitesControllerCreateInput,
    outputSchema: HypervSitesControllerCreateOutput,
  }),
);
// Input Schema
export const HypervSitesControllerDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/hypervSites/{siteName}",
    }),
  );
export type HypervSitesControllerDeleteInput =
  typeof HypervSitesControllerDeleteInput.Type;

// Output Schema
export const HypervSitesControllerDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type HypervSitesControllerDeleteOutput =
  typeof HypervSitesControllerDeleteOutput.Type;

// The operation
/**
 * Delete a HypervSite
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const HypervSitesControllerDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: HypervSitesControllerDeleteInput,
    outputSchema: HypervSitesControllerDeleteOutput,
  }),
);
// Input Schema
export const HypervSitesControllerExportApplicationsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/hypervSites/{siteName}/exportApplications",
    }),
  );
export type HypervSitesControllerExportApplicationsInput =
  typeof HypervSitesControllerExportApplicationsInput.Type;

// Output Schema
export const HypervSitesControllerExportApplicationsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown;
export type HypervSitesControllerExportApplicationsOutput =
  typeof HypervSitesControllerExportApplicationsOutput.Type;

// The operation
/**
 * Method to generate report containing
 * machine and the deep discovery of the application installed in the machine.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const HypervSitesControllerExportApplications =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: HypervSitesControllerExportApplicationsInput,
    outputSchema: HypervSitesControllerExportApplicationsOutput,
  }));
// Input Schema
export const HypervSitesControllerExportMachineErrorsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/hypervSites/{siteName}/exportMachineErrors",
    }),
  );
export type HypervSitesControllerExportMachineErrorsInput =
  typeof HypervSitesControllerExportMachineErrorsInput.Type;

// Output Schema
export const HypervSitesControllerExportMachineErrorsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown;
export type HypervSitesControllerExportMachineErrorsOutput =
  typeof HypervSitesControllerExportMachineErrorsOutput.Type;

// The operation
/**
 * Method to generate report containing
 * machine and the errors encountered during guest discovery of the machine.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const HypervSitesControllerExportMachineErrors =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: HypervSitesControllerExportMachineErrorsInput,
    outputSchema: HypervSitesControllerExportMachineErrorsOutput,
  }));
// Input Schema
export const HypervSitesControllerGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/hypervSites/{siteName}",
    }),
  );
export type HypervSitesControllerGetInput =
  typeof HypervSitesControllerGetInput.Type;

// Output Schema
export const HypervSitesControllerGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type HypervSitesControllerGetOutput =
  typeof HypervSitesControllerGetOutput.Type;

// The operation
/**
 * Get a HypervSite
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const HypervSitesControllerGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: HypervSitesControllerGetInput,
    outputSchema: HypervSitesControllerGetOutput,
  }),
);
// Input Schema
export const HypervSitesControllerListHealthSummaryInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/hypervSites/{siteName}/listHealthSummary",
    }),
  );
export type HypervSitesControllerListHealthSummaryInput =
  typeof HypervSitesControllerListHealthSummaryInput.Type;

// Output Schema
export const HypervSitesControllerListHealthSummaryOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        applianceName: Schema.optional(Schema.String),
        errorMessage: Schema.optional(Schema.String),
        summaryMessage: Schema.optional(Schema.String),
        errorId: Schema.optional(Schema.Number),
        errorCode: Schema.optional(Schema.String),
        affectedObjectsCount: Schema.optional(Schema.Number),
        hitCount: Schema.optional(Schema.Number),
        severity: Schema.optional(Schema.String),
        remediationGuidance: Schema.optional(Schema.String),
        affectedResourceType: Schema.optional(Schema.String),
        affectedResources: Schema.optional(Schema.Array(Schema.String)),
        fabricLayoutUpdateSources: Schema.optional(
          Schema.Array(
            Schema.Literals([
              "RefreshFabricLayout",
              "RefreshFabricLayoutGuest",
              "RefreshFabricLayoutDependencyMap",
            ]),
          ),
        ),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type HypervSitesControllerListHealthSummaryOutput =
  typeof HypervSitesControllerListHealthSummaryOutput.Type;

// The operation
/**
 * Method to get site health summary.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const HypervSitesControllerListHealthSummary =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: HypervSitesControllerListHealthSummaryInput,
    outputSchema: HypervSitesControllerListHealthSummaryOutput,
  }));
// Input Schema
export const HypervSitesControllerSummaryInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/hypervSites/{siteName}/summary",
    }),
  );
export type HypervSitesControllerSummaryInput =
  typeof HypervSitesControllerSummaryInput.Type;

// Output Schema
export const HypervSitesControllerSummaryOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    machineCount: Schema.optional(Schema.Number),
    runAsAccountCount: Schema.optional(Schema.Number),
    hostCount: Schema.optional(Schema.Number),
    clusterCount: Schema.optional(Schema.Number),
  });
export type HypervSitesControllerSummaryOutput =
  typeof HypervSitesControllerSummaryOutput.Type;

// The operation
/**
 * Method to get site usage.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const HypervSitesControllerSummary =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: HypervSitesControllerSummaryInput,
    outputSchema: HypervSitesControllerSummaryOutput,
  }));
// Input Schema
export const HypervSitesControllerUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/hypervSites/{siteName}",
    }),
  );
export type HypervSitesControllerUpdateInput =
  typeof HypervSitesControllerUpdateInput.Type;

// Output Schema
export const HypervSitesControllerUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type HypervSitesControllerUpdateOutput =
  typeof HypervSitesControllerUpdateOutput.Type;

// The operation
/**
 * Update a HypervSite
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const HypervSitesControllerUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: HypervSitesControllerUpdateInput,
    outputSchema: HypervSitesControllerUpdateOutput,
  }),
);
// Input Schema
export const HypervSitesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/hypervSites",
    }),
  );
export type HypervSitesListByResourceGroupInput =
  typeof HypervSitesListByResourceGroupInput.Type;

// Output Schema
export const HypervSitesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type HypervSitesListByResourceGroupOutput =
  typeof HypervSitesListByResourceGroupOutput.Type;

// The operation
/**
 * Get all hyperv sites.
 *
 * Get all the hyperv sites in the subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const HypervSitesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: HypervSitesListByResourceGroupInput,
    outputSchema: HypervSitesListByResourceGroupOutput,
  }));
// Input Schema
export const HypervSitesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.OffAzure/hypervSites",
    }),
  );
export type HypervSitesListBySubscriptionInput =
  typeof HypervSitesListBySubscriptionInput.Type;

// Output Schema
export const HypervSitesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type HypervSitesListBySubscriptionOutput =
  typeof HypervSitesListBySubscriptionOutput.Type;

// The operation
/**
 * Get all hyperv  sites.
 *
 * Get all the hyperv  sites in the subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const HypervSitesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: HypervSitesListBySubscriptionInput,
    outputSchema: HypervSitesListBySubscriptionOutput,
  }));
// Input Schema
export const HypervSoftwareInventoriesControllerGetMachineSoftwareInventoryInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    machineName: Schema.String.pipe(T.PathParam()),
    default: Schema.Literals(["default"]).pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/hypervSites/{siteName}/machines/{machineName}/softwareInventories/{default}",
    }),
  );
export type HypervSoftwareInventoriesControllerGetMachineSoftwareInventoryInput =
  typeof HypervSoftwareInventoriesControllerGetMachineSoftwareInventoryInput.Type;

// Output Schema
export const HypervSoftwareInventoriesControllerGetMachineSoftwareInventoryOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type HypervSoftwareInventoriesControllerGetMachineSoftwareInventoryOutput =
  typeof HypervSoftwareInventoriesControllerGetMachineSoftwareInventoryOutput.Type;

// The operation
/**
 * Method to get a machines software inventory like applications and roles.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param machineName -  HypervMachine name
 * @param default - Default value.
 */
export const HypervSoftwareInventoriesControllerGetMachineSoftwareInventory =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      HypervSoftwareInventoriesControllerGetMachineSoftwareInventoryInput,
    outputSchema:
      HypervSoftwareInventoriesControllerGetMachineSoftwareInventoryOutput,
  }));
// Input Schema
export const HypervSoftwareInventoriesControllerListByHypervMachineInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    machineName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/hypervSites/{siteName}/machines/{machineName}/softwareinventories",
    }),
  );
export type HypervSoftwareInventoriesControllerListByHypervMachineInput =
  typeof HypervSoftwareInventoriesControllerListByHypervMachineInput.Type;

// Output Schema
export const HypervSoftwareInventoriesControllerListByHypervMachineOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type HypervSoftwareInventoriesControllerListByHypervMachineOutput =
  typeof HypervSoftwareInventoriesControllerListByHypervMachineOutput.Type;

// The operation
/**
 * List HypervVmSoftwareInventory resources by HypervMachine
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param machineName -  HypervMachine name
 */
export const HypervSoftwareInventoriesControllerListByHypervMachine =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: HypervSoftwareInventoriesControllerListByHypervMachineInput,
    outputSchema: HypervSoftwareInventoriesControllerListByHypervMachineOutput,
  }));
// Input Schema
export const IisWebApplicationsControllerGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    webAppSiteName: Schema.String.pipe(T.PathParam()),
    webApplicationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/masterSites/{siteName}/webAppSites/{webAppSiteName}/iisWebApplications/{webApplicationName}",
    }),
  );
export type IisWebApplicationsControllerGetInput =
  typeof IisWebApplicationsControllerGetInput.Type;

// Output Schema
export const IisWebApplicationsControllerGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type IisWebApplicationsControllerGetOutput =
  typeof IisWebApplicationsControllerGetOutput.Type;

// The operation
/**
 * Method to get an IIS web application.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param webAppSiteName - Web app site name.
 * @param webApplicationName - Web application name.
 */
export const IisWebApplicationsControllerGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IisWebApplicationsControllerGetInput,
    outputSchema: IisWebApplicationsControllerGetOutput,
  }));
// Input Schema
export const IisWebApplicationsControllerListByWebAppSiteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    webAppSiteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    filter: Schema.optional(Schema.String),
    top: Schema.optional(Schema.String),
    continuationToken: Schema.optional(Schema.String),
    totalRecordCount: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/masterSites/{siteName}/webAppSites/{webAppSiteName}/iisWebApplications",
    }),
  );
export type IisWebApplicationsControllerListByWebAppSiteInput =
  typeof IisWebApplicationsControllerListByWebAppSiteInput.Type;

// Output Schema
export const IisWebApplicationsControllerListByWebAppSiteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type IisWebApplicationsControllerListByWebAppSiteOutput =
  typeof IisWebApplicationsControllerListByWebAppSiteOutput.Type;

// The operation
/**
 * Method to get all IIS web application.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param filter - filter query
 * @param top - page size  query
 * @param continuationToken - Optional parameter for continuation token.
 * @param totalRecordCount - Total count of machines in the given site.
 * @param siteName - Site name
 * @param webAppSiteName - Web app site name.
 */
export const IisWebApplicationsControllerListByWebAppSite =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IisWebApplicationsControllerListByWebAppSiteInput,
    outputSchema: IisWebApplicationsControllerListByWebAppSiteOutput,
  }));
// Input Schema
export const IisWebApplicationsControllerUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    webAppSiteName: Schema.String.pipe(T.PathParam()),
    webApplicationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/masterSites/{siteName}/webAppSites/{webAppSiteName}/iisWebApplications/{webApplicationName}",
    }),
  );
export type IisWebApplicationsControllerUpdateInput =
  typeof IisWebApplicationsControllerUpdateInput.Type;

// Output Schema
export const IisWebApplicationsControllerUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type IisWebApplicationsControllerUpdateOutput =
  typeof IisWebApplicationsControllerUpdateOutput.Type;

// The operation
/**
 * Method to update tags on IIS web application.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param webAppSiteName - Web app site name.
 * @param webApplicationName - Web application name.
 */
export const IisWebApplicationsControllerUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IisWebApplicationsControllerUpdateInput,
    outputSchema: IisWebApplicationsControllerUpdateOutput,
  }));
// Input Schema
export const IisWebServersControllerGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    webAppSiteName: Schema.String.pipe(T.PathParam()),
    webServerName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/masterSites/{siteName}/webAppSites/{webAppSiteName}/iisWebServers/{webServerName}",
    }),
  );
export type IisWebServersControllerGetInput =
  typeof IisWebServersControllerGetInput.Type;

// Output Schema
export const IisWebServersControllerGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type IisWebServersControllerGetOutput =
  typeof IisWebServersControllerGetOutput.Type;

// The operation
/**
 * Method to get an IIS web server.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param webAppSiteName - Web app site name.
 * @param webServerName - Web server name.
 */
export const IisWebServersControllerGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IisWebServersControllerGetInput,
    outputSchema: IisWebServersControllerGetOutput,
  }),
);
// Input Schema
export const IisWebServersControllerListByWebAppSiteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    webAppSiteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    filter: Schema.optional(Schema.String),
    top: Schema.optional(Schema.String),
    continuationToken: Schema.optional(Schema.String),
    totalRecordCount: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/masterSites/{siteName}/webAppSites/{webAppSiteName}/iisWebServers",
    }),
  );
export type IisWebServersControllerListByWebAppSiteInput =
  typeof IisWebServersControllerListByWebAppSiteInput.Type;

// Output Schema
export const IisWebServersControllerListByWebAppSiteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type IisWebServersControllerListByWebAppSiteOutput =
  typeof IisWebServersControllerListByWebAppSiteOutput.Type;

// The operation
/**
 * Method to get all IIS web servers.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param filter - filter query
 * @param top - page size  query
 * @param continuationToken - Optional parameter for continuation token.
 * @param totalRecordCount - Total count of machines in the given site.
 * @param siteName - Site name
 * @param webAppSiteName - Web app site name.
 */
export const IisWebServersControllerListByWebAppSite =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IisWebServersControllerListByWebAppSiteInput,
    outputSchema: IisWebServersControllerListByWebAppSiteOutput,
  }));
// Input Schema
export const ImportCollectorsOperationsCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    importCollectorName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/importcollectors/{importCollectorName}",
    }),
  );
export type ImportCollectorsOperationsCreateInput =
  typeof ImportCollectorsOperationsCreateInput.Type;

// Output Schema
export const ImportCollectorsOperationsCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ImportCollectorsOperationsCreateOutput =
  typeof ImportCollectorsOperationsCreateOutput.Type;

// The operation
/**
 * Create a ImportCollector
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 * @param importCollectorName - Import collector ARM name
 */
export const ImportCollectorsOperationsCreate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ImportCollectorsOperationsCreateInput,
    outputSchema: ImportCollectorsOperationsCreateOutput,
  }));
// Input Schema
export const ImportCollectorsOperationsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    importCollectorName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/importcollectors/{importCollectorName}",
    }),
  );
export type ImportCollectorsOperationsDeleteInput =
  typeof ImportCollectorsOperationsDeleteInput.Type;

// Output Schema
export const ImportCollectorsOperationsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ImportCollectorsOperationsDeleteOutput =
  typeof ImportCollectorsOperationsDeleteOutput.Type;

// The operation
/**
 * Delete a ImportCollector
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 * @param importCollectorName - Import collector ARM name
 */
export const ImportCollectorsOperationsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ImportCollectorsOperationsDeleteInput,
    outputSchema: ImportCollectorsOperationsDeleteOutput,
  }));
// Input Schema
export const ImportCollectorsOperationsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    importCollectorName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/importcollectors/{importCollectorName}",
    }),
  );
export type ImportCollectorsOperationsGetInput =
  typeof ImportCollectorsOperationsGetInput.Type;

// Output Schema
export const ImportCollectorsOperationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ImportCollectorsOperationsGetOutput =
  typeof ImportCollectorsOperationsGetOutput.Type;

// The operation
/**
 * Get a ImportCollector
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 * @param importCollectorName - Import collector ARM name
 */
export const ImportCollectorsOperationsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ImportCollectorsOperationsGetInput,
    outputSchema: ImportCollectorsOperationsGetOutput,
  }));
// Input Schema
export const ImportCollectorsOperationsListByAssessmentProjectInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/importcollectors",
    }),
  );
export type ImportCollectorsOperationsListByAssessmentProjectInput =
  typeof ImportCollectorsOperationsListByAssessmentProjectInput.Type;

// Output Schema
export const ImportCollectorsOperationsListByAssessmentProjectOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type ImportCollectorsOperationsListByAssessmentProjectOutput =
  typeof ImportCollectorsOperationsListByAssessmentProjectOutput.Type;

// The operation
/**
 * List ImportCollector resources by AssessmentProject
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 */
export const ImportCollectorsOperationsListByAssessmentProject =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ImportCollectorsOperationsListByAssessmentProjectInput,
    outputSchema: ImportCollectorsOperationsListByAssessmentProjectOutput,
  }));
// Input Schema
export const ImportJobsControllerGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    jobName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/importSites/{siteName}/jobs/{jobName}",
    }),
  );
export type ImportJobsControllerGetInput =
  typeof ImportJobsControllerGetInput.Type;

// Output Schema
export const ImportJobsControllerGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ImportJobsControllerGetOutput =
  typeof ImportJobsControllerGetOutput.Type;

// The operation
/**
 * Get a ImportJob
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param jobName -  Jobs name
 */
export const ImportJobsControllerGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ImportJobsControllerGetInput,
    outputSchema: ImportJobsControllerGetOutput,
  }),
);
// Input Schema
export const ImportJobsControllerGetDeletejobInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    jobName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/importSites/{siteName}/deleteJobs/{jobName}",
    }),
  );
export type ImportJobsControllerGetDeletejobInput =
  typeof ImportJobsControllerGetDeletejobInput.Type;

// Output Schema
export const ImportJobsControllerGetDeletejobOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ImportJobsControllerGetDeletejobOutput =
  typeof ImportJobsControllerGetDeletejobOutput.Type;

// The operation
/**
 * Gets the delete imported machines job with the given job name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param jobName - Job Arm Name.
 */
export const ImportJobsControllerGetDeletejob =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ImportJobsControllerGetDeletejobInput,
    outputSchema: ImportJobsControllerGetDeletejobOutput,
  }));
// Input Schema
export const ImportJobsControllerGetExportjobInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    jobName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/importSites/{siteName}/exportJobs/{jobName}",
    }),
  );
export type ImportJobsControllerGetExportjobInput =
  typeof ImportJobsControllerGetExportjobInput.Type;

// Output Schema
export const ImportJobsControllerGetExportjobOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    type: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        blobName: Schema.optional(Schema.String),
        sasUri: Schema.optional(Schema.String),
      }),
    ),
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    status: Schema.optional(Schema.String),
    startTime: Schema.optional(Schema.String),
    endTime: Schema.optional(Schema.String),
    displayName: Schema.optional(Schema.String),
  });
export type ImportJobsControllerGetExportjobOutput =
  typeof ImportJobsControllerGetExportjobOutput.Type;

// The operation
/**
 * Gets the export imported machines job with the given job name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param jobName - Job Arm Name.
 */
export const ImportJobsControllerGetExportjob =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ImportJobsControllerGetExportjobInput,
    outputSchema: ImportJobsControllerGetExportjobOutput,
  }));
// Input Schema
export const ImportJobsControllerGetImportjobInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    jobName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/importSites/{siteName}/importJobs/{jobName}",
    }),
  );
export type ImportJobsControllerGetImportjobInput =
  typeof ImportJobsControllerGetImportjobInput.Type;

// Output Schema
export const ImportJobsControllerGetImportjobOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    type: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        blobName: Schema.optional(Schema.String),
        blobSasUri: Schema.optional(Schema.String),
        jobResult: Schema.optional(
          Schema.Literals([
            "Unknown",
            "Completed",
            "CompletedWithWarnings",
            "CompletedWithErrors",
            "Failed",
            "WaitingForBlobUpload",
            "InProgress",
          ]),
        ),
        numberOfMachinesImported: Schema.optional(Schema.Number),
        blobCreationTimeStamp: Schema.optional(Schema.String),
        errorSummary: Schema.optional(
          Schema.Struct({
            errors: Schema.optional(Schema.Array(Schema.String)),
            errorCount: Schema.optional(Schema.Number),
            warningCount: Schema.optional(Schema.Number),
          }),
        ),
      }),
    ),
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    status: Schema.optional(Schema.String),
    startTime: Schema.optional(Schema.String),
    endTime: Schema.optional(Schema.String),
    displayName: Schema.optional(Schema.String),
  });
export type ImportJobsControllerGetImportjobOutput =
  typeof ImportJobsControllerGetImportjobOutput.Type;

// The operation
/**
 * Gets the import job with the given job name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param jobName - Job Arm Name.
 */
export const ImportJobsControllerGetImportjob =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ImportJobsControllerGetImportjobInput,
    outputSchema: ImportJobsControllerGetImportjobOutput,
  }));
// Input Schema
export const ImportJobsControllerListByImportSiteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/importSites/{siteName}/jobs",
    }),
  );
export type ImportJobsControllerListByImportSiteInput =
  typeof ImportJobsControllerListByImportSiteInput.Type;

// Output Schema
export const ImportJobsControllerListByImportSiteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type ImportJobsControllerListByImportSiteOutput =
  typeof ImportJobsControllerListByImportSiteOutput.Type;

// The operation
/**
 * List ImportJob resources by ImportSite
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const ImportJobsControllerListByImportSite =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ImportJobsControllerListByImportSiteInput,
    outputSchema: ImportJobsControllerListByImportSiteOutput,
  }));
// Input Schema
export const ImportJobsControllerListDeletejobsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/importSites/{siteName}/deleteJobs",
    }),
  );
export type ImportJobsControllerListDeletejobsInput =
  typeof ImportJobsControllerListDeletejobsInput.Type;

// Output Schema
export const ImportJobsControllerListDeletejobsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ImportJobsControllerListDeletejobsOutput =
  typeof ImportJobsControllerListDeletejobsOutput.Type;

// The operation
/**
 * Method to get all delete import machines job for the given site.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const ImportJobsControllerListDeletejobs =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ImportJobsControllerListDeletejobsInput,
    outputSchema: ImportJobsControllerListDeletejobsOutput,
  }));
// Input Schema
export const ImportJobsControllerListExportjobsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/importSites/{siteName}/exportJobs",
    }),
  );
export type ImportJobsControllerListExportjobsInput =
  typeof ImportJobsControllerListExportjobsInput.Type;

// Output Schema
export const ImportJobsControllerListExportjobsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          type: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Struct({
              blobName: Schema.optional(Schema.String),
              sasUri: Schema.optional(Schema.String),
            }),
          ),
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          status: Schema.optional(Schema.String),
          startTime: Schema.optional(Schema.String),
          endTime: Schema.optional(Schema.String),
          displayName: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ImportJobsControllerListExportjobsOutput =
  typeof ImportJobsControllerListExportjobsOutput.Type;

// The operation
/**
 * Method to get all export import machines job for the given site.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const ImportJobsControllerListExportjobs =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ImportJobsControllerListExportjobsInput,
    outputSchema: ImportJobsControllerListExportjobsOutput,
  }));
// Input Schema
export const ImportJobsControllerListImportjobsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/importSites/{siteName}/importJobs",
    }),
  );
export type ImportJobsControllerListImportjobsInput =
  typeof ImportJobsControllerListImportjobsInput.Type;

// Output Schema
export const ImportJobsControllerListImportjobsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          type: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Struct({
              blobName: Schema.optional(Schema.String),
              blobSasUri: Schema.optional(Schema.String),
              jobResult: Schema.optional(
                Schema.Literals([
                  "Unknown",
                  "Completed",
                  "CompletedWithWarnings",
                  "CompletedWithErrors",
                  "Failed",
                  "WaitingForBlobUpload",
                  "InProgress",
                ]),
              ),
              numberOfMachinesImported: Schema.optional(Schema.Number),
              blobCreationTimeStamp: Schema.optional(Schema.String),
              errorSummary: Schema.optional(
                Schema.Struct({
                  errors: Schema.optional(Schema.Array(Schema.String)),
                  errorCount: Schema.optional(Schema.Number),
                  warningCount: Schema.optional(Schema.Number),
                }),
              ),
            }),
          ),
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          status: Schema.optional(Schema.String),
          startTime: Schema.optional(Schema.String),
          endTime: Schema.optional(Schema.String),
          displayName: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ImportJobsControllerListImportjobsOutput =
  typeof ImportJobsControllerListImportjobsOutput.Type;

// The operation
/**
 * Method to get all import machines job for the given site.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const ImportJobsControllerListImportjobs =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ImportJobsControllerListImportjobsInput,
    outputSchema: ImportJobsControllerListImportjobsOutput,
  }));
// Input Schema
export const ImportMachinesControllerDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    machineName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/importSites/{siteName}/machines/{machineName}",
    }),
  );
export type ImportMachinesControllerDeleteInput =
  typeof ImportMachinesControllerDeleteInput.Type;

// Output Schema
export const ImportMachinesControllerDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ImportMachinesControllerDeleteOutput =
  typeof ImportMachinesControllerDeleteOutput.Type;

// The operation
/**
 * Delete a ImportMachine
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param machineName - Machine name
 */
export const ImportMachinesControllerDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ImportMachinesControllerDeleteInput,
    outputSchema: ImportMachinesControllerDeleteOutput,
  }));
// Input Schema
export const ImportMachinesControllerGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    machineName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/importSites/{siteName}/machines/{machineName}",
    }),
  );
export type ImportMachinesControllerGetInput =
  typeof ImportMachinesControllerGetInput.Type;

// Output Schema
export const ImportMachinesControllerGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ImportMachinesControllerGetOutput =
  typeof ImportMachinesControllerGetOutput.Type;

// The operation
/**
 * Get a ImportMachine
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param machineName - Machine name
 */
export const ImportMachinesControllerGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ImportMachinesControllerGetInput,
    outputSchema: ImportMachinesControllerGetOutput,
  }),
);
// Input Schema
export const ImportMachinesControllerListByImportSiteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    filter: Schema.optional(Schema.String),
    top: Schema.optional(Schema.String),
    continuationToken: Schema.optional(Schema.String),
    totalRecordCount: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/importSites/{siteName}/machines",
    }),
  );
export type ImportMachinesControllerListByImportSiteInput =
  typeof ImportMachinesControllerListByImportSiteInput.Type;

// Output Schema
export const ImportMachinesControllerListByImportSiteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type ImportMachinesControllerListByImportSiteOutput =
  typeof ImportMachinesControllerListByImportSiteOutput.Type;

// The operation
/**
 * List ImportMachine resources by ImportSite
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param filter - filter query
 * @param top - page size  query
 * @param continuationToken - Optional parameter for continuation token.
 * @param totalRecordCount - Total count of machines in the given site.
 * @param siteName - Site name
 */
export const ImportMachinesControllerListByImportSite =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ImportMachinesControllerListByImportSiteInput,
    outputSchema: ImportMachinesControllerListByImportSiteOutput,
  }));
// Input Schema
export const ImportSitesControllerCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/importSites/{siteName}",
    }),
  );
export type ImportSitesControllerCreateInput =
  typeof ImportSitesControllerCreateInput.Type;

// Output Schema
export const ImportSitesControllerCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ImportSitesControllerCreateOutput =
  typeof ImportSitesControllerCreateOutput.Type;

// The operation
/**
 * Create a ImportSite
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const ImportSitesControllerCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ImportSitesControllerCreateInput,
    outputSchema: ImportSitesControllerCreateOutput,
  }),
);
// Input Schema
export const ImportSitesControllerDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/importSites/{siteName}",
    }),
  );
export type ImportSitesControllerDeleteInput =
  typeof ImportSitesControllerDeleteInput.Type;

// Output Schema
export const ImportSitesControllerDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ImportSitesControllerDeleteOutput =
  typeof ImportSitesControllerDeleteOutput.Type;

// The operation
/**
 * Delete a ImportSite
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const ImportSitesControllerDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ImportSitesControllerDeleteInput,
    outputSchema: ImportSitesControllerDeleteOutput,
  }),
);
// Input Schema
export const ImportSitesControllerDeleteImportedMachinesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/importSites/{siteName}/deleteImportedMachines",
    }),
  );
export type ImportSitesControllerDeleteImportedMachinesInput =
  typeof ImportSitesControllerDeleteImportedMachinesInput.Type;

// Output Schema
export const ImportSitesControllerDeleteImportedMachinesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    jobArmId: Schema.optional(Schema.String),
    uri: Schema.optional(Schema.String),
  });
export type ImportSitesControllerDeleteImportedMachinesOutput =
  typeof ImportSitesControllerDeleteImportedMachinesOutput.Type;

// The operation
/**
 * Deletes the imported machines for site.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const ImportSitesControllerDeleteImportedMachines =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ImportSitesControllerDeleteImportedMachinesInput,
    outputSchema: ImportSitesControllerDeleteImportedMachinesOutput,
  }));
// Input Schema
export const ImportSitesControllerExportUriInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/importSites/{siteName}/exportUri",
    }),
  );
export type ImportSitesControllerExportUriInput =
  typeof ImportSitesControllerExportUriInput.Type;

// Output Schema
export const ImportSitesControllerExportUriOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    jobArmId: Schema.optional(Schema.String),
    uri: Schema.optional(Schema.String),
  });
export type ImportSitesControllerExportUriOutput =
  typeof ImportSitesControllerExportUriOutput.Type;

// The operation
/**
 * Method to export  a site.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const ImportSitesControllerExportUri =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ImportSitesControllerExportUriInput,
    outputSchema: ImportSitesControllerExportUriOutput,
  }));
// Input Schema
export const ImportSitesControllerGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/importSites/{siteName}",
    }),
  );
export type ImportSitesControllerGetInput =
  typeof ImportSitesControllerGetInput.Type;

// Output Schema
export const ImportSitesControllerGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ImportSitesControllerGetOutput =
  typeof ImportSitesControllerGetOutput.Type;

// The operation
/**
 * Get a ImportSite
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const ImportSitesControllerGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ImportSitesControllerGetInput,
    outputSchema: ImportSitesControllerGetOutput,
  }),
);
// Input Schema
export const ImportSitesControllerImportUriInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/importSites/{siteName}/importUri",
    }),
  );
export type ImportSitesControllerImportUriInput =
  typeof ImportSitesControllerImportUriInput.Type;

// Output Schema
export const ImportSitesControllerImportUriOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    jobArmId: Schema.optional(Schema.String),
    uri: Schema.optional(Schema.String),
  });
export type ImportSitesControllerImportUriOutput =
  typeof ImportSitesControllerImportUriOutput.Type;

// The operation
/**
 * Method to import a site.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const ImportSitesControllerImportUri =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ImportSitesControllerImportUriInput,
    outputSchema: ImportSitesControllerImportUriOutput,
  }));
// Input Schema
export const ImportSitesControllerListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/importSites",
    }),
  );
export type ImportSitesControllerListByResourceGroupInput =
  typeof ImportSitesControllerListByResourceGroupInput.Type;

// Output Schema
export const ImportSitesControllerListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ImportSitesControllerListByResourceGroupOutput =
  typeof ImportSitesControllerListByResourceGroupOutput.Type;

// The operation
/**
 * Get all import sites.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ImportSitesControllerListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ImportSitesControllerListByResourceGroupInput,
    outputSchema: ImportSitesControllerListByResourceGroupOutput,
  }));
// Input Schema
export const ImportSitesControllerListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.OffAzure/importSites",
    }),
  );
export type ImportSitesControllerListBySubscriptionInput =
  typeof ImportSitesControllerListBySubscriptionInput.Type;

// Output Schema
export const ImportSitesControllerListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ImportSitesControllerListBySubscriptionOutput =
  typeof ImportSitesControllerListBySubscriptionOutput.Type;

// The operation
/**
 * List ImportSite resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const ImportSitesControllerListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ImportSitesControllerListBySubscriptionInput,
    outputSchema: ImportSitesControllerListBySubscriptionOutput,
  }));
// Input Schema
export const ImportSitesControllerUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/importSites/{siteName}",
    }),
  );
export type ImportSitesControllerUpdateInput =
  typeof ImportSitesControllerUpdateInput.Type;

// Output Schema
export const ImportSitesControllerUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ImportSitesControllerUpdateOutput =
  typeof ImportSitesControllerUpdateOutput.Type;

// The operation
/**
 * Update a ImportSite
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const ImportSitesControllerUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ImportSitesControllerUpdateInput,
    outputSchema: ImportSitesControllerUpdateOutput,
  }),
);
// Input Schema
export const MachinesControllerGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    machineName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/vmwareSites/{siteName}/machines/{machineName}",
    }),
  );
export type MachinesControllerGetInput = typeof MachinesControllerGetInput.Type;

// Output Schema
export const MachinesControllerGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type MachinesControllerGetOutput =
  typeof MachinesControllerGetOutput.Type;

// The operation
/**
 * Get a MachineResource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param machineName - Machine name
 */
export const MachinesControllerGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: MachinesControllerGetInput,
    outputSchema: MachinesControllerGetOutput,
  }),
);
// Input Schema
export const MachinesControllerGetMachineInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/migrateProjects/{migrateProjectName}/machines/{machineName}",
    }),
  );
export type MachinesControllerGetMachineInput =
  typeof MachinesControllerGetMachineInput.Type;

// Output Schema
export const MachinesControllerGetMachineOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        discoveryData: Schema.optional(
          Schema.Array(
            Schema.Struct({
              id: Schema.optional(Schema.String),
              osType: Schema.optional(Schema.String),
              osName: Schema.optional(Schema.String),
              osVersion: Schema.optional(Schema.String),
              enqueueTime: Schema.optional(Schema.String),
              solutionName: Schema.optional(Schema.String),
              machineId: Schema.optional(Schema.String),
              machineManagerId: Schema.optional(Schema.String),
              fabricType: Schema.optional(Schema.String),
              lastUpdatedTime: Schema.optional(Schema.String),
              machineName: Schema.optional(Schema.String),
              ipAddresses: Schema.optional(Schema.Array(Schema.String)),
              fqdn: Schema.optional(Schema.String),
              biosId: Schema.optional(Schema.String),
              macAddresses: Schema.optional(Schema.Array(Schema.String)),
              extendedInfo: Schema.optional(
                Schema.Record(Schema.String, Schema.String),
              ),
            }),
          ),
        ),
        assessmentData: Schema.optional(
          Schema.Array(
            Schema.Struct({
              id: Schema.optional(Schema.String),
              assessmentId: Schema.optional(Schema.String),
              targetVMSize: Schema.optional(Schema.String),
              targetVMLocation: Schema.optional(Schema.String),
              targetStorageType: Schema.optional(
                Schema.Record(Schema.String, Schema.String),
              ),
              enqueueTime: Schema.optional(Schema.String),
              solutionName: Schema.optional(Schema.String),
              machineId: Schema.optional(Schema.String),
              machineManagerId: Schema.optional(Schema.String),
              fabricType: Schema.optional(Schema.String),
              lastUpdatedTime: Schema.optional(Schema.String),
              machineName: Schema.optional(Schema.String),
              ipAddresses: Schema.optional(Schema.Array(Schema.String)),
              fqdn: Schema.optional(Schema.String),
              biosId: Schema.optional(Schema.String),
              macAddresses: Schema.optional(Schema.Array(Schema.String)),
              extendedInfo: Schema.optional(
                Schema.Record(Schema.String, Schema.String),
              ),
            }),
          ),
        ),
        migrationData: Schema.optional(
          Schema.Array(
            Schema.Struct({
              id: Schema.optional(Schema.String),
              migrationPhase: Schema.optional(Schema.String),
              migrationTested: Schema.optional(Schema.Boolean),
              replicationProgressPercentage: Schema.optional(Schema.Number),
              targetVMArmId: Schema.optional(Schema.String),
              enqueueTime: Schema.optional(Schema.String),
              solutionName: Schema.optional(Schema.String),
              machineId: Schema.optional(Schema.String),
              machineManagerId: Schema.optional(Schema.String),
              fabricType: Schema.optional(Schema.String),
              lastUpdatedTime: Schema.optional(Schema.String),
              machineName: Schema.optional(Schema.String),
              ipAddresses: Schema.optional(Schema.Array(Schema.String)),
              fqdn: Schema.optional(Schema.String),
              biosId: Schema.optional(Schema.String),
              macAddresses: Schema.optional(Schema.Array(Schema.String)),
              extendedInfo: Schema.optional(
                Schema.Record(Schema.String, Schema.String),
              ),
            }),
          ),
        ),
        lastUpdatedTime: Schema.optional(Schema.String),
      }),
    ),
  });
export type MachinesControllerGetMachineOutput =
  typeof MachinesControllerGetMachineOutput.Type;

// The operation
/**
 * Gets a machine in the migrate project.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const MachinesControllerGetMachine =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MachinesControllerGetMachineInput,
    outputSchema: MachinesControllerGetMachineOutput,
  }));
// Input Schema
export const MachinesControllerListByVmwareSiteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    filter: Schema.optional(Schema.String),
    top: Schema.optional(Schema.Number),
    continuationToken: Schema.optional(Schema.String),
    totalRecordCount: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/vmwareSites/{siteName}/machines",
    }),
  );
export type MachinesControllerListByVmwareSiteInput =
  typeof MachinesControllerListByVmwareSiteInput.Type;

// Output Schema
export const MachinesControllerListByVmwareSiteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type MachinesControllerListByVmwareSiteOutput =
  typeof MachinesControllerListByVmwareSiteOutput.Type;

// The operation
/**
 * List MachineResource resources by VmwareSite
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param filter - filter query
 * @param top - page size  query
 * @param continuationToken - Optional parameter for continuation token.
 * @param totalRecordCount - Total count of machines in the given site.
 * @param siteName - Site name
 */
export const MachinesControllerListByVmwareSite =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MachinesControllerListByVmwareSiteInput,
    outputSchema: MachinesControllerListByVmwareSiteOutput,
  }));
// Input Schema
export const MachinesControllerListMachinesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/migrateProjects/{migrateProjectName}/machines",
    }),
  );
export type MachinesControllerListMachinesInput =
  typeof MachinesControllerListMachinesInput.Type;

// Output Schema
export const MachinesControllerListMachinesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Struct({
              discoveryData: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    id: Schema.optional(Schema.String),
                    osType: Schema.optional(Schema.String),
                    osName: Schema.optional(Schema.String),
                    osVersion: Schema.optional(Schema.String),
                    enqueueTime: Schema.optional(Schema.String),
                    solutionName: Schema.optional(Schema.String),
                    machineId: Schema.optional(Schema.String),
                    machineManagerId: Schema.optional(Schema.String),
                    fabricType: Schema.optional(Schema.String),
                    lastUpdatedTime: Schema.optional(Schema.String),
                    machineName: Schema.optional(Schema.String),
                    ipAddresses: Schema.optional(Schema.Array(Schema.String)),
                    fqdn: Schema.optional(Schema.String),
                    biosId: Schema.optional(Schema.String),
                    macAddresses: Schema.optional(Schema.Array(Schema.String)),
                    extendedInfo: Schema.optional(
                      Schema.Record(Schema.String, Schema.String),
                    ),
                  }),
                ),
              ),
              assessmentData: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    id: Schema.optional(Schema.String),
                    assessmentId: Schema.optional(Schema.String),
                    targetVMSize: Schema.optional(Schema.String),
                    targetVMLocation: Schema.optional(Schema.String),
                    targetStorageType: Schema.optional(
                      Schema.Record(Schema.String, Schema.String),
                    ),
                    enqueueTime: Schema.optional(Schema.String),
                    solutionName: Schema.optional(Schema.String),
                    machineId: Schema.optional(Schema.String),
                    machineManagerId: Schema.optional(Schema.String),
                    fabricType: Schema.optional(Schema.String),
                    lastUpdatedTime: Schema.optional(Schema.String),
                    machineName: Schema.optional(Schema.String),
                    ipAddresses: Schema.optional(Schema.Array(Schema.String)),
                    fqdn: Schema.optional(Schema.String),
                    biosId: Schema.optional(Schema.String),
                    macAddresses: Schema.optional(Schema.Array(Schema.String)),
                    extendedInfo: Schema.optional(
                      Schema.Record(Schema.String, Schema.String),
                    ),
                  }),
                ),
              ),
              migrationData: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    id: Schema.optional(Schema.String),
                    migrationPhase: Schema.optional(Schema.String),
                    migrationTested: Schema.optional(Schema.Boolean),
                    replicationProgressPercentage: Schema.optional(
                      Schema.Number,
                    ),
                    targetVMArmId: Schema.optional(Schema.String),
                    enqueueTime: Schema.optional(Schema.String),
                    solutionName: Schema.optional(Schema.String),
                    machineId: Schema.optional(Schema.String),
                    machineManagerId: Schema.optional(Schema.String),
                    fabricType: Schema.optional(Schema.String),
                    lastUpdatedTime: Schema.optional(Schema.String),
                    machineName: Schema.optional(Schema.String),
                    ipAddresses: Schema.optional(Schema.Array(Schema.String)),
                    fqdn: Schema.optional(Schema.String),
                    biosId: Schema.optional(Schema.String),
                    macAddresses: Schema.optional(Schema.Array(Schema.String)),
                    extendedInfo: Schema.optional(
                      Schema.Record(Schema.String, Schema.String),
                    ),
                  }),
                ),
              ),
              lastUpdatedTime: Schema.optional(Schema.String),
            }),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type MachinesControllerListMachinesOutput =
  typeof MachinesControllerListMachinesOutput.Type;

// The operation
/**
 * Gets a list of machines in the migrate project.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const MachinesControllerListMachines =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MachinesControllerListMachinesInput,
    outputSchema: MachinesControllerListMachinesOutput,
  }));
// Input Schema
export const MachinesControllerStartInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    machineName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/vmwareSites/{siteName}/machines/{machineName}/start",
    }),
  );
export type MachinesControllerStartInput =
  typeof MachinesControllerStartInput.Type;

// Output Schema
export const MachinesControllerStartOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown;
export type MachinesControllerStartOutput =
  typeof MachinesControllerStartOutput.Type;

// The operation
/**
 * Method to start a machine.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param machineName - Machine name
 */
export const MachinesControllerStart = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: MachinesControllerStartInput,
    outputSchema: MachinesControllerStartOutput,
  }),
);
// Input Schema
export const MachinesControllerStopInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    machineName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/vmwareSites/{siteName}/machines/{machineName}/stop",
    }),
  );
export type MachinesControllerStopInput =
  typeof MachinesControllerStopInput.Type;

// Output Schema
export const MachinesControllerStopOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown;
export type MachinesControllerStopOutput =
  typeof MachinesControllerStopOutput.Type;

// The operation
/**
 * Method to stop a machine.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param machineName - Machine name
 */
export const MachinesControllerStop = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: MachinesControllerStopInput,
    outputSchema: MachinesControllerStopOutput,
  }),
);
// Input Schema
export const MachinesControllerUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    machineName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/vmwareSites/{siteName}/machines/{machineName}",
    }),
  );
export type MachinesControllerUpdateInput =
  typeof MachinesControllerUpdateInput.Type;

// Output Schema
export const MachinesControllerUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type MachinesControllerUpdateOutput =
  typeof MachinesControllerUpdateOutput.Type;

// The operation
/**
 * Update a MachineResource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param machineName - Machine name
 */
export const MachinesControllerUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: MachinesControllerUpdateInput,
    outputSchema: MachinesControllerUpdateOutput,
  }),
);
// Input Schema
export const MachinesOperationsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    machineName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/machines/{machineName}",
    }),
  );
export type MachinesOperationsGetInput = typeof MachinesOperationsGetInput.Type;

// Output Schema
export const MachinesOperationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type MachinesOperationsGetOutput =
  typeof MachinesOperationsGetOutput.Type;

// The operation
/**
 * Get a Machine
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 * @param machineName - Assessible Machine ARM name
 */
export const MachinesOperationsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: MachinesOperationsGetInput,
    outputSchema: MachinesOperationsGetOutput,
  }),
);
// Input Schema
export const MachinesOperationsListByAssessmentProjectInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $filter: Schema.optional(Schema.String),
    pageSize: Schema.optional(Schema.Number),
    continuationToken: Schema.optional(Schema.String),
    totalRecordCount: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/machines",
    }),
  );
export type MachinesOperationsListByAssessmentProjectInput =
  typeof MachinesOperationsListByAssessmentProjectInput.Type;

// Output Schema
export const MachinesOperationsListByAssessmentProjectOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type MachinesOperationsListByAssessmentProjectOutput =
  typeof MachinesOperationsListByAssessmentProjectOutput.Type;

// The operation
/**
 * List Machine resources by AssessmentProject
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param $filter - Filter query.
 * @param pageSize - Optional parameter for page size.
 * @param continuationToken - Optional parameter for continuation token.
 * @param totalRecordCount - Total record count.
 * @param projectName - Assessment Project Name
 */
export const MachinesOperationsListByAssessmentProject =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MachinesOperationsListByAssessmentProjectInput,
    outputSchema: MachinesOperationsListByAssessmentProjectOutput,
  }));
// Input Schema
export const MasterSitesControllerCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/masterSites/{siteName}",
    }),
  );
export type MasterSitesControllerCreateInput =
  typeof MasterSitesControllerCreateInput.Type;

// Output Schema
export const MasterSitesControllerCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type MasterSitesControllerCreateOutput =
  typeof MasterSitesControllerCreateOutput.Type;

// The operation
/**
 * Method to create or update a site.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const MasterSitesControllerCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: MasterSitesControllerCreateInput,
    outputSchema: MasterSitesControllerCreateOutput,
  }),
);
// Input Schema
export const MasterSitesControllerDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/masterSites/{siteName}",
    }),
  );
export type MasterSitesControllerDeleteInput =
  typeof MasterSitesControllerDeleteInput.Type;

// Output Schema
export const MasterSitesControllerDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type MasterSitesControllerDeleteOutput =
  typeof MasterSitesControllerDeleteOutput.Type;

// The operation
/**
 * Method to delete a site.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const MasterSitesControllerDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: MasterSitesControllerDeleteInput,
    outputSchema: MasterSitesControllerDeleteOutput,
  }),
);
// Input Schema
export const MasterSitesControllerErrorSummaryInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/masterSites/{siteName}/errorSummary",
    }),
  );
export type MasterSitesControllerErrorSummaryInput =
  typeof MasterSitesControllerErrorSummaryInput.Type;

// Output Schema
export const MasterSitesControllerErrorSummaryOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    applianceName: Schema.String,
    discoveryScopeErrorSummaries: Schema.Struct({
      affectedResourceType: Schema.String,
      affectedObjectsCount: Schema.Number,
      discoveryScope: Schema.Literals([
        "AppsAndRoles",
        "DependencyMap",
        "StaticData",
        "SQLServerConnectionInfo",
      ]),
    }),
    nextLink: Schema.optional(Schema.String),
  });
export type MasterSitesControllerErrorSummaryOutput =
  typeof MasterSitesControllerErrorSummaryOutput.Type;

// The operation
/**
 * Method to get error summary from master site for an appliance.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const MasterSitesControllerErrorSummary =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MasterSitesControllerErrorSummaryInput,
    outputSchema: MasterSitesControllerErrorSummaryOutput,
  }));
// Input Schema
export const MasterSitesControllerGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/masterSites/{siteName}",
    }),
  );
export type MasterSitesControllerGetInput =
  typeof MasterSitesControllerGetInput.Type;

// Output Schema
export const MasterSitesControllerGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type MasterSitesControllerGetOutput =
  typeof MasterSitesControllerGetOutput.Type;

// The operation
/**
 * Method to get a master site.
 *
 * Get a MasterSite
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const MasterSitesControllerGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: MasterSitesControllerGetInput,
    outputSchema: MasterSitesControllerGetOutput,
  }),
);
// Input Schema
export const MasterSitesControllerListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/masterSites",
    }),
  );
export type MasterSitesControllerListByResourceGroupInput =
  typeof MasterSitesControllerListByResourceGroupInput.Type;

// Output Schema
export const MasterSitesControllerListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type MasterSitesControllerListByResourceGroupOutput =
  typeof MasterSitesControllerListByResourceGroupOutput.Type;

// The operation
/**
 * Get all sites.
 *
 * Get all the sites in the resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const MasterSitesControllerListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MasterSitesControllerListByResourceGroupInput,
    outputSchema: MasterSitesControllerListByResourceGroupOutput,
  }));
// Input Schema
export const MasterSitesControllerListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.OffAzure/masterSites",
    }),
  );
export type MasterSitesControllerListBySubscriptionInput =
  typeof MasterSitesControllerListBySubscriptionInput.Type;

// Output Schema
export const MasterSitesControllerListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type MasterSitesControllerListBySubscriptionOutput =
  typeof MasterSitesControllerListBySubscriptionOutput.Type;

// The operation
/**
 * Get all the sites in the subscription.
 *
 * List MasterSite resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const MasterSitesControllerListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MasterSitesControllerListBySubscriptionInput,
    outputSchema: MasterSitesControllerListBySubscriptionOutput,
  }));
// Input Schema
export const MasterSitesControllerUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/masterSites/{siteName}",
    }),
  );
export type MasterSitesControllerUpdateInput =
  typeof MasterSitesControllerUpdateInput.Type;

// Output Schema
export const MasterSitesControllerUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type MasterSitesControllerUpdateOutput =
  typeof MasterSitesControllerUpdateOutput.Type;

// The operation
/**
 * Method to update an existing site.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const MasterSitesControllerUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: MasterSitesControllerUpdateInput,
    outputSchema: MasterSitesControllerUpdateOutput,
  }),
);
// Input Schema
export const MasterSitesOperationsStatusControllerGetVmwareOperationStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    operationStatusName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/masterSites/{siteName}/operationsStatus/{operationStatusName}",
    }),
  );
export type MasterSitesOperationsStatusControllerGetVmwareOperationStatusInput =
  typeof MasterSitesOperationsStatusControllerGetVmwareOperationStatusInput.Type;

// Output Schema
export const MasterSitesOperationsStatusControllerGetVmwareOperationStatusOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    status: Schema.optional(Schema.String),
    startTime: Schema.optional(Schema.String),
    endTime: Schema.optional(Schema.String),
    error: Schema.optional(
      Schema.Struct({
        code: Schema.optional(Schema.String),
        message: Schema.optional(Schema.String),
      }),
    ),
    properties: Schema.optional(
      Schema.Struct({
        result: Schema.optional(Schema.String),
      }),
    ),
  });
export type MasterSitesOperationsStatusControllerGetVmwareOperationStatusOutput =
  typeof MasterSitesOperationsStatusControllerGetVmwareOperationStatusOutput.Type;

// The operation
/**
 * A operation status resource belonging to a master site resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param operationStatusName - Operation status  Arm Name.
 */
export const MasterSitesOperationsStatusControllerGetVmwareOperationStatus =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      MasterSitesOperationsStatusControllerGetVmwareOperationStatusInput,
    outputSchema:
      MasterSitesOperationsStatusControllerGetVmwareOperationStatusOutput,
  }));
// Input Schema
export const MigrateProjectsControllerDeleteMigrateProjectInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/migrateProjects/{migrateProjectName}",
    }),
  );
export type MigrateProjectsControllerDeleteMigrateProjectInput =
  typeof MigrateProjectsControllerDeleteMigrateProjectInput.Type;

// Output Schema
export const MigrateProjectsControllerDeleteMigrateProjectOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type MigrateProjectsControllerDeleteMigrateProjectOutput =
  typeof MigrateProjectsControllerDeleteMigrateProjectOutput.Type;

// The operation
/**
 * Delete the project
 *
 * Delete the migrate project. It deletes summary of the project.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const MigrateProjectsControllerDeleteMigrateProject =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MigrateProjectsControllerDeleteMigrateProjectInput,
    outputSchema: MigrateProjectsControllerDeleteMigrateProjectOutput,
  }));
// Input Schema
export const MigrateProjectsControllerGetMigrateProjectInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/migrateProjects/{migrateProjectName}",
    }),
  );
export type MigrateProjectsControllerGetMigrateProjectInput =
  typeof MigrateProjectsControllerGetMigrateProjectInput.Type;

// Output Schema
export const MigrateProjectsControllerGetMigrateProjectOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    properties: Schema.optional(
      Schema.Struct({
        registeredTools: Schema.optional(
          Schema.Array(
            Schema.Literals([
              "ServerDiscovery",
              "ServerAssessment",
              "ServerMigration",
              "Cloudamize",
              "Turbonomic",
              "Zerto",
              "CorentTech",
              "ServerAssessmentV1",
              "ServerMigration_Replication",
              "Carbonite",
              "DataMigrationAssistant",
              "DatabaseMigrationService",
              "Device42",
              "JetStream",
              "RackWare",
              "UnifyCloud",
              "Flexera",
              "ServerDiscovery_Import",
              "Lakeside",
              "AppServiceMigrationAssistant",
              "Movere",
              "CloudSphere",
              "Modernization",
              "ServerMigration_DataReplication",
              "Unknown",
            ]),
          ),
        ),
        serviceEndpoint: Schema.optional(Schema.String),
        summary: Schema.optional(
          Schema.Record(
            Schema.String,
            Schema.Struct({
              instanceType: Schema.optional(Schema.String),
              refreshSummaryState: Schema.optional(
                Schema.Literals([
                  "Started",
                  "InProgress",
                  "Completed",
                  "Failed",
                ]),
              ),
              lastSummaryRefreshedTime: Schema.optional(Schema.String),
              extendedSummary: Schema.optional(
                Schema.Record(Schema.String, Schema.String),
              ),
            }),
          ),
        ),
        lastSummaryRefreshedTime: Schema.optional(Schema.String),
        refreshSummaryState: Schema.optional(
          Schema.Literals(["Started", "InProgress", "Completed", "Failed"]),
        ),
        utilityStorageAccountId: Schema.optional(Schema.String),
        publicNetworkAccess: Schema.optional(
          Schema.Literals(["NotSpecified", "Enabled", "Disabled"]),
        ),
        privateEndpointConnections: Schema.optional(
          Schema.Array(
            Schema.Struct({
              id: Schema.optional(Schema.String),
              name: Schema.optional(Schema.String),
              type: Schema.optional(Schema.String),
              eTag: Schema.optional(Schema.String),
              properties: Schema.optional(
                Schema.Struct({
                  provisioningState: Schema.optional(
                    Schema.Literals([
                      "Accepted",
                      "InProgress",
                      "Succeeded",
                      "Failed",
                      "Canceled",
                    ]),
                  ),
                  privateEndpoint: Schema.optional(
                    Schema.Struct({
                      id: Schema.optional(Schema.String),
                    }),
                  ),
                  privateLinkServiceConnectionState: Schema.optional(
                    Schema.Struct({
                      status: Schema.optional(
                        Schema.Literals([
                          "Approved",
                          "Pending",
                          "Rejected",
                          "Disconnected",
                        ]),
                      ),
                      description: Schema.optional(Schema.String),
                      actionsRequired: Schema.optional(Schema.String),
                    }),
                  ),
                }),
              ),
              systemData: Schema.optional(
                Schema.Struct({
                  createdBy: Schema.optional(Schema.String),
                  createdByType: Schema.optional(
                    Schema.Literals([
                      "User",
                      "Application",
                      "ManagedIdentity",
                      "Key",
                    ]),
                  ),
                  createdAt: Schema.optional(Schema.String),
                  lastModifiedBy: Schema.optional(Schema.String),
                  lastModifiedByType: Schema.optional(
                    Schema.Literals([
                      "User",
                      "Application",
                      "ManagedIdentity",
                      "Key",
                    ]),
                  ),
                  lastModifiedAt: Schema.optional(Schema.String),
                }),
              ),
            }),
          ),
        ),
      }),
    ),
    eTag: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    systemData: Schema.optional(
      Schema.Struct({
        createdBy: Schema.optional(Schema.String),
        createdByType: Schema.optional(
          Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
        ),
        createdAt: Schema.optional(Schema.String),
        lastModifiedBy: Schema.optional(Schema.String),
        lastModifiedByType: Schema.optional(
          Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
        ),
        lastModifiedAt: Schema.optional(Schema.String),
      }),
    ),
  });
export type MigrateProjectsControllerGetMigrateProjectOutput =
  typeof MigrateProjectsControllerGetMigrateProjectOutput.Type;

// The operation
/**
 * Get a specific project.
 *
 * Get information related to a specific migrate project. Returns a json object of type 'migrateProject' as specified in the models section.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const MigrateProjectsControllerGetMigrateProject =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MigrateProjectsControllerGetMigrateProjectInput,
    outputSchema: MigrateProjectsControllerGetMigrateProjectOutput,
  }));
// Input Schema
export const MigrateProjectsControllerGetToolRegistrationDetailsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/migrateProjects/{migrateProjectName}/registrationDetails",
    }),
  );
export type MigrateProjectsControllerGetToolRegistrationDetailsInput =
  typeof MigrateProjectsControllerGetToolRegistrationDetailsInput.Type;

// Output Schema
export const MigrateProjectsControllerGetToolRegistrationDetailsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    serviceEndpoint: Schema.optional(Schema.String),
    oneTimeKey: Schema.optional(Schema.String),
  });
export type MigrateProjectsControllerGetToolRegistrationDetailsOutput =
  typeof MigrateProjectsControllerGetToolRegistrationDetailsOutput.Type;

// The operation
/**
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const MigrateProjectsControllerGetToolRegistrationDetails =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MigrateProjectsControllerGetToolRegistrationDetailsInput,
    outputSchema: MigrateProjectsControllerGetToolRegistrationDetailsOutput,
  }));
// Input Schema
export const MigrateProjectsControllerPatchMigrateProjectInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/migrateProjects/{migrateProjectName}",
    }),
  );
export type MigrateProjectsControllerPatchMigrateProjectInput =
  typeof MigrateProjectsControllerPatchMigrateProjectInput.Type;

// Output Schema
export const MigrateProjectsControllerPatchMigrateProjectOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    properties: Schema.optional(
      Schema.Struct({
        registeredTools: Schema.optional(
          Schema.Array(
            Schema.Literals([
              "ServerDiscovery",
              "ServerAssessment",
              "ServerMigration",
              "Cloudamize",
              "Turbonomic",
              "Zerto",
              "CorentTech",
              "ServerAssessmentV1",
              "ServerMigration_Replication",
              "Carbonite",
              "DataMigrationAssistant",
              "DatabaseMigrationService",
              "Device42",
              "JetStream",
              "RackWare",
              "UnifyCloud",
              "Flexera",
              "ServerDiscovery_Import",
              "Lakeside",
              "AppServiceMigrationAssistant",
              "Movere",
              "CloudSphere",
              "Modernization",
              "ServerMigration_DataReplication",
              "Unknown",
            ]),
          ),
        ),
        serviceEndpoint: Schema.optional(Schema.String),
        summary: Schema.optional(
          Schema.Record(
            Schema.String,
            Schema.Struct({
              instanceType: Schema.optional(Schema.String),
              refreshSummaryState: Schema.optional(
                Schema.Literals([
                  "Started",
                  "InProgress",
                  "Completed",
                  "Failed",
                ]),
              ),
              lastSummaryRefreshedTime: Schema.optional(Schema.String),
              extendedSummary: Schema.optional(
                Schema.Record(Schema.String, Schema.String),
              ),
            }),
          ),
        ),
        lastSummaryRefreshedTime: Schema.optional(Schema.String),
        refreshSummaryState: Schema.optional(
          Schema.Literals(["Started", "InProgress", "Completed", "Failed"]),
        ),
        utilityStorageAccountId: Schema.optional(Schema.String),
        publicNetworkAccess: Schema.optional(
          Schema.Literals(["NotSpecified", "Enabled", "Disabled"]),
        ),
        privateEndpointConnections: Schema.optional(
          Schema.Array(
            Schema.Struct({
              id: Schema.optional(Schema.String),
              name: Schema.optional(Schema.String),
              type: Schema.optional(Schema.String),
              eTag: Schema.optional(Schema.String),
              properties: Schema.optional(
                Schema.Struct({
                  provisioningState: Schema.optional(
                    Schema.Literals([
                      "Accepted",
                      "InProgress",
                      "Succeeded",
                      "Failed",
                      "Canceled",
                    ]),
                  ),
                  privateEndpoint: Schema.optional(
                    Schema.Struct({
                      id: Schema.optional(Schema.String),
                    }),
                  ),
                  privateLinkServiceConnectionState: Schema.optional(
                    Schema.Struct({
                      status: Schema.optional(
                        Schema.Literals([
                          "Approved",
                          "Pending",
                          "Rejected",
                          "Disconnected",
                        ]),
                      ),
                      description: Schema.optional(Schema.String),
                      actionsRequired: Schema.optional(Schema.String),
                    }),
                  ),
                }),
              ),
              systemData: Schema.optional(
                Schema.Struct({
                  createdBy: Schema.optional(Schema.String),
                  createdByType: Schema.optional(
                    Schema.Literals([
                      "User",
                      "Application",
                      "ManagedIdentity",
                      "Key",
                    ]),
                  ),
                  createdAt: Schema.optional(Schema.String),
                  lastModifiedBy: Schema.optional(Schema.String),
                  lastModifiedByType: Schema.optional(
                    Schema.Literals([
                      "User",
                      "Application",
                      "ManagedIdentity",
                      "Key",
                    ]),
                  ),
                  lastModifiedAt: Schema.optional(Schema.String),
                }),
              ),
            }),
          ),
        ),
      }),
    ),
    eTag: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    systemData: Schema.optional(
      Schema.Struct({
        createdBy: Schema.optional(Schema.String),
        createdByType: Schema.optional(
          Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
        ),
        createdAt: Schema.optional(Schema.String),
        lastModifiedBy: Schema.optional(Schema.String),
        lastModifiedByType: Schema.optional(
          Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
        ),
        lastModifiedAt: Schema.optional(Schema.String),
      }),
    ),
  });
export type MigrateProjectsControllerPatchMigrateProjectOutput =
  typeof MigrateProjectsControllerPatchMigrateProjectOutput.Type;

// The operation
/**
 * Update project.
 *
 * Update a project with specified name. Supports partial updates, for example only tags can be provided.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const MigrateProjectsControllerPatchMigrateProject =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MigrateProjectsControllerPatchMigrateProjectInput,
    outputSchema: MigrateProjectsControllerPatchMigrateProjectOutput,
  }));
// Input Schema
export const MigrateProjectsControllerPutMigrateProjectInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/migrateProjects/{migrateProjectName}",
    }),
  );
export type MigrateProjectsControllerPutMigrateProjectInput =
  typeof MigrateProjectsControllerPutMigrateProjectInput.Type;

// Output Schema
export const MigrateProjectsControllerPutMigrateProjectOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    properties: Schema.optional(
      Schema.Struct({
        registeredTools: Schema.optional(
          Schema.Array(
            Schema.Literals([
              "ServerDiscovery",
              "ServerAssessment",
              "ServerMigration",
              "Cloudamize",
              "Turbonomic",
              "Zerto",
              "CorentTech",
              "ServerAssessmentV1",
              "ServerMigration_Replication",
              "Carbonite",
              "DataMigrationAssistant",
              "DatabaseMigrationService",
              "Device42",
              "JetStream",
              "RackWare",
              "UnifyCloud",
              "Flexera",
              "ServerDiscovery_Import",
              "Lakeside",
              "AppServiceMigrationAssistant",
              "Movere",
              "CloudSphere",
              "Modernization",
              "ServerMigration_DataReplication",
              "Unknown",
            ]),
          ),
        ),
        serviceEndpoint: Schema.optional(Schema.String),
        summary: Schema.optional(
          Schema.Record(
            Schema.String,
            Schema.Struct({
              instanceType: Schema.optional(Schema.String),
              refreshSummaryState: Schema.optional(
                Schema.Literals([
                  "Started",
                  "InProgress",
                  "Completed",
                  "Failed",
                ]),
              ),
              lastSummaryRefreshedTime: Schema.optional(Schema.String),
              extendedSummary: Schema.optional(
                Schema.Record(Schema.String, Schema.String),
              ),
            }),
          ),
        ),
        lastSummaryRefreshedTime: Schema.optional(Schema.String),
        refreshSummaryState: Schema.optional(
          Schema.Literals(["Started", "InProgress", "Completed", "Failed"]),
        ),
        utilityStorageAccountId: Schema.optional(Schema.String),
        publicNetworkAccess: Schema.optional(
          Schema.Literals(["NotSpecified", "Enabled", "Disabled"]),
        ),
        privateEndpointConnections: Schema.optional(
          Schema.Array(
            Schema.Struct({
              id: Schema.optional(Schema.String),
              name: Schema.optional(Schema.String),
              type: Schema.optional(Schema.String),
              eTag: Schema.optional(Schema.String),
              properties: Schema.optional(
                Schema.Struct({
                  provisioningState: Schema.optional(
                    Schema.Literals([
                      "Accepted",
                      "InProgress",
                      "Succeeded",
                      "Failed",
                      "Canceled",
                    ]),
                  ),
                  privateEndpoint: Schema.optional(
                    Schema.Struct({
                      id: Schema.optional(Schema.String),
                    }),
                  ),
                  privateLinkServiceConnectionState: Schema.optional(
                    Schema.Struct({
                      status: Schema.optional(
                        Schema.Literals([
                          "Approved",
                          "Pending",
                          "Rejected",
                          "Disconnected",
                        ]),
                      ),
                      description: Schema.optional(Schema.String),
                      actionsRequired: Schema.optional(Schema.String),
                    }),
                  ),
                }),
              ),
              systemData: Schema.optional(
                Schema.Struct({
                  createdBy: Schema.optional(Schema.String),
                  createdByType: Schema.optional(
                    Schema.Literals([
                      "User",
                      "Application",
                      "ManagedIdentity",
                      "Key",
                    ]),
                  ),
                  createdAt: Schema.optional(Schema.String),
                  lastModifiedBy: Schema.optional(Schema.String),
                  lastModifiedByType: Schema.optional(
                    Schema.Literals([
                      "User",
                      "Application",
                      "ManagedIdentity",
                      "Key",
                    ]),
                  ),
                  lastModifiedAt: Schema.optional(Schema.String),
                }),
              ),
            }),
          ),
        ),
      }),
    ),
    eTag: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    systemData: Schema.optional(
      Schema.Struct({
        createdBy: Schema.optional(Schema.String),
        createdByType: Schema.optional(
          Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
        ),
        createdAt: Schema.optional(Schema.String),
        lastModifiedBy: Schema.optional(Schema.String),
        lastModifiedByType: Schema.optional(
          Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
        ),
        lastModifiedAt: Schema.optional(Schema.String),
      }),
    ),
  });
export type MigrateProjectsControllerPutMigrateProjectOutput =
  typeof MigrateProjectsControllerPutMigrateProjectOutput.Type;

// The operation
/**
 * Create or update a new project with specified settings.
 *
 * Create or update a new project by sending a json object of type 'migrateproject' as given in Models section as part of the Request Body. The project name is unique.
 * This operation is Idempotent.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const MigrateProjectsControllerPutMigrateProject =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MigrateProjectsControllerPutMigrateProjectInput,
    outputSchema: MigrateProjectsControllerPutMigrateProjectOutput,
  }));
// Input Schema
export const MigrateProjectsControllerRefreshSummaryInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/migrateProjects/{migrateProjectName}/refreshSummary",
    }),
  );
export type MigrateProjectsControllerRefreshSummaryInput =
  typeof MigrateProjectsControllerRefreshSummaryInput.Type;

// Output Schema
export const MigrateProjectsControllerRefreshSummaryOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    isRefreshed: Schema.optional(Schema.Boolean),
  });
export type MigrateProjectsControllerRefreshSummaryOutput =
  typeof MigrateProjectsControllerRefreshSummaryOutput.Type;

// The operation
/**
 * Refresh the summary of the migrate project.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const MigrateProjectsControllerRefreshSummary =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MigrateProjectsControllerRefreshSummaryInput,
    outputSchema: MigrateProjectsControllerRefreshSummaryOutput,
  }));
// Input Schema
export const MigrateProjectsControllerRegisterToolInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/migrateProjects/{migrateProjectName}/registerTool",
    }),
  );
export type MigrateProjectsControllerRegisterToolInput =
  typeof MigrateProjectsControllerRegisterToolInput.Type;

// Output Schema
export const MigrateProjectsControllerRegisterToolOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    isRegistered: Schema.optional(Schema.Boolean),
  });
export type MigrateProjectsControllerRegisterToolOutput =
  typeof MigrateProjectsControllerRegisterToolOutput.Type;

// The operation
/**
 * Registers a tool with the migrate project.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const MigrateProjectsControllerRegisterTool =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MigrateProjectsControllerRegisterToolInput,
    outputSchema: MigrateProjectsControllerRegisterToolOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionControllerCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    peConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/masterSites/{siteName}/privateEndpointConnections/{peConnectionName}",
    }),
  );
export type PrivateEndpointConnectionControllerCreateInput =
  typeof PrivateEndpointConnectionControllerCreateInput.Type;

// Output Schema
export const PrivateEndpointConnectionControllerCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PrivateEndpointConnectionControllerCreateOutput =
  typeof PrivateEndpointConnectionControllerCreateOutput.Type;

// The operation
/**
 * Gets the private link resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param peConnectionName -  Private link resource name.
 */
export const PrivateEndpointConnectionControllerCreate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionControllerCreateInput,
    outputSchema: PrivateEndpointConnectionControllerCreateOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionControllerDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    peConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/masterSites/{siteName}/privateEndpointConnections/{peConnectionName}",
    }),
  );
export type PrivateEndpointConnectionControllerDeleteInput =
  typeof PrivateEndpointConnectionControllerDeleteInput.Type;

// Output Schema
export const PrivateEndpointConnectionControllerDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PrivateEndpointConnectionControllerDeleteOutput =
  typeof PrivateEndpointConnectionControllerDeleteOutput.Type;

// The operation
/**
 * Deletes the private link resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param peConnectionName -  Private link resource name.
 */
export const PrivateEndpointConnectionControllerDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionControllerDeleteInput,
    outputSchema: PrivateEndpointConnectionControllerDeleteOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionControllerDeletePrivateEndpointConnectionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    peConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/migrateProjects/{migrateProjectName}/privateEndpointConnections/{peConnectionName}",
    }),
  );
export type PrivateEndpointConnectionControllerDeletePrivateEndpointConnectionInput =
  typeof PrivateEndpointConnectionControllerDeletePrivateEndpointConnectionInput.Type;

// Output Schema
export const PrivateEndpointConnectionControllerDeletePrivateEndpointConnectionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Literals([
    "Continue",
    "SwitchingProtocols",
    "OK",
    "Created",
    "Accepted",
    "NonAuthoritativeInformation",
    "NoContent",
    "ResetContent",
    "PartialContent",
    "MultipleChoices",
    "Ambiguous",
    "MovedPermanently",
    "Moved",
    "Found",
    "Redirect",
    "SeeOther",
    "RedirectMethod",
    "NotModified",
    "UseProxy",
    "Unused",
    "TemporaryRedirect",
    "RedirectKeepVerb",
    "BadRequest",
    "Unauthorized",
    "PaymentRequired",
    "Forbidden",
    "NotFound",
    "MethodNotAllowed",
    "NotAcceptable",
    "ProxyAuthenticationRequired",
    "RequestTimeout",
    "Conflict",
    "Gone",
    "LengthRequired",
    "PreconditionFailed",
    "RequestEntityTooLarge",
    "RequestUriTooLong",
    "UnsupportedMediaType",
    "RequestedRangeNotSatisfiable",
    "ExpectationFailed",
    "UpgradeRequired",
    "InternalServerError",
    "NotImplemented",
    "BadGateway",
    "ServiceUnavailable",
    "GatewayTimeout",
    "HttpVersionNotSupported",
  ]);
export type PrivateEndpointConnectionControllerDeletePrivateEndpointConnectionOutput =
  typeof PrivateEndpointConnectionControllerDeletePrivateEndpointConnectionOutput.Type;

// The operation
/**
 * Delete the endpoint
 *
 * Delete the private endpoint. Deleting non-existent private endpoint is a no-operation.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param peConnectionName - Private endpoint connection name.
 * @param api-version - The API version to use for this operation.
 */
export const PrivateEndpointConnectionControllerDeletePrivateEndpointConnection =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      PrivateEndpointConnectionControllerDeletePrivateEndpointConnectionInput,
    outputSchema:
      PrivateEndpointConnectionControllerDeletePrivateEndpointConnectionOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionControllerGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    peConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/masterSites/{siteName}/privateEndpointConnections/{peConnectionName}",
    }),
  );
export type PrivateEndpointConnectionControllerGetInput =
  typeof PrivateEndpointConnectionControllerGetInput.Type;

// Output Schema
export const PrivateEndpointConnectionControllerGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PrivateEndpointConnectionControllerGetOutput =
  typeof PrivateEndpointConnectionControllerGetOutput.Type;

// The operation
/**
 * Gets the private link resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param peConnectionName -  Private link resource name.
 */
export const PrivateEndpointConnectionControllerGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionControllerGetInput,
    outputSchema: PrivateEndpointConnectionControllerGetOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionControllerGetPrivateEndpointConnectionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    peConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/migrateProjects/{migrateProjectName}/privateEndpointConnections/{peConnectionName}",
    }),
  );
export type PrivateEndpointConnectionControllerGetPrivateEndpointConnectionInput =
  typeof PrivateEndpointConnectionControllerGetPrivateEndpointConnectionInput.Type;

// Output Schema
export const PrivateEndpointConnectionControllerGetPrivateEndpointConnectionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    eTag: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        provisioningState: Schema.optional(
          Schema.Literals([
            "Accepted",
            "InProgress",
            "Succeeded",
            "Failed",
            "Canceled",
          ]),
        ),
        privateEndpoint: Schema.optional(
          Schema.Struct({
            id: Schema.optional(Schema.String),
          }),
        ),
        privateLinkServiceConnectionState: Schema.optional(
          Schema.Struct({
            status: Schema.optional(
              Schema.Literals([
                "Approved",
                "Pending",
                "Rejected",
                "Disconnected",
              ]),
            ),
            description: Schema.optional(Schema.String),
            actionsRequired: Schema.optional(Schema.String),
          }),
        ),
      }),
    ),
    systemData: Schema.optional(
      Schema.Struct({
        createdBy: Schema.optional(Schema.String),
        createdByType: Schema.optional(
          Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
        ),
        createdAt: Schema.optional(Schema.String),
        lastModifiedBy: Schema.optional(Schema.String),
        lastModifiedByType: Schema.optional(
          Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
        ),
        lastModifiedAt: Schema.optional(Schema.String),
      }),
    ),
  });
export type PrivateEndpointConnectionControllerGetPrivateEndpointConnectionOutput =
  typeof PrivateEndpointConnectionControllerGetPrivateEndpointConnectionOutput.Type;

// The operation
/**
 * Get the private endpoint.
 *
 * Get the private endpoint with the specified name.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param peConnectionName - Private endpoint connection name.
 * @param api-version - The API version to use for this operation.
 */
export const PrivateEndpointConnectionControllerGetPrivateEndpointConnection =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      PrivateEndpointConnectionControllerGetPrivateEndpointConnectionInput,
    outputSchema:
      PrivateEndpointConnectionControllerGetPrivateEndpointConnectionOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionControllerListByMasterSiteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/masterSites/{siteName}/privateEndpointConnections",
    }),
  );
export type PrivateEndpointConnectionControllerListByMasterSiteInput =
  typeof PrivateEndpointConnectionControllerListByMasterSiteInput.Type;

// Output Schema
export const PrivateEndpointConnectionControllerListByMasterSiteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type PrivateEndpointConnectionControllerListByMasterSiteOutput =
  typeof PrivateEndpointConnectionControllerListByMasterSiteOutput.Type;

// The operation
/**
 * Gets the private link resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const PrivateEndpointConnectionControllerListByMasterSite =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionControllerListByMasterSiteInput,
    outputSchema: PrivateEndpointConnectionControllerListByMasterSiteOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionControllerPutPrivateEndpointConnectionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    peConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/migrateProjects/{migrateProjectName}/privateEndpointConnections/{peConnectionName}",
    }),
  );
export type PrivateEndpointConnectionControllerPutPrivateEndpointConnectionInput =
  typeof PrivateEndpointConnectionControllerPutPrivateEndpointConnectionInput.Type;

// Output Schema
export const PrivateEndpointConnectionControllerPutPrivateEndpointConnectionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    eTag: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        provisioningState: Schema.optional(
          Schema.Literals([
            "Accepted",
            "InProgress",
            "Succeeded",
            "Failed",
            "Canceled",
          ]),
        ),
        privateEndpoint: Schema.optional(
          Schema.Struct({
            id: Schema.optional(Schema.String),
          }),
        ),
        privateLinkServiceConnectionState: Schema.optional(
          Schema.Struct({
            status: Schema.optional(
              Schema.Literals([
                "Approved",
                "Pending",
                "Rejected",
                "Disconnected",
              ]),
            ),
            description: Schema.optional(Schema.String),
            actionsRequired: Schema.optional(Schema.String),
          }),
        ),
      }),
    ),
    systemData: Schema.optional(
      Schema.Struct({
        createdBy: Schema.optional(Schema.String),
        createdByType: Schema.optional(
          Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
        ),
        createdAt: Schema.optional(Schema.String),
        lastModifiedBy: Schema.optional(Schema.String),
        lastModifiedByType: Schema.optional(
          Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
        ),
        lastModifiedAt: Schema.optional(Schema.String),
      }),
    ),
  });
export type PrivateEndpointConnectionControllerPutPrivateEndpointConnectionOutput =
  typeof PrivateEndpointConnectionControllerPutPrivateEndpointConnectionOutput.Type;

// The operation
/**
 * Create or update private endpoint.
 *
 * Create or update a private endpoint with specified name. If a private endpoint already exists, update it.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param peConnectionName - Private endpoint connection name.
 * @param api-version - The API version to use for this operation.
 */
export const PrivateEndpointConnectionControllerPutPrivateEndpointConnection =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      PrivateEndpointConnectionControllerPutPrivateEndpointConnectionInput,
    outputSchema:
      PrivateEndpointConnectionControllerPutPrivateEndpointConnectionOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionOperationsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type PrivateEndpointConnectionOperationsDeleteInput =
  typeof PrivateEndpointConnectionOperationsDeleteInput.Type;

// Output Schema
export const PrivateEndpointConnectionOperationsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PrivateEndpointConnectionOperationsDeleteOutput =
  typeof PrivateEndpointConnectionOperationsDeleteOutput.Type;

// The operation
/**
 * Delete a PrivateEndpointConnection
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 * @param privateEndpointConnectionName - Private endpoint connection ARM name
 */
export const PrivateEndpointConnectionOperationsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionOperationsDeleteInput,
    outputSchema: PrivateEndpointConnectionOperationsDeleteOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionOperationsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type PrivateEndpointConnectionOperationsGetInput =
  typeof PrivateEndpointConnectionOperationsGetInput.Type;

// Output Schema
export const PrivateEndpointConnectionOperationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PrivateEndpointConnectionOperationsGetOutput =
  typeof PrivateEndpointConnectionOperationsGetOutput.Type;

// The operation
/**
 * Get a PrivateEndpointConnection
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 * @param privateEndpointConnectionName - Private endpoint connection ARM name
 */
export const PrivateEndpointConnectionOperationsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionOperationsGetInput,
    outputSchema: PrivateEndpointConnectionOperationsGetOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionOperationsListByAssessmentProjectInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/privateEndpointConnections",
    }),
  );
export type PrivateEndpointConnectionOperationsListByAssessmentProjectInput =
  typeof PrivateEndpointConnectionOperationsListByAssessmentProjectInput.Type;

// Output Schema
export const PrivateEndpointConnectionOperationsListByAssessmentProjectOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type PrivateEndpointConnectionOperationsListByAssessmentProjectOutput =
  typeof PrivateEndpointConnectionOperationsListByAssessmentProjectOutput.Type;

// The operation
/**
 * List PrivateEndpointConnection resources by AssessmentProject
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 */
export const PrivateEndpointConnectionOperationsListByAssessmentProject =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      PrivateEndpointConnectionOperationsListByAssessmentProjectInput,
    outputSchema:
      PrivateEndpointConnectionOperationsListByAssessmentProjectOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionOperationsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type PrivateEndpointConnectionOperationsUpdateInput =
  typeof PrivateEndpointConnectionOperationsUpdateInput.Type;

// Output Schema
export const PrivateEndpointConnectionOperationsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PrivateEndpointConnectionOperationsUpdateOutput =
  typeof PrivateEndpointConnectionOperationsUpdateOutput.Type;

// The operation
/**
 * Create a PrivateEndpointConnection
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 * @param privateEndpointConnectionName - Private endpoint connection ARM name
 */
export const PrivateEndpointConnectionOperationsUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionOperationsUpdateInput,
    outputSchema: PrivateEndpointConnectionOperationsUpdateOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionProxyControllerCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    pecProxyName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/migrateProjects/{migrateProjectName}/privateEndpointConnectionProxies/{pecProxyName}",
    }),
  );
export type PrivateEndpointConnectionProxyControllerCreateInput =
  typeof PrivateEndpointConnectionProxyControllerCreateInput.Type;

// Output Schema
export const PrivateEndpointConnectionProxyControllerCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    eTag: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        remotePrivateEndpoint: Schema.optional(
          Schema.Struct({
            id: Schema.optional(Schema.String),
            manualPrivateLinkServiceConnections: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  id: Schema.optional(Schema.String),
                  name: Schema.optional(Schema.String),
                  groupIds: Schema.optional(Schema.Array(Schema.String)),
                  requestMessage: Schema.optional(Schema.String),
                }),
              ),
            ),
            privateLinkServiceConnections: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  id: Schema.optional(Schema.String),
                  name: Schema.optional(Schema.String),
                  groupIds: Schema.optional(Schema.Array(Schema.String)),
                  requestMessage: Schema.optional(Schema.String),
                }),
              ),
            ),
            privateLinkServiceProxies: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  id: Schema.optional(Schema.String),
                  groupConnectivityInformation: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        id: Schema.optional(Schema.String),
                        groupId: Schema.optional(Schema.String),
                        memberName: Schema.optional(Schema.String),
                        customerVisibleFqdns: Schema.optional(
                          Schema.Array(Schema.String),
                        ),
                        internalFqdn: Schema.optional(Schema.String),
                        redirectMapId: Schema.optional(Schema.String),
                        privateLinkServiceArmRegion: Schema.optional(
                          Schema.String,
                        ),
                      }),
                    ),
                  ),
                  remotePrivateEndpointConnection: Schema.optional(
                    Schema.Struct({
                      id: Schema.optional(Schema.String),
                    }),
                  ),
                  remotePrivateLinkServiceConnectionState: Schema.optional(
                    Schema.Struct({
                      status: Schema.optional(
                        Schema.Literals([
                          "Approved",
                          "Pending",
                          "Rejected",
                          "Disconnected",
                        ]),
                      ),
                      description: Schema.optional(Schema.String),
                      actionsRequired: Schema.optional(Schema.String),
                    }),
                  ),
                }),
              ),
            ),
            connectionDetails: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  id: Schema.optional(Schema.String),
                  privateIpAddress: Schema.optional(Schema.String),
                  linkIdentifier: Schema.optional(Schema.String),
                  groupId: Schema.optional(Schema.String),
                  memberName: Schema.optional(Schema.String),
                }),
              ),
            ),
          }),
        ),
        status: Schema.optional(
          Schema.Literals(["Succeeded", "Failed", "Cancelled", "Running"]),
        ),
      }),
    ),
    systemData: Schema.optional(
      Schema.Struct({
        createdBy: Schema.optional(Schema.String),
        createdByType: Schema.optional(
          Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
        ),
        createdAt: Schema.optional(Schema.String),
        lastModifiedBy: Schema.optional(Schema.String),
        lastModifiedByType: Schema.optional(
          Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
        ),
        lastModifiedAt: Schema.optional(Schema.String),
      }),
    ),
  });
export type PrivateEndpointConnectionProxyControllerCreateOutput =
  typeof PrivateEndpointConnectionProxyControllerCreateOutput.Type;

// The operation
/**
 * Create or update private endpoint proxy.
 *
 * Create or update a private endpoint proxy with specified name. If a private endpoint already exists, update it.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param pecProxyName - Private endpoint proxy name.
 * @param api-version - The API version to use for this operation.
 */
export const PrivateEndpointConnectionProxyControllerCreate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionProxyControllerCreateInput,
    outputSchema: PrivateEndpointConnectionProxyControllerCreateOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionProxyControllerDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    pecProxyName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/migrateProjects/{migrateProjectName}/privateEndpointConnectionProxies/{pecProxyName}",
    }),
  );
export type PrivateEndpointConnectionProxyControllerDeleteInput =
  typeof PrivateEndpointConnectionProxyControllerDeleteInput.Type;

// Output Schema
export const PrivateEndpointConnectionProxyControllerDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PrivateEndpointConnectionProxyControllerDeleteOutput =
  typeof PrivateEndpointConnectionProxyControllerDeleteOutput.Type;

// The operation
/**
 * Delete the private endpoint proxy
 *
 * Delete the private endpoint proxy. Deleting non-existent private endpoint proxy is a no-operation.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param pecProxyName - Private endpoint proxy name.
 * @param api-version - The API version to use for this operation.
 */
export const PrivateEndpointConnectionProxyControllerDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionProxyControllerDeleteInput,
    outputSchema: PrivateEndpointConnectionProxyControllerDeleteOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionProxyControllerGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    pecProxyName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/migrateProjects/{migrateProjectName}/privateEndpointConnectionProxies/{pecProxyName}",
    }),
  );
export type PrivateEndpointConnectionProxyControllerGetInput =
  typeof PrivateEndpointConnectionProxyControllerGetInput.Type;

// Output Schema
export const PrivateEndpointConnectionProxyControllerGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    eTag: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        remotePrivateEndpoint: Schema.optional(
          Schema.Struct({
            id: Schema.optional(Schema.String),
            manualPrivateLinkServiceConnections: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  id: Schema.optional(Schema.String),
                  name: Schema.optional(Schema.String),
                  groupIds: Schema.optional(Schema.Array(Schema.String)),
                  requestMessage: Schema.optional(Schema.String),
                }),
              ),
            ),
            privateLinkServiceConnections: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  id: Schema.optional(Schema.String),
                  name: Schema.optional(Schema.String),
                  groupIds: Schema.optional(Schema.Array(Schema.String)),
                  requestMessage: Schema.optional(Schema.String),
                }),
              ),
            ),
            privateLinkServiceProxies: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  id: Schema.optional(Schema.String),
                  groupConnectivityInformation: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        id: Schema.optional(Schema.String),
                        groupId: Schema.optional(Schema.String),
                        memberName: Schema.optional(Schema.String),
                        customerVisibleFqdns: Schema.optional(
                          Schema.Array(Schema.String),
                        ),
                        internalFqdn: Schema.optional(Schema.String),
                        redirectMapId: Schema.optional(Schema.String),
                        privateLinkServiceArmRegion: Schema.optional(
                          Schema.String,
                        ),
                      }),
                    ),
                  ),
                  remotePrivateEndpointConnection: Schema.optional(
                    Schema.Struct({
                      id: Schema.optional(Schema.String),
                    }),
                  ),
                  remotePrivateLinkServiceConnectionState: Schema.optional(
                    Schema.Struct({
                      status: Schema.optional(
                        Schema.Literals([
                          "Approved",
                          "Pending",
                          "Rejected",
                          "Disconnected",
                        ]),
                      ),
                      description: Schema.optional(Schema.String),
                      actionsRequired: Schema.optional(Schema.String),
                    }),
                  ),
                }),
              ),
            ),
            connectionDetails: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  id: Schema.optional(Schema.String),
                  privateIpAddress: Schema.optional(Schema.String),
                  linkIdentifier: Schema.optional(Schema.String),
                  groupId: Schema.optional(Schema.String),
                  memberName: Schema.optional(Schema.String),
                }),
              ),
            ),
          }),
        ),
        status: Schema.optional(
          Schema.Literals(["Succeeded", "Failed", "Cancelled", "Running"]),
        ),
      }),
    ),
    systemData: Schema.optional(
      Schema.Struct({
        createdBy: Schema.optional(Schema.String),
        createdByType: Schema.optional(
          Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
        ),
        createdAt: Schema.optional(Schema.String),
        lastModifiedBy: Schema.optional(Schema.String),
        lastModifiedByType: Schema.optional(
          Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
        ),
        lastModifiedAt: Schema.optional(Schema.String),
      }),
    ),
  });
export type PrivateEndpointConnectionProxyControllerGetOutput =
  typeof PrivateEndpointConnectionProxyControllerGetOutput.Type;

// The operation
/**
 * Get the private link proxy resource.
 *
 * Get the of private link proxy resources from a migrate project and private link proxy resource.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param pecProxyName - Private link proxy name.
 * @param api-version - The API version to use for this operation.
 */
export const PrivateEndpointConnectionProxyControllerGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionProxyControllerGetInput,
    outputSchema: PrivateEndpointConnectionProxyControllerGetOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionProxyControllerListPrivateEndpointConnectionProxiesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/migrateProjects/{migrateProjectName}/privateEndpointConnectionProxies",
    }),
  );
export type PrivateEndpointConnectionProxyControllerListPrivateEndpointConnectionProxiesInput =
  typeof PrivateEndpointConnectionProxyControllerListPrivateEndpointConnectionProxiesInput.Type;

// Output Schema
export const PrivateEndpointConnectionProxyControllerListPrivateEndpointConnectionProxiesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          eTag: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Struct({
              remotePrivateEndpoint: Schema.optional(
                Schema.Struct({
                  id: Schema.optional(Schema.String),
                  manualPrivateLinkServiceConnections: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        id: Schema.optional(Schema.String),
                        name: Schema.optional(Schema.String),
                        groupIds: Schema.optional(Schema.Array(Schema.String)),
                        requestMessage: Schema.optional(Schema.String),
                      }),
                    ),
                  ),
                  privateLinkServiceConnections: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        id: Schema.optional(Schema.String),
                        name: Schema.optional(Schema.String),
                        groupIds: Schema.optional(Schema.Array(Schema.String)),
                        requestMessage: Schema.optional(Schema.String),
                      }),
                    ),
                  ),
                  privateLinkServiceProxies: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        id: Schema.optional(Schema.String),
                        groupConnectivityInformation: Schema.optional(
                          Schema.Array(
                            Schema.Struct({
                              id: Schema.optional(Schema.String),
                              groupId: Schema.optional(Schema.String),
                              memberName: Schema.optional(Schema.String),
                              customerVisibleFqdns: Schema.optional(
                                Schema.Array(Schema.String),
                              ),
                              internalFqdn: Schema.optional(Schema.String),
                              redirectMapId: Schema.optional(Schema.String),
                              privateLinkServiceArmRegion: Schema.optional(
                                Schema.String,
                              ),
                            }),
                          ),
                        ),
                        remotePrivateEndpointConnection: Schema.optional(
                          Schema.Struct({
                            id: Schema.optional(Schema.String),
                          }),
                        ),
                        remotePrivateLinkServiceConnectionState:
                          Schema.optional(
                            Schema.Struct({
                              status: Schema.optional(
                                Schema.Literals([
                                  "Approved",
                                  "Pending",
                                  "Rejected",
                                  "Disconnected",
                                ]),
                              ),
                              description: Schema.optional(Schema.String),
                              actionsRequired: Schema.optional(Schema.String),
                            }),
                          ),
                      }),
                    ),
                  ),
                  connectionDetails: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        id: Schema.optional(Schema.String),
                        privateIpAddress: Schema.optional(Schema.String),
                        linkIdentifier: Schema.optional(Schema.String),
                        groupId: Schema.optional(Schema.String),
                        memberName: Schema.optional(Schema.String),
                      }),
                    ),
                  ),
                }),
              ),
              status: Schema.optional(
                Schema.Literals([
                  "Succeeded",
                  "Failed",
                  "Cancelled",
                  "Running",
                ]),
              ),
            }),
          ),
          systemData: Schema.optional(
            Schema.Struct({
              createdBy: Schema.optional(Schema.String),
              createdByType: Schema.optional(
                Schema.Literals([
                  "User",
                  "Application",
                  "ManagedIdentity",
                  "Key",
                ]),
              ),
              createdAt: Schema.optional(Schema.String),
              lastModifiedBy: Schema.optional(Schema.String),
              lastModifiedByType: Schema.optional(
                Schema.Literals([
                  "User",
                  "Application",
                  "ManagedIdentity",
                  "Key",
                ]),
              ),
              lastModifiedAt: Schema.optional(Schema.String),
            }),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type PrivateEndpointConnectionProxyControllerListPrivateEndpointConnectionProxiesOutput =
  typeof PrivateEndpointConnectionProxyControllerListPrivateEndpointConnectionProxiesOutput.Type;

// The operation
/**
 * Get the private endpoint connection proxies.
 *
 * Get all the private endpoint connections proxies under a migrate project.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const PrivateEndpointConnectionProxyControllerListPrivateEndpointConnectionProxies =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      PrivateEndpointConnectionProxyControllerListPrivateEndpointConnectionProxiesInput,
    outputSchema:
      PrivateEndpointConnectionProxyControllerListPrivateEndpointConnectionProxiesOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionProxyControllerValidateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    pecProxyName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/migrateProjects/{migrateProjectName}/privateEndpointConnectionProxies/{pecProxyName}/validate",
    }),
  );
export type PrivateEndpointConnectionProxyControllerValidateInput =
  typeof PrivateEndpointConnectionProxyControllerValidateInput.Type;

// Output Schema
export const PrivateEndpointConnectionProxyControllerValidateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    eTag: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        remotePrivateEndpoint: Schema.optional(
          Schema.Struct({
            id: Schema.optional(Schema.String),
            manualPrivateLinkServiceConnections: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  id: Schema.optional(Schema.String),
                  name: Schema.optional(Schema.String),
                  groupIds: Schema.optional(Schema.Array(Schema.String)),
                  requestMessage: Schema.optional(Schema.String),
                }),
              ),
            ),
            privateLinkServiceConnections: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  id: Schema.optional(Schema.String),
                  name: Schema.optional(Schema.String),
                  groupIds: Schema.optional(Schema.Array(Schema.String)),
                  requestMessage: Schema.optional(Schema.String),
                }),
              ),
            ),
            privateLinkServiceProxies: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  id: Schema.optional(Schema.String),
                  groupConnectivityInformation: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        id: Schema.optional(Schema.String),
                        groupId: Schema.optional(Schema.String),
                        memberName: Schema.optional(Schema.String),
                        customerVisibleFqdns: Schema.optional(
                          Schema.Array(Schema.String),
                        ),
                        internalFqdn: Schema.optional(Schema.String),
                        redirectMapId: Schema.optional(Schema.String),
                        privateLinkServiceArmRegion: Schema.optional(
                          Schema.String,
                        ),
                      }),
                    ),
                  ),
                  remotePrivateEndpointConnection: Schema.optional(
                    Schema.Struct({
                      id: Schema.optional(Schema.String),
                    }),
                  ),
                  remotePrivateLinkServiceConnectionState: Schema.optional(
                    Schema.Struct({
                      status: Schema.optional(
                        Schema.Literals([
                          "Approved",
                          "Pending",
                          "Rejected",
                          "Disconnected",
                        ]),
                      ),
                      description: Schema.optional(Schema.String),
                      actionsRequired: Schema.optional(Schema.String),
                    }),
                  ),
                }),
              ),
            ),
            connectionDetails: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  id: Schema.optional(Schema.String),
                  privateIpAddress: Schema.optional(Schema.String),
                  linkIdentifier: Schema.optional(Schema.String),
                  groupId: Schema.optional(Schema.String),
                  memberName: Schema.optional(Schema.String),
                }),
              ),
            ),
          }),
        ),
        status: Schema.optional(
          Schema.Literals(["Succeeded", "Failed", "Cancelled", "Running"]),
        ),
      }),
    ),
    systemData: Schema.optional(
      Schema.Struct({
        createdBy: Schema.optional(Schema.String),
        createdByType: Schema.optional(
          Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
        ),
        createdAt: Schema.optional(Schema.String),
        lastModifiedBy: Schema.optional(Schema.String),
        lastModifiedByType: Schema.optional(
          Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
        ),
        lastModifiedAt: Schema.optional(Schema.String),
      }),
    ),
  });
export type PrivateEndpointConnectionProxyControllerValidateOutput =
  typeof PrivateEndpointConnectionProxyControllerValidateOutput.Type;

// The operation
/**
 * Validates private endpoint connection proxy.
 *
 * Validates private endpoint connection using a project and private endpoint connection proxy
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param pecProxyName - Private link proxy name.
 * @param api-version - The API version to use for this operation.
 */
export const PrivateEndpointConnectionProxyControllerValidate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionProxyControllerValidateInput,
    outputSchema: PrivateEndpointConnectionProxyControllerValidateOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsControllerGetPrivateEndpointConnectionsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/migrateProjects/{migrateProjectName}/privateEndpointConnections",
    }),
  );
export type PrivateEndpointConnectionsControllerGetPrivateEndpointConnectionsInput =
  typeof PrivateEndpointConnectionsControllerGetPrivateEndpointConnectionsInput.Type;

// Output Schema
export const PrivateEndpointConnectionsControllerGetPrivateEndpointConnectionsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          eTag: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Struct({
              provisioningState: Schema.optional(
                Schema.Literals([
                  "Accepted",
                  "InProgress",
                  "Succeeded",
                  "Failed",
                  "Canceled",
                ]),
              ),
              privateEndpoint: Schema.optional(
                Schema.Struct({
                  id: Schema.optional(Schema.String),
                }),
              ),
              privateLinkServiceConnectionState: Schema.optional(
                Schema.Struct({
                  status: Schema.optional(
                    Schema.Literals([
                      "Approved",
                      "Pending",
                      "Rejected",
                      "Disconnected",
                    ]),
                  ),
                  description: Schema.optional(Schema.String),
                  actionsRequired: Schema.optional(Schema.String),
                }),
              ),
            }),
          ),
          systemData: Schema.optional(
            Schema.Struct({
              createdBy: Schema.optional(Schema.String),
              createdByType: Schema.optional(
                Schema.Literals([
                  "User",
                  "Application",
                  "ManagedIdentity",
                  "Key",
                ]),
              ),
              createdAt: Schema.optional(Schema.String),
              lastModifiedBy: Schema.optional(Schema.String),
              lastModifiedByType: Schema.optional(
                Schema.Literals([
                  "User",
                  "Application",
                  "ManagedIdentity",
                  "Key",
                ]),
              ),
              lastModifiedAt: Schema.optional(Schema.String),
            }),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type PrivateEndpointConnectionsControllerGetPrivateEndpointConnectionsOutput =
  typeof PrivateEndpointConnectionsControllerGetPrivateEndpointConnectionsOutput.Type;

// The operation
/**
 * Get the private endpoint connections.
 *
 * Get all the private endpoint connections under a migrate project.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const PrivateEndpointConnectionsControllerGetPrivateEndpointConnections =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      PrivateEndpointConnectionsControllerGetPrivateEndpointConnectionsInput,
    outputSchema:
      PrivateEndpointConnectionsControllerGetPrivateEndpointConnectionsOutput,
  }));
// Input Schema
export const PrivateLinkResourceControllerGetPrivateLinkResourceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateLinkResourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/migrateProjects/{migrateProjectName}/privateLinkResources/{privateLinkResourceName}",
    }),
  );
export type PrivateLinkResourceControllerGetPrivateLinkResourceInput =
  typeof PrivateLinkResourceControllerGetPrivateLinkResourceInput.Type;

// Output Schema
export const PrivateLinkResourceControllerGetPrivateLinkResourceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        requiredMembers: Schema.optional(Schema.Array(Schema.String)),
        requiredZoneNames: Schema.optional(Schema.Array(Schema.String)),
        groupId: Schema.optional(Schema.String),
      }),
    ),
  });
export type PrivateLinkResourceControllerGetPrivateLinkResourceOutput =
  typeof PrivateLinkResourceControllerGetPrivateLinkResourceOutput.Type;

// The operation
/**
 * Get the private link resource.
 *
 * Get the private link resource with the specified name.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param privateLinkResourceName - Private Link resource name.
 * @param api-version - The API version to use for this operation.
 */
export const PrivateLinkResourceControllerGetPrivateLinkResource =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinkResourceControllerGetPrivateLinkResourceInput,
    outputSchema: PrivateLinkResourceControllerGetPrivateLinkResourceOutput,
  }));
// Input Schema
export const PrivateLinkResourceControllerGetPrivateLinkResourcesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/migrateProjects/{migrateProjectName}/privateLinkResources",
    }),
  );
export type PrivateLinkResourceControllerGetPrivateLinkResourcesInput =
  typeof PrivateLinkResourceControllerGetPrivateLinkResourcesInput.Type;

// Output Schema
export const PrivateLinkResourceControllerGetPrivateLinkResourcesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Struct({
              requiredMembers: Schema.optional(Schema.Array(Schema.String)),
              requiredZoneNames: Schema.optional(Schema.Array(Schema.String)),
              groupId: Schema.optional(Schema.String),
            }),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type PrivateLinkResourceControllerGetPrivateLinkResourcesOutput =
  typeof PrivateLinkResourceControllerGetPrivateLinkResourcesOutput.Type;

// The operation
/**
 * Get the list of private link resources.
 *
 * Get the list of private link resources under a resource group and migrate project.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const PrivateLinkResourceControllerGetPrivateLinkResources =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinkResourceControllerGetPrivateLinkResourcesInput,
    outputSchema: PrivateLinkResourceControllerGetPrivateLinkResourcesOutput,
  }));
// Input Schema
export const PrivateLinkResourceOperationsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    privateLinkResourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/privateLinkResources/{privateLinkResourceName}",
    }),
  );
export type PrivateLinkResourceOperationsGetInput =
  typeof PrivateLinkResourceOperationsGetInput.Type;

// Output Schema
export const PrivateLinkResourceOperationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PrivateLinkResourceOperationsGetOutput =
  typeof PrivateLinkResourceOperationsGetOutput.Type;

// The operation
/**
 * Get a PrivateLinkResource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 * @param privateLinkResourceName - Private link resource ARM name
 */
export const PrivateLinkResourceOperationsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinkResourceOperationsGetInput,
    outputSchema: PrivateLinkResourceOperationsGetOutput,
  }));
// Input Schema
export const PrivateLinkResourceOperationsListByAssessmentProjectInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/privateLinkResources",
    }),
  );
export type PrivateLinkResourceOperationsListByAssessmentProjectInput =
  typeof PrivateLinkResourceOperationsListByAssessmentProjectInput.Type;

// Output Schema
export const PrivateLinkResourceOperationsListByAssessmentProjectOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type PrivateLinkResourceOperationsListByAssessmentProjectOutput =
  typeof PrivateLinkResourceOperationsListByAssessmentProjectOutput.Type;

// The operation
/**
 * List PrivateLinkResource resources by AssessmentProject
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 */
export const PrivateLinkResourceOperationsListByAssessmentProject =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinkResourceOperationsListByAssessmentProjectInput,
    outputSchema: PrivateLinkResourceOperationsListByAssessmentProjectOutput,
  }));
// Input Schema
export const PrivateLinkResourcesControllerGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    privateLinkResourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/masterSites/{siteName}/privateLinkResources/{privateLinkResourceName}",
    }),
  );
export type PrivateLinkResourcesControllerGetInput =
  typeof PrivateLinkResourcesControllerGetInput.Type;

// Output Schema
export const PrivateLinkResourcesControllerGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PrivateLinkResourcesControllerGetOutput =
  typeof PrivateLinkResourcesControllerGetOutput.Type;

// The operation
/**
 * Gets the private link resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param privateLinkResourceName - Private link resource name.
 */
export const PrivateLinkResourcesControllerGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinkResourcesControllerGetInput,
    outputSchema: PrivateLinkResourcesControllerGetOutput,
  }));
// Input Schema
export const PrivateLinkResourcesControllerListByMasterSiteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/masterSites/{siteName}/privateLinkResources",
    }),
  );
export type PrivateLinkResourcesControllerListByMasterSiteInput =
  typeof PrivateLinkResourcesControllerListByMasterSiteInput.Type;

// Output Schema
export const PrivateLinkResourcesControllerListByMasterSiteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type PrivateLinkResourcesControllerListByMasterSiteOutput =
  typeof PrivateLinkResourcesControllerListByMasterSiteOutput.Type;

// The operation
/**
 * Gets the private link resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const PrivateLinkResourcesControllerListByMasterSite =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinkResourcesControllerListByMasterSiteInput,
    outputSchema: PrivateLinkResourcesControllerListByMasterSiteOutput,
  }));
// Input Schema
export const ProjectsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Migrate/migrateProjects",
  }),
);
export type ProjectsListInput = typeof ProjectsListInput.Type;

// Output Schema
export const ProjectsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        properties: Schema.optional(
          Schema.Struct({
            registeredTools: Schema.optional(
              Schema.Array(
                Schema.Literals([
                  "ServerDiscovery",
                  "ServerAssessment",
                  "ServerMigration",
                  "Cloudamize",
                  "Turbonomic",
                  "Zerto",
                  "CorentTech",
                  "ServerAssessmentV1",
                  "ServerMigration_Replication",
                  "Carbonite",
                  "DataMigrationAssistant",
                  "DatabaseMigrationService",
                  "Device42",
                  "JetStream",
                  "RackWare",
                  "UnifyCloud",
                  "Flexera",
                  "ServerDiscovery_Import",
                  "Lakeside",
                  "AppServiceMigrationAssistant",
                  "Movere",
                  "CloudSphere",
                  "Modernization",
                  "ServerMigration_DataReplication",
                  "Unknown",
                ]),
              ),
            ),
            serviceEndpoint: Schema.optional(Schema.String),
            summary: Schema.optional(
              Schema.Record(
                Schema.String,
                Schema.Struct({
                  instanceType: Schema.optional(Schema.String),
                  refreshSummaryState: Schema.optional(
                    Schema.Literals([
                      "Started",
                      "InProgress",
                      "Completed",
                      "Failed",
                    ]),
                  ),
                  lastSummaryRefreshedTime: Schema.optional(Schema.String),
                  extendedSummary: Schema.optional(
                    Schema.Record(Schema.String, Schema.String),
                  ),
                }),
              ),
            ),
            lastSummaryRefreshedTime: Schema.optional(Schema.String),
            refreshSummaryState: Schema.optional(
              Schema.Literals(["Started", "InProgress", "Completed", "Failed"]),
            ),
            utilityStorageAccountId: Schema.optional(Schema.String),
            publicNetworkAccess: Schema.optional(
              Schema.Literals(["NotSpecified", "Enabled", "Disabled"]),
            ),
            privateEndpointConnections: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  id: Schema.optional(Schema.String),
                  name: Schema.optional(Schema.String),
                  type: Schema.optional(Schema.String),
                  eTag: Schema.optional(Schema.String),
                  properties: Schema.optional(
                    Schema.Struct({
                      provisioningState: Schema.optional(
                        Schema.Literals([
                          "Accepted",
                          "InProgress",
                          "Succeeded",
                          "Failed",
                          "Canceled",
                        ]),
                      ),
                      privateEndpoint: Schema.optional(
                        Schema.Struct({
                          id: Schema.optional(Schema.String),
                        }),
                      ),
                      privateLinkServiceConnectionState: Schema.optional(
                        Schema.Struct({
                          status: Schema.optional(
                            Schema.Literals([
                              "Approved",
                              "Pending",
                              "Rejected",
                              "Disconnected",
                            ]),
                          ),
                          description: Schema.optional(Schema.String),
                          actionsRequired: Schema.optional(Schema.String),
                        }),
                      ),
                    }),
                  ),
                  systemData: Schema.optional(
                    Schema.Struct({
                      createdBy: Schema.optional(Schema.String),
                      createdByType: Schema.optional(
                        Schema.Literals([
                          "User",
                          "Application",
                          "ManagedIdentity",
                          "Key",
                        ]),
                      ),
                      createdAt: Schema.optional(Schema.String),
                      lastModifiedBy: Schema.optional(Schema.String),
                      lastModifiedByType: Schema.optional(
                        Schema.Literals([
                          "User",
                          "Application",
                          "ManagedIdentity",
                          "Key",
                        ]),
                      ),
                      lastModifiedAt: Schema.optional(Schema.String),
                    }),
                  ),
                }),
              ),
            ),
          }),
        ),
        eTag: Schema.optional(Schema.String),
        location: Schema.optional(Schema.String),
        id: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        type: Schema.optional(Schema.String),
        systemData: Schema.optional(
          Schema.Struct({
            createdBy: Schema.optional(Schema.String),
            createdByType: Schema.optional(
              Schema.Literals([
                "User",
                "Application",
                "ManagedIdentity",
                "Key",
              ]),
            ),
            createdAt: Schema.optional(Schema.String),
            lastModifiedBy: Schema.optional(Schema.String),
            lastModifiedByType: Schema.optional(
              Schema.Literals([
                "User",
                "Application",
                "ManagedIdentity",
                "Key",
              ]),
            ),
            lastModifiedAt: Schema.optional(Schema.String),
          }),
        ),
      }),
    ),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type ProjectsListOutput = typeof ProjectsListOutput.Type;

// The operation
/**
 * Get all migrate projects.
 *
 * Get all the migrate projects in the resource group.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const ProjectsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ProjectsListInput,
  outputSchema: ProjectsListOutput,
}));
// Input Schema
export const ProjectsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Migrate/migrateProjects",
    }),
  );
export type ProjectsListBySubscriptionInput =
  typeof ProjectsListBySubscriptionInput.Type;

// Output Schema
export const ProjectsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          properties: Schema.optional(
            Schema.Struct({
              registeredTools: Schema.optional(
                Schema.Array(
                  Schema.Literals([
                    "ServerDiscovery",
                    "ServerAssessment",
                    "ServerMigration",
                    "Cloudamize",
                    "Turbonomic",
                    "Zerto",
                    "CorentTech",
                    "ServerAssessmentV1",
                    "ServerMigration_Replication",
                    "Carbonite",
                    "DataMigrationAssistant",
                    "DatabaseMigrationService",
                    "Device42",
                    "JetStream",
                    "RackWare",
                    "UnifyCloud",
                    "Flexera",
                    "ServerDiscovery_Import",
                    "Lakeside",
                    "AppServiceMigrationAssistant",
                    "Movere",
                    "CloudSphere",
                    "Modernization",
                    "ServerMigration_DataReplication",
                    "Unknown",
                  ]),
                ),
              ),
              serviceEndpoint: Schema.optional(Schema.String),
              summary: Schema.optional(
                Schema.Record(
                  Schema.String,
                  Schema.Struct({
                    instanceType: Schema.optional(Schema.String),
                    refreshSummaryState: Schema.optional(
                      Schema.Literals([
                        "Started",
                        "InProgress",
                        "Completed",
                        "Failed",
                      ]),
                    ),
                    lastSummaryRefreshedTime: Schema.optional(Schema.String),
                    extendedSummary: Schema.optional(
                      Schema.Record(Schema.String, Schema.String),
                    ),
                  }),
                ),
              ),
              lastSummaryRefreshedTime: Schema.optional(Schema.String),
              refreshSummaryState: Schema.optional(
                Schema.Literals([
                  "Started",
                  "InProgress",
                  "Completed",
                  "Failed",
                ]),
              ),
              utilityStorageAccountId: Schema.optional(Schema.String),
              publicNetworkAccess: Schema.optional(
                Schema.Literals(["NotSpecified", "Enabled", "Disabled"]),
              ),
              privateEndpointConnections: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    id: Schema.optional(Schema.String),
                    name: Schema.optional(Schema.String),
                    type: Schema.optional(Schema.String),
                    eTag: Schema.optional(Schema.String),
                    properties: Schema.optional(
                      Schema.Struct({
                        provisioningState: Schema.optional(
                          Schema.Literals([
                            "Accepted",
                            "InProgress",
                            "Succeeded",
                            "Failed",
                            "Canceled",
                          ]),
                        ),
                        privateEndpoint: Schema.optional(
                          Schema.Struct({
                            id: Schema.optional(Schema.String),
                          }),
                        ),
                        privateLinkServiceConnectionState: Schema.optional(
                          Schema.Struct({
                            status: Schema.optional(
                              Schema.Literals([
                                "Approved",
                                "Pending",
                                "Rejected",
                                "Disconnected",
                              ]),
                            ),
                            description: Schema.optional(Schema.String),
                            actionsRequired: Schema.optional(Schema.String),
                          }),
                        ),
                      }),
                    ),
                    systemData: Schema.optional(
                      Schema.Struct({
                        createdBy: Schema.optional(Schema.String),
                        createdByType: Schema.optional(
                          Schema.Literals([
                            "User",
                            "Application",
                            "ManagedIdentity",
                            "Key",
                          ]),
                        ),
                        createdAt: Schema.optional(Schema.String),
                        lastModifiedBy: Schema.optional(Schema.String),
                        lastModifiedByType: Schema.optional(
                          Schema.Literals([
                            "User",
                            "Application",
                            "ManagedIdentity",
                            "Key",
                          ]),
                        ),
                        lastModifiedAt: Schema.optional(Schema.String),
                      }),
                    ),
                  }),
                ),
              ),
            }),
          ),
          eTag: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          systemData: Schema.optional(
            Schema.Struct({
              createdBy: Schema.optional(Schema.String),
              createdByType: Schema.optional(
                Schema.Literals([
                  "User",
                  "Application",
                  "ManagedIdentity",
                  "Key",
                ]),
              ),
              createdAt: Schema.optional(Schema.String),
              lastModifiedBy: Schema.optional(Schema.String),
              lastModifiedByType: Schema.optional(
                Schema.Literals([
                  "User",
                  "Application",
                  "ManagedIdentity",
                  "Key",
                ]),
              ),
              lastModifiedAt: Schema.optional(Schema.String),
            }),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ProjectsListBySubscriptionOutput =
  typeof ProjectsListBySubscriptionOutput.Type;

// The operation
/**
 * Get all migrate projects.
 *
 * Get all the migrate projects in the subscription.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const ProjectsListBySubscription = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ProjectsListBySubscriptionInput,
    outputSchema: ProjectsListBySubscriptionOutput,
  }),
);
// Input Schema
export const RunAsAccountsControllerGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/vmwareSites/{siteName}/runAsAccounts/{accountName}",
    }),
  );
export type RunAsAccountsControllerGetInput =
  typeof RunAsAccountsControllerGetInput.Type;

// Output Schema
export const RunAsAccountsControllerGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type RunAsAccountsControllerGetOutput =
  typeof RunAsAccountsControllerGetOutput.Type;

// The operation
/**
 * Get a VmwareRunAsAccountResource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param accountName -  RunAsAccounts name
 */
export const RunAsAccountsControllerGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RunAsAccountsControllerGetInput,
    outputSchema: RunAsAccountsControllerGetOutput,
  }),
);
// Input Schema
export const RunAsAccountsControllerListByVmwareSiteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/vmwareSites/{siteName}/runAsAccounts",
    }),
  );
export type RunAsAccountsControllerListByVmwareSiteInput =
  typeof RunAsAccountsControllerListByVmwareSiteInput.Type;

// Output Schema
export const RunAsAccountsControllerListByVmwareSiteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type RunAsAccountsControllerListByVmwareSiteOutput =
  typeof RunAsAccountsControllerListByVmwareSiteOutput.Type;

// The operation
/**
 * List VmwareRunAsAccountResource resources by VmwareSite
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const RunAsAccountsControllerListByVmwareSite =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RunAsAccountsControllerListByVmwareSiteInput,
    outputSchema: RunAsAccountsControllerListByVmwareSiteOutput,
  }));
// Input Schema
export const ServerCollectorsOperationsCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    serverCollectorName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/servercollectors/{serverCollectorName}",
    }),
  );
export type ServerCollectorsOperationsCreateInput =
  typeof ServerCollectorsOperationsCreateInput.Type;

// Output Schema
export const ServerCollectorsOperationsCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ServerCollectorsOperationsCreateOutput =
  typeof ServerCollectorsOperationsCreateOutput.Type;

// The operation
/**
 * Create a ServerCollector
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 * @param serverCollectorName - Physical server collector ARM name
 */
export const ServerCollectorsOperationsCreate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServerCollectorsOperationsCreateInput,
    outputSchema: ServerCollectorsOperationsCreateOutput,
  }));
// Input Schema
export const ServerCollectorsOperationsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    serverCollectorName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/servercollectors/{serverCollectorName}",
    }),
  );
export type ServerCollectorsOperationsDeleteInput =
  typeof ServerCollectorsOperationsDeleteInput.Type;

// Output Schema
export const ServerCollectorsOperationsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ServerCollectorsOperationsDeleteOutput =
  typeof ServerCollectorsOperationsDeleteOutput.Type;

// The operation
/**
 * Delete a ServerCollector
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 * @param serverCollectorName - Physical server collector ARM name
 */
export const ServerCollectorsOperationsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServerCollectorsOperationsDeleteInput,
    outputSchema: ServerCollectorsOperationsDeleteOutput,
  }));
// Input Schema
export const ServerCollectorsOperationsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    serverCollectorName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/servercollectors/{serverCollectorName}",
    }),
  );
export type ServerCollectorsOperationsGetInput =
  typeof ServerCollectorsOperationsGetInput.Type;

// Output Schema
export const ServerCollectorsOperationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ServerCollectorsOperationsGetOutput =
  typeof ServerCollectorsOperationsGetOutput.Type;

// The operation
/**
 * Get a ServerCollector
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 * @param serverCollectorName - Physical server collector ARM name
 */
export const ServerCollectorsOperationsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServerCollectorsOperationsGetInput,
    outputSchema: ServerCollectorsOperationsGetOutput,
  }));
// Input Schema
export const ServerCollectorsOperationsListByAssessmentProjectInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/servercollectors",
    }),
  );
export type ServerCollectorsOperationsListByAssessmentProjectInput =
  typeof ServerCollectorsOperationsListByAssessmentProjectInput.Type;

// Output Schema
export const ServerCollectorsOperationsListByAssessmentProjectOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type ServerCollectorsOperationsListByAssessmentProjectOutput =
  typeof ServerCollectorsOperationsListByAssessmentProjectOutput.Type;

// The operation
/**
 * List ServerCollector resources by AssessmentProject
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 */
export const ServerCollectorsOperationsListByAssessmentProject =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServerCollectorsOperationsListByAssessmentProjectInput,
    outputSchema: ServerCollectorsOperationsListByAssessmentProjectOutput,
  }));
// Input Schema
export const ServerDependencyMapControllerClientGroupMembersInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/serverSites/{siteName}/clientGroupMembers",
    }),
  );
export type ServerDependencyMapControllerClientGroupMembersInput =
  typeof ServerDependencyMapControllerClientGroupMembersInput.Type;

// Output Schema
export const ServerDependencyMapControllerClientGroupMembersOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown;
export type ServerDependencyMapControllerClientGroupMembersOutput =
  typeof ServerDependencyMapControllerClientGroupMembersOutput.Type;

// The operation
/**
 * API to list client group members for the selected client group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const ServerDependencyMapControllerClientGroupMembers =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServerDependencyMapControllerClientGroupMembersInput,
    outputSchema: ServerDependencyMapControllerClientGroupMembersOutput,
  }));
// Input Schema
export const ServerDependencyMapControllerExportDependenciesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/serverSites/{siteName}/exportDependencies",
    }),
  );
export type ServerDependencyMapControllerExportDependenciesInput =
  typeof ServerDependencyMapControllerExportDependenciesInput.Type;

// Output Schema
export const ServerDependencyMapControllerExportDependenciesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown;
export type ServerDependencyMapControllerExportDependenciesOutput =
  typeof ServerDependencyMapControllerExportDependenciesOutput.Type;

// The operation
/**
 * API to generate report containing agentless dependencies.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const ServerDependencyMapControllerExportDependencies =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServerDependencyMapControllerExportDependenciesInput,
    outputSchema: ServerDependencyMapControllerExportDependenciesOutput,
  }));
// Input Schema
export const ServerDependencyMapControllerGenerateCoarseMapInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/serverSites/{siteName}/generateCoarseMap",
    }),
  );
export type ServerDependencyMapControllerGenerateCoarseMapInput =
  typeof ServerDependencyMapControllerGenerateCoarseMapInput.Type;

// Output Schema
export const ServerDependencyMapControllerGenerateCoarseMapOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown;
export type ServerDependencyMapControllerGenerateCoarseMapOutput =
  typeof ServerDependencyMapControllerGenerateCoarseMapOutput.Type;

// The operation
/**
 * API to generate coarse map for the list of machines.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const ServerDependencyMapControllerGenerateCoarseMap =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServerDependencyMapControllerGenerateCoarseMapInput,
    outputSchema: ServerDependencyMapControllerGenerateCoarseMapOutput,
  }));
// Input Schema
export const ServerDependencyMapControllerGenerateDetailedMapInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/serverSites/{siteName}/generateDetailedMap",
    }),
  );
export type ServerDependencyMapControllerGenerateDetailedMapInput =
  typeof ServerDependencyMapControllerGenerateDetailedMapInput.Type;

// Output Schema
export const ServerDependencyMapControllerGenerateDetailedMapOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown;
export type ServerDependencyMapControllerGenerateDetailedMapOutput =
  typeof ServerDependencyMapControllerGenerateDetailedMapOutput.Type;

// The operation
/**
 * API to generate detailed map for a selected machine.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const ServerDependencyMapControllerGenerateDetailedMap =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServerDependencyMapControllerGenerateDetailedMapInput,
    outputSchema: ServerDependencyMapControllerGenerateDetailedMapOutput,
  }));
// Input Schema
export const ServerDependencyMapControllerServerGroupMembersInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/serverSites/{siteName}/serverGroupMembers",
    }),
  );
export type ServerDependencyMapControllerServerGroupMembersInput =
  typeof ServerDependencyMapControllerServerGroupMembersInput.Type;

// Output Schema
export const ServerDependencyMapControllerServerGroupMembersOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown;
export type ServerDependencyMapControllerServerGroupMembersOutput =
  typeof ServerDependencyMapControllerServerGroupMembersOutput.Type;

// The operation
/**
 * API to list server group members for the selected server group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const ServerDependencyMapControllerServerGroupMembers =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServerDependencyMapControllerServerGroupMembersInput,
    outputSchema: ServerDependencyMapControllerServerGroupMembersOutput,
  }));
// Input Schema
export const ServerJobsControllerGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    jobName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/serverSites/{siteName}/jobs/{jobName}",
    }),
  );
export type ServerJobsControllerGetInput =
  typeof ServerJobsControllerGetInput.Type;

// Output Schema
export const ServerJobsControllerGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ServerJobsControllerGetOutput =
  typeof ServerJobsControllerGetOutput.Type;

// The operation
/**
 * Get a ServerJob
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param jobName -  Jobs name
 */
export const ServerJobsControllerGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ServerJobsControllerGetInput,
    outputSchema: ServerJobsControllerGetOutput,
  }),
);
// Input Schema
export const ServerJobsControllerListByServerSiteResourceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/serverSites/{siteName}/jobs",
    }),
  );
export type ServerJobsControllerListByServerSiteResourceInput =
  typeof ServerJobsControllerListByServerSiteResourceInput.Type;

// Output Schema
export const ServerJobsControllerListByServerSiteResourceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type ServerJobsControllerListByServerSiteResourceOutput =
  typeof ServerJobsControllerListByServerSiteResourceOutput.Type;

// The operation
/**
 * List ServerJob resources by ServerSiteResource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const ServerJobsControllerListByServerSiteResource =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServerJobsControllerListByServerSiteResourceInput,
    outputSchema: ServerJobsControllerListByServerSiteResourceOutput,
  }));
// Input Schema
export const ServerOperationsStatusControllerGetServerSiteOperationsStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    operationStatusName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/serverSites/{siteName}/operationsStatus/{operationStatusName}",
    }),
  );
export type ServerOperationsStatusControllerGetServerSiteOperationsStatusInput =
  typeof ServerOperationsStatusControllerGetServerSiteOperationsStatusInput.Type;

// Output Schema
export const ServerOperationsStatusControllerGetServerSiteOperationsStatusOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    status: Schema.optional(Schema.String),
    startTime: Schema.optional(Schema.String),
    endTime: Schema.optional(Schema.String),
    error: Schema.optional(
      Schema.Struct({
        code: Schema.optional(Schema.String),
        message: Schema.optional(Schema.String),
      }),
    ),
    properties: Schema.optional(
      Schema.Struct({
        result: Schema.optional(Schema.String),
      }),
    ),
  });
export type ServerOperationsStatusControllerGetServerSiteOperationsStatusOutput =
  typeof ServerOperationsStatusControllerGetServerSiteOperationsStatusOutput.Type;

// The operation
/**
 * A operation status resource belonging to a site resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param operationStatusName - Operation status  Arm Name.
 */
export const ServerOperationsStatusControllerGetServerSiteOperationsStatus =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      ServerOperationsStatusControllerGetServerSiteOperationsStatusInput,
    outputSchema:
      ServerOperationsStatusControllerGetServerSiteOperationsStatusOutput,
  }));
// Input Schema
export const ServerRunAsAccountsControllerGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/serverSites/{siteName}/runAsAccounts/{accountName}",
    }),
  );
export type ServerRunAsAccountsControllerGetInput =
  typeof ServerRunAsAccountsControllerGetInput.Type;

// Output Schema
export const ServerRunAsAccountsControllerGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ServerRunAsAccountsControllerGetOutput =
  typeof ServerRunAsAccountsControllerGetOutput.Type;

// The operation
/**
 * Get a ServerRunAsAccount
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param accountName -  RunAsAccounts name
 */
export const ServerRunAsAccountsControllerGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServerRunAsAccountsControllerGetInput,
    outputSchema: ServerRunAsAccountsControllerGetOutput,
  }));
// Input Schema
export const ServerRunAsAccountsControllerListByServerSiteResourceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/serverSites/{siteName}/runAsAccounts",
    }),
  );
export type ServerRunAsAccountsControllerListByServerSiteResourceInput =
  typeof ServerRunAsAccountsControllerListByServerSiteResourceInput.Type;

// Output Schema
export const ServerRunAsAccountsControllerListByServerSiteResourceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type ServerRunAsAccountsControllerListByServerSiteResourceOutput =
  typeof ServerRunAsAccountsControllerListByServerSiteResourceOutput.Type;

// The operation
/**
 * List ServerRunAsAccount resources by ServerSiteResource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const ServerRunAsAccountsControllerListByServerSiteResource =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServerRunAsAccountsControllerListByServerSiteResourceInput,
    outputSchema: ServerRunAsAccountsControllerListByServerSiteResourceOutput,
  }));
// Input Schema
export const ServersControllerDeleteMachineInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    machineName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/serverSites/{siteName}/machines/{machineName}",
    }),
  );
export type ServersControllerDeleteMachineInput =
  typeof ServersControllerDeleteMachineInput.Type;

// Output Schema
export const ServersControllerDeleteMachineOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ServersControllerDeleteMachineOutput =
  typeof ServersControllerDeleteMachineOutput.Type;

// The operation
/**
 * Delete a Server
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param machineName -  A server machine name
 */
export const ServersControllerDeleteMachine =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServersControllerDeleteMachineInput,
    outputSchema: ServersControllerDeleteMachineOutput,
  }));
// Input Schema
export const ServersControllerGetMachineInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    machineName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/serverSites/{siteName}/machines/{machineName}",
    }),
  );
export type ServersControllerGetMachineInput =
  typeof ServersControllerGetMachineInput.Type;

// Output Schema
export const ServersControllerGetMachineOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ServersControllerGetMachineOutput =
  typeof ServersControllerGetMachineOutput.Type;

// The operation
/**
 * Get a Server
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param machineName -  A server machine name
 */
export const ServersControllerGetMachine = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ServersControllerGetMachineInput,
    outputSchema: ServersControllerGetMachineOutput,
  }),
);
// Input Schema
export const ServersControllerListByServerSiteResourceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    filter: Schema.optional(Schema.String),
    top: Schema.optional(Schema.String),
    continuationToken: Schema.optional(Schema.String),
    totalRecordCount: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/serverSites/{siteName}/machines",
    }),
  );
export type ServersControllerListByServerSiteResourceInput =
  typeof ServersControllerListByServerSiteResourceInput.Type;

// Output Schema
export const ServersControllerListByServerSiteResourceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type ServersControllerListByServerSiteResourceOutput =
  typeof ServersControllerListByServerSiteResourceOutput.Type;

// The operation
/**
 * Get all machines in a site.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param filter - filter query
 * @param top - page size  query
 * @param continuationToken - Optional parameter for continuation token.
 * @param totalRecordCount - Total count of machines in the given site.
 * @param siteName - Site name
 */
export const ServersControllerListByServerSiteResource =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServersControllerListByServerSiteResourceInput,
    outputSchema: ServersControllerListByServerSiteResourceOutput,
  }));
// Input Schema
export const ServersControllerUpdateMachineInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    machineName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/serverSites/{siteName}/machines/{machineName}",
    }),
  );
export type ServersControllerUpdateMachineInput =
  typeof ServersControllerUpdateMachineInput.Type;

// Output Schema
export const ServersControllerUpdateMachineOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ServersControllerUpdateMachineOutput =
  typeof ServersControllerUpdateMachineOutput.Type;

// The operation
/**
 * Update a Server machine
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param machineName -  A server machine name
 */
export const ServersControllerUpdateMachine =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServersControllerUpdateMachineInput,
    outputSchema: ServersControllerUpdateMachineOutput,
  }));
// Input Schema
export const ServerSitesControllerComputeErrorSummaryInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/serverSites/{siteName}/computeErrorSummary",
    }),
  );
export type ServerSitesControllerComputeErrorSummaryInput =
  typeof ServerSitesControllerComputeErrorSummaryInput.Type;

// Output Schema
export const ServerSitesControllerComputeErrorSummaryOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    applianceName: Schema.String,
    discoveryScopeErrorSummaries: Schema.Struct({
      affectedResourceType: Schema.String,
      affectedObjectsCount: Schema.Number,
      discoveryScope: Schema.Literals([
        "AppsAndRoles",
        "DependencyMap",
        "StaticData",
        "SQLServerConnectionInfo",
      ]),
    }),
    nextLink: Schema.optional(Schema.String),
  });
export type ServerSitesControllerComputeErrorSummaryOutput =
  typeof ServerSitesControllerComputeErrorSummaryOutput.Type;

// The operation
/**
 * Get the error summary for a server site.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const ServerSitesControllerComputeErrorSummary =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServerSitesControllerComputeErrorSummaryInput,
    outputSchema: ServerSitesControllerComputeErrorSummaryOutput,
  }));
// Input Schema
export const ServerSitesControllerComputeusageInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/serverSites/{siteName}/computeusage",
    }),
  );
export type ServerSitesControllerComputeusageInput =
  typeof ServerSitesControllerComputeusageInput.Type;

// Output Schema
export const ServerSitesControllerComputeusageOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    runAsAccounts: Schema.Number,
    serverCount: Schema.Number,
  });
export type ServerSitesControllerComputeusageOutput =
  typeof ServerSitesControllerComputeusageOutput.Type;

// The operation
/**
 * Get a serve site usage.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const ServerSitesControllerComputeusage =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServerSitesControllerComputeusageInput,
    outputSchema: ServerSitesControllerComputeusageOutput,
  }));
// Input Schema
export const ServerSitesControllerCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/serverSites/{siteName}",
    }),
  );
export type ServerSitesControllerCreateInput =
  typeof ServerSitesControllerCreateInput.Type;

// Output Schema
export const ServerSitesControllerCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ServerSitesControllerCreateOutput =
  typeof ServerSitesControllerCreateOutput.Type;

// The operation
/**
 * Create a ServerSiteResource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const ServerSitesControllerCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ServerSitesControllerCreateInput,
    outputSchema: ServerSitesControllerCreateOutput,
  }),
);
// Input Schema
export const ServerSitesControllerDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/serverSites/{siteName}",
    }),
  );
export type ServerSitesControllerDeleteInput =
  typeof ServerSitesControllerDeleteInput.Type;

// Output Schema
export const ServerSitesControllerDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ServerSitesControllerDeleteOutput =
  typeof ServerSitesControllerDeleteOutput.Type;

// The operation
/**
 * Delete a ServerSiteResource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const ServerSitesControllerDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ServerSitesControllerDeleteInput,
    outputSchema: ServerSitesControllerDeleteOutput,
  }),
);
// Input Schema
export const ServerSitesControllerExportApplicationsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/serverSites/{siteName}/exportApplications",
    }),
  );
export type ServerSitesControllerExportApplicationsInput =
  typeof ServerSitesControllerExportApplicationsInput.Type;

// Output Schema
export const ServerSitesControllerExportApplicationsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown;
export type ServerSitesControllerExportApplicationsOutput =
  typeof ServerSitesControllerExportApplicationsOutput.Type;

// The operation
/**
 * Method to generate report containing
 * machine and the deep discovery of the application installed in the machine.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const ServerSitesControllerExportApplications =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServerSitesControllerExportApplicationsInput,
    outputSchema: ServerSitesControllerExportApplicationsOutput,
  }));
// Input Schema
export const ServerSitesControllerExportMachineErrorsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/serverSites/{siteName}/exportMachineErrors",
    }),
  );
export type ServerSitesControllerExportMachineErrorsInput =
  typeof ServerSitesControllerExportMachineErrorsInput.Type;

// Output Schema
export const ServerSitesControllerExportMachineErrorsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown;
export type ServerSitesControllerExportMachineErrorsOutput =
  typeof ServerSitesControllerExportMachineErrorsOutput.Type;

// The operation
/**
 * Method to generate report containing
 * machine and the errors encountered during guest discovery of the machine.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const ServerSitesControllerExportMachineErrors =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServerSitesControllerExportMachineErrorsInput,
    outputSchema: ServerSitesControllerExportMachineErrorsOutput,
  }));
// Input Schema
export const ServerSitesControllerGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/serverSites/{siteName}",
    }),
  );
export type ServerSitesControllerGetInput =
  typeof ServerSitesControllerGetInput.Type;

// Output Schema
export const ServerSitesControllerGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ServerSitesControllerGetOutput =
  typeof ServerSitesControllerGetOutput.Type;

// The operation
/**
 * Get a ServerSiteResource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const ServerSitesControllerGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ServerSitesControllerGetInput,
    outputSchema: ServerSitesControllerGetOutput,
  }),
);
// Input Schema
export const ServerSitesControllerListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/serverSites",
    }),
  );
export type ServerSitesControllerListByResourceGroupInput =
  typeof ServerSitesControllerListByResourceGroupInput.Type;

// Output Schema
export const ServerSitesControllerListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ServerSitesControllerListByResourceGroupOutput =
  typeof ServerSitesControllerListByResourceGroupOutput.Type;

// The operation
/**
 * List ServerSiteResource resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ServerSitesControllerListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServerSitesControllerListByResourceGroupInput,
    outputSchema: ServerSitesControllerListByResourceGroupOutput,
  }));
// Input Schema
export const ServerSitesControllerListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.OffAzure/serverSites",
    }),
  );
export type ServerSitesControllerListBySubscriptionInput =
  typeof ServerSitesControllerListBySubscriptionInput.Type;

// Output Schema
export const ServerSitesControllerListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ServerSitesControllerListBySubscriptionOutput =
  typeof ServerSitesControllerListBySubscriptionOutput.Type;

// The operation
/**
 * List ServerSiteResource resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const ServerSitesControllerListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServerSitesControllerListBySubscriptionInput,
    outputSchema: ServerSitesControllerListBySubscriptionOutput,
  }));
// Input Schema
export const ServerSitesControllerListHealthSummaryInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/serverSites/{siteName}/listHealthSummary",
    }),
  );
export type ServerSitesControllerListHealthSummaryInput =
  typeof ServerSitesControllerListHealthSummaryInput.Type;

// Output Schema
export const ServerSitesControllerListHealthSummaryOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        applianceName: Schema.optional(Schema.String),
        errorMessage: Schema.optional(Schema.String),
        summaryMessage: Schema.optional(Schema.String),
        errorId: Schema.optional(Schema.Number),
        errorCode: Schema.optional(Schema.String),
        affectedObjectsCount: Schema.optional(Schema.Number),
        hitCount: Schema.optional(Schema.Number),
        severity: Schema.optional(Schema.String),
        remediationGuidance: Schema.optional(Schema.String),
        affectedResourceType: Schema.optional(Schema.String),
        affectedResources: Schema.optional(Schema.Array(Schema.String)),
        fabricLayoutUpdateSources: Schema.optional(
          Schema.Array(
            Schema.Literals([
              "RefreshFabricLayout",
              "RefreshFabricLayoutGuest",
              "RefreshFabricLayoutDependencyMap",
            ]),
          ),
        ),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ServerSitesControllerListHealthSummaryOutput =
  typeof ServerSitesControllerListHealthSummaryOutput.Type;

// The operation
/**
 * Method to get site health summary.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const ServerSitesControllerListHealthSummary =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServerSitesControllerListHealthSummaryInput,
    outputSchema: ServerSitesControllerListHealthSummaryOutput,
  }));
// Input Schema
export const ServerSitesControllerRefreshSiteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/serverSites/{siteName}/refreshSite",
    }),
  );
export type ServerSitesControllerRefreshSiteInput =
  typeof ServerSitesControllerRefreshSiteInput.Type;

// Output Schema
export const ServerSitesControllerRefreshSiteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown;
export type ServerSitesControllerRefreshSiteOutput =
  typeof ServerSitesControllerRefreshSiteOutput.Type;

// The operation
/**
 * Operation to refresh a site
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const ServerSitesControllerRefreshSite =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServerSitesControllerRefreshSiteInput,
    outputSchema: ServerSitesControllerRefreshSiteOutput,
  }));
// Input Schema
export const ServerSitesControllerSummaryInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/serverSites/{siteName}/summary",
    }),
  );
export type ServerSitesControllerSummaryInput =
  typeof ServerSitesControllerSummaryInput.Type;

// Output Schema
export const ServerSitesControllerSummaryOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    runAsAccountCount: Schema.optional(Schema.Number),
    serverCount: Schema.optional(Schema.Number),
  });
export type ServerSitesControllerSummaryOutput =
  typeof ServerSitesControllerSummaryOutput.Type;

// The operation
/**
 * Method to get site usage.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const ServerSitesControllerSummary =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServerSitesControllerSummaryInput,
    outputSchema: ServerSitesControllerSummaryOutput,
  }));
// Input Schema
export const ServerSitesControllerUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/serverSites/{siteName}",
    }),
  );
export type ServerSitesControllerUpdateInput =
  typeof ServerSitesControllerUpdateInput.Type;

// Output Schema
export const ServerSitesControllerUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ServerSitesControllerUpdateOutput =
  typeof ServerSitesControllerUpdateOutput.Type;

// The operation
/**
 * Update a ServerSiteResource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const ServerSitesControllerUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ServerSitesControllerUpdateInput,
    outputSchema: ServerSitesControllerUpdateOutput,
  }),
);
// Input Schema
export const ServerSitesControllerUpdateDependencyMapStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/serverSites/{siteName}/updateDependencyMapStatus",
    }),
  );
export type ServerSitesControllerUpdateDependencyMapStatusInput =
  typeof ServerSitesControllerUpdateDependencyMapStatusInput.Type;

// Output Schema
export const ServerSitesControllerUpdateDependencyMapStatusOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown;
export type ServerSitesControllerUpdateDependencyMapStatusOutput =
  typeof ServerSitesControllerUpdateDependencyMapStatusOutput.Type;

// The operation
/**
 * Method to enable disable dependency map status for machines
 * in a site.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const ServerSitesControllerUpdateDependencyMapStatus =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServerSitesControllerUpdateDependencyMapStatusInput,
    outputSchema: ServerSitesControllerUpdateDependencyMapStatusOutput,
  }));
// Input Schema
export const ServerSitesControllerUpdatePropertiesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/serverSites/{siteName}/updateProperties",
    }),
  );
export type ServerSitesControllerUpdatePropertiesInput =
  typeof ServerSitesControllerUpdatePropertiesInput.Type;

// Output Schema
export const ServerSitesControllerUpdatePropertiesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown;
export type ServerSitesControllerUpdatePropertiesOutput =
  typeof ServerSitesControllerUpdatePropertiesOutput.Type;

// The operation
/**
 * Operation to update custom properties for servers
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const ServerSitesControllerUpdateProperties =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServerSitesControllerUpdatePropertiesInput,
    outputSchema: ServerSitesControllerUpdatePropertiesOutput,
  }));
// Input Schema
export const ServerSoftwareInventoriesControllerGetMachineSoftwareInventoryInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    machineName: Schema.String.pipe(T.PathParam()),
    default: Schema.Literals(["default"]).pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/serverSites/{siteName}/machines/{machineName}/softwareInventories/{default}",
    }),
  );
export type ServerSoftwareInventoriesControllerGetMachineSoftwareInventoryInput =
  typeof ServerSoftwareInventoriesControllerGetMachineSoftwareInventoryInput.Type;

// Output Schema
export const ServerSoftwareInventoriesControllerGetMachineSoftwareInventoryOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ServerSoftwareInventoriesControllerGetMachineSoftwareInventoryOutput =
  typeof ServerSoftwareInventoriesControllerGetMachineSoftwareInventoryOutput.Type;

// The operation
/**
 * Method to get a machines software inventory like applications and roles.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param machineName -  A server machine name
 * @param default - Default value.
 */
export const ServerSoftwareInventoriesControllerGetMachineSoftwareInventory =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      ServerSoftwareInventoriesControllerGetMachineSoftwareInventoryInput,
    outputSchema:
      ServerSoftwareInventoriesControllerGetMachineSoftwareInventoryOutput,
  }));
// Input Schema
export const ServerSoftwareInventoriesControllerListByServerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    machineName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/serverSites/{siteName}/machines/{machineName}/softwareinventories",
    }),
  );
export type ServerSoftwareInventoriesControllerListByServerInput =
  typeof ServerSoftwareInventoriesControllerListByServerInput.Type;

// Output Schema
export const ServerSoftwareInventoriesControllerListByServerOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type ServerSoftwareInventoriesControllerListByServerOutput =
  typeof ServerSoftwareInventoriesControllerListByServerOutput.Type;

// The operation
/**
 * List ServerSoftwareInventory resources by Server
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param machineName -  A server machine name
 */
export const ServerSoftwareInventoriesControllerListByServer =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServerSoftwareInventoriesControllerListByServerInput,
    outputSchema: ServerSoftwareInventoriesControllerListByServerOutput,
  }));
// Input Schema
export const SitesControllerComputeErrorSummaryInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/vmwareSites/{siteName}/computeErrorSummary",
    }),
  );
export type SitesControllerComputeErrorSummaryInput =
  typeof SitesControllerComputeErrorSummaryInput.Type;

// Output Schema
export const SitesControllerComputeErrorSummaryOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    applianceName: Schema.String,
    discoveryScopeErrorSummaries: Schema.Struct({
      affectedResourceType: Schema.String,
      affectedObjectsCount: Schema.Number,
      discoveryScope: Schema.Literals([
        "AppsAndRoles",
        "DependencyMap",
        "StaticData",
        "SQLServerConnectionInfo",
      ]),
    }),
    nextLink: Schema.optional(Schema.String),
  });
export type SitesControllerComputeErrorSummaryOutput =
  typeof SitesControllerComputeErrorSummaryOutput.Type;

// The operation
/**
 * Method to get site error summary.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const SitesControllerComputeErrorSummary =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SitesControllerComputeErrorSummaryInput,
    outputSchema: SitesControllerComputeErrorSummaryOutput,
  }));
// Input Schema
export const SitesControllerComputeusageInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/vmwareSites/{siteName}/computeusage",
    }),
  );
export type SitesControllerComputeusageInput =
  typeof SitesControllerComputeusageInput.Type;

// Output Schema
export const SitesControllerComputeusageOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    machineCount: Schema.optional(Schema.Number),
    runAsAccountCount: Schema.optional(Schema.Number),
    vCenterCount: Schema.optional(Schema.Number),
  });
export type SitesControllerComputeusageOutput =
  typeof SitesControllerComputeusageOutput.Type;

// The operation
/**
 * Method to get site error summary.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const SitesControllerComputeusage = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SitesControllerComputeusageInput,
    outputSchema: SitesControllerComputeusageOutput,
  }),
);
// Input Schema
export const SitesControllerCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/vmwareSites/{siteName}",
    }),
  );
export type SitesControllerCreateInput = typeof SitesControllerCreateInput.Type;

// Output Schema
export const SitesControllerCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SitesControllerCreateOutput =
  typeof SitesControllerCreateOutput.Type;

// The operation
/**
 * Create a VmwareSite
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const SitesControllerCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SitesControllerCreateInput,
    outputSchema: SitesControllerCreateOutput,
  }),
);
// Input Schema
export const SitesControllerDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/vmwareSites/{siteName}",
    }),
  );
export type SitesControllerDeleteInput = typeof SitesControllerDeleteInput.Type;

// Output Schema
export const SitesControllerDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SitesControllerDeleteOutput =
  typeof SitesControllerDeleteOutput.Type;

// The operation
/**
 * Delete a VmwareSite
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const SitesControllerDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SitesControllerDeleteInput,
    outputSchema: SitesControllerDeleteOutput,
  }),
);
// Input Schema
export const SitesControllerExportApplicationsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/vmwareSites/{siteName}/exportApplications",
    }),
  );
export type SitesControllerExportApplicationsInput =
  typeof SitesControllerExportApplicationsInput.Type;

// Output Schema
export const SitesControllerExportApplicationsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown;
export type SitesControllerExportApplicationsOutput =
  typeof SitesControllerExportApplicationsOutput.Type;

// The operation
/**
 * Method to generate report containing
 * machine and the deep discovery of the application installed in the machine.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const SitesControllerExportApplications =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SitesControllerExportApplicationsInput,
    outputSchema: SitesControllerExportApplicationsOutput,
  }));
// Input Schema
export const SitesControllerExportMachineErrorsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/vmwareSites/{siteName}/exportMachineErrors",
    }),
  );
export type SitesControllerExportMachineErrorsInput =
  typeof SitesControllerExportMachineErrorsInput.Type;

// Output Schema
export const SitesControllerExportMachineErrorsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown;
export type SitesControllerExportMachineErrorsOutput =
  typeof SitesControllerExportMachineErrorsOutput.Type;

// The operation
/**
 * Method to generate report containing
 * machine and the errors encountered during guest discovery of the machine.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const SitesControllerExportMachineErrors =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SitesControllerExportMachineErrorsInput,
    outputSchema: SitesControllerExportMachineErrorsOutput,
  }));
// Input Schema
export const SitesControllerExportMachinesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/vmwareSites/{siteName}/exportMachines",
    }),
  );
export type SitesControllerExportMachinesInput =
  typeof SitesControllerExportMachinesInput.Type;

// Output Schema
export const SitesControllerExportMachinesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown;
export type SitesControllerExportMachinesOutput =
  typeof SitesControllerExportMachinesOutput.Type;

// The operation
/**
 * Method to generate report containing
 * machine and the deep discovery of the application installed in the machine.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const SitesControllerExportMachines =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SitesControllerExportMachinesInput,
    outputSchema: SitesControllerExportMachinesOutput,
  }));
// Input Schema
export const SitesControllerGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/vmwareSites/{siteName}",
    }),
  );
export type SitesControllerGetInput = typeof SitesControllerGetInput.Type;

// Output Schema
export const SitesControllerGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SitesControllerGetOutput = typeof SitesControllerGetOutput.Type;

// The operation
/**
 * Get a VmwareSite
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const SitesControllerGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SitesControllerGetInput,
  outputSchema: SitesControllerGetOutput,
}));
// Input Schema
export const SitesControllerListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/vmwareSites",
    }),
  );
export type SitesControllerListByResourceGroupInput =
  typeof SitesControllerListByResourceGroupInput.Type;

// Output Schema
export const SitesControllerListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type SitesControllerListByResourceGroupOutput =
  typeof SitesControllerListByResourceGroupOutput.Type;

// The operation
/**
 * Get all vmware sites.
 *
 * Get all the vmware sites in the resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const SitesControllerListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SitesControllerListByResourceGroupInput,
    outputSchema: SitesControllerListByResourceGroupOutput,
  }));
// Input Schema
export const SitesControllerListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.OffAzure/vmwareSites",
    }),
  );
export type SitesControllerListBySubscriptionInput =
  typeof SitesControllerListBySubscriptionInput.Type;

// Output Schema
export const SitesControllerListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type SitesControllerListBySubscriptionOutput =
  typeof SitesControllerListBySubscriptionOutput.Type;

// The operation
/**
 * Get all vmware sites.
 *
 * Get all the vmware sites in the subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const SitesControllerListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SitesControllerListBySubscriptionInput,
    outputSchema: SitesControllerListBySubscriptionOutput,
  }));
// Input Schema
export const SitesControllerListHealthSummaryInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/vmwareSites/{siteName}/listHealthSummary",
    }),
  );
export type SitesControllerListHealthSummaryInput =
  typeof SitesControllerListHealthSummaryInput.Type;

// Output Schema
export const SitesControllerListHealthSummaryOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        applianceName: Schema.optional(Schema.String),
        errorMessage: Schema.optional(Schema.String),
        summaryMessage: Schema.optional(Schema.String),
        errorId: Schema.optional(Schema.Number),
        errorCode: Schema.optional(Schema.String),
        affectedObjectsCount: Schema.optional(Schema.Number),
        hitCount: Schema.optional(Schema.Number),
        severity: Schema.optional(Schema.String),
        remediationGuidance: Schema.optional(Schema.String),
        affectedResourceType: Schema.optional(Schema.String),
        affectedResources: Schema.optional(Schema.Array(Schema.String)),
        fabricLayoutUpdateSources: Schema.optional(
          Schema.Array(
            Schema.Literals([
              "RefreshFabricLayout",
              "RefreshFabricLayoutGuest",
              "RefreshFabricLayoutDependencyMap",
            ]),
          ),
        ),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type SitesControllerListHealthSummaryOutput =
  typeof SitesControllerListHealthSummaryOutput.Type;

// The operation
/**
 * Method to get site health summary.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const SitesControllerListHealthSummary =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SitesControllerListHealthSummaryInput,
    outputSchema: SitesControllerListHealthSummaryOutput,
  }));
// Input Schema
export const SitesControllerSummaryInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/vmwareSites/{siteName}/summary",
    }),
  );
export type SitesControllerSummaryInput =
  typeof SitesControllerSummaryInput.Type;

// Output Schema
export const SitesControllerSummaryOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    machineCount: Schema.optional(Schema.Number),
    runAsAccountCount: Schema.optional(Schema.Number),
    vCenterCount: Schema.optional(Schema.Number),
  });
export type SitesControllerSummaryOutput =
  typeof SitesControllerSummaryOutput.Type;

// The operation
/**
 * Method to get site usage/summary.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const SitesControllerSummary = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SitesControllerSummaryInput,
    outputSchema: SitesControllerSummaryOutput,
  }),
);
// Input Schema
export const SitesControllerUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/vmwareSites/{siteName}",
    }),
  );
export type SitesControllerUpdateInput = typeof SitesControllerUpdateInput.Type;

// Output Schema
export const SitesControllerUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SitesControllerUpdateOutput =
  typeof SitesControllerUpdateOutput.Type;

// The operation
/**
 * Update a VmwareSite
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const SitesControllerUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SitesControllerUpdateInput,
    outputSchema: SitesControllerUpdateOutput,
  }),
);
// Input Schema
export const SolutionsControllerCleanupDataInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/migrateProjects/{migrateProjectName}/solutions/{solutionName}/cleanupData",
    }),
  );
export type SolutionsControllerCleanupDataInput =
  typeof SolutionsControllerCleanupDataInput.Type;

// Output Schema
export const SolutionsControllerCleanupDataOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SolutionsControllerCleanupDataOutput =
  typeof SolutionsControllerCleanupDataOutput.Type;

// The operation
/**
 * Cleanup the solution data in the migrate project.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SolutionsControllerCleanupData =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SolutionsControllerCleanupDataInput,
    outputSchema: SolutionsControllerCleanupDataOutput,
  }));
// Input Schema
export const SolutionsControllerCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/migrateProjects/{migrateProjectName}/solutions/{solutionName}",
    }),
  );
export type SolutionsControllerCreateInput =
  typeof SolutionsControllerCreateInput.Type;

// Output Schema
export const SolutionsControllerCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    etag: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        tool: Schema.optional(
          Schema.Literals([
            "ServerDiscovery",
            "ServerAssessment",
            "ServerMigration",
            "Cloudamize",
            "Turbonomic",
            "Zerto",
            "CorentTech",
            "ServerAssessmentV1",
            "ServerMigration_Replication",
            "Carbonite",
            "DataMigrationAssistant",
            "DatabaseMigrationService",
            "Device42",
            "JetStream",
            "RackWare",
            "UnifyCloud",
            "Flexera",
            "ServerDiscovery_Import",
            "Lakeside",
            "AppServiceMigrationAssistant",
            "Movere",
            "CloudSphere",
            "Modernization",
            "ServerMigration_DataReplication",
            "Unknown",
          ]),
        ),
        purpose: Schema.optional(
          Schema.Literals(["Discovery", "Assessment", "Migration"]),
        ),
        goal: Schema.optional(
          Schema.Literals([
            "Servers",
            "Databases",
            "DesktopVirtualization",
            "WebApplications",
            "DataCenter",
          ]),
        ),
        status: Schema.optional(Schema.Literals(["Inactive", "Active"])),
        cleanupState: Schema.optional(
          Schema.Literals([
            "None",
            "Started",
            "InProgress",
            "Completed",
            "Failed",
          ]),
        ),
        summary: Schema.optional(
          Schema.Struct({
            instanceType: Schema.optional(Schema.String),
          }),
        ),
        details: Schema.optional(
          Schema.Struct({
            groupCount: Schema.optional(Schema.Number),
            assessmentCount: Schema.optional(Schema.Number),
            extendedDetails: Schema.optional(
              Schema.Record(Schema.String, Schema.String),
            ),
          }),
        ),
      }),
    ),
  });
export type SolutionsControllerCreateOutput =
  typeof SolutionsControllerCreateOutput.Type;

// The operation
/**
 * Creates a solution in the migrate project.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SolutionsControllerCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SolutionsControllerCreateInput,
    outputSchema: SolutionsControllerCreateOutput,
  }),
);
// Input Schema
export const SolutionsControllerDeleteSolutionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/migrateProjects/{migrateProjectName}/solutions/{solutionName}",
    }),
  );
export type SolutionsControllerDeleteSolutionInput =
  typeof SolutionsControllerDeleteSolutionInput.Type;

// Output Schema
export const SolutionsControllerDeleteSolutionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SolutionsControllerDeleteSolutionOutput =
  typeof SolutionsControllerDeleteSolutionOutput.Type;

// The operation
/**
 * Delete the solution
 *
 * Delete the solution. Deleting non-existent project is a no-operation.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SolutionsControllerDeleteSolution =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SolutionsControllerDeleteSolutionInput,
    outputSchema: SolutionsControllerDeleteSolutionOutput,
  }));
// Input Schema
export const SolutionsControllerGetConfigInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/migrateProjects/{migrateProjectName}/solutions/{solutionName}/getConfig",
    }),
  );
export type SolutionsControllerGetConfigInput =
  typeof SolutionsControllerGetConfigInput.Type;

// Output Schema
export const SolutionsControllerGetConfigOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    publisherSasUri: Schema.optional(Schema.String),
  });
export type SolutionsControllerGetConfigOutput =
  typeof SolutionsControllerGetConfigOutput.Type;

// The operation
/**
 * Gets the config for the solution in the migrate project.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SolutionsControllerGetConfig =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SolutionsControllerGetConfigInput,
    outputSchema: SolutionsControllerGetConfigOutput,
  }));
// Input Schema
export const SolutionsControllerGetSolutionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/migrateProjects/{migrateProjectName}/solutions/{solutionName}",
    }),
  );
export type SolutionsControllerGetSolutionInput =
  typeof SolutionsControllerGetSolutionInput.Type;

// Output Schema
export const SolutionsControllerGetSolutionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    etag: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        tool: Schema.optional(
          Schema.Literals([
            "ServerDiscovery",
            "ServerAssessment",
            "ServerMigration",
            "Cloudamize",
            "Turbonomic",
            "Zerto",
            "CorentTech",
            "ServerAssessmentV1",
            "ServerMigration_Replication",
            "Carbonite",
            "DataMigrationAssistant",
            "DatabaseMigrationService",
            "Device42",
            "JetStream",
            "RackWare",
            "UnifyCloud",
            "Flexera",
            "ServerDiscovery_Import",
            "Lakeside",
            "AppServiceMigrationAssistant",
            "Movere",
            "CloudSphere",
            "Modernization",
            "ServerMigration_DataReplication",
            "Unknown",
          ]),
        ),
        purpose: Schema.optional(
          Schema.Literals(["Discovery", "Assessment", "Migration"]),
        ),
        goal: Schema.optional(
          Schema.Literals([
            "Servers",
            "Databases",
            "DesktopVirtualization",
            "WebApplications",
            "DataCenter",
          ]),
        ),
        status: Schema.optional(Schema.Literals(["Inactive", "Active"])),
        cleanupState: Schema.optional(
          Schema.Literals([
            "None",
            "Started",
            "InProgress",
            "Completed",
            "Failed",
          ]),
        ),
        summary: Schema.optional(
          Schema.Struct({
            instanceType: Schema.optional(Schema.String),
          }),
        ),
        details: Schema.optional(
          Schema.Struct({
            groupCount: Schema.optional(Schema.Number),
            assessmentCount: Schema.optional(Schema.Number),
            extendedDetails: Schema.optional(
              Schema.Record(Schema.String, Schema.String),
            ),
          }),
        ),
      }),
    ),
  });
export type SolutionsControllerGetSolutionOutput =
  typeof SolutionsControllerGetSolutionOutput.Type;

// The operation
/**
 * Gets a solution in the migrate project.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SolutionsControllerGetSolution =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SolutionsControllerGetSolutionInput,
    outputSchema: SolutionsControllerGetSolutionOutput,
  }));
// Input Schema
export const SolutionsControllerListSolutionsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/migrateProjects/{migrateProjectName}/solutions",
    }),
  );
export type SolutionsControllerListSolutionsInput =
  typeof SolutionsControllerListSolutionsInput.Type;

// Output Schema
export const SolutionsControllerListSolutionsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          etag: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Struct({
              tool: Schema.optional(
                Schema.Literals([
                  "ServerDiscovery",
                  "ServerAssessment",
                  "ServerMigration",
                  "Cloudamize",
                  "Turbonomic",
                  "Zerto",
                  "CorentTech",
                  "ServerAssessmentV1",
                  "ServerMigration_Replication",
                  "Carbonite",
                  "DataMigrationAssistant",
                  "DatabaseMigrationService",
                  "Device42",
                  "JetStream",
                  "RackWare",
                  "UnifyCloud",
                  "Flexera",
                  "ServerDiscovery_Import",
                  "Lakeside",
                  "AppServiceMigrationAssistant",
                  "Movere",
                  "CloudSphere",
                  "Modernization",
                  "ServerMigration_DataReplication",
                  "Unknown",
                ]),
              ),
              purpose: Schema.optional(
                Schema.Literals(["Discovery", "Assessment", "Migration"]),
              ),
              goal: Schema.optional(
                Schema.Literals([
                  "Servers",
                  "Databases",
                  "DesktopVirtualization",
                  "WebApplications",
                  "DataCenter",
                ]),
              ),
              status: Schema.optional(Schema.Literals(["Inactive", "Active"])),
              cleanupState: Schema.optional(
                Schema.Literals([
                  "None",
                  "Started",
                  "InProgress",
                  "Completed",
                  "Failed",
                ]),
              ),
              summary: Schema.optional(
                Schema.Struct({
                  instanceType: Schema.optional(Schema.String),
                }),
              ),
              details: Schema.optional(
                Schema.Struct({
                  groupCount: Schema.optional(Schema.Number),
                  assessmentCount: Schema.optional(Schema.Number),
                  extendedDetails: Schema.optional(
                    Schema.Record(Schema.String, Schema.String),
                  ),
                }),
              ),
            }),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type SolutionsControllerListSolutionsOutput =
  typeof SolutionsControllerListSolutionsOutput.Type;

// The operation
/**
 * Gets the list of solutions in the migrate project.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SolutionsControllerListSolutions =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SolutionsControllerListSolutionsInput,
    outputSchema: SolutionsControllerListSolutionsOutput,
  }));
// Input Schema
export const SolutionsControllerUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/migrateProjects/{migrateProjectName}/solutions/{solutionName}",
    }),
  );
export type SolutionsControllerUpdateInput =
  typeof SolutionsControllerUpdateInput.Type;

// Output Schema
export const SolutionsControllerUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    etag: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        tool: Schema.optional(
          Schema.Literals([
            "ServerDiscovery",
            "ServerAssessment",
            "ServerMigration",
            "Cloudamize",
            "Turbonomic",
            "Zerto",
            "CorentTech",
            "ServerAssessmentV1",
            "ServerMigration_Replication",
            "Carbonite",
            "DataMigrationAssistant",
            "DatabaseMigrationService",
            "Device42",
            "JetStream",
            "RackWare",
            "UnifyCloud",
            "Flexera",
            "ServerDiscovery_Import",
            "Lakeside",
            "AppServiceMigrationAssistant",
            "Movere",
            "CloudSphere",
            "Modernization",
            "ServerMigration_DataReplication",
            "Unknown",
          ]),
        ),
        purpose: Schema.optional(
          Schema.Literals(["Discovery", "Assessment", "Migration"]),
        ),
        goal: Schema.optional(
          Schema.Literals([
            "Servers",
            "Databases",
            "DesktopVirtualization",
            "WebApplications",
            "DataCenter",
          ]),
        ),
        status: Schema.optional(Schema.Literals(["Inactive", "Active"])),
        cleanupState: Schema.optional(
          Schema.Literals([
            "None",
            "Started",
            "InProgress",
            "Completed",
            "Failed",
          ]),
        ),
        summary: Schema.optional(
          Schema.Struct({
            instanceType: Schema.optional(Schema.String),
          }),
        ),
        details: Schema.optional(
          Schema.Struct({
            groupCount: Schema.optional(Schema.Number),
            assessmentCount: Schema.optional(Schema.Number),
            extendedDetails: Schema.optional(
              Schema.Record(Schema.String, Schema.String),
            ),
          }),
        ),
      }),
    ),
  });
export type SolutionsControllerUpdateOutput =
  typeof SolutionsControllerUpdateOutput.Type;

// The operation
/**
 * Update solution.
 *
 * Update a solution with specified name. Supports partial updates, for example only tags can be provided.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SolutionsControllerUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SolutionsControllerUpdateInput,
    outputSchema: SolutionsControllerUpdateOutput,
  }),
);
// Input Schema
export const SqlAssessmentOptionsOperationsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    assessmentOptionsName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/sqlAssessmentOptions/{assessmentOptionsName}",
    }),
  );
export type SqlAssessmentOptionsOperationsGetInput =
  typeof SqlAssessmentOptionsOperationsGetInput.Type;

// Output Schema
export const SqlAssessmentOptionsOperationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SqlAssessmentOptionsOperationsGetOutput =
  typeof SqlAssessmentOptionsOperationsGetOutput.Type;

// The operation
/**
 * Get a SqlAssessmentOptions
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 * @param assessmentOptionsName - Sql assessment options ARM name. Accepted values is 'default'
 */
export const SqlAssessmentOptionsOperationsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlAssessmentOptionsOperationsGetInput,
    outputSchema: SqlAssessmentOptionsOperationsGetOutput,
  }));
// Input Schema
export const SqlAssessmentOptionsOperationsListByAssessmentProjectInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/sqlAssessmentOptions",
    }),
  );
export type SqlAssessmentOptionsOperationsListByAssessmentProjectInput =
  typeof SqlAssessmentOptionsOperationsListByAssessmentProjectInput.Type;

// Output Schema
export const SqlAssessmentOptionsOperationsListByAssessmentProjectOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type SqlAssessmentOptionsOperationsListByAssessmentProjectOutput =
  typeof SqlAssessmentOptionsOperationsListByAssessmentProjectOutput.Type;

// The operation
/**
 * List SqlAssessmentOptions resources by AssessmentProject
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 */
export const SqlAssessmentOptionsOperationsListByAssessmentProject =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlAssessmentOptionsOperationsListByAssessmentProjectInput,
    outputSchema: SqlAssessmentOptionsOperationsListByAssessmentProjectOutput,
  }));
// Input Schema
export const SqlAssessmentV2OperationsCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    groupName: Schema.String.pipe(T.PathParam()),
    assessmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/groups/{groupName}/sqlAssessments/{assessmentName}",
    }),
  );
export type SqlAssessmentV2OperationsCreateInput =
  typeof SqlAssessmentV2OperationsCreateInput.Type;

// Output Schema
export const SqlAssessmentV2OperationsCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SqlAssessmentV2OperationsCreateOutput =
  typeof SqlAssessmentV2OperationsCreateOutput.Type;

// The operation
/**
 * Create a SqlAssessmentV2
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 * @param groupName - Group ARM name
 * @param assessmentName - SQL Assessment arm name.
 */
export const SqlAssessmentV2OperationsCreate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlAssessmentV2OperationsCreateInput,
    outputSchema: SqlAssessmentV2OperationsCreateOutput,
  }));
// Input Schema
export const SqlAssessmentV2OperationsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    groupName: Schema.String.pipe(T.PathParam()),
    assessmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/groups/{groupName}/sqlAssessments/{assessmentName}",
    }),
  );
export type SqlAssessmentV2OperationsDeleteInput =
  typeof SqlAssessmentV2OperationsDeleteInput.Type;

// Output Schema
export const SqlAssessmentV2OperationsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SqlAssessmentV2OperationsDeleteOutput =
  typeof SqlAssessmentV2OperationsDeleteOutput.Type;

// The operation
/**
 * Delete a SqlAssessmentV2
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 * @param groupName - Group ARM name
 * @param assessmentName - SQL Assessment arm name.
 */
export const SqlAssessmentV2OperationsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlAssessmentV2OperationsDeleteInput,
    outputSchema: SqlAssessmentV2OperationsDeleteOutput,
  }));
// Input Schema
export const SqlAssessmentV2OperationsDownloadUrlInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    groupName: Schema.String.pipe(T.PathParam()),
    assessmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/groups/{groupName}/sqlAssessments/{assessmentName}/downloadUrl",
    }),
  );
export type SqlAssessmentV2OperationsDownloadUrlInput =
  typeof SqlAssessmentV2OperationsDownloadUrlInput.Type;

// Output Schema
export const SqlAssessmentV2OperationsDownloadUrlOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    assessmentReportUrl: Schema.String,
    expirationTime: Schema.String,
  });
export type SqlAssessmentV2OperationsDownloadUrlOutput =
  typeof SqlAssessmentV2OperationsDownloadUrlOutput.Type;

// The operation
/**
 * Get download URL for the assessment report.
 *
 * Get the URL for downloading the assessment in a report format.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 * @param groupName - Group ARM name
 * @param assessmentName - SQL Assessment arm name.
 */
export const SqlAssessmentV2OperationsDownloadUrl =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlAssessmentV2OperationsDownloadUrlInput,
    outputSchema: SqlAssessmentV2OperationsDownloadUrlOutput,
  }));
// Input Schema
export const SqlAssessmentV2OperationsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    groupName: Schema.String.pipe(T.PathParam()),
    assessmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/groups/{groupName}/sqlAssessments/{assessmentName}",
    }),
  );
export type SqlAssessmentV2OperationsGetInput =
  typeof SqlAssessmentV2OperationsGetInput.Type;

// Output Schema
export const SqlAssessmentV2OperationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SqlAssessmentV2OperationsGetOutput =
  typeof SqlAssessmentV2OperationsGetOutput.Type;

// The operation
/**
 * Get a SqlAssessmentV2
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 * @param groupName - Group ARM name
 * @param assessmentName - SQL Assessment arm name.
 */
export const SqlAssessmentV2OperationsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlAssessmentV2OperationsGetInput,
    outputSchema: SqlAssessmentV2OperationsGetOutput,
  }));
// Input Schema
export const SqlAssessmentV2OperationsListByGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    groupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/groups/{groupName}/sqlAssessments",
    }),
  );
export type SqlAssessmentV2OperationsListByGroupInput =
  typeof SqlAssessmentV2OperationsListByGroupInput.Type;

// Output Schema
export const SqlAssessmentV2OperationsListByGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type SqlAssessmentV2OperationsListByGroupOutput =
  typeof SqlAssessmentV2OperationsListByGroupOutput.Type;

// The operation
/**
 * List SqlAssessmentV2 resources by Group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 * @param groupName - Group ARM name
 */
export const SqlAssessmentV2OperationsListByGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlAssessmentV2OperationsListByGroupInput,
    outputSchema: SqlAssessmentV2OperationsListByGroupOutput,
  }));
// Input Schema
export const SqlAssessmentV2SummaryOperationsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    groupName: Schema.String.pipe(T.PathParam()),
    assessmentName: Schema.String.pipe(T.PathParam()),
    summaryName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/groups/{groupName}/sqlAssessments/{assessmentName}/summaries/{summaryName}",
    }),
  );
export type SqlAssessmentV2SummaryOperationsGetInput =
  typeof SqlAssessmentV2SummaryOperationsGetInput.Type;

// Output Schema
export const SqlAssessmentV2SummaryOperationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SqlAssessmentV2SummaryOperationsGetOutput =
  typeof SqlAssessmentV2SummaryOperationsGetOutput.Type;

// The operation
/**
 * Get a SqlAssessmentV2Summary
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 * @param groupName - Group ARM name
 * @param assessmentName - SQL Assessment arm name.
 * @param summaryName - Gets the Name of the SQL Summary.
 */
export const SqlAssessmentV2SummaryOperationsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlAssessmentV2SummaryOperationsGetInput,
    outputSchema: SqlAssessmentV2SummaryOperationsGetOutput,
  }));
// Input Schema
export const SqlAssessmentV2SummaryOperationsListBySqlAssessmentV2Input =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    groupName: Schema.String.pipe(T.PathParam()),
    assessmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/groups/{groupName}/sqlAssessments/{assessmentName}/summaries",
    }),
  );
export type SqlAssessmentV2SummaryOperationsListBySqlAssessmentV2Input =
  typeof SqlAssessmentV2SummaryOperationsListBySqlAssessmentV2Input.Type;

// Output Schema
export const SqlAssessmentV2SummaryOperationsListBySqlAssessmentV2Output =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type SqlAssessmentV2SummaryOperationsListBySqlAssessmentV2Output =
  typeof SqlAssessmentV2SummaryOperationsListBySqlAssessmentV2Output.Type;

// The operation
/**
 * List SqlAssessmentV2Summary resources by SqlAssessmentV2
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 * @param groupName - Group ARM name
 * @param assessmentName - SQL Assessment arm name.
 */
export const SqlAssessmentV2SummaryOperationsListBySqlAssessmentV2 =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlAssessmentV2SummaryOperationsListBySqlAssessmentV2Input,
    outputSchema: SqlAssessmentV2SummaryOperationsListBySqlAssessmentV2Output,
  }));
// Input Schema
export const SqlAvailabilityGroupsControllerGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    sqlSiteName: Schema.String.pipe(T.PathParam()),
    sqlAvailabilityGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/masterSites/{siteName}/sqlSites/{sqlSiteName}/sqlAvailabilityGroups/{sqlAvailabilityGroupName}",
    }),
  );
export type SqlAvailabilityGroupsControllerGetInput =
  typeof SqlAvailabilityGroupsControllerGetInput.Type;

// Output Schema
export const SqlAvailabilityGroupsControllerGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SqlAvailabilityGroupsControllerGetOutput =
  typeof SqlAvailabilityGroupsControllerGetOutput.Type;

// The operation
/**
 * Gets the sql availability group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param sqlSiteName - SQL site name.
 * @param sqlAvailabilityGroupName - SQL availability group name.
 */
export const SqlAvailabilityGroupsControllerGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlAvailabilityGroupsControllerGetInput,
    outputSchema: SqlAvailabilityGroupsControllerGetOutput,
  }));
// Input Schema
export const SqlAvailabilityGroupsControllerListBySqlSiteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    sqlSiteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    filter: Schema.optional(Schema.String),
    top: Schema.optional(Schema.String),
    continuationToken: Schema.optional(Schema.String),
    totalRecordCount: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/masterSites/{siteName}/sqlSites/{sqlSiteName}/sqlAvailabilityGroups",
    }),
  );
export type SqlAvailabilityGroupsControllerListBySqlSiteInput =
  typeof SqlAvailabilityGroupsControllerListBySqlSiteInput.Type;

// Output Schema
export const SqlAvailabilityGroupsControllerListBySqlSiteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type SqlAvailabilityGroupsControllerListBySqlSiteOutput =
  typeof SqlAvailabilityGroupsControllerListBySqlSiteOutput.Type;

// The operation
/**
 * Gets the sql availability groups.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param filter - filter query
 * @param top - page size  query
 * @param continuationToken - Optional parameter for continuation token.
 * @param totalRecordCount - Total count of machines in the given site.
 * @param siteName - Site name
 * @param sqlSiteName - SQL site name.
 */
export const SqlAvailabilityGroupsControllerListBySqlSite =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlAvailabilityGroupsControllerListBySqlSiteInput,
    outputSchema: SqlAvailabilityGroupsControllerListBySqlSiteOutput,
  }));
// Input Schema
export const SqlCollectorOperationsCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    collectorName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/sqlcollectors/{collectorName}",
    }),
  );
export type SqlCollectorOperationsCreateInput =
  typeof SqlCollectorOperationsCreateInput.Type;

// Output Schema
export const SqlCollectorOperationsCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SqlCollectorOperationsCreateOutput =
  typeof SqlCollectorOperationsCreateOutput.Type;

// The operation
/**
 * Create a SqlCollector
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 * @param collectorName - Sql collector ARM name.
 */
export const SqlCollectorOperationsCreate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlCollectorOperationsCreateInput,
    outputSchema: SqlCollectorOperationsCreateOutput,
  }));
// Input Schema
export const SqlCollectorOperationsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    collectorName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/sqlcollectors/{collectorName}",
    }),
  );
export type SqlCollectorOperationsDeleteInput =
  typeof SqlCollectorOperationsDeleteInput.Type;

// Output Schema
export const SqlCollectorOperationsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SqlCollectorOperationsDeleteOutput =
  typeof SqlCollectorOperationsDeleteOutput.Type;

// The operation
/**
 * Delete a SqlCollector
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 * @param collectorName - Sql collector ARM name.
 */
export const SqlCollectorOperationsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlCollectorOperationsDeleteInput,
    outputSchema: SqlCollectorOperationsDeleteOutput,
  }));
// Input Schema
export const SqlCollectorOperationsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    collectorName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/sqlcollectors/{collectorName}",
    }),
  );
export type SqlCollectorOperationsGetInput =
  typeof SqlCollectorOperationsGetInput.Type;

// Output Schema
export const SqlCollectorOperationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SqlCollectorOperationsGetOutput =
  typeof SqlCollectorOperationsGetOutput.Type;

// The operation
/**
 * Get a SqlCollector
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 * @param collectorName - Sql collector ARM name.
 */
export const SqlCollectorOperationsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SqlCollectorOperationsGetInput,
    outputSchema: SqlCollectorOperationsGetOutput,
  }),
);
// Input Schema
export const SqlCollectorOperationsListByAssessmentProjectInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/sqlcollectors",
    }),
  );
export type SqlCollectorOperationsListByAssessmentProjectInput =
  typeof SqlCollectorOperationsListByAssessmentProjectInput.Type;

// Output Schema
export const SqlCollectorOperationsListByAssessmentProjectOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type SqlCollectorOperationsListByAssessmentProjectOutput =
  typeof SqlCollectorOperationsListByAssessmentProjectOutput.Type;

// The operation
/**
 * List SqlCollector resources by AssessmentProject
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 */
export const SqlCollectorOperationsListByAssessmentProject =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlCollectorOperationsListByAssessmentProjectInput,
    outputSchema: SqlCollectorOperationsListByAssessmentProjectOutput,
  }));
// Input Schema
export const SqlDatabasesControllerGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    sqlSiteName: Schema.String.pipe(T.PathParam()),
    sqlDatabaseName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/masterSites/{siteName}/sqlSites/{sqlSiteName}/sqlDatabases/{sqlDatabaseName}",
    }),
  );
export type SqlDatabasesControllerGetInput =
  typeof SqlDatabasesControllerGetInput.Type;

// Output Schema
export const SqlDatabasesControllerGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SqlDatabasesControllerGetOutput =
  typeof SqlDatabasesControllerGetOutput.Type;

// The operation
/**
 * Gets the sql Database.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param sqlSiteName - SQL site name.
 * @param sqlDatabaseName - SQL Database name.
 */
export const SqlDatabasesControllerGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SqlDatabasesControllerGetInput,
    outputSchema: SqlDatabasesControllerGetOutput,
  }),
);
// Input Schema
export const SqlDatabasesControllerListBySqlSiteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    sqlSiteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    filter: Schema.optional(Schema.String),
    top: Schema.optional(Schema.String),
    continuationToken: Schema.optional(Schema.String),
    totalRecordCount: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/masterSites/{siteName}/sqlSites/{sqlSiteName}/sqlDatabases",
    }),
  );
export type SqlDatabasesControllerListBySqlSiteInput =
  typeof SqlDatabasesControllerListBySqlSiteInput.Type;

// Output Schema
export const SqlDatabasesControllerListBySqlSiteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type SqlDatabasesControllerListBySqlSiteOutput =
  typeof SqlDatabasesControllerListBySqlSiteOutput.Type;

// The operation
/**
 * Gets the sql Databases.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param filter - filter query
 * @param top - page size  query
 * @param continuationToken - Optional parameter for continuation token.
 * @param totalRecordCount - Total count of machines in the given site.
 * @param siteName - Site name
 * @param sqlSiteName - SQL site name.
 */
export const SqlDatabasesControllerListBySqlSite =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlDatabasesControllerListBySqlSiteInput,
    outputSchema: SqlDatabasesControllerListBySqlSiteOutput,
  }));
// Input Schema
export const SqlDiscoverySiteDataSourceControllerCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    sqlSiteName: Schema.String.pipe(T.PathParam()),
    discoverySiteDataSourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/masterSites/{siteName}/sqlSites/{sqlSiteName}/discoverySiteDataSources/{discoverySiteDataSourceName}",
    }),
  );
export type SqlDiscoverySiteDataSourceControllerCreateInput =
  typeof SqlDiscoverySiteDataSourceControllerCreateInput.Type;

// Output Schema
export const SqlDiscoverySiteDataSourceControllerCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SqlDiscoverySiteDataSourceControllerCreateOutput =
  typeof SqlDiscoverySiteDataSourceControllerCreateOutput.Type;

// The operation
/**
 * Create a SqlDiscoverySiteDataSource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param sqlSiteName - SQL site name.
 * @param discoverySiteDataSourceName - SQL Discovery site data source name.
 */
export const SqlDiscoverySiteDataSourceControllerCreate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlDiscoverySiteDataSourceControllerCreateInput,
    outputSchema: SqlDiscoverySiteDataSourceControllerCreateOutput,
  }));
// Input Schema
export const SqlDiscoverySiteDataSourceControllerDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    sqlSiteName: Schema.String.pipe(T.PathParam()),
    discoverySiteDataSourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/masterSites/{siteName}/sqlSites/{sqlSiteName}/discoverySiteDataSources/{discoverySiteDataSourceName}",
    }),
  );
export type SqlDiscoverySiteDataSourceControllerDeleteInput =
  typeof SqlDiscoverySiteDataSourceControllerDeleteInput.Type;

// Output Schema
export const SqlDiscoverySiteDataSourceControllerDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SqlDiscoverySiteDataSourceControllerDeleteOutput =
  typeof SqlDiscoverySiteDataSourceControllerDeleteOutput.Type;

// The operation
/**
 * Delete a SqlDiscoverySiteDataSource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param sqlSiteName - SQL site name.
 * @param discoverySiteDataSourceName - SQL Discovery site data source name.
 */
export const SqlDiscoverySiteDataSourceControllerDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlDiscoverySiteDataSourceControllerDeleteInput,
    outputSchema: SqlDiscoverySiteDataSourceControllerDeleteOutput,
  }));
// Input Schema
export const SqlDiscoverySiteDataSourceControllerGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    sqlSiteName: Schema.String.pipe(T.PathParam()),
    discoverySiteDataSourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/masterSites/{siteName}/sqlSites/{sqlSiteName}/discoverySiteDataSources/{discoverySiteDataSourceName}",
    }),
  );
export type SqlDiscoverySiteDataSourceControllerGetInput =
  typeof SqlDiscoverySiteDataSourceControllerGetInput.Type;

// Output Schema
export const SqlDiscoverySiteDataSourceControllerGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SqlDiscoverySiteDataSourceControllerGetOutput =
  typeof SqlDiscoverySiteDataSourceControllerGetOutput.Type;

// The operation
/**
 * Get a SqlDiscoverySiteDataSource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param sqlSiteName - SQL site name.
 * @param discoverySiteDataSourceName - SQL Discovery site data source name.
 */
export const SqlDiscoverySiteDataSourceControllerGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlDiscoverySiteDataSourceControllerGetInput,
    outputSchema: SqlDiscoverySiteDataSourceControllerGetOutput,
  }));
// Input Schema
export const SqlDiscoverySiteDataSourceControllerListBySqlSiteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    sqlSiteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/masterSites/{siteName}/sqlSites/{sqlSiteName}/discoverySiteDataSources",
    }),
  );
export type SqlDiscoverySiteDataSourceControllerListBySqlSiteInput =
  typeof SqlDiscoverySiteDataSourceControllerListBySqlSiteInput.Type;

// Output Schema
export const SqlDiscoverySiteDataSourceControllerListBySqlSiteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type SqlDiscoverySiteDataSourceControllerListBySqlSiteOutput =
  typeof SqlDiscoverySiteDataSourceControllerListBySqlSiteOutput.Type;

// The operation
/**
 * List SqlDiscoverySiteDataSource resources by SqlSite
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param sqlSiteName - SQL site name.
 */
export const SqlDiscoverySiteDataSourceControllerListBySqlSite =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlDiscoverySiteDataSourceControllerListBySqlSiteInput,
    outputSchema: SqlDiscoverySiteDataSourceControllerListBySqlSiteOutput,
  }));
// Input Schema
export const SqlJobsControllerGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    sqlSiteName: Schema.String.pipe(T.PathParam()),
    jobName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/masterSites/{siteName}/sqlSites/{sqlSiteName}/jobs/{jobName}",
    }),
  );
export type SqlJobsControllerGetInput = typeof SqlJobsControllerGetInput.Type;

// Output Schema
export const SqlJobsControllerGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SqlJobsControllerGetOutput = typeof SqlJobsControllerGetOutput.Type;

// The operation
/**
 * Gets the sql Job.
 *
 * Get a SqlJob
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param sqlSiteName - SQL site name.
 * @param jobName - SQL Job name.
 */
export const SqlJobsControllerGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SqlJobsControllerGetInput,
    outputSchema: SqlJobsControllerGetOutput,
  }),
);
// Input Schema
export const SqlJobsControllerListBySqlSiteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    sqlSiteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/masterSites/{siteName}/sqlSites/{sqlSiteName}/jobs",
    }),
  );
export type SqlJobsControllerListBySqlSiteInput =
  typeof SqlJobsControllerListBySqlSiteInput.Type;

// Output Schema
export const SqlJobsControllerListBySqlSiteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type SqlJobsControllerListBySqlSiteOutput =
  typeof SqlJobsControllerListBySqlSiteOutput.Type;

// The operation
/**
 * Gets the sql Jobs.
 *
 * List SqlJob resources by SqlSite
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param sqlSiteName - SQL site name.
 */
export const SqlJobsControllerListBySqlSite =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlJobsControllerListBySqlSiteInput,
    outputSchema: SqlJobsControllerListBySqlSiteOutput,
  }));
// Input Schema
export const SqlOperationsStatusControllerGetSqlOperationStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    sqlSiteName: Schema.String.pipe(T.PathParam()),
    operationStatusName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/masterSites/{siteName}/sqlSites/{sqlSiteName}/operationsStatus/{operationStatusName}",
    }),
  );
export type SqlOperationsStatusControllerGetSqlOperationStatusInput =
  typeof SqlOperationsStatusControllerGetSqlOperationStatusInput.Type;

// Output Schema
export const SqlOperationsStatusControllerGetSqlOperationStatusOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    status: Schema.optional(Schema.String),
    startTime: Schema.optional(Schema.String),
    endTime: Schema.optional(Schema.String),
    error: Schema.optional(
      Schema.Struct({
        code: Schema.optional(Schema.String),
        message: Schema.optional(Schema.String),
      }),
    ),
    properties: Schema.optional(
      Schema.Struct({
        result: Schema.optional(Schema.String),
      }),
    ),
  });
export type SqlOperationsStatusControllerGetSqlOperationStatusOutput =
  typeof SqlOperationsStatusControllerGetSqlOperationStatusOutput.Type;

// The operation
/**
 * Method to get operation status.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param sqlSiteName - SQL site name.
 * @param operationStatusName - Operation status  Arm Name.
 */
export const SqlOperationsStatusControllerGetSqlOperationStatus =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlOperationsStatusControllerGetSqlOperationStatusInput,
    outputSchema: SqlOperationsStatusControllerGetSqlOperationStatusOutput,
  }));
// Input Schema
export const SqlRunAsAccountsControllerGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    sqlSiteName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/masterSites/{siteName}/sqlSites/{sqlSiteName}/runAsAccounts/{accountName}",
    }),
  );
export type SqlRunAsAccountsControllerGetInput =
  typeof SqlRunAsAccountsControllerGetInput.Type;

// Output Schema
export const SqlRunAsAccountsControllerGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SqlRunAsAccountsControllerGetOutput =
  typeof SqlRunAsAccountsControllerGetOutput.Type;

// The operation
/**
 * Get a SqlRunAsAccount
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param sqlSiteName - SQL site name.
 * @param accountName - SQL RunAsAccounts name
 */
export const SqlRunAsAccountsControllerGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlRunAsAccountsControllerGetInput,
    outputSchema: SqlRunAsAccountsControllerGetOutput,
  }));
// Input Schema
export const SqlRunAsAccountsControllerListBySqlSiteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    sqlSiteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/masterSites/{siteName}/sqlSites/{sqlSiteName}/runAsAccounts",
    }),
  );
export type SqlRunAsAccountsControllerListBySqlSiteInput =
  typeof SqlRunAsAccountsControllerListBySqlSiteInput.Type;

// Output Schema
export const SqlRunAsAccountsControllerListBySqlSiteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type SqlRunAsAccountsControllerListBySqlSiteOutput =
  typeof SqlRunAsAccountsControllerListBySqlSiteOutput.Type;

// The operation
/**
 * List SqlRunAsAccount resources by SqlSite
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param sqlSiteName - SQL site name.
 */
export const SqlRunAsAccountsControllerListBySqlSite =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlRunAsAccountsControllerListBySqlSiteInput,
    outputSchema: SqlRunAsAccountsControllerListBySqlSiteOutput,
  }));
// Input Schema
export const SqlServersControllerGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    sqlSiteName: Schema.String.pipe(T.PathParam()),
    sqlServerName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/masterSites/{siteName}/sqlSites/{sqlSiteName}/sqlServers/{sqlServerName}",
    }),
  );
export type SqlServersControllerGetInput =
  typeof SqlServersControllerGetInput.Type;

// Output Schema
export const SqlServersControllerGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SqlServersControllerGetOutput =
  typeof SqlServersControllerGetOutput.Type;

// The operation
/**
 * Gets the sql server.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param sqlSiteName - SQL site name.
 * @param sqlServerName - SQL server name.
 */
export const SqlServersControllerGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SqlServersControllerGetInput,
    outputSchema: SqlServersControllerGetOutput,
  }),
);
// Input Schema
export const SqlServersControllerListBySqlSiteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    sqlSiteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    filter: Schema.optional(Schema.String),
    top: Schema.optional(Schema.String),
    continuationToken: Schema.optional(Schema.String),
    totalRecordCount: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/masterSites/{siteName}/sqlSites/{sqlSiteName}/sqlServers",
    }),
  );
export type SqlServersControllerListBySqlSiteInput =
  typeof SqlServersControllerListBySqlSiteInput.Type;

// Output Schema
export const SqlServersControllerListBySqlSiteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type SqlServersControllerListBySqlSiteOutput =
  typeof SqlServersControllerListBySqlSiteOutput.Type;

// The operation
/**
 * Gets the sql servers.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param filter - filter query
 * @param top - page size  query
 * @param continuationToken - Optional parameter for continuation token.
 * @param totalRecordCount - Total count of machines in the given site.
 * @param siteName - Site name
 * @param sqlSiteName - SQL site name.
 */
export const SqlServersControllerListBySqlSite =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlServersControllerListBySqlSiteInput,
    outputSchema: SqlServersControllerListBySqlSiteOutput,
  }));
// Input Schema
export const SqlServersControllerUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    sqlSiteName: Schema.String.pipe(T.PathParam()),
    sqlServerName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/masterSites/{siteName}/sqlSites/{sqlSiteName}/sqlServers/{sqlServerName}",
    }),
  );
export type SqlServersControllerUpdateInput =
  typeof SqlServersControllerUpdateInput.Type;

// Output Schema
export const SqlServersControllerUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SqlServersControllerUpdateOutput =
  typeof SqlServersControllerUpdateOutput.Type;

// The operation
/**
 * Updates the sql server tags.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param sqlSiteName - SQL site name.
 * @param sqlServerName - SQL server name.
 */
export const SqlServersControllerUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SqlServersControllerUpdateInput,
    outputSchema: SqlServersControllerUpdateOutput,
  }),
);
// Input Schema
export const SqlSitesControllerCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    sqlSiteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/masterSites/{siteName}/sqlSites/{sqlSiteName}",
    }),
  );
export type SqlSitesControllerCreateInput =
  typeof SqlSitesControllerCreateInput.Type;

// Output Schema
export const SqlSitesControllerCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SqlSitesControllerCreateOutput =
  typeof SqlSitesControllerCreateOutput.Type;

// The operation
/**
 * Method to create a SQL site.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param sqlSiteName - SQL site name.
 */
export const SqlSitesControllerCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SqlSitesControllerCreateInput,
    outputSchema: SqlSitesControllerCreateOutput,
  }),
);
// Input Schema
export const SqlSitesControllerDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    sqlSiteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/masterSites/{siteName}/sqlSites/{sqlSiteName}",
    }),
  );
export type SqlSitesControllerDeleteInput =
  typeof SqlSitesControllerDeleteInput.Type;

// Output Schema
export const SqlSitesControllerDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SqlSitesControllerDeleteOutput =
  typeof SqlSitesControllerDeleteOutput.Type;

// The operation
/**
 * Deletes the SQL site.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param sqlSiteName - SQL site name.
 */
export const SqlSitesControllerDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SqlSitesControllerDeleteInput,
    outputSchema: SqlSitesControllerDeleteOutput,
  }),
);
// Input Schema
export const SqlSitesControllerErrorSummaryInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    sqlSiteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/masterSites/{siteName}/sqlSites/{sqlSiteName}/errorSummary",
    }),
  );
export type SqlSitesControllerErrorSummaryInput =
  typeof SqlSitesControllerErrorSummaryInput.Type;

// Output Schema
export const SqlSitesControllerErrorSummaryOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    applianceName: Schema.String,
    discoveryScopeErrorSummaries: Schema.Struct({
      affectedResourceType: Schema.String,
      affectedObjectsCount: Schema.Number,
      discoveryScope: Schema.Literals([
        "AppsAndRoles",
        "DependencyMap",
        "StaticData",
        "SQLServerConnectionInfo",
      ]),
    }),
    nextLink: Schema.optional(Schema.String),
  });
export type SqlSitesControllerErrorSummaryOutput =
  typeof SqlSitesControllerErrorSummaryOutput.Type;

// The operation
/**
 * Method to get error summary from SQL site.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param sqlSiteName - SQL site name.
 */
export const SqlSitesControllerErrorSummary =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlSitesControllerErrorSummaryInput,
    outputSchema: SqlSitesControllerErrorSummaryOutput,
  }));
// Input Schema
export const SqlSitesControllerExportSqlServerErrorsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    sqlSiteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/masterSites/{siteName}/sqlSites/{sqlSiteName}/exportSqlServerErrors",
    }),
  );
export type SqlSitesControllerExportSqlServerErrorsInput =
  typeof SqlSitesControllerExportSqlServerErrorsInput.Type;

// Output Schema
export const SqlSitesControllerExportSqlServerErrorsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown;
export type SqlSitesControllerExportSqlServerErrorsOutput =
  typeof SqlSitesControllerExportSqlServerErrorsOutput.Type;

// The operation
/**
 * Method to generate report containing SQL servers.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param sqlSiteName - SQL site name.
 */
export const SqlSitesControllerExportSqlServerErrors =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlSitesControllerExportSqlServerErrorsInput,
    outputSchema: SqlSitesControllerExportSqlServerErrorsOutput,
  }));
// Input Schema
export const SqlSitesControllerExportSqlServersInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    sqlSiteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/masterSites/{siteName}/sqlSites/{sqlSiteName}/exportSqlServers",
    }),
  );
export type SqlSitesControllerExportSqlServersInput =
  typeof SqlSitesControllerExportSqlServersInput.Type;

// Output Schema
export const SqlSitesControllerExportSqlServersOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown;
export type SqlSitesControllerExportSqlServersOutput =
  typeof SqlSitesControllerExportSqlServersOutput.Type;

// The operation
/**
 * Method to generate report containing SQL servers.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param sqlSiteName - SQL site name.
 */
export const SqlSitesControllerExportSqlServers =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlSitesControllerExportSqlServersInput,
    outputSchema: SqlSitesControllerExportSqlServersOutput,
  }));
// Input Schema
export const SqlSitesControllerGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    sqlSiteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/masterSites/{siteName}/sqlSites/{sqlSiteName}",
    }),
  );
export type SqlSitesControllerGetInput = typeof SqlSitesControllerGetInput.Type;

// Output Schema
export const SqlSitesControllerGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SqlSitesControllerGetOutput =
  typeof SqlSitesControllerGetOutput.Type;

// The operation
/**
 * Method to get a site.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param sqlSiteName - SQL site name.
 */
export const SqlSitesControllerGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SqlSitesControllerGetInput,
    outputSchema: SqlSitesControllerGetOutput,
  }),
);
// Input Schema
export const SqlSitesControllerListByMasterSiteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/masterSites/{siteName}/sqlSites",
    }),
  );
export type SqlSitesControllerListByMasterSiteInput =
  typeof SqlSitesControllerListByMasterSiteInput.Type;

// Output Schema
export const SqlSitesControllerListByMasterSiteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type SqlSitesControllerListByMasterSiteOutput =
  typeof SqlSitesControllerListByMasterSiteOutput.Type;

// The operation
/**
 * Method to get all sites.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const SqlSitesControllerListByMasterSite =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlSitesControllerListByMasterSiteInput,
    outputSchema: SqlSitesControllerListByMasterSiteOutput,
  }));
// Input Schema
export const SqlSitesControllerRefreshInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    sqlSiteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/masterSites/{siteName}/sqlSites/{sqlSiteName}/refresh",
    }),
  );
export type SqlSitesControllerRefreshInput =
  typeof SqlSitesControllerRefreshInput.Type;

// Output Schema
export const SqlSitesControllerRefreshOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown;
export type SqlSitesControllerRefreshOutput =
  typeof SqlSitesControllerRefreshOutput.Type;

// The operation
/**
 * Method to refresh a site.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param sqlSiteName - SQL site name.
 */
export const SqlSitesControllerRefresh = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SqlSitesControllerRefreshInput,
    outputSchema: SqlSitesControllerRefreshOutput,
  }),
);
// Input Schema
export const SqlSitesControllerSummaryInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    sqlSiteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/masterSites/{siteName}/sqlSites/{sqlSiteName}/summary",
    }),
  );
export type SqlSitesControllerSummaryInput =
  typeof SqlSitesControllerSummaryInput.Type;

// Output Schema
export const SqlSitesControllerSummaryOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    serverCount: Schema.optional(Schema.Number),
    databaseCount: Schema.optional(Schema.Number),
    runAsAccountCount: Schema.optional(Schema.Number),
  });
export type SqlSitesControllerSummaryOutput =
  typeof SqlSitesControllerSummaryOutput.Type;

// The operation
/**
 * Method to get site usage/summary.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param sqlSiteName - SQL site name.
 */
export const SqlSitesControllerSummary = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SqlSitesControllerSummaryInput,
    outputSchema: SqlSitesControllerSummaryOutput,
  }),
);
// Input Schema
export const SqlSitesControllerUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    sqlSiteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/masterSites/{siteName}/sqlSites/{sqlSiteName}",
    }),
  );
export type SqlSitesControllerUpdateInput =
  typeof SqlSitesControllerUpdateInput.Type;

// Output Schema
export const SqlSitesControllerUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SqlSitesControllerUpdateOutput =
  typeof SqlSitesControllerUpdateOutput.Type;

// The operation
/**
 * Method to update an existing site.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param sqlSiteName - SQL site name.
 */
export const SqlSitesControllerUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SqlSitesControllerUpdateInput,
    outputSchema: SqlSitesControllerUpdateOutput,
  }),
);
// Input Schema
export const TomcatWebApplicationsControllerGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    webAppSiteName: Schema.String.pipe(T.PathParam()),
    webApplicationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/masterSites/{siteName}/webAppSites/{webAppSiteName}/tomcatWebApplications/{webApplicationName}",
    }),
  );
export type TomcatWebApplicationsControllerGetInput =
  typeof TomcatWebApplicationsControllerGetInput.Type;

// Output Schema
export const TomcatWebApplicationsControllerGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type TomcatWebApplicationsControllerGetOutput =
  typeof TomcatWebApplicationsControllerGetOutput.Type;

// The operation
/**
 * Method to get an Tomcat web application.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param webAppSiteName - Web app site name.
 * @param webApplicationName - Web application name.
 */
export const TomcatWebApplicationsControllerGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: TomcatWebApplicationsControllerGetInput,
    outputSchema: TomcatWebApplicationsControllerGetOutput,
  }));
// Input Schema
export const TomcatWebApplicationsControllerListByWebAppSiteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    webAppSiteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    filter: Schema.optional(Schema.String),
    top: Schema.optional(Schema.String),
    continuationToken: Schema.optional(Schema.String),
    totalRecordCount: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/masterSites/{siteName}/webAppSites/{webAppSiteName}/tomcatWebApplications",
    }),
  );
export type TomcatWebApplicationsControllerListByWebAppSiteInput =
  typeof TomcatWebApplicationsControllerListByWebAppSiteInput.Type;

// Output Schema
export const TomcatWebApplicationsControllerListByWebAppSiteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type TomcatWebApplicationsControllerListByWebAppSiteOutput =
  typeof TomcatWebApplicationsControllerListByWebAppSiteOutput.Type;

// The operation
/**
 * Method to get all Tomcat web application.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param filter - filter query
 * @param top - page size  query
 * @param continuationToken - Optional parameter for continuation token.
 * @param totalRecordCount - Total count of machines in the given site.
 * @param siteName - Site name
 * @param webAppSiteName - Web app site name.
 */
export const TomcatWebApplicationsControllerListByWebAppSite =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: TomcatWebApplicationsControllerListByWebAppSiteInput,
    outputSchema: TomcatWebApplicationsControllerListByWebAppSiteOutput,
  }));
// Input Schema
export const TomcatWebApplicationsControllerUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    webAppSiteName: Schema.String.pipe(T.PathParam()),
    webApplicationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/masterSites/{siteName}/webAppSites/{webAppSiteName}/tomcatWebApplications/{webApplicationName}",
    }),
  );
export type TomcatWebApplicationsControllerUpdateInput =
  typeof TomcatWebApplicationsControllerUpdateInput.Type;

// Output Schema
export const TomcatWebApplicationsControllerUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type TomcatWebApplicationsControllerUpdateOutput =
  typeof TomcatWebApplicationsControllerUpdateOutput.Type;

// The operation
/**
 * Updates the Tomcat web application tags.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param webAppSiteName - Web app site name.
 * @param webApplicationName - Web application name.
 */
export const TomcatWebApplicationsControllerUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: TomcatWebApplicationsControllerUpdateInput,
    outputSchema: TomcatWebApplicationsControllerUpdateOutput,
  }));
// Input Schema
export const TomcatWebServersControllerGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    webAppSiteName: Schema.String.pipe(T.PathParam()),
    webServerName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/masterSites/{siteName}/webAppSites/{webAppSiteName}/tomcatWebServers/{webServerName}",
    }),
  );
export type TomcatWebServersControllerGetInput =
  typeof TomcatWebServersControllerGetInput.Type;

// Output Schema
export const TomcatWebServersControllerGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type TomcatWebServersControllerGetOutput =
  typeof TomcatWebServersControllerGetOutput.Type;

// The operation
/**
 * Method to get an Tomcat web server.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param webAppSiteName - Web app site name.
 * @param webServerName - Web server name.
 */
export const TomcatWebServersControllerGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: TomcatWebServersControllerGetInput,
    outputSchema: TomcatWebServersControllerGetOutput,
  }));
// Input Schema
export const TomcatWebServersControllerListByWebAppSiteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    webAppSiteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    filter: Schema.optional(Schema.String),
    top: Schema.optional(Schema.String),
    continuationToken: Schema.optional(Schema.String),
    totalRecordCount: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/masterSites/{siteName}/webAppSites/{webAppSiteName}/tomcatWebServers",
    }),
  );
export type TomcatWebServersControllerListByWebAppSiteInput =
  typeof TomcatWebServersControllerListByWebAppSiteInput.Type;

// Output Schema
export const TomcatWebServersControllerListByWebAppSiteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type TomcatWebServersControllerListByWebAppSiteOutput =
  typeof TomcatWebServersControllerListByWebAppSiteOutput.Type;

// The operation
/**
 * Method to get all Tomcat web servers.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param filter - filter query
 * @param top - page size  query
 * @param continuationToken - Optional parameter for continuation token.
 * @param totalRecordCount - Total count of machines in the given site.
 * @param siteName - Site name
 * @param webAppSiteName - Web app site name.
 */
export const TomcatWebServersControllerListByWebAppSite =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: TomcatWebServersControllerListByWebAppSiteInput,
    outputSchema: TomcatWebServersControllerListByWebAppSiteOutput,
  }));
// Input Schema
export const VcenterControllerCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    vcenterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/vmwareSites/{siteName}/vcenters/{vcenterName}",
    }),
  );
export type VcenterControllerCreateInput =
  typeof VcenterControllerCreateInput.Type;

// Output Schema
export const VcenterControllerCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type VcenterControllerCreateOutput =
  typeof VcenterControllerCreateOutput.Type;

// The operation
/**
 * Create a Vcenter
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param vcenterName -  VCenters name
 */
export const VcenterControllerCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VcenterControllerCreateInput,
    outputSchema: VcenterControllerCreateOutput,
  }),
);
// Input Schema
export const VcenterControllerDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    vcenterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/vmwareSites/{siteName}/vcenters/{vcenterName}",
    }),
  );
export type VcenterControllerDeleteInput =
  typeof VcenterControllerDeleteInput.Type;

// Output Schema
export const VcenterControllerDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type VcenterControllerDeleteOutput =
  typeof VcenterControllerDeleteOutput.Type;

// The operation
/**
 * Delete a Vcenter
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param vcenterName -  VCenters name
 */
export const VcenterControllerDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VcenterControllerDeleteInput,
    outputSchema: VcenterControllerDeleteOutput,
  }),
);
// Input Schema
export const VcenterControllerGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    vcenterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/vmwareSites/{siteName}/vcenters/{vcenterName}",
    }),
  );
export type VcenterControllerGetInput = typeof VcenterControllerGetInput.Type;

// Output Schema
export const VcenterControllerGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type VcenterControllerGetOutput = typeof VcenterControllerGetOutput.Type;

// The operation
/**
 * Get a Vcenter
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param vcenterName -  VCenters name
 */
export const VcenterControllerGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VcenterControllerGetInput,
    outputSchema: VcenterControllerGetOutput,
  }),
);
// Input Schema
export const VcenterControllerListByVmwareSiteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    filter: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/vmwareSites/{siteName}/vcenters",
    }),
  );
export type VcenterControllerListByVmwareSiteInput =
  typeof VcenterControllerListByVmwareSiteInput.Type;

// Output Schema
export const VcenterControllerListByVmwareSiteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type VcenterControllerListByVmwareSiteOutput =
  typeof VcenterControllerListByVmwareSiteOutput.Type;

// The operation
/**
 * List Vcenter resources by VmwareSite
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param filter - filter query
 * @param siteName - Site name
 */
export const VcenterControllerListByVmwareSite =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: VcenterControllerListByVmwareSiteInput,
    outputSchema: VcenterControllerListByVmwareSiteOutput,
  }));
// Input Schema
export const VirtualDesktopUserControllerGetVirtualDesktopUserInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/migrateProjects/{migrateProjectName}/virtualDesktopUsers/{virtualDesktopUserName}",
    }),
  );
export type VirtualDesktopUserControllerGetVirtualDesktopUserInput =
  typeof VirtualDesktopUserControllerGetVirtualDesktopUserInput.Type;

// Output Schema
export const VirtualDesktopUserControllerGetVirtualDesktopUserOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        assessmentData: Schema.optional(
          Schema.Array(
            Schema.Struct({
              lastUpdatedTime: Schema.optional(Schema.String),
              userId: Schema.optional(Schema.String),
              id: Schema.optional(Schema.String),
              enqueueTime: Schema.optional(Schema.String),
              solutionName: Schema.optional(Schema.String),
              userName: Schema.optional(Schema.String),
              userAccount: Schema.optional(Schema.String),
              country: Schema.optional(Schema.String),
              state: Schema.optional(Schema.String),
              city: Schema.optional(Schema.String),
              devicesUsed: Schema.optional(Schema.Array(Schema.String)),
              virtualization: Schema.optional(Schema.String),
              totalApplicationsCount: Schema.optional(Schema.Number),
              criticalApplications: Schema.optional(
                Schema.Array(Schema.String),
              ),
              osUsed: Schema.optional(Schema.Array(Schema.String)),
              multiUserWindows10: Schema.optional(Schema.Boolean),
              windows7: Schema.optional(Schema.Boolean),
              persona: Schema.optional(Schema.String),
              assessmentId: Schema.optional(Schema.String),
              targetLocation: Schema.optional(Schema.String),
              isReadyForMigration: Schema.optional(Schema.Boolean),
              targetAzureVmSize: Schema.optional(Schema.String),
              targetStorageType: Schema.optional(Schema.String),
              activeWeeklyHours: Schema.optional(Schema.Number),
              userExperienceScore: Schema.optional(Schema.Number),
              egressBandwidthWeekly: Schema.optional(Schema.Number),
              extendedInfo: Schema.optional(
                Schema.Record(Schema.String, Schema.String),
              ),
            }),
          ),
        ),
        lastUpdatedTime: Schema.optional(Schema.String),
      }),
    ),
  });
export type VirtualDesktopUserControllerGetVirtualDesktopUserOutput =
  typeof VirtualDesktopUserControllerGetVirtualDesktopUserOutput.Type;

// The operation
/**
 * Gets a virtual desktop user in the migrate project.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const VirtualDesktopUserControllerGetVirtualDesktopUser =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: VirtualDesktopUserControllerGetVirtualDesktopUserInput,
    outputSchema: VirtualDesktopUserControllerGetVirtualDesktopUserOutput,
  }));
// Input Schema
export const VirtualDesktopUserControllerListVirtualDesktopUsersInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/migrateProjects/{migrateProjectName}/virtualDesktopUsers",
    }),
  );
export type VirtualDesktopUserControllerListVirtualDesktopUsersInput =
  typeof VirtualDesktopUserControllerListVirtualDesktopUsersInput.Type;

// Output Schema
export const VirtualDesktopUserControllerListVirtualDesktopUsersOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Struct({
              assessmentData: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    lastUpdatedTime: Schema.optional(Schema.String),
                    userId: Schema.optional(Schema.String),
                    id: Schema.optional(Schema.String),
                    enqueueTime: Schema.optional(Schema.String),
                    solutionName: Schema.optional(Schema.String),
                    userName: Schema.optional(Schema.String),
                    userAccount: Schema.optional(Schema.String),
                    country: Schema.optional(Schema.String),
                    state: Schema.optional(Schema.String),
                    city: Schema.optional(Schema.String),
                    devicesUsed: Schema.optional(Schema.Array(Schema.String)),
                    virtualization: Schema.optional(Schema.String),
                    totalApplicationsCount: Schema.optional(Schema.Number),
                    criticalApplications: Schema.optional(
                      Schema.Array(Schema.String),
                    ),
                    osUsed: Schema.optional(Schema.Array(Schema.String)),
                    multiUserWindows10: Schema.optional(Schema.Boolean),
                    windows7: Schema.optional(Schema.Boolean),
                    persona: Schema.optional(Schema.String),
                    assessmentId: Schema.optional(Schema.String),
                    targetLocation: Schema.optional(Schema.String),
                    isReadyForMigration: Schema.optional(Schema.Boolean),
                    targetAzureVmSize: Schema.optional(Schema.String),
                    targetStorageType: Schema.optional(Schema.String),
                    activeWeeklyHours: Schema.optional(Schema.Number),
                    userExperienceScore: Schema.optional(Schema.Number),
                    egressBandwidthWeekly: Schema.optional(Schema.Number),
                    extendedInfo: Schema.optional(
                      Schema.Record(Schema.String, Schema.String),
                    ),
                  }),
                ),
              ),
              lastUpdatedTime: Schema.optional(Schema.String),
            }),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type VirtualDesktopUserControllerListVirtualDesktopUsersOutput =
  typeof VirtualDesktopUserControllerListVirtualDesktopUsersOutput.Type;

// The operation
/**
 * Gets a list of virtual desktop users in the migrate project.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const VirtualDesktopUserControllerListVirtualDesktopUsers =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: VirtualDesktopUserControllerListVirtualDesktopUsersInput,
    outputSchema: VirtualDesktopUserControllerListVirtualDesktopUsersOutput,
  }));
// Input Schema
export const VmwareCollectorsOperationsCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    vmWareCollectorName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/vmwarecollectors/{vmWareCollectorName}",
    }),
  );
export type VmwareCollectorsOperationsCreateInput =
  typeof VmwareCollectorsOperationsCreateInput.Type;

// Output Schema
export const VmwareCollectorsOperationsCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type VmwareCollectorsOperationsCreateOutput =
  typeof VmwareCollectorsOperationsCreateOutput.Type;

// The operation
/**
 * Create a VmwareCollector
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 * @param vmWareCollectorName - VMware collector ARM name
 */
export const VmwareCollectorsOperationsCreate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: VmwareCollectorsOperationsCreateInput,
    outputSchema: VmwareCollectorsOperationsCreateOutput,
  }));
// Input Schema
export const VmwareCollectorsOperationsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    vmWareCollectorName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/vmwarecollectors/{vmWareCollectorName}",
    }),
  );
export type VmwareCollectorsOperationsDeleteInput =
  typeof VmwareCollectorsOperationsDeleteInput.Type;

// Output Schema
export const VmwareCollectorsOperationsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type VmwareCollectorsOperationsDeleteOutput =
  typeof VmwareCollectorsOperationsDeleteOutput.Type;

// The operation
/**
 * Delete a VmwareCollector
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 * @param vmWareCollectorName - VMware collector ARM name
 */
export const VmwareCollectorsOperationsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: VmwareCollectorsOperationsDeleteInput,
    outputSchema: VmwareCollectorsOperationsDeleteOutput,
  }));
// Input Schema
export const VmwareCollectorsOperationsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    vmWareCollectorName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/vmwarecollectors/{vmWareCollectorName}",
    }),
  );
export type VmwareCollectorsOperationsGetInput =
  typeof VmwareCollectorsOperationsGetInput.Type;

// Output Schema
export const VmwareCollectorsOperationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type VmwareCollectorsOperationsGetOutput =
  typeof VmwareCollectorsOperationsGetOutput.Type;

// The operation
/**
 * Get a VmwareCollector
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 * @param vmWareCollectorName - VMware collector ARM name
 */
export const VmwareCollectorsOperationsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: VmwareCollectorsOperationsGetInput,
    outputSchema: VmwareCollectorsOperationsGetOutput,
  }));
// Input Schema
export const VmwareCollectorsOperationsListByAssessmentProjectInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/vmwarecollectors",
    }),
  );
export type VmwareCollectorsOperationsListByAssessmentProjectInput =
  typeof VmwareCollectorsOperationsListByAssessmentProjectInput.Type;

// Output Schema
export const VmwareCollectorsOperationsListByAssessmentProjectOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type VmwareCollectorsOperationsListByAssessmentProjectOutput =
  typeof VmwareCollectorsOperationsListByAssessmentProjectOutput.Type;

// The operation
/**
 * List VmwareCollector resources by AssessmentProject
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 */
export const VmwareCollectorsOperationsListByAssessmentProject =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: VmwareCollectorsOperationsListByAssessmentProjectInput,
    outputSchema: VmwareCollectorsOperationsListByAssessmentProjectOutput,
  }));
// Input Schema
export const VmwareHostControllerGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    hostName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/vmwareSites/{siteName}/hosts/{hostName}",
    }),
  );
export type VmwareHostControllerGetInput =
  typeof VmwareHostControllerGetInput.Type;

// Output Schema
export const VmwareHostControllerGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type VmwareHostControllerGetOutput =
  typeof VmwareHostControllerGetOutput.Type;

// The operation
/**
 * Get a VmwareHost
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param hostName -  Hosts name
 */
export const VmwareHostControllerGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VmwareHostControllerGetInput,
    outputSchema: VmwareHostControllerGetOutput,
  }),
);
// Input Schema
export const VmwareHostControllerListByVmwareSiteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/vmwareSites/{siteName}/hosts",
    }),
  );
export type VmwareHostControllerListByVmwareSiteInput =
  typeof VmwareHostControllerListByVmwareSiteInput.Type;

// Output Schema
export const VmwareHostControllerListByVmwareSiteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type VmwareHostControllerListByVmwareSiteOutput =
  typeof VmwareHostControllerListByVmwareSiteOutput.Type;

// The operation
/**
 * List VmwareHost resources by VmwareSite
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const VmwareHostControllerListByVmwareSite =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: VmwareHostControllerListByVmwareSiteInput,
    outputSchema: VmwareHostControllerListByVmwareSiteOutput,
  }));
// Input Schema
export const VmwareOperationsStatusGetVmwareOperationStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    operationStatusName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/vmwareSites/{siteName}/operationsStatus/{operationStatusName}",
    }),
  );
export type VmwareOperationsStatusGetVmwareOperationStatusInput =
  typeof VmwareOperationsStatusGetVmwareOperationStatusInput.Type;

// Output Schema
export const VmwareOperationsStatusGetVmwareOperationStatusOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    status: Schema.optional(Schema.String),
    startTime: Schema.optional(Schema.String),
    endTime: Schema.optional(Schema.String),
    error: Schema.optional(
      Schema.Struct({
        code: Schema.optional(Schema.String),
        message: Schema.optional(Schema.String),
      }),
    ),
    properties: Schema.optional(
      Schema.Struct({
        result: Schema.optional(Schema.String),
      }),
    ),
  });
export type VmwareOperationsStatusGetVmwareOperationStatusOutput =
  typeof VmwareOperationsStatusGetVmwareOperationStatusOutput.Type;

// The operation
/**
 * A operation status resource belonging to a site resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param operationStatusName - Operation status  Arm Name.
 */
export const VmwareOperationsStatusGetVmwareOperationStatus =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: VmwareOperationsStatusGetVmwareOperationStatusInput,
    outputSchema: VmwareOperationsStatusGetVmwareOperationStatusOutput,
  }));
// Input Schema
export const VmwarePropertiesControllerUpdateDependencyMapStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/vmwareSites/{siteName}/updateDependencyMapStatus",
    }),
  );
export type VmwarePropertiesControllerUpdateDependencyMapStatusInput =
  typeof VmwarePropertiesControllerUpdateDependencyMapStatusInput.Type;

// Output Schema
export const VmwarePropertiesControllerUpdateDependencyMapStatusOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown;
export type VmwarePropertiesControllerUpdateDependencyMapStatusOutput =
  typeof VmwarePropertiesControllerUpdateDependencyMapStatusOutput.Type;

// The operation
/**
 * Method to enable disable dependency map status for machines
 * in a
 * site.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const VmwarePropertiesControllerUpdateDependencyMapStatus =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: VmwarePropertiesControllerUpdateDependencyMapStatusInput,
    outputSchema: VmwarePropertiesControllerUpdateDependencyMapStatusOutput,
  }));
// Input Schema
export const VmwarePropertiesControllerUpdatePropertiesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/vmwareSites/{siteName}/updateProperties",
    }),
  );
export type VmwarePropertiesControllerUpdatePropertiesInput =
  typeof VmwarePropertiesControllerUpdatePropertiesInput.Type;

// Output Schema
export const VmwarePropertiesControllerUpdatePropertiesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown;
export type VmwarePropertiesControllerUpdatePropertiesOutput =
  typeof VmwarePropertiesControllerUpdatePropertiesOutput.Type;

// The operation
/**
 * Method to update properties for machines   in a site.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const VmwarePropertiesControllerUpdateProperties =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: VmwarePropertiesControllerUpdatePropertiesInput,
    outputSchema: VmwarePropertiesControllerUpdatePropertiesOutput,
  }));
// Input Schema
export const VmwarePropertiesControllerUpdateRunAsAccountInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/vmwareSites/{siteName}/updateRunAsAccount",
    }),
  );
export type VmwarePropertiesControllerUpdateRunAsAccountInput =
  typeof VmwarePropertiesControllerUpdateRunAsAccountInput.Type;

// Output Schema
export const VmwarePropertiesControllerUpdateRunAsAccountOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown;
export type VmwarePropertiesControllerUpdateRunAsAccountOutput =
  typeof VmwarePropertiesControllerUpdateRunAsAccountOutput.Type;

// The operation
/**
 * Method to associate Run as account to machine
 * in a site.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const VmwarePropertiesControllerUpdateRunAsAccount =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: VmwarePropertiesControllerUpdateRunAsAccountInput,
    outputSchema: VmwarePropertiesControllerUpdateRunAsAccountOutput,
  }));
// Input Schema
export const VmwarePropertiesControllerUpdateTagsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/vmwareSites/{siteName}/updateTags",
    }),
  );
export type VmwarePropertiesControllerUpdateTagsInput =
  typeof VmwarePropertiesControllerUpdateTagsInput.Type;

// Output Schema
export const VmwarePropertiesControllerUpdateTagsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown;
export type VmwarePropertiesControllerUpdateTagsOutput =
  typeof VmwarePropertiesControllerUpdateTagsOutput.Type;

// The operation
/**
 * Method to associate Run as account to machine
 * in a site.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const VmwarePropertiesControllerUpdateTags =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: VmwarePropertiesControllerUpdateTagsInput,
    outputSchema: VmwarePropertiesControllerUpdateTagsOutput,
  }));
// Input Schema
export const VmwareSoftwareInventoriesControllerGetMachineSoftwareInventoryInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    machineName: Schema.String.pipe(T.PathParam()),
    default: Schema.Literals(["default"]).pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/vmwareSites/{siteName}/machines/{machineName}/softwareInventories/{default}",
    }),
  );
export type VmwareSoftwareInventoriesControllerGetMachineSoftwareInventoryInput =
  typeof VmwareSoftwareInventoriesControllerGetMachineSoftwareInventoryInput.Type;

// Output Schema
export const VmwareSoftwareInventoriesControllerGetMachineSoftwareInventoryOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type VmwareSoftwareInventoriesControllerGetMachineSoftwareInventoryOutput =
  typeof VmwareSoftwareInventoriesControllerGetMachineSoftwareInventoryOutput.Type;

// The operation
/**
 * Method to get a machines software inventory like applications and roles.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param machineName - Machine name
 * @param default - Default value.
 */
export const VmwareSoftwareInventoriesControllerGetMachineSoftwareInventory =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      VmwareSoftwareInventoriesControllerGetMachineSoftwareInventoryInput,
    outputSchema:
      VmwareSoftwareInventoriesControllerGetMachineSoftwareInventoryOutput,
  }));
// Input Schema
export const VmwareSoftwareInventoriesControllerListByMachineResourceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    machineName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/vmwareSites/{siteName}/machines/{machineName}/softwareinventories",
    }),
  );
export type VmwareSoftwareInventoriesControllerListByMachineResourceInput =
  typeof VmwareSoftwareInventoriesControllerListByMachineResourceInput.Type;

// Output Schema
export const VmwareSoftwareInventoriesControllerListByMachineResourceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type VmwareSoftwareInventoriesControllerListByMachineResourceOutput =
  typeof VmwareSoftwareInventoriesControllerListByMachineResourceOutput.Type;

// The operation
/**
 * List VmwareMachineSoftwareInventory resources by MachineResource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param machineName - Machine name
 */
export const VmwareSoftwareInventoriesControllerListByMachineResource =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: VmwareSoftwareInventoriesControllerListByMachineResourceInput,
    outputSchema:
      VmwareSoftwareInventoriesControllerListByMachineResourceOutput,
  }));
// Input Schema
export const WebAppAssessmentOptionsOperationsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    assessmentOptionsName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/webAppAssessmentOptions/{assessmentOptionsName}",
    }),
  );
export type WebAppAssessmentOptionsOperationsGetInput =
  typeof WebAppAssessmentOptionsOperationsGetInput.Type;

// Output Schema
export const WebAppAssessmentOptionsOperationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WebAppAssessmentOptionsOperationsGetOutput =
  typeof WebAppAssessmentOptionsOperationsGetOutput.Type;

// The operation
/**
 * Get a WebAppAssessmentOptions
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 * @param assessmentOptionsName - Web app assessment options ARM name. Accepted values is 'default'
 */
export const WebAppAssessmentOptionsOperationsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WebAppAssessmentOptionsOperationsGetInput,
    outputSchema: WebAppAssessmentOptionsOperationsGetOutput,
  }));
// Input Schema
export const WebAppAssessmentOptionsOperationsListByAssessmentProjectInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/webAppAssessmentOptions",
    }),
  );
export type WebAppAssessmentOptionsOperationsListByAssessmentProjectInput =
  typeof WebAppAssessmentOptionsOperationsListByAssessmentProjectInput.Type;

// Output Schema
export const WebAppAssessmentOptionsOperationsListByAssessmentProjectOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type WebAppAssessmentOptionsOperationsListByAssessmentProjectOutput =
  typeof WebAppAssessmentOptionsOperationsListByAssessmentProjectOutput.Type;

// The operation
/**
 * List WebAppAssessmentOptions resources by AssessmentProject
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 */
export const WebAppAssessmentOptionsOperationsListByAssessmentProject =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WebAppAssessmentOptionsOperationsListByAssessmentProjectInput,
    outputSchema:
      WebAppAssessmentOptionsOperationsListByAssessmentProjectOutput,
  }));
// Input Schema
export const WebAppAssessmentV2OperationsCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    groupName: Schema.String.pipe(T.PathParam()),
    assessmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/groups/{groupName}/webAppAssessments/{assessmentName}",
    }),
  );
export type WebAppAssessmentV2OperationsCreateInput =
  typeof WebAppAssessmentV2OperationsCreateInput.Type;

// Output Schema
export const WebAppAssessmentV2OperationsCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WebAppAssessmentV2OperationsCreateOutput =
  typeof WebAppAssessmentV2OperationsCreateOutput.Type;

// The operation
/**
 * Create a WebAppAssessmentV2
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 * @param groupName - Group ARM name
 * @param assessmentName - Web app Assessment arm name.
 */
export const WebAppAssessmentV2OperationsCreate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WebAppAssessmentV2OperationsCreateInput,
    outputSchema: WebAppAssessmentV2OperationsCreateOutput,
  }));
// Input Schema
export const WebAppAssessmentV2OperationsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    groupName: Schema.String.pipe(T.PathParam()),
    assessmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/groups/{groupName}/webAppAssessments/{assessmentName}",
    }),
  );
export type WebAppAssessmentV2OperationsDeleteInput =
  typeof WebAppAssessmentV2OperationsDeleteInput.Type;

// Output Schema
export const WebAppAssessmentV2OperationsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type WebAppAssessmentV2OperationsDeleteOutput =
  typeof WebAppAssessmentV2OperationsDeleteOutput.Type;

// The operation
/**
 * Delete a WebAppAssessmentV2
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 * @param groupName - Group ARM name
 * @param assessmentName - Web app Assessment arm name.
 */
export const WebAppAssessmentV2OperationsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WebAppAssessmentV2OperationsDeleteInput,
    outputSchema: WebAppAssessmentV2OperationsDeleteOutput,
  }));
// Input Schema
export const WebAppAssessmentV2OperationsDownloadUrlInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    groupName: Schema.String.pipe(T.PathParam()),
    assessmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/groups/{groupName}/webAppAssessments/{assessmentName}/downloadUrl",
    }),
  );
export type WebAppAssessmentV2OperationsDownloadUrlInput =
  typeof WebAppAssessmentV2OperationsDownloadUrlInput.Type;

// Output Schema
export const WebAppAssessmentV2OperationsDownloadUrlOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    assessmentReportUrl: Schema.String,
    expirationTime: Schema.String,
  });
export type WebAppAssessmentV2OperationsDownloadUrlOutput =
  typeof WebAppAssessmentV2OperationsDownloadUrlOutput.Type;

// The operation
/**
 * Get download URL for the assessment report.
 *
 * Get the URL for downloading the assessment in a report format.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 * @param groupName - Group ARM name
 * @param assessmentName - Web app Assessment arm name.
 */
export const WebAppAssessmentV2OperationsDownloadUrl =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WebAppAssessmentV2OperationsDownloadUrlInput,
    outputSchema: WebAppAssessmentV2OperationsDownloadUrlOutput,
  }));
// Input Schema
export const WebAppAssessmentV2OperationsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    groupName: Schema.String.pipe(T.PathParam()),
    assessmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/groups/{groupName}/webAppAssessments/{assessmentName}",
    }),
  );
export type WebAppAssessmentV2OperationsGetInput =
  typeof WebAppAssessmentV2OperationsGetInput.Type;

// Output Schema
export const WebAppAssessmentV2OperationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WebAppAssessmentV2OperationsGetOutput =
  typeof WebAppAssessmentV2OperationsGetOutput.Type;

// The operation
/**
 * Get a WebAppAssessmentV2
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 * @param groupName - Group ARM name
 * @param assessmentName - Web app Assessment arm name.
 */
export const WebAppAssessmentV2OperationsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WebAppAssessmentV2OperationsGetInput,
    outputSchema: WebAppAssessmentV2OperationsGetOutput,
  }));
// Input Schema
export const WebAppAssessmentV2OperationsListByGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    groupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/groups/{groupName}/webAppAssessments",
    }),
  );
export type WebAppAssessmentV2OperationsListByGroupInput =
  typeof WebAppAssessmentV2OperationsListByGroupInput.Type;

// Output Schema
export const WebAppAssessmentV2OperationsListByGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type WebAppAssessmentV2OperationsListByGroupOutput =
  typeof WebAppAssessmentV2OperationsListByGroupOutput.Type;

// The operation
/**
 * List WebAppAssessmentV2 resources by Group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 * @param groupName - Group ARM name
 */
export const WebAppAssessmentV2OperationsListByGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WebAppAssessmentV2OperationsListByGroupInput,
    outputSchema: WebAppAssessmentV2OperationsListByGroupOutput,
  }));
// Input Schema
export const WebAppAssessmentV2SummaryOperationsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    groupName: Schema.String.pipe(T.PathParam()),
    assessmentName: Schema.String.pipe(T.PathParam()),
    summaryName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/groups/{groupName}/webAppAssessments/{assessmentName}/summaries/{summaryName}",
    }),
  );
export type WebAppAssessmentV2SummaryOperationsGetInput =
  typeof WebAppAssessmentV2SummaryOperationsGetInput.Type;

// Output Schema
export const WebAppAssessmentV2SummaryOperationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WebAppAssessmentV2SummaryOperationsGetOutput =
  typeof WebAppAssessmentV2SummaryOperationsGetOutput.Type;

// The operation
/**
 * Get a WebAppAssessmentV2Summary
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 * @param groupName - Group ARM name
 * @param assessmentName - Web app Assessment arm name.
 * @param summaryName - Gets the Name of the Web app Summary.
 */
export const WebAppAssessmentV2SummaryOperationsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WebAppAssessmentV2SummaryOperationsGetInput,
    outputSchema: WebAppAssessmentV2SummaryOperationsGetOutput,
  }));
// Input Schema
export const WebAppAssessmentV2SummaryOperationsListByWebAppAssessmentV2Input =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    groupName: Schema.String.pipe(T.PathParam()),
    assessmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/groups/{groupName}/webAppAssessments/{assessmentName}/summaries",
    }),
  );
export type WebAppAssessmentV2SummaryOperationsListByWebAppAssessmentV2Input =
  typeof WebAppAssessmentV2SummaryOperationsListByWebAppAssessmentV2Input.Type;

// Output Schema
export const WebAppAssessmentV2SummaryOperationsListByWebAppAssessmentV2Output =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type WebAppAssessmentV2SummaryOperationsListByWebAppAssessmentV2Output =
  typeof WebAppAssessmentV2SummaryOperationsListByWebAppAssessmentV2Output.Type;

// The operation
/**
 * List WebAppAssessmentV2Summary resources by WebAppAssessmentV2
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 * @param groupName - Group ARM name
 * @param assessmentName - Web app Assessment arm name.
 */
export const WebAppAssessmentV2SummaryOperationsListByWebAppAssessmentV2 =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      WebAppAssessmentV2SummaryOperationsListByWebAppAssessmentV2Input,
    outputSchema:
      WebAppAssessmentV2SummaryOperationsListByWebAppAssessmentV2Output,
  }));
// Input Schema
export const WebAppCollectorOperationsCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    collectorName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/webAppCollectors/{collectorName}",
    }),
  );
export type WebAppCollectorOperationsCreateInput =
  typeof WebAppCollectorOperationsCreateInput.Type;

// Output Schema
export const WebAppCollectorOperationsCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WebAppCollectorOperationsCreateOutput =
  typeof WebAppCollectorOperationsCreateOutput.Type;

// The operation
/**
 * Create a WebAppCollector
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 * @param collectorName - Web app collector ARM name.
 */
export const WebAppCollectorOperationsCreate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WebAppCollectorOperationsCreateInput,
    outputSchema: WebAppCollectorOperationsCreateOutput,
  }));
// Input Schema
export const WebAppCollectorOperationsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    collectorName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/webAppCollectors/{collectorName}",
    }),
  );
export type WebAppCollectorOperationsDeleteInput =
  typeof WebAppCollectorOperationsDeleteInput.Type;

// Output Schema
export const WebAppCollectorOperationsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type WebAppCollectorOperationsDeleteOutput =
  typeof WebAppCollectorOperationsDeleteOutput.Type;

// The operation
/**
 * Delete a WebAppCollector
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 * @param collectorName - Web app collector ARM name.
 */
export const WebAppCollectorOperationsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WebAppCollectorOperationsDeleteInput,
    outputSchema: WebAppCollectorOperationsDeleteOutput,
  }));
// Input Schema
export const WebAppCollectorOperationsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    collectorName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/webAppCollectors/{collectorName}",
    }),
  );
export type WebAppCollectorOperationsGetInput =
  typeof WebAppCollectorOperationsGetInput.Type;

// Output Schema
export const WebAppCollectorOperationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WebAppCollectorOperationsGetOutput =
  typeof WebAppCollectorOperationsGetOutput.Type;

// The operation
/**
 * Get a WebAppCollector
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 * @param collectorName - Web app collector ARM name.
 */
export const WebAppCollectorOperationsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WebAppCollectorOperationsGetInput,
    outputSchema: WebAppCollectorOperationsGetOutput,
  }));
// Input Schema
export const WebAppCollectorOperationsListByAssessmentProjectInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/webAppCollectors",
    }),
  );
export type WebAppCollectorOperationsListByAssessmentProjectInput =
  typeof WebAppCollectorOperationsListByAssessmentProjectInput.Type;

// Output Schema
export const WebAppCollectorOperationsListByAssessmentProjectOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type WebAppCollectorOperationsListByAssessmentProjectOutput =
  typeof WebAppCollectorOperationsListByAssessmentProjectOutput.Type;

// The operation
/**
 * List WebAppCollector resources by AssessmentProject
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 */
export const WebAppCollectorOperationsListByAssessmentProject =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WebAppCollectorOperationsListByAssessmentProjectInput,
    outputSchema: WebAppCollectorOperationsListByAssessmentProjectOutput,
  }));
// Input Schema
export const WebAppDiscoverySiteDataSourcesControllerCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    webAppSiteName: Schema.String.pipe(T.PathParam()),
    discoverySiteDataSourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/masterSites/{siteName}/webAppSites/{webAppSiteName}/discoverySiteDataSources/{discoverySiteDataSourceName}",
    }),
  );
export type WebAppDiscoverySiteDataSourcesControllerCreateInput =
  typeof WebAppDiscoverySiteDataSourcesControllerCreateInput.Type;

// Output Schema
export const WebAppDiscoverySiteDataSourcesControllerCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WebAppDiscoverySiteDataSourcesControllerCreateOutput =
  typeof WebAppDiscoverySiteDataSourcesControllerCreateOutput.Type;

// The operation
/**
 * Method to create or update a Web app data source in site.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param webAppSiteName - Web app site name.
 * @param discoverySiteDataSourceName - Data Source ARM name.
 */
export const WebAppDiscoverySiteDataSourcesControllerCreate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WebAppDiscoverySiteDataSourcesControllerCreateInput,
    outputSchema: WebAppDiscoverySiteDataSourcesControllerCreateOutput,
  }));
// Input Schema
export const WebAppDiscoverySiteDataSourcesControllerDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    webAppSiteName: Schema.String.pipe(T.PathParam()),
    discoverySiteDataSourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/masterSites/{siteName}/webAppSites/{webAppSiteName}/discoverySiteDataSources/{discoverySiteDataSourceName}",
    }),
  );
export type WebAppDiscoverySiteDataSourcesControllerDeleteInput =
  typeof WebAppDiscoverySiteDataSourcesControllerDeleteInput.Type;

// Output Schema
export const WebAppDiscoverySiteDataSourcesControllerDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type WebAppDiscoverySiteDataSourcesControllerDeleteOutput =
  typeof WebAppDiscoverySiteDataSourcesControllerDeleteOutput.Type;

// The operation
/**
 * Method to delete a Web app data source in site.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param webAppSiteName - Web app site name.
 * @param discoverySiteDataSourceName - Data Source ARM name.
 */
export const WebAppDiscoverySiteDataSourcesControllerDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WebAppDiscoverySiteDataSourcesControllerDeleteInput,
    outputSchema: WebAppDiscoverySiteDataSourcesControllerDeleteOutput,
  }));
// Input Schema
export const WebAppDiscoverySiteDataSourcesControllerGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    webAppSiteName: Schema.String.pipe(T.PathParam()),
    discoverySiteDataSourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/masterSites/{siteName}/webAppSites/{webAppSiteName}/discoverySiteDataSources/{discoverySiteDataSourceName}",
    }),
  );
export type WebAppDiscoverySiteDataSourcesControllerGetInput =
  typeof WebAppDiscoverySiteDataSourcesControllerGetInput.Type;

// Output Schema
export const WebAppDiscoverySiteDataSourcesControllerGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WebAppDiscoverySiteDataSourcesControllerGetOutput =
  typeof WebAppDiscoverySiteDataSourcesControllerGetOutput.Type;

// The operation
/**
 * Method to get a Web app data source in site.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param webAppSiteName - Web app site name.
 * @param discoverySiteDataSourceName - Data Source ARM name.
 */
export const WebAppDiscoverySiteDataSourcesControllerGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WebAppDiscoverySiteDataSourcesControllerGetInput,
    outputSchema: WebAppDiscoverySiteDataSourcesControllerGetOutput,
  }));
// Input Schema
export const WebAppDiscoverySiteDataSourcesControllerListByWebAppSiteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    webAppSiteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/masterSites/{siteName}/webAppSites/{webAppSiteName}/discoverySiteDataSources",
    }),
  );
export type WebAppDiscoverySiteDataSourcesControllerListByWebAppSiteInput =
  typeof WebAppDiscoverySiteDataSourcesControllerListByWebAppSiteInput.Type;

// Output Schema
export const WebAppDiscoverySiteDataSourcesControllerListByWebAppSiteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type WebAppDiscoverySiteDataSourcesControllerListByWebAppSiteOutput =
  typeof WebAppDiscoverySiteDataSourcesControllerListByWebAppSiteOutput.Type;

// The operation
/**
 * Method to get all Web app data sources in site.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param webAppSiteName - Web app site name.
 */
export const WebAppDiscoverySiteDataSourcesControllerListByWebAppSite =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WebAppDiscoverySiteDataSourcesControllerListByWebAppSiteInput,
    outputSchema:
      WebAppDiscoverySiteDataSourcesControllerListByWebAppSiteOutput,
  }));
// Input Schema
export const WebAppExtendedMachinesControllerGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    webAppSiteName: Schema.String.pipe(T.PathParam()),
    extendedMachineName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/masterSites/{siteName}/webAppSites/{webAppSiteName}/extendedMachines/{extendedMachineName}",
    }),
  );
export type WebAppExtendedMachinesControllerGetInput =
  typeof WebAppExtendedMachinesControllerGetInput.Type;

// Output Schema
export const WebAppExtendedMachinesControllerGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WebAppExtendedMachinesControllerGetOutput =
  typeof WebAppExtendedMachinesControllerGetOutput.Type;

// The operation
/**
 * Method to get a extended machine.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param webAppSiteName - Web app site name.
 * @param extendedMachineName - Extended machine name.
 */
export const WebAppExtendedMachinesControllerGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WebAppExtendedMachinesControllerGetInput,
    outputSchema: WebAppExtendedMachinesControllerGetOutput,
  }));
// Input Schema
export const WebAppExtendedMachinesControllerListByWebAppSiteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    webAppSiteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    filter: Schema.optional(Schema.String),
    top: Schema.optional(Schema.String),
    continuationToken: Schema.optional(Schema.String),
    totalRecordCount: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/masterSites/{siteName}/webAppSites/{webAppSiteName}/extendedMachines",
    }),
  );
export type WebAppExtendedMachinesControllerListByWebAppSiteInput =
  typeof WebAppExtendedMachinesControllerListByWebAppSiteInput.Type;

// Output Schema
export const WebAppExtendedMachinesControllerListByWebAppSiteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type WebAppExtendedMachinesControllerListByWebAppSiteOutput =
  typeof WebAppExtendedMachinesControllerListByWebAppSiteOutput.Type;

// The operation
/**
 * Method to get all extended machines.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param filter - filter query
 * @param top - page size  query
 * @param continuationToken - Optional parameter for continuation token.
 * @param totalRecordCount - Total count of machines in the given site.
 * @param siteName - Site name
 * @param webAppSiteName - Web app site name.
 */
export const WebAppExtendedMachinesControllerListByWebAppSite =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WebAppExtendedMachinesControllerListByWebAppSiteInput,
    outputSchema: WebAppExtendedMachinesControllerListByWebAppSiteOutput,
  }));
// Input Schema
export const WebApplicationsControllerListByWebAppSiteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    webAppSiteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    filter: Schema.optional(Schema.String),
    top: Schema.optional(Schema.String),
    continuationToken: Schema.optional(Schema.String),
    totalRecordCount: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/masterSites/{siteName}/webAppSites/{webAppSiteName}/webApplications",
    }),
  );
export type WebApplicationsControllerListByWebAppSiteInput =
  typeof WebApplicationsControllerListByWebAppSiteInput.Type;

// Output Schema
export const WebApplicationsControllerListByWebAppSiteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type WebApplicationsControllerListByWebAppSiteOutput =
  typeof WebApplicationsControllerListByWebAppSiteOutput.Type;

// The operation
/**
 * Method to get all IIS web applications.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param filter - filter query
 * @param top - page size  query
 * @param continuationToken - Optional parameter for continuation token.
 * @param totalRecordCount - Total count of machines in the given site.
 * @param siteName - Site name
 * @param webAppSiteName - Web app site name.
 */
export const WebApplicationsControllerListByWebAppSite =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WebApplicationsControllerListByWebAppSiteInput,
    outputSchema: WebApplicationsControllerListByWebAppSiteOutput,
  }));
// Input Schema
export const WebAppPropertiesControllerUpdatePropertiesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    webAppSiteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/masterSites/{siteName}/webAppSites/{webAppSiteName}/updateProperties",
    }),
  );
export type WebAppPropertiesControllerUpdatePropertiesInput =
  typeof WebAppPropertiesControllerUpdatePropertiesInput.Type;

// Output Schema
export const WebAppPropertiesControllerUpdatePropertiesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown;
export type WebAppPropertiesControllerUpdatePropertiesOutput =
  typeof WebAppPropertiesControllerUpdatePropertiesOutput.Type;

// The operation
/**
 * Method to update properties for web applications.
 * in a site.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param webAppSiteName - Web app site name.
 */
export const WebAppPropertiesControllerUpdateProperties =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WebAppPropertiesControllerUpdatePropertiesInput,
    outputSchema: WebAppPropertiesControllerUpdatePropertiesOutput,
  }));
// Input Schema
export const WebAppRunAsAccountsControllerGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    webAppSiteName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/masterSites/{siteName}/webAppSites/{webAppSiteName}/runasaccounts/{accountName}",
    }),
  );
export type WebAppRunAsAccountsControllerGetInput =
  typeof WebAppRunAsAccountsControllerGetInput.Type;

// Output Schema
export const WebAppRunAsAccountsControllerGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WebAppRunAsAccountsControllerGetOutput =
  typeof WebAppRunAsAccountsControllerGetOutput.Type;

// The operation
/**
 * Method to get run as account.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param webAppSiteName - Web app site name.
 * @param accountName - Run as account ARM name.
 */
export const WebAppRunAsAccountsControllerGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WebAppRunAsAccountsControllerGetInput,
    outputSchema: WebAppRunAsAccountsControllerGetOutput,
  }));
// Input Schema
export const WebAppRunAsAccountsControllerListByWebAppSiteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    webAppSiteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/masterSites/{siteName}/webAppSites/{webAppSiteName}/runasaccounts",
    }),
  );
export type WebAppRunAsAccountsControllerListByWebAppSiteInput =
  typeof WebAppRunAsAccountsControllerListByWebAppSiteInput.Type;

// Output Schema
export const WebAppRunAsAccountsControllerListByWebAppSiteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type WebAppRunAsAccountsControllerListByWebAppSiteOutput =
  typeof WebAppRunAsAccountsControllerListByWebAppSiteOutput.Type;

// The operation
/**
 * Method to get all run as accounts.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param webAppSiteName - Web app site name.
 */
export const WebAppRunAsAccountsControllerListByWebAppSite =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WebAppRunAsAccountsControllerListByWebAppSiteInput,
    outputSchema: WebAppRunAsAccountsControllerListByWebAppSiteOutput,
  }));
// Input Schema
export const WebAppServicePlanV2OperationsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    groupName: Schema.String.pipe(T.PathParam()),
    assessmentName: Schema.String.pipe(T.PathParam()),
    webAppServicePlanName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/groups/{groupName}/webAppAssessments/{assessmentName}/webAppServicePlans/{webAppServicePlanName}",
    }),
  );
export type WebAppServicePlanV2OperationsGetInput =
  typeof WebAppServicePlanV2OperationsGetInput.Type;

// Output Schema
export const WebAppServicePlanV2OperationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WebAppServicePlanV2OperationsGetOutput =
  typeof WebAppServicePlanV2OperationsGetOutput.Type;

// The operation
/**
 * Get a WebAppServicePlanV2
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param projectName - Assessment Project Name
 * @param groupName - Group ARM name
 * @param assessmentName - Web app Assessment arm name.
 * @param webAppServicePlanName - Web app service plan ARM name.
 */
export const WebAppServicePlanV2OperationsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WebAppServicePlanV2OperationsGetInput,
    outputSchema: WebAppServicePlanV2OperationsGetOutput,
  }));
// Input Schema
export const WebAppServicePlanV2OperationsListByWebAppAssessmentV2Input =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    groupName: Schema.String.pipe(T.PathParam()),
    assessmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $filter: Schema.optional(Schema.String),
    pageSize: Schema.optional(Schema.Number),
    continuationToken: Schema.optional(Schema.String),
    totalRecordCount: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/groups/{groupName}/webAppAssessments/{assessmentName}/webAppServicePlans",
    }),
  );
export type WebAppServicePlanV2OperationsListByWebAppAssessmentV2Input =
  typeof WebAppServicePlanV2OperationsListByWebAppAssessmentV2Input.Type;

// Output Schema
export const WebAppServicePlanV2OperationsListByWebAppAssessmentV2Output =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type WebAppServicePlanV2OperationsListByWebAppAssessmentV2Output =
  typeof WebAppServicePlanV2OperationsListByWebAppAssessmentV2Output.Type;

// The operation
/**
 * List WebAppServicePlanV2 resources by WebAppAssessmentV2
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param $filter - Filter query.
 * @param pageSize - Optional parameter for page size.
 * @param continuationToken - Optional parameter for continuation token.
 * @param totalRecordCount - Total record count.
 * @param projectName - Assessment Project Name
 * @param groupName - Group ARM name
 * @param assessmentName - Web app Assessment arm name.
 */
export const WebAppServicePlanV2OperationsListByWebAppAssessmentV2 =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WebAppServicePlanV2OperationsListByWebAppAssessmentV2Input,
    outputSchema: WebAppServicePlanV2OperationsListByWebAppAssessmentV2Output,
  }));
// Input Schema
export const WebAppSitesControllerCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    webAppSiteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/masterSites/{siteName}/webAppSites/{webAppSiteName}",
    }),
  );
export type WebAppSitesControllerCreateInput =
  typeof WebAppSitesControllerCreateInput.Type;

// Output Schema
export const WebAppSitesControllerCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WebAppSitesControllerCreateOutput =
  typeof WebAppSitesControllerCreateOutput.Type;

// The operation
/**
 * Method to create a WebApp site.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param webAppSiteName - Web app site name.
 */
export const WebAppSitesControllerCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WebAppSitesControllerCreateInput,
    outputSchema: WebAppSitesControllerCreateOutput,
  }),
);
// Input Schema
export const WebAppSitesControllerDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    webAppSiteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/masterSites/{siteName}/webAppSites/{webAppSiteName}",
    }),
  );
export type WebAppSitesControllerDeleteInput =
  typeof WebAppSitesControllerDeleteInput.Type;

// Output Schema
export const WebAppSitesControllerDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type WebAppSitesControllerDeleteOutput =
  typeof WebAppSitesControllerDeleteOutput.Type;

// The operation
/**
 * Deletes the WebApp site.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param webAppSiteName - Web app site name.
 */
export const WebAppSitesControllerDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WebAppSitesControllerDeleteInput,
    outputSchema: WebAppSitesControllerDeleteOutput,
  }),
);
// Input Schema
export const WebAppSitesControllerErrorSummaryInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    webAppSiteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/masterSites/{siteName}/webAppSites/{webAppSiteName}/errorSummary",
    }),
  );
export type WebAppSitesControllerErrorSummaryInput =
  typeof WebAppSitesControllerErrorSummaryInput.Type;

// Output Schema
export const WebAppSitesControllerErrorSummaryOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    applianceName: Schema.String,
    discoveryScopeErrorSummaries: Schema.Struct({
      affectedResourceType: Schema.String,
      affectedObjectsCount: Schema.Number,
      discoveryScope: Schema.Literals([
        "AppsAndRoles",
        "DependencyMap",
        "StaticData",
        "SQLServerConnectionInfo",
      ]),
    }),
    nextLink: Schema.optional(Schema.String),
  });
export type WebAppSitesControllerErrorSummaryOutput =
  typeof WebAppSitesControllerErrorSummaryOutput.Type;

// The operation
/**
 * MMethod to get error summary from web app  site.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param webAppSiteName - Web app site name.
 */
export const WebAppSitesControllerErrorSummary =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WebAppSitesControllerErrorSummaryInput,
    outputSchema: WebAppSitesControllerErrorSummaryOutput,
  }));
// Input Schema
export const WebAppSitesControllerExportInventoryInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    webAppSiteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/masterSites/{siteName}/webAppSites/{webAppSiteName}/exportInventory",
    }),
  );
export type WebAppSitesControllerExportInventoryInput =
  typeof WebAppSitesControllerExportInventoryInput.Type;

// Output Schema
export const WebAppSitesControllerExportInventoryOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown;
export type WebAppSitesControllerExportInventoryOutput =
  typeof WebAppSitesControllerExportInventoryOutput.Type;

// The operation
/**
 * Method to generate report containing web app inventory.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param webAppSiteName - Web app site name.
 */
export const WebAppSitesControllerExportInventory =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WebAppSitesControllerExportInventoryInput,
    outputSchema: WebAppSitesControllerExportInventoryOutput,
  }));
// Input Schema
export const WebAppSitesControllerGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    webAppSiteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/masterSites/{siteName}/webAppSites/{webAppSiteName}",
    }),
  );
export type WebAppSitesControllerGetInput =
  typeof WebAppSitesControllerGetInput.Type;

// Output Schema
export const WebAppSitesControllerGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WebAppSitesControllerGetOutput =
  typeof WebAppSitesControllerGetOutput.Type;

// The operation
/**
 * Method to get a site.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param webAppSiteName - Web app site name.
 */
export const WebAppSitesControllerGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WebAppSitesControllerGetInput,
    outputSchema: WebAppSitesControllerGetOutput,
  }),
);
// Input Schema
export const WebAppSitesControllerListByMasterSiteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/masterSites/{siteName}/webAppSites",
    }),
  );
export type WebAppSitesControllerListByMasterSiteInput =
  typeof WebAppSitesControllerListByMasterSiteInput.Type;

// Output Schema
export const WebAppSitesControllerListByMasterSiteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type WebAppSitesControllerListByMasterSiteOutput =
  typeof WebAppSitesControllerListByMasterSiteOutput.Type;

// The operation
/**
 * Method to get all sites.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 */
export const WebAppSitesControllerListByMasterSite =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WebAppSitesControllerListByMasterSiteInput,
    outputSchema: WebAppSitesControllerListByMasterSiteOutput,
  }));
// Input Schema
export const WebAppSitesControllerRefreshInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    webAppSiteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/masterSites/{siteName}/webAppSites/{webAppSiteName}/refresh",
    }),
  );
export type WebAppSitesControllerRefreshInput =
  typeof WebAppSitesControllerRefreshInput.Type;

// Output Schema
export const WebAppSitesControllerRefreshOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown;
export type WebAppSitesControllerRefreshOutput =
  typeof WebAppSitesControllerRefreshOutput.Type;

// The operation
/**
 * Method to refresh a site.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param webAppSiteName - Web app site name.
 */
export const WebAppSitesControllerRefresh =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WebAppSitesControllerRefreshInput,
    outputSchema: WebAppSitesControllerRefreshOutput,
  }));
// Input Schema
export const WebAppSitesControllerSummaryInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    webAppSiteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/masterSites/{siteName}/webAppSites/{webAppSiteName}/summary",
    }),
  );
export type WebAppSitesControllerSummaryInput =
  typeof WebAppSitesControllerSummaryInput.Type;

// Output Schema
export const WebAppSitesControllerSummaryOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    webServerCount: Schema.optional(Schema.Number),
    webApplicationCount: Schema.optional(Schema.Number),
    runAsAccountCount: Schema.optional(Schema.Number),
  });
export type WebAppSitesControllerSummaryOutput =
  typeof WebAppSitesControllerSummaryOutput.Type;

// The operation
/**
 * Method to get site usage/summary.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param webAppSiteName - Web app site name.
 */
export const WebAppSitesControllerSummary =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WebAppSitesControllerSummaryInput,
    outputSchema: WebAppSitesControllerSummaryOutput,
  }));
// Input Schema
export const WebAppSitesControllerUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    webAppSiteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/masterSites/{siteName}/webAppSites/{webAppSiteName}",
    }),
  );
export type WebAppSitesControllerUpdateInput =
  typeof WebAppSitesControllerUpdateInput.Type;

// Output Schema
export const WebAppSitesControllerUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WebAppSitesControllerUpdateOutput =
  typeof WebAppSitesControllerUpdateOutput.Type;

// The operation
/**
 * Method to update an existing site.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param siteName - Site name
 * @param webAppSiteName - Web app site name.
 */
export const WebAppSitesControllerUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WebAppSitesControllerUpdateInput,
    outputSchema: WebAppSitesControllerUpdateOutput,
  }),
);
// Input Schema
export const WebServersControllerGetWebServerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/migrateProjects/{migrateProjectName}/webServers/{webServerId}",
    }),
  );
export type WebServersControllerGetWebServerInput =
  typeof WebServersControllerGetWebServerInput.Type;

// Output Schema
export const WebServersControllerGetWebServerOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        discoveryData: Schema.optional(
          Schema.Array(
            Schema.Struct({
              id: Schema.optional(Schema.String),
              osName: Schema.optional(Schema.String),
              osVersion: Schema.optional(Schema.String),
              cpuCores: Schema.optional(Schema.Number),
              memoryInMb: Schema.optional(Schema.String),
              webServerType: Schema.optional(Schema.String),
              webServerVersion: Schema.optional(Schema.String),
              portList: Schema.optional(Schema.Array(Schema.Number)),
              lastUpdatedTime: Schema.optional(Schema.String),
              enqueueTime: Schema.optional(Schema.String),
              solutionName: Schema.optional(Schema.String),
              webServerId: Schema.optional(Schema.String),
              webServerName: Schema.optional(Schema.String),
              extendedInfo: Schema.optional(
                Schema.Record(Schema.String, Schema.String),
              ),
            }),
          ),
        ),
        summary: Schema.optional(
          Schema.Record(
            Schema.String,
            Schema.Struct({
              discoveredCount: Schema.optional(Schema.Number),
              assessedCount: Schema.optional(Schema.Number),
              readyForMigration: Schema.optional(Schema.Number),
              migratingCount: Schema.optional(Schema.Number),
              migratedCount: Schema.optional(Schema.Number),
            }),
          ),
        ),
        lastUpdatedTime: Schema.optional(Schema.String),
      }),
    ),
  });
export type WebServersControllerGetWebServerOutput =
  typeof WebServersControllerGetWebServerOutput.Type;

// The operation
/**
 * Gets a webserver in the migrate project.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const WebServersControllerGetWebServer =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WebServersControllerGetWebServerInput,
    outputSchema: WebServersControllerGetWebServerOutput,
  }));
// Input Schema
export const WebServersControllerListByWebAppSiteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    siteName: Schema.String.pipe(T.PathParam()),
    webAppSiteName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    filter: Schema.optional(Schema.String),
    top: Schema.optional(Schema.String),
    continuationToken: Schema.optional(Schema.String),
    totalRecordCount: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OffAzure/masterSites/{siteName}/webAppSites/{webAppSiteName}/webServers",
    }),
  );
export type WebServersControllerListByWebAppSiteInput =
  typeof WebServersControllerListByWebAppSiteInput.Type;

// Output Schema
export const WebServersControllerListByWebAppSiteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type WebServersControllerListByWebAppSiteOutput =
  typeof WebServersControllerListByWebAppSiteOutput.Type;

// The operation
/**
 * Method to get all web servers.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param filter - filter query
 * @param top - page size  query
 * @param continuationToken - Optional parameter for continuation token.
 * @param totalRecordCount - Total count of machines in the given site.
 * @param siteName - Site name
 * @param webAppSiteName - Web app site name.
 */
export const WebServersControllerListByWebAppSite =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WebServersControllerListByWebAppSiteInput,
    outputSchema: WebServersControllerListByWebAppSiteOutput,
  }));
// Input Schema
export const WebServersControllerListWebServersInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/migrateProjects/{migrateProjectName}/webServers",
    }),
  );
export type WebServersControllerListWebServersInput =
  typeof WebServersControllerListWebServersInput.Type;

// Output Schema
export const WebServersControllerListWebServersOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Struct({
              discoveryData: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    id: Schema.optional(Schema.String),
                    osName: Schema.optional(Schema.String),
                    osVersion: Schema.optional(Schema.String),
                    cpuCores: Schema.optional(Schema.Number),
                    memoryInMb: Schema.optional(Schema.String),
                    webServerType: Schema.optional(Schema.String),
                    webServerVersion: Schema.optional(Schema.String),
                    portList: Schema.optional(Schema.Array(Schema.Number)),
                    lastUpdatedTime: Schema.optional(Schema.String),
                    enqueueTime: Schema.optional(Schema.String),
                    solutionName: Schema.optional(Schema.String),
                    webServerId: Schema.optional(Schema.String),
                    webServerName: Schema.optional(Schema.String),
                    extendedInfo: Schema.optional(
                      Schema.Record(Schema.String, Schema.String),
                    ),
                  }),
                ),
              ),
              summary: Schema.optional(
                Schema.Record(
                  Schema.String,
                  Schema.Struct({
                    discoveredCount: Schema.optional(Schema.Number),
                    assessedCount: Schema.optional(Schema.Number),
                    readyForMigration: Schema.optional(Schema.Number),
                    migratingCount: Schema.optional(Schema.Number),
                    migratedCount: Schema.optional(Schema.Number),
                  }),
                ),
              ),
              lastUpdatedTime: Schema.optional(Schema.String),
            }),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type WebServersControllerListWebServersOutput =
  typeof WebServersControllerListWebServersOutput.Type;

// The operation
/**
 * Gets a list of WebServers in the migrate project.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const WebServersControllerListWebServers =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WebServersControllerListWebServersInput,
    outputSchema: WebServersControllerListWebServersOutput,
  }));
// Input Schema
export const WebSitesControllerGetWebSiteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/migrateProjects/{migrateProjectName}/webSites/{webSiteName}",
    }),
  );
export type WebSitesControllerGetWebSiteInput =
  typeof WebSitesControllerGetWebSiteInput.Type;

// Output Schema
export const WebSitesControllerGetWebSiteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        discoveryData: Schema.optional(
          Schema.Array(
            Schema.Struct({
              lastUpdatedTime: Schema.optional(Schema.String),
              id: Schema.optional(Schema.String),
              webServerId: Schema.optional(Schema.String),
              webServerType: Schema.optional(Schema.String),
              webSiteName: Schema.optional(Schema.String),
              enqueueTime: Schema.optional(Schema.String),
              solutionName: Schema.optional(Schema.String),
              port: Schema.optional(Schema.Number),
              extendedInfo: Schema.optional(
                Schema.Record(Schema.String, Schema.String),
              ),
            }),
          ),
        ),
        assessmentData: Schema.optional(
          Schema.Array(
            Schema.Struct({
              assessmentId: Schema.optional(Schema.String),
              id: Schema.optional(Schema.String),
              isReadyForMigration: Schema.optional(Schema.Boolean),
              assessmentTargetType: Schema.optional(Schema.String),
              migrationBlockersCount: Schema.optional(Schema.Number),
              successList: Schema.optional(Schema.Array(Schema.String)),
              warningList: Schema.optional(Schema.Array(Schema.String)),
              errorList: Schema.optional(Schema.Array(Schema.String)),
              framework: Schema.optional(Schema.String),
              frameworkVersion: Schema.optional(Schema.String),
              lastUpdatedTime: Schema.optional(Schema.String),
              webServerId: Schema.optional(Schema.String),
              webServerType: Schema.optional(Schema.String),
              webSiteName: Schema.optional(Schema.String),
              enqueueTime: Schema.optional(Schema.String),
              solutionName: Schema.optional(Schema.String),
              port: Schema.optional(Schema.Number),
              extendedInfo: Schema.optional(
                Schema.Record(Schema.String, Schema.String),
              ),
            }),
          ),
        ),
        migrationData: Schema.optional(
          Schema.Array(
            Schema.Struct({
              id: Schema.optional(Schema.String),
              migrationPhase: Schema.optional(Schema.String),
              progressPercentage: Schema.optional(Schema.Number),
              targetAppServiceArmId: Schema.optional(Schema.String),
              lastUpdatedTime: Schema.optional(Schema.String),
              webServerId: Schema.optional(Schema.String),
              webServerType: Schema.optional(Schema.String),
              webSiteName: Schema.optional(Schema.String),
              enqueueTime: Schema.optional(Schema.String),
              solutionName: Schema.optional(Schema.String),
              port: Schema.optional(Schema.Number),
              extendedInfo: Schema.optional(
                Schema.Record(Schema.String, Schema.String),
              ),
            }),
          ),
        ),
        lastUpdatedTime: Schema.optional(Schema.String),
      }),
    ),
  });
export type WebSitesControllerGetWebSiteOutput =
  typeof WebSitesControllerGetWebSiteOutput.Type;

// The operation
/**
 * Gets a website in the migrate project.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const WebSitesControllerGetWebSite =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WebSitesControllerGetWebSiteInput,
    outputSchema: WebSitesControllerGetWebSiteOutput,
  }));
// Input Schema
export const WebSitesControllerListWebSitesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/migrateProjects/{migrateProjectName}/webSites",
    }),
  );
export type WebSitesControllerListWebSitesInput =
  typeof WebSitesControllerListWebSitesInput.Type;

// Output Schema
export const WebSitesControllerListWebSitesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Struct({
              discoveryData: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    lastUpdatedTime: Schema.optional(Schema.String),
                    id: Schema.optional(Schema.String),
                    webServerId: Schema.optional(Schema.String),
                    webServerType: Schema.optional(Schema.String),
                    webSiteName: Schema.optional(Schema.String),
                    enqueueTime: Schema.optional(Schema.String),
                    solutionName: Schema.optional(Schema.String),
                    port: Schema.optional(Schema.Number),
                    extendedInfo: Schema.optional(
                      Schema.Record(Schema.String, Schema.String),
                    ),
                  }),
                ),
              ),
              assessmentData: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    assessmentId: Schema.optional(Schema.String),
                    id: Schema.optional(Schema.String),
                    isReadyForMigration: Schema.optional(Schema.Boolean),
                    assessmentTargetType: Schema.optional(Schema.String),
                    migrationBlockersCount: Schema.optional(Schema.Number),
                    successList: Schema.optional(Schema.Array(Schema.String)),
                    warningList: Schema.optional(Schema.Array(Schema.String)),
                    errorList: Schema.optional(Schema.Array(Schema.String)),
                    framework: Schema.optional(Schema.String),
                    frameworkVersion: Schema.optional(Schema.String),
                    lastUpdatedTime: Schema.optional(Schema.String),
                    webServerId: Schema.optional(Schema.String),
                    webServerType: Schema.optional(Schema.String),
                    webSiteName: Schema.optional(Schema.String),
                    enqueueTime: Schema.optional(Schema.String),
                    solutionName: Schema.optional(Schema.String),
                    port: Schema.optional(Schema.Number),
                    extendedInfo: Schema.optional(
                      Schema.Record(Schema.String, Schema.String),
                    ),
                  }),
                ),
              ),
              migrationData: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    id: Schema.optional(Schema.String),
                    migrationPhase: Schema.optional(Schema.String),
                    progressPercentage: Schema.optional(Schema.Number),
                    targetAppServiceArmId: Schema.optional(Schema.String),
                    lastUpdatedTime: Schema.optional(Schema.String),
                    webServerId: Schema.optional(Schema.String),
                    webServerType: Schema.optional(Schema.String),
                    webSiteName: Schema.optional(Schema.String),
                    enqueueTime: Schema.optional(Schema.String),
                    solutionName: Schema.optional(Schema.String),
                    port: Schema.optional(Schema.Number),
                    extendedInfo: Schema.optional(
                      Schema.Record(Schema.String, Schema.String),
                    ),
                  }),
                ),
              ),
              lastUpdatedTime: Schema.optional(Schema.String),
            }),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type WebSitesControllerListWebSitesOutput =
  typeof WebSitesControllerListWebSitesOutput.Type;

// The operation
/**
 * Gets a list of websites in the migrate project.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const WebSitesControllerListWebSites =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WebSitesControllerListWebSitesInput,
    outputSchema: WebSitesControllerListWebSitesOutput,
  }));
