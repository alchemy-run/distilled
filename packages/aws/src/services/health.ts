import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "Health",
  serviceShapeName: "AWSHealth_20160804",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "health" });
const ver = /*@__PURE__*/ T.ServiceVersion("2016-08-04");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsJson1_1();
const rules = /*@__PURE__*/ T.EndpointResolver(
  (p, _) => {
    const { Region, UseDualStack = false, UseFIPS = false, Endpoint } = p;
    const e = (u: unknown, p = {}, h = {}): T.EndpointResolverResult => ({
      type: "endpoint" as const,
      endpoint: { url: u as string, properties: p, headers: h },
    });
    const err = (m: unknown): T.EndpointResolverResult => ({
      type: "error" as const,
      message: m as string,
    });
    {
      const PartitionResult = _.partition(Region);
      if (
        !(Endpoint != null) &&
        UseDualStack === false &&
        Region != null &&
        PartitionResult != null &&
        PartitionResult !== false &&
        !(_.getAttr(PartitionResult, "name") === "aws") &&
        !(_.getAttr(PartitionResult, "name") === "aws-cn") &&
        !(_.getAttr(PartitionResult, "name") === "aws-us-gov") &&
        !(_.getAttr(PartitionResult, "name") === "aws-iso") &&
        !(_.getAttr(PartitionResult, "name") === "aws-iso-b") &&
        !(_.getAttr(PartitionResult, "name") === "aws-iso-e") &&
        !(_.getAttr(PartitionResult, "name") === "aws-iso-f")
      ) {
        if (UseFIPS === true) {
          return e(
            `https://health-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
        return e(`https://health.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`);
      }
    }
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
                `https://health-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(`https://health-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
            }
            return err("FIPS is enabled but this partition does not support FIPS");
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://health.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err("DualStack is enabled but this partition does not support DualStack");
          }
          if (Region === "aws-global") {
            return e(
              "https://global.health.amazonaws.com",
              {
                authSchemes: [{ name: "sigv4", signingName: "health", signingRegion: "us-east-1" }],
              },
              {},
            );
          }
          if (Region === "aws-cn-global") {
            return e(
              "https://global.health.amazonaws.com.cn",
              {
                authSchemes: [
                  { name: "sigv4", signingName: "health", signingRegion: "cn-northwest-1" },
                ],
              },
              {},
            );
          }
          return e(`https://health.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
  '{"url":"https://health.{R}.{D}","properties":{},"headers":{}}',
  ["aws-global", "aws-cn-global", "eusc-de-east-1"],
);

export class ConcurrentModificationException
  extends /*@__PURE__*/ S.TaggedError<ConcurrentModificationException>()(
    "ConcurrentModificationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidPaginationToken
  extends /*@__PURE__*/ S.TaggedError<InvalidPaginationToken>()("InvalidPaginationToken", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class UnsupportedLocale
  extends /*@__PURE__*/ S.TaggedError<UnsupportedLocale>()("UnsupportedLocale", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export type EventArn = string;
export type NextToken = string;
export type MaxResults = number;
export interface DescribeAffectedAccountsForOrganizationRequest {
  eventArn: string;
  nextToken?: string;
  maxResults?: number;
}
export type AccountId = string;
export type AffectedAccountsList = string[];
export type EventScopeCode = "PUBLIC" | "ACCOUNT_SPECIFIC" | "NONE" | (string & {});
export interface DescribeAffectedAccountsForOrganizationResponse {
  affectedAccounts?: string[];
  eventScopeCode?: EventScopeCode;
  nextToken?: string;
}
export type EventArnList = string[];
export type EntityArn = string;
export type EntityArnList = string[];
export type EntityValue = string;
export type EntityValueList = string[];
export interface DateTimeRange {
  from?: Date;
  to?: Date;
}
export type DateTimeRangeList = DateTimeRange[];
export type TagKey = string;
export type TagValue = string;
export type TagSet = { [key: string]: string | undefined };
export type TagFilter = { [key: string]: string | undefined }[];
export type EntityStatusCode =
  | "IMPAIRED"
  | "UNIMPAIRED"
  | "UNKNOWN"
  | "PENDING"
  | "RESOLVED"
  | (string & {});
export type EntityStatusCodeList = EntityStatusCode[];
export interface EntityFilter {
  eventArns: string[];
  entityArns?: string[];
  entityValues?: string[];
  lastUpdatedTimes?: DateTimeRange[];
  tags?: { [key: string]: string | undefined }[];
  statusCodes?: EntityStatusCode[];
}
export type Locale = string;
export type MaxResultsLowerRange = number;
export interface DescribeAffectedEntitiesRequest {
  filter: EntityFilter;
  locale?: string;
  nextToken?: string;
  maxResults?: number;
}
export type EntityUrl = string;
export type EntityMetadataKey = string;
export type EntityMetadataValue = string;
export type EntityMetadata = { [key: string]: string | undefined };
export interface AffectedEntity {
  entityArn?: string;
  eventArn?: string;
  entityValue?: string;
  entityUrl?: string;
  awsAccountId?: string;
  lastUpdatedTime?: Date;
  statusCode?: EntityStatusCode;
  tags?: { [key: string]: string | undefined };
  entityMetadata?: { [key: string]: string | undefined };
}
export type EntityList = AffectedEntity[];
export interface DescribeAffectedEntitiesResponse {
  entities?: AffectedEntity[];
  nextToken?: string;
}
export interface EventAccountFilter {
  eventArn: string;
  awsAccountId?: string;
}
export type OrganizationEntityFiltersList = EventAccountFilter[];
export interface EntityAccountFilter {
  eventArn: string;
  awsAccountId?: string;
  statusCodes?: EntityStatusCode[];
}
export type OrganizationEntityAccountFiltersList = EntityAccountFilter[];
export interface DescribeAffectedEntitiesForOrganizationRequest {
  organizationEntityFilters?: EventAccountFilter[];
  locale?: string;
  nextToken?: string;
  maxResults?: number;
  organizationEntityAccountFilters?: EntityAccountFilter[];
}
export interface OrganizationAffectedEntitiesErrorItem {
  awsAccountId?: string;
  eventArn?: string;
  errorName?: string;
  errorMessage?: string;
}
export type DescribeAffectedEntitiesForOrganizationFailedSet =
  OrganizationAffectedEntitiesErrorItem[];
export interface DescribeAffectedEntitiesForOrganizationResponse {
  entities?: AffectedEntity[];
  failedSet?: OrganizationAffectedEntitiesErrorItem[];
  nextToken?: string;
}
export type EventArnsList = string[];
export interface DescribeEntityAggregatesRequest {
  eventArns?: string[];
}
export type Count = number;
export type EntityStatuses = { [key in EntityStatusCode]?: number };
export interface EntityAggregate {
  eventArn?: string;
  count?: number;
  statuses?: { [key: string]: number | undefined };
}
export type EntityAggregateList = EntityAggregate[];
export interface DescribeEntityAggregatesResponse {
  entityAggregates?: EntityAggregate[];
}
export type OrganizationEventArnsList = string[];
export type OrganizationAccountIdsList = string[];
export interface DescribeEntityAggregatesForOrganizationRequest {
  eventArns: string[];
  awsAccountIds?: string[];
}
export interface AccountEntityAggregate {
  accountId?: string;
  count?: number;
  statuses?: { [key: string]: number | undefined };
}
export type AccountEntityAggregatesList = AccountEntityAggregate[];
export interface OrganizationEntityAggregate {
  eventArn?: string;
  count?: number;
  statuses?: { [key: string]: number | undefined };
  accounts?: AccountEntityAggregate[];
}
export type OrganizationEntityAggregatesList = OrganizationEntityAggregate[];
export interface DescribeEntityAggregatesForOrganizationResponse {
  organizationEntityAggregates?: OrganizationEntityAggregate[];
}
export type EventActionability =
  | "ACTION_REQUIRED"
  | "ACTION_MAY_BE_REQUIRED"
  | "INFORMATIONAL"
  | (string & {});
export type EventActionabilityList = EventActionability[];
export type EventType2 = string;
export type EventTypeList2 = string[];
export type Service = string;
export type ServiceList = string[];
export type Region = string;
export type RegionList = string[];
export type AvailabilityZone = string;
export type AvailabilityZones = string[];
export type EventTypeCategory =
  | "issue"
  | "accountNotification"
  | "scheduledChange"
  | "investigation"
  | (string & {});
export type EventTypeCategoryList2 = EventTypeCategory[];
export type EventStatusCode = "open" | "closed" | "upcoming" | (string & {});
export type EventStatusCodeList = EventStatusCode[];
export type EventPersona = "OPERATIONS" | "SECURITY" | "BILLING" | (string & {});
export type EventPersonaList = EventPersona[];
export interface EventFilter {
  actionabilities?: EventActionability[];
  eventArns?: string[];
  eventTypeCodes?: string[];
  services?: string[];
  regions?: string[];
  availabilityZones?: string[];
  startTimes?: DateTimeRange[];
  endTimes?: DateTimeRange[];
  lastUpdatedTimes?: DateTimeRange[];
  entityArns?: string[];
  entityValues?: string[];
  eventTypeCategories?: EventTypeCategory[];
  tags?: { [key: string]: string | undefined }[];
  eventStatusCodes?: EventStatusCode[];
  personas?: EventPersona[];
}
export type EventAggregateField = "eventTypeCategory" | (string & {});
export interface DescribeEventAggregatesRequest {
  filter?: EventFilter;
  aggregateField: EventAggregateField;
  maxResults?: number;
  nextToken?: string;
}
export type AggregateValue = string;
export interface EventAggregate {
  aggregateValue?: string;
  count?: number;
}
export type EventAggregateList = EventAggregate[];
export interface DescribeEventAggregatesResponse {
  eventAggregates?: EventAggregate[];
  nextToken?: string;
}
export interface DescribeEventDetailsRequest {
  eventArns: string[];
  locale?: string;
}
export type EventTypeCode = string;
export interface Event {
  arn?: string;
  service?: string;
  eventTypeCode?: string;
  eventTypeCategory?: EventTypeCategory;
  region?: string;
  availabilityZone?: string;
  startTime?: Date;
  endTime?: Date;
  lastUpdatedTime?: Date;
  statusCode?: EventStatusCode;
  eventScopeCode?: EventScopeCode;
  actionability?: EventActionability;
  personas?: EventPersona[];
}
export type EventDescription2 = string;
export interface EventDescription {
  latestDescription?: string;
}
export type MetadataKey = string;
export type MetadataValue = string;
export type EventMetadata = { [key: string]: string | undefined };
export interface EventDetails {
  event?: Event;
  eventDescription?: EventDescription;
  eventMetadata?: { [key: string]: string | undefined };
}
export type DescribeEventDetailsSuccessfulSet = EventDetails[];
export interface EventDetailsErrorItem {
  eventArn?: string;
  errorName?: string;
  errorMessage?: string;
}
export type DescribeEventDetailsFailedSet = EventDetailsErrorItem[];
export interface DescribeEventDetailsResponse {
  successfulSet?: EventDetails[];
  failedSet?: EventDetailsErrorItem[];
}
export type OrganizationEventDetailFiltersList = EventAccountFilter[];
export interface DescribeEventDetailsForOrganizationRequest {
  organizationEventDetailFilters: EventAccountFilter[];
  locale?: string;
}
export interface OrganizationEventDetails {
  awsAccountId?: string;
  event?: Event;
  eventDescription?: EventDescription;
  eventMetadata?: { [key: string]: string | undefined };
}
export type DescribeEventDetailsForOrganizationSuccessfulSet = OrganizationEventDetails[];
export interface OrganizationEventDetailsErrorItem {
  awsAccountId?: string;
  eventArn?: string;
  errorName?: string;
  errorMessage?: string;
}
export type DescribeEventDetailsForOrganizationFailedSet = OrganizationEventDetailsErrorItem[];
export interface DescribeEventDetailsForOrganizationResponse {
  successfulSet?: OrganizationEventDetails[];
  failedSet?: OrganizationEventDetailsErrorItem[];
}
export interface DescribeEventsRequest {
  filter?: EventFilter;
  nextToken?: string;
  maxResults?: number;
  locale?: string;
}
export type EventList = Event[];
export interface DescribeEventsResponse {
  events?: Event[];
  nextToken?: string;
}
export type AwsAccountIdsList = string[];
export interface OrganizationEventFilter {
  actionabilities?: EventActionability[];
  eventTypeCodes?: string[];
  awsAccountIds?: string[];
  services?: string[];
  regions?: string[];
  startTime?: DateTimeRange;
  endTime?: DateTimeRange;
  lastUpdatedTime?: DateTimeRange;
  entityArns?: string[];
  entityValues?: string[];
  eventTypeCategories?: EventTypeCategory[];
  eventStatusCodes?: EventStatusCode[];
  personas?: EventPersona[];
}
export interface DescribeEventsForOrganizationRequest {
  filter?: OrganizationEventFilter;
  nextToken?: string;
  maxResults?: number;
  locale?: string;
}
export interface OrganizationEvent {
  arn?: string;
  service?: string;
  eventTypeCode?: string;
  eventTypeCategory?: EventTypeCategory;
  eventScopeCode?: EventScopeCode;
  region?: string;
  startTime?: Date;
  endTime?: Date;
  lastUpdatedTime?: Date;
  statusCode?: EventStatusCode;
  actionability?: EventActionability;
  personas?: EventPersona[];
}
export type OrganizationEventList = OrganizationEvent[];
export interface DescribeEventsForOrganizationResponse {
  events?: OrganizationEvent[];
  nextToken?: string;
}
export type EventTypeCodeList = string[];
export type EventTypeCategoryList = EventTypeCategory[];
export type EventTypeActionability =
  | "ACTION_REQUIRED"
  | "ACTION_MAY_BE_REQUIRED"
  | "INFORMATIONAL"
  | (string & {});
export type EventTypeActionabilityList = EventTypeActionability[];
export type EventTypePersona = "OPERATIONS" | "SECURITY" | "BILLING" | (string & {});
export type EventTypePersonaList = EventTypePersona[];
export interface EventTypeFilter {
  eventTypeCodes?: string[];
  services?: string[];
  eventTypeCategories?: EventTypeCategory[];
  actionabilities?: EventTypeActionability[];
  personas?: EventTypePersona[];
}
export interface DescribeEventTypesRequest {
  filter?: EventTypeFilter;
  locale?: string;
  nextToken?: string;
  maxResults?: number;
}
export interface EventType {
  service?: string;
  code?: string;
  category?: EventTypeCategory;
  actionability?: EventTypeActionability;
  personas?: EventTypePersona[];
}
export type EventTypeList = EventType[];
export interface DescribeEventTypesResponse {
  eventTypes?: EventType[];
  nextToken?: string;
}
export interface DescribeHealthServiceStatusForOrganizationRequest {}
export type HealthServiceAccessStatusForOrganization = string;
export interface DescribeHealthServiceStatusForOrganizationResponse {
  healthServiceAccessStatusForOrganization?: string;
}
export interface ServiceLifecycleFilter {
  service?: string;
}
export type LifecycleMaxResults = number;
export interface DescribeServiceLifecycleRequest {
  filter?: ServiceLifecycleFilter;
  nextToken?: string;
  maxResults?: number;
}
export type ImpactRiskList = string[];
export interface LifecycleEvent {
  lifecycleEventType?: string;
  date?: Date;
  regions?: string[];
  impactRisks?: string[];
  description?: string;
}
export type LifecycleEventList = LifecycleEvent[];
export interface ServiceLifecycle {
  service?: string;
  version?: string;
  title?: string;
  recommendedVersion?: string;
  lifecycleEvents?: LifecycleEvent[];
}
export type ServiceLifecycleList = ServiceLifecycle[];
export interface DescribeServiceLifecycleResponse {
  serviceLifecycles?: ServiceLifecycle[];
  nextToken?: string;
}
export interface DisableHealthServiceAccessForOrganizationRequest {}
export interface DisableHealthServiceAccessForOrganizationResponse {}
export interface EnableHealthServiceAccessForOrganizationRequest {}
export interface EnableHealthServiceAccessForOrganizationResponse {}
export type DescribeAffectedAccountsForOrganizationError = InvalidPaginationToken | CommonErrors;
/**
 * Returns a list of accounts in the organization from Organizations that are affected by the
 * provided event. For more information about the different types of Health events, see
 * Event.
 *
 * Before you can call this operation, you must first enable Health to work with
 * Organizations. To do this, call the EnableHealthServiceAccessForOrganization operation from your organization's
 * management account.
 *
 * This API operation uses pagination. Specify the `nextToken` parameter in the next request to return more results.
 */
export const describeAffectedAccountsForOrganization: API.PaginatedOperationMethod<
  DescribeAffectedAccountsForOrganizationRequest,
  DescribeAffectedAccountsForOrganizationResponse,
  DescribeAffectedAccountsForOrganizationError,
  Credentials | HttpClient.HttpClient,
  AccountId
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(72, __c9, 0) as any as S.Schema<DescribeAffectedAccountsForOrganizationRequest>,
  output: __S(73, __c9, 1) as any as S.Schema<DescribeAffectedAccountsForOrganizationResponse>,
  errors: [InvalidPaginationToken],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAffectedAccountsForOrganization",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "affectedAccounts",
    pageSize: "maxResults",
  } as const,
})) as any;

export type DescribeAffectedEntitiesError =
  | InvalidPaginationToken
  | UnsupportedLocale
  | CommonErrors;
/**
 * Returns a list of entities that have been affected by the specified events, based on the
 * specified filter criteria. Entities can refer to individual customer resources, groups of
 * customer resources, or any other construct, depending on the Amazon Web Services service. Events that
 * have impact beyond that of the affected entities, or where the extent of impact is unknown,
 * include at least one entity indicating this.
 *
 * At least one event ARN is required.
 *
 * - This API operation uses pagination. Specify the `nextToken` parameter in the next request to return more results.
 *
 * - This operation supports resource-level permissions. You can use this operation to allow or deny access to specific Health events. For more
 * information, see Resource- and action-based conditions in the *Health User Guide*.
 */
export const describeAffectedEntities: API.PaginatedOperationMethod<
  DescribeAffectedEntitiesRequest,
  DescribeAffectedEntitiesResponse,
  DescribeAffectedEntitiesError,
  Credentials | HttpClient.HttpClient,
  AffectedEntity
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(89, __c11, 1) as any as S.Schema<DescribeAffectedEntitiesRequest>,
  output: __S(90, __c11, 2) as any as S.Schema<DescribeAffectedEntitiesResponse>,
  errors: [InvalidPaginationToken, UnsupportedLocale],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAffectedEntities",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "entities",
    pageSize: "maxResults",
  } as const,
})) as any;

export type DescribeAffectedEntitiesForOrganizationError =
  | InvalidPaginationToken
  | UnsupportedLocale
  | CommonErrors;
/**
 * Returns a list of entities that have been affected by one or more events for one or more
 * accounts in your organization in Organizations, based on the filter criteria. Entities can refer
 * to individual customer resources, groups of customer resources, or any other construct,
 * depending on the Amazon Web Services service.
 *
 * At least one event Amazon Resource Name (ARN) and account ID are required.
 *
 * Before you can call this operation, you must first enable Health to work with
 * Organizations. To do this, call the EnableHealthServiceAccessForOrganization operation from your organization's
 * management account.
 *
 * - This API operation uses pagination. Specify the `nextToken` parameter in the next request to return more results.
 *
 * - This operation doesn't support resource-level permissions. You can't use this operation to allow or deny access to specific Health events. For more
 * information, see Resource- and action-based conditions in the *Health User Guide*.
 */
export const describeAffectedEntitiesForOrganization: API.PaginatedOperationMethod<
  DescribeAffectedEntitiesForOrganizationRequest,
  DescribeAffectedEntitiesForOrganizationResponse,
  DescribeAffectedEntitiesForOrganizationError,
  Credentials | HttpClient.HttpClient,
  AffectedEntity
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(138, __c17, 2) as any as S.Schema<DescribeAffectedEntitiesForOrganizationRequest>,
  output: __S(139, __c17, 3) as any as S.Schema<DescribeAffectedEntitiesForOrganizationResponse>,
  errors: [InvalidPaginationToken, UnsupportedLocale],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAffectedEntitiesForOrganization",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "entities",
    pageSize: "maxResults",
  } as const,
})) as any;

export type DescribeEntityAggregatesError = CommonErrors;
/**
 * Returns the number of entities that are affected by each of the specified events.
 */
export const describeEntityAggregates: API.OperationMethod<
  DescribeEntityAggregatesRequest,
  DescribeEntityAggregatesResponse,
  DescribeEntityAggregatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(152, __c19, 0) as any as S.Schema<DescribeEntityAggregatesRequest>,
  output: __S(155, __c19, 3) as any as S.Schema<DescribeEntityAggregatesResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEntityAggregates",
}));

export type DescribeEntityAggregatesForOrganizationError = CommonErrors;
/**
 * Returns a list of entity aggregates for your Organizations that are affected by each of the specified events.
 */
export const describeEntityAggregatesForOrganization: API.OperationMethod<
  DescribeEntityAggregatesForOrganizationRequest,
  DescribeEntityAggregatesForOrganizationResponse,
  DescribeEntityAggregatesForOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(168, __c21, 0) as any as S.Schema<DescribeEntityAggregatesForOrganizationRequest>,
  output: __S(173, __c21, 5) as any as S.Schema<DescribeEntityAggregatesForOrganizationResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEntityAggregatesForOrganization",
}));

export type DescribeEventAggregatesError = InvalidPaginationToken | CommonErrors;
/**
 * Returns the number of events of each event type (issue, scheduled change, and account
 * notification). If no filter is specified, the counts of all events in each category are
 * returned.
 *
 * This API operation uses pagination. Specify the `nextToken` parameter in the next request to return more results.
 */
export const describeEventAggregates: API.PaginatedOperationMethod<
  DescribeEventAggregatesRequest,
  DescribeEventAggregatesResponse,
  DescribeEventAggregatesError,
  Credentials | HttpClient.HttpClient,
  EventAggregate
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(176, __c22, 0) as any as S.Schema<DescribeEventAggregatesRequest>,
  output: __S(179, __c22, 3) as any as S.Schema<DescribeEventAggregatesResponse>,
  errors: [InvalidPaginationToken],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEventAggregates",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "eventAggregates",
    pageSize: "maxResults",
  } as const,
})) as any;

export type DescribeEventDetailsError = UnsupportedLocale | CommonErrors;
/**
 * Returns detailed information about one or more specified events. Information includes
 * standard event data (Amazon Web Services Region, service, and so on, as returned by DescribeEvents), a detailed event description, and possible additional metadata
 * that depends upon the nature of the event. Affected entities are not included. To retrieve
 * the entities, use the DescribeAffectedEntities operation.
 *
 * If a specified event can't be retrieved, an error message is returned for that
 * event.
 *
 * This operation supports resource-level permissions. You can use this operation to allow or deny access to specific Health events. For more
 * information, see Resource- and action-based conditions in the *Health User Guide*.
 */
export const describeEventDetails: API.OperationMethod<
  DescribeEventDetailsRequest,
  DescribeEventDetailsResponse,
  DescribeEventDetailsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c24, 0) as any as S.Schema<DescribeEventDetailsRequest>,
  output: __S(197, __c24, 5) as any as S.Schema<DescribeEventDetailsResponse>,
  errors: [UnsupportedLocale],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEventDetails",
}));

export type DescribeEventDetailsForOrganizationError = UnsupportedLocale | CommonErrors;
/**
 * Returns detailed information about one or more specified events for one or more
 * Amazon Web Services accounts in your organization. This information includes standard event data (such as
 * the Amazon Web Services Region and service), an event description, and (depending on the event) possible
 * metadata. This operation doesn't return affected entities, such as the resources related to
 * the event. To return affected entities, use the DescribeAffectedEntitiesForOrganization operation.
 *
 * Before you can call this operation, you must first enable Health to work with
 * Organizations. To do this, call the EnableHealthServiceAccessForOrganization operation from your organization's
 * management account.
 *
 * When you call the `DescribeEventDetailsForOrganization` operation, specify
 * the `organizationEventDetailFilters` object in the request. Depending on the
 * Health event type, note the following differences:
 *
 * - To return event details for a public event, you must specify a null value for the
 * `awsAccountId` parameter. If you specify an account ID for a public
 * event, Health returns an error message because public events aren't specific to
 * an account.
 *
 * - To return event details for an event that is specific to an account in your
 * organization, you must specify the `awsAccountId` parameter in the
 * request. If you don't specify an account ID, Health returns an error message
 * because the event is specific to an account in your organization.
 *
 * For more information, see Event.
 *
 * This operation doesn't support resource-level permissions. You can't use this operation to allow or deny access to specific Health events. For more
 * information, see Resource- and action-based conditions in the *Health User Guide*.
 */
export const describeEventDetailsForOrganization: API.OperationMethod<
  DescribeEventDetailsForOrganizationRequest,
  DescribeEventDetailsForOrganizationResponse,
  DescribeEventDetailsForOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<DescribeEventDetailsForOrganizationRequest>,
  output: __S(3, __c0, 3) as any as S.Schema<DescribeEventDetailsForOrganizationResponse>,
  errors: [UnsupportedLocale],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEventDetailsForOrganization",
}));

export type DescribeEventsError = InvalidPaginationToken | UnsupportedLocale | CommonErrors;
/**
 * Returns information about events that meet the specified filter criteria. Events are
 * returned in a summary form and do not include the detailed description, any additional
 * metadata that depends on the event type, or any affected resources. To retrieve that
 * information, use the DescribeEventDetails and DescribeAffectedEntities operations.
 *
 * If no filter criteria are specified, all events are returned. Results are sorted by
 * `lastModifiedTime`, starting with the most recent event.
 *
 * - When you call the `DescribeEvents` operation and specify an entity
 * for the `entityValues` parameter, Health might return public
 * events that aren't specific to that resource. For example, if you call
 * `DescribeEvents` and specify an ID for an Amazon Elastic Compute Cloud (Amazon EC2)
 * instance, Health might return events that aren't specific to that resource or
 * service. To get events that are specific to a service, use the
 * `services` parameter in the `filter` object. For more
 * information, see Event.
 *
 * - This API operation uses pagination. Specify the `nextToken` parameter in the next request to return more results.
 */
export const describeEvents: API.PaginatedOperationMethod<
  DescribeEventsRequest,
  DescribeEventsResponse,
  DescribeEventsError,
  Credentials | HttpClient.HttpClient,
  Event
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(8, __c1, 0) as any as S.Schema<DescribeEventsRequest>,
  output: __S(10, __c1, 2) as any as S.Schema<DescribeEventsResponse>,
  errors: [InvalidPaginationToken, UnsupportedLocale],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEvents",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "events",
    pageSize: "maxResults",
  } as const,
})) as any;

export type DescribeEventsForOrganizationError =
  | InvalidPaginationToken
  | UnsupportedLocale
  | CommonErrors;
/**
 * Returns information about events across your organization in Organizations. You can use
 * the`filters` parameter to specify the events that you want to return. Events
 * are returned in a summary form and don't include the affected accounts, detailed
 * description, any additional metadata that depends on the event type, or any affected
 * resources. To retrieve that information, use the following operations:
 *
 * - DescribeAffectedAccountsForOrganization
 *
 * - DescribeEventDetailsForOrganization
 *
 * - DescribeAffectedEntitiesForOrganization
 *
 * If you don't specify a `filter`, the
 * `DescribeEventsForOrganizations` returns all events across your organization.
 * Results are sorted by `lastModifiedTime`, starting with the most recent event.
 *
 * For more information about the different types of Health events, see Event.
 *
 * Before you can call this operation, you must first enable Health to work with
 * Organizations. To do this, call the EnableHealthServiceAccessForOrganization operation from your organization's
 * management account.
 *
 * This API operation uses pagination. Specify the `nextToken` parameter in the next request to return more results.
 */
export const describeEventsForOrganization: API.PaginatedOperationMethod<
  DescribeEventsForOrganizationRequest,
  DescribeEventsForOrganizationResponse,
  DescribeEventsForOrganizationError,
  Credentials | HttpClient.HttpClient,
  OrganizationEvent
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(17, __c2, 1) as any as S.Schema<DescribeEventsForOrganizationRequest>,
  output: __S(20, __c2, 4) as any as S.Schema<DescribeEventsForOrganizationResponse>,
  errors: [InvalidPaginationToken, UnsupportedLocale],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEventsForOrganization",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "events",
    pageSize: "maxResults",
  } as const,
})) as any;

export type DescribeEventTypesError = InvalidPaginationToken | UnsupportedLocale | CommonErrors;
/**
 * Returns the event types that meet the specified filter criteria. You can use this API
 * operation to find information about the Health event, such as the category, Amazon Web Services service, and event code. The metadata for each event appears in the EventType object.
 *
 * If you don't specify a filter criteria, the API operation returns all event types, in no
 * particular order.
 *
 * This API operation uses pagination. Specify the `nextToken` parameter in the next request to return more results.
 */
export const describeEventTypes: API.PaginatedOperationMethod<
  DescribeEventTypesRequest,
  DescribeEventTypesResponse,
  DescribeEventTypesError,
  Credentials | HttpClient.HttpClient,
  EventType
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(25, __c3, 1) as any as S.Schema<DescribeEventTypesRequest>,
  output: __S(28, __c3, 4) as any as S.Schema<DescribeEventTypesResponse>,
  errors: [InvalidPaginationToken, UnsupportedLocale],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEventTypes",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "eventTypes",
    pageSize: "maxResults",
  } as const,
})) as any;

export type DescribeHealthServiceStatusForOrganizationError = CommonErrors;
/**
 * This operation provides status information on enabling or disabling Health to work
 * with your organization. To call this operation, you must use the organization's
 * management account.
 */
export const describeHealthServiceStatusForOrganization: API.OperationMethod<
  DescribeHealthServiceStatusForOrganizationRequest,
  DescribeHealthServiceStatusForOrganizationResponse,
  DescribeHealthServiceStatusForOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c4, 0) as any as S.Schema<DescribeHealthServiceStatusForOrganizationRequest>,
  output: __S(33, __c4, 1) as any as S.Schema<DescribeHealthServiceStatusForOrganizationResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeHealthServiceStatusForOrganization",
}));

export type DescribeServiceLifecycleError = InvalidPaginationToken | CommonErrors;
/**
 * Returns lifecycle information for Amazon Web Services services, including end-of-life dates, version recommendations, and lifecycle events.
 */
export const describeServiceLifecycle: API.PaginatedOperationMethod<
  DescribeServiceLifecycleRequest,
  DescribeServiceLifecycleResponse,
  DescribeServiceLifecycleError,
  Credentials | HttpClient.HttpClient,
  ServiceLifecycle
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(41, __c5, 1) as any as S.Schema<DescribeServiceLifecycleRequest>,
  output: __S(46, __c5, 6) as any as S.Schema<DescribeServiceLifecycleResponse>,
  errors: [InvalidPaginationToken],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeServiceLifecycle",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "serviceLifecycles",
    pageSize: "maxResults",
  } as const,
})) as any;

export type DisableHealthServiceAccessForOrganizationError =
  | ConcurrentModificationException
  | CommonErrors;
/**
 * Disables Health from working with Organizations. To call this operation, you must sign
 * in to the organization's management account. For more information, see Aggregating
 * Health events in the *Health User Guide*.
 *
 * This operation doesn't remove the service-linked role from the management account in your
 * organization. You must use the IAM console, API, or Command Line Interface (CLI) to remove the
 * service-linked role. For more information, see Deleting a Service-Linked Role in the
 * *IAM User Guide*.
 *
 * You can also disable the organizational feature by using the Organizations DisableAWSServiceAccess API operation. After you call this operation,
 * Health stops aggregating events for all other Amazon Web Services accounts in your organization.
 * If you call the Health API operations for organizational view, Health returns
 * an error. Health continues to aggregate health events for your
 * Amazon Web Services account.
 */
export const disableHealthServiceAccessForOrganization: API.OperationMethod<
  DisableHealthServiceAccessForOrganizationRequest,
  DisableHealthServiceAccessForOrganizationResponse,
  DisableHealthServiceAccessForOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(48, __c6, 0) as any as S.Schema<DisableHealthServiceAccessForOrganizationRequest>,
  output: __S(56, __c7, 0) as any as S.Schema<DisableHealthServiceAccessForOrganizationResponse>,
  errors: [ConcurrentModificationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableHealthServiceAccessForOrganization",
}));

export type EnableHealthServiceAccessForOrganizationError =
  | ConcurrentModificationException
  | CommonErrors;
/**
 * Enables Health to work with Organizations. You can use the organizational view feature
 * to aggregate events from all Amazon Web Services accounts in your organization in a centralized location.
 *
 * This operation also creates a service-linked role for the management account in the
 * organization.
 *
 * To call this operation, you must meet the following requirements:
 *
 * - You must have a Business, Enterprise On-Ramp, or Enterprise Support plan from Amazon Web Services Support to use the Health API. If you call
 * the Health API from an Amazon Web Services account that doesn't have a
 * Business, Enterprise On-Ramp, or Enterprise Support plan, you receive a `SubscriptionRequiredException`
 * error.
 *
 * - You must have permission to call this operation from the organization's
 * management account. For example IAM policies, see Health
 * identity-based policy examples.
 *
 * If you don't have the required support plan, you can instead use the Health console
 * to enable the organizational view feature. For more information, see Aggregating
 * Health events in the *Health User Guide*.
 */
export const enableHealthServiceAccessForOrganization: API.OperationMethod<
  EnableHealthServiceAccessForOrganizationRequest,
  EnableHealthServiceAccessForOrganizationResponse,
  EnableHealthServiceAccessForOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c8, 0) as any as S.Schema<EnableHealthServiceAccessForOrganizationRequest>,
  output: __S(56, __c7, 0) as any as S.Schema<EnableHealthServiceAccessForOrganizationResponse>,
  errors: [ConcurrentModificationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableHealthServiceAccessForOrganization",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          organizationEventDetailFilters: __S(145, __c18, 1),
          locale: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeEventDetailsForOrganizationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          awsAccountId: S.optional(S.String),
          event: S.optional(__S(208, __c26, 0)),
          eventDescription: S.optional(__S(200, __c25, 0)),
          eventMetadata: S.optional(__S(104, __c13, 0)),
        }),
      ).annotate({ identifier: "OrganizationEventDetails" });
    case 2:
      return S.Array(__S(1, __c0, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          successfulSet: S.optional(__S(2, __c0, 2)),
          failedSet: S.optional(__S(147, __c18, 3)),
        }),
      ).annotate({ identifier: "DescribeEventDetailsForOrganizationResponse" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          filter: S.optional(__S(184, __c23, 0)),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
          locale: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeEventsRequest" });
    case 1:
      return S.Array(__S(208, __c26, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ events: S.optional(__S(9, __c1, 1)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "DescribeEventsResponse" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          actionabilities: S.optional(__S(112, __c14, 0)),
          eventTypeCodes: S.optional(__S(80, __c10, 0)),
          awsAccountIds: S.optional(__S(80, __c10, 0)),
          services: S.optional(__S(80, __c10, 0)),
          regions: S.optional(__S(80, __c10, 0)),
          startTime: S.optional(__S(128, __c16, 0)),
          endTime: S.optional(__S(128, __c16, 0)),
          lastUpdatedTime: S.optional(__S(128, __c16, 0)),
          entityArns: S.optional(__S(80, __c10, 0)),
          entityValues: S.optional(__S(80, __c10, 0)),
          eventTypeCategories: S.optional(__S(112, __c14, 0)),
          eventStatusCodes: S.optional(__S(112, __c14, 0)),
          personas: S.optional(__S(112, __c14, 0)),
        }),
      ).annotate({ identifier: "OrganizationEventFilter" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          filter: S.optional(__S(16, __c2, 0)),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
          locale: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeEventsForOrganizationRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          service: S.optional(S.String),
          eventTypeCode: S.optional(S.String),
          eventTypeCategory: S.optional(S.String),
          eventScopeCode: S.optional(S.String),
          region: S.optional(S.String),
          startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          statusCode: S.optional(S.String),
          actionability: S.optional(S.String),
          personas: S.optional(__S(112, __c14, 0)),
        }),
      ).annotate({ identifier: "OrganizationEvent" });
    case 3:
      return S.Array(__S(18, __c2, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ events: S.optional(__S(19, __c2, 3)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "DescribeEventsForOrganizationResponse" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          eventTypeCodes: S.optional(__S(80, __c10, 0)),
          services: S.optional(__S(80, __c10, 0)),
          eventTypeCategories: S.optional(__S(112, __c14, 0)),
          actionabilities: S.optional(__S(112, __c14, 0)),
          personas: S.optional(__S(112, __c14, 0)),
        }),
      ).annotate({ identifier: "EventTypeFilter" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          filter: S.optional(__S(24, __c3, 0)),
          locale: S.optional(S.String),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeEventTypesRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          service: S.optional(S.String),
          code: S.optional(S.String),
          category: S.optional(S.String),
          actionability: S.optional(S.String),
          personas: S.optional(__S(112, __c14, 0)),
        }),
      ).annotate({ identifier: "EventType" });
    case 3:
      return S.Array(__S(26, __c3, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ eventTypes: S.optional(__S(27, __c3, 3)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "DescribeEventTypesResponse" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeHealthServiceStatusForOrganizationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ healthServiceAccessStatusForOrganization: S.optional(S.String) }),
      ).annotate({ identifier: "DescribeHealthServiceStatusForOrganizationResponse" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ service: S.optional(S.String) })).annotate({
        identifier: "ServiceLifecycleFilter",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          filter: S.optional(__S(40, __c5, 0)),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeServiceLifecycleRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          lifecycleEventType: S.optional(S.String),
          date: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          regions: S.optional(__S(80, __c10, 0)),
          impactRisks: S.optional(__S(80, __c10, 0)),
          description: S.optional(S.String),
        }),
      ).annotate({ identifier: "LifecycleEvent" });
    case 3:
      return S.Array(__S(42, __c5, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          service: S.optional(S.String),
          version: S.optional(S.String),
          title: S.optional(S.String),
          recommendedVersion: S.optional(S.String),
          lifecycleEvents: S.optional(__S(43, __c5, 3)),
        }),
      ).annotate({ identifier: "ServiceLifecycle" });
    case 5:
      return S.Array(__S(44, __c5, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          serviceLifecycles: S.optional(__S(45, __c5, 5)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeServiceLifecycleResponse" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DisableHealthServiceAccessForOrganizationRequest" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({
        identifier: "DisableHealthServiceAccessForOrganizationResponse",
      });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "EnableHealthServiceAccessForOrganizationRequest" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          eventArn: S.String,
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeAffectedAccountsForOrganizationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          affectedAccounts: S.optional(__S(80, __c10, 0)),
          eventScopeCode: S.optional(S.String),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeAffectedAccountsForOrganizationResponse" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          eventArns: __S(80, __c10, 0),
          entityArns: S.optional(__S(80, __c10, 0)),
          entityValues: S.optional(__S(80, __c10, 0)),
          lastUpdatedTimes: S.optional(__S(120, __c15, 0)),
          tags: S.optional(__S(121, __c15, 1)),
          statusCodes: S.optional(__S(112, __c14, 0)),
        }),
      ).annotate({ identifier: "EntityFilter" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          filter: __S(88, __c11, 0),
          locale: S.optional(S.String),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeAffectedEntitiesRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({ entities: S.optional(__S(97, __c12, 1)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "DescribeAffectedEntitiesResponse" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          entityArn: S.optional(S.String),
          eventArn: S.optional(S.String),
          entityValue: S.optional(S.String),
          entityUrl: S.optional(S.String),
          awsAccountId: S.optional(S.String),
          lastUpdatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          statusCode: S.optional(S.String),
          tags: S.optional(__S(104, __c13, 0)),
          entityMetadata: S.optional(__S(104, __c13, 0)),
        }),
      ).annotate({ identifier: "AffectedEntity" });
    case 1:
      return S.Array(__S(96, __c12, 0));
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(128, __c16, 0));
    case 1:
      return S.Array(__S(104, __c13, 0));
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          from: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          to: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "DateTimeRange" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          eventArn: S.String,
          awsAccountId: S.optional(S.String),
          statusCodes: S.optional(__S(112, __c14, 0)),
        }),
      ).annotate({ identifier: "EntityAccountFilter" });
    case 1:
      return S.Array(__S(136, __c17, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          organizationEntityFilters: S.optional(__S(145, __c18, 1)),
          locale: S.optional(S.String),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
          organizationEntityAccountFilters: S.optional(__S(137, __c17, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeAffectedEntitiesForOrganizationRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          entities: S.optional(__S(97, __c12, 1)),
          failedSet: S.optional(__S(147, __c18, 3)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeAffectedEntitiesForOrganizationResponse" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ eventArn: S.String, awsAccountId: S.optional(S.String) }),
      ).annotate({ identifier: "EventAccountFilter" });
    case 1:
      return S.Array(__S(144, __c18, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          awsAccountId: S.optional(S.String),
          eventArn: S.optional(S.String),
          errorName: S.optional(S.String),
          errorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "OrganizationAffectedEntitiesErrorItem" });
    case 3:
      return S.Array(__S(146, __c18, 2));
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ eventArns: S.optional(__S(80, __c10, 0)) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeEntityAggregatesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          eventArn: S.optional(S.String),
          count: S.optional(S.Number),
          statuses: S.optional(__S(160, __c20, 0)),
        }),
      ).annotate({ identifier: "EntityAggregate" });
    case 2:
      return S.Array(__S(153, __c19, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ entityAggregates: S.optional(__S(154, __c19, 2)) }),
      ).annotate({ identifier: "DescribeEntityAggregatesResponse" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.Number.pipe(S.optional));
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          eventArns: __S(80, __c10, 0),
          awsAccountIds: S.optional(__S(80, __c10, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeEntityAggregatesForOrganizationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          accountId: S.optional(S.String),
          count: S.optional(S.Number),
          statuses: S.optional(__S(160, __c20, 0)),
        }),
      ).annotate({ identifier: "AccountEntityAggregate" });
    case 2:
      return S.Array(__S(169, __c21, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          eventArn: S.optional(S.String),
          count: S.optional(S.Number),
          statuses: S.optional(__S(160, __c20, 0)),
          accounts: S.optional(__S(170, __c21, 2)),
        }),
      ).annotate({ identifier: "OrganizationEntityAggregate" });
    case 4:
      return S.Array(__S(171, __c21, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ organizationEntityAggregates: S.optional(__S(172, __c21, 4)) }),
      ).annotate({ identifier: "DescribeEntityAggregatesForOrganizationResponse" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          filter: S.optional(__S(184, __c23, 0)),
          aggregateField: S.String,
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeEventAggregatesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ aggregateValue: S.optional(S.String), count: S.optional(S.Number) }),
      ).annotate({ identifier: "EventAggregate" });
    case 2:
      return S.Array(__S(177, __c22, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          eventAggregates: S.optional(__S(178, __c22, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeEventAggregatesResponse" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          actionabilities: S.optional(__S(112, __c14, 0)),
          eventArns: S.optional(__S(80, __c10, 0)),
          eventTypeCodes: S.optional(__S(80, __c10, 0)),
          services: S.optional(__S(80, __c10, 0)),
          regions: S.optional(__S(80, __c10, 0)),
          availabilityZones: S.optional(__S(80, __c10, 0)),
          startTimes: S.optional(__S(120, __c15, 0)),
          endTimes: S.optional(__S(120, __c15, 0)),
          lastUpdatedTimes: S.optional(__S(120, __c15, 0)),
          entityArns: S.optional(__S(80, __c10, 0)),
          entityValues: S.optional(__S(80, __c10, 0)),
          eventTypeCategories: S.optional(__S(112, __c14, 0)),
          tags: S.optional(__S(121, __c15, 1)),
          eventStatusCodes: S.optional(__S(112, __c14, 0)),
          personas: S.optional(__S(112, __c14, 0)),
        }),
      ).annotate({ identifier: "EventFilter" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ eventArns: __S(80, __c10, 0), locale: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeEventDetailsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          event: S.optional(__S(208, __c26, 0)),
          eventDescription: S.optional(__S(200, __c25, 0)),
          eventMetadata: S.optional(__S(104, __c13, 0)),
        }),
      ).annotate({ identifier: "EventDetails" });
    case 2:
      return S.Array(__S(193, __c24, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          eventArn: S.optional(S.String),
          errorName: S.optional(S.String),
          errorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "EventDetailsErrorItem" });
    case 4:
      return S.Array(__S(195, __c24, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          successfulSet: S.optional(__S(194, __c24, 2)),
          failedSet: S.optional(__S(196, __c24, 4)),
        }),
      ).annotate({ identifier: "DescribeEventDetailsResponse" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ latestDescription: S.optional(S.String) })).annotate({
        identifier: "EventDescription",
      });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          service: S.optional(S.String),
          eventTypeCode: S.optional(S.String),
          eventTypeCategory: S.optional(S.String),
          region: S.optional(S.String),
          availabilityZone: S.optional(S.String),
          startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          statusCode: S.optional(S.String),
          eventScopeCode: S.optional(S.String),
          actionability: S.optional(S.String),
          personas: S.optional(__S(112, __c14, 0)),
        }),
      ).annotate({ identifier: "Event" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
