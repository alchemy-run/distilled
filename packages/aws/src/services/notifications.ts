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
  sdkId: "Notifications",
  target: "Notifications",
  version: "2018-05-10",
  sigv4: "notifications",
  protocol: restJson1Protocol,
  rules: (p, _) => {
    const { UseFIPS = false, Endpoint, Region } = p;
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
      return e(Endpoint);
    }
    if (Region != null) {
      {
        const PartitionResult = _.partition(Region);
        if (PartitionResult != null && PartitionResult !== false) {
          if (UseFIPS === true) {
            return e(
              `https://notifications-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return e(
            `https://notifications.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
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
  })<{ readonly message: string; readonly resourceId: string }> {}
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
  )<{ readonly message: string; readonly resourceId: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{
    readonly message: string;
    readonly resourceType: string;
    readonly resourceId?: string;
    readonly serviceCode?: string;
    readonly quotaCode?: string;
  }> {}
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
  )<{
    readonly message: string;
    readonly reason?: string;
    readonly fieldList?: ValidationExceptionField[];
  }> {}
export type ChannelArn = string;
export type NotificationConfigurationArn = string;
export interface AssociateChannelRequest {
  arn: string;
  notificationConfigurationArn: string;
}
export interface AssociateChannelResponse {}
export type AccountContactType = string;
export type ManagedNotificationConfigurationOsArn = string;
export interface AssociateManagedNotificationAccountContactRequest {
  contactIdentifier: string;
  managedNotificationConfigurationArn: string;
}
export interface AssociateManagedNotificationAccountContactResponse {}
export interface AssociateManagedNotificationAdditionalChannelRequest {
  channelArn: string;
  managedNotificationConfigurationArn: string;
}
export interface AssociateManagedNotificationAdditionalChannelResponse {}
export type OrganizationalUnitId = string;
export interface AssociateOrganizationalUnitRequest {
  organizationalUnitId: string;
  notificationConfigurationArn: string;
}
export interface AssociateOrganizationalUnitResponse {}
export type Source = string;
export type EventType = string;
export type EventRuleEventPattern = string;
export type Region = string;
export type Regions = string[];
export interface CreateEventRuleRequest {
  notificationConfigurationArn: string;
  source: string;
  eventType: string;
  eventPattern?: string;
  regions: string[];
}
export type EventRuleArn = string;
export type EventRuleStatus = string;
export type EventRuleStatusReason = string;
export interface EventRuleStatusSummary {
  status: string;
  reason: string;
}
export type StatusSummaryByRegion = {
  [key: string]: EventRuleStatusSummary | undefined;
};
export interface CreateEventRuleResponse {
  arn: string;
  notificationConfigurationArn: string;
  statusSummaryByRegion: { [key: string]: EventRuleStatusSummary | undefined };
}
export type NotificationConfigurationName = string;
export type NotificationConfigurationDescription = string;
export type AggregationDuration = string;
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export interface CreateNotificationConfigurationRequest {
  name: string;
  description: string;
  aggregationDuration?: string;
  tags?: { [key: string]: string | undefined };
}
export type NotificationConfigurationStatus = string;
export interface CreateNotificationConfigurationResponse {
  arn: string;
  status: string;
}
export interface DeleteEventRuleRequest {
  arn: string;
}
export interface DeleteEventRuleResponse {}
export interface DeleteNotificationConfigurationRequest {
  arn: string;
}
export interface DeleteNotificationConfigurationResponse {}
export interface DeregisterNotificationHubRequest {
  notificationHubRegion: string;
}
export type NotificationHubStatus = string;
export type NotificationHubStatusReason = string;
export interface NotificationHubStatusSummary {
  status: string;
  reason: string;
}
export interface DeregisterNotificationHubResponse {
  notificationHubRegion: string;
  statusSummary: NotificationHubStatusSummary;
}
export interface DisableNotificationsAccessForOrganizationRequest {}
export interface DisableNotificationsAccessForOrganizationResponse {}
export interface DisassociateChannelRequest {
  arn: string;
  notificationConfigurationArn: string;
}
export interface DisassociateChannelResponse {}
export interface DisassociateManagedNotificationAccountContactRequest {
  contactIdentifier: string;
  managedNotificationConfigurationArn: string;
}
export interface DisassociateManagedNotificationAccountContactResponse {}
export interface DisassociateManagedNotificationAdditionalChannelRequest {
  channelArn: string;
  managedNotificationConfigurationArn: string;
}
export interface DisassociateManagedNotificationAdditionalChannelResponse {}
export interface DisassociateOrganizationalUnitRequest {
  organizationalUnitId: string;
  notificationConfigurationArn: string;
}
export interface DisassociateOrganizationalUnitResponse {}
export interface EnableNotificationsAccessForOrganizationRequest {}
export interface EnableNotificationsAccessForOrganizationResponse {}
export interface GetEventRuleRequest {
  arn: string;
}
export type CreationTime = Date;
export type ManagedRuleArn = string;
export type ManagedRuleArns = string[];
export interface GetEventRuleResponse {
  arn: string;
  notificationConfigurationArn: string;
  creationTime: Date;
  source: string;
  eventType: string;
  eventPattern: string;
  regions: string[];
  managedRules: string[];
  statusSummaryByRegion: { [key: string]: EventRuleStatusSummary | undefined };
}
export type ManagedNotificationChildEventArn = string;
export type LocaleCode = string;
export interface GetManagedNotificationChildEventRequest {
  arn: string;
  locale?: string;
}
export type SchemaVersion = string;
export type NotificationEventId = string;
export type TextPartReference = string;
export interface Dimension {
  name: string;
  value: string;
}
export type Dimensions = Dimension[];
export interface MessageComponents {
  headline?: string;
  paragraphSummary?: string;
  completeDescription?: string;
  dimensions?: Dimension[];
}
export type Url = string;
export type NotificationType = string;
export type EventStatus = string;
export type ManagedNotificationEventArn = string;
export type TextPartId = string;
export type TextPartType = string;
export type TextByLocale = { [key: string]: string | undefined };
export interface TextPartValue {
  type: string;
  displayText?: string;
  textByLocale?: { [key: string]: string | undefined };
  url?: string;
}
export type TextParts = { [key: string]: TextPartValue | undefined };
export interface SummarizationDimensionDetail {
  name: string;
  value: string;
}
export type SummarizationDimensionDetails = SummarizationDimensionDetail[];
export interface AggregationDetail {
  summarizationDimensions?: SummarizationDimensionDetail[];
}
export interface ManagedNotificationChildEvent {
  schemaVersion: string;
  id: string;
  messageComponents: MessageComponents;
  sourceEventDetailUrl?: string;
  sourceEventDetailUrlDisplayText?: string;
  notificationType: string;
  eventStatus?: string;
  aggregateManagedNotificationEventArn: string;
  startTime?: Date;
  endTime?: Date;
  textParts: { [key: string]: TextPartValue | undefined };
  organizationalUnitId?: string;
  aggregationDetail?: AggregationDetail;
}
export interface GetManagedNotificationChildEventResponse {
  arn: string;
  managedNotificationConfigurationArn: string;
  creationTime: Date;
  content: ManagedNotificationChildEvent;
}
export interface GetManagedNotificationConfigurationRequest {
  arn: string;
}
export type ManagedNotificationConfigurationName = string;
export type ManagedNotificationConfigurationDescription = string;
export interface GetManagedNotificationConfigurationResponse {
  arn: string;
  name: string;
  description: string;
  category: string;
  subCategory: string;
}
export interface GetManagedNotificationEventRequest {
  arn: string;
  locale?: string;
}
export type AggregationEventType = string;
export interface AggregationKey {
  name: string;
  value: string;
}
export type AggregationKeys = AggregationKey[];
export type SampleAggregationDimensionValues = string[];
export interface SummarizationDimensionOverview {
  name: string;
  count: number;
  sampleValues?: string[];
}
export type SummarizationDimensionOverviews = SummarizationDimensionOverview[];
export interface AggregationSummary {
  eventCount: number;
  aggregatedBy: AggregationKey[];
  aggregatedAccounts: SummarizationDimensionOverview;
  aggregatedRegions: SummarizationDimensionOverview;
  aggregatedOrganizationalUnits?: SummarizationDimensionOverview;
  additionalSummarizationDimensions?: SummarizationDimensionOverview[];
}
export interface ManagedNotificationEvent {
  schemaVersion: string;
  id: string;
  messageComponents: MessageComponents;
  sourceEventDetailUrl?: string;
  sourceEventDetailUrlDisplayText?: string;
  notificationType: string;
  eventStatus?: string;
  aggregationEventType?: string;
  aggregationSummary?: AggregationSummary;
  startTime?: Date;
  endTime?: Date;
  textParts: { [key: string]: TextPartValue | undefined };
  organizationalUnitId?: string;
}
export interface GetManagedNotificationEventResponse {
  arn: string;
  managedNotificationConfigurationArn: string;
  creationTime: Date;
  content: ManagedNotificationEvent;
}
export interface GetNotificationConfigurationRequest {
  arn: string;
}
export type NotificationConfigurationSubtype = string;
export interface GetNotificationConfigurationResponse {
  arn: string;
  name: string;
  description: string;
  status: string;
  creationTime: Date;
  aggregationDuration?: string;
  subtype?: string;
}
export type NotificationEventArn = string;
export interface GetNotificationEventRequest {
  arn: string;
  locale?: string;
}
export type AccountId = string;
export type Arn = string;
export type Tags = string[];
export interface Resource {
  id?: string;
  arn?: string;
  detailUrl?: string;
  tags?: string[];
}
export type Resources = Resource[];
export interface SourceEventMetadata {
  eventTypeVersion: string;
  sourceEventId: string;
  eventOriginRegion?: string;
  relatedAccount: string;
  source: string;
  eventOccurrenceTime: Date;
  eventType: string;
  relatedResources: Resource[];
}
export type MediaId = string;
export type MediaElementType = string;
export interface MediaElement {
  mediaId: string;
  type: string;
  url: string;
  caption: string;
}
export type Media = MediaElement[];
export interface NotificationEventSchema {
  schemaVersion: string;
  id: string;
  sourceEventMetadata: SourceEventMetadata;
  messageComponents: MessageComponents;
  sourceEventDetailUrl?: string;
  sourceEventDetailUrlDisplayText?: string;
  notificationType: string;
  eventStatus?: string;
  aggregationEventType?: string;
  aggregateNotificationEventArn?: string;
  aggregationSummary?: AggregationSummary;
  startTime?: Date;
  endTime?: Date;
  textParts: { [key: string]: TextPartValue | undefined };
  media: MediaElement[];
  organizationalUnitId?: string;
}
export interface GetNotificationEventResponse {
  arn: string;
  notificationConfigurationArn: string;
  creationTime: Date;
  content: NotificationEventSchema;
}
export interface GetNotificationsAccessForOrganizationRequest {}
export type AccessStatus =
  | "ENABLED"
  | "DISABLED"
  | "PENDING"
  | "FAILED"
  | (string & {});
export interface NotificationsAccessForOrganization {
  accessStatus: AccessStatus;
}
export interface GetNotificationsAccessForOrganizationResponse {
  notificationsAccessForOrganization: NotificationsAccessForOrganization;
}
export type NextToken = string;
export interface ListChannelsRequest {
  notificationConfigurationArn: string;
  maxResults?: number;
  nextToken?: string;
}
export type Channels = string[];
export interface ListChannelsResponse {
  nextToken?: string;
  channels: string[];
}
export interface ListEventRulesRequest {
  notificationConfigurationArn: string;
  maxResults?: number;
  nextToken?: string;
}
export interface EventRuleStructure {
  arn: string;
  notificationConfigurationArn: string;
  creationTime: Date;
  source: string;
  eventType: string;
  eventPattern: string;
  regions: string[];
  managedRules: string[];
  statusSummaryByRegion: { [key: string]: EventRuleStatusSummary | undefined };
}
export type EventRules = EventRuleStructure[];
export interface ListEventRulesResponse {
  nextToken?: string;
  eventRules: EventRuleStructure[];
}
export interface ListManagedNotificationChannelAssociationsRequest {
  managedNotificationConfigurationArn: string;
  maxResults?: number;
  nextToken?: string;
}
export type ChannelType = string;
export type ChannelAssociationOverrideOption = string;
export interface ManagedNotificationChannelAssociationSummary {
  channelIdentifier: string;
  channelType: string;
  overrideOption?: string;
}
export type ManagedNotificationChannelAssociations =
  ManagedNotificationChannelAssociationSummary[];
export interface ListManagedNotificationChannelAssociationsResponse {
  nextToken?: string;
  channelAssociations: ManagedNotificationChannelAssociationSummary[];
}
export interface ListManagedNotificationChildEventsRequest {
  aggregateManagedNotificationEventArn: string;
  startTime?: Date;
  endTime?: Date;
  locale?: string;
  maxResults?: number;
  relatedAccount?: string;
  organizationalUnitId?: string;
  nextToken?: string;
}
export interface ManagedSourceEventMetadataSummary {
  eventOriginRegion?: string;
  source: string;
  eventType: string;
}
export interface MessageComponentsSummary {
  headline: string;
}
export interface ManagedNotificationChildEventSummary {
  schemaVersion: string;
  sourceEventMetadata: ManagedSourceEventMetadataSummary;
  messageComponents: MessageComponentsSummary;
  aggregationDetail: AggregationDetail;
  eventStatus: string;
  notificationType: string;
}
export interface ManagedNotificationChildEventOverview {
  arn: string;
  managedNotificationConfigurationArn: string;
  relatedAccount: string;
  creationTime: Date;
  childEvent: ManagedNotificationChildEventSummary;
  aggregateManagedNotificationEventArn: string;
  organizationalUnitId?: string;
}
export type ManagedNotificationChildEvents =
  ManagedNotificationChildEventOverview[];
export interface ListManagedNotificationChildEventsResponse {
  nextToken?: string;
  managedNotificationChildEvents: ManagedNotificationChildEventOverview[];
}
export type ChannelIdentifier = string;
export interface ListManagedNotificationConfigurationsRequest {
  channelIdentifier?: string;
  maxResults?: number;
  nextToken?: string;
}
export interface ManagedNotificationConfigurationStructure {
  arn: string;
  name: string;
  description: string;
}
export type ManagedNotificationConfigurations =
  ManagedNotificationConfigurationStructure[];
export interface ListManagedNotificationConfigurationsResponse {
  nextToken?: string;
  managedNotificationConfigurations: ManagedNotificationConfigurationStructure[];
}
export interface ListManagedNotificationEventsRequest {
  startTime?: Date;
  endTime?: Date;
  locale?: string;
  source?: string;
  maxResults?: number;
  nextToken?: string;
  organizationalUnitId?: string;
  relatedAccount?: string;
}
export interface ManagedNotificationEventSummary {
  schemaVersion: string;
  sourceEventMetadata: ManagedSourceEventMetadataSummary;
  messageComponents: MessageComponentsSummary;
  eventStatus: string;
  notificationType: string;
}
export type AggregatedNotificationRegions = string[];
export interface ManagedNotificationEventOverview {
  arn: string;
  managedNotificationConfigurationArn: string;
  relatedAccount: string;
  creationTime: Date;
  notificationEvent: ManagedNotificationEventSummary;
  aggregationEventType?: string;
  organizationalUnitId?: string;
  aggregationSummary?: AggregationSummary;
  aggregatedNotificationRegions?: string[];
}
export type ManagedNotificationEvents = ManagedNotificationEventOverview[];
export interface ListManagedNotificationEventsResponse {
  nextToken?: string;
  managedNotificationEvents: ManagedNotificationEventOverview[];
}
export type MemberAccountNotificationConfigurationStatus = string;
export interface ListMemberAccountsRequest {
  notificationConfigurationArn: string;
  maxResults?: number;
  nextToken?: string;
  memberAccount?: string;
  status?: string;
  organizationalUnitId?: string;
}
export interface MemberAccount {
  notificationConfigurationArn?: string;
  accountId: string;
  status: string;
  statusReason: string;
  organizationalUnitId: string;
}
export type MemberAccounts = MemberAccount[];
export interface ListMemberAccountsResponse {
  memberAccounts: MemberAccount[];
  nextToken?: string;
}
export interface ListNotificationConfigurationsRequest {
  eventRuleSource?: string;
  channelArn?: string;
  status?: string;
  subtype?: string;
  maxResults?: number;
  nextToken?: string;
}
export interface NotificationConfigurationStructure {
  arn: string;
  name: string;
  description: string;
  status: string;
  creationTime: Date;
  aggregationDuration?: string;
  subtype?: string;
}
export type NotificationConfigurations = NotificationConfigurationStructure[];
export interface ListNotificationConfigurationsResponse {
  nextToken?: string;
  notificationConfigurations: NotificationConfigurationStructure[];
}
export interface ListNotificationEventsRequest {
  startTime?: Date;
  endTime?: Date;
  locale?: string;
  source?: string;
  includeChildEvents?: boolean;
  aggregateNotificationEventArn?: string;
  maxResults?: number;
  nextToken?: string;
  organizationalUnitId?: string;
}
export interface SourceEventMetadataSummary {
  eventOriginRegion?: string;
  source: string;
  eventType: string;
}
export interface NotificationEventSummary {
  schemaVersion: string;
  sourceEventMetadata: SourceEventMetadataSummary;
  messageComponents: MessageComponentsSummary;
  eventStatus: string;
  notificationType: string;
}
export interface NotificationEventOverview {
  arn: string;
  notificationConfigurationArn: string;
  relatedAccount: string;
  creationTime: Date;
  notificationEvent: NotificationEventSummary;
  aggregationEventType?: string;
  aggregateNotificationEventArn?: string;
  aggregationSummary?: AggregationSummary;
  organizationalUnitId?: string;
}
export type NotificationEvents = NotificationEventOverview[];
export interface ListNotificationEventsResponse {
  nextToken?: string;
  notificationEvents: NotificationEventOverview[];
}
export interface ListNotificationHubsRequest {
  maxResults?: number;
  nextToken?: string;
}
export type LastActivationTime = Date;
export interface NotificationHubOverview {
  notificationHubRegion: string;
  statusSummary: NotificationHubStatusSummary;
  creationTime: Date;
  lastActivationTime?: Date;
}
export type NotificationHubs = NotificationHubOverview[];
export interface ListNotificationHubsResponse {
  notificationHubs: NotificationHubOverview[];
  nextToken?: string;
}
export interface ListOrganizationalUnitsRequest {
  notificationConfigurationArn: string;
  maxResults?: number;
  nextToken?: string;
}
export type OrganizationalUnits = string[];
export interface ListOrganizationalUnitsResponse {
  organizationalUnits: string[];
  nextToken?: string;
}
export interface ListTagsForResourceRequest {
  arn: string;
}
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export interface RegisterNotificationHubRequest {
  notificationHubRegion: string;
}
export interface RegisterNotificationHubResponse {
  notificationHubRegion: string;
  statusSummary: NotificationHubStatusSummary;
  creationTime: Date;
  lastActivationTime?: Date;
}
export interface TagResourceRequest {
  arn: string;
  tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKeys = string[];
export interface UntagResourceRequest {
  arn: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateEventRuleRequest {
  arn: string;
  eventPattern?: string;
  regions?: string[];
}
export interface UpdateEventRuleResponse {
  arn: string;
  notificationConfigurationArn: string;
  statusSummaryByRegion: { [key: string]: EventRuleStatusSummary | undefined };
}
export interface UpdateNotificationConfigurationRequest {
  arn: string;
  name?: string;
  description?: string;
  aggregationDuration?: string;
}
export interface UpdateNotificationConfigurationResponse {
  arn: string;
}
export type ErrorMessage = string;
export type ResourceId = string;
export type ResourceType = string;
export type ServiceCode = string;
export type QuotaCode = string;
export type ValidationExceptionReason = string;
export interface ValidationExceptionField {
  name: string;
  message: string;
}
export type ValidationExceptionFieldList = ValidationExceptionField[];
export type AssociateChannelError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates a delivery Channel with a particular `NotificationConfiguration`. Supported Channels include Amazon Q Developer in chat applications, the Console Mobile Application, and emails (notifications-contacts).
 */
export const associateChannel: API.OperationMethod<
  AssociateChannelRequest,
  AssociateChannelResponse,
  AssociateChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /channels/associate/{arn}",
    input: { arn: 0, notificationConfigurationArn: 0 },
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
  operationName: "AssociateChannel",
})) as any;

export type AssociateManagedNotificationAccountContactError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates an Account Contact with a particular `ManagedNotificationConfiguration`.
 */
export const associateManagedNotificationAccountContact: API.OperationMethod<
  AssociateManagedNotificationAccountContactRequest,
  AssociateManagedNotificationAccountContactResponse,
  AssociateManagedNotificationAccountContactError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /contacts/associate-managed-notification/{contactIdentifier}",
    input: { contactIdentifier: 0, managedNotificationConfigurationArn: 0 },
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
  operationName: "AssociateManagedNotificationAccountContact",
})) as any;

export type AssociateManagedNotificationAdditionalChannelError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates an additional Channel with a particular `ManagedNotificationConfiguration`.
 *
 * Supported Channels include Amazon Q Developer in chat applications, the Console Mobile Application, and emails (notifications-contacts).
 */
export const associateManagedNotificationAdditionalChannel: API.OperationMethod<
  AssociateManagedNotificationAdditionalChannelRequest,
  AssociateManagedNotificationAdditionalChannelResponse,
  AssociateManagedNotificationAdditionalChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /channels/associate-managed-notification/{channelArn}",
    input: { channelArn: 0, managedNotificationConfigurationArn: 0 },
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
  operationName: "AssociateManagedNotificationAdditionalChannel",
})) as any;

export type AssociateOrganizationalUnitError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates an organizational unit with a notification configuration.
 */
export const associateOrganizationalUnit: API.OperationMethod<
  AssociateOrganizationalUnitRequest,
  AssociateOrganizationalUnitResponse,
  AssociateOrganizationalUnitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /organizational-units/associate/{organizationalUnitId}",
    input: { organizationalUnitId: 0, notificationConfigurationArn: 0 },
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
  operationName: "AssociateOrganizationalUnit",
})) as any;

export type CreateEventRuleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an `EventRule` that is associated with a specified `NotificationConfiguration`.
 */
export const createEventRule: API.OperationMethod<
  CreateEventRuleRequest,
  CreateEventRuleResponse,
  CreateEventRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /event-rules",
    input: {
      notificationConfigurationArn: 0,
      source: 0,
      eventType: 0,
      eventPattern: 0,
      regions: 0,
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
  operationName: "CreateEventRule",
})) as any;

export type CreateNotificationConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new `NotificationConfiguration`.
 */
export const createNotificationConfiguration: API.OperationMethod<
  CreateNotificationConfigurationRequest,
  CreateNotificationConfigurationResponse,
  CreateNotificationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /notification-configurations",
    input: { name: 0, description: 0, aggregationDuration: 0, tags: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateNotificationConfiguration",
})) as any;

export type DeleteEventRuleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an `EventRule`.
 */
export const deleteEventRule: API.OperationMethod<
  DeleteEventRuleRequest,
  DeleteEventRuleResponse,
  DeleteEventRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /event-rules/{arn}",
    input: { arn: 0 },
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
  operationName: "DeleteEventRule",
})) as any;

export type DeleteNotificationConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a `NotificationConfiguration`.
 */
export const deleteNotificationConfiguration: API.OperationMethod<
  DeleteNotificationConfigurationRequest,
  DeleteNotificationConfigurationResponse,
  DeleteNotificationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /notification-configurations/{arn}",
    input: { arn: 0 },
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
  operationName: "DeleteNotificationConfiguration",
})) as any;

export type DeregisterNotificationHubError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deregisters a `NotificationConfiguration` in the specified Region.
 *
 * You can't deregister the last `NotificationHub` in the account. `NotificationEvents` stored in the deregistered `NotificationConfiguration` are no longer be visible. Recreating a new `NotificationConfiguration` in the same Region restores access to those `NotificationEvents`.
 */
export const deregisterNotificationHub: API.OperationMethod<
  DeregisterNotificationHubRequest,
  DeregisterNotificationHubResponse,
  DeregisterNotificationHubError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /notification-hubs/{notificationHubRegion}",
    input: { notificationHubRegion: 0 },
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
  operationName: "DeregisterNotificationHub",
})) as any;

export type DisableNotificationsAccessForOrganizationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disables service trust between User Notifications and Amazon Web Services Organizations.
 */
export const disableNotificationsAccessForOrganization: API.OperationMethod<
  DisableNotificationsAccessForOrganizationRequest,
  DisableNotificationsAccessForOrganizationResponse,
  DisableNotificationsAccessForOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "DELETE /organization/access", input: {} },
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
  operationName: "DisableNotificationsAccessForOrganization",
})) as any;

export type DisassociateChannelError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates a Channel from a specified `NotificationConfiguration`. Supported Channels include Amazon Q Developer in chat applications, the Console Mobile Application, and emails (notifications-contacts).
 */
export const disassociateChannel: API.OperationMethod<
  DisassociateChannelRequest,
  DisassociateChannelResponse,
  DisassociateChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /channels/disassociate/{arn}",
    input: { arn: 0, notificationConfigurationArn: 0 },
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
  operationName: "DisassociateChannel",
})) as any;

export type DisassociateManagedNotificationAccountContactError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates an Account Contact with a particular `ManagedNotificationConfiguration`.
 */
export const disassociateManagedNotificationAccountContact: API.OperationMethod<
  DisassociateManagedNotificationAccountContactRequest,
  DisassociateManagedNotificationAccountContactResponse,
  DisassociateManagedNotificationAccountContactError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /contacts/disassociate-managed-notification/{contactIdentifier}",
    input: { contactIdentifier: 0, managedNotificationConfigurationArn: 0 },
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
  operationName: "DisassociateManagedNotificationAccountContact",
})) as any;

export type DisassociateManagedNotificationAdditionalChannelError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates an additional Channel from a particular `ManagedNotificationConfiguration`.
 *
 * Supported Channels include Amazon Q Developer in chat applications, the Console Mobile Application, and emails (notifications-contacts).
 */
export const disassociateManagedNotificationAdditionalChannel: API.OperationMethod<
  DisassociateManagedNotificationAdditionalChannelRequest,
  DisassociateManagedNotificationAdditionalChannelResponse,
  DisassociateManagedNotificationAdditionalChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /channels/disassociate-managed-notification/{channelArn}",
    input: { channelArn: 0, managedNotificationConfigurationArn: 0 },
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
  operationName: "DisassociateManagedNotificationAdditionalChannel",
})) as any;

export type DisassociateOrganizationalUnitError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes the association between an organizational unit and a notification configuration.
 */
export const disassociateOrganizationalUnit: API.OperationMethod<
  DisassociateOrganizationalUnitRequest,
  DisassociateOrganizationalUnitResponse,
  DisassociateOrganizationalUnitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /organizational-units/disassociate/{organizationalUnitId}",
    input: { organizationalUnitId: 0, notificationConfigurationArn: 0 },
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
  operationName: "DisassociateOrganizationalUnit",
})) as any;

export type EnableNotificationsAccessForOrganizationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Enables service trust between User Notifications and Amazon Web Services Organizations.
 */
export const enableNotificationsAccessForOrganization: API.OperationMethod<
  EnableNotificationsAccessForOrganizationRequest,
  EnableNotificationsAccessForOrganizationResponse,
  EnableNotificationsAccessForOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "POST /organization/access", input: {} },
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
  operationName: "EnableNotificationsAccessForOrganization",
})) as any;

export type GetEventRuleError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a specified `EventRule`.
 */
export const getEventRule: API.OperationMethod<
  GetEventRuleRequest,
  GetEventRuleResponse,
  GetEventRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /event-rules/{arn}",
    input: { arn: 0 },
    output: { creationTime: D.ts },
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
  operationName: "GetEventRule",
})) as any;

export type GetManagedNotificationChildEventError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the child event of a specific given `ManagedNotificationEvent`.
 */
export const getManagedNotificationChildEvent: API.OperationMethod<
  GetManagedNotificationChildEventRequest,
  GetManagedNotificationChildEventResponse,
  GetManagedNotificationChildEventError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /managed-notification-child-events/{arn}",
    input: { arn: 0, locale: D.m({ query: "locale" }) },
    output: { creationTime: D.ts, content: { startTime: D.ts, endTime: D.ts } },
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
  operationName: "GetManagedNotificationChildEvent",
})) as any;

export type GetManagedNotificationConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a specified `ManagedNotificationConfiguration`.
 */
export const getManagedNotificationConfiguration: API.OperationMethod<
  GetManagedNotificationConfigurationRequest,
  GetManagedNotificationConfigurationResponse,
  GetManagedNotificationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /managed-notification-configurations/{arn}",
    input: { arn: 0 },
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
  operationName: "GetManagedNotificationConfiguration",
})) as any;

export type GetManagedNotificationEventError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a specified `ManagedNotificationEvent`.
 */
export const getManagedNotificationEvent: API.OperationMethod<
  GetManagedNotificationEventRequest,
  GetManagedNotificationEventResponse,
  GetManagedNotificationEventError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /managed-notification-events/{arn}",
    input: { arn: 0, locale: D.m({ query: "locale" }) },
    output: { creationTime: D.ts, content: { startTime: D.ts, endTime: D.ts } },
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
  operationName: "GetManagedNotificationEvent",
})) as any;

export type GetNotificationConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a specified `NotificationConfiguration`.
 */
export const getNotificationConfiguration: API.OperationMethod<
  GetNotificationConfigurationRequest,
  GetNotificationConfigurationResponse,
  GetNotificationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /notification-configurations/{arn}",
    input: { arn: 0 },
    output: { creationTime: D.ts },
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
  operationName: "GetNotificationConfiguration",
})) as any;

export type GetNotificationEventError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a specified `NotificationEvent`.
 *
 * User Notifications stores notifications in the individual Regions you register as notification hubs and the Region of the source event rule. `GetNotificationEvent` only returns notifications stored in the same Region in which the action is called. User Notifications doesn't backfill notifications to new Regions selected as notification hubs. For this reason, we recommend that you make calls in your oldest registered notification hub. For more information, see Notification hubs in the *Amazon Web Services User Notifications User Guide*.
 */
export const getNotificationEvent: API.OperationMethod<
  GetNotificationEventRequest,
  GetNotificationEventResponse,
  GetNotificationEventError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /notification-events/{arn}",
    input: { arn: 0, locale: D.m({ query: "locale" }) },
    output: {
      creationTime: D.ts,
      content: {
        sourceEventMetadata: { eventOccurrenceTime: D.ts },
        startTime: D.ts,
        endTime: D.ts,
      },
    },
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
  operationName: "GetNotificationEvent",
})) as any;

export type GetNotificationsAccessForOrganizationError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the AccessStatus of Service Trust Enablement for User Notifications and Amazon Web Services Organizations.
 */
export const getNotificationsAccessForOrganization: API.OperationMethod<
  GetNotificationsAccessForOrganizationRequest,
  GetNotificationsAccessForOrganizationResponse,
  GetNotificationsAccessForOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "GET /organization/access", input: {} },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetNotificationsAccessForOrganization",
})) as any;

export type ListChannelsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of Channels for a `NotificationConfiguration`.
 */
export const listChannels: API.PaginatedOperationMethod<
  ListChannelsRequest,
  ListChannelsResponse,
  ListChannelsError,
  Credentials | HttpClient.HttpClient,
  ChannelArn
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /channels",
    input: {
      notificationConfigurationArn: D.m({
        query: "notificationConfigurationArn",
      }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
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
  operationName: "ListChannels",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "channels",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListEventRulesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of `EventRules` according to specified filters, in reverse chronological order (newest first).
 */
export const listEventRules: API.PaginatedOperationMethod<
  ListEventRulesRequest,
  ListEventRulesResponse,
  ListEventRulesError,
  Credentials | HttpClient.HttpClient,
  EventRuleStructure
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /event-rules",
    input: {
      notificationConfigurationArn: D.m({
        query: "notificationConfigurationArn",
      }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { eventRules: D.list({ creationTime: D.ts }) },
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
  operationName: "ListEventRules",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "eventRules",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListManagedNotificationChannelAssociationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of Account contacts and Channels associated with a `ManagedNotificationConfiguration`, in paginated format.
 */
export const listManagedNotificationChannelAssociations: API.PaginatedOperationMethod<
  ListManagedNotificationChannelAssociationsRequest,
  ListManagedNotificationChannelAssociationsResponse,
  ListManagedNotificationChannelAssociationsError,
  Credentials | HttpClient.HttpClient,
  ManagedNotificationChannelAssociationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /channels/list-managed-notification-channel-associations",
    input: {
      managedNotificationConfigurationArn: D.m({
        query: "managedNotificationConfigurationArn",
      }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
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
  operationName: "ListManagedNotificationChannelAssociations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "channelAssociations",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListManagedNotificationChildEventsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns a list of `ManagedNotificationChildEvents` for a specified aggregate `ManagedNotificationEvent`, ordered by creation time in reverse chronological order (newest first).
 */
export const listManagedNotificationChildEvents: API.PaginatedOperationMethod<
  ListManagedNotificationChildEventsRequest,
  ListManagedNotificationChildEventsResponse,
  ListManagedNotificationChildEventsError,
  Credentials | HttpClient.HttpClient,
  ManagedNotificationChildEventOverview
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /list-managed-notification-child-events/{aggregateManagedNotificationEventArn}",
    input: {
      aggregateManagedNotificationEventArn: 0,
      startTime: D.m({ query: "startTime" }),
      endTime: D.m({ query: "endTime" }),
      locale: D.m({ query: "locale" }),
      maxResults: D.m({ query: "maxResults" }),
      relatedAccount: D.m({ query: "relatedAccount" }),
      organizationalUnitId: D.m({ query: "organizationalUnitId" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { managedNotificationChildEvents: D.list({ creationTime: D.ts }) },
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
  operationName: "ListManagedNotificationChildEvents",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "managedNotificationChildEvents",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListManagedNotificationConfigurationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of Managed Notification Configurations according to specified filters, ordered by creation time in reverse chronological order (newest first).
 */
export const listManagedNotificationConfigurations: API.PaginatedOperationMethod<
  ListManagedNotificationConfigurationsRequest,
  ListManagedNotificationConfigurationsResponse,
  ListManagedNotificationConfigurationsError,
  Credentials | HttpClient.HttpClient,
  ManagedNotificationConfigurationStructure
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /managed-notification-configurations",
    input: {
      channelIdentifier: D.m({ query: "channelIdentifier" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
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
  operationName: "ListManagedNotificationConfigurations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "managedNotificationConfigurations",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListManagedNotificationEventsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of Managed Notification Events according to specified filters, ordered by creation time in reverse chronological order (newest first).
 */
export const listManagedNotificationEvents: API.PaginatedOperationMethod<
  ListManagedNotificationEventsRequest,
  ListManagedNotificationEventsResponse,
  ListManagedNotificationEventsError,
  Credentials | HttpClient.HttpClient,
  ManagedNotificationEventOverview
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /managed-notification-events",
    input: {
      startTime: D.m({ query: "startTime" }),
      endTime: D.m({ query: "endTime" }),
      locale: D.m({ query: "locale" }),
      source: D.m({ query: "source" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      organizationalUnitId: D.m({ query: "organizationalUnitId" }),
      relatedAccount: D.m({ query: "relatedAccount" }),
    },
    output: { managedNotificationEvents: D.list({ creationTime: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListManagedNotificationEvents",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "managedNotificationEvents",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListMemberAccountsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of member accounts associated with a notification configuration.
 */
export const listMemberAccounts: API.PaginatedOperationMethod<
  ListMemberAccountsRequest,
  ListMemberAccountsResponse,
  ListMemberAccountsError,
  Credentials | HttpClient.HttpClient,
  MemberAccount
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /list-member-accounts",
    input: {
      notificationConfigurationArn: D.m({
        query: "notificationConfigurationArn",
      }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      memberAccount: D.m({ query: "memberAccount" }),
      status: D.m({ query: "status" }),
      organizationalUnitId: D.m({ query: "organizationalUnitId" }),
    },
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
  operationName: "ListMemberAccounts",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "memberAccounts",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListNotificationConfigurationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of abbreviated `NotificationConfigurations` according to specified filters, in reverse chronological order (newest first).
 */
export const listNotificationConfigurations: API.PaginatedOperationMethod<
  ListNotificationConfigurationsRequest,
  ListNotificationConfigurationsResponse,
  ListNotificationConfigurationsError,
  Credentials | HttpClient.HttpClient,
  NotificationConfigurationStructure
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /notification-configurations",
    input: {
      eventRuleSource: D.m({ query: "eventRuleSource" }),
      channelArn: D.m({ query: "channelArn" }),
      status: D.m({ query: "status" }),
      subtype: D.m({ query: "subtype" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { notificationConfigurations: D.list({ creationTime: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNotificationConfigurations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "notificationConfigurations",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListNotificationEventsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of `NotificationEvents` according to specified filters, in reverse chronological order (newest first).
 *
 * User Notifications stores notifications in the individual Regions you register as notification hubs and the Region of the source event rule. ListNotificationEvents only returns notifications stored in the same Region in which the action is called. User Notifications doesn't backfill notifications to new Regions selected as notification hubs. For this reason, we recommend that you make calls in your oldest registered notification hub. For more information, see Notification hubs in the *Amazon Web Services User Notifications User Guide*.
 */
export const listNotificationEvents: API.PaginatedOperationMethod<
  ListNotificationEventsRequest,
  ListNotificationEventsResponse,
  ListNotificationEventsError,
  Credentials | HttpClient.HttpClient,
  NotificationEventOverview
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /notification-events",
    input: {
      startTime: D.m({ query: "startTime" }),
      endTime: D.m({ query: "endTime" }),
      locale: D.m({ query: "locale" }),
      source: D.m({ query: "source" }),
      includeChildEvents: D.m({ query: "includeChildEvents" }),
      aggregateNotificationEventArn: D.m({
        query: "aggregateNotificationEventArn",
      }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      organizationalUnitId: D.m({ query: "organizationalUnitId" }),
    },
    output: { notificationEvents: D.list({ creationTime: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNotificationEvents",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "notificationEvents",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListNotificationHubsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of `NotificationHubs`.
 */
export const listNotificationHubs: API.PaginatedOperationMethod<
  ListNotificationHubsRequest,
  ListNotificationHubsResponse,
  ListNotificationHubsError,
  Credentials | HttpClient.HttpClient,
  NotificationHubOverview
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /notification-hubs",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: {
      notificationHubs: D.list({
        creationTime: D.ts,
        lastActivationTime: D.ts,
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
  operationName: "ListNotificationHubs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "notificationHubs",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListOrganizationalUnitsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of organizational units associated with a notification configuration.
 */
export const listOrganizationalUnits: API.PaginatedOperationMethod<
  ListOrganizationalUnitsRequest,
  ListOrganizationalUnitsResponse,
  ListOrganizationalUnitsError,
  Credentials | HttpClient.HttpClient,
  OrganizationalUnitId
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /organizational-units",
    input: {
      notificationConfigurationArn: D.m({
        query: "notificationConfigurationArn",
      }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
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
  operationName: "ListOrganizationalUnits",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "organizationalUnits",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of tags for a specified Amazon Resource Name (ARN).
 *
 * For more information, see Tagging your Amazon Web Services resources in the *Tagging Amazon Web Services Resources User Guide*.
 *
 * This is only supported for `NotificationConfigurations`.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "GET /tags/{arn}", input: { arn: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type RegisterNotificationHubError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Registers a `NotificationConfiguration` in the specified Region.
 *
 * There is a maximum of one `NotificationConfiguration` per Region. You can have a maximum of 3 `NotificationHub` resources at a time.
 */
export const registerNotificationHub: API.OperationMethod<
  RegisterNotificationHubRequest,
  RegisterNotificationHubResponse,
  RegisterNotificationHubError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /notification-hubs",
    input: { notificationHubRegion: 0 },
    output: { creationTime: D.ts, lastActivationTime: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterNotificationHub",
})) as any;

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Tags the resource with a tag key and value.
 *
 * For more information, see Tagging your Amazon Web Services resources in the *Tagging Amazon Web Services Resources User Guide*.
 *
 * This is only supported for `NotificationConfigurations`.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /tags/{arn}",
    input: { arn: 0, tags: 0 },
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
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Untags a resource with a specified Amazon Resource Name (ARN).
 *
 * For more information, see Tagging your Amazon Web Services resources in the *Tagging Amazon Web Services Resources User Guide*.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /tags/{arn}",
    input: { arn: 0, tagKeys: D.m({ query: "tagKeys" }) },
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
  operationName: "UntagResource",
})) as any;

export type UpdateEventRuleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing `EventRule`.
 */
export const updateEventRule: API.OperationMethod<
  UpdateEventRuleRequest,
  UpdateEventRuleResponse,
  UpdateEventRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /event-rules/{arn}",
    input: { arn: 0, eventPattern: 0, regions: 0 },
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
  operationName: "UpdateEventRule",
})) as any;

export type UpdateNotificationConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a `NotificationConfiguration`.
 */
export const updateNotificationConfiguration: API.OperationMethod<
  UpdateNotificationConfigurationRequest,
  UpdateNotificationConfigurationResponse,
  UpdateNotificationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /notification-configurations/{arn}",
    input: { arn: 0, name: 0, description: 0, aggregationDuration: 0 },
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
  operationName: "UpdateNotificationConfiguration",
})) as any;
