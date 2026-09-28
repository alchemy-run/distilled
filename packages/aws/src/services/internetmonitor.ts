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
  sdkId: "InternetMonitor",
  target: "InternetMonitor20210603",
  version: "2021-06-03",
  sigv4: "internetmonitor",
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://internetmonitor.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://internetmonitor.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  })<{ readonly message?: string }> {}
export class BadRequestException
  extends /*@__PURE__*/ TE.TaggedError(
    "BadRequestException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message?: string }> {}
export class InternalServerErrorException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerErrorException",
    ["ServerError", "RetryableError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError", "RetryableError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class LimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "LimitExceededException",
    ["AuthError"],
    { status: 403 },
  )<{ readonly message?: string }> {}
export class NotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "NotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError", "NotFoundError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError", "RetryableError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class TooManyRequestsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyRequestsException",
    ["ThrottlingError", "RetryableError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
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
  descriptor: {
    service: svc,
    http: "POST /v20210603/Monitors",
    input: {
      MonitorName: 0,
      Resources: 0,
      ClientToken: D.m({ idempotency: true }),
      Tags: 0,
      MaxCityNetworksToMonitor: 0,
      InternetMeasurementsLogDelivery: i_InternetMeasurementsLogDelivery,
      TrafficPercentageToMonitor: 0,
      HealthEventsConfig: i_HealthEventsConfig,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /v20210603/Monitors/{MonitorName}",
    input: { MonitorName: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v20210603/Monitors/{MonitorName}/HealthEvents/{EventId}",
    input: {
      MonitorName: 0,
      EventId: 0,
      LinkedAccountId: D.m({ query: "LinkedAccountId" }),
    },
    output: {
      StartedAt: D.ts,
      EndedAt: D.ts,
      CreatedAt: D.ts,
      LastUpdatedAt: D.ts,
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
  operationName: "GetHealthEvent",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v20210603/InternetEvents/{EventId}",
    input: { EventId: 0 },
    output: { StartedAt: D.ts, EndedAt: D.ts },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInternetEvent",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v20210603/Monitors/{MonitorName}",
    input: {
      MonitorName: 0,
      LinkedAccountId: D.m({ query: "LinkedAccountId" }),
    },
    output: { CreatedAt: D.ts, ModifiedAt: D.ts },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v20210603/Monitors/{MonitorName}/Queries/{QueryId}/Results",
    input: {
      MonitorName: 0,
      QueryId: 0,
      NextToken: D.m({ query: "NextToken" }),
      MaxResults: D.m({ query: "MaxResults" }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /v20210603/Monitors/{MonitorName}/Queries/{QueryId}/Status",
    input: { MonitorName: 0, QueryId: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v20210603/Monitors/{MonitorName}/HealthEvents",
    input: {
      MonitorName: 0,
      StartTime: D.m({ query: "StartTime" }),
      EndTime: D.m({ query: "EndTime" }),
      NextToken: D.m({ query: "NextToken" }),
      MaxResults: D.m({ query: "MaxResults" }),
      EventStatus: D.m({ query: "EventStatus" }),
      LinkedAccountId: D.m({ query: "LinkedAccountId" }),
    },
    output: {
      HealthEvents: D.list({
        StartedAt: D.ts,
        EndedAt: D.ts,
        CreatedAt: D.ts,
        LastUpdatedAt: D.ts,
      }),
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
  descriptor: {
    service: svc,
    http: "GET /v20210603/InternetEvents",
    input: {
      NextToken: D.m({ query: "NextToken" }),
      MaxResults: D.m({ query: "InternetEventMaxResults" }),
      StartTime: D.m({ query: "StartTime" }),
      EndTime: D.m({ query: "EndTime" }),
      EventStatus: D.m({ query: "EventStatus" }),
      EventType: D.m({ query: "EventType" }),
    },
    output: { InternetEvents: D.list({ StartedAt: D.ts, EndedAt: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    http: "GET /v20210603/Monitors",
    input: {
      NextToken: D.m({ query: "NextToken" }),
      MaxResults: D.m({ query: "MaxResults" }),
      MonitorStatus: D.m({ query: "MonitorStatus" }),
      IncludeLinkedAccounts: D.m({ query: "IncludeLinkedAccounts" }),
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
  descriptor: {
    service: svc,
    http: "GET /tags/{ResourceArn}",
    input: { ResourceArn: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v20210603/Monitors/{MonitorName}/Queries",
    input: {
      MonitorName: 0,
      StartTime: D.tsAs("date-time"),
      EndTime: D.tsAs("date-time"),
      QueryType: 0,
      FilterParameters: D.list({ Field: 0, Operator: 0, Values: 0 }),
      LinkedAccountId: 0,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /v20210603/Monitors/{MonitorName}/Queries/{QueryId}",
    input: { MonitorName: 0, QueryId: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /tags/{ResourceArn}",
    input: { ResourceArn: 0, Tags: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /tags/{ResourceArn}",
    input: { ResourceArn: 0, TagKeys: D.m({ query: "tagKeys" }) },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /v20210603/Monitors/{MonitorName}",
    input: {
      MonitorName: 0,
      ResourcesToAdd: 0,
      ResourcesToRemove: 0,
      Status: 0,
      ClientToken: D.m({ idempotency: true }),
      MaxCityNetworksToMonitor: 0,
      InternetMeasurementsLogDelivery: i_InternetMeasurementsLogDelivery,
      TrafficPercentageToMonitor: 0,
      HealthEventsConfig: i_HealthEventsConfig,
    },
    body: true,
  },
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
})) as any;

const i_HealthEventsConfig: D.LazyStruct = () => ({
  AvailabilityScoreThreshold: 0,
  PerformanceScoreThreshold: 0,
  AvailabilityLocalHealthEventsConfig: i_LocalHealthEventsConfig,
  PerformanceLocalHealthEventsConfig: i_LocalHealthEventsConfig,
});
const i_InternetMeasurementsLogDelivery: D.LazyStruct = () => ({
  S3Config: { BucketName: 0, BucketPrefix: 0, LogDeliveryStatus: 0 },
});
const i_LocalHealthEventsConfig: D.LazyStruct = () => ({
  Status: 0,
  HealthScoreThreshold: 0,
  MinTrafficImpact: 0,
});
