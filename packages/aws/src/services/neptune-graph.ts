import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import * as TxXray from "@distilled.cloud/core/telemetry-xray";
import type * as HttpClient from "effect/http/HttpClient";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsServiceErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import type { RegionInput } from "../region.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "Neptune Graph",
  serviceShapeName: "AmazonNeptuneGraph",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "neptune-graph" });
const ver = /*@__PURE__*/ T.ServiceVersion("2023-11-29");
const proto = /*@__PURE__*/ T.AwsProtocolsRestJson1();
const rules = /*@__PURE__*/ T.EndpointResolver((p, _) => {
  const { Region, UseFIPS = false, UseDualStack = false, Endpoint, ApiType } = p;
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
      return err("Invalid Configuration: FIPS and custom endpoint are not supported");
    }
    if (UseDualStack === true) {
      return err("Invalid Configuration: Dualstack and custom endpoint are not supported");
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
              return err("Invalid Configuration: fips endpoint is not supported for this API");
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
              return err("Invalid Configuration: fips endpoint is not supported for this API");
            }
            return err("Invalid Configuration: Unknown ApiType");
          }
          return err("FIPS is enabled but this partition does not support FIPS");
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
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        if (ApiType === "ControlPlane") {
          return e(`https://neptune-graph.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
        }
        if (ApiType === "DataPlane") {
          return e(`https://${Region}.neptune-graph.${_.getAttr(PartitionResult, "dnsSuffix")}`);
        }
        return err("Invalid Configuration: Unknown ApiType");
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

/** Span facts shared by every operation (com.distilled.telemetry#service). */
const TELEMETRY = {
  system: "aws-api",
  responseHeaders: [
    { header: "x-amzn-requestid", name: "aws.request_id" },
    { header: "x-amz-request-id", name: "aws.request_id" },
    { header: "x-amzn-request-id", name: "aws.request_id" },
    { header: "x-amz-id-2", name: "aws.extended_request_id" },
  ],
  prefix: "NeptuneGraph",
  service: "NeptuneGraph",
  propagate: TxXray.propagate,
} as const;

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      reason: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "ConflictExceptionReason" }),
      ),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(500), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: /*@__PURE__*/ S.optional(S.String),
      resourceType: /*@__PURE__*/ S.optional(S.String),
      serviceCode: /*@__PURE__*/ S.optional(S.String),
      quotaCode: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.HttpError(429),
      /*@__PURE__*/ T.Retryable({ throttling: true }),
    ),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class UnprocessableException
  extends /*@__PURE__*/ S.TaggedError<UnprocessableException>()(
    "UnprocessableException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      reason: /*@__PURE__*/ S.suspend(() => S.String).annotate({
        identifier: "UnprocessableExceptionReason",
      }),
    },
    /*@__PURE__*/ T.HttpError(422),
  ).pipe(C.withBadRequestError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      reason: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({
          identifier: "ValidationExceptionReason",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
  parquetType?: ParquetType | undefined;
  statusReason?: string | undefined;
}
export type TaskId = string;
export interface CancelImportTaskInput {
  taskIdentifier: string;
}
export type Format = "CSV" | "OPEN_CYPHER" | "PARQUET" | "NTRIPLES" | (string & {});
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
  graphId?: string | undefined;
  taskId: string;
  source: string;
  format?: Format | undefined;
  parquetType?: ParquetType | undefined;
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
export interface ProvisionedGraphConfiguration {
  memory: number;
}
export type GraphSessionMemory = number;
export interface GraphSessionConfiguration {
  minMemory?: number | undefined;
}
export type ComputeConfiguration =
  | { provisionedGraph: ProvisionedGraphConfiguration; graphSession?: undefined }
  | { provisionedGraph?: undefined; graphSession: GraphSessionConfiguration };
export interface CreateGraphInput {
  graphName: string;
  tags?: { [key: string]: string | undefined } | undefined;
  publicConnectivity?: boolean | undefined;
  kmsKeyIdentifier?: string | undefined;
  vectorSearchConfiguration?: VectorSearchConfiguration | undefined;
  replicaCount?: number | undefined;
  deletionProtection?: boolean | undefined;
  provisionedMemory?: number | undefined;
  computeConfiguration?: ComputeConfiguration | undefined;
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
  status?: GraphStatus | undefined;
  statusReason?: string | undefined;
  createTime?: Date | undefined;
  provisionedMemory?: number | undefined;
  computeConfiguration?: ComputeConfiguration | undefined;
  endpoint?: string | undefined;
  publicConnectivity?: boolean | undefined;
  vectorSearchConfiguration?: VectorSearchConfiguration | undefined;
  replicaCount?: number | undefined;
  kmsKeyIdentifier?: string | undefined;
  sourceSnapshotId?: string | undefined;
  deletionProtection?: boolean | undefined;
  buildNumber?: string | undefined;
}
export type SnapshotName = string;
export interface CreateGraphSnapshotInput {
  graphIdentifier: string;
  snapshotName: string;
  tags?: { [key: string]: string | undefined } | undefined;
}
export type SnapshotStatus = "CREATING" | "AVAILABLE" | "DELETING" | "FAILED" | (string & {});
export interface CreateGraphSnapshotOutput {
  id: string;
  name: string;
  arn: string;
  sourceGraphId?: string | undefined;
  snapshotCreateTime?: Date | undefined;
  status?: SnapshotStatus | undefined;
  kmsKeyIdentifier?: string | undefined;
}
export interface NeptuneImportOptions {
  s3ExportPath: string;
  s3ExportKmsKeyId: string;
  preserveDefaultVertexLabels?: boolean | undefined;
  preserveEdgeIds?: boolean | undefined;
}
export type ImportOptions = { neptune: NeptuneImportOptions };
export type BlankNodeHandling = "convertToIri" | (string & {});
export interface CreateGraphUsingImportTaskInput {
  graphName: string;
  tags?: { [key: string]: string | undefined } | undefined;
  publicConnectivity?: boolean | undefined;
  kmsKeyIdentifier?: string | undefined;
  vectorSearchConfiguration?: VectorSearchConfiguration | undefined;
  replicaCount?: number | undefined;
  deletionProtection?: boolean | undefined;
  importOptions?: ImportOptions | undefined;
  maxProvisionedMemory?: number | undefined;
  minProvisionedMemory?: number | undefined;
  failOnError?: boolean | undefined;
  source: string;
  format?: Format | undefined;
  parquetType?: ParquetType | undefined;
  blankNodeHandling?: BlankNodeHandling | undefined;
  roleArn: string;
}
export interface CreateGraphUsingImportTaskOutput {
  graphId?: string | undefined;
  taskId: string;
  source: string;
  format?: Format | undefined;
  parquetType?: ParquetType | undefined;
  roleArn: string;
  status: ImportTaskStatus;
  importOptions?: ImportOptions | undefined;
}
export type VpcId = string;
export type SubnetId = string;
export type SubnetIds = string[];
export type SecurityGroupId = string;
export type SecurityGroupIds = string[];
export interface CreatePrivateGraphEndpointInput {
  graphIdentifier: string;
  vpcId?: string | undefined;
  subnetIds?: string[] | undefined;
  vpcSecurityGroupIds?: string[] | undefined;
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
  vpcEndpointId?: string | undefined;
}
export interface DeleteGraphInput {
  graphIdentifier: string;
  skipSnapshot: boolean;
}
export interface DeleteGraphOutput {
  id: string;
  name: string;
  arn: string;
  status?: GraphStatus | undefined;
  statusReason?: string | undefined;
  createTime?: Date | undefined;
  provisionedMemory?: number | undefined;
  computeConfiguration?: ComputeConfiguration | undefined;
  endpoint?: string | undefined;
  publicConnectivity?: boolean | undefined;
  vectorSearchConfiguration?: VectorSearchConfiguration | undefined;
  replicaCount?: number | undefined;
  kmsKeyIdentifier?: string | undefined;
  sourceSnapshotId?: string | undefined;
  deletionProtection?: boolean | undefined;
  buildNumber?: string | undefined;
}
export type SnapshotIdentifier = string;
export interface DeleteGraphSnapshotInput {
  snapshotIdentifier: string;
}
export interface DeleteGraphSnapshotOutput {
  id: string;
  name: string;
  arn: string;
  sourceGraphId?: string | undefined;
  snapshotCreateTime?: Date | undefined;
  status?: SnapshotStatus | undefined;
  kmsKeyIdentifier?: string | undefined;
}
export interface DeletePrivateGraphEndpointInput {
  graphIdentifier: string;
  vpcId: string;
}
export interface DeletePrivateGraphEndpointOutput {
  vpcId: string;
  subnetIds: string[];
  status: PrivateGraphEndpointStatus;
  vpcEndpointId?: string | undefined;
}
export type QueryLanguage = "OPEN_CYPHER" | (string & {});
export type DocumentValuedMap = { [key: string]: any | undefined };
export type PlanCacheType = "ENABLED" | "DISABLED" | "AUTO" | (string & {});
export type ExplainMode = "STATIC" | "DETAILS" | (string & {});
export interface ExecuteQueryInput {
  graphIdentifier: string;
  queryString: string;
  language: QueryLanguage;
  parameters?: { [key: string]: any | undefined } | undefined;
  planCache?: PlanCacheType | undefined;
  explainMode?: ExplainMode | undefined;
  queryTimeoutMilliseconds?: number | undefined;
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
  numVerticesWritten?: number | undefined;
  numEdgesWritten?: number | undefined;
}
export type ExportFilterLabel = string;
export type ExportFilterOutputPropertyName = string;
export type ExportFilterOutputDataType = string;
export type ExportFilterSourcePropertyName = string;
export type MultiValueHandlingType = "TO_LIST" | "PICK_FIRST" | (string & {});
export interface ExportFilterPropertyAttributes {
  outputType?: string | undefined;
  sourcePropertyName?: string | undefined;
  multiValueHandling?: MultiValueHandlingType | undefined;
}
export type ExportFilterPropertyMap = { [key: string]: ExportFilterPropertyAttributes | undefined };
export interface ExportFilterElement {
  properties?: { [key: string]: ExportFilterPropertyAttributes | undefined } | undefined;
}
export type ExportFilterPerLabelMap = { [key: string]: ExportFilterElement | undefined };
export interface ExportFilter {
  vertexFilter?: { [key: string]: ExportFilterElement | undefined } | undefined;
  edgeFilter?: { [key: string]: ExportFilterElement | undefined } | undefined;
}
export interface GetExportTaskOutput {
  graphId: string;
  roleArn: string;
  taskId: string;
  status: ExportTaskStatus;
  format: ExportFormat;
  destination: string;
  kmsKeyIdentifier: string;
  parquetType?: ParquetType | undefined;
  statusReason?: string | undefined;
  exportTaskDetails?: ExportTaskDetails | undefined;
  exportFilter?: ExportFilter | undefined;
}
export interface GetGraphInput {
  graphIdentifier: string;
}
export interface GetGraphOutput {
  id: string;
  name: string;
  arn: string;
  status?: GraphStatus | undefined;
  statusReason?: string | undefined;
  createTime?: Date | undefined;
  provisionedMemory?: number | undefined;
  computeConfiguration?: ComputeConfiguration | undefined;
  endpoint?: string | undefined;
  publicConnectivity?: boolean | undefined;
  vectorSearchConfiguration?: VectorSearchConfiguration | undefined;
  replicaCount?: number | undefined;
  kmsKeyIdentifier?: string | undefined;
  sourceSnapshotId?: string | undefined;
  deletionProtection?: boolean | undefined;
  buildNumber?: string | undefined;
}
export interface GetGraphSnapshotInput {
  snapshotIdentifier: string;
}
export interface GetGraphSnapshotOutput {
  id: string;
  name: string;
  arn: string;
  sourceGraphId?: string | undefined;
  snapshotCreateTime?: Date | undefined;
  status?: SnapshotStatus | undefined;
  kmsKeyIdentifier?: string | undefined;
}
export type GraphSummaryMode = "BASIC" | "DETAILED" | (string & {});
export interface GetGraphSummaryInput {
  graphIdentifier: string;
  mode?: GraphSummaryMode | undefined;
}
export type NodeLabels = string[];
export type EdgeLabels = string[];
export type LongValuedMap = { [key: string]: number | undefined };
export type LongValuedMapList = { [key: string]: number | undefined }[];
export type NodeProperties = string[];
export type OutgoingEdgeLabels = string[];
export interface NodeStructure {
  count?: number | undefined;
  nodeProperties?: string[] | undefined;
  distinctOutgoingEdgeLabels?: string[] | undefined;
}
export type NodeStructures = NodeStructure[];
export type EdgeProperties = string[];
export interface EdgeStructure {
  count?: number | undefined;
  edgeProperties?: string[] | undefined;
}
export type EdgeStructures = EdgeStructure[];
export interface GraphDataSummary {
  numNodes?: number | undefined;
  numEdges?: number | undefined;
  numNodeLabels?: number | undefined;
  numEdgeLabels?: number | undefined;
  nodeLabels?: string[] | undefined;
  edgeLabels?: string[] | undefined;
  numNodeProperties?: number | undefined;
  numEdgeProperties?: number | undefined;
  nodeProperties?: { [key: string]: number | undefined }[] | undefined;
  edgeProperties?: { [key: string]: number | undefined }[] | undefined;
  totalNodePropertyValues?: number | undefined;
  totalEdgePropertyValues?: number | undefined;
  nodeStructures?: NodeStructure[] | undefined;
  edgeStructures?: EdgeStructure[] | undefined;
}
export interface GetGraphSummaryOutput {
  version?: string | undefined;
  lastStatisticsComputationTime?: Date | undefined;
  graphSummary?: GraphDataSummary | undefined;
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
  errorDetails?: string | undefined;
  statementCount: number;
  dictionaryEntryCount: number;
}
export interface GetImportTaskOutput {
  graphId?: string | undefined;
  taskId: string;
  source: string;
  format?: Format | undefined;
  parquetType?: ParquetType | undefined;
  roleArn: string;
  status: ImportTaskStatus;
  importOptions?: ImportOptions | undefined;
  importTaskDetails?: ImportTaskDetails | undefined;
  attemptNumber?: number | undefined;
  statusReason?: string | undefined;
}
export interface GetPrivateGraphEndpointInput {
  graphIdentifier: string;
  vpcId: string;
}
export interface GetPrivateGraphEndpointOutput {
  vpcId: string;
  subnetIds: string[];
  status: PrivateGraphEndpointStatus;
  vpcEndpointId?: string | undefined;
}
export interface GetQueryInput {
  graphIdentifier: string;
  queryId: string;
}
export type QueryState = "RUNNING" | "WAITING" | "CANCELLING" | (string & {});
export interface GetQueryOutput {
  id?: string | undefined;
  queryString?: string | undefined;
  waited?: number | undefined;
  elapsed?: number | undefined;
  state?: QueryState | undefined;
}
export type PaginationToken = string;
export type MaxResults = number;
export interface ListExportTasksInput {
  graphIdentifier?: string | undefined;
  nextToken?: string | undefined;
  maxResults?: number | undefined;
}
export interface ExportTaskSummary {
  graphId: string;
  roleArn: string;
  taskId: string;
  status: ExportTaskStatus;
  format: ExportFormat;
  destination: string;
  kmsKeyIdentifier: string;
  parquetType?: ParquetType | undefined;
  statusReason?: string | undefined;
}
export type ExportTaskSummaryList = ExportTaskSummary[];
export interface ListExportTasksOutput {
  tasks: ExportTaskSummary[];
  nextToken?: string | undefined;
}
export interface ListGraphsInput {
  nextToken?: string | undefined;
  maxResults?: number | undefined;
}
export interface GraphSummary {
  id: string;
  name: string;
  arn: string;
  status?: GraphStatus | undefined;
  provisionedMemory?: number | undefined;
  publicConnectivity?: boolean | undefined;
  endpoint?: string | undefined;
  replicaCount?: number | undefined;
  kmsKeyIdentifier?: string | undefined;
  deletionProtection?: boolean | undefined;
  computeConfiguration?: ComputeConfiguration | undefined;
}
export type GraphSummaryList = GraphSummary[];
export interface ListGraphsOutput {
  graphs: GraphSummary[];
  nextToken?: string | undefined;
}
export interface ListGraphSnapshotsInput {
  graphIdentifier?: string | undefined;
  nextToken?: string | undefined;
  maxResults?: number | undefined;
}
export interface GraphSnapshotSummary {
  id: string;
  name: string;
  arn: string;
  sourceGraphId?: string | undefined;
  snapshotCreateTime?: Date | undefined;
  status?: SnapshotStatus | undefined;
  kmsKeyIdentifier?: string | undefined;
}
export type GraphSnapshotSummaryList = GraphSnapshotSummary[];
export interface ListGraphSnapshotsOutput {
  graphSnapshots: GraphSnapshotSummary[];
  nextToken?: string | undefined;
}
export interface ListImportTasksInput {
  graphIdentifier?: string | undefined;
  nextToken?: string | undefined;
  maxResults?: number | undefined;
}
export interface ImportTaskSummary {
  graphId?: string | undefined;
  taskId: string;
  source: string;
  format?: Format | undefined;
  parquetType?: ParquetType | undefined;
  roleArn: string;
  status: ImportTaskStatus;
}
export type ImportTaskSummaryList = ImportTaskSummary[];
export interface ListImportTasksOutput {
  tasks: ImportTaskSummary[];
  nextToken?: string | undefined;
}
export interface ListPrivateGraphEndpointsInput {
  graphIdentifier: string;
  nextToken?: string | undefined;
  maxResults?: number | undefined;
}
export interface PrivateGraphEndpointSummary {
  vpcId: string;
  subnetIds: string[];
  status: PrivateGraphEndpointStatus;
  vpcEndpointId?: string | undefined;
}
export type PrivateGraphEndpointSummaryList = PrivateGraphEndpointSummary[];
export interface ListPrivateGraphEndpointsOutput {
  privateGraphEndpoints: PrivateGraphEndpointSummary[];
  nextToken?: string | undefined;
}
export type QueryStateInput = "ALL" | "RUNNING" | "WAITING" | "CANCELLING" | (string & {});
export interface ListQueriesInput {
  graphIdentifier: string;
  maxResults: number;
  state?: QueryStateInput | undefined;
}
export interface QuerySummary {
  id?: string | undefined;
  queryString?: string | undefined;
  waited?: number | undefined;
  elapsed?: number | undefined;
  state?: QueryState | undefined;
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
  tags?: { [key: string]: string | undefined } | undefined;
}
export interface ResetGraphInput {
  graphIdentifier: string;
  skipSnapshot: boolean;
}
export interface ResetGraphOutput {
  id: string;
  name: string;
  arn: string;
  status?: GraphStatus | undefined;
  statusReason?: string | undefined;
  createTime?: Date | undefined;
  provisionedMemory?: number | undefined;
  computeConfiguration?: ComputeConfiguration | undefined;
  endpoint?: string | undefined;
  publicConnectivity?: boolean | undefined;
  vectorSearchConfiguration?: VectorSearchConfiguration | undefined;
  replicaCount?: number | undefined;
  kmsKeyIdentifier?: string | undefined;
  sourceSnapshotId?: string | undefined;
  deletionProtection?: boolean | undefined;
  buildNumber?: string | undefined;
}
export interface RestoreGraphFromSnapshotInput {
  snapshotIdentifier: string;
  graphName: string;
  provisionedMemory?: number | undefined;
  computeConfiguration?: ComputeConfiguration | undefined;
  deletionProtection?: boolean | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
  replicaCount?: number | undefined;
  publicConnectivity?: boolean | undefined;
}
export interface RestoreGraphFromSnapshotOutput {
  id: string;
  name: string;
  arn: string;
  status?: GraphStatus | undefined;
  statusReason?: string | undefined;
  createTime?: Date | undefined;
  provisionedMemory?: number | undefined;
  computeConfiguration?: ComputeConfiguration | undefined;
  endpoint?: string | undefined;
  publicConnectivity?: boolean | undefined;
  vectorSearchConfiguration?: VectorSearchConfiguration | undefined;
  replicaCount?: number | undefined;
  kmsKeyIdentifier?: string | undefined;
  sourceSnapshotId?: string | undefined;
  deletionProtection?: boolean | undefined;
  buildNumber?: string | undefined;
}
export interface StartExportTaskInput {
  graphIdentifier: string;
  roleArn: string;
  format: ExportFormat;
  destination: string;
  kmsKeyIdentifier: string;
  parquetType?: ParquetType | undefined;
  exportFilter?: ExportFilter | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
}
export interface StartExportTaskOutput {
  graphId: string;
  roleArn: string;
  taskId: string;
  status: ExportTaskStatus;
  format: ExportFormat;
  destination: string;
  kmsKeyIdentifier: string;
  parquetType?: ParquetType | undefined;
  statusReason?: string | undefined;
  exportFilter?: ExportFilter | undefined;
}
export interface StartGraphInput {
  graphIdentifier: string;
}
export interface StartGraphOutput {
  id: string;
  name: string;
  arn: string;
  status?: GraphStatus | undefined;
  statusReason?: string | undefined;
  createTime?: Date | undefined;
  provisionedMemory?: number | undefined;
  computeConfiguration?: ComputeConfiguration | undefined;
  endpoint?: string | undefined;
  publicConnectivity?: boolean | undefined;
  vectorSearchConfiguration?: VectorSearchConfiguration | undefined;
  replicaCount?: number | undefined;
  kmsKeyIdentifier?: string | undefined;
  sourceSnapshotId?: string | undefined;
  deletionProtection?: boolean | undefined;
  buildNumber?: string | undefined;
}
export interface StartImportTaskInput {
  importOptions?: ImportOptions | undefined;
  failOnError?: boolean | undefined;
  source: string;
  format?: Format | undefined;
  parquetType?: ParquetType | undefined;
  blankNodeHandling?: BlankNodeHandling | undefined;
  graphIdentifier: string;
  roleArn: string;
}
export interface StartImportTaskOutput {
  graphId?: string | undefined;
  taskId: string;
  source: string;
  format?: Format | undefined;
  parquetType?: ParquetType | undefined;
  roleArn: string;
  status: ImportTaskStatus;
  importOptions?: ImportOptions | undefined;
}
export interface StopGraphInput {
  graphIdentifier: string;
}
export interface StopGraphOutput {
  id: string;
  name: string;
  arn: string;
  status?: GraphStatus | undefined;
  statusReason?: string | undefined;
  createTime?: Date | undefined;
  provisionedMemory?: number | undefined;
  computeConfiguration?: ComputeConfiguration | undefined;
  endpoint?: string | undefined;
  publicConnectivity?: boolean | undefined;
  vectorSearchConfiguration?: VectorSearchConfiguration | undefined;
  replicaCount?: number | undefined;
  kmsKeyIdentifier?: string | undefined;
  sourceSnapshotId?: string | undefined;
  deletionProtection?: boolean | undefined;
  buildNumber?: string | undefined;
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
  publicConnectivity?: boolean | undefined;
  provisionedMemory?: number | undefined;
  computeConfiguration?: ComputeConfiguration | undefined;
  deletionProtection?: boolean | undefined;
}
export interface UpdateGraphOutput {
  id: string;
  name: string;
  arn: string;
  status?: GraphStatus | undefined;
  statusReason?: string | undefined;
  createTime?: Date | undefined;
  provisionedMemory?: number | undefined;
  computeConfiguration?: ComputeConfiguration | undefined;
  endpoint?: string | undefined;
  publicConnectivity?: boolean | undefined;
  vectorSearchConfiguration?: VectorSearchConfiguration | undefined;
  replicaCount?: number | undefined;
  kmsKeyIdentifier?: string | undefined;
  sourceSnapshotId?: string | undefined;
  deletionProtection?: boolean | undefined;
  buildNumber?: string | undefined;
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
  CancelExportTaskInput & RegionInput,
  CancelExportTaskOutput,
  CancelExportTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(704, __c44, 0) as any as S.Schema<CancelExportTaskInput>,
  output: __S(720, __c45, 0) as any as S.Schema<CancelExportTaskOutput>,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelExportTask",
  telemetry: TELEMETRY,
  span: "CancelExportTask",
}));

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
  CancelImportTaskInput & RegionInput,
  CancelImportTaskOutput,
  CancelImportTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(736, __c46, 0) as any as S.Schema<CancelImportTaskInput>,
  output: __S(752, __c47, 0) as any as S.Schema<CancelImportTaskOutput>,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelImportTask",
  telemetry: TELEMETRY,
  span: "CancelImportTask",
}));

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
  CancelQueryInput & RegionInput,
  CancelQueryResponse,
  CancelQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<CancelQueryInput>,
  output: __S(16, __c1, 0) as any as S.Schema<CancelQueryResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelQuery",
  endpointHostPrefix: "{graphIdentifier}.",
  telemetry: TELEMETRY,
  span: "CancelQuery",
}));

export type CreateGraphError =
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new Neptune Analytics graph.
 *
 * Neptune Analytics supports two types of graphs, selected using `computeConfiguration`:
 *
 * - *Provisioned graphs* use dedicated compute that is always available. Use provisioned graphs for workloads that require higher memory or predictable latency.
 *
 * - *Graph sessions* use ephemeral compute that is bootstrapped when a query is sent to the graph. The compute is automatically stopped after a few minutes with no traffic. The next query sent to the graph bootstraps the compute again, so queries that bootstrap the compute are subject to cold start latency.
 */
export const createGraph: API.OperationMethod<
  CreateGraphInput & RegionInput,
  CreateGraphOutput,
  CreateGraphError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c2, 0) as any as S.Schema<CreateGraphInput>,
  output: __S(96, __c6, 0) as any as S.Schema<CreateGraphOutput>,
  errors: [
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGraph",
  telemetry: TELEMETRY,
  span: "CreateGraph",
}));

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
  CreateGraphSnapshotInput & RegionInput,
  CreateGraphSnapshotOutput,
  CreateGraphSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(112, __c7, 0) as any as S.Schema<CreateGraphSnapshotInput>,
  output: __S(128, __c8, 0) as any as S.Schema<CreateGraphSnapshotOutput>,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGraphSnapshot",
  telemetry: TELEMETRY,
  span: "CreateGraphSnapshot",
}));

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
 *
 * Graph session cannot be created using this API. Create an empty Graph Session using CreateGraph or restore a snapshot as Graph Session using RestoreGraphFromSnapshot and use neptune.load CALL procedure to load data into the Graph Session instead.
 */
export const createGraphUsingImportTask: API.OperationMethod<
  CreateGraphUsingImportTaskInput & RegionInput,
  CreateGraphUsingImportTaskOutput,
  CreateGraphUsingImportTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(144, __c9, 0) as any as S.Schema<CreateGraphUsingImportTaskInput>,
  output: __S(176, __c11, 0) as any as S.Schema<CreateGraphUsingImportTaskOutput>,
  errors: [
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGraphUsingImportTask",
  telemetry: TELEMETRY,
  span: "CreateGraphUsingImportTask",
}));

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
  CreatePrivateGraphEndpointInput & RegionInput,
  CreatePrivateGraphEndpointOutput,
  CreatePrivateGraphEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c12, 0) as any as S.Schema<CreatePrivateGraphEndpointInput>,
  output: __S(224, __c14, 0) as any as S.Schema<CreatePrivateGraphEndpointOutput>,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePrivateGraphEndpoint",
  telemetry: TELEMETRY,
  span: "CreatePrivateGraphEndpoint",
}));

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
  DeleteGraphInput & RegionInput,
  DeleteGraphOutput,
  DeleteGraphError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(240, __c15, 0) as any as S.Schema<DeleteGraphInput>,
  output: __S(96, __c6, 0) as any as S.Schema<DeleteGraphOutput>,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGraph",
  telemetry: TELEMETRY,
  span: "DeleteGraph",
}));

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
  DeleteGraphSnapshotInput & RegionInput,
  DeleteGraphSnapshotOutput,
  DeleteGraphSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c16, 0) as any as S.Schema<DeleteGraphSnapshotInput>,
  output: __S(128, __c8, 0) as any as S.Schema<DeleteGraphSnapshotOutput>,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGraphSnapshot",
  telemetry: TELEMETRY,
  span: "DeleteGraphSnapshot",
}));

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
  DeletePrivateGraphEndpointInput & RegionInput,
  DeletePrivateGraphEndpointOutput,
  DeletePrivateGraphEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(272, __c17, 0) as any as S.Schema<DeletePrivateGraphEndpointInput>,
  output: __S(224, __c14, 0) as any as S.Schema<DeletePrivateGraphEndpointOutput>,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePrivateGraphEndpoint",
  telemetry: TELEMETRY,
  span: "DeletePrivateGraphEndpoint",
}));

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
  ExecuteQueryInput & RegionInput,
  ExecuteQueryOutput,
  ExecuteQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(289, __c18, 1) as any as S.Schema<ExecuteQueryInput>,
  output: __S(290, __c18, 2) as any as S.Schema<ExecuteQueryOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    UnprocessableException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExecuteQuery",
  endpointHostPrefix: "{graphIdentifier}.",
  telemetry: TELEMETRY,
  span: "ExecuteQuery",
}));

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
  GetExportTaskInput & RegionInput,
  GetExportTaskOutput,
  GetExportTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(304, __c19, 0) as any as S.Schema<GetExportTaskInput>,
  output: __S(306, __c19, 2) as any as S.Schema<GetExportTaskOutput>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetExportTask",
  telemetry: TELEMETRY,
  span: "GetExportTask",
}));

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
  GetGraphInput & RegionInput,
  GetGraphOutput,
  GetGraphError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(336, __c21, 0) as any as S.Schema<GetGraphInput>,
  output: __S(96, __c6, 0) as any as S.Schema<GetGraphOutput>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGraph",
  telemetry: TELEMETRY,
  span: "GetGraph",
}));

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
  GetGraphSnapshotInput & RegionInput,
  GetGraphSnapshotOutput,
  GetGraphSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(352, __c22, 0) as any as S.Schema<GetGraphSnapshotInput>,
  output: __S(128, __c8, 0) as any as S.Schema<GetGraphSnapshotOutput>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGraphSnapshot",
  telemetry: TELEMETRY,
  span: "GetGraphSnapshot",
}));

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
  GetGraphSummaryInput & RegionInput,
  GetGraphSummaryOutput,
  GetGraphSummaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(368, __c23, 0) as any as S.Schema<GetGraphSummaryInput>,
  output: __S(376, __c23, 8) as any as S.Schema<GetGraphSummaryOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGraphSummary",
  endpointHostPrefix: "{graphIdentifier}.",
  telemetry: TELEMETRY,
  span: "GetGraphSummary",
}));

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
  GetImportTaskInput & RegionInput,
  GetImportTaskOutput,
  GetImportTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(384, __c24, 0) as any as S.Schema<GetImportTaskInput>,
  output: __S(386, __c24, 2) as any as S.Schema<GetImportTaskOutput>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetImportTask",
  telemetry: TELEMETRY,
  span: "GetImportTask",
}));

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
  GetPrivateGraphEndpointInput & RegionInput,
  GetPrivateGraphEndpointOutput,
  GetPrivateGraphEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(400, __c25, 0) as any as S.Schema<GetPrivateGraphEndpointInput>,
  output: __S(224, __c14, 0) as any as S.Schema<GetPrivateGraphEndpointOutput>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPrivateGraphEndpoint",
  telemetry: TELEMETRY,
  span: "GetPrivateGraphEndpoint",
}));

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
  GetQueryInput & RegionInput,
  GetQueryOutput,
  GetQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(416, __c26, 0) as any as S.Schema<GetQueryInput>,
  output: __S(432, __c27, 0) as any as S.Schema<GetQueryOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetQuery",
  endpointHostPrefix: "{graphIdentifier}.",
  telemetry: TELEMETRY,
  span: "GetQuery",
}));

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
  ListExportTasksInput & RegionInput,
  ListExportTasksOutput,
  ListExportTasksError,
  Credentials | HttpClient.HttpClient,
  ExportTaskSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(448, __c28, 0) as any as S.Schema<ListExportTasksInput>,
  output: __S(450, __c28, 2) as any as S.Schema<ListExportTasksOutput>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListExportTasks",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "tasks",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListExportTasks",
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
  ListGraphsInput & RegionInput,
  ListGraphsOutput,
  ListGraphsError,
  Credentials | HttpClient.HttpClient,
  GraphSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(464, __c29, 0) as any as S.Schema<ListGraphsInput>,
  output: __S(467, __c29, 3) as any as S.Schema<ListGraphsOutput>,
  errors: [InternalServerException, ResourceNotFoundException, ThrottlingException],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGraphs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "graphs",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListGraphs",
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
  ListGraphSnapshotsInput & RegionInput,
  ListGraphSnapshotsOutput,
  ListGraphSnapshotsError,
  Credentials | HttpClient.HttpClient,
  GraphSnapshotSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(480, __c30, 0) as any as S.Schema<ListGraphSnapshotsInput>,
  output: __S(482, __c30, 2) as any as S.Schema<ListGraphSnapshotsOutput>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGraphSnapshots",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "graphSnapshots",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListGraphSnapshots",
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
  ListImportTasksInput & RegionInput,
  ListImportTasksOutput,
  ListImportTasksError,
  Credentials | HttpClient.HttpClient,
  ImportTaskSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(496, __c31, 0) as any as S.Schema<ListImportTasksInput>,
  output: __S(498, __c31, 2) as any as S.Schema<ListImportTasksOutput>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListImportTasks",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "tasks",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListImportTasks",
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
  ListPrivateGraphEndpointsInput & RegionInput,
  ListPrivateGraphEndpointsOutput,
  ListPrivateGraphEndpointsError,
  Credentials | HttpClient.HttpClient,
  PrivateGraphEndpointSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(512, __c32, 0) as any as S.Schema<ListPrivateGraphEndpointsInput>,
  output: __S(514, __c32, 2) as any as S.Schema<ListPrivateGraphEndpointsOutput>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPrivateGraphEndpoints",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "privateGraphEndpoints",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListPrivateGraphEndpoints",
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
  ListQueriesInput & RegionInput,
  ListQueriesOutput,
  ListQueriesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(528, __c33, 0) as any as S.Schema<ListQueriesInput>,
  output: __S(530, __c33, 2) as any as S.Schema<ListQueriesOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListQueries",
  endpointHostPrefix: "{graphIdentifier}.",
  telemetry: TELEMETRY,
  span: "ListQueries",
}));

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
  ListTagsForResourceInput & RegionInput,
  ListTagsForResourceOutput,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(544, __c34, 0) as any as S.Schema<ListTagsForResourceInput>,
  output: __S(545, __c34, 1) as any as S.Schema<ListTagsForResourceOutput>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  telemetry: TELEMETRY,
  span: "ListTagsForResource",
}));

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
  ResetGraphInput & RegionInput,
  ResetGraphOutput,
  ResetGraphError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(560, __c35, 0) as any as S.Schema<ResetGraphInput>,
  output: __S(96, __c6, 0) as any as S.Schema<ResetGraphOutput>,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResetGraph",
  telemetry: TELEMETRY,
  span: "ResetGraph",
}));

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
  RestoreGraphFromSnapshotInput & RegionInput,
  RestoreGraphFromSnapshotOutput,
  RestoreGraphFromSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(576, __c36, 0) as any as S.Schema<RestoreGraphFromSnapshotInput>,
  output: __S(96, __c6, 0) as any as S.Schema<RestoreGraphFromSnapshotOutput>,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RestoreGraphFromSnapshot",
  telemetry: TELEMETRY,
  span: "RestoreGraphFromSnapshot",
}));

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
  StartExportTaskInput & RegionInput,
  StartExportTaskOutput,
  StartExportTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(592, __c37, 0) as any as S.Schema<StartExportTaskInput>,
  output: __S(593, __c37, 1) as any as S.Schema<StartExportTaskOutput>,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartExportTask",
  telemetry: TELEMETRY,
  span: "StartExportTask",
}));

export type StartGraphError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts the specific graph.
 *
 * Graph sessions are started automatically when a query is sent to the graph. While this API is supported for graph sessions, it isn't required.
 */
export const startGraph: API.OperationMethod<
  StartGraphInput & RegionInput,
  StartGraphOutput,
  StartGraphError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(608, __c38, 0) as any as S.Schema<StartGraphInput>,
  output: __S(96, __c6, 0) as any as S.Schema<StartGraphOutput>,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartGraph",
  telemetry: TELEMETRY,
  span: "StartGraph",
}));

export type StartImportTaskError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Import data into existing Neptune Analytics graph from Amazon Simple Storage Service (S3). The graph needs to be empty and in the AVAILABLE state.
 *
 * Graph sessions don't support this API. Use neptune.load CALL procedure to load data into the Graph Session instead.
 */
export const startImportTask: API.OperationMethod<
  StartImportTaskInput & RegionInput,
  StartImportTaskOutput,
  StartImportTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(624, __c39, 0) as any as S.Schema<StartImportTaskInput>,
  output: __S(176, __c11, 0) as any as S.Schema<StartImportTaskOutput>,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartImportTask",
  telemetry: TELEMETRY,
  span: "StartImportTask",
}));

export type StopGraphError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stops the specific graph.
 *
 * Graph sessions are stopped automatically after a few minutes with no traffic. While this API is supported for graph sessions, it isn't required.
 */
export const stopGraph: API.OperationMethod<
  StopGraphInput & RegionInput,
  StopGraphOutput,
  StopGraphError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(640, __c40, 0) as any as S.Schema<StopGraphInput>,
  output: __S(96, __c6, 0) as any as S.Schema<StopGraphOutput>,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopGraph",
  telemetry: TELEMETRY,
  span: "StopGraph",
}));

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
  TagResourceInput & RegionInput,
  TagResourceOutput,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(656, __c41, 0) as any as S.Schema<TagResourceInput>,
  output: __S(16, __c1, 0) as any as S.Schema<TagResourceOutput>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
  telemetry: TELEMETRY,
  span: "TagResource",
}));

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
  UntagResourceInput & RegionInput,
  UntagResourceOutput,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(672, __c42, 0) as any as S.Schema<UntagResourceInput>,
  output: __S(16, __c1, 0) as any as S.Schema<UntagResourceOutput>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
  telemetry: TELEMETRY,
  span: "UntagResource",
}));

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
  UpdateGraphInput & RegionInput,
  UpdateGraphOutput,
  UpdateGraphError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(688, __c43, 0) as any as S.Schema<UpdateGraphInput>,
  output: __S(96, __c6, 0) as any as S.Schema<UpdateGraphOutput>,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGraph",
  telemetry: TELEMETRY,
  span: "UpdateGraph",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          graphIdentifier: S.String.pipe(T.HttpHeader("graphIdentifier"), T.HostLabel()),
          queryId: S.String.pipe(T.HttpLabel("queryId")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/queries/{queryId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ ApiType: { value: "DataPlane" } }),
          ),
        ),
      ).annotate({ identifier: "CancelQueryInput" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "CancelQueryResponse" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          graphName: S.String,
          tags: S.optional(__S(48, __c3, 0)),
          publicConnectivity: S.optional(S.Boolean),
          kmsKeyIdentifier: S.optional(S.String),
          vectorSearchConfiguration: S.optional(__S(64, __c4, 0)),
          replicaCount: S.optional(S.Number),
          deletionProtection: S.optional(S.Boolean),
          provisionedMemory: S.optional(S.Number),
          computeConfiguration: S.optional(__S(82, __c5, 2)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/graphs" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ ApiType: { value: "ControlPlane" } }),
          ),
        ),
      ).annotate({ identifier: "CreateGraphInput" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ dimension: S.Number })).annotate({
        identifier: "VectorSearchConfiguration",
      });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ memory: S.Number })).annotate({
        identifier: "ProvisionedGraphConfiguration",
      });
    case 1:
      return S.suspend(() => S.Struct({ minMemory: S.optional(S.Number) })).annotate({
        identifier: "GraphSessionConfiguration",
      });
    case 2:
      return S.Union([
        /*@__PURE__*/ S.Struct({ provisionedGraph: __S(80, __c5, 0) }),
        /*@__PURE__*/ S.Struct({ graphSession: __S(81, __c5, 1) }),
      ]);
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          name: S.String,
          arn: S.String,
          status: S.optional(S.String),
          statusReason: S.optional(S.String),
          createTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          provisionedMemory: S.optional(S.Number),
          computeConfiguration: S.optional(__S(82, __c5, 2)),
          endpoint: S.optional(S.String),
          publicConnectivity: S.optional(S.Boolean),
          vectorSearchConfiguration: S.optional(__S(64, __c4, 0)),
          replicaCount: S.optional(S.Number),
          kmsKeyIdentifier: S.optional(S.String),
          sourceSnapshotId: S.optional(S.String),
          deletionProtection: S.optional(S.Boolean),
          buildNumber: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateGraphOutput" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          graphIdentifier: S.String,
          snapshotName: S.String,
          tags: S.optional(__S(48, __c3, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/snapshots" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ ApiType: { value: "ControlPlane" } }),
          ),
        ),
      ).annotate({ identifier: "CreateGraphSnapshotInput" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          name: S.String,
          arn: S.String,
          sourceGraphId: S.optional(S.String),
          snapshotCreateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          status: S.optional(S.String),
          kmsKeyIdentifier: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateGraphSnapshotOutput" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          graphName: S.String,
          tags: S.optional(__S(48, __c3, 0)),
          publicConnectivity: S.optional(S.Boolean),
          kmsKeyIdentifier: S.optional(S.String),
          vectorSearchConfiguration: S.optional(__S(64, __c4, 0)),
          replicaCount: S.optional(S.Number),
          deletionProtection: S.optional(S.Boolean),
          importOptions: S.optional(__S(161, __c10, 1)),
          maxProvisionedMemory: S.optional(S.Number),
          minProvisionedMemory: S.optional(S.Number),
          failOnError: S.optional(S.Boolean),
          source: S.String,
          format: S.optional(S.String),
          parquetType: S.optional(S.String),
          blankNodeHandling: S.optional(S.String),
          roleArn: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/importtasks" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ ApiType: { value: "ControlPlane" } }),
          ),
        ),
      ).annotate({ identifier: "CreateGraphUsingImportTaskInput" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          s3ExportPath: S.String,
          s3ExportKmsKeyId: S.String,
          preserveDefaultVertexLabels: S.optional(S.Boolean),
          preserveEdgeIds: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "NeptuneImportOptions" });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ neptune: __S(160, __c10, 0) })]);
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          graphId: S.optional(S.String),
          taskId: S.String,
          source: S.String,
          format: S.optional(S.String),
          parquetType: S.optional(S.String),
          roleArn: S.String,
          status: S.String,
          importOptions: S.optional(__S(161, __c10, 1)),
        }),
      ).annotate({ identifier: "CreateGraphUsingImportTaskOutput" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          graphIdentifier: S.String.pipe(T.HttpLabel("graphIdentifier")),
          vpcId: S.optional(S.String),
          subnetIds: S.optional(__S(208, __c13, 0)),
          vpcSecurityGroupIds: S.optional(__S(208, __c13, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/graphs/{graphIdentifier}/endpoints/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ ApiType: { value: "ControlPlane" } }),
          ),
        ),
      ).annotate({ identifier: "CreatePrivateGraphEndpointInput" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          vpcId: S.String,
          subnetIds: __S(208, __c13, 0),
          status: S.String,
          vpcEndpointId: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreatePrivateGraphEndpointOutput" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          graphIdentifier: S.String.pipe(T.HttpLabel("graphIdentifier")),
          skipSnapshot: S.Boolean.pipe(T.HttpQuery("skipSnapshot")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/graphs/{graphIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ ApiType: { value: "ControlPlane" } }),
          ),
        ),
      ).annotate({ identifier: "DeleteGraphInput" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ snapshotIdentifier: S.String.pipe(T.HttpLabel("snapshotIdentifier")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/snapshots/{snapshotIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ ApiType: { value: "ControlPlane" } }),
          ),
        ),
      ).annotate({ identifier: "DeleteGraphSnapshotInput" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          graphIdentifier: S.String.pipe(T.HttpLabel("graphIdentifier")),
          vpcId: S.String.pipe(T.HttpLabel("vpcId")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/graphs/{graphIdentifier}/endpoints/{vpcId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ ApiType: { value: "ControlPlane" } }),
          ),
        ),
      ).annotate({ identifier: "DeletePrivateGraphEndpointInput" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.Any.pipe(S.optional));
    case 1:
      return S.suspend(() =>
        S.Struct({
          graphIdentifier: S.String.pipe(T.HttpHeader("graphIdentifier"), T.HostLabel()),
          queryString: S.String,
          language: S.String,
          parameters: S.optional(__S(288, __c18, 0)),
          planCache: S.optional(S.String),
          explainMode: S.optional(S.String),
          queryTimeoutMilliseconds: S.optional(S.Number),
        })
          .pipe(S.encodeKeys({ queryString: "query", explainMode: "explain" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/queries" }),
              svc,
              auth,
              proto,
              ver,
              rules,
              T.StaticContextParams({ ApiType: { value: "DataPlane" } }),
            ),
          ),
      ).annotate({ identifier: "ExecuteQueryInput" });
    case 2:
      return S.suspend(() =>
        S.Struct({ payload: T.StreamingOutput.pipe(T.HttpPayload()) }),
      ).annotate({ identifier: "ExecuteQueryOutput" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ taskIdentifier: S.String.pipe(T.HttpLabel("taskIdentifier")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/exporttasks/{taskIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ ApiType: { value: "ControlPlane" } }),
          ),
        ),
      ).annotate({ identifier: "GetExportTaskInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          timeElapsedSeconds: S.Number,
          progressPercentage: S.Number,
          numVerticesWritten: S.optional(S.Number),
          numEdgesWritten: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ExportTaskDetails" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          graphId: S.String,
          roleArn: S.String,
          taskId: S.String,
          status: S.String,
          format: S.String,
          destination: S.String,
          kmsKeyIdentifier: S.String,
          parquetType: S.optional(S.String),
          statusReason: S.optional(S.String),
          exportTaskDetails: S.optional(__S(305, __c19, 1)),
          exportFilter: S.optional(__S(324, __c20, 4)),
        }),
      ).annotate({ identifier: "GetExportTaskOutput" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          outputType: S.optional(S.String),
          sourcePropertyName: S.optional(S.String),
          multiValueHandling: S.optional(S.String),
        }),
      ).annotate({ identifier: "ExportFilterPropertyAttributes" });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ __S(320, __c20, 0).pipe(S.optional));
    case 2:
      return S.suspend(() => S.Struct({ properties: S.optional(__S(321, __c20, 1)) })).annotate({
        identifier: "ExportFilterElement",
      });
    case 3:
      return S.Record(S.String, /*@__PURE__*/ __S(322, __c20, 2).pipe(S.optional));
    case 4:
      return S.suspend(() =>
        S.Struct({
          vertexFilter: S.optional(__S(323, __c20, 3)),
          edgeFilter: S.optional(__S(323, __c20, 3)),
        }),
      ).annotate({ identifier: "ExportFilter" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ graphIdentifier: S.String.pipe(T.HttpLabel("graphIdentifier")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/graphs/{graphIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ ApiType: { value: "ControlPlane" } }),
          ),
        ),
      ).annotate({ identifier: "GetGraphInput" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ snapshotIdentifier: S.String.pipe(T.HttpLabel("snapshotIdentifier")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/snapshots/{snapshotIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ ApiType: { value: "ControlPlane" } }),
          ),
        ),
      ).annotate({ identifier: "GetGraphSnapshotInput" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          graphIdentifier: S.String.pipe(T.HttpHeader("graphIdentifier"), T.HostLabel()),
          mode: S.optional(S.String).pipe(T.HttpQuery("mode")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/summary" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ ApiType: { value: "DataPlane" } }),
          ),
        ),
      ).annotate({ identifier: "GetGraphSummaryInput" });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ S.Number.pipe(S.optional));
    case 2:
      return S.Array(__S(369, __c23, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          count: S.optional(S.Number),
          nodeProperties: S.optional(__S(208, __c13, 0)),
          distinctOutgoingEdgeLabels: S.optional(__S(208, __c13, 0)),
        }),
      ).annotate({ identifier: "NodeStructure" });
    case 4:
      return S.Array(__S(371, __c23, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ count: S.optional(S.Number), edgeProperties: S.optional(__S(208, __c13, 0)) }),
      ).annotate({ identifier: "EdgeStructure" });
    case 6:
      return S.Array(__S(373, __c23, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          numNodes: S.optional(S.Number),
          numEdges: S.optional(S.Number),
          numNodeLabels: S.optional(S.Number),
          numEdgeLabels: S.optional(S.Number),
          nodeLabels: S.optional(__S(208, __c13, 0)),
          edgeLabels: S.optional(__S(208, __c13, 0)),
          numNodeProperties: S.optional(S.Number),
          numEdgeProperties: S.optional(S.Number),
          nodeProperties: S.optional(__S(370, __c23, 2)),
          edgeProperties: S.optional(__S(370, __c23, 2)),
          totalNodePropertyValues: S.optional(S.Number),
          totalEdgePropertyValues: S.optional(S.Number),
          nodeStructures: S.optional(__S(372, __c23, 4)),
          edgeStructures: S.optional(__S(374, __c23, 6)),
        }),
      ).annotate({ identifier: "GraphDataSummary" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          version: S.optional(S.String),
          lastStatisticsComputationTime: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ),
          graphSummary: S.optional(__S(375, __c23, 7)),
        }),
      ).annotate({ identifier: "GetGraphSummaryOutput" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ taskIdentifier: S.String.pipe(T.HttpLabel("taskIdentifier")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/importtasks/{taskIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ ApiType: { value: "ControlPlane" } }),
          ),
        ),
      ).annotate({ identifier: "GetImportTaskInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          status: S.String,
          startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          timeElapsedSeconds: S.Number,
          progressPercentage: S.Number,
          errorCount: S.Number,
          errorDetails: S.optional(S.String),
          statementCount: S.Number,
          dictionaryEntryCount: S.Number,
        }),
      ).annotate({ identifier: "ImportTaskDetails" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          graphId: S.optional(S.String),
          taskId: S.String,
          source: S.String,
          format: S.optional(S.String),
          parquetType: S.optional(S.String),
          roleArn: S.String,
          status: S.String,
          importOptions: S.optional(__S(161, __c10, 1)),
          importTaskDetails: S.optional(__S(385, __c24, 1)),
          attemptNumber: S.optional(S.Number),
          statusReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetImportTaskOutput" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          graphIdentifier: S.String.pipe(T.HttpLabel("graphIdentifier")),
          vpcId: S.String.pipe(T.HttpLabel("vpcId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/graphs/{graphIdentifier}/endpoints/{vpcId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ ApiType: { value: "ControlPlane" } }),
          ),
        ),
      ).annotate({ identifier: "GetPrivateGraphEndpointInput" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          graphIdentifier: S.String.pipe(T.HttpHeader("graphIdentifier"), T.HostLabel()),
          queryId: S.String.pipe(T.HttpLabel("queryId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/queries/{queryId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ ApiType: { value: "DataPlane" } }),
          ),
        ),
      ).annotate({ identifier: "GetQueryInput" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          queryString: S.optional(S.String),
          waited: S.optional(S.Number),
          elapsed: S.optional(S.Number),
          state: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetQueryOutput" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          graphIdentifier: S.optional(S.String).pipe(T.HttpQuery("graphIdentifier")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/exporttasks" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ ApiType: { value: "ControlPlane" } }),
          ),
        ),
      ).annotate({ identifier: "ListExportTasksInput" });
    case 1:
      return S.Array(__S(720, __c45, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ tasks: __S(449, __c28, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListExportTasksOutput" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/graphs" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ ApiType: { value: "ControlPlane" } }),
          ),
        ),
      ).annotate({ identifier: "ListGraphsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          name: S.String,
          arn: S.String,
          status: S.optional(S.String),
          provisionedMemory: S.optional(S.Number),
          publicConnectivity: S.optional(S.Boolean),
          endpoint: S.optional(S.String),
          replicaCount: S.optional(S.Number),
          kmsKeyIdentifier: S.optional(S.String),
          deletionProtection: S.optional(S.Boolean),
          computeConfiguration: S.optional(__S(82, __c5, 2)),
        }),
      ).annotate({ identifier: "GraphSummary" });
    case 2:
      return S.Array(__S(465, __c29, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ graphs: __S(466, __c29, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListGraphsOutput" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          graphIdentifier: S.optional(S.String).pipe(T.HttpQuery("graphIdentifier")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/snapshots" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ ApiType: { value: "ControlPlane" } }),
          ),
        ),
      ).annotate({ identifier: "ListGraphSnapshotsInput" });
    case 1:
      return S.Array(__S(128, __c8, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ graphSnapshots: __S(481, __c30, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListGraphSnapshotsOutput" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          graphIdentifier: S.optional(S.String).pipe(T.HttpQuery("graphIdentifier")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/importtasks" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ ApiType: { value: "ControlPlane" } }),
          ),
        ),
      ).annotate({ identifier: "ListImportTasksInput" });
    case 1:
      return S.Array(__S(752, __c47, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ tasks: __S(497, __c31, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListImportTasksOutput" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          graphIdentifier: S.String.pipe(T.HttpLabel("graphIdentifier")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/graphs/{graphIdentifier}/endpoints/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ ApiType: { value: "ControlPlane" } }),
          ),
        ),
      ).annotate({ identifier: "ListPrivateGraphEndpointsInput" });
    case 1:
      return S.Array(__S(224, __c14, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ privateGraphEndpoints: __S(513, __c32, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListPrivateGraphEndpointsOutput" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          graphIdentifier: S.String.pipe(T.HttpHeader("graphIdentifier"), T.HostLabel()),
          maxResults: S.Number.pipe(T.HttpQuery("maxResults")),
          state: S.optional(S.String).pipe(T.HttpQuery("state")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/queries" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ ApiType: { value: "DataPlane" } }),
          ),
        ),
      ).annotate({ identifier: "ListQueriesInput" });
    case 1:
      return S.Array(__S(432, __c27, 0));
    case 2:
      return S.suspend(() => S.Struct({ queries: __S(529, __c33, 1) })).annotate({
        identifier: "ListQueriesOutput",
      });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String.pipe(T.HttpLabel("resourceArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/tags/{resourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ ApiType: { value: "ControlPlane" } }),
          ),
        ),
      ).annotate({ identifier: "ListTagsForResourceInput" });
    case 1:
      return S.suspend(() => S.Struct({ tags: S.optional(__S(48, __c3, 0)) })).annotate({
        identifier: "ListTagsForResourceOutput",
      });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          graphIdentifier: S.String.pipe(T.HttpLabel("graphIdentifier")),
          skipSnapshot: S.Boolean,
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/graphs/{graphIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ ApiType: { value: "ControlPlane" } }),
          ),
        ),
      ).annotate({ identifier: "ResetGraphInput" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          snapshotIdentifier: S.String.pipe(T.HttpLabel("snapshotIdentifier")),
          graphName: S.String,
          provisionedMemory: S.optional(S.Number),
          computeConfiguration: S.optional(__S(82, __c5, 2)),
          deletionProtection: S.optional(S.Boolean),
          tags: S.optional(__S(48, __c3, 0)),
          replicaCount: S.optional(S.Number),
          publicConnectivity: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/snapshots/{snapshotIdentifier}/restore" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ ApiType: { value: "ControlPlane" } }),
          ),
        ),
      ).annotate({ identifier: "RestoreGraphFromSnapshotInput" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          graphIdentifier: S.String,
          roleArn: S.String,
          format: S.String,
          destination: S.String,
          kmsKeyIdentifier: S.String,
          parquetType: S.optional(S.String),
          exportFilter: S.optional(__S(324, __c20, 4)),
          tags: S.optional(__S(48, __c3, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/exporttasks" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ ApiType: { value: "ControlPlane" } }),
          ),
        ),
      ).annotate({ identifier: "StartExportTaskInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          graphId: S.String,
          roleArn: S.String,
          taskId: S.String,
          status: S.String,
          format: S.String,
          destination: S.String,
          kmsKeyIdentifier: S.String,
          parquetType: S.optional(S.String),
          statusReason: S.optional(S.String),
          exportFilter: S.optional(__S(324, __c20, 4)),
        }),
      ).annotate({ identifier: "StartExportTaskOutput" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ graphIdentifier: S.String.pipe(T.HttpLabel("graphIdentifier")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/graphs/{graphIdentifier}/start" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ ApiType: { value: "ControlPlane" } }),
          ),
        ),
      ).annotate({ identifier: "StartGraphInput" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          importOptions: S.optional(__S(161, __c10, 1)),
          failOnError: S.optional(S.Boolean),
          source: S.String,
          format: S.optional(S.String),
          parquetType: S.optional(S.String),
          blankNodeHandling: S.optional(S.String),
          graphIdentifier: S.String.pipe(T.HttpLabel("graphIdentifier")),
          roleArn: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/graphs/{graphIdentifier}/importtasks" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ ApiType: { value: "ControlPlane" } }),
          ),
        ),
      ).annotate({ identifier: "StartImportTaskInput" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ graphIdentifier: S.String.pipe(T.HttpLabel("graphIdentifier")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/graphs/{graphIdentifier}/stop" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ ApiType: { value: "ControlPlane" } }),
          ),
        ),
      ).annotate({ identifier: "StopGraphInput" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tags: __S(48, __c3, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/tags/{resourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ ApiType: { value: "ControlPlane" } }),
          ),
        ),
      ).annotate({ identifier: "TagResourceInput" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tagKeys: __S(208, __c13, 0).pipe(T.HttpQuery("tagKeys")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/tags/{resourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ ApiType: { value: "ControlPlane" } }),
          ),
        ),
      ).annotate({ identifier: "UntagResourceInput" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          graphIdentifier: S.String.pipe(T.HttpLabel("graphIdentifier")),
          publicConnectivity: S.optional(S.Boolean),
          provisionedMemory: S.optional(S.Number),
          computeConfiguration: S.optional(__S(82, __c5, 2)),
          deletionProtection: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/graphs/{graphIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ ApiType: { value: "ControlPlane" } }),
          ),
        ),
      ).annotate({ identifier: "UpdateGraphInput" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ taskIdentifier: S.String.pipe(T.HttpLabel("taskIdentifier")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/exporttasks/{taskIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ ApiType: { value: "ControlPlane" } }),
          ),
        ),
      ).annotate({ identifier: "CancelExportTaskInput" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          graphId: S.String,
          roleArn: S.String,
          taskId: S.String,
          status: S.String,
          format: S.String,
          destination: S.String,
          kmsKeyIdentifier: S.String,
          parquetType: S.optional(S.String),
          statusReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "CancelExportTaskOutput" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ taskIdentifier: S.String.pipe(T.HttpLabel("taskIdentifier")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/importtasks/{taskIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ ApiType: { value: "ControlPlane" } }),
          ),
        ),
      ).annotate({ identifier: "CancelImportTaskInput" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          graphId: S.optional(S.String),
          taskId: S.String,
          source: S.String,
          format: S.optional(S.String),
          parquetType: S.optional(S.String),
          roleArn: S.String,
          status: S.String,
        }),
      ).annotate({ identifier: "CancelImportTaskOutput" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
