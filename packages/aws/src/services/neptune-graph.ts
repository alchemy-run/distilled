import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { restJson1Protocol } from "../protocols/rest-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "Neptune Graph",
  target: "AmazonNeptuneGraph",
  version: "2023-11-29",
  sigv4: "neptune-graph",
  protocol: restJson1Protocol,
  rules: (p, _) => {
    const {
      Region,
      UseFIPS = false,
      UseDualStack = false,
      Endpoint,
      ApiType,
    } = p;
    const e = (u: unknown, p = {}, h = {}): T.EndpointResolverResult => ({
      type: "endpoint" as const,
      endpoint: { url: u as string, properties: p, headers: h },
    });
    const err = (m: unknown): T.EndpointResolverResult => ({
      type: "error" as const,
      message: m as string,
    });
    if (Endpoint != null) {
      if (UseFIPS === true) {
        return err(
          "Invalid Configuration: FIPS and custom endpoint are not supported",
        );
      }
      if (UseDualStack === true) {
        return err(
          "Invalid Configuration: Dualstack and custom endpoint are not supported",
        );
      }
      return e(Endpoint);
    }
    if (Region != null) {
      {
        const PartitionResult = _.partition(Region);
        if (PartitionResult != null && PartitionResult !== false) {
          if (UseFIPS === true && UseDualStack === true) {
            if (
              true === _.getAttr(PartitionResult, "supportsFIPS") &&
              true === _.getAttr(PartitionResult, "supportsDualStack")
            ) {
              if (ApiType === "ControlPlane") {
                return e(
                  `https://neptune-graph-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                );
              }
              if (ApiType === "DataPlane") {
                return err(
                  "Invalid Configuration: fips endpoint is not supported for this API",
                );
              }
              return err("Invalid Configuration: Unknown ApiType");
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (true === _.getAttr(PartitionResult, "supportsFIPS")) {
              if (ApiType === "ControlPlane") {
                return e(
                  `https://neptune-graph-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
                );
              }
              if (ApiType === "DataPlane") {
                return err(
                  "Invalid Configuration: fips endpoint is not supported for this API",
                );
              }
              return err("Invalid Configuration: Unknown ApiType");
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              if (ApiType === "ControlPlane") {
                return e(
                  `https://neptune-graph.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                );
              }
              if (ApiType === "DataPlane") {
                return e(`https://neptune-graph.${Region}.on.aws`);
              }
              return err("Invalid Configuration: Unknown ApiType");
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          if (ApiType === "ControlPlane") {
            return e(
              `https://neptune-graph.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          if (ApiType === "DataPlane") {
            return e(
              `https://${Region}.neptune-graph.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("Invalid Configuration: Unknown ApiType");
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError("AccessDeniedException", ["AuthError"], {
    status: 403,
  })<{ readonly message: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message: string; readonly reason?: ConflictExceptionReason }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError", "RetryableError"],
    { status: 500 },
  )<{ readonly message: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{
    readonly message: string;
    readonly resourceId?: string;
    readonly resourceType?: string;
    readonly serviceCode?: string;
    readonly quotaCode?: string;
  }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError", "RetryableError"],
    { status: 429 },
  )<{ readonly message: string }> {}
export class UnprocessableException
  extends /*@__PURE__*/ TE.TaggedError(
    "UnprocessableException",
    ["BadRequestError"],
    { status: 422 },
  )<{
    readonly message: string;
    readonly reason: UnprocessableExceptionReason;
  }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly message: string;
    readonly reason?: ValidationExceptionReason;
  }> {}
export type ExportTaskId = string;
export interface CancelExportTaskInput {
  taskIdentifier: string;
}
export type GraphId = string;
export type RoleArn = string;
export type ExportTaskStatus =
  | "INITIALIZING"
  | "EXPORTING"
  | "SUCCEEDED"
  | "FAILED"
  | "CANCELLING"
  | "CANCELLED"
  | "DELETED"
  | (string & {});
export type ExportFormat = "PARQUET" | "CSV" | (string & {});
export type KmsKeyArn = string;
export type ParquetType = "COLUMNAR" | (string & {});
export interface CancelExportTaskOutput {
  graphId: string;
  roleArn: string;
  taskId: string;
  status: ExportTaskStatus;
  format: ExportFormat;
  destination: string;
  kmsKeyIdentifier: string;
  parquetType?: ParquetType;
  statusReason?: string;
}
export type TaskId = string;
export interface CancelImportTaskInput {
  taskIdentifier: string;
}
export type Format =
  | "CSV"
  | "OPEN_CYPHER"
  | "PARQUET"
  | "NTRIPLES"
  | (string & {});
export type ImportTaskStatus =
  | "INITIALIZING"
  | "EXPORTING"
  | "ANALYZING_DATA"
  | "IMPORTING"
  | "REPROVISIONING"
  | "ROLLING_BACK"
  | "SUCCEEDED"
  | "FAILED"
  | "CANCELLING"
  | "CANCELLED"
  | "DELETED"
  | (string & {});
export interface CancelImportTaskOutput {
  graphId?: string;
  taskId: string;
  source: string;
  format?: Format;
  parquetType?: ParquetType;
  roleArn: string;
  status: ImportTaskStatus;
}
export type GraphIdentifier = string;
export interface CancelQueryInput {
  graphIdentifier: string;
  queryId: string;
}
export interface CancelQueryResponse {}
export type GraphName = string;
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export type VectorSearchDimension = number;
export interface VectorSearchConfiguration {
  dimension: number;
}
export type ReplicaCount = number;
export type ProvisionedMemory = number;
export interface CreateGraphInput {
  graphName: string;
  tags?: { [key: string]: string | undefined };
  publicConnectivity?: boolean;
  kmsKeyIdentifier?: string;
  vectorSearchConfiguration?: VectorSearchConfiguration;
  replicaCount?: number;
  deletionProtection?: boolean;
  provisionedMemory: number;
}
export type GraphStatus =
  | "CREATING"
  | "AVAILABLE"
  | "DELETING"
  | "RESETTING"
  | "UPDATING"
  | "SNAPSHOTTING"
  | "FAILED"
  | "IMPORTING"
  | "STARTING"
  | "STOPPING"
  | "STOPPED"
  | (string & {});
export type SnapshotId = string;
export interface CreateGraphOutput {
  id: string;
  name: string;
  arn: string;
  status?: GraphStatus;
  statusReason?: string;
  createTime?: Date;
  provisionedMemory?: number;
  endpoint?: string;
  publicConnectivity?: boolean;
  vectorSearchConfiguration?: VectorSearchConfiguration;
  replicaCount?: number;
  kmsKeyIdentifier?: string;
  sourceSnapshotId?: string;
  deletionProtection?: boolean;
  buildNumber?: string;
}
export type SnapshotName = string;
export interface CreateGraphSnapshotInput {
  graphIdentifier: string;
  snapshotName: string;
  tags?: { [key: string]: string | undefined };
}
export type SnapshotStatus =
  | "CREATING"
  | "AVAILABLE"
  | "DELETING"
  | "FAILED"
  | (string & {});
export interface CreateGraphSnapshotOutput {
  id: string;
  name: string;
  arn: string;
  sourceGraphId?: string;
  snapshotCreateTime?: Date;
  status?: SnapshotStatus;
  kmsKeyIdentifier?: string;
}
export interface NeptuneImportOptions {
  s3ExportPath: string;
  s3ExportKmsKeyId: string;
  preserveDefaultVertexLabels?: boolean;
  preserveEdgeIds?: boolean;
}
export type ImportOptions = { neptune: NeptuneImportOptions };
export type BlankNodeHandling = "convertToIri" | (string & {});
export interface CreateGraphUsingImportTaskInput {
  graphName: string;
  tags?: { [key: string]: string | undefined };
  publicConnectivity?: boolean;
  kmsKeyIdentifier?: string;
  vectorSearchConfiguration?: VectorSearchConfiguration;
  replicaCount?: number;
  deletionProtection?: boolean;
  importOptions?: ImportOptions;
  maxProvisionedMemory?: number;
  minProvisionedMemory?: number;
  failOnError?: boolean;
  source: string;
  format?: Format;
  parquetType?: ParquetType;
  blankNodeHandling?: BlankNodeHandling;
  roleArn: string;
}
export interface CreateGraphUsingImportTaskOutput {
  graphId?: string;
  taskId: string;
  source: string;
  format?: Format;
  parquetType?: ParquetType;
  roleArn: string;
  status: ImportTaskStatus;
  importOptions?: ImportOptions;
}
export type VpcId = string;
export type SubnetId = string;
export type SubnetIds = string[];
export type SecurityGroupId = string;
export type SecurityGroupIds = string[];
export interface CreatePrivateGraphEndpointInput {
  graphIdentifier: string;
  vpcId?: string;
  subnetIds?: string[];
  vpcSecurityGroupIds?: string[];
}
export type PrivateGraphEndpointStatus =
  | "CREATING"
  | "AVAILABLE"
  | "DELETING"
  | "FAILED"
  | (string & {});
export type VpcEndpointId = string;
export interface CreatePrivateGraphEndpointOutput {
  vpcId: string;
  subnetIds: string[];
  status: PrivateGraphEndpointStatus;
  vpcEndpointId?: string;
}
export interface DeleteGraphInput {
  graphIdentifier: string;
  skipSnapshot: boolean;
}
export interface DeleteGraphOutput {
  id: string;
  name: string;
  arn: string;
  status?: GraphStatus;
  statusReason?: string;
  createTime?: Date;
  provisionedMemory?: number;
  endpoint?: string;
  publicConnectivity?: boolean;
  vectorSearchConfiguration?: VectorSearchConfiguration;
  replicaCount?: number;
  kmsKeyIdentifier?: string;
  sourceSnapshotId?: string;
  deletionProtection?: boolean;
  buildNumber?: string;
}
export type SnapshotIdentifier = string;
export interface DeleteGraphSnapshotInput {
  snapshotIdentifier: string;
}
export interface DeleteGraphSnapshotOutput {
  id: string;
  name: string;
  arn: string;
  sourceGraphId?: string;
  snapshotCreateTime?: Date;
  status?: SnapshotStatus;
  kmsKeyIdentifier?: string;
}
export interface DeletePrivateGraphEndpointInput {
  graphIdentifier: string;
  vpcId: string;
}
export interface DeletePrivateGraphEndpointOutput {
  vpcId: string;
  subnetIds: string[];
  status: PrivateGraphEndpointStatus;
  vpcEndpointId?: string;
}
export type QueryLanguage = "OPEN_CYPHER" | (string & {});
export type DocumentValuedMap = { [key: string]: any | undefined };
export type PlanCacheType = "ENABLED" | "DISABLED" | "AUTO" | (string & {});
export type ExplainMode = "STATIC" | "DETAILS" | (string & {});
export interface ExecuteQueryInput {
  graphIdentifier: string;
  queryString: string;
  language: QueryLanguage;
  parameters?: { [key: string]: any | undefined };
  planCache?: PlanCacheType;
  explainMode?: ExplainMode;
  queryTimeoutMilliseconds?: number;
}
export interface ExecuteQueryOutput {
  payload: T.StreamingOutputBody;
}
export interface GetExportTaskInput {
  taskIdentifier: string;
}
export interface ExportTaskDetails {
  startTime: Date;
  timeElapsedSeconds: number;
  progressPercentage: number;
  numVerticesWritten?: number;
  numEdgesWritten?: number;
}
export type ExportFilterLabel = string;
export type ExportFilterOutputPropertyName = string;
export type ExportFilterOutputDataType = string;
export type ExportFilterSourcePropertyName = string;
export type MultiValueHandlingType = "TO_LIST" | "PICK_FIRST" | (string & {});
export interface ExportFilterPropertyAttributes {
  outputType?: string;
  sourcePropertyName?: string;
  multiValueHandling?: MultiValueHandlingType;
}
export type ExportFilterPropertyMap = {
  [key: string]: ExportFilterPropertyAttributes | undefined;
};
export interface ExportFilterElement {
  properties?: { [key: string]: ExportFilterPropertyAttributes | undefined };
}
export type ExportFilterPerLabelMap = {
  [key: string]: ExportFilterElement | undefined;
};
export interface ExportFilter {
  vertexFilter?: { [key: string]: ExportFilterElement | undefined };
  edgeFilter?: { [key: string]: ExportFilterElement | undefined };
}
export interface GetExportTaskOutput {
  graphId: string;
  roleArn: string;
  taskId: string;
  status: ExportTaskStatus;
  format: ExportFormat;
  destination: string;
  kmsKeyIdentifier: string;
  parquetType?: ParquetType;
  statusReason?: string;
  exportTaskDetails?: ExportTaskDetails;
  exportFilter?: ExportFilter;
}
export interface GetGraphInput {
  graphIdentifier: string;
}
export interface GetGraphOutput {
  id: string;
  name: string;
  arn: string;
  status?: GraphStatus;
  statusReason?: string;
  createTime?: Date;
  provisionedMemory?: number;
  endpoint?: string;
  publicConnectivity?: boolean;
  vectorSearchConfiguration?: VectorSearchConfiguration;
  replicaCount?: number;
  kmsKeyIdentifier?: string;
  sourceSnapshotId?: string;
  deletionProtection?: boolean;
  buildNumber?: string;
}
export interface GetGraphSnapshotInput {
  snapshotIdentifier: string;
}
export interface GetGraphSnapshotOutput {
  id: string;
  name: string;
  arn: string;
  sourceGraphId?: string;
  snapshotCreateTime?: Date;
  status?: SnapshotStatus;
  kmsKeyIdentifier?: string;
}
export type GraphSummaryMode = "BASIC" | "DETAILED" | (string & {});
export interface GetGraphSummaryInput {
  graphIdentifier: string;
  mode?: GraphSummaryMode;
}
export type NodeLabels = string[];
export type EdgeLabels = string[];
export type LongValuedMap = { [key: string]: number | undefined };
export type LongValuedMapList = { [key: string]: number | undefined }[];
export type NodeProperties = string[];
export type OutgoingEdgeLabels = string[];
export interface NodeStructure {
  count?: number;
  nodeProperties?: string[];
  distinctOutgoingEdgeLabels?: string[];
}
export type NodeStructures = NodeStructure[];
export type EdgeProperties = string[];
export interface EdgeStructure {
  count?: number;
  edgeProperties?: string[];
}
export type EdgeStructures = EdgeStructure[];
export interface GraphDataSummary {
  numNodes?: number;
  numEdges?: number;
  numNodeLabels?: number;
  numEdgeLabels?: number;
  nodeLabels?: string[];
  edgeLabels?: string[];
  numNodeProperties?: number;
  numEdgeProperties?: number;
  nodeProperties?: { [key: string]: number | undefined }[];
  edgeProperties?: { [key: string]: number | undefined }[];
  totalNodePropertyValues?: number;
  totalEdgePropertyValues?: number;
  nodeStructures?: NodeStructure[];
  edgeStructures?: EdgeStructure[];
}
export interface GetGraphSummaryOutput {
  version?: string;
  lastStatisticsComputationTime?: Date;
  graphSummary?: GraphDataSummary;
}
export interface GetImportTaskInput {
  taskIdentifier: string;
}
export interface ImportTaskDetails {
  status: string;
  startTime: Date;
  timeElapsedSeconds: number;
  progressPercentage: number;
  errorCount: number;
  errorDetails?: string;
  statementCount: number;
  dictionaryEntryCount: number;
}
export interface GetImportTaskOutput {
  graphId?: string;
  taskId: string;
  source: string;
  format?: Format;
  parquetType?: ParquetType;
  roleArn: string;
  status: ImportTaskStatus;
  importOptions?: ImportOptions;
  importTaskDetails?: ImportTaskDetails;
  attemptNumber?: number;
  statusReason?: string;
}
export interface GetPrivateGraphEndpointInput {
  graphIdentifier: string;
  vpcId: string;
}
export interface GetPrivateGraphEndpointOutput {
  vpcId: string;
  subnetIds: string[];
  status: PrivateGraphEndpointStatus;
  vpcEndpointId?: string;
}
export interface GetQueryInput {
  graphIdentifier: string;
  queryId: string;
}
export type QueryState = "RUNNING" | "WAITING" | "CANCELLING" | (string & {});
export interface GetQueryOutput {
  id?: string;
  queryString?: string;
  waited?: number;
  elapsed?: number;
  state?: QueryState;
}
export type PaginationToken = string;
export type MaxResults = number;
export interface ListExportTasksInput {
  graphIdentifier?: string;
  nextToken?: string;
  maxResults?: number;
}
export interface ExportTaskSummary {
  graphId: string;
  roleArn: string;
  taskId: string;
  status: ExportTaskStatus;
  format: ExportFormat;
  destination: string;
  kmsKeyIdentifier: string;
  parquetType?: ParquetType;
  statusReason?: string;
}
export type ExportTaskSummaryList = ExportTaskSummary[];
export interface ListExportTasksOutput {
  tasks: ExportTaskSummary[];
  nextToken?: string;
}
export interface ListGraphsInput {
  nextToken?: string;
  maxResults?: number;
}
export interface GraphSummary {
  id: string;
  name: string;
  arn: string;
  status?: GraphStatus;
  provisionedMemory?: number;
  publicConnectivity?: boolean;
  endpoint?: string;
  replicaCount?: number;
  kmsKeyIdentifier?: string;
  deletionProtection?: boolean;
}
export type GraphSummaryList = GraphSummary[];
export interface ListGraphsOutput {
  graphs: GraphSummary[];
  nextToken?: string;
}
export interface ListGraphSnapshotsInput {
  graphIdentifier?: string;
  nextToken?: string;
  maxResults?: number;
}
export interface GraphSnapshotSummary {
  id: string;
  name: string;
  arn: string;
  sourceGraphId?: string;
  snapshotCreateTime?: Date;
  status?: SnapshotStatus;
  kmsKeyIdentifier?: string;
}
export type GraphSnapshotSummaryList = GraphSnapshotSummary[];
export interface ListGraphSnapshotsOutput {
  graphSnapshots: GraphSnapshotSummary[];
  nextToken?: string;
}
export interface ListImportTasksInput {
  nextToken?: string;
  maxResults?: number;
}
export interface ImportTaskSummary {
  graphId?: string;
  taskId: string;
  source: string;
  format?: Format;
  parquetType?: ParquetType;
  roleArn: string;
  status: ImportTaskStatus;
}
export type ImportTaskSummaryList = ImportTaskSummary[];
export interface ListImportTasksOutput {
  tasks: ImportTaskSummary[];
  nextToken?: string;
}
export interface ListPrivateGraphEndpointsInput {
  graphIdentifier: string;
  nextToken?: string;
  maxResults?: number;
}
export interface PrivateGraphEndpointSummary {
  vpcId: string;
  subnetIds: string[];
  status: PrivateGraphEndpointStatus;
  vpcEndpointId?: string;
}
export type PrivateGraphEndpointSummaryList = PrivateGraphEndpointSummary[];
export interface ListPrivateGraphEndpointsOutput {
  privateGraphEndpoints: PrivateGraphEndpointSummary[];
  nextToken?: string;
}
export type QueryStateInput =
  | "ALL"
  | "RUNNING"
  | "WAITING"
  | "CANCELLING"
  | (string & {});
export interface ListQueriesInput {
  graphIdentifier: string;
  maxResults: number;
  state?: QueryStateInput;
}
export interface QuerySummary {
  id?: string;
  queryString?: string;
  waited?: number;
  elapsed?: number;
  state?: QueryState;
}
export type QuerySummaryList = QuerySummary[];
export interface ListQueriesOutput {
  queries: QuerySummary[];
}
export type Arn = string;
export interface ListTagsForResourceInput {
  resourceArn: string;
}
export interface ListTagsForResourceOutput {
  tags?: { [key: string]: string | undefined };
}
export interface ResetGraphInput {
  graphIdentifier: string;
  skipSnapshot: boolean;
}
export interface ResetGraphOutput {
  id: string;
  name: string;
  arn: string;
  status?: GraphStatus;
  statusReason?: string;
  createTime?: Date;
  provisionedMemory?: number;
  endpoint?: string;
  publicConnectivity?: boolean;
  vectorSearchConfiguration?: VectorSearchConfiguration;
  replicaCount?: number;
  kmsKeyIdentifier?: string;
  sourceSnapshotId?: string;
  deletionProtection?: boolean;
  buildNumber?: string;
}
export interface RestoreGraphFromSnapshotInput {
  snapshotIdentifier: string;
  graphName: string;
  provisionedMemory?: number;
  deletionProtection?: boolean;
  tags?: { [key: string]: string | undefined };
  replicaCount?: number;
  publicConnectivity?: boolean;
}
export interface RestoreGraphFromSnapshotOutput {
  id: string;
  name: string;
  arn: string;
  status?: GraphStatus;
  statusReason?: string;
  createTime?: Date;
  provisionedMemory?: number;
  endpoint?: string;
  publicConnectivity?: boolean;
  vectorSearchConfiguration?: VectorSearchConfiguration;
  replicaCount?: number;
  kmsKeyIdentifier?: string;
  sourceSnapshotId?: string;
  deletionProtection?: boolean;
  buildNumber?: string;
}
export interface StartExportTaskInput {
  graphIdentifier: string;
  roleArn: string;
  format: ExportFormat;
  destination: string;
  kmsKeyIdentifier: string;
  parquetType?: ParquetType;
  exportFilter?: ExportFilter;
  tags?: { [key: string]: string | undefined };
}
export interface StartExportTaskOutput {
  graphId: string;
  roleArn: string;
  taskId: string;
  status: ExportTaskStatus;
  format: ExportFormat;
  destination: string;
  kmsKeyIdentifier: string;
  parquetType?: ParquetType;
  statusReason?: string;
  exportFilter?: ExportFilter;
}
export interface StartGraphInput {
  graphIdentifier: string;
}
export interface StartGraphOutput {
  id: string;
  name: string;
  arn: string;
  status?: GraphStatus;
  statusReason?: string;
  createTime?: Date;
  provisionedMemory?: number;
  endpoint?: string;
  publicConnectivity?: boolean;
  vectorSearchConfiguration?: VectorSearchConfiguration;
  replicaCount?: number;
  kmsKeyIdentifier?: string;
  sourceSnapshotId?: string;
  deletionProtection?: boolean;
  buildNumber?: string;
}
export interface StartImportTaskInput {
  importOptions?: ImportOptions;
  failOnError?: boolean;
  source: string;
  format?: Format;
  parquetType?: ParquetType;
  blankNodeHandling?: BlankNodeHandling;
  graphIdentifier: string;
  roleArn: string;
}
export interface StartImportTaskOutput {
  graphId?: string;
  taskId: string;
  source: string;
  format?: Format;
  parquetType?: ParquetType;
  roleArn: string;
  status: ImportTaskStatus;
  importOptions?: ImportOptions;
}
export interface StopGraphInput {
  graphIdentifier: string;
}
export interface StopGraphOutput {
  id: string;
  name: string;
  arn: string;
  status?: GraphStatus;
  statusReason?: string;
  createTime?: Date;
  provisionedMemory?: number;
  endpoint?: string;
  publicConnectivity?: boolean;
  vectorSearchConfiguration?: VectorSearchConfiguration;
  replicaCount?: number;
  kmsKeyIdentifier?: string;
  sourceSnapshotId?: string;
  deletionProtection?: boolean;
  buildNumber?: string;
}
export interface TagResourceInput {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export interface TagResourceOutput {}
export type TagKeyList = string[];
export interface UntagResourceInput {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceOutput {}
export interface UpdateGraphInput {
  graphIdentifier: string;
  publicConnectivity?: boolean;
  provisionedMemory?: number;
  deletionProtection?: boolean;
}
export interface UpdateGraphOutput {
  id: string;
  name: string;
  arn: string;
  status?: GraphStatus;
  statusReason?: string;
  createTime?: Date;
  provisionedMemory?: number;
  endpoint?: string;
  publicConnectivity?: boolean;
  vectorSearchConfiguration?: VectorSearchConfiguration;
  replicaCount?: number;
  kmsKeyIdentifier?: string;
  sourceSnapshotId?: string;
  deletionProtection?: boolean;
  buildNumber?: string;
}
export type ConflictExceptionReason = "CONCURRENT_MODIFICATION" | (string & {});
export type ValidationExceptionReason =
  | "CONSTRAINT_VIOLATION"
  | "ILLEGAL_ARGUMENT"
  | "MALFORMED_QUERY"
  | "QUERY_CANCELLED"
  | "QUERY_TOO_LARGE"
  | "UNSUPPORTED_OPERATION"
  | "BAD_REQUEST"
  | (string & {});
export type UnprocessableExceptionReason =
  | "QUERY_TIMEOUT"
  | "INTERNAL_LIMIT_EXCEEDED"
  | "MEMORY_LIMIT_EXCEEDED"
  | "STORAGE_LIMIT_EXCEEDED"
  | "PARTITION_FULL"
  | (string & {});
export type CancelExportTaskError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Cancel the specified export task.
 */
export const cancelExportTask: API.OperationMethod<
  CancelExportTaskInput,
  CancelExportTaskOutput,
  CancelExportTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /exporttasks/{taskIdentifier}",
    input: { taskIdentifier: 0 },
    staticContext: { ApiType: { value: "ControlPlane" } },
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelExportTask",
})) as any;

export type CancelImportTaskError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified import task.
 */
export const cancelImportTask: API.OperationMethod<
  CancelImportTaskInput,
  CancelImportTaskOutput,
  CancelImportTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /importtasks/{taskIdentifier}",
    input: { taskIdentifier: 0 },
    staticContext: { ApiType: { value: "ControlPlane" } },
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelImportTask",
})) as any;

export type CancelQueryError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Cancels a specified query.
 */
export const cancelQuery: API.OperationMethod<
  CancelQueryInput,
  CancelQueryResponse,
  CancelQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /queries/{queryId}",
    input: { graphIdentifier: D.m({ header: "graphIdentifier" }), queryId: 0 },
    staticContext: { ApiType: { value: "DataPlane" } },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelQuery",
  endpointHostPrefix: "{graphIdentifier}.",
})) as any;

export type CreateGraphError =
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new Neptune Analytics graph.
 */
export const createGraph: API.OperationMethod<
  CreateGraphInput,
  CreateGraphOutput,
  CreateGraphError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /graphs",
    input: {
      graphName: 0,
      tags: 0,
      publicConnectivity: 0,
      kmsKeyIdentifier: 0,
      vectorSearchConfiguration: i_VectorSearchConfiguration,
      replicaCount: 0,
      deletionProtection: 0,
      provisionedMemory: 0,
    },
    output: { createTime: D.ts },
    staticContext: { ApiType: { value: "ControlPlane" } },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGraph",
})) as any;

export type CreateGraphSnapshotError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a snapshot of the specific graph.
 */
export const createGraphSnapshot: API.OperationMethod<
  CreateGraphSnapshotInput,
  CreateGraphSnapshotOutput,
  CreateGraphSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /snapshots",
    input: { graphIdentifier: 0, snapshotName: 0, tags: 0 },
    output: { snapshotCreateTime: D.ts },
    staticContext: { ApiType: { value: "ControlPlane" } },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGraphSnapshot",
})) as any;

export type CreateGraphUsingImportTaskError =
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new Neptune Analytics graph and imports data into it, either from Amazon Simple Storage Service (S3) or from a Neptune database or a Neptune database snapshot.
 *
 * The data can be loaded from files in S3 that in either the Gremlin CSV format or the openCypher load format.
 */
export const createGraphUsingImportTask: API.OperationMethod<
  CreateGraphUsingImportTaskInput,
  CreateGraphUsingImportTaskOutput,
  CreateGraphUsingImportTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /importtasks",
    input: {
      graphName: 0,
      tags: 0,
      publicConnectivity: 0,
      kmsKeyIdentifier: 0,
      vectorSearchConfiguration: i_VectorSearchConfiguration,
      replicaCount: 0,
      deletionProtection: 0,
      importOptions: i_ImportOptions,
      maxProvisionedMemory: 0,
      minProvisionedMemory: 0,
      failOnError: 0,
      source: 0,
      format: 0,
      parquetType: 0,
      blankNodeHandling: 0,
      roleArn: 0,
    },
    staticContext: { ApiType: { value: "ControlPlane" } },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGraphUsingImportTask",
})) as any;

export type CreatePrivateGraphEndpointError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create a private graph endpoint to allow private access to the graph from within a VPC. You can attach security groups to the private graph endpoint.
 *
 * VPC endpoint charges apply.
 */
export const createPrivateGraphEndpoint: API.OperationMethod<
  CreatePrivateGraphEndpointInput,
  CreatePrivateGraphEndpointOutput,
  CreatePrivateGraphEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /graphs/{graphIdentifier}/endpoints/",
    input: {
      graphIdentifier: 0,
      vpcId: 0,
      subnetIds: 0,
      vpcSecurityGroupIds: 0,
    },
    staticContext: { ApiType: { value: "ControlPlane" } },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePrivateGraphEndpoint",
})) as any;

export type DeleteGraphError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified graph. Graphs cannot be deleted if delete-protection is enabled.
 */
export const deleteGraph: API.OperationMethod<
  DeleteGraphInput,
  DeleteGraphOutput,
  DeleteGraphError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /graphs/{graphIdentifier}",
    input: { graphIdentifier: 0, skipSnapshot: D.m({ query: "skipSnapshot" }) },
    output: { createTime: D.ts },
    staticContext: { ApiType: { value: "ControlPlane" } },
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGraph",
})) as any;

export type DeleteGraphSnapshotError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified graph snapshot.
 */
export const deleteGraphSnapshot: API.OperationMethod<
  DeleteGraphSnapshotInput,
  DeleteGraphSnapshotOutput,
  DeleteGraphSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /snapshots/{snapshotIdentifier}",
    input: { snapshotIdentifier: 0 },
    output: { snapshotCreateTime: D.ts },
    staticContext: { ApiType: { value: "ControlPlane" } },
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGraphSnapshot",
})) as any;

export type DeletePrivateGraphEndpointError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a private graph endpoint.
 */
export const deletePrivateGraphEndpoint: API.OperationMethod<
  DeletePrivateGraphEndpointInput,
  DeletePrivateGraphEndpointOutput,
  DeletePrivateGraphEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /graphs/{graphIdentifier}/endpoints/{vpcId}",
    input: { graphIdentifier: 0, vpcId: 0 },
    staticContext: { ApiType: { value: "ControlPlane" } },
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePrivateGraphEndpoint",
})) as any;

export type ExecuteQueryError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | UnprocessableException
  | ValidationException
  | CommonErrors;
/**
 * Execute an openCypher query.
 *
 * When invoking this operation in a Neptune Analytics cluster, the IAM user or role making the request must have a policy attached that allows one of the following IAM actions in that cluster, depending on the query:
 *
 * - neptune-graph:ReadDataViaQuery
 *
 * - neptune-graph:WriteDataViaQuery
 *
 * - neptune-graph:DeleteDataViaQuery
 */
export const executeQuery: API.OperationMethod<
  ExecuteQueryInput,
  ExecuteQueryOutput,
  ExecuteQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /queries",
    input: {
      graphIdentifier: D.m({ header: "graphIdentifier" }),
      queryString: D.m({ wire: "query" }),
      language: 0,
      parameters: 0,
      planCache: 0,
      explainMode: D.m({ wire: "explain" }),
      queryTimeoutMilliseconds: 0,
    },
    output: { payload: D.m({ payload: true, shape: D.stream }) },
    staticContext: { ApiType: { value: "DataPlane" } },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    UnprocessableException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExecuteQuery",
  endpointHostPrefix: "{graphIdentifier}.",
})) as any;

export type GetExportTaskError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a specified export task.
 */
export const getExportTask: API.OperationMethod<
  GetExportTaskInput,
  GetExportTaskOutput,
  GetExportTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /exporttasks/{taskIdentifier}",
    input: { taskIdentifier: 0 },
    output: { exportTaskDetails: { startTime: D.ts } },
    staticContext: { ApiType: { value: "ControlPlane" } },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetExportTask",
})) as any;

export type GetGraphError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about a specified graph.
 */
export const getGraph: API.OperationMethod<
  GetGraphInput,
  GetGraphOutput,
  GetGraphError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /graphs/{graphIdentifier}",
    input: { graphIdentifier: 0 },
    output: { createTime: D.ts },
    staticContext: { ApiType: { value: "ControlPlane" } },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGraph",
})) as any;

export type GetGraphSnapshotError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a specified graph snapshot.
 */
export const getGraphSnapshot: API.OperationMethod<
  GetGraphSnapshotInput,
  GetGraphSnapshotOutput,
  GetGraphSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /snapshots/{snapshotIdentifier}",
    input: { snapshotIdentifier: 0 },
    output: { snapshotCreateTime: D.ts },
    staticContext: { ApiType: { value: "ControlPlane" } },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGraphSnapshot",
})) as any;

export type GetGraphSummaryError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a graph summary for a property graph.
 */
export const getGraphSummary: API.OperationMethod<
  GetGraphSummaryInput,
  GetGraphSummaryOutput,
  GetGraphSummaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /summary",
    input: {
      graphIdentifier: D.m({ header: "graphIdentifier" }),
      mode: D.m({ query: "mode" }),
    },
    output: { lastStatisticsComputationTime: D.ts },
    staticContext: { ApiType: { value: "DataPlane" } },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGraphSummary",
  endpointHostPrefix: "{graphIdentifier}.",
})) as any;

export type GetImportTaskError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a specified import task.
 */
export const getImportTask: API.OperationMethod<
  GetImportTaskInput,
  GetImportTaskOutput,
  GetImportTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /importtasks/{taskIdentifier}",
    input: { taskIdentifier: 0 },
    output: { importTaskDetails: { startTime: D.ts } },
    staticContext: { ApiType: { value: "ControlPlane" } },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetImportTask",
})) as any;

export type GetPrivateGraphEndpointError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a specified private endpoint.
 */
export const getPrivateGraphEndpoint: API.OperationMethod<
  GetPrivateGraphEndpointInput,
  GetPrivateGraphEndpointOutput,
  GetPrivateGraphEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /graphs/{graphIdentifier}/endpoints/{vpcId}",
    input: { graphIdentifier: 0, vpcId: 0 },
    staticContext: { ApiType: { value: "ControlPlane" } },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPrivateGraphEndpoint",
})) as any;

export type GetQueryError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the status of a specified query.
 *
 * When invoking this operation in a Neptune Analytics cluster, the IAM user or role making the request must have the `neptune-graph:GetQueryStatus` IAM action attached.
 */
export const getQuery: API.OperationMethod<
  GetQueryInput,
  GetQueryOutput,
  GetQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /queries/{queryId}",
    input: { graphIdentifier: D.m({ header: "graphIdentifier" }), queryId: 0 },
    staticContext: { ApiType: { value: "DataPlane" } },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetQuery",
  endpointHostPrefix: "{graphIdentifier}.",
})) as any;

export type ListExportTasksError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of export tasks.
 */
export const listExportTasks: API.PaginatedOperationMethod<
  ListExportTasksInput,
  ListExportTasksOutput,
  ListExportTasksError,
  Credentials | HttpClient.HttpClient,
  ExportTaskSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /exporttasks",
    input: {
      graphIdentifier: D.m({ query: "graphIdentifier" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    staticContext: { ApiType: { value: "ControlPlane" } },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListExportTasks",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "tasks",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListGraphsError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists available Neptune Analytics graphs.
 */
export const listGraphs: API.PaginatedOperationMethod<
  ListGraphsInput,
  ListGraphsOutput,
  ListGraphsError,
  Credentials | HttpClient.HttpClient,
  GraphSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /graphs",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    staticContext: { ApiType: { value: "ControlPlane" } },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGraphs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "graphs",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListGraphSnapshotsError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists available snapshots of a specified Neptune Analytics graph.
 */
export const listGraphSnapshots: API.PaginatedOperationMethod<
  ListGraphSnapshotsInput,
  ListGraphSnapshotsOutput,
  ListGraphSnapshotsError,
  Credentials | HttpClient.HttpClient,
  GraphSnapshotSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /snapshots",
    input: {
      graphIdentifier: D.m({ query: "graphIdentifier" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { graphSnapshots: D.list({ snapshotCreateTime: D.ts }) },
    staticContext: { ApiType: { value: "ControlPlane" } },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGraphSnapshots",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "graphSnapshots",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListImportTasksError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists import tasks.
 */
export const listImportTasks: API.PaginatedOperationMethod<
  ListImportTasksInput,
  ListImportTasksOutput,
  ListImportTasksError,
  Credentials | HttpClient.HttpClient,
  ImportTaskSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /importtasks",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    staticContext: { ApiType: { value: "ControlPlane" } },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListImportTasks",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "tasks",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPrivateGraphEndpointsError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists private endpoints for a specified Neptune Analytics graph.
 */
export const listPrivateGraphEndpoints: API.PaginatedOperationMethod<
  ListPrivateGraphEndpointsInput,
  ListPrivateGraphEndpointsOutput,
  ListPrivateGraphEndpointsError,
  Credentials | HttpClient.HttpClient,
  PrivateGraphEndpointSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /graphs/{graphIdentifier}/endpoints/",
    input: {
      graphIdentifier: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    staticContext: { ApiType: { value: "ControlPlane" } },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPrivateGraphEndpoints",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "privateGraphEndpoints",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListQueriesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists active openCypher queries.
 */
export const listQueries: API.OperationMethod<
  ListQueriesInput,
  ListQueriesOutput,
  ListQueriesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /queries",
    input: {
      graphIdentifier: D.m({ header: "graphIdentifier" }),
      maxResults: D.m({ query: "maxResults" }),
      state: D.m({ query: "state" }),
    },
    staticContext: { ApiType: { value: "DataPlane" } },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListQueries",
  endpointHostPrefix: "{graphIdentifier}.",
})) as any;

export type ListTagsForResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists tags associated with a specified resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceInput,
  ListTagsForResourceOutput,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /tags/{resourceArn}",
    input: { resourceArn: 0 },
    staticContext: { ApiType: { value: "ControlPlane" } },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type ResetGraphError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Empties the data from a specified Neptune Analytics graph.
 */
export const resetGraph: API.OperationMethod<
  ResetGraphInput,
  ResetGraphOutput,
  ResetGraphError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /graphs/{graphIdentifier}",
    input: { graphIdentifier: 0, skipSnapshot: 0 },
    output: { createTime: D.ts },
    staticContext: { ApiType: { value: "ControlPlane" } },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResetGraph",
})) as any;

export type RestoreGraphFromSnapshotError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Restores a graph from a snapshot.
 */
export const restoreGraphFromSnapshot: API.OperationMethod<
  RestoreGraphFromSnapshotInput,
  RestoreGraphFromSnapshotOutput,
  RestoreGraphFromSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /snapshots/{snapshotIdentifier}/restore",
    input: {
      snapshotIdentifier: 0,
      graphName: 0,
      provisionedMemory: 0,
      deletionProtection: 0,
      tags: 0,
      replicaCount: 0,
      publicConnectivity: 0,
    },
    output: { createTime: D.ts },
    staticContext: { ApiType: { value: "ControlPlane" } },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RestoreGraphFromSnapshot",
})) as any;

export type StartExportTaskError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Export data from an existing Neptune Analytics graph to Amazon S3. The graph state should be `AVAILABLE`.
 */
export const startExportTask: API.OperationMethod<
  StartExportTaskInput,
  StartExportTaskOutput,
  StartExportTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /exporttasks",
    input: {
      graphIdentifier: 0,
      roleArn: 0,
      format: 0,
      destination: 0,
      kmsKeyIdentifier: 0,
      parquetType: 0,
      exportFilter: {
        vertexFilter: D.map(i_ExportFilterElement),
        edgeFilter: D.map(i_ExportFilterElement),
      },
      tags: 0,
    },
    staticContext: { ApiType: { value: "ControlPlane" } },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartExportTask",
})) as any;

export type StartGraphError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts the specific graph.
 */
export const startGraph: API.OperationMethod<
  StartGraphInput,
  StartGraphOutput,
  StartGraphError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /graphs/{graphIdentifier}/start",
    input: { graphIdentifier: 0 },
    output: { createTime: D.ts },
    staticContext: { ApiType: { value: "ControlPlane" } },
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartGraph",
})) as any;

export type StartImportTaskError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Import data into existing Neptune Analytics graph from Amazon Simple Storage Service (S3). The graph needs to be empty and in the AVAILABLE state.
 */
export const startImportTask: API.OperationMethod<
  StartImportTaskInput,
  StartImportTaskOutput,
  StartImportTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /graphs/{graphIdentifier}/importtasks",
    input: {
      importOptions: i_ImportOptions,
      failOnError: 0,
      source: 0,
      format: 0,
      parquetType: 0,
      blankNodeHandling: 0,
      graphIdentifier: 0,
      roleArn: 0,
    },
    staticContext: { ApiType: { value: "ControlPlane" } },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartImportTask",
})) as any;

export type StopGraphError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stops the specific graph.
 */
export const stopGraph: API.OperationMethod<
  StopGraphInput,
  StopGraphOutput,
  StopGraphError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /graphs/{graphIdentifier}/stop",
    input: { graphIdentifier: 0 },
    output: { createTime: D.ts },
    staticContext: { ApiType: { value: "ControlPlane" } },
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopGraph",
})) as any;

export type TagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds tags to the specified resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceInput,
  TagResourceOutput,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /tags/{resourceArn}",
    input: { resourceArn: 0, tags: 0 },
    staticContext: { ApiType: { value: "ControlPlane" } },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes the specified tags from the specified resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput,
  UntagResourceOutput,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /tags/{resourceArn}",
    input: { resourceArn: 0, tagKeys: D.m({ query: "tagKeys" }) },
    staticContext: { ApiType: { value: "ControlPlane" } },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateGraphError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configuration of a specified Neptune Analytics graph
 */
export const updateGraph: API.OperationMethod<
  UpdateGraphInput,
  UpdateGraphOutput,
  UpdateGraphError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /graphs/{graphIdentifier}",
    input: {
      graphIdentifier: 0,
      publicConnectivity: 0,
      provisionedMemory: 0,
      deletionProtection: 0,
    },
    output: { createTime: D.ts },
    staticContext: { ApiType: { value: "ControlPlane" } },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGraph",
})) as any;

const i_ExportFilterElement: D.LazyStruct = () => ({
  properties: D.map({
    outputType: 0,
    sourcePropertyName: 0,
    multiValueHandling: 0,
  }),
});
const i_ImportOptions: D.LazyStruct = () => ({
  neptune: {
    s3ExportPath: 0,
    s3ExportKmsKeyId: 0,
    preserveDefaultVertexLabels: 0,
    preserveEdgeIds: 0,
  },
});
const i_VectorSearchConfiguration: D.LazyStruct = () => ({ dimension: 0 });
