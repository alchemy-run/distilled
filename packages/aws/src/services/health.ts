import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { awsJson1_1Protocol } from "../protocols/aws-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "Health",
  target: "AWSHealth_20160804",
  version: "2016-08-04",
  sigv4: "health",
  protocol: awsJson1_1Protocol,
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
        return e(
          `https://health.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
        );
      }
    }
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
                `https://health-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://health-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://health.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          if (Region === "aws-global") {
            return e(
              "https://global.health.amazonaws.com",
              {
                authSchemes: [
                  {
                    name: "sigv4",
                    signingName: "health",
                    signingRegion: "us-east-1",
                  },
                ],
              },
              {},
            );
          }
          if (Region === "aws-cn-global") {
            return e(
              "https://global.health.amazonaws.com.cn",
              {
                authSchemes: [
                  {
                    name: "sigv4",
                    signingName: "health",
                    signingRegion: "cn-northwest-1",
                  },
                ],
              },
              {},
            );
          }
          return e(
            `https://health.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class ConcurrentModificationException
  extends /*@__PURE__*/ TE.TaggedError("ConcurrentModificationException")<{
    readonly message?: string;
  }> {}
export class InvalidPaginationToken
  extends /*@__PURE__*/ TE.TaggedError("InvalidPaginationToken")<{
    readonly message?: string;
  }> {}
export class UnsupportedLocale
  extends /*@__PURE__*/ TE.TaggedError("UnsupportedLocale")<{
    readonly message?: string;
  }> {}
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
export type EventScopeCode =
  | "PUBLIC"
  | "ACCOUNT_SPECIFIC"
  | "NONE"
  | (string & {});
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
export type EventPersona =
  | "OPERATIONS"
  | "SECURITY"
  | "BILLING"
  | (string & {});
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
export type DescribeEventDetailsForOrganizationSuccessfulSet =
  OrganizationEventDetails[];
export interface OrganizationEventDetailsErrorItem {
  awsAccountId?: string;
  eventArn?: string;
  errorName?: string;
  errorMessage?: string;
}
export type DescribeEventDetailsForOrganizationFailedSet =
  OrganizationEventDetailsErrorItem[];
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
export type EventTypePersona =
  | "OPERATIONS"
  | "SECURITY"
  | "BILLING"
  | (string & {});
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
export interface DisableHealthServiceAccessForOrganizationRequest {}
export interface DisableHealthServiceAccessForOrganizationResponse {}
export interface EnableHealthServiceAccessForOrganizationRequest {}
export interface EnableHealthServiceAccessForOrganizationResponse {}
export type DescribeAffectedAccountsForOrganizationError =
  | InvalidPaginationToken
  | CommonErrors;
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
  descriptor: {
    service: svc,
    input: { eventArn: 0, nextToken: 0, maxResults: 0 },
  },
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
  descriptor: {
    service: svc,
    input: {
      filter: {
        eventArns: 0,
        entityArns: 0,
        entityValues: 0,
        lastUpdatedTimes: D.list(i_DateTimeRange),
        tags: 0,
        statusCodes: 0,
      },
      locale: 0,
      nextToken: 0,
      maxResults: 0,
    },
    output: { entities: D.list(o_AffectedEntity) },
  },
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
  descriptor: {
    service: svc,
    input: {
      organizationEntityFilters: D.list(i_EventAccountFilter),
      locale: 0,
      nextToken: 0,
      maxResults: 0,
      organizationEntityAccountFilters: D.list({
        eventArn: 0,
        awsAccountId: 0,
        statusCodes: 0,
      }),
    },
    output: { entities: D.list(o_AffectedEntity) },
  },
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
  descriptor: { service: svc, input: { eventArns: 0 } },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEntityAggregates",
})) as any;

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
  descriptor: { service: svc, input: { eventArns: 0, awsAccountIds: 0 } },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEntityAggregatesForOrganization",
})) as any;

export type DescribeEventAggregatesError =
  | InvalidPaginationToken
  | CommonErrors;
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
  descriptor: {
    service: svc,
    input: {
      filter: i_EventFilter,
      aggregateField: 0,
      maxResults: 0,
      nextToken: 0,
    },
  },
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
  descriptor: {
    service: svc,
    input: { eventArns: 0, locale: 0 },
    output: { successfulSet: D.list({ event: o_Event }) },
  },
  errors: [UnsupportedLocale],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEventDetails",
})) as any;

export type DescribeEventDetailsForOrganizationError =
  | UnsupportedLocale
  | CommonErrors;
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
  descriptor: {
    service: svc,
    input: {
      organizationEventDetailFilters: D.list(i_EventAccountFilter),
      locale: 0,
    },
    output: { successfulSet: D.list({ event: o_Event }) },
  },
  errors: [UnsupportedLocale],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEventDetailsForOrganization",
})) as any;

export type DescribeEventsError =
  | InvalidPaginationToken
  | UnsupportedLocale
  | CommonErrors;
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
  descriptor: {
    service: svc,
    input: { filter: i_EventFilter, nextToken: 0, maxResults: 0, locale: 0 },
    output: { events: D.list(o_Event) },
  },
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
  descriptor: {
    service: svc,
    input: {
      filter: {
        actionabilities: 0,
        eventTypeCodes: 0,
        awsAccountIds: 0,
        services: 0,
        regions: 0,
        startTime: i_DateTimeRange,
        endTime: i_DateTimeRange,
        lastUpdatedTime: i_DateTimeRange,
        entityArns: 0,
        entityValues: 0,
        eventTypeCategories: 0,
        eventStatusCodes: 0,
        personas: 0,
      },
      nextToken: 0,
      maxResults: 0,
      locale: 0,
    },
    output: {
      events: D.list({ startTime: D.ts, endTime: D.ts, lastUpdatedTime: D.ts }),
    },
  },
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

export type DescribeEventTypesError =
  | InvalidPaginationToken
  | UnsupportedLocale
  | CommonErrors;
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
  descriptor: {
    service: svc,
    input: {
      filter: {
        eventTypeCodes: 0,
        services: 0,
        eventTypeCategories: 0,
        actionabilities: 0,
        personas: 0,
      },
      locale: 0,
      nextToken: 0,
      maxResults: 0,
    },
  },
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
  descriptor: { service: svc },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeHealthServiceStatusForOrganization",
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
  descriptor: { service: svc },
  errors: [ConcurrentModificationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableHealthServiceAccessForOrganization",
})) as any;

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
  descriptor: { service: svc },
  errors: [ConcurrentModificationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableHealthServiceAccessForOrganization",
})) as any;

const i_DateTimeRange: D.LazyStruct = () => ({ from: 0, to: 0 });
const i_EventAccountFilter: D.LazyStruct = () => ({
  eventArn: 0,
  awsAccountId: 0,
});
const i_EventFilter: D.LazyStruct = () => ({
  actionabilities: 0,
  eventArns: 0,
  eventTypeCodes: 0,
  services: 0,
  regions: 0,
  availabilityZones: 0,
  startTimes: D.list(i_DateTimeRange),
  endTimes: D.list(i_DateTimeRange),
  lastUpdatedTimes: D.list(i_DateTimeRange),
  entityArns: 0,
  entityValues: 0,
  eventTypeCategories: 0,
  tags: 0,
  eventStatusCodes: 0,
  personas: 0,
});
const o_AffectedEntity: D.LazyStruct = () => ({ lastUpdatedTime: D.ts });
const o_Event: D.LazyStruct = () => ({
  startTime: D.ts,
  endTime: D.ts,
  lastUpdatedTime: D.ts,
});
