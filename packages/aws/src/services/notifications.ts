import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import { SensitiveString } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "Notifications",
  serviceShapeName: "Notifications",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "notifications" });
const ver = /*@__PURE__*/ T.ServiceVersion("2018-05-10");
const proto = /*@__PURE__*/ T.AwsProtocolsRestJson1();
const rules = /*@__PURE__*/ T.EndpointResolver(
  (p, _) => {
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
        return err("Invalid Configuration: FIPS and custom endpoint are not supported");
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
  '{"url":"https://notifications.{R}.api.aws","properties":{},"headers":{}}',
  [
    "cn-north-1",
    "cn-northwest-1",
    "aws-cn-global",
    "us-iso-east-1",
    "us-iso-west-1",
    "aws-iso-global",
    "us-isob-east-1",
    "aws-iso-b-global",
    "aws-iso-f-global",
    "us-isof-east-1",
    "us-isof-south-1",
    "eusc-de-east-1",
  ],
);

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()), resourceId: S.String },
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
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()), resourceId: S.String },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceType: S.String,
      resourceId: /*@__PURE__*/ S.optional(S.String),
      serviceCode: /*@__PURE__*/ S.optional(S.String),
      quotaCode: /*@__PURE__*/ S.optional(S.String),
    },
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
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      reason: /*@__PURE__*/ S.optional(S.String),
      fieldList: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(409, __c51, 1)).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
  isSensitiveEventsSubscribed?: boolean;
}
export interface AssociateManagedNotificationAccountContactResponse {}
export interface AssociateManagedNotificationAdditionalChannelRequest {
  channelArn: string;
  managedNotificationConfigurationArn: string;
  isSensitiveEventsSubscribed?: boolean;
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
export type StatusSummaryByRegion = { [key: string]: EventRuleStatusSummary | undefined };
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
  markupDescription?: string;
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
export type AttachmentDisplayName = string;
export type SensitiveUrl = string | redacted.Redacted<string>;
export type AttachmentContentType = string;
export interface NotificationEventAttachment {
  displayName: string;
  attachmentDownloadUrl?: string | redacted.Redacted<string>;
  contentType: string;
}
export type NotificationEventAttachmentList = NotificationEventAttachment[];
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
  attachments?: NotificationEventAttachment[];
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
export type AccessStatus = "ENABLED" | "DISABLED" | "PENDING" | "FAILED" | (string & {});
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
export type ChannelType = "MOBILE" | "CHATBOT" | "EMAIL" | "ACCOUNT_CONTACT" | (string & {});
export type ChannelAssociationOverrideOption = string;
export interface ManagedNotificationChannelAssociationSummary {
  channelIdentifier: string;
  channelType: ChannelType;
  overrideOption?: string;
  isSensitiveEventsSubscribed?: boolean;
}
export type ManagedNotificationChannelAssociations = ManagedNotificationChannelAssociationSummary[];
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
export type ManagedNotificationChildEvents = ManagedNotificationChildEventOverview[];
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
export type ManagedNotificationConfigurations = ManagedNotificationConfigurationStructure[];
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
  includeSensitiveEvents?: boolean;
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
export type ManagedNotificationChannelIdentifier = string;
export interface UpdateManagedNotificationChannelAssociationRequest {
  managedNotificationConfigurationArn: string;
  channelIdentifier: string;
  isSensitiveEventsSubscribed?: boolean;
}
export interface UpdateManagedNotificationChannelAssociationResponse {}
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
  input: __S(416, __c52, 0) as any as S.Schema<AssociateChannelRequest>,
  output: __S(424, __c53, 0) as any as S.Schema<AssociateChannelResponse>,
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
}));

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
  input: __S(432, __c54, 0) as any as S.Schema<AssociateManagedNotificationAccountContactRequest>,
  output: __S(424, __c53, 0) as any as S.Schema<AssociateManagedNotificationAccountContactResponse>,
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
}));

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
  input: __S(
    440,
    __c55,
    0,
  ) as any as S.Schema<AssociateManagedNotificationAdditionalChannelRequest>,
  output: __S(
    424,
    __c53,
    0,
  ) as any as S.Schema<AssociateManagedNotificationAdditionalChannelResponse>,
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
}));

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
  input: __S(0, __c0, 0) as any as S.Schema<AssociateOrganizationalUnitRequest>,
  output: __S(424, __c53, 0) as any as S.Schema<AssociateOrganizationalUnitResponse>,
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
}));

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
  input: __S(8, __c1, 0) as any as S.Schema<CreateEventRuleRequest>,
  output: __S(40, __c5, 0) as any as S.Schema<CreateEventRuleResponse>,
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
}));

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
  input: __S(48, __c6, 0) as any as S.Schema<CreateNotificationConfigurationRequest>,
  output: __S(49, __c6, 1) as any as S.Schema<CreateNotificationConfigurationResponse>,
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
}));

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
  input: __S(64, __c8, 0) as any as S.Schema<DeleteEventRuleRequest>,
  output: __S(424, __c53, 0) as any as S.Schema<DeleteEventRuleResponse>,
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
}));

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
  input: __S(72, __c9, 0) as any as S.Schema<DeleteNotificationConfigurationRequest>,
  output: __S(424, __c53, 0) as any as S.Schema<DeleteNotificationConfigurationResponse>,
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
}));

export type DeregisterNotificationHubError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deregisters a `NotificationHub` in the specified Region.
 *
 * You can't deregister the last `NotificationHub` in the account. `NotificationEvents` stored in the deregistered `NotificationHub` are no longer visible. Recreating a new `NotificationHub` in the same Region restores access to those `NotificationEvents`.
 */
export const deregisterNotificationHub: API.OperationMethod<
  DeregisterNotificationHubRequest,
  DeregisterNotificationHubResponse,
  DeregisterNotificationHubError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(80, __c10, 0) as any as S.Schema<DeregisterNotificationHubRequest>,
  output: __S(81, __c10, 1) as any as S.Schema<DeregisterNotificationHubResponse>,
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
}));

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
  input: __S(88, __c11, 0) as any as S.Schema<DisableNotificationsAccessForOrganizationRequest>,
  output: __S(424, __c53, 0) as any as S.Schema<DisableNotificationsAccessForOrganizationResponse>,
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
}));

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
  input: __S(96, __c12, 0) as any as S.Schema<DisassociateChannelRequest>,
  output: __S(424, __c53, 0) as any as S.Schema<DisassociateChannelResponse>,
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
}));

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
  input: __S(
    104,
    __c13,
    0,
  ) as any as S.Schema<DisassociateManagedNotificationAccountContactRequest>,
  output: __S(
    424,
    __c53,
    0,
  ) as any as S.Schema<DisassociateManagedNotificationAccountContactResponse>,
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
}));

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
  input: __S(
    112,
    __c14,
    0,
  ) as any as S.Schema<DisassociateManagedNotificationAdditionalChannelRequest>,
  output: __S(
    424,
    __c53,
    0,
  ) as any as S.Schema<DisassociateManagedNotificationAdditionalChannelResponse>,
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
}));

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
  input: __S(120, __c15, 0) as any as S.Schema<DisassociateOrganizationalUnitRequest>,
  output: __S(424, __c53, 0) as any as S.Schema<DisassociateOrganizationalUnitResponse>,
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
}));

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
  input: __S(128, __c16, 0) as any as S.Schema<EnableNotificationsAccessForOrganizationRequest>,
  output: __S(424, __c53, 0) as any as S.Schema<EnableNotificationsAccessForOrganizationResponse>,
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
}));

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
  input: __S(136, __c17, 0) as any as S.Schema<GetEventRuleRequest>,
  output: __S(144, __c18, 0) as any as S.Schema<GetEventRuleResponse>,
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
}));

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
  input: __S(152, __c19, 0) as any as S.Schema<GetManagedNotificationChildEventRequest>,
  output: __S(154, __c19, 2) as any as S.Schema<GetManagedNotificationChildEventResponse>,
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
}));

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
  input: __S(184, __c23, 0) as any as S.Schema<GetManagedNotificationConfigurationRequest>,
  output: __S(185, __c23, 1) as any as S.Schema<GetManagedNotificationConfigurationResponse>,
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
}));

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
  input: __S(192, __c24, 0) as any as S.Schema<GetManagedNotificationEventRequest>,
  output: __S(196, __c24, 4) as any as S.Schema<GetManagedNotificationEventResponse>,
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
}));

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
  input: __S(208, __c26, 0) as any as S.Schema<GetNotificationConfigurationRequest>,
  output: __S(216, __c27, 0) as any as S.Schema<GetNotificationConfigurationResponse>,
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
}));

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
  input: __S(224, __c28, 0) as any as S.Schema<GetNotificationEventRequest>,
  output: __S(231, __c28, 7) as any as S.Schema<GetNotificationEventResponse>,
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
}));

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
  input: __S(232, __c29, 0) as any as S.Schema<GetNotificationsAccessForOrganizationRequest>,
  output: __S(234, __c29, 2) as any as S.Schema<GetNotificationsAccessForOrganizationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetNotificationsAccessForOrganization",
}));

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
  input: __S(240, __c30, 0) as any as S.Schema<ListChannelsRequest>,
  output: __S(241, __c30, 1) as any as S.Schema<ListChannelsResponse>,
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
  input: __S(248, __c31, 0) as any as S.Schema<ListEventRulesRequest>,
  output: __S(250, __c31, 2) as any as S.Schema<ListEventRulesResponse>,
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
  input: __S(256, __c32, 0) as any as S.Schema<ListManagedNotificationChannelAssociationsRequest>,
  output: __S(259, __c32, 3) as any as S.Schema<ListManagedNotificationChannelAssociationsResponse>,
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
  input: __S(264, __c33, 0) as any as S.Schema<ListManagedNotificationChildEventsRequest>,
  output: __S(268, __c33, 4) as any as S.Schema<ListManagedNotificationChildEventsResponse>,
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
  input: __S(280, __c35, 0) as any as S.Schema<ListManagedNotificationConfigurationsRequest>,
  output: __S(283, __c35, 3) as any as S.Schema<ListManagedNotificationConfigurationsResponse>,
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
  input: __S(288, __c36, 0) as any as S.Schema<ListManagedNotificationEventsRequest>,
  output: __S(291, __c36, 3) as any as S.Schema<ListManagedNotificationEventsResponse>,
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
  input: __S(304, __c38, 0) as any as S.Schema<ListMemberAccountsRequest>,
  output: __S(307, __c38, 3) as any as S.Schema<ListMemberAccountsResponse>,
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
  input: __S(312, __c39, 0) as any as S.Schema<ListNotificationConfigurationsRequest>,
  output: __S(314, __c39, 2) as any as S.Schema<ListNotificationConfigurationsResponse>,
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
  input: __S(320, __c40, 0) as any as S.Schema<ListNotificationEventsRequest>,
  output: __S(323, __c40, 3) as any as S.Schema<ListNotificationEventsResponse>,
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
  input: __S(328, __c41, 0) as any as S.Schema<ListNotificationHubsRequest>,
  output: __S(330, __c41, 2) as any as S.Schema<ListNotificationHubsResponse>,
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
  input: __S(344, __c43, 0) as any as S.Schema<ListOrganizationalUnitsRequest>,
  output: __S(345, __c43, 1) as any as S.Schema<ListOrganizationalUnitsResponse>,
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
  input: __S(352, __c44, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(353, __c44, 1) as any as S.Schema<ListTagsForResourceResponse>,
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
}));

export type RegisterNotificationHubError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Registers a `NotificationHub` in the specified Region.
 *
 * There is a maximum of one `NotificationHub` per Region. You can have a maximum of 3 `NotificationHub` resources at a time.
 */
export const registerNotificationHub: API.OperationMethod<
  RegisterNotificationHubRequest,
  RegisterNotificationHubResponse,
  RegisterNotificationHubError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(360, __c45, 0) as any as S.Schema<RegisterNotificationHubRequest>,
  output: __S(336, __c42, 0) as any as S.Schema<RegisterNotificationHubResponse>,
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
}));

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
  input: __S(368, __c46, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(424, __c53, 0) as any as S.Schema<TagResourceResponse>,
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
}));

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
  input: __S(376, __c47, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(424, __c53, 0) as any as S.Schema<UntagResourceResponse>,
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
}));

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
  input: __S(384, __c48, 0) as any as S.Schema<UpdateEventRuleRequest>,
  output: __S(40, __c5, 0) as any as S.Schema<UpdateEventRuleResponse>,
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
}));

export type UpdateManagedNotificationChannelAssociationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the `isSensitiveEventsSubscribed` property of a particular ManagedNotification channel association.
 */
export const updateManagedNotificationChannelAssociation: API.OperationMethod<
  UpdateManagedNotificationChannelAssociationRequest,
  UpdateManagedNotificationChannelAssociationResponse,
  UpdateManagedNotificationChannelAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(392, __c49, 0) as any as S.Schema<UpdateManagedNotificationChannelAssociationRequest>,
  output: __S(
    424,
    __c53,
    0,
  ) as any as S.Schema<UpdateManagedNotificationChannelAssociationResponse>,
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
  operationName: "UpdateManagedNotificationChannelAssociation",
}));

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
  input: __S(400, __c50, 0) as any as S.Schema<UpdateNotificationConfigurationRequest>,
  output: __S(401, __c50, 1) as any as S.Schema<UpdateNotificationConfigurationResponse>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          organizationalUnitId: S.String.pipe(T.HttpLabel("organizationalUnitId")),
          notificationConfigurationArn: S.String,
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/organizational-units/associate/{organizationalUnitId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociateOrganizationalUnitRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          notificationConfigurationArn: S.String,
          source: S.String,
          eventType: S.String,
          eventPattern: S.optional(S.String),
          regions: __S(24, __c3, 0),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/event-rules" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateEventRuleRequest" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ status: S.String, reason: S.String })).annotate({
        identifier: "EventRuleStatusSummary",
      });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ __S(16, __c2, 0).pipe(S.optional));
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          notificationConfigurationArn: S.String,
          statusSummaryByRegion: __S(32, __c4, 0),
        }),
      ).annotate({ identifier: "CreateEventRuleResponse" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.String,
          aggregationDuration: S.optional(S.String),
          tags: S.optional(__S(56, __c7, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/notification-configurations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateNotificationConfigurationRequest" });
    case 1:
      return S.suspend(() => S.Struct({ arn: S.String, status: S.String })).annotate({
        identifier: "CreateNotificationConfigurationResponse",
      });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String.pipe(T.HttpLabel("arn")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/event-rules/{arn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteEventRuleRequest" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String.pipe(T.HttpLabel("arn")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/notification-configurations/{arn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteNotificationConfigurationRequest" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          notificationHubRegion: S.String.pipe(T.HttpLabel("notificationHubRegion")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/notification-hubs/{notificationHubRegion}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeregisterNotificationHubRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ notificationHubRegion: S.String, statusSummary: __S(16, __c2, 0) }),
      ).annotate({ identifier: "DeregisterNotificationHubResponse" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/organization/access" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisableNotificationsAccessForOrganizationRequest" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.String.pipe(T.HttpLabel("arn")),
          notificationConfigurationArn: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/channels/disassociate/{arn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateChannelRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          contactIdentifier: S.String.pipe(T.HttpLabel("contactIdentifier")),
          managedNotificationConfigurationArn: S.String,
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/contacts/disassociate-managed-notification/{contactIdentifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateManagedNotificationAccountContactRequest" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          channelArn: S.String.pipe(T.HttpLabel("channelArn")),
          managedNotificationConfigurationArn: S.String,
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/channels/disassociate-managed-notification/{channelArn}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateManagedNotificationAdditionalChannelRequest" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          organizationalUnitId: S.String.pipe(T.HttpLabel("organizationalUnitId")),
          notificationConfigurationArn: S.String,
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/organizational-units/disassociate/{organizationalUnitId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateOrganizationalUnitRequest" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/organization/access" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "EnableNotificationsAccessForOrganizationRequest" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String.pipe(T.HttpLabel("arn")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/event-rules/{arn}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetEventRuleRequest" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          notificationConfigurationArn: S.String,
          creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          source: S.String,
          eventType: S.String,
          eventPattern: S.String,
          regions: __S(24, __c3, 0),
          managedRules: __S(24, __c3, 0),
          statusSummaryByRegion: __S(32, __c4, 0),
        }),
      ).annotate({ identifier: "GetEventRuleResponse" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.String.pipe(T.HttpLabel("arn")),
          locale: S.optional(S.String).pipe(T.HttpQuery("locale")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/managed-notification-child-events/{arn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetManagedNotificationChildEventRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          schemaVersion: S.String,
          id: S.String,
          messageComponents: __S(160, __c20, 0),
          sourceEventDetailUrl: S.optional(S.String),
          sourceEventDetailUrlDisplayText: S.optional(S.String),
          notificationType: S.String,
          eventStatus: S.optional(S.String),
          aggregateManagedNotificationEventArn: S.String,
          startTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          endTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          textParts: __S(162, __c20, 2),
          organizationalUnitId: S.optional(S.String),
          aggregationDetail: S.optional(__S(176, __c22, 0)),
        }),
      ).annotate({ identifier: "ManagedNotificationChildEvent" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          managedNotificationConfigurationArn: S.String,
          creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          content: __S(153, __c19, 1),
        }),
      ).annotate({ identifier: "GetManagedNotificationChildEventResponse" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          headline: S.optional(S.String),
          paragraphSummary: S.optional(S.String),
          completeDescription: S.optional(S.String),
          markupDescription: S.optional(S.String),
          dimensions: S.optional(__S(169, __c21, 1)),
        }),
      ).annotate({ identifier: "MessageComponents" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          type: S.String,
          displayText: S.optional(S.String),
          textByLocale: S.optional(__S(56, __c7, 0)),
          url: S.optional(S.String),
        }),
      ).annotate({ identifier: "TextPartValue" });
    case 2:
      return S.Record(S.String, /*@__PURE__*/ __S(161, __c20, 1).pipe(S.optional));
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ name: S.String, value: S.String })).annotate({
        identifier: "Dimension",
      });
    case 1:
      return S.Array(__S(168, __c21, 0));
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ summarizationDimensions: S.optional(__S(169, __c21, 1)) }),
      ).annotate({ identifier: "AggregationDetail" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String.pipe(T.HttpLabel("arn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/managed-notification-configurations/{arn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetManagedNotificationConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          name: S.String,
          description: S.String,
          category: S.String,
          subCategory: S.String,
        }),
      ).annotate({ identifier: "GetManagedNotificationConfigurationResponse" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.String.pipe(T.HttpLabel("arn")),
          locale: S.optional(S.String).pipe(T.HttpQuery("locale")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/managed-notification-events/{arn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetManagedNotificationEventRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          displayName: S.String,
          attachmentDownloadUrl: S.optional(SensitiveString),
          contentType: S.String,
        }),
      ).annotate({ identifier: "NotificationEventAttachment" });
    case 2:
      return S.Array(__S(193, __c24, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          schemaVersion: S.String,
          id: S.String,
          messageComponents: __S(160, __c20, 0),
          sourceEventDetailUrl: S.optional(S.String),
          sourceEventDetailUrlDisplayText: S.optional(S.String),
          notificationType: S.String,
          eventStatus: S.optional(S.String),
          aggregationEventType: S.optional(S.String),
          aggregationSummary: S.optional(__S(202, __c25, 2)),
          startTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          endTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          textParts: __S(162, __c20, 2),
          organizationalUnitId: S.optional(S.String),
          attachments: S.optional(__S(194, __c24, 2)),
        }),
      ).annotate({ identifier: "ManagedNotificationEvent" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          managedNotificationConfigurationArn: S.String,
          creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          content: __S(195, __c24, 3),
        }),
      ).annotate({ identifier: "GetManagedNotificationEventResponse" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.String, count: S.Number, sampleValues: S.optional(__S(24, __c3, 0)) }),
      ).annotate({ identifier: "SummarizationDimensionOverview" });
    case 1:
      return S.Array(__S(200, __c25, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          eventCount: S.Number,
          aggregatedBy: __S(169, __c21, 1),
          aggregatedAccounts: __S(200, __c25, 0),
          aggregatedRegions: __S(200, __c25, 0),
          aggregatedOrganizationalUnits: S.optional(__S(200, __c25, 0)),
          additionalSummarizationDimensions: S.optional(__S(201, __c25, 1)),
        }),
      ).annotate({ identifier: "AggregationSummary" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String.pipe(T.HttpLabel("arn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/notification-configurations/{arn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetNotificationConfigurationRequest" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          name: S.String,
          description: S.String,
          status: S.String,
          creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          aggregationDuration: S.optional(S.String),
          subtype: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetNotificationConfigurationResponse" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.String.pipe(T.HttpLabel("arn")),
          locale: S.optional(S.String).pipe(T.HttpQuery("locale")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/notification-events/{arn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetNotificationEventRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          arn: S.optional(S.String),
          detailUrl: S.optional(S.String),
          tags: S.optional(__S(24, __c3, 0)),
        }),
      ).annotate({ identifier: "Resource" });
    case 2:
      return S.Array(__S(225, __c28, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          eventTypeVersion: S.String,
          sourceEventId: S.String,
          eventOriginRegion: S.optional(S.String),
          relatedAccount: S.String,
          source: S.String,
          eventOccurrenceTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          eventType: S.String,
          relatedResources: __S(226, __c28, 2),
        }),
      ).annotate({ identifier: "SourceEventMetadata" });
    case 4:
      return S.suspend(() =>
        S.Struct({ mediaId: S.String, type: S.String, url: S.String, caption: S.String }),
      ).annotate({ identifier: "MediaElement" });
    case 5:
      return S.Array(__S(228, __c28, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          schemaVersion: S.String,
          id: S.String,
          sourceEventMetadata: __S(227, __c28, 3),
          messageComponents: __S(160, __c20, 0),
          sourceEventDetailUrl: S.optional(S.String),
          sourceEventDetailUrlDisplayText: S.optional(S.String),
          notificationType: S.String,
          eventStatus: S.optional(S.String),
          aggregationEventType: S.optional(S.String),
          aggregateNotificationEventArn: S.optional(S.String),
          aggregationSummary: S.optional(__S(202, __c25, 2)),
          startTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          endTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          textParts: __S(162, __c20, 2),
          media: __S(229, __c28, 5),
          organizationalUnitId: S.optional(S.String),
        }),
      ).annotate({ identifier: "NotificationEventSchema" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          notificationConfigurationArn: S.String,
          creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          content: __S(230, __c28, 6),
        }),
      ).annotate({ identifier: "GetNotificationEventResponse" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/organization/access" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetNotificationsAccessForOrganizationRequest" });
    case 1:
      return S.suspend(() => S.Struct({ accessStatus: S.String })).annotate({
        identifier: "NotificationsAccessForOrganization",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({ notificationsAccessForOrganization: __S(233, __c29, 1) }),
      ).annotate({ identifier: "GetNotificationsAccessForOrganizationResponse" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          notificationConfigurationArn: S.String.pipe(T.HttpQuery("notificationConfigurationArn")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/channels" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListChannelsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), channels: __S(24, __c3, 0) }),
      ).annotate({ identifier: "ListChannelsResponse" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          notificationConfigurationArn: S.String.pipe(T.HttpQuery("notificationConfigurationArn")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/event-rules" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListEventRulesRequest" });
    case 1:
      return S.Array(__S(144, __c18, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), eventRules: __S(249, __c31, 1) }),
      ).annotate({ identifier: "ListEventRulesResponse" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          managedNotificationConfigurationArn: S.String.pipe(
            T.HttpQuery("managedNotificationConfigurationArn"),
          ),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/channels/list-managed-notification-channel-associations",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListManagedNotificationChannelAssociationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          channelIdentifier: S.String,
          channelType: S.String,
          overrideOption: S.optional(S.String),
          isSensitiveEventsSubscribed: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "ManagedNotificationChannelAssociationSummary" });
    case 2:
      return S.Array(__S(257, __c32, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), channelAssociations: __S(258, __c32, 2) }),
      ).annotate({ identifier: "ListManagedNotificationChannelAssociationsResponse" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          aggregateManagedNotificationEventArn: S.String.pipe(
            T.HttpLabel("aggregateManagedNotificationEventArn"),
          ),
          startTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))).pipe(
            T.HttpQuery("startTime"),
          ),
          endTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))).pipe(
            T.HttpQuery("endTime"),
          ),
          locale: S.optional(S.String).pipe(T.HttpQuery("locale")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          relatedAccount: S.optional(S.String).pipe(T.HttpQuery("relatedAccount")),
          organizationalUnitId: S.optional(S.String).pipe(T.HttpQuery("organizationalUnitId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/list-managed-notification-child-events/{aggregateManagedNotificationEventArn}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListManagedNotificationChildEventsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          schemaVersion: S.String,
          sourceEventMetadata: __S(272, __c34, 0),
          messageComponents: __S(273, __c34, 1),
          aggregationDetail: __S(176, __c22, 0),
          eventStatus: S.String,
          notificationType: S.String,
        }),
      ).annotate({ identifier: "ManagedNotificationChildEventSummary" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          managedNotificationConfigurationArn: S.String,
          relatedAccount: S.String,
          creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          childEvent: __S(265, __c33, 1),
          aggregateManagedNotificationEventArn: S.String,
          organizationalUnitId: S.optional(S.String),
        }),
      ).annotate({ identifier: "ManagedNotificationChildEventOverview" });
    case 3:
      return S.Array(__S(266, __c33, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          managedNotificationChildEvents: __S(267, __c33, 3),
        }),
      ).annotate({ identifier: "ListManagedNotificationChildEventsResponse" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          eventOriginRegion: S.optional(S.String),
          source: S.String,
          eventType: S.String,
        }),
      ).annotate({ identifier: "ManagedSourceEventMetadataSummary" });
    case 1:
      return S.suspend(() => S.Struct({ headline: S.String })).annotate({
        identifier: "MessageComponentsSummary",
      });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          channelIdentifier: S.optional(S.String).pipe(T.HttpQuery("channelIdentifier")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/managed-notification-configurations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListManagedNotificationConfigurationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ arn: S.String, name: S.String, description: S.String }),
      ).annotate({ identifier: "ManagedNotificationConfigurationStructure" });
    case 2:
      return S.Array(__S(281, __c35, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          managedNotificationConfigurations: __S(282, __c35, 2),
        }),
      ).annotate({ identifier: "ListManagedNotificationConfigurationsResponse" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          startTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))).pipe(
            T.HttpQuery("startTime"),
          ),
          endTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))).pipe(
            T.HttpQuery("endTime"),
          ),
          locale: S.optional(S.String).pipe(T.HttpQuery("locale")),
          source: S.optional(S.String).pipe(T.HttpQuery("source")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          organizationalUnitId: S.optional(S.String).pipe(T.HttpQuery("organizationalUnitId")),
          relatedAccount: S.optional(S.String).pipe(T.HttpQuery("relatedAccount")),
          includeSensitiveEvents: S.optional(S.Boolean).pipe(T.HttpQuery("includeSensitiveEvents")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/managed-notification-events" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListManagedNotificationEventsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          managedNotificationConfigurationArn: S.String,
          relatedAccount: S.String,
          creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          notificationEvent: __S(296, __c37, 0),
          aggregationEventType: S.optional(S.String),
          organizationalUnitId: S.optional(S.String),
          aggregationSummary: S.optional(__S(202, __c25, 2)),
          aggregatedNotificationRegions: S.optional(__S(24, __c3, 0)),
        }),
      ).annotate({ identifier: "ManagedNotificationEventOverview" });
    case 2:
      return S.Array(__S(289, __c36, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          managedNotificationEvents: __S(290, __c36, 2),
        }),
      ).annotate({ identifier: "ListManagedNotificationEventsResponse" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          schemaVersion: S.String,
          sourceEventMetadata: __S(272, __c34, 0),
          messageComponents: __S(273, __c34, 1),
          eventStatus: S.String,
          notificationType: S.String,
        }),
      ).annotate({ identifier: "ManagedNotificationEventSummary" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          notificationConfigurationArn: S.String.pipe(T.HttpQuery("notificationConfigurationArn")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          memberAccount: S.optional(S.String).pipe(T.HttpQuery("memberAccount")),
          status: S.optional(S.String).pipe(T.HttpQuery("status")),
          organizationalUnitId: S.optional(S.String).pipe(T.HttpQuery("organizationalUnitId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/list-member-accounts" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListMemberAccountsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          notificationConfigurationArn: S.optional(S.String),
          accountId: S.String,
          status: S.String,
          statusReason: S.String,
          organizationalUnitId: S.String,
        }),
      ).annotate({ identifier: "MemberAccount" });
    case 2:
      return S.Array(__S(305, __c38, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ memberAccounts: __S(306, __c38, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListMemberAccountsResponse" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          eventRuleSource: S.optional(S.String).pipe(T.HttpQuery("eventRuleSource")),
          channelArn: S.optional(S.String).pipe(T.HttpQuery("channelArn")),
          status: S.optional(S.String).pipe(T.HttpQuery("status")),
          subtype: S.optional(S.String).pipe(T.HttpQuery("subtype")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/notification-configurations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListNotificationConfigurationsRequest" });
    case 1:
      return S.Array(__S(216, __c27, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          notificationConfigurations: __S(313, __c39, 1),
        }),
      ).annotate({ identifier: "ListNotificationConfigurationsResponse" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          startTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))).pipe(
            T.HttpQuery("startTime"),
          ),
          endTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))).pipe(
            T.HttpQuery("endTime"),
          ),
          locale: S.optional(S.String).pipe(T.HttpQuery("locale")),
          source: S.optional(S.String).pipe(T.HttpQuery("source")),
          includeChildEvents: S.optional(S.Boolean).pipe(T.HttpQuery("includeChildEvents")),
          aggregateNotificationEventArn: S.optional(S.String).pipe(
            T.HttpQuery("aggregateNotificationEventArn"),
          ),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          organizationalUnitId: S.optional(S.String).pipe(T.HttpQuery("organizationalUnitId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/notification-events" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListNotificationEventsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          notificationConfigurationArn: S.String,
          relatedAccount: S.String,
          creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          notificationEvent: __S(296, __c37, 0),
          aggregationEventType: S.optional(S.String),
          aggregateNotificationEventArn: S.optional(S.String),
          aggregationSummary: S.optional(__S(202, __c25, 2)),
          organizationalUnitId: S.optional(S.String),
        }),
      ).annotate({ identifier: "NotificationEventOverview" });
    case 2:
      return S.Array(__S(321, __c40, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), notificationEvents: __S(322, __c40, 2) }),
      ).annotate({ identifier: "ListNotificationEventsResponse" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/notification-hubs" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListNotificationHubsRequest" });
    case 1:
      return S.Array(__S(336, __c42, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ notificationHubs: __S(329, __c41, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListNotificationHubsResponse" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          notificationHubRegion: S.String,
          statusSummary: __S(16, __c2, 0),
          creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          lastActivationTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "NotificationHubOverview" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          notificationConfigurationArn: S.String.pipe(T.HttpQuery("notificationConfigurationArn")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/organizational-units" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListOrganizationalUnitsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ organizationalUnits: __S(24, __c3, 0), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListOrganizationalUnitsResponse" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String.pipe(T.HttpLabel("arn")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/tags/{arn}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ tags: S.optional(__S(56, __c7, 0)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ notificationHubRegion: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/notification-hubs" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RegisterNotificationHubRequest" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String.pipe(T.HttpLabel("arn")), tags: __S(56, __c7, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/tags/{arn}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.String.pipe(T.HttpLabel("arn")),
          tagKeys: __S(24, __c3, 0).pipe(T.HttpQuery("tagKeys")),
        }).pipe(
          T.all(T.Http({ method: "DELETE", uri: "/tags/{arn}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.String.pipe(T.HttpLabel("arn")),
          eventPattern: S.optional(S.String),
          regions: S.optional(__S(24, __c3, 0)),
        }).pipe(
          T.all(T.Http({ method: "PUT", uri: "/event-rules/{arn}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateEventRuleRequest" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          managedNotificationConfigurationArn: S.String,
          channelIdentifier: S.String,
          isSensitiveEventsSubscribed: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/channels/update-managed-notification-channel-association",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateManagedNotificationChannelAssociationRequest" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.String.pipe(T.HttpLabel("arn")),
          name: S.optional(S.String),
          description: S.optional(S.String),
          aggregationDuration: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/notification-configurations/{arn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateNotificationConfigurationRequest" });
    case 1:
      return S.suspend(() => S.Struct({ arn: S.String })).annotate({
        identifier: "UpdateNotificationConfigurationResponse",
      });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ name: S.String, message: S.String })).annotate({
        identifier: "ValidationExceptionField",
      });
    case 1:
      return S.Array(__S(408, __c51, 0));
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.String.pipe(T.HttpLabel("arn")),
          notificationConfigurationArn: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/channels/associate/{arn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociateChannelRequest" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "AssociateChannelResponse" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          contactIdentifier: S.String.pipe(T.HttpLabel("contactIdentifier")),
          managedNotificationConfigurationArn: S.String,
          isSensitiveEventsSubscribed: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/contacts/associate-managed-notification/{contactIdentifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociateManagedNotificationAccountContactRequest" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          channelArn: S.String.pipe(T.HttpLabel("channelArn")),
          managedNotificationConfigurationArn: S.String,
          isSensitiveEventsSubscribed: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/channels/associate-managed-notification/{channelArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociateManagedNotificationAdditionalChannelRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
