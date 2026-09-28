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
  sdkId: "RUM",
  target: "RUM",
  version: "2018-05-10",
  sigv4: "rum",
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
                `https://rum-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://rum-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://rum.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://rum.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  })<{ readonly message: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{
    readonly message: string;
    readonly resourceName: string;
    readonly resourceType?: string;
  }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError", "RetryableError"],
    { status: 500, headers: { retryAfterSeconds: ["Retry-After", "num"] } },
  )<{ readonly message: string; readonly retryAfterSeconds?: number }> {}
export class InvalidPolicyRevisionIdException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidPolicyRevisionIdException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string }> {}
export class MalformedPolicyDocumentException
  extends /*@__PURE__*/ TE.TaggedError(
    "MalformedPolicyDocumentException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string }> {}
export class PolicyNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "PolicyNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message: string }> {}
export class PolicySizeLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "PolicySizeLimitExceededException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{
    readonly message: string;
    readonly resourceName: string;
    readonly resourceType?: string;
  }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly message: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError", "RetryableError"],
    { status: 429, headers: { retryAfterSeconds: ["Retry-After", "num"] } },
  )<{
    readonly message: string;
    readonly serviceCode?: string;
    readonly quotaCode?: string;
    readonly retryAfterSeconds?: number;
  }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string }> {}
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
export type BatchCreateRumMetricDefinitionsErrors =
  BatchCreateRumMetricDefinitionsError_[];
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
export type BatchDeleteRumMetricDefinitionsErrors =
  BatchDeleteRumMetricDefinitionsError_[];
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
  descriptor: {
    service: svc,
    http: "POST /rummetrics/{AppMonitorName}/metrics",
    input: {
      AppMonitorName: 0,
      Destination: 0,
      DestinationArn: 0,
      MetricDefinitions: D.list(i_MetricDefinitionRequest),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /rummetrics/{AppMonitorName}/metrics",
    input: {
      AppMonitorName: 0,
      Destination: D.m({ query: "destination" }),
      DestinationArn: D.m({ query: "destinationArn" }),
      MetricDefinitionIds: D.m({ query: "metricDefinitionIds" }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /rummetrics/{AppMonitorName}/metrics",
    input: {
      AppMonitorName: 0,
      Destination: D.m({ query: "destination" }),
      DestinationArn: D.m({ query: "destinationArn" }),
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "POST /appmonitor",
    input: {
      Name: 0,
      Domain: 0,
      DomainList: 0,
      Tags: 0,
      AppMonitorConfiguration: i_AppMonitorConfiguration,
      CwLogEnabled: 0,
      CustomEvents: i_CustomEvents,
      DeobfuscationConfiguration: i_DeobfuscationConfiguration,
      Platform: 0,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /appmonitor/{Name}",
    input: { Name: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /appmonitor/{Name}/policy",
    input: { Name: 0, PolicyRevisionId: D.m({ query: "policyRevisionId" }) },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /rummetrics/{AppMonitorName}/metricsdestination",
    input: {
      AppMonitorName: 0,
      Destination: D.m({ query: "destination" }),
      DestinationArn: D.m({ query: "destinationArn" }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /appmonitor/{Name}",
    input: { Name: 0 },
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
  operationName: "GetAppMonitor",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /appmonitor/{Name}/data",
    input: {
      Name: 0,
      TimeRange: { After: 0, Before: 0 },
      Filters: D.list({ Name: 0, Values: 0 }),
      MaxResults: 0,
      NextToken: 0,
    },
    body: true,
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
  descriptor: {
    service: svc,
    http: "GET /appmonitor/{Name}/policy",
    input: { Name: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /appmonitors",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /rummetrics/{AppMonitorName}/metricsdestination",
    input: {
      AppMonitorName: 0,
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /tags/{ResourceArn}",
    input: { ResourceArn: 0 },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /appmonitor/{Name}/policy",
    input: { Name: 0, PolicyDocument: 0, PolicyRevisionId: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /appmonitors/{Id}/",
    input: {
      Id: 0,
      BatchId: 0,
      AppMonitorDetails: { name: 0, id: 0, version: 0 },
      UserDetails: { userId: 0, sessionId: 0 },
      RumEvents: D.list({
        id: 0,
        timestamp: 0,
        type: 0,
        metadata: 0,
        details: 0,
      }),
      Alias: 0,
    },
    body: true,
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
  operationName: "PutRumEvents",
  endpointHostPrefix: "dataplane.",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /rummetrics/{AppMonitorName}/metricsdestination",
    input: {
      AppMonitorName: 0,
      Destination: 0,
      DestinationArn: 0,
      IamRoleArn: 0,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /tags/{ResourceArn}",
    input: { ResourceArn: 0, Tags: 0 },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /tags/{ResourceArn}",
    input: { ResourceArn: 0, TagKeys: D.m({ query: "tagKeys" }) },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /appmonitor/{Name}",
    input: {
      Name: 0,
      Domain: 0,
      DomainList: 0,
      AppMonitorConfiguration: i_AppMonitorConfiguration,
      CwLogEnabled: 0,
      CustomEvents: i_CustomEvents,
      DeobfuscationConfiguration: i_DeobfuscationConfiguration,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /rummetrics/{AppMonitorName}/metrics",
    input: {
      AppMonitorName: 0,
      Destination: 0,
      DestinationArn: 0,
      MetricDefinition: i_MetricDefinitionRequest,
      MetricDefinitionId: 0,
    },
    body: true,
  },
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
})) as any;

const i_AppMonitorConfiguration: D.LazyStruct = () => ({
  IdentityPoolId: 0,
  ExcludedPages: 0,
  IncludedPages: 0,
  FavoritePages: 0,
  SessionSampleRate: 0,
  GuestRoleArn: 0,
  AllowCookies: 0,
  Telemetries: 0,
  EnableXRay: 0,
});
const i_CustomEvents: D.LazyStruct = () => ({ Status: 0 });
const i_DeobfuscationConfiguration: D.LazyStruct = () => ({
  JavaScriptSourceMaps: { Status: 0, S3Uri: 0 },
});
const i_MetricDefinitionRequest: D.LazyStruct = () => ({
  Name: 0,
  ValueKey: 0,
  UnitLabel: 0,
  DimensionKeys: 0,
  EventPattern: 0,
  Namespace: 0,
});
