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
const svc = /*@__PURE__*/ T.AwsApiService({ sdkId: "RUM", serviceShapeName: "RUM" });
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "rum" });
const ver = /*@__PURE__*/ T.ServiceVersion("2018-05-10");
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
              `https://rum-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(`https://rum-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(`https://rum.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`);
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://rum.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://rum.{R}.{D}","properties":{},"headers":{}}');

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
      resourceName: S.String,
      resourceType: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      retryAfterSeconds: /*@__PURE__*/ S.optional(S.Number).pipe(
        /*@__PURE__*/ T.HttpHeader("Retry-After"),
      ),
    },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(500), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class InvalidPolicyRevisionIdException
  extends /*@__PURE__*/ S.TaggedError<InvalidPolicyRevisionIdException>()(
    "InvalidPolicyRevisionIdException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class MalformedPolicyDocumentException
  extends /*@__PURE__*/ S.TaggedError<MalformedPolicyDocumentException>()(
    "MalformedPolicyDocumentException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class PolicyNotFoundException
  extends /*@__PURE__*/ S.TaggedError<PolicyNotFoundException>()(
    "PolicyNotFoundException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class PolicySizeLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<PolicySizeLimitExceededException>()(
    "PolicySizeLimitExceededException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceName: S.String,
      resourceType: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      serviceCode: /*@__PURE__*/ S.optional(S.String),
      quotaCode: /*@__PURE__*/ S.optional(S.String),
      retryAfterSeconds: /*@__PURE__*/ S.optional(S.Number).pipe(
        /*@__PURE__*/ T.HttpHeader("Retry-After"),
      ),
    },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.HttpError(429),
      /*@__PURE__*/ T.Retryable({ throttling: true }),
    ),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type AppMonitorName = string;
export type MetricDestination = string;
export type DestinationArn = string;
export type MetricName = string;
export type ValueKey = string;
export type UnitLabel = string;
export type DimensionKey = string;
export type DimensionName = string;
export type DimensionKeysMap = { [key: string]: string | undefined };
export type EventPattern = string;
export type Namespace = string;
export interface MetricDefinitionRequest {
  Name: string;
  ValueKey?: string;
  UnitLabel?: string;
  DimensionKeys?: { [key: string]: string | undefined };
  EventPattern?: string;
  Namespace?: string;
}
export type MetricDefinitionsRequest = MetricDefinitionRequest[];
export interface BatchCreateRumMetricDefinitionsRequest {
  AppMonitorName: string;
  Destination: string;
  DestinationArn?: string;
  MetricDefinitions: MetricDefinitionRequest[];
}
export interface BatchCreateRumMetricDefinitionsError_ {
  MetricDefinition: MetricDefinitionRequest;
  ErrorCode: string;
  ErrorMessage: string;
}
export type BatchCreateRumMetricDefinitionsErrors = BatchCreateRumMetricDefinitionsError_[];
export type MetricDefinitionId = string;
export interface MetricDefinition {
  MetricDefinitionId: string;
  Name: string;
  ValueKey?: string;
  UnitLabel?: string;
  DimensionKeys?: { [key: string]: string | undefined };
  EventPattern?: string;
  Namespace?: string;
}
export type MetricDefinitions = MetricDefinition[];
export interface BatchCreateRumMetricDefinitionsResponse {
  Errors: BatchCreateRumMetricDefinitionsError_[];
  MetricDefinitions?: MetricDefinition[];
}
export type MetricDefinitionIds = string[];
export interface BatchDeleteRumMetricDefinitionsRequest {
  AppMonitorName: string;
  Destination: string;
  DestinationArn?: string;
  MetricDefinitionIds: string[];
}
export interface BatchDeleteRumMetricDefinitionsError_ {
  MetricDefinitionId: string;
  ErrorCode: string;
  ErrorMessage: string;
}
export type BatchDeleteRumMetricDefinitionsErrors = BatchDeleteRumMetricDefinitionsError_[];
export interface BatchDeleteRumMetricDefinitionsResponse {
  Errors: BatchDeleteRumMetricDefinitionsError_[];
  MetricDefinitionIds?: string[];
}
export type MaxResultsInteger = number;
export interface BatchGetRumMetricDefinitionsRequest {
  AppMonitorName: string;
  Destination: string;
  DestinationArn?: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface BatchGetRumMetricDefinitionsResponse {
  MetricDefinitions?: MetricDefinition[];
  NextToken?: string;
}
export type AppMonitorDomain = string;
export type AppMonitorDomainList = string[];
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export type IdentityPoolId = string;
export type Url = string;
export type Pages = string[];
export type FavoritePages = string[];
export type SessionSampleRate = number;
export type Arn = string;
export type Telemetry = string;
export type Telemetries = string[];
export interface AppMonitorConfiguration {
  IdentityPoolId?: string;
  ExcludedPages?: string[];
  IncludedPages?: string[];
  FavoritePages?: string[];
  SessionSampleRate?: number;
  GuestRoleArn?: string;
  AllowCookies?: boolean;
  Telemetries?: string[];
  EnableXRay?: boolean;
}
export type CustomEventsStatus = string;
export interface CustomEvents {
  Status?: string;
}
export type DeobfuscationStatus = string;
export type DeobfuscationS3Uri = string;
export interface JavaScriptSourceMaps {
  Status: string;
  S3Uri?: string;
}
export interface DeobfuscationConfiguration {
  JavaScriptSourceMaps?: JavaScriptSourceMaps;
}
export type AppMonitorPlatform = string;
export interface CreateAppMonitorRequest {
  Name: string;
  Domain?: string;
  DomainList?: string[];
  Tags?: { [key: string]: string | undefined };
  AppMonitorConfiguration?: AppMonitorConfiguration;
  CwLogEnabled?: boolean;
  CustomEvents?: CustomEvents;
  DeobfuscationConfiguration?: DeobfuscationConfiguration;
  Platform?: string;
}
export type AppMonitorId = string;
export interface CreateAppMonitorResponse {
  Id?: string;
}
export interface DeleteAppMonitorRequest {
  Name: string;
}
export interface DeleteAppMonitorResponse {}
export type PolicyRevisionId = string;
export interface DeleteResourcePolicyRequest {
  Name: string;
  PolicyRevisionId?: string;
}
export interface DeleteResourcePolicyResponse {
  PolicyRevisionId?: string;
}
export interface DeleteRumMetricsDestinationRequest {
  AppMonitorName: string;
  Destination: string;
  DestinationArn?: string;
}
export interface DeleteRumMetricsDestinationResponse {}
export interface GetAppMonitorRequest {
  Name: string;
}
export type ISOTimestampString = string;
export type StateEnum = string;
export interface CwLog {
  CwLogEnabled?: boolean;
  CwLogGroup?: string;
}
export interface DataStorage {
  CwLog?: CwLog;
}
export interface AppMonitor {
  Name?: string;
  Domain?: string;
  DomainList?: string[];
  Id?: string;
  Created?: string;
  LastModified?: string;
  Tags?: { [key: string]: string | undefined };
  State?: string;
  AppMonitorConfiguration?: AppMonitorConfiguration;
  DataStorage?: DataStorage;
  CustomEvents?: CustomEvents;
  DeobfuscationConfiguration?: DeobfuscationConfiguration;
  Platform?: string;
}
export interface GetAppMonitorResponse {
  AppMonitor?: AppMonitor;
}
export type QueryTimestamp = number;
export interface TimeRange {
  After: number;
  Before?: number;
}
export type QueryFilterKey = string;
export type QueryFilterValue = string;
export type QueryFilterValueList = string[];
export interface QueryFilter {
  Name?: string;
  Values?: string[];
}
export type QueryFilters = QueryFilter[];
export type MaxQueryResults = number;
export type Token = string;
export interface GetAppMonitorDataRequest {
  Name: string;
  TimeRange: TimeRange;
  Filters?: QueryFilter[];
  MaxResults?: number;
  NextToken?: string;
}
export type EventData = string;
export type EventDataList = string[];
export interface GetAppMonitorDataResponse {
  Events?: string[];
  NextToken?: string;
}
export interface GetResourcePolicyRequest {
  Name: string;
}
export interface GetResourcePolicyResponse {
  PolicyDocument?: string;
  PolicyRevisionId?: string;
}
export interface ListAppMonitorsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface AppMonitorSummary {
  Name?: string;
  Id?: string;
  Created?: string;
  LastModified?: string;
  State?: string;
  Platform?: string;
}
export type AppMonitorSummaryList = AppMonitorSummary[];
export interface ListAppMonitorsResponse {
  NextToken?: string;
  AppMonitorSummaries?: AppMonitorSummary[];
}
export interface ListRumMetricsDestinationsRequest {
  AppMonitorName: string;
  MaxResults?: number;
  NextToken?: string;
}
export type IamRoleArn = string;
export interface MetricDestinationSummary {
  Destination?: string;
  DestinationArn?: string;
  IamRoleArn?: string;
}
export type MetricDestinationSummaryList = MetricDestinationSummary[];
export interface ListRumMetricsDestinationsResponse {
  Destinations?: MetricDestinationSummary[];
  NextToken?: string;
}
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export interface ListTagsForResourceResponse {
  ResourceArn: string;
  Tags: { [key: string]: string | undefined };
}
export interface PutResourcePolicyRequest {
  Name: string;
  PolicyDocument: string;
  PolicyRevisionId?: string;
}
export interface PutResourcePolicyResponse {
  PolicyDocument?: string;
  PolicyRevisionId?: string;
}
export interface AppMonitorDetails {
  name?: string;
  id?: string;
  version?: string;
}
export interface UserDetails {
  userId?: string;
  sessionId?: string;
}
export type JsonValue = string;
export interface RumEvent {
  id: string;
  timestamp: Date;
  type: string;
  metadata?: string;
  details: string;
}
export type RumEventList = RumEvent[];
export type Alias = string;
export interface PutRumEventsRequest {
  Id: string;
  BatchId: string;
  AppMonitorDetails: AppMonitorDetails;
  UserDetails: UserDetails;
  RumEvents: RumEvent[];
  Alias?: string;
}
export interface PutRumEventsResponse {}
export interface PutRumMetricsDestinationRequest {
  AppMonitorName: string;
  Destination: string;
  DestinationArn?: string;
  IamRoleArn?: string;
}
export interface PutRumMetricsDestinationResponse {}
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateAppMonitorRequest {
  Name: string;
  Domain?: string;
  DomainList?: string[];
  AppMonitorConfiguration?: AppMonitorConfiguration;
  CwLogEnabled?: boolean;
  CustomEvents?: CustomEvents;
  DeobfuscationConfiguration?: DeobfuscationConfiguration;
}
export interface UpdateAppMonitorResponse {}
export interface UpdateRumMetricDefinitionRequest {
  AppMonitorName: string;
  Destination: string;
  DestinationArn?: string;
  MetricDefinition: MetricDefinitionRequest;
  MetricDefinitionId: string;
}
export interface UpdateRumMetricDefinitionResponse {}
export type BatchCreateRumMetricDefinitionsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Specifies the extended metrics and custom metrics that you want a CloudWatch RUM app monitor to send to a destination. Valid destinations include CloudWatch and Evidently.
 *
 * By default, RUM app monitors send some metrics to CloudWatch. These default metrics are listed in CloudWatch metrics that you can collect with CloudWatch RUM.
 *
 * In addition to these default metrics, you can choose to send extended metrics, custom metrics, or both.
 *
 * - Extended metrics let you send metrics with additional dimensions that aren't included in the default metrics. You can also send extended metrics to both Evidently and CloudWatch. The valid dimension names for the additional dimensions for extended metrics are `BrowserName`, `CountryCode`, `DeviceType`, `FileType`, `OSName`, and `PageId`. For more information, see Extended metrics that you can send to CloudWatch and CloudWatch Evidently.
 *
 * - Custom metrics are metrics that you define. You can send custom metrics to CloudWatch. CloudWatch Evidently, or both. With custom metrics, you can use any metric name and namespace. To derive the metrics, you can use any custom events, built-in events, custom attributes, or default attributes.
 *
 * You can't send custom metrics to the `AWS/RUM` namespace. You must send custom metrics to a custom namespace that you define. The namespace that you use can't start with `AWS/`. CloudWatch RUM prepends `RUM/CustomMetrics/` to the custom namespace that you define, so the final namespace for your metrics in CloudWatch is `RUM/CustomMetrics/*your-custom-namespace* `.
 *
 * The maximum number of metric definitions that you can specify in one `BatchCreateRumMetricDefinitions` operation is 200.
 *
 * The maximum number of metric definitions that one destination can contain is 2000.
 *
 * Extended metrics sent to CloudWatch and RUM custom metrics are charged as CloudWatch custom metrics. Each combination of additional dimension name and dimension value counts as a custom metric. For more information, see Amazon CloudWatch Pricing.
 *
 * You must have already created a destination for the metrics before you send them. For more information, see PutRumMetricsDestination.
 *
 * If some metric definitions specified in a `BatchCreateRumMetricDefinitions` operations are not valid, those metric definitions fail and return errors, but all valid metric definitions in the same operation still succeed.
 */
export const batchCreateRumMetricDefinitions: API.OperationMethod<
  BatchCreateRumMetricDefinitionsRequest,
  BatchCreateRumMetricDefinitionsResponse,
  BatchCreateRumMetricDefinitionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1, __c0, 1) as any as S.Schema<BatchCreateRumMetricDefinitionsRequest>,
  output: __S(4, __c0, 4) as any as S.Schema<BatchCreateRumMetricDefinitionsResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchCreateRumMetricDefinitions",
}));

export type BatchDeleteRumMetricDefinitionsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes the specified metrics from being sent to an extended metrics destination.
 *
 * If some metric definition IDs specified in a `BatchDeleteRumMetricDefinitions` operations are not valid, those metric definitions fail and return errors, but all valid metric definition IDs in the same operation are still deleted.
 *
 * The maximum number of metric definitions that you can specify in one `BatchDeleteRumMetricDefinitions` operation is 200.
 */
export const batchDeleteRumMetricDefinitions: API.OperationMethod<
  BatchDeleteRumMetricDefinitionsRequest,
  BatchDeleteRumMetricDefinitionsResponse,
  BatchDeleteRumMetricDefinitionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c4, 0) as any as S.Schema<BatchDeleteRumMetricDefinitionsRequest>,
  output: __S(35, __c4, 3) as any as S.Schema<BatchDeleteRumMetricDefinitionsResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeleteRumMetricDefinitions",
}));

export type BatchGetRumMetricDefinitionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the list of metrics and dimensions that a RUM app monitor is sending to a single destination.
 */
export const batchGetRumMetricDefinitions: API.PaginatedOperationMethod<
  BatchGetRumMetricDefinitionsRequest,
  BatchGetRumMetricDefinitionsResponse,
  BatchGetRumMetricDefinitionsError,
  Credentials | HttpClient.HttpClient,
  MetricDefinition
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(48, __c6, 0) as any as S.Schema<BatchGetRumMetricDefinitionsRequest>,
  output: __S(49, __c6, 1) as any as S.Schema<BatchGetRumMetricDefinitionsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetRumMetricDefinitions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "MetricDefinitions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type CreateAppMonitorError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a Amazon CloudWatch RUM app monitor, which collects telemetry data from your application and sends that data to RUM. The data includes performance and reliability information such as page load time, client-side errors, and user behavior.
 *
 * You use this operation only to create a new app monitor. To update an existing app monitor, use UpdateAppMonitor instead.
 *
 * After you create an app monitor, sign in to the CloudWatch RUM console to get the JavaScript code snippet to add to your web application. For more information, see How do I find a code snippet that I've already generated?
 */
export const createAppMonitor: API.OperationMethod<
  CreateAppMonitorRequest,
  CreateAppMonitorResponse,
  CreateAppMonitorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(56, __c7, 0) as any as S.Schema<CreateAppMonitorRequest>,
  output: __S(57, __c7, 1) as any as S.Schema<CreateAppMonitorResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAppMonitor",
}));

export type DeleteAppMonitorError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an existing app monitor. This immediately stops the collection of data.
 */
export const deleteAppMonitor: API.OperationMethod<
  DeleteAppMonitorRequest,
  DeleteAppMonitorResponse,
  DeleteAppMonitorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(72, __c9, 0) as any as S.Schema<DeleteAppMonitorRequest>,
  output: __S(80, __c10, 0) as any as S.Schema<DeleteAppMonitorResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAppMonitor",
}));

export type DeleteResourcePolicyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | InvalidPolicyRevisionIdException
  | PolicyNotFoundException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes the association of a resource-based policy from an app monitor.
 */
export const deleteResourcePolicy: API.OperationMethod<
  DeleteResourcePolicyRequest,
  DeleteResourcePolicyResponse,
  DeleteResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(88, __c11, 0) as any as S.Schema<DeleteResourcePolicyRequest>,
  output: __S(89, __c11, 1) as any as S.Schema<DeleteResourcePolicyResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    InvalidPolicyRevisionIdException,
    PolicyNotFoundException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourcePolicy",
}));

export type DeleteRumMetricsDestinationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a destination for CloudWatch RUM extended metrics, so that the specified app monitor stops sending extended metrics to that destination.
 */
export const deleteRumMetricsDestination: API.OperationMethod<
  DeleteRumMetricsDestinationRequest,
  DeleteRumMetricsDestinationResponse,
  DeleteRumMetricsDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c12, 0) as any as S.Schema<DeleteRumMetricsDestinationRequest>,
  output: __S(80, __c10, 0) as any as S.Schema<DeleteRumMetricsDestinationResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRumMetricsDestination",
}));

export type GetAppMonitorError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the complete configuration information for one app monitor.
 */
export const getAppMonitor: API.OperationMethod<
  GetAppMonitorRequest,
  GetAppMonitorResponse,
  GetAppMonitorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(104, __c13, 0) as any as S.Schema<GetAppMonitorRequest>,
  output: __S(108, __c13, 4) as any as S.Schema<GetAppMonitorResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAppMonitor",
}));

export type GetAppMonitorDataError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the raw performance events that RUM has collected from your web application, so that you can do your own processing or analysis of this data.
 */
export const getAppMonitorData: API.PaginatedOperationMethod<
  GetAppMonitorDataRequest,
  GetAppMonitorDataResponse,
  GetAppMonitorDataError,
  Credentials | HttpClient.HttpClient,
  EventData
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(115, __c14, 3) as any as S.Schema<GetAppMonitorDataRequest>,
  output: __S(116, __c14, 4) as any as S.Schema<GetAppMonitorDataResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAppMonitorData",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Events",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetResourcePolicyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | PolicyNotFoundException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Use this operation to retrieve information about a resource-based policy that is attached to an app monitor.
 */
export const getResourcePolicy: API.OperationMethod<
  GetResourcePolicyRequest,
  GetResourcePolicyResponse,
  GetResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(120, __c15, 0) as any as S.Schema<GetResourcePolicyRequest>,
  output: __S(128, __c16, 0) as any as S.Schema<GetResourcePolicyResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    PolicyNotFoundException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourcePolicy",
}));

export type ListAppMonitorsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of the Amazon CloudWatch RUM app monitors in the account.
 */
export const listAppMonitors: API.PaginatedOperationMethod<
  ListAppMonitorsRequest,
  ListAppMonitorsResponse,
  ListAppMonitorsError,
  Credentials | HttpClient.HttpClient,
  AppMonitorSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(136, __c17, 0) as any as S.Schema<ListAppMonitorsRequest>,
  output: __S(139, __c17, 3) as any as S.Schema<ListAppMonitorsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAppMonitors",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AppMonitorSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListRumMetricsDestinationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of destinations that you have created to receive RUM extended metrics, for the specified app monitor.
 *
 * For more information about extended metrics, see AddRumMetrics.
 */
export const listRumMetricsDestinations: API.PaginatedOperationMethod<
  ListRumMetricsDestinationsRequest,
  ListRumMetricsDestinationsResponse,
  ListRumMetricsDestinationsError,
  Credentials | HttpClient.HttpClient,
  MetricDestinationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(144, __c18, 0) as any as S.Schema<ListRumMetricsDestinationsRequest>,
  output: __S(147, __c18, 3) as any as S.Schema<ListRumMetricsDestinationsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRumMetricsDestinations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Destinations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Displays the tags associated with a CloudWatch RUM resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(152, __c19, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(153, __c19, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type PutResourcePolicyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | InvalidPolicyRevisionIdException
  | MalformedPolicyDocumentException
  | PolicySizeLimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Use this operation to assign a resource-based policy to a CloudWatch RUM app monitor to control access to it. Each app monitor can have one resource-based policy. The maximum size of the policy is 4 KB. To learn more about using resource policies with RUM, see Using resource-based policies with CloudWatch RUM.
 */
export const putResourcePolicy: API.OperationMethod<
  PutResourcePolicyRequest,
  PutResourcePolicyResponse,
  PutResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c20, 0) as any as S.Schema<PutResourcePolicyRequest>,
  output: __S(128, __c16, 0) as any as S.Schema<PutResourcePolicyResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    InvalidPolicyRevisionIdException,
    MalformedPolicyDocumentException,
    PolicySizeLimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutResourcePolicy",
}));

export type PutRumEventsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sends telemetry events about your application performance and user behavior to CloudWatch RUM. The code snippet that RUM generates for you to add to your application includes `PutRumEvents` operations to send this data to RUM.
 *
 * Each `PutRumEvents` operation can send a batch of events from one user session.
 */
export const putRumEvents: API.OperationMethod<
  PutRumEventsRequest,
  PutRumEventsResponse,
  PutRumEventsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(172, __c21, 4) as any as S.Schema<PutRumEventsRequest>,
  output: __S(80, __c10, 0) as any as S.Schema<PutRumEventsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutRumEvents",
  endpointHostPrefix: "dataplane.",
}));

export type PutRumMetricsDestinationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates or updates a destination to receive extended metrics from CloudWatch RUM. You can send extended metrics to CloudWatch or to a CloudWatch Evidently experiment.
 *
 * For more information about extended metrics, see BatchCreateRumMetricDefinitions.
 */
export const putRumMetricsDestination: API.OperationMethod<
  PutRumMetricsDestinationRequest,
  PutRumMetricsDestinationResponse,
  PutRumMetricsDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(176, __c22, 0) as any as S.Schema<PutRumMetricsDestinationRequest>,
  output: __S(80, __c10, 0) as any as S.Schema<PutRumMetricsDestinationResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutRumMetricsDestination",
}));

export type TagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Assigns one or more tags (key-value pairs) to the specified CloudWatch RUM resource. Currently, the only resources that can be tagged app monitors.
 *
 * Tags can help you organize and categorize your resources. You can also use them to scope user permissions by granting a user permission to access or change only resources with certain tag values.
 *
 * Tags don't have any semantic meaning to Amazon Web Services and are interpreted strictly as strings of characters.
 *
 * You can use the `TagResource` action with a resource that already has tags. If you specify a new tag key for the resource, this tag is appended to the list of tags associated with the alarm. If you specify a tag key that is already associated with the resource, the new tag value that you specify replaces the previous value for that tag.
 *
 * You can associate as many as 50 tags with a resource.
 *
 * For more information, see Tagging Amazon Web Services resources.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(184, __c23, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(80, __c10, 0) as any as S.Schema<TagResourceResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Removes one or more tags from the specified resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c24, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(80, __c10, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateAppMonitorError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configuration of an existing app monitor. When you use this operation, only the parts of the app monitor configuration that you specify in this operation are changed. For any parameters that you omit, the existing values are kept.
 *
 * You can't use this operation to change the tags of an existing app monitor. To change the tags of an existing app monitor, use TagResource.
 *
 * To create a new app monitor, use CreateAppMonitor.
 *
 * After you update an app monitor, sign in to the CloudWatch RUM console to get the updated JavaScript code snippet to add to your web application. For more information, see How do I find a code snippet that I've already generated?
 */
export const updateAppMonitor: API.OperationMethod<
  UpdateAppMonitorRequest,
  UpdateAppMonitorResponse,
  UpdateAppMonitorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(200, __c25, 0) as any as S.Schema<UpdateAppMonitorRequest>,
  output: __S(80, __c10, 0) as any as S.Schema<UpdateAppMonitorResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAppMonitor",
}));

export type UpdateRumMetricDefinitionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Modifies one existing metric definition for CloudWatch RUM extended metrics. For more information about extended metrics, see BatchCreateRumMetricsDefinitions.
 */
export const updateRumMetricDefinition: API.OperationMethod<
  UpdateRumMetricDefinitionRequest,
  UpdateRumMetricDefinitionResponse,
  UpdateRumMetricDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(208, __c26, 0) as any as S.Schema<UpdateRumMetricDefinitionRequest>,
  output: __S(80, __c10, 0) as any as S.Schema<UpdateRumMetricDefinitionResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRumMetricDefinition",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(24, __c3, 0));
    case 1:
      return S.suspend(() =>
        S.Struct({
          AppMonitorName: S.String.pipe(T.HttpLabel("AppMonitorName")),
          Destination: S.String,
          DestinationArn: S.optional(S.String),
          MetricDefinitions: __S(0, __c0, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/rummetrics/{AppMonitorName}/metrics" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchCreateRumMetricDefinitionsRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          MetricDefinition: __S(24, __c3, 0),
          ErrorCode: S.String,
          ErrorMessage: S.String,
        }),
      ).annotate({ identifier: "BatchCreateRumMetricDefinitionsError" });
    case 3:
      return S.Array(__S(2, __c0, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ Errors: __S(3, __c0, 3), MetricDefinitions: S.optional(__S(9, __c1, 1)) }),
      ).annotate({ identifier: "BatchCreateRumMetricDefinitionsResponse" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MetricDefinitionId: S.String,
          Name: S.String,
          ValueKey: S.optional(S.String),
          UnitLabel: S.optional(S.String),
          DimensionKeys: S.optional(__S(16, __c2, 0)),
          EventPattern: S.optional(S.String),
          Namespace: S.optional(S.String),
        }),
      ).annotate({ identifier: "MetricDefinition" });
    case 1:
      return S.Array(__S(8, __c1, 0));
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          ValueKey: S.optional(S.String),
          UnitLabel: S.optional(S.String),
          DimensionKeys: S.optional(__S(16, __c2, 0)),
          EventPattern: S.optional(S.String),
          Namespace: S.optional(S.String),
        }),
      ).annotate({ identifier: "MetricDefinitionRequest" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AppMonitorName: S.String.pipe(T.HttpLabel("AppMonitorName")),
          Destination: S.String.pipe(T.HttpQuery("destination")),
          DestinationArn: S.optional(S.String).pipe(T.HttpQuery("destinationArn")),
          MetricDefinitionIds: __S(40, __c5, 0).pipe(T.HttpQuery("metricDefinitionIds")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/rummetrics/{AppMonitorName}/metrics" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchDeleteRumMetricDefinitionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ MetricDefinitionId: S.String, ErrorCode: S.String, ErrorMessage: S.String }),
      ).annotate({ identifier: "BatchDeleteRumMetricDefinitionsError" });
    case 2:
      return S.Array(__S(33, __c4, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Errors: __S(34, __c4, 2), MetricDefinitionIds: S.optional(__S(40, __c5, 0)) }),
      ).annotate({ identifier: "BatchDeleteRumMetricDefinitionsResponse" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AppMonitorName: S.String.pipe(T.HttpLabel("AppMonitorName")),
          Destination: S.String.pipe(T.HttpQuery("destination")),
          DestinationArn: S.optional(S.String).pipe(T.HttpQuery("destinationArn")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/rummetrics/{AppMonitorName}/metrics" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchGetRumMetricDefinitionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          MetricDefinitions: S.optional(__S(9, __c1, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "BatchGetRumMetricDefinitionsResponse" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Domain: S.optional(S.String),
          DomainList: S.optional(__S(40, __c5, 0)),
          Tags: S.optional(__S(16, __c2, 0)),
          AppMonitorConfiguration: S.optional(__S(64, __c8, 0)),
          CwLogEnabled: S.optional(S.Boolean),
          CustomEvents: S.optional(__S(65, __c8, 1)),
          DeobfuscationConfiguration: S.optional(__S(67, __c8, 3)),
          Platform: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/appmonitor" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateAppMonitorRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Id: S.optional(S.String) })).annotate({
        identifier: "CreateAppMonitorResponse",
      });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IdentityPoolId: S.optional(S.String),
          ExcludedPages: S.optional(__S(40, __c5, 0)),
          IncludedPages: S.optional(__S(40, __c5, 0)),
          FavoritePages: S.optional(__S(40, __c5, 0)),
          SessionSampleRate: S.optional(S.Number),
          GuestRoleArn: S.optional(S.String),
          AllowCookies: S.optional(S.Boolean),
          Telemetries: S.optional(__S(40, __c5, 0)),
          EnableXRay: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "AppMonitorConfiguration" });
    case 1:
      return S.suspend(() => S.Struct({ Status: S.optional(S.String) })).annotate({
        identifier: "CustomEvents",
      });
    case 2:
      return S.suspend(() => S.Struct({ Status: S.String, S3Uri: S.optional(S.String) })).annotate({
        identifier: "JavaScriptSourceMaps",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({ JavaScriptSourceMaps: S.optional(__S(66, __c8, 2)) }),
      ).annotate({ identifier: "DeobfuscationConfiguration" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String.pipe(T.HttpLabel("Name")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/appmonitor/{Name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteAppMonitorRequest" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeleteAppMonitorResponse" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String.pipe(T.HttpLabel("Name")),
          PolicyRevisionId: S.optional(S.String).pipe(T.HttpQuery("policyRevisionId")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/appmonitor/{Name}/policy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteResourcePolicyRequest" });
    case 1:
      return S.suspend(() => S.Struct({ PolicyRevisionId: S.optional(S.String) })).annotate({
        identifier: "DeleteResourcePolicyResponse",
      });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AppMonitorName: S.String.pipe(T.HttpLabel("AppMonitorName")),
          Destination: S.String.pipe(T.HttpQuery("destination")),
          DestinationArn: S.optional(S.String).pipe(T.HttpQuery("destinationArn")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/rummetrics/{AppMonitorName}/metricsdestination" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteRumMetricsDestinationRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String.pipe(T.HttpLabel("Name")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/appmonitor/{Name}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetAppMonitorRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ CwLogEnabled: S.optional(S.Boolean), CwLogGroup: S.optional(S.String) }),
      ).annotate({ identifier: "CwLog" });
    case 2:
      return S.suspend(() => S.Struct({ CwLog: S.optional(__S(105, __c13, 1)) })).annotate({
        identifier: "DataStorage",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Domain: S.optional(S.String),
          DomainList: S.optional(__S(40, __c5, 0)),
          Id: S.optional(S.String),
          Created: S.optional(S.String),
          LastModified: S.optional(S.String),
          Tags: S.optional(__S(16, __c2, 0)),
          State: S.optional(S.String),
          AppMonitorConfiguration: S.optional(__S(64, __c8, 0)),
          DataStorage: S.optional(__S(106, __c13, 2)),
          CustomEvents: S.optional(__S(65, __c8, 1)),
          DeobfuscationConfiguration: S.optional(__S(67, __c8, 3)),
          Platform: S.optional(S.String),
        }),
      ).annotate({ identifier: "AppMonitor" });
    case 4:
      return S.suspend(() => S.Struct({ AppMonitor: S.optional(__S(107, __c13, 3)) })).annotate({
        identifier: "GetAppMonitorResponse",
      });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ After: S.Number, Before: S.optional(S.Number) })).annotate({
        identifier: "TimeRange",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), Values: S.optional(__S(40, __c5, 0)) }),
      ).annotate({ identifier: "QueryFilter" });
    case 2:
      return S.Array(__S(113, __c14, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Name: S.String.pipe(T.HttpLabel("Name")),
          TimeRange: __S(112, __c14, 0),
          Filters: S.optional(__S(114, __c14, 2)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/appmonitor/{Name}/data" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAppMonitorDataRequest" });
    case 4:
      return S.suspend(() =>
        S.Struct({ Events: S.optional(__S(40, __c5, 0)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "GetAppMonitorDataResponse" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String.pipe(T.HttpLabel("Name")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/appmonitor/{Name}/policy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetResourcePolicyRequest" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ PolicyDocument: S.optional(S.String), PolicyRevisionId: S.optional(S.String) }),
      ).annotate({ identifier: "GetResourcePolicyResponse" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/appmonitors" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListAppMonitorsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Id: S.optional(S.String),
          Created: S.optional(S.String),
          LastModified: S.optional(S.String),
          State: S.optional(S.String),
          Platform: S.optional(S.String),
        }),
      ).annotate({ identifier: "AppMonitorSummary" });
    case 2:
      return S.Array(__S(137, __c17, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          AppMonitorSummaries: S.optional(__S(138, __c17, 2)),
        }),
      ).annotate({ identifier: "ListAppMonitorsResponse" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AppMonitorName: S.String.pipe(T.HttpLabel("AppMonitorName")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/rummetrics/{AppMonitorName}/metricsdestination" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListRumMetricsDestinationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Destination: S.optional(S.String),
          DestinationArn: S.optional(S.String),
          IamRoleArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "MetricDestinationSummary" });
    case 2:
      return S.Array(__S(145, __c18, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Destinations: S.optional(__S(146, __c18, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListRumMetricsDestinationsResponse" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/tags/{ResourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ ResourceArn: S.String, Tags: __S(16, __c2, 0) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String.pipe(T.HttpLabel("Name")),
          PolicyDocument: S.String,
          PolicyRevisionId: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/appmonitor/{Name}/policy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutResourcePolicyRequest" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          id: S.optional(S.String),
          version: S.optional(S.String),
        }),
      ).annotate({ identifier: "AppMonitorDetails" });
    case 1:
      return S.suspend(() =>
        S.Struct({ userId: S.optional(S.String), sessionId: S.optional(S.String) }),
      ).annotate({ identifier: "UserDetails" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          timestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          type: S.String,
          metadata: S.optional(S.String),
          details: S.String,
        }),
      ).annotate({ identifier: "RumEvent" });
    case 3:
      return S.Array(__S(170, __c21, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          Id: S.String.pipe(T.HttpLabel("Id")),
          BatchId: S.String,
          AppMonitorDetails: __S(168, __c21, 0),
          UserDetails: __S(169, __c21, 1),
          RumEvents: __S(171, __c21, 3),
          Alias: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/appmonitors/{Id}/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutRumEventsRequest" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AppMonitorName: S.String.pipe(T.HttpLabel("AppMonitorName")),
          Destination: S.String,
          DestinationArn: S.optional(S.String),
          IamRoleArn: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/rummetrics/{AppMonitorName}/metricsdestination" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutRumMetricsDestinationRequest" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          Tags: __S(16, __c2, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/tags/{ResourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          TagKeys: __S(40, __c5, 0).pipe(T.HttpQuery("tagKeys")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/tags/{ResourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String.pipe(T.HttpLabel("Name")),
          Domain: S.optional(S.String),
          DomainList: S.optional(__S(40, __c5, 0)),
          AppMonitorConfiguration: S.optional(__S(64, __c8, 0)),
          CwLogEnabled: S.optional(S.Boolean),
          CustomEvents: S.optional(__S(65, __c8, 1)),
          DeobfuscationConfiguration: S.optional(__S(67, __c8, 3)),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/appmonitor/{Name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateAppMonitorRequest" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AppMonitorName: S.String.pipe(T.HttpLabel("AppMonitorName")),
          Destination: S.String,
          DestinationArn: S.optional(S.String),
          MetricDefinition: __S(24, __c3, 0),
          MetricDefinitionId: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/rummetrics/{AppMonitorName}/metrics" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateRumMetricDefinitionRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
