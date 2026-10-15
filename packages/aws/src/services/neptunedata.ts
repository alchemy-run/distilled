import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "neptunedata",
  serviceShapeName: "AmazonNeptuneDataplane",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "neptune-db" });
const ver = /*@__PURE__*/ T.ServiceVersion("2023-08-01");
const proto = /*@__PURE__*/ T.AwsProtocolsRestJson1();
const rules = /*@__PURE__*/ T.EndpointResolver((p, _) => {
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
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://neptune-db.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://neptune-db.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://neptune-db.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    {
      detailedMessage: S.String,
      requestId: S.String,
      code: S.String,
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class BadRequestException
  extends /*@__PURE__*/ S.TaggedError<BadRequestException>()(
    "BadRequestException",
    {
      detailedMessage: S.String,
      requestId: S.String,
      code: S.String,
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class BulkLoadIdNotFoundException
  extends /*@__PURE__*/ S.TaggedError<BulkLoadIdNotFoundException>()(
    "BulkLoadIdNotFoundException",
    {
      detailedMessage: S.String,
      requestId: S.String,
      code: S.String,
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(404), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withBadRequestError, C.withRetryableError) {}
export class CancelledByUserException
  extends /*@__PURE__*/ S.TaggedError<CancelledByUserException>()(
    "CancelledByUserException",
    {
      detailedMessage: S.String,
      requestId: S.String,
      code: S.String,
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ClientTimeoutException
  extends /*@__PURE__*/ S.TaggedError<ClientTimeoutException>()(
    "ClientTimeoutException",
    {
      detailedMessage: S.String,
      requestId: S.String,
      code: S.String,
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(408), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withTimeoutError, C.withRetryableError) {}
export class ConcurrentModificationException
  extends /*@__PURE__*/ S.TaggedError<ConcurrentModificationException>()(
    "ConcurrentModificationException",
    {
      detailedMessage: S.String,
      requestId: S.String,
      code: S.String,
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(500), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ConstraintViolationException
  extends /*@__PURE__*/ S.TaggedError<ConstraintViolationException>()(
    "ConstraintViolationException",
    {
      detailedMessage: S.String,
      requestId: S.String,
      code: S.String,
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(400), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withBadRequestError, C.withRetryableError) {}
export class ExpiredStreamException
  extends /*@__PURE__*/ S.TaggedError<ExpiredStreamException>()(
    "ExpiredStreamException",
    {
      detailedMessage: S.String,
      requestId: S.String,
      code: S.String,
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class FailureByQueryException
  extends /*@__PURE__*/ S.TaggedError<FailureByQueryException>()(
    "FailureByQueryException",
    {
      detailedMessage: S.String,
      requestId: S.String,
      code: S.String,
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(500), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class IllegalArgumentException
  extends /*@__PURE__*/ S.TaggedError<IllegalArgumentException>()(
    "IllegalArgumentException",
    {
      detailedMessage: S.String,
      requestId: S.String,
      code: S.String,
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InternalFailureException
  extends /*@__PURE__*/ S.TaggedError<InternalFailureException>()(
    "InternalFailureException",
    {
      detailedMessage: S.String,
      requestId: S.String,
      code: S.String,
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class InvalidArgumentException
  extends /*@__PURE__*/ S.TaggedError<InvalidArgumentException>()(
    "InvalidArgumentException",
    {
      detailedMessage: S.String,
      requestId: S.String,
      code: S.String,
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidNumericDataException
  extends /*@__PURE__*/ S.TaggedError<InvalidNumericDataException>()(
    "InvalidNumericDataException",
    {
      detailedMessage: S.String,
      requestId: S.String,
      code: S.String,
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidParameterException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterException>()(
    "InvalidParameterException",
    {
      detailedMessage: S.String,
      requestId: S.String,
      code: S.String,
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class LoadUrlAccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<LoadUrlAccessDeniedException>()(
    "LoadUrlAccessDeniedException",
    {
      detailedMessage: S.String,
      requestId: S.String,
      code: S.String,
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError, C.withAuthError) {}
export class MalformedQueryException
  extends /*@__PURE__*/ S.TaggedError<MalformedQueryException>()(
    "MalformedQueryException",
    {
      detailedMessage: S.String,
      requestId: S.String,
      code: S.String,
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class MemoryLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<MemoryLimitExceededException>()(
    "MemoryLimitExceededException",
    {
      detailedMessage: S.String,
      requestId: S.String,
      code: S.String,
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(500), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class MethodNotAllowedException
  extends /*@__PURE__*/ S.TaggedError<MethodNotAllowedException>()(
    "MethodNotAllowedException",
    {
      detailedMessage: S.String,
      requestId: S.String,
      code: S.String,
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(405),
  ).pipe(C.withBadRequestError) {}
export class MissingParameterException
  extends /*@__PURE__*/ S.TaggedError<MissingParameterException>()(
    "MissingParameterException",
    {
      detailedMessage: S.String,
      requestId: S.String,
      code: S.String,
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class MLResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<MLResourceNotFoundException>()(
    "MLResourceNotFoundException",
    {
      detailedMessage: S.String,
      requestId: S.String,
      code: S.String,
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ParsingException
  extends /*@__PURE__*/ S.TaggedError<ParsingException>()(
    "ParsingException",
    {
      detailedMessage: S.String,
      requestId: S.String,
      code: S.String,
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class PreconditionsFailedException
  extends /*@__PURE__*/ S.TaggedError<PreconditionsFailedException>()(
    "PreconditionsFailedException",
    {
      detailedMessage: S.String,
      requestId: S.String,
      code: S.String,
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class QueryLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<QueryLimitExceededException>()(
    "QueryLimitExceededException",
    {
      detailedMessage: S.String,
      requestId: S.String,
      code: S.String,
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(500), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class QueryLimitException
  extends /*@__PURE__*/ S.TaggedError<QueryLimitException>()(
    "QueryLimitException",
    {
      detailedMessage: S.String,
      requestId: S.String,
      code: S.String,
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class QueryTooLargeException
  extends /*@__PURE__*/ S.TaggedError<QueryTooLargeException>()(
    "QueryTooLargeException",
    {
      detailedMessage: S.String,
      requestId: S.String,
      code: S.String,
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ReadOnlyViolationException
  extends /*@__PURE__*/ S.TaggedError<ReadOnlyViolationException>()(
    "ReadOnlyViolationException",
    {
      detailedMessage: S.String,
      requestId: S.String,
      code: S.String,
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class S3Exception
  extends /*@__PURE__*/ S.TaggedError<S3Exception>()(
    "S3Exception",
    {
      detailedMessage: S.String,
      requestId: S.String,
      code: S.String,
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(400), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withBadRequestError, C.withRetryableError) {}
export class ServerShutdownException
  extends /*@__PURE__*/ S.TaggedError<ServerShutdownException>()(
    "ServerShutdownException",
    {
      detailedMessage: S.String,
      requestId: S.String,
      code: S.String,
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class StatisticsNotAvailableException
  extends /*@__PURE__*/ S.TaggedError<StatisticsNotAvailableException>()(
    "StatisticsNotAvailableException",
    {
      detailedMessage: S.String,
      requestId: S.String,
      code: S.String,
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class StreamRecordsNotFoundException
  extends /*@__PURE__*/ S.TaggedError<StreamRecordsNotFoundException>()(
    "StreamRecordsNotFoundException",
    {
      detailedMessage: S.String,
      requestId: S.String,
      code: S.String,
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      detailedMessage: S.String,
      requestId: S.String,
      code: S.String,
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(500), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class TimeLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<TimeLimitExceededException>()(
    "TimeLimitExceededException",
    {
      detailedMessage: S.String,
      requestId: S.String,
      code: S.String,
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(500), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class TooManyRequestsException
  extends /*@__PURE__*/ S.TaggedError<TooManyRequestsException>()(
    "TooManyRequestsException",
    {
      detailedMessage: S.String,
      requestId: S.String,
      code: S.String,
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(429), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class UnsupportedOperationException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedOperationException>()(
    "UnsupportedOperationException",
    {
      detailedMessage: S.String,
      requestId: S.String,
      code: S.String,
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
export type Action = "initiateDatabaseReset" | "performDatabaseReset" | (string & {});
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
export type OpenCypherExplainMode = "static" | "dynamic" | "details" | (string & {});
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
export type Parallelism = "LOW" | "MEDIUM" | "HIGH" | "OVERSUBSCRIBE" | (string & {});
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
  input: __S(0, __c0, 0) as any as S.Schema<CancelGremlinQueryInput>,
  output: __S(8, __c1, 0) as any as S.Schema<CancelGremlinQueryOutput>,
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
}));

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
  input: __S(16, __c2, 0) as any as S.Schema<CancelLoaderJobInput>,
  output: __S(8, __c1, 0) as any as S.Schema<CancelLoaderJobOutput>,
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
}));

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
  input: __S(24, __c3, 0) as any as S.Schema<CancelMLDataProcessingJobInput>,
  output: __S(8, __c1, 0) as any as S.Schema<CancelMLDataProcessingJobOutput>,
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
}));

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
  input: __S(32, __c4, 0) as any as S.Schema<CancelMLModelTrainingJobInput>,
  output: __S(8, __c1, 0) as any as S.Schema<CancelMLModelTrainingJobOutput>,
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
}));

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
  input: __S(40, __c5, 0) as any as S.Schema<CancelMLModelTransformJobInput>,
  output: __S(8, __c1, 0) as any as S.Schema<CancelMLModelTransformJobOutput>,
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
}));

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
  input: __S(48, __c6, 0) as any as S.Schema<CancelOpenCypherQueryInput>,
  output: __S(49, __c6, 1) as any as S.Schema<CancelOpenCypherQueryOutput>,
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
}));

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
  input: __S(56, __c7, 0) as any as S.Schema<CreateMLEndpointInput>,
  output: __S(64, __c8, 0) as any as S.Schema<CreateMLEndpointOutput>,
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
}));

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
  input: __S(72, __c9, 0) as any as S.Schema<DeleteMLEndpointInput>,
  output: __S(8, __c1, 0) as any as S.Schema<DeleteMLEndpointOutput>,
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
}));

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
  input: __S(80, __c10, 0) as any as S.Schema<DeletePropertygraphStatisticsRequest>,
  output: __S(89, __c11, 1) as any as S.Schema<DeletePropertygraphStatisticsOutput>,
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
}));

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
  input: __S(96, __c12, 0) as any as S.Schema<DeleteSparqlStatisticsRequest>,
  output: __S(89, __c11, 1) as any as S.Schema<DeleteSparqlStatisticsOutput>,
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
}));

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
  input: __S(104, __c13, 0) as any as S.Schema<ExecuteFastResetInput>,
  output: __S(106, __c13, 2) as any as S.Schema<ExecuteFastResetOutput>,
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
}));

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
  input: __S(112, __c14, 0) as any as S.Schema<ExecuteGremlinExplainQueryInput>,
  output: __S(120, __c15, 0) as any as S.Schema<ExecuteGremlinExplainQueryOutput>,
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
}));

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
  input: __S(128, __c16, 0) as any as S.Schema<ExecuteGremlinProfileQueryInput>,
  output: __S(120, __c15, 0) as any as S.Schema<ExecuteGremlinProfileQueryOutput>,
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
}));

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
  input: __S(136, __c17, 0) as any as S.Schema<ExecuteGremlinQueryInput>,
  output: __S(138, __c17, 2) as any as S.Schema<ExecuteGremlinQueryOutput>,
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
}));

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
  input: __S(144, __c18, 0) as any as S.Schema<ExecuteOpenCypherExplainQueryInput>,
  output: __S(145, __c18, 1) as any as S.Schema<ExecuteOpenCypherExplainQueryOutput>,
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
}));

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
  input: __S(152, __c19, 0) as any as S.Schema<ExecuteOpenCypherQueryInput>,
  output: __S(153, __c19, 1) as any as S.Schema<ExecuteOpenCypherQueryOutput>,
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
}));

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
  input: __S(160, __c20, 0) as any as S.Schema<GetEngineStatusRequest>,
  output: __S(163, __c20, 3) as any as S.Schema<GetEngineStatusOutput>,
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
}));

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
  input: __S(176, __c22, 0) as any as S.Schema<GetGremlinQueryStatusInput>,
  output: __S(185, __c23, 1) as any as S.Schema<GetGremlinQueryStatusOutput>,
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
}));

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
  input: __S(192, __c24, 0) as any as S.Schema<GetLoaderJobStatusInput>,
  output: __S(193, __c24, 1) as any as S.Schema<GetLoaderJobStatusOutput>,
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
}));

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
  input: __S(200, __c25, 0) as any as S.Schema<GetMLDataProcessingJobInput>,
  output: __S(201, __c25, 1) as any as S.Schema<GetMLDataProcessingJobOutput>,
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
}));

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
  input: __S(216, __c27, 0) as any as S.Schema<GetMLEndpointInput>,
  output: __S(217, __c27, 1) as any as S.Schema<GetMLEndpointOutput>,
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
}));

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
  input: __S(232, __c29, 0) as any as S.Schema<GetMLModelTrainingJobInput>,
  output: __S(233, __c29, 1) as any as S.Schema<GetMLModelTrainingJobOutput>,
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
}));

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
  input: __S(248, __c31, 0) as any as S.Schema<GetMLModelTransformJobInput>,
  output: __S(249, __c31, 1) as any as S.Schema<GetMLModelTransformJobOutput>,
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
}));

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
  input: __S(256, __c32, 0) as any as S.Schema<GetOpenCypherQueryStatusInput>,
  output: __S(185, __c23, 1) as any as S.Schema<GetOpenCypherQueryStatusOutput>,
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
}));

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
  input: __S(264, __c33, 0) as any as S.Schema<GetPropertygraphStatisticsRequest>,
  output: __S(274, __c34, 2) as any as S.Schema<GetPropertygraphStatisticsOutput>,
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
}));

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
  input: __S(280, __c35, 0) as any as S.Schema<GetPropertygraphStreamInput>,
  output: __S(284, __c35, 4) as any as S.Schema<GetPropertygraphStreamOutput>,
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
}));

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
  input: __S(288, __c36, 0) as any as S.Schema<GetPropertygraphSummaryInput>,
  output: __S(295, __c36, 7) as any as S.Schema<GetPropertygraphSummaryOutput>,
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
}));

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
  input: __S(312, __c39, 0) as any as S.Schema<GetRDFGraphSummaryInput>,
  output: __S(317, __c39, 5) as any as S.Schema<GetRDFGraphSummaryOutput>,
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
}));

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
  input: __S(320, __c40, 0) as any as S.Schema<GetSparqlStatisticsRequest>,
  output: __S(274, __c34, 2) as any as S.Schema<GetSparqlStatisticsOutput>,
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
}));

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
  input: __S(328, __c41, 0) as any as S.Schema<GetSparqlStreamInput>,
  output: __S(332, __c41, 4) as any as S.Schema<GetSparqlStreamOutput>,
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
}));

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
  input: __S(336, __c42, 0) as any as S.Schema<ListGremlinQueriesInput>,
  output: __S(345, __c43, 1) as any as S.Schema<ListGremlinQueriesOutput>,
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
}));

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
  input: __S(352, __c44, 0) as any as S.Schema<ListLoaderJobsInput>,
  output: __S(354, __c44, 2) as any as S.Schema<ListLoaderJobsOutput>,
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
}));

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
  input: __S(360, __c45, 0) as any as S.Schema<ListMLDataProcessingJobsInput>,
  output: __S(368, __c46, 0) as any as S.Schema<ListMLDataProcessingJobsOutput>,
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
}));

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
  input: __S(376, __c47, 0) as any as S.Schema<ListMLEndpointsInput>,
  output: __S(368, __c46, 0) as any as S.Schema<ListMLEndpointsOutput>,
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
}));

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
  input: __S(384, __c48, 0) as any as S.Schema<ListMLModelTrainingJobsInput>,
  output: __S(368, __c46, 0) as any as S.Schema<ListMLModelTrainingJobsOutput>,
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
}));

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
  input: __S(392, __c49, 0) as any as S.Schema<ListMLModelTransformJobsInput>,
  output: __S(368, __c46, 0) as any as S.Schema<ListMLModelTransformJobsOutput>,
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
}));

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
  input: __S(400, __c50, 0) as any as S.Schema<ListOpenCypherQueriesInput>,
  output: __S(345, __c43, 1) as any as S.Schema<ListOpenCypherQueriesOutput>,
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
}));

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
  input: __S(408, __c51, 0) as any as S.Schema<ManagePropertygraphStatisticsInput>,
  output: __S(417, __c52, 1) as any as S.Schema<ManagePropertygraphStatisticsOutput>,
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
}));

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
  input: __S(424, __c53, 0) as any as S.Schema<ManageSparqlStatisticsInput>,
  output: __S(417, __c52, 1) as any as S.Schema<ManageSparqlStatisticsOutput>,
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
}));

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
  input: __S(432, __c54, 0) as any as S.Schema<StartLoaderJobInput>,
  output: __S(433, __c54, 1) as any as S.Schema<StartLoaderJobOutput>,
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
}));

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
  input: __S(440, __c55, 0) as any as S.Schema<StartMLDataProcessingJobInput>,
  output: __S(64, __c8, 0) as any as S.Schema<StartMLDataProcessingJobOutput>,
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
}));

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
  input: __S(449, __c56, 1) as any as S.Schema<StartMLModelTrainingJobInput>,
  output: __S(64, __c8, 0) as any as S.Schema<StartMLModelTrainingJobOutput>,
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
}));

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
  input: __S(457, __c57, 1) as any as S.Schema<StartMLModelTransformJobInput>,
  output: __S(64, __c8, 0) as any as S.Schema<StartMLModelTransformJobOutput>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ queryId: S.String.pipe(T.HttpLabel("queryId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/gremlin/status/{queryId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CancelGremlinQueryInput" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ status: S.optional(S.String) })).annotate({
        identifier: "CancelGremlinQueryOutput",
      });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ loadId: S.String.pipe(T.HttpLabel("loadId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/loader/{loadId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CancelLoaderJobInput" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String.pipe(T.HttpLabel("id")),
          neptuneIamRoleArn: S.optional(S.String).pipe(T.HttpQuery("neptuneIamRoleArn")),
          clean: S.optional(S.Boolean).pipe(T.HttpQuery("clean")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/ml/dataprocessing/{id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CancelMLDataProcessingJobInput" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String.pipe(T.HttpLabel("id")),
          neptuneIamRoleArn: S.optional(S.String).pipe(T.HttpQuery("neptuneIamRoleArn")),
          clean: S.optional(S.Boolean).pipe(T.HttpQuery("clean")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/ml/modeltraining/{id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CancelMLModelTrainingJobInput" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String.pipe(T.HttpLabel("id")),
          neptuneIamRoleArn: S.optional(S.String).pipe(T.HttpQuery("neptuneIamRoleArn")),
          clean: S.optional(S.Boolean).pipe(T.HttpQuery("clean")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/ml/modeltransform/{id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CancelMLModelTransformJobInput" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          queryId: S.String.pipe(T.HttpLabel("queryId")),
          silent: S.optional(S.Boolean).pipe(T.HttpQuery("silent")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/opencypher/status/{queryId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CancelOpenCypherQueryInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ status: S.optional(S.String), payload: S.optional(S.Boolean) }),
      ).annotate({ identifier: "CancelOpenCypherQueryOutput" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          mlModelTrainingJobId: S.optional(S.String),
          mlModelTransformJobId: S.optional(S.String),
          update: S.optional(S.Boolean),
          neptuneIamRoleArn: S.optional(S.String),
          modelName: S.optional(S.String),
          instanceType: S.optional(S.String),
          instanceCount: S.optional(S.Number),
          volumeEncryptionKMSKey: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/ml/endpoints" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateMLEndpointInput" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          arn: S.optional(S.String),
          creationTimeInMillis: S.optional(S.Number),
        }),
      ).annotate({ identifier: "CreateMLEndpointOutput" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String.pipe(T.HttpLabel("id")),
          neptuneIamRoleArn: S.optional(S.String).pipe(T.HttpQuery("neptuneIamRoleArn")),
          clean: S.optional(S.Boolean).pipe(T.HttpQuery("clean")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/ml/endpoints/{id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteMLEndpointInput" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/propertygraph/statistics" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeletePropertygraphStatisticsRequest" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ active: S.optional(S.Boolean), statisticsId: S.optional(S.String) }),
      ).annotate({ identifier: "DeleteStatisticsValueMap" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          statusCode: S.optional(S.Number).pipe(T.HttpResponseCode()),
          status: S.optional(S.String),
          payload: S.optional(__S(88, __c11, 0)),
        }),
      ).annotate({ identifier: "DeletePropertygraphStatisticsOutput" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/sparql/statistics" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteSparqlStatisticsRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ action: S.String, token: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/system" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ExecuteFastResetInput" });
    case 1:
      return S.suspend(() => S.Struct({ token: S.optional(S.String) })).annotate({
        identifier: "FastResetToken",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({ status: S.String, payload: S.optional(__S(105, __c13, 1)) }),
      ).annotate({ identifier: "ExecuteFastResetOutput" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ gremlinQuery: S.String })
          .pipe(S.encodeKeys({ gremlinQuery: "gremlin" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/gremlin/explain" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "ExecuteGremlinExplainQueryInput" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ output: S.optional(T.StreamingOutput).pipe(T.HttpPayload()) }),
      ).annotate({ identifier: "ExecuteGremlinExplainQueryOutput" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          gremlinQuery: S.String,
          results: S.optional(S.Boolean),
          chop: S.optional(S.Number),
          serializer: S.optional(S.String),
          indexOps: S.optional(S.Boolean),
        })
          .pipe(
            S.encodeKeys({
              gremlinQuery: "gremlin",
              results: "profile.results",
              chop: "profile.chop",
              serializer: "profile.serializer",
              indexOps: "profile.indexOps",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/gremlin/profile" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "ExecuteGremlinProfileQueryInput" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          gremlinQuery: S.String,
          serializer: S.optional(S.String).pipe(T.HttpHeader("accept")),
        })
          .pipe(S.encodeKeys({ gremlinQuery: "gremlin" }))
          .pipe(T.all(T.Http({ method: "POST", uri: "/gremlin" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ExecuteGremlinQueryInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          message: S.optional(S.String),
          code: S.optional(S.Number),
          attributes: S.optional(S.Any),
        }),
      ).annotate({ identifier: "GremlinQueryStatusAttributes" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          requestId: S.optional(S.String),
          status: S.optional(__S(137, __c17, 1)),
          result: S.optional(S.Any),
          meta: S.optional(S.Any),
        }),
      ).annotate({ identifier: "ExecuteGremlinQueryOutput" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          openCypherQuery: S.String,
          parameters: S.optional(S.String),
          explainMode: S.String,
        })
          .pipe(S.encodeKeys({ openCypherQuery: "query", explainMode: "explain" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/opencypher/explain" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "ExecuteOpenCypherExplainQueryInput" });
    case 1:
      return S.suspend(() => S.Struct({ results: T.Blob.pipe(T.HttpPayload()) })).annotate({
        identifier: "ExecuteOpenCypherExplainQueryOutput",
      });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ openCypherQuery: S.String, parameters: S.optional(S.String) })
          .pipe(S.encodeKeys({ openCypherQuery: "query" }))
          .pipe(
            T.all(T.Http({ method: "POST", uri: "/opencypher" }), svc, auth, proto, ver, rules),
          ),
      ).annotate({ identifier: "ExecuteOpenCypherQueryInput" });
    case 1:
      return S.suspend(() => S.Struct({ results: S.Any })).annotate({
        identifier: "ExecuteOpenCypherQueryOutput",
      });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "GET", uri: "/status" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetEngineStatusRequest" });
    case 1:
      return S.suspend(() => S.Struct({ version: S.String })).annotate({
        identifier: "QueryLanguageVersion",
      });
    case 2:
      return S.Record(S.String, /*@__PURE__*/ S.Any.pipe(S.optional));
    case 3:
      return S.suspend(() =>
        S.Struct({
          status: S.optional(S.String),
          startTime: S.optional(S.String),
          dbEngineVersion: S.optional(S.String),
          role: S.optional(S.String),
          dfeQueryEngine: S.optional(S.String),
          gremlin: S.optional(__S(161, __c20, 1)),
          sparql: S.optional(__S(161, __c20, 1)),
          opencypher: S.optional(__S(161, __c20, 1)),
          labMode: S.optional(__S(168, __c21, 0)),
          rollingBackTrxCount: S.optional(S.Number),
          rollingBackTrxEarliestStartTime: S.optional(S.String),
          features: S.optional(__S(162, __c20, 2)),
          settings: S.optional(__S(168, __c21, 0)),
        }),
      ).annotate({ identifier: "GetEngineStatusOutput" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ queryId: S.String.pipe(T.HttpLabel("queryId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/gremlin/status/{queryId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetGremlinQueryStatusInput" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          waited: S.optional(S.Number),
          elapsed: S.optional(S.Number),
          cancelled: S.optional(S.Boolean),
          subqueries: S.optional(S.Any),
        }),
      ).annotate({ identifier: "QueryEvalStats" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          queryId: S.optional(S.String),
          queryString: S.optional(S.String),
          queryEvalStats: S.optional(__S(184, __c23, 0)),
        }),
      ).annotate({ identifier: "GetGremlinQueryStatusOutput" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          loadId: S.String.pipe(T.HttpLabel("loadId")),
          details: S.optional(S.Boolean).pipe(T.HttpQuery("details")),
          errors: S.optional(S.Boolean).pipe(T.HttpQuery("errors")),
          page: S.optional(S.Number).pipe(T.HttpQuery("page")),
          errorsPerPage: S.optional(S.Number).pipe(T.HttpQuery("errorsPerPage")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/loader/{loadId}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetLoaderJobStatusInput" });
    case 1:
      return S.suspend(() => S.Struct({ status: S.String, payload: S.Any })).annotate({
        identifier: "GetLoaderJobStatusOutput",
      });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String.pipe(T.HttpLabel("id")),
          neptuneIamRoleArn: S.optional(S.String).pipe(T.HttpQuery("neptuneIamRoleArn")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/ml/dataprocessing/{id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetMLDataProcessingJobInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          status: S.optional(S.String),
          id: S.optional(S.String),
          processingJob: S.optional(__S(208, __c26, 0)),
        }),
      ).annotate({ identifier: "GetMLDataProcessingJobOutput" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          arn: S.optional(S.String),
          status: S.optional(S.String),
          outputLocation: S.optional(S.String),
          failureReason: S.optional(S.String),
          cloudwatchLogUrl: S.optional(S.String),
        }),
      ).annotate({ identifier: "MlResourceDefinition" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String.pipe(T.HttpLabel("id")),
          neptuneIamRoleArn: S.optional(S.String).pipe(T.HttpQuery("neptuneIamRoleArn")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/ml/endpoints/{id}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetMLEndpointInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          status: S.optional(S.String),
          id: S.optional(S.String),
          endpoint: S.optional(__S(208, __c26, 0)),
          endpointConfig: S.optional(__S(224, __c28, 0)),
        }),
      ).annotate({ identifier: "GetMLEndpointOutput" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.optional(S.String), arn: S.optional(S.String) }),
      ).annotate({ identifier: "MlConfigDefinition" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String.pipe(T.HttpLabel("id")),
          neptuneIamRoleArn: S.optional(S.String).pipe(T.HttpQuery("neptuneIamRoleArn")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/ml/modeltraining/{id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetMLModelTrainingJobInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          status: S.optional(S.String),
          id: S.optional(S.String),
          processingJob: S.optional(__S(208, __c26, 0)),
          hpoJob: S.optional(__S(208, __c26, 0)),
          modelTransformJob: S.optional(__S(208, __c26, 0)),
          mlModels: S.optional(__S(240, __c30, 0)),
        }),
      ).annotate({ identifier: "GetMLModelTrainingJobOutput" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(224, __c28, 0));
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String.pipe(T.HttpLabel("id")),
          neptuneIamRoleArn: S.optional(S.String).pipe(T.HttpQuery("neptuneIamRoleArn")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/ml/modeltransform/{id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetMLModelTransformJobInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          status: S.optional(S.String),
          id: S.optional(S.String),
          baseProcessingJob: S.optional(__S(208, __c26, 0)),
          remoteModelTransformJob: S.optional(__S(208, __c26, 0)),
          models: S.optional(__S(240, __c30, 0)),
        }),
      ).annotate({ identifier: "GetMLModelTransformJobOutput" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ queryId: S.String.pipe(T.HttpLabel("queryId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/opencypher/status/{queryId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetOpenCypherQueryStatusInput" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/propertygraph/statistics" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetPropertygraphStatisticsRequest" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          signatureCount: S.optional(S.Number),
          instanceCount: S.optional(S.Number),
          predicateCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "StatisticsSummary" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          autoCompute: S.optional(S.Boolean),
          active: S.optional(S.Boolean),
          statisticsId: S.optional(S.String),
          date: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          note: S.optional(S.String),
          signatureInfo: S.optional(__S(272, __c34, 0)),
        }),
      ).annotate({ identifier: "Statistics" });
    case 2:
      return S.suspend(() => S.Struct({ status: S.String, payload: __S(273, __c34, 1) })).annotate({
        identifier: "GetPropertygraphStatisticsOutput",
      });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
          iteratorType: S.optional(S.String).pipe(T.HttpQuery("iteratorType")),
          commitNum: S.optional(S.Number).pipe(T.HttpQuery("commitNum")),
          opNum: S.optional(S.Number).pipe(T.HttpQuery("opNum")),
          encoding: S.optional(S.String).pipe(T.HttpHeader("Accept-Encoding")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/propertygraph/stream" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetPropertygraphStreamInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          type: S.String,
          key: S.String,
          value: S.Any,
          from: S.optional(S.String),
          to: S.optional(S.String),
        }),
      ).annotate({ identifier: "PropertygraphData" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          commitTimestampInMillis: S.Number,
          eventId: __S(168, __c21, 0),
          data: __S(281, __c35, 1),
          op: S.String,
          isLastOp: S.optional(S.Boolean),
        }).pipe(S.encodeKeys({ commitTimestampInMillis: "commitTimestamp" })),
      ).annotate({ identifier: "PropertygraphRecord" });
    case 3:
      return S.Array(__S(282, __c35, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          lastEventId: __S(168, __c21, 0),
          lastTrxTimestampInMillis: S.Number,
          format: S.String,
          records: __S(283, __c35, 3),
          totalRecords: S.Number,
        }).pipe(S.encodeKeys({ lastTrxTimestampInMillis: "lastTrxTimestamp" })),
      ).annotate({ identifier: "GetPropertygraphStreamOutput" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ mode: S.optional(S.String).pipe(T.HttpQuery("mode")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/propertygraph/statistics/summary" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetPropertygraphSummaryInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          count: S.optional(S.Number),
          nodeProperties: S.optional(__S(304, __c38, 0)),
          distinctOutgoingEdgeLabels: S.optional(__S(304, __c38, 0)),
        }),
      ).annotate({ identifier: "NodeStructure" });
    case 2:
      return S.Array(__S(289, __c36, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ count: S.optional(S.Number), edgeProperties: S.optional(__S(304, __c38, 0)) }),
      ).annotate({ identifier: "EdgeStructure" });
    case 4:
      return S.Array(__S(291, __c36, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          numNodes: S.optional(S.Number),
          numEdges: S.optional(S.Number),
          numNodeLabels: S.optional(S.Number),
          numEdgeLabels: S.optional(S.Number),
          nodeLabels: S.optional(__S(304, __c38, 0)),
          edgeLabels: S.optional(__S(304, __c38, 0)),
          numNodeProperties: S.optional(S.Number),
          numEdgeProperties: S.optional(S.Number),
          nodeProperties: S.optional(__S(297, __c37, 1)),
          edgeProperties: S.optional(__S(297, __c37, 1)),
          totalNodePropertyValues: S.optional(S.Number),
          totalEdgePropertyValues: S.optional(S.Number),
          nodeStructures: S.optional(__S(290, __c36, 2)),
          edgeStructures: S.optional(__S(292, __c36, 4)),
        }),
      ).annotate({ identifier: "PropertygraphSummary" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          version: S.optional(S.String),
          lastStatisticsComputationTime: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ),
          graphSummary: S.optional(__S(293, __c36, 5)),
        }),
      ).annotate({ identifier: "PropertygraphSummaryValueMap" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          statusCode: S.optional(S.Number).pipe(T.HttpResponseCode()),
          payload: S.optional(__S(294, __c36, 6)),
        }),
      ).annotate({ identifier: "GetPropertygraphSummaryOutput" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.Number.pipe(S.optional));
    case 1:
      return S.Array(__S(296, __c37, 0));
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ mode: S.optional(S.String).pipe(T.HttpQuery("mode")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/rdf/statistics/summary" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRDFGraphSummaryInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ count: S.optional(S.Number), predicates: S.optional(__S(304, __c38, 0)) }),
      ).annotate({ identifier: "SubjectStructure" });
    case 2:
      return S.Array(__S(313, __c39, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          numDistinctSubjects: S.optional(S.Number),
          numDistinctPredicates: S.optional(S.Number),
          numQuads: S.optional(S.Number),
          numClasses: S.optional(S.Number),
          classes: S.optional(__S(304, __c38, 0)),
          predicates: S.optional(__S(297, __c37, 1)),
          subjectStructures: S.optional(__S(314, __c39, 2)),
        }),
      ).annotate({ identifier: "RDFGraphSummary" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          version: S.optional(S.String),
          lastStatisticsComputationTime: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ),
          graphSummary: S.optional(__S(315, __c39, 3)),
        }),
      ).annotate({ identifier: "RDFGraphSummaryValueMap" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          statusCode: S.optional(S.Number).pipe(T.HttpResponseCode()),
          payload: S.optional(__S(316, __c39, 4)),
        }),
      ).annotate({ identifier: "GetRDFGraphSummaryOutput" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "GET", uri: "/sparql/statistics" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetSparqlStatisticsRequest" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
          iteratorType: S.optional(S.String).pipe(T.HttpQuery("iteratorType")),
          commitNum: S.optional(S.Number).pipe(T.HttpQuery("commitNum")),
          opNum: S.optional(S.Number).pipe(T.HttpQuery("opNum")),
          encoding: S.optional(S.String).pipe(T.HttpHeader("Accept-Encoding")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/sparql/stream" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetSparqlStreamInput" });
    case 1:
      return S.suspend(() => S.Struct({ stmt: S.String })).annotate({ identifier: "SparqlData" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          commitTimestampInMillis: S.Number,
          eventId: __S(168, __c21, 0),
          data: __S(329, __c41, 1),
          op: S.String,
          isLastOp: S.optional(S.Boolean),
        }).pipe(S.encodeKeys({ commitTimestampInMillis: "commitTimestamp" })),
      ).annotate({ identifier: "SparqlRecord" });
    case 3:
      return S.Array(__S(330, __c41, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          lastEventId: __S(168, __c21, 0),
          lastTrxTimestampInMillis: S.Number,
          format: S.String,
          records: __S(331, __c41, 3),
          totalRecords: S.Number,
        }).pipe(S.encodeKeys({ lastTrxTimestampInMillis: "lastTrxTimestamp" })),
      ).annotate({ identifier: "GetSparqlStreamOutput" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          includeWaiting: S.optional(S.Boolean).pipe(T.HttpQuery("includeWaiting")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/gremlin/status" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListGremlinQueriesInput" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(185, __c23, 1));
    case 1:
      return S.suspend(() =>
        S.Struct({
          acceptedQueryCount: S.optional(S.Number),
          runningQueryCount: S.optional(S.Number),
          queries: S.optional(__S(344, __c43, 0)),
        }),
      ).annotate({ identifier: "ListGremlinQueriesOutput" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
          includeQueuedLoads: S.optional(S.Boolean).pipe(T.HttpQuery("includeQueuedLoads")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/loader" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListLoaderJobsInput" });
    case 1:
      return S.suspend(() => S.Struct({ loadIds: S.optional(__S(304, __c38, 0)) })).annotate({
        identifier: "LoaderIdResult",
      });
    case 2:
      return S.suspend(() => S.Struct({ status: S.String, payload: __S(353, __c44, 1) })).annotate({
        identifier: "ListLoaderJobsOutput",
      });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxItems: S.optional(S.Number).pipe(T.HttpQuery("maxItems")),
          neptuneIamRoleArn: S.optional(S.String).pipe(T.HttpQuery("neptuneIamRoleArn")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/ml/dataprocessing" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListMLDataProcessingJobsInput" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ ids: S.optional(__S(304, __c38, 0)) })).annotate({
        identifier: "ListMLDataProcessingJobsOutput",
      });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxItems: S.optional(S.Number).pipe(T.HttpQuery("maxItems")),
          neptuneIamRoleArn: S.optional(S.String).pipe(T.HttpQuery("neptuneIamRoleArn")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/ml/endpoints" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListMLEndpointsInput" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxItems: S.optional(S.Number).pipe(T.HttpQuery("maxItems")),
          neptuneIamRoleArn: S.optional(S.String).pipe(T.HttpQuery("neptuneIamRoleArn")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/ml/modeltraining" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListMLModelTrainingJobsInput" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxItems: S.optional(S.Number).pipe(T.HttpQuery("maxItems")),
          neptuneIamRoleArn: S.optional(S.String).pipe(T.HttpQuery("neptuneIamRoleArn")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/ml/modeltransform" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListMLModelTransformJobsInput" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          includeWaiting: S.optional(S.Boolean).pipe(T.HttpQuery("includeWaiting")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/opencypher/status" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListOpenCypherQueriesInput" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ mode: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/propertygraph/statistics" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ManagePropertygraphStatisticsInput" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ statisticsId: S.optional(S.String) })).annotate({
        identifier: "RefreshStatisticsIdMap",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({ status: S.String, payload: S.optional(__S(416, __c52, 0)) }),
      ).annotate({ identifier: "ManagePropertygraphStatisticsOutput" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ mode: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/sparql/statistics" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ManageSparqlStatisticsInput" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          source: S.String,
          format: S.String,
          s3BucketRegion: S.String,
          iamRoleArn: S.String,
          mode: S.optional(S.String),
          failOnError: S.optional(S.Boolean),
          parallelism: S.optional(S.String),
          parserConfiguration: S.optional(__S(168, __c21, 0)),
          updateSingleCardinalityProperties: S.optional(S.Boolean),
          queueRequest: S.optional(S.Boolean),
          dependencies: S.optional(__S(304, __c38, 0)),
          userProvidedEdgeIds: S.optional(S.Boolean),
          edgeOnlyLoad: S.optional(S.Boolean),
        })
          .pipe(S.encodeKeys({ s3BucketRegion: "region" }))
          .pipe(T.all(T.Http({ method: "POST", uri: "/loader" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartLoaderJobInput" });
    case 1:
      return S.suspend(() => S.Struct({ status: S.String, payload: __S(168, __c21, 0) })).annotate({
        identifier: "StartLoaderJobOutput",
      });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          previousDataProcessingJobId: S.optional(S.String),
          inputDataS3Location: S.String,
          processedDataS3Location: S.String,
          sagemakerIamRoleArn: S.optional(S.String),
          neptuneIamRoleArn: S.optional(S.String),
          processingInstanceType: S.optional(S.String),
          processingInstanceVolumeSizeInGB: S.optional(S.Number),
          processingTimeOutInSeconds: S.optional(S.Number),
          modelType: S.optional(S.String),
          configFileName: S.optional(S.String),
          subnets: S.optional(__S(304, __c38, 0)),
          securityGroupIds: S.optional(__S(304, __c38, 0)),
          volumeEncryptionKMSKey: S.optional(S.String),
          s3OutputEncryptionKMSKey: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ml/dataprocessing" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartMLDataProcessingJobInput" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          sourceS3DirectoryPath: S.String,
          trainingEntryPointScript: S.optional(S.String),
          transformEntryPointScript: S.optional(S.String),
        }),
      ).annotate({ identifier: "CustomModelTrainingParameters" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          previousModelTrainingJobId: S.optional(S.String),
          dataProcessingJobId: S.String,
          trainModelS3Location: S.String,
          sagemakerIamRoleArn: S.optional(S.String),
          neptuneIamRoleArn: S.optional(S.String),
          baseProcessingInstanceType: S.optional(S.String),
          trainingInstanceType: S.optional(S.String),
          trainingInstanceVolumeSizeInGB: S.optional(S.Number),
          trainingTimeOutInSeconds: S.optional(S.Number),
          maxHPONumberOfTrainingJobs: S.optional(S.Number),
          maxHPOParallelTrainingJobs: S.optional(S.Number),
          subnets: S.optional(__S(304, __c38, 0)),
          securityGroupIds: S.optional(__S(304, __c38, 0)),
          volumeEncryptionKMSKey: S.optional(S.String),
          s3OutputEncryptionKMSKey: S.optional(S.String),
          enableManagedSpotTraining: S.optional(S.Boolean),
          customModelTrainingParameters: S.optional(__S(448, __c56, 0)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/ml/modeltraining" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StartMLModelTrainingJobInput" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          sourceS3DirectoryPath: S.String,
          transformEntryPointScript: S.optional(S.String),
        }),
      ).annotate({ identifier: "CustomModelTransformParameters" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          dataProcessingJobId: S.optional(S.String),
          mlModelTrainingJobId: S.optional(S.String),
          trainingJobName: S.optional(S.String),
          modelTransformOutputS3Location: S.String,
          sagemakerIamRoleArn: S.optional(S.String),
          neptuneIamRoleArn: S.optional(S.String),
          customModelTransformParameters: S.optional(__S(456, __c57, 0)),
          baseProcessingInstanceType: S.optional(S.String),
          baseProcessingInstanceVolumeSizeInGB: S.optional(S.Number),
          subnets: S.optional(__S(304, __c38, 0)),
          securityGroupIds: S.optional(__S(304, __c38, 0)),
          volumeEncryptionKMSKey: S.optional(S.String),
          s3OutputEncryptionKMSKey: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ml/modeltransform" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartMLModelTransformJobInput" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
