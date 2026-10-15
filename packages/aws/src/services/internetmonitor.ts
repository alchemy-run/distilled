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
  sdkId: "InternetMonitor",
  serviceShapeName: "InternetMonitor20210603",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "internetmonitor" });
const ver = /*@__PURE__*/ T.ServiceVersion("2021-06-03");
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
              `https://internetmonitor-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://internetmonitor-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://internetmonitor.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://internetmonitor.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://internetmonitor.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class BadRequestException
  extends /*@__PURE__*/ S.TaggedError<BadRequestException>()(
    "BadRequestException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerErrorException
  extends /*@__PURE__*/ S.TaggedError<InternalServerErrorException>()(
    "InternalServerErrorException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(500), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(500), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class NotFoundException
  extends /*@__PURE__*/ S.TaggedError<NotFoundException>()(
    "NotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError, C.withNotFoundError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.HttpError(429),
      /*@__PURE__*/ T.Retryable({ throttling: true }),
    ),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class TooManyRequestsException
  extends /*@__PURE__*/ S.TaggedError<TooManyRequestsException>()(
    "TooManyRequestsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.HttpError(429),
      /*@__PURE__*/ T.Retryable({ throttling: true }),
    ),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type ResourceName = string;
export type Arn = string;
export type SetOfARNs = string[];
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export type MaxCityNetworksToMonitor = number;
export type LogDeliveryStatus = string;
export interface S3Config {
  BucketName?: string;
  BucketPrefix?: string;
  LogDeliveryStatus?: string;
}
export interface InternetMeasurementsLogDelivery {
  S3Config?: S3Config;
}
export type TrafficPercentageToMonitor = number;
export type Percentage = number;
export type LocalHealthEventsConfigStatus = string;
export interface LocalHealthEventsConfig {
  Status?: string;
  HealthScoreThreshold?: number;
  MinTrafficImpact?: number;
}
export interface HealthEventsConfig {
  AvailabilityScoreThreshold?: number;
  PerformanceScoreThreshold?: number;
  AvailabilityLocalHealthEventsConfig?: LocalHealthEventsConfig;
  PerformanceLocalHealthEventsConfig?: LocalHealthEventsConfig;
}
export interface CreateMonitorInput {
  MonitorName: string;
  Resources?: string[];
  ClientToken?: string;
  Tags?: { [key: string]: string | undefined };
  MaxCityNetworksToMonitor?: number;
  InternetMeasurementsLogDelivery?: InternetMeasurementsLogDelivery;
  TrafficPercentageToMonitor?: number;
  HealthEventsConfig?: HealthEventsConfig;
}
export type MonitorArn = string;
export type MonitorConfigState = string;
export interface CreateMonitorOutput {
  Arn: string;
  Status: string;
}
export interface DeleteMonitorInput {
  MonitorName: string;
}
export interface DeleteMonitorOutput {}
export type HealthEventName = string;
export type AccountId = string;
export interface GetHealthEventInput {
  MonitorName: string;
  EventId: string;
  LinkedAccountId?: string;
}
export type HealthEventStatus = string;
export interface Network {
  ASName: string;
  ASNumber: number;
}
export type NetworkList = Network[];
export type TriangulationEventType = string;
export interface NetworkImpairment {
  Networks: Network[];
  AsPath: Network[];
  NetworkEventType: string;
}
export interface AvailabilityMeasurement {
  ExperienceScore?: number;
  PercentOfTotalTrafficImpacted?: number;
  PercentOfClientLocationImpacted?: number;
}
export interface RoundTripTime {
  P50?: number;
  P90?: number;
  P95?: number;
}
export interface PerformanceMeasurement {
  ExperienceScore?: number;
  PercentOfTotalTrafficImpacted?: number;
  PercentOfClientLocationImpacted?: number;
  RoundTripTime?: RoundTripTime;
}
export interface InternetHealth {
  Availability?: AvailabilityMeasurement;
  Performance?: PerformanceMeasurement;
}
export type Ipv4PrefixList = string[];
export interface ImpactedLocation {
  ASName: string;
  ASNumber: number;
  Country: string;
  Subdivision?: string;
  Metro?: string;
  City?: string;
  Latitude?: number;
  Longitude?: number;
  CountryCode?: string;
  SubdivisionCode?: string;
  ServiceLocation?: string;
  Status: string;
  CausedBy?: NetworkImpairment;
  InternetHealth?: InternetHealth;
  Ipv4Prefixes?: string[];
}
export type ImpactedLocationsList = ImpactedLocation[];
export type HealthEventImpactType = string;
export interface GetHealthEventOutput {
  EventArn: string;
  EventId: string;
  StartedAt: Date;
  EndedAt?: Date;
  CreatedAt?: Date;
  LastUpdatedAt: Date;
  ImpactedLocations: ImpactedLocation[];
  Status: string;
  PercentOfTotalTrafficImpacted?: number;
  ImpactType: string;
  HealthScoreThreshold?: number;
}
export type InternetEventId = string;
export interface GetInternetEventInput {
  EventId: string;
}
export interface ClientLocation {
  ASName: string;
  ASNumber: number;
  Country: string;
  Subdivision?: string;
  Metro?: string;
  City: string;
  Latitude: number;
  Longitude: number;
}
export type InternetEventType = string;
export type InternetEventStatus = string;
export interface GetInternetEventOutput {
  EventId: string;
  EventArn: string;
  StartedAt: Date;
  EndedAt?: Date;
  ClientLocation: ClientLocation;
  EventType: string;
  EventStatus: string;
}
export interface GetMonitorInput {
  MonitorName: string;
  LinkedAccountId?: string;
}
export type MonitorProcessingStatusCode = string;
export interface GetMonitorOutput {
  MonitorName: string;
  MonitorArn: string;
  Resources: string[];
  Status: string;
  CreatedAt: Date;
  ModifiedAt: Date;
  ProcessingStatus?: string;
  ProcessingStatusInfo?: string;
  Tags?: { [key: string]: string | undefined };
  MaxCityNetworksToMonitor?: number;
  InternetMeasurementsLogDelivery?: InternetMeasurementsLogDelivery;
  TrafficPercentageToMonitor?: number;
  HealthEventsConfig?: HealthEventsConfig;
}
export type QueryMaxResults = number;
export interface GetQueryResultsInput {
  MonitorName: string;
  QueryId: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface QueryField {
  Name?: string;
  Type?: string;
}
export type QueryFields = QueryField[];
export type QueryRow = string[];
export type QueryData = string[][];
export interface GetQueryResultsOutput {
  Fields: QueryField[];
  Data?: string[][];
  NextToken?: string;
}
export interface GetQueryStatusInput {
  MonitorName: string;
  QueryId: string;
}
export type QueryStatus = string;
export interface GetQueryStatusOutput {
  Status: string;
}
export type MaxResults = number;
export interface ListHealthEventsInput {
  MonitorName: string;
  StartTime?: Date;
  EndTime?: Date;
  NextToken?: string;
  MaxResults?: number;
  EventStatus?: string;
  LinkedAccountId?: string;
}
export interface HealthEvent {
  EventArn: string;
  EventId: string;
  StartedAt: Date;
  EndedAt?: Date;
  CreatedAt?: Date;
  LastUpdatedAt: Date;
  ImpactedLocations: ImpactedLocation[];
  Status: string;
  PercentOfTotalTrafficImpacted?: number;
  ImpactType: string;
  HealthScoreThreshold?: number;
}
export type HealthEventList = HealthEvent[];
export interface ListHealthEventsOutput {
  HealthEvents: HealthEvent[];
  NextToken?: string;
}
export type InternetEventMaxResults = number;
export interface ListInternetEventsInput {
  NextToken?: string;
  MaxResults?: number;
  StartTime?: Date;
  EndTime?: Date;
  EventStatus?: string;
  EventType?: string;
}
export interface InternetEventSummary {
  EventId: string;
  EventArn: string;
  StartedAt: Date;
  EndedAt?: Date;
  ClientLocation: ClientLocation;
  EventType: string;
  EventStatus: string;
}
export type InternetEventsList = InternetEventSummary[];
export interface ListInternetEventsOutput {
  InternetEvents: InternetEventSummary[];
  NextToken?: string;
}
export interface ListMonitorsInput {
  NextToken?: string;
  MaxResults?: number;
  MonitorStatus?: string;
  IncludeLinkedAccounts?: boolean;
}
export interface Monitor {
  MonitorName: string;
  MonitorArn: string;
  Status: string;
  ProcessingStatus?: string;
}
export type MonitorList = Monitor[];
export interface ListMonitorsOutput {
  Monitors: Monitor[];
  NextToken?: string;
}
export interface ListTagsForResourceInput {
  ResourceArn: string;
}
export interface ListTagsForResourceOutput {
  Tags?: { [key: string]: string | undefined };
}
export type QueryType = string;
export type Operator = string;
export type FilterList = string[];
export interface FilterParameter {
  Field?: string;
  Operator?: string;
  Values?: string[];
}
export type FilterParameters = FilterParameter[];
export interface StartQueryInput {
  MonitorName: string;
  StartTime: Date;
  EndTime: Date;
  QueryType: string;
  FilterParameters?: FilterParameter[];
  LinkedAccountId?: string;
}
export interface StartQueryOutput {
  QueryId: string;
}
export interface StopQueryInput {
  MonitorName: string;
  QueryId: string;
}
export interface StopQueryOutput {}
export interface TagResourceInput {
  ResourceArn: string;
  Tags: { [key: string]: string | undefined };
}
export interface TagResourceOutput {}
export type TagKeys = string[];
export interface UntagResourceInput {
  ResourceArn: string;
  TagKeys: string[];
}
export interface UntagResourceOutput {}
export interface UpdateMonitorInput {
  MonitorName: string;
  ResourcesToAdd?: string[];
  ResourcesToRemove?: string[];
  Status?: string;
  ClientToken?: string;
  MaxCityNetworksToMonitor?: number;
  InternetMeasurementsLogDelivery?: InternetMeasurementsLogDelivery;
  TrafficPercentageToMonitor?: number;
  HealthEventsConfig?: HealthEventsConfig;
}
export interface UpdateMonitorOutput {
  MonitorArn: string;
  Status: string;
}
export type CreateMonitorError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | LimitExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a monitor in Amazon CloudWatch Internet Monitor. A monitor is built based on information from the application resources that you add: VPCs,
 * Network Load Balancers (NLBs), Amazon CloudFront distributions, and Amazon WorkSpaces directories. Internet Monitor then publishes internet measurements from Amazon Web Services
 * that are specific to the *city-networks*. That is, the locations and ASNs (typically internet service providers or ISPs),
 * where clients access your application. For more information, see Using Amazon CloudWatch Internet Monitor in the Amazon CloudWatch User
 * Guide.
 *
 * When you create a monitor, you choose the percentage of traffic that you want to monitor. You can also set a maximum limit for the
 * number of city-networks where client traffic is monitored, that caps the total traffic that Internet Monitor monitors. A city-network
 * maximum is the limit of city-networks, but you only pay for the number of city-networks that are actually monitored. You can update your monitor
 * at any time to change the percentage of traffic to monitor or the city-networks maximum. For more information, see Choosing a city-network maximum value in the *Amazon CloudWatch User Guide*.
 */
export const createMonitor: API.OperationMethod<
  CreateMonitorInput,
  CreateMonitorOutput,
  CreateMonitorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<CreateMonitorInput>,
  output: __S(1, __c0, 1) as any as S.Schema<CreateMonitorOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    LimitExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMonitor",
}));

export type DeleteMonitorError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a monitor in Amazon CloudWatch Internet Monitor.
 */
export const deleteMonitor: API.OperationMethod<
  DeleteMonitorInput,
  DeleteMonitorOutput,
  DeleteMonitorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c4, 0) as any as S.Schema<DeleteMonitorInput>,
  output: __S(80, __c5, 0) as any as S.Schema<DeleteMonitorOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMonitor",
}));

export type GetHealthEventError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information that Amazon CloudWatch Internet Monitor has created and stored about a health event for a specified monitor. This information includes the impacted locations,
 * and all the information related to the event, by location.
 *
 * The information returned includes the impact on performance, availability, and round-trip time, information about the network providers (ASNs),
 * the event type, and so on.
 *
 * Information rolled up at the global traffic level is also returned, including the impact type and total traffic impact.
 */
export const getHealthEvent: API.OperationMethod<
  GetHealthEventInput,
  GetHealthEventOutput,
  GetHealthEventError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c6, 0) as any as S.Schema<GetHealthEventInput>,
  output: __S(121, __c7, 9) as any as S.Schema<GetHealthEventOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetHealthEvent",
}));

export type GetInternetEventError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information that Amazon CloudWatch Internet Monitor has generated about an internet event. Internet Monitor displays information about
 * recent global health events, called internet events, on a global outages map that is available to all Amazon Web Services
 * customers.
 *
 * The information returned here includes the impacted location,
 * when the event started and (if the event is over) ended, the type of event (`PERFORMANCE` or `AVAILABILITY`),
 * and the status (`ACTIVE` or `RESOLVED`).
 */
export const getInternetEvent: API.OperationMethod<
  GetInternetEventInput,
  GetInternetEventOutput,
  GetInternetEventError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c8, 0) as any as S.Schema<GetInternetEventInput>,
  output: __S(145, __c9, 1) as any as S.Schema<GetInternetEventOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInternetEvent",
}));

export type GetMonitorError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets information about a monitor in Amazon CloudWatch Internet Monitor based on a monitor name. The information returned includes the Amazon Resource Name (ARN), create time,
 * modified time, resources included in the monitor, and status information.
 */
export const getMonitor: API.OperationMethod<
  GetMonitorInput,
  GetMonitorOutput,
  GetMonitorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c10, 0) as any as S.Schema<GetMonitorInput>,
  output: __S(161, __c10, 1) as any as S.Schema<GetMonitorOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMonitor",
}));

export type GetQueryResultsError =
  | AccessDeniedException
  | InternalServerException
  | LimitExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Return the data for a query with the Amazon CloudWatch Internet Monitor query interface. Specify the query that you want to return results for by providing
 * a `QueryId` and a monitor name.
 *
 * For more information about using the query interface, including examples, see
 * Using the Amazon CloudWatch Internet Monitor query interface
 * in the Amazon CloudWatch Internet Monitor User Guide.
 */
export const getQueryResults: API.PaginatedOperationMethod<
  GetQueryResultsInput,
  GetQueryResultsOutput,
  GetQueryResultsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(176, __c11, 0) as any as S.Schema<GetQueryResultsInput>,
  output: __S(180, __c11, 4) as any as S.Schema<GetQueryResultsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    LimitExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetQueryResults",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetQueryStatusError =
  | AccessDeniedException
  | InternalServerException
  | LimitExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the current status of a query for the Amazon CloudWatch Internet Monitor query interface, for a specified query ID and monitor.
 * When you run a query, check the status to make sure that the query has `SUCCEEDED` before you review the results.
 *
 * - `QUEUED`: The query is scheduled to run.
 *
 * - `RUNNING`: The query is in progress but not complete.
 *
 * - `SUCCEEDED`: The query completed sucessfully.
 *
 * - `FAILED`: The query failed due to an error.
 *
 * - `CANCELED`: The query was canceled.
 */
export const getQueryStatus: API.OperationMethod<
  GetQueryStatusInput,
  GetQueryStatusOutput,
  GetQueryStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c12, 0) as any as S.Schema<GetQueryStatusInput>,
  output: __S(193, __c12, 1) as any as S.Schema<GetQueryStatusOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    LimitExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetQueryStatus",
}));

export type ListHealthEventsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all health events for a monitor in Amazon CloudWatch Internet Monitor. Returns information for health events including the event start and end times, and
 * the status.
 *
 * Health events that have start times during the time frame that is requested are not included in the list of health events.
 */
export const listHealthEvents: API.PaginatedOperationMethod<
  ListHealthEventsInput,
  ListHealthEventsOutput,
  ListHealthEventsError,
  Credentials | HttpClient.HttpClient,
  HealthEvent
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(208, __c13, 0) as any as S.Schema<ListHealthEventsInput>,
  output: __S(210, __c13, 2) as any as S.Schema<ListHealthEventsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListHealthEvents",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "HealthEvents",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListInternetEventsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists internet events that cause performance or availability issues for client locations. Amazon CloudWatch Internet Monitor displays information about
 * recent global health events, called internet events, on a global outages map that is available to all Amazon Web Services
 * customers.
 *
 * You can constrain the list of internet events returned by providing a start time and end time to define a total
 * time frame for events you want to list. Both start time and end time specify the time when an event started. End time
 * is optional. If you don't include it, the default end time is the current time.
 *
 * You can also limit the events returned to a specific status
 * (`ACTIVE` or `RESOLVED`) or type (`PERFORMANCE` or `AVAILABILITY`).
 */
export const listInternetEvents: API.PaginatedOperationMethod<
  ListInternetEventsInput,
  ListInternetEventsOutput,
  ListInternetEventsError,
  Credentials | HttpClient.HttpClient,
  InternetEventSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(224, __c14, 0) as any as S.Schema<ListInternetEventsInput>,
  output: __S(226, __c14, 2) as any as S.Schema<ListInternetEventsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInternetEvents",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "InternetEvents",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListMonitorsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all of your monitors for Amazon CloudWatch Internet Monitor and their statuses, along with the Amazon Resource Name (ARN) and name of each monitor.
 */
export const listMonitors: API.PaginatedOperationMethod<
  ListMonitorsInput,
  ListMonitorsOutput,
  ListMonitorsError,
  Credentials | HttpClient.HttpClient,
  Monitor
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(240, __c15, 0) as any as S.Schema<ListMonitorsInput>,
  output: __S(243, __c15, 3) as any as S.Schema<ListMonitorsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMonitors",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Monitors",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists the tags for a resource. Tags are supported only for monitors in Amazon CloudWatch Internet Monitor.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceInput,
  ListTagsForResourceOutput,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c16, 0) as any as S.Schema<ListTagsForResourceInput>,
  output: __S(257, __c16, 1) as any as S.Schema<ListTagsForResourceOutput>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type StartQueryError =
  | AccessDeniedException
  | InternalServerException
  | LimitExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Start a query to return data for a specific query type for the Amazon CloudWatch Internet Monitor query interface. Specify a time period
 * for the data that you want returned by using `StartTime` and `EndTime`. You filter the query
 * results to return by providing parameters that you specify with `FilterParameters`.
 *
 * For more information about using the query interface, including examples, see
 * Using the Amazon CloudWatch Internet Monitor query interface
 * in the Amazon CloudWatch Internet Monitor User Guide.
 */
export const startQuery: API.OperationMethod<
  StartQueryInput,
  StartQueryOutput,
  StartQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(274, __c17, 2) as any as S.Schema<StartQueryInput>,
  output: __S(275, __c17, 3) as any as S.Schema<StartQueryOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    LimitExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartQuery",
}));

export type StopQueryError =
  | AccessDeniedException
  | InternalServerException
  | LimitExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stop a query that is progress for a specific monitor.
 */
export const stopQuery: API.OperationMethod<
  StopQueryInput,
  StopQueryOutput,
  StopQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(288, __c18, 0) as any as S.Schema<StopQueryInput>,
  output: __S(80, __c5, 0) as any as S.Schema<StopQueryOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    LimitExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopQuery",
}));

export type TagResourceError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Adds a tag to a resource. Tags are supported only for monitors in Amazon CloudWatch Internet Monitor. You can add a maximum of 50 tags in Internet Monitor.
 *
 * A minimum of one tag is required for this call. It returns an error if you use the `TagResource` request with 0 tags.
 */
export const tagResource: API.OperationMethod<
  TagResourceInput,
  TagResourceOutput,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(304, __c19, 0) as any as S.Schema<TagResourceInput>,
  output: __S(80, __c5, 0) as any as S.Schema<TagResourceOutput>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Removes a tag from a resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput,
  UntagResourceOutput,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c20, 0) as any as S.Schema<UntagResourceInput>,
  output: __S(80, __c5, 0) as any as S.Schema<UntagResourceOutput>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateMonitorError =
  | AccessDeniedException
  | InternalServerException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a monitor. You can update a monitor to change the percentage of traffic to monitor or the maximum number of city-networks
 * (locations and ASNs), to add or remove resources, or to change the status of the monitor. Note that you can't change the name of a monitor.
 *
 * The city-network maximum that you choose is the limit, but you only pay for the number of city-networks that are actually monitored.
 * For more information, see Choosing a city-network maximum value in the *Amazon CloudWatch User Guide*.
 */
export const updateMonitor: API.OperationMethod<
  UpdateMonitorInput,
  UpdateMonitorOutput,
  UpdateMonitorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(336, __c21, 0) as any as S.Schema<UpdateMonitorInput>,
  output: __S(337, __c21, 1) as any as S.Schema<UpdateMonitorOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMonitor",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MonitorName: S.String,
          Resources: S.optional(__S(16, __c1, 0)),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Tags: S.optional(__S(32, __c2, 0)),
          MaxCityNetworksToMonitor: S.optional(S.Number),
          InternetMeasurementsLogDelivery: S.optional(__S(49, __c3, 1)),
          TrafficPercentageToMonitor: S.optional(S.Number),
          HealthEventsConfig: S.optional(__S(51, __c3, 3)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v20210603/Monitors" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateMonitorInput" });
    case 1:
      return S.suspend(() => S.Struct({ Arn: S.String, Status: S.String })).annotate({
        identifier: "CreateMonitorOutput",
      });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
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
          BucketName: S.optional(S.String),
          BucketPrefix: S.optional(S.String),
          LogDeliveryStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "S3Config" });
    case 1:
      return S.suspend(() => S.Struct({ S3Config: S.optional(__S(48, __c3, 0)) })).annotate({
        identifier: "InternetMeasurementsLogDelivery",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Status: S.optional(S.String),
          HealthScoreThreshold: S.optional(S.Number),
          MinTrafficImpact: S.optional(S.Number),
        }),
      ).annotate({ identifier: "LocalHealthEventsConfig" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          AvailabilityScoreThreshold: S.optional(S.Number),
          PerformanceScoreThreshold: S.optional(S.Number),
          AvailabilityLocalHealthEventsConfig: S.optional(__S(50, __c3, 2)),
          PerformanceLocalHealthEventsConfig: S.optional(__S(50, __c3, 2)),
        }),
      ).annotate({ identifier: "HealthEventsConfig" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MonitorName: S.String.pipe(T.HttpLabel("MonitorName")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v20210603/Monitors/{MonitorName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteMonitorInput" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeleteMonitorOutput" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MonitorName: S.String.pipe(T.HttpLabel("MonitorName")),
          EventId: S.String.pipe(T.HttpLabel("EventId")),
          LinkedAccountId: S.optional(S.String).pipe(T.HttpQuery("LinkedAccountId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v20210603/Monitors/{MonitorName}/HealthEvents/{EventId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetHealthEventInput" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ ASName: S.String, ASNumber: S.Number })).annotate({
        identifier: "Network",
      });
    case 1:
      return S.Array(__S(112, __c7, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Networks: __S(113, __c7, 1),
          AsPath: __S(113, __c7, 1),
          NetworkEventType: S.String,
        }),
      ).annotate({ identifier: "NetworkImpairment" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          ExperienceScore: S.optional(S.Number),
          PercentOfTotalTrafficImpacted: S.optional(S.Number),
          PercentOfClientLocationImpacted: S.optional(S.Number),
        }),
      ).annotate({ identifier: "AvailabilityMeasurement" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          P50: S.optional(S.Number),
          P90: S.optional(S.Number),
          P95: S.optional(S.Number),
        }),
      ).annotate({ identifier: "RoundTripTime" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          ExperienceScore: S.optional(S.Number),
          PercentOfTotalTrafficImpacted: S.optional(S.Number),
          PercentOfClientLocationImpacted: S.optional(S.Number),
          RoundTripTime: S.optional(__S(116, __c7, 4)),
        }),
      ).annotate({ identifier: "PerformanceMeasurement" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          Availability: S.optional(__S(115, __c7, 3)),
          Performance: S.optional(__S(117, __c7, 5)),
        }),
      ).annotate({ identifier: "InternetHealth" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          ASName: S.String,
          ASNumber: S.Number,
          Country: S.String,
          Subdivision: S.optional(S.String),
          Metro: S.optional(S.String),
          City: S.optional(S.String),
          Latitude: S.optional(S.Number),
          Longitude: S.optional(S.Number),
          CountryCode: S.optional(S.String),
          SubdivisionCode: S.optional(S.String),
          ServiceLocation: S.optional(S.String),
          Status: S.String,
          CausedBy: S.optional(__S(114, __c7, 2)),
          InternetHealth: S.optional(__S(118, __c7, 6)),
          Ipv4Prefixes: S.optional(__S(16, __c1, 0)),
        }),
      ).annotate({ identifier: "ImpactedLocation" });
    case 8:
      return S.Array(__S(119, __c7, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({
          EventArn: S.String,
          EventId: S.String,
          StartedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          EndedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          CreatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          LastUpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ImpactedLocations: __S(120, __c7, 8),
          Status: S.String,
          PercentOfTotalTrafficImpacted: S.optional(S.Number),
          ImpactType: S.String,
          HealthScoreThreshold: S.optional(S.Number),
        }),
      ).annotate({ identifier: "GetHealthEventOutput" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ EventId: S.String.pipe(T.HttpLabel("EventId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v20210603/InternetEvents/{EventId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetInternetEventInput" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ASName: S.String,
          ASNumber: S.Number,
          Country: S.String,
          Subdivision: S.optional(S.String),
          Metro: S.optional(S.String),
          City: S.String,
          Latitude: S.Number,
          Longitude: S.Number,
        }),
      ).annotate({ identifier: "ClientLocation" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          EventId: S.String,
          EventArn: S.String,
          StartedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          EndedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          ClientLocation: __S(144, __c9, 0),
          EventType: S.String,
          EventStatus: S.String,
        }),
      ).annotate({ identifier: "GetInternetEventOutput" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MonitorName: S.String.pipe(T.HttpLabel("MonitorName")),
          LinkedAccountId: S.optional(S.String).pipe(T.HttpQuery("LinkedAccountId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v20210603/Monitors/{MonitorName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetMonitorInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          MonitorName: S.String,
          MonitorArn: S.String,
          Resources: __S(16, __c1, 0),
          Status: S.String,
          CreatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ModifiedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ProcessingStatus: S.optional(S.String),
          ProcessingStatusInfo: S.optional(S.String),
          Tags: S.optional(__S(32, __c2, 0)),
          MaxCityNetworksToMonitor: S.optional(S.Number),
          InternetMeasurementsLogDelivery: S.optional(__S(49, __c3, 1)),
          TrafficPercentageToMonitor: S.optional(S.Number),
          HealthEventsConfig: S.optional(__S(51, __c3, 3)),
        }),
      ).annotate({ identifier: "GetMonitorOutput" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MonitorName: S.String.pipe(T.HttpLabel("MonitorName")),
          QueryId: S.String.pipe(T.HttpLabel("QueryId")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v20210603/Monitors/{MonitorName}/Queries/{QueryId}/Results",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetQueryResultsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), Type: S.optional(S.String) }),
      ).annotate({ identifier: "QueryField" });
    case 2:
      return S.Array(__S(177, __c11, 1));
    case 3:
      return S.Array(__S(16, __c1, 0));
    case 4:
      return S.suspend(() =>
        S.Struct({
          Fields: __S(178, __c11, 2),
          Data: S.optional(__S(179, __c11, 3)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetQueryResultsOutput" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MonitorName: S.String.pipe(T.HttpLabel("MonitorName")),
          QueryId: S.String.pipe(T.HttpLabel("QueryId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v20210603/Monitors/{MonitorName}/Queries/{QueryId}/Status",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetQueryStatusInput" });
    case 1:
      return S.suspend(() => S.Struct({ Status: S.String })).annotate({
        identifier: "GetQueryStatusOutput",
      });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MonitorName: S.String.pipe(T.HttpLabel("MonitorName")),
          StartTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))).pipe(
            T.HttpQuery("StartTime"),
          ),
          EndTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))).pipe(
            T.HttpQuery("EndTime"),
          ),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
          EventStatus: S.optional(S.String).pipe(T.HttpQuery("EventStatus")),
          LinkedAccountId: S.optional(S.String).pipe(T.HttpQuery("LinkedAccountId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v20210603/Monitors/{MonitorName}/HealthEvents" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListHealthEventsInput" });
    case 1:
      return S.Array(__S(121, __c7, 9));
    case 2:
      return S.suspend(() =>
        S.Struct({ HealthEvents: __S(209, __c13, 1), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListHealthEventsOutput" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("InternetEventMaxResults")),
          StartTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))).pipe(
            T.HttpQuery("StartTime"),
          ),
          EndTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))).pipe(
            T.HttpQuery("EndTime"),
          ),
          EventStatus: S.optional(S.String).pipe(T.HttpQuery("EventStatus")),
          EventType: S.optional(S.String).pipe(T.HttpQuery("EventType")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v20210603/InternetEvents" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListInternetEventsInput" });
    case 1:
      return S.Array(__S(145, __c9, 1));
    case 2:
      return S.suspend(() =>
        S.Struct({ InternetEvents: __S(225, __c14, 1), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListInternetEventsOutput" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
          MonitorStatus: S.optional(S.String).pipe(T.HttpQuery("MonitorStatus")),
          IncludeLinkedAccounts: S.optional(S.Boolean).pipe(T.HttpQuery("IncludeLinkedAccounts")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v20210603/Monitors" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListMonitorsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          MonitorName: S.String,
          MonitorArn: S.String,
          Status: S.String,
          ProcessingStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "Monitor" });
    case 2:
      return S.Array(__S(241, __c15, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Monitors: __S(242, __c15, 2), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListMonitorsOutput" });
  }
}
function __c16(j: number): any {
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
      ).annotate({ identifier: "ListTagsForResourceInput" });
    case 1:
      return S.suspend(() => S.Struct({ Tags: S.optional(__S(32, __c2, 0)) })).annotate({
        identifier: "ListTagsForResourceOutput",
      });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Field: S.optional(S.String),
          Operator: S.optional(S.String),
          Values: S.optional(__S(16, __c1, 0)),
        }),
      ).annotate({ identifier: "FilterParameter" });
    case 1:
      return S.Array(__S(272, __c17, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          MonitorName: S.String.pipe(T.HttpLabel("MonitorName")),
          StartTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          EndTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          QueryType: S.String,
          FilterParameters: S.optional(__S(273, __c17, 1)),
          LinkedAccountId: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v20210603/Monitors/{MonitorName}/Queries" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartQueryInput" });
    case 3:
      return S.suspend(() => S.Struct({ QueryId: S.String })).annotate({
        identifier: "StartQueryOutput",
      });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MonitorName: S.String.pipe(T.HttpLabel("MonitorName")),
          QueryId: S.String.pipe(T.HttpLabel("QueryId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/v20210603/Monitors/{MonitorName}/Queries/{QueryId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StopQueryInput" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          Tags: __S(32, __c2, 0),
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
      ).annotate({ identifier: "TagResourceInput" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          TagKeys: __S(16, __c1, 0).pipe(T.HttpQuery("tagKeys")),
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
      ).annotate({ identifier: "UntagResourceInput" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MonitorName: S.String.pipe(T.HttpLabel("MonitorName")),
          ResourcesToAdd: S.optional(__S(16, __c1, 0)),
          ResourcesToRemove: S.optional(__S(16, __c1, 0)),
          Status: S.optional(S.String),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          MaxCityNetworksToMonitor: S.optional(S.Number),
          InternetMeasurementsLogDelivery: S.optional(__S(49, __c3, 1)),
          TrafficPercentageToMonitor: S.optional(S.Number),
          HealthEventsConfig: S.optional(__S(51, __c3, 3)),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/v20210603/Monitors/{MonitorName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateMonitorInput" });
    case 1:
      return S.suspend(() => S.Struct({ MonitorArn: S.String, Status: S.String })).annotate({
        identifier: "UpdateMonitorOutput",
      });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
