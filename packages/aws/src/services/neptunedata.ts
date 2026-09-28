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
  sdkId: "neptunedata",
  target: "AmazonNeptuneDataplane",
  version: "2023-08-01",
  sigv4: "neptune-db",
  protocol: restJson1Protocol,
  rules: (p, _) => {
    const { Region, UseDualStack = false, UseFIPS = false, Endpoint } = p;
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
              return e(
                `https://neptune-db-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://neptune-db-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://neptune-db.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://neptune-db.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError("AccessDeniedException", ["AuthError"], {
    status: 403,
  })<{
    readonly detailedMessage: string;
    readonly requestId: string;
    readonly code: string;
    readonly message?: string;
  }> {}
export class BadRequestException
  extends /*@__PURE__*/ TE.TaggedError(
    "BadRequestException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly detailedMessage: string;
    readonly requestId: string;
    readonly code: string;
    readonly message?: string;
  }> {}
export class BulkLoadIdNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "BulkLoadIdNotFoundException",
    ["BadRequestError", "RetryableError"],
    { status: 404 },
  )<{
    readonly detailedMessage: string;
    readonly requestId: string;
    readonly code: string;
    readonly message?: string;
  }> {}
export class CancelledByUserException
  extends /*@__PURE__*/ TE.TaggedError(
    "CancelledByUserException",
    ["ServerError"],
    { status: 500 },
  )<{
    readonly detailedMessage: string;
    readonly requestId: string;
    readonly code: string;
    readonly message?: string;
  }> {}
export class ClientTimeoutException
  extends /*@__PURE__*/ TE.TaggedError(
    "ClientTimeoutException",
    ["TimeoutError", "RetryableError"],
    { status: 408 },
  )<{
    readonly detailedMessage: string;
    readonly requestId: string;
    readonly code: string;
    readonly message?: string;
  }> {}
export class ConcurrentModificationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ConcurrentModificationException",
    ["ServerError", "RetryableError"],
    { status: 500 },
  )<{
    readonly detailedMessage: string;
    readonly requestId: string;
    readonly code: string;
    readonly message?: string;
  }> {}
export class ConstraintViolationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ConstraintViolationException",
    ["BadRequestError", "RetryableError"],
    { status: 400 },
  )<{
    readonly detailedMessage: string;
    readonly requestId: string;
    readonly code: string;
    readonly message?: string;
  }> {}
export class ExpiredStreamException
  extends /*@__PURE__*/ TE.TaggedError(
    "ExpiredStreamException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly detailedMessage: string;
    readonly requestId: string;
    readonly code: string;
    readonly message?: string;
  }> {}
export class FailureByQueryException
  extends /*@__PURE__*/ TE.TaggedError(
    "FailureByQueryException",
    ["ServerError", "RetryableError"],
    { status: 500 },
  )<{
    readonly detailedMessage: string;
    readonly requestId: string;
    readonly code: string;
    readonly message?: string;
  }> {}
export class IllegalArgumentException
  extends /*@__PURE__*/ TE.TaggedError(
    "IllegalArgumentException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly detailedMessage: string;
    readonly requestId: string;
    readonly code: string;
    readonly message?: string;
  }> {}
export class InternalFailureException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalFailureException",
    ["ServerError"],
    { status: 500 },
  )<{
    readonly detailedMessage: string;
    readonly requestId: string;
    readonly code: string;
    readonly message?: string;
  }> {}
export class InvalidArgumentException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidArgumentException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly detailedMessage: string;
    readonly requestId: string;
    readonly code: string;
    readonly message?: string;
  }> {}
export class InvalidNumericDataException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidNumericDataException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly detailedMessage: string;
    readonly requestId: string;
    readonly code: string;
    readonly message?: string;
  }> {}
export class InvalidParameterException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidParameterException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly detailedMessage: string;
    readonly requestId: string;
    readonly code: string;
    readonly message?: string;
  }> {}
export class LoadUrlAccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError(
    "LoadUrlAccessDeniedException",
    ["BadRequestError", "AuthError"],
    { status: 400 },
  )<{
    readonly detailedMessage: string;
    readonly requestId: string;
    readonly code: string;
    readonly message?: string;
  }> {}
export class MalformedQueryException
  extends /*@__PURE__*/ TE.TaggedError(
    "MalformedQueryException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly detailedMessage: string;
    readonly requestId: string;
    readonly code: string;
    readonly message?: string;
  }> {}
export class MemoryLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "MemoryLimitExceededException",
    ["ServerError", "RetryableError"],
    { status: 500 },
  )<{
    readonly detailedMessage: string;
    readonly requestId: string;
    readonly code: string;
    readonly message?: string;
  }> {}
export class MethodNotAllowedException
  extends /*@__PURE__*/ TE.TaggedError(
    "MethodNotAllowedException",
    ["BadRequestError"],
    { status: 405 },
  )<{
    readonly detailedMessage: string;
    readonly requestId: string;
    readonly code: string;
    readonly message?: string;
  }> {}
export class MissingParameterException
  extends /*@__PURE__*/ TE.TaggedError(
    "MissingParameterException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly detailedMessage: string;
    readonly requestId: string;
    readonly code: string;
    readonly message?: string;
  }> {}
export class MLResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "MLResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{
    readonly detailedMessage: string;
    readonly requestId: string;
    readonly code: string;
    readonly message?: string;
  }> {}
export class ParsingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ParsingException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly detailedMessage: string;
    readonly requestId: string;
    readonly code: string;
    readonly message?: string;
  }> {}
export class PreconditionsFailedException
  extends /*@__PURE__*/ TE.TaggedError(
    "PreconditionsFailedException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly detailedMessage: string;
    readonly requestId: string;
    readonly code: string;
    readonly message?: string;
  }> {}
export class QueryLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "QueryLimitExceededException",
    ["ServerError", "RetryableError"],
    { status: 500 },
  )<{
    readonly detailedMessage: string;
    readonly requestId: string;
    readonly code: string;
    readonly message?: string;
  }> {}
export class QueryLimitException
  extends /*@__PURE__*/ TE.TaggedError(
    "QueryLimitException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly detailedMessage: string;
    readonly requestId: string;
    readonly code: string;
    readonly message?: string;
  }> {}
export class QueryTooLargeException
  extends /*@__PURE__*/ TE.TaggedError(
    "QueryTooLargeException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly detailedMessage: string;
    readonly requestId: string;
    readonly code: string;
    readonly message?: string;
  }> {}
export class ReadOnlyViolationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ReadOnlyViolationException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly detailedMessage: string;
    readonly requestId: string;
    readonly code: string;
    readonly message?: string;
  }> {}
export class S3Exception
  extends /*@__PURE__*/ TE.TaggedError(
    "S3Exception",
    ["BadRequestError", "RetryableError"],
    { status: 400 },
  )<{
    readonly detailedMessage: string;
    readonly requestId: string;
    readonly code: string;
    readonly message?: string;
  }> {}
export class ServerShutdownException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServerShutdownException",
    ["ServerError"],
    { status: 500 },
  )<{
    readonly detailedMessage: string;
    readonly requestId: string;
    readonly code: string;
    readonly message?: string;
  }> {}
export class StatisticsNotAvailableException
  extends /*@__PURE__*/ TE.TaggedError(
    "StatisticsNotAvailableException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly detailedMessage: string;
    readonly requestId: string;
    readonly code: string;
    readonly message?: string;
  }> {}
export class StreamRecordsNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "StreamRecordsNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{
    readonly detailedMessage: string;
    readonly requestId: string;
    readonly code: string;
    readonly message?: string;
  }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ServerError", "RetryableError"],
    { status: 500 },
  )<{
    readonly detailedMessage: string;
    readonly requestId: string;
    readonly code: string;
    readonly message?: string;
  }> {}
export class TimeLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "TimeLimitExceededException",
    ["ServerError", "RetryableError"],
    { status: 500 },
  )<{
    readonly detailedMessage: string;
    readonly requestId: string;
    readonly code: string;
    readonly message?: string;
  }> {}
export class TooManyRequestsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyRequestsException",
    ["ThrottlingError", "RetryableError"],
    { status: 429 },
  )<{
    readonly detailedMessage: string;
    readonly requestId: string;
    readonly code: string;
    readonly message?: string;
  }> {}
export class UnsupportedOperationException
  extends /*@__PURE__*/ TE.TaggedError(
    "UnsupportedOperationException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly detailedMessage: string;
    readonly requestId: string;
    readonly code: string;
    readonly message?: string;
  }> {}
export interface CancelGremlinQueryInput {
  queryId: string;
}
export interface CancelGremlinQueryOutput {
  status?: string;
}
export interface CancelLoaderJobInput {
  loadId: string;
}
export interface CancelLoaderJobOutput {
  status?: string;
}
export interface CancelMLDataProcessingJobInput {
  id: string;
  neptuneIamRoleArn?: string;
  clean?: boolean;
}
export interface CancelMLDataProcessingJobOutput {
  status?: string;
}
export interface CancelMLModelTrainingJobInput {
  id: string;
  neptuneIamRoleArn?: string;
  clean?: boolean;
}
export interface CancelMLModelTrainingJobOutput {
  status?: string;
}
export interface CancelMLModelTransformJobInput {
  id: string;
  neptuneIamRoleArn?: string;
  clean?: boolean;
}
export interface CancelMLModelTransformJobOutput {
  status?: string;
}
export interface CancelOpenCypherQueryInput {
  queryId: string;
  silent?: boolean;
}
export interface CancelOpenCypherQueryOutput {
  status?: string;
  payload?: boolean;
}
export interface CreateMLEndpointInput {
  id?: string;
  mlModelTrainingJobId?: string;
  mlModelTransformJobId?: string;
  update?: boolean;
  neptuneIamRoleArn?: string;
  modelName?: string;
  instanceType?: string;
  instanceCount?: number;
  volumeEncryptionKMSKey?: string;
}
export interface CreateMLEndpointOutput {
  id?: string;
  arn?: string;
  creationTimeInMillis?: number;
}
export interface DeleteMLEndpointInput {
  id: string;
  neptuneIamRoleArn?: string;
  clean?: boolean;
}
export interface DeleteMLEndpointOutput {
  status?: string;
}
export interface DeletePropertygraphStatisticsRequest {}
export interface DeleteStatisticsValueMap {
  active?: boolean;
  statisticsId?: string;
}
export interface DeletePropertygraphStatisticsOutput {
  statusCode?: number;
  status?: string;
  payload?: DeleteStatisticsValueMap;
}
export interface DeleteSparqlStatisticsRequest {}
export interface DeleteSparqlStatisticsOutput {
  statusCode?: number;
  status?: string;
  payload?: DeleteStatisticsValueMap;
}
export type Action =
  | "initiateDatabaseReset"
  | "performDatabaseReset"
  | (string & {});
export interface ExecuteFastResetInput {
  action: Action;
  token?: string;
}
export interface FastResetToken {
  token?: string;
}
export interface ExecuteFastResetOutput {
  status: string;
  payload?: FastResetToken;
}
export interface ExecuteGremlinExplainQueryInput {
  gremlinQuery: string;
}
export interface ExecuteGremlinExplainQueryOutput {
  output?: T.StreamingOutputBody;
}
export interface ExecuteGremlinProfileQueryInput {
  gremlinQuery: string;
  results?: boolean;
  chop?: number;
  serializer?: string;
  indexOps?: boolean;
}
export interface ExecuteGremlinProfileQueryOutput {
  output?: T.StreamingOutputBody;
}
export interface ExecuteGremlinQueryInput {
  gremlinQuery: string;
  serializer?: string;
}
export interface GremlinQueryStatusAttributes {
  message?: string;
  code?: number;
  attributes?: any;
}
export interface ExecuteGremlinQueryOutput {
  requestId?: string;
  status?: GremlinQueryStatusAttributes;
  result?: any;
  meta?: any;
}
export type OpenCypherExplainMode =
  | "static"
  | "dynamic"
  | "details"
  | (string & {});
export interface ExecuteOpenCypherExplainQueryInput {
  openCypherQuery: string;
  parameters?: string;
  explainMode: OpenCypherExplainMode;
}
export interface ExecuteOpenCypherExplainQueryOutput {
  results: Uint8Array;
}
export interface ExecuteOpenCypherQueryInput {
  openCypherQuery: string;
  parameters?: string;
}
export interface ExecuteOpenCypherQueryOutput {
  results: any;
}
export interface GetEngineStatusRequest {}
export interface QueryLanguageVersion {
  version: string;
}
export type StringValuedMap = { [key: string]: string | undefined };
export type DocumentValuedMap = { [key: string]: any | undefined };
export interface GetEngineStatusOutput {
  status?: string;
  startTime?: string;
  dbEngineVersion?: string;
  role?: string;
  dfeQueryEngine?: string;
  gremlin?: QueryLanguageVersion;
  sparql?: QueryLanguageVersion;
  opencypher?: QueryLanguageVersion;
  labMode?: { [key: string]: string | undefined };
  rollingBackTrxCount?: number;
  rollingBackTrxEarliestStartTime?: string;
  features?: { [key: string]: any | undefined };
  settings?: { [key: string]: string | undefined };
}
export interface GetGremlinQueryStatusInput {
  queryId: string;
}
export interface QueryEvalStats {
  waited?: number;
  elapsed?: number;
  cancelled?: boolean;
  subqueries?: any;
}
export interface GetGremlinQueryStatusOutput {
  queryId?: string;
  queryString?: string;
  queryEvalStats?: QueryEvalStats;
}
export type PositiveInteger = number;
export interface GetLoaderJobStatusInput {
  loadId: string;
  details?: boolean;
  errors?: boolean;
  page?: number;
  errorsPerPage?: number;
}
export interface GetLoaderJobStatusOutput {
  status: string;
  payload: any;
}
export interface GetMLDataProcessingJobInput {
  id: string;
  neptuneIamRoleArn?: string;
}
export interface MlResourceDefinition {
  name?: string;
  arn?: string;
  status?: string;
  outputLocation?: string;
  failureReason?: string;
  cloudwatchLogUrl?: string;
}
export interface GetMLDataProcessingJobOutput {
  status?: string;
  id?: string;
  processingJob?: MlResourceDefinition;
}
export interface GetMLEndpointInput {
  id: string;
  neptuneIamRoleArn?: string;
}
export interface MlConfigDefinition {
  name?: string;
  arn?: string;
}
export interface GetMLEndpointOutput {
  status?: string;
  id?: string;
  endpoint?: MlResourceDefinition;
  endpointConfig?: MlConfigDefinition;
}
export interface GetMLModelTrainingJobInput {
  id: string;
  neptuneIamRoleArn?: string;
}
export type MlModels = MlConfigDefinition[];
export interface GetMLModelTrainingJobOutput {
  status?: string;
  id?: string;
  processingJob?: MlResourceDefinition;
  hpoJob?: MlResourceDefinition;
  modelTransformJob?: MlResourceDefinition;
  mlModels?: MlConfigDefinition[];
}
export interface GetMLModelTransformJobInput {
  id: string;
  neptuneIamRoleArn?: string;
}
export type Models = MlConfigDefinition[];
export interface GetMLModelTransformJobOutput {
  status?: string;
  id?: string;
  baseProcessingJob?: MlResourceDefinition;
  remoteModelTransformJob?: MlResourceDefinition;
  models?: MlConfigDefinition[];
}
export interface GetOpenCypherQueryStatusInput {
  queryId: string;
}
export interface GetOpenCypherQueryStatusOutput {
  queryId?: string;
  queryString?: string;
  queryEvalStats?: QueryEvalStats;
}
export interface GetPropertygraphStatisticsRequest {}
export interface StatisticsSummary {
  signatureCount?: number;
  instanceCount?: number;
  predicateCount?: number;
}
export interface Statistics {
  autoCompute?: boolean;
  active?: boolean;
  statisticsId?: string;
  date?: Date;
  note?: string;
  signatureInfo?: StatisticsSummary;
}
export interface GetPropertygraphStatisticsOutput {
  status: string;
  payload: Statistics;
}
export type IteratorType =
  | "AT_SEQUENCE_NUMBER"
  | "AFTER_SEQUENCE_NUMBER"
  | "TRIM_HORIZON"
  | "LATEST"
  | (string & {});
export type Encoding = "gzip" | (string & {});
export interface GetPropertygraphStreamInput {
  limit?: number;
  iteratorType?: IteratorType;
  commitNum?: number;
  opNum?: number;
  encoding?: Encoding;
}
export interface PropertygraphData {
  id: string;
  type: string;
  key: string;
  value: any;
  from?: string;
  to?: string;
}
export interface PropertygraphRecord {
  commitTimestampInMillis: number;
  eventId: { [key: string]: string | undefined };
  data: PropertygraphData;
  op: string;
  isLastOp?: boolean;
}
export type PropertygraphRecordsList = PropertygraphRecord[];
export interface GetPropertygraphStreamOutput {
  lastEventId: { [key: string]: string | undefined };
  lastTrxTimestampInMillis: number;
  format: string;
  records: PropertygraphRecord[];
  totalRecords: number;
}
export type GraphSummaryType = "basic" | "detailed" | (string & {});
export interface GetPropertygraphSummaryInput {
  mode?: GraphSummaryType;
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
export interface PropertygraphSummary {
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
export interface PropertygraphSummaryValueMap {
  version?: string;
  lastStatisticsComputationTime?: Date;
  graphSummary?: PropertygraphSummary;
}
export interface GetPropertygraphSummaryOutput {
  statusCode?: number;
  payload?: PropertygraphSummaryValueMap;
}
export interface GetRDFGraphSummaryInput {
  mode?: GraphSummaryType;
}
export type Classes = string[];
export type Predicates = string[];
export interface SubjectStructure {
  count?: number;
  predicates?: string[];
}
export type SubjectStructures = SubjectStructure[];
export interface RDFGraphSummary {
  numDistinctSubjects?: number;
  numDistinctPredicates?: number;
  numQuads?: number;
  numClasses?: number;
  classes?: string[];
  predicates?: { [key: string]: number | undefined }[];
  subjectStructures?: SubjectStructure[];
}
export interface RDFGraphSummaryValueMap {
  version?: string;
  lastStatisticsComputationTime?: Date;
  graphSummary?: RDFGraphSummary;
}
export interface GetRDFGraphSummaryOutput {
  statusCode?: number;
  payload?: RDFGraphSummaryValueMap;
}
export interface GetSparqlStatisticsRequest {}
export interface GetSparqlStatisticsOutput {
  status: string;
  payload: Statistics;
}
export interface GetSparqlStreamInput {
  limit?: number;
  iteratorType?: IteratorType;
  commitNum?: number;
  opNum?: number;
  encoding?: Encoding;
}
export interface SparqlData {
  stmt: string;
}
export interface SparqlRecord {
  commitTimestampInMillis: number;
  eventId: { [key: string]: string | undefined };
  data: SparqlData;
  op: string;
  isLastOp?: boolean;
}
export type SparqlRecordsList = SparqlRecord[];
export interface GetSparqlStreamOutput {
  lastEventId: { [key: string]: string | undefined };
  lastTrxTimestampInMillis: number;
  format: string;
  records: SparqlRecord[];
  totalRecords: number;
}
export interface ListGremlinQueriesInput {
  includeWaiting?: boolean;
}
export interface GremlinQueryStatus {
  queryId?: string;
  queryString?: string;
  queryEvalStats?: QueryEvalStats;
}
export type GremlinQueries = GremlinQueryStatus[];
export interface ListGremlinQueriesOutput {
  acceptedQueryCount?: number;
  runningQueryCount?: number;
  queries?: GremlinQueryStatus[];
}
export interface ListLoaderJobsInput {
  limit?: number;
  includeQueuedLoads?: boolean;
}
export type StringList = string[];
export interface LoaderIdResult {
  loadIds?: string[];
}
export interface ListLoaderJobsOutput {
  status: string;
  payload: LoaderIdResult;
}
export interface ListMLDataProcessingJobsInput {
  maxItems?: number;
  neptuneIamRoleArn?: string;
}
export interface ListMLDataProcessingJobsOutput {
  ids?: string[];
}
export interface ListMLEndpointsInput {
  maxItems?: number;
  neptuneIamRoleArn?: string;
}
export interface ListMLEndpointsOutput {
  ids?: string[];
}
export interface ListMLModelTrainingJobsInput {
  maxItems?: number;
  neptuneIamRoleArn?: string;
}
export interface ListMLModelTrainingJobsOutput {
  ids?: string[];
}
export interface ListMLModelTransformJobsInput {
  maxItems?: number;
  neptuneIamRoleArn?: string;
}
export interface ListMLModelTransformJobsOutput {
  ids?: string[];
}
export interface ListOpenCypherQueriesInput {
  includeWaiting?: boolean;
}
export type OpenCypherQueries = GremlinQueryStatus[];
export interface ListOpenCypherQueriesOutput {
  acceptedQueryCount?: number;
  runningQueryCount?: number;
  queries?: GremlinQueryStatus[];
}
export type StatisticsAutoGenerationMode =
  | "disableAutoCompute"
  | "enableAutoCompute"
  | "refresh"
  | (string & {});
export interface ManagePropertygraphStatisticsInput {
  mode?: StatisticsAutoGenerationMode;
}
export interface RefreshStatisticsIdMap {
  statisticsId?: string;
}
export interface ManagePropertygraphStatisticsOutput {
  status: string;
  payload?: RefreshStatisticsIdMap;
}
export interface ManageSparqlStatisticsInput {
  mode?: StatisticsAutoGenerationMode;
}
export interface ManageSparqlStatisticsOutput {
  status: string;
  payload?: RefreshStatisticsIdMap;
}
export type Format =
  | "csv"
  | "opencypher"
  | "ntriples"
  | "nquads"
  | "rdfxml"
  | "turtle"
  | (string & {});
export type S3BucketRegion =
  | "us-east-1"
  | "us-east-2"
  | "us-west-1"
  | "us-west-2"
  | "ca-central-1"
  | "sa-east-1"
  | "eu-north-1"
  | "eu-west-1"
  | "eu-west-2"
  | "eu-west-3"
  | "eu-central-1"
  | "me-south-1"
  | "af-south-1"
  | "ap-east-1"
  | "ap-northeast-1"
  | "ap-northeast-2"
  | "ap-southeast-1"
  | "ap-southeast-2"
  | "ap-south-1"
  | "cn-north-1"
  | "cn-northwest-1"
  | "us-gov-west-1"
  | "us-gov-east-1"
  | "ca-west-1"
  | "eu-south-2"
  | "il-central-1"
  | "me-central-1"
  | "ap-northeast-3"
  | "ap-southeast-3"
  | "ap-southeast-4"
  | "ap-southeast-5"
  | "ap-southeast-7"
  | "mx-central-1"
  | "ap-east-2"
  | "ap-south-2"
  | "eu-central-2"
  | (string & {});
export type Mode = "RESUME" | "NEW" | "AUTO" | (string & {});
export type Parallelism =
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "OVERSUBSCRIBE"
  | (string & {});
export interface StartLoaderJobInput {
  source: string;
  format: Format;
  s3BucketRegion: S3BucketRegion;
  iamRoleArn: string;
  mode?: Mode;
  failOnError?: boolean;
  parallelism?: Parallelism;
  parserConfiguration?: { [key: string]: string | undefined };
  updateSingleCardinalityProperties?: boolean;
  queueRequest?: boolean;
  dependencies?: string[];
  userProvidedEdgeIds?: boolean;
  edgeOnlyLoad?: boolean;
}
export interface StartLoaderJobOutput {
  status: string;
  payload: { [key: string]: string | undefined };
}
export interface StartMLDataProcessingJobInput {
  id?: string;
  previousDataProcessingJobId?: string;
  inputDataS3Location: string;
  processedDataS3Location: string;
  sagemakerIamRoleArn?: string;
  neptuneIamRoleArn?: string;
  processingInstanceType?: string;
  processingInstanceVolumeSizeInGB?: number;
  processingTimeOutInSeconds?: number;
  modelType?: string;
  configFileName?: string;
  subnets?: string[];
  securityGroupIds?: string[];
  volumeEncryptionKMSKey?: string;
  s3OutputEncryptionKMSKey?: string;
}
export interface StartMLDataProcessingJobOutput {
  id?: string;
  arn?: string;
  creationTimeInMillis?: number;
}
export interface CustomModelTrainingParameters {
  sourceS3DirectoryPath: string;
  trainingEntryPointScript?: string;
  transformEntryPointScript?: string;
}
export interface StartMLModelTrainingJobInput {
  id?: string;
  previousModelTrainingJobId?: string;
  dataProcessingJobId: string;
  trainModelS3Location: string;
  sagemakerIamRoleArn?: string;
  neptuneIamRoleArn?: string;
  baseProcessingInstanceType?: string;
  trainingInstanceType?: string;
  trainingInstanceVolumeSizeInGB?: number;
  trainingTimeOutInSeconds?: number;
  maxHPONumberOfTrainingJobs?: number;
  maxHPOParallelTrainingJobs?: number;
  subnets?: string[];
  securityGroupIds?: string[];
  volumeEncryptionKMSKey?: string;
  s3OutputEncryptionKMSKey?: string;
  enableManagedSpotTraining?: boolean;
  customModelTrainingParameters?: CustomModelTrainingParameters;
}
export interface StartMLModelTrainingJobOutput {
  id?: string;
  arn?: string;
  creationTimeInMillis?: number;
}
export interface CustomModelTransformParameters {
  sourceS3DirectoryPath: string;
  transformEntryPointScript?: string;
}
export interface StartMLModelTransformJobInput {
  id?: string;
  dataProcessingJobId?: string;
  mlModelTrainingJobId?: string;
  trainingJobName?: string;
  modelTransformOutputS3Location: string;
  sagemakerIamRoleArn?: string;
  neptuneIamRoleArn?: string;
  customModelTransformParameters?: CustomModelTransformParameters;
  baseProcessingInstanceType?: string;
  baseProcessingInstanceVolumeSizeInGB?: number;
  subnets?: string[];
  securityGroupIds?: string[];
  volumeEncryptionKMSKey?: string;
  s3OutputEncryptionKMSKey?: string;
}
export interface StartMLModelTransformJobOutput {
  id?: string;
  arn?: string;
  creationTimeInMillis?: number;
}
export type CancelGremlinQueryError =
  | BadRequestException
  | ClientTimeoutException
  | ConcurrentModificationException
  | ConstraintViolationException
  | FailureByQueryException
  | IllegalArgumentException
  | InvalidArgumentException
  | InvalidParameterException
  | MissingParameterException
  | ParsingException
  | PreconditionsFailedException
  | TimeLimitExceededException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Cancels a Gremlin query. See Gremlin query cancellation for more information.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:CancelQuery IAM action in that cluster.
 */
export const cancelGremlinQuery: API.OperationMethod<
  CancelGremlinQueryInput,
  CancelGremlinQueryOutput,
  CancelGremlinQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /gremlin/status/{queryId}",
    input: { queryId: 0 },
  },
  errors: [
    BadRequestException,
    ClientTimeoutException,
    ConcurrentModificationException,
    ConstraintViolationException,
    FailureByQueryException,
    IllegalArgumentException,
    InvalidArgumentException,
    InvalidParameterException,
    MissingParameterException,
    ParsingException,
    PreconditionsFailedException,
    TimeLimitExceededException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelGremlinQuery",
})) as any;

export type CancelLoaderJobError =
  | BadRequestException
  | BulkLoadIdNotFoundException
  | ClientTimeoutException
  | ConstraintViolationException
  | IllegalArgumentException
  | InternalFailureException
  | InvalidArgumentException
  | InvalidParameterException
  | LoadUrlAccessDeniedException
  | MissingParameterException
  | PreconditionsFailedException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Cancels a specified load job. This is an HTTP `DELETE` request. See Neptune Loader Get-Status API for more information.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:CancelLoaderJob IAM action in that cluster..
 */
export const cancelLoaderJob: API.OperationMethod<
  CancelLoaderJobInput,
  CancelLoaderJobOutput,
  CancelLoaderJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /loader/{loadId}",
    input: { loadId: 0 },
  },
  errors: [
    BadRequestException,
    BulkLoadIdNotFoundException,
    ClientTimeoutException,
    ConstraintViolationException,
    IllegalArgumentException,
    InternalFailureException,
    InvalidArgumentException,
    InvalidParameterException,
    LoadUrlAccessDeniedException,
    MissingParameterException,
    PreconditionsFailedException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelLoaderJob",
})) as any;

export type CancelMLDataProcessingJobError =
  | BadRequestException
  | ClientTimeoutException
  | ConstraintViolationException
  | IllegalArgumentException
  | InvalidArgumentException
  | InvalidParameterException
  | MissingParameterException
  | MLResourceNotFoundException
  | PreconditionsFailedException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Cancels a Neptune ML data processing job. See The `dataprocessing` command.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:CancelMLDataProcessingJob IAM action in that cluster.
 */
export const cancelMLDataProcessingJob: API.OperationMethod<
  CancelMLDataProcessingJobInput,
  CancelMLDataProcessingJobOutput,
  CancelMLDataProcessingJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /ml/dataprocessing/{id}",
    input: {
      id: 0,
      neptuneIamRoleArn: D.m({ query: "neptuneIamRoleArn" }),
      clean: D.m({ query: "clean" }),
    },
  },
  errors: [
    BadRequestException,
    ClientTimeoutException,
    ConstraintViolationException,
    IllegalArgumentException,
    InvalidArgumentException,
    InvalidParameterException,
    MissingParameterException,
    MLResourceNotFoundException,
    PreconditionsFailedException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelMLDataProcessingJob",
})) as any;

export type CancelMLModelTrainingJobError =
  | BadRequestException
  | ClientTimeoutException
  | ConstraintViolationException
  | IllegalArgumentException
  | InvalidArgumentException
  | InvalidParameterException
  | MissingParameterException
  | MLResourceNotFoundException
  | PreconditionsFailedException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Cancels a Neptune ML model training job. See Model training using the `modeltraining` command.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:CancelMLModelTrainingJob IAM action in that cluster.
 */
export const cancelMLModelTrainingJob: API.OperationMethod<
  CancelMLModelTrainingJobInput,
  CancelMLModelTrainingJobOutput,
  CancelMLModelTrainingJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /ml/modeltraining/{id}",
    input: {
      id: 0,
      neptuneIamRoleArn: D.m({ query: "neptuneIamRoleArn" }),
      clean: D.m({ query: "clean" }),
    },
  },
  errors: [
    BadRequestException,
    ClientTimeoutException,
    ConstraintViolationException,
    IllegalArgumentException,
    InvalidArgumentException,
    InvalidParameterException,
    MissingParameterException,
    MLResourceNotFoundException,
    PreconditionsFailedException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelMLModelTrainingJob",
})) as any;

export type CancelMLModelTransformJobError =
  | BadRequestException
  | ClientTimeoutException
  | ConstraintViolationException
  | IllegalArgumentException
  | InvalidArgumentException
  | InvalidParameterException
  | MissingParameterException
  | MLResourceNotFoundException
  | PreconditionsFailedException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Cancels a specified model transform job. See Use a trained model to generate new model artifacts.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:CancelMLModelTransformJob IAM action in that cluster.
 */
export const cancelMLModelTransformJob: API.OperationMethod<
  CancelMLModelTransformJobInput,
  CancelMLModelTransformJobOutput,
  CancelMLModelTransformJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /ml/modeltransform/{id}",
    input: {
      id: 0,
      neptuneIamRoleArn: D.m({ query: "neptuneIamRoleArn" }),
      clean: D.m({ query: "clean" }),
    },
  },
  errors: [
    BadRequestException,
    ClientTimeoutException,
    ConstraintViolationException,
    IllegalArgumentException,
    InvalidArgumentException,
    InvalidParameterException,
    MissingParameterException,
    MLResourceNotFoundException,
    PreconditionsFailedException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelMLModelTransformJob",
})) as any;

export type CancelOpenCypherQueryError =
  | BadRequestException
  | ClientTimeoutException
  | ConcurrentModificationException
  | ConstraintViolationException
  | FailureByQueryException
  | IllegalArgumentException
  | InvalidArgumentException
  | InvalidNumericDataException
  | InvalidParameterException
  | MissingParameterException
  | ParsingException
  | PreconditionsFailedException
  | TimeLimitExceededException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Cancels a specified openCypher query. See Neptune openCypher status endpoint for more information.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:CancelQuery IAM action in that cluster.
 */
export const cancelOpenCypherQuery: API.OperationMethod<
  CancelOpenCypherQueryInput,
  CancelOpenCypherQueryOutput,
  CancelOpenCypherQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /opencypher/status/{queryId}",
    input: { queryId: 0, silent: D.m({ query: "silent" }) },
  },
  errors: [
    BadRequestException,
    ClientTimeoutException,
    ConcurrentModificationException,
    ConstraintViolationException,
    FailureByQueryException,
    IllegalArgumentException,
    InvalidArgumentException,
    InvalidNumericDataException,
    InvalidParameterException,
    MissingParameterException,
    ParsingException,
    PreconditionsFailedException,
    TimeLimitExceededException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelOpenCypherQuery",
})) as any;

export type CreateMLEndpointError =
  | BadRequestException
  | ClientTimeoutException
  | ConstraintViolationException
  | IllegalArgumentException
  | InvalidArgumentException
  | InvalidParameterException
  | MissingParameterException
  | MLResourceNotFoundException
  | PreconditionsFailedException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Creates a new Neptune ML inference endpoint that lets you query one specific model that the model-training process constructed. See Managing inference endpoints using the endpoints command.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:CreateMLEndpoint IAM action in that cluster.
 */
export const createMLEndpoint: API.OperationMethod<
  CreateMLEndpointInput,
  CreateMLEndpointOutput,
  CreateMLEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /ml/endpoints",
    input: {
      id: 0,
      mlModelTrainingJobId: 0,
      mlModelTransformJobId: 0,
      update: 0,
      neptuneIamRoleArn: 0,
      modelName: 0,
      instanceType: 0,
      instanceCount: 0,
      volumeEncryptionKMSKey: 0,
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ClientTimeoutException,
    ConstraintViolationException,
    IllegalArgumentException,
    InvalidArgumentException,
    InvalidParameterException,
    MissingParameterException,
    MLResourceNotFoundException,
    PreconditionsFailedException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMLEndpoint",
})) as any;

export type DeleteMLEndpointError =
  | BadRequestException
  | ClientTimeoutException
  | ConstraintViolationException
  | IllegalArgumentException
  | InvalidArgumentException
  | InvalidParameterException
  | MissingParameterException
  | MLResourceNotFoundException
  | PreconditionsFailedException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Cancels the creation of a Neptune ML inference endpoint. See Managing inference endpoints using the endpoints command.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:DeleteMLEndpoint IAM action in that cluster.
 */
export const deleteMLEndpoint: API.OperationMethod<
  DeleteMLEndpointInput,
  DeleteMLEndpointOutput,
  DeleteMLEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /ml/endpoints/{id}",
    input: {
      id: 0,
      neptuneIamRoleArn: D.m({ query: "neptuneIamRoleArn" }),
      clean: D.m({ query: "clean" }),
    },
  },
  errors: [
    BadRequestException,
    ClientTimeoutException,
    ConstraintViolationException,
    IllegalArgumentException,
    InvalidArgumentException,
    InvalidParameterException,
    MissingParameterException,
    MLResourceNotFoundException,
    PreconditionsFailedException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMLEndpoint",
})) as any;

export type DeletePropertygraphStatisticsError =
  | AccessDeniedException
  | BadRequestException
  | ClientTimeoutException
  | ConstraintViolationException
  | IllegalArgumentException
  | InvalidArgumentException
  | InvalidParameterException
  | MissingParameterException
  | PreconditionsFailedException
  | ReadOnlyViolationException
  | StatisticsNotAvailableException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Deletes statistics for Gremlin and openCypher (property graph) data.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:DeleteStatistics IAM action in that cluster.
 */
export const deletePropertygraphStatistics: API.OperationMethod<
  DeletePropertygraphStatisticsRequest,
  DeletePropertygraphStatisticsOutput,
  DeletePropertygraphStatisticsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /propertygraph/statistics",
    output: { statusCode: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    ClientTimeoutException,
    ConstraintViolationException,
    IllegalArgumentException,
    InvalidArgumentException,
    InvalidParameterException,
    MissingParameterException,
    PreconditionsFailedException,
    ReadOnlyViolationException,
    StatisticsNotAvailableException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePropertygraphStatistics",
})) as any;

export type DeleteSparqlStatisticsError =
  | AccessDeniedException
  | BadRequestException
  | ClientTimeoutException
  | ConstraintViolationException
  | IllegalArgumentException
  | InvalidArgumentException
  | InvalidParameterException
  | MissingParameterException
  | PreconditionsFailedException
  | ReadOnlyViolationException
  | StatisticsNotAvailableException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Deletes SPARQL statistics
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:DeleteStatistics IAM action in that cluster.
 */
export const deleteSparqlStatistics: API.OperationMethod<
  DeleteSparqlStatisticsRequest,
  DeleteSparqlStatisticsOutput,
  DeleteSparqlStatisticsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /sparql/statistics",
    output: { statusCode: D.m({ status: true }) },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    ClientTimeoutException,
    ConstraintViolationException,
    IllegalArgumentException,
    InvalidArgumentException,
    InvalidParameterException,
    MissingParameterException,
    PreconditionsFailedException,
    ReadOnlyViolationException,
    StatisticsNotAvailableException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSparqlStatistics",
})) as any;

export type ExecuteFastResetError =
  | AccessDeniedException
  | ClientTimeoutException
  | ConstraintViolationException
  | IllegalArgumentException
  | InvalidArgumentException
  | InvalidParameterException
  | MethodNotAllowedException
  | MissingParameterException
  | PreconditionsFailedException
  | ReadOnlyViolationException
  | ServerShutdownException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * The fast reset REST API lets you reset a Neptune graph quicky and easily, removing all of its data.
 *
 * Neptune fast reset is a two-step process. First you call `ExecuteFastReset` with `action` set to `initiateDatabaseReset`. This returns a UUID token which you then include when calling `ExecuteFastReset` again with `action` set to `performDatabaseReset`. See Empty an Amazon Neptune DB cluster using the fast reset API.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:ResetDatabase IAM action in that cluster.
 */
export const executeFastReset: API.OperationMethod<
  ExecuteFastResetInput,
  ExecuteFastResetOutput,
  ExecuteFastResetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /system",
    input: { action: 0, token: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ClientTimeoutException,
    ConstraintViolationException,
    IllegalArgumentException,
    InvalidArgumentException,
    InvalidParameterException,
    MethodNotAllowedException,
    MissingParameterException,
    PreconditionsFailedException,
    ReadOnlyViolationException,
    ServerShutdownException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExecuteFastReset",
})) as any;

export type ExecuteGremlinExplainQueryError =
  | BadRequestException
  | CancelledByUserException
  | ClientTimeoutException
  | ConcurrentModificationException
  | ConstraintViolationException
  | FailureByQueryException
  | IllegalArgumentException
  | InvalidArgumentException
  | InvalidParameterException
  | MalformedQueryException
  | MemoryLimitExceededException
  | MissingParameterException
  | ParsingException
  | PreconditionsFailedException
  | QueryLimitExceededException
  | QueryLimitException
  | QueryTooLargeException
  | TimeLimitExceededException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Executes a Gremlin Explain query.
 *
 * Amazon Neptune has added a Gremlin feature named `explain` that provides is a self-service tool for understanding the execution approach being taken by the Neptune engine for the query. You invoke it by adding an `explain` parameter to an HTTP call that submits a Gremlin query.
 *
 * The explain feature provides information about the logical structure of query execution plans. You can use this information to identify potential evaluation and execution bottlenecks and to tune your query, as explained in Tuning Gremlin queries. You can also use query hints to improve query execution plans.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows one of the following IAM actions in that cluster, depending on the query:
 *
 * - neptune-db:ReadDataViaQuery
 *
 * - neptune-db:WriteDataViaQuery
 *
 * - neptune-db:DeleteDataViaQuery
 *
 * Note that the neptune-db:QueryLanguage:Gremlin IAM condition key can be used in the policy document to restrict the use of Gremlin queries (see Condition keys available in Neptune IAM data-access policy statements).
 */
export const executeGremlinExplainQuery: API.OperationMethod<
  ExecuteGremlinExplainQueryInput,
  ExecuteGremlinExplainQueryOutput,
  ExecuteGremlinExplainQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /gremlin/explain",
    input: { gremlinQuery: D.m({ wire: "gremlin" }) },
    output: { output: D.m({ payload: true, shape: D.stream }) },
    body: true,
  },
  errors: [
    BadRequestException,
    CancelledByUserException,
    ClientTimeoutException,
    ConcurrentModificationException,
    ConstraintViolationException,
    FailureByQueryException,
    IllegalArgumentException,
    InvalidArgumentException,
    InvalidParameterException,
    MalformedQueryException,
    MemoryLimitExceededException,
    MissingParameterException,
    ParsingException,
    PreconditionsFailedException,
    QueryLimitExceededException,
    QueryLimitException,
    QueryTooLargeException,
    TimeLimitExceededException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExecuteGremlinExplainQuery",
})) as any;

export type ExecuteGremlinProfileQueryError =
  | BadRequestException
  | CancelledByUserException
  | ClientTimeoutException
  | ConcurrentModificationException
  | ConstraintViolationException
  | FailureByQueryException
  | IllegalArgumentException
  | InvalidArgumentException
  | InvalidParameterException
  | MalformedQueryException
  | MemoryLimitExceededException
  | MissingParameterException
  | ParsingException
  | PreconditionsFailedException
  | QueryLimitExceededException
  | QueryLimitException
  | QueryTooLargeException
  | TimeLimitExceededException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Executes a Gremlin Profile query, which runs a specified traversal, collects various metrics about the run, and produces a profile report as output. See Gremlin profile API in Neptune for details.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:ReadDataViaQuery IAM action in that cluster.
 *
 * Note that the neptune-db:QueryLanguage:Gremlin IAM condition key can be used in the policy document to restrict the use of Gremlin queries (see Condition keys available in Neptune IAM data-access policy statements).
 */
export const executeGremlinProfileQuery: API.OperationMethod<
  ExecuteGremlinProfileQueryInput,
  ExecuteGremlinProfileQueryOutput,
  ExecuteGremlinProfileQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /gremlin/profile",
    input: {
      gremlinQuery: D.m({ wire: "gremlin" }),
      results: D.m({ wire: "profile.results" }),
      chop: D.m({ wire: "profile.chop" }),
      serializer: D.m({ wire: "profile.serializer" }),
      indexOps: D.m({ wire: "profile.indexOps" }),
    },
    output: { output: D.m({ payload: true, shape: D.stream }) },
    body: true,
  },
  errors: [
    BadRequestException,
    CancelledByUserException,
    ClientTimeoutException,
    ConcurrentModificationException,
    ConstraintViolationException,
    FailureByQueryException,
    IllegalArgumentException,
    InvalidArgumentException,
    InvalidParameterException,
    MalformedQueryException,
    MemoryLimitExceededException,
    MissingParameterException,
    ParsingException,
    PreconditionsFailedException,
    QueryLimitExceededException,
    QueryLimitException,
    QueryTooLargeException,
    TimeLimitExceededException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExecuteGremlinProfileQuery",
})) as any;

export type ExecuteGremlinQueryError =
  | BadRequestException
  | CancelledByUserException
  | ClientTimeoutException
  | ConcurrentModificationException
  | ConstraintViolationException
  | FailureByQueryException
  | IllegalArgumentException
  | InvalidArgumentException
  | InvalidParameterException
  | MalformedQueryException
  | MemoryLimitExceededException
  | MissingParameterException
  | ParsingException
  | PreconditionsFailedException
  | QueryLimitExceededException
  | QueryLimitException
  | QueryTooLargeException
  | TimeLimitExceededException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * This commands executes a Gremlin query. Amazon Neptune is compatible with Apache TinkerPop3 and Gremlin, so you can use the Gremlin traversal language to query the graph, as described under The Graph in the Apache TinkerPop3 documentation. More details can also be found in Accessing a Neptune graph with Gremlin.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that enables one of the following IAM actions in that cluster, depending on the query:
 *
 * - neptune-db:ReadDataViaQuery
 *
 * - neptune-db:WriteDataViaQuery
 *
 * - neptune-db:DeleteDataViaQuery
 *
 * Note that the neptune-db:QueryLanguage:Gremlin IAM condition key can be used in the policy document to restrict the use of Gremlin queries (see Condition keys available in Neptune IAM data-access policy statements).
 */
export const executeGremlinQuery: API.OperationMethod<
  ExecuteGremlinQueryInput,
  ExecuteGremlinQueryOutput,
  ExecuteGremlinQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /gremlin",
    input: {
      gremlinQuery: D.m({ wire: "gremlin" }),
      serializer: D.m({ header: "accept" }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    CancelledByUserException,
    ClientTimeoutException,
    ConcurrentModificationException,
    ConstraintViolationException,
    FailureByQueryException,
    IllegalArgumentException,
    InvalidArgumentException,
    InvalidParameterException,
    MalformedQueryException,
    MemoryLimitExceededException,
    MissingParameterException,
    ParsingException,
    PreconditionsFailedException,
    QueryLimitExceededException,
    QueryLimitException,
    QueryTooLargeException,
    TimeLimitExceededException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExecuteGremlinQuery",
})) as any;

export type ExecuteOpenCypherExplainQueryError =
  | BadRequestException
  | CancelledByUserException
  | ClientTimeoutException
  | ConcurrentModificationException
  | ConstraintViolationException
  | FailureByQueryException
  | IllegalArgumentException
  | InvalidArgumentException
  | InvalidNumericDataException
  | InvalidParameterException
  | MalformedQueryException
  | MemoryLimitExceededException
  | MissingParameterException
  | ParsingException
  | PreconditionsFailedException
  | QueryLimitExceededException
  | QueryLimitException
  | QueryTooLargeException
  | TimeLimitExceededException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Executes an openCypher `explain` request. See The openCypher explain feature for more information.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:ReadDataViaQuery IAM action in that cluster.
 *
 * Note that the neptune-db:QueryLanguage:OpenCypher IAM condition key can be used in the policy document to restrict the use of openCypher queries (see Condition keys available in Neptune IAM data-access policy statements).
 */
export const executeOpenCypherExplainQuery: API.OperationMethod<
  ExecuteOpenCypherExplainQueryInput,
  ExecuteOpenCypherExplainQueryOutput,
  ExecuteOpenCypherExplainQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /opencypher/explain",
    input: {
      openCypherQuery: D.m({ wire: "query" }),
      parameters: 0,
      explainMode: D.m({ wire: "explain" }),
    },
    output: { results: D.m({ payload: true, shape: D.blob }) },
    body: true,
  },
  errors: [
    BadRequestException,
    CancelledByUserException,
    ClientTimeoutException,
    ConcurrentModificationException,
    ConstraintViolationException,
    FailureByQueryException,
    IllegalArgumentException,
    InvalidArgumentException,
    InvalidNumericDataException,
    InvalidParameterException,
    MalformedQueryException,
    MemoryLimitExceededException,
    MissingParameterException,
    ParsingException,
    PreconditionsFailedException,
    QueryLimitExceededException,
    QueryLimitException,
    QueryTooLargeException,
    TimeLimitExceededException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExecuteOpenCypherExplainQuery",
})) as any;

export type ExecuteOpenCypherQueryError =
  | BadRequestException
  | CancelledByUserException
  | ClientTimeoutException
  | ConcurrentModificationException
  | ConstraintViolationException
  | FailureByQueryException
  | IllegalArgumentException
  | InvalidArgumentException
  | InvalidNumericDataException
  | InvalidParameterException
  | MalformedQueryException
  | MemoryLimitExceededException
  | MissingParameterException
  | ParsingException
  | PreconditionsFailedException
  | QueryLimitExceededException
  | QueryLimitException
  | QueryTooLargeException
  | TimeLimitExceededException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Executes an openCypher query. See Accessing the Neptune Graph with openCypher for more information.
 *
 * Neptune supports building graph applications using openCypher, which is currently one of the most popular query languages among developers working with graph databases. Developers, business analysts, and data scientists like openCypher's declarative, SQL-inspired syntax because it provides a familiar structure in which to querying property graphs.
 *
 * The openCypher language was originally developed by Neo4j, then open-sourced in 2015 and contributed to the openCypher project under an Apache 2 open-source license.
 *
 * Note that when invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows one of the following IAM actions in that cluster, depending on the query:
 *
 * - neptune-db:ReadDataViaQuery
 *
 * - neptune-db:WriteDataViaQuery
 *
 * - neptune-db:DeleteDataViaQuery
 *
 * Note also that the neptune-db:QueryLanguage:OpenCypher IAM condition key can be used in the policy document to restrict the use of openCypher queries (see Condition keys available in Neptune IAM data-access policy statements).
 */
export const executeOpenCypherQuery: API.OperationMethod<
  ExecuteOpenCypherQueryInput,
  ExecuteOpenCypherQueryOutput,
  ExecuteOpenCypherQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /opencypher",
    input: { openCypherQuery: D.m({ wire: "query" }), parameters: 0 },
    body: true,
  },
  errors: [
    BadRequestException,
    CancelledByUserException,
    ClientTimeoutException,
    ConcurrentModificationException,
    ConstraintViolationException,
    FailureByQueryException,
    IllegalArgumentException,
    InvalidArgumentException,
    InvalidNumericDataException,
    InvalidParameterException,
    MalformedQueryException,
    MemoryLimitExceededException,
    MissingParameterException,
    ParsingException,
    PreconditionsFailedException,
    QueryLimitExceededException,
    QueryLimitException,
    QueryTooLargeException,
    TimeLimitExceededException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExecuteOpenCypherQuery",
})) as any;

export type GetEngineStatusError =
  | ClientTimeoutException
  | ConstraintViolationException
  | IllegalArgumentException
  | InternalFailureException
  | InvalidArgumentException
  | PreconditionsFailedException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Retrieves the status of the graph database on the host.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:GetEngineStatus IAM action in that cluster.
 */
export const getEngineStatus: API.OperationMethod<
  GetEngineStatusRequest,
  GetEngineStatusOutput,
  GetEngineStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "GET /status" },
  errors: [
    ClientTimeoutException,
    ConstraintViolationException,
    IllegalArgumentException,
    InternalFailureException,
    InvalidArgumentException,
    PreconditionsFailedException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEngineStatus",
})) as any;

export type GetGremlinQueryStatusError =
  | AccessDeniedException
  | BadRequestException
  | ClientTimeoutException
  | ConcurrentModificationException
  | ConstraintViolationException
  | FailureByQueryException
  | IllegalArgumentException
  | InvalidArgumentException
  | InvalidParameterException
  | MissingParameterException
  | ParsingException
  | PreconditionsFailedException
  | ReadOnlyViolationException
  | TimeLimitExceededException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Gets the status of a specified Gremlin query.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:GetQueryStatus IAM action in that cluster.
 *
 * Note that the neptune-db:QueryLanguage:Gremlin IAM condition key can be used in the policy document to restrict the use of Gremlin queries (see Condition keys available in Neptune IAM data-access policy statements).
 */
export const getGremlinQueryStatus: API.OperationMethod<
  GetGremlinQueryStatusInput,
  GetGremlinQueryStatusOutput,
  GetGremlinQueryStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /gremlin/status/{queryId}",
    input: { queryId: 0 },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    ClientTimeoutException,
    ConcurrentModificationException,
    ConstraintViolationException,
    FailureByQueryException,
    IllegalArgumentException,
    InvalidArgumentException,
    InvalidParameterException,
    MissingParameterException,
    ParsingException,
    PreconditionsFailedException,
    ReadOnlyViolationException,
    TimeLimitExceededException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGremlinQueryStatus",
})) as any;

export type GetLoaderJobStatusError =
  | BadRequestException
  | BulkLoadIdNotFoundException
  | ClientTimeoutException
  | ConstraintViolationException
  | IllegalArgumentException
  | InternalFailureException
  | InvalidArgumentException
  | InvalidParameterException
  | LoadUrlAccessDeniedException
  | MissingParameterException
  | PreconditionsFailedException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Gets status information about a specified load job. Neptune keeps track of the most recent 1,024 bulk load jobs, and stores the last 10,000 error details per job.
 *
 * See Neptune Loader Get-Status API for more information.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:GetLoaderJobStatus IAM action in that cluster..
 */
export const getLoaderJobStatus: API.OperationMethod<
  GetLoaderJobStatusInput,
  GetLoaderJobStatusOutput,
  GetLoaderJobStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /loader/{loadId}",
    input: {
      loadId: 0,
      details: D.m({ query: "details" }),
      errors: D.m({ query: "errors" }),
      page: D.m({ query: "page" }),
      errorsPerPage: D.m({ query: "errorsPerPage" }),
    },
  },
  errors: [
    BadRequestException,
    BulkLoadIdNotFoundException,
    ClientTimeoutException,
    ConstraintViolationException,
    IllegalArgumentException,
    InternalFailureException,
    InvalidArgumentException,
    InvalidParameterException,
    LoadUrlAccessDeniedException,
    MissingParameterException,
    PreconditionsFailedException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLoaderJobStatus",
})) as any;

export type GetMLDataProcessingJobError =
  | BadRequestException
  | ClientTimeoutException
  | ConstraintViolationException
  | IllegalArgumentException
  | InvalidArgumentException
  | InvalidParameterException
  | MissingParameterException
  | MLResourceNotFoundException
  | PreconditionsFailedException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Retrieves information about a specified data processing job. See The `dataprocessing` command.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:neptune-db:GetMLDataProcessingJobStatus IAM action in that cluster.
 */
export const getMLDataProcessingJob: API.OperationMethod<
  GetMLDataProcessingJobInput,
  GetMLDataProcessingJobOutput,
  GetMLDataProcessingJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /ml/dataprocessing/{id}",
    input: { id: 0, neptuneIamRoleArn: D.m({ query: "neptuneIamRoleArn" }) },
  },
  errors: [
    BadRequestException,
    ClientTimeoutException,
    ConstraintViolationException,
    IllegalArgumentException,
    InvalidArgumentException,
    InvalidParameterException,
    MissingParameterException,
    MLResourceNotFoundException,
    PreconditionsFailedException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMLDataProcessingJob",
})) as any;

export type GetMLEndpointError =
  | BadRequestException
  | ClientTimeoutException
  | ConstraintViolationException
  | IllegalArgumentException
  | InvalidArgumentException
  | InvalidParameterException
  | MissingParameterException
  | MLResourceNotFoundException
  | PreconditionsFailedException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Retrieves details about an inference endpoint. See Managing inference endpoints using the endpoints command.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:GetMLEndpointStatus IAM action in that cluster.
 */
export const getMLEndpoint: API.OperationMethod<
  GetMLEndpointInput,
  GetMLEndpointOutput,
  GetMLEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /ml/endpoints/{id}",
    input: { id: 0, neptuneIamRoleArn: D.m({ query: "neptuneIamRoleArn" }) },
  },
  errors: [
    BadRequestException,
    ClientTimeoutException,
    ConstraintViolationException,
    IllegalArgumentException,
    InvalidArgumentException,
    InvalidParameterException,
    MissingParameterException,
    MLResourceNotFoundException,
    PreconditionsFailedException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMLEndpoint",
})) as any;

export type GetMLModelTrainingJobError =
  | BadRequestException
  | ClientTimeoutException
  | ConstraintViolationException
  | IllegalArgumentException
  | InvalidArgumentException
  | InvalidParameterException
  | MissingParameterException
  | MLResourceNotFoundException
  | PreconditionsFailedException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Retrieves information about a Neptune ML model training job. See Model training using the `modeltraining` command.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:GetMLModelTrainingJobStatus IAM action in that cluster.
 */
export const getMLModelTrainingJob: API.OperationMethod<
  GetMLModelTrainingJobInput,
  GetMLModelTrainingJobOutput,
  GetMLModelTrainingJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /ml/modeltraining/{id}",
    input: { id: 0, neptuneIamRoleArn: D.m({ query: "neptuneIamRoleArn" }) },
  },
  errors: [
    BadRequestException,
    ClientTimeoutException,
    ConstraintViolationException,
    IllegalArgumentException,
    InvalidArgumentException,
    InvalidParameterException,
    MissingParameterException,
    MLResourceNotFoundException,
    PreconditionsFailedException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMLModelTrainingJob",
})) as any;

export type GetMLModelTransformJobError =
  | BadRequestException
  | ClientTimeoutException
  | ConstraintViolationException
  | IllegalArgumentException
  | InvalidArgumentException
  | InvalidParameterException
  | MissingParameterException
  | MLResourceNotFoundException
  | PreconditionsFailedException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Gets information about a specified model transform job. See Use a trained model to generate new model artifacts.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:GetMLModelTransformJobStatus IAM action in that cluster.
 */
export const getMLModelTransformJob: API.OperationMethod<
  GetMLModelTransformJobInput,
  GetMLModelTransformJobOutput,
  GetMLModelTransformJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /ml/modeltransform/{id}",
    input: { id: 0, neptuneIamRoleArn: D.m({ query: "neptuneIamRoleArn" }) },
  },
  errors: [
    BadRequestException,
    ClientTimeoutException,
    ConstraintViolationException,
    IllegalArgumentException,
    InvalidArgumentException,
    InvalidParameterException,
    MissingParameterException,
    MLResourceNotFoundException,
    PreconditionsFailedException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMLModelTransformJob",
})) as any;

export type GetOpenCypherQueryStatusError =
  | AccessDeniedException
  | BadRequestException
  | ClientTimeoutException
  | ConcurrentModificationException
  | ConstraintViolationException
  | FailureByQueryException
  | IllegalArgumentException
  | InvalidArgumentException
  | InvalidNumericDataException
  | InvalidParameterException
  | MissingParameterException
  | ParsingException
  | PreconditionsFailedException
  | ReadOnlyViolationException
  | TimeLimitExceededException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Retrieves the status of a specified openCypher query.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:GetQueryStatus IAM action in that cluster.
 *
 * Note that the neptune-db:QueryLanguage:OpenCypher IAM condition key can be used in the policy document to restrict the use of openCypher queries (see Condition keys available in Neptune IAM data-access policy statements).
 */
export const getOpenCypherQueryStatus: API.OperationMethod<
  GetOpenCypherQueryStatusInput,
  GetOpenCypherQueryStatusOutput,
  GetOpenCypherQueryStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /opencypher/status/{queryId}",
    input: { queryId: 0 },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    ClientTimeoutException,
    ConcurrentModificationException,
    ConstraintViolationException,
    FailureByQueryException,
    IllegalArgumentException,
    InvalidArgumentException,
    InvalidNumericDataException,
    InvalidParameterException,
    MissingParameterException,
    ParsingException,
    PreconditionsFailedException,
    ReadOnlyViolationException,
    TimeLimitExceededException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOpenCypherQueryStatus",
})) as any;

export type GetPropertygraphStatisticsError =
  | AccessDeniedException
  | BadRequestException
  | ClientTimeoutException
  | ConstraintViolationException
  | IllegalArgumentException
  | InvalidArgumentException
  | InvalidParameterException
  | MissingParameterException
  | PreconditionsFailedException
  | ReadOnlyViolationException
  | StatisticsNotAvailableException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Gets property graph statistics (Gremlin and openCypher).
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:GetStatisticsStatus IAM action in that cluster.
 */
export const getPropertygraphStatistics: API.OperationMethod<
  GetPropertygraphStatisticsRequest,
  GetPropertygraphStatisticsOutput,
  GetPropertygraphStatisticsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /propertygraph/statistics",
    output: { payload: o_Statistics },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    ClientTimeoutException,
    ConstraintViolationException,
    IllegalArgumentException,
    InvalidArgumentException,
    InvalidParameterException,
    MissingParameterException,
    PreconditionsFailedException,
    ReadOnlyViolationException,
    StatisticsNotAvailableException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPropertygraphStatistics",
})) as any;

export type GetPropertygraphStreamError =
  | ClientTimeoutException
  | ConstraintViolationException
  | ExpiredStreamException
  | IllegalArgumentException
  | InvalidArgumentException
  | InvalidParameterException
  | MemoryLimitExceededException
  | PreconditionsFailedException
  | StreamRecordsNotFoundException
  | ThrottlingException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Gets a stream for a property graph.
 *
 * With the Neptune Streams feature, you can generate a complete sequence of change-log entries that record every change made to your graph data as it happens. `GetPropertygraphStream` lets you collect these change-log entries for a property graph.
 *
 * The Neptune streams feature needs to be enabled on your Neptune DBcluster. To enable streams, set the neptune_streams DB cluster parameter to `1`.
 *
 * See Capturing graph changes in real time using Neptune streams.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:GetStreamRecords IAM action in that cluster.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that enables one of the following IAM actions, depending on the query:
 *
 * Note that you can restrict property-graph queries using the following IAM context keys:
 *
 * - neptune-db:QueryLanguage:Gremlin
 *
 * - neptune-db:QueryLanguage:OpenCypher
 *
 * See Condition keys available in Neptune IAM data-access policy statements).
 */
export const getPropertygraphStream: API.OperationMethod<
  GetPropertygraphStreamInput,
  GetPropertygraphStreamOutput,
  GetPropertygraphStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /propertygraph/stream",
    input: {
      limit: D.m({ query: "limit" }),
      iteratorType: D.m({ query: "iteratorType" }),
      commitNum: D.m({ query: "commitNum" }),
      opNum: D.m({ query: "opNum" }),
      encoding: D.m({ header: "Accept-Encoding" }),
    },
    output: {
      lastTrxTimestampInMillis: D.m({ wire: "lastTrxTimestamp" }),
      records: D.list({
        commitTimestampInMillis: D.m({ wire: "commitTimestamp" }),
      }),
    },
  },
  errors: [
    ClientTimeoutException,
    ConstraintViolationException,
    ExpiredStreamException,
    IllegalArgumentException,
    InvalidArgumentException,
    InvalidParameterException,
    MemoryLimitExceededException,
    PreconditionsFailedException,
    StreamRecordsNotFoundException,
    ThrottlingException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPropertygraphStream",
})) as any;

export type GetPropertygraphSummaryError =
  | AccessDeniedException
  | BadRequestException
  | ClientTimeoutException
  | ConstraintViolationException
  | IllegalArgumentException
  | InvalidArgumentException
  | InvalidParameterException
  | MissingParameterException
  | PreconditionsFailedException
  | ReadOnlyViolationException
  | StatisticsNotAvailableException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Gets a graph summary for a property graph.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:GetGraphSummary IAM action in that cluster.
 */
export const getPropertygraphSummary: API.OperationMethod<
  GetPropertygraphSummaryInput,
  GetPropertygraphSummaryOutput,
  GetPropertygraphSummaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /propertygraph/statistics/summary",
    input: { mode: D.m({ query: "mode" }) },
    output: {
      statusCode: D.m({ status: true }),
      payload: { lastStatisticsComputationTime: D.ts },
    },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    ClientTimeoutException,
    ConstraintViolationException,
    IllegalArgumentException,
    InvalidArgumentException,
    InvalidParameterException,
    MissingParameterException,
    PreconditionsFailedException,
    ReadOnlyViolationException,
    StatisticsNotAvailableException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPropertygraphSummary",
})) as any;

export type GetRDFGraphSummaryError =
  | AccessDeniedException
  | BadRequestException
  | ClientTimeoutException
  | ConstraintViolationException
  | IllegalArgumentException
  | InvalidArgumentException
  | InvalidParameterException
  | MissingParameterException
  | PreconditionsFailedException
  | ReadOnlyViolationException
  | StatisticsNotAvailableException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Gets a graph summary for an RDF graph.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:GetGraphSummary IAM action in that cluster.
 */
export const getRDFGraphSummary: API.OperationMethod<
  GetRDFGraphSummaryInput,
  GetRDFGraphSummaryOutput,
  GetRDFGraphSummaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /rdf/statistics/summary",
    input: { mode: D.m({ query: "mode" }) },
    output: {
      statusCode: D.m({ status: true }),
      payload: { lastStatisticsComputationTime: D.ts },
    },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    ClientTimeoutException,
    ConstraintViolationException,
    IllegalArgumentException,
    InvalidArgumentException,
    InvalidParameterException,
    MissingParameterException,
    PreconditionsFailedException,
    ReadOnlyViolationException,
    StatisticsNotAvailableException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRDFGraphSummary",
})) as any;

export type GetSparqlStatisticsError =
  | AccessDeniedException
  | BadRequestException
  | ClientTimeoutException
  | ConstraintViolationException
  | IllegalArgumentException
  | InvalidArgumentException
  | InvalidParameterException
  | MissingParameterException
  | PreconditionsFailedException
  | ReadOnlyViolationException
  | StatisticsNotAvailableException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Gets RDF statistics (SPARQL).
 */
export const getSparqlStatistics: API.OperationMethod<
  GetSparqlStatisticsRequest,
  GetSparqlStatisticsOutput,
  GetSparqlStatisticsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /sparql/statistics",
    output: { payload: o_Statistics },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    ClientTimeoutException,
    ConstraintViolationException,
    IllegalArgumentException,
    InvalidArgumentException,
    InvalidParameterException,
    MissingParameterException,
    PreconditionsFailedException,
    ReadOnlyViolationException,
    StatisticsNotAvailableException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSparqlStatistics",
})) as any;

export type GetSparqlStreamError =
  | ClientTimeoutException
  | ConstraintViolationException
  | ExpiredStreamException
  | IllegalArgumentException
  | InvalidArgumentException
  | InvalidParameterException
  | MemoryLimitExceededException
  | PreconditionsFailedException
  | StreamRecordsNotFoundException
  | ThrottlingException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Gets a stream for an RDF graph.
 *
 * With the Neptune Streams feature, you can generate a complete sequence of change-log entries that record every change made to your graph data as it happens. `GetSparqlStream` lets you collect these change-log entries for an RDF graph.
 *
 * The Neptune streams feature needs to be enabled on your Neptune DBcluster. To enable streams, set the neptune_streams DB cluster parameter to `1`.
 *
 * See Capturing graph changes in real time using Neptune streams.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:GetStreamRecords IAM action in that cluster.
 *
 * Note that the neptune-db:QueryLanguage:Sparql IAM condition key can be used in the policy document to restrict the use of SPARQL queries (see Condition keys available in Neptune IAM data-access policy statements).
 */
export const getSparqlStream: API.OperationMethod<
  GetSparqlStreamInput,
  GetSparqlStreamOutput,
  GetSparqlStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /sparql/stream",
    input: {
      limit: D.m({ query: "limit" }),
      iteratorType: D.m({ query: "iteratorType" }),
      commitNum: D.m({ query: "commitNum" }),
      opNum: D.m({ query: "opNum" }),
      encoding: D.m({ header: "Accept-Encoding" }),
    },
    output: {
      lastTrxTimestampInMillis: D.m({ wire: "lastTrxTimestamp" }),
      records: D.list({
        commitTimestampInMillis: D.m({ wire: "commitTimestamp" }),
      }),
    },
  },
  errors: [
    ClientTimeoutException,
    ConstraintViolationException,
    ExpiredStreamException,
    IllegalArgumentException,
    InvalidArgumentException,
    InvalidParameterException,
    MemoryLimitExceededException,
    PreconditionsFailedException,
    StreamRecordsNotFoundException,
    ThrottlingException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSparqlStream",
})) as any;

export type ListGremlinQueriesError =
  | AccessDeniedException
  | BadRequestException
  | ClientTimeoutException
  | ConcurrentModificationException
  | ConstraintViolationException
  | FailureByQueryException
  | IllegalArgumentException
  | InvalidArgumentException
  | InvalidParameterException
  | MissingParameterException
  | ParsingException
  | PreconditionsFailedException
  | ReadOnlyViolationException
  | TimeLimitExceededException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Lists active Gremlin queries. See Gremlin query status API for details about the output.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:GetQueryStatus IAM action in that cluster.
 *
 * Note that the neptune-db:QueryLanguage:Gremlin IAM condition key can be used in the policy document to restrict the use of Gremlin queries (see Condition keys available in Neptune IAM data-access policy statements).
 */
export const listGremlinQueries: API.OperationMethod<
  ListGremlinQueriesInput,
  ListGremlinQueriesOutput,
  ListGremlinQueriesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /gremlin/status",
    input: { includeWaiting: D.m({ query: "includeWaiting" }) },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    ClientTimeoutException,
    ConcurrentModificationException,
    ConstraintViolationException,
    FailureByQueryException,
    IllegalArgumentException,
    InvalidArgumentException,
    InvalidParameterException,
    MissingParameterException,
    ParsingException,
    PreconditionsFailedException,
    ReadOnlyViolationException,
    TimeLimitExceededException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGremlinQueries",
})) as any;

export type ListLoaderJobsError =
  | BadRequestException
  | BulkLoadIdNotFoundException
  | ClientTimeoutException
  | ConstraintViolationException
  | IllegalArgumentException
  | InternalFailureException
  | InvalidArgumentException
  | InvalidParameterException
  | LoadUrlAccessDeniedException
  | PreconditionsFailedException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Retrieves a list of the `loadIds` for all active loader jobs.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:ListLoaderJobs IAM action in that cluster..
 */
export const listLoaderJobs: API.OperationMethod<
  ListLoaderJobsInput,
  ListLoaderJobsOutput,
  ListLoaderJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /loader",
    input: {
      limit: D.m({ query: "limit" }),
      includeQueuedLoads: D.m({ query: "includeQueuedLoads" }),
    },
  },
  errors: [
    BadRequestException,
    BulkLoadIdNotFoundException,
    ClientTimeoutException,
    ConstraintViolationException,
    IllegalArgumentException,
    InternalFailureException,
    InvalidArgumentException,
    InvalidParameterException,
    LoadUrlAccessDeniedException,
    PreconditionsFailedException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLoaderJobs",
})) as any;

export type ListMLDataProcessingJobsError =
  | BadRequestException
  | ClientTimeoutException
  | ConstraintViolationException
  | IllegalArgumentException
  | InvalidArgumentException
  | InvalidParameterException
  | MissingParameterException
  | MLResourceNotFoundException
  | PreconditionsFailedException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Returns a list of Neptune ML data processing jobs. See Listing active data-processing jobs using the Neptune ML dataprocessing command.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:ListMLDataProcessingJobs IAM action in that cluster.
 */
export const listMLDataProcessingJobs: API.OperationMethod<
  ListMLDataProcessingJobsInput,
  ListMLDataProcessingJobsOutput,
  ListMLDataProcessingJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /ml/dataprocessing",
    input: {
      maxItems: D.m({ query: "maxItems" }),
      neptuneIamRoleArn: D.m({ query: "neptuneIamRoleArn" }),
    },
  },
  errors: [
    BadRequestException,
    ClientTimeoutException,
    ConstraintViolationException,
    IllegalArgumentException,
    InvalidArgumentException,
    InvalidParameterException,
    MissingParameterException,
    MLResourceNotFoundException,
    PreconditionsFailedException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMLDataProcessingJobs",
})) as any;

export type ListMLEndpointsError =
  | BadRequestException
  | ClientTimeoutException
  | ConstraintViolationException
  | IllegalArgumentException
  | InvalidArgumentException
  | InvalidParameterException
  | MissingParameterException
  | MLResourceNotFoundException
  | PreconditionsFailedException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Lists existing inference endpoints. See Managing inference endpoints using the endpoints command.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:ListMLEndpoints IAM action in that cluster.
 */
export const listMLEndpoints: API.OperationMethod<
  ListMLEndpointsInput,
  ListMLEndpointsOutput,
  ListMLEndpointsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /ml/endpoints",
    input: {
      maxItems: D.m({ query: "maxItems" }),
      neptuneIamRoleArn: D.m({ query: "neptuneIamRoleArn" }),
    },
  },
  errors: [
    BadRequestException,
    ClientTimeoutException,
    ConstraintViolationException,
    IllegalArgumentException,
    InvalidArgumentException,
    InvalidParameterException,
    MissingParameterException,
    MLResourceNotFoundException,
    PreconditionsFailedException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMLEndpoints",
})) as any;

export type ListMLModelTrainingJobsError =
  | BadRequestException
  | ClientTimeoutException
  | ConstraintViolationException
  | IllegalArgumentException
  | InvalidArgumentException
  | InvalidParameterException
  | MissingParameterException
  | MLResourceNotFoundException
  | PreconditionsFailedException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Lists Neptune ML model-training jobs. See Model training using the `modeltraining` command.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:neptune-db:ListMLModelTrainingJobs IAM action in that cluster.
 */
export const listMLModelTrainingJobs: API.OperationMethod<
  ListMLModelTrainingJobsInput,
  ListMLModelTrainingJobsOutput,
  ListMLModelTrainingJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /ml/modeltraining",
    input: {
      maxItems: D.m({ query: "maxItems" }),
      neptuneIamRoleArn: D.m({ query: "neptuneIamRoleArn" }),
    },
  },
  errors: [
    BadRequestException,
    ClientTimeoutException,
    ConstraintViolationException,
    IllegalArgumentException,
    InvalidArgumentException,
    InvalidParameterException,
    MissingParameterException,
    MLResourceNotFoundException,
    PreconditionsFailedException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMLModelTrainingJobs",
})) as any;

export type ListMLModelTransformJobsError =
  | BadRequestException
  | ClientTimeoutException
  | ConstraintViolationException
  | IllegalArgumentException
  | InvalidArgumentException
  | InvalidParameterException
  | MissingParameterException
  | MLResourceNotFoundException
  | PreconditionsFailedException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Returns a list of model transform job IDs. See Use a trained model to generate new model artifacts.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:ListMLModelTransformJobs IAM action in that cluster.
 */
export const listMLModelTransformJobs: API.OperationMethod<
  ListMLModelTransformJobsInput,
  ListMLModelTransformJobsOutput,
  ListMLModelTransformJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /ml/modeltransform",
    input: {
      maxItems: D.m({ query: "maxItems" }),
      neptuneIamRoleArn: D.m({ query: "neptuneIamRoleArn" }),
    },
  },
  errors: [
    BadRequestException,
    ClientTimeoutException,
    ConstraintViolationException,
    IllegalArgumentException,
    InvalidArgumentException,
    InvalidParameterException,
    MissingParameterException,
    MLResourceNotFoundException,
    PreconditionsFailedException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMLModelTransformJobs",
})) as any;

export type ListOpenCypherQueriesError =
  | AccessDeniedException
  | BadRequestException
  | ClientTimeoutException
  | ConcurrentModificationException
  | ConstraintViolationException
  | FailureByQueryException
  | IllegalArgumentException
  | InvalidArgumentException
  | InvalidNumericDataException
  | InvalidParameterException
  | MissingParameterException
  | ParsingException
  | PreconditionsFailedException
  | ReadOnlyViolationException
  | TimeLimitExceededException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Lists active openCypher queries. See Neptune openCypher status endpoint for more information.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:GetQueryStatus IAM action in that cluster.
 *
 * Note that the neptune-db:QueryLanguage:OpenCypher IAM condition key can be used in the policy document to restrict the use of openCypher queries (see Condition keys available in Neptune IAM data-access policy statements).
 */
export const listOpenCypherQueries: API.OperationMethod<
  ListOpenCypherQueriesInput,
  ListOpenCypherQueriesOutput,
  ListOpenCypherQueriesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /opencypher/status",
    input: { includeWaiting: D.m({ query: "includeWaiting" }) },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    ClientTimeoutException,
    ConcurrentModificationException,
    ConstraintViolationException,
    FailureByQueryException,
    IllegalArgumentException,
    InvalidArgumentException,
    InvalidNumericDataException,
    InvalidParameterException,
    MissingParameterException,
    ParsingException,
    PreconditionsFailedException,
    ReadOnlyViolationException,
    TimeLimitExceededException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOpenCypherQueries",
})) as any;

export type ManagePropertygraphStatisticsError =
  | AccessDeniedException
  | BadRequestException
  | ClientTimeoutException
  | ConstraintViolationException
  | IllegalArgumentException
  | InvalidArgumentException
  | InvalidParameterException
  | MissingParameterException
  | PreconditionsFailedException
  | ReadOnlyViolationException
  | StatisticsNotAvailableException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Manages the generation and use of property graph statistics.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:ManageStatistics IAM action in that cluster.
 */
export const managePropertygraphStatistics: API.OperationMethod<
  ManagePropertygraphStatisticsInput,
  ManagePropertygraphStatisticsOutput,
  ManagePropertygraphStatisticsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /propertygraph/statistics",
    input: { mode: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    ClientTimeoutException,
    ConstraintViolationException,
    IllegalArgumentException,
    InvalidArgumentException,
    InvalidParameterException,
    MissingParameterException,
    PreconditionsFailedException,
    ReadOnlyViolationException,
    StatisticsNotAvailableException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ManagePropertygraphStatistics",
})) as any;

export type ManageSparqlStatisticsError =
  | AccessDeniedException
  | BadRequestException
  | ClientTimeoutException
  | ConstraintViolationException
  | IllegalArgumentException
  | InvalidArgumentException
  | InvalidParameterException
  | MissingParameterException
  | PreconditionsFailedException
  | ReadOnlyViolationException
  | StatisticsNotAvailableException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Manages the generation and use of RDF graph statistics.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:ManageStatistics IAM action in that cluster.
 */
export const manageSparqlStatistics: API.OperationMethod<
  ManageSparqlStatisticsInput,
  ManageSparqlStatisticsOutput,
  ManageSparqlStatisticsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /sparql/statistics",
    input: { mode: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    ClientTimeoutException,
    ConstraintViolationException,
    IllegalArgumentException,
    InvalidArgumentException,
    InvalidParameterException,
    MissingParameterException,
    PreconditionsFailedException,
    ReadOnlyViolationException,
    StatisticsNotAvailableException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ManageSparqlStatistics",
})) as any;

export type StartLoaderJobError =
  | BadRequestException
  | BulkLoadIdNotFoundException
  | ClientTimeoutException
  | ConstraintViolationException
  | IllegalArgumentException
  | InternalFailureException
  | InvalidArgumentException
  | InvalidParameterException
  | LoadUrlAccessDeniedException
  | MissingParameterException
  | PreconditionsFailedException
  | S3Exception
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Starts a Neptune bulk loader job to load data from an Amazon S3 bucket into a Neptune DB instance. See Using the Amazon Neptune Bulk Loader to Ingest Data.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:StartLoaderJob IAM action in that cluster.
 */
export const startLoaderJob: API.OperationMethod<
  StartLoaderJobInput,
  StartLoaderJobOutput,
  StartLoaderJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /loader",
    input: {
      source: 0,
      format: 0,
      s3BucketRegion: D.m({ wire: "region" }),
      iamRoleArn: 0,
      mode: 0,
      failOnError: 0,
      parallelism: 0,
      parserConfiguration: 0,
      updateSingleCardinalityProperties: 0,
      queueRequest: 0,
      dependencies: 0,
      userProvidedEdgeIds: 0,
      edgeOnlyLoad: 0,
    },
    body: true,
  },
  errors: [
    BadRequestException,
    BulkLoadIdNotFoundException,
    ClientTimeoutException,
    ConstraintViolationException,
    IllegalArgumentException,
    InternalFailureException,
    InvalidArgumentException,
    InvalidParameterException,
    LoadUrlAccessDeniedException,
    MissingParameterException,
    PreconditionsFailedException,
    S3Exception,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartLoaderJob",
})) as any;

export type StartMLDataProcessingJobError =
  | BadRequestException
  | ClientTimeoutException
  | ConstraintViolationException
  | IllegalArgumentException
  | InvalidArgumentException
  | InvalidParameterException
  | MissingParameterException
  | MLResourceNotFoundException
  | PreconditionsFailedException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Creates a new Neptune ML data processing job for processing the graph data exported from Neptune for training. See The `dataprocessing` command.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:StartMLModelDataProcessingJob IAM action in that cluster.
 */
export const startMLDataProcessingJob: API.OperationMethod<
  StartMLDataProcessingJobInput,
  StartMLDataProcessingJobOutput,
  StartMLDataProcessingJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /ml/dataprocessing",
    input: {
      id: 0,
      previousDataProcessingJobId: 0,
      inputDataS3Location: 0,
      processedDataS3Location: 0,
      sagemakerIamRoleArn: 0,
      neptuneIamRoleArn: 0,
      processingInstanceType: 0,
      processingInstanceVolumeSizeInGB: 0,
      processingTimeOutInSeconds: 0,
      modelType: 0,
      configFileName: 0,
      subnets: 0,
      securityGroupIds: 0,
      volumeEncryptionKMSKey: 0,
      s3OutputEncryptionKMSKey: 0,
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ClientTimeoutException,
    ConstraintViolationException,
    IllegalArgumentException,
    InvalidArgumentException,
    InvalidParameterException,
    MissingParameterException,
    MLResourceNotFoundException,
    PreconditionsFailedException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMLDataProcessingJob",
})) as any;

export type StartMLModelTrainingJobError =
  | BadRequestException
  | ClientTimeoutException
  | ConstraintViolationException
  | IllegalArgumentException
  | InvalidArgumentException
  | InvalidParameterException
  | MissingParameterException
  | MLResourceNotFoundException
  | PreconditionsFailedException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Creates a new Neptune ML model training job. See Model training using the `modeltraining` command.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:StartMLModelTrainingJob IAM action in that cluster.
 */
export const startMLModelTrainingJob: API.OperationMethod<
  StartMLModelTrainingJobInput,
  StartMLModelTrainingJobOutput,
  StartMLModelTrainingJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /ml/modeltraining",
    input: {
      id: 0,
      previousModelTrainingJobId: 0,
      dataProcessingJobId: 0,
      trainModelS3Location: 0,
      sagemakerIamRoleArn: 0,
      neptuneIamRoleArn: 0,
      baseProcessingInstanceType: 0,
      trainingInstanceType: 0,
      trainingInstanceVolumeSizeInGB: 0,
      trainingTimeOutInSeconds: 0,
      maxHPONumberOfTrainingJobs: 0,
      maxHPOParallelTrainingJobs: 0,
      subnets: 0,
      securityGroupIds: 0,
      volumeEncryptionKMSKey: 0,
      s3OutputEncryptionKMSKey: 0,
      enableManagedSpotTraining: 0,
      customModelTrainingParameters: {
        sourceS3DirectoryPath: 0,
        trainingEntryPointScript: 0,
        transformEntryPointScript: 0,
      },
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ClientTimeoutException,
    ConstraintViolationException,
    IllegalArgumentException,
    InvalidArgumentException,
    InvalidParameterException,
    MissingParameterException,
    MLResourceNotFoundException,
    PreconditionsFailedException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMLModelTrainingJob",
})) as any;

export type StartMLModelTransformJobError =
  | BadRequestException
  | ClientTimeoutException
  | ConstraintViolationException
  | IllegalArgumentException
  | InvalidArgumentException
  | InvalidParameterException
  | MissingParameterException
  | MLResourceNotFoundException
  | PreconditionsFailedException
  | TooManyRequestsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Creates a new model transform job. See Use a trained model to generate new model artifacts.
 *
 * When invoking this operation in a Neptune cluster that has IAM authentication enabled, the IAM user or role making the request must have a policy attached that allows the neptune-db:StartMLModelTransformJob IAM action in that cluster.
 */
export const startMLModelTransformJob: API.OperationMethod<
  StartMLModelTransformJobInput,
  StartMLModelTransformJobOutput,
  StartMLModelTransformJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /ml/modeltransform",
    input: {
      id: 0,
      dataProcessingJobId: 0,
      mlModelTrainingJobId: 0,
      trainingJobName: 0,
      modelTransformOutputS3Location: 0,
      sagemakerIamRoleArn: 0,
      neptuneIamRoleArn: 0,
      customModelTransformParameters: {
        sourceS3DirectoryPath: 0,
        transformEntryPointScript: 0,
      },
      baseProcessingInstanceType: 0,
      baseProcessingInstanceVolumeSizeInGB: 0,
      subnets: 0,
      securityGroupIds: 0,
      volumeEncryptionKMSKey: 0,
      s3OutputEncryptionKMSKey: 0,
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ClientTimeoutException,
    ConstraintViolationException,
    IllegalArgumentException,
    InvalidArgumentException,
    InvalidParameterException,
    MissingParameterException,
    MLResourceNotFoundException,
    PreconditionsFailedException,
    TooManyRequestsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMLModelTransformJob",
})) as any;

const o_Statistics: D.LazyStruct = () => ({ date: D.ts });
